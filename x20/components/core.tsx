'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, ReactNode, useEffect, useState } from 'react';
import type { Program, Scholarship, SourceMeta, University } from '@/lib/data';

export function AppShell({ children, eyebrow = 'Research, compare, plan' }: { children: ReactNode; eyebrow?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) router.push(`/discover?q=${encodeURIComponent(query.trim())}`);
  };

  const primary = [
    ['/', 'Home'], ['/discover', 'Explore'], ['/universities', 'Universities'], ['/programs', 'Programs'], ['/scholarships', 'Scholarships'], ['/compare', 'Compare'], ['/saved', 'Saved'], ['/tracker', 'Tracker'],
  ];
  const utility = [['/how-to-apply', 'How to apply'], ['/international-students', 'International students'], ['/student-life', 'Student life'], ['/resources', 'Resources']];

  return (
    <div className="site-shell">
      <div className="utility-bar">
        <div className="page-container utility-inner">
          <span className="utility-kicker"><span className="live-dot" /> {eyebrow}</span>
          <nav className="utility-links" aria-label="Utility navigation">
            {utility.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
            <span className="utility-divider" />
            <Link href="/admin">Admin preview</Link>
            <button className="account-link" type="button" onClick={() => router.push('/saved')}>Account <span aria-hidden="true">↗</span></button>
          </nav>
        </div>
      </div>
      <header className="primary-header">
        <div className="page-container header-main">
          <Link className="brand" href="/" aria-label="University Tracker home">
            <span className="brand-mark">UT</span>
            <span className="brand-wordmark">university<br /><em>tracker</em></span>
          </Link>
          <form className={`global-search ${focused ? 'is-focused' : ''}`} onSubmit={handleSearch} role="search">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input aria-label="Search universities, programs, subjects, or scholarships" placeholder="Search universities, programs, subjects..." value={query} onChange={(e) => setQuery(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
            <kbd>⌘ K</kbd>
          </form>
          <button className="mobile-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? '×' : '☰'}</button>
          <nav className={`primary-nav ${menuOpen ? 'mobile-open' : ''}`} aria-label="Primary navigation">
            {primary.map(([href, label]) => <Link key={href} href={href} className={pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)) ? 'active' : ''} onClick={() => setMenuOpen(false)}>{label}</Link>)}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="page-container footer-grid">
          <div><Link className="brand footer-brand" href="/"><span className="brand-mark">UT</span><span className="brand-wordmark">university<br /><em>tracker</em></span></Link><p className="footer-note">A clearer way to research your next academic chapter.</p></div>
          <div><p className="footer-heading">Explore</p><Link href="/universities">Universities</Link><Link href="/programs">Programs</Link><Link href="/scholarships">Scholarships</Link><Link href="/compare">Compare</Link></div>
          <div><p className="footer-heading">Plan</p><Link href="/how-to-apply">How to apply</Link><Link href="/international-students">International students</Link><Link href="/tracker">Application tracker</Link><Link href="/saved">Saved items</Link></div>
          <div><p className="footer-heading">Trust</p><Link href="/resources">Sources & methodology</Link><Link href="/admin">Data workspace</Link><p className="footer-muted">Live institution catalog · official links attached</p></div>
        </div>
        <div className="page-container footer-bottom"><span>© 2026 University Tracker</span><span>Built for considered decisions.</span></div>
      </footer>
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumbs"><Link href="/">Home</Link>{items.map((item, index) => <span key={`${item.label}-${index}`}><span aria-hidden="true">/</span>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>;
}

export function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string; children?: ReactNode }) {
  return <div className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{description && <p className="intro-copy">{description}</p>}{children}</div>;
}

export function SourceBadge({ source, compact = false }: { source: SourceMeta; compact?: boolean }) {
  const label = compact ? source.kind.replace('Official ', '') : `${source.kind} · Verified ${source.verified}`;
  const content = <><span className="source-check">✓</span>{label}</>;
  return source.href && source.href !== '#' ? <a className={`source-badge ${compact ? 'compact' : ''}`} title={`${source.kind} · ${source.verified}`} href={source.href} target="_blank" rel="noreferrer">{content}</a> : <span className={`source-badge ${compact ? 'compact' : ''}`} title={`${source.kind} · ${source.verified}`}>{content}</span>;
}

export function StatusPill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'green' | 'amber' | 'plum' }) { return <span className={`status-pill ${tone}`}>{children}</span>; }

export function SaveButton({ itemId, label = 'Save' }: { itemId: string; label?: string }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => { setSaved(window.localStorage.getItem(`saved:${itemId}`) === 'true'); }, [itemId]);
  const toggle = () => { const next = !saved; setSaved(next); window.localStorage.setItem(`saved:${itemId}`, String(next)); };
  return <button className={`save-button ${saved ? 'saved' : ''}`} type="button" onClick={toggle} aria-pressed={saved}><span aria-hidden="true">{saved ? '♥' : '♡'}</span> {saved ? 'Saved' : label}</button>;
}

export function CompareButton({ itemId }: { itemId: string }) {
  const [added, setAdded] = useState(false);
  useEffect(() => { setAdded(window.localStorage.getItem(`compare:${itemId}`) === 'true'); }, [itemId]);
  const toggle = () => { const next = !added; setAdded(next); window.localStorage.setItem(`compare:${itemId}`, String(next)); };
  return <button className={`compare-button ${added ? 'added' : ''}`} type="button" onClick={toggle} aria-pressed={added}><span aria-hidden="true">{added ? '✓' : '+'}</span> {added ? 'In compare' : 'Compare'}</button>;
}

