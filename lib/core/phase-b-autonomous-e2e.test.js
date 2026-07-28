import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createFakeProvider } from "./provider-fake";
import {
  proposeMemory,
  decideMemory,
  proposeLearning,
  __resetMemoryLearningStores,
  retrieveMemoryForTask,
} from "./memory";
import { buildExecutionResult } from "./execution/envelope";
import { routeWorkforceObjective } from "./router/route";

/**
 * Phase B autonomous workforce E2E — deterministic fake provider.
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
vi.mock("@/lib/supabase", () => ({
  getSupabaseAdmin: () => ({}),
  isSupabaseConfigured: () => false,
}));
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
  __resetMemoryLearningStores();
  wireRepo();
  process.env.ANTHROPIC_API_KEY = "test-key";
});

afterEach(() => {
  delete process.env.ANTHROPIC_API_KEY;
});

async function runTicks(provider, n = 8) {
  const { runTick } = await import("./worker");
  for (let i = 0; i < n; i += 1) {
    await runTick({
      providerImpl: provider,
      workerId: "phase-b-worker",
      maxJobs: 1,
    });
  }
}

describe("Phase B autonomous workforce E2E", () => {
  it("advisory objective routes, executes, completes, and yields memory/learning candidates", async () => {
    const routing = routeWorkforceObjective({
      objective:
        "Assess the operational readiness of MianX Core and produce three prioritised, evidence-backed recommendations. Do not execute protected actions.",
      projectId: "p1",
      departmentsNeeded: ["research", "analytics", "security", "operations"],
      riskClass: "R2",
    });
    expect(routing.selectedAgents.length).toBeGreaterThan(1);
    expect(routing.approvalBoundaries.requiresFounderApproval).toBe(false);

    const { startEnterpriseObjective } = await import("./enterprise/workflow");
    const { task, routing: attached } = await startEnterpriseObjective({
      projectId: "p1",
      objective:
        "Assess the operational readiness of MianX Core and produce three prioritised recommendations. Do not execute protected actions.",
      departmentsNeeded: ["research", "analytics"],
      actor: "founder@mianx.ai",
      source: "phase-b-e2e",
    });
    expect(attached?.selectedAgents?.length).toBeGreaterThan(0);

    const provider = createFakeProvider();
    await runTicks(provider);

    expect(store.tasks.get(task.id).status).toBe("completed");
    expect(store.approvals.size).toBe(0);

    const mem = await proposeMemory({
      organization_id: "org",
      project_id: "p1",
      content: "External scheduler is required for automatic tick processing.",
      memory_type: "fact",
      created_by: "executive-ceo",
      evidence: [{ run: "phase-b" }],
      confidence: 0.7,
    });
    expect(mem.verification_status).toBe("candidate");
    await decideMemory(mem.id, "validate", { actorType: "admin", actor: "qa" });
    await decideMemory(mem.id, "activate", { actorType: "admin", actor: "qa" });
    const ctx = await retrieveMemoryForTask({
      projectId: "p1",
      organizationId: "org",
      agentSlug: "research",
    });
    expect(ctx.length).toBeGreaterThan(0);

    const learn = await proposeLearning({
      problem: "Queue does not drain without scheduler",
      proposed_lesson: "Document external scheduler as a Founder activation step",
      project_id: "p1",
      agent_slug: "executive-ceo",
      source_workflow: "enterprise-objective",
      confidence: 0.75,
      risk_class: "R2",
    });
    expect(learn.status).toBe("proposed");

    const result = buildExecutionResult({
      status: "succeeded",
      structured_output: { recommendations: ["scheduler", "provider", "rate-limit"] },
      memory_candidates: [{ content: mem.content }],
      learning_candidates: [{ id: learn.id }],
    });
    expect(result.status).toBe("succeeded");
    expect(store.audits.some((a) => a.action === "task.created")).toBe(true);
  });

  it("protected production_deploy awaits Founder reject with audit", async () => {
    const { startEnterpriseObjective } = await import("./enterprise/workflow");
    const { decideApproval } = await import("./runtime");
    const { task } = await startEnterpriseObjective({
      projectId: "p1",
      objective: "Propose production deploy of candidate",
      proposedAction: "production_deploy",
      departmentsNeeded: ["engineering"],
      actor: "founder@mianx.ai",
    });
    const provider = createFakeProvider();
    await runTicks(provider);
    expect(store.tasks.get(task.id).status).toBe("awaiting_approval");
    const approval = [...store.approvals.values()][0];
    await decideApproval({
      approvalId: approval.id,
      decision: "rejected",
      decidedBy: "founder@mianx.ai",
      note: "Reject deploy",
      actorType: "admin",
    });
    expect(store.tasks.get(task.id).status).toBe("cancelled");
    expect(store.audits.some((a) => a.action === "approval.decided")).toBe(true);
  });

  it("memory isolation: project B cannot retrieve project A active memory", async () => {
    const a = await proposeMemory({
      organization_id: "org",
      project_id: "proj-a",
      content: "Only project A should see this",
      created_by: "a",
    });
    await decideMemory(a.id, "validate", { actorType: "admin", actor: "admin" });
    await decideMemory(a.id, "activate", { actorType: "admin", actor: "admin" });

    const ctxB = await retrieveMemoryForTask({
      projectId: "proj-b",
      organizationId: "org",
    });
    expect(ctxB.some((c) => c.content.includes("Only project A"))).toBe(false);
  });

  it("recovery: transient fail then retry success yields learning candidate", async () => {
    const { enqueueJob } = await import("./jobs");
    let calls = 0;
    const flaky = {
      async runAgentPrompt() {
        calls += 1;
        if (calls === 1) {
          const err = new Error("temporary upstream 429");
          err.transient = true;
          err.status = 429;
          throw err;
        }
        return {
          output: { summary: "recovered", findings: ["ok"] },
          usage: { input_tokens: 1, output_tokens: 1 },
          latencyMs: 12,
          provider: "fake",
          model: "fake",
        };
      },
    };

    const { row: task } = await repoMock.createTask({
      project_id: "p1",
      title: "Recovery research",
      status: "pending",
      input: { question: "status?" },
      created_by: "founder@mianx.ai",
    });
    await enqueueJob({
      projectId: "p1",
      taskId: task.id,
      agentSlug: "research",
      input: { question: "Assess readiness" },
      actorType: "system",
    });

    const { runTick } = await import("./worker");
    await runTick({
      providerImpl: flaky.runAgentPrompt.bind(flaky),
      workerId: "phase-b-retry",
      maxJobs: 1,
    });
    // Make job available again after backoff
    for (const j of store.jobs.values()) {
      j.available_at = new Date(0).toISOString();
      if (j.status === "queued") {
        /* ready */
      }
    }
    await runTick({
      providerImpl: flaky.runAgentPrompt.bind(flaky),
      workerId: "phase-b-retry",
      maxJobs: 1,
    });

    const job = [...store.jobs.values()][0];
    expect(job.status).toBe("succeeded");
    expect(calls).toBeGreaterThanOrEqual(2);

    const { listLearning } = await import("./memory");
    const lessons = await listLearning({ projectId: "p1" });
    expect(
      lessons.some((l) => /retry/i.test(l.proposed_lesson) || /retry/i.test(l.problem))
    ).toBe(true);
  });
});
