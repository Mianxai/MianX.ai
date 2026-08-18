import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("GET /api/admin/overview", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns 401 for anonymous callers", async () => {
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => null),
    }));
    const { GET } = await import("./route.js");
    const res = await GET({ cookies: { get: () => undefined } });
    expect(res.status).toBe(401);
    vi.doUnmock("@/lib/auth");
  });

  it("returns real zeroed metrics for an admin when tables are empty", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service";
    const ORG = "22222222-2222-4222-8222-222222222222";

    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => ({ id: "u1", email: "a@mianx.ai" })),
    }));
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return {
        ...actual,
        isSupabaseConfigured: () => true,
        getSupabaseAdmin: () => ({
          from: () => ({
            select: () => ({
              is: async () => ({ data: [], error: null }),
            }),
          }),
        }),
      };
    });
    vi.doMock("@/lib/core/repo", () => ({
      getOrCreateDefaultOrg: async () => ({ id: ORG, slug: "mianx" }),
      listProjects: async () => [],
      countActiveProjects: async () => 0,
      countByStatus: async () => ({}),
      countJobsByStatus: async () => ({}),
      listRecentAudit: async () => [],
    }));

    const { GET } = await import("./route.js");
    const res = await GET({});
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.submissions.total).toBe(0);
    expect(data.projects.active).toBe(0);
    expect(data.config.supabase).toBe(true);
    expect(data.scope.organizationId).toBe(ORG);
    expect(JSON.stringify(data)).not.toContain("SUPABASE_SERVICE_ROLE_KEY");
    expect(JSON.stringify(data)).not.toMatch(/eyJ|sk-/);
    vi.doUnmock("@/lib/auth");
    vi.doUnmock("@/lib/supabase");
    vi.doUnmock("@/lib/core/repo");
  });
});
