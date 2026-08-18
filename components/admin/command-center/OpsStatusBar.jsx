"use client";

import StatusChip from "./StatusChip";
import StatusBadge, { schedulerTone } from "@/components/admin/StatusBadge";
import ProviderSetupChip from "@/components/admin/ProviderSetupChip";

export default function OpsStatusBar({
  schedule,
  readiness,
  overview,
  refreshing,
  provider,
  rateLimit,
  agentInventory,
}) {
  const pending = overview?.waitingApproval;
  const queued = overview?.queuedJobs;
  const running = overview?.runningJobs;
  const schedTone = schedulerTone(schedule?.mode, schedule?.automaticProcessing);
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
          <StatusBadge tone={schedTone}>{schedule?.mode || "manual"}</StatusBadge>
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
          <ProviderSetupChip
            providerStatus={provider?.status || readiness?.provider}
          />
          {(provider?.status || readiness?.provider) !== "unconfigured" ? (
            <code>{provider?.status || readiness?.provider}</code>
          ) : null}
        </span>
      </div>
      <div className="cc-ops-item">
        <span className="cc-ops-label">Circuit</span>
        <span className="cc-ops-value">
          <code>{provider?.circuit || readiness?.provider_circuit || "closed"}</code>
        </span>
      </div>
      <div className="cc-ops-item">
        <span className="cc-ops-label">Rate limit</span>
        <span className="cc-ops-value">
          {rateLimit?.durable ? "durable" : rateLimit?.backend || "in-memory"}
          {rateLimit?.active ? " · active" : " · inactive"}
        </span>
      </div>
      <div className="cc-ops-item">
        <span className="cc-ops-label">Jobs</span>
        <span className="cc-ops-value">
          q:
          {queued?.available ? queued.value : "—"} · run:
          {running?.available ? running.value : "—"}
        </span>
      </div>
      <div className="cc-ops-item">
        <span className="cc-ops-label">Agents</span>
        <span className="cc-ops-value">
          work:{agentInventory?.working ?? "—"} · idle:
          {agentInventory?.idle ?? "—"} · routable:
          {agentInventory?.routable ?? "—"}
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
          {readiness?.memory_entries_schema || "unknown"} · learn:
          {readiness?.learning_candidates_schema || "unknown"}
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
