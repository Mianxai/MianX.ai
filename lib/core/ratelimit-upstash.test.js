import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  createUpstashRateLimitAdapter,
  tryCreateDurableRateLimitAdapterFromEnv,
} from "./ratelimit-upstash";
import {
  clearDurableRateLimitAdapter,
  consumeRateLimit,
  rateLimitBackendStatus,
  _resetRateLimits,
} from "./ratelimit";

describe("Upstash rate-limit adapter (optional)", () => {
  const originalUrl = process.env.RATE_LIMIT_DURABLE_URL;
  const originalToken = process.env.RATE_LIMIT_DURABLE_TOKEN;

  beforeEach(() => {
    clearDurableRateLimitAdapter();
    _resetRateLimits();
    delete process.env.RATE_LIMIT_DURABLE_URL;
    delete process.env.RATE_LIMIT_DURABLE_TOKEN;
  });

  afterEach(() => {
    clearDurableRateLimitAdapter();
    _resetRateLimits();
    if (originalUrl === undefined) delete process.env.RATE_LIMIT_DURABLE_URL;
    else process.env.RATE_LIMIT_DURABLE_URL = originalUrl;
    if (originalToken === undefined) delete process.env.RATE_LIMIT_DURABLE_TOKEN;
    else process.env.RATE_LIMIT_DURABLE_TOKEN = originalToken;
  });

  it("returns null when env is missing (no npm dependency required)", () => {
    expect(createUpstashRateLimitAdapter()).toBeNull();
    expect(tryCreateDurableRateLimitAdapterFromEnv()).toBeNull();
  });

  it("returns null when only URL is set", () => {
    expect(
      createUpstashRateLimitAdapter({
        url: "https://example.upstash.io",
        token: "",
      })
    ).toBeNull();
  });

  it("consumes via mocked fetch pipeline when both env vars present", async () => {
    const fetchImpl = vi.fn(async () => ({
      ok: true,
      json: async () => [{ result: 2 }, { result: 1 }, { result: 55_000 }],
    }));
    const adapter = createUpstashRateLimitAdapter({
      url: "https://example.upstash.io",
      token: "test-token",
      fetchImpl,
    });
    expect(adapter).toBeTypeOf("function");
    const result = await adapter("user:1", { max: 10, windowMs: 60_000 });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(8);
    expect(result.resetMs).toBe(55_000);
    expect(fetchImpl).toHaveBeenCalledOnce();
    const [, init] = fetchImpl.mock.calls[0];
    expect(init.headers.Authorization).toBe("Bearer test-token");
    expect(JSON.parse(init.body)[0][0]).toBe("INCR");
  });

  it("denies when count exceeds max", async () => {
    const adapter = createUpstashRateLimitAdapter({
      url: "https://example.upstash.io",
      token: "t",
      fetchImpl: async () => ({
        ok: true,
        json: async () => [{ result: 11 }, { result: 0 }, { result: 1000 }],
      }),
    });
    const result = await adapter("burst", { max: 10 });
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("wires from env into consumeRateLimit and reports durable when active", async () => {
    process.env.RATE_LIMIT_DURABLE_URL = "https://example.upstash.io";
    process.env.RATE_LIMIT_DURABLE_TOKEN = "test-token";
    const fetchImpl = vi.fn(async () => ({
      ok: true,
      json: async () => [{ result: 1 }, { result: 1 }, { result: 60_000 }],
    }));
    // Inject via factory with mocked fetch, then set on module.
    const { setDurableRateLimitAdapter } = await import("./ratelimit");
    setDurableRateLimitAdapter(
      createUpstashRateLimitAdapter({
        url: process.env.RATE_LIMIT_DURABLE_URL,
        token: process.env.RATE_LIMIT_DURABLE_TOKEN,
        fetchImpl,
      })
    );
    const result = await consumeRateLimit("k", { max: 5 });
    expect(result.durable).toBe(true);
    expect(rateLimitBackendStatus().durable).toBe(true);
    expect(rateLimitBackendStatus().tokenConfigured).toBe(true);
  });

  it("falls back to memory when fetch fails", async () => {
    const { setDurableRateLimitAdapter } = await import("./ratelimit");
    setDurableRateLimitAdapter(
      createUpstashRateLimitAdapter({
        url: "https://example.upstash.io",
        token: "t",
        fetchImpl: async () => {
          throw new Error("network");
        },
      })
    );
    const result = await consumeRateLimit("fallback", { max: 5 });
    expect(result.durable).toBe(false);
    expect(result.backend).toBe("in-memory");
  });
});
