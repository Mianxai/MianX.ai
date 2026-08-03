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

import { SERVICE_ROLE_BACKLOG, SERVICE_ROLE_HARDENED_STEP5 } from "./service-role-backlog";

export const SERVICE_ROLE_INVENTORY = Object.freeze({
  factory: "lib/supabase.js#getSupabaseAdmin",
  browserForbidden: true,
  exactCallSites: 79,
  exactFiles: 52,
  approximateProductionCallSites: 79,
  approximateProductionFiles: 52,
  backlog: SERVICE_ROLE_BACKLOG,
  hardenedStep5: SERVICE_ROLE_HARDENED_STEP5,
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
      "Durable membership organization_id/project_id columns (merged code; Production migration unapplied)",
      "JWT/org RLS policies for projects/tasks (deferred beyond membership columns)",
    ],
    still_open_for_step_5: SERVICE_ROLE_BACKLOG.map(
      (r) => `${r.file}#${r.function} (${r.severity})`
    ),
    fixed_in_step_5_draft: SERVICE_ROLE_HARDENED_STEP5.map(
      (r) => `${r.file}#${r.function}`
    ),
  }),
  highRiskPatterns: [
    "JWT/org RLS still absent — service_role bypass requires app authz forever",
    "admin_memberships durable columns unapplied on Production until Founder apply",
    "Integration Admin residual optional project paths (medium — see backlog)",
  ],
  rlsPosture:
    "Most tables: RLS enabled, no anon/authenticated policies (deny), GRANT service_role. Pilot live-run authorizations: FORCE RLS + service_role only.",
});
