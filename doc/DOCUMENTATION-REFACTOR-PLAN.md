---
document_id: DOCUMENTATION-REFACTOR-PLAN-001
title: MianX.ai Documentation Refactor Plan
version: 1.0.0
status: Draft — Founder Approval Required
authority_type: Documentation Normalization Plan
classification: Public Repository
owner: MianX.ai Founder
maintainer: MianX.ai Documentation Owner
reviewers:
  - Founder
  - Documentation Owner
  - Product Owner
  - Architecture Owner
  - Security Owner
  - Data Owner
  - AI Governance Owner
  - Operations Owner
created: 2026-08-03
updated: 2026-08-04
approval_status: Pending
implementation_status: Not Started
verification_status: Source-Aligned Draft
current_phase: Phase 1 — Platform Foundation
phase_status: ready_for_final_verification
phase_1_complete: false
phase_2_started: false
normalization_authorized: false
mass_move_authorized: false
mass_delete_authorized: false
canonical_documentation_root: doc/
legacy_documentation_root_under_review: docs/
canonical_current_truth: ./CURRENT-STATE.md
canonical_document_registry: ./DOCUMENT-STATUS-REGISTRY.md
canonical_document_map: ./CANONICAL-DOCUMENT-MAP.md
canonical_execution_board: ../execution/EXECUTION-BOARD.md
---

# MianX.ai Documentation Refactor Plan

> [!IMPORTANT]
> This document defines a proposed controlled plan for classifying,
> consolidating, superseding, archiving, moving, and validating MianX.ai
> Documentation.
>
> It does not authorize immediate folder movement, mass deletion, renaming,
> merging, or archival.
>
> It remains a Draft until Founder approval is recorded.
>
> Current implementation and operational truth remains governed by:
>
> [`CURRENT-STATE.md`](./CURRENT-STATE.md)

---

# 1. Purpose

This Plan defines how MianX.ai should reduce Documentation complexity without:

- losing unique content;
- destroying historical evidence;
- breaking links;
- creating another parallel hierarchy;
- hiding past decisions;
- confusing current truth with future planning;
- treating Drafts as approved;
- treating Documentation as implementation evidence;
- weakening AI context quality;
- creating uncontrolled repository changes.

The intended result is a smaller, clearer, safer, and more maintainable active
Documentation system.

---

# 2. Current Boundary

The canonical content synchronization has been prepared for the following
high-priority documents:

```text
README.md

AGENTS.md

execution/EXECUTION-BOARD.md

doc/README.md

doc/CURRENT-STATE.md

doc/PHASE-1-COMPLETION-CHECKLIST.md

doc/PHASE-1-POST-MIGRATION-VERIFICATION.md

doc/MIANX-AI-MASTER-COMPLETION-PHASES.md

doc/DOCUMENT-STATUS-REGISTRY.md

doc/CANONICAL-DOCUMENT-MAP.md

doc/01-governance/ENTERPRISE-PRINCIPLES.md

doc/02-company/VISION-AND-MISSION.md

doc/31-enterprise-architecture/CORE-ARCHITECTURE.md

doc/44-enterprise-ai/AI-GOVERNANCE.md

doc/48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md
```

This means the primary content model has been prepared.

It does not yet prove:

- all replacements were saved correctly;
- all links resolve;
- every stale claim is removed;
- every duplicate is classified;
- every file is committed;
- the closeout Pull Request contains every change;
- the Founder approved the documents;
- the Documentation structure is normalized.

---

# 3. Current Official Status

```text
Current Phase = Phase 1 — Platform Foundation

Phase 1 Status = READY_FOR_FINAL_VERIFICATION

Phase 1 Complete = NO

Founder Phase 1 Sign-Off = NOT APPROVED

Phase 2 Started = NO

Canonical Content Synchronization = PREPARED

Documentation Structure Normalized = NO

Mass Structure Change Authorized = NO

Allocated AI Agents = 0

Active AI Agents = 0

Live-Tested AI Agents = 0
```

Documentation cleanup must not silently change Phase status.

---

# 4. Refactor Objective

The objective is:

> **Create one understandable Documentation system in which every important
> topic has one canonical authority, valid unique content is preserved,
> historical material is clearly classified, active links resolve, and Humans
> and AI can quickly find current truth.**

