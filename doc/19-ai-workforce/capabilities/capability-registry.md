---
id: AIW-REG-CAPABILITY-001
title: Mianx.ai AI Workforce Capability Registry
version: 1.0.0
status: Draft

type: Enterprise AI Workforce Capability Registry Standard
class: Governed Registry

owner: AI Workforce Council
steward: Capability Governance and AI Workforce Operations
authority: Founder and Enterprise Governance

maintainers:
  - AI Workforce Operations
  - Capability Governance
  - Agent Framework Team
  - AI Operating System Team
  - Enterprise Architecture
  - Enterprise Governance
  - Product Operations
  - Project Operations
  - Team Operations
  - Workflow and Orchestration Operations
  - Security Governance
  - Data and Privacy Governance
  - Enterprise Quality
  - Model Governance
  - Tool Governance
  - Memory Governance
  - Finance Governance
  - Platform Operations
  - Observability Operations
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
  - Chief Scientist
  - AI Workforce Council
  - Enterprise Architecture
  - Enterprise Governance
  - Enterprise Quality
  - Capability Governance
  - Product Operations
  - Project Operations
  - Team Operations
  - Workflow and Orchestration Operations
  - Security Governance
  - Data and Privacy Governance
  - Model Governance
  - Tool Governance
  - Memory Governance
  - Finance Governance
  - Platform Operations
  - Observability Operations
  - Documentation Governance

created: 2026-08-06
updated: 2026-08-06

classification: Internal

audience:
  - Founder
  - Executive Leadership
  - AI Workforce Council
  - Department Directors
  - Team Leads
  - Product Owners
  - Project Owners
  - Capability Owners
  - Enterprise Architects
  - AI Platform Engineers
  - Agent Engineers
  - Prompt Engineers
  - Workflow Designers
  - Orchestration Designers
  - Model Owners
  - Tool Owners
  - Memory Owners
  - Security Teams
  - Data and Privacy Teams
  - Quality Teams
  - Finance Teams
  - Operations Teams
  - Reviewers
  - Approvers
  - Auditors
  - Documentation Maintainers
  - AI Agents

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

related_documents:
  - ./skill-registry.md
  - ./tool-registry.md
  - ./model-registry.md
  - ../roles/role-catalog.md
  - ../roles/job-descriptions.md
  - ../roles/skill-matrix.md
  - ../teams/team-structure.md
  - ../teams/team-governance.md
  - ../teams/team-coordination.md
  - ../orchestration/orchestration-model.md
  - ../orchestration/delegation-engine.md
  - ../orchestration/collaboration-engine.md
  - ../orchestration/conflict-resolution.md
  - ../workflows/workflow-engine.md
  - ../workflows/task-assignment.md
  - ../workflows/task-routing.md
  - ../workflows/approval-flow.md
  - ../workflows/cross-department-workflow.md
  - ../shared-memory/shared-memory.md
  - ../shared-memory/enterprise-memory.md
  - ../shared-memory/project-memory.md
  - ../shared-memory/client-memory.md
  - ../policies/security-policy.md
  - ../policies/privacy-policy.md
  - ../policies/ethics-policy.md
  - ../policies/compliance-policy.md
  - ../standards/documentation-standard.md
  - ../standards/communication-standard.md
  - ../standards/performance-standard.md
  - ../training/training-framework.md
  - ../training/evaluation.md
  - ../training/certification.md
  - ../kpis/agent-kpis.md
  - ../kpis/team-kpis.md
  - ../kpis/department-kpis.md
  - ../kpis/enterprise-kpis.md
  - ../playbooks/onboarding.md
  - ../playbooks/task-execution.md
  - ../playbooks/incident-response.md
  - ../playbooks/offboarding.md
  - ../templates/agent-template.md
  - ../templates/team-template.md
  - ../templates/department-template.md
  - ../templates/workflow-template.md

review_cycle:
  - Monthly During Documentation and Implementation
  - Monthly During Initial Controlled Capability Operation
  - Quarterly During Stable Controlled Operation
  - Annually After Stable Production Operation
  - After AI Constitution Change
  - After Workforce Architecture Change
  - After Capability Model Change
  - After Agent, Role, Skill, Tool, Model, Prompt, Memory, or Workflow Change
  - After Product, Project, Tenant, Customer, Environment, or Regional Scope Change
  - Before New High-Risk Capability Approval
  - Before Capability Allocation
  - Before Runtime Capability Activation
  - Before Production Capability Promotion
  - After Critical AI, Security, Privacy, Quality, Financial, Customer, or Operational Incident
  - Before Canonical Promotion

capability_horizon:
  current: Target-State Capability Registry Definition
  near_term: One-Agent Low-Risk Capability Proof
  medium_term: Team, Department, Product, Project, and Multi-Agent Capability Governance
  long_term: Production-Controlled Multi-Tenant Enterprise Capability Assurance

canonical: false
---

# Mianx.ai AI Workforce Capability Registry

> **This document defines the governed target-state Registry for all AI
> Workforce capabilities used across Mianx.ai, MianX Core Platform, the
> Mianx.ai AI Operating System, Shared AI Workforce, Industry Operating
> Systems, Customer Editions, Products, Projects, Tenants, Teams, Agents,
> workflows, Tools, Models, memory systems, and governed Human oversight.**

---

# 1. Document Purpose

This document establishes the target-state Capability Registry standard for the
Mianx.ai AI Workforce.

It defines:

- Capability Registry purpose;
- Registry authority;
- Capability identity;
- Capability Definition;
- Capability Profile;
- Capability Instance;
- Capability Package;
- Capability versioning;
- capability categories;
- capability domains;
- capability ownership;
- capability lifecycle;
- capability dependencies;
- Role dependencies;
- Agent dependencies;
- Skill dependencies;
- Tool dependencies;
- Model dependencies;
- prompt dependencies;
- memory dependencies;
- workflow dependencies;
- orchestration dependencies;
- Data dependencies;
- Knowledge dependencies;
- authority dependencies;
- permission dependencies;
- evidence dependencies;
- Human-review dependencies;
- cost dependencies;
- capacity dependencies;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- environment scope;
- regional scope;
- capability Risk;
- evaluation;
- certification;
- allocation;
- activation;
- runtime availability;
- monitoring;
- degradation;
- restriction;
- suspension;
- replacement;
- deprecation;
- retirement;
- archival;
- audit;
- reporting;
- Production capability gates;
- current-state boundaries.

This document ensures that a capability is not considered implemented,
available, active, or Production-ready merely because:

- its name exists;
- a document describes it;
- an Agent Role requires it;
- a Skill exists;
- a Tool connector exists;
- a Model can theoretically perform related work;
- a prompt contains related instructions;
- a workflow diagram references it;
- a planned Agent is assigned to it;
- a target architecture includes it.

This document does not independently:

- approve a Capability Definition;
- register a runtime Capability Instance;
- create an Agent;
- assign a Role;
- grant a Skill;
- approve a Tool;
- approve a Model;
- grant permissions;
- allocate capacity;
- activate runtime execution;
- authorize Customer use;
- authorize Production operation;
- prove implementation.

---

# 2. Current Authority Status

This document currently has the following state:

```text
DOCUMENT_ID=AIW-REG-CAPABILITY-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TARGET_STATE_CAPABILITY_REGISTRY=DEFINED

CAPABILITY_REGISTRY_IMPLEMENTATION=NOT_IMPLEMENTED

CAPABILITY_POLICY_ENGINE=NOT_IMPLEMENTED

CAPABILITY_ROUTING_ENGINE=NOT_IMPLEMENTED

CAPABILITY_EVALUATION_ENGINE=NOT_IMPLEMENTED

RUNTIME_CAPABILITY_ENFORCEMENT=NOT_VERIFIED

APPROVED_CAPABILITY_DEFINITIONS=0_PROVEN

ACTIVE_CAPABILITY_INSTANCES=0_PROVEN

PRODUCTION_CAPABILITIES=0_PROVEN

RUNTIME_AGENT_ACTIVATION=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

Therefore:

- all Capability records in this document are target-state definitions;
- no Capability Definition is approved;
- no Capability Profile is active;
- no Capability Instance is registered;
- no runtime capability is verified;
- no capability routing is implemented;
- no Product or Project capability availability is proven;
- no Production capability is authorized;
- Founder and required Governance approvals remain pending.

---

# 3. Strategic Alignment

The Capability Registry operates inside the exact Mianx.ai hierarchy:

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

Capabilities support this hierarchy.

They do not replace:

- Company Governance;
- Founder authority;
- Human accountability;
- Product ownership;
- Project ownership;
- Customer contractual authority;
- Role authority;
- Agent lifecycle;
- Skill evaluation;
- Tool permission;
- Model approval;
- Data Governance;
- Security review;
- Quality review;
- evidence;
- Production approval.

---

# 4. Capability Registry Objective

The Registry must make it possible to answer:

- What capability exists?
- Which Capability ID identifies it?
- Which version is current?
- Which capability category applies?
- Which business outcome does it support?
- Which Product may use it?
- Which Project may use it?
- Which Tenant or Customer may use it?
- Which environment may use it?
- Which Roles are required?
- Which Agents are eligible?
- Which Skills are required?
- Which Tools are required?
- Which Models are required?
- Which prompts are required?
- Which memory is required?
- Which workflows are required?
- Which Data is required?
- Which authority is required?
- Which permissions are required?
- Which Human review is required?
- What is the maximum Risk?
- Which evaluation proves eligibility?
- Is certification required?
- Is runtime availability verified?
- How is the capability suspended?
- Which evidence proves its current state?

---

# 5. Core Capability Principles

## 5.1 Capabilities Must Be Outcome-Oriented

A capability must describe a governed ability to produce a defined outcome.

It must not be only:

- a title;
- a Department name;
- a Tool name;
- a Model name;
- a prompt name;
- an Agent name;
- a general aspiration.

---

## 5.2 Capabilities Must Be Explicitly Defined

Every Capability Definition must include:

- identity;
- purpose;
- outcome;
- scope;
- owner;
- dependencies;
- Risk;
- evaluation;
- evidence;
- lifecycle;
- suspension;
- retirement.

---

## 5.3 Capability Documentation Does Not Prove Availability

A documented Capability Definition must be reported as:

```text
DEFINED
```

not:

```text
AVAILABLE

ACTIVE

