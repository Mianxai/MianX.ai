// Structural validation for the canonical workforce registry.

import {
  AI_HIERARCHY_LEVELS,
  LIFECYCLE_STATUSES,
  PLANNED_ROLE_SLOT_TOTAL,
  PROTECTED_WORKFORCE_CAPABILITIES,
  ROLE_TYPES,
  WORKFORCE_CAPABILITIES,
} from "./constants";
import { DEPARTMENTS, assertDepartmentSlotTotal, getDepartment } from "./departments";
import { WORKFORCE_DEFINITIONS, plannedSlotContribution } from "./definitions";
import { assertValidHierarchy } from "./hierarchy";
import { isInstantiable } from "./activation";

export function validateWorkforceRegistry(definitions = WORKFORCE_DEFINITIONS) {
  const errors = [];

  try {
    assertDepartmentSlotTotal();
  } catch (err) {
    errors.push(err.message);
  }

  if (DEPARTMENTS.length !== 20) {
    errors.push(`Expected 20 departments, found ${DEPARTMENTS.length}`);
  }

  const deptSlugs = new Set();
  for (const d of DEPARTMENTS) {
    if (deptSlugs.has(d.slug)) errors.push(`Duplicate department slug: ${d.slug}`);
    deptSlugs.add(d.slug);
  }

  const slugs = new Set();
  const ids = new Set();

  for (const def of definitions) {
    if (!def.slug) errors.push("Definition missing slug");
    if (!def.id) errors.push(`Definition ${def.slug} missing id`);
    if (slugs.has(def.slug)) errors.push(`Duplicate slug: ${def.slug}`);
    slugs.add(def.slug);
    if (ids.has(def.id)) errors.push(`Duplicate id: ${def.id}`);
    ids.add(def.id);

    if (!getDepartment(def.department)) {
      errors.push(`Unknown department on ${def.slug}: ${def.department}`);
    }
    if (!ROLE_TYPES.includes(def.roleType)) {
      errors.push(`Invalid roleType on ${def.slug}: ${def.roleType}`);
    }
    if (!AI_HIERARCHY_LEVELS.includes(def.hierarchyLevel)) {
      errors.push(`Invalid hierarchyLevel on ${def.slug}`);
    }
    if (!LIFECYCLE_STATUSES.includes(def.lifecycleStatus)) {
      errors.push(`Invalid lifecycleStatus on ${def.slug}`);
    }
    if (typeof def.capacitySlots !== "number" || def.capacitySlots < 0) {
      errors.push(`Invalid capacitySlots on ${def.slug}`);
    }
    if (def.canSelfApprove === true) {
      errors.push(`canSelfApprove must be false: ${def.slug}`);
    }
    if (def.canApprove === true && PROTECTED_WORKFORCE_CAPABILITIES.some((c) =>
      (def.allowedCapabilities || []).includes(c)
    )) {
      errors.push(`Protected capability with canApprove on ${def.slug}`);
    }

    const allowed = new Set(def.allowedCapabilities || []);
    const prohibited = new Set(def.prohibitedCapabilities || []);
    for (const c of allowed) {
      if (!WORKFORCE_CAPABILITIES.includes(c)) {
        errors.push(`Unknown allowed capability "${c}" on ${def.slug}`);
      }
      if (prohibited.has(c)) {
        errors.push(`Capability both allowed and prohibited on ${def.slug}: ${c}`);
      }
    }
    for (const c of prohibited) {
      if (!WORKFORCE_CAPABILITIES.includes(c)) {
        errors.push(`Unknown prohibited capability "${c}" on ${def.slug}`);
      }
    }

    if (def.roleType === "capacity_reserve") {
      if (isInstantiable(def)) {
        errors.push(`capacity_reserve must not be instantiable: ${def.slug}`);
      }
      if ((def.allowedCapabilities || []).length > 0) {
        errors.push(`capacity_reserve must have empty allowedCapabilities: ${def.slug}`);
      }
    }
  }

  // Per-department slot coverage (excluding runtime links with 0 slots)
  for (const dept of DEPARTMENTS) {
    const covered = definitions
      .filter((d) => d.department === dept.slug)
      .reduce((s, d) => s + (d.capacitySlots || 0), 0);
    if (covered !== dept.plannedRoleSlots) {
      errors.push(
        `Department ${dept.slug} coverage ${covered} !== planned ${dept.plannedRoleSlots}`
      );
    }
  }

  const contrib = plannedSlotContribution();
  if (contrib !== PLANNED_ROLE_SLOT_TOTAL) {
    errors.push(
      `Registry slot contribution ${contrib} silently drifted from declared ${PLANNED_ROLE_SLOT_TOTAL}`
    );
  }

  try {
    assertValidHierarchy(definitions);
  } catch (err) {
    errors.push(err.message);
  }

  // reportsTo must exist (founder or another definition slug), except capacity reserves
  const reportTargets = new Set(["founder", ...slugs]);
  for (const def of definitions) {
    if (def.roleType === "capacity_reserve") continue;
    if (!def.reportsTo || !reportTargets.has(def.reportsTo)) {
      errors.push(`Invalid reportsTo on ${def.slug}: ${def.reportsTo}`);
    }
  }

  return {
    ok: errors.length === 0,
    errors,
    stats: {
      departments: DEPARTMENTS.length,
      definitions: definitions.length,
      plannedSlots: PLANNED_ROLE_SLOT_TOTAL,
      slotContribution: contrib,
    },
  };
}
