import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const ENV_KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];

function clearSupabaseEnv() {
  for (const key of ENV_KEYS) delete process.env[key];
}

function fakeRequest(body) {
  return {
    json: async () => body,
    cookies: { get: () => undefined },
  };
}

describe("POST /api/leads", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    clearSupabaseEnv();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns a controlled 503 configuration error instead of crashing when Supabase is not configured", async () => {
    const { POST } = await import("./route.js");
    const res = await POST(
      fakeRequest({ name: "Jane", email: "jane@example.com", need: "Help" })
    );
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.error).toMatch(/Configuration error/i);
  });

  it("still validates required fields once Supabase is configured", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example-project.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";

    const { POST } = await import("./route.js");
    const res = await POST(fakeRequest({ name: "Jane" })); // missing email/need
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toMatch(/missing required fields/i);
  });

  it("returns a controlled 503 (not a crash) if the Supabase client fails to construct even though env vars look present", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example-project.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";

    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return { ...actual, getSupabaseAdmin: () => null };
    });

    const { POST } = await import("./route.js");
    const res = await POST(
      fakeRequest({ name: "Jane", email: "jane@example.com", need: "Help" })
    );
    expect(res.status).toBe(503);
    vi.doUnmock("@/lib/supabase");
  });
});

describe("GET /api/leads", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    clearSupabaseEnv();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns a controlled 503 configuration error before checking auth when Supabase is not configured", async () => {
    const { GET } = await import("./route.js");
    const res = await GET(fakeRequest());
    expect(res.status).toBe(503);
  });
});
