---
id: AIW-CAPABILITIES-001
title: Mianx.ai AI Workforce Capabilities
version: 1.0.0
status: Draft

type: Enterprise AI Workforce Capability Framework
class: Governed

owner: Mianx.ai Founder
steward: AI Workforce Council and Capability Governance
authority: Founder and Enterprise Governance

maintainers:
  - AI Workforce Operations
  - Capability Governance
  - Enterprise Architecture
  - AI Operating System Team
  - Product Operations
  - Security Governance
  - Data and Privacy Governance
  - Enterprise Quality
  - Finance Governance
  - Platform Operations
  - Documentation Governance

reviewers:
  - Founder
  - AI CEO
  - Chief Technology Officer
  - Chief Operating Officer
  - Chief Product Officer
  - Chief Financial Officer
  - Chief Human Resources Officer
  - Chief Information Security Officer
  - Chief Data Officer
  - Chief Legal Officer
  - Enterprise Governance
  - Enterprise Architecture
  - AI Operating System Owner
  - Memory Engine Owner
  - Agent Framework Owner
  - Multi-Agent System Owner
  - AI Workforce Operations
  - Product Operations
  - Security Governance
  - Data and Privacy Governance
  - Enterprise Quality
  - Finance Governance
  - Platform Operations
  - Documentation Governance

created: 2026-08-06
updated: 2026-08-06

classification: Internal

audience:
  - Founder
  - Executive Leadership
  - AI Workforce Council
  - Capability Governance
  - Department Directors
  - Product Owners
  - Project Owners
  - Program Managers
  - Team Leads
  - Enterprise Architects
  - AI Platform Engineers
  - Security Teams
  - Data and Privacy Teams
  - Quality Teams
  - Finance Teams
  - Operations Teams
  - Documentation Maintainers
  - Auditors
  - AI Agents

depends_on:
  - ./README.md
  - ./INDEX.md
  - ./ROADMAP.md
  - ./CHANGELOG.md
  - ./workforce-vision.md
  - ./workforce-strategy.md
  - ./workforce-operating-model.md
  - ./workforce-architecture.md
  - ./workforce-governance.md
  - ./workforce-security.md
  - ../01-governance/AI-CONSTITUTION.md
  - ../01-governance/ENTERPRISE-PRINCIPLES.md
  - ../02-company/VISION-AND-MISSION.md
  - ../20-ai-operating-system/MASTER-BLUEPRINT.md
  - ../20-ai-operating-system/MULTI-PROJECT-OPERATING-MODEL.md
  - ../31-enterprise-architecture/CORE-ARCHITECTURE.md
  - ../CURRENT-STATE.md
  - ../DOCUMENT-STATUS-REGISTRY.md
  - ../CANONICAL-DOCUMENT-MAP.md

related_documents:
  - ./workforce-lifecycle.md
  - ./workforce-metrics.md
  - ./workforce-checklists.md
  - ./AGENT-CAPACITY-BASELINE.md
  - ./C-SUITE-AGENT-REGISTRY.md
  - ./VERIFIABLE-WORK-ENVELOPE.md
  - ./roles/role-catalog.md
  - ./roles/job-descriptions.md
  - ./roles/skill-matrix.md
  - ./agents/agent-types.md
  - ./agents/agent-skills.md
  - ./agents/agent-tools.md
  - ./agents/agent-memory.md
  - ./agents/agent-performance.md
  - ./capabilities/capability-registry.md
  - ./capabilities/skill-registry.md
  - ./capabilities/tool-registry.md
  - ./capabilities/model-registry.md
  - ./training/training-framework.md
  - ./training/evaluation.md
  - ./training/certification.md
  - ./workflows/workflow-engine.md
  - ./workflows/task-assignment.md
  - ./workflows/task-routing.md
  - ./workflows/approval-flow.md
  - ./shared-memory/shared-memory.md
  - ./policies/security-policy.md
  - ./policies/privacy-policy.md
  - ./policies/ethics-policy.md
  - ./policies/compliance-policy.md
  - ../20-ai-operating-system/README.md
  - ../21-memory-engine/README.md
  - ../22-agent-framework/README.md
  - ../23-multi-agent-system/README.md
  - ../41-security-platform/README.md
  - ../42-data-platform/README.md
  - ../44-enterprise-ai/AI-GOVERNANCE.md
  - ../../execution/EXECUTION-BOARD.md

review_cycle:
  - Quarterly During Documentation and Implementation
  - Annually After Stable Operation
  - After AI Constitution Change
  - After Enterprise Principles Change
  - After Material Workforce Strategy Change
  - After Material Workforce Architecture Change
  - After Material Workforce Governance Change
  - After Material Workforce Security Change
  - Before New Capability Activation
  - Before High-Risk Capability Approval
  - Before New Tool, Model, Provider, or Workflow Approval
  - Before Multi-Project or Multi-Tenant Capability Expansion
  - Before Production Capability Activation
  - After Critical AI, Security, Privacy, Data, Quality, Cost, or Operational Incident
  - Before Canonical Promotion

capability_horizon:
  current: Documentation and Capability Definition
  near_term: Governed One-Agent Capability Proof
  medium_term: Reusable Multi-Agent and Multi-Project Capabilities
  long_term: Production-Controlled Multi-Product Capability Portfolio

canonical: false
---

# Mianx.ai AI Workforce Capabilities

> **The Mianx.ai AI Workforce Capability Framework defines how approved Roles,
> skills, Tools, Models, prompts, workflows, memory profiles, authority,
> evaluation, evidence, Security, cost, capacity, and operational controls are
> combined into reusable and Product-aware capabilities that allow authorized
> AI Agents and Teams to perform bounded enterprise work safely, consistently,
> measurably, and under Human Governance.**

---

# 1. Document Purpose

This document defines the enterprise capability framework for the Mianx.ai AI
Workforce.

It establishes:

- what an AI Workforce capability is;
- what a capability is not;
- how capabilities differ from Roles, Agents, skills, Tools, and Models;
- capability Architecture;
- capability categories;
- capability ownership;
- capability IDs and metadata;
- capability discovery;
- capability proposal;
- capability approval;
- build-versus-buy decisions;
- capability composition;
- reusable capabilities;
- Product-specific capabilities;
- Industry-specific capabilities;
- Customer-specific capability configuration;
- capability scope;
- capability dependencies;
- capability authority;
- capability Risk classification;
- Tool and Model eligibility;
- prompt and workflow relationships;
- memory and Knowledge relationships;
- evaluation and certification;
- Security and privacy requirements;
- quality and evidence requirements;
- cost and capacity profiles;
- monitoring and performance;
- capability lifecycle;
- versioning;
- suspension;
- deprecation;
- retirement;
- capability Registry relationships;
- current-state limitations;
- adoption and approval requirements.

This document defines target capability Governance and design.

It does not independently:

- implement a Capability Registry;
- create an operational Agent;
- approve a Tool;
- approve a Model;
- approve a provider;
- authorize runtime execution;
- grant permissions;
- activate workflows;
- authorize provider spending;
- prove capability evaluation;
- prove Production operation.

---

# 2. Current Authority Status

This document currently has the following state:

```text
DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

CAPABILITY_GOVERNANCE_APPROVAL=PENDING

IMPLEMENTATION_AUTHORIZATION=NOT_GRANTED

CAPABILITY_REGISTRY_IMPLEMENTATION=NOT_VERIFIED

RUNTIME_CAPABILITY_ACTIVATION=NOT_AUTHORIZED

PRODUCTION_CAPABILITY_ACTIVATION=NOT_AUTHORIZED
```

This document may be used for:

- capability portfolio design;
- Role and Agent alignment;
- Registry design;
- Tool and Model selection;
- workflow design;
- evaluation planning;
- cost modelling;
- implementation planning;
- security review;
- Product and Project planning;
- duplication analysis;
- capability-gap analysis.

Current implementation truth remains governed by:

- [`CURRENT-STATE.md`](../CURRENT-STATE.md)
- [`DOCUMENT-STATUS-REGISTRY.md`](../DOCUMENT-STATUS-REGISTRY.md)
- [`EXECUTION-BOARD.md`](../../execution/EXECUTION-BOARD.md)

---

# 3. Capability Objective

The primary objective of the capability framework is to ensure that enterprise
AI work is performed through approved, bounded, reusable, measurable, and
governed execution combinations.

```text
Approved Business Need
        ↓
Approved Capability
        ↓
Eligible Role
        ↓
Authorized Agent
        ↓
Approved Skill Profile
        ↓
Approved Tool and Model Profile
        ↓
Approved Prompt and Workflow
        ↓
Approved Memory and Data Scope
        ↓
Approved Authority and Budget
        ↓
Controlled Execution
        ↓
Evidence and Evaluation
```

A capability should make it possible to answer:

- What business work can be performed?
- Which Role owns the responsibility?
- Which Agents are eligible?
- Which skills are required?
- Which Tools may be used?
- Which Models may be used?
- Which prompt profile governs behavior?
- Which workflow governs execution?
- Which Data and memory may be accessed?
- Which actions are permitted?
- Which actions are prohibited?
- Which Products, Projects, Tenants, and environments are permitted?
- Which evaluation must pass?
- Which evidence must be produced?
- What does the capability cost?
- How is it suspended?
- How is it retired?

---

