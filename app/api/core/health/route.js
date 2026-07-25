import { NextResponse } from "next/server";
import { runtimeConfigStatus } from "@/lib/core/config";
import { listAgentDefinitions } from "@/lib/core/agents";

// Reads env at request time only.
export const dynamic = "force-dynamic";

// PUBLIC health probe. Exposes only non-secret booleans and the count of
// registered agent definitions — never keys, URLs or credentials.
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "mianx-core",
    time: new Date().toISOString(),
    config: runtimeConfigStatus(),
    agents: listAgentDefinitions().length,
  });
}
