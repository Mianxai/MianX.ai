import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const requireCapability = vi.fn();
vi.mock("@/lib/admin-auth", () => ({
  requireCapability,
  CAPABILITIES: { MANAGE_JOBS: "manage_jobs" },
}));

vi.mock("@/lib/core/ratelimit", () => ({
  rateLimit: vi.fn(),
}));

const runTick = vi.fn();
vi.mock("@/lib/core/worker", () => ({
  runTick,
}));

function fakeRequest(body = {}) {
  return new Request("http://localhost:3000/api/admin/runtime/tick", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost:3000",
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/admin/runtime/tick", () => {
  beforeEach(() => {
    vi.resetModules();
    requireCapability.mockReset();
    runTick.mockReset();
    requireCapability.mockResolvedValue({
      user: { id: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee", email: "owner@mianx.ai" },
      membership: { role: "owner" },
    });
    runTick.mockResolvedValue({ claimed: 0, completed: 0, failed: 0, recovered: 0 });
  });

  it("runs a bounded tick for MANAGE_JOBS and returns sanitized counters", async () => {
    const { POST } = await import("./route.js");
    const res = await POST(fakeRequest({ max_jobs: 2 }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.tick).toMatchObject({ claimed: 0 });
    expect(runTick).toHaveBeenCalledWith(
      expect.objectContaining({ maxJobs: 2, workerId: expect.stringMatching(/^admin:/) })
    );
    expect(JSON.stringify(body)).not.toMatch(/secret|token|sk-/i);
  });

  it("denies callers without MANAGE_JOBS", async () => {
    const { forbidden } = await import("@/lib/core/errors");
    requireCapability.mockRejectedValue(
      forbidden("Insufficient admin role for this action.")
    );
    const { POST } = await import("./route.js");
    const res = await POST(fakeRequest());
    expect(res.status).toBe(403);
    expect(runTick).not.toHaveBeenCalled();
  });
});
