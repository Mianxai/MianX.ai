"use client";

export default function DepartmentRail({ departments, active, onSelect }) {
  return (
    <nav className="cc-dept-rail" aria-label="Departments">
      <button
        type="button"
        className={!active || active === "all" ? "active" : ""}
        onClick={() => onSelect?.("all")}
      >
        All departments
      </button>
      <ul>
        {(departments || []).map((d) => (
          <li key={d.slug}>
            <button
              type="button"
              className={active === d.slug ? "active" : ""}
              onClick={() => onSelect?.(d.slug)}
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
    </nav>
  );
}
