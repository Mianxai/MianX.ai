// Best-effort in-memory rate limiter (per warm instance). Not durable across
// serverless cold starts, but provides a safe bounded guard against runaway
// task/run creation without adding an external dependency. Mirrors the guard
// used by the public leads route.

import { ApiError, ERROR_CODES } from "./errors";

const buckets = new Map();

export function rateLimit(key, { max = 30, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  hits.push(now);
  buckets.set(key, hits);
  if (hits.length > max) {
    throw new ApiError(
      429,
      ERROR_CODES.RATE_LIMITED,
      "Too many requests. Please slow down and try again shortly."
    );
  }
}

// Test-only: reset all buckets.
export function _resetRateLimits() {
  buckets.clear();
}
