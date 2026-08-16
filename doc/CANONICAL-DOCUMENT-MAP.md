---
document_id: CANONICAL-DOCUMENT-MAP-001
title: MianX.ai Canonical Document Map
version: 1.0.0
status: Active Draft — Founder Review Required
authority_type: Documentation Navigation and Authority Map
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
implementation_status: Not Applicable
verification_status: Source-Aligned Draft
current_phase: Phase 1 — Platform Foundation
phase_status: ready_for_final_verification
phase_1_complete: false
phase_2_started: false
canonical_current_truth: ./CURRENT-STATE.md
canonical_document_registry: ./DOCUMENT-STATUS-REGISTRY.md
canonical_execution_board: ../execution/EXECUTION-BOARD.md
canonical_phase_framework: ./MIANX-AI-MASTER-COMPLETION-PHASES.md
canonical_documentation_root: doc/
legacy_documentation_root_under_review: docs/
---

# MianX.ai Canonical Document Map

> [!IMPORTANT]
> This document maps the current authoritative, strategic, operational,
> informational, draft, historical, and legacy documents of MianX.ai.
>
> It is a navigation and authority map.
>
> It does not independently prove implementation, deployment, Production
> operation, Product maturity, Customer adoption, Phase completion, recovery
> maturity, or active AI execution.
>
> Current implementation and operational truth is maintained in:
>
> [`CURRENT-STATE.md`](./CURRENT-STATE.md)

---

# 1. Purpose

This document exists to answer:

- Which document should be read first?
- Which document controls current implementation facts?
- Which document controls current execution?
- Which documents are strategic Drafts?
- Which documents require Founder approval?
- Which documents are evidence records?
- Which documents are historical?
- Which documents should not be loaded by default?
- Which duplicate or overlapping areas remain under review?
- Which path is canonical for each high-priority topic?

This Map should reduce:

- conflicting sources of truth;
- stale path usage;
- duplicate navigation;
- Roadmap-based implementation claims;
- historical content being treated as active;
- Drafts being treated as approved;
- Agent Roles being treated as active Agents;
- incorrect `doc/` and `docs/` references.

---

# 2. Current Official Boundary

The following current-state summary is included for navigation only.

[`CURRENT-STATE.md`](./CURRENT-STATE.md) remains authoritative.

```text
Current Phase = Phase 1 — Platform Foundation

Phase 1 Status = READY_FOR_FINAL_VERIFICATION

Phase 1 Complete = NO

Founder Phase 1 Sign-Off = NOT APPROVED

Phase 2 Started = NO

Full MianX Core Verified = NO

Enterprise AI Operating System Operational = NO

Allocated AI Agents = 0

Active AI Agents = 0

Live-Tested AI Agents = 0

Pending Database Migrations = 0
```

No document listed in this Map may independently upgrade these claims.

---

# 3. Canonical Documentation Root

The current primary Documentation root is:

```text
doc/
```

The repository also contains a secondary or legacy path:

```text
docs/
```

Current rule:

```text
doc/ = Primary Documentation Root

docs/ = Legacy or Secondary Content Under Review
```

Until structure normalization is approved:

- do not mass-move `docs/` content into `doc/`;
- do not delete `docs/`;
- do not create new canonical documents under `docs/`;
- do not silently change links from one root to the other;
- classify each file before an approved movement;
- preserve Git history;
- verify all references after any future move.

---

# 4. Canonical Authority Hierarchy

When documents conflict, use the following order:

```text
1. Applicable Legal or Contractual Requirement

2. Founder-Approved Constitutions
   within their approved scope

3. CURRENT-STATE.md
   for current implementation and operational facts

4. Approved Architecture Decision Records
   for their specific technical decisions

5. DOCUMENT-STATUS-REGISTRY.md
   for document authority and lifecycle

6. Active Approved Policies, Standards,
   Product Specifications, and Runbooks

7. Approved Master Completion Phases
   for Phase structure and progression

8. EXECUTION-BOARD.md
   for currently authorized work

9. Approved Strategic Roadmap Summary

10. Active Drafts

11. Historical Roadmaps, archives,
    generated summaries, examples,
    chat history, and unapproved planning
```

A lower-authority document must not silently override a higher-authority
document.

---

# 5. Canonical Document Set

## 5.1 Repository Entry Point

