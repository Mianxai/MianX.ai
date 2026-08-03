import { NextResponse } from "next/server";
import {
  withErrorHandling,
  notConfigured,
  validationError,
  badRequest,
} from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { assertUuid } from "@/lib/core/validate";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import {
  listMemory,
  proposeMemory,
  decideMemory,
  memoryLearningPersistenceStatus,
} from "@/lib/core/memory";
import { buildMemoryListPresentation } from "@/lib/core/memory/list-presentation";
import { requireProjectAccess } from "@/lib/tenant/project-access";

export const dynamic = "force-dynamic";

export const GET = withErrorHandling(async (req) => {
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    await requireAdmin(req);
    throw notConfigured(
      "Configuration error: Supabase environment variables are not set."
    );
  }
  const url = new URL(req.url);
  const projectId = url.searchParams.get("project_id") || null;
  if (!projectId) {
    await requireAdmin(req);
    throw badRequest("project_id is required.");
  }
  assertUuid(projectId, "project_id");
  await requireProjectAccess(req, projectId);
  const [items, persistence] = await Promise.all([
    listMemory({ projectId }),
    memoryLearningPersistenceStatus(),
  ]);
  const presentation = buildMemoryListPresentation({
    items,
    persistence,
    projectId,
  });
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    projectId,
    items,
    persistence,
    empty_state: presentation.empty_state,
    counts: presentation.counts,
    note: presentation.note,
  });
});

export const POST = withErrorHandling(async (req) => {
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    await requireAdmin(req);
    throw notConfigured(
      "Configuration error: Supabase environment variables are not set."
    );
  }
  const body = await req.json().catch(() => ({}));
  if (body.decision && body.id) {
    const projectId = body.project_id || null;
    if (!projectId) throw badRequest("project_id is required.");
    assertUuid(projectId, "project_id");
    const { authCtx } = await requireProjectAccess(req, projectId);
    const updated = await decideMemory(body.id, body.decision, {
      actorType: "admin",
      actor: authCtx.user?.email || authCtx.user?.id,
      projectId,
    });
    return NextResponse.json({ item: updated });
  }
  if (!body.content || !body.project_id) {
    throw validationError("Memory proposal requires content and project_id.");
  }
  assertUuid(body.project_id, "project_id");
  const { authCtx } = await requireProjectAccess(req, body.project_id);
  const item = await proposeMemory({
    ...body,
    created_by: authCtx.user?.email || authCtx.user?.id || "admin",
  });
  return NextResponse.json({ item }, { status: 201 });
});
