---
id: AIW-REG-TOOL-001
title: Mianx.ai AI Workforce Tool Registry
version: 1.0.0
status: Draft

type: Enterprise AI Workforce Tool Registry Standard
class: Governed Registry

owner: AI Workforce Council
steward: Tool Governance and Capability Governance
authority: Founder and Enterprise Governance

maintainers:
  - AI Workforce Operations
  - Tool Governance
  - Capability Governance
  - Agent Framework Team
  - AI Operating System Team
  - Enterprise Architecture
  - Enterprise Governance
  - Identity and Access Management
  - Security Governance
  - Data and Privacy Governance
  - Enterprise Quality
  - Product Operations
  - Project Operations
  - Team Operations
  - Workflow and Orchestration Operations
  - Model Governance
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
  - Tool Governance
  - Capability Governance
  - Agent Framework Owner
  - AI Operating System Owner
  - Identity and Access Management
  - Security Governance
  - Data and Privacy Governance
  - Product Operations
  - Project Operations
  - Workflow and Orchestration Operations
  - Model Governance
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
  - Tool Owners
  - Connector Owners
  - Security Owners
  - Data Owners
  - Cost Owners
  - Enterprise Architects
  - AI Platform Engineers
  - Agent Engineers
  - Integration Engineers
  - Workflow Designers
  - Orchestration Designers
  - Identity and Access Management Teams
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

related_documents:
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
  - Monthly During Initial Controlled Tool Operation
  - Quarterly During Stable Controlled Operation
  - Annually After Stable Production Operation
  - After AI Constitution Change
  - After Tool Governance Model Change
  - After Capability or Skill Registry Change
  - After Connector Architecture Change
  - After Credential or Permission Model Change
  - After Provider, API, SDK, or Tool Version Change
  - After Product, Project, Tenant, Customer, Environment, or Regional Scope Change
  - Before New High-Risk Tool Approval
  - Before Agent Tool Profile Assignment
  - Before Runtime Tool Activation
  - Before Production Tool Use
  - After Critical AI, Security, Privacy, Quality, Financial, Customer, or Operational Incident
  - Before Canonical Promotion

tool_registry_horizon:
  current: Target-State Tool Registry Definition
  near_term: One-Agent Low-Risk Read-Only Tool Proof
  medium_term: Controlled Write, Multi-Agent, Multi-Project, and Multi-Tenant Tool Governance
  long_term: Production-Controlled Enterprise Tool Execution

canonical: false
---

# Mianx.ai AI Workforce Tool Registry

> **This document defines the governed target-state Registry for Tool
> Definitions, connector Definitions, Tool Instances, action catalogues,
> credential methods, permission policies, Agent Tool Profiles, runtime Tool
> eligibility, availability, monitoring, suspension, quarantine, replacement,
> deprecation, retirement, and Production Tool controls across the Mianx.ai
> Shared AI Workforce.**

---

# 1. Document Purpose

This document establishes the target-state Tool Registry standard for the
Mianx.ai AI Workforce.

It defines:

- Tool Registry purpose;
- Registry authority;
- Tool identity;
- Tool Definition;
- connector Definition;
- Tool Instance;
- action catalogue;
- Tool action;
- credential method;
- credential profile;
- permission policy;
- Agent Tool Profile;
- Tool assignment;
- runtime Tool eligibility;
- Tool categories;
- action categories;
- Tool ownership;
- Tool stewardship;
- provider ownership;
- connector ownership;
- Security ownership;
- Data ownership;
- cost ownership;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- environment scope;
- regional scope;
- Data scope;
- Tool Risk;
- evaluation;
- certification;
- approval;
- assignment;
- activation;
- availability;
- health;
- rate limits;
- concurrency limits;
- cost limits;
- timeout controls;
- retry controls;
- idempotency;
- fallback;
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
- Production Tool gates;
- current-state boundaries.

This document ensures that a Tool is not treated as approved, available,
assigned, active, Production-ready, or unrestricted merely because:

- its name exists;
- a connector exists;
- an integration has been configured;
- an API key exists;
- an OAuth login exists;
- a Human can use the Tool;
- a provider account exists;
- a Tool appears inside a prompt;
- an Agent Skill references it;
- a Capability Profile references it;
- a Tool can technically expose many actions;
- another Agent possesses access.

This document does not independently:

- approve a Tool Definition;
- approve a connector;
- create a Tool Instance;
- issue a credential;
- grant a permission;
- assign a Tool to an Agent;
- authorize a Tool action;
- activate runtime Tool execution;
- authorize Customer communication;
- authorize financial execution;
- authorize destructive execution;
- authorize Production execution;
- prove implementation.

---

# 2. Current Authority Status

This document currently has the following state:

```text
DOCUMENT_ID=AIW-REG-TOOL-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TARGET_STATE_TOOL_REGISTRY=DEFINED

TOOL_REGISTRY_IMPLEMENTATION=NOT_IMPLEMENTED

CONNECTOR_REGISTRY=NOT_IMPLEMENTED

TOOL_INSTANCE_REGISTRY=NOT_IMPLEMENTED

CREDENTIAL_BROKER=NOT_IMPLEMENTED

TOOL_POLICY_ENGINE=NOT_IMPLEMENTED

RUNTIME_TOOL_ELIGIBILITY=NOT_VERIFIED

RUNTIME_ACTION_AUTHORIZATION=NOT_VERIFIED

APPROVED_TOOL_DEFINITIONS=0_PROVEN

APPROVED_CONNECTORS=0_PROVEN

ACTIVE_AGENT_TOOL_PROFILES=0_PROVEN

PRODUCTION_AUTHORIZED_TOOLS=0_PROVEN

RUNTIME_AGENT_ACTIVATION=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

Therefore:

- all Tool structures in this document are target-state definitions;
- no Tool Definition is approved;
- no connector is approved;
- no Tool Instance is active;
- no credential is issued;
- no Agent Tool Profile is active;
- no runtime action authorization is proven;
- no Production Tool execution is authorized;
- Founder and required Governance approvals remain pending.

---

# 3. Strategic Alignment

The Tool Registry operates inside the exact Mianx.ai hierarchy:

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

Tools support this hierarchy.

They do not replace:

- Founder authority;
- Company Governance;
- Human accountability;
- Role authority;
- Agent lifecycle;
- Skill proficiency;
- Capability Governance;
- Product ownership;
- Project ownership;
- Tenant isolation;
- Customer contractual authority;
- Security controls;
- privacy controls;
- Data Governance;
- approval;
- evidence;
- Production authorization.

---

# 4. Tool Registry Objective

The Tool Registry must make it possible to answer:

- What Tool exists?
- Which Tool ID identifies it?
- Which version is current?
- Which provider supplies it?
- Which connector implements access?
- Which Tool Instance is targeted?
- Which actions are available?
- Which actions are approved?
- Which actions are prohibited?
- Which credentials are permitted?
- Which permission policy applies?
- Which Agents may receive access?
- Which Roles and Skills are required?
- Which capabilities depend on it?
- Which Product and Project scopes apply?
- Which Tenant and Customer scopes apply?
- Which environment and region apply?
- Which Data classifications are permitted?
- What Risk applies?
- Which rate, concurrency, and cost limits apply?
- Which evaluation proves safe use?
- Is certification required?
- Is runtime availability verified?
- How is access suspended?
- Which evidence proves current status?

---

# 5. Core Tool Registry Principles

## 5.1 Tool Access Is Not Authority

The existence of:

- an account;
- credential;
- connector;
- SDK;
- API;
- plugin;
- browser session;

does not authorize an Agent to execute every exposed action.

---

## 5.2 Tool Definitions Must Be Explicit

Every Tool Definition must identify:

- purpose;
- provider;
- category;
- action catalogue;
- Risk;
- permitted Data;
- environments;
- authentication methods;
- owners;
- lifecycle;
- monitoring;
- evidence;
- retirement.

---

## 5.3 Every Tool Action Must Be Explicit

An approved Tool does not mean every Tool action is approved.

Permissions must identify:

- exact action;
- exact Tool Instance;
- exact resource;
- exact scope;
- exact conditions.

---

## 5.4 Credentials Are Not Permissions

A valid credential proves authentication.

It does not prove authorization for the requested action.

---

## 5.5 Tool Access Must Use Least Privilege

Agents must receive only the minimum:

- Tool Instances;
- actions;
- resources;
- environments;
- Data classes;
- duration;
- budget;
- concurrency;

required for approved work.

---

## 5.6 Tools Must Be Scope-Bound

Every Tool access decision must consider:

- Organization;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- Data classification;
- Risk;
- budget;
- time.

---

## 5.7 High-Risk Actions Require Stronger Controls

The following require enhanced controls:

- Production actions;
- destructive actions;
- privileged actions;
- financial actions;
- external communication;
- Customer actions;
- Security changes;
- identity changes;
- permission changes;
- regulated Data access.

---

## 5.8 Tool Actions Must Be Attributable

Every material Tool action must identify:

- Human or Agent identity;
- Agent Definition;
- Agent Instance;
- Tool Definition;
- connector;
- Tool Instance;
- action;
- target;
- scope;
- authority;
- permission;
- time;
- result;
- cost;
- evidence.

---

## 5.9 Credentials Must Be Protected

Credential values must not be stored in:

- prompts;
- Markdown documentation;
- Agent memory;
- source code;
- Task descriptions;
- chat messages;
- logs;
- evidence records.

---

## 5.10 Failures Must Remain Visible

The system must preserve:

- authentication failures;
- authorization denials;
- timeouts;
- retries;
- partial failures;
- rollback failures;
- cost-limit breaches;
- Tool outages;
- provider errors.

---

## 5.11 Tools Must Be Suspendable

The Tool Governance system must support:

- action restriction;
- Agent Tool Profile suspension;
- credential revocation;
- connector disablement;
- Tool Instance suspension;
- Project suspension;
- Tenant suspension;
- provider quarantine;
- emergency kill switch.

---

## 5.12 Tool Claims Require Evidence

Documentation does not prove:

- connector health;
- credential validity;
- permission enforcement;
- runtime Tool availability;
- runtime Tool isolation;
- Production readiness.

---

# 6. Governing Non-Equivalence Rule

The following must remain separate:

```text
Tool Definition
≠
Connector Definition
≠
Tool Instance
≠
Tool Action
≠
Credential
≠
Permission
≠
Agent Tool Profile
≠
Tool Assignment
≠
Runtime Tool Eligibility
≠
Tool Activation
≠
Production Tool Authority
```

Also:

```text
Tool
≠
Skill

Tool
≠
Capability

Tool
≠
Model

Tool
≠
Workflow

Tool Availability
≠
Action Authorization
```

---

# 7. Tool Definition

A Tool Definition describes one governed internal or external system that may
support approved Agent work.

It should define:

- Tool identity;
- Tool purpose;
- provider;
- service category;
- supported actions;
- authentication methods;
- Data support;
- environment support;
- Risk;
- rate limits;
- cost model;
- monitoring;
- suspension;
- lifecycle.

A Tool Definition does not prove a runtime connector or Tool Instance exists.

---

# 8. Connector Definition

A connector Definition describes the technical adapter used to communicate
with a Tool.

Connector types may include:

- REST API connector;
- GraphQL connector;
- SDK connector;
- database connector;
- repository connector;
- command-line connector;
- browser automation connector;
- file-system connector;
- message connector;
- webhook connector;
- workflow connector;
- internal service connector.

A connector must not expand authority beyond approved Tool permissions.

---

# 9. Tool Instance

A Tool Instance is one specific account, workspace, repository, database,
service endpoint, cloud account, Customer environment, or Tenant environment.

Examples:

- one GitHub repository;
- one Supabase project;
- one production database;
- one Customer workspace;
- one cloud subscription;
- one email account;
- one project-management workspace.

Access to one Tool Instance must not create access to another.

---

# 10. Tool Action

A Tool action is one explicit operation available through a connector.

Examples:

- read file;
- create issue;
- update record;
- send message;
- create branch;
- merge change;
- deploy release;
- delete resource;
- revoke credential;
- transfer funds.

Each action must have:

- action ID;
- action version;
- action category;
- target type;
- Risk;
- approval rule;
- evidence rule;
- retry rule;
- rollback rule.

---

# 11. Action Catalogue

An action catalogue is the governed list of actions supported by a Tool
Definition or connector version.

It must distinguish:

```text
Technically Available Actions

