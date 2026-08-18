/**
 * Production-safe workforce bootstrap service (canonical).
 * Used by Admin API, CLI (when DB env available), and tests.
 * Never silently falls back to in-memory fixtures for production persistence.
 */

import { compileCapacitySeats, assertSeatRegistryInvariants, reconcileDepartmentBaseline } from "./seats";
import { compileRoleArchetypes } from "./archetypes";
import { auditWorkforceSources } from "./source-audit";
import {
  bootstrapWorkforceRegistryInMemory,
  listArchetypesFromStore,
  listSeatsFromStore,
  recordReadinessSnapshot,
  resetWorkforceI2Stores,
} from "./store";
import { auditRealAgentWorkflowCoverage } from "../real-agent/workflow-coverage";
import { oneKeyActivationStatus } from "./provider-resolution";
import {
  WORKFORCE_ERRORS,
  isWorkforceDatabaseConfigured,
  queryPersistedWorkforceTruth,
  resolveWorkforceDbCredentials,
} from "./persistence";
import { getSupabaseAdmin } from "@/lib/supabase";

export const BOOTSTRAP_CONFIRMATION = "BOOTSTRAP 445";
export const AUTHORITATIVE_SEAT_COUNT = 445;

function compilationSnapshot() {
  const sources = auditWorkforceSources();
  const archetypes = compileRoleArchetypes();
  const seats = compileCapacitySeats();
  const invariants = assertSeatRegistryInvariants(seats);
  const workflows = auditRealAgentWorkflowCoverage();
  const dept = reconcileDepartmentBaseline();
  return { sources, archetypes, seats, invariants, workflows, dept };
}

function mapSeatRow(s) {
  return {
    seat_id: s.seatId,
    role_archetype_id: s.roleArchetypeId,
    department: s.department,
    hierarchy_level: s.hierarchyLevel,
    capacity_class: s.capacityClass,
    supported_project_types: s.supportedProjectTypes,
    allowed_concurrency: s.allowedConcurrency,
    allocation_priority: s.allocationPriority,
    reserve_or_primary: s.reserveOrPrimary,
    readiness_status: s.readinessStatus,
    activation_requirements: s.activationRequirements,
    lifecycle_state:
      s.lifecycleState === "available" || s.lifecycleState === "validated"
        ? "available"
        : s.lifecycleState,
    created_source_version: s.createdSourceVersion,
    expansion_category: s.expansionCategory,
    audit_metadata: s.auditMetadata,
  };
}

function mapArchetypeRow(a) {
  return {
    id: a.id,
    version: a.version,
    title: a.title,
    department: a.department,
    hierarchy_level: a.hierarchyLevel,
    reports_to: a.reportsTo,
    mission: a.mission,
    responsibilities: a.responsibilities,
    capabilities: a.capabilities,
    required_knowledge_domains: a.requiredKnowledgeDomains,
    input_schema: a.inputSchema,
    output_schema: a.outputSchema,
    evidence_schema: a.evidenceSchema,
    allowed_tools: a.allowedTools,
    prohibited_tools: a.prohibitedTools,
    protected_actions: a.protectedActions,
    provider_capabilities_required: a.providerCapabilitiesRequired,
    memory_read_policy: a.memoryReadPolicy,
    memory_write_policy: a.memoryWritePolicy,
    learning_policy: a.learningPolicy,
    delegation_policy: a.delegationPolicy,
    qa_reviewer_requirements: a.qaReviewerRequirements,
    workload_limits: a.workloadLimits,
    concurrency_limits: a.concurrencyLimits,
    risk_class: a.riskClass,
    escalation_rules: a.escalationRules,
    project_scoped: a.projectScoped,
    source_document_references: a.sourceDocumentReferences,
    contract_checksum: a.contractChecksum,
    lifecycle_status: a.lifecycleStatus,
    role_type: a.roleType,
    expansion_category: a.expansionCategory,
    runtime_slug: a.runtimeSlug,
  };
}

function safeTruthFields(snap, persisted, extra = {}) {
  const deptCount = Object.keys(snap.dept.departments || {}).length;
  return {
    compiledSeats: snap.seats.capacitySeats,
    uniqueSeatIds: snap.invariants.uniqueSeatIds,
    mappedSeats: snap.seats.mappedSeats,
    orphanSeats: snap.seats.orphanSeats,
    duplicateSeats: snap.invariants.uniqueSeatIds === snap.seats.capacitySeats ? 0 : 1,
    departmentCount: deptCount,
    archetypeCount: snap.archetypes.count,
    workflowFamilyCount: snap.workflows.founderFamiliesMapped,
    workflowFamiliesRequired: snap.workflows.founderFamiliesRequired,
    persistedSeats: persisted.persistedSeats,
    readyToAllocateSeats: persisted.readyToAllocateSeats ?? 0,
    allocatedSeats: persisted.allocatedSeats ?? 0,
    activeInstances: persisted.activeInstances ?? 0,
    liveTestedSeats: persisted.liveTestedSeats ?? 0,
    bootstrapStatus: persisted.bootstrapStatus,
    schemaPresent: Boolean(persisted.schemaPresent),
    databaseConfigured: Boolean(persisted.databaseConfigured),
    providerConfigured: Boolean(oneKeyActivationStatus().keyPresent),
    liveExecutionReady: false,
    ...extra,
  };
}

