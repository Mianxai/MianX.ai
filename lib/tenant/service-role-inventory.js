/**
 * Service-role usage inventory (documentation as data).
 * Runtime still uses getSupabaseAdmin server-side; browser must never import it.
 */

export const SERVICE_ROLE_INVENTORY = Object.freeze({
  factory: "lib/supabase.js#getSupabaseAdmin",
  browserForbidden: true,
  approximateProductionCallSites: 78,
  approximateProductionFiles: 51,
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
  highRiskPatterns: [
    "listProjects() returns all projects to any admin (single-tenant truth)",
    "Optional project_id on some list endpoints enables cross-project enumeration",
    "admin_memberships global — no organization_id filter yet",
  ],
  rlsPosture:
    "Most tables: RLS enabled, no anon/authenticated policies (deny), GRANT service_role. Pilot live-run authorizations: FORCE RLS + service_role only.",
});
