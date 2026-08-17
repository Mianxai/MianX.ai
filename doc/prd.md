---
document_id: PRODUCT-PRD-001
title: MianX.ai Product Requirements Document
subtitle: Product and Architecture Re-Baseline for the First Industry Operating System
version: 1.0.0
status: Draft — Locked Until Phase 1 Completion
authority_type: Proposed Product Specification
classification: Public Repository
owner: MianX.ai Founder
maintainer: MianX.ai Product Owner
approvers:
  - MianX.ai Founder
reviewers:
  - Product Owner
  - Architecture Owner
  - Security Owner
  - Data Owner
  - Quality Owner
  - Operations Owner
  - AI Governance Owner
created: 2026-08-04
updated: 2026-08-04
approval_status: Pending
product_selection_status: Not Selected
implementation_status: Discovery Not Started
deployment_status: Not Applicable
verification_status: Source-Aligned Draft
current_phase: Phase 1 — Platform Foundation
phase_status: ready_for_final_verification
phase_1_complete: false
founder_phase_1_signoff: not_approved
phase_2_started: false
rebaseline_authorized: false
first_industry_product_selected: false
restaurantos_status: Candidate — Not Selected
poultryos_status: Candidate — Not Selected
canonical_scope: Product identity, first Industry Product selection, vertical-slice requirements, Customer value, Product boundaries, Product evidence, and Phase 2 entry requirements
canonical_current_truth: ./CURRENT-STATE.md
canonical_phase_framework: ./MIANX-AI-MASTER-COMPLETION-PHASES.md
canonical_architecture: ./31-enterprise-architecture/CORE-ARCHITECTURE.md
canonical_ai_governance: ./44-enterprise-ai/AI-GOVERNANCE.md
related_documents:
  - ./CURRENT-STATE.md
  - ./DOCUMENT-STATUS-REGISTRY.md
  - ./CANONICAL-DOCUMENT-MAP.md
  - ./MIANX-AI-MASTER-COMPLETION-PHASES.md
  - ../execution/EXECUTION-BOARD.md
  - ./01-governance/ENTERPRISE-PRINCIPLES.md
  - ./02-company/VISION-AND-MISSION.md
  - ./31-enterprise-architecture/CORE-ARCHITECTURE.md
  - ./44-enterprise-ai/AI-GOVERNANCE.md
  - ./48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md
  - ./product-roadmap.md
---

# MianX.ai Product Requirements Document

> [!IMPORTANT]
> This document is a Product and Architecture Re-Baseline Draft.
>
> It does not authorize Phase 2, select RestaurantOS or PoultryOS, approve a
> Customer commitment, activate AI Agents, authorize provider-backed AI
> execution, or prove that an Industry Operating System is implemented.
>
> Product Re-Baseline work remains locked until:
>
> - Phase 1 mandatory gates pass;
> - Founder Phase 1 sign-off is recorded;
> - approved Phase 1 closeout work is merged;
> - post-merge verification passes;
> - the Founder separately authorizes Product and Architecture Re-Baseline.
>
> Current implementation and operational truth is maintained in:
>
> [`CURRENT-STATE.md`](./CURRENT-STATE.md)

---

# 1. Purpose

This Product Requirements Document defines the controlled process and minimum
requirements for selecting, designing, validating, building, and evaluating the
first MianX.ai Industry Operating System vertical slice.

It establishes:

- MianX.ai Product identity;
- target Customer and user requirements;
- first Industry Product selection criteria;
- Product discovery requirements;
- vertical-slice scope;
- Platform and Product boundaries;
- functional requirement categories;
- Security and Data requirements;
- operational requirements;
- Customer-outcome requirements;
- commercial-validation requirements;
- AI boundaries;
- Product evidence;
- acceptance criteria;
- Phase 2 entry and exit conditions;
- Founder-controlled decisions.

This document must not become a complete ERP specification before the first
real Product workflow is validated.

---

# 2. Current-State Boundary

Current recorded status remains:

```text
Current Phase = Phase 1 — Platform Foundation

Phase 1 Status = READY_FOR_FINAL_VERIFICATION

Phase 1 Complete = NO

Founder Phase 1 Sign-Off = NOT APPROVED

Phase 2 Started = NO

Product and Architecture Re-Baseline = LOCKED

First Industry Product Selected = NO

RestaurantOS Selected = NO

PoultryOS Selected = NO

First Product Vertical Slice Approved = NO

Enterprise AI Operating System Operational = NO

Allocated AI Agents = 0

Active AI Agents = 0

Live-Tested AI Agents = 0

Genuine Provider Generation Calls = 0
```

This PRD must not be used to change those statuses.

---

# 3. Product Identity

