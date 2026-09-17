# University Tracker — Codex build prompt

Build a production-quality responsive web application called **University Tracker** in the current workspace.

## Product goal

Create a source-aware global university and academic-program research workspace. Users should be able to search, filter, inspect, compare, save, and track universities, programmes, requirements, costs, scholarships, application steps, international-student guidance, and student-life planning information.

## Visual direction

Use the attached reference screenshots as the visual language, not as a page to copy:

- Editorial university-institution feel with generous white space and strong typographic hierarchy.
- Black utility strip, white primary navigation, deep institutional blue, vermilion/red actions, warm amber accents, charcoal body text, fine grey rules.
- Bold grotesque sans-serif headings paired with restrained italic serif emphasis.
- Mostly square/crisp cards, thin borders, minimal shadows, dense-but-readable tables, underlined blue text links, arrow affordances, and progressive disclosure.
- Responsive behavior must be intentional: desktop supports filters/tables/comparison; mobile prioritizes search, cards, collapsible sections and compact navigation.
- Avoid generic dashboard styling, fake rankings, excessive rounded cards, or a preset yellow/blue/white template.

## Core flow to implement and verify

`Search → Filter → University → Programme → Requirements → Costs → Scholarships → Compare → Save → Application Tracker`

Include realistic empty states, loading/error-friendly states, source metadata, and no dead ends.

## Required views and interactions

1. **Homepage**
   - Hero headline: “Find the university that fits your next chapter.”
   - Global search for university, programme, degree, subject, country, city, faculty, department, code and keywords.
   - Quick search chips, discovery stats, programme-fit explainer, admissions-context section, funding section, application/how-to-apply link, international-student section and student-life section.

2. **University discovery**
   - Search results with institution cards showing name, location, type, academic areas, programme count, degree levels, scholarship indicator, save action and source status.
   - Composable filters for country, region, city, university type, public/private, field, degree level, programme type, study mode, duration, intake, language, cost, applicant type, qualification country and scholarships.
   - Results must update client-side without a full page reload and support pagination-ready structure.

3. **University profile**
   - Overview, all programmes, admissions, tuition/costs, scholarships, international students and resources.
   - Show official website/admissions/programme links.
   - Keep university-level information separate from programme-specific requirements.

4. **Programme profile**
   - Programme name, university, campus, faculty/department, discipline, degree, level, type, study mode, duration, intake, curriculum, co-op/internship, thesis/research, capstone, programme codes and classification identifiers.
   - Keep each identifier separate, show issuing organization, and display “Not available” or “Not applicable” instead of inventing codes.
   - Use tabs/accordions for Overview, Admissions, Costs and Scholarships.

5. **Admissions**
   - Domestic and international requirement views.
   - For international applicants, select qualification country and display country-specific rules only when sourced.
   - Support academic qualifications, subjects, minimum grades, entrance tests, language requirements, credential evaluation, documents, identity requirements, prerequisites and deadlines.

6. **Scholarships**
   - Dedicated searchable/filterable database with provider, degree level, programme scope, domestic/international eligibility, eligible countries, value, tuition coverage, stipend, duration, deadline, application method, criteria, language rules, documents, renewal and official source.
   - Include a clear checklist using published facts only. Do not infer eligibility.

7. **Comparison**
   - Compare 2–4 saved programmes in a readable table on desktop and horizontally scrollable layout on mobile.
   - Compare university, country/city, degree, duration, mode, tuition, estimated total cost, domestic/international requirements, language, deadlines, scholarships, programme structure, co-op/research and codes.

8. **Saved items and tracker**
   - Save universities, programmes and scholarships.
   - Application stages: Researching, Shortlisted, Preparing application, Application started, Application submitted, Interview, Decision pending, Accepted, Rejected, Waitlisted.
   - Notes, deadlines and a document checklist.

9. **Guides**
   - How to apply.
   - International students.
   - Student life, housing, support, community and practical budgeting.
   - Label planning guidance separately from official requirements.

## Trust and data rules

- Prioritize government and official university/admissions/programme/scholarship pages.
- Every high-value record needs source, source type, last verified date and status: Verified, Needs review or Unavailable.
- Distinguish official information from estimates and third-party information in the UI.
- Never fabricate tuition, scholarship eligibility, ranking claims, program codes or missing requirements.
- Use an extensible country-aware data model. Do not hard-code one country’s terminology into the core entities.
- Use stable internal IDs and separate entities for country, region, city, university, campus, faculty, department, subject, degree, programme, programme code, classification, admission requirement, applicant type, applicant country, tuition, fees, scholarship, eligibility, deadline, source, verification record, user, saved item and tracker entry.

## Implementation expectations

- Use reusable components and a clear state/data layer.
- Keep the UI functional with seeded demo data if a backend is not yet connected; label prototype/demo data honestly.
- Use official source URLs in data records and current verification dates.
- Use accessible controls, visible focus states, keyboard-friendly tabs/accordions, semantic headings and sufficient contrast.
- Do not introduce subjective rankings.
- After implementation, inspect the app at desktop and mobile breakpoints and iterate until the layout, typography, spacing, interaction states and data transparency feel finished.

## Acceptance checklist

- Search and quick filters work.
- Filters compose and persist visually.
- University cards open the correct profile.
- Programme rows open the correct detail view.
- Domestic/international requirement tabs work and show qualification-country context.
- Costs clearly identify official vs estimated/unavailable values.
- Scholarship eligibility checklist distinguishes included and excluded cases.
- Save, compare and tracker actions update state with clear feedback.
- How to apply, International students and Student life sections are reachable from navigation.
- Mobile layout is intentionally redesigned rather than merely scaled down.
- No screen presents invented facts as official information.