| Topic | Canonical document | Purpose |
|---|---|---|
| Public repository overview | [`../README.md`](../README.md) | Concise public repository identity, maturity boundary, and navigation |
| Documentation portal | [`README.md`](./README.md) | Entry point and navigation for the `doc/` directory |
| Contributor and AI instructions | [`../AGENTS.md`](../AGENTS.md) | Repository-level Human and AI operating rules |

## 5.2 Current Truth and Execution

| Topic | Canonical document | Purpose |
|---|---|---|
| Current implementation truth | [`CURRENT-STATE.md`](./CURRENT-STATE.md) | Current repository, Phase, migration, recovery, Product, AI, deployment, and operational facts |
| Document authority | [`DOCUMENT-STATUS-REGISTRY.md`](./DOCUMENT-STATUS-REGISTRY.md) | Document lifecycle, approval, authority, implementation, deployment, and verification statuses |
| Canonical navigation | [`CANONICAL-DOCUMENT-MAP.md`](./CANONICAL-DOCUMENT-MAP.md) | Canonical paths, reading order, and source relationships |
| Current authorized work | [`../execution/EXECUTION-BOARD.md`](../execution/EXECUTION-BOARD.md) | Current Phase 1 closeout tasks, blockers, dependencies, and decisions |
| Phase framework | [`MIANX-AI-MASTER-COMPLETION-PHASES.md`](./MIANX-AI-MASTER-COMPLETION-PHASES.md) | Phase order, Re-Baseline Gate, entry criteria, and exit criteria |

## 5.3 Phase 1 Closeout

| Topic | Canonical document | Purpose |
|---|---|---|
| Phase 1 exit gate | [`PHASE-1-COMPLETION-CHECKLIST.md`](./PHASE-1-COMPLETION-CHECKLIST.md) | Mandatory Phase 1 completion conditions |
| Post-migration verification | [`PHASE-1-POST-MIGRATION-VERIFICATION.md`](./PHASE-1-POST-MIGRATION-VERIFICATION.md) | Migration, schema, Security, backup, restore, and recovery evidence boundary |
| Cross-Tenant closure | [`PHASE-1-FINAL-CROSS-TENANT-SECURITY-CLOSURE.md`](./PHASE-1-FINAL-CROSS-TENANT-SECURITY-CLOSURE.md) | Supporting Tenant-isolation evidence |
| Membership-scoped access | [`PHASE-1-MEMBERSHIP-SCOPED-DATA-ACCESS.md`](./PHASE-1-MEMBERSHIP-SCOPED-DATA-ACCESS.md) | Supporting Membership-scope evidence |
| Migration rollout | [`PHASE-1-RLS-MIGRATION-ROLLOUT.md`](./PHASE-1-RLS-MIGRATION-ROLLOUT.md) | Applied migration and rollout evidence |
| Migration readiness | [`PHASE-1-RLS-SCOPE-MIGRATION-READINESS.md`](./PHASE-1-RLS-SCOPE-MIGRATION-READINESS.md) | Historical pre-application readiness record |
| Migration runbook | [`PHASE-1-RLS-SCOPE-MIGRATION-RUNBOOK.md`](./PHASE-1-RLS-SCOPE-MIGRATION-RUNBOOK.md) | Migration verification and operational procedure |
| Tenant and Admin authorization | [`PHASE-1-TENANT-ISOLATION-AND-ADMIN-AUTHORIZATION.md`](./PHASE-1-TENANT-ISOLATION-AND-ADMIN-AUTHORIZATION.md) | Supporting authorization design and evidence |

Supporting evidence documents do not independently complete Phase 1.

---

# 6. Canonical Strategic Drafts

The following documents define the proposed strategic model.

They remain Drafts until approval is recorded.

| Topic | Canonical draft | Current status |
|---|---|---|
| Enterprise decision principles | [`01-governance/ENTERPRISE-PRINCIPLES.md`](./01-governance/ENTERPRISE-PRINCIPLES.md) | Draft — Founder Approval Required |
| Company identity, Vision, and Mission | [`02-company/VISION-AND-MISSION.md`](./02-company/VISION-AND-MISSION.md) | Draft — Founder Approval Required |
| Platform and capability boundaries | [`31-enterprise-architecture/CORE-ARCHITECTURE.md`](./31-enterprise-architecture/CORE-ARCHITECTURE.md) | Draft — Architecture and Founder Approval Required |
| AI Governance | [`44-enterprise-ai/AI-GOVERNANCE.md`](./44-enterprise-ai/AI-GOVERNANCE.md) | Draft — Founder Approval Required |
| Strategic Roadmap | [`48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md`](./48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md) | Draft — Founder Approval Required |

