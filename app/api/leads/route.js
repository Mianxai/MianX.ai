import { NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  SUPABASE_NOT_CONFIGURED_MESSAGE,
} from "@/lib/supabase";
import { getSessionUser } from "@/lib/auth";

// Env vars are read at request time, not at build time, so this route must
// never be statically evaluated.
export const dynamic = "force-dynamic";

// PUBLIC: anyone can submit a lead from the site.
export async function POST(req) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: SUPABASE_NOT_CONFIGURED_MESSAGE },
      { status: 503 }
    );
  }
  const body = await req.json();
  if (!body.name || !body.email || !body.need) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("leads")
    .insert([
      {
        name: body.name,
        email: body.email,
        company: body.company,
        budget: body.budget,
        need: body.need,
      },
    ])
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PROTECTED: only a logged-in admin can list leads.
export async function GET(req) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: SUPABASE_NOT_CONFIGURED_MESSAGE },
      { status: 503 }
    );
  }
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
