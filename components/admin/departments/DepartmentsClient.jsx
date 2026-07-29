"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import EmptyState from "@/components/admin/EmptyState";
import ProjectPicker from "@/components/admin/ProjectPicker";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";
import { useAdminProject } from "@/lib/admin-project";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { useProjectOperationalSummary } from "@/lib/admin-ops-summary";
import FounderActionBanner from "@/components/admin/FounderActionBanner";
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

function DepartmentDetailDrawer({ detail, projectId, hrefWithProject, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!detail) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus?.();
    return () => window.removeEventListener("keydown", onKey);
  }, [detail, onClose]);

  if (!detail) return null;

  return (
    <div className="cc-drawer-root" role="presentation">
      <button
        type="button"
        className="cc-drawer-backdrop"
        aria-label="Close department detail"
        onClick={onClose}
      />
      <aside
        className="cc-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="cc-drawer-head">
          <div>
            <p className="cc-eyebrow">Department</p>
            <h2 id={titleId}>{detail.name}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="header-btn-ghost"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="cc-drawer-body">
          <p className="cc-muted">{detail.mission}</p>
          {detail.proposedForProof ? (
            <span
              className="admin-status-badge warning"
              title="Agents in this department are proposed for the current Founder Proof"
            >
              Proposed for current proof
            </span>
          ) : null}
          <dl className="cc-detail-dl">
            <div>
              <dt>Lead</dt>
              <dd>
                {detail.directorTitle || "—"}
                {detail.executiveAgentSlug
                  ? ` · ${detail.executiveAgentSlug}`
                  : ""}
              </dd>
            </div>
            <div>
              <dt>Executable / Active / Idle / Blocked</dt>
              <dd>
                {detail.executableCount} · {detail.working} · {detail.idle} ·{" "}
                {detail.blocked}
              </dd>
            </div>
            <div>
              <dt>Capacity Inventory</dt>
              <dd>{detail.capacity} planned slots (not created agents)</dd>
            </div>
            <div>
              <dt>Live agents</dt>
              <dd>
                {detail.agents.length
                  ? detail.agents
                      .slice(0, 24)
                      .map((a) => `${a.name || a.slug} (${a.status || "idle"})`)
                      .join(", ")
                  : "none in scope"}
              </dd>
            </div>
          </dl>
          {detail.agents.length ? (
            <ul className="admin-compact-list">
              {detail.agents.slice(0, 24).map((a) => (
                <li key={a.slug || a.id}>
                  <code>{a.status || "idle"}</code> {a.name || a.slug}
                  {a.proposed_for_proof ? (
                    <span className="cc-muted"> · proposed</span>
                  ) : null}
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
        </div>
      </aside>
    </div>
  );
}

export default function DepartmentsClient() {
  const router = useRouter();
  const { projectId, setProjectId, hrefWithProject } = useAdminProject();
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/departments",
  });
  const [cc, setCc] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const proposedDeptSlugs = useMemo(() => {
    const fromOps = opsSummary?.proposed_for_proof?.department_slugs || [];
    return new Set(
      (Array.isArray(fromOps) ? fromOps : []).map((s) =>
        String(s).toLowerCase().replace(/\s+/g, "_")
      )
    );
  }, [opsSummary]);

  const proposedAgentSlugs = useMemo(() => {
    const fromOps = opsSummary?.proposed_for_proof?.agent_slugs || [];
    return new Set(Array.isArray(fromOps) ? fromOps : []);
  }, [opsSummary]);

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
      const proposedForProof =
        proposedDeptSlugs.has(d.slug) ||
        list.some(
          (a) =>
            a.proposed_for_proof === true ||
            (a.slug && proposedAgentSlugs.has(a.slug))
        );
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
        proposedForProof,
      };
    });
  }, [cc, proposedDeptSlugs, proposedAgentSlugs]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((d) => {
      if (statusFilter === "active" && d.working <= 0) return false;
      if (statusFilter === "idle" && !(d.idle > 0 && d.working <= 0)) return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.slug.toLowerCase().includes(q) ||
        (d.directorTitle || "").toLowerCase().includes(q) ||
        (d.mission || "").toLowerCase().includes(q)
      );
    });
  }, [rows, search, statusFilter]);

  const summaryMetrics = useMemo(() => {
    const executable = rows.reduce((n, d) => n + (d.executableCount || 0), 0);
    const active = rows.reduce((n, d) => n + (d.working || 0), 0);
    const idle = rows.reduce((n, d) => n + (d.idle || 0), 0);
    return {
      departments: rows.length,
      executable,
      active,
      idle,
    };
  }, [rows]);

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
          agent status when a project is selected. Capacity Inventory is planning
          capacity only — not created agents.
        </p>
        <FounderActionBanner summary={opsSummary} projectId={projectId} />
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
          <>
            <div
              className="admin-summary-metrics"
              data-testid="departments-summary-metrics"
              aria-label="Department summary"
            >
              <div className="admin-summary-metric">
                <span className="admin-summary-metric-label">Departments</span>
                <strong>{summaryMetrics.departments}</strong>
              </div>
              <div className="admin-summary-metric">
                <span className="admin-summary-metric-label">Executable</span>
                <strong>{summaryMetrics.executable}</strong>
              </div>
              <div className="admin-summary-metric">
                <span className="admin-summary-metric-label">Active</span>
                <strong>{summaryMetrics.active}</strong>
              </div>
              <div className="admin-summary-metric">
                <span className="admin-summary-metric-label">Idle</span>
                <strong>{summaryMetrics.idle}</strong>
              </div>
            </div>

            <div className="admin-toolbar admin-toolbar--wrap" role="search">
              <label className="admin-toolbar-field">
                <span className="sr-only">Search departments</span>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search departments…"
                  aria-label="Search departments"
                />
              </label>
              <label className="admin-toolbar-field">
                <span className="sr-only">Filter by activity</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter by active or idle"
                >
                  <option value="all">All activity</option>
                  <option value="active">Active only</option>
                  <option value="idle">Idle only</option>
                </select>
              </label>
            </div>

            <p className="admin-legend cc-muted" data-testid="departments-legend">
              <strong>Active</strong> = agents currently working ·{" "}
              <strong>Idle</strong> = assigned but not working ·{" "}
              <strong>Capacity Inventory</strong> = planned role slots (not created agents) ·{" "}
              <strong>Blocked</strong> = blocked, waiting, or failed
            </p>

            <div className="admin-table-wrap admin-table-wrap--sticky admin-table-desktop">
              <table className="admin-data-table admin-data-table--dense">
                <thead>
                  <tr>
                    <th scope="col">Department</th>
                    <th scope="col">Lead</th>
                    <th scope="col">Executable Agents</th>
                    <th
                      scope="col"
                      title="Agents currently working on tasks"
                    >
                      Active
                    </th>
                    <th
                      scope="col"
                      title="Assigned agents that are not currently working"
                    >
                      Idle
                    </th>
                    <th
                      scope="col"
                      title="Planning capacity only — these are not created or running agents."
                    >
                      Capacity Inventory
                      <span
                        className="admin-th-hint"
                        title="Planning capacity only — these are not created or running agents."
                        aria-label="Planning capacity only — these are not created or running agents."
                      >
                        ⓘ
                      </span>
                    </th>
                    <th
                      scope="col"
                      title="Agents in blocked, waiting, or failed status"
                    >
                      Blocked
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr
                      key={d.slug}
                      className={d.proposedForProof ? "admin-row--proposed" : undefined}
                    >
                      <td>
                        <strong>{d.name}</strong>
                        {d.proposedForProof ? (
                          <span
                            className="admin-inline-chip"
                            title="Proposed for current Founder Proof"
                          >
                            Proof
                          </span>
                        ) : null}
                        <div className="cc-muted">{d.mission?.slice(0, 80)}</div>
                      </td>
                      <td>{d.directorTitle || d.executiveAgentSlug || "—"}</td>
                      <td>{d.executableCount}</td>
                      <td>{d.working}</td>
                      <td>{d.idle}</td>
                      <td
                        title="Planning capacity only — these are not created or running agents."
                      >
                        {d.capacity}
                      </td>
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
                  {!filtered.length ? (
                    <tr>
                      <td colSpan={8} className="cc-muted">
                        No departments match the current search or filter.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            <ul
              className="admin-mobile-cards"
              aria-label="Departments"
              data-testid="departments-mobile-cards"
            >
              {filtered.map((d) => (
                <li
                  key={d.slug}
                  className={`admin-mobile-card${d.proposedForProof ? " admin-row--proposed" : ""}`}
                >
                  <div className="admin-mobile-card-head">
                    <strong>{d.name}</strong>
                    {d.proposedForProof ? (
                      <span className="admin-inline-chip">Proof</span>
                    ) : null}
                  </div>
                  <p className="cc-muted">{d.directorTitle || d.executiveAgentSlug || "—"}</p>
                  <dl className="admin-mobile-card-metrics">
                    <div>
                      <dt>Executable</dt>
                      <dd>{d.executableCount}</dd>
                    </div>
                    <div>
                      <dt>Active</dt>
                      <dd>{d.working}</dd>
                    </div>
                    <div>
                      <dt>Idle</dt>
                      <dd>{d.idle}</dd>
                    </div>
                    <div>
                      <dt>Capacity</dt>
                      <dd>{d.capacity}</dd>
                    </div>
                    <div>
                      <dt>Blocked</dt>
                      <dd>{d.blocked}</dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    className="header-btn-ghost"
                    onClick={() => setSelected(d.slug)}
                  >
                    Open
                  </button>
                </li>
              ))}
              {!filtered.length ? (
                <li className="cc-muted">No departments match the current search or filter.</li>
              ) : null}
            </ul>
          </>
        )}

        <DepartmentDetailDrawer
          detail={detail}
          projectId={projectId}
          hrefWithProject={hrefWithProject}
          onClose={() => setSelected(null)}
        />
      </div>
    </AdminShell>
  );
}
