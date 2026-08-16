---
id: AGENT-TEMPLATE-001
title: Mianx.ai Agent Template
version: 1.0.0
status: Draft

description: Enterprise template standard for creating consistent, reviewable, versioned, truth-bounded and governable Mianx.ai individual-Agent Definitions. This document defines the mandatory and optional fields, authoring rules, identity metadata, purpose, Agent Type, organizational Role references, responsibilities, non-goals, Capability references, Skill references, Persona references, Tool requirements, Model requirements, Prompt references, Memory requirements, Knowledge requirements, data requirements, Task classes, Project, Customer, Tenant and environment scope, autonomy boundaries, budget constraints, approval requirements, security requirements, compliance requirements, execution restrictions, escalation rules, lifecycle configuration, evaluation criteria, quality expectations, Evidence requirements, Audit requirements, observability expectations, ownership, stewardship, provenance, dependency declarations, runtime truth declarations, implementation-state fields, Production hard stops, revision history, and completion checklist required to author a Mianx.ai Agent Definition while preserving the permanent rule that completing or approving an Agent Template does not independently register, activate, instantiate, authorize, deploy, grant Tools, grant data access, expand autonomy, or permit Production execution.

type: Enterprise Agent Definition Template Standard, Individual-Agent Authoring Template, Agent Definition Schema Guidance Standard, Agent Metadata Template, Agent Governance Template, Agent Capability Reference Template, Agent Skill Reference Template, Agent Persona Reference Template, Agent Tool Requirement Template, Agent Model Requirement Template, Agent Prompt Reference Template, Agent Memory Requirement Template, Agent Knowledge Requirement Template, Agent Task-Class Template, Agent Scope Template, Agent Security Template, Agent Approval Template, Agent Autonomy Template, Agent Budget Template, Agent Lifecycle Template, Agent Evaluation Template, Agent Evidence Template, Agent Audit Template, Agent Runtime-Truth Template, Agent Production-Readiness Template

class: Governed Enterprise Individual-Agent Definition Authoring, Truth-Bounded, Scope-Isolated, Security-Aware, Evidence-Producing, Reviewable and Production-Readiness Template Standard for Mianx.ai Agents operating across MianX Core Platform, AI Operating System, Shared AI Workforce, Project Factory, Industry Operating Systems, Multi-Project Operations, Multi-Customer Operations, Multi-Tenant Operations, controlled pilots, enterprise integrations, and future Production environments

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
  - Agent Definition Governance
  - Template Governance
  - Agent Registry Governance
  - Agent Lifecycle Governance
  - AI Workforce Governance
  - AI Operating System Governance
  - Agent Runtime Governance
  - Role Governance
  - Capability Governance
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
  - Identity and Access Governance
  - Authorization Governance
  - Policy Governance
  - Approval Governance
  - Compliance Governance
  - Risk Governance
  - Budget Governance
  - Project Governance
  - Customer Governance
  - Tenant Governance
  - Environment Governance
  - Evaluation Governance
  - Quality Governance
  - Evidence Governance
  - Audit Governance
  - Observability Governance
  - Production Governance
  - Documentation Governance

maintainers:
  - Agent Framework Engineering
  - AI Workforce Engineering
  - Agent Runtime Engineering
  - AI Operating System Engineering
  - Agent Registry Engineering
  - Security Engineering
  - Capability Engineering
  - Skill Engineering
  - Tool Platform Engineering
  - Model Platform Engineering
  - Prompt Engineering
  - Memory Platform Engineering
  - Knowledge Platform Engineering
  - Evaluation Engineering
  - Quality Engineering
  - Documentation Governance

reviewers:
  - Founder
  - Founder Office
  - Enterprise Governance
  - Enterprise Architecture
  - Agent Framework Governance
  - Agent Governance
  - Agent Definition Governance
  - Template Governance
  - Agent Registry Governance
  - Agent Lifecycle Governance
  - AI Workforce Governance
  - AI Operating System Governance
  - Agent Runtime Governance
  - Role Governance
  - Capability Governance
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
  - Identity and Access Governance
  - Authorization Governance
  - Policy Governance
  - Approval Governance
  - Compliance Governance
  - Risk Governance
  - Budget Governance
  - Project Governance
  - Customer Governance
  - Tenant Governance
  - Environment Governance
  - Evaluation Governance
  - Quality Governance
  - Evidence Governance
  - Audit Governance
  - Observability Governance
  - Production Governance
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
  - AI Workforce Designers
  - Agent Developers
  - Agent Runtime Engineers
  - Security Engineers
  - Capability Engineers
  - Skill Engineers
  - Prompt Engineers
  - Model Engineers
  - Tool Engineers
  - Memory Engineers
  - Knowledge Engineers
  - Project Owners
  - Product Owners
  - Quality Engineers
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
  - ../execution/error-recovery.md
  - ../execution/execution-engine.md
  - ../execution/task-execution.md
  - ../governance/agent-governance.md
  - ../governance/compliance.md
  - ../governance/policies.md
  - ../learning/continuous-learning.md
  - ../learning/self-improvement.md
  - ../lifecycle/agent-activation.md
  - ../lifecycle/agent-creation.md
  - ../lifecycle/agent-lifecycle.md
  - ../lifecycle/agent-retirement.md
  - ../memory/agent-memory.md
  - ../monitoring/audit-logs.md
  - ../monitoring/health-monitoring.md
  - ../personas/persona-framework.md
  - ../planning/task-planning.md
  - ../reasoning/decision-making.md
  - ../reasoning/reasoning-model.md
  - ../registry/agent-catalog.md
  - ../registry/agent-discovery.md
  - ../registry/agent-registry.md
  - ../security/access-control.md
  - ../security/agent-security.md
  - ../security/identity-management.md
  - ../skills/skill-catalog.md
  - ../skills/skill-development.md
  - ../skills/skill-framework.md
  - ../../01-governance/AI-CONSTITUTION.md
  - ../../19-ai-workforce/AGENT-CAPACITY-BASELINE.md
  - ../../19-ai-workforce/C-SUITE-AGENT-REGISTRY.md
  - ../../19-ai-workforce/VERIFIABLE-WORK-ENVELOPE.md
  - ../../20-ai-operating-system/README.md
  - ../../21-memory-engine/README.md

related_documents:
  - ./capability-template.md
  - ./persona-template.md
  - ./skill-template.md
  - ../registry/agent-registry.md
  - ../lifecycle/agent-creation.md
  - ../lifecycle/agent-activation.md
  - ../capabilities/capability-framework.md
  - ../skills/skill-framework.md
  - ../personas/persona-framework.md
  - ../security/access-control.md
  - ../security/agent-security.md
  - ../security/identity-management.md
  - ../tools/tool-permissions.md
  - ../evaluation/performance-evaluation.md

related_modules:
  - ../../01-governance/
  - ../../05-workforce/
  - ../../09-security/
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
  - At Every Material Agent Definition Schema Change
  - At Every Agent Metadata Standard Change
  - At Every Agent Type or Role Model Change
  - At Every Capability or Skill Reference Model Change
  - At Every Tool, Model, Prompt, Memory or Knowledge Requirement Change
  - At Every Agent Scope Model Change
  - At Every Autonomy or Approval Model Change
  - At Every Security Requirement Change
  - At Every Agent Lifecycle Change
  - At Every Evaluation or Evidence Requirement Change
  - At Every Production Agent Definition Gate Change
  - Before Controlled Agent Definition Pilot
  - Before Production Agent Registration
  - Before Canonical Promotion
  - Quarterly During Active Build
  - Annually During Stable Operation

canonical: false

tags:
  - agent-framework
  - templates
  - agent-template
  - agent-definition
  - agent-schema
  - metadata
  - capabilities
  - skills
  - personas
  - tools
  - models
  - memory
  - security
  - autonomy
  - lifecycle
  - evidence
  - audit
  - tenant-isolation
  - production-readiness
---

# Mianx.ai Agent Template

> **This document defines the standard enterprise template used to
> author one Mianx.ai Agent Definition.**
>
> The template should answer:
>
> ```text
> WHO IS THIS AGENT DEFINITION?
>
> WHY DOES IT EXIST?
>
> WHAT KIND OF AGENT IS IT?
>
> WHAT ORGANIZATIONAL ROLE
> DOES IT SUPPORT?
>
> WHAT RESPONSIBILITIES
> DOES IT HAVE?
>
> WHAT MUST IT NOT DO?
>
> WHAT CAPABILITIES
> DOES IT REQUIRE?
>
> WHAT SKILLS
> DOES IT REQUIRE?
>
> WHAT PERSONA
> MAY IT USE?
>
> WHAT TOOLS
> MAY ITS WORK REQUIRE?
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
> MAY IT SUPPORT?
>
> WHAT PROJECT?
>
> WHAT CUSTOMER?
>
> WHAT TENANT?
>
> WHAT ENVIRONMENT?
>
> WHAT AUTONOMY LIMIT?
>
> WHAT BUDGET LIMIT?
>
> WHAT APPROVALS?
>
> WHAT SECURITY CONTROLS?
>
> WHAT EVIDENCE?
>
> WHAT AUDIT?
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
> "THE TEMPLATE IS COMPLETE,
> THEREFORE
> THE AGENT EXISTS,
> IS ACTIVE,
> OR IS AUTHORIZED."
> ```
>
> Permanent rule:
>
> ```text
> AGENT TEMPLATE
> =
> AUTHORING STANDARD
>
> NOT
>
> RUNTIME AUTHORITY.
> ```

---

# 1. Purpose

This document defines:

```text
THE STANDARD AGENT-DEFINITION TEMPLATE

MANDATORY TEMPLATE SECTIONS

OPTIONAL TEMPLATE SECTIONS

AGENT IDENTITY METADATA

AGENT VERSION METADATA

AGENT PURPOSE

AGENT TYPE

ROLE REFERENCES

RESPONSIBILITIES

NON-GOALS

CAPABILITY REFERENCES

SKILL REFERENCES

PERSONA REFERENCES

TOOL REQUIREMENTS

MODEL REQUIREMENTS

PROMPT REFERENCES

MEMORY REQUIREMENTS

KNOWLEDGE REQUIREMENTS

DATA REQUIREMENTS

TASK CLASSES

PROJECT / CUSTOMER / TENANT / ENVIRONMENT SCOPE

AUTONOMY BOUNDARIES

BUDGET BOUNDARIES

APPROVAL REQUIREMENTS

SECURITY REQUIREMENTS

COMPLIANCE REQUIREMENTS

EXECUTION RESTRICTIONS

ESCALATION RULES

LIFECYCLE CONFIGURATION

EVALUATION CRITERIA

QUALITY EXPECTATIONS

EVIDENCE REQUIREMENTS

AUDIT REQUIREMENTS

OBSERVABILITY EXPECTATIONS

OWNERSHIP

STEWARDSHIP

PROVENANCE

DEPENDENCIES

RUNTIME TRUTH

PRODUCTION HARD STOPS

REVISION HISTORY
```

---

# 2. Agent Template Mission

The mission is:

> **Ensure every Mianx.ai Agent Definition is authored using one
> consistent, reviewable, versioned and security-aware enterprise
> structure so Agent behavior, responsibilities, competence,
> dependencies, scope, autonomy, approvals, evidence and runtime truth
> are explicit before registration, activation or execution is even
> considered.**

---

# 3. Agent Template Core Equation

```text
TRUSTWORTHY AGENT DEFINITION
=
STABLE IDENTITY
+
VERSION
+
CLEAR PURPOSE
+
BOUNDED RESPONSIBILITIES
+
EXPLICIT NON-GOALS
+
ROLE REFERENCES
+
CAPABILITY REFERENCES
+
SKILL REFERENCES
+
DEPENDENCY REQUIREMENTS
+
SCOPE
+
AUTONOMY LIMITS
+
APPROVAL REQUIREMENTS
+
SECURITY REQUIREMENTS
+
LIFECYCLE
+
EVALUATION
+
EVIDENCE
+
AUDIT
+
RUNTIME TRUTH
```

---

# 4. Permanent Agent Template Boundaries

```text
AGENT TEMPLATE
≠
AGENT DEFINITION INSTANCE

AGENT DEFINITION
≠
AGENT INSTANCE

AGENT DEFINITION
≠
AGENT RUN

TEMPLATE COMPLETED
≠
REGISTERED

REGISTERED
≠
ACTIVE

ACTIVE
≠
TASK AUTHORIZED

ROLE REFERENCE
≠
ROLE AUTHORITY

CAPABILITY REFERENCE
≠
CAPABILITY GRANT

SKILL REFERENCE
≠
SKILL PROFICIENCY

PERSONA REFERENCE
≠
IDENTITY

TOOL REQUIREMENT
≠
TOOL PERMISSION

MODEL REQUIREMENT
≠
MODEL AUTHORIZATION

MEMORY REQUIREMENT
≠
MEMORY ACCESS

DATA REQUIREMENT
≠
DATA ACCESS

PROJECT SCOPE DECLARED
≠
PROJECT AUTHORIZATION

TENANT SCOPE DECLARED
≠
TENANT AUTHORIZATION

PRODUCTION TARGET DECLARED
≠
PRODUCTION AUTHORIZATION
```

