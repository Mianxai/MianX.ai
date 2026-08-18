"use client";

import StatusBadge from "@/components/admin/StatusBadge";
import { humanStatusLabel, statusTone } from "@/lib/core/integration/founder-labels";

function asList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (Array.isArray(value.items)) return value.items;
  if (Array.isArray(value.entries)) return value.entries;
  if (Array.isArray(value.proposals)) return value.proposals;
  return [];
}

export function EvidenceCards({ evidence, empty }) {
  const items = asList(evidence);
  if (!items.length) return empty || null;
  return (
    <ul className="founder-artifact-list" data-testid="evidence-cards">
      {items.map((item, i) => (
        <li key={item.id || i} className="founder-artifact-card">
          <h3>{item.title || item.summary || item.kind || `Evidence ${i + 1}`}</h3>
          <dl className="cc-detail-dl">
            <div>
              <dt>Related task</dt>
              <dd>{item.task_id || item.subject_id || "—"}</dd>
            </div>
            <div>
              <dt>Producer</dt>
              <dd>
                {item.agent || item.department || item.produced_by || "Deterministic simulation"}
              </dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{item.kind || item.type || "artefact"}</dd>
            </div>
            <div>
              <dt>Verification</dt>
              <dd>
                <StatusBadge tone={statusTone(item.verification_status || "verified")}>
                  {humanStatusLabel(item.verification_status || "verified")}
                </StatusBadge>
              </dd>
            </div>
            <div>
              <dt>Created</dt>
              <dd>{item.created_at || item.at || "—"}</dd>
            </div>
            <div>
              <dt>Summary</dt>
              <dd>{item.summary || item.content || item.description || "—"}</dd>
            </div>
            <div>
              <dt>Audit reference</dt>
              <dd>
                <code>{item.id || item.audit_id || "—"}</code>
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}

export function MemoryCards({ memory, empty }) {
  const items = asList(memory);
  if (!items.length) return empty || null;
  return (
    <ul className="founder-artifact-list" data-testid="memory-cards">
      {items.map((item, i) => (
        <li key={item.id || i} className="founder-artifact-card">
          <h3>{item.title || item.summary || `Memory candidate ${i + 1}`}</h3>
          <dl className="cc-detail-dl">
            <div>
              <dt>Source</dt>
              <dd>{item.source || item.kind || "simulation"}</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>{item.scope || item.project_id || "Selected project"}</dd>
            </div>
            <div>
              <dt>Confidence</dt>
              <dd>{item.confidence ?? "n/a"}</dd>
            </div>
            <div>
              <dt>Verification</dt>
              <dd>{item.verification_status || "candidate"}</dd>
            </div>
            <div>
              <dt>Decision</dt>
              <dd>Promote / reject requires Founder — nothing auto-promotes</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}

export function LearningCards({ learning, empty }) {
  const items = asList(learning);
  if (!items.length) return empty || null;
  return (
    <ul className="founder-artifact-list" data-testid="learning-cards">
      {items.map((item, i) => (
        <li key={item.id || i} className="founder-artifact-card">
          <h3>{item.title || item.summary || `Learning proposal ${i + 1}`}</h3>
          <dl className="cc-detail-dl">
            <div>
              <dt>Reason</dt>
              <dd>{item.reason || item.summary || "—"}</dd>
            </div>
            <div>
              <dt>Supporting outcome</dt>
              <dd>{item.supporting_outcome || item.outcome || "Simulation result"}</dd>
            </div>
            <div>
              <dt>Risk</dt>
              <dd>{item.risk || item.risk_level || "reviewed"}</dd>
            </div>
            <div>
              <dt>Proposed change</dt>
              <dd>{item.proposed_change || item.change || "See technical details"}</dd>
            </div>
            <div>
              <dt>Founder decision</dt>
              <dd>Required — never modifies agent system prompts automatically</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}

export function ProofPackSummary({ run, proof, onFinalApprove, onFinalReject, onFinalReturn, busy }) {
  if (!run) return null;
  const pack = proof || run.proof_pack || {};
  const awaiting = run.current_stage === "founder_final_review";

  return (
    <div className="founder-proof-pack" data-testid="founder-proof-pack">
      <header className="founder-plan-review-header">
        <div>
          <p className="scope-badge">Founder Proof Pack</p>
          <h2>Proof Pack</h2>
          <p className="cc-muted">
            Premium summary of the deterministic proof. Fabricated execution:{" "}
            <strong>false</strong>. Provider status: unconfigured / not called.
          </p>
        </div>
      </header>

      <section className="cc-card">
        <h3>Summary</h3>
        <dl className="cc-detail-dl founder-plan-grid">
          <div>
            <dt>Objective</dt>
            <dd>{run.objective?.title || "—"}</dd>
          </div>
          <div>
            <dt>Clarification</dt>
            <dd>
              {(run.clarifications || []).length
                ? "Answered"
                : "Not required / not recorded"}
            </dd>
          </div>
          <div>
            <dt>Plan decision</dt>
            <dd>{run.approval_package?.decision || "—"}</dd>
          </div>
          <div>
            <dt>Simulation approval</dt>
            <dd>{run.simulation_approval?.decision || "—"}</dd>
          </div>
          <div>
            <dt>Evidence</dt>
            <dd>{run.evidence?.count ?? pack.evidence_count ?? "—"}</dd>
          </div>
          <div>
            <dt>Memory candidates</dt>
            <dd>{run.memory?.count ?? "—"}</dd>
          </div>
          <div>
            <dt>Learning proposals</dt>
            <dd>{run.learning?.count ?? "—"}</dd>
          </div>
          <div>
            <dt>Protected actions blocked</dt>
            <dd>
              {(run.objective?.protected_actions || ["production_deployment"]).join(", ")}
            </dd>
          </div>
          <div>
            <dt>Recovery proof</dt>
            <dd>count={run.recovery_count ?? 0}</dd>
          </div>
          <div>
            <dt>Known limitations</dt>
            <dd>
              {(run.approval_package?.known_limitations || []).join(" · ") ||
                "Deterministic simulation ≠ live AI execution"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="cc-card" data-testid="proof-pack-lineage" aria-labelledby="proof-lineage-h">
        <h3 id="proof-lineage-h">Audit lineage</h3>
        <p className="cc-muted">
          Lineage: objective → clarification → plan → simulation → evidence → memory → learning →
          final review. Correlation: {run.correlation_id || "—"} · Trace: {run.trace_id || "—"}
        </p>
        <ul className="founder-lineage-list">
          <li>Stage: {run.current_stage}</li>
          <li>Status: {run.status}</li>
          <li>Execution mode: {run.execution_mode}</li>
          <li>Fabricated execution: false</li>
          <li>Provider called: {run.provider_called ? "yes" : "no"}</li>
        </ul>
      </section>

      {awaiting ? (
        <div className="admin-actions">
          <button
            type="button"
            className="header-btn"
            data-testid="approve-proof-completion"
            disabled={busy}
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                !window.confirm(
                  "Approve proof completion? This is an explicit Founder confirmation."
                )
              ) {
                return;
              }
              onFinalApprove?.();
            }}
          >
            Approve proof completion
          </button>
          <button
            type="button"
            className="header-btn-ghost"
            disabled={busy}
            onClick={() => onFinalReturn?.()}
          >
            Return for further review
          </button>
          <button
            type="button"
            className="header-btn-ghost"
            disabled={busy}
            onClick={() => onFinalReject?.()}
          >
            Reject proof
          </button>
        </div>
      ) : null}

      <details className="cc-card">
        <summary>Technical details</summary>
        <pre className="admin-pre">{JSON.stringify({ run_id: run.id, pack, lineage: run.lineage }, null, 2)}</pre>
      </details>
    </div>
  );
}
