/**
 * Reusable intent → department resolver for Founder Proof WBS ownership.
 * Prefer semantic task/objective intent over generic catalog defaults
 * (e.g. identity-access previously owned by "engineering").
 */

import { DEPARTMENT_DISPLAY, displayDepartment } from "./plan-metrics.js";

/** @typedef {{ primary: string, supporting?: string|null, reason: string }} DeptIntent */

const INTENT_RULES = Object.freeze([
  {
    id: "identity_access",
    test: (t) =>
      /\bidentity\b|\baccess\b|\bleast privilege\b|\bauthn?\b|\bauthz\b|\bprovision(ing)?\b|\brevocation\b|\bidp\b|\bidentity provider\b/.test(
        t
      ),
    primary: "security",
    supporting: "infrastructure",
    reason:
      "Identity and access controls are owned by Security, with Infrastructure support when an identity provider or access implementation is required.",
  },
  {
    id: "security_controls",
    test: (t) =>
      /\bsecurity control|\baccess governance|\bseparation of duties|\baudit(able)?\b|\bcontrol coverage\b/.test(
        t
      ),
    primary: "security",
    supporting: null,
    reason: "Security controls and access governance are owned by Security.",
  },
  {
    id: "operations_coordination",
    test: (t) =>
      /\boperational\b|\boperations?\b|\bhandoff|\brunbook|\breadiness\b|\bcoordination\b|\bprovisioning runbook\b/.test(
        t
      ),
    primary: "operations",
    supporting: null,
    reason: "Operational onboarding coordination is owned by Operations.",
  },
  {
    id: "verification_qa",
    test: (t) =>
      /\bverif|\bacceptance\b|\bqa\b|\bquality\b|\bevidence\b|\btest\b|\bcontrol coverage\b/.test(
        t
      ),
    primary: "qa",
    supporting: null,
    reason: "Verification and acceptance are owned by Quality Assurance.",
  },
  {
    id: "employee_lifecycle",
    test: (t) =>
      /\bemployee\b|\bhuman resources|\bhr\b|\borganisation\b|\borganization\b|\brole assignment\b|\bworkforce\b|\blifecycle\b|\boffboard|\bonboarding stages\b|\bonboarding policy\b/.test(
        t
      ),
    primary: "hr",
    supporting: null,
    reason:
      "Organisation and employee lifecycle management are owned by Human Resources.",
  },
  {
    id: "onboarding_hr_default",
    test: (t) => /\bonboard/.test(t),
    primary: "hr",
    supporting: null,
    reason:
      "Organisation and employee lifecycle management are owned by Human Resources.",
  },
  {
    id: "infrastructure_idp",
    test: (t) =>
      /\binfrastructure\b|\bidp\b|\bidentity provider\b|\bplatform implement/.test(t),
    primary: "infrastructure",
    supporting: "security",
    reason:
      "Infrastructure owns identity-provider implementation work when explicitly required; Security remains the control owner.",
  },
]);

/**
 * @param {object} task
 * @param {string} [objectiveText]
 * @returns {DeptIntent|null}
 */
export function resolveDepartmentIntent(task = {}, objectiveText = "") {
  const taskText = [
    task.title,
    task.name,
    task.label,
    task.purpose,
    task.description,
    task.summary,
    task.capability,
    task.capability_slug,
    task.payload?.capability,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  for (const rule of INTENT_RULES) {
    if (taskText && rule.test(taskText)) {
      return {
        primary: rule.primary,
        supporting: rule.supporting,
        reason: rule.reason,
        rule_id: rule.id,
      };
    }
  }

  // Objective text is only a fallback when the task itself has no clear intent.
  const obj = String(objectiveText || "").toLowerCase();
  if (obj) {
    for (const rule of INTENT_RULES) {
      if (rule.test(obj)) {
        return {
          primary: rule.primary,
          supporting: rule.supporting,
          reason: rule.reason,
          rule_id: rule.id,
        };
      }
    }
  }
  return null;
}

/**
 * Resolve a Founder-facing department label for a task.
 * Overrides generic "engineering" when a stronger intent match exists.
 */
export function resolveTaskDepartment(task = {}, index = 0, { objectiveText = "" } = {}) {
  const intent = resolveDepartmentIntent(task, objectiveText);
  const fromPayload =
    task.department ||
    task.owning_department ||
    task.owner_department ||
    task.payload?.department ||
    task.payload?.owning_department;
  const mapped = displayDepartment(fromPayload);

  if (intent) {
    const primaryLabel = displayDepartment(intent.primary) || intent.primary;
    // Prefer intent over generic engineering / unassigned / missing.
    if (
      !mapped ||
      mapped === "Engineering" ||
      mapped === "Unassigned" ||
      String(fromPayload || "").toLowerCase() === "engineering"
    ) {
      return {
        department: primaryLabel,
        supporting: intent.supporting
          ? displayDepartment(intent.supporting)
          : null,
        reason: intent.reason,
        source: "intent",
      };
    }
  }

  if (mapped) {
    return {
      department: mapped,
      supporting: null,
      reason: "Taken from planning payload department ownership.",
      source: "payload",
    };
  }

  const fallbacks = [
    "Security",
    "Human Resources",
    "Operations",
    "Quality Assurance",
  ];
  return {
    department: fallbacks[index % fallbacks.length],
    supporting: null,
    reason: "Deterministic round-robin ownership when no stronger intent matched.",
    source: "fallback",
  };
}

/**
 * Capability slug → owning department for catalog correction.
 */
export const CAPABILITY_OWNERSHIP_OVERRIDES = Object.freeze({
  "identity-access": "security",
  "organisation-management": "hr",
  security: "security",
  operations: "operations",
});

export function resolveCapabilityOwningDepartment(capabilitySlug, current) {
  const key = String(capabilitySlug || "").toLowerCase();
  if (CAPABILITY_OWNERSHIP_OVERRIDES[key]) return CAPABILITY_OWNERSHIP_OVERRIDES[key];
  if (current && String(current).toLowerCase() !== "engineering") return current;
  return current || "operations";
}

export { DEPARTMENT_DISPLAY, displayDepartment };
