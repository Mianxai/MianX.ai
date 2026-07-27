"use client";

const LABELS = {
  working: "Working",
  idle: "Idle",
  waiting: "Waiting",
  blocked: "Blocked",
  approval_required: "Approval required",
  failed: "Failed",
  paused: "Paused",
  QUEUED: "Queued",
  PLANNING: "Planning",
  RUNNING: "Running",
  BLOCKED: "Blocked",
  AWAITING_APPROVAL: "Awaiting approval",
  COMPLETED: "Completed",
  FAILED: "Failed",
  CANCELLED: "Cancelled",
};

export default function StatusChip({ status, className = "" }) {
  const key = status || "idle";
  const label = LABELS[key] || String(key).replace(/_/g, " ");
  const cssKey = String(key).toLowerCase().replace(/\s+/g, "_");
  return (
    <span className={`mx-status-chip mx-status-${cssKey} ${className}`.trim()}>
      <span className="mx-status-dot" aria-hidden="true" />
      <span className="mx-status-label">{label}</span>
    </span>
  );
}
