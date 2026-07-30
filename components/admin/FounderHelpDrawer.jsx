"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import { FOUNDER_GLOSSARY } from "@/lib/core/integration/founder-labels";

/**
 * Contextual Help / How this works drawer with Founder glossary.
 */
export default function FounderHelpDrawer({
  open,
  onClose,
  pathname = "",
  projectName = null,
  proofState = null,
  onRestartTour = null,
}) {
  const titleId = useId();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const pageTips = useMemo(
    () => buildPageTips(pathname, { projectName, proofState }),
    [pathname, projectName, proofState]
  );

  if (!open) return null;

  return (
    <div className="founder-help-overlay" role="presentation">
      <button
        type="button"
        className="founder-help-backdrop"
        aria-label="Close help"
        onClick={onClose}
      />
      <aside
        className="founder-help-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-testid="founder-help-drawer"
      >
        <header className="founder-help-header">
          <h2 id={titleId}>How this works</h2>
          <button
            ref={closeRef}
            type="button"
            className="header-btn-ghost"
            onClick={onClose}
            aria-label="Close help"
          >
            Close
          </button>
        </header>
        <div className="founder-help-body">
          <p>
            Mianx.ai admin is a Founder-operated Business Operating System. The normal path is the
            Founder Proof: objective → clarification → plan → simulation approval → simulation →
            evidence → memory/learning → final review.
          </p>
          <p>
            Approvals are always explicit. Deterministic simulation never calls a provider and never
            deploys to production. Advanced Runtime tools are optional and not part of the Founder
            Proof checklist.
          </p>

          {pageTips.length > 0 ? (
            <section className="founder-help-context" data-testid="founder-help-context">
              <h3>On this page</h3>
              {projectName ? (
                <p className="cc-muted">
                  Project: <strong>{projectName}</strong>
                </p>
              ) : null}
              {proofState?.title ? (
                <p className="cc-muted">
                  Proof: <strong>{proofState.title}</strong>
                  {proofState.state ? ` (${proofState.state})` : ""}
                </p>
              ) : null}
              <ul>
                {pageTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {typeof onRestartTour === "function" ? (
            <p>
              <button
                type="button"
                className="header-btn"
                data-testid="founder-help-restart-tour"
                onClick={() => {
                  onRestartTour();
                  onClose?.();
                }}
              >
                Restart tour
              </button>
            </p>
          ) : null}

          <h3>Glossary</h3>
          <dl className="founder-glossary" data-testid="founder-glossary">
            {FOUNDER_GLOSSARY.map((entry) => (
              <div key={entry.term}>
                <dt>{entry.term}</dt>
                <dd>{entry.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>
    </div>
  );
}

export function buildPageTips(pathname, { projectName, proofState } = {}) {
  const tips = [];
  const path = pathname || "";

  if (path.startsWith("/admin/command-center") || path === "/admin") {
    tips.push(
      "Home shows current project, proof state, Next Founder Action, and nine-step progress."
    );
    tips.push("Full Agent Network lives under Agents — not on Home by default.");
  } else if (path.startsWith("/admin/workforce-readiness")) {
    tips.push(
      "Workforce Readiness shows exact catalogue vs executable vs 445 capacity counts — not filler agents."
    );
    tips.push(
      "Definitions are contracts; Live Workforce shows project-scoped instances only when allocated."
    );
  } else if (path.startsWith("/admin/integration")) {
    tips.push(
      "Plan approval does not start simulation. Simulation approval does not start simulation either."
    );
    tips.push("Anthropic is not required for deterministic Founder Proof.");
    if (proofState?.state === "no_proof") {
      tips.push("Start a new proof only with explicit confirmation.");
    }
    if (
      proofState?.state === "resolver_error" ||
      proofState?.state === "persistence_error"
    ) {
      tips.push("Do not start a new proof while status is uncertain — retry or open diagnostics.");
    }
  } else if (path.startsWith("/admin/inbox")) {
    tips.push("Inbox lists actions that need Founder attention across the active project.");
  } else if (path.startsWith("/admin/objectives")) {
    tips.push("Objectives feed Founder Proof. Creating one does not approve or simulate.");
  } else if (path.startsWith("/admin/projects")) {
    tips.push("Select an active project before starting or resuming Founder Proof.");
  } else if (path.startsWith("/admin/agents")) {
    tips.push("Agent definitions are catalog capacity. Instances appear after allocation.");
  } else if (path.startsWith("/admin/runtime")) {
    tips.push("Runtime Overview is Advanced Operations — optional for completing Founder Proof.");
  } else if (path.startsWith("/admin/settings")) {
    tips.push(
      "Live AI provider is optional for deterministic proof. In-memory rate limits suit single-instance testing."
    );
  } else if (path.startsWith("/admin/memory") || path.startsWith("/admin/learning")) {
    tips.push("Candidates never auto-promote. Review and decide explicitly.");
  }

  if (projectName && tips.length === 0) {
    tips.push(`Working in project “${projectName}”.`);
  }

  return tips;
}