The existence of these files means:

```text
Documented Draft
```

It does not mean:

```text
Approved

Implemented

Deployed

Verified

Production Operational
```

---

# 7. Strategic Relationship Map

```text
VISION-AND-MISSION.md
Defines why MianX.ai exists and what it intends to become

↓

ENTERPRISE-PRINCIPLES.md
Defines how enterprise decisions should be made

↓

CORE-ARCHITECTURE.md
Defines where capabilities should belong

↓

AI-GOVERNANCE.md
Defines how AI may be governed and controlled

↓

MASTER-ROADMAP-SUMMARY.md
Defines proposed long-term strategic sequence

↓

MIANX-AI-MASTER-COMPLETION-PHASES.md
Defines formal Phase progression and gates

↓

EXECUTION-BOARD.md
Defines currently authorized work

↓

CURRENT-STATE.md
Records current implementation and operational truth
```

The arrow does not mean a lower document has higher authority.

Current facts always return to `CURRENT-STATE.md`.

---

# 8. Platform Architecture Map

The proposed capability ownership model is:

```text
MianX Platform Kernel

↓

Shared Platform Services

↓

Shared Enterprise Services

↓

Governed AI Runtime

↓

Industry Operating Systems

↓

Customer Editions

↓

Delivery Channels
```

## 8.1 Platform Kernel

Canonical definition:

[`31-enterprise-architecture/CORE-ARCHITECTURE.md`](./31-enterprise-architecture/CORE-ARCHITECTURE.md)

Potential Kernel scope includes:

- identity;
- users;
- Organizations;
- Tenants;
- Memberships;
- roles;
- permissions;
- policy enforcement;
- configuration;
- feature flags;
- audit foundations;
- API standards;
- event standards;
- Security foundations;
- observability foundations;
- usage and cost hooks.

## 8.2 Shared Platform Services

Potential scope includes:

- Workspaces;
- Projects;
- tasks;
- workflows;
- approvals;
- files;
- notifications;
- search;
- reporting;
- dashboards;
- documents;
- scheduling;
- integrations.

These capabilities are not automatically Kernel capabilities.

## 8.3 Shared Enterprise Services

Potential scope includes:

- CRM;
- sales;
- billing;
- finance;
- procurement;
- inventory foundations;
- Customer Success;
- Support;
- reusable business analytics.

## 8.4 Governed AI Runtime

Canonical Governance:

[`44-enterprise-ai/AI-GOVERNANCE.md`](./44-enterprise-ai/AI-GOVERNANCE.md)

Current state remains:

```text
Allocated Agents = 0

Active Agents = 0

Live-Tested Agents = 0

Enterprise AI Operating System Operational = NO
```

## 8.5 Industry Operating Systems

Industry-specific entities, rules, calculations, workflows, reports,
permissions, integrations, and AI behavior belong in the relevant Industry
Product.

## 8.6 Customer Editions

Customer-specific variation should normally use:

- configuration;
- roles;
- permissions;
- locations;
- workflows;
- templates;
- feature flags;
- mappings;
- approved integrations;
- approved isolated extensions.

---

# 9. Required Reading Orders

## 9.1 Every Contributor

Read:

1. [`../README.md`](../README.md)
2. [`CURRENT-STATE.md`](./CURRENT-STATE.md)
3. [`DOCUMENT-STATUS-REGISTRY.md`](./DOCUMENT-STATUS-REGISTRY.md)
4. [`CANONICAL-DOCUMENT-MAP.md`](./CANONICAL-DOCUMENT-MAP.md)
5. [`../execution/EXECUTION-BOARD.md`](../execution/EXECUTION-BOARD.md)
6. [`../AGENTS.md`](../AGENTS.md)
7. the relevant approved or current domain document.

## 9.2 Founder Phase 1 Review

Read:

1. [`CURRENT-STATE.md`](./CURRENT-STATE.md)
2. [`PHASE-1-COMPLETION-CHECKLIST.md`](./PHASE-1-COMPLETION-CHECKLIST.md)
3. [`PHASE-1-POST-MIGRATION-VERIFICATION.md`](./PHASE-1-POST-MIGRATION-VERIFICATION.md)
4. [`../execution/EXECUTION-BOARD.md`](../execution/EXECUTION-BOARD.md)
5. [`DOCUMENT-STATUS-REGISTRY.md`](./DOCUMENT-STATUS-REGISTRY.md)