MianX.ai is a Product Company building secure, configurable, measurable, and
AI-assisted Industry Operating Systems on reusable Platform foundations.

The Product model is:

```text
MianX.ai Company and Governance

↓

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

MianX.ai is not intended to be:

- only a website-development business;
- a generic software outsourcing agency;
- a collection of unrelated applications;
- a generic chatbot provider;
- a Customer-specific code-fork business;
- one giant universal ERP;
- an ungoverned AI Workforce;
- a Product defined only by Documentation volume.

---

# 4. Product Vision

> **Create useful Industry Operating Systems that connect real business
> workflows, users, Data, controls, reporting, and governed intelligence through
> one secure and reusable MianX.ai Platform.**

The Product Vision is long-term direction.

It is not current implementation evidence.

---

# 5. Product Mission

The Product Mission is to help approved businesses:

- operate daily workflows;
- reduce repetitive manual work;
- improve visibility;
- improve Data accuracy;
- protect access;
- establish accountability;
- improve reporting;
- support decisions;
- control business processes;
- measure outcomes;
- scale across locations;
- preserve organizational Knowledge;
- use AI safely where evidence supports it.

---

# 6. Product Problem

Many businesses operate through disconnected combinations of:

- paper records;
- spreadsheets;
- messaging applications;
- isolated POS systems;
- manual approvals;
- separate accounting records;
- verbal instructions;
- disconnected dashboards;
- repeated Data entry;
- incomplete operational reports;
- undocumented workflows;
- individual employee memory.

This may create:

- delayed decisions;
- inconsistent records;
- limited accountability;
- duplicated work;
- weak permissions;
- low operational visibility;
- difficult branch coordination;
- inaccurate reporting;
- avoidable errors;
- difficult Customer Support;
- dependency on individual people;
- limited reusable business Knowledge.

The first MianX.ai Product must address a narrow verified portion of this
problem rather than attempting to solve every enterprise problem at once.

---

# 7. Product Hypothesis

The primary Product hypothesis is:

> **A secure, configurable, Industry-specific vertical slice built on reusable
> MianX.ai Platform foundations can produce measurable operational value for a
> real business without requiring a complete ERP or a fully autonomous AI
> Workforce.**

This hypothesis must be validated through real-user evidence.

---

# 8. Target Product Model

The first Product should combine:

```text
One Approved Industry

+

One Real or Representative Business

+

One Defined Primary User Group

+

Three to Five Connected Workflows

+

One Measurable Operational Outcome

+

Reusable Platform Foundations

+

Industry-Specific Rules

+

Customer Configuration

=

