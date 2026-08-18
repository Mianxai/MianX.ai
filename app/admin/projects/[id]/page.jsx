"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import DelayedLoader from "@/components/shared/DelayedLoader";
import { currentAdminLoginHref } from "@/lib/admin-return-to";

function errorMessage(data, fallback) {
  return data?.error?.message || data?.error || fallback;
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notConfigured, setNotConfigured] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    setNotConfigured(false);
    const loginFallback = `/admin/projects/${id}`;
    try {
      let res = await fetch(`/api/core/projects/${id}`);
      if (res.status === 401) {
        router.push(currentAdminLoginHref(loginFallback));
        return;
      }
      if (res.status === 503) {
        setNotConfigured(true);
        setProject(null);
        return;
      }
      if (res.status === 404) {
        // Fallback: locate in list while detail route is unavailable.
        const listRes = await fetch("/api/core/projects");
        if (listRes.status === 401) {
          router.push(currentAdminLoginHref(loginFallback));
          return;
        }
        if (listRes.status === 503) {
          setNotConfigured(true);
          return;
        }
        const listData = await listRes.json().catch(() => ({}));
        const found = (listData.projects || []).find((p) => p.id === id);
        if (!found) throw new Error("Project not found");
        setProject(found);
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(errorMessage(data, "Failed to load project"));
      setProject(data.project || data);
    } catch (err) {
      setError(err.message);
      setProject(null);
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    load();
  }, [load]);

  const runtimeQs = id ? `?project_id=${encodeURIComponent(id)}` : "";

  return (
    <AdminShell
      title={project?.name || "Project"}
      breadcrumbs={[
        { href: "/admin/projects", label: "Projects" },
        { label: project?.name || "Detail" },
      ]}
      actions={
        <button type="button" className="header-btn-ghost" onClick={load}>
          Refresh
        </button>
      }
    >
      {notConfigured && (
        <div className="admin-notice" role="alert">
          Configuration error: Supabase is not configured.
        </div>
      )}
      {error && (
        <div className="admin-notice error" role="alert">
          {error}
        </div>
      )}
      <DelayedLoader
        active={loading && !project}
        variant="section"
        label="Loading project…"
      />

      {project && (
        <div className="project-detail">
          <dl className="project-meta">
            <div>
              <dt>Status</dt>
              <dd>
                <span className={`status-pill status-${project.status || "active"}`}>
                  {project.status || "active"}
                </span>
              </dd>
            </div>
            <div>
              <dt>Slug</dt>
              <dd>{project.slug || "—"}</dd>
            </div>
            <div>
              <dt>Created</dt>
              <dd>
                {project.created_at
                  ? new Date(project.created_at).toLocaleString()
                  : "—"}
              </dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>
                {project.updated_at
                  ? new Date(project.updated_at).toLocaleString()
                  : "—"}
              </dd>
            </div>
          </dl>

          {project.description && (
            <section className="project-section" aria-labelledby="proj-desc-h">
              <h2 id="proj-desc-h">Description</h2>
              <p>{project.description}</p>
            </section>
          )}

          {project.metadata && Object.keys(project.metadata).length > 0 && (
            <section className="project-section" aria-labelledby="proj-meta-h">
              <h2 id="proj-meta-h">Metadata</h2>
              <pre className="runtime-code" aria-label="Project metadata">
                {JSON.stringify(project.metadata, null, 2)}
              </pre>
            </section>
          )}

          <section className="project-section" aria-labelledby="proj-founder-h">
            <h2 id="proj-founder-h">Founder workspace</h2>
            <ul className="project-runtime-links">
              <li>
                <Link href={`/admin/command-center${runtimeQs}`}>Command Center</Link>
              </li>
              <li>
                <Link href={`/admin/integration${runtimeQs}`}>Founder Proof</Link>
              </li>
              <li>
                <Link href={`/admin/objectives${runtimeQs}`}>Objectives</Link>
              </li>
              <li>
                <Link href={`/admin/company-builder${runtimeQs}`}>Company Builder</Link>
              </li>
              <li>
                <Link href={`/admin/workforce${runtimeQs}`}>Workforce Ops</Link>
              </li>
            </ul>
          </section>

          <section className="project-section" aria-labelledby="proj-runtime-h">
            <h2 id="proj-runtime-h">Runtime</h2>
            <ul className="project-runtime-links">
              <li>
                <Link href={`/admin/runtime/agents${runtimeQs}`}>Agents</Link>
              </li>
              <li>
                <Link href={`/admin/runtime/tasks${runtimeQs}`}>Tasks</Link>
              </li>
              <li>
                <Link href={`/admin/runtime/runs${runtimeQs}`}>Runs</Link>
              </li>
              <li>
                <Link href={`/admin/runtime/approvals${runtimeQs}`}>Approvals</Link>
              </li>
              <li>
                <Link href={`/admin/runtime/audit${runtimeQs}`}>Audit</Link>
              </li>
            </ul>
          </section>
        </div>
      )}
    </AdminShell>
  );
}
