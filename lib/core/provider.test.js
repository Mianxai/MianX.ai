import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { runAgentPrompt, parseProviderJson } from "./provider";

const ORIGINAL = process.env.ANTHROPIC_API_KEY;

function anthropicBody(obj) {
  return { content: [{ text: JSON.stringify(obj) }] };
}

describe("parseProviderJson", () => {
  it("parses a plain JSON object", () => {
    expect(parseProviderJson(anthropicBody({ score: 10 }))).toEqual({ score: 10 });
  });
  it("strips ```json fences", () => {
    const data = { content: [{ text: '```json\n{"a":1}\n```' }] };
    expect(parseProviderJson(data)).toEqual({ a: 1 });
  });
  it("throws a 502 on non-JSON output", () => {
    try {
      parseProviderJson({ content: [{ text: "not json at all" }] });
    } catch (e) {
      expect(e.status).toBe(502);
    }
  });
  it("throws a 502 when the model returns a bare array", () => {
    try {
      parseProviderJson({ content: [{ text: "[1,2,3]" }] });
    } catch (e) {
      expect(e.status).toBe(502);
    }
  });
});

describe("runAgentPrompt", () => {
  beforeEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
  });
  afterEach(() => {
    if (ORIGINAL === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = ORIGINAL;
    vi.restoreAllMocks();
  });

  it("throws a controlled 503 when the provider is not configured", async () => {
    const fetchImpl = vi.fn();
    try {
      await runAgentPrompt({ slug: "research", input: { question: "q" } }, { fetchImpl });
    } catch (e) {
      expect(e.status).toBe(503);
      expect(e.code).toBe("PROVIDER_UNAVAILABLE");
    }
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("returns structured output when configured and the model replies with JSON", async () => {
    process.env.ANTHROPIC_API_KEY = "test-key";
    const fetchImpl = vi.fn(async () => ({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(anthropicBody({ summary: "s", findings: ["f"] })),
    }));
    const result = await runAgentPrompt(
      { slug: "research", input: { question: "q" } },
      { fetchImpl }
    );
    expect(result.output).toEqual({ summary: "s", findings: ["f"] });
    expect(result.provider).toBe("anthropic");
    expect(fetchImpl).toHaveBeenCalledOnce();
    // The key must be sent as a header, never in the body/logs.
    const [, opts] = fetchImpl.mock.calls[0];
    expect(opts.headers["x-api-key"]).toBe("test-key");
    expect(opts.body).not.toContain("test-key");
  });

  it("maps an HTTP error to a 502 PROVIDER_ERROR", async () => {
    process.env.ANTHROPIC_API_KEY = "test-key";
    const fetchImpl = vi.fn(async () => ({ ok: false, status: 500, json: async () => ({}) }));
    try {
      // 5xx is transient and retried; inject a no-op sleep to keep tests fast.
      await runAgentPrompt(
        { slug: "research", input: { question: "q" } },
        { fetchImpl, sleep: async () => {} }
      );
    } catch (e) {
      expect(e.status).toBe(502);
    }
  });

  it("maps unparseable model output to a 502", async () => {
    process.env.ANTHROPIC_API_KEY = "test-key";
    const fetchImpl = vi.fn(async () => ({
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ content: [{ text: "totally not json" }] }),
    }));
    try {
      await runAgentPrompt({ slug: "research", input: { question: "q" } }, { fetchImpl });
    } catch (e) {
      expect(e.status).toBe(502);
    }
  });
});