PRODUCTION-READY
```

unless runtime evidence exists.

---

## 5.4 Capabilities Must Be Versioned

A material change to:

- purpose;
- outcome;
- dependency;
- Tool;
- Model;
- prompt;
- workflow;
- Data;
- Risk;
- authority;
- environment;

requires controlled versioning.

---

## 5.5 Capabilities Must Be Scope-Bound

Every capability must identify permitted:

- Organization;
- Department;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- Data classification;
- Risk.

---

## 5.6 Capabilities Must Use Least Privilege

A capability must use only the minimum:

- Agent authority;
- Tool permissions;
- Model routes;
- memory access;
- Data access;
- workflow actions;
- budget;
- capacity;

required for the approved outcome.

---

## 5.7 Capabilities Must Be Composable but Bounded

Capabilities may be combined into larger Capability Packages.

Composition must not silently expand:

- authority;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- environment;
- Risk;
- financial limits.

---

## 5.8 Capabilities Must Be Measurable

Every capability must define:

- success criteria;
- quality criteria;
- evidence requirements;
- performance metrics;
- failure conditions;
- acceptance rules.

---

## 5.9 Capabilities Must Be Suspendable

Every runtime capability must support:

- restriction;
- degraded operation;
- suspension;
- dependency isolation;
- credential revocation;
- routing removal;
- retirement.

---

## 5.10 Capability Claims Require Evidence

No capability may be reported as:

- implemented;
- available;
- active;
- live-tested;
- Production-controlled;

without appropriate evidence.

---

# 6. Governing Non-Equivalence Rule

The following entities must remain separate:

```text
Role
≠
Skill
≠
Tool
≠
Model
≠
Prompt
≠
Memory
≠
Workflow
≠
Capability Definition
≠
Capability Profile
≠
Capability Package
≠
Capability Instance
≠
Capability Allocation
≠
Capability Activation
≠
Runtime Capability Availability
≠
Production Capability
```

---

# 7. Capability Definition

A Capability Definition describes a governed ability to produce one bounded
business, Product, Project, technical, operational, Governance, Customer, or
Research outcome.

A Capability Definition should answer:

- what outcome is produced;
- for whom;
- under which scope;
- using which dependencies;
- under which authority;
- with which evidence;
- at which Risk;
- through which lifecycle.

---

# 8. Capability Profile

A Capability Profile defines the approved configuration required to deliver a
Capability Definition.

It may include:

- Roles;
- Agent types;
- Agent Definitions;
- Skills;
- Tools;
- Models;
- prompts;
- memory;
- Data;
- Knowledge;
- workflows;
- orchestration;
- authority;
- permissions;
- approvals;
- budgets;
- capacity;
- monitoring;
- evidence.

---

# 9. Capability Instance

A Capability Instance is one runtime realization of an approved Capability
Profile within an exact scope.

It must identify:

- Capability Definition;
- Capability Profile;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- participating Agents;
- runtime versions;
- Tools;
- Models;
- memory;
- workflow;
- active allocation;
- lifecycle state;
- evidence.

---

# 10. Capability Package

A Capability Package combines multiple approved Capability Definitions to
produce a broader outcome.

Example:

```text
Software Delivery Capability Package

Includes:
- Requirements Analysis
- Architecture Design
- Implementation
- Automated Testing
- Security Review
- Release Preparation
- Deployment Verification
- Documentation
```

A package must not hide failure of a mandatory child capability.

---

# 11. Capability Registry Entry

A Capability Registry Entry is the governed source-of-truth record for one
Capability Definition and its lifecycle.

The Registry Entry should contain:

- Capability ID;
- exact version;
- current status;
- owner;
- steward;
- category;
- scope;
- dependencies;
- evaluation;
- certification;
- approvals;
- evidence;
- review date;
- lifecycle history.

---

# 12. Capability Entity Model

```text
Business or Operating Need
    ↓
Capability Definition
    ↓
Capability Profile
    ↓
Dependency Validation
    ↓
Evaluation
    ↓
Approval
    ↓
Capability Allocation
    ↓
Capability Instance
    ↓
Activation
    ↓
Runtime Availability
    ↓
Task or Workflow Execution
    ↓
Verifiable-Work Evidence
    ↓
Monitoring and Review
    ↓
Restriction, Suspension, Replacement, or Retirement
```

---

# 13. Capability ID Standard

Proposed Capability ID format:

```text
AIW-CAP-{DOMAIN}-{NUMBER}
```

Examples:

```text
AIW-CAP-ENG-001
AIW-CAP-SEC-001
AIW-CAP-PROD-001
AIW-CAP-OPS-001
AIW-CAP-DATA-001
```

Capability Profile ID format:

```text
AIW-CAP-PROFILE-{DOMAIN}-{NUMBER}
```

Capability Instance ID format:

```text
AIW-CAP-INSTANCE-{SCOPE}-{NUMBER}
```

Capability Package ID format:

```text
AIW-CAP-PACKAGE-{DOMAIN}-{NUMBER}
```

---

# 14. Capability Identity Rules

A Capability ID must:

- remain unique;
- identify one bounded capability;
- remain stable;
- not be reused;
- remain separate from Role IDs;
- remain separate from Skill IDs;
- remain separate from Tool IDs;
- remain separate from Model IDs;
- remain version-controlled;
- remain traceable after retirement.

---

# 15. Capability Definition Record

```yaml
capability_definition:
  capability_id: required
  capability_version: required
  capability_name: required
  short_name: conditional

  category: required
  domain: required
  capability_family: required

  purpose: required
  business_outcome: required
  expected_outputs: required
  success_criteria: required
  failure_criteria: required

  permitted_uses: required
  prohibited_uses: required

  required_roles: required
  eligible_agent_types: required
  required_skills: required
  required_tools: conditional
  required_models: conditional
  required_prompts: required
  required_memory: conditional
  required_workflows: required
  required_data: conditional
  required_knowledge: conditional

  authority_profile_id: required
  permission_profile_id: required
  approval_profile_id: required
  evidence_profile_id: required
  evaluation_profile_id: required
  certification_profile_id: conditional
  monitoring_profile_id: required
  suspension_profile_id: required

  organization_scope: required
  product_scope: conditional
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment_scope: required
  region_scope: conditional
  data_scope: required

  maximum_risk_class: required
  estimated_cost_profile: required
  capacity_profile_id: required
  human_review_profile_id: required

  capability_owner: required
  capability_steward: required
  technical_owner: required
  security_owner: required
  quality_owner: required
  cost_owner: required
  data_owner: conditional

  lifecycle_state: required
  approval_state: required
  created_at: required
  updated_at: required
  review_at: required
```

---

# 16. Capability Profile Record

```yaml
capability_profile:
  capability_profile_id: required
  capability_profile_version: required

  capability_id: required
  capability_version: required

  role_profile_ids: required
  agent_definition_ids: required
  skill_profile_ids: required
  tool_profile_ids: conditional
  model_profile_ids: conditional
  prompt_profile_ids: required
  memory_profile_ids: conditional
  workflow_profile_ids: required
  orchestration_profile_ids: conditional

  authority_profile_id: required
  permission_profile_id: required
  approval_profile_id: required
  evidence_profile_id: required
  evaluation_profile_id: required
  monitoring_profile_id: required
  cost_profile_id: required
  capacity_profile_id: required

  organization_scope: required
  product_scope: conditional
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment_scope: required
  region_scope: conditional
  data_scope: required

  maximum_risk_class: required
  maximum_autonomy_level: required

  accountable_human_owner: required
  approved_by: required

  effective_at: required
  review_at: required
  expires_at: conditional
  profile_state: required
```

---

# 17. Capability Instance Record

```yaml
capability_instance:
  capability_instance_id: required

  capability_id: required
  capability_version: required
  capability_profile_id: required
  capability_profile_version: required

  organization_id: required
  product_id: required
  project_id: conditional
  tenant_id: conditional
  customer_id: conditional
  environment: required
  region: conditional

  participating_agent_instances: required
  active_role_assignments: required
  active_skill_assignments: required
  active_tool_profiles: conditional
  active_model_profiles: conditional
  active_prompt_profiles: required
  active_memory_profiles: conditional
  active_workflow_profiles: required

  authority_reference: required
  permission_reference: required
  allocation_reference: required
  approval_reference: required
  evaluation_reference: required
  certification_reference: conditional

  monitoring_reference: required
  evidence_reference: required

  instance_state: required
  health_state: required
  availability_state: required

  activated_at: conditional
  review_at: required
  expires_at: conditional
  suspended_at: conditional
  retired_at: conditional
```

---

# 18. Capability Package Record

```yaml
capability_package:
  capability_package_id: required
  capability_package_version: required
  package_name: required

  objective: required
  required_capabilities: required
  optional_capabilities: conditional
  prohibited_combinations: conditional

  dependency_order: required
  parallel_execution_rules: conditional
  failure_propagation_rules: required
  rollback_or_compensation_rules: required

  aggregate_success_criteria: required
  child_success_requirements: required
  evidence_aggregation_rules: required

  maximum_risk_class: required
  accountable_human_owner: required
  approved_by: required

  lifecycle_state: required
  approval_state: required
  review_at: required
```

---

# 19. Capability Categories

| Code | Capability Category | Purpose |
|---|---|---|
| `CAP-LEAD` | Leadership | Strategy, prioritization, executive coordination, and decision support |
| `CAP-PROD` | Product | Product discovery, requirements, Roadmap, design, and lifecycle |
| `CAP-ENG` | Engineering | Software, platform, infrastructure, and system implementation |
| `CAP-AI` | AI and Agent Systems | Agent, prompt, Model, evaluation, and orchestration systems |
| `CAP-DATA` | Data and Analytics | Data processing, quality, reporting, analytics, and intelligence |
| `CAP-SEC` | Security and Privacy | Security, identity, access, privacy, and incident controls |
| `CAP-QA` | Quality and Assurance | Testing, review, verification, evidence, and acceptance |
| `CAP-OPS` | Operations | Service operation, monitoring, support, capacity, and recovery |
| `CAP-GOV` | Governance | Policy, Risk, compliance, audit, and authority validation |
| `CAP-CUS` | Customer | Customer support, success, onboarding, and service coordination |
| `CAP-GTM` | Go-to-Market | Marketing, SEO, sales, market intelligence, and growth |
| `CAP-FIN` | Finance | Budgeting, forecasting, financial analysis, and cost Governance |
| `CAP-HR` | People and Workforce | Workforce planning, Role design, training, and evaluation |
| `CAP-LEGAL` | Legal and Compliance | Legal research support, obligation tracking, and policy review |
| `CAP-RES` | Research and Innovation | Research, experimentation, evaluation, and technology transfer |
| `CAP-DOC` | Documentation and Knowledge | Documentation, Knowledge, standards, and controlled publishing |
| `CAP-ADMIN` | Administration | Scheduling, controlled records, routing, and administration |
| `CAP-IND` | Industry Operating System | Industry-specific operational capability |
| `CAP-ENT` | Enterprise Shared Service | Reusable cross-Product enterprise capability |

---

# 20. Capability Families

A capability family groups related capabilities.

Example:

```text
Engineering Capability Family
├── Requirements Analysis
├── Architecture Design
├── Backend Implementation
├── Frontend Implementation
├── Database Engineering
├── Automated Testing
├── Security Review
├── Release Preparation
└── Deployment Verification
```

A family does not automatically approve all child capabilities.

---

# 21. Atomic Capability

An atomic capability produces one bounded outcome.

Examples:

- validate a requirement;
- generate a test case;
- review an access policy;
- classify an incident;
- create a controlled document draft;
- verify a build result.

Atomic capabilities improve:

- evaluation;
- routing;
- restriction;
- evidence;
- cost attribution;
- replacement.

---

# 22. Composite Capability

A composite capability combines multiple atomic or composite capabilities.

A composite capability must define:

- mandatory child capabilities;
- optional child capabilities;
- dependency order;
- success rules;
- failure propagation;
- Human-review points;
- aggregate evidence;
- aggregate Risk;
- rollback or compensation.

---

# 23. Enterprise Capability

An Enterprise Capability supports approved reusable work across Mianx.ai.

It may be shared across:

- Products;
- Projects;
- Industry Operating Systems;
- Customer Editions.

Enterprise capability reuse must preserve:

- Product isolation;
- Project isolation;
- Tenant isolation;
- Customer confidentiality;
- cost attribution;
- evidence attribution.

---

# 24. Product Capability

A Product Capability supports one approved Product.

Examples may include:

- MianX Core Platform architecture;
- Mianx.ai AI Operating System orchestration;
- RestaurantOS order operations;
- PoultryOS flock analytics.

A Product Capability must not automatically apply to another Product.

---

# 25. Project Capability

A Project Capability supports one approved Project.

It may include:

- Project-specific architecture;
- Project-specific workflows;
- Project-specific integrations;
- Project-specific Customer requirements;
- Project-specific deployment;
- Project-specific Data models.

Project closure must trigger capability review.

---

# 26. Tenant Capability

A Tenant Capability operates within one Tenant boundary.

It must use:

- Tenant identity;
- Tenant-scoped permissions;
- Tenant-scoped Tools;
- Tenant-scoped memory;
- Tenant-scoped Data;
- Tenant-scoped evidence;
- Tenant-specific cost attribution;
- Tenant-specific suspension.

---

# 27. Customer Capability

A Customer Capability supports an approved Customer outcome.

It must define:

- Customer identity;
- approved service;
- contractual boundary;
- communication boundary;
- Data boundary;
- Product;
- Project;
- Tenant;
- environment;
- Human owner;
- Customer evidence.

---

# 28. Environment-Specific Capability

Capabilities must distinguish:

```text
ENV-DOCS

