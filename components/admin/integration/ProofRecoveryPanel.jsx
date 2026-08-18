"use client";

import { useCallback, useState } from "react";
import Link from "next/link";

const ERROR_STATES = new Set([
  "resolver_error",
  "persistence_error",
]);

const RECOVERY_CASES = new Set([
  "no_proof",
  "no_project",
  "resumable",
  "resumable_historical",
  "terminal_only",
  "empty",
  "resolver_error",
  "persistence_error",
]);

/**
 * Recovery UI for empty / resumable / terminal / error Founder Proof states.
 * Resume is navigation-only. Start new requires confirm. Errors never offer Start New.
 */
export default function ProofRecoveryPanel({
  founderProofUi = null,
  projectId = "",
  onRetry = null,
  diagnosticsHref = null,
  className = "",
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const ui = founderProofUi;
  const caseId = ui?.caseId || ui?.state || null;

  const copyRef = useCallback(async () => {
    if (!ui?.state) return;
    const ref = [
      `state=${ui.state}`,
      caseId ? `case=${caseId}` : null,
      projectId ? `project=${projectId}` : null,
      ui.machineStatus ? `status=${ui.machineStatus}` : null,
      ui.machineStage ? `stage=${ui.machineStage}` : null,
      `at=${new Date().toISOString()}`,
    ]
      .filter(Boolean)
      .join(";");
    try {
      await navigator.clipboard.writeText(ref);
    } catch {
      /* ignore */
    }
  }, [ui, caseId, projectId]);

  if (!ui?.state) return null;

  const isError = ERROR_STATES.has(ui.state);
  const show =
    isError ||
    RECOVERY_CASES.has(caseId) ||
    ["no_proof", "no_project", "completed", "cancelled", "archived"].includes(ui.state);

  if (!show) return null;
  // Active proofs with a next action use FounderGuidedPanel — skip unless error/empty cases.
  if (ui.caseId === "active" && !isError) return null;

  const primary = ui.primaryCta || null;
  const secondary = ui.secondaryCta || null;
  const diagHref =
    diagnosticsHref ||
    (projectId
      ? `/admin/integration?project_id=${encodeURIComponent(projectId)}&tab=dashboard#proof-diagnostics`
      : "/admin/integration");

  function renderCta(cta, { asConfirm = false } = {}) {
    if (!cta) return null;
    if (cta.id === "retry") {
      return (
        <button
          key={cta.id}
          type="button"
          className="header-btn"
          data-testid={`proof-recovery-${cta.id}`}
          onClick={() => onRetry?.()}
        >
          {cta.label || "Retry"}
        </button>
      );
    }
    if (cta.id === "diagnostics") {
      return (
        <Link
          key={cta.id}
          href={diagHref}
          className="header-btn-ghost"
          data-testid={`proof-recovery-${cta.id}`}
        >
          {cta.label || "Open diagnostics"}
        </Link>
      );
    }
    if (cta.requiresConfirmation || asConfirm || cta.id === "start_new_proof") {
      return (
        <button
          key={cta.id}
          type="button"
          className="header-btn"
          data-testid={`proof-recovery-${cta.id}`}
          onClick={() => setConfirmOpen(true)}
        >
          {cta.label || "Start Founder Proof"}
        </button>
      );
    }
    if (cta.href) {
      return (
        <Link
          key={cta.id || cta.href}
          href={cta.href}
          className="header-btn"
          data-testid={`proof-recovery-${cta.id || "primary"}`}
        >
          {cta.label}
        </Link>
      );
    }
    return null;
  }

  const startHref =
    (primary?.requiresConfirmation && primary.href) ||
    (secondary?.requiresConfirmation && secondary.href) ||
    null;

  return (
    <section
      className={`proof-recovery-panel cc-card ${className}`.trim()}
      data-testid="proof-recovery-panel"
      data-state={ui.state}
      data-case={caseId || ""}
      aria-labelledby="proof-recovery-h"
    >
      <h2 id="proof-recovery-h">{ui.title || "Founder Proof recovery"}</h2>
      <p className="cc-muted">{ui.explanation}</p>

      {Array.isArray(ui.willHappen) && ui.willHappen.length > 0 ? (
        <div className="proof-recovery-facts">
          <h3>What happens</h3>
          <ul>
            {ui.willHappen.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {Array.isArray(ui.willNotHappen) && ui.willNotHappen.length > 0 ? (
        <div className="proof-recovery-facts">
          <h3>What will not happen</h3>
          <ul>
            {ui.willNotHappen.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="proof-recovery-actions">
        {isError ? (
          <>
            {renderCta({ id: "retry", label: "Retry" })}
            <Link
              href={diagHref}
              className="header-btn-ghost"
              data-testid="proof-recovery-diagnostics"
            >
              Open diagnostics
            </Link>
            <button
              type="button"
              className="header-btn-ghost"
              data-testid="proof-recovery-copy-ref"
              onClick={copyRef}
            >
              Copy diagnostic reference
            </button>
          </>
        ) : (
          <>
            {renderCta(primary)}
            {secondary && !secondary.requiresConfirmation
              ? renderCta(secondary)
              : null}
            {secondary?.requiresConfirmation ? renderCta(secondary) : null}
          </>
        )}
      </div>

      {confirmOpen && startHref ? (
        <div
          className="proof-recovery-confirm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="proof-recovery-confirm-h"
          data-testid="proof-recovery-confirm"
        >
          <h3 id="proof-recovery-confirm-h">Start a new Founder Proof?</h3>
          <p className="cc-muted">
            This creates a new objective and run after you continue. It does not approve
            anything, start simulation, or call Anthropic.
          </p>
          <div className="proof-recovery-actions">
            <Link
              href={startHref}
              className="header-btn"
              data-testid="proof-recovery-confirm-start"
              onClick={() => setConfirmOpen(false)}
            >
              Confirm and continue
            </Link>
            <button
              type="button"
              className="header-btn-ghost"
              data-testid="proof-recovery-confirm-cancel"
              onClick={() => setConfirmOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
