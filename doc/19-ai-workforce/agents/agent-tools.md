---
id: AIW-AGENT-TOOLS-001
title: Mianx.ai AI Agent Tools
version: 1.0.0
status: Draft

type: Enterprise AI Agent Tool Governance Standard
class: Governed

owner: AI Workforce Council
steward: Agent Framework and Tool Governance
authority: Founder and Enterprise Governance

maintainers:
  - AI Workforce Operations
  - Agent Framework Team
  - AI Operating System Team
  - Tool Governance
  - Capability Governance
  - Enterprise Architecture
  - Enterprise Governance
  - Identity and Access Management
  - Security Governance
  - Data and Privacy Governance
  - Enterprise Quality
  - Product Operations
  - Project Operations
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
  - Agent Framework Owner
  - AI Operating System Owner
  - Tool Governance
  - Capability Governance
  - Identity and Access Management
  - Security Governance
  - Data and Privacy Governance
  - Product Operations
  - Project Operations
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
  - Enterprise Architects
  - AI Platform Engineers
  - Agent Engineers
  - Prompt Engineers
  - Workflow Designers
  - Tool Owners
  - Capability Owners
  - Security Teams
  - Identity and Access Management Teams
  - Data and Privacy Teams
  - Finance Teams
  - Quality Teams
  - Operations Teams
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
  - ./agent-types.md
  - ./agent-lifecycle.md
  - ./agent-skills.md

related_documents:
  - ./agent-memory.md
  - ./agent-collaboration.md
  - ./agent-performance.md
  - ../organization/responsibility-matrix.md
  - ../organization/escalation-matrix.md
  - ../leadership/decision-framework.md
  - ../roles/role-catalog.md
  - ../roles/job-descriptions.md
  - ../roles/skill-matrix.md
  - ../capabilities/capability-registry.md
  - ../capabilities/skill-registry.md
  - ../capabilities/tool-registry.md
  - ../capabilities/model-registry.md
  - ../teams/team-structure.md
  - ../teams/team-governance.md
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

review_cycle:
  - Monthly During Documentation and Implementation
  - Quarterly During Controlled Agent Operation
  - Annually After Stable Production Operation
  - After AI Constitution Change
  - After Agent Type or Lifecycle Change
  - After Material Tool Registry Change
  - After Connector or Credential Architecture Change
  - After Permission Model Change
  - After Material Provider Change
  - After Tool Security Incident
  - Before New High-Risk Tool Approval
  - Before Agent Tool Assignment
  - Before Production Tool Activation
  - After Critical AI, Security, Privacy, Financial, Quality, or Operational Incident
  - Before Canonical Promotion

tool_horizon:
  current: Target-State Agent Tool Governance Definition
  near_term: One-Agent Read-Only Tool Proof
  medium_term: Controlled Write, Multi-Agent, and Multi-Project Tool Governance
  long_term: Production-Controlled Multi-Tenant Tool Execution

canonical: false
---

# Mianx.ai AI Agent Tools

> **This document defines the governed Tool model for every Mianx.ai AI Agent,
> including Tool Definitions, connectors, Tool Instances, actions, credentials,
> permissions, Agent Tool Profiles, Product and Project boundaries, Tenant and
> Customer isolation, evaluation, monitoring, cost, failure handling,
> suspension, replacement, retirement, evidence, and Production controls.**

---

# 1. Document Purpose

This document establishes the target-state standard for governing Tools used by
Mianx.ai AI Agents.

It defines:

- what an Agent Tool is;
- what an Agent Tool is not;
- Tool Definitions;
- Tool connectors;
- Tool Instances;
- Tool actions;
- Tool action categories;
- Tool credentials;
- Tool secrets;
- Tool identities;
- Agent Tool Profiles;
- Tool permissions;
- action-level authorization;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- environment scope;
- regional scope;
- Data scope;
- Tool Risk;
- read actions;
- write actions;
- destructive actions;
- privileged actions;
- financial actions;
- communication actions;
- Production actions;
- approval requirements;
- execution limits;
- rate limits;
- concurrency limits;
- cost limits;
- timeouts;
- retries;
- idempotency;
- fallback;
- monitoring;
- evidence;
- evaluation;
- certification;
- suspension;
- quarantine;
- replacement;
- deprecation;
- retirement;
- current-state boundaries.

This document prevents a connector, API integration, plugin, credential, login,
or Tool name from being incorrectly treated as unrestricted Agent authority.

This document does not independently:

- approve a Tool;
- create a Tool Registry entry;
- install a connector;
- issue credentials;
- grant Agent permissions;
- activate Tool access;
- authorize Production actions;
- approve financial transactions;
- approve Customer communication;
- prove runtime Tool enforcement;
- prove Production Tool operation.

---

# 2. Current Authority Status

This document currently has the following state:

```text
DOCUMENT_ID=AIW-AGENT-TOOLS-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TARGET_STATE_AGENT_TOOL_MODEL=DEFINED

TOOL_REGISTRY=NOT_IMPLEMENTED

TOOL_POLICY_ENGINE=NOT_IMPLEMENTED

CREDENTIAL_BROKER=NOT_IMPLEMENTED

RUNTIME_TOOL_ENFORCEMENT=NOT_VERIFIED

APPROVED_RUNTIME_TOOL_PROFILES=0_PROVEN

PRODUCTION_TOOL_EXECUTION=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

Therefore:

- all Tool controls in this document are target-state requirements;
- no Tool is approved through this document;
- no connector is authorized through this document;
- no credential is issued through this document;
- no Agent receives Tool access through this document;
- no Production action is authorized;
- no current Tool availability or health is proven;
- no runtime action-level enforcement is proven;
- Founder and required Governance approval remain pending.

---

# 3. Strategic Alignment

The Agent Tool model operates inside the exact Mianx.ai hierarchy:

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
- Human legal authority;
- Human financial authority;
- Product ownership;
- Project ownership;
- Customer contractual authority;
- Agent identity;
- Agent Skill;
- Agent Capability;
- Tool permission;
- Security review;
- evidence;
- approval.

---

# 4. Tool Governance Objective

The Tool Governance model must make it possible to answer:

- Which Tool is being used?
- Which Tool Definition identifies it?
- Which connector is involved?
- Which Tool Instance is targeted?
- Which Agent is using it?
- Which action is requested?
- Is the action read, write, destructive, privileged, financial,
  communication-related, or Production-impacting?
- Which permission allows the action?
- Which Product and Project apply?
- Which Tenant and Customer apply?
- Which environment applies?
- Which Data is involved?
- Which credential is used?
- Which approval is required?
- Which rate and cost limits apply?
- Which evidence proves execution?
- How is the Tool suspended?
- What happens when the Tool fails?
- How is access removed?

---

# 5. Core Tool Principles

## 5.1 Tool Access Is Not Authority

The existence of a connector or credential does not authorize an Agent to use
every available action.

---

## 5.2 Every Tool Must Have an Owner

Every Tool Definition and Tool Instance must have:

- business owner;
- technical owner;
- Security owner;
- operational owner;
- cost owner;
- Data owner where applicable.

---

## 5.3 Every Action Must Be Explicit

Permissions must identify the exact action or bounded action pattern.

Broad permissions such as:

```text
FULL_ACCESS
```

should be prohibited unless exceptional Human-operated administration requires
them.

---

## 5.4 Least Privilege Is Mandatory

An Agent must receive only the minimum Tool actions required for approved work.

---

## 5.5 Tool Scope Must Be Enforced

Tool authorization must consider:

- Organization;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- Data classification;
- resource;
- action;
- time;
- Risk;
- budget.

---

## 5.6 Credentials Must Not Be Embedded

Credentials must not be stored in:

- prompts;
- Markdown documents;
- source code;
- Agent memory;
- Task descriptions;
- logs;
- evidence envelopes;
- chat messages.

---

## 5.7 High-Risk Actions Require Stronger Controls

Destructive, privileged, financial, communication, and Production actions
require enhanced approval and evidence.

---

## 5.8 Every Tool Action Must Be Attributable

Every material Tool action must identify:

- Agent Instance;
- Tool;
- action;
- target;
- scope;
- authority;
- time;
- result;
- cost;
- evidence.

---

## 5.9 Failures Must Remain Visible

Failed Tool calls, retries, timeouts, partial results, and rollbacks must not be
hidden.

---

## 5.10 Tools Must Be Suspendable

Tool access must support:

- action restriction;
- credential revocation;
- connector disablement;
- Agent Profile suspension;
- Project suspension;
- Tenant suspension;
- Production suspension;
- emergency kill switch.

---

# 6. Governing Non-Equivalence Rule

The following must remain separate:

```text
Tool Definition
≠
Tool Connector
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
Skill
≠
Capability
≠
Execution Authority
```

---

# 7. Tool Definition

A Tool Definition describes a governed external or internal system that Agents
may use.

It should define:

- Tool identity;
- purpose;
- owner;
- provider;
- action catalogue;
- Risk;
- Data classes;
- environments;
- authentication methods;
- rate limits;
- cost model;
- monitoring;
- suspension;
- lifecycle.

A Tool Definition does not prove that a connector or runtime instance exists.

---

# 8. Tool Connector

A Tool connector is the technical adapter through which an Agent or workflow
interacts with a Tool.

Examples may include:

- REST API adapter;
- SDK adapter;
- database connector;
- repository connector;
- browser automation adapter;
- command-line adapter;
- messaging adapter;
- file-system adapter;
- Model tool-call adapter.

A connector must not:

- create broader authority than the underlying Tool permission;
- bypass Product or Project scope;
- expose credentials;
- suppress Tool errors;
- change action semantics without versioning.

---

# 9. Tool Instance

A Tool Instance is a specific governed deployment, account, workspace,
repository, database, environment, Tenant, or service endpoint.

Examples:

```text
Specific GitHub Repository

