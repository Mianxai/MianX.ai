import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withAuth, ok, err } from '@/lib/api-guard';

// GET /api/audit — List audit events for the user's organization
export const GET = withAuth(async (request, { orgId }) => {
  if (!orgId) {
    return err('No active organization', 403);
  }

  const limit = Math.min(100, Math.max(1, parseInt(request.nextUrl.searchParams.get('limit') || '50')));
  const offset = Math.max(0, parseInt(request.nextUrl.searchParams.get('offset') || '0'));

  // Get all user IDs in the org to filter audit events
  const orgMemberUserIds = await db.member.findMany({
    where: { organizationId: orgId },
    select: { userId: true },
  });
  const userIds = orgMemberUserIds.map((m) => m.userId);

  if (userIds.length === 0) {
    return ok({ data: [], total: 0, limit, offset });
  }

  const [events, total] = await Promise.all([
    db.userAudit.findMany({
      where: { userId: { in: userIds } },
      include: {
        user: {
          select: { email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    db.userAudit.count({
      where: { userId: { in: userIds } },
    }),
  ]);

  const data = events.map((event) => ({
    id: event.id,
    eventType: event.eventType,
    userEmail: event.user.email,
    metadata: event.metadata ? (() => { try { return JSON.parse(event.metadata); } catch { return null; } })() : null,
    ipAddress: event.ipAddress,
    createdAt: event.createdAt,
  }));

  return ok({ data, total, limit, offset });
}, 'audit:read');