---

# 5. Template Scope

This template is intended for:

```text
INDIVIDUAL MIANX AGENT DEFINITIONS
```

It is not the primary template for:

```text
MULTI-AGENT TEAM

COMPLETE DEPARTMENT

WORKFLOW

TASK

TOOL

MODEL

CAPABILITY

SKILL

PERSONA

PROJECT

TENANT
```

---

# 6. Agent Definition vs Agent Instance

Permanent distinction:

```text
AGENT DEFINITION
=
GOVERNED SPECIFICATION

AGENT INSTANCE
=
CONCRETE RUNTIME REALIZATION

AGENT RUN
=
ONE EXECUTION
```

---

# 7. Definition Boundary

```text
DEFINITION EXISTS
≠
INSTANCE EXISTS
```

---

# 8. Template Required Metadata

Every Agent Definition should include, at minimum:

```text
AGENT ID

TITLE / NAME

VERSION

STATUS

DESCRIPTION

AGENT TYPE

OWNER

AUTHORITY

CLASSIFICATION

PURPOSE

RESPONSIBILITIES

NON-GOALS

CAPABILITY REFS

SKILL REFS

SCOPE

SECURITY

LIFECYCLE

EVALUATION

RUNTIME TRUTH
```

---

# 9. Stable Agent ID

Potential format:

```text
AGENT-<DOMAIN>-<FUNCTION>-001
```

Exact naming taxonomy should follow Registry governance.

---

# 10. Agent ID Boundary

```text
DISPLAY NAME
≠
AGENT ID
```

---

# 11. Agent Version

Agent Definition must declare a Version.

```text
version: x.y.z
```

---

# 12. Version Boundary

```text
AGENT V1
≠
AGENT V2
```

where material behavior, dependencies, security, scope, or authority
requirements differ.

---

# 13. Agent Status

Potential Definition states:

```text
Draft

Under Review

Approved

Deprecated

Superseded

Retired
```

Exact runtime lifecycle states remain governed elsewhere.

---

# 14. Definition Status Boundary

```text
DEFINITION STATUS: Approved
≠
AGENT RUNTIME ACTIVE
```

---

# 15. Agent Description

Description should state:

```text
WHAT THE AGENT IS

WHY IT EXISTS

WHAT BUSINESS / SYSTEM
OUTCOME IT SUPPORTS

WHAT IMPORTANT BOUNDARIES
APPLY
```

---

# 16. Agent Purpose

Purpose should be specific enough to prevent uncontrolled role growth.

Avoid:

```text
DO EVERYTHING NEEDED
```

Prefer:

```text
SUPPORT A DEFINED
BUSINESS OR SYSTEM FUNCTION
WITHIN EXPLICIT
CAPABILITY,
SCOPE,
TOOL,
SECURITY,
AND APPROVAL
BOUNDARIES.
```

---

# 17. Purpose Boundary

```text
BROAD PURPOSE
≠
BROAD AUTHORITY
```

---

# 18. Agent Type

Agent Definition should reference one Agent Type.

Potential:

```text
EXECUTIVE

MANAGER

SPECIALIST

SYSTEM

WORKER
```

---

# 19. Agent-Type Boundary

```text
AGENT TYPE
≠
SECURITY ROLE
```

---

# 20. Organizational Role

Agent may reference one or more organizational Roles.

---

# 21. Role Boundary

```text
ROLE REFERENCE
≠
ROLE PERMISSION
```

---

# 22. Executive Role Boundary

```text
CEO AGENT
≠
FOUNDER

CEO ROLE
≠
FOUNDER AUTHORITY
```

---

# 23. Responsibilities

Responsibilities should identify what the Agent is expected to support.

Example structure:

```text
RESPONSIBLE FOR:

- analysis;
- recommendations;
- controlled planning;
- authorized execution;
- evidence production;
- escalation.
```

---

# 24. Responsibility Boundary

```text
RESPONSIBLE FOR
≠
AUTHORIZED FOR EVERY ACTION
RELATED TO RESPONSIBILITY
```

---

# 25. Non-Goals

Every material Agent Definition should define what it must not become.

Potential:

```text
NO UNBOUNDED ADMINISTRATION

NO CROSS-TENANT ACCESS

NO SELF-GRANTED PERMISSIONS

NO SELF-APPROVAL

NO HIDDEN PRODUCTION AUTHORITY

NO UNCONTROLLED EXTERNAL EGRESS
```

---

# 26. Non-Goal Boundary

```text
NOT LISTED AS NON-GOAL
≠
AUTOMATICALLY ALLOWED
```

---

# 27. Capability References

Agent Template should reference governed Capability IDs.

Example:

```yaml
capabilities:
  required:
    - capability_id: CAP-EXAMPLE-001
      version: "1.x"
  optional: []
```

---

# 28. Capability Boundary

```text
CAPABILITY LISTED
≠
CAPABILITY GRANTED
```

---

# 29. Capability Version

Capability Version should be explicit where material.

---

# 30. Skill References

Agent Template should reference governed Skill IDs.

Example:

```yaml
skills:
  required:
    - skill_id: SKILL-EXAMPLE-001
      version: "1.x"
      minimum_proficiency: conditional
  preferred: []
```

---

# 31. Skill Boundary

```text
SKILL LISTED
≠
SKILL ASSIGNED

SKILL ASSIGNED
≠
SKILL PROFICIENT
```

---

# 32. Persona References

Agent Definition may reference an approved Persona.

Example:

```yaml
persona:
  persona_id: PERSONA-EXAMPLE-001
  version: "1.x"
```

---

# 33. Persona Boundary

```text
PERSONA
≠
IDENTITY

PERSONA
≠
AUTHORITY
```

---

# 34. Tool Requirements

Template should describe Tool requirements without granting permissions.

Potential:

```yaml
tools:
  required:
    - tool_ref: TOOL-EXAMPLE
      purpose: "..."
      required_operations: []
  optional: []
```

---

# 35. Tool Boundary

```text
TOOL LISTED
≠
TOOL CONNECTED

TOOL CONNECTED
≠
TOOL AUTHORIZED

TOOL AUTHORIZED
≠
EVERY ACTION AUTHORIZED
```

---

# 36. Tool Restrictions

Template may specify restrictions such as:

```text
READ ONLY

NO DELETE

NO PRODUCTION

NO SECRET EXPORT

NO CROSS-TENANT OPERATIONS

APPROVAL BEFORE WRITE
```

---

# 37. Model Requirements

Agent Template may state Model requirements.

Potential:

```yaml
model_requirements:
  capabilities:
    - reasoning
    - structured_output
  preferred_model_class: conditional
  prohibited_model_classes: []
```

---

# 38. Model Boundary

```text
PREFERRED MODEL
≠
APPROVED MODEL
```

---

# 39. Model Version Boundary

```text
MODEL V1 VERIFIED
≠
MODEL V2 VERIFIED
```

---

# 40. Prompt References

Agent Definition may reference Prompt OS artifacts.

Potential:

```yaml
prompts:
  base_prompt_ref: conditional
  layer_refs: []
  task_prompt_refs: []
```

---

# 41. Prompt Boundary

```text
PROMPT REFERENCE
≠
PROMPT LOADED

PROMPT LOADED
≠
BEHAVIOR VERIFIED
```

---

# 42. Private Reasoning Boundary

Agent Definition must not require private Chain-of-Thought as an
enterprise artifact.

Instead use:

```text
RATIONALE SUMMARY

ASSUMPTIONS

RISKS

EVIDENCE REFERENCES

CONFIDENCE

OPEN QUESTIONS
```

where useful.

---

# 43. Memory Requirements

Template may define Memory requirements.

Potential:

```yaml
memory:
  required_types: []
  allowed_scopes: []
  prohibited_scopes: []
  write_policy_ref: conditional
```

---

# 44. Memory Boundary

```text
MEMORY REQUIRED
≠
MEMORY ACCESS AUTHORIZED
```

---

# 45. Knowledge Requirements

Template may declare Knowledge dependencies.

Potential:

```yaml
knowledge:
  required_sources: []
  source_authority_requirements: []
  freshness_requirements: []
```

---

# 46. Knowledge Boundary

```text
KNOWLEDGE RETRIEVED
≠
KNOWLEDGE TRUE

INDEXED
≠
CANONICAL
```

---

# 47. Data Requirements

Agent Definition should state data requirements where material.

Potential:

```yaml
data:
  required_classes: []
  prohibited_classes: []
  minimization_required: true
  retention_constraints: []
```

---

# 48. Data Boundary

```text
DATA NEEDED
≠
DATA ACCESS GRANTED
```

---

# 49. Task Classes

Template should define what Task classes the Agent is intended to
support.

Potential:

```yaml
task_classes:
  allowed_candidates:
    - TASK-CLASS-EXAMPLE
  prohibited:
    - destructive-production-admin
```

---

# 50. Task-Class Boundary

```text
TASK CLASS LISTED
≠
TASK AUTHORIZED
```

---

# 51. Scope Model

Agent Template should make scope explicit.

Potential dimensions:

```text
ORGANIZATION

PROJECT

CUSTOMER

TENANT

ENVIRONMENT

REGION

DATA CLASS
```

---

# 52. Unknown Scope Boundary

```text
UNKNOWN
≠
GLOBAL
```

---

# 53. Project Scope

Example:

```yaml
scope:
  project:
    mode: explicit
    allowed_project_refs: []
```

---

# 54. Project Boundary

```text
PROJECT A AGENT
≠
PROJECT B AUTHORITY
```

---

# 55. Customer Scope

Customer-specific Agents should declare Customer boundaries.

---

# 56. Customer Boundary

```text
CUSTOMER A CONTEXT
≠
CUSTOMER B CONTEXT
```

---

# 57. Tenant Scope

Tenant scope must be explicit for Tenant-facing Agents.

---

# 58. Tenant Boundary

```text
TENANT A
≠
TENANT B
```

---

# 59. Shared Agent Definition

One Agent Definition may potentially serve many Tenant-scoped
allocations.

---

# 60. Shared-Agent Boundary

```text
SHARED AGENT DEFINITION
≠
SHARED TENANT DATA

SHARED AGENT DEFINITION
≠
SHARED MEMORY

SHARED AGENT DEFINITION
≠
SHARED TOOL CREDENTIAL

SHARED AGENT DEFINITION
≠
SHARED AUTHORITY
```

---

# 61. Environment Scope

Agent Definition should explicitly state eligible environments.

Potential:

```yaml
environment:
  allowed:
    - development
    - test
    - staging
  production:
    allowed_by_definition: false
```

---

# 62. Environment Boundary

```text
STAGING-ELIGIBLE
≠
PRODUCTION-AUTHORIZED
```

---

# 63. Production Scope

If Agent may eventually support Production work, Template must still
state:

```text
PRODUCTION EXECUTION
REQUIRES
SEPARATE AUTHORIZATION.
```

---

# 64. Autonomy Level

Agent Template may declare intended autonomy ceiling.

Conceptual examples:

```text
A0 — ADVISORY ONLY

A1 — PLAN / RECOMMEND

A2 — BOUNDED LOW-RISK EXECUTION

A3 — CONTROLLED WORKFLOW EXECUTION

A4+ — REQUIRES SEPARATE ENTERPRISE GOVERNANCE
```

Exact taxonomy is not established here.

---

# 65. Autonomy Boundary

```text
AUTONOMY DECLARED
≠
AUTONOMY GRANTED
```

---

# 66. Autonomy Ceiling

Template should define maximum intended autonomy, not minimum required
autonomy.

---

# 67. Autonomy Escalation Boundary

```text
TASK URGENT
≠
AUTONOMY INCREASED
```

---

# 68. Budget Constraints

Agent Definition may declare expected budget limits.

Potential:

```yaml
budget:
  policy_ref: conditional
  per_task_limit: conditional
  daily_limit: conditional
  monthly_limit: conditional
```

---

# 69. Budget Boundary

```text
BUDGET LISTED
≠
BUDGET APPROVED
```

---

# 70. Approval Requirements

Template should identify when Human/Governance approval is required.

Potential:

```text
PRODUCTION CHANGE

SECURITY CHANGE

DESTRUCTIVE ACTION

CUSTOMER-CONTRACTUAL ACTION

FINANCIAL COMMITMENT

POLICY EXCEPTION

HIGH-RISK DATA ACCESS
```

---

# 71. Approval Boundary

