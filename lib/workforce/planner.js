// Workforce Planner — selects a minimal project activation pod from the
// canonical registry. Never instantiates the full 445 planned role slots.

import { listDepartments, getDepartment } from "./departments";
import { listDefinitions } from "./definitions";
import {
  ACTIVATION_MODEL,
  SAFETY_POLICY,
  isInstantiable,
} from "./activation";
import { isProtectedAction, approvalCapabilityForAction } from "@/lib/core/executive/policy";
import { clip } from "@/lib/core/validate";

const RISK_RANK = { R1: 1, R2: 2, R3: 3, R4: 4 };

/** Department → preferred canonical + runtime slugs for minimum pods. */
const DEPARTMENT_POD_HINTS = {
  leadership: {
    canonical: ["mianx.ceo.v1"],
    runtime: ["executive-ceo"],
  },
  engineering: {
    canonical: ["engineering.senior-backend", "engineering.backend"],
    runtime: ["delivery-engineer", "coding-executor"],
  },
  product: {
    canonical: ["product.delivery-owner"],
    runtime: ["delivery-product"],
  },
  qa: {
    canonical: ["qa.release-verifier", "runtime.qa-review"],
    runtime: ["delivery-qa", "qa-review"],
  },
  security: {
    canonical: ["security.engineer", "mianx.ciso.v1"],
    runtime: ["platform-security", "executive-ciso"],
  },
  devops: {
    canonical: ["devops.cicd"],
    runtime: ["platform-devops"],
  },
  infrastructure: {
    canonical: ["infrastructure.planner"],
    runtime: ["platform-infra"],
  },
  "data-ai": {
    canonical: ["data-ai.governance"],
    runtime: ["platform-data-ai"],
  },
  sales: {
    canonical: ["sales.opportunity", "runtime.lead-intelligence"],
    runtime: ["sales-opportunity", "lead-intelligence"],
  },
  marketing: {
    canonical: ["marketing.planner", "mianx.cmo.v1"],
    runtime: ["marketing-planner"],
  },
  seo: {
    canonical: ["seo.analyst"],
    runtime: ["seo-analyst"],
  },
  "customer-success": {
    canonical: ["customer-success.advisor"],
    runtime: ["customer-success-advisor"],
  },
  research: {
    canonical: ["runtime.research"],
    runtime: ["research"],
  },
  operations: {
    canonical: ["operations.coordinator", "mianx.coo.v1"],
    runtime: ["ops-coordinator"],
  },
  support: {
    canonical: ["support.triage"],
    runtime: ["support-triage"],
  },
  analytics: {
    canonical: ["analytics.reporter"],
    runtime: ["analytics-reporter"],
  },
  finance: {
    canonical: ["finance.advisor", "mianx.cfo.v1"],
    runtime: ["finance-advisor"],
  },
  hr: {
    canonical: ["hr.workforce-planner", "mianx.chro.v1"],
    runtime: ["hr-workforce-planner"],
  },
  legal: {
    canonical: ["legal.risk-advisor", "mianx.clo.v1"],
    runtime: ["legal-risk-advisor"],
  },
  growth: {
    canonical: ["sales.opportunity", "marketing.planner", "runtime.lead-intelligence"],
    runtime: ["sales-opportunity", "marketing-planner", "lead-intelligence"],
  },
};

function normalizeRisk(riskClass) {
  const r = String(riskClass || "R2").toUpperCase();
  return RISK_RANK[r] ? r : "R2";
}

function maxRisk(a, b) {
  return (RISK_RANK[a] || 0) >= (RISK_RANK[b] || 0) ? a : b;
}

function resolveDepartments(departmentsNeeded, objective, projectProfile) {
  const known = new Set(listDepartments().map((d) => d.slug));
  const out = new Set();

  for (const d of departmentsNeeded || []) {
    const slug = String(d || "")
      .trim()
      .toLowerCase();
    if (slug === "growth") {
      out.add("sales");
      out.add("marketing");
      continue;
    }
    if (known.has(slug)) out.add(slug);
  }

  const text = String(objective || "").toLowerCase();
  if (/\b(incident|outage|sev[1-4]|on-?call)\b/.test(text)) {
    out.add("operations");
    out.add("devops");
    out.add("security");
  }
  if (/\b(software|code|ship|release|platform|delivery)\b/.test(text)) {
    out.add("product");
    out.add("engineering");
    out.add("qa");
  }
  if (/\b(lead|sales|pipeline|gtm|growth)\b/.test(text)) {
    out.add("sales");
    out.add("marketing");
  }

  const profile = ACTIVATION_MODEL.projectProfiles[projectProfile];
  if (profile && out.size === 0) {
    out.add("leadership");
    out.add("engineering");
    out.add("product");
  }

  if (out.size === 0) out.add("leadership");
  return [...out];
}

function pickInstantiableBySlug(slug, bySlug) {
  const def = bySlug.get(slug);
  if (!def || !isInstantiable(def)) return null;
  return def;
}

function preferredClassFor(def, projectProfile) {
  const profile = ACTIVATION_MODEL.projectProfiles[projectProfile];
  const preferred = profile?.preferredClasses || ["project_dedicated", "shared", "ephemeral"];
  if (def.activationClass && preferred.includes(def.activationClass)) {
    return def.activationClass;
  }
  if (def.activationClass === "approval_only") return "approval_only";
  return preferred[0] || def.activationClass || "ephemeral";
}

