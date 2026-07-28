import { NextResponse } from "next/server";
import { withErrorHandling, notConfigured, validationError } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import {
  listLearning,
  proposeLearning,
  decideLearning,
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
  const items = await listLearning({ projectId });
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    projectId,
    items,
    note: "Learning never auto-modifies prompts, capabilities, or production policy.",
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
    const updated = await decideLearning(body.id, body.decision, {
      actorType: "admin",
      reviewedBy: admin.email || admin.id,
      note: body.note || null,
    });
    return NextResponse.json({ item: updated });
  }
  if (!body.problem || !body.proposed_lesson) {
    throw validationError("Learning proposal requires problem and proposed_lesson.");
  }
  const item = await proposeLearning(body);
  return NextResponse.json({ item }, { status: 201 });
});
