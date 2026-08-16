---
document_id: DOCUMENT-STATUS-REGISTRY-001
title: MianX.ai Document Status Registry
version: 1.0.0
status: Active Draft — Founder Review Required
authority_type: Registry
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
  - Operations Owner
created: 2026-08-03
updated: 2026-08-04
last_reviewed: 2026-08-04
current_phase: Phase 1 — Platform Foundation
phase_status: ready_for_final_verification
phase_1_complete: false
founder_phase_1_signoff: not_approved
phase_2_started: false
verified_origin_main_commit: 2d9b4862e7764aae5c26f0e247bb85310bc752f8
canonical_current_truth: ./CURRENT-STATE.md
canonical_phase_framework: ./MIANX-AI-MASTER-COMPLETION-PHASES.md
canonical_execution_board: ../execution/EXECUTION-BOARD.md
---

# MianX.ai Document Status Registry

> [!IMPORTANT]
> This Registry defines document authority, lifecycle, approval, implementation,
> deployment, verification, supersession, and AI-context status.
>
> It does not independently prove implementation, deployment, Production
> operation, Customer adoption, Phase completion, or active AI execution.
>
> Current implementation and operational truth is maintained in:
>
> [`CURRENT-STATE.md`](./CURRENT-STATE.md)
>
> This Registry does not approve the documents it lists.
>
> Founder or domain approval must be recorded separately where required.

---

# 1. Purpose

This Registry identifies:

- which documents are canonical;
- which documents are current working drafts;
- which documents require Founder or domain approval;
- which documents are superseded, deprecated, or historical;
- which documents describe current reality;
- which documents describe future state;
- whether described capabilities are implemented;
- whether implementation is deployed;
- whether evidence has been reviewed;
- which document wins when sources conflict;
- which documents AI tools should load by default;
- which documents must remain outside routine AI context;
- which owner must maintain each document;
- which documents require correction or reconciliation.

The Registry prevents:

- Documentation being mistaken for implementation;
- old Roadmaps overriding current truth;
- draft Architecture being treated as approved Architecture;
- role definitions being counted as active Agents;
- old migration instructions being treated as current;
- duplicate documents creating parallel authority;
- current execution being controlled by historical plans;
- unsupported Production claims;
- silent changes to document authority.

---

# 2. Registry Boundary

## 2.1 This Registry Governs

This Registry governs:

- document authority;
- lifecycle;
- approval;
- canonical path;
- ownership;
- implementation classification;
- deployment classification;
- verification classification;
- supersession;
- historical classification;
- conflict resolution;
- indexing and AI-context rules;
- review cadence.

## 2.2 This Registry Does Not Govern

This Registry does not independently govern:

- source-code behavior;
- Production configuration;
- database state;
- runtime Agent allocation;
- live provider execution;
- Customer contracts;
- legal licensing rights;
- Phase completion;
- Product launch;
- Production deployment.

Those facts require their own authorized evidence and decision records.

---

# 3. Current Official Truth

The following current-state summary is reproduced for navigation only.

`CURRENT-STATE.md` remains the authority.

| Item | Current recorded status |
|---|---|
| Current Phase | **Phase 1 — Platform Foundation** |
| Phase 1 status | **READY_FOR_FINAL_VERIFICATION** |
| Phase 1 complete | **No** |
| Founder Phase 1 sign-off | **Not approved** |
| Phase 2 started | **No** |
| Full MianX Core verified | **No** |
| Enterprise AI Operating System operational | **No** |
| Allocated AI Agents | **0** |
| Active AI Agents | **0** |
| Live-tested AI Agents | **0** |
| Genuine provider generation calls | **0** |
| Required Phase 1 migration | **Applied** |
| Pending database migrations | **0** |
| Manual logical recovery proof | **Reported passed** |
| Managed backup | **Unavailable or unverified** |
| Point-in-Time Recovery | **Unavailable** |
| Founder authenticated Production smoke | **Pending** |
| Canonical Documentation synchronization | **In progress** |
| Phase 1 closeout PR | **PR #95 — Open Draft at last verification** |

This Registry must not be used to upgrade any of these claims.

---

# 4. Registry Dimensions

Every governed document should be evaluated across separate dimensions.

A single word such as `complete` is not sufficient.

---

# 5. Document Lifecycle Status

| Status | Meaning |
|---|---|
| `DRAFT` | Initial content exists but is not authoritative |
| `ACTIVE_DRAFT` | Current working document used during synchronization but approval remains pending |
| `REVIEW_REQUIRED` | Draft is ready for Human or domain review |
| `APPROVED` | Authorized for its stated scope |
| `ACTIVE` | Current approved document used for decisions or operations |
| `SUPERSEDED` | Replaced by a newer approved source |
| `DEPRECATED` | Retained temporarily but should not guide new work |
| `ARCHIVE_PENDING` | Historical classification selected but archive controls remain incomplete |
| `ARCHIVED` | Historical reference only |
| `WITHDRAWN` | Removed from use because it is unsafe, invalid, or unauthorized |
| `MISSING` | Required document does not currently exist or has not been verified |
| `UNKNOWN` | Lifecycle could not be established |

## 5.1 Active Draft Boundary

`ACTIVE_DRAFT` means:

- the document is the current working version;
- contributors may use it for synchronization;
- it is not Founder-approved;
- it must not override an approved higher-authority source;
- it requires repository and Human review.

---

# 6. Approval Status

