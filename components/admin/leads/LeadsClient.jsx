"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { leadsToCsv } from "@/lib/csv";
import AdminShell from "@/components/admin/AdminShell";
import StatsGrid from "@/components/admin/StatsGrid";
import FiltersBar from "@/components/admin/FiltersBar";
import LeadTable from "@/components/admin/LeadTable";
import LeadDetailModal from "@/components/admin/LeadDetailModal";
import AdminLoadingRegion from "@/components/admin/AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";
import DelayedLoader from "@/components/shared/DelayedLoader";
import { invalidateSubmissionCount } from "@/lib/admin-notifications";
import { currentAdminLoginHref } from "@/lib/admin-return-to";

function LeadsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams?.get("status") || "all";

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notConfigured, setNotConfigured] = useState(false);
  const [filter, setFilter] = useState(
    ["new", "contacted", "converted", "closed"].includes(statusParam)
      ? statusParam
      : "all"
  );
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (["new", "contacted", "converted", "closed"].includes(statusParam)) {
      setFilter(statusParam);
    } else if (statusParam === "all" || !statusParam) {
      setFilter("all");
    }
  }, [statusParam]);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    setNotConfigured(false);
    try {
      const res = await fetch("/api/leads");
      if (res.status === 401) {
        router.push(currentAdminLoginHref("/admin/leads"));
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

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  const visibleLeads = (() => {
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
  })();

  function onFilterChange(next) {
    setFilter(next);
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (next === "all") params.delete("status");
    else params.set("status", next);
    const qs = params.toString();
    router.replace(qs ? `/admin/leads?${qs}` : "/admin/leads");
  }

  function onUpdated(updated) {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    setSelected((cur) => (cur && cur.id === updated.id ? updated : cur));
    invalidateSubmissionCount();
  }

  function onArchived(id) {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    setSelected(null);
    invalidateSubmissionCount();
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

  return (
    <AdminShell
      title="Leads"
      actions={
        <>
          <label htmlFor="admin-search" className="sr-only">
            Search submissions
          </label>
          <input
            id="admin-search"
            type="search"
            className="header-search"
            placeholder="Search submissions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            className="header-btn"
            onClick={exportCsv}
            disabled={visibleLeads.length === 0}
          >
            Export CSV
          </button>
          <button type="button" className="header-btn-ghost" onClick={loadLeads} disabled={loading}>
            {loading ? <MianxLoader variant="inline" label="Refreshing submissions…" /> : "Refresh"}
          </button>
        </>
      }
    >
      {notConfigured && (
        <div className="admin-notice" role="alert">
          Configuration error: this deployment has no Supabase environment variables set
          (<code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,
          <code> SUPABASE_SERVICE_ROLE_KEY</code>). Lead data cannot load until they are
          configured.
        </div>
      )}
      {error && !notConfigured && (
        <div className="admin-notice error" role="alert">
          {error}
        </div>
      )}

      {!notConfigured && (
        <>
          <StatsGrid stats={stats} />
          <FiltersBar active={filter} onChange={onFilterChange} />
          {loading && leads.length === 0 ? (
            <DelayedLoader
              active
              variant="section"
              label="Loading leads…"
            />
          ) : (
            <>
              <div aria-live="polite" className="sr-only">
                {`${visibleLeads.length} submissions shown`}
              </div>
              <LeadTable
                leads={visibleLeads}
                onSelect={setSelected}
                emptyMessage={
                  filter === "all" && !search
                    ? "Waiting for new leads…"
                    : "No submissions match this filter or search."
                }
              />
            </>
          )}
        </>
      )}

      {selected && (
        <LeadDetailModal
          lead={selected}
          onClose={() => setSelected(null)}
          onUpdated={onUpdated}
          onArchived={onArchived}
        />
      )}
    </AdminShell>
  );
}

export default function LeadsClient() {
  return (
    <Suspense
      fallback={
        <AdminShell title="Leads">
          <AdminLoadingRegion>
            <MianxLoader variant="section" label="Loading leads…" />
          </AdminLoadingRegion>
        </AdminShell>
      }
    >
      <LeadsContent />
    </Suspense>
  );
}
