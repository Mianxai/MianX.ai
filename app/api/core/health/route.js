import { NextResponse } from "next/server";
import {
  runtimeConfigStatus,
  providerOperationalStatus,
} from "@/lib/core/config";
import {
  listAgentDefinitions,
  listActiveAgentDefinitions,
  isAgentExecutable,
} from "@/lib/core/agents";
import { productionReadinessStatusAsync } from "@/lib/core/production-readiness";
import { buildIntegrationReadinessAsync } from "@/lib/core/integration";
import * as repo from "@/lib/core/repo";
import {
  buildFoundationMetrics,
  sanitizeFoundationMetrics,
  durableRateLimitStatus,
} from "@/lib/core/workforce-i2";

export const dynamic = "force-dynamic";

/**
 * PUBLIC liveness check — lightweight, no secrets, no internal details.
 * Returns 200 if the server process is running, regardless of config.
 * Used by load balancers, uptime monitors, and Vercel health checks.
 */
export async function GET(req) {
  // Public liveness: if the function executes, the service is alive.
  // Authenticated admins get full diagnostics via ?action=diagnostics.
  const url = new URL(req.url);
  const action = url.searchParams.get("action");

  if (action !== "diagnostics") {
    // Lightweight public response — no DB queries, no internal details.
    return NextResponse.json({ ok: true, service: "mianx", time: new Date().toISOString() });
  }

  // --- ADMIN-ONLY DIAGNOSTICS ---
  // Require admin auth for detailed health information.
  let isAdmin = false;
  try {
    const { requireAdmin } = await import("@/lib/admin-auth");
    await requireAdmin(req);
    isAdmin = true;
  } catch {
    // Not admin — return public-only response even for ?action=diagnostics
    return NextResponse.json(
      { ok: true, service: "mianx", time: new Date().toISOString() },
      { status: 200 }
    );
  }

  if (!isAdmin) {
    return NextResponse.json({ ok: true, service: "mianx", time: new Date().toISOString() });
  }
  let lastTick = null;
  try {
    lastTick = await repo.getLastRuntimeTick();
  } catch {
    lastTick = null;
  }

  const productionReadiness = await productionReadinessStatusAsync({
    lastTickAt: lastTick?.at || null,
  });
  const config = runtimeConfigStatus({ lastTickAt: lastTick?.at || null });
  const active = listActiveAgentDefinitions();
  const executable = active.filter(isAgentExecutable);
  const integration = await buildIntegrationReadinessAsync({
    lastTickAt: lastTick?.at || null,
  });

  let foundation = null;
  let workforce = {
    capacitySeats: 445,
    compiledSeats: 445,
    persistedSeats: null,
    mappedSeats: null,
    readyToAllocateSeats: 0,
    allocatedSeats: 0,
    activeInstances: 0,
    reviewingInstances: 0,
    blockedSeats: 0,
    liveTestedSeats: 0,
    archetypeCount: null,
    departmentCoverage: null,
    workflowCoverage: null,
    bootstrapStatus: "unknown",
    foundationReady: false,
    productionReady: false,
    liveExecutionReady: false,
  };
  let provider = {
    configured: false,
    providerName: "none",
    freeOnly: true,
    paidFallbackEnabled: false,
    modelPolicyStatus: "free_only_default",
    lastControlledTestAt: null,
    lastControlledTestResult: null,
  };
  let runtime = {
    databaseDurable: false,
    queueDurable: false,
    leaseDurable: false,
    rateLimitDurable: false,
    schedulerStatus: config.scheduler,
    expectedIntervalMs: config.scheduler?.expectedIntervalMs ?? 300000,
    lastTickAt: lastTick?.at || null,
    claimed: lastTick?.claimed ?? null,
    succeeded: lastTick?.succeeded ?? null,
    failed: lastTick?.failed ?? null,
    deadLettered: lastTick?.dead_lettered ?? null,
  };

  try {
    const metrics = await buildFoundationMetrics({ productionMode: true });
    foundation = sanitizeFoundationMetrics(metrics);
    const rate = durableRateLimitStatus();
    workforce = {
      capacitySeats: metrics.capacitySeats,
      compiledSeats: metrics.compiledSeats,
      persistedSeats: metrics.persistedSeats,
      mappedSeats: metrics.mappedSeats,
      readyToAllocateSeats: metrics.readyToAllocateSeats,
      allocatedSeats: metrics.allocatedSeats,
      activeInstances: metrics.activeInstances,
      reviewingInstances: 0,
      blockedSeats: 0,
      liveTestedSeats: metrics.liveTestedSeats,
      archetypeCount: metrics.archetypeCount,
      departmentCount: metrics.departmentCount,
      departmentCoverage: metrics.departmentCoverage,
      workflowFamilyCount: metrics.workflowFamilyCount,
      workflowCoverage: metrics.workflowCoverage,
      bootstrapStatus: metrics.bootstrapStatus,
      foundationReady: metrics.foundationReady,
      productionReady: false,
      compilationReady: metrics.compilationReady,
      databaseReady: metrics.databaseReady,
      providerReady: metrics.providerConfigured,
      liveExecutionReady: false,
      providerFreeMessage: metrics.providerFreeMessage,
      executable: foundation.executable,
    };
    provider = {
      configured: metrics.providerConfigured,
      providerName: metrics.providerName,
      freeOnly: true,
      paidFallbackEnabled: false,
      modelPolicyStatus: "free_only_default",
      lastControlledTestAt: null,
      lastControlledTestResult: null,
    };
    runtime = {
      databaseDurable: metrics.databaseDurable,
      queueDurable: metrics.queueDurable,
      leaseDurable: metrics.leaseDurable,
      rateLimitDurable: metrics.rateLimitDurable || rate.durableReady,
      schedulerStatus: config.scheduler,
      expectedIntervalMs: config.scheduler?.expectedIntervalMs ?? 300000,
      lastTickAt: lastTick?.at || null,
      claimed: lastTick?.claimed ?? null,
      succeeded: lastTick?.succeeded ?? null,
      failed: lastTick?.failed ?? null,
      deadLettered: lastTick?.dead_lettered ?? null,
    };
  } catch {
    /* keep defaults */
  }

  let durableScheduler = null;
  let schedulerContract = null;
  try {
    const { buildSchedulerSurfaceSnapshot } = await import(
      "@/lib/core/scheduler-surface"
    );
    durableScheduler = await buildSchedulerSurfaceSnapshot({
      lastTick,
      providerName: provider.providerName || "none",
      liveExecutionReady: false,
    });
    schedulerContract = durableScheduler.healthContract || {
      primaryScheduler: durableScheduler.primaryScheduler,
      schedulerActive: durableScheduler.schedulerActive,
      schedulerTransitionState: durableScheduler.schedulerTransitionState,
      schedulerHealth: durableScheduler.schedulerHealth,
      latestSource: durableScheduler.latestSource || durableScheduler.schedulerSource,
      lastAttemptAt: durableScheduler.lastAttemptAt,
      lastSuccessAt: durableScheduler.lastSuccessAt,
      schedulerDelayMs: durableScheduler.schedulerDelayMs,
      configuredCadenceMs: durableScheduler.configuredCadenceMs,
      canonicalJobName: durableScheduler.canonicalJobName || durableScheduler.schedulerJobName,
      liveExecutionReady: false,
      providerName: provider.providerName || "none",
      githubFallbackShouldSkip: Boolean(durableScheduler.githubFallbackShouldSkip),
    };
    runtime = {
      ...runtime,
      schedulerStatus: durableScheduler,
      expectedIntervalMs: durableScheduler.configuredCadenceMs ?? 300000,
      lastTickAt: lastTick?.at || null,
      claimed: lastTick?.claimed ?? null,
      succeeded: lastTick?.succeeded ?? null,
      failed: lastTick?.failed ?? null,
      deadLettered: lastTick?.dead_lettered ?? null,
      schedulerSource: durableScheduler.schedulerSource,
      schedulerHealth: durableScheduler.schedulerHealth,
      primaryScheduler: durableScheduler.primaryScheduler,
      schedulerTransitionState: durableScheduler.schedulerTransitionState,
      schedulerActive: durableScheduler.schedulerActive,
    };
  } catch {
    /* keep defaults */
  }

  return NextResponse.json({
    ok: true,
    service: "mianx-core",
    time: new Date().toISOString(),
    config: {
      ...config,
      providerStatus: providerOperationalStatus("anthropic"),
      openrouterStatus: providerOperationalStatus("openrouter"),
      scheduler: durableScheduler || config.scheduler,
    },
    productionReadiness,
    lastTick: lastTick
      ? {
          at: lastTick.at || null,
          claimed: lastTick.claimed ?? null,
          succeeded: lastTick.succeeded ?? null,
          failed: lastTick.failed ?? null,
          dead_lettered: lastTick.dead_lettered ?? null,
          duration_ms: lastTick.duration_ms ?? null,
          source: lastTick.source || null,
          latestHttpStatus: lastTick.latestHttpStatus ?? null,
        }
      : null,
    scheduler: durableScheduler,
    /** Stable public contract for GitHub gapless fallback (no secrets). */
    schedulerContract: schedulerContract || {
      primaryScheduler: "supabase_cron",
      schedulerActive: false,
      schedulerTransitionState: "github_fallback_active",
      schedulerHealth: "never_run",
      latestSource: lastTick?.source || "never_run",
      lastAttemptAt: null,
      lastSuccessAt: lastTick?.at || null,
      schedulerDelayMs: null,
      configuredCadenceMs: 300000,
      canonicalJobName: "mianx-runtime-tick-5m",
      liveExecutionReady: false,
      providerName: provider.providerName || "none",
      githubFallbackShouldSkip: false,
    },
    agents: executable.length,
    agentsExecutable: executable.length,
    agentsCatalogTotal: listAgentDefinitions().length,
    agentsRoutable: executable.length,
    integration,
    workforce,
    foundation,
    provider,
    runtime,
    security: {
      projectIsolation: true,
      organizationIsolation: true,
      protectedActionsEnforced: true,
      productionDeploymentBlocked: true,
    },
  });
}
