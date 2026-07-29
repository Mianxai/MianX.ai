"use client";

export default function CeoBriefPanel({ brief }) {
  if (!brief) return null;
  return (
    <section className="cc-card" aria-labelledby="cc-ceo-h">
      <h2 id="cc-ceo-h">CEO Brief</h2>
      <p className="cc-muted">
        Built from stored runtime state
        {brief.providerSynthesis ? " + provider synthesis" : " (no generative call)"}.
      </p>
      <BriefList title="Active objectives" items={brief.activeObjectives} empty="None" />
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
      {(brief.duplicateProofWarning?.count > 0) ? (
        <div className="cc-warnings" role="status">
          <h3>Duplicate production proof runs</h3>
          <p>
            {brief.duplicateProofWarning.count} duplicate active run(s) detected. Resolve via
            E2E Integration before continuing.
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

function BriefList({ title, items, empty }) {
  return (
    <div className="cc-brief-block">
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
