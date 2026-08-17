---
id: AGENT-CAPABILITY-TEMPLATE-001
title: Mianx.ai Agent Capability Template
version: 1.0.0
status: Draft

description: Enterprise template standard for authoring consistent, versioned, reviewable, truth-bounded and governable Mianx.ai individual-Agent Capability Definitions. This document defines required and optional Capability metadata, stable Capability identity, Versioning, purpose, intended outcomes, non-goals, Capability class, taxonomy, Agent-Type and organizational Role applicability, supporting Skill references, prerequisite Capabilities and Skills, dependent Capabilities, Tool requirements, Model requirements, Prompt dependencies, Memory requirements, Knowledge requirements, data requirements, Task-class applicability, input and output expectations, side-effect characteristics, risk classification, Project, Customer, Tenant and environment applicability, autonomy implications, approval requirements, Security requirements, compliance constraints, evaluation criteria, quality requirements, proficiency relationships, Evidence requirements, Audit expectations, ownership, stewardship, provenance, lifecycle, deprecation, supersession, revocation, runtime-truth fields, and Production hard stops while preserving the permanent rule that completing, reviewing, approving, cataloging, assigning, or referencing a Capability Definition never independently grants that Capability to an Agent, grants Tool or data access, expands autonomy, creates Task authority, or authorizes Production execution.

type: Enterprise Agent Capability Definition Template Standard, Individual-Agent Capability Authoring Template, Capability Metadata Template, Capability Identity Template, Capability Versioning Template, Capability Taxonomy Template, Capability Outcome Template, Capability Scope Template, Capability Skill-Reference Template, Capability Dependency Template, Capability Tool-Requirement Template, Capability Model-Requirement Template, Capability Prompt-Dependency Template, Capability Memory-Requirement Template, Capability Knowledge-Requirement Template, Capability Data-Requirement Template, Capability Task-Class Template, Capability Risk Template, Capability Security Template, Capability Approval Template, Capability Evaluation Template, Capability Evidence Template, Capability Lifecycle Template, Capability Audit Template, Capability Runtime-Truth Template, and Capability Production-Readiness Template

class: Governed Enterprise Individual-Agent Capability Definition Authoring, Versioned, Scope-Isolated, Security-Aware, Evidence-Producing, Reviewable and Production-Readiness Template Standard for Mianx.ai Agents operating across MianX Core Platform, AI Operating System, Shared AI Workforce, Project Factory, Industry Operating Systems, Multi-Project Operations, Multi-Customer Operations, Multi-Tenant Operations, controlled pilots, enterprise integrations, and future Production environments

category: Agent Framework Templates
parent: doc/22-agent-framework/templates

owner: Mianx.ai Founder

authority: Founder and Enterprise Governance

stewards:
  - Founder Office
  - Enterprise Governance
  - Enterprise Architecture
  - Agent Framework Governance
  - Agent Governance
  - Capability Governance
  - Capability Registry Governance
  - Capability Definition Governance
  - Template Governance
  - Agent Registry Governance
  - Agent Discovery Governance
  - Agent Runtime Governance
  - AI Operating System Governance
  - AI Workforce Governance
  - Agent-Type Governance
  - Role Governance
  - Skill Governance
  - Persona Governance
  - Tool Governance
  - Model Governance
  - Prompt Governance
  - Memory Governance
  - Knowledge Governance
  - Data Governance
  - Task Governance
  - Execution Governance
  - Security Governance
  - Agent Security Governance
  - Identity and Access Governance
  - Authorization Governance
  - Policy Governance
  - Approval Governance
  - Compliance Governance
  - Risk Governance
  - Evaluation Governance
  - Quality Governance
  - Benchmark Governance
  - Lifecycle Governance
  - Project Governance
  - Customer Governance
  - Tenant Governance
  - Environment Governance
  - Production Governance
  - Evidence Governance
  - Audit Governance
  - Observability Governance
  - Documentation Governance

maintainers:
  - Agent Framework Engineering
  - Capability Engineering
  - AI Workforce Engineering
  - Agent Runtime Engineering
  - AI Operating System Engineering
  - Skill Engineering
  - Tool Platform Engineering
  - Model Platform Engineering
  - Prompt Engineering
  - Memory Platform Engineering
  - Knowledge Platform Engineering
  - Data Platform Engineering
  - Security Engineering
  - Evaluation Engineering
  - Quality Engineering
  - Observability Engineering
  - Documentation Governance

reviewers:
  - Founder
  - Founder Office
  - Enterprise Governance
  - Enterprise Architecture
  - Agent Framework Governance
  - Agent Governance
  - Capability Governance
  - Capability Registry Governance
  - Capability Definition Governance
  - Template Governance
  - Agent Registry Governance
  - Agent Discovery Governance
  - Agent Runtime Governance
  - AI Operating System Governance
  - AI Workforce Governance
  - Agent-Type Governance
  - Role Governance
  - Skill Governance
  - Persona Governance
  - Tool Governance
  - Model Governance
  - Prompt Governance
  - Memory Governance
  - Knowledge Governance
  - Data Governance
  - Task Governance
  - Execution Governance
  - Security Governance
  - Agent Security Governance
  - Identity and Access Governance
  - Authorization Governance
  - Policy Governance
  - Approval Governance
  - Compliance Governance
  - Risk Governance
  - Evaluation Governance
  - Quality Governance
  - Benchmark Governance
  - Lifecycle Governance
  - Project Governance
  - Customer Governance
  - Tenant Governance
  - Environment Governance
  - Production Governance
  - Evidence Governance
  - Audit Governance
  - Observability Governance
  - Documentation Governance

created: 2026-08-10
updated: 2026-08-10

classification: Internal

audience:
  - Founder
  - Founder Office
  - Enterprise Governance
  - Enterprise Architects
  - AI Architects
  - Agent Architects
  - Agent Framework Engineers
  - Capability Engineers
  - AI Workforce Designers
  - Agent Developers
  - Agent Runtime Engineers
  - Skill Engineers
  - Tool Engineers
  - Model Engineers
  - Prompt Engineers
  - Memory Engineers
  - Knowledge Engineers
  - Data Engineers
  - Security Engineers
  - Evaluation Engineers
  - Quality Engineers
  - Project Owners
  - Product Owners
  - Customer Operations
  - Security Auditors
  - Compliance Auditors
  - Documentation Maintainers
  - Authorized AI Agents
  - Authorized Internal Applications

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
  - ../capabilities/capability-framework.md
  - ../capabilities/capability-mapping.md
  - ../capabilities/capability-registry.md
  - ../evaluation/benchmarking.md
  - ../evaluation/performance-evaluation.md
  - ../evaluation/quality-scoring.md
  - ../execution/execution-engine.md
  - ../execution/task-execution.md
  - ../governance/agent-governance.md
  - ../governance/compliance.md
  - ../governance/policies.md
  - ../learning/continuous-learning.md
  - ../learning/self-improvement.md
  - ../lifecycle/agent-creation.md
  - ../lifecycle/agent-lifecycle.md
  - ../memory/agent-memory.md
  - ../monitoring/audit-logs.md
  - ../monitoring/performance-monitoring.md
  - ../personas/persona-framework.md
  - ../planning/task-planning.md
  - ../registry/agent-catalog.md
  - ../registry/agent-discovery.md
  - ../registry/agent-registry.md
  - ../security/access-control.md
  - ../security/agent-security.md
  - ../security/identity-management.md
  - ../skills/skill-catalog.md
  - ../skills/skill-development.md
  - ../skills/skill-framework.md
  - ./agent-template.md
  - ../../01-governance/AI-CONSTITUTION.md
  - ../../19-ai-workforce/AGENT-CAPACITY-BASELINE.md
  - ../../19-ai-workforce/C-SUITE-AGENT-REGISTRY.md
  - ../../19-ai-workforce/VERIFIABLE-WORK-ENVELOPE.md
  - ../../20-ai-operating-system/README.md
  - ../../21-memory-engine/README.md

related_documents:
  - ./agent-template.md
  - ./persona-template.md
  - ./skill-template.md
  - ../capabilities/capability-framework.md
  - ../capabilities/capability-mapping.md
  - ../capabilities/capability-registry.md
  - ../skills/skill-framework.md
  - ../registry/agent-registry.md
  - ../security/access-control.md
  - ../tools/tool-permissions.md
  - ../evaluation/performance-evaluation.md
  - ../planning/task-planning.md

related_modules:
  - ../../05-workforce/
  - ../../09-security/
  - ../../14-quality/
  - ../../16-knowledge/
  - ../../19-ai-workforce/
  - ../../20-ai-operating-system/
  - ../../21-memory-engine/
  - ../../23-multi-agent-system/
  - ../../27-model-management/
  - ../../29-observability-platform/
  - ../../30-enterprise-governance/
  - ../../31-enterprise-architecture/
  - ../../32-platform-services/
  - ../../40-enterprise-operations/
  - ../../41-security-platform/
  - ../../42-data-platform/
  - ../../44-enterprise-ai/
  - ../../46-enterprise-quality/
  - ../../49-enterprise-standards/
  - ../../50-enterprise-templates/

review_cycle:
  - At Every Material Capability Definition Schema Change
  - At Every Capability Identity or Versioning Change
  - At Every Capability Taxonomy Change
  - At Every Capability-to-Skill Relationship Change
  - At Every Capability Prerequisite or Dependency Change
  - At Every Tool, Model, Prompt, Memory, Knowledge or Data Requirement Change
  - At Every Task-Class Applicability Change
  - At Every Capability Scope or Risk Model Change
  - At Every Capability Security Requirement Change
  - At Every Capability Evaluation Standard Change
  - At Every Capability Lifecycle Change
  - At Every Production Capability Definition Gate Change
  - Before Controlled Capability Pilot
  - Before Production Capability Assignment
  - Before Canonical Promotion
  - Quarterly During Active Build
  - Annually During Stable Operation

canonical: false

tags:
  - agent-framework
  - templates
  - capability-template
  - capabilities
  - capability-definition
  - capability-schema
  - capability-versioning
  - skills
  - tools
  - models
  - memory
  - tasks
  - security
  - tenant-isolation
  - evidence
  - audit
  - production-readiness
---

# Mianx.ai Agent Capability Template

> **This document defines the standard enterprise template used to
> author one Mianx.ai individual-Agent Capability Definition.**
>
> A Capability Definition should answer:
>
> ```text
> WHAT CAPABILITY IS THIS?
>
> WHAT IS ITS STABLE ID?
>
> WHAT VERSION?
>
> WHY DOES IT EXIST?
>
> WHAT OUTCOME
> DOES IT SUPPORT?
>
> WHAT DOES IT
> NOT AUTHORIZE?
>
> WHAT AGENT TYPES
> MAY FIND IT RELEVANT?
>
> WHAT ROLES
> MAY REQUIRE IT?
>
> WHAT SKILLS
> SUPPORT IT?
>
> WHAT PREREQUISITES?
>
> WHAT DEPENDENCIES?
>
> WHAT TOOLS
> MAY BE REQUIRED?
>
> WHAT MODELS
> MAY SUPPORT IT?
>
> WHAT PROMPTS,
> MEMORY,
> KNOWLEDGE,
> AND DATA
> MAY BE REQUIRED?
>
> WHAT TASK CLASSES
> MAY REQUIRE IT?
>
> WHAT PROJECT?
>
> WHAT CUSTOMER?
>
> WHAT TENANT?
>
> WHAT ENVIRONMENT?
>
> WHAT RISK?
>
> WHAT APPROVAL?
>
> WHAT SECURITY?
>
> WHAT EVALUATION?
>
> WHAT EVIDENCE?
>
> WHAT LIFECYCLE?
>
> WHAT IS ACTUALLY
> IMPLEMENTED AND VERIFIED?
> ```
>
> It must never conclude:
>
> ```text
> "THE CAPABILITY
> IS DEFINED,
> THEREFORE
> AN AGENT HAS IT
> OR MAY USE IT."
> ```
>
> Permanent rule:
>
> ```text
> CAPABILITY TEMPLATE
> =
> CAPABILITY-DEFINITION
> AUTHORING STANDARD
>
> NOT
>
> CAPABILITY GRANT,
> PERMISSION,
> OR
> EXECUTION AUTHORITY.
> ```

---

# 1. Purpose

This document defines:

```text
THE STANDARD CAPABILITY-DEFINITION TEMPLATE

CAPABILITY IDENTITY

CAPABILITY VERSIONING

CAPABILITY PURPOSE

CAPABILITY OUTCOME SEMANTICS

CAPABILITY NON-GOALS

CAPABILITY TAXONOMY

CAPABILITY CLASSIFICATION

AGENT-TYPE APPLICABILITY

ROLE APPLICABILITY

SUPPORTING SKILLS

PREREQUISITE SKILLS

PREREQUISITE CAPABILITIES

DEPENDENT CAPABILITIES

TOOL REQUIREMENTS

MODEL REQUIREMENTS

PROMPT DEPENDENCIES

MEMORY REQUIREMENTS

KNOWLEDGE REQUIREMENTS

DATA REQUIREMENTS

TASK-CLASS APPLICABILITY

INPUT EXPECTATIONS

OUTPUT EXPECTATIONS

SIDE-EFFECT CHARACTERISTICS

PROJECT / CUSTOMER / TENANT / ENVIRONMENT APPLICABILITY

AUTONOMY IMPLICATIONS

RISK CLASSIFICATION

APPROVAL REQUIREMENTS

SECURITY REQUIREMENTS

COMPLIANCE REQUIREMENTS

EVALUATION CRITERIA

QUALITY EXPECTATIONS

PROFICIENCY RELATIONSHIPS

EVIDENCE REQUIREMENTS

AUDIT REQUIREMENTS

OWNERSHIP

STEWARDSHIP

PROVENANCE

LIFECYCLE

DEPRECATION

SUPERSESSION

REVOCATION

RUNTIME TRUTH

PRODUCTION HARD STOPS
```

---

# 2. Capability Template Mission

The mission is:

> **Ensure every Mianx.ai Agent Capability is described through a
> consistent, reusable, versioned and governable enterprise structure
> before it can be registered, assigned, evaluated, activated or used
> as an input to Agent eligibility, Task planning, Agent Discovery or
> runtime execution decisions.**

---

# 3. Core Capability Template Equation

