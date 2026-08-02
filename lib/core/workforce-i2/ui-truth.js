/**
 * Phase I.4 Founder-visible workforce capacity truth.
 * Compiled seats must never be confused with persisted or active agents.
 */

import {
  formatWorkforceMetric,
  FORBIDDEN_WORKFORCE_CLAIMS,
} from "./terminology.js";

export function normalizeCapacityTruth(capacityTruth = {}) {
  const persistedRaw = capacityTruth.persistedSeats;
  const persistedMissing =
    persistedRaw === null || persistedRaw === undefined;
  const persistedMetric = formatWorkforceMetric(
    persistedMissing ? null : persistedRaw
  );
  return {
    capacitySeats: capacityTruth.capacitySeats ?? 445,
    compiledSeats:
      capacityTruth.compiledSeats ?? capacityTruth.capacitySeats ?? 445,
    persistedSeats: persistedMissing ? null : Number(persistedRaw),
    // Prefer Unavailable over ambiguous "n/a" when persistence is unknown.
    persistedDisplay: persistedMetric.label,
    readyToAllocate: Number(capacityTruth.readyToAllocate ?? 0),
    allocated: Number(capacityTruth.allocated ?? 0),
    active: Number(capacityTruth.active ?? 0),
    reviewing: Number(capacityTruth.reviewing ?? 0),
    blocked: Number(capacityTruth.blocked ?? 0),
    released: Number(capacityTruth.released ?? 0),
    liveTested: Number(capacityTruth.liveTested ?? 0),
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
