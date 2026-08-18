import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createFakeProvider } from "../provider-fake";
import {
  WAVE4_SLUGS,
  activateOperationsPod,
  assertNoCapabilityEscalation,
  assertProjectScope,
  validateOpsOutput,
  validateSupportOutput,
  validateAnalyticsOutput,
  WAVE4_ROLE_MATRIX,
  OPERATIONS_INCIDENT_STEPS,
} from "./index";
import { getDefinition, isInstantiable, listWaves } from "@/lib/workforce";
import { getAgentDefinition } from "../agents";

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

async function runTicks(provider, n) {
  const { runTick } = await import("../worker");
  for (let i = 0; i < n; i += 1) {
    await runTick({ providerImpl: provider, workerId: "ops-worker", maxJobs: 1 });
  }
}

describe("Wave-4 role mapping", () => {
  it("activates 3 Wave-4 agents linked to instantiable workforce roles", () => {
    expect(WAVE4_SLUGS).toHaveLength(3);
    expect(WAVE4_ROLE_MATRIX).toHaveLength(3);
    expect(OPERATIONS_INCIDENT_STEPS).toEqual(WAVE4_SLUGS);
    for (const slug of WAVE4_SLUGS) {
      expect(getAgentDefinition(slug)?.lifecycleStatus).toBe("active");
      expect(getAgentDefinition(slug)?.prohibitedCapabilities).toContain("send_email");
    }
    for (const row of WAVE4_ROLE_MATRIX) {
      const wf = getDefinition(row.canonicalWorkforceId);
      expect(wf).toBeTruthy();
      expect(isInstantiable(wf)).toBe(true);
    }
    expect(listWaves().find((w) => w.id === "wave-4").agents).toEqual(WAVE4_SLUGS);
  });

  it("activates a project-scoped operations pod", () => {
    const pod = activateOperationsPod({ projectId: "p1" });
    expect(pod.count).toBe(3);
    expect(pod.instances.every((i) => i.production_mutation_authority === false)).toBe(true);
  });

  it("rejects capability escalation and cross-project access", () => {
    expect(() =>
      assertNoCapabilityEscalation("ops-coordinator", ["send_email"])
    ).toThrow();
    expect(() =>
      assertProjectScope({ jobProjectId: "p1", requestedProjectId: "p2" })
    ).toThrow(/scope/i);
  });
});

describe("Wave-4 schemas / policy", () => {
  it("rejects support claiming external send authority", () => {
    expect(() =>
      validateSupportOutput({
        classification: "x",
        priority: "P2",
        draft_response: "hi",
        support_status: "PASS",
        external_send_allowed: true,
      })
    ).toThrow();
  });

  it("rejects fabricated analytics claims", () => {
    expect(() =>
      validateAnalyticsOutput({
        metrics: {},
        data_available: false,
        insufficient_data: ["none"],
        insights: ["x"],
        analytics_status: "PASS",
        fabricated_claims: ["uptime 99.9%"],
      })
    ).toThrow();
  });

  it("accepts valid ops output", () => {
    const ops = validateOpsOutput({
      incident_class: "latency",
      severity: "medium",
      process_health: "ok",
      blockers: [],
      ops_status: "PASS",
      recommended_actions: ["Watch"],
    });
    expect(ops.ops_status).toBe("PASS");
  });
});

describe("operations-incident E2E", () => {
  it("runs ops → support → analytics without approval when advisory", async () => {
    const { startOperationsIncident } = await import("./workflow");
    const { task, created } = await startOperationsIncident({
      projectId: "p1",
      signal: "Elevated error rate on admin dashboard",
      actor: "admin@mianx.ai",
    });
    expect(created).toBe(true);
    await runTicks(createFakeProvider(), 3);
    const slugs = [...store.jobs.values()].map((j) => j.agent_slug);
    expect(slugs).toEqual([
      "ops-coordinator",
      "support-triage",
      "analytics-reporter",
    ]);
    expect([...store.jobs.values()].every((j) => j.status === "succeeded")).toBe(true);
    expect(store.tasks.get(task.id).status).toBe("completed");
    expect(store.approvals.size).toBe(0);
  });

  it("parks for Founder approval on protected proposed_action", async () => {
    const { startOperationsIncident } = await import("./workflow");
    const { task } = await startOperationsIncident({
      projectId: "p1",
      signal: "Need production remediation",
      proposedAction: "production_remediation",
      actor: "a",
    });
    await runTicks(createFakeProvider(), 3);
    expect(store.tasks.get(task.id).status).toBe("awaiting_approval");
    expect([...store.approvals.values()][0].requested_capability).toBe(
      "approve_production_action"
    );
  });

  it("halts on FORCE_OPS_FAIL", async () => {
    const { startOperationsIncident } = await import("./workflow");
    await startOperationsIncident({
      projectId: "p1",
      signal: "FORCE_OPS_FAIL outage",
      actor: "a",
    });
    await runTicks(createFakeProvider(), 2);
    expect(store.audits.some((a) => a.action === "workflow.halted")).toBe(true);
    expect(store.approvals.size).toBe(0);
  });

  it("support draft never claims email send", async () => {
    const out = createFakeProvider();
    const result = await out({ slug: "support-triage", input: { issue: "x" } });
    expect(result.output.external_send_allowed).toBe(false);
  });
});
