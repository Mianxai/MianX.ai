---
id: AIW-TPL-AGENT-001
title: Mianx.ai Governed AI Agent Definition Template
version: 1.0.0
status: Draft

type: Enterprise Reusable AI Agent Definition, Registration, Verification, Activation, and Evidence Template
class: Governed Agent Specification Template

owner: Mianx.ai Founder
steward: AI Workforce Council, Agent Governance, and Organization Governance
authority: Founder and Enterprise Governance

maintainers:
  - Founder Office
  - Enterprise Governance
  - AI Workforce Council
  - AI Workforce Operations
  - Agent Governance
  - Organization Governance
  - Department Governance
  - Team Governance
  - Role Governance
  - Capability Governance
  - Tool Governance
  - Model Governance
  - Memory Governance
  - Orchestration Governance
  - Workflow Governance
  - Task Governance
  - Product Governance
  - Project Governance
  - Customer Governance
  - Tenant Governance
  - Security Governance
  - Data and Privacy Governance
  - Enterprise Ethics Governance
  - Legal and Compliance Governance
  - Enterprise Risk Governance
  - Quality Governance
  - Performance Governance
  - Documentation Governance
  - Audit Governance

reviewers:
  - Founder
  - Founder Office
  - Enterprise Governance
  - AI Workforce Council
  - Agent Owners
  - Human Accountable Owners
  - Department Owners
  - Team Owners
  - Role Owners
  - Capability Owners
  - Tool Owners
  - Model Owners
  - Memory Owners
  - Product Owners
  - Project Owners
  - Customer Owners
  - Tenant Owners
  - Security Owners
  - Privacy Owners
  - Ethics Owners
  - Compliance Owners
  - Risk Owners
  - Quality Owners
  - Performance Owners
  - Evidence Owners
  - Auditors
  - Documentation Governance

created: 2026-08-07
updated: 2026-08-07

classification: Internal

audience:
  - Founder
  - Founder Office
  - Enterprise Governance
  - AI Workforce Council
  - AI Workforce Operations
  - Agent Designers
  - Agent Owners
  - Human Accountable Owners
  - Department Owners
  - Team Owners
  - Team Leads
  - Role Owners
  - Capability Owners
  - Tool Owners
  - Model Owners
  - Memory Owners
  - Product Owners
  - Project Owners
  - Customer Owners
  - Tenant Owners
  - Security Owners
  - Privacy Owners
  - Ethics Owners
  - Compliance Owners
  - Quality Owners
  - Performance Reviewers
  - Evidence Owners
  - Auditors
  - Documentation Maintainers

depends_on:
  - ../README.md
  - ../INDEX.md
  - ../ROADMAP.md
  - ../CHANGELOG.md
  - ../workforce-vision.md
  - ../workforce-strategy.md
  - ../workforce-operating-model.md
  - ../workforce-architecture.md
  - ../workforce-governance.md
  - ../workforce-security.md
  - ../workforce-capabilities.md
  - ../workforce-lifecycle.md
  - ../workforce-metrics.md
  - ../workforce-checklists.md
  - ../AGENT-CAPACITY-BASELINE.md
  - ../C-SUITE-AGENT-REGISTRY.md
  - ../VERIFIABLE-WORK-ENVELOPE.md
  - ../agents/agent-types.md
  - ../agents/agent-lifecycle.md
  - ../agents/agent-skills.md
  - ../agents/agent-tools.md
  - ../agents/agent-memory.md
  - ../agents/agent-collaboration.md
  - ../agents/agent-performance.md
  - ../capabilities/capability-registry.md
  - ../capabilities/skill-registry.md
  - ../capabilities/tool-registry.md
  - ../capabilities/model-registry.md
  - ../organization/organization-structure.md
  - ../organization/department-structure.md
  - ../organization/reporting-hierarchy.md
  - ../organization/responsibility-matrix.md
  - ../organization/escalation-matrix.md
  - ../roles/role-catalog.md
  - ../roles/job-descriptions.md
  - ../roles/skill-matrix.md
  - ../shared-memory/shared-memory.md
  - ../shared-memory/enterprise-memory.md
  - ../shared-memory/project-memory.md
  - ../shared-memory/client-memory.md
  - ../standards/documentation-standard.md
  - ../standards/communication-standard.md
  - ../standards/performance-standard.md
  - ../standards/hiring-standard.md
  - ../teams/team-structure.md
  - ../teams/team-governance.md
  - ../teams/team-communication.md
  - ../teams/team-coordination.md
  - ../orchestration/orchestration-model.md
  - ../orchestration/delegation-engine.md
  - ../orchestration/collaboration-engine.md
  - ../orchestration/conflict-resolution.md

related_documents:
  - ./department-template.md
  - ./team-template.md
  - ./workflow-template.md
  - ../training/training-framework.md
  - ../training/learning-path.md
  - ../training/evaluation.md
  - ../training/certification.md
  - ../workflows/workflow-engine.md
  - ../workflows/task-assignment.md
  - ../workflows/task-routing.md
  - ../workflows/approval-flow.md
  - ../workflows/cross-department-workflow.md

review_cycle:
  - At Every Material Agent Template Change
  - Before Creating New Governed Agent Definitions
  - Before Material Agent Authority or Autonomy Changes
  - Before New Model or Tool Categories Are Introduced
  - Before Production Agent Activation
  - After Material Security, Privacy, Ethics, Compliance, or Agent Performance Incident
  - Quarterly During Stable Controlled Operation
  - Before Canonical Promotion

template_horizon:
  current: Target-State Governed Agent Definition Template
  near_term: Controlled Agent Definition, Registration, Testing, and Activation Proof
  medium_term: Multi-Department, Multi-Team, Multi-Product, Multi-Project, Multi-Customer Agent Standardization
  long_term: Production-Controlled Reusable Agent Definitions Supporting Autonomous Enterprise Creation at Scale

canonical: false
---

# Mianx.ai Governed AI Agent Definition Template

> **This document defines the reusable governed template that must be used
> when specifying a Mianx.ai AI Agent Definition. It standardizes Agent
> identity, ownership, Role, skills, capabilities, Tools, Models, memory,
> authority, autonomy, Product and Project scope, Customer and Tenant
> boundaries, workflows, Tasks, inputs, outputs, quality, Security, Privacy,
> Ethics, Compliance, lifecycle, testing, evidence, activation, suspension,
> retirement, and Production authorization requirements.**

---

# 1. Purpose

This template provides one reusable enterprise-grade structure for defining
Mianx.ai AI Agents consistently.

It is designed to ensure that every proposed Agent can be evaluated against
the same Governance model before registration or activation.

This template covers:

- Agent identity;
- Agent ID;
- Agent version;
- Agent type;
- purpose;
- mission;
- Department;
- Team;
- Role;
- Job Description relationship;
- Human Accountable Owner;
- Agent Owner;
- skills;
- capabilities;
- Tools;
- Models;
- memory;
- authority;
- prohibited authority;
- autonomy;
- decisions;
- delegation;
- communication;
- Product;
- Project;
- Customer;
- Tenant;
- Customer Edition;
- workflows;
- Tasks;
- inputs;
- outputs;
- sources;
- truth requirements;
- confidence;
- assumptions;
- limitations;
- escalation;
- Security;
- Privacy;
- Ethics;
- Compliance;
- Risk;
- performance;
- KPIs;
- capacity;
- lifecycle;
- testing;
- evidence;
- activation;
- observation;
- Production authorization;
- suspension;
- retirement;
- audit.

This template does not independently:

- create an Agent;
- register an Agent;
- instantiate an Agent;
- activate an Agent;
- authorize a Tool;
- authorize a Model;
- grant Customer access;
- grant Tenant access;
- authorize Production;
- prove runtime capability.

---

# 2. Current Authority Status

```text
DOCUMENT_ID=AIW-TPL-AGENT-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TARGET_STATE_AGENT_TEMPLATE=DEFINED

AGENT_TEMPLATE_REGISTRY=NOT_IMPLEMENTED

AGENT_DEFINITION_REGISTRY=NOT_IMPLEMENTED

AGENT_SCHEMA_VALIDATOR=NOT_IMPLEMENTED

AGENT_ID_VALIDATOR=NOT_IMPLEMENTED

AGENT_VERSION_VALIDATOR=NOT_IMPLEMENTED

AGENT_OWNER_VALIDATION=NOT_IMPLEMENTED

HUMAN_ACCOUNTABLE_OWNER_VALIDATION=NOT_IMPLEMENTED

AGENT_ROLE_VALIDATION=NOT_IMPLEMENTED

AGENT_SKILL_VALIDATION=NOT_IMPLEMENTED

AGENT_CAPABILITY_VALIDATION=NOT_IMPLEMENTED

AGENT_TOOL_VALIDATION=NOT_IMPLEMENTED

AGENT_MODEL_VALIDATION=NOT_IMPLEMENTED

AGENT_MEMORY_VALIDATION=NOT_IMPLEMENTED

AGENT_AUTHORITY_VALIDATION=NOT_IMPLEMENTED

AGENT_AUTONOMY_VALIDATION=NOT_IMPLEMENTED

AGENT_CUSTOMER_SCOPE_VALIDATION=NOT_IMPLEMENTED

AGENT_TENANT_SCOPE_VALIDATION=NOT_IMPLEMENTED

AGENT_WORKFLOW_VALIDATION=NOT_IMPLEMENTED

AGENT_TASK_VALIDATION=NOT_IMPLEMENTED

AGENT_SECURITY_VALIDATION=NOT_IMPLEMENTED

AGENT_PRIVACY_VALIDATION=NOT_IMPLEMENTED

AGENT_ETHICS_VALIDATION=NOT_IMPLEMENTED

AGENT_COMPLIANCE_VALIDATION=NOT_IMPLEMENTED

AGENT_PERFORMANCE_VALIDATION=NOT_IMPLEMENTED

AGENT_TEST_EVIDENCE_VALIDATION=NOT_IMPLEMENTED

AGENT_ACTIVATION_VALIDATION=NOT_IMPLEMENTED

AGENT_PRODUCTION_AUTHORIZATION_VALIDATION=NOT_IMPLEMENTED

VALIDATED_AGENT_DEFINITIONS=0_PROVEN

REGISTERED_AGENT_DEFINITIONS=0_PROVEN

ACTIVE_AGENT_INSTANCES=0_PROVEN

VERIFIED_AGENT_TEMPLATE_INSTANTIATIONS=0_PROVEN

VERIFIED_PRODUCTION_AGENT_AUTHORIZATIONS=0_PROVEN

RUNTIME_AGENT_ACTIVATION=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

---

# 3. Strategic Alignment

Every Agent created from this template must remain aligned with:

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

An Agent Definition must not redefine Mianx.ai as only one Product,
industry, Customer, or Project.

---

# 4. Template Non-Equivalence Rules

```text
Agent Template
≠
Agent Definition

