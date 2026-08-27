import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSessionFromRequest } from '@/lib/auth';

// GET /api/users — List all users in the current user's organization
export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromRequest();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Use the user's first active membership to determine org
    const activeMembership = session.user.memberships.find((m) => m.status === 'active');
    if (!activeMembership) {
      return NextResponse.json({ success: false, error: 'No active organization' }, { status: 403 });
    }

    const search = request.nextUrl.searchParams.get('search') || '';

    const where: Record<string, unknown> = {
      organizationId: activeMembership.organizationId,
    };

    if (search) {
      where.user = {
        OR: [
          { firstName: { contains: search } },
          { lastName: { contains: search } },
          { displayName: { contains: search } },
          { email: { contains: search } },
        ],
      };
    }

    const members = await db.member.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            displayName: true,
            status: true,
            lastLoginAt: true,
          },
        },
        role: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });

    const data = members.map((m) => ({
      id: m.user.id,
      email: m.user.email,
      firstName: m.user.firstName,
      lastName: m.user.lastName,
      displayName: m.user.displayName,
      status: m.user.status,
      roleName: m.role.name,
      lastLoginAt: m.user.lastLoginAt,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error listing users:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
