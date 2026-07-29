"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import EmptyState from "@/components/admin/EmptyState";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";
import { currentAdminLoginHref } from "@/lib/admin-return-to";

async function fetchJson(path, router, opts) {
  const res = await fetch(path, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    ...opts,
  });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/company-builder"));
    return { ok: false, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, data };
}

export default function CompanyBuilderClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const [objective, setObjective] = useState(
    "Plan a MianX Core capability programme for Founder review"
  );
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [planTab, setPlanTab] = useState("overview");

  const load = useCallback(async () => {
    setLoading(true);
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const [cbRes, ccRes] = await Promise.all([
      fetchJson(`/api/admin/company-builder${q}`, router),
      fetchJson("/api/admin/command-center", router),
    ]);
    setLoading(false);
    if (!cbRes.ok) {
      setError(cbRes.data?.error?.message || "Failed to load Company Builder");
      return;
    }
    setError("");
    setData(cbRes.data);
    if (ccRes.ok && Array.isArray(ccRes.data?.projects)) {
      setProjects(ccRes.data.projects);
    }
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!projectId) {
      setSelected(null);
    }
  }, [projectId]);

  function onProject(id) {
    const next = new URLSearchParams();
    if (id) next.set("project_id", id);
    const qs = next.toString();
    router.replace(qs ? `/admin/company-builder?${qs}` : "/admin/company-builder");
  }

  async function submitPlan(e) {
    e.preventDefault();
    if (!projectId) {
      setError("Select a project to create a blueprint.");
      return;
    }
    setBusy(true);
    setSuccess("");
    const res = await fetchJson("/api/admin/company-builder", router, {
      method: "POST",
      body: JSON.stringify({ objective, project_id: projectId }),
    });
    setBusy(false);
    if (!res.ok) {
      setError(res.data?.error?.message || "Failed to create blueprint");
      return;
    }
    setSelected(res.data.blueprint);
    setSuccess("Blueprint created — awaiting Founder approval");
    await load();
  }

  async function decide(id, decision) {
    setBusy(true);
    setSuccess("");
    const res = await fetchJson("/api/admin/company-builder", router, {
      method: "POST",
      body: JSON.stringify({ id, decision }),
    });
    setBusy(false);
    if (!res.ok) {
      setError(res.data?.error?.message || "Decision failed");
      return;
    }
    setSelected(res.data.blueprint);
    setSuccess(
      decision === "approved"
        ? "Approved — execution program materialised (see Execution)"
        : "Blueprint rejected"
    );
    await load();
  }

  const bp = selected;
  const planningTabs = [
    "overview",
    "roadmap",
    "capabilities",
    "departments",
    "risks",
    "dependencies",
    "deliverables",
    "evidence",
    "approval",
    "execution_preview",
  ];
  const pi = bp?.planning_package || bp?.planning_intelligence;

  return (
    <AdminShell
      title="Company Builder"
      actions={
        <label className="cc-project-select">
          <span className="sr-only">Project</span>
          <select
            value={projectId}
            onChange={(e) => onProject(e.target.value)}
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
      }
    >
      <div className="cc-page">
        <p className="cc-muted">
          Self-building company engine: plan Company → Product → Program → Epic →
          Feature → Story → Task → Agent Run. Planning only — does not build
          industry products. Nothing executes before Founder approval.
        </p>

        <form className="cc-card" onSubmit={submitPlan} style={{ marginBottom: "1rem" }}>
          <label htmlFor="cb-objective">
            Founder objective
            <textarea
              id="cb-objective"
              value={objective}
              onChange={(ev) => setObjective(ev.target.value)}
              rows={3}
              style={{ width: "100%", marginTop: "0.35rem" }}
              required
            />
          </label>
          <p className="cc-muted">
            Project: {projectId || "none selected"}
          </p>
          <button type="submit" className="header-btn-ghost" disabled={busy || !projectId}>
            Generate blueprint
          </button>
        </form>

        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading Company Builder…" />
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
        {data?.note ? <p className="cc-muted">{data.note}</p> : null}

        {data?.blueprints?.length ? (
          <ul className="inbox-list">
            {data.blueprints.map((b) => (
              <li key={b.id} className="inbox-item">
                <button
                  type="button"
                  className="header-btn-ghost"
                  onClick={() => setSelected(b)}
                >
                  <span className="inbox-kind">{b.status}</span>
                  <h2 className="inbox-title">
                    {b.objective?.product_hint || "Blueprint"} ·{" "}
                    {b.objective?.industry}
                  </h2>
                </button>
              </li>
            ))}
          </ul>
        ) : data ? (
          <EmptyState
            title="No blueprints yet"
            reason={
              projectId
                ? "No Company Builder blueprints for this project."
                : "Select a project, then generate a planning blueprint."
            }
            configuration="Planning only — nothing executes before Founder approval."
            nextAction="Enter a Founder objective and generate a blueprint."
            projectLabel={projectId || "none"}
          />
        ) : null}

        {bp ? (
          <section className="cc-card" style={{ marginTop: "1rem" }}>
            <h2>
              {bp.objective?.product_hint}{" "}
              <code>{bp.status}</code>
            </h2>
            <p>{bp.ceo_plan?.vision}</p>
            <p className="cc-muted">
              Departments: {bp.ceo_plan?.departments_required?.length || 0} · Epics:{" "}
              {bp.backlog?.counts?.epics || 0} · Features:{" "}
              {bp.backlog?.counts?.features || 0} · Stories:{" "}
              {bp.backlog?.counts?.stories || 0} · Tasks:{" "}
              {bp.backlog?.counts?.tasks || 0} · Planned agent runs:{" "}
              {bp.backlog?.counts?.agent_runs || 0}
            </p>
            <p className="cc-muted">
              Planning package: {bp.planning_intelligence?.plan_id || "—"} · status:{" "}
              {bp.planning_intelligence?.status || bp.planning_package?.status || "—"} ·
              approval: {bp.planning_intelligence?.approval_status || "—"} · executes: false
            </p>

            {bp.planning_package ? (
              <>
                <div className="admin-tabs" role="tablist" aria-label="Planning workspace">
                  {planningTabs.map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="tab"
                      aria-selected={planTab === t}
                      className={planTab === t ? "active" : ""}
                      onClick={() => setPlanTab(t)}
                    >
                      {t.replace(/_/g, " ")}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: "0.75rem" }}>
                  {planTab === "overview" ? (
                    <p className="cc-muted">
                      {bp.planning_package.note} Engine:{" "}
                      {bp.planning_package.engine_version}
                    </p>
                  ) : null}
                  {planTab === "roadmap" ? (
                    <ol>
                      {(bp.planning_package.roadmap?.payload?.milestone_objects || []).map(
                        (m) => (
                          <li key={m.id}>{m.name}</li>
                        )
                      )}
                    </ol>
                  ) : null}
                  {planTab === "capabilities" ? (
                    <p className="cc-muted">
                      {(
                        bp.planning_package.capability_plan?.required_capabilities || []
                      ).join(", ") || "—"}
                    </p>
                  ) : null}
                  {planTab === "departments" ? (
                    <ul>
                      {(
                        bp.planning_package.capability_plan?.department_ownership || []
                      ).map((d) => (
                        <li key={d.slug || d.id || d}>{d.name || d.slug || d}</li>
                      ))}
                    </ul>
                  ) : null}
                  {planTab === "risks" ? (
                    <ul>
                      {(bp.planning_package.risks || []).map((r) => (
                        <li key={r.id || r.slug}>{r.name || r.slug}</li>
                      ))}
                    </ul>
                  ) : null}
                  {planTab === "dependencies" ? (
                    <p className="cc-muted">
                      {(bp.planning_package.dependencies || []).length} planning edges
                    </p>
                  ) : null}
                  {planTab === "deliverables" ? (
                    <ul>
                      {(bp.planning_package.deliverables || []).map((d) => (
                        <li key={d.id}>{d.name}</li>
                      ))}
                    </ul>
                  ) : null}
                  {planTab === "evidence" ? (
                    <ul>
                      {(bp.planning_package.evidence || []).map((e) => (
                        <li key={e.id}>{e.name}</li>
                      ))}
                    </ul>
                  ) : null}
                  {planTab === "approval" ? (
                    <p className="cc-muted">
                      Gate: {bp.planning_package.approval_gate?.status || "pending"} —{" "}
                      {bp.planning_package.approval_gate?.name}
                    </p>
                  ) : null}
                  {planTab === "execution_preview" ? (
                    <div>
                      <p className="cc-muted">
                        {bp.planning_package.execution_preview?.note}
                      </p>
                      <p>
                        Waves:{" "}
                        {bp.planning_package.execution_preview?.execution_waves?.length ||
                          0}{" "}
                        · Tasks:{" "}
                        {bp.planning_package.execution_preview?.estimated_workload
                          ?.tasks || 0}
                      </p>
                    </div>
                  ) : null}
                </div>
                <p style={{ marginTop: "0.5rem" }}>
                  <Link
                    className="header-btn-ghost"
                    href={
                      bp.project_id
                        ? `/admin/planning?project_id=${encodeURIComponent(bp.project_id)}`
                        : "/admin/planning"
                    }
                  >
                    Open Planning Intelligence
                  </Link>
                </p>
              </>
            ) : pi ? (
              <p className="cc-muted">Planning summary attached (detail in Planning).</p>
            ) : null}

            <p className="cc-muted">
              Dependency edges: {bp.dependency_graph?.stats?.edge_count || 0} ·
              acyclic: {String(bp.dependency_graph?.acyclic)} · Roadmap waves:{" "}
              {bp.roadmap?.waves?.length || 0} · frozen:{" "}
              {String(bp.roadmap?.execution_frozen)}
            </p>
            <p className="cc-muted">
              Execution: program {bp.execution?.program_id || bp.execution_program_id || "—"} ·
              industry OS built {String(Boolean(bp.execution?.industry_os_built))}
            </p>
            {bp.status === "awaiting_founder_approval" ? (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  className="header-btn-ghost"
                  disabled={busy}
                  onClick={() => decide(bp.id, "approved")}
                >
                  Approve blueprint
                </button>
                <button
                  type="button"
                  className="header-btn-ghost"
                  disabled={busy}
                  onClick={() => decide(bp.id, "rejected")}
                >
                  Reject
                </button>
              </div>
            ) : null}
            {bp.execution?.program_id || bp.execution_program_id ? (
              <p style={{ marginTop: "0.75rem" }}>
                <Link
                  className="header-btn"
                  href={
                    bp.project_id
                      ? `/admin/execution?project_id=${encodeURIComponent(bp.project_id)}&program_id=${encodeURIComponent(bp.execution?.program_id || bp.execution_program_id)}`
                      : "/admin/execution"
                  }
                >
                  Open execution program
                </Link>
              </p>
            ) : null}
            <details style={{ marginTop: "0.75rem" }}>
              <summary>Department plans</summary>
              <ul>
                {(bp.department_plans || []).map((d) => (
                  <li key={d.department}>
                    <strong>{d.department}</strong> — {d.mission}
                  </li>
                ))}
              </ul>
            </details>
            <details>
              <summary>Roadmap waves</summary>
              <ol>
                {(bp.roadmap?.waves || []).map((w) => (
                  <li key={w.phase_id}>
                    Wave {w.wave}: {w.name} — {w.status}
                  </li>
                ))}
              </ol>
            </details>
          </section>
        ) : null}
      </div>
    </AdminShell>
  );
}