Agent Definition
≠
Agent Registry Entry

Agent Registry Entry
≠
Agent Instance

Agent Instance
≠
Activated Agent

Activated Agent
≠
Production-Authorized Agent

Agent Capability
≠
Agent Authority

Agent Skill
≠
Decision Right

Tool Access
≠
Tool Ownership

Tool Availability
≠
Tool Approval

Model Availability
≠
Model Approval

Memory Access
≠
Data Ownership

Autonomy
≠
Unlimited Authority

Task Assignment
≠
Authority Expansion

Customer Assignment
≠
All Customer Access

Customer Access
≠
All Tenant Access

Passing Test
≠
Production Authorization

Documentation
≠
Runtime Implementation
```

---

# 5. Usage Rule

Every new governed Agent Definition should be created by copying the
template structure in this document and replacing placeholders with exact
approved values.

No required field should be silently removed.

Where a field does not apply, use:

```text
NOT_APPLICABLE
```

Where a value has not yet been approved, use:

```text
PENDING_APPROVAL
```

Where implementation does not exist, use:

```text
NOT_IMPLEMENTED
```

Where no evidence exists, use:

```text
NOT_PROVEN
```

---

# 6. Master Agent Definition Template

```yaml
agent_definition:
  metadata:
    agent_id: "<REQUIRED>"
    agent_version: "<REQUIRED>"
    agent_name: "<REQUIRED>"
    agent_type: "<REQUIRED>"

    status: "DRAFT"
    canonical: false

    created_at: "<REQUIRED>"
    updated_at: "<REQUIRED>"

    owner: "<REQUIRED_AGENT_OWNER>"
    human_accountable_owner: "<REQUIRED_HUMAN_ACCOUNTABLE_OWNER>"

  organizational_context:
    company: "Mianx.ai"

    department_id: "<REQUIRED>"
    team_id: "<REQUIRED_OR_NOT_APPLICABLE>"

    role_id: "<REQUIRED>"
    job_description_id: "<REQUIRED_OR_EQUIVALENT_AGENT_RESPONSIBILITY_SPEC>"

    reporting_owner: "<REQUIRED>"
    escalation_owner: "<REQUIRED>"

  identity:
    purpose: "<REQUIRED>"
    mission: "<REQUIRED>"

    primary_outcomes:
      - "<REQUIRED>"

    non_goals:
      - "<REQUIRED>"

    success_definition:
      - "<REQUIRED>"

  scope:
    enterprise_scope: "<REQUIRED>"

    product_scope:
      - "<REQUIRED_OR_NOT_APPLICABLE>"

    project_scope:
      - "<REQUIRED_OR_NOT_APPLICABLE>"

    customer_scope:
      - "<REQUIRED_OR_NOT_APPLICABLE>"

    tenant_scope:
      - "<REQUIRED_OR_NOT_APPLICABLE>"

    customer_edition_scope:
      - "<REQUIRED_OR_NOT_APPLICABLE>"

    environment_scope:
      - "<REQUIRED>"

    regional_scope:
      - "<REQUIRED_OR_NOT_APPLICABLE>"

  skills:
    required:
      - skill_id: "<REQUIRED>"
        minimum_level: "<REQUIRED>"
        verification_status: "NOT_PROVEN"

    optional: []

  capabilities:
    required:
      - capability_id: "<REQUIRED>"
        capability_level: "<REQUIRED>"
        verification_status: "NOT_PROVEN"

    prohibited:
      - "<REQUIRED_WHERE_APPLICABLE>"

  tools:
    permitted:
      - tool_id: "<REQUIRED>"
        tool_version: "<REQUIRED>"
        purpose: "<REQUIRED>"
        permission_scope: "<REQUIRED>"
        environment_scope: "<REQUIRED>"
        customer_scope: "<REQUIRED_OR_NOT_APPLICABLE>"
        tenant_scope: "<REQUIRED_OR_NOT_APPLICABLE>"

    prohibited:
      - "<REQUIRED_WHERE_APPLICABLE>"

  models:
    permitted:
      - model_id: "<REQUIRED>"
        model_version: "<REQUIRED>"
        provider: "<REQUIRED>"
        approved_use: "<REQUIRED>"
        data_classification_limit: "<REQUIRED>"
        customer_scope: "<REQUIRED_OR_NOT_APPLICABLE>"
        tenant_scope: "<REQUIRED_OR_NOT_APPLICABLE>"

    prohibited:
      - "<REQUIRED_WHERE_APPLICABLE>"

  memory:
    shared_memory: "<ALLOWED_OR_DENIED>"
    enterprise_memory: "<ALLOWED_OR_DENIED>"
    project_memory: "<ALLOWED_OR_DENIED>"
    customer_memory: "<ALLOWED_OR_DENIED>"
    tenant_memory: "<ALLOWED_OR_DENIED>"

    read_scope:
      - "<REQUIRED>"

    write_scope:
      - "<REQUIRED>"

    retention_scope: "<REQUIRED>"

    prohibited_memory:
      - "<REQUIRED_WHERE_APPLICABLE>"

  authority:
    permitted_actions:
      - "<REQUIRED>"

    prohibited_actions:
      - "<REQUIRED>"

    decision_rights:
      - "<REQUIRED>"

    approval_rights:
      - "<REQUIRED_OR_NONE>"

    delegation_rights:
      - "<REQUIRED_OR_NONE>"

    maximum_risk_level: "<REQUIRED>"

  autonomy:
    autonomy_level: "<REQUIRED>"

    human_review_required:
      - "<REQUIRED>"

    human_approval_required:
      - "<REQUIRED>"

    autonomous_actions:
      - "<REQUIRED_OR_NONE>"

    escalation_thresholds:
      - "<REQUIRED>"

    suspension_triggers:
      - "<REQUIRED>"

  communication:
    permitted_internal_channels:
      - "<REQUIRED>"

    permitted_external_channels:
      - "<REQUIRED_OR_NONE>"

    permitted_recipient_types:
      - "<REQUIRED>"

    customer_communication: "<ALLOWED_WITH_SCOPE_OR_DENIED>"
    tenant_communication: "<ALLOWED_WITH_SCOPE_OR_DENIED>"

    high_risk_human_review: true

  workflows:
    permitted_workflows:
      - workflow_id: "<REQUIRED>"
        role: "<REQUIRED>"
        permitted_states: "<REQUIRED>"

    prohibited_workflows:
      - "<REQUIRED_WHERE_APPLICABLE>"

  tasks:
    permitted_task_classes:
      - "<REQUIRED>"

    prohibited_task_classes:
      - "<REQUIRED>"

    maximum_task_risk: "<REQUIRED>"

    task_acceptance_rule: "<REQUIRED>"

  inputs:
    allowed:
      - input_type: "<REQUIRED>"
        classification: "<REQUIRED>"
        source_requirement: "<REQUIRED>"

    prohibited:
      - "<REQUIRED_WHERE_APPLICABLE>"

  outputs:
    required:
      - output_type: "<REQUIRED>"
        format: "<REQUIRED>"
        quality_requirement: "<REQUIRED>"
        evidence_requirement: "<REQUIRED>"

    prohibited:
      - "<REQUIRED_WHERE_APPLICABLE>"

  truth_and_evidence:
    source_required: true

    source_types:
      - "<REQUIRED>"

    confidence_required: true
    assumptions_required: true
    limitations_required: true

    unverifiable_claim_behavior: "<REQUIRED>"

    evidence_record_required: true

  security:
    classification_limit: "<REQUIRED>"
    authentication_requirement: "<REQUIRED>"
    authorization_requirement: "<REQUIRED>"
    least_privilege_required: true
    secrets_access: "<ALLOWED_WITH_SCOPE_OR_DENIED>"

    security_prohibitions:
      - "<REQUIRED>"

  privacy:
    personal_data_access: "<ALLOWED_WITH_SCOPE_OR_DENIED>"
    purpose_limitation: "<REQUIRED>"
    data_minimization: true
    retention_rule: "<REQUIRED>"

    privacy_prohibitions:
      - "<REQUIRED>"

  ethics:
    transparency_requirement: "<REQUIRED>"
    human_disclosure_requirement: "<REQUIRED>"
    manipulation_prohibited: true
    discrimination_prohibited: true
    deception_prohibited: true

  compliance:
    applicable_controls:
      - "<REQUIRED>"

    required_approvals:
      - "<REQUIRED>"

    prohibited_jurisdictions_or_uses:
      - "<REQUIRED_OR_NONE>"

  performance:
    kpis:
      - kpi_id: "<REQUIRED>"
        target: "<PENDING_APPROVAL_OR_APPROVED_VALUE>"
        evidence_source: "<REQUIRED>"

    quality_threshold: "<REQUIRED>"
    latency_threshold: "<REQUIRED_OR_NOT_APPLICABLE>"
    cost_threshold: "<REQUIRED_OR_NOT_APPLICABLE>"
    escalation_threshold: "<REQUIRED>"

  capacity:
    concurrency_limit: "<REQUIRED>"
    task_rate_limit: "<REQUIRED>"
    workload_limit: "<REQUIRED>"
    cost_limit: "<REQUIRED>"
    capacity_evidence_required: true

  lifecycle:
    current_state: "PROPOSED"

    permitted_states:
      - PROPOSED
      - DESIGN
      - REVIEW
      - APPROVAL_PENDING
      - APPROVED
      - REGISTERED
      - TESTING
      - ACTIVATION_READY
      - ACTIVE
      - OBSERVATION
      - PRODUCTION_AUTHORIZED
      - SUSPENDED
      - RETIRING
      - RETIRED
      - ARCHIVED

  testing:
    capability_test_required: true
    skill_test_required: true
    tool_test_required: true
    model_test_required: true
    memory_test_required: true
    security_test_required: true
    privacy_test_required: true
    ethics_test_required: true
    compliance_test_required: true
    customer_isolation_test_required: true
    tenant_isolation_test_required: true

  activation:
    activation_status: "NOT_AUTHORIZED"

    prerequisites:
      - "<REQUIRED>"

    observation_required: true
    observation_duration: "<PENDING_APPROVAL>"

  production:
    production_authorized: false
    authorization_id: null

    permitted_environments: []
    permitted_customers: []
    permitted_tenants: []

    expires_at: null

  suspension:
    automatic_triggers:
      - "<REQUIRED>"

    manual_suspension_authorities:
      - "<REQUIRED>"

    rollback_required: true

  retirement:
    retirement_conditions:
      - "<REQUIRED>"

    offboarding_requirements:
      - "<REQUIRED>"

    evidence_retention_required: true

  evidence:
    definition_evidence:
      - "<REQUIRED>"

    testing_evidence:
      - "<REQUIRED_BEFORE_ACTIVATION>"

    activation_evidence:
      - "<REQUIRED_BEFORE_ACTIVE_STATE>"

    production_evidence:
      - "<REQUIRED_BEFORE_PRODUCTION_AUTHORIZED_STATE>"

  approvals:
    agent_owner_approval: "PENDING"
    human_accountable_owner_approval: "PENDING"
    department_approval: "PENDING"
    team_approval: "PENDING"
    security_approval: "PENDING"
    privacy_approval: "PENDING"
    ethics_approval: "PENDING"
    compliance_approval: "PENDING"
    enterprise_governance_approval: "PENDING"
    founder_approval: "PENDING_WHERE_REQUIRED"