```text
APPROVAL REQUIRED
≠
APPROVAL EXISTS
```

---

# 72. Founder-Reserved Decisions

Where Founder approval is reserved, Agent Template should say so
explicitly.

---

# 73. Founder Boundary

```text
AGENT TEXT:
"FOUNDER APPROVED"
≠
FOUNDER APPROVAL
```

---

# 74. Security Requirements

Every Agent Definition should declare material Security constraints.

Potential:

```text
LEAST PRIVILEGE

NO CROSS-TENANT ACCESS

NO SECRET DISCLOSURE

NO SELF-ASSIGNMENT OF PRIVILEGES

NO SECURITY-POLICY OVERRIDE

PROMPT-INJECTION RESISTANCE

TOOL AUTHORIZATION REQUIRED

DATA MINIMIZATION

AUDIT REQUIRED
```

---

# 75. Security Boundary

```text
SECURITY REQUIREMENT DOCUMENTED
≠
SECURITY CONTROL IMPLEMENTED
```

---

# 76. Identity Requirements

Agent Definition should state identity requirements.

Potential:

```text
STABLE PRINCIPAL REQUIRED

VERSION ATTRIBUTION REQUIRED

ALLOCATION ATTRIBUTION REQUIRED

TENANT BINDING REQUIRED

ENVIRONMENT BINDING REQUIRED
```

---

# 77. Identity Boundary

```text
DEFINITION ID
≠
RUNTIME SECURITY PRINCIPAL
```

---

# 78. Access-Control Requirements

Template may declare required policy references.

But actual authorization belongs to Access Control.

---

# 79. Access-Control Boundary

```text
ACCESS POLICY REF
≠
ACCESS GRANT
```

---

# 80. Compliance Requirements

Where applicable:

```text
DATA PROTECTION

PRIVACY

SECURITY POLICY

INDUSTRY RULES

AUDIT

RECORD RETENTION
```

may be referenced.

---

# 81. Compliance Boundary

```text
COMPLIANCE REQUIREMENT LISTED
≠
COMPLIANCE VERIFIED
```

---

# 82. Risk Classification

Agent Definition should identify material risk characteristics.

Potential:

```text
LOW

MEDIUM

HIGH

CRITICAL
```

Exact taxonomy remains Governance-defined.

---

# 83. Risk Boundary

```text
RISK IDENTIFIED
≠
RISK ACCEPTED
```

---

# 84. Execution Restrictions

Agent Template should identify explicit execution restrictions.

Examples:

```text
NO SHELL EXECUTION

NO DELETE OPERATIONS

NO EXTERNAL EMAIL

NO PRODUCTION DEPLOYMENT

NO CUSTOMER DATA EXPORT

NO CROSS-TENANT ACTION
```

---

# 85. Execution Boundary

```text
RESTRICTION ABSENT
≠
ACTION AUTHORIZED
```

---

# 86. Side-Effect Policy

Template may distinguish:

```text
READ

CREATE

UPDATE

DELETE

EXTERNAL SEND

DEPLOY

FINANCIAL COMMITMENT
```

---

# 87. Side-Effect Boundary

```text
AGENT CAN REASON ABOUT ACTION
≠
AGENT MAY PERFORM ACTION
```

---

# 88. Escalation Rules

Agent Definition should describe when Agent must escalate.

Potential:

```text
UNKNOWN SCOPE

MISSING AUTHORIZATION

CONFLICTING POLICIES

LOW CONFIDENCE

HIGH RISK

SECURITY INCIDENT

PRODUCTION REQUEST

CUSTOMER CONTRACTUAL DECISION

INSUFFICIENT EVIDENCE
```

---

# 89. Escalation Boundary

```text
ESCALATED
≠
APPROVED
```

---

# 90. Refusal Conditions

Agent should refuse or block where required.

Potential:

```text
UNAUTHORIZED ACTION

UNSAFE CROSS-TENANT REQUEST

POLICY VIOLATION

SECRET EXFILTRATION

FOUNDER IMPERSONATION

PRODUCTION BYPASS REQUEST
```

---

# 91. Lifecycle Configuration

Template should define intended lifecycle references.

Potential:

```yaml
lifecycle:
  creation_policy_ref: conditional
  activation_policy_ref: conditional
  suspension_policy_ref: conditional
  retirement_policy_ref: conditional
```

---

# 92. Lifecycle Boundary

```text
DEFINITION COMPLETE
≠
AGENT CREATED

AGENT CREATED
≠
AGENT ACTIVATED
```

---

# 93. Activation Requirements

Template should identify preconditions required before activation.

Potential:

```text
REGISTRY RECORD

IDENTITY

CAPABILITY BINDINGS

SKILL BINDINGS

TOOL POLICY

MODEL POLICY

SECURITY REVIEW

EVALUATION

SCOPE BINDING

APPROVAL
```

---

# 94. Activation Boundary

```text
ACTIVATION PRECONDITIONS LISTED
≠
PRECONDITIONS SATISFIED
```

---

# 95. Evaluation Criteria

Agent Template should define what must be evaluated.

Potential:

```text
TASK COMPLETION

CORRECTNESS

QUALITY

SECURITY

POLICY COMPLIANCE

LATENCY

COST

ESCALATION QUALITY

EVIDENCE QUALITY
```

---

# 96. Evaluation Boundary

```text
EVALUATION CRITERIA DEFINED
≠
AGENT PASSED EVALUATION
```

---

# 97. Benchmark References

Agent Definition may reference required benchmarks.

---

# 98. Benchmark Boundary

```text
BENCHMARK PASS
≠
PRODUCTION AUTHORIZATION
```

---

# 99. Quality Expectations

Potential quality requirements:

```text
CORRECTNESS

COMPLETENESS

CONSISTENCY

TRACEABILITY

SECURITY

REPRODUCIBILITY WHERE APPLICABLE
```

---

# 100. Quality Boundary

```text
QUALITY TARGET
≠
QUALITY VERIFIED
```

---

# 101. Evidence Requirements

Template should define what Evidence must accompany material Agent
claims/actions.

Potential:

```text
SOURCE REFERENCES

TOOL RESULTS

TEST RESULTS

TASK OUTPUT

VALIDATION RESULTS

APPROVAL REFS

AUDIT REFS

OUTCOME EVIDENCE
```

---

# 102. Evidence Boundary

```text
AGENT CLAIM
≠
EVIDENCE
```

---

# 103. Decision Evidence

Agent decisions should preserve enterprise-safe artifacts such as:

```text
DECISION SUMMARY

OPTIONS CONSIDERED

RATIONALE SUMMARY

EVIDENCE REFS

ASSUMPTIONS

RISKS

CONFIDENCE

APPROVAL REFS

OPEN QUESTIONS
```

---

# 104. Private CoT Boundary

```text
PRIVATE CHAIN-OF-THOUGHT
≠
REQUIRED ENTERPRISE AUDIT ARTIFACT
```

---

# 105. Audit Requirements

Agent Template should define material events requiring Audit.

Potential:

```text
ACTIVATION

SUSPENSION

TASK START

TOOL ACTION

APPROVAL REQUEST

SECURITY DENIAL

PRODUCTION REQUEST

ERROR RECOVERY

RETIREMENT
```

---

# 106. Audit Boundary

```text
AUDIT REQUIRED
≠
AUDIT PIPELINE VERIFIED
```

---

# 107. Audit Data Minimization

Audit requirements must not require unnecessary:

```text
RAW SECRETS

TOKENS

PASSWORDS

PRIVATE KEYS

PRIVATE CUSTOMER DATA
```

---

# 108. Observability Requirements

Agent Template may define required visibility into:

```text
HEALTH

TASKS

ERRORS

QUALITY

COST

LATENCY

SECURITY EVENTS

TOOL USE

ESCALATIONS
```

---

# 109. Observability Boundary

```text
OBSERVABILITY REQUIREMENT
≠
OBSERVABILITY IMPLEMENTED
```

---

# 110. Error-Recovery Requirements

Template should specify recovery constraints.

Potential:

```text
RETRY LIMIT

IDEMPOTENCY REQUIREMENT

COMPENSATION REQUIREMENT

ESCALATION THRESHOLD

NO AUTOMATIC PRIVILEGE ESCALATION
```

---

# 111. Retry Boundary

```text
RETRY ALLOWED
≠
RETRY SAFE
```

---

# 112. Rollback Boundary

```text
ROLLBACK AVAILABLE
≠
SIDE EFFECTS FULLY REVERSED
```

---

# 113. Dependency Declaration

Agent Definition should explicitly declare material dependencies.

Potential:

```text
CAPABILITIES

SKILLS

TOOLS

MODELS

PROMPTS

MEMORY

KNOWLEDGE

DATA

POLICIES

SERVICES
```

---

# 114. Dependency Boundary

```text
DEPENDENCY DECLARED
≠
DEPENDENCY AVAILABLE
```

---

# 115. Dependency Fallback

Fallback must never silently expand privilege.

```text
DEPENDENCY FAILED
≠
USE MORE PRIVILEGED ALTERNATIVE
```

---

# 116. Ownership

Every Agent Definition should identify an accountable owner.

---

# 117. Owner Boundary

```text
AGENT OWNER
≠
UNLIMITED AUTHORITY OVER PLATFORM
```

---

# 118. Stewardship

Template may identify operational, security, capability, or domain
stewards.

---

# 119. Provenance

Agent Definition should record origin.

Potential:

```text
FOUNDER DIRECTIVE

AI WORKFORCE DESIGN

PROJECT REQUIREMENT

CUSTOMER REQUIREMENT

INDUSTRY TEMPLATE

MIGRATION

AGENT-PROPOSED CANDIDATE
```

---

# 120. Provenance Boundary

```text
AGENT-PROPOSED DEFINITION
≠
APPROVED DEFINITION
```

---

# 121. Template Inheritance

Future Agent Definitions may inherit from approved templates.

---

# 122. Inheritance Boundary

```text
INHERITED FIELD
≠
INHERITED AUTHORITY
```

---

# 123. Template Override

Local Agent Definitions may override allowed fields.

Security-critical fields should not be overridden without Governance.

---

# 124. Override Boundary

```text
CHILD TEMPLATE
≠
AUTHORITY TO REMOVE
PARENT SECURITY CONTROLS
```

---

# 125. Template Composition

Agent Definition may conceptually compose references from:

```text
BASE AGENT TEMPLATE

AGENT TYPE

ROLE PROFILE

CAPABILITY SET

SKILL SET

PERSONA

SECURITY PROFILE

PROJECT PROFILE
```

---

# 126. Composition Boundary

```text
TEMPLATE COMPOSITION
≠
PERMISSION UNION
```

---

# 127. Multi-Project Agent Definition

One Agent Definition may be reusable across Projects.

Project-specific runtime allocation must remain separate.

---

# 128. Multi-Project Boundary

```text
REUSABLE DEFINITION
≠
GLOBAL PROJECT ACCESS
```

---

# 129. Multi-Customer Agent Definition

Customer-specific configuration should not silently become global
Definition content.

---

# 130. Multi-Tenant Agent Definition

Shared Definition must preserve Tenant boundaries.

---

# 131. Tenant Isolation Rule

```text
AGENT TEMPLATE
MUST NEVER
ENCODE
TENANT A PRIVATE DATA
AS GLOBAL CONTENT
AVAILABLE TO TENANT B.
```

---

# 132. Industry-Agent Templates

Industry Operating Systems may create specialized Agent Definitions.

Examples:

```text
RESTAURANT OPERATIONS AGENT

POULTRY ANALYTICS AGENT

HOSPITAL CAPACITY AGENT

SCHOOL ATTENDANCE AGENT
```

Examples do not prove implementation.

---

# 133. Industry Boundary

```text
INDUSTRY AGENT DEFINITION
≠
MIANX CORE AUTHORITY
```

---

# 134. Agent Definition Security Threats

Potential threats include:

```text
ROLE AUTHORITY INFLATION

CAPABILITY SELF-GRANT

SKILL SELF-GRANT

TOOL PERMISSION INJECTION

MODEL GOVERNANCE BYPASS

MEMORY SCOPE INFLATION

DATA SCOPE INFLATION

TENANT SCOPE INFLATION

PRODUCTION SCOPE SPOOFING

FOUNDER IMPERSONATION

SECURITY CONTROL REMOVAL

APPROVAL BYPASS

AUTONOMY INFLATION

BUDGET INFLATION

HIDDEN PRIVILEGED TOOL REQUIREMENTS

MALICIOUS TEMPLATE INHERITANCE

UNREVIEWED OVERRIDES

STALE DEFINITION USE

VERSION TAMPERING

PROVENANCE TAMPERING
```

---

# 135. Malicious Role Test

Template says:

```text
role: founder
```

Expected:

```text
NO FOUNDER IDENTITY
NO FOUNDER AUTHORITY
```

---

