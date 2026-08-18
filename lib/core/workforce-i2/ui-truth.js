/**
 * Phase I.4 Founder-visible workforce capacity truth.
 * Compiled seats must never be confused with persisted or active agents.
 */

import {
  formatWorkforceMetric,
  coalesceWorkforceCount,
  FORBIDDEN_WORKFORCE_CLAIMS,
} from "./terminology.js";

export function normalizeCapacityTruth(capacityTruth = {}) {
  const persistedSeats = coalesceWorkforceCount(capacityTruth.persistedSeats);
  const readyToAllocate = coalesceWorkforceCount(capacityTruth.readyToAllocate);
  const allocated = coalesceWorkforceCount(capacityTruth.allocated);
  const active = coalesceWorkforceCount(capacityTruth.active);
  const reviewing = coalesceWorkforceCount(capacityTruth.reviewing);
  const blocked = coalesceWorkforceCount(capacityTruth.blocked);
  const released = coalesceWorkforceCount(capacityTruth.released);
  const liveTested = coalesceWorkforceCount(capacityTruth.liveTested);

  return {
    capacitySeats: capacityTruth.capacitySeats ?? 445,
    compiledSeats:
      capacityTruth.compiledSeats ?? capacityTruth.capacitySeats ?? 445,
    persistedSeats,
    // Prefer Unavailable over ambiguous "n/a" when persistence is unknown.
    persistedDisplay: formatWorkforceMetric(persistedSeats).label,
    readyToAllocate,
    readyToAllocateDisplay: formatWorkforceMetric(readyToAllocate).label,
    allocated,
    allocatedDisplay: formatWorkforceMetric(allocated).label,
    active,
    activeDisplay: formatWorkforceMetric(active).label,
    reviewing,
    blocked,
    released,
    liveTested,
    liveTestedDisplay: formatWorkforceMetric(liveTested).label,
    databaseReady: capacityTruth.databaseReady === true,
    foundationReady: capacityTruth.foundationReady === true,
    providerReady: capacityTruth.providerReady === true,
  };
}

/** Labels that must never appear as the Founder capacity contract. */
export const FORBIDDEN_CAPACITY_LABELS = [
  /445 active agents/i,
  /445 running(?:\s|$)/i,
  /445 live[- ]tested/i,
  /38 executable/i,
  /\b445 always[- ]on agents\b/i,
  /\bis an operational autonomous workforce\b/i,
  ...FORBIDDEN_WORKFORCE_CLAIMS,
];