Governance-Eligible Actions

Approved Actions

Agent-Permitted Actions

Task-Authorized Actions

Prohibited Actions
```

These lists must not be treated as equivalent.

---

# 12. Credential Method

A credential method defines how a subject authenticates to a Tool.

Credential methods may include:

- workload identity;
- service account;
- OAuth token;
- short-lived access token;
- API token;
- certificate;
- signed request;
- delegated Human authorization.

Credential methods must be approved separately from action permissions.

---

# 13. Permission Policy

A permission policy defines:

- which subject;
- may perform which action;
- on which resource;
- within which scope;
- under which conditions;
- until which expiry.

Default permission behavior must be:

```text
DENY
```

---

# 14. Agent Tool Profile

An Agent Tool Profile defines the approved Tools, Tool Instances, actions,
limits, and conditions available to one Agent Definition or Agent Instance.

It must be:

- explicit;
- versioned;
- scope-bound;
- time-bound;
- reviewable;
- testable;
- revocable;
- monitored;
- evidence-supported.

---

# 15. Tool Assignment

A Tool Assignment connects:

- one approved Agent;
- one approved Agent Tool Profile;
- one Product;
- one Project;
- one Tenant or Customer where applicable;
- one environment;
- one validity period.

A Tool Assignment does not authorize execution until runtime eligibility passes.

---

# 16. Runtime Tool Eligibility

Runtime Tool Eligibility is the current result of validating all Tool,
connector, instance, credential, permission, Agent, scope, dependency, Risk,
budget, and monitoring requirements.

Unknown eligibility must not be treated as eligible.

---

# 17. Tool Registry Entry

A Tool Registry Entry is the governed source-of-truth record for one Tool
Definition.

It should contain:

- Tool ID;
- version;
- name;
- category;
- provider;
- owner;
- action catalogue;
- authentication methods;
- supported environments;
- supported Data classes;
- Risk;
- lifecycle state;
- approval state;
- review date;
- evidence.

---

# 18. Tool Entity Model

```text
Tool Need Identified
    ↓
Tool Definition
    ↓
Connector Definition
    ↓
Tool Instance
    ↓
Action Catalogue
    ↓
Credential Method
    ↓
Permission Policy
    ↓
Agent Tool Profile
    ↓
Tool Assignment
    ↓
Runtime Eligibility Validation
    ↓
Tool Activation
    ↓
Tool Execution
    ↓
Evidence and Monitoring
    ↓
Restriction, Suspension, Quarantine, Replacement, or Retirement
```

---

# 19. Tool ID Standard

Proposed Tool ID format:

```text
AIW-TOOL-{DOMAIN}-{NUMBER}
```

Examples:

```text
AIW-TOOL-REPO-001
AIW-TOOL-DATA-001
AIW-TOOL-CLOUD-001
AIW-TOOL-COMM-001
AIW-TOOL-MON-001
```

Connector ID format:

```text
AIW-CONNECTOR-{DOMAIN}-{NUMBER}
```

Tool Instance ID format:

```text
AIW-TOOL-INSTANCE-{SCOPE}-{NUMBER}
```

Action ID format:

```text
AIW-TOOL-ACTION-{DOMAIN}-{NUMBER}
```

Agent Tool Profile ID format:

```text
AIW-TOOL-PROFILE-{AGENT}-{NUMBER}
```

Tool Assignment ID format:

```text
AIW-TOOL-ASSIGN-{AGENT}-{NUMBER}
```

---

# 20. Tool Identity Rules

A Tool ID must:

- remain unique;
- identify one bounded Tool Definition;
- remain stable;
- not be reused;
- remain separate from connector IDs;
- remain separate from Tool Instance IDs;
- remain separate from action IDs;
- remain separate from credential IDs;
- remain version-controlled;
- remain traceable after retirement.

---

# 21. Tool Definition Record

```yaml
tool_definition:
  tool_id: required
  tool_version: required
  tool_name: required
  short_name: conditional

  category: required
  domain: required
  provider: required
  service_type: required

  purpose: required
  permitted_uses: required
  prohibited_uses: required

  action_catalogue_reference: required
  authentication_methods: required

  supported_products: conditional
  supported_projects: conditional
  supported_tenants: conditional
  supported_customers: conditional
  supported_environments: required
  supported_regions: conditional
  supported_data_classes: required
  prohibited_data_classes: required

  default_risk_class: required
  maximum_risk_class: required

  rate_limit_model: required
  concurrency_model: required
  cost_model: required
  timeout_model: required
  retry_model: required
  idempotency_model: required
  fallback_model: required

  evaluation_profile_id: required
  certification_profile_id: conditional
  monitoring_profile_id: required
  evidence_profile_id: required
  suspension_profile_id: required
  recovery_profile_id: required

  business_owner: required
  technical_owner: required
  security_owner: required
  privacy_owner: conditional
  data_owner: conditional
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

# 22. Connector Definition Record

```yaml
connector_definition:
  connector_id: required
  connector_version: required

  tool_id: required
  tool_version: required

  connector_name: required
  connector_type: required
  implementation_reference: required

  supported_actions: required
  unsupported_actions: required

  authentication_method: required
  credential_broker_required: required

  request_schema_version: required
  response_schema_version: required
  error_schema_version: required

  timeout_limit: required
  retry_policy: required
  idempotency_behavior: required

  supported_environments: required
  supported_regions: conditional
  supported_data_classes: required

  logging_profile_id: required
  monitoring_profile_id: required
  evidence_profile_id: required

  security_review_reference: required
  privacy_review_reference: conditional
  evaluation_reference: required

  connector_owner: required
  technical_owner: required
  security_owner: required
  operational_owner: required

  lifecycle_state: required
  approval_state: required
  created_at: required
  review_at: required
```

---

# 23. Tool Instance Record

```yaml
tool_instance:
  tool_instance_id: required

  tool_id: required
  tool_version: required
  connector_id: required
  connector_version: required

  instance_name: required
  provider_account_reference: conditional
  workspace_reference: conditional
  repository_reference: conditional
  database_reference: conditional
  service_endpoint_reference: conditional

  organization_id: required
  product_id: conditional
  project_id: conditional
  tenant_id: conditional
  customer_id: conditional
  environment: required
  region: conditional
  data_classification: required

  credential_profile_id: required
  permission_policy_id: required
  rate_limit_profile_id: required
  concurrency_profile_id: required
  cost_profile_id: required
  monitoring_profile_id: required
  evidence_profile_id: required

  business_owner: required
  technical_owner: required
  security_owner: required
  data_owner: conditional
  operational_owner: required
  cost_owner: required

  instance_state: required
  health_state: required
  availability_state: required

  created_at: required
  review_at: required
  expires_at: conditional
  suspended_at: conditional
  retired_at: conditional
```

---

# 24. Tool Action Record

```yaml
tool_action:
  action_id: required
  action_version: required

  tool_id: required
  tool_version: required

  action_name: required
  action_category: required
  description: required
  target_resource_type: required

  input_schema_reference: required
  output_schema_reference: required

  reversible: required
  destructive: required
  idempotent: required

  default_risk_class: required
  maximum_impact: required

  required_skills: required
  required_capabilities: required
  certification_required: required

  approval_required: required
  human_review_required: required
  separation_of_duties_required: required

  prohibited_environments: conditional
  prohibited_data_classes: conditional
  prohibited_resource_patterns: conditional

  timeout_limit: required
  retry_policy: required
  evidence_required: required
  rollback_or_compensation_required: required

  lifecycle_state: required
  approval_state: required
  review_at: required
```

---

# 25. Credential Profile Record

```yaml
credential_profile:
  credential_profile_id: required
  credential_profile_version: required

  tool_id: required
  tool_instance_id: required

  credential_method: required
  subject_type: HUMAN | AGENT | SERVICE | WORKLOAD
  subject_id: required

  permitted_actions: required
  permitted_resources: required

  organization_scope: required
  product_scope: conditional
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment_scope: required
  region_scope: conditional

  short_lived: required
  maximum_validity: required
  rotation_policy: required
  revocation_policy: required

  secret_reference: required
  secret_value_stored: false

  issued_by: required
  approved_by: required
  issued_at: required
  expires_at: required
  revoked_at: conditional

  monitoring_profile_id: required
  evidence_reference: required
  status: required
```

---

# 26. Permission Policy Record

```yaml
tool_permission_policy:
  permission_policy_id: required
  permission_policy_version: required

  subject_type: AGENT_DEFINITION | AGENT_INSTANCE | ROLE | TEAM
  subject_id: required

  tool_id: required
  tool_instance_ids: required
  allowed_actions: required
  prohibited_actions: required
  resource_scope: required

  organization_scope: required
  product_scope: conditional
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment_scope: required
  region_scope: conditional
  data_scope: required

  maximum_risk_class: required
  financial_limit: conditional
  rate_limit: required
  concurrency_limit: required
  cost_limit: required

  approval_required: required
  human_review_required: required
  conditions: required

  effective_at: required
  review_at: required
  expires_at: required
  revoked_at: conditional

  approved_by: required
  authority_reference: required
  evidence_reference: required
  status: required
```

---

# 27. Agent Tool Profile Record

```yaml
agent_tool_profile:
  tool_profile_id: required
  tool_profile_version: required

  agent_definition_id: required
  agent_definition_version: required
  agent_instance_id: conditional
  runtime_version: conditional

  role_id: required
  capability_ids: required
  skill_requirements: required

  allowed_tools:
    - tool_id: required
      tool_version: required
      tool_instance_ids: required
      allowed_actions: required
      prohibited_actions: required

  organization_scope: required
  product_scope: conditional
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment_scope: required
  region_scope: conditional
  data_scope: required

  maximum_risk_class: required
  maximum_cost_per_action: required
  daily_cost_limit: required
  monthly_cost_limit: required
  rate_limits: required
  concurrency_limits: required

  credential_profile_ids: required
  permission_policy_ids: required
  approval_profile_id: required
  monitoring_profile_id: required
  evidence_profile_id: required
  suspension_profile_id: required

  accountable_human_owner: required
  security_owner: required
  cost_owner: required
  approved_by: required

  effective_at: required
  review_at: required
  expires_at: required
  profile_state: required
```

---

# 28. Tool Assignment Record

