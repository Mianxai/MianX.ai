"use client";

import { useState } from "react";
import StickyFounderApprovalBar from "@/components/admin/StickyFounderApprovalBar";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  humanStageLabel,
  humanStatusLabel,
  humanExecutionModeLabel,
  statusTone,
  extractPlanTasks,
  extractProposedAgents,
} from "@/lib/core/integration/founder-labels";

function CopyId({ id, label = "Copy ID" }) {
  const [copied, setCopied] = useState(false);
  if (!id) return null;
  return (
    <button
      type="button"
      className="header-btn-ghost"
      data-testid="copy-run-id"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(id);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* ignore */
        }
      }}
    >
      {copied ? "Copied" : label}
    </button>
  );
}

/**
 * Premium Founder Plan Review — human-readable before any technical JSON.
 */
export default function IntegrationPlanReview({
  run,
  projectName,
  busy,
  onApprove,
  onReturn,
  onReject,
}) {
  const [confirm, setConfirm] = useState(null); // reject | return | approve
  const [reason, setReason] = useState("");

  if (!run) return null;

  const tasks = extractPlanTasks(run);
  const agents = extractProposedAgents(run);
  const stageLabel = humanStageLabel(run.current_stage);
  const statusLabel = humanStatusLabel(run.status, run.current_stage);
  const modeLabel = humanExecutionModeLabel(run.execution_mode);
  const departments = [
    ...new Set(
      [
        ...(run.approval_package?.departments || []),
        ...tasks.map((t) => t.department),
      ]
        .map((d) => (typeof d === "string" ? d : d?.name || d?.slug))
        .filter(Boolean)
    ),
  ];
  const risks = run.approval_package?.risks || run.planning_plan?.risks || [];
  const protectedActions = run.objective?.protected_actions || ["production_deployment"];
  const awaitingPlan = run.current_stage === "founder_approval_required";

  async function submitDestructive() {
    if (!confirm) return;
    if (!reason.trim()) return;
    if (confirm === "reject") await onReject?.(reason.trim());
    else await onReturn?.(reason.trim());
    setConfirm(null);
    setReason("");
  }

  return (
    <div className="founder-plan-review" data-testid="integration-plan-review">
      <header className="founder-plan-review-header">
        <div>
          <p className="scope-badge" data-testid="plan-scope-badge">
            Founder Proof · Deterministic simulation
          </p>
          <h2>Founder Plan Review</h2>
          <p className="cc-muted">
            Review the deterministic plan below. Approving does not start simulation, call a
            provider, or unlock production deployment.
          </p>
        </div>
        <div className="founder-plan-review-badges">
          <StatusBadge tone={statusTone(run.current_stage)}>{stageLabel}</StatusBadge>
          <StatusBadge tone={statusTone(run.status || run.current_stage)}>
            {statusLabel}
          </StatusBadge>
        </div>
      </header>

      <section className="cc-card" data-testid="plan-overview" aria-labelledby="plan-overview-h">
        <h3 id="plan-overview-h">Plan overview</h3>
        <dl className="cc-detail-dl founder-plan-grid">
          <div>
            <dt>Objective</dt>
            <dd>{run.objective?.title || "—"}</dd>
          </div>
          <div>
            <dt>Business purpose</dt>
            <dd>{run.objective?.business_purpose || "—"}</dd>
          </div>
          <div>
            <dt>Execution mode</dt>
            <dd>{modeLabel}</dd>
          </div>
          <div>
            <dt>Current stage</dt>
            <dd data-testid="plan-stage-label">{stageLabel}</dd>
          </div>
          <div>
            <dt>Current status</dt>
            <dd data-testid="plan-status-label">{statusLabel}</dd>
          </div>
          <div>
            <dt>Simulation boundary</dt>
            <dd>Deterministic simulation only — live execution blocked</dd>
          </div>
          <div>
            <dt>Plan version</dt>
            <dd>{run.planning_plan?.id ? "Deterministic v1" : "Pending generation"}</dd>
          </div>
          <div>
            <dt>Generated</dt>
            <dd>{run.approval_package?.created_at || run.updated_at || "—"}</dd>
          </div>
          <div>
            <dt>Project</dt>
            <dd>{projectName || "No project selected"}</dd>
          </div>
          <div>
            <dt>Canonical run</dt>
            <dd>
              Yes <CopyId id={run.id} />
            </dd>
          </div>
        </dl>
      </section>

      <section className="cc-card" data-testid="plan-metrics" aria-labelledby="plan-metrics-h">
        <h3 id="plan-metrics-h">Plan metrics</h3>
        <ul className="founder-metric-row">
          <li>
            <strong>{tasks.length || 0}</strong>
            <span>Proposed tasks</span>
          </li>
          <li>
            <strong>{departments.length || 0}</strong>
            <span>Departments</span>
          </li>
          <li>
            <strong>{agents.length || 0}</strong>
            <span>Proposed agents</span>
          </li>
          <li>
            <strong>{(run.approval_package?.dependencies || []).length || 0}</strong>
            <span>Dependencies</span>
          </li>
          <li>
            <strong>{protectedActions.length}</strong>
            <span>Protected actions</span>
          </li>
          <li>
            <strong>{risks.length || 0}</strong>
            <span>Risks</span>
          </li>
        </ul>
      </section>

      <section className="cc-card" data-testid="plan-agents" aria-labelledby="plan-agents-h">
        <h3 id="plan-agents-h">Selected agents</h3>
        {agents.length ? (
          <>
            <p className="cc-muted" data-testid="plan-agents-truth">
              Proposed roles for deterministic simulation. Agents are not allocated until
              simulation approval and start.
            </p>
            <ul className="founder-agent-list">
              {agents.map((a) => (
                <li key={a.role}>
                  <strong>{a.role}</strong>
                  {a.department ? <span> · {a.department}</span> : null}
                  <span className="cc-muted"> · proposed</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p data-testid="plan-agents-truth">
            Not allocated until simulation approval. Roles will be selected from the routable
            workforce when the simulation starts.
          </p>
        )}
      </section>

      <section className="cc-card" data-testid="plan-wbs" aria-labelledby="plan-wbs-h">
        <h3 id="plan-wbs-h">Work breakdown</h3>
        {tasks.length ? (
          <ul className="founder-task-list">
            {tasks.map((t) => (
              <li key={t.id} className="founder-task-card">
                <h4>{t.title}</h4>
                <p>{t.purpose}</p>
                <dl className="cc-detail-dl">
                  <div>
                    <dt>Department</dt>
                    <dd>{t.department}</dd>
                  </div>
                  <div>
                    <dt>Proposed agent role</dt>
                    <dd>{t.agent_role || "Assigned at simulation start"}</dd>
                  </div>
                  <div>
                    <dt>Dependency</dt>
                    <dd>{Array.isArray(t.dependency) ? t.dependency.join(", ") : t.dependency}</dd>
                  </div>
                  <div>
                    <dt>Expected output</dt>
                    <dd>{t.expected_output}</dd>
                  </div>
                  <div>
                    <dt>Evidence required</dt>
                    <dd>{t.evidence_required ? "Yes" : "No"}</dd>
                  </div>
                  <div>
                    <dt>Risk</dt>
                    <dd>{t.risk_level}</dd>
                  </div>
                  <div>
                    <dt>Protected action</dt>
                    <dd>{t.protected_action ? "Yes — blocked" : "No"}</dd>
                  </div>
                  <div>
                    <dt>Execution eligibility</dt>
                    <dd>{t.execution_eligibility}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        ) : (
          <p className="cc-muted">No WBS tasks available yet. Generate the plan first.</p>
        )}
      </section>

      <section className="cc-card" data-testid="plan-governance" aria-labelledby="plan-gov-h">
        <h3 id="plan-gov-h">Risk and governance</h3>
        <ul>
          {(risks.length ? risks : ["Deterministic simulation only — not live execution"]).map(
            (r, i) => (
              <li key={i}>{typeof r === "string" ? r : r.summary || r.title || JSON.stringify(r)}</li>
            )
          )}
        </ul>
        <p>
          <strong>Protected actions (remain blocked):</strong> {protectedActions.join(", ")}
        </p>
        <p>
          <strong>Security boundary:</strong> No provider calls. No production deployment. No
          external side effects.
        </p>
      </section>

      <section className="cc-card" data-testid="plan-approval-package" aria-labelledby="plan-appr-h">
        <h3 id="plan-appr-h">What you are approving</h3>
        <ul className="founder-approval-truth">
          <li>
            <strong>Approving:</strong> the deterministic plan package for this Founder Proof.
          </li>
          <li>
            <strong>Not approving:</strong> simulation start, live provider use, production
            deployment, or final proof completion.
          </li>
          <li>
            <strong>Next:</strong> a separate simulation approval step, then an explicit Start
            action.
          </li>
          <li>
            <strong>Provider called:</strong> No
          </li>
          <li>
            <strong>Simulation starts automatically:</strong> No
          </li>
          <li>
            <strong>Production deployment possible:</strong> No — blocked
          </li>
        </ul>
      </section>

      {awaitingPlan ? (
        <StickyFounderApprovalBar
          testId="sticky-plan-approval-bar"
          primaryLabel="Approve plan for deterministic simulation"
          primaryTestId="approve-plan-for-simulation"
          secondaryTestId="return-plan-for-changes"
          dangerTestId="reject-plan"
          onPrimary={() => setConfirm("approve")}
          secondaryLabel="Return for changes"
          onSecondary={() => setConfirm("return")}
          dangerLabel="Reject plan"
          onDanger={() => setConfirm("reject")}
          busy={busy}
          note="Approving the plan does not start simulation."
          confirmOpen={Boolean(confirm)}
          confirmTitle={
            confirm === "approve"
              ? "Approve plan for deterministic simulation?"
              : confirm === "reject"
                ? "Reject plan?"
                : "Return for changes?"
          }
          confirmBody={
            confirm === "approve" ? (
              <ul className="sticky-confirm-list">
                <li>This approves only the plan.</li>
                <li>Simulation will not start.</li>
                <li>Provider will not be called.</li>
                <li>Production deployment remains blocked.</li>
                <li>The next stage will be simulation approval.</li>
              </ul>
            ) : (
              <p>Provide a short reason. The canonical run is not deleted.</p>
            )
          }
          requireReason={confirm === "reject" || confirm === "return"}
          confirmReason={reason}
          onConfirmReasonChange={setReason}
          onConfirmYes={async () => {
            if (confirm === "approve") {
              await onApprove?.();
              setConfirm(null);
              return;
            }
            await submitDestructive();
          }}
          onConfirmNo={() => {
            setConfirm(null);
            setReason("");
          }}
        />
      ) : null}

      <details className="cc-card" data-testid="plan-technical-details">
        <summary>Technical details</summary>
        <p className="cc-muted">Machine values for audit — not required for Founder review.</p>
        <pre className="admin-pre">
          {JSON.stringify(
            {
              run_id: run.id,
              stage: run.current_stage,
              status: run.status,
              correlation_id: run.correlation_id,
              trace_id: run.trace_id,
              plan_id: run.planning_plan?.id,
              approval_package: run.approval_package,
            },
            null,
            2
          )}
        </pre>
      </details>
    </div>
  );
}
