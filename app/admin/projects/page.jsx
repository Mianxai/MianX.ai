"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import MianxLoader from "@/components/shared/MianxLoader";
import DelayedLoader from "@/components/shared/DelayedLoader";
import { slugFromName, evaluateSlugInput } from "@/lib/slug";

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
          <button type="button" className="header-btn-ghost" onClick={load} disabled={loading}>
            {loading ? <MianxLoader variant="inline" label="Refreshing projects…" /> : "Refresh"}
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

      <DelayedLoader
        active={loading && projects.length === 0}
        variant="section"
        label="Loading projects…"
      />

      {!loading && !notConfigured && projects.length === 0 && !error && (
        <div className="empty-state">
          <h3>No projects yet</h3>
          <p>Create a project to attach agents, tasks, runs, and approvals.</p>
          <button type="button" className="header-btn" onClick={() => setModalOpen(true)}>
            New Project
          </button>
        </div>
      )}

      {projects.length > 0 && (
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
  const [slugEdited, setSlugEdited] = useState(false);
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [slugError, setSlugError] = useState("");

  const nameRef = useRef(null);
  const slugRef = useRef(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Auto-suggest slug from the name until the user manually edits the slug.
  const suggestedSlug = slugEdited ? slug : slugFromName(name);

  function onSlugChange(value) {
    setSlugEdited(true);
    setSlugError("");
    setSlug(value);
  }

  function onSlugBlur() {
    if (!slug.trim()) return;
    const evaluation = evaluateSlugInput(slug);
    if (evaluation.ok) {
      setSlug(evaluation.slug);
      setSlugError("");
    } else if (evaluation.reason === "url_with_path" && evaluation.suggestion) {
      setSlug(evaluation.suggestion);
      setSlugError(
        `That looked like a URL. We suggested "${evaluation.suggestion}" — edit it if that is not right.`
      );
    } else if (evaluation.reason === "url_bare") {
      setSlugError(
        "That looks like a URL or domain. Enter a plain slug such as mianx-core, not a web address."
      );
    } else if (evaluation.reason === "invalid") {
      setSlugError("Use lowercase letters, numbers and hyphens only.");
    }
  }

  const effectiveSlug = slugEdited ? slug.trim() : suggestedSlug;
  const slugIsValidOrEmpty =
    effectiveSlug === "" || evaluateSlugInput(effectiveSlug).ok;
  const canSubmit = name.trim().length > 0 && slugIsValidOrEmpty && !busy;

  async function submit(e) {
    e.preventDefault();
    if (submittingRef.current) return; // hard guard against double submit
    setErr("");
    setSlugError("");

    if (!name.trim()) {
      nameRef.current?.focus();
      return;
    }

    // Resolve the final slug: explicit user slug (validated) or name-derived.
    let finalSlug = "";
    if (slugEdited && slug.trim()) {
      const evaluated = evaluateSlugInput(slug);
      if (!evaluated.ok) {
        if (evaluated.reason === "url_with_path" && evaluated.suggestion) {
          setSlug(evaluated.suggestion);
          setSlugError(
            `That looked like a URL. We suggested "${evaluated.suggestion}" — confirm and submit again.`
          );
        } else if (evaluated.reason === "url_bare") {
          setSlugError(
            "That looks like a URL or domain. Enter a plain slug such as mianx-core."
          );
        } else {
          setSlugError("Use lowercase letters, numbers and hyphens only.");
        }
        slugRef.current?.focus();
        return;
      }
      finalSlug = evaluated.slug;
    } else {
      finalSlug = slugFromName(name);
    }

    submittingRef.current = true;
    setBusy(true);
    const body = { name: name.trim() };
    if (finalSlug) body.slug = finalSlug;
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
      if (!res.ok) {
        // Preserve all entered values so the Founder can correct and retry.
        throw new Error(errorMessage(data, "Could not create project"));
      }
      onCreated?.(data.project);
    } catch (ex) {
      setErr(ex.message);
    } finally {
      submittingRef.current = false;
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
        <form className="modal-body" onSubmit={submit} noValidate>
          <div className="runtime-form-row">
            <label htmlFor="project-name">Name *</label>
            <input
              id="project-name"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={200}
              autoFocus
            />
          </div>
          <div className="runtime-form-row">
            <label htmlFor="project-slug">Project slug</label>
            <input
              id="project-slug"
              ref={slugRef}
              value={slugEdited ? slug : suggestedSlug}
              onChange={(e) => onSlugChange(e.target.value)}
              onBlur={onSlugBlur}
              placeholder="mianx-core"
              maxLength={200}
              inputMode="text"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              aria-invalid={slugError ? "true" : undefined}
              aria-describedby="project-slug-hint project-slug-error"
            />
            <p id="project-slug-hint" className="runtime-form-hint">
              Lowercase letters, numbers and hyphens only. Do not enter a URL.
            </p>
            {slugError && (
              <p id="project-slug-error" className="runtime-error-text" role="alert">
                {slugError}
              </p>
            )}
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
            <button
              type="submit"
              className="modal-btn modal-btn-primary"
              disabled={!canSubmit}
            >
              {busy ? <MianxLoader variant="inline" label="Creating project…" /> : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
