/**
 * Workforce Postgres persistence adapter.
 * Compiled in-memory seats are NEVER treated as persisted database seats.
 */

import { getSupabaseAdmin } from "@/lib/supabase";

export const WORKFORCE_ERRORS = Object.freeze({
  SUPABASE_URL_MISSING: "SUPABASE_URL_MISSING",
  SUPABASE_SERVICE_ROLE_KEY_MISSING: "SUPABASE_SERVICE_ROLE_KEY_MISSING",
  WORKFORCE_SCHEMA_MISSING: "WORKFORCE_SCHEMA_MISSING",
  WORKFORCE_BOOTSTRAP_FAILED: "WORKFORCE_BOOTSTRAP_FAILED",
  DATABASE_QUERY_FAILED: "DATABASE_QUERY_FAILED",
});

/**
 * Admin client for workforce bootstrap — requires URL + service role.
 * Does not fall back to anon key (writes must be privileged).
 */
export function resolveWorkforceDbCredentials() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "";
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const errors = [];
  if (!url.trim()) errors.push(WORKFORCE_ERRORS.SUPABASE_URL_MISSING);
  if (!serviceRole.trim()) errors.push(WORKFORCE_ERRORS.SUPABASE_SERVICE_ROLE_KEY_MISSING);
  return {
    ok: errors.length === 0,
    url: url.trim() || null,
    serviceRoleConfigured: Boolean(serviceRole.trim()),
    errors,
  };
}

export function isWorkforceDatabaseConfigured() {
  return resolveWorkforceDbCredentials().ok;
}

/**
 * @param {{ admin?: object|null, schemaProbe?: Function }} [deps]
 */
export async function probeWorkforceSchema(deps = {}) {
  const creds = resolveWorkforceDbCredentials();
  if (!creds.ok) {
    return {
      ok: false,
      present: false,
      code: creds.errors[0],
      errors: creds.errors,
      tables: {},
    };
  }

  if (typeof deps.schemaProbe === "function") {
    return deps.schemaProbe();
  }

  const admin = deps.admin ?? getSupabaseAdmin();
  if (!admin) {
    return {
      ok: false,
      present: false,
      code: WORKFORCE_ERRORS.SUPABASE_SERVICE_ROLE_KEY_MISSING,
      errors: [WORKFORCE_ERRORS.SUPABASE_SERVICE_ROLE_KEY_MISSING],
      tables: {},
    };
  }

  const required = [
    "agent_role_archetypes",
    "agent_capacity_seats",
    "project_agent_instances",
    "agent_instance_leases",
  ];
  const tables = {};
  for (const table of required) {
    const { error } = await admin.from(table).select("*", { count: "exact", head: true });
    if (error) {
      const missing =
        /relation|does not exist|schema cache|Could not find the table/i.test(
          error.message || ""
        );
      tables[table] = { ok: false, missing, message: error.message };
      if (missing) {
        return {
          ok: false,
          present: false,
          code: WORKFORCE_ERRORS.WORKFORCE_SCHEMA_MISSING,
          errors: [WORKFORCE_ERRORS.WORKFORCE_SCHEMA_MISSING],
          tables,
        };
      }
      return {
        ok: false,
        present: false,
        code: WORKFORCE_ERRORS.DATABASE_QUERY_FAILED,
        errors: [WORKFORCE_ERRORS.DATABASE_QUERY_FAILED, error.message],
        tables,
      };
    }
    tables[table] = { ok: true, missing: false };
  }
  return { ok: true, present: true, code: null, errors: [], tables };
}

/**
 * Query real persisted workforce counts. Never uses in-memory compiled seats.
 * @param {{ admin?: object|null, adapter?: object }} [deps]
 */