The objective is not:

- minimum possible file count;
- removal of every old document;
- merging all folders into one folder;
- creating another large master file;
- making the repository appear complete;
- hiding past contradictions;
- changing Product or Architecture truth through file movement.

---

# 5. Refactor Principles

The normalization process must follow these principles:

1. Current truth before structure.
2. Classification before movement.
3. Unique-content review before deletion.
4. One topic, one canonical authority.
5. References instead of repeated content.
6. Historical evidence must be preserved.
7. Public Security must be protected.
8. Git history must remain intact.
9. Broken links must be prevented.
10. Folder existence does not prove capability maturity.
11. New hierarchy creation is the last resort.
12. Founder approval is required for material structural change.

---

# 6. Primary Documentation Roots

## 6.1 Current Primary Root

```text
doc/
```

This is the current primary Documentation root.

New canonical documents should not be created elsewhere without an approved
decision.

## 6.2 Secondary Root Under Review

```text
docs/
```

This path currently requires classification.

Possible classifications include:

- legacy Documentation;
- implementation-specific Documentation;
- generated Documentation;
- temporary migration content;
- duplicate content;
- valid specialized content.

No final classification is assumed by this Plan.

## 6.3 Root Decision Rule

Until an approved inventory is completed:

```text
doc/ = Primary Documentation Root

docs/ = Existing Secondary Root Under Review

Automatic Merge = Prohibited

Automatic Delete = Prohibited
```

---

# 7. Current Structure Risks

Known or reported risks include:

- many top-level numbered folders;
- loose documents in the `doc/` root;
- overlapping folder responsibilities;
- duplicate Vision and Mission content;
- duplicate Architecture content;
- duplicate AI Governance content;
- repeated Roadmap material;
- `doc/` and `docs/` path confusion;
- current and historical content mixed together;
- generated boilerplate;
- oversized files;
- stale Stage and Phase terminology;
- stale Agent-state claims;
- broken or incorrect relative links;
- missing ownership;
- unclear approval status;
- folder names suggesting maturity that does not exist;
- AI tools loading large historical content by default.

---

# 8. Refactor Non-Goals

This Plan does not authorize:

- code changes;
- Product changes;
- database changes;
- migration application;
- Production deployment;
- Agent activation;
- provider activation;
- Phase 2;
- Product and Architecture Re-Baseline;
- full repository branch cleanup;
- Git-history rewrite;
- legal licensing decisions;
- removal of Security evidence.

---

# 9. Required Classification Model

Every file reviewed during normalization must receive one primary
classification.

| Classification | Meaning |
|---|---|
| `CANONICAL_CURRENT` | Controls current facts or active authority |
| `CANONICAL_DRAFT` | Proposed canonical source awaiting approval |
| `APPROVED_STANDARD` | Approved Policy, Standard, or specification |
| `IMPLEMENTATION_REFERENCE` | Describes current implementation |
| `OPERATIONAL_RUNBOOK` | Used for deployment, recovery, Support, or Operations |
| `EVIDENCE` | Records tests, migration, Security, recovery, or verification |
| `PLANNING` | Proposed future work |
| `TEMPLATE` | Reusable document structure |
| `GENERATED` | Automatically generated or repeated output |
| `DUPLICATE_CANDIDATE` | Substantially overlaps another source |
| `SUPERSEDED` | Replaced by a newer approved source |
| `DEPRECATED` | Retained temporarily but should not guide new work |
| `HISTORICAL` | Past decision, Architecture, Roadmap, or evidence |
| `ARCHIVE_CANDIDATE` | Suitable for controlled archive after review |
| `UNSAFE` | Contains credentials, sensitive Data, or dangerous instructions |
| `UNKNOWN` | Classification requires further review |

A file must not be deleted while its classification remains `UNKNOWN`.

---

# 10. File Inventory Record

Each reviewed file should be recorded using:

```text
Path:
Title:
Owner:
Current Classification:
Proposed Classification:
Authority Type:
Approval Status:
Implementation Status:
Deployment Status:
Verification Status:
Canonical Topic:
Canonical Replacement:
Unique Content:
Duplicate Content:
Sensitive Content:
Incoming References:
Outgoing References:
Required Action:
Approver:
Decision:
```

---

# 11. Allowed File Decisions

