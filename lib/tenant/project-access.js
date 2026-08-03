/**
 * Membership-scoped project data access (Phase 1 Step 3).
 *
 * Production truth (migration still unapplied):
 * - admin_memberships remain global (no organization_id / project_id columns in use)
 * - Scope defaults to the canonical default organization (slug "mianx")
 * - platform.admin (owner) may list the full default-org set with explicit policy
 * - Allowlist mode supports future membership project_id and cross-tenant tests
 *
 * Never trust client-supplied organization/project/role as authorization.
 * Client project_id is only a *requested* scope — always validated.
 */

import { getOrCreateDefaultOrg } from "@/lib/core/repo";
import { forbidden, notFound, badRequest, unauthorized } from "@/lib/core/errors";
import {
  requireAdminUser,
  CAPABILITIES,
  hasCapability,
} from "@/lib/admin-auth";
import { isPlatformAdminRole } from "@/lib/admin-capabilities";
import { assertUuid } from "@/lib/core/validate";
import * as repo from "@/lib/core/repo";

export const PROJECT_ACCESS_MODES = Object.freeze({
  /** All non-archived projects in the canonical default organization. */
  ORGANIZATION: "organization",
  /** Explicit project ID allowlist (future membership.project_id / tests). */
  PROJECT_ALLOWLIST: "project_allowlist",
  /** Owner/platform.admin — same org scope today, marked for audit. */
  PLATFORM_ORGANIZATION: "platform_organization",
});

/** Distinguishable access outcomes (fail closed — never empty-success). */
export const PROJECT_ACCESS_OUTCOMES = Object.freeze({
  AUTHORIZED: "authorized",
  UNAUTHENTICATED: "unauthenticated",
  FORBIDDEN: "forbidden",
  MEMBERSHIP_MISSING: "membership_missing",
  SCOPE_MISMATCH: "scope_mismatch",
  PROJECT_NOT_FOUND: "project_not_found",
  CONTEXT_UNAVAILABLE: "context_unavailable",
});

/**
 * Resolve trusted project access scope from an admin auth context.
 * Optional overrides (tests / future membership columns) must be server-supplied.
 *
 * @param {object} authCtx — from requireAdminUser
 * @param {{
 *   organizationId?: string|null,
 *   projectIds?: string[]|null,
 *   forceAllowlist?: boolean,
 * }} [overrides]
 */
export async function resolveProjectAccessScope(authCtx, overrides = {}) {
  if (!authCtx?.user?.id && !authCtx?.user?.email) {
    return {
      ok: false,
      code: PROJECT_ACCESS_OUTCOMES.UNAUTHENTICATED,
      mode: null,
      organizationId: null,
      projectIds: null,
      platformAdmin: false,
    };
  }

  const role = authCtx.membership?.role || null;
  const platformAdmin =
    isPlatformAdminRole(role, authCtx.mode) ||
    hasCapability(authCtx.capabilities || [], CAPABILITIES.PLATFORM_ADMIN);

  let organizationId = overrides.organizationId || null;
  if (!organizationId) {
    const org = await getOrCreateDefaultOrg();
    organizationId = org?.id || null;
  }
  if (!organizationId) {
    return {
      ok: false,
      code: PROJECT_ACCESS_OUTCOMES.CONTEXT_UNAVAILABLE,
      mode: null,
      organizationId: null,
      projectIds: null,
      platformAdmin,
    };
  }

  const overrideIds = Array.isArray(overrides.projectIds)
    ? [...new Set(overrides.projectIds.map(String))]
    : null;

  if (overrides.forceAllowlist || overrideIds) {
    return {
      ok: true,
      code: PROJECT_ACCESS_OUTCOMES.AUTHORIZED,
      mode: PROJECT_ACCESS_MODES.PROJECT_ALLOWLIST,
      organizationId,
      projectIds: overrideIds || [],
      platformAdmin,
      role,
      userId: authCtx.user.id || authCtx.user.email || null,
    };
  }

  return {
    ok: true,
    code: PROJECT_ACCESS_OUTCOMES.AUTHORIZED,
    mode: platformAdmin
      ? PROJECT_ACCESS_MODES.PLATFORM_ORGANIZATION
      : PROJECT_ACCESS_MODES.ORGANIZATION,
    organizationId,
    projectIds: null, // null = all projects in organizationId
    platformAdmin,
    role,
    userId: authCtx.user.id || authCtx.user.email || null,
  };
}

/**
 * Convert scope → repo.listProjects options.
 */
