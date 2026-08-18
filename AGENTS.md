---
document_id: AGENTS-001
title: MianX.ai Agent and Contributor Instructions
version: 2.0.0
status: Active Repository Instructions
authority_type: Repository-Level AI and Contributor Guidance
classification: Public Repository
owner: MianX.ai Founder
maintainer: MianX.ai Core Team
updated: 2026-08-04
current_phase: Phase 1 — Platform Foundation
phase_status: ready_for_final_verification
phase_1_complete: false
founder_phase_1_signoff: not_approved
phase_2_started: false
allocated_ai_agents: 0
active_ai_agents: 0
live_tested_ai_agents: 0
canonical_current_truth: ./doc/CURRENT-STATE.md
canonical_execution_board: ./execution/EXECUTION-BOARD.md
---

# MianX.ai Agent and Contributor Instructions

> [!IMPORTANT]
> These instructions apply to every AI assistant, coding Agent, documentation
> Agent, reviewer, automation, Human contributor, and Tool operating inside this
> repository.
>
> This file does not independently define current implementation truth.
>
> Always read [`doc/CURRENT-STATE.md`](./doc/CURRENT-STATE.md) before making
> implementation, deployment, Product, Phase, migration, recovery, or AI
> runtime claims.
>
> No Agent may override Founder authority, silently change the active Phase,
> activate a provider, start Phase 2, or represent planned capability as
> Production Operational.

---

# 1. Purpose

This file defines how contributors and AI systems must operate inside the
MianX.ai repository.

Its purpose is to ensure:

- accurate current-state claims;
- controlled scope;
- Human authority;
- evidence-based completion;
- Tenant and Project isolation;
- secure handling of secrets;
- honest AI runtime terminology;
- consistent Documentation;
- safe repository changes;
- clear escalation;
- no unsupported Product, Customer, or Production claims.

This file is repository guidance.

It is not:

- the current-state authority;
- the Product specification;
- the Architecture authority;
- the Phase completion checklist;
- an Agent activation record;
- an authorization to deploy;
- an authorization to change the database;
- an authorization to call an AI provider.

---

# 2. Mandatory Reading Order

Before beginning material work, read:

1. [`doc/CURRENT-STATE.md`](./doc/CURRENT-STATE.md)
2. [`doc/PHASE-1-COMPLETION-CHECKLIST.md`](./doc/PHASE-1-COMPLETION-CHECKLIST.md)
3. [`doc/MIANX-AI-MASTER-COMPLETION-PHASES.md`](./doc/MIANX-AI-MASTER-COMPLETION-PHASES.md)
4. [`execution/EXECUTION-BOARD.md`](./execution/EXECUTION-BOARD.md)
5. [`README.md`](./README.md)
6. [`doc/README.md`](./doc/README.md)
7. the relevant approved Product, Architecture, Security, Data, AI, or
   operational document.

For migration or recovery work, also read:

- [`doc/PHASE-1-POST-MIGRATION-VERIFICATION.md`](./doc/PHASE-1-POST-MIGRATION-VERIFICATION.md)

For AI-related work, also read:

- [`doc/44-enterprise-ai/AI-GOVERNANCE.md`](./doc/44-enterprise-ai/AI-GOVERNANCE.md)

For document authority, read:

- [`doc/DOCUMENT-STATUS-REGISTRY.md`](./doc/DOCUMENT-STATUS-REGISTRY.md)

---

# 3. Canonical Authority Order

When documents conflict, use this order:

```text
Founder-Approved Constitution or Legal Requirement
within its authority

↓

doc/CURRENT-STATE.md
current implementation and operational truth

↓

Approved Architecture Decision Records
within their technical scope

↓

doc/DOCUMENT-STATUS-REGISTRY.md
document authority and lifecycle

↓

Approved Policies, Standards, Specifications, and Runbooks

↓

execution/EXECUTION-BOARD.md
currently authorized execution

↓

Approved Strategic Roadmap Summary

↓

Historical and Aspirational Roadmap Material
```

