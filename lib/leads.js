// Shared lead-capture and lead-management rules used by both the public API
// routes and the admin dashboard. Centralized here so validation, allowed
// statuses, and industry options can't drift between client and server.

export const LEAD_STATUSES = ["new", "contacted", "converted", "closed"];

export const INDUSTRY_OPTIONS = [
  { value: "restaurant", label: "Restaurant / Food" },
  { value: "poultry", label: "Poultry / Agriculture" },
  { value: "hospital", label: "Hospital / Healthcare" },
  { value: "school", label: "School / Education" },
  { value: "logistics", label: "Logistics / Transport" },
  { value: "retail", label: "Retail / E-commerce" },
  { value: "construction", label: "Construction" },
  { value: "other", label: "Other" },
];

const INDUSTRY_VALUES = new Set(INDUSTRY_OPTIONS.map((o) => o.value));

export const LEAD_FIELD_LIMITS = {
  name: 200,
  email: 254,
  company: 200,
  phone: 40,
  industry: 40,
  message: 4000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clip(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Validates and normalizes a public lead-submission payload.
 * Never throws — always returns { valid, errors, data }.
 */
export function validateLeadSubmission(body) {
  const errors = {};
  const raw = body && typeof body === "object" ? body : {};

  // Honeypot: a hidden field real users never fill in. Any value here means
  // the submission almost certainly came from a bot — reject silently by
  // the caller treating this as an anti-spam signal, not a validation error
  // shown to the (non-existent) human.
  const honeypotTripped = Boolean(raw.website || raw._hp);

  const name = clip(raw.name, LEAD_FIELD_LIMITS.name);
  const email = clip(raw.email, LEAD_FIELD_LIMITS.email);
  const company = clip(raw.company, LEAD_FIELD_LIMITS.company);
  const phone = clip(raw.phone, LEAD_FIELD_LIMITS.phone);
  const industryRaw = clip(raw.industry, LEAD_FIELD_LIMITS.industry).toLowerCase();
  const message = clip(raw.message ?? raw.need, LEAD_FIELD_LIMITS.message);

  if (!name) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email) || email.length > LEAD_FIELD_LIMITS.email) {
    errors.email = "Please enter a valid email address.";
  }
  if (!message) errors.message = "Please tell us what you need.";

  const industry = INDUSTRY_VALUES.has(industryRaw) ? industryRaw : industryRaw ? "other" : "";

  return {
    valid: Object.keys(errors).length === 0 && !honeypotTripped,
    honeypotTripped,
    errors,
    data: { name, email, company, phone, industry, message },
  };
}

/**
 * Builds a safe update payload for PATCH /api/leads/[id] from an arbitrary
 * request body, allowing only known-safe fields. Prevents mass assignment
 * (e.g. a client trying to overwrite created_at, id, or arbitrary columns).
 */
export function buildLeadPatch(body) {
  const errors = {};
  const patch = {};
  const raw = body && typeof body === "object" ? body : {};

  if ("status" in raw) {
    if (LEAD_STATUSES.includes(raw.status)) {
      patch.status = raw.status;
    } else {
      errors.status = `Status must be one of: ${LEAD_STATUSES.join(", ")}`;
    }
  }

  if ("archived" in raw) {
    if (typeof raw.archived === "boolean") {
      patch.archived_at = raw.archived ? new Date().toISOString() : null;
    } else {
      errors.archived = "archived must be a boolean";
    }
  }

  if ("analysis" in raw) {
    const a = raw.analysis;
    const isValidAnalysis =
      a &&
      typeof a === "object" &&
      typeof a.score === "number" &&
      ["hot", "warm", "cold"].includes(a.temperature) &&
      typeof a.summary === "string" &&
      typeof a.reply === "string" &&
      Array.isArray(a.actions);
    if (isValidAnalysis) {
      patch.analysis = a;
    } else {
      errors.analysis = "analysis has an unexpected shape";
    }
  }

  return { patch, errors, hasFields: Object.keys(patch).length > 0 };
}
