import { makeTemplateBase } from "../schemas";

/** Generic capability catalog — not industry-vertical products. */
export const CAPABILITY_TEMPLATES = [
  cap("identity-access", "Identity & access", {
    priority: "P0",
    maturity_target: "hardened",
    owning_department: "engineering",
    required_modules: ["identity-access", "settings"],
    acceptance_criteria: ["authn", "authz", "session_hygiene"],
    optional: false,
  }),
  cap("organisation-management", "Organisation management", {
    priority: "P0",
    maturity_target: "mvp",
    owning_department: "engineering",
    required_modules: ["organisation-management"],
    acceptance_criteria: ["org_crud", "membership"],
    optional: false,
  }),
  cap("customer-management", "Customer management", {
    priority: "P1",
    maturity_target: "mvp",
    owning_department: "sales",
    required_modules: ["customer-management"],
    acceptance_criteria: ["customer_record", "status_pipeline"],
    optional: false,
  }),
  cap("operations", "Operations", {
    priority: "P1",
    maturity_target: "mvp",
    owning_department: "operations",
    required_modules: ["workflow-management", "task-management"],
    acceptance_criteria: ["work_tracking", "handoffs"],
    optional: false,
  }),
  cap("reporting", "Reporting", {
    priority: "P1",
    maturity_target: "mvp",
    owning_department: "analytics",
    required_modules: ["reporting", "analytics"],
    acceptance_criteria: ["exportable_metrics_contracts"],
    optional: false,
  }),
  cap("finance-controls", "Finance controls", {
    priority: "P2",
    maturity_target: "mvp",
    owning_department: "finance",
    required_modules: ["payments", "reporting"],
    acceptance_criteria: ["payment_hooks", "audit_of_money_paths"],
    optional: true,
  }),
  cap("security", "Security", {
    priority: "P0",
    maturity_target: "hardened",
    owning_department: "security",
    required_modules: ["audit", "identity-access"],
    acceptance_criteria: ["audit_events", "least_privilege"],
    optional: false,
  }),
  cap("support", "Support", {
    priority: "P2",
    maturity_target: "mvp",
    owning_department: "support",
    required_modules: ["notifications", "customer-management"],
    acceptance_criteria: ["ticket_or_inbox_path"],
    optional: true,
  }),
  cap("analytics", "Analytics", {
    priority: "P2",
    maturity_target: "mvp",
    owning_department: "analytics",
    required_modules: ["analytics"],
    acceptance_criteria: ["event_contracts", "dashboard_shell"],
    optional: true,
  }),
  cap("integrations", "Integrations", {
    priority: "P2",
    maturity_target: "mvp",
    owning_department: "engineering",
    required_modules: ["integrations"],
    acceptance_criteria: ["api_keys_or_webhooks"],
    optional: true,
  }),
  cap("ai-assistance", "AI assistance", {
    priority: "P2",
    maturity_target: "mvp",
    owning_department: "data-ai",
    required_modules: ["ai-assistance"],
    acceptance_criteria: ["provider_optional", "no_false_completion"],
    optional: true,
  }),
  cap("compliance-controls", "Compliance controls", {
    priority: "P1",
    maturity_target: "mvp",
    owning_department: "legal",
    required_modules: ["audit", "files"],
    acceptance_criteria: ["human_legal_review_gate"],
    optional: true,
  }),
];

function cap(slug, name, payload) {
  const base = makeTemplateBase({
    id: `tpl_cap_${slug}_v1`,
    slug,
    name,
    description: `Capability: ${name}`,
    evidence_refs: [{ type: "catalog", ref: "phase-e-seed" }],
  });
  return {
    ...base,
    kind: "capability",
    payload: {
      required: !payload.optional,
      optional: Boolean(payload.optional),
      priority: payload.priority,
      maturity_target: payload.maturity_target,
      dependencies: payload.dependencies || [],
      owning_department: payload.owning_department,
      required_modules: payload.required_modules || [],
      acceptance_criteria: payload.acceptance_criteria || [],
      evidence: [{ type: "catalog", ref: "phase-e-seed" }],
    },
  };
}

export function listCapabilityTemplates({ includeDeprecated = false } = {}) {
  return CAPABILITY_TEMPLATES.filter(
    (t) => includeDeprecated || !["deprecated", "archived"].includes(t.status)
  );
}

export function getCapabilityTemplate(slug, version = null) {
  const matches = CAPABILITY_TEMPLATES.filter((t) => t.slug === slug);
  if (!matches.length) return null;
  if (version != null) return matches.find((t) => t.version === version) || null;
  return matches.find((t) => t.status === "active") || matches[0];
}
