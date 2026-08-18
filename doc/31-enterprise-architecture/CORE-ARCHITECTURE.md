---
document_id: ARCH-CORE-001
title: MianX.ai Core Architecture
version: 1.0.0
status: Draft — Architecture and Founder Approval Required
authority_type: Proposed Strategic Architecture
classification: Public Repository
owner: MianX.ai Architecture Owner
maintainer: MianX.ai Platform Architecture
approvers:
  - MianX.ai Founder
  - Architecture Authority
reviewers:
  - Product Owner
  - Security Owner
  - Data Owner
  - Quality Owner
  - Operations Owner
  - AI Governance Owner
created: 2026-08-04
updated: 2026-08-04
approval_status: Pending
implementation_status: Partial
deployment_status: Production Verification Pending
verification_status: Source-Aligned Draft
canonical_scope: Target Platform layers, Kernel boundary, Shared Service boundaries, dependency rules, Product isolation, AI integration, and Architecture governance
supersedes:
  - Repeated Core and Platform Architecture summaries across historical Roadmaps
related_documents:
  - ../CURRENT-STATE.md
  - ../DOCUMENT-STATUS-REGISTRY.md
  - ../MIANX-AI-MASTER-COMPLETION-PHASES.md
  - ../../execution/EXECUTION-BOARD.md
  - ../01-governance/ENTERPRISE-PRINCIPLES.md
  - ../02-company/VISION-AND-MISSION.md
  - ../44-enterprise-ai/AI-GOVERNANCE.md
  - ../48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md
---

# MianX.ai Core Architecture

> [!IMPORTANT]
> This document defines the proposed target Architecture and capability
> boundaries for MianX.ai.
>
> It remains a Draft until Architecture and Founder approval are recorded.
>
> It does not prove that the complete Platform Kernel, Shared Services,
> Enterprise AI Operating System, Industry Products, Customer Editions,
> deployment environments, recovery controls, or ecosystem capabilities are
> implemented or Production Operational.
>
> Current implementation and operational truth is governed by:
>
> [`CURRENT-STATE.md`](../CURRENT-STATE.md)

---

# 1. Purpose

This document defines the Architecture through which MianX.ai should build,
operate, and improve multiple Industry Operating Systems without repeatedly
rebuilding foundational capabilities or creating uncontrolled Product and
Customer forks.

It establishes:

- the Platform Kernel boundary;
- Shared Platform Service boundaries;
- Shared Enterprise Service boundaries;
- the governed AI Runtime boundary;
- Industry Operating System ownership;
- Customer Edition boundaries;
- delivery-channel boundaries;
- dependency direction;
- Multi-Tenant and Multi-Project isolation;
- Data, API, event, integration, Security, Reliability, and recovery rules;
- Architecture ownership and approval;
- capability-promotion rules;
- Architecture evidence and maturity requirements.

Detailed technology choices and material design decisions should be recorded in
approved Architecture Decision Records.

---

# 2. Current-State Boundary

This document describes target Architecture.

It must not independently upgrade current maturity.

The current recorded position remains:

```text
Current Phase = Phase 1 — Platform Foundation

Phase 1 Status = READY_FOR_FINAL_VERIFICATION

Phase 1 Complete = NO

Founder Phase 1 Sign-Off = NOT APPROVED

Phase 2 Started = NO

Full Platform Kernel Verified = NO

Full MianX Core Verified = NO

Enterprise AI Operating System Operational = NO

Allocated AI Agents = 0

Active AI Agents = 0

Live-Tested AI Agents = 0
```

Current implementation facts, commit references, migration state, deployment
state, recovery state, AI counters, and blockers must be maintained in:

[`CURRENT-STATE.md`](../CURRENT-STATE.md)

---

# 3. Architecture Objective

> **Build a secure, modular, Multi-Tenant, configurable, observable,
> recoverable, and reusable Platform that supports several Industry Products
> and Customers without repeated foundational development or architectural
> fragmentation.**

The Architecture should enable MianX.ai to:

- solve real Industry problems;
- reuse verified foundations;
- isolate Product-specific logic;
- isolate Customer-specific variation;
- govern AI execution;
- protect Tenant and Project boundaries;
- evolve contracts safely;
- operate capabilities responsibly;
- preserve Human authority;
- improve through evidence from real Product use.

---

# 4. Architecture Principles

MianX.ai Architecture should remain:

- Customer-problem driven;
- Domain-Anchored;
- modular;
- reusable;
- configurable;
- Multi-Tenant;
- Multi-Product;
- Multi-Project;
- contract-driven;
- API-first where appropriate;
- event-ready where appropriate;
- secure by default;
- deny-by-default;
- permission-aware;
- Product-aware;
- Tenant-aware;
- Project-aware;
- observable;
- auditable;
- recoverable;
- versioned;
- extensible through governed contracts;
- cost-aware;
- Human-governed;
- maintainable over long-term evolution.

Architecture complexity must be justified by current or strongly evidenced
Product needs.

---

# 5. Canonical Architecture Model

```text
Company and Governance
Vision · Authority · Policy · Risk · Legal · Finance · Documentation

↓

MianX Platform Kernel
Identity · Organizations · Tenants · Memberships
Roles · Permissions · Policy Enforcement
Configuration · Feature Flags · Audit Foundations
API and Event Standards · Usage and Cost Hooks
Security and Observability Foundations

↓

Shared Platform Services
Workspaces · Projects · Tasks · Workflows · Approvals
Files · Notifications · Search · Reporting · Dashboards
Documents · Scheduling · Integration Adapters

↓

Shared Enterprise Services
CRM · Sales · Billing · Finance · Procurement
Inventory Foundations · Customer Success · Support
Reusable Business Analytics and Operational Services

↓

Governed AI Runtime
Models · Providers · Prompts · Context · Tools
Agent Registry · Task and Workflow Orchestration
Memory · Knowledge · Evaluation · Evidence
Human Approval · Cost Control · Audit · Suspension

↓

Industry Operating Systems
Industry Entities · Terminology · Workflows · Rules
Permissions · Calculations · Reports · Integrations
Domain AI Behavior · Operational Outcomes

↓

Customer Editions
Customer Configuration · Locations · Roles · Policies
Customer Data · Mappings · Integrations
Approved Isolated Extensions

↓

Experience and Delivery Channels
Web · Mobile · POS · Admin · Dashboards
Portals · Messaging · Voice · Public APIs
```

The layers describe ownership and dependency boundaries.

They do not describe current implementation maturity.

---

# 6. Cross-Cutting Architecture Controls

The following concerns apply across all layers:

```text
Security

Data Governance

Tenant and Project Isolation

Quality

Observability

Auditability

Reliability

Recovery

Cost and Usage Control

Documentation

Versioning and Change Management

Human Authority
```

These concerns must not be treated as optional final-stage additions.

---

# 7. Dependency Direction

The preferred dependency direction is:

```text
Experience or Delivery Channel

depends on

Customer Edition

depends on

Industry Operating System

depends on approved combinations of

Shared Enterprise Services
Shared Platform Services
Governed AI Runtime

which depend on

MianX Platform Kernel
```

Company and Governance controls all layers but should not create hidden runtime
coupling.

## 7.1 Dependency Rules

- Industry Products may use Shared Services and the Kernel.
- Shared Services must not depend on Industry-specific entities.
- The Kernel must not depend on Shared Services or Industry Products.
- Customer Editions may configure Products but must not modify Kernel internals.
- Delivery channels must not become independent business systems of record.
- AI must use approved interfaces rather than hidden privileged access.
- Circular dependencies require redesign or an approved Architecture exception.
- One Product must not depend directly on another Product’s internal
  implementation.

---

# 8. MianX Platform Kernel

## 8.1 Kernel Purpose

The Platform Kernel provides the smallest stable set of technical foundations
required to enforce shared Platform contracts.

The Kernel should remain:

- small;
- stable;
- domain-neutral;
- Security-sensitive;
- centrally governed;
- broadly reusable;
- backward-compatible where practical;
- independently testable;
- operationally owned.

## 8.2 Initial Kernel Candidates

### Identity and Sessions

- users;
- Authentication;
- sessions;
- session revocation;
- identity-provider integration contracts;
- identity audit events.

### Organizations and Tenancy

- Organizations;
- Tenants;
- Memberships;
- Tenant context;
- Organization and Tenant relationships;
- Tenant lifecycle foundations.

### Authorization

- roles;
- permissions;
- policy enforcement;
- administrative boundaries;
- least-privilege controls;
- protected-resource authorization conventions.

### Configuration

- Platform configuration;
- Tenant-aware configuration foundations;
- feature flags;
- controlled environment configuration;
- configuration versioning.

### Audit and Traceability

- audit-event contracts;
- actor identity;
- Tenant and Project context;
- correlation identifiers;
- immutable or protected audit foundations;
- privileged-action evidence.

### Platform Contracts

- API standards;
- event standards;
- error conventions;
- versioning conventions;
- idempotency conventions;
- pagination and filtering conventions;
- compatibility requirements.

