import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createFakeProvider } from "../provider-fake";

/**
 * Enterprise-objective Founder flow with fake provider — protected reject path.
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
    recordRuntimeTickSummary: vi.fn(async () => ({})),
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

async function runTicks(provider, n = 8) {
  const { runTick } = await import("../worker");
  for (let i = 0; i < n; i += 1) {
    await runTick({
      providerImpl: provider,
      workerId: "ent-worker",
      maxJobs: 1,
    });
  }
}

describe("enterprise-objective Founder E2E (fake provider)", () => {
  it("advisory objective can complete without Founder approval", async () => {
    const { startEnterpriseObjective } = await import("./workflow");
    const { task, created } = await startEnterpriseObjective({
      projectId: "p1",
      objective: "Assess whether MianX should build HospitalOS.",
      departmentsNeeded: ["product", "research"],
      actor: "founder@mianx.ai",
      source: "objectives-ui",
    });
    expect(created).toBe(true);
    expect(task.requires_approval).toBe(false);

    const provider = createFakeProvider();
    await runTicks(provider);

    expect(store.tasks.get(task.id).status).toBe("completed");
    expect(store.approvals.size).toBe(0);
    expect(repoMock.recordRuntimeTickSummary).toHaveBeenCalled();
  });

  it("protected production deploy awaits Founder then reject cancels with audit", async () => {
    const { startEnterpriseObjective } = await import("./workflow");
    const { decideApproval } = await import("../runtime");
    const { task } = await startEnterpriseObjective({
      projectId: "p1",
      objective: "Prepare production deployment of candidate build.",
      proposedAction: "production_deploy",
      departmentsNeeded: ["engineering", "devops"],
      actor: "founder@mianx.ai",
    });
    expect(task.requires_approval).toBe(true);

    const provider = createFakeProvider();
    await runTicks(provider);

    expect(store.tasks.get(task.id).status).toBe("awaiting_approval");
    const approvals = [...store.approvals.values()];
    expect(approvals.length).toBeGreaterThanOrEqual(1);
    expect(approvals[0].status).toBe("pending");

    const updated = await decideApproval({
      approvalId: approvals[0].id,
      decision: "rejected",
      decidedBy: "founder@mianx.ai",
      note: "Reject production deploy",
      actorType: "admin",
    });
    expect(updated.status).toBe("rejected");
    expect(store.tasks.get(task.id).status).toBe("cancelled");
    expect(store.tasks.get(task.id).status).not.toBe("completed");
    expect(store.audits.some((a) => a.action === "approval.decided")).toBe(true);
  });
});