## 9.3 Product Contributor

Read:

1. [`CURRENT-STATE.md`](./CURRENT-STATE.md)
2. [`02-company/VISION-AND-MISSION.md`](./02-company/VISION-AND-MISSION.md)
3. [`01-governance/ENTERPRISE-PRINCIPLES.md`](./01-governance/ENTERPRISE-PRINCIPLES.md)
4. [`31-enterprise-architecture/CORE-ARCHITECTURE.md`](./31-enterprise-architecture/CORE-ARCHITECTURE.md)
5. [`MIANX-AI-MASTER-COMPLETION-PHASES.md`](./MIANX-AI-MASTER-COMPLETION-PHASES.md)
6. the relevant Product specification.

## 9.4 Architecture Contributor

Read:

1. [`CURRENT-STATE.md`](./CURRENT-STATE.md)
2. [`01-governance/ENTERPRISE-PRINCIPLES.md`](./01-governance/ENTERPRISE-PRINCIPLES.md)
3. [`02-company/VISION-AND-MISSION.md`](./02-company/VISION-AND-MISSION.md)
4. [`31-enterprise-architecture/CORE-ARCHITECTURE.md`](./31-enterprise-architecture/CORE-ARCHITECTURE.md)
5. relevant ADRs.
6. relevant implementation evidence.

## 9.5 AI Contributor

Read:

1. [`CURRENT-STATE.md`](./CURRENT-STATE.md)
2. [`44-enterprise-ai/AI-GOVERNANCE.md`](./44-enterprise-ai/AI-GOVERNANCE.md)
3. [`31-enterprise-architecture/CORE-ARCHITECTURE.md`](./31-enterprise-architecture/CORE-ARCHITECTURE.md)
4. [`../AGENTS.md`](../AGENTS.md)
5. relevant Agent, model, prompt, Tool, Data, and Workflow records.
6. current runtime evidence.

## 9.6 Migration or Recovery Reviewer

Read:

1. [`CURRENT-STATE.md`](./CURRENT-STATE.md)
2. [`PHASE-1-POST-MIGRATION-VERIFICATION.md`](./PHASE-1-POST-MIGRATION-VERIFICATION.md)
3. relevant migration evidence.
4. relevant recovery evidence.
5. [`PHASE-1-COMPLETION-CHECKLIST.md`](./PHASE-1-COMPLETION-CHECKLIST.md)

---

# 10. Current Phase Map

| Phase or gate | Canonical source | Current status |
|---|---|---|
| Phase 1 — Platform Foundation | [`PHASE-1-COMPLETION-CHECKLIST.md`](./PHASE-1-COMPLETION-CHECKLIST.md) | `READY_FOR_FINAL_VERIFICATION` |
| Product and Architecture Re-Baseline | [`MIANX-AI-MASTER-COMPLETION-PHASES.md`](./MIANX-AI-MASTER-COMPLETION-PHASES.md) | `LOCKED` |
| Phase 2 — First Industry Product Vertical Slice | [`MIANX-AI-MASTER-COMPLETION-PHASES.md`](./MIANX-AI-MASTER-COMPLETION-PHASES.md) | `NOT_STARTED` |
| Phase 3 — Controlled AI Runtime Proof | [`MIANX-AI-MASTER-COMPLETION-PHASES.md`](./MIANX-AI-MASTER-COMPLETION-PHASES.md) | `NOT_STARTED` |
| Phase 4 — Second Product and Reuse Proof | [`MIANX-AI-MASTER-COMPLETION-PHASES.md`](./MIANX-AI-MASTER-COMPLETION-PHASES.md) | `NOT_STARTED` |
| Phase 5 — Multi-Product Scale | [`48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md`](./48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md) | `NOT_STARTED` |
| Phase 6 — Ecosystem | [`48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md`](./48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md) | `NOT_STARTED` |
| Phase 7 — Regional and Global Operations | [`48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md`](./48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md) | `NOT_STARTED` |
| Phase 8 — Autonomous Enterprise Creation | [`48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md`](./48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md) | Long-Term Vision |

---

# 11. Historical and Non-Canonical Documents

## 11.1 Historical Master Roadmap

Document:

[`complete-roadmap.md`](./complete-roadmap.md)

Classification:

```text
Historical and Aspirational Strategic Archive
```

It must not be used as:

- current implementation truth;
- current execution authority;
- Product completion evidence;
- Phase completion evidence;
- Production-readiness evidence;
- Customer-live evidence;
- active-Agent evidence;
- default AI context.

