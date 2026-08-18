/**
 * Deterministic cross-tenant fixtures for isolation regression tests.
 * In-memory only — does not write Production database rows.
 * Workspaces are intentionally null — not implemented in Production.
 */

export const TENANT_A = Object.freeze({
  organizationId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  organizationSlug: "org-a",
  workspaceId: null, // workspaces not implemented
  projectId: "aa111111-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  projectSlug: "project-a",
  adminUserId: "a-admin-0000-0000-0000-000000000001",
  operatorUserId: "a-oper-0000-0000-0000-000000000005",
  viewerUserId: "a-view-0000-0000-0000-000000000002",
  /** @deprecated alias — prefer viewerUserId */
  memberUserId: "a-view-0000-0000-0000-000000000002",
  agentId: "agent-a-0000-0000-0000-000000000003",
  taskId: "task-a-0000-0000-0000-000000000004",
  adminRole: "admin",
  operatorRole: "operator",
  viewerRole: "viewer",
  memberRole: "viewer",
});

export const TENANT_B = Object.freeze({
  organizationId: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
  organizationSlug: "org-b",
  workspaceId: null,
  projectId: "bb222222-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
  projectSlug: "project-b",
  adminUserId: "b-admin-0000-0000-0000-000000000001",
  operatorUserId: "b-oper-0000-0000-0000-000000000005",
  viewerUserId: "b-view-0000-0000-0000-000000000002",
  memberUserId: "b-view-0000-0000-0000-000000000002",
  agentId: "agent-b-0000-0000-0000-000000000003",
  taskId: "task-b-0000-0000-0000-000000000004",
  adminRole: "admin",
  operatorRole: "operator",
  viewerRole: "viewer",
  memberRole: "viewer",
});

export function makeMembershipFixture({
  userId,
  role,
  status = "active",
  revokedAt = null,
  organizationId = null,
  projectId = null,
} = {}) {
  return {
    id: `mem-${userId}`,
    user_id: userId,
    email: `${userId}@example.test`,
    role,
    status,
    revoked_at: revokedAt,
    // Future columns (migration Draft) — currently ignored by Production lookup
    organization_id: organizationId,
    project_id: projectId,
  };
}

export function filterRowsByProject(rows, projectId) {
  return (rows || []).filter((r) => String(r.project_id || r.projectId) === String(projectId));
}

export function denyCrossTenantAccess({ actorProjectId, resourceProjectId }) {
  if (!actorProjectId || !resourceProjectId) {
    return { allowed: false, status: 400, code: "PROJECT_SCOPE_MISSING" };
  }
  if (String(actorProjectId) !== String(resourceProjectId)) {
    // Privacy-preserving 404 preferred for unknown foreign resources.
    return { allowed: false, status: 404, code: "PROJECT_NOT_FOUND" };
  }
  return { allowed: true, status: 200, code: null };
}

export function denyUnknownRole(role) {
  const known = ["owner", "admin", "operator", "viewer"];
  if (!role || !known.includes(role)) {
    return { allowed: false, status: 403, code: "UNKNOWN_ROLE" };
  }
  return { allowed: true };
}

export function denySuspendedOrRemoved({ status, revokedAt, revoked_at } = {}) {
  const revoked = revokedAt || revoked_at;
  if (status === "suspended" || status === "revoked" || revoked) {
    return { allowed: false, status: 403, code: "MEMBERSHIP_INACTIVE" };
  }
  if (status !== "active") {
    return { allowed: false, status: 403, code: "MEMBERSHIP_INACTIVE" };
  }
  return { allowed: true };
}