| Status | Meaning |
|---|---|
| `NOT_REQUIRED` | Document does not require formal approval |
| `PENDING` | Required approval has not been issued |
| `APPROVED` | Required authority approved the document |
| `APPROVED_WITH_CONDITIONS` | Approval exists with recorded conditions |
| `REJECTED` | Approver rejected the document |
| `WITHDRAWN` | Previous approval is no longer valid |
| `UNKNOWN` | Approval record could not be verified |

Approval must identify:

- approver;
- date;
- version;
- scope;
- conditions;
- related decision record.

A template containing an approval statement is not approval.

---

# 7. Implementation Status

| Status | Meaning |
|---|---|
| `NOT_APPLICABLE` | Document does not describe an implementable capability |
| `NOT_STARTED` | No known implementation exists |
| `PLANNED` | Future implementation is proposed or approved |
| `PARTIAL` | Some code, configuration, or control exists |
| `IMPLEMENTED` | Required code or configuration exists |
| `UNKNOWN` | Implementation evidence is unavailable or conflicting |

Implementation does not prove deployment or operational maturity.

---

# 8. Deployment and Operational Status

| Status | Meaning |
|---|---|
| `NOT_APPLICABLE` | Deployment does not apply |
| `NOT_DEPLOYED` | Implementation is not deployed |
| `PREVIEW` | Deployed only to a temporary or Preview environment |
| `DEPLOYED` | Deployed to a named environment |
| `PRODUCTION_VERIFICATION_PENDING` | Production deployment may exist but required verification remains incomplete |
| `PRODUCTION_OPERATIONAL` | Live, owned, monitored, supported, recoverable, and verified |
| `UNKNOWN` | Deployment state cannot be established |

A successful build, CI result, Preview deployment, or merged Pull Request does
not independently prove `PRODUCTION_OPERATIONAL`.

---

# 9. Verification Status

| Status | Meaning |
|---|---|
| `UNVERIFIED` | No current evidence has been reviewed |
| `REPORTED` | A prior report exists but has not been independently rechecked |
| `PARTIALLY_VERIFIED` | Some required evidence has been reviewed |
| `VERIFIED` | Required evidence was reviewed for the stated scope |
| `VERIFICATION_EXPIRED` | Previous evidence is too old or the relevant scope changed |
| `FAILED_VERIFICATION` | Evidence contradicts the claim |
| `NOT_APPLICABLE` | Verification does not apply |

Verification must identify:

- repository;
- commit or version;
- environment;
- date;
- evidence;
- reviewer;
- limitations.

---

# 10. Authority Types

| Authority type | Meaning |
|---|---|
| `CONSTITUTIONAL` | Highest Founder-approved Company or AI authority within scope |
| `LEGAL_OR_CONTRACTUAL` | Applicable law, contract, license, or binding commitment |
| `CURRENT_TRUTH` | Current implementation and operational reality |
| `REGISTRY` | Document authority, lifecycle, and canonical status |
| `ARCHITECTURE_DECISION` | Approved technical decision within stated scope |
| `STANDARD_OR_POLICY` | Mandatory approved requirement |
| `PRODUCT_SPECIFICATION` | Approved Product behavior, workflow, or acceptance criteria |
| `PHASE_FRAMEWORK` | Approved Phase order, scope, entry gates, and exit gates |
| `EXECUTION` | Currently authorized work |
| `OPERATIONAL` | Runbook, release, incident, recovery, or support procedure |
| `EVIDENCE` | Test, migration, deployment, recovery, or verification record |
| `STRATEGIC` | Long-term direction; not current implementation truth |
| `INFORMATIONAL` | Navigation or explanatory guidance |
| `HISTORICAL` | Archived record |
| `PLANNING` | Proposed future work without operational authority |

---

# 11. Canonical Authority Hierarchy

When documents conflict, use the following order.

```text
1. Applicable Legal or Contractual Requirement

2. Founder-Approved Constitutions
   within their defined authority

3. CURRENT-STATE.md
   for current implementation and operational facts

4. Approved Architecture Decision Records
   for their specific technical decisions

5. DOCUMENT-STATUS-REGISTRY.md
   for document authority and lifecycle

6. Active Approved Policies, Standards,
   Product Specifications, and Operational Runbooks

7. Approved Phase Framework
   for Phase boundaries and progression

8. EXECUTION-BOARD.md
   for currently authorized work

9. Approved Strategic Roadmap Summary

10. Active Drafts

11. Historical Roadmaps, Archives, Generated Summaries,
    Examples, Chat History, and Unapproved Planning Material
```

A lower-authority source must not silently override a higher-authority source.

## 11.1 Current Working Hierarchy

Until all approvals are recorded, contributors should use:

```text
doc/CURRENT-STATE.md

↓

doc/DOCUMENT-STATUS-REGISTRY.md

↓

doc/PHASE-1-COMPLETION-CHECKLIST.md

↓

doc/MIANX-AI-MASTER-COMPLETION-PHASES.md

↓

execution/EXECUTION-BOARD.md

↓

README.md and doc/README.md

↓

AGENTS.md

↓

Relevant Draft or Historical Documents
```

This is a working hierarchy during Phase 1 synchronization.

It does not convert drafts into Founder-approved policy.

---

# 12. Canonical Current-State Registry