# 4. Strategic Position

The capability framework operates inside the Mianx.ai hierarchy:

```text
Mianx.ai Company and Governance
            ↓
MianX Core Platform
            ↓
Mianx.ai AI Operating System
            ↓
Mianx.ai Shared AI Workforce
            ↓
Approved Workforce Capabilities
            ↓
Industry Operating Systems
            ↓
Customer-Specific Editions
            ↓
Governed Autonomous Enterprise Creation
```

Capabilities are reusable execution building blocks.

They do not replace:

- Company Governance;
- Product ownership;
- Project ownership;
- Human accountability;
- Agent identity;
- AI Operating System runtime;
- Tool implementation;
- Model-provider infrastructure;
- memory Architecture;
- Security controls;
- Customer contracts.

---

# 5. Capability Principles

## 5.1 Business Purpose Before Technology

A capability must exist to solve an approved enterprise, Product, Project, or
Customer need.

A new Model or Tool alone does not justify a new capability.

---

## 5.2 Capability Before Agent Duplication

Where possible, multiple eligible Agents should use one approved capability
definition rather than creating overlapping Agent-specific implementations.

---

## 5.3 Role Before Execution

Every capability must identify the Roles authorized to own or execute it.

---

## 5.4 Identity Before Use

An approved capability must be invoked by an identified and eligible Agent or
authorized Human-controlled workflow.

---

## 5.5 Authority Before Action

Capability availability does not grant authority.

The executing Agent must also possess valid:

- allocation;
- permission;
- Product scope;
- Project scope;
- Tenant scope;
- environment scope;
- approval.

---

## 5.6 Least Privilege

A capability must use the minimum Tools, Models, Data, memory, and authority
required for its purpose.

---

## 5.7 Reuse Without Boundary Loss

Reusable capabilities must preserve:

- Product boundaries;
- Project boundaries;
- Tenant boundaries;
- Customer confidentiality;
- environment boundaries;
- memory boundaries;
- cost attribution.

---

## 5.8 Evidence by Design

Every material capability must define the evidence it is expected to produce.

---

## 5.9 Evaluation Before Activation

A capability must be evaluated before operational activation.

---

## 5.10 Security Before Scale

A capability must not scale beyond proven Security and operational controls.

---

## 5.11 Cost Must Be Visible

A capability must have an understandable cost profile before Production scale.

---

## 5.12 Capability Must Be Suspendable

An operational capability must support restriction, suspension, or retirement.

---

# 6. Capability Definition

An AI Workforce capability is:

> A governed, versioned, and evaluated combination of Role eligibility,
> required skills, approved Tools, approved Models, approved prompts, approved
> workflows, approved Data and memory scope, authority, permissions, budget,
> evidence, Security, and operational controls designed to perform a defined
> class of enterprise work.

A capability may be represented as:

```text
Capability
=
Purpose
+
Eligible Roles
+
Required Skills
+
Approved Tools
+
Approved Models
+
Prompt Profile
+
Workflow Profile
+
Memory Profile
+
Authority Profile
+
Permission Profile
+
Risk Profile
+
Evaluation Profile
+
Evidence Profile
+
Budget Profile
+
Operational Controls
```

---

# 7. What a Capability Is Not

A capability is not automatically:

- a Role;
- an Agent;
- a Team;
- a Department;
- a prompt;
- a Model;
- a Tool;
- a workflow;
- a permission;
- a runtime allocation;
- an active service;
- a Production capability;
- proof of successful work.

A capability may reference all of these elements without becoming identical to
them.

---

# 8. Role, Agent, and Capability Separation

The required distinction is:

```text
Role
=
What responsibility exists

Agent
=
Which identified runtime entity may perform work

Capability
=
Which approved combination enables a class of work

Allocation
=
Where and when an Agent may use the capability

Task
=
Which bounded work must be completed
```

Example:

```text
Role:
Backend Engineer

Agent:
AIW-AGENT-ENG-BE-001

Capability:
Secure REST API Implementation

Allocation:
MianX Core / Project CORE-API / Development

Task:
Implement approved membership lookup endpoint
```

---

# 9. Skill, Tool, Model, and Capability Separation

## Skill

A Skill represents knowledge or proficiency.

Example:

```text
TypeScript API Development
```

## Tool

A Tool enables an action.

Example:

```text
GitHub Repository Read and Controlled Write
```

## Model

A Model provides inference capability.

Example:

```text
Approved Code-Reasoning Model
```

## Capability

A Capability combines approved elements to perform a defined business task.

Example:

```text
Secure Backend Feature Delivery
```

A Skill does not grant Tool access.

A Tool does not grant authority.

A Model does not create a complete capability.

---

# 10. Capability Architecture

The capability Architecture contains these elements:

```text
Capability Identity
        ↓
Purpose and Outcome
        ↓
Eligible Roles and Agents
        ↓
Skill Requirements
        ↓
Tool and Model Profiles
        ↓
Prompt and Workflow Profiles
        ↓
Data and Memory Profiles
        ↓
Authority and Permission Profiles
        ↓
Risk, Security, and Privacy Controls
        ↓
Evaluation and Certification
        ↓
Evidence and Quality Requirements
        ↓
Budget, Capacity, and Operations
        ↓
Lifecycle and Change Control
```

---

# 11. Capability Domains

Capability documentation should support at least these domains:

```text
Executive and Leadership

Product

Architecture

Engineering

Quality Assurance

Security

DevOps and Infrastructure

Data and AI

Design

Marketing

SEO

Sales

Finance

Human Resources

Legal

Operations

Support

Customer Success

Research

Analytics
```

The presence of a domain does not prove that its capabilities are active.

---

# 12. Capability Categories

Capabilities may be classified into the following categories:

## 12.1 Advisory Capability

Provides:

- analysis;
- recommendation;
- comparison;
- planning;
- decision support.

It does not directly change systems.

---

## 12.2 Drafting Capability

Produces:

- documents;
- specifications;
- designs;
- proposals;
- code drafts;
- communication drafts.

Outputs require appropriate review.

---

## 12.3 Read-Only Operational Capability

Can retrieve and analyze approved information without changing the source
system.

---

## 12.4 Controlled Write Capability

Can make reversible or bounded changes to approved systems.

---

## 12.5 Review Capability

Evaluates work produced by Humans, Agents, Teams, or systems.

---

## 12.6 Approval-Support Capability

Prepares evidence and recommendations for authorized Human approval.

It does not become final approval authority unless explicitly authorized.

---

## 12.7 Monitoring Capability

Observes systems, tasks, costs, Security signals, or outcomes.

---

## 12.8 Incident-Support Capability

Assists with:

- detection;
- triage;
- evidence gathering;
- containment recommendations;
- recovery support.

---

## 12.9 Automation Capability

Performs a repeatable workflow inside approved boundaries.

---

## 12.10 Production-Controlled Capability

Performs approved Production work with monitoring, audit, suspension, and
operational ownership.

---

# 13. Capability Scope Classes

Capabilities may have one of these scope classes:

```text
Enterprise Shared

Department Shared

Product Shared

Project Specific

Tenant Specific

Customer Specific

Environment Specific

Experimental

Emergency Only
```

Scope class must be explicit.

---

# 14. Enterprise-Shared Capabilities

An enterprise-shared capability may support multiple departments or Products.

Examples may include:

- document analysis;
- controlled Research;
- requirements analysis;
- architecture review;
- evidence validation;
- documentation formatting;
- approved Knowledge retrieval.

Enterprise-shared capability does not mean enterprise-wide Data access.

---

# 15. Department-Shared Capabilities

A department-shared capability supports multiple Teams inside one function.

Example:

```text
Engineering Department
    ↓
Secure Code Review Capability
```

The capability may be shared while individual Project access remains isolated.

---

# 16. Product-Shared Capabilities

A Product-shared capability may support multiple Projects or Customer Editions
inside one Product.

Example:

```text
RestaurantOS
    ↓
Restaurant Workflow Analysis Capability
```

It must not automatically receive access to PoultryOS.

---

# 17. Project-Specific Capabilities

A Project-specific capability exists for a bounded Project requirement.

It should be reviewed for later:

- reuse;
- standardization;
- retirement;
- promotion to Product scope.

Project-specific capability must not become shared silently.

---

# 18. Tenant-Specific Capabilities

A Tenant-specific capability may include:

- Tenant configuration;
- Tenant Data rules;
- Tenant integrations;
- Tenant-specific workflows;
- Tenant-specific permissions.

Its context and outputs must remain inside approved Tenant scope.

---

# 19. Customer-Specific Capabilities

Customer-specific capability configuration may include:

- contract-specific rules;
- Customer workflow;
- Customer integrations;
- Customer Data access;
- Customer communication authority;
- Customer reporting.

Customer-specific capability should not create uncontrolled permanent forks.

---

# 20. Experimental Capabilities

An experimental capability is used for controlled Research or evaluation.

It must define:

- hypothesis;
- owner;
- environment;
- permitted Data;
- prohibited Production use;
- cost limit;
- evaluation;
- end date;
- success criteria;
- retirement or promotion decision.

Experimental capability must not be represented as Production-ready.

---

# 21. Emergency Capabilities

Emergency capabilities may be activated for:

- incident response;
- containment;
- recovery;
- investigation;
- urgent legal or Security action.