```

---

# 7. Agent Identity

Every Agent Definition must have:

- unique Agent ID;
- exact version;
- Agent name;
- Agent type;
- purpose;
- mission;
- owner;
- Human Accountable Owner;
- lifecycle state.

An Agent name is never a sufficient Agent identity by itself.

---

# 8. Agent ID

Agent IDs must be:

- unique;
- stable;
- non-reusable;
- traceable;
- independent of runtime instance identity.

Recommended structural pattern:

```text
AGENT-{DOMAIN}-{ROLE}-{SEQUENCE}
```

Examples are illustrative only.

Exact registry format must be governed centrally.

---

# 9. Agent Version

Agent Definition versions should use:

```text
MAJOR.MINOR.PATCH
```

A `MAJOR` change should be considered when materially changing:

- purpose;
- authority;
- Role;
- autonomy;
- Customer boundary;
- Tenant boundary;
- security model.

A `MINOR` change may cover material capability, Tool, Model, workflow, or
memory changes.

A `PATCH` should cover non-material corrections.

---

# 10. Agent Type

Agent type must reference the governed Agent Type model.

Examples may include:

```text
EXECUTIVE

DIRECTOR

MANAGER

SPECIALIST

OPERATOR

REVIEWER

AUDITOR

COORDINATOR

RESEARCHER

ANALYST

DEVELOPER

SECURITY

SUPPORT
```

The template does not independently authorize any type.

---

# 11. Agent Purpose

The purpose must explain why the Agent exists.

A valid purpose should answer:

- what problem the Agent solves;
- which enterprise function it supports;
- what outcome it owns;
- what it explicitly does not own.

---

# 12. Agent Mission

The mission should provide a concise operating objective.

Recommended pattern:

```text
Perform <DEFINED FUNCTION>
for <DEFINED ORGANIZATIONAL SCOPE>
within <DEFINED AUTHORITY>
while preserving <DEFINED QUALITY AND GOVERNANCE CONDITIONS>.
```

---

# 13. Department Assignment

Every Agent should belong to or operate under an approved Department
relationship.

Department assignment must not automatically create Department-wide
authority.

---

# 14. Team Assignment

Team membership must reference an approved Team where applicable.

```text
Agent Belongs to Team
≠
Agent Owns Team
```

---

# 15. Role Assignment

Every Agent must map to an approved Role.

The Role defines:

- expected responsibilities;
- authority;
- skills;
- capabilities;
- reporting;
- performance expectations.

---

# 16. Job Description Relationship

An Agent may use:

- a Human-equivalent Job Description where appropriate;
- or a governed Agent-specific responsibility specification.

The relationship must remain explicit.

---

# 17. Human Accountable Owner

Every governed Agent must identify a Human Accountable Owner where required
by Governance.

The Human Accountable Owner is responsible for ensuring that the Agent's
operation remains within approved boundaries.

---

# 18. Agent Owner

The Agent Owner is responsible for the Agent Definition as an enterprise
asset.

Responsibilities may include:

- definition quality;
- version control;
- lifecycle;
- capability alignment;
- testing;
- evidence;
- review;
- retirement.

---

# 19. Ownership Boundary

```text
Agent Owner
≠
Human Accountable Owner Automatically

Human Accountable Owner
≠
Agent Designer Automatically

Agent Designer
≠
Production Approver

Agent Owner
≠
Founder Authority
```

---

# 20. Skills

Every required skill must reference the Skill Registry.

Each skill should specify:

- Skill ID;
- required level;
- verification method;
- evidence;
- review frequency.

---

# 21. Capabilities

Every required capability must reference the Capability Registry.

Each capability should identify:

- Capability ID;
- required level;
- evidence;
- limitations;
- prohibited contexts where relevant.

---

# 22. Capability Boundary

```text
Prompt Claims Capability
≠
Verified Capability

Model Supports Capability
≠
Agent Has Verified Capability

Capability
≠
Authority
```

---

# 23. Tools

Every Tool must be listed explicitly.

Each Tool record should define:

- Tool ID;
- version;
- purpose;
- permission;
- environment;
- Customer scope;
- Tenant scope;
- prohibited operations.

---

# 24. Tool Boundary

```text
Tool Installed
≠
Tool Approved

Tool Approved
≠
Agent Approved to Use Tool

Agent Approved to Use Tool
≠
Unlimited Tool Permission
```

---

# 25. Models

Every Model must reference the Model Registry.

Each Model record should include:

- Model ID;
- version;
- provider;
- use case;
- Data classification;
- Customer restrictions;
- Tenant restrictions;
- regional restrictions;
- cost boundaries;
- quality requirements.

---

# 26. Model Boundary

```text
Model Available
≠
Model Approved

Model Approved
≠
Agent Approved to Use Model

Newer Model
≠
Automatically Better or Authorized

Model Upgrade
≠
Agent Version Automatically Unchanged
```

---

# 27. Memory

Agent memory permissions must define:

- allowed memory classes;
- read scope;
- write scope;
- retention;
- Customer scope;
- Tenant scope;
- prohibited memory.

---

# 28. Memory Boundary

```text
Agent Memory
≠
Enterprise Memory

Project Memory
≠
Customer Memory

Customer Memory
≠
Tenant Memory

Memory Access
≠
Memory Ownership

Memory Write
≠
Truth Promotion
```

---

# 29. Authority

Agent authority must explicitly define:

- permitted actions;
- prohibited actions;
- maximum Risk;
- approval requirements;
- decision rights;
- escalation.

No authority should be inferred from Agent intelligence or capability.

---

# 30. Prohibited Authority

Every Agent Definition must include an explicit prohibited-authority section.

Examples may include:

- no Founder impersonation;
- no policy override;
- no self-approval;
- no cross-Customer access;
- no cross-Tenant access;
- no unauthorized financial commitment;
- no unauthorized Production deployment;
- no unrestricted secret access.

---

# 31. Autonomy

Agent autonomy must reference the governed autonomy model.

Autonomy must define:

- level;
- autonomous actions;
- required Human review;
- required Human approval;
- escalation;
- expiry;
- suspension triggers.

---

# 32. Autonomy Boundary

```text
Autonomy
≠
Authority

Higher Autonomy
≠
Higher Organizational Rank

Higher Autonomy
≠
Cross-Customer Access

Higher Autonomy
≠
Policy Override
```

---

# 33. Decision Rights

Every Agent Definition must state which decisions the Agent may:

```text
RECOMMEND

PREPARE

MAKE-WITH-APPROVAL

MAKE-WITHIN-BOUNDS

NOT-MAKE
```

---

# 34. Approval Rights

Approval rights must be exceptional and explicitly governed.

An Agent must not be assumed to have approval authority because it can
evaluate work.

---

# 35. Delegation Rights

Delegation rights must identify:

- whether delegation is allowed;
- what may be delegated;
- to whom;
- maximum depth;
- Customer scope;
- Tenant scope;
- escalation conditions.

---

# 36. Communication Rights

The Agent Definition must state:

- permitted internal communication;
- permitted external communication;
- Customer communication;
- Tenant communication;
- public communication;
- Human review requirements.

---

# 37. Product Scope

Product scope must identify exactly which Products the Agent may support.

Supporting a Product does not make the Agent a Product Owner.

---

# 38. Project Scope

Project scope must identify exact authorized Projects.

```text
Assigned to Project
≠
Authorized for All Project Data
```

---

# 39. Customer Scope

Customer scope must be explicit.

Default safe state:

```text
NO CUSTOMER ACCESS
```

unless separately authorized.

---

# 40. Tenant Scope

Tenant scope must be exact.

```text
Customer Authorization
≠
All Tenant Authorization
```

---

# 41. Customer Edition Scope

Where applicable, the Agent must distinguish:

```text
Core Platform
↓
Industry Operating System
↓
Customer Edition
```

Customer Edition authority must not silently propagate upward.

---

# 42. Workflow Scope

The Agent Definition should list permitted workflows.

Each workflow assignment must specify:

- Workflow ID;
- Agent Role;
- permitted states;
- decision boundaries;
- escalation conditions.

---

# 43. Task Scope

Permitted and prohibited Task classes must be explicit.

A Task must not expand Agent authority.

---

# 44. Input Contract

Every Agent should define allowed input types.

The input contract should state:

- Data type;
- source;
- classification;
- Customer scope;
- Tenant scope;
- validation requirements;
- prohibited input categories.

---

# 45. Output Contract

Every Agent should define expected outputs.

Output requirements should include:

- format;
- structure;
- quality;
- source references;
- evidence;
- confidence;
- verification requirements.

---

# 46. Source Requirements

Material factual output should identify appropriate sources.

An Agent must not present unsupported claims as verified facts.

---

# 47. Truth Status

Recommended truth statuses:

```text
VERIFIED