```text
TRUSTWORTHY CAPABILITY DEFINITION
=
STABLE IDENTITY
+
VERSION
+
CLEAR PURPOSE
+
BOUNDED OUTCOME
+
NON-GOALS
+
TAXONOMY
+
SKILL RELATIONSHIPS
+
PREREQUISITES
+
DEPENDENCIES
+
TOOL / MODEL / MEMORY / DATA REQUIREMENTS
+
TASK APPLICABILITY
+
SCOPE
+
RISK
+
SECURITY
+
EVALUATION
+
EVIDENCE
+
LIFECYCLE
+
RUNTIME TRUTH
```

---

# 4. Permanent Capability Template Boundaries

```text
CAPABILITY TEMPLATE
≠
CAPABILITY

CAPABILITY DEFINITION
≠
CAPABILITY GRANT

CAPABILITY REGISTERED
≠
CAPABILITY ASSIGNED

CAPABILITY ASSIGNED
≠
CAPABILITY ACTIVE

CAPABILITY ACTIVE
≠
TASK AUTHORIZED

CAPABILITY VERIFIED
≠
ACTION AUTHORIZED

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
AUTHORITY

CAPABILITY
≠
AUTONOMY

CAPABILITY
≠
PRODUCTION AUTHORIZATION
```

---

# 5. What Is a Capability Definition?

A Capability Definition is:

> **A governed specification describing a class of outcome or work an
> Agent may be designed and evaluated to support within explicit
> Skill, Tool, Model, data, Security, scope, approval, and authorization
> boundaries.**

---

# 6. What a Capability Definition Is Not

A Capability Definition is not:

```text
AN ACCESS-CONTROL GRANT

A SECURITY ROLE

A TOOL CREDENTIAL

A TASK ASSIGNMENT

A SKILL PROFICIENCY RECORD

AN AUTONOMY GRANT

A PRODUCTION GRANT

A MODEL APPROVAL

A DATA-ACCESS POLICY

A TENANT-ACCESS GRANT
```

---

# 7. Capability vs Skill

Permanent distinction:

```text
CAPABILITY
=
WHAT CLASS OF OUTCOME
AN AGENT MAY BE
GOVERNED TO SUPPORT

SKILL
=
WHAT REUSABLE
TECHNIQUE OR COMPETENCE
HELPS REALIZE
THAT CAPABILITY
```

---

# 8. Capability/Skill Boundary

```text
SKILL SUPPORTS CAPABILITY
≠
CAPABILITY GRANTED

CAPABILITY REQUIRES SKILL
≠
SKILL ASSIGNED
```

---

# 9. Capability vs Role

```text
ROLE
=
ORGANIZATIONAL RESPONSIBILITY

CAPABILITY
=
BOUNDED WORK / OUTCOME ABILITY
```

---

# 10. Role Boundary

```text
CAPABILITY RELEVANT TO ROLE
≠
ROLE AUTHORITY
```

---

# 11. Capability vs Permission

```text
CAPABILITY
≠
PERMISSION
```

An Agent may have demonstrated competence while still being denied an
action.

---

# 12. Capability vs Tool

```text
CAPABILITY
≠
TOOL
```

---

# 13. Tool Boundary

```text
CAPABILITY REQUIRES TOOL
≠
TOOL AUTHORIZED
```

---

# 14. Capability vs Model

```text
CAPABILITY
≠
MODEL
```

---

# 15. Model Boundary

```text
MODEL SUPPORTS CAPABILITY
≠
MODEL AUTHORIZED
```

---

# 16. Capability vs Task

```text
CAPABILITY
≠
TASK
```

A Task may require one or more Capabilities.

---

# 17. Task Boundary

```text
TASK REQUIRES CAPABILITY
≠
TASK AUTHORIZED
```

---

# 18. Stable Capability Identity

Every Capability Definition should have a stable:

```text
capability_id
```

---

# 19. Capability ID Boundary

```text
CAPABILITY NAME
≠
CAPABILITY ID
```

---

# 20. Recommended Capability ID Pattern

Potential:

```text
CAP-<DOMAIN>-<FUNCTION>-001
```

Exact taxonomy belongs to Capability Registry governance.

---

# 21. Capability Version

Capability Definition must declare a Version.

```text
version: x.y.z
```

---

# 22. Version Boundary

```text
CAPABILITY V1
≠
CAPABILITY V2
```

where material meaning, requirements or risk differs.

---

# 23. Material Version Changes

A new Version may be required when changing:

```text
PURPOSE

EXPECTED OUTCOME

NON-GOALS

TASK APPLICABILITY

SKILL REQUIREMENTS

TOOL REQUIREMENTS

MODEL REQUIREMENTS

SECURITY CONSTRAINTS

DATA REQUIREMENTS

PROJECT / TENANT SCOPE

RISK CLASSIFICATION

EVALUATION CRITERIA
```

---

# 24. Version Integrity

```text
MATERIAL CHANGE
+
UNCHANGED VERSION
=
DEFINITION-INTEGRITY RISK
```

---

# 25. Capability Status

Potential Definition statuses:

```text
Draft

Under Review

Approved

Deprecated

Superseded

Revoked

Retired
```

Exact state machine is governed elsewhere.

---

# 26. Status Boundary

```text
CAPABILITY STATUS: Approved
≠
AGENT CAPABILITY ACTIVE
```

---

# 27. Capability Name

Name should be:

```text
CLEAR

SPECIFIC

OUTCOME-ORIENTED

NON-MISLEADING

NOT A ROLE NAME

NOT A TOOL NAME
UNLESS CLEARLY QUALIFIED
```

---

# 28. Capability Purpose

Purpose answers:

```text
WHY DOES THIS
CAPABILITY EXIST?
```

---

# 29. Purpose Boundary

```text
CAPABILITY PURPOSE
≠
AUTHORIZATION PURPOSE
```

---

# 30. Expected Outcomes

Capability should define bounded expected outcomes.

Example:

```text
Evaluate a proposed API contract
for structural consistency,
compatibility risk,
and policy-defined quality concerns.
```

---

# 31. Outcome Boundary

```text
EXPECTED OUTCOME DEFINED
≠
OUTCOME ACHIEVED
```

---

# 32. Non-Goals

Every material Capability should explicitly identify boundaries.

Example:

```text
CAPABILITY:
production-deployment-planning

NON-GOAL:
production-deployment-execution
```

---

# 33. Non-Goal Boundary

```text
NOT IN NON-GOALS
≠
AUTOMATICALLY AUTHORIZED
```

---

# 34. Capability Taxonomy

Potential dimensions:

```text
ENGINEERING

SECURITY

DATA

AI / ML

PRODUCT

DESIGN

OPERATIONS

MARKETING

SEO

SALES

FINANCE

HR

LEGAL

SUPPORT

RESEARCH

QUALITY

ANALYTICS
```

Exact taxonomy is not canonical until approved.

---

# 35. Capability Classification

Potential dimensions:

```text
ADVISORY

ANALYTICAL

PLANNING

EXECUTION-SUPPORT

SIDE-EFFECTING

SECURITY-SENSITIVE

PRODUCTION-SENSITIVE

CUSTOMER-SENSITIVE

TENANT-SENSITIVE
```

---

# 36. Classification Boundary

```text
SIDE-EFFECTING CAPABILITY
≠
SIDE EFFECT AUTHORIZED
```

---

# 37. Capability Granularity

Avoid overly broad definitions such as:

```text
DO SOFTWARE ENGINEERING
```

Prefer bounded capabilities such as:

```text
review-api-contract

analyze-query-plan

validate-deployment-readiness
```

where appropriate.

---

# 38. Granularity Boundary

```text
MORE CAPABILITIES
≠
BETTER CAPABILITY MODEL
```

---

# 39. Agent-Type Applicability

Capability Definition may identify typical Agent Types:

```text
EXECUTIVE

MANAGER

SPECIALIST

SYSTEM

WORKER
```

---

# 40. Agent-Type Boundary

```text
CAPABILITY APPLIES TO SYSTEM AGENT
≠
SYSTEM ADMIN AUTHORITY
```

---

# 41. Role Applicability

Capability may identify organizational Roles that commonly need it.

---

# 42. Role Applicability Boundary

```text
ROLE NEEDS CAPABILITY
≠
ALL ROLE AGENTS
HAVE CAPABILITY
```

---

# 43. Supporting Skills

Capability Definition should reference Skills that help realize it.

Conceptual:

```yaml
skills:
  required: []
  preferred: []
```

---

# 44. Required Skill Boundary

```text
CAPABILITY REQUIRES SKILL X
≠
AGENT HAS SKILL X
```

---

# 45. Skill Proficiency

Capability may specify minimum Skill proficiency where justified.

---

# 46. Proficiency Boundary

```text
MINIMUM PROFICIENCY DEFINED
≠
AGENT PROFICIENCY VERIFIED
```

---

# 47. Prerequisite Capabilities

A Capability may depend on another Capability.

---

# 48. Prerequisite Capability Boundary

```text
PREREQUISITE CAPABILITY LISTED
≠
PREREQUISITE SATISFIED
```

---

# 49. Capability Dependency Graph

Dependency relations should be explicit and cycle-aware.

---

# 50. Circular Dependency Boundary

```text
CAPABILITY A REQUIRES B
+
B REQUIRES A
≠
VALID AUTOMATICALLY
```

---

# 51. Tool Requirements

Capability Definition may identify Tool classes needed to realize the
Capability.

---

# 52. Tool Requirement Structure

Potential:

```yaml
tools:
  required:
    - tool_ref: TOOL-EXAMPLE
      purpose: <Purpose>
      operations: []
  optional: []
```

---

# 53. Tool Requirement Boundary

```text
TOOL REQUIRED
≠
TOOL CONNECTED

TOOL CONNECTED
≠
TOOL AUTHORIZED

TOOL AUTHORIZED
≠
ALL OPERATIONS AUTHORIZED
```

---

# 54. Tool Side Effects

Capability Definition should note whether Tool usage could cause:

```text
CREATE

UPDATE

DELETE

SEND

DEPLOY

FINANCIAL COMMITMENT

SECURITY CHANGE
```

---

# 55. Tool Side-Effect Boundary

```text
CAPABILITY USES
SIDE-EFFECTING TOOL
≠
SIDE EFFECT AUTHORIZED
```

---

# 56. Model Requirements

Capability may define required Model characteristics.

Potential:

```text
REASONING

VISION

STRUCTURED OUTPUT

LONG CONTEXT

MULTILINGUAL

CODE UNDERSTANDING
```

---

# 57. Model Requirement Boundary

```text
MODEL REQUIREMENT
≠
MODEL APPROVAL
```

---

# 58. Model Version

Where Model behavior materially affects Capability quality, Version
compatibility should be considered.

---

# 59. Model Version Boundary

```text
CAPABILITY VERIFIED
WITH MODEL V1
≠
VERIFIED WITH MODEL V2
```

---

# 60. Prompt Dependencies

Capability may rely on Prompt OS components.

---

# 61. Prompt Boundary

```text
PROMPT REFERENCE
≠
PROMPT LOADED

PROMPT LOADED
≠
CAPABILITY VERIFIED
```

---

# 62. Memory Requirements

Capability may require governed Memory.

Potential:

```text
WORKING

PROJECT

DOMAIN

TASK

HISTORICAL
```

---

# 63. Memory Boundary

```text
CAPABILITY NEEDS MEMORY
≠
MEMORY ACCESS GRANTED
```

---

# 64. Knowledge Requirements

Capability may require authoritative Knowledge.

---

# 65. Knowledge Boundary

```text
KNOWLEDGE RETRIEVED
≠
KNOWLEDGE TRUE

INDEXED
≠
CANONICAL
```

---

# 66. Data Requirements

Capability Definition should specify required data classes where
material.

Potential:

```yaml
data:
  required_classes: []
  prohibited_classes: []
  minimum_required: []
  minimization_required: true
```

---

# 67. Data Boundary

```text
CAPABILITY NEEDS DATA
≠
DATA ACCESS GRANTED
```

---

# 68. Data Minimization

Capability Definition should require no broader data than necessary.

---

# 69. Input Expectations

Capability may describe valid input characteristics.

Potential:

```text
INPUT TYPE

REQUIRED FIELDS

QUALITY REQUIREMENTS

TRUST CLASSIFICATION

FRESHNESS

SCOPE
```

---

# 70. Input Boundary

```text
INPUT PROVIDED
≠
INPUT TRUSTED
```

---

# 71. Output Expectations

Capability should define output type and quality expectations.

Potential:

```text
ANALYSIS

RECOMMENDATION

PLAN

STRUCTURED RECORD

REPORT

VALIDATION RESULT
```

---

# 72. Output Boundary

```text
CAPABILITY OUTPUT GENERATED
≠
OUTPUT CORRECT

OUTPUT CORRECT
≠
ACTION AUTHORIZED
```

---

# 73. Task-Class Applicability

Capability should identify intended Task classes.

Potential:

```yaml
task_classes:
  supported: []
  unsupported: []
  prohibited: []
```

---

# 74. Task-Class Boundary

```text
SUPPORTED TASK CLASS
≠
EVERY TASK INSTANCE AUTHORIZED
```

---

# 75. Capability Composition

A Task may require multiple Capabilities.

```text
TASK
↓
CAPABILITY A
+
CAPABILITY B
+
CAPABILITY C
```

---

# 76. Composition Boundary

```text
CAPABILITY COMPOSITION
≠
PERMISSION UNION
```

---

# 77. Capability Conflict

Capabilities may conflict in:

```text
SECURITY

TOOL CHOICE

DATA REQUIREMENTS

OUTPUT REQUIREMENTS

RISK POSTURE

SIDE-EFFECT POLICY
```

---

# 78. Conflict Boundary

```text
CAPABILITY CONFLICT
≠
AGENT MAY IGNORE
MORE RESTRICTIVE RULE
```

---

# 79. Project Applicability

Capability Definition may be:

```text
GLOBAL

PROJECT-SPECIFIC

INDUSTRY-SPECIFIC
```

---

# 80. Project Boundary

```text
CAPABILITY APPLICABLE
TO PROJECT A
≠
PROJECT A ACCESS
```

---

# 81. Customer Applicability

Some Capabilities may be Customer-specific.

---

# 82. Customer Boundary

```text
CUSTOMER A CAPABILITY
≠
CUSTOMER B ACCESS
```

---

# 83. Tenant Applicability

