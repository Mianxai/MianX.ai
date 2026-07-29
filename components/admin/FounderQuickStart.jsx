"use client";

import { useEffect, useMemo, useState } from "react";
import { deriveQuickStartStates } from "@/lib/core/integration/founder-labels";

const STORAGE_KEY = "mianx.admin.founderQuickStartExpanded";

/**
 * Compact stage-aware Founder Quick Start stepper.
 */
export default function FounderQuickStart({ run = null, hasProject = false }) {
  const steps = deriveQuickStartStates(run, { hasProject });
  const completedCount = steps.filter((s) => s.state === "completed").length;
  const currentIdx = steps.findIndex((s) => s.state === "current");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "1") setShowAll(true);
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
    const idx = currentIdx >= 0 ? currentIdx : completedCount;
    const out = [];
    // Always include current
    if (steps[idx]) out.push(steps[idx]);
    // Next two upcoming
    for (let i = idx + 1; i < steps.length && out.length < 3; i += 1) {
      out.push(steps[i]);
    }
    // If near end, show last completed behind
    if (out.length < 3 && idx > 0) {
      out.unshift(steps[idx - 1]);
    }
    // Dedupe by id
    const seen = new Set();
    return out.filter((s) => {
      if (seen.has(s.id)) return false;
      seen.add(s.id);
      return true;
    });
  }, [steps, showAll, currentIdx, completedCount]);

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
            {completedCount} of {steps.length} steps completed
          </p>
        </div>
        <button
          type="button"
          className="header-btn-ghost"
          data-testid="quick-start-toggle-all"
          aria-expanded={showAll}
          onClick={toggleAll}
        >
          {showAll ? "Collapse steps" : "View all steps"}
        </button>
      </header>

      <ol className="founder-quick-start-list founder-quick-start-list--compact">
        {visible.map((step) => {
          const fullIdx = steps.findIndex((s) => s.id === step.id);
          return (
            <li
              key={step.id}
              className={`founder-quick-start-item is-${step.state} ${
                step.state === "current" ? "is-expanded" : "is-compact"
              }`}
              data-testid={`quick-start-${step.id}`}
              data-state={step.state}
            >
              <span className="founder-quick-start-index">{fullIdx + 1}</span>
              <div>
                <strong>{step.label}</strong>
                {step.state === "current" || showAll ? <p>{step.description}</p> : null}
                <span className="founder-quick-start-state">
                  {step.state === "completed"
                    ? "Completed"
                    : step.state === "current"
                      ? "Current"
                      : "Upcoming"}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