First Industry Product Vertical Slice
```

---

# 9. Product Candidates

Current Product candidates include:

```text
RestaurantOS
```

and:

```text
PoultryOS
```

Their presence in existing Documentation does not mean either Product has been
selected.

Additional candidates require a separate Founder-approved discovery decision.

---

# 10. Candidate Status

| Candidate | Current classification | Selection status | Production status |
|---|---|---|---|
| RestaurantOS | Proposed Industry Product | Not selected | Not verified Production Operational |
| PoultryOS | Proposed Industry Product | Not selected | Not verified Production Operational |

No candidate may be described as the first official Industry Product until the
selection decision is approved and recorded.

---

# 11. First Industry Product Selection Criteria

The Founder, Product Owner, and Architecture Owner should compare each candidate
using current evidence.

| Criterion | Required question |
|---|---|
| Business access | Is a real business owner available? |
| Workflow access | Can the team observe real daily operations? |
| User access | Can real users participate in testing? |
| Data access | Is safe representative or real Data available? |
| Problem clarity | Is the operational problem specific and verified? |
| Workflow connectivity | Can three to five connected workflows be defined? |
| Outcome measurability | Can value be measured before and after? |
| Commercial potential | Is a Pilot, design-partner, or payment path realistic? |
| Implementation complexity | Can a useful slice be built with current capacity? |
| Regulatory complexity | Are legal and compliance requirements manageable? |
| Platform reuse | Can existing foundations be reused meaningfully? |
| Supportability | Can the Product be supported after delivery? |
| Recovery | Can required Data and workflows be recovered? |
| Expansion potential | Can the Product grow without immediate redesign? |
| Learning value | Will the Product improve reusable MianX.ai Knowledge? |

---

# 12. Candidate Evaluation Record

Each Product candidate should receive a record using:

```text
Candidate:
Industry:
Business Owner:
Target Customer:
Target Users:
Observed Workflows:
Current Problems:
Available Data:
Expected Outcome:
Measurement Method:
Pilot Opportunity:
Commercial Potential:
Regulatory Risk:
Security Risk:
Implementation Complexity:
Support Complexity:
Recovery Requirements:
Platform Capabilities Reused:
Industry Capabilities Required:
Known Unknowns:
Recommendation:
Reviewers:
Founder Decision:
```

---

# 13. Product Selection Gate

The first Industry Product may be selected only when:

- [ ] At least one real or representative business is identified.
- [ ] Primary users are identified.
- [ ] Current workflows are observed or reliably documented.
- [ ] Three to five connected workflow candidates exist.
- [ ] The primary problem is supported by evidence.
- [ ] The expected outcome is measurable.
- [ ] Required Data is available legally and safely.
- [ ] Current capacity is sufficient.
- [ ] Security complexity is understood.
- [ ] Regulatory complexity is understood.
- [ ] Support responsibility is possible.
- [ ] Recovery requirements are understood.
- [ ] Product and Architecture boundaries are reviewed.
- [ ] Founder selection approval is recorded.

---

# 14. Target Users

The final user set depends on the selected Industry.

Potential user categories include:

## Business Owner or Executive

Needs:

- business visibility;
- key outcomes;
- financial or operational summaries;
- exception awareness;
- controlled access;
- multi-location overview.

## Operations Manager

Needs:

- workflow control;
- assignments;
- daily status;
- approvals;
- exception management;
- performance visibility.

## Frontline Operator

Needs:

- fast Data entry;
- clear current tasks;
- minimal complexity;
- mobile or workstation access;
- error prevention;
- offline or degraded behavior where required.

## Finance or Accounts User

Needs:

- controlled financial records;
- settlement visibility;
- reconciliation;
- approved reports;
- auditability.

## Platform or Product Administrator

Needs:

- user management;
- roles;
- permissions;
- Tenant configuration;
- branch configuration;
- audit;
- Support tools.

## Customer Support User

Needs:

- Customer context;
- issue tracking;
- escalation;
- history;
- resolution evidence.

---

# 15. Product Discovery Requirements

Before implementation, Product discovery must establish:

- target Industry;
- target business type;
- target Customer;
- primary users;
- secondary users;
- daily workflows;
- workflow frequency;
- workflow problems;
- current tools;
- current Data;
- Data quality;
- decision points;
- approvals;
- exceptions;
- reports;
- integrations;
- regulatory obligations;
- Security expectations;
- recovery expectations;
- baseline performance;
- baseline operating cost;
- success metrics.

Discovery output must be reviewed by a real domain participant where practical.

---

# 16. Workflow Selection Standard

The initial vertical slice should contain three to five connected workflows.

A workflow is suitable when it:

- occurs regularly;
- has a clear user;
- has a clear start;
- has a clear completion state;
- creates or updates important Data;
- connects to another workflow;
- has a measurable problem;
- can produce measurable value;
- can be tested with real or representative users;
- does not require complete enterprise scope.

---

# 17. Example RestaurantOS Vertical Slice

A possible RestaurantOS vertical slice may include:

```text
Order Received

↓

Order Validated

↓

Kitchen Processing

↓

Order Status Updated

↓

Settlement Recorded

↓

Daily Operational Report
```

Potential supporting requirements:

- branch context;
- menu or item reference;
- user roles;
- order status;
- kitchen status;
- settlement state;
- audit;
- daily reporting.

This is an example only.

It is not approved scope.

---

# 18. Example PoultryOS Vertical Slice

A possible PoultryOS vertical slice may include:

```text
Flock or Purchase Setup

↓

Daily Feed, Weight, and Mortality Entry

↓

Stock or Flock Position

↓

Sale and Payment Record

↓

Profit and Operational Report
```

Potential supporting requirements:

- farm or location context;
- flock identity;
- daily records;
- inventory or stock;
- sale;
- payment;
- mortality;
- reporting;
- audit.

This is an example only.

It is not approved scope.

---

# 19. First Vertical Slice Scope Standard

The approved first vertical slice should include only:

- essential target users;
- essential roles;
- three to five connected workflows;
- essential entities;
- required validation;
- required permissions;
- required reports;
- required audit;
- required configuration;
- required recovery;
- required onboarding;
- required Support evidence;
- required Product analytics.

Anything not required for the verified workflow outcome should be deferred.

---

# 20. Explicit Non-Goals

The first vertical slice should not attempt to include:

- complete Industry ERP;
- every user role;
- every possible workflow;
- every report;
- every integration;
- complete CRM;
- complete finance;
- complete HR;
- complete procurement;
- complete inventory;
- complete billing;
- complete mobile application;
- Marketplace;
- Plugin ecosystem;
- regional deployment;
- global deployment;
- Multi-Agent autonomous workforce;
- hundreds of AI Agents;
- high-risk autonomous decision-making;
- unlimited Customer customization;
- Customer-specific Platform forks.

---

# 21. Architecture Boundary

The first Product must follow:

[`CORE-ARCHITECTURE.md`](./31-enterprise-architecture/CORE-ARCHITECTURE.md)

The Product must distinguish:

```text
Platform Kernel

