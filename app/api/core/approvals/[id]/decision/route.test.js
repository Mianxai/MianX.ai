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

describe("POST /api/core/approvals/[id]/decision", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("requires authentication", async () => {
    await withAuth(null);
    const { POST } = await import("./route.js");
    const res = await POST(fakeReq({ decision: "approved" }), { params });
    expect(res.status).toBe(401);
    vi.doUnmock("@/lib/auth");
  });

  it("records an approval decision", async () => {
    await withAuth({ email: "admin@mianx.ai" });
    vi.doMock("@/lib/core/runtime", () => ({
      decideApproval: vi.fn(async () => ({ id: UUID, status: "approved" })),
    }));
    const { POST } = await import("./route.js");
    const res = await POST(fakeReq({ decision: "approved" }), { params });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.approval.status).toBe("approved");
    vi.doUnmock("@/lib/core/runtime");
    vi.doUnmock("@/lib/auth");
  });

  it("propagates a forbidden self-approval as 403", async () => {
    await withAuth({ email: "qa-agent" });
    vi.doMock("@/lib/core/runtime", () => ({
      decideApproval: vi.fn(async () => {
        const { forbidden } = await import("@/lib/core/errors");
        throw forbidden("An agent cannot approve a protected production action.");
      }),
    }));
    const { POST } = await import("./route.js");
    const res = await POST(fakeReq({ decision: "approved" }), { params });
    expect(res.status).toBe(403);
    vi.doUnmock("@/lib/core/runtime");
    vi.doUnmock("@/lib/auth");
  });
});
