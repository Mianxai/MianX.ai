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
      "listProjects requires organizationId or projectIds (no global list)",
      "getProject applies organizationId / projectIds at query layer",
      "GET /api/core/projects + projects/[id] via requireTenantListScope / requireProjectAccess",
      "GET /api/core/tasks requires project_id + requireProjectAccess",
      "agent instance list/PATCH require project scope",
      "Command Center + Overview counts use scoped listProjectsOpts",
    ],
    protected: [
      "getSupabaseAdmin server-only factory",
      "requireAdminUser before Admin data access",
      "pilot project hard-bind for live pilot paths",
    ],
    partially_protected: [
      "tasks/runs/jobs lists when project_id provided by caller",
      "pilot evidence reads with assertPilotProjectIsolation",
      "objectives/ceo-brief when project_id already required by route",
    ],
    still_open_for_step_4: [
      "Durable membership organization_id/project_id columns (migration unapplied)",
      "JWT/org RLS policies",
    ],
    still_open_for_step_5: [
      "GET /api/core/runs|jobs|approvals|audit optional project_id paths",
      "Admin analytics unscoped listRuns({}) / aggregate paths",
      "Remaining Admin export/search surfaces without project filter",
    ],
  }),
  highRiskPatterns: [
    "Optional project_id on runs/jobs/approvals/audit list endpoints (Step 5)",
    "Admin analytics may still aggregate across projects without platform.admin gate",
    "admin_memberships global until org/project columns applied + wired (Step 4)",
  ],
  rlsPosture:
    "Most tables: RLS enabled, no anon/authenticated policies (deny), GRANT service_role. Pilot live-run authorizations: FORCE RLS + service_role only.",
});
