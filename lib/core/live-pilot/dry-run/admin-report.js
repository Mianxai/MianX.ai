/**
 * Safe Admin-facing dry-run report labels.
 * Must not import fake-provider construction — Production status may load this.
 */

export const FAKE_PROVIDER_LABEL = "fake_openai_test_only";

/**
 * Read-only Admin report shape — never includes a Production fake-run control.
 */
export function buildDryRunRehearsalAdminReport() {
  return {
    heading: "Dry-run rehearsal",
    rehearsalStatus: "documented_test_only",
    testOnly: true,
    fakeProvider: true,
    fakeProviderLabel: FAKE_PROVIDER_LABEL,
    notProduction: true,
    genuineProviderCalls: 0,
    genuineProviderCall: false,
    agentLiveTested: false,
    productionSwitchesUnchanged: true,
    evidenceSchemaReadiness: "ready_for_test_evidence",
    checksumResult: "content_integrity_checksum_supported",
    checksumKind: "content_integrity",
    notDigitalSignature: true,
    idempotencyResult: "at_most_one_provider_attempt_per_authorized_run",
    blockersRemaining: [
      "provider_not_configured",
      "account_model_access_not_verified",
      "billing_path_not_verified",
      "live_switches_off",
      "founder_live_run_authorization_missing",
    ],
    rollbackReadiness: "switches_off_and_kill_switch_available",
    productionFakeProviderButton: false,
    note: "Fake provider runs only inside Vitest. Admin cannot invoke it. Test evidence is never live-tested.",
  };
}
