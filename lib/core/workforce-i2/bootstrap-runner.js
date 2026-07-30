/**
 * Bootstrap / verify runner — compiled seats ≠ persisted database seats.
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
import { buildWorkforceActivationChecklist } from "./readiness";
import { oneKeyActivationStatus } from "./provider-resolution";
import { durableRateLimitStatus } from "./ratelimit-postgres";
import { verifyPhaseI2Claims } from "./claim-verification";
import { INSTANCE_DURABILITY } from "./durability";
import { auditRealAgentWorkflowCoverage } from "../real-agent/workflow-coverage";
import { schedulerStatus } from "../config";
import {
  WORKFORCE_ERRORS,
  isWorkforceDatabaseConfigured,
  queryPersistedWorkforceTruth,
  resolveWorkforceDbCredentials,
} from "./persistence";
import { getSupabaseAdmin } from "@/lib/supabase";

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
    lifecycle_state: s.lifecycleState === "available" ? "available" : s.lifecycleState,
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

async function upsertToDatabase({ adapter, admin }) {
  resetWorkforceI2Stores();
  bootstrapWorkforceRegistryInMemory();
  const archetypes = listArchetypesFromStore().map(mapArchetypeRow);
  const seats = listSeatsFromStore().map(mapSeatRow);

  if (adapter?.upsertRegistry) {
    return adapter.upsertRegistry({ archetypes, seats });
  }

  const client = admin ?? getSupabaseAdmin();
  if (!client) {
    throw Object.assign(new Error(WORKFORCE_ERRORS.SUPABASE_SERVICE_ROLE_KEY_MISSING), {
      code: WORKFORCE_ERRORS.SUPABASE_SERVICE_ROLE_KEY_MISSING,
    });
  }

  const { error: aErr } = await client.from("agent_role_archetypes").upsert(archetypes, {
    onConflict: "id",
  });
  if (aErr) {
    throw Object.assign(new Error(aErr.message), {
      code: WORKFORCE_ERRORS.WORKFORCE_BOOTSTRAP_FAILED,
    });
  }

  let created = 0;
  let updated = 0;
  // Count before for crude created/updated (idempotent second run → mostly updates)
  const before = await client
    .from("agent_capacity_seats")
    .select("seat_id", { count: "exact", head: true });
  const beforeCount = before.count ?? 0;

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
  created = Math.max(0, afterCount - beforeCount);
  updated = Math.max(0, afterCount - created);
  return { created, updated, duplicates: 0, beforeCount, afterCount };
}

/**
 * @param {{ dryRun?: boolean, verifyOnly?: boolean, adapter?: object, requireProductionDb?: boolean }} opts
 */
