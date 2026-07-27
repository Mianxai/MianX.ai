"use client";

import StatusChip from "./StatusChip";

export default function OpsStatusBar({ schedule, readiness, overview, refreshing }) {
  const pending = overview?.waitingApproval;
  return (
    <section className="cc-ops-bar" aria-label="System operational state">
      <div className="cc-ops-item">
        <span className="cc-ops-label">Worker</span>
        <span className="cc-ops-value">
          {schedule?.workerSecretConfigured ? "Configured" : "Not configured"}
        </span>
      </div>
      <div className="cc-ops-item">
        <span className="cc-ops-label">Scheduler</span>
        <span className="cc-ops-value">
          <code>{schedule?.mode || "manual"}</code>
        </span>
      </div>
      <div className="cc-ops-item">
        <span className="cc-ops-label">Automatic</span>
        <span className="cc-ops-value">
          {schedule?.automaticProcessing ? "Yes" : "No"}
        </span>
      </div>
      <div className="cc-ops-item">
        <span className="cc-ops-label">Provider</span>
        <span className="cc-ops-value">
          {readiness?.provider === "configured" ? "Configured" : "Not configured"}
        </span>
      </div>
      <div className="cc-ops-item">
        <span className="cc-ops-label">Approvals</span>
        <span className="cc-ops-value">
          {pending?.available ? pending.value : "Data unavailable"}
        </span>
      </div>
      <div className="cc-ops-item">
        <span className="cc-ops-label">Schema</span>
        <span className="cc-ops-value">
          jobs:{readiness?.runtime_jobs_schema || "unknown"} · mem:
          {readiness?.admin_membership_schema || "unknown"}
        </span>
      </div>
      {refreshing ? (
        <div className="cc-ops-item">
          <StatusChip status="waiting" />
          <span className="cc-ops-value">Refreshing…</span>
        </div>
      ) : null}
    </section>
  );
}
