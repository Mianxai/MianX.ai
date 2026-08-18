"use client";

import { FOUNDER_FLOW_STEPS } from "@/lib/core/integration/founder-flow";

function stepClass(stepId, states) {
  if (states.completed.has(stepId)) return "completed";
  if (states.current.has(stepId)) return "current";
  if (states.blocked.has(stepId)) return "blocked";
  return "pending";
}

function stepLabel(stepId, states) {
  const base = FOUNDER_FLOW_STEPS.find((s) => s.id === stepId)?.label || stepId;
  const cls = stepClass(stepId, states);
  if (cls === "completed") return `${base} — completed`;
  if (cls === "current") return `${base} — current step`;
  if (cls === "blocked") return `${base} — blocked`;
  return `${base} — pending`;
}

export default function IntegrationFlowStepper({ stepStates }) {
  return (
    <nav
      className="integration-flow-stepper"
      aria-label="Founder proof progress"
      data-testid="founder-flow-stepper"
    >
      <ol>
        {FOUNDER_FLOW_STEPS.map((step) => {
          const cls = stepClass(step.id, stepStates);
          return (
            <li key={step.id} className={cls} data-step={step.id}>
              <span className="integration-step-icon" aria-hidden="true">
                {cls === "completed" ? "✓" : cls === "blocked" ? "!" : cls === "current" ? "●" : "○"}
              </span>
              <span className="integration-step-text">{stepLabel(step.id, stepStates)}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
