---
id: AGENT-CAPABILITY-FRAMEWORK-001
title: Mianx.ai Agent Capability Framework
version: 1.0.0
status: Draft

description: Detailed enterprise capability framework for individual Mianx.ai Agents defining Capability identity, Versioning, taxonomy, atomic and composite Capabilities, contracts, dependencies, prerequisites, Skills, Tools, Models, Context, Memory, Security, risk, side effects, Capability assignment, eligibility, authorization separation, lifecycle, evaluation, evidence, metrics, registry integration, Project and Customer overlays, Multi-Tenant isolation, toxic combinations, deprecation, migration, Production readiness, and reusable Capability architecture across Mianx.ai.

type: Enterprise Agent Capability Framework, Agent Capability Architecture, Capability Identity Standard, Capability Versioning Standard, Capability Taxonomy, Atomic Capability Model, Composite Capability Model, Capability Contract Standard, Capability Dependency Model, Capability Assignment Model, Capability Eligibility Model, Capability Risk Model, Capability Security Standard, Capability Evaluation Framework, Capability Lifecycle Standard, Capability Reuse Standard, Multi-Project Capability Architecture, Multi-Customer Capability Architecture, Multi-Tenant Capability Architecture, Capability Registry Integration Standard, Capability Evidence Standard, Capability Metrics Standard, Capability Production Readiness Standard

class: Governed Enterprise Capability Standard for Individual Mianx.ai Agents operating across MianX Core Platform, AI Operating System, Shared AI Workforce, Project Factory, Industry Operating Systems, Multi-Project Operations, Multi-Customer Operations, Multi-Tenant Operations, Human-AI Collaboration, and future Multi-Agent Systems

category: Agent Framework Capabilities
parent: doc/22-agent-framework/capabilities

owner: Mianx.ai Founder

authority: Founder and Enterprise Governance

stewards:
  - Founder Office
  - Enterprise Governance
  - Enterprise Architecture
  - Agent Framework Governance
  - Agent Capability Governance
  - Agent Runtime Governance
  - AI Operating System Governance
  - AI Workforce Governance
  - Security Governance
  - Identity and Access Governance
  - Skills Governance
  - Tool Governance
  - Model Governance
  - Memory Governance
  - Data Governance
  - Quality Governance
  - Risk Governance
  - Evidence Governance
  - Audit Governance
  - Documentation Governance

maintainers:
  - Agent Framework Engineering
  - Agent Runtime Engineering
  - Agent Platform Engineering
  - AI Operating System Engineering
  - AI Workforce Engineering
  - Security Engineering
  - Skills Platform Engineering
  - Tool Platform Engineering
  - Model Platform Engineering
  - Memory Platform Engineering
  - Evaluation Engineering
  - Quality Engineering
  - Reliability Engineering
  - Observability Engineering
  - Documentation Governance

reviewers:
  - Founder
  - Founder Office
  - Enterprise Governance
  - Enterprise Architecture
  - Agent Framework Governance
  - Agent Capability Governance
  - Agent Runtime Governance
  - AI Operating System Governance
  - AI Workforce Governance
  - Security Governance
  - Identity and Access Governance
  - Skills Governance
  - Tool Governance
  - Model Governance
  - Memory Governance
  - Data Governance
  - Quality Governance
  - Risk Governance
  - Evidence Governance
  - Documentation Governance

created: 2026-08-08
updated: 2026-08-08

classification: Internal

audience:
  - Founder
  - Founder Office
  - Enterprise Governance
  - Enterprise Architects
  - AI Architects
  - Agent Architects
  - Agent Framework Engineers
  - Agent Runtime Engineers
  - AI Operating System Engineers
  - AI Workforce Engineers
  - Security Engineers
  - Skill Engineers
  - Tool Engineers
  - Model Engineers
  - Memory Engineers
  - Evaluation Engineers
  - Quality Engineers
  - Reliability Engineers
  - Enterprise Operators
  - Auditors
  - Documentation Maintainers
  - Authorized AI Agents

depends_on:
  - ../README.md
  - ../INDEX.md
  - ../agent-framework-architecture.md
  - ../agent-framework-capabilities.md
  - ../agent-framework-lifecycle.md
  - ../agent-framework-governance.md
  - ../agent-framework-security.md
  - ../agent-framework-metrics.md
  - ../agent-framework-checklists.md
  - ../ROADMAP.md
  - ../architecture/agent-architecture.md
  - ../architecture/component-model.md
  - ../architecture/interaction-model.md
  - ../architecture/system-architecture.md
  - ../../01-governance/AI-CONSTITUTION.md
  - ../../19-ai-workforce/README.md
  - ../../19-ai-workforce/AGENT-CAPACITY-BASELINE.md
  - ../../19-ai-workforce/VERIFIABLE-WORK-ENVELOPE.md
  - ../../20-ai-operating-system/README.md
  - ../../21-memory-engine/README.md

related_documents:
  - ./capability-mapping.md
  - ./capability-registry.md
  - ../skills/skill-framework.md
  - ../skills/skill-catalog.md
  - ../skills/skill-development.md
  - ../tools/tool-registry.md
  - ../tools/tool-permissions.md
  - ../tools/tool-selection.md
  - ../registry/agent-registry.md
  - ../registry/agent-catalog.md
  - ../registry/agent-discovery.md
  - ../evaluation/benchmarking.md
  - ../evaluation/performance-evaluation.md
  - ../evaluation/quality-scoring.md
  - ../security/access-control.md
  - ../security/agent-security.md
  - ../security/identity-management.md
  - ../lifecycle/agent-creation.md
  - ../lifecycle/agent-activation.md
  - ../lifecycle/agent-lifecycle.md
  - ../execution/task-execution.md
  - ../execution/execution-engine.md
  - ../planning/task-planning.md
  - ../reasoning/decision-making.md
  - ../monitoring/audit-logs.md
  - ../monitoring/performance-monitoring.md
  - ../types/executive-agents.md
  - ../types/manager-agents.md
  - ../types/specialist-agents.md
  - ../types/system-agents.md
  - ../types/worker-agents.md

related_modules:
  - ../../19-ai-workforce/
  - ../../20-ai-operating-system/
  - ../../21-memory-engine/
  - ../../23-multi-agent-system/
  - ../../24-automation-engine/
  - ../../27-model-management/
  - ../../29-observability-platform/
  - ../../30-enterprise-governance/
  - ../../41-security-platform/
  - ../../42-data-platform/
  - ../../44-enterprise-ai/
  - ../../46-enterprise-quality/

review_cycle:
  - At Every Material Capability Framework Change
  - At Every Capability Taxonomy Change
  - At Every Capability Contract Change
  - At Every Capability Risk Model Change
  - At Every Capability Assignment Change
  - At Every Capability Authorization Boundary Change
  - At Every Skill or Tool Dependency Model Change
  - At Every Capability Registry Change
  - Before High-Risk Capability Activation
  - Before Production Capability Authorization
  - Before Canonical Promotion
  - Quarterly During Active Build
  - Annually During Stable Operation

canonical: false

tags:
  - agent-framework
  - capabilities
  - capability-framework
  - capability-taxonomy
  - capability-versioning
  - capability-registry
  - skills
  - tools
  - models
  - memory
  - security
  - risk
  - evaluation
  - evidence
  - multi-project
  - multi-customer
  - multi-tenant
  - enterprise-ai
  - production-readiness
---

# Mianx.ai Agent Capability Framework

> **This document defines the detailed capability architecture for
> individual Mianx.ai Agents.**
>
> **A Capability describes a governed class of work an Agent is designed
> and evaluated to perform.**
>
> **A Capability is not a Role, Skill, Tool, Model, permission, approval,
> credential, or Production authorization.**
>
> ```text
> CAPABILITY
> =
> WHAT AN AGENT IS DESIGNED TO BE ABLE TO DO
>
> AUTHORITY
> =
> WHAT THAT AGENT MAY DO
> IN THE CURRENT SCOPE
> AT THE CURRENT TIME
> ```
>
> Therefore:
>
> ```text
> CAPABILITY
> ≠
> AUTHORITY
> ```
>
> An Agent may possess:
>
> ```text
> code.generate
> ```
>
> while lacking:
>
> ```text
> repository.write
> ```
>
> The Agent may therefore generate proposed code but remain unable to
> change a protected repository.
>
> **This distinction is a permanent architectural and Security
> invariant.**
>
> Runtime implementation of the Capability Framework remains
> `NOT_PROVEN` until independently evidenced.

---

# 1. Purpose

This document defines:

```text
WHAT A CAPABILITY IS

WHAT A CAPABILITY IS NOT

HOW CAPABILITIES ARE IDENTIFIED

HOW CAPABILITIES ARE VERSIONED

HOW CAPABILITIES ARE CLASSIFIED

HOW ATOMIC CAPABILITIES WORK

HOW COMPOSITE CAPABILITIES WORK

HOW CAPABILITY CONTRACTS WORK

HOW INPUTS AND OUTPUTS ARE DEFINED

HOW CAPABILITY DEPENDENCIES WORK

HOW SKILLS RELATE TO CAPABILITIES

HOW TOOLS RELATE TO CAPABILITIES

HOW MODELS RELATE TO CAPABILITIES

HOW MEMORY RELATES TO CAPABILITIES

HOW CONTEXT RELATES TO CAPABILITIES

HOW CAPABILITIES ARE ASSIGNED TO AGENTS

HOW CAPABILITY ELIGIBILITY IS DETERMINED

HOW CAPABILITY AUTHORITY IS SEPARATED

HOW CAPABILITY RISK IS CLASSIFIED

HOW SIDE EFFECTS ARE CLASSIFIED

HOW TOXIC COMBINATIONS ARE CONTROLLED

HOW CAPABILITIES ARE EVALUATED

HOW CAPABILITY EVIDENCE IS PRESERVED

HOW CAPABILITIES ARE VERSIONED AND DEPRECATED

HOW CAPABILITIES ARE REUSED

HOW PROJECT / CUSTOMER / TENANT OVERLAYS APPLY

HOW CAPABILITIES SUPPORT AI WORKFORCE ROLES

HOW CAPABILITY REGISTRY INTEGRATION WORKS

WHAT MUST BE PROVEN BEFORE PRODUCTION
```

