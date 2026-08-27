import { NextResponse } from 'next/server';
import { withAuth, ok } from '@/lib/api-guard';

export const GET = withAuth(async (_req, { session }) => {
  const activeMembership = session.user.memberships.find(
    (m) => m.status === 'active',
  );

  let permissions: string[] = [];
  if (activeMembership) {
    try {
      permissions = JSON.parse(activeMembership.role.permissions);
    } catch {
      permissions = [];
    }
  }

  return ok({
    user: {
      id: session.user.id,
      email: session.user.email,
      firstName: session.user.firstName,
      lastName: session.user.lastName,
      displayName: session.user.displayName,
      avatarUrl: session.user.avatarUrl,
      status: session.user.status,
      createdAt: session.user.createdAt,
      lastLoginAt: session.user.lastLoginAt,
    },
    organization: activeMembership
      ? {
          id: activeMembership.organization.id,
          code: activeMembership.organization.code,
          legalName: activeMembership.organization.legalName,
          displayName: activeMembership.organization.displayName,
          description: activeMembership.organization.description,
          website: activeMembership.organization.website,
          industry: activeMembership.organization.industry,
          companySize: activeMembership.organization.companySize,
          status: activeMembership.organization.status,
        }
      : null,
    role: activeMembership
      ? {
          id: activeMembership.role.id,
          name: activeMembership.role.name,
          description: activeMembership.role.description,
          isSystem: activeMembership.role.isSystem,
        }
      : null,
    membership: activeMembership
      ? {
          id: activeMembership.id,
          status: activeMembership.status,
          joinedAt: activeMembership.joinedAt,
          lastActiveAt: activeMembership.lastActiveAt,
        }
      : null,
    permissions,
    isOwner: activeMembership?.role.name === 'owner',
  });
});
