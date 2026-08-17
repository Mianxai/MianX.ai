---
id: AGENT-FRAMEWORK-CAPABILITIES-001
title: Mianx.ai Agent Framework Capabilities
version: 1.0.0
status: Draft

description: Framework-wide enterprise standard for defining, identifying, classifying, composing, registering, assigning, governing, evaluating, monitoring, versioning, discovering, constraining, and retiring capabilities used by individual Mianx.ai AI Agents.

type: Enterprise Agent Capability Framework, Capability Taxonomy, Capability Identity, Capability Registry, Capability Composition, Capability Assignment, Capability Mapping, Capability Discovery, Capability Dependency, Capability Risk Classification, Capability Permission Separation, Capability Evaluation, Capability Versioning, Capability Lifecycle, Capability Evidence, Capability Monitoring, Capability Security, Multi-Project Capability Governance, Multi-Customer Capability Governance, Multi-Tenant Capability Governance, and Production Readiness Standard

class: Governed Enterprise Agent Capability Standard for MianX Core Platform, Mianx.ai AI Operating System, AI Workforce, Agent Framework, Multi-Agent System, Project Factory, Industry Operating Systems, Customer Editions, Multi-Project Operations, Multi-Customer Operations, Multi-Tenant Operations, Human-AI Collaboration, and Autonomous Enterprise Creation at Scale

category: Agent Framework
parent: doc/22-agent-framework

owner: Mianx.ai Founder

authority: Founder and Enterprise Governance

stewards:
  - Founder Office
  - Enterprise Governance
  - Enterprise Architecture
  - Agent Framework Governance
  - Agent Capability Governance
  - AI Operating System Governance
  - AI Workforce Governance
  - Tool Governance
  - Skills Governance
  - Model Governance
  - Memory Platform Governance
  - Security Governance
  - Privacy Governance
  - Quality Governance
  - Reliability Governance
  - Risk Governance
  - Evidence Governance
  - Audit Governance
  - Enterprise Operations
  - Documentation Governance

maintainers:
  - Agent Framework Engineering
  - Agent Runtime Engineering
  - Agent Capability Engineering
  - AI Operating System Engineering
  - AI Workforce Engineering
  - Tool Platform Engineering
  - Skills Platform Engineering
  - Model Platform Engineering
  - Memory Platform Engineering
  - Evaluation Engineering
  - Security Engineering
  - Reliability Engineering
  - Monitoring Engineering
  - Quality Engineering
  - Enterprise Operations
  - Documentation Governance

reviewers:
  - Founder
  - Founder Office
  - Human Executive Leadership
  - Enterprise Governance
  - Enterprise Architecture
  - Agent Framework Governance
  - Agent Capability Governance
  - AI Operating System Governance
  - AI Workforce Governance
  - Tool Governance
  - Skills Governance
  - Model Governance
  - Memory Platform Governance
  - Security Governance
  - Privacy Governance
  - Quality Governance
  - Reliability Engineering
  - Risk Governance
  - Evidence Governance
  - Audit Governance
  - Enterprise Operations
  - Documentation Governance

created: 2026-08-08
updated: 2026-08-08

classification: Internal

audience:
  - Founder
  - Founder Office
  - Human Executive Leadership
  - Enterprise Governance
  - Enterprise Architects
  - AI Architects
  - Agent Architects
  - Agent Framework Engineers
  - Agent Runtime Engineers
  - Agent Capability Engineers
  - AI Workforce Engineers
  - AI Operating System Engineers
  - Tool Engineers
  - Skill Engineers
  - Model Engineers
  - Memory Engineers
  - Security Engineers
  - Evaluation Engineers
  - Reliability Engineers
  - Quality Engineers
  - Enterprise Operators
  - Auditors
  - Documentation Maintainers
  - Authorized AI Agents

depends_on:
  - ./README.md
  - ./INDEX.md
  - ./agent-framework-vision.md
  - ./agent-framework-strategy.md
  - ./agent-framework-architecture.md
  - ../01-governance/AI-CONSTITUTION.md
  - ../19-ai-workforce/README.md
  - ../19-ai-workforce/VERIFIABLE-WORK-ENVELOPE.md
  - ../20-ai-operating-system/README.md
  - ../20-ai-operating-system/MASTER-BLUEPRINT.md
  - ../20-ai-operating-system/MULTI-PROJECT-OPERATING-MODEL.md
  - ../21-memory-engine/README.md

related_documents:
  - ./agent-framework-lifecycle.md
  - ./agent-framework-governance.md
  - ./agent-framework-security.md
  - ./agent-framework-metrics.md
  - ./agent-framework-checklists.md
  - ./capabilities/capability-framework.md
  - ./capabilities/capability-mapping.md
  - ./capabilities/capability-registry.md
  - ./skills/skill-framework.md
  - ./skills/skill-catalog.md
  - ./tools/tool-registry.md
  - ./tools/tool-permissions.md
  - ./evaluation/benchmarking.md
  - ./evaluation/performance-evaluation.md
  - ./evaluation/quality-scoring.md
  - ./ROADMAP.md

related_modules:
  - ../19-ai-workforce/
  - ../20-ai-operating-system/
  - ../21-memory-engine/
  - ../23-multi-agent-system/
  - ../24-automation-engine/
  - ../25-intelligence-engine/
  - ../27-model-management/
  - ../30-enterprise-governance/
  - ../41-security-platform/
  - ../44-enterprise-ai/

review_cycle:
  - At Every Material Capability Model Change
  - At Every Capability Taxonomy Change
  - At Every Capability Registry Change
  - At Every Capability Assignment Model Change
  - At Every Capability Risk Model Change
  - At Every Tool-Capability Relationship Change
  - At Every Skill-Capability Relationship Change
  - At Every Model-Capability Relationship Change
  - At Every Capability Evaluation Change
  - At Every Capability Permission Model Change
  - At Every Multi-Project Capability Change
  - At Every Multi-Customer Capability Change
  - At Every Multi-Tenant Capability Change
  - Before Controlled Capability Activation
  - Before Production Capability Authorization
  - Before Canonical Promotion
  - Quarterly During Active Build
  - Annually During Stable Operation

canonical: false

tags:
  - agent-framework
  - capabilities
  - capability-framework
  - capability-registry
  - capability-mapping
  - ai-agents
  - ai-workforce
  - permissions
  - security
  - evaluation
  - evidence
  - multi-project
  - multi-customer
  - multi-tenant
  - enterprise-ai
---

# Mianx.ai Agent Framework Capabilities

> **This document defines the framework-wide capability model for
> individual Mianx.ai Agents.**
>
> **A Capability describes what an Agent is technically or logically able
> to perform.**
>
> **A Capability does not grant permission.**
>
> **A Capability does not define Project scope.**
>
> **A Capability does not define Customer scope.**
>
> **A Capability does not define Tenant scope.**
>
> **A Capability does not grant Tool credentials.**
>
> **A Capability does not create approval.**
>
> **A Capability does not prove competence.**
>
> **A Capability does not prove safe Production operation.**
>
> **The architecture must permanently separate:**
>
> ```text
> WHAT THE AGENT CAN DO
> ```
>
> from:
>
> ```text
> WHAT THE AGENT MAY DO NOW
> ```
>
> **Capabilities must be identifiable, Versioned where material,
> discoverable, composable, testable, attributable, risk-classified,
> evidence-backed, permission-aware, lifecycle-managed, and safe for
> reuse across Projects, Customers, Tenants, and industries.**

---

# 1. Purpose

This document defines:

```text
WHAT AN AGENT CAPABILITY IS

WHAT AN AGENT CAPABILITY IS NOT

HOW CAPABILITIES ARE IDENTIFIED

HOW CAPABILITIES ARE CLASSIFIED

HOW CAPABILITIES ARE VERSIONED

HOW CAPABILITIES ARE COMPOSED

HOW CAPABILITIES ARE REGISTERED

HOW CAPABILITIES ARE ASSIGNED

HOW CAPABILITIES MAP TO AGENT TYPES

HOW CAPABILITIES MAP TO ROLES

HOW CAPABILITIES MAP TO SKILLS

HOW CAPABILITIES MAP TO TOOLS

HOW CAPABILITIES MAP TO MODELS

HOW CAPABILITIES MAP TO TASKS

HOW CAPABILITIES MAP TO PROJECTS

HOW CAPABILITY DEPENDENCIES WORK

HOW CAPABILITY CONFLICTS WORK

HOW CAPABILITY RISK IS CLASSIFIED

HOW CAPABILITIES ARE EVALUATED

HOW CAPABILITIES ARE MONITORED

HOW CAPABILITIES ARE SUSPENDED

HOW CAPABILITIES ARE DEPRECATED

HOW CAPABILITIES ARE RETIRED

WHAT EVIDENCE PROVES A CAPABILITY

HOW CAPABILITY AUTHORIZATION IS SEPARATED FROM CAPABILITY POSSESSION

WHAT MUST BE PROVEN BEFORE PRODUCTION
```

---

# 2. Capability Mission

The mission is:

> **Provide one reusable enterprise capability system through which
> Mianx.ai can describe Agent abilities independently from Agent identity,
> organizational Role, Persona, Tool credentials, Model provider,
> Project allocation, and execution authority.**

---

# 3. Capability Definition

A Capability is:

> **A governed functional ability that describes a class of work an Agent
> can potentially perform when required dependencies, Skills, Models,
> Tools, Context, permissions, scope, and runtime conditions are
> satisfied.**

---

# 4. Core Capability Equation

Conceptually:

```text
CAPABILITY
+
REQUIRED SKILLS
+
REQUIRED TOOLS
+
REQUIRED MODEL ABILITY
+
REQUIRED CONTEXT
+
REQUIRED MEMORY
=
TECHNICAL ABILITY
```

But execution additionally requires:

```text
TECHNICAL ABILITY
+
CURRENT IDENTITY
+
CURRENT SCOPE
+
CURRENT PERMISSION
+
CURRENT POLICY
+
CURRENT BUDGET
+
CURRENT APPROVAL WHERE REQUIRED
=
ELIGIBLE ACTION
```