ENV-LOCAL

ENV-DEVELOPMENT

ENV-TEST

ENV-STAGING

ENV-PRODUCTION-READ

ENV-PRODUCTION-WRITE
```

A Development Capability Instance must not be reported as a Production
Capability Instance.

---

# 29. Regional Capability

A Regional Capability may be constrained by:

- Data residency;
- law;
- regulation;
- language;
- Customer location;
- provider region;
- Tool availability;
- Model availability;
- support coverage;
- retention rules.

---

# 30. Capability Ownership

Every Capability Definition must have:

- accountable business owner;
- capability owner;
- capability steward;
- technical owner;
- Security owner;
- privacy owner where applicable;
- Data owner where applicable;
- quality owner;
- operational owner;
- cost owner;
- documentation owner.

---

# 31. Capability Owner Responsibilities

The Capability Owner is accountable for:

- purpose;
- outcome;
- lifecycle;
- scope;
- dependencies;
- quality;
- Risk;
- cost;
- evidence;
- review;
- deprecation;
- retirement.

The Capability Owner must not independently approve every high-risk dependency.

---

# 32. Capability Steward Responsibilities

The Capability Steward manages:

- Registry completeness;
- metadata;
- version control;
- review scheduling;
- dependency mapping;
- lifecycle updates;
- status accuracy;
- evidence references;
- Changelog coordination.

---

# 33. Role Dependency

A capability must identify required Roles.

Example:

```yaml
required_roles:
  - role_id: AIW-ROLE-EXAMPLE-001
    responsibility: execution
    minimum_count: 1

  - role_id: AIW-ROLE-REVIEW-001
    responsibility: independent_review
    minimum_count: 1
```

A Role requirement does not prove an eligible Agent exists.

---

# 34. Agent Dependency

A Capability Profile may identify:

- eligible Agent types;
- approved Agent Definitions;
- minimum Agent count;
- maximum Agent count;
- required separation of duties;
- required Human owner;
- required reviewer.

A planned Agent must not be counted as an active capability dependency.

---

# 35. Skill Dependency

A capability must identify:

- required Skills;
- minimum proficiency;
- certification;
- scope;
- expiry;
- substitution rules.

Missing mandatory Skills must block activation.

---

# 36. Tool Dependency

A Tool dependency must identify:

- Tool ID;
- Tool version;
- Tool Instance;
- permitted actions;
- environment;
- Product;
- Project;
- Tenant;
- Risk;
- credential method;
- fallback.

Tool availability does not prove Tool permission.

---

# 37. Model Dependency

A Model dependency must identify:

- Model Profile;
- provider;
- Model;
- approved purpose;
- Data classes;
- region;
- evaluation;
- fallback;
- cost;
- monitoring.

Capability evaluation must be repeated after a material Model change.

---

# 38. Prompt Dependency

A prompt dependency must identify:

- Prompt Profile ID;
- prompt version;
- hierarchy layer;
- Role layer;
- Product layer;
- Project layer;
- environment;
- content digest;
- evaluation reference.

Prompt text alone does not create a capability.

---

# 39. Memory Dependency

A memory dependency must identify:

- memory types;
- namespaces;
- read scope;
- write scope;
- Product;
- Project;
- Tenant;
- Customer;
- retention;
- provenance;
- isolation;
- deletion.

---

# 40. Workflow Dependency

A workflow dependency must identify:

- Workflow ID;
- version;
- trigger;
- steps;
- approvals;
- retries;
- timeouts;
- handoffs;
- failure path;
- evidence;
- rollback or compensation.

---

# 41. Orchestration Dependency

An orchestration dependency may coordinate:

- Agent selection;
- Task routing;
- dependency resolution;
- parallel execution;
- retries;
- approval requests;
- evidence aggregation;
- conflict escalation;
- suspension.

Orchestration must not expand capability authority.

---

# 42. Data Dependency

A Data dependency must identify:

- Data source;
- Data owner;
- Data classification;
- Product;
- Project;
- Tenant;
- Customer;
- region;
- quality;
- retention;
- legal basis where applicable;
- access permission.

---

# 43. Knowledge Dependency

A Knowledge dependency must identify:

- Knowledge asset;
- version;
- owner;
- scope;
- canonical status;
- effective date;
- expiry or review date;
- provenance;
- access rules.

Unverified memory must not be represented as canonical Knowledge.

---

# 44. Authority Dependency

A capability must define required authority for:

- planning;
- execution;
- review;
- approval;
- external communication;
- Customer action;
- Production action;
- financial action;
- destructive action;
- suspension.

---

# 45. Permission Dependency

Effective permission must be the narrowest intersection of:

```text
Capability Definition

Capability Profile

Agent Authority

Agent Permission

Product Policy

Project Policy

Tenant Policy

Customer Policy

Environment Policy

Tool Policy

Model Policy

Memory Policy

Workflow Policy

Task Authorization

Approval Conditions
```

Default result must be:

```text
DENY
```

when mandatory conditions are missing.

---

# 46. Evidence Dependency

Every capability must define evidence for:

- inputs;
- participants;
- authority;
- permissions;
- Tool use;
- Model use;
- memory use;
- workflow steps;
- tests;
- outputs;
- failures;
- reviews;
- approvals;
- acceptance;
- cost;
- final status.

---

# 47. Human-Review Dependency

Human review requirements must define:

- reviewer Role;
- reviewer qualification;
- independence;
- review stage;
- review criteria;
- response time;
- escalation;
- acceptance authority.

---

# 48. Cost Dependency

Capability cost may include:

- Agent execution;
- Model usage;
- Tool usage;
- infrastructure;
- memory;
- storage;
- Data processing;
- retries;
- Human review;
- support;
- incident recovery.

---

# 49. Capacity Dependency

Capability capacity may depend on:

- eligible Agents;
- concurrent Agent slots;
- Tool quotas;
- Model quotas;
- Data capacity;
- memory capacity;
- workflow capacity;
- infrastructure;
- budget;
- Human-review capacity;
- support capacity.

Unknown capacity must not be reported as available.

---

# 50. Dependency Graph

A Capability Profile should maintain a dependency graph.

```text
Capability
├── Roles
├── Agents
├── Skills
├── Tools
├── Models
├── Prompts
├── Memory
├── Workflows
├── Orchestration
├── Data
├── Knowledge
├── Authority
├── Permissions
├── Human Review
├── Budget
├── Capacity
├── Monitoring
└── Evidence
```

---

# 51. Dependency State

Each dependency should have one state:

```text
NOT-DEFINED

PROPOSED

IN-REVIEW

APPROVED

AVAILABLE

DEGRADED

UNAVAILABLE

SUSPENDED

EXPIRED

RETIRED
```

A mandatory unavailable dependency makes the capability unavailable unless an
approved fallback exists.

---

# 52. Dependency Compatibility

Compatibility must be checked across:

- versions;
- environment;
- Product;
- Project;
- Tenant;
- Customer;
- region;
- Data class;
- Risk;
- authority;
- permission;
- lifecycle state.

---

# 53. Capability Risk Classification

| Risk | Capability Interpretation |
|---|---|
| `R0` | Public, read-only, or negligible-impact capability |
| `R1` | Reversible internal analysis, drafting, or low-impact capability |
| `R2` | Controlled internal execution with bounded impact |
| `R3` | Production, Customer, Security, privacy, financial, or material operational capability |
| `R4` | Irreversible, destructive, constitutional, legal, regulated, or enterprise-critical capability |

---

# 54. Capability Risk Factors

Risk assessment should consider:

- reversibility;
- Customer impact;
- Production impact;
- Data sensitivity;
- Tenant scope;
- financial impact;
- legal impact;
- Security impact;
- autonomy;
- Tool actions;
- Model uncertainty;
- Human-review availability;
- scale;
- concurrency;
- failure propagation.

---

# 55. Capability Lifecycle

The target Capability Definition lifecycle is:

```text
Need Identified
    ↓
Capability Proposed
    ↓
Capability Defined
    ↓
Dependencies Designed
    ↓
Capability in Review
    ↓
Capability Approved
    ↓
Capability Available for Profile Creation
    ↓
Capability Maintained
    ↓
Capability Revised
    ↓
Capability Deprecated
    ↓
Capability Retired
    ↓
Capability Archived
```

---

# 56. Capability Definition States

| State | Meaning |
|---|---|
| `NEED-IDENTIFIED` | Verified capability need exists |
| `PROPOSED` | Initial capability proposal exists |
| `DEFINED` | Purpose, outcome, scope, and dependencies are documented |
| `DESIGNED` | Capability Profile requirements are designed |
| `IN-REVIEW` | Required reviews are underway |
| `APPROVED` | Exact Capability Definition version is approved |
| `AVAILABLE` | Approved profiles may be created |
| `MAINTAINED` | Capability Definition remains actively governed |
| `REVISION-PENDING` | Material revision is under review |
| `DEPRECATED` | New allocations should stop |
| `RETIRED` | Capability may no longer be activated |
| `ARCHIVED` | Historical record remains |

---

# 57. Capability Instance Lifecycle

```text
Instance Requested
    ↓
