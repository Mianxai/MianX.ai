#!/usr/bin/env node
/**
 * Founder-gated live activation check — max 3 provider calls.
 * NEVER run from CI/Cursor without explicit Founder authorization.
 */

const required = [
  "OPENROUTER_API_KEY",
  "ALLOW_LIVE_PROVIDER_TEST",
];

for (const k of required) {
  if (!process.env[k]?.trim()) {
    console.error(`Missing ${k}. Live activation check aborted.`);
    process.exit(2);
  }
}
if (process.env.ALLOW_LIVE_PROVIDER_TEST !== "true") {
  console.error("ALLOW_LIVE_PROVIDER_TEST must be true");
  process.exit(2);
}
if (process.env.OPENROUTER_FREE_ONLY === "false") {
  console.error("OPENROUTER_FREE_ONLY must remain true for this check");
  process.exit(2);
}
if (!process.argv.includes("--confirm")) {
  console.error("Pass --confirm and --project <uuid>");
  process.exit(2);
}

const { runLiveOpenRouterSmoke, liveSmokeReadiness } = await import(
  "../lib/core/real-agent/harness.js"
);

const projectIdx = process.argv.indexOf("--project");
const projectId = projectIdx >= 0 ? process.argv[projectIdx + 1] : null;
if (!projectId) {
  console.error("Missing --project <safe-uuid>");
  process.exit(2);
}

console.log(JSON.stringify({ readiness: liveSmokeReadiness(), maxCalls: 3 }, null, 2));
const result = await runLiveOpenRouterSmoke({
  projectId,
  confirm: true,
  maxRequests: 3,
});
console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