---

# 5. Permanent Capability Rule

```text
CAPABILITY
≠
AUTHORITY
```

This rule is non-negotiable.

---

# 6. Capability Non-Goals

Capabilities do not independently define:

```text
ORGANIZATIONAL ROLE

PERSONA

SECURITY PERMISSION

PROJECT MEMBERSHIP

CUSTOMER MEMBERSHIP

TENANT MEMBERSHIP

TOOL CREDENTIAL

MODEL CREDENTIAL

AUTONOMY LEVEL

PRODUCTION ACCESS

APPROVAL

BUSINESS OWNERSHIP
```

---

# 7. Capability vs Role

```text
ROLE
=
ORGANIZATIONAL RESPONSIBILITY

CAPABILITY
=
FUNCTIONAL ABILITY
```

Example:

```text
ROLE
=
BACKEND ENGINEER

CAPABILITIES
=
API DESIGN
DATABASE DESIGN
CODE GENERATION
TESTING
DEBUGGING
```

---

# 8. Capability vs Skill

```text
CAPABILITY
=
WHAT CAN BE DONE

SKILL
=
REUSABLE COMPETENCE SUPPORTING HOW WELL IT CAN BE DONE
```

---

# 9. Capability vs Tool

```text
CAPABILITY
=
ABILITY

TOOL
=
EXECUTION INTERFACE OR RESOURCE
```

Example:

```text
CAPABILITY
=
CODE REPOSITORY REVIEW

TOOL
=
GITHUB CONNECTOR
```

---

# 10. Capability vs Model

```text
CAPABILITY
=
AGENT-LEVEL ABILITY

MODEL
=
COMPUTATIONAL INTELLIGENCE RESOURCE
```

A Model may support a capability without owning the Agent capability
definition.

---

# 11. Capability vs Permission

```text
CAPABILITY
=
CAN

PERMISSION
=
MAY
```

---

# 12. Capability vs Autonomy

An Agent may possess a capability while only being authorized to:

```text
RECOMMEND
```

rather than:

```text
EXECUTE
```

---

# 13. Capability Identity

Every material reusable Capability should have stable identity.

Potential:

```text
capability_id
```

---

# 14. Capability Naming

Capability names should describe functionality rather than authority.

Preferred examples:

```text
API_DESIGN

CODE_REVIEW

SECURITY_ANALYSIS

DOCUMENT_GENERATION

DATABASE_SCHEMA_DESIGN

SEO_ANALYSIS

TEST_GENERATION

INCIDENT_TRIAGE
```

Avoid authority-shaped names such as:

```text
SUPER_ADMIN

UNLIMITED_ACCESS

GLOBAL_CONTROL
```

---

# 15. Capability Record

Conceptually:

```yaml
capability:
  capability_id: required

  name: required
  version: required

  description: required
  category: required

  lifecycle_status: required

  input_contract: conditional
  output_contract: conditional

  required_skills: conditional
  required_tools: conditional
  required_model_capabilities: conditional
  required_memory_access: conditional
  required_context: conditional

  risk_class: required

  evaluation_profile: required

  owner: required

  created_at: required
  updated_at: required
```

This is a conceptual target-state model.

---

# 16. Capability Versioning

Material Capability changes should be Versioned.

---

# 17. Versioned Capability Changes

Potential Version-changing modifications include:

```text
BEHAVIOR

INPUT CONTRACT

OUTPUT CONTRACT

REQUIRED TOOL

REQUIRED SKILL

RISK CLASS

SECURITY REQUIREMENT

EVALUATION REQUIREMENT

DEPENDENCY

FAILURE SEMANTICS
```

---

# 18. Capability Version Boundary

```text
CAPABILITY V1 APPROVED
≠
CAPABILITY V2 APPROVED
```

---

# 19. Capability Lifecycle

Target lifecycle:

```text
PROPOSED
↓
DEFINED
↓
REVIEWED
↓
APPROVED
↓
REGISTERED
↓
AVAILABLE
↓
MONITORED
↓
DEPRECATED
↓
RETIRED
```

---

# 20. Proposed Capability

A proposed Capability exists as a candidate only.

---

# 21. Defined Capability

Definition and contracts exist.

---

# 22. Reviewed Capability

Architecture, Security, Quality, and governance reviews occur as
appropriate.

---

# 23. Approved Capability

The Capability definition is approved for defined uses.

---

# 24. Registered Capability

It is discoverable through the governed Capability Registry.

---

# 25. Available Capability

It may be assigned to eligible Agent definitions or allocations.

---

# 26. Deprecated Capability

New usage should be discouraged or blocked according to migration policy.

---

# 27. Retired Capability

New Agent configurations should not use it.

---

# 28. Lifecycle Boundary

```text
REGISTERED
≠
PRODUCTION AUTHORIZED
```

---

# 29. Capability Taxonomy

Capabilities should be classified to improve governance, discovery, and
reuse.

---

# 30. Core Capability Categories

A target taxonomy may include:

```text
PERCEPTION

RETRIEVAL

ANALYSIS

REASONING

PLANNING

GENERATION

TRANSFORMATION

VALIDATION

EXECUTION

COMMUNICATION

COLLABORATION

MONITORING

SECURITY

QUALITY

DATA

ENGINEERING

RESEARCH

BUSINESS

OPERATIONS
```

---

# 31. Perception Capabilities

Potential:

```text
DOCUMENT INTERPRETATION

IMAGE INTERPRETATION

EVENT INTERPRETATION

LOG INTERPRETATION

STRUCTURED INPUT PARSING
```

---

# 32. Retrieval Capabilities

Potential:

```text
KNOWLEDGE RETRIEVAL

MEMORY RETRIEVAL

SEARCH

DATABASE QUERY

ARTIFACT DISCOVERY
```

---

# 33. Analysis Capabilities

Potential:

```text
DATA ANALYSIS

ROOT-CAUSE ANALYSIS

RISK ANALYSIS

CODE ANALYSIS

SECURITY ANALYSIS

MARKET ANALYSIS

FINANCIAL ANALYSIS
```

---

# 34. Planning Capabilities

Potential:

```text
GOAL PLANNING

TASK DECOMPOSITION

DEPENDENCY PLANNING

EXECUTION PLANNING

ROLLBACK PLANNING

RESOURCE PLANNING
```

---

# 35. Generation Capabilities

Potential:

```text
CODE GENERATION

DOCUMENT GENERATION

REPORT GENERATION

TEST GENERATION

QUERY GENERATION

PLAN GENERATION
```

---

# 36. Validation Capabilities

Potential:

```text
SCHEMA VALIDATION

CODE VALIDATION

SECURITY VALIDATION

QUALITY REVIEW

RESULT VERIFICATION

COMPLIANCE CHECK
```

---

# 37. Execution Capabilities

Potential:

```text
TOOL INVOCATION

WORKFLOW STEP EXECUTION

CODE EXECUTION

DEPLOYMENT EXECUTION

DATA MUTATION

SYSTEM CONFIGURATION
```

Execution capabilities generally require stronger permissions.

---

# 38. Communication Capabilities

Potential:

```text
REPORTING

STATUS UPDATE

QUESTION GENERATION

ESCALATION

CUSTOMER COMMUNICATION

INTERNAL MESSAGING
```

---

# 39. Collaboration Capabilities

Potential:

```text
DELEGATION

HANDOFF

PEER REVIEW

TEAM PARTICIPATION

RESULT INTEGRATION
```

---

# 40. Monitoring Capabilities

Potential:

```text
HEALTH ANALYSIS

METRIC ANALYSIS

ALERT TRIAGE

PERFORMANCE REVIEW

ANOMALY DETECTION
```

---

# 41. Security Capabilities

Potential:

```text
THREAT ANALYSIS

ACCESS REVIEW

VULNERABILITY REVIEW

POLICY VALIDATION

SECURITY EVENT TRIAGE
```

Security capability does not automatically grant privileged access.

---

# 42. Engineering Capabilities

Potential:

```text
ARCHITECTURE DESIGN

BACKEND ENGINEERING

FRONTEND ENGINEERING

DATABASE ENGINEERING

API DESIGN

TESTING

DEBUGGING

CODE REVIEW

DEVOPS ANALYSIS
```

---

# 43. Business Capabilities

Potential:

```text
PRODUCT ANALYSIS

MARKETING ANALYSIS

SEO ANALYSIS

SALES ANALYSIS

FINANCE ANALYSIS

OPERATIONS ANALYSIS

SUPPORT TRIAGE
```

---

# 44. Capability Classification by Side Effect

Capabilities should additionally be classified by execution effect.

Potential:

```text
READ_ONLY

ADVISORY

CONTENT_GENERATING

INTERNAL_WRITE

EXTERNAL_WRITE

PRIVILEGED_WRITE

DESTRUCTIVE
```

---

# 45. Read-Only Capability

Example:

```text
ANALYZE LOGS
```

without changing source systems.

---

# 46. Advisory Capability

Example:

```text
RECOMMEND DATABASE INDEX
```

without executing the modification.

---

# 47. Internal-Write Capability

Example:

```text
CREATE INTERNAL DRAFT
```

---

# 48. External-Write Capability

Example:

```text
SEND CUSTOMER MESSAGE
```

---

# 49. Privileged-Write Capability

Example:

```text
MODIFY PRODUCTION CONFIGURATION
```

---

# 50. Destructive Capability

Potential:

```text
DELETE RESOURCE

DROP DATABASE OBJECT

REVOKE ACCESS

PURGE DATA
```

These require the strongest controls.

---

# 51. Capability Risk Classification

Capabilities should receive a risk class.

A conceptual scale may be:

```text
C0
INFORMATIONAL

C1
LOW RISK

C2
MODERATE RISK

C3
HIGH RISK

C4
CRITICAL RISK
```

Exact thresholds require governance approval.

---

# 52. Risk Inputs

