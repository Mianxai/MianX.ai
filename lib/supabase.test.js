import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const ENV_KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];

function clearSupabaseEnv() {
  for (const key of ENV_KEYS) delete process.env[key];
}

describe("lib/supabase", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    clearSupabaseEnv();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("reports not configured when env vars are absent — this is the exact condition that used to crash `next build`", async () => {
    const { isSupabaseConfigured } = await import("./supabase.js");
    expect(isSupabaseConfigured()).toBe(false);
  });

  it("getSupabase() returns null instead of throwing when env vars are absent", async () => {
    const { getSupabase } = await import("./supabase.js");
    expect(() => getSupabase()).not.toThrow();
    expect(getSupabase()).toBeNull();
  });

  it("getSupabaseAdmin() returns null instead of throwing when env vars are absent", async () => {
    const { getSupabaseAdmin } = await import("./supabase.js");
    expect(() => getSupabaseAdmin()).not.toThrow();
    expect(getSupabaseAdmin()).toBeNull();
  });

  it("reports configured and returns a client once the required env vars are set", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example-project.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";

    const { isSupabaseConfigured, getSupabase, getSupabaseAdmin } = await import(
      "./supabase.js"
    );
    expect(isSupabaseConfigured()).toBe(true);
    expect(getSupabase()).not.toBeNull();
    expect(getSupabaseAdmin()).not.toBeNull();
  });

  it("getSupabaseAdmin() falls back to the anon key when the service role key is absent", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example-project.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";

    const { getSupabaseAdmin } = await import("./supabase.js");
    expect(getSupabaseAdmin()).not.toBeNull();
  });
});
