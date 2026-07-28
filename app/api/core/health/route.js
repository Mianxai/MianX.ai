import { NextResponse } from "next/server";
import { runtimeConfigStatus, providerOperationalStatus } from "@/lib/core/config";
import {
  listAgentDefinitions,
  listActiveAgentDefinitions,
  isAgentExecutable,
} from "@/lib/core/agents";
import { productionReadinessStatusAsync } from "@/lib/core/production-readiness";
import { buildIntegrationReadinessAsync } from "@/lib/core/integration";
import * as repo from "@/lib/core/repo";

// Reads env at request time only.
export const dynamic = "force-dynamic";

// PUBLIC health probe. Exposes only non-secret booleans and agent definition
// counts — never keys, URLs or credentials.
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

  return NextResponse.json({
    ok: true,
    service: "mianx-core",
    time: new Date().toISOString(),
    config: {
      ...config,
      providerStatus: providerOperationalStatus("anthropic"),
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
  });
}
