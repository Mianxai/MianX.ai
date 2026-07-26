// Cross-site mutation guard for cookie-authenticated admin/core APIs.
//
// SameSite=Lax already blocks ordinary cross-site POSTs. This adds an explicit
// Origin/Referer allowlist so same-site sibling origins and missing-origin
// cases cannot mutate state. Never trusts a client-supplied host list from
// the request body.

import { forbidden } from "@/lib/core/errors";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function allowedOrigins() {
  const out = new Set();
  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (site) {
    try {
      out.add(new URL(site).origin);
    } catch {
      /* ignore malformed */
    }
  }
  // Local development defaults.
  out.add("http://localhost:3000");
  out.add("http://127.0.0.1:3000");
  // Vercel preview / production deployment URL when present.
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    out.add(`https://${vercel.replace(/^https?:\/\//, "")}`);
  }
  return out;
}

function requestOrigin(req) {
  const origin = req.headers?.get?.("origin");
  if (origin) {
    try {
      return new URL(origin).origin;
    } catch {
      return null;
    }
  }
  const referer = req.headers?.get?.("referer");
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Throws 403 when a mutating request is not from an allowed origin.
 * Safe methods always pass. Returns the resolved origin (or null for
 * same-origin browsers that omit Origin on navigations).
 */
export function assertMutationOrigin(req) {
  const method = (req.method || "GET").toUpperCase();
  if (SAFE_METHODS.has(method)) return null;

  const origin = requestOrigin(req);
  const allowed = allowedOrigins();

  // Some same-origin fetch calls omit Origin. Accept those only when the
  // Sec-Fetch-Site header is "same-origin" or "none" (user-initiated).
  if (!origin) {
    const site = (req.headers?.get?.("sec-fetch-site") || "").toLowerCase();
    if (site === "same-origin" || site === "none" || site === "") {
      return null;
    }
    throw forbidden("Cross-origin mutation rejected.");
  }

  if (!allowed.has(origin)) {
    throw forbidden("Cross-origin mutation rejected.");
  }
  return origin;
}
