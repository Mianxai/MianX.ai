// Machine-validated handoff schemas for Wave-2 software delivery.

import { clip } from "../validate";
import { validationError, forbidden } from "../errors";
import { isProtectedAction, approvalCapabilityForAction } from "../executive/policy";

const RISK_LEVELS = ["R0", "R1", "R2", "R3", "R4", "low", "medium", "high", "critical"];
const QA_STATUSES = ["PASS", "PASS_WITH_RISKS", "FAIL", "BLOCKED"];
const REVIEW_VERDICTS = ["pass", "reject"];
const RISK_CLASSES = ["R0", "R1", "R2", "R3", "R4"];

function requireNonEmptyArray(errors, key, value, { max = 50, itemMax = 1000 } = {}) {
  if (!Array.isArray(value) || value.length === 0) {
    errors[key] = `${key} must be a non-empty array.`;
    return [];
  }
  return value
    .map((v) => (typeof v === "string" ? clip(v, itemMax) : clip(JSON.stringify(v), itemMax)))
    .filter(Boolean)
    .slice(0, max);
}

function requireString(errors, key, value, { max = 4000, required = true } = {}) {
  const s = clip(value, max);
  if (required && !s) errors[key] = `${key} is required.`;
  return s || "";
}

/**
 * PRODUCT SPEC
 */
export function validateProductSpec(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const out = {
    objective: requireString(errors, "objective", o.objective),
    problem_statement: requireString(errors, "problem_statement", o.problem_statement),
    scope: requireString(errors, "scope", o.scope),
    out_of_scope: requireNonEmptyArray(errors, "out_of_scope", o.out_of_scope),
    requirements: requireNonEmptyArray(errors, "requirements", o.requirements),
    acceptance_criteria: requireNonEmptyArray(errors, "acceptance_criteria", o.acceptance_criteria),
    constraints: Array.isArray(o.constraints)
      ? o.constraints.map((c) => clip(c, 500)).filter(Boolean).slice(0, 40)
      : [],
    dependencies: Array.isArray(o.dependencies)
      ? o.dependencies.map((c) => clip(c, 500)).filter(Boolean).slice(0, 40)
      : [],
    risk_level: clip(o.risk_level, 20) || "R2",
  };
  if (!RISK_LEVELS.includes(out.risk_level) && !/^R[0-4]$/.test(out.risk_level)) {
    errors.risk_level = `risk_level must be one of: ${RISK_LEVELS.join(", ")}`;
  }
  if (Object.keys(errors).length) throw validationError("Invalid product specification.", errors);
  return out;
}

/**
 * ARCHITECTURE PLAN
 */
export function validateArchitecturePlan(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const out = {
    components: requireNonEmptyArray(errors, "components", o.components),
    affected_areas: requireNonEmptyArray(errors, "affected_areas", o.affected_areas),
    interfaces: requireNonEmptyArray(errors, "interfaces", o.interfaces),
    data_changes: Array.isArray(o.data_changes)
      ? o.data_changes.map((c) => clip(typeof c === "string" ? c : JSON.stringify(c), 500)).slice(0, 40)
      : [],
    security_considerations: requireNonEmptyArray(
      errors,
      "security_considerations",
      o.security_considerations
    ),
    implementation_steps: requireNonEmptyArray(
      errors,
      "implementation_steps",
      o.implementation_steps
    ),
    verification_requirements: requireNonEmptyArray(
      errors,
      "verification_requirements",
      o.verification_requirements
    ),
    rollback_considerations: requireNonEmptyArray(
      errors,
      "rollback_considerations",
      o.rollback_considerations
    ),
  };
  if (Object.keys(errors).length) throw validationError("Invalid architecture plan.", errors);
  return out;
}

/**
 * ENGINEERING WORK PACKAGE (+ implementation envelope)
 */
