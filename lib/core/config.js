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

// A non-secret snapshot of runtime capability. Booleans only.
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
  };
}

export { isSupabaseConfigured };
