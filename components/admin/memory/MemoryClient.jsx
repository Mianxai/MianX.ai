"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import DelayedLoader from "@/components/shared/DelayedLoader";
import MianxLoader from "@/components/shared/MianxLoader";

async function fetchJson(path, router, opts) {
  const res = await fetch(path, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    ...opts,
  });
  if (res.status === 401) {
    router?.push("/admin/login");
    return { ok: false, data: null };
  }
  const data = await res.json().catch(() => null);
  return { ok: res.ok, data };
}

export default function MemoryClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const res = await fetchJson(`/api/admin/memory${q}`, router);
    setLoading(false);
    if (!res.ok) {
      setError(res.data?.error?.message || "Failed to load memory");
      return;
    }
    setData(res.data);
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <AdminShell title="Memory">
      <div className="cc-page">
        <p className="cc-muted">
          Scoped enterprise memory. Candidates are not trusted until validated.
          Cross-project access is denied by default.
        </p>
        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading memory…" />
          </DelayedLoader>
        ) : null}
        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}
        {data?.note ? <p className="cc-muted">{data.note}</p> : null}
        {data?.items?.length ? (
          <ul className="inbox-list">
            {data.items.map((item) => (
              <li key={item.id} className="inbox-item">
                <div>
                  <span className="inbox-kind">
                    {item.memory_type} · {item.verification_status}
                  </span>
                  <h2 className="inbox-title">{item.content?.slice(0, 160)}</h2>
                  <p className="cc-muted">
                    {item.scope_type}
                    {item.project_id ? ` · project ${item.project_id.slice(0, 8)}…` : ""}
                    {` · confidence ${item.confidence}`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : data ? (
          <p className="cc-muted">No activity yet</p>
        ) : null}
      </div>
    </AdminShell>
  );
}