Emergency capability must have:

- explicit authority;
- limited scope;
- limited duration;
- enhanced audit;
- post-use review;
- automatic expiry where practical.

---

# 22. Capability Ownership

Every capability must have:

- business owner;
- capability steward;
- technical owner;
- Security owner;
- quality owner;
- operational owner;
- cost owner;
- documentation owner.

A capability without ownership must not become Production-controlled.

---

# 23. Business Owner

The business owner is accountable for:

- purpose;
- expected outcome;
- value;
- Product or enterprise need;
- priority;
- continued relevance;
- retirement decision.

---

# 24. Capability Steward

The capability steward maintains:

- capability definition;
- metadata;
- dependencies;
- eligible Roles;
- evaluations;
- version history;
- documentation;
- Registry accuracy.

---

# 25. Technical Owner

The technical owner is responsible for:

- technical implementation;
- integration;
- runtime compatibility;
- technical testing;
- failure behavior;
- maintenance;
- technical deprecation.

---

# 26. Security Owner

The Security owner reviews:

- authority;
- permissions;
- Tools;
- Models;
- Data;
- memory;
- secrets;
- threat model;
- monitoring;
- suspension;
- incidents.

---

# 27. Quality Owner

The Quality owner defines:

- acceptance criteria;
- evaluation;
- test evidence;
- quality thresholds;
- regression requirements;
- review requirements.

---

# 28. Operational Owner

The operational owner is responsible for:

- monitoring;
- support;
- incidents;
- suspension;
- recovery;
- availability;
- operational review;
- Production readiness.

---

# 29. Cost Owner

The cost owner manages:

- budget;
- provider usage;
- Tool cost;
- infrastructure cost;
- cost thresholds;
- alerts;
- value comparison;
- cost review.

---

# 30. Capability Identity Standard

Every capability should have a stable identity.

Proposed format:

```text
AIW-CAP-<DOMAIN>-<NAME>-NNN
```

Examples:

```text
AIW-CAP-PROD-REQUIREMENTS-001

AIW-CAP-ENG-SECURE-CODE-REVIEW-001

AIW-CAP-SEC-ACCESS-REVIEW-001

AIW-CAP-QA-REGRESSION-TESTING-001
```

Capability IDs must:

- remain unique;
- be recorded in the Capability Registry;
- not be reused;
- remain stable after approval;
- use versioning for material changes.

---

# 31. Capability Record

A proposed capability record should include:

```yaml
capability_id:
capability_version:
name:
description:
category:
scope_class:
domain:
business_owner:
capability_steward:
technical_owner:
security_owner:
quality_owner:
operational_owner:
cost_owner:

business_purpose:
expected_outcomes:
supported_work_types:
prohibited_work_types:

eligible_role_ids:
eligible_agent_types:
required_skill_ids:
optional_skill_ids:

tool_profile_id:
model_profile_id:
prompt_profile_id:
workflow_profile_id:
memory_profile_id:
authority_profile_id:
permission_profile_id:
evaluation_profile_id:
evidence_profile_id:
budget_profile_id:
capacity_profile_id:

organization_scope:
product_scope:
project_scope:
tenant_scope:
customer_scope:
environment_scope:
region_scope:
data_classification_scope:

risk_class:
security_class:
privacy_class:
tool_risk_class:
model_risk_class:

approval_state:
evaluation_state:
certification_state:
implementation_state:
runtime_state:
monitoring_state:
suspension_state:
lifecycle_state:

dependencies:
limitations:
created_at:
updated_at:
review_at:
expires_at:
```

---

# 32. Capability Status Model

Capability states must remain separate.

```text
Proposed
    ↓
In Discovery
    ↓
Designed
    ↓
In Review
    ↓
Approved
    ↓
Implemented
    ↓
Evaluated
    ↓
Certified
    ↓
Available
    ↓
Allocated
    ↓
Active
    ↓
Production-Controlled
    ↓
Suspended
    ↓
Deprecated
    ↓
Retired
    ↓
Archived
```

A capability must not skip required states.

---

# 33. Documentation State Versus Runtime State

The following must remain separate:

```text
Capability Documented
≠
Capability Approved
≠
Capability Implemented
≠
Capability Evaluated
≠
Capability Available
≠
Capability Active
≠
Capability Production-Controlled
```

A Registry entry does not prove runtime availability.

---

# 34. Capability Discovery

Capability discovery identifies recurring or strategically valuable work.

Discovery sources may include:

- Founder direction;
- Product Roadmaps;
- Project demand;
- Customer needs;
- operational bottlenecks;
- support patterns;
- incidents;
- Security findings;
- quality findings;
- Research;
- analytics;
- repeated Human tasks;
- repeated Agent tasks;
- existing Tool or Model opportunities.

---

# 35. Discovery Questions

Capability discovery should answer:

1. What verified problem exists?
2. Who owns the problem?
3. Who benefits?
4. Is the work recurring?
5. Is the work measurable?
6. Is the work sufficiently bounded?
7. Is an existing capability already available?
8. Which Role should own it?
9. Which Data is required?
10. Which Tools are required?
11. Which Models are required?
12. What is the Risk?
13. What evidence will prove success?
14. What is the expected cost?
15. Can the capability be suspended?
16. Does the capability have reuse potential?

---

# 36. Capability Gap Analysis

A capability gap exists when:

- approved business work has no eligible Role;
- the Role lacks required skills;
- approved Tools are unavailable;
- approved Models are unavailable;
- workflow controls are missing;
- evaluation is missing;
- evidence requirements are missing;
- Security controls are insufficient;
- operational ownership is missing;
- cost is not sustainable.

Gap analysis must distinguish between:

```text
Role Gap

Skill Gap

Tool Gap

Model Gap

Workflow Gap

Permission Gap

Data Gap

Memory Gap

Evaluation Gap

Operational Gap
```

---

# 37. Capability Proposal

A capability proposal should define:

```yaml
proposal_id:
proposed_capability_name:
requester:
business_owner:
problem:
expected_outcome:
target_users:
target_products:
target_projects:
target_tenants:
work_types:
required_roles:
required_skills:
required_tools:
required_models:
required_data:
required_memory:
proposed_workflow:
proposed_authority:
risk_class:
estimated_cost:
expected_value:
evaluation_plan:
evidence_plan:
security_requirements:
operational_requirements:
reuse_potential:
alternatives:
status:
```

---

# 38. Capability Proposal Review

Proposal review should verify:

- business need is real;
- owner exists;
- expected outcome is measurable;
- scope is bounded;
- existing capability is insufficient;
- required authority is acceptable;
- required Data use is permitted;
- Security requirements are understood;
- cost is reasonable;
- operational ownership is possible;
- evaluation can be designed;
- suspension is possible.

---

# 39. Capability Approval

Capability approval should consider:

```text
Strategic Alignment
+
Business Value
+
Role Ownership
+
Security
+
Privacy
+
Architecture
+
Quality
+
Cost
+
Operations
+
Evidence
+
Risk
```

Approval does not grant runtime permission to every Agent.

---

# 40. Capability Approval Classes

## C0 — Informational Capability

Low-risk analysis or lookup.

## C1 — Internal Drafting Capability

Produces review-required internal outputs.

## C2 — Controlled Internal Execution

Performs reversible internal changes.

## C3 — Customer or Production Support

Processes Customer, Production, or sensitive Data under enhanced controls.

## C4 — High-Risk or Material Autonomous Execution

Performs high-impact, regulated, destructive, financial, legal, or
enterprise-wide work.

C4 capability requires highest-level Human Governance.

---

# 41. Build-Versus-Buy Decision

A capability may be:

```text
Built Internally

Configured From Existing Platform Components

Integrated From an External Provider

Purchased as a Managed Service

Composed From Existing Capabilities

Rejected

Deferred
```

The decision must be recorded.

---

# 42. Build Internally When

Internal development may be preferred when:

- capability is strategically differentiating;
- custom Governance is essential;
- Tenant or Project isolation is critical;
- proprietary enterprise Knowledge is involved;
- external providers cannot meet Security requirements;
- long-term economics justify ownership;
- deep Product integration is required.

---

# 43. Buy or Integrate When

External capability may be appropriate when:

- function is commoditized;
- provider quality is stronger;
- time to value is important;
- Data handling is acceptable;
- access can be restricted;
- audit is sufficient;
- provider dependency is manageable;
- cost is sustainable;
- exit or replacement is possible.

---

# 44. Reject or Defer When

A capability should be rejected or deferred when:

- no accountable owner exists;
- business value is unclear;
- Risk cannot be controlled;
- Data use is not permitted;
- Security controls are insufficient;
- operational ownership is absent;
- cost is unsustainable;
- duplication is excessive;
- evaluation is impossible;
- suspension is unavailable;
- the work conflicts with higher authority.

---

# 45. Capability Composition

A capability may be composed from smaller approved capabilities.

Example:

```text
Product Requirement Analysis
        +
Architecture Review
        +
Secure Implementation
        +
Automated Testing
        +
Evidence Validation
        =
Controlled Feature Delivery Capability
```

Composition must preserve:

- authority;
- scope;
- evidence;
- Data boundaries;
- cost attribution;
- failure handling;
- suspension.

---

# 46. Atomic Capabilities

An atomic capability performs one narrow class of work.

Examples:

- summarize approved document;
- extract structured requirements;
- run approved test suite;
- perform read-only dependency lookup;
- generate draft test cases.

Atomic capabilities are easier to:

- evaluate;
- reuse;
- secure;
- compose;
- monitor;
- suspend.

---

# 47. Composite Capabilities

A composite capability combines multiple atomic capabilities.

Composite capability must define:

- orchestration;
- sequence;
- dependencies;
- handoffs;
- approvals;
- evidence aggregation;
- failure handling;
- rollback;
- final accountability.

---

# 48. Capability Dependency Model

Dependencies may include:

- Roles;
- skills;
- Tools;
- Models;
- prompts;
- workflows;
- memory;
- Knowledge;
- Data sources;
- permissions;
- approvals;
- providers;
- infrastructure;
- Human reviewers;
- operational services.

Every critical dependency should have:

- owner;
- status;
- version;
- failure behavior;
- fallback;
- suspension impact.

---

# 49. Dependency Failure

When a required dependency fails, the capability should:

- stop safely;
- use an approved fallback;
- reduce scope;
- request Human input;
- queue work;
- escalate;
- suspend.

It must not silently replace a dependency with an unapproved alternative.

---

# 50. Eligible Roles

A capability must list eligible Roles.

Eligibility should consider:

- responsibility;
- authority;
- skills;
- Risk ceiling;
- department;
- Product scope;
- evaluation;
- certification.

An eligible Role does not prove that every Agent holding that Role is eligible.

---

# 51. Eligible Agents

An Agent may use a capability only when:

- Agent identity is valid;
- Role is eligible;
- allocation is valid;
- authority is valid;
- permission is valid;
- Product scope matches;
- Project scope matches;
- Tenant scope matches;
- environment scope matches;
- evaluation is current;
- certification is valid where required;
- Agent is not suspended;
- capacity is available.

---

# 52. Skill Requirements

Capability skills may be classified as:

```text
Required

Recommended

Optional

Prohibited Due to Conflict

Certification Required
```

Required skills must have:

- defined proficiency;
- evaluation;
- expiry or review where appropriate;
- owner;
- evidence.

---

# 53. Skill Proficiency Levels

A proposed proficiency model is:

| Level | Meaning |
|---|---|
| `S0` | No verified capability |
| `S1` | Basic awareness |
| `S2` | Guided execution |
| `S3` | Independent bounded execution |
| `S4` | Advanced specialist execution |
| `S5` | Expert review and capability leadership |

Proficiency does not automatically grant authority.

---

# 54. Skill Evaluation

Skill evaluation may include:

- knowledge checks;
- scenario tests;
- bounded execution;
- Tool-use tests;
- Security tests;
- evidence quality;
- Human review;
- incident behavior;
- escalation behavior.

---

# 55. Skill Certification

Certification may be required for:

- Production access;
- destructive Tools;
- sensitive Data;
- Security operations;
- legal work;
- financial work;
- executive support;
- Customer-facing communication.

Certification must define:

- issued scope;
- evaluator;
- result;
- restrictions;
- expiry;
- renewal;
- suspension;
- revocation.

---

# 56. Tool Profile

A capability Tool Profile should define:

```yaml
tool_profile_id:
required_tools:
optional_tools:
prohibited_tools:
allowed_actions:
prohibited_actions:
product_scope:
project_scope:
tenant_scope:
environment_scope:
data_scope:
rate_limits:
cost_limits:
logging_requirements:
approval_requirements:
fallback_tools:
suspension_method:
```

---

# 57. Tool Eligibility

Tool eligibility must verify:

- Tool approval;
- Tool version;
- Agent Role;
- Product;
- Project;
- Tenant;
- environment;
- action;
- Data classification;
- cost;
- rate limit;
- credential availability;
- monitoring.

---

# 58. Model Profile

A capability Model Profile should define:

```yaml
model_profile_id:
primary_models:
fallback_models:
prohibited_models:
approved_providers:
task_types:
data_classifications:
region_scope:
quality_threshold:
latency_threshold:
cost_threshold:
context_limit:
tool_support:
structured_output_requirements:
evaluation_profile:
suspension_method:
```

---

# 59. Model Eligibility

Model eligibility should consider:

- provider approval;
- Model approval;
- use case;
- Data handling;
- region;
- quality;
- cost;
- latency;
- context;
- Tool use;
- fallback policy;
- evaluation.

Fallback must not bypass policy.

---

# 60. Prompt Profile

A capability Prompt Profile should define:

- prompt ID;
- version;
- Role;
- purpose;
- instruction hierarchy;
- inputs;
- context policy;
- Tool rules;
- Model rules;
- output schema;
- prohibited behavior;
- evidence requirements;
- escalation;
- evaluation;
- rollback.

Prompt instructions do not replace runtime policy.

---

# 61. Workflow Profile

A capability Workflow Profile should define:

- workflow ID;
- version;
- states;
- transitions;
- participating Roles;
- participating Agents;
- approvals;
- Tool use;
- Model use;
- memory use;
- evidence;
- timeouts;
- retries;
- failure handling;
- suspension;
- closure.

---

# 62. Memory Profile

A capability Memory Profile should define:

```yaml
memory_profile_id:
read_scopes:
write_scopes:
prohibited_scopes:
organization_scope:
product_scope:
project_scope:
tenant_scope:
customer_scope:
environment_scope:
data_classifications:
retention:
deletion:
provenance:
review:
audit:
```

---

# 63. Authority Profile

A capability Authority Profile should define which organizational actions are
permitted.

Possible actions include:

```text
Observe

Analyze

Recommend

Draft

Create

Update

Test

Execute

Deploy

Approve

Escalate

Suspend
```

A capability must not contain more authority than necessary.

---

# 64. Permission Profile

Permission Profile defines technical access.

It should specify:

- actions;
- resources;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- Data class;
- Tools;
- Models;
- conditions;
- expiry;
- denial rules.

Technical permission must not exceed approved authority.

---

# 65. Evidence Profile

An Evidence Profile should define required proof for capability outputs.

```yaml
evidence_profile_id:
required_task_identity:
required_agent_identity:
required_authority_evidence:
required_input_references:
required_tool_records:
required_model_records:
required_changed_artifacts:
required_tests:
required_security_checks:
required_data_checks:
required_cost_record:
required_review:
required_approval:
required_limitations:
retention:
```

---

# 66. Evaluation Profile

An Evaluation Profile should define:

- evaluation ID;
- capability version;
- eligible Roles;
- test scenarios;
- expected outputs;
- Security tests;
- Tool tests;
- Model tests;
- Data tests;
- isolation tests;
- cost thresholds;
- latency thresholds;
- quality thresholds;
- escalation tests;
- failure tests;
- suspension tests;
- evaluator;
- expiry.

---

# 67. Budget Profile

A Budget Profile may define:

```yaml
budget_profile_id:
currency:
per_task_limit:
daily_limit:
monthly_limit:
tool_limit:
model_limit:
provider_limit:
human_review_budget:
warning_threshold:
approval_threshold:
hard_stop_threshold:
cost_owner:
```

---

# 68. Capacity Profile

A Capacity Profile may define:

```yaml
capacity_profile_id:
eligible_agent_count:
maximum_concurrent_tasks:
maximum_queue_depth:
maximum_task_duration:
maximum_tool_calls:
maximum_model_calls:
human_review_capacity:
provider_capacity:
tool_capacity:
operational_support_capacity:
```

---

# 69. Product Scope

A capability may be:

- enterprise-wide;
- shared across approved Products;
- limited to one Product;
- unavailable to specific Products.

Product scope must be explicit.

---

# 70. Project Scope

Project scope controls:

- Project Data;
- files;
- memory;
- secrets;
- environments;
- evidence;
- budgets;
- outputs.

A capability may be reusable while each invocation remains Project-scoped.

---

# 71. Tenant Scope

Tenant scope must control:

- Data;
- memory;
- Tool actions;
- Model context;
- outputs;
- evidence;
- cost;
- incidents.

Shared capability must not mix Tenant context.

---

# 72. Customer Scope

Customer-scoped capability must define:

- Customer;
- contract;
- permitted purpose;
- Tenant;
- Product;
- Project;
- Data;
- communication authority;
- retention;
- confidentiality;
- reuse restrictions.

---

# 73. Environment Scope

Capability environment scope may include:

```text
Documentation

Local

Development

Test

Staging

Production Read-Only

Production Write
```

Production capability requires separate approval.

---

# 74. Regional Scope

Regional restrictions may define:

- permitted countries;
- Data residency;
- providers;
- Tools;
- Models;
- legal restrictions;
- Customer requirements;
- support ownership.

---

# 75. Data Scope

Capability Data scope must define:

- source;
- owner;
- classification;
- purpose;
- permitted operations;
- retention;
- deletion;
- provider restrictions;
- export restrictions;
- output restrictions.

---

# 76. Capability Risk Classification

A capability should receive a Risk class.

| Risk | Description |
|---|---|
| `R0` | Informational, read-only, no material action |
| `R1` | Reversible drafting or internal analysis |
| `R2` | Controlled internal execution |
| `R3` | Customer, Production, Security, privacy, financial, or personal-Data impact |
| `R4` | Irreversible, legal, constitutional, regulated, destructive, or enterprise-wide action |

