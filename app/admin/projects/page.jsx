"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

function errorMessage(data, fallback) {
  return data?.error?.message || data?.error || fallback;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notConfigured, setNotConfigured] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [archivingId, setArchivingId] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    setNotConfigured(false);
    try {
      const res = await fetch("/api/core/projects");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (res.status === 503) {
        setNotConfigured(true);
        setProjects([]);
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(errorMessage(data, "Failed to load projects"));
      setProjects(Array.isArray(data.projects) ? data.projects : []);
    } catch (err) {
      setError(err.message);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function archiveProject(id) {
    if (!window.confirm("Archive this project? It will be hidden from the active list.")) {
      return;
    }
    setArchivingId(id);
    try {
      const res = await fetch(`/api/core/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archived: true }),
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(errorMessage(data, "Could not archive project"));
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setArchivingId("");
    }
  }

  return (
    <AdminShell
      title="Projects"
      actions={
        <>
          <button type="button" className="header-btn" onClick={() => setModalOpen(true)} disabled={notConfigured}>
            New Project
          </button>
          <button type="button" className="header-btn-ghost" onClick={load}>
            Refresh
          </button>
        </>
      }
    >
      {notConfigured && (
        <div className="admin-notice" role="alert">
          Configuration error: Supabase is not configured, so projects cannot load.
        </div>
      )}
      {error && !notConfigured && (
        <div className="admin-notice error" role="alert">
          {error}
        </div>
      )}

      {loading && <p className="runtime-muted">Loading projects…</p>}

      {!loading && !notConfigured && projects.length === 0 && !error && (
        <div className="empty-state">
          <h3>No projects yet</h3>
          <p>Create a project to attach agents, tasks, runs, and approvals.</p>
          <button type="button" className="header-btn" onClick={() => setModalOpen(true)}>
            New Project
          </button>
        </div>
      )}

      {!loading && projects.length > 0 && (
        <ul className="projects-list">
          {projects.map((p) => (
            <li key={p.id} className="projects-item">
              <div>
                <Link href={`/admin/projects/${p.id}`} className="projects-item-title">
                  {p.name}
                </Link>
                <p className="runtime-muted">
                  <span className={`status-pill status-${p.status || "active"}`}>
                    {p.status || "active"}
                  </span>
                  {p.slug ? ` · ${p.slug}` : ""}
                </p>
                {p.description && <p className="projects-desc">{p.description}</p>}
              </div>
              <div className="projects-item-actions">
                <Link className="header-btn-ghost" href={`/admin/projects/${p.id}`}>
                  Open
                </Link>
                <button
                  type="button"
                  className="header-btn-ghost"
                  disabled={archivingId === p.id}
                  onClick={() => archiveProject(p.id)}
                >
                  {archivingId === p.id ? "Archiving…" : "Archive"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {modalOpen && (
        <NewProjectModal
          onClose={() => setModalOpen(false)}
          onCreated={() => {
            setModalOpen(false);
            load();
          }}
          router={router}
        />
      )}
    </AdminShell>
  );
}

function NewProjectModal({ onClose, onCreated, router }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setErr("");
    const body = { name: name.trim() };
    if (slug.trim()) body.slug = slug.trim();
    if (description.trim()) body.description = description.trim();
    try {
      const res = await fetch("/api/core/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(errorMessage(data, "Could not create project"));
      onCreated?.(data.project);
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-project-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="new-project-title">New Project</h2>
          <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <form className="modal-body" onSubmit={submit}>
          <div className="runtime-form-row">
            <label htmlFor="project-name">Name *</label>
            <input
              id="project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={200}
              autoFocus
            />
          </div>
          <div className="runtime-form-row">
            <label htmlFor="project-slug">Slug (optional)</label>
            <input
              id="project-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto-generated from name"
              maxLength={200}
            />
          </div>
          <div className="runtime-form-row">
            <label htmlFor="project-description">Description (optional)</label>
            <textarea
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={2000}
            />
          </div>
          {err && (
            <p className="runtime-error-text" role="alert">
              {err}
            </p>
          )}
          <div className="modal-footer" style={{ padding: "1rem 0 0", borderTop: "none" }}>
            <button type="button" className="modal-btn modal-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn modal-btn-primary" disabled={busy}>
              {busy ? "Creating…" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
