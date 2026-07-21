"use client";

import { useState } from "react";

const EMPTY = { name: "", email: "", company: "", budget: "", need: "" };

export default function LeadForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", msg: "" });
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus({
        state: "ok",
        msg: "Thanks — your request is in. Our agents are already on it.",
      });
      setForm(EMPTY);
    } catch (err) {
      setStatus({ state: "err", msg: err.message });
    }
  }

  return (
    <form className="panel" onSubmit={onSubmit} id="contact">
      <div className="form-grid">
        <div className="field">
          <label htmlFor="lf-name">Name *</label>
          <input
            id="lf-name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Ada Lovelace"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="lf-email">Email *</label>
          <input
            id="lf-email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="ada@company.com"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="lf-company">Company</label>
          <input
            id="lf-company"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Analytical Engines Inc."
          />
        </div>
        <div className="field">
          <label htmlFor="lf-budget">Budget</label>
          <select
            id="lf-budget"
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
          >
            <option value="">Select a range</option>
            <option>&lt; $10k</option>
            <option>$10k–$50k</option>
            <option>$50k–$150k</option>
            <option>$150k+</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="lf-need">What do you need? *</label>
          <textarea
            id="lf-need"
            value={form.need}
            onChange={(e) => update("need", e.target.value)}
            placeholder="We want AI agents to handle inbound support and qualify leads 24/7…"
            required
          />
        </div>
      </div>

      {status.state === "ok" && (
        <div className="notice ok">{status.msg}</div>
      )}
      {status.state === "err" && (
        <div className="notice err">{status.msg}</div>
      )}

      <div style={{ marginTop: 18 }}>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={status.state === "loading"}
        >
          {status.state === "loading" ? (
            <>
              <span className="spin" /> Sending…
            </>
          ) : (
            "Deploy my agents →"
          )}
        </button>
      </div>
    </form>
  );
}
