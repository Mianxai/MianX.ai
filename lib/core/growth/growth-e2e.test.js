import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createFakeProvider } from "../provider-fake";
import {
  WAVE5_SLUGS,
  activateGrowthPod,
  assertNoCapabilityEscalation,
  assertProjectScope,
  validateSalesOutput,
  validateMarketingOutput,
  WAVE5_ROLE_MATRIX,
  BUSINESS_GROWTH_STEPS,
} from "./index";
import { getDefinition, isInstantiable, listWaves } from "@/lib/workforce";
import { getAgentDefinition } from "../agents";

const store = {
  jobs: new Map(),
  tasks: new Map(),
  runs: new Map(),
  approvals: new Map(),
  audits: [],
  leads: new Map([["lead-1", {
    id: "lead-1",
    email: "prospect@example.com",
    name: "Prospect",
    company: "Acme",
    industry: "saas",
    message: "Interested in Mianx Core",
  }]]),
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
    getLead: vi.fn(async (id) => {
      const lead = store.leads.get(id);
      if (!lead) throw Object.assign(new Error("lead not found"), { status: 404 });
      return { ...lead };
    }),
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
    await runTick({ providerImpl: provider, workerId: "growth-worker", maxJobs: 1 });
  }
}

describe("Wave-5 role mapping", () => {
  it("activates 4 growth agents linked to workforce roles", () => {
    expect(WAVE5_SLUGS).toHaveLength(4);
    expect(WAVE5_ROLE_MATRIX).toHaveLength(4);
    for (const slug of WAVE5_SLUGS) {
      expect(getAgentDefinition(slug)?.lifecycleStatus).toBe("active");
      expect(getAgentDefinition(slug)?.prohibitedCapabilities).toContain("send_email");
    }
    for (const row of WAVE5_ROLE_MATRIX) {
      expect(isInstantiable(getDefinition(row.canonicalWorkforceId))).toBe(true);
    }
    expect(listWaves().find((w) => w.id === "wave-5").agents).toEqual(WAVE5_SLUGS);
  });

  it("activates growth pod", () => {
    const pod = activateGrowthPod({ projectId: "p1" });
    expect(pod.count).toBe(4);
  });

  it("rejects send_email escalation", () => {
    expect(() =>
      assertNoCapabilityEscalation("sales-opportunity", ["send_email"])
    ).toThrow();
    expect(() =>
      assertProjectScope({ jobProjectId: "p1", requestedProjectId: "p2" })
    ).toThrow(/scope/i);
  });
});

describe("Wave-5 schemas", () => {
  it("rejects sales external_send_allowed", () => {
    expect(() =>
      validateSalesOutput({
        qualification: "qualified",
        opportunity_summary: "ok",
        next_actions: ["call"],
        sales_status: "PASS",
        external_send_allowed: true,
      })
    ).toThrow();
  });

  it("accepts marketing plan", () => {
    const m = validateMarketingOutput({
      campaign_plan: ["a"],
      positioning: "x",
      content_plan: ["b"],
      measurement: ["c"],
      marketing_status: "PASS",
    });
    expect(m.marketing_status).toBe("PASS");
  });
});

describe("business-growth E2E", () => {
  it("runs lead → research → growth pod → QA → draft → send_email approval", async () => {
    const { startBusinessGrowth } = await import("./workflow");
    const { task, created } = await startBusinessGrowth({
      projectId: "p1",
      leadId: "lead-1",
      actor: "admin@mianx.ai",
    });
    expect(created).toBe(true);
    await runTicks(createFakeProvider(), 8);
    const slugs = [...store.jobs.values()].map((j) => j.agent_slug);
    expect(slugs[0]).toBe("lead-intelligence");
    expect(slugs).toContain("sales-opportunity");
    expect(slugs).toContain("marketing-planner");
    expect(slugs).toContain("seo-analyst");
    expect(slugs).toContain("customer-success-advisor");
    expect(slugs).toContain("qa-review");
    expect(slugs).toContain("follow-up-draft");
    expect(slugs).toEqual(BUSINESS_GROWTH_STEPS);
    expect([...store.jobs.values()].every((j) => j.status === "succeeded")).toBe(true);
    expect(store.tasks.get(task.id).status).toBe("awaiting_approval");
    expect([...store.approvals.values()][0].requested_capability).toBe("send_email");
  });

  it("halts when sales stage fails", async () => {
    store.leads.set("lead-fail", {
      id: "lead-fail",
      email: "FORCE_SALES_FAIL@example.com",
      name: "Fail",
      message: "interested",
    });
    const { startBusinessGrowth } = await import("./workflow");
    await startBusinessGrowth({
      projectId: "p1",
      leadId: "lead-fail",
      actor: "a",
    });
    await runTicks(createFakeProvider(), 8);
    expect(store.audits.some((a) => a.action === "workflow.halted")).toBe(true);
    expect(store.approvals.size).toBe(0);
  });
});
