"use client";

import { useMemo, useState } from "react";
import StickyFounderApprovalBar from "@/components/admin/StickyFounderApprovalBar";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  humanStageLabel,
  humanStatusLabel,
  humanExecutionModeLabel,
  statusTone,
  extractPlanTasks,
  extractProposedAgents,
  extractPlanDependencySummary,
  extractPlanRiskCards,
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

function taskDepLabel(dep) {
  if (!dep) return "None";
  if (Array.isArray(dep)) return dep.length ? dep.join(", ") : "None";
  return String(dep);
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
  const [confirm, setConfirm] = useState(null);
  const [reason, setReason] = useState("");
  const [expandedTasks, setExpandedTasks] = useState(() => new Set());
  const [expandAll, setExpandAll] = useState(false);

  const tasks = useMemo(() => (run ? extractPlanTasks(run) : []), [run]);
  const agents = useMemo(() => (run ? extractProposedAgents(run) : []), [run]);
  const depSummary = useMemo(
    () => (run ? extractPlanDependencySummary(run) : { count: 0, edges: [] }),
    [run]
  );
  const riskCards = useMemo(() => (run ? extractPlanRiskCards(run) : []), [run]);

  if (!run) return null;

  const stageLabel = humanStageLabel(run.current_stage);
  const statusLabel = humanStatusLabel(run.status, run.current_stage);
  const modeLabel = humanExecutionModeLabel(run.execution_mode);
  const departments = [
    ...new Set(tasks.map((t) => t.department).filter(Boolean)),
  ];
  const protectedActions =
    run.objective?.protected_actions ||
    run.approval_package?.protected_actions ||
    ["production_deployment"];
  const awaitingPlan = run.current_stage === "founder_approval_required";

  function isTaskOpen(id) {
    return expandAll || expandedTasks.has(id);
  }

  function toggleTask(id) {
    setExpandedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function setAllTasks(open) {
    setExpandAll(open);
    if (!open) setExpandedTasks(new Set());
    else setExpandedTasks(new Set(tasks.map((t) => t.id)));
  }

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
            <dd data-testid="plan-project-name">{projectName || "No project selected"}</dd>
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
            <strong data-testid="metric-tasks">{tasks.length || 0}</strong>
            <span>Proposed tasks</span>
          </li>
          <li>
            <strong data-testid="metric-departments">{departments.length || 0}</strong>
            <span>Departments</span>
          </li>
          <li>
            <strong data-testid="metric-agents">{agents.length || 0}</strong>
            <span>Proposed agents</span>
          </li>
          <li>
            <strong data-testid="metric-dependencies">{depSummary.count}</strong>
            <span>Task dependencies</span>
          </li>
          <li>
            <strong data-testid="metric-protected">{Array.isArray(protectedActions) ? protectedActions.length : 1}</strong>
            <span>Protected actions</span>
          </li>
          <li>
            <strong data-testid="metric-risks">{riskCards.length || 0}</strong>
            <span>Risks</span>
          </li>
        </ul>
        <div className="founder-dep-list" data-testid="plan-dependency-names">
          <h4>Dependencies</h4>
          <p data-testid="plan-dependency-count">
            {depSummary.count} task{" "}
            {depSummary.count === 1 ? "dependency" : "dependencies"}
          </p>
          {depSummary.edges?.length ? (
            <ul>
              {depSummary.edges.map((e, i) => (
                <li key={`${e.from}-${e.to}-${i}`}>
                  {e.from} → {e.to}
                  {e.implied ? " (sequential)" : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="cc-muted">No task-to-task dependencies.</p>
          )}
        </div>
      </section>

      <section className="cc-card" data-testid="plan-agents" aria-labelledby="plan-agents-h">
        <h3 id="plan-agents-h">Proposed agents</h3>
        {agents.length ? (
          <>
            <p className="cc-muted" data-testid="plan-agents-truth">
              Proposed roles for deterministic simulation. Agents are not allocated until
              simulation approval and start.
            </p>
            <ul className="founder-agent-list">
              {agents.map((a) => (
                <li key={a.slug || a.role} data-testid={`proposed-agent-${a.slug || a.role}`}>
                  <strong>{a.role}</strong>
                  {a.department ? <span> · {a.department}</span> : null}
                  <span className="cc-muted"> · proposed</span>
                  {a.reason ? (
                    <p className="founder-agent-reason" data-testid="agent-selection-reason">
                      Reason: {a.reason}
                    </p>
                  ) : null}
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
        <div className="founder-wbs-header">
          <h3 id="plan-wbs-h">Work breakdown</h3>
          {tasks.length ? (
            <div className="founder-wbs-controls">
              <button
                type="button"
                className="header-btn-ghost"
                data-testid="wbs-expand-all"
                onClick={() => setAllTasks(true)}
              >
                Expand all
              </button>
              <button
                type="button"
                className="header-btn-ghost"
                data-testid="wbs-collapse-all"
                onClick={() => setAllTasks(false)}
              >
                Collapse all
              </button>
            </div>
          ) : null}
        </div>
        {tasks.length ? (
          <ul className="founder-wbs-list">
            {tasks.map((t, idx) => {
              const open = isTaskOpen(t.id);
              return (
                <li key={t.id} className="founder-wbs-row" data-testid={`wbs-task-${t.id}`}>
                  <button
                    type="button"
                    className="founder-wbs-summary"
                    aria-expanded={open}
                    data-testid={`wbs-toggle-${t.id}`}
                    onClick={() => toggleTask(t.id)}
                  >
                    <span className="founder-wbs-num">{idx + 1}</span>
                    <span className="founder-wbs-title">{t.title}</span>
                    <span className="founder-wbs-meta">
                      {t.department}
                      {t.agent_role ? ` · ${t.agent_role}` : ""}
                    </span>
                    <span aria-hidden="true">{open ? "▾" : "▸"}</span>
                  </button>
                  {open ? (
                    <dl className="cc-detail-dl founder-wbs-detail">
                      <div>
                        <dt>Purpose</dt>
                        <dd>{t.purpose}</dd>
                      </div>
                      <div>
                        <dt>Proposed department</dt>
                        <dd data-testid={`wbs-dept-${t.id}`}>
                          {t.department}
                          {t.department_proposed ? (
                            <span className="cc-muted">
                              {" "}
                              · Runtime assignment: Occurs after simulation approval
                            </span>
                          ) : null}
                        </dd>
                      </div>
                      <div>
                        <dt>Proposed agent</dt>
                        <dd>{t.agent_role || "Assigned at simulation start"}</dd>
                      </div>
                      <div>
                        <dt>Dependencies</dt>
                        <dd>{taskDepLabel(t.dependency)}</dd>
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
                        <dt>Risk level</dt>
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
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="cc-muted">No WBS tasks available yet. Generate the plan first.</p>
        )}
      </section>

      <section className="cc-card" data-testid="plan-governance" aria-labelledby="plan-gov-h">
        <h3 id="plan-gov-h">Risk and governance</h3>
        <div className="founder-risk-grid" data-testid="plan-risk-cards">
          {(riskCards.length
            ? riskCards
            : [
                {
                  id: "default-sim",
                  title: "Deterministic simulation only",
                  severity: "low",
                  meaning: "This proof does not perform live AI execution.",
                  mitigation: "Approve the plan, then separately approve and start simulation.",
                },
              ]
          ).map((r) => (
            <article key={r.id} className="founder-risk-card" data-testid={`risk-card-${r.id}`}>
              <p>
                <span className="founder-risk-label">Risk</span>
                <strong>{r.title}</strong>
              </p>
              <p>
                <span className="founder-risk-label">Severity</span>
                {String(r.severity).replace(/_/g, " ")}
              </p>
              <p>
                <span className="founder-risk-label">Meaning</span>
                {r.meaning}
              </p>
              <p>
                <span className="founder-risk-label">Mitigation</span>
                {r.mitigation}
              </p>
            </article>
          ))}
        </div>

        <article className="founder-protected-card" data-testid="plan-protected-actions">
          <h4>Protected actions</h4>
          {(Array.isArray(protectedActions) ? protectedActions : [protectedActions]).map(
            (pa, i) => (
              <div key={i} className="founder-protected-row">
                <p>
                  <span className="founder-risk-label">Protected action</span>
                  <strong>
                    {typeof pa === "string"
                      ? pa.replace(/_/g, " ")
                      : pa?.name || pa?.action || "Protected action"}
                  </strong>
                </p>
                <p>
                  <span className="founder-risk-label">State</span>
                  Blocked
                </p>
                <p>
                  <span className="founder-risk-label">Reason</span>
                  Founder Proof simulation cannot mutate production.
                </p>
              </div>
            )
          )}
        </article>
        <p className="cc-muted">
          Security boundary: No provider calls. No production deployment. No external side
          effects.
        </p>
      </section>

      <section className="cc-card" data-testid="plan-approval-package" aria-labelledby="plan-appr-h">
        <h3 id="plan-appr-h">What you are approving</h3>
        <div className="founder-approval-summary">
          <div>
            <h4>You are approving</h4>
            <ul className="founder-approval-truth">
              <li>The deterministic plan package</li>
              <li>{tasks.length || 0} proposed simulation tasks</li>
              <li>Proposed department ownership</li>
              <li>Proposed simulation agent roles</li>
            </ul>
          </div>
          <div>
            <h4>You are not approving</h4>
            <ul className="founder-approval-truth">
              <li>Simulation start</li>
              <li>Live provider use</li>
              <li>Production deployment</li>
              <li>Final proof completion</li>
            </ul>
          </div>
          <div>
            <h4>Next</h4>
            <ul className="founder-approval-truth">
              <li>Separate simulation approval</li>
              <li>Explicit simulation start</li>
            </ul>
          </div>
        </div>
      </section>

      {awaitingPlan ? (
        <StickyFounderApprovalBar
          testId="sticky-plan-approval-bar"
          primaryLabel="Approve plan for deterministic simulation"
          primaryTestId="approve-plan-for-simulation"
          secondaryTestId="return-plan-for-changes"
          dangerTestId="reject-plan"
          onPrimary={() => setConfirm("approve")}
          secondaryLabel="Return for Changes"
          onSecondary={() => setConfirm("return")}
          dangerLabel="Reject Plan"
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
              dependency_summary: depSummary,
              risks_raw: run.approval_package?.risks || run.planning_plan?.risks,
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
