---
document_id: GOV-PRINCIPLES-001
title: MianX.ai Enterprise Principles
version: 1.0.0
status: Draft — Founder Approval Required
authority_type: Proposed Enterprise Standard
classification: Public Repository
owner: MianX.ai Founder
maintainer: MianX.ai Governance Owner
reviewers:
  - Founder
  - Product Owner
  - Architecture Owner
  - Security Owner
  - Data Owner
  - Quality Owner
  - Operations Owner
created: 2026-08-04
updated: 2026-08-04
approval_status: Pending
implementation_status: Not Applicable
verification_status: Source-Aligned Draft
canonical_scope: Enterprise-wide decision, ownership, Product, Architecture, Security, AI, operational, and evidence principles
supersedes:
  - Repeated enterprise-principle statements across historical Roadmaps and duplicate Governance documents
related_documents:
  - ../CURRENT-STATE.md
  - ../DOCUMENT-STATUS-REGISTRY.md
  - ../MIANX-AI-MASTER-COMPLETION-PHASES.md
  - ../../execution/EXECUTION-BOARD.md
  - ../02-company/VISION-AND-MISSION.md
  - ../31-enterprise-architecture/CORE-ARCHITECTURE.md
  - ../44-enterprise-ai/AI-GOVERNANCE.md
  - ../48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md
---

# MianX.ai Enterprise Principles

> [!IMPORTANT]
> This document defines proposed enterprise principles for MianX.ai.
>
> It remains a Draft until Founder approval is recorded.
>
> It does not prove that any Product, Platform capability, AI Agent, workflow,
> control, deployment, Customer implementation, recovery process, or operating
> model is implemented or Production Operational.
>
> Current implementation and operational reality is governed by:
>
> [`CURRENT-STATE.md`](../CURRENT-STATE.md)

---

# 1. Purpose

This document defines the decision principles that should guide MianX.ai across:

- Company strategy;
- Product Management;
- Platform Architecture;
- Industry Operating Systems;
- Engineering;
- Security;
- Data;
- Quality;
- AI;
- Operations;
- Customer delivery;
- commercial decisions;
- organizational Knowledge;
- growth and expansion.

Its purpose is to create one stable enterprise decision framework without
repeating the same general principles across every Product, Architecture,
Roadmap, AI, and operational document.

Domain documents should:

- reference these principles;
- add domain-specific rules;
- avoid copying the complete principle set;
- identify any approved exception;
- preserve higher-authority requirements.

---

# 2. Current-State Boundary

These principles describe how MianX.ai should make decisions.

They do not change the current Phase or maturity.

Current recorded truth remains:

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
```

This summary is informational.

[`CURRENT-STATE.md`](../CURRENT-STATE.md) remains authoritative for current
facts.

---

# 3. Authority and Interpretation

## 3.1 Current Draft Authority

Before Founder approval, this document is:

```text
Documented

+

Review Required

+

Not Yet Binding Enterprise Policy
```

It may be used for:

- review;
- reconciliation;
- identifying conflicts;
- preparing Product and Architecture decisions;
- aligning draft Governance documents.

It must not be presented as Founder-approved policy.

## 3.2 Authority After Approval

After Founder approval, these principles become the default enterprise decision
framework within their defined scope.

They do not override:

- applicable law;
- contracts;
- approved licensing terms;
- Founder-approved Constitutions;
- verified current-state evidence;
- approved Architecture Decision Records;
- approved Policies or Standards;
- approved Product specifications;
- approved operational runbooks;
- explicit Founder decisions.

## 3.3 Conflict Rule

When sources conflict:

```text
Higher Authority

↓

More Specific Approved Scope

↓

Current Verified Evidence

↓