Shared Platform Service

Shared Enterprise Service

Governed AI Runtime

Industry Product Capability

Customer Configuration

Delivery Channel
```

---

# 22. Platform Kernel Requirements

The Product may rely on verified Kernel foundations such as:

- Authentication;
- users;
- Organizations;
- Tenants;
- Memberships;
- roles;
- permissions;
- policy enforcement;
- configuration foundations;
- feature flags;
- audit foundations;
- API standards;
- event standards;
- Security foundations;
- observability foundations;
- usage and cost hooks.

The PRD must not assume the full Kernel is complete.

Each dependency must be checked against current implementation evidence.

---

# 23. Shared Platform Service Requirements

The Product may require Shared Platform Services such as:

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
- scheduling;
- integration adapters.

These are not automatically Platform Kernel capabilities.

A Shared Platform Service should be introduced only when required by approved
Product scope.

---

# 24. Shared Enterprise Service Requirements

The Product may require limited reusable business capabilities such as:

- CRM foundations;
- billing foundations;
- payment integration;
- finance foundations;
- procurement;
- inventory foundations;
- Customer onboarding;
- Support;
- Customer Success;
- business analytics.

A complete Shared Enterprise Platform is not required before the first Product
vertical slice.

---

# 25. Industry Product Requirements

The selected Industry Product should own its:

- terminology;
- entities;
- workflows;
- rules;
- calculations;
- permissions;
- reports;
- integrations;
- operational controls;
- Industry AI behavior;
- Product user experience;
- Customer outcomes.

Industry-specific behavior must not be pushed into the Platform Kernel for
convenience.

---

# 26. Customer Configuration Requirements

Customer variation should normally use:

- Tenant configuration;
- branch or location configuration;
- user roles;
- permissions;
- Product settings;
- workflow rules;
- templates;
- feature flags;
- Data mappings;
- approved integrations;
- approved isolated extensions.

A Customer Edition must not create:

- a separate Authentication system;
- a separate Tenant model;
- a separate permission system;
- a separate audit foundation;
- an unsupported Platform fork.

---

# 27. Functional Requirement Format

Every approved functional requirement should use:

```text
Requirement ID:
Title:
User:
Problem:
Trigger:
Preconditions:
Main Flow:
Alternative Flow:
Failure Flow:
Data Created or Updated:
Permissions:
Audit Requirement:
Notification Requirement:
Report Impact:
Acceptance Criteria:
Evidence:
Priority:
Owner:
Status:
```

---

# 28. Functional Requirement Categories

The initial Product specification should define requirements only for the
selected vertical slice.

Potential categories include:

## Identity and Access

- user sign-in;
- session handling;
- role assignment;
- permission enforcement;
- Tenant access;
- branch access;
- Project access where applicable.

## Business Setup

- business profile;
- branch or location;
- Industry configuration;
- Product settings;
- user invitations;
- role configuration.

## Operational Records

- creation;
- validation;
- update;
- status transition;
- assignment;
- approval;
- cancellation;
- audit.

## Reporting

- operational summary;
- exception report;
- daily report;
- user-specific report;
- branch report;
- export where approved.

## Administration

- user management;
- Membership;
- roles;
- permissions;
- configuration;
- audit review;
- Support access.

## Integration

- approved third-party system;
- input validation;
- reconciliation;
- failure handling;
- retry;
- audit;
- secret protection.

---

# 29. Requirement Priorities

| Priority | Meaning |
|---|---|
| `P0` | Required for Security, isolation, Data integrity, or basic workflow |
| `P1` | Required for the vertical-slice outcome |
| `P2` | Important but can follow the first controlled Pilot |
| `P3` | Future enhancement |
| `LOCKED` | Must not be implemented without separate approval |
| `OUT_OF_SCOPE` | Explicitly excluded from the current Product scope |

---

# 30. User Experience Requirements

The first Product should be:

- understandable to the intended user;
- suitable for expected devices;
- responsive;
- accessible where required;
- clear about current state;
- clear about errors;
- efficient for frequent workflows;
- resistant to accidental destructive action;
- consistent across related screens;
- usable without specialist technical Knowledge.

User experience must be tested with real or representative users.

---

# 31. Security Requirements

The Product must support:

- secure Authentication;
- deny-by-default authorization;
- least privilege;
- Tenant isolation;
- branch or location isolation where required;
- Project isolation where applicable;
- secure session handling;
- server-side authorization;
- sensitive-Data protection;
- secret protection;
- secure defaults;
- audit of privileged actions;
- abuse protection;
- input validation;
- safe error handling;
- controlled Support access;
- incident response.

Required assertion:

```text
Tenant A user
must not access
Tenant B protected Data
```

Required assertion:

```text
Normal Product user
must not receive
Platform administrator authority
```

---

# 32. Data Requirements

Every important Product entity should define:

- Data owner;
- business purpose;
- source;
- classification;
- Tenant;
- branch or location;
- Project where applicable;
- validation;
- required fields;
- optional fields;
- status model;
- relationships;
- access rules;
- retention;
- deletion;
- audit;
- backup;
- recovery;
- reporting use.

The Product must not collect Data merely because it may be useful later.

---

# 33. Data Quality Requirements

Product Data should be:

- valid;
- complete for required workflow use;
- consistent;
- attributable;
- timestamped;
- permission-controlled;
- auditable;
- recoverable where required;
- protected from unauthorized modification.

Data-quality rules should be linked to specific workflow and reporting needs.

---

# 34. Tenant and Customer Isolation

The Product must preserve separation across:

- users;
- Memberships;
- roles;
- Data;
- files;
- reports;
- search;
- configuration;
- workflows;
- integrations;
- logs;
- AI context;
- memory;
- Knowledge;
- evidence;
- cost attribution.

Cross-Tenant access requires explicit authority and audit.

---

# 35. Audit Requirements

Important events should record:

- actor;
- action;
- target;
- previous state where appropriate;
- new state where appropriate;
- Tenant;
- Product;
- Project where applicable;
- timestamp;
- source;
- correlation identifier;
- result;
- privileged-access reason where applicable.

Audit evidence must not expose unnecessary sensitive Data.

---

# 36. Reporting Requirements

Every approved report should define:

- report name;
- target user;
- business question;
- Data source;
- calculation rules;
- filters;
- Tenant scope;
- branch scope;
- access rules;
- freshness;
- export behavior;
- verification method;
- owner.

A report is not complete only because a dashboard screen exists.

Its calculations and Data must be verified.

---

# 37. Notification Requirements

Notifications should be introduced only when they support the selected workflow.

Each notification should define:

- trigger;
- recipient;
- channel;
- message purpose;
- Data classification;
- retry behavior;
- failure behavior;
- preference or opt-out;
- audit requirement.

Notifications should not expose sensitive business Data unnecessarily.

---

# 38. Integration Requirements

Every approved integration should define:

- external system;
- owner;
- business purpose;
- Authentication;
- credentials;
- Data exchanged;
- Tenant scope;
- rate limits;
- retry;
- failure handling;
- reconciliation;
- monitoring;
- audit;
- Support;
- exit plan.

An integration must not receive unrestricted database access.

---

# 39. AI Requirements

AI is not required for the first Product vertical slice unless separately
approved.

Potential future low-Risk Product uses may include:

- daily report summary;
- report explanation;
- anomaly suggestion;
- Support classification;
- controlled draft recommendation.

AI must not independently:

- transfer money;
- approve a payment;
- create a legal commitment;
- delete Production Data;
- change permissions;
- change Tenant Membership;
- deploy to Production;
- approve its own output;
- make a Customer commitment;
- activate another Agent;
- start an unlimited task loop.

---

# 40. AI Current Boundary

Current AI status remains:

```text
Capacity or Registered Seats = 445

