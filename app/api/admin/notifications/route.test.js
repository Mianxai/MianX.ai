import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("GET /api/admin/notifications", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns 401 for unauthenticated callers", async () => {
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => null),
    }));
    const { GET } = await import("./route.js");
    const res = await GET({ cookies: { get: () => undefined } });
    expect(res.status).toBe(401);
    vi.doUnmock("@/lib/auth");
  });

  it("returns 403 when a valid session lacks admin membership", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service";

    vi.doMock("@/lib/admin-auth", () => ({
      requireAdmin: vi.fn(async () => {
        const { forbidden } = await import("@/lib/core/errors");
        throw forbidden("Admin membership required.");
      }),
    }));

    const { GET } = await import("./route.js");
    const res = await GET({});
    expect(res.status).toBe(403);
    vi.doUnmock("@/lib/admin-auth");
  });

  it("returns sanitized newSubmissions count for an admin", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service";

    vi.doMock("@/lib/admin-auth", () => ({
      requireAdmin: vi.fn(async () => ({ id: "u1", email: "a@mianx.ai" })),
    }));
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return {
        ...actual,
        isSupabaseConfigured: () => true,
        getSupabaseAdmin: () => ({
          from: () => ({
            select: () => ({
              eq: () => ({
                is: async () => ({ count: 6, error: null }),
              }),
            }),
          }),
        }),
      };
    });

    const { GET } = await import("./route.js");
    const res = await GET({});
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ newSubmissions: 6 });
    expect(JSON.stringify(data)).not.toContain("SUPABASE_SERVICE_ROLE_KEY");
    expect(JSON.stringify(data)).not.toMatch(/eyJ|sk-/);
    vi.doUnmock("@/lib/admin-auth");
    vi.doUnmock("@/lib/supabase");
  });

  it("returns 503 when Supabase is not configured", async () => {
    vi.doMock("@/lib/admin-auth", () => ({
      requireAdmin: vi.fn(async () => ({ id: "u1", email: "a@mianx.ai" })),
    }));
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return {
        ...actual,
        isSupabaseConfigured: () => false,
        getSupabaseAdmin: () => null,
      };
    });

    const { GET } = await import("./route.js");
    const res = await GET({});
    expect(res.status).toBe(503);
    vi.doUnmock("@/lib/admin-auth");
    vi.doUnmock("@/lib/supabase");
  });
});
