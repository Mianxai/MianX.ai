// Machine-validated Wave-3 platform outputs.

import { clip } from "../validate";
import { validationError } from "../errors";
import { VERDICT_STATUSES } from "./policy";

function requireArray(errors, key, value, { min = 1, max = 50 } = {}) {
  if (!Array.isArray(value) || value.length < min) {
    errors[key] = `${key} must be a non-empty array.`;
    return [];
  }
  return value
    .map((v) => (typeof v === "string" ? clip(v, 1000) : clip(JSON.stringify(v), 1000)))
    .filter(Boolean)
    .slice(0, max);
}

export function validateSecurityOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const security_status = clip(o.security_status, 40);
  if (!VERDICT_STATUSES.includes(security_status)) {
    errors.security_status = `Must be one of: ${VERDICT_STATUSES.join(", ")}`;
  }
  const out = {
    security_status,
    findings: Array.isArray(o.findings)
      ? o.findings.map((f) => clip(f, 500)).filter(Boolean).slice(0, 50)
      : [],
    recommendations: Array.isArray(o.recommendations)
      ? o.recommendations.map((f) => clip(f, 500)).filter(Boolean).slice(0, 50)
      : [],
    secret_exposure: Boolean(o.secret_exposure),
    capability_changes: Array.isArray(o.capability_changes)
      ? o.capability_changes.map((c) => clip(String(c), 200)).slice(0, 20)
      : [],
    production_impact: clip(o.production_impact, 500) || "none_claimed",
  };
  if (out.secret_exposure && security_status === "PASS") {
    errors.secret_exposure = "Cannot PASS while secret_exposure is true.";
  }
  if (Object.keys(errors).length) throw validationError("Invalid security output.", errors);
  return out;
}

export function validateDevopsOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const out = {
    build_status: clip(o.build_status, 40) || "unknown",
    lint_status: clip(o.lint_status, 40) || "unknown",
    test_status: clip(o.test_status, 40) || "unknown",
    artifact_readiness: clip(o.artifact_readiness, 40) || "unknown",
    deployment_plan: requireArray(errors, "deployment_plan", o.deployment_plan),
    rollback_plan: requireArray(errors, "rollback_plan", o.rollback_plan),
    risk_assessment: clip(o.risk_assessment, 2000) || "",
    devops_status: clip(o.devops_status, 40) || "PASS",
  };
  if (!out.risk_assessment) errors.risk_assessment = "risk_assessment is required.";
  if (Object.keys(errors).length) throw validationError("Invalid devops output.", errors);
  return out;
}

export function validateInfraOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const infra_status = clip(o.infra_status, 40);
  if (!VERDICT_STATUSES.includes(infra_status)) {
    errors.infra_status = `Must be one of: ${VERDICT_STATUSES.join(", ")}`;
  }
  const out = {
    required_services: requireArray(errors, "required_services", o.required_services),
    runtime_dependencies: requireArray(errors, "runtime_dependencies", o.runtime_dependencies),
    environment_requirements: requireArray(
      errors,
      "environment_requirements",
      o.environment_requirements
    ),
    health_checks: requireArray(errors, "health_checks", o.health_checks),
    capacity_assumptions: Array.isArray(o.capacity_assumptions)
      ? o.capacity_assumptions.map((c) => clip(c, 500)).filter(Boolean).slice(0, 20)
      : [],
    failure_modes: requireArray(errors, "failure_modes", o.failure_modes),
    rollback_considerations: requireArray(
      errors,
      "rollback_considerations",
      o.rollback_considerations
    ),
    infra_status,
  };
  if (Object.keys(errors).length) throw validationError("Invalid infrastructure output.", errors);
  return out;
}

export function validateDataAiOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  const data_ai_status = clip(o.data_ai_status, 40);
  if (!VERDICT_STATUSES.includes(data_ai_status)) {
    errors.data_ai_status = `Must be one of: ${VERDICT_STATUSES.join(", ")}`;
  }
  const out = {
    provider_allowed: Boolean(o.provider_allowed),
    model_policy_ok: Boolean(o.model_policy_ok),
    fake_provider_for_tests: o.fake_provider_for_tests !== false,
    schema_ok: Boolean(o.schema_ok),
    project_isolation_ok: Boolean(o.project_isolation_ok),
    telemetry_ok: Boolean(o.telemetry_ok),
    sensitive_logging_avoided: o.sensitive_logging_avoided !== false,
    data_ai_status,
    findings: Array.isArray(o.findings)
      ? o.findings.map((f) => clip(f, 500)).filter(Boolean).slice(0, 40)
      : [],
  };
  if (Object.keys(errors).length) throw validationError("Invalid data/AI output.", errors);
  return out;
}

export function validateCodingCandidateOutput(raw) {
  const errors = {};
  const o = raw && typeof raw === "object" ? raw : {};
  if (!Array.isArray(o.files_changed) || o.files_changed.length === 0) {
    errors.files_changed = "files_changed required.";
  }
  if (o.pushed === true || o.merged === true || o.deployed === true) {
    errors.side_effects = "Coding candidate must not claim push/merge/deploy.";
  }
  if (Object.keys(errors).length) throw validationError("Invalid coding candidate.", errors);
  return {
    files_changed: o.files_changed,
    patch_summary: o.patch_summary || { format: "summary", files: [] },
    commands_run: Array.isArray(o.commands_run) ? o.commands_run : [],
    test_results: Array.isArray(o.test_results) ? o.test_results : [],
    warnings: Array.isArray(o.warnings) ? o.warnings.map((w) => clip(w, 500)).slice(0, 40) : [],
    risk_class: clip(o.risk_class, 10) || "R2",
    requires_human_review: o.requires_human_review !== false,
    validation_passed: o.validation_passed !== false,
    pushed: false,
    merged: false,
    deployed: false,
  };
}