### Usage and Cost Foundations

- usage-event hooks;
- cost-attribution hooks;
- Tenant attribution;
- Product attribution;
- Project attribution;
- quota and limit foundations.

### Security Foundations

- secret-handling rules;
- secure defaults;
- encryption requirements;
- privileged-access boundaries;
- Security event hooks;
- vulnerability and incident integration points.

### Observability Foundations

- logging conventions;
- metrics conventions;
- tracing conventions;
- health-check conventions;
- service identity;
- correlation and context propagation.

## 8.3 Explicit Kernel Exclusions

The following are not automatically part of the Platform Kernel:

- Workspaces;
- Projects;
- tasks;
- subtasks;
- comments;
- workflow execution;
- approval workflows;
- files;
- media;
- notifications;
- search;
- reporting;
- dashboards;
- document management;
- CRM;
- billing;
- finance;
- inventory;
- Customer Support;
- Industry entities;
- Industry workflows;
- Customer-specific configuration;
- Agent roles;
- model-provider logic.

These capabilities may belong in other shared or Product layers.

---

# 9. Kernel Placement Criteria

A capability may be considered for the Kernel when it is:

- required by nearly every approved Product;
- domain-neutral;
- required to enforce a Platform-wide contract;
- Security-sensitive or identity-sensitive;
- stable enough for a shared interface;
- centrally governable;
- securely reusable;
- independently testable;
- independently supportable;
- versionable;
- measurable;
- recoverable where applicable;
- supported by real reuse evidence.

A capability should remain outside the Kernel when it is:

- specific to one Industry;
- specific to one Customer;
- specific to one workflow;
- experimental;
- unstable;
- rapidly evolving;
- optional for most Products;
- regulated differently by Product or region;
- likely to force unrelated Products into one lifecycle;
- not operationally supported as a shared capability.

---

# 10. Shared Platform Services

## 10.1 Purpose

Shared Platform Services provide reusable technical and operational
capabilities used by several Products without expanding the Platform Kernel.

## 10.2 Candidate Shared Platform Services

### Work Management

- Workspaces;
- Projects;
- tasks;
- subtasks;
- comments;
- labels;
- assignments;
- activity timelines.

### Workflow and Approval

- workflow definitions;
- state transitions;
- approval routing;
- Human review steps;
- scheduled actions;
- retry and failure handling;
- evidence capture.

### Files and Media

- file upload;
- storage abstraction;
- metadata;
- permissions;
- retention;
- scanning;
- versioning;
- Tenant isolation.

### Notifications and Communications

- notification preferences;
- email;
- messaging;
- in-application notifications;
- delivery tracking;
- templates;
- channel adapters.

### Search

- scoped search;
- indexing;
- Tenant-aware retrieval;
- Project-aware retrieval;
- authorization-filtered results;
- indexing lifecycle.

### Reporting and Dashboards

- report contracts;
- report execution;
- dashboard composition;
- exports;
- scheduled reports;
- authorization-aware reporting.

### Documents

- document templates;
- document generation;
- document storage;
- approval and signature integration points;
- versioning.

### Scheduling and Jobs

- scheduled jobs;
- queue contracts;
- retry;
- idempotency;
- task ownership;
- failure evidence.

### Integration Foundations

- integration-adapter contracts;
- credential isolation;
- webhooks;
- reconciliation;
- retry;
- rate limiting;
- monitoring.

## 10.3 Shared Platform Service Boundary

A Shared Platform Service:

- is reusable;
- has a stable service contract;
- may evolve independently from the Kernel;
- must preserve Tenant and Project boundaries;
- must have a named owner;
- must not contain Industry-specific business rules.

---

# 11. Shared Enterprise Services

## 11.1 Purpose

Shared Enterprise Services provide reusable business capabilities that may be
consumed by several Industry Operating Systems.

They are not automatically required by every Product.

## 11.2 Candidate Shared Enterprise Services

- CRM foundations;
- sales foundations;
- marketing foundations;
- billing;
- subscription management;
- payment integration foundations;
- finance foundations;
- procurement;
- vendor management;
- inventory foundations;
- Customer onboarding;
- Customer Success;
- Support;
- reusable approval patterns;
- reusable business analytics;
- reusable business reporting.

## 11.3 Shared Enterprise Service Rule

A business capability should become shared only when:

- a real Product need exists;
- reuse has been demonstrated or strongly evidenced;
- domain-specific behavior can remain outside the shared contract;
- ownership is assigned;
- Data ownership is clear;
- permissions are clear;
- operational support exists;
- Product lifecycle independence is preserved.

