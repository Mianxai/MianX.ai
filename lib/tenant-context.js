/**
 * Trusted Admin tenant / project context resolution.
 *
 * Current Production truth: single-tenant Founder platform.
 * - One default organization (slug "mianx").
 * - admin_memberships are global (not org/project scoped yet).
 * - Project isolation is application-level when projectId is provided.
 *
 * Never trust organizationId / workspaceId / projectId / role from:
 * query params, body, arbitrary headers, or localStorage.
 * Only the verified session user + durable membership (+ optional
 * server-loaded project row) may populate this context.
 */

import { getSessionUser } from "@/lib/auth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { unauthorized, forbidden, badRequest, notFound } from "@/lib/core/errors";
import { assertMutationOrigin } from "@/lib/csrf";
import {
  requireAdminUser,
  CAPABILITIES,
  hasCapability,
} from "@/lib/admin-auth";
import {
  capabilitiesForAuthContext,
} from "@/lib/admin-capabilities";

export const TENANCY_MODEL = Object.freeze({
  model: "single_tenant_founder_platform",
  organizations: "one_default_org",
  workspaces: "not_implemented",
  adminMemberships: "global_not_org_scoped",
  projectIsolation: "application_level_when_project_id_provided",
  platformAdminDistinctFromTenantAdmin: true,
  note: "Any active admin_membership currently authorizes all projects in the default org. Multi-org membership scoping is a follow-on migration (Draft only until Founder apply).",
});

export const TENANT_CONTEXT_OUTCOMES = Object.freeze({
  AUTHENTICATED_AUTHORIZED: "authenticated_authorized",
  UNAUTHENTICATED: "unauthenticated",
  FORBIDDEN: "forbidden",
  MEMBERSHIP_MISSING: "membership_missing",
  SCOPE_MISMATCH: "scope_mismatch",
  TENANT_CONTEXT_UNAVAILABLE: "tenant_context_unavailable",
  PROJECT_REQUIRED: "project_required",
  PROJECT_NOT_FOUND: "project_not_found",
});

/**
 * Strip client-supplied scope claims that must never be trusted.
 * @param {object} raw
 */
export function rejectUntrustedScopeClaims(raw = {}) {
  const rejected = [];
  for (const key of [
    "role",
    "organizationId",
    "organization_id",
    "workspaceId",
    "workspace_id",
    "platformAdmin",
    "isPlatformAdmin",
    "permissions",
    "capabilities",
  ]) {
    if (Object.prototype.hasOwnProperty.call(raw, key) && raw[key] != null) {
      rejected.push(key);
    }
  }
  return {
    ok: rejected.length === 0,
    rejected,
    code: rejected.length ? "UNTRUSTED_SCOPE_CLAIM" : null,
  };
}

/**
 * Resolve trusted Admin context from the authenticated session only.
 * Optional projectId must be a UUID already validated by the caller;
 * the project row is loaded server-side — never trust org id from the client.
 *
 * @param {Request} req
 * @param {{ projectId?: string|null, requireProject?: boolean }} [opts]
 */