---

# 2. Capability Framework Mission

The mission is:

> **Provide one reusable, versioned, testable, governable vocabulary of
> Agent abilities so Mianx.ai can compose thousands of Agent roles and
> configurations from shared capability primitives without embedding
> business authority or Security permissions inside those primitives.**

---

# 3. Core Capability Equation

```text
CAPABILITY
=
IDENTITY
+
CONTRACT
+
DEPENDENCIES
+
RISK
+
EVALUATION
```

---

# 4. Capability Execution Equation

A Capability can be executed safely only when:

```text
CAPABILITY ASSIGNED
+
CAPABILITY ELIGIBLE
+
REQUIRED SKILLS AVAILABLE
+
REQUIRED TOOLS AVAILABLE
+
REQUIRED MODEL AVAILABLE
+
REQUIRED CONTEXT AVAILABLE
+
REQUIRED MEMORY ACCESS ALLOWED
+
CURRENT AUTHORIZATION
+
CURRENT SCOPE
+
CURRENT APPROVAL WHERE REQUIRED
=
EXECUTABLE CAPABILITY
```

---

# 5. Capability vs Authority

Permanent rule:

```text
CAPABILITY
≠
AUTHORITY
```

---

# 6. Capability vs Permission

```text
CAPABILITY
≠
PERMISSION
```

Example:

```text
Capability:
database.analyze
```

does not create:

```text
Permission:
production_database.read
```

---

# 7. Capability vs Role

```text
ROLE
≠
CAPABILITY
```

A Role may require multiple Capabilities.

---

# 8. Capability vs Skill

```text
CAPABILITY
≠
SKILL
```

Capability describes an ability class.

Skill provides reusable implementation knowledge or procedure supporting
that ability.

---

# 9. Capability vs Tool

```text
CAPABILITY
≠
TOOL
```

A Capability may depend on zero, one, or many Tools.

---

# 10. Capability vs Model

```text
CAPABILITY
≠
MODEL
```

Models are execution resources.

Capabilities remain logical Agent abilities.

---

# 11. Capability vs Task

```text
CAPABILITY
≠
TASK
```

A Task is work to be completed.

A Capability describes the ability needed to perform that work.

---

# 12. Capability vs Workflow

```text
CAPABILITY
≠
WORKFLOW
```

A Workflow may require multiple Capabilities across one or many Agents.

---

# 13. Capability vs Persona

```text
PERSONA
≠
CAPABILITY
```

Changing communication style must not create new technical ability.

---

# 14. Capability Identity

Every governed Capability should have stable identity.

Conceptually:

```text
capability_id
```

---

# 15. Capability ID Properties

Capability IDs should be:

```text
UNIQUE

STABLE

MACHINE-READABLE

HUMAN-UNDERSTANDABLE

NON-AMBIGUOUS
```

---

# 16. Capability Naming

Preferred conceptual style:

```text
domain.action
```

Examples:

```text
code.read

code.analyze

code.generate

code.review

security.scan

security.assess

data.query

data.analyze

document.summarize

document.generate
```

Exact taxonomy requires governance.

---

# 17. Capability Naming Rule

Names should describe:

```text
ABILITY
```

not:

```text
AUTHORITY
```

Avoid confusing names such as:

```text
admin.full_access
```

as a Capability.

---

# 18. Capability Version

Material Capability contract changes should be attributable.

Potential:

```text
capability_version
```

---

# 19. Versioning Purpose

Versioning supports:

```text
REPRODUCIBILITY

EVALUATION

COMPATIBILITY

MIGRATION

ROLLBACK

AUDIT

DEPRECATION
```

---

# 20. Material Capability Change

Potential reasons for new Version:

```text
INPUT CONTRACT CHANGE

OUTPUT CONTRACT CHANGE

DEPENDENCY CHANGE

RISK CHANGE

SIDE-EFFECT CHANGE

SECURITY REQUIREMENT CHANGE

EVALUATION CHANGE

BEHAVIORAL SEMANTIC CHANGE
```

---

# 21. Capability Version Rule

```text
SAME ID
+
MATERIAL NEW CONTRACT
=
NEW CAPABILITY VERSION
```

where governance determines it material.

---

# 22. Capability Definition

Conceptually:

```yaml
capability:
  capability_id: required
  version: required

  name: required
  description: required

  category: required

  capability_type: required

  owner: required

  lifecycle_state: required

  risk_class: required
  side_effect_class: required

  input_contract: conditional
  output_contract: conditional

  prerequisites: conditional

  required_skills: conditional
  required_tools: conditional
  model_requirements: conditional
  context_requirements: conditional
  memory_requirements: conditional

  security_requirements: required

  evaluation_profile: required

  evidence_requirements: conditional

  metadata: conditional
```

This is conceptual architecture.

No current runtime schema is claimed.

---

# 23. Capability Taxonomy

Capabilities should be organized into a governed taxonomy.

---

# 24. Taxonomy Purpose

A taxonomy improves:

```text
DISCOVERY

REUSE

MAPPING

ROUTING

GOVERNANCE

EVALUATION

RISK REVIEW
```

---

# 25. Potential Capability Domains

Illustrative domains:

```text
reasoning

planning

research

knowledge

document

code

software

data

security

quality

product

design

marketing

seo

sales

finance

operations

support

communication

automation

infrastructure

deployment

analytics
```

These examples do not establish a canonical registry.

---

# 26. Taxonomy Boundary

Detailed canonical Capability entries belong in:

```text
capability-registry.md
```

and implementation-backed registry systems when built.

---

# 27. Atomic Capability

An atomic Capability represents one bounded logical ability.

Example:

```text
code.review
```

---

# 28. Atomic Capability Characteristics

Prefer:

```text
CLEAR PURPOSE

BOUNDED INPUT

BOUNDED OUTPUT

TESTABLE BEHAVIOR

EXPLICIT DEPENDENCIES

EXPLICIT RISK
```

---

# 29. Atomic Capability Anti-Pattern

Avoid excessively broad capabilities such as:

```text
software_engineering.everything
```

when meaningful decomposition is possible.

---

# 30. Composite Capability

A composite Capability represents a governed composition of multiple
Capabilities.

Example:

```text
software.feature_delivery
```

may conceptually require:

```text
requirements.analyze

code.generate

code.test

code.review
```

---

# 31. Composite Capability Rule

```text
COMPOSITE CAPABILITY
DOES NOT
AUTOMATICALLY UNION
ALL PERMISSIONS
```

---

# 32. Composite Eligibility

Composite Capability eligibility requires eligible underlying
dependencies.

---

# 33. Composite Failure

If a required component Capability is unavailable:

```text
COMPOSITE CAPABILITY
=
INELIGIBLE
OR
DEGRADED
```

according to its contract.

---

# 34. Capability Contract

Every material Capability should define a contract.

---

# 35. Contract Elements

Potential:

```text
PURPOSE

INPUTS

OUTPUTS

PRECONDITIONS

DEPENDENCIES

SIDE EFFECTS

FAILURE MODES

SECURITY REQUIREMENTS

EVIDENCE REQUIREMENTS

EVALUATION REQUIREMENTS
```

---

# 36. Input Contract

Input contracts may define:

```text
INPUT TYPE

REQUIRED FIELDS

OPTIONAL FIELDS

CLASSIFICATION

VALIDATION

SCOPE REQUIREMENTS
```

---

# 37. Output Contract

Output contracts may define:

```text
OUTPUT TYPE

SCHEMA

QUALITY EXPECTATION

EVIDENCE EXPECTATION

SIDE-EFFECT EXPECTATION
```

---

# 38. Capability Preconditions

Potential:

```text
REQUIRED CONTEXT

REQUIRED MEMORY

REQUIRED TOOL

REQUIRED MODEL CLASS

REQUIRED APPROVAL

REQUIRED ENVIRONMENT
```

---

# 39. Precondition Rule

```text
PRECONDITION MISSING
≠
IGNORE PRECONDITION
```

---

# 40. Capability Postconditions

Where appropriate, define expected resulting state.

Example:

```text
TEST SUITE EXECUTED

REPORT GENERATED

REPOSITORY DIFF PRODUCED
```

---

# 41. Postcondition Boundary

Agent narrative does not prove a postcondition.

---

# 42. Capability Dependencies

Capabilities may depend on:

```text
OTHER CAPABILITIES

SKILLS

TOOLS

MODELS

CONTEXT

MEMORY

DATA

APPROVAL

PLATFORM SERVICES
```

---

# 43. Hard Dependency

A hard dependency is required.

Without it:

```text
CAPABILITY
=
INELIGIBLE
```

---

# 44. Optional Dependency

Optional dependencies may improve quality without being mandatory.

---

# 45. Fallback Dependency

A capability may support an approved fallback.

---

# 46. Dependency Boundary

Fallback must not violate:

```text
SECURITY

QUALITY

DATA POLICY

CUSTOMER POLICY

TENANT POLICY
```

---

# 47. Capability Dependency Graph

The platform may eventually represent:

```text
CAPABILITY A
├── CAPABILITY B
├── SKILL C
├── TOOL D
└── MODEL REQUIREMENT E
```

---

# 48. Cyclic Dependency

Capability dependency cycles should be detected where they make
execution resolution invalid or ambiguous.

---

# 49. Skill Dependency

Capabilities may require reusable Skills.

---

# 50. Skill Example

Conceptually:

