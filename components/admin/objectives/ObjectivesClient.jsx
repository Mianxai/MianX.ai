"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import EmptyState from "@/components/admin/EmptyState";
import ErrorState from "@/components/admin/ErrorState";
import DelayedLoader from "@/components/shared/DelayedLoader";
import StatusChip from "@/components/admin/command-center/StatusChip";
import FounderActionBanner from "@/components/admin/FounderActionBanner";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import {
  useProjectOperationalSummary,
  hasActiveFounderProof,
} from "@/lib/admin-ops-summary";

const OBJECTIVES_FETCH_TIMEOUT_MS = 30_000;

function isCancelledOrArchived(item) {
  const s = String(item?.status || item?.stage || item?.proof_status || "").toLowerCase();
  return (
    s.includes("cancel") ||
    s.includes("archiv") ||
    Boolean(item?.cancelled_as_duplicate) ||
    Boolean(item?.is_duplicate_cancelled)
  );
}

function isPrimaryProductionProof(item) {
  return (
    item?.source_type === "integration_proof" &&
    (Boolean(item?.is_canonical) || Boolean(item?.is_canonical_active))
  );
}

async function api(path, options, router) {
  try {
    const res = await fetch(path, {
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      ...options,
    });
    if (res.status === 401) {
      router?.push(currentAdminLoginHref("/admin/objectives"));
      return { ok: false, status: 401, data: null, authFailure: true };
    }
    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    return { ok: res.ok, status: res.status, data, authFailure: false };
  } catch (err) {
    const aborted =
      err?.name === "AbortError" ||
      String(err?.message || "").toLowerCase().includes("abort");
    return {
      ok: false,
      status: 0,
      data: null,
      authFailure: false,
      networkError: true,
      aborted,
      error: aborted
        ? "Timed out loading objectives."
        : err?.message || "Network error while loading objectives.",
    };
  }
}

function normalizeObjectivesResponse(data) {
  if (data == null || typeof data !== "object" || Array.isArray(data)) {
    return {
      ok: false,
      reason: "unexpected_response",
      message: "Unexpected objectives response from the server.",
    };
  }
  if (data.objectives != null && !Array.isArray(data.objectives)) {
    return {
      ok: false,
      reason: "unexpected_response",
      message: "Unexpected objectives response schema.",
    };
  }
  return {
    ok: true,
    value: {
      ...data,
      available: data.available !== false,
      objectives: Array.isArray(data.objectives) ? data.objectives : [],
    },
  };
}

