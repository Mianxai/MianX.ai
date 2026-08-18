import { describe, it, expect, beforeEach, vi } from "vitest";

const UUID = "11111111-1111-4111-8111-111111111111";

function fakeReq(body = {}) {
  return {
    text: async () => JSON.stringify(body),
    cookies: { get: () => undefined },
  };
}
const params = Promise.resolve({ id: UUID });

async function withAuth(user) {
  vi.doMock("@/lib/auth", () => ({ getSessionUser: vi.fn(async () => user) }));
}

describe("POST /api/core/tasks/[id]/run", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("requires authentication", async () => {
    await withAuth(null);
    const { POST } = await import("./route.js");
    const res = await POST(fakeReq(), { params });
    expect(res.status).toBe(401);
    vi.doUnmock("@/lib/auth");
  });

  it("returns 202 when a human approval is required", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    vi.doMock("@/lib/core/runtime", () => ({
      executeTaskRun: vi.fn(async () => ({
        approvalRequired: true,
        task: { id: UUID, status: "awaiting_approval" },
        approval: { id: "ap1", status: "pending" },
      })),
    }));
    const { POST } = await import("./route.js");
    const res = await POST(fakeReq({ agent_instance_id: UUID }), { params });
    expect(res.status).toBe(202);
    const data = await res.json();
    expect(data.approvalRequired).toBe(true);
    vi.doUnmock("@/lib/core/runtime");
    vi.doUnmock("@/lib/auth");
  });

  it("returns a controlled 503 when the AI provider is not configured", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    vi.doMock("@/lib/core/runtime", () => ({
      executeTaskRun: vi.fn(async () => {
        const { notConfigured } = await import("@/lib/core/errors");
        throw notConfigured("no key", "ANTHROPIC_NOT_CONFIGURED");
      }),
    }));
    const { POST } = await import("./route.js");
    const res = await POST(fakeReq({ agent_instance_id: UUID }), { params });
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.error.code).toBe("ANTHROPIC_NOT_CONFIGURED");
    vi.doUnmock("@/lib/core/runtime");
    vi.doUnmock("@/lib/auth");
  });

  it("returns the completed run on success", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    vi.doMock("@/lib/core/runtime", () => ({
      executeTaskRun: vi.fn(async () => ({
        run: { id: "r1", status: "succeeded" },
        task: { id: UUID, status: "completed" },
      })),
    }));
    const { POST } = await import("./route.js");
    const res = await POST(fakeReq({ agent_instance_id: UUID }), { params });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.run.status).toBe("succeeded");
    expect(data.task.status).toBe("completed");
    vi.doUnmock("@/lib/core/runtime");
    vi.doUnmock("@/lib/auth");
  });
});
