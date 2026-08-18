---
id: AGENT-CAPABILITY-MAPPING-001
title: Mianx.ai Agent Capability Mapping
version: 1.0.0
status: Draft

description: Detailed enterprise mapping standard for connecting governed Mianx.ai Agent Capabilities to Agent Definitions, Agent Versions, Agent Types, AI Workforce Roles, Departments, Personas, Skills, Tools, Models, Prompts, Context, Memory, Tasks, Workflows, Projects, Customers, Tenants, environments, risk classes, approval requirements, autonomy levels, evaluation profiles, routing eligibility, Industry Operating Systems, and other enterprise structures without converting mapping relationships into implicit permissions, authority, activation, or Production authorization.

type: Enterprise Agent Capability Mapping Standard, Capability-to-Agent Mapping, Capability-to-Agent-Version Mapping, Capability-to-Agent-Type Mapping, Capability-to-Role Mapping, Capability-to-Department Mapping, Capability-to-Skill Mapping, Capability-to-Tool Mapping, Capability-to-Model Mapping, Capability-to-Prompt Mapping, Capability-to-Context Mapping, Capability-to-Memory Mapping, Capability-to-Task Mapping, Capability-to-Workflow Mapping, Capability-to-Project Mapping, Capability-to-Customer Mapping, Capability-to-Tenant Mapping, Capability-to-Environment Mapping, Capability-to-Risk Mapping, Capability-to-Approval Mapping, Capability-to-Autonomy Mapping, Capability-to-Evaluation Mapping, Capability-to-Routing Mapping, Industry Capability Mapping, Multi-Project Capability Mapping, Multi-Customer Capability Mapping, Multi-Tenant Capability Mapping, and Production Capability Mapping Standard

class: Governed Enterprise Capability Relationship and Assignment Architecture for Individual Mianx.ai Agents operating across MianX Core Platform, AI Operating System, Shared AI Workforce, Project Factory, Industry Operating Systems, Multi-Project Operations, Multi-Customer Operations, Multi-Tenant Operations, Human-AI Collaboration, Automation workflows, and future Multi-Agent Systems

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
  - Prompt Governance
  - Memory Governance
  - Data Governance
  - Quality Governance
  - Risk Governance
  - Evaluation Governance
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
  - Prompt Platform Engineering
  - Memory Platform Engineering
  - Data Platform Engineering
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
  - Prompt Governance
  - Memory Governance
  - Data Governance
  - Quality Governance
  - Risk Governance
  - Evaluation Governance
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
  - Prompt Engineers
  - Memory Engineers
  - Data Engineers
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
  - ./capability-framework.md
  - ../../01-governance/AI-CONSTITUTION.md
  - ../../19-ai-workforce/README.md
  - ../../19-ai-workforce/AGENT-CAPACITY-BASELINE.md
  - ../../19-ai-workforce/C-SUITE-AGENT-REGISTRY.md
  - ../../19-ai-workforce/VERIFIABLE-WORK-ENVELOPE.md
  - ../../20-ai-operating-system/README.md
  - ../../21-memory-engine/README.md

related_documents:
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
  - ../planning/task-planning.md
  - ../planning/goal-planning.md
  - ../planning/execution-planning.md
  - ../execution/task-execution.md
  - ../execution/execution-engine.md
  - ../evaluation/benchmarking.md
  - ../evaluation/performance-evaluation.md
  - ../evaluation/quality-scoring.md
  - ../security/access-control.md
  - ../security/agent-security.md
  - ../security/identity-management.md
  - ../types/executive-agents.md
  - ../types/manager-agents.md
  - ../types/specialist-agents.md
  - ../types/system-agents.md
  - ../types/worker-agents.md
  - ../personas/persona-framework.md
  - ../monitoring/audit-logs.md
  - ../monitoring/performance-monitoring.md

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
  - At Every Material Capability Mapping Change
  - At Every Agent Type Mapping Change
  - At Every AI Workforce Role Mapping Change
  - At Every Skill or Tool Mapping Change
  - At Every Model or Prompt Mapping Change
  - At Every Project, Customer, or Tenant Mapping Change
  - At Every Risk or Approval Mapping Change
  - At Every Autonomy Mapping Change
  - At Every Routing Eligibility Mapping Change
  - Before High-Risk Capability Assignment
  - Before Production Capability Authorization
  - Before Canonical Promotion
  - Quarterly During Active Build
  - Annually During Stable Operation

canonical: false

tags:
  - agent-framework
  - capabilities
  - capability-mapping
  - capability-assignment
  - agent-types
  - ai-workforce
  - roles
  - skills
  - tools
  - models
  - prompts
  - context
  - memory
  - tasks
  - projects
  - customers
  - tenants
  - routing
  - risk
  - autonomy
  - evaluation
  - enterprise-ai
---

# Mianx.ai Agent Capability Mapping

> **This document defines how governed Capabilities are mapped across the
> Mianx.ai Agent ecosystem.**
>
> Capability Mapping exists so the platform can answer questions such as:
>
> ```text
> WHICH AGENTS HAVE THIS CAPABILITY?
>
> WHICH AGENT TYPES REQUIRE IT?
>
> WHICH AI WORKFORCE ROLES EXPECT IT?
>
> WHICH SKILLS SUPPORT IT?
>
> WHICH TOOLS MAY BE REQUIRED?
>
> WHICH MODELS CAN SUPPORT IT?
>
> WHICH TASK TYPES REQUIRE IT?
>
> WHICH PROJECTS ENABLE IT?
>
> WHICH CUSTOMERS RESTRICT IT?
>
> WHICH TENANTS MAY USE IT?
>
> WHICH ENVIRONMENTS ALLOW IT?
>
> WHAT RISK CLASS APPLIES?
>
> WHAT APPROVAL IS REQUIRED?
>
> WHAT AUTONOMY LEVEL IS ALLOWED?
>
> HOW HAS IT BEEN EVALUATED?
> ```
>
> **Mapping describes relationships.**
>
> It does not create Security authority.
>
> ```text
> MAPPED
> ≠
> ASSIGNED
>
> ASSIGNED
> ≠
> ELIGIBLE
>
> ELIGIBLE
> ≠
> AUTHORIZED
>
> AUTHORIZED
> ≠
> PRODUCTION AUTHORIZED
> ```
>
> **This separation is mandatory across every mapping dimension.**
>
> Runtime implementation of Capability Mapping remains `NOT_PROVEN`
> unless supported by implementation and Evidence.

---

# 1. Purpose

This document defines:

```text
WHAT CAPABILITY MAPPING MEANS

WHAT CAPABILITY MAPPING DOES NOT MEAN

WHAT OBJECTS MAY BE MAPPED

HOW AGENTS MAP TO CAPABILITIES

HOW AGENT VERSIONS MAP TO CAPABILITIES

HOW AGENT TYPES MAP TO CAPABILITIES

HOW WORKFORCE ROLES MAP TO CAPABILITIES

HOW DEPARTMENTS MAP TO CAPABILITIES

HOW PERSONAS RELATE TO CAPABILITIES

HOW SKILLS MAP TO CAPABILITIES

HOW TOOLS MAP TO CAPABILITIES

HOW MODELS MAP TO CAPABILITIES

HOW PROMPTS RELATE TO CAPABILITIES

HOW CONTEXT MAPS TO CAPABILITIES

HOW MEMORY MAPS TO CAPABILITIES

HOW TASKS MAP TO CAPABILITIES

HOW WORKFLOWS MAP TO CAPABILITIES

HOW PROJECTS MAP TO CAPABILITIES

HOW CUSTOMERS MAP TO CAPABILITIES

HOW TENANTS MAP TO CAPABILITIES

HOW ENVIRONMENTS MAP TO CAPABILITIES

HOW RISK MAPS TO CAPABILITIES

HOW APPROVAL MAPS TO CAPABILITIES

HOW AUTONOMY MAPS TO CAPABILITIES

HOW EVALUATION MAPS TO CAPABILITIES

HOW ROUTING USES CAPABILITY MAPPINGS

HOW INDUSTRY OPERATING SYSTEMS EXTEND MAPPINGS

HOW MAPPING CONFLICTS ARE RESOLVED

HOW MAPPINGS ARE VERSIONED

HOW MAPPINGS ARE AUDITED

HOW PRODUCTION MAPPINGS ARE GOVERNED
```

---

# 2. Mapping Mission

The mission is:

> **Create a reusable, deterministic, traceable relationship layer
> connecting enterprise work requirements to governed Agent abilities
> without embedding permissions, credentials, or uncontrolled authority
> into those relationships.**

---

# 3. Core Mapping Principle

```text
MAPPING
=
RELATIONSHIP METADATA
```

not:

```text
MAPPING
=
AUTHORITY
```

---

# 4. Mapping Architecture

Conceptually:

```text
                         CAPABILITY
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
       AGENTS              ROLES              TASKS
          │                  │                  │
          ▼                  ▼                  ▼
       SKILLS              TYPES            WORKFLOWS
          │                  │                  │
          ▼                  ▼                  ▼
       TOOLS            DEPARTMENTS        PROJECTS
          │                                     │
          ▼                                     ▼
       MODELS                              CUSTOMERS
          │                                     │
          ▼                                     ▼
      CONTEXT                                TENANTS
          │                                     │
          ▼                                     ▼
       MEMORY                              ENVIRONMENTS
                                                │
                                                ▼
                                      RISK / APPROVAL /
                                      AUTONOMY / EVALUATION
```

---

# 5. Mapping Dimensions

The baseline mapping dimensions are:

```text
CAPABILITY ↔ AGENT DEFINITION

CAPABILITY ↔ AGENT VERSION

CAPABILITY ↔ AGENT TYPE

CAPABILITY ↔ WORKFORCE ROLE

CAPABILITY ↔ DEPARTMENT

CAPABILITY ↔ PERSONA

CAPABILITY ↔ SKILL

CAPABILITY ↔ TOOL

CAPABILITY ↔ MODEL REQUIREMENT

CAPABILITY ↔ PROMPT PROFILE

CAPABILITY ↔ CONTEXT REQUIREMENT

CAPABILITY ↔ MEMORY REQUIREMENT

CAPABILITY ↔ TASK TYPE

CAPABILITY ↔ WORKFLOW

CAPABILITY ↔ PROJECT

CAPABILITY ↔ CUSTOMER

CAPABILITY ↔ TENANT

CAPABILITY ↔ ENVIRONMENT

CAPABILITY ↔ RISK

CAPABILITY ↔ APPROVAL

CAPABILITY ↔ AUTONOMY

CAPABILITY ↔ EVALUATION

CAPABILITY ↔ ROUTING
```

---

# 6. Relationship Types

Mappings may represent different semantics.

Potential:

```text
REQUIRED

OPTIONAL

SUPPORTED

PREFERRED

ALLOWED

RESTRICTED

DENIED

INHERITED

OVERRIDDEN

DEPRECATED
```

---

# 7. Mapping Semantics Rule

A mapping must identify what kind of relationship it represents.

Avoid ambiguous records such as:

```text
Agent X ↔ Capability Y
```

without indicating whether Y is:

```text
REQUIRED

ASSIGNED

OPTIONAL

DENIED

OR
INFORMATIONAL
```

---

# 8. Mapping Identity

Material mapping records may require stable identities.

Potential:

```text
mapping_id
```

---

# 9. Mapping Definition

Conceptually:

```yaml
capability_mapping:
  mapping_id: required

  capability_id: required
  capability_version: conditional

  subject_type: required
  subject_id: required
  subject_version: conditional

  relationship: required

  scope:
    project_id: conditional
    customer_id: conditional
    tenant_id: conditional
    environment: conditional

  source: required
  priority: conditional

  conditions: conditional

  effective_from: conditional
  effective_until: conditional

  lifecycle_state: required

  metadata: conditional
```

Conceptual only.

---

# 10. Mapping Versioning

Material mapping changes should remain traceable.

---

# 11. Mapping Version Boundary

A mapping may change without changing the underlying Capability
Definition.

Example:

```text
Capability:
code.review
```

remains unchanged while a Role mapping changes.

---

# 12. Mapping Source

Every governed mapping should identify its source.

Potential:

```text
AGENT DEFINITION

AGENT VERSION

AGENT TYPE

AI WORKFORCE ROLE

PROJECT CONFIGURATION

CUSTOMER POLICY

TENANT POLICY

ENTERPRISE GOVERNANCE

SECURITY POLICY

INDUSTRY OS
```

---

# 13. Mapping Source-of-Truth Rule

```text
AGENT GENERATED TEXT
≠
MAPPING SOURCE OF TRUTH
```

---

# 14. Agent Definition Mapping

An Agent Definition may declare baseline Capability relationships.

Example:

```text
Backend Engineering Agent
→
code.analyze
→
code.generate
→
code.review
```

---

# 15. Agent Definition Mapping Boundary

Baseline mapping does not create resource access.

---

# 16. Agent Version Mapping

Agent Versions should preserve exact Capability configuration used for
evaluation and execution.

---

# 17. Version-Specific Mapping

Example:

```text
Agent X V1
→
code.review v1

Agent X V2
→
code.review v2
+
security.scan v1
```

---

# 18. Version Mapping Rule

Historical Runs should remain attributable to historical Agent/Capability
mapping where required.

---

# 19. Silent Mapping Mutation Anti-Pattern

Do not silently replace:

```text
Agent V1 → Capability V1
```

with:

```text
Agent V1 → Capability V2
```

after V1 has already executed attributable work.

---

# 20. Agent Type Mapping

Agent Types may define baseline expected Capability classes.

---

# 21. Worker Agent Mapping

A Worker Agent may emphasize:

```text
TASK EXECUTION

BOUNDED TOOL USE

OUTPUT GENERATION

RESULT REPORTING
```

---

# 22. Specialist Agent Mapping

A Specialist Agent may emphasize:

```text
DOMAIN ANALYSIS

DOMAIN REASONING

DOMAIN EXECUTION

DOMAIN VALIDATION
```

---

# 23. Manager Agent Mapping

A Manager Agent may emphasize:

```text
PLANNING

DELEGATION

REVIEW

PRIORITIZATION

ESCALATION
```

without automatically receiving worker-level protected Tool authority.

---

# 24. Executive Agent Mapping

Executive Agents may map to:

```text
STRATEGIC ANALYSIS

DECISION SUPPORT

PORTFOLIO REVIEW

RISK REVIEW
```

without assuming unrestricted executive authority.

---

# 25. System Agent Mapping

System Agents may map to platform/internal capabilities according to
their specific control role.

---

# 26. Agent Type Mapping Boundary

```text
TYPE CAPABILITY BASELINE
≠
LIVE CAPABILITY ASSIGNMENT
```

---

# 27. AI Workforce Role Mapping

Organizational Roles may define required and optional Capabilities.

---

# 28. Role Mapping Example

Conceptually:

```yaml
role: backend-engineer

required_capabilities:
  - code.read
  - code.analyze
  - code.generate
  - code.test

optional_capabilities:
  - deployment.prepare
```

---

# 29. Role Capability Rule

```text
ROLE EXPECTS CAPABILITY
≠
ROLE GRANTS CAPABILITY
```

---

# 30. Role Permission Rule

```text
ROLE MAPPED TO CAPABILITY
≠
RESOURCE PERMISSION
```

---

# 31. Department Mapping

Departments may define Capability families expected across their
workforce.

---

# 32. Engineering Department Example

Potential:

```text
CODE

ARCHITECTURE

TESTING

DEPLOYMENT

RELIABILITY
```

---

# 33. Security Department Example

Potential:

```text
SECURITY ANALYSIS

SECURITY REVIEW

THREAT MODELING

INCIDENT ANALYSIS
```

---

# 34. Department Boundary

Department membership does not imply every departmental Capability.

---

# 35. Persona Relationship

Persona generally should not own Capability assignment.

---

# 36. Persona Mapping

Persona may affect how a Capability is presented or executed
communicatively.

Example:

```text
Capability:
customer.response.compose

Persona:
concise-support
```

---

# 37. Persona Mapping Boundary

```text
PERSONA CHANGE
≠
CAPABILITY CHANGE
```

---

# 38. Skill Mapping

Capabilities may map to required or optional Skills.

---

# 39. Skill Mapping Example

```text
Capability:
code.review

Required Skills:
- secure-code-review

Optional Skills:
- typescript-review
- database-review
```

---

# 40. Skill Mapping Types

Potential:

```text
REQUIRED

OPTIONAL

PREFERRED

ALTERNATIVE
```

---

# 41. Skill Mapping Boundary

```text
SKILL MAPPED
≠
SKILL CURRENTLY AVAILABLE
```

---

# 42. Skill Availability

Runtime eligibility may need to verify:

```text
SKILL EXISTS

SKILL VERSION ELIGIBLE

SKILL DEPENDENCIES AVAILABLE
```

---

# 43. Tool Mapping

Capabilities may map to Tool operations.

---

# 44. Tool Mapping Example

```text
Capability:
repository.inspect

Tool Requirements:
- repository.read
- repository.diff
```

---

# 45. Tool Requirement Types

Potential:

```text
REQUIRED

OPTIONAL

ALTERNATIVE

PROHIBITED
```

---

# 46. Tool Mapping Rule

```text
CAPABILITY → TOOL
```

means:

```text
CAPABILITY MAY REQUIRE TOOL
```

not:

```text
AGENT IS AUTHORIZED TO USE TOOL
```

---

# 47. Tool Permission Intersection

Actual Tool eligibility should consider:

```text
CAPABILITY TOOL REQUIREMENT
∩
AGENT TOOL PROFILE
∩
ALLOCATION TOOL POLICY
∩
CURRENT SECURITY
=
ELIGIBLE TOOL SET
```

---

# 48. Tool Operation Granularity

Map Capabilities to Tool operations where practical.

Prefer:

```text
repository.read
```

over:

```text
github
```

when Security semantics require finer granularity.

---

# 49. Tool Resource Boundary

Even operation mapping does not authorize every resource.

---

# 50. Model Mapping

Capabilities may map to Model requirements or eligible Model profiles.

---

# 51. Model Requirement Mapping

Example:

```text
Capability:
document.image.analyze

Model Requirement:
vision = required
```

---

# 52. Model Mapping Boundary

Avoid defining:

```text
Capability X
=
Provider Y forever
```

unless justified.

---

# 53. Model Portability

Prefer mapping to requirements such as:

```text
REASONING CLASS

VISION SUPPORT

TOOL CALLING

STRUCTURED OUTPUT

CONTEXT CAPACITY

DATA POLICY
```

---

# 54. Model Eligibility Intersection

Conceptually:

```text
CAPABILITY REQUIREMENTS
∩
AGENT MODEL PROFILE
∩
CUSTOMER POLICY
∩
TENANT POLICY
∩
DATA POLICY
∩
MODEL AVAILABILITY
=
ELIGIBLE MODEL SET
```

---

# 55. Model Ranking

Eligible Models may then be ranked by:

```text
QUALITY

COST

LATENCY

AVAILABILITY
```

---

# 56. Ranking Boundary

```text
BEST MODEL
≠
AUTHORIZED MODEL
```

Eligibility comes first.

---

# 57. Prompt Mapping

Capabilities may map to Prompt instructions or Prompt components.

---

# 58. Prompt Capability Guidance

Example:

```text
code.review
→
secure review instructions
→
output schema
→
evidence expectations
```

