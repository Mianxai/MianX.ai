"use client";

export default function StatsGrid({ stats }) {
  const cards = [
    {
      label: "Total Submissions",
      value: stats.total,
      color: "#818cf8",
      bg: "rgba(99,102,241,0.15)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
      ),
      change: "All time",
    },
    {
      label: "New Leads",
      value: stats.new,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.15)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /></svg>
      ),
      change: "Awaiting response",
    },
    {
      label: "Contacted",
      value: stats.contacted,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" /></svg>
      ),
      change: "In progress",
    },
    {
      label: "Converted",
      value: stats.converted,
      color: "#06b6d4",
      bg: "rgba(6,182,212,0.15)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      ),
      change: "Closed deals",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((c) => (
        <div className="stat-card" key={c.label}>
          <div className="stat-card-header">
            <span className="stat-card-label">{c.label}</span>
            <div className="stat-card-icon" style={{ background: c.bg }} aria-hidden="true">{c.icon}</div>
          </div>
          <div className="stat-card-value" style={{ color: c.color }}>{c.value}</div>
          <div className="stat-card-change">{c.change}</div>
        </div>
      ))}
    </div>
  );
}
