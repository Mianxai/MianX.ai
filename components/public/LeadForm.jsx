"use client";

import { useRef, useState } from "react";
import { INDUSTRY_OPTIONS, validateLeadSubmission } from "@/lib/leads";

const EMPTY = { name: "", email: "", company: "", phone: "", industry: "", message: "" };

export default function LeadForm() {
  const [form, setForm] = useState(EMPTY);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const submittingRef = useRef(false);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    setFieldErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  async function onSubmit(e) {
    e.preventDefault();

    // Duplicate-submit protection: ignore additional submits while one is
    // already in flight, independent of React state-update timing.
    if (submittingRef.current) return;

    const { valid, errors } = validateLeadSubmission(form);
    if (!valid) {
      setFieldErrors(errors);
      setStatus({ state: "error", message: "Please fix the highlighted fields." });
      return;
    }

    submittingRef.current = true;
    setFieldErrors({});
    setStatus({ state: "loading", message: "" });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          state: "error",
          message:
            res.status === 503
              ? data.error || "This deployment isn't configured to accept submissions yet."
              : data.error || "Something went wrong. Please try again.",
        });
        return;
      }

      setStatus({ state: "success", message: "Thank you — your message has been received." });
      setForm(EMPTY);
    } catch {
      setStatus({ state: "error", message: "Network error. Please check your connection and try again." });
    } finally {
      submittingRef.current = false;
    }
  }

  const loading = status.state === "loading";

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate aria-describedby="form-status">
      {/* Honeypot: hidden from real users; bots that auto-fill every field trip this. */}
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website || ""} onChange={(e) => update("website", e.target.value)} />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "nameError" : undefined}
            maxLength={200}
            required
          />
          {fieldErrors.name && <span className="form-error-msg" id="nameError">{fieldErrors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "emailError" : undefined}
            maxLength={254}
            required
          />
          {fieldErrors.email && <span className="form-error-msg" id="emailError">{fieldErrors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="company">Company Name</label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Your Company"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            maxLength={200}
          />
        </div>
        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <select
            id="industry"
            name="industry"
            value={form.industry}
            onChange={(e) => update("industry", e.target.value)}
          >
            <option value="">Select Industry</option>
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+92 300 1234567"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          maxLength={40}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Tell Us About Your Needs *</label>
        <textarea
          id="message"
          name="message"
          placeholder="What challenges are you facing? What are you looking for?"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "messageError" : undefined}
          maxLength={4000}
          required
        />
        {fieldErrors.message && <span className="form-error-msg" id="messageError">{fieldErrors.message}</span>}
      </div>

      <button type="submit" className="form-submit" disabled={loading}>
        {loading ? (
          <>
            <span className="spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Send Message
          </>
        )}
      </button>

      <div id="form-status" role="status" aria-live="polite">
        {status.state === "success" && (
          <div className="form-message success">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            {status.message}
          </div>
        )}
        {status.state === "error" && <div className="form-message error">{status.message}</div>}
      </div>
    </form>
  );
}