SUPPORTED

PARTIALLY-SUPPORTED

INFERRED

ASSUMED

UNKNOWN

CONFLICTING

UNVERIFIED
```

---

# 48. Confidence

Confidence must not substitute for evidence.

```text
High Confidence
≠
Verified Fact
```

---

# 49. Assumptions

Material assumptions must be explicit.

An Agent should not silently convert assumptions into facts.

---

# 50. Limitations

Each Agent Definition should document known limitations involving:

- reasoning;
- Tools;
- Models;
- memory;
- Data;
- jurisdiction;
- Customer scope;
- Tenant scope;
- latency;
- cost;
- capability.

---

# 51. Escalation

Every Agent must define escalation triggers.

Examples:

- authority insufficient;
- confidence too low;
- required source unavailable;
- conflicting evidence;
- Security Risk;
- Privacy Risk;
- Customer ambiguity;
- Tenant ambiguity;
- Tool failure;
- Model failure;
- repeated Task failure.

---

# 52. Escalation Record

```yaml
agent_escalation:
  escalation_id: required

  agent_id: required
  agent_version: required
  instance_id: conditional

  task_id: required

  escalation_reason: required
  severity: required

  current_state: required
  blocked_action: required

  human_owner: required
  escalation_target: required

  product_scope: conditional
  project_scope: conditional
  customer_scope: conditional
  tenant_scope: conditional

  evidence_references: required

  status: required
```

---

# 53. Security Requirements

Every Agent Definition must specify:

- classification limit;
- authentication requirements;
- authorization requirements;
- least privilege;
- Tool restrictions;
- secret handling;
- network restrictions where applicable;
- logging;
- suspension conditions.

---

# 54. Privacy Requirements

Every Agent Definition must specify:

- Personal Data permissions;
- purpose limitation;
- Data minimization;
- Customer Data boundaries;
- Tenant Data boundaries;
- retention;
- deletion;
- prohibited inference;
- prohibited reuse.

---

# 55. Ethics Requirements

Every Agent Definition must preserve:

- transparency;
- non-deception;
- non-manipulation;
- non-discrimination;
- safe escalation;
- Human accountability;
- authority honesty.

---

# 56. Compliance Requirements

Each Agent must identify relevant:

- policies;
- standards;
- contractual restrictions;
- jurisdictional restrictions;
- record requirements;
- approval requirements.

---

# 57. Risk Profile

Every Agent Definition should include a Risk profile.

Recommended categories:

```text
OPERATIONAL

SECURITY

PRIVACY

ETHICS

COMPLIANCE

FINANCIAL

LEGAL

CUSTOMER

TENANT

REPUTATIONAL

MODEL

TOOL

MEMORY
```

---

# 58. Agent Risk Level

Recommended levels:

```text
AR0 — Informational

AR1 — Low

AR2 — Moderate

AR3 — High

AR4 — Critical

AR5 — Founder / Existential
```

Exact thresholds require Governance approval.

---

# 59. Performance

Performance requirements should align with:

```text
doc/19-ai-workforce/agents/agent-performance.md
```

and:

```text
doc/19-ai-workforce/kpis/agent-kpis.md
```

---

# 60. Agent KPIs

An Agent Definition should reference governed KPIs rather than inventing
unapproved targets.

Potential categories:

- completion quality;
- accuracy;
- latency;
- cost;
- escalation quality;
- policy compliance;
- Customer isolation;
- Tenant isolation;
- Tool reliability;
- Human-review rate.

---

# 61. Capacity

Agent capacity should define:

- concurrency;
- Task rate;
- workload;
- context limits;
- Model limits;
- Tool limits;
- cost;
- error threshold;
- sustainable throughput.

---

# 62. Capacity Boundary

```text
Maximum Technical Throughput
≠
Verified Sustainable Capacity

One Successful Run
≠
Capacity Baseline

More Agent Instances
≠
Unlimited Capacity
```

---

# 63. Lifecycle

Every Agent Definition must use a governed lifecycle.

Recommended states:

```text
PROPOSED
↓
DESIGN
↓
REVIEW
↓
APPROVAL-PENDING
↓
APPROVED
↓
REGISTERED
↓
TESTING
↓
ACTIVATION-READY
↓
ACTIVE
↓
OBSERVATION
↓
PRODUCTION-AUTHORIZED
↓
SUSPENDED-WHERE-REQUIRED
↓
RETIRING
↓
RETIRED
↓
ARCHIVED
```

---

# 64. Lifecycle Boundary

```text
Approved
≠
Registered

Registered
≠
Active

Active
≠
Production Authorized

Suspended
≠
Retired

Retired
≠
Evidence Deleted
```

---

# 65. Capability Verification

Before activation, required capabilities must be tested.

Capability tests should record:

- Agent ID;
- Agent version;
- test case;
- expected output;
- observed output;
- reviewer;
- evidence;
- result.

---

# 66. Skill Verification

Required skills must be verified against governed evaluation criteria.

A Skill Registry entry alone does not prove that one Agent instance performs
the skill correctly.

---

# 67. Tool Verification

Each Tool integration should be tested for:

- authentication;
- authorization;
- permitted operations;
- prohibited operations;
- Customer isolation;
- Tenant isolation;
- error handling;
- logging.

---

# 68. Model Verification

Model verification should test:

- exact Model version;
- intended use;
- quality;
- latency;
- cost;
- Data restrictions;
- fallback behavior;
- Customer restrictions;
- Tenant restrictions.

---

# 69. Memory Verification

Memory verification should test:

- correct read scope;
- correct write scope;
- prohibited memory denial;
- Customer isolation;
- Tenant isolation;
- retention;
- deletion where applicable.

---

# 70. Security Testing

Security testing should verify:

- least privilege;
- unauthorized Tool blocking;
- unauthorized Model blocking;
- unauthorized memory blocking;
- secret handling;
- prompt-injection resistance where applicable;
- cross-Customer denial;
- cross-Tenant denial;
- logging;
- suspension.

---

# 71. Privacy Testing

Privacy testing should verify:

- purpose limitation;
- Data minimization;
- Personal Data boundaries;
- Customer isolation;
- Tenant isolation;
- retention;
- deletion;
- prohibited inference handling.

---

# 72. Ethics Testing

Ethics testing should verify:

- transparency;
- non-deception;
- non-manipulation;
- non-discrimination;
- safe Human escalation;
- authority honesty.

---

# 73. Compliance Testing

Compliance testing should verify:

- policy inheritance;
- standard inheritance;
- required approvals;
- prohibited actions;
- record generation;
- evidence generation.

---

# 74. Customer Isolation Testing

Use:

```text
Customer A
Customer B
```

and verify:

- separate Data;
- separate memory;
- separate Tools where applicable;
- separate Tasks;
- separate outputs;
- denied cross-Customer action;
- denied cross-Customer retrieval;
- denied cross-Customer communication.

---

# 75. Tenant Isolation Testing

Use:

```text
Tenant A
Tenant B
```

and verify:

- exact Customer relationship;
- separate Tenant Data;
- separate Tenant memory;
- separate Tenant Tasks;
- denied cross-Tenant access;
- denied cross-Tenant communication.

---

# 76. Agent Test Record

```yaml
agent_test:
  test_id: required

  agent_id: required
  agent_version: required
  instance_id: conditional

  test_type: required
  test_environment: required

  input: required
  expected_result: required
  observed_result: required

  product_scope: conditional
  project_scope: conditional
  customer_scope: conditional
  tenant_scope: conditional

  pass_criteria: required
  result: required

  reviewer: required
  verifier: required

  evidence_references: required

  status: required
```

---

# 77. Activation Prerequisites

Before Agent activation:

- [ ] Agent ID is valid.
- [ ] Agent version is exact.
- [ ] Agent type is approved.
- [ ] purpose is approved.
- [ ] Department is exact.
- [ ] Team is exact where applicable.
- [ ] Role is approved.
- [ ] Human Accountable Owner exists.
- [ ] Agent Owner exists.
- [ ] required skills are verified.
- [ ] required capabilities are verified.
- [ ] Tools are approved.
- [ ] Models are approved.
- [ ] memory scope is approved.
- [ ] authority is explicit.
- [ ] prohibited authority is explicit.
- [ ] autonomy is approved.
- [ ] Product scope is exact.
- [ ] Project scope is exact.
- [ ] Customer scope is exact.
- [ ] Tenant scope is exact.
- [ ] workflows are approved.
- [ ] Task classes are approved.
- [ ] Security testing passes.
- [ ] Privacy testing passes.
- [ ] Ethics testing passes.
- [ ] Compliance testing passes.
- [ ] Customer isolation testing passes where applicable.
- [ ] Tenant isolation testing passes where applicable.
- [ ] evidence package is complete.

---

# 78. Activation Record

```yaml
agent_activation:
  activation_id: required

  agent_id: required
  agent_version: required
  instance_id: required

  human_accountable_owner: required
  agent_owner: required

  environment: required

  product_scope: conditional
  project_scope: conditional
  customer_scope: conditional
  tenant_scope: conditional

  prerequisite_status: required
  test_evidence: required

  activated_by: required
  approved_by: required

  activated_at: required
  review_at: required

  status: required
