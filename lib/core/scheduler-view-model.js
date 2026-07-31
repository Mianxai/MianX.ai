/**
 * Canonical durable scheduler view model — single source for Schedule,
 * Command Center, Founder Home schedule chips, Runtime, and /api/core/health.
 *
 * Primary: supabase_cron. Fallback/diagnostic: github_actions.
 * Healthy requires a recent successful *primary* (supabase_cron) tick.
 */

import { SCHEDULER_EXPECTED_INTERVAL_MS } from "./scheduler-cadence";
import {
  formatExpectedCadence,
  formatRelativeAge,
  schedulerThresholdMs,
} from "./scheduler-status";

export const SCHEDULER_SOURCES = Object.freeze([
  "supabase_cron",
  "github_actions",
  "manual_diagnostic",
  "never_run",
  "legacy_or_unknown",
]);

export const SCHEDULER_HEALTH = Object.freeze([
  "setup_required",
  "never_run",
  "healthy",
  "delayed",
  "stale",
  "failing",
]);

export const CANONICAL_CRON_JOB_NAME = "mianx-runtime-tick-5m";
export const CANONICAL_CRON_EXPRESSION = "*/5 * * * *";
export const VAULT_TICK_URL_NAME = "mianx_runtime_tick_url";
export const VAULT_TICK_SECRET_NAME = "mianx_runtime_tick_secret";

export function normalizeSchedulerSource(raw) {
  if (raw == null || raw === "") return "legacy_or_unknown";
  const s = String(raw).trim().toLowerCase();
  if (SCHEDULER_SOURCES.includes(s)) return s;
  if (s === "github" || s === "gha") return "github_actions";
  if (s === "supabase" || s === "pg_cron" || s === "cron") return "supabase_cron";
  if (s === "manual" || s === "diagnostic" || s === "admin") return "manual_diagnostic";
  return "legacy_or_unknown";
}

function parseTs(value) {
  if (!value) return null;
  const t = Date.parse(value);
  return Number.isNaN(t) ? null : t;
}

/**
 * @param {{
 *   lastTick?: object|null,
 *   cronMeta?: object|null,
 *   configScheduler?: object|null,
 *   now?: number,
 * }} input
 */