| Document | Authority | Lifecycle | Approval | Implementation | Deployment | Verification | Canonical scope |
|---|---|---|---|---|---|---|---|
| [`CURRENT-STATE.md`](./CURRENT-STATE.md) | Current Truth | `ACTIVE_DRAFT` | `PENDING` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `PARTIALLY_VERIFIED` | Current repository, Phase, migration, recovery, Product, AI, deployment, and operational truth |
| [`DOCUMENT-STATUS-REGISTRY.md`](./DOCUMENT-STATUS-REGISTRY.md) | Registry | `ACTIVE_DRAFT` | `PENDING` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `PARTIALLY_VERIFIED` | Document authority, lifecycle, approval, supersession, and context control |
| [`PHASE-1-COMPLETION-CHECKLIST.md`](./PHASE-1-COMPLETION-CHECKLIST.md) | Phase Exit Gate | `ACTIVE_DRAFT` | `PENDING` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `PARTIALLY_VERIFIED` | Mandatory Phase 1 completion gates |
| [`PHASE-1-POST-MIGRATION-VERIFICATION.md`](./PHASE-1-POST-MIGRATION-VERIFICATION.md) | Evidence | `ACTIVE_DRAFT` | `PENDING` | `IMPLEMENTED` | `PRODUCTION_VERIFICATION_PENDING` | `PARTIALLY_VERIFIED` | Migration, schema, Security, backup, restore, and recovery evidence |
| [`MIANX-AI-MASTER-COMPLETION-PHASES.md`](./MIANX-AI-MASTER-COMPLETION-PHASES.md) | Phase Framework | `REVIEW_REQUIRED` | `PENDING` | `PLANNED` | `NOT_APPLICABLE` | `UNVERIFIED` | Enterprise Phase order, scope, entry, and exit boundaries |
| [`../execution/EXECUTION-BOARD.md`](../execution/EXECUTION-BOARD.md) | Execution | `ACTIVE_DRAFT` | `PENDING` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `PARTIALLY_VERIFIED` | Currently authorized Phase 1 closeout work |
| [`../README.md`](../README.md) | Informational | `ACTIVE_DRAFT` | `PENDING` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `PARTIALLY_VERIFIED` | Public repository overview and navigation |
| [`README.md`](./README.md) | Informational | `ACTIVE_DRAFT` | `PENDING` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `PARTIALLY_VERIFIED` | Documentation navigation and authority entry point |
| [`../AGENTS.md`](../AGENTS.md) | Repository Guidance | `ACTIVE_DRAFT` | `PENDING` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `PARTIALLY_VERIFIED` | AI and contributor rules, evidence, Security, and authority boundaries |

## 12.1 Working-Copy Limitation

The files above were prepared or replaced during the current Documentation
synchronization session.

The Registry does not yet prove that:

- every replacement is saved correctly;
- every link resolves;
- every file is committed;
- the current branch contains every replacement;
- the final closeout PR contains every replacement;
- `main` contains the replacements;
- the Founder approved the replacements.

Those checks remain required.

---

# 13. Company, Governance, Architecture, AI, and Roadmap Registry

| Document | Authority | Lifecycle | Approval | Implementation | Deployment | Verification | Required action |
|---|---|---|---|---|---|---|---|
| [`01-governance/ENTERPRISE-PRINCIPLES.md`](./01-governance/ENTERPRISE-PRINCIPLES.md) | Standard or Policy | `REVIEW_REQUIRED` | `PENDING` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `UNVERIFIED` | Review principles, remove duplication, validate links, obtain Founder approval |
| [`02-company/VISION-AND-MISSION.md`](./02-company/VISION-AND-MISSION.md) | Strategic | `REVIEW_REQUIRED` | `PENDING` | `NOT_APPLICABLE` | `NOT_APPLICABLE` | `UNVERIFIED` | Align public positioning, Product model, and current maturity |
| [`31-enterprise-architecture/CORE-ARCHITECTURE.md`](./31-enterprise-architecture/CORE-ARCHITECTURE.md) | Strategic Architecture | `REVIEW_REQUIRED` | `PENDING` | `PARTIAL` | `UNKNOWN` | `UNVERIFIED` | Separate Platform Kernel, Shared Services, AI Runtime, and Industry OS boundaries |
| [`44-enterprise-ai/AI-GOVERNANCE.md`](./44-enterprise-ai/AI-GOVERNANCE.md) | Standard or Policy | `REVIEW_REQUIRED` | `PENDING` | `PARTIAL` | `NOT_DEPLOYED` | `UNVERIFIED` | Align governance with current zero-state and runtime evidence requirements |
| [`48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md`](./48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md) | Strategic | `REVIEW_REQUIRED` | `PENDING` | `PLANNED` | `NOT_APPLICABLE` | `UNVERIFIED` | Align with corrected Master Completion Phases |
| `01-governance/AI-CONSTITUTION.md` | Constitutional after approval | `REVIEW_REQUIRED` | `UNKNOWN` | `UNKNOWN` | `UNKNOWN` | `UNVERIFIED` | Verify exact path, version, Founder approval, scope, and enforcement links |

## 13.1 Five New Strategy Documents

The following five documents are not Founder-approved merely because they
exist:

```text
01-governance/ENTERPRISE-PRINCIPLES.md

02-company/VISION-AND-MISSION.md

31-enterprise-architecture/CORE-ARCHITECTURE.md

44-enterprise-ai/AI-GOVERNANCE.md

48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md
```

Their correct current classification is:

```text
Documented Draft

+

Review Required

+

Founder or Domain Approval Pending

+

Implementation Must Be Assessed Separately
```

---

# 14. Phase 1 Evidence Registry

| Document | Authority | Lifecycle | Approval | Implementation or evidence state | Verification | Required action |
|---|---|---|---|---|---|---|
| [`PHASE-1-FINAL-CROSS-TENANT-SECURITY-CLOSURE.md`](./PHASE-1-FINAL-CROSS-TENANT-SECURITY-CLOSURE.md) | Evidence | `REVIEW_REQUIRED` | `PENDING` | Security work reported implemented | `REPORTED` | Reconcile with exact merged commits and Production denial tests |
| [`PHASE-1-MEMBERSHIP-SCOPED-DATA-ACCESS.md`](./PHASE-1-MEMBERSHIP-SCOPED-DATA-ACCESS.md) | Evidence | `REVIEW_REQUIRED` | `PENDING` | Membership scope reported implemented | `REPORTED` | Validate current links, migration state, and Production behavior |
| [`PHASE-1-RLS-MIGRATION-ROLLOUT.md`](./PHASE-1-RLS-MIGRATION-ROLLOUT.md) | Operational Evidence | `REVIEW_REQUIRED` | `PENDING` | Migration recorded applied | `PARTIALLY_VERIFIED` | Remove stale rollout wording and prohibit re-application |
| [`PHASE-1-RLS-SCOPE-MIGRATION-READINESS.md`](./PHASE-1-RLS-SCOPE-MIGRATION-READINESS.md) | Evidence | `DEPRECATED` | `NOT_REQUIRED` | Historical pre-apply readiness | `REPORTED` | Mark historical after migration application |
| [`PHASE-1-RLS-SCOPE-MIGRATION-RUNBOOK.md`](./PHASE-1-RLS-SCOPE-MIGRATION-RUNBOOK.md) | Operational | `REVIEW_REQUIRED` | `PENDING` | Procedure exists | `UNVERIFIED` | Ensure it distinguishes verification from re-application |
| [`PHASE-1-TENANT-ISOLATION-AND-ADMIN-AUTHORIZATION.md`](./PHASE-1-TENANT-ISOLATION-AND-ADMIN-AUTHORIZATION.md) | Evidence or Standard | `REVIEW_REQUIRED` | `PENDING` | Foundations reported implemented | `REPORTED` | Validate Production Tenant and Admin denial evidence |
| `PHASE-1-RLS-MIGRATION-ROLLOUT.md` and migration evidence | Evidence | `ACTIVE_DRAFT` | `PENDING` | Pending migrations recorded as zero | `PARTIALLY_VERIFIED` | Reconcile repository and Production migration lists |
| Backup and restore evidence | Restricted Operational Evidence | `REVIEW_REQUIRED` | `PENDING` | Manual recovery proof reported | `REPORTED` | Review privately; preserve public-safe outcome summary only |

## 14.1 Phase 1 Evidence Rule

Phase 1 evidence documents support the closeout decision.

They do not independently:

- complete Phase 1;
- authorize Phase 2;
- prove full Production operation;
- prove managed backup;
- prove PITR;
- activate AI Agents;
- authorize a provider call.

---

# 15. AI Workforce and Operating System Registry

| Document | Authority | Lifecycle | Approval | Implementation | Deployment | Verification | Canonical boundary |
|---|---|---|---|---|---|---|---|
| `19-ai-workforce/AGENT-CAPACITY-BASELINE.md` | Planning | `REVIEW_REQUIRED` | `PENDING` | `PLANNED` | `NOT_DEPLOYED` | `UNVERIFIED` | Capacity terminology; not active-Agent count |
| `19-ai-workforce/C-SUITE-AGENT-REGISTRY.md` | Agent Role Registry | `REVIEW_REQUIRED` | `PENDING` | `PLANNED` | `NOT_DEPLOYED` | `UNVERIFIED` | Role definitions; not runtime instances |
| `19-ai-workforce/VERIFIABLE-WORK-ENVELOPE.md` | AI Execution Standard | `REVIEW_REQUIRED` | `PENDING` | `PARTIAL` | `NOT_DEPLOYED` | `UNVERIFIED` | Evidence requirements for future governed Agent work |
| `20-ai-operating-system/MASTER-BLUEPRINT.md` | Strategic Architecture | `REVIEW_REQUIRED` | `PENDING` | `PARTIAL` | `UNKNOWN` | `UNVERIFIED` | Long-term AI OS Architecture; not current operational truth |
| `20-ai-operating-system/MULTI-PROJECT-OPERATING-MODEL.md` | Strategic or Standard | `REVIEW_REQUIRED` | `PENDING` | `PARTIAL` | `UNKNOWN` | `UNVERIFIED` | Multi-Project model; current implementation assessed separately |
| `20-ai-operating-system/prompt-os/README.md` | Prompt Guidance | `REVIEW_REQUIRED` | `PENDING` | `PLANNED` | `NOT_DEPLOYED` | `UNVERIFIED` | Prompt inheritance design |
| `20-ai-operating-system/prompt-os/_base/base.md` | Prompt Standard | `REVIEW_REQUIRED` | `PENDING` | `PLANNED` | `NOT_DEPLOYED` | `UNVERIFIED` | Proposed universal Agent rules |
| `20-ai-operating-system/prompt-os/_layers/L0-founder.md` through `L5-specialist.md` | Prompt Authority Layers | `REVIEW_REQUIRED` | `PENDING` | `PLANNED` | `NOT_DEPLOYED` | `UNVERIFIED` | Proposed role and authority inheritance |

