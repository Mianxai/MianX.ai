import { NextResponse } from "next/server";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  SUPABASE_NOT_CONFIGURED_MESSAGE,
} from "@/lib/supabase";
import { requireAdmin } from "@/lib/admin-auth";
import { validateLeadSubmission } from "@/lib/leads";

// Env vars are read at request time, not at build time, so this route must
// never be statically evaluated.
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32_768;

// Best-effort in-memory rate limit: not durable across cold starts or
// multiple serverless instances. Documented as a warm-instance throttle only;
// durable production rate limiting requires Vercel Firewall / Upstash / similar.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const submissionLog = new Map();
let lastCleanup = Date.now();
const CLEANUP_INTERVAL_MS = 120_000; // Purge stale entries every 2 min

function isRateLimited(key) {
  const now = Date.now();

  // Periodic cleanup to prevent memory leak on long-running server instances.
  if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
    for (const [k, ts] of submissionLog) {
      if (ts.length === 0 || (now - ts[ts.length - 1]) > RATE_LIMIT_WINDOW_MS) {
        submissionLog.delete(k);
      }
    }
    lastCleanup = now;
  }

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

function bodyTooLarge(req) {
  const raw = req.headers?.get?.("content-length");
  if (!raw) return false;
  const size = Number(raw);
  return Number.isFinite(size) && size > MAX_BODY_BYTES;
}

function publicServerError() {
  return NextResponse.json(
    { error: "Unable to save your request right now. Please try again shortly." },
    { status: 500 }
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

  // Prefer an explicit Content-Type when present (production Request objects).
  // Test fakes may omit the header; real browsers always send it for JSON POSTs.
  const contentType = req.headers?.get?.("content-type");
  if (contentType && !contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json." },
      { status: 415 }
    );
  }

  if (bodyTooLarge(req)) {
    return NextResponse.json(
      { error: "Request body is too large." },
      { status: 413 }
    );
  }

  let body;
  try {
    if (typeof req.text === "function") {
      const text = await req.text();
      if (text.length > MAX_BODY_BYTES) {
        return NextResponse.json(
          { error: "Request body is too large." },
          { status: 413 }
        );
      }
      body = text ? JSON.parse(text) : {};
    } else {
      body = await req.json();
    }
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

  // Never report success if the write itself failed. Never expose raw DB errors.
  if (error) return publicServerError();
  return NextResponse.json({ ok: true, id: row?.id });
}

// PROTECTED: only a logged-in admin can list leads.
export async function GET(req) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: SUPABASE_NOT_CONFIGURED_MESSAGE },
      { status: 503 }
    );
  }
  try {
    await requireAdmin(req);
  } catch (err) {
    const status = err?.status || 401;
    return NextResponse.json(
      { error: err?.message || "Unauthorized", code: err?.code || "UNAUTHORIZED" },
      { status }
    );
  }

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
  if (error) return publicServerError();
  return NextResponse.json(data);
}