The Shared Enterprise layer must not become one giant inflexible ERP.

---

# 12. Governed AI Runtime

## 12.1 Purpose

The governed AI Runtime provides shared controlled foundations for AI-assisted
and future Agent-based execution.

It should support Product and enterprise workflows without becoming an
independent authority.

## 12.2 Runtime Capability Candidates

- provider gateway;
- model registry;
- model routing;
- prompt registry;
- Prompt OS;
- context construction;
- Tool registry;
- Agent Role registry;
- runtime Agent registry;
- task orchestration;
- workflow orchestration;
- memory services;
- Knowledge retrieval;
- evaluation;
- Human approval gates;
- budget and cost controls;
- execution traces;
- evidence;
- safety controls;
- suspension;
- kill switch;
- incident handling.

## 12.3 AI Runtime Dependency Boundary

The AI Runtime may depend on:

- Kernel identity;
- Tenant and Project context;
- authorization;
- audit;
- usage and cost hooks;
- approved Shared Platform Services.

It must access Industry Product capabilities through approved Product
interfaces.

It must not:

- bypass Product permissions;
- bypass Tenant isolation;
- access databases through hidden privileged paths;
- assign itself permissions;
- activate Agents without authority;
- make high-risk decisions without required Human approval.

## 12.4 Current AI Boundary

The target Runtime Architecture does not change current AI status.

```text
Allocated Agents = 0

Active Agents = 0

Live-Tested Agents = 0

Genuine Provider Generation Calls = 0

Enterprise AI Operating System Operational = NO
```

Detailed AI controls belong in:

[`AI-GOVERNANCE.md`](../44-enterprise-ai/AI-GOVERNANCE.md)

---

# 13. Industry Operating Systems

## 13.1 Purpose

An Industry Operating System owns business behavior specific to an Industry.

## 13.2 Industry Ownership

Industry Products own:

- domain terminology;
- domain entities;
- operational workflows;
- business rules;
- calculations;
- permissions;
- reports;
- domain integrations;
- regulatory requirements;
- Industry-specific analytics;
- Industry-specific AI behavior;
- Product user experience;
- Customer outcomes.

## 13.3 Examples

RestaurantOS may own concepts such as:

- menu;
- kitchen;
- table;
- recipe;
- order;
- delivery;
- rider;
- restaurant branch operations.

PoultryOS may own concepts such as:

- flock;
- farm;
- feed;
- mortality;
- weight;
- vaccination;
- hatchery;
- egg production.

These concepts must not be placed inside the Platform Kernel.

## 13.4 First Product Boundary

RestaurantOS and PoultryOS are Product candidates.

The first Industry Product must be selected through evidence-based Product and
Architecture Re-Baseline.

No Product is automatically authorized because it appeared first in a
historical Roadmap.

---

# 14. Customer Editions

## 14.1 Purpose

A Customer Edition is an isolated and supported configuration of an approved
Industry Operating System.

## 14.2 Customer Variation

Customer-specific variation should normally use:

- configuration;
- roles;
- permissions;
- locations or branches;
- workflows;
- business rules;
- templates;
- feature flags;
- data mappings;
- integration adapters;
- approved isolated extensions.

## 14.3 Customer Edition Prohibitions

A Customer Edition must not:

- create a separate identity system;
- create a separate Tenant model;
- bypass Product permissions;
- modify Kernel internals through unsupported methods;
- mix Customer data;
- mix Customer memory or Knowledge;
- create an uncontrolled Product fork;
- create undocumented Production behavior.

---

# 15. Experience and Delivery Channels

Delivery channels may include:

- public websites;
- web applications;
- mobile applications;
- POS systems;
- Admin panels;
- dashboards;
- Customer portals;
- employee portals;
- messaging interfaces;
- voice interfaces;
- public APIs.

A delivery channel:

- presents or invokes approved capabilities;
- must preserve authorization;
- must not become an independent source of business truth;
- must not duplicate Product business logic without approval.

User-interface composition does not define Architecture ownership.

---

# 16. Capability Promotion Model

A capability should progress through:

```text
Real Product Need

↓

Product-Specific Implementation

↓

Verified Use

↓

Repeated Need

↓

Shared-Service Candidate

↓

Architecture and Security Review

↓

Stable Contract and Ownership

↓

Shared-Service Promotion

↓

Broad Universal Reuse Evidence

↓

Possible Platform Kernel Candidate
```

A capability must not move directly from idea to Kernel.

---

# 17. Shared-Service Standard