## 15.1 Current AI Truth

```text
Capacity or Registered Seats = 445

Allocated Agents = 0

Active Agents = 0

Live-Tested Agents = 0

Genuine Provider Generation Calls = 0

Enterprise AI Operating System Operational = No
```

Role documents, prompts, registries, code modules, test providers, and capacity
seats must not be counted as active runtime Agents.

---

# 16. Product and Strategic Planning Registry

| Document | Authority | Lifecycle | Approval | Implementation | Verification | Required action |
|---|---|---|---|---|---|---|
| `prd.md` | Product Specification Draft | `REVIEW_REQUIRED` | `PENDING` | `UNKNOWN` | `UNVERIFIED` | Reconcile with approved Product identity and first vertical |
| `product-roadmap.md` | Strategic Planning | `REVIEW_REQUIRED` | `PENDING` | `PLANNED` | `UNVERIFIED` | Reconcile with Master Completion Phases |
| `complete-roadmap.md` | Historical Strategic | `ARCHIVE_PENDING` | `NOT_REQUIRED` | `PLANNED` | `NOT_APPLICABLE` | Add archive banner and exclude from default AI context |
| `NEXT-EXECUTION-PLAN.md` | Legacy Execution Plan | `DEPRECATED` | `UNKNOWN` | Mixed historical state | `VERIFICATION_EXPIRED` | Do not use for current execution; classify unique content before supersession |
| `CANONICAL-DOCUMENT-MAP.md` | Documentation Navigation | `REVIEW_REQUIRED` | `PENDING` | `NOT_APPLICABLE` | `UNVERIFIED` | Update paths and new canonical hierarchy |
| `DOCUMENTATION-REFACTOR-PLAN.md` | Planning | `DEPRECATED` | `UNKNOWN` | `PLANNED` | `UNVERIFIED` | Reconcile with controlled normalization sequence |
| `COMPLETE_PROJECT_TREE.txt` | Historical or Planning | `REVIEW_REQUIRED` | `UNKNOWN` | `PLANNED` | `UNVERIFIED` | Classify; do not treat as current Architecture |
| `ADMIN-WORKFORCE-RESPONSIBILITY-MAP.md` | Planning or Role Map | `REVIEW_REQUIRED` | `PENDING` | `PLANNED` | `UNVERIFIED` | Align with zero allocated and active Agent state |

---

# 17. Historical Mega-File Policy

## 17.1 `complete-roadmap.md`

`complete-roadmap.md` must be:

- retained for historical and strategic reference;
- marked non-canonical for current implementation;
- treated as future-state planning unless another source verifies a capability;
- excluded from default Cursor and Agent context;
- changed only through controlled archival maintenance;
- prevented from overriding current-state documents;
- preserved rather than deleted solely to hide past inconsistency.

## 17.2 Required Archive Banner

The following banner should appear near the top:

```markdown
> [!IMPORTANT]
> This document is a historical strategic reference and long-term Vision archive.
>
> It is not the source of truth for current implementation, Production
> readiness, active Agents, completed features, deployment status,
> Phase status, or immediate execution.
>
> Current operational truth is maintained in:
>
> - `CURRENT-STATE.md`
> - `DOCUMENT-STATUS-REGISTRY.md`
> - `PHASE-1-COMPLETION-CHECKLIST.md`
> - `execution/EXECUTION-BOARD.md`
```

## 17.3 Historical Content Rule

Historical content may explain:

- previous assumptions;
- earlier Product order;
- old Architecture;
- old Agent counts;
- previous Phase terminology;
- superseded execution decisions.

It must not be presented as current truth.

---

# 18. Repository Entry-Point Registry

## 18.1 Root `README.md`

Canonical purpose:

```text
Public Repository Overview and Navigation
```

It must not become:

- a Master Roadmap;
- the current implementation authority;
- a complete Architecture;
- the Phase completion gate;
- an AI Agent registry.

## 18.2 `doc/README.md`

Canonical purpose:

```text
Documentation Navigation and Authority Portal
```

It must not become:

- an 11,000-line enterprise mega-file;
- the complete Vision;
- the complete Architecture;
- the complete Roadmap;
- the source of current runtime truth.

## 18.3 `AGENTS.md`

Canonical purpose:

```text
Repository-Level AI and Contributor Instructions
```

It must not contain:

- reusable credentials;
- unsupported active-Agent claims;
- stale Phase authority;
- Production secrets;
- automatic Phase progression;
- broad self-granted AI authority.

---

# 19. Required Missing Public Repository Documents

At the latest review, the following required public-repository Governance files
were reported missing or unverified:

| Required file | Authority | Lifecycle | Approval | Current status | Required decision |
|---|---|---|---|---|---|
| `LICENSE` or approved proprietary notice | Legal or Contractual | `MISSING` | `PENDING` | Not verified present | Founder chooses licensing posture |
| `SECURITY.md` | Standard or Policy | `MISSING` | `PENDING` | Not verified present | Define private vulnerability reporting |
| `CONTRIBUTING.md` | Standard or Policy | `MISSING` | `PENDING` | Not verified present | Define contribution policy |
| `.github/CODEOWNERS` | Repository Governance | `MISSING` | `PENDING` | Not verified present | Define review ownership |

