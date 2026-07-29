/**
 * Canonical scheduler health mapping for Founder surfaces.
 */

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
    input.automaticProcessing === true;
  const paused = scheduler.paused === true || scheduler.mode === "paused";
  const platform =
    scheduler.platform || input.platform || "external_scheduler_required";
  const expectedIntervalSec =
    Number(scheduler.expectedIntervalSec || scheduler.interval_sec || 60) || 60;
  const claimed = scheduler.lastClaimed ?? input.lastClaimed ?? null;
  const succeeded = scheduler.lastSucceeded ?? input.lastSucceeded ?? null;
  const failed = scheduler.lastFailed ?? input.lastFailed ?? null;

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
  } else if (!automatic && !lastTick && !scheduler.mode && !input.mode) {
    health = "unavailable";
    label = "Unavailable";
    detail = "Scheduler telemetry has not been reported yet.";
  } else if (!automatic && !lastTick) {
    health = "manual";
    label = "Manual";
    detail =
      "Automatic processing is not configured. Use Admin Queue → Run tick or npm run runtime:tick.";
  } else if (lastTick && ageMs != null) {
    const staleMs = expectedIntervalSec * 1000 * 3;
    const delayedMs = expectedIntervalSec * 1000 * 1.5;
    if (ageMs > staleMs) {
      health = "stale";
      label = "Stale";
      detail = `Last tick was ${formatRelativeAge(ageMs)} ago — scheduler may be delayed.`;
    } else if (ageMs > delayedMs) {
      health = "delayed";
      label = "Delayed / Warning";
      detail = `Last tick was ${formatRelativeAge(ageMs)} ago (expected ~${expectedIntervalSec}s).`;
    } else {
      health = "healthy";
      label = automatic ? "Automatic · Healthy" : "Manual · Recent tick";
      detail = `Last tick ${formatRelativeAge(ageMs)} ago.`;
    }
  } else if (automatic) {
    health = "warning";
    label = "Warning";
    detail = "Automatic mode is set but no successful tick has been observed yet.";
  }

  return {
    health,
    label,
    detail,
    mode: paused ? "paused" : automatic ? "automatic" : "manual",
    platform,
    lastTickAt: lastTick,
    ageMs,
    ageLabel: ageMs != null ? formatRelativeAge(ageMs) : null,
    expectedIntervalSec,
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
