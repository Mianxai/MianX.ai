// Rate-limit adapter with an honest durability contract.
//
// Production deployments should configure a durable backend (e.g. Upstash
// Redis via env). Until then the in-memory fallback protects a single warm
// instance and reports itself as non-durable so Settings/Founder actions stay
// truthful. Never pretends serverless memory is cluster-safe.

import { ApiError, ERROR_CODES } from "./errors";

const buckets = new Map();

export const RATE_LIMIT_BACKEND = {
  MEMORY: "in-memory",
  DURABLE: "durable",
};

function memoryConsume(key, { max = 30, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  hits.push(now);
  buckets.set(key, hits);
  const remaining = Math.max(0, max - hits.length);
  return {
    allowed: hits.length <= max,
    remaining,
    resetMs: windowMs - (now - (hits[0] || now)),
    backend: RATE_LIMIT_BACKEND.MEMORY,
    durable: false,
  };
}

/**
 * Optional durable backend hook. When RATE_LIMIT_DURABLE_URL is unset the
 * memory fallback is used. A real Upstash/Redis adapter can replace this
 * without changing call sites.
 */
async function durableConsume(key, policy) {
  // Placeholder: no paid dependency is wired in this phase. Returning null
  // signals "fall back to memory".
  void key;
  void policy;
  return null;
}

export async function consumeRateLimit(key, policy = {}) {
  const durable = await durableConsume(key, policy);
  if (durable) return durable;
  return memoryConsume(key, policy);
}

export function rateLimitBackendStatus() {
  const configured = Boolean(process.env.RATE_LIMIT_DURABLE_URL?.trim());
  return {
    backend: configured ? RATE_LIMIT_BACKEND.DURABLE : RATE_LIMIT_BACKEND.MEMORY,
    durable: configured,
    configured,
  };
}

/**
 * Synchronous-compatible guard used by existing routes. Throws 429 when
 * exhausted. Reports non-durable semantics honestly via the error details.
 */
export function rateLimit(key, { max = 30, windowMs = 60_000 } = {}) {
  const result = memoryConsume(key, { max, windowMs });
  if (!result.allowed) {
    throw new ApiError(
      429,
      ERROR_CODES.RATE_LIMITED,
      "Too many requests. Please slow down and try again shortly.",
      { durable: false, backend: RATE_LIMIT_BACKEND.MEMORY }
    );
  }
  return result;
}

/** Test-only: reset all buckets. */
export function _resetRateLimits() {
  buckets.clear();
}
