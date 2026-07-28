"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import EmptyState from "@/components/admin/EmptyState";
import ProjectPicker from "@/components/admin/ProjectPicker";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";
import { useAdminProject } from "@/lib/admin-project";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { DEPARTMENTS } from "@/lib/workforce/departments";

async function fetchJson(path, router) {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/departments"));
    return { ok: false, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, data };
}

export default function DepartmentsClient() {
  const router = useRouter();
  const { projectId, setProjectId, hrefWithProject } = useAdminProject();
  const [cc, setCc] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const res = await fetchJson(`/api/admin/command-center${q}`, router);
    setLoading(false);
    if (!res.ok) {
      setError(res.data?.error?.message || "Failed to load departments");
      return;
    }
    setCc(res.data);
    if (Array.isArray(res.data?.projects)) setProjects(res.data.projects);
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  const rows = useMemo(() => {
    const agents = cc?.agents || [];
    const byDept = new Map();
    for (const a of agents) {
      const slug = a.department || a.departmentSlug || "unknown";
      if (!byDept.has(slug)) byDept.set(slug, []);
      byDept.get(slug).push(a);
    }
    return DEPARTMENTS.map((d) => {
      const list = byDept.get(d.slug) || [];
      const working = list.filter((a) => a.status === "working").length;
      const idle = list.filter((a) => a.status === "idle" || !a.status).length;
      const executable = list.filter((a) => a.executable !== false).length;
      return {
        ...d,
        agents: list,
        executableCount: executable || list.length,
        working,
        idle,
        capacity: d.plannedRoleSlots,
        blocked: list.filter((a) =>
          ["blocked", "waiting", "failed"].includes(a.status)
        ).length,
      };
    });
  }, [cc]);

  const detail = selected
    ? rows.find((r) => r.slug === selected) || null
    : null;

  return (
    <AdminShell
      title="Departments"
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Departments" },
      ]}
      actions={
        <ProjectPicker
          projects={projects}
          value={projectId}
          onChange={(id) => setProjectId(id)}
          allowAll
        />
      }
    >
      <div className="cc-page admin-page-compact">
        <p className="cc-muted">
          Workforce departments from the canonical catalog, enriched with live
          agent status when a project is selected.
        </p>
        {loading && !cc ? (
          <DelayedLoader delayMs={150}>
            <MianxLoader variant="section" label="Loading departments…" />
          </DelayedLoader>
        ) : null}
        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}

        {!loading && rows.length === 0 ? (
          <EmptyState
            title="No departments"
            reason="Department registry is empty."
            nextAction="Check workforce catalog configuration."
          />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th scope="col">Department</th>
                  <th scope="col">Lead</th>
                  <th scope="col">Agents</th>
                  <th scope="col">Active / idle</th>
                  <th scope="col">Capacity slots</th>
                  <th scope="col">Blocked</th>
                  <th scope="col"> </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => (
                  <tr key={d.slug}>
                    <td>
                      <strong>{d.name}</strong>
                      <div className="cc-muted">{d.mission?.slice(0, 80)}</div>
                    </td>
                    <td>{d.directorTitle || d.executiveAgentSlug || "—"}</td>
                    <td>{d.executableCount}</td>
                    <td>
                      {d.working} / {d.idle}
                    </td>
                    <td>{d.capacity}</td>
                    <td>{d.blocked}</td>
                    <td>
                      <button
                        type="button"
                        className="header-btn-ghost"
                        onClick={() => setSelected(d.slug)}
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {detail ? (
          <section className="cc-card" aria-label="Department detail">
            <h2>{detail.name}</h2>
            <p>{detail.mission}</p>
            <p className="cc-muted">
              Lead: {detail.directorTitle} · Executive:{" "}
              {detail.executiveAgentSlug || "—"} · Inventory:{" "}
              {detail.inventoryCompleteness}
            </p>
            <p className="cc-muted">
              Current assignments (live): {detail.agents.length || "none in scope"}
            </p>
            {detail.agents.length ? (
              <ul>
                {detail.agents.slice(0, 24).map((a) => (
                  <li key={a.slug || a.id}>
                    <code>{a.status || "idle"}</code> {a.name || a.slug}
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title="No live assignments"
                reason={
                  projectId
                    ? "No agents currently mapped to this department for the selected project."
                    : "Select a project to see live assignments."
                }
                projectLabel={projectId || "All projects"}
                cta={
                  <Link
                    className="header-btn"
                    href={hrefWithProject(
                      `/admin/agents?department=${encodeURIComponent(detail.slug)}`
                    )}
                  >
                    Open Agents
                  </Link>
                }
              />
            )}
            <button
              type="button"
              className="header-btn-ghost"
              onClick={() => setSelected(null)}
            >
              Close detail
            </button>
          </section>
        ) : null}
      </div>
    </AdminShell>
  );
}
