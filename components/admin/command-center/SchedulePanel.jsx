"use client";

import { useState } from "react";
import SchedulerStatus from "@/components/admin/SchedulerStatus";

export default function SchedulePanel({ schedule, readiness, provider, rateLimit }) {
  const [confirmTick, setConfirmTick] = useState(false);
  const [tickBusy, setTickBusy] = useState(false);
  const [tickMsg, setTickMsg] = useState("");

  if (!schedule) return null;
  const tick = schedule.recentWorkerProcessing;

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
          `Diagnostic tick ok — claimed ${data?.tick?.claimed ?? "—"}, succeeded ${data?.tick?.succeeded ?? "—"}, failed ${data?.tick?.failed ?? "—"}.`
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
        Target cadence is every 5 minutes via GitHub Actions. Delivery is approximate — Delayed
        or Stale means ticks are overdue relative to that target, not that cron is unset.
      </p>
      <SchedulerStatus
        scheduler={{
          ...schedule,
          lastTickAt: schedule.lastTick || schedule.lastTickAt || null,
          lastClaimed: tick?.claimed ?? schedule.lastClaimed,
          lastSucceeded: tick?.succeeded ?? schedule.lastSucceeded,
          lastFailed: tick?.failed ?? schedule.lastFailed,
        }}
      />

      <details className="cc-card scheduler-advanced" data-testid="scheduler-advanced-diagnostics">
        <summary>Advanced Scheduler Diagnostics</summary>
        <p className="cc-muted">
          Manual tick is an advanced diagnostic only — not the primary Founder workflow. Prefer
          reviewing GitHub Actions → Runtime tick when Delayed or Stale.
        </p>
        <dl className="cc-detail-dl">
          <div>
            <dt>Worker secret configured</dt>
            <dd>{schedule.workerSecretConfigured ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt>Platform cron declared</dt>
            <dd>{schedule.platformCronConfigured ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt>Tick endpoint</dt>
            <dd>
              <code>{schedule.tickEndpoint || "/api/internal/runtime/tick"}</code>
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
          <div>
            <dt>Check GitHub Actions</dt>
            <dd>
              Repository → Actions → workflow &quot;Runtime tick&quot;. Confirm scheduled runs
              succeed with HTTP 200.
            </dd>
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
          <p className="cc-muted" role="status" data-testid="scheduler-tick-message">
            {tickMsg}
          </p>
        ) : null}
      </details>
    </section>
  );
}
