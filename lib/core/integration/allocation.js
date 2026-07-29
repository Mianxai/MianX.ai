/**
 * Objective-aware deterministic agent allocation for Founder Proof plans.
 * Never activates all 36. Prefer capability-relevant roles with explainable reasons.
 */

import { listActiveAgentDefinitions, isAgentExecutable } from "../agents.js";
import { uid, nowIso } from "./schemas.js";

const ONBOARDING_PREFERRED = Object.freeze([
  {
    slug: "executive-ceo",
    reason: "Executive Orchestrator — hierarchical delegation anchor for the Founder Proof.",
  },
  {
    slug: "hr-workforce-planner",
    reason: "Owns employee lifecycle and onboarding policy design.",
  },
  {
    slug: "platform-security",
    reason: "Reviews identity, least privilege, and access revocation controls.",
  },
  {
    slug: "security-review",
    reason: "Platform Security Reviewer — identity and access control evidence review.",
  },
  {
    slug: "ops-coordinator",
    reason: "Coordinates onboarding operations and provisioning runbooks.",
  },
  {
    slug: "qa-review",
    reason: "QA Review Agent — verifies evidence completeness for the proof pack.",
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

function objectiveText(planning_plan, template_plan) {
  return [
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

export function allocateAgentsForPlan({
  planning_plan = null,
  template_plan = null,
  project_id = null,
  integration_run_id = null,
  max_agents = 8,
} = {}) {
  const executable = listActiveAgentDefinitions().filter(isAgentExecutable);
  const bySlug = new Map(executable.map((a) => [a.slug, a]));

  const selected = [];
  const reasons = [];
  const text = objectiveText(planning_plan, template_plan);
  const onboarding = isOnboardingObjective(text);

  function add(slug, reason) {
    if (!bySlug.has(slug)) return false;
    if (selected.includes(slug)) return true;
    if (selected.length >= max_agents) return false;
    selected.push(slug);
    reasons.push({ slug, selected: true, reason });
    return true;
  }

  // Template / capability candidates first (when present and relevant)
  const mapped =
    template_plan?.agent_map?.agents ||
    template_plan?.agent_map?.department_agents ||
    template_plan?.agents ||
    planning_plan?.capability_plan?.agent_candidates ||
    planning_plan?.capability_plan?.executable_agents ||
    [];

  const flatMapped = Array.isArray(mapped)
    ? mapped
    : typeof mapped === "object" && mapped
      ? Object.values(mapped).flat()
      : [];

  for (const item of flatMapped) {
    const slug = typeof item === "string" ? item : item?.slug;
    if (!slug || !bySlug.has(slug)) continue;
    if (DISCOURAGED_WITHOUT_REASON.has(slug) && onboarding) continue;
    add(slug, item?.reason || "capability_or_template_match");
  }

  if (onboarding) {
    for (const pref of ONBOARDING_PREFERRED) {
      add(pref.slug, pref.reason);
      if (selected.length >= 5) break;
    }
  } else if (bySlug.has("executive-ceo")) {
    add("executive-ceo", "hierarchical_delegation_anchor");
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
    if (head) add(head.slug, `department_ownership:${deptSlug}`);
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
      add(a.slug, "minimum_simulation_coverage_specialist");
      if (selected.length >= 5) break;
    }
  }

  const rejected = executable
    .filter((a) => !selected.includes(a.slug))
    .map((a) => ({
      slug: a.slug,
      selected: false,
      reason: DISCOURAGED_WITHOUT_REASON.has(a.slug)
        ? "not_objective_relevant"
        : "not_required_by_approved_plan",
    }));

  return {
    id: uid("alloc"),
    integration_run_id,
    project_id,
    selected_agents: selected.map((slug) => {
      const a = bySlug.get(slug);
      const reason =
        reasons.find((r) => r.slug === slug)?.reason || "proposed_for_simulation";
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