```

---

# 79. Observation

Newly activated Agents should operate under controlled observation before
broader Production authority where required.

Observation should define:

- duration;
- Tasks;
- autonomy;
- Customer scope;
- Tenant scope;
- Human review;
- KPIs;
- quality;
- Security;
- Privacy;
- escalation;
- suspension thresholds.

---

# 80. Observation Boundary

```text
Observation Passed
≠
Permanent Production Authorization

Observation
≠
No Governance

Good Performance
≠
Automatic Authority Expansion
```

---

# 81. Production Authorization

Production authorization is separate from Agent activation.

It must define:

- Agent ID;
- version;
- instance;
- environment;
- Product;
- Project;
- Customer;
- Tenant;
- Tools;
- Models;
- memory;
- Tasks;
- autonomy;
- Human review;
- effective date;
- expiry;
- approver;
- evidence.

---

# 82. Production Authorization Record

```yaml
agent_production_authorization:
  authorization_id: required

  agent_id: required
  agent_version: required
  instance_id: required

  environment: required

  product_scope: required
  project_scope: conditional
  customer_scope: conditional
  tenant_scope: conditional

  permitted_tasks: required
  prohibited_tasks: required

  permitted_tools: required
  permitted_models: required
  permitted_memory: required

  autonomy_level: required
  human_review_requirements: required

  observation_evidence: required
  security_evidence: required
  privacy_evidence: required
  ethics_evidence: required
  compliance_evidence: required
  performance_evidence: required

  authorized_by: required

  effective_at: required
  expires_at: required
  review_at: required

  evidence_references: required

  status: required
```

---

# 83. Production Boundary

```text
Agent Activated
≠
Production Authorized

Production Authorized for One Environment
≠
Authorized for All Environments

Authorized for Customer A
≠
Authorized for Customer B

Authorized for Tenant A
≠
Authorized for Tenant B

Production Authorization
≠
Permanent Authority
```

---

# 84. Suspension

Agent suspension triggers may include:

- Security failure;
- Privacy failure;
- Ethics failure;
- Compliance failure;
- capability regression;
- performance failure;
- unauthorized action;
- wrong Customer access;
- wrong Tenant access;
- Tool compromise;
- Model compromise;
- evidence integrity failure.

---

# 85. Suspension Record

```yaml
agent_suspension:
  suspension_id: required

  agent_id: required
  agent_version: required
  instance_id: conditional

  suspension_reason: required
  severity: required

  affected_scope: required

  product_scope: conditional
  project_scope: conditional
  customer_scope: conditional
  tenant_scope: conditional

  immediate_controls: required

  suspended_by: required
  accountable_owner: required

  suspended_at: required

  reactivation_conditions: required

  evidence_references: required

  status: required
```

---

# 86. Reactivation

Reactivation must revalidate affected:

- Role;
- capabilities;
- Tools;
- Models;
- memory;
- Security;
- Privacy;
- Ethics;
- Compliance;
- Customer scope;
- Tenant scope;
- authority;
- autonomy.

Old Production authorization must not automatically remain valid.

---

# 87. Retirement

An Agent may be retired when:

- Role is obsolete;
- capability is superseded;
- Tool dependency is retired;
- Model dependency is retired;
- Product ends;
- Project ends;
- persistent Risk is unacceptable;
- better Agent supersedes it.

---

# 88. Retirement Requirements

Retirement should address:

- active Tasks;
- workflow assignments;
- Team membership;
- access;
- Tools;
- Models;
- memory;
- Customer assignments;
- Tenant assignments;
- evidence;
- archival.

---

# 89. Retirement Boundary

```text
Agent Disabled
≠
Agent Retired

Agent Retired
≠
Agent Evidence Deleted

Agent Definition Retired
≠
Historical Instance Records Deleted
```

---

# 90. Agent Evidence Package

A complete Agent evidence package should include:

```text
AGENT-DEFINITION

AGENT-VERSION

ROLE-REFERENCE

OWNER-REFERENCE

HUMAN-ACCOUNTABLE-OWNER-REFERENCE

SKILL-VERIFICATION

CAPABILITY-VERIFICATION

TOOL-VERIFICATION

MODEL-VERIFICATION

MEMORY-VERIFICATION

SECURITY-TESTS

PRIVACY-TESTS

ETHICS-TESTS

COMPLIANCE-TESTS

CUSTOMER-ISOLATION-TESTS

TENANT-ISOLATION-TESTS

ACTIVATION-EVIDENCE

OBSERVATION-EVIDENCE

PERFORMANCE-EVIDENCE

PRODUCTION-AUTHORIZATION
```

where applicable.

---

# 91. Evidence Quality

Recommended evidence levels:

```text
AEV-0 — No Evidence

AEV-1 — Agent Definition Claim

AEV-2 — Human-Reviewed Agent Definition

AEV-3 — System-Generated Registry or Test Evidence

AEV-4 — Controlled Agent Verification Evidence

AEV-5 — Runtime Production Agent Evidence