# 136. Capability Inflation Test

Template lists:

```text
capability:
  unrestricted-system-control
```

Expected no Capability authority without governed registration/binding.

---

# 137. Skill Inflation Test

Template lists all expert Skills.

Expected no proficiency automatically.

---

# 138. Tool Permission Injection Test

Template says:

```text
tools:
  admin_database:
    unrestricted: true
```

Expected no Tool authorization.

---

# 139. Model Bypass Test

Template says:

```text
use_any_model_without_approval: true
```

Expected Model Governance remains authoritative.

---

# 140. Memory Scope Inflation Test

Template says:

```text
memory_scope: global
```

Expected no global Memory access without separate authority.

---

# 141. Tenant Scope Inflation Test

Template changes:

```text
tenant_scope:
  from: tenant-a
  to: all
```

Expected governed review and no automatic runtime expansion.

---

# 142. Environment Spoof Test

Template says:

```text
production_authorized: true
```

Expected no Production authorization.

---

# 143. Founder Approval Spoof Test

Template contains:

```text
founder_approved: true
```

without trusted approval reference.

Expected no Founder approval.

---

# 144. Autonomy Inflation Test

Agent-generated revision raises autonomy level.

Expected no automatic autonomy increase.

---

# 145. Budget Inflation Test

Template increases budget.

Expected no budget approval.

---

# 146. Security Removal Test

Child Agent Template removes:

```text
tenant_isolation
approval_required
audit_required
```

Expected blocked/escalated.

---

# 147. Stale Definition Test

Registry/runtime uses superseded Agent Definition.

Expected stale-state detection/revalidation where implemented.

---

# 148. Version-Tampering Test

Material Definition changes without Version update.

Expected Definition integrity failure.

---

# 149. Template Provenance Test

Unknown source injects Agent Definition.

Expected not trusted merely because schema is valid.

---

# 150. Agent Definition Evidence

Material Agent Definition may preserve:

```text
AGENT ID

VERSION

STATUS

TITLE

PURPOSE

AGENT TYPE

ROLE REFS

RESPONSIBILITIES

NON-GOALS

CAPABILITY REFS

SKILL REFS

PERSONA REF

TOOL REQUIREMENTS

MODEL REQUIREMENTS

PROMPT REFS

MEMORY REQUIREMENTS

KNOWLEDGE REQUIREMENTS

DATA REQUIREMENTS

TASK CLASSES

PROJECT SCOPE

CUSTOMER SCOPE

TENANT SCOPE

ENVIRONMENT

AUTONOMY CEILING

BUDGET POLICY

APPROVAL REQUIREMENTS

SECURITY REQUIREMENTS

COMPLIANCE REQUIREMENTS

RISK CLASSIFICATION

EXECUTION RESTRICTIONS

ESCALATION RULES

LIFECYCLE REFS

EVALUATION CRITERIA

EVIDENCE REQUIREMENTS

AUDIT REQUIREMENTS

OWNER

STEWARD

PROVENANCE

CREATED AT

UPDATED AT
```

---

# 151. Evidence Boundary II

```text
AGENT DEFINITION EVIDENCE
≠
RUNTIME EXECUTION EVIDENCE
```

---

# 152. Template Audit Events

Potential:

```text
AGENT_TEMPLATE_CREATED

AGENT_TEMPLATE_VERSION_CREATED

AGENT_DEFINITION_DRAFTED

AGENT_DEFINITION_VALIDATION_REQUESTED

AGENT_DEFINITION_VALIDATED

AGENT_DEFINITION_REVIEW_REQUESTED

AGENT_DEFINITION_APPROVED

AGENT_DEFINITION_REJECTED

AGENT_DEFINITION_UPDATED

AGENT_DEFINITION_SUPERSEDED

AGENT_DEFINITION_DEPRECATED

AGENT_DEFINITION_RETIRED

AGENT_DEFINITION_SCOPE_CHANGED

AGENT_DEFINITION_CAPABILITY_CHANGED

AGENT_DEFINITION_SKILL_CHANGED

AGENT_DEFINITION_TOOL_REQUIREMENT_CHANGED

AGENT_DEFINITION_MODEL_REQUIREMENT_CHANGED

AGENT_DEFINITION_AUTONOMY_CHANGED

AGENT_DEFINITION_SECURITY_CHANGED

AGENT_DEFINITION_PRODUCTION_SCOPE_CHANGED

AGENT_DEFINITION_TENANT_SCOPE_CHANGE_BLOCKED

AGENT_DEFINITION_SECURITY_DOWNGRADE_BLOCKED

AGENT_DEFINITION_VERSION_TAMPERING_DETECTED
```

---

# 153. Audit Attribution

Potential:

```text
AGENT ID

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

# 154. Agent Template Observability

Authorized operators should eventually answer:

```text
HOW MANY AGENT DEFINITIONS EXIST?

HOW MANY ARE DRAFT?

HOW MANY ARE UNDER REVIEW?

HOW MANY ARE APPROVED?

HOW MANY ARE DEPRECATED?

HOW MANY ARE SUPERSEDED?

HOW MANY HAVE NO OWNER?

HOW MANY HAVE MISSING CAPABILITY REFS?

HOW MANY HAVE MISSING SKILL REFS?

HOW MANY HAVE INVALID TOOL REFS?

HOW MANY HAVE STALE MODEL REFS?

HOW MANY HAVE UNKNOWN TENANT SCOPE?

HOW MANY DECLARE PRODUCTION INTENT?

HOW MANY HAVE INCOMPLETE SECURITY REQUIREMENTS?

HOW MANY HAVE UNRESOLVED APPROVALS?
```

---

# 155. Potential Metrics

Conceptual only:

```text
AGENT DEFINITION COUNT

DRAFT DEFINITION COUNT

APPROVED DEFINITION COUNT

SUPERSEDED DEFINITION COUNT

UNOWNED DEFINITION COUNT

MISSING-REFERENCE COUNT

INVALID-SCOPE COUNT

SECURITY-REVIEW FAILURE COUNT

VERSION-INTEGRITY FAILURE COUNT

PRODUCTION-INTENT DEFINITION COUNT
```

---

# 156. Metrics Boundary

No live values are claimed.

---

# 157. Definition Count Boundary

```text
MORE AGENT DEFINITIONS
≠
MORE ACTIVE AGENTS
```

---

# 158. Approved Definition Count Boundary

```text
MORE APPROVED DEFINITIONS
≠
MORE PRODUCTION-READY AGENTS
```

---

# 159. Agent Template Production Gate

Before an Agent Definition based on this Template may be considered
Production-ready:

- [ ] stable Agent ID exists;
- [ ] Agent Version is explicit;
- [ ] Definition status is explicit;
- [ ] title is defined;
- [ ] description is defined;
- [ ] purpose is defined;
- [ ] purpose is bounded;
- [ ] Agent Type is explicit;
- [ ] Agent Type/Authority distinction is preserved;
- [ ] organizational Role references are explicit;
- [ ] Role/Authority distinction is preserved;
- [ ] Founder Role/Founder Identity distinction is preserved;
- [ ] responsibilities are explicit;
- [ ] responsibilities do not imply unrestricted authority;
- [ ] non-goals are explicit;
- [ ] Capability references are explicit;
- [ ] Capability Reference/Grant distinction is preserved;
- [ ] Capability Versions are explicit where required;
- [ ] Skill references are explicit;
- [ ] Skill Reference/Assignment distinction is preserved;
- [ ] Skill Assignment/Proficiency distinction is preserved;
- [ ] Persona reference is explicit where used;
- [ ] Persona/Identity distinction is preserved;
- [ ] Tool requirements are explicit;
- [ ] Tool Required/Connected distinction is preserved;
- [ ] Tool Connected/Authorized distinction is preserved;
- [ ] Tool Authorized/Every Action distinction is preserved;
- [ ] Tool restrictions are explicit;
- [ ] Model requirements are explicit;
- [ ] Model Preference/Authorization distinction is preserved;
- [ ] Model Version assumptions are explicit;
- [ ] Prompt references are explicit where used;
- [ ] Prompt Reference/Loaded distinction is preserved;
- [ ] Prompt Loaded/Behavior Verified distinction is preserved;
- [ ] private Chain-of-Thought is not required as enterprise artifact;
- [ ] rationale-summary format is supported;
- [ ] Memory requirements are explicit;
- [ ] Memory Requirement/Access distinction is preserved;
- [ ] Knowledge requirements are explicit;
- [ ] Knowledge Retrieved/True distinction is preserved;
- [ ] Indexed/Canonical distinction is preserved;
- [ ] data requirements are explicit;
- [ ] Data Requirement/Access distinction is preserved;
- [ ] Task classes are explicit;
- [ ] Task Class/Task Authorization distinction is preserved;
- [ ] Organization scope is explicit where applicable;
- [ ] Project scope is explicit;
- [ ] Customer scope is explicit where applicable;
- [ ] Tenant scope is explicit;
- [ ] environment scope is explicit;
- [ ] Unknown Scope does not default Global;
- [ ] Project A/Project B boundary is preserved;
- [ ] Customer A/Customer B boundary is preserved;
- [ ] Tenant A/Tenant B boundary is preserved;
- [ ] shared Agent Definition does not imply shared Tenant data;
- [ ] shared Agent Definition does not imply shared Memory;
- [ ] shared Agent Definition does not imply shared Tool credentials;
- [ ] shared Agent Definition does not imply shared authority;
- [ ] Production scope is explicit where relevant;
- [ ] Production Intent/Production Authorization distinction is preserved;
- [ ] autonomy ceiling is explicit;
- [ ] Autonomy Declared/Autonomy Granted distinction is preserved;
- [ ] urgency cannot increase autonomy;
- [ ] budget policy is explicit where relevant;
- [ ] Budget Declared/Budget Approved distinction is preserved;
- [ ] approval requirements are explicit;
- [ ] Approval Required/Approval Exists distinction is preserved;
- [ ] Founder-reserved approvals use trusted references;
- [ ] security requirements are explicit;
- [ ] documented Security controls are not claimed implemented without Evidence;
- [ ] Agent identity requirements are explicit;
- [ ] Definition ID/Runtime Principal distinction is preserved;
- [ ] Access-Control references are explicit where relevant;
- [ ] Access Policy Reference/Access Grant distinction is preserved;
- [ ] compliance requirements are explicit where relevant;
- [ ] Compliance Requirement/Verified Compliance distinction is preserved;
- [ ] risk classification is explicit;
- [ ] Risk Identified/Risk Accepted distinction is preserved;
- [ ] execution restrictions are explicit;
- [ ] absence of restriction does not create authorization;
- [ ] side-effect categories are defined where relevant;
- [ ] reasoning about an action does not authorize the action;
- [ ] escalation rules are explicit;
- [ ] Escalation/Approval distinction is preserved;
- [ ] refusal conditions are explicit;
- [ ] lifecycle configuration is defined;
- [ ] Definition Complete/Agent Created distinction is preserved;
- [ ] Agent Created/Activated distinction is preserved;
- [ ] activation preconditions are explicit;
- [ ] activation preconditions are verified, not merely documented;
- [ ] evaluation criteria are explicit;
- [ ] Evaluation Criteria/Passed Evaluation distinction is preserved;
- [ ] benchmark requirements are explicit where relevant;
- [ ] Benchmark Pass/Production Authorization distinction is preserved;
- [ ] quality expectations are explicit;
- [ ] Quality Target/Verified Quality distinction is preserved;
- [ ] Evidence requirements are explicit;
- [ ] Agent Claim/Evidence distinction is preserved;
- [ ] decision records use enterprise-safe rationale summaries;
- [ ] Audit requirements are explicit;
- [ ] raw secrets are excluded from Audit;
- [ ] observability requirements are explicit;
- [ ] Observability Required/Implemented distinction is preserved;
- [ ] Error Recovery requirements are explicit;
- [ ] Retry Allowed/Retry Safe distinction is preserved;
- [ ] Rollback Available/Effects Reversed distinction is preserved;
- [ ] dependencies are explicit;
- [ ] Dependency Declared/Available distinction is preserved;
- [ ] fallback does not increase privilege;
- [ ] owner is explicit;
- [ ] stewards are explicit where needed;
- [ ] provenance is explicit;
- [ ] Agent-Proposed/Approved Definition distinction is preserved;
- [ ] inheritance cannot remove Security controls without Governance;
- [ ] Template Composition/Permission Union distinction is preserved;
- [ ] reusable Definition does not create global Project access;
- [ ] Customer-private content does not become global Definition content;
- [ ] Tenant-private content does not become global Definition content;
- [ ] Industry Agent/Core Authority distinction is preserved;
- [ ] Agent Definition Security threats are defined;
- [ ] Malicious Role test passes;
- [ ] Capability Inflation test passes;
- [ ] Skill Inflation test passes;
- [ ] Tool Permission Injection test passes;
- [ ] Model Bypass test passes;
- [ ] Memory Scope Inflation test passes;
- [ ] Tenant Scope Inflation test passes;
- [ ] Environment Spoof test passes;
- [ ] Founder Approval Spoof test passes;
- [ ] Autonomy Inflation test passes;
- [ ] Budget Inflation test passes;
- [ ] Security Removal test passes;
- [ ] Stale Definition test passes;
- [ ] Version-Tampering test passes;
- [ ] Template Provenance test passes;
- [ ] Agent Definition Evidence is defined;
- [ ] Definition Evidence/Runtime Evidence distinction is preserved;
- [ ] Audit events are defined;
- [ ] Audit attribution is defined;
- [ ] Template Observability is defined;
- [ ] conceptual metrics are defined;
- [ ] no live metrics are claimed;
- [ ] implementation Evidence exists;
- [ ] Agent Definition Governance review is complete;
- [ ] Template Governance review is complete;
- [ ] Agent Framework Governance review is complete;
- [ ] Agent Governance review is complete;
- [ ] Agent Registry Governance review is complete;
- [ ] Agent Lifecycle Governance review is complete;
- [ ] AI Workforce Governance review is complete;
- [ ] AI Operating System Governance review is complete;
- [ ] Agent Runtime Governance review is complete;
- [ ] Role Governance review is complete;
- [ ] Capability Governance review is complete;
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
- [ ] Identity and Access Governance review is complete;
- [ ] Authorization Governance review is complete;
- [ ] Approval Governance review is complete;
- [ ] Compliance Governance review is complete;
- [ ] Risk Governance review is complete;
- [ ] Project Governance review is complete;
- [ ] Customer Governance review is complete where applicable;
- [ ] Tenant Governance review is complete;
- [ ] Environment Governance review is complete;
- [ ] Evaluation Governance review is complete;
- [ ] Quality Governance review is complete;
- [ ] Evidence Governance review is complete;
- [ ] Audit Governance review is complete;
- [ ] Production Governance review is complete;
- [ ] Enterprise Architecture review is complete;
- [ ] Enterprise Governance review is complete;
- [ ] explicit Production Agent authorization exists separately.

---

# 160. Production Hard Stops

Production Agent Definition use must remain blocked, restricted,
escalated, or `NOT_PROVEN` if any known condition includes:

```text
TEMPLATE COMPLETION IS TREATED AS AGENT CREATION

