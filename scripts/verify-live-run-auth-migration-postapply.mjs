#!/usr/bin/env node
/**
 * Post-application verification checklist (read-only).
 * Does not connect to Production DB unless MIANX_POSTAPPLY_PROBE=1 is set later.
 * Handles absence truthfully: until migration is applied, report not_applied.
 * Never applies migrations.
 */

console.log("=== Live-run authorization migration — POST-APPLY checklist ===");
console.log("mutationPerformed: no");
console.log("expectedUntilFounderApply:");
console.log("  tablePresence: missing|not_applied");
console.log("  authorizationStoreStatus: not_applied|unavailable");
console.log("  reason: authorization_store_unavailable");
console.log("  providerCallAllowed: false");
console.log("  liveExecutionReady: false");
console.log("  genuineGenerationCalls: 0");
console.log("  authenticatedModelsApiCalls: 0");
console.log("  switches: false");
console.log("  agents: 0/0/0");
console.log("");
console.log("afterFounderApplyVerify:");
console.log("  - table exists with CHECKs / indexes / RLS / grants");
console.log("  - consume_pilot_live_run_authorization rejects duplicate consume");
console.log("  - expired/revoked/checksum mismatch blocked");
console.log("  - Admin authorizationStoreStatus becomes available");
console.log("  - provider remains none; Models/generation calls remain 0");
console.log("RESULT: checklist emitted — no mutation performed");
