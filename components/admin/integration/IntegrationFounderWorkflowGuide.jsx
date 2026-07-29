"use client";

const STEPS = [
  { id: "objective", label: "Objective" },
  { id: "clarification", label: "Clarification" },
  { id: "plan_review", label: "Plan review" },
  { id: "plan_approval", label: "Plan approval" },
  { id: "simulation_approval", label: "Simulation approval" },
  { id: "simulation", label: "Simulation" },
  { id: "evidence", label: "Evidence" },
  { id: "memory_learning", label: "Memory and learning" },
  { id: "final_review", label: "Final review" },
];

/**
 * Map integration stage/status to a simple Founder workflow step index + state.
 */
export function deriveFounderWorkflowSteps({ runStage, proofStatus, hasRun } = {}) {
  const stage = String(runStage || "");
  const status = String(proofStatus || "");

  let current = "objective";
  if (!hasRun || stage === "objective_received" || status === "objective_created") {
    current = "objective";
  }
  if (stage === "clarification_required" || status === "clarification_required") {
    current = "clarification";
  } else if (
    stage === "objective_validated" ||
    stage === "templates_matched" ||
    stage === "plan_generated" ||
    stage === "execution_preview_generated"
  ) {
    current = "plan_review";
  } else if (stage === "founder_approval_required" || status === "awaiting_plan_approval") {
    current = "plan_approval";
  } else if (stage === "approved_for_simulation" || status === "simulation_approved") {
    current = "simulation_approval";
  } else if (
    [
      "workforce_allocated",
      "tasks_claimed",
      "collaboration_running",
      "verification_running",
    ].includes(stage) ||
    status === "simulation_running"
  ) {
    current = "simulation";
  } else if (stage === "memory_writing" || stage === "learning_proposals_created") {
    current = "memory_learning";
  } else if (
    ["evidence_packaged", "proof_pack_ready"].includes(stage) ||
    status === "awaiting_final_review" ||
    stage === "founder_final_review"
  ) {
    if (stage === "founder_final_review" || status === "awaiting_final_review") {
      current = "final_review";
    } else {
      current = "evidence";
    }
  } else if (stage === "completed" || status === "completed") {
    current = "final_review";
  }

  const order = STEPS.map((s) => s.id);
  const currentIdx = order.indexOf(current);
  const blocked = ["failed", "rejected", "paused"].includes(stage) || ["failed", "rejected", "paused"].includes(status);

  return STEPS.map((step, idx) => {
    let state = "upcoming";
    if (blocked && idx === currentIdx) state = "blocked";
    else if (idx < currentIdx) state = "completed";
    else if (idx === currentIdx) {
      if (
        ["clarification", "plan_approval", "simulation_approval", "final_review"].includes(
          step.id
        )
      ) {
        state = "waiting_for_founder";
      } else if (["simulation", "memory_learning", "plan_review"].includes(step.id)) {
        state = "system_processing";
      } else {
        state = "current";
      }
    }
    return { ...step, state, isCurrent: idx === currentIdx };
  });
}

const STATE_LABEL = {
  completed: "Completed",
  current: "Current step",
  waiting_for_founder: "Waiting for Founder",
  system_processing: "System processing",
  blocked: "Blocked",
  upcoming: "Upcoming",
};

export default function IntegrationFounderWorkflowGuide({ runStage, proofStatus, hasRun }) {
  const steps = deriveFounderWorkflowSteps({ runStage, proofStatus, hasRun });

  return (
    <nav
      className="founder-workflow-guide"
      data-testid="founder-workflow-guide"
      aria-label="Founder proof workflow"
    >
      <h2 className="founder-workflow-guide-title">Founder proof workflow</h2>
      <ol className="founder-workflow-steps">
        {steps.map((step) => (
          <li
            key={step.id}
            data-state={step.state}
            data-current={step.isCurrent ? "true" : "false"}
            className={`founder-workflow-step founder-workflow-step--${step.state}`}
          >
            <span className="founder-workflow-step-label">{step.label}</span>
            <span className="founder-workflow-step-state">
              {STATE_LABEL[step.state] || step.state}
            </span>
          </li>
        ))}
      </ol>
      <p className="cc-muted founder-workflow-advanced-note" data-testid="founder-advanced-areas-note">
        Advanced operational areas (Runtime, Queue, Agent registration, Manual workforce
        simulation, Planning Intelligence, Company Builder) are not required to complete this
        Founder Proof.
      </p>
    </nav>
  );
}
