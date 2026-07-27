"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";
import StatusChip from "@/components/admin/command-center/StatusChip";

async function api(path, options, router) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    ...options,
  });
  if (res.status === 401) {
    router?.push("/admin/login");
    return { ok: false, status: 401, data: null };
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { ok: res.ok, status: res.status, data };
}

function newIdempotencyKey() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `obj:${crypto.randomUUID()}`;
  }
  return `obj:${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

const PROTECTED_OPTIONS = [
  { value: "", label: "None (analysis only)" },
  { value: "production_deploy", label: "PRODUCTION DEPLOY" },
  { value: "financial_transfer", label: "PAYMENT" },
  { value: "legal_commitment", label: "LEGAL COMMITMENT" },
  { value: "secret_change", label: "SECRET CHANGE" },
  { value: "permission_ownership_change", label: "PERMISSION CHANGE" },
  { value: "send_protected_communication", label: "EXTERNAL SEND" },
  { value: "production_destructive_mutation", label: "DESTRUCTIVE MUTATION" },
];

export default function ObjectivesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const selectedId = searchParams?.get("id") || "";

  const [projects, setProjects] = useState([]);
  const [list, setList] = useState(null);
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    objective: "",
    priority: "high",
    deadline: "",
    proposed_action: "",
    risk_class: "R2",
  });
  const [idempotencyKey, setIdempotencyKey] = useState(() => newIdempotencyKey());

  const call = useCallback((path, options) => api(path, options, router), [router]);

  const replaceParams = useCallback(
    (patch) => {
      const next = new URLSearchParams(searchParams?.toString() || "");
      for (const [k, v] of Object.entries(patch)) {
        if (v == null || v === "") next.delete(k);
        else next.set(k, v);
      }
      const qs = next.toString();
      router.replace(qs ? `/admin/objectives?${qs}` : "/admin/objectives");
    },
    [router, searchParams]
  );

  const loadProjects = useCallback(async () => {
    const res = await call("/api/core/projects");
    if (res.ok) setProjects(res.data?.projects || []);
  }, [call]);

  const loadList = useCallback(async () => {
    setLoading(true);
    setError("");
    if (!projectId) {
      setList({ available: false, objectives: [] });
      setLoading(false);
      return;
    }
    const res = await call(`/api/admin/objectives?project_id=${projectId}`);
    if (!res.ok) {
      setError(res.data?.error?.message || "Failed to load objectives");
      setList(null);
    } else {
      setList(res.data);
    }
    setLoading(false);
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
      <Link href="/admin/command-center" className="header-btn-ghost">
        Command Center
      </Link>
      <Link href="/admin/ceo-brief" className="header-btn-ghost">
        CEO Brief
      </Link>
    </div>
  );

  const objectives = list?.objectives || [];

  return (
    <AdminShell title="Objectives" actions={actions}>
      <div className="obj-page">
        {!projectId ? (
          <p className="cc-muted">
            Select a project to issue a Founder objective. Server enforces project
            scope and role capabilities.
          </p>
        ) : null}

        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}

        <div className="obj-layout">
          <section className="cc-card" aria-labelledby="obj-form-h">
            <h2 id="obj-form-h">Issue objective</h2>
            <p className="cc-muted">
              Routes through Executive orchestration → workstreams → agents →
              tasks/jobs. Protected actions stay Founder-gated.
            </p>
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
              <button
                type="submit"
                className="header-btn"
                disabled={!projectId || submitting || form.objective.trim().length < 8}
              >
                {submitting ? "Starting…" : "Start objective"}
              </button>
            </form>
          </section>

          <section className="cc-card" aria-labelledby="obj-list-h">
            <h2 id="obj-list-h">Project objectives</h2>
            {loading ? (
              <DelayedLoader delayMs={150}>
                <MianxLoader variant="inline" label="Loading…" />
              </DelayedLoader>
            ) : !projectId ? (
              <p className="cc-unavailable">Select a project</p>
            ) : objectives.length === 0 ? (
              <p className="cc-muted">No activity yet</p>
            ) : (
              <ul className="obj-list">
                {objectives.map((o) => (
                  <li key={o.id}>
                    <button
                      type="button"
                      className={`obj-row${selectedId === o.id ? " selected" : ""}`}
                      onClick={() => replaceParams({ id: o.id })}
                    >
                      <span className="obj-row-top">
                        <strong>{o.title}</strong>
                        <StatusChip status={o.status} />
                      </span>
                      <span className="cc-muted">
                        {o.workflow || "—"} · {o.priority || "—"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
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
              : "No activity yet"}
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
