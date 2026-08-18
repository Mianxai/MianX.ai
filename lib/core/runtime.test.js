import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// --- mocks -----------------------------------------------------------------
const repoMock = vi.hoisted(() => ({
  getTask: vi.fn(),
  getProject: vi.fn(),
  getAgentInstance: vi.fn(),
  findAssignment: vi.fn(),
  createAssignment: vi.fn(),
  findRunByIdempotency: vi.fn(),
  updateTask: vi.fn(),
  createRun: vi.fn(),
  updateRun: vi.fn(),
  findApprovedApprovalForTask: vi.fn(),
  findPendingApprovalForTask: vi.fn(),
  createApproval: vi.fn(),
  getApproval: vi.fn(),
  updateApproval: vi.fn(),
  upsertAgentDefinition: vi.fn(),
  createAgentInstance: vi.fn(),
}));
vi.mock("@/lib/core/repo", () => repoMock);

const providerMock = vi.hoisted(() => ({ runAgentPrompt: vi.fn() }));
vi.mock("@/lib/core/provider", () => providerMock);

vi.mock("@/lib/core/audit", () => ({
  recordAudit: vi.fn(async () => true),
  buildAuditEntry: (x) => x,
  AUDIT_ACTIONS: new Proxy({}, { get: () => "action" }),
}));
vi.mock("@/lib/supabase", () => ({ getSupabaseAdmin: () => null }));

import { executeTaskRun, decideApproval, registerAgent } from "./runtime";

const AGENT = {
  id: "ai1",
  status: "active",
  project_id: "p1",
  agent_definitions: {
    slug: "lead-intelligence",
    default_model: "claude-sonnet-4-6",
    requires_human_approval: false,
  },
};

function baseTask(overrides = {}) {
  return {
    id: "t1",
    project_id: "p1",
    status: "pending",
    input: { email: "a@b.co", message: "hi" },
    requires_approval: false,
    archived_at: null,
    ...overrides,
  };
}

const ORIGINAL_KEY = process.env.ANTHROPIC_API_KEY;

describe("executeTaskRun (vertical slice)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ANTHROPIC_API_KEY = "test-key";
    repoMock.getAgentInstance.mockResolvedValue(AGENT);
    repoMock.findAssignment.mockResolvedValue(null);
    repoMock.createAssignment.mockResolvedValue({});
    repoMock.findRunByIdempotency.mockResolvedValue(null);
    repoMock.findApprovedApprovalForTask.mockResolvedValue(null);
    repoMock.findPendingApprovalForTask.mockResolvedValue(null);
    repoMock.updateTask.mockImplementation(async (id, patch) => ({ ...baseTask(), ...patch, id }));
    repoMock.createRun.mockResolvedValue({ id: "r1", project_id: "p1", status: "created" });
    repoMock.updateRun.mockImplementation(async (id, patch) => ({ id, project_id: "p1", ...patch }));
  });

  afterEach(() => {
    if (ORIGINAL_KEY === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = ORIGINAL_KEY;
  });

  it("runs a task end to end when the provider is configured", async () => {
    repoMock.getTask.mockResolvedValue(baseTask());
    providerMock.runAgentPrompt.mockResolvedValue({
      output: { score: 80, temperature: "hot", summary: "s", next_actions: ["x"] },
      provider: "anthropic",
      model: "claude-sonnet-4-6",
    });

    const res = await executeTaskRun({ taskId: "t1", agentInstanceId: "ai1", actor: "admin" });

    expect(providerMock.runAgentPrompt).toHaveBeenCalledOnce();
    expect(res.run.status).toBe("succeeded");
    expect(res.run.output.score).toBe(80);
    expect(res.task.status).toBe("completed");
  });

  it("gates on human approval and does NOT call the provider", async () => {
    repoMock.getTask.mockResolvedValue(baseTask({ requires_approval: true }));
    // Preserve requires_approval through the validate transition.
    repoMock.updateTask.mockImplementation(async (id, patch) => ({
      ...baseTask({ requires_approval: true }),
      ...patch,
      id,
    }));
    repoMock.createApproval.mockResolvedValue({ id: "ap1", status: "pending" });

    const res = await executeTaskRun({ taskId: "t1", agentInstanceId: "ai1", actor: "admin" });

    expect(res.approvalRequired).toBe(true);
    expect(res.approval.id).toBe("ap1");
    expect(providerMock.runAgentPrompt).not.toHaveBeenCalled();
    expect(repoMock.createRun).not.toHaveBeenCalled();
  });

  it("returns a controlled 503 without creating a run when the provider is unconfigured", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    repoMock.getTask.mockResolvedValue(baseTask());

    await expect(
      executeTaskRun({ taskId: "t1", agentInstanceId: "ai1", actor: "admin" })
    ).rejects.toMatchObject({ status: 503, code: "PROVIDER_UNAVAILABLE" });

    expect(repoMock.createRun).not.toHaveBeenCalled();
    // Task state preserved: only the validate step persisted.
    expect(repoMock.updateTask).toHaveBeenCalledTimes(1);
    expect(repoMock.updateTask).toHaveBeenCalledWith("t1", { status: "validated" });
  });

  it("replays idempotently when a run with the same key exists", async () => {
    repoMock.getTask.mockResolvedValue(baseTask());
    repoMock.findRunByIdempotency.mockResolvedValue({ id: "rX", status: "succeeded" });

    const res = await executeTaskRun({
      taskId: "t1",
      agentInstanceId: "ai1",
      idempotencyKey: "key-1",
      actor: "admin",
    });

    expect(res.replayed).toBe(true);
    expect(res.run.id).toBe("rX");
    expect(repoMock.createRun).not.toHaveBeenCalled();
  });

  it("persists a failed run and rethrows when the provider errors", async () => {
    repoMock.getTask.mockResolvedValue(baseTask());
    const err = Object.assign(new Error("bad json"), { status: 502, code: "PROVIDER_ERROR" });
    providerMock.runAgentPrompt.mockRejectedValue(err);

    await expect(
      executeTaskRun({ taskId: "t1", agentInstanceId: "ai1", actor: "admin" })
    ).rejects.toMatchObject({ status: 502 });

    const runPatches = repoMock.updateRun.mock.calls.map((c) => c[1].status);
    expect(runPatches).toContain("failed");
    const taskPatches = repoMock.updateTask.mock.calls.map((c) => c[1].status);
    expect(taskPatches).toContain("failed");
  });

  it("rejects running an already-completed task", async () => {
    repoMock.getTask.mockResolvedValue(baseTask({ status: "completed" }));
    await expect(
      executeTaskRun({ taskId: "t1", agentInstanceId: "ai1", actor: "admin" })
    ).rejects.toMatchObject({ status: 400 });
  });

  it("rejects invalid task input against the agent schema", async () => {
    repoMock.getTask.mockResolvedValue(baseTask({ input: { email: "a@b.co" } })); // missing message
    await expect(
      executeTaskRun({ taskId: "t1", agentInstanceId: "ai1", actor: "admin" })
    ).rejects.toMatchObject({ status: 400 });
    expect(repoMock.createRun).not.toHaveBeenCalled();
  });
});

