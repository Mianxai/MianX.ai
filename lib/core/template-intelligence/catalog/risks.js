import { makeTemplateBase } from "../schemas";

export const RISK_TEMPLATES = [
  risk("provider-unconfigured", "product", {
    name: "AI provider unconfigured",
    likelihood: "high",
    impact: "medium",
    severity: "medium",
    owner: "platform",
    trigger: "provider_status_unconfigured",
    mitigation: "Keep deterministic planning; never claim AI completion.",
    contingency: "Queue provider-dependent work until configured.",
    affected: [{ kind: "module", slug: "ai-assistance" }],
  }),
  risk("cross-tenant-leakage", "security", {
    name: "Cross-tenant data leakage",
    likelihood: "low",
    impact: "critical",
    severity: "high",
    owner: "security",
    trigger: "missing_tenant_filters",
    mitigation: "Enforce project/org scoping on all queries.",
    contingency: "Incident response + access revocation.",
    affected: [{ kind: "architecture", slug: "multi-tenant" }],
  }),
  risk("compliance-overclaim", "compliance", {
    name: "Compliance overclaim",
    likelihood: "medium",
    impact: "high",
    severity: "high",
    owner: "legal",
    trigger: "auto_generated_compliance_language",
    mitigation: "Label all packs as requiring human legal review.",
    contingency: "Retract claims; open legal review.",
    affected: [{ kind: "compliance", slug: "data-minimisation" }],
  }),
  risk("delivery-scope-creep", "delivery", {
    name: "Delivery scope creep",
    likelihood: "medium",
    impact: "medium",
    severity: "medium",
    owner: "founder",
    trigger: "unbounded_module_selection",
    mitigation: "Prioritise P0/P1 capabilities; explicit optional set.",
    contingency: "Re-baseline roadmap via Company Builder approval.",
    affected: [{ kind: "capability", slug: "operations" }],
  }),
  risk("workforce-gap", "operational", {
    name: "Workforce capability gap",
    likelihood: "medium",
    impact: "medium",
    severity: "medium",
    owner: "operations",
    trigger: "capability_without_executable_agent",
    mitigation: "Report gaps; do not fabricate agents.",
    contingency: "Human-owned work or defer capability.",
    affected: [{ kind: "department", slug: "operations" }],
  }),
  risk("vendor-outage", "vendor", {
    name: "Critical vendor outage",
    likelihood: "medium",
    impact: "high",
    severity: "high",
    owner: "platform",
    trigger: "integration_dependency_down",
    mitigation: "Circuit breakers + degraded modes.",
    contingency: "Manual fallback playbook.",
    affected: [{ kind: "module", slug: "integrations" }],
  }),
  risk("data-quality", "data_quality", {
    name: "Metric / data quality drift",
    likelihood: "medium",
    impact: "medium",
    severity: "medium",
    owner: "analytics",
    trigger: "kpi_without_validated_source",
    mitigation: "KPI contracts only; no invented values.",
    contingency: "Mark metrics unavailable.",
    affected: [{ kind: "kpi", slug: "activation-rate" }],
  }),
  risk("adoption", "adoption", {
    name: "Low operator adoption",
    likelihood: "medium",
    impact: "medium",
    severity: "medium",
    owner: "growth",
    trigger: "complex_ux_without_training",
    mitigation: "Empty states with next actions; progressive disclosure.",
    contingency: "Simplify MVP module set.",
    affected: [{ kind: "module", slug: "workflow-management" }],
  }),
  risk("privacy", "privacy", {
    name: "Unnecessary PII retention",
    likelihood: "medium",
    impact: "high",
    severity: "high",
    owner: "security",
    trigger: "broad_logging_of_pii",
    mitigation: "Data minimisation pack + redaction.",
    contingency: "Purge + notify per policy.",
    affected: [{ kind: "compliance", slug: "data-minimisation" }],
  }),
  risk("financial-controls", "financial", {
    name: "Weak payment path controls",
    likelihood: "low",
    impact: "high",
    severity: "high",
    owner: "finance",
    trigger: "payments_module_without_audit",
    mitigation: "Require audit + dual control for money moves.",
    contingency: "Disable payments features.",
    affected: [{ kind: "module", slug: "payments" }],
  }),
];

function risk(slug, category, fields) {
  const base = makeTemplateBase({
    id: `tpl_risk_${slug}_v1`,
    slug,
    name: fields.name,
    description: fields.name,
    evidence_refs: [{ type: "catalog", ref: "phase-e-seed" }],
  });
  return {
    ...base,
    kind: "risk",
    payload: {
      category,
      likelihood: fields.likelihood,
      impact: fields.impact,
      severity: fields.severity,
      owner: fields.owner,
      trigger: fields.trigger,
      mitigation: fields.mitigation,
      contingency: fields.contingency,
      evidence: [{ type: "catalog", ref: "phase-e-seed" }],
      review_date: null,
      affected_template_objects: fields.affected || [],
    },
  };
}

export function listRiskTemplates({ includeDeprecated = false } = {}) {
  return RISK_TEMPLATES.filter(
    (t) => includeDeprecated || !["deprecated", "archived"].includes(t.status)
  );
}

export function getRiskTemplate(slug, version = null) {
  const matches = RISK_TEMPLATES.filter((t) => t.slug === slug);
  if (!matches.length) return null;
  if (version != null) return matches.find((t) => t.version === version) || null;
  return matches.find((t) => t.status === "active") || matches[0];
}