## 19.1 Licensing Boundary

Public repository visibility does not automatically mean Open Source.

The Founder must approve one posture:

```text
Open Source
```

or:

```text
Publicly Visible Proprietary Source
```

This Registry does not make that legal decision.

---

# 20. Implementation and Evidence Sources

Implementation files are not Governance documents, but they may provide
evidence for document claims.

| Evidence source | Current classification | Authority boundary |
|---|---|---|
| `package.json` and lock file | Implementation Metadata | Dependencies and scripts only |
| Application source under `app/` | Implementation | Web and API behavior |
| Components under `components/` | Implementation | User interface behavior |
| Runtime and Platform code under `lib/` | Implementation | Code existence; not active runtime proof |
| `supabase/migrations/` | Migration Implementation | Repository database-change history |
| `.github/workflows/` | CI Configuration | Automated-check definitions |
| Test files | Verification Evidence | Test behavior within exact scope |
| Vercel deployment result | Deployment Evidence | Named deployment only |
| Production smoke result | Operational Evidence | Tested Production behavior |
| Backup and restore evidence | Recovery Evidence | Recovery proof within tested scope |
| Runtime audit and task records | AI Runtime Evidence | Allocation, activation, and execution claims |

## 20.1 Evidence Boundary

Source-code existence proves only that code exists.

It does not independently prove:

- current deployment;
- Production operation;
- correct environment configuration;
- monitoring;
- recovery;
- Customer use;
- Agent allocation;
- active Agent execution.

---

# 21. Document Claim Rules

## 21.1 Documentation Does Not Prove Implementation

A document may be approved while implementation remains:

- not started;
- planned;
- partial;
- implemented but unverified;
- deployed but not Production Operational.

## 21.2 Implementation Does Not Prove Deployment

Code may exist without:

- Preview deployment;
- Production deployment;
- correct environment configuration;
- database migration application.

## 21.3 Deployment Does Not Prove Production Operation

A deployed version may still lack:

- authenticated verification;
- monitoring;
- support ownership;
- recovery;
- Tenant isolation evidence;
- Customer usage;
- incident response.

## 21.4 Tests Do Not Prove Every Environment

A local or CI test does not independently prove:

- Preview behavior;
- Production behavior;
- real Customer behavior;
- real provider execution.

## 21.5 Production Claims Require Evidence

`PRODUCTION_OPERATIONAL` requires evidence of:

- exact deployed commit;
- named environment;
- required tests;
- authenticated smoke;
- monitoring;
- service owner;
- support process;
- rollback or recovery;
- relevant Risk decision.

## 21.6 AI Claims Require Runtime Evidence

An active-Agent claim requires:

- Agent identity;
- approved owner;
- role;
- Tenant and Project scope;
- permissions;
- runtime allocation;
- runtime activation;
- current task or audit evidence;
- approved model and Tool policy;
- cost evidence;
- suspension method.

---

# 22. Known Current Conflicts

| Conflict ID | Conflicting claim | Correct current treatment | Status |
|---|---|---|---|
| DOC-C01 | `Phase A` shown as current | Current Phase is Phase 1 — Platform Foundation | Synchronization in progress |
| DOC-C02 | `ready_for_migration_rollout` shown as current | Current status is `ready_for_final_verification` | Synchronization in progress |
| DOC-C03 | One pending migration | Latest recorded pending migrations are `0` | Corrected in canonical drafts |
| DOC-C04 | Migration still needs application | Required migration is recorded as applied | Corrected in canonical drafts |
| DOC-C05 | 445 active Agents | 445 is capacity; allocated, active, and live-tested are `0` | Corrected in canonical drafts |
| DOC-C06 | Enterprise AI OS operational | Not operational | Corrected in canonical drafts |
| DOC-C07 | Phase 2 started | Phase 2 not started | Corrected in canonical drafts |
| DOC-C08 | Full MianX Core complete | Full Core not verified | Corrected in canonical drafts |
| DOC-C09 | Manual restore equals full DR | Manual recovery proof exists; managed backup and PITR unavailable | Corrected in canonical drafts |
| DOC-C10 | Root README and `doc/README.md` have same role | Root README is repository entry; `doc/README.md` is Documentation portal | Corrected |
| DOC-C11 | `docs/` and `doc/` used interchangeably | Current tracked Documentation root is reported as `doc/` | Repository-wide path review pending |
| DOC-C12 | Old Execution Board controls current work | New Phase 1 closeout board is current working execution source | Repository verification pending |
| DOC-C13 | `NEXT-EXECUTION-PLAN.md` controls current execution | Treat as legacy pending classification | Pending |
| DOC-C14 | `complete-roadmap.md` used as current truth | Historical strategic archive only | Archive control pending |
| DOC-C15 | Reusable local Admin credential in `AGENTS.md` | No reusable credential permitted | Current file corrected; history review pending |

---

# 23. Supersession Rules

A document may be marked `SUPERSEDED` only when:

- replacement document exists;
- canonical scope is clear;
- required approval exists;
- unique valid content is preserved or migrated;
- links are updated;
- Registry is updated;
- AI context is updated;
- old document receives a supersession notice;
- history is preserved.

Do not mark a document superseded solely because a newer draft exists.

## 23.1 Current Supersession Candidates