## 11.2 Legacy Execution References

References to:

```text
NEXT-EXECUTION-PLAN.md
```

must not be treated as current execution authority unless the file, approval,
scope, and status are separately verified.

The current working execution authority is:

[`../execution/EXECUTION-BOARD.md`](../execution/EXECUTION-BOARD.md)

## 11.3 Old Stage Terminology

Documents using:

- `Stage 0`;
- `Stage 1`;
- `Phase A`;
- `controlled Stage 2 pilot`;
- `ready_for_migration_rollout`;

must be reviewed before use.

The current Phase terminology is defined by:

- [`CURRENT-STATE.md`](./CURRENT-STATE.md)
- [`MIANX-AI-MASTER-COMPLETION-PHASES.md`](./MIANX-AI-MASTER-COMPLETION-PHASES.md)

---

# 12. Product Documents Under Review

The following Product-level files exist or are reported but are not upgraded by
this Map:

```text
doc/prd.md

doc/product-roadmap.md
```

Their required treatment is:

- assess current scope;
- compare with the corrected Company direction;
- compare with the Re-Baseline Gate;
- remove fixed Product order not supported by evidence;
- remove unsupported maturity claims;
- identify the target user;
- identify real workflows;
- identify measurable outcomes;
- register the final authority and lifecycle.

They must not override the Master Completion Phases or current-state evidence.

---

# 13. AI Workforce Documents Under Review

Important AI Workforce and AI OS documents include:

```text
doc/19-ai-workforce/AGENT-CAPACITY-BASELINE.md

doc/19-ai-workforce/C-SUITE-AGENT-REGISTRY.md

doc/19-ai-workforce/VERIFIABLE-WORK-ENVELOPE.md

doc/20-ai-operating-system/MASTER-BLUEPRINT.md

doc/20-ai-operating-system/MULTI-PROJECT-OPERATING-MODEL.md

doc/20-ai-operating-system/prompt-os/README.md

doc/20-ai-operating-system/prompt-os/_base/base.md

doc/20-ai-operating-system/prompt-os/_layers/
```

Their current interpretation must preserve:

```text
Capacity Seats are not active Agents.

Role definitions are not runtime instances.

Prompts are not runtime execution.

Registry rows are not allocation.

Implemented modules are not active Agents.

Test-provider results are not genuine live tests.
```

Canonical AI Governance is:

[`44-enterprise-ai/AI-GOVERNANCE.md`](./44-enterprise-ai/AI-GOVERNANCE.md)

---

# 14. Numbered Folder Map

The numbered folders currently represent a large Documentation estate.

Folder existence does not prove that the related capability is:

- approved;
- implemented;
- deployed;
- verified;
- Production Operational.

## 14.1 Foundation and Company Domains

```text
01–18
```

These broadly cover:

- Governance;
- Company;
- Product;
- system;
- workforce;
- Engineering;
- Platform;
- Data;
- Security;
- DevOps;
- Operations;
- Business;
- API;
- Quality;
- UI/UX;
- Knowledge;
- assets.

## 14.2 AI and Future-System Domains

```text
19–30
```

These broadly cover:

- AI Workforce;
- AI Operating System;
- memory;
- Agent framework;
- Multi-Agent system;
- automation;
- intelligence;
- Research;
- models;
- integrations;
- observability;
- enterprise Governance.

## 14.3 Enterprise Platform and Ecosystem Domains

```text
31–50
```

These broadly cover:

- enterprise Architecture;
- Platform services;
- Marketplace;
- Plugins;
- SDK;
- CLI;
- API Platform;
- Developer Portal;
- deployment;
- enterprise Operations;
- Security Platform;
- Data Platform;
- Business Platform;
- Enterprise AI;
- cloud;
- Quality;
- innovation;
- Roadmap;
- Standards;
- templates.

These groups are navigation aids only.

They are not maturity claims.

---

# 15. Known Folder Responsibility Overlaps

The following areas require classification before any merge:

```text
doc/07-platform
and
doc/32-platform-services
```

```text
doc/08-data
and
doc/42-data-platform
```

```text
doc/09-security
and
doc/41-security-platform
```

```text
doc/11-operations
and
doc/40-enterprise-operations
```

```text
doc/12-business
and
doc/43-business-platform
```

```text
doc/13-api
and
doc/37-api-platform
```

```text
doc/14-quality
and
doc/46-enterprise-quality
```

