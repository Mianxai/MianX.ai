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
import { validateFounderPlanReadiness } from "@/lib/core/integration/plan-readiness.js";

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
    () => (run ? extractPlanDependencySummary(run) : { count: 0, edges: [], flow_labels: [] }),
    [run]
  );
  const riskCards = useMemo(() => (run ? extractPlanRiskCards(run) : []), [run]);
  const readiness = useMemo(
    () => (run ? validateFounderPlanReadiness(run) : null),
    [run]
  );

  if (!run) return null;

  const stageLabel = humanStageLabel(run.current_stage);
  const statusLabel = humanStatusLabel(run.status, run.current_stage);
  const modeLabel = humanExecutionModeLabel(run.execution_mode);
  const departments = [
    ...new Set(tasks.map((t) => t.department).filter(Boolean)),
  ];
  const protectedActions =
    run.approval_package?.protected_actions ||
    run.objective?.protected_actions ||
    ["production_deployment"];
  const awaitingPlan = run.current_stage === "founder_approval_required";
  const approveEnabled = readiness?.approve_enabled !== false;

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

      {readiness ? (
        <section
          className={`cc-card founder-plan-readiness is-${readiness.status}`}
          data-testid="plan-readiness"
          aria-labelledby="plan-readiness-h"
        >
          <div className="founder-plan-readiness-header">
            <h3 id="plan-readiness-h">Plan readiness</h3>
            <span
              className={`founder-readiness-badge is-${readiness.status}`}
              data-testid="plan-readiness-status"
              aria-label={`Plan readiness: ${readiness.status}`}
            >
              {String(readiness.status).toUpperCase()}
            </span>
          </div>
          {readiness.reasons?.length ? (
            <div data-testid="plan-readiness-reasons">
              <h4>Blocking reasons</h4>
              <ul className="founder-readiness-list">
                {readiness.reasons.map((r, i) => (
                  <li key={`reason-${i}`}>{r}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {readiness.warnings?.length ? (
            <div data-testid="plan-readiness-warnings">
              <h4>Warnings</h4>
              <ul className="founder-readiness-list">
                {readiness.warnings.map((w, i) => (
                  <li key={`warn-${i}`}>{w}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {readiness.recommended_corrections?.length ? (
            <div data-testid="plan-readiness-corrections">
              <h4>Recommended corrections</h4>
              <ul className="founder-readiness-list">
                {readiness.recommended_corrections.map((c, i) => (
                  <li key={`corr-${i}`}>{c}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {!readiness.reasons?.length && !readiness.warnings?.length ? (
            <p className="cc-muted" data-testid="plan-readiness-ok">
              Plan is ready for Founder approval. Approving still does not deploy, call a
              provider, or start simulation.
            </p>
          ) : null}
        </section>
      ) : null}

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
          {Array.isArray(depSummary.flow_labels) && depSummary.flow_labels.length > 0 ? (
            <p className="founder-dep-flow" data-testid="plan-dependency-flow">
              Flow: {depSummary.flow_labels.join(" → ")}
            </p>
          ) : null}
          {depSummary.edges?.length ? (
            <ul className="founder-dep-edges">
              {depSummary.edges.map((e, i) => (
                <li key={`${e.from}-${e.to}-${i}`} data-testid={`dep-edge-${i}`}>
                  <span className="founder-dep-edge-label">
                    {e.from_label || e.from} → {e.to_label || e.to}
                  </span>
                  {e.implied ? (
                    <span className="cc-muted"> (sequential)</span>
                  ) : null}
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
            <ul className="founder-agent-list founder-agent-cards">
              {agents.map((a) => (
                <li
                  key={a.slug || a.role}
                  className="founder-agent-card"
                  data-testid={`proposed-agent-${a.slug || a.role}`}
                >
                  <div className="founder-agent-card-title">
                    <strong>{a.role}</strong>
                    {a.department ? (
                      <span className="founder-dept-badge">{a.department}</span>
                    ) : null}
                    <span className="cc-muted">proposed</span>
                  </div>
                  {a.reason ? (
                    <p className="founder-agent-reason" data-testid="agent-selection-reason">
                      {a.reason}
                    </p>
                  ) : (
                    <p className="cc-muted founder-agent-reason">No selection reason recorded.</p>
                  )}
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
                      <span className="founder-dept-badge" data-testid={`wbs-dept-badge-${t.id}`}>
                        {t.department}
                      </span>
                      {t.supporting_department ? (
                        <span
                          className="founder-dept-badge is-supporting"
                          data-testid={`wbs-supporting-dept-${t.id}`}
                        >
                          Supporting: {t.supporting_department}
                        </span>
                      ) : null}
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
                          <span className="founder-dept-badge">{t.department}</span>
                          {t.department_reason ? (
                            <span className="cc-muted"> · {t.department_reason}</span>
                          ) : null}
                          {t.department_proposed ? (
                            <span className="cc-muted">
                              {" "}
                              · Runtime assignment: Occurs after simulation approval
                            </span>
                          ) : null}
                        </dd>
                      </div>
                      {t.supporting_department ? (
                        <div>
                          <dt>Supporting department</dt>
                          <dd>
                            <span className="founder-dept-badge is-supporting">
                              {t.supporting_department}
                            </span>
                          </dd>
                        </div>
                      ) : null}
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
                  effect_on_approval:
                    "Informational — does not auto-approve or start simulation.",
                  blocks_deterministic_simulation: false,
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
              <p>
                <span className="founder-risk-label">Effect on approval</span>
                {r.effect_on_approval || "Informational for Founder review."}
              </p>
              <p>
                <span className="founder-risk-label">Blocks deterministic simulation</span>
                {r.blocks_deterministic_simulation ? "Yes" : "No"}
              </p>
            </article>
          ))}
        </div>

        <article className="founder-protected-card" data-testid="plan-protected-actions">
          <h4>Protected actions</h4>
          <p className="cc-muted" data-testid="plan-protected-copy">
            Approving this plan does not deploy, call a provider, or start simulation.
            <code> production_deployment </code>
            remains blocked.
          </p>
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
          primaryDisabled={!approveEnabled}
          onPrimary={() => {
            if (!approveEnabled) return;
            setConfirm("approve");
          }}
          secondaryLabel="Return for Changes"
          onSecondary={() => setConfirm("return")}
          dangerLabel="Reject Plan"
          onDanger={() => setConfirm("reject")}
          busy={busy}
          note={
            approveEnabled
              ? "Approving the plan does not start simulation, call a provider, or deploy. Simulation does not start until a separate Founder action."
              : "Approve is disabled until plan readiness blockers are resolved."
          }
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
              <div className="sticky-confirm-readiness" data-testid="approve-confirm-body">
                <div>
                  <h4>Will happen</h4>
                  <ul className="sticky-confirm-list">
                    {(readiness?.will_happen_on_approve || []).map((item, i) => (
                      <li key={`will-${i}`}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Will not happen</h4>
                  <ul className="sticky-confirm-list">
                    {(readiness?.will_not_happen_on_approve || []).map((item, i) => (
                      <li key={`wont-${i}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p>
                Provide a short reason before confirming. The canonical run is not deleted.
                {confirm === "reject" ? " Rejecting archives this plan decision." : ""}
              </p>
            )
          }
          requireReason={confirm === "reject" || confirm === "return"}
          confirmReason={reason}
          onConfirmReasonChange={setReason}
          onConfirmYes={async () => {
            if (confirm === "approve") {
              if (!approveEnabled) return;
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
              dependency_raw_ids: (depSummary.edges || []).map((e) => ({
                from: e.from,
                to: e.to,
                kind: e.kind,
                implied: e.implied || false,
              })),
              risks_raw: run.approval_package?.risks || run.planning_plan?.risks,
              readiness,
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
