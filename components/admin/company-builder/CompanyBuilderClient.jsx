"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";

async function fetchJson(path, router, opts) {
  const res = await fetch(path, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    ...opts,
  });
  if (res.status === 401) {
    router?.push("/admin/login");
    return { ok: false, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, data };
}

export default function CompanyBuilderClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const [objective, setObjective] = useState("Build RestaurantOS");
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const res = await fetchJson(`/api/admin/company-builder${q}`, router);
    setLoading(false);
    if (!res.ok) {
      setError(res.data?.error?.message || "Failed to load Company Builder");
      return;
    }
    setError("");
    setData(res.data);
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  async function submitPlan(e) {
    e.preventDefault();
    if (!projectId) {
      setError("Select a project via ?project_id= to create a blueprint.");
      return;
    }
    setBusy(true);
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
    await load();
  }

  async function decide(id, decision) {
    setBusy(true);
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
    await load();
  }

  const bp = selected;

  return (
    <AdminShell title="Company Builder">
      <div className="cc-page">
        <p className="cc-muted">
          Self-building company engine: plan Company → Product → Program → Epic →
          Feature → Story → Task → Agent Run. Planning only — does not build
          RestaurantOS, PoultryOS, or any industry product. Nothing executes before
          Founder approval.
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
            />
          </label>
          <p className="cc-muted">
            Project: {projectId || "none — append ?project_id=&lt;uuid&gt;"}
          </p>
          <button type="submit" className="header-btn-ghost" disabled={busy}>
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
          <p className="cc-muted">No blueprints yet</p>
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
              Dependency edges: {bp.dependency_graph?.stats?.edge_count || 0} ·
              acyclic: {String(bp.dependency_graph?.acyclic)} · Roadmap waves:{" "}
              {bp.roadmap?.waves?.length || 0} · frozen:{" "}
              {String(bp.roadmap?.execution_frozen)}
            </p>
            <p className="cc-muted">
              Execution: runs started {bp.execution?.agent_runs_started ?? 0} ·
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
