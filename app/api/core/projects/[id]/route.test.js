import { describe, it, expect, beforeEach, vi } from "vitest";

const UUID = "11111111-1111-4111-8111-111111111111";

function fakeReq(body = {}) {
  return {
    text: async () => JSON.stringify(body),
    cookies: { get: () => undefined },
  };
}

describe("PATCH /api/core/projects/[id]", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("requires authentication independent of middleware", async () => {
    vi.doMock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => null) }));
    const { PATCH } = await import("./route.js");
    const res = await PATCH(fakeReq({ archived: true }), {
      params: Promise.resolve({ id: UUID }),
    });
    expect(res.status).toBe(401);
    vi.doUnmock("@/lib/auth");
  });

  it("archives a project (soft delete) and never hard-deletes", async () => {
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => ({ id: "a", email: "a@mianx.ai" })),
    }));
    const existing = {
      id: UUID,
      name: "Demo",
      status: "active",
      archived_at: null,
    };
    const archived = {
      ...existing,
      status: "archived",
      archived_at: "2026-07-25T00:00:00.000Z",
    };
    vi.doMock("@/lib/core/repo", () => ({
      getProject: vi.fn(async () => existing),
      updateProject: vi.fn(async () => archived),
    }));
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return {
        ...actual,
        getSupabaseAdmin: () => ({
          from: () => ({ insert: async () => ({ error: null }) }),
        }),
        isSupabaseConfigured: () => true,
      };
    });

    const { PATCH } = await import("./route.js");
    const res = await PATCH(fakeReq({ archived: true }), {
      params: Promise.resolve({ id: UUID }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.project.status).toBe("archived");
    expect(data.project.archived_at).toBeTruthy();
    vi.doUnmock("@/lib/auth");
    vi.doUnmock("@/lib/core/repo");
    vi.doUnmock("@/lib/supabase");
  });

  it("rejects mass-assignment of arbitrary fields", async () => {
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => ({ id: "a", email: "a@mianx.ai" })),
    }));
    vi.doMock("@/lib/core/repo", () => ({
      getProject: vi.fn(async () => ({ id: UUID, status: "active" })),
      updateProject: vi.fn(),
    }));
    const { PATCH } = await import("./route.js");
    const res = await PATCH(
      fakeReq({ organization_id: "evil", id: "hijack" }),
      { params: Promise.resolve({ id: UUID }) }
    );
    expect(res.status).toBe(400);
    vi.doUnmock("@/lib/auth");
    vi.doUnmock("@/lib/core/repo");
  });
});

describe("GET /api/core/projects/[id]", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns project detail for an authenticated admin", async () => {
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => ({ id: "a", email: "a@mianx.ai" })),
    }));
    vi.doMock("@/lib/core/repo", () => ({
      getProject: vi.fn(async () => ({ id: UUID, name: "Demo", slug: "demo" })),
    }));
    const { GET } = await import("./route.js");
    const res = await GET(fakeReq(), { params: Promise.resolve({ id: UUID }) });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.project.slug).toBe("demo");
    vi.doUnmock("@/lib/auth");
    vi.doUnmock("@/lib/core/repo");
  });
});
