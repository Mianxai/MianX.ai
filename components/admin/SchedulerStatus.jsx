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
  showRecommendation = true,
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
      {showRecommendation && mapped.recommendation ? (
        <p className="scheduler-recommendation" data-testid="scheduler-recommendation">
          <strong>Recommendation:</strong> {mapped.recommendation}
        </p>
      ) : null}
      <dl className="cc-detail-dl founder-plan-grid">
        <div>
          <dt>Target cadence</dt>
          <dd data-testid="scheduler-expected-interval">
            {mapped.expectedCadenceLabel ||
              (mapped.expectedIntervalSec >= 60
                ? `Every ${Math.round(mapped.expectedIntervalSec / 60)} minutes`
                : `~${mapped.expectedIntervalSec}s`)}
            {mapped.githubActionsApproximate ? (
              <span className="cc-muted"> · approximate GitHub delivery</span>
            ) : null}
          </dd>
        </div>
        <div>
          <dt>Platform</dt>
          <dd>{mapped.platform}</dd>
        </div>
        <div>
          <dt>Last successful tick</dt>
          <dd data-testid="scheduler-last-tick">
            {mapped.lastTickAt
              ? `${mapped.lastTickAt}${mapped.ageLabel ? ` (${mapped.ageLabel} ago)` : ""}`
              : "None observed"}
          </dd>
        </div>
        <div>
          <dt>Relative age</dt>
          <dd>{mapped.ageLabel || "—"}</dd>
        </div>
        <div>
          <dt>Last claimed / succeeded / failed</dt>
          <dd data-testid="scheduler-counters">
            {mapped.lastClaimed ?? "—"} / {mapped.lastSucceeded ?? "—"} /{" "}
            {mapped.lastFailed ?? "—"}
          </dd>
        </div>
        <div>
          <dt>Mode</dt>
          <dd>{mapped.mode}</dd>
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