Profile Selected
    ↓
Dependencies Validated
    ↓
Evaluation Pending
    ↓
Evaluated
    ↓
Certified Where Required
    ↓
Allocated
    ↓
Activation Pending
    ↓
Active
    ↓
Live-Tested
    ↓
Production-Controlled Where Approved
    ↓
Monitored
    ↓
Restricted, Degraded, Suspended, or Replaced
    ↓
Retired
    ↓
Archived
```

---

# 58. Capability Instance States

| State | Meaning |
|---|---|
| `REQUESTED` | Runtime capability instance is requested |
| `DEPENDENCY-VALIDATION` | Required dependencies are being checked |
| `EVALUATION-PENDING` | Required evaluation remains |
| `EVALUATED` | Evaluation result exists |
| `CERTIFICATION-PENDING` | Required certification remains |
| `CERTIFIED` | Required certification is valid |
| `ALLOCATION-PENDING` | Operating scope is not yet approved |
| `ALLOCATED` | Exact scope is assigned |
| `ACTIVATION-PENDING` | Final runtime controls remain |
| `ACTIVE` | Capability may execute within approved scope |
| `LIVE-TESTED` | Controlled live test passed |
| `PRODUCTION-CONTROLLED` | Approved Production controls are active |
| `DEGRADED` | Capability remains available with restrictions |
| `RESTRICTED` | Scope or actions are reduced |
| `SUSPENDED` | New capability execution is blocked |
| `REPLACEMENT-PENDING` | Replacement is underway |
| `RETIRED` | Executable authority is removed |
| `ARCHIVED` | Historical record remains |

---

# 59. Capability Proposal

A Capability proposal must identify:

- business or operational need;
- expected outcome;
- target users;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- Risk;
- expected dependencies;
- expected cost;
- expected capacity;
- Human-review burden;
- alternative capabilities;
- retirement condition.

---

# 60. Duplication Review

Before creating a new capability:

- review existing Capability Registry entries;
- review related Capability Families;
- review Product capabilities;
- review Project capabilities;
- review reusable enterprise capabilities;
- identify overlap;
- identify composition opportunities;
- identify extension opportunities.

A duplicate capability must not be created merely under a different name.

---

# 61. Capability Design

Capability design must define:

- outcome;
- inputs;
- outputs;
- dependencies;
- execution pattern;
- review pattern;
- evidence;
- Risk;
- failure behavior;
- fallback;
- suspension;
- recovery;
- lifecycle;
- metrics.

---

# 62. Capability Review

Required review may include:

- business review;
- Product review;
- Project review;
- Architecture review;
- Agent Framework review;
- Skill review;
- Tool review;
- Model review;
- prompt review;
- memory review;
- Data review;
- Security review;
- privacy review;
- legal review;
- ethics review;
- cost review;
- capacity review;
- quality review;
- operational review;
- evidence review.

---

# 63. Capability Approval

Capability approval must identify:

- exact Capability ID;
- exact version;
- approved purpose;
- approved outcomes;
- approved dependencies;
- approved scope;
- approved Risk;
- approved environments;
- approved evaluation;
- approved certification;
- approved owner;
- conditions;
- expiry or review date;
- evidence.

Approval of a Capability Definition does not activate a Capability Instance.

---

# 64. Capability Evaluation

Evaluation must verify the exact Capability Profile and relevant runtime
configuration.

Evaluation should include:

- outcome production;
- required inputs;
- Role eligibility;
- Agent eligibility;
- Skill eligibility;
- Tool behavior;
- Model behavior;
- prompt behavior;
- memory behavior;
- workflow behavior;
- Product isolation;
- Project isolation;
- Tenant isolation;
- environment restrictions;
- authority;
- permissions;
- evidence;
- failure;
- escalation;
- suspension;
- cost;
- capacity.

---

# 65. Capability Evaluation Profile

```yaml
capability_evaluation_profile:
  evaluation_profile_id: required
  capability_id: required
  capability_version: required
  capability_profile_id: required
  capability_profile_version: required

  scenarios: required
  workload_profile: required
  expected_outputs: required
  success_criteria: required
  critical_failure_rules: required

  dependency_validation_rules: required
  isolation_tests: required
  permission_tests: required
  failure_tests: required
  escalation_tests: required
  suspension_tests: required

  minimum_sample_size: required
  scoring_method: required
  pass_threshold: required

  evaluator_requirements: required
  independent_review_required: required
  evidence_requirements: required

  validity_period: required
  re_evaluation_triggers: required
```

---

# 66. Evaluation Result States

```text
NOT-STARTED

IN-PROGRESS

PASSED

PASSED-WITH-RESTRICTIONS

CONDITIONAL-PASS

FAILED

INVALIDATED

EXPIRED

RE-EVALUATION-REQUIRED
```

---

# 67. Critical Evaluation Failures

The following should normally fail evaluation:

- unauthorized action;
- fabricated evidence;
- fabricated approval;
- cross-Project leakage;
- cross-Tenant leakage;
- Customer Data disclosure;
- secret exposure;
- ignored suspension;
- hidden failure;
- unapproved Tool use;
- unapproved Model use;
- invalid permission;
- critical output defect;
- inability to produce mandatory evidence.

---

# 68. Capability Certification

Certification may be required for:

- Production write capability;
- destructive capability;
- Security containment;
- personal or regulated Data;
- financial action;
- Customer commitment;
- legal or compliance operation;
- executive capability;
- critical infrastructure;
- high-autonomy operation.

---

# 69. Capability Certification Record

```yaml
capability_certification:
  certification_id: required

  capability_id: required
  capability_version: required
  capability_profile_id: required
  capability_profile_version: required
  capability_instance_id: required

  certified_scope: required
  product_scope: required
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment_scope: required
  region_scope: conditional
  data_scope: required
  risk_scope: required

  issued_by: required
  reviewed_by: required
  approved_by: required

  issued_at: required
  review_at: required
  expires_at: required

  restrictions: conditional
  suspension_conditions: required
  revocation_conditions: required
  evidence_references: required
  status: required
```

---

# 70. Capability Allocation

Allocation assigns an evaluated Capability Profile or Capability Instance to a
specific operating scope.

Allocation must identify:

- Capability;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- Agents;
- Teams;
- capacity;
- budget;
- authority;
- permissions;
- start;
- expiry;
- owner;
- evidence.

---

# 71. Capability Allocation Record

```yaml
capability_allocation:
  allocation_id: required

  capability_id: required
  capability_version: required
  capability_profile_id: required
  capability_profile_version: required
  capability_instance_id: conditional

  organization_id: required
  department_id: conditional
  team_id: conditional
  product_id: required
  project_id: conditional
  tenant_id: conditional
  customer_id: conditional
  environment: required
  region: conditional

  allocated_agents: required
  allocated_capacity: required
  allocated_budget: required

  authority_reference: required
  permission_reference: required
  approval_reference: required

  effective_at: required
  review_at: required
  expires_at: required

  accountable_human_owner: required
  allocation_state: required
  evidence_reference: required
```

---

# 72. Allocation Rules

An allocation must:

- reference an approved Capability Definition;
- reference an approved Capability Profile;
- remain within evaluated scope;
- remain within certified scope where required;
- use eligible Agents;
- use valid Skills;
- use approved Tools and Models;
- use approved memory;
- use approved workflows;
- remain within budget;
- remain within capacity;
- expire or be reviewed;
- remain revocable.

---

# 73. Capability Activation Readiness

A Capability Instance is activation-ready only when:

- Capability Definition is approved;
- Capability Profile is approved;
- dependencies are available;
- participating Agents are eligible;
- Skills are current;
- Tools are available;
- Models are available;
- prompts are current;
- memory is available;
- workflows are approved;
- Data is available and permitted;
- authority is valid;
- permissions are valid;
- evaluation passes;
- certification is valid where required;
- allocation is active;
- capacity is available;
- budget is available;
- monitoring is active;
- evidence capture is active;
- suspension is tested;
- approval exists.

---

# 74. Capability Activation

Activation permits a Capability Instance to accept approved work within its
allocation.

Activation must record:

```yaml
capability_activation:
  activation_id: required
  capability_instance_id: required
  allocation_id: required

  dependency_validation: required
  authority_validation: required
  permission_validation: required
  evaluation_validation: required
  certification_validation: conditional
  capacity_validation: required
  budget_validation: required
  monitoring_validation: required
  suspension_test_reference: required

  activated_by: required
  approved_by: required
  activated_at: required
  review_at: required
  expires_at: conditional
  evidence_references: required
```

---

# 75. Runtime Availability

Runtime availability must distinguish:

```text
DEFINED

APPROVED

CONFIGURED

ALLOCATED

ACTIVE

HEALTHY

AVAILABLE-FOR-ASSIGNMENT

AVAILABLE-FOR-EXECUTION

LIVE-TESTED

PRODUCTION-CONTROLLED
```

These states must not be collapsed into one `available` status.

---

# 76. Capability Availability States

```text
UNKNOWN

NOT-CONFIGURED

DEPENDENCY-BLOCKED

AVAILABLE

PARTIALLY-AVAILABLE

CONSTRAINED

DEGRADED

UNAVAILABLE

SUSPENDED

RETIRED
```

Unknown availability must not be reported as available.

---

# 77. Availability Calculation

Capability availability should consider:

```text
Eligible Agents

Required Skills

Required Tools

Required Models

Required Prompts

Required Memory

Required Workflows

Required Data

Authority

Permissions

Capacity

Budget

Human Review

Monitoring

Incident State
```

All mandatory dependencies must pass.

---

# 78. Capability Health

Capability health states may include:

```text
HEALTHY

WATCH

DEGRADED

CRITICAL

UNKNOWN