---

# 59. Prompt Mapping Boundary

```text
PROMPT SAYS CAPABILITY EXISTS
≠
CAPABILITY ASSIGNED
```

---

# 60. Prompt Version Attribution

Agent evaluation may need to preserve which Prompt Version supported a
Capability.

---

# 61. Context Mapping

Capabilities may declare Context requirements.

---

# 62. Context Mapping Example

```text
Capability:
architecture.review

Required Context:
- system architecture
- change set

Optional Context:
- historical architecture decisions
```

---

# 63. Context Mapping Types

Potential:

```text
REQUIRED

OPTIONAL

PROHIBITED

CONDITIONALLY_ALLOWED
```

---

# 64. Context Scope Boundary

Context mappings should not contain authority to read all Context.

---

# 65. Runtime Context Eligibility

Each Context source must still pass current scope and Data authorization.

---

# 66. Memory Mapping

Capabilities may declare Memory requirements.

---

# 67. Memory Mapping Example

```text
Capability:
project.continuity.analysis

Memory Requirements:
- project memory
- working memory
```

---

# 68. Memory Type Mapping

Potential:

```text
WORKING

SHORT_TERM

EPISODIC

SEMANTIC

AGENT

PROJECT

ORGANIZATION
```

according to Memory Engine definitions.

---

# 69. Memory Mapping Boundary

```text
MEMORY TYPE MAPPED
≠
MEMORY ITEM AUTHORIZED
```

---

# 70. Task Mapping

Task types should identify required Capabilities.

---

# 71. Task Mapping Example

```text
Task:
Review Pull Request

Required:
- code.read
- code.review

Conditional:
- security.scan
```

---

# 72. Task Capability Rule

```text
TASK REQUIRES CAPABILITY
≠
TASK GRANTS CAPABILITY
```

---

# 73. Task Routing

Task Capability requirements may be used to find candidate Agents.

---

# 74. Routing Candidate Equation

```text
TASK REQUIRED CAPABILITIES
⊆
AGENT ELIGIBLE CAPABILITIES
```

is one necessary routing condition.

---

# 75. Routing Security Boundary

Capability match alone is insufficient.

---

# 76. Workflow Mapping

Workflows may map steps to Capabilities.

---

# 77. Workflow Example

```text
FEATURE DELIVERY
│
├── requirements.analyze
├── architecture.design
├── code.generate
├── code.test
└── code.review
```

---

# 78. Workflow Mapping Boundary

Workflow Capability relationships do not mean one Agent must possess all
Capabilities.

---

# 79. Multi-Agent Workflow Mapping

Different Capability requirements may route to different Agents.

---

# 80. Planning Mapping

Planners may infer required Capabilities from Tasks.

---

# 81. Planning Boundary

Inferred mapping is a planning candidate.

It must not silently mutate authoritative Capability configuration.

---

# 82. Project Mapping

Projects may define enabled, required, restricted, or denied
Capabilities.

---

# 83. Project Mapping Example

```yaml
project_capabilities:
  enabled:
    - code.review

  restricted:
    - deployment.execute

  denied:
    - production.database.delete
```

Conceptual only.

---

# 84. Project Mapping Rule

Project settings may narrow execution eligibility.

---

# 85. Project Isolation

Project mapping must never let one Project modify another Project's
Capability policy without authorization.

---

# 86. Shared Agent Definition

One Agent Definition may map differently per Project allocation.

---

# 87. Example

```text
AGENT X

PROJECT A
→ code.read
→ code.generate

PROJECT B
→ code.read only
```

---

# 88. Mapping Scope Rule

```text
GLOBAL MAPPING
+
PROJECT RESTRICTION
=
PROJECT EFFECTIVE MAPPING
```

where governance defines precedence.

---

# 89. Customer Mapping

Customer policy may enable or restrict Capability use.

---

# 90. Customer Restriction Example

```text
Customer A:
external.email.send
=
DENIED

Customer B:
external.email.send
=
REQUIRES HUMAN APPROVAL
```

---

# 91. Customer Mapping Boundary

Customer policy may narrow platform Capability use.

It must not override mandatory core deny controls.

---

# 92. Multi-Customer Mapping Rule

```text
CUSTOMER A MAPPING
≠
CUSTOMER B MAPPING
```

---

# 93. Customer Mapping Leakage

Customer-specific mappings should not leak through shared caches,
routing, or Agent Context.

---

# 94. Tenant Mapping

Tenants may apply finer-grained Capability restrictions.

---

# 95. Tenant Mapping Example

```text
Tenant A
→ data.export = allowed with approval

Tenant B
→ data.export = denied
```

---

# 96. Tenant Rule

```text
SAME CUSTOMER
≠
SAME TENANT CAPABILITY POLICY
```

---

# 97. Tenant Mapping Source

Tenant-specific rules should derive from trusted configuration.

---

# 98. Tenant Mapping Boundary

Agent Prompt text must not override Tenant Capability restrictions.

---

# 99. Environment Mapping

Capability use may vary by environment.

---

# 100. Environment Example

```text
development:
deployment.execute = allowed for sandbox target

staging:
deployment.execute = controlled

production:
deployment.execute = approval-required or denied
```

Actual policy remains governance-specific.

---

# 101. Environment Rule

```text
ALLOWED IN DEV
≠
ALLOWED IN PROD
```

---

# 102. Risk Mapping

Capabilities should map to baseline and contextual risk classes.

---

# 103. Baseline Risk

Capability Definition may contain a default risk class.

---

# 104. Contextual Risk

Effective risk may change due to:

```text
ENVIRONMENT

DATA

TOOL

RESOURCE

CUSTOMER

TENANT

AUTONOMY

SIDE EFFECT

BLAST RADIUS
```

---

# 105. Risk Mapping Equation

Conceptually:

```text
BASE CAPABILITY RISK
+
EXECUTION CONTEXT
+
SIDE EFFECT
+
DATA SENSITIVITY
+
AUTONOMY
=
EFFECTIVE RISK
```

---

# 106. Risk Mapping Boundary

Risk calculation does not itself grant or deny.

It informs policy.

---

# 107. Approval Mapping

Capabilities may map to approval requirements.

---

# 108. Approval Mapping Dimensions

Potential:

```text
CAPABILITY

RISK

ENVIRONMENT

TOOL

RESOURCE

CUSTOMER

TENANT

AUTONOMY
```

---

# 109. Approval Example

```text
deployment.execute
+
production
=
REQUIRE APPROVAL
```

subject to approved policy.

---

# 110. Approval Mapping Boundary

```text
APPROVAL REQUIRED
≠
APPROVAL GRANTED
```

---

# 111. Approval Actor Mapping

Governance may map approval class to:

```text
MANAGER

SECURITY

OPERATIONS

FOUNDER

MULTI-PARTY REVIEW
```

---

# 112. Approval Authority Boundary

An Agent cannot generate its own valid approver mapping.

---

# 113. Autonomy Mapping

Capabilities should support bounded autonomy mappings.

---

# 114. Potential Autonomy Modes

Conceptually:

```text
OBSERVE_ONLY

RECOMMEND_ONLY

DRAFT_ONLY

EXECUTE_AFTER_APPROVAL

BOUNDED_AUTONOMOUS_EXECUTION
```

Exact canonical levels belong to autonomy governance.

---

# 115. Capability-Autonomy Example

```text
email.compose
→ DRAFT_ONLY

email.send
→ EXECUTE_AFTER_APPROVAL
```

---

# 116. Autonomy Mapping Rule

```text
CAPABILITY
≠
AUTONOMY
```

---

# 117. Autonomy Scope

Autonomy mapping may vary by:

```text
AGENT VERSION

PROJECT

CUSTOMER

TENANT

ENVIRONMENT
```

---

# 118. Evaluation Mapping

Capabilities should map to evaluation profiles.

---

# 119. Evaluation Profile Mapping

Potential:

```text
BENCHMARK SET

QUALITY CRITERIA

SECURITY TESTS

REGRESSION SUITE

HUMAN REVIEW

EVIDENCE REQUIREMENTS
```

---

# 120. Evaluation Mapping Boundary

```text
EVALUATION PROFILE MAPPED
≠
EVALUATION PASSED
```

---

# 121. Verification Mapping

Verified Capability status should link:

```text
AGENT VERSION

CAPABILITY VERSION

EVALUATION RESULT

ENVIRONMENT / SCOPE
```

---

# 122. Verification Scope Rule

```text
VERIFIED
IN ONE CONFIGURATION
≠
VERIFIED
IN EVERY CONFIGURATION
```

---

# 123. Routing Mapping

Routing systems may consume Capability mappings.

---

# 124. Routing Inputs

Potential:

```text
TASK CAPABILITY REQUIREMENTS

AGENT CAPABILITY MAPPINGS

CAPABILITY ELIGIBILITY

AGENT HEALTH

AGENT AVAILABILITY

QUALITY

COST

LATENCY

PROJECT SCOPE

CUSTOMER SCOPE

TENANT SCOPE
```

---

# 125. Routing Eligibility

Conceptually:

```text
CAPABILITY MATCH
+
CURRENT ALLOCATION
+
CURRENT LIFECYCLE
+
CURRENT SCOPE
+
CURRENT POLICY
=
ROUTING ELIGIBILITY
```

---

# 126. Routing Boundary

```text
ROUTER SELECTS AGENT
≠
ALL ACTIONS AUTHORIZED
```

---

# 127. Mapping Inheritance

Mappings may support inheritance.

---

# 128. Example Inheritance

```text
AGENT TYPE
↓
ROLE
↓
AGENT DEFINITION
↓
AGENT VERSION
↓
PROJECT
↓
CUSTOMER
↓
TENANT
```

However actual precedence must be carefully governed.

---

# 129. Inheritance Rule

