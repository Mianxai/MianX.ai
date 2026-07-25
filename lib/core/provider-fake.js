// Deterministic fake AI provider for tests and offline development.
//
// Produces schema-valid outputs for each registry agent without any network
// call, so no real Anthropic request (and no cost) is ever incurred in tests.
// Failure modes are injectable so retry/backoff, dead-letter and validation
// paths can be exercised deterministically.

import { ApiError, ERROR_CODES } from "./errors";

// Deterministic score derived from the input so tests are stable.
function stableScore(seed) {
  let h = 0;
  const s = String(seed || "");
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) % 101;
  return h;
}

export function fakeOutputFor(slug, input = {}) {
  switch (slug) {
    case "lead-intelligence": {
      const score = stableScore(input.email || input.message);
      return {
        score,
        temperature: score >= 70 ? "hot" : score >= 40 ? "warm" : "cold",
        summary: `Deterministic evaluation of lead ${input.email || "unknown"}.`,
        next_actions: ["Review the draft reply", "Schedule a follow-up"],
        draft_reply: `Hello ${input.name || "there"}, thank you for contacting Mianx.ai.`,
      };
    }
    case "research":
      return {
        summary: `Deterministic findings for: ${String(input.question || "").slice(0, 80)}`,
        findings: ["Finding one (reasoned, no external citations)", "Finding two"],
        open_questions: ["What constraints apply?"],
      };
    case "qa-review": {
      const fail = String(input.result || "").includes("FORCE_QA_FAIL");
      return {
        verdict: fail ? "fail" : "pass",
        issues: fail ? ["Result contained a forced QA failure marker."] : [],
        recommendations: fail ? ["Correct the flagged output and re-run."] : [],
      };
    }
    default:
      return { note: "No fake output registered for this agent." };
  }
}

// Creates a runAgentPrompt-compatible fake. Options:
//   failures: number of leading calls that throw a transient error
//   permanentFailure: throw a non-transient error on every call
//   invalidOutput: return schema-invalid output
//   latencyMs / tokens: deterministic metrics
export function createFakeProvider({
  failures = 0,
  permanentFailure = false,
  invalidOutput = false,
  latencyMs = 12,
  inputTokens = 100,
  outputTokens = 50,
} = {}) {
  let calls = 0;
  const fake = async ({ slug, model, input }) => {
    calls += 1;
    fake.calls = calls;
    if (permanentFailure) {
      const err = new ApiError(
        502,
        ERROR_CODES.PROVIDER_ERROR,
        "Fake provider permanent failure."
      );
      err.transient = false;
      throw err;
    }
    if (calls <= failures) {
      const err = new ApiError(
        502,
        ERROR_CODES.PROVIDER_ERROR,
        "Fake provider transient failure (HTTP 429)."
      );
      err.status = 429;
      err.transient = true;
      throw err;
    }
    const output = invalidOutput
      ? { unexpected: "shape" }
      : fakeOutputFor(slug, input);
    return {
      output,
      provider: "none",
      model: model || "fake-model",
      usage: { input_tokens: inputTokens, output_tokens: outputTokens },
      latencyMs,
      estimatedCost: 0,
    };
  };
  fake.calls = 0;
  return fake;
}
