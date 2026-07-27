import { NextResponse } from "next/server";
import { withErrorHandling, notConfigured } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { buildOutputsView } from "@/lib/core/outputs/build";

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
  const workflow = url.searchParams.get("workflow") || null;
  const agentSlug = url.searchParams.get("agent") || null;
  const data = await buildOutputsView({ projectId, workflow, agentSlug });
  return NextResponse.json(data);
});
