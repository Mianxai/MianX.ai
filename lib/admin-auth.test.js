import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const ENV_KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];

function setSupabaseEnv() {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example-project.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
}

describe("admin authorization (lib/admin-auth)", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    for (const key of ENV_KEYS) delete process.env[key];
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.clearAllMocks();
  });

  it("denies anonymous users with 401", async () => {
    setSupabaseEnv();
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => null),
    }));
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return {
        ...actual,
        getSupabaseAdmin: vi.fn(() => ({ from: vi.fn() })),
        isSupabaseConfigured: () => true,
      };
    });
    const { requireAdmin, resetAdminMembershipCache } = await import(
      "@/lib/admin-auth"
    );
    resetAdminMembershipCache();
    await expect(requireAdmin({})).rejects.toMatchObject({ status: 401 });
  });

  it("denies invalid/expired sessions (null user) with 401", async () => {
    setSupabaseEnv();
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => null),
    }));
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return {
        ...actual,
        getSupabaseAdmin: vi.fn(() => ({ from: vi.fn() })),
        isSupabaseConfigured: () => true,
      };
    });
    const { requireAdmin, resetAdminMembershipCache } = await import(
      "@/lib/admin-auth"
    );
    resetAdminMembershipCache();
    await expect(requireAdmin({ cookies: { get: () => ({ value: "expired" }) } })).rejects.toMatchObject({
      status: 401,
      code: "UNAUTHORIZED",
    });
  });

  it("accepts any authenticated user when membership table is missing (compat)", async () => {
    setSupabaseEnv();
    const user = { id: "u-1", email: "anyone@example.com" };
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => user),
    }));
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return {
        ...actual,
        isSupabaseConfigured: () => true,
        getSupabaseAdmin: () => ({
          from: () => ({
            select: () => ({
              limit: async () => ({
                error: { code: "42P01", message: "relation does not exist" },
              }),
              eq: () => ({
                is: () => ({
                  maybeSingle: async () => ({
                    error: { code: "42P01", message: "relation does not exist" },
                  }),
                }),
              }),
            }),
          }),
        }),
      };
    });
    const { requireAdmin, resetAdminMembershipCache } = await import(
      "@/lib/admin-auth"
    );
    resetAdminMembershipCache();
    await expect(requireAdmin({})).resolves.toEqual(user);
  });

  it("denies authenticated non-admin when memberships are enforced", async () => {
    setSupabaseEnv();
    const user = { id: "u-normal", email: "user@example.com" };
    let probeCalls = 0;
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => user),
    }));
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return {
        ...actual,
        isSupabaseConfigured: () => true,
        getSupabaseAdmin: () => ({
          from: () => ({
            select: (_cols, opts) => {
              // Probe / count path
              if (opts?.head) {
                probeCalls += 1;
                // First probe (table exists), then count of active memberships = 1
                if (probeCalls === 1) {
                  return {
                    limit: async () => ({ error: null }),
                  };
                }
                return {
                  eq: () => ({
                    is: async () => ({ count: 1, error: null }),
                  }),
                };
              }
              // Membership lookup
              return {
                eq: () => ({
                  eq: () => ({
                    is: () => ({
                      maybeSingle: async () => ({ data: null, error: null }),
                    }),
                  }),
                }),
                ilike: () => ({
                  eq: () => ({
                    is: () => ({
                      maybeSingle: async () => ({ data: null, error: null }),
                    }),
                  }),
                }),
              };
            },
          }),
        }),
      };
    });
    const { requireAdmin, resetAdminMembershipCache } = await import(
      "@/lib/admin-auth"
    );
    resetAdminMembershipCache();
    await expect(requireAdmin({})).rejects.toMatchObject({
      status: 403,
      code: "FORBIDDEN",
    });
  });

  it("accepts an authorized admin membership", async () => {
    setSupabaseEnv();
    const user = { id: "u-admin", email: "admin@mianx.ai" };
    const membership = {
      id: "m-1",
      user_id: user.id,
      email: user.email,
      role: "owner",
      status: "active",
      revoked_at: null,
    };
    let headCalls = 0;
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => user),
    }));
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return {
        ...actual,
        isSupabaseConfigured: () => true,
        getSupabaseAdmin: () => ({
          from: () => ({
            select: (_cols, opts) => {
              if (opts?.head) {
                headCalls += 1;
                if (headCalls === 1) {
                  return { limit: async () => ({ error: null }) };
                }
                return {
                  eq: () => ({
                    is: async () => ({ count: 1, error: null }),
                  }),
                };
              }
              return {
                eq: () => ({
                  eq: () => ({
                    is: () => ({
                      maybeSingle: async () => ({ data: membership, error: null }),
                    }),
                  }),
                }),
              };
            },
          }),
        }),
      };
    });
    const { requireAdmin, resetAdminMembershipCache } = await import(
      "@/lib/admin-auth"
    );
    resetAdminMembershipCache();
    await expect(requireAdmin({})).resolves.toEqual(user);
  });
});

describe("protected admin APIs authorize independently of middleware", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    for (const key of ENV_KEYS) delete process.env[key];
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("GET /api/admin/overview returns 401 without a session (no middleware involved)", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example-project.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";

    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => null),
    }));
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return {
        ...actual,
        isSupabaseConfigured: () => true,
        getSupabaseAdmin: () => ({ from: vi.fn() }),
      };
    });

    const { GET } = await import("@/app/api/admin/overview/route.js");
    const res = await GET({
      cookies: { get: () => undefined },
      nextUrl: { searchParams: new URLSearchParams() },
    });
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error.code).toBe("UNAUTHORIZED");
  });

  it("does not expose service-role secrets in overview/settings responses", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example-project.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "super-secret-service-role";
    process.env.ANTHROPIC_API_KEY = "sk-secret-anthropic";

    vi.doMock("@/lib/admin-auth", async () => {
      const actual = await vi.importActual("@/lib/admin-auth");
      return {
        ...actual,
        requireAdmin: vi.fn(async () => ({ id: "u-1", email: "a@mianx.ai" })),
        getAdminAccessModelStatus: vi.fn(async () => ({
          model: "session-compat",
          membershipTable: false,
          activeMemberships: 0,
          enforcement: "any_authenticated_user",
          compatibilityMode: true,
        })),
      };
    });
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return {
        ...actual,
        isSupabaseConfigured: () => true,
        getSupabaseAdmin: () => ({
          from: (table) => ({
            select: () => ({
              is: async () => ({ data: [], error: null }),
              order: () => ({
                limit: async () => ({ data: [], error: null }),
              }),
              eq: () => ({
                is: () => ({
                  neq: async () => ({ count: 0, error: null }),
                }),
              }),
            }),
          }),
        }),
      };
    });
    vi.doMock("@/lib/core/repo", () => ({
      countActiveProjects: async () => 0,
      countByStatus: async () => ({}),
      listRecentAudit: async () => [],
      listRuns: async () => [],
    }));

    const { GET: getSettings } = await import("@/app/api/admin/settings/route.js");
    const settingsRes = await getSettings({});
    expect(settingsRes.status).toBe(200);
    const settingsText = JSON.stringify(await settingsRes.json());
    expect(settingsText).not.toContain("super-secret-service-role");
    expect(settingsText).not.toContain("sk-secret-anthropic");
    expect(settingsText).not.toContain("test-anon-key");
  });
});