Every Production Shared Service should define:

- stable Service ID;
- purpose;
- owner;
- consumers;
- scope;
- non-scope;
- API or event contract;
- version;
- Authentication;
- authorization;
- Tenant model;
- Project model;
- Data owner;
- configuration;
- dependencies;
- tests;
- Security controls;
- monitoring;
- Service-Level Indicators;
- Service-Level Objectives where required;
- capacity;
- rate limits;
- cost ownership;
- backup and recovery;
- runbooks;
- support ownership;
- deprecation policy;
- migration policy.

A service without ownership or a stable contract is not a mature Shared Service.

---

# 18. Ownership Model

Every material capability should identify:

- Business owner;
- Product or Platform owner;
- Technical owner;
- Data owner where applicable;
- Security owner where applicable;
- Quality owner;
- Operations owner;
- Documentation owner;
- recovery owner for critical capabilities.

Ownership should remain visible in an approved capability or service registry.

An unowned critical capability is an Architecture and Governance defect.

---

# 19. Multi-Tenant Architecture

Multi-Tenant Architecture must protect:

- identity;
- authorization;
- data;
- configuration;
- files;
- search indexes;
- logs;
- reports;
- dashboards;
- workflows;
- memory;
- Knowledge;
- AI context;
- usage;
- cost allocation;
- operational evidence.

Tenant context should travel through approved:

- request paths;
- task paths;
- workflow paths;
- Data paths;
- event paths;
- audit paths;
- AI-execution paths.

Required assertion:

```text
Tenant A user
must not access
Tenant B protected data or execution context
```

Cross-Tenant access requires explicit elevated authority and audit evidence.

---

# 20. Multi-Project Architecture

Each Project should define:

- Product;
- Customer where applicable;
- Tenant;
- members;
- roles;
- permissions;
- Data scope;
- tools;
- integrations;
- Knowledge;
- AI context;
- workflows;
- reporting;
- retention;
- classification;
- cost attribution.

Required assertion:

```text
Project A member
must not access
Project B protected data or execution context
without explicit authorization
```

Services and Agents must not silently combine unrelated Project context.

---

# 21. Data Architecture

Every important Data domain should define:

- system of record;
- owner;
- schema;
- classification;
- Tenant boundary;
- Project boundary;
- access rules;
- quality rules;
- lineage;
- retention;
- deletion;
- backup;
- recovery;
- region or residency requirement;
- approved consumers;
- audit requirements.

Direct database coupling across Architecture boundaries should be avoided unless
approved through an ADR.

A shared database does not remove logical ownership boundaries.

---

# 22. API Architecture

APIs should be:

- contract-driven;
- versioned;
- authenticated;
- authorized;
- Tenant-aware;
- Project-aware where applicable;
- idempotent where required;
- observable;
- rate-controlled;
- documented;
- compatible or supported by migration guidance;
- protected against enumeration;
- protected against mass assignment;
- protected against unauthorized Data exposure.

An API must not rely only on UI restrictions for authorization.

---

# 23. Event Architecture

A material event should define:

- name;
- purpose;
- version;
- producer;
- consumers;
- schema;
- Product context;
- Tenant context;
- Project context where applicable;
- ordering assumptions;
- duplication behavior;
- idempotency;
- retry;
- replay;
- retention;
- Security;
- compatibility;
- ownership.

Eventual consistency must be explicit.

Events must not expose sensitive Data to unauthorized consumers.

---

# 24. Integration Architecture

Every material integration should define:

- external system;
- Business owner;
- Technical owner;
- Authentication;
- permissions;
- secrets;
- Data exchanged;
- API or event contracts;
- rate limits;
- retry;
- failure behavior;
- reconciliation;
- monitoring;
- support;
- recovery;
- cost;
- provider dependency;
- exit plan.

Provider lock-in and operational dependency should remain visible.

---

# 25. Security Architecture

Security applies across every layer through:

- identity;
- least privilege;
- deny-by-default authorization;
- Tenant isolation;
- Project isolation;
- secret management;
- encryption;
- secure configuration;
- audit;
- vulnerability management;
- dependency controls;
- software-supply-chain controls;
- secure integration;
- incident response;
- recovery;
- high-risk Human approval.

Security is not a separate optional final layer.

A confirmed Security or isolation failure may block Phase or Product
progression.

---

# 26. Reliability and Failure Isolation

Critical capabilities should define:

- failure modes;
- dependency behavior;
- timeouts;
- retry;
- idempotency;
- circuit breaking where appropriate;
- queue behavior;
- degraded operation;
- rollback;
- failover where applicable;
- backup;
- restore;
- recovery objectives;
- Customer impact;
- communication;
- operational owner.