Capability may be constrained to a Tenant or Tenant class.

---

# 84. Tenant Boundary

```text
TENANT A CAPABILITY
≠
TENANT B AUTHORITY
```

---

# 85. Shared Capability Definition

One generic Capability Definition may support many Tenants.

---

# 86. Shared Capability Boundary

```text
SHARED CAPABILITY DEFINITION
≠
SHARED TENANT DATA

SHARED CAPABILITY DEFINITION
≠
SHARED MEMORY

SHARED CAPABILITY DEFINITION
≠
SHARED TOOL CREDENTIALS

SHARED CAPABILITY DEFINITION
≠
SHARED AUTHORITY
```

---

# 87. Environment Applicability

Capability Definition should identify eligible environments.

Potential:

```text
DEVELOPMENT

TEST

STAGING

PRODUCTION-CANDIDATE
```

---

# 88. Environment Boundary

```text
STAGING CAPABILITY
≠
PRODUCTION CAPABILITY AUTHORIZATION
```

---

# 89. Production-Sensitive Capability

Examples may include:

```text
production-deployment

production-database-administration

security-policy-change

credential-rotation

financial-commitment
```

---

# 90. Production Boundary

```text
PRODUCTION-SENSITIVE CAPABILITY
DEFINED
≠
PRODUCTION AUTHORIZED
```

---

# 91. Autonomy Implications

Capability Definition may state a maximum autonomy category it could
support.

---

# 92. Autonomy Boundary

```text
CAPABILITY SUPPORTS
AUTONOMOUS EXECUTION
≠
AUTONOMY GRANTED
```

---

# 93. Approval Requirements

Capability may declare action classes that require approval.

Potential:

```text
WRITE

DELETE

DEPLOY

FINANCIAL COMMITMENT

CUSTOMER COMMUNICATION

SECURITY CHANGE

PRODUCTION CHANGE
```

---

# 94. Approval Boundary

```text
APPROVAL REQUIRED
≠
APPROVAL EXISTS
```

---

# 95. Risk Classification

Capability should classify material risk.

Potential conceptual scale:

```text
LOW

MEDIUM

HIGH

CRITICAL
```

---

# 96. Risk Boundary

```text
RISK CLASSIFIED
≠
RISK ACCEPTED
```

---

# 97. Security Requirements

Capability Definition may include:

```text
LEAST PRIVILEGE

NO CROSS-TENANT ACCESS

NO SECRET DISCLOSURE

APPROVAL BEFORE SIDE EFFECT

NO POLICY OVERRIDE

NO PRODUCTION BYPASS

AUDIT REQUIRED

PROMPT-INJECTION DEFENSE

DATA MINIMIZATION
```

---

# 98. Security Boundary

```text
SECURITY REQUIREMENT
≠
SECURITY CONTROL IMPLEMENTED
```

---

# 99. Identity Requirements

High-risk Capability use may require trusted Agent identity and
allocation context.

---

# 100. Identity Boundary

```text
AGENT CLAIMS CAPABILITY
≠
AGENT IDENTITY VERIFIED
```

---

# 101. Access-Control Requirements

Capability Definition may reference authorization policies.

---

# 102. Access-Control Boundary

```text
CAPABILITY POLICY REF
≠
ACCESS GRANT
```

---

# 103. Compliance Requirements

Capability may identify relevant:

```text
DATA PROTECTION

PRIVACY

SECURITY

AUDIT

RETENTION

INDUSTRY
```

requirements.

---

# 104. Compliance Boundary

```text
COMPLIANCE REQUIREMENT
≠
COMPLIANCE VERIFIED
```

---

# 105. Evaluation Criteria

Capability Definition should describe how capability fitness may be
evaluated.

Potential:

```text
CORRECTNESS

COMPLETENESS

TASK FIT

SECURITY

POLICY COMPLIANCE

ROBUSTNESS

EVIDENCE QUALITY

LATENCY

COST
```

---

# 106. Evaluation Boundary

```text
EVALUATION CRITERIA DEFINED
≠
AGENT CAPABILITY VERIFIED
```

---

# 107. Capability Verification

Agent-specific Capability verification belongs outside the Definition
itself.

---

# 108. Verification Boundary

```text
CAPABILITY DEFINITION VERIFIED
≠
AGENT CAPABILITY VERIFIED
```

---

# 109. Benchmark References

Capability may reference benchmarks where relevant.

---

# 110. Benchmark Boundary

```text
BENCHMARK PASS
≠
CAPABILITY AUTHORITY

BENCHMARK PASS
≠
PRODUCTION AUTHORIZATION
```

---

# 111. Quality Expectations

Capability Definition may require:

```text
CORRECTNESS

TRACEABILITY

CONSISTENCY

ROBUSTNESS

SECURITY

REPRODUCIBILITY
```

---

# 112. Quality Boundary

```text
QUALITY TARGET
≠
QUALITY VERIFIED
```

---

# 113. Evidence Requirements

Capability Definition should describe acceptable Evidence for
material verification claims.

Potential:

```text
TEST RESULTS

BENCHMARK RESULTS

TASK OUTCOME EVIDENCE

QUALITY EVALUATION

SECURITY REVIEW

HUMAN REVIEW

TOOL RESULT REFERENCES
```

---

# 114. Evidence Boundary

```text
CAPABILITY CLAIM
≠
CAPABILITY EVIDENCE
```

---

# 115. Capability Provenance

Capability Definition should record origin.

Potential:

```text
FOUNDER DIRECTIVE

ENGINEERING NEED

WORKFORCE DESIGN

PROJECT REQUIREMENT

CUSTOMER REQUIREMENT

INDUSTRY TEMPLATE

RESEARCH

AGENT-PROPOSED CANDIDATE
```

---

# 116. Provenance Boundary

```text
AGENT-PROPOSED CAPABILITY
≠
APPROVED CAPABILITY
```

---

# 117. Capability Ownership

Every Capability Definition should identify accountable ownership.

---

# 118. Owner Boundary

```text
CAPABILITY OWNER
≠
UNLIMITED PLATFORM AUTHORITY
```

---

# 119. Capability Lifecycle

Potential lifecycle:

```text
DRAFT

UNDER REVIEW

APPROVED

ACTIVE

DEPRECATED

REVOKED

SUPERSEDED

RETIRED

ARCHIVED
```

Exact state machine belongs to Capability Governance.

---

# 120. Lifecycle Boundary

```text
APPROVED
≠
ASSIGNED

ASSIGNED
≠
ACTIVE

ACTIVE
≠
AUTHORIZED

DEPRECATED
≠
DELETED

REVOKED
≠
HISTORY ERASED

RETIRED
≠
DELETED
```

---

# 121. Capability Deprecation

Deprecation may be triggered by:

```text
BETTER CAPABILITY

SECURITY ISSUE

ARCHITECTURE CHANGE

TOOL OBSOLESCENCE

MODEL CHANGE

QUALITY FAILURE

POLICY CHANGE
```

---

# 122. Deprecation Boundary

```text
DEPRECATED
≠
IMMEDIATE SILENT REMOVAL
```

---

# 123. Capability Supersession

A Capability may be replaced by another Definition or Version.

---

# 124. Supersession Boundary

```text
SUPERSEDED
≠
ALL AGENTS AUTO-MIGRATED
```

---

# 125. Capability Revocation

Unsafe Capability Definition may need revocation.

---

# 126. Revocation Boundary

```text
CAPABILITY REVOKED
≠
ALL ASSIGNMENTS
ALREADY DISABLED
```

until propagation is verified.

---

# 127. Capability Inheritance

Future capability templates may inherit approved metadata.

---

# 128. Inheritance Boundary

```text
INHERITED CAPABILITY
≠
INHERITED AUTHORITY
```

---

# 129. Capability Override

Local capability profiles should not remove mandatory Security or scope
controls without Governance.

---

# 130. Override Boundary

```text
CHILD CAPABILITY
CANNOT
SILENTLY REMOVE
PARENT SECURITY
```

---

# 131. Capability Composition in Templates

Capability Definition may compose references from:

```text
BASE CAPABILITY PROFILE

DOMAIN PROFILE

SECURITY PROFILE

SKILL SET

TOOL PROFILE

PROJECT PROFILE
```

---

# 132. Template Composition Boundary

```text
CAPABILITY TEMPLATE COMPOSITION
≠
PERMISSION COMPOSITION
```

---

# 133. Multi-Project Capability

A generic Capability can be reused across Projects.

---

# 134. Multi-Project Boundary

```text
REUSABLE CAPABILITY
≠
GLOBAL PROJECT ACCESS
```

---

# 135. Multi-Customer Capability

Customer-specific procedures must remain scoped.

---

# 136. Multi-Tenant Capability

Tenant-private Capability metadata must not leak.

---

# 137. Tenant Isolation Rule

```text
CAPABILITY TEMPLATE
MUST NOT
GLOBALIZE
TENANT-PRIVATE
DATA,
PROCEDURES,
CREDENTIALS,
OR
SECURITY DETAILS.
```

---

# 138. Industry Capabilities

Industry Operating Systems may define Capabilities such as:

```text
RESTAURANT DEMAND ANALYSIS

POULTRY FLOCK PERFORMANCE REVIEW

HOSPITAL CAPACITY ANALYSIS

SCHOOL ATTENDANCE ANALYSIS
```

Examples do not prove implementation.

---

# 139. Industry Boundary

```text
INDUSTRY CAPABILITY
≠
MIANX CORE PLATFORM AUTHORITY
```

---

# 140. Capability Definition Security Threats

Potential threats include:

```text
CAPABILITY AUTHORITY INFLATION

PRIVILEGED CAPABILITY INJECTION

SKILL REQUIREMENT INFLATION

TOOL-PERMISSION INJECTION

MODEL-GOVERNANCE BYPASS

MEMORY-SCOPE INFLATION

DATA-SCOPE INFLATION

TENANT-SCOPE INFLATION

PROJECT-SCOPE INFLATION

PRODUCTION-SCOPE SPOOFING

AUTONOMY INFLATION

APPROVAL BYPASS

SECURITY CONTROL REMOVAL

UNSAFE CAPABILITY COMPOSITION

MALICIOUS INHERITANCE

VERSION TAMPERING

PROVENANCE TAMPERING

STALE CAPABILITY USE
```

---

# 141. Capability Authority Inflation Test

Template defines:

```text
capability:
  unrestricted-enterprise-control
```

Expected:

```text
NO AUTHORITY CREATED.
```

---

# 142. Skill Requirement Inflation Test

Capability lists every privileged Skill.

Expected:

```text
NO SKILL ASSIGNMENT
NO PROFICIENCY
NO AUTHORITY
```

---

# 143. Tool Permission Injection Test

Capability definition says:

```text
tool_access:
  production-admin: unrestricted
```

Expected no Tool permission.

---

# 144. Model Governance Bypass Test

Capability says:

```text
allow_any_model: true
```

Expected Model Governance remains authoritative.

---

# 145. Memory Scope Inflation Test

Capability changes:

```text
memory_scope: global
```

Expected no global Memory access.

---

# 146. Data Scope Inflation Test

Capability requires:

```text
all_customer_data
```

Expected no access without independent authorization and minimization.

---

# 147. Project Scope Inflation Test

Capability moves from:

```text
Project A
```

to:

```text
all Projects
```

Expected no automatic Agent authority expansion.

---

# 148. Tenant Scope Inflation Test

Capability changes:

```text
tenant_scope:
  from: tenant-a
  to: all
```

Expected governed review and no automatic runtime expansion.

---

# 149. Production Scope Spoof Test

Capability definition says:

```text
production_authorized: true
```

Expected no Production authorization.

---

# 150. Autonomy Inflation Test

Capability Definition says:

```text
autonomy: unlimited
```

Expected no autonomy grant.

---

# 151. Approval Bypass Test

Capability says:

```text
approval_required: false
```

for a class whose governing policy requires approval.

Expected governing policy wins.

---

# 152. Security Removal Test

Child Capability removes:

```text
tenant_isolation

audit_required

approval_before_write
```

Expected blocked or escalated.

---

# 153. Version-Tampering Test

Material Capability Definition changes without Version update.

Expected integrity failure.

---

# 154. Stale Capability Test

Superseded/revoked Capability Definition is used for new Agent
assignment.

Expected current lifecycle state revalidated.

---

# 155. Provenance Spoof Test

Unknown actor creates a valid-looking Capability Definition.

Expected schema validity alone does not create trust.

---

# 156. Capability Definition Evidence

Material Capability Definition may preserve:

```text
CAPABILITY ID

VERSION

STATUS

NAME

DESCRIPTION

PURPOSE

EXPECTED OUTCOMES

NON-GOALS

CATEGORY

CLASSIFICATION

AGENT-TYPE REFS

ROLE REFS

SKILL REFS

PREREQUISITE CAPABILITY REFS

DEPENDENCY REFS

TOOL REQUIREMENTS

MODEL REQUIREMENTS

PROMPT REFS

MEMORY REQUIREMENTS

KNOWLEDGE REQUIREMENTS

DATA REQUIREMENTS

INPUT EXPECTATIONS

OUTPUT EXPECTATIONS

TASK-CLASS REFS

PROJECT SCOPE

CUSTOMER SCOPE

TENANT SCOPE

ENVIRONMENT

SIDE-EFFECT CLASS

RISK CLASSIFICATION

AUTONOMY IMPLICATIONS

APPROVAL REQUIREMENTS

SECURITY REQUIREMENTS

COMPLIANCE REQUIREMENTS

EVALUATION CRITERIA

QUALITY EXPECTATIONS

EVIDENCE REQUIREMENTS

OWNER

STEWARD

PROVENANCE

CREATED AT

UPDATED AT
```

---

# 157. Evidence Boundary II

```text
CAPABILITY DEFINITION EVIDENCE
≠
AGENT CAPABILITY EVIDENCE

AGENT CAPABILITY EVIDENCE
≠
ACTION AUTHORIZATION EVIDENCE
```

---

# 158. Capability Template Audit Events

Potential:

```text
CAPABILITY_TEMPLATE_CREATED

CAPABILITY_DEFINITION_DRAFTED

CAPABILITY_VERSION_CREATED

CAPABILITY_VALIDATION_REQUESTED

CAPABILITY_VALIDATED

CAPABILITY_REVIEW_REQUESTED

CAPABILITY_APPROVED

CAPABILITY_REJECTED

CAPABILITY_UPDATED

CAPABILITY_SKILL_MAPPING_CHANGED

CAPABILITY_PREREQUISITE_CHANGED

CAPABILITY_TOOL_REQUIREMENT_CHANGED

CAPABILITY_MODEL_REQUIREMENT_CHANGED

CAPABILITY_SCOPE_CHANGED

CAPABILITY_SECURITY_CHANGED

CAPABILITY_RISK_CHANGED

CAPABILITY_DEPRECATED

CAPABILITY_SUPERSEDED

CAPABILITY_REVOKED

CAPABILITY_RETIRED

CAPABILITY_TENANT_SCOPE_CHANGE_BLOCKED

CAPABILITY_PRODUCTION_SCOPE_CHANGE_BLOCKED

CAPABILITY_SECURITY_DOWNGRADE_BLOCKED

CAPABILITY_VERSION_TAMPERING_DETECTED
```

---

# 159. Audit Attribution

Potential:

```text
CAPABILITY ID

VERSION

ACTOR

OWNER

PROJECT

CUSTOMER

TENANT

ENVIRONMENT

EVENT

BEFORE REF

AFTER REF

APPROVAL REF

EVIDENCE REF

REASON

TIME
```

---

# 160. Audit Data Boundary

Audit must not unnecessarily record:

```text
RAW SECRETS

TOKENS

CREDENTIALS

PRIVATE CUSTOMER DATA

PRIVATE TENANT DATA

UNNECESSARY SECURITY DETAILS
```

---

# 161. Capability Template Observability

Authorized operators should eventually answer:

```text
HOW MANY CAPABILITY DEFINITIONS EXIST?

HOW MANY ARE DRAFT?

HOW MANY ARE APPROVED?

HOW MANY ARE DEPRECATED?

HOW MANY ARE REVOKED?

HOW MANY ARE SUPERSEDED?

HOW MANY HAVE NO OWNER?

HOW MANY HAVE MISSING SKILL REFERENCES?

HOW MANY HAVE BROKEN PREREQUISITES?

HOW MANY HAVE INVALID TOOL REFERENCES?

HOW MANY HAVE STALE MODEL REQUIREMENTS?

HOW MANY HAVE UNKNOWN TENANT SCOPE?

HOW MANY ARE PRODUCTION-SENSITIVE?

HOW MANY HAVE INCOMPLETE SECURITY REQUIREMENTS?
```

---

# 162. Potential Metrics

Conceptual only:

```text
CAPABILITY DEFINITION COUNT

DRAFT CAPABILITY COUNT

APPROVED CAPABILITY COUNT

DEPRECATED CAPABILITY COUNT

REVOKED CAPABILITY COUNT

SUPERSEDED CAPABILITY COUNT

UNOWNED CAPABILITY COUNT

BROKEN-REFERENCE COUNT

INVALID-SCOPE COUNT

SECURITY-REVIEW FAILURE COUNT

VERSION-INTEGRITY FAILURE COUNT

PRODUCTION-SENSITIVE CAPABILITY COUNT
```

---

# 163. Metrics Boundary

No live values are claimed.

---

# 164. Capability Count Boundary

```text
MORE CAPABILITIES
≠
MORE ACTIVE AGENT AUTHORITY
```

---

# 165. Approved Capability Boundary

```text
MORE APPROVED
CAPABILITY DEFINITIONS
≠
MORE PRODUCTION-READY
AGENTS
```

---

# 166. Canonical Capability Definition Template

The following is the recommended authoring template for future
Capability Definition documents.

```yaml
---
id: CAP-<DOMAIN>-<FUNCTION>-001
title: <Capability Name>
version: 0.1.0
status: Draft

description: >
  <Clear description of the bounded outcome or work class this
  Capability represents and its most important governance,
  security, scope, and authorization boundaries.>

type: Mianx.ai Individual-Agent Capability Definition
class: Governed Agent Capability Definition
category: <Capability Category>
parent: <Canonical Parent Path>

owner: <Accountable Owner>
authority: <Governing Authority>

stewards:
  - <Steward>

maintainers:
  - <Maintainer>

reviewers:
  - <Reviewer>

created: YYYY-MM-DD
updated: YYYY-MM-DD

classification: Internal

audience:
  - <Audience>

depends_on:
  - <Reference>

related_documents:
  - <Reference>

review_cycle:
  - At Every Material Capability Change
  - Before Assignment to Controlled Agents
  - Before Production Use

canonical: false

tags:
  - capability
---

capability_definition:

  identity:
    capability_id: CAP-<DOMAIN>-<FUNCTION>-001
    capability_version: 0.1.0
    display_name: <Capability Name>
    aliases: []

  definition:
    purpose: >
      <Why the Capability exists.>

    expected_outcomes:
      - <Outcome>

    non_goals:
      - <Explicit non-goal>

    category_ref: <Category>
    classification_refs: []

  applicability:
    agent_type_refs: []
    role_refs: []

    project_refs: []
    customer_refs: []

    tenant:
      mode: explicit
      tenant_refs: []

    environment:
      allowed:
        - development
        - test
        - staging

      production:
        definition_intent: false
        capability_authorized: false

  skills:
    required:
      - skill_id: <Skill ID>
        version_constraint: <Version>
        minimum_proficiency: <Conditional>

    preferred: []

  prerequisites:
    capability_refs: []
    skill_refs: []

  dependencies:
    capability_refs: []
    policy_refs: []
    service_refs: []

  tools:
    required:
      - tool_ref: <Tool>
        purpose: <Purpose>
        operations: []

    optional: []
    prohibited: []

  models:
    requirements: []
    preferred_model_refs: []
    prohibited_model_refs: []

  prompts:
    required_refs: []

  memory:
    required_types: []
    allowed_scopes: []
    prohibited_scopes: []

  knowledge:
    required_sources: []
    authority_requirements: []
    freshness_requirements: []

  data:
    required_classes: []
    prohibited_classes: []
    minimum_required: []
    minimization_required: true

  tasks:
    supported_classes: []
    unsupported_classes: []
    prohibited_classes: []

  io:
    input_requirements: []
    output_requirements: []

  side_effects:
    expected_classes: []
    prohibited_classes: []

  autonomy:
    maximum_supported_level: <Conditional>
    grants_autonomy: false

  risk:
    classification: <Risk Class>
    risk_factors: []

  approvals:
    required_for: []

  security:
    least_privilege_required: true
    cross_tenant_access: false
    secret_disclosure: prohibited
    security_policy_override: prohibited
    approval_bypass: prohibited
    production_bypass: prohibited

  compliance:
    policy_refs: []
    regulatory_refs: []

  evaluation:
    criteria:
      - correctness
      - quality
      - security
      - policy_compliance
      - evidence_quality

    benchmark_refs: []
    required_evidence: []

  governance:
    owner_ref: <Owner>
    steward_refs: []
    approval_refs: []

  provenance:
    source_type: <Source>
    source_ref: <Conditional>
    authored_by: <Actor>
    reviewed_by: []
    approved_by: []

  lifecycle:
    status: Draft
    deprecated_at: null
    superseded_by: null
    revoked_at: null
    retired_at: null

  runtime_truth:
    capability_schema_runtime: NOT_PROVEN
    registry_record: NOT_PROVEN
    agent_assignments: NOT_PROVEN
    skill_requirements_verified: NOT_PROVEN
    prerequisite_resolution: NOT_PROVEN
    tool_authorization: NOT_PROVEN
    model_authorization: NOT_PROVEN
    memory_authorization: NOT_PROVEN
    data_authorization: NOT_PROVEN
    project_isolation: NOT_PROVEN
    tenant_isolation: NOT_PROVEN
    evaluation_runtime: NOT_PROVEN
    audit_runtime: NOT_PROVEN
    production_operation: NOT_PROVEN

  production:
    authorized_by_this_definition: false
    production_status: NOT_AUTHORIZED_BY_THIS_DOCUMENT
---
```

---

# 167. Capability Template Authoring Rules

When authoring a Capability:

```text
DO NOT
WRITE
CAPABILITY METADATA
AS IF IT WERE
A PERMISSION.

DO NOT
MARK
AN AGENT
AS HAVING THE CAPABILITY
INSIDE THE DEFINITION.

DO NOT
EMBED
RAW CREDENTIALS.

DO NOT
USE
TOOL REQUIREMENTS
AS TOOL GRANTS.

DO NOT
USE
SKILL REFERENCES
AS SKILL ASSIGNMENTS.

DO NOT
USE
PRODUCTION LABELS
AS PRODUCTION AUTHORIZATION.

DO NOT
GLOBALIZE
CUSTOMER / TENANT
PRIVATE CONTENT.

DO NOT
CLAIM
IMPLEMENTATION OR VERIFICATION
WITHOUT EVIDENCE.
```

---

# 168. Capability Definition Validation Framework

Before review ask:

```text
IS CAPABILITY ID UNIQUE?

IS VERSION EXPLICIT?

IS PURPOSE CLEAR?

IS OUTCOME BOUNDED?

ARE NON-GOALS CLEAR?

IS CATEGORY APPROPRIATE?

IS RISK CLASSIFICATION EXPLICIT?

ARE AGENT-TYPE REFS VALID?

ARE ROLE REFS VALID?

ARE SKILL REFS VALID?

ARE PREREQUISITES VALID?

ARE DEPENDENCIES VALID?

ARE CIRCULAR DEPENDENCIES ADDRESSED?

ARE TOOL REFS VALID?

ARE MODEL REQUIREMENTS CURRENT?

ARE PROMPT REFS CURRENT?

ARE MEMORY REQUIREMENTS BOUNDED?

ARE KNOWLEDGE SOURCES BOUNDED?

ARE DATA REQUIREMENTS MINIMIZED?

ARE TASK CLASSES BOUNDED?

IS PROJECT SCOPE EXPLICIT?

IS CUSTOMER SCOPE EXPLICIT?

IS TENANT SCOPE EXPLICIT?

IS ENVIRONMENT EXPLICIT?

ARE SIDE EFFECTS EXPLICIT?

ARE APPROVALS EXPLICIT?

ARE SECURITY CONTROLS EXPLICIT?

ARE EVALUATION CRITERIA EXPLICIT?

IS PROVENANCE KNOWN?
```

---

# 169. Capability Security Review Framework

Before approval ask:

```text
CAN THIS DEFINITION
GRANT ACCESS?

CAN IT SELF-GRANT
TO AN AGENT?

CAN A SKILL REFERENCE
CREATE SKILL ASSIGNMENT?

CAN TOOL REQUIREMENTS
CREATE TOOL PERMISSION?

CAN MODEL REQUIREMENTS
BYPASS MODEL GOVERNANCE?

CAN IT EXPAND
MEMORY SCOPE?

CAN IT EXPAND
DATA SCOPE?

CAN IT CROSS
PROJECTS?

CAN IT CROSS
CUSTOMERS?

CAN IT CROSS
TENANTS?

CAN IT ESCALATE
AUTONOMY?

CAN IT REMOVE
REQUIRED APPROVAL?

CAN IT CLAIM
PRODUCTION AUTHORITY?

CAN CHILD DEFINITIONS
REMOVE SECURITY CONTROLS?

IF ANY ANSWER
IS UNSAFELY YES:

BLOCK
/
REDESIGN
/
ESCALATE.
```

---

# 170. Capability Assignment Boundary

Capability assignment belongs to separate Agent/Capability mapping
governance.

Permanent rule:

```text
CAPABILITY DEFINITION
≠
AGENT CAPABILITY ASSIGNMENT
```

---

# 171. Capability Registry Boundary

Stable Capability registration belongs under:

```text
../capabilities/capability-registry.md
```

---

# 172. Capability Mapping Boundary

Agent-to-Capability relationships remain governed under:

```text
../capabilities/capability-mapping.md
```

---

# 173. Capability Framework Boundary

Operating semantics remain governed under:

```text
../capabilities/capability-framework.md
```

---

# 174. Skill Boundary

Supporting Skills remain governed under:

```text
../skills/
```

Permanent:

```text
CAPABILITY
≠
SKILL
```

---

# 175. Agent Template Boundary

Agent Definition authoring remains governed by:

```text
./agent-template.md
```

---

# 176. Tool Boundary

Tool selection and permission remain under:

```text
../tools/
```

---

# 177. Access-Control Boundary

Authorization remains under:

```text
../security/access-control.md
```

---

# 178. Identity Boundary

Agent security identity remains under:

```text
../security/identity-management.md
```

---

# 179. Task Boundary

Task-level requirements and authorization remain aligned with:

```text
../planning/task-planning.md
../execution/task-execution.md
```

---

# 180. Evaluation Boundary

Capability evaluation remains aligned with:

```text
../evaluation/
```

---

# 181. Model Boundary

Model approval and lifecycle remain governed under:

```text
doc/27-model-management/
```

and applicable AI Operating System documents.

---

# 182. Memory Boundary

Memory remains governed under:

```text
../memory/
doc/21-memory-engine/
```

---

# 183. AI Workforce Boundary

Organizational Roles remain under:

```text
doc/19-ai-workforce/
```

---

# 184. AI Operating System Boundary

Runtime Capability resolution, Agent routing and execution integration
belong primarily to:

```text
doc/20-ai-operating-system/
```

when implemented.

---

# 185. Multi-Agent Boundary

Team-level aggregate Capability composition belongs primarily to:

```text
doc/23-multi-agent-system/
```

This Template defines individual-Agent Capability Definitions.

---

# 186. Capability Template Production Gate

Before a Capability Definition may be considered Production-ready:

- [ ] stable Capability ID exists;
- [ ] Capability Version is explicit;
- [ ] lifecycle status is explicit;
- [ ] Capability name is clear;
- [ ] Capability purpose is clear;
- [ ] expected outcomes are explicit;
- [ ] Expected Outcome/Achieved Outcome distinction is preserved;
- [ ] non-goals are explicit;
- [ ] taxonomy/category is defined;
- [ ] classification is defined;
- [ ] side-effect classification is explicit where relevant;
- [ ] Capability/Role distinction is preserved;
- [ ] Capability/Skill distinction is preserved;
- [ ] Capability/Permission distinction is preserved;
- [ ] Capability/Tool distinction is preserved;
- [ ] Capability/Model distinction is preserved;
- [ ] Capability/Task distinction is preserved;
- [ ] Agent-Type applicability is explicit;
- [ ] Agent-Type/Authority distinction is preserved;
- [ ] Role applicability is explicit;
- [ ] Role Applicability/Role Authority distinction is preserved;
- [ ] required Skill refs are explicit;
- [ ] preferred Skill refs are explicit where used;
- [ ] Capability Requires Skill/Skill Assigned distinction is preserved;
- [ ] minimum Skill proficiency is explicit where applicable;
- [ ] Proficiency Defined/Proficiency Verified distinction is preserved;
- [ ] prerequisite Capability refs are explicit;
- [ ] prerequisite Skill refs are explicit;
- [ ] Prerequisite Listed/Satisfied distinction is preserved;
- [ ] dependency graph is reviewed;
- [ ] invalid circular dependencies are addressed;
- [ ] Tool requirements are explicit;
- [ ] Tool Required/Connected distinction is preserved;
- [ ] Tool Connected/Authorized distinction is preserved;
- [ ] Tool Authorized/Every Operation distinction is preserved;
- [ ] Tool side effects are explicit;
- [ ] Model requirements are explicit;
- [ ] Model Requirement/Authorization distinction is preserved;
- [ ] Model-Version compatibility is reviewed;
- [ ] Model V1/Model V2 verification distinction is preserved;
- [ ] Prompt refs are explicit where applicable;
- [ ] Prompt Reference/Loaded distinction is preserved;
- [ ] Prompt Loaded/Capability Verified distinction is preserved;
- [ ] Memory requirements are explicit;
- [ ] Memory Requirement/Access distinction is preserved;
- [ ] Knowledge requirements are explicit;
- [ ] Knowledge Retrieval/Truth distinction is preserved;
- [ ] Indexed/Canonical distinction is preserved;
- [ ] data requirements are explicit;
- [ ] Data Requirement/Access distinction is preserved;
- [ ] Data Minimization is applied;
- [ ] input expectations are explicit;
- [ ] Input Provided/Trusted distinction is preserved;
- [ ] output expectations are explicit;
- [ ] Output Generated/Correct distinction is preserved;
- [ ] Correct Output/Authorized Action distinction is preserved;
- [ ] supported Task classes are explicit;
- [ ] unsupported/prohibited Task classes are explicit where relevant;
- [ ] Task Class Supported/Task Authorized distinction is preserved;
- [ ] Capability Composition/Permission Union distinction is preserved;
- [ ] conflicts are addressed;
- [ ] more restrictive Security policy wins;
- [ ] Project applicability is explicit;
- [ ] Project Applicability/Access distinction is preserved;
- [ ] Customer applicability is explicit where applicable;
- [ ] Customer A/Customer B boundary is preserved;
- [ ] Tenant applicability is explicit;
- [ ] Tenant A/Tenant B boundary is preserved;
- [ ] Shared Capability Definition/Shared Tenant Data distinction is preserved;
- [ ] Shared Capability Definition/Shared Memory distinction is preserved;
- [ ] Shared Capability Definition/Shared Credentials distinction is preserved;
- [ ] Shared Capability Definition/Shared Authority distinction is preserved;
- [ ] environment applicability is explicit;
- [ ] Staging/Production distinction is preserved;
- [ ] Production-Sensitive Capability/Production Authorization distinction is preserved;
- [ ] autonomy implications are explicit;
- [ ] Capability Supports Autonomy/Autonomy Granted distinction is preserved;
- [ ] approval requirements are explicit;
- [ ] Approval Required/Exists distinction is preserved;
- [ ] risk classification is explicit;
- [ ] Risk Classified/Accepted distinction is preserved;
- [ ] Security requirements are explicit;
- [ ] Security Requirement/Control Implemented distinction is preserved;
- [ ] identity requirements are explicit where relevant;
- [ ] Agent Capability Claim/Agent Identity Verification distinction is preserved;
- [ ] Access-Control policy refs are explicit where relevant;
- [ ] Access Policy Ref/Access Grant distinction is preserved;
- [ ] compliance requirements are explicit where applicable;
- [ ] Compliance Requirement/Verified Compliance distinction is preserved;
- [ ] evaluation criteria are explicit;
- [ ] Evaluation Criteria/Agent Capability Verified distinction is preserved;
- [ ] Capability Definition Verified/Agent Capability Verified distinction is preserved;
- [ ] benchmark refs are explicit where relevant;
- [ ] Benchmark Pass/Authority distinction is preserved;
- [ ] Benchmark Pass/Production Authorization distinction is preserved;
- [ ] quality expectations are explicit;
- [ ] Quality Target/Verified Quality distinction is preserved;
- [ ] Evidence requirements are explicit;
- [ ] Capability Claim/Evidence distinction is preserved;
- [ ] provenance is explicit;
- [ ] Agent-Proposed/Approved Capability distinction is preserved;
- [ ] accountable owner is explicit;
- [ ] lifecycle states are explicit;
- [ ] Approved/Assigned distinction is preserved;
- [ ] Assigned/Active distinction is preserved;
- [ ] Active/Authorized distinction is preserved;
- [ ] Deprecated/Deleted distinction is preserved;
- [ ] Revoked/History Erased distinction is preserved;
- [ ] deprecation behavior is explicit;
- [ ] supersession behavior is explicit;
- [ ] Superseded/All Agents Migrated distinction is preserved;
- [ ] revocation behavior is explicit;
- [ ] Revoked/All Assignments Disabled distinction is preserved;
- [ ] inheritance cannot create authority;
- [ ] child overrides cannot silently remove Security;
- [ ] Template Composition/Permission Composition distinction is preserved;
- [ ] Multi-Project reuse does not create global Project access;
- [ ] Multi-Customer privacy is preserved;
- [ ] Multi-Tenant isolation is preserved;
- [ ] Industry Capability/Core Authority distinction is preserved;
- [ ] Capability Definition Security threats are defined;
- [ ] Capability Authority Inflation test passes;
- [ ] Skill Requirement Inflation test passes;
- [ ] Tool Permission Injection test passes;
- [ ] Model Governance Bypass test passes;
- [ ] Memory Scope Inflation test passes;
- [ ] Data Scope Inflation test passes;
- [ ] Project Scope Inflation test passes;
- [ ] Tenant Scope Inflation test passes;
- [ ] Production Scope Spoof test passes;
- [ ] Autonomy Inflation test passes;
- [ ] Approval Bypass test passes;
- [ ] Security Removal test passes;
- [ ] Version-Tampering test passes;
- [ ] Stale Capability test passes;
- [ ] Provenance Spoof test passes;
- [ ] Capability Definition Evidence is defined;
- [ ] Definition Evidence/Agent Capability Evidence distinction is preserved;
- [ ] Agent Capability Evidence/Authorization Evidence distinction is preserved;
- [ ] Audit events are defined;
- [ ] Audit attribution is defined;
- [ ] raw secrets are excluded from Audit;
- [ ] Capability Template Observability is defined;
- [ ] conceptual metrics are defined;
- [ ] no live metrics are claimed;
- [ ] canonical authoring template is included;
- [ ] implementation Evidence exists;
- [ ] Capability Definition Governance review is complete;
- [ ] Capability Governance review is complete;
- [ ] Capability Registry Governance review is complete;
- [ ] Template Governance review is complete;
- [ ] Agent Framework Governance review is complete;
- [ ] Agent Governance review is complete;
- [ ] Agent Registry Governance review is complete;
- [ ] Agent Discovery Governance review is complete;
- [ ] Agent Runtime Governance review is complete;
- [ ] AI Operating System Governance review is complete;
- [ ] AI Workforce Governance review is complete;
- [ ] Agent-Type Governance review is complete;
- [ ] Role Governance review is complete;
- [ ] Skill Governance review is complete;
- [ ] Persona Governance review is complete;
- [ ] Tool Governance review is complete;
- [ ] Model Governance review is complete;
- [ ] Prompt Governance review is complete;
- [ ] Memory Governance review is complete;
- [ ] Knowledge Governance review is complete;
- [ ] Data Governance review is complete;
- [ ] Task Governance review is complete;
- [ ] Execution Governance review is complete;
- [ ] Security Governance review is complete;
- [ ] Agent Security Governance review is complete;
- [ ] Identity and Access Governance review is complete;
- [ ] Authorization Governance review is complete;
- [ ] Approval Governance review is complete;
- [ ] Compliance Governance review is complete;
- [ ] Risk Governance review is complete;
- [ ] Evaluation Governance review is complete;
- [ ] Quality Governance review is complete;
- [ ] Benchmark Governance review is complete;
- [ ] Lifecycle Governance review is complete;
- [ ] Project Governance review is complete;
- [ ] Customer Governance review is complete where applicable;
- [ ] Tenant Governance review is complete;
- [ ] Environment Governance review is complete;
- [ ] Evidence Governance review is complete;
- [ ] Audit Governance review is complete;
- [ ] Production Governance review is complete;
- [ ] Enterprise Architecture review is complete;
- [ ] Enterprise Governance review is complete;
- [ ] explicit Production authorization remains separately required.

---

# 187. Production Hard Stops

Production Capability Definition usage must remain blocked, restricted,
escalated, or `NOT_PROVEN` if any known condition includes:

```text
CAPABILITY TEMPLATE IS TREATED AS CAPABILITY GRANT

CAPABILITY DEFINITION IS TREATED AS AGENT ASSIGNMENT

CAPABILITY REGISTERED IS TREATED AS CAPABILITY ASSIGNED

CAPABILITY ASSIGNED IS TREATED AS CAPABILITY ACTIVE

CAPABILITY ACTIVE IS TREATED AS ACTION AUTHORIZED

CAPABILITY IS TREATED AS ROLE

CAPABILITY IS TREATED AS SKILL

CAPABILITY IS TREATED AS TOOL

CAPABILITY IS TREATED AS MODEL

CAPABILITY IS TREATED AS PERMISSION

CAPABILITY IS TREATED AS AUTONOMY

CAPABILITY ID IS MISSING OR AMBIGUOUS

MATERIAL CAPABILITY CHANGE OCCURS WITHOUT VERSION CHANGE

APPROVED DEFINITION IS TREATED AS ACTIVE RUNTIME CAPABILITY

CAPABILITY PURPOSE IS UNBOUNDED

EXPECTED OUTCOME IS TREATED AS ACHIEVED OUTCOME

ROLE APPLICABILITY IS TREATED AS ROLE AUTHORITY

SKILL REQUIREMENT IS TREATED AS SKILL ASSIGNMENT

SKILL MINIMUM PROFICIENCY IS TREATED AS VERIFIED PROFICIENCY

PREREQUISITE LISTED IS TREATED AS SATISFIED

CIRCULAR DEPENDENCY IS ACCEPTED WITHOUT REVIEW

TOOL REQUIREMENT IS TREATED AS TOOL CONNECTION

TOOL CONNECTION IS TREATED AS TOOL AUTHORIZATION

TOOL AUTHORIZATION IS TREATED AS ALL OPERATIONS AUTHORIZED

SIDE-EFFECTING TOOL REQUIREMENT IS TREATED AS SIDE-EFFECT AUTHORIZATION

MODEL REQUIREMENT IS TREATED AS MODEL AUTHORIZATION

MODEL VERSION CHANGE IS IGNORED

PROMPT REFERENCE IS TREATED AS CAPABILITY VERIFICATION

MEMORY REQUIREMENT IS TREATED AS MEMORY ACCESS

KNOWLEDGE INDEX IS TREATED AS CANONICAL TRUTH

DATA REQUIREMENT IS TREATED AS DATA ACCESS

DATA MINIMIZATION IS IGNORED

INPUT PROVIDED IS TREATED AS TRUSTED INPUT

OUTPUT GENERATED IS TREATED AS CORRECT OUTPUT

CORRECT OUTPUT IS TREATED AS ACTION AUTHORIZATION

TASK-CLASS SUPPORT IS TREATED AS TASK AUTHORIZATION

CAPABILITY COMPOSITION CREATES PERMISSION UNION

CAPABILITY CONFLICT ALLOWS LOWER SECURITY RULE TO WIN

PROJECT APPLICABILITY IS TREATED AS PROJECT ACCESS

CUSTOMER APPLICABILITY IS TREATED AS CUSTOMER ACCESS

TENANT APPLICABILITY IS TREATED AS TENANT AUTHORITY

SHARED CAPABILITY DEFINITION COLLAPSES TENANT DATA / MEMORY / CREDENTIALS

STAGING CAPABILITY IS TREATED AS PRODUCTION CAPABILITY AUTHORIZATION

PRODUCTION-SENSITIVE CAPABILITY IS TREATED AS PRODUCTION GRANT

CAPABILITY SUPPORTS AUTONOMY IS TREATED AS AUTONOMY GRANT

APPROVAL_REQUIRED IS TREATED AS APPROVAL_EXISTS

RISK CLASSIFICATION IS TREATED AS RISK ACCEPTANCE

SECURITY REQUIREMENT IS TREATED AS SECURITY IMPLEMENTATION

AGENT CLAIMS CAPABILITY IS TREATED AS TRUSTED IDENTITY OR CAPABILITY ASSIGNMENT

ACCESS POLICY REFERENCE IS TREATED AS ACCESS GRANT

COMPLIANCE REQUIREMENT IS TREATED AS COMPLIANCE VERIFICATION

EVALUATION CRITERIA ARE TREATED AS PASSED EVALUATION

CAPABILITY DEFINITION VERIFIED IS TREATED AS AGENT CAPABILITY VERIFIED

BENCHMARK PASS IS TREATED AS AUTHORITY

BENCHMARK PASS IS TREATED AS PRODUCTION AUTHORIZATION

QUALITY TARGET IS TREATED AS VERIFIED QUALITY

AGENT SELF-CLAIM IS TREATED AS CAPABILITY EVIDENCE

AGENT-PROPOSED CAPABILITY IS AUTO-APPROVED

CAPABILITY OWNER IS TREATED AS UNLIMITED PLATFORM AUTHORITY

DEPRECATED CAPABILITY HISTORY IS DELETED

SUPERSEDED CAPABILITY AUTO-MIGRATES AGENTS

REVOKED CAPABILITY IS ASSUMED DISABLED EVERYWHERE WITHOUT PROOF

INHERITED CAPABILITY CREATES INHERITED AUTHORITY

CHILD CAPABILITY REMOVES PARENT SECURITY CONTROL

TEMPLATE COMPOSITION CREATES PERMISSION COMPOSITION

REUSABLE CAPABILITY CREATES GLOBAL PROJECT AUTHORITY

CUSTOMER PRIVATE CONTENT IS STORED IN GLOBAL CAPABILITY DEFINITION

TENANT PRIVATE CONTENT IS STORED IN GLOBAL CAPABILITY DEFINITION

INDUSTRY CAPABILITY CREATES MIANX CORE PRIVILEGE

CAPABILITY DEFINITION PROVENANCE IS UNKNOWN

STALE / REVOKED / SUPERSEDED CAPABILITY IS USED WITHOUT REVALIDATION

CAPABILITY SCHEMA VALIDATION IS NOT VERIFIED

CAPABILITY VERSION INTEGRITY IS NOT VERIFIED

CAPABILITY REGISTRY INTEGRATION IS NOT VERIFIED

CAPABILITY ASSIGNMENT INTEGRATION IS NOT VERIFIED

SKILL RELATIONSHIP VALIDATION IS NOT VERIFIED

PREREQUISITE RESOLUTION IS NOT VERIFIED

TOOL AUTHORIZATION IS NOT VERIFIED

MODEL AUTHORIZATION IS NOT VERIFIED

MEMORY AUTHORIZATION IS NOT VERIFIED

DATA AUTHORIZATION IS NOT VERIFIED

PROJECT ISOLATION IS NOT VERIFIED

CUSTOMER ISOLATION IS NOT VERIFIED WHERE APPLICABLE

TENANT ISOLATION IS NOT VERIFIED

CAPABILITY REVOCATION PROPAGATION IS NOT VERIFIED

CAPABILITY AUDIT IS NOT VERIFIED

PRODUCTION CAPABILITY EVIDENCE IS MISSING

EXPLICIT PRODUCTION ACTION AUTHORIZATION IS MISSING
```

