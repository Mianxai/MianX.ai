import { describe, it, expect, beforeEach, vi } from "vitest";

/**
 * Software-factory E2E: composes executive → software-delivery starters
 * with an in-memory repo mock (no live provider / paid calls).
 */

const store = {
  jobs: new Map(),
  tasks: new Map(),
  audits: [],
};

function uid(prefix) {
  return `${prefix}-${store.jobs.size + store.tasks.size + 1}`;
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
    createAgentInstance: vi.fn(async (row) => ({ id: uid("inst"), ...row })),
    listAgentInstances: vi.fn(async () => []),
  });
}

describe("software-factory E2E", () => {
  beforeEach(() => {
    store.jobs.clear();
    store.tasks.clear();
    store.audits.length = 0;
    wireRepo();
  });

  it("composes executive → software-delivery without claiming deploy", async () => {
    const { startSoftwareFactory } = await import("./software-factory");
    const result = await startSoftwareFactory({
      projectId: "11111111-1111-4111-8111-111111111111",
      objective: "Deliver health endpoint hardening",
      mode: "software-delivery",
      actor: "founder-test",
    });

    expect(result.factory).toBe("software-factory");
    expect(result.mode).toBe("software-delivery");
    expect(result.executive?.task?.id).toBeTruthy();
    expect(result.delivery?.task?.id).toBeTruthy();
    expect(result.delivery?.job?.agent_slug).toBe("delivery-product");
    expect(result.notes.join(" ")).toMatch(/No autonomous push/i);
    expect(result.protected_action).toBe(false);
    expect(store.tasks.size).toBeGreaterThanOrEqual(2);
  });

  it("starts enterprise-objective with growth departments", async () => {
    const { startEnterpriseObjective } = await import("./workflow");
    const { task, decomposition } = await startEnterpriseObjective({
      projectId: "11111111-1111-4111-8111-111111111111",
      objective: "Business growth for inbound leads",
      departmentsNeeded: ["growth"],
      actor: "founder-test",
    });
    expect(task.input.workflow).toBe("enterprise-objective");
    expect(decomposition.workstreams.some((w) => w.department === "sales")).toBe(true);
    expect(decomposition.workforce_plan.forbiddenFullWorkforce).toBe(true);
  });

  it("starts enterprise-objective for incident in operations", async () => {
    const { startEnterpriseObjective } = await import("./workflow");
    const { decomposition } = await startEnterpriseObjective({
      projectId: "11111111-1111-4111-8111-111111111111",
      objective: "SEV-2 incident: API latency spike",
      actor: "founder-test",
    });
    expect(decomposition.workstreams.some((w) => w.department === "operations")).toBe(true);
  });
});
