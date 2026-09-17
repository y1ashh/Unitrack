import fs from 'node:fs/promises';
import path from 'node:path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const outputPath = path.join(process.cwd(), 'data', 'university-metadata.json');
const timeoutMs = 9000;

function absoluteUrl(value, base) {
  try { return new URL(value, base).toString(); } catch { return ''; }
}

function decode(value = '') {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#039;/g, "'").replace(/&#x27;|&#x2019;/gi, "'").replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code))).replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16))).replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim();
}

function metaContent(html, key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [
    new RegExp(`<meta\\b[^>]*(?:name|property)\\s*=\\s*["']${escaped}["'][^>]*content\\s*=\\s*["']([^"']+)["'][^>]*>`, 'i'),
    new RegExp(`<meta\\b[^>]*content\\s*=\\s*["']([^"']+)["'][^>]*(?:name|property)\\s*=\\s*["']${escaped}["'][^>]*>`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decode(match[1]);
  }
  return '';
}

function titleOf(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return decode((match?.[1] || '').replace(/\s+/g, ' '));
}

function parseAttributes(tag) {
  const attrs = {};
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)) attrs[match[1].toLowerCase()] = decode(match[2]);
  return attrs;
}

function logoOf(html, siteUrl) {
  const candidates = [];
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const attrs = parseAttributes(match[0]);
    const rel = (attrs.rel || '').toLowerCase();
    if (rel.includes('apple-touch-icon')) candidates.push({ priority: 1, url: absoluteUrl(attrs.href, siteUrl) });
    else if (rel.includes('icon')) candidates.push({ priority: 2, url: absoluteUrl(attrs.href, siteUrl) });
  }
  const ogImage = metaContent(html, 'og:image');
  if (ogImage) candidates.push({ priority: 3, url: absoluteUrl(ogImage, siteUrl) });
  return candidates.filter((item) => item.url).sort((a, b) => a.priority - b.priority)[0]?.url || '';
}

function jsonLdLocation(html) {
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const roots = Array.isArray(JSON.parse(match[1])) ? JSON.parse(match[1]) : [JSON.parse(match[1])];
      const queue = [...roots];
      while (queue.length) {
        const node = queue.shift();
        if (!node || typeof node !== 'object') continue;
        if (node.address && typeof node.address === 'object') {
          return { city: node.address.addressLocality || '', region: node.address.addressRegion || '' };
        }
        for (const value of Object.values(node)) if (value && typeof value === 'object') queue.push(value);
      }
    } catch { /* Some official sites emit non-JSON script blocks. */ }
  }
  return { city: '', region: '' };
}

async function fetchOne(record) {
  const website = record.website;
  const empty = { name: record.officialName, website, status: 'unavailable' };
  if (!website) return empty;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(website, { signal: controller.signal, redirect: 'follow', headers: { 'user-agent': 'UniversityTrackerResearch/1.0 (+official-source-metadata)' } });
    if (!response.ok) return { ...empty, status: `http-${response.status}` };
    const html = (await response.text()).slice(0, 2_000_000);
    const location = jsonLdLocation(html);
    return {
      name: record.officialName,
      website,
      status: 'ok',
      pageTitle: titleOf(html).slice(0, 180),
      description: (metaContent(html, 'description') || metaContent(html, 'og:description')).slice(0, 320),
      city: location.city,
      region: location.region,
      logoUrl: logoOf(html, website),
    };
  } catch (error) {
    return { ...empty, error: error?.name || 'fetch-error' };
  } finally {
    clearTimeout(timer);
  }
}

const records = await prisma.institution.findMany({ select: { officialName: true, website: true }, orderBy: { officialName: 'asc' } });
const results = [];
for (let index = 0; index < records.length; index += 8) {
  const batch = records.slice(index, index + 8);
  results.push(...await Promise.all(batch.map(fetchOne)));
  console.log(`Fetched official metadata ${Math.min(index + batch.length, records.length)}/${records.length}`);
}
results.sort((a, b) => a.name.localeCompare(b.name));
await fs.writeFile(outputPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), records: Object.fromEntries(results.map((item) => [item.name, item])) }, null, 2)}\n`);
await prisma.$disconnect();
console.log(`Wrote ${results.length} metadata records to ${outputPath}`);
