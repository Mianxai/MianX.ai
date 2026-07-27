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

  return (
    <section className="cc-ceo-card" aria-labelledby="cc-ceo-title">
      <div className="cc-ceo-card-top">
        <div>
          <p className="cc-eyebrow">Founder authority → Executive layer</p>
          <h2 id="cc-ceo-title">Executive CEO / Orchestrator</h2>
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
          <dt>Current project</dt>
          <dd>
            {projectId
              ? live.projectId || projectId
              : "All projects — select a project for live scope"}
          </dd>
        </div>
        <div>
          <dt>Current objective</dt>
          <dd>
            {brief?.activeObjectives?.[0]?.title ||
              brief?.activeObjectives?.[0]?.workflow ||
              "No activity yet"}
          </dd>
        </div>
        <div>
          <dt>Active workstreams</dt>
          <dd>
            {typeof activeStreams === "number" ? activeStreams : "Data unavailable"}
          </dd>
        </div>
        <div>
          <dt>Blocked workstreams</dt>
          <dd>{typeof blocked === "number" ? blocked : "Data unavailable"}</dd>
        </div>
        <div>
          <dt>Pending approvals</dt>
          <dd>{typeof pending === "number" ? pending : "Data unavailable"}</dd>
        </div>
        <div>
          <dt>Recent completed</dt>
          <dd>{completed?.title || "No activity yet"}</dd>
        </div>
      </dl>
      <div className="cc-link-row">
        <Link href="/admin/objectives">Objectives</Link>
        <Link href="/admin/ceo-brief">CEO Brief</Link>
        <Link href="/admin/runtime/approvals">Approvals</Link>
      </div>
    </section>
  );
}
