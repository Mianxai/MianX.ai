---
id: AIOS-CONTEXT-MGMT-001
title: Mianx.ai AI Operating System Context Management Standard
version: 1.0.0
status: Draft

type: Enterprise AI Operating System Runtime Context Identity, Envelope, Binding, Validation, Propagation, Isolation, Integrity, Security, Lifecycle, Evidence, Recovery, and Production Context Management Standard
class: Governed Runtime Context Standard for MianX Core Platform, Mianx.ai AI Operating System, Shared AI Workforce, Industry Operating Systems, Customer Editions, Projects, Customers, Tenants, Workflows, Tasks, Humans, Agents, Models, Tools, Events, Messages, State, and Integrations

owner: Mianx.ai Founder
steward: AI Operating System Governance, Context Engineering, AI Platform Engineering, Enterprise Architecture, Security Governance, Enterprise Operations, and Enterprise Governance
authority: Founder and Enterprise Governance

maintainers:
  - Founder Office
  - Enterprise Governance
  - Enterprise Architecture
  - AI Operating System Governance
  - AI Platform Engineering
  - Context Engineering
  - Runtime Engineering
  - Kernel Engineering
  - Configuration Engineering
  - Prompt OS Engineering
  - Memory Engineering
  - Planning Engineering
  - Reasoning Engineering
  - Decision Systems Engineering
  - Orchestration Engineering
  - Routing Engineering
  - Scheduling Engineering
  - Workflow Engineering
  - Execution Engineering
  - Communication Engineering
  - Event Platform Engineering
  - State Management Engineering
  - Integration Engineering
  - Security Engineering
  - Privacy Governance
  - Ethics Governance
  - Compliance Governance
  - Risk Governance
  - Quality Governance
  - Evidence Governance
  - Observability Engineering
  - Site Reliability Engineering
  - Documentation Governance

reviewers:
  - Founder
  - Founder Office
  - Human Executive Leadership
  - Enterprise Governance
  - Enterprise Architecture
  - AI Operating System Governance
  - AI Platform Engineering
  - Context Engineering
  - Security Governance
  - Privacy Governance
  - Ethics Governance
  - Compliance Governance
  - Risk Governance
  - Quality Governance
  - Evidence Governance
  - Audit Governance
  - Documentation Governance

created: 2026-08-07
updated: 2026-08-07

classification: Internal

audience:
  - Founder
  - Founder Office
  - Enterprise Governance
  - Enterprise Architects
  - AI Platform Engineers
  - Context Engineers
  - Runtime Engineers
  - Kernel Engineers
  - AI Workforce Designers
  - AI Agent Designers
  - Prompt Engineers
  - Memory Engineers
  - Workflow Engineers
  - Execution Engineers
  - Orchestration Engineers
  - Routing Engineers
  - Security Engineers
  - Integration Engineers
  - Observability Engineers
  - SRE Engineers
  - Product Engineers
  - Project Engineers
  - Quality Engineers
  - Auditors
  - Documentation Maintainers

depends_on:
  - ../README.md
  - ../INDEX.md
  - ../ROADMAP.md
  - ../CHANGELOG.md
  - ../os-vision.md
  - ../os-strategy.md
  - ../os-operating-model.md
  - ../os-architecture.md
  - ../os-governance.md
  - ../os-security.md
  - ../os-capabilities.md
  - ../os-lifecycle.md
  - ../os-metrics.md
  - ../os-checklists.md
  - ../MASTER-BLUEPRINT.md
  - ../MULTI-PROJECT-OPERATING-MODEL.md
  - ../configuration/system-configuration.md
  - ../communication/event-messaging.md
  - ../communication/inter-agent-protocol.md
  - ../communication/message-bus.md
  - ../prompt-os/README.md
  - ../security/os-security.md
  - ../../01-governance/AI-CONSTITUTION.md
  - ../../19-ai-workforce/README.md
  - ../../19-ai-workforce/VERIFIABLE-WORK-ENVELOPE.md

related_documents:
  - ./context-sharing.md
  - ../memory-manager/memory-manager.md
  - ../memory-manager/memory-lifecycle.md
  - ../kernel/kernel-api.md
  - ../kernel/kernel-architecture.md
  - ../orchestrator/agent-orchestration.md
  - ../orchestrator/orchestration-model.md
  - ../router/agent-router.md
  - ../router/request-router.md
  - ../scheduler/task-priority.md
  - ../workflow-engine/workflow-definition.md
  - ../workflow-engine/workflow-runtime.md
  - ../execution-engine/execution-model.md
  - ../execution-engine/task-execution.md
  - ../event-bus/event-bus.md
  - ../state-management/state-machine.md
  - ../state-management/state-storage.md
  - ../integrations/internal-services.md
  - ../integrations/external-integrations.md
  - ../monitoring/system-monitoring.md

review_cycle:
  - At Every Material Context Envelope Change
  - At Every Context Identity Change
  - At Every Context Inheritance or Propagation Change
  - At Every Project, Customer, or Tenant Context Boundary Change
  - At Every Agent, Human, Workflow, Task, Session, or Run Context Change
  - At Every Context Switching or Mutation Model Change
  - At Every Prompt, Model, Tool, Memory, Event, Message, State, or Integration Context Change
  - At Every Context Security, Integrity, or Confidentiality Change
  - Before Multi-Project Context Runtime Activation
  - Before Multi-Customer Context Runtime Activation
  - Before Multi-Tenant Context Runtime Activation
  - Before Shared-Agent Multi-Scope Activation
  - Before Production Context Management Authorization
  - After Critical Context Leakage, Context Confusion, Stale Context, Scope Switch, Authorization, Isolation, or Data Exposure Incident
  - Quarterly During Active Build
  - Annually During Stable Operation
  - Before Canonical Promotion

context_horizon:
  current: Target-State Governed Runtime Context Standard
  near_term: Controlled Context Creation, Validation, Binding, Propagation, and Evidence
  medium_term: Verified Multi-Project, Multi-Customer, Multi-Tenant Context Isolation
  long_term: Production-Controlled Context Fabric for Autonomous Enterprise Execution

canonical: false
---

# Mianx.ai AI Operating System Context Management Standard

> **This document defines the governed runtime Context model for the
> Mianx.ai AI Operating System. Context determines who or what is acting,
> under which Role, in which environment, Product, Project, Customer,
> Tenant, Workflow, Task, Session, and Run, under which authority,
> Approval, delegation, classification, and trace lineage.**
>
> **Context is a security and execution boundary. It is not merely metadata
> and it must never be treated as an informal prompt variable. Missing,
> stale, forged, mixed, or unauthorized Context can create cross-Project,
> cross-Customer, cross-Tenant, Tool, Model, Memory, Workflow, or authority
> failures.**
>
> **This document defines the target-state Context Management contract. It
> does not prove that a Production Context Manager, Context Registry,
> Context signing mechanism, Context cache, Context propagation runtime, or
> Customer/Tenant Context isolation currently exists.**

---

# 1. Purpose

The Context Management Standard must answer:

```text
WHO OR WHAT IS ACTING?

IS THE ACTOR HUMAN, AGENT, OR SERVICE?

WHICH ROLE?

WHICH DEPARTMENT OR TEAM?

WHICH PRODUCT?

WHICH PROJECT?

WHICH CUSTOMER?

WHICH TENANT?

WHICH WORKSPACE?

WHICH WORKFLOW?

WHICH TASK?

WHICH SESSION?

WHICH RUN?

WHICH ENVIRONMENT?

WHICH AGENT VERSION?

WHICH AGENT INSTANCE?

WHAT AUTHORITY APPLIES?

WHICH APPROVAL APPLIES?

WHICH DELEGATION APPLIES?

WHAT CAUSED THIS ACTION?

WHICH BROADER FLOW DOES IT BELONG TO?

WHERE DID THIS CONTEXT COME FROM?

IS IT VALID?

IS IT CURRENT?

IS IT AUTHORIZED?

MAY IT BE INHERITED?

MAY IT BE SHARED?

MAY IT BE MUTATED?

MAY THE PROJECT CHANGE?

MAY THE CUSTOMER CHANGE?

MAY THE TENANT CHANGE?

WHEN DOES IT EXPIRE?

HOW IS IT REVOKED?

HOW IS ITS INTEGRITY VERIFIED?

HOW IS SENSITIVE CONTEXT PROTECTED?

HOW IS CONTEXT LEAKAGE PREVENTED?

HOW IS THE EXACT EXECUTION CONTEXT RECONSTRUCTED?

WHAT MUST BE PROVEN BEFORE PRODUCTION?
```

---

# 2. Current Authority Status

```text
DOCUMENT_ID=AIOS-CONTEXT-MGMT-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

ENTERPRISE_GOVERNANCE_APPROVAL=PENDING

TARGET_STATE_CONTEXT_MANAGEMENT=DEFINED

CONTEXT_AUTHORITY_MODEL=DEFINED_TARGET_STATE

CONTEXT_IDENTITY_MODEL=DEFINED_TARGET_STATE

CONTEXT_ENVELOPE=DEFINED_TARGET_STATE

ACTOR_CONTEXT=DEFINED_TARGET_STATE

HUMAN_CONTEXT=DEFINED_TARGET_STATE

AGENT_CONTEXT=DEFINED_TARGET_STATE

SERVICE_CONTEXT=DEFINED_TARGET_STATE

ROLE_CONTEXT=DEFINED_TARGET_STATE

DEPARTMENT_CONTEXT=DEFINED_TARGET_STATE

PRODUCT_CONTEXT=DEFINED_TARGET_STATE

PROJECT_CONTEXT=DEFINED_TARGET_STATE

CUSTOMER_CONTEXT=DEFINED_TARGET_STATE

TENANT_CONTEXT=DEFINED_TARGET_STATE

WORKSPACE_CONTEXT=DEFINED_TARGET_STATE

WORKFLOW_CONTEXT=DEFINED_TARGET_STATE

TASK_CONTEXT=DEFINED_TARGET_STATE

SESSION_CONTEXT=DEFINED_TARGET_STATE

RUN_CONTEXT=DEFINED_TARGET_STATE

ENVIRONMENT_CONTEXT=DEFINED_TARGET_STATE

CORRELATION_CONTEXT=DEFINED_TARGET_STATE

CAUSATION_CONTEXT=DEFINED_TARGET_STATE

TRACE_CONTEXT=DEFINED_TARGET_STATE

AUTHORITY_REFERENCE_MODEL=DEFINED_TARGET_STATE

APPROVAL_REFERENCE_MODEL=DEFINED_TARGET_STATE

DELEGATION_REFERENCE_MODEL=DEFINED_TARGET_STATE

CONTEXT_CLASSIFICATION=DEFINED_TARGET_STATE

CONTEXT_PROVENANCE=DEFINED_TARGET_STATE

CONTEXT_CREATION=DEFINED_TARGET_STATE

CONTEXT_VALIDATION=DEFINED_TARGET_STATE

CONTEXT_BINDING=DEFINED_TARGET_STATE

CONTEXT_INHERITANCE=DEFINED_TARGET_STATE

CONTEXT_PROPAGATION=DEFINED_TARGET_STATE

CONTEXT_MUTATION=DEFINED_TARGET_STATE

CONTEXT_SWITCHING=DEFINED_TARGET_STATE

PROJECT_SWITCHING=DEFINED_TARGET_STATE

CUSTOMER_SWITCHING=DEFINED_TARGET_STATE

TENANT_SWITCHING=DEFINED_TARGET_STATE

CONTEXT_EXPIRATION=DEFINED_TARGET_STATE

CONTEXT_REFRESH=DEFINED_TARGET_STATE

CONTEXT_REVOCATION=DEFINED_TARGET_STATE

CONTEXT_INTEGRITY=DEFINED_TARGET_STATE

CONTEXT_CONFIDENTIALITY=DEFINED_TARGET_STATE

CONTEXT_MINIMIZATION=DEFINED_TARGET_STATE

PROMPT_CONTEXT=DEFINED_TARGET_STATE

MODEL_CONTEXT=DEFINED_TARGET_STATE

TOOL_CONTEXT=DEFINED_TARGET_STATE

MEMORY_CONTEXT=DEFINED_TARGET_STATE

WORKFLOW_CONTEXT_PROPAGATION=DEFINED_TARGET_STATE

EVENT_CONTEXT_PROPAGATION=DEFINED_TARGET_STATE

MESSAGE_CONTEXT_PROPAGATION=DEFINED_TARGET_STATE

STATE_CONTEXT_PROPAGATION=DEFINED_TARGET_STATE

INTEGRATION_CONTEXT_PROPAGATION=DEFINED_TARGET_STATE

PROJECT_CONTEXT_ISOLATION=DEFINED_TARGET_STATE

CUSTOMER_CONTEXT_ISOLATION=DEFINED_TARGET_STATE

TENANT_CONTEXT_ISOLATION=DEFINED_TARGET_STATE

SHARED_AGENT_CONTEXT_SEPARATION=DEFINED_TARGET_STATE

CONTEXT_LEAKAGE_PREVENTION=DEFINED_TARGET_STATE

CONTEXT_CONFUSION_PREVENTION=DEFINED_TARGET_STATE

STALE_CONTEXT_PREVENTION=DEFINED_TARGET_STATE

CONTEXT_CACHE_MODEL=DEFINED_TARGET_STATE

CONTEXT_PERSISTENCE_MODEL=DEFINED_TARGET_STATE

CONTEXT_RECONSTRUCTION=DEFINED_TARGET_STATE

CONTEXT_RECOVERY=DEFINED_TARGET_STATE

CONTEXT_OBSERVABILITY=DEFINED_TARGET_STATE

CONTEXT_METRICS=DEFINED_TARGET_STATE

CONTEXT_EVIDENCE=DEFINED_TARGET_STATE

CONTEXT_AUDITABILITY=DEFINED_TARGET_STATE

CONTEXT_VERSIONING=DEFINED_TARGET_STATE

CONTEXT_COMPATIBILITY=DEFINED_TARGET_STATE

PRODUCTION_CONTEXT_MANAGEMENT_GATE=DEFINED_TARGET_STATE

CONTEXT_MANAGER_RUNTIME=NOT_IMPLEMENTED

CONTEXT_REGISTRY_RUNTIME=NOT_PROVEN

CONTEXT_PROPAGATION_RUNTIME=NOT_PROVEN

CONTEXT_INTEGRITY_RUNTIME=NOT_PROVEN

CONTEXT_REVOCATION_RUNTIME=NOT_PROVEN

PROJECT_CONTEXT_ISOLATION_RUNTIME=NOT_PROVEN

CUSTOMER_CONTEXT_ISOLATION_RUNTIME=NOT_PROVEN

TENANT_CONTEXT_ISOLATION_RUNTIME=NOT_PROVEN

SHARED_AGENT_CONTEXT_SEPARATION_RUNTIME=NOT_PROVEN

PRODUCTION_CONTEXT_MANAGEMENT_GATE_PASSED=NO

PRODUCTION_AI_OS=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

---

# 3. Strategic Placement

Context Management operates within:

```text
Mianx.ai Company and Governance
↓
MianX Core Platform
↓
Mianx.ai AI Operating System
↓
Shared AI Workforce
↓
Industry Operating Systems
↓
Customer Editions
↓
Autonomous Enterprise Creation at Scale
```

Context is a shared AI OS capability.

Industry Operating Systems and Customer Editions may add domain Context,
but they must not weaken Core isolation or authority rules.

---

# 4. Core Context Principle

Every material action should be understood as:

```text
ACTOR
+
ROLE
+
AUTHORITY
+
ENVIRONMENT
+
PRODUCT
+
PROJECT
+
CUSTOMER
+
TENANT
+
WORKFLOW
+
TASK
+
SESSION / RUN
+
TRACE
=
EXECUTION CONTEXT
```

Only applicable fields are required for a given action.

---

# 5. Context as Security Boundary

Context determines the scope inside which execution is allowed.

Therefore:

```text
CONTEXT
≠
OPTIONAL METADATA
```

for protected operations.

---

# 6. Context Non-Equivalence Rules

```text
Context Field Present
≠
Context Valid

