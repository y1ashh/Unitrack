# University Tracker production path

The UI runs against the live PostgreSQL catalog when `UNIVERSITY_TRACKER_LIVE_DATA=true`. The supplied CSV contains 199 university rows; the seed keeps five existing starter records and deduplicates the import into 202 institutions across 11 markets. Local browser planner state remains demo-only until authentication is connected.

## 1. Configure PostgreSQL

Copy `.env.example` to `.env`, set both `DATABASE_URL` and `DIRECT_URL` from the Supabase Prisma panel, then run:

```bash
pnpm install
pnpm db:generate
pnpm db:push
pnpm db:seed
```

The Prisma schema covers countries, jurisdictions, cities, institutions, campuses, faculties, departments, subjects, degrees, programs, codes, classifications, requirements, fees, scholarships, eligibility, deadlines, source evidence, verification records, saved items, and application tracking. The seed script creates 11 markets, imports `data/universities.csv`, includes Dubai as a UAE city, retains the five starter institution/program records, and deduplicates the catalog by country and canonical university name.

Use the transaction-mode pooler URL on port `6543` for `DATABASE_URL` and the session-mode URL on port `5432` for `DIRECT_URL`. Prisma uses the direct URL for schema changes while the application uses the pooled URL for normal queries.

## 2. Enable live catalog reads

Set `UNIVERSITY_TRACKER_LIVE_DATA=true` only after importing and verifying records. The `/api/catalog` endpoint then reads from PostgreSQL; otherwise it intentionally returns the demo catalog and explains its limitations.

## 3. Add authentication before planner writes

The schema is user-scoped for saved lists, saved universities, saved programs, saved scholarships, applicant context, and application tracker entries. Connect Auth.js, Clerk, or another identity provider at the server boundary before enabling write endpoints. Do not use a shared demo user in production.

## 4. Refresh official university metadata

The live university cards use the official homepage URL stored in the database. The metadata refresh is read-only: it visits each official homepage and writes `data/university-metadata.json` with the page title, description, city/region when published, logo/icon URL when exposed, HTTP status, and any fetch error. Blocked or incomplete pages stay marked for review rather than being filled with guessed facts.

Run it after changing the imported university list:

```bash
node scripts/fetch-university-metadata.mjs
```

The UI uses an extracted official logo when available, a domain favicon fallback when the university does not expose one, and a text monogram if an image cannot load. Every card still links to the official university website.

## 5. Import and verify data

Import government and official university records into stable IDs. Attach a `Source` and `DataAssertion` to every time-sensitive fact. Keep `UNKNOWN`, `NEEDS_REVIEW`, and `UNAVAILABLE` states visible; they are part of the trust model.

## 6. Deploy

Deploy the Next.js app and PostgreSQL database together, set `AUTH_SECRET`, `AUTH_URL`, `DATABASE_URL`, and `UNIVERSITY_TRACKER_LIVE_DATA=true`, then run the type-check, smoke test, and production build in CI.