```yaml
tool_assignment:
  assignment_id: required

  tool_profile_id: required
  tool_profile_version: required

  agent_definition_id: required
  agent_definition_version: required
  agent_instance_id: conditional

  role_id: required
  capability_ids: required

  organization_id: required
  product_id: required
  project_id: conditional
  tenant_id: conditional
  customer_id: conditional
  environment: required
  region: conditional

  allocation_reference: required
  authority_reference: required
  permission_references: required
  credential_profile_references: required

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

# 29. Tool Categories

| Code | Tool Category | Purpose |
|---|---|---|
| `TC-READ` | Retrieval | Read approved information |
| `TC-FILE` | File Management | Read, create, update, move, or remove files |
| `TC-REPO` | Repository | Read or modify source repositories |
| `TC-DATA` | Data | Query or modify databases and datasets |
| `TC-CLOUD` | Cloud and Infrastructure | Manage infrastructure and cloud resources |
| `TC-CI` | Build and Deployment | Build, test, release, and deploy |
| `TC-COMM` | Communication | Send or manage communications |
| `TC-COLLAB` | Collaboration | Manage Tasks, Projects, workflows, and documents |
| `TC-FIN` | Financial | Access financial records or actions |
| `TC-SEC` | Security | Scan, investigate, contain, or modify Security controls |
| `TC-MON` | Monitoring | Read logs, metrics, traces, alerts, and health |
| `TC-BROWSER` | Browser | Access approved web resources or browser workflows |
| `TC-ADMIN` | Administration | Manage identities, permissions, accounts, or configurations |
| `TC-MODEL` | Model-Integrated | Execute approved Model-supported functions |
| `TC-KNOW` | Knowledge | Search or update governed Knowledge systems |
| `TC-MEM` | Memory | Read or update approved memory systems |
| `TC-CUSTOM` | Internal Custom | Execute Mianx.ai-specific governed actions |

---

# 30. Tool Action Categories

| Code | Action Category | Meaning |
|---|---|---|
| `ACT-READ` | Read | Retrieve information without intended state change |
| `ACT-DRAFT` | Draft | Create a non-final internal artifact |
| `ACT-CREATE` | Create | Create a new resource |
| `ACT-UPDATE` | Update | Modify an existing resource |
| `ACT-EXECUTE` | Execute | Trigger a process or workflow |
| `ACT-COMMUNICATE` | Communicate | Send or publish content |
| `ACT-APPROVE` | Approve | Record an authorized decision |
| `ACT-DEPLOY` | Deploy | Promote code, configuration, or artifacts |
| `ACT-PRIVILEGED` | Privileged | Change identity, access, Security, or system controls |
| `ACT-FINANCIAL` | Financial | Affect money, budget, payment, or financial records |
| `ACT-DESTRUCTIVE` | Destructive | Delete, terminate, revoke, overwrite, or irreversibly alter |
| `ACT-RECOVER` | Recover | Restore, roll back, compensate, or contain |

---

# 31. Read Actions

Read actions may include:

- reading documentation;
- reading repository files;
- querying approved Data;
- viewing monitoring information;
- retrieving approved Customer cases;
- searching governed Knowledge.

Read-only access may still be high Risk when it involves:

- restricted Data;
- Customer Data;
- personal Data;
- regulated Data;
- Security secrets;
- Production information.

---

# 32. Draft Actions

Draft actions create non-final internal content.

Examples:

- email drafts;
- document drafts;
- code patches;
- proposal drafts;
- release-note drafts;
- Customer-response drafts.

A draft must not be represented as:

- sent;
- approved;
- merged;
- deployed;
- published;
- contractually committed.

---

# 33. Create Actions

Create actions may include:

- creating a file;
- creating a Task;
- opening an issue;
- creating a branch;
- creating a test resource;
- creating a non-final record.

Creation must remain within approved:

- location;
- naming;
- ownership;
- scope;
- environment;
- retention;
- budget.

---

# 34. Update Actions

Update actions modify existing resources.

They require:

- exact target;
- previous state;
- intended change;
- version or conflict check;
- permission;
- evidence;
- rollback where applicable.

---

# 35. Communication Actions

Communication actions include:

- sending email;
- sending direct messages;
- posting channel messages;
- publishing content;
- contacting Customers;
- contacting prospects;
- issuing incident updates.

Agent-generated content does not independently authorize sending.

---

# 36. Repository Actions

Repository actions may include:

- read repository;
- create branch;
- modify file;
- create commit;
- push branch;
- open pull request;
- review change;
- merge;
- create release;
- delete branch.

Repository permissions must define:

- exact repository;
- branch scope;
- file scope where practical;
- protected branches;
- review rules;
- CI requirements;
- deletion controls;
- force-push restrictions.

---

# 37. Database Actions

Database actions may include:

- read query;
- Data export;
- record creation;
- record update;
- schema migration;
- deletion;
- backup;
- restore.

Database permissions must define:

- exact database;
- schema;
- table or collection;
- Product;
- Project;
- Tenant;
- environment;
- Data classification;
- transaction behavior;
- backup;
- rollback;
- audit.

---

# 38. Infrastructure Actions

Infrastructure actions may include:

- create resource;
- modify resource;
- scale resource;
- restart service;
- deploy configuration;
- revoke access;
- terminate resource;
- restore service.

Production infrastructure actions require enhanced approval and recovery.

---

# 39. Financial Actions

Financial actions may include:

- read budget;
- read transaction;
- create purchase request;
- prepare payment;
- modify financial record;
- approve expenditure;
- transfer funds.

AI Agents must not independently:

- transfer funds;
- approve their own spending;
- sign financial commitments;
- alter audited financial records;
- create unrestricted payment authority.

---

# 40. Privileged Actions

Privileged actions may include:

- create identity;
- grant permission;
- revoke permission;
- rotate credential;
- change Security policy;
- change Production configuration;
- disable monitoring;
- access protected evidence.

Privileged actions require:

- strong identity;
- exact scope;
- limited duration;
- separation of duties;
- enhanced monitoring;
- independent approval;
- evidence.

---

# 41. Destructive Actions

Destructive actions include:

- deleting files;
- deleting repositories;
- dropping databases;
- deleting records;
- terminating infrastructure;
- revoking credentials;
- overwriting protected artifacts;
- removing access.

Destructive actions require stronger controls than normal write actions.

---

# 42. Destructive Action Gate

Before a destructive action:

- [ ] exact Tool Instance is verified;
- [ ] exact target is identified;
- [ ] Product and Project scopes are verified;
- [ ] Tenant and Customer scopes are verified;
- [ ] environment is verified;
- [ ] impact is assessed;
- [ ] alternatives are reviewed;
- [ ] dry run is completed where available;
- [ ] backup exists where applicable;
- [ ] rollback or compensation exists;
- [ ] Human approval is recorded;
- [ ] separation of duties is enforced;
- [ ] monitoring is active;
- [ ] evidence capture is active;
- [ ] emergency stop is available.

---

# 43. Production Actions

Production actions affect:

- live Customers;
- live services;
- live Data;
- live infrastructure;
- live communication;
- live identities;
- live financial records;
- contractual obligations.

Production read and Production write must be separately authorized.

---

# 44. Tool Ownership

Every Tool Definition must have:

- business owner;
- Tool owner;
- connector owner;
- technical owner;
- Security owner;
- privacy owner where applicable;
- Data owner where applicable;
- operational owner;
- cost owner;
- documentation owner.

---

# 45. Tool Owner Responsibilities

The Tool Owner is accountable for:

- business purpose;
- Tool lifecycle;
- provider relationship;
- supported actions;
- scope;
- Risk;
- cost;
- review;
- deprecation;
- retirement.

---

# 46. Connector Owner Responsibilities

The Connector Owner is accountable for:

- connector implementation;
- versioning;
- schemas;
- authentication integration;
- error handling;
- retries;
- idempotency;
- monitoring;
- evaluation;
- Security remediation.

---

# 47. Security Owner Responsibilities

The Security Owner is accountable for:

- identity controls;
- credential protection;
- least privilege;
- permission review;
- threat assessment;
- suspension;
- quarantine;
- incident response;
- Security evidence.

---

# 48. Cost Owner Responsibilities

The Cost Owner is accountable for:

- pricing model;
- usage attribution;
- budgets;
- warning thresholds;
- hard stops;
- cost anomalies;
- renewal decisions;
- provider spend review.

---

# 49. Product Tool Scope

A Product Tool scope must define:

- approved Tools;
- approved Tool Instances;
- approved actions;
- prohibited actions;
- approved Data classes;
- environments;
- cost limits;
- Product owner;
- review cycle.

A Tool approved for one Product is not automatically approved for another.

---

# 50. Project Tool Scope

Project Tool access must define:

- Project ID;
- Tool Instance;
- action set;
- repository, workspace, or resource;
- Data scope;
- environment;
- budget;
- start date;
- expiry;
- closure procedure.

Project closure must trigger access review and removal.

---

# 51. Tenant Tool Scope

Tenant Tool access must:

- validate Tenant identity;
- use Tenant-scoped resources;
- prevent cross-Tenant actions;
- prevent cross-Tenant Data access;
- use Tenant-attributed evidence;
- attribute cost to Tenant;
- remove access at Tenant closure;
- pass negative isolation tests.

---

# 52. Customer Tool Scope

Customer-specific Tool access must define:

- Customer identity;
- contractually permitted purpose;
- authorized system;
- approved actions;
- communication authority;
- Data restrictions;
- environment;
- Human owner;
- expiry.

---

# 53. Environment Tool Scope

Tool access must distinguish:

```text
ENV-DOCS

ENV-LOCAL

ENV-DEVELOPMENT

ENV-TEST

ENV-STAGING

ENV-PRODUCTION-READ

ENV-PRODUCTION-WRITE
```

Lower-environment access must not imply Production access.

---

# 54. Regional Tool Scope

Regional controls may depend on:

- Data residency;
- provider region;
- Customer location;
- legal jurisdiction;
- network boundary;
- credential location;
- log location;
- evidence-retention location.

---

# 55. Data Classification Scope

A Tool Profile must identify permitted Data classifications.

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

A Tool approved for Internal Data must not automatically process regulated Data.

---

# 56. Tool Risk Classification

| Risk | Tool Interpretation |
|---|---|
| `R0` | Public or negligible-impact read-only action |
| `R1` | Reversible internal read, draft, or low-impact creation |
| `R2` | Controlled internal write or workflow action |
| `R3` | Production, Customer, Security, privacy, financial, or material operational action |
| `R4` | Irreversible, destructive, constitutional, legal, regulated, or enterprise-critical action |

Risk must be evaluated by action and target, not only by Tool name.

---

# 57. Tool Risk Factors

Risk assessment should consider:

- reversibility;
- target criticality;
- Production impact;
- Customer impact;
- Tenant scope;
- Data sensitivity;
- financial impact;
- legal impact;
- Security impact;
- autonomy;
- action volume;
- concurrency;
- failure propagation;
- Human-review availability;
- rollback capability.

---

# 58. Tool Definition Lifecycle

```text
Tool Need Identified
    ↓
Tool Proposed
    ↓
Tool Defined
    ↓
Connector Designed
    ↓
Tool in Review
    ↓
Tool Approved
    ↓
Tool Available for Instance Creation
    ↓
Tool Maintained
    ↓
Tool Revised
    ↓
Tool Deprecated
    ↓
Tool Retired
    ↓
Tool Archived
```

---

# 59. Tool Definition States

| State | Meaning |
|---|---|
| `NEED-IDENTIFIED` | Verified Tool need exists |
| `PROPOSED` | Initial Tool proposal exists |
| `DEFINED` | Purpose, provider, actions, scope, and Risk are documented |
| `CONNECTOR-DESIGNED` | Technical connector design exists |
| `IN-REVIEW` | Required reviews are underway |
| `APPROVED` | Exact Tool Definition version is approved |
| `AVAILABLE` | Tool Instances may be proposed |
| `MAINTAINED` | Tool remains actively governed |
| `REVISION-PENDING` | Material revision is under review |
| `DEPRECATED` | New Tool Instances or assignments should stop |
| `RETIRED` | Tool may no longer be newly activated |
| `ARCHIVED` | Historical record remains |

---

# 60. Connector Lifecycle

```text
Connector Proposed
    ↓
