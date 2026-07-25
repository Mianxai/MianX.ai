import { NextResponse } from "next/server";
import { withErrorHandling, notConfigured } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * Lean notification counts for the Admin Control Center badge.
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
    // Collapse DB failures to a generic 500 via withErrorHandling.
    throw error;
  }

  return NextResponse.json({
    newSubmissions: typeof count === "number" ? count : 0,
  });
});
