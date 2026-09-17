import Link from 'next/link';
import { AppShell, MetricStrip, SectionHeading } from '@/components/core';
import { markets } from '@/lib/data';
import { searchCatalog } from '@/lib/server/catalog';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const catalog = await searchCatalog({});
  const stats = [
    { label: 'Markets', value: String(markets.length), note: 'Initial coverage' },
    { label: 'Programs', value: String(catalog.programs.length), note: 'Verified records' },
    { label: 'Catalog mode', value: catalog.mode === 'live' ? 'Live' : 'Demo', note: 'Source-aware' },
  ];

  return <AppShell eyebrow="A considered way to choose what comes next">
    <section className="hero">
      <div className="page-container hero-inner">
        <div className="hero-layout">
          <div><p className="eyebrow">Global academic research, made legible</p><h1>Find the right fit. <em>Understand the program.</em></h1><p className="hero-copy">Search institutions, compare programs, follow official sources, and keep the next application step visible.</p></div>
          <div className="hero-aside"><p>Start with a country, a subject, a degree, or a university name.</p><Link href="/how-to-apply">Read the application guide <span aria-hidden="true">↗</span></Link></div>
        </div>
        <form className="hero-search-panel" action="/discover"><label className="hero-search-input"><span className="search-icon" aria-hidden="true">⌕</span><input name="q" placeholder="Try “data science in Canada”" aria-label="Search the university tracker" /></label><label className="hero-filter"><span>Country</span><span>⌄</span><select name="country" aria-label="Country"><option value="">Any country</option>{markets.map((market) => <option key={market.code}>{market.name}</option>)}</select></label><label className="hero-filter"><span>Degree</span><span>⌄</span><select name="degree" aria-label="Degree"><option value="">Any degree</option><option>Undergraduate</option><option>Master's</option><option>PhD</option></select></label><label className="hero-filter"><span>Applicant</span><span>⌄</span><select name="applicant" aria-label="Applicant type"><option>International</option><option>Domestic</option></select></label><button className="button button-dark" type="submit">Start exploring <span aria-hidden="true">↗</span></button></form>
      </div>
    </section>

    <section className="content-section"><div className="page-container"><MetricStrip metrics={stats} /></div></section>

    <section className="content-section"><div className="page-container"><SectionHeading eyebrow="Start with the question you have" title="Four useful next steps" /><div className="resource-grid home-card-grid"><article className="resource-card home-card"><span className="resource-icon">01</span><div><h3>Browse universities</h3><p>See the full institution catalog by country, city, and official source.</p></div><Link href="/universities">Open universities ↗</Link></article><article className="resource-card home-card"><span className="resource-icon">02</span><div><h3>Compare programs</h3><p>Keep degree level, duration, tuition, requirements, and source links together.</p></div><Link href="/discover?type=programs">Explore programs ↗</Link></article><article className="resource-card home-card"><span className="resource-icon">03</span><div><h3>Check funding</h3><p>Review scholarship providers, coverage, deadlines, and eligibility status.</p></div><Link href="/scholarships">View scholarships ↗</Link></article><article className="resource-card home-card"><span className="resource-icon">04</span><div><h3>Plan the application</h3><p>Turn a shortlist into documents, dates, and one clear next action.</p></div><Link href="/tracker">Open the tracker ↗</Link></article></div></div></section>

    <section className="content-section"><div className="page-container"><div className="editorial-band"><div><p className="eyebrow">Read the source trail</p><h2>Useful information should point somewhere.</h2><p>Every profile keeps an official university link nearby. Where a fee, requirement, deadline, or logo is unavailable, the page says so instead of filling the gap with a guess.</p><Link className="button button-dark" href="/resources">Open sources and method ↗</Link></div><div className="editorial-graphic"><span className="graphic-label">Catalog principle</span><strong>Know what to check next.</strong><small>Official source · applicant context · next action</small></div></div></div></section>
  </AppShell>;
}