Lower-level mappings may narrow effective access.

They must not silently widen mandatory higher-level restrictions.

---

# 130. Mapping Precedence

A conceptual precedence may be:

```text
MANDATORY ENTERPRISE POLICY
↓
SECURITY POLICY
↓
AGENT VERSION
↓
CUSTOMER RESTRICTIONS
↓
TENANT RESTRICTIONS
↓
PROJECT RESTRICTIONS
↓
ALLOCATION RESTRICTIONS
↓
CURRENT TASK CONDITIONS
```

Exact implementation requires architecture approval.

---

# 131. Deny-Overrides Direction

For Security-sensitive Capability mappings, a deny-overrides strategy
may be appropriate.

---

# 132. Deny Boundary

Do not claim a universal implementation until it exists and is approved.

---

# 133. Mapping Conflict

Conflicts can occur when different sources disagree.

Example:

```text
Agent Version
=
Capability allowed

Customer
=
Capability denied
```

---

# 134. Conflict Resolution

Conflict resolution must be deterministic.

---

# 135. Security-Safe Conflict Rule

Unknown critical conflict should not default to broad permission.

---

# 136. Mapping Conflict Types

Potential:

```text
ALLOW vs DENY

REQUIRED vs PROHIBITED

VERSION MISMATCH

TOOL MISMATCH

MODEL MISMATCH

AUTONOMY MISMATCH

APPROVAL MISMATCH

ENVIRONMENT MISMATCH
```

---

# 137. Mapping Resolution Result

Potential:

```text
EFFECTIVE

RESTRICTED

DENIED

AMBIGUOUS

INVALID
```

---

# 138. Ambiguous Mapping

Security-sensitive ambiguity should fail safe.

---

# 139. Effective Capability Mapping

Conceptually:

```text
BASE AGENT CAPABILITIES
∩
AGENT VERSION
∩
PROJECT POLICY
∩
CUSTOMER POLICY
∩
TENANT POLICY
∩
ENVIRONMENT POLICY
∩
CURRENT LIFECYCLE
=
EFFECTIVE CAPABILITY MAPPING
```

This is conceptual.

Actual execution still requires authorization.

---

# 140. Effective Mapping Boundary

```text
EFFECTIVE MAPPING
≠
CURRENT RESOURCE AUTHORIZATION
```

---

# 141. Required vs Optional Capability

A Task or Role may distinguish:

```text
REQUIRED

OPTIONAL
```

---

# 142. Required Mapping

Missing required Capability makes the Agent unsuitable for that
requirement.

---

# 143. Optional Mapping

Optional Capability may improve quality or coverage.

---

# 144. Preferred Capability

Routing may prefer but not require certain Capabilities.

---

# 145. Prohibited Mapping

Some Agent Types or scopes may explicitly prohibit Capabilities.

---

# 146. Prohibition Example

A review-only Agent may prohibit:

```text
production.deploy
```

even if Tool infrastructure exists.

---

# 147. Separation-of-Duties Mapping

Capability mappings should support incompatibility rules.

---

# 148. Toxic Combination Mapping

Example:

```text
payment.prepare
+
payment.approve
+
payment.execute
```

may be prohibited within the same effective Agent scope.

---

# 149. Toxic Combination Evaluation

Check combinations after all inheritance/overlays are resolved.

---

# 150. Toxic Combination Boundary

A valid standalone mapping may become invalid when combined with another.

---

# 151. Capability Bundle Mapping

Agent Types or Roles may map to reusable Capability Bundles.

---

# 152. Bundle Example

```text
backend-engineering-core
=
code.read
+
code.analyze
+
code.generate
+
code.test
```

Conceptual only.

---

# 153. Bundle Expansion

Bundle expansion should resolve to specific governed Capability IDs and
Versions.

---

# 154. Bundle Boundary

```text
BUNDLE
≠
AUTHORIZATION PACKAGE
```

---

# 155. Industry Capability Mapping

Industry Operating Systems may map domain Roles and Tasks to common and
industry-specific Capabilities.

---

# 156. Restaurant Example

Potential:

```text
Restaurant Operations Role
→
inventory.analyze
→
order.monitor
→
operations.report
```

---

# 157. Poultry Example

Potential:

```text
Poultry Operations Role
→
flock.performance.analyze
→
production.report
→
operations.monitor
```

These are illustrative, not canonical registry entries.

---

# 158. Industry Mapping Rule

Industry-specific mappings should reuse existing generic Capabilities
where semantics match.

---

# 159. Industry Mapping Extension

Create a new domain Capability only when generic Capability semantics are
insufficient.

---

# 160. Customer Extension Mapping

Customer-specific workflows may map shared capabilities differently.

---

# 161. Customer Fork Boundary

Prefer:

```text
SHARED CAPABILITY
+
CUSTOMER MAPPING
```

over:

```text
DUPLICATE CUSTOMER-SPECIFIC CAPABILITY
```

when only configuration differs.

---

# 162. Mapping Lifecycle

Mappings themselves need lifecycle governance.

Potential:

```text
PROPOSED

DRAFT

REVIEW

APPROVED

ACTIVE

RESTRICTED

DEPRECATED

RETIRED
```

---

# 163. Mapping Activation

An approved mapping may become active for a defined scope.

---

# 164. Mapping Restriction

Mappings may be restricted due to:

```text
SECURITY ISSUE

QUALITY ISSUE

POLICY CHANGE

CUSTOMER REQUEST

DEPENDENCY CHANGE
```

---

# 165. Mapping Expiry

Temporary mappings may include expiration.

---

# 166. Expiry Rule

```text
MAPPING EXPIRED
=
DO NOT CONTINUE
SILENTLY
```

---

# 167. Mapping Deprecation

Deprecated mappings remain historically visible where required.

---

# 168. Mapping Retirement

Retired mappings should not be used for new resolution.

---

# 169. Historical Mapping

Historical Agent Runs should retain enough information to identify their
effective Capability mappings.

---

# 170. Mapping Migration

Mapping changes may require migration when:

```text
CAPABILITY VERSION CHANGES

ROLE CHANGES

AGENT TYPE CHANGES

CUSTOMER POLICY CHANGES

TENANT POLICY CHANGES

TOOL CONTRACT CHANGES
```

---

# 171. Mapping Migration Rule

Do not silently change historical meaning.

---

# 172. Mapping Drift

Runtime mappings may drift from approved mappings.

---

# 173. Drift Examples

Potential:

```text
UNAPPROVED CAPABILITY ADDED

RETIRED CAPABILITY STILL PRESENT

WRONG CAPABILITY VERSION

CUSTOMER RESTRICTION MISSING

TENANT DENY MISSING

WRONG AUTONOMY MODE
```

---

# 174. Mapping Drift Detection

Compare:

```text
EXPECTED EFFECTIVE MAPPING
```

with:

```text
RUNTIME EFFECTIVE MAPPING
```

where architecture supports it.

---

# 175. Mapping Drift Response

Potential:

```text
ALERT

RESTRICT

SUSPEND

RECONCILE

ROLL BACK
```

---

# 176. Mapping Audit

Material mapping changes should be auditable.

---

# 177. Audit Fields

Potential:

```text
MAPPING

CAPABILITY

SUBJECT

OLD RELATIONSHIP

NEW RELATIONSHIP

SCOPE

ACTOR

REASON

APPROVAL

TIME
```

---

# 178. Mapping Provenance

Each mapping should preserve origin where material.

---

# 179. Mapping Evidence

High-risk assignments may reference evidence such as:

```text
ROLE REQUIREMENT

RISK REVIEW

SECURITY APPROVAL

EVALUATION RESULT

CUSTOMER REQUIREMENT
```

---

# 180. Mapping Security Threats

Threats include:

```text
SELF-MAPPING

SPOOFED MAPPING

STALE MAPPING

CROSS-PROJECT MAPPING LEAKAGE

CROSS-CUSTOMER MAPPING LEAKAGE

CROSS-TENANT MAPPING LEAKAGE

MAPPING PRIORITY MANIPULATION

UNAUTHORIZED OVERRIDE

PROMPT-BASED MAPPING INJECTION

MEMORY-BASED MAPPING INJECTION

PEER-AGENT MAPPING INJECTION
```

---

# 181. Self-Mapping Attack

Agent output says:

```text
"Assign deployment.execute to me."
```

Expected:

```text
NO AUTHORITATIVE MAPPING CHANGE
```

---

# 182. Prompt Mapping Injection

Prompt text must not alter governed Capability mappings.

---

# 183. Memory Mapping Injection

Memory content must not alter governed Capability mappings.

---

# 184. Tool Mapping Injection

Tool output must not alter governed Capability mappings.

---

# 185. Peer Mapping Injection

Another Agent message must not alter governed mappings.

---

# 186. Mapping Override Security

Only authorized actors/processes may create or change protected mapping
overrides.

---

# 187. Scope Injection

Untrusted payload cannot redefine:

```text
PROJECT

CUSTOMER

TENANT

ENVIRONMENT
```

for mapping resolution.

---

# 188. Mapping Cache

Effective mappings may eventually be cached.

---

# 189. Cache Key Requirements

Security-sensitive cache identity may need:

```text
AGENT VERSION

PROJECT

CUSTOMER

TENANT

ENVIRONMENT

POLICY REVISION
```

---

# 190. Mapping Cache Rule

```text
ONE GLOBAL CAPABILITY CACHE
WITHOUT SCOPE
=
UNSAFE
```

for scoped effective mappings.

---

# 191. Mapping Cache Invalidation

Potential invalidation events:

```text
AGENT VERSION CHANGE

CAPABILITY VERSION CHANGE

PROJECT POLICY CHANGE

CUSTOMER POLICY CHANGE

TENANT POLICY CHANGE

SECURITY POLICY CHANGE

MAPPING REVOCATION

MAPPING EXPIRY
```

