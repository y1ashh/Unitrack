import { readFile } from 'node:fs/promises';

const requiredRoutes = [
  'app/page.tsx',
  'app/discover/page.tsx',
  'app/universities/page.tsx',
  'app/universities/[slug]/page.tsx',
  'app/programs/page.tsx',
  'app/programs/[slug]/page.tsx',
  'app/scholarships/page.tsx',
  'app/compare/page.tsx',
  'app/saved/page.tsx',
  'app/tracker/page.tsx',
  'app/how-to-apply/page.tsx',
  'app/international-students/page.tsx',
  'app/student-life/page.tsx',
  'app/resources/page.tsx',
  'app/admin/page.tsx',
  'app/api/catalog/route.ts',
  'app/api/health/route.ts',
  'prisma/schema.prisma',
  'docs/PRODUCTION.md',
];

for (const route of requiredRoutes) {
  await readFile(route);
}

const data = await readFile('lib/data.ts', 'utf8');
for (const country of ['India', 'United Kingdom', 'United States', 'Canada', 'United Arab Emirates', 'Ireland', 'Italy', 'France', 'Japan', 'Hong Kong SAR', 'China']) {
  if (!data.includes(country)) throw new Error(`Missing seed country: ${country}`);
}

console.log(`✓ ${requiredRoutes.length} required project files present`);
console.log('✓ 11 initial markets present in seed data');
if (!data.includes('Official admissions source')) throw new Error('Missing source metadata coverage');
console.log('✓ Source metadata and production handoff boundary present');
