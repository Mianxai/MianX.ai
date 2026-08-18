---
id: AIW-REG-MODEL-001
title: Mianx.ai AI Workforce Model Registry
version: 1.0.0
status: Draft

type: Enterprise AI Workforce Model Registry Standard
class: Governed Registry

owner: AI Workforce Council
steward: Model Governance and Capability Governance
authority: Founder and Enterprise Governance

maintainers:
  - AI Workforce Operations
  - Model Governance
  - Capability Governance
  - Agent Framework Team
  - AI Operating System Team
  - Enterprise Architecture
  - Enterprise Governance
  - Security Governance
  - Data and Privacy Governance
  - Enterprise Quality
  - Product Operations
  - Project Operations
  - Tool Governance
  - Skill Governance
  - Memory Governance
  - Workflow and Orchestration Operations
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
  - Model Governance
  - Capability Governance
  - Agent Framework Owner
  - AI Operating System Owner
  - Security Governance
  - Data and Privacy Governance
  - Product Operations
  - Project Operations
  - Tool Governance
  - Skill Governance
  - Memory Governance
  - Workflow and Orchestration Operations
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
  - Model Owners
  - Provider Owners
  - Routing Owners
  - Security Owners
  - Data Owners
  - Cost Owners
  - Enterprise Architects
  - AI Platform Engineers
  - Agent Engineers
  - Prompt Engineers
  - Evaluation Engineers
  - Workflow Designers
  - Orchestration Designers
  - Tool Owners
  - Memory Owners
  - Security Teams
  - Data and Privacy Teams
  - Quality Teams
  - Finance Teams
  - Platform Operations
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
  - ./capability-registry.md
  - ./skill-registry.md
  - ./tool-registry.md

related_documents:
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
  - Monthly During Initial Controlled Model Operation
  - Quarterly During Stable Controlled Operation
  - Annually After Stable Production Operation
  - After AI Constitution Change
  - After Model Governance Change
  - After Capability, Skill, or Tool Registry Change
  - After Provider, Model Family, Model Version, API, SDK, or Routing Change
  - After Prompt, Memory, Workflow, Agent Definition, or Evaluation Change
  - After Product, Project, Tenant, Customer, Environment, or Regional Scope Change
  - After Data Classification, Privacy, Security, Legal, or Compliance Change
  - Before New High-Risk Model Approval
  - Before Agent Model Assignment
  - Before Runtime Model Routing
  - Before Production Model Use
  - After Critical AI, Security, Privacy, Quality, Financial, Customer, or Operational Incident
  - Before Canonical Promotion

model_registry_horizon:
  current: Target-State Model Registry Definition
  near_term: One-Agent Low-Risk Model Evaluation and Routing Proof
  medium_term: Multi-Model, Multi-Agent, Multi-Project, and Multi-Tenant Model Governance
  long_term: Production-Controlled Enterprise Model Routing and Assurance

canonical: false
---

# Mianx.ai AI Workforce Model Registry

> **This document defines the governed target-state Registry for Model
> Definitions, provider Definitions, Model versions, Model Profiles, Agent
> Model Assignments, routing profiles, fallback profiles, evaluation profiles,
> Data eligibility, runtime Model eligibility, availability, quality, safety,
> Security, privacy, cost, monitoring, suspension, replacement, deprecation,
> retirement, and Production Model controls across the Mianx.ai Shared AI
> Workforce.**

---

# 1. Document Purpose

This document establishes the target-state Model Registry standard for the
Mianx.ai AI Workforce.

It defines:

- Model Registry purpose;
- Registry authority;
- Model identity;
- provider identity;
- Model Definition;
- provider Definition;
- Model family;
- Model version;
- Model Profile;
- Agent Model Assignment;
- routing profile;
- fallback profile;
- evaluation profile;
- safety profile;
- Data eligibility profile;
- cost profile;
- availability profile;
- context and token limits;
- modality;
- input types;
- output types;
- Model categories;
- Model ownership;
- provider ownership;
- routing ownership;
- evaluation ownership;
- Security ownership;
- Data ownership;
- privacy ownership;
- cost ownership;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- environment scope;
- regional scope;
- Data scope;
- Model Risk;
- provider Risk;
- evaluation;
- certification;
- approval;
- assignment;
- runtime Model eligibility;
- routing;
- fallback;
- availability;
- health;
- quality;
- safety;
- Security;
- privacy;
- compliance;
- cost;
- latency;
- throughput;
- rate limits;
- context limits;
- monitoring;
- degradation;
- restriction;
- suspension;
- quarantine;
- reactivation;
- replacement;
- deprecation;
- retirement;
- archival;
- evidence;
- audit;
- reporting;
- Production Model gates;
- current-state boundaries.

This document ensures that a Model is not treated as approved, available,
assigned, safe, suitable, Production-ready, or unrestricted merely because:

- its name exists;
- a provider advertises it;
- an API endpoint exists;
- an API key exists;
- a Model appears in a prompt;
- a Tool can call it;
- another Agent uses it;
- one evaluation passed;
- a benchmark score exists;
- the Model is newer;
- the Model has a larger context window;
- the Model is more expensive;
- the Model is described as intelligent;
- the provider service is online.

This document does not independently:

- approve a provider;
- approve a Model Definition;
- approve a Model version;
- approve a Model Profile;
- create a provider account;
- create credentials;
- assign a Model to an Agent;
- approve Data processing;
- approve Model routing;
- authorize fallback;
- authorize Customer use;
- activate runtime Model execution;
- authorize Production Model use;
- prove implementation.

---

# 2. Current Authority Status

This document currently has the following state:

```text
DOCUMENT_ID=AIW-REG-MODEL-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TARGET_STATE_MODEL_REGISTRY=DEFINED

MODEL_REGISTRY_IMPLEMENTATION=NOT_IMPLEMENTED

PROVIDER_REGISTRY=NOT_IMPLEMENTED

MODEL_PROFILE_REGISTRY=NOT_IMPLEMENTED

MODEL_ROUTING_ENGINE=NOT_IMPLEMENTED

MODEL_EVALUATION_ENGINE=NOT_IMPLEMENTED

MODEL_POLICY_ENGINE=NOT_IMPLEMENTED

RUNTIME_MODEL_ELIGIBILITY=NOT_VERIFIED

RUNTIME_MODEL_ROUTING=NOT_VERIFIED

APPROVED_PROVIDER_DEFINITIONS=0_PROVEN

APPROVED_MODEL_DEFINITIONS=0_PROVEN

APPROVED_MODEL_PROFILES=0_PROVEN

ACTIVE_AGENT_MODEL_ASSIGNMENTS=0_PROVEN

PRODUCTION_AUTHORIZED_MODELS=0_PROVEN

RUNTIME_AGENT_ACTIVATION=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

Therefore:

- all Model structures in this document are target-state definitions;
- no provider is approved;
- no Model Definition is approved;
- no Model Profile is active;
- no Agent Model Assignment is active;
- no runtime Model eligibility is proven;
- no runtime routing is proven;
- no Production Model use is authorized;
- Founder and required Governance approvals remain pending.

---

# 3. Strategic Alignment

The Model Registry operates inside the exact Mianx.ai hierarchy:

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

Models support this hierarchy.

They do not replace:

- Founder authority;
- Company Governance;
- Human accountability;
- Role authority;
- Agent lifecycle;
- Skill proficiency;
- Capability Governance;
- Tool authorization;
- prompt Governance;
- memory Governance;
- Product ownership;
- Project ownership;
- Tenant isolation;
- Customer contractual authority;
- Data Governance;
- Security controls;
- privacy controls;
- legal review;
- quality assurance;
- evidence;
- Production authorization.

---

# 4. Model Registry Objective

The Model Registry must make it possible to answer:

- What Model exists?
- Which Model ID identifies it?
- Which provider supplies it?
- Which Model family applies?
- Which exact Model version applies?
- Which Model Profile is approved?
- Which modalities are supported?
- Which context and output limits apply?
- Which Data classes are permitted?
- Which Data classes are prohibited?
- Which regions are supported?
- Which Products may use it?
- Which Projects may use it?
- Which Tenants or Customers may use it?
- Which environments may use it?
- Which Agents may receive it?
- Which capabilities and Skills depend on it?
- Which prompts were evaluated with it?
- Which memory and Tools may interact with it?
- Which routing policy applies?
- Which fallback policy applies?
- What Risk applies?
- What provider Risk applies?
- Which evaluations prove eligibility?
- Is certification required?
- What cost and latency limits apply?
- Is runtime availability verified?
- How is routing suspended?
- Which evidence proves current status?

---

# 5. Core Model Registry Principles

## 5.1 Model Access Is Not Agent Authority

Access to a Model does not grant the Agent authority to:

- make executive decisions;
- approve work;
- send communications;
- modify systems;
- access restricted Data;
- take Production actions;
- make financial commitments;
- make legal commitments.

---

## 5.2 Provider Availability Is Not Model Approval

A provider service being available does not mean:

- the provider is approved;
- the Model is approved;
- the Model version is approved;
- Data use is approved;
- Agent routing is approved;
- Production use is approved.

---

## 5.3 Model Definitions Must Be Explicit

Every Model Definition must identify:

- provider;
- Model family;
- Model version;
- modalities;
- context limits;
- output limits;
- supported use cases;
- prohibited use cases;
- Data eligibility;
- regions;
- Risk;
- evaluation;
- cost;
- monitoring;
- lifecycle.

---

## 5.4 Exact Model Versions Must Be Controlled

A provider alias such as:

```text
latest
```

must not be treated as a stable Model version for high-risk use.

Exact versions, releases, snapshots, or provider-supported immutable
identifiers should be used where available.

---

## 5.5 Models Must Be Purpose-Bound

A Model approved for:

- document drafting;

must not automatically be approved for:

- Security containment;
- financial action;
- legal decision support;
- Customer communication;
- Production code execution.

---

## 5.6 Models Must Be Data-Bound

Every Model Profile must identify:

- permitted Data classes;
- prohibited Data classes;
- retention expectations;
- provider training behavior where known;
- regional processing;
- logging behavior;
- privacy requirements;
- redaction requirements.

---

## 5.7 Models Must Be Evaluated in Their Full Configuration

Evaluation must include the relevant:

- Model version;
- provider;
- prompt version;
- Agent Definition;
- Tool Profile;
- memory profile;
- workflow;
- Product;
- Project;
- environment;
- Data class;
- Risk.

---

## 5.8 Benchmark Scores Do Not Prove Suitability

General benchmark performance does not independently prove suitability for:

- Mianx.ai Tasks;
- Customer workloads;
- Product-specific work;
- Project-specific work;
- Production operation;
- regulated work.

---

## 5.9 Larger Models Are Not Automatically Better

Model selection must consider:

- quality;
- safety;
- Data eligibility;
- latency;
- cost;
- availability;
- context requirements;
- environmental requirements;
- Risk;
- evidence.

---

## 5.10 Models Must Be Replaceable

Model architecture should support:

- version replacement;
- provider replacement;
- routing change;
- fallback;
- rollback;
- restriction;
- suspension;
- retirement.

---

## 5.11 Models Must Be Suspendable

The Model Governance system must support:

- one Model version suspension;
- one provider suspension;
- one Model Profile suspension;
- one Agent Model Assignment suspension;
- one Product route suspension;
- one Project route suspension;
- one Tenant route suspension;
- one environment suspension;
- emergency global routing stop.

---

## 5.12 Model Claims Require Evidence

Documentation does not prove:

- provider availability;
- Model availability;
- Model quality;
- Model safety;
- Data isolation;
- runtime eligibility;
- routing correctness;
- Production readiness.

---

# 6. Governing Non-Equivalence Rule

The following must remain separate:

```text
Provider
≠
Model Family
≠
Model Definition
≠
Model Version
≠
Model Profile
≠
Agent Model Assignment
≠
Routing Profile
≠
Fallback Profile
≠
Runtime Model Eligibility
≠
Runtime Model Availability
≠
Production Model Authority
```

Also:

```text
Model
≠
Agent

Model
≠
Skill

Model
≠
Capability

Model
≠
Tool

Model
≠
Prompt

Provider Availability
≠
Model Availability

Model Availability
≠
Model Approval

Model Approval
≠
Agent Eligibility

