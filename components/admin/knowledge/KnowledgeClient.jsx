"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";

async function fetchJson(path, router) {
  const res = await fetch(path, { headers: { Accept: "application/json" } });
  if (res.status === 401) {
    router?.push("/admin/login");
    return { ok: false, data: null };
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { ok: res.ok, data };
}

export default function KnowledgeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const [kRes, ccRes] = await Promise.all([
      fetchJson(`/api/admin/knowledge${q}`, router),
      fetchJson("/api/admin/command-center", router),
    ]);
    setLoading(false);
    if (!kRes.ok) {
      setError(kRes.data?.error?.message || "Failed to load knowledge");
      return;
    }
    setData(kRes.data);
    if (ccRes.ok) setProjects(ccRes.data?.projects || []);
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <AdminShell
      title="Knowledge"
      actions={
        <label className="cc-project-select">
          <span className="sr-only">Project filter</span>
          <select
            value={projectId}
            onChange={(e) => {
              const v = e.target.value;
              router.replace(
                v
                  ? `/admin/knowledge?project_id=${encodeURIComponent(v)}`
                  : "/admin/knowledge"
              );
            }}
            aria-label="Filter by project"
          >
            <option value="">All projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      }
    >
      <div className="cc-page">
        <p className="cc-muted">
          Exposes existing scoped audit and run results. Not a new RAG platform.
        </p>
        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading knowledge…" />
          </DelayedLoader>
        ) : null}
        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}
        {data ? (
          <>
            <p className="cc-muted">{data.isolationNote}</p>
            {Object.entries(data.sections || {}).map(([key, section]) => (
              <section key={key} className="cc-card" aria-labelledby={`kn-${key}`}>
                <div className="cc-card-head">
                  <h2 id={`kn-${key}`}>{section.label}</h2>
                  <Link href={section.href} className="header-btn-ghost">
                    Open
                  </Link>
                </div>
                <p className="cc-muted">{section.note}</p>
                {section.available === false ? (
                  <p className="cc-unavailable">Data unavailable</p>
                ) : null}
                {Array.isArray(section.items) && section.items.length > 0 ? (
                  <ul className="cc-link-row" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                    {section.items.slice(0, 8).map((item) => (
                      <li key={item.id} className="cc-muted">
                        {item.action || item.agentSlug || item.id}
                        {item.createdAt ? ` · ${item.createdAt}` : ""}
                      </li>
                    ))}
                  </ul>
                ) : section.available !== false ? (
                  <p className="cc-muted">No activity</p>
                ) : null}
              </section>
            ))}
          </>
        ) : null}
      </div>
    </AdminShell>
  );
}
