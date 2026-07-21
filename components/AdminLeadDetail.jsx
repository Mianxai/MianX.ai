"use client";

import { useState } from "react";

const STATUSES = ["new", "contacted", "qualified", "closed"];

export default function AdminLeadDetail({ lead, onUpdated }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);
  const [error, setError] = useState("");

  if (!lead) {
    return (
      <div className="panel">
        <div className="empty">Select a lead to view details and run the AI agent.</div>
      </div>
    );
  }

  const analysis = lead.analysis;

  async function runAgent() {
    setAnalyzing(true);
    setError("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      // Persist the analysis on the lead.
      const patch = await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis: data }),
      });
      const updated = await patch.json();
      if (!patch.ok) throw new Error(updated.error || "Could not save analysis");
      onUpdated(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  }

  async function setStatus(status) {
    setSavingStatus(true);
    setError("");
    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not update status");
      onUpdated(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingStatus(false);
    }
  }

  return (
    <div className="panel">
      <div className="lc-top" style={{ marginBottom: 6 }}>
        <h3 style={{ margin: 0 }}>{lead.name}</h3>
        <span className={`badge ${lead.status || "new"}`}>{lead.status || "new"}</span>
      </div>

      <div style={{ marginTop: 12 }}>
        <div className="detail-row"><span className="k">Email</span><span>{lead.email}</span></div>
        <div className="detail-row"><span className="k">Company</span><span>{lead.company || "—"}</span></div>
        <div className="detail-row"><span className="k">Budget</span><span>{lead.budget || "—"}</span></div>
        <div className="detail-row"><span className="k">Need</span><span>{lead.need}</span></div>
        <div className="detail-row"><span className="k">Received</span><span>{new Date(lead.created_at).toLocaleString()}</span></div>
      </div>

      <div className="status-row">
        <button className="btn btn-primary" onClick={runAgent} disabled={analyzing}>
          {analyzing ? (<><span className="spin" /> Running AI agent…</>) : "Run AI agent"}
        </button>
        <span className="muted">Status:</span>
        {STATUSES.map((s) => (
          <button
            key={s}
            className={`btn ${lead.status === s ? "btn-primary" : ""}`}
            onClick={() => setStatus(s)}
            disabled={savingStatus}
            style={{ padding: "8px 12px", textTransform: "capitalize" }}
          >
            {s}
          </button>
        ))}
      </div>

      {error && <div className="notice err" style={{ marginTop: 14 }}>{error}</div>}

      {analysis && (
        <div style={{ marginTop: 22 }}>
          <div className="score-ring">
            <div className="score-num">{analysis.score}</div>
            <div>
              <span className={`badge ${analysis.temperature}`}>{analysis.temperature}</span>
              <div className="muted" style={{ marginTop: 6 }}>Lead score</div>
            </div>
          </div>

          <div className="analysis-block">
            <h4>Summary</h4>
            <p style={{ margin: 0, lineHeight: 1.6 }}>{analysis.summary}</p>
          </div>

          <div className="analysis-block">
            <h4>Suggested reply</h4>
            <div className="reply-box">{analysis.reply}</div>
          </div>

          {Array.isArray(analysis.actions) && (
            <div className="analysis-block">
              <h4>Recommended actions</h4>
              <ul className="action-list">
                {analysis.actions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
