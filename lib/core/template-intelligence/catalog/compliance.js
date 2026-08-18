import { makeTemplateBase } from "../schemas";

/**
 * Compliance packs are contracts requiring qualified human review.
 * Do not claim automatic legal compliance.
 */
export const COMPLIANCE_TEMPLATES = [
  pack("data-minimisation", "Data minimisation controls", {
    jurisdiction: "general",
    industry: "cross_industry",
    data_category: "personal_data",
    requirement: "Collect and retain only necessary data for stated purpose.",
    control: "purpose_limitation_and_retention_policy",
    evidence: ["policy_doc", "retention_jobs"],
    review_owner: "legal",
    review_frequency: "quarterly",
    enforcement_level: "advisory_until_reviewed",
    applicable_modules: ["customer-management", "files", "analytics"],
    applicable_workflows: ["onboarding"],
  }),
  pack("access-review", "Access review controls", {
    jurisdiction: "general",
    industry: "cross_industry",
    data_category: "credentials_and_roles",
    requirement: "Periodic review of privileged access.",
    control: "scheduled_access_reviews",
    evidence: ["review_logs", "role_changes"],
    review_owner: "security",
    review_frequency: "quarterly",
    enforcement_level: "required_for_regulated",
    applicable_modules: ["identity-access", "audit"],
    applicable_workflows: ["approval-gate"],
  }),
  pack("audit-evidence", "Audit evidence retention", {
    jurisdiction: "general",
    industry: "regulated-services",
    data_category: "audit_logs",
    requirement: "Retain auditable records of protected actions.",
    control: "immutable_audit_stream",
    evidence: ["audit_export"],
    review_owner: "compliance",
    review_frequency: "monthly",
    enforcement_level: "required_for_regulated",
    applicable_modules: ["audit"],
    applicable_workflows: ["approval-gate", "incident-response"],
  }),
];

function pack(slug, name, payload) {
  const base = makeTemplateBase({
    id: `tpl_comp_${slug}_v1`,
    slug,
    name,
    description: `${name}. Requires qualified human legal/compliance review.`,
    confidence: 0.7,
    evidence_refs: [{ type: "catalog", ref: "phase-e-seed" }],
  });
  return {
    ...base,
    kind: "compliance",
    payload: {
      ...payload,
      human_review_required: true,
      legal_disclaimer:
        "Not legal advice. Outputs require qualified human review before any compliance claim.",
    },
  };
}

export function listComplianceTemplates({ includeDeprecated = false } = {}) {
  return COMPLIANCE_TEMPLATES.filter(
    (t) => includeDeprecated || !["deprecated", "archived"].includes(t.status)
  );
}

export function getComplianceTemplate(slug, version = null) {
  const matches = COMPLIANCE_TEMPLATES.filter((t) => t.slug === slug);
  if (!matches.length) return null;
  if (version != null) return matches.find((t) => t.version === version) || null;
  return matches.find((t) => t.status === "active") || matches[0];
}