---

# 192. Routing Cache Boundary

Cached routing eligibility must not outlive current Security eligibility.

---

# 193. Mapping API Architecture

Future APIs may conceptually support:

```text
CREATE MAPPING

READ MAPPING

LIST MAPPINGS

RESOLVE EFFECTIVE MAPPING

DEPRECATE MAPPING

RETIRE MAPPING
```

---

# 194. API Boundary

No concrete endpoint is claimed here.

---

# 195. Mapping Query

A future query may ask:

```text
LIST ALL AGENTS
WITH CAPABILITY X
IN PROJECT A
```

---

# 196. Query Security

Mapping queries themselves may expose sensitive platform structure.

Access should be governed.

---

# 197. Mapping Resolution Service

The platform may eventually use a dedicated logical resolver.

---

# 198. Resolver Inputs

Potential:

```text
AGENT VERSION

CAPABILITY

PROJECT

CUSTOMER

TENANT

ENVIRONMENT

POLICY REVISION

TIME
```

---

# 199. Resolver Output

Potential:

```yaml
capability_resolution:
  capability_id: required

  effective_state: required
  # ELIGIBLE | RESTRICTED | DENIED | INVALID

  relationship_sources: required

  risk_class: conditional
  approval_requirement: conditional
  autonomy_limit: conditional

  reasons: required

  resolved_at: required
```

---

# 200. Resolver Boundary

Resolver determines mapping status.

It does not replace final Security authorization.

---

# 201. Mapping Performance

High-volume routing may require efficient mapping resolution.

---

# 202. Performance Boundary

Performance optimization must not remove:

```text
SCOPE

VERSION

POLICY

REVOCATION
```

from the effective mapping decision.

---

# 203. Mapping Observability

Potential metrics:

```text
MAPPING_RESOLUTIONS

MAPPING_DENIALS

MAPPING_CONFLICTS

INVALID_MAPPINGS

STALE_MAPPINGS

CACHE_HITS

CACHE_INVALIDATIONS

TOXIC_COMBINATION_DETECTIONS
```

---

# 204. Mapping Quality Metrics

Potential:

```text
TASK_CAPABILITY_MATCH_RATE

ROUTING_REJECTION_RATE

MISSING_CAPABILITY_RATE

MAPPING_DRIFT_RATE
```

---

# 205. No Fake Metrics Rule

No live metric values are claimed by this document.

---

# 206. Mapping Evaluation

Mappings should be evaluated for correctness.

---

# 207. Role Mapping Review

Ask:

```text
DOES THIS ROLE ACTUALLY REQUIRE THESE CAPABILITIES?

ARE ANY CAPABILITIES MISSING?

ARE ANY UNNECESSARY?

DOES COMBINATION CREATE RISK?
```

---

# 208. Agent Mapping Review

Ask:

```text
DOES THIS AGENT TYPE NEED THIS CAPABILITY?

HAS THIS AGENT VERSION BEEN EVALUATED FOR IT?

DOES THE TOOL PROFILE SUPPORT IT?

DOES THE MODEL PROFILE SUPPORT IT?
```

---

# 209. Task Mapping Review

Ask:

```text
IS THE TASK-CAPABILITY MAPPING MINIMAL?

ARE REQUIRED CAPABILITIES ACTUALLY REQUIRED?

ARE OPTIONAL CAPABILITIES MARKED OPTIONAL?
```

---

# 210. Customer Mapping Review

Ask:

```text
DO CUSTOMER RESTRICTIONS APPLY?

DOES MAPPING EXPOSE CUSTOMER DATA?

ARE CUSTOMER OVERRIDES SAFE?
```

---

# 211. Tenant Mapping Review

Ask:

```text
IS TENANT SCOPE EXPLICIT?

CAN ANOTHER TENANT'S MAPPING LEAK?

IS THE CACHE TENANT-AWARE?
```

---

# 212. Mapping Testing Strategy

Mapping tests must include positive and negative behavior.

---

# 213. Agent Definition Mapping Test

Map approved Capability to Agent Definition.

Expected mapping is represented without automatically creating Tool
permission.

---

# 214. Agent Version Mapping Test

V1 and V2 have different Capability mappings.

Expected resolution preserves Version distinction.

---

# 215. Role Mapping Test

Role requires `code.review`.

Expected candidate Agent lacking it is not Capability-complete for that
Role requirement.

---

# 216. Role Permission Boundary Test

Role maps to `repository.inspect`.

Expected repository access remains independently authorized.

---

# 217. Persona Mapping Test

Persona changes.

Expected Capability mappings remain unchanged unless explicit governed
mapping change occurs.

---

# 218. Skill Mapping Test

Required Skill absent.

Expected Capability resolution indicates missing dependency.

---

# 219. Tool Mapping Test

Capability maps to Tool.

Tool permission absent.

Expected:

```text
CAPABILITY MAY EXIST
BUT TOOL EXECUTION IS DENIED
```

---

# 220. Model Mapping Test

Capability requires Vision.

Non-Vision Model selected.

Expected:

```text
MODEL INELIGIBLE
```

---

# 221. Model Customer Policy Test

Model satisfies Capability requirements but Customer policy prohibits it.

Expected:

```text
MODEL INELIGIBLE
```

---

# 222. Context Mapping Test

Capability requires Project Context.

Wrong Project Context supplied.

Expected:

```text
DENY / EXCLUDE
```

---

# 223. Memory Mapping Test

Capability maps to Project Memory.

Cross-Project Memory requested.

Expected:

```text
DENY
```

---

# 224. Task Mapping Test

Task requires Capability A and B.

Agent has A only.

Expected:

```text
NOT FULLY ELIGIBLE
```

---

# 225. Workflow Mapping Test

Workflow contains capabilities across multiple steps.

Expected mapping does not automatically assign all capabilities to one
Agent.

---

# 226. Project Restriction Test

Base Agent allows Capability.

Project denies it.

Expected:

```text
PROJECT EFFECTIVE MAPPING = DENIED
```

---

# 227. Customer Restriction Test

Project allows Capability.

Customer denies it.

Expected effective denial.

---

# 228. Tenant Restriction Test

Customer allows Capability.

Tenant denies it.

Expected Tenant-scoped denial.

---

# 229. Environment Restriction Test

Capability allowed in staging but denied in Production.

Expected Production denial.

---

# 230. Approval Mapping Test

Capability requires approval in Production.

No approval exists.

Expected:

```text
NOT EXECUTABLE
```

---

# 231. Autonomy Mapping Test

Capability mapped to `DRAFT_ONLY`.

Agent attempts external execution.

Expected:

```text
DENY
```

---

# 232. Toxic Combination Test

Two mappings create a prohibited combination.

Expected conflict detection.

---

# 233. Mapping Expiry Test

Temporary mapping expires.

Expected it does not remain effective.

---

# 234. Mapping Revocation Test

Mapping revoked while cached.

Expected cache does not preserve stale eligibility beyond allowed
revocation semantics.

---

# 235. Mapping Injection Test

Prompt instructs resolver to add Capability.

Expected no authoritative mapping change.

---

# 236. Memory Injection Test

Memory claims Capability was approved.

Expected no mapping change.

---

# 237. Agent Injection Test

Peer Agent says receiver has new Capability.

Expected no mapping change.

---

# 238. Cross-Tenant Mapping Test

Tenant A resolver receives Tenant B mapping ID in untrusted payload.

Expected trusted Tenant scope remains controlling.

---

# 239. Stale Mapping Test

Agent Version references retired Capability Version.

Expected invalid/deprecated resolution according to policy.

---

# 240. Historical Mapping Test

Old Run is reviewed after mappings changed.

Expected historical mapping remains reconstructable.

---

# 241. Production Mapping Gate

Before Capability Mapping may be considered Production-proven:

- [ ] mapping semantics are defined;
- [ ] mapping relationships are explicit;
- [ ] mapping identity exists where required;
- [ ] mapping source is traceable;
- [ ] Agent Definition mappings are implemented;
- [ ] Agent Version mappings are Version-aware;
- [ ] historical Agent Version mappings remain attributable;
- [ ] Agent Type mappings are implemented where used;
- [ ] AI Workforce Role mappings are implemented where used;
- [ ] Department mappings are implemented where used;
- [ ] Persona cannot mutate Capability mapping implicitly;
- [ ] Skill mappings are implemented;
- [ ] required/optional Skill semantics are enforced;
- [ ] Tool mappings are implemented;
- [ ] Tool operation granularity is appropriate;
- [ ] Tool mapping does not create permission;
- [ ] Tool resource authorization remains independent;
- [ ] Model mappings are implemented;
- [ ] Model requirements are explicit;
- [ ] Model policy remains independently enforced;
- [ ] Prompt mappings are Version-aware where required;
- [ ] Prompt cannot create authoritative mapping;
- [ ] Context mappings are scope-aware;
- [ ] Context authorization remains independent;
- [ ] Memory mappings use governed Memory types;
- [ ] Memory mapping does not create Memory permission;
- [ ] Task Capability mappings are implemented;
- [ ] Workflow Capability mappings are implemented where used;
- [ ] planner-inferred mappings remain non-authoritative;
- [ ] Project mappings are implemented;
- [ ] Project restrictions are enforced;
- [ ] cross-Project mapping leakage is prevented;
- [ ] Customer mappings are implemented where applicable;
- [ ] Customer restrictions are enforced;
- [ ] cross-Customer mapping leakage is prevented;
- [ ] Tenant mappings are implemented where applicable;
- [ ] Tenant restrictions are enforced;
- [ ] cross-Tenant mapping leakage is prevented;
- [ ] environment mappings are enforced;
- [ ] staging mappings cannot silently grant Production eligibility;
- [ ] risk mappings are implemented;
- [ ] contextual risk is considered where required;
- [ ] approval mappings are enforced;
- [ ] approval-required does not equal approval-granted;
- [ ] approval authority is independently verified;
- [ ] autonomy mappings are implemented;
- [ ] Capability assignment does not imply autonomy;
- [ ] evaluation mappings are implemented;
- [ ] evaluation profile mapping does not imply evaluation success;
- [ ] Verified Capability state preserves scope;
- [ ] routing consumes effective Capability mappings;
- [ ] routing still enforces current Security eligibility;
- [ ] mapping inheritance is deterministic;
- [ ] mandatory restrictions cannot be weakened by lower-level mappings;
- [ ] mapping precedence is defined;
- [ ] mapping conflicts are detected;
- [ ] ambiguous Security-sensitive mapping fails safe;
- [ ] required mappings are distinguished from optional mappings;
- [ ] prohibited mappings are supported;
- [ ] separation-of-duties mappings are enforced;
- [ ] toxic combinations are detected;
- [ ] Capability Bundles expand to explicit governed Capabilities;
- [ ] bundles do not create permission packages;
- [ ] Industry mappings preserve core Capability contracts;
- [ ] Customer-specific mappings avoid unnecessary Capability duplication;
- [ ] mapping lifecycle is implemented;
- [ ] temporary mappings can expire;
- [ ] mapping revocation is implemented;
- [ ] mapping deprecation is implemented;
- [ ] mapping retirement is implemented;
- [ ] historical mapping is reconstructable;
- [ ] mapping migration is defined;
- [ ] mapping drift is detectable where required;
- [ ] mapping changes are auditable;
- [ ] mapping provenance is retained;
- [ ] mapping override permissions are controlled;
- [ ] Prompt Injection cannot create mapping;
- [ ] Memory Poisoning cannot create mapping;
- [ ] Tool output cannot create mapping;
- [ ] peer-Agent messages cannot create mapping;
- [ ] mapping caches preserve Agent Version scope;
- [ ] mapping caches preserve Project scope;
- [ ] mapping caches preserve Customer scope where applicable;
- [ ] mapping caches preserve Tenant scope where applicable;
- [ ] mapping cache invalidation respects policy changes;
- [ ] mapping APIs are authentication-controlled;
- [ ] mapping APIs are authorization-controlled;
- [ ] sensitive mapping queries are governed;
- [ ] mapping resolution is deterministic;
- [ ] mapping resolution does not replace final authorization;
- [ ] mapping observability exists;
- [ ] mapping metrics do not expose sensitive Tenant/Customer Data;
- [ ] controlled mapping tests pass;
- [ ] mapping injection tests pass;
- [ ] Project mapping isolation tests pass;
- [ ] Customer mapping isolation tests pass where applicable;
- [ ] Tenant mapping isolation tests pass where applicable;
- [ ] Production implementation Evidence exists;
- [ ] Security review is complete;
- [ ] Agent Capability Governance review is complete;
- [ ] Enterprise Architecture review is complete;
- [ ] Production authorization is explicit.

---

# 242. Production Hard Stops

Production mapping use must remain blocked if any known condition
includes:

```text
MAPPING RELATIONSHIP SEMANTICS ARE AMBIGUOUS

AGENT VERSION MAPPING IS NOT VERSION-AWARE

HISTORICAL MAPPINGS ARE SILENTLY REWRITTEN

ROLE MAPPING AUTOMATICALLY CREATES PERMISSION

DEPARTMENT MEMBERSHIP AUTOMATICALLY GRANTS ALL DEPARTMENT CAPABILITIES

PERSONA CAN CREATE CAPABILITY MAPPING

SKILL MAPPING CREATES TOOL AUTHORITY

TOOL MAPPING CREATES RESOURCE AUTHORITY

MODEL MAPPING BYPASSES MODEL POLICY

PROMPT TEXT CAN CREATE AUTHORITATIVE MAPPING

CONTEXT CONTENT CAN CREATE AUTHORITATIVE MAPPING

MEMORY CONTENT CAN CREATE AUTHORITATIVE MAPPING

TASK REQUIREMENT AUTOMATICALLY ASSIGNS CAPABILITY TO AGENT

WORKFLOW REQUIREMENT AUTOMATICALLY ASSIGNS ALL CAPABILITIES TO ONE AGENT

PROJECT RESTRICTION CAN BE IGNORED BY GLOBAL MAPPING

CUSTOMER RESTRICTION CAN BE IGNORED

TENANT RESTRICTION CAN BE IGNORED

STAGING MAPPING CAN SILENTLY APPLY TO PRODUCTION

APPROVAL-REQUIRED MAPPING IS TREATED AS APPROVED

AUTONOMY MAPPING CAN BE SELF-INCREASED BY AGENT

TOXIC CAPABILITY COMBINATIONS ARE NOT DETECTED

MAPPING CONFLICT RESOLUTION FAILS OPEN

UNKNOWN MAPPING SCOPE BECOMES GLOBAL

UNTRUSTED PAYLOAD CAN OVERRIDE PROJECT SCOPE

UNTRUSTED PAYLOAD CAN OVERRIDE CUSTOMER SCOPE

UNTRUSTED PAYLOAD CAN OVERRIDE TENANT SCOPE

MAPPING CACHE IS NOT PROJECT-AWARE

MAPPING CACHE IS NOT CUSTOMER-AWARE WHERE REQUIRED

MAPPING CACHE IS NOT TENANT-AWARE WHERE REQUIRED

REVOKED MAPPING REMAINS EFFECTIVE THROUGH STALE CACHE

RETIRED CAPABILITY MAPPING REMAINS ACTIVE SILENTLY

AGENT CAN SELF-MAP NEW CAPABILITIES

PEER AGENT CAN MAP NEW CAPABILITIES

TOOL OUTPUT CAN MAP NEW CAPABILITIES

MEMORY CAN MAP NEW CAPABILITIES

CAPABILITY MAPPING IS TREATED AS FINAL SECURITY AUTHORIZATION

PRODUCTION MAPPING IMPLEMENTATION IS NOT VERIFIED
```

---

# 243. Capability Mapping Invariants

The following invariants must remain true:

```text
MAPPING
≠
AUTHORITY

MAPPED
≠
ASSIGNED

ASSIGNED
≠
ELIGIBLE

ELIGIBLE
≠
AUTHORIZED

ROLE MAPPING
≠
PERMISSION

TOOL MAPPING
≠
TOOL AUTHORIZATION

MODEL MAPPING
≠
MODEL APPROVAL

CONTEXT MAPPING
≠
DATA ACCESS

MEMORY MAPPING
≠
MEMORY ACCESS

TASK REQUIREMENT
≠
AGENT CAPABILITY ASSIGNMENT

PROJECT MAPPING
≠
CUSTOMER MAPPING

CUSTOMER MAPPING
≠
TENANT MAPPING

STAGING MAPPING
≠
PRODUCTION AUTHORIZATION

APPROVAL REQUIREMENT
≠
APPROVAL

AUTONOMY MAPPING
≠
UNBOUNDED AUTONOMY

EVALUATION MAPPING
≠
EVALUATION PASSED

ROUTING MATCH
≠
ACTION AUTHORIZATION

CAPABILITY BUNDLE
≠
PERMISSION BUNDLE
```

---

# 244. Mapping Decision Framework

Before creating a Capability mapping ask:

```text
WHAT IS THE SUBJECT?

WHAT CAPABILITY?

WHICH VERSION?

WHAT RELATIONSHIP TYPE?

WHY DOES THIS MAPPING EXIST?

WHAT IS ITS SOURCE?

WHAT SCOPE?

WHAT PROJECT?

WHAT CUSTOMER?

WHAT TENANT?

WHAT ENVIRONMENT?

IS IT REQUIRED?

OPTIONAL?

RESTRICTED?

DENIED?

DOES IT CREATE A CONFLICT?

DOES IT CREATE A TOXIC COMBINATION?

WHEN DOES IT EXPIRE?

WHO APPROVES IT?
```

---

# 245. Agent Mapping Decision Framework

Before mapping a Capability to an Agent ask:

```text
DOES THIS AGENT'S PURPOSE REQUIRE IT?

DOES THE ROLE REQUIRE IT?

HAS THE AGENT VERSION BEEN EVALUATED FOR IT?

DOES ITS TOOL PROFILE SUPPORT IT?

DOES ITS MODEL PROFILE SUPPORT IT?

DOES ITS MEMORY PROFILE SUPPORT IT?

DOES THIS CREATE EXCESSIVE CAPABILITY?
```

---

# 246. Role Mapping Decision Framework

Before Role → Capability mapping ask:

```text
IS THE CAPABILITY REQUIRED FOR THE ROLE?

IS IT OPTIONAL?

IS IT ROLE-WIDE OR SPECIALIZATION-SPECIFIC?

WOULD ASSIGNING IT TO ALL ROLE HOLDERS BE EXCESSIVE?

DOES IT CREATE SEPARATION-OF-DUTIES RISK?
```

---

# 247. Task Mapping Decision Framework

Before Task → Capability mapping ask:

```text
WHAT ABILITY IS ACTUALLY REQUIRED?

IS ONE CAPABILITY ENOUGH?

IS THIS COMPOSITE WORK?

CAN DIFFERENT AGENTS HANDLE DIFFERENT PARTS?

WHAT EVIDENCE PROVES TASK COMPLETION?
```

---

# 248. Project Mapping Decision Framework

Before Project mapping ask:

```text
DOES PROJECT NEED THIS CAPABILITY?

IS IT ALLOWED IN THIS ENVIRONMENT?

WHAT DATA DOES IT TOUCH?

WHAT TOOLS DOES IT NEED?

WHAT APPROVAL DOES IT REQUIRE?

CAN IT AFFECT ANOTHER PROJECT?
```

