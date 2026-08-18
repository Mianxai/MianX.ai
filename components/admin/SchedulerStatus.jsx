"use client";

import { mapSchedulerStatus } from "@/lib/core/scheduler-status";
import { buildDurableSchedulerViewModel } from "@/lib/core/scheduler-view-model";

/**
 * Canonical Founder-facing scheduler status card/chip.
 * When useDurableHealth is set (Phase I.9), derive health from the durable
 * view model so GitHub Actions alone cannot mark primary Healthy.
 */
export default function SchedulerStatus({
  scheduler = null,
  lastTickAt = null,
  compact = false,
  onRefresh = null,
  className = "",
  showRecommendation = true,
  useDurableHealth = false,
}) {
  const mapped = mapSchedulerStatus({
    scheduler: scheduler || {},
    lastTickAt: lastTickAt || scheduler?.lastTickAt || scheduler?.last_tick_at,
  });

  const preferDurable =
    Boolean(scheduler) &&
    (useDurableHealth ||
      scheduler.schedulerHealth != null ||
      scheduler.primaryScheduler === "supabase_cron");

  const durableVm = preferDurable
    ? buildDurableSchedulerViewModel({
        lastTick:
          scheduler.recentWorkerProcessing ||
          (scheduler.lastSuccessAt ||
          scheduler.lastAttemptAt ||
          lastTickAt ||
          scheduler.lastTickAt
            ? {
                at:
                  scheduler.lastSuccessAt ||
                  lastTickAt ||
                  scheduler.lastTickAt ||
                  null,
                lastSuccessAt: scheduler.lastSuccessAt || lastTickAt || scheduler.lastTickAt,
                lastAttemptAt: scheduler.lastAttemptAt || null,
                lastFailureAt: scheduler.lastFailureAt || null,
                source: scheduler.schedulerSource || scheduler.source || null,
                claimed: scheduler.claimed ?? scheduler.lastClaimed ?? null,
                succeeded: scheduler.succeeded ?? scheduler.lastSucceeded ?? null,
                failed: scheduler.failed ?? scheduler.lastFailed ?? null,
                latestHttpStatus: scheduler.latestHttpStatus ?? null,
                consecutiveFailures: scheduler.consecutiveFailures ?? 0,
              }
            : null),
        cronMeta: scheduler.cronMeta || {
          vaultConfigured: scheduler.vaultConfigured,
          vaultUrlPresent: scheduler.vaultConfigured,
          vaultSecretPresent: scheduler.vaultConfigured,
          jobScheduled: scheduler.jobScheduled,
          jobActive: scheduler.jobActive,
          configuredCadenceMs: scheduler.configuredCadenceMs,
        },
        configScheduler: scheduler,
      })
    : null;

  const health = durableVm?.schedulerHealth || mapped.health;
  const label = durableVm?.label || mapped.label;
  const detail = durableVm?.detail || mapped.detail;
  const recommendation = durableVm?.recommendation || mapped.recommendation;
  const ageLabel = durableVm?.ageLabel || mapped.ageLabel;
  const lastTickDisplay =
    (durableVm && (durableVm.lastSuccessAt || mapped.lastTickAt)) || mapped.lastTickAt;
  const expectedCadenceLabel =
    durableVm?.expectedCadenceLabel || mapped.expectedCadenceLabel;
  const platform =
    durableVm?.primaryScheduler ||
    scheduler?.primaryScheduler ||
    mapped.platform;

  if (compact) {
    return (
      <span
        className={`scheduler-status-chip is-${health} ${className}`.trim()}
        data-testid="scheduler-status"
        data-health={health}
        title={detail}
      >
        Scheduler: {label}
        {ageLabel ? ` · ${ageLabel}` : ""}
      </span>
    );
  }

  return (
    <section
      className={`scheduler-status-card cc-card ${className}`.trim()}
      data-testid="scheduler-status"
      data-health={health}
      aria-labelledby="scheduler-status-h"
    >
      <div className="scheduler-status-header">
        <h3 id="scheduler-status-h">Scheduler</h3>
        <span className={`status-pill is-${health}`}>{label}</span>
      </div>
      <p className="cc-muted">{detail}</p>
      {showRecommendation && recommendation ? (
        <p className="scheduler-recommendation" data-testid="scheduler-recommendation">
          <strong>Recommendation:</strong> {recommendation}
        </p>
      ) : null}
      <dl className="cc-detail-dl founder-plan-grid">
        <div>
          <dt>Target cadence</dt>
          <dd data-testid="scheduler-expected-interval">
            {expectedCadenceLabel ||
              (mapped.expectedIntervalSec >= 60
                ? `Every ${Math.round(mapped.expectedIntervalSec / 60)} minutes`
                : `~${mapped.expectedIntervalSec}s`)}
          </dd>
        </div>
        <div>
          <dt>Primary platform</dt>
          <dd>{platform}</dd>
        </div>
        <div>
          <dt>Last successful tick</dt>
          <dd data-testid="scheduler-last-tick">
            {lastTickDisplay
              ? `${lastTickDisplay}${ageLabel ? ` (${ageLabel} ago)` : ""}`
              : "None observed"}
          </dd>
        </div>
        <div>
          <dt>Relative age</dt>
          <dd>{ageLabel || "—"}</dd>
        </div>
        <div>
          <dt>Last claimed / succeeded / failed</dt>
          <dd data-testid="scheduler-counters">
            {durableVm?.claimed ?? mapped.lastClaimed ?? scheduler?.claimed ?? "—"} /{" "}
            {durableVm?.succeeded ?? mapped.lastSucceeded ?? scheduler?.succeeded ?? "—"} /{" "}
            {durableVm?.failed ?? mapped.lastFailed ?? scheduler?.failed ?? "—"}
          </dd>
        </div>
        <div>
          <dt>Successful no-op</dt>
          <dd data-testid="scheduler-noop">
            {durableVm?.noOp || scheduler?.noOp
              ? "Yes — empty queue is success"
              : "No / not applicable"}
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