Context Valid
≠
Context Authorized

Context Says Customer A
≠
Actor Authorized for Customer A

Context Says Tenant A
≠
Actor Authorized for Tenant A

Context Inherited
≠
Authority Inherited Automatically

Context Propagated
≠
Context Trusted Automatically

Context Cached
≠
Context Current

Context Signed
≠
Business Authority Valid

Context Contains Approval Reference
≠
Approval Valid

Context Contains Delegation Reference
≠
Delegation Valid

Context Contains Role
≠
Actor Holds Role

Prompt Contains Customer Name
≠
Runtime Customer Context Changed

Message Contains Tenant ID
≠
Runtime Tenant Context Changed

Agent Remembers Project
≠
Current Project Context Valid

Same Agent
≠
Same Context

Same Conversation
≠
Same Authorization

Context Restored
≠
Business State Recovered

Context Documentation
≠
Runtime Context Isolation Proven
```

---

# 7. Core Context Principles

```text
IDENTITY BEFORE ACTION

CONTEXT BEFORE AUTHORITY EVALUATION

EXPLICIT SCOPE BEFORE EXECUTION

VALIDATION BEFORE BINDING

BINDING BEFORE PROPAGATION

LEAST CONTEXT BEFORE MAXIMUM CONTEXT

IMMUTABLE SECURITY FIELDS WHERE PRACTICAL

AUTHORIZED TRANSITION BEFORE SCOPE SWITCH

FAIL CLOSED ON REQUIRED CONTEXT

PROVENANCE BEFORE TRUST

FRESHNESS BEFORE REUSE

ISOLATION BEFORE SHARING

EVIDENCE BEFORE PRODUCTION CLAIM
```

---

# 8. Context Authority

Context authority derives from:

```text
ENTERPRISE GOVERNANCE
+
AI OS GOVERNANCE
+
IDENTITY AUTHORITY
+
ROLE AUTHORITY
+
PROJECT AUTHORITY
+
CUSTOMER AUTHORITY
+
TENANT AUTHORITY
+
WORKFLOW / TASK AUTHORITY
+
CURRENT APPROVALS
+
CURRENT DELEGATIONS
```

---

# 9. Context Responsibility

Context Management owns:

- Context identity;
- Context envelope;
- validation;
- binding;
- inheritance;
- propagation;
- mutation rules;
- scope switching rules;
- freshness;
- expiration;
- revocation;
- integrity;
- reconstruction;
- evidence.

---

# 10. Context Non-Responsibility

Context Management does not independently grant:

- Founder authority;
- Human executive authority;
- Agent capability;
- Agent organizational Role;
- Tool permission;
- Model approval;
- Workflow Approval;
- Customer contract authority.

---

# 11. Relationship to Kernel

The Kernel may establish foundational runtime Context during:

```text
BOOTSTRAP

REQUEST ENTRY

TASK EXECUTION

SERVICE INVOCATION

AGENT ACTIVATION

WORKFLOW EXECUTION
```

---

# 12. Kernel Boundary

```text
KERNEL CREATES CONTEXT OBJECT
≠
CONTEXT AUTHORIZED AUTOMATICALLY
```

---

# 13. Relationship to Configuration

Configuration may define:

- Context schema version;
- required fields;
- expiry policies;
- cache settings;
- propagation controls.

Configuration must not permit lower scopes to disable hard Context
isolation.

---

# 14. Relationship to Governance

Governance determines:

```text
WHO MAY ACT

IN WHICH SCOPE

UNDER WHICH ROLE

WITH WHICH AUTHORITY

UNDER WHICH APPROVAL
```

Context carries the runtime references required to evaluate those rules.

---

# 15. Relationship to Security

Security requires Context to participate in:

- authorization;
- isolation;
- credential scoping;
- audit;
- Tool access;
- Model access;
- Data access.

---

# 16. Relationship to Prompt OS

Prompt OS may receive approved Context for prompt compilation.

Prompt OS must not become the source of protected runtime Context.

---

# 17. Prompt Boundary

```text
PROMPT TEXT:
"You are working for Customer B"
≠
RUNTIME CUSTOMER CONTEXT = Customer B
```

---

# 18. Runtime Context vs LLM Context Window

These are different concepts.

```text
RUNTIME CONTEXT
=
GOVERNED EXECUTION SCOPE

LLM CONTEXT WINDOW
=
MODEL INPUT TOKEN CONTENT
```

The LLM context window may contain Runtime Context data, but it does not
define authoritative runtime scope.

---

# 19. Context Identity

Every material Context instance should have:

```text
context_id
```

---

# 20. Context Version

Every Context envelope should identify:

```text
context_version
```

or schema version where applicable.

---

# 21. Context Envelope

Target conceptual envelope:

```yaml
context:
  context_id: required
  context_version: required

  created_at: required
  expires_at: conditional

  environment:
    environment_id: required

  actor:
    actor_type: required
    actor_id: required

    human_id: conditional

    agent_id: conditional
    agent_version: conditional
    agent_instance_id: conditional

    service_id: conditional
    service_version: conditional

  organization:
    role_id: conditional
    team_id: conditional
    department_id: conditional

  scope:
    product_id: conditional
    project_id: conditional
    customer_id: conditional
    tenant_id: conditional
    workspace_id: conditional

  execution:
    workflow_definition_id: conditional
    workflow_version: conditional
    workflow_instance_id: conditional
    task_id: conditional

    session_id: conditional
    run_id: conditional

  tracing:
    correlation_id: required
    causation_id: conditional
    trace_id: conditional

  authority:
    authority_reference: conditional
    approval_reference: conditional
    delegation_reference: conditional

  data:
    classification: required

  provenance:
    source_type: required
    source_id: required

  integrity:
    integrity_reference: conditional

  metadata:
    parent_context_id: conditional
    refreshed_from_context_id: conditional
```

Exact wire schema requires implementation approval.

---

# 22. Context Envelope Principle

The envelope should separate:

```text
ACTOR

ORGANIZATIONAL IDENTITY

SCOPE

EXECUTION IDENTITY

TRACE

AUTHORITY REFERENCES

CLASSIFICATION

PROVENANCE

INTEGRITY
```

---

# 23. Actor Context

Every material action must identify an actor.

Potential actor types:

```text
HUMAN

AGENT

SERVICE

SYSTEM
```

---

# 24. Human Context

Human Context should identify:

```text
human_id

session_id

role_id

scope
```

where applicable.

---

# 25. Human Context Boundary

```text
HUMAN AUTHENTICATED
≠
HUMAN AUTHORIZED FOR ALL CUSTOMERS
```

---

# 26. Agent Context

Agent Context should identify:

```text
agent_id

agent_version

agent_instance_id
```

---

# 27. Agent Definition Context

`agent_id` identifies the governed Agent definition.

---

# 28. Agent Version Context

`agent_version` identifies the exact Agent version participating in
execution.

---

# 29. Agent Instance Context

`agent_instance_id` identifies the runtime instance.

---

# 30. Shared Agent Boundary

The same Agent definition may serve multiple Projects or Customers.

Each execution must remain separately Context-bound.

```text
SAME AGENT ID
≠
SAME PROJECT

SAME AGENT ID
≠
SAME CUSTOMER

SAME AGENT ID
≠
SAME TENANT
```

---

# 31. Service Context

Service-to-service actions should identify:

```text
service_id

service_version
```

where required.

---

# 32. Role Context

Role Context may identify the Role under which an actor is operating.

---

# 33. Role Validation

A Role present in Context must be validated against authoritative identity
and Governance sources.

---

# 34. Role Boundary

```text
role_id = admin
≠
ACTOR IS ADMIN
```

without authoritative validation.

---

# 35. Team Context

Team membership may be represented where operationally relevant.

---

# 36. Department Context

Department Context may identify:

```text
department_id
```

for routing, ownership, or policy purposes.

---

# 37. Organizational Boundary

Team or Department identity must not become an unrestricted Data-access
shortcut.

---

# 38. Product Context

Product Context identifies the Mianx.ai Product or Industry Operating System
under execution.

---

# 39. Project Context

Project Context identifies the exact Project.

For Project-scoped work:

```text
project_id
```

is mandatory.

---

# 40. Project Context Boundary

```text
PROJECT A
≠
PROJECT B
```

even when both use the same:

- Agent;
- service;
- Tool;
- Model;
- Workflow template.

---

# 41. Customer Context

Customer Context identifies the exact Customer.

For Customer-scoped work:

```text
customer_id
```

is mandatory.

---

# 42. Customer Context Boundary

```text
CUSTOMER A
≠
CUSTOMER B
```

under all shared runtime components.

---

# 43. Tenant Context

Tenant Context identifies a sub-scope inside a Customer where tenancy
applies.

---

# 44. Tenant Parent Rule

A Tenant must be valid under its parent Customer.

Conceptually:

```text
tenant.customer_id
=
context.customer_id
```

---

# 45. Tenant Boundary

```text
CUSTOMER A / TENANT A
≠
CUSTOMER A / TENANT B
```

---

# 46. Workspace Context

Workspace Context may identify a logical workspace inside a Project or
Customer scope.

Its hierarchy must be explicit.

---

# 47. Workflow Context

Workflow Context should include:

```text
workflow_definition_id

workflow_version

workflow_instance_id
```

where applicable.

---

# 48. Task Context

Task execution should carry:

```text
task_id
```

---

# 49. Workflow/Task Boundary

A Task cannot silently migrate to another Workflow or scope because an
Agent references another identifier in text.

---

# 50. Session Context

A session groups related runtime interactions.

---

# 51. Run Context

A Run represents one bounded execution attempt or operational run.

Potential:

```text
run_id
```

---

# 52. Session vs Run

```text
SESSION
=
BROADER INTERACTION CONTEXT

RUN
=
SPECIFIC EXECUTION INSTANCE
```

---

# 53. Environment Context

Every material protected action should identify environment.

---

# 54. Environment Boundary

```text
STAGING CONTEXT
≠
PRODUCTION CONTEXT
```

---

# 55. Correlation Context

`correlation_id` links a broader execution flow.

---

# 56. Causation Context

`causation_id` identifies the immediate predecessor that caused the current
action.

---

# 57. Trace Context

`trace_id` may integrate with distributed tracing.

---

# 58. Authority Reference

Context may include:

```text
authority_reference
```

for traceability.

It is a reference, not self-validating authority.

---

# 59. Approval Reference

Context may include:

```text
approval_reference
```

when protected work depends on Approval.

---

# 60. Approval Validation

Approval must be checked for:

- current validity;
- scope;
- exact action;
- expiry;
- revocation.

---

# 61. Delegation Reference

Delegated work may include:

```text
delegation_reference
```

---

# 62. Delegation Boundary

```text
DELEGATION REFERENCE PRESENT
≠
DELEGATION VALID
```

---

# 63. Context Classification

Context should carry or derive Data classification sufficient to govern:

- storage;
- transmission;
- logging;
- sharing;
- retention.

---

# 64. Context Source

Every Context should have an attributable source.

Potential source types:

```text
AUTHENTICATED REQUEST

WORKFLOW

TASK

AGENT RUNTIME

SERVICE

MESSAGE

EVENT

SYSTEM
```

---

# 65. Context Provenance

Provenance answers:

```text
WHERE DID THIS CONTEXT COME FROM?

WHAT PARENT CONTEXT CREATED IT?

WHICH TRANSFORMATION OCCURRED?
```

---

# 66. Provenance Boundary

```text
CONTEXT HAS VALID SHAPE
≠
CONTEXT HAS TRUSTED PROVENANCE
```

---

# 67. Parent Context

A derived Context may reference:

```text
parent_context_id
```

---

# 68. Context Creation

Target creation sequence:

```text
IDENTIFY ACTOR
↓
AUTHENTICATE ACTOR
↓
IDENTIFY REQUESTED SCOPE
↓
VALIDATE SCOPE
↓
RESOLVE ROLE / AUTHORITY REFERENCES
↓
BUILD CONTEXT
↓
VALIDATE ENVELOPE
↓
BIND CONTEXT
↓
GENERATE EVIDENCE
```

---

# 69. Context Creation Authority

Only trusted runtime components should create authoritative protected
Context.

---

# 70. User-Supplied Context

User or external input may request a scope.

It must not directly become trusted Context without validation.

---

# 71. Agent-Supplied Context

An Agent may request or propose Context.

It must not self-create new protected authority.

---

# 72. Message-Supplied Context

Messages may carry Context metadata.

Receiving systems must validate it against current authority.

---

# 73. Event-Supplied Context

Events may carry historical Context.

Historical Context does not automatically authorize new current actions.

---

# 74. Mandatory Context Fields

Mandatory fields depend on action class.

Examples:

```text
ACTOR
ENVIRONMENT
CORRELATION
```

may be broadly required.

Protected Customer operations additionally require:

```text
CUSTOMER
```

Protected Tenant operations additionally require:

```text
TENANT
```

---

# 75. Optional Context Fields

Optional fields must not become hidden mandatory dependencies.

---

# 76. Context Validation

Context validation should evaluate:

```text
SCHEMA

IDENTITY

SCOPE

RELATIONSHIPS

AUTHORITY REFERENCES

APPROVAL REFERENCES

DELEGATION REFERENCES

FRESHNESS

EXPIRY

REVOCATION

CLASSIFICATION

INTEGRITY
```

---

# 77. Schema Validation

Context envelope must match supported schema/version.

---

# 78. Identity Validation

Actor identity must match authenticated runtime identity.

---

# 79. Scope Validation

Validate:

```text
PROJECT EXISTS

