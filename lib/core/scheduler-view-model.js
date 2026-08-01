/**
 * Canonical durable scheduler view model — single source for Schedule,
 * Command Center, Founder Home schedule chips, Runtime, and /api/core/health.
 *
 * Intended primary: supabase_cron. Gapless fallback: github_actions (scheduled
 * until supabase_primary_active + healthy). Healthy primary requires a recent
 * successful *supabase_cron* tick — GitHub alone never marks primary Healthy.
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

/** Canonical cutover / fallback transition states (machine + UI). */
export const SCHEDULER_TRANSITION_STATES = Object.freeze([
  "github_fallback_active",
  "supabase_configured_unverified",
  "supabase_verified",
  "supabase_primary_active",
  "supabase_degraded",
  "rollback_to_github",
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
 * Resolve cutover transition. Never infer "primary active" from env alone —
 * requires durable supabase_cron success evidence when claiming verified/primary.
 */
export function resolveSchedulerTransitionState(input = {}) {
  const cron = input.cronMeta && typeof input.cronMeta === "object" ? input.cronMeta : null;
  const cfg = input.configScheduler && typeof input.configScheduler === "object"
    ? input.configScheduler
    : {};
  const schedulerHealth = input.schedulerHealth || "never_run";
  const source = normalizeSchedulerSource(input.latestSource || input.source || "never_run");
  const successAgeMs =
    input.successAgeMs != null && Number.isFinite(input.successAgeMs)
      ? input.successAgeMs
      : null;
  const healthyMs = Number(input.healthyMs) || SCHEDULER_EXPECTED_INTERVAL_MS * 2;

  const vaultConfigured =
    cron?.vaultConfigured === true ||
    (cron?.vaultUrlPresent === true && cron?.vaultSecretPresent === true);
  const jobScheduled = cron?.jobScheduled === true;
  const jobActive = cron?.jobActive === true;
  const platform = String(cfg.platform || "").toLowerCase() || null;
  const paused = Boolean(cfg.paused);
  const activeFlag = Boolean(cfg.automaticProcessing);
  const platformIsSupabase = platform === "supabase_cron";
  const hasSupabaseSuccess = source === "supabase_cron" && Boolean(input.lastSuccessAt);
  const supabaseRecentHealthy =
    hasSupabaseSuccess &&
    schedulerHealth === "healthy" &&
    successAgeMs != null &&
    successAgeMs <= healthyMs;

  // Explicit rollback / pause → GitHub gapless path.
  if (paused || platform === "github_actions") {
    if (vaultConfigured || jobScheduled || hasSupabaseSuccess) {
      return "rollback_to_github";
    }
    return "github_fallback_active";
  }

  // Declared primary (ACTIVE + platform) but not healthy → degraded.
  if (activeFlag && platformIsSupabase) {
    if (
      vaultConfigured &&
      jobScheduled &&
      jobActive &&
      hasSupabaseSuccess &&
      supabaseRecentHealthy
    ) {
      return "supabase_primary_active";
    }
    if (vaultConfigured && jobScheduled && hasSupabaseSuccess) {
      return "supabase_degraded";
    }
    if (vaultConfigured && jobScheduled) {
      return "supabase_configured_unverified";
    }
    return "supabase_degraded";
  }

  // Cron meta unavailable (Preview / RPC missing) → truthful fallback, not "active".
  if (cron == null) {
    return "github_fallback_active";
  }

  if (vaultConfigured && jobScheduled) {
    if (hasSupabaseSuccess) {
      return "supabase_verified";
    }
    return "supabase_configured_unverified";
  }

  return "github_fallback_active";
}

/**
 * Whether the GitHub scheduled workflow should skip invoking the tick.
 * Requires primary active + healthy supabase_cron evidence — env alone is insufficient.
 */
export function shouldGithubScheduledTickSkip(contract = {}) {
  return (
    contract.schedulerTransitionState === "supabase_primary_active" &&
    contract.schedulerActive === true &&
    contract.primaryScheduler === "supabase_cron" &&
    contract.schedulerHealth === "healthy" &&
    contract.latestSource === "supabase_cron" &&
    contract.githubFallbackShouldSkip === true
  );
}

/**
 * Gapless fallback policy for schedule / degraded paths.
 * - skip: Supabase primary active and healthy
 * - invoke: otherwise (including degraded — leases/CAS prevent duplicate claims)
 */
export function resolveGithubFallbackDecision(contract = {}) {
  if (shouldGithubScheduledTickSkip(contract)) {
    return {
      action: "skip",
      invokeTick: false,
      message:
        "Supabase Cron is active and healthy; fallback tick skipped.",
    };
  }
  if (contract.schedulerTransitionState === "supabase_degraded") {
    return {
      action: "invoke",
      invokeTick: true,
      message:
        "Supabase Cron marked active but degraded (stale/failing/delayed); invoking protected GitHub fallback tick. Lease/CAS prevent duplicate claims.",
    };
  }
  return {
    action: "invoke",
    invokeTick: true,
    message:
      "GitHub fallback tick invoked — Supabase Cron not yet primary-active and healthy.",
  };
}

function transitionLabel(state) {
  switch (state) {
    case "supabase_primary_active":
      return "Supabase primary active";
    case "supabase_verified":
      return "Supabase verified (not yet primary)";
    case "supabase_configured_unverified":
      return "Supabase configured, unverified";
    case "supabase_degraded":
      return "Supabase degraded";
    case "rollback_to_github":
      return "Rollback — GitHub fallback";
    case "github_fallback_active":
    default:
      return "GitHub fallback active";
  }
}

/**
 * @param {{
 *   lastTick?: object|null,
 *   cronMeta?: object|null,
 *   configScheduler?: object|null,
 *   now?: number,
 *   providerName?: string,
 *   liveExecutionReady?: boolean,
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
    "GitHub Actions remains the gapless scheduled fallback until Vault + migration + a verified supabase_cron tick + ACTIVE flags are complete.";

  if (!setupComplete && cron && (cron.vaultConfigured === false || cron.jobScheduled === false)) {
    schedulerHealth = "setup_required";
    label = "Setup required";
    detail =
      !vaultConfigured
        ? "Vault secrets mianx_runtime_tick_url and mianx_runtime_tick_secret are not configured (or empty). GitHub scheduled fallback remains active."
        : "Canonical cron job mianx-runtime-tick-5m is not scheduled yet. GitHub scheduled fallback remains active.";
    recommendation =
      "Founder cutover: create Vault secrets, apply Phase I.9 migration, verify supabase_cron tick, then set RUNTIME_SCHEDULER_PLATFORM/ACTIVE. Do not remove GHA schedule until primary is healthy.";
  }

  if (schedulerHealth !== "setup_required") {
    if (consecutiveFailures >= 3 || (latestHttpStatus && Number(latestHttpStatus) >= 400)) {
      const failAge = parseTs(lastFailureAt);
      if (failAge != null && (successAgeMs == null || now - failAge < successAgeMs)) {
        schedulerHealth = "failing";
        label = "Failing";
        detail = `Recent tick failure (HTTP ${latestHttpStatus ?? "unknown"}).`;
        recommendation =
          "Inspect Supabase Cron / pg_net and endpoint auth. GitHub fallback may invoke under degraded policy; leases prevent duplicate claims.";
      }
    }

    if (schedulerHealth !== "failing") {
      if (!lastSuccessAt) {
        schedulerHealth = "never_run";
        label = "Never run";
      } else if (source !== "supabase_cron") {
        if (successAgeMs != null && successAgeMs > delayedMs) {
          schedulerHealth = "stale";
          label = "Stale";
          detail = `Last recorded tick was ${formatRelativeAge(successAgeMs)} ago from ${source}. Primary Healthy requires recent supabase_cron — GitHub fallback is retaining cadence.`;
        } else if (successAgeMs != null && successAgeMs > healthyMs) {
          schedulerHealth = "delayed";
          label = "Delayed";
          detail = `Last tick from ${source} was ${formatRelativeAge(successAgeMs)} ago. Waiting for supabase_cron primary verification.`;
        } else {
          schedulerHealth = "delayed";
          label = "Delayed";
          detail = `Recent tick source is ${source}. Primary Healthy requires a recent supabase_cron success. GitHub schedule remains gapless fallback.`;
          recommendation =
            "Continue Founder cutover; do not claim Supabase Cron Production-active until verified.";
        }
      } else if (successAgeMs != null && successAgeMs > delayedMs) {
        schedulerHealth = "stale";
        label = "Stale";
        detail = `Last supabase_cron success was ${formatRelativeAge(successAgeMs)} ago (target ${formatExpectedCadence(expectedIntervalSec)}).`;
        recommendation =
          "Check cron.job / job_run_details and pg_net; GitHub degraded policy may invoke fallback ticks.";
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
        recommendation = "No action required when transition is supabase_primary_active.";
      }
    }
  }

  const schedulerTransitionState = resolveSchedulerTransitionState({
    cronMeta: cron,
    configScheduler: cfg,
    schedulerHealth,
    latestSource: source,
    lastSuccessAt,
    successAgeMs,
    healthyMs,
  });

  const schedulerActive =
    schedulerTransitionState === "supabase_primary_active" &&
    Boolean(cfg.automaticProcessing) &&
    String(cfg.platform || "") === "supabase_cron";

  const githubFallbackShouldSkip =
    schedulerActive &&
    schedulerHealth === "healthy" &&
    source === "supabase_cron" &&
    successAgeMs != null &&
    successAgeMs <= healthyMs;

  const transitionDetail = transitionLabel(schedulerTransitionState);
  if (schedulerTransitionState === "github_fallback_active") {
    recommendation =
      "Production cutover pending. Implementation available; GitHub */5 schedule remains the active gapless fallback. Provider none; liveExecutionReady false.";
  } else if (schedulerTransitionState === "supabase_configured_unverified") {
    recommendation =
      "Vault + job present but no durable supabase_cron tick yet. Keep GitHub schedule; wait for genuine Cron execution.";
  } else if (schedulerTransitionState === "supabase_verified") {
    recommendation =
      "supabase_cron evidence exists. Set RUNTIME_SCHEDULER_PLATFORM=supabase_cron and RUNTIME_SCHEDULER_ACTIVE=1 only after Founder verification, then confirm GHA skips.";
  } else if (schedulerTransitionState === "supabase_degraded") {
    recommendation =
      "Supabase declared active but not healthy. GitHub may invoke protected fallback ticks; leases prevent duplicate work.";
  } else if (schedulerTransitionState === "rollback_to_github") {
    recommendation =
      "Rollback path: GitHub fallback is the active tick path. Unschedule only mianx-runtime-tick-5m if needed.";
  }

  const providerName = input.providerName || "none";
  const liveExecutionReady = input.liveExecutionReady === true;

  const healthContract = {
    primaryScheduler: "supabase_cron",
    schedulerActive,
    schedulerTransitionState,
    schedulerHealth,
    latestSource: source,
    lastAttemptAt,
    lastSuccessAt,
    schedulerDelayMs: successAgeMs,
    configuredCadenceMs,
    canonicalJobName: CANONICAL_CRON_JOB_NAME,
    cronExpression: CANONICAL_CRON_EXPRESSION,
    githubFallbackShouldSkip,
    liveExecutionReady: false,
    providerName: providerName === "none" ? "none" : providerName,
    fallbackScheduler: "github_actions",
    jobScheduled: cron ? jobScheduled : null,
    jobActive: cron?.jobActive ?? null,
    vaultConfigured: cron ? vaultConfigured : null,
  };

  const fallbackDecision = resolveGithubFallbackDecision(healthContract);

  return {
    primaryScheduler: "supabase_cron",
    fallbackScheduler: "github_actions",
    schedulerSource: source,
    latestSource: source,
    schedulerJobName: CANONICAL_CRON_JOB_NAME,
    canonicalJobName: CANONICAL_CRON_JOB_NAME,
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
    schedulerTransitionState,
    schedulerActive,
    transitionLabel: transitionDetail,
    githubFallbackShouldSkip,
    fallbackDecision,
    healthContract,
    providerName: healthContract.providerName,
    liveExecutionReady: false,
    productionCutoverPending: schedulerTransitionState !== "supabase_primary_active",
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