A lower-authority document must not silently override a higher-authority
document.

`doc/complete-roadmap.md` is not current implementation truth.

---

# 4. Current Official Truth

Until higher-authority evidence changes it, use:

```text
CURRENT_PHASE=PHASE_1_PLATFORM_FOUNDATION

PHASE_1_STATUS=READY_FOR_FINAL_VERIFICATION

PHASE_1_COMPLETE=NO

FOUNDER_PHASE_1_SIGNOFF=NOT_APPROVED

PHASE_2_STARTED=NO

FULL_MIANX_CORE_VERIFIED=NO

ENTERPRISE_AI_OS_OPERATIONAL=NO

ALLOCATED_AI_AGENTS=0

ACTIVE_AI_AGENTS=0

LIVE_TESTED_AI_AGENTS=0

GENUINE_PROVIDER_GENERATION_CALLS=0

PENDING_DATABASE_MIGRATIONS=0
```

Current recorded recovery boundary:

```text
MANUAL_LOGICAL_BACKUP=REPORTED_CREATED

BACKUP_CHECKSUM=REPORTED_VERIFIED

DISPOSABLE_RESTORE_TEST=REPORTED_PASSED

MANUAL_RECOVERY_READY=true

MANAGED_BACKUP=UNAVAILABLE_OR_UNVERIFIED

POINT_IN_TIME_RECOVERY=UNAVAILABLE

FULL_ENTERPRISE_DISASTER_RECOVERY=NOT_ACHIEVED
```

Do not silently change these values in this file.

Update current truth through the canonical current-state process.

---

# 5. Current Execution Boundary

The currently authorized enterprise mission is:

```text
Complete Phase 1 Security, canonical truth, Production verification,
recovery decision, Founder sign-off, closeout merge,
and post-merge verification.
```

Current authorized work may include:

- Documentation synchronization;
- public credential cleanup;
- public metadata redaction;
- Security review;
- evidence correction;
- Production smoke preparation;
- migration reconciliation;
- recovery-policy preparation;
- repository Governance preparation;
- Phase 1 defect correction;
- Founder closeout preparation.

The following remain locked unless explicitly authorized by the Founder:

- Phase 2 execution;
- genuine provider calls;
- paid AI billing;
- Agent allocation;
- Agent activation;
- autonomous task loops;
- 445-Agent activation;
- full RestaurantOS implementation;
- full PoultryOS implementation;
- another Industry Operating System;
- Marketplace;
- Plugin ecosystem expansion;
- regional expansion;
- global expansion;
- Autonomous Enterprise Creation implementation.

---

# 6. Agent Terminology

The word `Agent` must be used carefully.

## 6.1 Agent Role

An Agent Role is a documented definition describing:

- purpose;
- responsibilities;
- authority;
- skills;
- tools;
- reporting relationship;
- expected outputs.

An Agent Role is not a runtime Agent.

## 6.2 Capacity Seat

A Capacity Seat represents planned or persisted workforce capacity.

A seat may exist without:

- allocation;
- runtime process;
- model;
- provider;
- task;
- execution;
- evidence;
- active status.

## 6.3 Registered Agent

A Registered Agent has a registry record.

Registration alone does not prove:

- allocation;
- activation;
- model execution;
- Production operation;
- useful work.

## 6.4 Allocated Agent

An Allocated Agent has approved runtime capacity assigned to:

- an owner;
- role;
- Product;
- Project;
- Tenant;
- permission set;
- model policy;
- Tool policy;
- cost limit.

Current allocated Agent count:

```text
0
```

## 6.5 Active Agent

An Active Agent is an allocated runtime instance currently operating with
reviewable evidence.

Current active Agent count:

```text
0
```

## 6.6 Live-Tested Agent

A Live-Tested Agent has completed a genuine provider-backed execution with
reviewed evidence.

Current live-tested Agent count:

```text
0
```

---

# 7. Current Workforce Counters

| Metric | Current value |
|---|---:|
| Capacity or registered seats | 445 |
| Persisted seats | 445 |
| Ready-to-allocate seats | 445 |
| Allocated Agents | **0** |
| Active Agents | **0** |
| Live-tested Agents | **0** |
| Models API calls | **0** |
| Generation calls | **0** |
| Production Operational AI workflows | **0** |

The number `445` must not be described as:

- 445 running Agents;
- 445 active Agents;
- 445 live-tested Agents;
- 445 autonomous employees;
- 445 Production processes.

It represents documented and persisted capacity planning.

---

# 8. Implemented Module Versus Active Runtime

Code under directories such as:

```text
lib/core/executive/
lib/core/delivery/
lib/core/platform/
lib/core/provider/
```

may represent:

- implemented modules;
- orchestration foundations;
- testable functions;
- role logic;
- deterministic workflows;
- runtime candidates.

Their existence does not prove active Agent instances.

Use wording such as:

```text
Implemented executive-control module
```

```text
Implemented delivery-workflow foundation
```

```text
Platform runtime candidate
```

```text
Provider integration path implemented but inactive
```

Do not use:

```text
Active runtime Agent
```

unless current runtime evidence supports it.

---

# 9. Agent Status Vocabulary

Approved Agent status vocabulary:

| Status | Meaning |
|---|---|
| `PROPOSED` | Idea or candidate role |
| `DOCUMENTED` | Role or design document exists |
| `IMPLEMENTED` | Relevant code exists |
| `TEST_PROVIDER_TESTED` | Deterministic or non-genuine provider testing passed |
| `REGISTERED` | Registry record exists |
| `READY_FOR_ALLOCATION` | Required pre-allocation checks passed |
| `ALLOCATED` | Runtime capacity assigned |
| `ACTIVE` | Runtime instance operating with current evidence |
| `RESTRICTED` | Runtime authority reduced |
| `SUSPENDED` | Execution stopped |
| `LIVE_TESTED` | Genuine provider-backed test passed |
| `PRODUCTION_CONTROLLED` | Approved Production workflow operates with controls |
| `DEPRECATED` | No new use permitted |
| `RETIRED` | Removed from operation |
| `FAILED_VERIFICATION` | Required evidence failed |

Only `ACTIVE` Agents may be counted as active.

Only `LIVE_TESTED` Agents may be counted as live-tested.

---

# 10. Task-Start Protocol

Before starting a task, establish:

```text
Current Phase:
Task Owner:
Approver:
Target User:
Business Problem:
Product:
Project:
Tenant:
Repository:
Current Branch or Version:
Scope:
Out of Scope:
Architecture Layer:
Security Impact:
Data Impact:
AI Impact:
Required Evidence:
Rollback or Recovery:
Founder Approval Required:
```

Do not begin material work when required scope or authority is unknown.

When information is missing:

- search the canonical documents;
- inspect relevant evidence;
- state the missing information;
- ask for the required decision;
- stop before high-risk action.

Do not invent missing scope.

---

# 11. Evidence Rules

A contributor must not claim an action was completed unless evidence exists.

Valid evidence may include:

- exact code diff;
- exact document diff;
- test output;
- CI result;
- deployment result;
- migration result;
- database verification;
- screenshot;
- audit event;
- monitoring result;
- backup evidence;
- restore evidence;
- Customer confirmation;
- Human review;
- Founder decision.

Evidence must identify:

- repository;
- commit or version;
- environment;
- date;
- action;
- result;
- reviewer;
- limitations.

A planned test is not a passed test.

A command written in a document is not evidence that the command ran.

A generated report is not independent verification.

---

# 12. Truthful Reporting

Every report must distinguish:

```text
FACT
Verified or directly observed

ASSUMPTION
Not yet verified

INFERENCE
Conclusion derived from available evidence

RECOMMENDATION
Proposed future action

PLANNED
Approved or proposed future work

IMPLEMENTED
Code or configuration exists

TESTED
Defined tests passed

DEPLOYED
A stated version reached a stated environment

VERIFIED
Evidence was reviewed

PRODUCTION OPERATIONAL
Production has ownership, monitoring, support, and recovery
```

Never merge these categories into vague phrases such as:

- fully ready;
- almost done;
- all complete;
- enterprise-grade;
- Production ready;
- autonomous;
- live;

without supporting evidence and a defined meaning.

---

# 13. Prohibited Claims

Without current canonical evidence, do not claim:

- Phase 1 is complete;
- Founder sign-off exists;
- Phase 2 has started;
- the full MianX Core is complete;
- the Enterprise AI Operating System is operational;
- 445 Agents are active;
- 445 Agents are live-tested;
- genuine AI execution occurred;
- RestaurantOS is Production Operational;
- PoultryOS is Production Operational;
- Customers are live;
- Marketplace is operational;
- global operations exist;
- full enterprise disaster recovery exists;
- the repository is secret-free;
- the repository is Open Source;
- Documentation completion equals implementation completion.

---

# 14. Human Authority

The Founder retains final authority over:

- Company Vision;
- material strategy;
- Phase completion;
- next-Phase authorization;
- Product selection;
- Platform Kernel boundaries;
- high-risk AI execution;
- Agent activation;
- material Customer commitments;
- Production launch;
- licensing posture;
- recovery-Risk acceptance;
- Marketplace launch;
- regional launch;
- global expansion.

An AI system may:

- analyze;
- recommend;
- draft;
- test within approved scope;
- prepare evidence;
- identify Risk;
- propose next actions.

An AI system may not grant itself authority.

---

# 15. High-Risk Actions

Human approval is required before:

- Production deployment;
- database schema change;
- migration application;
- destructive data operation;
- permission escalation;
- secret rotation;
- history rewrite;
- branch deletion;
- Production configuration change;
- paid-provider activation;
- genuine provider execution;
- Agent allocation;
- Agent activation;
- high-risk automated workflow;
- Customer-facing commitment;
- financial action;
- legal action;
- public Security disclosure;
- Phase progression.

Approval must be explicit and scope-specific.

Do not reuse an old approval for materially different work.

---

# 16. Secret and Credential Rules

Never place real secrets in:

- `AGENTS.md`;
- README files;
- Documentation;
- code examples;
- test fixtures committed publicly;
- screenshots;
- issue descriptions;
- Pull Request descriptions;
- execution reports;
- terminal transcripts;
- generated evidence.

Protected values include:

- passwords;
- API keys;
- service-role values;
- access tokens;
- refresh tokens;
- private keys;
- connection strings;
- webhook secrets;
- provider credentials;
- Customer credentials.

Use placeholders:

```text
<generate-a-unique-local-password>
```

```text
<configured-through-secure-environment>
```

```text
<server-side-service-role-value>
```

A credential previously committed publicly must be treated as potentially
compromised.

Removing it from the current file does not remove it from Git history.

Required follow-up may include:

- reuse review;
- rotation;
- history-aware secret review;
- impact assessment;
- remediation decision;
- final re-verification.

---

# 17. Local Development Credential Rule

No fixed reusable local Admin password belongs in this repository.

Local development credentials must be:

- unique;
- locally generated;
- environment-scoped;
- excluded from Git;
- different from hosted credentials;
- different from personal accounts;
- rotated when exposure is suspected.

Public Documentation may describe the required credential fields.

It must not contain the real values.

---

# 18. Public Repository Safety

This repository is publicly visible.

Do not publish:

- private Customer data;
- private Tenant identifiers;
- internal incident contacts;
- exact sensitive operational inventories;
- local machine usernames;
- absolute local backup paths;
- raw database backups;
- unnecessary Production record counts;
- unrestricted Security details for an unresolved issue;
- private contracts;
- non-public financial data.