Agent Eligibility
≠
Task Authorization
```

---

# 7. Provider Definition

A Provider Definition describes one organization or internal service that
supplies Model access.

It should define:

- provider identity;
- legal entity;
- service type;
- supported regions;
- supported Models;
- authentication methods;
- Data-processing terms;
- retention behavior;
- logging behavior;
- service levels;
- cost model;
- Security posture;
- incident process;
- lifecycle.

A Provider Definition does not approve every Model supplied by the provider.

---

# 8. Model Family

A Model Family groups related Models maintained by one provider or internal
owner.

A Model Family may contain:

- multiple capability tiers;
- multiple context sizes;
- multiple modalities;
- multiple releases;
- multiple regional variants;
- multiple deployment types.

Approval of one Model Family member does not approve every family member.

---

# 9. Model Definition

A Model Definition describes one governed Model product or service.

It must identify:

- provider;
- Model family;
- Model name;
- model type;
- modalities;
- supported inputs;
- supported outputs;
- context limits;
- output limits;
- supported regions;
- Data eligibility;
- expected capabilities;
- known limitations;
- Risk;
- lifecycle.

---

# 10. Model Version

A Model version identifies one exact technical release or provider-exposed
version of a Model.

A version record should identify:

- immutable version reference where available;
- release date;
- retirement date where known;
- interface version;
- tokenizer behavior where relevant;
- context limits;
- changed behavior;
- evaluation status;
- migration requirements.

---

# 11. Model Profile

A Model Profile defines the approved configuration under which a Model may be
used.

It may define:

- provider;
- exact Model version;
- purpose;
- capabilities;
- Agent types;
- Roles;
- Skills;
- prompt profiles;
- Tool Profiles;
- memory profiles;
- workflows;
- Data classes;
- regions;
- environments;
- routing;
- fallback;
- cost;
- latency;
- Risk;
- evaluation;
- monitoring.

---

# 12. Agent Model Assignment

An Agent Model Assignment connects:

- one Agent Definition or Agent Instance;
- one approved Model Profile;
- one Role;
- one Capability;
- one Product;
- one Project;
- one Tenant or Customer where applicable;
- one environment;
- one validity period.

An assignment does not authorize execution until runtime eligibility passes.

---

# 13. Routing Profile

A Routing Profile defines how a Model is selected for an approved request.

It may consider:

- required capability;
- Task type;
- Risk;
- Data classification;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- latency;
- cost;
- availability;
- quality;
- context requirement;
- modality;
- fallback eligibility.

---

# 14. Fallback Profile

A Fallback Profile defines permitted alternatives when the preferred Model is
unavailable, degraded, ineligible, too costly, or unable to satisfy the
request.

Fallback must not:

- lower Data protections;
- increase Risk without approval;
- cross region restrictions;
- exceed cost limits;
- use an unevaluated Model;
- change output authority;
- bypass monitoring;
- bypass evidence.

---

# 15. Evaluation Profile

A Model Evaluation Profile defines:

- scenarios;
- workloads;
- prompts;
- Data;
- expected outputs;
- scoring;
- safety tests;
- Security tests;
- privacy tests;
- quality tests;
- latency tests;
- cost tests;
- failure tests;
- evidence;
- validity.

---

# 16. Data Eligibility Profile

A Data Eligibility Profile defines which Data may be sent to or processed by a
Model.

It should define:

- permitted Data classes;
- prohibited Data classes;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- environment;
- region;
- masking requirements;
- redaction requirements;
- retention restrictions;
- legal basis where applicable;
- approval requirements.

---

# 17. Model Registry Entry

A Model Registry Entry is the governed source-of-truth record for one Model
Definition and its lifecycle.

It should contain:

- Model ID;
- version;
- provider;
- family;
- modalities;
- context limits;
- output limits;
- Data eligibility;
- region;
- owner;
- Risk;
- lifecycle state;
- approval state;
- evaluation;
- review date;
- evidence.

---

# 18. Model Entity Model

```text
Model Need Identified
    ↓
Provider Definition
    ↓
Model Definition
    ↓
Model Version
    ↓
Model Profile
    ↓
Evaluation Profile
    ↓
Data Eligibility Review
    ↓
Approval
    ↓
Agent Model Assignment
    ↓
Routing Profile
    ↓
Runtime Eligibility Validation
    ↓
Model Invocation
    ↓
Evidence and Monitoring
    ↓
Restriction, Suspension, Quarantine, Replacement, or Retirement
```

---

# 19. Model ID Standard

Proposed provider ID format:

```text
AIW-PROVIDER-{DOMAIN}-{NUMBER}
```

Model Definition ID format:

```text
AIW-MODEL-{DOMAIN}-{NUMBER}
```

Model version record ID format:

```text
AIW-MODEL-VERSION-{DOMAIN}-{NUMBER}
```

Model Profile ID format:

```text
AIW-MODEL-PROFILE-{DOMAIN}-{NUMBER}
```

Agent Model Assignment ID format:

```text
AIW-MODEL-ASSIGN-{AGENT}-{NUMBER}
```

Routing Profile ID format:

```text
AIW-MODEL-ROUTE-{SCOPE}-{NUMBER}
```

Fallback Profile ID format:

```text
AIW-MODEL-FALLBACK-{SCOPE}-{NUMBER}
```

---

# 20. Model Identity Rules

A Model ID must:

- remain unique;
- identify one bounded Model Definition;
- remain stable;
- not be reused;
- remain separate from provider IDs;
- remain separate from Model version IDs;
- remain separate from Profile IDs;
- remain separate from Assignment IDs;
- remain version-controlled;
- remain traceable after retirement.

---

# 21. Provider Definition Record

```yaml
provider_definition:
  provider_id: required
  provider_version: required
  provider_name: required

  provider_type: EXTERNAL | INTERNAL | SELF_HOSTED
  legal_entity_reference: conditional
  service_description: required

  supported_regions: required
  prohibited_regions: conditional
  authentication_methods: required

  data_processing_terms_reference: required
  privacy_terms_reference: required
  security_review_reference: required
  legal_review_reference: required
  compliance_review_reference: conditional

  retention_behavior: required
  provider_training_behavior: required
  logging_behavior: required
  deletion_behavior: required

  service_level_reference: conditional
  incident_process_reference: required
  support_process_reference: required
  exit_process_reference: required

  cost_model_reference: required
  provider_risk_class: required

  business_owner: required
  technical_owner: required
  security_owner: required
  privacy_owner: required
  legal_owner: required
  cost_owner: required
  operational_owner: required

  lifecycle_state: required
  approval_state: required
  created_at: required
  updated_at: required
  review_at: required
```

---

# 22. Model Definition Record

```yaml
model_definition:
  model_id: required
  model_definition_version: required

  provider_id: required
  provider_version: required

  model_name: required
  model_family: required
  model_type: required

  supported_modalities: required
  supported_input_types: required
  supported_output_types: required

  purpose: required
  permitted_uses: required
  prohibited_uses: required

  context_limit: required
  maximum_output_limit: required
  tokenizer_reference: conditional

  supported_regions: required
  supported_environments: required
  supported_data_classes: required
  prohibited_data_classes: required

  expected_capabilities: required
  known_limitations: required
  known_failure_modes: required

  default_risk_class: required
  maximum_risk_class: required
  provider_risk_class: required

  evaluation_profile_id: required
  data_eligibility_profile_id: required
  safety_profile_id: required
  security_profile_id: required
  privacy_profile_id: required
  cost_profile_id: required
  availability_profile_id: required
  monitoring_profile_id: required
  evidence_profile_id: required
  suspension_profile_id: required
  recovery_profile_id: required

  model_owner: required
  technical_owner: required
  evaluation_owner: required
  security_owner: required
  privacy_owner: required
  data_owner: required
  operational_owner: required
  cost_owner: required
  documentation_owner: required

  lifecycle_state: required
  approval_state: required
  created_at: required
  updated_at: required
  review_at: required
```

---

# 23. Model Version Record

```yaml
model_version:
  model_version_id: required

  model_id: required
  provider_model_reference: required
  immutable_provider_reference: conditional

  release_reference: required
  release_date: conditional
  retirement_date: conditional

  interface_version: required
  context_limit: required
  maximum_output_limit: required

  supported_modalities: required
  supported_regions: required
  supported_data_classes: required

  changed_behavior: required
  migration_requirements: required
  compatibility_notes: required

  evaluation_status: required
  evaluation_reference: conditional
  security_review_reference: required
  privacy_review_reference: required

  lifecycle_state: required
  approval_state: required
  created_at: required
  review_at: required
```

---

# 24. Model Profile Record

```yaml
model_profile:
  model_profile_id: required
  model_profile_version: required

  provider_id: required
  model_id: required
  model_version_id: required

  approved_purpose: required
  permitted_capabilities: required
  permitted_skills: required
  permitted_agent_types: required
  permitted_roles: required

  prompt_profile_ids: required
  tool_profile_ids: conditional
  memory_profile_ids: conditional
  workflow_profile_ids: conditional

  organization_scope: required
  product_scope: conditional
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment_scope: required
  region_scope: required
  data_scope: required

  maximum_context_usage: required
  maximum_output_usage: required
  maximum_risk_class: required

  temperature_policy: conditional
  sampling_policy: conditional
  structured_output_policy: conditional
  safety_policy_id: required
  data_eligibility_profile_id: required
  routing_profile_id: required
  fallback_profile_id: conditional
  cost_profile_id: required
  availability_profile_id: required
  monitoring_profile_id: required
  evidence_profile_id: required
  suspension_profile_id: required

  accountable_human_owner: required
  model_owner: required
  security_owner: required
  privacy_owner: required
  cost_owner: required
  approved_by: required

  effective_at: required
  review_at: required
  expires_at: required
  profile_state: required
```

---

# 25. Agent Model Assignment Record

```yaml
agent_model_assignment:
  assignment_id: required

  model_profile_id: required
  model_profile_version: required

  agent_definition_id: required
  agent_definition_version: required
  agent_instance_id: conditional
  runtime_version: conditional

  role_id: required
  capability_ids: required
  skill_ids: required

  organization_scope: required
  product_scope: required
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment_scope: required
  region_scope: required
  data_scope: required
  risk_scope: required

  prompt_profile_ids: required
  tool_profile_ids: conditional
  memory_profile_ids: conditional
  workflow_profile_ids: conditional

  evaluation_reference: required
  certification_reference: conditional
  allocation_reference: required
  authority_reference: required
  approval_reference: required

  accountable_human_owner: required
  assigned_by: required
  approved_by: required

  assigned_at: required
  review_at: required
  expires_at: required

  restrictions: conditional
  assignment_state: required
  evidence_references: required
```

---

# 26. Routing Profile Record

```yaml
model_routing_profile:
  routing_profile_id: required
  routing_profile_version: required

  objective: required
  task_types: required
  capability_ids: required

  preferred_model_profile_ids: required
  permitted_alternative_profile_ids: conditional
  prohibited_model_profile_ids: conditional

  organization_scope: required
  product_scope: required
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment_scope: required
  region_scope: required
  data_scope: required

  maximum_risk_class: required
  maximum_cost_per_request: required
  maximum_latency: required
  minimum_quality_status: required
  minimum_safety_status: required

  context_requirement: required
  modality_requirement: required
  structured_output_requirement: conditional

  provider_diversity_required: required
  fallback_profile_id: conditional

  routing_owner: required
  approved_by: required
  effective_at: required
  review_at: required
  expires_at: required
  status: required
```

---

# 27. Fallback Profile Record

```yaml
model_fallback_profile:
  fallback_profile_id: required
  fallback_profile_version: required

  primary_model_profile_id: required
  fallback_model_profile_ids: required
  fallback_order: required

  trigger_conditions: required
  prohibited_trigger_conditions: required

  required_scope_match: required
  required_environment_match: required
  required_region_match: required
  required_data_match: required
  required_risk_match: required

  maximum_quality_reduction: required
  maximum_cost_increase: required
  maximum_latency_increase: required

  human_approval_required: required
  notification_required: required
  evidence_required: required

  fallback_owner: required
  approved_by: required
  effective_at: required
  review_at: required
  expires_at: required
  status: required
```

---

# 28. Data Eligibility Profile Record

```yaml
model_data_eligibility_profile:
  data_eligibility_profile_id: required
  data_eligibility_profile_version: required

  provider_id: required
  model_id: required
  model_version_id: required

  permitted_data_classes: required
  prohibited_data_classes: required

  permitted_products: conditional
  permitted_projects: conditional
  permitted_tenants: conditional
  permitted_customers: conditional
  permitted_environments: required
  permitted_regions: required

  masking_required: required
  redaction_required: required
  anonymization_required: required
  minimization_required: required

  provider_retention_allowed: required
  provider_training_allowed: required
  provider_logging_allowed: required

  legal_basis_required: conditional
  consent_required: conditional
  customer_approval_required: conditional
  privacy_review_required: required
  security_review_required: required

  data_owner: required
  privacy_owner: required
  security_owner: required
  approved_by: required

  effective_at: required
  review_at: required
  expires_at: required
  status: required
```

---

# 29. Model Categories

| Code | Model Category | Primary Purpose |
|---|---|---|
| `MC-GEN` | General Language | General text understanding and generation |
| `MC-REASON` | Reasoning | Structured analysis, planning, and reasoning support |
| `MC-CODE` | Code | Code generation, analysis, testing, and review |
| `MC-EMBED` | Embedding | Vector representation and retrieval support |
| `MC-RERANK` | Reranking | Relevance scoring and retrieval refinement |
| `MC-VISION` | Vision | Image and visual-input understanding |
| `MC-AUDIO` | Audio | Speech, audio understanding, and generation |
| `MC-MULTI` | Multimodal | Combined text, image, audio, or other modality work |
| `MC-CLASS` | Classification | Structured classification and routing |
| `MC-EXTRACT` | Extraction | Structured information extraction |
| `MC-TRANS` | Translation | Language translation |
| `MC-MOD` | Moderation | Content and safety classification |
| `MC-FORECAST` | Forecasting | Time-series or probabilistic forecasting |
| `MC-RANK` | Ranking | Ordering candidates or alternatives |
| `MC-CUSTOM` | Custom or Fine-Tuned | Mianx.ai or Product-specific customized Model |
| `MC-LOCAL` | Local or Self-Hosted | Internally hosted Model operation |

---

# 30. Model Modalities

Supported modalities may include:

```text
TEXT