AGENT DEFINITION IS TREATED AS RUNTIME INSTANCE

AGENT DEFINITION IS TREATED AS AGENT RUN

AGENT ID IS MISSING OR AMBIGUOUS

MATERIAL DEFINITION CHANGE OCCURS WITHOUT VERSION CHANGE

DEFINITION STATUS APPROVED IS TREATED AS RUNTIME ACTIVE

PURPOSE IS UNBOUNDED

ROLE REFERENCE IS TREATED AS ROLE AUTHORITY

CEO / EXECUTIVE ROLE IS TREATED AS FOUNDER IDENTITY

RESPONSIBILITY IS TREATED AS PERMISSION

CAPABILITY REFERENCE IS TREATED AS CAPABILITY GRANT

SKILL REFERENCE IS TREATED AS SKILL ASSIGNMENT

SKILL ASSIGNMENT IS TREATED AS PROFICIENCY

PERSONA IS TREATED AS SECURITY IDENTITY

TOOL REQUIREMENT IS TREATED AS TOOL CONNECTION

TOOL CONNECTION IS TREATED AS TOOL AUTHORIZATION

TOOL AUTHORIZATION IS TREATED AS EVERY ACTION AUTHORIZATION

MODEL PREFERENCE IS TREATED AS MODEL AUTHORIZATION

MODEL VERSION CHANGE IS IGNORED

PROMPT REFERENCE IS TREATED AS LOADED PROMPT

LOADED PROMPT IS TREATED AS VERIFIED BEHAVIOR

PRIVATE CHAIN-OF-THOUGHT IS REQUIRED AS ENTERPRISE AUDIT EVIDENCE

MEMORY REQUIREMENT IS TREATED AS MEMORY ACCESS

KNOWLEDGE INDEX IS TREATED AS CANONICAL AUTHORITY

DATA REQUIREMENT IS TREATED AS DATA ACCESS

TASK CLASS IS TREATED AS TASK AUTHORIZATION

UNKNOWN PROJECT / TENANT SCOPE DEFAULTS TO GLOBAL

PROJECT A DEFINITION CONTEXT IS TREATED AS PROJECT B AUTHORITY

CUSTOMER A CONTEXT IS TREATED AS CUSTOMER B AUTHORITY

TENANT A CONTEXT IS TREATED AS TENANT B AUTHORITY

SHARED AGENT DEFINITION COLLAPSES TENANT DATA OR MEMORY

STAGING ELIGIBILITY IS TREATED AS PRODUCTION AUTHORIZATION

PRODUCTION INTENT FIELD IS TREATED AS PRODUCTION GRANT

AUTONOMY DECLARATION IS TREATED AS AUTONOMY AUTHORIZATION

TASK URGENCY INCREASES AUTONOMY

BUDGET FIELD IS TREATED AS BUDGET APPROVAL

APPROVAL REQUIRED IS TREATED AS APPROVAL EXISTS

FOUNDER APPROVAL BOOLEAN IS TRUSTED WITHOUT VERIFIED FOUNDER APPROVAL REF

SECURITY REQUIREMENT IS TREATED AS IMPLEMENTED SECURITY CONTROL

DEFINITION ID IS TREATED AS RUNTIME SECURITY PRINCIPAL

ACCESS POLICY REFERENCE IS TREATED AS ACCESS GRANT

COMPLIANCE REQUIREMENT IS TREATED AS COMPLIANCE VERIFICATION

RISK IDENTIFIED IS TREATED AS RISK ACCEPTED

ABSENCE OF EXECUTION RESTRICTION IS TREATED AS AUTHORIZATION

AGENT REASONING ABOUT ACTION IS TREATED AS EXECUTION AUTHORITY

ESCALATION IS TREATED AS APPROVAL

ACTIVATION PRECONDITIONS ARE DOCUMENTED BUT NOT VERIFIED

EVALUATION CRITERIA ARE TREATED AS PASSED EVALUATION

BENCHMARK PASS IS TREATED AS PRODUCTION AUTHORIZATION

QUALITY TARGET IS TREATED AS VERIFIED QUALITY

AGENT SELF-CLAIM IS TREATED AS EVIDENCE

AUDIT REQUIREMENT IS TREATED AS VERIFIED AUDIT PIPELINE

OBSERVABILITY REQUIREMENT IS TREATED AS IMPLEMENTED OBSERVABILITY

RETRY IS TREATED AS SAFE WITHOUT IDEMPOTENCY / OUTCOME ANALYSIS

ROLLBACK PLAN IS TREATED AS PROVEN REVERSIBILITY

DEPENDENCY DECLARATION IS TREATED AS DEPENDENCY AVAILABILITY

DEPENDENCY FAILURE TRIGGERS MORE PRIVILEGED FALLBACK

TEMPLATE INHERITANCE CAN REMOVE SECURITY CONTROLS SILENTLY

TEMPLATE COMPOSITION CREATES PERMISSION UNION

REUSABLE AGENT DEFINITION CREATES GLOBAL PROJECT ACCESS

CUSTOMER PRIVATE DATA IS STORED IN GLOBAL AGENT DEFINITION

TENANT PRIVATE DATA IS STORED IN GLOBAL AGENT DEFINITION

INDUSTRY AGENT DEFINITION CREATES CORE PLATFORM AUTHORITY

AGENT CAN MODIFY ITS OWN TRUSTED DEFINITION TO EXPAND AUTHORITY

AGENT CAN INCREASE ITS OWN AUTONOMY

AGENT CAN INCREASE ITS OWN BUDGET

AGENT CAN REMOVE APPROVAL REQUIREMENTS

AGENT CAN ADD PRODUCTION SCOPE

AGENT CAN CHANGE TENANT SCOPE TO GLOBAL

AGENT CAN ADD PRIVILEGED TOOLS WITHOUT GOVERNANCE

STALE / SUPERSEDED DEFINITION IS USED WITHOUT REVALIDATION

AGENT DEFINITION PROVENANCE IS UNKNOWN

AGENT TEMPLATE SCHEMA VALIDATION IS NOT VERIFIED

AGENT DEFINITION VERSION INTEGRITY IS NOT VERIFIED

AGENT SCOPE BINDING IS NOT VERIFIED

TENANT ISOLATION IS NOT VERIFIED

TOOL AUTHORIZATION IS NOT VERIFIED

MODEL AUTHORIZATION IS NOT VERIFIED

MEMORY / DATA AUTHORIZATION IS NOT VERIFIED

SECURITY CONTROLS ARE NOT VERIFIED

AGENT REGISTRATION IS NOT VERIFIED

AGENT IDENTITY IS NOT VERIFIED

AGENT ACTIVATION IS NOT VERIFIED

AGENT AUDIT IS NOT VERIFIED

PRODUCTION AGENT EVIDENCE IS MISSING

EXPLICIT PRODUCTION AGENT AUTHORIZATION IS MISSING
```

---

# 161. Agent Template Invariants

The following must remain true:

```text
AGENT TEMPLATE
≠
AGENT

AGENT DEFINITION
≠
AGENT INSTANCE

AGENT INSTANCE
≠
AGENT RUN

TEMPLATE COMPLETED
≠
REGISTERED

REGISTERED
≠
ACTIVE

ACTIVE
≠
AUTHORIZED

ROLE
≠
AUTHORITY

CAPABILITY REFERENCE
≠
CAPABILITY GRANT

SKILL REFERENCE
≠
SKILL ASSIGNMENT

SKILL ASSIGNMENT
≠
SKILL PROFICIENCY

PERSONA
≠
IDENTITY

TOOL REQUIRED
≠
TOOL AUTHORIZED

MODEL PREFERRED
≠
MODEL AUTHORIZED

PROMPT REFERENCED
≠
PROMPT LOADED

MEMORY REQUIRED
≠
MEMORY AUTHORIZED

KNOWLEDGE REQUIRED
≠
KNOWLEDGE TRUSTED

DATA REQUIRED
≠
DATA AUTHORIZED

TASK CLASS
≠
TASK AUTHORIZATION

PROJECT DECLARED
≠
PROJECT AUTHORITY

TENANT DECLARED
≠
TENANT AUTHORITY

STAGING
≠
PRODUCTION

AUTONOMY DECLARED
≠
AUTONOMY GRANTED

BUDGET DECLARED
≠
BUDGET APPROVED

APPROVAL REQUIRED
≠
APPROVAL EXISTS

SECURITY DOCUMENTED
≠
SECURITY IMPLEMENTED

RISK IDENTIFIED
≠
RISK ACCEPTED

EVALUATION DEFINED
≠
EVALUATION PASSED

BENCHMARK PASSED
≠
PRODUCTION AUTHORIZED

AUDIT REQUIRED
≠
AUDIT VERIFIED

DOCUMENTED AGENT DEFINITION
≠
IMPLEMENTED AGENT

IMPLEMENTED AGENT
≠
VERIFIED AGENT

VERIFIED AGENT
≠
PRODUCTION AUTHORIZED
```

---

# 162. Agent Definition Authoring Framework

Before drafting an Agent Definition ask:

```text
WHY DOES THIS AGENT EXIST?

IS A NEW AGENT ACTUALLY REQUIRED?

DOES AN EXISTING AGENT
ALREADY COVER THIS PURPOSE?

WHAT STABLE AGENT ID?

WHAT VERSION?

WHAT AGENT TYPE?

WHAT ROLE?

WHAT RESPONSIBILITIES?

WHAT NON-GOALS?

WHAT CAPABILITIES?

WHAT SKILLS?

WHAT PERSONA?

WHAT TOOLS?

WHAT MODELS?

WHAT PROMPTS?

WHAT MEMORY?

WHAT KNOWLEDGE?

WHAT DATA?

WHAT TASK CLASSES?

WHAT PROJECT?

WHAT CUSTOMER?

WHAT TENANT?

WHAT ENVIRONMENT?

WHAT AUTONOMY CEILING?

WHAT BUDGET?

WHAT APPROVALS?

WHAT SECURITY?

WHAT RISK?

WHAT EVALUATION?

WHAT EVIDENCE?

WHAT AUDIT?

WHO OWNS THE AGENT?
```

---

# 163. Agent Definition Validation Framework

Before review ask:

```text
IS AGENT ID UNIQUE?

IS VERSION VALID?

IS PURPOSE CLEAR?

IS PURPOSE BOUNDED?

ARE RESPONSIBILITIES CLEAR?

ARE NON-GOALS CLEAR?

