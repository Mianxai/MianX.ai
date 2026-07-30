"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import StatusBadge from "@/components/admin/StatusBadge";
import EmptyState from "@/components/admin/EmptyState";
import {
  humanStageLabel,
  humanStatusLabel,
  humanExecutionModeLabel,
  statusTone,
  extractPlanTasks,
  extractProposedAgents,
} from "@/lib/core/integration/founder-labels";
import { validateSimulationDurableReadiness } from "@/lib/core/integration/durable-plan-assignments";
import { DEFAULT_CORRECTION_REASON } from "@/lib/core/integration/durable-plan-assignments";

/**
 * Simulation approval (separate from plan) + start + progress.
 */
export default function IntegrationSimulationPanel({
  run,
  busy,
  onApproveSimulation,
  onStartSimulation,
  onReturnPlanForCorrections,
  onPause,
  onResume,
  onCancel,
  onRecoveryTest,
  onOpenPlan,
  guidance = null,
  projectName = null,
}) {
  const [confirmStart, setConfirmStart] = useState(false);
  const [confirmApprove, setConfirmApprove] = useState(false);
  const [returnModal, setReturnModal] = useState(false);
  const [returnReason, setReturnReason] = useState(DEFAULT_CORRECTION_REASON);
  const reasonId = useId();
  const returnDialogRef = useRef(null);

  const readiness = useMemo(
    () => (run ? validateSimulationDurableReadiness(run) : null),
    [run]
  );

  useEffect(() => {
    if (!returnModal) return;
    const prev = document.activeElement;
    const dialog = returnDialogRef.current;
    const focusable = dialog?.querySelector("textarea, button");
    focusable?.focus();
    function onKey(e) {
      if (e.key === "Escape") setReturnModal(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (prev && typeof prev.focus === "function") prev.focus();
    };
  }, [returnModal]);

  if (!run && guidance) {
    return (
      <EmptyState
        title={guidance.title}
        reason={guidance.reason}
        nextAction={guidance.nextAction}
        cta={
          guidance.actionTab === "plan" ? (
            <button type="button" className="header-btn" onClick={onOpenPlan}>
              Open Plan
            </button>
          ) : null
        }
        data-testid="simulation-guided-empty"
      />
    );
  }
  if (!run) return null;

  const stage = run.current_stage;
  const tasks = extractPlanTasks(run);
  const agents = extractProposedAgents(run);
  const needsSimApproval = stage === "simulation_approval_required";
  const canStart = stage === "approved_for_simulation";
  const blocked = needsSimApproval && readiness?.status === "blocked";
  const running = [
    "workforce_allocated",
    "tasks_claimed",
    "collaboration_running",
    "verification_running",
    "memory_writing",
    "learning_proposals_created",
  ].includes(stage);
  const doneForReview = stage === "founder_final_review" || stage === "completed";

  return (
    <div className="founder-sim-panel" data-testid="integration-simulation-panel">
      <header className="founder-plan-review-header">
        <div>
          <p className="scope-badge">Founder Proof · Deterministic simulation</p>
          <h2>Deterministic Simulation</h2>
          <p className="cc-muted">
            Simulation does not equal a completed real company or live AI execution. Provider
            spend for this path is £0.
          </p>
        </div>
        <div className="founder-plan-review-badges">
          <StatusBadge tone={statusTone(stage)}>{humanStageLabel(stage)}</StatusBadge>
          <StatusBadge tone={statusTone(run.status)}>
            {humanStatusLabel(run.status, stage)}
          </StatusBadge>
        </div>
      </header>

      {(needsSimApproval || canStart) && (
        <section className="cc-card" data-testid="simulation-approval-card">
          <h3>
            {needsSimApproval
              ? blocked
                ? "Plan corrections required before simulation approval"
                : "Approve deterministic simulation boundary"
              : "Start deterministic simulation"}
          </h3>

          {blocked ? (
            <div
              className="founder-sim-blocked"
              data-testid="simulation-approval-blocked"
              role="status"
            >
              <p>
                Simulation Approval is blocked because the durable plan is missing required
                per-task agent assignments. Display-only agent suggestions are not enough.
              </p>
              <ul>
                {(readiness?.reasons || []).slice(0, 4).map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <p className="cc-muted">
                {(readiness?.recommended_corrections || [])[0] ||
                  "Return the plan for corrections to regenerate durable assignments."}
              </p>
            </div>
          ) : (
            <dl className="cc-detail-dl founder-plan-grid">
              <div>
                <dt>Proposed tasks</dt>
                <dd>{tasks.length}</dd>
              </div>
              <div>
                <dt>Proposed agents</dt>
                <dd>
                  {agents.length
                    ? agents.map((a) => a.role).join(", ")
                    : "Selected at start from routable workforce"}
                </dd>
              </div>
              <div>
                <dt>Simulation boundary</dt>
                <dd>{humanExecutionModeLabel(run.execution_mode)}</dd>
              </div>
              <div>
                <dt>Protected actions</dt>
                <dd>production_deployment — blocked</dd>
              </div>
              <div>
                <dt>Provider status</dt>
                <dd>Not required for Level-1 deterministic proof</dd>
              </div>
              <div>
                <dt>Agents allocated</dt>
                <dd>
                  Agents are proposed but will not be allocated until Simulation Approval and
                  explicit Start
                </dd>
              </div>
            </dl>
          )}

          {needsSimApproval ? (
            <div className="admin-actions">
              {blocked ? (
                <button
                  type="button"
                  className="header-btn"
                  data-testid="return-plan-for-corrections"
                  disabled={busy}
                  onClick={() => {
                    setReturnReason(DEFAULT_CORRECTION_REASON);
                    setReturnModal(true);
                  }}
                >
                  Return plan for corrections
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="header-btn"
                    data-testid="approve-deterministic-simulation"
                    disabled={busy}
                    onClick={() => setConfirmApprove(true)}
                  >
                    Approve deterministic simulation boundary
                  </button>
                  <button
                    type="button"
                    className="header-btn-ghost"
                    data-testid="return-plan-for-corrections-secondary"
                    disabled={busy}
                    onClick={() => {
                      setReturnReason(DEFAULT_CORRECTION_REASON);
                      setReturnModal(true);
                    }}
                  >
                    Return plan for corrections
                  </button>
                </>
              )}
              <p className="integration-disabled-reason" role="status">
                Approving does not start the simulation. Live AI execution remains disabled.
              </p>
            </div>
          ) : null}

          {canStart ? (
            <div className="admin-actions">
              <button
                type="button"
                className="header-btn"
                data-testid="start-deterministic-simulation"
                disabled={busy}
                onClick={() => setConfirmStart(true)}
              >
                Start deterministic simulation
              </button>
            </div>
          ) : null}
        </section>
      )}

      {confirmApprove ? (
        <div
          className="integration-confirm-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sim-approve-title"
          data-testid="simulation-approve-confirm"
        >
          <h3 id="sim-approve-title">Approve deterministic simulation boundary?</h3>
          <p>
            <strong>Approving:</strong> authorizes deterministic simulation eligibility; approves
            the bounded simulation workforce; approves simulation-only task allocation.
          </p>
          <p>
            <strong>Not approving:</strong> simulation start; live provider usage; production
            deployment; external side effects; final proof completion.
          </p>
          <p>
            <strong>Next:</strong> a separate explicit “Start simulation” action is required.
          </p>
          <div className="admin-actions">
            <button
              type="button"
              className="header-btn"
              data-testid="confirm-approve-simulation"
              disabled={busy}
              onClick={async () => {
                await onApproveSimulation?.();
                setConfirmApprove(false);
              }}
            >
              Confirm approval
            </button>
            <button
              type="button"
              className="header-btn-ghost"
              onClick={() => setConfirmApprove(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {returnModal ? (
        <div
          className="integration-confirm-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="return-plan-title"
          data-testid="return-plan-corrections-modal"
          ref={returnDialogRef}
        >
          <h3 id="return-plan-title">Return plan for corrections</h3>
          <p>
            This regenerates and persists durable per-task assignments on the canonical proof. It
            does not create a second Founder Proof, start simulation, call a provider, or deploy
            production.
          </p>
          <dl className="cc-detail-dl">
            <div>
              <dt>Project</dt>
              <dd>{projectName || run.project_id}</dd>
            </div>
            <div>
              <dt>Canonical run</dt>
              <dd>
                <code>{run.id}</code>
              </dd>
            </div>
            <div>
              <dt>Current stage</dt>
              <dd>{humanStageLabel(stage)}</dd>
            </div>
          </dl>
          <label htmlFor={reasonId}>
            Reason <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={reasonId}
            data-testid="return-plan-reason"
            required
            rows={6}
            value={returnReason}
            onChange={(e) => setReturnReason(e.target.value)}
            aria-required="true"
          />
          <div className="admin-actions">
            <button
              type="button"
              className="header-btn"
              data-testid="confirm-return-plan-corrections"
              disabled={busy || !String(returnReason || "").trim()}
              onClick={async () => {
                await onReturnPlanForCorrections?.(String(returnReason).trim());
                setReturnModal(false);
              }}
            >
              Confirm return for corrections
            </button>
            <button
              type="button"
              className="header-btn-ghost"
              onClick={() => setReturnModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {confirmStart ? (
        <div className="integration-confirm-dialog" role="dialog" aria-modal="true">
          <h3>Start deterministic simulation?</h3>
          <p>
            This runs the workforce dry-run only. Provider will not be called. Production
            deployment stays blocked. Final completion still requires Founder review.
          </p>
          <div className="admin-actions">
            <button
              type="button"
              className="header-btn"
              data-testid="confirm-start-simulation"
              disabled={busy}
              onClick={async () => {
                await onStartSimulation?.();
                setConfirmStart(false);
              }}
            >
              Confirm start
            </button>
            <button
              type="button"
              className="header-btn-ghost"
              onClick={() => setConfirmStart(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      {(running || doneForReview) && (
        <section className="cc-card" data-testid="simulation-progress">
          <h3>Simulation progress</h3>
          <p className="cc-muted">
            Stage: {humanStageLabel(stage)}. Evidence and memory appear only when durable records
            exist.
          </p>
          {/* CI / Founder truth: allocation is proposed-only until Start; never all 38. */}
          <div data-testid="agent-allocation" className="founder-sim-allocation-truth">
            <p>
              Proposed agents:{" "}
              <strong data-testid="allocation-proposed-count">
                {agents.length || run.allocation?.selected_agents?.length || 0}
              </strong>
              . Activated all 38:{" "}
              <strong data-testid="allocation-activated-all-38">
                {String(Boolean(run.allocation?.activated_all_36))}
              </strong>
              .
            </p>
          </div>
          <div className="admin-actions">
            {running ? (
              <>
                <button type="button" className="header-btn-ghost" disabled={busy} onClick={onPause}>
                  Pause
                </button>
                <button
                  type="button"
                  className="header-btn-ghost"
                  data-testid="deterministic-recovery-test"
                  disabled={busy}
                  onClick={onRecoveryTest}
                >
                  Deterministic recovery test
                </button>
                <button type="button" className="header-btn-ghost" disabled={busy} onClick={onCancel}>
                  Cancel proof
                </button>
              </>
            ) : null}
            {doneForReview && !running ? (
              <button
                type="button"
                className="header-btn-ghost"
                data-testid="deterministic-recovery-test"
                disabled={busy}
                onClick={onRecoveryTest}
              >
                Deterministic recovery test
              </button>
            ) : null}
            {stage === "paused" ? (
              <button type="button" className="header-btn" disabled={busy} onClick={onResume}>
                Resume
              </button>
            ) : null}
          </div>
        </section>
      )}

      <details className="founder-technical-details" data-testid="simulation-technical-details">
        <summary>Technical details — proposed agent list</summary>
        {agents.length ? (
          <ul>
            {agents.map((a) => (
              <li key={a.slug || a.role}>
                {a.role || a.slug}
                {a.reason ? ` — ${a.reason}` : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p className="cc-muted">No proposed agents listed yet.</p>
        )}
      </details>
    </div>
  );
}
