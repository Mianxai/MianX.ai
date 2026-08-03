/**
 * Durable live-run authorization store status + atomic consume boundary.
 * Fail-closed when migration/table is absent. Never fabricates authorizations.
 * Never treats missing table as authorization success.
 */

import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { probeTablePresent, resetSchemaProbeCache } from "@/lib/core/schema-probes";
import {
  consumeLiveRunAuthorizationAtomically,
  getLiveRunAuthorization,
  validateLiveRunAuthorizationMatch,
  computeAuthorizationIntegrity,
} from "./authorization";

export const AUTHORIZATION_TABLE = "pilot_live_run_authorizations";
export const CONSUME_RPC = "consume_pilot_live_run_authorization";

/**
 * @returns {Promise<{
 *   status: "available"|"unavailable"|"not_applied"|"unknown"|"memory_fixture_only",
 *   reason: string,
 *   migrationApplied: boolean,
 *   providerCallAllowed: false,
 *   liveExecutionReady: false,
 *   table: string,
 * }>}
 */
export async function getAuthorizationStoreStatus(opts = {}) {
  const forceMissing = opts.forceMissing === true;
  if (forceMissing) {
    return {
      status: "not_applied",
      reason: "authorization_store_unavailable",
      migrationApplied: false,
      providerCallAllowed: false,
      liveExecutionReady: false,
      table: AUTHORIZATION_TABLE,
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      status: "unavailable",
      reason: "authorization_store_unavailable",
      migrationApplied: false,
      providerCallAllowed: false,
      liveExecutionReady: false,
      table: AUTHORIZATION_TABLE,
    };
  }

  const presence = await probeTablePresent(AUTHORIZATION_TABLE);
  if (presence === "missing") {
    return {
      status: "not_applied",
      reason: "authorization_store_unavailable",
      migrationApplied: false,
      providerCallAllowed: false,
      liveExecutionReady: false,
      table: AUTHORIZATION_TABLE,
    };
  }
  if (presence === "unknown") {
    return {
      status: "unknown",
      reason: "authorization_store_unavailable",
      migrationApplied: false,
      providerCallAllowed: false,
      liveExecutionReady: false,
      table: AUTHORIZATION_TABLE,
    };
  }

  return {
    status: "available",
    reason: null,
    migrationApplied: true,
    providerCallAllowed: false,
    liveExecutionReady: false,
    table: AUTHORIZATION_TABLE,
  };
}

/**
 * Durable atomic consume via SECURITY DEFINER RPC when store is available.
 * Falls back to fixture CAS only under Vitest. Production without table fails closed.
 *
 * Database guarantee: single guarded UPDATE … WHERE status='authorized' …
 * Returning 0 rows = already-consumed / conflict. Not distributed exactly-once
 * provider execution.
 */
