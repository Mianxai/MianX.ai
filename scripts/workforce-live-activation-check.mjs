#!/usr/bin/env node
/**
 * Founder-gated live activation check — max 3 provider calls.
 * NEVER run from CI/Cursor/Preview without explicit Founder authorization.
 */

const CANONICAL_FOUNDER_PROOF = "61d3b1fd-c260-479b-9289-0c75f977e892";

function fail(msg, code = 2) {
  console.error(msg);
  process.exit(code);
}

if (
  process.env.CI === "true" ||
  process.env.GITHUB_ACTIONS === "true" ||
  process.env.VERCEL_ENV === "preview"
) {
  fail("Refuse: live activation check cannot run in CI/Preview.");
}

if (!process.env.OPENROUTER_API_KEY?.trim()) {
  fail("Missing OPENROUTER_API_KEY. Live activation check aborted.");
}
if (process.env.ALLOW_LIVE_PROVIDER_TEST !== "true") {
  fail("ALLOW_LIVE_PROVIDER_TEST must be true");
}
if (process.env.OPENROUTER_FREE_ONLY === "false") {
  fail("OPENROUTER_FREE_ONLY must remain true for this check");
}
if (process.env.OPENROUTER_PAID_FALLBACK_ENABLED === "true") {
  fail("OPENROUTER_PAID_FALLBACK_ENABLED must be false");
}

const maxReq = Number(process.env.OPENROUTER_MAX_REQUESTS_PER_RUN || 3);
if (!(maxReq > 0 && maxReq <= 3)) {
  fail("OPENROUTER_MAX_REQUESTS_PER_RUN must be 1–3");
}
const maxTok = Number(process.env.OPENROUTER_MAX_TOKENS_PER_RUN || 4000);
if (!(maxTok > 0)) {
  fail("OPENROUTER_MAX_TOKENS_PER_RUN must be configured (>0)");
}

if (!process.argv.includes("--confirm")) {
  fail("Pass --confirm and --project <uuid>");
}

const projectIdx = process.argv.indexOf("--project");
const projectId = projectIdx >= 0 ? process.argv[projectIdx + 1] : null;
if (!projectId) {
  fail("Missing --project <safe-uuid>");
}
if (
  projectId === CANONICAL_FOUNDER_PROOF &&
  !process.argv.includes("--allow-founder-proof")
) {
  fail("Refusing canonical Founder Proof project without --allow-founder-proof");
}
if (
  !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    projectId
  )
) {
  fail("INVALID_PROJECT_UUID — do not paste documentation placeholders like <DISPOSABLE_PROJECT_UUID>");
}

const { runLiveOpenRouterSmoke, liveSmokeReadiness } = await import(
  "../lib/core/real-agent/harness.js"
);

console.log(
  JSON.stringify(
    {
      readiness: liveSmokeReadiness(),
      maxCalls: maxReq,
      maxTokens: maxTok,
      toolsDefault: "disabled (read-only only if --allow-tools)",
      productionDeployTools: "blocked",
      emailCustomerPaymentLegalTools: "disabled",
    },
    null,
    2
  )
);

const result = await runLiveOpenRouterSmoke({
  projectId,
  confirm: true,
  maxRequests: maxReq,
  maxTokens: maxTok,
  allowFounderProof: process.argv.includes("--allow-founder-proof"),
  allowTools: process.argv.includes("--allow-tools"),
});
console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