SUSPENDED
```

A capability must not be reported as healthy when critical telemetry is
missing.

---

# 79. Capability Monitoring

Monitoring should include:

- active Capability Instances;
- dependency health;
- Agent eligibility;
- Skill validity;
- Tool health;
- Model health;
- prompt version;
- memory health;
- workflow health;
- Data quality;
- permission validity;
- capacity;
- budget;
- latency;
- throughput;
- quality;
- failures;
- retries;
- evidence completeness;
- Security events;
- privacy events;
- Customer impact;
- suspension events.

---

# 80. Capability Performance Metrics

Potential capability metrics include:

- availability;
- success rate;
- verified-completion rate;
- acceptance rate;
- quality;
- defect rate;
- reliability;
- latency;
- throughput;
- cost per accepted outcome;
- capacity;
- utilization;
- evidence completeness;
- Human-review burden;
- failure-recovery success;
- suspension effectiveness;
- Customer outcome;
- business outcome.

Numerical targets require separate approval.

---

# 81. Capability Degradation

A capability is degraded when one or more mandatory dependencies or approved
performance conditions no longer meet healthy requirements.

Degradation may be caused by:

- Agent unavailability;
- Skill expiry;
- Tool outage;
- Model degradation;
- prompt defect;
- memory issue;
- Data quality issue;
- workflow failure;
- permission expiry;
- budget restriction;
- capacity saturation;
- Human-review shortage;
- incident;
- Product or Project change.

---

# 82. Capability Degradation Record

```yaml
capability_degradation:
  degradation_id: required
  capability_instance_id: required

  affected_dependencies: required
  affected_outcomes: required
  affected_scope: required

  severity: required
  detected_at: required

  temporary_restrictions: required
  remaining_safe_scope: required

  suspected_causes: required
  confirmed_causes: conditional

  remediation_owner: required
  remediation_plan: required
  due_at: required

  suspension_required: required
  evidence_references: required
  status: required
```

---

# 83. Degradation Response

```text
Degradation Detected
    ↓
Affected Capability and Scope Identified
    ↓
Dependency and Evidence Validated
    ↓
Temporary Restriction Applied
    ↓
Root Cause Investigated
    ↓
Dependency Repaired or Replaced
    ↓
Capability Re-Evaluated
    ↓
Controlled Observation
    ↓
Healthy, Restricted, Suspended, Replaced, or Retired
```

---

# 84. Capability Restriction

Restriction may reduce:

- permitted outcomes;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- environment;
- Tool actions;
- Model routes;
- memory access;
- Data classes;
- autonomy;
- Risk ceiling;
- concurrency;
- budget;
- communication;
- Production access.

---

# 85. Capability Suspension

A Capability Instance should be suspended when:

- critical dependency is compromised;
- identity is compromised;
- evaluation fails;
- certification expires;
- allocation expires;
- authority expires;
- permission becomes invalid;
- cross-Project isolation fails;
- cross-Tenant isolation fails;
- Customer Data leakage occurs;
- fabricated evidence is detected;
- critical Security control fails;
- critical privacy control fails;
- suspension cannot be enforced at dependency level;
- valid Founder or Governance instruction exists.

---

# 86. Suspension Procedure

Suspension must:

1. identify the Capability Instance;
2. identify affected allocations;
3. block new Task routing;
4. block new workflow execution;
5. stop or contain active work safely;
6. restrict participating Agents;
7. restrict Tools;
8. restrict Models;
9. restrict memory;
10. preserve Data and evidence;
11. identify affected Products and Projects;
12. identify affected Tenants and Customers;
13. notify owners;
14. create incident or review record;
15. define remediation;
16. define reactivation criteria;
17. verify suspension effectiveness.

---

# 87. Capability Reactivation

Reactivation requires:

- suspension cause resolved;
- Capability Definition still approved;
- Capability Profile still approved;
- dependencies revalidated;
- Agent eligibility revalidated;
- Skill validity confirmed;
- Tools and Models revalidated;
- memory and Data revalidated;
- authority and permissions revalidated;
- evaluation repeated where required;
- certification renewed where required;
- allocation confirmed;
- monitoring restored;
- evidence validated;
- explicit approval.

---

# 88. Capability Replacement

Replacement may be required because of:

- Capability Definition redesign;
- persistent quality failure;
- unacceptable cost;
- Tool retirement;
- Model retirement;
- prompt architecture change;
- workflow redesign;
- Security weakness;
- Product change;
- Project change;
- regulation change;
- better approved capability.

---

# 89. Replacement Process

```text
Replacement Need
    ↓
Replacement Capability Defined
    ↓
Dependencies Reviewed
    ↓
Evaluation
    ↓
Approval
    ↓
Restricted Parallel Operation
    ↓
Outcome Comparison
    ↓
Controlled Handoff
    ↓
Old Capability Restriction
    ↓
New Capability Activation
    ↓
Old Capability Retirement
```

---

# 90. Capability Deprecation

A Capability Definition may be deprecated when:

- no new allocations should be created;
- a replacement exists;
- dependencies are obsolete;
- Product strategy changes;
- Security Risk becomes unacceptable;
- cost becomes unjustified;
- regulation changes;
- outcome is no longer required.

Deprecation must define:

- replacement;
- affected profiles;
- affected instances;
- affected Products;
- affected Projects;
- migration deadline;
- exceptions;
- retirement date.

---

# 91. Capability Retirement

Retirement must include:

- blocking new allocations;
- blocking new activations;
- completing or transferring open work;
- closing Capability Instances;
- removing routing;
- revoking permissions;
- revoking Tool and Model access where exclusive;
- removing memory access;
- closing workflows;
- preserving evidence;
- preserving audit;
- updating Registry status;
- verifying no executable authority remains.

---

# 92. Capability Archival

Archived Capability records should preserve:

- Capability Definitions;
- Capability Profiles;
- Capability Instances;
- versions;
- owners;
- approvals;
- dependencies;
- evaluations;
- certifications;
- allocations;
- incidents;
- performance;
- retirement evidence.

Archived capabilities must not remain executable.

---

# 93. Capability Versioning

Semantic versioning should be used:

```text
MAJOR.MINOR.PATCH
```

## Major

Used for incompatible changes such as:

- changed outcome;
- changed authority;
- increased Risk;
- new Production action;
- new Customer action;
- changed Data class;
- changed dependency architecture.

## Minor

Used for backward-compatible additions.

## Patch

Used for non-material corrections and clarifications.

---

# 94. Material Change Triggers

Re-evaluation may be required after changes to:

- Capability Definition;
- Capability Profile;
- Agent Definition;
- Skill;
- Tool;
- Model;
- prompt;
- memory;
- workflow;
- Data;
- Knowledge;
- authority;
- permission;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- Risk;
- budget;
- capacity.

---

# 95. Capability Registry

The future Capability Registry should be authoritative for:

- Capability identity;
- Capability version;
- Capability Definition;
- Capability category;
- Capability owner;
- lifecycle state;
- approval state;
- dependency requirements;
- evaluation requirements;
- certification requirements;
- permitted scope;
- Risk;
- review date;
- deprecation;
- retirement.

---

# 96. Capability Registry Boundary

The Capability Registry should not replace:

- Role Registry;
- Agent Registry;
- Skill Registry;
- Tool Registry;
- Model Registry;
- Prompt Registry;
- Memory Registry;
- Workflow Registry;
- permission system;
- allocation system;
- evidence store;
- audit system;
- cost ledger;
- monitoring system.

---

# 97. Capability Registry Source-of-Truth Rules

The Registry must be the source of truth for:

```text
What the capability is

Which version is current

Who owns it

Which dependencies are mandatory

Which scope is permitted

Which Risk applies

Which lifecycle state applies
```

Runtime systems remain authoritative for:

- active state;
- dependency health;
- live availability;
- execution;
- performance;
- incidents;
- suspension.

---

# 98. Capability Discovery

Capability discovery should support search by:

- capability name;
- Capability ID;
- category;
- family;
- owner;
- Product;
- Project;
- Tenant eligibility;
- environment;
- Role;
- Skill;
- Tool;
- Model;
- workflow;
- Risk;
- lifecycle state;
- availability state.

---

# 99. Capability Eligibility

An Agent or Team is capability-eligible only when:

- Role requirements pass;
- Agent type requirements pass;
- Skill requirements pass;
- lifecycle requirements pass;
- allocation requirements pass;
- Tool requirements pass;
- Model requirements pass;
- prompt requirements pass;
- memory requirements pass;
- Product and Project scope match;
- Tenant and Customer scope match;
- environment matches;
- Risk ceiling is sufficient;
- Human review is available;
- no conflict exists.

---

# 100. Capability Routing

A future Capability Routing Engine should select eligible performers according
to:

- required capability;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- Risk;
- available Agents;
- Skill proficiency;
- Tool and Model compatibility;
- capacity;
- cost;
- quality;
- reliability;
- Human-review availability;
- separation of duties.

---

# 101. Routing Boundary

Capability routing must not:

- create authority;
- grant permissions;
- activate suspended Agents;
- use expired Skills;
- use unapproved Tools;
- use unapproved Models;
- cross Project boundaries;
- cross Tenant boundaries;
- exceed budget;
- bypass approval;
- hide routing failure.

---

# 102. Capability Request

```yaml
capability_request:
  request_id: required
  requested_capability_id: required
  requested_capability_version: conditional

  objective: required
  expected_outputs: required
  acceptance_criteria: required

  organization_id: required
  product_id: required
  project_id: conditional
  tenant_id: conditional
  customer_id: conditional
  environment: required
  region: conditional
  data_classification: required

  maximum_risk_class: required
  required_completion_at: conditional
  budget_limit: required
  capacity_requirement: required

  requester_identity: required
  requester_authority: required
  approval_reference: conditional

  requested_at: required
  expires_at: conditional
  request_state: required
```

---

# 103. Capability Match Result

```yaml
capability_match:
  match_id: required
  request_id: required

  capability_id: required
  capability_version: required
  capability_profile_id: required
  capability_instance_id: conditional

  eligible_agents: required
  dependency_status: required
  capacity_status: required
  budget_status: required
  risk_status: required

  scope_match: required
  environment_match: required
  data_match: required

  restrictions: conditional
  missing_dependencies: conditional
  human_review_required: required

  match_result: ELIGIBLE | CONDITIONALLY-ELIGIBLE | INELIGIBLE
  evaluated_at: required
  evidence_reference: required
```

---

# 104. Capability Evidence

Every material capability lifecycle or execution event should produce or
reference evidence.

Evidence may include:

- Registry Entry;
- Definition approval;
- Profile approval;
- dependency records;
- Agent eligibility;
- Skill evidence;
- Tool execution records;
- Model-use records;
- prompt version;
- memory events;
- workflow events;
- Data references;
- authority;
- permissions;
- evaluation;
- certification;
- allocation;
- activation;
- monitoring;
- outputs;
- tests;
- review;
- acceptance;
- incidents;
- suspension;
- retirement.

---

# 105. Capability Evidence Record

```yaml
capability_evidence:
  evidence_id: required

  capability_id: required
  capability_version: required
  capability_profile_id: conditional
  capability_instance_id: conditional

  event_type: required
  event_reference: required

  organization_id: required
  product_id: required
  project_id: conditional
  tenant_id: conditional
  customer_id: conditional
  environment: required

  participating_agents: conditional
  dependency_references: required
  authority_reference: required
  permission_reference: required
  approval_reference: conditional

  artifact_references: conditional
  test_references: conditional
  review_references: conditional
  acceptance_reference: conditional

  status: required
  limitations: required
  residual_risks: required

  accountable_owner: required
  reviewed_by: required
  created_at: required
  finalized_at: conditional
  evidence_reference: required
```

---

# 106. Capability Evidence Quality

```text
CAPE-0 — No Evidence

