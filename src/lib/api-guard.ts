import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest, hasPermission } from './auth';

export type ApiHandler = (req: NextRequest, context: { session: any; orgId: string }) => Promise<NextResponse>;

/**
 * Wraps an API handler with authentication and organization membership check.
 * - Unauthenticated request → 401
 * - Authenticated but no active organization membership → 403
 * - Authenticated + valid membership → handler runs with guaranteed non-null orgId
 */
export function withAuth(handler: ApiHandler, requiredPermission?: string) {
  return async (req: NextRequest, context?: Record<string, unknown>): Promise<NextResponse> => {
    try {
      const session = await getSessionFromRequest();

      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const activeMembership = session.user.memberships?.find(
        (m: { status: string }) => m.status === 'active',
      );

      if (!activeMembership) {
        return NextResponse.json({ error: 'No active organization membership' }, { status: 403 });
      }

      let permissions: string[] = [];
      try {
        permissions = JSON.parse(activeMembership.role.permissions);
      } catch {
        permissions = [];
      }

      if (requiredPermission && !hasPermission(permissions, requiredPermission)) {
        return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
      }

      const orgId = activeMembership.organizationId;
      if (!orgId) {
        return NextResponse.json({ error: 'No active organization' }, { status: 403 });
      }

      return handler(req, {
        session,
        orgId,
      });
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  };
}

/**
 * Wraps an API handler requiring admin-level authorization.
 * Admin = user has an active membership with wildcard ('*') permission.
 */
export function withAdminAuth(handler: ApiHandler) {
  return withAuth(handler, '*');
}

/** Parse pagination params from URL */
export function parsePagination(url: URL) {
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '50')));
  return { skip: (page - 1) * limit, take: limit, page };
}

/** Standard success response */
export function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

/** Standard error response */
export function err(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}
