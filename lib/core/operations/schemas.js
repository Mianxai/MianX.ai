import { clip } from "../validate";
import { validationError } from "../errors";
import { VERDICT_STATUSES } from "./policy";

function strArr(v, max = 30) {
  if (!Array.isArray(v)) return [];
  return v.map((x) => clip(String(x), 500)).filter(Boolean).slice(0, max);
}

export function validateOpsOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const ops_status = clip(o.ops_status, 40);
  if (!VERDICT_STATUSES.includes(ops_status)) {
    errors.ops_status = `Must be one of: ${VERDICT_STATUSES.join(", ")}`;
  }
  const out = {
    incident_class: clip(o.incident_class, 80) || "unclassified",
    severity: clip(o.severity, 40) || "unknown",
    process_health: clip(o.process_health, 200) || "unknown",
    blockers: strArr(o.blockers),
    sla_notes: strArr(o.sla_notes),
    escalation_path: strArr(o.escalation_path),
    ops_status,
    recommended_actions: strArr(o.recommended_actions),
    requires_founder_approval: Boolean(o.requires_founder_approval),
  };
  if (!out.recommended_actions.length) {
    errors.recommended_actions = "recommended_actions required.";
  }
  if (Object.keys(errors).length) throw validationError("Invalid ops output.", errors);
  return out;
}

export function validateSupportOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const support_status = clip(o.support_status, 40);
  if (!VERDICT_STATUSES.includes(support_status)) {
    errors.support_status = `Must be one of: ${VERDICT_STATUSES.join(", ")}`;
  }
  const out = {
    classification: clip(o.classification, 120) || "general",
    priority: clip(o.priority, 40) || "normal",
    draft_response: clip(o.draft_response, 8000) || "",
    escalation: clip(o.escalation, 500) || "none",
    incident_link: clip(o.incident_link, 200) || "none",
    customer_safe: o.customer_safe !== false,
    support_status,
    external_send_allowed: false, // hard policy — drafts only
  };
  if (!out.draft_response) errors.draft_response = "draft_response required.";
  if (o.external_send_allowed === true) {
    errors.external_send_allowed = "Support must not claim external send authority.";
  }
  if (Object.keys(errors).length) throw validationError("Invalid support output.", errors);
  return out;
}

export function validateAnalyticsOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const analytics_status = clip(o.analytics_status, 40);
  if (!VERDICT_STATUSES.includes(analytics_status)) {
    errors.analytics_status = `Must be one of: ${VERDICT_STATUSES.join(", ")}`;
  }
  const fabricated = strArr(o.fabricated_claims);
  if (fabricated.length) {
    errors.fabricated_claims = "Analytics must not emit fabricated claims.";
  }
  const out = {
    metrics: o.metrics && typeof o.metrics === "object" && !Array.isArray(o.metrics) ? o.metrics : {},
    data_available: Boolean(o.data_available),
    insufficient_data: strArr(o.insufficient_data, 50),
    insights: strArr(o.insights),
    analytics_status,
    fabricated_claims: [],
  };
  if (Object.keys(errors).length) throw validationError("Invalid analytics output.", errors);
  return out;
}
