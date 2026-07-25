"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import OverviewCards from "@/components/admin/OverviewCards";
import MianxLoader from "@/components/shared/MianxLoader";
import DelayedLoader from "@/components/shared/DelayedLoader";
import { afterNextPaint } from "@/lib/after-paint";

export default function AdminOverviewPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [notConfigured, setNotConfigured] = useState(false);
  const [refreshedAt, setRefreshedAt] = useState(null);
  const loadSeqRef = useRef(0);
  const abortRef = useRef(null);

  const load = useCallback(
    async ({ background = false } = {}) => {
      const seq = ++loadSeqRef.current;
      // Immediate pending feedback — must paint before network work.
      if (background) setRefreshing(true);
      else setBootstrapping(true);
      setError("");
      setNotConfigured(false);

      await afterNextPaint();
      if (seq !== loadSeqRef.current) return;

      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      try {
        const res = await fetch("/api/admin/overview", { signal: ac.signal });
        if (seq !== loadSeqRef.current) return;
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        if (res.status === 503) {
          setNotConfigured(true);
          if (!background) setData(null);
          setRefreshedAt(new Date());
          return;
        }
        const json = await res.json().catch(() => ({}));
        if (seq !== loadSeqRef.current) return;
        if (!res.ok) {
          throw new Error(json?.error?.message || json?.error || "Failed to load overview");
        }
        setData(json);
        setRefreshedAt(new Date());
      } catch (err) {
        if (err?.name === "AbortError") return;
        if (seq !== loadSeqRef.current) return;
        setError(err.message || "Failed to load overview");
        if (!background) setData(null);
      } finally {
        if (seq === loadSeqRef.current) {
          setBootstrapping(false);
          setRefreshing(false);
        }
      }
    },
    [router]
  );

  useEffect(() => {
    void load({ background: false });
    return () => {
      loadSeqRef.current += 1;
      abortRef.current?.abort();
    };
  }, [load]);

  const pending = bootstrapping || refreshing;

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
          <button
            type="button"
            className="header-btn-ghost"
            data-testid="admin-refresh"
            onClick={() => void load({ background: true })}
            disabled={pending}
          >
            {refreshing ? (
              <MianxLoader variant="inline" label="Refreshing overview…" />
            ) : (
              "Refresh"
            )}
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
      <DelayedLoader
        active={bootstrapping && !data && !error && !notConfigured}
        variant="section"
        label="Loading overview…"
      />
      {!bootstrapping && !error && !notConfigured && !data && (
        <div className="empty-state">
          <h3>No overview data</h3>
          <p>The overview API returned an empty response.</p>
        </div>
      )}
      {data && <OverviewCards data={data} />}
    </AdminShell>
  );
}
