"use client";

import Link from "next/link";

export default function WorkflowBoard({ workflows }) {
  if (!workflows?.available) {
    return (
      <section className="cc-card" aria-labelledby="cc-wf-h">
        <h2 id="cc-wf-h">Workflows</h2>
        <p className="cc-unavailable">{workflows?.label || "Data unavailable"}</p>
        {workflows?.note ? <p className="cc-muted">{workflows.note}</p> : null}
      </section>
    );
  }

  const rows = workflows.value || [];
  return (
    <section className="cc-card" aria-labelledby="cc-wf-h">
      <h2 id="cc-wf-h">Workflow chains</h2>
      {rows.length === 0 ? (
        <p className="cc-muted">No active workflow tasks in this project scope.</p>
      ) : (
        <ul className="cc-workflow-list">
          {rows.map((wf) => (
            <li key={wf.taskId} className="cc-workflow-row">
              <div className="cc-workflow-head">
                <strong>{wf.label}</strong>
                <span className="cc-muted">{wf.title}</span>
                <Link href={wf.detailHref}>Open task</Link>
              </div>
              <ol className="cc-stages">
                {wf.stages.map((s) => (
                  <li key={s.key} className={`cc-stage cc-stage-${s.state}`}>
                    {s.href ? (
                      <Link href={s.href}>
                        <span className="cc-stage-label">{s.label}</span>
                        <span className="cc-stage-state">{s.state.replace(/_/g, " ")}</span>
                      </Link>
                    ) : (
                      <>
                        <span className="cc-stage-label">{s.label}</span>
                        <span className="cc-stage-state">{s.state.replace(/_/g, " ")}</span>
                      </>
                    )}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
