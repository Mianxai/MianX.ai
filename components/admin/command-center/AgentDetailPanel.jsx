"use client";

import Link from "next/link";

export default function AgentDetailPanel({ detail, onClose }) {
  return (
    <section className="cc-card" aria-labelledby="cc-detail-h">
      <div className="cc-card-head">
        <h2 id="cc-detail-h">Agent detail</h2>
        {detail ? (
          <button type="button" className="header-btn-ghost" onClick={onClose}>
            Close
          </button>
        ) : null}
      </div>
      {!detail ? (
        <p className="cc-muted">Select an agent to inspect live context.</p>
      ) : (
        <dl className="cc-detail-dl">
          <div>
            <dt>Name</dt>
            <dd>{detail.name}</dd>
          </div>
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
            <dt>Purpose</dt>
            <dd>{detail.purpose}</dd>
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
            <dt>Status</dt>
            <dd>{detail.status}</dd>
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
            <dt>Current task / job</dt>
            <dd>
              {detail.currentTask ? (
                <>
                  {detail.currentTask.workflow || "task"} · {detail.currentTask.status}
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
            <dt>Pending approvals</dt>
            <dd>
              {(detail.pendingApproval || []).length === 0
                ? "None"
                : detail.pendingApproval.map((a) => a.capability).join(", ")}
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
            <dt>Recent audit</dt>
            <dd>
              {(detail.recentAudit || []).length === 0
                ? "—"
                : detail.recentAudit.map((e) => e.action).join(", ")}
            </dd>
          </div>
        </dl>
      )}
    </section>
  );
}
