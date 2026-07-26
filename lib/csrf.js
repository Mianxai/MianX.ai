// Cross-site mutation guard for cookie-authenticated admin/core APIs.
//
// SameSite=Lax already blocks ordinary cross-site POSTs. This adds an explicit
// Origin allowlist so a browser Origin must exactly equal one trusted origin.
//
// Trusted candidates (exact URL.origin values only — never suffix/wildcard):
//   1. x-forwarded-proto + first x-forwarded-host (public alias behind Vercel)
//   2. request.nextUrl.origin / request URL origin
//   3. NEXT_PUBLIC_SITE_URL (when valid)
//   4. VERCEL_PROJECT_PRODUCTION_URL (exact production host, when set)
//   5. DEFAULT_SITE_URL from lib/site.js (repo-known production alias)
//   6. VERCEL_URL as https://<host> (exact deployment host for previews)
//   7. local development defaults
//
// Never trusts Host alone, never accepts *.vercel.app by suffix, and never
// exposes the allowlist to the client.

import { forbidden } from "@/lib/core/errors";
import { DEFAULT_SITE_URL } from "@/lib/site";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

/**
 * Parse a value into a normalized http(s) origin, or null.
 * Rejects non-http protocols, malformed URLs, and the literal "null" origin.
 */
export function parseHttpOrigin(value) {
  if (value == null) return null;
  const raw = String(value).trim();
  if (!raw || raw.toLowerCase() === "null") return null;
  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    // Reject credentials-in-URL and empty hosts.
    if (!url.hostname || url.username || url.password) return null;
    return url.origin;
  } catch {
    return null;
  }
}

/** First comma-separated proxy value, trimmed. */
export function firstForwardedValue(headerValue) {
  if (headerValue == null || headerValue === "") return null;
  const first = String(headerValue).split(",")[0].trim();
  return first || null;
}

/**
 * Build the effective public origin from the deployment proxy headers.
 * Requires both a valid http(s) proto and a host that is not a scheme/path.
 */
export function forwardedPublicOrigin(req) {
  const protoRaw = firstForwardedValue(req?.headers?.get?.("x-forwarded-proto"));
  const hostRaw = firstForwardedValue(req?.headers?.get?.("x-forwarded-host"));
  if (!protoRaw || !hostRaw) return null;
  const proto = protoRaw.toLowerCase();
  if (proto !== "http" && proto !== "https") return null;
  // Host must be host[:port] only — never a URL, path, or whitespace.
  if (/[\s/?#\\]/.test(hostRaw) || hostRaw.includes("://")) return null;
  return parseHttpOrigin(`${proto}://${hostRaw}`);
}

function requestUrlOrigin(req) {
  const nextOrigin = req?.nextUrl?.origin;
  if (nextOrigin) {
    const parsed = parseHttpOrigin(nextOrigin);
    if (parsed) return parsed;
  }
  if (typeof req?.url === "string" && req.url) {
    try {
      return parseHttpOrigin(new URL(req.url).origin);
    } catch {
      return null;
    }
  }
  return null;
}

function addExactOrigin(set, candidate) {
  const origin = parseHttpOrigin(candidate);
  if (origin) set.add(origin);
}

/**
 * Exact trusted origins for this request. Exported for tests.
 * Never uses substring, endsWith, or wildcard matching.
 */
export function trustedOriginsFor(req) {
  const out = new Set();

  const forwarded = forwardedPublicOrigin(req);
  if (forwarded) out.add(forwarded);

  const urlOrigin = requestUrlOrigin(req);
  if (urlOrigin) out.add(urlOrigin);

  addExactOrigin(out, process.env.NEXT_PUBLIC_SITE_URL);
  addExactOrigin(out, process.env.VERCEL_PROJECT_PRODUCTION_URL);
  addExactOrigin(out, DEFAULT_SITE_URL);

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    addExactOrigin(out, `https://${vercel.replace(/^https?:\/\//i, "")}`);
  }

  out.add("http://localhost:3000");
  out.add("http://127.0.0.1:3000");
  return out;
}

/**
 * Throws 403 when a mutating request is not from a trusted origin.
 * Safe methods always pass. Returns the resolved origin, or null when a
 * browser same-origin request intentionally omitted Origin but presented
 * Sec-Fetch-Site: same-origin|none.
 *
 * Intentional missing-Origin exception (documented):
 *   Only when Sec-Fetch-Site is exactly "same-origin" or "none". Empty or
 *   absent Sec-Fetch-Site does NOT bypass protection. Server-to-server
 *   callers must use the internal-auth path, not cookie mutations.
 */
export function assertMutationOrigin(req) {
  const method = (req.method || "GET").toUpperCase();
  if (SAFE_METHODS.has(method)) return null;

  const site = (req.headers?.get?.("sec-fetch-site") || "").toLowerCase();
  // Defense in depth: cross-site is never a cookie-authenticated mutation.
  if (site === "cross-site") {
    throw forbidden("Cross-origin mutation rejected.");
  }

  const rawOrigin = req?.headers?.get?.("origin");
  if (rawOrigin != null && String(rawOrigin).trim() !== "") {
    const parsed = parseHttpOrigin(rawOrigin);
    if (!parsed) {
      // Malformed Origin or literal "null".
      throw forbidden("Cross-origin mutation rejected.");
    }
    const trusted = trustedOriginsFor(req);
    if (!trusted.has(parsed)) {
      throw forbidden("Cross-origin mutation rejected.");
    }
    return parsed;
  }

  // Origin header absent — try Referer as a secondary candidate.
  const fromReferer = (() => {
    const referer = req?.headers?.get?.("referer");
    if (!referer) return null;
    try {
      return parseHttpOrigin(new URL(referer).origin);
    } catch {
      return null;
    }
  })();

  if (fromReferer) {
    const trusted = trustedOriginsFor(req);
    if (!trusted.has(fromReferer)) {
      throw forbidden("Cross-origin mutation rejected.");
    }
    return fromReferer;
  }

  // No Origin and no usable Referer.
  if (site === "same-origin" || site === "none") {
    return null;
  }
  throw forbidden("Cross-origin mutation rejected.");
}
