// Company Builder policy — nothing executes before Founder approval.

import { forbidden, validationError } from "../errors";

export const COMPANY_BUILDER_APPROVAL_CAPABILITY = "approve_production_action";

/**
 * Assert blueprint may not start agent runs / protected actions.
 */
export function assertPlanningOnly(blueprint) {
  if (!blueprint) throw validationError("Blueprint required.");
  if (blueprint.status === "approved") {
    // Even after approval, this engine does not auto-execute industry builds.
    return {
      may_execute_industry_build: false,
      may_enqueue_agent_runs: false,
      reason:
        "Approval records Founder intent. Industry product build remains a later Founder-authorised programme — Company Builder never auto-executes RestaurantOS/PoultryOS/etc.",
    };
  }
  if (blueprint.status !== "awaiting_founder_approval" && blueprint.status !== "planned") {
    if (blueprint.status === "rejected" || blueprint.status === "cancelled") {
      throw forbidden("Blueprint was rejected or cancelled — no execution.");
    }
  }
  return {
    may_execute_industry_build: false,
    may_enqueue_agent_runs: false,
    reason: "Awaiting Founder approval — agent runs and protected actions are blocked.",
  };
}

export function assertNoProtectedExecution(blueprint) {
  const gate = assertPlanningOnly(blueprint);
  if (gate.may_execute_industry_build || gate.may_enqueue_agent_runs) {
    throw forbidden("Company Builder refused protected or industry execution.");
  }
  return true;
}

/**
 * Attempted execution entry — always blocked in Phase C.
 */
export function attemptExecuteBlueprint(blueprint) {
  assertNoProtectedExecution(blueprint);
  return {
    executed: false,
    protected_actions: [],
    industry_os_built: false,
    message: "Execution blocked by Company Builder policy (Phase C planning engine).",
  };
}
