// In-memory rate limiter for API endpoints
// Uses a sliding window approach with auto-cleanup of expired entries

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

/**
 * Check if a request from the given IP is within rate limits.
 *
 * @param ip        - Client IP address (used as the key)
 * @param windowMs  - Time window in milliseconds
 * @param maxRequests - Maximum number of requests allowed within the window
 * @returns Object with `success`, `remaining`, and `resetAt`
 */
export function rateLimit(
  ip: string,
  windowMs: number,
  maxRequests: number,
): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const key = ip;

  // Auto-cleanup: remove all expired entries before checking
  for (const [k, entry] of store) {
    if (entry.resetAt <= now) {
      store.delete(k);
    }
  }

  const existing = store.get(key);

  // No existing entry or window has expired — start fresh
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { success: true, remaining: maxRequests - 1, resetAt };
  }

  // Within the current window — increment count
  existing.count += 1;

  if (existing.count > maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  return {
    success: true,
    remaining: maxRequests - existing.count,
    resetAt: existing.resetAt,
  };
}
