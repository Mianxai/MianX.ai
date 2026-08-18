import { makeTemplateBase } from "../schemas";

/** Generic industry templates — structural only, not vertical products. */
export const INDUSTRY_TEMPLATES = [
  makeIndustry({
    slug: "generic-platform",
    name: "Generic Digital Platform",
    description:
      "Cross-industry digital platform pattern covering identity, operations, reporting, and integrations.",
    customer_types: ["end_user", "operator", "admin", "partner"],
    business_model_options: ["subscription", "usage-based", "hybrid"],
    core_processes: [
      "onboarding",
      "service_delivery",
      "billing_support",
      "reporting",
      "support",
    ],
    operating_model: "central_platform_with_modular_capabilities",
    data_domains: ["identity", "customers", "operations", "audit", "analytics"],
    security_needs: ["authn", "authz", "audit_trail", "secrets_isolation"],
    reporting_needs: ["operational_dashboards", "founder_kpis"],
    delivery_phases: ["foundation", "mvp_capabilities", "hardening", "scale"],
  }),
  makeIndustry({
    slug: "regulated-services",
    name: "Regulated Services Platform",
    description:
      "Structural pattern for services with elevated compliance sensitivity. Not a legal product.",
    customer_types: ["client", "practitioner", "compliance_officer", "admin"],
    business_model_options: ["subscription", "service-delivery", "hybrid"],
    core_processes: [
      "intake",
      "case_or_engagement_management",
      "review_approval",
      "evidence_retention",
      "reporting",
    ],
    operating_model: "human_in_the_loop_with_audit",
    data_domains: ["identity", "cases", "evidence", "audit", "privacy"],
    security_needs: ["authn", "authz", "encryption_at_rest", "access_reviews"],
    reporting_needs: ["compliance_evidence", "operational_kpis"],
    delivery_phases: ["controls_first", "mvp_workflow", "assurance", "scale"],
    confidence: 0.75,
  }),
  makeIndustry({
    slug: "marketplace-platform",
    name: "Marketplace Platform Pattern",
    description:
      "Two-sided marketplace structural pattern. Not a specific marketplace product.",
    customer_types: ["buyer", "seller", "operator", "admin"],
    business_model_options: ["marketplace", "transaction-based", "hybrid"],
    core_processes: [
      "listing",
      "matching",
      "transaction",
      "settlement_support",
      "dispute",
      "trust_safety",
    ],
    operating_model: "platform_operations_plus_supply_demand",
    data_domains: ["identity", "listings", "transactions", "trust", "analytics"],
    security_needs: ["authn", "authz", "fraud_signals", "audit_trail"],
    reporting_needs: ["gmv_proxy_metrics", "liquidity_health"],
    delivery_phases: ["core_matching", "trust_controls", "monetization", "scale"],
    confidence: 0.8,
  }),
];

function makeIndustry({
  slug,
  name,
  description,
  customer_types,
  business_model_options,
  core_processes,
  operating_model,
  data_domains,
  security_needs,
  reporting_needs,
  delivery_phases,
  confidence = 0.85,
}) {
  const base = makeTemplateBase({
    id: `tpl_industry_${slug}_v1`,
    slug,
    name,
    description,
    confidence,
    evidence_refs: [{ type: "catalog", ref: "phase-e-seed" }],
  });
  return {
    ...base,
    kind: "industry",
    payload: {
      industry_overview: description,
      customer_types,
      business_model_options,
      core_business_processes: core_processes,
      operating_model,
      departments: [],
      capabilities: [],
      product_modules: [],
      integrations: ["webhooks", "api"],
      compliance_needs: [],
      data_domains,
      security_needs,
      reporting_needs,
      kpis: [],
      risks: [],
      delivery_phases,
    },
  };
}

export function listIndustryTemplates({ includeDeprecated = false } = {}) {
  return INDUSTRY_TEMPLATES.filter(
    (t) => includeDeprecated || !["deprecated", "archived"].includes(t.status)
  );
}

export function getIndustryTemplate(slug, version = null) {
  const matches = INDUSTRY_TEMPLATES.filter((t) => t.slug === slug);
  if (!matches.length) return null;
  if (version != null) return matches.find((t) => t.version === version) || null;
  return matches.find((t) => t.status === "active") || matches[0];
}