Connector Designed
    ↓
Connector Implemented
    ↓
Security Review
    ↓
Controlled Evaluation
    ↓
Connector Approved
    ↓
Connector Active
    ↓
Connector Monitored
    ↓
Connector Restricted, Suspended, Replaced, or Deprecated
    ↓
Connector Retired
```

---

# 61. Tool Instance Lifecycle

```text
Tool Instance Requested
    ↓
Scope Reviewed
    ↓
Instance Provisioned
    ↓
Credential Method Configured
    ↓
Permission Policy Configured
    ↓
Evaluation
    ↓
Instance Approved
    ↓
Instance Active
    ↓
Instance Monitored
    ↓
Instance Restricted, Suspended, Quarantined, Replaced, or Retired
```

---

# 62. Agent Tool Assignment Lifecycle

```text
Tool Need Identified
    ↓
Agent Tool Profile Selected
    ↓
Assignment Proposed
    ↓
Agent and Scope Eligibility Reviewed
    ↓
Credential Provisioning
    ↓
Permission Configuration
    ↓
Evaluation
    ↓
Assignment Approved
    ↓
Runtime Eligible
    ↓
Active Tool Use
    ↓
Monitored
    ↓
Restricted, Suspended, Expired, Revoked, or Retired
```

---

# 63. Tool Assignment States

| State | Meaning |
|---|---|
| `REQUIRED` | Role or Capability requires Tool access |
| `PROPOSED` | Tool Assignment is proposed |
| `ELIGIBILITY-REVIEW` | Agent, scope, and dependencies are checked |
| `PROVISIONING` | Credential and permission configuration is underway |
| `EVALUATION-PENDING` | Required evaluation remains |
| `EVALUATED` | Evaluation result exists |
| `APPROVAL-PENDING` | Required approval remains |
| `APPROVED` | Exact Tool Assignment is approved |
| `RUNTIME-ELIGIBLE` | Current controls permit Tool use |
| `ACTIVE` | Tool is being used within approved scope |
| `RESTRICTED` | Tool actions or scopes are reduced |
| `SUSPENDED` | New Tool actions are blocked |
| `QUARANTINED` | Tool access is isolated for investigation |
| `EXPIRED` | Validity period ended |
| `REVOKED` | Tool authority was withdrawn |
| `RETIRED` | Tool Assignment is no longer required |
| `ARCHIVED` | Historical record remains |

---

# 64. Tool Proposal

A Tool proposal must identify:

- business or capability need;
- expected actions;
- provider;
- alternative Tools;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- Data classes;
- Risk;
- cost;
- integration effort;
- credential method;
- monitoring;
- retirement condition.

---

# 65. Duplication Review

Before registering a new Tool:

- review existing Tool Definitions;
- review existing connectors;
- review existing Tool Instances;
- identify equivalent providers;
- identify overlapping actions;
- identify reusable enterprise Tools;
- identify Product-specific restrictions;
- identify migration opportunities.

A duplicate Tool should not be registered merely under a different display name.

---

# 66. Tool Review

Tool review may include:

- business review;
- Capability review;
- Skill review;
- Architecture review;
- provider review;
- connector review;
- Security review;
- privacy review;
- Data review;
- legal review;
- compliance review;
- cost review;
- operational review;
- quality review;
- evidence review;
- retirement review.

---

# 67. Tool Approval

Tool approval must identify:

- exact Tool ID;
- exact Tool version;
- provider;
- approved purpose;
- approved action catalogue;
- approved authentication methods;
- approved Data classes;
- approved environments;
- approved Risk;
- approved owners;
- approved evaluation;
- conditions;
- review date;
- evidence.

Approval of a Tool Definition does not approve a connector, Tool Instance, or
Agent Tool Assignment automatically.

---

# 68. Connector Evaluation

Connector evaluation should test:

- request schema;
- response schema;
- authentication;
- authorization;
- error handling;
- timeout behavior;
- retry behavior;
- idempotency;
- rate limits;
- Data classification;
- logging;
- evidence;
- suspension;
- provider failure;
- version compatibility.

---

# 69. Tool Evaluation

Tool evaluation must test the exact:

- Tool Definition version;
- connector version;
- Tool Instance;
- credential method;
- permission policy;
- Agent Tool Profile;
- Agent configuration;
- action;
- environment;
- Data class;
- Risk.

---

# 70. Tool Evaluation Profile

```yaml
tool_evaluation_profile:
  evaluation_profile_id: required

  tool_id: required
  tool_version: required
  connector_id: required
  connector_version: required
  tool_instance_id: required

  agent_tool_profile_id: conditional
  action_ids: required

  scenarios: required
  permitted_action_tests: required
  denied_action_tests: required
  isolation_tests: required
  credential_tests: required
  permission_tests: required
  timeout_tests: required
  retry_tests: required
  idempotency_tests: required
  cost_limit_tests: required
  suspension_tests: required

  environment: required
  data_scope: required
  risk_scope: required

  success_criteria: required
  critical_failure_rules: required

  evaluator_requirements: required
  independent_review_required: required
  evidence_requirements: required

  validity_period: required
  re_evaluation_triggers: required
```

---

# 71. Evaluation Result States

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

# 72. Critical Tool Evaluation Failures

The following should normally produce failure:

- unauthorized action succeeds;
- cross-Project access succeeds;
- cross-Tenant access succeeds;
- invalid credential remains usable;
- revoked credential remains usable;
- permission expiry is ignored;
- secret appears in logs;
- destructive action bypasses approval;
- retry creates duplicate material effect;
- suspension does not block actions;
- evidence is incomplete;
- Production action occurs in non-Production evaluation;
- provider or connector error is reported as success.

---

# 73. Tool Certification

Certification may be required for:

- Production write actions;
- destructive actions;
- privileged actions;
- Security containment;
- database migration;
- financial actions;
- Customer communication;
- regulated Data processing;
- critical infrastructure changes.

---

# 74. Tool Certification Record

```yaml
tool_certification:
  certification_id: required

  tool_id: required
  tool_version: required
  connector_id: required
  connector_version: required
  tool_instance_id: required

  agent_definition_id: required
  agent_instance_id: required
  agent_tool_profile_id: required

  certified_actions: required
  prohibited_actions: required

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

# 75. Tool Assignment Eligibility

Before assignment, validate:

- Tool Definition is approved;
- connector is approved;
- Tool Instance is approved;
- Agent Definition is approved;
- Agent Instance is eligible where applicable;
- Role requires or permits the Tool;
- Capability requires or permits the Tool;
- required Skills are current;
- Product and Project scopes match;
- Tenant and Customer scopes match;
- environment matches;
- Data classes are permitted;
- Risk ceiling is valid;
- credential method is approved;
- permission policy is approved;
- evaluation is current;
- certification is current where required;
- budget is available;
- monitoring is active.

---

# 76. Runtime Tool Eligibility

Runtime Tool Eligibility must be calculated from:

```text
Approved Tool Definition

Approved Connector

Approved Tool Instance

Approved Agent Tool Profile

Approved Tool Assignment

Eligible Agent Definition

Eligible Agent Instance

Valid Agent Lifecycle State

Valid Role

Valid Skills

Valid Capability Allocation

Valid Credential

Valid Permission Policy

Matching Product Scope

Matching Project Scope

Matching Tenant Scope

Matching Customer Scope

Matching Environment

Permitted Data Classification

Valid Risk Ceiling

Available Budget

Available Capacity

Active Monitoring

No Suspension or Quarantine
```

All mandatory controls must pass.

---

# 77. Runtime Tool Eligibility States

```text
UNKNOWN

NOT-DEFINED

CONNECTOR-UNAVAILABLE

INSTANCE-UNAVAILABLE

NOT-ASSIGNED

CREDENTIAL-PENDING

PERMISSION-PENDING

EVALUATION-PENDING

CERTIFICATION-PENDING

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

---

# 78. Tool Activation

Tool activation permits an eligible Agent Tool Assignment to execute approved
actions.

Activation must record:

```yaml
tool_activation:
  activation_id: required

  assignment_id: required
  agent_tool_profile_id: required
  agent_instance_id: required

  tool_id: required
  connector_id: required
  tool_instance_id: required

  credential_validation: required
  permission_validation: required
  scope_validation: required
  evaluation_validation: required
  certification_validation: conditional
  monitoring_validation: required
  suspension_test_reference: required

  activated_by: required
  approved_by: required
  activated_at: required
  review_at: required
  expires_at: required

  evidence_references: required
  status: required
```

---

# 79. Tool Availability

Tool availability must distinguish:

```text
DEFINED

APPROVED

CONNECTOR-AVAILABLE

INSTANCE-CONFIGURED

CREDENTIAL-AVAILABLE

PERMISSION-VALID

ASSIGNED

RUNTIME-ELIGIBLE

ACTIVE

HEALTHY

LIVE-TESTED

PRODUCTION-CONTROLLED
```

These states must not be collapsed.

---

# 80. Tool Availability States

```text
UNKNOWN

NOT-CONFIGURED

AUTHENTICATION-BLOCKED

AUTHORIZATION-BLOCKED

RATE-LIMITED

COST-BLOCKED

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

# 81. Tool Health States

```text
HEALTHY

WATCH

DEGRADED

RATE-LIMITED

AUTHENTICATION-FAILED

AUTHORIZATION-DENIED

UNAVAILABLE

TIMED-OUT

PARTIAL-FAILURE

COMPROMISED

SUSPENDED

QUARANTINED

RETIRED

UNKNOWN
```

Unknown health must not be reported as healthy.

---

# 82. Rate Limits

Rate limits may apply at:

- enterprise level;
- Product level;
- Project level;
- Tenant level;
- Customer level;
- Agent level;
- Tool level;
- Tool Instance level;
- action level;
- workflow level;
- Task level.

Rate-limit behavior must be:

- observable;
- attributable;
- bounded;
- compatible with retries;
- non-destructive.

---

# 83. Concurrency Limits

Concurrency limits should consider:

- Agent capacity;
- Tool provider limits;
- account limits;
- Project limits;
- Tenant fairness;
- Data contention;
- transaction conflicts;
- cost;
- Human-review capacity;
- downstream service capacity.

---

# 84. Cost Limits

Tool cost controls may include:

- cost per action;
- cost per Task;
- daily Agent limit;
- monthly Agent limit;
- Product budget;
- Project budget;
- Tenant budget;
- provider budget;
- warning threshold;
- approval threshold;
- hard stop.

Budget availability does not authorize prohibited actions.

---

# 85. Timeout Controls

Every action should define:

- connection timeout;
- execution timeout;
- total Task timeout;
- cancellation behavior;
- partial-result handling;
- evidence after timeout;
- recovery.

A timeout must not be reported as success.

---

# 86. Retry Controls

Retry policy must define:

- retryable errors;
- non-retryable errors;
- maximum attempts;
- backoff;
- jitter;
- total time limit;
- cost limit;
- duplicate prevention;
- escalation.

---

# 87. Idempotency

Material create, update, communication, financial, and destructive actions
should support:

- idempotency keys;
- operation IDs;
- duplicate checks;
- replay protection;
- result reconciliation.

---

# 88. Partial Failure

A Tool action may partially succeed.

Partial failure must identify:

- completed effects;
- failed effects;
- affected resources;
- rollback status;
- residual inconsistency;
- owner;
- remediation;
- evidence.

Partial success must not be reported as full success.

---

# 89. Fallback

Fallback may use:

- alternate connector;
- alternate Tool Instance;
- alternate provider;
- manual procedure;
- queued execution;
- reduced capability.

Fallback must remain:

- approved;
- scope-compatible;
- Data-compatible;
- Risk-compatible;
- cost-controlled;
- monitored;
- auditable.

---

# 90. Tool Monitoring

Monitoring should include:

- Tool health;
- connector health;
- Tool Instance health;
- authentication failures;
- authorization denials;
- action volume;
- rate-limit events;
- latency;
- timeouts;
- retries;
- failures;
- partial failures;
- privileged actions;
- destructive actions;
- financial actions;
- communication actions;
- cost;
- scope violations;
- credential use;
- suspension events;
- provider incidents.

---

# 91. Tool Degradation

A Tool is degraded when:

- connector reliability declines;
- provider availability declines;
- authentication failures increase;
- authorization behavior changes;
- latency exceeds safe limits;
- rate limits constrain required work;
- cost becomes abnormal;
- output schemas drift;
- evidence becomes incomplete;
- monitoring becomes unavailable.

---

# 92. Tool Degradation Record

```yaml
tool_degradation:
  degradation_id: required

  tool_id: required
  connector_id: conditional
  tool_instance_id: conditional

  affected_actions: required
  affected_assignments: required
  affected_scope: required

  severity: required
  detected_at: required

  suspected_causes: required
  confirmed_causes: conditional

  temporary_restrictions: required
  remaining_safe_actions: required

  remediation_owner: required
  remediation_plan: required
  due_at: required

  suspension_required: required
  quarantine_required: required

  evidence_references: required
  status: required
```

---

# 93. Tool Degradation Response

```text
Degradation Detected
    ↓
Tool, Connector, Instance, and Scope Identified
    ↓
Data and Evidence Validated
    ↓
Temporary Restriction Applied
    ↓
Provider or Connector Cause Investigated
    ↓
Connector, Credential, Permission, or Tool Repaired
    ↓
Evaluation Repeated
    ↓
Controlled Observation
    ↓
Healthy, Restricted, Suspended, Quarantined, Replaced, or Retired
```

---

# 94. Tool Restriction

Restriction may reduce:

- permitted actions;
- permitted resources;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- environment;
- Data classes;
- rate limits;
- concurrency;
- cost;
- duration;
- Production access;
- communication authority.

---

# 95. Tool Suspension

Tool access should be suspended when:

- credential compromise is suspected;
- connector compromise is suspected;
- provider compromise is suspected;
- permission expires;
- certification expires;
- Product or Project scope becomes invalid;
- Tenant isolation fails;
- Data policy fails;
- repeated unauthorized action occurs;
- monitoring is unavailable for critical actions;
- evidence is fabricated;
- cost hard stop is reached;
- valid Governance instruction exists.

---

# 96. Tool Suspension Procedure

Tool suspension must:

1. identify affected Tool Definitions;
2. identify affected connectors;
3. identify affected Tool Instances;
4. identify affected Agent Tool Profiles;
5. block new Tool actions;
6. revoke or disable credentials where required;
7. disable scheduled actions;
8. isolate affected connectors;
9. preserve logs and evidence;
10. identify affected Products and Projects;
11. identify affected Tenants and Customers;
12. notify accountable owners;
13. create incident or review record;
14. select fallback or manual path;
15. define remediation;
16. define reactivation conditions;
17. verify suspension effectiveness.

---

# 97. Tool Quarantine

A Tool, connector, credential, or Tool Instance may be quarantined when:

- malicious behavior is suspected;
- supply-chain compromise is suspected;
- evidence integrity is uncertain;
- cross-Tenant leakage may have occurred;
- unauthorized actions may have occurred;
- provider output cannot be trusted.

Quarantined Tools must not support normal Agent execution.

---

# 98. Tool Reactivation

Reactivation requires:

- root cause resolved;
- Tool Definition still approved;
- connector still approved;
- Tool Instance still approved;
- credentials rotated or validated;
- permissions revalidated;
- Product and Project scopes revalidated;
- Tenant and Customer scopes revalidated;
- Data policy revalidated;
- evaluation repeated;
- certification renewed where required;
- monitoring restored;
- evidence validated;
- explicit approval.

---

# 99. Tool Revocation

Revocation removes Tool authority because of:

- malicious misuse;
- serious policy violation;
- fabricated evidence;
- repeated unauthorized actions;
- legal restriction;
- critical Security incident;
- unacceptable Risk;
- inability to remediate;
- Governance decision.

Revoked access must not be restored through routine renewal.

---

# 100. Tool Replacement

Replacement may be required because of:

- provider retirement;
- Security weakness;
- unacceptable cost;
- unreliable operation;
- changed functionality;
- changed Data policy;
- regulatory restriction;
- connector incompatibility;
- Product strategy change;
- better approved alternative.

---

# 101. Tool Replacement Process

```text
Replacement Need
    ↓
Alternative Tool Evaluated
    ↓
Security, Privacy, Data, Cost, and Capability Review
    ↓
New Tool Definition Approved
    ↓
New Connector Approved
    ↓
New Tool Instances Configured
    ↓
New Agent Tool Profiles Evaluated
    ↓
Restricted Parallel Operation
    ↓
Migration
    ↓
Old Tool Restriction
    ↓
Old Tool Retirement
```

---

# 102. Tool Deprecation

A Tool may be deprecated when:

- no new Tool Instances should be created;
- no new Agent Tool Assignments should be created;
- provider support is ending;
- a safer replacement exists;
- the Tool no longer meets requirements;
- the connector is obsolete;
- Data handling is no longer acceptable.

Deprecation must identify:

- replacement;
- affected connectors;
- affected Tool Instances;
- affected Agent Tool Profiles;
- affected workflows;
- migration deadline;
- exceptions;
- retirement date.

---

# 103. Tool Retirement

Tool retirement must include:

- blocking new Tool Instances;
- blocking new assignments;
- ending active sessions;
- cancelling scheduled actions;
- revoking credentials;
- removing permissions;
- removing connector access;
- updating Agent Tool Profiles;
- migrating workflows;
- preserving evidence;
- preserving audit;
- confirming no executable access remains;
- updating Registry state.

---

# 104. Tool Archival

Archived Tool records should preserve:

- Tool Definitions;
- connector Definitions;
- Tool Instances;
- action catalogues;
- credential profiles;
- permission policies;
- Agent Tool Profiles;
- Tool Assignments;
- evaluations;
- certifications;
- incidents;
- suspensions;
- revocations;
- retirement evidence.

Archived Tools must not remain executable.

---

# 105. Tool Versioning

Semantic versioning should be used:

```text
MAJOR.MINOR.PATCH
```

## Major

Used for incompatible changes such as:

- changed Tool purpose;
- changed provider;
- changed authentication method;
- changed action semantics;
- increased Risk;
- new Production action;
- new destructive action;
- new Data class;
- changed permission architecture.

## Minor

Used for backward-compatible additions.

## Patch

Used for non-material corrections or clarifications.

---

# 106. Material Change Triggers

Re-evaluation may be required after changes to:

- Tool Definition;
- connector;
- Tool Instance;
- provider;
- API;
- SDK;
- authentication;
- credential method;
- permission policy;
- action catalogue;
- Agent Tool Profile;
- Agent Definition;
- Skill;
- Capability;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- Data class;
- Risk;
- rate limit;
- cost model;
- monitoring.

---

# 107. Tool Registry Authority

The future Tool Registry should be authoritative for:

- Tool identity;
- Tool version;
- Tool Definition;
- Tool category;
- provider;
- Tool owner;
- action catalogue;
- supported authentication methods;
- supported Data classes;
- supported environments;
- Risk;
- lifecycle state;
- approval state;
- review date;
- deprecation;
- retirement.

---

# 108. Connector Registry Authority

The future Connector Registry should be authoritative for:

- connector identity;
- connector version;
- supported Tool;
- supported actions;
- schemas;
- authentication integration;
- timeout behavior;
- retry behavior;
- idempotency;
- lifecycle state;
- approval state.

---

# 109. Tool Instance Registry Authority

The future Tool Instance Registry should be authoritative for:

- Tool Instance identity;
- Tool and connector versions;
- account or workspace reference;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- environment;
- region;
- credential profile;
- permission policy;
- owner;
- lifecycle state;
- health state;
- availability state.

---

# 110. Registry Boundary

The Tool Registry must not replace:

- Agent Registry;
- Role Registry;
- Skill Registry;
- Capability Registry;
- Model Registry;
- Prompt Registry;
- Memory Registry;
- Workflow Registry;
- credential broker;
- permission system;
- allocation system;
- evidence store;
- audit system;
- cost ledger;
- monitoring system.

---

# 111. Registry Source-of-Truth Rules

The Tool Registry is authoritative for:

```text
What the Tool is

Which version is current

Which actions are defined

Which environments and Data classes are supported

Which Risk applies

Which lifecycle state applies
```

Runtime systems remain authoritative for:

- connector health;
- Tool Instance health;
- credential validity;
- permission validity;
- active assignments;
- runtime eligibility;
- action execution;
- incidents;
- suspension enforcement.

---

# 112. Tool Discovery

Tool discovery should support search by:

- Tool name;
- Tool ID;
- category;
- provider;
- owner;
- action;
- Product;
- Project;
- Tenant eligibility;
- environment;
- region;
- Data class;
- Risk;
- authentication method;
- lifecycle state;
- availability state.

---

# 113. Tool Matching

Tool matching should compare:

- requested action;
- required Tool category;
- Capability;
- Skill;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- Data class;
- Risk;
- Agent Tool Assignment;
- credential validity;
- permission validity;
- rate limits;
- cost;
- availability;
- restrictions.

---

# 114. Tool Request Record

```yaml
tool_request:
  request_id: required

  requested_tool_id: conditional
  requested_tool_category: required
  requested_action_id: required
  target_resource: required

  capability_id: required
  skill_ids: required
  task_id: required

  organization_id: required
  product_id: required
  project_id: conditional
  tenant_id: conditional
  customer_id: conditional
  environment: required
  region: conditional
  data_classification: required

  maximum_risk_class: required
  cost_limit: required
  timeout_limit: required

  requester_identity: required
  requester_authority: required
  approval_reference: conditional

  requested_at: required
  expires_at: required
  request_state: required
```

---

# 115. Tool Match Result

```yaml
tool_match:
  match_id: required
  request_id: required

  tool_id: required
  tool_version: required
  connector_id: required
  connector_version: required
  tool_instance_id: required

  agent_tool_profile_id: required
  assignment_id: required

  action_match: required
  resource_match: required
  scope_match: required
  environment_match: required
  data_match: required
  risk_match: required

  credential_status: required
  permission_status: required
  evaluation_status: required
  certification_status: conditional
  availability_status: required
  rate_limit_status: required
  cost_status: required

  restrictions: conditional
  missing_requirements: conditional
  human_approval_required: required

  match_result: ELIGIBLE | CONDITIONALLY-ELIGIBLE | INELIGIBLE
  evaluated_at: required
  evidence_reference: required
```

---

# 116. Tool Routing Boundary

Tool routing must not:

- approve a Tool;
- create a Tool Instance;
- issue a credential;
- grant permission;
- create an Agent Tool Assignment;
- expand authority;
- activate suspended Agents;
- use revoked credentials;
- cross Project boundaries;
- cross Tenant boundaries;
- bypass approval;
- hide matching failure.

---

# 117. Tool Evidence

Every material Tool lifecycle or execution event should produce or reference
evidence.

Evidence may include:

- Tool Definition;
- connector Definition;
- Tool Instance;
- action catalogue;
- credential profile;
- permission policy;
- Agent Tool Profile;
- Tool Assignment;
- evaluation;
- certification;
- activation;
- Tool execution;
- provider response;
- monitoring;
- incident;
- suspension;
- revocation;
- retirement.

---

# 118. Tool Execution Evidence Record

```yaml
tool_execution:
  tool_execution_id: required

  task_id: required
  workflow_id: conditional
  envelope_id: required

  agent_definition_id: required
  agent_instance_id: required

  tool_id: required
  tool_version: required
  connector_id: required
  connector_version: required
  tool_instance_id: required

  action_id: required
  action_version: required
  action_category: required
  target_reference: required

  organization_id: required
  product_id: required
  project_id: conditional
  tenant_id: conditional
  customer_id: conditional
  environment: required
  region: conditional
  data_classification: required

  credential_profile_id: required
  permission_policy_id: required
  authority_reference: required
  approval_reference: conditional

  started_at: required
  ended_at: conditional

  result: required
  retry_count: required
  cost: conditional

  before_state_reference: conditional
  after_state_reference: conditional
  rollback_reference: conditional

  limitations: required
  residual_risks: required
  evidence_reference: required
```

---

# 119. Tool Evidence Quality

```text
TE-0 — No Evidence

TE-1 — Agent Tool Claim

TE-2 — Human-Reviewed Tool Record

TE-3 — Connector or Provider Execution Record

TE-4 — Controlled Tool Evaluation Evidence

TE-5 — Runtime Operational Tool Evidence

TE-6 — Independent or Audited Tool Evidence
```

Production Tool claims require runtime evidence.

---

# 120. Tool Audit

A Tool Registry audit should verify:

- unique Tool IDs;
- current versions;
- providers;
- owners;
- action catalogues;
- authentication methods;
- connectors;
- Tool Instances;
- credential profiles;
- permission policies;
- Agent Tool Profiles;
- Tool Assignments;
- Product and Project scopes;
- Tenant and Customer scopes;
- environment and region;
- Data classes;
- Risk;
- evaluation;
- certification;
- expiry;
- restrictions;
- suspensions;
- quarantines;
- revocations;
- deprecated Tools;
- retired Tools;
- unsupported runtime claims;
- duplicate Tools.

---

# 121. Tool Reporting

Tool reporting should distinguish:

```text
Defined Tools

Approved Tools

Approved Connectors

Configured Tool Instances

Approved Credential Profiles

Approved Permission Policies

Proposed Agent Tool Profiles

Approved Agent Tool Profiles

Assigned Agent Tool Profiles

Runtime-Eligible Tool Assignments

Active Tool Assignments

Restricted Tool Assignments

Suspended Tool Assignments

Quarantined Tools

Expired Tool Assignments

Revoked Tool Assignments

Deprecated Tools

Retired Tools

Production-Controlled Tools
```

One undefined `Total Tools` number is insufficient.

---

# 122. Tool Metrics

Potential metrics include:

| Metric | Definition |
|---|---|
| Registry Completeness | Complete Tool Definitions / registered Tool Definitions |
| Connector Compliance | Approved connectors satisfying required controls / approved connectors |
| Tool Instance Compliance | Valid Tool Instances / active Tool Instances |
| Credential Currency | Current credentials / active credentials |
| Permission Validity | Valid permission policies / active permission policies |
| Runtime Eligibility | Runtime-eligible assignments / approved active assignments |
| Tool Availability | Healthy Tool Instance time / expected Tool Instance time |
| Tool Success Rate | Successful Tool executions / completed Tool executions |
| Tool Failure Rate | Failed Tool executions / attempted Tool executions |
| Authorization Denial Rate | Denied unauthorized requests / unauthorized requests |
| Evidence Completeness | Material Tool executions with complete evidence / material Tool executions |
| Cost Attribution | Attributed Tool cost / material Tool cost |
| Cross-Project Violation Rate | Unauthorized cross-Project Tool events |
| Cross-Tenant Violation Rate | Unauthorized cross-Tenant Tool events |
| Suspension Effectiveness | Successfully blocked Tool actions / suspension tests or incidents |
| Retirement Completeness | Retired Tools with all access removed / retired Tools |

Numerical targets require separate approval.

---

# 123. One-Agent Read-Only Tool Proof

The first Tool Registry proof should include:

```text
1 Approved Tool Definition

1 Approved Connector

1 Approved Non-Production Tool Instance

1 Approved Read-Only Action

1 Approved Credential Method

1 Approved Permission Policy

1 Approved Agent Definition

1 Runtime Agent Instance

1 Approved Role

1 Valid Skill

1 Approved Capability

1 Agent Tool Profile

1 Tool Assignment

1 Product

1 Project

1 Non-Production Environment

1 Controlled Evaluation

1 Runtime Eligibility Decision

1 Tool Execution

1 Verifiable-Work Envelope

1 Credential Revocation Test

1 Suspension Test

1 Retirement Test
```

---

# 124. Controlled Write Tool Proof

A controlled write proof should add:

- one reversible write action;
- exact target;
- before-state evidence;
- Human approval;
- idempotency;
- retry handling;
- rollback;
- after-state verification;
- cost attribution;
- independent review.

---

# 125. Destructive Tool Proof

A destructive Tool proof should occur only in an isolated safe environment.

It should verify:

- exact target;
- dry run;
- backup;
- independent Human approval;
- separation of duties;
- bounded execution;
- rollback or compensation;
- evidence preservation;
- emergency stop;
- suspension.

---

# 126. Team Tool Proof

A Team Tool proof should verify:

- Team identity;
- distinct Agent identities;
- distinct Tool Profiles;
- distinct credentials;
- action attribution;
- separation of duties;
- shared workflow;
- contributor evidence;
- one Agent cannot use another Agent’s credential;
- Team suspension.

---

# 127. Multi-Project Tool Proof

A Multi-Project proof should verify:

- separate Project Tool Assignments;
- separate Tool Instances where required;
- separate credentials where required;
- separate repositories or workspaces;
- Project cost attribution;
- Project evidence attribution;
- denied cross-Project actions;
- Project closure;
- access removal.

---

# 128. Multi-Tenant Tool Proof

A Multi-Tenant proof should verify:

- Tenant-scoped Tool Instances;
- Tenant-scoped permission policies;
- Tenant-scoped credentials where required;
- Tenant-scoped Data;
- Tenant-scoped evidence;
- Tenant cost attribution;
- denied cross-Tenant actions;
- Tenant offboarding;
- access removal.

---

# 129. Customer Tool Proof

A Customer Tool proof should verify:

- approved Customer scope;
- approved Product;
- approved Project;
- approved Tenant;
- Customer Data restrictions;
- exact Tool Instance;
- exact actions;
- Human owner;
- communication authority where applicable;
- evaluation;
- expiry;
- suspension.

---

# 130. Production Tool Gate

Before an Agent uses a Tool in Production:

- [ ] Tool Definition is approved.
- [ ] Tool version is current.
- [ ] connector is approved.
- [ ] connector version is current.
- [ ] Tool Instance is approved.
- [ ] Tool Instance health is verified.
- [ ] action is explicitly approved.
- [ ] Agent Definition is approved.
- [ ] Agent Instance is Production-controlled.
- [ ] Role permits the action.
- [ ] required Skills are current.
- [ ] Capability permits the action.
- [ ] Agent Tool Profile is approved.
- [ ] Tool Assignment is approved.
- [ ] credential is Production-specific.
- [ ] credential is attributable.
- [ ] credential is current.
- [ ] permission policy is current.
- [ ] Product scope is exact.
- [ ] Project scope is exact.
- [ ] Tenant scope is exact.
- [ ] Customer scope is exact.
- [ ] environment is Production-specific.
- [ ] region is approved.
- [ ] Data classes are approved.
- [ ] Risk ceiling is valid.
- [ ] evaluation is current.
- [ ] certification is current where required.
- [ ] rate limits are active.
- [ ] concurrency limits are active.
- [ ] cost limits are active.
- [ ] timeout and retry controls are tested.
- [ ] idempotency is tested where required.
- [ ] monitoring is active.
- [ ] audit is active.
- [ ] evidence capture is active.
- [ ] suspension is tested.
- [ ] rollback or compensation is tested.
- [ ] incident response is ready.
- [ ] qualified Human approval exists.
- [ ] Founder approval exists where required.

---

# 131. Production Observation Window

A newly Production-authorized Tool Assignment should operate under a bounded
observation window.

The window should define:

- duration;
- Agent;
- Tool;
- Tool Instance;
- approved actions;
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
- failure thresholds;
- evidence requirements;
- suspension conditions;
- expansion criteria.

---

# 132. Tool Hard Stops

The following should normally block or suspend Tool use:

- fabricated evidence;
- fabricated Human approval;
- revoked credential;
- expired permission;
- unauthorized action;
- unapproved connector;
- unapproved Tool Instance;
- cross-Project access;
- cross-Tenant access;
- Customer Data disclosure;
- secret exposure;
- destructive action without approval;
- Production action without Production authority;
- ignored suspension;
- critical Security compromise;
- critical privacy failure.

---

# 133. Tool Exceptions

A Tool exception must define:

- exception ID;
- Tool ID;
- connector;
- Tool Instance;
- Agent Tool Profile;
- Tool Assignment;
- control being bypassed;
- exact reason;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
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
- unrestricted Production access;
- permanent emergency authority;
- cross-Tenant leakage;
- constitutional bypass.

---

# 134. Tool Conflict

Tool conflicts may include:

- duplicate Tool capability;
- action overlap;
- credential conflict;
- permission conflict;
- Tool Instance ownership conflict;
- Product conflict;
- Project conflict;
- Tenant conflict;
- Data conflict;
- regional conflict;
- Security conflict;
- cost conflict;
- provider conflict.

---

# 135. Tool Conflict Record

```yaml
tool_conflict:
  conflict_id: required

  tool_ids: required
  connector_ids: conditional
  tool_instance_ids: conditional
  agent_tool_profile_ids: conditional

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

# 136. Tool Portability

A Tool or connector may be reused across Products or Projects only when:

- Tool purpose remains equivalent;
- action semantics remain equivalent;
- authentication remains compatible;
- Data rules remain compatible;
- permission policies remain compatible;
- Risk remains equal or lower;
- evaluation confirms portability;
- approval exists.

---

# 137. Non-Portable Tools

A Tool may be non-portable because of:

- Product-specific account;
- Project-specific repository;
- Tenant-specific workspace;
- Customer-specific environment;
- regional restrictions;
- regulated Data;
- proprietary integration;
- environment-specific Risk;
- contractual restriction.

---

# 138. Tool Profile Inheritance

Tool Profiles may inherit approved restrictions.

```text
Enterprise Base Tool Policy
        ↓
Department Tool Policy
        ↓
Role Tool Policy
        ↓
Agent Definition Tool Profile
        ↓
Product or Project Overlay
        ↓
Tenant or Customer Overlay
        ↓
