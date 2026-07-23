import { NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  SUPABASE_NOT_CONFIGURED_MESSAGE,
} from "@/lib/supabase";
import { getSessionUser } from "@/lib/auth";
import { buildLeadPatch } from "@/lib/leads";

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
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