IMAGE

AUDIO

VIDEO

DOCUMENT

CODE

STRUCTURED-DATA

TIME-SERIES

MULTIMODAL
```

A Model Profile must identify exact permitted modalities.

---

# 31. Input Types

Input types may include:

- plain text;
- structured text;
- source code;
- Markdown;
- JSON;
- images;
- audio;
- documents;
- tables;
- approved Tool results;
- approved memory retrieval;
- approved Knowledge retrieval.

Input support does not authorize every Data class.

---

# 32. Output Types

Output types may include:

- free-form text;
- structured JSON;
- code;
- classification;
- ranking;
- embedding;
- summary;
- translation;
- image;
- audio;
- Tool call proposal;
- workflow decision proposal.

A Model output is not automatically an approved action.

---

# 33. Structured Output

Structured output use should define:

- schema;
- schema version;
- required fields;
- validation;
- retry behavior;
- invalid-output behavior;
- maximum retries;
- evidence.

Valid syntax does not prove correct content.

---

# 34. Context Limit

A Model context limit defines the maximum provider-supported input and output
window.

Operational context use must account for:

- system instructions;
- Agent Definition;
- Role instructions;
- Product context;
- Project context;
- memory;
- Knowledge;
- Tool outputs;
- user input;
- expected output;
- safety margin.

---

# 35. Context Budget

A context budget should allocate space across:

```text
Governance Instructions

Agent and Role Instructions

Product Context

Project Context

Tenant and Customer Context

Memory

Knowledge

Task Input

Tool Results

Expected Output

Safety Margin
```

Governance instructions must not be removed merely to fit more Task Data.

---

# 36. Context Truncation

Context truncation must not silently remove:

- Founder instructions;
- constitutional controls;
- Security controls;
- privacy controls;
- Product or Project scope;
- Tenant identity;
- Customer restrictions;
- approval requirements;
- evidence requirements;
- open Risks.

---

# 37. Output Limits

Output limits should consider:

- Task requirements;
- structured-output size;
- evidence requirements;
- cost;
- latency;
- provider limits;
- downstream Tool limits;
- storage;
- Human-review capacity.

Large output size does not prove quality.

---

# 38. Model Ownership

Every Model Definition must have:

- Model owner;
- provider owner;
- technical owner;
- evaluation owner;
- Security owner;
- privacy owner;
- Data owner;
- operational owner;
- routing owner;
- cost owner;
- documentation owner.

---

# 39. Model Owner Responsibilities

The Model Owner is accountable for:

- Model purpose;
- approved use cases;
- lifecycle;
- version control;
- evaluation;
- Risk;
- Data eligibility;
- scope;
- review;
- deprecation;
- retirement.

---

# 40. Provider Owner Responsibilities

The Provider Owner is accountable for:

- provider relationship;
- provider review;
- commercial terms;
- service changes;
- availability;
- support;
- provider incidents;
- provider exit;
- provider replacement.

---

# 41. Routing Owner Responsibilities

The Routing Owner is accountable for:

- routing policy;
- selection criteria;
- fallback;
- cost limits;
- latency limits;
- Data compatibility;
- Risk compatibility;
- routing monitoring;
- routing suspension.

---

# 42. Evaluation Owner Responsibilities

The Evaluation Owner is accountable for:

- evaluation design;
- scenario quality;
- scoring;
- evaluator independence;
- evidence;
- re-evaluation triggers;
- validity;
- result accuracy.

---

# 43. Product Model Scope

A Product Model scope must define:

- approved Model Profiles;
- supported capabilities;
- permitted Data;
- environments;
- regions;
- cost limits;
- quality requirements;
- Product owner;
- review cycle.

A Model approved for one Product is not automatically approved for another.

---

# 44. Project Model Scope

Project Model use must define:

- Project ID;
- Model Profile;
- prompt profiles;
- Data scope;
- memory scope;
- Tool scope;
- environment;
- region;
- budget;
- start;
- expiry;
- closure procedure.

Project closure must trigger Assignment review.

---

# 45. Tenant Model Scope

Tenant Model use must:

- validate Tenant identity;
- use Tenant-scoped context;
- use Tenant-scoped memory;
- prevent cross-Tenant Data exposure;
- preserve Tenant-specific evidence;
- attribute cost to Tenant;
- remove access at Tenant closure;
- pass negative isolation tests.

---

# 46. Customer Model Scope

Customer-specific Model use must define:

- Customer identity;
- contractual purpose;
- approved Product;
- approved Project;
- approved Tenant;
- Data restrictions;
- communication restrictions;
- region;
- environment;
- Human owner;
- expiry.

---

# 47. Environment Model Scope

Model use must distinguish:

```text
ENV-DOCS

ENV-LOCAL

ENV-DEVELOPMENT

ENV-TEST

ENV-STAGING

ENV-PRODUCTION-READ

ENV-PRODUCTION-WRITE
```

A Model approved for Development must not automatically route Production work.

---

# 48. Regional Model Scope

Regional controls may depend on:

- provider region;
- processing region;
- Data residency;
- Customer location;
- Tenant location;
- legal jurisdiction;
- availability;
- network boundary;
- log location;
- evidence-retention location.

---

# 49. Data Classification Scope

A Model Profile must identify permitted Data classes.

Target classes may include:

```text
PUBLIC

INTERNAL

CONFIDENTIAL

RESTRICTED

PERSONAL

SENSITIVE-PERSONAL

CUSTOMER-CONFIDENTIAL

REGULATED
```

A Model permitted for Internal Data must not automatically process regulated
Data.

---

# 50. Data Minimization

Only the minimum necessary Data should be included in Model input.

Minimization may require:

- field filtering;
- record filtering;
- masking;
- redaction;
- summarization;
- anonymization;
- pseudonymization;
- synthetic substitution;
- local preprocessing.

---

# 51. Sensitive Data

Sensitive Data Model use requires stronger:

- purpose validation;
- Data-owner approval;
- privacy review;
- Security review;
- regional control;
- logging control;
- retention control;
- deletion control;
- monitoring;
- evidence.

---

# 52. Secret Handling

Secret values must not be included in Model prompts.

A Model may receive:

- secret reference;
- secret status;
- permitted action context;

but not the secret value unless an exceptional approved architecture explicitly
requires it and stronger controls exist.

---

# 53. Provider Data Retention

Provider retention behavior must be recorded as:

```text
NO-RETENTION-CLAIM

LIMITED-RETENTION

CONFIGURABLE-RETENTION

UNKNOWN

NOT-ELIGIBLE
```

Provider claims require contractual or technical evidence where material.

---

# 54. Provider Training Use

Provider training behavior must be recorded as:

```text
NOT-USED-FOR-TRAINING

OPT-OUT-CONFIGURED

CONTRACTUALLY-RESTRICTED

MAY-BE-USED

UNKNOWN

NOT-ELIGIBLE
```

Unknown behavior must not be treated as safe for sensitive Data.

---

# 55. Model Risk Classification

| Risk | Model Interpretation |
|---|---|
| `R0` | Public, low-impact, read-only, or negligible-risk Model use |
| `R1` | Reversible internal drafting, summarization, or analysis |
| `R2` | Controlled internal execution support with bounded impact |
| `R3` | Production, Customer, Security, privacy, financial, or material operational support |
| `R4` | Irreversible, destructive, constitutional, legal, regulated, or enterprise-critical support |

Risk must be assessed by use case, not only by Model name.

---

# 56. Provider Risk Classification

Provider Risk should consider:

- legal jurisdiction;
- Data handling;
- retention;
- provider training behavior;
- Security posture;
- service dependency;
- supply-chain exposure;
- provider lock-in;
- financial stability;
- incident history;
- regional availability;
- exit capability.

---

# 57. Model Risk Factors

Risk assessment should consider:

- output uncertainty;
- hallucination potential;
- Data sensitivity;
- Customer impact;
- Production impact;
- autonomy;
- Tool access;
- memory access;
- prompt injection;
- context poisoning;
- financial impact;
- legal impact;
- Security impact;
- scale;
- concurrency;
- fallback behavior;
- Human-review availability.

---

# 58. Model Definition Lifecycle

```text
Model Need Identified
    ↓
Provider Proposed
    ↓
Provider Reviewed
    ↓
Model Defined
    ↓
Model Version Registered
    ↓
Model Profile Designed
    ↓
Model Evaluated
    ↓
Model Approved
    ↓
Model Available for Assignment
    ↓
Model Maintained
    ↓
Model Revised
    ↓
Model Deprecated
    ↓
Model Retired
    ↓
Model Archived
```

---

# 59. Model Definition States

| State | Meaning |
|---|---|
| `NEED-IDENTIFIED` | Verified Model need exists |
| `PROVIDER-REVIEW` | Provider review is underway |
| `PROPOSED` | Initial Model proposal exists |
| `DEFINED` | Purpose, version, scope, and Risk are documented |
| `PROFILE-DESIGNED` | Model Profile and controls are designed |
| `EVALUATION-PENDING` | Required evaluation remains |
| `EVALUATED` | Evaluation result exists |
| `IN-REVIEW` | Governance review is underway |
| `APPROVED` | Exact Model Definition and version are approved |
| `AVAILABLE` | Assignments may be proposed |
| `MAINTAINED` | Model remains actively governed |
| `REVISION-PENDING` | Material revision is under review |
| `DEPRECATED` | New Assignments should stop |
| `RETIRED` | Model may no longer be newly routed |
| `ARCHIVED` | Historical record remains |

---

# 60. Provider Lifecycle

```text
Provider Need
    ↓
Provider Proposed
    ↓
Security, Privacy, Legal, Data, Cost, and Architecture Review
    ↓
Provider Approved
    ↓
Provider Active
    ↓
Provider Monitored
    ↓
Provider Restricted, Suspended, Quarantined, Replaced, or Deprecated
    ↓
Provider Retired
```

---

# 61. Model Version Lifecycle

```text
Version Detected
    ↓
Version Registered
    ↓
Compatibility Reviewed
    ↓
Evaluation
    ↓
Approval
    ↓
Available for Profile Use
    ↓
Monitored
    ↓
Restricted, Deprecated, or Retired
```

A new version must not inherit approval automatically.

---

# 62. Agent Model Assignment Lifecycle

```text
Model Need Identified
    ↓
Model Profile Selected
    ↓
Assignment Proposed
    ↓
Agent and Scope Eligibility Reviewed
    ↓
Evaluation Validated
    ↓
Assignment Approved
    ↓
Runtime Eligible
    ↓
Active Model Use
    ↓
Monitored
    ↓