Allocated Agents = 0

Active Agents = 0

Live-Tested Agents = 0

Genuine Provider Generation Calls = 0

Production Operational AI Workflows = 0
```

AI capability may be introduced only through the controlled AI Runtime Phase and
approved AI Governance.

Canonical AI standard:

[`AI-GOVERNANCE.md`](./44-enterprise-ai/AI-GOVERNANCE.md)

---

# 41. Performance Requirements

Before Pilot approval, define appropriate targets for:

- page or screen response;
- API response;
- workflow completion;
- report generation;
- search;
- concurrent users;
- Data volume;
- background jobs;
- integration latency;
- notification delivery.

Targets must be based on expected usage rather than unsupported enterprise-scale
assumptions.

---

# 42. Reliability Requirements

The Product should define:

- expected availability;
- critical workflows;
- acceptable degraded behavior;
- timeout behavior;
- retry behavior;
- duplicate-request handling;
- failed-job handling;
- Data consistency;
- dependency failure;
- operational alerts;
- incident ownership.

The first vertical slice does not require theoretical global-scale
infrastructure.

---

# 43. Backup and Recovery Requirements

For critical Product Data, define:

- backup method;
- backup owner;
- frequency;
- retention;
- secure storage;
- integrity validation;
- restore procedure;
- restore-test cadence;
- RTO;
- RPO;
- known limitations.

Backup existence does not prove recoverability.

Restore evidence is required for recovery claims.

---

# 44. Observability Requirements

The Product should expose sufficient:

- logs;
- metrics;
- traces where required;
- audit events;
- health indicators;
- workflow outcomes;
- errors;
- dependency failures;
- usage;
- cost;
- Customer-impact indicators.

Observability must preserve privacy and Tenant isolation.

---

# 45. Support Requirements

Before a real Pilot, define:

- Product owner;
- Support owner;
- contact path;
- issue severity;
- response expectations;
- escalation;
- known limitations;
- workaround process;
- incident process;
- Customer communication;
- feedback capture;
- defect ownership.

A Product is not ready for real users without Support responsibility.

---

# 46. Customer Onboarding Requirements

Customer onboarding should define:

- Customer approval;
- Tenant creation;
- Product Edition;
- branch or location setup;
- user invitation;
- roles;
- permissions;
- configuration;
- Data import;
- integration setup;
- training;
- acceptance;
- Support handoff;
- recovery expectations.

Onboarding should become repeatable before Product scale is claimed.

---

# 47. Commercial Validation

The first Product should test whether the target Customer values the outcome.

Possible commercial evidence includes:

- written Pilot interest;
- paid setup;
- paid Pilot;
- subscription commitment;
- design-partner agreement;
- Letter of Intent;
- approved budget;
- willingness-to-pay interview;
- renewal or expansion interest.

A verbal positive reaction alone is not sufficient commercial validation.

---

# 48. Customer and Design-Partner Boundary

A Customer, design partner, launch partner, or Pilot participant must not be
publicly named without appropriate permission.

A potential Customer relationship should define:

- relationship type;
- scope;
- Data access;
- confidentiality;
- responsibilities;
- feedback rights;
- Product rights;
- commercial terms;
- public-reference permission;
- exit conditions.

---

# 49. Product Success Metrics

## Customer Outcome

- time saved;
- error reduction;
- workflow completion;
- visibility improvement;
- report accuracy;
- operational control;
- user satisfaction.

## Product Usage

- active users;
- workflow usage;
- completion rate;
- repeat usage;
- feature adoption;
- retention.

## Quality

- defect rate;
- failed workflow rate;
- correction rate;
- Support issues;
- Data-quality issues;
- Security findings.

## Operations

- availability;
- response time;
- incident rate;
- recovery result;
- Support response;
- onboarding time.

## Economics

- setup cost;
- infrastructure cost;
- Support cost;
- Product Margin;
- Customer acquisition cost where measurable;
- willingness to pay;
- recurring revenue potential.

## Platform Learning

- Kernel capabilities reused;
- Shared Services reused;
- duplicate foundations avoided;
- Industry logic correctly isolated;
- Customer configuration reused;
- verified Knowledge captured.

---

# 50. Product Evidence Record

Each Product milestone should record:

```text
Product:
Version:
Customer or Test Context:
Target User:
Workflow:
Baseline:
Expected Outcome:
Implemented Scope:
Excluded Scope:
Repository:
Commit:
Environment:
Tests:
Security Evidence:
Data Evidence:
Recovery Evidence:
Usage Evidence:
Outcome Evidence:
Support Evidence:
Known Limitations:
Reviewer:
Founder Decision:
```

---

# 51. Vertical Slice Acceptance Criteria

The first Product vertical slice may be accepted only when:

- [ ] Target Industry is approved.
- [ ] Target Customer or representative context exists.
- [ ] Primary users are identified.
- [ ] Three to five connected workflows are approved.
- [ ] Scope and non-scope are recorded.
- [ ] Product entities are defined.
- [ ] Roles and permissions are defined.
- [ ] Tenant isolation passes.
- [ ] Required Product authorization passes.
- [ ] Workflow tests pass.
- [ ] Data-quality checks pass.
- [ ] Required reports are verified.
- [ ] Audit requirements pass.
- [ ] Backup and restore requirements pass.
- [ ] Monitoring is active.
- [ ] Support owner exists.
- [ ] Real-user or representative-user test occurs.
- [ ] Product usage is measurable.
- [ ] Customer or enterprise outcome is measured.
- [ ] Known limitations are recorded.
- [ ] Founder Product acceptance is recorded.

---

# 52. Phase 2 Entry Gate

Phase 2 may begin only when:

- [ ] Phase 1 is complete.
- [ ] Founder Phase 1 sign-off is recorded.
- [ ] Phase 1 closeout is merged.
- [ ] Post-merge verification passes.
- [ ] Product and Architecture Re-Baseline is authorized.
- [ ] First Industry Product is selected.
- [ ] Target Customer or user context exists.
- [ ] Vertical-slice workflows are approved.
- [ ] Product outcome is approved.
- [ ] Architecture boundaries are approved.
- [ ] Owners are assigned.
- [ ] Capacity exists.
- [ ] Security requirements exist.
- [ ] Data requirements exist.
- [ ] Quality requirements exist.
- [ ] Operational requirements exist.
- [ ] Recovery requirements exist.
- [ ] Completion evidence is defined.
- [ ] Founder Phase 2 authorization is recorded.

---

# 53. Phase 2 Exit Gate

Phase 2 may close only when:

- [ ] Approved workflows operate end to end.
- [ ] Required Product roles operate correctly.
- [ ] Tenant isolation passes.
- [ ] Product permissions pass.
- [ ] Data integrity passes.
- [ ] Reports are verified.
- [ ] Required integrations are verified.
- [ ] Support ownership operates.
- [ ] Backup and recovery are tested.
- [ ] Product analytics operate.
- [ ] Real-user testing is completed.
- [ ] Product outcome is measured.
- [ ] Reusable Platform capabilities are recorded.
- [ ] Industry-specific logic remains isolated.
- [ ] Customer-specific variation remains controlled.
- [ ] Open Risks are closed or accepted.
- [ ] Documentation is synchronized.
- [ ] Founder Phase 2 sign-off is recorded.

---

# 54. Product Change Control

A material Product change should define:

```text
Change:
Reason:
Customer Problem:
Affected Users:
Affected Workflows:
Affected Entities:
Architecture Impact:
Security Impact:
Data Impact:
AI Impact:
Operational Impact:
Recovery Impact:
Commercial Impact:
Scope Added:
Scope Removed:
Evidence:
Reviewer:
Approver:
```

Material scope must not expand silently during implementation.

---

# 55. Product Decision Log

The following decisions remain pending:

| Decision | Current status | Required authority |
|---|---|---|
| First Industry Product | Pending | Founder |
| Target Customer or design partner | Pending | Founder and Product Owner |
| First vertical-slice workflows | Pending | Founder and Product Owner |
| Product outcome | Pending | Founder and Product Owner |
| Platform Kernel V1 dependency | Pending | Architecture and Founder |
| Shared Service dependencies | Pending | Product and Architecture |
| Customer Edition boundary | Pending | Product and Architecture |
| Phase 2 start | Locked | Founder |
| Controlled AI use case | Locked | Founder and AI Governance |
| Commercial Pilot terms | Pending after selection | Founder |

---

# 56. Product Risks

| Risk | Required control |
|---|---|
| Product selected without real evidence | Candidate evaluation and Founder gate |
| Complete ERP scope | Three-to-five-workflow limit |
| Core built from assumptions | Domain-Anchored Product evidence |
| Industry logic enters Kernel | Architecture review |
| Customer requirements create a fork | Configuration-first model |
| No real user access | Do not start Build Phase |
| No measurable outcome | Define baseline and target |
| Weak Data | Data discovery and quality controls |
| Tenant leakage | Isolation tests |
| Product launched without Support | Support owner gate |
| Backup mistaken for recovery | Restore evidence |
| AI used as a Product shortcut | AI Governance and Phase lock |
| Fixed schedule overrides Quality | Evidence-based gates |
| Product success measured through features | Customer-outcome metrics |
| Multiple Products started in parallel | One first-Product rule |

---

# 57. Product Anti-Patterns

MianX.ai should avoid:

- calling a collection of nine systems V1;
- building Founder Dashboard, CRM, AI Workforce, memory, Knowledge, tasks,
  projects, and decision engines simultaneously;
- selecting RestaurantOS only because it appears first in an old Roadmap;
- selecting PoultryOS only because existing relationships exist;
- beginning several Industry Products at once;
- building complete ERP scope before one workflow works;
- placing every reusable idea in the Kernel;
- treating a dashboard as a complete Product;
- treating AI chat as the main Product;
- treating Documentation as Product validation;
- treating code as Customer value;
- claiming Product launch without real users;
- claiming commercial validation without evidence;
- creating permanent Customer-specific forks;
- adding AI before Product workflow value is understood.

---

# 58. PRD Adoption Criteria

This PRD becomes an approved Product specification only when:

- [ ] Phase 1 is complete.
- [ ] Founder Phase 1 sign-off is recorded.
- [ ] Re-Baseline work is authorized.
- [ ] Target Industry is selected.
- [ ] Target Customer or representative context is identified.
- [ ] Target users are confirmed.
- [ ] Three to five workflows are approved.
- [ ] Product outcome is approved.
- [ ] Architecture boundary is approved.
- [ ] Security review is completed.
- [ ] Data review is completed.
- [ ] Quality review is completed.
- [ ] Operations review is completed.
- [ ] Recovery requirements are approved.
- [ ] Product owner is assigned.
- [ ] Founder Product approval is recorded.
- [ ] Document Status Registry is updated.
- [ ] Product Roadmap is updated.

Until then:

```text
Document Status = Draft

