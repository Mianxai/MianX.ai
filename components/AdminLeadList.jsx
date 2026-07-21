"use client";

export default function AdminLeadList({ leads, activeId, onSelect }) {
  if (!leads.length) {
    return (
      <div className="panel">
        <div className="empty">No leads yet. Submissions will appear here.</div>
      </div>
    );
  }

  return (
    <div className="panel" style={{ padding: 14 }}>
      <div className="lead-list">
        {leads.map((lead) => {
          const temp = lead.analysis?.temperature;
          return (
            <button
              key={lead.id}
              className={`lead-card ${activeId === lead.id ? "active" : ""}`}
              onClick={() => onSelect(lead.id)}
            >
              <div className="lc-top">
                <span className="lc-name">{lead.name}</span>
                <span className={`badge ${lead.status || "new"}`}>
                  {lead.status || "new"}
                </span>
              </div>
              <div className="lc-need">{lead.company || lead.email}</div>
              <div className="lc-need">{lead.need}</div>
              {temp && (
                <span
                  className={`badge ${temp}`}
                  style={{ marginTop: 8, display: "inline-block" }}
                >
                  {temp} · {lead.analysis?.score}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
