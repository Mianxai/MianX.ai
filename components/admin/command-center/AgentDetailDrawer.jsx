"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import StatusChip from "./StatusChip";

/**
 * Premium slide-over drawer for agent detail.
 * Escape closes; focus trapped lightly on open.
 */
export default function AgentDetailDrawer({ detail, open, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus?.();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="cc-drawer-root" role="presentation">
      <button
        type="button"
        className="cc-drawer-backdrop"
        aria-label="Close agent detail"
        onClick={onClose}
      />
      <aside
        className="cc-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="cc-drawer-head">
          <div>
            <p className="cc-eyebrow">Agent detail</p>
            <h2 id={titleId}>{detail?.name || "Agent"}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="header-btn-ghost"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        {!detail ? (
          <p className="cc-muted">Select an agent to inspect live context.</p>
        ) : (
          <div className="cc-drawer-body">
            <StatusChip status={detail.status} />
            <dl className="cc-detail-dl">
              <div>
                <dt>Canonical ID</dt>
                <dd>
                  <code>{detail.canonicalId}</code>
                </dd>
              </div>
              <div>
                <dt>Runtime slug</dt>
                <dd>
                  <code>{detail.runtimeSlug}</code>
                </dd>
              </div>
              <div>
                <dt>Department</dt>
                <dd>{detail.department}</dd>
              </div>
              <div>
                <dt>Reports to</dt>
                <dd>{detail.reportsTo || "—"}</dd>
              </div>
              <div>
                <dt>Purpose</dt>
                <dd>{detail.purpose}</dd>
              </div>
              <div>
                <dt>Project scope</dt>
                <dd>
                  {detail.projectScope?.projectId || "No instance in current scope"}
                </dd>
              </div>
              <div>
                <dt>Current task / job</dt>
                <dd>
                  {detail.currentTask ? (
                    <>
                      {detail.currentTask.workflow || "task"} ·{" "}
                      {detail.currentTask.status}
                      {detail.projectScope?.projectId ? (
                        <>
                          {" "}
                          <Link
                            href={`/admin/runtime/tasks?project_id=${detail.projectScope.projectId}`}
                          >
                            Open tasks
                          </Link>
                        </>
                      ) : null}
                    </>
                  ) : (
                    "None in current scope"
                  )}
                </dd>
              </div>
              <div>
                <dt>Queue / retry</dt>
                <dd>
                  {detail.queueJob
                    ? `${detail.queueJob.status} · attempt ${detail.queueJob.attempt ?? "—"}/${detail.queueJob.maxAttempts ?? "—"}`
                    : "—"}
                </dd>
              </div>
              <div>
                <dt>Last run</dt>
                <dd>
                  {detail.lastRun
                    ? `${detail.lastRun.status} · ${detail.lastRun.provider || "—"}/${detail.lastRun.model || "—"}`
                    : "—"}
                </dd>
              </div>
              <div>
                <dt>Latest output</dt>
                <dd>
                  {detail.latestOutputSummary?.summary ||
                    (detail.latestOutputSummary?.keys
                      ? `Keys: ${detail.latestOutputSummary.keys.join(", ")}`
                      : "—")}
                </dd>
              </div>
              <div>
                <dt>Capabilities</dt>
                <dd>{(detail.capabilities || []).join(", ") || "—"}</dd>
              </div>
              <div>
                <dt>Prohibited</dt>
                <dd>{(detail.prohibitedCapabilities || []).join(", ") || "—"}</dd>
              </div>
              <div>
                <dt>Provider / model</dt>
                <dd>
                  {detail.provider || "—"} / {detail.model || "—"}
                </dd>
              </div>
              <div>
                <dt>Lifecycle</dt>
                <dd>{detail.lifecycle}</dd>
              </div>
              <div>
                <dt>Pending approvals</dt>
                <dd>
                  {(detail.pendingApproval || []).length === 0
                    ? "None"
                    : detail.pendingApproval.map((a) => a.capability).join(", ")}
                </dd>
              </div>
              <div>
                <dt>Recent audit</dt>
                <dd>
                  {(detail.recentAudit || []).length === 0
                    ? "—"
                    : detail.recentAudit.map((e) => e.action).join(", ")}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </aside>
    </div>
  );
}
