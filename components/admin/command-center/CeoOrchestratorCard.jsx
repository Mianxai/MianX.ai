"use client";

import Link from "next/link";
import StatusChip from "./StatusChip";

/**
 * Prominent CEO / Executive Orchestrator command node.
 * Real data only — Data unavailable when missing.
 */
export default function CeoOrchestratorCard({ agent, brief, projectId }) {
  const status = agent?.status || "idle";
  const live = agent?.live || {};

  const activeStreams = brief?.activeObjectives?.length;
  const blocked = brief?.blockedObjectives?.length;
  const pending = brief?.pendingApprovals?.length;
  const completed = brief?.recentCompleted?.[0] || null;
  const activeTitle =
    brief?.activeObjectives?.[0]?.title ||
    brief?.activeObjectives?.[0]?.workflow ||
    null;

  const projectLabel = projectId
    ? live.projectId || projectId
    : "All projects — select a project for live scope";

  const objectiveEmpty = projectId
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
        <StatusChip status={status} />
      </div>
      <dl className="cc-ceo-grid">
        <div>
          <dt>Selected project</dt>
          <dd>{projectLabel}</dd>
        </div>
        <div>
          <dt>Active objective</dt>
          <dd>{activeTitle || objectiveEmpty}</dd>
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
      <div className="cc-link-row">
        <Link
          href={
            projectId
              ? `/admin/objectives?project_id=${encodeURIComponent(projectId)}`
              : "/admin/objectives"
          }
        >
          Objectives
        </Link>
        <Link href="/admin/ceo-brief">CEO Brief</Link>
        <Link href="/admin/inbox">Founder Inbox</Link>
        <Link href="/admin/runtime/approvals">Approvals</Link>
        {!projectId ? <Link href="/admin/projects">Projects</Link> : null}
      </div>
    </section>
  );
}
