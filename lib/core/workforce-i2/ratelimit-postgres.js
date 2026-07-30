/**
 * Postgres-backed durable rate limiter (no Upstash required).
 * Falls back to in-process Map when Supabase unavailable — status reports honestly.
 */

import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const memoryBuckets = new Map();

export function resetRateLimitMemory() {
  memoryBuckets.clear();
}

function windowKey(parts) {
  return parts.filter(Boolean).join(":");
}

/**
 * Atomic-ish consume: memory always; Postgres when configured.
 */
export async function consumeDurableRateLimit({
  organizationId = null,
  projectId = null,
  agentSlug = null,
  model = null,
  limit = 60,
  windowMs = 60_000,
  tokens = 0,
  tokenLimit = null,
} = {}) {
  const key = windowKey([
    "rl",
    organizationId || "-",
    projectId || "-",
    agentSlug || "-",
    model || "-",
    String(windowMs),
  ]);
  const now = Date.now();
  const windowStart = now - (now % windowMs);

  if (isSupabaseConfigured()) {
    try {
      const admin = getSupabaseAdmin();
      const bucketKey = `${key}:${windowStart}`;
      const { data: existing } = await admin
        .from("rate_limit_buckets")
        .select("*")
        .eq("bucket_key", bucketKey)
        .maybeSingle();

      const count = (existing?.count || 0) + 1;
      const tokenCount = (existing?.token_count || 0) + tokens;
      if (count > limit || (tokenLimit != null && tokenCount > tokenLimit)) {
        const retryAfterMs = windowStart + windowMs - now;
        return {
          ok: false,
          durable: true,
          retryAfterMs: Math.max(0, retryAfterMs),
          count,
          limit,
        };
      }
      const row = {
        bucket_key: bucketKey,
        organization_id: organizationId,
        project_id: projectId,
        agent_slug: agentSlug,
        model,
        window_start: new Date(windowStart).toISOString(),
        window_ms: windowMs,
        count,
        token_count: tokenCount,
        limit_count: limit,
        limit_tokens: tokenLimit,
        updated_at: new Date().toISOString(),
      };
      const { error } = await admin.from("rate_limit_buckets").upsert(row, {
        onConflict: "bucket_key",
      });
      if (!error) {
        return { ok: true, durable: true, count, limit, tokenCount };
      }
      // fall through to memory on table-missing
    } catch {
      /* memory fallback */
    }
  }

  // Memory fallback (honest: not production-durable)
  let bucket = memoryBuckets.get(key);
  if (!bucket || bucket.windowStart !== windowStart) {
    bucket = { windowStart, count: 0, tokenCount: 0 };
    memoryBuckets.set(key, bucket);
  }
  bucket.count += 1;
  bucket.tokenCount += tokens;
  if (bucket.count > limit || (tokenLimit != null && bucket.tokenCount > tokenLimit)) {
    return {
      ok: false,
      durable: false,
      retryAfterMs: windowStart + windowMs - now,
      count: bucket.count,
      limit,
    };
  }
  return {
    ok: true,
    durable: false,
    count: bucket.count,
    limit,
    tokenCount: bucket.tokenCount,
  };
}

export function durableRateLimitStatus() {
  const configured = isSupabaseConfigured();
  return {
    backend: configured ? "postgres_or_memory_fallback" : "memory_only",
    durableReady: configured,
    label: configured ? "Durable rate limiter: Ready" : "Durable rate limiter: Action required (apply migrations + Supabase)",
    externalRedisRequired: false,
    note: "Postgres rate_limit_buckets replaces Upstash requirement for multi-instance durability when migrations are applied.",
  };
}

/** Adapter shape compatible with lib/core/ratelimit.js durable adapter. */
export function createPostgresRateLimitAdapter() {
  return {
    async consume(key, { limit, windowMs } = {}) {
      const result = await consumeDurableRateLimit({
        projectId: key,
        limit: limit || 60,
        windowMs: windowMs || 60_000,
      });
      if (!result.ok) {
        const err = new Error("Rate limit exceeded");
        err.status = 429;
        err.retryAfterMs = result.retryAfterMs;
        throw err;
      }
      return result;
    },
  };
}