| Candidate | Potential replacement | Current decision |
|---|---|---|
| Old Phase A Execution Board content | Current `execution/EXECUTION-BOARD.md` | Replacement prepared; repository verification pending |
| Old 11,000-line `doc/README.md` | Concise `doc/README.md` | Replacement prepared; repository verification pending |
| Old broad completion-phase model | `MIANX-AI-MASTER-COMPLETION-PHASES.md` v2 | Founder review pending |
| `NEXT-EXECUTION-PLAN.md` | Current Execution Board and Phase 1 checklist | Unique-content review pending |
| Old Roadmap summary copies | `48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md` | Duplicate inventory pending |

---

# 24. Conflict Resolution Workflow

When documents conflict:

```text
Conflict Identified

↓

Stop Using Lower-Authority Claim

↓

Record the Conflict in this Registry

↓

Identify Owners and Reviewers

↓

Compare Scope, Date, Version, Evidence, and Approval

↓

Select Canonical Source

↓

Preserve Valid Unique Content

↓

Update Supersedes and Superseded-By Metadata

↓

Update Links and AI Context

↓

Review Public Safety

↓

Approve Where Required

↓

Verify Repository State
```

Do not delete historical evidence merely to hide inconsistency.

---

# 25. Document Registration Workflow

```text
Document Identified

↓

Purpose and Owner Confirmed

↓

Authority Type Assigned

↓

Lifecycle Status Assigned

↓

Approval Status Assigned

↓

Implementation Status Assigned

↓

Deployment Status Assigned

↓

Verification Status Assigned

↓

Conflicts and Duplicates Reviewed

↓

Canonical Path Confirmed

↓

Public-Safety Review Completed

↓

Registry Entry Added

↓

Required Approval Recorded

↓

Review Date Scheduled
```

---

# 26. Required Document Metadata

Every canonical or approved document should include:

- Document ID or stable path;
- title;
- version;
- lifecycle status;
- authority type;
- classification;
- owner;
- maintainer;
- reviewers;
- approver where required;
- created date;
- updated date;
- last reviewed date;
- canonical scope;
- approval status;
- implementation status where applicable;
- deployment status where applicable;
- verification status;
- supersedes;
- superseded by;
- related documents.

Metadata must not claim:

- approval without approval;
- implementation without code;
- deployment without evidence;
- Production operation without operational evidence;
- active AI without runtime evidence.

---

# 27. Cursor and AI Context Policy

## 27.1 Default Include

AI tools should normally receive:

```text
README.md

doc/CURRENT-STATE.md

doc/DOCUMENT-STATUS-REGISTRY.md

doc/PHASE-1-COMPLETION-CHECKLIST.md

doc/MIANX-AI-MASTER-COMPLETION-PHASES.md

execution/EXECUTION-BOARD.md

AGENTS.md

Relevant approved ADR

Relevant approved Product or feature specification

Relevant implementation files

Relevant tests
```

## 27.2 Default Exclude

AI tools should normally exclude:

```text
doc/complete-roadmap.md

Archived documents

Superseded documents

Deprecated execution plans

Unrelated generated documents

Duplicate README copies

Chat exports

Unapproved future-state documents unrelated to the task

Large historical compilations
```

## 27.3 AI Context Rule

An AI system must use this Registry to determine whether a source is:

- current;
- draft;
- approved;
- future;
- superseded;
- deprecated;
- historical;
- missing;
- unverified.

An AI system must not:

- treat Roadmap content as Production truth;
- invent repository state;
- invent tests;
- invent deployments;
- invent active Agents;
- silently change document authority;
- mark its own output approved;
- mark its own work independently verified;
- start a future Phase.

---

# 28. Public-Safety Classification

Before a document is public, verify that it contains no:

- password;
- API key;
- access token;
- service-role value;
- private key;
- connection string;
- reusable local credential;
- private Customer data;
- private Tenant identifier;
- raw database backup;
- local machine username;
- absolute private backup path;
- internal incident contact;
- unnecessary Production row count;
- sensitive operational inventory.

Public evidence should record outcomes rather than unnecessary sensitive detail.

---

# 29. Review Cadence

| Registry area | Minimum review trigger |
|---|---|
| Current-state documents | Every material operational change |
| Phase checklist | Every gate change |
| Execution Board | Every task, blocker, or decision change |
| Registry | Every authority, path, or lifecycle change |
| Constitutions | Material Governance change |
| Architecture Decisions | Architecture change |
| Product specifications | Every approved Product release or scope change |
| Operational runbooks | Material incident, deployment, or recovery change |
| AI Governance | Agent, model, Tool, provider, or authority change |
| Agent and Prompt documents | Every approved version or runtime-state change |
| Strategic Roadmaps | Founder strategic review |
| Archived mega-files | Annual integrity review only |

---

# 30. Current Registry Actions

## P0 — Current Truth and Security

- [ ] Confirm all nine synchronized files are saved.
- [ ] Verify all relative links.
- [ ] Search for stale Phase A claims.
- [ ] Search for `ready_for_migration_rollout`.
- [ ] Search for one-pending-migration claims.
- [ ] Search for 445 active-Agent claims.
- [ ] Search for unsupported AI OS operational claims.
- [ ] Confirm reusable credentials are absent from the current tree.
- [ ] Complete history-aware secret review.
- [ ] Complete operational-metadata redaction.

## P1 — Authority and Governance