export function validateWorkPackage(raw, index = 0) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const prefix = `work_packages[${index}]`;
  const out = {
    task_id: clip(o.task_id || o.reference, 80) || `wp-${index + 1}`,
    owner: clip(o.owner, 100) || "delivery-engineer",
    files_or_components: requireNonEmptyArray(
      errors,
      `${prefix}.files_or_components`,
      o.files_or_components || o.components
    ),
    change_intent: requireString(errors, `${prefix}.change_intent`, o.change_intent, {
      max: 2000,
    }),
    dependencies: Array.isArray(o.dependencies)
      ? o.dependencies.map((d) => clip(d, 200)).filter(Boolean).slice(0, 20)
      : [],
    acceptance_criteria: requireNonEmptyArray(
      errors,
      `${prefix}.acceptance_criteria`,
      o.acceptance_criteria
    ),
    risk_class: clip(o.risk_class, 10) || "R2",
    approval_required: Boolean(o.approval_required) && isProtectedAction(o.proposed_action),
    proposed_action: clip(o.proposed_action, 100) || null,
  };
  if (!RISK_CLASSES.includes(out.risk_class)) {
    errors[`${prefix}.risk_class`] = `risk_class must be one of: ${RISK_CLASSES.join(", ")}`;
  }
  if (Object.keys(errors).length) throw validationError("Invalid engineering work package.", errors);
  return out;
}

export function validateEngineeringResult(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  if (!Array.isArray(o.work_packages) || o.work_packages.length === 0) {
    errors.work_packages = "work_packages must be a non-empty array.";
  }
  const work_packages = (o.work_packages || []).map((wp, i) => validateWorkPackage(wp, i));
  const repository_write_performed = Boolean(o.repository_write_performed);
  if (repository_write_performed === true) {
    // Wave-2 must never claim real repo mutation through this agent.
    errors.repository_write_performed =
      "Wave-2 delivery-engineer has no repository write authority; must be false.";
  }
  const implementation_result =
    o.implementation_result && typeof o.implementation_result === "object"
      ? {
          summary: clip(o.implementation_result.summary, 4000) || "",
          artifacts: Array.isArray(o.implementation_result.artifacts)
            ? o.implementation_result.artifacts.map((a) => clip(a, 500)).filter(Boolean).slice(0, 40)
            : [],
          status: clip(o.implementation_result.status, 40) || "planned",
        }
      : { summary: "", artifacts: [], status: "planned" };
  if (!implementation_result.summary) {
    errors["implementation_result.summary"] = "implementation_result.summary is required.";
  }

  if (Object.keys(errors).length) throw validationError("Invalid engineering result.", errors);

  return {
    work_packages,
    implementation_result,
    repository_write_performed: false,
    known_risks: Array.isArray(o.known_risks)
      ? o.known_risks.map((r) => clip(r, 500)).filter(Boolean).slice(0, 40)
      : [],
    proposed_action: clip(o.proposed_action, 100) || null,
  };
}

/**
 * REVIEW RESULT
 */
export function validateReviewResult(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const verdict = clip(o.verdict, 20);
  if (!REVIEW_VERDICTS.includes(verdict)) {
    errors.verdict = 'verdict must be "pass" or "reject".';
  }
  const out = {
    verdict,
    findings: Array.isArray(o.findings)
      ? o.findings.map((f) => clip(f, 500)).filter(Boolean).slice(0, 50)
      : [],
    scope_ok: Boolean(o.scope_ok),
    architecture_ok: Boolean(o.architecture_ok),
    missing_acceptance_criteria: Array.isArray(o.missing_acceptance_criteria)
      ? o.missing_acceptance_criteria.map((m) => clip(m, 500)).filter(Boolean).slice(0, 40)
      : [],
    unsafe_capability_requests: Array.isArray(o.unsafe_capability_requests)
      ? o.unsafe_capability_requests.map((m) => clip(m, 200)).filter(Boolean).slice(0, 20)
      : [],
  };
  if (verdict === "pass" && out.unsafe_capability_requests.length > 0) {
    errors.unsafe_capability_requests =
      "Review cannot pass while unsafe capability requests are present.";
  }
  if (Object.keys(errors).length) throw validationError("Invalid review result.", errors);
  return out;
}

/**
 * QA PLAN + delivery readiness
 */