Potential:

```text
DATA SENSITIVITY

SIDE EFFECT

REVERSIBILITY

PRODUCTION IMPACT

CUSTOMER IMPACT

SECURITY IMPACT

FINANCIAL IMPACT

LEGAL IMPACT

AUTONOMY

TOOL PRIVILEGE
```

---

# 53. Risk Hard Rule

```text
SAME CAPABILITY NAME
≠
SAME RISK IN EVERY CONTEXT
```

Example:

```text
CODE GENERATION
IN SANDBOX
≠
CODE GENERATION + DIRECT PRODUCTION DEPLOYMENT
```

---

# 54. Capability Context

Capability risk and eligibility may depend on:

```text
PROJECT

CUSTOMER

TENANT

ENVIRONMENT

TASK

DATA

TOOL

MODEL

AUTONOMY LEVEL
```

---

# 55. Capability Composition

Complex Agent behavior may be composed from smaller Capabilities.

---

# 56. Composition Example

```text
FULL CODE CHANGE
=
REQUIREMENT ANALYSIS
+
CODE GENERATION
+
TEST GENERATION
+
TEST EXECUTION
+
CODE REVIEW
+
EVIDENCE ASSEMBLY
```

---

# 57. Atomic Capability Strategy

Capabilities should be atomic enough to:

```text
REUSE

TEST

GOVERN

MAP

EVALUATE
```

but not fragmented into meaningless micro-actions.

---

# 58. Composite Capability

A composite Capability may reference multiple underlying Capabilities.

Conceptually:

```yaml
composite_capability:
  capability_id: SOFTWARE_CHANGE
  includes:
    - REQUIREMENT_ANALYSIS
    - CODE_GENERATION
    - TEST_GENERATION
    - TEST_EXECUTION
    - VALIDATION
```

---

# 59. Composition Boundary

```text
ALL CHILD CAPABILITIES AVAILABLE
≠
COMPOSITE ACTION AUTHORIZED
```

---

# 60. Capability Dependencies

Capabilities may depend on:

```text
OTHER CAPABILITY

SKILL

TOOL

MODEL ABILITY

MEMORY ACCESS

CONTEXT

DATA ACCESS

APPROVAL

ENVIRONMENT
```

---

# 61. Hard Dependency

A Capability cannot function without the dependency.

---

# 62. Optional Dependency

An optional dependency may improve quality or performance.

---

# 63. Dependency Graph

Conceptually:

```text
CAPABILITY
├── REQUIRED SKILL
├── REQUIRED TOOL
├── REQUIRED MODEL FEATURE
├── REQUIRED MEMORY
└── REQUIRED DATA
```

---

# 64. Circular Dependency

Capability dependency cycles should be detected.

---

# 65. Dependency Availability

A Capability should be considered unavailable if a mandatory dependency
is unavailable.

---

# 66. Dependency Boundary

```text
CAPABILITY REGISTERED
+
TOOL UNAVAILABLE
=
CAPABILITY NOT FULLY EXECUTABLE
```

---

# 67. Capability Assignment

Capabilities may be assigned to Agent definitions.

---

# 68. Definition-Level Assignment

Use when the capability is fundamental to that Agent definition.

---

# 69. Allocation-Level Restriction

An allocation may restrict a capability available in the base definition.

---

# 70. Allocation Expansion

Allocation-level expansion beyond the approved Agent definition should
require explicit governance.

---

# 71. Assignment Boundary

```text
CAPABILITY ASSIGNED
≠
CURRENT RUN ELIGIBLE
```

---

# 72. Runtime Capability Resolution

At runtime, effective capability may conceptually be:

```text
DEFINED CAPABILITIES
∩
ALLOCATION CAPABILITIES
∩
CURRENT POLICY
∩
CURRENT SCOPE
∩
AVAILABLE DEPENDENCIES
=
EFFECTIVE CAPABILITY SET
```

---

# 73. Current Permission

Even an effective capability still requires action authorization.

---

# 74. Capability Mapping

Capabilities should be mapped to relevant enterprise concepts.

---

# 75. Capability-to-Agent-Type Mapping

Example:

```text
EXECUTIVE
→
STRATEGIC ANALYSIS
PRIORITIZATION
RISK REVIEW

SPECIALIST
→
DOMAIN ANALYSIS
DOMAIN EXECUTION

WORKER
→
REPEATABLE TASK EXECUTION
```

---

# 76. Capability-to-Role Mapping

Example:

```text
BACKEND ENGINEER
→
API DESIGN
DATABASE DESIGN
CODE GENERATION
TESTING
DEBUGGING
```

---

# 77. Capability-to-Skill Mapping

Example:

```text
CAPABILITY
=
API DESIGN

SKILLS
=
REST DESIGN
SCHEMA DESIGN
AUTHORIZATION DESIGN
VERSIONING
```

---

# 78. Capability-to-Tool Mapping

Example:

```text
CAPABILITY
=
CODE REVIEW

TOOLS
=
REPOSITORY READ
DIFF READER
TEST RUNNER
```

---

# 79. Capability-to-Model Mapping

Some capabilities may require:

```text
LONG CONTEXT

STRUCTURED OUTPUT

CODE GENERATION

VISION

TOOL USE

MULTILINGUAL SUPPORT
```

from the selected Model.

---

# 80. Capability-to-Memory Mapping

Potential:

```text
PROJECT ANALYSIS
→
PROJECT MEMORY

USER ASSISTANCE
→
USER MEMORY WHERE AUTHORIZED

INCIDENT ANALYSIS
→
EPISODIC MEMORY

REUSABLE KNOWLEDGE
→
SEMANTIC MEMORY
```

---

# 81. Capability-to-Task Mapping

Tasks should declare required Capabilities where practical.

---

# 82. Task Requirement Example

```yaml
task_requirements:
  capabilities:
    - DATABASE_SCHEMA_DESIGN
    - SECURITY_REVIEW
    - DOCUMENTATION
```

---

# 83. Capability Discovery

The Agent Framework should eventually support discovery of Capabilities.

Questions:

```text
WHAT CAPABILITIES EXIST?

WHICH VERSION?

WHICH AGENTS HAVE THEM?

WHICH SKILLS SUPPORT THEM?

WHICH TOOLS SUPPORT THEM?

WHAT RISK CLASS?

WHAT EVALUATION EXISTS?

WHAT STATUS?
```

---

# 84. Capability Registry

A centralized Capability Registry should eventually provide metadata.

---

# 85. Registry Record

Conceptually:

```yaml
capability_registry_entry:
  capability_id: required
  current_version: required

  name: required
  category: required

  lifecycle_status: required
  risk_class: required

  owner: required

  required_skill_refs: conditional
  required_tool_refs: conditional

  evaluation_profile_ref: required

  created_at: required
  updated_at: required
```

---

# 86. Registry Boundary

```text
CAPABILITY IN REGISTRY
≠
CAPABILITY ENABLED FOR EVERY AGENT
```

---

# 87. Capability Discovery for Agent Selection

Task routing may eventually use:

```text
TASK REQUIRED CAPABILITIES
↓
CAPABILITY REGISTRY
↓
AGENTS WITH CAPABILITY
↓
CURRENT AUTHORIZATION
↓
AVAILABILITY
↓
QUALITY
↓
COST
↓
AGENT SELECTION
```

---

# 88. Discovery Hard Rule

```text
BEST CAPABILITY MATCH
≠
AUTHORIZED AGENT
```

---

# 89. Capability Permission Model

Permissions must remain separate.

---

# 90. Permission Dimensions

Potential:

```text
ACTION

RESOURCE

TOOL

PROJECT

CUSTOMER

TENANT

ENVIRONMENT

DATA CLASSIFICATION

TIME

TASK

APPROVAL
```

---

# 91. Effective Action Eligibility

Conceptually:

```text
AGENT HAS CAPABILITY
AND
CAPABILITY AVAILABLE
AND
DEPENDENCIES HEALTHY
AND
ACTION PERMITTED
AND
SCOPE VALID
AND
POLICY ALLOWS
AND
APPROVAL VALID WHERE REQUIRED
=
ACTION ELIGIBLE
```

---

# 92. Missing Permission

```text
CAPABILITY PRESENT
+
PERMISSION ABSENT
=
DENY
```

---

# 93. Unknown Permission

```text
UNKNOWN
=
DENY
```

for sensitive operations.

---

# 94. Capability Scope

Capabilities themselves may be reusable globally, while execution remains
scope-bound.

---

# 95. Project Scope

```text
AGENT HAS DATABASE_QUERY CAPABILITY
```

does not mean:

```text
QUERY EVERY PROJECT DATABASE
```

---

# 96. Customer Scope

```text
AGENT HAS CUSTOMER_SUPPORT CAPABILITY
```

does not mean access to every Customer.

---

# 97. Tenant Scope

Tenant boundaries remain explicit.

---

# 98. Environment Scope

```text
DEPLOYMENT CAPABILITY
IN DEVELOPMENT
≠
PRODUCTION DEPLOYMENT AUTHORITY
```

---

# 99. User Scope

User-facing capabilities may require User-specific authorization and
purpose.

---

# 100. Scope Hard Rule

```text
CAPABILITY
IS
REUSABLE

AUTHORITY
IS
CONTEXTUAL
```

---

# 101. Capability Availability

A Capability may be:

```text
AVAILABLE

DEGRADED

DISABLED

SUSPENDED

DEPRECATED

RETIRED
```

---

# 102. Disabled Capability

A globally disabled Capability should not be used by new runs.

---

# 103. Capability Kill Switch

Critical capabilities may require an independent disable mechanism.

---

# 104. Capability-Level Suspension

Potentially disable:

```text
ONE CAPABILITY VERSION

ONE TOOL-BACKED CAPABILITY

ONE AGENT'S CAPABILITY

ONE PROJECT'S CAPABILITY

ONE CUSTOMER'S CAPABILITY
```

where architecture supports it.

---

# 105. Kill-Switch Boundary

