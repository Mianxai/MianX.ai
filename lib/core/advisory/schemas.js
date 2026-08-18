import { clip } from "../validate";
import { validationError } from "../errors";
import { VERDICT_STATUSES } from "./policy";

function strArr(v, max = 40) {
  if (!Array.isArray(v)) return [];
  return v.map((x) => clip(String(x), 500)).filter(Boolean).slice(0, max);
}
function status(errors, key, value) {
  const s = clip(value, 40);
  if (!VERDICT_STATUSES.includes(s)) errors[key] = `Must be one of: ${VERDICT_STATUSES.join(", ")}`;
  return s;
}

export function validateFinanceOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const finance_status = status(errors, "finance_status", o.finance_status);
  const out = {
    analysis: clip(o.analysis, 8000) || "",
    recommendations: strArr(o.recommendations),
    risks: strArr(o.risks),
    unit_economics: o.unit_economics && typeof o.unit_economics === "object" ? o.unit_economics : {},
    finance_status,
    disclaimer: clip(o.disclaimer, 1000) || "Advisory analysis only — not a payment or billing instruction.",
    requires_founder_approval: Boolean(o.requires_founder_approval),
  };
  if (!out.analysis) errors.analysis = "required";
  if (!out.recommendations.length) errors.recommendations = "required";
  if (Object.keys(errors).length) throw validationError("Invalid finance output.", errors);
  return out;
}

export function validateHrOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const hr_status = status(errors, "hr_status", o.hr_status);
  const out = {
    plan: strArr(o.plan),
    role_analysis: strArr(o.role_analysis),
    hiring_plan: strArr(o.hiring_plan),
    training: strArr(o.training),
    recommendations: strArr(o.recommendations),
    hr_status,
    disclaimer: clip(o.disclaimer, 1000) || "Recommendations only — humans decide hiring, firing, and compensation.",
  };
  if (!out.plan.length) errors.plan = "required";
  if (!out.recommendations.length) errors.recommendations = "required";
  if (Object.keys(errors).length) throw validationError("Invalid HR output.", errors);
  return out;
}

export function validateLegalOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const legal_status = status(errors, "legal_status", o.legal_status);
  if (o.is_licensed_legal_advice === true) {
    errors.is_licensed_legal_advice = "Must not claim licensed legal advice.";
  }
  const out = {
    risks: strArr(o.risks),
    issues: strArr(o.issues),
    compliance_checklist: strArr(o.compliance_checklist),
    policy_gaps: strArr(o.policy_gaps),
    preparation: strArr(o.preparation),
    legal_status,
    disclaimer: clip(o.disclaimer, 1000) || "Structured analysis for human counsel — not licensed legal advice.",
    is_licensed_legal_advice: false,
    requires_founder_approval: Boolean(o.requires_founder_approval),
  };
  if (!out.risks.length && !out.issues.length) errors.risks = "risks or issues required";
  if (!out.disclaimer) errors.disclaimer = "required";
  if (Object.keys(errors).length) throw validationError("Invalid legal output.", errors);
  return out;
}