A shared failure should be designed to limit:

- cross-Tenant impact;
- cross-Project impact;
- cross-Product impact;
- Data corruption;
- cascading failure.

---

# 27. Observability

A Production capability should expose sufficient:

- logs;
- metrics;
- traces;
- audit events;
- health checks;
- alerts;
- dependency signals;
- cost signals;
- usage signals;
- Customer-impact signals.

Observability must preserve:

- Data classification;
- Tenant isolation;
- secret protection;
- privacy;
- access control;
- retention requirements.

Logging sensitive content for convenience is not acceptable.

---

# 28. Deployment Architecture

Deployment should support:

- versioned source;
- reproducible builds where practical;
- controlled environments;
- configuration separation;
- secret separation;
- automated quality gates;
- migration controls;
- Preview validation;
- Production smoke tests;
- controlled exposure;
- rollback;
- post-deployment verification;
- audit evidence.

A successful build, Pull Request, or deployment does not independently prove
Production Operational maturity.

---

# 29. Migration Architecture

A material migration should define:

- exact purpose;
- affected Data;
- affected services;
- preconditions;
- backup requirement;
- migration order;
- application authority;
- verification;
- rollback or compensating recovery;
- failure handling;
- ownership;
- evidence.

An applied migration must not be re-applied based on stale Documentation.

Repository and environment migration state should remain reconcilable.

---

# 30. Backup and Recovery Architecture

Critical capabilities should define:

- backup type;
- backup owner;
- storage location classification;
- encryption;
- frequency;
- retention;
- checksum or integrity validation;
- restore procedure;
- restore-test cadence;
- RTO;
- RPO;
- managed backup status;
- Point-in-Time Recovery status;
- residual Risk.

Manual logical backup and restore proof must not be described as:

- managed backup;
- PITR;
- automatic failover;
- complete enterprise disaster recovery.

---

# 31. Extension and Marketplace Boundary

Future external extensions must use governed:

- contracts;
- permissions;
- packaging;
- versioning;
- provenance;
- Publisher identity;
- Security review;
- Quality review;
- Data review;
- compatibility testing;
- support ownership;
- suspension;
- revocation.

Extensions must not modify Kernel or Product internals through unsupported
methods.

Marketplace implementation remains future work unless separately authorized.

---

# 32. Architecture Decision Records

A material technical decision should create an ADR containing:

- decision ID;
- title;
- status;
- context;
- problem;
- drivers;
- constraints;
- considered options;
- decision;
- consequences;
- Security impact;
- Data impact;
- Product impact;
- operational impact;
- migration impact;
- risks;
- owner;
- reviewers;
- approver;
- date;
- related documents;
- superseding decision where applicable.

ADR history should be preserved.

---

# 33. Architecture Review Triggers

Architecture review is required for:

- a Kernel placement decision;
- a new Shared Platform Service;
- a new Shared Enterprise Service;
- a new critical Data store;
- a new Product boundary;
- a new cross-Product capability;
- a new Tenant-isolation pattern;
- a new Customer extension model;
- a new AI provider;
- a new high-risk AI Tool;
- a new external integration;
- a major migration;
- a destructive Data change;
- a new region;
- a Marketplace or Plugin capability;
- an exception that changes layer boundaries.

---

# 34. Architecture Quality Gate

A capability is Architecture-ready when:

- [ ] Business purpose is documented.
- [ ] Target user is identified.
- [ ] Scope and non-scope are clear.
- [ ] Owner is assigned.
- [ ] Layer placement is justified.
- [ ] Interfaces are defined.
- [ ] Data ownership is defined.
- [ ] Tenant impact is defined.
- [ ] Project impact is defined.
- [ ] Security is reviewed.
- [ ] Quality requirements are defined.
- [ ] Failure behavior is defined.
- [ ] Observability is defined.
- [ ] Recovery is defined where required.
- [ ] Cost is understood or being baselined.
- [ ] Risks are documented.
- [ ] ADR exists where required.
- [ ] Implementation plan exists.
- [ ] Migration plan exists where required.
- [ ] Verification evidence is defined.

---

# 35. Kernel Promotion Gate

A capability may be promoted into the Platform Kernel only when:

- [ ] It is required by nearly every approved Product.
- [ ] It is domain-neutral.
- [ ] At least one real Product need is verified.
- [ ] Broad reuse is demonstrated or strongly evidenced.
- [ ] Its contract is stable.
- [ ] Ownership is assigned.
- [ ] Security review passes.
- [ ] Tenant isolation passes.
- [ ] Project isolation passes where relevant.
- [ ] Tests exist.
- [ ] Compatibility strategy exists.
- [ ] Migration strategy exists.
- [ ] Operational support exists.
- [ ] Cost is understood.
- [ ] Architecture approval is recorded.
- [ ] Founder approval exists where the Platform boundary materially changes.

---

# 36. Architecture Maturity Model

| Maturity | Meaning |
|---|---|
| Proposed | Architecture idea exists |
| Documented | Boundary or design is recorded |
| Reviewed | Required domain review occurred |
| Approved | Architecture authority approved the design |
| Implemented | Code or configuration exists |
| Tested | Required technical tests pass |
| Deployed | Capability is deployed to a named environment |
| Production Verified | Required Production checks pass |
| Reused | More than one approved Product uses the capability |
| Operational | Ownership, monitoring, Support, and recovery operate |
| Mature | Contracts, economics, evolution, and reuse are stable |

Architecture approval does not automatically imply implementation.

Implementation does not automatically imply Production operation.

---

# 37. Architecture Metrics

Useful indicators may include:

- Platform Kernel size and change rate;
- Shared Service reuse;
- duplicate-foundation count;
- Product integration time;
- Customer-specific fork count;
- Architecture review pass rate;
- Architecture-related defects;
- dependency violations;
- Tenant-isolation results;
- Project-isolation results;
- API compatibility;
- shared-service availability;
- recovery-test success;
- stale Architecture exceptions;
- unowned services;
- cost per Product;
- cost per Tenant;
- documented versus verified capabilities.

Metrics should support decisions rather than reward unnecessary Architecture
growth.

---

# 38. Architecture Risks

Material risks include:

- Platform Kernel expansion without evidence;
- Product fragmentation;
- Customer-specific forks;
- Tenant Data leakage;
- Project-context leakage;
- excessive coupling;
- unclear ownership;
- unversioned APIs;
- ungoverned events;
- shared-service failure;
- provider lock-in;
- premature microservices;
- overengineering;
- weak observability;
- untested recovery;
- insecure extensions;
- hidden Customer behavior;
- regional forks;
- AI receiving excessive privilege;
- target Architecture being presented as current implementation.

Every material Risk requires an owner and treatment plan.

---

# 39. Architecture Anti-Patterns

The Architecture must avoid:

- treating every reusable idea as Kernel;
- placing Work, Files, Notifications, Search, or Reporting automatically inside
  the Kernel;
- one database becoming an undocumented integration layer;
- direct Product dependency on another Product’s internals;
- Customer requirements entering shared layers without reuse evidence;
- Industry entities entering the Kernel;
- Shared Services without owners or contracts;
- AI receiving broad privileged access for convenience;
- microservices created for appearance;
- duplicate identity or authorization systems;
- duplicate audit systems;
- uncontrolled duplicate file or notification systems;
- Production claims based on Architecture documents;
- irreversible migrations without recovery;
- regional copies that silently diverge;
- several Industry Products being built in parallel without capacity and
  approval.

---

# 40. Current Architecture Assessment Boundary

Based on the current canonical truth, MianX.ai has reported or implemented
foundations relating to:

- application and Admin experience;
- Supabase and PostgreSQL;
- Authentication;
- Organizations and Tenants;
- Membership and Project scope;
- roles and permissions;
- RLS and migration controls;
- automated testing;
- CI/CD;
- deployment foundations;
- manual recovery proof;
- controlled AI execution code paths.

This does not yet verify:

- a complete Platform Kernel;
- complete Shared Platform Services;
- complete Shared Enterprise Services;
- an operational Enterprise AI Operating System;
- active AI Agents;
- a complete Industry Operating System;
- multi-Product reuse;
- Customer-live Product operation;
- full managed recovery;
- Marketplace or regional Architecture.

The detailed current assessment must remain in
[`CURRENT-STATE.md`](../CURRENT-STATE.md).

---

# 41. Architecture Adoption Criteria

This document becomes the active Strategic Architecture only when:

- [ ] Architecture review is completed.
- [ ] Founder approval is recorded.
- [ ] Exact approved version is recorded.
- [ ] Platform Kernel boundary is approved.
- [ ] Shared Platform Service boundary is approved.
- [ ] Shared Enterprise Service boundary is approved.
- [ ] Governed AI Runtime boundary is approved.
- [ ] Industry Product boundary is approved.
- [ ] Customer Edition boundary is approved.
- [ ] Current implementation is mapped to the layers.
- [ ] Contradictory Architecture summaries are deprecated or linked.
- [ ] Required ADRs are identified.
- [ ] Document Status Registry records approval.
- [ ] Related Company, Governance, AI, and Roadmap documents align.

