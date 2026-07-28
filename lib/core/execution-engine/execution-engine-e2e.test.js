/**
 * Phase D — Autonomous Execution Engine E2E (deterministic fake provider).
 * Scenarios A–H. No paid provider calls. No production mutations.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  runCompanyBuilder,
  decideCompanyBlueprint,
  __resetCompanyBuilderStore,
} from "@/lib/core/company-builder";
import {
  __resetExecutionEngineStore,
  listPrograms,
  listItems,
  listCheckpoints,
  listEvents,
  listAllocations,
  runOrchestratorTick,
  createExecutionFakeProvider,
  getExecutionProviderStatus,
  assertNoDependencyCycles,
  assertNoCapabilityEscalation,
  pauseProgram,
  resumeProgram,
  proposeProtectedAction,
  buildExecutionSnapshot,
  ALLOCATION_BOUNDS,
  canTransition,
  transitionState,
  materializeExecutionProgram,
  getProgram,
  saveItem,
  getItem,
  allocateAgent,
  executeAgentRun,
  selectProgramsFairly,
  assertNotWholeWorkforce,
} from "@/lib/core/execution-engine";

const store = {
  tasks: new Map(),
  approvals: new Map(),
  audits: [],
};

function uid(prefix) {
  return `${prefix}-${store.tasks.size + store.approvals.size + 1}`;
}

const repoMock = vi.hoisted(() => ({}));
vi.mock("@/lib/core/repo", () => repoMock);
vi.mock("@/lib/supabase", () => ({
  getSupabaseAdmin: () => ({}),
  isSupabaseConfigured: () => true,
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
vi.mock("@/lib/core/memory", () => ({
  proposeMemory: vi.fn(async () => ({ ok: true })),
  proposeLearning: vi.fn(async () => ({ ok: true })),
}));

const P1 = "00000000-0000-4000-8000-0000000000d1";
const P2 = "00000000-0000-4000-8000-0000000000d2";

beforeEach(() => {
  store.tasks.clear();
  store.approvals.clear();
  store.audits.length = 0;
  __resetCompanyBuilderStore();
  __resetExecutionEngineStore();
  Object.assign(repoMock, {
    createTask: vi.fn(async (row) => {
      const id = uid("task");
      const task = { id, status: "awaiting_approval", ...row };
      store.tasks.set(id, task);
      return { row: task, created: true };
    }),
    updateTask: vi.fn(async (id, patch) => {
      const next = { ...store.tasks.get(id), ...patch };
      store.tasks.set(id, next);
      return next;
    }),
    createApproval: vi.fn(async (row) => {
      const id = uid("appr");
      const approval = { id, status: "pending", ...row };
      store.approvals.set(id, approval);
      return { ...approval };
    }),
  });
});

async function approveRestaurantOs(projectId = P1) {
  const blueprint = await runCompanyBuilder({
    objective: "Build RestaurantOS",
    projectId,
    actor: "founder@mianx.ai",
  });
  const decided = await decideCompanyBlueprint({
    blueprintId: blueprint.id,
    decision: "approved",
    actor: "founder@mianx.ai",
  });
  return { blueprint, decided };
}

async function drainProgram(programId, providerAdapter, maxTicks = 80) {
  let last = null;
  for (let i = 0; i < maxTicks; i += 1) {
    last = await runOrchestratorTick({
      programId,
      providerAdapter,
      maxItems: ALLOCATION_BOUNDS.maxAgentsPerProgramTick,
    });
    const remaining = listItems({ programId }).filter(
      (x) =>
        ["task", "agent_run"].includes(x.level) &&
        !["succeeded", "cancelled", "dead_lettered"].includes(x.status)
    );
    if (!remaining.length) break;
  }
  return last;
}

describe("Phase D execution engine E2E", () => {
  it("Scenario A: RestaurantOS plan → approve → execute → reviews → CEO brief", async () => {
    const { decided } = await approveRestaurantOs(P1);
    expect(decided.status).toBe("approved");
    expect(decided.execution.industry_os_built).toBe(false);
    expect(decided.execution.program_id).toBeTruthy();

    const programs = listPrograms({ projectId: P1 });
    expect(programs).toHaveLength(1);
    const program = programs[0];
    expect(program.frozen_blueprint).toBeTruthy();
    expect(listItems({ programId: program.id }).length).toBeGreaterThan(0);
    expect(
      listCheckpoints({ programId: program.id }).some(
        (c) => c.kind === "blueprint_approved"
      )
    ).toBe(true);

    assertNotWholeWorkforce(ALLOCATION_BOUNDS.maxAgentsPerProgramTick);

    const fake = createExecutionFakeProvider();
    await drainProgram(program.id, fake);

    const leaves = listItems({ programId: program.id }).filter((i) =>
      ["task", "agent_run"].includes(i.level)
    );
    expect(leaves.every((i) => i.status === "succeeded")).toBe(true);
    expect(leaves.some((i) => i.status === "succeeded")).toBe(true);

    const done = getProgram(program.id);
    expect(done.status).toBe("succeeded");
    expect(
      listCheckpoints({ programId: program.id }).some(
        (c) => c.kind === "program_completed"
      )
    ).toBe(true);
    expect(done.metadata?.ceo_brief || listCheckpoints({ programId: program.id }).find((c) => c.kind === "program_completed")?.payload?.ceo_brief).toBeTruthy();
    expect(String(JSON.stringify(done)).toLowerCase()).not.toMatch(
      /restaurantos built/
    );
  });

  it("Scenario B: provider unavailable → not falsely completed + truthful status", async () => {
    const { decided } = await approveRestaurantOs(P1);
    const program = listPrograms({ projectId: P1 })[0];
    expect(decided.execution.program_id).toBe(program.id);

    const summary = await runOrchestratorTick({
      programId: program.id,
      providerAdapter: null,
      maxItems: 2,
    });
    expect(summary.succeeded).toBe(0);

    const items = listItems({ programId: program.id }).filter((i) =>
      ["task", "agent_run"].includes(i.level)
    );
    expect(items.every((i) => i.status !== "succeeded")).toBe(true);
    const failed = items.filter((i) => i.status === "failed");
    expect(failed.length).toBeGreaterThan(0);
    expect(failed.every((i) => i.audit_metadata?.retry_safe)).toBe(true);
    expect(failed.every((i) => i.audit_metadata?.falsely_completed === false)).toBe(
      true
    );

    const provider = getExecutionProviderStatus();
    expect(provider.configured).toBe("unconfigured");
    const snap = buildExecutionSnapshot({ projectId: P1 });
    expect(snap.provider.configured).toBe("unconfigured");
    expect(snap.succeeded).toBe(0);
  });

  it("Scenario C: protected deployment requires Founder approval and does not deploy", async () => {
    await approveRestaurantOs(P1);
    const program = listPrograms({ projectId: P1 })[0];
    const result = proposeProtectedAction({
      program,
      action: "production_deploy",
      actor: "agent:devops",
    });
    expect(result.executed).toBe(false);
    expect(result.deployment_executed).toBe(false);
    expect(result.requires_founder_approval).toBe(true);
    expect(result.proposal.status).toBe("awaiting_approval");
    const evt = listEvents({ programId: program.id }).find(
      (e) => e.event_type === "protected_action_proposed"
    );
    expect(evt.payload.executed).toBe(false);
  });

  it("Scenario D: agent failure → retry → dead-letter after limit", async () => {
    await approveRestaurantOs(P1);
    const program = listPrograms({ projectId: P1 })[0];
    // Isolate one leaf so attempts concentrate (bounded recovery proof).
    const leaves = listItems({ programId: program.id }).filter((i) =>
      ["task", "agent_run"].includes(i.level)
    );
    const target = leaves.find((i) => i.level === "task");
    for (const i of leaves) {
      if (i.id === target.id) {
        saveItem({ ...i, max_attempts: 3, dependency_ids: [] });
      } else {
        saveItem({ ...i, status: "cancelled" });
      }
    }

    let calls = 0;
    const flaky = createExecutionFakeProvider({
      default: async () => {
        calls += 1;
        const err = new Error("transient flake");
        err.transient = true;
        throw err;
      },
    });

    for (let i = 0; i < 10; i += 1) {
      await runOrchestratorTick({
        programId: program.id,
        providerAdapter: flaky,
        maxItems: 1,
        now: Date.now() + i * 120_000,
      });
      if (getItem(target.id)?.status === "dead_lettered") break;
    }

    expect(getItem(target.id)?.status).toBe("dead_lettered");
    expect(calls).toBeGreaterThanOrEqual(3);
    expect(
      listEvents({ programId: program.id }).some((e) => e.event_type === "run_failed")
    ).toBe(true);
  });

  it("Scenario E: two projects — isolation + fairness + no monopoly", async () => {
    await approveRestaurantOs(P1);
    await approveRestaurantOs(P2);
    expect(listPrograms()).toHaveLength(2);

    const fair = selectProgramsFairly({ maxPrograms: 2, cursor: 0 });
    expect(fair.project_count).toBe(2);
    expect(new Set(fair.programs.map((p) => p.project_id)).size).toBe(2);

    const fake = createExecutionFakeProvider();
    const s1 = await runOrchestratorTick({
      programId: listPrograms({ projectId: P1 })[0].id,
      providerAdapter: fake,
      maxItems: 3,
    });
    const s2 = await runOrchestratorTick({
      programId: listPrograms({ projectId: P2 })[0].id,
      providerAdapter: fake,
      maxItems: 3,
    });
    expect(s1.assigned + s2.assigned).toBeLessThanOrEqual(
      ALLOCATION_BOUNDS.maxConcurrentRunsGlobal
    );

    const a1 = listItems({ projectId: P1 });
    const a2 = listItems({ projectId: P2 });
    expect(a1.every((i) => i.project_id === P1)).toBe(true);
    expect(a2.every((i) => i.project_id === P2)).toBe(true);
    expect(listAllocations().length).toBeLessThan(36);
  });

  it("Scenario F: pause and resume — no duplicate runs", async () => {
    await approveRestaurantOs(P1);
    const program = listPrograms({ projectId: P1 })[0];
    const fake = createExecutionFakeProvider();
    await runOrchestratorTick({
      programId: program.id,
      providerAdapter: fake,
      maxItems: 2,
    });
    const succeededBefore = listItems({ programId: program.id }).filter(
      (i) => i.status === "succeeded"
    ).length;

    pauseProgram(program.id, { actor: "founder@mianx.ai" });
    const mid = await runOrchestratorTick({
      programId: program.id,
      providerAdapter: fake,
      maxItems: 4,
    });
    expect(mid.skipped_paused + mid.ran).toBeGreaterThanOrEqual(0);
    expect(mid.ran).toBe(0);

    resumeProgram(program.id, { actor: "founder@mianx.ai" });
    await runOrchestratorTick({
      programId: program.id,
      providerAdapter: fake,
      maxItems: 2,
    });
    const ids = listItems({ programId: program.id }).map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(
      listItems({ programId: program.id }).filter((i) => i.status === "succeeded")
        .length
    ).toBeGreaterThanOrEqual(succeededBefore);
  });

  it("Scenario G: invalid dependency cycle rejected before execution", () => {
    expect(() =>
      assertNoDependencyCycles(
        [{ id: "a" }, { id: "b" }],
        [
          { from: "a", to: "b" },
          { from: "b", to: "a" },
        ]
      )
    ).toThrow(/cycle/i);
  });

  it("Scenario H: capability escalation rejected and audited", async () => {
    await approveRestaurantOs(P1);
    const program = listPrograms({ projectId: P1 })[0];
    expect(() =>
      assertNoCapabilityEscalation("research", ["production_deploy"])
    ).toThrow(/escalation|Capability|forbidden/i);

    const item = listItems({ programId: program.id }).find((i) => i.level === "task");
    const assigned = {
      ...item,
      assigned_agent: "research",
      status: "assigned",
    };
    saveItem(assigned);
    const result = await executeAgentRun({
      item: assigned,
      program,
      providerAdapter: createExecutionFakeProvider({
        default: async () => {
          assertNoCapabilityEscalation("research", ["secret_change"]);
          return { status: "succeeded", output: { summary: "x" } };
        },
      }),
    });
    // Escalation throws inside provider path → failure path
    expect(result.status).not.toBe("succeeded");
    expect(
      listEvents({ programId: program.id }).some(
        (e) =>
          e.event_type === "run_failed" ||
          e.event_type === "capability_or_envelope_rejected"
      )
    ).toBe(true);
  });

  it("state machine rejects invalid transitions", () => {
    expect(canTransition("succeeded", "running")).toBe(false);
    expect(() =>
      transitionState({ status: "succeeded", id: "x" }, "running")
    ).toThrow();
  });

  it("materialize refuses rejected blueprints", () => {
    expect(() =>
      materializeExecutionProgram({
        status: "rejected",
        id: "bp",
        project_id: P1,
      })
    ).toThrow(/non-executable|rejected/i);
  });
});