CUSTOMER EXISTS

TENANT EXISTS

TENANT BELONGS TO CUSTOMER

WORKFLOW BELONGS TO SCOPE

TASK BELONGS TO WORKFLOW/SCOPE
```

where applicable.

---

# 80. Relationship Validation

Context fields must form a valid hierarchy.

Example:

```text
Tenant T
must belong to
Customer C
```

---

# 81. Authority Validation

Context must not be accepted solely because it contains authority fields.

Runtime authority must be validated independently.

---

# 82. Freshness Validation

Protected Context should be checked for current validity before material
actions.

---

# 83. Context Binding

Binding associates a validated Context with an execution.

---

# 84. Binding Targets

Context may bind to:

- request;
- Agent execution;
- Workflow Instance;
- Task;
- Tool call;
- Model call;
- Event;
- Message;
- state transition;
- integration request.

---

# 85. Binding Boundary

```text
CONTEXT OBJECT EXISTS
≠
EXECUTION IS BOUND TO IT
```

---

# 86. Context Immutability

Security-critical Context fields should be immutable within a bound
execution where practical.

Potential immutable fields:

```text
actor_id

environment_id

project_id

customer_id

tenant_id

run_id
```

depending on operation.

---

# 87. Mutable Context

Some Context values may be enriched during execution.

Examples:

- trace data;
- evidence references;
- non-authoritative operational metadata.

---

# 88. Mutation Boundary

```text
MUTABLE METADATA
≠
MUTABLE SECURITY SCOPE
```

---

# 89. Context Inheritance

A child execution may inherit approved fields from a parent Context.

---

# 90. Inheritance Rule

Inheritance should be explicit by field.

Example:

```text
CHILD TASK

inherits:
  Project
  Customer
  Tenant
  Workflow

does not automatically inherit:
  temporary Approval
  unrestricted Tool authority
```

---

# 91. Authority Inheritance Boundary

```text
CONTEXT INHERITED
≠
ALL AUTHORITY INHERITED
```

---

# 92. Context Propagation

Propagation carries Context across runtime boundaries.

Examples:

```text
SERVICE → SERVICE

WORKFLOW → TASK

TASK → AGENT

AGENT → TOOL

AGENT → MODEL

SERVICE → EVENT

SERVICE → MESSAGE
```

---

# 93. Propagation Principle

Only required Context should propagate.

---

# 94. Context Minimization

Do not propagate the entire Context when a downstream component needs only a
subset.

---

# 95. Downstream Revalidation

Receiving components should independently validate protected Context fields
when required.

---

# 96. Propagation Boundary

```text
UPSTREAM VALIDATED
≠
DOWNSTREAM NEVER NEEDS TO VALIDATE
```

---

# 97. Context Mutation

Protected Context mutation should require an explicit operation and
authority.

---

# 98. Context Switch

A Context switch changes one or more protected scope dimensions.

Examples:

- Project A → Project B;
- Customer A → Customer B;
- Tenant A → Tenant B.

---

# 99. Switch Principle

A protected switch should create:

```text
NEW VALIDATED CONTEXT
```

rather than silently editing an existing bound Context.

---

# 100. Project Switching

Project switching should require:

```text
ACTOR AUTHORIZED FOR TARGET PROJECT
+
TARGET PROJECT VALID
+
CURRENT EXECUTION ALLOWS SWITCH
=
NEW PROJECT CONTEXT ELIGIBLE
```

---

# 101. Customer Switching

Customer switching is a high-risk scope transition.

It must require independent validation.

---

# 102. Customer Switch Hard Rule

```text
NATURAL LANGUAGE REQUEST
=
INSUFFICIENT
FOR CUSTOMER SWITCH
```

---

# 103. Tenant Switching

Tenant switching requires:

- target Tenant valid;
- parent Customer valid;
- actor authorized;
- execution allows transition.

---

# 104. Tenant Switch Hard Rule

```text
SAME CUSTOMER
≠
FREE TENANT SWITCHING
```

---

# 105. Scope Switch Evidence

Every material protected switch should preserve:

```text
SOURCE CONTEXT

TARGET CONTEXT

ACTOR

AUTHORITY

REASON

TIMESTAMP

RESULT
```

---

# 106. Fail-Closed Context Rule

For required protected fields:

```text
MISSING
OR
INVALID
OR
AMBIGUOUS
=
DENY / NOT READY / ESCALATE
```

as appropriate.

---

# 107. Context Expiration

Context may expire based on:

- session lifetime;
- run lifetime;
- Approval lifetime;
- delegation lifetime;
- identity session lifetime;
- policy.

---

# 108. Expiry Boundary

```text
CONTEXT EXPIRED
≠
UNDERLYING ENTITY DELETED
```

---

# 109. Expired Context Rule

Expired Context must not be reused for protected actions without refresh or
re-creation.

---

# 110. Context Refresh

Refresh creates or validates a new current Context from an earlier one.

---

# 111. Refresh Requirements

Refresh should revalidate:

- identity;
- Role;
- authority;
- Approval;
- delegation;
- Project;
- Customer;
- Tenant.

---

# 112. Refresh Boundary

```text
OLD CONTEXT VALID ONCE
≠
OLD CONTEXT VALID FOREVER
```

---

# 113. Context Revocation

A Context may become invalid before expiry due to:

- user logout;
- Agent suspension;
- Role removal;
- Project closure;
- Customer suspension;
- Tenant suspension;
- Approval revocation;
- delegation revocation;
- Security incident.

---

# 114. Revocation Propagation

Critical revocation should prevent continued protected execution using stale
cached Context.

---

# 115. Context Integrity

Context integrity should prevent unauthorized modification.

Potential controls:

- authenticated transport;
- signed tokens where appropriate;
- hashes;
- integrity references;
- trusted service boundaries.

---

# 116. Signed Context Boundary

```text
CRYPTOGRAPHICALLY VALID
≠
CURRENTLY AUTHORIZED
```

A signed Context may still be:

- expired;
- revoked;
- superseded.

---

# 117. Context Confidentiality

Sensitive Context fields should be exposed only to components that require
them.

---

# 118. Sensitive Context

Potential sensitive Context includes:

- Customer identities;
- Tenant identities;
- privileged Role;
- Approval references;
- delegation references;
- internal security metadata.

---

# 119. Context Redaction

Logs and user-visible errors should avoid exposing unnecessary protected
Context.

---

# 120. Context Data Minimization

Context should contain only fields required for the execution or control
purpose.

---

# 121. Prompt Context

Prompt Context is the approved subset of Runtime Context supplied to Prompt
OS or a Model.

---

# 122. Prompt Context Rule

Prompt Context should not include:

- raw credentials;
- unrestricted hidden authority data;
- unrelated Customer data;
- unrelated Tenant data.

---

# 123. Prompt Context Boundary

```text
PROMPT CONTEXT
IS A VIEW OF
RUNTIME CONTEXT

PROMPT CONTEXT
IS NOT
THE AUTHORITY SOURCE
```

---

# 124. Model Context

Model Context includes the governed subset of Context required for a Model
request.

---

# 125. Model Context Rule

Model Context must respect:

- Model Data policy;
- Customer restrictions;
- Tenant restrictions;
- Data classification;
- minimization.

---

# 126. Model Context Boundary

```text
MODEL RECEIVES CUSTOMER CONTEXT
≠
MODEL MAY ACCESS ALL CUSTOMER DATA
```

---

# 127. Tool Context

Tool Context should identify the exact scope of a Tool call.

Potential fields:

```text
actor

project

customer

tenant

workflow

task

tool operation

authority reference
```

---

# 128. Tool Context Boundary

```text
TOOL CONTEXT PRESENT
≠
TOOL AUTHORIZATION VALID
```

---

# 129. Memory Context

Memory reads and writes should use Context to determine:

- Project scope;
- Customer scope;
- Tenant scope;
- classification;
- actor authority.

---

# 130. Memory Context Hard Rule

```text
MEMORY QUERY
WITHOUT REQUIRED CUSTOMER/TENANT CONTEXT
=
DENY
```

for protected scoped memory.

---

# 131. Workflow Context

Workflow Context must remain stable for the Workflow Instance unless a
governed transition explicitly creates a new scope.

---

# 132. Task Context

Child Tasks should inherit required Workflow scope and then add Task-specific
identity.

---

# 133. Event Context

Events should preserve the applicable Context of the occurrence.

---

# 134. Event Context Boundary

Historical Event Context must not automatically become current authority.

---

# 135. Message Context

Messages should carry sufficient Context for:

- routing;
- isolation;
- authorization;
- audit.

---

# 136. Message Context Boundary

Message content must not override protected envelope Context.

---

# 137. State Context

Persistent state should preserve scope keys sufficient to prevent
cross-scope retrieval.

---

# 138. State Context Hard Rule

Protected Customer/Tenant state must not rely only on caller-provided
filters without enforced isolation controls.

---

# 139. Integration Context

External integration calls should identify exact:

- Project;
- Customer;
- Tenant;
- credential reference;
- authority scope.

---

# 140. Integration Context Boundary

```text
INTEGRATION AVAILABLE
≠
CURRENT CONTEXT AUTHORIZED TO USE IT
```

---

# 141. Context Isolation

Context isolation ensures one scope cannot silently inherit or observe
another protected scope.

---

# 142. Project Context Isolation

Protected Project A execution must not access Project B Context without
explicit cross-Project authority.

---

# 143. Customer Context Isolation

Customer A Context must remain isolated from Customer B throughout:

```text
REQUEST

WORKFLOW

TASK

AGENT

MODEL

TOOL

MEMORY

EVENT

MESSAGE

STATE

INTEGRATION

LOG

EVIDENCE
```

---

# 144. Tenant Context Isolation

Tenant A Context must remain isolated from Tenant B across all applicable
runtime layers.

---

# 145. Shared Agent Context Separation

For a Shared Agent:

```text
RUN 1:
Customer A / Tenant A

RUN 2:
Customer B / Tenant B
```

must remain independent even if both use the same Agent definition and
Agent version.

---

# 146. Shared Agent Memory Boundary

An Agent must not carry ungoverned Customer A memory into Customer B
execution merely because it previously handled Customer A.

---

# 147. Shared Tool Context Separation

A shared Tool client must resolve credentials and scope for the current
Context, not previous execution Context.

---

# 148. Shared Model Context Separation

Model request construction must use only the current authorized Context.

---

# 149. Context Leakage

Context leakage occurs when protected scope or Data moves into another
unauthorized Context.

---

# 150. Leakage Examples

Examples include:

- Customer A ID appears in Customer B prompt;
- Tenant A memory appears in Tenant B task;
- Project A Tool credential reused in Project B;
- prior Agent session data contaminates current Customer run.

---

# 151. Leakage Prevention

Target controls include:

- explicit Context binding;
- scoped storage;
- scoped caches;
- scoped credentials;
- validated propagation;
- Context clearing between runs;
- negative isolation tests.

---

# 152. Context Confusion

Context confusion occurs when the runtime acts under the wrong Context due
to ambiguity or substitution.

---

# 153. Context Confusion Examples

```text
DISPLAYED CUSTOMER
≠
EXECUTION CUSTOMER

REQUEST PROJECT
≠
WORKFLOW PROJECT

MESSAGE TENANT
≠
CURRENT TENANT
```

---

# 154. Context Confusion Prevention

Potential controls:

- single authoritative Context object;
- immutable protected fields;
- explicit scope binding;
- cross-field validation;
- correlation/evidence;
- fail-closed ambiguity.

---

# 155. Stale Context

A stale Context was once valid but is no longer current.

---

# 156. Stale Context Causes

- Role changed;
- Approval expired;
- delegation revoked;
- Customer suspended;
- Tenant disabled;
- Agent suspended;
- session expired.

---

# 157. Stale Context Prevention

Protected operations should revalidate time-sensitive authority where
required.

---

# 158. Context Cache

Context may be cached for performance.

---

# 159. Cache Key

Protected cache keys should include all scope dimensions required to prevent
mixing.

Potential:

```text
actor
+
project
+
customer
+
tenant
+
role
+
context_version
```

---

# 160. Cache Boundary

```text
CACHE HIT
≠
AUTHORITY STILL VALID
```

---

# 161. Cache Invalidation

Invalidation should occur on:

- expiry;
- revocation;
- Role change;
- scope suspension;
- policy change;
- configuration change where required.

---

# 162. Cross-Customer Cache Rule

Customer-scoped cached Context must not be reused for another Customer.

---

# 163. Cross-Tenant Cache Rule

Tenant-scoped cached Context must not be reused for another Tenant.

---

# 164. Context Persistence

Some Context may need persistence for:

- Workflow recovery;
- audit;
- long-running Tasks;
- delayed processing.

---

# 165. Persistence Boundary

Persisted Context must not include unnecessary secrets.

---

# 166. Context Persistence Record

Target concept:

```yaml
persisted_context:
  context_id: required
  context_version: required

  actor_reference: required

  environment_id: required

  project_id: conditional
  customer_id: conditional
  tenant_id: conditional

  workflow_instance_id: conditional
  task_id: conditional
  run_id: conditional

  authority_reference: conditional
  approval_reference: conditional
  delegation_reference: conditional

  classification: required

  created_at: required
  expires_at: conditional

  integrity_reference: conditional

  status: required
```

---

# 167. Context Reconstruction

A material execution should be reconstructable from evidence.

---

# 168. Reconstruction Inputs

Potential inputs:

- Context record;
- identity record;
- Workflow evidence;
- Task evidence;
- Event evidence;
- Message evidence;
- Tool evidence;
- Model evidence;
- configuration version.

---

# 169. Reconstruction Boundary

```text
LOG LINE WITH CUSTOMER ID
≠
FULL CONTEXT RECONSTRUCTION
```

---

# 170. Context Recovery

Recovery is required when Context is lost, corrupted, stale, or inconsistent
during long-running work.

---

# 171. Recovery Sequence

Target:

```text
DETECT CONTEXT FAILURE
↓
SUSPEND UNSAFE EXECUTION
↓
IDENTIFY AUTHORITATIVE SOURCE
↓
RECONSTRUCT CONTEXT
↓
REVALIDATE IDENTITY
↓
REVALIDATE SCOPE
↓
REVALIDATE AUTHORITY
↓
REVALIDATE APPROVAL / DELEGATION
↓
CREATE NEW VALID CONTEXT
↓
RESUME IF SAFE
↓
EVIDENCE
```

---

# 172. Recovery Boundary

```text
CONTEXT RECONSTRUCTED
≠
TASK MAY RESUME AUTOMATICALLY
```

Task or Workflow state must also be valid.

---

# 173. Context Corruption

Context corruption may include:

- invalid field;
- inconsistent hierarchy;
- integrity failure;
- unsupported schema;
- stale authority reference.

---

# 174. Corruption Rule

Protected execution should fail safely on Context corruption.

---

# 175. Context Error Classes

Target error classes:

```text
CONTEXT_MISSING

