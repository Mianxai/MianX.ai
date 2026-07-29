"use client";

import Link from "next/link";
import StatusChip from "./StatusChip";

/**
 * Prominent CEO / Executive Orchestrator command node.
 * Real data only — Data unavailable when missing.
 */
export default function CeoOrchestratorCard({ agent, brief, projectId, opsSummary = null }) {
  const status = agent?.status || "idle";
  const live = agent?.live || {};

  const activeStreams = brief?.activeObjectives?.length;
  const blocked = brief?.blockedObjectives?.length;
  const pending = brief?.pendingApprovals?.length;
  const completed = brief?.recentCompleted?.[0] || null;
  const proof = opsSummary?.canonical_integration_run;
  const proofObjective =
    opsSummary?.objectives?.find((o) => o.is_canonical || o.source_type === "integration_proof") ||
    brief?.activeObjectives?.[0] ||
    null;
  const activeTitle =
    proofObjective?.title ||
    brief?.activeObjectives?.[0]?.title ||
    brief?.activeObjectives?.[0]?.workflow ||
    null;

  const projectLabel = projectId
    ? live.projectId || projectId
    : "All projects — select a project for live scope";

  let waitingLabel = null;
  if (projectId && proof) {
    const stage = String(proof.stage || proof.proof_status || "");
    if (stage.includes("clarification")) {
      waitingLabel = "Waiting for Founder clarification";
    } else if (stage.includes("simulation") || stage.includes("founder_approval_required")) {
      waitingLabel = "Waiting for simulation approval";
    } else if (stage.includes("approval") || stage.includes("plan")) {
      waitingLabel = "Waiting for plan approval";
    } else if (opsSummary?.next_founder_action?.severity === "action_required") {
      waitingLabel = opsSummary.next_founder_action.label;
    }
  }

  const objectiveEmpty = waitingLabel
    ? waitingLabel
    : projectId
      ? "None active — issue an objective for this project"
      : "None active — select a project, then open Objectives";
  const completedEmpty = projectId
    ? "None recorded for this project yet"
    : "None recorded — select a project for scoped history";

  return (
    <section className="cc-ceo-card" aria-labelledby="cc-ceo-title">
      <div className="cc-ceo-card-top">
        <div>
          <p className="cc-eyebrow">Command layer · reports to Founder</p>
          <h2 id="cc-ceo-title">
            {agent?.name || "Executive CEO / Orchestrator"}
          </h2>
          <p className="cc-muted">
            {agent?.purpose
              ? agent.purpose.slice(0, 160) + (agent.purpose.length > 160 ? "…" : "")
              : "Data unavailable"}
          </p>
        </div>
        <StatusChip status={waitingLabel ? "waiting" : status} />
      </div>
      <dl className="cc-ceo-grid">
        <div>
          <dt>Selected project</dt>
          <dd>{projectLabel}</dd>
        </div>
        <div>
          <dt>Active objective</dt>
          <dd data-testid="ceo-orchestrator-objective">
            {activeTitle || objectiveEmpty}
            {waitingLabel && activeTitle ? (
              <span className="cc-muted"> · {waitingLabel}</span>
            ) : null}
          </dd>
        </div>
        <div>
          <dt>Current proof stage</dt>
          <dd>{proof?.stage_label || proof?.stage || "—"}</dd>
        </div>
        <div>
          <dt>Delegated workstreams</dt>
          <dd>
            {typeof activeStreams === "number" ? activeStreams : "Data unavailable"}
          </dd>
        </div>
        <div>
          <dt>Blockers</dt>
          <dd>{typeof blocked === "number" ? blocked : "Data unavailable"}</dd>
        </div>
        <div>
          <dt>Pending Founder approvals</dt>
          <dd>{typeof pending === "number" ? pending : "Data unavailable"}</dd>
        </div>
        <div>
          <dt>Latest completed</dt>
          <dd>{completed?.title || completedEmpty}</dd>
        </div>
      </dl>
      <p className="cc-muted" data-testid="agent-inventory-clarity">
        Executable agents: 36 · Catalogue: 43 · Future capacity slots: 445 (not live processes).
        Idle before simulation approval is expected.
      </p>
      <div className="cc-link-row">
        <Link
          href={
            projectId
              ? `/admin/objectives?project_id=${encodeURIComponent(projectId)}`
              : "/admin/objectives"
          }
          className="header-btn-ghost"
        >
          Objectives
        </Link>
        <Link
          href={
            projectId
              ? `/admin/integration?project_id=${encodeURIComponent(projectId)}`
              : "/admin/integration"
          }
          className="header-btn"
        >
          Founder Proof
        </Link>
      </div>
    </section>
  );
}
