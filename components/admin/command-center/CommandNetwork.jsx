"use client";

import StatusChip from "./StatusChip";
import {
  partitionNetworkAgents,
  selectVisibleNetworkAgents,
} from "@/lib/core/command-center/visible-agents";

/**
 * Compact specialist / C-suite card for the Agent Network.
 */
export function SpecialistAgentCard({ agent, selected, onSelect }) {
  if (!agent) return null;
  const role =
    agent.hierarchyLevel === "L2"
      ? "Department lead"
      : agent.purpose
        ? agent.purpose.slice(0, 72) + (agent.purpose.length > 72 ? "…" : "")
        : agent.workforceSlug || agent.slug;

  return (
    <button
      type="button"
      className={`cc-spec-card cc-status-${agent.status || "idle"}${
        selected ? " selected" : ""
      }${agent.status === "working" ? " is-working" : ""}`}
      onClick={() => onSelect?.(agent.slug)}
      aria-pressed={selected}
      aria-label={`${agent.name}, ${agent.status || "idle"}`}
    >
      <span className="cc-spec-card-top">
        <strong className="cc-spec-name">{agent.name}</strong>
        <StatusChip status={agent.status || "idle"} />
      </span>
      <span className="cc-spec-role">{role}</span>
      <span className="cc-spec-meta">
        <span className="cc-spec-dept">{agent.department || "—"}</span>
        {agent.live?.currentWorkflow ? (
          <span> · {agent.live.currentWorkflow}</span>
        ) : agent.live?.projectId ? (
          <span> · project scoped</span>
        ) : (
          <span> · No activity yet</span>
        )}
      </span>
    </button>
  );
}

/**
 * Premium HTML hierarchy: Founder → CEO → C-Suite → Specialists.
 * Progressive disclosure — never dumps full capacity slots.
 * Connections follow real reporting relationships only.
 */
export default function CommandNetwork({
  hierarchy,
  agents,
  selectedSlug,
  onSelect,
  department = "all",
}) {
  const visible = selectVisibleNetworkAgents(agents, {
    department,
    maxSpecialists: department && department !== "all" ? 48 : 10,
  });
  const { ceo, cSuite, specialists } = partitionNetworkAgents(visible);
  const ceoStatus = ceo?.status || "idle";
  const hidden =
    Math.max(0, (agents?.length || 0) - visible.length);

  const edgeHint =
    department && department !== "all"
      ? `Department drill-down: ${department}`
      : "Company view: CEO + C-suite + active/priority specialists";

  return (
    <section className="cc-card cc-network" aria-labelledby="cc-network-h">
      <div className="cc-network-head">
        <h2 id="cc-network-h">Agent network</h2>
        <p className="cc-muted cc-network-hint">
          {edgeHint}. Lines and cards follow real reporting edges only.
          {hidden > 0
            ? ` Showing ${visible.length} of ${agents.length} executable agents — open a department to drill down.`
            : null}
        </p>
      </div>

      <ul className="cc-hierarchy" aria-label="Company hierarchy">
        <li className="cc-hierarchy-tier">
          <div className="cc-founder-node" aria-label="Founder, human authority">
            <span className="cc-founder-badge">Founder</span>
            <span className="cc-founder-sub">Human authority</span>
          </div>
        </li>

        <li className="cc-hierarchy-link" aria-hidden="true">
          <span className="cc-hierarchy-line" />
        </li>

        <li className="cc-hierarchy-tier">
          <button
            type="button"
            className={`cc-ceo-node cc-status-${ceoStatus}${
              selectedSlug === "executive-ceo" ? " selected" : ""
            }${ceoStatus === "working" ? " is-working" : ""}`}
            onClick={() => onSelect?.("executive-ceo")}
            aria-pressed={selectedSlug === "executive-ceo"}
            aria-label={`Executive CEO / Orchestrator, ${ceoStatus}`}
          >
            <span className="cc-eyebrow">Command layer</span>
            <span className="cc-ceo-node-title">
              {hierarchy?.orchestrator?.label || "Executive Orchestrator / CEO"}
            </span>
            <span className="cc-ceo-node-meta">
              {ceo?.purpose
                ? ceo.purpose.slice(0, 120) + (ceo.purpose.length > 120 ? "…" : "")
                : "Data unavailable"}
            </span>
            <StatusChip status={ceoStatus} />
          </button>
        </li>

        {cSuite.length > 0 ? (
          <>
            <li className="cc-hierarchy-link cc-hierarchy-link-branch" aria-hidden="true">
              <span className="cc-hierarchy-line" />
            </li>
            <li className="cc-hierarchy-tier">
              <h3 className="cc-hierarchy-label">C-Suite / department leads</h3>
              <ul className="cc-spec-grid cc-spec-grid-csuite">
                {cSuite.map((agent) => (
                  <li key={agent.slug}>
                    <SpecialistAgentCard
                      agent={agent}
                      selected={selectedSlug === agent.slug}
                      onSelect={onSelect}
                    />
                  </li>
                ))}
              </ul>
            </li>
          </>
        ) : null}

        {specialists.length > 0 ? (
          <>
            <li className="cc-hierarchy-link cc-hierarchy-link-branch" aria-hidden="true">
              <span className="cc-hierarchy-line" />
            </li>
            <li className="cc-hierarchy-tier">
              <h3 className="cc-hierarchy-label">Specialist agents</h3>
              <ul className="cc-spec-grid">
                {specialists.map((agent) => (
                  <li key={agent.slug}>
                    <SpecialistAgentCard
                      agent={agent}
                      selected={selectedSlug === agent.slug}
                      onSelect={onSelect}
                    />
                  </li>
                ))}
              </ul>
            </li>
          </>
        ) : (
          <li className="cc-muted" style={{ textAlign: "center", marginTop: "0.75rem", listStyle: "none" }}>
            {department && department !== "all"
              ? "No specialist agents in this department."
              : "No activity yet — select a department to explore the catalog."}
          </li>
        )}
      </ul>
    </section>
  );
}
