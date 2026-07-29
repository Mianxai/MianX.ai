/**
 * Canonical scheduler health mapping for Founder surfaces.
 *
 * GitHub Actions schedule (every 5 minutes) is a *target* cadence. Delivery is
 * approximate and may skip under platform load — thresholds use grace windows.
 */

function resolveExpectedIntervalSec(scheduler = {}, input = {}) {
  const ms =
    scheduler.expectedIntervalMs ??
    input.expectedIntervalMs ??
    null;
  if (ms != null && Number.isFinite(Number(ms)) && Number(ms) > 0) {
    return Math.max(1, Math.round(Number(ms) / 1000));
  }
  const sec =
    scheduler.expectedIntervalSec ??
    scheduler.interval_sec ??
    input.expectedIntervalSec ??
    null;
  if (sec != null && Number.isFinite(Number(sec)) && Number(sec) > 0) {
    return Number(sec);
  }
  const platform = scheduler.platform || input.platform || null;
  if (platform === "github_actions") return 300;
  return 60;
}

export function formatExpectedCadence(sec) {
  const n = Number(sec);
  if (!Number.isFinite(n) || n <= 0) return "unknown";
  if (n < 60) return `Every ~${Math.round(n)}s`;
  const min = Math.round(n / 60);
  if (min < 60) {
    return min === 1 ? "Every minute" : `Every ${min} minutes`;
  }
  const hr = Math.round(min / 60);
  return hr === 1 ? "Every hour" : `Every ${hr} hours`;
}

function formatExpectedInDetail(sec) {
  const n = Number(sec);
  if (!Number.isFinite(n) || n <= 0) return "unknown interval";
  if (n === 60) return "~60s";
  if (n < 60) return `~${Math.round(n)}s`;
  const min = Math.round(n / 60);
  if (min < 60) return min === 1 ? "~1 minute" : `~${min} minutes`;
  const hr = Math.round(min / 60);
  return hr === 1 ? "~1 hour" : `~${hr} hours`;
}

/**
 * Thresholds in multiples of expected interval:
 * - Healthy: age ≤ 2× (grace for GH Actions jitter)
 * - Delayed: age ≤ 6×
 * - Stale/Critical: age > 6×
 */
export function schedulerThresholdMs(expectedIntervalSec) {
  const base = Math.max(1, Number(expectedIntervalSec) || 300) * 1000;
  return {
    healthyMs: base * 2,
    delayedMs: base * 6,
  };
}

function parseTickTs(lastTick) {
  if (!lastTick) return { ageMs: null, invalid: false, future: false };
  const t = Date.parse(lastTick);
  if (Number.isNaN(t)) return { ageMs: null, invalid: true, future: false };
  const ageMs = Date.now() - t;
  if (ageMs < -60_000) return { ageMs, invalid: false, future: true };
  return { ageMs: Math.max(0, ageMs), invalid: false, future: false };
}

