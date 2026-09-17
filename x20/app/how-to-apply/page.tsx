import Link from 'next/link';
import { AppShell, Breadcrumbs, PageIntro, SectionHeading, SourceBadge } from '@/components/core';

const steps = [
  ['01', 'Shortlist programs', 'Start with the program-level record. Save a few options that are meaningfully different, not just more of the same.'],
  ['02', 'Check eligibility', 'Read domestic and international requirements separately. Look for the qualifications, subjects, grades, tests, and language evidence that actually apply to you.'],
  ['03', 'Review country-specific requirements', 'Your qualification country and residence can change the evidence or evaluation route. Switch applicant context when a page offers it.'],
  ['04', 'Prepare documents', 'Make a checklist for transcripts, references, identity documents, translations, test scores, and any program-specific work.'],
  ['05', 'Check deadlines and fees', 'Record the application deadline, scholarship deadline, fee, and decision timeline separately. “Varies” is a cue to verify.'],
  ['06', 'Submit the application', 'Use the official application platform or university route linked from the program or admissions source.'],
  ['07', 'Track the decision', 'Move the application through your tracker and keep the source record beside each important date.'],
  ['08', 'Complete enrollment', 'After an offer, review official enrollment, deposit, registration, housing, and arrival guidance.'],
];

export default function HowToApplyPage() {
  return <AppShell eyebrow="From shortlist to submitted"><section className="page-hero"><div className="page-container"><Breadcrumbs items={[{ label: 'How to apply' }]} /><PageIntro eyebrow="A practical sequence" title="How to apply, with fewer surprises." description="This is a planning framework, not a guarantee. Requirements, deadlines, fees, and immigration steps belong to the current official sources." /></div></section><div className="page-container page-content"><div className="detail-layout"><div className="detail-main"><div className="timeline">{steps.map(([number, title, description]) => <div className="timeline-step" key={number}><p className="eyebrow">{number}</p><h3>{title}</h3><p>{description}</p></div>)}</div><section className="info-block"><p className="eyebrow">Your next step</p><h2>Start with one program.</h2><p>Open a program record, switch to your applicant context, and save the first date you know is real.</p><Link className="button button-dark" href="/programs">Browse programs ↗</Link></section></div><aside className="detail-sidebar"><div className="sticky-sidebar"><p className="sidebar-label">Official starting points</p><nav className="sidebar-nav"><a href="https://educationusa.state.gov/node/2741" target="_blank" rel="noreferrer">EducationUSA guidance ↗</a><a href="https://www.educanada.ca/study-plan-etudes/before-avant/apply-school_canada_demande-ecole.aspx?lang=eng" target="_blank" rel="noreferrer">EduCanada guidance ↗</a></nav><div style={{ marginTop: 32 }}><SourceBadge source={{ kind: 'Government source', label: 'Official guidance', verified: '2026-09-17', href: '#' }} /></div></div></aside></div></div></AppShell>;
}
