"use client";

import { useCallback, useEffect, useState } from "react";
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

async function fetchJson(path, router) {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/workflows"));
    return { ok: false, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, data };
}

export default function WorkflowsClient() {
  const router = useRouter();
  const { projectId, setProjectId, hrefWithProject } = useAdminProject();
  const { summary: opsSummary } = useProjectOperationalSummary(projectId, {
    loginFallback: "/admin/workflows",
  });
  const [data, setData] = useState(null);
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
      setError(res.data?.error?.message || "Failed to load workflows");
      return;
    }
    setData(res.data);
    if (Array.isArray(res.data?.projects)) setProjects(res.data.projects);
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  const definitions = Object.entries(WORKFLOW_CHAINS).map(([id, def]) => ({
    id,
    label: def.label,
    stages: def.stages || [],
  }));

  const instances = data?.workflows?.available
    ? data.workflows.value || []
    : [];

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

        <section className="cc-card">
          <h2>Definitions</h2>
          <ul className="inbox-list">
            {definitions.map((d) => (
              <li key={d.id} className="inbox-item">
                <div>
                  <span className="inbox-kind">{d.id}</span>
                  <h3 className="inbox-title">{d.label}</h3>
                  <p className="cc-muted">{d.stages.length} stages</p>
                </div>
                <button
                  type="button"
                  className="header-btn-ghost"
                  onClick={() => setSelected(d.id)}
                >
                  Open
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="cc-card">
          <h2>Instances</h2>
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
            <EmptyState
              title="No workflow instances"
              reason="No tasks with workflow metadata in this project yet."
              configuration={
                opsSummary?.next_founder_action?.reason
                  ? `Prerequisite: ${opsSummary.next_founder_action.reason}`
                  : "Create objectives or runtime tasks that use a workflow chain."
              }
              nextAction={
                opsSummary?.next_founder_action?.label
                  ? `Next Founder action: ${opsSummary.next_founder_action.label} (e.g. Answer clarification / approve plan / approve simulation).`
                  : "Open Objectives or Runtime Tasks to start work."
              }
              projectLabel={projectId}
              cta={
                opsSummary?.next_founder_action?.href &&
                opsSummary.next_founder_action.severity === "action_required" ? (
                  <Link
                    className="header-btn"
                    href={
                      !String(opsSummary.next_founder_action.href).includes("project_id=")
                        ? `${opsSummary.next_founder_action.href}${
                            opsSummary.next_founder_action.href.includes("?") ? "&" : "?"
                          }project_id=${encodeURIComponent(projectId)}`
                        : opsSummary.next_founder_action.href
                    }
                  >
                    {opsSummary.next_founder_action.label}
                  </Link>
                ) : (
                  <Link className="header-btn" href={hrefWithProject("/admin/objectives")}>
                    Objectives
                  </Link>
                )
              }
            />
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-data-table">
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

        {selected ? (
          <section className="cc-card">
            <h2>{WORKFLOW_CHAINS[selected]?.label || selected}</h2>
            <ol>
              {(WORKFLOW_CHAINS[selected]?.stages || []).map((s) => (
                <li key={s.key}>
                  {s.label}
                  {s.agentSlug ? ` · ${s.agentSlug}` : ""}
                  {s.optional ? " (optional)" : ""}
                </li>
              ))}
            </ol>
            <button
              type="button"
              className="header-btn-ghost"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </section>
        ) : null}
      </div>
    </AdminShell>
  );
}
