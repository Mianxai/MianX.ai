import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createFakeProvider } from "../provider-fake";
import {
  WAVE6_SLUGS,
  activateAdvisoryPod,
  assertProjectScope,
  deriveAdvisoryApproval,
  validateFinanceOutput,
  validateHrOutput,
  validateLegalOutput,
  WAVE6_ROLE_MATRIX,
  ADVISORY_REVIEW_STEPS,
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
    await runTick({ providerImpl: provider, workerId: "advisory-worker", maxJobs: 1 });
  }
}

describe("Wave-6 role mapping", () => {
  it("activates 3 advisory agents with strict prohibitions", () => {
    expect(WAVE6_SLUGS).toHaveLength(3);
    expect(ADVISORY_REVIEW_STEPS).toEqual(WAVE6_SLUGS);
    for (const slug of WAVE6_SLUGS) {
      const def = getAgentDefinition(slug);
      expect(def.lifecycleStatus).toBe("active");
      expect(def.prohibitedCapabilities).toEqual(
        expect.arrayContaining([
          "send_email",
          "approve_production_action",
          "deploy_production",
          "modify_billing",
          "git_push",
        ])
      );
    }
    const finance = getAgentDefinition("finance-advisor");
    expect(finance.prohibitedCapabilities).toEqual(
      expect.arrayContaining(["transfer_funds", "execute_payment"])
    );
    const hr = getAgentDefinition("hr-workforce-planner");
    expect(hr.prohibitedCapabilities).toEqual(
      expect.arrayContaining(["hire_decide", "fire_decide", "change_compensation"])
    );
    const legal = getAgentDefinition("legal-risk-advisor");
    expect(legal.prohibitedCapabilities).toEqual(
      expect.arrayContaining(["sign_agreement", "file_regulatory", "accept_legal_terms"])
    );
    for (const row of WAVE6_ROLE_MATRIX) {
      expect(isInstantiable(getDefinition(row.canonicalWorkforceId))).toBe(true);
    }
    expect(listWaves().find((w) => w.id === "wave-6").agents).toEqual(WAVE6_SLUGS);
  });

  it("activates advisory pod", () => {
    const pod = activateAdvisoryPod({ projectId: "p1" });
    expect(pod.count).toBe(3);
  });

  it("rejects cross-project scope", () => {
    expect(() =>
      assertProjectScope({ jobProjectId: "p1", requestedProjectId: "p2" })
    ).toThrow(/scope/i);
  });
});

describe("Wave-6 schemas / policy", () => {
  it("rejects licensed-legal-advice claims", () => {
    expect(() =>
      validateLegalOutput({
        risks: ["x"],
        issues: [],
        compliance_checklist: ["y"],
        preparation: ["z"],
        legal_status: "PASS",
        disclaimer: "d",
        is_licensed_legal_advice: true,
      })
    ).toThrow();
  });

  it("accepts finance analysis-only output", () => {
    const f = validateFinanceOutput({
      analysis: "ok",
      recommendations: ["hold"],
      risks: ["r"],
      finance_status: "PASS",
    });
    expect(f.disclaimer).toMatch(/Advisory/);
  });

  it("accepts HR planning output", () => {
    const h = validateHrOutput({
      plan: ["a"],
      recommendations: ["b"],
      hr_status: "PASS",
    });
    expect(h.disclaimer).toMatch(/hiring/);
  });

  it("gates transfer_funds", () => {
    expect(deriveAdvisoryApproval("transfer_funds").required).toBe(true);
    expect(deriveAdvisoryApproval(null).required).toBe(false);
  });
});

describe("advisory-review E2E", () => {
  it("runs finance → HR → legal without approval when advisory", async () => {
    const { startAdvisoryReview } = await import("./workflow");
    const { task, created } = await startAdvisoryReview({
      projectId: "p1",
      question: "Assess budget variance for Q3 hiring plan",
      actor: "admin@mianx.ai",
    });
    expect(created).toBe(true);
    await runTicks(createFakeProvider(), 3);
    expect([...store.jobs.values()].map((j) => j.agent_slug)).toEqual(ADVISORY_REVIEW_STEPS);
    expect([...store.jobs.values()].every((j) => j.status === "succeeded")).toBe(true);
    expect(store.tasks.get(task.id).status).toBe("completed");
    expect(store.approvals.size).toBe(0);
  });

  it("requires approval for transfer_funds proposal", async () => {
    const { startAdvisoryReview } = await import("./workflow");
    const { task } = await startAdvisoryReview({
      projectId: "p1",
      question: "Can we move funds between cost centers?",
      proposedAction: "transfer_funds",
      actor: "a",
    });
    await runTicks(createFakeProvider(), 3);
    expect(store.tasks.get(task.id).status).toBe("awaiting_approval");
    expect([...store.approvals.values()][0].requested_capability).toBe(
      "approve_production_action"
    );
  });

  it("halts on FORCE_FINANCE_FAIL", async () => {
    const { startAdvisoryReview } = await import("./workflow");
    await startAdvisoryReview({
      projectId: "p1",
      question: "FORCE_FINANCE_FAIL budget review",
      actor: "a",
    });
    await runTicks(createFakeProvider(), 2);
    expect(store.audits.some((a) => a.action === "workflow.halted")).toBe(true);
  });
});