describe("decideApproval", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    repoMock.updateApproval.mockImplementation(async (id, patch) => ({ id, ...patch }));
  });

  it("records an admin approval", async () => {
    repoMock.getApproval.mockResolvedValue({
      id: "ap1",
      status: "pending",
      project_id: "p1",
      requested_capability: "run_task",
      task_id: "t1",
    });
    const res = await decideApproval({
      approvalId: "ap1",
      decision: "approved",
      decidedBy: "admin@mianx.ai",
    });
    expect(res.status).toBe("approved");
  });

  it("cancels the task on rejection", async () => {
    repoMock.getApproval.mockResolvedValue({
      id: "ap1",
      status: "pending",
      project_id: "p1",
      requested_capability: "run_task",
      task_id: "t1",
    });
    repoMock.getTask.mockResolvedValue({ id: "t1", status: "awaiting_approval" });
    repoMock.updateTask.mockResolvedValue({});
    await decideApproval({ approvalId: "ap1", decision: "rejected", decidedBy: "admin@mianx.ai" });
    expect(repoMock.updateTask).toHaveBeenCalledWith("t1", { status: "cancelled" });
  });

  it("rejects an illegal decision on an already-decided approval", async () => {
    repoMock.getApproval.mockResolvedValue({
      id: "ap1",
      status: "approved",
      project_id: "p1",
      requested_capability: "run_task",
    });
    await expect(
      decideApproval({ approvalId: "ap1", decision: "rejected", decidedBy: "admin@mianx.ai" })
    ).rejects.toMatchObject({ status: 409 });
  });
});

describe("registerAgent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    repoMock.getProject.mockResolvedValue({ id: "p1" });
    repoMock.upsertAgentDefinition.mockResolvedValue({ id: "def1" });
    repoMock.createAgentInstance.mockResolvedValue({ id: "inst1" });
  });

  it("registers a known agent into a project", async () => {
    const inst = await registerAgent({ projectId: "p1", slug: "research", actor: "admin" });
    expect(inst.id).toBe("inst1");
    expect(repoMock.upsertAgentDefinition).toHaveBeenCalled();
  });

  it("rejects an unknown agent slug", async () => {
    await expect(
      registerAgent({ projectId: "p1", slug: "does-not-exist", actor: "admin" })
    ).rejects.toMatchObject({ status: 400 });
  });

  it("refuses to register a draft (disabled-by-default) agent", async () => {
    await expect(
      registerAgent({ projectId: "p1", slug: "requirements-analyst", actor: "admin" })
    ).rejects.toMatchObject({
      status: 400,
      details: { slug: expect.stringMatching(/draft.*disabled by default/i) },
    });
    expect(repoMock.upsertAgentDefinition).not.toHaveBeenCalled();
    expect(repoMock.createAgentInstance).not.toHaveBeenCalled();
  });
});