After classification, one of the following decisions may be selected:

| Decision | Meaning |
|---|---|
| `KEEP_CANONICAL` | Retain at the current canonical path |
| `KEEP_SUPPORTING` | Retain as valid supporting content |
| `UPDATE_IN_PLACE` | Correct the current file without moving it |
| `LINK_ONLY` | Remove repeated detail and link to the canonical source |
| `MERGE_UNIQUE_CONTENT` | Move only valid unique content into the canonical source |
| `SUPERSEDE` | Mark as replaced while preserving the file and history |
| `DEPRECATE` | Keep temporarily but prohibit new reliance |
| `ARCHIVE` | Move through an approved historical process |
| `MOVE` | Move to an approved better location |
| `RENAME` | Rename for clarity after reference review |
| `REMOVE_GENERATED_DUPLICATE` | Remove only after reproducibility and approval |
| `WITHDRAW_UNSAFE` | Remove unsafe current content after preserving required evidence |
| `NO_ACTION` | Existing position is correct |
| `REVIEW_REQUIRED` | No structural decision yet |

---

# 12. Prohibited Immediate Decisions

The following shortcuts are prohibited:

- “Folder looks empty, delete it.”
- “Names are similar, merge them.”
- “File is old, remove it.”
- “Newer file automatically wins.”
- “Large file must be deleted.”
- “Generated file has no value.”
- “Conflicting file should be hidden.”
- “Everything under `docs/` is duplicate.”
- “Everything under a numbered folder is canonical.”
- “Documentation exists, therefore capability is complete.”

---

# 13. Overlapping Folder Review

The following folder groups require deliberate responsibility classification.

## 13.1 Platform

```text
doc/07-platform

doc/32-platform-services
```

Review questions:

- Which folder contains foundational Platform concepts?
- Which contains service-specific Documentation?
- Which files are current?
- Which files are generated or empty?
- Which files overlap the Core Architecture?
- Should one become a specialized subdomain rather than being deleted?

## 13.2 Data

```text
doc/08-data

doc/42-data-platform
```

Review questions:

- Which folder governs Data policy?
- Which governs Data Platform implementation?
- Which contains Product-specific Data content?
- Which files describe future state only?
- Which controls should remain shared?

## 13.3 Security

```text
doc/09-security

doc/41-security-platform
```

Review questions:

- Which folder owns Security Governance?
- Which folder owns Security Platform capabilities?
- Which files are operational?
- Which files are evidence?
- Which files expose sensitive implementation detail?

## 13.4 Operations

```text
doc/11-operations

doc/40-enterprise-operations
```

Review questions:

- Which folder owns current runbooks?
- Which owns target enterprise operating models?
- Which files describe real current Operations?
- Which files are future planning?

## 13.5 Business

```text
doc/12-business

doc/43-business-platform
```

Review questions:

- Which folder owns Company business processes?
- Which owns reusable Product business services?
- Which content is Industry-specific?
- Which content belongs in Product specifications?

## 13.6 API

```text
doc/13-api

doc/37-api-platform
```

Review questions:

- Which folder owns current API standards?
- Which owns future external API Platform work?
- Which files describe existing endpoints?
- Which describe SDK, partner, or Marketplace future state?

## 13.7 Quality

```text
doc/14-quality

doc/46-enterprise-quality
```

Review questions:

- Which folder owns current testing and Quality Standards?
- Which owns future enterprise Quality Management?
- Which files describe actual tests?
- Which files describe target maturity?

## 13.8 AI

```text
doc/19-ai-workforce

doc/20-ai-operating-system

doc/44-enterprise-ai
```

Review questions:

- Which files define Agent Roles?
- Which define capacity only?
- Which define target AI OS Architecture?
- Which define AI Governance?
- Which describe current runtime evidence?
- Which incorrectly imply active Agents?
- Which belong in default AI context?

---

# 14. Loose Root Document Review

Every loose file under `doc/` should be classified.

Important groups include:

## 14.1 Canonical Current Documents

```text
CURRENT-STATE.md

DOCUMENT-STATUS-REGISTRY.md

CANONICAL-DOCUMENT-MAP.md

MIANX-AI-MASTER-COMPLETION-PHASES.md

PHASE-1-COMPLETION-CHECKLIST.md

PHASE-1-POST-MIGRATION-VERIFICATION.md

README.md
```

