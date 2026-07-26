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
 * cron (Hobby rejects sub-daily schedules). Processing is pull-based via the
 * secret-protected tick endpoint until Founder configures an external/Pro
 * scheduler. Never claim automatic processing here.
 */
export function schedulerStatus() {
  const workerReady = isInternalWorkerConfigured();
  return {
    mode: "manual",
    platformCronConfigured: false,
    automaticProcessing: false,
    tickEndpoint: "/api/internal/runtime/tick",
    workerSecretConfigured: workerReady,
    readyForExternalScheduler: workerReady,
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