export async function upsertWorkforceRegistryOnce({ adapter = null } = {}) {
  resetWorkforceI2Stores();
  bootstrapWorkforceRegistryInMemory();
  const archetypes = listArchetypesFromStore().map(mapArchetypeRow);
  const seats = listSeatsFromStore().map(mapSeatRow);

  if (adapter?.upsertRegistry) {
    return adapter.upsertRegistry({ archetypes, seats });
  }

  const client = getSupabaseAdmin();
  if (!client) {
    throw Object.assign(new Error(WORKFORCE_ERRORS.SUPABASE_SERVICE_ROLE_KEY_MISSING), {
      code: WORKFORCE_ERRORS.SUPABASE_SERVICE_ROLE_KEY_MISSING,
    });
  }

  const before = await client
    .from("agent_capacity_seats")
    .select("seat_id", { count: "exact", head: true });
  if (before.error) {
    throw Object.assign(new Error(before.error.message), {
      code: WORKFORCE_ERRORS.DATABASE_QUERY_FAILED,
    });
  }
  const beforeCount = before.count ?? 0;

  const { error: aErr } = await client.from("agent_role_archetypes").upsert(archetypes, {
    onConflict: "id",
  });
  if (aErr) {
    throw Object.assign(new Error(aErr.message), {
      code: WORKFORCE_ERRORS.WORKFORCE_BOOTSTRAP_FAILED,
    });
  }

  for (let i = 0; i < seats.length; i += 100) {
    const chunk = seats.slice(i, i + 100);
    const { error: sErr } = await client.from("agent_capacity_seats").upsert(chunk, {
      onConflict: "seat_id",
    });
    if (sErr) {
      throw Object.assign(new Error(sErr.message), {
        code: WORKFORCE_ERRORS.WORKFORCE_BOOTSTRAP_FAILED,
      });
    }
  }

  const after = await client
    .from("agent_capacity_seats")
    .select("seat_id", { count: "exact", head: true });
  const afterCount = after.count ?? 0;
  const created = Math.max(0, afterCount - beforeCount);
  const updated = Math.max(0, Math.min(afterCount, seats.length) - created);
  return { created, updated, duplicates: 0, beforeCount, afterCount };
}

/**
 * Read-only preflight — never writes.
 */
export async function runProductionBootstrapPreflight({ adapter = null } = {}) {
  const snap = compilationSnapshot();
  const persisted = await queryPersistedWorkforceTruth(adapter ? { adapter } : {});
  const compilationOk =
    snap.invariants.ok &&
    snap.seats.capacitySeats === AUTHORITATIVE_SEAT_COUNT &&
    snap.seats.mappedSeats === AUTHORITATIVE_SEAT_COUNT &&
    snap.seats.orphanSeats === 0 &&
    snap.invariants.uniqueSeatIds === AUTHORITATIVE_SEAT_COUNT &&
    snap.workflows.founderFamiliesMapped === 13;

  const schemaReady = Boolean(persisted.schemaPresent);
  const bootstrapRequired =
    schemaReady &&
    (persisted.persistedSeats == null || persisted.persistedSeats < AUTHORITATIVE_SEAT_COUNT);

  const plannedCreated = schemaReady
    ? Math.max(0, AUTHORITATIVE_SEAT_COUNT - (persisted.persistedSeats || 0))
    : null;
  const plannedUpdated = schemaReady
    ? Math.min(AUTHORITATIVE_SEAT_COUNT, persisted.persistedSeats || 0)
    : null;

  return {
    ok: compilationOk && schemaReady,
    mode: "preflight",
    wrote: false,
    compilationOk,
    schemaReady,
    bootstrapRequired,
    bootstrapBlockedReason: !compilationOk
      ? "COMPILATION_INVALID"
      : !schemaReady
        ? persisted.code || WORKFORCE_ERRORS.WORKFORCE_SCHEMA_MISSING
        : null,
    planned: {
      created: plannedCreated,
      updated: plannedUpdated,
      unchanged: 0,
    },
    ...safeTruthFields(snap, persisted, {
      errors: [
        ...(snap.invariants.errors || []),
        ...(persisted.errors || []),
      ].filter(Boolean),
    }),
  };
}

