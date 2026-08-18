export const WAVE5_ROLE_MATRIX = [
  {
    role: "Sales Opportunity Advisor",
    canonicalWorkforceId: "sales.opportunity",
    runtimeSlug: "sales-opportunity",
    department: "sales",
    level: "L5",
    responsibility: "Qualify opportunities and recommend commercial next steps",
    reportsTo: "executive-cso",
    wave5Required: true,
    activationType: "project_dedicated",
    dependencies: ["lead-intelligence", "research"],
  },
  {
    role: "Marketing Planner",
    canonicalWorkforceId: "marketing.planner",
    runtimeSlug: "marketing-planner",
    department: "marketing",
    level: "L5",
    responsibility: "Campaign briefs and messaging plans (no autonomous publish)",
    reportsTo: "executive-cmo",
    wave5Required: true,
    activationType: "project_dedicated",
    dependencies: ["sales-opportunity"],
  },
  {
    role: "SEO Analyst",
    canonicalWorkforceId: "seo.analyst",
    runtimeSlug: "seo-analyst",
    department: "seo",
    level: "L5",
    responsibility: "SEO recommendations from supplied context; no site mutation",
    reportsTo: "executive-cmo",
    wave5Required: true,
    activationType: "project_dedicated",
    dependencies: ["marketing-planner"],
  },
  {
    role: "Customer Success Advisor",
    canonicalWorkforceId: "customer-success.advisor",
    runtimeSlug: "customer-success-advisor",
    department: "customer-success",
    level: "L5",
    responsibility: "Adoption/retention advice; no contractual commitments",
    reportsTo: "executive-coo",
    wave5Required: true,
    activationType: "project_dedicated",
    dependencies: ["seo-analyst"],
  },
];

export function wave5ActivatedRuntimeSlugs() {
  return WAVE5_ROLE_MATRIX.filter((r) => r.wave5Required && r.runtimeSlug).map(
    (r) => r.runtimeSlug
  );
}
