// Production configuration readiness — booleans/status only, never secret values.

import { isSupabaseConfigured } from "@/lib/supabase";
import {
  isProviderConfigured,
  isInternalWorkerConfigured,
  isCronSecretConfigured,
  schedulerStatus,
} from "./config";
import { rateLimitBackendStatus } from "./ratelimit";
import { resolveSchemaProbeFlags } from "./schema-probes";

/**
 * @typedef {"configured"|"unconfigured"|"unknown"|"migration_required"} ReadinessStatus
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
 *
 * Pass explicit probe results when available. Use
 * `await productionReadinessStatusAsync()` from routes that can probe.
 */
export function productionReadinessStatus({
  membershipTablePresent = null,
  runtimeJobsSchemaPresent = null,
  memoryEntriesSchemaPresent = null,
  learningCandidatesSchemaPresent = null,
} = {}) {
  const supabase = isSupabaseConfigured();
  const siteConfigured = Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());
  const rate = rateLimitBackendStatus();
  const scheduler = schedulerStatus();

  const database = boolStatus(supabase);
  const runtime_jobs_schema = schemaStatus(runtimeJobsSchemaPresent, supabase);
  const admin_membership_schema = schemaStatus(membershipTablePresent, supabase);
  const memory_entries_schema = schemaStatus(memoryEntriesSchemaPresent, supabase);
  const learning_candidates_schema = schemaStatus(
    learningCandidatesSchemaPresent,
    supabase
  );

  const provider = boolStatus(isProviderConfigured("anthropic"));
  const schedulerSecret = boolStatus(
    isInternalWorkerConfigured() || isCronSecretConfigured()
  );
  // Secrets alone ≠ active automatic processing. Platform cron is not in-repo
  // (Hobby rejects sub-daily). Report configured only when automatic.
  const schedulerConfigured =
    scheduler.platformCronConfigured || scheduler.automaticProcessing
      ? "configured"
      : "unconfigured";

  const durableRateLimiter = rate.durable
    ? "configured"
    : rate.urlConfigured
      ? "unconfigured" // URL present but adapter inactive
      : "unconfigured";

  const siteUrl = boolStatus(siteConfigured);

  return {
    database,
    runtime_jobs_schema,
    admin_membership_schema,
    memory_entries_schema,
    learning_candidates_schema,
    provider,
    scheduler_secret: schedulerSecret,
    scheduler_active: schedulerConfigured,
    durable_rate_limiter: durableRateLimiter,
    canonical_site_url: siteUrl,
    // Never include values — only statuses above.
  };
}

/**
 * Probe schema presence then return readiness (still never leaks row data).
 */
export async function productionReadinessStatusAsync(overrides = {}) {
  const flags = await resolveSchemaProbeFlags();
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
  });
}
