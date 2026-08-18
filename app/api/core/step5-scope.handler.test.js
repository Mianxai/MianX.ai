/**
 * Handler-boundary tests: runs / approvals / audit require project scope.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { TENANT_A, TENANT_B } from "@/lib/tenant/cross-tenant-fixtures";

const ORG = TENANT_A.organizationId;

function fakeReq(qs = "") {
  return {
    text: async () => "{}",
    nextUrl: { searchParams: new URLSearchParams(qs) },
    cookies: { get: () => undefined },
  };
}

function mockMembershipAdmin() {
  vi.doMock("@/lib/auth", () => ({
    getSessionUser: vi.fn(async () => ({
      id: TENANT_A.adminUserId,
      email: "a@mianx.ai",
    })),
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
              eq: () => ({
                is: () => ({
                  maybeSingle: async () => ({
                    data: {
                      id: "m1",
                      user_id: TENANT_A.adminUserId,
                      email: "a@mianx.ai",
                      role: "admin",
                      status: "active",
                      revoked_at: null,
                    },
                    error: null,
                  }),
                }),
              }),
            }),
            // head count probe
            limit: () => ({ error: null }),
          }),
        }),
      }),
    };
  });
}

describe("Step 5 project-scoped list endpoints", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("GET /api/core/runs rejects missing project_id", async () => {
    mockMembershipAdmin();
    const { GET } = await import("@/app/api/core/runs/route.js");
    const res = await GET(fakeReq(""));
    expect(res.status).toBe(400);
  });

  it("GET /api/core/approvals rejects missing project_id", async () => {
    mockMembershipAdmin();
    const { GET } = await import("@/app/api/core/approvals/route.js");
    const res = await GET(fakeReq(""));
    expect(res.status).toBe(400);
  });

  it("GET /api/core/audit rejects missing project_id", async () => {
    mockMembershipAdmin();
    const { GET } = await import("@/app/api/core/audit/route.js");
    const res = await GET(fakeReq(""));
    expect(res.status).toBe(400);
  });

  it("GET /api/core/runs scopes listRuns to authorized project_id", async () => {
    mockMembershipAdmin();
    const listRuns = vi.fn(async ({ projectId }) => {
      expect(projectId).toBe(TENANT_A.projectId);
      return [{ id: "r1", project_id: TENANT_A.projectId }];
    });
    vi.doMock("@/lib/core/repo", () => ({
      getOrCreateDefaultOrg: vi.fn(async () => ({ id: ORG, slug: "mianx" })),
      getProject: vi.fn(async (id) => ({
        id,
        organization_id: ORG,
        archived_at: null,
      })),
      listRuns,
    }));
    const { GET } = await import("@/app/api/core/runs/route.js");
    const res = await GET(fakeReq(`project_id=${TENANT_A.projectId}`));
    expect(res.status).toBe(200);
    expect(listRuns).toHaveBeenCalledWith(
      expect.objectContaining({ projectId: TENANT_A.projectId })
    );
  });

  it("GET /api/core/runs denies foreign project via privacy 404", async () => {
    mockMembershipAdmin();
    vi.doMock("@/lib/core/repo", () => ({
      getOrCreateDefaultOrg: vi.fn(async () => ({ id: ORG, slug: "mianx" })),
      getProject: vi.fn(async () => {
        const err = new Error("not found");
        err.status = 404;
        throw err;
      }),
      listRuns: vi.fn(async () => [{ id: "leak" }]),
    }));
    const { GET } = await import("@/app/api/core/runs/route.js");
    const res = await GET(fakeReq(`project_id=${TENANT_B.projectId}`));
    expect([404, 403]).toContain(res.status);
  });
});
