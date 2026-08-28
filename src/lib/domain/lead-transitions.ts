/**
 * Lead Status Transition Rules — Single Source of Truth
 *
 * Both individual (/api/leads/[id]) and bulk (/api/leads/bulk)
 * endpoints MUST import from this module. Never duplicate.
 *
 * Canonical transitions:
 *   new      → new, hot, warm, cold, converted, lost
 *   hot      → hot, warm, cold, converted, lost
 *   warm     → warm, hot, cold, converted, lost
 *   cold     → cold, warm, hot, converted, lost
 *   converted → (terminal — no transitions out)
 *   lost     → new (re-open only)
 *
 * Same-status updates are always allowed (handled in validator).
 */

export const LEAD_STATUSES = ['new', 'hot', 'warm', 'cold', 'converted', 'lost'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/**
 * Valid from → to status transitions.
 * Each key is the current status; the value array lists all allowed target statuses
 * (including the same status for idempotent updates).
 */
export const VALID_TRANSITIONS: Record<string, string[]> = {
  new:       ['new', 'hot', 'warm', 'cold', 'converted', 'lost'],
  hot:       ['hot', 'warm', 'cold', 'converted', 'lost'],
  warm:      ['warm', 'hot', 'cold', 'converted', 'lost'],
  cold:      ['cold', 'warm', 'hot', 'converted', 'lost'],
  converted: [],        // terminal state — no transitions out
  lost:      ['new'],    // only re-open as new
};

/**
 * Validate a lead status transition.
 * Returns null if the transition is valid; returns an error message string if invalid.
 *
 * Rules:
 * 1. Same-status (from === to) is always valid.
 * 2. "converted" is terminal — any change away from it is rejected.
 * 3. "lost" can only transition to "new".
 * 4. All other transitions are validated against VALID_TRANSITIONS.
 */
export function validateStatusTransition(from: string, to: string): string | null {
  if (from === to) return null; // same status is always fine

  const allowed = VALID_TRANSITIONS[from];
  if (!allowed || !allowed.includes(to)) {
    if (from === 'converted') {
      return 'Cannot change status from "converted" \u2014 it is a terminal state.';
    }
    if (from === 'lost') {
      return 'Cannot change status from "lost" to "' + to + '" \u2014 only "new" is allowed to re-open a lost lead.';
    }
    return 'Invalid status transition from "' + from + '" to "' + to + '".';
  }
  return null;
}
