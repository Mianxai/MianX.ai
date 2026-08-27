import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { withAuth, ok } from '@/lib/api-guard';

// GET /api/roles — List all roles (system-wide, read-only)
export const GET = withAuth(async (_req) => {
  const roles = await db.role.findMany({
    orderBy: { createdAt: 'asc' },
  });

  const data = roles.map((role) => ({
    id: role.id,
    name: role.name,
    description: role.description,
    permissions: (() => { try { return JSON.parse(role.permissions); } catch { return []; } })(),
    isSystem: role.isSystem,
  }));

  return ok({ data });
}, 'users:read');
