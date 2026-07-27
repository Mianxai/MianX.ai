import { describe, it, expect } from "vitest";
import {
  PLANNED_ROLE_SLOT_TOTAL,
  HISTORICAL_MINIMUM_CLAIM,
  DEPARTMENTS,
  listDepartments,
  departmentSlotTotal,
  WORKFORCE_DEFINITIONS,
  listDefinitions,
  plannedSlotContribution,
  namedDefinitionCount,
  capacityReserveSlotTotal,
  detectHierarchyCycles,
  assertValidHierarchy,
  hierarchySummary,
  ACTIVATION_MODEL,
  SAFETY_POLICY,
  isInstantiable,
  listWaves,
  computeReconciliation,
  validateWorkforceRegistry,
  getDefinition,
} from "./index";

describe("workforce canonical registry", () => {
  it("keeps all 20 departments and a locked 445 slot total", () => {
    expect(listDepartments()).toHaveLength(20);
    expect(departmentSlotTotal()).toBe(PLANNED_ROLE_SLOT_TOTAL);
    expect(PLANNED_ROLE_SLOT_TOTAL).toBe(445);
  });

  it("registry slot contribution cannot silently drift from 445", () => {
    expect(plannedSlotContribution()).toBe(445);
  });

  it("passes structural validation", () => {
    const result = validateWorkforceRegistry();
    expect(result.errors).toEqual([]);
    expect(result.ok).toBe(true);
  });

  it("enforces unique slugs and ids", () => {
    const slugs = WORKFORCE_DEFINITIONS.map((d) => d.slug);
    const ids = WORKFORCE_DEFINITIONS.map((d) => d.id);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has no hierarchy cycles and no self-reporting", () => {
    expect(detectHierarchyCycles()).toEqual([]);
    expect(() => assertValidHierarchy()).not.toThrow();
    for (const d of WORKFORCE_DEFINITIONS) {
      if (d.roleType === "capacity_reserve") continue;
      expect(d.reportsTo).not.toBe(d.slug);
      expect(d.canSelfApprove).toBe(false);
    }
  });

  it("rejects capacity reserves as instantiable personas", () => {
    const reserves = listDefinitions({ includeCapacityReserves: true }).filter(
      (d) => d.roleType === "capacity_reserve"
    );
    expect(reserves.length).toBeGreaterThan(0);
    for (const r of reserves) {
      expect(isInstantiable(r)).toBe(false);
      expect(r.allowedCapabilities).toEqual([]);
    }
  });

  it("reconciles 258+ vs 445 without collapsing them", () => {
    const r = computeReconciliation();
    expect(HISTORICAL_MINIMUM_CLAIM).toBe("258+");
    expect(r.rawPlannedWorkforceCount).toBe(445);
    expect(r.answers.is258EarlierBaseline).toBe(true);
    expect(r.answers.is445NewerCompleteDepartmentRoleInventory).toBe(true);
    expect(r.answers.doCountsRepresentCapacitySlots).toBe(true);
    expect(r.namedUniqueDefinitions).toBe(namedDefinitionCount());
    expect(r.capacityReserveSlots).toBe(capacityReserveSlotTotal());
    expect(r.activeMinimumWorkforce).toBe(3);
    expect(r.namedSlotCoverage + r.capacityReserveSlots).toBe(445);
    expect(r.deduplicatedCanonicalCount).toBeLessThan(r.rawPlannedWorkforceCount);
  });

  it("links wave-0 runtime agents without consuming planning slots", () => {
    const li = getDefinition("runtime.lead-intelligence");
    expect(li.runtimeSlug).toBe("lead-intelligence");
    expect(li.capacitySlots).toBe(0);
    expect(li.lifecycleStatus).toBe("active");
  });

  it("defines implementation waves 0–6", () => {
    const waves = listWaves();
    expect(waves.map((w) => w.id)).toEqual([
      "wave-0",
      "wave-1",
      "wave-2",
      "wave-3",
      "wave-4",
      "wave-5",
      "wave-6",
    ]);
    expect(waves[0].agents).toEqual(["lead-intelligence", "research", "qa-review"]);
  });

  it("documents activation model and safety policy", () => {
    expect(ACTIVATION_MODEL.flow.length).toBeGreaterThan(5);
    expect(SAFETY_POLICY.agentsMustNot).toContain("approve their own protected action");
    expect(hierarchySummary().levels[0]).toBe("L0");
  });

  it("flags engineering-qa vs qa department overlap in reconciliation", () => {
    const r = computeReconciliation();
    expect(r.overlaps.some((o) => o.id === "engineering-qa-vs-qa-department")).toBe(true);
    expect(r.missingNamedInventories.length).toBe(
      DEPARTMENTS.filter((d) => d.inventoryCompleteness === "capacity_only").length
    );
  });
});
