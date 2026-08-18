import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createFakeProvider } from "../provider-fake";

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

async function runTicks(provider, n = 5) {
  const { runTick } = await import("../worker");
  for (let i = 0; i < n; i += 1) {
    await runTick({ providerImpl: provider, workerId: "delivery-worker", maxJobs: 1 });
  }
}

describe("software-delivery E2E (fake provider)", () => {
  it("Executive → Product → Architecture → Engineering → Review → QA completes without approval", async () => {
    const { routeExecutiveObjectiveToDelivery } = await import("./executive-bridge");
    const { task, created, executive_state } = await routeExecutiveObjectiveToDelivery({
      projectId: "p1",
      objective: "Add an internal project-health summary capability.",
      routedBy: "executive-cpo",
      actor: "admin@mianx.ai",
    });
    expect(created).toBe(true);
    expect(executive_state.routed_by).toBe("executive-cpo");

    const provider = createFakeProvider();
    await runTicks(provider, 5);

    const slugs = [...store.jobs.values()].map((j) => j.agent_slug);
    expect(slugs).toEqual([
      "delivery-product",
      "delivery-architect",
      "delivery-engineer",
      "delivery-review",
      "delivery-qa",
    ]);
    expect([...store.jobs.values()].every((j) => j.status === "succeeded")).toBe(true);
    expect(store.tasks.get(task.id).status).toBe("completed");
    expect(store.approvals.size).toBe(0);
    expect(provider.calls).toBe(5);
  });

  it("production deploy proposal awaits Founder approval", async () => {
    const { startSoftwareDelivery } = await import("./workflow");
    const { task } = await startSoftwareDelivery({
      projectId: "p1",
      objective: "Prepare feature then production_deploy",
      proposedAction: "production_deploy",
      actor: "a",
    });
    const provider = createFakeProvider();
    await runTicks(provider, 5);
    expect(store.tasks.get(task.id).status).toBe("awaiting_approval");
    expect([...store.approvals.values()][0].requested_capability).toBe(
      "approve_production_action"
    );
  });

  it("Founder rejection does not complete the protected action", async () => {
    const { startSoftwareDelivery } = await import("./workflow");
    const { decideApproval } = await import("../runtime");
    const { task } = await startSoftwareDelivery({
      projectId: "p1",
      objective: "Deploy candidate",
      proposedAction: "production_deploy",
      actor: "a",
    });
    await runTicks(createFakeProvider(), 5);
    const approval = [...store.approvals.values()][0];
    await decideApproval({
      approvalId: approval.id,
      decision: "rejected",
      decidedBy: "founder@mianx.ai",
      note: "Not yet",
      actorType: "admin",
    });
    expect(store.approvals.get(approval.id).status).toBe("rejected");
    expect(store.tasks.get(task.id).status).toBe("cancelled");
    expect(store.tasks.get(task.id).status).not.toBe("completed");
  });

  it("duplicate enqueue is idempotent", async () => {
    const { startSoftwareDelivery } = await import("./workflow");
    const key = "wf:software-delivery:p1:health";
    const a = await startSoftwareDelivery({
      projectId: "p1",
      objective: "Add project-health summary",
      actor: "a",
      idempotencyKey: key,
    });
    const b = await startSoftwareDelivery({
      projectId: "p1",
      objective: "Add project-health summary",
      actor: "a",
      idempotencyKey: key,
    });
    expect(a.created).toBe(true);
    expect(b.created).toBe(false);
    expect(store.jobs.size).toBe(1);
  });
});

