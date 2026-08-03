/**
 * Static Admin / Core route authorization inventory (documentation as data).
 * Keep in sync when adding protected routes. Not a runtime enforcer.
 */

export const ROUTE_AUTH_INVENTORY = Object.freeze([
  {
    route: "/api/admin/session",
    authRequired: false,
    authorization: "origin + rate limit; sets cookie only",
    tenantScope: "none",
    helper: "getSessionUser (POST validate)",
    tables: ["none"],
    serviceRole: false,
    rlsReliance: "n/a",
    risk: "low",
    testCoverage: "session route tests",
  },
  {
    route: "/api/admin/* (most GET/POST)",
    authRequired: true,
    authorization: "requireAdmin (membership); few use requireCapability",
    tenantScope: "global membership — all projects visible (single-tenant)",
    helper: "requireAdmin / requireAdminUser",
    tables: "varies",
    serviceRole: true,
    rlsReliance: "deny-anon; service_role bypass",
    risk: "medium — no org-scoped membership yet",
    testCoverage: "admin-auth + route auth tests",
  },
  {
    route: "/api/admin/runtime/tick",
    authRequired: true,
    authorization: "requireCapability(MANAGE_JOBS)",
    tenantScope: "platform",
    helper: "requireCapability",
    tables: ["runtime_jobs"],
    serviceRole: true,
    rlsReliance: "service_role",
    risk: "low with capability",
    testCoverage: "capability tests",
  },
  {
    route: "/api/admin/live-agent-pilot",
    authRequired: true,
    authorization: "requireAdmin (+ LIVE_PILOT_READ preferred)",
    tenantScope: "pilot project hard-bound in policy",
    helper: "requireAdmin",
    tables: ["pilot_*", "pilot_live_run_authorizations"],
    serviceRole: true,
    rlsReliance: "FORCE RLS + service_role",
    risk: "medium — any admin can read pilot status",
    testCoverage: "live-pilot route tests",
  },
  {
    route: "/api/core/projects",
    authRequired: true,
    authorization: "requireAdmin / MANAGE_PROJECTS",
    tenantScope: "GET lists all projects (single-tenant)",
    helper: "requireAdmin + repo.listProjects",
    tables: ["projects", "organizations"],
    serviceRole: true,
    rlsReliance: "service_role",
    risk: "high for future multi-tenant",
    testCoverage: "projects route tests",
  },
  {
    route: "/api/core/tasks|runs|jobs",
    authRequired: true,
    authorization: "requireAdmin / capabilities",
    tenantScope: "project_id often required; optional on some lists",
    helper: "requireAdmin + repo getters",
    tables: ["tasks", "runs", "runtime_jobs"],
    serviceRole: true,
    rlsReliance: "service_role",
    risk: "medium — optional project_id enumeration",
    testCoverage: "core API tests",
  },
  {
    route: "/api/core/health",
    authRequired: false,
    authorization: "public",
    tenantScope: "none",
    helper: "none",
    tables: "read-only status",
    serviceRole: true,
    rlsReliance: "service_role probes",
    risk: "low (no secrets)",
    testCoverage: "health tests",
  },
  {
    route: "/api/internal/runtime/tick",
    authRequired: true,
    authorization: "Bearer INTERNAL_RUNTIME_SECRET / CRON_SECRET",
    tenantScope: "platform worker",
    helper: "requireInternalWorker",
    tables: ["runtime_jobs"],
    serviceRole: true,
    rlsReliance: "service_role",
    risk: "secret management",
    testCoverage: "internal-auth tests",
  },
]);

export function summarizeRouteInventoryRisks() {
  return ROUTE_AUTH_INVENTORY.filter((r) =>
    String(r.risk).startsWith("high") || String(r.risk).startsWith("medium")
  );
}
