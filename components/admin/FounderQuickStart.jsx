"use client";

import { deriveQuickStartStates } from "@/lib/core/integration/founder-labels";

/**
 * Founder Quick Start — 9-step operating checklist.
 */
export default function FounderQuickStart({ run = null, hasProject = false }) {
  const steps = deriveQuickStartStates(run, { hasProject });

  return (
    <section
      className="founder-quick-start cc-card"
      data-testid="founder-quick-start"
      aria-labelledby="founder-quick-start-h"
    >
      <h2 id="founder-quick-start-h">Founder Quick Start</h2>
      <p className="cc-muted">
        Follow these steps for the deterministic Founder Proof. Advanced runtime controls are not
        required here.
      </p>
      <ol className="founder-quick-start-list">
        {steps.map((step, idx) => (
          <li
            key={step.id}
            className={`founder-quick-start-item is-${step.state}`}
            data-testid={`quick-start-${step.id}`}
            data-state={step.state}
          >
            <span className="founder-quick-start-index">{idx + 1}</span>
            <div>
              <strong>{step.label}</strong>
              <p>{step.description}</p>
              <span className="founder-quick-start-state">
                {step.state === "completed"
                  ? "Completed"
                  : step.state === "current"
                    ? "Current"
                    : "Upcoming"}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
