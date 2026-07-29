"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import MianxLoader from "@/components/shared/MianxLoader";
import DelayedLoader from "@/components/shared/DelayedLoader";
import FounderActionBanner from "@/components/admin/FounderActionBanner";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { useAdminProject } from "@/lib/admin-project";
import { useProjectOperationalSummary } from "@/lib/admin-ops-summary";

function toEntries(dist) {
  if (!dist || typeof dist !== "object") return [];
  return Object.entries(dist)
    .filter(([, v]) => typeof v === "number" && Number.isFinite(v))
    .sort((a, b) => b[1] - a[1]);
}

function ScopeBadge({ scope }) {
  const label =
    scope === "organisation"
      ? "Organisation-wide"
      : scope === "selected_project"
        ? "Selected project"
        : scope === "integration"
          ? "Integration"
          : scope === "runtime"
            ? "Runtime"
            : scope || "Unknown";
  return (
    <span className="status-pill" data-testid="analytics-scope-badge">
      {label}
    </span>
  );
}

function DistributionList({ title, id, entries, scope }) {
  const max = useMemo(
    () => (entries.length ? Math.max(...entries.map(([, v]) => v), 1) : 1),
    [entries]
  );

  return (
    <section className="analytics-section" aria-labelledby={id}>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <h2 id={id}>{title}</h2>
        {scope ? <ScopeBadge scope={scope} /> : null}
      </div>
      {entries.length === 0 ? (
        <p className="runtime-muted">No data yet.</p>
      ) : (
        <ul className="analytics-bars" aria-label={title}>
          {entries.map(([label, value]) => (
            <li key={label} className="analytics-bar-row">
              <div className="analytics-bar-meta">
                <span className="analytics-bar-label">{label}</span>
                <span className="analytics-bar-value">{value}</span>
              </div>
              <div
                className="analytics-bar-track"
                role="img"
                aria-label={`${label}: ${value}`}
              >
                <div
                  className="analytics-bar-fill"
                  style={{ width: `${Math.round((value / max) * 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function AnalyticsPage() {
  const router = useRouter();
  const { projectId, setProjectId } = useAdminProject();
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/analytics",
  });
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notConfigured, setNotConfigured] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    setNotConfigured(false);
    try {
      const projRes = await fetch("/api/core/projects");
      if (projRes.ok) {
        const pj = await projRes.json().catch(() => ({}));
        setProjects(pj.projects || []);
      }
      const path = projectId
        ? `/api/admin/analytics?project_id=${encodeURIComponent(projectId)}`
        : "/api/admin/analytics";
      const res = await fetch(path);
      if (res.status === 401) {
        router.push(currentAdminLoginHref("/admin/analytics"));
        return;
      }
      if (res.status === 503) {
        setNotConfigured(true);
        setData(null);
        return;
      }
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error?.message || json?.error || "Failed to load analytics");
      }
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [router, projectId]);

  useEffect(() => {
    load();
  }, [load]);

  const leads = toEntries(data?.leadsByStatus || data?.leads_by_status);
  const tasks = toEntries(data?.tasksByStatus || data?.tasks_by_status);
  const projectTasks = toEntries(data?.projectTasksByStatus);
  const runs = toEntries(data?.runsByStatus || data?.runs_by_status);
  const projectsDist = toEntries(
    data?.projectCounts ||
      data?.projectsByStatus ||
      data?.projects_by_status ||
      (typeof data?.projects === "object" && !Array.isArray(data.projects)
        ? data.projects
        : null)
  );
  const pm = data?.projectMetrics;

  return (
    <AdminShell
      title="Analytics"
      actions={
        <div className="cc-header-actions">
          <label className="cc-project-select">
            <span className="sr-only">Project</span>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              aria-label="Filter analytics by project"
              data-testid="analytics-project-picker"
            >
              <option value="">Organisation-wide view</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="header-btn-ghost" onClick={load} disabled={loading}>
            {loading ? <MianxLoader variant="inline" label="Refreshing analytics…" /> : "Refresh"}
          </button>
        </div>
      }
    >
      <FounderActionBanner summary={opsSummary} projectId={projectId} />
      {notConfigured && (
        <div className="admin-notice" role="alert">
          Analytics are unavailable until Supabase is configured.
        </div>
      )}
      {error && (
        <div className="admin-notice error" role="alert">
          {error}
        </div>
      )}
      {data?.reconciliation_note ? (
        <p className="cc-muted" role="note" data-testid="analytics-reconciliation">
          {data.reconciliation_note}
        </p>
      ) : null}
      <DelayedLoader
        active={loading && !data}
        variant="section"
        label="Loading analytics…"
      />
      {pm ? (
        <section className="cc-card" aria-labelledby="analytics-project-metrics">
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <h2 id="analytics-project-metrics">Selected project metrics</h2>
            <ScopeBadge scope="selected_project" />
          </div>
          <ul className="cc-muted">
            <li>Canonical objectives: {pm.canonical_objectives ?? "—"}</li>
            <li>Integration runs: {pm.integration_runs ?? "—"}</li>
            <li>Current stage: {pm.current_stage || "—"}</li>
            <li>Duplicate run count: {pm.duplicate_run_count ?? 0}</li>
            <li>Pending Founder actions: {pm.pending_founder_actions ?? 0}</li>
            <li>Runtime tasks (this project): {pm.runtime_tasks ?? 0}</li>
            <li>Approvals pending: {pm.approvals_pending ?? 0}</li>
          </ul>
          {pm.next_founder_action?.href ? (
            <Link className="header-btn" href={pm.next_founder_action.href}>
              {pm.next_founder_action.label}
            </Link>
          ) : null}
        </section>
      ) : null}
      {data ? (
        <div className="analytics-grid">
          <DistributionList
            title="Leads by status"
            id="analytics-leads"
            entries={leads}
            scope="organisation"
          />
          <DistributionList
            title="Tasks by status (organisation)"
            id="analytics-tasks"
            entries={tasks}
            scope="organisation"
          />
          {projectId ? (
            <DistributionList
              title="Tasks by status (selected project)"
              id="analytics-project-tasks"
              entries={projectTasks}
              scope="selected_project"
            />
          ) : null}
          <DistributionList
            title="Agent Runtime runs by status"
            id="analytics-runs"
            entries={runs}
            scope="runtime"
          />
          <DistributionList
            title="Projects"
            id="analytics-projects"
            entries={projectsDist}
            scope="organisation"
          />
        </div>
      ) : null}
    </AdminShell>
  );
}
