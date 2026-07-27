// Safe schema existence probes for production readiness.
// Never returns row data — only presence / absence / unknown.

import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const TABLE_CACHE_MS = 30_000;

/** @type {Map<string, { state: "present"|"missing"|"unknown", at: number }>} */
const cache = new Map();

function isUndefinedTableError(error) {
  if (!error) return false;
  const msg = `${error.message || ""} ${error.details || ""} ${error.hint || ""}`.toLowerCase();
  const code = error.code || "";
  return (
    code === "42P01" ||
    code === "PGRST205" ||
    msg.includes("does not exist") ||
    msg.includes("could not find the table")
  );
}

/**
 * Probe whether a table is queryable via the service-role client.
 * Uses head/count only — no row payloads.
 *
 * @param {string} table
 * @returns {Promise<"present"|"missing"|"unknown">}
 */
export async function probeTablePresent(table) {
  const now = Date.now();
  const hit = cache.get(table);
  if (hit && now - hit.at < TABLE_CACHE_MS) return hit.state;

  if (!isSupabaseConfigured()) {
    cache.set(table, { state: "missing", at: now });
    return "missing";
  }
  const admin = getSupabaseAdmin();
  if (!admin) {
    cache.set(table, { state: "unknown", at: now });
    return "unknown";
  }

  try {
    const probe = admin.from(table).select("id", { head: true, count: "exact" }).limit(1);
    const { error } = await Promise.race([
      probe,
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error("schema_probe_timeout")), 1500);
      }),
    ]);
    let state;
    if (error && isUndefinedTableError(error)) state = "missing";
    else if (error) state = "unknown";
    else state = "present";
    cache.set(table, { state, at: now });
    return state;
  } catch {
    cache.set(table, { state: "unknown", at: now });
    return "unknown";
  }
}

/** Test helper — clear probe cache. */
export function resetSchemaProbeCache() {
  cache.clear();
}

/**
 * Resolve readiness probe inputs without leaking data.
 * @returns {Promise<{
 *   membershipTablePresent: boolean|null,
 *   runtimeJobsSchemaPresent: boolean|null,
 * }>}
 */
export async function resolveSchemaProbeFlags() {
  if (!isSupabaseConfigured()) {
    return {
      membershipTablePresent: false,
      runtimeJobsSchemaPresent: false,
    };
  }

  const [membership, jobs] = await Promise.all([
    probeTablePresent("admin_memberships"),
    probeTablePresent("runtime_jobs"),
  ]);

  return {
    membershipTablePresent:
      membership === "present" ? true : membership === "missing" ? false : null,
    runtimeJobsSchemaPresent:
      jobs === "present" ? true : jobs === "missing" ? false : null,
  };
}