```text
Capability:
code.review

Skills:
secure-code-review
typescript-review
repository-navigation
```

---

# 51. Skill Boundary

```text
REQUIRED SKILL AVAILABLE
≠
TOOL PERMISSION AVAILABLE
```

---

# 52. Tool Dependency

A Capability may require a Tool operation.

---

# 53. Tool Dependency Example

```text
Capability:
repository.inspect

Required Tool:
repository.read
```

---

# 54. Tool Dependency Rule

Capability Definition should reference Tool requirements.

It should not contain unrestricted credentials.

---

# 55. Tool Availability Boundary

```text
TOOL AVAILABLE
≠
TOOL AUTHORIZED
```

---

# 56. Model Requirement

A Capability may specify Model requirements rather than a permanent
single provider.

---

# 57. Model Requirement Examples

Potential:

```text
STRUCTURED OUTPUT

TOOL CALLING

CODE REASONING

VISION

LONG CONTEXT

LOW LATENCY

HIGH ACCURACY
```

---

# 58. Model Boundary

```text
MODEL SUPPORTS CAPABILITY
≠
AGENT HAS CAPABILITY
```

---

# 59. Model Eligibility

Model eligibility remains governed by Model Management and current
policy.

---

# 60. Context Requirement

A Capability may define minimum required Context.

---

# 61. Context Examples

Potential:

```text
PROJECT REQUIREMENTS

REPOSITORY CONTEXT

CUSTOMER POLICY

TASK STATE

SYSTEM ARCHITECTURE

DOMAIN KNOWLEDGE
```

---

# 62. Context Rule

Capability Definition must not imply access to all available Context.

---

# 63. Memory Requirement

Capabilities may request specific governed Memory types.

---

# 64. Memory Examples

Potential:

```text
WORKING MEMORY

PROJECT MEMORY

AGENT MEMORY

SEMANTIC MEMORY

EPISODIC MEMORY
```

subject to Memory Engine architecture.

---

# 65. Memory Boundary

```text
CAPABILITY REQUIRES MEMORY
≠
CAPABILITY MAY READ ALL MEMORY
```

---

# 66. Data Requirement

A Capability may require Data categories.

---

# 67. Data Boundary

```text
CAPABILITY REQUIRES CUSTOMER DATA
≠
ALL CUSTOMER DATA AUTHORIZED
```

---

# 68. Security Requirements

Every Capability should have known Security implications.

---

# 69. Capability Security Attributes

Potential:

```text
RISK CLASS

SIDE-EFFECT CLASS

DATA CLASSIFICATION

TOOL RISK

NETWORK RISK

EXTERNAL COMMUNICATION RISK

APPROVAL REQUIREMENT

ENVIRONMENT RESTRICTION
```

---

# 70. Capability Risk Classification

A potential model:

```text
R0 — PASSIVE / INFORMATIONAL

R1 — LOW RISK

R2 — MODERATE RISK

R3 — HIGH RISK

R4 — CRITICAL / PRIVILEGED
```

Exact canonical taxonomy requires governance approval.

---

# 71. Risk Classification Factors

Consider:

```text
DATA SENSITIVITY

SIDE EFFECT

REVERSIBILITY

FINANCIAL IMPACT

CUSTOMER IMPACT

SECURITY IMPACT

LEGAL IMPACT

PRODUCTION IMPACT

BLAST RADIUS

AUTONOMY
```

---

# 72. Risk Boundary

Risk is not determined only by Capability identity.

Actual risk may depend on execution scope.

---

# 73. Contextual Risk

Example:

```text
code.generate
```

may be low-risk if output is a draft.

It becomes more consequential when paired with:

```text
repository.write

production.deploy
```

---

# 74. Side-Effect Classification

Capabilities should describe expected side-effect class.

Potential:

```text
NO_SIDE_EFFECT

READ_ONLY

GENERATES_ARTIFACT

MUTATES_INTERNAL_STATE

MUTATES_EXTERNAL_STATE

DESTRUCTIVE

EXTERNAL_COMMUNICATION

FINANCIAL

PRIVILEGED_SECURITY
```

---

# 75. Side-Effect Rule

```text
ABILITY TO GENERATE ACTION
≠
ABILITY TO EXECUTE ACTION
```

---

# 76. Reversibility

Capabilities involving side effects may classify:

```text
REVERSIBLE

COMPENSATABLE

PARTIALLY REVERSIBLE

IRREVERSIBLE
```

---

# 77. Destructive Capability

High-impact destructive capabilities require stronger governance.

---

# 78. Capability Assignment

Agent Versions may receive Capability assignments.

---

# 79. Assignment Concept

```text
AGENT VERSION
→
CAPABILITY ID
→
CAPABILITY VERSION
```

---

# 80. Assignment Boundary

```text
CAPABILITY ASSIGNED
≠
CAPABILITY EXECUTABLE EVERYWHERE
```

---

# 81. Assignment Source

Assignments should derive from trusted Agent Definition/Version
configuration.

---

# 82. Self-Assignment Rule

Agents must not self-assign protected Capabilities through normal
reasoning.

---

# 83. Capability Removal

A Capability may be removed from future Agent Versions.

---

# 84. Runtime Revocation

Current policies may also make an otherwise assigned Capability
temporarily ineligible.

---

# 85. Capability Eligibility

Eligibility answers:

> **Can this Agent Version currently be considered for this Capability?**

---

# 86. Eligibility Inputs

Potential:

```text
AGENT VERSION

CAPABILITY ASSIGNMENT

CAPABILITY VERSION

LIFECYCLE STATE

DEPENDENCIES

PROJECT

CUSTOMER

TENANT

ENVIRONMENT

CURRENT POLICY

CURRENT RISK RESTRICTIONS
```

---

# 87. Eligibility Equation

```text
ASSIGNED
+
ACTIVE
+
DEPENDENCIES AVAILABLE
+
SCOPE ELIGIBLE
+
POLICY ELIGIBLE
=
CAPABILITY ELIGIBLE
```

---

# 88. Eligibility Boundary

```text
ELIGIBLE
≠
AUTHORIZED ACTION
```

---

# 89. Runtime Authorization

After Capability eligibility, protected work still requires applicable:

```text
RESOURCE AUTHORIZATION

TOOL AUTHORIZATION

DATA AUTHORIZATION

APPROVAL

CURRENT SECURITY
```

---

# 90. Capability Execution Gate

Conceptually:

```text
TASK
↓
REQUIRED CAPABILITY
↓
AGENT HAS CAPABILITY?
↓
CAPABILITY ELIGIBLE?
↓
DEPENDENCIES READY?
↓
CURRENT AUTHORIZATION?
↓
APPROVAL IF REQUIRED?
↓
EXECUTION
```

---

# 91. Capability Discovery

Agent Router or planners may query available Capabilities.

---

# 92. Discovery Boundary

Capability discovery must not leak unauthorized Agent or Customer
information.

---

# 93. Agent Matching

Agent routing may consider:

```text
REQUIRED CAPABILITY

CAPABILITY VERSION

QUALITY

AVAILABILITY

COST

LATENCY

CURRENT SCOPE
```

---

# 94. Matching Rule

```text
BEST CAPABILITY MATCH
+
NO CURRENT AUTHORITY
=
NOT ELIGIBLE FOR EXECUTION
```

---

# 95. Capability Profiles

Agent Definitions may use Capability Profiles.

---

# 96. Capability Profile

Potential:

```yaml
capability_profile:
  required:
    - capability_a
    - capability_b

  optional:
    - capability_c

  restricted:
    - capability_d
```

Conceptual only.

---

# 97. Agent Type Capability Baseline

Agent Types may define baseline capability sets.

Example:

```text
SPECIALIST AGENT
→
DOMAIN ANALYSIS
→
DOMAIN EXECUTION
→
DOMAIN VALIDATION
```

depending on Type definition.

---

# 98. Role Capability Mapping

AI Workforce Roles may map to expected capabilities.

---

# 99. Role Mapping Rule

```text
ROLE REQUIRES CAPABILITY
```

does not mean:

```text
ROLE GRANTS PERMISSION
```

---

# 100. Capability Mapping

Detailed Agent/Role/Type mapping belongs to:

```text
capability-mapping.md
```

---

# 101. Capability Registry

Capability Definitions should be discoverable through a governed
registry/catalog.

---

# 102. Registry Purpose

Capability Registry should eventually answer:

```text
WHAT CAPABILITY EXISTS?

WHICH VERSION?

WHAT DOES IT DO?

WHO OWNS IT?

WHAT RISK?

WHAT DEPENDENCIES?

WHAT AGENTS USE IT?

IS IT ACTIVE?

IS IT DEPRECATED?
```

---

# 103. Registry Boundary

```text
REGISTERED CAPABILITY
≠
APPROVED FOR EVERY AGENT
```

---

# 104. Capability Registry Detail

Detailed registry architecture belongs to:

```text
capability-registry.md
```

---

# 105. Capability Lifecycle

Potential lifecycle:

```text
PROPOSED

DRAFT

REVIEW

EVALUATING

APPROVED

ACTIVE

RESTRICTED

DEPRECATED

RETIRED
```

---

# 106. Lifecycle Boundary

```text
CAPABILITY ACTIVE
≠
AGENT AUTHORIZED
```

---

# 107. Proposed Capability

A new Capability begins as a governed proposal.

---

# 108. Capability Review

Review may assess:

```text
PURPOSE

DUPLICATION

RISK

DEPENDENCIES

SECURITY

EVALUATION

REUSE VALUE
```

---

# 109. Capability Approval

Approval makes a Capability eligible for controlled use according to
governance.

---

# 110. Capability Activation

Activation makes the Capability available for governed assignment or
resolution.

---

# 111. Capability Restriction

Capability may be temporarily restricted due to:

```text
SECURITY ISSUE

QUALITY ISSUE

DEPENDENCY FAILURE

INCIDENT

REGULATORY CHANGE
```

---

# 112. Capability Deprecation

Deprecated capability remains historically identifiable while new use
is discouraged or blocked according to policy.

---

# 113. Capability Retirement

Retirement prevents normal future use.

---

# 114. Historical Capability Preservation

Historical Agent Runs should preserve which Capability Version applied
where required.

---

# 115. Capability Migration

When moving from Capability V1 to V2:

```text
CURRENT USERS

COMPATIBILITY

DEPENDENCIES

EVALUATION

RISK

ROLLBACK

HISTORICAL TRACEABILITY
```

should be assessed.

---

# 116. Capability Deprecation Rule

Do not silently rewrite old Capability semantics.

---

# 117. Capability Duplication Control

Before creating a new Capability ask:

```text
DOES AN EXISTING CAPABILITY ALREADY COVER THIS ABILITY?

IS THIS ACTUALLY A SKILL?

IS THIS ACTUALLY A TOOL?

IS THIS ACTUALLY A ROLE?

IS THIS ACTUALLY A TASK?

IS THIS JUST A CONFIGURATION VARIANT?
```

---

# 118. Capability Proliferation Risk

Too many overlapping Capability IDs can create:

```text
ROUTING CONFUSION

EVALUATION DUPLICATION

POLICY INCONSISTENCY

MAINTENANCE COST

AGENT CONFIGURATION DRIFT
```

---

# 119. Capability Reuse

Capabilities should be reusable across:

```text
AGENTS

ROLES

DEPARTMENTS

PROJECTS

CUSTOMERS

INDUSTRIES
```

where semantics are truly shared.

---

# 120. Reuse Boundary

```text
REUSE CAPABILITY DEFINITION
≠
REUSE AUTHORITY
```

---

# 121. Multi-Project Capability Architecture

The same Agent Capability may serve different Projects.

---

# 122. Project Overlay

Project-specific overlays may:

```text
ENABLE

RESTRICT

CONFIGURE

REQUIRE EXTRA APPROVAL
```

for applicable Capability use.

---

# 123. Project Rule

```text
CAPABILITY ALLOWED
IN PROJECT A
≠
CAPABILITY ALLOWED
IN PROJECT B
```

---

# 124. Cross-Project Security

Capability use must not become a mechanism to cross Project boundaries.

---

# 125. Multi-Customer Capability Architecture

Customers may impose additional restrictions.

---

# 126. Customer Overlay

Potential:

```text
DISALLOW CERTAIN MODEL

DISALLOW CERTAIN TOOL

REQUIRE HUMAN APPROVAL

DISALLOW EXTERNAL COMMUNICATION

REDUCE AUTONOMY
```

---

# 127. Customer Rule

Customer overlay may narrow Agent use.

It must not weaken mandatory core Security.

---

# 128. Multi-Tenant Capability Architecture

Capability resolution must preserve Tenant scope.

---

# 129. Tenant Rule

```text
CAPABILITY AVAILABLE
IN TENANT A
≠
CAPABILITY AVAILABLE
IN TENANT B
```

---

# 130. Tenant Capability Scope

Tenant-specific conditions may include:

```text
TOOLS

DATA

MEMORY

BUDGET

MODEL

AUTONOMY

APPROVAL
```

---

# 131. Environment Capability Scope

Capabilities may have environment restrictions.

Example:

```text
deployment.prepare
```

may be permitted in staging while:

```text
deployment.execute
```

remains unauthorized in Production.

---

# 132. Environment Rule

```text
CAPABILITY VERIFIED IN TEST
≠
CAPABILITY AUTHORIZED IN PRODUCTION
```

---

# 133. Capability Autonomy

Autonomy should be bounded independently from Capability assignment.

---

# 134. Autonomy Example

Agent may have:

```text
email.compose
```

with autonomy:

```text
GENERATE_DRAFT_ONLY
```

while another approved context may allow:

```text
SEND_AFTER_APPROVAL
```

---

# 135. Autonomy Rule

```text
CAPABILITY PRESENT
≠
AUTONOMOUS EXECUTION
```

---

# 136. Capability Approval Requirements

Capabilities may specify risk-based approval requirements.

Potential:

```text
NONE

HUMAN REVIEW

MANAGER APPROVAL

SECURITY APPROVAL

FOUNDER APPROVAL

MULTI-PARTY APPROVAL
```

depending on governance.

---

# 137. Approval Boundary

Capability metadata indicates required approval.

It does not generate the approval itself.

---

# 138. Separation of Duties

Some Capabilities must not be combined freely.

---

# 139. Toxic Capability Combination

A toxic combination exists when multiple individually valid capabilities
create unacceptable concentrated authority.

---

# 140. Example Toxic Combination

Conceptually:

```text
payment.prepare
+
payment.approve
+
payment.execute
```

may violate separation of duties.

---

# 141. Another Toxic Combination

```text
security.policy.modify
+
security.audit.modify
```

may create governance risk.

---

# 142. Toxic Combination Rule

Capability assignment should support:

```text
CONFLICT CHECK
```

where governance requires it.

---

# 143. Capability Conflict Model

Potential:

```yaml
capability_conflict:
  capability_a: required
  capability_b: required

  scope: conditional

  severity: required

  rule:
    - DENY
    - REQUIRE_EXCEPTION
    - REQUIRE_SEPARATION
```

Conceptual only.

---

# 144. Capability Bundles

Reusable Capability Bundles may exist.

---

# 145. Bundle Boundary

```text
CAPABILITY BUNDLE
≠
PERMISSION BUNDLE
```

---

# 146. Agent Role Bundle

A Role may reference a standard Capability Bundle.

---

# 147. Industry Capability Packs

Industry Operating Systems may define domain-specific Capability packs.

Examples:

```text
RESTAURANT OPERATIONS

POULTRY OPERATIONS

FUTURE HOSPITAL OPERATIONS

FUTURE SCHOOL OPERATIONS
```

subject to domain governance.

---

# 148. Industry Pack Rule

Industry-specific Capabilities should use common framework contracts.

---

# 149. Customer Capability Extensions

Customer-specific Capabilities may exist when genuinely unique.

---

# 150. Customer Extension Anti-Pattern

Do not create duplicate Customer-specific Capability IDs when a shared
core Capability plus configuration is sufficient.

---

# 151. Capability Evaluation

A Capability must be testable.

---

# 152. Evaluation Question

The system should be able to answer:

> **Can this Agent Version perform this Capability to the required
> quality under defined conditions?**

---

# 153. Capability Evaluation Dimensions

Potential:

```text
CORRECTNESS

COMPLETENESS

QUALITY

CONSISTENCY

SECURITY

POLICY COMPLIANCE

LATENCY

COST

FAILURE HANDLING

EVIDENCE QUALITY
```

---

# 154. Capability Benchmark

Benchmarking may use standardized task sets.

---

# 155. Benchmark Boundary

```text
MODEL BENCHMARK SCORE
≠
AGENT CAPABILITY VERIFIED
```

---

# 156. Agent-Level Evaluation

Evaluation must include the actual relevant combination of:

```text
AGENT VERSION

PROMPT

MODEL

TOOLS

SKILLS

CONTEXT

MEMORY

SECURITY CONTROLS
```

where applicable.

---

# 157. Capability Verification

Potential states:

```text
NOT_TESTED

EVALUATING

FAILED

PARTIALLY_VERIFIED

VERIFIED_FOR_SCOPE
```

---

# 158. Verification Scope

Capability verification may be specific to:

```text
AGENT VERSION

MODEL PROFILE

TOOL PROFILE

ENVIRONMENT

PROJECT TYPE

RISK CLASS
```

---

# 159. Verification Boundary

```text
VERIFIED FOR SCOPE A
≠
VERIFIED FOR ALL SCOPE
```

---

# 160. Capability Quality Threshold

Quality thresholds should derive from business/risk requirements rather
than arbitrary universal numbers.

---

# 161. No Fake KPI Rule

This document does not claim live Capability quality percentages.

---

# 162. Capability Regression

Changes to:

```text
AGENT VERSION

MODEL

PROMPT

SKILL

TOOL

CONTEXT

MEMORY
```

may require Capability regression evaluation.

---

# 163. Regression Rule

```text
NEWER MODEL
≠
CAPABILITY REGRESSION SAFE
```

---

# 164. Capability Evidence

Evaluation claims should preserve Evidence.

---

# 165. Evidence Examples

Potential:

```text
BENCHMARK RESULT

TEST RESULT

TOOL RESULT

OUTPUT ARTIFACT

VALIDATION RESULT

SECURITY TEST

HUMAN REVIEW
```

---

# 166. Evidence Boundary

```text
AGENT CLAIMS CAPABILITY
≠
CAPABILITY VERIFIED
```

---

# 167. Capability Metrics

Potential:

```text
CAPABILITY_USAGE

CAPABILITY_SUCCESS

CAPABILITY_VERIFIED_SUCCESS

CAPABILITY_FAILURE

CAPABILITY_DENIAL

CAPABILITY_LATENCY

CAPABILITY_COST

CAPABILITY_ESCALATION

CAPABILITY_HUMAN_INTERVENTION

CAPABILITY_QUALITY
```

---

# 168. Metric Scope

Metrics should preserve applicable:

```text
AGENT

VERSION

CAPABILITY VERSION

PROJECT

CUSTOMER

TENANT

ENVIRONMENT
```

without exposing sensitive Data unnecessarily.

---

# 169. Verified Capability Success

A high-value metric is:

```text
VERIFIED_CAPABILITY_SUCCESS_RATE
```

not self-reported completion.

---

# 170. Capability Failure

Failures should distinguish:

```text
AGENT QUALITY FAILURE

MISSING CAPABILITY

MISSING DEPENDENCY

AUTHORIZATION DENIAL

TOOL FAILURE

MODEL FAILURE

MEMORY FAILURE

CONTEXT FAILURE

VALIDATION FAILURE

BUDGET FAILURE
```

---

# 171. Denial Boundary

An authorization denial is not necessarily a Capability failure.

The Agent may be capable but unauthorized.

---

# 172. Capability Degradation

Capability may become temporarily degraded due to:

```text
MODEL OUTAGE

TOOL OUTAGE

MEMORY OUTAGE

PARTIAL DEPENDENCY FAILURE
```

---

# 173. Degraded Capability Rule

Degraded execution must remain within approved contract.

---

# 174. Capability Fallback

Fallback may use:

```text
ALTERNATE SKILL

ALTERNATE TOOL

ALTERNATE MODEL
```

only when permitted.

---

# 175. Fallback Security

Fallback must not broaden authority.

---

# 176. Capability Cost

Capabilities may have cost profiles.

---

# 177. Cost Dimensions

Potential:

```text
MODEL COST

TOOL COST

TIME

TOKENS

COMPUTE

STORAGE

EXTERNAL SERVICE COST
```

---

# 178. Cost Boundary

```text
CHEAPER
≠
BETTER

MORE EXPENSIVE
≠
MORE AUTHORIZED
```

---

# 179. Capability Budget

Projects/Customers/Tenants may impose Capability-specific budgets.

---

# 180. Capability Capacity

Agent availability may consider whether sufficient capacity exists to
perform a Capability.

---

# 181. Capacity Boundary

```text
AGENT HAS CAPABILITY
≠
AGENT HAS CURRENT CAPACITY
```

---

# 182. Capability Routing

Agent Router may rank Agents by Capability fitness.

---

# 183. Routing Inputs

Potential:

```text
CAPABILITY MATCH

VERIFIED QUALITY

AVAILABILITY

LATENCY

COST

PROJECT ELIGIBILITY

CUSTOMER ELIGIBILITY

TENANT ELIGIBILITY

SECURITY ELIGIBILITY
```

---

# 184. Routing Hard Rule

```text
QUALITY SCORE
CANNOT
OVERRIDE
AUTHORIZATION
```

---

# 185. Capability Discovery for Planning

Planner may discover eligible capabilities needed for a Task.

---

# 186. Planning Boundary

Planner may request a Capability.

Planner cannot create it or authorize it.

---

# 187. Capability Delegation

An Agent may delegate work requiring another Capability.

---

# 188. Delegation Rule

```text
AGENT A
LACKS CAPABILITY X

CAN
REQUEST
ELIGIBLE AGENT B

BUT
CANNOT
COPY
AGENT B'S AUTHORITY
```

---

# 189. Multi-Agent Capability Composition

Multi-Agent System may combine Agents with complementary Capabilities.

---

# 190. Multi-Agent Boundary

Detailed team coordination remains owned by:

```text
doc/23-multi-agent-system/
```

---

# 191. Capability Communication

Agent-to-Agent messages may declare:

```text
CAPABILITY REQUIRED
```

but receiver eligibility must be resolved independently.

---

# 192. Capability Security Threats

The framework must account for:

```text
SELF-ASSIGNMENT

CAPABILITY SPOOFING

CAPABILITY VERSION SPOOFING

TOXIC COMBINATION

CAPABILITY-TO-PERMISSION CONFUSION

PROJECT SCOPE ESCAPE

CUSTOMER SCOPE ESCAPE

TENANT SCOPE ESCAPE

TOOL PRIVILEGE ESCALATION

MODEL-BASED AUTHORITY ESCALATION

MEMORY-BASED CAPABILITY ESCALATION

PROMPT-BASED CAPABILITY ESCALATION
```

---

# 193. Capability Spoofing

Agent text saying:

```text
"I HAVE SECURITY ADMIN CAPABILITY"
```

must not modify trusted Capability assignments.

---

# 194. Prompt Capability Injection

Untrusted Prompt content must not add Capabilities.

---

# 195. Memory Capability Injection

Memory content must not add Capabilities.

---

# 196. Tool Capability Injection

Tool output must not add Capabilities.

---

# 197. Peer-Agent Capability Injection

Another Agent message must not add Capabilities.

---

# 198. Capability Integrity

Capability assignments should be protected authoritative configuration.

---

# 199. Capability Drift

Runtime Capability profile should be comparable against approved
Agent Version configuration.

---

# 200. Capability Drift Response

Potential:

```text
ALERT

RESTRICT

SUSPEND

RECONCILE

ROLL BACK
```

depending on risk.

---

# 201. Capability Audit

Material changes may audit:

```text
CAPABILITY CREATED

VERSION CREATED

APPROVED

ASSIGNED

REMOVED

RESTRICTED

DEPRECATED

RETIRED
```

---

# 202. Capability Assignment Audit

Audit should identify:

```text
WHO CHANGED IT

WHICH AGENT

WHICH VERSION

WHICH CAPABILITY

WHICH CAPABILITY VERSION

WHEN

WHY
```

where required.

---

# 203. Capability Governance

Capability governance should identify:

```text
OWNER

STEWARD

REVIEWER

RISK OWNER

SECURITY REVIEWER

EVALUATION OWNER
```

as applicable.

---

# 204. Capability Change Management

Material changes should include:

```text
CHANGE REASON

IMPACT

DEPENDENCY IMPACT

SECURITY IMPACT

AGENT IMPACT

PROJECT IMPACT

CUSTOMER IMPACT

MIGRATION

ROLLBACK
```

---

# 205. Capability Compatibility

A new Capability Version should declare compatibility where relevant.

Potential:

```text
BACKWARD_COMPATIBLE

CONDITIONALLY_COMPATIBLE

BREAKING
```

---

# 206. Breaking Capability Change

Breaking changes may require:

```text
AGENT VERSION UPDATE

NEW EVALUATION

NEW SECURITY REVIEW

MIGRATION
```

---

# 207. Capability Retirement Impact

Before retirement identify:

```text
AGENTS USING IT

ROLES USING IT

PROJECTS USING IT

CUSTOMERS USING IT

COMPOSITE CAPABILITIES DEPENDING ON IT
```

---

# 208. Capability Template

A Capability Definition template may standardize creation.

---

# 209. Capability Template Boundary

Template provides structure.

It is not automatic approval.

---

# 210. New Capability Decision Framework

Before creating one ask:

```text
WHAT NEW ABILITY EXISTS?

WHY DOES AN EXISTING CAPABILITY NOT COVER IT?

IS THIS ACTUALLY A SKILL?

IS THIS ACTUALLY A TOOL?

IS THIS ACTUALLY A TASK?

IS THIS ACTUALLY A ROLE?

CAN THIS BE CONFIGURATION INSTEAD?

WHAT RISK DOES IT INTRODUCE?

HOW WILL IT BE TESTED?
```

---

# 211. Capability Granularity Decision

Ask:

```text
CAN THIS CAPABILITY BE TESTED INDEPENDENTLY?

IS IT TOO BROAD?

IS IT TOO NARROW?

WILL IT BE REUSED?

DOES IT HAVE ONE CLEAR SEMANTIC PURPOSE?
```

---

# 212. Capability Dependency Decision

Ask:

```text
WHAT SKILLS ARE REQUIRED?

WHAT TOOLS ARE REQUIRED?

WHAT MODELS ARE REQUIRED?

WHAT MEMORY IS REQUIRED?

WHAT CONTEXT IS REQUIRED?

WHAT SECURITY IS REQUIRED?

WHAT APPROVAL IS REQUIRED?
```

---

# 213. Capability Risk Decision

Ask:

```text
CAN IT READ SENSITIVE DATA?

CAN IT MUTATE STATE?

CAN IT DELETE?

CAN IT DEPLOY?

CAN IT SEND EXTERNALLY?

CAN IT MOVE MONEY?

CAN IT CHANGE SECURITY?

IS IT REVERSIBLE?

WHAT IS THE BLAST RADIUS?
```

---

# 214. Assignment Decision

Before assigning a Capability to an Agent ask:

```text
DOES THE ROLE REQUIRE IT?

HAS THE AGENT VERSION BEEN EVALUATED FOR IT?

ARE DEPENDENCIES AVAILABLE?

DOES IT CREATE A TOXIC COMBINATION?

WHAT PROJECTS NEED IT?

WHAT CUSTOMER RESTRICTIONS EXIST?

WHAT TENANT RESTRICTIONS EXIST?
```

---

# 215. Production Capability Decision

Before Production use ask:

```text
IS THE CAPABILITY APPROVED?

IS THE CAPABILITY VERSION APPROVED?

IS THE AGENT VERSION APPROVED FOR IT?

IS THE SCOPE CORRECT?

IS THE TOOL AUTHORITY CORRECT?

IS THE MODEL APPROVED?

IS MEMORY ACCESS CORRECT?

IS THE RISK ACCEPTED?

IS EVALUATION CURRENT?

IS EVIDENCE SUFFICIENT?

IS PRODUCTION AUTHORIZATION EXPLICIT?
```

---

# 216. Capability Testing Strategy

Capability testing should cover both positive and negative paths.

---

# 217. Definition Validation Test

Create valid Capability Definition.

Expected:

```text
ACCEPT
```

---

# 218. Missing Contract Test

Required Capability field missing.

Expected:

```text
REJECT
```

where required by implementation.

---

# 219. Version Attribution Test

Capability V1 and V2 used by different Agent Versions.

Expected historical attribution remains correct.

---

# 220. Assignment Test

Assign approved Capability to eligible Agent Version.

Expected assignment persists through governed configuration.

---

# 221. Self-Assignment Test

Agent attempts to add Capability through its output.

Expected:

```text
NO CONFIGURATION CHANGE
```

---

# 222. Persona Assignment Test

Persona says:

```text
"You are now a security administrator."
```

