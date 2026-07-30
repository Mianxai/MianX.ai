/**
 * Phase I hierarchical delegation — Founder → CEO → C-Suite → managers → execution → QA.
 */

import { getAgentDefinition, isAgentExecutable } from "../agents";
import { canDelegate as canDelegateWave1, detectDelegationCycles } from "../executive/delegation";
import { forbidden, validationError } from "../errors";

export const MAX_DELEGATION_DEPTH = 5;

export const HIERARCHY_BANDS = Object.freeze({
  founder: 0,
  ceo: 1,
  csuite: 2,
  manager: 3,
  execution: 4,
  specialist_qa: 5,
});

const CSUITE = new Set([
  "executive-cto",
  "executive-cpo",
  "executive-ciso",
  "executive-coo",
  "executive-cmo",
  "executive-cfo",
  "executive-chro",
  "executive-cso",
  "executive-clo",
  "executive-chief-scientist",
]);

const MANAGERS = new Set(["ops-coordinator", "delivery-product", "hr-workforce-planner"]);

const QA = new Set(["qa-review", "delivery-qa", "delivery-review", "design-reviewer", "release-readiness"]);

export function hierarchyBand(slug) {
  if (!slug || slug === "founder") return HIERARCHY_BANDS.founder;
  if (slug === "executive-ceo") return HIERARCHY_BANDS.ceo;
  if (CSUITE.has(slug)) return HIERARCHY_BANDS.csuite;
  if (MANAGERS.has(slug)) return HIERARCHY_BANDS.manager;
  if (QA.has(slug)) return HIERARCHY_BANDS.specialist_qa;
  return HIERARCHY_BANDS.execution;
}

export function buildHierarchyGraph() {
  return {
    founder: ["executive-ceo"],
    "executive-ceo": [...CSUITE],
    ...Object.fromEntries([...CSUITE].map((s) => [s, [...MANAGERS]])),
    "ops-coordinator": ["support-triage", "analytics-reporter"],
    "delivery-product": [
      "delivery-architect",
      "delivery-engineer",
      "coding-executor",
      "research",
    ],
    "delivery-architect": ["delivery-engineer", "coding-executor"],
    "delivery-engineer": ["delivery-review", "delivery-qa"],
    "delivery-review": ["delivery-qa", "qa-review"],
    "platform-security": ["qa-review", "release-readiness"],
  };
}

export function canDelegateHierarchical(parentSlug, childSlug, { depth = 0 } = {}) {
  if (!parentSlug || !childSlug) return false;
  if (parentSlug === childSlug) return false;
  if (childSlug === "founder") return false;
  if (depth >= MAX_DELEGATION_DEPTH) return false;

  const pb = hierarchyBand(parentSlug);
  const cb = hierarchyBand(childSlug);
  if (cb <= pb && parentSlug !== "executive-ceo") return false;
  if (parentSlug === "executive-ceo") {
    return CSUITE.has(childSlug) || canDelegateWave1(parentSlug, childSlug);
  }
  if (CSUITE.has(parentSlug)) {
    return MANAGERS.has(childSlug) || hierarchyBand(childSlug) >= HIERARCHY_BANDS.execution;
  }
  if (MANAGERS.has(parentSlug)) {
    return hierarchyBand(childSlug) >= HIERARCHY_BANDS.execution;
  }
  // Execution may hand to QA / specialist review, not peer self-approval.
  if (pb === HIERARCHY_BANDS.execution) {
    return QA.has(childSlug) && childSlug !== parentSlug;
  }
  return false;
}

export function assertDelegation(parentSlug, childSlug, { depth = 0, chain = [] } = {}) {
  if (chain.includes(childSlug) || chain.includes(parentSlug) && chain.indexOf(parentSlug) < chain.length - 1) {
    throw forbidden("Circular delegation is rejected.");
  }
  if (depth >= MAX_DELEGATION_DEPTH) {
    throw forbidden(`Delegation depth exceeds bound (${MAX_DELEGATION_DEPTH}).`);
  }
  if (parentSlug === childSlug) {
    throw forbidden("Self-delegation is not allowed.");
  }
  if (!canDelegateHierarchical(parentSlug, childSlug, { depth })) {
    throw forbidden(
      `Delegation from "${parentSlug}" to "${childSlug}" is not permitted by hierarchy policy.`
    );
  }
  const child = getAgentDefinition(childSlug);
  if (child && !isAgentExecutable(child)) {
    throw validationError("Cannot delegate to non-executable catalogue agent.", {
      child: childSlug,
    });
  }
  return true;
}

export function detectCircularDelegation(edges) {
  return detectDelegationCycles(edges);
}

/** An agent cannot approve its own protected or final output. */
export function assertCannotSelfApprove({ actorSlug, authorSlug, protectedAction = false } = {}) {
  if (actorSlug && authorSlug && actorSlug === authorSlug) {
    throw forbidden(
      protectedAction
        ? "An agent cannot approve its own protected action — Founder required."
        : "An agent cannot approve its own final output."
    );
  }
  if (protectedAction && actorSlug && actorSlug !== "founder") {
    throw forbidden("Protected actions always return to the Founder.");
  }
  return true;
}

export { detectDelegationCycles };
