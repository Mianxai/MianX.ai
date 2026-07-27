import { describe, it, expect, beforeEach, afterEach } from "vitest";

const KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ANTHROPIC_API_KEY",
];

describe("GET /api/core/health", () => {
  const original = { ...process.env };
  beforeEach(() => {
    for (const k of KEYS) delete process.env[k];
  });
  afterEach(() => {
    process.env = { ...original };
  });

  it("responds healthy with only non-secret booleans", async () => {
    const { GET } = await import("./route.js");
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.service).toBe("mianx-core");
    expect(data.config.supabase).toBe(false);
    expect(data.config.providers.anthropic).toBe(false);
    // Operational count = active agents only; the catalog also carries the
    // non-executable draft definitions.
    expect(data.agents).toBe(14);
    expect(data.agentsCatalogTotal).toBeGreaterThan(data.agents);
    expect(data.config.scheduler.mode).toBe("manual");
    expect(data.config.scheduler.automaticProcessing).toBe(false);
    expect(data.config.scheduler.platformCronConfigured).toBe(false);
    expect(data.config.rateLimit.durable).toBe(false);
    // Must never leak secret values (the response uses only boolean config
    // flags, never keys, URLs or role secrets).
    const serialized = JSON.stringify(data);
    expect(serialized).not.toMatch(/service_role/i);
    expect(serialized).not.toMatch(/eyJ|https?:\/\//i);
  });

  it("reflects configured providers without exposing the key", async () => {
    process.env.ANTHROPIC_API_KEY = "super-secret";
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://x.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon";
    const { GET } = await import("./route.js");
    const res = await GET();
    const data = await res.json();
    expect(data.config.supabase).toBe(true);
    expect(data.config.providers.anthropic).toBe(true);
    expect(JSON.stringify(data)).not.toContain("super-secret");
  });
});
