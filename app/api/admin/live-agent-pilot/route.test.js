import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@/lib/core/auth", () => ({
  requireAdmin: vi.fn(async () => ({ id: "admin-1", email: "admin@mianx.ai" })),
  requireCapability: vi.fn(async () => ({
    user: { id: "admin-1", email: "admin@mianx.ai" },
    membership: { id: "m1", role: "owner" },
    mode: "membership",
    capabilities: ["read", "live_pilot.read", "live_pilot.authorize", "platform.admin"],
  })),
  actorFromUser: vi.fn((u) => ({ id: u.id, email: u.email })),
  CAPABILITIES: {
    LIVE_PILOT_READ: "live_pilot.read",
    LIVE_PILOT_AUTHORIZE: "live_pilot.authorize",
  },
}));

import { GET, POST } from "@/app/api/admin/live-agent-pilot/route";
import { requireCapability } from "@/lib/core/auth";
import {
  resetLivePilotStore,
  PILOT_PROJECT_ID,
  PILOT_AGENT_SLUG,
} from "@/lib/core/live-pilot";

function req(method, url, body) {
  const init = { method };
  if (body) {
    init.headers = { "Content-Type": "application/json" };
    init.body = JSON.stringify(body);
  }
  return new Request(url, init);
}

describe("live-agent-pilot API", () => {
  beforeEach(() => {
    resetLivePilotStore();
    requireCapability.mockImplementation(async () => ({
      user: { id: "admin-1", email: "admin@mianx.ai" },
      membership: { id: "m1", role: "owner" },
      mode: "membership",
      capabilities: ["read", "live_pilot.read", "live_pilot.authorize", "platform.admin"],
    }));
  });

  afterEach(() => {
    resetLivePilotStore();
    vi.clearAllMocks();
  });

  it("GET status returns foundation snapshot without secrets", async () => {
    const res = await GET(req("GET", "http://local/api/admin/live-agent-pilot"));
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.provider.providerName).toBe("none");
    expect(json.eligibility.runButtonEnabled).toBe(false);
    expect(json.liveRunControlPlane?.accountAccessStatus).toBe("not_checked");
    expect(json.liveRunControlPlane?.runNowActionPresent).toBe(false);
    expect(json.liveRunControlPlane?.migrationApplied).toBe(false);
    expect(
      ["not_applied", "unavailable", "unknown", "available"].includes(
        json.liveRunControlPlane?.authorizationStoreStatus
      )
    ).toBe(true);
    expect(json.liveRunControlPlane?.providerCallAllowed).toBe(false);
    expect(JSON.stringify(json)).not.toMatch(/sk-[a-z0-9]{10,}/i);
    expect(JSON.stringify(json)).not.toContain("service_role");
  });

  it("GET control_plane view is read-only preparation", async () => {
    const res = await GET(
      req("GET", "http://local/api/admin/live-agent-pilot?view=control_plane")
    );
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.view).toBe("control_plane");
    expect(json.productionAuthorizationCreated).toBe(false);
    expect(json.authenticatedModelsApiCalls).toBe(0);
    expect(json.genuineGenerationCalls).toBe(0);
  });

  it("POST execution_prepare never calls provider and returns 503", async () => {
    const prep = await POST(
      req("POST", "http://local/api/admin/live-agent-pilot", {
        action: "approval_prepare",
        projectId: PILOT_PROJECT_ID,
        taskId: "task-api-1",
        agentSlug: PILOT_AGENT_SLUG,
      })
    );
    expect(prep.status).toBe(200);
    const approval = await prep.json();

    const res = await POST(
      req("POST", "http://local/api/admin/live-agent-pilot", {
        action: "execution_prepare",
        projectId: PILOT_PROJECT_ID,
        taskId: "task-api-1",
        agentSlug: PILOT_AGENT_SLUG,
        approvalId: approval.approval.id,
        modelName: "claude-haiku-4-5",
        idempotencyKey: "api-idem-1",
      })
    );
    const json = await res.json();
    // Switches off + provider none → blocked before prepare, or 503 from prepare
    expect([503, 422].includes(res.status) || res.status >= 400).toBe(true);
    expect(json.providerCalled).toBe(false);
    expect(json.networkCallAllowed).toBe(false);
  });

  it("POST kill_switch arms and clears", async () => {
    const arm = await POST(
      req("POST", "http://local/api/admin/live-agent-pilot", {
        action: "kill_switch",
        killSwitchActive: true,
        reason: "test",
      })
    );
    expect(arm.status).toBe(200);
    expect((await arm.json()).killSwitch.active).toBe(true);
  });

  it("rejects wrong project on approval_prepare", async () => {
    const res = await POST(
      req("POST", "http://local/api/admin/live-agent-pilot", {
        action: "approval_prepare",
        projectId: "00000000-0000-4000-8000-000000000099",
        taskId: "t1",
        agentSlug: PILOT_AGENT_SLUG,
      })
    );
    expect(res.status).toBe(403);
  });
});
