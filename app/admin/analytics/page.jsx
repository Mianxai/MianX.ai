"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import MianxLoader from "@/components/shared/MianxLoader";

function toEntries(dist) {
  if (!dist || typeof dist !== "object") return [];
  return Object.entries(dist)
    .filter(([, v]) => typeof v === "number" && Number.isFinite(v))
    .sort((a, b) => b[1] - a[1]);
}

function DistributionList({ title, id, entries }) {
  const max = useMemo(
    () => (entries.length ? Math.max(...entries.map(([, v]) => v), 1) : 1),
    [entries]
  );

  if (entries.length === 0) {
    return (
      <section className="analytics-section" aria-labelledby={id}>
        <h2 id={id}>{title}</h2>
        <p className="runtime-muted">No data yet.</p>
      </section>
    );
  }

  return (
    <section className="analytics-section" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
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
    </section>
  );
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notConfigured, setNotConfigured] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    setNotConfigured(false);
    try {
      const res = await fetch("/api/admin/analytics");
      if (res.status === 401) {
        router.push("/admin/login");
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
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const leads = toEntries(data?.leadsByStatus || data?.leads_by_status);
  const tasks = toEntries(data?.tasksByStatus || data?.tasks_by_status);
  const runs = toEntries(data?.runsByStatus || data?.runs_by_status);
  const projects = toEntries(
    data?.projectCounts ||
      data?.projectsByStatus ||
      data?.projects_by_status ||
      (typeof data?.projects === "object" && !Array.isArray(data.projects)
        ? data.projects
        : null)
  );

  const empty =
    !loading &&
    !error &&
    !notConfigured &&
    data &&
    leads.length === 0 &&
    tasks.length === 0 &&
    runs.length === 0 &&
    projects.length === 0;

  return (
    <AdminShell
      title="Analytics"
      actions={
        <button type="button" className="header-btn-ghost" onClick={load} disabled={loading}>
          {loading ? <MianxLoader variant="inline" label="Refreshing analytics…" /> : "Refresh"}
        </button>
      }
    >
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
      {loading && <MianxLoader variant="section" label="Loading analytics…" />}
      {empty && (
        <div className="empty-state">
          <h3>No analytics yet</h3>
          <p>Distributions appear once leads, tasks, runs, or projects exist.</p>
        </div>
      )}
      {!loading && data && !empty && (
        <div className="analytics-grid">
          <DistributionList title="Leads by status" id="analytics-leads" entries={leads} />
          <DistributionList title="Tasks by status" id="analytics-tasks" entries={tasks} />
          <DistributionList title="Runs by status" id="analytics-runs" entries={runs} />
          <DistributionList title="Projects" id="analytics-projects" entries={projects} />
        </div>
      )}
    </AdminShell>
  );
}
