import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { runAgentPrompt, estimateCost, providerBackoffMs } from "./provider";
import { validateAgentOutput, getAgentDefinition } from "./agents";
import { createFakeProvider, fakeOutputFor } from "./provider-fake";
import { PROVIDER_LIMITS } from "./constants";

const ORIGINAL = process.env.ANTHROPIC_API_KEY;
const noSleep = async () => {};

function okResponse(obj, usage = { input_tokens: 100, output_tokens: 50 }) {
  return {
    ok: true,
    status: 200,
    text: async () => JSON.stringify({ content: [{ text: JSON.stringify(obj) }], usage }),
  };
}

beforeEach(() => {
  process.env.ANTHROPIC_API_KEY = "test-key";
});

afterEach(() => {
  if (ORIGINAL === undefined) delete process.env.ANTHROPIC_API_KEY;
  else process.env.ANTHROPIC_API_KEY = ORIGINAL;
  vi.restoreAllMocks();
});

describe("model allowlist", () => {
  it("rejects an unlisted model before any network request", async () => {
    const fetchImpl = vi.fn();
    await expect(
      runAgentPrompt(
        { slug: "research", model: "claude-evil-99", input: { question: "q" } },
        { fetchImpl, sleep: noSleep }
      )
    ).rejects.toMatchObject({ status: 400, transient: false });
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});

describe("input size limit", () => {
  it("rejects oversized input without calling the provider", async () => {
    const fetchImpl = vi.fn();
    await expect(
      runAgentPrompt(
        {
          slug: "research",
          input: { question: "x".repeat(PROVIDER_LIMITS.maxInputBytes + 10) },
        },
        { fetchImpl, sleep: noSleep }
      )
    ).rejects.toMatchObject({ status: 400 });
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});

describe("retry policy", () => {
  it("retries transient 429 responses with backoff, then succeeds", async () => {
    let calls = 0;
    const fetchImpl = vi.fn(async () => {
      calls += 1;
      if (calls < 3) return { ok: false, status: 429 };
      return okResponse({ summary: "s", findings: ["f"] });
    });
    const sleeps = [];
    const result = await runAgentPrompt(
      { slug: "research", input: { question: "q" } },
      { fetchImpl, sleep: async (ms) => sleeps.push(ms), random: () => 0 }
    );
    expect(result.output.summary).toBe("s");
    expect(fetchImpl).toHaveBeenCalledTimes(3);
    // Exponential: 500ms then 1000ms with zero jitter.
    expect(sleeps).toEqual([500, 1000]);
  });

  it("retries 5xx and network failures", async () => {
    let calls = 0;
    const fetchImpl = vi.fn(async () => {
      calls += 1;
      if (calls === 1) throw new Error("ECONNRESET");
      if (calls === 2) return { ok: false, status: 503 };
      return okResponse({ summary: "s", findings: [] });
    });
    const result = await runAgentPrompt(
      { slug: "research", input: { question: "q" } },
      { fetchImpl, sleep: noSleep }
    );
    expect(result.output.summary).toBe("s");
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it("never retries a permanent 4xx", async () => {
    const fetchImpl = vi.fn(async () => ({ ok: false, status: 401 }));
    await expect(
      runAgentPrompt(
        { slug: "research", input: { question: "q" } },
        { fetchImpl, sleep: noSleep }
      )
    ).rejects.toMatchObject({ status: 502, transient: false });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("gives up after maxRetries transient failures with a transient error", async () => {
    const fetchImpl = vi.fn(async () => ({ ok: false, status: 429 }));
    await expect(
      runAgentPrompt(
        { slug: "research", input: { question: "q" } },
        { fetchImpl, sleep: noSleep, maxRetries: 2 }
      )
    ).rejects.toMatchObject({ status: 502, transient: true });
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it("backoff grows exponentially with bounded jitter", () => {
    const random = () => 0.5;
    expect(providerBackoffMs(0, { random })).toBe(500 + 125);
    expect(providerBackoffMs(1, { random })).toBe(1000 + 125);
    expect(providerBackoffMs(10, { random })).toBe(
      PROVIDER_LIMITS.retryCapMs + 125
    );
  });
});

describe("usage, latency and cost capture", () => {
  it("captures token usage and estimated cost on success", async () => {
    const fetchImpl = vi.fn(async () =>
      okResponse({ summary: "s", findings: [] }, { input_tokens: 1000, output_tokens: 500 })
    );
    const result = await runAgentPrompt(
      { slug: "research", input: { question: "q" } },
      { fetchImpl, sleep: noSleep }
    );
    expect(result.usage).toEqual({ input_tokens: 1000, output_tokens: 500 });
    expect(result.estimatedCost).toBe(estimateCost("claude-sonnet-4-6", 1000, 500));
    expect(typeof result.latencyMs).toBe("number");
  });

  it("estimateCost is deterministic and returns null for unknown models", () => {
    expect(estimateCost("claude-sonnet-4-6", 1_000_000, 0)).toBe(3);
    expect(estimateCost("claude-sonnet-4-6", 0, 1_000_000)).toBe(15);
    expect(estimateCost("unknown-model", 1000, 1000)).toBeNull();
  });
});

describe("output size limit and sanitized errors", () => {
  it("rejects an oversized provider response", async () => {
    const fetchImpl = vi.fn(async () => ({
      ok: true,
      status: 200,
      text: async () => "x".repeat(PROVIDER_LIMITS.maxOutputBytes + 10),
    }));
    await expect(
      runAgentPrompt(
        { slug: "research", input: { question: "q" } },
        { fetchImpl, sleep: noSleep }
      )
    ).rejects.toMatchObject({ status: 502, transient: false });
  });

  it("never includes the API key in any thrown error", async () => {
    const fetchImpl = vi.fn(async () => ({ ok: false, status: 400 }));
    try {
      await runAgentPrompt(
        { slug: "research", input: { question: "q" } },
        { fetchImpl, sleep: noSleep }
      );
    } catch (e) {
      expect(JSON.stringify({ m: e.message, c: e.code })).not.toContain("test-key");
    }
  });
});

describe("fake provider ↔ registry schema contract", () => {
  it.each([
    "lead-intelligence",
    "research",
    "qa-review",
    "workflow-orchestrator",
    "requirements-analyst",
    "engineering-planning",
    "test-qa",
    "security-review",
    "release-readiness",
    "follow-up-draft",
  ])(
    "fake %s output passes the agent outputSchema",
    (slug) => {
      const def = getAgentDefinition(slug);
      const output = fakeOutputFor(slug, {
        email: "a@b.co",
        message: "m",
        question: "q",
        result: "r",
        acceptance_criteria: "c",
        objective: "o",
        request: "req",
        requirements: "reqs",
        change_summary: "cs",
        evidence: "e",
        qa_verdict: "pass",
        security_verdict: "pass",
        context: "ctx",
        audience: "team",
      });
      const { valid, errors } = validateAgentOutput(def, output);
      expect(errors).toEqual({});
      expect(valid).toBe(true);
    }
  );

  it("createFakeProvider fails transiently N times then succeeds", async () => {
    const fake = createFakeProvider({ failures: 2 });
    await expect(fake({ slug: "research", input: {} })).rejects.toMatchObject({
      transient: true,
    });
    await expect(fake({ slug: "research", input: {} })).rejects.toMatchObject({
      transient: true,
    });
    const ok = await fake({ slug: "research", input: {} });
    expect(ok.output.summary).toBeTruthy();
  });

  it("validateAgentOutput rejects wrong shapes", () => {
    const def = getAgentDefinition("qa-review");
    expect(validateAgentOutput(def, { verdict: "maybe" }).valid).toBe(false);
    expect(validateAgentOutput(def, { verdict: "pass", issues: "no", recommendations: [] }).valid).toBe(false);
    expect(
      validateAgentOutput(def, { verdict: "pass", issues: [], recommendations: [] }).valid
    ).toBe(true);
  });
});