Restricted, Suspended, Expired, Revoked, Replaced, or Retired
```

---

# 63. Model Assignment States

| State | Meaning |
|---|---|
| `REQUIRED` | Role or Capability requires a Model |
| `PROPOSED` | Model Assignment is proposed |
| `ELIGIBILITY-REVIEW` | Agent, scope, Data, and dependencies are checked |
| `EVALUATION-PENDING` | Required evaluation remains |
| `APPROVAL-PENDING` | Required approval remains |
| `APPROVED` | Exact Assignment is approved |
| `RUNTIME-ELIGIBLE` | Current conditions permit routing |
| `ACTIVE` | Model is being used within approved scope |
| `RESTRICTED` | Use case, Data, scope, or routing is reduced |
| `SUSPENDED` | New Model requests are blocked |
| `QUARANTINED` | Model route is isolated for investigation |
| `EXPIRED` | Assignment validity ended |
| `REVOKED` | Model authority was withdrawn |
| `REPLACEMENT-PENDING` | Migration is underway |
| `RETIRED` | Assignment is no longer required |
| `ARCHIVED` | Historical record remains |

---

# 64. Model Proposal

A Model proposal must identify:

- business or capability need;
- expected use cases;
- expected modalities;
- candidate providers;
- candidate Models;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- Data classes;
- Risk;
- quality requirements;
- latency requirements;
- cost requirements;
- fallback requirements;
- exit requirements.

---

# 65. Provider Review

Provider review may include:

- legal review;
- contractual review;
- Security review;
- privacy review;
- Data-processing review;
- residency review;
- architecture review;
- financial review;
- operational review;
- service-level review;
- incident-process review;
- provider-exit review.

---

# 66. Model Duplication Review

Before registering a new Model:

- review existing Model Definitions;
- review existing Model Families;
- review existing providers;
- compare supported capabilities;
- compare modalities;
- compare Data eligibility;
- compare regions;
- compare quality;
- compare cost;
- compare latency;
- compare fallback value;
- identify replacement opportunities.

A Model should not be registered only because it is newly released.

---

# 67. Model Approval

Model approval must identify:

- exact Provider ID;
- exact Model ID;
- exact Model version;
- approved Model Profile;
- approved use cases;
- prohibited use cases;
- approved Data classes;
- approved regions;
- approved environments;
- approved Risk;
- evaluation;
- conditions;
- review date;
- evidence.

Approval of one Model version does not approve another version.

---

# 68. Model Evaluation

Model evaluation must test the exact configuration.

It should include:

- Task quality;
- instruction adherence;
- scope adherence;
- structured output;
- hallucination behavior;
- uncertainty reporting;
- refusal behavior;
- prompt-injection resistance;
- context-poisoning resistance;
- sensitive-Data handling;
- Tool-use planning where applicable;
- memory use where applicable;
- Product isolation;
- Project isolation;
- Tenant isolation;
- cost;
- latency;
- availability;
- failure handling;
- fallback;
- evidence.

---

# 69. Model Evaluation Profile Record

```yaml
model_evaluation_profile:
  evaluation_profile_id: required

  provider_id: required
  model_id: required
  model_version_id: required
  model_profile_id: required

  agent_definition_ids: required
  prompt_profile_ids: required
  tool_profile_ids: conditional
  memory_profile_ids: conditional
  workflow_profile_ids: conditional

  scenarios: required
  workload_profile: required
  expected_outputs: required
  scoring_method: required
  pass_threshold: required

  quality_tests: required
  safety_tests: required
  security_tests: required
  privacy_tests: required
  data_eligibility_tests: required
  prompt_injection_tests: required
  hallucination_tests: required
  structured_output_tests: conditional
  latency_tests: required
  cost_tests: required
  availability_tests: required
  fallback_tests: conditional
  suspension_tests: required

  environment: required
  region: required
  data_scope: required
  risk_scope: required

  critical_failure_rules: required
  evaluator_requirements: required
  independent_review_required: required
  evidence_requirements: required

  minimum_sample_size: required
  validity_period: required
  re_evaluation_triggers: required
```

---

# 70. Evaluation Result States

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

# 71. Critical Model Evaluation Failures

The following should normally produce failure:

- fabricated evidence;
- fabricated approval;
- cross-Project Data exposure;
- cross-Tenant Data exposure;
- Customer Data disclosure;
- secret reproduction;
- prohibited Data processing;
- unsafe Tool-action recommendation;
- ignored Governance instruction;
- material prompt-injection success;
- hidden critical uncertainty;
- invalid structured output reported as valid;
- unapproved fallback;
- suspension failure;
- Production action outside approved scope.

---

# 72. Model Quality Evaluation

Quality evaluation may include:

- correctness;
- completeness;
- relevance;
- consistency;
- source fidelity;
- instruction adherence;
- format adherence;
- reasoning outcome quality;
- code quality;
- factual accuracy;
- uncertainty reporting;
- review burden;
- rework.

---

# 73. Model Safety Evaluation

Safety evaluation may include:

- prohibited-content handling;
- harmful instruction handling;
- policy adherence;
- refusal quality;
- escalation quality;
- scope control;
- authority control;
- dangerous action prevention;
- Customer-impact controls;
- self-expansion prevention.

---

# 74. Model Security Evaluation

Security evaluation may include:

- prompt injection;
- indirect prompt injection;
- Data exfiltration;
- secret extraction;
- system-instruction disclosure;
- cross-context leakage;
- Tool misuse;
- permission bypass;
- malicious output;
- unsafe code generation;
- evidence manipulation.

---

# 75. Model Privacy Evaluation

Privacy evaluation may include:

- personal-Data minimization;
- masking compliance;
- redaction compliance;
- retention behavior;
- Customer-Data handling;
- Tenant isolation;
- regional processing;
- Data-deletion expectations;
- sensitive-Data reproduction.

---

# 76. Model Certification

Certification may be required for:

- Production write support;
- high-autonomy Agents;
- Security operations;
- personal or regulated Data;
- financial decision support;
- Customer communication;
- legal or compliance work;
- critical infrastructure;
- executive decision support;
- destructive Tool planning.

---

# 77. Model Certification Record

```yaml
model_certification:
  certification_id: required

  provider_id: required
  model_id: required
  model_version_id: required
  model_profile_id: required

  agent_definition_id: required
  agent_instance_id: required
  agent_model_assignment_id: required

  certified_capabilities: required
  prohibited_capabilities: required

  product_scope: required
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment_scope: required
  region_scope: required
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

# 78. Model Assignment Eligibility

Before assignment, validate:

- provider is approved;
- Model Definition is approved;
- exact Model version is approved;
- Model Profile is approved;
- Agent Definition is approved;
- Agent Instance is eligible where applicable;
- Role permits the Model use;
- Capability permits the Model use;
- required Skills are current;
- prompt versions are current;
- Tool Profiles are compatible;
- memory profiles are compatible;
- Product and Project scopes match;
- Tenant and Customer scopes match;
- environment matches;
- region matches;
- Data classes are permitted;
- Risk ceiling is valid;
- evaluation is current;
- certification is current where required;
- budget is available;
- monitoring is active.

---

# 79. Runtime Model Eligibility

Runtime Model Eligibility must be calculated from:

```text
Approved Provider

Approved Model Definition

Approved Exact Model Version

Approved Model Profile

Approved Agent Model Assignment

Eligible Agent Definition

Eligible Agent Instance

Valid Agent Lifecycle State

Valid Role

Valid Skills

Valid Capability Allocation

Current Prompt Profiles

Compatible Tool Profiles

Compatible Memory Profiles

Matching Product Scope

Matching Project Scope

Matching Tenant Scope

Matching Customer Scope

Matching Environment

Matching Region

Permitted Data Classification

Valid Risk Ceiling

Current Evaluation

Current Certification Where Required

Available Budget

Available Capacity

Active Monitoring

No Suspension or Quarantine
```

All mandatory controls must pass.

---

# 80. Runtime Model Eligibility States

```text
UNKNOWN

PROVIDER-UNAPPROVED

MODEL-UNAPPROVED

VERSION-UNAPPROVED

PROFILE-UNAPPROVED

NOT-ASSIGNED

EVALUATION-PENDING

CERTIFICATION-PENDING

DATA-INELIGIBLE

REGION-INELIGIBLE

ENVIRONMENT-INELIGIBLE

DEPENDENCY-BLOCKED

ELIGIBLE

CONDITIONALLY-ELIGIBLE

RESTRICTED

SUSPENDED

QUARANTINED

EXPIRED

REVOKED

RETIRED
```

Unknown eligibility must not be treated as eligible.

---

# 81. Conditional Model Eligibility

Conditional eligibility must define:

- permitted Task types;
- permitted Data;
- permitted Product;
- permitted Project;
- permitted Tenant;
- permitted Customer;
- permitted environment;
- permitted region;
- maximum Risk;
- mandatory Human review;
- reduced context limit;
- reduced output limit;
- cost limit;
- expiry;
- re-evaluation date;
- suspension threshold.

---

# 82. Model Routing

Model routing selects an eligible Model Profile for an approved request.

Routing should consider:

- exact Capability;
- Task type;
- Risk;
- Data class;
- context size;
- modality;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- quality;
- latency;
- cost;
- availability;
- provider diversity;
- fallback.

---

# 83. Model Request Record

```yaml
model_request:
  request_id: required

  capability_id: required
  task_id: required
  workflow_id: conditional

  required_model_category: required
  required_modalities: required
  required_context_size: required
  required_output_type: required

  organization_id: required
  product_id: required
  project_id: conditional
  tenant_id: conditional
  customer_id: conditional
  environment: required
  region: required
  data_classification: required

  maximum_risk_class: required
  maximum_cost: required
  maximum_latency: required
  minimum_quality_status: required
  minimum_safety_status: required

  requester_identity: required
  requester_authority: required
  approval_reference: conditional

  requested_at: required
  expires_at: required
  request_state: required
```

---

# 84. Model Match Result

```yaml
model_match:
  match_id: required
  request_id: required

  provider_id: required
  model_id: required
  model_version_id: required
  model_profile_id: required
  agent_model_assignment_id: required

  capability_match: required
  modality_match: required
  context_match: required
  output_match: required

  scope_match: required
  environment_match: required
  region_match: required
  data_match: required
  risk_match: required

  evaluation_status: required
  certification_status: conditional
  availability_status: required
  quality_status: required
  safety_status: required
  cost_status: required
  latency_status: required

  restrictions: conditional
  missing_requirements: conditional
  human_review_required: required

  match_result: ELIGIBLE | CONDITIONALLY-ELIGIBLE | INELIGIBLE
  evaluated_at: required
  evidence_reference: required
```

---

# 85. Routing Boundary

Model routing must not:

- approve a provider;
- approve a Model;
- approve a Model version;
- create an Agent Model Assignment;
- grant Data eligibility;
- expand authority;
- grant Tool permission;
- activate suspended Agents;
- use unapproved fallback;
- cross Project boundaries;
- cross Tenant boundaries;
- cross regional boundaries;
- bypass Human review;
- hide routing failure.

---

# 86. Preferred Model

A preferred Model is the first eligible route for a defined request class.

Preferred status must be based on:

- approved quality;
- approved safety;
- Data eligibility;
- cost;
- latency;
- availability;
- context requirements;
- operational experience;
- evidence.

Preferred does not mean unrestricted.

---

# 87. Fallback Routing

Fallback routing may occur when:

- primary provider is unavailable;
- primary Model is unavailable;
- capacity is exhausted;
- rate limit applies;
- latency exceeds threshold;
- cost exceeds approved limit;
- context requirement changes;
- quality degradation occurs.

Fallback must preserve or strengthen Governance controls.

---

# 88. No-Fallback Conditions

Fallback should be blocked when:

- no alternative has matching Data eligibility;
- no alternative has matching region;
- no alternative has matching Risk approval;
- no alternative is evaluated;
- contractual restriction applies;
- Customer approval is required;
- output compatibility is insufficient;
- safety status is insufficient;
- evidence capture is unavailable.

---

# 89. Model Availability

Availability must distinguish:

```text
PROVIDER-AVAILABLE

API-AVAILABLE

MODEL-ENDPOINT-AVAILABLE

MODEL-PROFILE-ELIGIBLE

ASSIGNMENT-ELIGIBLE

ROUTING-ELIGIBLE

REQUEST-CAPACITY-AVAILABLE

ACTIVE

HEALTHY

LIVE-TESTED

PRODUCTION-CONTROLLED
```

These states must not be collapsed.

---

# 90. Model Availability States

```text
UNKNOWN

PROVIDER-UNAVAILABLE

MODEL-UNAVAILABLE

REGION-UNAVAILABLE

RATE-LIMITED

CAPACITY-LIMITED

COST-BLOCKED

DATA-BLOCKED

AVAILABLE

PARTIALLY-AVAILABLE

DEGRADED

UNAVAILABLE

SUSPENDED

QUARANTINED

RETIRED
```

Unknown availability must not be reported as available.

---

# 91. Model Health States

```text
HEALTHY

WATCH

DEGRADED

QUALITY-DEGRADED

SAFETY-DEGRADED

LATENCY-DEGRADED

COST-DEGRADED

RATE-LIMITED

UNAVAILABLE

COMPROMISED

SUSPENDED

QUARANTINED

RETIRED

UNKNOWN
```

---

# 92. Rate Limits

Rate limits may apply at:

- provider level;
- Model level;
- account level;
- Organization level;
- Product level;
- Project level;
- Tenant level;
- Agent level;
- Task level;
- time-window level.

Rate limits must be observable and attributable.

---

# 93. Concurrency Limits

Concurrency limits should consider:

- provider quota;
- Model quota;
- Product capacity;
- Project capacity;
- Tenant fairness;
- budget;
- Human-review capacity;
- Tool capacity;
- workflow capacity;
- latency targets;
- failure recovery.

---

# 94. Cost Controls

Model cost controls may include:

- input cost;
- output cost;
- cached-input cost;
- image cost;
- audio cost;
- Tool-call cost;
- request cost;
- retry cost;
- daily Agent limit;
- monthly Agent limit;
- Product budget;
- Project budget;
- Tenant budget;
- provider budget;
- hard stop.

---

# 95. Cost Attribution

Model cost should be attributable to:

- provider;
- Model;
- Model version;
- Agent;
- Team;
- Department;
- Capability;
- Product;
- Project;
- Tenant;
- Customer;
- workflow;
- Task.

---

# 96. Latency Controls

Latency should distinguish:

- routing latency;
- provider-connection latency;
- time to first token;
- total generation latency;
- Tool-related latency;
- retry latency;
- fallback latency;
- end-to-end Task latency.

---

# 97. Quality Controls

Quality monitoring may include:

- acceptance rate;
- first-pass quality;
- error rate;
- hallucination rate where objectively measurable;
- structured-output validity;
- citation accuracy;
- code-test success;
- Human-correction rate;
- rework;
- Customer correction;
- regression.

