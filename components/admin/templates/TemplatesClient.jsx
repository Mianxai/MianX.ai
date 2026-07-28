"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import EmptyState from "@/components/admin/EmptyState";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import ProjectPicker from "@/components/admin/ProjectPicker";
import MianxLoader from "@/components/shared/MianxLoader";
import { currentAdminLoginHref } from "@/lib/admin-return-to";
import { useAdminProject } from "@/lib/admin-project";

const KINDS = [
  { id: "overview", label: "Overview" },
  { id: "industry", label: "Industries" },
  { id: "business_model", label: "Business models" },
  { id: "capability", label: "Capabilities" },
  { id: "module", label: "Modules" },
  { id: "workflow", label: "Workflows" },
  { id: "compliance", label: "Compliance" },
  { id: "architecture", label: "Architecture" },
  { id: "risk", label: "Risks" },
  { id: "kpi", label: "KPIs" },
  { id: "department", label: "Departments" },
];

async function getJson(path, router) {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push(currentAdminLoginHref("/admin/templates"));
    return { ok: false, status: 401, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };
}

export default function TemplatesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { projectId, setProjectId } = useAdminProject();
  const kind = searchParams?.get("kind") || "overview";
  const [q, setQ] = useState(searchParams?.get("q") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [overview, setOverview] = useState(null);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [versions, setVersions] = useState([]);
  const [relations, setRelations] = useState([]);
  const [busy, setBusy] = useState(false);

  const setKind = useCallback(
    (next) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      if (next === "overview") params.delete("kind");
      else params.set("kind", next);
      if (projectId) params.set("project_id", projectId);
      const qs = params.toString();
      router.replace(qs ? `/admin/templates?${qs}` : "/admin/templates");
    },
    [router, searchParams, projectId]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    if (kind === "overview") {
      const res = await getJson("/api/admin/templates?action=overview", router);
      setLoading(false);
      if (!res.ok) {
        setError(res.data?.error?.message || "Failed to load templates");
        return;
      }
      setOverview(res.data);
      setItems([]);
      return;
    }
    const qs = new URLSearchParams({ kind });
    if (q) qs.set("q", q);
    const [listRes, relRes] = await Promise.all([
      getJson(`/api/admin/templates?${qs}`, router),
      getJson("/api/admin/templates?action=relations", router),
    ]);
    setLoading(false);
    if (!listRes.ok) {
      setError(listRes.data?.error?.message || "Failed to load templates");
      return;
    }
    setItems(listRes.data?.items || []);
    setRelations(relRes.data?.relations || []);
  }, [kind, q, router]);

  useEffect(() => {
    load();
  }, [load]);

  async function openDetail(item) {
    setSelected(item);
    setBusy(true);
    const res = await getJson(
      `/api/admin/templates?action=versions&kind=${encodeURIComponent(item.kind || kind)}&slug=${encodeURIComponent(item.slug)}`,
      router
    );
    setBusy(false);
    setVersions(res.data?.versions || []);
  }

  const related = useMemo(() => {
    if (!selected) return [];
    return relations.filter(
      (r) =>
        (r.from_type === (selected.kind || kind) && r.from_id === selected.slug) ||
        (r.to_type === (selected.kind || kind) && r.to_id === selected.slug)
    );
  }, [selected, relations, kind]);

  return (
    <AdminShell
      title="Templates"
      breadcrumbs={[
        { href: "/admin/command-center", label: "Admin" },
        { label: "Templates" },
      ]}
      actions={
        <ProjectPicker
          value={projectId}
          onChange={(id) => setProjectId(id)}
          allowAll
        />
      }
    >
      <PageHeader
        title="Template Intelligence"
        description="Reusable industry, capability, module, and risk templates. Not an industry product. Deterministic catalog — provider optional."
      />

      <div className="admin-tabs" role="tablist" aria-label="Template kinds">
        {KINDS.map((k) => (
          <button
            key={k.id}
            type="button"
            role="tab"
            aria-selected={kind === k.id}
            className={kind === k.id ? "active" : ""}
            onClick={() => setKind(k.id)}
          >
            {k.label}
          </button>
        ))}
      </div>

      {kind !== "overview" ? (
        <div className="admin-action-bar admin-action-bar--start" style={{ margin: "0.75rem 0" }}>
          <label>
            <span className="sr-only">Search templates</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search slug or name"
              aria-label="Search templates"
            />
          </label>
          <button type="button" className="btn btn-secondary" onClick={load} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      ) : null}

      {loading ? (
        <MianxLoader variant="section" label="Loading templates…" />
      ) : error ? (
        <div className="admin-error-state" role="alert">
          <h2>Could not load templates</h2>
          <p>{error}</p>
          <button type="button" className="btn btn-secondary" onClick={load}>
            Retry
          </button>
        </div>
      ) : kind === "overview" ? (
        <div className="admin-table-wrap">
          <p className="cc-muted">{overview?.note}</p>
          <p className="cc-muted">Engine: {overview?.engine_version}</p>
          {projectId ? (
            <p className="cc-muted">
              Project context: <code>{projectId}</code>
            </p>
          ) : (
            <p className="cc-muted">Project context: all projects (catalog is platform-scoped)</p>
          )}
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Kind</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(overview?.counts || {}).map(([k, v]) => (
                <tr key={k}>
                  <td>{k}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="admin-empty-cta" style={{ marginTop: "1rem" }}>
            <Link className="header-btn" href="/admin/company-builder">
              Open Company Builder
            </Link>
          </div>
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title="No templates in this view"
          reason="No catalog rows matched the current kind/search."
          configuration="Templates are platform catalog definitions — not live industry products."
          nextAction="Clear search or pick another kind."
          projectLabel={projectId || "all projects"}
          cta={
            <button type="button" className="btn btn-secondary" onClick={() => setQ("")}>
              Clear search
            </button>
          }
        />
      ) : (
        <div className="cc-layout">
          <div className="admin-table-wrap">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Status</th>
                  <th>Version</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <code>{item.slug}</code>
                    </td>
                    <td>
                      <StatusBadge tone={item.status === "active" ? "healthy" : "unconfigured"}>
                        {item.status}
                      </StatusBadge>
                    </td>
                    <td>v{item.version}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={busy}
                        onClick={() => openDetail(item)}
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <aside className="cc-side-col">
            {selected ? (
              <div className="cc-card">
                <h2>{selected.name}</h2>
                <p className="cc-muted">{selected.description}</p>
                <p>
                  <StatusBadge>{selected.status}</StatusBadge> · v{selected.version}
                </p>
                <h3>Version history</h3>
                {versions.length ? (
                  <ul>
                    {versions.map((v) => (
                      <li key={v.version}>
                        v{v.version} — {v.status}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="cc-muted">No version rows yet (seed on first load).</p>
                )}
                <h3>Relations</h3>
                {related.length ? (
                  <ul>
                    {related.map((r) => (
                      <li key={r.id}>
                        {r.from_type}:{r.from_id} —{r.relation_type}→ {r.to_type}:{r.to_id}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="cc-muted">No relations for this template.</p>
                )}
                <h3>Evidence</h3>
                <ul>
                  {(selected.evidence_refs || []).map((e, i) => (
                    <li key={i}>
                      {e.type}: {e.ref}
                    </li>
                  ))}
                </ul>
                {selected.kind === "compliance" || kind === "compliance" ? (
                  <p className="cc-muted" role="note">
                    Compliance packs require qualified human legal review. Not legal advice.
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="cc-card">
                <p className="cc-muted">Select Open on a row to inspect versions, relations, and evidence.</p>
              </div>
            )}
          </aside>
        </div>
      )}
    </AdminShell>
  );
}
