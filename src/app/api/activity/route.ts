import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { withAuth, ok } from '@/lib/api-guard';

export const GET = withAuth(async (req, { orgId }) => {
  const limit = Math.min(50, parseInt(req.nextUrl.searchParams.get('limit') || '20'));

  const where: Record<string, unknown> = { organizationId: orgId };

  const activities = await db.agentActivity.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return ok(activities);
}, 'leads:read');
