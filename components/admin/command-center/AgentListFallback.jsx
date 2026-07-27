"use client";

const STATUS_LABEL = {
  working: "Working",
  idle: "Idle",
  waiting: "Waiting",
  blocked: "Blocked",
  approval_required: "Approval required",
  failed: "Failed",
  paused: "Paused",
};

export default function AgentListFallback({ agents, selectedSlug, onSelect }) {
  return (
    <section className="cc-card" aria-labelledby="cc-list-h">
      <h2 id="cc-list-h">Agents</h2>
      <p className="cc-muted">
        Semantic list equivalent of the network view (required for accessibility and mobile).
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
                <span className={`cc-status-pill cc-status-${a.status}`}>
                  <span className="cc-status-dot" aria-hidden="true" />
                  {STATUS_LABEL[a.status] || a.status}
                </span>
              </span>
              <span className="cc-agent-meta">
                {a.department} · {a.workforceSlug || a.slug}
                {a.hierarchyLevel ? ` · ${a.hierarchyLevel}` : ""}
              </span>
              <span className="cc-agent-meta">
                {a.live?.currentWorkflow
                  ? `Workflow: ${a.live.currentWorkflow}`
                  : "No active workflow"}
                {a.live?.lastRunStatus ? ` · last run ${a.live.lastRunStatus}` : ""}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