export function validateQaPlan(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const out = {
    acceptance_criteria_mapping: Array.isArray(o.acceptance_criteria_mapping)
      ? o.acceptance_criteria_mapping
          .map((m) =>
            typeof m === "string"
              ? clip(m, 500)
              : clip(`${m?.criterion || ""} → ${m?.coverage || ""}`, 500)
          )
          .filter(Boolean)
          .slice(0, 50)
      : [],
    functional_tests: requireNonEmptyArray(errors, "functional_tests", o.functional_tests),
    regression_tests: requireNonEmptyArray(errors, "regression_tests", o.regression_tests),
    security_checks: Array.isArray(o.security_checks)
      ? o.security_checks.map((s) => clip(s, 500)).filter(Boolean).slice(0, 40)
      : [],
    negative_cases: requireNonEmptyArray(errors, "negative_cases", o.negative_cases),
    expected_result: requireString(errors, "expected_result", o.expected_result, { max: 2000 }),
  };
  if (out.acceptance_criteria_mapping.length === 0) {
    errors.acceptance_criteria_mapping = "acceptance_criteria_mapping is required.";
  }
  if (Object.keys(errors).length) throw validationError("Invalid QA plan.", errors);
  return out;
}

export function validateDeliveryReadiness(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const out = {
    requirements_status: clip(o.requirements_status, 40) || "unknown",
    engineering_status: clip(o.engineering_status, 40) || "unknown",
    qa_status: clip(o.qa_status, 40),
    known_risks: Array.isArray(o.known_risks)
      ? o.known_risks.map((r) => clip(r, 500)).filter(Boolean).slice(0, 40)
      : [],
    blockers: Array.isArray(o.blockers)
      ? o.blockers.map((b) => clip(b, 500)).filter(Boolean).slice(0, 40)
      : [],
    approval_required: Boolean(o.approval_required),
    recommended_next_action: requireString(
      errors,
      "recommended_next_action",
      o.recommended_next_action,
      { max: 1000 }
    ),
    proposed_action: clip(o.proposed_action, 100) || null,
  };
  if (!QA_STATUSES.includes(out.qa_status)) {
    errors.qa_status = `qa_status must be one of: ${QA_STATUSES.join(", ")}`;
  }
  // Action-based: bare boolean is not enough — derive from proposed_action.
  const gate = out.proposed_action && isProtectedAction(out.proposed_action);
  out.approval_required = Boolean(gate);
  out.approval_capability = gate ? approvalCapabilityForAction(out.proposed_action) : null;
  if (Object.keys(errors).length) throw validationError("Invalid delivery readiness.", errors);
  return out;
}

export function validateQaOutput(raw) {
  const o = raw && typeof raw === "object" ? raw : {};
  const qa_plan = validateQaPlan(o.qa_plan || o);
  const qa_status = clip(o.qa_status, 40);
  if (!QA_STATUSES.includes(qa_status)) {
    throw validationError("Invalid QA output.", {
      qa_status: `qa_status must be one of: ${QA_STATUSES.join(", ")}`,
    });
  }
  const delivery_readiness = validateDeliveryReadiness({
    ...(o.delivery_readiness || {}),
    qa_status: o.delivery_readiness?.qa_status || qa_status,
  });
  return {
    qa_plan,
    qa_status,
    delivery_readiness,
    evidence: Array.isArray(o.evidence)
      ? o.evidence.map((e) => clip(e, 500)).filter(Boolean).slice(0, 40)
      : [],
  };
}

/**
 * Rejects when product claims completion without QA evidence, or when
 * engineering claims repository writes.
 */
export function assertNoSilentScopeExpansion(productSpec, objective) {
  const obj = clip(objective, 8000).toLowerCase();
  const scope = clip(productSpec?.scope, 4000).toLowerCase();
  if (scope.includes("production deploy") && !obj.includes("deploy")) {
    throw forbidden("Product scope expansion into production deploy is not allowed.");
  }
  return true;
}

export { QA_STATUSES, REVIEW_VERDICTS };
