import { makeTemplateBase } from "../schemas";

/** KPI measurement contracts only — no invented production values. */
export const KPI_TEMPLATES = [
  kpi("activation-rate", "Activation rate", {
    purpose: "Share of new orgs reaching first successful activation.",
    formula: "activated_orgs / new_orgs",
    data_source: "organisation_management_events",
    frequency: "weekly",
    owner: "growth",
    target_type: "ratio",
    leading_or_lagging: "leading",
    applicable_capability: "organisation-management",
    applicable_module: "organisation-management",
    quality_caveat: "Requires validated activation definition; no fake values.",
  }),
  kpi("retention-rate", "Retention rate", {
    purpose: "Share of active customers retained across period.",
    formula: "retained / starting_active",
    data_source: "customer_management_status",
    frequency: "monthly",
    owner: "growth",
    target_type: "ratio",
    leading_or_lagging: "lagging",
    applicable_capability: "customer-management",
    applicable_module: "customer-management",
    quality_caveat: "Needs cohort definition.",
  }),
  kpi("approval-latency", "Approval latency", {
    purpose: "Time from approval request to decision.",
    formula: "median(decided_at - requested_at)",
    data_source: "approvals_audit",
    frequency: "weekly",
    owner: "operations",
    target_type: "duration",
    leading_or_lagging: "leading",
    applicable_capability: "operations",
    applicable_module: "workflow-management",
    quality_caveat: "Exclude cancelled requests.",
  }),
  kpi("audit-coverage", "Protected action audit coverage", {
    purpose: "Share of protected actions with audit events.",
    formula: "audited_protected_actions / protected_actions",
    data_source: "audit_events",
    frequency: "daily",
    owner: "security",
    target_type: "ratio",
    leading_or_lagging: "leading",
    applicable_capability: "security",
    applicable_module: "audit",
    quality_caveat: "Depends on complete instrumentation.",
  }),
  kpi("sla-attainment", "SLA attainment", {
    purpose: "Share of work completing within SLA.",
    formula: "on_time / due",
    data_source: "task_management",
    frequency: "weekly",
    owner: "operations",
    target_type: "ratio",
    leading_or_lagging: "lagging",
    applicable_capability: "operations",
    applicable_module: "task-management",
    quality_caveat: "Requires reliable due dates.",
  }),
];

function kpi(slug, name, payload) {
  const base = makeTemplateBase({
    id: `tpl_kpi_${slug}_v1`,
    slug,
    name,
    description: `KPI contract: ${name}. Measurement definition only.`,
    evidence_refs: [{ type: "catalog", ref: "phase-e-seed" }],
  });
  return { ...base, kind: "kpi", payload };
}

export function listKpiTemplates({ includeDeprecated = false } = {}) {
  return KPI_TEMPLATES.filter(
    (t) => includeDeprecated || !["deprecated", "archived"].includes(t.status)
  );
}

export function getKpiTemplate(slug, version = null) {
  const matches = KPI_TEMPLATES.filter((t) => t.slug === slug);
  if (!matches.length) return null;
  if (version != null) return matches.find((t) => t.version === version) || null;
  return matches.find((t) => t.status === "active") || matches[0];
}
