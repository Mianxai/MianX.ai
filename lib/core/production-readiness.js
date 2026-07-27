// Production configuration readiness — booleans/status only, never secret values.

import { isSupabaseConfigured } from "@/lib/supabase";
import { isProviderConfigured, isInternalWorkerConfigured, isCronSecretConfigured, schedulerStatus } from "./config";
import { rateLimitBackendStatus } from "./ratelimit";

/**
 * @typedef {"configured"|"unconfigured"|"unknown"|"migration_required"} ReadinessStatus
 */

function boolStatus(ok) {
  return ok ? "configured" : "unconfigured";
}

/**
 * Truthful production readiness snapshot for Admin/health.
 * Never includes secret values, connection strings, or raw env contents.
 */
export function productionReadinessStatus({
  membershipTablePresent = null,
  runtimeJobsSchemaPresent = null,
} = {}) {
  const supabase = isSupabaseConfigured();
  const siteConfigured = Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());
  const rate = rateLimitBackendStatus();
  const scheduler = schedulerStatus();

  let database = boolStatus(supabase);
  let runtime_jobs_schema = "unknown";
  let admin_membership_schema = "unknown";

  if (!supabase) {
    runtime_jobs_schema = "unconfigured";
    admin_membership_schema = "unconfigured";
  } else {
    if (runtimeJobsSchemaPresent === true) runtime_jobs_schema = "configured";
    else if (runtimeJobsSchemaPresent === false) runtime_jobs_schema = "migration_required";
    if (membershipTablePresent === true) admin_membership_schema = "configured";
    else if (membershipTablePresent === false) admin_membership_schema = "migration_required";
  }

  const provider = boolStatus(isProviderConfigured("anthropic"));
  const schedulerSecret = boolStatus(
    isInternalWorkerConfigured() || isCronSecretConfigured()
  );
  const schedulerConfigured =
    scheduler.platformCronConfigured || scheduler.automaticProcessing
      ? "configured"
      : scheduler.readyForExternalScheduler
        ? "unconfigured"
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
    provider,
    scheduler_secret: schedulerSecret,
    scheduler_active: schedulerConfigured,
    durable_rate_limiter: durableRateLimiter,
    canonical_site_url: siteUrl,
    // Never include values — only statuses above.
  };
}