```text
AGENT CONFIGURATION SAYS ENABLED
+
CAPABILITY SUSPENDED
=
DO NOT EXECUTE
```

---

# 106. Capability Evaluation

A Capability must be evaluated independently from its description.

---

# 107. Evaluation Areas

Potential:

```text
CORRECTNESS

COMPLETENESS

QUALITY

RELIABILITY

SECURITY

POLICY COMPLIANCE

TOOL USE

LATENCY

COST

FAILURE HANDLING

EVIDENCE QUALITY
```

---

# 108. Evaluation Levels

Potential:

```text
COMPONENT TEST

CAPABILITY TEST

AGENT-INTEGRATION TEST

SCENARIO TEST

SECURITY TEST

REGRESSION TEST

LIVE MONITORING
```

---

# 109. Capability Evaluation Boundary

```text
AGENT PASSES ONE TASK
≠
CAPABILITY PROVEN
```

---

# 110. Evaluation Profile

Conceptually:

```yaml
capability_evaluation_profile:
  capability_id: required
  capability_version: required

  test_suites: required
  quality_dimensions: required

  security_tests: conditional
  performance_tests: conditional

  acceptance_requirements: required
```

---

# 111. Capability Benchmark

Benchmarks may measure Capability performance across:

```text
TASK TYPES

MODELS

AGENT TYPES

TOOLS

INDUSTRIES

LANGUAGES

DATA COMPLEXITY
```

---

# 112. Regression Testing

New Capability Versions should be checked against previous accepted
behavior.

---

# 113. Security Evaluation

High-risk Capabilities require adversarial testing.

---

# 114. Security Test Examples

```text
PERMISSION BYPASS

PROJECT ESCAPE

CUSTOMER ESCAPE

TENANT ESCAPE

PROMPT INJECTION

TOOL ABUSE

SECRET EXPOSURE

UNAUTHORIZED DATA ACCESS

APPROVAL BYPASS
```

---

# 115. Capability Evidence

Material capability claims should have Evidence.

---

# 116. Evidence Examples

```text
TEST RESULT

BENCHMARK RESULT

SECURITY TEST

QUALITY SCORE

RUN RESULT

ARTIFACT

TOOL RESULT

AUDIT EVENT

REGRESSION RESULT
```

---

# 117. Evidence Boundary

```text
CAPABILITY DESCRIPTION
≠
CAPABILITY EVIDENCE
```

---

# 118. Capability Quality

Quality may vary by:

```text
AGENT

MODEL

SKILL SET

TOOL SET

CONTEXT

MEMORY

TASK COMPLEXITY

DOMAIN

LANGUAGE
```

---

# 119. Capability Quality Boundary

```text
CAPABILITY NAME
≠
FIXED QUALITY
```

---

# 120. Capability Confidence

Agent confidence must not be used as the only proof of Capability quality.

---

# 121. Capability Monitoring

Production capability behavior should eventually be observable.

---

# 122. Monitoring Dimensions

Potential:

```text
USAGE COUNT

SUCCESS RATE

VERIFIED SUCCESS RATE

FAILURE RATE

LATENCY

COST

SECURITY EVENTS

POLICY DENIALS

TOOL FAILURES

QUALITY SCORE

REGRESSION

ESCALATION RATE
```

---

# 123. Capability Health

Potential:

```text
HEALTHY

DEGRADED

RESTRICTED

SUSPENDED

UNDER_REVIEW

DEPRECATED

RETIRED
```

---

# 124. Capability Health Boundary

```text
CAPABILITY INVOCATION SUCCEEDS
≠
CAPABILITY HEALTHY
```

Quality and security also matter.

---

# 125. Capability Cost

Capabilities may consume:

```text
MODEL TOKENS

MODEL COST

TOOL COST

COMPUTE

STORAGE

NETWORK

HUMAN REVIEW
```

---

# 126. Cost Attribution

Cost should eventually be attributable to:

```text
CAPABILITY

AGENT

RUN

TASK

PROJECT

CUSTOMER

TENANT
```

---

# 127. Capability Budget

Certain capabilities may require specific budget limits.

---

# 128. Budget Boundary

```text
CAPABILITY AFFORDABLE
≠
CAPABILITY AUTHORIZED
```

---

# 129. Model Dependency

A Capability may declare model requirements.

---

# 130. Model Requirements

Potential:

```text
MINIMUM CONTEXT SIZE

STRUCTURED OUTPUT

TOOL CALLING

VISION

CODE COMPETENCE

LANGUAGE

REASONING QUALITY
```

---

# 131. Model Change

Model replacement may change Capability performance.

---

# 132. Model Change Gate

```text
MODEL CHANGED
=
CAPABILITY RE-EVALUATION MAY BE REQUIRED
```

---

# 133. Model Boundary

```text
MODEL SUPPORTS CAPABILITY
≠
CAPABILITY CERTIFIED
```

---

# 134. Tool Dependency

Some Capabilities require Tools.

---

# 135. Tool Availability

If required Tool is unavailable:

```text
CAPABILITY
=
DEGRADED OR UNAVAILABLE
```

for that execution path.

---

# 136. Tool Authorization

A Tool dependency still requires current Tool permission.

---

# 137. Tool Boundary

```text
CAPABILITY REQUIRES TOOL
≠
TOOL ACCESS GRANTED AUTOMATICALLY
```

---

# 138. Skill Dependency

Capabilities may depend on one or more Skills.

---

# 139. Skill Quality

Skill evaluation may affect Capability qualification.

---

# 140. Skill Boundary

```text
SKILL ASSIGNED
≠
CAPABILITY PROVEN
```

---

# 141. Memory Dependency

Capabilities may require governed Memory access.

---

# 142. Memory Example

```text
PROJECT STATUS ANALYSIS
```

may require:

```text
PROJECT MEMORY
+
CURRENT TASK STATE
```

---

# 143. Memory Boundary

```text
CAPABILITY NEEDS MEMORY
≠
CAPABILITY MAY READ ALL MEMORY
```

---

# 144. Context Dependency

Capabilities may require specific Context.

---

# 145. Context Requirement

Potential:

```text
TASK DESCRIPTION

PROJECT CONTEXT

CUSTOMER POLICY

TENANT POLICY

CURRENT STATE

EVIDENCE
```

---

# 146. Missing Context

A Capability should fail safely or escalate rather than fabricate missing
critical Context.

---

# 147. Capability Failure Model

A Capability invocation may fail because of:

```text
INVALID INPUT

MISSING DEPENDENCY

MISSING SKILL

TOOL FAILURE

MODEL FAILURE

MEMORY FAILURE

CONTEXT FAILURE

AUTHORIZATION DENIED

POLICY DENIED

BUDGET EXCEEDED

QUALITY FAILURE

SECURITY FAILURE

TIMEOUT
```

---

# 148. Failure Boundary

```text
CAPABILITY FAILURE
≠
AGENT SHOULD PRETEND SUCCESS
```

---

# 149. Capability Result

Capability result may include:

```text
STATUS

OUTPUT

WARNINGS

ERRORS

CONFIDENCE

EVIDENCE

DEPENDENCY RESULTS
```

---

# 150. Capability Result Boundary

```text
CAPABILITY RESULT
≠
BUSINESS TRUTH AUTOMATICALLY
```

---

# 151. Retry Strategy

Retries should depend on failure type and side effects.

---

# 152. Read-Only Retry

Read-only capability failures may often support safer retry.

---

# 153. Write Retry

Write capabilities require idempotency awareness.

---

# 154. Destructive Retry

```text
DESTRUCTIVE CAPABILITY
≠
BLIND RETRY
```

---

# 155. Capability Idempotency

Where relevant, Capability contracts should describe whether repeated
execution is safe.

---

# 156. Capability Reversibility

Capabilities should identify whether effects are:

```text
NO_SIDE_EFFECT

REVERSIBLE

COMPENSATABLE

PARTIALLY_REVERSIBLE

IRREVERSIBLE
```

---

# 157. Reversibility Risk

Lower reversibility generally increases required governance.

---

# 158. Approval Requirements

Capability metadata may indicate potential approval requirements.

---

# 159. Approval Boundary

Actual approval should still be determined by current execution context.

---

# 160. Capability Autonomy

A Capability may support multiple autonomy modes.

Example:

```text
DEPLOYMENT CAPABILITY

MODE A
=
RECOMMEND DEPLOYMENT

MODE B
=
PREPARE DEPLOYMENT

MODE C
=
EXECUTE APPROVED DEPLOYMENT
```

---

# 161. Capability Autonomy Boundary

```text
CAPABILITY SUPPORTS EXECUTION
≠
AGENT AUTONOMY INCLUDES EXECUTION
```

---

# 162. Progressive Capability Enablement

Capabilities may be introduced progressively.

```text
DEFINED
↓
TEST ONLY
↓
SANDBOX
↓
INTERNAL PILOT
↓
LIMITED PRODUCTION
↓
BROADER APPROVED USE
```

---

# 163. Capability Promotion Gate

Promotion may require:

```text
QUALITY

SECURITY

RELIABILITY

EVIDENCE

MONITORING

ROLLBACK

OWNER

APPROVAL
```

---

# 164. Multi-Project Capability Architecture

Capability definitions may be shared across Projects.

Execution remains Project-scoped.

---

# 165. Project Capability Example

```text
CAPABILITY
=
CODE_REVIEW

PROJECT A
→
REPOSITORY A ONLY

PROJECT B
→
REPOSITORY B ONLY
```

---

# 166. Cross-Project Hard Rule

```text
SAME CAPABILITY
≠
CROSS-PROJECT DATA ACCESS
```

---

# 167. Multi-Customer Capability Architecture

A Capability may be reusable across Customers.

---

# 168. Customer-Specific Policy

Customer configuration may:

```text
ALLOW CAPABILITY

DENY CAPABILITY

LIMIT CAPABILITY

REQUIRE APPROVAL

REQUIRE SPECIFIC TOOL

REQUIRE SPECIFIC MODEL
```

