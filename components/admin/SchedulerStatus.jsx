"use client";

import { mapSchedulerStatus } from "@/lib/core/scheduler-status";

/**
 * Canonical Founder-facing scheduler status card/chip.
 */
export default function SchedulerStatus({
  scheduler = null,
  lastTickAt = null,
  compact = false,
  onRefresh = null,
  className = "",
}) {
  const mapped = mapSchedulerStatus({
    scheduler: scheduler || {},
    lastTickAt: lastTickAt || scheduler?.lastTickAt || scheduler?.last_tick_at,
  });

  if (compact) {
    return (
      <span
        className={`scheduler-status-chip is-${mapped.health} ${className}`.trim()}
        data-testid="scheduler-status"
        data-health={mapped.health}
        title={mapped.detail}
      >
        Scheduler: {mapped.label}
        {mapped.ageLabel ? ` · ${mapped.ageLabel}` : ""}
      </span>
    );
  }

  return (
    <section
      className={`scheduler-status-card cc-card ${className}`.trim()}
      data-testid="scheduler-status"
      data-health={mapped.health}
      aria-labelledby="scheduler-status-h"
    >
      <div className="scheduler-status-header">
        <h3 id="scheduler-status-h">Scheduler</h3>
        <span className={`status-pill is-${mapped.health}`}>{mapped.label}</span>
      </div>
      <p className="cc-muted">{mapped.detail}</p>
      <dl className="cc-detail-dl founder-plan-grid">
        <div>
          <dt>Mode</dt>
          <dd>{mapped.mode}</dd>
        </div>
        <div>
          <dt>Platform</dt>
          <dd>{mapped.platform}</dd>
        </div>
        <div>
          <dt>Last tick</dt>
          <dd>
            {mapped.lastTickAt
              ? `${mapped.lastTickAt}${mapped.ageLabel ? ` (${mapped.ageLabel} ago)` : ""}`
              : "None observed"}
          </dd>
        </div>
        <div>
          <dt>Expected interval</dt>
          <dd>~{mapped.expectedIntervalSec}s</dd>
        </div>
        <div>
          <dt>Last claimed / succeeded / failed</dt>
          <dd>
            {mapped.lastClaimed ?? "—"} / {mapped.lastSucceeded ?? "—"} /{" "}
            {mapped.lastFailed ?? "—"}
          </dd>
        </div>
      </dl>
      {onRefresh ? (
        <button type="button" className="header-btn-ghost" onClick={onRefresh}>
          Refresh status
        </button>
      ) : null}
    </section>
  );
}