AEV-6 — Independent, Customer, Legal, Regulatory, or Audited Evidence
```

---

# 92. Audit Requirements

An Agent Definition Audit should verify:

- identity;
- version;
- purpose;
- mission;
- Department;
- Team;
- Role;
- ownership;
- skills;
- capabilities;
- Tools;
- Models;
- memory;
- authority;
- autonomy;
- decisions;
- delegation;
- communication;
- Product;
- Project;
- Customer;
- Tenant;
- workflows;
- Tasks;
- inputs;
- outputs;
- truth requirements;
- Security;
- Privacy;
- Ethics;
- Compliance;
- performance;
- capacity;
- lifecycle;
- testing;
- activation;
- observation;
- Production authorization;
- suspension;
- retirement;
- evidence.

---

# 93. Agent Template Validation Checklist

Before accepting a completed Agent Definition:

- [ ] Agent ID is present.
- [ ] Agent ID is unique.
- [ ] Agent version is present.
- [ ] Agent name is present.
- [ ] Agent type is present.
- [ ] purpose is clear.
- [ ] mission is clear.
- [ ] non-goals are clear.
- [ ] Department is defined.
- [ ] Team is defined or explicitly not applicable.
- [ ] Role is defined.
- [ ] Job Description relationship is defined.
- [ ] Agent Owner is defined.
- [ ] Human Accountable Owner is defined.
- [ ] reporting owner is defined.
- [ ] escalation owner is defined.
- [ ] required skills are listed.
- [ ] required capabilities are listed.
- [ ] prohibited capabilities are listed where applicable.
- [ ] Tools are listed.
- [ ] Tool versions are exact.
- [ ] Tool permissions are exact.
- [ ] Models are listed.
- [ ] Model versions are exact.
- [ ] memory scope is explicit.
- [ ] read scope is explicit.
- [ ] write scope is explicit.
- [ ] authority is explicit.
- [ ] prohibited authority is explicit.
- [ ] decision rights are explicit.
- [ ] approval rights are explicit.
- [ ] delegation rights are explicit.
- [ ] autonomy level is explicit.
- [ ] Human review is explicit.
- [ ] Human approval requirements are explicit.
- [ ] Product scope is explicit.
- [ ] Project scope is explicit.
- [ ] Customer scope is explicit.
- [ ] Tenant scope is explicit.
- [ ] Customer Edition scope is explicit.
- [ ] environment scope is explicit.
- [ ] workflow scope is explicit.
- [ ] Task scope is explicit.
- [ ] allowed inputs are explicit.
- [ ] prohibited inputs are explicit.
- [ ] required outputs are explicit.
- [ ] truth requirements are explicit.
- [ ] source requirements are explicit.
- [ ] confidence rules are explicit.
- [ ] assumptions are explicit.
- [ ] limitations are explicit.
- [ ] escalation triggers are explicit.
- [ ] Security requirements are explicit.
- [ ] Privacy requirements are explicit.
- [ ] Ethics requirements are explicit.
- [ ] Compliance requirements are explicit.
- [ ] Risk level is explicit.
- [ ] KPIs are referenced.
- [ ] capacity limits are explicit.
- [ ] lifecycle state is explicit.
- [ ] testing requirements are explicit.
- [ ] activation prerequisites are explicit.
- [ ] observation requirement is explicit.
- [ ] Production authorization defaults to false.
- [ ] suspension triggers are explicit.
- [ ] retirement conditions are explicit.
- [ ] evidence requirements are explicit.
- [ ] approval requirements are explicit.

---

# 94. Agent Definition Review Gate

An Agent Definition should not move to `APPROVED` until:

- [ ] Agent Template validation passes.
- [ ] Role alignment review passes.
- [ ] Department review passes.
- [ ] Team review passes where applicable.
- [ ] Capability review passes.
- [ ] Tool review passes.
- [ ] Model review passes.
- [ ] Memory review passes.
- [ ] Security review passes.
- [ ] Privacy review passes.
- [ ] Ethics review passes.
- [ ] Compliance review passes.
- [ ] Customer/Tenant scope review passes where applicable.
- [ ] Human Accountable Owner accepts accountability.
- [ ] Agent Owner accepts ownership.
- [ ] Enterprise Governance review passes where required.
- [ ] Founder review passes where required.

---

# 95. Agent Registration Gate

An approved Agent Definition should not move to `REGISTERED` until:

- [ ] Agent ID is reserved.
- [ ] Agent Definition version is immutable for registration.
- [ ] Registry metadata is complete.
- [ ] owner identities are validated.
- [ ] Role is valid.
- [ ] Department is valid.
- [ ] Team is valid where applicable.
- [ ] Tool references are valid.
- [ ] Model references are valid.
- [ ] memory references are valid.
- [ ] authority is valid.
- [ ] Customer scope is valid.
- [ ] Tenant scope is valid.
- [ ] evidence is attached.

---

# 96. Agent Testing Gate

A registered Agent should not move to `ACTIVATION-READY` until:

- [ ] required skill tests pass.
- [ ] required capability tests pass.
- [ ] Tool tests pass.
- [ ] Model tests pass.
- [ ] memory tests pass.
- [ ] Task tests pass.
- [ ] workflow tests pass.
- [ ] escalation tests pass.
- [ ] Security tests pass.
- [ ] Privacy tests pass.
- [ ] Ethics tests pass.
- [ ] Compliance tests pass.
- [ ] Customer isolation tests pass where applicable.
- [ ] Tenant isolation tests pass where applicable.
- [ ] evidence quality is sufficient.
- [ ] failed tests are resolved or governed.

---

# 97. Agent Production Gate

Before an Agent may become `PRODUCTION-AUTHORIZED`:

- [ ] Founder approval exists where required.
- [ ] Agent Definition is approved.
- [ ] Agent is registered.
- [ ] Agent Instance is valid.
- [ ] Agent version is exact.
- [ ] Model version is exact.
- [ ] Tools are exact.
- [ ] memory is exact.
- [ ] Human Accountable Owner is active.
- [ ] Agent Owner is active.
- [ ] Role is valid.
- [ ] Team is valid.
- [ ] Department is valid.
- [ ] Product scope is exact.
- [ ] Project scope is exact.
- [ ] Customer scope is exact.
- [ ] Tenant scope is exact.
- [ ] Customer Edition scope is exact.
- [ ] environment is exact.
- [ ] authority is exact.
- [ ] prohibited authority is exact.
- [ ] autonomy is approved.
- [ ] decision rights are approved.
- [ ] delegation rights are approved.
- [ ] communication rights are approved.
- [ ] required capability tests pass.
- [ ] required Tool tests pass.
- [ ] required Model tests pass.
- [ ] required memory tests pass.
- [ ] Security tests pass.
- [ ] Privacy tests pass.
- [ ] Ethics tests pass.
- [ ] Compliance tests pass.
- [ ] Customer isolation tests pass.
- [ ] Tenant isolation tests pass.
- [ ] observation succeeds.
- [ ] performance evidence is acceptable.
- [ ] monitoring is active.
- [ ] alerting is active.
- [ ] suspension control is tested.
- [ ] rollback is tested.
- [ ] Production Authorization Record exists.
- [ ] Production authorization has expiry.
- [ ] Production evidence package is complete.

---

# 98. Agent Hard Stops

The following should normally block registration, activation, or Production
authorization:

- missing Agent ID;
- duplicate Agent ID;
- missing version;
- missing Human Accountable Owner;
- missing Agent Owner;
- missing Role;
- undefined authority;
- undefined prohibited authority;
- undefined autonomy;
- unapproved Tool;
- unapproved Model;
- unapproved memory access;
- failed Security testing;
- failed Privacy testing;
- failed Ethics testing;
- failed Compliance testing;
- failed Customer isolation;
- failed Tenant isolation;
- unauthorized Customer scope;
- unauthorized Tenant scope;
- evidence fabrication;
- Agent self-approval;
- Agent self-activation;
- Agent self-Production authorization.

---

# 99. Template Anti-Gaming Controls

This template must prevent:

- leaving authority fields vague;
- using `admin` as a substitute for exact permission;
- using `all customers` without explicit Governance;
- using `all tenants` without explicit Governance;
- omitting prohibited actions;
- hiding Tool permissions inside prompts;
- hiding Model changes without version updates;
- describing theoretical capability as verified capability;
- listing KPIs without evidence;
- reporting registration as activation;
- reporting activation as Production authorization;
- using template completion as runtime proof.

---

# 100. Template Anti-Patterns

Mianx.ai must avoid Agent Definitions with:

- no owner;
- no Human Accountable Owner;
- no Role;
- no Department;
- no authority boundary;
- no prohibited-action list;
- unrestricted Tools;
- unrestricted Models;
- unrestricted memory;
- unlimited Customer scope;
- unlimited Tenant scope;
- no escalation;
- no testing;
- no evidence;
- no expiry;
- no retirement path.

---

# 101. Prohibited Template Behaviours

A completed Agent Definition must not:

- fabricate approval;
- fabricate Founder authority;
- claim unsupported capability;
- claim untested performance;
- claim implementation not proven;
- claim Production authorization without record;
- remove required Governance sections;
- silently broaden Customer scope;
- silently broaden Tenant scope;
- silently expand autonomy;
- silently change Model or Tool authority.

---

# 102. Example Minimal Completed Definition Skeleton

```yaml
agent_definition:
  metadata:
    agent_id: "AGENT-EXAMPLE-001"
    agent_version: "0.1.0"
    agent_name: "Example Agent"
    agent_type: "SPECIALIST"
    status: "DRAFT"
    canonical: false
    owner: "PENDING_APPROVAL"
    human_accountable_owner: "PENDING_APPROVAL"

  organizational_context:
    company: "Mianx.ai"
    department_id: "PENDING_APPROVAL"
    team_id: "PENDING_APPROVAL"
    role_id: "PENDING_APPROVAL"

  identity:
    purpose: "Example only. No runtime authority."
    mission: "Demonstrate the minimum Agent Definition structure."

  scope:
    customer_scope:
      - "NONE"
    tenant_scope:
      - "NONE"
    environment_scope:
      - "NON_PRODUCTION"

  authority:
    permitted_actions:
      - "DOCUMENTATION_ONLY"

    prohibited_actions:
      - "PRODUCTION_EXECUTION"
      - "CUSTOMER_ACCESS"
      - "TENANT_ACCESS"
      - "SELF_APPROVAL"

  production:
    production_authorized: false
    authorization_id: null
```

This example is illustrative only and does not constitute an approved Agent.

---

# 103. Current Verified Baseline

```yaml
documentation:
  agent_template:
    id: AIW-TPL-AGENT-001
    version: 1.0.0
    status: Draft
    canonical: false

target_state:
  agent_definition_template: defined
  agent_identity_model: defined
  agent_id_model: defined
  agent_version_model: defined
  agent_type_model: defined
  ownership_model: defined
  human_accountability_model: defined
  department_assignment_model: defined
  team_assignment_model: defined
  role_assignment_model: defined
  skill_model: defined
  capability_model: defined
  tool_model: defined
  model_model: defined
  memory_model: defined
  authority_model: defined
  prohibited_authority_model: defined
  autonomy_model: defined
  decision_right_model: defined
  approval_right_model: defined
  delegation_right_model: defined
  communication_right_model: defined
  product_scope_model: defined
  project_scope_model: defined
  customer_scope_model: defined
  tenant_scope_model: defined
  customer_edition_scope_model: defined
  workflow_scope_model: defined
  task_scope_model: defined
  input_contract_model: defined
  output_contract_model: defined
  source_model: defined
  truth_status_model: defined
  confidence_model: defined
  assumption_model: defined
  limitation_model: defined
  escalation_model: defined
  security_model: defined
  privacy_model: defined
  ethics_model: defined
  compliance_model: defined
  risk_model: defined
  performance_model: defined
  capacity_model: defined
  lifecycle_model: defined
  capability_verification_model: defined
  skill_verification_model: defined
  tool_verification_model: defined
  model_verification_model: defined
  memory_verification_model: defined
  security_testing_model: defined
  privacy_testing_model: defined
  ethics_testing_model: defined
  compliance_testing_model: defined
  customer_isolation_testing_model: defined
  tenant_isolation_testing_model: defined
  activation_model: defined
  observation_model: defined
  production_authorization_model: defined
  suspension_model: defined
  reactivation_model: defined
  retirement_model: defined
  evidence_model: defined
  audit_model: defined

implementation:
  agent_template_registry: not_implemented
  agent_definition_registry: not_implemented
  agent_schema_validator: not_implemented
  agent_id_validator: not_implemented
  agent_version_validator: not_implemented
  agent_owner_validation: not_implemented
  human_accountable_owner_validation: not_implemented
  agent_role_validation: not_implemented
  agent_skill_validation: not_implemented
  agent_capability_validation: not_implemented
  agent_tool_validation: not_implemented
  agent_model_validation: not_implemented
  agent_memory_validation: not_implemented
  agent_authority_validation: not_implemented
  agent_autonomy_validation: not_implemented
  agent_customer_scope_validation: not_implemented
  agent_tenant_scope_validation: not_implemented
  agent_workflow_validation: not_implemented
  agent_task_validation: not_implemented
  agent_security_validation: not_implemented
  agent_privacy_validation: not_implemented
  agent_ethics_validation: not_implemented
  agent_compliance_validation: not_implemented
  agent_performance_validation: not_implemented
  agent_test_evidence_validation: not_implemented
  agent_activation_validation: not_implemented
  agent_production_authorization_validation: not_implemented

runtime:
  validated_agent_definitions: 0_proven
  registered_agent_definitions: 0_proven
  active_agent_instances: 0_proven
  verified_agent_template_instantiations: 0_proven
  verified_production_agent_authorizations: 0_proven
  runtime_agent_activation: not_authorized
  production_operational: no