within enterprise policy.

---

# 169. Customer Hard Rule

```text
CUSTOMER A ALLOWS CAPABILITY
≠
CUSTOMER B ALLOWS CAPABILITY
```

---

# 170. Multi-Tenant Capability Architecture

Tenant-specific execution must resolve current Tenant authorization.

---

# 171. Tenant Hard Rule

```text
CAPABILITY ACTIVE IN TENANT A
≠
ACTIVE IN TENANT B
```

---

# 172. Customer Overlay Boundary

Customer overlays must not weaken mandatory Mianx.ai security controls.

---

# 173. Industry Capability Architecture

Industry Operating Systems may introduce industry-specific Capabilities.

---

# 174. Industry Capability Examples

Potential:

```text
RESTAURANT_MENU_ANALYSIS

POULTRY_FLOCK_PERFORMANCE_ANALYSIS

HEALTHCARE_WORKFLOW_ANALYSIS

EDUCATION_CURRICULUM_ANALYSIS
```

subject to domain governance.

---

# 175. Industry Extension Strategy

Prefer:

```text
CORE CAPABILITY
+
INDUSTRY EXTENSION
```

where appropriate.

---

# 176. Industry Boundary

```text
INDUSTRY EXTENSION
≠
NEW SECURITY MODEL
```

---

# 177. Capability Reuse

Reusable capabilities reduce duplicated Agent behavior.

---

# 178. Reuse Criteria

Good reusable Capabilities should have:

```text
CLEAR PURPOSE

STABLE CONTRACT

LIMITED RESPONSIBILITY

TESTABILITY

VERSIONING

DEPENDENCY DECLARATION

EVALUATION

SECURITY MODEL
```

---

# 179. Capability Proliferation

Avoid creating new Capabilities for every minor task variation.

---

# 180. New Capability Decision

Before creating a Capability ask:

```text
IS THIS A NEW FUNCTIONAL ABILITY?

OR

A NEW SKILL?

A NEW TOOL?

A NEW ROLE?

A NEW CONFIGURATION?

A NEW POLICY?

A NEW TASK TEMPLATE?
```

---

# 181. Capability Naming Collision

Two Capabilities with similar names should be reviewed for overlap.

---

# 182. Capability Merge Rule

Merge only when:

```text
SAME PURPOSE

SAME INPUT/OUTPUT SEMANTICS

SAME RISK MODEL

SAME DEPENDENCY MODEL

NO MATERIAL GOVERNANCE DIFFERENCE
```

---

# 183. Capability Deprecation

A Capability may be deprecated because of:

```text
BETTER REPLACEMENT

SECURITY RISK

LOW QUALITY

VENDOR RETIREMENT

ARCHITECTURE CHANGE

BUSINESS CHANGE
```

---

# 184. Deprecation Metadata

Should include:

```text
REASON

REPLACEMENT

DATE

MIGRATION PATH

NEW ASSIGNMENT POLICY
```

---

# 185. Capability Retirement

Retired Capability Versions should not receive new assignments.

---

# 186. Historical Evidence

Retirement must not erase historical Agent-run Evidence.

---

# 187. Capability Migration

Existing Agent definitions may need migration to new Capability Versions.

---

# 188. Migration Flow

```text
CURRENT CAPABILITY VERSION
↓
NEW VERSION DEFINED
↓
COMPATIBILITY REVIEW
↓
EVALUATION
↓
AGENT IMPACT ANALYSIS
↓
CONTROLLED MIGRATION
↓
MONITOR
↓
OLD VERSION RETIRE
```

---

# 189. Compatibility

Capability changes may be:

```text
BACKWARD_COMPATIBLE

CONDITIONALLY_COMPATIBLE

BREAKING
```

---

# 190. Breaking Change

Breaking Capability changes require stronger Agent Version review.

---

# 191. Capability Configuration

Capability settings should be explicit and Version-controlled where
material.

---

# 192. Capability Parameterization

Some Capabilities may allow safe parameters.

Example:

```yaml
capability_configuration:
  capability_id: SEARCH
  max_results: 20
  allowed_sources:
    - project_knowledge
```

---

# 193. Parameter Boundary

```text
CONFIGURABLE
≠
UNBOUNDED
```

---

# 194. Protected Parameters

Security-sensitive parameters must not be caller-controlled without
validation.

---

# 195. Capability Input Contract

Inputs should be defined where practical.

---

# 196. Input Requirements

Potential:

```text
SCHEMA

REQUIRED FIELDS

OPTIONAL FIELDS

CLASSIFICATION

MAXIMUM SIZE

SOURCE

TRUST LEVEL
```

---

# 197. Capability Output Contract

Outputs should be defined where practical.

---

# 198. Output Requirements

Potential:

```text
SCHEMA

RESULT TYPE

STATUS

WARNINGS

ERRORS

EVIDENCE

CONFIDENCE

ARTIFACTS
```

---

# 199. Contract Boundary

```text
MODEL GENERATED STRUCTURE
≠
CONTRACT VALIDATED
```

---

# 200. Capability Security

Capability execution should be defense-in-depth.

---

# 201. Security Layers

Potential:

```text
AGENT IDENTITY

CAPABILITY ASSIGNMENT

ACTION PERMISSION

PROJECT SCOPE

CUSTOMER SCOPE

TENANT SCOPE

TOOL PERMISSION

MODEL POLICY

MEMORY POLICY

APPROVAL

AUDIT
```

---

# 202. Capability Spoofing

Callers must not be able to claim an Agent has a Capability that the
trusted definition does not contain.

---

# 203. Capability Elevation

Agents must not self-assign new Capabilities outside governed change.

---

# 204. Capability Elevation Hard Rule

```text
AGENT DECIDES
"I NEED ADMIN CAPABILITY"
≠
ADMIN CAPABILITY GRANTED
```

---

# 205. Tool-Induced Capability

Connecting a powerful Tool must not silently expand Agent capability
claims.

---

# 206. Prompt-Induced Capability

Prompt text must not bypass Registry or configuration.

---

# 207. Capability Poisoning

Malicious external data must not alter Capability metadata.

---

# 208. Capability Registry Integrity

Registry records require protected write authority.

---

# 209. Capability Audit

Material capability events should be auditable.

Potential:

```text
CAPABILITY_DEFINED

CAPABILITY_VERSION_CREATED

CAPABILITY_APPROVED

CAPABILITY_REGISTERED

CAPABILITY_ASSIGNED

CAPABILITY_RESTRICTED

CAPABILITY_SUSPENDED

CAPABILITY_DEPRECATED

CAPABILITY_RETIRED
```

---

# 210. Runtime Capability Audit

Potential:

```text
CAPABILITY_REQUESTED

CAPABILITY_ALLOWED

CAPABILITY_DENIED

CAPABILITY_STARTED

CAPABILITY_COMPLETED

CAPABILITY_FAILED
```

---

# 211. Audit Minimization

Do not copy unnecessary sensitive task content into Capability audit
records.

---

# 212. Capability Metrics

Potential:

```text
INVOCATION_COUNT

VERIFIED_SUCCESS_RATE

FAILURE_RATE

DENIAL_RATE

AVERAGE_LATENCY

P95_LATENCY

COST

SECURITY_EVENT_RATE

QUALITY_SCORE

REGRESSION_RATE

RETRY_RATE
```

---

# 213. Capability SLOs

No universal SLO is declared here.

Targets should depend on Capability class and business criticality.

---

# 214. Capability Availability

High-value Capabilities may need fallback architecture.

---

# 215. Fallback Options

Potential:

```text
ALTERNATE MODEL

ALTERNATE TOOL

ALTERNATE AGENT

MANUAL EXECUTION

SAFE DEGRADATION
```

---

# 216. Fallback Boundary

```text
PRIMARY CAPABILITY FAILED
≠
BYPASS PERMISSIONS
```

---

# 217. Capability Scalability

Capabilities should support increasing execution volume.

---

# 218. Scale Dimensions

Potential:

```text
INVOCATIONS

CONCURRENT RUNS

AGENTS

PROJECTS

CUSTOMERS

TENANTS

TOOL REQUESTS

MODEL REQUESTS

MEMORY REQUESTS
```

---

# 219. Scale Boundary

```text
ONE SUCCESSFUL CAPABILITY RUN
≠
CAPABILITY SCALES
```

---

# 220. Noisy Neighbor

High-volume capability use by one Customer should not degrade unrelated
protected workloads beyond approved limits.

---

# 221. Capability Quotas

Quotas may be applied by:

```text
AGENT

PROJECT

CUSTOMER

TENANT

CAPABILITY

TOOL

MODEL
```

---

# 222. Capability Rate Limiting

Rate limits may reduce:

```text
RUNAWAY LOOPS

COST SPIKES

TOOL ABUSE

RESOURCE EXHAUSTION
```

---

# 223. Capability Concurrency

Some Capabilities may safely run concurrently.

Others may require coordination.

---

# 224. Concurrency Risks

Potential:

```text
DOUBLE WRITE

RACE CONDITION

RESOURCE CONFLICT

STALE DATA

DUPLICATE EXTERNAL ACTION
```

---

# 225. Concurrency Requirement

Capability metadata may declare concurrency constraints.

---

# 226. Capability Idempotency Metadata

Potential:

```text
IDEMPOTENT

CONDITIONALLY_IDEMPOTENT

NON_IDEMPOTENT

UNKNOWN
```

---

# 227. Unknown Idempotency

Unknown destructive operation behavior should receive conservative
handling.

---

# 228. Capability Observability

Each material capability invocation should correlate to:

```text
AGENT ID

AGENT VERSION

RUN ID

CAPABILITY ID

CAPABILITY VERSION

PROJECT

CUSTOMER

TENANT

TOOL

MODEL

STATUS
```

where applicable.

---

# 229. Capability Trace

Potential execution trace:

```text
CAPABILITY REQUEST
↓
CAPABILITY RESOLUTION
↓
DEPENDENCY CHECK
↓
AUTHORIZATION CHECK
↓
EXECUTION
↓
RESULT
↓
VALIDATION
↓
EVIDENCE
```