export function mapSchedulerStatus(input = {}) {
  const scheduler = input.scheduler || input || {};
  const lastTick =
    scheduler.lastTickAt ||
    scheduler.last_tick_at ||
    scheduler.lastSuccessfulTickAt ||
    input.lastTickAt ||
    input.lastSchedulerTick ||
    null;
  const lastFailedAt =
    scheduler.lastFailedAt ||
    input.lastFailedAt ||
    null;
  const automatic =
    scheduler.automaticProcessing === true ||
    scheduler.mode === "automatic" ||
    scheduler.mode === "warning" ||
    input.automaticProcessing === true;
  const paused = scheduler.paused === true || scheduler.mode === "paused";
  const platform =
    scheduler.platform || input.platform || "external_scheduler_required";
  const mode = scheduler.mode || input.mode || null;
  const expectedIntervalSec = resolveExpectedIntervalSec(scheduler, input);
  const { healthyMs, delayedMs } = schedulerThresholdMs(expectedIntervalSec);
  const claimed = scheduler.lastClaimed ?? input.lastClaimed ?? null;
  const succeeded = scheduler.lastSucceeded ?? input.lastSucceeded ?? null;
  const failed = scheduler.lastFailed ?? input.lastFailed ?? null;
  const needsConfiguration =
    mode === "external_scheduler_required" ||
    mode === "unconfigured" ||
    mode === "manual" ||
    (scheduler.automaticProcessing === false &&
      !paused &&
      !lastTick &&
      (scheduler.workerSecretConfigured === false ||
        scheduler.platformCronConfigured === false ||
        !scheduler.platform));

  const { ageMs, invalid, future } = parseTickTs(lastTick);

  let health = "unavailable";
  let label = "Unavailable";
  let detail = "Scheduler telemetry has not been reported yet.";
  let recommendation =
    "Open Schedule → Advanced diagnostics, or check GitHub Actions → Runtime tick.";

  if (paused) {
    health = "paused";
    label = "Paused";
    detail = "Automatic processing is paused. Manual Run tick remains an advanced diagnostic.";
    recommendation = "Resume the scheduler only when automatic draining should continue.";
  } else if (needsConfiguration && !lastTick) {
    health = "configuration_required";
    label = "Configuration Required";
    detail =
      scheduler.founderGuidance ||
      "Scheduler secrets or platform activation are not fully configured.";
    recommendation =
      "Configure GitHub secrets and set RUNTIME_SCHEDULER_ACTIVE=1 only after a verified tick.";
  } else if (!automatic && !lastTick && !mode) {
    health = "unavailable";
    label = "Unavailable";
    detail = "Scheduler telemetry has not been reported yet.";
  } else if (!automatic && !lastTick) {
    health = "configuration_required";
    label = "Configuration Required";
    detail =
      "Automatic processing is not configured. Use Advanced Diagnostics → Run tick if needed.";
    recommendation = "Enable GitHub Actions Runtime tick, then activate after a verified run.";
  } else if (invalid) {
    health = "stale";
    label = "Stale";
    detail = "Last tick timestamp is invalid and cannot be used for health.";
    recommendation = "Check GitHub Actions Runtime tick logs for the latest successful run.";
  } else if (future) {
    health = "delayed";
    label = "Delayed";
    detail = "Last tick timestamp is in the future — clock skew or bad telemetry.";
    recommendation = "Ignore this reading until the next successful tick arrives.";
  } else if (lastTick && ageMs != null) {
    if (ageMs > delayedMs) {
      health = "stale";
      label = "Stale";
      detail = `Last successful tick was ${formatRelativeAge(ageMs)} ago (target ${formatExpectedInDetail(expectedIntervalSec)}). GitHub schedule delivery is approximate and may skip under load.`;
      recommendation =
        "Open GitHub Actions → Runtime tick. Confirm scheduled runs are firing, then use Advanced Diagnostics only if needed.";
    } else if (ageMs > healthyMs) {
      health = "delayed";
      label = "Delayed";
      detail = `Last tick was ${formatRelativeAge(ageMs)} ago (target ${formatExpectedInDetail(expectedIntervalSec)}). Within delayed grace — not yet critical.`;
      recommendation =
        "Wait for the next scheduled run, or inspect GitHub Actions if this persists past one hour.";
    } else {
      health = "healthy";
      label = "Healthy";
      detail = `Last tick ${formatRelativeAge(ageMs)} ago (target ${formatExpectedCadence(expectedIntervalSec)}).`;
      recommendation = "No action required. Queue drains automatically when jobs are present.";
    }
  } else if (automatic) {
    health = "delayed";
    label = "Delayed";
    detail =
      "Automatic mode is set but no successful tick has been observed yet. Cron configured ≠ healthy.";
    recommendation =
      "Dispatch Runtime tick once from GitHub Actions, confirm HTTP 200, then monitor Schedule.";
  }

  if (lastFailedAt && !paused) {
    const failAge = parseTickTs(lastFailedAt).ageMs;
    if (
      failAge != null &&
      (ageMs == null || failAge < ageMs) &&
      health !== "configuration_required"
    ) {
      detail = `${detail} Last failed tick was ${formatRelativeAge(failAge)} ago.`;
    }
  }

  return {
    health,
    label,
    detail,
    recommendation,
    mode: paused
      ? "paused"
      : automatic
        ? "automatic"
        : needsConfiguration
          ? "configuration_required"
          : "manual",
    platform,
    lastTickAt: lastTick,
    ageMs: invalid || future ? null : ageMs,
    ageLabel: ageMs != null && !invalid && !future ? formatRelativeAge(ageMs) : null,
    expectedIntervalSec,
    expectedCadenceLabel: formatExpectedCadence(expectedIntervalSec),
    thresholds: { healthyMs, delayedMs },
    lastClaimed: claimed,
    lastSucceeded: succeeded,
    lastFailed: failed,
    lastFailedAt,
    fabricated: false,
    githubActionsApproximate: platform === "github_actions",
  };
}

export function formatRelativeAge(ms) {
  if (ms == null || Number.isNaN(ms)) return "unknown";
  const sec = Math.max(0, Math.round(ms / 1000));
  if (sec < 60) return `${sec}s`;
  const min = Math.round(sec / 60);
  if (min < 60) return `${min}m`;
  const hr = Math.round(min / 60);
  if (hr < 48) return `${hr}h`;
  return `${Math.round(hr / 24)}d`;
}
