"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import EmptyState from "@/components/admin/EmptyState";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";
import FounderActionBanner from "@/components/admin/FounderActionBanner";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { useProjectOperationalSummary } from "@/lib/admin-ops-summary";

const TIP_KINDS = new Set(["provider", "scheduler"]);

async function fetchJson(path, router, opts) {
  const res = await fetch(path, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    ...opts,
  });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/inbox"));
    return { ok: false, data: null };
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { ok: res.ok, data };
}

export default function InboxClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/inbox",
  });
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [busy, setBusy] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const [inboxRes, ccRes] = await Promise.all([
      fetchJson(`/api/admin/inbox${q}`, router),
      fetchJson("/api/admin/command-center", router),
    ]);
    setLoading(false);
    if (!inboxRes.ok) {
      setError(inboxRes.data?.error?.message || "Failed to load Founder Inbox");
      setData(null);
      return;
    }
    setData(inboxRes.data);
    if (ccRes.ok && Array.isArray(ccRes.data?.projects)) {
      setProjects(ccRes.data.projects);
    }
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  const onProject = (id) => {
    const next = new URLSearchParams();
    if (id) next.set("project_id", id);
    const qs = next.toString();
    router.replace(qs ? `/admin/inbox?${qs}` : "/admin/inbox");
  };

  async function decideApproval(approvalId, decision) {
    setBusy(`${approvalId}:${decision}`);
    setSuccess("");
    setError("");
    const res = await fetchJson(`/api/core/approvals/${approvalId}/decision`, router, {
      method: "POST",
      body: JSON.stringify({ decision }),
    });
    setBusy("");
    if (!res.ok) {
      setError(res.data?.error?.message || "Decision failed");
      return;
    }
    setSuccess(`Approval ${decision}`);
    await load();
  }

  async function executionAction(programId, action) {
    setBusy(`${programId}:${action}`);
    setSuccess("");
    setError("");
    const res = await fetchJson("/api/admin/execution", router, {
      method: "POST",
      body: JSON.stringify({ action, program_id: programId }),
    });
    setBusy("");
    if (!res.ok) {
      setError(res.data?.error?.message || `${action} failed`);
      return;
    }
    setSuccess(`Program ${action}`);
    await load();
  }

  const { actionItems, tipItems, hasReviewPlanCard } = useMemo(() => {
    const items = data?.items || [];
    const tips = items.filter((i) => TIP_KINDS.has(i.kind));
    const actions = items.filter((i) => !TIP_KINDS.has(i.kind));
    const reviewPlan = actions.some(
      (i) =>
        i.kind === "integration_founder_action" ||
        /review\s*plan/i.test(String(i.title || "")) ||
        /review\s*plan/i.test(String(i.required_action || ""))
    );
    return { actionItems: actions, tipItems: tips, hasReviewPlanCard: reviewPlan };
  }, [data?.items]);

  // Prefer server attentionCount (excludes provider/scheduler). Fall back to action items.
  const attentionCount =
    typeof data?.attentionCount === "number"
      ? data.attentionCount
      : actionItems.length;

  // When inbox already surfaces Review Plan, hide banner CTA duplication by
  // still showing status but relying on the inbox card for the action.
  const bannerSummary = useMemo(() => {
    if (!opsSummary || !hasReviewPlanCard) return opsSummary;
    const next = opsSummary.next_founder_action;
    if (!next) return opsSummary;
    const looksLikeReviewPlan =
      /review\s*plan/i.test(String(next.label || "")) ||
      next.id === "approve_plan" ||
      next.id === "review_plan";
    if (!looksLikeReviewPlan) return opsSummary;
    return {
      ...opsSummary,
      next_founder_action: {
        ...next,
        // Keep label/reason informational; strip action_required so banner
        // does not render a competing CTA link.
        severity: "informational",
      },
    };
  }, [opsSummary, hasReviewPlanCard]);

  return (
    <AdminShell
      title="Founder Inbox"
      actions={
        <label className="cc-project-select">
          <span className="sr-only">Project filter</span>
          <select
            value={projectId}
            onChange={(e) => onProject(e.target.value)}
            aria-label="Filter by project"
          >
            <option value="">All projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      }
    >
      <div className="cc-page">
        <p className="cc-muted">
          Operational attention queue — not email. Approve, reject, pause, resume,
          and cancel from here when the item supports it.
        </p>
        <FounderActionBanner summary={bannerSummary} projectId={projectId} />
        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading Founder Inbox…" />
          </DelayedLoader>
        ) : null}
        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="cc-banner" role="status">
            {success}
          </div>
        ) : null}
        {data ? (
          <>
            <p
              className="cc-metric-value"
              style={{ fontSize: "1.1rem" }}
              data-testid="inbox-attention-count"
            >
              {attentionCount} requiring attention
            </p>
            {tipItems.length > 0 ? (
              <ul className="inbox-tips" data-testid="inbox-tips">
                {tipItems.map((item) => (
                  <li
                    key={item.id}
                    className="inbox-tip"
                    data-testid={`inbox-tip-${item.kind}`}
                  >
                    <strong>{item.title}</strong>
                    <span className="cc-muted"> — {item.detail}</span>
                    {item.kind === "provider" ? (
                      <span className="cc-muted inbox-tip-note">
                        {" "}
                        Informational configuration status — does not block this proof.
                      </span>
                    ) : null}
                    {item.href ? (
                      <Link href={item.href} className="inbox-tip-link">
                        Settings
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
            {actionItems.length === 0 ? (
              <EmptyState
                title="Inbox clear"
                reason="No approvals, pause controls, or dead-letter items need attention."
                nextAction="New items appear when protected actions or execution controls need Founder input."
                projectLabel={projectId || "All projects"}
                cta={
                  <Link className="header-btn-ghost" href="/admin/runtime/approvals">
                    Runtime approvals
                  </Link>
                }
              />
            ) : (
              <ul className="inbox-list">
                {actionItems.map((item) => (
                  <li key={item.id} className={`inbox-item severity-${item.severity}`}>
                    <div>
                      <span className="inbox-kind">{item.kind.replace(/_/g, " ")}</span>
                      <h2 className="inbox-title">{item.title}</h2>
                      <p className="cc-muted">{item.detail}</p>
                      {item.objectiveTitle ? (
                        <p className="cc-muted">Objective: {item.objectiveTitle}</p>
                      ) : null}
                      {item.runId ? (
                        <p className="cc-muted">
                          Canonical run: <code>{item.runId}</code>
                        </p>
                      ) : null}
                      {item.clarificationQuestion ? (
                        <p data-testid="inbox-clarification-question">
                          <strong>Question:</strong> {item.clarificationQuestion}
                        </p>
                      ) : null}
                      {item.riskLabel ? (
                        <p className="inbox-risk">{item.riskLabel}</p>
                      ) : null}
                      {item.originatingTask ? (
                        <p className="cc-muted">Task: {item.originatingTask}</p>
                      ) : null}
                    </div>
                    <div style={{ display: "grid", gap: "0.35rem" }}>
                      {item.kind === "approval" && item.resourceId ? (
                        <>
                          <button
                            type="button"
                            className="header-btn-ghost"
                            disabled={Boolean(busy)}
                            onClick={() => decideApproval(item.resourceId, "approved")}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="header-btn-ghost"
                            disabled={Boolean(busy)}
                            onClick={() => decideApproval(item.resourceId, "rejected")}
                          >
                            Reject
                          </button>
                        </>
                      ) : null}
                      {item.kind === "pause_control" && item.resourceId ? (
                        <>
                          <button
                            type="button"
                            className="header-btn-ghost"
                            disabled={Boolean(busy)}
                            onClick={() => executionAction(item.resourceId, "resume")}
                          >
                            Resume
                          </button>
                          <button
                            type="button"
                            className="header-btn-ghost"
                            disabled={Boolean(busy)}
                            onClick={() => executionAction(item.resourceId, "cancel")}
                          >
                            Cancel
                          </button>
                        </>
                      ) : null}
                      {item.kind === "dead_letter" || item.kind === "protected_action" ? (
                        <Link
                          href={
                            item.projectId
                              ? `/admin/execution?project_id=${encodeURIComponent(item.projectId)}`
                              : "/admin/execution"
                          }
                          className="header-btn"
                        >
                          Open execution
                        </Link>
                      ) : item.kind === "integration_clarification_required" ? (
                        <Link
                          href={item.href}
                          className="header-btn"
                          data-testid="inbox-answer-clarification"
                        >
                          Answer clarification
                        </Link>
                      ) : (
                        <Link href={item.href} className="header-btn">
                          {item.kind?.startsWith("integration_") ? item.title : "Open"}
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : null}
      </div>
    </AdminShell>
  );
}
