import { NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  SUPABASE_NOT_CONFIGURED_MESSAGE,
} from "@/lib/supabase";
import { getSessionUser } from "@/lib/auth";
import { validateLeadSubmission } from "@/lib/leads";

// Env vars are read at request time, not at build time, so this route must
// never be statically evaluated.
export const dynamic = "force-dynamic";

// Best-effort in-memory rate limit: not durable across cold starts or
// multiple serverless instances, but stops naive rapid-fire bot submissions
// within a single warm instance without adding an external dependency.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const submissionLog = new Map();

function isRateLimited(key) {
  const now = Date.now();
  const timestamps = (submissionLog.get(key) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

function clientKey(req) {
  return (
    req.headers?.get?.("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  );
}

// PUBLIC: anyone can submit a lead from the site.
export async function POST(req) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: SUPABASE_NOT_CONFIGURED_MESSAGE },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (isRateLimited(clientKey(req))) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again in a minute." },
      { status: 429 }
    );
  }

  const { valid, honeypotTripped, errors, data } = validateLeadSubmission(body);
  if (honeypotTripped) {
    // Don't tip off bots — respond as if it worked, but never write to the DB.
    return NextResponse.json({ ok: true });
  }
  if (!valid) {
    return NextResponse.json(
      { error: "Please fix the highlighted fields.", fieldErrors: errors },
      { status: 400 }
    );
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: SUPABASE_NOT_CONFIGURED_MESSAGE },
      { status: 503 }
    );
  }

  const { data: row, error } = await supabaseAdmin
    .from("leads")
    .insert([
      {
        name: data.name,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        industry: data.industry || null,
        need: data.message,
      },
    ])
    .select()
    .single();

  // Never report success if the write itself failed.
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(row);
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
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: SUPABASE_NOT_CONFIGURED_MESSAGE },
      { status: 503 }
    );
  }

  const showArchived = req.nextUrl?.searchParams?.get("archived") === "1";
  let query = supabaseAdmin.from("leads").select("*");
  query = showArchived
    ? query.not("archived_at", "is", null)
    : query.is("archived_at", null);
  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
