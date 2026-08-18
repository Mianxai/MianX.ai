import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createFakeProvider } from "../provider-fake";
import {
  WAVE3_SLUGS,
  activatePlatformPod,
  assertNoCapabilityEscalation,
  assertProjectScope,
  WAVE3_ROLE_MATRIX,
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
    await runTick({ providerImpl: provider, workerId: "platform-worker", maxJobs: 1 });
  }
}

describe("Wave-3 role mapping", () => {
  it("activates 5 Wave-3 agents linked to instantiable workforce roles", () => {
    expect(WAVE3_SLUGS).toHaveLength(5);
    expect(WAVE3_ROLE_MATRIX).toHaveLength(5);
    for (const slug of WAVE3_SLUGS) {
      expect(getAgentDefinition(slug)?.lifecycleStatus).toBe("active");
    }
    for (const row of WAVE3_ROLE_MATRIX) {
      const wf = getDefinition(row.canonicalWorkforceId);
      expect(wf).toBeTruthy();
      expect(isInstantiable(wf)).toBe(true);
    }
    expect(listWaves().find((w) => w.id === "wave-3").agents).toEqual(WAVE3_SLUGS);
  });

  it("activates a project-scoped platform pod", () => {
    const pod = activatePlatformPod({ projectId: "p1" });
    expect(pod.count).toBe(5);
    expect(pod.instances.every((i) => i.production_mutation_authority === false)).toBe(true);
  });

  it("rejects capability escalation and cross-project access", () => {
    expect(() =>
      assertNoCapabilityEscalation("platform-security", ["approve_production_action"])
    ).toThrow();
    expect(() =>
      assertProjectScope({ jobProjectId: "p1", requestedProjectId: "p2" })
    ).toThrow(/Cross-project/);
  });
});

describe("controlled-delivery E2E (fake provider + disposable workspace)", () => {
  let workspace;
  beforeEach(() => {
    workspace = fs.mkdtempSync(path.join(os.tmpdir(), "mianx-cd-"));
    fs.mkdirSync(path.join(workspace, "fixtures"), { recursive: true });
  });
  afterEach(() => {
    fs.rmSync(workspace, { recursive: true, force: true });
  });

  it("Executive/Wave-2 → coding fixture → reviews → platform readiness without approval", async () => {
    const { startControlledDelivery } = await import("./workflow");
    const { task, created } = await startControlledDelivery({
      projectId: "p1",
      objective: "Add an internal project-health summary capability.",
      workspaceRoot: workspace,
      edits: [
        {
          path: "fixtures/project-health-note.txt",
          content: "Advisory health summary candidate — Wave-3 fixture.\n",
        },
      ],
      allowedPathPrefixes: ["fixtures/"],
      commands: [],
      routedBy: "executive-cpo",
      actor: "admin@mianx.ai",
    });
    expect(created).toBe(true);

    const provider = createFakeProvider();
    await runTicks(provider, 10);

    const slugs = [...store.jobs.values()].map((j) => j.agent_slug);
    expect(slugs[0]).toBe("delivery-product");
    expect(slugs).toContain("coding-executor");
    expect(slugs).toContain("platform-security");
    expect(slugs).toContain("delivery-qa");
    expect(slugs).toContain("platform-devops");
    expect(slugs).toContain("platform-data-ai");
    expect([...store.jobs.values()].every((j) => j.status === "succeeded")).toBe(true);
    expect(store.tasks.get(task.id).status).toBe("completed");
    expect(store.approvals.size).toBe(0);
    expect(
      fs.readFileSync(path.join(workspace, "fixtures/project-health-note.txt"), "utf8")
    ).toContain("Wave-3 fixture");
  });

  it("production deploy proposal awaits Founder approval", async () => {
    const { startControlledDelivery } = await import("./workflow");
    const { task } = await startControlledDelivery({
      projectId: "p1",
      objective: "Ship feature with production_deploy",
      workspaceRoot: workspace,
      edits: [{ path: "fixtures/x.txt", content: "x\n" }],
      allowedPathPrefixes: ["fixtures/"],
      proposedAction: "production_deploy",
      actor: "a",
    });
    await runTicks(createFakeProvider(), 10);
    expect(store.tasks.get(task.id).status).toBe("awaiting_approval");
    expect([...store.approvals.values()][0].requested_capability).toBe(
      "approve_production_action"
    );
  });

  it("Founder rejection does not complete protected action", async () => {
    const { startControlledDelivery } = await import("./workflow");
    const { decideApproval } = await import("../runtime");
    const { task } = await startControlledDelivery({
      projectId: "p1",
      objective: "Deploy candidate",
      workspaceRoot: workspace,
      edits: [{ path: "fixtures/x.txt", content: "x\n" }],
      allowedPathPrefixes: ["fixtures/"],
      proposedAction: "production_deploy",
      actor: "a",
    });
    await runTicks(createFakeProvider(), 10);
    const approval = [...store.approvals.values()][0];
    await decideApproval({
      approvalId: approval.id,
      decision: "rejected",
      decidedBy: "founder@mianx.ai",
      actorType: "admin",
    });
    expect(store.approvals.get(approval.id).status).toBe("rejected");
    expect(store.tasks.get(task.id).status).toBe("cancelled");
  });

  it("duplicate coding task enqueue is idempotent", async () => {
    const { startPlatformCandidate } = await import("./workflow");
    const key = "wf:platform-candidate:p1:dup";
    const a = await startPlatformCandidate({
      projectId: "p1",
      objective: "fixture",
      workspaceRoot: workspace,
      edits: [{ path: "fixtures/a.txt", content: "a\n" }],
      allowedPathPrefixes: ["fixtures/"],
      actor: "a",
      idempotencyKey: key,
    });
    const b = await startPlatformCandidate({
      projectId: "p1",
      objective: "fixture",
      workspaceRoot: workspace,
      edits: [{ path: "fixtures/a.txt", content: "a\n" }],
      allowedPathPrefixes: ["fixtures/"],
      actor: "a",
      idempotencyKey: key,
    });
    expect(a.created).toBe(true);
    expect(b.created).toBe(false);
    expect(store.jobs.size).toBe(1);
  });
});

