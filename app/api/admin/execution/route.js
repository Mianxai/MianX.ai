import { NextResponse } from "next/server";
import {
  withErrorHandling,
  notConfigured,
  validationError,
  forbidden,
} from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { parseJsonBody, assertUuid } from "@/lib/core/validate";
import { rateLimit } from "@/lib/core/ratelimit";
import * as repo from "@/lib/core/repo";
import {
  listPrograms,
  getProgram,
  listItems,
  listDependencies,
  listEvents,
  listAllocations,
  buildExecutionSnapshot,
  pauseProgram,
  resumeProgram,
  cancelProgram,
  submitReview,
  getItem,
  runOrchestratorTick,
  createExecutionFakeProvider,
  getExecutionProviderStatus,
  executionPersistenceNote,
} from "@/lib/core/execution-engine";
import { hydrateBlueprintsFromTasks } from "@/lib/core/company-builder";
import { exportProgramSnapshot } from "@/lib/core/execution-engine/persist";

export const dynamic = "force-dynamic";

function guardSupabase() {
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured("Supabase is not configured.");
  }
}

async function hydrateExecutionFromTasks(projectId = null) {
  await hydrateBlueprintsFromTasks({ projectId });
}

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  guardSupabase();
  const url = new URL(req.url);
  const projectIdRaw = url.searchParams.get("project_id");
  const programId = url.searchParams.get("program_id");
  const view = url.searchParams.get("view") || "list";

  let projectId = null;
  if (projectIdRaw) {
    assertUuid(projectIdRaw, "project_id");
    projectId = projectIdRaw;
  }

  await hydrateExecutionFromTasks(projectId);

  if (view === "snapshot") {
    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      snapshot: buildExecutionSnapshot({ projectId }),
      persistence: executionPersistenceNote(),
      provider: getExecutionProviderStatus(),
    });
  }

  if (programId) {
    const program = getProgram(programId);
    if (!program) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Program not found." } },
        { status: 404 }
      );
    }
    if (projectId && program.project_id !== projectId) {
      throw forbidden("Cross-project access denied.");
    }
    return NextResponse.json({
      program,
      items: listItems({ programId }),
      dependencies: listDependencies({ programId }),
      events: listEvents({ programId }),
      allocations: listAllocations({ programId }),
      persistence: executionPersistenceNote(),
    });
  }

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    projectId,
    programs: listPrograms({ projectId }),
    snapshot: buildExecutionSnapshot({ projectId }),
    persistence: executionPersistenceNote(),
    provider: getExecutionProviderStatus(),
    note: "Phase D execution engine — planning deliverables only; industry OS not built.",
  });
});

export const POST = withErrorHandling(async (req) => {
  const admin = await requireAdmin(req);
  guardSupabase();
  rateLimit(`admin:execution:${admin.id || admin.email || "x"}`, {
    max: 30,
    windowMs: 60_000,
  });
  const body = await parseJsonBody(req, 16_384);
  const actor = admin.email || admin.id || "admin";

  await hydrateExecutionFromTasks(body.project_id || null);

  if (body.action === "pause") {
    if (!body.program_id) throw validationError("program_id required.");
    return NextResponse.json({
      program: pauseProgram(body.program_id, { actor, scope: body.scope || "program" }),
    });
  }
  if (body.action === "resume") {
    if (!body.program_id) throw validationError("program_id required.");
    return NextResponse.json({
      program: resumeProgram(body.program_id, { actor }),
    });
  }
  if (body.action === "cancel") {
    if (!body.program_id) throw validationError("program_id required.");
    return NextResponse.json({
      program: cancelProgram(body.program_id, { actor }),
    });
  }
  if (body.action === "review") {
    if (!body.item_id) throw validationError("item_id required.");
    const item = getItem(body.item_id);
    if (!item) throw validationError("Item not found.");
    const review = submitReview({
      item,
      reviewer: actor,
      author: item.assigned_agent,
      verdict: body.verdict || "pass",
      kind: body.kind || "qa",
      notes: body.notes || null,
    });
    return NextResponse.json({ review });
  }
  if (body.action === "tick") {
    // Never invent success: use real provider adapter (unavailable without config).
    // Deterministic fake provider only when explicitly requested AND NODE_ENV=test.
    let providerAdapter = null;
    if (body.use_fake_provider === true && process.env.NODE_ENV === "test") {
      providerAdapter = createExecutionFakeProvider();
    }
    const summary = await runOrchestratorTick({
      programId: body.program_id || null,
      maxItems: Math.min(Number(body.max_items) || 4, 6),
      providerAdapter,
    });
    // Refresh durable snapshot for touched programs
    for (const p of listPrograms({ projectId: body.project_id || null })) {
      try {
        const tasks = await repo.listTasks({ projectId: p.project_id });
        const task = (tasks || []).find(
          (t) =>
            t.input?.execution_program_id === p.id ||
            t.input?.blueprint?.execution_program_id === p.id
        );
        if (task) {
          const prev = task.input && typeof task.input === "object" ? task.input : {};
          await repo.updateTask(task.id, {
            input: {
              ...prev,
              execution_program_snapshot: exportProgramSnapshot(p.id),
            },
          });
        }
      } catch {
        /* best-effort */
      }
    }
    return NextResponse.json({
      summary,
      provider: getExecutionProviderStatus(),
      note: "Tick advances bounded ready work. Without a configured provider, runs fail truthfully (PROVIDER_UNAVAILABLE).",
    });
  }

  throw validationError("Unknown action.");
});
