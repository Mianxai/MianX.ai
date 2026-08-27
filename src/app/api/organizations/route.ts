import { withAuth, ok, err } from '@/lib/api-guard';
import { db } from '@/lib/db';
import { z } from 'zod/v4';

const createOrgSchema = z.object({
  legalName: z.string().min(1, 'Legal name is required').max(200),
  displayName: z.string().min(1, 'Display name is required').max(200),
  code: z
    .string()
    .min(1, 'Code is required')
    .max(50)
    .regex(/^[a-zA-Z0-9]+$/, 'Code must be alphanumeric only'),
  industry: z.string().max(100).optional(),
});

// GET /api/organizations — List orgs the current user is a member of
export const GET = withAuth(async (_req, { session }) => {
  const organizations = await db.organization.findMany({
    where: {
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
    select: {
      id: true,
      code: true,
      legalName: true,
      displayName: true,
      industry: true,
      status: true,
      createdAt: true,
      _count: {
        select: { members: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const data = organizations.map((org) => ({
    id: org.id,
    code: org.code,
    legalName: org.legalName,
    displayName: org.displayName,
    industry: org.industry,
    status: org.status,
    memberCount: org._count.members,
    createdAt: org.createdAt,
  }));

  return ok({ data });
});

// POST /api/organizations — Create new organization (owner/admin only)
export const POST = withAuth(async (req, { orgId, session }) => {
  if (!orgId) {
    return err('No active organization', 403);
  }

  const body = await req.json();
  const parsed = createOrgSchema.safeParse(body);

  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => i.message).join(', ');
    return err(message, 400);
  }

  const { legalName, displayName, code, industry } = parsed.data;

  // Check uniqueness of code
  const existing = await db.organization.findUnique({ where: { code } });
  if (existing) {
    return err('Organization code already exists', 409);
  }

  // Find or create the 'owner' role
  let ownerRole = await db.role.findUnique({ where: { name: 'owner' } });
  if (!ownerRole) {
    ownerRole = await db.role.create({
      data: {
        name: 'owner',
        description: 'Organization owner with full access',
        permissions: JSON.stringify(['*']),
        isSystem: true,
      },
    });
  }

  const organization = await db.organization.create({
    data: {
      code,
      legalName,
      displayName,
      industry: industry || 'general',
      settings: { create: {} },
      workspaces: { create: { name: 'Default', isDefault: true } },
      members: { create: { userId: session.user.id, roleId: ownerRole.id, status: 'active' } },
    },
    include: { settings: true, workspaces: true, members: true },
  });

  return ok(organization, 201);
}, 'organizations:create');