Specific Production Database

Specific Customer Workspace

Specific Cloud Account

Specific Email Account

Specific Project Management Workspace
```

Tool Instance access must be narrower than Tool Definition eligibility.

---

# 10. Tool Action

A Tool action is one explicit operation performed against a Tool Instance.

Examples:

- read file;
- create issue;
- update record;
- send message;
- merge pull request;
- deploy release;
- revoke credential;
- transfer funds;
- delete resource.

Each action must have:

- action ID;
- category;
- target;
- Risk;
- permission;
- evidence;
- timeout;
- retry rule;
- approval rule.

---

# 11. Credential

A credential is a protected authentication mechanism used to access a Tool.

Examples may include:

- API token;
- OAuth token;
- service account;
- workload identity;
- short-lived certificate;
- signed request;
- delegated user authorization.

A credential is not a permission.

The Tool and authorization system must still validate the requested action.

---

# 12. Permission

A permission authorizes a subject to perform a bounded action on a bounded
resource under defined conditions.

A permission should identify:

```text
Subject

Action

Resource

Product

Project

Tenant

Customer

Environment

Data Classification

Conditions

Validity Period
```

---

# 13. Agent Tool Profile

An Agent Tool Profile defines the approved Tools and actions available to one
Agent Definition or Agent Instance.

A Tool Profile must be:

- explicit;
- versioned;
- reviewable;
- testable;
- scope-aware;
- revocable;
- compatible with the Agent’s Role, Skills, Capability, Risk, and lifecycle.

---

# 14. Tool Entity Model

```text
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
Agent Allocation
    ↓
Task Authorization
    ↓
Tool Execution
    ↓
Evidence
```

---

# 15. Tool ID Standard

Proposed Tool ID format:

```text
AIW-TOOL-{DOMAIN}-{NUMBER}
```

Examples:

```text
AIW-TOOL-REPO-001
AIW-TOOL-DATA-001
AIW-TOOL-COMM-001
AIW-TOOL-CLOUD-001
```

Tool Instance IDs should remain separate.

Example:

```text
AIW-TOOL-INSTANCE-REPO-MIANX-MAIN
```

---

# 16. Tool Definition Record

```yaml
tool_definition:
  tool_id: required
  tool_version: required
  tool_name: required
  category: required

  purpose: required
  provider: required
  service_type: required

  action_catalogue_reference: required
  authentication_methods: required
  supported_environments: required
  supported_regions: conditional
  supported_data_classes: required

  default_risk_class: required
  maximum_risk_class: required

  rate_limit_model: required
  concurrency_model: required
  cost_model: required
  timeout_model: required
  retry_model: required
  idempotency_support: required

  monitoring_profile: required
  evidence_profile: required
  suspension_profile: required
  recovery_profile: required

  business_owner: required
  technical_owner: required
  security_owner: required
  operational_owner: required
  cost_owner: required
  data_owner: conditional

  lifecycle_state: required
  approval_state: required
  created_at: required
  updated_at: required
  review_at: required
```

---

# 17. Connector Definition Record

```yaml
connector_definition:
  connector_id: required
  connector_version: required
  tool_id: required
  connector_type: required

  supported_actions: required
  authentication_method: required
  credential_broker_required: required

  request_schema_version: required
  response_schema_version: required
  error_schema_version: required

  timeout_limit: required
  retry_policy: required
  idempotency_behavior: required

  logging_profile: required
  monitoring_profile: required
  security_review_reference: required

  lifecycle_state: required
  approval_state: required
  owner: required
  review_at: required
```

---

# 18. Tool Instance Record

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
  service_endpoint_reference: conditional

  organization_scope: required
  product_scope: required
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment: required
  region: conditional
  data_classification: required

  credential_profile_id: required
  permission_policy_id: required
  rate_limit_profile_id: required
  cost_profile_id: required
  monitoring_profile_id: required

  owner: required
  operational_owner: required
  security_owner: required
  cost_owner: required

  instance_state: required
  health_state: required
  created_at: required
  review_at: required
  expires_at: conditional
```

---

# 19. Tool Action Record

```yaml
tool_action:
  action_id: required
  tool_id: required
  action_name: required
  action_version: required

  category: required
  description: required
  target_resource_type: required

  input_schema_reference: required
  output_schema_reference: required

  minimum_risk_class: required
  maximum_impact: required
  reversible: required
  idempotent: required

  approval_required: required
  human_review_required: required
  evidence_required: required
  rollback_required: required

  prohibited_data_classes: conditional
  prohibited_environments: conditional
  required_skills: required
  required_certification: conditional

  lifecycle_state: required
  approval_state: required
```

---

# 20. Agent Tool Profile Record

```yaml
agent_tool_profile:
  tool_profile_id: required
  tool_profile_version: required

  agent_definition_id: required
  agent_definition_version: required
  agent_instance_id: conditional

  role_id: required
  capability_ids: required
  skill_requirements: required

  allowed_tools:
    - tool_id: required
      tool_instance_ids: required
      allowed_actions: required
      prohibited_actions: required

  organization_scope: required
  product_scope: required
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

  approval_profile_id: required
  monitoring_profile_id: required
  evidence_profile_id: required
  suspension_profile_id: required

  accountable_human_owner: required
  approved_by: required
  effective_at: required
  review_at: required
  expires_at: conditional
  profile_state: required
```

---

# 21. Tool Categories

