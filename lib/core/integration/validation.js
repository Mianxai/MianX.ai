/**
 * Plan validation before Founder approval / execution.
 */

export function validatePlanPackage({
  planning_plan = null,
  template_plan = null,
  objective = null,
  execution_mode = "deterministic_simulation",
} = {}) {
  const errors = [];
  const warnings = [];

  if (!planning_plan) {
    errors.push("planning_plan_missing");
  }
  if (planning_plan?.clarification_required) {
    errors.push("clarification_still_required");
  }
  if (planning_plan?.payload?.dependency_cycle || planning_plan?.dependency_cycle) {
    errors.push("dependency_cycle");
  }

  const wbs = planning_plan?.wbs || planning_plan?.payload?.wbs;
  if (wbs?.edges) {
    try {
      // soft — cycles already asserted in planning engine; surface flag if present
      if (wbs.cycle_detected) errors.push("dependency_cycle");
    } catch {
      errors.push("dependency_validation_failed");
    }
  }

  const caps =
    planning_plan?.capability_plan?.capability_objects ||
    planning_plan?.capabilities ||
    template_plan?.capabilities ||
    [];
  if (!caps.length) warnings.push("no_capabilities_mapped");

  const depts =
    planning_plan?.capability_plan?.department_ownership ||
    planning_plan?.departments ||
    [];
  if (!depts.length) warnings.push("no_department_ownership");

  if (!objective?.success_criteria?.length) {
    errors.push("success_criteria_missing");
  }
  if (!objective?.expected_deliverables?.length) {
    errors.push("deliverables_missing");
  }

  const evidenceReqs =
    planning_plan?.evidence_requirements ||
    planning_plan?.payload?.evidence_requirements ||
    [];
  if (!evidenceReqs.length) {
    warnings.push("evidence_requirements_implicit");
  }

  const gates =
    planning_plan?.approval_gates ||
    (planning_plan?.approval_gate ? [planning_plan.approval_gate] : []);
  if (!gates.length && !planning_plan?.approval_gate_id) {
    warnings.push("approval_gate_will_be_created");
  }

  if (!execution_mode) errors.push("execution_mode_missing");

  const providerRequired = execution_mode === "live_provider";
  const unresolved =
    planning_plan?.unresolved_gaps ||
    planning_plan?.payload?.unresolved ||
    template_plan?.unresolved ||
    [];

  const valid = errors.length === 0;

  return {
    valid,
    errors,
    warnings,
    provider_required: providerRequired,
    provider_requirement_explicit: true,
    unresolved_gaps: unresolved,
    executes: false,
    fabricated_execution: false,
  };
}

/**
 * Inject a synthetic cycle failure for Scenario E.
 */
export function forceDependencyCycleValidation() {
  return {
    valid: false,
    errors: ["dependency_cycle"],
    warnings: [],
    provider_required: false,
    provider_requirement_explicit: true,
    unresolved_gaps: ["cycle:a→b→a"],
    executes: false,
    fabricated_execution: false,
  };
}
