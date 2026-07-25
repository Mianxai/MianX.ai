"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import BrandLogo from "@/components/BrandLogo";

const STATUS_CYCLE = ["new", "contacted", "converted", "closed"];
const FILTERS = ["all", "new", "contacted", "converted", "closed"];

function cap(s) {
  if (!s) return "-";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(null);

  const loadLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/leads");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load leads");
      setLeads(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadLeads();
    const t = setInterval(loadLeads, 10000);
    return () => clearInterval(t);
  }, [loadLeads]);

  const stats = useMemo(() => ({
    total: leads.length,
    new: leads.filter((l) => (l.status || "new") === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
  }), [leads]);

  const filtered = useMemo(() => {
    let list = filter === "all" ? leads : leads.filter((l) => (l.status || "new") === filter);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((l) =>
        (l.name || "").toLowerCase().includes(q) ||
        (l.email || "").toLowerCase().includes(q) ||
        (l.industry || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [leads, filter, search]);

  async function patchLead(id, body) {
    const res = await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Update failed");
    setLeads((prev) => prev.map((l) => (l.id === id ? data : l)));
    setActive((cur) => (cur && cur.id === id ? data : cur));
  }

  async function cycleStatus(lead) {
    const idx = STATUS_CYCLE.indexOf(lead.status || "new");
    const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
    try {
      await patchLead(lead.id, { status: next });
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteLead(id) {
    if (!window.confirm("Are you sure you want to delete this submission?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setActive((cur) => (cur && cur.id === id ? null : cur));
    } catch (err) {
      setError(err.message);
    }
  }

  function exportCsv() {
    const rows = [
      ["ID", "Name", "Email", "Company", "Phone", "Industry", "Message", "Date", "Status"],
      ...leads.map((l) => [l.id, l.name, l.email, l.company, l.phone, l.industry, l.need, l.created_at, l.status]),
    ];
    const csv = rows
      .map((row) => row.map((cell) => `"${(cell ?? "").toString().replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mianx_submissions_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function logout() {
    try {
      const supabase = getSupabase();
      await supabase.auth.signOut();
    } catch {
      /* ignore */
    }
    document.cookie = "sb-access-token=; path=/; max-age=0; SameSite=Lax";
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <BrandLogo size={36} />
          <span className="sidebar-logo-text">MianX.ai</span>
        </div>
        <ul className="sidebar-nav">
          <li><a className="active"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>Dashboard</a></li>
          <li><a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>Submissions<span className="sidebar-badge">{stats.new}</span></a></li>
          <li><a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>Analytics</a></li>
          <li><a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>Settings</a></li>
        </ul>
        <div className="sidebar-footer">
          <a className="sidebar-nav" onClick={logout} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", borderRadius: 10, color: "var(--text-secondary)", cursor: "pointer", fontSize: "0.9rem", fontWeight: 500 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            Log out
          </a>
        </div>
      </aside>

      <main className="main">
        <div className="header">
          <h1>Dashboard</h1>
          <div className="header-actions">
            <input className="header-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search submissions..." />
            <button className="header-btn" onClick={exportCsv}>Export CSV</button>
          </div>
        </div>

        {error && <div className="form-message error" style={{ display: "flex", marginBottom: "1.5rem" }}>{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-header"><span className="stat-card-label">Total Submissions</span><div className="stat-card-icon" style={{ background: "rgba(99,102,241,0.15)" }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg></div></div>
            <div className="stat-card-value">{stats.total}</div>
            <div className="stat-card-change up">All time</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header"><span className="stat-card-label">New Leads</span><div className="stat-card-icon" style={{ background: "rgba(34,197,94,0.15)" }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg></div></div>
            <div className="stat-card-value" style={{ color: "#22c55e" }}>{stats.new}</div>
            <div className="stat-card-change up">Awaiting response</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header"><span className="stat-card-label">Contacted</span><div className="stat-card-icon" style={{ background: "rgba(245,158,11,0.15)" }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg></div></div>
            <div className="stat-card-value" style={{ color: "#f59e0b" }}>{stats.contacted}</div>
            <div className="stat-card-change">In progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header"><span className="stat-card-label">Converted</span><div className="stat-card-icon" style={{ background: "rgba(6,182,212,0.15)" }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div></div>
            <div className="stat-card-value" style={{ color: "#06b6d4" }}>{stats.converted}</div>
            <div className="stat-card-change up">Closed deals</div>
          </div>
        </div>

        <div className="filters">
          {FILTERS.map((f) => (
            <button key={f} className={`filter-btn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{cap(f)}</button>
          ))}
        </div>

        <div className="table-container">
          <div className="table-header">
            <div>ID</div><div>Name</div><div>Email</div><div>Industry</div><div>Date</div><div>Status</div><div>Actions</div>
          </div>
          <div>
            {loading ? (
              <div className="empty-state"><div className="empty-state-icon">{"\u23F3"}</div><h3>Loading…</h3></div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">{"\u{1F4C4}"}</div>
                <h3>No submissions found</h3>
                <p>{filter === "all" ? "Waiting for new leads..." : "No submissions with this status."}</p>
              </div>
            ) : (
              filtered.map((l) => (
                <div className="table-row" key={l.id} onClick={() => setActive(l)}>
                  <div className="table-cell">#{l.id.toString().slice(-6)}</div>
                  <div className="table-cell name">{l.name}</div>
                  <div className="table-cell email">{l.email}</div>
                  <div className="table-cell">{cap(l.industry)}</div>
                  <div className="table-cell">{new Date(l.created_at).toLocaleDateString()}</div>
                  <div className="table-cell">
                    <span className={`status-badge status-${l.status || "new"}`}>
                      <span style={{ width: 6, height: 6, background: "currentColor", borderRadius: "50%", display: "inline-block" }} />
                      {cap(l.status || "new")}
                    </span>
                  </div>
                  <div className="table-cell actions" onClick={(e) => e.stopPropagation()}>
                    <button className="action-btn" title="View" onClick={() => setActive(l)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    </button>
                    <button className="action-btn" title="Delete" onClick={() => deleteLead(l.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {active && (
        <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) setActive(null); }}>
          <div className="modal">
            <div className="modal-header">
              <h3>Submission Details</h3>
              <button className="modal-close" onClick={() => setActive(null)} aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row"><span className="detail-label">Name</span><span className="detail-value">{active.name}</span></div>
              <div className="detail-row"><span className="detail-label">Email</span><span className="detail-value">{active.email}</span></div>
              <div className="detail-row"><span className="detail-label">Company</span><span className="detail-value">{active.company || "-"}</span></div>
              <div className="detail-row"><span className="detail-label">Phone</span><span className="detail-value">{active.phone || "-"}</span></div>
              <div className="detail-row"><span className="detail-label">Industry</span><span className="detail-value">{cap(active.industry)}</span></div>
              <div className="detail-row"><span className="detail-label">Date</span><span className="detail-value">{new Date(active.created_at).toLocaleString()}</span></div>
              <div className="detail-row"><span className="detail-label">Status</span><span className="detail-value"><span className={`status-badge status-${active.status || "new"}`}>{cap(active.status || "new")}</span></span></div>
              <div style={{ marginTop: "1rem" }}><span className="detail-label">Message</span></div>
              <div className="detail-message">{active.need}</div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn modal-btn-secondary" onClick={() => deleteLead(active.id)}>Delete</button>
              <button className="modal-btn modal-btn-primary" onClick={() => cycleStatus(active)}>Update Status</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
