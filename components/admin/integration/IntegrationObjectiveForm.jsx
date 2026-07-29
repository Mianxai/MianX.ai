"use client";

import { EXECUTION_MODES } from "@/lib/core/integration/schemas";

export default function IntegrationObjectiveForm({
  title,
  setTitle,
  purpose,
  setPurpose,
  deliverables,
  setDeliverables,
  criteria,
  setCriteria,
  constraints,
  setConstraints,
  questions,
  setQuestions,
  executionMode,
  setExecutionMode,
  priority,
  setPriority,
  riskTolerance,
  setRiskTolerance,
  protectedActions,
  providerGate,
  selectedProjectName,
  createDisabledReason,
  busy,
  onCreate,
  onSubmitClarification,
  clarificationRequired,
  run,
  onPrefillTemplate,
}) {
  const canSubmit = !createDisabledReason && !busy;

  return (
    <div className="integration-objective-form" data-testid="integration-objective-form">
      <div className="integration-form-badges">
        <span className="integration-badge" data-testid="deterministic-badge">
          Deterministic simulation
        </span>
        <span className="integration-badge integration-badge-warn" data-testid="provider-unconfigured">
          Provider unconfigured — live execution blocked
        </span>
        <span className="integration-badge integration-badge-warn" data-testid="protected-action-warn">
          Protected: production_deployment blocked
        </span>
      </div>

      <p className="admin-note" role="note">
        No live execution. Review fields and submit manually — objectives are never created automatically.
      </p>

      {selectedProjectName ? (
        <p role="status">
          Creating objective for <strong>{selectedProjectName}</strong>
        </p>
      ) : null}

      <div className="integration-form-actions-top">
        <button type="button" className="header-btn-ghost" onClick={onPrefillTemplate}>
          Prefill production proof template
        </button>
      </div>

      <div className="integration-form-grid">
        <div className="integration-form-field integration-form-field-full">
          <label htmlFor="integration-obj-title">
            Title <span className="integration-required">*</span>
          </label>
          <input
            id="integration-obj-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            aria-required="true"
          />
        </div>

        <div className="integration-form-field integration-form-field-full">
          <label htmlFor="integration-obj-purpose">
            Business purpose <span className="integration-required">*</span>
          </label>
          <textarea
            id="integration-obj-purpose"
            rows={5}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
            aria-required="true"
          />
        </div>

        <div className="integration-form-field integration-form-field-full">
          <label htmlFor="integration-obj-deliverables">
            Expected deliverables <span className="integration-required">*</span>
          </label>
          <textarea
            id="integration-obj-deliverables"
            rows={3}
            value={deliverables}
            onChange={(e) => setDeliverables(e.target.value)}
            required
            aria-required="true"
          />
        </div>

        <div className="integration-form-field integration-form-field-full">
          <label htmlFor="integration-obj-criteria">
            Success criteria <span className="integration-required">*</span>
          </label>
          <textarea
            id="integration-obj-criteria"
            rows={3}
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            required
            aria-required="true"
          />
        </div>

        <div className="integration-form-field integration-form-field-full">
          <label htmlFor="integration-obj-constraints">Constraints</label>
          <textarea
            id="integration-obj-constraints"
            rows={3}
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            aria-describedby="integration-obj-constraints-hint"
          />
          <span id="integration-obj-constraints-hint" className="integration-field-hint">
            e.g. deterministic simulation only, no automatic Founder approval
          </span>
        </div>

        <div className="integration-form-field integration-form-field-full">
          <label htmlFor="integration-obj-clarification">Unresolved clarification</label>
          <textarea
            id="integration-obj-clarification"
            rows={2}
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            aria-label="Unresolved clarification"
          />
        </div>

        <div className="integration-form-field">
          <label htmlFor="integration-obj-mode">
            Execution mode <span className="integration-required">*</span>
          </label>
          <select
            id="integration-obj-mode"
            value={executionMode}
            onChange={(e) => setExecutionMode(e.target.value)}
            aria-label="Execution mode"
          >
            {EXECUTION_MODES.map((m) => (
              <option key={m} value={m}>
                {m === "deterministic_simulation" ? "Deterministic simulation" : "Live provider (gated)"}
              </option>
            ))}
          </select>
        </div>

        <div className="integration-form-field">
          <label htmlFor="integration-obj-priority">Priority</label>
          <select
            id="integration-obj-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>

        <div className="integration-form-field">
          <label htmlFor="integration-obj-risk">Risk tolerance</label>
          <select
            id="integration-obj-risk"
            value={riskTolerance}
            onChange={(e) => setRiskTolerance(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="integration-form-field integration-form-field-full">
          <span className="integration-field-label">Protected actions</span>
          <ul className="integration-protected-list" data-testid="protected-actions-list">
            {protectedActions.map((a) => (
              <li key={a}>{a} — blocked without explicit Founder approval</li>
            ))}
          </ul>
        </div>
      </div>

      {providerGate ? (
        <p data-testid="provider-gate" role="status" className="integration-field-hint">
          Live ready: {String(providerGate.live_execution_ready)} —{" "}
          {providerGate.block_reason || "simulation available"}
        </p>
      ) : null}

      {clarificationRequired ? (
        <section className="integration-clarification-panel" data-testid="clarification-panel">
          <h3>Clarification required</h3>
          <p>
            <strong>Question:</strong> {questions || run?.objective?.unresolved_questions?.[0]}
          </p>
          <p className="admin-muted">
            Clarification is required before planning. Your answer is persisted and audited — do not
            skip this step.
          </p>
          <button
            type="button"
            className="header-btn"
            disabled={busy}
            onClick={onSubmitClarification}
          >
            Submit clarification
          </button>
        </section>
      ) : null}

      <div className="integration-form-actions">
        <button
          type="button"
          data-testid="create-objective"
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
          title={createDisabledReason || "Create objective"}
          onClick={onCreate}
        >
          Create objective
        </button>
      </div>
      {createDisabledReason ? (
        <p role="status" data-testid="create-objective-disabled-reason" className="integration-disabled-reason">
          {createDisabledReason}
        </p>
      ) : (
        <p role="status" data-testid="create-objective-ready">
          Ready to create objective — review fields and submit.
        </p>
      )}

      {run ? (
        <p className="admin-muted">
          Run <code>{run.id}</code> · Objective <code>{run.objective?.id}</code> · Stage{" "}
          <span>{run.current_stage}</span>
        </p>
      ) : null}
    </div>
  );
}