CONTEXT_SCHEMA_INVALID

CONTEXT_VERSION_UNSUPPORTED

CONTEXT_ACTOR_UNKNOWN

CONTEXT_ACTOR_MISMATCH

CONTEXT_ROLE_INVALID

CONTEXT_PROJECT_INVALID

CONTEXT_CUSTOMER_INVALID

CONTEXT_TENANT_INVALID

CONTEXT_TENANT_CUSTOMER_MISMATCH

CONTEXT_WORKFLOW_INVALID

CONTEXT_TASK_INVALID

CONTEXT_SCOPE_MISMATCH

CONTEXT_AUTHORITY_INVALID

CONTEXT_APPROVAL_INVALID

CONTEXT_DELEGATION_INVALID

CONTEXT_EXPIRED

CONTEXT_REVOKED

CONTEXT_STALE

CONTEXT_INTEGRITY_FAILED

CONTEXT_PROVENANCE_UNTRUSTED

CONTEXT_SWITCH_NOT_AUTHORIZED

CONTEXT_LEAKAGE_DETECTED

CONTEXT_CONFUSION_DETECTED

CONTEXT_CACHE_SCOPE_MISMATCH

CONTEXT_RECONSTRUCTION_FAILED
```

---

# 176. Error Classification

Security and isolation errors must not be treated as ordinary transient
failures.

---

# 177. Context Lifecycle

Target Context lifecycle:

```text
REQUESTED
↓
CREATED
↓
VALIDATED
↓
BOUND
↓
ACTIVE
↓
REFRESHED / DERIVED
↓
EXPIRED / REVOKED / CLOSED
↓
ARCHIVED WHERE REQUIRED
```

---

# 178. Context State Model

Potential states:

```text
REQUESTED

VALIDATING

VALID

BOUND

ACTIVE

EXPIRED

REVOKED

INVALID

CLOSED
```

Exact runtime state machine requires implementation.

---

# 179. Lifecycle Boundary

```text
CONTEXT ACTIVE
≠
ALL ACTIONS AUTHORIZED
```

Each material action may still require authorization.

---

# 180. Context Versioning

Context schemas must be versioned when material semantics change.

---

# 181. Breaking Context Change

Examples:

- field removed;
- scope meaning changed;
- hierarchy changed;
- authority semantics changed;
- required field added incompatibly.

---

# 182. Compatibility

Compatibility should consider:

- older producers;
- newer consumers;
- stored Context;
- delayed Tasks;
- historical Events;
- Workflow recovery.

---

# 183. Unsupported Version Rule

Protected runtime components should not silently process unsupported Context
versions.

---

# 184. Context Migration

Long-running state may require Context migration.

Migration must preserve:

- identity;
- Project;
- Customer;
- Tenant;
- authority semantics;
- evidence.

---

# 185. Context Migration Boundary

```text
SCHEMA MIGRATED
≠
AUTHORITY REVALIDATED AUTOMATICALLY
```

---

# 186. Context Deprecation

Deprecated Context fields or versions should identify:

- replacement;
- migration;
- retirement criteria.

---

# 187. Context Registry

A future Context Registry may track:

```yaml
context_registry_entry:
  context_id: required
  context_version: required

  actor_reference: required

  environment_id: required

  project_id: conditional
  customer_id: conditional
  tenant_id: conditional

  parent_context_id: conditional

  status: required

  created_at: required
  expires_at: conditional

  integrity_reference: conditional
```

No runtime Context Registry is currently proven.

---

# 188. Context Observability

Target observability should cover:

```text
CONTEXT CREATION

CONTEXT VALIDATION

CONTEXT VALIDATION FAILURE

CONTEXT BINDING

CONTEXT PROPAGATION

CONTEXT SWITCH

CONTEXT SWITCH DENIAL

CONTEXT EXPIRY

CONTEXT REVOCATION

CONTEXT REFRESH

CONTEXT LEAKAGE DETECTION

CONTEXT CONFUSION DETECTION

CONTEXT RECOVERY
```

---

# 189. Context Logging

Logs should support:

- Context ID;
- actor;
- environment;
- Project;
- Customer;
- Tenant;
- Workflow;
- Task;
- run;
- result.

Sensitive Context values should be minimized.

---

# 190. Context Metrics

Potential metrics:

```text
CONTEXT_CREATION_COUNT

CONTEXT_VALIDATION_FAILURES

CONTEXT_MISSING_COUNT

CONTEXT_EXPIRED_COUNT

CONTEXT_REVOKED_COUNT

CONTEXT_REFRESH_COUNT

CONTEXT_SWITCH_COUNT

CONTEXT_SWITCH_DENIALS

PROJECT_SCOPE_MISMATCH_COUNT

CUSTOMER_SCOPE_MISMATCH_COUNT

TENANT_SCOPE_MISMATCH_COUNT

CONTEXT_INTEGRITY_FAILURES

CONTEXT_LEAKAGE_DETECTIONS

CONTEXT_CONFUSION_DETECTIONS

STALE_CONTEXT_DETECTIONS

CONTEXT_CACHE_MISMATCHES

CONTEXT_RECOVERY_COUNT

CONTEXT_RECOVERY_FAILURES
```

---

# 191. Metric Boundary

```text
LOW CONTEXT ERROR COUNT
≠
CONTEXT ISOLATION PROVEN
```

Negative testing is still required.

---

# 192. Context Evidence

Material Context evidence should answer:

```text
WHICH CONTEXT?

WHICH VERSION?

WHICH ACTOR?

WHICH ROLE?

WHICH PROJECT?

WHICH CUSTOMER?

WHICH TENANT?

WHICH WORKFLOW?

WHICH TASK?

WHICH RUN?

WHAT AUTHORITY REFERENCES?

WHEN CREATED?

WHEN VALIDATED?

WHAT RESULT?
```

---

# 193. Context Evidence Record

Target:

```yaml
context_evidence:
  evidence_id: required

  context_id: required
  context_version: required

  actor_id: required
  actor_type: required

  role_id: conditional

  environment_id: required

  project_id: conditional
  customer_id: conditional
  tenant_id: conditional

  workflow_instance_id: conditional
  task_id: conditional

  session_id: conditional
  run_id: conditional

  correlation_id: required
  causation_id: conditional

  authority_reference: conditional
  approval_reference: conditional
  delegation_reference: conditional

  action: required
  result: required

  observed_at: required

  integrity_reference: conditional

  status: required
```

---

# 194. Auditability

Auditors should be able to reconstruct:

```text
WHO ACTED

UNDER WHICH CONTEXT

WHICH SCOPE

WHICH AUTHORITY

WHICH APPROVAL

WHICH WORKFLOW / TASK

WHICH TOOL / MODEL / MEMORY / INTEGRATION

WHAT RESULT OCCURRED
```

---

# 195. Context Access Control

Actions may include:

```text
CREATE

READ

DERIVE

BIND

PROPAGATE

REFRESH

SWITCH

REVOKE

INSPECT

ADMINISTER
```

Each should be separately governable where material.

---

# 196. Read Boundary

Ability to inspect Context metadata must not automatically expose:

- secrets;
- Customer Data;
- Tenant Data;
- privileged internal references.

---

# 197. Context Administration

Administrative Context controls should be separated from ordinary runtime
use.

---

# 198. Human Override

A qualified Human may correct or terminate Context under approved authority.

---

# 199. Human Override Boundary

```text
HUMAN OVERRIDE
≠
UNRECORDED CONTEXT CHANGE
```

---

# 200. Emergency Context Revocation

Emergency controls should allow rapid revocation or suspension of unsafe
Context.

---

# 201. Emergency Boundary

Emergency action remains:

- attributable;
- scoped;
- reviewable;
- evidenced.

---

# 202. Context Anti-Gaming

Do not improve Context metrics by:

- suppressing scope mismatch logs;
- treating invalid Context as missing telemetry only;
- excluding denied switches;
- removing failed isolation tests;
- reclassifying leakage as ordinary error;
- omitting stale Context detections.

---

# 203. Anti-Pattern — Context in Free Text Only

Prohibited for protected scope:

```text
prompt = "Customer is ACME"
```

as the only Customer Context mechanism.

---

# 204. Anti-Pattern — Global Mutable Customer Variable

Avoid:

```text
currentCustomer = ...
```

as shared global mutable state across concurrent executions.

---

# 205. Anti-Pattern — Agent Remembers Scope

Prohibited assumption:

```text
AGENT HANDLED CUSTOMER A LAST
THEREFORE
CURRENT CUSTOMER = A
```

---

# 206. Anti-Pattern — Context Switch by Message

Prohibited:

```text
Message:
"Continue under Tenant B"
```

without validated Context transition.

---

# 207. Anti-Pattern — Context Trust from Event

Historical Event scope must not become new runtime authority without
validation.

---

# 208. Anti-Pattern — Cache Without Tenant Key

Tenant-scoped cache lacking Tenant identity may create cross-Tenant leakage.

---

# 209. Anti-Pattern — Context Object as Permission Token

Context alone should not replace current runtime authorization when the
action requires separate authority evaluation.

---

# 210. Anti-Pattern — One Context for Entire Customer Session

Long-lived Context must not ignore:

- Role changes;
- Approval expiry;
- delegation revocation;
- Customer/Tenant suspension.

---

# 211. Prohibited Context Behaviors

The AI OS must not:

- execute protected operations with missing required Context;
- trust unvalidated external Context;
- trust unvalidated Agent-supplied Context;
- trust Prompt text as protected Context;
- silently mutate Customer Context;
- silently mutate Tenant Context;
- silently mutate Project Context;
- reuse Customer A Context for Customer B;
- reuse Tenant A Context for Tenant B;
- preserve stale authority indefinitely;
- expose raw secrets through Context;
- let Context inheritance expand authority;
- let Context switching bypass Approval;
- let shared Agents carry ungoverned cross-Customer state;
- claim Context isolation without negative tests;
- claim Production Context Management without evidence.

---

# 212. Minimum Context Management Proof

A controlled Context proof should demonstrate:

```text
AUTHENTICATED ACTOR
↓
REQUESTED SCOPE
↓
VALID PROJECT/CUSTOMER/TENANT
↓
VALID ROLE
↓
VALID AUTHORITY REFERENCES
↓
CONTEXT CREATION
↓
CONTEXT VALIDATION
↓
CONTEXT BINDING
↓
EXECUTION
↓
PROPAGATION
↓
OBSERVABILITY
↓
EVIDENCE
```

---

# 213. Context Identity Proof

Create two independent Contexts.

Verify:

```text
context_id A
!=
context_id B
```

and exact identity remains traceable.

---

# 214. Human Context Proof

Authenticate controlled Human and create scoped Context.

Verify actor identity, Role, and scope match authoritative records.

---

# 215. Agent Context Proof

Run controlled Agent.

Verify:

```text
agent_id

agent_version

agent_instance_id
```

are present and correct.

---

# 216. Shared Agent Separation Proof

Run same Agent definition concurrently for:

```text
Customer A
```

and:

```text
Customer B
```

Verify:

- separate Context IDs;
- separate Customer IDs;
- no Prompt contamination;
- no Memory contamination;
- no Tool credential contamination.

---

# 217. Required Context Proof

Attempt protected Customer operation without:

```text
customer_id
```

Expected:

```text
DENY
```

---

# 218. Tenant Parent Proof

Construct Context:

```text
customer_id = Customer A
tenant_id = Tenant belonging to Customer B
```

Expected:

```text
REJECT
```

---

# 219. Role Validation Proof

Inject unauthorized:

```text
role_id = admin
```

Expected:

```text
ROLE VALIDATION FAILED
```

---

# 220. Context Binding Proof

Create valid Context but do not bind it to execution.

Verify execution cannot claim that Context implicitly.

---

# 221. Context Inheritance Proof

Parent Workflow Context creates child Task Context.

Verify required scope propagates and unauthorized extra authority does not.

---

# 222. Propagation Proof

Trace Context through:

```text
REQUEST
↓
WORKFLOW
↓
TASK
↓
AGENT
↓
TOOL
```

Verify protected scope remains consistent.

---

# 223. Project Isolation Context Proof

Create Project A Context.

Attempt Project B protected access.

Expected:

```text
DENY
```

---

# 224. Customer Isolation Context Proof

Create Customer A Context.

Attempt protected Customer B:

- Memory read;
- Workflow execution;
- Tool credential use;
- state access.

Expected:

```text
DENY
+
NO DATA DISCLOSURE
+
EVIDENCE
```

---

# 225. Tenant Isolation Context Proof

Within Customer A:

```text
Tenant A Context
```

attempt protected Tenant B access.

Expected:

```text
DENY
```

---

# 226. Project Switch Proof

Attempt Project A → Project B switch with:

1. valid authority;
2. missing authority.

Expected:

```text
CASE 1:
NEW CONTEXT CREATED

CASE 2:
DENY
```

---

# 227. Customer Switch Proof

Attempt Customer A → Customer B through:

```text
natural-language message only
```

Expected:

```text
NO CONTEXT CHANGE
```

Then use authorized Context transition.

Expected:

```text
NEW VALIDATED CONTEXT
```

---

# 228. Tenant Switch Proof

Attempt Tenant A → Tenant B without explicit authority.

Expected:

```text
DENY
```

---

# 229. Context Expiry Proof

Use expired Context for protected operation.

Expected:

```text
DENY / REFRESH REQUIRED
```

---

# 230. Context Revocation Proof

Create valid Context.

Revoke underlying authority.

Attempt protected action again.

Expected:

```text
DENY
```

---

# 231. Approval Expiry Context Proof

Bind Context to temporary Approval.

Expire Approval.

Attempt protected execution.

Expected:

```text
DENY / REAPPROVAL REQUIRED
```

---

# 232. Delegation Revocation Context Proof

Use delegated Context.

Revoke delegation.

Attempt continuation.

Expected:

```text
DENY
```

---

# 233. Context Integrity Proof

Modify protected Context field after integrity protection.

Expected:

```text
INTEGRITY FAILURE
```

---

# 234. Prompt Context Proof

Inject prompt text requesting:

```text
"Switch to Customer B"
```

Expected:

```text
RUNTIME CUSTOMER CONTEXT UNCHANGED
```

---

# 235. Model Context Minimization Proof

Send controlled Model request.

Verify Model receives only approved subset of Context.

---

# 236. Tool Context Proof

Attempt Tool call where Tool Context belongs to Customer A but execution is
Customer B.

Expected:

```text
DENY
```

---

# 237. Memory Context Proof

Attempt Customer A Context read from Customer B memory.

Expected:

```text
DENY
```

---

# 238. Event Context Proof

Publish Event from controlled Context.

Verify required scope and correlation lineage remain attached.

---

# 239. Message Context Proof

Send protected message.

Verify sender Context cannot be altered by payload text.

---

# 240. State Context Proof

Attempt state retrieval using wrong Tenant Context.

Expected:

```text
DENY
```

---

# 241. Integration Context Proof

Attempt Customer A integration credential use under Customer B Context.

Expected:

```text
DENY
```

---

# 242. Context Leakage Proof

Seed distinct markers into controlled Customer A and Customer B Context.

Verify no unauthorized marker crosses between scopes.

---

# 243. Context Confusion Proof

Present conflicting:

```text
ENVELOPE CUSTOMER = A

