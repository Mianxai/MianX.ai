import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getSessionUser } from "@/lib/auth";

// PUBLIC: anyone can submit a lead from the site.
export async function POST(req) {
  const body = await req.json();
  if (!body.name || !body.email || !body.need) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
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
  const user = await getSessionUser(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
