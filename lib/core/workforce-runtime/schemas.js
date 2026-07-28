/**
 * Phase G — Real Autonomous Workforce Runtime contracts.
 * Activates the existing 36 executable agents only. No filler agents.
 * Simulation allowed without provider. Never fabricates production execution.
 */

export const ENGINE_VERSION = "phase-g-workforce-runtime/1.0.0";

/** Agent lifecycle — persisted and recoverable. */
export const AGENT_LIFECYCLE = Object.freeze([
  "idle",
  "assigned",
  "thinking",
  "planning",
  "waiting",
  "delegating",
  "executing",
  "blocked",
  "review",
  "completed",
  "failed",
  "retry",
  "cancelled",
  "archived",
]);

export const LIFECYCLE_TRANSITIONS = Object.freeze({
  idle: ["assigned", "thinking", "planning", "delegating", "waiting", "archived", "cancelled"],
  assigned: [
    "thinking",
    "planning",
    "waiting",
    "delegating",
    "executing",
    "blocked",
    "cancelled",
    "idle",
  ],
  thinking: [
    "planning",
    "delegating",
    "waiting",
    "executing",
    "blocked",
    "failed",
    "cancelled",
  ],
  planning: ["delegating", "waiting", "executing", "blocked", "failed", "cancelled"],
  waiting: ["thinking", "planning", "executing", "delegating", "blocked", "cancelled", "idle"],
  delegating: ["waiting", "executing", "thinking", "assigned", "blocked", "failed", "cancelled", "idle"],
  executing: ["review", "waiting", "blocked", "failed", "retry", "completed", "cancelled"],
  blocked: ["waiting", "retry", "assigned", "cancelled", "failed", "idle"],
  review: ["completed", "failed", "retry", "waiting", "cancelled"],
  completed: ["idle", "archived"],
  failed: ["retry", "idle", "archived", "cancelled"],
  retry: ["assigned", "waiting", "failed", "cancelled"],
  cancelled: ["idle", "archived"],
  archived: [],
});

export const PIPELINE_STAGES = Object.freeze([
  "claim",
  "execute",
  "verify",
  "review",
  "approve",
  "close",
]);

export const MESSAGE_KINDS = Object.freeze([
  "delegate",
  "receive",
  "reply",
  "escalate",
  "complete",
]);

export const CONTROL_ACTIONS = Object.freeze([
  "pause_workforce",
  "resume_workforce",
  "stop_agent",
  "retry",
  "cancel",
  "reassign",
  "approve",
  "reject",
]);

export function nowIso() {
  return new Date().toISOString();
}

export function uid(prefix = "wf") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

export function assertLifecycle(status) {
  if (!AGENT_LIFECYCLE.includes(status)) {
    throw new Error(`Invalid agent lifecycle status: ${status}`);
  }
}
