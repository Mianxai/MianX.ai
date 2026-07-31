"use client";

import { useState } from "react";
import SchedulerStatus from "@/components/admin/SchedulerStatus";

export default function SchedulePanel({ schedule, readiness, provider, rateLimit }) {
  const [confirmTick, setConfirmTick] = useState(false);
  const [tickBusy, setTickBusy] = useState(false);
  const [tickMsg, setTickMsg] = useState("");

  if (!schedule) return null;
  const tick = schedule.recentWorkerProcessing;
  const durable = schedule.durable || schedule;

  async function runDiagnosticTick() {
    setTickBusy(true);
    setTickMsg("");
    try {
      const res = await fetch("/api/admin/runtime/tick", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ max_jobs: 5, diagnostic: true }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setTickMsg(data?.error?.message || `Tick failed (${res.status})`);
      } else {
        setTickMsg(
          `Diagnostic tick ok — claimed ${data?.tick?.claimed ?? "—"}, succeeded ${data?.tick?.succeeded ?? "—"}, failed ${data?.tick?.failed ?? "—"}. Source: manual_diagnostic.`
        );
      }
    } catch (err) {
      setTickMsg(err?.message || "Tick request failed");
    } finally {
      setTickBusy(false);
      setConfirmTick(false);
    }
  }

  return (
    <section className="cc-card" aria-labelledby="cc-sched-h" data-testid="schedule-panel">
      <h2 id="cc-sched-h">Schedule</h2>
      <p className="cc-muted">
        Primary scheduler is Supabase Cron (<code>mianx-runtime-tick-5m</code>, every 5 minutes).
        GitHub Actions is diagnostic fallback only — not the reliable primary.
        Zero claimed/succeeded/failed is a successful no-op, not a failure. No fake countdown.
      </p>
      <dl className="cc-kv-grid" data-testid="scheduler-primary-summary">
        <div>
          <dt>Primary scheduler</dt>
          <dd data-testid="scheduler-primary">Supabase Cron</dd>
        </div>
        <div>
          <dt>Fallback / diagnostic</dt>
          <dd data-testid="scheduler-fallback">GitHub Actions (workflow_dispatch)</dd>
        </div>
        <div>
          <dt>Canonical job</dt>
          <dd data-testid="scheduler-job-name">
            {durable.schedulerJobName || schedule.schedulerJobName || "mianx-runtime-tick-5m"}
          </dd>
        </div>
        <div>
          <dt>Latest source</dt>
          <dd data-testid="scheduler-source">
            {durable.schedulerSource || schedule.schedulerSource || "legacy_or_unknown"}
          </dd>
        </div>
      </dl>
      <SchedulerStatus
        scheduler={{
          ...schedule,
          ...durable,
          lastTickAt:
            durable.lastSuccessAt ||
            schedule.lastTick ||
            schedule.lastTickAt ||
            null,
          lastClaimed: tick?.claimed ?? schedule.lastClaimed ?? durable.claimed,
          lastSucceeded: tick?.succeeded ?? schedule.lastSucceeded ?? durable.succeeded,
          lastFailed: tick?.failed ?? schedule.lastFailed ?? durable.failed,
        }}
        useDurableHealth
      />

      <details className="cc-card scheduler-advanced" data-testid="scheduler-advanced-diagnostics">
        <summary>Advanced Scheduler Diagnostics</summary>
        <p className="cc-muted">
          Manual tick is an advanced diagnostic only. Prefer Supabase Cron after cutover.
          Vault secret values are never shown.
        </p>
        <dl className="cc-detail-dl">
          <div>
            <dt>Worker secret configured (host)</dt>
            <dd>{schedule.workerSecretConfigured ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt>Vault configured (DB)</dt>
            <dd data-testid="scheduler-vault-configured">
              {durable.vaultConfigured == null
                ? "Unknown (RPC unavailable)"
                : durable.vaultConfigured
                  ? "Yes"
                  : "No — Setup required"}
            </dd>
          </div>
          <div>
            <dt>Cron job scheduled</dt>
            <dd data-testid="scheduler-job-scheduled">
              {durable.jobScheduled == null
                ? "Unknown"
                : durable.jobScheduled
                  ? durable.jobActive
                    ? "Yes (active)"
                    : "Yes (inactive)"
                  : "No"}
            </dd>
          </div>
          <div>
            <dt>Tick endpoint</dt>
            <dd>
              <code>{schedule.tickEndpoint || "/api/internal/runtime/tick"}</code>
            </dd>
          </div>
          <div>
            <dt>Latest HTTP status</dt>
            <dd data-testid="scheduler-http-status">
              {durable.latestHttpStatus ?? "—"}
            </dd>
          </div>
          <div>
            <dt>Last attempt / success / failure</dt>
            <dd data-testid="scheduler-attempt-times">
              {durable.lastAttemptAt || "—"} / {durable.lastSuccessAt || "—"} /{" "}
              {durable.lastFailureAt || "—"}
            </dd>
          </div>
          <div>
            <dt>Provider (informational)</dt>
            <dd>{provider?.status || readiness?.provider || "unconfigured"}</dd>
          </div>
          <div>
            <dt>Rate limit backend</dt>
            <dd>{rateLimit?.backend || rateLimit?.mode || "in-memory"}</dd>
          </div>
        </dl>

        {!confirmTick ? (
          <button
            type="button"
            className="header-btn-ghost"
            data-testid="scheduler-open-manual-tick"
            onClick={() => setConfirmTick(true)}
          >
            Manual diagnostic tick…
          </button>
        ) : (
          <div className="scheduler-tick-confirm" data-testid="scheduler-manual-tick-confirm">
            <p>
              Run one bounded diagnostic tick now? This does not approve the Founder Proof plan or
              start simulation.
            </p>
            <div className="cc-link-row">
              <button
                type="button"
                className="header-btn"
                disabled={tickBusy}
                data-testid="scheduler-confirm-manual-tick"
                onClick={runDiagnosticTick}
              >
                {tickBusy ? "Running…" : "Confirm diagnostic tick"}
              </button>
              <button
                type="button"
                className="header-btn-ghost"
                disabled={tickBusy}
                onClick={() => setConfirmTick(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {tickMsg ? (
          <p className="cc-muted" role="status" data-testid="scheduler-tick-msg">
            {tickMsg}
          </p>
        ) : null}
      </details>
    </section>
  );
}
