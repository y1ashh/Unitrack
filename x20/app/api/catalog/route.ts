import { NextRequest, NextResponse } from 'next/server';
import { searchCatalog } from '@/lib/server/catalog';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const result = await searchCatalog({
    q: url.searchParams.get('q') || undefined,
    country: url.searchParams.get('country') || undefined,
    degree: url.searchParams.get('degree') || undefined,
    type: url.searchParams.get('type') || undefined,
  });
  return NextResponse.json(result, { headers: { 'x-university-tracker-mode': result.mode } });
}