PAYLOAD CUSTOMER = B
```

Expected:

```text
REJECT / AUTHORITATIVE ENVELOPE PRESERVED
```

according to contract.

---

# 244. Stale Context Proof

Change actor Role after Context creation.

Attempt protected action using old Context.

Expected:

```text
REVALIDATE
+
DENY IF AUTHORITY NO LONGER EXISTS
```

---

# 245. Cache Isolation Proof

Cache Customer A / Tenant A Context.

Request Customer A / Tenant B Context.

Expected:

```text
NO CROSS-TENANT CACHE HIT
```

---

# 246. Cache Revocation Proof

Cache valid Context.

Revoke authority.

Expected:

```text
STALE CACHED CONTEXT
MUST NOT
AUTHORIZE NEW PROTECTED ACTION
```

---

# 247. Context Reconstruction Proof

For one execution reconstruct:

```text
ACTOR
↓
ROLE
↓
PROJECT
↓
CUSTOMER
↓
TENANT
↓
WORKFLOW
↓
TASK
↓
RUN
↓
AUTHORITY
↓
TOOL / MODEL / MEMORY ACTION
↓
RESULT
```

---

# 248. Context Recovery Proof

Simulate Context loss during controlled long-running Workflow.

Verify:

- unsafe execution pauses;
- Context is reconstructed;
- authority is revalidated;
- new Context is created;
- execution resumes only when safe.

---

# 249. Context Version Proof

Run supported Context version.

Expected:

```text
ACCEPT
```

Run unsupported breaking Context version.

Expected:

```text
REJECT / MIGRATION REQUIRED
```

---

# 250. Context Migration Proof

Migrate persisted controlled Context to new schema.

Verify:

- Project preserved;
- Customer preserved;
- Tenant preserved;
- authority revalidated;
- evidence preserved.

---

# 251. Production Context Management Gate

Before Context Management may be represented as Production-ready for an
approved scope:

- [ ] Context Management authority is approved.
- [ ] Context ownership is defined.
- [ ] relationship to Kernel is approved.
- [ ] relationship to Configuration is approved.
- [ ] relationship to Governance is approved.
- [ ] relationship to Security is approved.
- [ ] relationship to Prompt OS is approved.
- [ ] Runtime Context is explicitly separated from LLM Context Window.
- [ ] Context IDs are implemented.
- [ ] Context versions are implemented.
- [ ] Context Envelope is implemented.
- [ ] actor type is required.
- [ ] Human identity is validated.
- [ ] Agent identity is validated.
- [ ] Agent version is traceable.
- [ ] Agent Instance identity is traceable.
- [ ] service identity is validated where used.
- [ ] Role Context is validated.
- [ ] Team Context is governed where used.
- [ ] Department Context is governed where used.
- [ ] Product Context is governed where used.
- [ ] Project Context is mandatory where required.
- [ ] Customer Context is mandatory where required.
- [ ] Tenant Context is mandatory where required.
- [ ] Tenant-to-Customer relationship is validated.
- [ ] Workspace Context is governed where used.
- [ ] Workflow Context is implemented.
- [ ] Task Context is implemented.
- [ ] Session Context is implemented where used.
- [ ] Run Context is implemented.
- [ ] Environment Context is implemented.
- [ ] staging and Production Context are isolated.
- [ ] correlation IDs are implemented.
- [ ] causation IDs are implemented where required.
- [ ] trace integration exists where required.
- [ ] authority references are supported.
- [ ] authority references are independently validated.
- [ ] Approval references are supported.
- [ ] Approval validity is rechecked where required.
- [ ] delegation references are supported.
- [ ] delegation validity is rechecked where required.
- [ ] Context classification is implemented.
- [ ] Context source is attributable.
- [ ] Context provenance is preserved.
- [ ] parent Context relationships are traceable.
- [ ] Context creation uses authenticated actors.
- [ ] externally supplied scope is validated.
- [ ] Agent-supplied Context cannot self-create authority.
- [ ] Message-supplied Context is revalidated.
- [ ] Event historical Context is not treated as current authority.
- [ ] mandatory fields are defined by action class.
- [ ] optional fields cannot create hidden authority.
- [ ] Context schema validation is implemented.
- [ ] actor validation is implemented.
- [ ] scope validation is implemented.
- [ ] relationship validation is implemented.
- [ ] authority validation is implemented.
- [ ] freshness validation is implemented.
- [ ] Context binding is implemented.
- [ ] material executions are bound to exact Context.
- [ ] protected Context fields are immutable where required.
- [ ] mutable metadata cannot change Security scope.
- [ ] Context inheritance is field-specific.
- [ ] authority is not implicitly inherited.
- [ ] Context propagation is implemented.
- [ ] downstream components revalidate protected scope where required.
- [ ] Context minimization is implemented.
- [ ] protected Context mutation requires authority.
- [ ] protected scope switching creates new Context.
- [ ] Project switching is authorized.
- [ ] Customer switching is independently authorized.
- [ ] Tenant switching is independently authorized.
- [ ] natural-language content cannot switch protected scope.
- [ ] Context switch evidence is generated.
- [ ] required missing Context fails closed.
- [ ] Context expiry is enforced.
- [ ] expired Context cannot authorize protected action.
- [ ] Context refresh revalidates authority.
- [ ] Context revocation is implemented.
- [ ] revocation invalidates relevant cached Context.
- [ ] Context integrity is protected.
- [ ] cryptographic validity is not treated as current authority by itself.
- [ ] sensitive Context confidentiality is enforced.
- [ ] Context redaction is implemented.
- [ ] Context Data minimization is implemented.
- [ ] Prompt Context is a governed subset of Runtime Context.
- [ ] Prompt Context cannot become authority.
- [ ] Model Context respects Data policy.
- [ ] Model Context is minimized.
- [ ] Tool Context is scoped.
- [ ] Tool authorization remains independently enforced.
- [ ] Memory Context is scoped.
- [ ] protected Memory access fails without required scope.
- [ ] Workflow Context remains stable.
- [ ] Task Context inherits required Workflow scope.
- [ ] Event Context preserves occurrence scope.
- [ ] Event Context does not create current authority automatically.
- [ ] Message Context preserves transport scope.
- [ ] payload text cannot override Message Context.
- [ ] State Context is enforced.
- [ ] Integration Context is enforced.
- [ ] Project Context isolation proof passes.
- [ ] Customer Context isolation proof passes.
- [ ] Tenant Context isolation proof passes where applicable.
- [ ] Shared Agent Context Separation Proof passes.
- [ ] shared Agent memory is scope-safe.
- [ ] shared Tool credentials are Context-safe.
- [ ] shared Model request construction is Context-safe.
- [ ] Context leakage controls are implemented.
- [ ] Context confusion controls are implemented.
- [ ] stale Context detection is implemented.
- [ ] Context cache keys include required scope dimensions.
- [ ] cached Context cannot bypass revocation.
- [ ] cross-Customer cache reuse is prevented.
- [ ] cross-Tenant cache reuse is prevented.
- [ ] persisted Context excludes unnecessary secrets.
- [ ] Context reconstruction is possible.
- [ ] Context recovery is implemented.
- [ ] Context corruption fails safely.
- [ ] Context error classes are implemented.
- [ ] Context lifecycle is implemented.
- [ ] invalid Context state transitions are prevented.
- [ ] Context schema versions are traceable.
- [ ] unsupported Context versions fail safely.
- [ ] Context compatibility is tested.
- [ ] Context migration is governed.
- [ ] Context deprecation is governed.
- [ ] Context Registry or equivalent runtime control exists.
- [ ] Context observability is operational.
- [ ] Context logs are operational.
- [ ] Context metrics are operational.
- [ ] Context evidence is generated.
- [ ] Context audit reconstruction is possible.
- [ ] Context access-control actions are governed.
- [ ] Context administration is separated from ordinary execution.
- [ ] Human override is attributable.
- [ ] emergency Context revocation is implemented.
- [ ] anti-gaming controls are applied.
- [ ] Context Identity Proof passes.
- [ ] Human Context Proof passes.
- [ ] Agent Context Proof passes.
- [ ] Shared Agent Separation Proof passes.
- [ ] Required Context Proof passes.
- [ ] Tenant Parent Proof passes.
- [ ] Role Validation Proof passes.
- [ ] Context Binding Proof passes.
- [ ] Context Inheritance Proof passes.
- [ ] Propagation Proof passes.
- [ ] Project Isolation Context Proof passes.
- [ ] Customer Isolation Context Proof passes.
- [ ] Tenant Isolation Context Proof passes where applicable.
- [ ] Project Switch Proof passes.
- [ ] Customer Switch Proof passes.
- [ ] Tenant Switch Proof passes.
- [ ] Context Expiry Proof passes.
- [ ] Context Revocation Proof passes.
- [ ] Approval Expiry Context Proof passes.
- [ ] Delegation Revocation Context Proof passes.
- [ ] Context Integrity Proof passes.
- [ ] Prompt Context Proof passes.
- [ ] Model Context Minimization Proof passes.
- [ ] Tool Context Proof passes.
- [ ] Memory Context Proof passes.
- [ ] Event Context Proof passes.
- [ ] Message Context Proof passes.
- [ ] State Context Proof passes.
- [ ] Integration Context Proof passes.
- [ ] Context Leakage Proof passes.
- [ ] Context Confusion Proof passes.
- [ ] Stale Context Proof passes.
- [ ] Cache Isolation Proof passes.
- [ ] Cache Revocation Proof passes.
- [ ] Context Reconstruction Proof passes.
- [ ] Context Recovery Proof passes.
- [ ] Context Version Proof passes.
- [ ] Context Migration Proof passes.
- [ ] Production Architecture Gate has passed.
- [ ] Production Governance Gate has passed.
- [ ] Production Security Gate has passed.
- [ ] Production Capability Gate has passed for required Context capabilities.
- [ ] Production Lifecycle Gate has passed.
- [ ] Production Metrics Gate has passed for required Context metrics.
- [ ] explicit Production authorization remains separately required.

---

# 252. Production Context Management Hard Stops

Production readiness must fail when:

- actor identity is ambiguous;
- required Context ID is missing;
- required Project Context is missing;
- required Customer Context is missing;
- required Tenant Context is missing;
- Tenant does not belong to declared Customer;
- Role is accepted from unvalidated input;
- Context can self-assert authority;
- Prompt text can change protected Context;
- Message payload can change protected Context;
- Event payload can create current authority;
- lower-level execution can silently change Customer;
- lower-level execution can silently change Tenant;
- shared Agent Context can leak between Customers;
- shared Agent Context can leak between Tenants;
- Context cache lacks required isolation dimensions;
- expired Context can continue protected execution;
- revoked Context remains usable;
- Customer Context isolation fails;
- Tenant Context isolation fails;
- Context leakage test fails;
- Context confusion test fails;
- Context reconstruction is impossible for material actions;
- Context recovery is untested;
- Production authorization is absent.

---

# 253. Production Gate Boundary

Passing the Context Management Gate means:

```text
RUNTIME CONTEXT MANAGEMENT
HAS SUFFICIENT
IDENTITY,
VALIDATION,
BINDING,
PROPAGATION,
SCOPE CONTROL,
FRESHNESS,
INTEGRITY,
ISOLATION,
SECURITY,
OBSERVABILITY,
RECOVERY,
AND EVIDENCE
FOR THE APPROVED SCOPE
```

It does not mean:

```text
ENTIRE AI OS
IS PRODUCTION AUTHORIZED
```

---

# 254. Current-State Boundary

This document does not prove that Mianx.ai currently has:

- an implemented Context Manager;
- an implemented Context Registry;
- runtime Context IDs;
- runtime Context Envelope validation;
- runtime Context binding;
- runtime Context propagation;
- runtime Context inheritance;
- runtime Context switching;
- runtime Context revocation;
- runtime Context freshness validation;
- runtime Context integrity protection;
- runtime Context cache isolation;
- runtime Context persistence;
- verified Shared Agent Context separation;
- verified Project Context isolation;
- verified Customer Context isolation;
- verified Tenant Context isolation;
- verified Context leakage prevention;
- verified Context confusion prevention;
- Context reconstruction runtime;
- Context recovery runtime;
- Production Context Management authorization.

These remain target-state requirements unless separately evidenced.

---

# 255. Current Verified Context Management Baseline

```yaml
documentation:
  context_management_document:
    id: AIOS-CONTEXT-MGMT-001
    version: 1.0.0
    status: Draft
    canonical: false

target_state:
  context_authority: defined
  context_responsibility: defined

  kernel_relationship: defined
  configuration_relationship: defined
  governance_relationship: defined
  security_relationship: defined
  prompt_os_relationship: defined

  runtime_vs_llm_context: defined

  context_identity: defined
  context_version: defined
  context_envelope: defined

  actor_context: defined
  human_context: defined
  agent_context: defined
  agent_version_context: defined
  agent_instance_context: defined
  service_context: defined

  role_context: defined
  team_context: defined
  department_context: defined

  product_context: defined
  project_context: defined
  customer_context: defined
  tenant_context: defined
  workspace_context: defined

  workflow_context: defined
  task_context: defined
  session_context: defined
  run_context: defined
  environment_context: defined

  correlation_context: defined
  causation_context: defined
  trace_context: defined

  authority_reference: defined
  approval_reference: defined
  delegation_reference: defined

  classification: defined
  source: defined
  provenance: defined
  parent_context: defined

  context_creation: defined
  user_supplied_context_boundary: defined
  agent_supplied_context_boundary: defined
  message_supplied_context_boundary: defined
  event_supplied_context_boundary: defined

  mandatory_fields: defined
  optional_fields: defined

  context_validation: defined
  schema_validation: defined
  identity_validation: defined
  scope_validation: defined
  relationship_validation: defined
  authority_validation: defined
  freshness_validation: defined

  context_binding: defined
  protected_field_immutability: defined
  mutable_metadata_boundary: defined

  inheritance: defined
  authority_inheritance_boundary: defined

  propagation: defined
  minimization: defined
  downstream_revalidation: defined

  mutation: defined
  context_switch: defined
  project_switch: defined
  customer_switch: defined
  tenant_switch: defined
  switch_evidence: defined

  fail_closed_context: defined

  expiration: defined
  refresh: defined
  revocation: defined

  integrity: defined
  signed_context_boundary: defined
  confidentiality: defined
  redaction: defined
  data_minimization: defined

  prompt_context: defined
  model_context: defined
  tool_context: defined
  memory_context: defined
  workflow_context_propagation: defined
  task_context_propagation: defined
  event_context: defined
  message_context: defined
  state_context: defined
  integration_context: defined

  project_isolation: defined
  customer_isolation: defined
  tenant_isolation: defined
  shared_agent_context_separation: defined
  shared_agent_memory_boundary: defined
  shared_tool_context_separation: defined
  shared_model_context_separation: defined

  leakage_prevention: defined
  context_confusion_prevention: defined
  stale_context_prevention: defined

  context_cache: defined
  cache_key_scope: defined
  cache_invalidation: defined
  cross_customer_cache_rule: defined
  cross_tenant_cache_rule: defined

  context_persistence: defined
  persisted_context_record: defined
  context_reconstruction: defined
  context_recovery: defined

  context_corruption: defined
  error_classes: defined

  lifecycle: defined
  state_model: defined

  versioning: defined
  compatibility: defined
  migration: defined
  deprecation: defined

  context_registry: defined_target_state

  observability: defined
  logging: defined
  metrics: defined
  evidence: defined
  auditability: defined

  access_control: defined
  administration: defined
  human_override: defined
  emergency_revocation: defined

  anti_gaming: defined
  anti_patterns: defined

  production_gate: defined

