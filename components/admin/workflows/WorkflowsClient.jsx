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
import { WORKFLOW_CHAINS } from "@/lib/core/command-center/workflows";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { useProjectOperationalSummary } from "@/lib/admin-ops-summary";
import FounderActionBanner from "@/components/admin/FounderActionBanner";

const WORKFLOW_CATEGORIES = {
  "software-delivery": "Delivery",
  "business-growth": "Growth",
  "lead-qualification": "Growth",
  "operations-incident": "Operations",
  "advisory-review": "Advisory",
  "executive-readiness": "Executive",
  "enterprise-objective": "Enterprise",
};

async function fetchJson(path, router) {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/workflows"));
    return { ok: false, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, data };
}

function WorkflowDetailDrawer({ workflowId, instanceCount, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);
  const def = workflowId ? WORKFLOW_CHAINS[workflowId] : null;

  useEffect(() => {
    if (!workflowId) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus?.();
    return () => window.removeEventListener("keydown", onKey);
  }, [workflowId, onClose]);

  if (!workflowId || !def) return null;

  return (
    <div className="cc-drawer-root" role="presentation">
      <button
        type="button"
        className="cc-drawer-backdrop"
        aria-label="Close workflow detail"
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
            <p className="cc-eyebrow">Workflow definition</p>
            <h2 id={titleId}>{def.label}</h2>
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
          <p className="cc-muted">
            <code>{workflowId}</code> ·{" "}
            {WORKFLOW_CATEGORIES[workflowId] || "Catalog"} · {def.stages?.length || 0}{" "}
            stages · {instanceCount} current instance
            {instanceCount === 1 ? "" : "s"}
          </p>
          <ol className="admin-compact-list admin-compact-list--ordered">
            {(def.stages || []).map((s) => (
              <li key={s.key}>
                {s.label}
                {s.agentSlug ? ` · ${s.agentSlug}` : ""}
                {s.optional ? " (optional)" : ""}
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  );
}

export default function WorkflowsClient() {
  const router = useRouter();
  const { projectId, setProjectId } = useAdminProject();
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/workflows",
  });
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeOnly, setActiveOnly] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const res = await fetchJson(`/api/admin/command-center${q}`, router);
    setLoading(false);
    if (!res.ok) {
      setError(res.data?.error?.message || "Failed to load workflows");
      return;
    }
    setData(res.data);
    if (Array.isArray(res.data?.projects)) setProjects(res.data.projects);
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  const instances = useMemo(
    () => (data?.workflows?.available ? data.workflows.value || [] : []),
    [data]
  );

  const definitions = useMemo(() => {
    const counts = new Map();
    for (const w of instances) {
      const id = w.workflow || w.id;
      if (!id) continue;
      counts.set(id, (counts.get(id) || 0) + 1);
    }
    return Object.entries(WORKFLOW_CHAINS).map(([id, def]) => {
      const currentInstances = counts.get(id) || 0;
      const live = instances.filter((w) => w.workflow === id);
      const activeLive = live.filter(
        (w) =>
          w.status &&
          !["completed", "cancelled", "failed", "rejected"].includes(w.status)
      );
      return {
        id,
        label: def.label,
        category: WORKFLOW_CATEGORIES[id] || "Catalog",
        stages: def.stages || [],
        stageCount: (def.stages || []).length,
        currentInstances,
        status:
          activeLive.length > 0
            ? "active"
            : currentInstances > 0
              ? "idle"
              : "catalog",
      };
    });
  }, [instances]);

  const categories = useMemo(() => {
    const set = new Set(definitions.map((d) => d.category));
    return [...set].sort();
  }, [definitions]);

  const filteredDefs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return definitions.filter((d) => {
      if (categoryFilter !== "all" && d.category !== categoryFilter) return false;
      if (activeOnly && d.currentInstances <= 0) return false;
      if (!q) return true;
      return (
        d.label.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
      );
    });
  }, [definitions, search, categoryFilter, activeOnly]);

  const selectedInstanceCount =
    definitions.find((d) => d.id === selected)?.currentInstances || 0;

  return (
    <AdminShell
      title="Workflows"
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Workflows" },
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
          Workflow definitions and live instances. Instances require a selected
          project with runtime tasks.
        </p>
        <FounderActionBanner summary={opsSummary} projectId={projectId} />
        {loading && !data ? (
          <DelayedLoader delayMs={150}>
            <MianxLoader variant="section" label="Loading workflows…" />
          </DelayedLoader>
        ) : null}
        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}

        <section className="cc-card admin-card-compact" aria-labelledby="wf-defs-heading">
          <h2 id="wf-defs-heading">Definitions</h2>
          <div className="admin-toolbar" role="search">
            <label className="admin-toolbar-field">
              <span className="sr-only">Search workflows</span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search workflows…"
                aria-label="Search workflows"
              />
            </label>
            <label className="admin-toolbar-field">
              <span className="sr-only">Category</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                aria-label="Filter by category"
              >
                <option value="all">All categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-toolbar-check">
              <input
                type="checkbox"
                checked={activeOnly}
                onChange={(e) => setActiveOnly(e.target.checked)}
              />
              Active instances only
            </label>
          </div>
          <div className="admin-table-wrap admin-table-wrap--sticky">
            <table className="admin-data-table admin-data-table--dense admin-workflow-table">
              <thead>
                <tr>
                  <th scope="col">Workflow</th>
                  <th scope="col">Category</th>
                  <th scope="col">Stages</th>
                  <th scope="col">Current instances</th>
                  <th scope="col">Status</th>
                  <th scope="col">Open</th>
                </tr>
              </thead>
              <tbody>
                {filteredDefs.map((d) => (
                  <tr key={d.id} className="admin-workflow-row">
                    <td>
                      <strong>{d.label}</strong>
                      <div className="cc-muted">
                        <code>{d.id}</code>
                      </div>
                    </td>
                    <td>{d.category}</td>
                    <td>{d.stageCount}</td>
                    <td>{d.currentInstances}</td>
                    <td>
                      <code>{d.status}</code>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="header-btn-ghost"
                        onClick={() => setSelected(d.id)}
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
                {!filteredDefs.length ? (
                  <tr>
                    <td colSpan={6} className="cc-muted">
                      No workflow definitions match the current filters.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <section className="cc-card admin-card-compact" aria-labelledby="wf-inst-heading">
          <h2 id="wf-inst-heading">Instances</h2>
          {!projectId ? (
            <EmptyState
              title="Select a project"
              reason="Workflow instances are project-scoped tasks with workflow metadata — not a separate sample store."
              configuration="Definitions above are catalog-only until a project has live instances."
              nextAction="Choose a project to see live workflow progress, or open Objectives to start work."
              projectLabel="none"
              cta={
                <Link className="header-btn" href="/admin/projects">
                  Open projects
                </Link>
              }
            />
          ) : !instances.length ? (
            <p className="cc-muted" data-testid="workflows-empty-instances">
              No workflow instances yet. Prerequisite: Founder Plan Approval,
              Simulation Approval and explicit Simulation Start.
            </p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-data-table admin-data-table--dense">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Workflow</th>
                    <th scope="col">Status</th>
                    <th scope="col">Current step</th>
                    <th scope="col">Blockers</th>
                    <th scope="col"> </th>
                  </tr>
                </thead>
                <tbody>
                  {instances.map((w) => {
                    const current =
                      (w.stages || []).find((s) =>
                        ["current", "working", "approval_required"].includes(s.state)
                      ) || null;
                    const blockers = (w.stages || []).filter((s) =>
                      ["blocked", "failed"].includes(s.state)
                    );
                    return (
                      <tr key={w.taskId || w.title}>
                        <td>{w.title}</td>
                        <td>{w.label || w.workflow}</td>
                        <td>
                          <code>{w.status}</code>
                        </td>
                        <td>{current?.label || "—"}</td>
                        <td>{blockers.length || "—"}</td>
                        <td>
                          {w.detailHref ? (
                            <Link className="header-btn-ghost" href={w.detailHref}>
                              Open
                            </Link>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <WorkflowDetailDrawer
          workflowId={selected}
          instanceCount={selectedInstanceCount}
          onClose={() => setSelected(null)}
        />
      </div>
    </AdminShell>
  );
}
