#!/usr/bin/env node
/**
 * Gated software-house acceptance — MUST NOT run in CI/Cursor without Founder auth.
 * Does not call providers unless ALLOW_LIVE_PROVIDER_TEST=true and --confirm.
 */

const required = ["OPENROUTER_API_KEY", "ALLOW_LIVE_PROVIDER_TEST"];
for (const k of required) {
  if (!process.env[k]?.trim()) {
    console.error(`Missing ${k}. Software-house acceptance aborted.`);
    process.exit(2);
  }
}
if (process.env.ALLOW_LIVE_PROVIDER_TEST !== "true") {
  console.error("ALLOW_LIVE_PROVIDER_TEST must be true");
  process.exit(2);
}
if (process.env.OPENROUTER_FREE_ONLY === "false") {
  console.error("OPENROUTER_FREE_ONLY must remain true");
  process.exit(2);
}
if (!process.argv.includes("--confirm")) {
  console.error("Pass --project <uuid> --confirm");
  process.exit(2);
}
const idx = process.argv.indexOf("--project");
const projectId = idx >= 0 ? process.argv[idx + 1] : null;
if (!projectId) {
  console.error("Missing --project");
  process.exit(2);
}

const CANONICAL_PROOF = "61d3b1fd-c260-479b-9289-0c75f977e892";
if (projectId === CANONICAL_PROOF && !process.argv.includes("--allow-founder-proof")) {
  console.error("Refusing canonical Founder Proof project without --allow-founder-proof");
  process.exit(2);
}

console.log(
  JSON.stringify(
    {
      ok: false,
      ready: true,
      executed: false,
      note: "Command scaffold ready. Invoke live OpenRouter multi-agent path only under Founder authorization. Not executed in this process stub beyond gate checks.",
      projectId,
      maxProviderRequests: 3,
      objective:
        "Create a production-safe technical specification for a simple internal status-page module. Produce requirements, architecture, test plan, security review and release proposal. Do not deploy.",
    },
    null,
    2
  )
);
// Intentionally do not call providers here — Founder runbook uses live-activation-check first,
// then expands to multi-agent acceptance under separate authorization.
process.exit(0);
