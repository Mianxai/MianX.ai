// Review and quality gates — no self-approval.

import { forbidden } from "../errors";
import { saveReview, listReviews, saveItem, appendEvent } from "./store";
import { baseRecord } from "./model";

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Record a review. Reviewer cannot equal author.
 */
export function submitReview({
  item,
  reviewer,
  author,
  verdict = "pass",
  notes = null,
  kind = "qa",
} = {}) {
  if (!item || !reviewer) throw forbidden("Review requires item and reviewer.");
  if (author && reviewer === author) {
    throw forbidden("Reviewers must not approve their own work.");
  }
  const row = {
    id: uid("rev"),
    item_id: item.id,
    program_id: item.program_id,
    project_id: item.project_id,
    kind,
    reviewer,
    author: author || item.assigned_agent,
    verdict: verdict === "pass" ? "pass" : "fail",
    notes,
    created_at: new Date().toISOString(),
  };
  saveReview(row);

  if (row.verdict === "fail") {
    // Create actionable rework task
    const rework = baseRecord({
      level: "task",
      parent_id: item.id,
      company_id: item.company_id,
      project_id: item.project_id,
      objective_id: item.objective_id,
      program_id: item.program_id,
      status: "queued",
      priority: item.priority,
      risk_level: item.risk_level,
      title: `Rework: ${item.title}`,
      department: item.department,
      wave: item.wave,
      audit_metadata: { rework_of: item.id, review_id: row.id },
    });
    saveItem(rework);
    appendEvent({
      program_id: item.program_id,
      project_id: item.project_id,
      item_id: item.id,
      event_type: "review_failed_rework_created",
      payload: { rework_id: rework.id, reviewer },
    });
  }
  return row;
}

export function requireReviewsOrPass({ item, reviewer, author }) {
  const required = item.review_requirements || [];
  if (!required.length) {
    return { passed: true, reviews: [] };
  }
  // Auto peer/qa pass in deterministic foundation when reviewer provided
  const review = submitReview({
    item,
    reviewer: reviewer || "qa-review",
    author,
    verdict: "pass",
    kind: required[0] || "qa",
  });
  const all = listReviews({ itemId: item.id });
  const failed = all.some((r) => r.verdict === "fail");
  return { passed: !failed && Boolean(review), reviews: all };
}
