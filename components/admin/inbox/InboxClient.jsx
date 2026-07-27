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

export default function InboxClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const [inboxRes, ccRes] = await Promise.all([
      fetchJson(`/api/admin/inbox${q}`, router),
      fetchJson("/api/admin/command-center", router),
    ]);
    setLoading(false);
    if (!inboxRes.ok) {
      setError(inboxRes.data?.error?.message || "Failed to load Founder Inbox");
      setData(null);
      return;
    }
    setData(inboxRes.data);
    if (ccRes.ok && Array.isArray(ccRes.data?.projects)) {
      setProjects(ccRes.data.projects);
    }
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  const onProject = (id) => {
    const next = new URLSearchParams();
    if (id) next.set("project_id", id);
    const qs = next.toString();
    router.replace(qs ? `/admin/inbox?${qs}` : "/admin/inbox");
  };

  return (
    <AdminShell
      title="Founder Inbox"
      actions={
        <label className="cc-project-select">
          <span className="sr-only">Project filter</span>
          <select
            value={projectId}
            onChange={(e) => onProject(e.target.value)}
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
          Operational attention queue — not email. Items link to source state.
        </p>
        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading Founder Inbox…" />
          </DelayedLoader>
        ) : null}
        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}
        {data ? (
          <>
            <p className="cc-metric-value" style={{ fontSize: "1.1rem" }}>
              {data.attentionCount} requiring attention
            </p>
            {data.items.length === 0 ? (
              <p className="cc-muted">No attention items right now.</p>
            ) : (
              <ul className="inbox-list">
                {data.items.map((item) => (
                  <li key={item.id} className={`inbox-item severity-${item.severity}`}>
                    <div>
                      <span className="inbox-kind">{item.kind.replace(/_/g, " ")}</span>
                      <h2 className="inbox-title">{item.title}</h2>
                      <p className="cc-muted">{item.detail}</p>
                      {item.riskLabel ? (
                        <p className="inbox-risk">{item.riskLabel}</p>
                      ) : null}
                    </div>
                    <Link href={item.href} className="header-btn">
                      Open
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : null}
      </div>
    </AdminShell>
  );
}
