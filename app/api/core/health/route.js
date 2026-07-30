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
} from "@/lib/core/workforce-i2";

export const dynamic = "force-dynamic";

/** PUBLIC health — never returns secrets. Never treats compiled seats as persisted. */
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
  let runtime = {
    databaseDurable: false,
    queueDurable: false,
    leaseDurable: false,
    rateLimitDurable: false,
    schedulerStatus: config.scheduler,
    lastTickAt: lastTick?.at || null,
    claimed: lastTick?.claimed ?? null,
    succeeded: lastTick?.succeeded ?? null,
    failed: lastTick?.failed ?? null,
    deadLettered: lastTick?.dead_lettered ?? null,
  };

  try {
    const v = await runWorkforceVerify({ productionMode: true });
    const oneKey = oneKeyActivationStatus();
    const rate = durableRateLimitStatus();
    workforce = {
      capacitySeats: v.capacityBaseline,
      compiledSeats: v.compiledSeats,
      persistedSeats: v.persistedSeats,
      mappedSeats: v.mappedSeats,
      readyToAllocateSeats: v.readyToAllocateSeats,
      allocatedSeats: v.allocatedSeats,
      activeInstances: v.activeInstances,
      reviewingInstances: v.reviewingInstances,
      blockedSeats: v.blockedSeats,
      liveTestedSeats: v.liveTestedSeats,
      archetypeCount: v.archetypeCount,
      departmentCoverage: v.departmentCoverage,
      workflowCoverage: v.workflowCoverage,
      bootstrapStatus: v.bootstrapStatus,
      foundationReady: v.foundationReady,
      productionReady: false,
      compilationReady: v.compilationReady,
      databaseReady: v.databaseReady,
      providerFreeMessage: v.providerFreeMessage,
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
      databaseDurable: v.databaseDurable,
      queueDurable: v.queueDurable,
      leaseDurable: v.leasesDurable,
      rateLimitDurable: v.rateLimitDurable || rate.durableReady,
      schedulerStatus: v.schedulerStatus || config.scheduler,
      lastTickAt: lastTick?.at || null,
      claimed: lastTick?.claimed ?? null,
      succeeded: lastTick?.succeeded ?? null,
      failed: lastTick?.failed ?? null,
      deadLettered: lastTick?.dead_lettered ?? null,
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
