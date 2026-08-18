#!/usr/bin/env node
/**
 * Founder-gated live OpenRouter smoke test.
 * Refuses to run unless ALLOW_LIVE_PROVIDER_TEST=true and OPENROUTER_API_KEY are set.
 * Never enable from CI. Max 3 provider calls.
 */

import { runLiveOpenRouterSmoke, liveSmokeReadiness } from "../lib/core/real-agent/harness.js";

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] || fallback;
}

async function main() {
  const projectId = arg("--project");
  const maxRequests = Number(arg("--max-requests", "3"));
  const maxTokens = Number(arg("--max-tokens", "4000"));
  const confirm = process.argv.includes("--confirm");

  if (!confirm || !projectId) {
    console.log(JSON.stringify({ ok: false, readiness: liveSmokeReadiness() }, null, 2));
    console.error(
      "Usage: ALLOW_LIVE_PROVIDER_TEST=true OPENROUTER_API_KEY=… npm run agents:live-smoke -- --project <uuid> --confirm"
    );
    process.exit(2);
  }

  const result = await runLiveOpenRouterSmoke({
    projectId,
    maxRequests,
    maxTokens,
    confirm: true,
  });
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
}

main().catch((err) => {
  console.error(err?.message || err);
  process.exit(1);
});