---

# 188. Capability Template Invariants

The following must remain true:

```text
CAPABILITY TEMPLATE
≠
CAPABILITY GRANT

CAPABILITY DEFINITION
≠
AGENT ASSIGNMENT

REGISTERED
≠
ASSIGNED

ASSIGNED
≠
ACTIVE

ACTIVE
≠
AUTHORIZED

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
AUTHORITY

CAPABILITY
≠
AUTONOMY

SKILL REQUIRED
≠
SKILL ASSIGNED

SKILL ASSIGNED
≠
SKILL PROFICIENT

PREREQUISITE LISTED
≠
PREREQUISITE SATISFIED

TOOL REQUIRED
≠
TOOL AUTHORIZED

MODEL REQUIRED
≠
MODEL AUTHORIZED

PROMPT REFERENCED
≠
CAPABILITY VERIFIED

MEMORY REQUIRED
≠
MEMORY AUTHORIZED

KNOWLEDGE RETRIEVED
≠
KNOWLEDGE TRUE

DATA REQUIRED
≠
DATA AUTHORIZED

INPUT PROVIDED
≠
INPUT TRUSTED

OUTPUT GENERATED
≠
OUTPUT CORRECT

OUTPUT CORRECT
≠
ACTION AUTHORIZED

TASK CLASS SUPPORTED
≠
TASK AUTHORIZED

PROJECT APPLICABLE
≠
PROJECT ACCESS

TENANT APPLICABLE
≠
TENANT ACCESS

AUTONOMY SUPPORTED
≠
AUTONOMY GRANTED

APPROVAL REQUIRED
≠
APPROVAL EXISTS

RISK CLASSIFIED
≠
RISK ACCEPTED

SECURITY DOCUMENTED
≠
SECURITY IMPLEMENTED

CAPABILITY DEFINITION VERIFIED
≠
AGENT CAPABILITY VERIFIED

AGENT CAPABILITY VERIFIED
≠
ACTION AUTHORIZED

BENCHMARK PASSED
≠
PRODUCTION AUTHORIZED

PRODUCTION CAPABILITY
≠
PRODUCTION AUTHORIZATION

DOCUMENTED CAPABILITY
≠
IMPLEMENTED CAPABILITY

IMPLEMENTED CAPABILITY
≠
VERIFIED CAPABILITY

VERIFIED CAPABILITY
≠
PRODUCTION AUTHORIZATION
```

---

# 189. Capability Authoring Framework

Before drafting a Capability Definition ask:

```text
WHY DOES THIS
CAPABILITY EXIST?

IS A NEW CAPABILITY
ACTUALLY REQUIRED?

DOES AN EXISTING
CAPABILITY ALREADY
COVER THE OUTCOME?

WHAT STABLE ID?

WHAT VERSION?

WHAT PURPOSE?

WHAT EXPECTED OUTCOMES?

WHAT NON-GOALS?

WHAT CATEGORY?

WHAT CLASSIFICATION?

WHAT AGENT TYPES?

WHAT ROLES?

WHAT SKILLS?

WHAT PREREQUISITES?

WHAT DEPENDENCIES?

WHAT TOOLS?

WHAT MODELS?

WHAT PROMPTS?

WHAT MEMORY?

WHAT KNOWLEDGE?

WHAT DATA?

WHAT INPUTS?

WHAT OUTPUTS?

WHAT TASK CLASSES?

WHAT PROJECT?

WHAT CUSTOMER?

WHAT TENANT?

WHAT ENVIRONMENT?

WHAT SIDE EFFECTS?

WHAT RISK?

WHAT APPROVAL?

WHAT SECURITY?

WHAT EVALUATION?

WHAT EVIDENCE?

WHO OWNS IT?

WHAT PROVENANCE?
```

---

# 190. Capability Validation Framework

Before review ask:

```text
IS ID UNIQUE?

IS VERSION VALID?

IS PURPOSE BOUNDED?

ARE OUTCOMES SPECIFIC?

ARE NON-GOALS CLEAR?

IS TAXONOMY VALID?

ARE ROLE REFS VALID?

ARE SKILL REFS VALID?

ARE PREREQUISITES VALID?

ARE DEPENDENCIES VALID?

ARE CYCLES ADDRESSED?

ARE TOOL REFS VALID?

ARE MODEL REQUIREMENTS CURRENT?

ARE PROMPT REFS CURRENT?

ARE MEMORY REQUIREMENTS BOUNDED?

ARE KNOWLEDGE SOURCES AUTHORITY-AWARE?

ARE DATA REQUIREMENTS MINIMIZED?

ARE INPUT / OUTPUT
EXPECTATIONS CLEAR?

ARE TASK CLASSES BOUNDED?

IS PROJECT SCOPE EXPLICIT?

IS CUSTOMER SCOPE EXPLICIT?

IS TENANT SCOPE EXPLICIT?

IS ENVIRONMENT EXPLICIT?

ARE SIDE EFFECTS EXPLICIT?

IS RISK EXPLICIT?

ARE APPROVALS EXPLICIT?

ARE SECURITY REQUIREMENTS EXPLICIT?

ARE EVALUATION CRITERIA EXPLICIT?

IS PROVENANCE KNOWN?
```

---

# 191. Capability Production Framework

Before a Capability may support Production Agent eligibility ask:

```text
IS CAPABILITY ID VERIFIED?

IS CAPABILITY VERSION VERIFIED?

IS CAPABILITY CURRENT?

IS CAPABILITY NOT REVOKED?

IS CAPABILITY NOT SUPERSEDED
WITHOUT APPROVED MIGRATION?

IS REGISTRY RECORD VERIFIED?

IS AGENT IDENTITY VERIFIED?

IS AGENT VERSION VERIFIED?

IS CAPABILITY ASSIGNMENT
SEPARATELY VERIFIED?

ARE REQUIRED SKILLS VERIFIED?

IS SKILL PROFICIENCY CURRENT?

ARE PREREQUISITES VERIFIED?

ARE DEPENDENCIES VERIFIED?

ARE TOOL REQUIREMENTS CURRENT?

ARE TOOL PERMISSIONS
SEPARATELY VERIFIED?

IS MODEL APPROVAL CURRENT?

IS MEMORY ACCESS
SEPARATELY VERIFIED?

IS DATA ACCESS
SEPARATELY VERIFIED?

IS PROJECT SCOPE VERIFIED?

IS CUSTOMER SCOPE VERIFIED?

IS TENANT SCOPE VERIFIED?

IS ENVIRONMENT
EXPLICITLY PRODUCTION?

IS AUTONOMY
SEPARATELY AUTHORIZED?

ARE REQUIRED APPROVALS VERIFIED?

ARE SECURITY CONTROLS VERIFIED?

IS EVALUATION VERIFIED?

IS CAPABILITY EVIDENCE CURRENT?

IS ACTION AUTHORIZATION
SEPARATELY VERIFIED?

WHO EXPLICITLY AUTHORIZES
THE PRODUCTION ACTION?
```

---

# 192. Capability Template Anti-Patterns

Avoid:

```text
THE CAPABILITY IS DOCUMENTED
=
THE AGENT HAS IT

THE CAPABILITY IS REGISTERED
=
THE AGENT HAS IT

THE CAPABILITY IS ASSIGNED
=
THE AGENT MAY EXECUTE

THE SKILL IS LISTED
=
THE AGENT IS PROFICIENT

THE TOOL IS REQUIRED
=
GRANT TOOL

THE MODEL IS REQUIRED
=
USE MODEL WITHOUT GOVERNANCE

THE MEMORY IS REQUIRED
=
OPEN MEMORY

THE DATA IS REQUIRED
=
OPEN DATA

THE TASK NEEDS CAPABILITY
=
AUTHORIZE TASK

THE CAPABILITY IS RELEVANT
TO EXECUTIVES
=
GRANT EXECUTIVE AUTHORITY

THE CAPABILITY IS SHARED
=
SHARE TENANT CONTEXT

THE CAPABILITY SAYS
PRODUCTION
=
PRODUCTION IS AUTHORIZED

THE CAPABILITY SUPPORTS
AUTONOMOUS EXECUTION
=
GRANT AUTONOMY

THE SECURITY FIELD SAYS ENABLED
=
SECURITY IS IMPLEMENTED

THE BENCHMARK PASSED
=
PRODUCTION READY

THE DEFINITION IS VERIFIED
=
THE AGENT IS VERIFIED

THE AGENT HAS CAPABILITY
=
THE ACTION IS AUTHORIZED

DOCUMENTED
=
IMPLEMENTED

IMPLEMENTED
=
VERIFIED

VERIFIED
=
PRODUCTION AUTHORIZED
```

---

# 193. Templates Folder Responsibility

The `templates/` folder now separates:

```text
agent-template.md
=
HOW ONE
AGENT DEFINITION
MUST BE AUTHORED

capability-template.md
=
HOW ONE
CAPABILITY DEFINITION
MUST BE AUTHORED

persona-template.md
=
HOW ONE
PERSONA DEFINITION
MUST BE AUTHORED

skill-template.md
=
HOW ONE
SKILL DEFINITION
MUST BE AUTHORED
```

---

# 194. Current Capability Template Architecture Truth

At the current documentation stage:

```text
CAPABILITY_TEMPLATE_STANDARD
=
DEFINED_TARGET_STATE

CAPABILITY_DEFINITION_METADATA_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_IDENTITY_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_VERSION_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_PURPOSE_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_OUTCOME_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_NON_GOAL_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_TAXONOMY_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_CLASSIFICATION_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_AGENT_TYPE_APPLICABILITY_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_ROLE_APPLICABILITY_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_SKILL_REFERENCE_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_PREREQUISITE_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_DEPENDENCY_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_TOOL_REQUIREMENT_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_MODEL_REQUIREMENT_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_PROMPT_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_MEMORY_REQUIREMENT_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_KNOWLEDGE_REQUIREMENT_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_DATA_REQUIREMENT_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_TASK_CLASS_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_SCOPE_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_RISK_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_SECURITY_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_APPROVAL_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_EVALUATION_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_EVIDENCE_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_LIFECYCLE_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_RUNTIME_TRUTH_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

CAPABILITY_PRODUCTION_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE
```

---

# 195. Runtime Truth

At the current documentation stage:

```text
CAPABILITY_TEMPLATE_VALIDATION_RUNTIME
=
NOT_PROVEN

CAPABILITY_DEFINITION_SCHEMA_RUNTIME
=
NOT_PROVEN

CAPABILITY_DEFINITION_PERSISTENCE
=
NOT_PROVEN

CAPABILITY_VERSION_ENFORCEMENT
=
NOT_PROVEN

CAPABILITY_TEMPLATE_INHERITANCE_RUNTIME
=
NOT_PROVEN

CAPABILITY_TEMPLATE_COMPOSITION_RUNTIME
=
NOT_PROVEN

CAPABILITY_REFERENCE_VALIDATION_RUNTIME
=
NOT_PROVEN

CAPABILITY_SKILL_REFERENCE_VALIDATION
=
NOT_PROVEN

CAPABILITY_PREREQUISITE_VALIDATION
=
NOT_PROVEN

CAPABILITY_DEPENDENCY_GRAPH_RUNTIME
=
NOT_PROVEN

CAPABILITY_CYCLE_DETECTION
=
NOT_PROVEN

CAPABILITY_TOOL_REQUIREMENT_VALIDATION
=
NOT_PROVEN

CAPABILITY_MODEL_REQUIREMENT_VALIDATION
=
NOT_PROVEN

CAPABILITY_SCOPE_VALIDATION_RUNTIME
=
NOT_PROVEN

CAPABILITY_SECURITY_TEMPLATE_ENFORCEMENT
=
NOT_PROVEN

CAPABILITY_REGISTRY_TEMPLATE_INTEGRATION
=
NOT_PROVEN

CAPABILITY_ASSIGNMENT_INTEGRATION
=
NOT_PROVEN

PROJECT_CAPABILITY_TEMPLATE_ISOLATION
=
NOT_PROVEN

CUSTOMER_CAPABILITY_TEMPLATE_ISOLATION
=
NOT_PROVEN

TENANT_CAPABILITY_TEMPLATE_ISOLATION
=
NOT_PROVEN

CAPABILITY_TEMPLATE_AUDIT_RUNTIME
=
NOT_PROVEN

CONTROLLED_CAPABILITY_TEMPLATE_PILOT
=
NOT_PROVEN

PRODUCTION_CAPABILITY_RUNTIME
=
NOT_PROVEN
```

---

