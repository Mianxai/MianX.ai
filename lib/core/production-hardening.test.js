/**
 * Production-hardening regression tests (no paid provider, no migration apply).
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  runCompanyBuilder,
  decideCompanyBlueprint,
  listBlueprintsAsync,
  __resetCompanyBuilderStore,
} from "@/lib/core/company-builder";
import {
  __resetExecutionEngineStore,
  listPrograms,
  exportProgramSnapshot,
  importProgramSnapshot,
  getProgram,
} from "@/lib/core/execution-engine";

const store = {
  tasks: new Map(),
  approvals: new Map(),
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
  return { ...actual, recordAudit: vi.fn(async () => true) };
});

beforeEach(() => {
  store.tasks.clear();
  store.approvals.clear();
  __resetCompanyBuilderStore();
  __resetExecutionEngineStore();
  Object.assign(repoMock, {
    createTask: vi.fn(async (row) => {
      const id = uid("task");
      const task = { id, status: "awaiting_approval", ...row };
      store.tasks.set(id, task);
      return { row: task, created: true };
    }),
    getTask: vi.fn(async (id) => store.tasks.get(id) || null),
    listTasks: vi.fn(async ({ projectId } = {}) =>
      [...store.tasks.values()].filter((t) =>
        projectId ? t.project_id === projectId : true
      )
    ),
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
    getApproval: vi.fn(async (id) => store.approvals.get(id) || null),
    updateApproval: vi.fn(async (id, patch) => {
      const next = { ...store.approvals.get(id), ...patch };
      store.approvals.set(id, next);
      return next;
    }),
  });
});

const P1 = "00000000-0000-4000-8000-0000000000h1";

describe("production hardening — durable company builder + execution snapshot", () => {
  it("persists blueprint on task and hydrates after cache reset", async () => {
    const bp = await runCompanyBuilder({
      objective: "Plan a MianX Core capability programme",
      projectId: P1,
      actor: "founder@mianx.ai",
    });
    expect(bp.task_id).toBeTruthy();
    const task = store.tasks.get(bp.task_id);
    expect(task.input.blueprint?.id).toBe(bp.id);

    __resetCompanyBuilderStore();
    const listed = await listBlueprintsAsync({ projectId: P1 });
    expect(listed.some((b) => b.id === bp.id)).toBe(true);
  });

  it("approve materialises program, syncs approval, and snapshots execution", async () => {
    const bp = await runCompanyBuilder({
      objective: "Plan a MianX Core capability programme",
      projectId: P1,
      actor: "founder@mianx.ai",
    });
    const decided = await decideCompanyBlueprint({
      blueprintId: bp.id,
      decision: "approved",
      actor: "founder@mianx.ai",
    });
    expect(decided.execution.program_id).toBeTruthy();
    expect(store.approvals.get(bp.approval_id).status).toBe("approved");
    const task = store.tasks.get(bp.task_id);
    expect(task.input.execution_program_snapshot?.program?.id).toBe(
      decided.execution.program_id
    );
    expect(listPrograms({ projectId: P1 })).toHaveLength(1);

    const snap = exportProgramSnapshot(decided.execution.program_id);
    __resetExecutionEngineStore();
    expect(getProgram(decided.execution.program_id)).toBeNull();
    importProgramSnapshot(snap);
    expect(getProgram(decided.execution.program_id)?.id).toBe(
      decided.execution.program_id
    );
  });
});
