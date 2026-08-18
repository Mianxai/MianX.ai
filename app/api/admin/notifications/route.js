import { NextResponse } from "next/server";
import { withErrorHandling, notConfigured } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { buildFounderInbox, inboxBadgeCount } from "@/lib/core/inbox/build";

export const dynamic = "force-dynamic";

/**
 * Lean notification counts for Admin Control Center badges.
 * Returns sanitized integers only — never lead rows or secret detail.
 */
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);

  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured(
      "Configuration error: Supabase environment variables are not set."
    );
  }

  const admin = getSupabaseAdmin();
  const { count, error } = await admin
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("status", "new")
    .is("archived_at", null);

  if (error) {
    throw error;
  }

  let inboxAttention = 0;
  try {
    const url = new URL(req.url);
    const projectId = url.searchParams.get("project_id") || null;
    const inbox = await buildFounderInbox({ projectId });
    inboxAttention = inboxBadgeCount(inbox);
  } catch {
    inboxAttention = 0;
  }

  return NextResponse.json({
    newSubmissions: typeof count === "number" ? count : 0,
    inboxAttention,
  });
});
