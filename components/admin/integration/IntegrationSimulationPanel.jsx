"use client";

import { useState } from "react";
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

/**
 * Simulation approval (separate from plan) + start + progress.
 */
export default function IntegrationSimulationPanel({
  run,
  busy,
  onApproveSimulation,
  onStartSimulation,
  onPause,
  onResume,
  onCancel,
  onRecoveryTest,
  onOpenPlan,
  guidance = null,
}) {
  const [confirmStart, setConfirmStart] = useState(false);
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
            {needsSimApproval ? "Approve deterministic simulation" : "Start deterministic simulation"}
          </h3>
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
              <dt>Estimated steps</dt>
              <dd>Allocate → claim → collaborate → verify → memory → learning → final review</dd>
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
              <dt>Evidence expected</dt>
              <dd>Yes — task and verification artefacts</dd>
            </div>
            <div>
              <dt>Memory expected</dt>
              <dd>Yes — candidates only (no auto-promote)</dd>
            </div>
            <div>
              <dt>Learning expected</dt>
              <dd>Yes — proposals only (no auto-apply)</dd>
            </div>
            <div>
              <dt>Recovery test</dt>
              <dd>Available after start (deterministic checkpoint)</dd>
            </div>
            <div>
              <dt>Provider status</dt>
              <dd>Unconfigured / not called</dd>
            </div>
            <div>
              <dt>Cost</dt>
              <dd>£0 provider spend for deterministic simulation</dd>
            </div>
            <div>
              <dt>Production mutation</dt>
              <dd>Blocked</dd>
            </div>
          </dl>

          {needsSimApproval ? (
            <div className="admin-actions">
              <button
                type="button"
                className="header-btn"
                data-testid="approve-deterministic-simulation"
                disabled={busy}
                onClick={() => onApproveSimulation?.()}
              >
                Approve deterministic simulation
              </button>
              <p className="integration-disabled-reason" role="status">
                Approving does not start the simulation.
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

      <section className="cc-card" data-testid="agent-allocation" aria-labelledby="agent-alloc-h">
        <h3 id="agent-alloc-h">Agent allocation</h3>
        {run.allocation ? (
          <dl className="cc-detail-dl founder-plan-grid">
            <div>
              <dt>Allocated count</dt>
              <dd>{run.allocation.count ?? "—"}</dd>
            </div>
            <div>
              <dt>activated_all_36</dt>
              <dd data-testid="allocation-activated-all-36">
                {String(Boolean(run.allocation.activated_all_36))}
              </dd>
            </div>
            <div>
              <dt>Policy</dt>
              <dd>Necessary routable agents only — not the full 36</dd>
            </div>
          </dl>
        ) : (
          <p className="cc-muted">
            Not allocated until simulation starts. Plan approval and simulation approval do not
            allocate agents.
          </p>
        )}
      </section>

      <section className="cc-card" data-testid="simulation-progress">
        <h3>{doneForReview ? "Simulation completed" : "Simulation progress"}</h3>
        <dl className="cc-detail-dl founder-plan-grid">
          <div>
            <dt>Current stage</dt>
            <dd>{humanStageLabel(stage)}</dd>
          </div>
          <div>
            <dt>Evidence count</dt>
            <dd>{run.evidence?.count ?? 0}</dd>
          </div>
          <div>
            <dt>Memory candidates</dt>
            <dd>{run.memory?.count ?? 0}</dd>
          </div>
          <div>
            <dt>Learning proposals</dt>
            <dd>{run.learning?.count ?? 0}</dd>
          </div>
          <div>
            <dt>Recovery count</dt>
            <dd>{run.recovery_count ?? 0}</dd>
          </div>
          <div>
            <dt>Provider called</dt>
            <dd>{run.provider_called ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt>Fabricated execution</dt>
            <dd>{run.fabricated_execution ? "Yes" : "No"}</dd>
          </div>
        </dl>
        {doneForReview ? (
          <p className="cc-banner" role="status">
            Simulation completed. Review evidence, then open Final Review on the Proof Pack tab.
          </p>
        ) : null}
        {!running && !doneForReview ? (
          <p className="cc-muted">
            Progress updates after you approve and start deterministic simulation.
          </p>
        ) : null}
      </section>

      {run && !["completed", "rejected", "cancelled"].includes(stage) ? (
        <div className="admin-actions">
          <button type="button" className="header-btn-ghost" disabled={busy} onClick={onPause}>
            Pause
          </button>
          <button type="button" className="header-btn-ghost" disabled={busy} onClick={onResume}>
            Resume
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
            Cancel run
          </button>
        </div>
      ) : null}

      <p className="admin-note" role="note">
        Deterministic recovery test creates/restores a checkpoint without simulating a live outage.
      </p>

      <details className="cc-card">
        <summary>Technical details</summary>
        <pre className="admin-pre">
          {JSON.stringify(
            {
              stage: run.current_stage,
              status: run.status,
              simulation_approval: run.simulation_approval,
              allocation: run.allocation,
            },
            null,
            2
          )}
        </pre>
      </details>
    </div>
  );
}