/**
 * Plan a minimal workforce activation for a project objective.
 * Projects must NOT instantiate the full 445 planned role slots.
 *
 * @param {object} args
 * @param {string} args.objective
 * @param {string[]} [args.departmentsNeeded]
 * @param {string} [args.riskClass]
 * @param {string|null} [args.proposedAction]
 * @param {string} [args.projectProfile] key of ACTIVATION_MODEL.projectProfiles
 */
export function planWorkforceActivation({
  objective,
  departmentsNeeded = [],
  riskClass = "R2",
  proposedAction = null,
  projectProfile = "mianx-core",
} = {}) {
  const objectiveText = clip(objective || "", 8000);
  const requiredDepartments = resolveDepartments(
    departmentsNeeded,
    objectiveText,
    projectProfile
  );

  const allDefs = listDefinitions({ includeCapacityReserves: true });
  const bySlug = new Map(allDefs.map((d) => [d.slug, d]));
  const byDept = new Map();
  for (const d of allDefs) {
    if (!isInstantiable(d)) continue;
    if (!byDept.has(d.department)) byDept.set(d.department, []);
    byDept.get(d.department).push(d);
  }

  const requiredCanonicalDefinitions = [];
  const requiredRuntimeAgents = [];
  const activationClasses = {};
  const dependencies = [];
  const approvalBoundaries = new Set([...SAFETY_POLICY.protectedActionsRequire]);

  let effectiveRisk = normalizeRisk(riskClass);

  for (const deptSlug of requiredDepartments) {
    const dept = getDepartment(deptSlug);
    if (dept) {
      for (const boundary of dept.humanApprovalBoundaries || []) {
        approvalBoundaries.add(boundary);
      }
      for (const up of dept.upstreamDepartments || []) {
        if (requiredDepartments.includes(up)) {
          dependencies.push({ from: up, to: deptSlug, kind: "department" });
        }
      }
    }

    const hints = DEPARTMENT_POD_HINTS[deptSlug] || { canonical: [], runtime: [] };
    let picked = 0;
    for (const slug of hints.canonical) {
      const def = pickInstantiableBySlug(slug, bySlug);
      if (!def) continue;
      if (!requiredCanonicalDefinitions.includes(def.slug)) {
        requiredCanonicalDefinitions.push(def.slug);
        activationClasses[def.slug] = preferredClassFor(def, projectProfile);
        effectiveRisk = maxRisk(effectiveRisk, normalizeRisk(def.riskClass));
        picked += 1;
      }
    }
    // Fallback: first instantiable named role in the department (never capacity_reserve).
    if (picked === 0) {
      const candidates = (byDept.get(deptSlug) || []).filter(
        (d) => d.roleType !== "capacity_reserve" && isInstantiable(d)
      );
      const first = candidates[0];
      if (first && !requiredCanonicalDefinitions.includes(first.slug)) {
        requiredCanonicalDefinitions.push(first.slug);
        activationClasses[first.slug] = preferredClassFor(first, projectProfile);
        effectiveRisk = maxRisk(effectiveRisk, normalizeRisk(first.riskClass));
      }
    }
    for (const runtime of hints.runtime) {
      if (runtime && !requiredRuntimeAgents.includes(runtime)) {
        requiredRuntimeAgents.push(runtime);
      }
    }
  }

  // Always include leadership CEO for enterprise coordination when >1 dept.
  if (requiredDepartments.length > 1) {
    const ceo = pickInstantiableBySlug("mianx.ceo.v1", bySlug);
    if (ceo && !requiredCanonicalDefinitions.includes(ceo.slug)) {
      requiredCanonicalDefinitions.unshift(ceo.slug);
      activationClasses[ceo.slug] = preferredClassFor(ceo, projectProfile);
    }
    if (!requiredRuntimeAgents.includes("executive-ceo")) {
      requiredRuntimeAgents.unshift("executive-ceo");
    }
  }

  const action = proposedAction ? clip(proposedAction, 100) : null;
  if (isProtectedAction(action)) {
    approvalBoundaries.add(approvalCapabilityForAction(action) || action);
    effectiveRisk = maxRisk(effectiveRisk, "R4");
  }

  // Hard cap — never approach the full workforce.
  const MAX_PROJECT_INSTANCES = 24;
  const trimmedCanonical = requiredCanonicalDefinitions.slice(0, MAX_PROJECT_INSTANCES);
  const trimmedClasses = {};
  for (const slug of trimmedCanonical) {
    trimmedClasses[slug] = activationClasses[slug];
  }

  return {
    requiredDepartments,
    requiredCanonicalDefinitions: trimmedCanonical,
    requiredRuntimeAgents: requiredRuntimeAgents.slice(0, MAX_PROJECT_INSTANCES),
    activationClasses: trimmedClasses,
    dependencies,
    riskClass: effectiveRisk,
    approvalBoundaries: [...approvalBoundaries],
    projectProfile,
    objective: objectiveText,
    note:
      "Projects must NOT instantiate the full 445 planned role slots. " +
      "Only instantiable definitions are activated; capacity_reserve is never activated.",
    forbiddenFullWorkforce: true,
    plannedSlotCeiling: MAX_PROJECT_INSTANCES,
    totalPlannedSlotsInRegistry: 445,
  };
}