implementation:
  context_manager_runtime: not_implemented
  context_registry_runtime: not_proven
  context_binding_runtime: not_proven
  context_propagation_runtime: not_proven
  context_switch_runtime: not_proven
  context_revocation_runtime: not_proven
  context_integrity_runtime: not_proven
  context_cache_runtime: not_proven
  context_reconstruction_runtime: not_proven
  context_recovery_runtime: not_proven

validation:
  context_identity_proof: 0_proven
  human_context_proof: 0_proven
  agent_context_proof: 0_proven
  shared_agent_separation_proof: 0_proven
  required_context_proof: 0_proven
  tenant_parent_proof: 0_proven
  role_validation_proof: 0_proven
  context_binding_proof: 0_proven
  context_inheritance_proof: 0_proven
  propagation_proof: 0_proven
  project_isolation_context_proof: 0_proven
  customer_isolation_context_proof: 0_proven
  tenant_isolation_context_proof: 0_proven
  project_switch_proof: 0_proven
  customer_switch_proof: 0_proven
  tenant_switch_proof: 0_proven
  context_expiry_proof: 0_proven
  context_revocation_proof: 0_proven
  approval_expiry_context_proof: 0_proven
  delegation_revocation_context_proof: 0_proven
  context_integrity_proof: 0_proven
  prompt_context_proof: 0_proven
  model_context_minimization_proof: 0_proven
  tool_context_proof: 0_proven
  memory_context_proof: 0_proven
  event_context_proof: 0_proven
  message_context_proof: 0_proven
  state_context_proof: 0_proven
  integration_context_proof: 0_proven
  context_leakage_proof: 0_proven
  context_confusion_proof: 0_proven
  stale_context_proof: 0_proven
  cache_isolation_proof: 0_proven
  cache_revocation_proof: 0_proven
  context_reconstruction_proof: 0_proven
  context_recovery_proof: 0_proven
  context_version_proof: 0_proven
  context_migration_proof: 0_proven

production:
  context_management_gate_passed: false
  authorization: false
  operational: false
```

---

# 256. Context Management Review Questions

Reviewers should answer:

1. Is Context treated as a runtime Security boundary?
2. Is Context separated from optional metadata?
3. Is Context authority explicit?
4. Are Context responsibilities defined?
5. Are Context non-responsibilities defined?
6. Is relationship to Kernel defined?
7. Is relationship to Configuration defined?
8. Is relationship to Governance defined?
9. Is relationship to Security defined?
10. Is relationship to Prompt OS defined?
11. Is Runtime Context separated from LLM Context Window?
12. Is Context ID defined?
13. Is Context Version defined?
14. Is Context Envelope defined?
15. Is Actor Context defined?
16. Is Human Context defined?
17. Is Agent Context defined?
18. Is Agent Version Context defined?
19. Is Agent Instance Context defined?
20. Is Shared Agent separation explicit?
21. Is Service Context defined?
22. Is Role Context defined?
23. Is Role validated against authoritative sources?
24. Is Team Context defined?
25. Is Department Context defined?
26. Is organizational identity prevented from becoming unrestricted Data authority?
27. Is Product Context defined?
28. Is Project Context defined?
29. Is Project separation explicit?
30. Is Customer Context defined?
31. Is Customer isolation explicit?
32. Is Tenant Context defined?
33. Is Tenant parent validation defined?
34. Is same-Customer Tenant separation explicit?
35. Is Workspace Context defined?
36. Is Workflow Context defined?
37. Is Task Context defined?
38. Is Workflow/Task scope substitution prevented?
39. Is Session Context defined?
40. Is Run Context defined?
41. Are Session and Run distinguished?
42. Is Environment Context defined?
43. Are staging and Production separated?
44. Is correlation Context defined?
45. Is causation Context defined?
46. Is trace Context defined?
47. Is Authority Reference defined?
48. Is Authority Reference separated from authority validity?
49. Is Approval Reference defined?
50. Is Approval validity independently checked?
51. Is Delegation Reference defined?
52. Is Delegation Reference independently checked?
53. Is Context Classification defined?
54. Is Context Source defined?
55. Is provenance defined?
56. Is valid shape separated from trusted provenance?
57. Is Parent Context defined?
58. Is Context Creation defined?
59. Are only trusted runtime components allowed to create authoritative Context?
60. Is user-supplied Context treated as requested, not trusted?
61. Is Agent-supplied Context prevented from self-authorizing?
62. Is Message-supplied Context revalidated?
63. Is Event historical Context separated from current authority?
64. Are mandatory fields action-specific?
65. Are optional fields controlled?
66. Is Context Validation defined?
67. Is schema validation defined?
68. Is actor identity validation defined?
69. Is scope validation defined?
70. Is hierarchy relationship validation defined?
71. Is authority validation independent?
72. Is freshness validation defined?
73. Is Context Binding defined?
74. Is an existing Context separated from a bound Context?
75. Are Security-critical Context fields immutable where required?
76. Is mutable metadata separated from Security scope?
77. Is Context Inheritance defined?
78. Is authority inheritance explicitly bounded?
79. Is Context Propagation defined?
80. Is Context minimization defined?
81. Is downstream revalidation defined?
82. Is protected Context mutation governed?
83. Is Context Switch defined?
84. Does protected scope switching create a new Context?
85. Is Project switching governed?
86. Is Customer switching treated as high Risk?
87. Can natural language not change Customer?
88. Is Tenant switching governed?
89. Is same-Customer membership prevented from free Tenant switching?
90. Is scope-switch evidence defined?
91. Does missing protected Context fail closed?
92. Is Context expiration defined?
93. Is expired Context prevented from protected reuse?
94. Is Context Refresh defined?
95. Does refresh revalidate authority?
96. Is Context Revocation defined?
97. Does revocation invalidate stale cached Context?
98. Is Context Integrity defined?
99. Is signed Context separated from current authorization?
100. Is Context Confidentiality defined?
101. Are sensitive Context fields identified?
102. Is Context redaction defined?
103. Is Context Data minimization defined?
104. Is Prompt Context defined?
105. Is Prompt Context separated from authority?
106. Is Model Context defined?
107. Is Model Context governed by Data policy?
108. Is Tool Context defined?
109. Is Tool Context separated from Tool authorization?
110. Is Memory Context defined?
111. Does protected Memory fail without required scope?
112. Is Workflow Context stable?
113. Does Task Context inherit required Workflow scope?
114. Is Event Context defined?
115. Is historical Event Context prevented from creating current authority?
116. Is Message Context defined?
117. Can payload text not override protected Message Context?
118. Is State Context defined?
119. Is protected state scope enforced?
120. Is Integration Context defined?
121. Is Integration availability separated from current Context authorization?
122. Is Context Isolation defined?
123. Is Project Context isolation defined?
124. Is Customer Context isolation end-to-end?
125. Is Tenant Context isolation end-to-end?
126. Is Shared Agent Context Separation defined?
127. Is Shared Agent Memory Boundary defined?
128. Is Shared Tool Context Separation defined?
129. Is Shared Model Context Separation defined?
130. Is Context Leakage defined?
131. Are leakage examples defined?
132. Are leakage controls defined?
133. Is Context Confusion defined?
134. Are confusion examples defined?
135. Are confusion controls defined?
136. Is Stale Context defined?
137. Are stale causes defined?
138. Is stale prevention defined?
139. Is Context Cache defined?
140. Are cache keys scope-aware?
141. Is a cache hit separated from current authority validity?
142. Is Cache Invalidation defined?
143. Is cross-Customer cache reuse prohibited?
144. Is cross-Tenant cache reuse prohibited?
145. Is Context Persistence defined?
146. Are unnecessary secrets excluded from persisted Context?
147. Is Context Reconstruction defined?
148. Are reconstruction inputs defined?
149. Is one log line separated from full Context reconstruction?
150. Is Context Recovery defined?
151. Does recovery revalidate identity and authority?
152. Is reconstructed Context separated from automatic Task resumption?
153. Is Context Corruption defined?
154. Does corruption fail safely?
155. Are Context Error Classes defined?
156. Are isolation failures treated as Security failures?
157. Is Context Lifecycle defined?
158. Is Context State Model defined as target-state?
159. Is active Context separated from universal authorization?
160. Is Context Versioning defined?
161. Are breaking Context changes defined?
162. Is Context compatibility defined?
163. Are unsupported versions rejected?
164. Is Context Migration defined?
165. Is migration separated from authority revalidation?
166. Is Context Deprecation defined?
167. Is future Context Registry defined without runtime claim?
168. Is Context Observability defined?
169. Is Context Logging defined?
170. Are Context Metrics defined?
171. Is low error count separated from isolation proof?
172. Is Context Evidence defined?
173. Is Context Evidence Record defined?
174. Is Auditability defined?
175. Is Context Access Control defined?
176. Is ordinary Context read separated from protected Data access?
177. Is Context Administration separated?
178. Is Human Override defined?
179. Is Human override attributable?
180. Is Emergency Context Revocation defined?
181. Are emergency actions still governed?
182. Are anti-gaming controls defined?
183. Is free-text-only Context anti-pattern defined?
184. Is global mutable Customer Context anti-pattern defined?
185. Is Agent-remembers-scope anti-pattern defined?
186. Is Context switch by Message prohibited?
187. Is Event Context trust anti-pattern defined?
188. Is cache-without-Tenant-key anti-pattern defined?
189. Is Context-as-permission-token anti-pattern defined?
190. Is long-lived stale Context anti-pattern defined?
191. Are prohibited Context behaviors explicit?
192. Is Minimum Context Management Proof defined?
193. Is Context Identity Proof defined?
194. Is Human Context Proof defined?
195. Is Agent Context Proof defined?
196. Is Shared Agent Separation Proof defined?
197. Is Required Context Proof defined?
198. Is Tenant Parent Proof defined?
199. Is Role Validation Proof defined?
200. Is Context Binding Proof defined?
201. Is Context Inheritance Proof defined?
202. Is Propagation Proof defined?
203. Is Project Isolation Context Proof defined?
204. Is Customer Isolation Context Proof defined?
205. Is Tenant Isolation Context Proof defined?
206. Is Project Switch Proof defined?
207. Is Customer Switch Proof defined?
208. Is Tenant Switch Proof defined?
209. Is Context Expiry Proof defined?
210. Is Context Revocation Proof defined?
211. Is Approval Expiry Context Proof defined?
212. Is Delegation Revocation Context Proof defined?
213. Is Context Integrity Proof defined?
214. Is Prompt Context Proof defined?
215. Is Model Context Minimization Proof defined?
216. Is Tool Context Proof defined?
217. Is Memory Context Proof defined?
218. Is Event Context Proof defined?
219. Is Message Context Proof defined?
220. Is State Context Proof defined?
221. Is Integration Context Proof defined?
222. Is Context Leakage Proof defined?
223. Is Context Confusion Proof defined?
224. Is Stale Context Proof defined?
225. Is Cache Isolation Proof defined?
226. Is Cache Revocation Proof defined?
227. Is Context Reconstruction Proof defined?
228. Is Context Recovery Proof defined?
229. Is Context Version Proof defined?
230. Is Context Migration Proof defined?
231. Is Production Context Management Gate defined?
232. Are Production hard stops explicit?
233. Is Context Management Gate separated from entire AI OS Production authorization?
234. Are current-state runtime limitations explicit?
235. Are unproven Context isolation claims avoided?

---

# 257. Definition of Done

This Context Management Standard is content-complete for review when:

- [ ] purpose is defined;
- [ ] authority status is explicit;
- [ ] strategic placement is defined;
- [ ] Core Context Principle is defined;
- [ ] Context is defined as a Security boundary;
- [ ] Context Non-Equivalence Rules are defined;
- [ ] Core Context Principles are defined;
- [ ] Context Authority is defined;
- [ ] Context Responsibility is defined;
- [ ] Context Non-Responsibility is defined;
- [ ] relationship to Kernel is defined;
- [ ] relationship to Configuration is defined;
- [ ] relationship to Governance is defined;
- [ ] relationship to Security is defined;
- [ ] relationship to Prompt OS is defined;
- [ ] Prompt Boundary is defined;
- [ ] Runtime Context vs LLM Context Window is defined;
- [ ] Context Identity is defined;
- [ ] Context Version is defined;
- [ ] Context Envelope is defined;
- [ ] Context Envelope Principle is defined;
- [ ] Actor Context is defined;
- [ ] Human Context is defined;
- [ ] Human Context Boundary is defined;
- [ ] Agent Context is defined;
- [ ] Agent Definition Context is defined;
- [ ] Agent Version Context is defined;
- [ ] Agent Instance Context is defined;
- [ ] Shared Agent Boundary is defined;
- [ ] Service Context is defined;
- [ ] Role Context is defined;
- [ ] Role Validation is defined;
- [ ] Role Boundary is defined;
- [ ] Team Context is defined;
- [ ] Department Context is defined;
- [ ] Organizational Boundary is defined;
- [ ] Product Context is defined;
- [ ] Project Context is defined;
- [ ] Project Context Boundary is defined;
- [ ] Customer Context is defined;
- [ ] Customer Context Boundary is defined;
- [ ] Tenant Context is defined;
- [ ] Tenant Parent Rule is defined;
- [ ] Tenant Boundary is defined;
- [ ] Workspace Context is defined;
- [ ] Workflow Context is defined;
- [ ] Task Context is defined;
- [ ] Workflow/Task Boundary is defined;
- [ ] Session Context is defined;
- [ ] Run Context is defined;
- [ ] Session vs Run is defined;
- [ ] Environment Context is defined;
- [ ] Environment Boundary is defined;
- [ ] Correlation Context is defined;
- [ ] Causation Context is defined;
- [ ] Trace Context is defined;
- [ ] Authority Reference is defined;
- [ ] Approval Reference is defined;
- [ ] Approval Validation is defined;
- [ ] Delegation Reference is defined;
- [ ] Delegation Boundary is defined;
- [ ] Context Classification is defined;
- [ ] Context Source is defined;
- [ ] Context Provenance is defined;
- [ ] Provenance Boundary is defined;
- [ ] Parent Context is defined;
- [ ] Context Creation is defined;
- [ ] Context Creation Authority is defined;
- [ ] User-Supplied Context boundary is defined;
- [ ] Agent-Supplied Context boundary is defined;
- [ ] Message-Supplied Context boundary is defined;
- [ ] Event-Supplied Context boundary is defined;
- [ ] Mandatory Context Fields are defined;
- [ ] Optional Context Fields are defined;
- [ ] Context Validation is defined;
- [ ] Schema Validation is defined;
- [ ] Identity Validation is defined;
- [ ] Scope Validation is defined;
- [ ] Relationship Validation is defined;
- [ ] Authority Validation is defined;
- [ ] Freshness Validation is defined;
- [ ] Context Binding is defined;
- [ ] Binding Targets are defined;
- [ ] Binding Boundary is defined;
- [ ] Context Immutability is defined;
- [ ] Mutable Context is defined;
- [ ] Mutation Boundary is defined;
- [ ] Context Inheritance is defined;
- [ ] Inheritance Rule is defined;
- [ ] Authority Inheritance Boundary is defined;
- [ ] Context Propagation is defined;
- [ ] Propagation Principle is defined;
- [ ] Context Minimization is defined;
- [ ] Downstream Revalidation is defined;
- [ ] Propagation Boundary is defined;
- [ ] Context Mutation is defined;
- [ ] Context Switch is defined;
- [ ] Switch Principle is defined;
- [ ] Project Switching is defined;
- [ ] Customer Switching is defined;
- [ ] Customer Switch Hard Rule is defined;
- [ ] Tenant Switching is defined;
- [ ] Tenant Switch Hard Rule is defined;
- [ ] Scope Switch Evidence is defined;
- [ ] Fail-Closed Context Rule is defined;
- [ ] Context Expiration is defined;
- [ ] Expiry Boundary is defined;
- [ ] Expired Context Rule is defined;
- [ ] Context Refresh is defined;
- [ ] Refresh Requirements are defined;
- [ ] Refresh Boundary is defined;
- [ ] Context Revocation is defined;
- [ ] Revocation Propagation is defined;
- [ ] Context Integrity is defined;
- [ ] Signed Context Boundary is defined;
- [ ] Context Confidentiality is defined;
- [ ] Sensitive Context is defined;
- [ ] Context Redaction is defined;
- [ ] Context Data Minimization is defined;
- [ ] Prompt Context is defined;
- [ ] Prompt Context Rule is defined;
- [ ] Prompt Context Boundary is defined;
- [ ] Model Context is defined;
- [ ] Model Context Rule is defined;
- [ ] Model Context Boundary is defined;
- [ ] Tool Context is defined;
- [ ] Tool Context Boundary is defined;
- [ ] Memory Context is defined;
- [ ] Memory Context Hard Rule is defined;
- [ ] Workflow Context is defined;
- [ ] Task Context propagation is defined;
- [ ] Event Context is defined;
- [ ] Event Context Boundary is defined;
- [ ] Message Context is defined;
- [ ] Message Context Boundary is defined;
- [ ] State Context is defined;
- [ ] State Context Hard Rule is defined;
- [ ] Integration Context is defined;
- [ ] Integration Context Boundary is defined;
- [ ] Context Isolation is defined;
- [ ] Project Context Isolation is defined;
- [ ] Customer Context Isolation is defined;
- [ ] Tenant Context Isolation is defined;
- [ ] Shared Agent Context Separation is defined;
- [ ] Shared Agent Memory Boundary is defined;
- [ ] Shared Tool Context Separation is defined;
- [ ] Shared Model Context Separation is defined;
- [ ] Context Leakage is defined;
- [ ] Leakage Examples are defined;
- [ ] Leakage Prevention is defined;
- [ ] Context Confusion is defined;
- [ ] Context Confusion Examples are defined;
- [ ] Context Confusion Prevention is defined;
- [ ] Stale Context is defined;
- [ ] Stale Context Causes are defined;
- [ ] Stale Context Prevention is defined;
- [ ] Context Cache is defined;
- [ ] Cache Key is defined;
- [ ] Cache Boundary is defined;
- [ ] Cache Invalidation is defined;
- [ ] Cross-Customer Cache Rule is defined;
- [ ] Cross-Tenant Cache Rule is defined;
- [ ] Context Persistence is defined;
- [ ] Persistence Boundary is defined;
- [ ] Context Persistence Record is defined;
- [ ] Context Reconstruction is defined;
- [ ] Reconstruction Inputs are defined;
- [ ] Reconstruction Boundary is defined;
- [ ] Context Recovery is defined;
- [ ] Recovery Sequence is defined;
- [ ] Recovery Boundary is defined;
- [ ] Context Corruption is defined;
- [ ] Corruption Rule is defined;
- [ ] Context Error Classes are defined;
- [ ] Error Classification is defined;
- [ ] Context Lifecycle is defined;
- [ ] Context State Model is defined;
- [ ] Lifecycle Boundary is defined;
- [ ] Context Versioning is defined;
- [ ] Breaking Context Change is defined;
- [ ] Compatibility is defined;
- [ ] Unsupported Version Rule is defined;
- [ ] Context Migration is defined;
- [ ] Context Migration Boundary is defined;
- [ ] Context Deprecation is defined;
- [ ] Context Registry is defined as target-state;
- [ ] Context Observability is defined;
- [ ] Context Logging is defined;
- [ ] Context Metrics are defined;
- [ ] Metric Boundary is defined;
- [ ] Context Evidence is defined;
- [ ] Context Evidence Record is defined;
- [ ] Auditability is defined;
- [ ] Context Access Control is defined;
- [ ] Read Boundary is defined;
- [ ] Context Administration is defined;
- [ ] Human Override is defined;
- [ ] Human Override Boundary is defined;
- [ ] Emergency Context Revocation is defined;
- [ ] Emergency Boundary is defined;
- [ ] Context Anti-Gaming is defined;
- [ ] Context anti-patterns are defined;
- [ ] prohibited Context behaviors are defined;
- [ ] Minimum Context Management Proof is defined;
- [ ] Context Identity Proof is defined;
- [ ] Human Context Proof is defined;
- [ ] Agent Context Proof is defined;
- [ ] Shared Agent Separation Proof is defined;
- [ ] Required Context Proof is defined;
- [ ] Tenant Parent Proof is defined;
- [ ] Role Validation Proof is defined;
- [ ] Context Binding Proof is defined;
- [ ] Context Inheritance Proof is defined;
- [ ] Propagation Proof is defined;
- [ ] Project Isolation Context Proof is defined;
- [ ] Customer Isolation Context Proof is defined;
- [ ] Tenant Isolation Context Proof is defined;
- [ ] Project Switch Proof is defined;
- [ ] Customer Switch Proof is defined;
- [ ] Tenant Switch Proof is defined;
- [ ] Context Expiry Proof is defined;
- [ ] Context Revocation Proof is defined;
- [ ] Approval Expiry Context Proof is defined;
- [ ] Delegation Revocation Context Proof is defined;
- [ ] Context Integrity Proof is defined;
- [ ] Prompt Context Proof is defined;
- [ ] Model Context Minimization Proof is defined;
- [ ] Tool Context Proof is defined;
- [ ] Memory Context Proof is defined;
- [ ] Event Context Proof is defined;
- [ ] Message Context Proof is defined;
- [ ] State Context Proof is defined;
- [ ] Integration Context Proof is defined;
- [ ] Context Leakage Proof is defined;
- [ ] Context Confusion Proof is defined;
- [ ] Stale Context Proof is defined;
- [ ] Cache Isolation Proof is defined;
- [ ] Cache Revocation Proof is defined;
- [ ] Context Reconstruction Proof is defined;
- [ ] Context Recovery Proof is defined;
- [ ] Context Version Proof is defined;
- [ ] Context Migration Proof is defined;
- [ ] Production Context Management Gate is defined;
- [ ] Production hard stops are defined;
- [ ] Context Management Gate is separated from full AI OS Production authorization;
- [ ] current-state limitations are explicit;
- [ ] current verified baseline is recorded;
- [ ] next document is identified.

This document becomes Active only after required review, Founder approval,
Enterprise Governance approval, Security review, Context runtime
implementation alignment, controlled isolation validation, and canonical
promotion.

---

# 258. Current Documentation Progress

After saving this document:

```text
DOC_ROOT=doc/20-ai-operating-system

