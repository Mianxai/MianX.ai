"use client";

import StatusChip from "./StatusChip";

export default function AgentListFallback({ agents, selectedSlug, onSelect }) {
  return (
    <section className="cc-card" aria-labelledby="cc-list-h">
      <h2 id="cc-list-h">Agents</h2>
      <p className="cc-muted">
        Semantic list equivalent of the network view (required for accessibility and
        mobile).
      </p>
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
    </section>
  );
}
