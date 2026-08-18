import { WAVE5_SLUGS, getWave5Definition } from "./agents";
import { forbidden, validationError } from "../errors";
import { clip } from "../validate";

export const VERDICT_STATUSES = ["PASS", "PASS_WITH_RISKS", "FAIL", "BLOCKED"];
export function statusPreventsSuccess(status) {
  return status === "FAIL" || status === "BLOCKED";
}
export function assertWave5Agent(slug) {
  if (!WAVE5_SLUGS.includes(slug)) throw forbidden(`Not a Wave-5 agent: ${slug}`);
  return getWave5Definition(slug);
}
export function assertProjectScope({ jobProjectId, requestedProjectId }) {
  const a = clip(jobProjectId, 64);
  const b = clip(requestedProjectId, 64);
  if (!a || !b || a !== b) throw forbidden("Project scope mismatch for growth workflow.");
}
export function assertNoCapabilityEscalation(agent, requestedCapabilities = []) {
  const def = typeof agent === "string" ? getWave5Definition(agent) : agent;
  if (!def) throw validationError("Unknown Wave-5 agent.");
  for (const cap of requestedCapabilities) {
    if (def.prohibitedCapabilities?.includes(cap)) {
      throw forbidden(`Capability "${cap}" is prohibited for ${def.slug}.`);
    }
  }
}
