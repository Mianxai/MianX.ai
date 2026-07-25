import { NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  SUPABASE_NOT_CONFIGURED_MESSAGE,
} from "@/lib/supabase";
import { requireAdmin, actorFromUser } from "@/lib/admin-auth";
import { buildLeadPatch } from "@/lib/leads";
import { recordAudit, buildAuditEntry } from "@/lib/core/audit";

export const dynamic = "force-dynamic";

// PROTECTED: status changes, archiving (soft delete), and saving AI analysis
// results. Uses an explicit field allowlist (see lib/leads.js) so a client
// can never mass-assign arbitrary columns (id, created_at, email, etc.).
//
// Next.js 15: dynamic route `params` is now a Promise and must be awaited
// (https://nextjs.org/docs/messages/sync-dynamic-apis).
export async function PATCH(req, { params }) {
  const { id } = await params;
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: SUPABASE_NOT_CONFIGURED_MESSAGE },
      { status: 503 }
    );
  }
  let user;
  try {
    user = await requireAdmin(req);
  } catch (err) {
    const status = err?.status || 401;
    return NextResponse.json(
      { error: err?.message || "Unauthorized", code: err?.code || "UNAUTHORIZED" },
      { status }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { patch, errors, hasFields } = buildLeadPatch(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Invalid update", fieldErrors: errors }, { status: 400 });
  }
  if (!hasFields) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: SUPABASE_NOT_CONFIGURED_MESSAGE },
      { status: 503 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("leads")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    return NextResponse.json(
      { error: "Unable to update this lead right now." },
      { status: 500 }
    );
  }

  try {
    await recordAudit(
      supabaseAdmin,
      buildAuditEntry({
        actor: actorFromUser(user),
        action: patch.archived_at
          ? "lead.archived"
          : patch.archived_at === null
            ? "lead.restored"
            : "lead.updated",
        resourceType: "lead",
        resourceId: id,
        metadata: { fields: Object.keys(patch) },
      })
    );
  } catch {
    // Audit is best-effort for leads; do not fail the mutation.
  }

  return NextResponse.json(data);
}
