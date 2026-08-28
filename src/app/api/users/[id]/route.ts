import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionFromRequest } from '@/lib/auth';
import { z } from 'zod/v4';

const updateUserSchema = z.object({
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  displayName: z.string().max(200).optional(),
  phone: z.string().max(30).optional().or(z.literal('')),
});

// GET /api/users/[id] — Get user by ID (must be in same org)
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

    // Determine the org IDs the current user belongs to
    const currentUserMembership = session.user.memberships.find((m) => m.status === 'active');
    if (!currentUserMembership) {
      return NextResponse.json({ success: false, error: 'No active organization' }, { status: 403 });
    }

    // Check that the target user is in the same org
    const targetMembership = await db.member.findUnique({
      where: { organizationId_userId: { organizationId: currentUserMembership.organizationId, userId: id } },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            displayName: true,
            phone: true,
            avatarUrl: true,
            status: true,
            lastLoginAt: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        role: {
          select: { id: true, name: true, description: true, isSystem: true },
        },
      },
    });

    if (!targetMembership) {
      return NextResponse.json({ success: false, error: 'User not found in your organization' }, { status: 404 });
    }

    const data = {
      ...targetMembership.user,
      roleName: targetMembership.role.name,
      membershipId: targetMembership.id,
      membershipStatus: targetMembership.status,
      joinedAt: targetMembership.joinedAt,
      lastActiveAt: targetMembership.lastActiveAt,
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/users/[id] — Update user profile
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequest();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const isSelf = session.user.id === id;

    if (!isSelf) {
      // Non-self updates require admin role
      const activeMembership = session.user.memberships.find((m) => m.status === 'active');
      if (!activeMembership || !['owner', 'admin'].includes(activeMembership.role.name)) {
        return NextResponse.json(
          { success: false, error: 'Only admins can update other users' },
          { status: 403 }
        );
      }

      // Verify target user is in the same org
      const targetMembership = await db.member.findUnique({
        where: { organizationId_userId: { organizationId: activeMembership.organizationId, userId: id } },
      });
      if (!targetMembership) {
        return NextResponse.json(
          { success: false, error: 'User not found in your organization' },
          { status: 404 }
        );
      }
    }

    const body = await request.json();
    const parsed = updateUserSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => i.message).join(', ');
      return NextResponse.json({ success: false, error: message }, { status: 400 });
    }

    const updateData: Record<string, unknown> = { ...parsed.data };
    if (updateData.phone === '') {
      updateData.phone = null;
    }

    const updated = await db.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        phone: true,
        avatarUrl: true,
        status: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