These should normally remain easy to find at the `doc/` root.

## 14.2 Phase 1 Evidence

Files beginning with:

```text
PHASE-1-
```

should be classified as:

- active closeout evidence;
- supporting evidence;
- historical readiness;
- operational runbook;
- superseded evidence.

They should not be moved until Phase 1 closes and references are verified.

## 14.3 AI Readiness and Live-Run Files

Files relating to:

```text
ONE-AGENT-

OPENAI-

LIVE-RUN-
```

must be reviewed carefully.

They may describe:

- readiness;
- rehearsal;
- disabled provider behavior;
- migration preparation;
- future live-run controls;
- stale earlier execution planning.

They must not be interpreted as proof of active or live-tested Agents.

## 14.4 Product Planning

```text
prd.md

product-roadmap.md
```

These require reconciliation with:

- current Company direction;
- Product and Architecture Re-Baseline;
- Master Completion Phases;
- Master Roadmap Summary.

## 14.5 Historical Master Roadmap

```text
complete-roadmap.md
```

This should remain historical and non-canonical for current facts.

## 14.6 Project Tree and Responsibility Maps

Files such as:

```text
COMPLETE_PROJECT_TREE.txt

ADMIN-WORKFORCE-RESPONSIBILITY-MAP.md
```

must be classified as:

- inventory;
- planning;
- historical structure;
- responsibility model;
- generated output.

They must not automatically control current Architecture.

---

# 15. Historical Roadmap Treatment

## 15.1 Required Classification

```text
doc/complete-roadmap.md
```

should be classified as:

```text
Historical and Aspirational Strategic Archive
```

## 15.2 Required Banner

The file should receive a visible notice:

```markdown
> [!IMPORTANT]
> This document is a historical strategic reference and long-term Vision
> archive.
>
> It is not the source of truth for current implementation, deployment,
> Product maturity, Customer adoption, Phase status, active AI Agents,
> Production readiness, or immediate execution.
>
> Current truth is maintained in:
>
> - `CURRENT-STATE.md`
> - `DOCUMENT-STATUS-REGISTRY.md`
> - `CANONICAL-DOCUMENT-MAP.md`
> - `PHASE-1-COMPLETION-CHECKLIST.md`
> - `execution/EXECUTION-BOARD.md`
```

## 15.3 Historical Roadmap Rules

- preserve the file;
- do not rewrite its complete historical content;
- do not use it as default AI context;
- do not treat its capability descriptions as current facts;
- preserve valid strategic learning;
- record conflicts in the Registry;
- archive physically only after approval.

---

# 16. Current Execution Document Treatment

The current working execution source is:

```text
execution/EXECUTION-BOARD.md
```

Legacy files such as:

```text
NEXT-EXECUTION-PLAN.md
```

must be classified before further use.

Possible treatment:

- preserve unique historical planning;
- mark stale execution phases;
- link to the current Execution Board;
- deprecate as active execution authority;
- retain as historical planning evidence.

A legacy execution plan must not compete with the current Execution Board.

---

# 17. Duplicate Content Treatment

When duplicate content is found:

1. identify the topic;
2. identify every related file;
3. identify the highest-authority source;
4. identify unique valid content;
5. identify stale or unsupported content;
6. select one canonical source;
7. merge only valid unique content where needed;
8. replace repeated sections with links;
9. add a supersession or deprecation notice;
10. update the Registry;
11. update the Canonical Map;
12. verify all references.

Do not concatenate complete duplicate documents into another mega-file.

---

# 18. Supersession Notice Standard

A superseded document should include:

```markdown
> [!WARNING]
> This document has been superseded for its former canonical scope.
>
> Current authority:
>
> `<path-to-current-document>`
>
> This file is retained for historical context and must not override the current
> canonical source.
```

The notice must identify:

- replacement path;
- effective version or date;
- retained historical purpose;
- any remaining unique scope.

---

# 19. Deprecated Document Notice

A deprecated document should include:

```markdown
> [!CAUTION]
> This document is deprecated.
>
> It may contain useful historical or transitional information, but it must not
> guide new work without verification against the current canonical sources.
```

---

# 20. Archive Notice Standard

An archived document should include:

