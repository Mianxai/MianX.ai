import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createFakeProvider } from "./provider-fake";
import { decideApproval } from "./runtime";

/**
 * In-memory vertical slice: Lead Intelligence → Research → QA → follow-up
 * draft → pending human approval, driven entirely by the fake provider.
 */

const store = {
  jobs: new Map(),
  tasks: new Map(),
  runs: new Map(),
  approvals: new Map(),
  audits: [],
};

function uid(prefix) {
  return `${prefix}-${store.audits.length + store.jobs.size + 1}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

const repoMock = vi.hoisted(() => ({}));

vi.mock("@/lib/core/repo", () => repoMock);
vi.mock("@/lib/supabase", () => ({ getSupabaseAdmin: () => ({}) }));
vi.mock("@/lib/core/audit", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    recordAudit: vi.fn(async (_client, entry) => {
      store.audits.push(entry);
      return true;
    }),
  };
});

function wireRepo() {
  Object.assign(repoMock, {
    getLead: vi.fn(async (id) => ({
      id,
      name: "Ada",
      email: "ada@corp.com",
      company: "Corp",
      industry: "retail",
      message: "We need automation.",
      archived_at: null,
    })),
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
      const t = store.tasks.get(id);
      const next = { ...t, ...patch };
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
      const existing = await repoMock.findJobByIdempotency(
        row.project_id,
        row.idempotency_key
      );
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
        heartbeat_at: null,
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
      const j = store.jobs.get(id);
      const next = { ...j, ...patch };
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
      const now = Date.now();
      const claimed = [];
      for (const j of store.jobs.values()) {
        if (claimed.length >= limit) break;
        if (j.status !== "queued") continue;
        if (j.available_at && new Date(j.available_at).getTime() > now) continue;
        j.status = "leased";
        j.lease_owner = workerId;
        j.lease_expires_at = new Date(now + leaseSeconds * 1000).toISOString();
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
      const r = store.runs.get(id);
      const next = { ...r, ...patch };
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
      const a = store.approvals.get(id);
      const next = { ...a, ...patch };
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

describe("lead-qualification vertical E2E (fake provider)", () => {
  it("LI → Research → QA → follow-up → awaiting_approval + audit trail", async () => {
    const { startLeadQualification } = await import("./workflow");
    const { runTick } = await import("./worker");

    const { task, job, created } = await startLeadQualification({
      projectId: "p1",
      leadId: "lead-1",
      includeResearch: true,
      actor: "admin@mianx.ai",
    });
    expect(created).toBe(true);
    expect(job.agent_slug).toBe("lead-intelligence");
    expect(store.audits.some((a) => a.action === "task.created")).toBe(true);

    const provider = createFakeProvider();
    // Four agent steps: LI, research, QA, follow-up-draft
    for (let i = 0; i < 4; i += 1) {
      const summary = await runTick({
        providerImpl: provider,
        workerId: "e2e-worker",
        maxJobs: 1,
      });
      expect(summary.succeeded + summary.failed + summary.dead_lettered).toBeGreaterThan(0);
    }

    const jobs = [...store.jobs.values()];
    const slugs = jobs.map((j) => j.agent_slug);
    expect(slugs).toEqual([
      "lead-intelligence",
      "research",
      "qa-review",
      "follow-up-draft",
    ]);
    expect(jobs.every((j) => j.status === "succeeded")).toBe(true);

    const finalTask = store.tasks.get(task.id);
    expect(finalTask.status).toBe("awaiting_approval");

    const approvals = [...store.approvals.values()];
    expect(approvals).toHaveLength(1);
    expect(approvals[0].requested_capability).toBe("send_email");
    expect(approvals[0].status).toBe("pending");

    const actions = store.audits.map((a) => a.action);
    expect(actions).toContain("job.claimed");
    expect(actions).toContain("approval.requested");

    // Human approval completes the task; nothing is emailed.
    const decided = await decideApproval({
      approvalId: approvals[0].id,
      decision: "approved",
      decidedBy: "admin@mianx.ai",
      note: "Founder will send manually",
    });
    expect(decided.status).toBe("approved");
    expect(store.tasks.get(task.id).status).toBe("completed");
    expect(provider.calls).toBe(4);
  });

  it("duplicate workflow start is idempotent", async () => {
    const { startLeadQualification } = await import("./workflow");
    const a = await startLeadQualification({
      projectId: "p1",
      leadId: "lead-1",
      includeResearch: true,
      actor: "a",
      idempotencyKey: "wf:lead-qualification:lead-1",
    });
    const b = await startLeadQualification({
      projectId: "p1",
      leadId: "lead-1",
      includeResearch: true,
      actor: "a",
      idempotencyKey: "wf:lead-qualification:lead-1",
    });
    expect(a.created).toBe(true);
    expect(b.created).toBe(false);
    expect(b.task.id).toBe(a.task.id);
    expect(b.job.id).toBe(a.job.id);
    expect(store.jobs.size).toBe(1);
  });
});
