/**
 * Handler-boundary tests for membership-scoped project list/detail.
 * Exercises route handlers with mocked repo — verifies scoped query args
 * (not helper-only assertions).
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

describe("GET /api/core/projects handler scope", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("calls listProjects with organizationId — never unscoped", async () => {
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => ({ id: "a", email: "a@mianx.ai" })),
    }));
    const listProjects = vi.fn(async (opts) => {
      expect(opts.organizationId).toBe(ORG);
      expect(opts.organizationId).not.toBeUndefined();
      return [
        {
          id: TENANT_A.projectId,
          organization_id: ORG,
          name: "A",
          status: "active",
        },
      ];
    });
    vi.doMock("@/lib/core/repo", () => ({
      getOrCreateDefaultOrg: vi.fn(async () => ({ id: ORG, slug: "mianx" })),
      listProjects,
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

    const { GET } = await import("@/app/api/core/projects/route.js");
    const res = await GET(fakeReq());
    expect(res.status).toBe(200);
    expect(listProjects).toHaveBeenCalledTimes(1);
    const arg = listProjects.mock.calls[0][0];
    expect(arg).toEqual(expect.objectContaining({ organizationId: ORG }));
    expect(arg).not.toEqual({});
    const data = await res.json();
    expect(data.projects).toHaveLength(1);
    expect(data.scope.organizationId).toBe(ORG);
  });
});

describe("GET /api/core/tasks handler foreign scope", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("denies Tenant B project_id for default-org actor (privacy 404)", async () => {
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => ({ id: "a", email: "a@mianx.ai" })),
    }));
    const listTasks = vi.fn(async () => [{ id: TENANT_B.taskId }]);
    vi.doMock("@/lib/core/repo", () => ({
      getOrCreateDefaultOrg: vi.fn(async () => ({ id: ORG, slug: "mianx" })),
      getProject: vi.fn(async (id, opts) => {
        // Scoped get: foreign org filtered at query layer → not found
        if (opts?.organizationId === ORG && id === TENANT_B.projectId) {
          const { notFound } = await import("@/lib/core/errors");
          throw notFound("Project not found.");
        }
        return {
          id,
          organization_id: ORG,
          archived_at: null,
        };
      }),
      listTasks,
    }));

    const { GET } = await import("@/app/api/core/tasks/route.js");
    const res = await GET(fakeReq(`project_id=${TENANT_B.projectId}`));
    expect(res.status).toBe(404);
    expect(listTasks).not.toHaveBeenCalled();
  });

  it("requires project_id and does not call listTasks unscoped", async () => {
    vi.doMock("@/lib/auth", () => ({
      getSessionUser: vi.fn(async () => ({ id: "a", email: "a@mianx.ai" })),
    }));
    const listTasks = vi.fn(async () => []);
    vi.doMock("@/lib/core/repo", () => ({
      getOrCreateDefaultOrg: vi.fn(async () => ({ id: ORG, slug: "mianx" })),
      listTasks,
    }));
    const { GET } = await import("@/app/api/core/tasks/route.js");
    const res = await GET(fakeReq(""));
    expect(res.status).toBe(400);
    expect(listTasks).not.toHaveBeenCalled();
  });
});

describe("repo listProjects fail-closed contract", () => {
  it("documents that empty opts must not mean global list", async () => {
    // Pure contract on the helper used by handlers — empty allowlist / deny.
    const { scopeToListProjectsOpts } = await import(
      "@/lib/tenant/project-access"
    );
    expect(scopeToListProjectsOpts({ ok: false })).toEqual({
      organizationId: "__deny__",
      projectIds: [],
    });
  });
});
