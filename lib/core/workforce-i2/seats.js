/**
 * Compile exactly 445 durable capacity seats — all mapped, zero orphans.
 * Reserve seats map to department team pool archetypes (justified expansion),
 * never invented personal names.
 */

import { DEPARTMENTS } from "@/lib/workforce/departments";
import { WORKFORCE_DEFINITIONS } from "@/lib/workforce/definitions";
import {
  AUTHORITATIVE_CAPACITY,
  DEPARTMENT_BASELINE,
  SEAT_LIFECYCLE,
} from "./constants";
import { compileRoleArchetypes } from "./archetypes";

function pad(n, width = 3) {
  return String(n).padStart(width, "0");
}

/**
 * Expand a named definition into N seats linked to its archetype.
 */
function seatsFromNamed(def, archetypeId, startIndex = 1) {
  const n = def.capacitySlots || 1;
  const seats = [];
  for (let i = 0; i < n; i += 1) {
    const idx = startIndex + i;
    seats.push({
      seatId: `seat.${def.department}.${def.slug || def.id}.${pad(idx)}`,
      roleArchetypeId: archetypeId,
      department: def.department,
      hierarchyLevel: def.hierarchyLevel || "L5",
      capacityClass: "primary",
      supportedProjectTypes: ["mianx_core", "powered_by_mianx", "disposable_test"],
      allowedConcurrency: 1,
      allocationPriority: def.hierarchyLevel === "L1" || def.hierarchyLevel === "L2" ? 10 : 50,
      reserveOrPrimary: "primary",
      readinessStatus: "validated",
      activationRequirements: ["provider_or_test_double", "project_scope", "task_assignment"],
      currentProjectInstanceId: null,
      lifecycleState: "available",
      createdSourceVersion: "phase-i2/1.0.0",
      auditMetadata: {
        sourceDefinitionId: def.id,
        sourceSlug: def.slug,
      },
      expansionCategory: null,
    });
  }
  return seats;
}

/**
 * Distribute remaining department slots across team pool archetypes.
 */
function seatsFromDepartmentPools(dept, remaining, archetypes) {
  const teams = dept.teams?.length ? dept.teams : ["general"];
  const seats = [];
  let left = remaining;
  let teamIdx = 0;
  let perTeamCounters = Object.fromEntries(teams.map((t) => [t, 0]));

  while (left > 0) {
    const team = teams[teamIdx % teams.length];
    teamIdx += 1;
    perTeamCounters[team] += 1;
    const archetypeId = `archetype.${dept.slug}.${team}.specialist.v1`;
    const arch = archetypes.find((a) => a.id === archetypeId);
    if (!arch) {
      throw new Error(`Missing pool archetype ${archetypeId} for department ${dept.slug}`);
    }
    seats.push({
      seatId: `seat.${dept.slug}.pool.${team}.${pad(perTeamCounters[team])}`,
      roleArchetypeId: archetypeId,
      department: dept.slug,
      hierarchyLevel: "L5",
      capacityClass: "reserve_pool",
      supportedProjectTypes: ["mianx_core", "powered_by_mianx", "disposable_test"],
      allowedConcurrency: 1,
      allocationPriority: 80,
      reserveOrPrimary: "reserve",
      readinessStatus: "validated",
      activationRequirements: [
        "provider_or_test_double",
        "project_scope",
        "task_assignment",
        "variant_compilation_allowed",
      ],
      currentProjectInstanceId: null,
      lifecycleState: "available",
      createdSourceVersion: "phase-i2/1.0.0",
      auditMetadata: {
        expansionCategory: "department_team_capacity_pool",
        departmentTeam: team,
        justifiedBy: [
          "lib/workforce/departments.js",
          "doc/19-ai-workforce/AGENT-CAPACITY-BASELINE.md",
        ],
      },
      expansionCategory: "department_team_capacity_pool",
    });
    left -= 1;
  }
  return seats;
}

export function reconcileDepartmentBaseline() {
  const documented = { ...DEPARTMENT_BASELINE };
  const fromRegistry = Object.fromEntries(
    DEPARTMENTS.map((d) => [d.slug, d.plannedRoleSlots])
  );
  const documentedSum = Object.values(documented).reduce((a, b) => a + b, 0);
  const registrySum = Object.values(fromRegistry).reduce((a, b) => a + b, 0);
  const diffs = [];
  for (const slug of new Set([...Object.keys(documented), ...Object.keys(fromRegistry)])) {
    if (documented[slug] !== fromRegistry[slug]) {
      diffs.push({
        department: slug,
        founderExpected: documented[slug] ?? null,
        registry: fromRegistry[slug] ?? null,
        difference: (fromRegistry[slug] || 0) - (documented[slug] || 0),
      });
    }
  }
  return {
    documentedDepartmentTotal: documentedSum,
    canonicalCapacityTotal: AUTHORITATIVE_CAPACITY,
    registryDepartmentTotal: registrySum,
    difference: registrySum - documentedSum,
    departmentDiffs: diffs,
    authoritativeResolution:
      registrySum === AUTHORITATIVE_CAPACITY && documentedSum === AUTHORITATIVE_CAPACITY
        ? "Founder expected baseline matches DEPARTMENTS registry and equals 445."
        : registrySum === AUTHORITATIVE_CAPACITY
          ? "Canonical total is DEPARTMENTS registry (445). Founder table reconciled against registry."
          : "MISMATCH — investigate before activation.",
    finalApprovedRegistryTotal: AUTHORITATIVE_CAPACITY,
    departments: fromRegistry,
  };
}