Risk may increase based on the invocation context.

---

# 77. Contextual Risk

The same capability may have different Risk by environment.

Example:

```text
Code Review in Development
=
R1 or R2

Code Change in Production
=
R3 or R4
```

Risk evaluation must consider:

- action;
- Data;
- Product;
- Project;
- Tenant;
- environment;
- scale;
- reversibility;
- Customer impact;
- legal impact;
- financial impact.

---

# 78. Security Requirements

Every capability must define:

- identity requirements;
- authentication requirements;
- authorization requirements;
- least privilege;
- Product isolation;
- Project isolation;
- Tenant isolation;
- environment isolation;
- Tool Security;
- Model Security;
- Data Security;
- memory Security;
- audit;
- monitoring;
- suspension;
- incident response.

---

# 79. Privacy Requirements

Privacy requirements may include:

- Data minimization;
- purpose limitation;
- Customer authorization;
- personal-Data controls;
- provider restrictions;
- retention;
- deletion;
- regional restrictions;
- output review;
- Human approval.

---

# 80. Ethical Requirements

Capabilities must not be designed to perform:

- deceptive;
- discriminatory;
- manipulative;
- harmful;
- illegal;
- unauthorized surveillance;
- unauthorized profiling;
- unsafe autonomous work.

Ethical concerns must have an escalation path.

---

# 81. Quality Requirements

Capability quality should define:

- correctness;
- completeness;
- relevance;
- consistency;
- maintainability;
- Security;
- Reliability;
- evidence;
- Customer or Product value.

Quality thresholds must be measurable.

---

# 82. Capability Evaluation Stages

Evaluation may progress through:

```text
Design Review
      ↓
Static Configuration Review
      ↓
Offline Evaluation
      ↓
Controlled Sandbox Test
      ↓
One-Agent Live Test
      ↓
Team Test
      ↓
Multi-Project Isolation Test
      ↓
Staging Test
      ↓
Limited Production Test
      ↓
Periodic Re-Evaluation
```

---

# 83. Offline Evaluation

Offline evaluation may test:

- expected inputs;
- expected outputs;
- factual quality;
- structured output;
- policy compliance;
- prompt injection;
- Tool decisions;
- Model decisions;
- evidence generation;
- escalation behavior.

---

# 84. Live Evaluation

Live evaluation should use:

- bounded scope;
- approved environment;
- approved Data;
- approved Agent;
- monitoring;
- cost limits;
- Human reviewer;
- suspension;
- evidence.

---

# 85. Regression Evaluation

Regression evaluation is required after material changes to:

- prompt;
- Model;
- Tool;
- workflow;
- memory;
- authority;
- permission;
- Data source;
- output schema;
- provider.

---

# 86. Capability Certification

A capability may become Certified only when:

- required evaluation passes;
- required Security review passes;
- required quality review passes;
- required operational review passes;
- limitations are documented;
- approved version is identified;
- expiry or review date is defined.

Certification does not automatically create Production authority.

---

# 87. Capability Availability

A capability may become Available when:

- approved;
- implemented;
- evaluated;
- certified where required;
- documented;
- monitored;
- suspendable;
- supported.

Availability means eligible Agents may request allocation.

---

# 88. Capability Allocation

Capability allocation connects an approved capability to:

- Agent;
- Team;
- Department;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- time period;
- budget;
- responsibility.

Allocation must not expand capability scope silently.

---

# 89. Capability Activation

Activation requires:

- eligible Agent;
- valid allocation;
- valid authority;
- valid permission;
- current evaluation;
- approved Tool profile;
- approved Model profile;
- valid memory profile;
- available budget;
- active monitoring;
- available suspension;
- required approval.

---

# 90. Production-Controlled Capability

A Production-controlled capability must have:

- approved business purpose;
- Production owner;
- Product owner;
- operational owner;
- approved Production scope;
- approved Agents;
- approved Tools;
- approved Models;
- approved Data use;
- approved memory;
- monitoring;
- audit;
- cost limits;
- incident response;
- suspension;
- recovery;
- current evidence.

---

# 91. Capability Monitoring

Monitoring should include:

- invocation count;
- Agent identities;
- Product;
- Project;
- Tenant;
- environment;
- success;
- failure;
- latency;
- Tool usage;
- Model usage;
- cost;
- permission denials;
- quality;
- incidents;
- suspension events;
- evidence completeness.

---

# 92. Capability Performance

Performance should be measured through:

- accepted outcomes;
- task success;
- quality;
- factual accuracy;
- Security compliance;
- policy compliance;
- rework;
- latency;
- cost;
- Customer value;
- Product value;
- Human correction;
- escalation quality;
- recovery behavior.

Invocation volume alone is not performance.

---

# 93. Capability Value

Capability value should consider:

```text
Verified Time Saved
+
Quality Improvement
+
Risk Reduction
+
Customer Outcome
+
Product Outcome
+
Knowledge Reuse
-
Provider Cost
-
Tool Cost
-
Infrastructure Cost
-
Human Review Cost
-
Failure and Rework Cost
```

---

# 94. Capability Cost Review

Cost review should identify:

- average cost per invocation;
- cost per accepted outcome;
- provider concentration;
- Tool cost;
- Human-review cost;
- Project cost;
- Tenant cost;
- Product cost;
- cost variance;
- failed-execution cost.

---

# 95. Capacity Management

Capability capacity should distinguish:

- eligible Agents;
- allocated Agents;
- active Agents;
- concurrent executions;
- queue depth;
- Tool capacity;
- Model-provider capacity;
- Human-review capacity;
- operational support capacity;
- budget capacity.

---

# 96. Capability Scaling

A capability may scale only when:

- demand is verified;
- value is measurable;
- quality remains acceptable;
- Security controls remain effective;
- cost is sustainable;
- monitoring is sufficient;
- incidents are manageable;
- Human review capacity exists;
- isolation remains verified;
- suspension works.

---

# 97. Capability Reuse

Capability reuse should occur when:

- purpose matches;
- Role eligibility matches;
- Security permits reuse;
- Product and Project scope can be preserved;
- Data and memory remain isolated;
- evaluation remains valid;
- cost remains acceptable.

---

# 98. Product-Specific Extension

A shared capability may support Product-specific extensions through:

- Product configuration;
- Product Knowledge;
- Product workflow;
- Product permissions;
- Product evidence;
- Product evaluation.

The extension must not silently change the enterprise capability.

---

# 99. Industry-Specific Capability

Industry-specific capabilities may include:

- restaurant operations analysis;
- poultry operations analysis;
- hospital workflow analysis;
- school administration analysis;
- future approved domain capabilities.

Industry capability must define:

- domain owner;
- domain Knowledge;
- domain rules;
- regulations;
- Product scope;
- evaluation;
- risks;
- limitations.

---

# 100. RestaurantOS Capability Example

A future RestaurantOS capability may define:

```text
Capability:
Restaurant Menu Performance Analysis

Eligible Roles:
Restaurant Product Analyst
Analytics Agent

Data Scope:
Approved Restaurant Tenant Data

Tools:
Approved Read-Only Analytics Tool

Models:
Approved Analysis Model

Authority:
Analyze and Recommend

Prohibited:
Automatic Menu Price Change

Evidence:
Data Source, Analysis, Limitations, Human Review
```

This example does not prove runtime implementation.

---

# 101. PoultryOS Capability Example

A future PoultryOS capability may define:

```text
Capability:
Poultry Production Trend Analysis

Eligible Roles:
Poultry Domain Analyst
Analytics Agent

Data Scope:
Approved Farm and Flock Project Data

Tools:
Approved Read-Only Data Tool

Models:
Approved Forecasting or Analysis Model

Authority:
Analyze and Recommend

Prohibited:
Automatic Veterinary or Financial Decision

Evidence:
Source Data, Method, Result, Limitations, Human Review
```

---

# 102. Customer Configuration

Customer configuration may change:

- allowed workflows;
- permitted Data;
- Tenant scope;
- integrations;
- reports;
- approval steps;
- communication rules.

Customer configuration must not change:

- Founder authority;
- enterprise Security;
- global Tool approval;
- global Model approval;
- constitutional rules;
- another Customer’s access.

---

# 103. Capability Duplication Control

Before creating a new capability:

1. search the Capability Registry;
2. inspect similar capability names;
3. compare business purpose;
4. compare eligible Roles;
5. compare Tool and Model profiles;
6. compare scope;
7. compare evidence;
8. determine whether extension or composition is sufficient;
9. document the decision.

---

# 104. Duplicate Capability

Capabilities may be considered duplicates only when they have substantially the
same:

- business purpose;
- responsibility;
- eligible Roles;
- scope;
- Tools;
- Models;
- workflow;
- evidence;
- owner.

Similar names alone do not prove duplication.

---

# 105. Capability Merge

A merge must define:

- source capabilities;
- target capability;
- retained functionality;
- removed functionality;
- affected Agents;
- affected Products;
- affected Projects;
- migration;
- evaluation;
- version;
- approval;
- retirement of source records.

---

# 106. Capability Split

A capability should be split when:

- scope is too broad;
- Tools require different Risk controls;
- Models require different Data rules;
- Products require materially different behavior;
- evaluation cannot remain meaningful;
- ownership differs;
- Production and non-Production responsibilities conflict.

---

# 107. Capability Versioning

