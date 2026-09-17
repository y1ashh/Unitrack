import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const databaseConfigured = Boolean(process.env.DATABASE_URL);
  const liveDataEnabled = process.env.UNIVERSITY_TRACKER_LIVE_DATA === 'true';
  let databaseReachable = false;
  const prisma = getPrisma();
  if (prisma && liveDataEnabled) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      databaseReachable = true;
    } catch {
      databaseReachable = false;
    }
  }
  return NextResponse.json({
    ok: true,
    service: 'university-tracker',
    mode: databaseConfigured && liveDataEnabled && databaseReachable ? 'live' : 'demo',
    databaseConfigured,
    liveDataEnabled,
    databaseReachable,
    plannerPersistence: 'local-demo',
    checkedAt: new Date().toISOString(),
  });
}
