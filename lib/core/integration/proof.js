/**
 * Founder production proof objective + status lifecycle.
 * Never auto-starts. Never auto-approves.
 */

import { badRequest } from "../errors.js";

export const PROOF_STATUSES = Object.freeze([
  "not_started",
  "objective_created",
  "clarification_required",
  "awaiting_plan_approval",
  "simulation_approved",
  "simulation_running",
  "paused",
  "recovering",
  "awaiting_final_review",
  "completed",
  "rejected",
  "failed",
]);

export const FOUNDER_PRODUCTION_PROOF_OBJECTIVE = Object.freeze({
  title: "Secure Internal Employee Onboarding Workflow",
  business_purpose:
    "Design a secure and auditable employee onboarding workflow for a generic digital company.",
  expected_deliverables: [
    "onboarding stages",
    "department ownership",
    "access approval flow",
    "security controls",
    "verification checklist",
    "evidence requirements",
    "risk register",
    "Founder approval gates",
  ],
  success_criteria: [
    "objective requests clarification where required",
    "planning completes without dependency cycles",
    "only necessary agents are allocated",
    "simulation cannot begin without Founder approval",
    "unsupported completion is rejected",
    "protected production deployment remains blocked",
    "evidence, memory and learning are produced",
    "final completion requires Founder review",
  ],
  constraints: [
    "deterministic_simulation only",
    "no industry product",
    "no automatic Founder approval",
    "no fabricated live AI completion",
  ],
  priority: "P1",
  risk_tolerance: "moderate",
  budget_mode: "simulation_only",
  execution_mode: "deterministic_simulation",
  industry: "technology",
  business_model: "subscription",
  required_approvals: ["founder_simulation", "founder_final_review"],
  protected_actions: ["production_deployment"],
  unresolved_questions: [
    "Which identity provider pattern should the onboarding workflow assume for this generic digital company?",
  ],
  known_assumptions: [
    "Generic digital company — not RestaurantOS, PoultryOS, or any vertical product",
  ],
});

export function buildProductionProofObjective({ project_id, organization_id = null } = {}) {
  if (!project_id) throw new Error("project_id required for production proof objective");
  return {
    ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
    project_id,
    organization_id,
    is_production_proof: true,
  };
}

export function assertExplicitFounderConfirmation(confirmation) {
  if (confirmation !== true && confirmation !== "CONFIRM_PRODUCTION_PROOF") {
    throw badRequest(
      "Production proof requires explicit Founder confirmation (confirmation=true)"
    );
  }
}
