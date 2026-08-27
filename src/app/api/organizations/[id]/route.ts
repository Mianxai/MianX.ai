import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionFromRequest } from '@/lib/auth';
import { z } from 'zod/v4';

const updateOrgSchema = z.object({
  legalName: z.string().min(1).max(200).optional(),
  displayName: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  website: z.string().url().max(500).optional().or(z.literal('')),
  industry: z.string().max(100).optional(),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-1000', '1000+']).optional(),
});

// GET /api/organizations/[id] — Get single org (only if user is member)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequest();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check membership
    const membership = await db.member.findUnique({
      where: { organizationId_userId: { organizationId: id, userId: session.user.id } },
      include: { role: true },
    });

    if (!membership) {
      return NextResponse.json({ success: false, error: 'Organization not found' }, { status: 404 });
    }

    const organization = await db.organization.findUnique({
      where: { id },
      include: {
        settings: true,
        workspaces: {
          select: { id: true, name: true, description: true, status: true, isDefault: true, createdAt: true },
        },
        _count: {
          select: { members: true },
        },
      },
    });

    if (!organization) {
      return NextResponse.json({ success: false, error: 'Organization not found' }, { status: 404 });
    }

    const data = {
      ...organization,
      memberCount: organization._count.members,
      _count: undefined,
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching organization:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/organizations/[id] — Update org (owner/admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequest();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check membership and role
    const membership = await db.member.findUnique({
      where: { organizationId_userId: { organizationId: id, userId: session.user.id } },
      include: { role: true },
    });

    if (!membership) {
      return NextResponse.json({ success: false, error: 'Organization not found' }, { status: 404 });
    }

    if (!['owner', 'admin'].includes(membership.role.name)) {
      return NextResponse.json({ success: false, error: 'Only owner or admin can update organization' }, { status: 403 });
    }

    const body = await request.json();
    const parsed = updateOrgSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => i.message).join(', ');
      return NextResponse.json({ success: false, error: message }, { status: 400 });
    }

    // Convert empty website string to null
    const updateData = { ...parsed.data };
    if (updateData.website === '') {
      updateData.website = undefined;
    }

    const updated = await db.organization.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating organization:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
