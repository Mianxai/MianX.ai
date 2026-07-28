/**
 * Safe admin returnTo helpers — prevent open redirects.
 */

const ALLOWED_PREFIX = "/admin";

/**
 * @param {string|null|undefined} candidate
 * @returns {string|null} Safe relative admin path or null
 */
export function sanitizeAdminReturnTo(candidate) {
  if (!candidate || typeof candidate !== "string") return null;
  let decoded = candidate;
  try {
    decoded = decodeURIComponent(candidate);
  } catch {
    return null;
  }
  decoded = decoded.trim();
  if (!decoded.startsWith("/")) return null;
  if (decoded.startsWith("//")) return null;
  if (decoded.includes("://")) return null;
  if (decoded.includes("\\")) return null;
  if (!decoded.startsWith(ALLOWED_PREFIX)) return null;
  if (decoded === "/admin/login" || decoded.startsWith("/admin/login?")) return null;
  // Reject protocol-relative and control chars
  if (/[\u0000-\u001f]/.test(decoded)) return null;
  return decoded.slice(0, 512);
}

/**
 * Build /admin/login?returnTo=… from a request pathname + search.
 */
export function buildLoginRedirectUrl(reqUrl, pathname, search = "") {
  const login = new URL("/admin/login", reqUrl);
  const raw = `${pathname || ""}${search || ""}`;
  const safe = sanitizeAdminReturnTo(raw);
  if (safe) login.searchParams.set("returnTo", safe);
  return login;
}

/**
 * Client-side login href with a sanitized returnTo query param.
 * @param {string|null|undefined} returnTo
 * @returns {string}
 */
export function adminLoginHref(returnTo) {
  const safe = sanitizeAdminReturnTo(returnTo);
  if (!safe) return "/admin/login";
  return `/admin/login?returnTo=${encodeURIComponent(safe)}`;
}

/**
 * Prefer the current browser path; fall back when unavailable (SSR / tests).
 * @param {string} [fallback="/admin"]
 */
export function currentAdminLoginHref(fallback = "/admin") {
  if (typeof window === "undefined") return adminLoginHref(fallback);
  const path = `${window.location.pathname}${window.location.search}`;
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    return adminLoginHref(path);
  }
  return adminLoginHref(fallback);
}