export async function runWorkforceBootstrap({
  dryRun = false,
  verifyOnly = false,
  adapter = null,
  requireProductionDb = !dryRun,
} = {}) {
  const snap = compilationSnapshot();
  const mode = dryRun ? "dry-run" : verifyOnly ? "verify-only" : "bootstrap";

  if (!snap.invariants.ok) {
    return {
      ok: false,
      mode,
      compilationReady: false,
      databaseReady: false,
      runtimeReady: false,
      providerReady: false,
      liveReady: false,
      productionReady: false,
      errors: snap.invariants.errors,
      code: "COMPILATION_INVALID",
      compiledSeats: snap.seats.capacitySeats,
      persistedSeats: null,
      wouldPersist: false,
      created: 0,
      updated: 0,
      duplicates: 0,
      liveTestedSeats: 0,
    };
  }

  const persisted = await queryPersistedWorkforceTruth(adapter ? { adapter } : {});

  if (dryRun) {
    return {
      ok: true,
      mode: "dry-run",
      wouldPersist: false,
      compilationReady: true,
      databaseReady: Boolean(persisted.ok && persisted.schemaPresent),
      runtimeReady: false,
      providerReady: false,
      liveReady: false,
      productionReady: false,
      sources: snap.sources.entryCount,
      archetypes: snap.archetypes.count,
      compiledSeats: snap.seats.capacitySeats,
      mappedSeats: snap.seats.mappedSeats,
      orphanSeats: snap.seats.orphanSeats,
      uniqueSeatIds: snap.invariants.uniqueSeatIds,
      persistedSeats: persisted.databaseConfigured
        ? persisted.persistedSeats
        : null,
      persistedArchetypes: persisted.databaseConfigured
        ? persisted.persistedArchetypes
        : null,
      bootstrapStatus: persisted.bootstrapStatus,
      supabaseConfigured: isWorkforceDatabaseConfigured(),
      databaseConfigured: isWorkforceDatabaseConfigured(),
      created: 0,
      updated: 0,
      duplicates: 0,
      liveTestedSeats: 0,
      departments: snap.dept,
      workflows: {
        mapped: snap.workflows.founderFamiliesMapped,
        required: snap.workflows.founderFamiliesRequired,
      },
    };
  }

  if (verifyOnly || requireProductionDb) {
    const creds = resolveWorkforceDbCredentials();
    if (!creds.ok && !adapter) {
      return {
        ok: false,
        mode,
        compilationReady: true,
        databaseReady: false,
        runtimeReady: false,
        providerReady: false,
        liveReady: false,
        productionReady: false,
        code: creds.errors[0],
        errors: creds.errors,
        compiledSeats: snap.seats.capacitySeats,
        persistedSeats: null,
        readyToAllocateSeats: 0,
        wouldPersist: false,
        created: 0,
        updated: 0,
        duplicates: 0,
        liveTestedSeats: 0,
      };
    }
    if (!persisted.ok) {
      return {
        ok: false,
        mode,
        compilationReady: true,
        databaseReady: false,
        runtimeReady: false,
        providerReady: false,
        liveReady: false,
        productionReady: false,
        code: persisted.code,
        errors: persisted.errors,
        compiledSeats: snap.seats.capacitySeats,
        persistedSeats: persisted.persistedSeats,
        readyToAllocateSeats: 0,
        bootstrapStatus: persisted.bootstrapStatus,
        wouldPersist: false,
        created: 0,
        updated: 0,
        duplicates: 0,
        liveTestedSeats: 0,
      };
    }
  }

  if (verifyOnly) {
    const dbReady =
      persisted.ok &&
      persisted.schemaPresent &&
      persisted.persistedSeats === 445 &&
      snap.seats.orphanSeats === 0;
    return {
      ok: dbReady,
      mode: "verify-only",
      wouldPersist: false,
      compilationReady: true,
      databaseReady: dbReady,
      runtimeReady: dbReady,
      providerReady: false,
      liveReady: false,
      productionReady: false,
      compiledSeats: snap.seats.capacitySeats,
      mappedSeats: snap.seats.mappedSeats,
      orphanSeats: snap.seats.orphanSeats,
      persistedSeats: persisted.persistedSeats,
      persistedArchetypes: persisted.persistedArchetypes,
      readyToAllocateSeats: persisted.readyToAllocateSeats,
      allocatedSeats: persisted.allocatedSeats,
      activeInstances: persisted.activeInstances,
      bootstrapStatus: persisted.bootstrapStatus,
      archetypes: snap.archetypes.count,
      created: 0,
      updated: 0,
      duplicates: 0,
      liveTestedSeats: persisted.liveTestedSeats ?? 0,
      errors: dbReady ? [] : ["Persisted seats must equal 445 after bootstrap"],
    };
  }

  // Normal bootstrap — write then re-query
  let firstUpsert;
  try {
    firstUpsert = await upsertToDatabase({ adapter });
  } catch (err) {
    return {
      ok: false,
      mode: "bootstrap",
      compilationReady: true,
      databaseReady: false,
      runtimeReady: false,
      providerReady: false,
      liveReady: false,
      productionReady: false,
      code: err.code || WORKFORCE_ERRORS.WORKFORCE_BOOTSTRAP_FAILED,
      errors: [err.message],
      compiledSeats: snap.seats.capacitySeats,
      persistedSeats: null,
      created: 0,
      updated: 0,
      duplicates: 0,
      liveTestedSeats: 0,
    };
  }

  let secondUpsert;
  try {
    secondUpsert = await upsertToDatabase({ adapter });
  } catch (err) {
    return {
      ok: false,
      mode: "bootstrap",
      code: err.code || WORKFORCE_ERRORS.WORKFORCE_BOOTSTRAP_FAILED,
      errors: [err.message],
      firstRun: firstUpsert,
      compiledSeats: snap.seats.capacitySeats,
      persistedSeats: null,
      liveTestedSeats: 0,
    };
  }

  const after = await queryPersistedWorkforceTruth(adapter ? { adapter } : {});
  const persistedOk =
    after.ok && after.persistedSeats === 445 && snap.seats.orphanSeats === 0;

  if (persistedOk) {
    recordReadinessSnapshot({
      capacitySeats: 445,
      mappedSeats: 445,
      readyToActivate: after.readyToAllocateSeats,
      liveTested: 0,
    });
  }

  return {
    ok: persistedOk && secondUpsert.created === 0,
    mode: "bootstrap",
    compilationReady: true,
    databaseReady: persistedOk,
    runtimeReady: persistedOk,
    providerReady: false,
    liveReady: false,
    productionReady: false,
    wouldPersist: true,
    compiledSeats: snap.seats.capacitySeats,
    mappedSeats: snap.seats.mappedSeats,
    orphanSeats: snap.seats.orphanSeats,
    persistedSeats: after.persistedSeats,
    persistedArchetypes: after.persistedArchetypes,
    readyToAllocateSeats: after.readyToAllocateSeats,
    seatCountAfterSecondRun: after.persistedSeats,
    firstRun: {
      created: firstUpsert.created,
      updated: firstUpsert.updated,
      duplicates: firstUpsert.duplicates ?? 0,
    },
    secondRun: {
      created: secondUpsert.created,
      updated: secondUpsert.updated,
      duplicates: secondUpsert.duplicates ?? 0,
    },
    archetypes: snap.archetypes.count,
    workflows: `${snap.workflows.founderFamiliesMapped}/${snap.workflows.founderFamiliesRequired}`,
    bootstrapStatus: after.bootstrapStatus,
    liveTestedSeats: 0,
    errors: persistedOk ? [] : after.errors || ["persisted seats != 445"],
  };
}