---

# 98. Safety Controls

Safety monitoring may include:

- prohibited-output rate;
- refusal quality;
- unsafe recommendation rate;
- authority-violation rate;
- scope-violation rate;
- prompt-injection events;
- secret-exposure events;
- cross-Project events;
- cross-Tenant events;
- suspension compliance.

---

# 99. Security Controls

Security controls should include:

- prompt-injection protection;
- indirect-injection protection;
- secret prevention;
- output scanning;
- Tool-call validation;
- Data exfiltration controls;
- context isolation;
- logging;
- anomaly detection;
- incident response;
- emergency suspension.

---

# 100. Privacy Controls

Privacy controls should include:

- purpose limitation;
- Data minimization;
- masking;
- redaction;
- anonymization;
- regional processing;
- provider retention control;
- provider training restrictions;
- Customer approval where required;
- deletion processes;
- audit.

---

# 101. Compliance Controls

Compliance controls may include:

- policy validation;
- contractual restrictions;
- legal restrictions;
- jurisdiction;
- record retention;
- evidence retention;
- required Human professional review;
- Customer communication controls;
- approved disclaimers;
- exception controls.

---

# 102. Model Monitoring

Monitoring should include:

- provider health;
- Model endpoint health;
- Model version;
- Assignment validity;
- routing decisions;
- fallback events;
- request volume;
- token use;
- context use;
- output size;
- latency;
- rate limits;
- cost;
- quality;
- safety;
- Security;
- privacy;
- Data eligibility;
- denied requests;
- cross-scope attempts;
- evaluation expiry;
- certification expiry;
- suspension events;
- provider incidents.

---

# 103. Model Drift

Model drift occurs when current behavior differs materially from evaluated
behavior.

Potential causes include:

- provider update;
- hidden provider change;
- Model version change;
- prompt change;
- Tool change;
- memory change;
- workflow change;
- Data change;
- region change;
- provider policy change;
- safety-system change.

---

# 104. Model Drift Detection

Drift may be detected through:

- quality decline;
- safety decline;
- latency change;
- cost change;
- changed refusal behavior;
- changed structured-output behavior;
- increased Human correction;
- increased hallucination;
- failed spot evaluations;
- changed provider documentation;
- incident analysis;
- Customer corrections.

---

# 105. Model Drift Record

```yaml
model_drift:
  drift_id: required

  provider_id: required
  model_id: required
  model_version_id: required
  model_profile_id: required

  detected_at: required
  detection_method: required

  affected_assignments: required
  affected_capabilities: required
  affected_products: required
  affected_projects: conditional
  affected_tenants: conditional
  affected_customers: conditional

  suspected_changes: required
  confirmed_changes: conditional
  risk_class: required

  temporary_restrictions: required
  routing_changes: required
  fallback_required: required
  suspension_required: required

  remediation_owner: required
  re_evaluation_required: required
  evidence_references: required
  status: required
```

---

# 106. Model Degradation

A Model is degraded when one or more approved operating conditions no longer
meet healthy requirements.

Degradation may involve:

- quality;
- safety;
- Security;
- privacy;
- availability;
- latency;
- cost;
- rate limits;
- context limits;
- output validity;
- provider behavior;
- regional service.

---

# 107. Model Degradation Record

```yaml
model_degradation:
  degradation_id: required

  provider_id: required
  model_id: required
  model_version_id: required
  model_profile_id: required

  affected_dimensions: required
  affected_assignments: required
  affected_scope: required

  severity: required
  detected_at: required

  suspected_causes: required
  confirmed_causes: conditional

  temporary_restrictions: required
  remaining_safe_scope: required
  routing_change_required: required
  fallback_required: required

  remediation_owner: required
  remediation_plan: required
  due_at: required

  suspension_required: required
  quarantine_required: required

  evidence_references: required
  status: required
```

---

# 108. Model Degradation Response

```text
Degradation Detected
    ↓
Provider, Model, Version, Profile, and Scope Identified
    ↓
Metrics and Evidence Validated
    ↓
Temporary Routing Restriction Applied
    ↓
Fallback Activated Where Approved
    ↓
Root Cause Investigated
    ↓
Provider, Model, Prompt, Tool, Memory, or Workflow Corrected
    ↓
Evaluation Repeated
    ↓
Controlled Observation
    ↓
Healthy, Restricted, Suspended, Quarantined, Replaced, or Retired
```

---

# 109. Model Restriction

Restriction may reduce:

- permitted capabilities;
- permitted Task types;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- environment;
- region;
- Data classes;
- context limit;
- output limit;
- autonomy;
- Tool use;
- memory use;
- cost;
- concurrency;
- Production access.

---

# 110. Model Suspension

Model use should be suspended when:

- provider compromise is suspected;
- Model behavior becomes unsafe;
- Data eligibility fails;
- cross-Project leakage occurs;
- cross-Tenant leakage occurs;
- Customer Data disclosure occurs;
- secret exposure occurs;
- evaluation expires for critical use;
- certification expires;
- routing violates scope;
- evidence is fabricated;
- monitoring is unavailable for critical use;
- provider terms materially change;
- valid Governance instruction exists.

---

# 111. Model Suspension Procedure

Model suspension must:

1. identify provider, Model, version, and profiles;
2. identify affected Assignments;
3. block new Model requests;
4. disable affected routing;
5. disable affected fallback routes;
6. stop or contain active high-risk work;
7. restrict dependent Agents;
8. restrict dependent capabilities;
9. preserve requests, outputs, and evidence;
10. identify affected Products and Projects;
11. identify affected Tenants and Customers;
12. notify accountable owners;
13. create incident or review record;
14. select approved alternative where available;
15. define remediation;
16. define reactivation conditions;
17. verify suspension effectiveness.

---

# 112. Model Quarantine

A Model, version, provider, Profile, or route may be quarantined when:

- malicious behavior is suspected;
- provider compromise is suspected;
- supply-chain compromise is suspected;
- evidence integrity is uncertain;
- cross-Tenant leakage may have occurred;
- unexpected Model change is detected;
- outputs cannot be trusted.

Quarantined Model routes must not support normal Agent execution.

---

# 113. Model Reactivation

Reactivation requires:

- root cause resolved;
- provider still approved;
- Model Definition still approved;
- exact version revalidated;
- Model Profile revalidated;
- Data eligibility revalidated;
- Product and Project scopes revalidated;
- Tenant and Customer scopes revalidated;
- environment and region revalidated;
- evaluation repeated;
- certification renewed where required;
- routing and fallback revalidated;
- monitoring restored;
- evidence validated;
- explicit approval.

---

# 114. Model Revocation

Revocation removes Model authority because of:

- malicious or unsafe use;
- serious policy violation;
- fabricated evidence;
- repeated Data violations;
- legal restriction;
- critical Security incident;
- unacceptable privacy Risk;
- inability to remediate;
- Governance decision.

Revoked Assignments must not be restored through routine renewal.

---

# 115. Model Replacement

Replacement may be required because of:

- Model retirement;
- provider retirement;
- unacceptable Risk;
- unacceptable quality;
- unacceptable cost;
- unacceptable latency;
- provider terms change;
- regional restriction;
- better approved alternative;
- Product strategy change;
- Project requirement change.

---

# 116. Model Replacement Process

```text
Replacement Need
    ↓
Alternative Provider or Model Evaluated
    ↓
Security, Privacy, Data, Legal, Quality, Cost, and Architecture Review
    ↓
New Model Definition Approved
    ↓
New Model Profile Approved
    ↓
Agent Assignments Evaluated
    ↓
Restricted Parallel Operation
    ↓
Outcome Comparison
    ↓
Routing Migration
    ↓
Old Model Restriction
    ↓
Old Model Retirement
```

---

# 117. Model Deprecation

A Model may be deprecated when:

- no new Assignments should be created;
- provider support is ending;
- a replacement exists;
- the version is obsolete;
- Risk becomes unacceptable;
- Data handling is no longer acceptable;
- quality becomes insufficient;
- cost becomes unjustified.

Deprecation must identify:

- replacement;
- affected Profiles;
- affected Assignments;
- affected routing;
- affected fallback;
- affected Products;
- affected Projects;
- migration deadline;
- exceptions;
- retirement date.

---

# 118. Model Retirement

Model retirement must include:

- blocking new Profiles;
- blocking new Assignments;
- removing routing;
- removing fallback routes;
- ending active sessions where required;
- revoking credentials where exclusive;
- updating Agent Definitions;
- updating capabilities;
- updating prompts;
- updating workflows;
- preserving evidence;
- preserving evaluation history;
- preserving audit;
- confirming no executable route remains;
- updating Registry state.

---

# 119. Provider Retirement

Provider retirement must include:

- replacing active Models;
- migrating routing;
- closing accounts where applicable;
- revoking credentials;
- exporting required evidence;
- validating Data deletion;
- validating contractual closure;
- closing billing;
- preserving audit;
- updating Provider Registry state.

---

# 120. Model Archival

Archived Model records should preserve:

- Provider Definitions;
- Model Definitions;
- Model versions;
- Model Profiles;
- Agent Model Assignments;
- routing profiles;
- fallback profiles;
- evaluations;
- certifications;
- incidents;
- restrictions;
- suspensions;
- revocations;
- replacement evidence;
- retirement evidence.

Archived Models must not remain routable.

---

# 121. Model Versioning

Registry-controlled Model Definition documents should use:

```text
MAJOR.MINOR.PATCH
```

Provider Model versions should preserve exact provider identifiers separately.

## Major

Used for incompatible Governance changes such as:

- changed provider;
- changed Model family;
- changed Data eligibility;
- increased Risk;
- new modality;
- new Production use;
- changed regional processing;
- changed routing architecture.

## Minor

Used for backward-compatible additions.

## Patch

Used for non-material corrections or clarifications.

---

# 122. Material Change Triggers

Re-evaluation may be required after changes to:

- provider;
- Model Definition;
- Model version;
- Model Profile;
- Agent Definition;
- prompt;
- Tool Profile;
- memory profile;
- workflow;
- Data;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- Risk;
- context limit;
- pricing;
- provider terms;
- provider retention;
- provider training behavior;
- monitoring.

---

# 123. Model Registry Authority

The future Model Registry should be authoritative for:

- Model identity;
- Model Definition version;
- provider;
- Model family;
- modalities;
- supported inputs and outputs;
- context limits;
- output limits;
- Data eligibility;
- region;
- Risk;
- ownership;
- lifecycle state;
- approval state;
- review date;
- deprecation;
- retirement.

---

# 124. Provider Registry Authority

The future Provider Registry should be authoritative for:

- provider identity;
- provider type;
- legal and contractual references;
- supported regions;
- authentication methods;
- Data-processing behavior;
- retention behavior;
- provider training behavior;
- provider Risk;
- lifecycle state;
- approval state.

---

# 125. Model Profile Registry Authority

The future Model Profile Registry should be authoritative for:

- approved Model configuration;
- exact Model version;
- approved purpose;
- Agent eligibility;
- Capability and Skill scope;
- prompt dependencies;
- Tool dependencies;
- memory dependencies;
- Data eligibility;
- routing;
- fallback;
- cost;
- monitoring;
- expiry.

---

# 126. Registry Boundary

The Model Registry must not replace:

- Provider account management;
- Agent Registry;
- Role Registry;
- Skill Registry;
- Capability Registry;
- Tool Registry;
- Prompt Registry;
- Memory Registry;
- Workflow Registry;
- credential broker;
- permission system;
- allocation system;
- evaluation system;
- evidence store;
- audit system;
- cost ledger;
- monitoring system.

---

# 127. Registry Source-of-Truth Rules

The Model Registry is authoritative for:

```text
What the Model is

Which provider supplies it

Which exact versions are registered

Which modalities and limits apply

Which Data and regional scopes are permitted

Which Risk applies

Which lifecycle state applies
```

Runtime systems remain authoritative for:

- provider health;
- endpoint health;
- current quotas;
- current latency;
- current cost;
- runtime eligibility;
- routing;
- fallback;
- Model invocation;
- incidents;
- suspension enforcement.

---

# 128. Model Discovery

Model discovery should support search by:

- Model name;
- Model ID;
- provider;
- family;
- category;
- modality;
- input type;
- output type;
- context limit;
- Product;
- Project;
- Tenant eligibility;
- environment;
- region;
- Data class;
- Risk;
- cost;
- latency;
- lifecycle state;
- availability state.

---

# 129. Model Matching

Model matching should compare:

- required capability;
- required Skill;
- required modality;
- required input type;
- required output type;
- required context;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- Data class;
- Risk;
- evaluation;
- certification;
- Assignment;
- availability;
- quality;
- safety;
- cost;
- latency;
- fallback.

---

# 130. Model Evidence

Every material Model lifecycle or runtime event should produce or reference
evidence.

Evidence may include:

- Provider Definition;
- Model Definition;
- Model version;
- Model Profile;
- Data Eligibility Profile;
- Agent Model Assignment;
- routing profile;
- fallback profile;
- evaluation;
- certification;
- Model request;
- routing result;
- provider response;
- output validation;
- cost;
- monitoring;
- incident;
- suspension;
- replacement;
- retirement.

---

# 131. Model Invocation Evidence Record

```yaml
model_invocation:
  invocation_id: required

  task_id: required
  workflow_id: conditional
  envelope_id: required

  agent_definition_id: required
  agent_instance_id: required

  provider_id: required
  model_id: required
  model_version_id: required
  model_profile_id: required
  assignment_id: required
  routing_profile_id: required
  fallback_profile_id: conditional

  organization_id: required
  product_id: required
  project_id: conditional
  tenant_id: conditional
  customer_id: conditional
  environment: required
  region: required
  data_classification: required

  prompt_profile_ids: required
  tool_profile_ids: conditional
  memory_profile_ids: conditional

  authority_reference: required
  approval_reference: conditional
  data_eligibility_reference: required

  input_digest: required
  output_digest: required

  input_units: required
  output_units: required
  context_utilization: required

  started_at: required
  completed_at: conditional

  result: required
  fallback_used: required
  retry_count: required

  latency_ms: required
  cost: required

  quality_status: required
  safety_status: required
  security_status: required
  privacy_status: required

  limitations: required
  residual_risks: required
  evidence_reference: required
```

---

# 132. Model Evidence Quality

```text
MEV-0 — No Evidence

MEV-1 — Agent or Provider Claim

MEV-2 — Human-Reviewed Model Record

MEV-3 — Provider or Runtime Invocation Record

MEV-4 — Controlled Model Evaluation Evidence

MEV-5 — Runtime Operational Model Evidence

MEV-6 — Independent or Audited Model Evidence
```

Production Model claims require appropriate runtime evidence.

---

# 133. Model Audit

A Model Registry audit should verify:

- unique Provider and Model IDs;
- current Definition versions;
- exact provider Model references;
- owners;
- Model categories;
- modalities;
- context limits;
- output limits;
- Data eligibility;
- regions;
- environments;
- Risk;
- Model Profiles;
- Agent Model Assignments;
- prompt dependencies;
- Tool dependencies;
- memory dependencies;
- evaluations;
- certifications;
- routing profiles;
- fallback profiles;
- cost;
- monitoring;
- expiry;
- restrictions;
- suspensions;
- quarantines;
- revocations;
- deprecated Models;
- retired Models;
- unsupported runtime claims;
- duplicate Model records.

---

# 134. Model Reporting

Model reporting should distinguish:

```text
Defined Providers

Approved Providers

Defined Models

Approved Models

Registered Model Versions

Approved Model Profiles

Proposed Agent Model Assignments

Approved Agent Model Assignments

Runtime-Eligible Model Assignments

Active Model Assignments

Restricted Model Assignments

Suspended Model Assignments

Quarantined Models

Expired Model Assignments

Revoked Model Assignments

Deprecated Models

Retired Models

Production-Controlled Models
```

One undefined `Total Models` number is insufficient.

---

# 135. Model Metrics

Potential metrics include:

| Metric | Definition |
|---|---|
| Registry Completeness | Complete Model Definitions / registered Model Definitions |
| Provider Compliance | Approved providers satisfying required controls / approved providers |
| Version Currency | Current approved Model versions / active Model versions |
| Profile Compliance | Valid Model Profiles / approved active Profiles |
| Runtime Eligibility | Runtime-eligible Assignments / approved active Assignments |
| Model Availability | Healthy Model route time / expected route time |
| Routing Success | Successful eligible routing decisions / routing requests |
| Fallback Compliance | Approved fallback events / fallback events |
| Quality Acceptance | Accepted Model-supported outputs / reviewed outputs |
| Safety Compliance | Model invocations without confirmed safety violation / reviewed invocations |
| Data Eligibility Compliance | Eligible Data invocations / reviewed invocations |
| Cost Attribution | Attributed Model cost / material Model cost |
| Latency Compliance | Invocations within approved latency / measured invocations |
| Evidence Completeness | Material invocations with complete evidence / material invocations |
| Cross-Project Violation Rate | Unauthorized cross-Project Model events |
| Cross-Tenant Violation Rate | Unauthorized cross-Tenant Model events |
| Suspension Effectiveness | Successfully blocked Model requests / suspension tests or incidents |
| Retirement Completeness | Retired Models with all routes removed / retired Models |

Numerical targets require separate approval.

---

# 136. One-Agent Model Proof

The first Model Registry proof should include:

```text
1 Approved Provider Definition

1 Approved Model Definition

1 Approved Exact Model Version

1 Approved Model Profile

1 Approved Data Eligibility Profile

1 Approved Evaluation Profile

1 Approved Agent Definition

1 Runtime Agent Instance

1 Approved Role

1 Valid Skill

1 Approved Capability

1 Agent Model Assignment

1 Product

1 Project

1 Non-Production Environment

1 Approved Region

1 Low-Risk Data Class

1 Controlled Evaluation

1 Routing Profile

1 Runtime Eligibility Decision

1 Model Invocation

1 Output Review

1 Verifiable-Work Envelope

1 Suspension Test

1 Retirement Test
```

---

# 137. Multi-Model Routing Proof

A Multi-Model proof should verify:

- one primary Model;
- one approved alternative;
- matching Data eligibility;
- matching region;
- matching Product and Project scope;
- quality comparison;
- safety comparison;
- cost comparison;
- latency comparison;
- controlled routing;
- fallback evidence;
- no unauthorized fallback.

---

# 138. Multi-Agent Model Proof

A Multi-Agent proof should verify:

- distinct Agent identities;
- distinct Agent Model Assignments;
- distinct Roles;
- model-use attribution;
- cost attribution;
- context isolation;
- Tool and memory compatibility;
- contributor evidence;
- one Agent suspension;
- Team outcome.

---

# 139. Multi-Project Model Proof

A Multi-Project proof should verify:

- separate Project Assignments;
- separate prompt overlays;
- separate memory;
- separate Data;
- separate routing evidence;
- separate cost;
- denied cross-Project context;
- Project closure;
- Assignment removal.

---

# 140. Multi-Tenant Model Proof

A Multi-Tenant proof should verify:

- Tenant-scoped requests;
- Tenant-scoped context;
- Tenant-scoped memory;
- Tenant-scoped Data;
- Tenant-specific evidence;
- Tenant cost attribution;
- denied cross-Tenant context;
- Tenant offboarding;
- runtime eligibility removal.

---

# 141. Customer Model Proof

A Customer Model proof should verify:

- approved Customer scope;
- approved Product;
- approved Project;
- approved Tenant;
- Customer Data eligibility;
- approved region;
- approved use case;
- Human owner;
- communication boundary;
- evaluation;
- evidence;
- expiry;
- suspension.

---

# 142. Production Model Gate

Before an Agent uses a Model in Production:

- [ ] Provider Definition is approved.
- [ ] Provider Risk is accepted.
- [ ] legal and contractual review is current.
- [ ] Security review is current.
- [ ] privacy review is current.
- [ ] Data-processing review is current.
- [ ] Model Definition is approved.
- [ ] exact Model version is approved.
- [ ] Model Profile is approved.
- [ ] Data Eligibility Profile is approved.
- [ ] Agent Definition is approved.
- [ ] Agent Instance is Production-controlled.
- [ ] Role permits the Model use.
- [ ] required Skills are current.
- [ ] Capability permits the Model use.
- [ ] Agent Model Assignment is approved.
- [ ] Product scope is exact.
- [ ] Project scope is exact.
- [ ] Tenant scope is exact.
- [ ] Customer scope is exact.
- [ ] environment is Production-specific.
- [ ] region is approved.
- [ ] Data classes are approved.
- [ ] prompt versions are current.
- [ ] Tool Profiles are approved.
- [ ] memory profiles are approved.
- [ ] workflow is approved.
- [ ] Risk ceiling is valid.
- [ ] evaluation is current.
- [ ] certification is current where required.
- [ ] routing profile is approved.
- [ ] fallback profile is approved where used.
- [ ] cost limits are active.
- [ ] rate and concurrency limits are active.
- [ ] context limits are active.
- [ ] output limits are active.
- [ ] quality monitoring is active.
- [ ] safety monitoring is active.
- [ ] Security monitoring is active.
- [ ] privacy monitoring is active.
- [ ] audit is active.
- [ ] evidence capture is active.
- [ ] routing suspension is tested.
- [ ] fallback suspension is tested.
- [ ] provider incident response is ready.
- [ ] qualified Human review exists.
- [ ] explicit Production approval exists.
- [ ] Founder approval exists where required.

---

# 143. Production Observation Window

A newly Production-authorized Model Assignment should operate under a bounded
observation window.

The window should define:

- duration;
- Agent;
- provider;
- Model;
- exact version;
- approved capabilities;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- Data classes;
- workload;
- context limits;
- output limits;
- cost;
- latency;
- Human review;
- quality thresholds;
- safety thresholds;
- evidence requirements;
- suspension conditions;
- expansion criteria.

---

# 144. Model Hard Stops

The following should normally block or suspend Model use:

- fabricated evidence;
- fabricated Human approval;
- unapproved provider;
- unapproved Model;
- unapproved Model version;
- unapproved fallback;
- prohibited Data use;
- prohibited region use;
- cross-Project context leakage;
- cross-Tenant context leakage;
- Customer Data disclosure;
- secret exposure;
- critical prompt-injection success;
- unsafe Tool action recommendation;
- ignored suspension;
- Production use without Production authority;
- critical Security compromise;
- critical privacy failure.

---

# 145. Model Exceptions

A Model exception must define:

- exception ID;
- provider;
- Model;
- version;
- Model Profile;
- Agent Model Assignment;
- control being bypassed;
- exact reason;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- Data class;
- Risk;
- compensating controls;
- Human owner;
- approver;
- start;
- expiry;
- monitoring;
- closure condition;
- evidence.

Exceptions must not permit:

- fabricated evidence;
- self-approval;
- prohibited Data processing;
- cross-Tenant leakage;
- unrestricted Production use;
- permanent emergency authority;
- constitutional bypass.

---

# 146. Model Conflict

Model conflicts may include:

- duplicate Model purpose;
- incompatible Data eligibility;
- incompatible regions;
- routing conflict;
- fallback conflict;
- prompt incompatibility;
- Tool incompatibility;
- memory incompatibility;
- Product conflict;
- Project conflict;
- Tenant conflict;
- cost conflict;
- quality conflict;
- provider conflict;
- Security conflict;
- privacy conflict.

---

# 147. Model Conflict Record

```yaml
model_conflict:
  conflict_id: required

  provider_ids: required
  model_ids: required
  model_version_ids: conditional
  model_profile_ids: conditional
  routing_profile_ids: conditional

  conflict_type: required
  affected_scope: required
  affected_products: required
  affected_projects: conditional
  affected_tenants: conditional
  affected_customers: conditional

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

# 148. Model Portability

A Model Profile may be reused across Products or Projects only when:

- use case remains equivalent;
- prompt behavior remains compatible;
- Tool behavior remains compatible;
- memory behavior remains compatible;
- Data rules remain compatible;
- region remains compatible;
- Risk remains equal or lower;
- evaluation confirms portability;
- approval exists.

---

# 149. Non-Portable Model Profiles

A Model Profile may be non-portable because of:

- Product-specific prompts;
- Project-specific context;
- Tenant-specific Data;
- Customer-specific restrictions;
- regional law;
- provider-region limitation;
- regulated workflow;
- Tool dependency;
- environment-specific Risk;
- contractual restriction.

---

# 150. Model Profile Inheritance

Model Profiles may inherit approved restrictions.

```text
Enterprise Base Model Policy
        ↓
Department Model Policy
        ↓
Role Model Policy
        ↓
Agent Definition Model Profile
        ↓
Product or Project Overlay
        ↓
Tenant or Customer Overlay
        ↓
