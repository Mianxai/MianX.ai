import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  parseFounderObjective,
  runCompanyBuilder,
  decideCompanyBlueprint,
  attemptExecuteBlueprint,
  __resetCompanyBuilderStore,
  BUILDER_DEPARTMENTS,
} from "./index";

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

beforeEach(() => {
  store.tasks.clear();
  store.approvals.clear();
  store.audits.length = 0;
  __resetCompanyBuilderStore();
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

describe("Company Builder Phase C E2E", () => {
  it("parses Build RestaurantOS into structured objective without building it", () => {
    const o = parseFounderObjective("Build RestaurantOS");
    expect(o.industry).toBe("restaurant");
    expect(o.product_hint).toBe("RestaurantOS");
    expect(o.constraints.some((c) => /Do not build industry OS/i.test(c))).toBe(
      true
    );
  });

  it("runs full pipeline: parse → CEO → departments → backlog → graph → roadmap → approval", async () => {
    const blueprint = await runCompanyBuilder({
      objective: "Build RestaurantOS",
      projectId: "00000000-0000-4000-8000-0000000000c1",
      actor: "founder@mianx.ai",
    });

    expect(blueprint.status).toBe("awaiting_founder_approval");
    expect(blueprint.objective.industry).toBe("restaurant");
    expect(blueprint.ceo_plan.vision).toMatch(/MianX Core/i);
    expect(blueprint.ceo_plan.departments_required).toEqual(
      expect.arrayContaining(BUILDER_DEPARTMENTS)
    );
    expect(blueprint.department_plans).toHaveLength(BUILDER_DEPARTMENTS.length);
    expect(blueprint.backlog.epics.length).toBeGreaterThan(0);
    expect(blueprint.backlog.features.length).toBeGreaterThan(0);
    expect(blueprint.backlog.stories.length).toBeGreaterThan(0);
    expect(blueprint.backlog.tasks.length).toBeGreaterThan(0);
    expect(blueprint.backlog.agent_runs.length).toBeGreaterThan(0);
    expect(blueprint.backlog.traceability).toMatch(/company → product/);
    expect(blueprint.dependency_graph.nodes.length).toBeGreaterThan(0);
    expect(blueprint.dependency_graph.edges.length).toBeGreaterThan(0);
    expect(blueprint.dependency_graph.acyclic).toBe(true);
    expect(blueprint.roadmap.execution_frozen).toBe(true);
    expect(blueprint.roadmap.waves.every((w) => w.status === "blocked_pending_founder_approval")).toBe(
      true
    );

    expect(blueprint.approval_id).toBeTruthy();
    expect(store.approvals.size).toBe(1);
    const approval = [...store.approvals.values()][0];
    expect(approval.status).toBe("pending");
    expect(approval.metadata.proposed_action).toBe(
      "company_builder_blueprint_approve"
    );

    // No protected industry execution
    const attempt = attemptExecuteBlueprint(blueprint);
    expect(attempt.executed).toBe(false);
    expect(attempt.industry_os_built).toBe(false);
    expect(blueprint.execution.industry_os_executed).toBe(false);
    expect(blueprint.execution.agent_runs_started).toBe(0);
  });

  it("Founder reject cancels blueprint without building RestaurantOS", async () => {
    const blueprint = await runCompanyBuilder({
      objective: "Build RestaurantOS",
      projectId: "00000000-0000-4000-8000-0000000000c2",
      actor: "founder@mianx.ai",
    });
    const decided = await decideCompanyBlueprint({
      blueprintId: blueprint.id,
      decision: "rejected",
      actor: "founder@mianx.ai",
    });
    expect(decided.status).toBe("rejected");
    expect(decided.execution.executed).toBe(false);
    expect(decided.execution.industry_os_built).toBe(false);
    expect(store.tasks.get(blueprint.task_id).status).toBe("cancelled");
  });

  it("Founder approve still does not auto-build industry OS", async () => {
    const blueprint = await runCompanyBuilder({
      objective: "Build RestaurantOS",
      projectId: "00000000-0000-4000-8000-0000000000c3",
      actor: "founder@mianx.ai",
    });
    const decided = await decideCompanyBlueprint({
      blueprintId: blueprint.id,
      decision: "approved",
      actor: "founder@mianx.ai",
    });
    expect(decided.status).toBe("approved");
    expect(decided.execution.executed).toBe(false);
    expect(decided.execution.industry_os_built).toBe(false);
  });
});