Lower-Level Guidance
```

A Roadmap, generated summary, old execution plan, or historical document must
not silently override a higher-authority source.

---

# 4. Enterprise Philosophy

MianX.ai should follow this enterprise philosophy:

> **Solve verified business problems, build reusable foundations, preserve
> domain boundaries, govern centrally where appropriate, protect Human
> authority, produce evidence, operate safely, and continuously improve through
> reusable Knowledge.**

This philosophy does not mean every capability belongs inside one giant Core.

It means each capability should be placed in the correct layer and governed
according to its Risk, ownership, reuse, and operational requirements.

---

# 5. Core Enterprise Principles

## P01 — Current Truth Before Future Vision

Current implementation, deployment, Product, Customer, recovery, Security, and
AI claims must come from current evidence.

Roadmaps define direction.

They do not prove:

- implementation;
- deployment;
- Production operation;
- Customer use;
- active Agents;
- completed Products;
- Phase completion.

---

## P02 — Founder Authority for Strategic Direction

The Founder retains final authority over:

- Company Vision;
- Company Mission;
- material strategy;
- Phase completion;
- next-Phase authorization;
- Product portfolio;
- first Industry Product selection;
- Platform Kernel boundaries;
- high-risk AI authority;
- material Customer commitments;
- capital allocation;
- licensing posture;
- recovery-Risk acceptance;
- Marketplace launch;
- regional and global expansion;
- enterprise launch or retirement.

Delegation must be explicit.

Silence is not delegation.

---

## P03 — Product Company Before Unrelated Project Work

MianX.ai is intended to build reusable Industry Operating Systems and supporting
Platform capabilities.

Customer work should strengthen:

- a validated Product;
- a reusable Platform capability;
- an Industry workflow;
- organizational Knowledge;
- measurable Customer outcomes.

MianX.ai should not become permanently dependent on unrelated one-off custom
projects that do not strengthen the approved Product strategy.

---

## P04 — Customer Problem Before Product Scope

A Product, feature, workflow, integration, automation, or AI use case should
begin with a verified Customer or enterprise problem.

Technology availability alone is not sufficient justification.

Before approval, define:

- target user;
- problem;
- current process;
- expected outcome;
- evidence;
- constraints;
- ownership;
- Risk;
- success metric.

---

## P05 — Outcome Before Activity

Success should be measured by verified outcomes.

Activity measures such as these are not success by themselves:

- document count;
- feature count;
- Agent count;
- task count;
- commit count;
- code volume;
- meeting volume;
- generated output volume.

Useful outcomes may include:

- reduced operational time;
- improved accuracy;
- lower Risk;
- better Customer experience;
- higher Product adoption;
- improved recovery;
- increased Product Margin;
- reduced repeated foundational work.

---

## P06 — Correct Layer Before Implementation

Every material capability should be classified before implementation.

Approved classification model:

```text
MianX Platform Kernel

Shared Platform Service

Shared Enterprise Service

Governed AI Runtime

Industry Operating System

Customer Configuration or Isolated Extension

Internal MianX Application

