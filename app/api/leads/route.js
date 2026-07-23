import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

// PUBLIC: anyone can submit a lead from the site.
export async function POST(req) {
  const body = await req.json();
  if (!body.name || !body.email || !body.need) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const supabaseAdmin = getSupabaseAdmin();

  // Build the full record, but degrade gracefully if the target database is
  // missing optional columns (e.g. a hosted Supabase project created before the
  // phone/industry migration was applied). PostgREST reports missing columns
  // with code PGRST204 / "Could not find the 'X' column ... in the schema
  // cache"; we strip the offending optional column and retry so a customer
  // submission is never lost. Required columns (name/email/need) exist in every
  // version of the schema and are never dropped.
  const droppable = new Set(["phone", "industry", "budget", "company"]);
  let record = {
    name: body.name,
    email: body.email,
    company: body.company,
    phone: body.phone,
    industry: body.industry,
    budget: body.budget,
    need: body.need,
  };

  let data = null;
  let error = null;
  const dropped = [];
  for (let attempt = 0; attempt < 6; attempt++) {
    ({ data, error } = await supabaseAdmin.from("leads").insert([record]).select().single());
    if (!error) break;

    const missing = error.message && error.message.match(/'([^']+)' column/);
    const isSchemaCacheMiss =
      error.code === "PGRST204" || /schema cache/i.test(error.message || "");
    const badCol = missing && missing[1];
    if (isSchemaCacheMiss && badCol && droppable.has(badCol) && badCol in record) {
      const { [badCol]: _drop, ...rest } = record;
      record = rest;
      dropped.push(badCol);
      continue;
    }
    break;
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const res = NextResponse.json(data);
  if (dropped.length) {
    // Surface (without failing) that the DB schema is behind the app.
    res.headers.set("x-mianx-dropped-columns", dropped.join(","));
  }
  return res;
}

// PROTECTED: only a logged-in admin can list leads.
export async function GET(req) {
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