```markdown
> [!IMPORTANT]
> Historical Archive
>
> This document is retained to preserve previous decisions, plans, evidence, or
> Architecture.
>
> It is not current implementation truth or current execution authority.
```

---

# 21. Link Validation Plan

Link validation must cover:

- Markdown links;
- plain-text paths;
- frontmatter paths;
- Related Documents sections;
- README navigation;
- Registry references;
- Canonical Map references;
- AGENTS reading order;
- execution references;
- historical banners;
- `doc/` and `docs/` path references.

## 21.1 Link Result Categories

| Result | Meaning |
|---|---|
| `VALID` | Target exists at the expected path |
| `WRONG_RELATIVE_PATH` | Target exists but link path is incorrect |
| `MISSING_TARGET` | Target does not exist |
| `LEGACY_PATH` | Link points to a valid but non-canonical location |
| `AMBIGUOUS_TARGET` | More than one possible target exists |
| `EXTERNAL_UNVERIFIED` | External target has not been reviewed |
| `INTENTIONAL_HISTORICAL` | Historical link is intentionally preserved |

## 21.2 Link Gate

No approved move or rename is complete until:

- all known incoming references are updated;
- all outgoing links are tested;
- Registry paths are updated;
- Canonical Map paths are updated;
- Documentation Portal paths are updated;
- no new ambiguous path exists.

---

# 22. Stale Claim Audit

The repository-wide consistency review should identify references to:

```text
Phase A

Stage 0

Stage 1

controlled Stage 2 pilot

ready_for_migration_rollout

one pending migration

445 active Agents

445 live-tested Agents

Enterprise AI OS operational

full MianX Core complete

RestaurantOS Production Operational

PoultryOS Production Operational

Marketplace operational

global Platform operational

Documentation complete

Repository complete

Production ready
```

Each match must be classified as:

- current factual claim;
- future-state statement;
- historical statement;
- quoted old wording;
- unsupported claim;
- false positive.

Historical wording may remain when clearly labelled.

---

# 23. Security and Public-Safety Review

Documentation refactoring must identify:

- passwords;
- API keys;
- access tokens;
- service-role values;
- connection strings;
- private keys;
- reusable local credentials;
- Customer Data;
- Tenant identifiers;
- private operational contacts;
- local machine usernames;
- absolute private paths;
- raw backup locations;
- sensitive Production inventories.

Possible treatment:

- remove from current public content;
- replace with safe placeholders;
- retain restricted evidence outside the public repository;
- review credential reuse;
- rotate where required;
- review Git history;
- record closure without exposing secret values.

---

# 24. AI Context Cleanup

Default AI and contributor context should prioritize:

```text
README.md

doc/CURRENT-STATE.md

doc/DOCUMENT-STATUS-REGISTRY.md

doc/CANONICAL-DOCUMENT-MAP.md

doc/PHASE-1-COMPLETION-CHECKLIST.md

doc/MIANX-AI-MASTER-COMPLETION-PHASES.md

execution/EXECUTION-BOARD.md

AGENTS.md

Relevant approved domain document

Relevant implementation and evidence files
```

Default context should exclude:

```text
doc/complete-roadmap.md

Superseded documents

Deprecated execution plans

Archived documents

Chat exports

Unrelated generated documents

Duplicate README files

Large future-state documents unrelated to the task
```

---

# 25. Proposed Refactor Stages

## Stage R0 — Refactor Authorization

### Objective

Confirm that normalization may begin.

### Required Outcomes

- Founder approves this Plan;
- Documentation owner is assigned;
- destructive changes remain locked;
- current canonical documents are protected;
- current branch or working set is identified;
- evidence requirements are approved.

### Exit Gate

- [ ] Founder approval recorded.
- [ ] Owner recorded.
- [ ] Scope approved.
- [ ] Non-scope approved.
- [ ] Current canonical paths protected.
- [ ] No mass deletion authorized.

---

## Stage R1 — Complete Inventory

### Objective

Create an accurate Documentation inventory.

### Required Inventory Fields

- path;
- type;
- size;
- owner;
- last meaningful update;
- title;
- classification;
- authority;
- duplicates;
- references;
- sensitive-content status;
- proposed action.

### Exit Gate

