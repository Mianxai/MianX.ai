import { createClient } from "@supabase/supabase-js";

// Clients are created lazily (inside the functions that use them) rather than
// at module load. This prevents build-time crashes ("supabaseUrl is
// required") on platforms like Vercel, and in local builds run without a
// .env.local, where env vars are not present while Next.js collects/
// prerenders routes. The client is only instantiated when a real request
// comes in, and callers get `null` back so they can return a controlled
// configuration error instead of throwing.
//
// `createClient()` also unconditionally constructs a Realtime client, which
// requires a global `WebSocket` constructor — native on Node.js 22+, missing
// on older Node runtimes (throws "Node.js detected but native WebSocket not
// found."). This app never uses Realtime, but we still can't avoid paying
// that cost on construction, so: (1) `package.json` declares
// `engines.node >= 22` so Vercel/CI pick a runtime that has it, and (2) as a
// second line of defense, construction is wrapped in try/catch below so an
// unexpected runtime still degrades to a controlled error instead of an
// unhandled crash.

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

let browserClient = null;

// Client-side / anon client (safe to expose) — used for admin login and for
// verifying access tokens server-side. Returns null when Supabase env vars
// are not configured, or when client construction itself fails; callers
// must handle a null return explicitly.
export function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  if (!browserClient) {
    try {
      browserClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        { auth: { persistSession: false } }
      );
    } catch (err) {
      console.error("[lib/supabase] failed to construct Supabase client:", err);
      return null;
    }
  }
  return browserClient;
}

let adminClient = null;

// Server-side only — full access, used inside API routes. Falls back to the
// anon key if the service role key is absent so writes are still attempted,
// but returns null entirely when even the base URL/anon key are missing, or
// when client construction itself fails.
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!adminClient) {
    try {
      adminClient = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
    } catch (err) {
      console.error("[lib/supabase] failed to construct Supabase admin client:", err);
      return null;
    }
  }
  return adminClient;
}

export const SUPABASE_NOT_CONFIGURED_MESSAGE =
  "Configuration error: Supabase environment variables are not set. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY to enable this feature.";
