import { NextResponse } from "next/server";
import { withErrorHandling, badRequest, unauthorized } from "@/lib/core/errors";
import { getSupabase } from "@/lib/supabase";
import { parseJsonBody, clip } from "@/lib/core/validate";
import { assertMutationOrigin } from "@/lib/csrf";
import { rateLimit } from "@/lib/core/ratelimit";

export const dynamic = "force-dynamic";

const COOKIE = "sb-access-token";

function cookieOptions(maxAge) {
  const secure =
    process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
  return {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: Math.max(60, Math.min(Number(maxAge) || 3600, 60 * 60 * 24 * 7)),
  };
}

// POST /api/admin/session
// { access_token, expires_in? }
// Validates the token with Supabase Auth server-side, then sets an HttpOnly
// session cookie. Never echoes the token back. Replaces client-side
// document.cookie assignment so XSS cannot read the access token.
export const POST = withErrorHandling(async (req) => {
  assertMutationOrigin(req);
  rateLimit(`admin-session:${req.headers.get("x-forwarded-for") || "local"}`, {
    max: 20,
    windowMs: 60_000,
  });

  const body = await parseJsonBody(req, 4_096);
  const accessToken = clip(body.access_token, 8_000);
  if (!accessToken) throw badRequest("access_token is required.");

  const supabase = getSupabase();
  if (!supabase) {
    throw badRequest(
      "Configuration error: Supabase environment variables are not set."
    );
  }

  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data?.user) throw unauthorized("Invalid session.");

  const maxAge = Number(body.expires_in) || 3600;
  const res = NextResponse.json({
    ok: true,
    user: { id: data.user.id, email: data.user.email || null },
  });
  res.cookies.set(COOKIE, accessToken, cookieOptions(maxAge));
  return res;
});

// DELETE /api/admin/session — clear the HttpOnly session cookie.
export const DELETE = withErrorHandling(async (req) => {
  assertMutationOrigin(req);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, "", { ...cookieOptions(0), maxAge: 0 });
  return res;
});