---

# 249. Customer Mapping Decision Framework

Ask:

```text
DO CUSTOMER POLICY RESTRICTIONS EXIST?

DOES CUSTOMER ALLOW REQUIRED MODEL?

DOES CUSTOMER ALLOW REQUIRED TOOL?

DOES CUSTOMER REQUIRE HUMAN APPROVAL?

DOES CUSTOMER DISALLOW EXTERNAL COMMUNICATION?

IS CUSTOMER SCOPE PRESERVED?
```

---

# 250. Tenant Mapping Decision Framework

Ask:

```text
WHAT TENANT?

IS TENANT ID TRUSTED?

WHAT TENANT DATA IS REQUIRED?

WHAT TENANT TOOLS ARE REQUIRED?

WHAT TENANT MEMORY IS REQUIRED?

WHAT NEGATIVE TEST PROVES ISOLATION?
```

---

# 251. Mapping Conflict Decision Framework

When mappings conflict ask:

```text
WHICH SOURCE HAS GREATER AUTHORITY?

IS THERE A DENY?

IS THERE A MANDATORY ENTERPRISE RESTRICTION?

IS THERE A CUSTOMER RESTRICTION?

IS THERE A TENANT RESTRICTION?

IS RESULT STILL SAFE?

IS HUMAN REVIEW REQUIRED?
```

---

# 252. Capability Mapping Anti-Patterns

Avoid:

```text
ROLE = CAPABILITY = PERMISSION

DEPARTMENT = ALL CAPABILITIES

PERSONA-DRIVEN CAPABILITY ASSIGNMENT

MODEL-DRIVEN CAPABILITY ASSIGNMENT

PROMPT-DRIVEN CAPABILITY ASSIGNMENT

MEMORY-DRIVEN CAPABILITY ASSIGNMENT

TOOL-DRIVEN CAPABILITY ASSIGNMENT

TASK-DRIVEN AUTOMATIC PRIVILEGE ESCALATION

UNVERSIONED AGENT-CAPABILITY MAPPINGS

GLOBAL CUSTOMER-AGNOSTIC MAPPING CACHE

GLOBAL TENANT-AGNOSTIC MAPPING CACHE

PROJECT OVERRIDES THAT WIDEN ENTERPRISE SECURITY

CUSTOMER OVERRIDES THAT WIDEN CORE SECURITY

TENANT OVERRIDES THAT WIDEN CORE SECURITY

ROUTING USING CAPABILITY MATCH ONLY

CAPABILITY BUNDLES USED AS PERMISSION BUNDLES

HISTORICAL MAPPINGS SILENTLY REWRITTEN
```

---

# 253. Capability Folder Responsibility

The `capabilities/` folder separates three concerns:

```text
capability-framework.md
=
WHAT A CAPABILITY IS
AND
HOW CAPABILITIES ARE GOVERNED

capability-mapping.md
=
HOW CAPABILITIES RELATE
TO AGENTS, ROLES, SKILLS, TOOLS,
TASKS, PROJECTS, CUSTOMERS, TENANTS,
RISK, AUTONOMY, AND EVALUATION

capability-registry.md
=
HOW CAPABILITY DEFINITIONS
AND VERSIONS
ARE CATALOGED, DISCOVERED,
RESOLVED, GOVERNED, AND RETIRED
```

---

# 254. Current Capability Mapping Truth

At the current documentation stage:

```text
AGENT_DEFINITION_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

AGENT_VERSION_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

AGENT_TYPE_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

WORKFORCE_ROLE_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

DEPARTMENT_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

PERSONA_CAPABILITY_BOUNDARY
=
DEFINED_TARGET_STATE

SKILL_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

TOOL_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

MODEL_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

PROMPT_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

CONTEXT_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

MEMORY_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

TASK_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

WORKFLOW_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

PROJECT_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

CUSTOMER_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

TENANT_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

ENVIRONMENT_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

RISK_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

APPROVAL_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

AUTONOMY_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

EVALUATION_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

ROUTING_CAPABILITY_MAPPING
=
DEFINED_TARGET_STATE

MAPPING_PRECEDENCE
=
DEFINED_TARGET_STATE

MAPPING_CONFLICT_MODEL
=
DEFINED_TARGET_STATE

MAPPING_LIFECYCLE
=
DEFINED_TARGET_STATE

MAPPING_DRIFT_MODEL
=
DEFINED_TARGET_STATE
```

---

# 255. Runtime Truth

At the current documentation stage:

```text
CAPABILITY_MAPPING_RUNTIME
=
NOT_PROVEN

AGENT_VERSION_MAPPING_RUNTIME
=
NOT_PROVEN

ROLE_MAPPING_RUNTIME
=
NOT_PROVEN

SKILL_MAPPING_RUNTIME
=
NOT_PROVEN

TOOL_MAPPING_RUNTIME
=
NOT_PROVEN

MODEL_MAPPING_RUNTIME
=
NOT_PROVEN

CONTEXT_MAPPING_RUNTIME
=
NOT_PROVEN

MEMORY_MAPPING_RUNTIME
=
NOT_PROVEN

TASK_MAPPING_RUNTIME
=
NOT_PROVEN

WORKFLOW_MAPPING_RUNTIME
=
NOT_PROVEN

PROJECT_MAPPING_RUNTIME
=
NOT_PROVEN

CUSTOMER_MAPPING_RUNTIME
=
NOT_PROVEN

TENANT_MAPPING_RUNTIME
=
NOT_PROVEN

ENVIRONMENT_MAPPING_RUNTIME
=
NOT_PROVEN

RISK_MAPPING_RUNTIME
=
NOT_PROVEN

APPROVAL_MAPPING_RUNTIME
=
NOT_PROVEN

AUTONOMY_MAPPING_RUNTIME
=
NOT_PROVEN

EVALUATION_MAPPING_RUNTIME
=
NOT_PROVEN

ROUTING_MAPPING_RUNTIME
=
NOT_PROVEN

MAPPING_CONFLICT_RESOLUTION
=
NOT_PROVEN

MAPPING_CACHE_ISOLATION
=
NOT_PROVEN

MAPPING_DRIFT_DETECTION
=
NOT_PROVEN

PRODUCTION_CAPABILITY_MAPPING
=
NOT_PROVEN
```

---

# 256. Approval Status

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

AI_WORKFORCE_GOVERNANCE_APPROVAL
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

# 257. Canonical Status

```text
CANONICAL
=
FALSE
```

---

# 258. Production Status

```text
AGENT_CAPABILITY_MAPPING
=
DOCUMENTED_TARGET_STATE

CAPABILITY_MAPPING_IMPLEMENTATION
=
NOT_PROVEN

CAPABILITY_MAPPING_VERIFICATION
=
NOT_PROVEN

CAPABILITY_MAPPING_PRODUCTION_AUTHORIZATION
=
NOT_GRANTED_BY_THIS DOCUMENT

PRODUCTION_OPERATIONAL
=
NOT_PROVEN
```

---

# 259. Preserved Mapping Truth

```text
DOCUMENTED MAPPING
≠
IMPLEMENTED MAPPING

IMPLEMENTED MAPPING
≠
VERIFIED MAPPING

VERIFIED MAPPING
≠
PRODUCTION AUTHORIZED MAPPING

CAPABILITY MAPPED
≠
CAPABILITY ASSIGNED

CAPABILITY ASSIGNED
≠
CAPABILITY ELIGIBLE

CAPABILITY ELIGIBLE
≠
RESOURCE AUTHORIZED

ROLE MAPPING
≠
PERMISSION

TOOL MAPPING
≠
TOOL AUTHORITY

MODEL MAPPING
≠
MODEL APPROVAL

MEMORY MAPPING
≠
MEMORY AUTHORIZATION

TASK MAPPING
≠
AGENT PRIVILEGE

CUSTOMER MAPPING
≠
TENANT MAPPING

AUTONOMY MAPPING
≠
UNBOUNDED AUTONOMY

ROUTING MATCH
≠
EXECUTION AUTHORITY

MAPPING
≠
AUTHORITY
```

---

# 260. Capability Mapping Completion Checklist

Before this document is content-complete for review:

- [ ] Capability Mapping purpose is defined;
- [ ] Mapping mission is defined;
- [ ] Mapping/Authority separation is explicit;
- [ ] Mapping dimensions are defined;
- [ ] mapping relationship types are defined;
- [ ] mapping identity is defined;
- [ ] conceptual Mapping Definition is defined;
- [ ] mapping Versioning is defined;
- [ ] mapping source is defined;
- [ ] source-of-truth boundary is explicit;
- [ ] Agent Definition mappings are defined;
- [ ] Agent Version mappings are defined;
- [ ] historical Version mapping is defined;
- [ ] Agent Type mappings are defined;
- [ ] Worker Agent mapping is bounded;
- [ ] Specialist Agent mapping is bounded;
- [ ] Manager Agent mapping is bounded;
- [ ] Executive Agent mapping is bounded;
- [ ] System Agent mapping is bounded;
- [ ] AI Workforce Role mappings are defined;
- [ ] Role/Permission separation is explicit;
- [ ] Department mappings are defined;
- [ ] Department-membership boundary is defined;
- [ ] Persona relationship is defined;
- [ ] Persona/Capability separation is explicit;
- [ ] Skill mappings are defined;
- [ ] Skill mapping types are defined;
- [ ] Tool mappings are defined;
- [ ] Tool mapping/authorization separation is explicit;
- [ ] Tool operation granularity is defined;
- [ ] Model mappings are defined;
- [ ] Model portability direction is defined;
- [ ] Model eligibility intersection is defined;
- [ ] Prompt mappings are defined;
- [ ] Prompt cannot create mapping;
- [ ] Context mappings are defined;
- [ ] Context authorization boundary is defined;
- [ ] Memory mappings are defined;
- [ ] Memory authorization boundary is defined;
- [ ] Task mappings are defined;
- [ ] Task requirement/assignment separation is explicit;
- [ ] Workflow mappings are defined;
- [ ] Planning candidate boundary is defined;
- [ ] Project mappings are defined;
- [ ] Multi-Project mapping is defined;
- [ ] Customer mappings are defined;
- [ ] Multi-Customer mapping is defined;
- [ ] Tenant mappings are defined;
- [ ] Multi-Tenant mapping is defined;
- [ ] environment mappings are defined;
- [ ] risk mapping is defined;
- [ ] contextual risk mapping is defined;
- [ ] approval mappings are defined;
- [ ] approval requirement/approval separation is explicit;
- [ ] autonomy mappings are defined;
- [ ] Capability/Autonomy separation is explicit;
- [ ] evaluation mappings are defined;
- [ ] verification scope is defined;
- [ ] routing mappings are defined;
- [ ] routing/Security separation is explicit;
- [ ] inheritance is defined;
- [ ] precedence is defined conceptually;
- [ ] lower-level widening is prohibited;
- [ ] mapping conflicts are defined;
- [ ] conflict resolution is deterministic;
- [ ] ambiguous Security mapping fails safe;
- [ ] effective Capability mapping is defined;
- [ ] effective mapping/authorization separation is explicit;
- [ ] required/optional/preferred/prohibited semantics are defined;
- [ ] separation-of-duties mapping is defined;
- [ ] toxic combinations are defined;
- [ ] Capability Bundles are defined;
- [ ] bundle/permission separation is explicit;
- [ ] Industry mappings are defined;
- [ ] Customer extension mapping is defined;
- [ ] duplicate-Capability avoidance is defined;
- [ ] mapping lifecycle is defined;
- [ ] mapping expiry is defined;
- [ ] mapping deprecation is defined;
- [ ] mapping retirement is defined;
- [ ] historical mapping is defined;
- [ ] mapping migration is defined;
- [ ] mapping drift is defined;
- [ ] mapping drift response is defined;
- [ ] mapping Audit is defined;
- [ ] mapping provenance is defined;
- [ ] Mapping Security threats are defined;
- [ ] self-mapping attack is defined;
- [ ] Prompt mapping injection is prohibited;
- [ ] Memory mapping injection is prohibited;
- [ ] Tool mapping injection is prohibited;
- [ ] peer-Agent mapping injection is prohibited;
- [ ] mapping override Security is defined;
- [ ] scope injection is prohibited;
- [ ] mapping caches are defined;
- [ ] cache scope requirements are defined;
- [ ] cache invalidation is defined;
- [ ] routing-cache boundary is defined;
- [ ] conceptual Mapping APIs are defined;
- [ ] no fake endpoints are claimed;
- [ ] mapping query Security is defined;
- [ ] mapping resolver is defined conceptually;
- [ ] mapping resolver/authorization separation is explicit;
- [ ] mapping performance boundary is defined;
- [ ] Mapping Observability is defined;
- [ ] no fake metrics are claimed;
- [ ] mapping evaluation is defined;
- [ ] controlled tests are defined;
- [ ] Production Mapping Gate is defined;
- [ ] Production Hard Stops are defined;
- [ ] Capability Mapping invariants are defined;
- [ ] mapping decision frameworks are defined;
- [ ] mapping anti-patterns are defined;
- [ ] capability-folder responsibility is defined;
- [ ] runtime truth uses `NOT_PROVEN`;
- [ ] no unproven Mapping runtime claim is made;
- [ ] no unproven isolation claim is made;
- [ ] no unproven Production claim is made;
- [ ] next document is identified.

---

# 261. Revision History

| Version | Date | Status | Author | Change |
|---|---|---|---|---|
| 0.1.0 | 2026-08-08 | Draft | Mianx.ai | Initial Agent Capability Mapping standard |
| 1.0.0 | 2026-08-08 | Draft | Mianx.ai | Established detailed Capability Mapping across Agent Definitions, Agent Versions, Agent Types, AI Workforce Roles, Departments, Personas, Skills, Tools, Models, Prompts, Context, Memory, Tasks, Workflows, Projects, Customers, Tenants, environments, risk, approvals, autonomy, evaluation, routing, inheritance, conflict resolution, mapping lifecycle, drift, Security, observability, testing, and Production gates |

---

# 262. Changelog Entry

Add during module Changelog synchronization to:

```text
doc/22-agent-framework/CHANGELOG.md
```

```markdown
## AGENT-FRAMEWORK-CHG-20260808-018 — Enterprise Capability Mapping Standard Established

| Field | Value |
|---|---|
| Date | 2026-08-08 |
| Change Type | `CREATED`, `AGENT-FRAMEWORK`, `CAPABILITY-MAPPING`, `AI-WORKFORCE`, `ROUTING`, `MULTI-PROJECT`, `MULTI-CUSTOMER`, `MULTI-TENANT`, `SECURITY` |
| Impact | `I5 — Foundational / Enterprise-Wide` |
| Risk | `R4 — Critical` |
| Status | `Completed for Review` |
| Owner | Mianx.ai Founder |
| Approver | Pending Founder, Enterprise Governance, Agent Capability Governance, AI Workforce Governance, and Security Governance Review |

### Affected Document

`doc/22-agent-framework/capabilities/capability-mapping.md`

### New State

The Agent Framework now defines governed Capability mappings covering:

- Agent Definitions;
- Agent Versions;
- Agent Types;
- AI Workforce Roles;
- Departments;
- Personas;
- Skills;
- Tools;
- Model requirements;
- Prompt profiles;
- Context requirements;
- Memory requirements;
- Tasks;
- Workflows;
- Projects;
- Customers;
- Tenants;
- environments;
- risk classes;
- approval requirements;
- autonomy limits;
- evaluation profiles;
- routing eligibility;
- mapping inheritance;
- mapping precedence;
- mapping conflict resolution;
- effective Capability mappings;
- separation of duties;
- toxic Capability combinations;
- Capability Bundles;
- Industry mappings;
- Customer extension mappings;
- mapping lifecycle;
- expiry;
- deprecation;
- retirement;
- historical mapping;
- migration;
- mapping drift;
- Audit;
- provenance;
- Security threats;
- cache isolation;
- mapping resolution;
- observability;
- controlled tests;
- Production gates;
- Production Hard Stops.

### Documentation Truth

```text
AGENT_CAPABILITY_MAPPING
=
CONTENT_COMPLETE_FOR_REVIEW

CAPABILITY_MAPPING_RUNTIME
=
NOT_PROVEN

CAPABILITY_MAPPING_ISOLATION
=
NOT_PROVEN

PRODUCTION_CAPABILITY_MAPPING
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

AI_WORKFORCE_GOVERNANCE_APPROVAL
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

# 263. Documentation Progress

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
2

TOTAL_CONTENT_COMPLETE_FOR_REVIEW
=
18

REMAINING_DOCUMENTS
=
60
```

This is documentation content progress only.

It does not represent Agent Framework implementation progress.

---

# 264. Capabilities Folder Status

```text
capabilities/capability-framework.md
=
CONTENT_COMPLETE_FOR_REVIEW

capabilities/capability-mapping.md
=
CONTENT_COMPLETE_FOR_REVIEW

capabilities/capability-registry.md
=
NEXT
```

Therefore:

```text
doc/22-agent-framework/capabilities/
=
2 / 3
CONTENT_COMPLETE_FOR_REVIEW
```

---

# 265. Next Document

The next document in the locked sequence is:

```text
doc/22-agent-framework/capabilities/capability-registry.md
```

Document ID:

```text
AGENT-CAPABILITY-REGISTRY-001
```

Purpose:

> **Define the authoritative governed Capability Registry for Mianx.ai,
> including Capability identities, Versions, metadata, ownership,
> lifecycle state, taxonomy, contracts, risk classifications,
> dependencies, compatibility, discoverability, registration,
> approval, activation, restriction, deprecation, retirement, lookup,
> search, effective-version resolution, integrity, caching, Audit,
> Registry Security, Project/Customer/Tenant overlays, Agent and Role
> references, registry APIs/events, migration, backup/restore truth,
> and Production Registry gates while preserving the rule that a
> registered Capability is not automatically assigned, enabled, or
> authorized.**

---

# Final Capability Mapping Rule

```text
CAPABILITY FRAMEWORK
TELLS US
WHAT AN ABILITY MEANS.

CAPABILITY MAPPING
TELLS US
WHERE THAT ABILITY RELATES.

CAPABILITY REGISTRY
TELLS US
WHICH GOVERNED CAPABILITY DEFINITIONS EXIST.
```

But none of these by themselves answer:

```text
MAY THIS AGENT
PERFORM THIS ACTION
RIGHT NOW?
```

That requires:

```text
AGENT IDENTITY
+
AGENT VERSION
+
CAPABILITY ASSIGNMENT
+
EFFECTIVE MAPPING
+
CURRENT LIFECYCLE
+
PROJECT
+
CUSTOMER
+
TENANT
+
ENVIRONMENT
+
PERMISSION
+
POLICY
+
APPROVAL WHERE REQUIRED
=
CURRENT EXECUTION ELIGIBILITY
```

And even then:

```text
EXECUTION ELIGIBLE
≠
EXECUTION VERIFIED SUCCESSFUL
```

The permanent mapping equation therefore remains:

```text
RELATIONSHIP
+
SCOPE
+
VERSION
+
POLICY
=
EFFECTIVE MAPPING

EFFECTIVE MAPPING
+
CURRENT AUTHORIZATION
=
CONTROLLED ELIGIBILITY
```

Never:

```text
MAPPING
=
AUTHORITY
```

---