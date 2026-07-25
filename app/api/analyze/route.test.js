import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

function fakeRequest(body) {
  return {
    json: async () => body,
    cookies: { get: () => ({ value: "fake-token" }) },
  };
}

vi.mock("@/lib/admin-auth", () => ({
  requireAdmin: vi.fn(async () => ({ id: "user-1", email: "admin@mianx.ai" })),
}));

describe("POST /api/analyze", () => {
  const originalKey = process.env.ANTHROPIC_API_KEY;

  beforeEach(() => {
    vi.resetModules();
    delete process.env.ANTHROPIC_API_KEY;
  });

  afterEach(() => {
    if (originalKey === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = originalKey;
  });

  it("returns a controlled 503 with a stable error code when ANTHROPIC_API_KEY is absent, instead of calling Anthropic with an empty key", async () => {
    const { POST } = await import("./route.js");
    const res = await POST(fakeRequest({ name: "Jane", need: "Help" }));
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.code).toBe("ANTHROPIC_NOT_CONFIGURED");
  });
});