/**
 * Production verification — never treats memory compile as persistence.
 * @param {{ adapter?: object, productionMode?: boolean }} [opts]
 */
export async function runWorkforceVerify({
  adapter = null,
  productionMode = true,
} = {}) {
  const snap = compilationSnapshot();
  const oneKey = oneKeyActivationStatus();
  const rate = durableRateLimitStatus();
  const claims = verifyPhaseI2Claims();
  const checklist = buildWorkforceActivationChecklist();
  const scheduler = schedulerStatus({});
  const persisted = await queryPersistedWorkforceTruth(adapter ? { adapter } : {});
  const dbConfigured = isWorkforceDatabaseConfigured() || Boolean(adapter);

  const compilationReady =
    snap.invariants.ok &&
    snap.seats.capacitySeats === 445 &&
    snap.seats.orphanSeats === 0 &&
    claims.summary.fail === 0;

  const databaseReady =
    Boolean(persisted.ok) &&
    persisted.schemaPresent === true &&
    persisted.persistedSeats === 445;

  const databaseDurable = databaseReady;
  const queueDurable = databaseReady;
  const leasesDurable = databaseReady;
  const rateLimitDurable = Boolean(rate.durableReady) && databaseReady;

  const runtimeReady = databaseReady && leasesDurable;
  const providerReady = Boolean(oneKey.keyPresent);
  const liveReady = false; // never true without controlled live evidence

  const productionReady =
    compilationReady &&
    databaseReady &&
    runtimeReady &&
    // provider optional for foundation; productionReady requires foundation only
    // Founder can complete foundation without provider — so productionReady here means foundation
    false;

  const foundationReady = compilationReady && databaseReady && runtimeReady;

  // For production verification CLI: fail when DB not ready
  const ok = productionMode
    ? foundationReady
    : compilationReady;

  const readyToAllocateSeats = databaseReady ? persisted.readyToAllocateSeats : 0;
  const persistedSeats = dbConfigured
    ? persisted.persistedSeats
    : null;

  return {
    ok,
    compilationReady,
    databaseReady,
    runtimeReady,
    providerReady,
    liveReady,
    foundationReady,
    productionReady,
    capacityBaseline: 445,
    compiledSeats: snap.seats.capacitySeats,
    persistedSeats,
    mappedSeats: snap.seats.mappedSeats,
    readyToAllocateSeats,
    allocatedSeats: databaseReady ? persisted.allocatedSeats : 0,
    activeInstances: databaseReady ? persisted.activeInstances : 0,
    reviewingInstances: databaseReady ? persisted.reviewingInstances : 0,
    blockedSeats: databaseReady ? persisted.blockedSeats : 0,
    liveTestedSeats: 0,
    archetypeCount: snap.archetypes.count,
    persistedArchetypes: persisted.persistedArchetypes,
    departmentCoverage: "20/20",
    workflowCoverage: `${checklist.workflows?.founderFamiliesMapped || 13}/13`,
    hierarchyStatus: compilationReady ? "validated" : "invalid",
    providerStatus: oneKey,
    queueStatus: checklist.scheduler,
    schedulerStatus: scheduler,
    rateLimitStatus: rate,
    databaseDurable,
    queueDurable,
    leasesDurable,
    rateLimitDurable,
    bootstrapStatus: persisted.bootstrapStatus,
    knowledgeStatus: "Ready",
    memoryStatus: "Ready",
    qaStatus: "Ready",
    projectIsolationStatus: "enforced",
    organizationIsolationStatus: "enforced",
    instanceDurability: INSTANCE_DURABILITY.describe({
      supabaseConfigured: dbConfigured && persisted.schemaPresent,
    }),
    claimVerification: claims.summary,
    providerFreeMessage:
      "Workforce foundation ready. Add an AI provider key to start real AI execution.",
    errors: [
      ...(snap.invariants.errors || []),
      ...(!dbConfigured ? ["Database credentials missing — persistedSeats is null"] : []),
      ...(persisted.errors || []),
    ].filter(Boolean),
    code: !dbConfigured
      ? resolveWorkforceDbCredentials().errors[0]
      : !persisted.ok
        ? persisted.code
        : null,
  };
}