Agent Tool Assignment
```

Inheritance may add stricter controls.

It must not remove mandatory higher-level restrictions.

---

# 139. Tool Anti-Gaming Controls

Tool systems must prevent:

- counting connector existence as Tool implementation;
- counting login access as Agent permission;
- counting provider action availability as approved action availability;
- hiding denied actions;
- excluding failed retries;
- hiding Human intervention;
- transferring cost to another Product;
- changing action categories to reduce Risk;
- reporting simulated Tool execution as runtime execution;
- extending credentials without review;
- using one Tool Assignment across unrelated Tenants;
- bypassing permission policies through fallback.

---

# 140. Tool Risks

| Risk | Required Response |
|---|---|
| Connector treated as authority | Enforce action-level authorization |
| Credential treated as permission | Validate permission separately |
| Tool Definition treated as active Tool | Separate lifecycle states |
| Shared credential | Use attributable short-lived identity |
| Excessive Tool scope | Apply least privilege |
| Cross-Project access | Use Project-scoped Tool Assignments |
| Cross-Tenant access | Use Tenant-scoped permissions |
| Development access inherited by Production | Use environment-specific profiles |
| Retry creates duplicate effect | Use idempotency |
| Partial failure hidden | Record completed and failed effects |
| Destructive action without recovery | Block execution |
| Provider compromise | Suspend and quarantine |
| Connector drift | Version and re-evaluate |
| Cost explosion | Apply budgets and hard stops |
| Monitoring unavailable | Restrict critical actions |
| Agent self-approval | Require independent approval |
| Tool output trusted blindly | Validate output |
| Expired credential remains usable | Enforce expiry and revocation |
| Retired Tool remains accessible | Perform final access verification |

---

# 141. Tool Anti-Patterns

Mianx.ai must avoid:

- granting every connector action to every Agent;
- one shared credential for all Agents;
- storing secrets in prompts;
- treating read-only access as automatically safe;
- one Tool Profile across unrelated Projects;
- one Tool Profile across unrelated Tenants;
- using Development credentials in Production;
- unrestricted repository access;
- unrestricted database access;
- allowing Agents to transfer funds;
- allowing Agents to sign contracts;
- allowing Agents to publish externally without approval;
- destructive actions without backup;
- retrying non-idempotent actions blindly;
- hiding Tool failures;
- disabling monitoring to reduce cost;
- treating Agent self-report as Tool evidence;
- retaining retired Tool access;
- claiming implementation from documentation.

---

# 142. Prohibited Tool Behaviors

An Agent must not:

- register its own approved Tool;
- approve its own connector;
- create its own Tool Instance;
- add a Tool to its own Profile;
- increase its own Tool permissions;
- issue its own credential;
- read or expose credential values;
- reuse another Agent’s credential;
- bypass the credential broker;
- expand Product scope;
- expand Project scope;
- expand Tenant scope;
- expand Customer scope;
- change environment scope;
- change cost limits;
- change rate limits;
- approve its own high-risk Tool action;
- execute an unapproved action;
- substitute an unapproved connector;
- substitute an unapproved Tool Instance;
- hide Tool failure;
- fabricate Tool evidence;
- disable Tool monitoring;
- continue Tool use after suspension;
- retain Tool access after retirement.

---

# 143. Current Verified Baseline

At the time this document is created:

```yaml
documentation:
  tool_registry_document:
    id: AIW-REG-TOOL-001
    version: 1.0.0
    status: Draft
    canonical: false

target_state:
  tool_definition_model: defined
  connector_definition_model: defined
  tool_instance_model: defined
  action_catalogue_model: defined
  credential_profile_model: defined
  permission_policy_model: defined
  agent_tool_profile_model: defined
  tool_assignment_model: defined
  tool_categories: 17
  action_categories: 12
  runtime_eligibility_model: defined
  production_tool_gate: defined

implementation:
  tool_registry: not_implemented
  connector_registry: not_implemented
  tool_instance_registry: not_implemented
  credential_broker: not_implemented
  tool_policy_engine: not_implemented
  runtime_action_authorization: not_verified
  automated_expiry_enforcement: not_verified
  automated_tool_suspension: not_verified
  automated_tool_quarantine: not_verified

runtime:
  approved_tool_definitions: 0_proven
  approved_connectors: 0_proven
  approved_tool_instances: 0_proven
  active_agent_tool_profiles: 0_proven
  active_tool_assignments: 0_proven
  runtime_eligible_tool_assignments: 0_proven
  production_authorized_tool_assignments: 0_proven
```

---

# 144. Current-State Boundary

This document does not prove that Mianx.ai currently has:

- an implemented Tool Registry;
- an implemented Connector Registry;
- an implemented Tool Instance Registry;
- an implemented credential broker;
- an implemented Tool Policy Engine;
- approved Tool Definitions;
- approved connectors;
- approved Tool Instances;
- approved credential profiles;
- approved permission policies;
- active Agent Tool Profiles;
- active Tool Assignments;
- runtime action authorization;
- runtime Project isolation;
- runtime Tenant isolation;
- automated credential expiry;
- automated permission expiry;
- automated Tool suspension;
- automated Tool quarantine;
- Production-authorized Tool execution.

This document defines target-state Tool Registry Governance only.

---

# 145. Adoption Requirements

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
- [ ] Tool Definition schema is approved.
- [ ] Connector Definition schema is approved.
- [ ] Tool Instance schema is approved.
- [ ] Tool Action schema is approved.
- [ ] Credential Profile schema is approved.
- [ ] Permission Policy schema is approved.
- [ ] Agent Tool Profile schema is approved.
- [ ] Tool Assignment schema is approved.
- [ ] Tool ID standards are approved.
- [ ] Tool categories are approved.
- [ ] action categories are approved.
- [ ] Tool ownership model is approved.
- [ ] Product and Project scopes are approved.
- [ ] Tenant and Customer scopes are approved.
- [ ] environment and regional scopes are approved.
- [ ] Data-classification rules are approved.
- [ ] Tool Risk model is approved.
- [ ] Tool Definition lifecycle is approved.
- [ ] connector lifecycle is approved.
- [ ] Tool Instance lifecycle is approved.
- [ ] Tool Assignment lifecycle is approved.
- [ ] proposal and duplication review are approved.
- [ ] Tool review process is approved.
- [ ] Tool approval process is approved.
- [ ] connector evaluation is approved.
- [ ] Tool evaluation process is approved.
- [ ] certification process is approved.
- [ ] assignment eligibility is approved.
- [ ] runtime eligibility calculation is approved.
- [ ] Tool activation is approved.
- [ ] availability and health states are approved.
- [ ] rate-limit controls are approved.
- [ ] concurrency controls are approved.
- [ ] cost controls are approved.
- [ ] timeout and retry controls are approved.
- [ ] idempotency controls are approved.
- [ ] partial-failure controls are approved.
- [ ] fallback controls are approved.
- [ ] monitoring is approved.
- [ ] degradation and restriction are approved.
- [ ] suspension and quarantine are approved.
- [ ] reactivation and revocation are approved.
- [ ] replacement, deprecation, retirement, and archival are approved.
- [ ] versioning and material-change rules are approved.
- [ ] Tool Registry authority is approved.
- [ ] Connector Registry authority is approved.
- [ ] Tool Instance Registry authority is approved.
- [ ] Registry boundaries are approved.
- [ ] Tool discovery and matching are approved.
- [ ] Tool Request schema is approved.
- [ ] Tool Match schema is approved.
- [ ] Tool routing boundary is approved.
- [ ] evidence model is approved.
- [ ] audit and reporting are approved.
- [ ] Production Tool gate is approved.
- [ ] hard stops are approved.
- [ ] exception controls are approved.
- [ ] conflict and portability controls are approved.
- [ ] inheritance rules are approved.
- [ ] anti-gaming controls are approved.
- [ ] Tool Registry is implemented.
- [ ] Connector Registry is implemented.
- [ ] Tool Instance Registry is implemented.
- [ ] credential broker is implemented.
- [ ] Tool Policy Engine is implemented.
- [ ] runtime action authorization is implemented.
- [ ] expiry enforcement is implemented.
- [ ] suspension is technically enforced.
- [ ] quarantine is technically enforced.
- [ ] one-Agent read-only Tool proof passes.
- [ ] controlled write Tool proof passes.
- [ ] destructive Tool proof passes in an isolated environment.
- [ ] Team Tool proof passes.
- [ ] Multi-Project Tool proof passes.
- [ ] Multi-Tenant Tool proof passes where applicable.
- [ ] Customer Tool proof passes.
- [ ] Production Tool proof passes.
- [ ] `INDEX.md` is updated.
- [ ] `ROADMAP.md` is updated.
- [ ] `CHANGELOG.md` is updated.

---

# 146. Review Questions

Reviewers should answer:

1. Is Tool Definition separated from connector Definition?
2. Is connector Definition separated from Tool Instance?
3. Is Tool Instance separated from Tool action?
4. Is credential separated from permission?
5. Is permission separated from Agent Tool Profile?
6. Is Agent Tool Profile separated from Tool Assignment?
7. Is Tool Assignment separated from runtime eligibility?
8. Is runtime eligibility separated from Production authority?
9. Are Tools separated from Skills and capabilities?
10. Are Tool IDs and versions explicit?
11. Are connector and Tool Instance identities explicit?
12. Are Tool and action categories complete?
13. Are read actions correctly treated as potentially sensitive?
14. Are communication actions Human-controlled?
15. Are financial actions sufficiently restricted?
16. Are privileged actions sufficiently governed?
17. Are destructive actions protected by recovery controls?
18. Are Production actions separately authorized?
19. Is default-deny behavior explicit?
20. Are credentials excluded from prompts and logs?
21. Are shared credentials restricted?
22. Are Product and Project boundaries explicit?
23. Are Tenant and Customer boundaries explicit?
24. Are environment and regional boundaries explicit?
25. Are Data classifications enforced?
26. Is Tool Risk action-specific?
27. Are ownership responsibilities explicit?
28. Are lifecycle states complete?
29. Can Tool Definition approval activate a Tool Instance?
30. Can connector approval create Agent permission?
31. Is evaluation configuration-specific?
32. Are critical evaluation failures explicit?
33. Is certification time-bounded?
34. Is runtime eligibility calculated from all controls?
35. Is unknown eligibility prevented from appearing eligible?
36. Are rate, concurrency, and cost limits controlled?
37. Are retries safe?
38. Is idempotency addressed?
39. Are partial failures visible?
40. Can fallback bypass Governance?
41. Can Tool access be suspended immediately?
42. Is quarantine distinct from suspension?
43. Does reactivation require full revalidation?
44. Does retirement remove all executable access?
45. Are Registry authorities and boundaries clear?
46. Can Tool matching grant permission?
47. Are Production gates complete?
48. Are exception controls time-bounded?
49. Are current-state limitations explicit?
50. Are any runtime Tool claims unsupported?

---

# 147. Definition of Done

This document is content-complete for review when:

- [ ] purpose is defined;
- [ ] current authority status is explicit;
- [ ] exact strategic hierarchy is included;
- [ ] Tool Registry objective is defined;
- [ ] Tool Registry principles are defined;
- [ ] non-equivalence rules are defined;
- [ ] Tool Definition is defined;
- [ ] connector Definition is defined;
- [ ] Tool Instance is defined;
- [ ] Tool action is defined;
- [ ] action catalogue is defined;
- [ ] credential method is defined;
- [ ] permission policy is defined;
- [ ] Agent Tool Profile is defined;
- [ ] Tool Assignment is defined;
- [ ] runtime Tool eligibility is defined;
- [ ] Registry Entry is defined;
- [ ] entity model is defined;
- [ ] ID standards are defined;
- [ ] identity rules are defined;
- [ ] Tool Definition Record is defined;
- [ ] Connector Definition Record is defined;
- [ ] Tool Instance Record is defined;
- [ ] Tool Action Record is defined;
- [ ] Credential Profile Record is defined;
- [ ] Permission Policy Record is defined;
- [ ] Agent Tool Profile Record is defined;
- [ ] Tool Assignment Record is defined;
- [ ] Tool categories are defined;
- [ ] action categories are defined;
- [ ] read actions are defined;
- [ ] draft actions are defined;
- [ ] create and update actions are defined;
- [ ] communication actions are defined;
- [ ] repository actions are defined;
- [ ] database actions are defined;
- [ ] infrastructure actions are defined;
- [ ] financial actions are defined;
- [ ] privileged actions are defined;
- [ ] destructive actions are defined;
- [ ] Production actions are defined;
- [ ] ownership is defined;
- [ ] Product and Project scopes are defined;
- [ ] Tenant and Customer scopes are defined;
- [ ] environment and regional scopes are defined;
- [ ] Data-classification scope is defined;
- [ ] Tool Risk is defined;
- [ ] Tool Definition lifecycle is defined;
- [ ] connector lifecycle is defined;
- [ ] Tool Instance lifecycle is defined;
- [ ] Tool Assignment lifecycle is defined;
- [ ] proposal is defined;
- [ ] duplication review is defined;
- [ ] Tool review is defined;
- [ ] approval is defined;
- [ ] connector evaluation is defined;
- [ ] Tool evaluation is defined;
- [ ] Evaluation Profile is defined;
- [ ] critical failures are defined;
- [ ] certification is defined;
- [ ] assignment eligibility is defined;
- [ ] runtime eligibility is defined;
- [ ] Tool activation is defined;
- [ ] Tool availability is defined;
- [ ] Tool health is defined;
- [ ] rate limits are defined;
- [ ] concurrency limits are defined;
- [ ] cost limits are defined;
- [ ] timeout controls are defined;
- [ ] retry controls are defined;
- [ ] idempotency is defined;
- [ ] partial failure is defined;
- [ ] fallback is defined;
- [ ] monitoring is defined;
- [ ] degradation is defined;
- [ ] restriction is defined;
- [ ] suspension is defined;
- [ ] quarantine is defined;
- [ ] reactivation is defined;
- [ ] revocation is defined;
- [ ] replacement is defined;
- [ ] deprecation is defined;
- [ ] retirement is defined;
- [ ] archival is defined;
- [ ] versioning is defined;
- [ ] material-change triggers are defined;
- [ ] Registry authorities are defined;
- [ ] Registry boundaries are defined;
- [ ] source-of-truth rules are defined;
- [ ] discovery is defined;
- [ ] matching is defined;
- [ ] Tool Request is defined;
- [ ] Tool Match is defined;
- [ ] routing boundary is defined;
- [ ] evidence is defined;
- [ ] Tool Execution Evidence is defined;
- [ ] evidence quality is defined;
- [ ] audit is defined;
- [ ] reporting is defined;
- [ ] metrics are defined;
- [ ] one-Agent read-only proof is defined;
- [ ] controlled write proof is defined;
- [ ] destructive Tool proof is defined;
- [ ] Team Tool proof is defined;
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

# 148. Current Documentation Progress

After this document is saved:

```text
Total Planned AI Workforce Documents = 83