function universityLogoUrl(website: string) {
  try {
    const normalized = website.startsWith('http') ? website : `https://${website}`;
    const hostname = new URL(normalized).hostname;
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=256`;
  } catch {
    return '';
  }
}

function generatedUniversityLogo(university: University) {
  const initials = university.mark || university.name.slice(0, 2).toUpperCase();
  const label = university.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" role="img" aria-label="${label} logo"><rect width="256" height="256" rx="36" fill="#002676"/><path d="M0 194h256v62H0z" fill="#FDB515"/><text x="128" y="142" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="72" font-weight="700">${initials}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function UniversityLogo({ university }: { university: University }) {
  const faviconUrl = universityLogoUrl(university.website);
  const generatedLogo = generatedUniversityLogo(university);
  const fallbackUrl = faviconUrl || generatedLogo;
  const [source, setSource] = useState(university.logoUrl || fallbackUrl);
  const [failed, setFailed] = useState(false);
  return <div className="university-logo" title={`${university.name} logo`}><span>{university.mark}</span>{source && !failed && <img src={source} alt={`${university.name} logo`} loading="lazy" decoding="async" width={256} height={256} referrerPolicy="no-referrer" onError={() => { if (source !== fallbackUrl) setSource(fallbackUrl); else if (source !== generatedLogo) setSource(generatedLogo); else setFailed(true); }} />}</div>;
}

export function UniversityCard({ university }: { university: University }) {
  return <article className={`university-card accent-${university.accent}`}><div className="card-visual"><div className="card-visual-top"><UniversityLogo university={university} /><span className="visual-index">{university.city.slice(0, 2).toUpperCase()}</span></div><span className="card-mark">{university.mark}</span><span className="visual-caption">{university.eyebrow}</span></div><div className="card-body"><div className="card-meta"><span>{university.country}</span><span>{university.type}</span></div><h3><Link href={`/universities/${university.slug}`}>{university.name}</Link></h3><p>{university.description}</p><div className="tag-row">{university.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div><div className="card-footer">{university.website && <a className="source-link" href={university.website.startsWith('http') ? university.website : `https://${university.website}`} target="_blank" rel="noreferrer">Official site <span aria-hidden="true">↗</span></a>}<Link className="arrow-link" href={`/universities/${university.slug}`}>View profile <span aria-hidden="true">↗</span></Link></div></div></article>;
}

export function ProgramCard({ program, featured = false }: { program: Program; featured?: boolean }) {
  return <article className={`program-card ${featured ? 'featured' : ''}`}><div className="program-topline"><span className="program-subject">{program.subject}</span><span className="program-code">{program.code}</span></div><h3><Link href={`/programs/${program.slug}`}>{program.name}</Link></h3><p className="program-university"><Link href={`/universities/${program.universityId === 'inst-oxford' ? 'university-of-oxford' : program.universityId === 'inst-toronto' ? 'university-of-toronto' : program.universityId === 'inst-ashoka' ? 'ashoka-university' : program.universityId === 'inst-nyuad' ? 'nyu-abu-dhabi' : 'university-of-tokyo'}`}>{program.university}</Link> · {program.city}, {program.country}</p><p className="program-description">{program.overview}</p><div className="program-facts"><span><b>Degree</b>{program.degree}</span><span><b>Duration</b>{program.duration}</span><span><b>Tuition</b>{program.tuition}</span></div><div className="card-footer"><SourceBadge source={program.source} compact /><div className="card-actions"><SaveButton itemId={program.id} /><CompareButton itemId={program.id} /></div></div></article>;
}

export function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  return <article className="scholarship-card"><div className="scholarship-symbol">✳</div><div className="scholarship-content"><div className="card-meta"><span>{scholarship.country}</span><span>{scholarship.level}</span></div><h3><Link href={`/scholarships#${scholarship.slug}`}>{scholarship.name}</Link></h3><p>{scholarship.provider}</p><div className="scholarship-facts"><span><b>Support</b>{scholarship.amount}</span><span><b>Deadline</b>{scholarship.deadline}</span><span><b>Eligibility</b><StatusPill tone={scholarship.status === 'Confirmed eligible' ? 'green' : 'amber'}>{scholarship.status}</StatusPill></span></div><div className="card-footer"><SourceBadge source={scholarship.source} compact /><SaveButton itemId={scholarship.id} /></div></div></article>;
}

export function ApplicantSwitcher({ value = 'International' }: { value?: 'Domestic' | 'International' }) {
  const [active, setActive] = useState(value);
  return <div className="applicant-switcher" role="group" aria-label="Applicant context"><span className="switcher-label">I am applying as</span><button className={active === 'Domestic' ? 'active' : ''} type="button" onClick={() => setActive('Domestic')}>Domestic</button><button className={active === 'International' ? 'active' : ''} type="button" onClick={() => setActive('International')}>International</button></div>;
}

export function MetricStrip({ metrics }: { metrics: { label: string; value: string; note?: string }[] }) { return <div className="metric-strip">{metrics.map((metric) => <div className="metric" key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong>{metric.note && <small>{metric.note}</small>}</div>)}</div>; }

export function SectionHeading({ eyebrow, title, link, href = '#' }: { eyebrow?: string; title: string; link?: string; href?: string }) { return <div className="section-heading">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{link && <Link className="arrow-link" href={href}>{link} <span aria-hidden="true">↗</span></Link>}</div>; }

export function EmptyState({ title, detail, action, href }: { title: string; detail: string; action?: string; href?: string }) { return <div className="empty-state"><span className="empty-icon">○</span><h3>{title}</h3><p>{detail}</p>{action && href && <Link className="button button-dark" href={href}>{action} <span aria-hidden="true">↗</span></Link>}</div>; }