TOTAL_PLANNED_AI_OPERATING_SYSTEM_DOCUMENTS=79

CONTENT_COMPLETE_FOR_REVIEW=19

EXISTING_SUBSTANTIVE_REVIEW_PENDING=10

TOTAL_SUBSTANTIVE_CONTENT_PRESENT=29

EMPTY_PLACEHOLDERS_REMAINING=50

APPROVED_DOCUMENTS=0

ACTIVE_CANONICAL_DOCUMENTS=0

ROOT_NEW_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW=14

ROOT_EXISTING_SUBSTANTIVE_REVIEW_PENDING=2

ROOT_EMPTY_PLACEHOLDERS_REMAINING=0

COMMUNICATION_MODULE_TOTAL_DOCUMENTS=3

COMMUNICATION_CONTENT_COMPLETE_FOR_REVIEW=3

COMMUNICATION_EMPTY_PLACEHOLDERS_REMAINING=0

CONFIGURATION_MODULE_TOTAL_DOCUMENTS=1

CONFIGURATION_CONTENT_COMPLETE_FOR_REVIEW=1

CONFIGURATION_EMPTY_PLACEHOLDERS_REMAINING=0

CONTEXT_MANAGER_MODULE_TOTAL_DOCUMENTS=2

CONTEXT_MANAGER_CONTENT_COMPLETE_FOR_REVIEW=1

CONTEXT_MANAGER_EMPTY_PLACEHOLDERS_REMAINING=1

CONTEXT_MANAGEMENT=CONTENT_COMPLETE_FOR_REVIEW

CONTEXT_SHARING=EMPTY_PLACEHOLDER

CONTEXT_MANAGER_RUNTIME=NOT_IMPLEMENTED

CONTEXT_REGISTRY_RUNTIME=NOT_PROVEN

CONTEXT_PROPAGATION_RUNTIME=NOT_PROVEN

PROJECT_CONTEXT_ISOLATION=NOT_PROVEN

CUSTOMER_CONTEXT_ISOLATION=NOT_PROVEN

TENANT_CONTEXT_ISOLATION=NOT_PROVEN

SHARED_AGENT_CONTEXT_SEPARATION=NOT_PROVEN

PRODUCTION_CONTEXT_MANAGEMENT_GATE_PASSED=NO

PRODUCTION_AI_OS=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

---

# 259. Context Manager Module Status

```text
MODULE=context-manager

TOTAL_DOCUMENTS=2

CONTENT_COMPLETE_FOR_REVIEW=1

EMPTY_PLACEHOLDERS_REMAINING=1

context-management.md
=
CONTENT_COMPLETE_FOR_REVIEW

context-sharing.md
=
EMPTY_PLACEHOLDER

MODULE_RUNTIME_IMPLEMENTATION
=
NOT_PROVEN

MODULE_PRODUCTION_AUTHORIZATION
=
NO
```

---

# 260. Current Document Decision

