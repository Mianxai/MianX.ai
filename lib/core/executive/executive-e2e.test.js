import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createFakeProvider } from "../provider-fake";

/**
 * Deterministic Executive → C-Suite vertical slice using the real worker +
 * workflow advancement and an in-memory repo mock.
 */

const store = {
  jobs: new Map(),
  tasks: new Map(),
  runs: new Map(),
  approvals: new Map(),
  audits: [],
};

function uid(prefix) {
  return `${prefix}-${store.jobs.size + store.tasks.size + store.approvals.size + 1}`;
}

const repoMock = vi.hoisted(() => ({}));
vi.mock("@/lib/core/repo", () => repoMock);
vi.mock("@/lib/supabase", () => ({ getSupabaseAdmin: () => ({}) }));
vi.mock("@/lib/core/audit", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    recordAudit: vi.fn(async (_c, entry) => {
      store.audits.push(entry);
      return true;
    }),
  };
});

function wireRepo() {
  Object.assign(repoMock, {
    getProject: vi.fn(async (id) => ({ id, name: "Core" })),
    createTask: vi.fn(async (row) => {
      const existing = [...store.tasks.values()].find(
        (t) => t.idempotency_key && t.idempotency_key === row.idempotency_key
      );
      if (existing) return { row: existing, created: false };
      const id = uid("task");
      const task = { id, status: "pending", ...row };
      store.tasks.set(id, task);
      return { row: task, created: true };
    }),
    getTask: vi.fn(async (id) => {
      const t = store.tasks.get(id);
      if (!t) throw Object.assign(new Error("not found"), { status: 404 });
      return { ...t };
    }),
    updateTask: vi.fn(async (id, patch) => {
      const next = { ...store.tasks.get(id), ...patch };
      store.tasks.set(id, next);
      return next;
    }),
    findJobByIdempotency: vi.fn(async (projectId, key) => {
      for (const j of store.jobs.values()) {
        if (j.project_id === projectId && j.idempotency_key === key) return { ...j };
      }
      return null;
    }),
    createJob: vi.fn(async (row) => {
      const existing = await repoMock.findJobByIdempotency(row.project_id, row.idempotency_key);
      if (existing) return { row: existing, created: false };
      const id = uid("job");
      const job = {
        id,
        status: "queued",
        attempt: 0,
        max_attempts: 3,
        available_at: new Date().toISOString(),
        lease_owner: null,
        lease_expires_at: null,
        cancel_requested_at: null,
        ...row,
      };
      store.jobs.set(id, job);
      return { row: { ...job }, created: true };
    }),
    getJob: vi.fn(async (id) => {
      const j = store.jobs.get(id);
      if (!j) throw Object.assign(new Error("not found"), { status: 404 });
      return { ...j };
    }),
    updateJob: vi.fn(async (id, patch) => {
      const next = { ...store.jobs.get(id), ...patch };
      store.jobs.set(id, next);
      return { ...next };
    }),
    updateJobIfStatus: vi.fn(async (id, from, patch) => {
      const j = store.jobs.get(id);
      const allowed = Array.isArray(from) ? from : [from];
      if (!j || !allowed.includes(j.status)) return null;
      const next = { ...j, ...patch };
      store.jobs.set(id, next);
      return { ...next };
    }),
    claimJobs: vi.fn(async ({ limit, workerId, leaseSeconds }) => {
      const claimed = [];
      for (const j of store.jobs.values()) {
        if (claimed.length >= limit) break;
        if (j.status !== "queued") continue;
        j.status = "leased";
        j.lease_owner = workerId;
        j.lease_expires_at = new Date(Date.now() + leaseSeconds * 1000).toISOString();
        j.attempt = (j.attempt || 0) + 1;
        claimed.push({ ...j });
      }
      return claimed;
    }),
    recoverExpiredJobs: vi.fn(async () => 0),
    createRun: vi.fn(async (row) => {
      const id = uid("run");
      const run = { id, ...row };
      store.runs.set(id, run);
      return { ...run };
    }),
    updateRun: vi.fn(async (id, patch) => {
      const next = { ...store.runs.get(id), ...patch };
      store.runs.set(id, next);
      return { ...next };
    }),
    findPendingApprovalForTask: vi.fn(async (taskId) => {
      for (const a of store.approvals.values()) {
        if (a.task_id === taskId && a.status === "pending") return { ...a };
      }
      return null;
    }),
    createApproval: vi.fn(async (row) => {
      const id = uid("appr");
      const approval = { id, status: "pending", ...row };
      store.approvals.set(id, approval);
      return { ...approval };
    }),
    getApproval: vi.fn(async (id) => {
      const a = store.approvals.get(id);
      if (!a) throw Object.assign(new Error("not found"), { status: 404 });
      return { ...a };
    }),
    updateApproval: vi.fn(async (id, patch) => {
      const next = { ...store.approvals.get(id), ...patch };
      store.approvals.set(id, next);
      return { ...next };
    }),
  });
}

beforeEach(() => {
  store.jobs.clear();
  store.tasks.clear();
  store.runs.clear();
  store.approvals.clear();
  store.audits.length = 0;
  wireRepo();
  process.env.ANTHROPIC_API_KEY = "test-key";
});

