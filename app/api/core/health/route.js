import { NextResponse } from "next/server";
import { runtimeConfigStatus } from "@/lib/core/config";
import {
  listAgentDefinitions,
  listActiveAgentDefinitions,
} from "@/lib/core/agents";

// Reads env at request time only.
export const dynamic = "force-dynamic";

// PUBLIC health probe. Exposes only non-secret booleans and agent definition
// counts — never keys, URLs or credentials.
//
// `agents` is the operational count: active, executable definitions only.
// `agentsCatalogTotal` also counts draft definitions, which are catalog-visible
// contracts that the runtime refuses to register.
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "mianx-core",
    time: new Date().toISOString(),
    config: runtimeConfigStatus(),
    agents: listActiveAgentDefinitions().length,
    agentsCatalogTotal: listAgentDefinitions().length,
  });
}
