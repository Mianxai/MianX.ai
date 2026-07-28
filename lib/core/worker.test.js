import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const repoMock = vi.hoisted(() => ({
  recoverExpiredJobs: vi.fn(),
  claimJobs: vi.fn(),
  getJob: vi.fn(),
  updateJob: vi.fn(),
  updateJobIfStatus: vi.fn(),
  createRun: vi.fn(),
  updateRun: vi.fn(),
  getTask: vi.fn(),
  updateTask: vi.fn(),
}));
vi.mock("@/lib/core/repo", () => repoMock);

const workflowMock = vi.hoisted(() => ({
  advanceWorkflow: vi.fn(async () => ({ done: true })),
}));
vi.mock("@/lib/core/workflow", () => workflowMock);

const auditMock = vi.hoisted(() => ({ recordAudit: vi.fn(async () => true) }));
vi.mock("@/lib/core/audit", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, recordAudit: auditMock.recordAudit };
});
vi.mock("@/lib/supabase", () => ({ getSupabaseAdmin: () => null }));

import { runTick, processJob } from "./worker";
import { createFakeProvider } from "./provider-fake";

const ORIGINAL_KEY = process.env.ANTHROPIC_API_KEY;

function claimedJob(overrides = {}) {
  return {
    id: "j1",
    project_id: "p1",
    task_id: null,
    agent_slug: "research",
    workflow: null,
    workflow_step: 0,
    status: "leased",
    attempt: 1,
    max_attempts: 3,
    provider: "anthropic",
    model: "claude-sonnet-4-6",
    input: { question: "q" },
    cancel_requested_at: null,
    ...overrides,
  };
}

function auditActions() {
  return auditMock.recordAudit.mock.calls.map(([, entry]) => entry.action);
}

beforeEach(() => {
  vi.clearAllMocks();
  process.env.ANTHROPIC_API_KEY = "test-key";
  repoMock.recoverExpiredJobs.mockResolvedValue(0);
  repoMock.claimJobs.mockResolvedValue([]);
  // Compare-and-set returns the merged row by default.
  repoMock.updateJobIfStatus.mockImplementation(async (id, from, patch) => ({
    ...claimedJob(),
    ...patch,
    id,
  }));
  repoMock.updateJob.mockImplementation(async (id, patch) => ({ id, ...patch }));
  repoMock.createRun.mockResolvedValue({ id: "run1" });
  repoMock.updateRun.mockResolvedValue({ id: "run1" });
  repoMock.getJob.mockImplementation(async (id) => claimedJob({ id, status: "running" }));
});

afterEach(() => {
  if (ORIGINAL_KEY === undefined) delete process.env.ANTHROPIC_API_KEY;
  else process.env.ANTHROPIC_API_KEY = ORIGINAL_KEY;
});