CAPE-1 — Capability Claim

CAPE-2 — Human-Reviewed Capability Record

CAPE-3 — System-Generated Configuration or Execution Record

CAPE-4 — Controlled Capability Evaluation Evidence

CAPE-5 — Runtime Operational Capability Evidence

CAPE-6 — Independent or Audited Capability Evidence
```

Production capability claims require runtime evidence.

---

# 107. Capability Audit

A Capability Registry audit should verify:

- unique Capability IDs;
- current versions;
- owners;
- lifecycle states;
- approval states;
- Product and Project scope;
- Tenant and Customer scope;
- environment scope;
- Risk;
- dependencies;
- evaluation;
- certification;
- allocations;
- active instances;
- evidence;
- monitoring;
- incidents;
- suspensions;
- deprecated capabilities;
- retired capabilities;
- unsupported implementation claims;
- duplicate capabilities.

---

# 108. Capability Reporting

Capability reporting should distinguish:

```text
Defined Capabilities

Approved Capabilities

Available Capabilities

Configured Capability Profiles

Allocated Capability Profiles

Active Capability Instances

Live-Tested Capability Instances

Production-Controlled Capability Instances

Degraded Capabilities

Suspended Capabilities

Deprecated Capabilities

Retired Capabilities
```

One undefined `Total Capabilities` number is insufficient.

---

# 109. Capability Metrics

Potential metrics include:

| Metric | Definition |
|---|---|
| Registry Completeness | Complete Capability Definitions / registered Capability Definitions |
| Dependency Compliance | Capability Profiles with valid dependencies / reviewed profiles |
| Evaluation Currency | Unexpired evaluations / evaluated capability profiles |
| Certification Coverage | Valid certifications / required certifications |
| Allocation Validity | Valid capability allocations / active allocations |
| Runtime Availability | Available Capability Instances / active Capability Instances |
| Capability Success Rate | Successful capability executions / completed capability executions |
| Capability Acceptance Rate | Accepted capability outcomes / reviewed outcomes |
| Evidence Completeness | Capability events with complete evidence / material events |
| Cost Per Accepted Outcome | Total attributable capability cost / accepted outcomes |
| Degradation Rate | Degraded capability periods / monitored periods |
| Suspension Effectiveness | Successfully blocked capability execution / suspension tests or events |
| Cross-Project Violation Rate | Unauthorized cross-Project capability events |
| Cross-Tenant Violation Rate | Unauthorized cross-Tenant capability events |
| Retirement Completeness | Retired capabilities with all execution paths removed / retired capabilities |

Numerical targets require separate approval.

---

# 110. One-Agent Capability Proof

The first capability proof should include:

```text
1 Approved Capability Definition

1 Approved Capability Profile

1 Approved Agent Definition

1 Runtime Agent Instance

1 Approved Role

1 Valid Skill

1 Low-Risk Capability

1 Non-Production Tool or No Tool

1 Approved Model Profile

1 Prompt Profile

1 Product

1 Project

1 Non-Production Environment

1 Evaluation

1 Allocation

1 Activation

1 Controlled Execution

1 Human Review

1 Verifiable-Work Envelope

1 Suspension Test

1 Retirement Test
```

---

# 111. Team Capability Proof

A Team capability proof should verify:

- Team identity;
- Team owner;
- member Roles;
- member Agents;
- distributed Skills;
- Tool coordination;
- Model coordination;
- Team memory;
- workflow;
- handoffs;
- separation of duties;
- Team evidence;
- Team suspension.

---

# 112. Composite Capability Proof

A composite proof should verify:

- mandatory child capabilities;
- dependency order;
- parallel steps;
- child-level evidence;
- child-level failures;
- aggregate result;
- failure propagation;
- rollback or compensation;
- Human acceptance.

---

# 113. Multi-Project Capability Proof

A Multi-Project proof should verify:

- separate allocations;
- separate Capability Instances where required;
- separate Project memory;
- separate Project Tools;
- separate Project evidence;
- separate Project cost;
- denied cross-Project use;
- Project closure;
- access removal.

---

# 114. Multi-Tenant Capability Proof

A Multi-Tenant proof should verify:

- Tenant-scoped capability requests;
- Tenant-scoped permissions;
- Tenant-scoped Agents where required;
- Tenant-scoped memory;
- Tenant-scoped Tools;
- Tenant-scoped Data;
- Tenant-scoped evidence;
- Tenant cost attribution;
- denied cross-Tenant use;
- Tenant offboarding.

---

# 115. Customer Capability Proof

A Customer Capability proof should verify:

- approved Customer scope;
- approved Product;
- approved Project;
- approved Tenant;
- Customer Data restrictions;
- Human owner;
- communication authority;
- acceptance criteria;
- Customer evidence;
- suspension;
- closure.

---

# 116. Production Capability Gate

Before a Capability Instance reaches `PRODUCTION-CONTROLLED`:

- [ ] Capability Definition is approved.
- [ ] Capability Profile is approved.
- [ ] Capability Instance is registered.
- [ ] Product scope is exact.
- [ ] Project scope is exact.
- [ ] Tenant scope is exact.
- [ ] Customer scope is exact.
- [ ] environment is Production-specific.
- [ ] region is approved.
- [ ] participating Agents are Production-controlled.
- [ ] required Roles are active.
- [ ] required Skills are current.
- [ ] required Tools are approved.
- [ ] required Models are approved.
- [ ] required prompts are current.
- [ ] required memory is approved.
- [ ] required workflows are approved.
- [ ] required Data use is approved.
- [ ] authority is valid.
- [ ] permissions are valid.
- [ ] evaluation is current.
- [ ] certification is current where required.
- [ ] allocation is valid.
- [ ] capacity is available.
- [ ] budget is approved.
- [ ] Human-review capacity is available.
- [ ] monitoring is active.
- [ ] audit is active.
- [ ] evidence capture is active.
- [ ] failure handling is tested.
- [ ] fallback is tested.
- [ ] suspension is tested.
- [ ] recovery is tested.
- [ ] incident response is ready.
- [ ] explicit Human Production approval exists.
- [ ] Founder approval exists where required.

---

# 117. Production Observation Window

A newly promoted capability should operate under a bounded observation window.

The window should define:

- duration;
- capability scope;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- workload;
- concurrency;
- cost;
- Human review;
- quality thresholds;
- safety thresholds;
- evidence thresholds;
- suspension conditions;
- expansion criteria.

---

# 118. Capability Hard Stops

The following should normally block or suspend capability operation:

- fabricated evidence;
- fabricated Human approval;
- unauthorized Tool action;
- unapproved Model use;
- cross-Project leakage;
- cross-Tenant leakage;
- Customer Data disclosure;
- secret exposure;
- ignored suspension;
- expired critical certification;
- invalid permission;
- critical Security failure;
- critical privacy failure;
- destructive action without approval;
- Production action without Production authority.

---

# 119. Capability Exceptions

A capability exception must define:

- exception ID;
- Capability ID;
- Capability Profile;
- Capability Instance;
- normal control being bypassed;
- exact reason;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- Risk;
- compensating controls;
- owner;
- approver;
- start;
- expiry;
- monitoring;
- closure condition;
- evidence.

Exceptions must not permit:

- fabricated evidence;
- self-approval;
- constitutional bypass;
- unrestricted Production access;
- permanent emergency authority;
- cross-Tenant leakage.

---

# 120. Capability Conflicts

Capability conflicts may include:

- duplicate outcome;
- Role conflict;
- Skill conflict;
- Tool conflict;
- Model conflict;
- Data conflict;
- Product conflict;
- Project conflict;
- Tenant conflict;
- authority conflict;
- separation-of-duties conflict;
- cost conflict;
- capacity conflict.

---

# 121. Capability Conflict Record

```yaml
capability_conflict:
  conflict_id: required

  capability_ids: required
  capability_profile_ids: conditional
  capability_instance_ids: conditional

  conflict_type: required
  affected_scope: required
  affected_products: required
  affected_projects: conditional
  affected_tenants: conditional

  description: required
  risk_class: required
  temporary_controls: required

  decision_owner: required
  escalation_path: required

  raised_at: required
  resolved_at: conditional
  resolution_reference: conditional
  evidence_references: required
  status: required
```

---

# 122. Capability Conflict Resolution

```text
Conflict Detected
    ↓
Affected Capability Use Restricted
    ↓
Definitions and Authorities Compared
    ↓
Dependencies and Risks Reviewed
    ↓
Options Prepared
    ↓
Authorized Human Decision
    ↓
Capability Revised, Merged, Restricted, Replaced, or Retired
    ↓
Registry Updated
    ↓
Evidence Preserved
```

---

# 123. Capability Merge

Capabilities may be merged when:

- outcomes materially overlap;
- dependencies substantially overlap;
- one definition can safely represent both;
- owners agree;
- scope remains clear;
- Risk remains controlled.

A merge must preserve:

- previous IDs;
- previous versions;
- affected Profiles;
- affected Instances;
- migration;
- audit;
- Changelog.

---

# 124. Capability Split

A capability should be split when:

- outcomes are too broad;
- Risk differs materially;
- environments differ materially;
- Product or Tenant scopes conflict;
- evaluation cannot remain meaningful;
- ownership is unclear;
- dependencies are independently reusable.

---

# 125. Capability Portability

A capability may be portable across Products or Projects only when:

- outcome remains equivalent;
- dependencies remain compatible;
- Data rules remain compatible;
- Tool and Model rules remain compatible;
- Risk remains equal or lower;
- evaluation confirms portability;
- approval exists.

---

# 126. Non-Portable Capabilities

A capability may be non-portable because of:

- Product-specific architecture;
- Project-specific integration;
- Tenant-specific Data;
- Customer-specific process;
- regional law;
- proprietary Tooling;
- regulated workflow;
- environment-specific Risk;
- Customer contract.

---

# 127. Capability Anti-Gaming Controls

Capability systems must prevent:

- defining vague capabilities to claim broad coverage;
- counting planned capability as active capability;
- counting one successful Task as capability proof;
- hiding mandatory child-capability failure;
- excluding failed executions;
- reporting simulated capability as runtime capability;
- transferring cost to another Product;
- hiding Human contribution;
- changing Capability Definition after evaluation without re-evaluation;
- using one Capability Instance across unrelated Tenants without isolation.

---

# 128. Capability Risks

| Risk | Required Response |
|---|---|
| Capability name treated as implementation | Require runtime evidence |
| Skill treated as capability | Validate complete dependency system |
| Tool treated as capability | Require Role, Skill, workflow, authority, and evidence |
| Model treated as capability | Evaluate full Capability Profile |
| Prompt treated as capability | Require runtime dependency validation |
| Capability Definition treated as active instance | Separate lifecycle states |
| Duplicate capability | Perform duplication review |
| Capability too broad | Split into bounded capabilities |
| Cross-Project capability leakage | Use Project-scoped allocations |
| Cross-Tenant capability leakage | Use Tenant-scoped instances |
| Dependency drift | Revalidate and re-evaluate |
| Expired certification | Restrict or suspend |
| Capacity overstatement | Require measured available capacity |
| Human review omitted | Block high-risk activation |
| Cost under-attributed | Include full dependency cost |
| Composite capability hides failure | Preserve child-level status |
| Production capability without proof | Enforce Production gate |
| Retired capability remains routable | Remove routing and authority |

---

# 129. Capability Anti-Patterns

Mianx.ai must avoid:

- one universal capability named `do everything`;
- creating capabilities from Department names only;
- treating Agent titles as capabilities;
- treating available Models as active capabilities;
- treating Tool connectors as active capabilities;
- treating documentation completeness as implementation;
- allowing capability scope without Product or Project identity;
- using one Capability Instance for unrelated Tenants;
- allowing Agents to self-approve capabilities;
- activating capabilities without evaluation;
- retaining expired allocations;
- hiding dependency failures;
- averaging critical failures into healthy status;
- retiring capabilities without removing routing;
- claiming Production readiness from a single test.

---

# 130. Prohibited Capability Behaviors

An Agent must not:

- create its own approved Capability Definition;
- add itself to a Capability Profile;
- assign itself a capability;
- increase its own capability Risk ceiling;
- expand Product scope;
- expand Project scope;
- expand Tenant scope;
- expand Customer scope;
- change environment scope;
- add unapproved Tools;
- add unapproved Models;
- add unapproved memory access;
- change capability permissions;
- approve its own evaluation;
- certify itself;
- activate itself;
- promote itself to Production;
- hide dependency failure;
- fabricate capability evidence;
- continue capability execution after suspension;
- retain capability authority after retirement.

---

# 131. Current Verified Baseline

At the time this document is created:

```yaml
documentation:
  capability_registry_document:
    id: AIW-REG-CAPABILITY-001
    version: 1.0.0
    status: Draft
    canonical: false