```text
DOCUMENT_ID=AIOS-CONTEXT-MGMT-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

ENTERPRISE_GOVERNANCE_APPROVAL=PENDING

CONTEXT_AUTHORITY=DEFINED_TARGET_STATE

CONTEXT_IDENTITY=DEFINED_TARGET_STATE

CONTEXT_VERSION=DEFINED_TARGET_STATE

CONTEXT_ENVELOPE=DEFINED_TARGET_STATE

ACTOR_CONTEXT=DEFINED_TARGET_STATE

HUMAN_CONTEXT=DEFINED_TARGET_STATE

AGENT_CONTEXT=DEFINED_TARGET_STATE

SERVICE_CONTEXT=DEFINED_TARGET_STATE

ROLE_CONTEXT=DEFINED_TARGET_STATE

PRODUCT_CONTEXT=DEFINED_TARGET_STATE

PROJECT_CONTEXT=DEFINED_TARGET_STATE

CUSTOMER_CONTEXT=DEFINED_TARGET_STATE

TENANT_CONTEXT=DEFINED_TARGET_STATE

WORKFLOW_CONTEXT=DEFINED_TARGET_STATE

TASK_CONTEXT=DEFINED_TARGET_STATE

SESSION_CONTEXT=DEFINED_TARGET_STATE

RUN_CONTEXT=DEFINED_TARGET_STATE

ENVIRONMENT_CONTEXT=DEFINED_TARGET_STATE

CORRELATION_CONTEXT=DEFINED_TARGET_STATE

CAUSATION_CONTEXT=DEFINED_TARGET_STATE

AUTHORITY_REFERENCE=DEFINED_TARGET_STATE

APPROVAL_REFERENCE=DEFINED_TARGET_STATE

DELEGATION_REFERENCE=DEFINED_TARGET_STATE

CONTEXT_PROVENANCE=DEFINED_TARGET_STATE

CONTEXT_CREATION=DEFINED_TARGET_STATE

CONTEXT_VALIDATION=DEFINED_TARGET_STATE

CONTEXT_BINDING=DEFINED_TARGET_STATE

CONTEXT_INHERITANCE=DEFINED_TARGET_STATE

CONTEXT_PROPAGATION=DEFINED_TARGET_STATE

CONTEXT_MUTATION=DEFINED_TARGET_STATE

CONTEXT_SWITCHING=DEFINED_TARGET_STATE

CONTEXT_EXPIRATION=DEFINED_TARGET_STATE

CONTEXT_REFRESH=DEFINED_TARGET_STATE

CONTEXT_REVOCATION=DEFINED_TARGET_STATE

CONTEXT_INTEGRITY=DEFINED_TARGET_STATE

CONTEXT_CONFIDENTIALITY=DEFINED_TARGET_STATE

CONTEXT_MINIMIZATION=DEFINED_TARGET_STATE

PROMPT_CONTEXT=DEFINED_TARGET_STATE

MODEL_CONTEXT=DEFINED_TARGET_STATE

TOOL_CONTEXT=DEFINED_TARGET_STATE

MEMORY_CONTEXT=DEFINED_TARGET_STATE

EVENT_CONTEXT=DEFINED_TARGET_STATE

MESSAGE_CONTEXT=DEFINED_TARGET_STATE

STATE_CONTEXT=DEFINED_TARGET_STATE

INTEGRATION_CONTEXT=DEFINED_TARGET_STATE

PROJECT_ISOLATION=DEFINED_TARGET_STATE

CUSTOMER_ISOLATION=DEFINED_TARGET_STATE

TENANT_ISOLATION=DEFINED_TARGET_STATE

SHARED_AGENT_CONTEXT_SEPARATION=DEFINED_TARGET_STATE

CONTEXT_LEAKAGE_PREVENTION=DEFINED_TARGET_STATE

CONTEXT_CONFUSION_PREVENTION=DEFINED_TARGET_STATE

STALE_CONTEXT_PREVENTION=DEFINED_TARGET_STATE

CONTEXT_CACHE=DEFINED_TARGET_STATE

CONTEXT_PERSISTENCE=DEFINED_TARGET_STATE

CONTEXT_RECONSTRUCTION=DEFINED_TARGET_STATE

CONTEXT_RECOVERY=DEFINED_TARGET_STATE

CONTEXT_OBSERVABILITY=DEFINED_TARGET_STATE

CONTEXT_METRICS=DEFINED_TARGET_STATE

CONTEXT_EVIDENCE=DEFINED_TARGET_STATE

CONTEXT_AUDITABILITY=DEFINED_TARGET_STATE

CONTEXT_VERSIONING=DEFINED_TARGET_STATE

CONTEXT_COMPATIBILITY=DEFINED_TARGET_STATE

PRODUCTION_CONTEXT_MANAGEMENT_GATE=DEFINED_TARGET_STATE

CONTEXT_MANAGER_RUNTIME=NOT_IMPLEMENTED

CONTEXT_REGISTRY_RUNTIME=NOT_PROVEN

CONTEXT_BINDING_RUNTIME=NOT_PROVEN

CONTEXT_PROPAGATION_RUNTIME=NOT_PROVEN

CONTEXT_SWITCH_RUNTIME=NOT_PROVEN

CONTEXT_REVOCATION_RUNTIME=NOT_PROVEN

CONTEXT_INTEGRITY_RUNTIME=NOT_PROVEN

CONTEXT_CACHE_RUNTIME=NOT_PROVEN

CONTEXT_RECONSTRUCTION_RUNTIME=NOT_PROVEN

CONTEXT_RECOVERY_RUNTIME=NOT_PROVEN

PROJECT_CONTEXT_ISOLATION=NOT_PROVEN

CUSTOMER_CONTEXT_ISOLATION=NOT_PROVEN

TENANT_CONTEXT_ISOLATION=NOT_PROVEN

SHARED_AGENT_CONTEXT_SEPARATION=NOT_PROVEN

PRODUCTION_CONTEXT_MANAGEMENT_GATE_PASSED=NO

PRODUCTION_AI_OS=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

---

# 261. Revision History

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1.0 | 2026-08-07 | Draft | Initial AI OS Context Management outline |
| 1.0.0 | 2026-08-07 | Draft | Defined target-state Context identity, envelope, actor and scope dimensions, validation, binding, inheritance, propagation, switching, expiry, revocation, integrity, Prompt/Model/Tool/Memory/Event/Message/State/Integration Context, Project/Customer/Tenant isolation, shared-Agent separation, leakage/confusion prevention, caching, persistence, reconstruction, recovery, evidence, controlled proofs, and Production Context Management Gate |

---

# 262. Changelog Entry

Add this entry above the current latest entry in:

```text
doc/20-ai-operating-system/CHANGELOG.md
```

```markdown
## AIOS-CHG-20260807-019 — AI Operating System Context Management Standard Completed

| Field | Value |
|---|---|
| Date | 2026-08-07 |
| Change Type | `CREATED`, `CONTEXT`, `ISOLATION`, `RUNTIME-CONTROL`, `AI-OS` |
| Impact | `I5 — Foundational / Enterprise-Wide` |
| Risk | `R4 — Critical` |
| Status | Completed for Review |
| Owner | Mianx.ai Founder |
| Steward | AI Operating System Governance, Context Engineering, AI Platform Engineering, Enterprise Architecture, Security Governance, Enterprise Operations, and Enterprise Governance |
| Approver | Pending Founder and Enterprise Governance Review |

### Affected Documents

- `doc/20-ai-operating-system/context-manager/context-management.md`
- `doc/20-ai-operating-system/context-manager/context-sharing.md`
- `doc/20-ai-operating-system/configuration/system-configuration.md`
- `doc/20-ai-operating-system/communication/event-messaging.md`
- `doc/20-ai-operating-system/communication/inter-agent-protocol.md`
- `doc/20-ai-operating-system/communication/message-bus.md`
- `doc/20-ai-operating-system/memory-manager/memory-manager.md`
- `doc/20-ai-operating-system/workflow-engine/workflow-runtime.md`
- `doc/20-ai-operating-system/execution-engine/task-execution.md`
- `doc/20-ai-operating-system/state-management/state-storage.md`
- `doc/20-ai-operating-system/os-architecture.md`
- `doc/20-ai-operating-system/os-governance.md`
- `doc/20-ai-operating-system/os-security.md`
- `doc/20-ai-operating-system/os-checklists.md`

### Previous State

`context-manager/context-management.md` existed as an empty placeholder.

The AI OS root documents, Configuration Standard, Event Messaging,
Inter-Agent Protocol, and Message Bus Standard required strong runtime
Context boundaries, but no dedicated document yet defined the exact Context
identity, envelope, binding, propagation, lifecycle, switching, integrity,
shared-Agent separation, leakage prevention, reconstruction, and Production
Context proof model.

### New State

The Context Management Standard now defines:

- Context as a runtime Security and execution boundary;
- Context authority and responsibility;
- relationship to Kernel, Configuration, Governance, Security, and Prompt OS;
- Runtime Context versus LLM Context Window;
- Context identity and versioning;
- governed Context Envelope;
- Actor, Human, Agent, Agent Version, Agent Instance, Service, Role, Team,
  and Department Context;
- Product, Project, Customer, Tenant, and Workspace Context;
- Workflow, Task, Session, Run, and Environment Context;
- correlation, causation, trace, authority, Approval, and delegation
  references;
- Context classification, source, provenance, and parent Context;
- Context creation and trusted source boundaries;
- mandatory and optional Context fields;
- schema, identity, scope, hierarchy, authority, and freshness validation;
- Context binding;
- immutable Security fields and mutable metadata boundaries;
- field-specific Context inheritance;
- Context propagation and downstream revalidation;
- Context minimization;
- governed Project, Customer, and Tenant scope switching;
- fail-closed missing/invalid Context rules;
- Context expiry, refresh, revocation, and revocation propagation;
- Context integrity and signed-Context truth boundaries;
- Context confidentiality, redaction, and minimization;
- Prompt Context, Model Context, Tool Context, Memory Context, Workflow
  Context, Task Context, Event Context, Message Context, State Context, and
  Integration Context;
- Project, Customer, and Tenant Context isolation;
- Shared Agent Context, Memory, Tool, and Model separation;
- Context leakage and Context confusion prevention;
- stale Context prevention;
- Context caching and cache invalidation;
- cross-Customer and cross-Tenant cache rules;
- Context persistence;
- Context reconstruction and recovery;
- Context corruption and error classes;
- Context lifecycle and target-state state model;
- Context compatibility, migration, and deprecation;
- future Context Registry;
- Context observability, metrics, evidence, and auditability;
- Context access control, Human override, and emergency revocation;
- anti-gaming controls and prohibited Context patterns;
- controlled Context Management proofs;
- Production Context Management Gate and hard stops.

### Preserved Truth

```text
CONTEXT PRESENT
≠
CONTEXT VALID

CONTEXT VALID
≠
CONTEXT AUTHORIZED

CONTEXT INHERITED
≠
AUTHORITY INHERITED

CONTEXT SIGNED
≠
CURRENT AUTHORITY VALID

PROMPT SAYS CUSTOMER B
≠
RUNTIME CUSTOMER CONTEXT CHANGED

MESSAGE SAYS TENANT B
≠
RUNTIME TENANT CONTEXT CHANGED

SAME AGENT
≠
SAME PROJECT

SAME AGENT
≠
SAME CUSTOMER

SAME AGENT
≠
SAME TENANT

CACHE HIT
≠
AUTHORITY STILL VALID

EVENT HAS HISTORICAL CONTEXT
≠
EVENT CREATES CURRENT AUTHORITY

CONTEXT RESTORED
≠
BUSINESS STATE RECOVERED

CONTEXT MANAGEMENT GATE PASSED
≠
ENTIRE AI OS PRODUCTION AUTHORIZED
```

### Current Documentation State

```text
TOTAL_PLANNED_AI_OS_DOCUMENTS=79

CONTENT_COMPLETE_FOR_REVIEW=19

EXISTING_SUBSTANTIVE_REVIEW_PENDING=10

TOTAL_SUBSTANTIVE_CONTENT_PRESENT=29

EMPTY_PLACEHOLDERS_REMAINING=50

CONTEXT_MANAGER_MODULE_TOTAL_DOCUMENTS=2

CONTEXT_MANAGER_CONTENT_COMPLETE_FOR_REVIEW=1

CONTEXT_MANAGER_EMPTY_PLACEHOLDERS_REMAINING=1

APPROVED_DOCUMENTS=0

ACTIVE_CANONICAL_DOCUMENTS=0

PRODUCTION_CONTEXT_MANAGEMENT_GATE_PASSED=NO

PRODUCTION_AI_OS=NOT_AUTHORIZED
```

### Limitations

- Founder approval is pending.
- Enterprise Governance approval is pending.
- canonical status remains false.
- Context Manager runtime is not implemented.
- Context Registry runtime is not proven.
- Context binding runtime is not proven.
- Context propagation runtime is not proven.
- Context switching runtime is not proven.
- Context revocation runtime is not proven.
- Context integrity runtime is not proven.
- Context cache isolation is not proven.
- Context reconstruction runtime is not proven.
- Context recovery runtime is not proven.
- Shared Agent Context separation is not proven.
- Project Context isolation is not proven.
- Customer Context isolation is not proven.
- Tenant Context isolation is not proven.
- controlled Context proofs remain zero proven.
- Production Context Management Gate has not passed.
- Production AI OS remains unauthorized.

### Follow-Up

Complete:

`doc/20-ai-operating-system/context-manager/context-sharing.md`

Document ID:

`AIOS-CONTEXT-SHARE-001`

The next document must define governed Context sharing between Humans,
Agents, services, Workflows, Tasks, Models, Tools, Memory, Events,
Messages, Projects, Customers, and Tenants; share eligibility, share
requests, share grants, Context views, field-level minimization, redaction,
projection, delegated sharing, purpose limitation, recipient validation,
cross-Project sharing, cross-Customer sharing, cross-Tenant sharing,
confidentiality, consent/policy where applicable, expiration, revocation,
cache handling, downstream re-sharing, provenance, evidence, observability,
controlled Context Sharing proofs, and Production Context Sharing Gate.
```

---

# 263. Final Truth Boundary

After saving this document:

```text
COMMUNICATION_MODULE
=
CONTENT_COMPLETE_FOR_REVIEW

CONFIGURATION_MODULE
=
CONTENT_COMPLETE_FOR_REVIEW

CONTEXT_MANAGEMENT
=
CONTENT_COMPLETE_FOR_REVIEW

CONTEXT_SHARING
=
NOT_YET_DOCUMENTED

CONTEXT_MANAGER_RUNTIME
=
NOT_IMPLEMENTED

CONTEXT_REGISTRY_RUNTIME
=
NOT_PROVEN

CONTEXT_PROPAGATION_RUNTIME
=
NOT_PROVEN

CONTEXT_SWITCH_RUNTIME
=
NOT_PROVEN

CONTEXT_REVOCATION_RUNTIME
=
NOT_PROVEN

SHARED_AGENT_CONTEXT_SEPARATION
=
NOT_PROVEN

PROJECT_CONTEXT_ISOLATION
=
NOT_PROVEN

CUSTOMER_CONTEXT_ISOLATION
=
NOT_PROVEN

TENANT_CONTEXT_ISOLATION
=
NOT_PROVEN

FOUNDER_APPROVAL
=
PENDING

ENTERPRISE_GOVERNANCE_APPROVAL
=
PENDING

CANONICAL
=
FALSE

PRODUCTION_CONTEXT_MANAGEMENT_GATE
=
NOT_PASSED

PRODUCTION_AI_OS
=
NOT_AUTHORIZED
```

Completing this document defines the target-state authority, identity,
binding, propagation, isolation, lifecycle, integrity, and evidence model
for AI OS Runtime Context.

It does not prove Context runtime implementation, cross-scope isolation,
shared-Agent separation, Context recovery, or Production authorization.

---

# 264. Next Document

The next document is:

```text
doc/20-ai-operating-system/context-manager/context-sharing.md
```

Document ID:

```text
AIOS-CONTEXT-SHARE-001
```

It must define:

- Context Sharing purpose;
- Context Sharing authority;
- relationship to Context Management;
- share eligibility;
- sender/share-owner identity;
- recipient identity;
- Human recipient;
- Agent recipient;
- service recipient;
- Project recipient;
- Customer recipient;
- Tenant recipient;
- Context Share ID;
- Share Request ID;
- Share Grant ID;
- source Context;
- Context View;
- Context projection;
- field-level allowlist;
- field-level denylist;
- Data minimization;
- redaction;
- masking;
- pseudonymization relationship;
- purpose limitation;
- requested purpose;
- approved purpose;
- recipient capability;
- recipient authority;
- recipient scope;
- classification;
- confidentiality;
- share policy;
- Approval reference;
- delegation reference;
- share expiration;
- revocation;
- downstream sharing;
- re-sharing prohibition;
- derivation;
- Context lineage;
- provenance;
- same-Project sharing;
- cross-Project sharing;
- same-Customer cross-Tenant sharing;
- cross-Customer sharing;
- privileged Context sharing;
- Prompt Context sharing;
- Model Context sharing;
- Tool Context sharing;
- Memory Context sharing;
- Event Context sharing;
- Message Context sharing;
- Workflow/Task Context sharing;
- Context caching after sharing;
- cache invalidation;
- stale share prevention;
- Context leakage prevention;
- Context confusion prevention;
- integrity;
- observability;
- metrics;
- evidence;
- auditability;
- failure handling;
- lifecycle;
- versioning;
- compatibility;
- controlled Context Sharing proofs;
- Production Context Sharing Gate;
- current-state limitations;
- Changelog entry `AIOS-CHG-20260807-020`;
- after that the `context-manager/` module reaches `2/2` content complete
  for review.

---