Capabilities should use semantic versioning:

```text
MAJOR.MINOR.PATCH
```

Increase `MAJOR` when:

- business responsibility changes materially;
- authority changes materially;
- scope changes incompatibly;
- Tool or Model class changes Risk materially;
- workflow changes incompatibly;
- evidence contract changes incompatibly.

Increase `MINOR` when:

- new compatible behavior is added;
- new eligible Roles are added;
- new approved Products are added;
- evaluation is expanded.

Increase `PATCH` for:

- wording;
- metadata;
- link fixes;
- non-material clarification.

---

# 108. Capability Change Control

A material change must define:

- current version;
- proposed version;
- reason;
- affected Roles;
- affected Agents;
- affected Products;
- affected Projects;
- affected Tenants;
- Tool changes;
- Model changes;
- prompt changes;
- workflow changes;
- Data changes;
- memory changes;
- authority changes;
- Security impact;
- cost impact;
- evaluation;
- migration;
- rollback;
- approval.

---

# 109. Capability Re-Evaluation

Re-evaluation is required after material changes to:

- Role eligibility;
- skills;
- Tools;
- Models;
- providers;
- prompts;
- workflows;
- memory;
- authority;
- permissions;
- Data;
- Product scope;
- Project scope;
- Tenant scope;
- environment;
- Risk;
- evidence requirements.

---

# 110. Capability Suspension

A capability may be suspended because of:

- Security incident;
- privacy concern;
- failed evaluation;
- quality failure;
- provider compromise;
- Tool compromise;
- Model issue;
- excessive cost;
- monitoring failure;
- Product cancellation;
- legal concern;
- Human authority decision.

---

# 111. Suspension Effects

Suspension should:

- block new allocations;
- block new executions;
- stop or isolate in-flight work where safe;
- notify owners;
- preserve evidence;
- update Registry state;
- create an incident or review record;
- define reactivation conditions.

---

# 112. Capability Reactivation

Reactivation requires:

- suspension reason resolved;
- remediation evidence;
- updated evaluation;
- valid Tool and Model approvals;
- valid Security review;
- active monitoring;
- available suspension;
- explicit approval.

---

# 113. Capability Deprecation

A capability may be deprecated when:

- replacement exists;
- provider support ends;
- Tool is retired;
- Model is retired;
- Product direction changes;
- capability is no longer economical;
- capability creates unacceptable Risk;
- demand no longer exists.

Deprecated capability should not receive new allocations unless specifically
authorized.

---

# 114. Capability Retirement

Retirement must define:

- reason;
- effective date;
- replacement;
- affected Agents;
- affected Teams;
- affected Products;
- affected Projects;
- open work;
- Data disposition;
- memory disposition;
- Tool revocation;
- Model-route removal;
- evidence retention;
- Registry update;
- archival.

---

# 115. Capability Archival

Archived capability records should preserve:

- identity;
- versions;
- ownership;
- approvals;
- evaluations;
- incidents;
- retirement reason;
- historical dependencies;
- evidence references.

Archived capability must not remain executable.

---

# 116. Capability Registry Relationship

The Capability Registry is the proposed authoritative inventory of capability
definitions.

The Registry should not independently own:

- Tool implementation;
- Model-provider configuration;
- Agent identity;
- Product master Data;
- Project master Data;
- Tenant master Data;
- raw memory storage.

It should reference approved records from those domains.

---

# 117. Skill Registry Relationship

The Skill Registry owns:

- Skill IDs;
- descriptions;
- proficiency;
- evaluation;
- certification;
- eligible Roles;
- lifecycle.

Capabilities reference required Skill IDs.

---

# 118. Tool Registry Relationship

The Tool Registry owns:

- Tool IDs;
- providers;
- versions;
- actions;
- permission models;
- Data scope;
- Risk;
- cost;
- logging;
- suspension.

Capabilities reference approved Tool Profiles.

---

# 119. Model Registry Relationship

The Model Registry owns:

- Model IDs;
- providers;
- versions;
- approved uses;
- prohibited uses;
- Data restrictions;
- region;
- quality;
- cost;
- fallback;
- lifecycle.

Capabilities reference approved Model Profiles.

---

# 120. Role Catalog Relationship

The Role Catalog defines organizational responsibilities.

Capabilities define which Roles may perform specific work.

A capability must not redefine a Role silently.

---

# 121. Agent Registry Relationship

The Agent Registry identifies runtime Agents.

A capability may be assigned only to Agents whose:

- Role is eligible;
- evaluation is current;
- allocation is valid;
- permission is valid;
- state permits execution.

---

# 122. AI Operating System Relationship

The AI Operating System should enforce capability configuration through:

- routing;
- context assembly;
- Tool access;
- Model access;
- workflow execution;
- budget checks;
- evidence collection;
- monitoring;
- suspension.

Capability documentation does not replace runtime enforcement.

---

# 123. Memory Engine Relationship

The Memory Engine enforces technical memory access.

The capability framework defines:

- permitted memory scopes;
- read and write rules;
- retention;
- deletion;
- provenance;
- promotion boundaries.

---

# 124. Multi-Agent System Relationship

The Multi-Agent System may coordinate capabilities across Agents.

Coordination must preserve:

- capability eligibility;
- authority;
- scope;
- Product;
- Project;
- Tenant;
- evidence;
- cost;
- suspension.

---

# 125. Security Platform Relationship

The Security Platform should enforce:

- authentication;
- authorization;
- secrets;
- access controls;
- threat detection;
- audit protection;
- incident controls.

Capabilities must provide sufficient context for enforcement.

---

# 126. Data Platform Relationship

The Data Platform may provide:

- Data classification;
- lineage;
- access policy;
- quality;
- retention;
- analytics;
- reporting.

Capability Data use must follow Data Platform Governance.

---

# 127. Capability Documentation Requirements

Every substantive capability document or Registry record should define:

- ID;
- name;
- version;
- status;
- purpose;
- owner;
- eligible Roles;
- scope;
- Tools;
- Models;
- prompts;
- workflows;
- memory;
- authority;
- permission;
- Risk;
- evaluation;
- evidence;
- cost;
- capacity;
- monitoring;
- suspension;
- lifecycle;
- limitations.

---

# 128. Capability Review Gates

## Gate A — Business Need

Verify the capability solves an approved problem.

## Gate B — Role and Ownership

Verify responsible Roles and owners exist.

## Gate C — Architecture

Verify component and integration boundaries.

## Gate D — Security and Privacy

Verify identity, permissions, Data, memory, Tool, and Model controls.

## Gate E — Quality and Evaluation

Verify measurable acceptance and test requirements.

## Gate F — Cost and Capacity

Verify budgets and operational capacity.

## Gate G — Operations

Verify monitoring, incidents, support, suspension, and recovery.

## Gate H — Approval

Record required domain and Founder decisions.

---

# 129. Capability Production Gate

Before Production activation:

- [ ] capability purpose is approved;
- [ ] capability version is approved;
- [ ] business owner is active;
- [ ] technical owner is active;
- [ ] Security owner is active;
- [ ] quality owner is active;
- [ ] operational owner is active;
- [ ] cost owner is active;
- [ ] eligible Roles are approved;
- [ ] eligible Agents are identified;
- [ ] Tools are approved;
- [ ] Models are approved;
- [ ] prompts are approved;
- [ ] workflows are approved;
- [ ] Data use is approved;
- [ ] memory scope is approved;
- [ ] authority is approved;
- [ ] permissions are verified;
- [ ] evaluation passes;
- [ ] evidence requirements are verified;
- [ ] monitoring is active;
- [ ] audit is active;
- [ ] cost limits are active;
- [ ] incident response is ready;
- [ ] suspension is tested;
- [ ] recovery is tested;
- [ ] Production approval is recorded.

---

# 130. Capability Metrics

Potential metrics include:

## Portfolio

- proposed capabilities;
- approved capabilities;
- implemented capabilities;
- evaluated capabilities;
- available capabilities;
- active capabilities;
- Production-controlled capabilities;
- suspended capabilities;
- deprecated capabilities;
- retired capabilities.

## Quality

- acceptance rate;
- rework rate;
- factual error rate;
- test pass rate;
- evidence completeness;
- Human correction rate.

## Security

- authorization denials;
- Tool-policy violations;
- Model-policy violations;
- isolation failures;
- incidents;
- suspension effectiveness.

## Cost

- cost per invocation;
- cost per accepted outcome;
- cost variance;
- provider concentration;
- Tool cost;
- Human-review cost.

## Operations

- availability;
- failure rate;
- latency;
- retry rate;
- queue age;
- recovery success;
- incident recurrence.

## Value

- Human time saved;
- Product improvement;
- Customer outcome;
- defect reduction;
- reuse rate;
- avoided duplication.

---

# 131. Capability Portfolio Reporting

A capability portfolio report should include:

```text
Capability ID

Name

Owner

Domain

Scope Class

Risk Class

Lifecycle State

Implementation State

Evaluation State

Runtime State

Production State

Eligible Roles

Supported Products

Current Cost

Current Capacity

Open Incidents

Open Exceptions

Next Review
```

---

# 132. Capability Maturity Model

## Level 0 — Proposed

- business idea documented;
- no approved design.

## Level 1 — Designed

- ownership, scope, composition, Risk, and evaluation defined.

