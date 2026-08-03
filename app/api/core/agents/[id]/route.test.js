import { describe, it, expect, beforeEach, vi } from "vitest";

const UUID = "22222222-2222-4222-8222-222222222222";
const PROJECT = "11111111-1111-4111-8111-111111111111";
const ORG = "33333333-3333-4333-8333-333333333333";

function fakeReq(body = {}) {
  return {
    text: async () => JSON.stringify(body),
    nextUrl: { searchParams: new URLSearchParams() },
    cookies: { get: () => undefined },
  };
}

describe("PATCH /api/core/agents/[id]", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("requires authentication", async () => {
    vi.doMock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => null) }));
    const { PATCH } = await import("./route.js");
    const res = await PATCH(fakeReq({ status: "paused", project_id: PROJECT }), {
      params: Promise.resolve({ id: UUID }),
    });
    expect(res.status).toBe(401);
    vi.doUnmock("@/lib/auth");
  });

  it("requires project_id", async () => {
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => ({ id: "a", email: "a@mianx.ai" })),
    }));
    const { PATCH } = await import("./route.js");
    const res = await PATCH(fakeReq({ status: "paused" }), {
      params: Promise.resolve({ id: UUID }),
    });
    expect(res.status).toBe(400);
    vi.doUnmock("@/lib/auth");
  });

  it("enforces locked lifecycle transitions", async () => {
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => ({ id: "a", email: "a@mianx.ai" })),
    }));
    vi.doMock("@/lib/core/repo", () => ({
      getOrCreateDefaultOrg: vi.fn(async () => ({ id: ORG, slug: "mianx" })),
      getProject: vi.fn(async () => ({
        id: PROJECT,
        organization_id: ORG,
        archived_at: null,
      })),
      getAgentInstance: vi.fn(async () => ({
        id: UUID,
        project_id: PROJECT,
        status: "retired",
      })),
      updateAgentInstance: vi.fn(),
    }));
    const { PATCH } = await import("./route.js");
    const res = await PATCH(fakeReq({ status: "active", project_id: PROJECT }), {
      params: Promise.resolve({ id: UUID }),
    });
    expect(res.status).toBe(409);
    const data = await res.json();
    expect(data.error.code).toBe("INVALID_TRANSITION");
    vi.doUnmock("@/lib/auth");
    vi.doUnmock("@/lib/core/repo");
  });

  it("pauses an active instance", async () => {
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => ({ id: "a", email: "a@mianx.ai" })),
    }));
    vi.doMock("@/lib/core/repo", () => ({
      getOrCreateDefaultOrg: vi.fn(async () => ({ id: ORG, slug: "mianx" })),
      getProject: vi.fn(async () => ({
        id: PROJECT,
        organization_id: ORG,
        archived_at: null,
      })),
      getAgentInstance: vi.fn(async () => ({
        id: UUID,
        project_id: PROJECT,
        status: "active",
      })),
      updateAgentInstance: vi.fn(async () => ({
        id: UUID,
        project_id: PROJECT,
        status: "paused",
      })),
    }));
    vi.doMock("@/lib/supabase", async () => {
      const actual = await vi.importActual("@/lib/supabase");
      return {
        ...actual,
        getSupabaseAdmin: () => ({
          from: () => ({ insert: async () => ({ error: null }) }),
        }),
      };
    });
    const { PATCH } = await import("./route.js");
    const res = await PATCH(fakeReq({ status: "paused", project_id: PROJECT }), {
      params: Promise.resolve({ id: UUID }),
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.instance.status).toBe("paused");
    vi.doUnmock("@/lib/auth");
    vi.doUnmock("@/lib/core/repo");
    vi.doUnmock("@/lib/supabase");
  });
});
