'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { Breadcrumbs, PageIntro, ProgramCard, SectionHeading, SourceBadge, StatusPill, UniversityCard } from '@/components/core';
import { programs as seedPrograms, universities as seedUniversities, degrees, markets, scholarships as seedScholarships } from '@/lib/data';
import type { Program, Scholarship, University } from '@/lib/data';

export function DiscoverClient({ universityOnly = false }: { universityOnly?: boolean }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(params.get('q') || '');
  const [country, setCountry] = useState(params.get('country') || '');
  const [degree, setDegree] = useState(params.get('degree') || '');
  const [type, setType] = useState(params.get('type') || (universityOnly ? 'universities' : 'all'));
  const [result, setResult] = useState<{ programs: Program[]; universities: University[]; scholarships: Scholarship[]; mode: 'demo' | 'live'; limitations: string[] }>({ programs: seedPrograms, universities: seedUniversities, scholarships: seedScholarships, mode: 'demo', limitations: [] });
  const [loading, setLoading] = useState(false);

  const update = (next: Record<string, string>) => {
    const values = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([key, value]) => value ? values.set(key, value) : values.delete(key));
    router.push(`${pathname}?${values.toString()}`);
  };
  const onChange = (setter: (value: string) => void, key: string) => (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => { setter(event.target.value); update({ [key]: event.target.value }); };

  const queryString = params.toString();
  useEffect(() => {
    const next = new URLSearchParams(queryString);
    setQuery(next.get('q') || '');
    setCountry(next.get('country') || '');
    setDegree(next.get('degree') || '');
    setType(next.get('type') || (universityOnly ? 'universities' : 'all'));
    setLoading(true);
    const controller = new AbortController();
    fetch(`/api/catalog${queryString ? `?${queryString}` : ''}`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('Catalog request failed'); return response.json(); })
      .then((payload) => setResult(payload))
      .catch((error) => { if (error?.name !== 'AbortError') setResult({ programs: [], universities: [], scholarships: [], mode: 'demo', limitations: ['Catalog request failed; try again or return to the demo catalog.'] }); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [queryString]);

  const matchesProgram = result.programs;
  const matchesUniversity = result.universities;
  const matchesScholarship = result.scholarships;
  const q = query.toLowerCase();
  const shownCount = universityOnly ? matchesUniversity.length : matchesProgram.length + matchesUniversity.length + matchesScholarship.length;
  const searchReady = !universityOnly || Boolean(query.trim() || country || degree);
  const empty = !searchReady || shownCount === 0;

  return <>
    <section className="page-hero"><div className="page-container"><Breadcrumbs items={[{ label: universityOnly ? 'Universities' : 'Explore' }]} /><PageIntro eyebrow={universityOnly ? 'University directory' : 'Explore the directory'} title={universityOnly ? 'Find a university when you need it.' : 'Search with a question in mind.'} description={universityOnly ? 'Use the search box or choose a market. Results stay hidden until you ask for them.' : 'Search across universities, programs, subjects, and scholarships. Filters stay in the URL, so your shortlist is easy to share and return to.'}>{!universityOnly && <div className="applicant-switcher"><span className="switcher-label">Applicant context</span><button className="active" type="button">International</button><button type="button">Domestic</button></div>}</PageIntro></div></section>
    <div className="page-container page-content"><div className="filter-layout"><aside className="filter-panel" aria-label="Search filters"><div className="filter-group"><label htmlFor="discover-q">Search {universityOnly ? 'universities' : ''}</label><input id="discover-q" value={query} onChange={onChange(setQuery, 'q')} placeholder={universityOnly ? 'University name...' : 'Program, city, code...'} /></div><div className="filter-group"><label htmlFor="discover-country">Country / jurisdiction</label><select id="discover-country" value={country} onChange={onChange(setCountry, 'country')}><option value="">All markets</option>{markets.map((market) => <option value={market.name} key={market.name}>{market.name}</option>)}</select></div>{!universityOnly && <><div className="filter-group"><label htmlFor="discover-degree">Degree level</label><select id="discover-degree" value={degree} onChange={onChange(setDegree, 'degree')}><option value="">All levels</option>{degrees.map((item) => <option value={item} key={item}>{item}</option>)}</select></div><div className="filter-group"><label htmlFor="discover-type">Result type</label><select id="discover-type" value={type} onChange={onChange(setType, 'type')}><option value="all">All results</option><option value="programs">Programs</option><option value="universities">Universities</option><option value="scholarships">Scholarships</option></select></div></>}<p className="filter-note">{universityOnly ? 'Choose a country or type a university name to reveal matching results.' : 'More filters — cost, study mode, intake, language, and scholarship eligibility — are ready to connect to the same URL state.'}</p></aside><section><div className="results-toolbar"><strong>{q ? <>Results for “{query}”</> : universityOnly && country ? <>Universities in {country}</> : universityOnly ? 'Search to show universities' : 'Recommended starting points'}</strong><span>{loading ? 'Loading catalog…' : searchReady ? `${shownCount} matched records` : 'No results shown yet'}{!universityOnly && <> · <StatusPill tone={result.mode === 'live' ? 'green' : 'amber'}>{result.mode === 'live' ? 'Live catalog' : 'Demo catalog'}</StatusPill></>}</span></div>{loading ? <div className="empty-state"><span className="empty-icon">◌</span><h3>Reading the catalog…</h3><p>Applying your filters without leaving the page.</p></div> : empty ? <div className="empty-state"><span className="empty-icon">⌕</span><h3>{universityOnly && !searchReady ? 'Search or choose a market.' : 'No exact matches yet.'}</h3><p>{universityOnly && !searchReady ? 'The directory is intentionally quiet until you filter or search.' : 'Try a broader subject, city, or university name. A missing result is better than a confident guess.'}</p><button className="button button-dark" type="button" onClick={() => { setQuery(''); setCountry(''); setDegree(''); router.push(universityOnly ? '/universities' : '/discover'); }}>Clear filters</button></div> : <div className="results-grid">{universityOnly ? <div className="content-section" style={{ paddingTop: 20 }}><SectionHeading eyebrow="Matching universities" title={`${matchesUniversity.length} result${matchesUniversity.length === 1 ? '' : 's'}`} /> <div className="university-grid">{matchesUniversity.map((item) => <UniversityCard key={item.id} university={item} />)}</div></div> : <>{(type === 'all' || type === 'programs') && matchesProgram.length > 0 && <div><SectionHeading eyebrow="Programs" title={`${matchesProgram.length} program${matchesProgram.length === 1 ? '' : 's'}`} />{matchesProgram.map((item) => <div key={item.id} style={{ marginBottom: 14 }}><ProgramCard program={item} /></div>)}</div>}{(type === 'all' || type === 'universities') && matchesUniversity.length > 0 && <div className="content-section" style={{ paddingTop: 20 }}><SectionHeading eyebrow="Universities" title={`${matchesUniversity.length} institution${matchesUniversity.length === 1 ? '' : 's'}`} /> <div className="university-grid">{matchesUniversity.map((item) => <UniversityCard key={item.id} university={item} />)}</div></div>}{(type === 'all' || type === 'scholarships') && matchesScholarship.length > 0 && <div className="content-section" style={{ paddingTop: 20 }}><SectionHeading eyebrow="Scholarships" title={`${matchesScholarship.length} funding option${matchesScholarship.length === 1 ? '' : 's'}`} /> <div className="scholarship-list">{matchesScholarship.map((item) => <article className="scholarship-card" key={item.id}><div className="scholarship-symbol">✳</div><div className="scholarship-content"><div className="card-meta"><span>{item.country}</span><span>{item.level}</span></div><h3><Link href={`/scholarships#${item.slug}`}>{item.name}</Link></h3><p>{item.provider}</p><div className="card-footer"><SourceBadge source={item.source} compact /><StatusPill tone="amber">{item.status}</StatusPill></div></div></article>)}</div></div>}</>}</div>}</section></div></div>
  </>;
}
