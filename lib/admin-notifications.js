/** Shared admin notification helpers (badge formatting + invalidation bus). */

export const SUBMISSION_COUNT_INVALIDATED = "mianx:submission-count-invalidated";

/** Module-level last success — survives AdminShell remounts between pages. */
let cachedNewSubmissions = null;

export function getCachedNewSubmissions() {
  return cachedNewSubmissions;
}

export function setCachedNewSubmissions(count) {
  if (typeof count === "number" && Number.isFinite(count) && count >= 0) {
    cachedNewSubmissions = count;
  }
}

/** Test helper. */
export function resetCachedNewSubmissions() {
  cachedNewSubmissions = null;
}

/**
 * Broadcast that the new-submissions count may have changed.
 * Safe to call repeatedly — the provider coalesces into one refresh.
 */
export function invalidateSubmissionCount() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SUBMISSION_COUNT_INVALIDATED));
}

/** Display text for the sidebar badge, or null when the badge should hide. */
export function formatNewSubmissionsBadge(count) {
  if (typeof count !== "number" || !Number.isFinite(count) || count <= 0) {
    return null;
  }
  return count > 99 ? "99+" : String(count);
}

export function newSubmissionsAriaLabel(count) {
  const n = typeof count === "number" && Number.isFinite(count) ? count : 0;
  return `${n} new submission${n === 1 ? "" : "s"}`;
}