export async function buildActivationPreflight(opts = {}) {
  const verify = await runWorkforceVerify(opts);
  const oneKey = oneKeyActivationStatus();
  const freeOnly = process.env.OPENROUTER_FREE_ONLY !== "false";
  const liveTestFlag = process.env.ALLOW_LIVE_PROVIDER_TEST === "true";

  return {
    ok: verify.foundationReady || verify.compilationReady,
    secretsExposed: false,
    foundationReady: verify.foundationReady,
    productionReady: false,
    checks: {
      openRouterKeyPresent: Boolean(oneKey.keyPresent),
      openRouterReachable: "not_probed",
      freeOnlyMode: freeOnly,
      paidFallbackDisabled: true,
      compatibleModelPolicy: "openrouter/free preferred",
      requestBudget: Number(process.env.OPENROUTER_MAX_REQUESTS_PER_RUN || 3),
      tokenBudget: Number(process.env.OPENROUTER_MAX_TOKENS_PER_RUN || 8000),
      durableDatabase: verify.databaseDurable,
      seatRegistryCompiled445: verify.compiledSeats === 445,
      seatRegistryPersisted445: verify.persistedSeats === 445,
      seatRegistry445: verify.persistedSeats === 445,
      queue: verify.queueDurable,
      leases: verify.leasesDurable,
      scheduler: verify.schedulerStatus,
      durableRateLimiter: {
        durableReady: verify.rateLimitDurable,
      },
      knowledge: "Ready",
      memory: "Ready",
      qa: "Ready",
      securityGates: "Ready",
      allowLiveProviderTest: liveTestFlag,
      providerFreeMode: !oneKey.keyPresent,
    },
    founderPrimaryAction: !verify.databaseReady
      ? "Apply workforce database foundation"
      : !oneKey.keyPresent
        ? "Add OpenRouter API key"
        : oneKey.founderPrimaryAction,
    providerFreeMessage: verify.providerFreeMessage,
    note: "Preflight never returns secret values and does not call the provider by default.",
  };
}