Research or Controlled Experiment
```

Incorrect placement creates:

- unnecessary coupling;
- duplicated foundations;
- Product contamination;
- difficult migrations;
- weak ownership;
- Security Risk;
- long-term maintenance cost.

---

## P07 — Platform Kernel Must Remain Small and Stable

The Platform Kernel should contain only broadly universal technical
foundations.

Potential Kernel capabilities include:

- Authentication;
- users;
- Organizations;
- Tenants;
- Memberships;
- roles;
- permissions;
- policy enforcement;
- configuration;
- feature flags;
- audit;
- event conventions;
- API standards;
- usage and cost hooks;
- Security foundations;
- observability hooks.

A capability does not become Kernel merely because it appears reusable in a
Roadmap.

Kernel promotion requires evidence, stable contracts, ownership, tests,
Security review, operational support, and proven broad applicability.

---

## P08 — Shared Services Before Duplicate Foundations

Capabilities reused across Products but not universal enough for the Kernel
should be evaluated as Shared Platform or Shared Enterprise Services.

Potential Shared Platform Services include:

- Workspaces;
- Projects;
- tasks;
- workflows;
- approvals;
- comments;
- files;
- notifications;
- search;
- reporting;
- dashboards;
- documents;
- integrations.

Potential Shared Enterprise Services include:

- CRM foundations;
- billing foundations;
- Customer onboarding;
- Support;
- Customer Success;
- procurement;
- inventory;
- finance;
- reusable enterprise analytics.

Products should not rebuild approved shared foundations without a documented
reason.

---

## P09 — Industry Logic Remains With the Industry Product

Industry-specific:

- terminology;
- entities;
- workflows;
- business rules;
- calculations;
- reports;
- regulations;
- integrations;
- permissions;
- AI behavior;

should remain inside the relevant Industry Operating System.

Restaurant, poultry, hospital, school, or another Industry domain must not
silently redefine the Platform Kernel.

---

## P10 — Reuse Before Rewrite

Approved services, interfaces, patterns, templates, workflows, controls, and
Knowledge should be reused where they fit.

Reuse must not:

- force unrelated domain behavior into the Kernel;
- hide Product differences;
- weaken Security;
- create unstable generic abstractions;
- preserve a bad design only because it already exists.

Reuse is preferred when it improves:

- consistency;
- maintainability;
- speed;
- Security;
- operational support;
- long-term Product value.

---

## P11 — Configuration Before Customer-Specific Forks

Customer variation should normally be handled through:

- configuration;
- roles;
- permissions;
- policy;
- workflow;
- Branch or location rules;
- feature flags;
- templates;
- data mappings;
- approved integrations;
- isolated extensions.

Customer-specific Platform forks require explicit Product and Architecture
approval.

Any approved fork must define:

- owner;
- reason;
- cost;
- upgrade strategy;
- Security impact;
- support responsibility;
- retirement or convergence plan.

---

## P12 — Architecture Before Material Implementation

Material work should define:

- capability boundary;
- owner;
- interfaces;
- dependencies;
- Data responsibility;
- Tenant and Project scope;
- Security controls;
- failure behavior;
- observability;
- operational ownership;
- migration impact;
- rollback or recovery;
- versioning;
- future evolution.

Architecture should be proportional to Risk.

Small reversible changes should not be blocked by unnecessary ceremony.

---

## P13 — Security With Delivery

Security is part of delivery, not a final-stage add-on.

Required controls should be designed and tested with the capability.

Security principles include:

- least privilege;
- deny by default;
- server-side authorization;
- Tenant isolation;
- Project isolation;
- secret protection;
- auditability;
- secure defaults;
- controlled privileged access;
- dependency review;
- incident response;
- recovery planning.

Delivery speed does not justify concealed Security Risk.

---

## P14 — Quality With Delivery

Quality includes more than test count.

Quality should address:

- correctness;
- usability;
- accessibility;
- Security;
- performance;
- Reliability;
- maintainability;
- data integrity;
- failure handling;
- recovery;
- evidence;
- Customer outcome.

A passing test suite does not independently prove Production operation.

---

## P15 — Tenant and Project Isolation by Design

Tenant, Organization, Customer, Product, Project, region, data, memory, and AI
context boundaries must be explicit and testable.

Required principles:

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
must not receive
Platform Admin authority
```

A confirmed isolation failure takes priority over aggregate Product progress.

---

## P16 — Data Has Ownership and Purpose

Every important dataset should define:

- owner;
- purpose;
- source;
- classification;
- Tenant;
- Project;
- access;
- retention;
- accuracy;
- lineage;
- update rules;
- deletion rules;
- recovery requirements;
- audit requirements.

Data should not be collected merely because storage is available.

Sensitive data should not be exposed in public evidence.

---

## P17 — Operations Before Increased Autonomy

A capability should not receive increased automation or AI authority until it
is sufficiently:

- observable;
- supportable;
- permission-bound;
- auditable;
- reversible where practical;
- recoverable;
- owned;
- cost-controlled;
- tested under failure.

