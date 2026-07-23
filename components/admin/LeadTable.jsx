"use client";

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return "—";
  }
}

export default function LeadTable({ leads, onSelect, emptyMessage }) {
  if (leads.length === 0) {
    return (
      <div className="table-container">
        <div className="empty-state">
          <div className="empty-state-icon" aria-hidden="true">📄</div>
          <h3>No submissions found</h3>
          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container" role="table" aria-label="Leads">
      <div className="table-header" role="row">
        <div role="columnheader">Name</div>
        <div role="columnheader">Email</div>
        <div role="columnheader">Industry</div>
        <div role="columnheader">Date</div>
        <div role="columnheader">Status</div>
        <div role="columnheader">
          <span className="sr-only">Actions</span>
        </div>
      </div>
      {leads.map((lead) => (
        <button
          key={lead.id}
          type="button"
          className="table-row"
          role="row"
          onClick={() => onSelect(lead)}
        >
          <div className="table-cell name" role="cell" data-label="Name">{lead.name}</div>
          <div className="table-cell email" role="cell" data-label="Email">{lead.email}</div>
          <div className="table-cell" role="cell" data-label="Industry">{lead.industry || "—"}</div>
          <div className="table-cell" role="cell" data-label="Date">{fmtDate(lead.created_at)}</div>
          <div className="table-cell" role="cell" data-label="Status">
            <span className={`status-badge status-${lead.status || "new"}`}>{lead.status || "new"}</span>
          </div>
          <div className="table-cell actions" role="cell" data-label="Open">
            <span className="action-btn" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