| Code | Tool Category | Typical Purpose |
|---|---|---|
| `TC-READ` | Retrieval Tool | Read approved information |
| `TC-FILE` | File Tool | Read, create, update, move, or delete files |
| `TC-REPO` | Repository Tool | Read or modify source repositories |
| `TC-DATA` | Data Tool | Query or modify databases and datasets |
| `TC-CLOUD` | Infrastructure Tool | Manage cloud and platform resources |
| `TC-CI` | Build and Deployment Tool | Build, test, release, and deploy |
| `TC-COMM` | Communication Tool | Send or manage messages and communications |
| `TC-COLLAB` | Collaboration Tool | Manage Tasks, Projects, documents, and workflows |
| `TC-FIN` | Financial Tool | Access financial systems or transactions |
| `TC-SEC` | Security Tool | Scan, investigate, contain, or change Security controls |
| `TC-MON` | Monitoring Tool | Read logs, metrics, traces, alerts, and health |
| `TC-BROWSER` | Browser Tool | Access approved web resources or browser workflows |
| `TC-ADMIN` | Administrative Tool | Manage identities, permissions, accounts, or configuration |
| `TC-MODEL` | Model-Integrated Tool | Execute approved Model-supported functions |
| `TC-CUSTOM` | Internal Custom Tool | Perform a Mianx.ai-specific governed action |

---

# 22. Tool Action Categories

Every Tool action must use one primary action category.

| Code | Action Category | Meaning |
|---|---|---|
| `ACT-READ` | Read | Retrieve without intended state change |
| `ACT-DRAFT` | Draft | Create a non-final internal artifact |
| `ACT-CREATE` | Create | Create a new resource |
| `ACT-UPDATE` | Update | Modify an existing resource |
| `ACT-EXECUTE` | Execute | Trigger a process or workflow |
| `ACT-COMMUNICATE` | Communicate | Send or publish content |
| `ACT-APPROVE` | Approve | Record an authorized decision |
| `ACT-DEPLOY` | Deploy | Promote artifacts or configuration |
| `ACT-PRIVILEGED` | Privileged | Change access, identity, Security, or system controls |
| `ACT-FINANCIAL` | Financial | Affect money, budgets, payment, or financial records |
| `ACT-DESTRUCTIVE` | Destructive | Delete, terminate, revoke, overwrite, or irreversibly alter |
| `ACT-RECOVER` | Recover | Roll back, restore, compensate, or contain |

---

# 23. Read Actions

Read actions may include:

- retrieving documentation;
- querying approved records;
- reading repository content;
- viewing monitoring Data;
- viewing approved Customer cases;
- retrieving policy or Knowledge.

Read access still requires:

- identity;
- permission;
- purpose;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- Data classification;
- evidence.

Read access is not automatically low Risk.

Reading restricted Customer or regulated Data may be R3 or R4.

---

# 24. Draft Actions

Draft actions create non-final internal outputs.

Examples:

- email draft;
- proposal draft;
- document draft;
- code patch draft;
- release-note draft;
- incident-update draft.

A draft action must not be represented as:

- sent;
- approved;
- merged;
- deployed;
- published;
- contractually committed.

---

# 25. Create Actions

Create actions may include:

- creating a file;
- creating a Task;
- opening an issue;
- creating a branch;
- creating a draft record;
- creating a test environment.

Creation must remain within approved:

- location;
- naming;
- ownership;
- Product;
- Project;
- Tenant;
- environment;
- retention;
- budget.

---

# 26. Update Actions

Update actions modify existing resources.

They require:

- exact target;
- previous state;
- intended change;
- permission;
- conflict check;
- version or concurrency handling;
- evidence;
- rollback where applicable.

---

# 27. Communication Actions

Communication actions include:

- sending email;
- sending direct messages;
- posting to collaboration channels;
- publishing content;
- contacting Customers;
- contacting prospects;
- issuing incident updates;
- sending proposals.

Agent-generated content does not grant authority to send it.

---

# 28. Communication Tool Controls

Communication actions should require:

- approved sender identity;
- authorized Human owner;
- approved recipient;
- approved channel;
- approved purpose;
- approved content or bounded template;
- Product and Project scope;
- Customer or Tenant scope;
- Data classification;
- legal and privacy review where required;
- evidence;
- delivery result.

---

# 29. Repository Actions

Repository actions may include:

- read repository;
- create branch;
- modify file;
- create commit;
- push branch;
- open pull request;
- review change;
- merge;
- delete branch;
- create release.

Repository access must define:

- exact repository;
- branch scope;
- file scope where practical;
- allowed operations;
- protected branches;
- review requirements;
- CI requirements;
- deletion controls;
- force-push prohibition or exceptional approval.

---

# 30. Database Actions

Database actions may include:

- read query;
- Data export;
- record creation;
- record update;
- schema migration;
- deletion;
- backup;
- restore.

Database actions must define:

- database instance;
- schema;
- tables or collections;
- Product;
- Project;
- Tenant;
- environment;
- Data class;
- transaction behavior;
- query limits;
- migration controls;
- backup;
- rollback;
- audit.

---

# 31. Infrastructure Actions

Infrastructure actions may include:

- create resource;
- modify resource;
- scale resource;
- deploy configuration;
- restart service;
- revoke access;
- terminate resource;
- restore service.

Production infrastructure actions require enhanced approval and recovery
controls.

---

# 32. Financial Actions

Financial Tool actions may include:

- read budget;
- read transaction;
- prepare payment;
- create purchase request;
- approve expenditure;
- transfer funds;
- modify financial records.

AI Agents must not independently:

- transfer funds;
- approve their own spending;
- sign financial commitments;
- alter audited records;
- create unrestricted payment authority.

---

# 33. Privileged Actions

Privileged actions may include:

- create identity;
- grant permission;
- revoke permission;
- rotate credential;
- modify Security policy;
- change Production configuration;
- disable monitoring;
- access protected evidence;
- modify Agent lifecycle state.

Privileged actions require:

- strong identity;
- separation of duties;
- exact target;
- limited duration;
- enhanced monitoring;
- qualified approval;
- evidence;
- emergency suspension.

---

# 34. Destructive Actions

Destructive actions include:

- delete file;
- delete repository;
- drop database;
- delete record;
- terminate infrastructure;
- revoke credential;
- overwrite protected artifact;
- remove access;
- permanently publish or submit irreversible content.

Destructive actions require stricter controls than normal write actions.

---

# 35. Destructive Action Gate

Before a destructive action:

- [ ] exact target is identified;
- [ ] Product and Project scope are verified;
- [ ] Tenant and Customer scope are verified;
- [ ] environment is verified;
- [ ] impact is assessed;
- [ ] alternatives are reviewed;
- [ ] dry run is completed where available;
- [ ] backup exists where applicable;
- [ ] rollback or compensation exists;
- [ ] Human approval is recorded;
- [ ] separation of duties is enforced;
- [ ] Tool permission is current;
- [ ] monitoring is active;
- [ ] evidence capture is active;
- [ ] emergency stop is available.

---

# 36. Production Actions

Production Tool actions include any action that may affect:

- live Customers;
- live Data;
- live services;
- live infrastructure;
- live communication;
- live access;
- live financial records;
- contractual obligations.

Production access must be separately granted.

---

# 37. Tool Risk Classification

| Risk | Tool Interpretation |
|---|---|
| `R0` | Public or negligible-impact read-only action |
| `R1` | Reversible internal read, draft, or low-impact creation |
| `R2` | Controlled internal write or workflow action |
| `R3` | Production, Customer, Security, privacy, financial, or material operational action |
| `R4` | Irreversible, destructive, constitutional, legal, regulated, or enterprise-critical action |

Risk must be determined by the action and target, not only by the Tool name.

---

# 38. Tool Permission Model

A Tool permission should evaluate:

```text
Subject
+
Agent Lifecycle State
+
Role
+
Skill
+
Capability
+
Action
+
Resource
+
Product
+
Project
+
Tenant
+
Customer
+
Environment
+
Data Classification
+
Risk
+
Time
+
Budget
+
Approval
=
Permit or Deny
```

Default result must be:

```text
DENY
```

unless all mandatory conditions pass.

---

# 39. Action-Level Permission Record