Autonomy without Operations increases hidden Risk.

---

## P18 — Tested Recovery Before Recovery Claims

Backup existence does not prove recovery.

A recovery claim should distinguish:

- backup creation;
- checksum validation;
- secure storage;
- restore execution;
- restored-data verification;
- recovery ownership;
- retention;
- RTO;
- RPO;
- managed backup;
- Point-in-Time Recovery;
- disaster-recovery testing.

Manual logical recovery proof must not be described as full enterprise disaster
recovery.

---

## P19 — Evidence Before Completion

Important work is complete only when required evidence can be reviewed.

The following do not independently prove completion:

- generated output;
- document creation;
- code existence;
- a commit;
- an open Pull Request;
- a merged Pull Request;
- green CI;
- a deployment;
- a passed deadline;
- an AI-generated report.

Completion evidence must match the exact claimed scope.

---

## P20 — Human Authority Over High-Risk AI Decisions

AI may:

- research;
- summarize;
- draft;
- analyze;
- recommend;
- test within approved scope;
- execute bounded low-risk work.

Qualified Humans retain authority over:

- legal commitments;
- financial transfers;
- destructive operations;
- Security exceptions;
- privacy decisions;
- permission changes;
- strategic decisions;
- material Customer commitments;
- high-risk Production actions;
- irreversible decisions;
- authority changes.

AI must not grant itself additional authority.

---

## P21 — AI Identity, Scope, and Evidence

A documented Agent Role is not an active Agent.

An active Agent requires:

- unique identity;
- owner;
- role;
- Product scope;
- Project scope;
- Tenant scope;
- permissions;
- approved model;
- approved tools;
- cost limits;
- runtime allocation;
- runtime activation;
- evidence;
- monitoring;
- suspension.

Agent counts must be runtime-evidence based.

---

## P22 — Governance Before Scale

Products, Customers, Agents, regions, partners, Marketplace assets, and
automated workflows should not scale beyond their:

- ownership;
- permissions;
- Security;
- monitoring;
- Quality;
- support;
- recovery;
- cost controls;
- Governance capacity.

Scale amplifies both value and defects.

---

## P23 — Sustainable Economics Before Artificial Growth

Growth should not hide:

- structural losses;
- excessive customization;
- uncontrolled infrastructure cost;
- uncontrolled AI cost;
- weak Product Margin;
- Customer concentration;
- unbounded support burden;
- unowned operational work.

Every material Product or service should have an economic model or an approved
baselining plan.

---

## P24 — Simplicity Before Unnecessary Complexity

Use the simplest design that satisfies approved:

- Customer requirements;
- Security;
- Reliability;
- scale;
- maintainability;
- recovery;
- compliance.

Complexity must have:

- an owner;
- a reason;
- measurable benefit;
- maintenance plan.

Future possibility alone does not justify present complexity.

---

## P25 — Explicit Contracts Before Hidden Coupling

Modules should communicate through explicit, governed, versioned contracts.

Prefer:

- APIs;
- typed interfaces;
- event contracts;
- schema contracts;
- documented configuration;
- owned integration boundaries.

Avoid:

- hidden database coupling;
- undocumented side effects;
- direct cross-domain data access;
- unversioned integration behavior;
- private implementation dependencies.

---

## P26 — Documentation With Delivery

Required Documentation should change with the capability.

This may include:

- Product requirements;
- Architecture Decisions;
- API contracts;
- Data contracts;
- Security controls;
- migration records;
- runbooks;
- recovery procedures;
- Customer instructions;
- AI evaluations;
- current-state evidence.

Documentation should remain:

- concise;
- authoritative;
- searchable;
- versioned;
- owned;
- maintainable.

Documentation should not be generated merely to increase file count.

---

## P27 — One Topic, One Canonical Authority

Each material topic should normally have:

```text
One Canonical Document

+

One Named Owner

+

One Defined Authority

+

Many References
```

Duplicate documents should be:

- assessed;
- reconciled;
- linked;
- superseded;
- deprecated;
- archived;

through a controlled process.

Conflicting active sources of truth are a Governance defect.

---

## P28 — Measure What Supports Decisions

Every material objective should define:

- owner;
- baseline or baselining status;
- target where appropriate;
- data source;
- review cadence;
- limitations;
- decision triggered by the metric.

Metrics that reward harmful or misleading behavior should be corrected or
retired.

---

## P29 — Learning Must Strengthen the Enterprise

Verified learning from:

- Customers;
- Products;
- incidents;
- Research;
- Engineering;
- Security;
- Data;
- AI evaluations;
- operations;

should improve:

- Product workflows;
- Shared Services;
- Platform controls;
- Documentation;
- templates;
- Knowledge;
- future decisions.

Unverified assumptions must not become organizational Knowledge.

---

## P30 — Controlled Change Before Silent Drift

Material changes to Product scope, Architecture, Security, AI authority,
operations, recovery, or Phase boundaries must be:

- explicit;
- owned;
- reviewed;
- evidence-based;
- versioned;
- approved where required;
- reflected in canonical Documentation.

Silent drift is not an acceptable operating model.

---

# 6. Asset and Accountability Chain

Every material enterprise asset should follow:

```text
Enterprise Asset

↓

Named Owner

↓

Defined Purpose and Scope

↓

Defined Responsibilities and Authority

↓

Required Controls

↓

Required Evidence

↓

Success Metrics and Risk Indicators

↓

Review, Improvement, Suspension, or Retirement
```

Enterprise assets include:

- Products;
- Platform services;
- repositories;
- APIs;
- databases;
- data;
- models;
- Agents;
- prompts;
- tools;
- workflows;
- documents;
- decisions;
- contracts;
- Customers;
- partners;
- environments;
- operational procedures.

An asset without ownership should be treated as a Governance gap.

---

# 7. Domain-Anchored Compounding Rule

The approved compounding model is:

```text
Every Customer implementation should strengthen
its approved Industry Operating System.

↓

Repeated Industry capability should be evaluated
for Shared Platform or Shared Enterprise Services.

↓

Only broadly universal, stable, proven capability
should be considered for the Platform Kernel.

↓

Every verified lesson should strengthen
MianX.ai Knowledge and future execution.
```

This rule does not authorize automatic promotion into the Kernel.

Shared capability extraction requires:

- verified repeated need;
- stable contract;
- Architecture review;
- Security review;
- ownership;
- tests;
- migration strategy;
- operational support;
- measurable reuse.

---

# 8. Material Decision Test

Before approving a material initiative, answer:

1. Which verified problem or approved objective does it address?
2. Who is the target user or accountable enterprise owner?
3. Which measurable outcome should change?
4. Does it align with MianX.ai Product positioning?
5. Is an approved reusable capability already available?
6. Which Architecture layer owns the capability?
7. Is the capability Product-specific or broadly reusable?
8. Are ownership and decision authority clear?
9. Are Security and privacy impacts understood?
10. Are Data ownership and retention understood?
11. Are Tenant and Project boundaries protected?
12. Are Quality and operational requirements defined?
13. Is recovery required and defined?
14. Is the work economically sustainable?
15. What evidence will prove implementation?
16. What evidence will prove deployment or operation?
17. What metric will prove value?
18. Is Human approval required?
19. Can the change be reversed, suspended, or retired?
20. Which Knowledge should be preserved?

A material initiative that cannot answer these questions should remain in
Discovery or return for clarification.

---

# 9. Layer Placement Test

| Question | Likely placement |
|---|---|
| Required by nearly every Product and technically universal? | Platform Kernel candidate |
| Reused across Products but not universal? | Shared Platform Service |
| Reusable business capability across Products? | Shared Enterprise Service |
| Governs models, prompts, tools, Agents, tasks, and AI evidence? | Governed AI Runtime |
| Specific to one Industry? | Industry Operating System |
| Specific to one approved Customer? | Customer configuration or isolated extension |
| Used only for MianX.ai internal operations? | Internal MianX Application |
| Unproven idea? | Research or controlled experiment |
| External ecosystem capability? | Governed integration, Plugin, Partner, or Marketplace layer |