DO ROLE REFS EXIST?

DO CAPABILITY REFS EXIST?

DO SKILL REFS EXIST?

DO TOOL REFS EXIST?

DO MODEL REQUIREMENTS EXIST?

ARE PROMPT REFS CURRENT?

ARE MEMORY REQUIREMENTS BOUNDED?

ARE KNOWLEDGE SOURCES BOUNDED?

ARE DATA REQUIREMENTS MINIMIZED?

ARE TASK CLASSES BOUNDED?

IS PROJECT SCOPE EXPLICIT?

IS CUSTOMER SCOPE EXPLICIT?

IS TENANT SCOPE EXPLICIT?

IS ENVIRONMENT EXPLICIT?

IS AUTONOMY BOUNDED?

IS BUDGET BOUNDED?

ARE APPROVALS EXPLICIT?

ARE SECURITY REQUIREMENTS EXPLICIT?

ARE PRODUCTION HARD STOPS EXPLICIT?

IS PROVENANCE KNOWN?
```

---

# 164. Agent Definition Security Review Framework

Before approval ask:

```text
CAN THIS DEFINITION
SELF-GRANT AUTHORITY?

CAN IT SELF-ASSIGN CAPABILITIES?

CAN IT SELF-ASSIGN SKILLS?

CAN IT SELECT PRIVILEGED TOOLS
WITHOUT AUTHORIZATION?

CAN IT ACCESS BROADER MEMORY?

CAN IT ACCESS BROADER DATA?

CAN IT CROSS PROJECTS?

CAN IT CROSS CUSTOMERS?

CAN IT CROSS TENANTS?

CAN IT ESCALATE AUTONOMY?

CAN IT ESCALATE BUDGET?

CAN IT SELF-APPROVE?

CAN IT CLAIM FOUNDER AUTHORITY?

CAN IT TARGET PRODUCTION
WITHOUT SEPARATE AUTHORIZATION?

CAN A CHILD / OVERRIDE
REMOVE SECURITY CONTROLS?

IF ANY ANSWER
IS UNSAFELY YES:
BLOCK / REDESIGN / ESCALATE.
```

---

# 165. Agent Definition Production Framework

Before a Definition is accepted for Production use ask:

```text
IS DEFINITION ID VERIFIED?

IS DEFINITION VERSION VERIFIED?

IS DEFINITION CURRENT?

IS DEFINITION NOT SUPERSEDED?

IS REGISTRY RECORD VERIFIED?

IS AGENT IDENTITY VERIFIED?

IS AGENT VERSION VERIFIED?

IS AGENT TYPE VERIFIED?

ARE ROLE REFS VERIFIED?

ARE CAPABILITY REFS VERIFIED?

ARE SKILL REFS VERIFIED?

IS SKILL PROFICIENCY
SEPARATELY VERIFIED?

ARE TOOL REQUIREMENTS VERIFIED?

ARE TOOL PERMISSIONS
SEPARATELY VERIFIED?

IS MODEL APPROVAL VERIFIED?

ARE PROMPT REFS VERIFIED?

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

IS BUDGET
SEPARATELY APPROVED?

ARE REQUIRED APPROVALS VERIFIED?

ARE SECURITY CONTROLS VERIFIED?

IS AUDIT VERIFIED?

IS EVALUATION VERIFIED?

IS OUTCOME EVIDENCE AVAILABLE?

WHO EXPLICITLY AUTHORIZES
PRODUCTION ACTIVATION
AND PRODUCTION ACTIONS?
```

---

# 166. Agent Template Anti-Patterns

Avoid:

```text
THE TEMPLATE IS COMPLETE
=
THE AGENT EXISTS

THE AGENT IS IN REGISTRY
=
THE AGENT IS ACTIVE

THE AGENT IS ACTIVE
=
THE AGENT MAY EXECUTE

THE ROLE SAYS CEO
=
THE AGENT IS THE FOUNDER

THE CAPABILITY IS LISTED
=
THE AGENT HAS AUTHORITY

THE SKILL IS LISTED
=
THE AGENT IS EXPERT

THE TOOL IS LISTED
=
CONNECT AND USE IT

THE MODEL IS PREFERRED
=
USE IT WITHOUT MODEL GOVERNANCE

THE MEMORY IS REQUIRED
=
OPEN ALL MEMORY

THE DATA IS REQUIRED
=
OPEN ALL DATA

THE AGENT NEEDS PROJECT ACCESS
=
GRANT ALL PROJECTS

THE AGENT IS SHARED
=
SHARE TENANT CONTEXT

THE TEMPLATE SAYS PRODUCTION
=
PRODUCTION IS AUTHORIZED

THE TEMPLATE SAYS AUTONOMY A3
=
AUTONOMY A3 IS GRANTED

THE BUDGET FIELD SAYS $X
=
BUDGET IS APPROVED

APPROVAL_REQUIRED: true
=
APPROVED

FOUNDER_APPROVED: true
=
FOUNDER APPROVED

SECURITY: ENABLED
=
SECURITY IS IMPLEMENTED

AUDIT: REQUIRED
=
AUDIT WORKS

BENCHMARK PASSED
=
PRODUCTION READY

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

# 167. Canonical Agent Definition Template

The following is the recommended **authoring template** for future
individual-Agent Definition documents.

```yaml
---
id: AGENT-<DOMAIN>-<FUNCTION>-001
title: <Agent Name>
version: 0.1.0
status: Draft

description: >
  <Clear description of what this Agent Definition represents,
  why it exists, what bounded outcomes it supports, and the most
  important governance and security boundaries.>

type: Mianx.ai Individual Agent Definition
class: Governed Individual-Agent Definition
category: <Agent Category>
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
  - <Document or System Reference>

related_documents:
  - <Reference>

review_cycle:
  - At Every Material Definition Change
  - Before Activation
  - Before Production Use

canonical: false

tags:
  - agent
---

agent_definition:

  identity:
    agent_id: AGENT-<DOMAIN>-<FUNCTION>-001
    agent_version: 0.1.0
    display_name: <Human-Readable Name>
    agent_type_ref: <Agent Type>
    role_refs: []

  purpose:
    mission: >
      <Why this Agent exists.>

    expected_outcomes:
      - <Outcome>

    non_goals:
      - <Explicit non-goal>

  responsibilities:
    primary:
      - <Responsibility>

    secondary: []

  capabilities:
    required:
      - capability_id: <Capability ID>
        version_constraint: <Version>
    optional: []

  skills:
    required:
      - skill_id: <Skill ID>
        version_constraint: <Version>
        minimum_proficiency: <Conditional>
    preferred: []

  persona:
    persona_id: <Conditional>
    persona_version: <Conditional>

  task_classes:
    intended:
      - <Task Class>
    prohibited:
      - <Prohibited Task Class>

  tools:
    required:
      - tool_ref: <Tool>
        purpose: <Purpose>
        required_operations: []
    optional: []
    prohibited: []

  models:
    requirements:
      - <Model Requirement>
    preferred_model_refs: []
    prohibited_model_refs: []

  prompts:
    base_prompt_ref: <Conditional>
    layer_refs: []
    task_prompt_refs: []

  memory:
    required_types: []
    allowed_scopes: []
    prohibited_scopes: []
    write_policy_ref: <Conditional>

  knowledge:
    required_sources: []
    source_authority_requirements: []
    freshness_requirements: []

  data:
    required_classes: []
    prohibited_classes: []
    minimization_required: true
    retention_constraints: []

  scope:
    organization_refs: []
    project_refs: []
    customer_refs: []
    tenant_mode: explicit
    tenant_refs: []
    region_refs: []

  environment:
    allowed:
      - development
      - test
      - staging

    production:
      definition_intent: false
      execution_authorized: false

  autonomy:
    maximum_intended_level: <Level>
    self_escalation_allowed: false
    policy_ref: <Conditional>

  budget:
    policy_ref: <Conditional>
    task_limit: <Conditional>
    daily_limit: <Conditional>
    monthly_limit: <Conditional>

  approvals:
    required_for:
      - <Action Class>

    founder_reserved:
      - <Conditional Decision Class>

  security:
    least_privilege_required: true
    cross_tenant_access: false
    self_permission_grant: false
    self_role_grant: false
    self_capability_grant: false
    self_skill_grant: false
    self_autonomy_escalation: false
    secret_disclosure: prohibited
    security_policy_override: prohibited

  execution:
    allowed_side_effect_classes: []
    prohibited_side_effect_classes: []
    destructive_action_policy_ref: <Conditional>
    retry_policy_ref: <Conditional>
    recovery_policy_ref: <Conditional>

  escalation:
    required_when:
      - authorization_missing
      - scope_unknown
      - high_risk
      - policy_conflict
      - production_request
      - security_incident
      - insufficient_evidence

  lifecycle:
    creation_policy_ref: <Conditional>
    activation_policy_ref: <Conditional>
    suspension_policy_ref: <Conditional>
    retirement_policy_ref: <Conditional>

  evaluation:
    criteria:
      - correctness
      - quality
      - security
      - policy_compliance
      - evidence_quality

    benchmark_refs: []
    minimum_required_evidence: []

  evidence:
    required:
      - <Evidence Type>

  audit:
    required_events:
      - <Audit Event>

  observability:
    required_signals:
      - health
      - errors
      - tool_use
      - security_events

  provenance:
    source_type: <Source>
    source_ref: <Conditional>
    authored_by: <Actor>
    reviewed_by: []
    approved_by: []

  runtime_truth:
    definition_implemented: NOT_PROVEN
    registry_record: NOT_PROVEN
    security_identity: NOT_PROVEN
    agent_instance: NOT_PROVEN
    activation: NOT_PROVEN
    capability_bindings: NOT_PROVEN
    skill_bindings: NOT_PROVEN
    tool_authorization: NOT_PROVEN
    model_authorization: NOT_PROVEN
    project_isolation: NOT_PROVEN
    tenant_isolation: NOT_PROVEN
    audit_runtime: NOT_PROVEN
    production_operation: NOT_PROVEN

  production:
    authorized_by_this_definition: false
    production_status: NOT_AUTHORIZED_BY_THIS_DOCUMENT
---
```

---

# 168. Template Authoring Rules

When using the template:

```text
DO NOT
INVENT
RUNTIME STATUS.

DO NOT
MARK
NOT_PROVEN
AS IMPLEMENTED
WITHOUT EVIDENCE.

DO NOT
TURN
DESCRIPTION FIELDS
INTO AUTHORITY.

DO NOT
USE
ROLE / PERSONA /
CAPABILITY / SKILL
AS PERMISSION.

DO NOT
PLACE
RAW SECRETS
IN AGENT DEFINITIONS.

DO NOT
USE
TENANT-PRIVATE DATA
IN GLOBAL DEFINITIONS.

DO NOT
MARK
PRODUCTION AUTHORIZED
WITHOUT SEPARATE
TRUSTED AUTHORIZATION.
```

---

# 169. Required Truth Fields

Each implementation-sensitive Agent Definition should explicitly
distinguish:

```text
DOCUMENTED

IMPLEMENTED

VERIFIED

PRODUCTION AUTHORIZED
```

---

# 170. Truth Boundary

```text
DOCUMENTED
≠
IMPLEMENTED

IMPLEMENTED
≠
VERIFIED

VERIFIED
≠
PRODUCTION AUTHORIZED
```

---

# 171. Current Agent Template Architecture Truth

At the current documentation stage:

```text
AGENT_TEMPLATE_STANDARD
=
DEFINED_TARGET_STATE

AGENT_DEFINITION_METADATA_MODEL
=
DEFINED_TARGET_STATE

AGENT_IDENTITY_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

AGENT_ROLE_REFERENCE_MODEL
=
DEFINED_TARGET_STATE

AGENT_CAPABILITY_REFERENCE_MODEL
=
DEFINED_TARGET_STATE

AGENT_SKILL_REFERENCE_MODEL
=
DEFINED_TARGET_STATE

AGENT_PERSONA_REFERENCE_MODEL
=
DEFINED_TARGET_STATE

AGENT_TOOL_REQUIREMENT_MODEL
=
DEFINED_TARGET_STATE

AGENT_MODEL_REQUIREMENT_MODEL
=
DEFINED_TARGET_STATE

AGENT_PROMPT_REFERENCE_MODEL
=
DEFINED_TARGET_STATE

AGENT_MEMORY_REQUIREMENT_MODEL
=
DEFINED_TARGET_STATE

AGENT_KNOWLEDGE_REQUIREMENT_MODEL
=
DEFINED_TARGET_STATE

AGENT_DATA_REQUIREMENT_MODEL
=
DEFINED_TARGET_STATE

AGENT_TASK_CLASS_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

AGENT_SCOPE_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

AGENT_AUTONOMY_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

AGENT_BUDGET_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

AGENT_APPROVAL_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

AGENT_SECURITY_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

AGENT_EXECUTION_RESTRICTION_MODEL
=
DEFINED_TARGET_STATE

AGENT_ESCALATION_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

AGENT_LIFECYCLE_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

AGENT_EVALUATION_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

AGENT_EVIDENCE_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

AGENT_AUDIT_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

AGENT_RUNTIME_TRUTH_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE

AGENT_PRODUCTION_TEMPLATE_MODEL
=
DEFINED_TARGET_STATE
```