- [ ] Founder reviews canonical hierarchy.
- [ ] Founder reviews Phase framework.
- [ ] Founder reviews repository licensing posture.
- [ ] `SECURITY.md` is created and approved.
- [ ] `CONTRIBUTING.md` is created and approved.
- [ ] `.github/CODEOWNERS` is created and approved.
- [ ] Constitutional documents are inventoried.
- [ ] ADRs are inventoried.
- [ ] Active runbooks are inventoried.
- [ ] Evidence sources are linked.

## P1 — Strategy Documents

- [ ] Review `ENTERPRISE-PRINCIPLES.md`.
- [ ] Review `VISION-AND-MISSION.md`.
- [ ] Review `CORE-ARCHITECTURE.md`.
- [ ] Review `AI-GOVERNANCE.md`.
- [ ] Review `MASTER-ROADMAP-SUMMARY.md`.
- [ ] Register final approval status.
- [ ] Register implementation status separately.

## P2 — Structure Normalization

- [ ] Inventory all numbered folders.
- [ ] Identify overlapping folder responsibilities.
- [ ] Identify duplicate canonical topics.
- [ ] Classify loose root documents.
- [ ] Classify historical and generated content.
- [ ] Prepare movement and supersession plan.
- [ ] Obtain approval before moving or deleting files.
- [ ] Preserve Git history.
- [ ] Verify links after approved normalization.

---

# 31. Registry Exit Criteria

This Registry becomes fully operational when:

- all high-authority documents are listed;
- every listed document has an owner;
- all required approvals are recorded;
- canonical paths are verified;
- authority conflicts are resolved;
- duplicate documents are classified;
- current-state claims point to evidence;
- strategic documents are separated from operational truth;
- archived content is excluded from default AI context;
- implementation, deployment, and verification remain independent;
- review triggers are active;
- missing Governance documents are resolved;
- repository links are valid;
- public-safety checks pass;
- the Founder approves the Registry authority model.

---

# 32. Registry Maintenance Rules

Update this Registry when:

- a canonical document is created;
- a document receives approval;
- a document is rejected;
- a document is superseded;
- a path changes;
- implementation status changes;
- deployment status changes;
- verification status changes;
- a conflict is found;
- a duplicate is found;
- a document is archived;
- an AI-context rule changes;
- an owner changes;
- a Phase changes.

A document owner must not silently change authority without updating this
Registry.

---

# 33. Prohibited Registry Shortcuts

Do not:

- mark all documents approved together;
- infer Founder approval from file creation;
- infer implementation from Documentation;
- infer deployment from a merged PR;
- infer Production operation from Vercel success;
- infer active Agents from Agent registries;
- infer Product launch from Roadmaps;
- classify a conflicting document without review;
- delete documents before unique-content review;
- hide old inconsistencies by rewriting history;
- use one status field for document, implementation, deployment, and verification.

---

# 34. Current Registry Decision

```text
REGISTRY_STATUS=ACTIVE_DRAFT

FOUNDER_REGISTRY_APPROVAL=PENDING

CURRENT_TRUTH_SOURCE=doc/CURRENT-STATE.md

CURRENT_PHASE=PHASE_1_PLATFORM_FOUNDATION

PHASE_1_STATUS=READY_FOR_FINAL_VERIFICATION

PHASE_1_COMPLETE=NO

PHASE_2_STARTED=NO

DOCUMENTATION_SYNCHRONIZATION=IN_PROGRESS

DOCUMENTATION_STRUCTURE_NORMALIZED=NO

ALLOCATED_AI_AGENTS=0

ACTIVE_AI_AGENTS=0

LIVE_TESTED_AI_AGENTS=0

HISTORICAL_MEGA_ROADMAP=CURRENT_TRUTH_NO

MASS_DOCUMENT_DELETION_AUTHORIZED=NO
```

---

# 35. Final Current Position

As of **2026-08-04**:

```text
The Document Status Registry is the active working authority
for document lifecycle and canonical classification.

It is not yet Founder-approved.

CURRENT-STATE.md remains the current implementation
and operational truth source.

Phase 1 is READY_FOR_FINAL_VERIFICATION.

Phase 1 is not complete.

Phase 2 has not started.

The nine primary current-state and execution documents
have been prepared during the synchronization process.

Repository save, link, diff, commit, merge,
and Founder approval remain to be verified.

The five new Company, Governance, Architecture,
AI, and Roadmap documents remain Drafts.

complete-roadmap.md remains historical and non-canonical
for current implementation.

Allocated AI Agents = 0.

Active AI Agents = 0.

Live-Tested AI Agents = 0.

The Documentation structure remains unnormalized.

No mass move, merge, deletion, or archive action
is authorized by this Registry.
```

---

# 36. Next Document

After this Registry is saved and reviewed, the next document to edit is:

```text
doc/01-governance/ENTERPRISE-PRINCIPLES.md
```

That document must:

- preserve Founder authority;
- align principles with the corrected Product model;
- distinguish principles from current implementation;
- remove duplicate Vision, Architecture, and Roadmap content;
- define evidence, Security, ownership, and Product-value principles;
- correct all relative links;
- remain Draft until Founder approval.

---

# Change Log

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-03 | Initial Registry and documentation-bloat controls |
| 1.0.0 | 2026-08-04 | Rebuilt Registry with separate lifecycle, approval, implementation, deployment, and verification dimensions; registered synchronized canonical documents; classified the five strategy drafts; established Phase 1 evidence, AI zero-state, historical-document, public-Governance, conflict, supersession, and AI-context controls |