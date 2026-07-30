/**
 * Objective-aware deterministic agent allocation for Founder Proof plans.
 * Never activates all 38. Prefer capability-relevant roles with explainable reasons.
 */

import { listActiveAgentDefinitions, isAgentExecutable } from "../agents.js";
import { uid, nowIso } from "./schemas.js";

const ONBOARDING_PREFERRED = Object.freeze([
  {
    slug: "executive-ceo",
    reason:
      "Executive Orchestrator — bounded orchestration and hierarchical delegation for the Founder Proof.",
  },
  {
    slug: "hr-workforce-planner",
    reason:
      "Owns employee lifecycle, onboarding stages, role assignment, and offboarding requirements.",
  },
  {
    slug: "platform-security",
    reason:
      "Reviews identity, least privilege, access approval, revocation, and separation-of-duties controls.",
  },
  {
    slug: "security-review",
    reason:
      "Platform Security Reviewer — identity and access control evidence review.",
  },
  {
    slug: "ops-coordinator",
    reason:
      "Coordinates onboarding handoffs, ownership, readiness, and operational verification.",
  },
  {
    slug: "qa-review",
    reason:
      "Verifies acceptance criteria, evidence completeness, and control coverage.",
  },
  {
    slug: "delivery-qa",
    reason: "Independent QA verification of onboarding workflow artefacts.",
  },
]);

const DISCOURAGED_WITHOUT_REASON = new Set([
  "lead-intelligence",
  "research",
  "follow-up-draft",
]);

function objectiveText(planning_plan, template_plan, options = {}) {
  return [
    options.objective_title,
    options.business_purpose,
    planning_plan?.objective?.title,
    planning_plan?.objective?.business_purpose,
    planning_plan?.objective_title,
    template_plan?.objective?.title,
    planning_plan?.payload?.objective,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function isOnboardingObjective(text) {
  return /onboard|employee|identity|access provision|hr workforce|secure internal/.test(
    text
  );
}

function isProductionProofContext(options = {}, planning_plan = null) {
  return Boolean(
    options.is_production_proof ||
      planning_plan?.objective?.is_production_proof ||
      planning_plan?.payload?.is_production_proof
  );
}

/**
 * Flatten agent map shapes from template / capability planners.
 */
export function flattenAgentCandidates(mapped) {
  if (Array.isArray(mapped)) return mapped;
  if (!mapped || typeof mapped !== "object") return [];
  if (Array.isArray(mapped.agents)) return mapped.agents;
  if (mapped.department_agents && typeof mapped.department_agents === "object") {
    return Object.values(mapped.department_agents).flat();
  }
  return Object.values(mapped).flat();
}

export function allocateAgentsForPlan({
  planning_plan = null,
  template_plan = null,
  project_id = null,
  integration_run_id = null,
  max_agents = 8,
  objective_title = null,
  business_purpose = null,
  is_production_proof = false,
} = {}) {
  const executable = listActiveAgentDefinitions().filter(isAgentExecutable);
  const bySlug = new Map(executable.map((a) => [a.slug, a]));

  const selected = [];
  const reasons = [];
  const text = objectiveText(planning_plan, template_plan, {
    objective_title,
    business_purpose,
  });
  const onboarding = isOnboardingObjective(text);
  const productionProof = isProductionProofContext(
    { is_production_proof },
    planning_plan
  );
  const strictExcludeDiscouraged = onboarding || productionProof;

  function add(slug, reason) {
    if (!bySlug.has(slug)) return false;
    if (selected.includes(slug)) return true;
    if (DISCOURAGED_WITHOUT_REASON.has(slug) && strictExcludeDiscouraged) {
      return false;
    }
    if (selected.length >= max_agents) return false;
    selected.push(slug);
    reasons.push({ slug, selected: true, reason });
    return true;
  }

  // Preferred onboarding / production-proof workforce first (executable only).
  if (onboarding || productionProof) {
    for (const pref of ONBOARDING_PREFERRED) {
      add(pref.slug, pref.reason);
      if (selected.length >= 5) break;
    }
  } else if (bySlug.has("executive-ceo")) {
    add(
      "executive-ceo",
      "Executive Orchestrator — bounded orchestration for the Founder Proof."
    );
  }

  // Template / capability candidates (never re-introduce discouraged fillers).
  const mapped =
    template_plan?.agent_map?.agents ||
    template_plan?.agent_map?.department_agents ||
    template_plan?.agents ||
    planning_plan?.capability_plan?.agent_candidates ||
    planning_plan?.capability_plan?.executable_agents ||
    planning_plan?.capability_plan?.department_agents ||
    [];

  for (const item of flattenAgentCandidates(mapped)) {
    const slug = typeof item === "string" ? item : item?.slug;
    if (!slug || !bySlug.has(slug)) continue;
    if (DISCOURAGED_WITHOUT_REASON.has(slug) && strictExcludeDiscouraged) continue;
    add(
      slug,
      item?.reason ||
        "Matched from capability or template ownership for this objective."
    );
  }

  // Department ownership heads (skip discouraged fillers)
  const depts =
    planning_plan?.capability_plan?.department_ownership ||
    planning_plan?.departments ||
    template_plan?.departments ||
    [];

  for (const d of depts) {
    const deptSlug = typeof d === "string" ? d : d?.slug || d?.department;
    const head = executable.find(
      (a) =>
        (a.department === deptSlug ||
          a.department_slug === deptSlug ||
          a.workforceSlug?.startsWith?.(`${deptSlug}.`)) &&
        /head|lead|director|manager|ceo|cto|cfo|coo|chro|ciso|coordinator|planner|security|qa/i.test(
          `${a.slug} ${a.name || ""} ${a.role || ""}`
        ) &&
        !DISCOURAGED_WITHOUT_REASON.has(a.slug)
    );
    if (head) {
      add(
        head.slug,
        `Department ownership head for ${deptSlug} based on objective responsibilities.`
      );
    }
  }

  // Minimal coverage without lead-intelligence / research fillers
  if (selected.length < 3) {
    const specialists = executable.filter(
      (a) =>
        !selected.includes(a.slug) &&
        !DISCOURAGED_WITHOUT_REASON.has(a.slug) &&
        /security|ops|qa|hr|platform|coordinator|planner|review/i.test(a.slug)
    );
    for (const a of specialists) {
      add(
        a.slug,
        "Minimum specialist coverage for deterministic simulation responsibilities."
      );
      if (selected.length >= 5) break;
    }
  }

  const rejected = executable
    .filter((a) => !selected.includes(a.slug))
    .map((a) => ({
      slug: a.slug,
      selected: false,
      reason: DISCOURAGED_WITHOUT_REASON.has(a.slug)
        ? "Not objective-relevant for secure employee onboarding (excluded)."
        : "Not required by the approved deterministic plan.",
    }));

  return {
    id: uid("alloc"),
    integration_run_id,
    project_id,
    selected_agents: selected.map((slug) => {
      const a = bySlug.get(slug);
      const reason =
        reasons.find((r) => r.slug === slug)?.reason ||
        "Selected for deterministic simulation coverage.";
      return {
        slug,
        role: a?.name || a?.role || slug,
        department: a?.department || a?.department_slug || null,
        capabilities: a?.allowedCapabilities || [],
        reason,
        status: "proposed",
      };
    }),
    rejected_agents: rejected,
    selection_reasons: reasons.filter((r) => selected.includes(r.slug)),
    activated_all_36: false,
    count: selected.length,
    created_at: nowIso(),
  };
}