export function buildDurableSchedulerViewModel(input = {}) {
  const now = input.now ?? Date.now();
  const tick = input.lastTick && typeof input.lastTick === "object" ? input.lastTick : null;
  const cron = input.cronMeta && typeof input.cronMeta === "object" ? input.cronMeta : null;
  const cfg = input.configScheduler && typeof input.configScheduler === "object"
    ? input.configScheduler
    : {};

  const configuredCadenceMs =
    Number(cron?.configuredCadenceMs) ||
    Number(cfg.expectedIntervalMs) ||
    SCHEDULER_EXPECTED_INTERVAL_MS;

  const expectedIntervalSec = Math.max(1, Math.round(configuredCadenceMs / 1000));
  const { healthyMs, delayedMs } = schedulerThresholdMs(expectedIntervalSec);

  const vaultConfigured =
    cron?.vaultConfigured === true ||
    (cron?.vaultUrlPresent === true && cron?.vaultSecretPresent === true);
  const jobScheduled = cron?.jobScheduled === true;
  const setupComplete = vaultConfigured && jobScheduled;

  const source = tick
    ? normalizeSchedulerSource(tick.source)
    : "never_run";

  const lastSuccessAt = tick?.lastSuccessAt || tick?.at || null;
  const lastAttemptAt = tick?.lastAttemptAt || tick?.at || null;
  const lastFailureAt = tick?.lastFailureAt || null;
  const latestHttpStatus =
    tick?.latestHttpStatus ?? tick?.httpStatus ?? null;

  const claimed = tick?.claimed ?? null;
  const succeeded = tick?.succeeded ?? null;
  const failed = tick?.failed ?? null;
  const noOp =
    tick != null &&
    Number(claimed || 0) === 0 &&
    Number(succeeded || 0) === 0 &&
    Number(failed || 0) === 0;

  const consecutiveFailures = Number(tick?.consecutiveFailures || 0) || 0;

  const successAgeMs = (() => {
    const t = parseTs(lastSuccessAt);
    if (t == null) return null;
    return Math.max(0, now - t);
  })();

  let schedulerHealth = "never_run";
  let label = "Never run";
  let detail = "No durable tick has been recorded yet.";
  let recommendation =
    "Complete Vault + Supabase Cron cutover (see PHASE-I9 closeout), then confirm a supabase_cron tick.";

  if (!setupComplete && (cron == null || cron?.vaultConfigured === false || !jobScheduled)) {
    // When cronMeta is unavailable (local / RPC missing), do not force Setup if
    // we already have legacy ticks — show legacy health instead.
    if (cron && (cron.vaultConfigured === false || cron.jobScheduled === false)) {
      schedulerHealth = "setup_required";
      label = "Setup required";
      detail =
        !vaultConfigured
          ? "Vault secrets mianx_runtime_tick_url and mianx_runtime_tick_secret are not configured (or empty)."
          : "Canonical cron job mianx-runtime-tick-5m is not scheduled yet.";
      recommendation =
        "Founder: create Vault secrets, apply Phase I.9 migration, confirm job active — do not treat GitHub Actions as primary.";
    }
  }

  if (schedulerHealth !== "setup_required") {
    if (consecutiveFailures >= 3 || (latestHttpStatus && Number(latestHttpStatus) >= 400)) {
      const failAge = parseTs(lastFailureAt);
      if (failAge != null && (successAgeMs == null || now - failAge < successAgeMs)) {
        schedulerHealth = "failing";
        label = "Failing";
        detail = `Recent tick failure (HTTP ${latestHttpStatus ?? "unknown"}).`;
        recommendation =
          "Inspect Supabase Cron / pg_net and endpoint auth. Do not invent a healthy status.";
      }
    }

    if (schedulerHealth !== "failing") {
      if (!lastSuccessAt) {
        schedulerHealth = "never_run";
        label = "Never run";
      } else if (source !== "supabase_cron") {
        // GitHub / manual / legacy success must not mark primary Healthy.
        if (successAgeMs != null && successAgeMs > delayedMs) {
          schedulerHealth = "stale";
          label = "Stale";
          detail = `Last recorded tick was ${formatRelativeAge(successAgeMs)} ago from ${source}. Primary scheduler is Supabase Cron — GitHub Actions alone is not Healthy.`;
        } else if (successAgeMs != null && successAgeMs > healthyMs) {
          schedulerHealth = "delayed";
          label = "Delayed";
          detail = `Last tick from ${source} was ${formatRelativeAge(successAgeMs)} ago. Waiting for supabase_cron primary.`;
        } else {
          schedulerHealth = "delayed";
          label = "Delayed";
          detail = `Recent tick source is ${source}. Primary Healthy requires a recent supabase_cron success.`;
          recommendation =
            "Complete Supabase Cron cutover; GitHub Actions remains diagnostic fallback only.";
        }
      } else if (successAgeMs != null && successAgeMs > delayedMs) {
        schedulerHealth = "stale";
        label = "Stale";
        detail = `Last supabase_cron success was ${formatRelativeAge(successAgeMs)} ago (target ${formatExpectedCadence(expectedIntervalSec)}).`;
        recommendation =
          "Check cron.job / job_run_details and pg_net; confirm Vault URL still points at Production.";
      } else if (successAgeMs != null && successAgeMs > healthyMs) {
        schedulerHealth = "delayed";
        label = "Delayed";
        detail = `Last supabase_cron success was ${formatRelativeAge(successAgeMs)} ago — within delayed grace.`;
      } else {
        schedulerHealth = "healthy";
        label = "Healthy";
        detail = noOp
          ? `Last supabase_cron tick ${formatRelativeAge(successAgeMs)} ago — successful no-op (0 claimed / 0 succeeded / 0 failed).`
          : `Last supabase_cron tick ${formatRelativeAge(successAgeMs)} ago.`;
        recommendation = "No action required. Queue drains when jobs are present.";
      }
    }
  }

  return {
    primaryScheduler: "supabase_cron",
    fallbackScheduler: "github_actions",
    schedulerSource: source,
    schedulerJobName: CANONICAL_CRON_JOB_NAME,
    cronExpression: CANONICAL_CRON_EXPRESSION,
    configuredCadenceMs,
    expectedCadenceLabel: formatExpectedCadence(expectedIntervalSec),
    lastAttemptAt,
    lastSuccessAt,
    lastFailureAt,
    latestHttpStatus,
    claimed,
    succeeded,
    failed,
    noOp: Boolean(noOp),
    consecutiveFailures,
    schedulerHealth,
    health: schedulerHealth,
    label,
    detail,
    recommendation,
    schedulerDelayMs: successAgeMs,
    ageLabel: successAgeMs != null ? formatRelativeAge(successAgeMs) : null,
    vaultConfigured: cron ? vaultConfigured : null,
    jobScheduled: cron ? jobScheduled : null,
    jobActive: cron?.jobActive ?? null,
    thresholds: { healthyMs, delayedMs },
    fabricated: false,
    tickEndpoint: cfg.tickEndpoint || "/api/internal/runtime/tick",
    workerSecretConfigured: Boolean(cfg.workerSecretConfigured),
    platform: cfg.platform || null,
    automaticProcessing: Boolean(cfg.automaticProcessing),
    mode: cfg.mode || null,
    founderGuidance: cfg.founderGuidance || null,
  };
}

/**
 * Soft-read cron metadata via RPC (never throws; never returns secrets).
 */
export async function fetchSupabaseCronMeta(rpc = null) {
  if (!rpc || typeof rpc !== "function") return null;
  try {
    const data = await rpc();
    if (!data || typeof data !== "object") return null;
    if (data.secretsExposed === true) {
      // Refuse to propagate any payload that claims secrets were exposed.
      return null;
    }
    return {
      schedulerJobName: data.schedulerJobName || CANONICAL_CRON_JOB_NAME,
      cronExpression: data.cronExpression || CANONICAL_CRON_EXPRESSION,
      configuredCadenceMs: data.configuredCadenceMs || SCHEDULER_EXPECTED_INTERVAL_MS,
      primaryScheduler: "supabase_cron",
      fallbackScheduler: "github_actions",
      vaultUrlPresent: Boolean(data.vaultUrlPresent),
      vaultSecretPresent: Boolean(data.vaultSecretPresent),
      vaultConfigured: Boolean(data.vaultConfigured),
      jobScheduled: Boolean(data.jobScheduled),
      jobActive: Boolean(data.jobActive),
      jobSchedule: data.jobSchedule || null,
      lastCronRunStatus: data.lastCronRunStatus || null,
      lastCronRunStartedAt: data.lastCronRunStartedAt || null,
      lastCronRunEndedAt: data.lastCronRunEndedAt || null,
      secretsExposed: false,
    };
  } catch {
    return null;
  }
}
