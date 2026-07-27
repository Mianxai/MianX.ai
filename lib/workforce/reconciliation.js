// Evidence-backed count reconciliation (does not rewrite historical doc/).

import { HISTORICAL_MINIMUM_CLAIM, PLANNED_ROLE_SLOT_TOTAL } from "./constants";
import { DEPARTMENTS, departmentSlotTotal } from "./departments";
import {
  capacityReserveSlotTotal,
  namedDefinitionCount,
  plannedSlotContribution,
  WORKFORCE_DEFINITIONS,
} from "./definitions";

export const RECONCILIATION = {
  sources: {
    historical258Plus: {
      value: HISTORICAL_MINIMUM_CLAIM,
      files: [
        "doc/20-ai-operating-system/MASTER-BLUEPRINT.md §14",
        "doc/19-ai-workforce/AGENT-CAPACITY-BASELINE.md §7",
      ],
      meaning:
        "Historical minimum AI workforce planning aspiration / earlier phase claim. Not a verified active-agent count.",
      isEarlierBaseline: true,
    },
    departmentAllocation445: {
      value: PLANNED_ROLE_SLOT_TOTAL,
      files: [
        "doc/19-ai-workforce/AGENT-CAPACITY-BASELINE.md §6",
        "doc/20-ai-operating-system/MASTER-BLUEPRINT.md §13",
      ],
      meaning:
        "Arithmetic total of twenty department role-slot allocations. Organizational planning capacity, not continuous processes.",
      isCompleteDepartmentInventory: true,
      isCapacitySlotsNotUniqueAgents: true,
    },
    humanRoleDocuments247: {
      value: 247,
      files: ["doc/19-ai-workforce/AGENT-CAPACITY-BASELINE.md §4.1"],
      meaning: "Populated human/org role Markdown documents under docs/05-workforce/roles/ — not AI agents.",
    },
  },
  answers: {
    is258EarlierBaseline: true,
    is445NewerCompleteDepartmentRoleInventory: true,
    doCountsRepresentCapacitySlots: true,
    noteOnDuplicates:
      "Engineering includes embedded QA (8 slots) while an independent QA department has 18 slots — intentional separation of duties, not double-counting of the same instances. C-Suite directors (e.g. CPO) sit in Leadership (11); department leads referenced in tables are executive owners, not extra Leadership slots.",
    noteOnManagersDirectors:
      "Named L3 department directors are largely absent from the 445 arithmetic breakdown except where executive L2 owners are listed in Leadership. Engineering's VP Engineering is referenced as lead but not named inside the 78 specialist slots — CTO owns until an L3 definition is approved without silently inflating 445.",
  },
};

export function computeReconciliation() {
  const deptTotal = departmentSlotTotal();
  const slotContribution = plannedSlotContribution();
  const named = namedDefinitionCount();
  const reserveSlots = capacityReserveSlotTotal();
  const namedSlots = WORKFORCE_DEFINITIONS.filter(
    (d) => d.roleType !== "capacity_reserve" && !d.runtimeSlug
  ).reduce((s, d) => s + d.capacitySlots, 0);

  return {
    rawPlannedWorkforceCount: PLANNED_ROLE_SLOT_TOTAL,
    departmentArithmeticTotal: deptTotal,
    registrySlotContribution: slotContribution,
    namedUniqueDefinitions: named,
    namedSlotCoverage: namedSlots,
    capacityReserveSlots: reserveSlots,
    deduplicatedCanonicalCount: named, // unique named role definitions (not slot multiplicity)
    maximumDefinitionCapacity: PLANNED_ROLE_SLOT_TOTAL,
    activeMinimumWorkforce: 3, // wave-0 runtime agents currently executable
    runtimeLinkedDefinitions: WORKFORCE_DEFINITIONS.filter((d) => d.runtimeSlug).length,
    departments: DEPARTMENTS.length,
    inventoryCompleteness: {
      named: DEPARTMENTS.filter((d) => d.inventoryCompleteness === "named").map((d) => d.slug),
      capacity_only: DEPARTMENTS.filter((d) => d.inventoryCompleteness === "capacity_only").map(
        (d) => d.slug
      ),
    },
    overlaps: [
      {
        id: "engineering-qa-vs-qa-department",
        severity: "medium",
        detail:
          "Engineering QA (8 slots) vs independent QA department (18 slots). Keep release-gate authority in QA department; engineering QA cannot self-approve production.",
      },
      {
        id: "c-suite-vs-department-leads",
        severity: "low",
        detail:
          "C-Suite executives in Leadership own departments; do not create duplicate L2 personas inside each department.",
      },
    ],
    missingNamedInventories: DEPARTMENTS.filter((d) => d.inventoryCompleteness === "capacity_only").map(
      (d) => ({ department: d.slug, slots: d.plannedRoleSlots })
    ),
    sources: RECONCILIATION.sources,
    answers: RECONCILIATION.answers,
  };
}
