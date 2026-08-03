/**
 * Phase II.1 foundation + Phase II.2 OpenAI live path.
 * Switches default OFF. Zero real provider calls unless Founder enables later.
 */

export * from "./constants";
export * from "./policy";
export * from "./adapter";
export * from "./schema";
export * from "./prompts";
export * from "./store";
export * from "./eligibility";
export * from "./status";
export * from "./model-registry";
export * from "./activation-preflight";
export * from "./openai-adapter";
export * from "./execute";
export * from "./runtime";
export * from "./durable";
/** Production-safe Admin dry-run report only — not the fake provider client. */
export {
  buildDryRunRehearsalAdminReport,
  FAKE_PROVIDER_LABEL,
} from "./dry-run/admin-report";
/** Production-safe control-plane Admin report only — no authorization writes. */
export { buildLiveRunControlPlaneAdminReport } from "./control-plane/admin-report";
export { getApiKeyPresenceStatus } from "./control-plane/key-presence";
export { buildPilotAgentDefinition } from "./status";