---

# 230. Capability Ownership

Every production-critical Capability should have an owner.

---

# 231. Ownership Responsibilities

Potential:

```text
DEFINITION

QUALITY

SECURITY

DEPENDENCIES

EVALUATION

MIGRATION

DEPRECATION

DOCUMENTATION
```

---

# 232. Ownership Boundary

```text
AUTONOMOUS CAPABILITY
≠
OWNERLESS CAPABILITY
```

---

# 233. Agent-Type Capability Profiles

Agent Types may define baseline Capability sets.

---

# 234. Worker Agent Profile

Potential:

```text
TASK EXECUTION

DATA RETRIEVAL

REPORTING

VALIDATION

TOOL USE
```

---

# 235. Specialist Agent Profile

Potential:

```text
DOMAIN ANALYSIS

DOMAIN GENERATION

DOMAIN VALIDATION

DOMAIN TOOL USE
```

---

# 236. Manager Agent Profile

Potential:

```text
TASK DECOMPOSITION

PRIORITIZATION

DELEGATION

PROGRESS ANALYSIS

RESULT REVIEW
```

---

# 237. Executive Agent Profile

Potential:

```text
STRATEGIC ANALYSIS

RISK REVIEW

PRIORITIZATION

CROSS-FUNCTIONAL RECOMMENDATION
```

not unrestricted executive authority.

---

# 238. System Agent Profile

Potential:

```text
MONITORING

HEALTH ANALYSIS

ROUTING SUPPORT

VALIDATION

SYNCHRONIZATION
```

---

# 239. Agent-Type Boundary

```text
TYPE DEFAULT CAPABILITY
≠
UNCONDITIONAL CAPABILITY ASSIGNMENT
```

---

# 240. Capability Profiles by Role

Roles may reference profiles rather than duplicate lists.

Example:

```text
BACKEND_ENGINEER_CAPABILITY_PROFILE

SECURITY_ANALYST_CAPABILITY_PROFILE

SEO_SPECIALIST_CAPABILITY_PROFILE
```

---

# 241. Capability Profile

Conceptually:

```yaml
capability_profile:
  profile_id: required
  version: required

  required:
    - capability_a
    - capability_b

  optional:
    - capability_c

  prohibited:
    - capability_x
```

---

# 242. Prohibited Capability

Some Agent Types or Roles may explicitly prohibit certain capabilities.

---

# 243. Prohibition Precedence

```text
CAPABILITY ASSIGNED
+
POLICY PROHIBITS
=
DENY
```

---

# 244. Capability Policy

Governance may define enterprise rules such as:

```text
WHO MAY RECEIVE CAPABILITY

WHAT RISK CLASS

WHAT ENVIRONMENT

WHAT APPROVAL

WHAT EVALUATION

WHAT MONITORING
```

---

# 245. Capability Policy Boundary

```text
CAPABILITY METADATA
≠
FULL POLICY ENGINE
```

---

# 246. Separation of Duties

Some Capability combinations may create excessive authority.

---

# 247. Toxic Capability Combination

Example:

```text
CREATE_PAYMENT
+
APPROVE_PAYMENT
+
AUDIT_PAYMENT
```

in one Agent may violate separation-of-duties rules.

---

# 248. Capability Conflict Registry

The system may maintain incompatible or restricted combinations.

---

# 249. Conflict Types

Potential:

```text
SECURITY CONFLICT

SEPARATION-OF-DUTIES CONFLICT

TOOL CONFLICT

POLICY CONFLICT

DATA-SCOPE CONFLICT

AUTONOMY CONFLICT
```

---

# 250. Conflict Hard Rule

```text
BOTH CAPABILITIES VALID INDIVIDUALLY
≠
SAFE TO COMBINE
```

---

# 251. Capability Admission

New Capabilities should undergo a controlled admission process.

---

# 252. Admission Inputs

```text
PURPOSE

OWNER

INPUT CONTRACT

OUTPUT CONTRACT

DEPENDENCIES

RISK

SECURITY

EVALUATION

MONITORING

FAILURE MODEL

MIGRATION
```

---

# 253. Capability Approval

High-risk Capabilities require stronger review.

---

# 254. Capability Production Authorization

Production authorization should be explicit for high-impact Capabilities.

---

# 255. Capability Production Gate

Before a material Capability may be considered Production-authorized:

- [ ] stable Capability ID exists;
- [ ] Capability Version exists;
- [ ] purpose is explicit;
- [ ] owner is explicit;
- [ ] category is defined;
- [ ] lifecycle state is defined;
- [ ] risk class is defined;
- [ ] input contract exists where required;
- [ ] output contract exists where required;
- [ ] required Skills are defined;
- [ ] required Tools are defined;
- [ ] required Model abilities are defined where applicable;
- [ ] required Memory access is defined where applicable;
- [ ] required Context is defined;
- [ ] dependencies are explicit;
- [ ] hard vs optional dependencies are distinguishable;
- [ ] dependency failures are handled;
- [ ] capability composition is explicit where used;
- [ ] composite capability dependencies are governed;
- [ ] Capability Registry exists;
- [ ] Registry integrity is protected;
- [ ] assignment model is implemented;
- [ ] Agent Definition assignment is traceable;
- [ ] allocation-level restrictions are enforceable;
- [ ] Agent cannot self-assign Capability;
- [ ] runtime Capability resolution is implemented;
- [ ] Capability and permission are technically separate;
- [ ] Project scope is enforced;
- [ ] Customer scope is enforced;
- [ ] Tenant scope is enforced;
- [ ] environment scope is enforced;
- [ ] User scope is enforced where applicable;
- [ ] unknown sensitive scope fails safe;
- [ ] Tool authorization is separate from Capability possession;
- [ ] Model selection does not grant authority;
- [ ] Memory access is separately governed;
- [ ] Capability risk classification is reviewed;
- [ ] side-effect class is defined;
- [ ] reversibility is defined where relevant;
- [ ] idempotency characteristics are defined where relevant;
- [ ] retry behavior is controlled;
- [ ] destructive retries are protected;
- [ ] approval requirements are integrated where required;
- [ ] autonomy level does not override permission;
- [ ] capability-level suspension exists where required;
- [ ] kill-switch behavior is tested where required;
- [ ] evaluation profile exists;
- [ ] capability-level tests pass;
- [ ] Agent-integration tests pass;
- [ ] regression tests pass where applicable;
- [ ] Security tests pass;
- [ ] Prompt Injection cannot change Capability authority;
- [ ] Tool output cannot change Capability authority;
- [ ] Memory content cannot change Capability authority;
- [ ] Capability Registry spoofing is prevented;
- [ ] Capability elevation is governed;
- [ ] performance is measured;
- [ ] cost is measurable;
- [ ] monitoring exists;
- [ ] Capability health is observable;
- [ ] audit events exist;
- [ ] Evidence exists;
- [ ] Capability results are linked to Agent runs;
- [ ] false-success behavior is tested;
- [ ] cross-Project tests pass;
- [ ] cross-Customer tests pass;
- [ ] cross-Tenant tests pass;
- [ ] toxic Capability combinations are governed;
- [ ] deprecated Capabilities cannot silently reappear;
- [ ] migration process is defined;
- [ ] rollback or fallback is defined where required;
- [ ] scaling is tested for approved scope;
- [ ] noisy-neighbor behavior is understood where relevant;
- [ ] implementation truth is independently reviewed;
- [ ] Production claim is independently reviewed;
- [ ] Founder authorization is recorded where required;
- [ ] Enterprise Governance authorization is recorded.

---

# 256. Production Hard Stops

Capability Production authorization must stop if any known condition
includes:

```text
CAPABILITY HAS NO STABLE ID

CAPABILITY VERSION IS UNKNOWN

CAPABILITY PURPOSE IS AMBIGUOUS

CAPABILITY AUTOMATICALLY GRANTS PERMISSION

CAPABILITY AUTOMATICALLY GRANTS PRODUCTION ACCESS

CAPABILITY CAN SELF-ASSIGN TO AGENTS

AGENT CAN ALTER ITS OWN CAPABILITY REGISTRY ENTRY

CAPABILITY REGISTRY IS UNTRUSTED

PROJECT SCOPE IS NOT ENFORCED

CUSTOMER SCOPE IS NOT ENFORCED

TENANT SCOPE IS NOT ENFORCED

UNKNOWN SCOPE BECOMES GLOBAL

TOOL DEPENDENCY GRANTS TOOL AUTHORITY AUTOMATICALLY

MODEL SUPPORT GRANTS AUTHORITY AUTOMATICALLY

MEMORY ACCESS BYPASSES MEMORY GOVERNANCE

CAPABILITY RISK IS UNKNOWN FOR HIGH-IMPACT OPERATIONS

DESTRUCTIVE CAPABILITY HAS NO EXECUTION CONTROL

NON-IDEMPOTENT WRITE RETRIES BLINDLY

CAPABILITY RESULT CAN CLAIM SUCCESS WITHOUT VALIDATION

CAPABILITY HAS NO EVALUATION

SECURITY-SENSITIVE CAPABILITY HAS NO SECURITY TEST

PROMPT INJECTION CAN ENABLE NEW CAPABILITY AUTHORITY

MEMORY POISONING CAN ENABLE NEW CAPABILITY AUTHORITY

CAPABILITY CANNOT BE SUSPENDED WHERE REQUIRED

CAPABILITY USE IS UNAUDITABLE

CROSS-PROJECT CAPABILITY ACCESS IS POSSIBLE

CROSS-CUSTOMER CAPABILITY ACCESS IS POSSIBLE

CROSS-TENANT CAPABILITY ACCESS IS POSSIBLE

TOXIC CAPABILITY COMBINATIONS ARE UNCONTROLLED

PRODUCTION CAPABILITY BEHAVIOR IS NOT PROVEN
```

---

# 257. Capability Decision Framework

Before creating or approving a Capability ask:

```text
WHAT FUNCTIONAL ABILITY IS THIS?

WHY IS IT A CAPABILITY?

WHY IS IT NOT A SKILL?

WHY IS IT NOT A TOOL?

WHY IS IT NOT A ROLE?

WHAT INPUT?

WHAT OUTPUT?

WHAT DEPENDENCIES?

WHAT SKILLS?

WHAT TOOLS?

WHAT MODEL REQUIREMENTS?

WHAT MEMORY?

WHAT CONTEXT?

WHAT SIDE EFFECT?

WHAT RISK?

WHAT PERMISSION?

WHAT PROJECT SCOPE?

WHAT CUSTOMER SCOPE?

WHAT TENANT SCOPE?

WHAT EVALUATION?

WHAT FAILURE MODE?

WHAT RETRY BEHAVIOR?

WHAT EVIDENCE?

WHO OWNS IT?
```

---

# 258. Capability Assignment Decision Framework

Before assigning a Capability to an Agent ask:

```text
DOES THE ROLE REQUIRE IT?

IS THE AGENT TYPE COMPATIBLE?

IS THE AGENT VERSION EVALUATED FOR IT?

ARE REQUIRED SKILLS PRESENT?

ARE REQUIRED TOOLS AVAILABLE?

IS THE RISK ACCEPTABLE?

IS THE PROJECT ALLOWED?

IS THE CUSTOMER ALLOWED?

IS THE TENANT ALLOWED?

WHAT PERMISSIONS WILL STILL BE REQUIRED?

WHAT MONITORING IS REQUIRED?
```

---

# 259. Capability Execution Decision Framework

Before executing a Capability ask:

```text
IS CAPABILITY ACTIVE?

IS VERSION ALLOWED?

IS AGENT ASSIGNED?

IS AGENT ACTIVE?

IS ALLOCATION ACTIVE?

IS PROJECT VALID?

IS CUSTOMER VALID?

IS TENANT VALID?

IS TOOL AVAILABLE?

IS TOOL AUTHORIZED?

IS MODEL ALLOWED?

IS MEMORY ACCESS ALLOWED?

IS BUDGET AVAILABLE?

IS APPROVAL REQUIRED?

IS APPROVAL CURRENT?

IS KILL SWITCH CLEAR?

WHAT EVIDENCE IS EXPECTED?
```

---

# 260. Capability Risk Decision Framework

Before classifying risk ask:

```text
READ OR WRITE?

INTERNAL OR EXTERNAL?

PRODUCTION OR NON-PRODUCTION?

REVERSIBLE?

DESTRUCTIVE?

CUSTOMER IMPACT?

FINANCIAL IMPACT?

SECURITY IMPACT?

LEGAL IMPACT?

PERSONAL DATA?

AUTONOMOUS SIDE EFFECT?

WHAT HAPPENS IF WRONG?
```

---

# 261. Capability Version Decision Framework

Before a Capability Version change ask:

```text
WHAT CHANGED?

INPUT CONTRACT?

OUTPUT CONTRACT?

TOOLS?

SKILLS?

MODEL REQUIREMENTS?

SECURITY?

RISK?

FAILURE BEHAVIOR?

IS IT BREAKING?

WHICH AGENTS USE IT?

WHICH PROJECTS?

WHICH CUSTOMERS?

WHAT REGRESSION TESTS?

WHAT MIGRATION?
```

---

# 262. Integration with Agent Framework Architecture

`agent-framework-architecture.md` defines the high-level Agent structure.

This document defines the Capability layer used inside that structure.

---

# 263. Integration with Detailed Capability Framework

`capabilities/capability-framework.md` will define detailed Capability
semantics, object model, composition mechanics, and lifecycle controls.

---

# 264. Integration with Capability Mapping

`capabilities/capability-mapping.md` will define detailed mappings across:

```text
AGENT TYPES

ROLES

SKILLS

TOOLS

MODELS

TASKS

PROJECTS
```

---

# 265. Integration with Capability Registry

`capabilities/capability-registry.md` will define the detailed Capability
Registry model.

---

# 266. Root vs Specialized Capability Boundary

```text
agent-framework-capabilities.md
=
FRAMEWORK-WIDE CAPABILITY STANDARD

capabilities/
=
DETAILED CAPABILITY IMPLEMENTATION AND GOVERNANCE MODEL
```

---

# 267. Integration with Skills

`skills/` defines reusable competence modules supporting Capabilities.

---

# 268. Integration with Tools

`tools/` defines the runtime execution interfaces used by Capabilities.

---

# 269. Integration with Evaluation

`evaluation/` proves whether Capabilities and Agents meet quality
requirements.

---

# 270. Integration with Security

`agent-framework-security.md` and `security/` define current authority and
security controls.

---

# 271. Integration with AI Workforce

AI Workforce Roles may declare required Capability profiles.

---

# 272. Integration with Task Routing

Task routing may use Capability requirements to identify eligible Agents.

---

# 273. Integration with Multi-Agent System

Multi-Agent orchestration may use Capability metadata for:

```text
TEAM FORMATION

DELEGATION

TASK ROUTING

SPECIALIST SELECTION
```

but global coordination remains owned by `23-multi-agent-system`.

---

# 274. Integration with Model Management

Model Management supplies governed Model capabilities required by Agent
Capabilities.

---

# 275. Integration with Memory Engine

Memory Engine supplies governed Memory access required by relevant
Capabilities.

---

# 276. Integration with Automation Engine

Automation workflows may require specific Agent Capabilities.

---

# 277. Current Capability Baseline

At the current documentation stage:

```text
AGENT_CAPABILITY_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_IDENTITY_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_TAXONOMY
=
DEFINED_TARGET_STATE

CAPABILITY_VERSION_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_LIFECYCLE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_RISK_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_COMPOSITION_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_DEPENDENCY_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_ASSIGNMENT_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_MAPPING_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_REGISTRY_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_PERMISSION_SEPARATION
=
DEFINED_TARGET_STATE

CAPABILITY_SCOPE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_EVALUATION_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_MONITORING_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_EVIDENCE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_PRODUCTION_GATE
=
DEFINED_TARGET_STATE
```

---

# 278. Runtime Truth

At the current documentation stage:

```text
CAPABILITY_REGISTRY_RUNTIME
=
NOT_PROVEN

CAPABILITY_ASSIGNMENT_RUNTIME
=
NOT_PROVEN

CAPABILITY_MAPPING_RUNTIME
=
NOT_PROVEN

CAPABILITY_COMPOSITION_RUNTIME
=
NOT_PROVEN

CAPABILITY_DEPENDENCY_RUNTIME
=
NOT_PROVEN

CAPABILITY_PERMISSION_ENFORCEMENT
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

CAPABILITY_TOOL_INTEGRATION
=
NOT_PROVEN

CAPABILITY_MODEL_INTEGRATION
=
NOT_PROVEN

CAPABILITY_MEMORY_INTEGRATION
=
NOT_PROVEN

CAPABILITY_EVALUATION_RUNTIME
=
NOT_PROVEN

CAPABILITY_MONITORING_RUNTIME
=
NOT_PROVEN

CAPABILITY_EVIDENCE_RUNTIME
=
NOT_PROVEN

CAPABILITY_SCALABILITY
=
NOT_PROVEN
```

---

# 279. Approval Status

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

QUALITY_GOVERNANCE_APPROVAL
=
PENDING
```

---

# 280. Canonical Status

```text
CANONICAL
=
FALSE
```

---

# 281. Production Status

```text
AGENT_CAPABILITY_STANDARD
=
DOCUMENTED_TARGET_STATE

AGENT_CAPABILITY_PRODUCTION_GATE
=
NOT_PASSED

PRODUCTION_AGENT_CAPABILITIES
=
NOT_AUTHORIZED_BY_THIS DOCUMENT

PRODUCTION_OPERATIONAL
=
NOT_PROVEN
```

---

# 282. Preserved Truth

```text
CAPABILITY
≠
AUTHORITY

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
PERMISSION

CAPABILITY
≠
AUTONOMY

CAPABILITY ASSIGNED
≠
CAPABILITY ELIGIBLE NOW

TOOL REQUIRED
≠
TOOL AUTHORIZED

MODEL SUPPORTS
≠
AGENT AUTHORIZED

MEMORY REQUIRED
≠
ALL MEMORY ACCESS

REGISTERED
≠
PRODUCTION READY

EVALUATED
≠
AUTHORIZED FOR EVERY CONTEXT

REUSABLE
≠
GLOBAL SCOPE

SAME CAPABILITY
≠
SAME CUSTOMER DATA

SAME CAPABILITY
≠
SAME TENANT AUTHORITY