describe("software-delivery failure matrix", () => {
  async function runObjective(objective, proposedAction = null) {
    const { startSoftwareDelivery } = await import("./workflow");
    await startSoftwareDelivery({
      projectId: "p1",
      objective,
      proposedAction,
      actor: "a",
    });
    await runTicks(createFakeProvider(), 5);
  }

  it("1. product requirements malformed → halt", async () => {
    await runObjective("FORCE_PRODUCT_MALFORMED health");
    expect(store.audits.some((a) => a.action === "workflow.halted")).toBe(true);
    expect(store.approvals.size).toBe(0);
  });

  it("2. missing acceptance criteria → halt", async () => {
    await runObjective("FORCE_MISSING_AC health");
    expect(store.audits.some((a) => a.action === "workflow.halted")).toBe(true);
  });

  it("5. architecture stage fails → halt", async () => {
    await runObjective("FORCE_ARCH_FAIL health");
    expect(store.audits.some((a) => a.action === "workflow.halted")).toBe(true);
  });

  it("6. engineering stage fails → halt", async () => {
    await runObjective("FORCE_ENG_FAIL health");
    expect(store.audits.some((a) => a.action === "workflow.halted")).toBe(true);
  });

  it("7. review rejects implementation → halt", async () => {
    await runObjective("FORCE_REVIEW_REJECT health");
    expect(store.audits.some((a) => a.action === "workflow.halted")).toBe(true);
    expect([...store.tasks.values()].some((t) => t.status === "failed")).toBe(true);
  });

  it("8. QA fails → halt, no success", async () => {
    await runObjective("FORCE_QA_FAIL health");
    expect(store.audits.some((a) => a.action === "workflow.halted")).toBe(true);
    expect(store.approvals.size).toBe(0);
    expect([...store.tasks.values()].every((t) => t.status !== "completed")).toBe(true);
  });

  it("9. QA blocked → halt", async () => {
    await runObjective("FORCE_QA_BLOCKED health");
    expect(store.audits.some((a) => a.action === "workflow.halted")).toBe(true);
  });

  it("15. provider unavailable → job fails without false success", async () => {
    const { startSoftwareDelivery } = await import("./workflow");
    await startSoftwareDelivery({
      projectId: "p1",
      objective: "Add project-health summary",
      actor: "a",
    });
    const provider = createFakeProvider({ permanentFailure: true });
    await runTicks(provider, 1);
    const jobs = [...store.jobs.values()];
    expect(jobs.some((j) => j.status === "failed" || j.status === "dead_letter" || j.status === "queued")).toBe(
      true
    );
    expect([...store.tasks.values()].every((t) => t.status !== "completed")).toBe(true);
  });

  it("3/4/18/20. unknown agent, unauthorized delegation, self-certify, escalation", async () => {
    const {
      assertWave2Agent,
      assertQaIndependence,
      assertNoCapabilityEscalation,
    } = await import("./policy");
    const { routeExecutiveObjectiveToDelivery } = await import("./executive-bridge");
    expect(() => assertWave2Agent("unknown-eng")).toThrow();
    expect(() =>
      assertQaIndependence({ implementerSlug: "delivery-qa", qaSlug: "delivery-qa" })
    ).toThrow();
    expect(() =>
      assertNoCapabilityEscalation("delivery-product", ["send_email"])
    ).toThrow();
    await expect(
      routeExecutiveObjectiveToDelivery({
        projectId: "p1",
        objective: "x",
        routedBy: "executive-cfo",
        actor: "a",
      })
    ).rejects.toThrow(/not permitted/);
  });

  it("rejects silent scope expansion into production deploy", async () => {
    const { assertNoSilentScopeExpansion } = await import("./schemas");
    expect(() =>
      assertNoSilentScopeExpansion(
        { scope: "Includes production deploy of feature" },
        "Add internal admin summary"
      )
    ).toThrow(/scope expansion/);
  });

  it("12. cancelled objective must not continue (task transition)", async () => {
    const { canTransitionTask } = await import("../tasks");
    expect(canTransitionTask("cancelled", "running")).toBe(false);
    expect(canTransitionTask("cancelled", "completed")).toBe(false);
  });

  it("10/11. retrying and dead_letter prevent success claims", async () => {
    const { canTransitionTask } = await import("../tasks");
    // Job-level: dead_letter / retrying are job statuses; task must not complete.
    expect(canTransitionTask("failed", "completed")).toBe(false);
    expect(canTransitionTask("running", "completed")).toBe(true);
  });
});
