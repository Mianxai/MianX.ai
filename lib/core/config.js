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
  if (provider === "anthropic") return Boolean(process.env.ANTHROPIC_API_KEY);
  return false;
}

export function isInternalWorkerConfigured() {
  return getInternalSecrets().length > 0;
}

export function isCronSecretConfigured() {
  return typeof process.env.CRON_SECRET === "string" && process.env.CRON_SECRET.length >= 16;
}

/**
 * Platform scheduler status. This repository intentionally has no vercel.json
 * cron (Vercel Hobby rejects sub-daily schedules; Pro can add cron outside
 * this PR or via the dashboard). Processing is pull-based via the
 * secret-protected tick endpoint until Founder configures an external/Pro
 * scheduler. Never claim automatic processing here.
 *
 * mode:
 *   - "automatic" — platform cron wired and processing jobs
 *   - "external_scheduler_required" — worker secret ready; no platform cron
 *   - "manual" — secrets missing or Founder must tick manually
 */
export function schedulerStatus() {
  const workerReady = isInternalWorkerConfigured();
  const platformCronConfigured = false; // no vercel.json cron in-repo (Hobby-safe)
  const automaticProcessing = false;
  let mode = "manual";
  if (automaticProcessing && platformCronConfigured) {
    mode = "automatic";
  } else if (workerReady) {
    mode = "external_scheduler_required";
  }
  return {
    mode,
    platformCronConfigured,
    automaticProcessing,
    tickEndpoint: "/api/internal/runtime/tick",
    workerSecretConfigured: workerReady,
    readyForExternalScheduler: workerReady,
    founderGuidance: workerReady
      ? "Configure an external scheduler (or Vercel Pro Cron) to POST /api/internal/runtime/tick with Authorization: Bearer <INTERNAL_RUNTIME_SECRET or CRON_SECRET>. Hobby plans cannot host sub-daily cron in-repo."
      : "Set INTERNAL_RUNTIME_SECRET or CRON_SECRET (≥16 chars), then configure an external/Pro scheduler.",
  };
}

// A non-secret snapshot of runtime capability. Booleans / enums only.
export function runtimeConfigStatus() {
  return {
    supabase: isSupabaseConfigured(),
    providers: {
      anthropic: isProviderConfigured("anthropic"),
    },
    internalWorkerConfigured: isInternalWorkerConfigured(),
    cronSecretConfigured: isCronSecretConfigured(),
    rateLimit: rateLimitBackendStatus(),
    providerCircuit: getCircuitBreakerStatus(),
    adminBootstrap: process.env.MIANX_ADMIN_BOOTSTRAP === "1",
    scheduler: schedulerStatus(),
  };
}

export { isSupabaseConfigured };
