/**
 * Map Founder Proof stage/status → default Integration tab id.
 * Explicit ?tab= always wins at the call site.
 */

export function tabForFounderProofStage(stage, proofStatus = null) {
  const s = String(stage || "");
  const ps = String(proofStatus || "");

  if (
    ["objective_received", "objective_validated", "clarification_required"].includes(s) ||
    ps === "clarification_required" ||
    s === "objective_created"
  ) {
    return "objective";
  }

  if (
    [
      "plan_generated",
      "plan_created",
      "templates_matched",
      "capabilities_mapped",
      "dependencies_validated",
      "execution_preview_generated",
      "founder_approval_required",
    ].includes(s) ||
    ps === "awaiting_plan_approval"
  ) {
    return "plan";
  }

  if (
    [
      "simulation_approval_required",
      "approved_for_simulation",
      "workforce_allocated",
      "tasks_claimed",
      "collaboration_running",
      "verification_running",
      "memory_writing",
      "learning_proposals_created",
      "simulation_ready",
      "simulation_running",
    ].includes(s) ||
    ["awaiting_simulation_approval", "awaiting_simulation_start", "simulating", "simulation_approved"].includes(
      ps
    )
  ) {
    return "simulation";
  }

  if (s === "evidence_ready" || ps === "evidence_ready") {
    return "evidence";
  }

  if (
    s === "memory_learning_review" ||
    ps === "memory_learning_review" ||
    s === "memory_writing" ||
    s === "learning_proposals_created"
  ) {
    // Prefer Memory when learning not the explicit next gate.
    if (ps?.includes("learning") || s.includes("learning")) return "learning";
    return "memory";
  }

  if (
    ["founder_final_review", "completed", "final_review_required"].includes(s) ||
    ["awaiting_final_review", "completed"].includes(ps)
  ) {
    return "proof";
  }

  return "dashboard";
}

export const VALID_INTEGRATION_TABS = Object.freeze([
  "dashboard",
  "objective",
  "plan",
  "simulation",
  "evidence",
  "memory",
  "learning",
  "proof",
]);

export function resolveIntegrationTab({
  explicitTab = null,
  stage = null,
  proofStatus = null,
} = {}) {
  if (explicitTab && VALID_INTEGRATION_TABS.includes(explicitTab)) {
    return explicitTab;
  }
  return tabForFounderProofStage(stage, proofStatus);
}