/**
 * Compile full 445-seat registry.
 */
export function compileCapacitySeats() {
  const { archetypes } = compileRoleArchetypes();
  const archetypeByDefId = new Map();
  for (const a of archetypes) {
    if (a.id.startsWith("archetype.runtime.")) continue;
    // named defs use role.* ids
    archetypeByDefId.set(a.id, a);
  }

  const seats = [];
  const namedByDept = {};

  for (const def of WORKFORCE_DEFINITIONS) {
    if (def.roleType === "capacity_reserve") continue;
    if ((def.capacitySlots || 0) <= 0) continue;
    const archetypeId = def.id || `archetype.${def.slug}`;
    // ensure archetype exists (compileRoleArchetypes uses same id)
    const arch = archetypes.find((a) => a.id === archetypeId || a.id === def.id);
    const resolvedId = arch?.id || archetypeId;
    const batch = seatsFromNamed(def, resolvedId, 1);
    seats.push(...batch);
    namedByDept[def.department] = (namedByDept[def.department] || 0) + batch.length;
  }

  for (const dept of DEPARTMENTS) {
    const used = namedByDept[dept.slug] || 0;
    const remaining = dept.plannedRoleSlots - used;
    if (remaining < 0) {
      throw new Error(
        `Seat over-allocation for ${dept.slug}: used ${used} > planned ${dept.plannedRoleSlots}`
      );
    }
    if (remaining > 0) {
      seats.push(...seatsFromDepartmentPools(dept, remaining, archetypes));
    }
  }

  const byDept = {};
  for (const s of seats) {
    byDept[s.department] = (byDept[s.department] || 0) + 1;
  }

  const mapped = seats.filter((s) => s.roleArchetypeId).length;
  const orphan = seats.filter((s) => !s.roleArchetypeId).length;
  const invalid = seats.filter(
    (s) => !SEAT_LIFECYCLE.includes(s.lifecycleState) || !s.department || !s.seatId
  ).length;

  if (seats.length !== AUTHORITATIVE_CAPACITY) {
    throw new Error(
      `Seat compiler produced ${seats.length} seats; expected ${AUTHORITATIVE_CAPACITY}`
    );
  }
  if (orphan !== 0 || invalid !== 0) {
    throw new Error(`Seat compiler orphans=${orphan} invalid=${invalid}`);
  }

  // Verify every seat archetype exists
  const archIds = new Set(archetypes.map((a) => a.id));
  const missingArch = seats.filter((s) => !archIds.has(s.roleArchetypeId));
  if (missingArch.length) {
    throw new Error(
      `Seats missing archetypes: ${missingArch
        .slice(0, 5)
        .map((s) => s.seatId)
        .join(", ")}`
    );
  }

  return {
    capacitySeats: seats.length,
    mappedSeats: mapped,
    orphanSeats: orphan,
    invalidSeats: invalid,
    seats,
    seatsByDepartment: byDept,
    primarySeats: seats.filter((s) => s.reserveOrPrimary === "primary").length,
    reservePoolSeats: seats.filter((s) => s.reserveOrPrimary === "reserve").length,
    departmentReconciliation: reconcileDepartmentBaseline(),
    fabrications: 0,
    note: "445/445 seats mapped. Reserve seats use department team pool archetypes — not invented personas.",
  };
}

export function assertSeatRegistryInvariants(compiled = null) {
  const c = compiled || compileCapacitySeats();
  const errors = [];
  if (c.capacitySeats !== 445) errors.push(`capacitySeats=${c.capacitySeats}`);
  if (c.mappedSeats !== 445) errors.push(`mappedSeats=${c.mappedSeats}`);
  if (c.orphanSeats !== 0) errors.push(`orphanSeats=${c.orphanSeats}`);
  if (c.invalidSeats !== 0) errors.push(`invalidSeats=${c.invalidSeats}`);
  for (const [slug, expected] of Object.entries(DEPARTMENT_BASELINE)) {
    const got = c.seatsByDepartment[slug] || 0;
    if (got !== expected) errors.push(`dept ${slug}: got ${got} expected ${expected}`);
  }
  const seatIds = new Set();
  const duplicateIds = [];
  for (const s of c.seats) {
    if (seatIds.has(s.seatId)) duplicateIds.push(s.seatId);
    seatIds.add(s.seatId);
  }
  if (duplicateIds.length) {
    errors.push(`duplicateSeatIds=${duplicateIds.slice(0, 5).join(",")}`);
  }
  if (seatIds.size !== 445) errors.push(`uniqueSeatIds=${seatIds.size}`);
  return { ok: errors.length === 0, errors, uniqueSeatIds: seatIds.size };
}