Until then:

```text
Document Status = Draft

Architecture Approval = Pending

Founder Approval = Pending

Implementation Status = Partial

Deployment Status = Production Verification Pending

Verification Status = Source-Aligned Draft
```

---

# 42. Review and Change Control

Review this document:

- during Product and Architecture Re-Baseline;
- before a major Product;
- before a new Shared Service;
- before changing the Kernel;
- before a new Industry Product;
- before a new AI provider or high-risk Tool;
- before Marketplace work;
- before a new region;
- after a major Architecture, Security, Data, or recovery incident.

A material change requires:

- proposed change;
- reason;
- affected layer;
- affected Products;
- affected Customers;
- Security impact;
- Data impact;
- AI impact;
- operational impact;
- migration impact;
- cost impact;
- Risk assessment;
- ADR where required;
- Architecture approval;
- Founder approval where required;
- version update;
- Registry update.

---

# 43. Related Documents

- [`CURRENT-STATE.md`](../CURRENT-STATE.md)
- [`DOCUMENT-STATUS-REGISTRY.md`](../DOCUMENT-STATUS-REGISTRY.md)
- [`MIANX-AI-MASTER-COMPLETION-PHASES.md`](../MIANX-AI-MASTER-COMPLETION-PHASES.md)
- [`EXECUTION-BOARD.md`](../../execution/EXECUTION-BOARD.md)
- [`ENTERPRISE-PRINCIPLES.md`](../01-governance/ENTERPRISE-PRINCIPLES.md)
- [`VISION-AND-MISSION.md`](../02-company/VISION-AND-MISSION.md)
- [`AI-GOVERNANCE.md`](../44-enterprise-ai/AI-GOVERNANCE.md)
- [`MASTER-ROADMAP-SUMMARY.md`](../48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md)

---

# 44. Current Document Decision

```text
DOCUMENT_STATUS=DRAFT

ARCHITECTURE_APPROVAL=PENDING

FOUNDER_APPROVAL=PENDING

AUTHORITY_TYPE=PROPOSED_STRATEGIC_ARCHITECTURE

IMPLEMENTATION_STATUS=PARTIAL

DEPLOYMENT_STATUS=PRODUCTION_VERIFICATION_PENDING

VERIFICATION_STATUS=SOURCE_ALIGNED_DRAFT

FULL_PLATFORM_KERNEL_VERIFIED=NO

FULL_MIANX_CORE_VERIFIED=NO

ENTERPRISE_AI_OS_OPERATIONAL=NO
```

---

# 45. Final Architecture Statement

```text
MianX.ai will use a small, stable Platform Kernel
for universal technical contracts.

Reusable technical and workflow capabilities
will operate as Shared Platform Services.

Reusable business capabilities
will operate as Shared Enterprise Services.

AI will operate through a governed Runtime
with identity, permissions, evidence,
cost control, Human approval, and suspension.

Industry-specific entities and rules
will remain inside Industry Operating Systems.

Customer variation will use configuration
and approved isolated extensions.

Capabilities will move into shared layers
only after real Product need and reuse evidence.

Target Architecture must never be presented
as current implementation without verification.
```

---

# 46. Next Document

After this file is saved and reviewed, the next document to edit is:

```text
doc/44-enterprise-ai/AI-GOVERNANCE.md
```

That document must:

- preserve allocated, active, and live-tested Agent counts as zero;
- distinguish roles, capacity seats, registered Agents, allocated Agents, active
  Agents, and live-tested Agents;
- define model, provider, prompt, Tool, memory, Knowledge, cost, evidence, Human
  approval, and suspension controls;
- prohibit self-assigned authority;
- define Tenant and Project isolation for AI execution;
- avoid presenting the Enterprise AI Operating System as operational;
- use correct relative links;
- remain Draft until Founder approval.

---

# Change Log

| Version | Date | Change |
|---|---|---|
| 0.1.0 | 2026-08-04 | Initial consolidated Core Architecture draft |
| 1.0.0 | 2026-08-04 | Corrected canonical paths and current Phase terminology; reduced the Platform Kernel boundary; moved Work, Files, Notifications, Search, and Reporting into Shared Platform Services; separated Shared Enterprise Services, governed AI Runtime, Industry Products, Customer Editions, and delivery channels; added capability-promotion, maturity, Security, recovery, and Architecture approval gates |