Product Selection = Not Selected

Implementation Status = Discovery Not Started

Phase 2 = Not Started

Re-Baseline = Locked
```

---

# 59. Review and Maintenance

Review this PRD:

- during Product and Architecture Re-Baseline;
- after target Customer discovery;
- after workflow discovery;
- before Phase 2 authorization;
- after Pilot feedback;
- after a material Product-scope change;
- before Production promotion;
- before a second Industry Product;
- after a major Product, Security, Data, or operational incident.

---

# 60. Related Documents

- [`CURRENT-STATE.md`](./CURRENT-STATE.md)
- [`DOCUMENT-STATUS-REGISTRY.md`](./DOCUMENT-STATUS-REGISTRY.md)
- [`CANONICAL-DOCUMENT-MAP.md`](./CANONICAL-DOCUMENT-MAP.md)
- [`MIANX-AI-MASTER-COMPLETION-PHASES.md`](./MIANX-AI-MASTER-COMPLETION-PHASES.md)
- [`EXECUTION-BOARD.md`](../execution/EXECUTION-BOARD.md)
- [`ENTERPRISE-PRINCIPLES.md`](./01-governance/ENTERPRISE-PRINCIPLES.md)
- [`VISION-AND-MISSION.md`](./02-company/VISION-AND-MISSION.md)
- [`CORE-ARCHITECTURE.md`](./31-enterprise-architecture/CORE-ARCHITECTURE.md)
- [`AI-GOVERNANCE.md`](./44-enterprise-ai/AI-GOVERNANCE.md)
- [`MASTER-ROADMAP-SUMMARY.md`](./48-enterprise-roadmap/MASTER-ROADMAP-SUMMARY.md)
- [`product-roadmap.md`](./product-roadmap.md)

---

# 61. Current Document Decision

```text
DOCUMENT_STATUS=DRAFT_LOCKED