target_state:
  capability_definition_model: defined
  capability_profile_model: defined
  capability_instance_model: defined
  capability_package_model: defined
  capability_categories: 19
  capability_lifecycle: defined
  dependency_model: defined
  evaluation_model: defined
  allocation_and_activation_model: defined
  production_capability_gate: defined

implementation:
  capability_registry: not_implemented
  capability_policy_engine: not_implemented
  capability_routing_engine: not_implemented
  capability_evaluation_engine: not_implemented
  runtime_dependency_validation: not_verified
  runtime_availability_calculation: not_verified
  automated_capability_suspension: not_verified

runtime:
  approved_capability_definitions: 0_proven
  approved_capability_profiles: 0_proven
  active_capability_instances: 0_proven
  live_tested_capability_instances: 0_proven
  production_controlled_capability_instances: 0_proven
```

---

# 132. Current-State Boundary

This document does not prove that Mianx.ai currently has:

- an implemented Capability Registry;
- an implemented Capability Policy Engine;
- an implemented Capability Routing Engine;
- approved Capability Definitions;
- approved Capability Profiles;
- registered Capability Instances;
- runtime dependency validation;
- runtime capability routing;
- runtime capability availability calculation;
- active Product capabilities;
- active Project capabilities;
- active Tenant capabilities;
- active Customer capabilities;
- live-tested capabilities;
- Production-controlled capabilities;
- automated capability restriction;
- automated capability suspension.

This document defines target-state Capability Governance only.

---

# 133. Adoption Requirements

This document may become Active only when:

- [ ] Founder approval is recorded.
- [ ] exact approved version is recorded.
- [ ] Workforce Vision alignment is confirmed.
- [ ] Workforce Strategy alignment is confirmed.
- [ ] Operating Model alignment is confirmed.
- [ ] Workforce Architecture alignment is confirmed.
- [ ] Workforce Governance alignment is confirmed.
- [ ] Workforce Security alignment is confirmed.
- [ ] Workforce Capability Framework alignment is confirmed.
- [ ] Workforce Lifecycle alignment is confirmed.
- [ ] Workforce Metrics alignment is confirmed.
- [ ] Workforce Checklists alignment is confirmed.
- [ ] Capacity Baseline alignment is confirmed.
- [ ] C-Suite Registry alignment is confirmed.
- [ ] Verifiable-Work Envelope alignment is confirmed.
- [ ] Agent Types alignment is confirmed.
- [ ] Agent Lifecycle alignment is confirmed.
- [ ] Agent Skills alignment is confirmed.
- [ ] Agent Tools alignment is confirmed.
- [ ] Agent Memory alignment is confirmed.
- [ ] Agent Collaboration alignment is confirmed.
- [ ] Agent Performance alignment is confirmed.
- [ ] Capability Definition schema is approved.
- [ ] Capability Profile schema is approved.
- [ ] Capability Instance schema is approved.
- [ ] Capability Package schema is approved.
- [ ] Capability ID standard is approved.
- [ ] capability categories are approved.
- [ ] capability families are approved.
- [ ] atomic and composite capability rules are approved.
- [ ] ownership model is approved.
- [ ] Role dependency model is approved.
- [ ] Agent dependency model is approved.
- [ ] Skill dependency model is approved.
- [ ] Tool dependency model is approved.
- [ ] Model dependency model is approved.
- [ ] prompt dependency model is approved.
- [ ] memory dependency model is approved.
- [ ] workflow and orchestration dependencies are approved.
- [ ] Data and Knowledge dependencies are approved.
- [ ] authority and permission dependencies are approved.
- [ ] evidence dependencies are approved.
- [ ] Human-review dependencies are approved.
- [ ] cost and capacity dependencies are approved.
- [ ] Risk model is approved.
- [ ] Capability Definition lifecycle is approved.
- [ ] Capability Instance lifecycle is approved.
- [ ] proposal and duplication review are approved.
- [ ] design and review processes are approved.
- [ ] capability approval process is approved.
- [ ] evaluation process is approved.
- [ ] certification process is approved.
- [ ] allocation process is approved.
- [ ] activation process is approved.
- [ ] runtime availability states are approved.
- [ ] health and monitoring model is approved.
- [ ] degradation and restriction are approved.
- [ ] suspension and reactivation are approved.
- [ ] replacement, deprecation, retirement, and archival are approved.
- [ ] versioning and material-change rules are approved.
- [ ] Registry source-of-truth boundaries are approved.
- [ ] capability discovery and eligibility are approved.
- [ ] capability routing model is approved.
- [ ] Capability Request schema is approved.
- [ ] Capability Match schema is approved.
- [ ] evidence model is approved.
- [ ] audit and reporting are approved.
- [ ] exception controls are approved.
- [ ] conflict, merge, and split controls are approved.
- [ ] portability rules are approved.
- [ ] Capability Registry is implemented.
- [ ] Capability Policy Engine is implemented.
- [ ] Capability Routing Engine is implemented.
- [ ] Capability Evaluation Engine is implemented.
- [ ] runtime dependency validation is implemented.
- [ ] runtime availability calculation is implemented.
- [ ] suspension is technically enforced.
- [ ] one-Agent capability proof passes.
- [ ] Team capability proof passes.
- [ ] composite capability proof passes.
- [ ] Multi-Project capability proof passes.
- [ ] Multi-Tenant capability proof passes where applicable.
- [ ] Customer capability proof passes.
- [ ] Production capability proof passes.
- [ ] `INDEX.md` is updated.
- [ ] `ROADMAP.md` is updated.
- [ ] `CHANGELOG.md` is updated.

---

# 134. Review Questions

Reviewers should answer:

1. Is a Capability Definition separated from a Capability Profile?
2. Is a Capability Profile separated from a Capability Instance?
3. Is a Capability Instance separated from allocation and activation?
4. Are Skills separated from capabilities?
5. Are Tools separated from capabilities?
6. Are Models separated from capabilities?
7. Are prompts separated from capabilities?
8. Are workflows separated from capabilities?
9. Are capability outcomes sufficiently bounded?
10. Are Capability IDs and versions explicit?
11. Are capability categories complete?
12. Are atomic and composite capabilities separated?
13. Are mandatory child capabilities visible?
14. Is ownership explicit?
15. Are Role and Agent dependencies explicit?
16. Are Skill requirements measurable?
17. Are Tool and Model dependencies versioned?
18. Are prompt and memory dependencies governed?
19. Are Data and Knowledge dependencies controlled?
20. Are authority and permission dependencies separated?
21. Are Product and Project scopes explicit?
22. Are Tenant and Customer scopes explicit?
23. Are environment and regional scopes explicit?
24. Is capability Risk calculated from complete impact?
25. Is the Capability Definition lifecycle complete?
26. Is the Capability Instance lifecycle complete?
27. Can a capability skip evaluation?
28. Can a Capability Definition approval activate runtime execution?
29. Are certifications time-bounded?
30. Are allocations explicit and expiring?
31. Are activation requirements complete?
32. Are runtime availability states sufficiently distinct?
33. Is unknown availability prevented from appearing healthy?
34. Are degradation and restriction controlled?
35. Can capability execution be suspended immediately?
36. Does reactivation require revalidation?
37. Does replacement preserve evidence and ownership?
38. Does retirement remove routing and authority?
39. Are Registry boundaries clear?
40. Can routing expand authority?
41. Are Capability Requests scope-aware?
42. Is capability matching evidence-based?
43. Are Production gates complete?
44. Are capability exceptions time-bounded?
45. Are duplicate capability controls sufficient?
46. Are portability rules sufficiently strict?
47. Are current-state limitations explicit?
48. Are any runtime capability claims unsupported?

---

# 135. Definition of Done

This document is content-complete for review when:

- [ ] purpose is defined;
- [ ] current authority status is explicit;
- [ ] exact strategic hierarchy is included;
- [ ] Capability Registry objective is defined;
- [ ] capability principles are defined;
- [ ] non-equivalence rule is defined;
- [ ] Capability Definition is defined;
- [ ] Capability Profile is defined;
- [ ] Capability Instance is defined;
- [ ] Capability Package is defined;
- [ ] Registry Entry is defined;
- [ ] entity model is defined;
- [ ] ID standards are defined;
- [ ] identity rules are defined;
- [ ] Definition Record is defined;
- [ ] Profile Record is defined;
- [ ] Instance Record is defined;
- [ ] Package Record is defined;
- [ ] capability categories are defined;
- [ ] capability families are defined;
- [ ] atomic capabilities are defined;
- [ ] composite capabilities are defined;
- [ ] enterprise capabilities are defined;
- [ ] Product capabilities are defined;
- [ ] Project capabilities are defined;
- [ ] Tenant capabilities are defined;
- [ ] Customer capabilities are defined;
- [ ] environment and regional capabilities are defined;
- [ ] ownership is defined;
- [ ] Role dependencies are defined;
- [ ] Agent dependencies are defined;
- [ ] Skill dependencies are defined;
- [ ] Tool dependencies are defined;
- [ ] Model dependencies are defined;
- [ ] prompt dependencies are defined;
- [ ] memory dependencies are defined;
- [ ] workflow and orchestration dependencies are defined;
- [ ] Data and Knowledge dependencies are defined;
- [ ] authority and permission dependencies are defined;
- [ ] evidence dependencies are defined;
- [ ] Human-review dependencies are defined;
- [ ] cost and capacity dependencies are defined;
- [ ] dependency graph is defined;
- [ ] dependency states are defined;
- [ ] compatibility is defined;
- [ ] Risk classification is defined;
- [ ] Definition lifecycle is defined;
- [ ] Instance lifecycle is defined;
- [ ] proposal is defined;
- [ ] duplication review is defined;
- [ ] design is defined;
- [ ] review is defined;
- [ ] approval is defined;
- [ ] evaluation is defined;
- [ ] Evaluation Profile is defined;
- [ ] critical failures are defined;
- [ ] certification is defined;
- [ ] allocation is defined;
- [ ] Allocation Record is defined;
- [ ] allocation rules are defined;
- [ ] activation readiness is defined;
- [ ] activation is defined;
- [ ] runtime availability is defined;
- [ ] availability states are defined;
- [ ] health is defined;
- [ ] monitoring is defined;
- [ ] metrics are defined;
- [ ] degradation is defined;
- [ ] restriction is defined;
- [ ] suspension is defined;
- [ ] reactivation is defined;
- [ ] replacement is defined;
- [ ] deprecation is defined;
- [ ] retirement is defined;
- [ ] archival is defined;
- [ ] versioning is defined;
- [ ] material-change triggers are defined;
- [ ] Capability Registry authority is defined;
- [ ] Registry boundaries are defined;
- [ ] discovery is defined;
- [ ] eligibility is defined;
- [ ] routing is defined;
- [ ] Capability Request is defined;
- [ ] Capability Match is defined;
- [ ] evidence is defined;
- [ ] Evidence Record is defined;
- [ ] evidence quality is defined;
- [ ] audit is defined;
- [ ] reporting is defined;
- [ ] one-Agent proof is defined;
- [ ] Team proof is defined;
- [ ] composite proof is defined;
- [ ] Multi-Project proof is defined;
- [ ] Multi-Tenant proof is defined;
- [ ] Customer proof is defined;
- [ ] Production gate is defined;
- [ ] observation window is defined;
- [ ] hard stops are defined;
- [ ] exceptions are defined;
- [ ] conflicts are defined;
- [ ] merge and split are defined;
- [ ] portability is defined;
- [ ] anti-gaming controls are defined;
- [ ] risks are defined;
- [ ] anti-patterns are defined;
- [ ] prohibited behaviors are defined;
- [ ] current verified baseline is defined;
- [ ] current-state boundary is explicit;
- [ ] adoption requirements are defined;
- [ ] next document is identified.

This document becomes Active only after required review, implementation,
evaluation, testing, runtime validation, and approval.

---

# 136. Current Documentation Progress

After this document is saved:

```text
Total Planned AI Workforce Documents = 83