```text
doc/19-ai-workforce
doc/20-ai-operating-system
and
doc/44-enterprise-ai
```

## 15.1 Overlap Rule

An overlap does not automatically mean duplication.

Each area may contain:

- current canonical content;
- older but valid evidence;
- future-state planning;
- implementation details;
- standards;
- templates;
- generated boilerplate;
- superseded content;
- historical records.

Every file must be classified before movement or removal.

---

# 16. Canonical Topic Ownership

| Topic | Canonical current source |
|---|---|
| Current reality | `doc/CURRENT-STATE.md` |
| Document status and authority | `doc/DOCUMENT-STATUS-REGISTRY.md` |
| Document paths and reading order | `doc/CANONICAL-DOCUMENT-MAP.md` |
| Current execution | `execution/EXECUTION-BOARD.md` |
| Phase progression | `doc/MIANX-AI-MASTER-COMPLETION-PHASES.md` |
| Phase 1 exit | `doc/PHASE-1-COMPLETION-CHECKLIST.md` |
| Phase 1 migration and recovery boundary | `doc/PHASE-1-POST-MIGRATION-VERIFICATION.md` |
| Company direction | `doc/02-company/VISION-AND-MISSION.md` |
| Enterprise principles | `doc/01-governance/ENTERPRISE-PRINCIPLES.md` |
| Platform boundaries | `doc/31-enterprise-architecture/CORE-ARCHITECTURE.md` |
| AI Governance | `doc/44-enterprise-ai/AI-GOVERNANCE.md` |
| Long-term strategic Roadmap | `doc/48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md` |
| Public repository overview | `README.md` |
| Documentation portal | `doc/README.md` |
| Contributor and AI rules | `AGENTS.md` |
| Historical strategic archive | `doc/complete-roadmap.md` |

---

# 17. Canonical Document Status Model

Every canonical document should record separate statuses for:

## Document Lifecycle

- Draft
- Active Draft
- Review Required
- Approved
- Active
- Superseded
- Deprecated
- Archived
- Withdrawn

## Approval

- Not Required
- Pending
- Approved
- Approved With Conditions
- Rejected
- Withdrawn
- Unknown

## Implementation

- Not Applicable
- Not Started
- Planned
- Partial
- Implemented
- Unknown

## Deployment

- Not Applicable
- Not Deployed
- Preview
- Deployed
- Production Verification Pending
- Production Operational
- Unknown

## Verification

- Unverified
- Reported
- Partially Verified
- Verified
- Verification Expired
- Failed Verification
- Not Applicable

One status must not replace all other dimensions.

---

# 18. Link Standard

Links must be relative to the current file.

From `doc/CANONICAL-DOCUMENT-MAP.md`:

```text
Root README:
../README.md

Root AGENTS:
../AGENTS.md

Execution Board:
../execution/EXECUTION-BOARD.md

Current State:
./CURRENT-STATE.md

Company Vision:
./02-company/VISION-AND-MISSION.md

Core Architecture:
./31-enterprise-architecture/CORE-ARCHITECTURE.md
```

After any approved file movement:

- update Markdown links;
- update plain-text path references;
- update this Map;
- update the Registry;
- update Documentation Portal links;
- update AGENTS instructions;
- verify the old path no longer controls current work.

---

# 19. AI Context Map

## 19.1 Default Context

AI tools should normally receive:

```text
README.md

doc/CURRENT-STATE.md

doc/DOCUMENT-STATUS-REGISTRY.md

doc/CANONICAL-DOCUMENT-MAP.md

doc/PHASE-1-COMPLETION-CHECKLIST.md

doc/MIANX-AI-MASTER-COMPLETION-PHASES.md

execution/EXECUTION-BOARD.md

AGENTS.md

Relevant approved or current domain document

Relevant implementation and test evidence
```

## 19.2 Default Exclusions

AI tools should normally exclude:

```text
doc/complete-roadmap.md

Superseded documents

Deprecated execution plans

Archived documents

Unrelated generated documents

Duplicate README copies

Chat exports

Unapproved future-state documents
unrelated to the active task
```

## 19.3 AI Interpretation Rule

AI must distinguish:

- current fact;
- approved rule;
- proposed Draft;
- planned future state;
- historical record;
- implementation evidence;
- runtime evidence;
- unsupported claim.

---

# 20. Current Known Canonical Conflicts