describe("Wave-3 failure matrix", () => {
  let workspace;
  beforeEach(() => {
    workspace = fs.mkdtempSync(path.join(os.tmpdir(), "mianx-fail-"));
    fs.mkdirSync(path.join(workspace, "fixtures"), { recursive: true });
  });
  afterEach(() => {
    fs.rmSync(workspace, { recursive: true, force: true });
  });

  async function runObj(objective) {
    const { startPlatformCandidate } = await import("./workflow");
    await startPlatformCandidate({
      projectId: "p1",
      objective,
      workspaceRoot: workspace,
      edits: [{ path: "fixtures/a.txt", content: "a\n" }],
      allowedPathPrefixes: ["fixtures/"],
      actor: "a",
    });
    await runTicks(createFakeProvider(), 5);
  }

  it("security FAIL prevents success", async () => {
    await runObj("FORCE_SECURITY_FAIL candidate");
    expect(store.audits.some((a) => a.action === "workflow.halted")).toBe(true);
    expect(store.approvals.size).toBe(0);
  });

  it("infra BLOCKED prevents success", async () => {
    await runObj("FORCE_INFRA_BLOCKED candidate");
    expect(store.audits.some((a) => a.action === "workflow.halted")).toBe(true);
  });

  it("QA FAIL on controlled delivery prevents success", async () => {
    const { startControlledDelivery } = await import("./workflow");
    await startControlledDelivery({
      projectId: "p1",
      objective: "FORCE_QA_FAIL health",
      workspaceRoot: workspace,
      edits: [{ path: "fixtures/a.txt", content: "a\n" }],
      allowedPathPrefixes: ["fixtures/"],
      actor: "a",
    });
    await runTicks(createFakeProvider(), 10);
    expect(store.audits.some((a) => a.action === "workflow.halted")).toBe(true);
    expect([...store.tasks.values()].every((t) => t.status !== "completed")).toBe(true);
  });

  it("provider unavailable does not claim completion", async () => {
    const { startPlatformCandidate } = await import("./workflow");
    await startPlatformCandidate({
      projectId: "p1",
      objective: "x",
      workspaceRoot: workspace,
      edits: [{ path: "fixtures/a.txt", content: "a\n" }],
      allowedPathPrefixes: ["fixtures/"],
      actor: "a",
    });
    await runTicks(createFakeProvider({ permanentFailure: true }), 1);
    expect([...store.tasks.values()].every((t) => t.status !== "completed")).toBe(true);
  });

  it("cancelled tasks cannot transition to running", async () => {
    const { canTransitionTask } = await import("../tasks");
    expect(canTransitionTask("cancelled", "running")).toBe(false);
  });
});
