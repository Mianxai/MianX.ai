"use client";

import StatusChip from "./StatusChip";

/**
 * Left department + agent rail.
 * Departments filter the network; when a department is selected, agents
 * in that department appear for quick jump.
 */
export default function DepartmentRail({
  departments,
  agents = [],
  active,
  selectedSlug,
  onSelectDepartment,
  onSelectAgent,
}) {
  const deptAgents =
    active && active !== "all"
      ? (agents || []).filter((a) => a.department === active)
      : [];

  return (
    <nav className="cc-dept-rail" aria-label="Departments and agents">
      <p className="cc-rail-heading">Departments</p>
      <button
        type="button"
        className={!active || active === "all" ? "active" : ""}
        onClick={() => onSelectDepartment?.("all")}
      >
        Company overview
      </button>
      <ul className="cc-dept-list">
        {(departments || []).map((d) => (
          <li key={d.slug}>
            <button
              type="button"
              className={active === d.slug ? "active" : ""}
              onClick={() => onSelectDepartment?.(d.slug)}
            >
              <span className="cc-dept-name">{d.name}</span>
              <span className="cc-dept-count" title="Executable agents in catalog">
                {d.agentCount}
              </span>
              {d.activeInstances > 0 ? (
                <span className="cc-dept-live">{d.activeInstances} live</span>
              ) : null}
              {d.approvalState === "approval_required" ? (
                <span className="cc-dept-flag">Approval</span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      {active && active !== "all" ? (
        <div className="cc-rail-agents">
          <p className="cc-rail-heading">Agents in department</p>
          {deptAgents.length === 0 ? (
            <p className="cc-muted">No agents in this department.</p>
          ) : (
            <ul className="cc-rail-agent-list">
              {deptAgents.map((a) => (
                <li key={a.slug}>
                  <button
                    type="button"
                    className={`cc-rail-agent${
                      selectedSlug === a.slug ? " active" : ""
                    }`}
                    onClick={() => onSelectAgent?.(a.slug)}
                    aria-pressed={selectedSlug === a.slug}
                  >
                    <span className="cc-rail-agent-text">
                      <strong>{a.name}</strong>
                      <span className="cc-muted">
                        {a.hierarchyLevel || a.workforceSlug || a.slug}
                      </span>
                    </span>
                    <StatusChip status={a.status || "idle"} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className="cc-muted cc-rail-hint">
          Select a department to list agents for quick jump.
        </p>
      )}
    </nav>
  );
}