| ID | Conflict | Correct treatment |
|---|---|---|
| MAP-C01 | `Phase A` versus Phase 1 | Current Phase is Phase 1 — Platform Foundation |
| MAP-C02 | `Stage 1` versus corrected Phase model | Use Master Completion Phases |
| MAP-C03 | One pending migration | Current recorded pending migrations are zero |
| MAP-C04 | Migration still requires application | Required Phase 1 migration is recorded as applied |
| MAP-C05 | 445 active Agents | 445 represents capacity; active count is zero |
| MAP-C06 | Enterprise AI OS operational | It is not operational |
| MAP-C07 | Phase 2 already started | Phase 2 has not started |
| MAP-C08 | Full Core complete | Full Core is not verified |
| MAP-C09 | RestaurantOS fixed as first Product | First Product requires evidence-based Re-Baseline |
| MAP-C10 | Work and Files automatically inside Kernel | They are Shared Platform Service candidates |
| MAP-C11 | Root README and `doc/README.md` have the same purpose | They have separate repository and Documentation roles |
| MAP-C12 | `complete-roadmap.md` controls current execution | It is historical only |
| MAP-C13 | `NEXT-EXECUTION-PLAN.md` controls active work | Current working source is the Execution Board |
| MAP-C14 | `docs/` is the canonical root | Current primary root is `doc/` |
| MAP-C15 | Document existence proves approval | Approval must be recorded separately |

---

# 21. Structure Normalization Rules

Documentation normalization must follow:

```text
Inventory

↓

Classification

↓

Authority Review

↓

Unique-Content Review

↓

Canonical Selection

↓

Founder or Domain Approval

↓

Reference Update Plan

↓

Controlled Movement or Supersession

↓

Link Verification

↓

Registry and Map Update
```

Normalization must not begin with mass deletion.

---

# 22. Prohibited Structure Actions

Until separately approved, do not:

- delete a numbered folder;
- merge overlapping folders;
- rename `doc/` to `docs/`;
- rename `docs/` to `doc/`;
- create another Documentation hierarchy;
- create another Master Roadmap;
- create another Current State document;
- create another Execution Board;
- create another Documentation Portal;
- move evidence into strategic folders without classification;
- archive content solely because it conflicts;
- remove history to hide earlier decisions.

---

# 23. Canonical Selection Criteria

A document may become canonical when:

- its purpose is unique;
- its scope is clear;
- its owner is assigned;
- its authority is defined;
- its status is recorded;
- higher-authority conflicts are resolved;
- current facts are evidence-based;
- future state is labelled;
- required review occurs;
- required approval is recorded;
- links are valid;
- sensitive content is safe;
- the Registry is updated;
- this Map is updated.

A newer file is not automatically canonical.

---

# 24. Supersession Standard

A document may be superseded only when:

- replacement exists;
- replacement scope is complete;
- approval requirements are met;
- unique valid content is preserved;
- references are updated;
- Registry entry is updated;
- this Map is updated;
- old document receives a supersession notice;
- default AI context is updated;
- Git history remains preserved.

---

# 25. Historical Classification Standard

A document may be historical when it records:

- an old Roadmap;
- a previous Architecture;
- an old Phase model;
- a completed incident;
- a completed migration plan;
- a superseded decision;
- past evidence;
- an earlier Company direction.

Historical documents should state:

```text
Historical Reference

Not Current Implementation Truth

Not Current Execution Authority
```

---

# 26. Current Documentation Synchronization Status

The following primary documents have been prepared during the current
synchronization pass:

- [x] `doc/CURRENT-STATE.md`
- [x] `doc/PHASE-1-COMPLETION-CHECKLIST.md`
- [x] `doc/PHASE-1-POST-MIGRATION-VERIFICATION.md`
- [x] `doc/MIANX-AI-MASTER-COMPLETION-PHASES.md`
- [x] `README.md`
- [x] `doc/README.md`
- [x] `execution/EXECUTION-BOARD.md`
- [x] `AGENTS.md`
- [x] `doc/DOCUMENT-STATUS-REGISTRY.md`
- [x] `doc/01-governance/ENTERPRISE-PRINCIPLES.md`
- [x] `doc/02-company/VISION-AND-MISSION.md`
- [x] `doc/31-enterprise-architecture/CORE-ARCHITECTURE.md`
- [x] `doc/44-enterprise-ai/AI-GOVERNANCE.md`
- [x] `doc/48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md`
- [x] `doc/CANONICAL-DOCUMENT-MAP.md`

These checkmarks mean replacement content was prepared in the current
Documentation workflow.

They do not independently prove:

- repository save;
- correct diff;
- commit;
- Pull Request inclusion;
- merge;
- deployment;
- Founder approval.

---

# 27. Remaining Documentation Cleanup Work

After this Map, the remaining controlled work includes:

- stale-claim inventory;
- duplicate-document classification;
- folder responsibility classification;
- `doc/` versus `docs/` review;
- broken-link verification;
- relative-path correction;
- historical banners;
- supersession mapping;
- Registry reconciliation;
- public-safety review;
- final consistency audit;
- Founder review preparation.

---

# 28. Map Adoption Criteria

This Map becomes approved when:

- [ ] Founder reviews the authority hierarchy.
- [ ] Canonical paths are verified.
- [ ] Every listed canonical file exists.
- [ ] Relative links resolve.
- [ ] Document statuses match the Registry.
- [ ] Current-state claims match `CURRENT-STATE.md`.
- [ ] Execution authority matches the Execution Board.
- [ ] Historical Roadmap classification is confirmed.
- [ ] `doc/` and `docs/` treatment is approved.
- [ ] Default AI context rules are approved.
- [ ] Conflicting canonical claims are resolved.
- [ ] Document Status Registry records approval.

Until then:

```text
Document Status = Active Draft

Founder Approval = Pending

Implementation Status = Not Applicable

Verification Status = Source-Aligned Draft
```

---

# 29. Review and Maintenance

Update this Map when:

- a canonical document is created;
- a canonical path changes;
- a document is approved;
- a document is superseded;
- a document is deprecated;
- a document is archived;
- the active Phase changes;
- the execution authority changes;
- a folder is normalized;
- an AI context rule changes;
- a new Product becomes active;
- a new Architecture authority is approved.

Review cadence:

- during every canonical synchronization;
- before Phase completion;
- after approved structure changes;
- quarterly after Documentation stabilization.

---

# 30. Current Map Decision

```text
DOCUMENT_STATUS=ACTIVE_DRAFT

FOUNDER_APPROVAL=PENDING

PRIMARY_DOCUMENTATION_ROOT=doc/

LEGACY_DOCUMENTATION_ROOT=docs/

CURRENT_TRUTH_SOURCE=doc/CURRENT-STATE.md

CURRENT_EXECUTION_SOURCE=execution/EXECUTION-BOARD.md

CURRENT_PHASE_FRAMEWORK=doc/MIANX-AI-MASTER-COMPLETION-PHASES.md

HISTORICAL_MASTER_ROADMAP=doc/complete-roadmap.md

MASS_STRUCTURE_CHANGE_AUTHORIZED=NO

DOCUMENTATION_STRUCTURE_NORMALIZED=NO

PHASE_1_COMPLETE=NO

PHASE_2_STARTED=NO
```

---

# 31. Final Canonical Statement

```text
MianX.ai uses CURRENT-STATE.md
for current implementation and operational truth.

DOCUMENT-STATUS-REGISTRY.md
controls document authority and lifecycle.

CANONICAL-DOCUMENT-MAP.md
controls navigation and canonical paths.

MIANX-AI-MASTER-COMPLETION-PHASES.md
defines Phase progression.

EXECUTION-BOARD.md
defines currently authorized work.

The five strategic documents remain Drafts
until Founder and required domain approval.

complete-roadmap.md remains historical.

doc/ remains the primary Documentation root.

docs/ remains under review.

No mass folder movement, merge, deletion,
or archive action is authorized yet.
```

---

# 32. Next Document

After this file is saved and reviewed, the next file to edit is:

```text
doc/DOCUMENTATION-REFACTOR-PLAN.md
```

That document must:

- use the corrected current Phase terminology;
- define cleanup as classification before movement;
- preserve all unique valid content;
- classify overlapping folder pairs;
- classify loose root documents;
- classify `doc/` and `docs/`;
- define supersession and archive rules;
- define broken-link verification;
- prohibit immediate mass deletion;
- prohibit creation of another hierarchy;
- preserve Git history;
- define Founder approval gates;
- remain a Plan rather than claiming cleanup completion.

---

# Change Log

| Version | Date | Change |
|---|---|---|
| 0.x | Earlier version | Initial canonical navigation and document map |
| 1.0.0 | 2026-08-04 | Rebuilt the Map around the corrected Phase 1 truth, current execution authority, separate strategic Drafts, Platform layer boundaries, AI zero-state, historical Roadmap classification, `doc/` versus `docs/` treatment, overlapping folder review, and controlled normalization rules |