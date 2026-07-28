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

export default function LearningClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams?.get("project_id") || "";
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const q = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
    const res = await fetchJson(`/api/admin/learning${q}`, router);
    setLoading(false);
    if (!res.ok) {
      setError(res.data?.error?.message || "Failed to load learning");
      return;
    }
    setData(res.data);
  }, [projectId, router]);

  useEffect(() => {
    load();
  }, [load]);

  async function decide(id, decision) {
    setBusy(id + decision);
    const res = await fetchJson("/api/admin/learning", router, {
      method: "POST",
      body: JSON.stringify({ id, decision }),
    });
    setBusy("");
    if (!res.ok) {
      setError(res.data?.error?.message || "Decision failed");
      return;
    }
    await load();
  }

  return (
    <AdminShell title="Learning">
      <div className="cc-page">
        <p className="cc-muted">
          Verified learning candidates. Unsafe capability or prompt self-modification
          proposals are rejected. Promotion never rewrites agent system prompts.
        </p>
        {loading && !data ? (
          <DelayedLoader delayMs={200}>
            <MianxLoader variant="section" label="Loading learning…" />
          </DelayedLoader>
        ) : null}
        {error ? (
          <div className="cc-banner cc-banner-error" role="alert">
            {error}
          </div>
        ) : null}
        {data?.items?.length ? (
          <ul className="inbox-list">
            {data.items.map((item) => (
              <li key={item.id} className="inbox-item">
                <div>
                  <span className="inbox-kind">
                    {item.status} · {item.risk_class}
                  </span>
                  <h2 className="inbox-title">{item.proposed_lesson?.slice(0, 160)}</h2>
                  <p className="cc-muted">{item.problem}</p>
                  {item.agent_slug ? (
                    <p className="cc-muted">Agent: {item.agent_slug}</p>
                  ) : null}
                </div>
                <div style={{ display: "grid", gap: "0.35rem" }}>
                  {["review", "validate", "reject", "promote"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      className="header-btn-ghost"
                      disabled={Boolean(busy)}
                      onClick={() => decide(item.id, d)}
                    >
                      {d}
                    </button>
                  ))}
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