```

---

# 104. Current-State Boundary

This document does not prove that Mianx.ai currently has:

- an implemented Agent Template Registry;
- an implemented Agent Definition Registry;
- an Agent schema validator;
- automated Agent ID validation;
- automated Agent version validation;
- runtime owner validation;
- runtime Role validation;
- runtime capability verification;
- runtime Tool validation;
- runtime Model validation;
- runtime memory validation;
- runtime authority enforcement;
- runtime autonomy enforcement;
- runtime Customer scope enforcement;
- runtime Tenant scope enforcement;
- verified Agent template instantiations;
- verified registered Agent Definitions;
- verified active Agent Instances;
- verified Production Agent authorizations.

This document defines a target-state governed Agent Definition Template only.

---

# 105. Adoption Requirements

This template may become Active only when:

- [ ] Founder approval is recorded.
- [ ] exact approved version is recorded.
- [ ] Agent Template fields are approved.
- [ ] Agent ID rules are approved.
- [ ] Agent versioning rules are approved.
- [ ] Agent Type relationship is approved.
- [ ] Agent purpose requirements are approved.
- [ ] Agent mission requirements are approved.
- [ ] Department relationship is approved.
- [ ] Team relationship is approved.
- [ ] Role relationship is approved.
- [ ] Job Description relationship is approved.
- [ ] Agent Owner model is approved.
- [ ] Human Accountable Owner model is approved.
- [ ] skill fields are approved.
- [ ] capability fields are approved.
- [ ] Tool fields are approved.
- [ ] Model fields are approved.
- [ ] memory fields are approved.
- [ ] authority fields are approved.
- [ ] prohibited authority fields are approved.
- [ ] autonomy fields are approved.
- [ ] decision-right fields are approved.
- [ ] approval-right fields are approved.
- [ ] delegation-right fields are approved.
- [ ] communication-right fields are approved.
- [ ] Product scope fields are approved.
- [ ] Project scope fields are approved.
- [ ] Customer scope fields are approved.
- [ ] Tenant scope fields are approved.
- [ ] Customer Edition fields are approved.
- [ ] workflow fields are approved.
- [ ] Task fields are approved.
- [ ] input contract is approved.
- [ ] output contract is approved.
- [ ] source requirements are approved.
- [ ] truth-status model is approved.
- [ ] confidence requirements are approved.
- [ ] assumption requirements are approved.
- [ ] limitation requirements are approved.
- [ ] escalation model is approved.
- [ ] Security fields are approved.
- [ ] Privacy fields are approved.
- [ ] Ethics fields are approved.
- [ ] Compliance fields are approved.
- [ ] Risk model is approved.
- [ ] performance fields are approved.
- [ ] KPI references are approved.
- [ ] capacity fields are approved.
- [ ] lifecycle states are approved.
- [ ] testing model is approved.
- [ ] activation prerequisites are approved.
- [ ] observation model is approved.
- [ ] Production authorization model is approved.
- [ ] suspension model is approved.
- [ ] reactivation model is approved.
- [ ] retirement model is approved.
- [ ] evidence model is approved.
- [ ] audit requirements are approved.
- [ ] Agent Template Registry is implemented.
- [ ] Agent Definition Registry is implemented.
- [ ] schema validation is implemented.
- [ ] Agent ID validation is implemented.
- [ ] Agent version validation is implemented.
- [ ] owner validation is implemented.
- [ ] Human accountability validation is implemented.
- [ ] Role validation is implemented.
- [ ] skill validation is implemented.
- [ ] capability validation is implemented.
- [ ] Tool validation is implemented.
- [ ] Model validation is implemented.
- [ ] memory validation is implemented.
- [ ] authority validation is implemented.
- [ ] autonomy validation is implemented.
- [ ] Customer scope validation is implemented.
- [ ] Tenant scope validation is implemented.
- [ ] workflow validation is implemented.
- [ ] Task validation is implemented.
- [ ] Security validation is implemented.
- [ ] Privacy validation is implemented.
- [ ] Ethics validation is implemented.
- [ ] Compliance validation is implemented.
- [ ] performance validation is implemented.
- [ ] test evidence validation is implemented.
- [ ] activation validation is implemented.
- [ ] Production authorization validation is implemented.
- [ ] controlled Agent Definition proof passes.
- [ ] controlled Agent registration proof passes.
- [ ] controlled Agent testing proof passes.
- [ ] controlled Agent activation proof passes.
- [ ] controlled Customer isolation proof passes.
- [ ] controlled Tenant isolation proof passes.
- [ ] Production Agent gate passes.
- [ ] `INDEX.md` is updated.
- [ ] `ROADMAP.md` is updated.
- [ ] `CHANGELOG.md` is updated.

---

# 106. Definition of Done

This document is content-complete for review when:

- [ ] purpose is defined;
- [ ] current authority status is explicit;
- [ ] strategic hierarchy is preserved;
- [ ] template non-equivalence rules are defined;
- [ ] usage rules are defined;
- [ ] Master Agent Definition Template is defined;
- [ ] Agent identity is defined;
- [ ] Agent ID rules are defined;
- [ ] Agent versioning is defined;
- [ ] Agent type is defined;
- [ ] purpose is defined;
- [ ] mission is defined;
- [ ] Department assignment is defined;
- [ ] Team assignment is defined;
- [ ] Role assignment is defined;
- [ ] Job Description relationship is defined;
- [ ] Human Accountable Owner is defined;
- [ ] Agent Owner is defined;
- [ ] ownership boundary is defined;
- [ ] skills are defined;
- [ ] capabilities are defined;
- [ ] capability boundary is defined;
- [ ] Tools are defined;
- [ ] Tool boundary is defined;
- [ ] Models are defined;
- [ ] Model boundary is defined;
- [ ] memory is defined;
- [ ] memory boundary is defined;
- [ ] authority is defined;
- [ ] prohibited authority is defined;
- [ ] autonomy is defined;
- [ ] autonomy boundary is defined;
- [ ] decision rights are defined;
- [ ] approval rights are defined;
- [ ] delegation rights are defined;
- [ ] communication rights are defined;
- [ ] Product scope is defined;
- [ ] Project scope is defined;
- [ ] Customer scope is defined;
- [ ] Tenant scope is defined;
- [ ] Customer Edition scope is defined;
- [ ] workflow scope is defined;
- [ ] Task scope is defined;
- [ ] input contract is defined;
- [ ] output contract is defined;
- [ ] source requirements are defined;
- [ ] truth status is defined;
- [ ] confidence is defined;
- [ ] assumptions are defined;
- [ ] limitations are defined;
- [ ] escalation is defined;
- [ ] Security is defined;
- [ ] Privacy is defined;
- [ ] Ethics is defined;
- [ ] Compliance is defined;
- [ ] Risk profile is defined;
- [ ] Agent Risk levels are defined;
- [ ] performance is defined;
- [ ] KPI relationship is defined;
- [ ] capacity is defined;
- [ ] lifecycle is defined;
- [ ] lifecycle boundary is defined;
- [ ] capability verification is defined;
- [ ] skill verification is defined;
- [ ] Tool verification is defined;
- [ ] Model verification is defined;
- [ ] memory verification is defined;
- [ ] Security testing is defined;
- [ ] Privacy testing is defined;
- [ ] Ethics testing is defined;
- [ ] Compliance testing is defined;
- [ ] Customer isolation testing is defined;
- [ ] Tenant isolation testing is defined;
- [ ] Agent Test Record is defined;
- [ ] activation prerequisites are defined;
- [ ] Activation Record is defined;
- [ ] observation is defined;
- [ ] observation boundary is defined;
- [ ] Production authorization is defined;
- [ ] Production Authorization Record is defined;
- [ ] Production boundary is defined;
- [ ] suspension is defined;
- [ ] Suspension Record is defined;
- [ ] reactivation is defined;
- [ ] retirement is defined;
- [ ] retirement requirements are defined;
- [ ] retirement boundary is defined;
- [ ] Agent evidence package is defined;
- [ ] evidence quality is defined;
- [ ] audit requirements are defined;
- [ ] validation checklist is defined;
- [ ] Agent Definition Review Gate is defined;
- [ ] Agent Registration Gate is defined;
- [ ] Agent Testing Gate is defined;
- [ ] Agent Production Gate is defined;
- [ ] Agent hard stops are defined;
- [ ] anti-gaming controls are defined;
- [ ] anti-patterns are defined;
- [ ] prohibited template behaviours are defined;
- [ ] example skeleton is included;
- [ ] current verified baseline is defined;
- [ ] current-state boundary is explicit;
- [ ] adoption requirements are defined;
- [ ] next Template document is identified.

This document becomes Active only after required review, Founder approval,
Enterprise Governance approval, Agent schema implementation, controlled
Agent Definition and registration proof, verification tests, Customer and
Tenant isolation proof, runtime evidence, and explicit Production
authorization.

---

# 107. Current Documentation Progress

After this document is saved:

```text
TOTAL_PLANNED_AI_WORKFORCE_DOCUMENTS=83

CONTENT_COMPLETE_FOR_REVIEW=71

EMPTY_PLACEHOLDERS_REMAINING=12

APPROVED_DOCUMENTS=0

ACTIVE_CANONICAL_DOCUMENTS=0

AGENTS_FOLDER=7_OF_7_COMPLETE_FOR_REVIEW

CAPABILITIES_FOLDER=4_OF_4_COMPLETE_FOR_REVIEW

KPIS_FOLDER=4_OF_4_COMPLETE_FOR_REVIEW

LEADERSHIP_FOLDER=4_OF_4_COMPLETE_FOR_REVIEW

ORCHESTRATION_FOLDER=4_OF_4_COMPLETE_FOR_REVIEW

ORGANIZATION_FOLDER=6_OF_6_COMPLETE_FOR_REVIEW

PLAYBOOKS_FOLDER=4_OF_4_COMPLETE_FOR_REVIEW

POLICIES_FOLDER=4_OF_4_COMPLETE_FOR_REVIEW

ROLES_FOLDER=4_OF_4_COMPLETE_FOR_REVIEW

SHARED_MEMORY_FOLDER=4_OF_4_COMPLETE_FOR_REVIEW

STANDARDS_FOLDER=4_OF_4_COMPLETE_FOR_REVIEW

TEAMS_FOLDER=4_OF_4_COMPLETE_FOR_REVIEW

TEMPLATES_FOLDER=1_OF_4_COMPLETE_FOR_REVIEW

AGENT_TEMPLATE_DEFINED=YES_TARGET_STATE

AGENT_TEMPLATE_REGISTRY_IMPLEMENTED=NO

AGENT_DEFINITION_REGISTRY_IMPLEMENTED=NO

VALIDATED_AGENT_DEFINITIONS=0_PROVEN

REGISTERED_AGENT_DEFINITIONS=0_PROVEN