---

# 172. Runtime Truth

At the current documentation stage:

```text
AGENT_TEMPLATE_VALIDATION_RUNTIME
=
NOT_PROVEN

AGENT_DEFINITION_SCHEMA_RUNTIME
=
NOT_PROVEN

AGENT_DEFINITION_PERSISTENCE
=
NOT_PROVEN

AGENT_DEFINITION_VERSION_ENFORCEMENT
=
NOT_PROVEN

AGENT_TEMPLATE_INHERITANCE_RUNTIME
=
NOT_PROVEN

AGENT_TEMPLATE_COMPOSITION_RUNTIME
=
NOT_PROVEN

AGENT_REFERENCE_VALIDATION_RUNTIME
=
NOT_PROVEN

AGENT_SCOPE_VALIDATION_RUNTIME
=
NOT_PROVEN

AGENT_SECURITY_TEMPLATE_ENFORCEMENT
=
NOT_PROVEN

AGENT_AUTONOMY_TEMPLATE_ENFORCEMENT
=
NOT_PROVEN

AGENT_BUDGET_TEMPLATE_ENFORCEMENT
=
NOT_PROVEN

AGENT_APPROVAL_TEMPLATE_ENFORCEMENT
=
NOT_PROVEN

AGENT_REGISTRY_TEMPLATE_INTEGRATION
=
NOT_PROVEN

AGENT_LIFECYCLE_TEMPLATE_INTEGRATION
=
NOT_PROVEN

PROJECT_AGENT_TEMPLATE_ISOLATION
=
NOT_PROVEN

CUSTOMER_AGENT_TEMPLATE_ISOLATION
=
NOT_PROVEN

TENANT_AGENT_TEMPLATE_ISOLATION
=
NOT_PROVEN

AGENT_TEMPLATE_AUDIT_RUNTIME
=
NOT_PROVEN

CONTROLLED_AGENT_TEMPLATE_PILOT
=
NOT_PROVEN

PRODUCTION_AGENT_DEFINITION_RUNTIME
=
NOT_PROVEN
```

---

# 173. Approval Status

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

AGENT_DEFINITION_GOVERNANCE_APPROVAL
=
PENDING

TEMPLATE_GOVERNANCE_APPROVAL
=
PENDING

AGENT_REGISTRY_GOVERNANCE_APPROVAL
=
PENDING

AGENT_LIFECYCLE_GOVERNANCE_APPROVAL
=
PENDING

AI_WORKFORCE_GOVERNANCE_APPROVAL
=
PENDING

AI_OPERATING_SYSTEM_GOVERNANCE_APPROVAL
=
PENDING

AGENT_RUNTIME_GOVERNANCE_APPROVAL
=
PENDING

ROLE_GOVERNANCE_APPROVAL
=
PENDING

CAPABILITY_GOVERNANCE_APPROVAL
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

IDENTITY_AND_ACCESS_GOVERNANCE_APPROVAL
=
PENDING

AUTHORIZATION_GOVERNANCE_APPROVAL
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

EVALUATION_GOVERNANCE_APPROVAL
=
PENDING

QUALITY_GOVERNANCE_APPROVAL
=
PENDING

EVIDENCE_GOVERNANCE_APPROVAL
=
PENDING

AUDIT_GOVERNANCE_APPROVAL
=
PENDING

PRODUCTION_GOVERNANCE_APPROVAL
=
PENDING
```

---

# 174. Canonical Status

```text
CANONICAL
=
FALSE
```

---

# 175. Production Status

```text
AGENT_TEMPLATE_STANDARD
=
DOCUMENTED_TARGET_STATE

AGENT_TEMPLATE_IMPLEMENTATION
=
NOT_PROVEN

AGENT_DEFINITION_SCHEMA_RUNTIME
=
NOT_PROVEN

AGENT_TEMPLATE_VALIDATION_RUNTIME
=
NOT_PROVEN

AGENT_REFERENCE_VALIDATION
=
NOT_PROVEN

AGENT_SCOPE_VALIDATION
=
NOT_PROVEN

AGENT_SECURITY_TEMPLATE_ENFORCEMENT
=
NOT_PROVEN

AGENT_REGISTRY_INTEGRATION
=
NOT_PROVEN

AGENT_LIFECYCLE_INTEGRATION
=
NOT_PROVEN

TENANT_AGENT_TEMPLATE_ISOLATION
=
NOT_PROVEN

AGENT_TEMPLATE_AUDIT
=
NOT_PROVEN

PRODUCTION_AGENT_DEFINITION
=
NOT_AUTHORIZED_BY_THIS_DOCUMENT

PRODUCTION_OPERATIONAL
=
NOT_PROVEN
```

---

# 176. Preserved Agent Template Truth

```text
AGENT TEMPLATE
≠
AGENT

AGENT DEFINITION
≠
AGENT INSTANCE

TEMPLATE COMPLETED
≠
AGENT REGISTERED

REGISTERED
≠
ACTIVATED

ACTIVATED
≠
AUTHORIZED

ROLE REFERENCE
≠
ROLE AUTHORITY

CAPABILITY REFERENCE
≠
CAPABILITY GRANT

SKILL REFERENCE
≠
SKILL PROFICIENCY

PERSONA REFERENCE
≠
IDENTITY

TOOL REQUIREMENT
≠
TOOL AUTHORIZATION

MODEL REQUIREMENT
≠
MODEL AUTHORIZATION

MEMORY REQUIREMENT
≠
MEMORY AUTHORIZATION

DATA REQUIREMENT
≠
DATA AUTHORIZATION

TASK CLASS
≠
TASK AUTHORIZATION

PROJECT SCOPE
≠
PROJECT AUTHORITY

TENANT SCOPE
≠
TENANT AUTHORITY

AUTONOMY CEILING
≠
AUTONOMY GRANT

BUDGET LIMIT
≠
BUDGET APPROVAL

APPROVAL REQUIRED
≠
APPROVAL EXISTS

SECURITY REQUIREMENT
≠
SECURITY IMPLEMENTED

EVALUATION DEFINED
≠
EVALUATION PASSED

AUDIT REQUIRED
≠
AUDIT VERIFIED

PRODUCTION INTENT
≠
PRODUCTION AUTHORIZATION

DOCUMENTED AGENT
≠
IMPLEMENTED AGENT

IMPLEMENTED AGENT
≠
VERIFIED AGENT

VERIFIED AGENT
≠
PRODUCTION AUTHORIZED
```

---

# 177. Agent Template Completion Checklist

Before this document is content-complete for review:

- [ ] Agent Template purpose is defined;
- [ ] Agent Template mission is defined;
- [ ] Template/Agent distinction is explicit;
- [ ] Definition/Instance distinction is explicit;
- [ ] Instance/Run distinction is explicit;
- [ ] Template/Registration distinction is explicit;
- [ ] Registration/Activation distinction is explicit;
- [ ] Activation/Authorization distinction is explicit;
- [ ] mandatory metadata is defined;
- [ ] stable Agent ID is defined;
- [ ] Agent ID/Display Name distinction is explicit;
- [ ] Agent Version is defined;
- [ ] Definition Status is defined;
- [ ] Approved Definition/Active Runtime distinction is explicit;
- [ ] Agent Description is defined;
- [ ] Purpose is defined;
- [ ] broad Purpose/Broad Authority distinction is explicit;
- [ ] Agent Type is defined;
- [ ] Agent Type/Security Role distinction is explicit;
- [ ] organizational Role reference is defined;
- [ ] Role/Permission distinction is explicit;
- [ ] CEO Agent/Founder distinction is explicit;
- [ ] responsibilities are defined;
- [ ] Responsibility/Permission distinction is explicit;
- [ ] non-goals are defined;
- [ ] Capability references are defined;
- [ ] Capability Reference/Grant distinction is explicit;
- [ ] Skill references are defined;
- [ ] Skill Reference/Assignment distinction is explicit;
- [ ] Skill Assignment/Proficiency distinction is explicit;
- [ ] Persona references are defined;
- [ ] Persona/Identity distinction is explicit;
- [ ] Tool requirements are defined;
- [ ] Tool Required/Connected distinction is explicit;
- [ ] Tool Connected/Authorized distinction is explicit;
- [ ] Tool restrictions are defined;
- [ ] Model requirements are defined;
- [ ] Preferred Model/Authorized Model distinction is explicit;
- [ ] Model Version change is considered;
- [ ] Prompt references are defined;
- [ ] Prompt Reference/Loaded distinction is explicit;
- [ ] Prompt Loaded/Behavior Verified distinction is explicit;
- [ ] private Chain-of-Thought is not required;
- [ ] enterprise-safe rationale-summary fields are supported;
- [ ] Memory requirements are defined;
- [ ] Memory Requirement/Access distinction is explicit;
- [ ] Knowledge requirements are defined;
- [ ] Knowledge Retrieval/Truth distinction is explicit;
- [ ] Indexed/Canonical distinction is explicit;
- [ ] Data requirements are defined;
- [ ] Data Requirement/Access distinction is explicit;
- [ ] Task classes are defined;
- [ ] Task Class/Task Authorization distinction is explicit;
- [ ] scope model is defined;
- [ ] Unknown Scope/Global distinction is explicit;
- [ ] Project scope is defined;
- [ ] Customer scope is defined;
- [ ] Tenant scope is defined;
- [ ] shared Agent Definition boundaries are explicit;
- [ ] environment scope is defined;
- [ ] Staging/Production distinction is explicit;
- [ ] Production Intent/Authorization distinction is explicit;
- [ ] autonomy ceiling is defined;
- [ ] Autonomy Declared/Granted distinction is explicit;
- [ ] urgency cannot increase autonomy;
- [ ] budget constraints are defined;
- [ ] Budget Declared/Approved distinction is explicit;
- [ ] approval requirements are defined;
- [ ] Approval Required/Exists distinction is explicit;
- [ ] Founder-reserved decisions are defined;
- [ ] Founder claim/Founder Approval distinction is explicit;
- [ ] Security requirements are defined;
- [ ] Security Documented/Implemented distinction is explicit;
- [ ] Identity requirements are defined;
- [ ] Definition ID/Runtime Principal distinction is explicit;
- [ ] Access-Control requirements are defined;
- [ ] Policy Reference/Access Grant distinction is explicit;
- [ ] compliance requirements are defined where applicable;
- [ ] Compliance Requirement/Verified distinction is explicit;
- [ ] risk classification is defined;
- [ ] Risk Identified/Accepted distinction is explicit;
- [ ] execution restrictions are defined;
- [ ] absence of explicit restriction does not create authorization;
- [ ] side-effect policy is defined;
- [ ] Reasoning/Execution distinction is explicit;
- [ ] escalation rules are defined;
- [ ] Escalation/Approval distinction is explicit;
- [ ] refusal conditions are defined;
- [ ] lifecycle configuration is defined;
- [ ] Definition Complete/Agent Created distinction is explicit;
- [ ] Agent Created/Activated distinction is explicit;
- [ ] activation requirements are defined;
- [ ] Activation Preconditions Listed/Satisfied distinction is explicit;
- [ ] evaluation criteria are defined;
- [ ] Evaluation Criteria/Passed distinction is explicit;
- [ ] benchmark references are defined;
- [ ] Benchmark Pass/Production Authorization distinction is explicit;
- [ ] quality expectations are defined;
- [ ] Quality Target/Verified Quality distinction is explicit;
- [ ] Evidence requirements are defined;
- [ ] Agent Claim/Evidence distinction is explicit;
- [ ] decision Evidence excludes private CoT requirement;
- [ ] Audit requirements are defined;
- [ ] raw secrets are excluded from Audit;
- [ ] Observability requirements are defined;
- [ ] Observability Required/Implemented distinction is explicit;
- [ ] Error-Recovery requirements are defined;
- [ ] Retry Allowed/Retry Safe distinction is explicit;
- [ ] Rollback/Side-Effect Reversal distinction is explicit;
- [ ] dependencies are defined;
- [ ] Dependency Declared/Available distinction is explicit;
- [ ] fallback cannot increase authority;
- [ ] Ownership is defined;
- [ ] Stewardship is defined;
- [ ] Provenance is defined;
- [ ] Agent-Proposed/Approved Definition distinction is explicit;
- [ ] Template inheritance is bounded;
- [ ] inherited configuration does not inherit authority;
- [ ] Template overrides cannot remove Security without Governance;
- [ ] Template Composition/Permission Union distinction is explicit;
- [ ] Multi-Project reuse is bounded;
- [ ] Multi-Customer privacy is bounded;
- [ ] Multi-Tenant reuse is bounded;
- [ ] Tenant-private data is not globalized;
- [ ] Industry Agent examples are truth-bounded;
- [ ] Agent Definition Security threats are defined;
- [ ] Malicious Role test passes;
- [ ] Capability Inflation test passes;
- [ ] Skill Inflation test passes;
- [ ] Tool Permission Injection test passes;
- [ ] Model Bypass test passes;
- [ ] Memory Scope Inflation test passes;
- [ ] Tenant Scope Inflation test passes;
- [ ] Environment Spoof test passes;
- [ ] Founder Approval Spoof test passes;
- [ ] Autonomy Inflation test passes;
- [ ] Budget Inflation test passes;
- [ ] Security Removal test passes;
- [ ] Stale Definition test passes;
- [ ] Version-Tampering test passes;
- [ ] Template Provenance test passes;
- [ ] Agent Definition Evidence is defined;
- [ ] Definition Evidence/Runtime Evidence distinction is explicit;
- [ ] Template Audit events are defined;
- [ ] Audit attribution is defined;
- [ ] Agent Template Observability is defined;
- [ ] conceptual metrics are defined;
- [ ] no live metrics are claimed;
- [ ] Production Gate is defined;
- [ ] Production Hard Stops are defined;
- [ ] Agent Template Invariants are defined;
- [ ] Authoring Framework is defined;
- [ ] Validation Framework is defined;
- [ ] Security Review Framework is defined;
- [ ] Production Framework is defined;
- [ ] Anti-Patterns are defined;
- [ ] canonical Agent Definition authoring template is included;
- [ ] Runtime Truth consistently uses `NOT_PROVEN`;
- [ ] no fabricated Agent Definition validator is claimed;
- [ ] no fabricated Agent Definition persistence is claimed;
- [ ] no fabricated Template inheritance runtime is claimed;
- [ ] no fabricated Template composition runtime is claimed;
- [ ] no fabricated Agent reference validator is claimed;
- [ ] no fabricated scope validator is claimed;
- [ ] no fabricated Agent Registry integration is claimed;
- [ ] no fabricated Lifecycle integration is claimed;
- [ ] no fabricated Project Agent isolation is claimed;
- [ ] no fabricated Customer Agent isolation is claimed;
- [ ] no fabricated Tenant Agent isolation is claimed;
- [ ] no fabricated Production Agent runtime is claimed;
- [ ] next document is identified.

---

# 178. Revision History

| Version | Date | Status | Author | Change |
|---|---|---|---|---|
| 0.1.0 | 2026-08-10 | Draft | Mianx.ai | Initial enterprise Agent Definition template |
| 1.0.0 | 2026-08-10 | Draft | Mianx.ai | Established complete individual-Agent Definition authoring template covering stable Agent identity, Versioning, purpose, Agent Type, Role references, responsibilities, non-goals, Capabilities, Skills, Personas, Tools, Models, Prompts, Memory, Knowledge, data, Task classes, Project/Customer/Tenant/environment scope, autonomy, budgets, approvals, Security, compliance, risk, execution restrictions, escalation, lifecycle, evaluation, quality, Evidence, Audit, observability, dependency declarations, inheritance, composition, Multi-Project/Multi-Tenant boundaries, adversarial tests, runtime truth, canonical authoring schema, Production gates, and Production Hard Stops |

---

# 179. Changelog Entry

Add during final module Changelog synchronization to:

```text
doc/22-agent-framework/CHANGELOG.md
```

```markdown
## AGENT-FRAMEWORK-CHG-20260810-066 — Governed Individual-Agent Definition Template Established

