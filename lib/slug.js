// Client-safe slug helpers for the project creation form.
//
// These improve UX only — server-side validation (lib/core/validate.isSlug)
// remains the single source of truth for what is accepted.

// Normalizes arbitrary text into a safe slug candidate:
//   trim → lowercase → spaces/underscores to hyphens → strip unsupported
//   characters → collapse repeated hyphens → trim leading/trailing hyphens.
export function normalizeSlug(input) {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Derives a suggested slug from a project name.
export function slugFromName(name) {
  return normalizeSlug(name);
}

const URL_LIKE = /^(https?:\/\/|www\.)|(\.[a-z]{2,})(\/|$)/i;

// Detects text that looks like a URL or domain, so the form can refuse to turn
// e.g. `mian-x-ai.vercel.app` into an accidental project identifier.
export function looksLikeUrl(input) {
  if (typeof input !== "string") return false;
  const trimmed = input.trim();
  if (!trimmed) return false;
  return URL_LIKE.test(trimmed) || trimmed.includes("/");
}

// Attempts to extract an unambiguous final path segment from a pasted URL.
// Returns a normalized slug string, or null when it cannot be resolved safely
// (bare domain with no path, multiple ambiguous segments, etc.).
export function extractSlugFromUrl(input) {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  let pathname = "";
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    pathname = new URL(withProtocol).pathname || "";
  } catch {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  // Bare domain (no path) → ambiguous, refuse.
  if (segments.length === 0) return null;

  const candidate = normalizeSlug(segments[segments.length - 1]);
  return candidate || null;
}

// Full evaluation for the form. Returns:
//   { ok: true, slug }                       -> safe to use
//   { ok: false, reason, suggestion? }       -> show precise message
export function evaluateSlugInput(raw) {
  if (typeof raw !== "string" || !raw.trim()) {
    return { ok: false, reason: "empty" };
  }
  if (looksLikeUrl(raw)) {
    const extracted = extractSlugFromUrl(raw);
    if (extracted) {
      return {
        ok: false,
        reason: "url_with_path",
        suggestion: extracted,
      };
    }
    return { ok: false, reason: "url_bare" };
  }
  const slug = normalizeSlug(raw);
  if (!slug) return { ok: false, reason: "invalid" };
  return { ok: true, slug };
}
