/**
 * Phase G — Real Autonomous Workforce Runtime contracts.
 * Activates the existing 38 executable agents only. No filler agents.
 * Simulation allowed without provider. Never fabricates production execution.
 */

export const ENGINE_VERSION = "phase-g-workforce-runtime/1.0.0";

/** Agent lifecycle — persisted and recoverable. */
export const AGENT_LIFECYCLE = Object.freeze([
  "proposed",
  "registered",
  "allocated",
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
  "paused",
  "released",
  "cancelled",
  "archived",
]);

export const LIFECYCLE_TRANSITIONS = Object.freeze({
  proposed: ["registered", "archived", "cancelled"],
  registered: ["allocated", "idle", "archived", "cancelled"],
  allocated: ["idle", "assigned", "released", "archived", "cancelled"],
  idle: ["assigned", "thinking", "planning", "delegating", "waiting", "paused", "released", "archived", "cancelled"],
  assigned: [
    "thinking",
    "planning",
    "waiting",
    "delegating",
    "executing",
    "blocked",
    "cancelled",
    "idle",
    "paused",
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
  waiting: ["thinking", "planning", "executing", "delegating", "blocked", "cancelled", "idle", "paused"],
  delegating: ["waiting", "executing", "thinking", "assigned", "blocked", "failed", "cancelled", "idle"],
  executing: ["review", "waiting", "blocked", "failed", "retry", "completed", "cancelled", "paused"],
  blocked: ["waiting", "retry", "assigned", "cancelled", "failed", "idle", "paused"],
  review: ["completed", "failed", "retry", "waiting", "cancelled"],
  completed: ["idle", "released", "archived"],
  failed: ["retry", "idle", "archived", "cancelled", "released"],
  retry: ["assigned", "waiting", "failed", "cancelled"],
  paused: ["idle", "assigned", "released", "archived", "cancelled"],
  released: ["archived", "proposed", "idle"],
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
