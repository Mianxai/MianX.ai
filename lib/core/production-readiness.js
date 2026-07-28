// Production configuration readiness — booleans/status only, never secret values.

import { isSupabaseConfigured } from "@/lib/supabase";
import {
  isProviderConfigured,
  isInternalWorkerConfigured,
  isCronSecretConfigured,
  schedulerStatus,
  providerOperationalStatus,
} from "./config";
import { rateLimitBackendStatus } from "./ratelimit";
import { resolveSchemaProbeFlags } from "./schema-probes";
import { getCircuitBreakerStatus } from "./circuit";

/**
 * @typedef {"configured"|"unconfigured"|"unknown"|"migration_required"|"degraded"|"circuit_open"} ReadinessStatus
 */

function boolStatus(ok) {
  return ok ? "configured" : "unconfigured";
}

function schemaStatus(present, supabaseConfigured) {
  if (!supabaseConfigured) return "unconfigured";
  if (present === true) return "configured";
  if (present === false) return "migration_required";
  return "unknown";
}

/**
 * Truthful production readiness snapshot for Admin/health.
 * Never includes secret values, connection strings, or raw env contents.
 */
export function productionReadinessStatus({
  membershipTablePresent = null,
  runtimeJobsSchemaPresent = null,
  memoryEntriesSchemaPresent = null,
  learningCandidatesSchemaPresent = null,
  lastTickAt = null,
  memoryDurable = null,
} = {}) {
  const supabase = isSupabaseConfigured();
  const siteConfigured = Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());
  const rate = rateLimitBackendStatus();
  const scheduler = schedulerStatus({ lastTickAt });
  const circuit = getCircuitBreakerStatus();

  const database = boolStatus(supabase);
  const runtime_jobs_schema = schemaStatus(runtimeJobsSchemaPresent, supabase);
  const admin_membership_schema = schemaStatus(membershipTablePresent, supabase);
  const memory_entries_schema = schemaStatus(memoryEntriesSchemaPresent, supabase);
  const learning_candidates_schema = schemaStatus(
    learningCandidatesSchemaPresent,
    supabase
  );

  const provider = providerOperationalStatus("anthropic");
  const provider_circuit =
    circuit?.state === "open"
      ? "circuit_open"
      : circuit?.state === "half_open"
        ? "degraded"
        : "configured";

  const schedulerSecret = boolStatus(
    isInternalWorkerConfigured() || isCronSecretConfigured()
  );
  const scheduler_active = scheduler.automaticProcessing
    ? scheduler.mode === "degraded"
      ? "degraded"
      : scheduler.mode === "warning"
        ? "warning"
        : "configured"
    : scheduler.mode === "unconfigured"
      ? "unconfigured"
      : "unconfigured";

  const durableRateLimiter = rate.durable
    ? "configured"
    : rate.configured
      ? "unconfigured"
      : "unconfigured";

  const siteUrl = boolStatus(siteConfigured);

  return {
    database,
    runtime_jobs_schema,
    admin_membership_schema,
    memory_entries_schema,
    learning_candidates_schema,
    memory_persistence:
      memoryDurable === true
        ? "configured"
        : memoryDurable === false
          ? "unconfigured"
          : schemaStatus(memoryEntriesSchemaPresent, supabase),
    provider,
    provider_circuit,
    scheduler_secret: schedulerSecret,
    scheduler_active,
    durable_rate_limiter: durableRateLimiter,
    rate_limit: {
      backend: rate.backend,
      configured: Boolean(rate.configured),
      active: Boolean(rate.adapterActive),
      durable: Boolean(rate.durable),
    },
    canonical_site_url: siteUrl,
    // Never include values — only statuses above.
  };
}

/**
 * Probe schema presence then return readiness (still never leaks row data).
 */
export async function productionReadinessStatusAsync(overrides = {}) {
  const flags = await resolveSchemaProbeFlags();
  let memoryDurable = overrides.memoryDurable;
  if (memoryDurable === undefined) {
    try {
      const { memoryLearningPersistenceStatus } = await import("./memory");
      const status = await memoryLearningPersistenceStatus();
      memoryDurable = Boolean(status.durable);
    } catch {
      memoryDurable = null;
    }
  }
  let lastTickAt = overrides.lastTickAt ?? null;
  if (overrides.lastTickAt === undefined) {
    try {
      const repo = await import("./repo");
      const tick = await repo.getLastRuntimeTick?.();
      lastTickAt = tick?.at || null;
    } catch {
      lastTickAt = null;
    }
  }
  return productionReadinessStatus({
    membershipTablePresent:
      overrides.membershipTablePresent !== undefined
        ? overrides.membershipTablePresent
        : flags.membershipTablePresent,
    runtimeJobsSchemaPresent:
      overrides.runtimeJobsSchemaPresent !== undefined
        ? overrides.runtimeJobsSchemaPresent
        : flags.runtimeJobsSchemaPresent,
    memoryEntriesSchemaPresent:
      overrides.memoryEntriesSchemaPresent !== undefined
        ? overrides.memoryEntriesSchemaPresent
        : flags.memoryEntriesSchemaPresent,
    learningCandidatesSchemaPresent:
      overrides.learningCandidatesSchemaPresent !== undefined
        ? overrides.learningCandidatesSchemaPresent
        : flags.learningCandidatesSchemaPresent,
    lastTickAt,
    memoryDurable,
  });
}
