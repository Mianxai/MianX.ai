import { describe, it, expect, beforeEach, vi } from "vitest";

const UUID = "11111111-1111-4111-8111-111111111111";
const ORG = "22222222-2222-4222-8222-222222222222";

function fakeReq(body = {}) {
  return {
    text: async () => JSON.stringify(body),
    cookies: { get: () => undefined },
  };
}

function mockRepo(extra = {}) {
  vi.doMock("@/lib/core/repo", () => ({
    getOrCreateDefaultOrg: vi.fn(async () => ({ id: ORG, slug: "mianx" })),
    getProject: vi.fn(async () => ({
      id: UUID,
      name: "Demo",
      slug: "demo",
      status: "active",
      organization_id: ORG,
      archived_at: null,
    })),
    updateProject: vi.fn(),
    ...extra,
  }));
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
      organization_id: ORG,
      archived_at: null,
    };
    const archived = {
      ...existing,
      status: "archived",
      archived_at: "2026-07-25T00:00:00.000Z",
    };
    mockRepo({
      getProject: vi.fn(async () => existing),
      updateProject: vi.fn(async () => archived),
    });
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
    mockRepo({
      updateProject: vi.fn(),
    });
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
    mockRepo({
      getProject: vi.fn(async () => ({
        id: UUID,
        name: "Demo",
        slug: "demo",
        organization_id: ORG,
        archived_at: null,
      })),
    });
    const { GET } = await import("./route.js");
    const res = await GET(fakeReq(), { params: Promise.resolve({ id: UUID }) });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.project.slug).toBe("demo");
    vi.doUnmock("@/lib/auth");
    vi.doUnmock("@/lib/core/repo");
  });

  it("returns privacy-preserving 404 for foreign organization project", async () => {
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => ({ id: "a", email: "a@mianx.ai" })),
    }));
    mockRepo({
      getProject: vi.fn(async () => ({
        id: UUID,
        name: "Other",
        organization_id: "33333333-3333-4333-8333-333333333333",
        archived_at: null,
      })),
    });
    const { GET } = await import("./route.js");
    const res = await GET(fakeReq(), { params: Promise.resolve({ id: UUID }) });
    expect(res.status).toBe(404);
    vi.doUnmock("@/lib/auth");
    vi.doUnmock("@/lib/core/repo");
  });
});
