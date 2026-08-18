/**
 * Deterministic template matcher — no invented facts when confidence is low.
 */

import { listIndustryTemplates, getIndustryTemplate } from "./catalog/industries";
import { listBusinessModelTemplates, getBusinessModelTemplate } from "./catalog/business-models";
import { listArchitectureTemplates } from "./catalog/architecture";
import { listComplianceTemplates } from "./catalog/compliance";
import { listRiskTemplates } from "./catalog/risks";
import { canSelectForNewExecution } from "./versioning";

const UNKNOWN_INDUSTRY_HINTS = [/unknown/i, /unspecified/i, /not sure/i, /\?\?\?/];

export function matchTemplates(input = {}) {
  const {
    objective = "",
    industry = null,
    business_model = null,
    company_size = null,
    geography = null,
    risk_tolerance = "medium",
    timeline = null,
    budget_category = null,
    compliance_sensitivity = "normal",
    product_type = null,
    allowDeprecated = false,
  } = input;

  const missing = [];
  const assumptions = [];
  const rejected = [];
  const selected = [];
  const humanReview = [];

  const text = String(objective || "");
  if (!text.trim()) missing.push("objective");
  if (!industry) missing.push("industry");
  if (!business_model) missing.push("business_model");

  const unknownIndustry =
    !industry ||
    UNKNOWN_INDUSTRY_HINTS.some((re) => re.test(String(industry))) ||
    /unknown industry/i.test(text);

  if (unknownIndustry) {
    return {
      selected_templates: [],
      rejected_templates: listIndustryTemplates().map((t) => ({
        kind: "industry",
        slug: t.slug,
        version: t.version,
        reason: "industry_unknown_or_unspecified",
      })),
      match_score: 0.15,
      reasons: ["Industry unknown — clarification required before template selection."],
      assumptions: [],
      missing_information: ["industry", ...missing.filter((m) => m !== "industry")],
      confidence: 0.15,
      human_review_requirements: ["clarify_industry"],
      clarification_required: true,
      message: "Low confidence: request industry clarification instead of inventing a template.",
    };
  }

  // Industry
  let industryTpl = getIndustryTemplate(industry);
  if (!industryTpl && (industry === "general" || industry === "generic")) {
    industryTpl = getIndustryTemplate("generic-platform");
    assumptions.push("Mapped industry 'general' to generic-platform structural pattern.");
  }
  if (!industryTpl) {
    // soft synonym map — still generic
    if (/regulat|complian|legal|health|financ/i.test(String(industry) + text)) {
      industryTpl = getIndustryTemplate("regulated-services");
      assumptions.push("Mapped input industry signal to regulated-services structural pattern.");
    } else if (/market|two-sided|buyer|seller/i.test(String(industry) + text)) {
      industryTpl = getIndustryTemplate("marketplace-platform");
      assumptions.push("Mapped input industry signal to marketplace-platform structural pattern.");
    } else {
      industryTpl = getIndustryTemplate("generic-platform");
      assumptions.push("Defaulted to generic-platform structural pattern.");
    }
  }

  if (industryTpl && !canSelectForNewExecution(industryTpl, { allowDeprecated })) {
    rejected.push({
      kind: "industry",
      slug: industryTpl.slug,
      version: industryTpl.version,
      reason: `status_${industryTpl.status}_not_selectable`,
    });
    industryTpl = null;
  }

  if (industryTpl) {
    selected.push({
      kind: "industry",
      slug: industryTpl.slug,
      version: industryTpl.version,
      template_id: industryTpl.id,
      score: 0.9,
      reasons: ["industry_match_or_structural_default"],
    });
  }

  // Business model
  let bmTpl = getBusinessModelTemplate(business_model);
  if (!bmTpl && business_model) {
    rejected.push({
      kind: "business_model",
      slug: business_model,
      reason: "unknown_business_model_slug",
    });
  }
  if (!bmTpl) {
    const hint = String(business_model || product_type || text);
    if (/subscri/i.test(hint)) bmTpl = getBusinessModelTemplate("subscription");
    else if (/market/i.test(hint)) bmTpl = getBusinessModelTemplate("marketplace");
    else if (/usage|meter/i.test(hint)) bmTpl = getBusinessModelTemplate("usage-based");
    else if (/license/i.test(hint)) bmTpl = getBusinessModelTemplate("licensing");
    else if (/transact/i.test(hint)) bmTpl = getBusinessModelTemplate("transaction-based");
    else if (/service/i.test(hint)) bmTpl = getBusinessModelTemplate("service-delivery");
    else bmTpl = getBusinessModelTemplate("hybrid");
    assumptions.push(`Selected business model '${bmTpl.slug}' via deterministic heuristics.`);
  }
  if (bmTpl && canSelectForNewExecution(bmTpl, { allowDeprecated })) {
    selected.push({
      kind: "business_model",
      slug: bmTpl.slug,
      version: bmTpl.version,
      template_id: bmTpl.id,
      score: 0.85,
      reasons: ["business_model_match"],
    });
  } else if (bmTpl) {
    rejected.push({
      kind: "business_model",
      slug: bmTpl.slug,
      version: bmTpl.version,
      reason: `status_${bmTpl.status}_not_selectable`,
    });
  }

  // Architecture heuristic
  const archList = listArchitectureTemplates();
  let arch =
    /multi.?tenant|saas/i.test(text) || product_type === "saas"
      ? archList.find((a) => a.slug === "multi-tenant")
      : archList.find((a) => a.slug === "modular-monolith");
  if (arch && canSelectForNewExecution(arch, { allowDeprecated })) {
    selected.push({
      kind: "architecture",
      slug: arch.slug,
      version: arch.version,
      template_id: arch.id,
      score: 0.7,
      reasons: ["architecture_heuristic"],
    });
  }

  const complianceSensitive =
    compliance_sensitivity === "high" ||
    /complian|regulat|privacy|gdpr|hipaa|legal/i.test(text);

  if (complianceSensitive) {
    for (const pack of listComplianceTemplates()) {
      if (!canSelectForNewExecution(pack, { allowDeprecated })) {
        rejected.push({
          kind: "compliance",
          slug: pack.slug,
          version: pack.version,
          reason: `status_${pack.status}_not_selectable`,
        });
        continue;
      }
      selected.push({
        kind: "compliance",
        slug: pack.slug,
        version: pack.version,
        template_id: pack.id,
        score: 0.75,
        reasons: ["compliance_sensitivity"],
      });
    }
    humanReview.push({
      type: "legal_compliance",
      message:
        "Compliance-sensitive objective — qualified human legal review required. Not legal advice.",
    });
  }

  // Baseline risks always considered
  for (const r of listRiskTemplates()) {
    if (!canSelectForNewExecution(r, { allowDeprecated })) {
      rejected.push({
        kind: "risk",
        slug: r.slug,
        version: r.version,
        reason: `status_${r.status}_not_selectable`,
      });
      continue;
    }
    if (
      r.slug === "provider-unconfigured" ||
      (complianceSensitive && r.payload.category === "compliance") ||
      r.slug === "delivery-scope-creep"
    ) {
      selected.push({
        kind: "risk",
        slug: r.slug,
        version: r.version,
        template_id: r.id,
        score: 0.8,
        reasons: ["risk_baseline_or_sensitivity"],
      });
    }
  }

  // Reject deprecated explicitly in catalog listing for demos
  for (const t of listIndustryTemplates({ includeDeprecated: true })) {
    if (t.status === "deprecated") {
      rejected.push({
        kind: "industry",
        slug: t.slug,
        version: t.version,
        reason: "deprecated_not_selected_for_new_plan",
      });
    }
  }

  let confidence = 0.55;
  if (industry && business_model) confidence += 0.2;
  if (text.length > 40) confidence += 0.1;
  if (complianceSensitive) confidence = Math.min(confidence, 0.8);
  if (missing.length) confidence -= 0.15 * missing.length;
  confidence = Math.max(0.05, Math.min(0.95, confidence));

  const match_score = selected.length
    ? selected.reduce((s, x) => s + x.score, 0) / selected.length
    : 0;

  if (company_size) assumptions.push(`company_size=${company_size} noted but not scored financially`);
  if (geography) assumptions.push(`geography=${geography} noted without legal determination`);
  if (timeline) assumptions.push(`timeline=${timeline} treated as planning preference only`);
  if (budget_category) assumptions.push(`budget_category=${budget_category} — no forecast generated`);
  if (risk_tolerance) assumptions.push(`risk_tolerance=${risk_tolerance}`);

  return {
    selected_templates: selected,
    rejected_templates: rejected,
    match_score: Number(match_score.toFixed(3)),
    reasons: selected.map((s) => `${s.kind}:${s.slug}`),
    assumptions,
    missing_information: [...new Set(missing)],
    confidence: Number(confidence.toFixed(3)),
    human_review_requirements: humanReview,
    clarification_required: confidence < 0.4,
    compliance_sensitive: complianceSensitive,
  };
}
