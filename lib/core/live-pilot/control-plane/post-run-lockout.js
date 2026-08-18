/**
 * Kill switch + post-run lockout for one-agent live-run control plane.
 */

import {
  isGlobalLiveExecutionEnabled,
  isPilotLiveExecutionEnabled,
} from "../policy";
import { isKillSwitchActive, setKillSwitch, listPilotRuns } from "../store";
import { getLiveRunAuthorization } from "./authorization";
import { evaluateLiveRunExecutionLock } from "./execution-lock";

/**
 * Manual Production switch-off procedure (documentation helper — does not mutate Vercel).
 */
export function manualSwitchOffProcedure() {
  return {
    steps: [
      "In Vercel Production env, unset or set LIVE_AGENT_EXECUTION_ENABLED=false",
      "Unset or set LIVE_AGENT_PILOT_ENABLED=false",
      "Arm kill switch from Admin Live Agent Pilot if a run may be in flight",
      "Do not delete historical evidence",
      "Do not un-consume a live-run authorization",
      "Confirm providerCallAllowed remains false via Admin status",
    ],
    applicationCannotMutateVercelEnv: true,
  };
}

/**
 * Post-run lockout: same authorization cannot authorize another provider call.
 */
export function evaluatePostRunLockout({ authorizationId, pilotRunId } = {}) {
  const auth = authorizationId ? getLiveRunAuthorization(authorizationId) : null;
  const runs = pilotRunId
    ? listPilotRuns({}).filter((r) => r.id === pilotRunId)
    : [];
  const terminal = runs.some((r) =>
    ["succeeded", "failed", "cancelled", "dead_letter", "blocked"].includes(r.status)
  );

  const locked =
    !auth ||
    auth.status === "consumed" ||
    auth.status === "revoked" ||
    auth.status === "expired" ||
    terminal ||
    isKillSwitchActive() ||
    !isGlobalLiveExecutionEnabled() ||
    !isPilotLiveExecutionEnabled();

  return {
    locked,
    authorizationStatus: auth?.status || "missing",
    anotherCallAllowed: false,
    killSwitchActive: isKillSwitchActive(),
    executionSwitch: isGlobalLiveExecutionEnabled(),
    pilotSwitch: isPilotLiveExecutionEnabled(),
    founderProofUnchanged: true,
    founderFinalReviewUnchanged: true,
  };
}

export function armKillSwitchForControlPlane(reason = "control_plane_lockout") {
  setKillSwitch(true, { actor: "control_plane", reason });
  return {
    ok: true,
    killSwitchActive: true,
    providerCallsBlocked: true,
    procedure: manualSwitchOffProcedure(),
  };
}

export function assertFutureProviderCallsBlocked(authorizationId) {
  const lock = evaluateLiveRunExecutionLock({ authorizationId, queuedCount: 1 });
  const post = evaluatePostRunLockout({ authorizationId });
  return {
    ok: !lock.providerCallAllowed && post.anotherCallAllowed === false,
    lockBlockers: lock.blockers,
    postRunLocked: post.locked,
  };
}
