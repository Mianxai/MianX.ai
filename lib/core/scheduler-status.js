/**
 * Canonical scheduler health mapping for Founder surfaces.
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

export function mapSchedulerStatus(input = {}) {
  const scheduler = input.scheduler || input || {};
  const lastTick =
    scheduler.lastTickAt ||
    scheduler.last_tick_at ||
    scheduler.lastSuccessfulTickAt ||
    input.lastTickAt ||
    input.lastSchedulerTick ||
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

  let ageMs = null;
  if (lastTick) {
    const t = Date.parse(lastTick);
    if (!Number.isNaN(t)) ageMs = Date.now() - t;
  }

  let health = "unavailable";
  let label = "Unavailable";
  let detail = "Scheduler telemetry has not been reported yet.";

  if (paused) {
    health = "paused";
    label = "Paused";
    detail = "Automatic processing is paused. Manual Run tick remains available.";
  } else if (needsConfiguration && !lastTick) {
    health = "configuration_required";
    label = "Configuration Required";
    detail =
      scheduler.founderGuidance ||
      "Scheduler secrets or platform activation are not fully configured.";
  } else if (!automatic && !lastTick && !mode) {
    health = "unavailable";
    label = "Unavailable";
    detail = "Scheduler telemetry has not been reported yet.";
  } else if (!automatic && !lastTick) {
    health = "configuration_required";
    label = "Configuration Required";
    detail =
      "Automatic processing is not configured. Use Admin Queue → Run tick or npm run runtime:tick.";
  } else if (lastTick && ageMs != null) {
    const delayedHardMs = expectedIntervalSec * 1000 * 3;
    const delayedMs = expectedIntervalSec * 1000 * 1.5;
    if (ageMs > delayedHardMs || ageMs > delayedMs) {
      health = "delayed";
      label = "Delayed";
      detail = `Last tick was ${formatRelativeAge(ageMs)} ago (expected ${formatExpectedInDetail(expectedIntervalSec)}).`;
    } else {
      health = "healthy";
      label = "Healthy";
      detail = `Last tick ${formatRelativeAge(ageMs)} ago.`;
    }
  } else if (automatic) {
    health = "delayed";
    label = "Delayed";
    detail = "Automatic mode is set but no successful tick has been observed yet.";
  }

  return {
    health,
    label,
    detail,
    mode: paused ? "paused" : automatic ? "automatic" : needsConfiguration ? "configuration_required" : "manual",
    platform,
    lastTickAt: lastTick,
    ageMs,
    ageLabel: ageMs != null ? formatRelativeAge(ageMs) : null,
    expectedIntervalSec,
    expectedCadenceLabel: formatExpectedCadence(expectedIntervalSec),
    lastClaimed: claimed,
    lastSucceeded: succeeded,
    lastFailed: failed,
    fabricated: false,
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
