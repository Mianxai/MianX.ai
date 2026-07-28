import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("admin workforce API security", () => {
  beforeEach(() => vi.resetModules());
  afterEach(() => vi.doUnmock("@/lib/core/auth"));

  it("GET rejects unauthorised access", async () => {
    vi.doMock("@/lib/core/auth", () => ({
      requireAdmin: vi.fn(async () => {
        const { unauthorized } = await import("@/lib/core/errors");
        throw unauthorized();
      }),
    }));
    const { GET } = await import("./route.js");
    const res = await GET(new Request("http://localhost/api/admin/workforce"));
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
      new Request("http://localhost/api/admin/workforce", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "simulate" }),
      })
    );
    expect(res.status).toBe(401);
  });
});