- [ ] Every top-level folder inventoried.
- [ ] Every loose root file inventoried.
- [ ] `docs/` inventoried.
- [ ] Overlapping folder pairs recorded.
- [ ] Unknown items identified.
- [ ] No item deleted.

---

## Stage R2 — Authority and Classification

### Objective

Assign each file a valid role.

### Exit Gate

- [ ] Canonical documents identified.
- [ ] Canonical Drafts identified.
- [ ] Evidence identified.
- [ ] Runbooks identified.
- [ ] Planning identified.
- [ ] Templates identified.
- [ ] Historical content identified.
- [ ] Generated content identified.
- [ ] Unsafe content identified.
- [ ] Unknown classification count recorded.

---

## Stage R3 — Duplicate and Conflict Analysis

### Objective

Identify topic-level duplication and conflicting authority.

### Required Areas

- Company Vision and Mission;
- enterprise principles;
- Platform Architecture;
- AI Governance;
- Product strategy;
- Roadmaps;
- execution plans;
- Agent counts;
- Phase terminology;
- migration status;
- recovery status;
- folder indexes;
- README files.

### Exit Gate

- [ ] Duplicate clusters recorded.
- [ ] Conflicts recorded.
- [ ] Canonical winner proposed.
- [ ] Unique valid content identified.
- [ ] Sensitive content identified.
- [ ] No unsupported merge performed.

---

## Stage R4 — Refactor Decision Package

### Objective

Prepare an exact proposed change set before movement.

Each proposed action should identify:

```text
Source:
Destination:
Action:
Reason:
Canonical Topic:
Unique Content Preserved:
References Affected:
Security Impact:
History Impact:
Rollback:
Approver:
```

### Exit Gate

- [ ] Every move has a destination.
- [ ] Every deletion candidate has justification.
- [ ] Every merge identifies preserved unique content.
- [ ] Every rename identifies affected references.
- [ ] Every archive candidate has a banner.
- [ ] Founder or domain approval recorded.

---

## Stage R5 — Controlled Content Consolidation

### Objective

Reduce repeated active content without changing repository structure
unnecessarily.

Preferred actions:

- update in place;
- shorten repeated sections;
- link to canonical sources;
- add banners;
- mark supersession;
- mark deprecation;
- preserve evidence.

### Exit Gate

- [ ] Repeated current-state sections reduced.
- [ ] Strategic Drafts remain centralized.
- [ ] Historical wording is labelled.
- [ ] No valid unique content is lost.
- [ ] No new mega-file is created.

---

## Stage R6 — Approved Structural Changes

### Objective

Perform only approved moves, renames, archives, or removals.

### Requirements

- exact source and destination approved;
- references identified;
- rollback exists;
- Git history preserved where possible;
- change set remains bounded;
- public-safety review passes.

### Exit Gate

- [ ] Approved movements completed.
- [ ] Approved renames completed.
- [ ] Approved archives completed.
- [ ] Approved generated duplicates removed.
- [ ] No unauthorized deletion occurred.
- [ ] No new parallel hierarchy exists.

---

## Stage R7 — Link and Consistency Verification

### Objective

Prove that the normalized Documentation remains usable.

### Exit Gate

- [ ] Canonical links resolve.
- [ ] README links resolve.
- [ ] Registry links resolve.
- [ ] Canonical Map links resolve.
- [ ] AGENTS links resolve.
- [ ] Execution links resolve.
- [ ] No stale canonical path remains.
- [ ] `doc/` and `docs/` treatment is consistent.
- [ ] Historical banners are visible.
- [ ] Stale-claim audit completed.

---

## Stage R8 — Registry and Map Reconciliation

### Objective

Synchronize final authority and paths.

### Exit Gate

- [ ] Registry contains final paths.
- [ ] Canonical Map contains final paths.
- [ ] Superseded documents are recorded.
- [ ] Deprecated documents are recorded.
- [ ] Archived documents are recorded.
- [ ] Missing owner list is recorded.
- [ ] Approval statuses are accurate.
- [ ] AI context rules are updated.

---

## Stage R9 — Founder Final Review

### Objective

Obtain final approval for the normalized Documentation structure.

### Founder Review Should Confirm

- canonical documents;
- primary Documentation root;
- treatment of `docs/`;
- archive treatment;
- deleted generated content;
- preserved history;
- unresolved conflicts;
- public-safety findings;
- future maintenance rules.

