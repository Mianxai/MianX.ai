"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import OverviewCards from "@/components/admin/OverviewCards";

export default function AdminOverviewPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notConfigured, setNotConfigured] = useState(false);
  const [refreshedAt, setRefreshedAt] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    setNotConfigured(false);
    try {
      const res = await fetch("/api/admin/overview");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (res.status === 503) {
        setNotConfigured(true);
        setData(null);
        setRefreshedAt(new Date());
        return;
      }
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error?.message || json?.error || "Failed to load overview");
      }
      setData(json);
      setRefreshedAt(new Date());
    } catch (err) {
      setError(err.message || "Failed to load overview");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <AdminShell
      title="Overview"
      actions={
        <>
          {refreshedAt && (
            <span className="admin-refreshed" aria-live="polite">
              Last refreshed {refreshedAt.toLocaleTimeString()}
            </span>
          )}
          <button type="button" className="header-btn-ghost" onClick={load} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </>
      }
    >
      {notConfigured && (
        <div className="admin-notice" role="alert">
          Configuration unavailable: overview metrics cannot load until Supabase is configured.
          Check <Link href="/admin/settings">Settings</Link> for status.
        </div>
      )}
      {error && !notConfigured && (
        <div className="admin-notice error" role="alert">
          {error}
        </div>
      )}
      {loading && !data && !error && !notConfigured && (
        <p className="runtime-muted" role="status">
          Loading overview…
        </p>
      )}
      {!loading && !error && !notConfigured && !data && (
        <div className="empty-state">
          <h3>No overview data</h3>
          <p>The overview API returned an empty response.</p>
        </div>
      )}
      {data && <OverviewCards data={data} />}
    </AdminShell>
  );
}
