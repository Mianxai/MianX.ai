import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const requireCapability = vi.fn();
vi.mock("@/lib/admin-auth", () => ({
  requireCapability,
  CAPABILITIES: { MANAGE_LEADS: "manage_leads" },
}));

vi.mock("@/lib/core/ratelimit", () => ({
  rateLimit: vi.fn(),
}));

const runAgentPrompt = vi.fn();
vi.mock("@/lib/core/provider", () => ({
  runAgentPrompt,
}));

vi.mock("@/lib/core/config", () => ({
  isProviderConfigured: (name) =>
    name === "anthropic" && Boolean(process.env.ANTHROPIC_API_KEY),
}));

function fakeRequest(body) {
  return new Request("http://localhost:3000/api/analyze", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost:3000",
    },
    body: JSON.stringify(body ?? {}),
  });
}

describe("POST /api/analyze", () => {
  const originalKey = process.env.ANTHROPIC_API_KEY;

  beforeEach(() => {
    vi.resetModules();
    requireCapability.mockReset();
    runAgentPrompt.mockReset();
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
    expect(runAgentPrompt).not.toHaveBeenCalled();
  });

  it("denies viewers that lack MANAGE_LEADS with 403", async () => {
    const { forbidden } = await import("@/lib/core/errors");
    requireCapability.mockRejectedValue(
      forbidden("Insufficient admin role for this action.")
    );
    const { POST } = await import("./route.js");
    const res = await POST(fakeRequest({ name: "Jane", need: "Help" }));
    expect(res.status).toBe(403);
    expect(requireCapability).toHaveBeenCalledWith(
      expect.anything(),
      "manage_leads"
    );
  });

  it("routes through the hardened provider and maps modal fields", async () => {
    process.env.ANTHROPIC_API_KEY = "test-provider-key-not-real";
    runAgentPrompt.mockResolvedValue({
      output: {
        score: 82,
        temperature: "hot",
        summary: "Promising lead",
        draft_reply: "Thanks for reaching out.",
        next_actions: ["Qualify need", "Schedule call"],
      },
    });
    const { POST } = await import("./route.js");
    const res = await POST(
      fakeRequest({
        name: "Jane",
        email: "jane@example.com",
        need: "Help",
        industry: "restaurant",
      })
    );
    expect(res.status).toBe(200);
    expect(runAgentPrompt).toHaveBeenCalledWith(
      expect.objectContaining({ slug: "lead-intelligence" })
    );
    const data = await res.json();
    expect(data).toMatchObject({
      score: 82,
      temperature: "hot",
      summary: "Promising lead",
      reply: "Thanks for reaching out.",
      actions: ["Qualify need", "Schedule call"],
    });
    expect(JSON.stringify(data)).not.toContain("test-provider-key");
  });
});
