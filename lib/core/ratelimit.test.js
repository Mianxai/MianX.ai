import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  rateLimit,
  rateLimitBackendStatus,
  consumeRateLimit,
  setDurableRateLimitAdapter,
  clearDurableRateLimitAdapter,
  _resetRateLimits,
  RATE_LIMIT_BACKEND,
} from "./ratelimit";

describe("rateLimit honesty contract", () => {
  const originalUrl = process.env.RATE_LIMIT_DURABLE_URL;
  const originalToken = process.env.RATE_LIMIT_DURABLE_TOKEN;

  beforeEach(() => {
    _resetRateLimits();
    clearDurableRateLimitAdapter();
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

  it("reports durable:false and in-memory by default", () => {
    const status = rateLimitBackendStatus();
    expect(status.durable).toBe(false);
    expect(status.backend).toBe(RATE_LIMIT_BACKEND.MEMORY);
    expect(status.adapterActive).toBe(false);
  });

  it("does not claim durable:true merely because RATE_LIMIT_DURABLE_URL is set", () => {
    process.env.RATE_LIMIT_DURABLE_URL = "https://example.upstash.io";
    const status = rateLimitBackendStatus();
    expect(status.urlConfigured).toBe(true);
    expect(status.tokenConfigured).toBe(false);
    expect(status.configured).toBe(false);
    expect(status.durable).toBe(false);
    expect(status.backend).toBe(RATE_LIMIT_BACKEND.MEMORY);
  });

  it("reports durable only when a working adapter is injected", async () => {
    setDurableRateLimitAdapter(async () => ({
      allowed: true,
      remaining: 9,
      resetMs: 1000,
    }));
    const status = rateLimitBackendStatus();
    expect(status.durable).toBe(true);
    expect(status.backend).toBe(RATE_LIMIT_BACKEND.DURABLE);

    const result = await consumeRateLimit("k", { max: 10 });
    expect(result.durable).toBe(true);
    expect(result.backend).toBe(RATE_LIMIT_BACKEND.DURABLE);
  });

  it("falls back to memory when the durable adapter fails", async () => {
    setDurableRateLimitAdapter(async () => {
      throw new Error("redis down");
    });
    const result = await consumeRateLimit("fallback-key", { max: 5 });
    expect(result.durable).toBe(false);
    expect(result.backend).toBe(RATE_LIMIT_BACKEND.MEMORY);
    expect(rateLimitBackendStatus().durable).toBe(true); // adapter still injected
  });

  it("throws 429 with durable:false details for the sync guard", () => {
    rateLimit("burst", { max: 2, windowMs: 60_000 });
    rateLimit("burst", { max: 2, windowMs: 60_000 });
    try {
      rateLimit("burst", { max: 2, windowMs: 60_000 });
      expect.unreachable("should throw");
    } catch (err) {
      expect(err.status).toBe(429);
      expect(err.details?.durable).toBe(false);
    }
  });
});
