// OPTIONAL Upstash Redis REST durable rate-limit adapter.
//
// No npm dependency — uses fetch against Upstash REST when both
// RATE_LIMIT_DURABLE_URL and RATE_LIMIT_DURABLE_TOKEN are set.
// Returns null when unset so callers keep the in-memory fallback.
// Founder must configure env; agents must never commit tokens.

/**
 * @returns {null | ((key: string, policy?: {max?: number, windowMs?: number}) => Promise<{allowed:boolean, remaining:number, resetMs:number}>)}
 */
export function createUpstashRateLimitAdapter({
  url = process.env.RATE_LIMIT_DURABLE_URL,
  token = process.env.RATE_LIMIT_DURABLE_TOKEN,
  fetchImpl = globalThis.fetch,
} = {}) {
  const base = typeof url === "string" ? url.trim().replace(/\/$/, "") : "";
  const auth = typeof token === "string" ? token.trim() : "";
  if (!base || !auth) return null;
  if (typeof fetchImpl !== "function") return null;

  return async function upstashConsume(key, { max = 30, windowMs = 60_000 } = {}) {
    const redisKey = `mianx:rl:${String(key || "default").slice(0, 200)}`;
    // Pipeline: INCR, set expiry if new, read TTL.
    const body = [
      ["INCR", redisKey],
      ["PEXPIRE", redisKey, String(windowMs), "NX"],
      ["PTTL", redisKey],
    ];
    const res = await fetchImpl(base, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Upstash rate-limit HTTP ${res.status}`);
    }
    const data = await res.json();
    // Upstash pipeline returns [{result: n}, {result: ...}, {result: ttl}]
    const results = Array.isArray(data) ? data : data?.result;
    if (!Array.isArray(results) || results.length < 1) {
      throw new Error("Upstash rate-limit unexpected response shape");
    }
    const count = Number(results[0]?.result ?? results[0]);
    if (!Number.isFinite(count)) {
      throw new Error("Upstash rate-limit missing INCR result");
    }
    const ttlRaw = results[2]?.result ?? results[2];
    const ttl = Number(ttlRaw);
    const resetMs = Number.isFinite(ttl) && ttl > 0 ? ttl : windowMs;
    const remaining = Math.max(0, max - count);
    return {
      allowed: count <= max,
      remaining,
      resetMs,
    };
  };
}

/**
 * Convenience: create adapter from env or null. Does not inject itself.
 */
export function tryCreateDurableRateLimitAdapterFromEnv(opts = {}) {
  return createUpstashRateLimitAdapter(opts);
}