export async function resolveAdminTenantContext(req, opts = {}) {
  assertMutationOrigin(req);

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      outcome: TENANT_CONTEXT_OUTCOMES.TENANT_CONTEXT_UNAVAILABLE,
      tenancyModel: TENANCY_MODEL,
      userId: null,
      organizationId: null,
      workspaceId: null,
      projectId: null,
      membershipId: null,
      role: null,
      permissions: [],
      platformAdmin: false,
      tenantAdmin: false,
    };
  }

  let authCtx;
  try {
    authCtx = await requireAdminUser(req);
  } catch (err) {
    const status = err?.status || err?.statusCode;
    if (status === 401) {
      return {
        ok: false,
        outcome: TENANT_CONTEXT_OUTCOMES.UNAUTHENTICATED,
        tenancyModel: TENANCY_MODEL,
        userId: null,
        organizationId: null,
        workspaceId: null,
        projectId: null,
        membershipId: null,
        role: null,
        permissions: [],
        platformAdmin: false,
        tenantAdmin: false,
      };
    }
    if (status === 403) {
      const user = await getSessionUser(req).catch(() => null);
      return {
        ok: false,
        outcome: user
          ? TENANT_CONTEXT_OUTCOMES.MEMBERSHIP_MISSING
          : TENANT_CONTEXT_OUTCOMES.FORBIDDEN,
        tenancyModel: TENANCY_MODEL,
        userId: user?.id || null,
        organizationId: null,
        workspaceId: null,
        projectId: null,
        membershipId: null,
        role: null,
        permissions: [],
        platformAdmin: false,
        tenantAdmin: false,
      };
    }
    throw err;
  }

  const role = authCtx.membership?.role || null;
  const permissions = authCtx.capabilities || capabilitiesForAuthContext(authCtx);
  // Platform Admin = Founder owner role (server membership only). Distinct from
  // tenant/project admin until org-scoped memberships exist.
  const platformAdmin = role === "owner" || authCtx.mode === "bootstrap";
  const tenantAdmin = role === "admin" || role === "owner" || authCtx.mode === "bootstrap";

  const projectId = opts.projectId ? String(opts.projectId).trim() : null;
  if (opts.requireProject && !projectId) {
    return {
      ok: false,
      outcome: TENANT_CONTEXT_OUTCOMES.PROJECT_REQUIRED,
      tenancyModel: TENANCY_MODEL,
      userId: authCtx.user.id,
      organizationId: null,
      workspaceId: null,
      projectId: null,
      membershipId: authCtx.membership?.id || null,
      role,
      permissions,
      platformAdmin,
      tenantAdmin,
      mode: authCtx.mode,
    };
  }

  let organizationId = null;
  if (projectId) {
    const admin = getSupabaseAdmin();
    if (!admin) {
      return {
        ok: false,
        outcome: TENANT_CONTEXT_OUTCOMES.TENANT_CONTEXT_UNAVAILABLE,
        tenancyModel: TENANCY_MODEL,
        userId: authCtx.user.id,
        organizationId: null,
        workspaceId: null,
        projectId,
        membershipId: authCtx.membership?.id || null,
        role,
        permissions,
        platformAdmin,
        tenantAdmin,
        mode: authCtx.mode,
      };
    }
    const { data, error } = await admin
      .from("projects")
      .select("id, organization_id, archived_at")
      .eq("id", projectId)
      .maybeSingle();
    if (error) {
      return {
        ok: false,
        outcome: TENANT_CONTEXT_OUTCOMES.TENANT_CONTEXT_UNAVAILABLE,
        tenancyModel: TENANCY_MODEL,
        userId: authCtx.user.id,
        organizationId: null,
        workspaceId: null,
        projectId,
        membershipId: authCtx.membership?.id || null,
        role,
        permissions,
        platformAdmin,
        tenantAdmin,
        mode: authCtx.mode,
      };
    }
    if (!data || data.archived_at) {
      // Privacy-preserving: do not reveal whether an unrelated id exists.
      return {
        ok: false,
        outcome: TENANT_CONTEXT_OUTCOMES.PROJECT_NOT_FOUND,
        tenancyModel: TENANCY_MODEL,
        userId: authCtx.user.id,
        organizationId: null,
        workspaceId: null,
        projectId: null,
        membershipId: authCtx.membership?.id || null,
        role,
        permissions,
        platformAdmin,
        tenantAdmin,
        mode: authCtx.mode,
      };
    }
    organizationId = data.organization_id || null;
  }

  return {
    ok: true,
    outcome: TENANT_CONTEXT_OUTCOMES.AUTHENTICATED_AUTHORIZED,
    tenancyModel: TENANCY_MODEL,
    userId: authCtx.user.id,
    organizationId,
    workspaceId: null, // workspaces not implemented
    projectId: projectId || null,
    membershipId: authCtx.membership?.id || null,
    role,
    permissions,
    platformAdmin,
    tenantAdmin,
    mode: authCtx.mode,
    user: authCtx.user,
    membership: authCtx.membership,
  };
}

/**
 * Require a capability and a trusted project scope.
 * Missing/invalid project fails closed (404 privacy-preserving or 400).
 *
 * @param {Request} req
 * @param {string} capability
 * @param {{ projectId?: string|null, requireProject?: boolean }} [opts]
 */
export async function requireCapabilityAndProject(req, capability, opts = {}) {
  const requireProject = opts.requireProject !== false;
  const projectId = opts.projectId ?? null;
  if (requireProject && !projectId) {
    throw badRequest("project_id is required.");
  }

  const ctx = await resolveAdminTenantContext(req, {
    projectId,
    requireProject,
  });

  if (!ctx.ok) {
    if (ctx.outcome === TENANT_CONTEXT_OUTCOMES.UNAUTHENTICATED) {
      throw unauthorized();
    }
    if (ctx.outcome === TENANT_CONTEXT_OUTCOMES.PROJECT_REQUIRED) {
      throw badRequest("project_id is required.");
    }
    if (ctx.outcome === TENANT_CONTEXT_OUTCOMES.PROJECT_NOT_FOUND) {
      throw notFound("Project not found.");
    }
    if (ctx.outcome === TENANT_CONTEXT_OUTCOMES.TENANT_CONTEXT_UNAVAILABLE) {
      throw forbidden("Tenant context unavailable.");
    }
    throw forbidden("Admin membership required.");
  }

  if (!hasCapability(ctx.permissions, capability)) {
    throw forbidden("Insufficient admin role for this action.");
  }

  return ctx;
}

/**
 * Assert two project IDs match (cross-project fail-closed).
 * @param {string} expectedProjectId
 * @param {string} actualProjectId
 */
export function assertSameProject(expectedProjectId, actualProjectId) {
  if (!expectedProjectId || !actualProjectId) {
    return { ok: false, code: "PROJECT_SCOPE_MISSING" };
  }
  if (String(expectedProjectId) !== String(actualProjectId)) {
    return { ok: false, code: "CROSS_PROJECT_FORBIDDEN" };
  }
  return { ok: true };
}

/**
 * Build a sanitized audit actor payload from tenant context (no secrets).
 */
export function auditActorFromTenantContext(ctx) {
  return {
    actorId: ctx?.userId || null,
    actorRole: ctx?.role || null,
    organizationId: ctx?.organizationId || null,
    projectId: ctx?.projectId || null,
    membershipId: ctx?.membershipId || null,
    platformAdmin: ctx?.platformAdmin === true,
  };
}

export { CAPABILITIES };
