/**
 * Planning audit trail (in-process; durable via migration tables when applied).
 */

import { nowIso } from "./schemas.js";

const entries = [];

export function __resetPlanningAudit() {
  entries.length = 0;
}

export function recordPlanningAudit(entry) {
  const row = {
    id: `paudit_${entries.length + 1}`,
    at: nowIso(),
    ...entry,
  };
  entries.push(row);
  return row;
}

export function listPlanningAudit({ limit = 200 } = {}) {
  return entries.slice(-limit);
}
