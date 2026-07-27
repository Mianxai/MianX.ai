// Rate-limit adapter with an honest durability contract.
//
// Production deployments should configure a durable backend (e.g. Upstash
// Redis via env). Until then the in-memory fallback protects a single warm
// instance and reports itself as non-durable so Settings/Founder actions stay
// truthful. Never pretends serverless memory is cluster-safe.

import { ApiError, ERROR_CODES } from "./errors";
import { tryCreateDurableRateLimitAdapterFromEnv } from "./ratelimit-upstash";

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
 * Optional durable backend hook. Injected for tests / future Redis adapters.
 * Returning null means "fall back to memory". Never report durable:true
 * unless a consume call actually succeeds via this adapter.
 */
let durableAdapter = null;
let envBootstrapAttempted = false;

export function setDurableRateLimitAdapter(adapter) {
  durableAdapter = typeof adapter === "function" ? adapter : null;
}

export function clearDurableRateLimitAdapter() {
  durableAdapter = null;
  envBootstrapAttempted = false;
}

/**
 * Lazily wire the optional Upstash adapter when env is present.
 * Safe when unset (no-op). Does not throw; build/boot stay green.
 */
export function ensureDurableRateLimitFromEnv() {
  if (envBootstrapAttempted || durableAdapter) return durableAdapter;
  envBootstrapAttempted = true;
  try {
    const adapter = tryCreateDurableRateLimitAdapterFromEnv();
    if (adapter) durableAdapter = adapter;
  } catch {
    /* leave memory fallback */
  }
  return durableAdapter;
}

async function durableConsume(key, policy) {
  ensureDurableRateLimitFromEnv();
  if (!durableAdapter) return null;
  try {
    const result = await durableAdapter(key, policy);
    if (!result || result.allowed == null) return null;
    return {
      ...result,
      backend: RATE_LIMIT_BACKEND.DURABLE,
      durable: true,
    };
  } catch {
    return null;
  }
}

export async function consumeRateLimit(key, policy = {}) {
  const durable = await durableConsume(key, policy);
  if (durable) return durable;
  return memoryConsume(key, policy);
}

/**
 * Truthful status for Settings/health. URL env alone does NOT make the
 * limiter durable — only a working injected adapter does. Env without an
 * adapter is reported as configured-but-inactive so Founders are not lied to.
 * Token presence is reported as a boolean only (never the secret).
 */
export function rateLimitBackendStatus() {
  ensureDurableRateLimitFromEnv();
  const urlConfigured = Boolean(process.env.RATE_LIMIT_DURABLE_URL?.trim());
  const tokenConfigured = Boolean(process.env.RATE_LIMIT_DURABLE_TOKEN?.trim());
  const adapterActive = Boolean(durableAdapter);
  if (adapterActive) {
    return {
      backend: RATE_LIMIT_BACKEND.DURABLE,
      durable: true,
      configured: true,
      adapterActive: true,
      urlConfigured,
      tokenConfigured,
    };
  }
  return {
    backend: RATE_LIMIT_BACKEND.MEMORY,
    durable: false,
    configured: urlConfigured && tokenConfigured,
    adapterActive: false,
    urlConfigured,
    tokenConfigured,
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