ACTIVE_AGENT_INSTANCES=0_PROVEN

VERIFIED_PRODUCTION_AGENT_AUTHORIZATIONS=0_PROVEN

PRODUCTION_OPERATIONAL=NO
```

---

# 108. Current Document Decision

```text
DOCUMENT_ID=AIW-TPL-AGENT-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TARGET_STATE_AGENT_TEMPLATE=DEFINED

AGENT_TEMPLATE_REGISTRY=NOT_IMPLEMENTED

AGENT_DEFINITION_REGISTRY=NOT_IMPLEMENTED

AGENT_SCHEMA_VALIDATOR=NOT_IMPLEMENTED

AGENT_ID_VALIDATOR=NOT_IMPLEMENTED

AGENT_VERSION_VALIDATOR=NOT_IMPLEMENTED

AGENT_OWNER_VALIDATION=NOT_IMPLEMENTED

HUMAN_ACCOUNTABLE_OWNER_VALIDATION=NOT_IMPLEMENTED

AGENT_ROLE_VALIDATION=NOT_IMPLEMENTED

AGENT_SKILL_VALIDATION=NOT_IMPLEMENTED

AGENT_CAPABILITY_VALIDATION=NOT_IMPLEMENTED

AGENT_TOOL_VALIDATION=NOT_IMPLEMENTED

AGENT_MODEL_VALIDATION=NOT_IMPLEMENTED

AGENT_MEMORY_VALIDATION=NOT_IMPLEMENTED

AGENT_AUTHORITY_VALIDATION=NOT_IMPLEMENTED

AGENT_AUTONOMY_VALIDATION=NOT_IMPLEMENTED

AGENT_CUSTOMER_SCOPE_VALIDATION=NOT_IMPLEMENTED

AGENT_TENANT_SCOPE_VALIDATION=NOT_IMPLEMENTED

AGENT_WORKFLOW_VALIDATION=NOT_IMPLEMENTED

AGENT_TASK_VALIDATION=NOT_IMPLEMENTED

AGENT_SECURITY_VALIDATION=NOT_IMPLEMENTED

AGENT_PRIVACY_VALIDATION=NOT_IMPLEMENTED

AGENT_ETHICS_VALIDATION=NOT_IMPLEMENTED

AGENT_COMPLIANCE_VALIDATION=NOT_IMPLEMENTED

AGENT_PERFORMANCE_VALIDATION=NOT_IMPLEMENTED

AGENT_TEST_EVIDENCE_VALIDATION=NOT_IMPLEMENTED

AGENT_ACTIVATION_VALIDATION=NOT_IMPLEMENTED

AGENT_PRODUCTION_AUTHORIZATION_VALIDATION=NOT_IMPLEMENTED

VALIDATED_AGENT_DEFINITIONS=0_PROVEN

REGISTERED_AGENT_DEFINITIONS=0_PROVEN

ACTIVE_AGENT_INSTANCES=0_PROVEN

VERIFIED_AGENT_TEMPLATE_INSTANTIATIONS=0_PROVEN

VERIFIED_PRODUCTION_AGENT_AUTHORIZATIONS=0_PROVEN

RUNTIME_AGENT_ACTIVATION=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

---

# 109. Revision History

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1.0 | 2026-08-07 | Draft | Initial governed Agent Definition Template outline |
| 1.0.0 | 2026-08-07 | Draft | Defined reusable Agent identity, ownership, Role, skills, capabilities, Tools, Models, memory, authority, autonomy, Product/Project/Customer/Tenant scope, workflow, Tasks, testing, lifecycle, evidence, activation, suspension, retirement, and Production authorization template |

---

# 110. Changelog Entry

Append the following entry to:

```text
doc/19-ai-workforce/CHANGELOG.md
```

```markdown
## AIW-CHG-20260807-071 — Governed AI Agent Definition Template Completed

| Field | Value |
|---|---|
| Date | 2026-08-07 |
| Change Type | `CREATED`, `STATUS`, `TEMPLATE`, `AGENT`, `AI-WORKFORCE` |
| Impact | `I4 — Critical` |
| Risk | `R4` |
| Status | Completed for Review |
| Owner | Mianx.ai Founder |
| Steward | AI Workforce Council, Agent Governance, and Organization Governance |
| Approver | Pending Founder and Enterprise Governance Review |

### Affected Documents

- `doc/19-ai-workforce/templates/agent-template.md`
- `doc/19-ai-workforce/INDEX.md`
- `doc/19-ai-workforce/ROADMAP.md`
- `doc/19-ai-workforce/CHANGELOG.md`

### Previous State

`agent-template.md` existed as an empty placeholder.

The AI Workforce documentation already defined Agent types, lifecycle,
skills, Tools, memory, collaboration, performance, capabilities, Models,
Roles, Team Governance, Team Coordination, Hiring, and Production
boundaries, but lacked one reusable governed Agent Definition Template.

### New State

The document now defines:

- a complete reusable Agent Definition YAML template;
- Agent identity, ID, version, type, purpose, mission, Department, Team,
  Role, Job Description relationship, Agent Owner, and Human Accountable
  Owner;
- skills, capabilities, Tools, Models, memory, authority, prohibited
  authority, autonomy, decision rights, approval rights, delegation rights,
  and communication rights;
- Product, Project, Customer, Tenant, Customer Edition, environment,
  workflow, Task, input, output, source, truth, confidence, assumption,
  limitation, and escalation fields;
- Security, Privacy, Ethics, Compliance, Risk, performance, KPI, capacity,
  lifecycle, testing, activation, observation, Production authorization,
  suspension, reactivation, retirement, evidence, and approval fields;
- Agent Definition validation, registration, testing, activation, and
  Production gates;
- Customer and Tenant isolation testing requirements;
- hard stops, anti-gaming controls, anti-patterns, current-state boundaries,
  and adoption requirements.

### Preserved Truth

```text
Agent Template
≠
Agent Definition

Agent Definition
≠
Agent Registry Entry

Agent Registry Entry
≠
Agent Instance

Agent Instance
≠
Activated Agent

Activated Agent
≠
Production-Authorized Agent

Capability
≠
Authority

Tool Availability
≠
Tool Approval

Model Availability
≠
Model Approval

Customer Authorization
≠
All Tenant Authorization

Passing Tests
≠
Production Authorization

Documentation
≠
Runtime Agent Activation
```

### Limitations

- Founder approval is pending.
- Canonical status remains false.
- Agent Template Registry is not proven implemented.
- Agent Definition Registry is not proven implemented.
- schema validation is not proven implemented.
- Agent identity, Role, skills, capabilities, Tools, Models, memory,
  authority, autonomy, Customer, Tenant, Security, Privacy, Ethics,
  Compliance, performance, activation, and Production authorization
  validation are not proven implemented.
- validated Agent Definitions remain zero proven.
- registered Agent Definitions remain zero proven.
- active Agent Instances remain zero proven.
- verified Agent Template instantiations remain zero proven.
- verified Production Agent authorizations remain zero proven.
- runtime Agent activation remains unauthorized.

### Follow-Up

- complete `doc/19-ai-workforce/templates/department-template.md`;
- use document ID `AIW-TPL-DEPT-001`;
- define the governed reusable Department Definition Template, including
  Department identity, Department ID, version, purpose, mission, owner,
  executive sponsor, reporting line, Teams, Roles, Human workforce, AI
  workforce, capabilities, shared services, Products, Projects, Customers,
  Tenants, decision rights, authority, budget boundary, Security, Privacy,
  Ethics, Compliance, KPIs, capacity, workflows, lifecycle, evidence,
  activation, restructuring, merger, split, suspension, dissolution,
  retirement, audit, and Production Department gates;
- preserve exact separation between Department Template, Department
  Definition, Department Registry entry, active organizational Department,
  Product, Project, Team, Customer, Tenant, and Production authority.
```

---

# 111. Templates Folder Status

After saving this document:

```text
templates/
├── agent-template.md         CONTENT_COMPLETE_FOR_REVIEW
├── department-template.md    EMPTY_PLACEHOLDER
├── team-template.md          EMPTY_PLACEHOLDER
└── workflow-template.md      EMPTY_PLACEHOLDER
```

Folder-level status:

```text
TEMPLATES_FOLDER_DOCUMENTS=4

CONTENT_COMPLETE_FOR_REVIEW=1

EMPTY_PLACEHOLDERS=3

APPROVED=0

CANONICAL=0

AGENT_TEMPLATE_DEFINED=YES_TARGET_STATE

AGENT_TEMPLATE_IMPLEMENTED=NO

PRODUCTION_AGENT_TEMPLATE_ENFORCEMENT=NOT_AUTHORIZED
```

---

# 112. Next Document

The next document is:

```text
doc/19-ai-workforce/templates/department-template.md
```

It must use:

```text
AIW-TPL-DEPT-001
```

It must define:

- Enterprise Department Template purpose;
- template authority;
- Founder sovereignty;
- Department identity;
- Department ID;
- Department version;
- Department name;
- purpose;
- mission;
- organizational parent;
- Department Owner;
- executive sponsor;
- reporting hierarchy;
- decision rights;
- authority;
- prohibited authority;
- Teams;
- Team Owners;
- Human workforce;
- AI workforce;
- Roles;
- Job Descriptions;
- skills;
- capabilities;
- Tools;
- Models;
- memory;
- Product relationships;
- Project relationships;
- Shared Services;
- Customer scope;
- Tenant scope;
- Customer Edition scope;
- workflows;
- communications;
- dependencies;
- escalation;
- separation of duties;
- budget boundary;
- cost center relationship;
- Security;
- Privacy;
- Ethics;
- Compliance;
- Risk;
- performance;
- Department KPIs;
- capacity;
- lifecycle;
- creation;
- approval;
- activation;
- restructuring;
- merger;
- split;
- transfer;
- suspension;
- dissolution;
- retirement;
- evidence;
- audit;
- Production Department gates;
- current-state limitations;
- Changelog entry;
- next Template document path.

---