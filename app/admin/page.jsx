"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import { leadsToCsv } from "@/lib/csv";
import Sidebar from "@/components/admin/Sidebar";
import StatsGrid from "@/components/admin/StatsGrid";
import FiltersBar from "@/components/admin/FiltersBar";
import LeadTable from "@/components/admin/LeadTable";
import LeadDetailModal from "@/components/admin/LeadDetailModal";

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notConfigured, setNotConfigured] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarCloseRef = useRef(null);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    setNotConfigured(false);
    try {
      const res = await fetch("/api/leads");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (res.status === 503) {
        setNotConfigured(true);
        setLeads([]);
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load leads");
      setLeads(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const stats = useMemo(
    () => ({
      total: leads.length,
      new: leads.filter((l) => l.status === "new").length,
      contacted: leads.filter((l) => l.status === "contacted").length,
      converted: leads.filter((l) => l.status === "converted").length,
    }),
    [leads]
  );

  const visibleLeads = useMemo(() => {
    let list = leads;
    if (filter !== "all") list = list.filter((l) => (l.status || "new") === filter);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (l) =>
          l.name?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q) ||
          l.company?.toLowerCase().includes(q) ||
          l.industry?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [leads, filter, search]);

  function onUpdated(updated) {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    setSelected((cur) => (cur && cur.id === updated.id ? updated : cur));
  }

  function onArchived(id) {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    setSelected(null);
  }

  function exportCsv() {
    const csv = leadsToCsv(visibleLeads);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mianx_leads_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function logout() {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
    document.cookie = "sb-access-token=; path=/; max-age=0; SameSite=Lax";
    router.push("/admin/login");
    router.refresh();
  }

  function openSidebar() {
    setSidebarOpen(true);
  }
  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="admin-app">
      <Sidebar
        open={sidebarOpen}
        onClose={closeSidebar}
        view={filter === "new" ? "new" : "all"}
        onSelectView={(v) => {
          setFilter(v);
          closeSidebar();
        }}
        newCount={stats.new}
        closeBtnRef={sidebarCloseRef}
      />

      <main className="admin-main" id="main-content">
        <div className="admin-header">
          <div className="admin-header-left">
            <button className="sidebar-open-btn" aria-label="Open navigation" onClick={openSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h1>Dashboard</h1>
          </div>
          <div className="header-actions">
            <label htmlFor="admin-search" className="sr-only">Search submissions</label>
            <input
              id="admin-search"
              type="search"
              className="header-search"
              placeholder="Search submissions…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="header-btn" onClick={exportCsv} disabled={visibleLeads.length === 0}>
              Export CSV
            </button>
            <button className="header-btn-ghost" onClick={loadLeads}>Refresh</button>
            <button className="header-btn-ghost" onClick={logout}>Log out</button>
          </div>
        </div>

        {notConfigured && (
          <div className="admin-notice" role="alert">
            Configuration error: this deployment has no Supabase environment variables set
            (<code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,
            <code> SUPABASE_SERVICE_ROLE_KEY</code>). Lead data cannot load until they are configured.
          </div>
        )}
        {error && !notConfigured && <div className="admin-notice error" role="alert">{error}</div>}

        {!notConfigured && (
          <>
            <StatsGrid stats={stats} />
            <FiltersBar active={filter} onChange={setFilter} />
            <div aria-live="polite" className="sr-only">
              {loading ? "Loading submissions…" : `${visibleLeads.length} submissions shown`}
            </div>
            <LeadTable
              leads={visibleLeads}
              onSelect={setSelected}
              emptyMessage={
                loading
                  ? "Loading…"
                  : filter === "all" && !search
                    ? "Waiting for new leads…"
                    : "No submissions match this filter or search."
              }
            />
          </>
        )}
      </main>

      {selected && (
        <LeadDetailModal
          lead={selected}
          onClose={() => setSelected(null)}
          onUpdated={onUpdated}
          onArchived={onArchived}
        />
      )}
    </div>
  );
}
