import { clip } from "../validate";
import { validationError } from "../errors";
import { VERDICT_STATUSES } from "./policy";

function strArr(v, max = 40) {
  if (!Array.isArray(v)) return [];
  return v.map((x) => clip(String(x), 500)).filter(Boolean).slice(0, max);
}
function requireStatus(errors, key, value) {
  const s = clip(value, 40);
  if (!VERDICT_STATUSES.includes(s)) errors[key] = `Must be one of: ${VERDICT_STATUSES.join(", ")}`;
  return s;
}

export function validateSalesOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const sales_status = requireStatus(errors, "sales_status", o.sales_status);
  const out = {
    qualification: clip(o.qualification, 80) || "unqualified",
    opportunity_summary: clip(o.opportunity_summary, 4000) || "",
    account_research: strArr(o.account_research),
    next_actions: strArr(o.next_actions),
    proposal_draft: clip(o.proposal_draft, 8000) || "",
    follow_up_draft: clip(o.follow_up_draft, 8000) || "",
    pipeline_notes: strArr(o.pipeline_notes),
    sales_status,
    external_send_allowed: false,
  };
  if (!out.opportunity_summary) errors.opportunity_summary = "required";
  if (!out.next_actions.length) errors.next_actions = "required";
  if (o.external_send_allowed === true) errors.external_send_allowed = "Sales cannot send autonomously.";
  if (Object.keys(errors).length) throw validationError("Invalid sales output.", errors);
  return out;
}

export function validateMarketingOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const marketing_status = requireStatus(errors, "marketing_status", o.marketing_status);
  const out = {
    campaign_plan: strArr(o.campaign_plan),
    positioning: clip(o.positioning, 2000) || "",
    content_plan: strArr(o.content_plan),
    market_intelligence: strArr(o.market_intelligence),
    measurement: strArr(o.measurement),
    marketing_status,
  };
  if (!out.campaign_plan.length) errors.campaign_plan = "required";
  if (!out.positioning) errors.positioning = "required";
  if (Object.keys(errors).length) throw validationError("Invalid marketing output.", errors);
  return out;
}

export function validateSeoOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const seo_status = requireStatus(errors, "seo_status", o.seo_status);
  const out = {
    keywords: strArr(o.keywords),
    technical_findings: strArr(o.technical_findings),
    content_gaps: strArr(o.content_gaps),
    on_page: strArr(o.on_page),
    performance_notes: strArr(o.performance_notes),
    seo_status,
  };
  if (!out.keywords.length && !out.technical_findings.length) {
    errors.keywords = "keywords or technical_findings required";
  }
  if (Object.keys(errors).length) throw validationError("Invalid SEO output.", errors);
  return out;
}

export function validateCsOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const cs_status = requireStatus(errors, "cs_status", o.cs_status);
  const out = {
    onboarding_plan: strArr(o.onboarding_plan),
    health: clip(o.health, 200) || "unknown",
    adoption: strArr(o.adoption),
    renewal_risk: clip(o.renewal_risk, 200) || "unknown",
    success_plan: strArr(o.success_plan),
    escalation: clip(o.escalation, 500) || "none",
    cs_status,
  };
  if (!out.success_plan.length) errors.success_plan = "required";
  if (Object.keys(errors).length) throw validationError("Invalid CS output.", errors);
  return out;
}