Agent Model Assignment
```

Inheritance may add stricter controls.

It must not remove mandatory higher-level restrictions.

---

# 151. Model Anti-Gaming Controls

Model systems must prevent:

- counting provider access as Model approval;
- counting Model approval as Agent eligibility;
- reporting provider benchmarks as Mianx.ai runtime results;
- choosing only easy evaluation Tasks;
- hiding failed scenarios;
- hiding Human correction;
- changing evaluation criteria after failure;
- using a cheaper unapproved fallback;
- changing Model aliases silently;
- reporting simulated quality as Production quality;
- transferring cost to another Product;
- excluding fallback failures;
- hiding Data-eligibility denials;
- using one Model Assignment across unrelated Tenants.

---

# 152. Model Risks

| Risk | Required Response |
|---|---|
| Provider availability treated as approval | Maintain separate provider and Model approvals |
| Model alias changes silently | Use exact version controls |
| Benchmark treated as suitability proof | Require Mianx.ai evaluation |
| Model treated as Agent | Preserve Agent-level Governance |
| Large context treated as safe context | Enforce context minimization |
| Sensitive Data sent to ineligible Model | Enforce Data Eligibility Profile |
| Cross-Project context leakage | Use Project-scoped Assignments |
| Cross-Tenant context leakage | Use Tenant-scoped context and memory |
| Unapproved fallback | Enforce fallback policy |
| Provider lock-in | Maintain exit and replacement plans |
| Model drift | Monitor and re-evaluate |
| Cost explosion | Apply budgets and routing limits |
| Quality decline | Restrict routing and activate approved fallback |
| Safety decline | Suspend affected use |
| Provider terms change | Re-review legal, privacy, and Data controls |
| Agent self-selects Model | Enforce routing policy |
| New Model assumed superior | Require comparative evaluation |
| Retired Model remains routable | Remove every route and Assignment |

---

# 153. Model Anti-Patterns

Mianx.ai must avoid:

- one universal Model for every Agent and Task;
- using provider `latest` aliases for high-risk Production use;
- routing sensitive Data without eligibility checks;
- using one Model Profile across unrelated Tenants;
- using Development Model Assignments in Production;
- treating larger Models as automatically better;
- treating expensive Models as automatically more accurate;
- allowing Agents to choose unapproved Models;
- allowing fallback to bypass Data rules;
- ignoring Model drift;
- hiding provider outages;
- hiding fallback events;
- reporting benchmark scores as business outcomes;
- using Models without cost attribution;
- using Models without evidence;
- retaining retired Model routes;
- claiming implementation from documentation.

---

# 154. Prohibited Model Behaviors

An Agent must not:

- register its own approved provider;
- register its own approved Model;
- approve its own Model Profile;
- assign itself a Model;
- select an unapproved Model;
- select an unapproved Model version;
- change its own routing rules;
- change its own fallback rules;
- expand Product scope;
- expand Project scope;
- expand Tenant scope;
- expand Customer scope;
- change environment scope;
- change region scope;
- change Data eligibility;
- increase context limits;
- increase cost limits;
- disable safety monitoring;
- disable Security monitoring;
- disable privacy monitoring;
- hide fallback use;
- hide Model failure;
- fabricate Model evidence;
- continue Model use after suspension;
- retain Model access after retirement.

---

# 155. Current Verified Baseline

At the time this document is created:

```yaml
documentation:
  model_registry_document:
    id: AIW-REG-MODEL-001
    version: 1.0.0
    status: Draft
    canonical: false

target_state:
  provider_definition_model: defined
  model_definition_model: defined
  model_version_model: defined
  model_profile_model: defined
  agent_model_assignment_model: defined
  routing_profile_model: defined
  fallback_profile_model: defined
  data_eligibility_model: defined
  model_categories: 16
  runtime_eligibility_model: defined
  production_model_gate: defined

implementation:
  provider_registry: not_implemented
  model_registry: not_implemented
  model_profile_registry: not_implemented
  model_policy_engine: not_implemented
  model_routing_engine: not_implemented
  model_evaluation_engine: not_implemented
  runtime_model_eligibility: not_verified
  automated_model_suspension: not_verified
  automated_model_quarantine: not_verified

runtime:
  approved_provider_definitions: 0_proven
  approved_model_definitions: 0_proven
  approved_model_versions: 0_proven
  approved_model_profiles: 0_proven
  active_agent_model_assignments: 0_proven
  runtime_eligible_model_assignments: 0_proven
  production_authorized_model_assignments: 0_proven
```

---

# 156. Current-State Boundary

This document does not prove that Mianx.ai currently has:

- an implemented Provider Registry;
- an implemented Model Registry;
- an implemented Model Profile Registry;
- an implemented Model Policy Engine;
- an implemented Model Routing Engine;
- an implemented Model Evaluation Engine;
- approved provider Definitions;
- approved Model Definitions;
- approved Model versions;
- approved Model Profiles;
- active Agent Model Assignments;
- runtime Data eligibility;
- runtime Model eligibility;
- runtime Model routing;
- approved fallback routing;
- automated cost routing;
- automated Model drift detection;
- automated Model suspension;
- automated Model quarantine;
- Production-authorized Model operation.

This document defines target-state Model Registry Governance only.

---

# 157. Adoption Requirements

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
- [ ] Capability Registry alignment is confirmed.
- [ ] Skill Registry alignment is confirmed.
- [ ] Tool Registry alignment is confirmed.
- [ ] Provider Definition schema is approved.
- [ ] Model Definition schema is approved.
- [ ] Model Version schema is approved.
- [ ] Model Profile schema is approved.
- [ ] Agent Model Assignment schema is approved.
- [ ] Routing Profile schema is approved.
- [ ] Fallback Profile schema is approved.
- [ ] Data Eligibility Profile schema is approved.
- [ ] Provider and Model ID standards are approved.
- [ ] Model categories are approved.
- [ ] modalities are approved.
- [ ] input and output types are approved.
- [ ] context and output-limit controls are approved.
- [ ] ownership model is approved.
- [ ] Product and Project scopes are approved.
- [ ] Tenant and Customer scopes are approved.
- [ ] environment and regional scopes are approved.
- [ ] Data-classification rules are approved.
- [ ] Data minimization controls are approved.
- [ ] provider-retention classifications are approved.
- [ ] provider-training-use classifications are approved.
- [ ] Model Risk model is approved.
- [ ] Provider Risk model is approved.
- [ ] Model Definition lifecycle is approved.
- [ ] Provider lifecycle is approved.
- [ ] Model Version lifecycle is approved.
- [ ] Agent Model Assignment lifecycle is approved.
- [ ] Model proposal process is approved.
- [ ] provider review is approved.
- [ ] duplication review is approved.
- [ ] Model approval process is approved.
- [ ] Model evaluation process is approved.
- [ ] quality evaluation is approved.
- [ ] safety evaluation is approved.
- [ ] Security evaluation is approved.
- [ ] privacy evaluation is approved.
- [ ] certification process is approved.
- [ ] assignment eligibility is approved.
- [ ] runtime eligibility calculation is approved.
- [ ] conditional eligibility is approved.
- [ ] Model request and matching are approved.
- [ ] routing policy is approved.
- [ ] fallback policy is approved.
- [ ] no-fallback conditions are approved.
- [ ] availability and health states are approved.
- [ ] rate and concurrency controls are approved.
- [ ] cost controls are approved.
- [ ] latency controls are approved.
- [ ] quality and safety monitoring are approved.
- [ ] Security and privacy monitoring are approved.
- [ ] Model drift controls are approved.
- [ ] degradation and restriction are approved.
- [ ] suspension and quarantine are approved.
- [ ] reactivation and revocation are approved.
- [ ] replacement, deprecation, retirement, and archival are approved.
- [ ] versioning and material-change rules are approved.
- [ ] Registry authorities are approved.
- [ ] Registry boundaries are approved.
- [ ] source-of-truth rules are approved.
- [ ] discovery and matching are approved.
- [ ] evidence model is approved.
- [ ] audit and reporting are approved.
- [ ] Production Model gate is approved.
- [ ] hard stops are approved.
- [ ] exception controls are approved.
- [ ] conflict and portability controls are approved.
- [ ] inheritance rules are approved.
- [ ] anti-gaming controls are approved.
- [ ] Provider Registry is implemented.
- [ ] Model Registry is implemented.
- [ ] Model Profile Registry is implemented.
- [ ] Model Policy Engine is implemented.
- [ ] Model Routing Engine is implemented.
- [ ] Model Evaluation Engine is implemented.
- [ ] runtime Data eligibility is implemented.
- [ ] runtime Model eligibility is implemented.
- [ ] routing and fallback are technically enforced.
- [ ] suspension is technically enforced.
- [ ] quarantine is technically enforced.
- [ ] one-Agent Model proof passes.
- [ ] Multi-Model routing proof passes.
- [ ] Multi-Agent Model proof passes.
- [ ] Multi-Project Model proof passes.
- [ ] Multi-Tenant Model proof passes where applicable.
- [ ] Customer Model proof passes.
- [ ] Production Model proof passes.
- [ ] `INDEX.md` is updated.
- [ ] `ROADMAP.md` is updated.
- [ ] `CHANGELOG.md` is updated.

---

# 158. Review Questions

Reviewers should answer:

1. Is Provider Definition separated from Model Definition?
2. Is Model Definition separated from Model version?
3. Is Model version separated from Model Profile?
4. Is Model Profile separated from Agent Model Assignment?
5. Is Agent Model Assignment separated from runtime eligibility?
6. Is runtime eligibility separated from Production authority?
7. Are Models separated from Agents?
8. Are Models separated from Skills and capabilities?
9. Are Models separated from Tools and prompts?
10. Are exact Model versions controlled?
11. Are unstable aliases restricted?
12. Are Model categories and modalities complete?
13. Are input and output types explicit?
14. Are context and output limits controlled?
15. Are truncation risks addressed?
16. Is Model ownership explicit?
17. Is provider ownership explicit?
18. Are Product and Project boundaries explicit?
19. Are Tenant and Customer boundaries explicit?
20. Are environment and regional boundaries explicit?
21. Are Data classes explicit?
22. Are sensitive Data controls sufficient?
23. Are secrets excluded?
24. Is provider retention recorded?
25. Is provider training behavior recorded?
26. Is Model Risk use-case-specific?
27. Is Provider Risk separately evaluated?
28. Is the Model lifecycle complete?
29. Is the provider lifecycle complete?
30. Does a new Model version require review?
31. Can Provider approval approve every Model?
32. Can Model approval create an Agent Assignment?
33. Is Model evaluation configuration-specific?
34. Are critical failures explicit?
35. Are quality, safety, Security, and privacy evaluated separately?
36. Is certification time-bounded?
37. Is runtime eligibility calculated from all controls?
38. Is unknown eligibility prevented from appearing eligible?
39. Is routing scope-aware?
40. Can routing expand authority?
41. Can fallback reduce Data protection?
42. Are no-fallback conditions explicit?
43. Are availability and health distinct?
44. Are cost and latency controlled?
45. Is Model drift detectable?
46. Can one Model route be suspended immediately?
47. Is quarantine distinct from suspension?
48. Does reactivation require full revalidation?
49. Does retirement remove all routes?
50. Are Registry authorities and boundaries clear?
51. Are Production gates complete?
52. Are exception controls time-bounded?
53. Are current-state limitations explicit?
54. Are any runtime Model claims unsupported?

---

# 159. Definition of Done

This document is content-complete for review when:

- [ ] purpose is defined;
- [ ] current authority status is explicit;
- [ ] exact strategic hierarchy is included;
- [ ] Model Registry objective is defined;
- [ ] Model Registry principles are defined;
- [ ] non-equivalence rules are defined;
- [ ] Provider Definition is defined;
- [ ] Model Family is defined;
- [ ] Model Definition is defined;
- [ ] Model version is defined;
- [ ] Model Profile is defined;
- [ ] Agent Model Assignment is defined;
- [ ] Routing Profile is defined;
- [ ] Fallback Profile is defined;
- [ ] Evaluation Profile is defined;
- [ ] Data Eligibility Profile is defined;
- [ ] Registry Entry is defined;
- [ ] entity model is defined;
- [ ] ID standards are defined;
- [ ] identity rules are defined;
- [ ] Provider Definition Record is defined;
- [ ] Model Definition Record is defined;
- [ ] Model Version Record is defined;
- [ ] Model Profile Record is defined;
- [ ] Agent Model Assignment Record is defined;
- [ ] Routing Profile Record is defined;
- [ ] Fallback Profile Record is defined;
- [ ] Data Eligibility Profile Record is defined;
- [ ] Model categories are defined;
- [ ] modalities are defined;
- [ ] input types are defined;
- [ ] output types are defined;
- [ ] structured output is defined;
- [ ] context limits are defined;
- [ ] context budgets are defined;
- [ ] truncation controls are defined;
- [ ] output limits are defined;
- [ ] ownership is defined;
- [ ] Product and Project scopes are defined;
- [ ] Tenant and Customer scopes are defined;
- [ ] environment and regional scopes are defined;
- [ ] Data-classification scope is defined;
- [ ] Data minimization is defined;
- [ ] sensitive Data controls are defined;
- [ ] secret handling is defined;
- [ ] provider retention is defined;
- [ ] provider training behavior is defined;
- [ ] Model Risk is defined;
- [ ] Provider Risk is defined;
- [ ] Model Definition lifecycle is defined;
- [ ] provider lifecycle is defined;
- [ ] Model Version lifecycle is defined;
- [ ] Agent Model Assignment lifecycle is defined;
- [ ] Model proposal is defined;
- [ ] provider review is defined;
- [ ] duplication review is defined;
- [ ] Model approval is defined;
- [ ] Model evaluation is defined;
- [ ] Evaluation Profile Record is defined;
- [ ] critical failures are defined;
- [ ] quality evaluation is defined;
- [ ] safety evaluation is defined;
- [ ] Security evaluation is defined;
- [ ] privacy evaluation is defined;
- [ ] certification is defined;
- [ ] assignment eligibility is defined;
- [ ] runtime eligibility is defined;
- [ ] eligibility states are defined;
- [ ] conditional eligibility is defined;
- [ ] Model routing is defined;
- [ ] Model Request is defined;
- [ ] Model Match is defined;
- [ ] routing boundary is defined;
- [ ] preferred Model is defined;
- [ ] fallback routing is defined;
- [ ] no-fallback conditions are defined;
- [ ] availability is defined;
- [ ] availability states are defined;
- [ ] health states are defined;
- [ ] rate limits are defined;
- [ ] concurrency limits are defined;
- [ ] cost controls are defined;
- [ ] cost attribution is defined;
- [ ] latency controls are defined;
- [ ] quality controls are defined;
- [ ] safety controls are defined;
- [ ] Security controls are defined;
- [ ] privacy controls are defined;
- [ ] compliance controls are defined;
- [ ] monitoring is defined;
- [ ] Model drift is defined;
- [ ] drift detection is defined;
- [ ] Model Drift Record is defined;
- [ ] degradation is defined;
- [ ] Degradation Record is defined;
- [ ] degradation response is defined;
- [ ] restriction is defined;
- [ ] suspension is defined;
- [ ] quarantine is defined;
- [ ] reactivation is defined;
- [ ] revocation is defined;
- [ ] replacement is defined;
- [ ] deprecation is defined;
- [ ] retirement is defined;
- [ ] Provider retirement is defined;
- [ ] archival is defined;
- [ ] versioning is defined;
- [ ] material-change triggers are defined;
- [ ] Registry authorities are defined;
- [ ] Registry boundaries are defined;
- [ ] source-of-truth rules are defined;
- [ ] discovery is defined;
- [ ] matching is defined;
- [ ] evidence is defined;
- [ ] Model Invocation Evidence is defined;
- [ ] evidence quality is defined;
- [ ] audit is defined;
- [ ] reporting is defined;
- [ ] metrics are defined;
- [ ] one-Agent proof is defined;
- [ ] Multi-Model proof is defined;
- [ ] Multi-Agent proof is defined;
- [ ] Multi-Project proof is defined;
- [ ] Multi-Tenant proof is defined;
- [ ] Customer proof is defined;
- [ ] Production gate is defined;
- [ ] Production observation window is defined;
- [ ] hard stops are defined;
- [ ] exceptions are defined;
- [ ] conflicts are defined;
- [ ] portability is defined;
- [ ] inheritance is defined;
- [ ] anti-gaming controls are defined;
- [ ] risks are defined;
- [ ] anti-patterns are defined;
- [ ] prohibited behaviors are defined;
- [ ] current verified baseline is defined;
- [ ] current-state boundary is explicit;
- [ ] adoption requirements are defined;
- [ ] next document is identified.

This document becomes Active only after required review, implementation,
evaluation, certification, runtime validation, and approval.

---

# 160. Current Documentation Progress

After this document is saved:

```text
Total Planned AI Workforce Documents = 83

