/**
 * Lightweight session-cookie hygiene for Edge middleware.
 *
 * Full cryptographic verification and membership checks stay on API routes
 * (lib/auth.js + lib/admin-auth.js). Middleware only rejects cookies that are
 * clearly unusable: missing JWT shape or expired `exp` claim. This prevents
 * blank admin shells for stale cookies without requiring JWT secrets at Edge.
 */

export function readJwtPayload(token) {
  if (typeof token !== "string" || !token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const normalized = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
    const json =
      typeof atob === "function"
        ? atob(normalized + pad)
        : Buffer.from(normalized + pad, "base64").toString("utf8");
    const payload = JSON.parse(json);
    return payload && typeof payload === "object" ? payload : null;
  } catch {
    return null;
  }
}

/**
 * Returns true when the cookie looks like a non-expired access token.
 * Does NOT prove signature authenticity — APIs still call Supabase getUser.
 */
export function isAccessTokenStructurallyValid(token, { nowMs = Date.now() } = {}) {
  const payload = readJwtPayload(token);
  if (!payload) return false;
  if (typeof payload.exp === "number" && payload.exp * 1000 <= nowMs) {
    return false;
  }
  return true;
}