## Level 2 — Approved

- Governance and domain approval recorded.

## Level 3 — Implemented

- technical capability exists;
- runtime use not yet proven.

## Level 4 — Evaluated

- bounded evaluation passes.

## Level 5 — Available

- eligible Agents may receive controlled allocation.

## Level 6 — Active

- capability is used in approved live work.

## Level 7 — Production-Controlled

- monitoring, audit, cost, incidents, suspension, and support are active.

## Level 8 — Reusable Multi-Product Capability

- capability supports multiple Products safely.

## Level 9 — Enterprise-Scale Capability

- capability operates reliably across multiple Products, Projects, Tenants,
  Customers, and regions.

---

# 133. Capability Anti-Patterns

Mianx.ai must avoid:

- calling a Model a complete capability;
- calling a Tool a complete capability;
- creating a capability without a business owner;
- creating duplicate capabilities for every Agent;
- granting authority through capability availability;
- using one capability for every Risk class;
- mixing Tenant Data through shared capability context;
- mixing Project memory;
- using unapproved provider fallback;
- allowing capability prompts to bypass runtime policy;
- activating capability before evaluation;
- scaling before monitoring;
- hiding Human-review cost;
- reporting documented capability as active capability;
- keeping deprecated capability executable;
- allowing suspended capability to accept new work;
- changing capability versions silently;
- creating Customer-specific forks without review.

---

# 134. Prohibited Capability Behaviors

A capability must not:

- grant itself authority;
- activate itself;
- change its own Tool profile;
- change its own Model profile;
- change its own permission profile;
- change its own budget;
- access unrelated Products;
- access unrelated Projects;
- access unrelated Tenants;
- expose secrets;
- bypass required review;
- bypass Security;
- bypass privacy;
- fabricate evidence;
- claim unsupported success;
- continue after suspension;
- silently write unverified output to shared Knowledge;
- silently expand Customer scope;
- silently expand Production scope.

---

# 135. Current-State Boundary

This Capability Framework does not prove that Mianx.ai currently has:

- an implemented Capability Registry;
- an implemented Skill Registry;
- an implemented Tool Registry;
- an implemented Model Registry;
- approved capability profiles;
- runtime capability routing;
- capability-based authorization;
- Production capability allocation;
- active capability certification;
- Production Tool-profile enforcement;
- Production Model-profile enforcement;
- capability cost attribution;
- capability monitoring;
- capability suspension;
- active reusable Multi-Project capabilities;
- active Multi-Tenant capabilities;
- Production-controlled AI Workforce capabilities.

Current implementation truth must be read from:

- [`CURRENT-STATE.md`](../CURRENT-STATE.md)
- [`DOCUMENT-STATUS-REGISTRY.md`](../DOCUMENT-STATUS-REGISTRY.md)
- [`EXECUTION-BOARD.md`](../../execution/EXECUTION-BOARD.md)

Capability documentation is not runtime evidence.

---

# 136. Capability Adoption Requirements

This document may become Active only when:

- [ ] Founder approval is recorded.
- [ ] exact approved version is recorded.
- [ ] AI Constitution alignment is confirmed.
- [ ] Enterprise Principles alignment is confirmed.
- [ ] Company Vision alignment is confirmed.
- [ ] Workforce Vision alignment is confirmed.
- [ ] Workforce Strategy alignment is confirmed.
- [ ] Operating Model alignment is confirmed.
- [ ] Workforce Architecture alignment is confirmed.
- [ ] Workforce Governance alignment is confirmed.
- [ ] Workforce Security alignment is confirmed.
- [ ] capability definition is approved.
- [ ] capability categories are approved.
- [ ] ownership model is approved.
- [ ] capability ID standard is approved.
- [ ] capability metadata is approved.
- [ ] discovery and proposal process is approved.
- [ ] approval classes are approved.
- [ ] build-versus-buy process is approved.
- [ ] composition rules are approved.
- [ ] Role and Agent eligibility rules are approved.
- [ ] Skill requirements are approved.
- [ ] Tool and Model profile requirements are approved.
- [ ] prompt and workflow profile requirements are approved.
- [ ] memory, authority, permission, evidence, evaluation, budget, and capacity
      profiles are approved.
- [ ] Product, Project, Tenant, Customer, environment, regional, and Data scopes
      are approved.
- [ ] capability Risk model is approved.
- [ ] Security and privacy requirements are approved.
- [ ] evaluation and certification are approved.
- [ ] monitoring and performance requirements are approved.
- [ ] cost and capacity controls are approved.
- [ ] versioning and change control are approved.
- [ ] suspension, deprecation, retirement, and archival are approved.
- [ ] Registry relationships are approved.
- [ ] Production gates are approved.
- [ ] Enterprise Architecture review is complete.
- [ ] Security and Privacy review is complete.
- [ ] Quality review is complete.
- [ ] Finance review is complete.
- [ ] Platform Operations review is complete.
- [ ] Product review is complete.
- [ ] `INDEX.md` is updated.
- [ ] `ROADMAP.md` is updated.
- [ ] `CHANGELOG.md` is updated.
- [ ] `DOCUMENT-STATUS-REGISTRY.md` is updated.
- [ ] `CANONICAL-DOCUMENT-MAP.md` is updated.

---

# 137. Capability Review Questions

Reviewers should answer:

1. Is a capability clearly distinguished from a Role?
2. Is a capability clearly distinguished from an Agent?
3. Are Skills, Tools, Models, prompts, and workflows separated?
4. Does every capability require a verified business purpose?
5. Is ownership complete?
6. Is the capability identity standard sufficient?
7. Are lifecycle states separated correctly?
8. Is documentation separated from runtime state?
9. Is capability discovery controlled?
10. Is proposal review sufficient?
11. Are approval classes proportionate?
12. Is build-versus-buy addressed?
13. Can capabilities be composed safely?
14. Are atomic and composite capabilities distinguished?
15. Are dependencies explicit?
16. Are eligible Roles and Agents governed?
17. Are Skill proficiency and certification defined?
18. Are Tool Profiles sufficiently restrictive?
19. Are Model Profiles sufficiently restrictive?
20. Are prompt and workflow profiles governed?
21. Are memory and Data scopes explicit?
22. Are authority and permission separated?
23. Are evidence and evaluation requirements sufficient?
24. Are cost and capacity visible?
25. Are Product boundaries explicit?
26. Are Project boundaries explicit?
27. Are Tenant boundaries explicit?
28. Are Customer and environment boundaries explicit?
29. Is contextual Risk handled?
30. Are Security and privacy integrated?
31. Is Production activation independently controlled?
32. Are reuse and extension rules sufficient?
33. Is capability duplication controlled?
34. Are versioning and re-evaluation sufficient?
35. Are suspension, deprecation, and retirement complete?
36. Are Registry relationships clear?
37. Are current-state limitations explicit?
38. Are any unsupported capability claims present?

---

# 138. Capability Definition of Done

This document is complete for review when:

- [ ] purpose is defined;
- [ ] authority status is defined;
- [ ] capability objective is defined;
- [ ] strategic position is defined;
- [ ] principles are defined;
- [ ] capability definition is defined;
- [ ] exclusions are defined;
- [ ] Role, Agent, Skill, Tool, Model, and capability distinctions are defined;
- [ ] capability Architecture is defined;
- [ ] capability domains are defined;
- [ ] capability categories are defined;
- [ ] scope classes are defined;
- [ ] enterprise, department, Product, Project, Tenant, Customer, experimental,
      and emergency capabilities are defined;
- [ ] capability ownership is defined;
- [ ] capability identity and metadata are defined;
- [ ] lifecycle and status model are defined;
- [ ] documentation and runtime states are separated;
- [ ] discovery is defined;
- [ ] gap analysis is defined;
- [ ] proposal and approval are defined;
- [ ] build-versus-buy is defined;
- [ ] atomic and composite capability models are defined;
- [ ] dependencies are defined;
- [ ] eligible Roles and Agents are defined;
- [ ] Skill requirements, proficiency, evaluation, and certification are
      defined;
- [ ] Tool Profiles and eligibility are defined;
- [ ] Model Profiles and eligibility are defined;
- [ ] prompt and workflow profiles are defined;
- [ ] memory, authority, permission, evidence, evaluation, budget, and capacity
      profiles are defined;
- [ ] Product, Project, Tenant, Customer, environment, region, and Data scopes
      are defined;
- [ ] Risk classification is defined;
- [ ] Security, privacy, ethics, and quality are defined;
- [ ] evaluation, certification, availability, allocation, activation, and
      Production control are defined;
- [ ] monitoring, performance, value, cost, capacity, and scaling are defined;
- [ ] capability reuse, Product extension, Industry capability, and Customer
      configuration are defined;
- [ ] duplication, merge, and split controls are defined;
- [ ] versioning and change control are defined;
- [ ] re-evaluation is defined;
- [ ] suspension, reactivation, deprecation, retirement, and archival are
      defined;
- [ ] Capability, Skill, Tool, Model, Role, Agent, AI OS, Memory, Multi-Agent,
      Security, and Data relationships are defined;
- [ ] documentation requirements and review gates are defined;
- [ ] Production gate is defined;
- [ ] metrics, portfolio reporting, and maturity are defined;
- [ ] anti-patterns and prohibited behavior are defined;
- [ ] current-state boundary is defined;
- [ ] adoption requirements are defined;
- [ ] next document is identified.

