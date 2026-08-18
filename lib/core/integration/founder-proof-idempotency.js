/**
 * Server-side idempotency + deterministic canonical ids for
 * "Start Founder Proof" (Phase H production founder proof).
 *
 * Design goals:
 * - Repeated identical requests should return the existing active run.
 * - Concurrent requests must not create multiple integration_runs rows.
 * - After a run reaches a terminal proof status, new proofs are allowed.
 */

import { createHash } from "crypto";
import { FOUNDER_PRODUCTION_PROOF_OBJECTIVE } from "./proof.js";

// Fixed namespace UUID for deterministic UUID v5 generation.
// Chosen once and never changes.
const FOUNDER_PROOF_UUID_NAMESPACE =
  "61d3b1fd-c260-479b-9289-0c75f977e892"; // (matches the mission’s provided project id formatting base)

function sha256Hex(input) {
  return createHash("sha256").update(String(input), "utf8").digest("hex");
}

function parseUuidToBytes(uuid) {
  const hex = uuid.replace(/-/g, "").toLowerCase();
  if (!/^[0-9a-f]{32}$/.test(hex)) throw new Error(`Invalid UUID: ${uuid}`);
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function formatUuidFromBytes(bytes) {
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return (
    hex.slice(0, 8) +
    "-" +
    hex.slice(8, 12) +
    "-" +
    hex.slice(12, 16) +
    "-" +
    hex.slice(16, 20) +
    "-" +
    hex.slice(20)
  );
}

/**
 * UUID v5 style deterministic UUID (sha1(namespace + name)).
 * Returns a UUID string suitable for integration_runs.id.
 */
export function deterministicUuidV5(namespaceUuid, name) {
  const nsBytes = parseUuidToBytes(namespaceUuid);
  const nameBytes = Buffer.from(String(name), "utf8");
  const nsPlusName = Buffer.concat([Buffer.from(nsBytes), nameBytes]);

  // UUID v5 uses SHA-1; we avoid pulling any uuid libraries.
  const hash = createHash("sha1").update(nsPlusName).digest();

  // Set version to 5 (0101)
  hash[6] = (hash[6] & 0x0f) | 0x50;
  // Set variant to RFC 4122 (10xx)
  hash[8] = (hash[8] & 0x3f) | 0x80;

  return formatUuidFromBytes(hash.slice(0, 16));
}

export function founderProofTemplateFingerprint() {
  // Never expose objective content; we only use a stable digest as part of ids.
  return sha256Hex(
    JSON.stringify({
      title: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title,
      execution_mode: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.execution_mode,
      priority: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.priority,
      risk_tolerance: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.risk_tolerance,
      required_approvals: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.required_approvals,
      protected_actions: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.protected_actions,
      // Constraints and unresolved/questions are also part of the template identity.
      constraints: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.constraints,
      unresolved_questions:
        FOUNDER_PRODUCTION_PROOF_OBJECTIVE.unresolved_questions,
      success_criteria: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.success_criteria,
      industry: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.industry,
      business_model: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.business_model,
      budget_mode: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.budget_mode,
    })
  );
}

export function expectedFounderProofIdempotencyBase({
  organizationId,
  projectId,
}) {
  if (!organizationId || !projectId) {
    throw new Error("organizationId and projectId are required.");
  }
  return `founder-proof:${organizationId}:${projectId}:${founderProofTemplateFingerprint()}`;
}

export function deterministicFounderProofEngineRunId({
  idempotencyBase,
  latestTerminalRunId = "none",
}) {
  // When the current proof reaches a terminal state, the latest terminal run id
  // becomes the generation input, enabling genuinely new future proofs.
  return deterministicUuidV5(
    FOUNDER_PROOF_UUID_NAMESPACE,
    `${idempotencyBase}:${latestTerminalRunId}`
  );
}

export function deterministicFounderProofCorrelationTrace({ idempotencyBase }) {
  const short = sha256Hex(idempotencyBase).slice(0, 32);
  return {
    correlation_id: `corr:${short}`,
    trace_id: `trace:${short}`,
  };
}