```yaml
tool_permission:
  permission_id: required
  permission_version: required

  subject_type: AGENT_DEFINITION | AGENT_INSTANCE
  subject_id: required

  tool_id: required
  tool_instance_id: required
  action_ids: required
  resource_scope: required

  organization_scope: required
  product_scope: required
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

  approval_required: required
  human_review_required: required
  conditions: required

  effective_at: required
  review_at: required
  expires_at: conditional
  revoked_at: conditional

  approved_by: required
  authority_reference: required
  status: required
```

---

# 40. Permission Intersection Rule

Effective Tool permission must be the narrowest intersection of:

```text
Tool Definition Eligibility

Connector Support

Tool Instance Scope

Agent Tool Profile

Agent Lifecycle State

Agent Allocation

Authority Profile

Permission Profile

Product Policy

Project Policy

Tenant Policy

Environment Policy

Task Authorization

Approval Conditions
```

No lower-level configuration may expand a higher-level prohibition.

---

# 41. Credential Architecture

Credentials should be provided through a protected credential mechanism.

Target pattern:

```text
Agent Workload Identity
        ↓
Authorization Check
        ↓
Credential Broker
        ↓
Short-Lived Scoped Credential
        ↓
Approved Tool Action
        ↓
Credential Expiry or Revocation
```

Long-lived shared credentials should be avoided.

---

# 42. Credential Rules

Credentials must be:

- unique or attributable;
- scope-limited;
- time-limited where possible;
- environment-specific;
- Product-aware;
- Project-aware;
- Tenant-aware where applicable;
- rotated;
- monitored;
- revocable;
- excluded from prompts and logs.

---

# 43. Shared Credential Restrictions

Shared credentials create attribution and isolation Risk.

They should be prohibited for:

- Production writes;
- financial actions;
- privileged administration;
- Customer communications;
- destructive actions;
- regulated Data access.

Where temporarily unavoidable, shared credentials require:

- explicit exception;
- compensating identity evidence;
- limited scope;
- short expiry;
- monitoring;
- replacement plan.

---

# 44. Secret Management

Secrets should be stored in approved secret-management systems.

A secret record should identify:

- secret reference;
- owner;
- Tool Instance;
- environment;
- Product;
- Project;
- Tenant;
- permitted subjects;
- rotation policy;
- expiry;
- access evidence;
- revocation process.

The secret value itself must not appear in Governance documentation.

---

# 45. Product Tool Scope

A Product Tool Profile may define:

- approved Tools;
- approved Tool Instances;
- approved actions;
- prohibited actions;
- approved Data classes;
- environments;
- cost limits;
- Product owner;
- review cadence.

A Tool approved for MianX Core Platform is not automatically approved for an
Industry Operating System.

---

# 46. Project Tool Scope

Project Tool access must define:

- Project ID;
- Tool Instance;
- action;
- repository or workspace;
- Data scope;
- environment;
- cost;
- start;
- expiry;
- closure procedure.

Project closure must trigger Tool-access review and removal.

---

# 47. Tenant Tool Scope

Tenant-scoped Tool access must:

- validate Tenant identity;
- use Tenant-scoped resources;
- prevent cross-Tenant actions;
- prevent cross-Tenant Data access;
- use Tenant-attributed evidence;
- attribute cost to Tenant;
- remove access at Tenant closure;
- pass negative isolation tests.

---

# 48. Customer Tool Scope

Customer-specific Tool use must define:

- Customer identity;
- contractually permitted purpose;
- authorized system;
- communication authority;
- Data restrictions;
- environment;
- support ownership;
- audit;
- expiry.

Customer Tool access must not become general enterprise access.

---

# 49. Environment Tool Scope

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

Production read and Production write require separate permissions.

---

# 50. Regional Tool Scope

Regional Tool controls may depend on:

- Data residency;
- provider region;
- Customer location;
- regulation;
- network boundaries;
- credential location;
- logging location;
- evidence-retention location.

---

# 51. Data Classification and Tool Use

A Tool Profile must identify permitted Data classifications.

Example classes may include:

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

A Tool permitted for Internal Data must not automatically process regulated
Data.

---

# 52. Tool Skill Requirements

Each Tool action should identify required Skills and proficiency.

Example:

```yaml
tool_action_skill_requirement:
  action_id: REPOSITORY-MERGE
  required_skills:
    - skill_id: AIW-SKILL-REPO-001
      minimum_proficiency: SP-4

    - skill_id: AIW-SKILL-QA-001
      minimum_proficiency: SP-3
```

Tool access must not be granted solely because the Agent’s Role sounds
relevant.

---

# 53. Tool Certification

Certification may be required for:

- Production writes;
- privileged access;
- destructive actions;
- Security containment;
- database migration;
- financial actions;
- Customer communication;
- regulated Data processing;
- critical infrastructure changes.

Certification must identify:

- Agent;
- Tool;
- action;
- Tool Instance;
- environment;
- scope;
- issue date;
- expiry;
- restrictions;
- evidence.

---

# 54. Tool Evaluation

Tool evaluation must test the exact:

- Agent Definition;
- Agent Instance where applicable;
- Tool Profile;
- connector version;
- Tool Instance;
- action;
- environment;
- credential method;
- Data class;
- Risk class.

---

# 55. Tool Evaluation Scenarios

Evaluation should include:

- permitted read;
- denied read;
- permitted write;
- denied write;
- unauthorized Project attempt;
- unauthorized Tenant attempt;
- expired credential;
- expired permission;
- rate-limit response;
- timeout;
- retry;
- duplicate request;
- partial failure;
- Tool unavailability;
- cost-limit breach;
- approval-required action;
- suspension;
- evidence generation.

---

# 56. Destructive Tool Evaluation

Destructive Tool evaluation must test:

- target confirmation;
- dry-run behavior;
- backup validation;
- approval enforcement;
- separation of duties;
- execution limit;
- rollback or compensation;
- evidence preservation;
- emergency stop;
- denied self-approval.

---

# 57. Tool Evaluation Result States

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

# 58. Tool Profile Validity

An Agent Tool Profile is valid only when:

- Agent Definition is approved;
- Agent Instance is eligible;
- lifecycle state permits Tool use;
- allocation is valid;
- Tool Definition is approved;
- connector is approved;
- Tool Instance is healthy;
- credentials are valid;
- permissions are valid;
- required Skills are valid;
- required certification is valid;
- Product and Project scope match;
- Tenant and Customer scope match;
- environment matches;
- Data class is permitted;
- budget is available;
- monitoring is active;
- no suspension applies.

---

# 59. Tool Profile Assignment Lifecycle

```text
Tool Need Identified
    ↓
Tool Profile Proposed
    ↓
Security and Capability Review
    ↓
Tool Profile Approved
    ↓
Credential Provisioned
    ↓
Evaluation
    ↓
Assigned
    ↓
Active
    ↓
Monitored
    ↓
Restricted, Suspended, Renewed, or Revoked
    ↓
Retired
    ↓
Archived
```

---

# 60. Tool Profile States

| State | Meaning |
|---|---|
| `PROPOSED` | Tool access is requested |
| `IN-REVIEW` | Security, capability, cost, and scope review is underway |
| `APPROVED` | Exact Tool Profile is approved |
| `PROVISIONING` | Credential and permission configuration is underway |
| `EVALUATION-PENDING` | Required evaluation remains |
| `ACTIVE` | Tool access may be used within approved scope |
| `RESTRICTED` | Some Tools, actions, or scopes are reduced |
| `SUSPENDED` | New Tool actions are blocked |
| `EXPIRED` | Validity period ended |
| `REVOKED` | Tool authority was withdrawn |
| `RETIRED` | Tool Profile is no longer required |
| `ARCHIVED` | Historical record remains |

---

# 61. Rate Limits

Rate limits should exist at relevant levels:

- enterprise;
- Product;
- Project;
- Tenant;
- Customer;
- Agent;
- Tool;
- Tool Instance;
- action;
- workflow;
- Task.

Rate-limit behavior must be:

- observable;
- bounded;
- non-destructive;
- compatible with retries;
- attributable.

---

# 62. Concurrency Limits

Concurrency limits prevent uncontrolled parallel actions.

They should consider:

- Agent capacity;
- Tool provider limits;
- account limits;
- Project limits;
- Tenant fairness;
- Data contention;
- transaction conflicts;
- cost;
- Human-review capacity;
- downstream capacity.

---

# 63. Cost Limits

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

Budget availability does not authorize restricted actions.

---

# 64. Timeout Controls

Every Tool action should define:

- connection timeout;
- execution timeout;
- total Task timeout;
- cancellation behavior;
- partial-result handling;
- evidence after timeout;
- recovery.

A timeout must not be reported as success.

---

# 65. Retry Controls

Retry policy must define:

- retryable errors;
- non-retryable errors;
- maximum retries;
- backoff;
- jitter;
- total time limit;
- cost limit;
- duplicate prevention;
- escalation.

---

# 66. Idempotency

Idempotency prevents duplicate effects when actions are retried.

For material create, write, financial, communication, and destructive actions,
the system should use:

- idempotency keys;
- unique operation IDs;
- duplicate checks;
- result reconciliation;
- replay protection.

---

# 67. Partial Failure

A Tool action may partially succeed.

Partial failure must identify:

- completed effects;
- failed effects;
- affected targets;
- rollback status;
- residual inconsistency;
- owner;
- remediation;
- evidence.

Partial success must not be reported as full success.

---

# 68. Fallback

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

Fallback must not bypass Tool Governance.

---

# 69. Tool Failure States

```text
HEALTHY

DEGRADED

RATE-LIMITED

AUTHENTICATION-FAILED

AUTHORIZATION-DENIED

UNAVAILABLE

TIMED-OUT

PARTIAL-FAILURE

COMPROMISED

SUSPENDED

RETIRED
```

Unknown Tool health must not be reported as healthy.

---

# 70. Tool Failure Handling

```text
Tool Failure Detected
    ↓
Failure Classified
    ↓
Affected Actions and Scopes Identified
    ↓
New Actions Restricted if Required
    ↓
Evidence Preserved
    ↓
Retry, Fallback, Rollback, or Manual Path Selected
    ↓
Owner Notified
    ↓
Incident Created Where Required
    ↓
Recovery Verified
    ↓
Tool Re-Evaluated
```

---

# 71. Tool Monitoring

Tool monitoring should include:

- Tool health;
- connector health;
- authentication failures;
- authorization denials;
- action volume;
- rate-limit events;
- latency;
- timeouts;
- retries;
- failures;
- partial failures;
- destructive actions;
- privileged actions;
- communication actions;
- financial actions;
- cost;
- scope violations;
- credential use;
- suspension events.

---

# 72. Tool Evidence

Every material Tool action should record:

```yaml
tool_execution:
  tool_execution_id: required
  task_id: required
  envelope_id: required

  agent_definition_id: required
  agent_instance_id: required

  tool_id: required
  tool_version: required
  connector_id: required
  connector_version: required
  tool_instance_id: required

  action_id: required
  action_category: required
  target_reference: required

  organization_id: required
  product_id: required
  project_id: conditional
  tenant_id: conditional
  customer_id: conditional
  environment: required
  data_classification: required

  permission_id: required
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
  evidence_reference: required
```

---

# 73. Tool Evidence Quality

Potential Tool evidence levels:

```text
TE-0 — No Evidence

TE-1 — Agent Claim

TE-2 — Human-Reviewed Record

TE-3 — Connector or Provider Execution Record

TE-4 — Controlled Test Evidence

TE-5 — Runtime Operational Evidence

TE-6 — Independent or Audited Evidence
```

Material Production claims require runtime evidence.

---

# 74. Tool Approval Gate

Before a Tool Definition is approved:

- [ ] business purpose exists;
- [ ] owner exists;
- [ ] provider is identified;
- [ ] action catalogue is defined;
- [ ] Risk is classified;
- [ ] supported Data classes are defined;
- [ ] supported environments are defined;
- [ ] authentication is defined;
- [ ] permission model is defined;
- [ ] rate limits are defined;
- [ ] cost model is defined;
- [ ] timeout and retry behavior are defined;
- [ ] idempotency behavior is defined;
- [ ] monitoring is defined;
- [ ] evidence is defined;
- [ ] suspension is defined;
- [ ] recovery is defined;
- [ ] Security review passes;
- [ ] privacy review passes where applicable;
- [ ] legal and compliance review passes where applicable;
- [ ] approval is recorded.

---

# 75. Agent Tool Assignment Gate

Before an Agent receives a Tool Profile:

- [ ] Agent Definition is approved.
- [ ] Agent Instance is eligible where applicable.
- [ ] Role permits the Tool purpose.
- [ ] Capability requires the Tool.
- [ ] required Skills are valid.
- [ ] required certification is valid.
- [ ] Product scope is approved.
- [ ] Project scope is approved.
- [ ] Tenant scope is approved.
- [ ] Customer scope is approved.
- [ ] environment is approved.
- [ ] Data scope is approved.
- [ ] Tool Definition is approved.
- [ ] connector is approved.
- [ ] Tool Instance is approved.
- [ ] actions are explicit.
- [ ] prohibited actions are explicit.
- [ ] credentials are protected.
- [ ] permission is approved.
- [ ] rate and cost limits are active.
- [ ] monitoring is active.
- [ ] evidence capture is active.
- [ ] suspension is tested.
- [ ] expiry is defined.

---

# 76. Production Tool Gate

Before an Agent may use a Tool in Production:

- [ ] Production business purpose is approved.
- [ ] Agent is Production-controlled.
- [ ] Production allocation is valid.
- [ ] Production Tool Profile is approved.
- [ ] exact Tool Instance is approved.
- [ ] exact actions are approved.
- [ ] Product scope is exact.
- [ ] Project scope is exact.
- [ ] Tenant scope is exact.
- [ ] Customer scope is exact.
- [ ] environment is Production-specific.
- [ ] Data processing is approved.
- [ ] credentials are Production-specific.
- [ ] least privilege is verified.
- [ ] required Skills are current.
- [ ] required certification is current.
- [ ] rate and cost limits are active.
- [ ] monitoring is active.
- [ ] audit is active.
- [ ] evidence capture is active.
- [ ] retries and idempotency are tested.
- [ ] suspension is tested.
- [ ] rollback or compensation is tested.
- [ ] incident response is ready.
- [ ] qualified Human approval exists.
- [ ] Founder approval exists where required.

---

# 77. Tool Suspension

Tool access should be suspended when:

- credential compromise is suspected;
- connector compromise is suspected;
- Tool provider is compromised;
- action semantics change unexpectedly;
- Product or Project scope becomes invalid;
- Tenant isolation fails;
- Data policy fails;
- permission expires;
- certification expires;
- cost hard stop is reached;
- monitoring is unavailable for critical actions;
- evidence is fabricated;
- repeated unauthorized action occurs;
- valid Governance instruction exists.

---

# 78. Tool Suspension Procedure

Tool suspension must:

1. identify affected Tool and actions;
2. identify affected Agent Profiles;
3. block new Tool executions;
4. revoke or disable credentials where required;
5. stop scheduled Tool actions;
6. isolate affected connector;
7. preserve logs and evidence;
8. identify affected Products and Projects;
9. identify affected Tenants and Customers;
10. notify owners;
11. create incident or review record;
12. select fallback or manual path;
13. define remediation;
14. define reactivation conditions;
15. verify suspension effectiveness.

---

# 79. Tool Quarantine