/**
 * Apply durable upsert. Requires exact confirmation string.
 */
export async function runProductionBootstrapApply({
  confirmation,
  adapter = null,
} = {}) {
  if (confirmation !== BOOTSTRAP_CONFIRMATION) {
    return {
      ok: false,
      mode: "apply",
      wrote: false,
      code: "INVALID_CONFIRMATION",
      errors: [`confirmation must be exactly "${BOOTSTRAP_CONFIRMATION}"`],
    };
  }

  const preflight = await runProductionBootstrapPreflight({ adapter });
  if (!preflight.compilationOk) {
    return {
      ok: false,
      mode: "apply",
      wrote: false,
      code: "COMPILATION_INVALID",
      errors: preflight.errors,
      ...preflight,
    };
  }
  if (!preflight.schemaReady && !adapter) {
    const creds = resolveWorkforceDbCredentials();
    return {
      ok: false,
      mode: "apply",
      wrote: false,
      code: preflight.bootstrapBlockedReason || creds.errors[0],
      errors: preflight.errors.length ? preflight.errors : creds.errors,
      ...preflight,
    };
  }

  let upsert;
  try {
    upsert = await upsertWorkforceRegistryOnce({ adapter });
  } catch (err) {
    return {
      ok: false,
      mode: "apply",
      wrote: false,
      code: err.code || WORKFORCE_ERRORS.WORKFORCE_BOOTSTRAP_FAILED,
      errors: [err.message],
    };
  }

  const after = await queryPersistedWorkforceTruth(adapter ? { adapter } : {});
  const snap = compilationSnapshot();
  const ok =
    after.ok &&
    after.persistedSeats === AUTHORITATIVE_SEAT_COUNT &&
    snap.seats.orphanSeats === 0;

  if (ok) {
    recordReadinessSnapshot({
      capacitySeats: AUTHORITATIVE_SEAT_COUNT,
      mappedSeats: AUTHORITATIVE_SEAT_COUNT,
      readyToActivate: after.readyToAllocateSeats,
      liveTested: 0,
    });
  }

  return {
    ok,
    mode: "apply",
    wrote: true,
    created: upsert.created,
    updated: upsert.updated,
    duplicates: upsert.duplicates ?? 0,
    ...safeTruthFields(snap, after, {
      errors: ok ? [] : after.errors || ["persisted seats != 445"],
    }),
  };
}

/**
 * Explicit second-run idempotency verification (safe re-upsert).
 */
export async function runProductionBootstrapIdempotencyCheck({
  confirmation,
  adapter = null,
} = {}) {
  if (confirmation !== BOOTSTRAP_CONFIRMATION) {
    return {
      ok: false,
      mode: "idempotency",
      wrote: false,
      code: "INVALID_CONFIRMATION",
      errors: [`confirmation must be exactly "${BOOTSTRAP_CONFIRMATION}"`],
    };
  }
  const result = await runProductionBootstrapApply({ confirmation, adapter });
  if (!result.ok) return { ...result, mode: "idempotency" };
  return {
    ...result,
    mode: "idempotency",
    ok: result.created === 0 && result.persistedSeats === AUTHORITATIVE_SEAT_COUNT,
    idempotent: result.created === 0 && (result.duplicates ?? 0) === 0,
  };
}

export function productionEnvUnavailableMessage() {
  return {
    ok: false,
    wrote: false,
    code: "PRODUCTION_SENSITIVE_ENV_NOT_LOCALLY_READABLE",
    message:
      "Production sensitive variables are not locally readable. Use the authenticated Admin Workforce Activation page. No bootstrap was performed. Persisted count remains the real database count. Do not claim 445 persisted unless the database verifies it.",
    hint: "Open /admin/workforce-activation → Run Bootstrap Preflight → Bootstrap 445 Seats",
    simulationMode: false,
  };
}

export function isLocalSensitiveEnvPlaceholder(value) {
  if (value == null) return true;
  const v = String(value).trim();
  if (!v) return true;
  // Vercel CLI placeholders for sensitive env when pulled locally
  return (
    v === "••••" ||
    /^@?[•*]+$/.test(v) ||
    v.toLowerCase() === "encrypted" ||
    v.startsWith("vercel_env_sensitive")
  );
}

export function assertProductionPersistenceEnvOrExplain() {
  if (!isWorkforceDatabaseConfigured()) {
    return productionEnvUnavailableMessage();
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (isLocalSensitiveEnvPlaceholder(url) || isLocalSensitiveEnvPlaceholder(key)) {
    return productionEnvUnavailableMessage();
  }
  return null;
}