describe("runTick", () => {
  it("recovers expired leases before claiming", async () => {
    repoMock.recoverExpiredJobs.mockResolvedValue(2);
    const summary = await runTick({ providerImpl: createFakeProvider() });
    expect(summary.recovered).toBe(2);
    expect(repoMock.recoverExpiredJobs).toHaveBeenCalledOnce();
    expect(repoMock.claimJobs).toHaveBeenCalledOnce();
    expect(auditActions()).toContain("job.leases_recovered");
  });

  it("claims atomically through the database function with a bounded limit", async () => {
    await runTick({ maxJobs: 999, providerImpl: createFakeProvider() });
    const arg = repoMock.claimJobs.mock.calls[0][0];
    expect(arg.limit).toBeLessThanOrEqual(5);
    expect(arg.leaseSeconds).toBeGreaterThan(0);
  });

  it("processes a claimed job to success with usage metrics", async () => {
    repoMock.claimJobs.mockResolvedValue([claimedJob()]);
    const provider = createFakeProvider({ inputTokens: 111, outputTokens: 22 });
    const summary = await runTick({ providerImpl: provider });
    expect(summary.claimed).toBe(1);
    expect(summary.succeeded).toBe(1);
    const successPatch = repoMock.updateJobIfStatus.mock.calls.find(
      ([, , patch]) => patch.status === "succeeded"
    )[2];
    expect(successPatch.output).toBeTruthy();
    expect(successPatch.input_tokens).toBe(111);
    expect(successPatch.output_tokens).toBe(22);
    expect(successPatch.lease_owner).toBeNull();
    expect(auditActions()).toEqual(
      expect.arrayContaining(["job.started", "job.succeeded"])
    );
  });

  it("requeues a transient failure with backoff (attempt < max)", async () => {
    repoMock.claimJobs.mockResolvedValue([claimedJob({ attempt: 1 })]);
    const provider = createFakeProvider({ failures: 99 }); // always 429
    const summary = await runTick({ providerImpl: provider, random: () => 0 });
    expect(summary.requeued).toBe(1);
    const requeue = repoMock.updateJobIfStatus.mock.calls.find(
      ([, , patch]) => patch.status === "queued"
    )[2];
    expect(new Date(requeue.available_at).getTime()).toBeGreaterThan(Date.now());
    expect(requeue.error.code).toBe("PROVIDER_ERROR");
    expect(auditActions()).toContain("job.requeued");
  });

  it("dead-letters a transient failure once attempts are exhausted", async () => {
    repoMock.claimJobs.mockResolvedValue([claimedJob({ attempt: 3, max_attempts: 3 })]);
    repoMock.updateJobIfStatus.mockImplementation(async (id, from, patch) => ({
      ...claimedJob({ attempt: 3, max_attempts: 3 }),
      ...patch,
      id,
    }));
    const provider = createFakeProvider({ failures: 99 });
    const summary = await runTick({ providerImpl: provider });
    expect(summary.dead_lettered).toBe(1);
    expect(auditActions()).toContain("job.dead_lettered");
  });

  it("fails permanently (no retry) on a non-transient error", async () => {
    repoMock.claimJobs.mockResolvedValue([claimedJob({ attempt: 1 })]);
    const provider = createFakeProvider({ permanentFailure: true });
    const summary = await runTick({ providerImpl: provider });
    expect(summary.failed).toBe(1);
    expect(summary.requeued).toBe(0);
    expect(provider.calls).toBe(1);
    expect(auditActions()).toContain("job.failed");
  });

  it("fails with a controlled error when the provider is unconfigured — no call made", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    repoMock.claimJobs.mockResolvedValue([claimedJob()]);
    const provider = createFakeProvider();
    const spy = vi.fn(provider);
    const summary = await runTick({ providerImpl: spy });
    expect(summary.failed).toBe(1);
    expect(spy).not.toHaveBeenCalled();
    const failPatch = repoMock.updateJobIfStatus.mock.calls.find(
      ([, , patch]) => patch.status === "failed"
    )[2];
    expect(failPatch.error.code).toBe("PROVIDER_UNAVAILABLE");
  });

  it("rejects schema-invalid provider output as a permanent failure", async () => {
    repoMock.claimJobs.mockResolvedValue([claimedJob()]);
    const provider = createFakeProvider({ invalidOutput: true });
    const summary = await runTick({ providerImpl: provider });
    expect(summary.failed).toBe(1);
    const failPatch = repoMock.updateJobIfStatus.mock.calls.find(
      ([, , patch]) => patch.status === "failed"
    )[2];
    expect(failPatch.error.code).toBe("OUTPUT_VALIDATION_FAILED");
  });

  it("cancels a job whose cancellation was requested before execution", async () => {
    repoMock.claimJobs.mockResolvedValue([
      claimedJob({ cancel_requested_at: new Date().toISOString() }),
    ]);
    const provider = createFakeProvider();
    const spy = vi.fn(provider);
    const summary = await runTick({ providerImpl: spy });
    expect(summary.cancelled).toBe(1);
    expect(spy).not.toHaveBeenCalled();
  });

  it("honors a cancellation that arrives during execution", async () => {
    repoMock.claimJobs.mockResolvedValue([claimedJob()]);
    repoMock.getJob.mockResolvedValue(
      claimedJob({ status: "running", cancel_requested_at: new Date().toISOString() })
    );
    const summary = await runTick({ providerImpl: createFakeProvider() });
    expect(summary.cancelled).toBe(1);
    // The success write must never have happened.
    const successWrite = repoMock.updateJobIfStatus.mock.calls.find(
      ([, , patch]) => patch.status === "succeeded"
    );
    expect(successWrite).toBeUndefined();
  });

  it("releases unprocessed jobs (attempt refunded) when the tick budget is exhausted", async () => {
    repoMock.claimJobs.mockResolvedValue([
      claimedJob({ id: "j1" }),
      claimedJob({ id: "j2" }),
    ]);
    let t = 0;
    const now = () => {
      t += 60_000; // every check jumps past the budget
      return t;
    };
    const summary = await runTick({ providerImpl: createFakeProvider(), now });
    expect(summary.released).toBe(2);
    const release = repoMock.updateJobIfStatus.mock.calls.find(
      ([, , patch]) => patch.status === "queued"
    )[2];
    expect(release.attempt).toBe(0); // 1 - 1: the claim's increment is refunded
  });

  it("never double-runs a job whose lease was lost (CAS returns null)", async () => {
    repoMock.claimJobs.mockResolvedValue([claimedJob()]);
    repoMock.updateJobIfStatus.mockResolvedValue(null);
    const provider = createFakeProvider();
    const spy = vi.fn(provider);
    const summary = await runTick({ providerImpl: spy });
    expect(spy).not.toHaveBeenCalled();
    expect(summary.succeeded).toBe(0);
  });

  it("advances the workflow after a workflow job succeeds", async () => {
    repoMock.claimJobs.mockResolvedValue([
      claimedJob({ workflow: "lead-qualification", agent_slug: "lead-intelligence",
        input: { email: "a@b.co", message: "m" } }),
    ]);
    await runTick({ providerImpl: createFakeProvider() });
    expect(workflowMock.advanceWorkflow).toHaveBeenCalledOnce();
  });

  it("survives a crash inside processing without stranding the lease", async () => {
    repoMock.claimJobs.mockResolvedValue([claimedJob()]);
    repoMock.createRun.mockRejectedValue(new Error("db down"));
    repoMock.updateJob.mockRejectedValue(new Error("db down"));
    // run creation failure is tolerated; force a crash in the provider instead
    const provider = async () => {
      throw new TypeError("unexpected crash");
    };
    const summary = await runTick({ providerImpl: provider });
    // An unknown crash is treated as transient and requeued for retry —
    // either way, the lease is always released.
    expect(summary.requeued + summary.failed).toBe(1);
    const patch = repoMock.updateJobIfStatus.mock.calls.find(
      ([, , p]) => p.status === "queued" || p.status === "failed"
    )[2];
    expect(patch.lease_owner).toBeNull();
    expect(patch.error.message).toBeTruthy();
  });
});

describe("processJob", () => {
  it("links an agent_run for run-history compatibility", async () => {
    const provider = createFakeProvider();
    await processJob(claimedJob(), { workerId: "w1", providerImpl: provider });
    expect(repoMock.createRun).toHaveBeenCalledOnce();
    const runRow = repoMock.createRun.mock.calls[0][0];
    expect(runRow.status).toBe("running");
    expect(repoMock.updateRun).toHaveBeenCalledWith(
      "run1",
      expect.objectContaining({ status: "succeeded" })
    );
  });

  it("marks the linked run failed when the job fails", async () => {
    const provider = createFakeProvider({ permanentFailure: true });
    await processJob(claimedJob(), { workerId: "w1", providerImpl: provider });
    expect(repoMock.updateRun).toHaveBeenCalledWith(
      "run1",
      expect.objectContaining({ status: "failed" })
    );
  });
});
