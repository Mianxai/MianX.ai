/**
 * In-memory + optional Supabase durable store for Phase I.2 workforce.
 * Tests run without DB; bootstrap prefers DB when configured.
 */

import { compileRoleArchetypes } from "./archetypes";
import { compileCapacitySeats } from "./seats";
import { INSTANCE_LIFECYCLE } from "./constants";

const archetypesMem = new Map();
const seatsMem = new Map();
const instancesMem = new Map();
const snapshotsMem = [];

export function resetWorkforceI2Stores() {
  archetypesMem.clear();
  seatsMem.clear();
  instancesMem.clear();
  snapshotsMem.length = 0;
}

export function bootstrapWorkforceRegistryInMemory() {
  const { archetypes } = compileRoleArchetypes();
  const seatsCompiled = compileCapacitySeats();
  for (const a of archetypes) archetypesMem.set(a.id, a);
  for (const s of seatsCompiled.seats) seatsMem.set(s.seatId, { ...s });
  return {
    archetypes: archetypes.length,
    seats: seatsMem.size,
    capacitySeats: seatsCompiled.capacitySeats,
    mappedSeats: seatsCompiled.mappedSeats,
    orphanSeats: seatsCompiled.orphanSeats,
    invalidSeats: seatsCompiled.invalidSeats,
    durableBackend: "memory",
  };
}

export function listSeatsFromStore() {
  if (seatsMem.size === 0) bootstrapWorkforceRegistryInMemory();
  return [...seatsMem.values()];
}

export function listArchetypesFromStore() {
  if (archetypesMem.size === 0) bootstrapWorkforceRegistryInMemory();
  return [...archetypesMem.values()];
}

export function getSeat(seatId) {
  if (seatsMem.size === 0) bootstrapWorkforceRegistryInMemory();
  return seatsMem.get(seatId) || null;
}

/**
 * Atomically allocate a seat to a project (memory CAS + optional Postgres persist).
 */
export function allocateSeatToProject({
  seatId = null,
  department = null,
  projectId,
  organizationId = null,
  objectiveId = null,
  workflowId = null,
  taskId = null,
  preferredArchetypeId = null,
} = {}) {
  if (!projectId) throw new Error("projectId required");
  if (seatsMem.size === 0) bootstrapWorkforceRegistryInMemory();

  let seat = seatId ? seatsMem.get(seatId) : null;
  if (!seat) {
    const candidates = [...seatsMem.values()].filter((s) => {
      if (s.lifecycleState !== "available") return false;
      if (department && s.department !== department) return false;
      if (preferredArchetypeId && s.roleArchetypeId !== preferredArchetypeId) return false;
      return true;
    });
    candidates.sort((a, b) => a.allocationPriority - b.allocationPriority);
    seat = candidates[0] || null;
  }
  if (!seat) return { ok: false, reason: "no_available_seat" };
  if (seat.lifecycleState !== "available") {
    return { ok: false, reason: "seat_not_available", seat };
  }

  seat.lifecycleState = "allocating";
  const instanceId = cryptoRandomId("inst");
  const now = new Date().toISOString();
  const leaseExpires = new Date(Date.now() + 60_000).toISOString();
  const instance = {
    id: instanceId,
    organization_id: organizationId,
    project_id: projectId,
    objective_id: objectiveId,
    workflow_id: workflowId,
    task_id: taskId,
    seat_id: seat.seatId,
    role_archetype_id: seat.roleArchetypeId,
    provider: "openrouter",
    model: process.env.OPENROUTER_DEFAULT_MODEL || "openrouter/free",
    status: "allocating",
    attempt_count: 0,
    tool_budget: 12,
    last_activity_at: now,
    state_reason: "allocated_for_work",
    lease_owner: "allocator",
    lease_expires_at: leaseExpires,
    heartbeat_at: now,
    durable: false,
  };
  instancesMem.set(instanceId, instance);
  seat.lifecycleState = "allocated";
  seat.currentProjectInstanceId = instanceId;
  instance.status = "idle";

  // Best-effort durable persist (non-blocking for sync API)
  void persistInstanceDurable(instance, seat, "allocate");

  return { ok: true, seat, instance };
}

