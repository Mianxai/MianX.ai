"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import EmptyState from "@/components/admin/EmptyState";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import ProjectPicker from "@/components/admin/ProjectPicker";
import MianxLoader from "@/components/shared/MianxLoader";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { useAdminProject } from "@/lib/admin-project";
import {
  useProjectOperationalSummary,
  hasActiveFounderProof,
} from "@/lib/admin-ops-summary";
import FounderGuidedPanel from "@/components/admin/FounderGuidedPanel";

const TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "agents", label: "Agents" },
  { id: "analytics", label: "Analytics" },
  { id: "health", label: "Health" },
  { id: "simulation", label: "Simulation" },
  { id: "control", label: "Founder Control" },
];

async function getJson(path, router) {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/workforce"));
    return { ok: false, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, data };
}

export default function WorkforceClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { projectId, setProjectId, suggestStoredProjectId } = useAdminProject();
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/workforce",
  });
  const activeProof = hasActiveFounderProof(opsSummary);
  const [projects, setProjects] = useState([]);
  const tab = searchParams?.get("tab") || "dashboard";
  const agentSlug = searchParams?.get("agent") || "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [dash, setDash] = useState(null);
  const [detail, setDetail] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [health, setHealth] = useState(null);
  const [simResult, setSimResult] = useState(null);
  const [objective, setObjective] = useState(
    "Simulate collaborative platform planning across the real workforce"
  );

  const setTab = useCallback(
    (next, extra = {}) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      if (next === "dashboard") params.delete("tab");
      else params.set("tab", next);
      if (extra.agent) params.set("agent", extra.agent);
      else if (next !== "agents") params.delete("agent");
      if (projectId) params.set("project_id", projectId);
      const qs = params.toString();
      router.replace(qs ? `/admin/workforce?${qs}` : "/admin/workforce");
    },
    [router, searchParams, projectId]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const q = projectId ? `&project_id=${encodeURIComponent(projectId)}` : "";
    if (tab === "agents" && agentSlug) {
      const res = await getJson(
        `/api/admin/workforce?action=agent&slug=${encodeURIComponent(agentSlug)}${q}`,
        router
      );
      setLoading(false);
      if (!res.ok) {
        setError(res.data?.error?.message || "Failed to load agent");
        return;
      }
      setDetail(res.data?.agent);
      return;
    }
    if (tab === "analytics") {
      const res = await getJson(`/api/admin/workforce?action=analytics${q}`, router);
      setLoading(false);
      if (!res.ok) {
        setError(res.data?.error?.message || "Failed to load analytics");
        return;
      }
      setAnalytics(res.data?.analytics);
      return;
    }
    if (tab === "health") {
      const res = await getJson(`/api/admin/workforce?action=health${q}`, router);
      setLoading(false);
      if (!res.ok) {
        setError(res.data?.error?.message || "Failed to load health");
        return;
      }
      setHealth(res.data?.health);
      return;
    }
    const res = await getJson(`/api/admin/workforce?action=dashboard${q}`, router);
    setLoading(false);
    if (!res.ok) {
      setError(res.data?.error?.message || "Failed to load workforce dashboard");
      return;
    }
    setDash(res.data);
  }, [tab, projectId, agentSlug, router]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    (async () => {
      const res = await getJson("/api/core/projects", router);
      if (res.ok && Array.isArray(res.data?.projects)) {
        setProjects(res.data.projects.filter((p) => p.status === "active" || !p.archived_at));
      }
    })();
  }, [router]);

  useEffect(() => {
    if (projectId) return;
    if (suggestStoredProjectId) setProjectId(suggestStoredProjectId);
  }, [projectId, suggestStoredProjectId, setProjectId]);

  async function post(body) {
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/workforce", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, project_id: projectId || body.project_id || null }),
    });
    const data = await res.json().catch(() => null);
    setBusy(false);
    if (res.status === 401) {
      router.push(currentAdminLoginHref("/admin/workforce"));
      return null;
    }
    if (!res.ok) {
      setError(data?.error?.message || "Action failed");
      return null;
    }
    await load();
    return data;
  }

  return (
    <AdminShell
      title="Live Workforce"
      breadcrumbs={[
        { href: "/admin/command-center", label: "Admin" },
        { label: "Live Workforce" },
      ]}
      actions={
        <ProjectPicker
          value={projectId}
          onChange={(id) => setProjectId(id)}
          projects={projects}
          allowAll
        />
      }
    >
      <PageHeader
        title="Real Autonomous Workforce"
        description="Activates the 36 executable agents only — lifecycle, collaboration, simulation. No filler agents. No auto Founder approval. No paid provider in simulation."
      />
      <FounderGuidedPanel summary={opsSummary} projectId={projectId} />

      <div className="admin-tabs" role="tablist" aria-label="Workforce views">
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

      {loading ? (
        <MianxLoader variant="section" label="Loading workforce…" />
      ) : error ? (
        <div className="admin-error-state" role="alert">
          <h2>Workforce error</h2>
          <p>{error}</p>
          <button type="button" className="btn btn-secondary" onClick={load}>
            Retry
          </button>
        </div>
      ) : tab === "dashboard" && dash ? (
        <div className="admin-table-wrap">
          <p className="cc-muted">{dash.note}</p>
          <p className="cc-muted">
            Engine: {dash.engine_version} · Executable: {dash.executable_agents} · Paused:{" "}
            {String(dash.paused)}
          </p>
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>State</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(dash.counts || {}).map(([k, v]) => (
                <tr key={k}>
                  <td>{k}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="cc-muted" style={{ marginTop: "0.75rem" }}>
            Memory writes: {dash.memory_writes} · Learning proposals: {dash.learning_proposals} ·
            Avg execution: {dash.average_execution_ms ?? "—"} ms
          </p>
        </div>
      ) : tab === "agents" ? (
        detail ? (
          <section className="cc-card">
            <h2>
              {detail.profile?.name} <code>{detail.lifecycle_status}</code>
            </h2>
            <p className="cc-muted">{detail.profile?.purpose}</p>
            <p>Department: {detail.department || "—"}</p>
            <p>Current task: {detail.current_task || "none"}</p>
            <p className="cc-muted">
              Success %: {detail.performance?.success_pct} · Delegations:{" "}
              {detail.delegations?.length || 0} · Memory: {detail.memory?.length || 0}
            </p>
            <button type="button" className="btn btn-secondary" onClick={() => setTab("agents")}>
              Back to list
            </button>
          </section>
        ) : dash ? (
          <div className="admin-table-wrap">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {(dash.busy_agents || [])
                  .concat(
                    (dash.idle_agents || []).map((slug) => ({ slug, status: "idle", task_id: null }))
                  )
                  .slice(0, 40)
                  .map((a) => (
                    <tr key={a.slug}>
                      <td>
                        <code>{a.slug}</code>
                      </td>
                      <td>
                        <StatusBadge tone={a.status === "idle" ? "healthy" : "unconfigured"}>
                          {a.status}
                        </StatusBadge>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setTab("agents", { agent: a.slug })}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No agent states"
            reason="Bootstrap the workforce to initialise the 36 executable agents."
            configuration="Catalog agents only — no fabricated personas."
            nextAction="Open Founder Control and bootstrap, or run a simulation."
            projectLabel={projectId || "all"}
          />
        )
      ) : tab === "analytics" && analytics ? (
        <div className="cc-card">
          <h2>Workload analytics</h2>
          <p className="cc-muted">{analytics.note}</p>
          <ul>
            <li>Tasks: {analytics.task_count}</li>
            <li>Success %: {analytics.success_pct}</li>
            <li>Failure %: {analytics.failure_pct}</li>
            <li>Retry %: {analytics.retry_pct}</li>
            <li>Avg duration ms: {analytics.average_duration_ms ?? "—"}</li>
            <li>Delegations: {analytics.delegation_count}</li>
          </ul>
        </div>
      ) : tab === "health" && health ? (
        <div className="cc-card">
          <h2>Workforce health {health.healthy ? "✓" : "!"}</h2>
          <p>Executable: {health.executable_count}</p>
          <p>Dead agents: {health.dead_agents?.length || 0}</p>
          <p>Blocked: {(health.blocked_agents || []).join(", ") || "none"}</p>
          <p>
            Circular delegation: {health.circular_delegation?.ok ? "none" : "detected"}
          </p>
        </div>
      ) : tab === "simulation" ? (
        <div className="cc-card">
          <h2>
            {activeProof
              ? "Isolated workforce diagnostic simulation"
              : "Simulation mode"}
          </h2>
          <p className="cc-muted">
            Runs the real workforce without production mutation, external API, or paid provider.
            Founder approval is never auto-completed.
            {activeProof
              ? " This is NOT Founder production proof — it does not advance the canonical Integration proof."
              : ""}
          </p>
          {!projectId ? (
            <p className="admin-warning" role="status">
              Select a project before starting simulation. The placeholder project_id
              &quot;sim-project&quot; is not used when a real project is available.
            </p>
          ) : null}
          <label htmlFor="sim-obj">
            Objective
            <textarea
              id="sim-obj"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              rows={2}
              style={{ width: "100%", marginTop: "0.35rem" }}
            />
          </label>
          <button
            type="button"
            className="header-btn-ghost"
            disabled={busy || !projectId}
            title={!projectId ? "Select a project to start simulation" : undefined}
            style={{ marginTop: "0.5rem" }}
            onClick={async () => {
              if (!projectId) {
                setError("Select a project before starting workforce simulation.");
                return;
              }
              if (activeProof) {
                const ok = window.confirm(
                  "An active Founder Production Proof exists. This starts an Isolated workforce diagnostic simulation only — it will NOT advance Founder production proof. Continue?"
                );
                if (!ok) return;
              }
              const data = await post({
                action: "simulate",
                objective,
                project_id: projectId,
              });
              if (data) setSimResult(data);
            }}
          >
            {projectId ? "Start simulation" : "Start simulation (select project)"}
          </button>
          {simResult?.simulation ? (
            <div style={{ marginTop: "1rem" }}>
              <p>
                Simulation <code>{simResult.simulation.status}</code> — provider_called:{" "}
                {String(simResult.simulation.provider_called)} — production_mutation:{" "}
                {String(simResult.simulation.production_mutation)}
              </p>
              {simResult.simulation.status === "awaiting_founder_approval" ? (
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    className="header-btn-ghost"
                    disabled={busy}
                    onClick={async () => {
                      const data = await post({
                        action: "approve_simulation",
                        simulation_id: simResult.simulation.id,
                        decision: "approve",
                      });
                      if (data) setSimResult(data);
                    }}
                  >
                    Founder approve
                  </button>
                  <button
                    type="button"
                    className="header-btn-ghost"
                    disabled={busy}
                    onClick={async () => {
                      const data = await post({
                        action: "approve_simulation",
                        simulation_id: simResult.simulation.id,
                        decision: "reject",
                      });
                      if (data) setSimResult(data);
                    }}
                  >
                    Founder reject
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : tab === "control" ? (
        <div className="cc-card">
          <h2>Founder control</h2>
          <p className="cc-muted">Paused: {String(dash?.paused)}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <button type="button" className="header-btn-ghost" disabled={busy} onClick={() => post({ action: "bootstrap" })}>
              Bootstrap workforce
            </button>
            <button type="button" className="header-btn-ghost" disabled={busy} onClick={() => post({ action: "recover" })}>
              Recover
            </button>
            <button type="button" className="header-btn-ghost" disabled={busy} onClick={() => post({ action: "pause" })}>
              Pause workforce
            </button>
            <button type="button" className="header-btn-ghost" disabled={busy} onClick={() => post({ action: "resume" })}>
              Resume workforce
            </button>
          </div>
        </div>
      ) : null}
    </AdminShell>
  );
}
