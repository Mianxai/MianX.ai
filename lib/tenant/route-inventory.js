/**
 * Static Admin / Core route authorization inventory (documentation as data).
 * Keep in sync when adding protected routes. Not a runtime enforcer.
 *
 * Entries may be exact paths or prefix wildcards ending in `/*`.
 * Use `listAdminApiRouteFiles()` + `assertRouteInventoryCoversAdminTree()`
 * in tests to reconcile against the filesystem.
 */

export const ROUTE_AUTH_INVENTORY = Object.freeze([
  {
    route: "/api/admin/session",
    methods: ["GET", "POST", "DELETE"],
    authRequired: false,
    authorization: "origin + rate limit; sets cookie only",
    permission: "none (session bootstrap)",
    tenantScope: "none",
    helper: "getSessionUser (POST validate)",
    tables: ["none"],
    serviceRole: false,
    mutation: true,
    auditRequired: false,
    rlsReliance: "n/a",
    risk: "low",
    remediation: "protected",
    testCoverage: "session route tests",
  },
  {
    route: "/api/admin/*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    authRequired: true,
    authorization: "requireAdmin (membership); few use requireCapability",
    permission: "membership active (coarse); capability on some mutations",
    tenantScope: "global membership — all projects visible (single-tenant)",
    helper: "requireAdmin / requireAdminUser / requireCapability",
    tables: "varies",
    serviceRole: true,
    mutation: true,
    auditRequired: "partial — meaningful mutations only",
    rlsReliance: "deny-anon; service_role bypass",
    risk: "medium — no org-scoped membership yet",
    remediation: "still_open_for_step_3",
    testCoverage: "admin-auth + route auth tests",
  },
  {
    route: "/api/admin/runtime/tick",
    methods: ["POST"],
    authRequired: true,
    authorization: "requireCapability(MANAGE_JOBS)",
    permission: "manage_jobs",
    tenantScope: "platform",
    helper: "requireCapability",
    tables: ["runtime_jobs"],
    serviceRole: true,
    mutation: true,
    auditRequired: true,
    rlsReliance: "service_role",
    risk: "low with capability",
    remediation: "protected",
    testCoverage: "capability tests",
  },
  {
    route: "/api/admin/live-agent-pilot",
    methods: ["GET", "POST"],
    authRequired: true,
    authorization: "requireCapability(LIVE_PILOT_READ|LIVE_PILOT_AUTHORIZE)",
    permission: "live_pilot.read (GET); live_pilot.authorize (POST authorize/kill)",
    tenantScope: "pilot project hard-bound in policy",
    helper: "requireCapability",
    tables: ["pilot_*", "pilot_live_run_authorizations"],
    serviceRole: true,
    mutation: true,
    auditRequired: true,
    rlsReliance: "FORCE RLS + service_role",
    risk: "low after capability split",
    remediation: "fixed",
    testCoverage: "live-pilot route tests",
  },
  {
    route: "/api/admin/live-agent-pilot/execute",
    methods: ["POST"],
    authRequired: true,
    authorization: "requireCapability(LIVE_PILOT_AUTHORIZE) + live switches",
    permission: "live_pilot.authorize",
    tenantScope: "pilot project hard-bound",
    helper: "requireCapability",
    tables: ["pilot_*"],
    serviceRole: true,
    mutation: true,
    auditRequired: true,
    rlsReliance: "FORCE RLS + service_role",
    risk: "blocked by no-credit / switches (provider not called)",
    remediation: "protected",
    testCoverage: "live-pilot execute tests",
  },
  {
    route: "/api/core/projects",
    methods: ["GET", "POST"],
    authRequired: true,
    authorization: "requireAdmin / MANAGE_PROJECTS",
    permission: "read / manage_projects",
    tenantScope: "GET lists all projects (single-tenant)",
    helper: "requireAdmin + repo.listProjects",
    tables: ["projects", "organizations"],
    serviceRole: true,
    mutation: true,
    auditRequired: "create yes",
    rlsReliance: "service_role",
    risk: "high for future multi-tenant",
    remediation: "still_open_for_step_3",
    testCoverage: "projects route tests",
  },
  {
    route: "/api/core/projects/*",
    methods: ["GET", "PATCH"],
    authRequired: true,
    authorization: "requireAdmin + id lookup",
    permission: "read / manage_projects",
    tenantScope: "id-only today (single-tenant)",
    helper: "requireAdmin + repo getters",
    tables: ["projects"],
    serviceRole: true,
    mutation: true,
    auditRequired: "mutations",
    rlsReliance: "service_role",
    risk: "medium — foreign UUID enumeration after membership",
    remediation: "still_open_for_step_3",
    testCoverage: "projects [id] route tests",
  },
  {
    route: "/api/core/tasks",
    methods: ["GET", "POST"],
    authRequired: true,
    authorization: "requireAdmin / capabilities",
    permission: "read / manage_tasks",
    tenantScope: "project_id often required; optional on some lists",
    helper: "requireAdmin + repo getters",
    tables: ["tasks"],
    serviceRole: true,
    mutation: true,
    auditRequired: "mutations",
    rlsReliance: "service_role",
    risk: "medium — optional project_id enumeration",
    remediation: "still_open_for_step_3",
    testCoverage: "core API tests",
  },
  {
    route: "/api/core/tasks/*",
    methods: ["GET", "PATCH"],
    authRequired: true,
    authorization: "requireAdmin + id lookup",
    permission: "read / manage_tasks",
    tenantScope: "id-only today",
    helper: "requireAdmin + repo getters",
    tables: ["tasks"],
    serviceRole: true,
    mutation: true,
    auditRequired: "mutations",
    rlsReliance: "service_role",
    risk: "medium",
    remediation: "still_open_for_step_3",
    testCoverage: "tasks [id] route tests",
  },
  {
    route: "/api/core/agents",
    methods: ["GET", "POST"],
    authRequired: true,
    authorization: "requireAdmin / MANAGE_AGENTS",
    permission: "read / manage_agents",
    tenantScope: "project_id optional on lists",
    helper: "requireAdmin + repo",
    tables: ["agents"],
    serviceRole: true,
    mutation: true,
    auditRequired: "mutations",
    rlsReliance: "service_role",
    risk: "medium",
    remediation: "still_open_for_step_3",
    testCoverage: "agents route tests",
  },
  {
    route: "/api/core/agents/*",
    methods: ["GET", "PATCH"],
    authRequired: true,
    authorization: "requireAdmin + id lookup",
    permission: "read / manage_agents",
    tenantScope: "id-only today",
    helper: "requireAdmin + repo",
    tables: ["agents"],
    serviceRole: true,
    mutation: true,
    auditRequired: "mutations",
    rlsReliance: "service_role",
    risk: "medium",
    remediation: "still_open_for_step_3",
    testCoverage: "agents [id] route tests",
  },
  {
    route: "/api/core/runs",
    methods: ["GET"],
    authRequired: true,
    authorization: "requireProjectAccess",
    permission: "read",
    tenantScope: "project_id required",
    helper: "requireProjectAccess + repo.listRuns",
    tables: ["agent_runs"],
    serviceRole: true,
    mutation: false,
    auditRequired: false,
    rlsReliance: "service_role",
    risk: "low after Step 5 require project_id",
    remediation: "fixed",
    testCoverage: "runs scope handler tests",
  },
  {
    route: "/api/core/approvals",
    methods: ["GET"],
    authRequired: true,
    authorization: "requireProjectAccess",
    permission: "read",
    tenantScope: "project_id required",
    helper: "requireProjectAccess + repo.listApprovals",
    tables: ["approval_requests"],
    serviceRole: true,
    mutation: false,
    auditRequired: false,
    rlsReliance: "service_role",
    risk: "low after Step 5",
    remediation: "fixed",
    testCoverage: "approvals scope handler tests",
  },
  {
    route: "/api/core/audit",
    methods: ["GET"],
    authRequired: true,
    authorization: "requireProjectAccess",
    permission: "read",
    tenantScope: "project_id required",
    helper: "requireProjectAccess + repo.listAuditLogs",
    tables: ["audit_logs"],
    serviceRole: true,
    mutation: false,
    auditRequired: false,
    rlsReliance: "service_role",
    risk: "low after Step 5",
    remediation: "fixed",
    testCoverage: "audit scope handler tests",
  },
  {
    route: "/api/core/jobs",
    methods: ["GET", "POST"],
    authRequired: true,
    authorization: "requireProjectAccess (+ manage_jobs on POST)",
    permission: "read / manage_jobs",
    tenantScope: "project_id required",
    helper: "requireProjectAccess + jobs",
    tables: ["runtime_jobs"],
    serviceRole: true,
    mutation: true,
    auditRequired: "mutations",
    rlsReliance: "service_role",
    risk: "low after Step 5",
    remediation: "fixed",
    testCoverage: "jobs route tests",
  },
  {
    route: "/api/admin/analytics",
    methods: ["GET"],
    authRequired: true,
    authorization: "requireProjectAccess or platform.admin org-wide",
    permission: "read / platform.admin",
    tenantScope: "project_id required unless platform.admin",
    helper: "requireProjectAccess / requireAdminUser",
    tables: ["tasks", "agent_runs", "leads", "approval_requests"],
    serviceRole: true,
    mutation: false,
    auditRequired: false,
    rlsReliance: "service_role",
    risk: "medium — org-wide listRuns gated to platform.admin",
    remediation: "fixed",
    testCoverage: "analytics scope tests",
  },
  {
    route: "/api/core/health",
    methods: ["GET"],
    authRequired: false,
    authorization: "public",
    permission: "none",
    tenantScope: "none",
    helper: "none",
    tables: "read-only status",
    serviceRole: true,
    mutation: false,
    auditRequired: false,
    rlsReliance: "service_role probes",
    risk: "low (no secrets)",
    remediation: "protected",
    testCoverage: "health tests",
  },
  {
    route: "/api/internal/runtime/tick",
    methods: ["GET", "POST"],
    authRequired: true,
    authorization: "Bearer INTERNAL_RUNTIME_SECRET / CRON_SECRET",
    permission: "internal worker secret",
    tenantScope: "platform worker",
    helper: "requireInternalWorker",
    tables: ["runtime_jobs"],
    serviceRole: true,
    mutation: true,
    auditRequired: true,
    rlsReliance: "service_role",
    risk: "secret management",
    remediation: "protected",
    testCoverage: "internal-auth tests",
  },
]);

