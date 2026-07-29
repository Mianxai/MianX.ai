"use client";

import { useEffect, useMemo, useState } from "react";
import { deriveQuickStartStates } from "@/lib/core/integration/founder-labels";

const STORAGE_KEY = "mianx.admin.founderQuickStartExpanded";

/**
 * Truly compact Founder Quick Start — current + next by default.
 */
export default function FounderQuickStart({ run = null, hasProject = false }) {
  const steps = deriveQuickStartStates(run, { hasProject });
  const completedCount = steps.filter((s) => s.state === "completed").length;
  const currentIdx = Math.max(
    0,
    steps.findIndex((s) => s.state === "current")
  );
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") setShowAll(true);
    } catch {
      /* ignore */
    }
  }, []);

  function toggleAll() {
    setShowAll((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const visible = useMemo(() => {
    if (showAll) return steps;
    const out = [];
    if (steps[currentIdx]) out.push(steps[currentIdx]);
    if (steps[currentIdx + 1]) out.push(steps[currentIdx + 1]);
    return out;
  }, [steps, showAll, currentIdx]);

  return (
    <section
      className="founder-quick-start founder-quick-start--compact cc-card"
      data-testid="founder-quick-start"
      aria-labelledby="founder-quick-start-h"
    >
      <header className="founder-quick-start-header">
        <div>
          <h2 id="founder-quick-start-h">Founder Quick Start</h2>
          <p className="cc-muted" data-testid="quick-start-progress">
            Completed: {completedCount} of {steps.length}
          </p>
        </div>
        <button
          type="button"
          className="header-btn-ghost"
          data-testid="quick-start-toggle-all"
          aria-expanded={showAll}
          onClick={toggleAll}
        >
          {showAll ? "Collapse steps" : `View all ${steps.length} steps`}
        </button>
      </header>

      <ol className="founder-quick-start-list founder-quick-start-list--compact">
        {visible.map((step) => {
          const fullIdx = steps.findIndex((s) => s.id === step.id);
          const expanded = showAll || step.state === "current";
          return (
            <li
              key={step.id}
              className={`founder-quick-start-item is-${step.state} ${
                expanded ? "is-expanded" : "is-compact"
              }`}
              data-testid={`quick-start-${step.id}`}
              data-state={step.state}
            >
              <span className="founder-quick-start-index">{fullIdx + 1}</span>
              <div>
                <strong>{step.label}</strong>
                {expanded ? <p>{step.description}</p> : null}
                <span className="founder-quick-start-state">
                  {step.state === "completed"
                    ? "Completed"
                    : step.state === "current"
                      ? "Current"
                      : "Next"}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
