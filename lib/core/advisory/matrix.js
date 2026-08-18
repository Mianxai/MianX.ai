export const WAVE6_ROLE_MATRIX = [
  {
    role: "Finance Advisor",
    canonicalWorkforceId: "finance.advisor",
    runtimeSlug: "finance-advisor",
    department: "finance",
    level: "L5",
    responsibility: "Financial analysis only — no transfers/payments/billing changes",
    reportsTo: "executive-cfo",
    wave6Required: true,
    activationType: "project_dedicated",
    dependencies: ["wave-1 executive-cfo"],
  },
  {
    role: "HR Workforce Planner",
    canonicalWorkforceId: "hr.workforce-planner",
    runtimeSlug: "hr-workforce-planner",
    department: "hr",
    level: "L5",
    responsibility: "Workforce planning only — no hire/fire/compensation decisions",
    reportsTo: "executive-chro",
    wave6Required: true,
    activationType: "project_dedicated",
    dependencies: ["finance-advisor"],
  },
  {
    role: "Legal Risk Advisor",
    canonicalWorkforceId: "legal.risk-advisor",
    runtimeSlug: "legal-risk-advisor",
    department: "legal",
    level: "L5",
    responsibility:
      "Risk analysis only — not licensed legal advice; no signing/filings",
    reportsTo: "executive-clo",
    wave6Required: true,
    activationType: "project_dedicated",
    dependencies: ["hr-workforce-planner"],
  },
];

export function wave6ActivatedRuntimeSlugs() {
  return WAVE6_ROLE_MATRIX.filter((r) => r.wave6Required && r.runtimeSlug).map(
    (r) => r.runtimeSlug
  );
}