Public evidence should usually record outcomes:

```text
Backup created: yes

Checksum verified: yes

Restore test: passed

Pending migrations: zero

Managed PITR: unavailable
```

Detailed sensitive evidence belongs in an approved restricted system.

---

# 19. Tenant and Project Isolation

Every relevant implementation must preserve:

```text
Tenant A user
must not access
Tenant B protected data
```

```text
Project A member
must not access
Project B protected data
```

```text
Normal user
must not access
Founder or Platform Admin authority
```

```text
Logged-out or invalid-session user
must not access
protected routes or APIs
```

Authorization must be enforced through trusted server or database controls.

UI hiding is not authorization.

A successful allowed-access test does not replace a denied-access test.

---

# 20. Data Rules

Before changing data behavior, identify:

- Data owner;
- affected tables or records;
- Tenant scope;
- Project scope;
- migration requirement;
- rollback or compensating action;
- backup requirement;
- retention impact;
- privacy impact;
- audit requirement;
- verification method.

Do not:

- delete real data without explicit approval;
- bypass repository migrations;
- conceal schema drift;
- re-apply an applied migration;
- expose private data in evidence;
- use Production data as casual test data.

Current pending migration count:

```text
0
```

The currently applied Phase 1 migration must not be re-applied based on stale
Documentation.

---

# 21. Recovery Rules

Manual logical recovery and managed recovery are different.

Do not describe manual backup and restore proof as:

- automated backup;
- PITR;
- high availability;
- full disaster recovery;
- full enterprise recovery maturity.

Current boundary:

```text
Manual Recovery Proof = Reported

Managed Backup = Unavailable or Unverified

PITR = Unavailable

Full Enterprise Disaster Recovery = Not Achieved
```

Recovery-related work requires:

- owner;
- backup method;
- secure storage;
- retention;
- restore procedure;
- restore test;
- RTO/RPO consideration;
- review date;
- residual Risk decision.

---

# 22. AI Provider Rules

A provider integration path may exist without an active provider.

Do not treat any of the following as provider activation:

- environment-variable name;
- API-key-presence boolean;
- provider adapter code;
- model registry entry;
- test provider;
- mocked response;
- deterministic response;
- provider URL;
- configuration screen.

Genuine provider execution requires:

- explicit authorization;
- approved provider;
- approved model;
- approved use case;
- approved data policy;
- cost limit;
- Tool permissions;
- evaluation;
- Human review;
- evidence;
- kill switch;
- incident path.

Current genuine provider generation calls:

```text
0
```

---

# 23. AI Tool Rules

Before an Agent uses a Tool, confirm:

- Tool owner;
- allowed Agent;
- allowed action;
- Product scope;
- Project scope;
- Tenant scope;
- data classification;
- authentication method;
- permission level;
- reversibility;
- audit;
- failure behavior;
- rate limit;
- cost;
- Human approval requirement;
- revocation method.

A Tool connection does not authorize every Tool action.

Use least privilege.

---

# 24. AI Memory and Knowledge Rules

Do not write durable organizational memory unless the task and authority permit
it.

Before storing knowledge, establish:

- source;
- owner;
- classification;
- Tenant;
- Project;
- retention;
- access;
- accuracy;
- approval;
- update policy;
- deletion policy.

Do not mix:

- Customer knowledge;
- Tenant knowledge;
- Project knowledge;
- Company knowledge;
- Agent scratch context;
- unverified inference.

Historical Roadmap content must not be loaded as current implementation truth.

---

# 25. Architecture Classification

Every material capability should be classified as one of:

```text
MianX Platform Kernel

Shared Platform Service

Shared Enterprise Service

Governed AI Runtime

Industry Operating System

Customer Edition or Configuration

Internal MianX Application

Research or Experiment
```

Do not place a capability in the Platform Kernel merely because it may be
reusable.

Kernel promotion requires:

- verified need;
- stable interface;
- Security review;
- Tenant isolation;
- tests;
- ownership;
- operational support;
- migration planning;
- demonstrated reuse.

Product-specific business logic belongs in the relevant Industry Operating
System.

---

# 26. Documentation Rules

Before creating a new document:

1. search for an existing canonical document;
2. check the Document Status Registry;
3. confirm the owner;
4. confirm the authority;
5. determine whether an update is sufficient;
6. create a new file only when a distinct canonical purpose exists.

Do not create:

- another complete Roadmap;
- another current-state file;
- another Documentation Portal;
- another Execution Board;
- another duplicate Vision;
- another duplicate Architecture summary;
- another mega-document.

Current Documentation root:

```text
doc/
```

Some legacy content may incorrectly reference:

```text
docs/
```

Do not perform a mass rename or folder merge without approved normalization.

---

# 27. Documentation Claim Rules

A document can be:

```text
Approved
```

while implementation remains:

```text
Not Started
```

A code module can be:

```text
Implemented
```

while Production operation remains:

```text
Unverified
```

Documentation status, implementation status, deployment status, and
verification status must be recorded separately.

Do not use `complete` to mean only `documented`.

---

# 28. Document Update Requirements

When material truth changes, evaluate updates to:

- `doc/CURRENT-STATE.md`;
- `doc/PHASE-1-COMPLETION-CHECKLIST.md`;
- `doc/PHASE-1-POST-MIGRATION-VERIFICATION.md`;
- `doc/MIANX-AI-MASTER-COMPLETION-PHASES.md`;
- `execution/EXECUTION-BOARD.md`;
- `README.md`;
- `doc/README.md`;
- `AGENTS.md`;
- `doc/DOCUMENT-STATUS-REGISTRY.md`.

Do not update one current-truth document while leaving contradictory active
claims elsewhere.

---

# 29. Implementation Rules

For implementation work:

- preserve approved scope;
- make the smallest coherent change;
- preserve existing verified behavior;
- avoid unrelated refactoring;
- preserve Tenant isolation;
- preserve Project isolation;
- use server-side authorization;
- use least privilege;
- validate untrusted inputs;
- avoid mass assignment;
- avoid destructive defaults;
- add relevant tests;
- define evidence;
- define rollback or recovery;
- update Documentation where truth changes.

Do not rewrite stable foundations merely to match a future Roadmap narrative.

---

# 30. Test Rules

Tests must cover both:

- expected allowed behavior;
- expected denied or failure behavior.

Relevant areas may require:

- Authentication;
- authorization;
- Tenant isolation;
- Project isolation;
- input validation;
- output safety;
- migration behavior;
- recovery behavior;
- provider-disabled behavior;
- cost limits;
- approval gates;
- kill switch;
- audit evidence.

Do not:

- disable a critical test to obtain a green result;
- claim a skipped test passed;
- treat mocked tests as genuine provider evidence;
- treat local tests as Production verification.

---

# 31. Completion Rules

A task is complete only when:

- required output exists;
- scope is satisfied;
- required tests pass;
- evidence exists;
- Security impact is reviewed;
- Data impact is reviewed;
- reviewer checks the evidence;
- limitations are recorded;
- rollback or recovery exists where required;
- canonical Documentation is updated where necessary;
- required Human approval exists.

A Pull Request, document, or code file may exist without the task being
complete.

---

# 32. Required Work Report

Every material task report should state:

```text
Task:
Current Phase:
Owner:
Approver:
Scope:
Out of Scope:
Files Reviewed:
Files Changed:
Implementation Status:
Test Status:
Deployment Status:
Verification Status:
Security Impact:
Data Impact:
AI Impact:
Evidence:
Known Limitations:
Blocked Items:
Founder Decision Required:
Next Authorized Action:
```

Do not hide failed or blocked items.

---

# 33. Stop Conditions

Stop and escalate when:

- canonical truth is contradictory;
- scope is missing;
- authority is missing;
- a reusable credential is discovered;
- a real secret may be exposed;
- cross-Tenant access is possible;
- cross-Project access is possible;
- Production change is not approved;
- database change is not approved;
- destructive action lacks recovery;
- Agent authority exceeds approval;
- provider execution is not authorized;
- evidence does not match the claimed commit;
- tests fail;
- the task requires unsupported assumptions;
- a future Phase is being started prematurely.

Stopping safely is better than producing unsupported completion.

---

# 34. Prohibited Actions

Without explicit authority, do not:

- merge into `main`;
- force-push;
- delete branches;
- rewrite Git history;
- deploy to Production;
- change a Production domain;
- change Production environment values;
- apply a database migration;
- re-apply an applied migration;
- delete Production data;
- publish credentials;
- activate provider billing;
- perform a genuine model call;
- allocate an Agent;
- activate an Agent;
- start Phase 2;
- start an Industry Product;
- change the Platform Kernel boundary;
- make a Customer commitment;
- mark a Phase complete.

---

# 35. Current Phase 1 Contributor Priorities

Current priorities are:

```text
P0 — Canonical truth synchronization

P0 — Public credential cleanup

P0 — Full Git-history secret review

P0 — Public operational metadata redaction

P1 — Public repository Governance

P1 — Founder authenticated Production smoke

P1 — Tenant isolation Production verification

P1 — Project isolation Production verification

P1 — Migration reconciliation

P1 — Backup and restore evidence review

P1 — Recovery ownership and PITR decision

P1 — Founder final review

P1 — Founder Phase 1 sign-off

P1 — Approved closeout merge and post-merge verification
```

All broad Product and AI expansion remains locked.

---

# 36. Current Agent Decision

```text
AGENT_ROLE_DOCUMENTS_EXIST=YES

AGENT_CAPACITY_SEATS=445

ALLOCATED_AGENTS=0

ACTIVE_AGENTS=0

LIVE_TESTED_AGENTS=0

GENUINE_PROVIDER_CALLS=0

AI_OS_OPERATIONAL=NO

AGENT_ACTIVATION_AUTHORIZED=NO

PHASE_2_AUTHORIZED=NO
```

---

# 37. Updating This File

Update `AGENTS.md` when:

- the active Phase changes;
- Agent counters change through verified runtime evidence;
- provider status changes;
- Human approval rules change;
- canonical document paths change;
- repository Security posture changes;
- Tool authority changes;
- Production authority changes;
- the Document Status Registry changes its classification.

Do not update operational truth here before updating
[`doc/CURRENT-STATE.md`](./doc/CURRENT-STATE.md).

---

# 38. Final Instruction

```text
Read current truth first.

Confirm authority.

Respect the active Phase.

Use least privilege.

Protect Tenant and Project boundaries.

Protect secrets.

Do not invent evidence.

Do not upgrade claims.

Do not call planned roles active Agents.

Do not start locked work.

Escalate high-risk decisions to the authorized Human.
```

---

# 39. Next Document

After this file is saved and reviewed, the next document to edit is:

```text
doc/DOCUMENT-STATUS-REGISTRY.md
```

That document must:

- register all newly synchronized canonical documents;
- separate document, implementation, deployment, and verification statuses;
- identify superseded content;
- classify `complete-roadmap.md` as historical;
- record the correct authority hierarchy;
- record the five new strategy documents as drafts;
- preserve current Phase 1 truth;
- remove stale Stage and Agent claims.

---

# Change Log

| Version | Date | Change |
|---|---|---|
| 1.x | Earlier version | Contained development workflow, capacity guidance, active-runtime wording, and a reusable local Admin credential |
| 2.0.0 | 2026-08-04 | Replaced stale and unsafe instructions with current Phase 1 authority, secure credential handling, accurate Agent terminology, zero-state counters, evidence rules, Human approval gates, Tenant and Project isolation, and locked Phase progression |