A Tool, connector, credential, or Tool Instance may be quarantined when:

- malicious behavior is suspected;
- supply-chain compromise is suspected;
- evidence integrity is uncertain;
- cross-Tenant leakage may have occurred;
- unauthorized actions may have occurred;
- connector output cannot be trusted.

Quarantine should block reuse until investigation is complete.

---

# 80. Tool Reactivation

Reactivation requires:

- cause resolved;
- root cause documented;
- credential state verified;
- connector reviewed;
- Tool Definition still approved;
- Tool Instance still approved;
- permissions revalidated;
- Product and Project scope revalidated;
- Tenant and Customer scope revalidated;
- Data policy revalidated;
- evaluation repeated where required;
- monitoring restored;
- evidence validated;
- explicit approval.

---

# 81. Tool Replacement

Tool replacement may be required because of:

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

# 82. Tool Replacement Process

```text
Replacement Need
    ↓
Alternative Tool Evaluation
    ↓
Security, Data, Cost, and Capability Review
    ↓
New Connector Approval
    ↓
New Tool Profile Design
    ↓
Controlled Evaluation
    ↓
Restricted Parallel Operation
    ↓
Migration
    ↓
Old Tool Restriction
    ↓
Old Tool Retirement
```

Replacement must preserve:

- action mappings;
- permissions;
- Product and Project scope;
- Tenant isolation;
- evidence;
- cost attribution;
- rollback;
- historical audit.

---

# 83. Tool Deprecation

A Tool may be deprecated when:

- no new Agent assignments should be created;
- provider support is ending;
- a safer replacement exists;
- the Tool no longer meets requirements;
- the connector is obsolete;
- Data handling is no longer acceptable.

Deprecation must identify:

- replacement;
- affected Agent Profiles;
- affected workflows;
- migration deadline;
- exceptions;
- retirement date.

---

# 84. Tool Retirement

Tool retirement must include:

- blocking new assignments;
- ending active sessions;
- cancelling scheduled actions;
- revoking credentials;
- removing permissions;
- removing connector access;
- updating Agent Tool Profiles;
- migrating open workflows;
- preserving evidence;
- preserving audit;
- confirming no executable access remains;
- updating Tool Registry state.

---

# 85. Tool Registry

A future Tool Registry should be authoritative for:

- Tool identity;
- Tool version;
- Tool owner;
- provider;
- action catalogue;
- Risk;
- Data eligibility;
- environment eligibility;
- connector versions;
- lifecycle state;
- approval state;
- monitoring;
- suspension;
- deprecation;
- retirement.

---

# 86. Tool Registry Boundary

The Tool Registry should not replace:

- Agent Registry;
- Role Registry;
- Skill Registry;
- Capability Registry;
- Model Registry;
- credential system;
- permission system;
- workflow engine;
- evidence store;
- cost ledger.

Each system must remain authoritative for its own records.

---

# 87. Tool Reporting

Tool reporting should distinguish:

```text
Defined Tools

Approved Tools

Approved Connectors

Approved Tool Instances

Active Tool Instances

Approved Agent Tool Profiles

Active Agent Tool Profiles

Suspended Tool Profiles

Expired Tool Permissions

Production Tool Profiles

Destructive Action Permissions

Privileged Action Permissions

Tool Executions

Failed Tool Executions
```

One undefined `Tools Available` number is insufficient.

---

# 88. Tool Metrics

Potential metrics include:

| Metric | Definition |
|---|---|
| Tool Profile Compliance | Active Tool Profiles satisfying all requirements / active Tool Profiles |
| Permission Validity | Valid Tool permissions / active Tool permissions |
| Credential Currency | Current credentials / active credentials |
| Tool Availability | Healthy approved Tool time / expected Tool time |
| Tool Success Rate | Successful Tool executions / completed Tool executions |
| Tool Failure Rate | Failed Tool executions / attempted Tool executions |
| Retry Rate | Tool executions requiring retries / Tool executions |
| Authorization Denial Rate | Denied unauthorized requests / unauthorized requests |
| Evidence Completeness | Material Tool executions with complete evidence / material Tool executions |
| Cost Attribution | Attributed Tool cost / material Tool cost |
| Suspension Effectiveness | Successfully blocked Tool actions / suspension tests or events |
| Cross-Project Violation Rate | Unauthorized cross-Project Tool actions |
| Cross-Tenant Violation Rate | Unauthorized cross-Tenant Tool actions |
| Destructive Action Compliance | Validly approved destructive actions / destructive actions |

Numerical targets require separate approval.

---

# 89. One-Agent Read-Only Tool Proof

The first Tool proof should include:

```text
1 Approved Agent Definition

1 Runtime Agent Instance

1 Low-Risk Read-Only Tool

1 Approved Connector

1 Non-Production Tool Instance

1 Explicit Read Action

1 Short-Lived Credential

1 Product

1 Project

1 Human Owner

1 Permission Record

1 Evaluation

1 Monitoring Record

1 Verifiable-Work Envelope

1 Suspension Test
```

---

# 90. Controlled Write Tool Proof

A controlled write proof should add:

- one reversible write action;
- exact target;
- previous-state evidence;
- approval;
- idempotency;
- retry handling;
- rollback;
- post-action verification;
- cost attribution;
- Human review.

---

# 91. Destructive Tool Proof

A destructive Tool proof should occur only in a safe isolated environment.

It should verify:

- target confirmation;
- denied self-approval;
- dry run;
- backup;
- Human approval;
- exact scope;
- execution;
- rollback or compensation;
- evidence preservation;
- emergency stop;
- suspension.

---

# 92. Multi-Agent Tool Proof

A multi-Agent Tool proof should verify:

- distinct Agent identities;
- distinct Tool Profiles;
- delegation;
- action attribution;
- separation of duties;
- one Agent cannot use another Agent’s credential;
- one Agent cannot approve its own high-risk action;
- coordinated failure handling;
- contributor evidence.

---

# 93. Multi-Project Tool Proof

A Multi-Project proof should verify:

- Project-specific Tool Instances;
- Project-specific permissions;
- Project-specific credentials where required;
- separate repositories or workspaces;
- Project cost attribution;
- Project evidence attribution;
- denied cross-Project actions;
- Project closure and access removal.

---

# 94. Multi-Tenant Tool Proof

A Multi-Tenant proof should verify:

- Tenant-scoped resources;
- Tenant-scoped permissions;
- Tenant-scoped credentials where required;
- Tenant-scoped Data;
- Tenant-scoped evidence;
- Tenant cost attribution;
- denied cross-Tenant actions;
- Tenant offboarding;
- access removal.

---

# 95. Production Tool Proof

A Production proof should begin with:

```text
1 Production-Controlled Agent

1 Production Read-Only Tool Profile

1 Product

1 Project

1 Exact Production Tool Instance

1 Explicit Action

1 Human Reviewer

1 Monitoring Window

1 Incident Path

1 Evidence Chain

1 Tested Suspension
```

Production write, communication, financial, privileged, and destructive actions
must be approved separately.

---

# 96. Tool Risks

| Risk | Required Response |
|---|---|
| Connector treated as authority | Enforce action-level authorization |
| Credential treated as permission | Validate permission separately |
| Shared credential | Use short-lived attributable identity |
| Excessive Tool scope | Apply least privilege |
| Cross-Project Tool access | Enforce Project scope |
| Cross-Tenant Tool access | Enforce Tenant scope |
| Production access inherited from Development | Use environment-specific profiles |
| Retry creates duplicate effect | Use idempotency |
| Partial failure hidden | Record partial effects |
| Destructive action without recovery | Block execution |
| Tool provider compromise | Suspend and quarantine |
| Connector drift | Version and re-evaluate |
| Cost explosion | Apply budgets and hard stops |
| Monitoring unavailable | Restrict critical actions |
| Agent self-approval | Require independent approval |
| Tool output trusted blindly | Validate outputs |
| Expired credential remains usable | Enforce expiry and revocation |
| Tool retirement leaves access | Perform final access review |

