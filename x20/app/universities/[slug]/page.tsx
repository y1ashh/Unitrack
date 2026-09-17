import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell, ApplicantSwitcher, Breadcrumbs, PageIntro, ProgramCard, SaveButton, SectionHeading, SourceBadge, StatusPill } from '@/components/core';
import { getUniversity, getUniversityPrograms, type University } from '@/lib/data';
import { getUniversitySourceMetadata } from '@/lib/university-metadata';
import { getPrisma } from '@/lib/server/db';

function slugify(value: string) { return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function initials(value: string) { const words = value.replace(/[^a-zA-Z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean); return (words.length <= 2 ? words.map((word) => word[0]).join('') : `${words[0][0]}${words[words.length - 1][0]}`).toUpperCase(); }
function officialUrl(value: string) { return value.startsWith('http://') || value.startsWith('https://') ? value : `https://${value}`; }

export default async function UniversityDetailPage({ params }: { params: { slug: string } }) {
  let university = getUniversity(params.slug);
  let uniPrograms = university ? getUniversityPrograms(university.id) : [];
  let liveRecord = false;
  if (!university && process.env.UNIVERSITY_TRACKER_LIVE_DATA === 'true') {
    const prisma = getPrisma();
    if (prisma) {
      const records = await prisma.institution.findMany({ include: { country: true, city: true } });
      const record = records.find((item) => slugify(item.officialName) === params.slug);
      if (record) {
        liveRecord = true;
        const verified = record.updatedAt.toISOString().slice(0, 10);
        university = {
          id: record.id,
          slug: params.slug,
          name: record.officialName,
          shortName: record.commonName || record.officialName,
          country: record.country.name,
          jurisdiction: 'Not available',
          city: record.city?.name || 'Not available',
          region: 'Not available',
          type: record.type.replaceAll('_', ' ').toLowerCase(),
          accent: 'moss',
          mark: initials(record.commonName || record.officialName),
          eyebrow: 'Live institution record',
          description: 'Institution record imported from the University Tracker catalog. Confirm current details with the official university source.',
          website: record.website || '',
          verified,
          programs: [],
          tags: ['Catalog record'],
          source: { kind: 'Official university', label: record.website ? 'Official university website' : 'Catalog record · verify', verified, href: record.website || '#' },
        } satisfies University;
      }
    }
  }
  if (!university) notFound();
  const sourceMetadata = getUniversitySourceMetadata(university.name);
  if (sourceMetadata) {
    university = {
      ...university,
      website: sourceMetadata.website || university.website,
      city: sourceMetadata.city || university.city,
      region: sourceMetadata.region || university.region,
      description: sourceMetadata.description || university.description,
      logoUrl: sourceMetadata.logoUrl || university.logoUrl,
    };
  }
  const website = university.website ? officialUrl(university.website) : '';
  return <AppShell eyebrow={`${university.country} · ${university.city}`}><section className="detail-header"><div className="page-container"><Breadcrumbs items={[{ label: 'Universities', href: '/universities' }, { label: university.name }]} /><PageIntro eyebrow={`${university.type} · ${university.jurisdiction}`} title={university.name} description={university.description}><div className="detail-meta"><span>{university.city}, {university.country}</span><span>{university.region}</span>{website ? <a href={website} target="_blank" rel="noreferrer">Official website ↗</a> : <span>Official website unavailable</span>}</div><div className="detail-actions"><SaveButton itemId={university.id} label="Save university" /><Link className="button button-dark" href={`/discover?country=${encodeURIComponent(university.country)}`}>Find programs here <span aria-hidden="true">↗</span></Link></div></PageIntro></div></section><div className="page-container page-content"><div className="detail-layout"><div className="detail-main"><div className="metric-strip"><div className="metric"><span>Programs tracked</span><strong>{uniPrograms.length}</strong><small>{liveRecord ? 'Live records' : 'Demo sample'}</small></div><div className="metric"><span>Location</span><strong>{university.city}</strong><small>{university.jurisdiction}</small></div><div className="metric"><span>Institution</span><strong>{university.type.split(' ')[0]}</strong><small>Classification shown</small></div><div className="metric"><span>Last verified</span><strong>{university.verified.slice(0, 10)}</strong><small>Official source record</small></div></div><section className="info-block" id="programs"><SectionHeading eyebrow="01 / Programs" title="Find your starting point" link="View all programs" href="/programs" /><ApplicantSwitcher /><div className="program-grid" style={{ marginTop: 22 }}>{uniPrograms.map((program, i) => <ProgramCard key={program.id} program={program} featured={i === 0 && university.id === 'inst-oxford'} />)}</div></section><section className="info-block" id="admissions"><p className="eyebrow">02 / Admissions</p><h2>Start with the official route.</h2><p>Admissions requirements sit at the intersection of the university, the program, and the applicant’s context. Use the program page for specific requirements and confirm every time-sensitive detail with the official source.</p><div className="definition-grid"><div className="definition"><dt>Official admissions</dt><dd>{website ? <a className="arrow-link" href={website} target="_blank" rel="noreferrer">Visit {university.shortName} official route ↗</a> : 'Official route unavailable'}</dd></div><div className="definition"><dt>Applicant context</dt><dd><StatusPill tone="amber">Varies by program</StatusPill></dd></div><div className="definition"><dt>Application method</dt><dd>See program-specific guidance</dd></div><div className="definition"><dt>Source record</dt><dd><SourceBadge source={university.source} compact /></dd></div></div></section><section className="info-block" id="student-life"><p className="eyebrow">03 / Student life</p><h2>Place matters to the experience.</h2><p>We keep student-life claims close to official campus resources and mark unavailable details. Start with the city, campus, and support links below.</p><div className="resource-grid"><div className="resource-card"><span className="resource-icon">⌂</span><div><h3>Campus & place</h3><p>{university.city}, {university.region}</p></div><Link href="/student-life">Read the student-life guide ↗</Link></div><div className="resource-card"><span className="resource-icon">＋</span><div><h3>International support</h3><p>Official guidance varies by applicant country.</p></div><Link href="/international-students">See the international area ↗</Link></div></div></section></div><aside className="detail-sidebar"><div className="sticky-sidebar"><p className="sidebar-label">On this page</p><nav className="sidebar-nav"><a href="#programs">Programs</a><a href="#admissions">Admissions</a><a href="#student-life">Student life</a></nav><div style={{ marginTop: 35 }}><p className="sidebar-label">Trust note</p><p className="filter-note">This profile uses the live catalog when available and keeps unavailable details visible. Confirm current requirements on the official source before applying.</p><SourceBadge source={university.source} /></div></div></aside></div></div></AppShell>;
}
