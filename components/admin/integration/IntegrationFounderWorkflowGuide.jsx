"use client";

import { deriveFounderWorkflowGuideSteps } from "@/lib/core/integration/founder-proof-view-model";

const STATE_LABEL = {
  completed: "Completed",
  current: "Current step",
  waiting_for_founder: "Waiting for Founder",
  system_processing: "System processing",
  blocked: "Blocked",
  upcoming: "Upcoming",
  pending: "Upcoming",
};

/**
 * Compact Founder proof workflow — driven only by the canonical view model.
 */
export function deriveFounderWorkflowSteps({
  run = null,
  runStage,
  proofStatus,
  hasRun,
  evidenceCount = 0,
  memoryCount = 0,
  learningCount = 0,
} = {}) {
  return deriveFounderWorkflowGuideSteps({
    hasProject: true,
    run:
      run ||
      (hasRun
        ? {
            id: "ctx",
            current_stage: runStage,
            status: proofStatus,
            evidence: { count: evidenceCount },
            memory: { count: memoryCount },
            learning: { count: learningCount },
          }
        : null),
    evidenceCount,
    memoryCount,
    learningCount,
  });
}

export default function IntegrationFounderWorkflowGuide({
  run = null,
  runStage,
  proofStatus,
  hasRun,
  evidenceCount = 0,
  memoryCount = 0,
  learningCount = 0,
}) {
  const steps = deriveFounderWorkflowSteps({
    run,
    runStage,
    proofStatus,
    hasRun,
    evidenceCount,
    memoryCount,
    learningCount,
  });

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