# 196. Approval Status

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

AGENT_GOVERNANCE_APPROVAL
=
PENDING

CAPABILITY_GOVERNANCE_APPROVAL
=
PENDING

CAPABILITY_REGISTRY_GOVERNANCE_APPROVAL
=
PENDING

CAPABILITY_DEFINITION_GOVERNANCE_APPROVAL
=
PENDING

TEMPLATE_GOVERNANCE_APPROVAL
=
PENDING

AGENT_REGISTRY_GOVERNANCE_APPROVAL
=
PENDING

AGENT_DISCOVERY_GOVERNANCE_APPROVAL
=
PENDING

AGENT_RUNTIME_GOVERNANCE_APPROVAL
=
PENDING

AI_OPERATING_SYSTEM_GOVERNANCE_APPROVAL
=
PENDING

AI_WORKFORCE_GOVERNANCE_APPROVAL
=
PENDING

AGENT_TYPE_GOVERNANCE_APPROVAL
=
PENDING

ROLE_GOVERNANCE_APPROVAL
=
PENDING

SKILL_GOVERNANCE_APPROVAL
=
PENDING

PERSONA_GOVERNANCE_APPROVAL
=
PENDING

TOOL_GOVERNANCE_APPROVAL
=
PENDING

MODEL_GOVERNANCE_APPROVAL
=
PENDING

PROMPT_GOVERNANCE_APPROVAL
=
PENDING

MEMORY_GOVERNANCE_APPROVAL
=
PENDING

KNOWLEDGE_GOVERNANCE_APPROVAL
=
PENDING

DATA_GOVERNANCE_APPROVAL
=
PENDING

TASK_GOVERNANCE_APPROVAL
=
PENDING

EXECUTION_GOVERNANCE_APPROVAL
=
PENDING

SECURITY_GOVERNANCE_APPROVAL
=
PENDING

AGENT_SECURITY_GOVERNANCE_APPROVAL
=
PENDING

IDENTITY_AND_ACCESS_GOVERNANCE_APPROVAL
=
PENDING

AUTHORIZATION_GOVERNANCE_APPROVAL
=
PENDING

POLICY_GOVERNANCE_APPROVAL
=
PENDING

APPROVAL_GOVERNANCE_APPROVAL
=
PENDING

COMPLIANCE_GOVERNANCE_APPROVAL
=
PENDING

RISK_GOVERNANCE_APPROVAL
=
PENDING

EVALUATION_GOVERNANCE_APPROVAL
=
PENDING

QUALITY_GOVERNANCE_APPROVAL
=
PENDING

BENCHMARK_GOVERNANCE_APPROVAL
=
PENDING

LIFECYCLE_GOVERNANCE_APPROVAL
=
PENDING

PROJECT_GOVERNANCE_APPROVAL
=
PENDING

CUSTOMER_GOVERNANCE_APPROVAL
=
PENDING

TENANT_GOVERNANCE_APPROVAL
=
PENDING

ENVIRONMENT_GOVERNANCE_APPROVAL
=
PENDING

PRODUCTION_GOVERNANCE_APPROVAL
=
PENDING

EVIDENCE_GOVERNANCE_APPROVAL
=
PENDING

AUDIT_GOVERNANCE_APPROVAL
=
PENDING
```

---

# 197. Canonical Status

```text
CANONICAL
=
FALSE
```

---

# 198. Production Status

```text
AGENT_CAPABILITY_TEMPLATE_STANDARD
=
DOCUMENTED_TARGET_STATE

CAPABILITY_TEMPLATE_IMPLEMENTATION
=
NOT_PROVEN

CAPABILITY_DEFINITION_SCHEMA_RUNTIME
=
NOT_PROVEN

CAPABILITY_TEMPLATE_VALIDATION_RUNTIME
=
NOT_PROVEN

CAPABILITY_REFERENCE_VALIDATION
=
NOT_PROVEN

CAPABILITY_SKILL_REFERENCE_VALIDATION
=
NOT_PROVEN

CAPABILITY_PREREQUISITE_VALIDATION
=
NOT_PROVEN

CAPABILITY_SCOPE_VALIDATION
=
NOT_PROVEN

CAPABILITY_SECURITY_TEMPLATE_ENFORCEMENT
=
NOT_PROVEN

CAPABILITY_REGISTRY_INTEGRATION
=
NOT_PROVEN

CAPABILITY_ASSIGNMENT_INTEGRATION
=
NOT_PROVEN

TENANT_CAPABILITY_TEMPLATE_ISOLATION
=
NOT_PROVEN

CAPABILITY_TEMPLATE_AUDIT
=
NOT_PROVEN

PRODUCTION_CAPABILITY_DEFINITION
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT

PRODUCTION_OPERATIONAL
=
NOT_PROVEN
```

---

# 199. Preserved Capability Template Truth

```text
CAPABILITY TEMPLATE
≠
CAPABILITY GRANT

CAPABILITY DEFINITION
≠
AGENT CAPABILITY ASSIGNMENT

REGISTERED
≠
ASSIGNED

ASSIGNED
≠
ACTIVE

ACTIVE
≠
AUTHORIZED

CAPABILITY
≠
ROLE

CAPABILITY
≠
SKILL

CAPABILITY
≠
PERMISSION

CAPABILITY
≠
AUTHORITY

SKILL REQUIRED
≠
SKILL ASSIGNED

TOOL REQUIRED
≠
TOOL AUTHORIZED

MODEL REQUIRED
≠
MODEL AUTHORIZED

MEMORY REQUIRED
≠
MEMORY AUTHORIZED

DATA REQUIRED
≠
DATA AUTHORIZED

TASK CLASS SUPPORTED
≠
TASK AUTHORIZED

PROJECT APPLICABILITY
≠
PROJECT ACCESS

TENANT APPLICABILITY
≠
TENANT ACCESS

AUTONOMY SUPPORTED
≠
AUTONOMY GRANTED

APPROVAL REQUIRED
≠
APPROVAL EXISTS

SECURITY DOCUMENTED
≠
SECURITY IMPLEMENTED

CAPABILITY DEFINITION VERIFIED
≠
AGENT CAPABILITY VERIFIED

AGENT CAPABILITY VERIFIED
≠
ACTION AUTHORIZED

PRODUCTION CAPABILITY
≠
PRODUCTION AUTHORIZATION

DOCUMENTED CAPABILITY
≠
IMPLEMENTED CAPABILITY

IMPLEMENTED CAPABILITY
≠
VERIFIED CAPABILITY

VERIFIED CAPABILITY
≠
PRODUCTION AUTHORIZATION
```

---

# 200. Capability Template Completion Checklist

Before this document is content-complete for review:

- [ ] Capability Template purpose is defined;
- [ ] Capability Template mission is defined;
- [ ] Template/Capability Grant distinction is explicit;
- [ ] Capability Definition/Assignment distinction is explicit;
- [ ] Registered/Assigned distinction is explicit;
- [ ] Assigned/Active distinction is explicit;
- [ ] Active/Authorized distinction is explicit;
- [ ] Capability/Role distinction is explicit;
- [ ] Capability/Skill distinction is explicit;
- [ ] Capability/Tool distinction is explicit;
- [ ] Capability/Model distinction is explicit;
- [ ] Capability/Permission distinction is explicit;
- [ ] Capability/Authority distinction is explicit;
- [ ] Capability/Autonomy distinction is explicit;
- [ ] stable Capability ID is defined;
- [ ] Capability Name/ID distinction is explicit;
- [ ] Capability Version is defined;
- [ ] material Version-change semantics are defined;
- [ ] Version integrity is defined;
- [ ] Definition status is defined;
- [ ] Approved Definition/Active Capability distinction is explicit;
- [ ] Capability name rules are defined;
- [ ] purpose is defined;
- [ ] expected outcomes are defined;
- [ ] Outcome Defined/Achieved distinction is explicit;
- [ ] non-goals are defined;
- [ ] taxonomy is defined conceptually;
- [ ] classification is defined;
- [ ] Side-Effect Classification/Authorization distinction is explicit;
- [ ] Capability granularity is defined;
- [ ] Agent-Type applicability is defined;
- [ ] Agent-Type/Authority distinction is explicit;
- [ ] Role applicability is defined;
- [ ] Role Applicability/Role Authority distinction is explicit;
- [ ] supporting Skills are defined;
- [ ] Required Skill/Skill Assignment distinction is explicit;
- [ ] minimum Skill proficiency is supported;
- [ ] Proficiency Defined/Verified distinction is explicit;
- [ ] prerequisite Capabilities are defined;
- [ ] prerequisite Skills are defined;
- [ ] Prerequisite Listed/Satisfied distinction is explicit;
- [ ] dependency graphs are defined;
- [ ] circular dependencies are addressed;
- [ ] Tool requirements are defined;
- [ ] Tool Required/Connected distinction is explicit;
- [ ] Tool Connected/Authorized distinction is explicit;
- [ ] Tool side effects are defined;
- [ ] Side-Effecting Tool/Side-Effect Authorization distinction is explicit;
- [ ] Model requirements are defined;
- [ ] Model Requirement/Authorization distinction is explicit;
- [ ] Model Version compatibility is considered;
- [ ] Prompt dependencies are defined;
- [ ] Prompt Ref/Loaded distinction is explicit;
- [ ] Prompt Loaded/Capability Verified distinction is explicit;
- [ ] Memory requirements are defined;
- [ ] Memory Requirement/Access distinction is explicit;
- [ ] Knowledge requirements are defined;
- [ ] Knowledge Retrieved/True distinction is explicit;
- [ ] Indexed/Canonical distinction is explicit;
- [ ] Data requirements are defined;
- [ ] Data Requirement/Access distinction is explicit;
- [ ] Data Minimization is defined;
- [ ] input expectations are defined;
- [ ] Input Provided/Trusted distinction is explicit;
- [ ] output expectations are defined;
- [ ] Output Generated/Correct distinction is explicit;
- [ ] Output Correct/Action Authorized distinction is explicit;
- [ ] Task-class applicability is defined;
- [ ] Supported Task Class/Task Authorization distinction is explicit;
- [ ] Capability Composition is defined;
- [ ] Composition/Permission Union distinction is explicit;
- [ ] Capability Conflict handling is defined;
- [ ] Project applicability is defined;
- [ ] Project Applicability/Access distinction is explicit;
- [ ] Customer applicability is defined;
- [ ] Customer boundaries are explicit;
- [ ] Tenant applicability is defined;
- [ ] Tenant boundaries are explicit;
- [ ] shared Capability Definition boundaries are explicit;
- [ ] environment applicability is defined;
- [ ] Staging/Production distinction is explicit;
- [ ] Production-Sensitive Capability/Authorization distinction is explicit;
- [ ] autonomy implications are defined;
- [ ] Autonomy Support/Autonomy Grant distinction is explicit;
- [ ] approval requirements are defined;
- [ ] Approval Required/Exists distinction is explicit;
- [ ] risk classification is defined;
- [ ] Risk Classified/Accepted distinction is explicit;
- [ ] Security requirements are defined;
- [ ] Security Documented/Implemented distinction is explicit;
- [ ] identity requirements are defined;
- [ ] Agent Capability Claim/Trusted Identity distinction is explicit;
- [ ] Access-Control requirements are defined;
- [ ] Policy Ref/Access Grant distinction is explicit;
- [ ] compliance requirements are defined where applicable;
- [ ] evaluation criteria are defined;
- [ ] Evaluation Criteria/Agent Verification distinction is explicit;
- [ ] Capability Definition Verified/Agent Capability Verified distinction is explicit;
- [ ] Benchmark references are defined;
- [ ] Benchmark Pass/Authority distinction is explicit;
- [ ] Benchmark Pass/Production Authorization distinction is explicit;
- [ ] quality expectations are defined;
- [ ] Quality Target/Verified Quality distinction is explicit;
- [ ] Evidence requirements are defined;
- [ ] Capability Claim/Evidence distinction is explicit;
- [ ] Capability provenance is defined;
- [ ] Agent-Proposed/Approved Capability distinction is explicit;
- [ ] ownership is defined;
- [ ] lifecycle is defined;
- [ ] deprecation is defined;
- [ ] supersession is defined;
- [ ] revocation is defined;
- [ ] Deprecated/Deleted distinction is explicit;
- [ ] Superseded/Auto-Migrated distinction is explicit;
- [ ] Revoked/All Assignments Disabled distinction is explicit;
- [ ] inheritance is bounded;
- [ ] inherited Capability does not inherit authority;
- [ ] overrides cannot remove Security without Governance;
- [ ] Template Composition/Permission Composition distinction is explicit;
- [ ] Multi-Project reuse is bounded;
- [ ] Multi-Customer privacy is bounded;
- [ ] Multi-Tenant reuse is bounded;
- [ ] Tenant-private information is not globalized;
- [ ] Industry Capability examples are truth-bounded;
- [ ] Industry Capability/Core Authority distinction is explicit;
- [ ] Security threats are defined;
- [ ] Capability Authority Inflation test passes;
- [ ] Skill Requirement Inflation test passes;
- [ ] Tool Permission Injection test passes;
- [ ] Model Governance Bypass test passes;
- [ ] Memory Scope Inflation test passes;
- [ ] Data Scope Inflation test passes;
- [ ] Project Scope Inflation test passes;
- [ ] Tenant Scope Inflation test passes;
- [ ] Production Scope Spoof test passes;
- [ ] Autonomy Inflation test passes;
- [ ] Approval Bypass test passes;
- [ ] Security Removal test passes;
- [ ] Version-Tampering test passes;
- [ ] Stale Capability test passes;
- [ ] Provenance Spoof test passes;
- [ ] Capability Definition Evidence is defined;
- [ ] Definition Evidence/Agent Capability Evidence distinction is explicit;
- [ ] Agent Capability Evidence/Authorization Evidence distinction is explicit;
- [ ] Audit events are defined;
- [ ] Audit attribution is defined;
- [ ] raw secrets are excluded from Audit;
- [ ] Capability Template Observability is defined;
- [ ] conceptual metrics are defined;
- [ ] no live metrics are claimed;
- [ ] canonical Capability authoring schema is included;
- [ ] Authoring Framework is defined;
- [ ] Validation Framework is defined;
- [ ] Security Review Framework is defined;
- [ ] Production Framework is defined;
- [ ] Capability Registry boundary is defined;
- [ ] Capability Mapping boundary is defined;
- [ ] Capability Framework boundary is defined;
- [ ] Skill boundary is defined;
- [ ] Agent Template boundary is defined;
- [ ] Tool boundary is defined;
- [ ] Access-Control boundary is defined;
- [ ] Identity boundary is defined;
- [ ] Task boundary is defined;
- [ ] Evaluation boundary is defined;
- [ ] Model boundary is defined;
- [ ] Memory boundary is defined;
- [ ] AI Workforce boundary is defined;
- [ ] AI Operating System boundary is defined;
- [ ] Multi-Agent boundary is defined;
- [ ] Runtime Truth consistently uses `NOT_PROVEN`;
- [ ] no fabricated Capability Schema Runtime is claimed;
- [ ] no fabricated Capability persistence is claimed;
- [ ] no fabricated Capability validator is claimed;
- [ ] no fabricated Capability dependency runtime is claimed;
- [ ] no fabricated Capability cycle detector is claimed;
- [ ] no fabricated Capability Registry integration is claimed;
- [ ] no fabricated Capability Assignment integration is claimed;
- [ ] no fabricated Project Capability isolation is claimed;
- [ ] no fabricated Customer Capability isolation is claimed;
- [ ] no fabricated Tenant Capability isolation is claimed;
- [ ] no fabricated Production Capability runtime is claimed;
- [ ] next document is identified.

---

# 201. Revision History

| Version | Date | Status | Author | Change |
|---|---|---|---|---|
| 0.1.0 | 2026-08-10 | Draft | Mianx.ai | Initial enterprise Agent Capability Definition template |
| 1.0.0 | 2026-08-10 | Draft | Mianx.ai | Established complete individual-Agent Capability Definition authoring template covering stable identity, Versioning, purpose, expected outcomes, non-goals, taxonomy, classification, Agent-Type and Role applicability, Skill relationships, prerequisites, dependencies, Tool, Model, Prompt, Memory, Knowledge and data requirements, input/output expectations, Task-class applicability, Capability composition, Project/Customer/Tenant/environment applicability, autonomy implications, approvals, risk, Security, compliance, evaluation, benchmarks, quality, Evidence, ownership, provenance, lifecycle, inheritance, overrides, Multi-Project/Multi-Tenant boundaries, adversarial tests, canonical authoring schema, Runtime Truth, Production gates, and Production Hard Stops |

---

# 202. Changelog Entry

Add during final module Changelog synchronization to:

```text
doc/22-agent-framework/CHANGELOG.md
```

```markdown
## AGENT-FRAMEWORK-CHG-20260810-067 — Governed Individual-Agent Capability Definition Template Established