export function summarizeRouteInventoryRisks() {
  return ROUTE_AUTH_INVENTORY.filter(
    (r) =>
      String(r.risk).startsWith("high") || String(r.risk).startsWith("medium")
  );
}

export function summarizeRemediationBuckets() {
  const buckets = { fixed: [], protected: [], partially_protected: [], still_open_for_step_3: [] };
  for (const entry of ROUTE_AUTH_INVENTORY) {
    const key = entry.remediation || "still_open_for_step_3";
    if (!buckets[key]) buckets[key] = [];
    buckets[key].push(entry.route);
  }
  return buckets;
}

/**
 * Whether an API pathname is covered by an inventory entry (exact or /* prefix).
 * @param {string} pathname e.g. /api/admin/overview
 */
export function inventoryCoversRoute(pathname) {
  const path = String(pathname || "").replace(/\/$/, "") || "/";
  for (const entry of ROUTE_AUTH_INVENTORY) {
    const pattern = entry.route;
    if (pattern === path) return true;
    if (pattern.endsWith("/*")) {
      const prefix = pattern.slice(0, -1); // keep trailing slash sense: /api/admin/
      const base = pattern.slice(0, -2);
      if (path === base || path.startsWith(prefix) || path.startsWith(`${base}/`)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Map filesystem route.js under app/api/admin to URL paths.
 * @param {string[]} relativeFiles e.g. ["app/api/admin/overview/route.js"]
 */
export function adminFilesToApiPaths(relativeFiles) {
  return (relativeFiles || [])
    .map((f) => {
      const m = String(f).match(/^app\/api\/(admin(?:\/.*)?)\/route\.js$/);
      if (!m) return null;
      return `/api/${m[1]}`.replace(/\/\[\.\.\.[^\]]+\]/g, "").replace(/\/\[[^\]]+\]/g, "/*");
    })
    .filter(Boolean);
}

export function assertRouteInventoryCoversAdminTree(relativeFiles) {
  const paths = adminFilesToApiPaths(relativeFiles);
  const missing = paths.filter((p) => !inventoryCoversRoute(p.replace(/\/\*$/, "")));
  // Dynamic segments become /* — also try parent coverage
  const stillMissing = missing.filter((p) => {
    const concrete = p.replace(/\/\*$/, "/x");
    return !inventoryCoversRoute(concrete) && !inventoryCoversRoute(p.replace(/\/\*$/, ""));
  });
  return { ok: stillMissing.length === 0, paths, missing: stillMissing };
}

/** Reject duplicate exact route+method pairs and unknown remediation tags. */
export function assertRouteInventoryIntegrity() {
  const seen = new Set();
  const duplicates = [];
  const allowedRemediation = new Set([
    "fixed",
    "protected",
    "partially_protected",
    "still_open_for_step_3",
    "still_open_for_step_4",
    "still_open_for_step_5",
    "n/a",
  ]);
  const badRemediation = [];
  const projectSensitiveMissingScope = [];

  for (const entry of ROUTE_AUTH_INVENTORY) {
    for (const method of entry.methods || []) {
      const key = `${entry.route}::${method}`;
      if (seen.has(key)) duplicates.push(key);
      seen.add(key);
    }
    if (entry.remediation && !allowedRemediation.has(entry.remediation)) {
      badRemediation.push({ route: entry.route, remediation: entry.remediation });
    }
    const scope = String(entry.tenantScope || "").toLowerCase();
    const tables = String(entry.tables || "").toLowerCase();
    const projectSensitive =
      /task|run|job|approval|audit|agent|project|memory|knowledge/.test(tables) ||
      /task|run|job|approval|audit|agent|project|memory|knowledge/.test(entry.route);
    if (
      projectSensitive &&
      entry.authRequired &&
      !/project|platform|pilot|none|worker|organisation|organization|global/.test(scope)
    ) {
      projectSensitiveMissingScope.push(entry.route);
    }
  }

  return {
    ok:
      duplicates.length === 0 &&
      badRemediation.length === 0 &&
      projectSensitiveMissingScope.length === 0,
    duplicates,
    badRemediation,
    projectSensitiveMissingScope,
  };
}
