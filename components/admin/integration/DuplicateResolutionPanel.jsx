"use client";

import { useState } from "react";
import StatusBadge from "@/components/admin/StatusBadge";

function shortId(id) {
  if (!id) return "—";
  const s = String(id);
  return s.length > 12 ? `…${s.slice(-8)}` : s;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Founder-gated duplicate Founder-proof resolution panel.
 * Never cancels the canonical run.
 */
export default function DuplicateResolutionPanel({
  projectId,
  canonicalRun = null,
  duplicateRuns = [],
  canonicalReason = null,
  busy = false,
  onCancelDuplicate,
  onCancelAll,
  message = "",
  error = "",
}) {
  const [confirmTarget, setConfirmTarget] = useState(null); // run id or "all"
  const [pendingId, setPendingId] = useState("");
  const [copied, setCopied] = useState("");

  if (!projectId || !duplicateRuns?.length) return null;

  const canonicalId = canonicalRun?.id || null;

  async function confirmCancel() {
    if (!confirmTarget || busy || pendingId) return;
    setPendingId(confirmTarget === "all" ? "all" : confirmTarget);
    try {
      if (confirmTarget === "all") {
        await onCancelAll?.();
      } else {
        await onCancelDuplicate?.(confirmTarget);
      }
    } finally {
      setPendingId("");
      setConfirmTarget(null);
    }
  }

  return (
    <section
      className="cc-card duplicate-resolution-panel"
      data-testid="duplicate-resolution-panel"
      id="duplicates"
      aria-labelledby="duplicate-resolution-h"
    >
      <h2 id="duplicate-resolution-h">Resolve duplicate proof runs</h2>
      <p className="admin-warning" role="status">
        Multiple active Founder Production Proof runs exist for this project. Cancel non-canonical
        duplicates before submitting clarification. The canonical run will not be cancelled.
      </p>

      {canonicalRun ? (
        <div
          className="duplicate-resolution-canonical"
          data-testid="duplicate-canonical-card"
        >
          <h3>Canonical run (preserved)</h3>
          <dl className="cc-detail-dl">
            <div>
              <dt>Run ID</dt>
              <dd>
                <code data-testid="duplicate-canonical-id">{canonicalRun.id}</code>{" "}
                <button
                  type="button"
                  className="header-btn-ghost"
                  onClick={async () => {
                    const ok = await copyText(canonicalRun.id);
                    if (ok) setCopied(canonicalRun.id);
                  }}
                >
                  {copied === canonicalRun.id ? "Copied" : "Copy"}
                </button>
              </dd>
            </div>
            <div>
              <dt>Stage</dt>
              <dd>
                <StatusBadge status={canonicalRun.stage || canonicalRun.current_stage} />
              </dd>
            </div>
            <div>
              <dt>Proof status</dt>
              <dd>{canonicalRun.proof_status || "—"}</dd>
            </div>
            <div>
              <dt>Mode</dt>
              <dd>{canonicalRun.execution_mode || canonicalRun.mode || "—"}</dd>
            </div>
            <div>
              <dt>Started</dt>
              <dd>{canonicalRun.started_at || "—"}</dd>
            </div>
            {canonicalReason ? (
              <div>
                <dt>Canonical reason</dt>
                <dd>{canonicalReason}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      ) : null}

      <ul className="duplicate-resolution-list" data-testid="duplicate-runs-list">
        {duplicateRuns.map((dup) => {
          const id = dup.id;
          const isCanonMistaken = canonicalId && id === canonicalId;
          return (
            <li
              key={id}
              className="duplicate-resolution-item"
              data-testid={`duplicate-run-${id}`}
            >
              <div>
                <p>
                  <strong>Duplicate</strong> · <code title={id}>{shortId(id)}</code>{" "}
                  <button
                    type="button"
                    className="header-btn-ghost"
                    onClick={async () => {
                      const ok = await copyText(id);
                      if (ok) setCopied(id);
                    }}
                  >
                    {copied === id ? "Copied" : "Copy ID"}
                  </button>
                </p>
                <p className="cc-muted">
                  Stage: {dup.stage_label || dup.stage || dup.current_stage || "—"} · Status:{" "}
                  {dup.proof_status || dup.status || "—"} · Mode:{" "}
                  {dup.execution_mode || dup.mode || "—"}
                  {dup.started_at ? ` · Started ${dup.started_at}` : ""}
                </p>
                <p className="cc-muted">
                  Why duplicate: non-canonical active production proof for the same project /
                  proof template
                  {dup.live_provider_blocked || dup.mode === "live_provider"
                    ? " · live provider may be blocked/invalid"
                    : ""}
                </p>
              </div>
              <button
                type="button"
                className="header-btn"
                data-testid={`cancel-duplicate-${id}`}
                disabled={busy || Boolean(pendingId) || isCanonMistaken}
                title={
                  isCanonMistaken
                    ? "Cannot cancel the canonical run"
                    : "Cancel this non-canonical duplicate"
                }
                onClick={() => setConfirmTarget(id)}
              >
                {pendingId === id ? "Cancelling…" : "Cancel duplicate run"}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="admin-actions" style={{ marginTop: "0.75rem" }}>
        <button
          type="button"
          className="header-btn"
          data-testid="cancel-all-duplicates"
          disabled={busy || Boolean(pendingId) || duplicateRuns.length === 0}
          onClick={() => setConfirmTarget("all")}
        >
          {pendingId === "all"
            ? "Cancelling…"
            : `Cancel all non-canonical duplicates (${duplicateRuns.length})`}
        </button>
      </div>

      {message ? (
        <p className="cc-banner" role="status" data-testid="duplicate-resolution-success">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="admin-error" role="alert" data-testid="duplicate-resolution-error">
          {error}
        </p>
      ) : null}

      {confirmTarget ? (
        <div
          className="integration-confirm-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="duplicate-confirm-title"
          data-testid="duplicate-cancel-confirm"
        >
          <h3 id="duplicate-confirm-title">Confirm duplicate cancellation</h3>
          {confirmTarget === "all" ? (
            <p>
              Cancel <strong>{duplicateRuns.length}</strong> non-canonical duplicate run(s)? The
              canonical run{" "}
              <code>{canonicalId || "—"}</code> will remain unchanged. Records are not deleted.
            </p>
          ) : (
            <p>
              Cancel duplicate run <code>{confirmTarget}</code>? The canonical run{" "}
              <code>{canonicalId || "—"}</code> will remain unchanged. Records are not deleted.
            </p>
          )}
          <div className="admin-actions">
            <button
              type="button"
              className="header-btn"
              data-testid="duplicate-confirm-yes"
              disabled={busy || Boolean(pendingId)}
              onClick={confirmCancel}
            >
              Confirm cancel
            </button>
            <button
              type="button"
              className="header-btn-ghost"
              data-testid="duplicate-confirm-no"
              disabled={Boolean(pendingId)}
              onClick={() => setConfirmTarget(null)}
            >
              Keep duplicates
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
