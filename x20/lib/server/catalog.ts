import { programs as demoPrograms, scholarships as demoScholarships, universities as demoUniversities } from '@/lib/data';
import { getUniversitySourceMetadata } from '@/lib/university-metadata';
import { getPrisma } from './db';

export type CatalogQuery = { q?: string; country?: string; degree?: string; type?: string };
export type CatalogMode = 'demo' | 'live';

export type CatalogResult = {
  mode: CatalogMode;
  programs: unknown[];
  universities: unknown[];
  scholarships: unknown[];
  limitations: string[];
};

function includesQuery(value: string, query: string) { return value.toLowerCase().includes(query.toLowerCase()); }
function slugify(value: string) { return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function initials(value: string) {
  const words = value.replace(/[^a-zA-Z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (words.length <= 2) return words.map((word) => word[0]).join('').toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

function demoCatalog(query: CatalogQuery): CatalogResult {
  const q = query.q?.trim() || '';
  const programs = demoPrograms.filter((item) => (!q || includesQuery([item.name, item.university, item.subject, item.city, item.country, item.code, item.department].join(' '), q)) && (!query.country || item.country === query.country) && (!query.degree || item.level === query.degree));
  const universities = demoUniversities.filter((item) => (!q || includesQuery([item.name, item.city, item.country, item.type].join(' '), q)) && (!query.country || item.country === query.country));
  const scholarships = demoScholarships.filter((item) => (!q || includesQuery([item.name, item.provider, item.country, item.level].join(' '), q)) && (!query.country || item.country === query.country));
  return { mode: 'demo', programs, universities, scholarships, limitations: ['Demo-sized catalog', 'No authenticated persistence', 'Confirm all time-sensitive facts with the official source'] };
}

export async function searchCatalog(query: CatalogQuery): Promise<CatalogResult> {
  const prisma = getPrisma();
  if (process.env.UNIVERSITY_TRACKER_LIVE_DATA !== 'true' || !prisma) return demoCatalog(query);

  const q = query.q?.trim();
  const programWhere = {
    ...(q ? { OR: [{ officialName: { contains: q, mode: 'insensitive' as const } }, { slug: { contains: q, mode: 'insensitive' as const } }] } : {}),
    ...(query.country ? { institution: { country: { name: query.country } } } : {}),
    ...(query.degree ? { degree: { level: query.degree } } : {}),
  };
  const [programs, universities, scholarships] = await Promise.all([
    prisma.program.findMany({ where: programWhere, include: { institution: { include: { country: true, city: true } }, degree: true, subject: true, faculty: true, department: true } }),
    prisma.institution.findMany({ where: query.country ? { country: { name: query.country } } : q ? { OR: [{ officialName: { contains: q, mode: 'insensitive' } }, { commonName: { contains: q, mode: 'insensitive' } }] } : {}, include: { country: true, city: true } }),
    prisma.scholarship.findMany({ where: query.country ? { country: { name: query.country } } : q ? { OR: [{ name: { contains: q, mode: 'insensitive' } }, { provider: { contains: q, mode: 'insensitive' } }] } : {}, include: { country: true } }),
  ]);
  return { 
    programs: programs.map((item: typeof 
    programs[number]) => {
    mode: 'live',
   13:22:36.967 
 48 |     mode: 'live',
13:22:36.967 
 49 |    programs.map((item: typeof programs[number]) => {
13:22:36.969 
    :            ^
13:22:36.969 
 50 |       const sourceMetadata = getUniversitySourceMetadata(item.institution.officialName);
13:22:36.969 
 51 |       const verified = item.updatedAt.toISOString().slice(0, 10);
13:22:36.969 
 52 |       return {
13:22:36.969 
    `----
13:22:36.969 
13:22:36.969 
Caused by:
13:22:36.969 
    Syntax Error
13:22:36.969 
13:22:36.970 
Import trace for requested module:
13:22:36.970 
./lib/server/catalog.ts
13:22:36.970 
./app/page.tsx
13:22:36.970 
13:22:36.984 
13:22:36.984 
> Build failed because of webpack errors
13:22:37.008 
 ELIFECYCLE  Command failed with exit code 1.
13:22:37.157 
Error: Command "pnpm run build" exited with 1

    13:22:36.967 
 48 |     mode: 'live',
13:22:36.967 
 49 |    programs.map((item: typeof programs[number]) => {
13:22:36.969 
    :            ^
13:22:36.969 
 50 |       const sourceMetadata = getUniversitySourceMetadata(item.institution.officialName);
13:22:36.969 
 51 |       const verified = item.updatedAt.toISOString().slice(0, 10);
13:22:36.969 
 52 |       return {
13:22:36.969 
    `----
13:22:36.969 
13:22:36.969 
Caused by:
13:22:36.969 
    Syntax Error
13:22:36.969 
13:22:36.970 
Import trace for requested module:
13:22:36.970 
./lib/server/catalog.ts
13:22:36.970 
./app/page.tsx
13:22:36.970 
13:22:36.984 
13:22:36.984 
> Build failed because of webpack errors
13:22:37.008 
 ELIFECYCLE  Command failed with exit code 1.
13:22:37.157 
Error: Command "pnpm run build" exited with 1

      const sourceMetadata = getUniversitySourceMetadata(item.institution.officialName);
      const verified = item.updatedAt.toISOString().slice(0, 10);
      return {
        id: item.id,
        slug: item.slug,
        name: item.officialName,
        universityId: item.institutionId,
        university: item.institution.commonName || item.institution.officialName,
        country: item.institution.country.name,
        city: sourceMetadata?.city || item.institution.city?.name || 'Not available',
        subject: item.subject?.name || 'Not available',
        faculty: item.faculty?.name || 'Not available',
        department: item.department?.name || 'Not available',
        degree: item.degree?.name || 'Not available',
        level: item.level,
        mode: item.mode.replaceAll('_', ' '),
        duration: item.duration || 'Not available',
        intake: item.intake || 'Not available',
        language: item.language || 'Not available',
        tuition: 'Not available',
        tuitionNote: 'Fee record has not been attached to this live program yet.',
        code: 'Not available',
        overview: item.overview || 'No verified overview has been added yet.',
        modules: [],
        tags: [],
        requirements: [],
        source: { kind: 'Official program', label: 'University source · confirm program page', verified, href: item.institution.website || '#' },
        updated: verified,
        scholarshipIds: [],
      };
    }),
    universities: universities.map((item) => {
      const sourceMetadata = getUniversitySourceMetadata(item.officialName);
      const website = item.website || sourceMetadata?.website || '';
      const verified = item.updatedAt.toISOString().slice(0, 10);
      return {
        id: item.id,
        slug: slugify(item.officialName),
        name: item.officialName,
        shortName: item.commonName || item.officialName,
        country: item.country.name,
        jurisdiction: 'Not available',
        city: sourceMetadata?.city || item.city?.name || 'Not available',
        region: sourceMetadata?.region || 'Not available',
        type: item.type.replaceAll('_', ' ').toLowerCase(),
        accent: 'moss',
        mark: initials(item.commonName || item.officialName),
        eyebrow: 'Live institution record',
        description: sourceMetadata?.description || 'Institution record imported through the verified catalog boundary. Confirm current details with the official university source.',
        website,
        logoUrl: sourceMetadata?.logoUrl || undefined,
        verified,
        programs: [],
        tags: [],
        source: { kind: 'Official university', label: sourceMetadata?.status === 'ok' ? 'Official homepage metadata' : 'Official university website · verify', verified, href: website || '#' },
      };
    }),
    scholarships: scholarships.map((item) => ({
      id: item.id,
      slug: item.stableKey,
      name: item.name,
      provider: item.provider,
      country: item.country?.name || 'Not available',
      eligibility: 'See attached eligibility records.',
      amount: item.amount || 'Not available',
      coverage: item.coverage || 'Not available',
      deadline: item.deadline || 'Not available',
      level: item.level || 'Not available',
      status: 'Unknown / verify',
      source: { kind: 'Official scholarship', label: 'Verified database source', verified: item.lastVerifiedAt?.toISOString().slice(0, 10) || 'Needs review', href: item.officialUrl || '#' },
    })),
    limitations: ['Live records depend on source verification status', 'Authentication is required before planner writes are enabled'],
  };
}
