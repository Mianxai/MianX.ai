"use client";

import { useMemo, useState } from "react";
import ScopeBadge from "@/components/admin/ScopeBadge";
import SchedulerStatus from "@/components/admin/SchedulerStatus";

function isCancelledOrArchived(item) {
  const s = String(item?.status || item?.stage || item?.proof_status || "").toLowerCase();
  return (
    s.includes("cancel") ||
    s.includes("archiv") ||
    Boolean(item?.cancelled_as_duplicate) ||
    Boolean(item?.is_duplicate_cancelled)
  );
}

export default function CeoBriefPanel({
  brief,
  showCancelledDefault = false,
  scheduler = null,
}) {
  const [showCancelled, setShowCancelled] = useState(showCancelledDefault);

  const activeObjectives = useMemo(() => {
    const items = brief?.activeObjectives || [];
    if (showCancelled) return items;
    return items.filter((i) => !isCancelledOrArchived(i));
  }, [brief?.activeObjectives, showCancelled]);

  const hiddenCancelledCount = useMemo(
    () => (brief?.activeObjectives || []).filter(isCancelledOrArchived).length,
    [brief?.activeObjectives]
  );

  if (!brief) return null;

  const schedulerPayload = scheduler || brief.scheduler || null;

  return (
    <section className="cc-card" aria-labelledby="cc-ceo-h" data-testid="ceo-brief-panel">
      <div className="ceo-brief-header-row">
        <h2 id="cc-ceo-h">CEO Brief</h2>
        <ScopeBadge scope="project" />
      </div>
      <p className="cc-muted">
        Founder-focused snapshot from stored runtime state
        {brief.providerSynthesis ? " + provider synthesis" : " (no generative call)"}.
      </p>

      <BriefList
        title="Active objectives"
        items={activeObjectives}
        empty="None active"
        testId="ceo-brief-active-objectives"
      />
      {hiddenCancelledCount > 0 && !showCancelled ? (
        <p className="cc-muted" data-testid="ceo-brief-hidden-cancelled">
          {hiddenCancelledCount} cancelled/archived objective(s) hidden.
        </p>
      ) : null}
      <label className="ceo-brief-toggle">
        <input
          type="checkbox"
          checked={showCancelled}
          data-testid="ceo-brief-show-cancelled"
          onChange={(e) => setShowCancelled(e.target.checked)}
        />
        Show cancelled / archived
      </label>

      <BriefList title="Blocked objectives" items={brief.blockedObjectives} empty="None" />
      <BriefList title="Failed work" items={brief.failedWork} empty="None" />
      <BriefList
        title="Pending approvals"
        items={(brief.pendingApprovals || []).map((a) => ({
          id: a.id,
          title: a.capability,
          status: a.status,
        }))}
        empty="None"
      />
      <BriefList title="Recent completed" items={brief.recentCompleted} empty="None" />

      {schedulerPayload ? (
        <SchedulerStatus scheduler={schedulerPayload} compact useDurableHealth />
      ) : null}

      {brief.duplicateProofWarning?.count > 0 ? (
        <div className="cc-warnings" role="status">
          <h3>Duplicate production proof runs</h3>
          <p>
            {brief.duplicateProofWarning.count} duplicate active run(s) detected. Resolve via
            Founder Proof before continuing.
          </p>
        </div>
      ) : null}
      {(brief.operationalWarnings || []).length > 0 ? (
        <div className="cc-warnings" role="status">
          <h3>Operational warnings</h3>
          <ul>
            {brief.operationalWarnings.map((w) => (
              <li key={w.code}>{w.message}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function BriefList({ title, items, empty, testId }) {
  return (
    <div className="cc-brief-block" data-testid={testId}>
      <h3>{title}</h3>
      {!items?.length ? (
        <p className="cc-muted">{empty}</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.title || item.agentSlug || item.id}
              {item.status ? ` · ${item.status}` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