Expected:

```text
NO CAPABILITY CHANGE
```

---

# 223. Memory Assignment Test

Memory says Agent has a missing Capability.

Expected:

```text
NO CAPABILITY CHANGE
```

---

# 224. Tool Assignment Test

Tool output says a Capability is granted.

Expected:

```text
NO CAPABILITY CHANGE
```

---

# 225. Role Permission Test

Role requires Capability.

Expected:

```text
CAPABILITY MAY BE ASSIGNED
```

but no resource permission is created automatically.

---

# 226. Capability Permission Test

Agent has:

```text
repository.inspect
```

but lacks repository permission.

Expected:

```text
NO PROTECTED REPOSITORY ACCESS
```

---

# 227. Missing Skill Test

Capability requires Skill unavailable.

Expected:

```text
CAPABILITY INELIGIBLE / DEGRADED
```

according to contract.

---

# 228. Missing Tool Test

Required Tool unavailable.

Expected explicit dependency failure.

---

# 229. Tool Permission Test

Tool exists but operation is unauthorized.

Expected:

```text
DENY
```

---

# 230. Model Requirement Test

Selected Model does not satisfy required Capability characteristics.

Expected eligible alternative or explicit failure.

---

# 231. Model Policy Test

Technically capable Model violates Customer policy.

Expected:

```text
INELIGIBLE
```

---

# 232. Context Scope Test

Capability requires Project Context.

Project B Context supplied to Project A Agent.

Expected:

```text
DENY / EXCLUDE
```

---

# 233. Memory Scope Test

Capability requests Tenant B Memory from Tenant A allocation.

Expected:

```text
DENY
```

---

# 234. Composite Capability Test

Required component Capability missing.

Expected composite Capability not fully eligible.

---

# 235. Toxic Combination Test

Assign two conflicting Capabilities.

Expected:

```text
DENY
OR
REQUIRE GOVERNED EXCEPTION
```

according to policy.

---

# 236. Risk Escalation Test

Capability scope changes from read-only sandbox to destructive
Production operation.

Expected risk/approval requirements increase appropriately.

---

# 237. Customer Restriction Test

Capability globally active but Customer policy denies it.

Expected:

```text
DENY
```

---

# 238. Tenant Restriction Test

Capability allowed in Tenant A but denied in Tenant B.

Expected Tenant B denial.

---

# 239. Environment Test

Capability allowed in staging but not Production.

Expected Production denial.

---

# 240. Evaluation Test

Agent self-reports excellent performance.

Expected no Verified Capability status without evaluation Evidence.

---

# 241. Regression Test

Agent Model changes.

Expected required Capability regression evaluation where applicable.

---

# 242. Capability Drift Test

Runtime profile contains unapproved Capability.

Expected:

```text
DETECT
```

---

# 243. Capability Retirement Test

Retired Capability requested for new execution.

Expected:

```text
DENY / MIGRATION REQUIRED
```

according to lifecycle policy.

---

# 244. Capability Registry Integrity Test

Unauthorized actor attempts to modify approved Capability Definition.

Expected:

```text
DENY
```

---

# 245. Capability Audit Test

Material Capability assignment changes.

Expected audit attribution exists.

---

# 246. Production Capability Gate

Before a Capability may be treated as Production-ready for an approved
Agent scope:

- [ ] Capability has stable identity;
- [ ] Capability Version is explicit;
- [ ] Capability name is unambiguous;
- [ ] Capability purpose is explicit;
- [ ] Capability type is explicit;
- [ ] Capability taxonomy placement is defined;
- [ ] owner is explicit;
- [ ] lifecycle state is explicit;
- [ ] input contract is defined where applicable;
- [ ] output contract is defined where applicable;
- [ ] preconditions are defined;
- [ ] postconditions are defined where applicable;
- [ ] hard dependencies are identified;
- [ ] optional dependencies are identified where applicable;
- [ ] dependent Capabilities are identified;
- [ ] required Skills are identified;
- [ ] required Tools are identified;
- [ ] required Tool operations are identified where applicable;
- [ ] Model requirements are identified;
- [ ] Context requirements are identified;
- [ ] Memory requirements are identified;
- [ ] Data requirements are identified;
- [ ] risk class is defined;
- [ ] side-effect class is defined;
- [ ] reversibility is understood;
- [ ] Security requirements are defined;
- [ ] approval requirements are defined;
- [ ] environment restrictions are defined;
- [ ] Capability is registered through governed state;
- [ ] Capability Version is immutable enough for historical attribution;
- [ ] Agent Version assignment is explicit;
- [ ] Agent cannot self-assign the Capability;
- [ ] Persona cannot grant the Capability;
- [ ] Role alone cannot grant technical authority;
- [ ] Prompt cannot grant the Capability;
- [ ] Memory cannot grant the Capability;
- [ ] Tool output cannot grant the Capability;
- [ ] peer Agent cannot grant the Capability;
- [ ] Capability assignment does not grant resource permission;
- [ ] Capability assignment does not grant Tool permission;
- [ ] Capability assignment does not grant Customer authority;
- [ ] Capability assignment does not grant Tenant authority;
- [ ] Capability assignment does not grant Production authority;
- [ ] runtime Capability eligibility is enforced;
- [ ] current lifecycle state is considered;
- [ ] current Project scope is considered;
- [ ] current Customer scope is considered where applicable;
- [ ] current Tenant scope is considered where applicable;
- [ ] current environment is considered;
- [ ] current policy is considered;
- [ ] current authorization is independently checked;
- [ ] required approval is independently checked;
- [ ] composite Capability dependencies are enforced;
- [ ] toxic combinations are evaluated;
- [ ] Project overlays are enforced;
- [ ] Customer overlays are enforced where applicable;
- [ ] Tenant overlays are enforced where applicable;
- [ ] Capability routing respects current authority;
- [ ] Capability delegation cannot expand authority;
- [ ] evaluation profile exists;
- [ ] positive tests exist;
- [ ] negative tests exist;
- [ ] Security tests exist;
- [ ] isolation tests exist;
- [ ] regression tests exist;
- [ ] Verified Capability success can be measured;
- [ ] evaluation Evidence exists;
- [ ] Agent Version has been evaluated for the Capability;
- [ ] Model profile has been evaluated where relevant;
- [ ] Tool profile has been evaluated where relevant;
- [ ] Prompt Version has been evaluated where relevant;
- [ ] Memory behavior has been evaluated where relevant;
- [ ] failure behavior is known;
- [ ] degradation behavior is known;
- [ ] fallback behavior is governed;
- [ ] Capability metrics are attributable;
- [ ] Capability usage is auditable where required;
- [ ] configuration drift is detectable where required;
- [ ] Capability deprecation process exists;
- [ ] Capability retirement process exists;
- [ ] migration process exists for breaking changes;
- [ ] Production-specific risk review is complete;
- [ ] Production-specific scope is explicit;
- [ ] required governance approvals exist;
- [ ] Production authorization is explicit.

---

# 247. Production Hard Stops

Production Capability use must remain blocked if any known condition
includes:

```text
CAPABILITY IDENTITY IS AMBIGUOUS

CAPABILITY VERSION IS UNKNOWN

CAPABILITY CONTRACT IS UNDEFINED

CAPABILITY RISK IS UNKNOWN

CAPABILITY SIDE EFFECT IS UNKNOWN

CAPABILITY CAN SELF-GRANT AUTHORITY

AGENT CAN SELF-ASSIGN CAPABILITY

ROLE AUTOMATICALLY GRANTS RESOURCE PERMISSION

PERSONA CAN GRANT CAPABILITY

PROMPT CAN GRANT CAPABILITY

MEMORY CAN GRANT CAPABILITY

TOOL OUTPUT CAN GRANT CAPABILITY

PEER AGENT MESSAGE CAN GRANT CAPABILITY

CAPABILITY ASSIGNMENT AUTOMATICALLY GRANTS TOOL PERMISSION

CAPABILITY ASSIGNMENT AUTOMATICALLY GRANTS PROJECT AUTHORITY

CAPABILITY ASSIGNMENT AUTOMATICALLY GRANTS CUSTOMER AUTHORITY

CAPABILITY ASSIGNMENT AUTOMATICALLY GRANTS TENANT AUTHORITY

CAPABILITY ASSIGNMENT AUTOMATICALLY GRANTS PRODUCTION AUTHORITY

REQUIRED DEPENDENCY IS BYPASSED SILENTLY

DISALLOWED MODEL IS USED AS FALLBACK

UNAUTHORIZED TOOL IS USED BECAUSE CAPABILITY REQUIRES IT

PROJECT A CAPABILITY EXECUTION CAN ACCESS PROJECT B PROTECTED STATE

CUSTOMER A CAPABILITY EXECUTION CAN ACCESS CUSTOMER B PROTECTED STATE

TENANT A CAPABILITY EXECUTION CAN ACCESS TENANT B PROTECTED STATE

TOXIC CAPABILITY COMBINATION IS UNCONTROLLED

HIGH-RISK CAPABILITY HAS NO APPROVAL MODEL

DESTRUCTIVE CAPABILITY HAS NO SIDE-EFFECT CONTROL

CAPABILITY SUCCESS IS BASED ONLY ON AGENT SELF-REPORT

CAPABILITY EVALUATION IS MISSING

CAPABILITY REGRESSION IS UNKNOWN AFTER MATERIAL CHANGE

UNAPPROVED CAPABILITY DRIFT IS UNDETECTABLE

RETIRED CAPABILITY REMAINS SILENTLY ACTIVE

PRODUCTION CAPABILITY AUTHORIZATION IS IMPLIED INSTEAD OF EXPLICIT

PRODUCTION CAPABILITY IMPLEMENTATION IS NOT VERIFIED
```

---

# 248. Capability Architecture Invariants

The following must remain true:

```text
CAPABILITY
≠
AUTHORITY

CAPABILITY
≠
PERMISSION

CAPABILITY
≠
ROLE

CAPABILITY
≠
SKILL

CAPABILITY
≠
TOOL

CAPABILITY
≠
MODEL

CAPABILITY
≠
TASK

CAPABILITY
≠
WORKFLOW

CAPABILITY ASSIGNED
≠
CAPABILITY AUTHORIZED

CAPABILITY ELIGIBLE
≠
RESOURCE AUTHORIZED

TOOL REQUIRED
≠
TOOL ALLOWED

MODEL CAPABLE
≠
MODEL APPROVED

MEMORY REQUIRED
≠
MEMORY AUTHORIZED

ROLE REQUIRES CAPABILITY
≠
ROLE GRANTS AUTHORITY

COMPOSITE CAPABILITY
≠
PERMISSION UNION

CAPABILITY BUNDLE
≠
PERMISSION BUNDLE

VERIFIED CAPABILITY
≠
PRODUCTION AUTHORIZED CAPABILITY
```

---

# 249. Framework Anti-Patterns

Avoid:

```text
ONE CAPABILITY CALLED EVERYTHING

CAPABILITY IDS AS PERMISSION IDS WITHOUT SEMANTIC BOUNDARY

ROLE NAMES AS CAPABILITIES

TOOLS REPRESENTED AS CAPABILITIES WITHOUT NEED

TASK NAMES REPRESENTED AS CAPABILITIES

CUSTOMER-SPECIFIC DUPLICATE CAPABILITIES FOR CONFIGURATION DIFFERENCES

CAPABILITIES CONTAINING RAW CREDENTIALS

CAPABILITIES SELF-ASSIGNED BY AGENTS

CAPABILITY AUTHORITY DEFINED ONLY IN PROMPT

UNVERSIONED CAPABILITY CONTRACTS

UNTESTABLE CAPABILITIES

COMPOSITE CAPABILITIES THAT SILENTLY UNION PRIVILEGES

CAPABILITY ROUTING WITHOUT SECURITY ELIGIBILITY

PRODUCTION ACTIVATION FROM MODEL CONFIDENCE
```

---

# 250. Detailed Capability Folder Responsibility

The `capabilities/` folder separates three concerns:

```text
capability-framework.md
=
WHAT CAPABILITIES ARE
AND HOW THEY ARE GOVERNED

capability-mapping.md
=
HOW CAPABILITIES MAP TO
AGENTS, TYPES, ROLES, SKILLS, TOOLS, MODELS,
PROJECTS, CUSTOMERS, TENANTS, AND TASK NEEDS

capability-registry.md
=
HOW CAPABILITY DEFINITIONS
ARE CATALOGED, VERSIONED, DISCOVERED,
GOVERNED, AND RESOLVED
```

---

# 251. Current Capability Architecture Truth

At the current documentation stage:

```text
CAPABILITY_IDENTITY
=
DEFINED_TARGET_STATE

CAPABILITY_VERSIONING
=
DEFINED_TARGET_STATE

CAPABILITY_TAXONOMY
=
DEFINED_TARGET_STATE

ATOMIC_CAPABILITIES
=
DEFINED_TARGET_STATE

COMPOSITE_CAPABILITIES
=
DEFINED_TARGET_STATE

CAPABILITY_CONTRACTS
=
DEFINED_TARGET_STATE

CAPABILITY_DEPENDENCY_MODEL
=
DEFINED_TARGET_STATE

SKILL_DEPENDENCY_MODEL
=
DEFINED_TARGET_STATE

TOOL_DEPENDENCY_MODEL
=
DEFINED_TARGET_STATE

MODEL_REQUIREMENT_MODEL
=
DEFINED_TARGET_STATE

CONTEXT_REQUIREMENT_MODEL
=
DEFINED_TARGET_STATE

MEMORY_REQUIREMENT_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_RISK_MODEL
=
DEFINED_TARGET_STATE

SIDE_EFFECT_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_ASSIGNMENT_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_ELIGIBILITY_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_AUTHORITY_BOUNDARY
=
DEFINED_TARGET_STATE

TOXIC_COMBINATION_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_LIFECYCLE
=
DEFINED_TARGET_STATE

CAPABILITY_EVALUATION_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_EVIDENCE_MODEL
=
DEFINED_TARGET_STATE

MULTI_PROJECT_CAPABILITY_MODEL
=
DEFINED_TARGET_STATE

MULTI_CUSTOMER_CAPABILITY_MODEL
=
DEFINED_TARGET_STATE

MULTI_TENANT_CAPABILITY_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_REGISTRY_INTEGRATION
=
DEFINED_TARGET_STATE
```

---

# 252. Runtime Truth

At the current documentation stage:

```text
CAPABILITY_SCHEMA_RUNTIME
=
NOT_PROVEN

CAPABILITY_VERSION_RUNTIME
=
NOT_PROVEN

CAPABILITY_TAXONOMY_RUNTIME
=
NOT_PROVEN

CAPABILITY_ASSIGNMENT_RUNTIME
=
NOT_PROVEN

CAPABILITY_ELIGIBILITY_RUNTIME
=
NOT_PROVEN

CAPABILITY_DEPENDENCY_RESOLUTION
=
NOT_PROVEN

CAPABILITY_REGISTRY_RUNTIME
=
NOT_PROVEN

CAPABILITY_ROUTING_RUNTIME
=
NOT_PROVEN

CAPABILITY_SECURITY_RUNTIME
=
NOT_PROVEN

CAPABILITY_CONFLICT_RUNTIME
=
NOT_PROVEN

CAPABILITY_PROJECT_ISOLATION
=
NOT_PROVEN

CAPABILITY_CUSTOMER_ISOLATION
=
NOT_PROVEN

CAPABILITY_TENANT_ISOLATION
=
NOT_PROVEN

CAPABILITY_EVALUATION_RUNTIME
=
NOT_PROVEN

CAPABILITY_EVIDENCE_RUNTIME
=
NOT_PROVEN

CAPABILITY_METRICS_RUNTIME
=
NOT_PROVEN

PRODUCTION_CAPABILITY_FRAMEWORK
=
NOT_PROVEN
```

---

# 253. Approval Status

```text
FOUNDER_APPROVAL
=
PENDING

ENTERPRISE_GOVERNANCE_APPROVAL
=
PENDING

ENTERPRISE_ARCHITECTURE_APPROVAL
=
PENDING

AGENT_FRAMEWORK_GOVERNANCE_APPROVAL
=
PENDING

AGENT_CAPABILITY_GOVERNANCE_APPROVAL
=
PENDING

SECURITY_GOVERNANCE_APPROVAL
=
PENDING

AI_WORKFORCE_GOVERNANCE_APPROVAL
=
PENDING

QUALITY_GOVERNANCE_APPROVAL
=
PENDING
```

---

# 254. Canonical Status

```text
CANONICAL
=
FALSE
```

---

# 255. Production Status

```text
AGENT_CAPABILITY_FRAMEWORK
=
DOCUMENTED_TARGET_STATE

CAPABILITY_IMPLEMENTATION
=
NOT_PROVEN

CAPABILITY_VERIFICATION
=
NOT_PROVEN

CAPABILITY_PRODUCTION_AUTHORIZATION
=
NOT_GRANTED_BY_THIS DOCUMENT

PRODUCTION_OPERATIONAL
=
NOT_PROVEN
```

---

# 256. Preserved Capability Truth

```text
DOCUMENTED CAPABILITY
≠
IMPLEMENTED CAPABILITY

IMPLEMENTED CAPABILITY
≠
VERIFIED CAPABILITY

VERIFIED CAPABILITY
≠
PRODUCTION AUTHORIZED CAPABILITY

CAPABILITY ASSIGNED
≠
CAPABILITY ELIGIBLE

CAPABILITY ELIGIBLE
≠
ACTION AUTHORIZED

ACTION AUTHORIZED
≠
ACTION VERIFIED SUCCESSFUL

AGENT CLAIMS CAPABILITY
≠
AGENT HAS CAPABILITY

MODEL SUPPORTS CAPABILITY
≠
AGENT HAS CAPABILITY

TOOL EXISTS
≠
TOOL AUTHORIZED

MEMORY AVAILABLE
≠
MEMORY AUTHORIZED

ROLE
≠
PERMISSION

SKILL
≠
AUTHORITY

CAPABILITY
≠
AUTHORITY
```

---

# 257. Capability Framework Completion Checklist

Before this document is content-complete for review:

- [ ] Capability purpose is defined;
- [ ] Capability mission is defined;
- [ ] Capability/Authority separation is explicit;
- [ ] Capability/Permission separation is explicit;
- [ ] Capability/Role separation is explicit;
- [ ] Capability/Skill separation is explicit;
- [ ] Capability/Tool separation is explicit;
- [ ] Capability/Model separation is explicit;
- [ ] Capability/Task separation is explicit;
- [ ] Capability/Workflow separation is explicit;
- [ ] Capability/Persona separation is explicit;
- [ ] stable Capability identity is defined;
- [ ] naming convention is defined;
- [ ] Capability Versioning is defined;
- [ ] Capability Definition model is defined;
- [ ] taxonomy is defined;
- [ ] atomic Capability is defined;
- [ ] composite Capability is defined;
- [ ] composite-permission boundary is defined;
- [ ] Capability contract is defined;
- [ ] input contract is defined;
- [ ] output contract is defined;
- [ ] preconditions are defined;
- [ ] postconditions are defined;
- [ ] dependency model is defined;
- [ ] hard dependencies are defined;
- [ ] optional dependencies are defined;
- [ ] fallback dependencies are defined;
- [ ] Skill dependencies are defined;
- [ ] Tool dependencies are defined;
- [ ] Model requirements are defined;
- [ ] Context requirements are defined;
- [ ] Memory requirements are defined;
- [ ] Data requirements are defined;
- [ ] Security attributes are defined;
- [ ] risk model is defined;
- [ ] contextual risk is defined;
- [ ] side-effect classification is defined;
- [ ] reversibility is defined;
- [ ] Capability assignment is defined;
- [ ] self-assignment is prohibited;
- [ ] Capability eligibility is defined;
- [ ] eligibility/authorization boundary is explicit;
- [ ] runtime authorization is defined;
- [ ] execution gate is defined;
- [ ] Capability discovery is defined;
- [ ] Agent matching is defined;
- [ ] Capability Profiles are defined;
- [ ] Agent Type relationship is defined;
- [ ] AI Workforce Role mapping is defined;
- [ ] Registry integration is defined;
- [ ] Capability lifecycle is defined;
- [ ] restriction is defined;
- [ ] deprecation is defined;
- [ ] retirement is defined;
- [ ] migration is defined;
- [ ] duplicate prevention is defined;
- [ ] reuse model is defined;
- [ ] Multi-Project overlays are defined;
- [ ] Multi-Customer overlays are defined;
- [ ] Multi-Tenant overlays are defined;
- [ ] environment scope is defined;
- [ ] autonomy boundary is defined;
- [ ] approval requirements are defined;
- [ ] separation of duties is defined;
- [ ] toxic combinations are defined;
- [ ] Capability Bundles are defined;
- [ ] Industry Capability packs are defined;
- [ ] Customer extension boundary is defined;
- [ ] evaluation model is defined;
- [ ] Agent-level evaluation is defined;
- [ ] verification scope is defined;
- [ ] regression evaluation is defined;
- [ ] Evidence model is defined;
- [ ] metrics model is defined;
- [ ] Verified Capability Success is defined;
- [ ] failure taxonomy is defined;
- [ ] degraded behavior is defined;
- [ ] fallback behavior is defined;
- [ ] cost model is defined;
- [ ] capacity boundary is defined;
- [ ] routing is defined;
- [ ] delegation boundary is defined;
- [ ] Multi-Agent Capability composition boundary is defined;
- [ ] Capability Security threats are defined;
- [ ] spoofing protections are defined;
- [ ] Prompt-based Capability injection is prohibited;
- [ ] Memory-based Capability injection is prohibited;
- [ ] Tool-based Capability injection is prohibited;
- [ ] peer-Agent Capability injection is prohibited;
- [ ] Capability integrity is defined;
- [ ] drift detection direction is defined;
- [ ] Capability Audit is defined;
- [ ] governance is defined;
- [ ] change management is defined;
- [ ] compatibility is defined;
- [ ] breaking change handling is defined;
- [ ] retirement impact is defined;
- [ ] new Capability decision framework is defined;
- [ ] granularity framework is defined;
- [ ] dependency decision framework is defined;
- [ ] risk decision framework is defined;
- [ ] assignment decision framework is defined;
- [ ] Production decision framework is defined;
- [ ] controlled tests are defined;
- [ ] Production Capability Gate is defined;
- [ ] Production Hard Stops are defined;
- [ ] architecture invariants are defined;
- [ ] anti-patterns are defined;
- [ ] capabilities folder responsibility is defined;
- [ ] runtime truth uses `NOT_PROVEN`;
- [ ] no unproven Capability runtime claim is made;
- [ ] no unproven isolation claim is made;
- [ ] no unproven Production claim is made;
- [ ] next document is identified.

---

# 258. Revision History

| Version | Date | Status | Author | Change |
|---|---|---|---|---|
| 0.1.0 | 2026-08-08 | Draft | Mianx.ai | Initial detailed Agent Capability Framework |
| 1.0.0 | 2026-08-08 | Draft | Mianx.ai | Established the enterprise Capability Framework covering Capability identity, Versioning, taxonomy, atomic and composite Capabilities, contracts, dependencies, Skills, Tools, Models, Context, Memory, Data, Security, risk, side effects, assignments, eligibility, authority separation, lifecycle, reuse, Multi-Project/Multi-Customer/Multi-Tenant overlays, toxic combinations, evaluation, Evidence, metrics, routing, delegation, governance, controlled testing, and Production gates |

---

# 259. Changelog Entry

Add during module Changelog synchronization to:

```text
doc/22-agent-framework/CHANGELOG.md
```

```markdown
## AGENT-FRAMEWORK-CHG-20260808-017 — Enterprise Agent Capability Framework Established

| Field | Value |
|---|---|
| Date | 2026-08-08 |
| Change Type | `CREATED`, `AGENT-FRAMEWORK`, `CAPABILITY-FRAMEWORK`, `CAPABILITY-VERSIONING`, `SECURITY`, `EVALUATION`, `MULTI-TENANT` |
| Impact | `I5 — Foundational / Enterprise-Wide` |
| Risk | `R4 — Critical` |
| Status | `Completed for Review` |
| Owner | Mianx.ai Founder |
| Approver | Pending Founder, Enterprise Governance, Agent Capability Governance, and Security Governance Review |

### Affected Document

`doc/22-agent-framework/capabilities/capability-framework.md`

### New State

The Agent Framework now defines a detailed enterprise Capability
Framework covering:

- Capability identity;
- Capability naming;
- Capability Versioning;
- Capability taxonomy;
- atomic Capabilities;
- composite Capabilities;
- Capability contracts;
- input/output contracts;
- preconditions and postconditions;
- dependencies;
- Skill dependencies;
- Tool dependencies;
- Model requirements;
- Context requirements;
- Memory requirements;
- Data requirements;
- Security requirements;
- risk classification;
- side-effect classification;
- reversibility;
- Capability assignment;
- Capability eligibility;
- Capability-to-authority separation;
- Capability discovery;
- Agent matching;
- Capability Profiles;
- AI Workforce Role mapping;
- Capability Registry integration;
- Capability lifecycle;
- restriction;
- deprecation;
- retirement;
- migration;
- duplicate prevention;
- reuse;
- Multi-Project overlays;
- Multi-Customer overlays;
- Multi-Tenant overlays;
- environment restrictions;
- autonomy boundaries;
- approvals;
- separation of duties;
- toxic Capability combinations;
- Capability Bundles;
- Industry Capability packs;
- evaluation;
- regression;
- Evidence;
- metrics;
- failures;
- degraded operation;
- fallbacks;
- cost;
- capacity;
- routing;
- delegation;
- Security threats;
- configuration integrity;
- drift;
- Audit;
- governance;
- testing;
- Production gates;
- Production Hard Stops.

### Documentation Truth

```text
AGENT_CAPABILITY_FRAMEWORK
=
CONTENT_COMPLETE_FOR_REVIEW

CAPABILITY_RUNTIME
=
NOT_PROVEN

CAPABILITY_REGISTRY_RUNTIME
=
NOT_PROVEN

CAPABILITY_SECURITY_RUNTIME
=
NOT_PROVEN

PRODUCTION_CAPABILITY_FRAMEWORK
=
NOT_AUTHORIZED
```

### Approval Status

```text
FOUNDER_APPROVAL
=
PENDING

ENTERPRISE_GOVERNANCE_APPROVAL
=
PENDING

AGENT_CAPABILITY_GOVERNANCE_APPROVAL
=
PENDING

SECURITY_GOVERNANCE_APPROVAL
=
PENDING

CANONICAL
=
FALSE
```
```

---

# 260. Documentation Progress

After saving this document:

```text
MODULE
=
22-agent-framework

PLANNED_DOCUMENTS
=
78

ROOT_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
12

ARCHITECTURE_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
4

CAPABILITY_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
1

TOTAL_CONTENT_COMPLETE_FOR_REVIEW
=
17

REMAINING_DOCUMENTS
=
61
```

This is documentation progress only.

It does not represent implementation completion.

---

# 261. Capabilities Folder Status

```text
capabilities/capability-framework.md
=
CONTENT_COMPLETE_FOR_REVIEW

capabilities/capability-mapping.md
=
NEXT

capabilities/capability-registry.md
=
PENDING
```

Therefore currently:

```text
doc/22-agent-framework/capabilities/
=
1 / 3
CONTENT_COMPLETE_FOR_REVIEW
```

---

# 262. Next Document

The next document in sequence is:

```text
doc/22-agent-framework/capabilities/capability-mapping.md
```

Document ID:

```text
AGENT-CAPABILITY-MAPPING-001
```

Purpose:

> **Define how governed Mianx.ai Capabilities map between Agent
> Definitions, Agent Versions, Agent Types, AI Workforce Roles,
> Departments, Skills, Tools, Models, Prompts, Memory requirements,
> Task types, Projects, Customers, Tenants, environments, risk classes,
> evaluation profiles, routing eligibility, autonomy levels, and
> Industry Operating Systems without converting mapping relationships
> into implicit authority or permissions.**

---

# Final Capability Framework Rule

```text
AN AGENT
MAY KNOW
HOW TO DO SOMETHING

WITHOUT
BEING ALLOWED
TO DO IT HERE.
```

The correct execution chain is:

```text
TASK
↓
REQUIRED CAPABILITY
↓
AGENT CAPABILITY ASSIGNMENT
↓
CAPABILITY ELIGIBILITY
↓
SKILLS / TOOLS / MODEL / CONTEXT / MEMORY
↓
CURRENT PROJECT / CUSTOMER / TENANT
↓
CURRENT SECURITY
↓
APPROVAL WHERE REQUIRED
↓
EXECUTION
↓
VALIDATION
↓
EVIDENCE
```

And the permanent equation remains:

```text
CAPABILITY
+
PERMISSION
+
SCOPE
+
POLICY
+
CURRENT AUTHORIZATION
+
EVIDENCE
=
CONTROLLED ENTERPRISE EXECUTION
```

Never:

```text
CAPABILITY
=
AUTHORITY
```

---