| Field | Value |
|---|---|
| Date | 2026-08-10 |
| Change Type | `CREATED`, `AGENT-FRAMEWORK`, `TEMPLATES`, `CAPABILITY-TEMPLATE`, `CAPABILITY-DEFINITION`, `SECURITY`, `GOVERNANCE`, `PRODUCTION-READINESS` |
| Impact | `I5 — Foundational / Enterprise-Wide` |
| Risk | `R4 — High` |
| Status | `Completed for Review` |
| Owner | Mianx.ai Founder |
| Approver | Pending Founder, Enterprise Governance, Enterprise Architecture, Agent Framework Governance, Agent Governance, Capability Governance, Capability Registry Governance, Capability Definition Governance, Template Governance, Agent Registry Governance, Agent Discovery Governance, Agent Runtime Governance, AI Operating System Governance, AI Workforce Governance, Agent-Type Governance, Role Governance, Skill Governance, Persona Governance, Tool Governance, Model Governance, Prompt Governance, Memory Governance, Knowledge Governance, Data Governance, Task Governance, Execution Governance, Security Governance, Agent Security Governance, Identity and Access Governance, Authorization Governance, Policy Governance, Approval Governance, Compliance Governance, Risk Governance, Evaluation Governance, Quality Governance, Benchmark Governance, Lifecycle Governance, Project Governance, Customer Governance, Tenant Governance, Environment Governance, Production Governance, Evidence Governance, and Audit Governance Review |

### Affected Document

`doc/22-agent-framework/templates/capability-template.md`

### New State

The Agent Framework now defines a governed Capability Definition
template covering:

- stable Capability identity;
- Capability Versioning;
- Capability purpose;
- expected outcomes;
- explicit non-goals;
- taxonomy;
- classification;
- Agent-Type applicability;
- Role applicability;
- Skill relationships;
- Skill proficiency expectations;
- prerequisite Capabilities;
- prerequisite Skills;
- dependency relationships;
- Tool requirements;
- Tool side effects;
- Model requirements;
- Model Version considerations;
- Prompt dependencies;
- Memory requirements;
- Knowledge requirements;
- data requirements;
- Data Minimization;
- input expectations;
- output expectations;
- Task-class applicability;
- Capability composition;
- conflict boundaries;
- Project applicability;
- Customer applicability;
- Tenant applicability;
- shared Capability boundaries;
- environment applicability;
- Production-sensitive Capability boundaries;
- autonomy implications;
- approval requirements;
- risk classification;
- Security requirements;
- identity requirements;
- Access-Control references;
- compliance requirements;
- evaluation criteria;
- Capability-verification boundaries;
- benchmark references;
- quality expectations;
- Evidence requirements;
- provenance;
- ownership;
- Capability lifecycle;
- deprecation;
- supersession;
- revocation;
- inheritance;
- overrides;
- Template composition;
- Multi-Project reuse;
- Multi-Customer boundaries;
- Multi-Tenant boundaries;
- industry Capability boundaries;
- Capability Definition Security threats;
- adversarial tests;
- canonical Capability authoring schema;
- Runtime Truth;
- Production gates;
- Production Hard Stops.

### Documentation Truth

```text
AGENT_CAPABILITY_TEMPLATE_STANDARD
=
CONTENT_COMPLETE_FOR_REVIEW

CAPABILITY_TEMPLATE_VALIDATION_RUNTIME
=
NOT_PROVEN

CAPABILITY_DEFINITION_SCHEMA_RUNTIME
=
NOT_PROVEN

CAPABILITY_VERSION_ENFORCEMENT
=
NOT_PROVEN

CAPABILITY_REFERENCE_VALIDATION_RUNTIME
=
NOT_PROVEN

CAPABILITY_SKILL_REFERENCE_VALIDATION
=
NOT_PROVEN

CAPABILITY_SCOPE_VALIDATION_RUNTIME
=
NOT_PROVEN

TENANT_CAPABILITY_TEMPLATE_ISOLATION
=
NOT_PROVEN

PRODUCTION_CAPABILITY_DEFINITION
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

ENTERPRISE_ARCHITECTURE_APPROVAL
=
PENDING

AGENT_FRAMEWORK_GOVERNANCE_APPROVAL
=
PENDING

AGENT_GOVERNANCE_APPROVAL
=
PENDING

CAPABILITY_GOVERNANCE_APPROVAL
=
PENDING

CAPABILITY_REGISTRY_GOVERNANCE_APPROVAL
=
PENDING

CAPABILITY_DEFINITION_GOVERNANCE_APPROVAL
=
PENDING

TEMPLATE_GOVERNANCE_APPROVAL
=
PENDING

AGENT_REGISTRY_GOVERNANCE_APPROVAL
=
PENDING

AGENT_RUNTIME_GOVERNANCE_APPROVAL
=
PENDING

AI_OPERATING_SYSTEM_GOVERNANCE_APPROVAL
=
PENDING

AI_WORKFORCE_GOVERNANCE_APPROVAL
=
PENDING

ROLE_GOVERNANCE_APPROVAL
=
PENDING

SKILL_GOVERNANCE_APPROVAL
=
PENDING

TOOL_GOVERNANCE_APPROVAL
=
PENDING

MODEL_GOVERNANCE_APPROVAL
=
PENDING

PROMPT_GOVERNANCE_APPROVAL
=
PENDING

MEMORY_GOVERNANCE_APPROVAL
=
PENDING

SECURITY_GOVERNANCE_APPROVAL
=
PENDING

AUTHORIZATION_GOVERNANCE_APPROVAL
=
PENDING

EVALUATION_GOVERNANCE_APPROVAL
=
PENDING

PROJECT_GOVERNANCE_APPROVAL
=
PENDING

CUSTOMER_GOVERNANCE_APPROVAL
=
PENDING

TENANT_GOVERNANCE_APPROVAL
=
PENDING

PRODUCTION_GOVERNANCE_APPROVAL
=
PENDING

AUDIT_GOVERNANCE_APPROVAL
=
PENDING

CANONICAL
=
FALSE
```
```

---

# 203. Documentation Progress

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
3

COLLABORATION_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
3

COMMUNICATION_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
3

EVALUATION_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
3

EXECUTION_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
3

GOVERNANCE_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
3

LEARNING_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
3

LIFECYCLE_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
4

MEMORY_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
3

MONITORING_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
3

PERSONAS_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
3

PLANNING_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
3

REASONING_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
3

REGISTRY_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
3

SECURITY_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
3

SKILLS_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
3

TEMPLATES_DOCUMENTS_CONTENT_COMPLETE_FOR_REVIEW
=
2

TOTAL_CONTENT_COMPLETE_FOR_REVIEW
=
67

REMAINING_DOCUMENTS
=
11
```

This is **documentation content progress only**.

It does not mean:

```text
AGENT_FRAMEWORK_IMPLEMENTATION
=
67 / 78
```

---

# 204. Templates Folder Status

```text
templates/agent-template.md
=
CONTENT_COMPLETE_FOR_REVIEW

templates/capability-template.md
=
CONTENT_COMPLETE_FOR_REVIEW

templates/persona-template.md
=
NEXT

templates/skill-template.md
=
PENDING
```

Therefore:

```text
doc/22-agent-framework/templates/
=
2 / 4
CONTENT_COMPLETE_FOR_REVIEW
```

---

# 205. Next Document

The next document is:

```text
doc/22-agent-framework/templates/persona-template.md
```

Recommended Document ID:

```text
AGENT-PERSONA-TEMPLATE-001
```

Purpose:

> **Define the governed enterprise template used to author consistent
> Mianx.ai Agent Persona Definitions, including stable Persona identity,
> Version, purpose, communication style, tone, behavioral dimensions,
> initiative level, uncertainty expression, evidence communication,
> escalation style, refusal behavior, audience suitability, Agent-Type
> and Role applicability, language guidance, prohibited behaviors,
> safety boundaries, Project/Customer/Tenant applicability, lifecycle,
> ownership, provenance, evaluation criteria, Evidence, Audit,
> runtime-truth fields and Production hard stops while preserving the
> permanent rule that Persona identity, executive tone, confident
> language, Founder-like style, assertiveness, initiative, or
> human-like presentation never independently changes Agent identity,
> Role, Capability, Skill, Tool permission, data access, decision
> rights, approval rights, autonomy, or Production authorization.**

---

# Final Capability Template Rule

```text
THE CAPABILITY TEMPLATE
ANSWERS:

"HOW MUST
A MIANX CAPABILITY
BE DEFINED,
VERSIONED,
SCOPED,
SECURED,
AND EVALUATED?"

IT DOES NOT ANSWER:

"DOES THIS AGENT
HAVE THE CAPABILITY,
AND MAY IT
USE IT NOW?"
```

Correct Capability chain:

```text
CAPABILITY NEED
↓
CAPABILITY TEMPLATE
↓
CAPABILITY DEFINITION
↓
VERSION
↓
GOVERNANCE REVIEW
↓
CAPABILITY REGISTRY
↓
AGENT-CAPABILITY MAPPING
↓
SKILL / PREREQUISITE VERIFICATION
↓
PROJECT / CUSTOMER / TENANT / ENVIRONMENT
↓
TOOL / MODEL / MEMORY / DATA POLICIES
↓
CAPABILITY ELIGIBILITY
↓
SEPARATE AUTHORIZATION
↓
TASK-SPECIFIC USE
↓
EVIDENCE
↓
VERIFICATION
```

Permanent boundaries:

```text
CAPABILITY TEMPLATE
≠
CAPABILITY GRANT

DEFINITION
≠
ASSIGNMENT

REGISTERED
≠
ASSIGNED

ASSIGNED
≠
ACTIVE

ACTIVE
≠
AUTHORIZED

CAPABILITY
≠
ROLE

CAPABILITY
≠
SKILL

CAPABILITY
≠
PERMISSION

SKILL REQUIRED
≠
SKILL ASSIGNED

TOOL REQUIRED
≠
TOOL AUTHORIZED

MODEL REQUIRED
≠
MODEL AUTHORIZED

MEMORY REQUIRED
≠
MEMORY AUTHORIZED

DATA REQUIRED
≠
DATA AUTHORIZED

TASK CLASS
≠
TASK AUTHORIZED

PROJECT APPLICABILITY
≠
PROJECT ACCESS

TENANT APPLICABILITY
≠
TENANT ACCESS

AUTONOMY SUPPORTED
≠
AUTONOMY GRANTED

APPROVAL REQUIRED
≠
APPROVAL EXISTS

SECURITY DOCUMENTED
≠
SECURITY VERIFIED

CAPABILITY DEFINITION VERIFIED
≠
AGENT CAPABILITY VERIFIED

AGENT CAPABILITY VERIFIED
≠
ACTION AUTHORIZED

PRODUCTION CAPABILITY
≠
PRODUCTION AUTHORIZATION

CAPABILITY VERIFIED
≠
PRODUCTION AGENT EXECUTION AUTHORIZED
```

The enterprise Capability Template equation is:

```text
STABLE CAPABILITY IDENTITY
+
VERSIONING
+
BOUNDED PURPOSE
+
EXPECTED OUTCOMES
+
NON-GOALS
+
TAXONOMY
+
AGENT-TYPE / ROLE APPLICABILITY
+
SKILL RELATIONSHIPS
+
PREREQUISITES
+
DEPENDENCIES
+
TOOL / MODEL / MEMORY / DATA REQUIREMENTS
+
TASK APPLICABILITY
+
PROJECT / CUSTOMER / TENANT / ENVIRONMENT SCOPE
+
RISK
+
SECURITY
+
APPROVALS
+
EVALUATION
+
EVIDENCE
+
LIFECYCLE
+
RUNTIME TRUTH
=
TRUSTWORTHY ENTERPRISE
CAPABILITY DEFINITION
```

---