---

# 97. Tool Anti-Patterns

Mianx.ai must avoid:

- granting an Agent every action exposed by a connector;
- using one shared credential for all Agents;
- placing credentials inside prompts;
- treating read-only access as automatically safe;
- allowing one Tool Profile across unrelated Projects;
- allowing one Tool Profile across unrelated Tenants;
- using Development credentials in Production;
- granting unrestricted repository access;
- granting unrestricted database access;
- allowing Agents to transfer funds;
- allowing Agents to sign contracts;
- allowing Agents to publish externally without approval;
- allowing Agents to delete resources without backup;
- retrying non-idempotent actions blindly;
- hiding failed Tool executions;
- disabling monitoring to reduce cost;
- using Agent self-report as Tool evidence;
- retaining retired Tool access;
- claiming Tool implementation from documentation.

---

# 98. Prohibited Tool Behaviors

An Agent must not:

- add a Tool to its own Profile;
- increase its own Tool permissions;
- create its own credential;
- read or expose credential values;
- reuse another Agent’s credential;
- bypass the credential broker;
- expand Product scope;
- expand Project scope;
- expand Tenant scope;
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

# 99. Current Verified Baseline

At the time this document is created:

```yaml
documentation:
  agent_tools_document:
    id: AIW-AGENT-TOOLS-001
    version: 1.0.0
    status: Draft
    canonical: false

target_state:
  tool_definition_model: defined
  connector_model: defined
  tool_instance_model: defined
  action_model: defined
  permission_model: defined
  credential_model: defined
  agent_tool_profile_model: defined
  tool_categories: 15
  action_categories: 12
  production_tool_gate: defined

implementation:
  tool_registry: not_implemented
  connector_registry: not_implemented
  credential_broker: not_implemented
  tool_policy_engine: not_implemented
  runtime_action_authorization: not_verified
  automated_tool_evidence: not_verified
  tool_suspension_enforcement: not_verified

runtime:
  approved_tool_definitions: 0_proven
  approved_connectors: 0_proven
  approved_tool_instances: 0_proven
  active_agent_tool_profiles: 0_proven
  production_agent_tool_profiles: 0_proven
```

---

# 100. Current-State Boundary

This document does not prove that Mianx.ai currently has:

- an implemented Tool Registry;
- an implemented Connector Registry;
- an implemented credential broker;
- approved Tool Definitions;
- approved connectors;
- approved Tool Instances;
- approved Agent Tool Profiles;
- runtime action-level permissions;
- Product-aware Tool enforcement;
- Project-aware Tool enforcement;
- Tenant-aware Tool enforcement;
- automated Tool evidence;
- automated credential rotation;
- automated Tool suspension;
- Production-authorized Tool actions.

This document defines target-state Tool Governance only.

---

# 101. Adoption Requirements

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
- [ ] Tool Definition schema is approved.
- [ ] Connector Definition schema is approved.
- [ ] Tool Instance schema is approved.
- [ ] Tool Action schema is approved.
- [ ] Agent Tool Profile schema is approved.
- [ ] Tool categories are approved.
- [ ] action categories are approved.
- [ ] Tool Risk model is approved.
- [ ] action-level permission model is approved.
- [ ] permission-intersection model is approved.
- [ ] credential architecture is approved.
- [ ] secret-management rules are approved.
- [ ] Product and Project Tool rules are approved.
- [ ] Tenant and Customer Tool rules are approved.
- [ ] environment and regional rules are approved.
- [ ] Data-classification rules are approved.
- [ ] Skill and certification requirements are approved.
- [ ] evaluation process is approved.
- [ ] rate, concurrency, cost, timeout, retry, and idempotency controls are approved.
- [ ] fallback process is approved.
- [ ] evidence format is approved.
- [ ] approval gates are approved.
- [ ] suspension and quarantine are approved.
- [ ] reactivation is approved.
- [ ] replacement and retirement are approved.
- [ ] Tool Registry is implemented.
- [ ] Connector Registry is implemented.
- [ ] credential broker is implemented.
- [ ] Tool Policy Engine is implemented.
- [ ] runtime action authorization is implemented.
- [ ] automated Tool evidence is implemented.
- [ ] suspension is technically enforced.
- [ ] one-Agent read-only Tool proof passes.
- [ ] controlled write Tool proof passes.
- [ ] destructive Tool proof passes in an isolated environment.
- [ ] multi-Agent Tool proof passes.
- [ ] Multi-Project Tool proof passes.
- [ ] Multi-Tenant Tool proof passes where applicable.
- [ ] Production read-only Tool proof passes.
- [ ] Production write proof receives separate approval.
- [ ] `INDEX.md` is updated.
- [ ] `ROADMAP.md` is updated.
- [ ] `CHANGELOG.md` is updated.

---

# 102. Review Questions

Reviewers should answer:

1. Is Tool Definition separated from connector?
2. Is connector separated from Tool Instance?
3. Is Tool Instance separated from Tool action?
4. Is credential separated from permission?
5. Is permission separated from Agent Tool Profile?
6. Is Tool access separated from Agent Skill?
7. Are action categories complete?
8. Are read actions correctly treated as potentially sensitive?
9. Are communication actions Human-controlled?
10. Are financial actions sufficiently restricted?
11. Are privileged actions sufficiently governed?
12. Are destructive actions protected by recovery controls?
13. Are Production actions separately approved?
14. Is action-level authorization explicit?
15. Is default-deny enforced?
16. Are Product and Project boundaries explicit?
17. Are Tenant and Customer boundaries explicit?
18. Are environment boundaries explicit?
19. Are Data classes enforced?
20. Are credentials protected from prompts and logs?
21. Are shared credentials restricted?
22. Are Tool Skill requirements explicit?
23. Is Tool evaluation configuration-specific?
24. Are rate, concurrency, and cost controls defined?
25. Are retries safe?
26. Is idempotency addressed?
27. Are partial failures visible?
28. Can fallback bypass Governance?
29. Is Tool monitoring sufficient?
30. Is Tool evidence attributable?
31. Can Tool access be suspended immediately?
32. Does retirement remove all access?
33. Are current-state limitations explicit?
34. Are any runtime Tool claims unsupported?

---

# 103. Definition of Done

This document is content-complete for review when:

- [ ] purpose is defined;
- [ ] current authority status is explicit;
- [ ] exact strategic hierarchy is included;
- [ ] Tool principles are defined;
- [ ] non-equivalence rule is defined;
- [ ] Tool Definition is defined;
- [ ] connector is defined;
- [ ] Tool Instance is defined;
- [ ] Tool action is defined;
- [ ] credential is defined;
- [ ] permission is defined;
- [ ] Agent Tool Profile is defined;
- [ ] entity model is defined;
- [ ] Tool ID standard is defined;
- [ ] Tool Definition record is defined;
- [ ] Connector Definition record is defined;
- [ ] Tool Instance record is defined;
- [ ] Tool Action record is defined;
- [ ] Agent Tool Profile record is defined;
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
- [ ] Tool Risk is defined;
- [ ] permission model is defined;
- [ ] action-level permission record is defined;
- [ ] permission intersection is defined;
- [ ] credential architecture is defined;
- [ ] credential rules are defined;
- [ ] shared credential restrictions are defined;
- [ ] secret management is defined;
- [ ] Product and Project Tool scope are defined;
- [ ] Tenant and Customer Tool scope are defined;
- [ ] environment and regional scope are defined;
- [ ] Data classification is defined;
- [ ] Skill and certification requirements are defined;
- [ ] Tool evaluation is defined;
- [ ] destructive Tool evaluation is defined;
- [ ] Tool Profile validity is defined;
- [ ] assignment lifecycle is defined;
- [ ] rate limits are defined;
- [ ] concurrency limits are defined;
- [ ] cost limits are defined;
- [ ] timeout controls are defined;
- [ ] retry controls are defined;
- [ ] idempotency is defined;
- [ ] partial failure is defined;
- [ ] fallback is defined;
- [ ] failure states and handling are defined;
- [ ] monitoring is defined;
- [ ] Tool evidence is defined;
- [ ] Tool evidence quality is defined;
- [ ] Tool approval gate is defined;
- [ ] Agent assignment gate is defined;
- [ ] Production gate is defined;
- [ ] suspension is defined;
- [ ] quarantine is defined;
- [ ] reactivation is defined;
- [ ] replacement is defined;
- [ ] deprecation is defined;
- [ ] retirement is defined;
- [ ] Tool Registry is defined;
- [ ] reporting is defined;
- [ ] metrics are defined;
- [ ] one-Agent read-only proof is defined;
- [ ] controlled write proof is defined;
- [ ] destructive Tool proof is defined;
- [ ] multi-Agent proof is defined;
- [ ] Multi-Project proof is defined;
- [ ] Multi-Tenant proof is defined;
- [ ] Production proof is defined;
- [ ] risks are defined;
- [ ] anti-patterns are defined;
- [ ] prohibited behaviors are defined;
- [ ] current verified baseline is defined;
- [ ] current-state boundary is explicit;
- [ ] adoption requirements are defined;
- [ ] next document is identified.

This document becomes Active only after required review, implementation,
evaluation, testing, and approval.

---

# 104. Current Documentation Progress

After this document is saved:

```text
Total Planned AI Workforce Documents = 83

Content Complete for Review = 21

Existing Drafts Needing Alignment Review = 0

Empty Placeholders Remaining = 62

Approved Documents = 0

Active Canonical Documents = 0

Agents Folder Documents Completed = 4 of 7

Tool Registry Implemented = NO

Approved Runtime Agent Tool Profiles = 0 Proven

Verified Production Tool Profiles = 0

Production Tool Execution Authorized = NO
```

---

# 105. Current Document Decision

```text
DOCUMENT_ID=AIW-AGENT-TOOLS-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TARGET_STATE_AGENT_TOOL_MODEL=DEFINED

TOOL_REGISTRY=NOT_IMPLEMENTED

TOOL_POLICY_ENGINE=NOT_IMPLEMENTED

CREDENTIAL_BROKER=NOT_IMPLEMENTED

RUNTIME_TOOL_ENFORCEMENT=NOT_VERIFIED

APPROVED_RUNTIME_TOOL_PROFILES=0_PROVEN

PRODUCTION_TOOL_EXECUTION=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

---

# 106. Revision History

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1.0 | 2026-08-06 | Draft | Initial AI Agent Tools outline |
| 1.0.0 | 2026-08-06 | Draft | Defined Tool Definitions, connectors, Tool Instances, actions, credentials, permissions, Agent Tool Profiles, Tool categories, action categories, Risk, Product, Project, Tenant, Customer, environment and Data scope, Skill and certification requirements, evaluation, rate, concurrency, cost, timeout, retry, idempotency, failure, fallback, monitoring, evidence, suspension, quarantine, replacement, deprecation, retirement, Production gates, risks, prohibited behavior, and current-state boundaries |

---

# 107. Changelog Entry

Append the following entry to:

```text
doc/19-ai-workforce/CHANGELOG.md
```

```markdown
## AIW-CHG-20260806-021 — AI Agent Tools Completed

| Field | Value |
|---|---|
| Date | 2026-08-06 |
| Change Type | `CREATED`, `STATUS`, `GOVERNANCE`, `SECURITY`, `CAPABILITY` |
| Impact | `I4 — Critical` |
| Risk | `R4` |
| Status | Completed for Review |
| Owner | AI Workforce Council |
| Steward | Agent Framework and Tool Governance |
| Approver | Pending Founder and Enterprise Governance Review |

### Affected Documents

- `doc/19-ai-workforce/agents/agent-tools.md`
- `doc/19-ai-workforce/INDEX.md`
- `doc/19-ai-workforce/ROADMAP.md`
- `doc/19-ai-workforce/CHANGELOG.md`

### Previous State

`agent-tools.md` existed as an empty placeholder.

The Agents documentation defined Agent Types, Agent Lifecycle, and Agent Skills
but lacked a dedicated standard separating Tool Definitions, connectors, Tool
Instances, actions, credentials, permissions, and Agent Tool Profiles.

### New State

The document now defines:

- the difference between Tool Definition, connector, Tool Instance, Tool
  action, credential, permission, Agent Tool Profile, Skill, Capability, and
  execution authority;
- Tool, connector, Tool Instance, action, permission, and Agent Tool Profile
  schemas;
- fifteen Tool categories;
- twelve Tool action categories;
- read, draft, create, update, communication, repository, database,
  infrastructure, financial, privileged, destructive, recovery, and Production
  controls;
- action-level authorization and default-deny behavior;
- credential-broker and secret-management requirements;
- Product, Project, Tenant, Customer, environment, regional, and Data scope;
- Skill and certification dependencies;
- Tool evaluation and destructive-action evaluation;
- Tool Profile lifecycle and validity;
- rate, concurrency, cost, timeout, retry, idempotency, partial-failure, and
  fallback controls;
- Tool health, monitoring, evidence, and evidence-quality levels;
- Tool approval, Agent assignment, and Production gates;
- suspension, quarantine, reactivation, replacement, deprecation, and
  retirement;
- Tool Registry boundaries;
- read-only, controlled-write, destructive, multi-Agent, Multi-Project,
  Multi-Tenant, and Production proof requirements;
- risks, anti-patterns, prohibited behavior, and current-state boundaries.

### Preserved Truth

```text
Connector Availability
≠
Tool Authority

Credential
≠
Permission

Permission
≠
Approval

Tool Access
≠
Agent Skill

Agent Tool Profile
≠
Production Authorization
```

### Limitations

- Founder approval is pending.
- Canonical status remains false.
- Tool Registry is not implemented.
- Connector Registry is not implemented.
- credential broker is not implemented.
- Tool Policy Engine is not implemented.
- runtime action-level enforcement is not proven.
- approved runtime Agent Tool Profiles proven by documentation remain zero.
- Production Tool execution is not authorized.

### Follow-Up

- complete `doc/19-ai-workforce/agents/agent-memory.md`;
- use document ID `AIW-AGENT-MEMORY-001`;
- distinguish session memory, working memory, Agent memory, Team memory,
  enterprise memory, Product memory, Project memory, Tenant memory, Customer
  memory, and canonical Knowledge;
- define memory reads, writes, provenance, classification, retention,
  summarization, promotion, correction, deletion, isolation, access,
  contamination prevention, and evidence;
- align memory with Agent lifecycle, Skills, Tools, shared memory, privacy,
  Security, and the Verifiable-Work Envelope;
- update the INDEX and Roadmap after completion.
```

---

# 108. Next Document

The next document in the official Agents documentation sequence is:

```text
doc/19-ai-workforce/agents/agent-memory.md
```

It must use:

```text
AIW-AGENT-MEMORY-001
```

It must define:

- memory purpose;
- memory types;
- session memory;
- working memory;
- Agent memory;
- Team memory;
- enterprise memory;
- Product memory;
- Project memory;
- Tenant memory;
- Customer memory;
- canonical Knowledge boundary;
- read and write permissions;
- provenance;
- Data classification;
- retention;
- expiry;
- summarization;
- promotion;
- correction;
- deletion;
- redaction;
- isolation;
- contamination prevention;
- memory evaluation;
- monitoring;
- evidence;
- suspension;
- current-state limitations;
- Changelog entry;
- next document path.

---