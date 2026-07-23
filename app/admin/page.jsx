"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
import AdminLeadList from "@/components/AdminLeadList";
import AdminLeadDetail from "@/components/AdminLeadDetail";

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load leads");
      setLeads(data);
      setActiveId((cur) => cur ?? (data[0]?.id || null));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  function onUpdated(updated) {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  }

  async function logout() {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
    document.cookie = "sb-access-token=; path=/; max-age=0; SameSite=Lax";
    router.push("/admin/login");
    router.refresh();
  }

  const active = leads.find((l) => l.id === activeId) || null;

  return (
    <main className="container">
      <div className="admin-head">
        <Link href="/" className="brand">
          <span className="brand-dot" />
          Mianx<span style={{ color: "var(--accent-2)" }}>.ai</span>
          <span className="muted" style={{ fontWeight: 500, marginLeft: 8 }}>
            / lead intelligence
          </span>
        </Link>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn" onClick={loadLeads}>Refresh</button>
          <button className="btn" onClick={logout}>Log out</button>
        </div>
      </div>

      {error && <div className="notice err">{error}</div>}

      <div className="admin-shell">
        <div>
          <div className="muted" style={{ margin: "0 0 10px" }}>
            {loading ? "Loading…" : `${leads.length} lead${leads.length === 1 ? "" : "s"}`}
          </div>
          <AdminLeadList leads={leads} activeId={activeId} onSelect={setActiveId} />
        </div>
        <AdminLeadDetail lead={active} onUpdated={onUpdated} />
      </div>
    </main>
  );
}
