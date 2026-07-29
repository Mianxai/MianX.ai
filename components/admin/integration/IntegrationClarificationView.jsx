"use client";

/**
 * Stage-aware clarification view for an existing canonical Founder Proof run.
 * Does not render objective-creation controls.
 */
export default function IntegrationClarificationView({
  run,
  projectName,
  answer,
  setAnswer,
  busy,
  submitting,
  error,
  onSubmit,
}) {
  const objective = run?.objective || {};
  const questions = Array.isArray(objective.unresolved_questions)
    ? objective.unresolved_questions.filter(Boolean)
    : [];
  const primaryQuestion =
    questions[0] ||
    "Please confirm success criteria and whether deterministic simulation-only is acceptable for this proof.";

  const canSubmit =
    Boolean(answer?.trim()) && !busy && !submitting && run?.id;

  return (
    <div
      className="integration-clarification-view"
      data-testid="integration-clarification-view"
      id="clarification"
    >
      <h2 data-testid="clarification-page-title">Clarification Required</h2>
      <p className="cc-muted">
        An objective and canonical proof run already exist. Answer the question below to continue —
        do not create a new objective.
      </p>

      <section
        className="cc-card"
        aria-labelledby="clarification-objective-summary"
        data-testid="clarification-objective-summary"
      >
        <h3 id="clarification-objective-summary">Objective summary</h3>
        <dl className="cc-detail-dl">
          <div>
            <dt>Title</dt>
            <dd>{objective.title || "—"}</dd>
          </div>
          <div>
            <dt>Business purpose</dt>
            <dd>{objective.business_purpose || "—"}</dd>
          </div>
          <div>
            <dt>Expected deliverables</dt>
            <dd>
              {(objective.expected_deliverables || []).length
                ? (objective.expected_deliverables || []).join("; ")
                : "—"}
            </dd>
          </div>
          <div>
            <dt>Constraints</dt>
            <dd>
              {(objective.constraints || []).length
                ? (objective.constraints || []).join("; ")
                : "—"}
            </dd>
          </div>
          <div>
            <dt>Project</dt>
            <dd>{projectName || run?.project_id || "—"}</dd>
          </div>
          <div>
            <dt>Canonical run</dt>
            <dd>
              <code>{run?.id}</code>
            </dd>
          </div>
          <div>
            <dt>Execution mode</dt>
            <dd>{run?.execution_mode || objective.execution_mode || "—"}</dd>
          </div>
        </dl>
      </section>

      <section
        className="cc-card integration-clarification-question-card"
        aria-labelledby="clarification-question-h"
        data-testid="clarification-question-card"
      >
        <h3 id="clarification-question-h">Unresolved question</h3>
        <p className="integration-clarification-question" role="status">
          {primaryQuestion}
        </p>
        {questions.length > 1 ? (
          <ul>
            {questions.slice(1).map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        ) : null}
      </section>

      <form
        className="cc-card"
        data-testid="clarification-answer-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!canSubmit) return;
          onSubmit();
        }}
      >
        <label htmlFor="founder-clarification-answer">
          Founder clarification answer
        </label>
        <textarea
          id="founder-clarification-answer"
          data-testid="founder-clarification-answer"
          rows={5}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
          aria-required="true"
          aria-describedby="clarification-submit-warn clarification-error"
          disabled={busy || submitting}
          style={{ width: "100%", display: "block", marginTop: "0.35rem" }}
        />
        <p
          id="clarification-submit-warn"
          className="admin-warning"
          role="note"
          data-testid="clarification-submit-warn"
        >
          Submitting this answer advances the canonical proof to planning. It does not approve a
          plan or start simulation.
        </p>
        {error ? (
          <p id="clarification-error" className="admin-error" role="alert">
            {error}
          </p>
        ) : (
          <p id="clarification-error" className="sr-only" aria-live="polite" />
        )}
        <button
          type="submit"
          className="header-btn"
          data-testid="submit-clarification"
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
          title={
            !answer?.trim()
              ? "Enter a clarification answer first"
              : "Submit clarification"
          }
        >
          {submitting ? "Submitting…" : "Submit clarification"}
        </button>
        {!answer?.trim() ? (
          <p className="integration-disabled-reason" role="status">
            Enter a clarification answer to enable Submit.
          </p>
        ) : null}
      </form>

      <details className="cc-card" data-testid="clarification-technical-details">
        <summary>Technical details</summary>
        <pre className="runtime-code" aria-label="Technical objective JSON">
          {JSON.stringify(
            {
              run_id: run?.id,
              stage: run?.current_stage,
              status: run?.status,
              objective,
              clarifications: run?.clarifications,
            },
            null,
            2
          )}
        </pre>
      </details>
    </div>
  );
}