Content Complete for Review = 27

Existing Drafts Needing Alignment Review = 0

Empty Placeholders Remaining = 56

Approved Documents = 0

Active Canonical Documents = 0

Agents Folder Documents Completed = 7 of 7

Capabilities Folder Documents Completed = 3 of 4

Tool Registry Implemented = NO

Approved Tool Definitions = 0 Proven

Approved Connectors = 0 Proven

Approved Tool Instances = 0 Proven

Active Agent Tool Profiles = 0 Proven

Runtime-Eligible Tool Assignments = 0 Proven

Production-Authorized Tool Assignments = 0 Proven
```

---

# 149. Current Document Decision

```text
DOCUMENT_ID=AIW-REG-TOOL-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TARGET_STATE_TOOL_REGISTRY=DEFINED

TOOL_REGISTRY_IMPLEMENTATION=NOT_IMPLEMENTED

CONNECTOR_REGISTRY=NOT_IMPLEMENTED

TOOL_INSTANCE_REGISTRY=NOT_IMPLEMENTED

CREDENTIAL_BROKER=NOT_IMPLEMENTED

TOOL_POLICY_ENGINE=NOT_IMPLEMENTED

RUNTIME_TOOL_ELIGIBILITY=NOT_VERIFIED

RUNTIME_ACTION_AUTHORIZATION=NOT_VERIFIED

APPROVED_TOOL_DEFINITIONS=0_PROVEN

APPROVED_CONNECTORS=0_PROVEN

ACTIVE_AGENT_TOOL_PROFILES=0_PROVEN

PRODUCTION_AUTHORIZED_TOOLS=0_PROVEN

RUNTIME_AGENT_ACTIVATION=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

---

# 150. Revision History

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1.0 | 2026-08-06 | Draft | Initial Tool Registry outline |
| 1.0.0 | 2026-08-06 | Draft | Defined Tool Definitions, connector Definitions, Tool Instances, actions, action catalogues, credential profiles, permission policies, Agent Tool Profiles, Tool Assignments, identity, categories, ownership, scope, Risk, lifecycles, evaluation, certification, runtime eligibility, activation, availability, limits, monitoring, degradation, suspension, quarantine, replacement, deprecation, retirement, discovery, matching, evidence, audit, proof requirements, Production gates, risks, prohibited behavior, and current-state boundaries |

---

# 151. Changelog Entry

Append the following entry to:

```text
doc/19-ai-workforce/CHANGELOG.md
```

```markdown
## AIW-CHG-20260806-027 — AI Workforce Tool Registry Completed

| Field | Value |
|---|---|
| Date | 2026-08-06 |
| Change Type | `CREATED`, `STATUS`, `GOVERNANCE`, `TOOL`, `REGISTRY`, `SECURITY` |
| Impact | `I4 — Critical` |
| Risk | `R4` |
| Status | Completed for Review |
| Owner | AI Workforce Council |
| Steward | Tool Governance and Capability Governance |
| Approver | Pending Founder and Enterprise Governance Review |

### Affected Documents

- `doc/19-ai-workforce/capabilities/tool-registry.md`
- `doc/19-ai-workforce/INDEX.md`
- `doc/19-ai-workforce/ROADMAP.md`
- `doc/19-ai-workforce/CHANGELOG.md`

### Previous State

`tool-registry.md` existed as an empty placeholder.

The Agent documentation defined the target Agent Tool model but lacked a
dedicated authoritative Registry separating Tool Definitions, connector
Definitions, Tool Instances, action catalogues, credential methods, permission
policies, Agent Tool Profiles, Tool Assignments, runtime eligibility, and
Production Tool authority.

### New State

The document now defines:

- the difference between Tool Definitions, connectors, Tool Instances, Tool
  actions, credentials, permissions, Agent Tool Profiles, Tool Assignments,
  runtime eligibility, activation, and Production authority;
- Tool Definition, connector, Tool Instance, action, credential, permission,
  Agent Tool Profile, Tool Assignment, evaluation, certification, activation,
  degradation, request, match, conflict, and Tool-execution evidence schemas;
- Tool identity and versioning;
- seventeen Tool categories;
- twelve Tool action categories;
- read, draft, create, update, communication, repository, database,
  infrastructure, financial, privileged, destructive, recovery, and Production
  controls;
- Tool ownership, connector ownership, Security ownership, and cost ownership;
- Product, Project, Tenant, Customer, environment, regional, and Data scope;
- action-specific Tool Risk;
- separate Tool Definition, connector, Tool Instance, and Agent Tool Assignment
  lifecycles;
- Tool proposal, duplication review, review, and approval;
- connector and Tool evaluation;
- Tool certification;
- Tool Assignment eligibility;
- runtime Tool eligibility and activation;
- Tool availability and health states;
- rate, concurrency, cost, timeout, retry, idempotency, partial-failure, and
  fallback controls;
- Tool monitoring, degradation, restriction, suspension, quarantine,
  reactivation, and revocation;
- Tool replacement, deprecation, retirement, and archival;
- Tool Registry, Connector Registry, and Tool Instance Registry authorities;
- Registry source-of-truth boundaries;
- Tool discovery, matching, requests, and routing boundaries;
- Tool execution evidence, evidence quality, audit, reporting, and metrics;
- one-Agent read-only, controlled-write, destructive, Team, Multi-Project,
  Multi-Tenant, Customer, and Production proof requirements;
- Production gates, observation windows, hard stops, exceptions, conflicts,
  portability, inheritance, anti-gaming controls, risks, anti-patterns,
  prohibited behavior, and current-state boundaries.

### Preserved Truth

```text
Connector
≠
Tool Authority

Credential
≠
Permission

Permission
≠
Approval

Tool Definition
≠
Tool Instance

Tool Assignment
≠
Runtime Eligibility

Runtime Eligibility
≠
Production Tool Authority
```

### Limitations

- Founder approval is pending.
- Canonical status remains false.
- Tool Registry is not implemented.
- Connector Registry is not implemented.
- Tool Instance Registry is not implemented.
- credential broker is not implemented.
- Tool Policy Engine is not implemented.
- runtime action authorization is not verified.
- approved Tool Definitions proven by documentation remain zero.
- approved connectors remain zero.
- active Agent Tool Profiles remain zero.
- Production-authorized Tool Assignments remain zero.

### Follow-Up

- complete `doc/19-ai-workforce/capabilities/model-registry.md`;
- use document ID `AIW-REG-MODEL-001`;
- define the authoritative target-state Registry for Model Definitions,
  providers, Model versions, Model Profiles, routing profiles, evaluation
  profiles, Data eligibility, fallback, cost, availability, and Agent Model
  Assignments;
- separate provider availability, Model availability, Model approval, Agent
  Model eligibility, Model routing, and Production Model authority;
- align the Registry with Capability, Skill, Tool, Agent, prompt, memory,
  workflow, Security, privacy, evidence, and performance controls;
- update the INDEX and Roadmap after completion.
```

---

# 152. Capabilities Folder Status

After saving this document:

```text
capabilities/
├── capability-registry.md  CONTENT_COMPLETE_FOR_REVIEW
├── model-registry.md       EMPTY_PLACEHOLDER
├── skill-registry.md       CONTENT_COMPLETE_FOR_REVIEW
└── tool-registry.md        CONTENT_COMPLETE_FOR_REVIEW
```

Folder-level status:

```text
CAPABILITIES_FOLDER_DOCUMENTS=4

CONTENT_COMPLETE_FOR_REVIEW=3

EMPTY_PLACEHOLDERS=1

APPROVED=0

CANONICAL=0

TOOL_REGISTRY_IMPLEMENTED=NO

ACTIVE_AGENT_TOOL_PROFILES=0_PROVEN

PRODUCTION_AUTHORIZED_TOOLS=0_PROVEN
```

---

# 153. Next Document

The next and final document in the official `capabilities/` sequence is:

```text
doc/19-ai-workforce/capabilities/model-registry.md
```

It must use:

```text
AIW-REG-MODEL-001
```

It must define:

- Model Registry purpose;
- Registry authority;
- Model Definition;
- provider Definition;
- Model version;
- Model Profile;
- Agent Model Assignment;
- routing profile;
- fallback profile;
- evaluation profile;
- Model identity;
- Model categories;
- modality;
- context limits;
- Data eligibility;
- Product, Project, Tenant, Customer, environment, and regional scope;
- Model Risk;
- provider Risk;
- evaluation;
- certification;
- runtime Model eligibility;
- Model availability;
- routing;
- fallback;
- cost;
- latency;
- quality;
- safety;
- Security;
- privacy;
- monitoring;
- degradation;
- restriction;
- suspension;
- quarantine;
- replacement;
- deprecation;
- retirement;
- evidence;
- audit;
- Production Model gates;
- current-state limitations;
- Changelog entry;
- next folder and document path.

---