export async function queryPersistedWorkforceTruth(deps = {}) {
  if (deps.adapter) {
    return deps.adapter.queryPersistedWorkforceTruth();
  }

  const creds = resolveWorkforceDbCredentials();
  if (!creds.ok) {
    return {
      ok: false,
      databaseConfigured: false,
      schemaPresent: false,
      persistedSeats: null,
      persistedArchetypes: null,
      readyToAllocateSeats: 0,
      allocatedSeats: 0,
      activeInstances: 0,
      reviewingInstances: 0,
      blockedSeats: 0,
      liveTestedSeats: 0,
      bootstrapStatus: "credentials_missing",
      code: creds.errors[0],
      errors: creds.errors,
    };
  }

  const schema = await probeWorkforceSchema(deps);
  if (!schema.ok) {
    return {
      ok: false,
      databaseConfigured: true,
      schemaPresent: false,
      persistedSeats: schema.code === WORKFORCE_ERRORS.WORKFORCE_SCHEMA_MISSING ? 0 : null,
      persistedArchetypes: schema.code === WORKFORCE_ERRORS.WORKFORCE_SCHEMA_MISSING ? 0 : null,
      readyToAllocateSeats: 0,
      allocatedSeats: 0,
      activeInstances: 0,
      reviewingInstances: 0,
      blockedSeats: 0,
      liveTestedSeats: 0,
      bootstrapStatus:
        schema.code === WORKFORCE_ERRORS.WORKFORCE_SCHEMA_MISSING
          ? "migration_required"
          : "query_failed",
      code: schema.code,
      errors: schema.errors,
    };
  }

  const admin = deps.admin ?? getSupabaseAdmin();
  const seatCount = await admin
    .from("agent_capacity_seats")
    .select("seat_id", { count: "exact", head: true });
  if (seatCount.error) {
    return {
      ok: false,
      databaseConfigured: true,
      schemaPresent: true,
      persistedSeats: null,
      persistedArchetypes: null,
      readyToAllocateSeats: 0,
      allocatedSeats: 0,
      activeInstances: 0,
      reviewingInstances: 0,
      blockedSeats: 0,
      liveTestedSeats: 0,
      bootstrapStatus: "query_failed",
      code: WORKFORCE_ERRORS.DATABASE_QUERY_FAILED,
      errors: [seatCount.error.message],
    };
  }

  const archCount = await admin
    .from("agent_role_archetypes")
    .select("id", { count: "exact", head: true });

  const available = await admin
    .from("agent_capacity_seats")
    .select("seat_id", { count: "exact", head: true })
    .in("lifecycle_state", ["available", "defined", "validated", "ready"]);

  const allocated = await admin
    .from("agent_capacity_seats")
    .select("seat_id", { count: "exact", head: true })
    .in("lifecycle_state", ["allocated", "active", "waiting", "reviewing"]);

  const blocked = await admin
    .from("agent_capacity_seats")
    .select("seat_id", { count: "exact", head: true })
    .in("lifecycle_state", ["blocked", "suspended"]);

  const activeInst = await admin
    .from("project_agent_instances")
    .select("id", { count: "exact", head: true })
    .in("status", ["assigned", "reasoning", "tool_executing", "active"]);

  const reviewingInst = await admin
    .from("project_agent_instances")
    .select("id", { count: "exact", head: true })
    .eq("status", "reviewing");

  const persistedSeats = seatCount.count ?? 0;
  const persistedArchetypes = archCount.count ?? 0;

  let bootstrapStatus = "bootstrap_required";
  if (persistedSeats === 445 && persistedArchetypes >= 148) {
    bootstrapStatus = "bootstrapped";
  } else if (persistedSeats > 0) {
    bootstrapStatus = "partial_bootstrap";
  }

  return {
    ok: true,
    databaseConfigured: true,
    schemaPresent: true,
    persistedSeats,
    persistedArchetypes,
    readyToAllocateSeats: available.count ?? 0,
    allocatedSeats: allocated.count ?? 0,
    activeInstances: activeInst.count ?? 0,
    reviewingInstances: reviewingInst.count ?? 0,
    blockedSeats: blocked.count ?? 0,
    liveTestedSeats: 0,
    bootstrapStatus,
    code: null,
    errors: [],
  };
}

/**
 * In-memory fake adapter for unit tests (never production).
 */
