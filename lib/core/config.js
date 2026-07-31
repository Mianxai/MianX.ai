// Environment/configuration validation for the Mianx Core runtime.
//
// All reads happen at request time (never at module load / build time) so the
// app builds and boots without any secrets, matching lib/supabase.js. None of
// these helpers return the secret values themselves — only booleans — so they
// are safe to surface (e.g. in the health route).

import { isSupabaseConfigured } from "@/lib/supabase";
import { rateLimitBackendStatus } from "./ratelimit";
import { getCircuitBreakerStatus } from "./circuit";
import { getInternalSecrets } from "./internal-auth";

export function isProviderConfigured(provider = "anthropic") {
  if (provider === "none") return true;
  if (provider === "anthropic") return Boolean(process.env.ANTHROPIC_API_KEY?.trim());
  if (provider === "openrouter") return Boolean(process.env.OPENROUTER_API_KEY?.trim());
  return false;
}

export function isInternalWorkerConfigured() {
  return getInternalSecrets().length > 0;
}

export function isCronSecretConfigured() {
  return typeof process.env.CRON_SECRET === "string" && process.env.CRON_SECRET.length >= 16;
}

/**
 * Truthful provider operational enum for Admin/health.
 * Never includes key material.
 *
 * @returns {"configured"|"unconfigured"|"degraded"|"circuit_open"}
 */
export function providerOperationalStatus(provider = "anthropic") {
  if (!isProviderConfigured(provider)) return "unconfigured";
  const circuit = getCircuitBreakerStatus();
  if (circuit?.state === "open") return "circuit_open";
  if (circuit?.state === "half_open") return "degraded";
  if (typeof circuit?.failures === "number" && circuit.failures > 0) {
    return "degraded";
  }
  return "configured";
}

/**
 * Resolve scheduler platform wiring from env + in-repo cron declaration.
 *
 * Honesty rules:
 * - Shipping vercel.json / GHA workflow ≠ automaticProcessing.
 * - Founder must set RUNTIME_SCHEDULER_ACTIVE=1 only after a verified tick.
 * - RUNTIME_SCHEDULER_PLATFORM documents which scheduler is intended:
 *   github_actions | vercel_cron | external | supabase_cron
 *
 * Phase I.9: primary Production cadence is Supabase Cron. GitHub Actions is
 * diagnostic fallback (workflow_dispatch). Set
 * RUNTIME_SCHEDULER_PLATFORM=supabase_cron after Vault + migration cutover.
 * mode:
 *   - "automatic" — secrets + platform declared + ACTIVE=1
 *   - "external_scheduler_required" — secrets ready; platform not yet active
 *   - "paused" — RUNTIME_SCHEDULER_PAUSED=1
 *   - "warning" — automatic but last tick stale for platform interval
 *   - "degraded" — reserved for repeated failures / secret mismatch (callers)
 *   - "manual" — secrets missing
 *   - "unconfigured" — scheduler disabled / missing settings
 */
import { canonicalSchedulerExpectedIntervalMs } from "./scheduler-cadence";

/**
 * Expected tick interval for Founder health/stale calculations.
 * Canonical target is 5 minutes (300000 ms) for all platforms.
 * Platform-specific Hobby schedules may still be daily — that is a host
 * limitation, not a change to the Founder-facing expected cadence.
 */
export function schedulerExpectedIntervalMs(_platform) {
  return canonicalSchedulerExpectedIntervalMs();
}

export function schedulerStatus({ lastTickAt = null, now = Date.now() } = {}) {
  const workerReady = isInternalWorkerConfigured();
  const platformRaw = String(process.env.RUNTIME_SCHEDULER_PLATFORM || "")
    .trim()
    .toLowerCase();
  const platformKnown = [
    "github_actions",
    "vercel_cron",
    "external",
    "supabase_cron",
  ].includes(platformRaw);
  const VERCEL_CRON_IN_REPO = true;
  const vercelCronDeclared =
    VERCEL_CRON_IN_REPO || process.env.RUNTIME_VERCEL_CRON_DECLARED === "1";
  const platformCronConfigured = platformKnown || vercelCronDeclared;

  const paused = process.env.RUNTIME_SCHEDULER_PAUSED === "1";
  const activeFlag = process.env.RUNTIME_SCHEDULER_ACTIVE === "1";
  const automaticProcessing =
    !paused && activeFlag && platformCronConfigured && workerReady;

  const platform = platformKnown
    ? platformRaw
    : vercelCronDeclared
      ? "vercel_cron"
      : null;

  let mode = "manual";
  if (paused) {
    mode = "paused";
  } else if (!workerReady && !activeFlag) {
    mode = "unconfigured";
  } else if (automaticProcessing) {
    mode = "automatic";
    if (lastTickAt) {
      const ageMs = now - new Date(lastTickAt).getTime();
      const expected = schedulerExpectedIntervalMs(platform);
      // Stale tick is warning — not degraded (degraded = repeated failures).
      if (Number.isFinite(ageMs) && ageMs > expected) {
        mode = "warning";
      }
    }
  } else if (workerReady) {
    mode = "external_scheduler_required";
  }

  const guidance = !workerReady
    ? "Set INTERNAL_RUNTIME_SECRET or CRON_SECRET (≥16 chars), then enable a scheduler."
    : mode === "warning"
      ? "Scheduler is active but the last tick is older than the expected interval. Check GitHub Actions / cron logs."
      : automaticProcessing
        ? "Automatic scheduler is active. Monitor last tick and job counters in Control Room."
        : platformCronConfigured
          ? "Scheduler platform is declared. After verifying a real tick, set RUNTIME_SCHEDULER_ACTIVE=1 on the deployment. Do not set ACTIVE until a tick succeeds."
          : "Primary scheduler is Supabase Cron (mianx-runtime-tick-5m). Create Vault secrets, apply Phase I.9 migration, set RUNTIME_SCHEDULER_PLATFORM=supabase_cron and RUNTIME_SCHEDULER_ACTIVE=1 only after a verified supabase_cron tick. GitHub Actions remains workflow_dispatch diagnostic only.";

  return {
    mode,
    platform,
    platformCronConfigured,
    automaticProcessing,
    paused,
    tickEndpoint: "/api/internal/runtime/tick",
    workerSecretConfigured: workerReady,
    readyForExternalScheduler: workerReady,
    founderGuidance: guidance,
    expectedIntervalMs: schedulerExpectedIntervalMs(platform),
  };
}

// A non-secret snapshot of runtime capability. Booleans / enums only.
export function runtimeConfigStatus(opts = {}) {
  const providerStatus = providerOperationalStatus("anthropic");
  return {
    supabase: isSupabaseConfigured(),
    providers: {
      anthropic: isProviderConfigured("anthropic"),
    },
    providerStatus,
    internalWorkerConfigured: isInternalWorkerConfigured(),
    cronSecretConfigured: isCronSecretConfigured(),
    rateLimit: rateLimitBackendStatus(),
    providerCircuit: getCircuitBreakerStatus(),
    adminBootstrap: process.env.MIANX_ADMIN_BOOTSTRAP === "1",
    scheduler: schedulerStatus(opts),
  };
}

export { isSupabaseConfigured };