Placement remains an Architecture decision.

The table is guidance, not automatic classification.

---

# 10. Automation Principle

MianX.ai should automate repeatable work when automation:

- improves consistency;
- reduces avoidable manual effort;
- remains observable;
- remains permission-bound;
- produces evidence;
- has failure handling;
- is recoverable where practical;
- has cost controls;
- preserves required Human authority.

Automation is not mandatory when it would increase:

- Risk;
- complexity;
- cost;
- opacity;
- dependency;
- loss of accountability.

---

# 11. Required Evidence Standard

Depending on scope and Risk, completion evidence may include:

- approved requirement;
- Product decision;
- Architecture Decision Record;
- source code;
- exact commit;
- test result;
- CI result;
- Security review;
- Data review;
- migration record;
- deployment record;
- authenticated smoke test;
- monitoring result;
- audit record;
- rollback result;
- restore result;
- Customer confirmation;
- Product analytics;
- financial result;
- approval record;
- Risk acceptance.

Evidence must identify:

- relevant version;
- repository;
- environment;
- Product;
- Project;
- Tenant where applicable;
- owner;
- reviewer;
- result;
- limitations.

---

# 12. Exception Standard

An exception to these principles must be:

- explicit;
- narrow in scope;
- owned;
- justified;
- risk-assessed;
- approved by the appropriate authority;
- time-bound where practical;
- supported by compensating controls;
- monitored;
- reviewed;
- deliberately closed, renewed, or converted into an approved standard.

The exception record should define:

```text
Exception:
Reason:
Scope:
Owner:
Risk:
Compensating Controls:
Approver:
Start Date:
Review Date:
Expiry Date:
Closure Condition:
```

Deadline pressure, missing budget, or silence does not constitute approval.

---

# 13. Enforcement

After approval, these principles should be referenced by:

- Product proposals;
- Product requirements;
- Architecture reviews;
- Architecture Decision Records;
- Engineering plans;
- Security reviews;
- Data reviews;
- AI Agent and Tool approvals;
- release gates;
- deployment gates;
- recovery plans;
- Customer proposals;
- partner reviews;
- Marketplace reviews;
- regional launch reviews;
- Risk acceptance;
- Phase entry and exit gates.

A proposal should identify any principle it intentionally does not follow and
the approved exception.

---

# 14. Principle Metrics

Useful indicators may include:

- initiatives linked to approved objectives;
- initiatives linked to verified Customer problems;
- evidence-complete work;
- shared-service adoption;
- duplicate-foundation reduction;
- Customer-specific Platform forks;
- Tenant-isolation test results;
- Project-isolation test results;
- high-risk Human-approval compliance;
- restore-test success;
- stale-document count;
- conflicting canonical-source count;
- Product outcome achievement;
- Customer outcome achievement;
- Product Margin;
- infrastructure cost per Product;
- AI cost per verified outcome;
- expired exceptions;
- unowned critical assets;
- unsupported completion claims discovered.

Metrics must not become a substitute for judgment.

---

# 15. Enterprise Anti-Patterns

MianX.ai should avoid:

- treating Documentation volume as maturity;
- treating Agent count as capability;
- treating capacity seats as active Agents;
- treating code existence as Production readiness;
- treating green CI as full operational verification;
- treating a Roadmap as Customer evidence;
- treating a deployment as Product success;
- building several Products before the first Product proves value;
- creating a giant theoretical Core before real reuse is established;
- embedding Industry-specific logic in the Platform Kernel;
- embedding Customer-specific logic directly in shared foundations;
- creating Customer-specific Platform forks without approval;
- using AI without identity, permissions, evaluation, evidence, and suspension;
- weakening Security or recovery to increase speed;
- maintaining conflicting active sources of truth;
- collecting data without purpose and ownership;
- allowing temporary exceptions to become permanent Architecture;
- starting future Phases without Founder authorization;
- presenting future Vision as current operational capability.