export async function consumeDurableLiveRunAuthorization(input = {}) {
  const store = await getAuthorizationStoreStatus({
    forceMissing: input.forceMissing === true,
  });

  if (store.status !== "available") {
    return {
      ok: false,
      code: "AUTHORIZATION_STORE_UNAVAILABLE",
      reason: "authorization_store_unavailable",
      store,
      fakeProviderInvocations: 0,
      genuineOpenAICalls: 0,
    };
  }

  const auth =
    input.auth ||
    (input.authorizationId ? getLiveRunAuthorization(input.authorizationId) : null);
  if (!auth) {
    // Production path expects row already loaded by repository; without a row, fail closed.
    if (!input.rpcParams) {
      return {
        ok: false,
        code: "AUTHORIZATION_MISSING",
        reason: "authorization_store_unavailable",
        store,
        genuineOpenAICalls: 0,
      };
    }
  }

  if (auth) {
    const match = validateLiveRunAuthorizationMatch(auth, input.context || {});
    if (!match.ok) {
      return {
        ok: false,
        code: "AUTHORIZATION_MISMATCH",
        missing: match.missing,
        store,
        genuineOpenAICalls: 0,
      };
    }
  }

  const admin = getSupabaseAdmin();
  if (!admin || typeof admin.rpc !== "function") {
    // Vitest / no admin: fixture-only CAS (process-local — not DB atomicity).
    if (process.env.VITEST && auth) {
      const local = consumeLiveRunAuthorizationAtomically(auth.authorizationId);
      return {
        ...local,
        guarantee: "process_local_fixture_cas",
        store,
        genuineOpenAICalls: 0,
      };
    }
    return {
      ok: false,
      code: "AUTHORIZATION_STORE_UNAVAILABLE",
      reason: "authorization_store_unavailable",
      store,
      genuineOpenAICalls: 0,
    };
  }

  const params = input.rpcParams || {
    p_id: auth.authorizationId,
    p_project_id: auth.projectId,
    p_agent_id: auth.agentId,
    p_task_envelope_hash: auth.taskEnvelopeHash,
    p_provider_name: auth.providerName,
    p_approved_model: auth.approvedModel,
    p_approved_snapshot: auth.approvedSnapshot,
    p_integrity_checksum: auth.integrityChecksum || computeAuthorizationIntegrity(auth),
  };

  try {
    const { data, error } = await admin.rpc(CONSUME_RPC, params);
    if (error) {
      const msg = String(error.message || "").toLowerCase();
      if (
        error.code === "42P01" ||
        error.code === "PGRST202" ||
        error.code === "PGRST205" ||
        msg.includes("does not exist") ||
        msg.includes("could not find")
      ) {
        return {
          ok: false,
          code: "AUTHORIZATION_STORE_UNAVAILABLE",
          reason: "authorization_store_unavailable",
          store: { ...store, status: "not_applied", migrationApplied: false },
          genuineOpenAICalls: 0,
        };
      }
      return {
        ok: false,
        code: "CONSUME_FAILED",
        reason: "authorization_consume_failed",
        sanitizedError: "Authorization consume failed",
        genuineOpenAICalls: 0,
      };
    }

    const rows = Array.isArray(data) ? data : data ? [data] : [];
    if (rows.length === 0) {
      return {
        ok: false,
        code: "ALREADY_CONSUMED_OR_CONFLICT",
        reason: "duplicate_consumption_protection",
        guarantee: "atomic_one_time_authorization_consumption",
        genuineOpenAICalls: 0,
      };
    }

    if (auth) {
      auth.status = "consumed";
      auth.consumedAt = rows[0].consumed_at || new Date().toISOString();
    }

    return {
      ok: true,
      auth: rows[0],
      guarantee: "atomic_one_time_authorization_consumption",
      genuineOpenAICalls: 0,
    };
  } catch (err) {
    return {
      ok: false,
      code: "AUTHORIZATION_STORE_UNAVAILABLE",
      reason: "authorization_store_unavailable",
      sanitizedError: "Authorization store unavailable",
      genuineOpenAICalls: 0,
    };
  }
}

/**
 * Concurrent CAS simulator for tests (models DB UPDATE WHERE semantics).
 * Exactly one caller wins; others get ALREADY_CONSUMED_OR_CONFLICT.
 */
export function createConcurrentAuthorizationCasStore(initialAuth) {
  let row = { ...initialAuth };
  let chain = Promise.resolve();

  function consume() {
    const result = new Promise((resolve) => {
      chain = chain.then(() => {
        if (row.status !== "authorized" || row.consumedAt) {
          resolve({ ok: false, code: "ALREADY_CONSUMED_OR_CONFLICT" });
          return;
        }
        if (row.expiresAt && Date.parse(row.expiresAt) < Date.now()) {
          row = { ...row, status: "expired" };
          resolve({ ok: false, code: "EXPIRED" });
          return;
        }
        row = {
          ...row,
          status: "consumed",
          consumedAt: new Date().toISOString(),
        };
        resolve({
          ok: true,
          auth: row,
          guarantee: "atomic_one_time_authorization_consumption",
        });
      });
    });
    return result;
  }

  return {
    get: () => row,
    consume,
  };
}

export { resetSchemaProbeCache };