CAPABILITY DOCUMENTED
≠
CAPABILITY IMPLEMENTED
```

---

# 283. Capability Completion Checklist

Before this document is considered content-complete for review:

- [ ] Capability definition is explicit;
- [ ] Capability non-goals are defined;
- [ ] Capability/Authority separation is explicit;
- [ ] Capability/Role boundary is defined;
- [ ] Capability/Skill boundary is defined;
- [ ] Capability/Tool boundary is defined;
- [ ] Capability/Model boundary is defined;
- [ ] Capability/Permission boundary is defined;
- [ ] Capability/Autonomy boundary is defined;
- [ ] stable Capability identity is defined;
- [ ] conceptual Capability record is defined;
- [ ] Versioning is defined;
- [ ] lifecycle is defined;
- [ ] Capability taxonomy is defined;
- [ ] side-effect classification is defined;
- [ ] risk classification is defined;
- [ ] risk-context relationship is defined;
- [ ] Capability composition is defined;
- [ ] atomic Capability principle is defined;
- [ ] composite Capability model is defined;
- [ ] dependency model is defined;
- [ ] hard and optional dependencies are defined;
- [ ] Capability assignment is defined;
- [ ] definition-level assignment is defined;
- [ ] allocation restrictions are defined;
- [ ] effective Capability resolution is defined;
- [ ] Capability mapping is defined;
- [ ] Agent-Type mapping is defined;
- [ ] Role mapping is defined;
- [ ] Skill mapping is defined;
- [ ] Tool mapping is defined;
- [ ] Model mapping is defined;
- [ ] Memory mapping is defined;
- [ ] Task mapping is defined;
- [ ] Capability discovery is defined;
- [ ] Capability Registry is defined;
- [ ] Registry boundary is defined;
- [ ] permission model is defined;
- [ ] Project scope is defined;
- [ ] Customer scope is defined;
- [ ] Tenant scope is defined;
- [ ] environment scope is defined;
- [ ] User scope is recognized;
- [ ] Capability availability states are defined;
- [ ] Capability suspension is defined;
- [ ] kill-switch direction is defined;
- [ ] evaluation model is defined;
- [ ] benchmark direction is defined;
- [ ] regression testing is defined;
- [ ] Security evaluation is defined;
- [ ] Evidence model is defined;
- [ ] quality variability is defined;
- [ ] monitoring is defined;
- [ ] Capability health is defined;
- [ ] cost attribution is defined;
- [ ] budgets are bounded;
- [ ] Model dependencies are defined;
- [ ] Tool dependencies are defined;
- [ ] Skill dependencies are defined;
- [ ] Memory dependencies are defined;
- [ ] Context dependencies are defined;
- [ ] failure model is defined;
- [ ] result model is defined;
- [ ] retry strategy is defined;
- [ ] destructive retry boundary is defined;
- [ ] idempotency is defined;
- [ ] reversibility is defined;
- [ ] approval relationship is defined;
- [ ] progressive Capability enablement is defined;
- [ ] Multi-Project behavior is defined;
- [ ] Multi-Customer behavior is defined;
- [ ] Multi-Tenant behavior is defined;
- [ ] Customer overlay boundary is defined;
- [ ] Industry extension is defined;
- [ ] Capability reuse is defined;
- [ ] proliferation controls are defined;
- [ ] new-Capability decision rule is defined;
- [ ] overlap and merge rules are defined;
- [ ] deprecation is defined;
- [ ] retirement is defined;
- [ ] migration is defined;
- [ ] compatibility model is defined;
- [ ] parameterization is bounded;
- [ ] input contracts are defined;
- [ ] output contracts are defined;
- [ ] security layers are defined;
- [ ] Capability spoofing is defined;
- [ ] self-assignment prohibition is defined;
- [ ] Prompt-induced elevation is prohibited;
- [ ] Registry integrity is defined;
- [ ] audit events are defined;
- [ ] metrics are defined;
- [ ] fallback behavior is defined;
- [ ] scalability is defined;
- [ ] noisy-neighbor concern is defined;
- [ ] quotas are recognized;
- [ ] rate limiting is recognized;
- [ ] concurrency risks are defined;
- [ ] idempotency metadata direction is defined;
- [ ] observability correlation is defined;
- [ ] ownership is defined;
- [ ] Agent-Type Capability profiles are introduced;
- [ ] Role profiles are introduced;
- [ ] prohibited Capabilities are defined;
- [ ] policy relationship is defined;
- [ ] toxic Capability combinations are defined;
- [ ] separation of duties is defined;
- [ ] admission is defined;
- [ ] Production gate is defined;
- [ ] Production Hard Stops are defined;
- [ ] decision frameworks are defined;
- [ ] specialized Capability documents are mapped;
- [ ] runtime truth consistently uses `NOT_PROVEN`;
- [ ] no implementation claim is invented;
- [ ] no Production claim is invented;
- [ ] next document is identified.

---

# 284. Revision History

| Version | Date | Status | Author | Change |
|---|---|---|---|---|
| 0.1.0 | 2026-08-08 | Draft | Mianx.ai | Initial Agent Framework Capability model |
| 1.0.0 | 2026-08-08 | Draft | Mianx.ai | Established the enterprise capability standard covering Capability identity, taxonomy, Versioning, lifecycle, risk, composition, dependencies, mapping, Registry, assignment, Skills, Tools, Models, Memory, permissions, Project/Customer/Tenant scope, evaluation, Evidence, Monitoring, failure behavior, security, migration, scalability, separation of duties, controlled tests, and Production readiness |

---

# 285. Changelog Entry

Add the following entry to:

```text
doc/22-agent-framework/CHANGELOG.md
```

during module Changelog synchronization:

```markdown
## AGENT-FRAMEWORK-CHG-20260808-006 — Enterprise Agent Capability Standard Established

| Field | Value |
|---|---|
| Date | 2026-08-08 |
| Change Type | `CREATED`, `AGENT-FRAMEWORK`, `CAPABILITIES`, `CAPABILITY-REGISTRY`, `CAPABILITY-MAPPING`, `SECURITY`, `EVALUATION`, `PRODUCTION-READINESS` |
| Impact | `I5 — Foundational / Enterprise-Wide` |
| Risk | `R4 — Critical` |
| Status | `Completed for Review` |
| Owner | Mianx.ai Founder |
| Approver | Pending Founder and Enterprise Governance Review |

### Affected Document

`doc/22-agent-framework/agent-framework-capabilities.md`

### New State

The Agent Framework now defines the framework-wide enterprise Capability
model covering:

- Capability identity;
- Capability Versioning;
- Capability lifecycle;
- Capability taxonomy;
- functional categories;
- side-effect classes;
- risk classification;
- Capability composition;
- atomic Capabilities;
- composite Capabilities;
- dependencies;
- assignment;
- effective Capability resolution;
- Agent-Type mapping;
- Role mapping;
- Skill mapping;
- Tool mapping;
- Model mapping;
- Memory mapping;
- Task mapping;
- Capability discovery;
- Capability Registry;
- Capability/Permission separation;
- Project scope;
- Customer scope;
- Tenant scope;
- environment scope;
- Capability availability;
- Capability suspension;
- evaluation;
- benchmarking;
- regression testing;
- Security testing;
- Evidence;
- Capability quality;
- Monitoring;
- cost;
- budgets;
- Model dependencies;
- Tool dependencies;
- Skill dependencies;
- Memory dependencies;
- Context dependencies;
- failure handling;
- retries;
- idempotency;
- reversibility;
- approvals;
- progressive enablement;
- Multi-Project reuse;
- Multi-Customer reuse;
- Multi-Tenant reuse;
- Customer overlays;
- industry extensions;
- Capability proliferation controls;
- deprecation;
- retirement;
- migration;
- compatibility;
- input/output contracts;
- security;
- audit;
- scalability;
- quotas;
- concurrency;
- ownership;
- Capability profiles;
- prohibited Capability combinations;
- separation of duties;
- Production gates;
- Production Hard Stops.

### Documentation Truth

```text
AGENT_FRAMEWORK_CAPABILITIES
=
CONTENT_COMPLETE_FOR_REVIEW

CAPABILITY_RUNTIME
=
NOT_PROVEN

CAPABILITY_PERMISSION_ENFORCEMENT
=
NOT_PROVEN

PRODUCTION_AGENT_CAPABILITIES
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

CANONICAL
=
FALSE
```
```

---

# 286. Documentation Progress

After saving this document:

```text
MODULE
=
22-agent-framework

PLANNED_DOCUMENTS
=
78

PREVIOUS_CONTENT_COMPLETE_FOR_REVIEW
=
5

CAPABILITIES_DOCUMENT_ADDED
=
1

CONTENT_COMPLETE_FOR_REVIEW
=
6

SEQUENCE_REMAINING
=
72
```

This tracks documentation content only.

---

# 287. Current Root Sequence

```text
README.md
=
CONTENT_COMPLETE_FOR_REVIEW

INDEX.md
=
CONTENT_COMPLETE_FOR_REVIEW

agent-framework-vision.md
=
CONTENT_COMPLETE_FOR_REVIEW

agent-framework-strategy.md
=
CONTENT_COMPLETE_FOR_REVIEW

agent-framework-architecture.md
=
CONTENT_COMPLETE_FOR_REVIEW

agent-framework-capabilities.md
=
CONTENT_COMPLETE_FOR_REVIEW

agent-framework-lifecycle.md
=
NEXT

agent-framework-governance.md
=
PENDING

agent-framework-security.md
=
PENDING

agent-framework-metrics.md
=
PENDING

agent-framework-checklists.md
=
PENDING

ROADMAP.md
=
PENDING
```

---

# 288. Next Document

The next document in the locked sequence is:

```text
doc/22-agent-framework/agent-framework-lifecycle.md
```

Document ID:

```text
AGENT-FRAMEWORK-LIFECYCLE-001
```

Purpose:

> **Define the framework-wide lifecycle for Agent Definitions, Agent
> Versions, Agent Allocations, Agent activation, suspension, restriction,
> upgrade, rollback, reactivation, deallocation, retirement, and
> historical Evidence preservation—while keeping documentation state,
> runtime state, approval state, and Production authorization clearly
> separate.**

---

# Final Capability Rule

```text
CAPABILITY
TELLS US
WHAT AN AGENT CAN DO.

AUTHORIZATION
TELLS US
WHAT THAT AGENT MAY DO NOW.
```

The permanent runtime relationship is:

```text
AGENT IDENTITY
↓
AGENT VERSION
↓
ASSIGNED CAPABILITY
↓
AVAILABLE DEPENDENCIES
↓
CURRENT PROJECT
↓
CURRENT CUSTOMER
↓
CURRENT TENANT
↓
CURRENT PERMISSION
↓
CURRENT POLICY
↓
CURRENT APPROVAL
↓
ELIGIBLE CAPABILITY EXECUTION
↓
VALIDATED RESULT
↓
EVIDENCE
```

Never:

```text
CAPABILITY PRESENT
=
ACTION AUTHORIZED
```

The enterprise equation remains:

```text
CAPABILITY
+
PERMISSION
+
SCOPE
+
POLICY
+
APPROVAL WHERE REQUIRED
+
EVIDENCE
=
GOVERNED ENTERPRISE EXECUTION
```

---