afterEach(() => {
  delete process.env.ANTHROPIC_API_KEY;
});

async function runReadinessTicks(provider, n = 5) {
  const { runTick } = await import("../worker");
  for (let i = 0; i < n; i += 1) {
    await runTick({
      providerImpl: provider,
      workerId: "exec-worker",
      maxJobs: 1,
    });
  }
}

describe("executive-readiness E2E (fake provider)", () => {
  it("1. advisory objective completes without Founder approval", async () => {
    const { startExecutiveObjective } = await import("./workflow");
    const { task, created } = await startExecutiveObjective({
      projectId: "p1",
      objective: "Assess market and product readiness (advisory only).",
      actor: "admin@mianx.ai",
    });
    expect(created).toBe(true);
    expect(task.requires_approval).toBe(false);

    const provider = createFakeProvider();
    await runReadinessTicks(provider);

    expect(store.tasks.get(task.id).status).toBe("completed");
    expect(store.approvals.size).toBe(0);
    const slugs = [...store.jobs.values()].map((j) => j.agent_slug);
    expect(slugs.filter((s) => s === "executive-ceo").length).toBe(2);
    expect(slugs).toContain("executive-cto");
    expect(slugs).toContain("executive-cpo");
    expect(slugs).toContain("executive-ciso");
    expect([...store.jobs.values()].every((j) => j.status === "succeeded")).toBe(true);
    expect(provider.calls).toBe(5);
  });

  it("2. protected production action requires Founder approval", async () => {
    const { startExecutiveObjective } = await import("./workflow");
    const { task } = await startExecutiveObjective({
      projectId: "p1",
      objective: "Assess readiness to launch Industry OS.",
      proposedAction: "launch_industry_os",
      actor: "admin@mianx.ai",
    });
    expect(task.requires_approval).toBe(true);

    const provider = createFakeProvider();
    await runReadinessTicks(provider);

    expect(store.tasks.get(task.id).status).toBe("awaiting_approval");
    const approvals = [...store.approvals.values()];
    expect(approvals).toHaveLength(1);
    expect(approvals[0].requested_capability).toBe("approve_production_action");
    expect(approvals[0].status).toBe("pending");
  });

  it("16. awaiting approval prevents premature completion", async () => {
    const { startExecutiveObjective } = await import("./workflow");
    const { task } = await startExecutiveObjective({
      projectId: "p1",
      objective: "Deploy candidate",
      proposedAction: "production_deploy",
      actor: "a",
    });
    const provider = createFakeProvider();
    await runReadinessTicks(provider);
    expect(store.tasks.get(task.id).status).toBe("awaiting_approval");
    expect(store.tasks.get(task.id).status).not.toBe("completed");
  });

  it("17. Founder rejection is persisted and does not complete the protected action", async () => {
    const { startExecutiveObjective } = await import("./workflow");
    const { decideApproval } = await import("../runtime");
    const { task } = await startExecutiveObjective({
      projectId: "p1",
      objective: "Transfer funds proposal",
      proposedAction: "financial_transfer",
      actor: "a",
    });
    const provider = createFakeProvider();
    await runReadinessTicks(provider);

    const approval = [...store.approvals.values()][0];
    expect(approval.status).toBe("pending");

    const updated = await decideApproval({
      approvalId: approval.id,
      decision: "rejected",
      decidedBy: "founder@mianx.ai",
      note: "Rejected transfer",
      actorType: "admin",
    });
    expect(updated.status).toBe("rejected");
    expect(store.approvals.get(approval.id).status).toBe("rejected");
    expect(store.tasks.get(task.id).status).toBe("cancelled");
    expect(store.tasks.get(task.id).status).not.toBe("completed");
    expect(store.audits.some((a) => a.action === "approval.decided")).toBe(true);
  });

  it("15. child failure prevents executive success (no approval mask)", async () => {
    const { startExecutiveObjective } = await import("./workflow");
    await startExecutiveObjective({
      projectId: "p1",
      objective: "FORCE_EXEC_FAIL Assess readiness",
      proposedAction: "production_deploy",
      actor: "a",
    });

    const provider = createFakeProvider();
    await runReadinessTicks(provider);

    expect(store.approvals.size).toBe(0);
    const actions = store.audits.map((a) => a.action);
    expect(actions).toContain("workflow.halted");
    const tasks = [...store.tasks.values()];
    expect(tasks.some((t) => t.status === "failed")).toBe(true);
  });

  it("18. duplicate executive objective remains idempotent", async () => {
    const { startExecutiveObjective } = await import("./workflow");
    const key = "wf:executive-readiness:p1:assess-readiness";
    const a = await startExecutiveObjective({
      projectId: "p1",
      objective: "Assess readiness",
      actor: "a",
      idempotencyKey: key,
    });
    const b = await startExecutiveObjective({
      projectId: "p1",
      objective: "Assess readiness",
      actor: "a",
      idempotencyKey: key,
    });
    expect(a.created).toBe(true);
    expect(b.created).toBe(false);
    expect(store.jobs.size).toBe(1);
  });
});
