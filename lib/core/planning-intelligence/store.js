/**
 * In-process planning store (durable tables exist in additive migration — not applied).
 */

import { nowIso } from "./schemas.js";

const plans = new Map();

export function __resetPlanningStore() {
  plans.clear();
}

export function savePlan(plan) {
  if (!plan?.id) throw new Error("plan.id required");
  const next = { ...plan, updated_at: nowIso() };
  plans.set(plan.id, next);
  return next;
}

export function getPlan(id) {
  return plans.get(id) || null;
}

export function listPlans({ project_id = null, status = null, limit = 100 } = {}) {
  let rows = [...plans.values()];
  if (project_id) rows = rows.filter((p) => p.project_id === project_id);
  if (status) rows = rows.filter((p) => p.status === status);
  rows.sort((a, b) => String(b.updated_at).localeCompare(String(a.updated_at)));
  return rows.slice(0, limit);
}

export function deletePlan(id) {
  return plans.delete(id);
}