### Exit Gate

- [ ] Founder review completed.
- [ ] Conditions recorded.
- [ ] Required corrections completed.
- [ ] Final approval recorded.
- [ ] Structure status updated accurately.

---

# 26. Required Evidence

Refactor evidence should include:

- pre-change inventory;
- proposed change map;
- owner and approver;
- exact source and destination;
- before-and-after file list;
- link-validation result;
- stale-claim result;
- public-safety result;
- supersession list;
- archive list;
- unresolved issue list;
- final Registry;
- final Canonical Map;
- Founder decision.

A statement that “cleanup is complete” is not sufficient evidence.

---

# 27. Rollback Standard

Every structural batch should preserve:

- original paths;
- original content;
- affected references;
- intended destination;
- restoration method;
- responsible owner.

A movement batch should remain small enough to review and reverse.

Large mixed-purpose refactor batches should be avoided.

---

# 28. Batch Standard

Approved structural changes should be grouped by one purpose.

Examples:

```text
Batch 1 — Historical Roadmap Banners

Batch 2 — Legacy Execution Plan Classification

Batch 3 — Broken Canonical Links

Batch 4 — docs/ Root Classification

Batch 5 — Platform Folder Overlap

Batch 6 — Data Folder Overlap

Batch 7 — Security Folder Overlap

Batch 8 — AI Folder Overlap

Batch 9 — Generated Empty Stubs

Batch 10 — Final Registry and Map Reconciliation
```

Do not combine all folder cleanup into one unreviewable action.

---

# 29. Empty File and Folder Rule

An empty or near-empty file may be:

- an intentional placeholder;
- an unfinished generated stub;
- a required path;
- a future plan;
- an accidental duplicate;
- an obsolete artifact.

Before removal, verify:

- no incoming references;
- no build dependency;
- no generator dependency;
- no required placeholder policy;
- no unique metadata;
- no approval requirement.

Empty does not automatically mean safe to delete.

---

# 30. Generated Content Rule

Generated Documentation may be removed only when:

- generator source is known;
- output is reproducible;
- output is not canonical;
- output contains no unique Human decision;
- no external consumer depends on the path;
- removal is approved;
- generation rules are documented.

Generated boilerplate mixed with Human content must be separated before removal.

---

# 31. Folder Naming Rule

Folder names should describe stable responsibilities.

Avoid future additions that create pairs such as:

```text
security
security-platform
enterprise-security
security-system
```

New top-level folders require:

- distinct canonical responsibility;
- no suitable current owner;
- documented scope;
- non-scope;
- owner;
- approval;
- Map update;
- Registry update.

---

# 32. Document Size Rule

A document should be divided when:

- several unrelated authorities exist;
- owners differ;
- review cycles differ;
- the document cannot be loaded for its intended task;
- current and historical content are mixed;
- strategic and operational content are mixed;
- maintenance becomes impractical.

A document should not be divided merely to increase file count.

---

# 33. One Topic, One Authority Rule

The normalized model should use:

```text
One Canonical Document

+

One Named Owner

+

One Defined Authority

+

Many Supporting References
```

Examples:

| Topic | Canonical source |
|---|---|
| Current facts | `doc/CURRENT-STATE.md` |
| Document authority | `doc/DOCUMENT-STATUS-REGISTRY.md` |
| Canonical paths | `doc/CANONICAL-DOCUMENT-MAP.md` |
| Current execution | `execution/EXECUTION-BOARD.md` |
| Phase progression | `doc/MIANX-AI-MASTER-COMPLETION-PHASES.md` |
| Company direction | `doc/02-company/VISION-AND-MISSION.md` |
| Enterprise principles | `doc/01-governance/ENTERPRISE-PRINCIPLES.md` |
| Platform Architecture | `doc/31-enterprise-architecture/CORE-ARCHITECTURE.md` |
| AI Governance | `doc/44-enterprise-ai/AI-GOVERNANCE.md` |
| Strategic Roadmap | `doc/48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md` |

---

# 34. Success Measures

The refactor should be measured through:

