import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("admin integration API security", () => {
  beforeEach(() => vi.resetModules());
  afterEach(() => {
    vi.doUnmock("@/lib/core/auth");
    vi.doUnmock("@/lib/core/integration");
  });

  it("GET rejects unauthorised access", async () => {
    vi.doMock("@/lib/core/auth", () => ({
      requireAdmin: vi.fn(async () => {
        const { unauthorized } = await import("@/lib/core/errors");
        throw unauthorized();
      }),
    }));
    const { GET } = await import("./route.js");
    const res = await GET(new Request("http://localhost/api/admin/integration"));
    expect(res.status).toBe(401);
  });

  it("POST rejects unauthorised access", async () => {
    vi.doMock("@/lib/core/auth", () => ({
      requireAdmin: vi.fn(async () => {
        const { unauthorized } = await import("@/lib/core/errors");
        throw unauthorized();
      }),
    }));
    const { POST } = await import("./route.js");
    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "create", objective: { project_id: "p1" } }),
      })
    );
    expect(res.status).toBe(401);
  });

  it("GET rejects cross-project run access", async () => {
    vi.doMock("@/lib/core/auth", () => ({
      requireAdmin: vi.fn(async () => ({ id: "admin-1", email: "admin@mianx.ai" })),
    }));
    vi.doMock("@/lib/core/integration", async () => {
      const actual = await vi.importActual("@/lib/core/integration");
      return {
        ...actual,
        getRun: () => null,
        loadIntegrationRun: async () => ({
          id: "run-x",
          project_id: "proj-other",
          current_stage: "objective_validated",
        }),
        saveRun: () => {},
        listPersistedIntegrationRuns: async () => [],
        buildIntegrationReadinessAsync: async () => ({}),
        mapProofStatusFromRun: () => "objective_created",
      };
    });
    const { GET } = await import("./route.js");
    const res = await GET(
      new Request(
        "http://localhost/api/admin/integration?action=run&run_id=run-x&project_id=proj-1"
      )
    );
    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body.error?.message || "").toMatch(/cross-project/i);
  });

  it("POST start_founder_proof requires confirmation", async () => {
    vi.doMock("@/lib/core/auth", () => ({
      requireAdmin: vi.fn(async () => ({ id: "admin-1", email: "admin@mianx.ai" })),
    }));
    const { POST } = await import("./route.js");
    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "start_founder_proof",
          project_id: "proj-1",
          confirmation: false,
        }),
      })
    );
    expect(res.status).toBe(400);
  });
});
