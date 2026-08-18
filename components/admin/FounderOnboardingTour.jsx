"use client";

import { useCallback, useEffect, useId, useState } from "react";

export const FOUNDER_TOUR_STEPS = Object.freeze([
  {
    id: "welcome",
    title: "Welcome to Founder Mode",
    body: "Home, Projects, Objectives, Founder Proof, and Inbox are your primary path. Advanced Operations stay collapsed until you need runtime tools.",
  },
  {
    id: "project",
    title: "Always pick a project",
    body: "Founder Proof is scoped to one active project. Names are shown by default — UUIDs stay in technical details.",
  },
  {
    id: "objective",
    title: "Issue an objective",
    body: "Start a proof only when ready. Creating an objective does not approve a plan, start simulation, or call Anthropic.",
  },
  {
    id: "plan_vs_sim",
    title: "Plan approval ≠ simulation",
    body: "Approving the plan moves only to Simulation Approval. It never starts the simulation or allocates agents.",
  },
  {
    id: "sim_approval",
    title: "Simulation approval ≠ start",
    body: "Approving the simulation boundary is a separate gate. Start Simulation is another explicit action after that.",
  },
  {
    id: "deterministic",
    title: "Deterministic by default",
    body: "Founder Proof uses deterministic simulation. Anthropic is not required for this path. Live provider execution is optional and gated.",
  },
  {
    id: "evidence",
    title: "Evidence, memory, learning",
    body: "Review evidence after simulation. Memory and learning candidates never auto-promote — Founder decides.",
  },
  {
    id: "final",
    title: "Final Founder approval",
    body: "Completion requires an explicit final review. Protected actions such as production deployment stay blocked.",
  },
  {
    id: "help",
    title: "Help is always available",
    body: "Use Help for glossary terms and page tips. Restart this tour anytime from the Help drawer.",
  },
]);

export function tourStorageKey(userId) {
  return `mianx.founder.tour.v1.${userId || "anon"}`;
}

/**
 * First-time Founder Mode tour — Next/Back/Skip/Don't show again.
 */
export default function FounderOnboardingTour({
  open,
  onClose,
  userId = "anon",
  onDontShowAgain = null,
}) {
  const titleId = useId();
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (open) setStepIndex(0);
  }, [open]);

  const persistDismissed = useCallback(() => {
    try {
      window.localStorage.setItem(tourStorageKey(userId), "dismissed");
    } catch {
      /* ignore */
    }
    onDontShowAgain?.();
  }, [userId, onDontShowAgain]);

  if (!open) return null;

  const step = FOUNDER_TOUR_STEPS[stepIndex] || FOUNDER_TOUR_STEPS[0];
  const isLast = stepIndex >= FOUNDER_TOUR_STEPS.length - 1;

  return (
    <div className="founder-tour-overlay" role="presentation" data-testid="founder-tour">
      <button
        type="button"
        className="founder-tour-backdrop"
        aria-label="Close tour"
        onClick={onClose}
      />
      <div
        className="founder-tour-card"
        role="dialog"
        aria-modal="true"
        aria-label="Founder Mode guided tour"
        aria-labelledby={titleId}
        data-testid="founder-tour-dialog"
      >
        <p className="founder-tour-progress">
          Step {stepIndex + 1} of {FOUNDER_TOUR_STEPS.length}
        </p>
        <h2 id={titleId}>{step.title}</h2>
        <p>{step.body}</p>
        <div className="founder-tour-actions">
          <button
            type="button"
            className="header-btn-ghost"
            disabled={stepIndex === 0}
            onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            data-testid="founder-tour-back"
          >
            Back
          </button>
          {!isLast ? (
            <button
              type="button"
              className="header-btn"
              onClick={() => setStepIndex((i) => i + 1)}
              data-testid="founder-tour-next"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              className="header-btn"
              onClick={() => {
                persistDismissed();
                onClose?.();
              }}
              data-testid="founder-tour-done"
            >
              Done
            </button>
          )}
          <button
            type="button"
            className="header-btn-ghost"
            onClick={() => {
              onClose?.();
            }}
            data-testid="founder-tour-skip"
          >
            Skip
          </button>
          <button
            type="button"
            className="header-btn-ghost"
            onClick={() => {
              persistDismissed();
              onClose?.();
            }}
            data-testid="founder-tour-dont-show"
          >
            Don&apos;t show again
          </button>
        </div>
      </div>
    </div>
  );
}