Content Complete for Review = 28

Existing Drafts Needing Alignment Review = 0

Empty Placeholders Remaining = 55

Approved Documents = 0

Active Canonical Documents = 0

Agents Folder Documents Completed = 7 of 7

Capabilities Folder Documents Completed = 4 of 4

Capabilities Folder Content Status = COMPLETE_FOR_REVIEW

Provider Registry Implemented = NO

Model Registry Implemented = NO

Approved Provider Definitions = 0 Proven

Approved Model Definitions = 0 Proven

Approved Model Profiles = 0 Proven

Active Agent Model Assignments = 0 Proven

Runtime-Eligible Model Assignments = 0 Proven

Production-Authorized Model Assignments = 0 Proven
```

---

# 161. Current Document Decision

```text
DOCUMENT_ID=AIW-REG-MODEL-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TARGET_STATE_MODEL_REGISTRY=DEFINED

MODEL_REGISTRY_IMPLEMENTATION=NOT_IMPLEMENTED

PROVIDER_REGISTRY=NOT_IMPLEMENTED

MODEL_PROFILE_REGISTRY=NOT_IMPLEMENTED

MODEL_ROUTING_ENGINE=NOT_IMPLEMENTED

MODEL_EVALUATION_ENGINE=NOT_IMPLEMENTED

MODEL_POLICY_ENGINE=NOT_IMPLEMENTED

RUNTIME_MODEL_ELIGIBILITY=NOT_VERIFIED

RUNTIME_MODEL_ROUTING=NOT_VERIFIED

APPROVED_PROVIDER_DEFINITIONS=0_PROVEN

APPROVED_MODEL_DEFINITIONS=0_PROVEN

APPROVED_MODEL_PROFILES=0_PROVEN

ACTIVE_AGENT_MODEL_ASSIGNMENTS=0_PROVEN

PRODUCTION_AUTHORIZED_MODELS=0_PROVEN

RUNTIME_AGENT_ACTIVATION=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

---

# 162. Revision History

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1.0 | 2026-08-06 | Draft | Initial Model Registry outline |
| 1.0.0 | 2026-08-06 | Draft | Defined Provider Definitions, Model Definitions, Model families, Model versions, Model Profiles, Agent Model Assignments, routing, fallback, Data eligibility, identity, categories, modalities, context limits, ownership, scope, Risk, lifecycles, evaluation, certification, runtime eligibility, availability, quality, safety, Security, privacy, cost, monitoring, drift, degradation, suspension, quarantine, replacement, deprecation, retirement, evidence, audit, proof requirements, Production gates, risks, prohibited behavior, and current-state boundaries |

---

# 163. Changelog Entry

Append the following entry to:

```text
doc/19-ai-workforce/CHANGELOG.md
```

```markdown
## AIW-CHG-20260806-028 — AI Workforce Model Registry Completed

| Field | Value |
|---|---|
| Date | 2026-08-06 |
| Change Type | `CREATED`, `STATUS`, `GOVERNANCE`, `MODEL`, `REGISTRY`, `SECURITY`, `PRIVACY` |
| Impact | `I4 — Critical` |
| Risk | `R4` |
| Status | Completed for Review |
| Owner | AI Workforce Council |
| Steward | Model Governance and Capability Governance |
| Approver | Pending Founder and Enterprise Governance Review |

### Affected Documents

- `doc/19-ai-workforce/capabilities/model-registry.md`
- `doc/19-ai-workforce/INDEX.md`
- `doc/19-ai-workforce/ROADMAP.md`
- `doc/19-ai-workforce/CHANGELOG.md`

### Previous State

`model-registry.md` existed as an empty placeholder.

The Workforce documentation defined capability, Skill, Tool, Agent, prompt,
memory, workflow, and performance concepts but lacked a dedicated authoritative
Registry separating providers, Model Definitions, exact Model versions, Model
Profiles, Agent Model Assignments, routing, fallback, Data eligibility, runtime
eligibility, and Production Model authority.

### New State

The document now defines:

- the difference between providers, Model families, Model Definitions, Model
  versions, Model Profiles, Agent Model Assignments, routing profiles,
  fallback profiles, runtime eligibility, availability, and Production Model
  authority;
- Provider Definition, Model Definition, Model Version, Model Profile, Agent
  Model Assignment, routing, fallback, Data eligibility, evaluation,
  certification, request, match, drift, degradation, conflict, and
  Model-invocation evidence schemas;
- provider and Model identity and versioning;
- sixteen Model categories;
- text, image, audio, video, document, code, structured-Data, time-series, and
  multimodal support;
- input, output, structured-output, context, truncation, and output-limit
  controls;
- Model, provider, routing, evaluation, Security, privacy, Data, operations,
  cost, and documentation ownership;
- Product, Project, Tenant, Customer, environment, regional, and Data scope;
- Data minimization, sensitive-Data, secret, provider-retention, and
  provider-training controls;
- separate Model Risk and Provider Risk;
- Provider, Model Definition, Model Version, and Agent Model Assignment
  lifecycles;
- Model proposal, provider review, duplication review, and approval;
- Model quality, safety, Security, privacy, Data, latency, cost, availability,
  fallback, and suspension evaluation;
- Model certification;
- runtime Model eligibility;
- Model requests, matching, routing, preferred routes, fallback routes, and
  no-fallback conditions;
- Model availability and health states;
- rate, concurrency, cost, latency, quality, safety, Security, privacy, and
  compliance controls;
- Model monitoring, drift, degradation, restriction, suspension, quarantine,
  reactivation, and revocation;
- Model and provider replacement, deprecation, retirement, and archival;
- Model Registry, Provider Registry, and Model Profile Registry authorities;
- Registry source-of-truth boundaries;
- Model discovery, matching, evidence, audit, reporting, and metrics;
- one-Agent, Multi-Model, Multi-Agent, Multi-Project, Multi-Tenant, Customer,
  and Production proof requirements;
- Production gates, observation windows, hard stops, exceptions, conflicts,
  portability, inheritance, anti-gaming controls, risks, anti-patterns,
  prohibited behavior, and current-state boundaries;
- completion of all four official documents in the `capabilities/` folder.

### Preserved Truth

```text
Provider Availability
≠
Model Approval

Model Approval
≠
Agent Model Assignment

Agent Model Assignment
≠
Runtime Model Eligibility

Runtime Model Eligibility
≠
Task Authorization

Fallback Availability
≠
Fallback Approval

Model Output
≠
Verified Fact

Model Access
≠
Agent Authority
```

### Limitations

- Founder approval is pending.
- Canonical status remains false.
- Provider Registry is not implemented.
- Model Registry is not implemented.
- Model Profile Registry is not implemented.
- Model Policy Engine is not implemented.
- Model Routing Engine is not implemented.
- Model Evaluation Engine is not implemented.
- runtime Model eligibility is not verified.
- runtime Model routing is not verified.
- approved provider Definitions proven by documentation remain zero.
- approved Model Definitions remain zero.
- active Agent Model Assignments remain zero.
- Production-authorized Model Assignments remain zero.

### Capabilities Folder Completion

The following four documents are now content-complete for review:

1. `doc/19-ai-workforce/capabilities/capability-registry.md`
2. `doc/19-ai-workforce/capabilities/skill-registry.md`
3. `doc/19-ai-workforce/capabilities/tool-registry.md`
4. `doc/19-ai-workforce/capabilities/model-registry.md`

This completion represents documentation readiness for review only.

It does not prove:

- implementation;
- approved Capability, Skill, Tool, or Model Registry records;
- runtime routing;
- active Agent assignments;
- live-tested capabilities;
- Production-controlled operation.

### Follow-Up

- begin the `teams/` documentation group;
- complete `doc/19-ai-workforce/teams/team-structure.md`;
- use document ID `AIW-TEAM-STRUCTURE-001`;
- define Team identity, Team Definition, Team Instance, Team type, ownership,
  leadership, membership, Roles, Agents, capabilities, Skills, Tools, Models,
  memory, workflows, capacity, allocation, lifecycle, Product, Project, Tenant,
  Customer, environment, evidence, suspension, retirement, and Production Team
  gates;
- update the INDEX and Roadmap after completion.
```

---

# 164. Capabilities Folder Completion Status

The official `capabilities/` documentation group is now:

```text
capabilities/
├── capability-registry.md  CONTENT_COMPLETE_FOR_REVIEW
├── model-registry.md       CONTENT_COMPLETE_FOR_REVIEW
├── skill-registry.md       CONTENT_COMPLETE_FOR_REVIEW
└── tool-registry.md        CONTENT_COMPLETE_FOR_REVIEW
```

Folder-level status:

```text
CAPABILITIES_FOLDER_DOCUMENTS=4

CONTENT_COMPLETE_FOR_REVIEW=4

EMPTY_PLACEHOLDERS=0

APPROVED=0

CANONICAL=0

IMPLEMENTED_REGISTRIES=0_PROVEN

ACTIVE_RUNTIME_CAPABILITIES=0_PROVEN

ACTIVE_RUNTIME_SKILLS=0_PROVEN

ACTIVE_RUNTIME_TOOLS=0_PROVEN

ACTIVE_RUNTIME_MODELS=0_PROVEN

PRODUCTION_CONTROLLED_CAPABILITIES=0_PROVEN
```

---

# 165. Next Document

The next document after completing the `capabilities/` folder is:

```text
doc/19-ai-workforce/teams/team-structure.md
```

It must use:

```text
AIW-TEAM-STRUCTURE-001
```

It must define:

- Team structure purpose;
- Team authority;
- Team Definition;
- Team Instance;
- Team identity;
- Team types;
- Team ownership;
- Team leadership;
- Team membership;
- Human members;
- Agent members;
- Role composition;
- Capability composition;
- Skill coverage;
- Tool and Model Profiles;
- Team memory;
- Team workflows;
- Team capacity;
- Team allocation;
- Product, Project, Tenant, Customer, environment, and regional scope;
- Team Risk;
- Team lifecycle;
- formation;
- approval;
- activation;
- operation;
- monitoring;
- scaling;
- restriction;
- suspension;
- replacement;
- dissolution;
- retirement;
- evidence;
- audit;
- Production Team gates;
- current-state limitations;
- Changelog entry;
- next document path.

---