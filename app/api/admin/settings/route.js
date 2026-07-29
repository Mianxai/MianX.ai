import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/core/errors";
import { requireAdmin, getAdminAccessModelStatus } from "@/lib/admin-auth";
import { runtimeConfigStatus } from "@/lib/core/config";
import { productionReadinessStatus } from "@/lib/core/production-readiness";
import { resolveSchemaProbeFlags } from "@/lib/core/schema-probes";
import { isSupabaseConfigured } from "@/lib/supabase";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

function safeHostname() {
  const configured = Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());
  try {
    const url = getSiteUrl();
    return { configured, hostname: new URL(url).hostname };
  } catch {
    return { configured, hostname: null };
  }
}

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);

  const runtime = runtimeConfigStatus();
  const site = safeHostname();
  const access = await getAdminAccessModelStatus();
  const analyticsConfigured = Boolean(
    process.env.NEXT_PUBLIC_VERCEL_ANALYTICS || process.env.VERCEL === "1"
  );

  const founderActions = [];

  if (!runtime.supabase) {
    founderActions.push({
      label: "Configure Supabase",
      description:
        "Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY in the deployment environment.",
    });
  }
  if (!runtime.providers.anthropic) {
    founderActions.push({
      label: "Configure Anthropic (optional for live AI)",
      description:
        "Not configured — not required for deterministic Founder Proof. Required later for explicitly enabled live AI execution. Never paste the key into the admin UI.",
    });
  }
  if (access.membershipTable === false) {
    founderActions.push({
      label: "Apply admin_memberships migration",
      description:
        "Apply supabase/migrations/20260725120000_admin_memberships.sql and 20260726120000_admin_membership_viewer_role.sql, then insert an active owner membership for the Founder auth user.",
    });
  } else if (access.activeMemberships === 0) {
    founderActions.push({
      label: "Bootstrap Founder admin membership",
      description:
        "Insert one active owner row into admin_memberships for the Founder user_id/email. Until then set MIANX_ADMIN_BOOTSTRAP=1 temporarily or admin APIs remain locked.",
    });
  }
  if (access.bootstrapEnabled) {
    founderActions.push({
      label: "Disable admin bootstrap flag",
      description:
        "Remove MIANX_ADMIN_BOOTSTRAP after the Founder membership exists so authorization stays fail-closed.",
    });
  }
  if (!runtime.internalWorkerConfigured) {
    founderActions.push({
      label: "Configure internal runtime worker secret",
      description:
        "Set INTERNAL_RUNTIME_SECRET (preferred) or CRON_SECRET (≥16 chars). Required before the tick endpoint will process jobs.",
    });
  }
  if (!site.configured) {
    founderActions.push({
      label: "Set public site URL",
      description: "Set NEXT_PUBLIC_SITE_URL for canonical links and SEO metadata.",
    });
  }
  if (!runtime.rateLimit?.durable) {
    founderActions.push({
      label: "Configure durable rate-limit backend (recommended)",
      description:
        "In-memory limits protect a single warm instance only. Wire a durable adapter (and optional RATE_LIMIT_DURABLE_URL) before treating rate limits as cluster-safe. URL alone does not enable durability.",
    });
  }
  if (!runtime.scheduler?.automaticProcessing) {
    founderActions.push({
      label: "Configure external or Pro scheduler for runtime tick",
      description:
        runtime.scheduler?.founderGuidance ||
        "No platform cron is configured in-repo (Hobby rejects sub-daily schedules). Queue jobs do not process automatically until an external/Pro scheduler calls POST /api/internal/runtime/tick with the internal secret.",
    });
  }

  const schemaFlags = await resolveSchemaProbeFlags();
  const membershipPresent =
    access.membershipTable === true
      ? true
      : access.membershipTable === false
        ? false
        : schemaFlags.membershipTablePresent;

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    config: {
      supabase: runtime.supabase,
      anthropic: runtime.providers.anthropic,
      providers: runtime.providers,
      siteUrl: site.configured,
      siteHostname: site.hostname,
      adminAuth: access.enforcement === "active_membership_required",
      adminAccessModel: access.model,
      membershipTable: access.membershipTable,
      compatibilityMode: access.compatibilityMode,
      bootstrapEnabled: access.bootstrapEnabled,
      leads: isSupabaseConfigured(),
      rateLimitBackend: runtime.rateLimit?.backend || "in-memory",
      rateLimitDurable: Boolean(runtime.rateLimit?.durable),
      rateLimitUrlConfigured: Boolean(runtime.rateLimit?.urlConfigured),
      schedulerMode: runtime.scheduler?.mode || "manual",
      schedulerAutomaticProcessing: Boolean(
        runtime.scheduler?.automaticProcessing
      ),
      platformCronConfigured: Boolean(runtime.scheduler?.platformCronConfigured),
      schedulerGuidance: runtime.scheduler?.founderGuidance || null,
      internalWorkerConfigured: runtime.internalWorkerConfigured,
      cronSecretConfigured: runtime.cronSecretConfigured,
      providerCircuitState: runtime.providerCircuit?.state || "closed",
      analyticsIntegration: analyticsConfigured,
      runtimeVersion: process.env.npm_package_version || "0.1.0",
    },
    productionReadiness: productionReadinessStatus({
      membershipTablePresent: membershipPresent,
      runtimeJobsSchemaPresent: schemaFlags.runtimeJobsSchemaPresent,
    }),
    access,
    founderActions,
  });
});
