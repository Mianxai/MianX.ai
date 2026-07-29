/**
 * Pure presentation for Memory list empty/configured states.
 * Never claims an "additive migration" is required when persistence is durable.
 *
 * @param {{ items?: Array, persistence: { durable?: boolean, reason?: string, backend?: string }, projectId?: string|null }} opts
 */
export function buildMemoryListPresentation({ items = [], persistence, projectId = null } = {}) {
  const list = Array.isArray(items) ? items : [];
  const verified = list.filter(
    (i) => i.verification_status === "verified" || i.verification_status === "active"
  );
  const awaiting = list.filter((i) =>
    ["proposed", "candidate", "pending", "awaiting_verification"].includes(
      i.verification_status
    )
  );

  let note = null;
  let empty_state = null;
  if (!persistence?.durable) {
    empty_state =
      persistence?.reason === "supabase_unconfigured"
        ? "storage_unconfigured"
        : "schema_unavailable";
    note =
      persistence?.reason === "supabase_unconfigured"
        ? "Memory storage is unconfigured (Supabase unavailable)."
        : "Memory schema is unavailable — in-memory fallback only until tables are present.";
  } else if (list.length === 0) {
    empty_state = "configured_empty";
    note = projectId
      ? "Durable project memory is configured. No verified entries exist because the production proof has not completed simulation and review."
      : "Durable memory is configured. No entries for the current filter.";
  } else if (verified.length === 0 && awaiting.length > 0) {
    empty_state = "awaiting_verification";
    note = "Memory candidates exist and await Founder verification before they are trusted.";
  } else {
    empty_state = "has_entries";
    note = `Durable memory configured (${persistence.backend || "durable"}). ${verified.length} verified · ${awaiting.length} awaiting verification.`;
  }

  return {
    empty_state,
    note,
    counts: {
      total: list.length,
      verified: verified.length,
      awaiting_verification: awaiting.length,
    },
  };
}