export function scopeToListProjectsOpts(scope) {
  if (!scope?.ok) return { organizationId: "__deny__", projectIds: [] };
  if (scope.mode === PROJECT_ACCESS_MODES.PROJECT_ALLOWLIST) {
    return {
      organizationId: scope.organizationId,
      projectIds: scope.projectIds || [],
    };
  }
  return { organizationId: scope.organizationId };
}

/**
 * Whether a project row/id is inside the trusted scope.
 */
export function projectInScope(scope, project) {
  if (!scope?.ok || !project) return false;
  const id = typeof project === "string" ? project : project.id;
  const orgId =
    typeof project === "string" ? null : project.organization_id || null;
  if (!id) return false;
  if (scope.mode === PROJECT_ACCESS_MODES.PROJECT_ALLOWLIST) {
    return (scope.projectIds || []).includes(String(id));
  }
  // Organization / platform modes require a matching organization_id on the row.
  if (!orgId || !scope.organizationId) return false;
  if (String(orgId) !== String(scope.organizationId)) return false;
  return true;
}

/**
 * Fail-closed assert for a loaded project row (privacy-preserving 404).
 */
export function assertProjectRowInScope(scope, project) {
  if (!scope?.ok) {
    return { ok: false, status: 403, code: "FORBIDDEN" };
  }
  if (!project || project.archived_at) {
    return { ok: false, status: 404, code: "PROJECT_NOT_FOUND" };
  }
  if (!projectInScope(scope, project)) {
    return { ok: false, status: 404, code: "PROJECT_NOT_FOUND" };
  }
  return { ok: true };
}

/**
 * Require authenticated admin + project access for a requested project_id.
 * @returns {Promise<{ authCtx, scope, project }>}
 */
export async function requireProjectAccess(req, projectId, { capability = null } = {}) {
  if (!projectId) throw badRequest("project_id is required.");
  assertUuid(projectId, "project_id");

  let authCtx;
  try {
    authCtx = await requireAdminUser(req);
  } catch (err) {
    const status = err?.status || err?.statusCode;
    if (status === 401) throw unauthorized();
    throw err;
  }

  if (capability && !hasCapability(authCtx.capabilities, capability)) {
    throw forbidden("Insufficient admin role for this action.");
  }

  const scope = await resolveProjectAccessScope(authCtx);
  if (!scope.ok) {
    if (scope.code === PROJECT_ACCESS_OUTCOMES.UNAUTHENTICATED) {
      throw unauthorized();
    }
    if (scope.code === PROJECT_ACCESS_OUTCOMES.MEMBERSHIP_MISSING) {
      throw forbidden("Admin membership required.");
    }
    throw forbidden("Tenant context unavailable.");
  }

  const listOpts = scopeToListProjectsOpts(scope);
  let project;
  try {
    project = await repo.getProject(projectId, listOpts);
  } catch (err) {
    if (err?.status === 404 || err?.statusCode === 404) {
      throw notFound("Project not found.");
    }
    throw err;
  }

  const gate = assertProjectRowInScope(scope, project);
  if (!gate.ok) {
    if (gate.status === 404) throw notFound("Project not found.");
    throw forbidden("Insufficient admin role for this action.");
  }

  return { authCtx, scope, project };
}

/**
 * Require admin + resolve list scope (no specific project required).
 */
export async function requireTenantListScope(req, { capability = null } = {}) {
  const authCtx = await requireAdminUser(req);
  if (capability && !hasCapability(authCtx.capabilities, capability)) {
    throw forbidden("Insufficient admin role for this action.");
  }
  const scope = await resolveProjectAccessScope(authCtx);
  if (!scope.ok) {
    if (scope.code === PROJECT_ACCESS_OUTCOMES.UNAUTHENTICATED) {
      throw unauthorized();
    }
    throw forbidden("Tenant context unavailable.");
  }
  return { authCtx, scope };
}

/**
 * Filter an in-memory row list by project_id against scope (search/pagination/export).
 */
export function filterRowsByScope(rows, scope, projectKey = "project_id") {
  if (!scope?.ok) return [];
  if (scope.mode === PROJECT_ACCESS_MODES.PROJECT_ALLOWLIST) {
    const allow = new Set((scope.projectIds || []).map(String));
    return (rows || []).filter((r) => allow.has(String(r[projectKey] || r.projectId)));
  }
  // Org mode: caller should already query with organization/project filters;
  // still drop rows missing project_id.
  return (rows || []).filter((r) => r[projectKey] || r.projectId);
}

export function auditScopePayload(scope, extra = {}) {
  return {
    mode: scope?.mode || null,
    organizationId: scope?.organizationId || null,
    projectIds: scope?.projectIds || null,
    platformAdmin: scope?.platformAdmin === true,
    ...extra,
  };
}