This document becomes Active only after required review and approval.

---

# 139. Current Documentation Progress

After this document is saved:

```text
Total Planned AI Workforce Documents = 83

Content Complete for Review = 11

Existing Drafts Needing Alignment Review = 3

Empty Placeholders Remaining = 69

Approved Documents = 0

Active Canonical Documents = 0

Implemented Capabilities Proven by Documentation = 0

Active Runtime Capabilities Proven by Documentation = 0

Production AI Workforce Proven by Documentation = NO
```

---

# 140. Current Document Decision

```text
DOCUMENT_ID=AIW-CAPABILITIES-001

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

CAPABILITY_FRAMEWORK_STATUS=PROPOSED

CAPABILITY_REGISTRY_IMPLEMENTATION=NOT_VERIFIED

IMPLEMENTATION_AUTHORIZATION=NOT_GRANTED

RUNTIME_CAPABILITY_ACTIVATION=NOT_AUTHORIZED

PRODUCTION_CAPABILITY_ACTIVATION=NOT_AUTHORIZED
```

---

# 141. Related Documents

- [`README.md`](./README.md)
- [`INDEX.md`](./INDEX.md)
- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`workforce-vision.md`](./workforce-vision.md)
- [`workforce-strategy.md`](./workforce-strategy.md)
- [`workforce-operating-model.md`](./workforce-operating-model.md)
- [`workforce-architecture.md`](./workforce-architecture.md)
- [`workforce-governance.md`](./workforce-governance.md)
- [`workforce-security.md`](./workforce-security.md)
- [`workforce-lifecycle.md`](./workforce-lifecycle.md)
- [`workforce-metrics.md`](./workforce-metrics.md)
- [`workforce-checklists.md`](./workforce-checklists.md)
- [`AGENT-CAPACITY-BASELINE.md`](./AGENT-CAPACITY-BASELINE.md)
- [`C-SUITE-AGENT-REGISTRY.md`](./C-SUITE-AGENT-REGISTRY.md)
- [`VERIFIABLE-WORK-ENVELOPE.md`](./VERIFIABLE-WORK-ENVELOPE.md)
- [`role-catalog.md`](./roles/role-catalog.md)
- [`skill-matrix.md`](./roles/skill-matrix.md)
- [`agent-skills.md`](./agents/agent-skills.md)
- [`agent-tools.md`](./agents/agent-tools.md)
- [`capability-registry.md`](./capabilities/capability-registry.md)
- [`skill-registry.md`](./capabilities/skill-registry.md)
- [`tool-registry.md`](./capabilities/tool-registry.md)
- [`model-registry.md`](./capabilities/model-registry.md)
- [`training-framework.md`](./training/training-framework.md)
- [`evaluation.md`](./training/evaluation.md)
- [`certification.md`](./training/certification.md)
- [`AI-CONSTITUTION.md`](../01-governance/AI-CONSTITUTION.md)
- [`ENTERPRISE-PRINCIPLES.md`](../01-governance/ENTERPRISE-PRINCIPLES.md)
- [`VISION-AND-MISSION.md`](../02-company/VISION-AND-MISSION.md)
- [`MASTER-BLUEPRINT.md`](../20-ai-operating-system/MASTER-BLUEPRINT.md)
- [`MULTI-PROJECT-OPERATING-MODEL.md`](../20-ai-operating-system/MULTI-PROJECT-OPERATING-MODEL.md)
- [`CORE-ARCHITECTURE.md`](../31-enterprise-architecture/CORE-ARCHITECTURE.md)
- [`CURRENT-STATE.md`](../CURRENT-STATE.md)
- [`DOCUMENT-STATUS-REGISTRY.md`](../DOCUMENT-STATUS-REGISTRY.md)
- [`CANONICAL-DOCUMENT-MAP.md`](../CANONICAL-DOCUMENT-MAP.md)
- [`EXECUTION-BOARD.md`](../../execution/EXECUTION-BOARD.md)

---

# 142. Revision History

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1.0 | 2026-08-06 | Draft | Initial AI Workforce Capability Framework outline |
| 1.0.0 | 2026-08-06 | Draft | Defined capability purpose, principles, definitions, Architecture, categories, scope classes, ownership, identity, metadata, lifecycle, discovery, gap analysis, proposal, approval, build-versus-buy, composition, dependencies, Role and Agent eligibility, Skills, Tools, Models, prompts, workflows, memory, authority, permissions, evidence, evaluation, budget, capacity, Product, Project, Tenant, Customer, environment, Data and regional scopes, Risk, Security, privacy, ethics, quality, evaluation, certification, availability, allocation, activation, Production control, monitoring, value, cost, capacity, scaling, reuse, Product and Industry extensions, Customer configuration, duplication control, versioning, change control, suspension, deprecation, retirement, Registry relationships, review gates, metrics, maturity, adoption requirements, and current-state boundaries |

---

# 143. Changelog Entry

Append the following entry to:

```text
doc/19-ai-workforce/CHANGELOG.md
```

```markdown
## AIW-CHG-20260806-011 — AI Workforce Capabilities Completed

| Field | Value |
|---|---|
| Date | 2026-08-06 |
| Change Type | `CREATED`, `STATUS`, `GOVERNANCE` |
| Impact | `I3 — Major` |
| Risk | `R3` |
| Status | Completed |
| Owner | AI Workforce Council and Capability Governance |
| Approver | Pending Founder and Capability Governance Review |

### Affected Documents

- `doc/19-ai-workforce/workforce-capabilities.md`
- `doc/19-ai-workforce/INDEX.md`
- `doc/19-ai-workforce/ROADMAP.md`
- `doc/19-ai-workforce/CHANGELOG.md`

### Previous State

`workforce-capabilities.md` existed as an empty placeholder.

The AI Workforce section had documented Vision, Strategy, Operating Model,
Architecture, Governance, and Security but lacked a complete framework defining
how Roles, Agents, skills, Tools, Models, prompts, workflows, memory, authority,
evaluation, evidence, cost, capacity, and operational controls combine into
approved reusable capabilities.

### New State

The document now defines:

- capability purpose, principles, definition, and exclusions;
- separation between Roles, Agents, skills, Tools, Models, and capabilities;
- capability Architecture, domains, categories, and scope classes;
- enterprise, department, Product, Project, Tenant, Customer, experimental, and
  emergency capabilities;
- business, stewardship, technical, Security, quality, operational, cost, and
  documentation ownership;
- capability IDs, metadata, status, and lifecycle states;
- discovery, gap analysis, proposal, review, and approval;
- build-versus-buy decisions;
- atomic, composite, reusable, Product-specific, and Industry-specific
  capabilities;
- capability dependency controls;
- Role and Agent eligibility;
- Skill proficiency, evaluation, and certification;
- Tool, Model, prompt, workflow, memory, authority, permission, evidence,
  evaluation, budget, and capacity profiles;
- Product, Project, Tenant, Customer, environment, regional, and Data scope;
- Risk, Security, privacy, ethical, and quality requirements;
- capability evaluation, certification, availability, allocation, activation,
  and Production control;
- monitoring, performance, value, cost, capacity, and scaling;
- Product extensions, Industry examples, and Customer configuration;
- duplicate control, merge, split, versioning, and change control;
- suspension, reactivation, deprecation, retirement, and archival;
- Capability, Skill, Tool, Model, Role, Agent, AI Operating System, Memory
  Engine, Multi-Agent System, Security Platform, and Data Platform
  relationships;
- Production gates, metrics, portfolio reporting, maturity, anti-patterns,
  adoption requirements, and current-state boundaries.

### Limitations

- Founder approval is pending.
- Capability Governance review is pending.
- Canonical status remains false.
- Capability Registry implementation is not proven.
- Runtime capability activation is not authorized.
- Production capability operation is not proven.

### Follow-Up

- complete `workforce-lifecycle.md`;
- perform Founder, Capability Governance, Product, Architecture, Security,
  Privacy, Quality, Finance, and Platform Operations review;
- validate all capability-related links;
- update the INDEX content status;
- update Roadmap Stage 2 progress;
- align future Capability, Skill, Tool, and Model Registry documents with this
  framework.
```

---

# 144. Next Document

The next document in the official AI Workforce documentation sequence is:

```text
doc/19-ai-workforce/workforce-lifecycle.md
```

The Workforce Lifecycle document must define:

- lifecycle purpose and authority;
- lifecycle principles;
- lifecycle entities;
- Role lifecycle;
- Capacity Seat lifecycle;
- Agent lifecycle;
- Team lifecycle;
- Department lifecycle;
- capability lifecycle;
- Skill lifecycle;
- Tool lifecycle;
- Model lifecycle;
- prompt lifecycle;
- workflow lifecycle;
- allocation lifecycle;
- delegation lifecycle;
- permission lifecycle;
- memory lifecycle relationships;
- evaluation and certification lifecycle;
- evidence requirements;
- proposal, design, review, approval, implementation, activation, monitoring,
  suspension, reactivation, deprecation, retirement, and archival;
- valid and invalid state transitions;
- lifecycle ownership;
- transition approvals;
- transition evidence;
- lifecycle audits;
- current-state limitations;
- Founder and Governance approval requirements.

---