function newIdempotencyKey() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `obj:${crypto.randomUUID()}`;
  }
  return `obj:${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

const PROTECTED_OPTIONS = [
  { value: "", label: "None (analysis only)" },
  { value: "production_deploy", label: "Protected: production deploy (gated — does not deploy)" },
  { value: "financial_transfer", label: "Protected: payment (gated)" },
  { value: "legal_commitment", label: "Protected: legal commitment (gated)" },
  { value: "secret_change", label: "Protected: secret change (gated)" },
  { value: "permission_ownership_change", label: "Protected: permission change (gated)" },
  { value: "send_protected_communication", label: "Protected: external send (gated)" },
  { value: "production_destructive_mutation", label: "Protected: destructive mutation (gated)" },
];

export default function ObjectivesClient() {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const selectedId = searchParams?.get("id") || "";
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/objectives",
  });
  const activeProof = hasActiveFounderProof(opsSummary);

  const [projects, setProjects] = useState([]);
  const [list, setList] = useState(null);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState("");
  const [loadFailureKind, setLoadFailureKind] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showCancelled, setShowCancelled] = useState(false);
  const [showAnalysisForm, setShowAnalysisForm] = useState(false);
  const [form, setForm] = useState({
    objective: "",
    priority: "high",
    deadline: "",
    proposed_action: "",
    risk_class: "R2",
  });
  const [idempotencyKey, setIdempotencyKey] = useState(() => newIdempotencyKey());

  useEffect(() => {
    setShowAnalysisForm(false);
  }, [projectId]);

  const call = useCallback(
    (path, options) => api(path, options, routerRef.current),
    []
  );

  const searchParamsKey = searchParams?.toString() || "";
  const replaceParams = useCallback(
    (patch) => {
      const next = new URLSearchParams(searchParamsKey);
      for (const [k, v] of Object.entries(patch)) {
        if (v == null || v === "") next.delete(k);
        else next.set(k, v);
      }
      const qs = next.toString();
      routerRef.current.replace(qs ? `/admin/objectives?${qs}` : "/admin/objectives");
    },
    [searchParamsKey]
  );

  const loadProjects = useCallback(async () => {
    const res = await call("/api/core/projects");
    if (res.ok) setProjects(res.data?.projects || []);
  }, [call]);

  const loadList = useCallback(async () => {
    setLoading(true);
    setError("");
    setLoadFailureKind("");
    if (!projectId) {
      setList({ available: false, objectives: [] });
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), OBJECTIVES_FETCH_TIMEOUT_MS);
    try {
      const res = await call(
        `/api/admin/objectives?project_id=${encodeURIComponent(projectId)}`,
        { signal: controller.signal }
      );
      if (res.authFailure) {
        setLoadFailureKind("auth");
        setError("Authentication required to load objectives.");
        setList(null);
        return;
      }
      if (!res.ok) {
        setLoadFailureKind(res.aborted ? "timeout" : "api");
        setError(
          res.error ||
            res.data?.error?.message ||
            "Failed to load objectives"
        );
        setList(null);
        return;
      }
      const normalized = normalizeObjectivesResponse(res.data);
      if (!normalized.ok) {
        setLoadFailureKind("unexpected_response");
        setError(normalized.message);
        setList(null);
        return;
      }
      setList(normalized.value);
    } catch (err) {
      setLoadFailureKind("api");
      setError(err?.message || "Failed to load objectives");
      setList(null);
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  }, [call, projectId]);

  const loadDetail = useCallback(async () => {
    if (!projectId || !selectedId) {
      setDetail(null);
      return;
    }
    const res = await call(
      `/api/admin/objectives/${selectedId}?project_id=${projectId}`
    );
    if (res.ok) setDetail(res.data);
    else setDetail(null);
  }, [call, projectId, selectedId]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!projectId || submitting) return;
    if (activeProof) {
      const ok = window.confirm(
        "An active Founder Production Proof exists for this project. A General Founder Objective does NOT create or advance Production Proof. Continue?"
      );
      if (!ok) return;
    }
    setSubmitting(true);
    setError("");
    const res = await call("/api/admin/objectives", {
      method: "POST",
      body: JSON.stringify({
        project_id: projectId,
        objective: form.objective,
        priority: form.priority,
        deadline: form.deadline || null,
        proposed_action: form.proposed_action || null,
        risk_class: form.risk_class,
        idempotency_key: idempotencyKey,
      }),
    });
    setSubmitting(false);
    if (!res.ok) {
      setError(res.data?.error?.message || "Could not start objective");
      return;
    }
    const id = res.data?.objective?.id || res.data?.task?.id;
    setIdempotencyKey(newIdempotencyKey());
    setForm((f) => ({ ...f, objective: "" }));
    await loadList();
    if (id) replaceParams({ id });
  }

  const actions = (
    <div className="cc-header-actions">
      <label className="cc-project-select">
        <span className="sr-only">Project</span>
        <select
          value={projectId}
          onChange={(e) => replaceParams({ project_id: e.target.value || null, id: null })}
          aria-label="Select project"
        >
          <option value="">Select project…</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <Link href="/admin" className="header-btn-ghost">
        Command Center
      </Link>
      <Link href="/admin/ceo-brief" className="header-btn-ghost">
        CEO Brief
      </Link>
    </div>
  );

  const allObjectives = useMemo(() => list?.objectives || [], [list?.objectives]);
  const hiddenCancelledCount = useMemo(
    () => allObjectives.filter(isCancelledOrArchived).length,
    [allObjectives]
  );
  const objectives = useMemo(() => {
    const visible = showCancelled
      ? allObjectives
      : allObjectives.filter((o) => !isCancelledOrArchived(o));
    return [...visible].sort((a, b) => {
      const ap = isPrimaryProductionProof(a) ? 0 : 1;
      const bp = isPrimaryProductionProof(b) ? 0 : 1;
      return ap - bp;
    });
  }, [allObjectives, showCancelled]);

  const formExpanded = !activeProof || showAnalysisForm;

  return (
    <AdminShell title="Objectives" actions={actions}>
      <div className="obj-page">
        <FounderActionBanner summary={opsSummary} projectId={projectId} />
        {!projectId ? (
          <EmptyState
            title="Select a project"
            reason="This page lists Founder objectives and their orchestration trail. Objectives are project-scoped; the server enforces scope and role capabilities."
            configuration="Create or pick a project before issuing work."
            nextAction="Choose a project above, or open Projects to create one."
            projectLabel="none"
            cta={
              <Link className="header-btn" href="/admin/projects">
                Open projects
              </Link>
            }
          />
        ) : null}

        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}

        <div className="obj-layout">
          <section className="cc-card" aria-labelledby="obj-form-h">
            <h2 id="obj-form-h">
              {activeProof ? "General Founder Objective" : "Issue objective"}
            </h2>
            <p className="cc-muted">
              Routes through Executive orchestration → workstreams → agents →
              tasks/jobs. Protected actions stay Founder-gated. Production Proof
              objectives are created only from Founder Proof (Start or Continue
              Founder Proof), not this form.
            </p>
            {activeProof && !formExpanded ? (
              <div className="obj-form-collapsed" data-testid="obj-analysis-collapsed">
                <p className="admin-warning" role="note">
                  An active Founder Production Proof already exists. Creating a
                  separate analysis objective will not create or alter Founder Proof.
                </p>
                <button
                  type="button"
                  className="header-btn-ghost"
                  data-testid="obj-create-analysis"
                  onClick={() => setShowAnalysisForm(true)}
                >
                  Create separate analysis objective
                </button>
              </div>
            ) : null}
            {formExpanded ? (
              <>
                {activeProof ? (
                  <p className="admin-warning" role="note">
                    This form does not create or alter Founder Proof. Continue the
                    canonical proof in Founder Proof; a general objective is
                    separate analysis work only.
                  </p>
                ) : null}
                <form className="obj-form" onSubmit={onSubmit}>
                  <label>
                    Objective
                    <textarea
                      required
                      minLength={8}
                      maxLength={8000}
                      rows={5}
                      value={form.objective}
                      onChange={(e) => setForm((f) => ({ ...f, objective: e.target.value }))}
                      disabled={!projectId || submitting}
                      placeholder="e.g. Assess whether we should build HospitalOS."
                    />
                  </label>
                  <div className="obj-form-row">
                    <label>
                      Priority
                      <select
                        value={form.priority}
                        onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
                        disabled={!projectId || submitting}
                      >
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </label>
                    <label>
                      Optional deadline
                      <input
                        type="date"
                        value={form.deadline}
                        onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
                        disabled={!projectId || submitting}
                      />
                    </label>
                    <label>
                      Risk class
                      <select
                        value={form.risk_class}
                        onChange={(e) => setForm((f) => ({ ...f, risk_class: e.target.value }))}
                        disabled={!projectId || submitting}
                      >
                        <option value="R1">R1</option>
                        <option value="R2">R2</option>
                        <option value="R3">R3</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    Protected-action intent (optional)
                    <select
                      value={form.proposed_action}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, proposed_action: e.target.value }))
                      }
                      disabled={!projectId || submitting}
                    >
                      {PROTECTED_OPTIONS.map((o) => (
                        <option key={o.value || "none"} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <p className="cc-muted">
                    Capabilities cannot be injected from this form. Idempotency key
                    rotates after each successful submit.
                  </p>
                  <div className="obj-form-actions">
                    <button
                      type="submit"
                      className="header-btn"
                      disabled={!projectId || submitting || form.objective.trim().length < 8}
                    >
                      {submitting ? "Starting…" : "Start objective"}
                    </button>
                    {activeProof ? (
                      <button
                        type="button"
                        className="header-btn-ghost"
                        onClick={() => setShowAnalysisForm(false)}
                      >
                        Collapse
                      </button>
                    ) : null}
                  </div>
                </form>
              </>
            ) : null}
          </section>

          <section
            className="cc-card"
            aria-labelledby="obj-list-h"
            data-testid="obj-list-panel"
            data-loading={loading ? "true" : "false"}
            data-failure-kind={loadFailureKind || undefined}
          >
            <h2 id="obj-list-h">Project objectives</h2>
            {loading ? (
              <DelayedLoader
                active={loading}
                variant="inline"
                label="Loading…"
                region={false}
              />
            ) : !projectId ? (
              <EmptyState
                title="No project selected"
                reason="Project objectives appear after you select a project."
                nextAction="Use the project picker above or open Projects."
                projectLabel="none"
                cta={
                  <Link className="header-btn-ghost" href="/admin/projects">
                    Open projects
                  </Link>
                }
              />
            ) : loadFailureKind ? (
              <ErrorState
                title={
                  loadFailureKind === "auth"
                    ? "Authentication required"
                    : loadFailureKind === "unexpected_response"
                      ? "Unexpected response"
                      : "Could not load objectives"
                }
                message={error || "The objectives panel could not finish loading."}
                onRetry={loadFailureKind === "auth" ? null : () => loadList()}
              />
            ) : objectives.length === 0 ? (
              <div data-testid="obj-empty-state">
                <EmptyState
                  title="No objectives yet"
                  reason="This project has no Founder objectives recorded — the list is empty, not seeded with sample rows."
                  configuration="Analysis-only by default; protected actions stay Founder-gated."
                  nextAction="Use the form to start an objective for this project."
                  projectLabel={projectId}
                />
              </div>
            ) : (
              <ul className="obj-list">
                {objectives.map((o) => {
                  const primary = isPrimaryProductionProof(o);
                  return (
                    <li key={`${o.source_type || "task"}:${o.id}`}>
                      <button
                        type="button"
                        className={`obj-row${selectedId === o.id ? " selected" : ""}${
                          primary ? " obj-row-primary" : ""
                        }`}
                        data-testid={primary ? "obj-row-production-proof" : undefined}
                        onClick={() => {
                          if (o.source_type === "integration_proof" && o.href) {
                            router.push(o.href);
                            return;
                          }
                          replaceParams({ id: o.id });
                        }}
                      >
                        <span className="obj-row-top">
                          <strong>
                            {primary ? "★ " : ""}
                            {o.title}
                          </strong>
                          <StatusChip status={o.status} />
                        </span>
                        <span className="cc-muted">
                          {o.source_badge || o.workflow || "—"}
                          {o.stage ? ` · ${o.stage}` : ""}
                          {o.required_action ? ` · ${o.required_action}` : ""}
                        </span>
                        {o.associated_run_id ? (
                          <span className="cc-muted">
                            Run …{String(o.associated_run_id).slice(-8)}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            {hiddenCancelledCount > 0 && !showCancelled ? (
              <p className="cc-muted" data-testid="obj-hidden-cancelled">
                {hiddenCancelledCount} cancelled/archived objective(s) hidden.
              </p>
            ) : null}
            <label className="ceo-brief-toggle">
              <input
                type="checkbox"
                checked={showCancelled}
                data-testid="obj-show-cancelled"
                onChange={(e) => setShowCancelled(e.target.checked)}
              />
              Show cancelled / archived
            </label>
          </section>
        </div>

        {detail?.objective ? (
          <ObjectiveDetailView
            objective={detail.objective}
            explanations={detail.approvalExplanations || []}
          />
        ) : null}
      </div>
    </AdminShell>
  );
}

function ObjectiveDetailView({ objective, explanations }) {
  return (
    <section className="cc-card obj-detail" aria-labelledby="obj-detail-h">
      <h2 id="obj-detail-h">Objective detail</h2>
      <div className="obj-detail-head">
        <StatusChip status={objective.status} />
        <span className="cc-muted">
          Created {objective.createdAt ? new Date(objective.createdAt).toLocaleString() : "—"}
        </span>
      </div>
      <p>{objective.objective}</p>
      <dl className="cc-detail-dl">
        <div>
          <dt>Project</dt>
          <dd>{objective.project?.name || objective.projectId}</dd>
        </div>
        <div>
          <dt>Executive owner</dt>
          <dd>{objective.executiveOwner}</dd>
        </div>
        <div>
          <dt>Workflow</dt>
          <dd>{objective.workflow}</dd>
        </div>
        <div>
          <dt>Workstreams</dt>
          <dd>
            {(objective.workstreams || []).length
              ? objective.workstreams
                  .map((w) => `${w.name}${w.status ? ` (${w.status})` : ""}`)
                  .join(", ")
              : "Data unavailable"}
          </dd>
        </div>
        <div>
          <dt>Assigned agents</dt>
          <dd>
            {(objective.assignedAgents || []).length
              ? objective.assignedAgents.join(", ")
              : "—"}
          </dd>
        </div>
        <div>
          <dt>Jobs</dt>
          <dd>
            {(objective.jobs || []).length
              ? objective.jobs.map((j) => `${j.agentSlug}:${j.status}`).join(", ")
              : "No jobs linked yet — enqueue from Runtime Tasks or Queue"}
          </dd>
        </div>
        <div>
          <dt>Blockers</dt>
          <dd>
            {(objective.blockers || []).length
              ? objective.blockers.map((b) => b.message).join("; ")
              : "None"}
          </dd>
        </div>
        <div>
          <dt>Approvals</dt>
          <dd>
            {(objective.approvals || []).length === 0
              ? "None"
              : objective.approvals
                  .map((a) => `${a.capability} (${a.status})`)
                  .join(", ")}
          </dd>
        </div>
        <div>
          <dt>Synthesis</dt>
          <dd>{objective.synthesis?.summary || "—"}</dd>
        </div>
        <div>
          <dt>Audit timeline</dt>
          <dd>
            {(objective.auditTimeline || []).length
              ? objective.auditTimeline.map((e) => e.action).join(", ")
              : "—"}
          </dd>
        </div>
      </dl>
      {explanations.length > 0 ? (
        <div className="obj-approval-explain">
          <h3>Approval context</h3>
          {explanations.map((ex, i) => (
            <div key={i} className="obj-approval-card">
              <strong>{ex.riskLabel}</strong>
              <p>{ex.requestedAction}</p>
              <p className="cc-muted">{ex.reason}</p>
              <p>
                <em>If approved:</em> {ex.whatIfApproved}
              </p>
              <p>
                <em>If rejected:</em> {ex.whatIfRejected}
              </p>
            </div>
          ))}
        </div>
      ) : null}
      <div className="cc-link-row">
        <Link
          href={`/admin/runtime/tasks?project_id=${encodeURIComponent(objective.projectId)}`}
        >
          Open tasks
        </Link>
        <Link
          href={`/admin/runtime/queue?project_id=${encodeURIComponent(objective.projectId)}`}
        >
          Open queue
        </Link>
        <Link
          href={`/admin/runtime/approvals?project_id=${encodeURIComponent(objective.projectId)}`}
        >
          Approvals
        </Link>
      </div>
    </section>
  );
}
