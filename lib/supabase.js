import { createClient } from "@supabase/supabase-js";

// Clients are created lazily (inside the functions that use them) rather than at
// module load. This prevents build-time crashes ("supabaseKey is required") on
// platforms like Vercel where env vars are not injected while collecting/
// prerendering routes — the client is only instantiated when a real request
// comes in.

// Client-side / anon client (safe to expose) — used for admin login and for
// verifying access tokens server-side.
export function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { persistSession: false } }
  );
}

// Server-side only — full access, used inside API routes. Falls back to the
// anon key if the service role key is absent so it never crashes on import;
// write access still requires the real service role key.
export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