---

# 16. Principle Adoption Criteria

This document becomes an active enterprise standard only when:

- [ ] Founder approval is recorded.
- [ ] Exact approved version is recorded.
- [ ] It is registered as approved in `DOCUMENT-STATUS-REGISTRY.md`.
- [ ] Product documents reference it.
- [ ] Architecture documents reference it.
- [ ] AI Governance references it.
- [ ] Roadmap documents reference it.
- [ ] Contributor guidance references it where relevant.
- [ ] Conflicting repeated principles are deprecated or linked.
- [ ] Required exceptions have an approved process.
- [ ] Review ownership is assigned.

Until then:

```text
Lifecycle = Draft

Approval = Pending

Implementation Status = Not Applicable

Verification = Source-Aligned Draft
```

---

# 17. Review and Change Control

Review this document:

- quarterly during Foundation and Product growth;
- after a material Company-positioning change;
- after a Constitution change;
- after a major Product decision;
- after a major Architecture decision;
- after a major Security or Data incident;
- after a major AI incident;
- before Marketplace launch;
- before regional or global expansion.

A material change requires:

- proposed wording;
- reason;
- affected principles;
- affected documents;
- Product impact;
- Architecture impact;
- Security impact;
- Data impact;
- AI impact;
- operational impact;
- Risk assessment;
- reviewer comments;
- Founder decision;
- version update;
- Registry update.

---

# 18. Related Documents

- [`CURRENT-STATE.md`](../CURRENT-STATE.md)
- [`DOCUMENT-STATUS-REGISTRY.md`](../DOCUMENT-STATUS-REGISTRY.md)
- [`MIANX-AI-MASTER-COMPLETION-PHASES.md`](../MIANX-AI-MASTER-COMPLETION-PHASES.md)
- [`EXECUTION-BOARD.md`](../../execution/EXECUTION-BOARD.md)
- [`VISION-AND-MISSION.md`](../02-company/VISION-AND-MISSION.md)
- [`CORE-ARCHITECTURE.md`](../31-enterprise-architecture/CORE-ARCHITECTURE.md)
- [`AI-GOVERNANCE.md`](../44-enterprise-ai/AI-GOVERNANCE.md)
- [`MASTER-ROADMAP-SUMMARY.md`](../48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md)

---

# 19. Current Document Decision

```text
DOCUMENT_STATUS=DRAFT

FOUNDER_APPROVAL=PENDING

AUTHORITY_TYPE=PROPOSED_ENTERPRISE_STANDARD

IMPLEMENTATION_STATUS=NOT_APPLICABLE

VERIFICATION_STATUS=SOURCE_ALIGNED_DRAFT

CURRENT_PHASE=PHASE_1_PLATFORM_FOUNDATION

PHASE_1_COMPLETE=NO

PHASE_2_STARTED=NO
```

---

# 20. Next Document

After this file is saved and reviewed, the next document to edit is:

```text
doc/02-company/VISION-AND-MISSION.md
```

That document must:

- define the Company identity clearly;
- distinguish current Product positioning from long-term Vision;
- avoid presenting the Enterprise AI Operating System as currently operational;
- define Customer value and Mission;
- preserve Founder authority;
- avoid repeating the complete Enterprise Principles;
- use correct relative links;
- remain Draft until Founder approval.

---

# Change Log

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial consolidated Enterprise Principles draft |
| 1.0.0 | 2026-08-04 | Corrected canonical paths, separated Platform Kernel from Shared Services and Industry logic, strengthened current-state boundaries, Founder authority, Product-value, Security, Data, AI, recovery, evidence, exception, and controlled-change principles |