function cryptoRandomId(prefix) {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

async function persistInstanceDurable(instance, seat, phase) {
  try {
    const { getSupabaseAdmin, isSupabaseConfigured } = await import("@/lib/supabase");
    if (!isSupabaseConfigured()) return;
    const admin = getSupabaseAdmin();
    const { error: iErr } = await admin.from("project_agent_instances").upsert(
      {
        id: instance.id,
        organization_id: instance.organization_id,
        project_id: instance.project_id,
        objective_id: instance.objective_id,
        workflow_id: instance.workflow_id,
        task_id: instance.task_id,
        seat_id: instance.seat_id,
        role_archetype_id: instance.role_archetype_id,
        provider: instance.provider,
        model: instance.model,
        lease_owner: instance.lease_owner,
        lease_expires_at: instance.lease_expires_at,
        heartbeat_at: instance.heartbeat_at,
        attempt_count: instance.attempt_count,
        tool_budget: instance.tool_budget,
        last_activity_at: instance.last_activity_at,
        status: instance.status,
        state_reason: instance.state_reason,
        idempotency_key: `${instance.project_id}:${instance.seat_id}:${phase}`,
      },
      { onConflict: "project_id,idempotency_key" }
    );
    if (!iErr) {
      instance.durable = true;
      await admin.from("agent_instance_leases").insert([
        {
          instance_id: instance.id,
          project_id: instance.project_id,
          worker_id: instance.lease_owner || "allocator",
          expires_at: instance.lease_expires_at,
          heartbeat_at: instance.heartbeat_at,
          status: phase === "release" ? "released" : "active",
          released_at: phase === "release" ? new Date().toISOString() : null,
        },
      ]);
      if (seat) {
        await admin
          .from("agent_capacity_seats")
          .update({
            lifecycle_state: seat.lifecycleState,
            current_project_instance_id: seat.currentProjectInstanceId,
            updated_at: new Date().toISOString(),
          })
          .eq("seat_id", seat.seatId);
      }
    }
  } catch {
    /* memory remains source of truth in CI */
  }
}

export function releaseInstance(instanceId, { projectId = null, organizationId = null } = {}) {
  const inst = instancesMem.get(instanceId);
  if (!inst) return { ok: false, reason: "not_found" };
  if (projectId && inst.project_id !== projectId) {
    return { ok: false, reason: "cross_project_forbidden" };
  }
  if (
    organizationId != null &&
    inst.organization_id != null &&
    inst.organization_id !== organizationId
  ) {
    return { ok: false, reason: "cross_organization_forbidden" };
  }
  inst.status = "releasing";
  const seat = seatsMem.get(inst.seat_id);
  if (seat) {
    seat.lifecycleState = "releasing";
    seat.currentProjectInstanceId = null;
    seat.lifecycleState = "available";
  }
  inst.status = "released";
  void persistInstanceDurable(inst, seat, "release");
  return { ok: true, instance: inst, seat };
}

export function transitionInstance(
  instanceId,
  toStatus,
  { projectId = null, organizationId = null } = {}
) {
  const inst = instancesMem.get(instanceId);
  if (!inst) throw new Error("instance not found");
  if (projectId && inst.project_id !== projectId) {
    throw new Error("Cross-project instance mutation forbidden");
  }
  if (
    organizationId != null &&
    inst.organization_id != null &&
    inst.organization_id !== organizationId
  ) {
    throw new Error("Cross-organization instance mutation forbidden");
  }
  if (!INSTANCE_LIFECYCLE.includes(toStatus)) {
    throw new Error(`Invalid instance status ${toStatus}`);
  }
  inst.status = toStatus;
  inst.last_activity_at = new Date().toISOString();
  return inst;
}

export function listInstances({ projectId = null, organizationId = null } = {}) {
  let list = [...instancesMem.values()];
  if (projectId) list = list.filter((i) => i.project_id === projectId);
  if (organizationId != null) {
    list = list.filter(
      (i) => i.organization_id == null || i.organization_id === organizationId
    );
  }
  return list;
}
export function recordReadinessSnapshot(snapshot) {
  const row = {
    id: `snap_${Date.now().toString(36)}`,
    snapshot,
    capacity_seats: snapshot.capacitySeats ?? 445,
    mapped_seats: snapshot.mappedSeats ?? 445,
    ready_to_activate: snapshot.readyToActivate ?? 0,
    live_tested: snapshot.liveTested ?? 0,
    created_at: new Date().toISOString(),
  };
  snapshotsMem.push(row);
  return row;
}

/**
 * Attempt Supabase upsert bootstrap; falls back to memory.
 */
export async function bootstrapWorkforceRegistryDurable() {
  const mem = bootstrapWorkforceRegistryInMemory();
  try {
    const { getSupabaseAdmin, isSupabaseConfigured } = await import("@/lib/supabase");
    if (!isSupabaseConfigured()) {
      return { ...mem, durableBackend: "memory", durableNote: "Supabase not configured" };
    }
    const admin = getSupabaseAdmin();
    const archetypes = listArchetypesFromStore();
    const seats = listSeatsFromStore();
    // Upsert in chunks; ignore if tables missing
    const archRows = archetypes.map((a) => ({
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
    }));
    const { error: aErr } = await admin.from("agent_role_archetypes").upsert(archRows, {
      onConflict: "id",
    });
    if (aErr) {
      return {
        ...mem,
        durableBackend: "memory",
        durableNote: `archetype upsert skipped: ${aErr.message}`,
      };
    }
    const seatRows = seats.map((s) => ({
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
      lifecycle_state: s.lifecycleState,
      created_source_version: s.createdSourceVersion,
      expansion_category: s.expansionCategory,
      audit_metadata: s.auditMetadata,
    }));
    // chunk seats
    for (let i = 0; i < seatRows.length; i += 100) {
      const chunk = seatRows.slice(i, i + 100);
      const { error: sErr } = await admin.from("agent_capacity_seats").upsert(chunk, {
        onConflict: "seat_id",
      });
      if (sErr) {
        return {
          ...mem,
          durableBackend: "partial",
          durableNote: `seat upsert error: ${sErr.message}`,
        };
      }
    }
    return {
      ...mem,
      durableBackend: "postgres",
      durableNote: "Archetypes and seats upserted idempotently",
    };
  } catch (err) {
    return {
      ...mem,
      durableBackend: "memory",
      durableNote: err.message,
    };
  }
}