export function createMemoryPersistenceAdapter(initial = {}) {
  const state = {
    schemaPresent: initial.schemaPresent ?? true,
    credentialsOk: initial.credentialsOk ?? true,
    seats: new Map(initial.seats || []),
    archetypes: new Map(initial.archetypes || []),
    instances: [...(initial.instances || [])],
    failNextUpsert: false,
    failQuery: false,
  };

  return {
    state,
    async queryPersistedWorkforceTruth() {
      if (!state.credentialsOk) {
        return {
          ok: false,
          databaseConfigured: false,
          schemaPresent: false,
          persistedSeats: null,
          persistedArchetypes: null,
          readyToAllocateSeats: 0,
          allocatedSeats: 0,
          activeInstances: 0,
          reviewingInstances: 0,
          blockedSeats: 0,
          liveTestedSeats: 0,
          bootstrapStatus: "credentials_missing",
          code: WORKFORCE_ERRORS.SUPABASE_SERVICE_ROLE_KEY_MISSING,
          errors: [WORKFORCE_ERRORS.SUPABASE_SERVICE_ROLE_KEY_MISSING],
        };
      }
      if (!state.schemaPresent) {
        return {
          ok: false,
          databaseConfigured: true,
          schemaPresent: false,
          persistedSeats: 0,
          persistedArchetypes: 0,
          readyToAllocateSeats: 0,
          allocatedSeats: 0,
          activeInstances: 0,
          reviewingInstances: 0,
          blockedSeats: 0,
          liveTestedSeats: 0,
          bootstrapStatus: "migration_required",
          code: WORKFORCE_ERRORS.WORKFORCE_SCHEMA_MISSING,
          errors: [WORKFORCE_ERRORS.WORKFORCE_SCHEMA_MISSING],
        };
      }
      if (state.failQuery) {
        return {
          ok: false,
          databaseConfigured: true,
          schemaPresent: true,
          persistedSeats: null,
          persistedArchetypes: null,
          readyToAllocateSeats: 0,
          allocatedSeats: 0,
          activeInstances: 0,
          reviewingInstances: 0,
          blockedSeats: 0,
          liveTestedSeats: 0,
          bootstrapStatus: "query_failed",
          code: WORKFORCE_ERRORS.DATABASE_QUERY_FAILED,
          errors: ["simulated query failure"],
        };
      }
      const seatList = [...state.seats.values()];
      const ready = seatList.filter((s) =>
        ["available", "defined", "validated", "ready"].includes(s.lifecycle_state)
      ).length;
      const allocated = seatList.filter((s) =>
        ["allocated", "active", "waiting", "reviewing"].includes(s.lifecycle_state)
      ).length;
      const blocked = seatList.filter((s) =>
        ["blocked", "suspended"].includes(s.lifecycle_state)
      ).length;
      const persistedSeats = seatList.length;
      return {
        ok: true,
        databaseConfigured: true,
        schemaPresent: true,
        persistedSeats,
        persistedArchetypes: state.archetypes.size,
        readyToAllocateSeats: ready,
        allocatedSeats: allocated,
        activeInstances: state.instances.filter((i) =>
          ["assigned", "reasoning", "tool_executing", "active"].includes(i.status)
        ).length,
        reviewingInstances: state.instances.filter((i) => i.status === "reviewing").length,
        blockedSeats: blocked,
        liveTestedSeats: 0,
        bootstrapStatus:
          persistedSeats === 445 && state.archetypes.size >= 148
            ? "bootstrapped"
            : persistedSeats > 0
              ? "partial_bootstrap"
              : "bootstrap_required",
        code: null,
        errors: [],
      };
    },
    async upsertRegistry({ archetypes, seats }) {
      if (state.failNextUpsert) {
        state.failNextUpsert = false;
        throw new Error(WORKFORCE_ERRORS.WORKFORCE_BOOTSTRAP_FAILED);
      }
      if (!state.schemaPresent) {
        throw Object.assign(new Error(WORKFORCE_ERRORS.WORKFORCE_SCHEMA_MISSING), {
          code: WORKFORCE_ERRORS.WORKFORCE_SCHEMA_MISSING,
        });
      }
      let created = 0;
      let updated = 0;
      for (const a of archetypes) {
        if (state.archetypes.has(a.id)) updated += 1;
        else created += 1;
        state.archetypes.set(a.id, a);
      }
      for (const s of seats) {
        const existing = state.seats.get(s.seat_id);
        if (existing?.lifecycle_state === "active" && existing.current_project_instance_id) {
          // preserve active instance linkage
          state.seats.set(s.seat_id, {
            ...s,
            lifecycle_state: existing.lifecycle_state,
            current_project_instance_id: existing.current_project_instance_id,
          });
          updated += 1;
          continue;
        }
        if (existing) updated += 1;
        else created += 1;
        state.seats.set(s.seat_id, s);
      }
      return { created, updated, duplicates: 0 };
    },
  };
}
