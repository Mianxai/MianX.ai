"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import EmptyState from "@/components/admin/EmptyState";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import ProjectPicker from "@/components/admin/ProjectPicker";
import MianxLoader from "@/components/shared/MianxLoader";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { useAdminProject } from "@/lib/admin-project";
import { useProjectOperationalSummary, hasActiveFounderProof } from "@/lib/admin-ops-summary";
import FounderActionBanner from "@/components/admin/FounderActionBanner";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "plans", label: "Plans" },
  { id: "roadmaps", label: "Roadmaps" },
  { id: "capabilities", label: "Capabilities" },
  { id: "dependencies", label: "Dependencies" },
  { id: "approvals", label: "Approvals" },
  { id: "preview", label: "Execution Preview" },
  { id: "history", label: "History" },
];

async function getJson(path, router) {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/planning"));
    return { ok: false, status: 401, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };
}

export default function PlanningClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { projectId, setProjectId, suggestStoredProjectId } = useAdminProject();
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/planning",
  });
  const activeProof = hasActiveFounderProof(opsSummary);
  const tab = searchParams?.get("tab") || "overview";
  const [objective, setObjective] = useState(
    "Plan a generic industry platform capability programme for Founder review"
  );
  const [horizon, setHorizon] = useState("90_day");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [overview, setOverview] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selected, setSelected] = useState(null);
  const [approvals, setApprovals] = useState([]);
  const [history, setHistory] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getJson("/api/core/projects", router);
      if (res.ok && Array.isArray(res.data?.projects)) {
        setProjects(res.data.projects);
      }
    })();
  }, [router]);

  useEffect(() => {
    if (projectId) return;
    if (suggestStoredProjectId) setProjectId(suggestStoredProjectId);
  }, [projectId, suggestStoredProjectId, setProjectId]);

  const setTab = useCallback(
    (next) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      if (next === "overview") params.delete("tab");
      else params.set("tab", next);
      if (projectId) params.set("project_id", projectId);
      const qs = params.toString();
      router.replace(qs ? `/admin/planning?${qs}` : "/admin/planning");
    },
    [router, searchParams, projectId]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const q = projectId ? `&project_id=${encodeURIComponent(projectId)}` : "";
    if (tab === "overview") {
      const res = await getJson(`/api/admin/planning?action=overview${q}`, router);
      setLoading(false);
      if (!res.ok) {
        setError(res.data?.error?.message || "Failed to load planning overview");
        return;
      }
      setOverview(res.data);
      return;
    }
    if (tab === "history") {
      const res = await getJson(`/api/admin/planning?action=history${q}`, router);
      setLoading(false);
      if (!res.ok) {
        setError(res.data?.error?.message || "Failed to load history");
        return;
      }
      setHistory(res.data);
      return;
    }
    if (tab === "approvals") {
      const res = await getJson(`/api/admin/planning?action=approvals${q}`, router);
      setLoading(false);
      if (!res.ok) {
        setError(res.data?.error?.message || "Failed to load approvals");
        return;
      }
      setApprovals(res.data?.approvals || []);
      return;
    }
    const listRes = await getJson(`/api/admin/planning?action=list${q}`, router);
    setLoading(false);
    if (!listRes.ok) {
      setError(listRes.data?.error?.message || "Failed to load plans");
      return;
    }
    setPlans(listRes.data?.plans || []);
  }, [tab, projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  async function createPlan(e) {
    e.preventDefault();
    if (!projectId) {
      setError("Select a project before creating a planning package.");
      return;
    }
    if (activeProof) {
      const ok = window.confirm(
        "An active Founder Production Proof exists for this project. Creating a separate planning package will NOT advance the proof. Continue as Advanced / Separate planning package?"
      );
      if (!ok) return;
    }
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/planning", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create_plan",
        objective,
        horizon,
        project_id: projectId,
        source_objective_id: opsSummary?.canonical_integration_run?.id || null,
        source_classification: activeProof ? "separate_advanced_package" : "planning_package",
        does_not_advance_founder_proof: Boolean(activeProof),
      }),
    });
    const data = await res.json().catch(() => null);
    setBusy(false);
    if (res.status === 401) {
      router.push(currentAdminLoginHref("/admin/planning"));
      return;
    }
    if (!res.ok) {
      setError(data?.error?.message || "Failed to create plan");
      return;
    }
    setSelected(data.plan);
    setTab("plans");
    await load();
  }

  async function decide(planId, decision) {
    setBusy(true);
    const res = await fetch("/api/admin/planning", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ action: "decide", plan_id: planId, decision }),
    });
    const data = await res.json().catch(() => null);
    setBusy(false);
    if (!res.ok) {
      setError(data?.error?.message || "Decision failed");
      return;
    }
    setSelected(data.plan);
    await load();
  }

  async function requestApproval(planId) {
    setBusy(true);
    const res = await fetch("/api/admin/planning", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ action: "request_approval", plan_id: planId }),
    });
    const data = await res.json().catch(() => null);
    setBusy(false);
    if (!res.ok) {
      setError(data?.error?.message || "Request failed");
      return;
    }
    setSelected(data.plan);
    await load();
  }

  const plan = selected;

  return (
    <AdminShell
      title="Planning"
      breadcrumbs={[
        { href: "/admin/command-center", label: "Admin" },
        { label: "Planning" },
      ]}
      actions={
        <ProjectPicker
          value={projectId}
          onChange={(id) => setProjectId(id)}
          projects={projects}
          allowAll={false}
          required
          label="Project"
        />
      }
    >
      <PageHeader
        title="Planning Intelligence"
        description="Deterministic planning between Template Intelligence and Execution. Structure and preview only — nothing executes. Founder approval required."
      />
      <p className="cc-muted" data-testid="planning-persistence-note" role="note">
        Persistence: planning packages are stored in-process on this server until a durable
        planning migration is Founder-applied. Refresh or redeploy may clear packages. This is
        not Production database persistence.
      </p>
      <FounderActionBanner summary={opsSummary} projectId={projectId} />

      {activeProof ? (
        <div className="cc-card admin-card-compact" data-testid="planning-active-proof-banner" role="status">
          <h2>Active Founder Production Proof</h2>
          <p>
            Stage:{" "}
            <strong>
              {opsSummary?.canonical_integration_run?.stage_label ||
                opsSummary?.canonical_integration_run?.stage ||
                "—"}
            </strong>
            {opsSummary?.canonical_integration_run?.proof_status ===
              "awaiting_plan_approval" ||
            opsSummary?.canonical_integration_run?.stage ===
              "founder_approval_required" ? (
              <>
                {" "}
                · <span className="admin-status-badge warning">Awaiting approval</span>
              </>
            ) : opsSummary?.canonical_integration_run?.proof_status ? (
              <>
                {" "}
                · <span className="admin-status-badge healthy">In progress</span>
              </>
            ) : null}
          </p>
          <p className="cc-muted">
            Continue the canonical proof plan in Founder Proof. Do not create a parallel planning
            package unless you explicitly need a separate advanced package.
          </p>
          <Link
            className="header-btn"
            data-testid="planning-continue-canonical"
            href={`/admin/integration?project_id=${encodeURIComponent(projectId)}&run_id=${encodeURIComponent(
              opsSummary.canonical_integration_run.id
            )}&tab=plan`}
          >
            Continue Canonical Proof Plan
          </Link>
        </div>
      ) : null}

      <div className="admin-tabs" role="tablist" aria-label="Planning views">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? "active" : ""}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeProof ? (
        <details
          className="cc-card admin-card-compact"
          style={{ margin: "0.75rem 0" }}
          data-testid="planning-advanced-create-details"
        >
          <summary data-testid="planning-show-advanced-create">
            Advanced / Separate planning package
          </summary>
          <p className="cc-muted" style={{ marginTop: "0.65rem" }}>
            Collapsed while a Founder Proof is active. Creating a package here does not advance
            the proof.
          </p>
          <form
            onSubmit={createPlan}
            data-testid="planning-create-form"
            style={{ marginTop: "0.65rem" }}
          >
            <p className="admin-warning" role="note">
              This package will not alter the canonical Founder Proof stage or appear as proof
              evidence.
            </p>
            <label htmlFor="plan-objective">
              Founder objective
              <textarea
                id="plan-objective"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                rows={2}
                style={{ width: "100%", marginTop: "0.35rem" }}
                required
              />
            </label>
            <label htmlFor="plan-horizon" style={{ display: "block", marginTop: "0.5rem" }}>
              Horizon
              <select
                id="plan-horizon"
                value={horizon}
                onChange={(e) => setHorizon(e.target.value)}
                style={{ marginLeft: "0.5rem" }}
              >
                <option value="30_day">30 day</option>
                <option value="90_day">90 day</option>
                <option value="180_day">180 day</option>
                <option value="1_year">1 year</option>
                <option value="multi_year">Multi-year</option>
              </select>
            </label>
            <button
              type="submit"
              className="header-btn-ghost"
              disabled={busy || !projectId}
              style={{ marginTop: "0.5rem" }}
            >
              {busy ? "Creating…" : "Create separate package"}
            </button>
          </form>
        </details>
      ) : (
        <form
          className="cc-card"
          onSubmit={createPlan}
          style={{ margin: "0.75rem 0" }}
          data-testid="planning-create-form"
        >
          <h3>Create planning package</h3>
          <label htmlFor="plan-objective">
            Founder objective
            <textarea
              id="plan-objective"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              rows={2}
              style={{ width: "100%", marginTop: "0.35rem" }}
              required
            />
          </label>
          <label htmlFor="plan-horizon" style={{ display: "block", marginTop: "0.5rem" }}>
            Horizon
            <select
              id="plan-horizon"
              value={horizon}
              onChange={(e) => setHorizon(e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            >
              <option value="30_day">30 day</option>
              <option value="90_day">90 day</option>
              <option value="180_day">180 day</option>
              <option value="1_year">1 year</option>
              <option value="multi_year">Multi-year</option>
            </select>
          </label>
          <button
            type="submit"
            className="header-btn-ghost"
            disabled={busy || !projectId}
            style={{ marginTop: "0.5rem" }}
          >
            {busy ? "Creating…" : "Create planning package"}
          </button>
        </form>
      )}

      {loading ? (
        <MianxLoader variant="section" label="Loading planning…" />
      ) : error ? (
        <div className="admin-error-state" role="alert">
          <h2>Could not load planning</h2>
          <p>{error}</p>
          <button type="button" className="btn btn-secondary" onClick={load}>
            Retry
          </button>
        </div>
      ) : tab === "overview" ? (
        <div className="admin-table-wrap" data-testid="planning-overview">
          <p className="cc-muted">{overview?.note}</p>
          <p className="cc-muted">Engine: {overview?.engine_version}</p>

          {(() => {
            const proofAwaiting =
              (overview?.founder_proof_plans?.awaiting_approval || 0) > 0 ||
              overview?.founder_proof_plans?.has_awaiting_plan ||
              opsSummary?.canonical_integration_run?.proof_status ===
                "awaiting_plan_approval" ||
              opsSummary?.canonical_integration_run?.stage ===
                "founder_approval_required";
            const proofApproved =
              overview?.founder_proof_plans?.approved ||
              (opsSummary?.canonical_integration_run?.planning_plan ||
              [
                "awaiting_simulation_approval",
                "simulation_approved",
                "simulation_running",
                "awaiting_final_review",
                "completed",
              ].includes(opsSummary?.canonical_integration_run?.proof_status)
                ? 1
                : 0);
            const advanced = overview?.advanced_separate_packages || {
              draft: 0,
              awaiting_approval: overview?.counts?.pending_approval || 0,
              approved: overview?.counts?.approved || 0,
            };

            return (
              <>
                <section
                  className="cc-card admin-card-compact"
                  style={{ margin: "0.75rem 0" }}
                  data-testid="planning-founder-proof-metrics"
                >
                  <h3>Founder Proof Plans</h3>
                  <p role={proofAwaiting ? "status" : undefined}>
                    Awaiting approval:{" "}
                    <strong>
                      {proofAwaiting
                        ? Math.max(
                            overview?.founder_proof_plans?.awaiting_approval || 0,
                            1
                          )
                        : overview?.founder_proof_plans?.awaiting_approval || 0}
                    </strong>
                    {" · "}
                    Approved:{" "}
                    <strong>
                      {overview?.founder_proof_plans?.approved || proofApproved || 0}
                    </strong>
                  </p>
                  {proofAwaiting ? (
                    <p className="cc-muted">
                      A Founder Proof plan is waiting for approval — this is not an empty
                      planning state.
                    </p>
                  ) : null}
                </section>

                {activeProof ? (
                  <details
                    className="cc-card admin-card-compact"
                    style={{ margin: "0.75rem 0" }}
                    data-testid="planning-advanced-package-metrics"
                  >
                    <summary>Advanced Separate Planning Packages</summary>
                    <p style={{ marginTop: "0.65rem" }}>
                      Draft: <strong>{advanced.draft || 0}</strong>
                      {" · "}
                      Awaiting: <strong>{advanced.awaiting_approval || 0}</strong>
                      {" · "}
                      Approved: <strong>{advanced.approved || 0}</strong>
                    </p>
                    <p className="cc-muted">
                      These packages are independent of the Founder Proof plan and never
                      advance proof stage automatically.
                    </p>
                  </details>
                ) : (
                  <section
                    className="cc-card admin-card-compact"
                    style={{ margin: "0.75rem 0" }}
                    data-testid="planning-advanced-package-metrics"
                  >
                    <h3>Advanced Separate Planning Packages</h3>
                    <p>
                      Draft: <strong>{advanced.draft || 0}</strong>
                      {" · "}
                      Awaiting: <strong>{advanced.awaiting_approval || 0}</strong>
                      {" · "}
                      Approved: <strong>{advanced.approved || 0}</strong>
                    </p>
                    <p className="cc-muted">
                      These packages are independent of the Founder Proof plan and never
                      advance proof stage automatically.
                    </p>
                  </section>
                )}
              </>
            );
          })()}

          <p style={{ marginTop: "1rem" }}>
            <Link className="header-btn" href="/admin/company-builder">
              Open Company Builder
            </Link>{" "}
            <Link className="header-btn-ghost" href="/admin/templates">
              Templates
            </Link>
          </p>
        </div>
      ) : tab === "history" ? (
        <div className="cc-card">
          <h2>Audit / memory / learning</h2>
          <p className="cc-muted">
            Audit events: {history?.audit?.length || 0} · Memory candidates:{" "}
            {history?.memory?.length || 0} · Learning proposals:{" "}
            {history?.learning?.length || 0}
          </p>
          <ul>
            {(history?.audit || []).slice(-10).reverse().map((a) => (
              <li key={a.id}>
                <code>{a.action}</code> — {a.at}
              </li>
            ))}
          </ul>
        </div>
      ) : tab === "approvals" ? (
        approvals.length === 0 ? (
          <EmptyState
            title="No approval gates"
            reason="Create a planning package to open Founder approval gates."
            configuration="Approvals never auto-execute work."
            nextAction="Create a plan from the form above."
            projectLabel={projectId || "all projects"}
          />
        ) : (
          <ul className="inbox-list">
            {approvals.map((a) => (
              <li key={a.plan_id} className="inbox-item">
                <span className="inbox-kind">{a.status}</span>
                <code>{a.plan_id}</code>
              </li>
            ))}
          </ul>
        )
      ) : plans.length === 0 && !plan ? (
        <EmptyState
          title={
            activeProof ||
            opsSummary?.canonical_integration_run?.proof_status ===
              "awaiting_plan_approval"
              ? "No advanced separate packages yet"
              : "No plans yet"
          }
          reason={
            activeProof ||
            opsSummary?.canonical_integration_run?.proof_status ===
              "awaiting_plan_approval"
              ? "The Founder Proof plan lives in Founder Proof — not in this advanced package list."
              : "No planning packages in memory for this context."
          }
          configuration="Planning is in-process until the Phase F migration is Founder-applied."
          nextAction={
            activeProof
              ? "Continue the canonical proof plan, or create an advanced separate package."
              : "Create a planning package above."
          }
          projectLabel={projectId || "all projects"}
        />
      ) : (
        <div className="cc-layout">
          <div className="admin-table-wrap">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Objective</th>
                  <th>Status</th>
                  <th>Horizon</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {plans.map((p) => (
                  <tr key={p.id}>
                    <td>{String(p.objective || "").slice(0, 60)}</td>
                    <td>
                      <StatusBadge tone={p.status === "approved" ? "healthy" : "unconfigured"}>
                        {p.status}
                      </StatusBadge>
                    </td>
                    <td>{p.roadmap?.payload?.horizon || "—"}</td>
                    <td>
                      <button type="button" className="btn btn-secondary" onClick={() => setSelected(p)}>
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {plan ? (
            <section className="cc-card" aria-label="Plan detail">
              <h2>
                Plan <code>{plan.status}</code>
              </h2>
              <p className="cc-muted">{plan.note}</p>
              <p className="cc-muted">executes: {String(plan.executes)} · fabricated: {String(plan.fabricated_execution)}</p>

              {(tab === "roadmaps" || tab === "plans") && plan.roadmap ? (
                <div>
                  <h3>Roadmap ({plan.roadmap.payload?.horizon})</h3>
                  <ol>
                    {(plan.roadmap.payload?.milestone_objects || []).map((m) => (
                      <li key={m.id}>{m.name}</li>
                    ))}
                  </ol>
                </div>
              ) : null}

              {(tab === "capabilities" || tab === "plans") && plan.capability_plan ? (
                <div>
                  <h3>Capabilities</h3>
                  <p className="cc-muted">
                    Required: {(plan.capability_plan.required_capabilities || []).join(", ") || "—"}
                  </p>
                  <p className="cc-muted">
                    Gaps: {(plan.capability_plan.knowledge_gaps || []).length}
                  </p>
                </div>
              ) : null}

              {(tab === "dependencies" || tab === "plans") && (
                <div>
                  <h3>Dependencies</h3>
                  <p className="cc-muted">{(plan.dependencies || []).length} edges</p>
                </div>
              )}

              {(tab === "preview" || tab === "plans") && plan.execution_preview ? (
                <div>
                  <h3>Execution preview</h3>
                  <p className="cc-muted">{plan.execution_preview.note}</p>
                  <p>
                    Waves: {plan.execution_preview.execution_waves?.length || 0} · Tasks:{" "}
                    {plan.execution_preview.estimated_workload?.tasks || 0} · Depts:{" "}
                    {(plan.execution_preview.departments_involved || []).join(", ") || "—"}
                  </p>
                  <p className="cc-muted">
                    Estimated runtime: {plan.execution_preview.estimated_runtime?.value}{" "}
                    {plan.execution_preview.estimated_runtime?.unit} (heuristic only)
                  </p>
                </div>
              ) : null}

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
                {plan.status === "draft" ? (
                  <button type="button" className="header-btn-ghost" disabled={busy} onClick={() => requestApproval(plan.id)}>
                    Request Founder approval
                  </button>
                ) : null}
                {plan.status === "pending_approval" || plan.approval_gate?.status === "pending" ? (
                  <>
                    <button type="button" className="header-btn-ghost" disabled={busy} onClick={() => decide(plan.id, "approved")}>
                      Approve
                    </button>
                    <button type="button" className="header-btn-ghost" disabled={busy} onClick={() => decide(plan.id, "rejected")}>
                      Reject
                    </button>
                    <button type="button" className="header-btn-ghost" disabled={busy} onClick={() => decide(plan.id, "returned")}>
                      Return
                    </button>
                  </>
                ) : null}
              </div>
            </section>
          ) : null}
        </div>
      )}
    </AdminShell>
  );
}
