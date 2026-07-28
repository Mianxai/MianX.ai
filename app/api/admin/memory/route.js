import { NextResponse } from "next/server";
import { withErrorHandling, notConfigured, validationError } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import {
  listMemory,
  proposeMemory,
  decideMemory,
} from "@/lib/core/memory";

export const dynamic = "force-dynamic";

export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured(
      "Configuration error: Supabase environment variables are not set."
    );
  }
  const url = new URL(req.url);
  const projectId = url.searchParams.get("project_id") || null;
  const items = await listMemory({ projectId });
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    projectId,
    items,
    note: "Memory tables require additive migration before durable persistence.",
  });
});

export const POST = withErrorHandling(async (req) => {
  const admin = await requireAdmin(req);
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured(
      "Configuration error: Supabase environment variables are not set."
    );
  }
  const body = await req.json().catch(() => ({}));
  if (body.decision && body.id) {
    const updated = await decideMemory(body.id, body.decision, {
      actorType: "admin",
      actor: admin.email || admin.id,
    });
    return NextResponse.json({ item: updated });
  }
  if (!body.content || !body.project_id) {
    throw validationError("Memory proposal requires content and project_id.");
  }
  const item = await proposeMemory({
    ...body,
    created_by: admin.email || admin.id || "admin",
  });
  return NextResponse.json({ item }, { status: 201 });
});