FOUNDER_APPROVAL=PENDING

PRODUCT_SELECTION_STATUS=NOT_SELECTED

FIRST_INDUSTRY_PRODUCT=UNDECIDED

RESTAURANTOS_STATUS=CANDIDATE_NOT_SELECTED

POULTRYOS_STATUS=CANDIDATE_NOT_SELECTED

PRODUCT_REBASELINE_AUTHORIZED=NO

PHASE_2_STARTED=NO

IMPLEMENTATION_STATUS=DISCOVERY_NOT_STARTED

AI_ACTIVATION_AUTHORIZED=NO

COMPLETE_ERP_SCOPE=NO

CUSTOMER_SPECIFIC_PLATFORM_FORK=NO
```

---

# 62. Final Product Statement

```text
MianX.ai will not begin by building
every enterprise system at once.

It will select one Industry Product
through real Customer, workflow,
Data, capacity, Risk, and outcome evidence.

The first Product will contain
three to five connected workflows.

It will reuse verified Platform foundations,
keep Industry logic inside the Product,
and handle Customer variation through
configuration and approved extensions.

Product success will be measured through
real user and business outcomes.

RestaurantOS and PoultryOS remain candidates.

Neither Product is selected yet.

Phase 2 remains locked until
Phase 1 closes and the Founder authorizes
Product and Architecture Re-Baseline.
```

---

# 63. Next Document

After this file is saved and reviewed, the next Product-planning document is:

```text
doc/product-roadmap.md
```

That document must:

- align with the Master Completion Phases;
- avoid fixed unsupported dates;
- preserve RestaurantOS and PoultryOS as candidates;
- define discovery, selection, vertical slice, Pilot, Production, repeatability,
  and scale stages;
- define evidence-based Product gates;
- prevent several Industry Products from starting in parallel;
- keep AI proof after the first Product vertical slice;
- remain Draft until Founder approval.

---

# Change Log

| Version | Date | Change |
|---|---|---|
| Earlier Draft | Earlier | Defined Mianx CoreOS and an overloaded multi-system V1 |
| 1.0.0 | 2026-08-04 | Rebuilt as a locked Product and Architecture Re-Baseline PRD; removed automatic RestaurantOS/PoultryOS selection, narrowed the first Product to three-to-five connected workflows, separated Platform Kernel, Shared Services, Industry logic, Customer configuration, and governed AI, and added discovery, evidence, Customer-outcome, commercial, Security, Data, recovery, Phase entry, and Product acceptance gates |