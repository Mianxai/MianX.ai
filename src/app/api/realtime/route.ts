import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { getRealtimeUpdates } from '@/lib/realtime';

/**
 * GET /api/realtime?since=2026-01-01T00:00:00.000Z
 *
 * Polling-based realtime endpoint.
 * Returns new leads, activities, and current dashboard stats since the given timestamp.
 * Requires authentication.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromRequest();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const since = req.nextUrl.searchParams.get('since');
    if (!since) {
      return NextResponse.json(
        { error: 'Missing required query parameter: since' },
        { status: 400 },
      );
    }

    // Validate it parses as a date
    const parsed = new Date(since);
    if (isNaN(parsed.getTime())) {
      return NextResponse.json(
        { error: 'Invalid "since" timestamp — must be a valid ISO date string' },
        { status: 400 },
      );
    }

    // Determine org scope from active membership
    const activeMembership = session.user.memberships?.find(
      (m: { status: string }) => m.status === 'active',
    );
    if (!activeMembership?.organizationId) {
      return NextResponse.json({ error: 'No active organization' }, { status: 403 });
    }
    const orgId = activeMembership.organizationId;

    const updates = await getRealtimeUpdates(since, orgId);

    return NextResponse.json(updates);
  } catch (error) {
    console.error('[Realtime API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch realtime updates' },
      { status: 500 },
    );
  }
}
