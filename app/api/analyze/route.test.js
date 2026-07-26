import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const requireCapability = vi.fn();
vi.mock("@/lib/admin-auth", () => ({
  requireCapability,
  CAPABILITIES: { MANAGE_LEADS: "manage_leads" },
}));

function fakeRequest(body) {
  return {
    json: async () => body,
    cookies: { get: () => ({ value: "fake-token" }) },
    method: "POST",
    headers: { get: () => null },
  };
}

describe("POST /api/analyze", () => {
  const originalKey = process.env.ANTHROPIC_API_KEY;

  beforeEach(() => {
    vi.resetModules();
    requireCapability.mockReset();
    requireCapability.mockResolvedValue({
      user: { id: "user-1", email: "admin@mianx.ai" },
      membership: { role: "admin" },
    });
    delete process.env.ANTHROPIC_API_KEY;
  });

  afterEach(() => {
    if (originalKey === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = originalKey;
  });

  it("returns a controlled 503 with a stable error code when ANTHROPIC_API_KEY is absent", async () => {
    const { POST } = await import("./route.js");
    const res = await POST(fakeRequest({ name: "Jane", need: "Help" }));
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.code).toBe("ANTHROPIC_NOT_CONFIGURED");
    expect(requireCapability).toHaveBeenCalled();
  });

  it("denies viewers that lack MANAGE_LEADS with 403", async () => {
    const err = Object.assign(new Error("Insufficient admin role for this action."), {
      status: 403,
      code: "FORBIDDEN",
    });
    requireCapability.mockRejectedValue(err);
    const { POST } = await import("./route.js");
    const res = await POST(fakeRequest({ name: "Jane", need: "Help" }));
    expect(res.status).toBe(403);
    expect(requireCapability).toHaveBeenCalledWith(
      expect.anything(),
      "manage_leads"
    );
  });
});
