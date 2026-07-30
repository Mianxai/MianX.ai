import { NextResponse } from "next/server";
import {
  runtimeConfigStatus,
  providerOperationalStatus,
  isProviderConfigured,
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
  runWorkforceVerify,
  oneKeyActivationStatus,
  durableRateLimitStatus,
  INSTANCE_DURABILITY,
} from "@/lib/core/workforce-i2";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/** PUBLIC health — never returns secrets. */
export async function GET() {
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

  let workforce = {
    capacitySeats: 445,
    persistedSeats: null,
    mappedSeats: null,
    readyToAllocateSeats: null,
    allocatedSeats: null,
    activeInstances: null,
    reviewingInstances: null,
    blockedSeats: null,
    liveTestedSeats: 0,
    archetypeCount: null,
    departmentCoverage: null,
    workflowCoverage: null,
    bootstrapStatus: "unknown",
  };
  let provider = {
    configured: isProviderConfigured("openrouter"),
    providerName: isProviderConfigured("openrouter") ? "openrouter" : "none",
    freeOnly: true,
    paidFallbackEnabled: false,
    modelPolicyStatus: "free_only_default",
    lastControlledTestAt: null,
    lastControlledTestResult: null,
  };
  const durability = INSTANCE_DURABILITY.describe({
    supabaseConfigured: isSupabaseConfigured(),
  });
  let runtime = {
    databaseDurable: isSupabaseConfigured(),
    queueDurable: isSupabaseConfigured(),
    leaseDurable: durability.leasesDurable,
    rateLimitDurable: false,
    schedulerStatus: config.scheduler,
    lastTickAt: lastTick?.at || null,
    claimed: lastTick?.claimed ?? null,
    succeeded: lastTick?.succeeded ?? null,
    failed: lastTick?.failed ?? null,
    deadLettered: lastTick?.dead_lettered ?? null,
  };

  try {
    const v = runWorkforceVerify();
    const oneKey = oneKeyActivationStatus();
    const rate = durableRateLimitStatus();
    workforce = {
      capacitySeats: v.capacityBaseline,
      persistedSeats: v.persistedSeats,
      mappedSeats: v.mappedSeats,
      readyToAllocateSeats: v.availableSeats,
      allocatedSeats: v.allocatedSeats,
      activeInstances: v.activeInstances,
      reviewingInstances: 0,
      blockedSeats: v.blockedSeats,
      liveTestedSeats: v.liveTestedCount,
      archetypeCount: v.archetypeCount,
      departmentCoverage: v.departmentCoverage,
      workflowCoverage: v.workflowCoverage,
      bootstrapStatus: isSupabaseConfigured() ? "ready_when_migrated" : "memory_bootstrap",
    };
    provider = {
      configured: Boolean(oneKey.keyPresent),
      providerName: oneKey.keyPresent ? "openrouter" : "none",
      freeOnly: true,
      paidFallbackEnabled: false,
      modelPolicyStatus: "free_only_default",
      lastControlledTestAt: null,
      lastControlledTestResult: null,
    };
    runtime = {
      ...runtime,
      rateLimitDurable: rate.durableReady,
      leaseDurable: durability.leasesDurable,
      schedulerStatus: v.schedulerStatus || config.scheduler,
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
        }
      : null,
    agents: executable.length,
    agentsExecutable: executable.length,
    agentsCatalogTotal: listAgentDefinitions().length,
    agentsRoutable: executable.length,
    integration,
    workforce,
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
