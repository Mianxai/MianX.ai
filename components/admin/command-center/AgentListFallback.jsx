"use client";

import Link from "next/link";
import StatusChip from "./StatusChip";
import EmptyState from "@/components/admin/EmptyState";

export default function AgentListFallback({ agents, selectedSlug, onSelect }) {
  return (
    <section className="cc-card" aria-labelledby="cc-list-h">
      <h2 id="cc-list-h">Agents</h2>
      <p className="cc-muted">
        Semantic list equivalent of the network view (required for accessibility and
        mobile).
      </p>
      {!agents?.length ? (
        <EmptyState
          title="No agents in view"
          reason="No executable agents match the current department filter. Capacity-planning slots are not shown as live agents."
          nextAction="Select All departments or another department in the rail."
          configuration="Open Agents or Departments for the full catalog."
          cta={
            <Link className="header-btn-ghost" href="/admin/agents">
              Open Agents
            </Link>
          }
        />
      ) : (
      <ul className="cc-agent-list">
        {agents.map((a) => (
          <li key={a.slug}>
            <button
              type="button"
              className={`cc-agent-card cc-status-${a.status}${
                selectedSlug === a.slug ? " selected" : ""
              }`}
              onClick={() => onSelect?.(a.slug)}
              aria-pressed={selectedSlug === a.slug}
            >
              <span className="cc-agent-card-top">
                <strong>{a.name}</strong>
                <StatusChip status={a.status} />
              </span>
              <span className="cc-agent-meta">
                {a.department}
                {a.hierarchyLevel ? ` · ${a.hierarchyLevel}` : ""} ·{" "}
                {a.workforceSlug || a.slug}
              </span>
              <span className="cc-agent-meta">
                {a.live?.projectId
                  ? `Project ${a.live.projectId.slice(0, 8)}…`
                  : "No project instance"}
                {a.live?.currentWorkflow
                  ? ` · ${a.live.currentWorkflow}`
                  : " · No active workflow"}
              </span>
            </button>
          </li>
        ))}
      </ul>
      )}
    </section>
  );
}
