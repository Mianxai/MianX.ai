/**
 * Test-only fake OpenAI Responses client for dry-run rehearsal.
 * Impossible to select from Production Admin/API/env.
 */

import { createHash, randomUUID } from "node:crypto";

export const FAKE_PROVIDER_NAME = "fake_openai_test_only";

/**
 * Hard guard: fake provider may only be constructed under Vitest / NODE_ENV=test.
 * No Production env flag can enable it. No Admin/API/DB selection path.
 */
export function assertFakeProviderAllowedInCurrentRuntime() {
  if (process.env.VERCEL_ENV === "production") {
    throw new Error("FAKE_PROVIDER_FORBIDDEN_IN_PRODUCTION");
  }
  if (process.env.NODE_ENV === "production" && !process.env.VITEST) {
    throw new Error("FAKE_PROVIDER_FORBIDDEN_IN_PRODUCTION");
  }
  const testRuntime =
    process.env.VITEST === "true" ||
    process.env.NODE_ENV === "test" ||
    Boolean(process.env.VITEST);
  if (!testRuntime) {
    throw new Error("FAKE_PROVIDER_TEST_ONLY");
  }
  // Explicitly reject any env attempt to enable fakes (including USE_FAKE_PROVIDER).
  if (String(process.env.LIVE_AGENT_FAKE_PROVIDER || "").trim()) {
    throw new Error("FAKE_PROVIDER_ENV_FLAG_FORBIDDEN");
  }
  if (String(process.env.USE_FAKE_PROVIDER || "").trim()) {
    throw new Error("FAKE_PROVIDER_ENV_FLAG_FORBIDDEN");
  }
}

/** Reject untrusted providerName selection of the fake provider. */
export function rejectFakeProviderNameSelection(providerName) {
  const name = String(providerName || "").trim().toLowerCase();
  if (!name) return { ok: true };
  if (name === FAKE_PROVIDER_NAME || name.includes("fake") || name === "mock") {
    return {
      ok: false,
      code: "FAKE_PROVIDER_SELECTION_REJECTED",
      message: "Fake/test providers cannot be selected via API, Admin, DB, or env",
    };
  }
  return { ok: true };
}

/**
 * @param {{
 *   response?: object|null,
 *   error?: Error|null,
 *   delayMs?: number,
 *   omitRequestId?: boolean,
 *   invalidJson?: boolean,
 * }} opts
 */
export function createFakeOpenAIResponsesClient(opts = {}) {
  assertFakeProviderAllowedInCurrentRuntime();
  let callCount = 0;
  return {
    providerName: FAKE_PROVIDER_NAME,
    testOnly: true,
    productionForbidden: true,
    getCallCount: () => callCount,
    responses: {
      create: async (request, _opts) => {
        callCount += 1;
        if (opts.delayMs) {
          await new Promise((r) => setTimeout(r, opts.delayMs));
        }
        if (opts.error) throw opts.error;
        if (opts.invalidJson) {
          return {
            id: opts.omitRequestId ? undefined : `fake_resp_${randomUUID()}`,
            status: "completed",
            model: request?.model || "gpt-5.4-mini",
            output_text: "not-json",
            usage: { input_tokens: 10, output_tokens: 5, total_tokens: 15 },
            providerEvidenceMetadata: { fake: true, simulated: true },
          };
        }
        const base = opts.response || {
          id: `fake_resp_${randomUUID()}`,
          status: "completed",
          model: request?.model || "gpt-5.4-mini",
          output_text: JSON.stringify({
            summary: "Fake dry-run architecture review.",
            architectureFindings: ["Boundaries clear"],
            securityFindings: ["No tools"],
            reliabilityFindings: ["Lease required"],
            dataIsolationFindings: ["Project scoped"],
            operationalRisks: ["Fake provider only"],
            recommendations: ["Keep Production switches off"],
            blockers: [],
            confidence: 0.9,
            requiresFounderDecision: true,
          }),
          usage: { input_tokens: 100, output_tokens: 50, total_tokens: 150 },
        };
        if (opts.omitRequestId) {
          const { id, ...rest } = base;
          return { ...rest, providerEvidenceMetadata: { fake: true, simulated: true } };
        }
        return {
          ...base,
          providerEvidenceMetadata: { fake: true, simulated: true, mock: true },
        };
      },
    },
  };
}

export function fakeProviderFingerprint(parts = {}) {
  return createHash("sha256")
    .update(JSON.stringify({ kind: FAKE_PROVIDER_NAME, ...parts }))
    .digest("hex");
}
