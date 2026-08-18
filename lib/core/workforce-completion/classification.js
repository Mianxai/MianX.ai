/**
 * Phase I — classify the seven catalogue/executable gaps (before → after).
 */

export const GAP_BEFORE = Object.freeze({
  catalogue: 43,
  executable: 36,
  nonExecutable: 7,
  drafts: [
    "workflow-orchestrator",
    "requirements-analyst",
    "engineering-planning",
    "test-qa",
    "security-review",
    "release-readiness",
    "follow-up-draft",
  ],
});

/** @type {Record<string, object>} */
export const GAP_CLASSIFICATIONS = Object.freeze({
  "workflow-orchestrator": {
    classification: "superseded_duplicate",
    action: "labelled_non_executable",
    supersededBy: ["executive-ceo"],
    madeExecutable: false,
    reason:
      "Superseded by executive-ceo for enterprise objective orchestration.",
  },
  "requirements-analyst": {
    classification: "superseded_duplicate",
    action: "labelled_non_executable",
    supersededBy: ["delivery-product"],
    madeExecutable: false,
    reason: "Superseded by delivery-product; product-planning remapped.",
  },
  "engineering-planning": {
    classification: "superseded_duplicate",
    action: "labelled_non_executable",
    supersededBy: ["delivery-architect", "delivery-engineer"],
    madeExecutable: false,
    reason: "Superseded by delivery-architect / delivery-engineer.",
  },
  "test-qa": {
    classification: "superseded_duplicate",
    action: "labelled_non_executable",
    supersededBy: ["delivery-qa", "qa-review"],
    madeExecutable: false,
    reason: "Superseded by delivery-qa / qa-review; release-readiness remapped.",
  },
  "security-review": {
    classification: "superseded_duplicate",
    action: "labelled_non_executable",
    supersededBy: ["platform-security"],
    madeExecutable: false,
    reason: "Superseded by platform-security.",
  },
  "release-readiness": {
    classification: "runtime_capable",
    action: "promoted_to_active",
    supersededBy: [],
    madeExecutable: true,
    reason:
      "Real operational release-recommendation role; never deploys.",
  },
  "follow-up-draft": {
    classification: "runtime_capable",
    action: "promoted_to_active",
    supersededBy: [],
    madeExecutable: true,
    reason:
      "Real operational drafting role for lead-qualification and business-growth.",
  },
});

export function classifyCatalogueGaps() {
  const afterExecutable = GAP_BEFORE.executable + 2; // two promotions
  const afterNonExecutable = GAP_BEFORE.nonExecutable - 2;
  return {
    before: { ...GAP_BEFORE },
    after: {
      catalogue: GAP_BEFORE.catalogue,
      executable: afterExecutable,
      nonExecutable: afterNonExecutable,
      intentionallyNonExecutable: afterNonExecutable,
      promoted: ["follow-up-draft", "release-readiness"],
      superseded: [
        "workflow-orchestrator",
        "requirements-analyst",
        "engineering-planning",
        "test-qa",
        "security-review",
      ],
    },
    rows: GAP_BEFORE.drafts.map((slug) => ({
      slug,
      before: "draft_non_executable",
      ...GAP_CLASSIFICATIONS[slug],
    })),
  };
}
