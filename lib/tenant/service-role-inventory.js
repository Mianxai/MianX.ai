/**
 * Service-role usage inventory (documentation as data).
 * Runtime still uses getSupabaseAdmin server-side; browser must never import it.
 *
 * Exact counts (production JS, excluding *.test.js / e2e), measured 2026-08-03:
 *   getSupabaseAdmin( call expressions: 79
 *   files containing those calls: 52
 * PR #91 remediates inventory + live-pilot capability split; most list sites
 * remain open for Phase 1 Step 3 (membership-scoped data access).
 */

export const SERVICE_ROLE_INVENTORY = Object.freeze({
  factory: "lib/supabase.js#getSupabaseAdmin",
  browserForbidden: true,
  exactCallSites: 79,
  exactFiles: 52,
  approximateProductionCallSites: 79,
  approximateProductionFiles: 52,
  whyRequired: [
    "Anon RLS deny-all: Admin/API paths cannot use user JWT for table access today",
    "Membership probes (admin_memberships) before capabilities are known",
    "Runtime worker / job claim SECURITY DEFINER companions still need service path",
  ],
  requiredControls: [
    "Authenticated actor via requireAdminUser / requireCapability first",
    "Explicit project_id filters on tenant-sensitive queries",
    "No service-role key in API responses",
    "No unscoped select(*) on tenant-sensitive tables for list endpoints without filter",
    "No update/delete by browser-supplied id without project scope check",
  ],
  remediation: Object.freeze({
    fixed: [
      "live-agent-pilot GET → live_pilot.read capability",
      "live-agent-pilot POST authorize/kill → live_pilot.authorize (owner)",
      "unknown admin role → zero capabilities + membership reject",
    ],
    protected: [
      "getSupabaseAdmin server-only factory",
      "requireAdminUser before Admin data access",
      "pilot project hard-bind for live pilot paths",
    ],
    partially_protected: [
      "tasks/runs/jobs lists when project_id provided",
      "pilot evidence reads with assertPilotProjectIsolation",
    ],
    still_open_for_step_3: [
      "listProjects / GET /api/core/projects unscoped list",
      "optional project_id on some task/agent/run list endpoints",
      "Admin overview/analytics aggregate counts across all projects",
      "id-only detail reads without membership project filter",
    ],
  }),
  highRiskPatterns: [
    "listProjects() returns all projects to any admin (single-tenant truth)",
    "Optional project_id on some list endpoints enables cross-project enumeration",
    "admin_memberships global — no organization_id filter yet",
  ],
  rlsPosture:
    "Most tables: RLS enabled, no anon/authenticated policies (deny), GRANT service_role. Pilot live-run authorizations: FORCE RLS + service_role only.",
});