| Field | Value |
|---|---|
| Date | 2026-08-10 |
| Change Type | `CREATED`, `AGENT-FRAMEWORK`, `TEMPLATES`, `AGENT-TEMPLATE`, `AGENT-DEFINITION`, `SECURITY`, `GOVERNANCE`, `PRODUCTION-READINESS` |
| Impact | `I5 — Foundational / Enterprise-Wide` |
| Risk | `R4 — High` |
| Status | `Completed for Review` |
| Owner | Mianx.ai Founder |
| Approver | Pending Founder, Enterprise Governance, Enterprise Architecture, Agent Framework Governance, Agent Governance, Agent Definition Governance, Template Governance, Agent Registry Governance, Agent Lifecycle Governance, AI Workforce Governance, AI Operating System Governance, Agent Runtime Governance, Role Governance, Capability Governance, Skill Governance, Persona Governance, Tool Governance, Model Governance, Prompt Governance, Memory Governance, Knowledge Governance, Data Governance, Task Governance, Execution Governance, Security Governance, Identity and Access Governance, Authorization Governance, Approval Governance, Compliance Governance, Risk Governance, Project Governance, Customer Governance, Tenant Governance, Environment Governance, Evaluation Governance, Quality Governance, Evidence Governance, Audit Governance, and Production Governance Review |

### Affected Document

`doc/22-agent-framework/templates/agent-template.md`

### New State

The Agent Framework now defines a governed enterprise Agent Definition
template covering:

- stable Agent identity;
- Agent Versioning;
- Definition status;
- Agent purpose;
- Agent Type;
- organizational Role references;
- responsibilities;
- explicit non-goals;
- Capability references;
- Skill references;
- Persona references;
- Tool requirements and restrictions;
- Model requirements;
- Prompt references;
- private-reasoning boundaries;
- Memory requirements;
- Knowledge requirements;
- data requirements;
- Task classes;
- Organization, Project, Customer and Tenant scope;
- environment scope;
- Production intent boundaries;
- autonomy ceilings;
- budget constraints;
- approval requirements;
- Founder-reserved decisions;
- Security requirements;
- identity requirements;
- Access-Control references;
- compliance requirements;
- risk classification;
- execution restrictions;
- side-effect classes;
- escalation;
- refusal conditions;
- lifecycle configuration;
- activation requirements;
- evaluation criteria;
- benchmark references;
- quality expectations;
- Evidence requirements;
- Audit requirements;
- Observability requirements;
- Error-Recovery constraints;
- dependency declarations;
- ownership;
- stewardship;
- provenance;
- Template inheritance;
- Template overrides;
- Template composition;
- Multi-Project reuse;
- Multi-Customer boundaries;
- Multi-Tenant boundaries;
- Industry Agent boundaries;
- Agent Definition Security threats;
- adversarial tests;
- canonical Agent Definition authoring schema;
- Runtime Truth;
- Production gates;
- Production Hard Stops.

### Documentation Truth

```text
AGENT_TEMPLATE_STANDARD
=
CONTENT_COMPLETE_FOR_REVIEW

AGENT_TEMPLATE_VALIDATION_RUNTIME
=
NOT_PROVEN

AGENT_DEFINITION_SCHEMA_RUNTIME
=
NOT_PROVEN

AGENT_DEFINITION_PERSISTENCE
=
NOT_PROVEN

AGENT_REFERENCE_VALIDATION_RUNTIME
=
NOT_PROVEN

AGENT_SCOPE_VALIDATION_RUNTIME
=
NOT_PROVEN

TENANT_AGENT_TEMPLATE_ISOLATION
=
NOT_PROVEN

PRODUCTION_AGENT_DEFINITION
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

AGENT_DEFINITION_GOVERNANCE_APPROVAL
=
PENDING

TEMPLATE_GOVERNANCE_APPROVAL
=
PENDING

AGENT_REGISTRY_GOVERNANCE_APPROVAL
=
PENDING

AGENT_LIFECYCLE_GOVERNANCE_APPROVAL
=
PENDING

AI_WORKFORCE_GOVERNANCE_APPROVAL
=
PENDING

AI_OPERATING_SYSTEM_GOVERNANCE_APPROVAL
=
PENDING

AGENT_RUNTIME_GOVERNANCE_APPROVAL
=
PENDING

CAPABILITY_GOVERNANCE_APPROVAL
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

SECURITY_GOVERNANCE_APPROVAL
=
PENDING

AUTHORIZATION_GOVERNANCE_APPROVAL
=
PENDING

PROJECT_GOVERNANCE_APPROVAL
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

# 180. Documentation Progress

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
1

TOTAL_CONTENT_COMPLETE_FOR_REVIEW
=
66

REMAINING_DOCUMENTS
=
12
```

This is **documentation content progress only**.

It does not mean:

```text
AGENT_FRAMEWORK_IMPLEMENTATION
=
66 / 78
```

---

# 181. Templates Folder Status

```text
templates/agent-template.md
=
CONTENT_COMPLETE_FOR_REVIEW

templates/capability-template.md
=
NEXT

templates/persona-template.md
=
PENDING

templates/skill-template.md
=
PENDING
```

Therefore:

```text
doc/22-agent-framework/templates/
=
1 / 4
CONTENT_COMPLETE_FOR_REVIEW
```

---

# 182. Next Document

The next document is:

```text
doc/22-agent-framework/templates/capability-template.md
```

Recommended Document ID:

```text
AGENT-CAPABILITY-TEMPLATE-001
```

Purpose:

> **Define the governed enterprise template used to author consistent
> Mianx.ai Agent Capability Definitions, including stable Capability
> identity, Version, purpose, outcome semantics, scope, Agent-Type and
> Role applicability, supporting Skills, prerequisites, dependencies,
> Tool and Model requirements, Memory, Knowledge and data requirements,
> Task-class applicability, risk classification, environment
> applicability, approval requirements, evidence requirements,
> evaluation criteria, ownership, provenance, lifecycle, deprecation,
> supersession, Security constraints, audit expectations, runtime-truth
> fields and Production hard stops while preserving the permanent rule
> that completing, cataloging, approving, assigning, or referencing a
> Capability Definition never independently grants that Capability to
> an Agent, creates Tool/data/Memory permission, expands autonomy,
> creates Task authority, or authorizes Production execution.**

---

# Final Agent Template Rule

```text
THE AGENT TEMPLATE
ANSWERS:

"HOW MUST
A MIANX AGENT
BE DEFINED
BEFORE
REGISTRATION,
ACTIVATION,
AND EXECUTION
CAN EVEN BE
CONSIDERED?"

IT DOES NOT ANSWER:

"IS THIS AGENT
AUTHORIZED
TO OPERATE?"
```

Correct Agent Definition chain:

```text
AGENT NEED
↓
AGENT TEMPLATE
↓
AGENT DEFINITION
↓
VERSION
↓
GOVERNANCE REVIEW
↓
REGISTRY
↓
IDENTITY
↓
ALLOCATION
↓
CAPABILITY / SKILL BINDINGS
↓
TOOL / MODEL / MEMORY / DATA POLICIES
↓
SECURITY + SCOPE VALIDATION
↓
ACTIVATION
↓
TASK-SPECIFIC AUTHORIZATION
↓
CONTROLLED RUN
↓
EVIDENCE
↓
VERIFICATION
```

Permanent boundaries:

```text
TEMPLATE
≠
AGENT

DEFINITION
≠
INSTANCE

REGISTERED
≠
ACTIVE

ACTIVE
≠
AUTHORIZED

ROLE
≠
AUTHORITY

CAPABILITY REFERENCE
≠
CAPABILITY GRANT

SKILL REFERENCE
≠
SKILL PROFICIENCY

PERSONA
≠
IDENTITY

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

PROJECT DECLARED
≠
PROJECT AUTHORITY

TENANT DECLARED
≠
TENANT AUTHORITY

AUTONOMY DECLARED
≠
AUTONOMY GRANTED

BUDGET DECLARED
≠
BUDGET APPROVED

APPROVAL REQUIRED
≠
APPROVAL EXISTS

SECURITY DOCUMENTED
≠
SECURITY VERIFIED

PRODUCTION INTENT
≠
PRODUCTION AUTHORIZATION

AGENT DEFINITION VERIFIED
≠
PRODUCTION AGENT EXECUTION AUTHORIZED
```

The enterprise Agent Template equation is:

```text
STABLE IDENTITY
+
VERSIONED DEFINITION
+
BOUNDED PURPOSE
+
EXPLICIT RESPONSIBILITIES
+
NON-GOALS
+
ROLE REFERENCES
+
CAPABILITY REFERENCES
+
SKILL REFERENCES
+
TOOL / MODEL / MEMORY / DATA REQUIREMENTS
+
PROJECT / CUSTOMER / TENANT / ENVIRONMENT SCOPE
+
AUTONOMY CEILING
+
BUDGET BOUNDARIES
+
SECURITY
+
APPROVALS
+
LIFECYCLE
+
EVALUATION
+
EVIDENCE
+
AUDIT
+
RUNTIME TRUTH
=
TRUSTWORTHY ENTERPRISE AGENT DEFINITION
```

---