- reduced conflicting active documents;
- reduced stale current-state claims;
- valid canonical links;
- fewer duplicate topic authorities;
- clear historical classification;
- clear ownership;
- clear approval status;
- reduced default AI context size;
- faster current-truth discovery;
- zero known reusable credentials in current public Documentation;
- no lost valid unique content;
- no unauthorized deletion;
- no new parallel hierarchy.

File-count reduction is not the primary success measure.

---

# 35. Refactor Risks

| Risk | Required treatment |
|---|---|
| Unique content lost | Require unique-content review |
| Links broken | Validate before and after movement |
| Historical evidence destroyed | Preserve history and archive notices |
| Wrong canonical document selected | Use authority and approval review |
| Draft treated as approved | Maintain separate approval status |
| Current facts become stale | Use `CURRENT-STATE.md` |
| Sensitive Data exposed | Perform public-safety review |
| AI loads historical content | Update default context rules |
| Massive change becomes unreviewable | Use small purpose-specific batches |
| Empty placeholders removed incorrectly | Check dependencies and references |
| `doc/` and `docs/` merged incorrectly | Complete separate classification first |
| Product Architecture changed accidentally | Require domain-owner review |

---

# 36. Refactor Stop Conditions

Stop the refactor when:

- canonical authority is unclear;
- unique content cannot be distinguished;
- required approver is unavailable;
- sensitive Data is discovered;
- a real credential is discovered;
- a move would break unknown consumers;
- a file is used by a generator or build;
- history preservation is uncertain;
- Product or Architecture meaning would change;
- the proposed batch becomes too large to review;
- current Phase closeout work would be blocked.

---

# 37. Current Plan Decision

```text
DOCUMENT_STATUS=DRAFT

FOUNDER_APPROVAL=PENDING

IMPLEMENTATION_STATUS=NOT_STARTED

DOCUMENTATION_CONTENT_SYNCHRONIZATION=PREPARED

DOCUMENTATION_STRUCTURE_NORMALIZED=NO

PRIMARY_DOCUMENTATION_ROOT=doc/

SECONDARY_DOCUMENTATION_ROOT_UNDER_REVIEW=docs/

MASS_MOVE_AUTHORIZED=NO

MASS_DELETE_AUTHORIZED=NO

MASS_RENAME_AUTHORIZED=NO

ARCHIVE_BATCH_AUTHORIZED=NO

GIT_HISTORY_REWRITE_AUTHORIZED=NO

PHASE_1_COMPLETE=NO

PHASE_2_STARTED=NO
```

---

# 38. Adoption Criteria

This Plan becomes active only when:

- [ ] Founder approves the Plan.
- [ ] Documentation owner is assigned.
- [ ] Exact scope is approved.
- [ ] Exact non-scope is approved.
- [ ] Current canonical documents are protected.
- [ ] Classification model is approved.
- [ ] Evidence requirements are approved.
- [ ] Batch model is approved.
- [ ] Rollback requirements are approved.
- [ ] Public-safety review is included.
- [ ] Registry records the Plan.
- [ ] Canonical Map references the Plan accurately.

Until then, no material structural action is authorized.

---

# 39. Final Refactor Statement

```text
MianX.ai canonical Documentation content
has been prepared for the primary authority set.

The repository structure remains unnormalized.

Normalization will begin with inventory
and classification—not deletion.

Every unique valid item will be preserved
or deliberately migrated.

Every current topic will have
one canonical authority.

Historical content will remain visible
but will not control current truth.

doc/ remains the primary Documentation root.

docs/ remains under review.

No mass movement, merge, rename,
archive, or deletion is currently authorized.
```

---

# 40. Next Controlled Activity

After this file is saved, the next action is not another master document.

The next controlled Documentation action is:

```text
Add the historical-status banner to:

doc/complete-roadmap.md
```

Only the top banner and classification metadata should be corrected initially.

The complete historical Roadmap content should not be rewritten or deleted
during that action.

---

# Change Log

| Version | Date | Change |
|---|---|---|
| 0.x | 2026-08-03 | Earlier Documentation refactor planning |
| 1.0.0 | 2026-08-04 | Rebuilt the Plan around corrected Phase 1 truth, classification-before-movement, canonical authority, overlapping folder review, loose-file inventory, `doc/` versus `docs/` review, historical preservation, link validation, public safety, AI context control, small approved batches, rollback, and Founder approval gates |