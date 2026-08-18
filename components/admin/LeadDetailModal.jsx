"use client";

import { useRef, useState } from "react";
import { useFocusTrap } from "@/components/shared/useFocusTrap";
import { LEAD_STATUSES } from "@/lib/leads";

function fmtDateTime(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return "—";
  }
}

export default function LeadDetailModal({ lead, onClose, onUpdated, onArchived }) {
  const modalRef = useRef(null);
  const [status, setStatus] = useState(lead.status || "new");
  const [savingStatus, setSavingStatus] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiUnavailable, setAiUnavailable] = useState(false);
  const [error, setError] = useState("");

  useFocusTrap(modalRef, true, onClose);

  async function patchLead(body) {
    const res = await fetch(`/api/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Update failed");
    return data;
  }

  async function saveStatus(next) {
    setSavingStatus(true);
    setError("");
    try {
      const updated = await patchLead({ status: next });
      setStatus(next);
      onUpdated(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingStatus(false);
    }
  }

  async function archiveLead() {
    setArchiving(true);
    setError("");
    try {
      await patchLead({ archived: true });
      onArchived(lead.id);
    } catch (err) {
      setError(err.message);
      setArchiving(false);
    }
  }

  async function runAgent() {
    setAnalyzing(true);
    setError("");
    setAiUnavailable(false);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.code === "ANTHROPIC_NOT_CONFIGURED") {
          setAiUnavailable(true);
          return;
        }
        throw new Error(data.error || "Analysis failed");
      }
      const updated = await patchLead({ analysis: data });
      onUpdated(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  const analysis = lead.analysis;

  return (
    <div className="modal-overlay" onMouseDown={handleOverlayClick}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        ref={modalRef}
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2 id="lead-modal-title">{lead.name}</h2>
          <button className="modal-close" aria-label="Close dialog" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-row"><span className="detail-label">Email</span><span className="detail-value">{lead.email}</span></div>
          <div className="detail-row"><span className="detail-label">Company</span><span className="detail-value">{lead.company || "—"}</span></div>
          <div className="detail-row"><span className="detail-label">Phone</span><span className="detail-value">{lead.phone || "—"}</span></div>
          <div className="detail-row"><span className="detail-label">Industry</span><span className="detail-value">{lead.industry || "—"}</span></div>
          <div className="detail-row"><span className="detail-label">Received</span><span className="detail-value">{fmtDateTime(lead.created_at)}</span></div>

          <div style={{ marginTop: "1rem" }}>
            <span className="detail-label">Message</span>
            {/* Rendered as plain React text content (no dangerouslySetInnerHTML) —
                any HTML/script characters a submitter typed are shown as inert
                text, never parsed or executed. */}
            <div className="detail-message">{lead.need}</div>
          </div>

          {error && <div className="admin-notice error" role="alert" style={{ marginTop: "1rem" }}>{error}</div>}

          <div className="ai-analysis-block">
            <h3>AI Analysis</h3>
            {aiUnavailable && (
              <div className="admin-notice info">
                AI analysis is unavailable on this deployment (no <code>ANTHROPIC_API_KEY</code> configured).
                Status updates and everything else below still work normally.
              </div>
            )}
            {!analysis && !aiUnavailable && (
              <button className="modal-btn modal-btn-primary" onClick={runAgent} disabled={analyzing}>
                {analyzing ? <><span className="spin" aria-hidden="true" /> Analyzing…</> : "Run AI Agent"}
              </button>
            )}
            {analysis && (
              <>
                <div className="ai-score">
                  <span className="ai-score-num">{analysis.score}<span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>/100</span></span>
                  <span className={`ai-temp ai-temp-${analysis.temperature}`}>{analysis.temperature}</span>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{analysis.summary}</p>
                <div className="detail-message" style={{ marginBottom: "0.75rem" }}>{analysis.reply}</div>
                {Array.isArray(analysis.actions) && analysis.actions.length > 0 && (
                  <ul style={{ paddingLeft: "1.1rem", color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                    {analysis.actions.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                )}
                <button className="modal-btn modal-btn-secondary" style={{ marginTop: "0.75rem" }} onClick={runAgent} disabled={analyzing}>
                  {analyzing ? "Re-running…" : "Re-run AI Agent"}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-footer-group">
            <button className="modal-btn modal-btn-danger" onClick={archiveLead} disabled={archiving}>
              {archiving ? "Archiving…" : "Archive"}
            </button>
          </div>
          <div className="modal-footer-group">
            <label htmlFor="status-select" className="sr-only">Update status</label>
            <select
              id="status-select"
              className="status-select"
              value={status}
              disabled={savingStatus}
              onChange={(e) => saveStatus(e.target.value)}
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