Content Complete for Review = 25

Existing Drafts Needing Alignment Review = 0

Empty Placeholders Remaining = 58

Approved Documents = 0

Active Canonical Documents = 0

Agents Folder Documents Completed = 7 of 7

Capabilities Folder Documents Completed = 1 of 4

Capability Registry Implemented = NO

Approved Capability Definitions = 0 Proven

Approved Capability Profiles = 0 Proven

Active Capability Instances = 0 Proven

Live-Tested Capability Instances = 0 Proven

Production-Controlled Capability Instances = 0 Proven

Production Capability Operation Authorized = NO
```

---

# 137. Current Document Decision

```text
DOCUMENT_ID=AIW-REG-CAPABILITY-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TARGET_STATE_CAPABILITY_REGISTRY=DEFINED

CAPABILITY_REGISTRY_IMPLEMENTATION=NOT_IMPLEMENTED

CAPABILITY_POLICY_ENGINE=NOT_IMPLEMENTED

CAPABILITY_ROUTING_ENGINE=NOT_IMPLEMENTED

CAPABILITY_EVALUATION_ENGINE=NOT_IMPLEMENTED

RUNTIME_CAPABILITY_ENFORCEMENT=NOT_VERIFIED

APPROVED_CAPABILITY_DEFINITIONS=0_PROVEN

ACTIVE_CAPABILITY_INSTANCES=0_PROVEN

PRODUCTION_CAPABILITIES=0_PROVEN

RUNTIME_AGENT_ACTIVATION=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

---

# 138. Revision History

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1.0 | 2026-08-06 | Draft | Initial Capability Registry outline |
| 1.0.0 | 2026-08-06 | Draft | Defined Capability Definitions, Profiles, Instances, Packages, Registry Entries, identity, categories, ownership, dependencies, scope, Risk, lifecycle, evaluation, certification, allocation, activation, availability, monitoring, degradation, suspension, replacement, deprecation, retirement, routing, evidence, audit, proof requirements, Production gates, risks, prohibited behavior, and current-state boundaries |

---

# 139. Changelog Entry

Append the following entry to:

```text
doc/19-ai-workforce/CHANGELOG.md
```

```markdown
## AIW-CHG-20260806-025 — AI Workforce Capability Registry Completed

| Field | Value |
|---|---|
| Date | 2026-08-06 |
| Change Type | `CREATED`, `STATUS`, `GOVERNANCE`, `CAPABILITY`, `REGISTRY` |
| Impact | `I4 — Critical` |
| Risk | `R4` |
| Status | Completed for Review |
| Owner | AI Workforce Council |
| Steward | Capability Governance and AI Workforce Operations |
| Approver | Pending Founder and Enterprise Governance Review |

### Affected Documents

- `doc/19-ai-workforce/capabilities/capability-registry.md`
- `doc/19-ai-workforce/INDEX.md`
- `doc/19-ai-workforce/ROADMAP.md`
- `doc/19-ai-workforce/CHANGELOG.md`

### Previous State

`capability-registry.md` existed as an empty placeholder.

The AI Workforce documentation defined the Workforce foundation and the seven
Agent-level documents but lacked a dedicated governed Registry separating
Capability Definitions, Capability Profiles, Capability Packages, runtime
Capability Instances, allocations, activation, and Production availability.

### New State

The document now defines:

- the difference between Roles, Skills, Tools, Models, prompts, memory,
  workflows, Capability Definitions, Capability Profiles, Capability Packages,
  Capability Instances, allocations, activation, runtime availability, and
  Production capability;
- Capability Definition, Profile, Instance, Package, evaluation,
  certification, allocation, activation, request, match, conflict, degradation,
  and evidence schemas;
- Capability identity and versioning;
- nineteen capability categories;
- capability families, atomic capabilities, and composite capabilities;
- enterprise, Product, Project, Tenant, Customer, environment, and regional
  capability scopes;
- capability ownership and stewardship;
- Role, Agent, Skill, Tool, Model, prompt, memory, workflow, orchestration,
  Data, Knowledge, authority, permission, evidence, Human-review, cost, and
  capacity dependencies;
- dependency states, compatibility, and dependency graphs;
- capability Risk classification;
- separate Capability Definition and runtime Capability Instance lifecycles;
- proposal, duplication review, design, review, and approval;
- capability evaluation and certification;
- allocation and activation;
- runtime availability and health;
- monitoring, metrics, degradation, restriction, suspension, reactivation,
  replacement, deprecation, retirement, and archival;
- Registry source-of-truth boundaries;
- capability discovery, eligibility, requests, matching, and target-state
  routing;
- evidence, audit, and reporting;
- one-Agent, Team, composite, Multi-Project, Multi-Tenant, Customer, and
  Production capability proof requirements;
- Production gates, observation windows, hard stops, exceptions, conflicts,
  merge, split, and portability;
- anti-gaming controls, risks, anti-patterns, prohibited behavior, and
  current-state boundaries.

### Preserved Truth

```text
Skill
≠
Capability

Tool
≠
Capability

Model
≠
Capability

Prompt
≠
Capability

Capability Definition
≠
Capability Instance

Capability Allocation
≠
Capability Activation

Capability Activation
≠
Production Capability
```

### Limitations

- Founder approval is pending.
- Canonical status remains false.
- Capability Registry is not implemented.
- Capability Policy Engine is not implemented.
- Capability Routing Engine is not implemented.
- Capability Evaluation Engine is not implemented.
- runtime dependency validation is not verified.
- approved Capability Definitions proven by documentation remain zero.
- active Capability Instances proven by documentation remain zero.
- Production-controlled Capability Instances remain zero.

### Follow-Up

- complete `doc/19-ai-workforce/capabilities/skill-registry.md`;
- use document ID `AIW-REG-SKILL-001`;
- define the authoritative target-state Registry for Workforce Skill
  Definitions and Agent Skill assignments;
- align the Registry with `agents/agent-skills.md`;
- separate Skill Definitions, Skill Profiles, Skill assignments, proficiency
  decisions, evaluations, certifications, lifecycle states, and runtime Skill
  eligibility;
- define Skill ownership, categories, levels, dependencies, scope, evidence,
  expiry, renewal, restriction, revocation, retirement, and Production gates;
- update the INDEX and Roadmap after completion.
```

---

# 140. Capabilities Folder Status

After saving this document:

```text
capabilities/
├── capability-registry.md  CONTENT_COMPLETE_FOR_REVIEW
├── model-registry.md       EMPTY_PLACEHOLDER
├── skill-registry.md       EMPTY_PLACEHOLDER
└── tool-registry.md        EMPTY_PLACEHOLDER
```

Folder-level status:

```text
CAPABILITIES_FOLDER_DOCUMENTS=4

CONTENT_COMPLETE_FOR_REVIEW=1

EMPTY_PLACEHOLDERS=3

APPROVED=0

CANONICAL=0

IMPLEMENTED_CAPABILITY_REGISTRY=NO

ACTIVE_RUNTIME_CAPABILITIES=0_PROVEN

PRODUCTION_CAPABILITIES=0_PROVEN
```

---

# 141. Next Document

The next document in the official `capabilities/` sequence is:

```text
doc/19-ai-workforce/capabilities/skill-registry.md
```

It must use:

```text
AIW-REG-SKILL-001
```

It must define:

- Skill Registry purpose;
- Registry authority;
- Skill Definition;
- Skill Profile;
- Agent Skill assignment;
- proficiency decision;
- Skill identity;
- Skill categories;
- Skill levels;
- ownership;
- Role dependencies;
- Capability dependencies;
- Tool dependencies;
- Model dependencies;
- prompt dependencies;
- memory dependencies;
- Product, Project, Tenant, Customer, environment, and regional scope;
- evaluation;
- certification;
- Skill validity;
- expiry;
- renewal;
- Skill drift;
- restriction;
- suspension;
- revocation;
- replacement;
- deprecation;
- retirement;
- evidence;
- runtime Skill eligibility;
- Production Skill gates;
- current-state limitations;
- Changelog entry;
- next document path.

---