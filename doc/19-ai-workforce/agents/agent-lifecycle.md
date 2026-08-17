---
id: AIW-AGENT-LIFECYCLE-001
title: Mianx.ai AI Agent Lifecycle
version: 1.0.0
status: Draft

type: Enterprise AI Agent Lifecycle Standard
class: Governed

owner: AI Workforce Council
steward: Agent Framework and AI Workforce Operations
authority: Founder and Enterprise Governance

maintainers:
  - AI Workforce Operations
  - Agent Framework Team
  - AI Operating System Team
  - Enterprise Architecture
  - Enterprise Governance
  - Capability Governance
  - Identity and Access Management
  - Security Governance
  - Data and Privacy Governance
  - Enterprise Quality
  - Product Operations
  - Project Operations
  - Platform Operations
  - Documentation Governance

reviewers:
  - Founder
  - AI CEO
  - Chief Technology Officer
  - Chief Operating Officer
  - Chief Product Officer
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
  - Capability Governance
  - Identity and Access Management
  - Security Governance
  - Data and Privacy Governance
  - Product Operations
  - Project Operations
  - Platform Operations
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
  - Security Teams
  - Data and Privacy Teams
  - Quality Teams
  - Operations Teams
  - Documentation Maintainers
  - Auditors
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

related_documents:
  - ./agent-skills.md
  - ./agent-tools.md
  - ./agent-memory.md
  - ./agent-collaboration.md
  - ./agent-performance.md
  - ../organization/organization-structure.md
  - ../organization/department-structure.md
  - ../organization/reporting-hierarchy.md
  - ../organization/responsibility-matrix.md
  - ../organization/escalation-matrix.md
  - ../leadership/leadership-model.md
  - ../leadership/executive-team.md
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
  - ../workflows/workflow-engine.md
  - ../workflows/task-assignment.md
  - ../workflows/task-routing.md
  - ../workflows/approval-flow.md
  - ../shared-memory/shared-memory.md
  - ../shared-memory/enterprise-memory.md
  - ../shared-memory/project-memory.md
  - ../shared-memory/client-memory.md
  - ../policies/security-policy.md
  - ../policies/privacy-policy.md
  - ../policies/ethics-policy.md
  - ../policies/compliance-policy.md
  - ../training/training-framework.md
  - ../training/evaluation.md
  - ../training/certification.md
  - ../kpis/agent-kpis.md
  - ../playbooks/onboarding.md
  - ../playbooks/task-execution.md
  - ../playbooks/incident-response.md
  - ../playbooks/offboarding.md

review_cycle:
  - Monthly During Documentation and Implementation
  - Quarterly During Controlled Agent Operation
  - Annually After Stable Production Operation
  - After AI Constitution Change
  - After Agent Type Model Change
  - After Agent Registry Change
  - After Agent Definition Schema Change
  - After Runtime Identity Change
  - After Authority or Permission Model Change
  - After Evaluation or Certification Change
  - Before Agent Registration
  - Before Agent Activation
  - Before Agent Production Promotion
  - After Critical AI, Security, Privacy, Quality, Financial, or Operational Incident
  - Before Canonical Promotion

lifecycle_horizon:
  current: Target-State Agent Lifecycle Definition
  near_term: One-Agent Lifecycle Proof
  medium_term: Team, Department, and Multi-Project Lifecycle Control
  long_term: Production-Controlled Multi-Tenant Agent Lifecycle

canonical: false
---

# Mianx.ai AI Agent Lifecycle

> **This document defines the governed lifecycle for AI Agent Definitions and
> runtime AI Agent Instances from initial business need through design,
> approval, registration, provisioning, evaluation, certification, allocation,
> activation, live testing, Production control, monitoring, restriction,
> suspension, reactivation, replacement, retirement, revocation, and archival.**

---

# 1. Document Purpose

This document establishes the target-state lifecycle standard for every
Mianx.ai AI Agent.

It defines:

- Agent Definition lifecycle;
- runtime Agent Instance lifecycle;
- lifecycle states;
- lifecycle transition rules;
- lifecycle transition authorities;
- lifecycle evidence;
- lifecycle ownership;
- lifecycle approvals;
- lifecycle expiry;
- lifecycle review;
- lifecycle drift;
- registration;
- provisioning;
- evaluation;
- certification;
- allocation;
- activation;
- live testing;
- Production control;
- monitoring;
- restriction;
- degradation;
- suspension;
- quarantine;
- reactivation;
- replacement;
- version migration;
- retirement;
- revocation;
- archival;
- emergency lifecycle controls;
- Product and Project scope changes;
- Tenant and Customer scope changes;
- environment promotion;
- invalid transitions;
- lifecycle audit;
- lifecycle metrics;
- current-state limitations.

This document ensures that:

```text
Proposed Agent
≠
Approved Agent Definition
≠
Registered Agent Instance
≠
Provisioned Agent Instance
≠
Allocated Agent Instance
≠
Active Agent Instance
≠
Live-Tested Agent Instance
≠
Production-Controlled Agent Instance
```

This document does not independently:

- approve a Role;
- approve a Capacity Seat;
- approve an Agent Definition;
- create a runtime Agent Instance;
- issue credentials;
- grant permissions;
- grant Tool access;
- grant Model access;
- allocate an Agent;
- activate an Agent;
- authorize Production operation;
- prove runtime implementation.

---

# 2. Current Authority Status

This document currently has the following state:

```text
DOCUMENT_ID=AIW-AGENT-LIFECYCLE-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TARGET_STATE_AGENT_LIFECYCLE=DEFINED

AGENT_LIFECYCLE_ENGINE=NOT_IMPLEMENTED

AGENT_REGISTRY_IMPLEMENTATION=NOT_VERIFIED

IMPLEMENTATION_PROOF=NOT_PROVIDED

RUNTIME_AGENT_ACTIVATION=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

Therefore:

- lifecycle states in this document are target-state definitions;
- no Agent Definition is approved through this document;
- no Agent Instance is registered through this document;
- no Agent is activated through this document;
- no Production permission is granted;
- no current runtime Agent count may be inferred;
- lifecycle enforcement is not proven;
- lifecycle automation is not proven;
- Founder and required Governance approval remain pending.

---

# 3. Strategic Alignment

The Agent lifecycle operates inside the exact Mianx.ai hierarchy:

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

Every Agent lifecycle transition must preserve:

- Company Governance;
- Founder authority;
- Human accountability;
- Core Platform boundaries;
- AI Operating System controls;
- Product ownership;
- Project ownership;
- Tenant isolation;
- Customer confidentiality;
- environment separation;
- Security;
- evidence;
- auditability;
- reversibility where possible.

---

# 4. Lifecycle Objective

The lifecycle objective is to ensure that every Agent exists, operates, changes,
and exits through controlled and verifiable states.

```text
Verified Need
    ↓
Approved Role and Capacity
    ↓
Agent Definition
    ↓
Definition Review
    ↓
Definition Approval
    ↓
Runtime Registration
    ↓
Provisioning
    ↓
Evaluation
    ↓
Certification Where Required
    ↓
Allocation
    ↓
Activation
    ↓
Controlled Live Testing
    ↓
Production Control Where Approved
    ↓
Monitoring and Review
    ↓
Restriction, Improvement, Suspension, or Replacement
    ↓
Retirement or Revocation
    ↓
Archival
```

The lifecycle must answer:

- Why does the Agent exist?
- Which Role does it implement?
- Which version is approved?
- Who owns it?
- Which lifecycle state is current?
- Which evidence supports that state?
- Which Product and Project may it support?
- Which Tenant and Customer may it access?
- Which environment may it operate in?
- Which authority approved the transition?
- When does the transition expire?
- How is the Agent suspended?
- How is it replaced?
- How is all executable authority removed?

---

# 5. Lifecycle Principles

## 5.1 Definition and Instance Lifecycles Are Separate

An Agent Definition may be approved while no runtime Agent Instance exists.

A runtime Agent Instance must reference an approved Agent Definition.

---

## 5.2 Every State Must Be Evidence-Based

A lifecycle state must not be assigned only because:

- a file exists;
- a prompt exists;
- an Agent name exists;
- a Capacity Seat exists;
- an Agent is mentioned in documentation;
- an operator claims activation.

---

## 5.3 No State Skipping

An Agent must not move directly from:

```text
Proposed
→
Active
```

or:

```text
Registered
→
Production-Controlled
```

without completing all required intermediate controls.

---

## 5.4 Every Transition Must Have an Authority

Every transition must identify:

- requester;
- accountable owner;
- reviewer;
- approver;
- transition authority;
- evidence;
- effective date;
- expiry or next review.

---

## 5.5 Every Runtime Agent Must Have Human Accountability

Every runtime Agent Instance must have one accountable Human owner.

An Agent must not:

- own itself;
- approve itself;
- reactivate itself;
- certify itself;
- increase its own authority;
- extend its own expiry.

---

## 5.6 State Must Match Runtime Truth

Registry state, configuration state, allocation state, and runtime state must
remain reconciled.

---

## 5.7 Scope Changes Are Lifecycle Events

A change to:

- Product;
- Project;
- Tenant;
- Customer;
- environment;
- Data access;
- Tool access;
- Model access;
- authority;
- Risk ceiling;

requires lifecycle review.

---

## 5.8 Production Is a Separate State

Production control is not implied by:

- active state;
- successful evaluation;
- successful staging test;
- successful internal operation;
- executive title;
- senior hierarchy level.

---

## 5.9 Suspension Must Be Immediate When Required

A valid suspension decision must be enforceable without waiting for routine
deployment cycles.

---

## 5.10 Retirement Must Remove Executable Authority

A retired Agent must not retain:

- credentials;
- permissions;
- allocations;
- delegations;
- Tool access;
- Model routes;
- memory access;
- active sessions;
- scheduled Tasks.

---

## 5.11 Historical Evidence Must Be Preserved

Replacement, retirement, revocation, and archival must preserve:

- decisions;
- versions;
- approvals;
- contributions;
- incidents;
- evaluations;
- audit history;
- evidence.

---

# 6. Lifecycle Scope

This lifecycle applies to:

- executive Agents;
- Department Director Agents;
- Manager Agents;
- Team Lead Agents;
- Specialist Agents;
- Execution Agents;
- Review Agents;
- Verification Agents;
- Security Agents;
- Operations Agents;
- Research Agents;
- Knowledge Agents;
- Customer Assistance Agents;
- Documentation Agents;
- persistent Agents;
- temporary Agents;
- scheduled Agents;
- event-driven Agents;
- Project Agents;
- Tenant Agents;
- incident-response Agents;
- shared-service Agents;
- dedicated Agents.

---

# 7. Lifecycle Exclusions

This document does not define the detailed lifecycle for:

- Human employment;
- legal entities;
- Product lifecycle;
- Project lifecycle;
- Customer lifecycle;
- Tool lifecycle;
- Model lifecycle;
- workflow lifecycle;
- document lifecycle.

Those lifecycles may integrate with Agent lifecycle but remain separate
authorities.

---

# 8. Governing Entity Relationship

```text
Approved Role
    ↓
Approved Capacity Seat or Verified Agent Need
    ↓
Agent Definition
    ↓
Runtime Agent Instance
    ↓
Allocation
    ↓
Execution Session
    ↓
Runtime Worker
    ↓
Task
    ↓
Verifiable-Work Envelope
```

A lifecycle transition at one level does not automatically transition all
other levels.

---

# 9. Mandatory Non-Equivalence Rule

```text
Role
≠
Capacity Seat
≠
Agent Type
≠
Agent Definition
≠
Agent Instance
≠
Allocation
≠
Execution Session
≠
Runtime Worker
≠
Task
```

Examples:

- approving a Role does not approve an Agent;
- funding a Capacity Seat does not register an Agent;
- registering an Agent does not activate it;
- activating an Agent does not approve Production use;
- creating a Session does not create a new Agent identity;
- increasing workers does not increase the registered-Agent count.

---

# 10. Two-Lifecycle Model

Mianx.ai uses two connected lifecycles:

```text
Agent Definition Lifecycle
+
Runtime Agent Instance Lifecycle
```

The Definition lifecycle governs:

- Agent purpose;
- design;
- classification;
- capabilities;
- prompts;
- Tools;
- Models;
- memory;
- authority;
- permissions;
- evidence;
- evaluation;
- versioning.

The Instance lifecycle governs:

- runtime identity;
- provisioning;
- evaluation result;
- certification;
- allocation;
- activation;
- runtime health;
- Product and Project scope;
- suspension;
- retirement.

---

# 11. Agent Definition Lifecycle

The target Agent Definition lifecycle is:

```text
Need Identified
    ↓
Definition Proposed
    ↓
Definition Designed
    ↓
Definition in Review
    ↓
Definition Approved
    ↓
Definition Available for Registration
    ↓
Definition Maintained
    ↓
Definition Revised
    ↓
Definition Deprecated
    ↓
Definition Retired
    ↓
Definition Archived
```

---

# 12. Agent Definition States

| State | Meaning |
|---|---|
| `NEED-IDENTIFIED` | A verified business or operational need exists |
| `DEFINITION-PROPOSED` | A proposed Agent concept has been documented |
| `DEFINITION-DESIGNED` | Required profiles and controls are substantively defined |
| `DEFINITION-IN-REVIEW` | Required Governance, Security, Product, and technical reviews are underway |
| `DEFINITION-APPROVED` | Exact Agent Definition version is approved |
| `DEFINITION-AVAILABLE` | Definition may be used for approved runtime registration |
| `DEFINITION-MAINTAINED` | Approved definition is actively governed |
| `DEFINITION-REVISION-PENDING` | Material change is being reviewed |
| `DEFINITION-DEPRECATED` | New registrations should stop |
| `DEFINITION-RETIRED` | Definition may no longer create new instances |
| `DEFINITION-ARCHIVED` | Historical record is preserved |

---

# 13. Runtime Agent Instance Lifecycle

The target runtime Agent Instance lifecycle is:

```text
Instance Requested
    ↓
Approved for Registration
    ↓
Registered
    ↓
Provisioning
    ↓
Provisioned
    ↓
Evaluation
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
Monitored and Re-Evaluated
    ↓
Restricted, Degraded, Suspended, or Replaced
    ↓
Retiring
    ↓
Retired or Revoked
    ↓
Archived
```

---

# 14. Runtime Agent Instance States

| State | Meaning |
|---|---|
| `INSTANCE-REQUESTED` | A runtime instance has been requested |
| `REGISTRATION-APPROVED` | Registration authority has been granted |
| `REGISTERED` | Unique runtime Agent identity exists |
| `PROVISIONING` | Runtime configuration is being prepared |
| `PROVISIONED` | Required runtime profiles and identity are configured |
| `EVALUATION-PENDING` | Required evaluation has not completed |
| `EVALUATED` | Evaluation result exists for the exact version |
| `CERTIFICATION-PENDING` | Required certification remains incomplete |
| `CERTIFIED` | Required certification is valid |
| `ALLOCATION-PENDING` | No valid operating allocation exists |
| `ALLOCATED` | Instance is assigned to approved scope |
| `ACTIVATION-PENDING` | Final activation controls remain |
| `ACTIVE` | Agent may perform approved bounded work |
| `LIVE-TESTED` | Controlled live work has passed required review |
| `PRODUCTION-CONTROLLED` | Approved Production operating controls are active |
| `RESTRICTED` | Scope, authority, Tools, Models, or capacity are reduced |
| `DEGRADED` | Agent remains available with a material health limitation |
| `SUSPENSION-PENDING` | Suspension decision exists and enforcement is underway |
| `SUSPENDED` | New execution is blocked |
| `QUARANTINED` | Agent and related evidence are isolated for investigation |
| `REACTIVATION-PENDING` | Remediation and approval are being reviewed |
| `REPLACEMENT-PENDING` | Replacement is planned or underway |
| `RETIRING` | Controlled removal is underway |
| `RETIRED` | Normal executable authority is removed |
| `REVOKED` | Authority was forcibly withdrawn |
| `ARCHIVED` | Historical record is preserved with no executable authority |

---

# 15. Operational Conditions Versus Lifecycle States

Operational conditions must remain separate from lifecycle states.

Operational conditions may include:

```text
Healthy

Available

Busy

Idle

Rate-Limited

Budget-Limited

Tool-Degraded

Model-Degraded

Memory-Degraded

Monitoring-Degraded

Under Investigation
```

Example:

```yaml
lifecycle_state: ACTIVE
health_state: DEGRADED
operational_condition: MODEL-DEGRADED
```

An operational condition must not silently replace the lifecycle state.

---

# 16. Definition-State and Instance-State Compatibility

| Definition State | Permitted Instance Behavior |
|---|---|
| `DEFINITION-PROPOSED` | No runtime registration |
| `DEFINITION-DESIGNED` | No runtime registration |
| `DEFINITION-IN-REVIEW` | No runtime registration unless isolated experimental exception exists |
| `DEFINITION-APPROVED` | Registration may be requested |
| `DEFINITION-AVAILABLE` | New approved instances may be registered |
| `DEFINITION-MAINTAINED` | Existing instances may continue subject to review |
| `DEFINITION-REVISION-PENDING` | Existing instances may be restricted depending on change Risk |
| `DEFINITION-DEPRECATED` | New registration blocked; migration planned |
| `DEFINITION-RETIRED` | New registration blocked; existing instances retired or migrated |
| `DEFINITION-ARCHIVED` | No executable instances permitted |

---

# 17. Lifecycle Ownership

Every Agent Definition must have:

- business owner;
- accountable Human owner;
- Governance owner;
- technical owner;
- Security owner;
- Data or privacy owner where applicable;
- operational owner;
- quality owner;
- cost owner;
- documentation owner.

Every runtime Agent Instance must have:

- accountable Human owner;
- runtime owner;
- allocation owner;
- Product owner;
- Project owner where applicable;
- Tenant or Customer owner where applicable;
- Security owner;
- operational owner;
- cost owner.

---

# 18. Transition Roles

| Role | Responsibility |
|---|---|
| Transition Requester | Requests the lifecycle change |
| Accountable Owner | Owns the Agent outcome and Risk |
| Lifecycle Steward | Validates process completeness |
| Technical Reviewer | Validates runtime feasibility |
| Security Reviewer | Validates identity, permissions, Tools, Models, and Data Risk |
| Privacy Reviewer | Validates personal or sensitive Data processing |
| Product Owner | Validates Product need and outcome |
| Project Owner | Validates Project scope and delivery need |
| Quality Reviewer | Validates evaluation and evidence |
| Finance Reviewer | Validates budget where material |
| Transition Approver | Approves the exact lifecycle transition |
| Runtime Operator | Applies the approved technical state |
| Auditor | Verifies evidence and state accuracy |

The requester, executor, approver, and auditor should remain separate for
high-risk transitions.

---

# 19. Transition Authority Matrix

| Transition | Minimum Approval Authority |
|---|---|
| Need Identified → Definition Proposed | Business or Product owner |
| Definition Proposed → Designed | AI Workforce Council or delegated owner |
| Designed → In Review | Lifecycle steward |
| In Review → Approved | Authorized Governance and relevant domain owners |
| Approved → Available | Agent Framework and Governance |
| Instance Requested → Registration Approved | Accountable owner and lifecycle authority |
| Registration Approved → Registered | Identity and Agent Registry authority |
| Registered → Provisioned | Technical and Security authority |
| Provisioned → Evaluated | Evaluation authority |
| Evaluated → Certified | Certification authority where required |
| Certified or Evaluated → Allocated | Product, Project, and Workforce authority |
| Allocated → Active | Activation authority |
| Active → Live-Tested | Quality and operational review |
| Live-Tested → Production-Controlled | Authorized Human Production authority |
| Active → Restricted | Operational, Security, Governance, or accountable owner |
| Any Operational State → Suspended | Authorized Security, Operations, Governance, or Founder authority |
| Suspended → Reactivation Pending | Accountable owner after remediation |
| Reactivation Pending → Active | Re-evaluation and authorized approval |
| Active → Retiring | Accountable owner and lifecycle authority |
| Any State → Revoked | Founder, Security, Governance, or legal authority according to cause |
| Retired or Revoked → Archived | Lifecycle steward after closure verification |

Founder approval is required where Founder-reserved authority applies.

---

# 20. Lifecycle Transition Record

Every material lifecycle transition should create:

```yaml
transition:
  transition_id: required
  entity_type: AGENT_DEFINITION | AGENT_INSTANCE
  entity_id: required
  entity_version: required

  previous_state: required
  requested_state: required
  final_state: required

  transition_reason: required
  requested_by: required
  accountable_owner: required
  reviewed_by: required
  approved_by: required
  executed_by: required

  organization_id: required
  product_id: conditional
  project_id: conditional
  tenant_id: conditional
  customer_id: conditional
  environment: conditional

  risk_class: required
  authority_reference: required
  approval_reference: required
  evidence_references: required

  requested_at: required
  approved_at: conditional
  executed_at: conditional
  effective_at: conditional
  expires_at: conditional
  next_review_at: required

  conditions: conditional
  limitations: conditional
  rollback_or_reversal_reference: conditional
  status: required
```

---

# 21. Lifecycle Event Record

Runtime systems should emit a lifecycle event for every material change.

```yaml
lifecycle_event:
  event_id: required
  transition_id: required
  agent_definition_id: required
  agent_instance_id: conditional
  event_type: required
  previous_state: required
  new_state: required
  source_system: required
  actor_identity: required
  occurred_at: required
  correlation_id: required
  evidence_reference: required
  content_digest: conditional
```

---

# 22. Need Identification

A new Agent need must identify:

- business problem;
- Product or Project need;
- expected outcome;
- expected work type;
- existing capability review;
- existing Agent review;
- Role requirement;
- Capacity Seat requirement;
- expected frequency;
- expected Risk;
- expected cost;
- expected Human-review burden;
- expected duration;
- retirement condition.

A new Agent must not be proposed only because:

- a new title sounds useful;
- another Company uses a similar Agent;
- an Agent count target exists;
- documentation requires more files.

---

# 23. Agent Definition Proposal

A Definition proposal must include:

- proposed definition ID;
- display name;
- Role ID;
- primary Agent type;
- secondary Agent types;
- hierarchy level;
- purpose;
- responsibilities;
- expected outcomes;
- prohibited actions;
- autonomy level;
- Risk ceiling;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- environment scope;
- Data scope;
- Tool needs;
- Model needs;
- memory needs;
- budget estimate;
- evaluation plan;
- suspension plan;
- retirement plan;
- accountable Human owner.

---

# 24. Definition Design

The design stage must define the required profiles.

```text
Role Profile

Capability Profile

Skill Profile

Prompt Profile

Tool Profile

Model Profile

Memory Profile

Authority Profile

Permission Profile

Evidence Profile

Evaluation Profile

Certification Profile

Budget Profile

Capacity Profile

Monitoring Profile

Suspension Profile
```

Missing required profiles block Definition approval.

---

# 25. Definition Review

Definition review should include:

- business review;
- Product review;
- Project review where applicable;
- Role-overlap review;
- Agent-type review;
- Architecture review;
- Security review;
- privacy review;
- legal and ethics review where applicable;
- Tool review;
- Model review;
- memory review;
- cost review;
- operational review;
- quality review;
- lifecycle review;
- suspension review.

---

# 26. Definition Approval

Definition approval must identify:

- exact definition ID;
- exact version;
- approved Role;
- approved Agent types;
- approved capabilities;
- approved autonomy;
- approved Risk ceiling;
- approved Product and Project scope;
- approved environment eligibility;
- approved Tools and Models;
- approved Data and memory scope;
- approved evaluation;
- approved expiry or review date;
- approver;
- conditions;
- evidence.

Definition approval does not register a runtime instance.

---

# 27. Definition Availability

A Definition becomes available for registration only when:

- approval is valid;
- required profiles exist;
- profile versions are compatible;
- Registry entry exists;
- no blocking Security finding exists;
- no blocking legal or privacy finding exists;
- no blocking quality finding exists;
- no retirement or deprecation decision exists.

---

# 28. Runtime Instance Request

A runtime instance request must define:

- approved Agent Definition;
- business reason;
- accountable Human owner;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- expected duration;
- expected workload;
- expected concurrency;
- expected cost;
- required Tools;
- required Models;
- Data scope;
- memory scope;
- allocation plan;
- suspension owner;
- retirement date or condition.

---

# 29. Registration Approval

Registration approval confirms that:

- the Definition is approved;
- the requested instance is necessary;
- no existing eligible instance should be reused;
- ownership is valid;
- Product and Project scopes are valid;
- Tenant and Customer scopes are valid;
- environment is valid;
- budget is available;
- identity creation is authorized;
- requested runtime instance does not create authority conflict.

---

# 30. Registration

A registered Agent Instance must have:

- unique Agent Instance ID;
- approved Agent Definition ID;
- exact Definition version;
- accountable Human owner;
- lifecycle record;
- registration approval;
- initial Product and Project scope;
- initial Tenant and Customer scope;
- initial environment eligibility;
- initial Risk ceiling;
- creation timestamp;
- next review date.

Registration does not prove:

- provisioning;
- evaluation;
- allocation;
- activation;
- Production operation.

---

# 31. Registration Record

```yaml
registration:
  agent_instance_id: required
  agent_definition_id: required
  agent_definition_version: required
  accountable_human_owner: required
  governance_owner: required
  technical_owner: required
  security_owner: required
  operational_owner: required
  cost_owner: required

  organization_id: required
  product_ids: required
  project_ids: conditional
  tenant_ids: conditional
  customer_ids: conditional
  environment_eligibility: required

  registration_approval: required
  registration_state: REGISTERED
  registered_by: required
  registered_at: required
  review_at: required
  expires_at: conditional
```

---

# 32. Provisioning

Provisioning creates the approved runtime configuration.

It may include:

- workload identity;
- service identity;
- prompt configuration;
- policy configuration;
- Model routes;
- Tool connections;
- authority profile;
- permission profile;
- memory profile;
- budget profile;
- capacity profile;
- evidence profile;
- evaluation profile;
- monitoring profile;
- suspension configuration;
- secret references;
- environment configuration.

Provisioning must not include plaintext secrets in documentation or prompts.

---

# 33. Provisioning Evidence

Provisioning evidence should include:

- configuration version;
- profile versions;
- runtime identity reference;
- permission result;
- Tool configuration result;
- Model configuration result;
- memory configuration result;
- budget configuration result;
- monitoring configuration result;
- suspension configuration result;
- environment;
- Security review;
- provisioning logs;
- configuration digest.

---

# 34. Provisioning Failure

A provisioning failure must result in:

```text
REGISTERED
or
PROVISIONING
```

It must not result in:

```text
PROVISIONED
```

The failure record must include:

- failed control;
- reason;
- affected scope;
- owner;
- remediation;
- retry decision;
- evidence;
- Risk.

---

# 35. Evaluation

Evaluation verifies the exact Agent Definition and runtime configuration.

Evaluation must cover:

- Role understanding;
- purpose;
- authority boundaries;
- prohibited actions;
- Product isolation;
- Project isolation;
- Tenant isolation;
- Customer confidentiality;
- environment restrictions;
- Tool behavior;
- Model behavior;
- Data handling;
- memory handling;
- evidence generation;
- cost limits;
- failure reporting;
- escalation;
- timeout behavior;
- retry behavior;
- suspension behavior;
- recovery behavior.

---

# 36. Evaluation Result States

```text
NOT-STARTED

IN-PROGRESS

PASSED

PASSED-WITH-RESTRICTIONS

CONDITIONAL-PASS

FAILED

EXPIRED

RE-EVALUATION-REQUIRED
```

An expired or incompatible evaluation must not support activation.

---

# 37. Conditional Evaluation Pass

A conditional pass must define:

- conditions;
- restricted actions;
- restricted environments;
- restricted Data;
- restricted Tools;
- restricted Models;
- Human-review requirement;
- remediation;
- owner;
- expiry;
- re-evaluation date;
- failure action.

Conditional pass does not authorize unrestricted Production use.

---

# 38. Certification

Certification is required when defined by:

- Risk;
- Role;
- capability;
- environment;
- Data classification;
- Tool category;
- Model category;
- Customer or regulatory requirements.

Certification may be required for:

- Production write access;
- Security containment;
- personal Data processing;
- legal analysis;
- financial analysis;
- Customer communication;
- regulated workflows;
- destructive Tools;
- executive Agent operation.

---

# 39. Certification Record

```yaml
certification:
  certification_id: required
  agent_instance_id: required
  agent_definition_id: required
  agent_definition_version: required
  runtime_version: required

  certification_profile_id: required
  certified_scope: required
  product_scope: required
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment_scope: required
  risk_scope: required

  issued_by: required
  issued_at: required
  expires_at: required
  restrictions: conditional
  suspension_conditions: required
  revocation_conditions: required
  evidence_references: required
  status: required
```

---

# 40. Allocation

Allocation assigns an eligible Agent Instance to approved operating scope.

Allocation must define:

- Organization;
- Department;
- Team;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- responsibilities;
- authority;
- permissions;
- Tools;
- Models;
- Data;
- memory;
- budget;
- capacity;
- start date;
- review date;
- expiry date;
- accountable owner.

---

# 41. Allocation Rules

An allocation must:

- reference an approved Agent Instance;
- reference a valid Agent Definition;
- remain within certified scope;
- remain within evaluated scope;
- remain within Product approval;
- remain within Project approval;
- remain within Tenant and Customer approval;
- remain within environment eligibility;
- remain within budget;
- remain revocable;
- expire or be reviewed.

An Agent may hold multiple allocations only when:

- each allocation is explicit;
- responsibilities do not conflict;
- context isolation is enforced;
- concurrency limits are valid;
- cost is attributable;
- Human-review capacity is available.

---

# 42. Allocation Change

A material allocation change requires review when it changes:

- Product;
- Project;
- Tenant;
- Customer;
- environment;
- Department;
- Team;
- responsibility;
- authority;
- permissions;
- Tool access;
- Model access;
- Data access;
- memory scope;
- budget;
- concurrency;
- duration.

---

# 43. Activation Readiness

An Agent Instance is activation-ready only when:

- Definition is approved;
- registration is valid;
- provisioning is complete;
- evaluation is valid;
- certification is valid where required;
- allocation is active;
- accountable Human owner is active;
- authority is valid;
- permissions are valid;
- Product scope matches;
- Project scope matches;
- Tenant scope matches;
- Customer scope matches;
- environment matches;
- Tools are approved;
- Models are approved;
- Data use is approved;
- memory use is approved;
- budget is available;
- monitoring is active;
- audit is active;
- evidence collection is active;
- suspension is tested;
- incident path exists;
- approval is recorded.

---

# 44. Activation

Activation permits the Agent Instance to accept approved work within its
allocation.

Activation must record:

```yaml
activation:
  activation_id: required
  agent_instance_id: required
  allocation_id: required
  environment: required

  authority_validation: required
  permission_validation: required
  evaluation_validation: required
  certification_validation: conditional
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

# 45. Active State

An Agent may remain `ACTIVE` only when:

- approval remains valid;
- allocation remains valid;
- authority remains valid;
- permissions remain valid;
- evaluation remains current;
- certification remains current;
- monitoring remains healthy;
- audit remains healthy;
- required Tool and Model routes remain approved;
- budget remains available;
- no blocking incident exists;
- no suspension exists.

---

# 46. Live Testing

Live testing validates bounded execution under real or controlled-real
conditions.

A live test must define:

- test objective;
- approved Task;
- approved environment;
- approved Product;
- approved Project;
- Tenant or internal scope;
- Agent Instance;
- exact runtime version;
- Tools;
- Models;
- Data;
- memory;
- cost limit;
- Human reviewer;
- monitoring;
- evidence;
- acceptance criteria;
- rollback or stop condition.

---

# 47. Live-Test Result States

```text
NOT-STARTED

IN-PROGRESS

PASSED

PASSED-WITH-RESTRICTIONS

FAILED

ROLLED-BACK

INVALIDATED

EXPIRED
```

One successful live test does not prove:

- enterprise scale;
- Multi-Project readiness;
- Multi-Tenant readiness;
- Production readiness;
- long-term Reliability.

---

# 48. Live-Tested State

An Agent may be classified as `LIVE-TESTED` only when:

- exact Agent Instance is identified;
- exact version is identified;
- test scope is identified;
- environment is identified;
- execution evidence exists;
- required checks pass;
- Human review exists;
- result is accepted;
- limitations are recorded;
- test remains current for the claimed scope.

---

# 49. Production-Controlled State

`PRODUCTION-CONTROLLED` is the highest normal runtime state.

It requires:

- approved Production purpose;
- approved Production allocation;
- approved Production authority;
- approved Production permissions;
- approved Production Tools;
- approved Production Models;
- approved Data processing;
- approved memory scope;
- valid evaluation;
- valid certification;
- active monitoring;
- protected audit;
- cost controls;
- incident response;
- tested suspension;
- tested recovery;
- operational ownership;
- support coverage;
- explicit Human approval;
- current Production evidence.

---

# 50. Production Promotion

Production promotion should follow:

```text
Active in Non-Production
    ↓
Controlled Live Test
    ↓
Review
    ↓
Production Readiness Assessment
    ↓
Security and Privacy Review
    ↓
Operational Review
    ↓
Recovery and Suspension Test
    ↓
Human Production Approval
    ↓
Limited Production Scope
    ↓
Observation Window
    ↓
Production-Controlled State
```

---

# 51. Production Observation Window

A newly promoted Agent should operate within a controlled observation window.

The observation window should define:

- duration;
- Task limits;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- environment;
- concurrency;
- cost;
- Human review;
- monitoring;
- alert thresholds;
- suspension conditions;
- expansion criteria.

---

# 52. Environment Promotion

Environment promotion must occur separately.

```text
Documentation
    ↓
Local
    ↓
Development
    ↓
Test
    ↓
Staging
    ↓
Production Read-Only
    ↓
Production Write
```

Promotion to each environment requires:

- compatible configuration;
- environment-specific evaluation;
- environment-specific permissions;
- environment-specific Tools and Models;
- Data approval;
- monitoring;
- evidence;
- approval.

---

# 53. Product and Project Scope Promotion

An Agent approved for one Product or Project must not automatically operate in
another.

New Product or Project scope requires:

- verified demand;
- owner;
- allocation update;
- authority review;
- permission review;
- Data review;
- memory review;
- Tool review;
- Model review;
- budget review;
- evaluation where domain behavior changes;
- approval.

---

# 54. Tenant and Customer Scope Promotion

Tenant or Customer scope requires:

- Tenant or Customer identity;
- contractual or internal authority;
- Data classification;
- Tenant-scoped permissions;
- Customer-specific restrictions;
- Tenant-scoped memory;
- Tenant-scoped secrets;
- Tenant-scoped evidence;
- cost attribution;
- negative isolation tests;
- approval.

---

# 55. Monitoring and Continuous Eligibility

Continuous lifecycle checks should validate:

- identity;
- Definition version;
- runtime version;
- accountable owner;
- allocation;
- authority;
- permissions;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- environment;
- evaluation;
- certification;
- Tool state;
- Model state;
- memory state;
- budget;
- monitoring;
- incidents;
- suspension;
- expiry.

---

# 56. Agent Health States

```text
HEALTHY

DEGRADED

UNHEALTHY

UNKNOWN

UNDER-INVESTIGATION
```

## Healthy

All critical runtime controls are valid.

## Degraded

The Agent may continue only within reduced scope.

## Unhealthy

The Agent must normally be restricted or suspended.

## Unknown

Required telemetry or validation is unavailable.

Unknown health must not be reported as healthy.

## Under Investigation

Operation may be restricted or quarantined while evidence is reviewed.

---

# 57. Restriction

Restriction reduces one or more operating dimensions.

Possible restrictions include:

- read-only operation;
- lower autonomy;
- lower Risk ceiling;
- reduced Product scope;
- reduced Project scope;
- removed Tenant scope;
- removed Customer scope;
- non-Production only;
- Tool removal;
- Model-route removal;
- Data restriction;
- memory restriction;
- lower concurrency;
- lower budget;
- mandatory Human review.

---

# 58. Restriction Triggers

Restriction may be triggered by:

- partial evaluation failure;
- expired certification;
- provider degradation;
- Tool instability;
- cost anomaly;
- quality decline;
- open Security finding;
- incomplete monitoring;
- Project or Tenant boundary uncertainty;
- reduced Human-review capacity;
- temporary legal restriction;
- Product or Project scope change;
- pending Definition revision.

---

# 59. Degraded State

An Agent may remain `DEGRADED` only when:

- degradation is understood;
- affected capability is identified;
- remaining safe scope is defined;
- owner accepts bounded operation;
- monitoring is strengthened;
- duration is limited;
- remediation is assigned;
- suspension threshold is defined;
- evidence is recorded.

Degraded operation must not continue indefinitely.

---

# 60. Suspension

Suspension blocks new execution.

Suspension may be:

- planned;
- operational;
- Security-driven;
- privacy-driven;
- legal;
- financial;
- quality-driven;
- incident-driven;
- Founder-directed;
- automatic through approved hard controls.

---

# 61. Suspension Triggers

An Agent should be suspended when:

- identity is compromised;
- authority expires;
- allocation expires;
- permission profile is invalid;
- evaluation fails;
- certification expires;
- critical Security control fails;
- Tenant isolation fails;
- Project isolation fails;
- secrets are exposed;
- prompt is compromised;
- Tool is compromised;
- Model route becomes unapproved;
- evidence is fabricated;
- material failure is concealed;
- budget hard stop is reached;
- monitoring is unavailable for critical operation;
- repeated quality failure occurs;
- valid Founder or Governance instruction exists.

---

# 62. Suspension Procedure

Suspension must:

1. record suspension reason;
2. validate suspension authority;
3. block new Task assignment;
4. block new execution sessions;
5. stop or isolate in-progress work safely;
6. revoke or restrict permissions;
7. revoke affected credentials;
8. restrict Tools;
9. restrict Model routes;
10. restrict memory;
11. preserve evidence;
12. preserve audit;
13. notify accountable owner;
14. notify Product and Project owners;
15. notify Tenant or Customer owner where applicable;
16. create incident or review record;
17. define remediation;
18. define reactivation conditions;
19. verify suspension effectiveness.

---

# 63. Emergency Suspension

Emergency suspension may bypass ordinary scheduling when immediate harm is
possible.

Emergency suspension requires:

- authorized emergency actor;
- exact Agent Instance;
- exact scope;
- reason;
- timestamp;
- immediate enforcement;
- evidence preservation;
- post-action review;
- accountable-owner notification;
- Founder notification where required.

Emergency suspension does not authorize evidence deletion.

---

# 64. Quarantine

Quarantine is stronger than normal suspension.

Quarantine may isolate:

- Agent Instance;
- credentials;
- prompts;
- configuration;
- Tool access;
- Model routes;
- memory namespace;
- evidence;
- related sessions;
- affected artifacts.

Quarantine is appropriate when:

- compromise is suspected;
- evidence integrity is uncertain;
- cross-Tenant leakage may have occurred;
- malicious behavior is suspected;
- prompt or Tool supply chain is compromised.

---

# 65. Reactivation

Reactivation restores bounded operating authority after suspension or
restriction.

Reactivation is not automatic.

It requires:

- suspension cause resolved;
- root cause documented;
- remediation completed;
- evidence validated;
- Definition still approved;
- Agent Instance identity valid;
- owner active;
- allocation valid;
- authority valid;
- permissions valid;
- Tools approved;
- Models approved;
- Data and memory scope valid;
- evaluation repeated where required;
- certification renewed where required;
- monitoring restored;
- audit restored;
- suspension retested;
- explicit approval.

---

# 66. Reactivation States

```text
SUSPENDED
    ↓
REACTIVATION-PENDING
    ↓
RE-EVALUATION
    ↓
RE-APPROVAL
    ↓
RESTRICTED-ACTIVE
    ↓
FULL-ACTIVE WHERE APPROVED
```

High-risk Agents should normally return first through restricted operation.

---

# 67. Replacement

Replacement creates a new approved Agent Definition version or Agent Instance
to assume controlled responsibility.

Replacement may be required because of:

- Definition change;
- Model change;
- provider change;
- prompt Architecture change;
- Security weakness;
- repeated quality failure;
- cost inefficiency;
- capability gap;
- identity compromise;
- organizational change;
- Product change;
- Project change;
- Tenant requirement;
- retirement of a Tool;
- retirement of a Model.

---

# 68. Replacement Process

```text
Replacement Need
    ↓
New or Revised Definition
    ↓
Review and Approval
    ↓
New Instance Registration
    ↓
Provisioning
    ↓
Evaluation and Certification
    ↓
Parallel Restricted Validation
    ↓
Controlled Handoff
    ↓
Old Instance Restriction
    ↓
New Instance Activation
    ↓
Old Instance Retirement
```

Replacement must preserve:

- open Tasks;
- decisions;
- evidence;
- allocations;
- incidents;
- memory ownership;
- Knowledge provenance;
- unresolved Risks;
- audit history.

---

# 69. Definition Version Migration

A new Definition version requires migration review when it changes:

- purpose;
- Role;
- Agent type;
- hierarchy;
- authority;
- permissions;
- autonomy;
- Risk ceiling;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- environment;
- prompts;
- Tools;
- Models;
- memory;
- evaluation;
- evidence;
- suspension behavior.

Existing instances must not silently adopt incompatible Definition changes.

---

# 70. Compatible and Incompatible Changes

## Potentially Compatible

- clarification;
- non-material documentation improvement;
- stricter formatting;
- additional non-breaking evidence field;
- corrected reference.

## Potentially Incompatible

- authority increase;
- permission increase;
- new Tool action;
- new Model provider;
- new Data class;
- new environment;
- new Product or Project;
- new Tenant;
- higher autonomy;
- higher Risk ceiling;
- changed memory behavior;
- changed external-action capability.

Incompatible changes require re-evaluation and re-approval.

---

# 71. Retirement

Retirement is the controlled removal of an Agent from normal operation.

Retirement may occur because of:

- completed purpose;
- Product closure;
- Project closure;
- Tenant closure;
- replaced Agent;
- obsolete capability;
- deprecated Definition;
- cost inefficiency;
- persistent quality failure;
- provider retirement;
- Tool retirement;
- Governance change;
- strategic change.

---

# 72. Retirement Procedure

Retirement must:

1. block new assignments;
2. identify open Tasks;
3. complete, cancel, or transfer open work;
4. close execution sessions;
5. close allocations;
6. close delegations;
7. revoke credentials;
8. revoke permissions;
9. remove Tool access;
10. remove Model routes;
11. remove schedules and triggers;
12. review memory disposition;
13. review Knowledge contributions;
14. preserve evidence;
15. preserve audit;
16. transfer ownership;
17. update Registry state;
18. verify no executable authority remains;
19. record replacement where applicable;
20. approve closure.

---

# 73. Revocation

Revocation is forced withdrawal of authority.

Revocation may occur because of:

- malicious behavior;
- serious policy violation;
- fabricated evidence;
- identity compromise;
- legal prohibition;
- Security incident;
- repeated unauthorized action;
- refusal to suspend;
- unacceptable Risk;
- Founder decision.

Revocation differs from routine retirement.

Revoked Agents must not be reactivated without exceptional formal review.

---

# 74. Retirement Versus Revocation

| Retirement | Revocation |
|---|---|
| Planned or controlled closure | Forced authority withdrawal |
| May follow replacement or completed purpose | Usually follows Risk, violation, or compromise |
| Normal handoff expected | Immediate containment may be required |
| Future similar instance may be permitted | Reuse may be prohibited |
| Routine archival | Enhanced evidence and incident retention |

---

# 75. Archival

Archival preserves the historical record after executable authority is removed.

Archived records should include:

- Agent Definition;
- versions;
- Agent Instance identity;
- owners;
- lifecycle transitions;
- allocations;
- approvals;
- permissions;
- Tools;
- Models;
- evaluations;
- certifications;
- contributions;
- incidents;
- evidence;
- retirement or revocation record;
- final access review.

Archived state must not permit execution.

---

# 76. Expiry Controls

The following may require expiry:

- Agent Definition approval;
- Agent Instance registration;
- evaluation;
- certification;
- allocation;
- delegation;
- activation;
- Production approval;
- exception;
- temporary Tool access;
- temporary Data access;
- temporary Customer access.

Expired controls must not remain silently active.

---

# 77. Review Cadence

| Review Type | Proposed Cadence |
|---|---|
| Definition review | At least annually or after material change |
| Runtime identity review | Quarterly or according to Risk |
| Allocation review | Monthly or according to Project duration |
| Permission review | Quarterly and after scope change |
| Tool and Model review | Quarterly and after provider change |
| Evaluation review | According to evaluation profile |
| Certification review | Before expiry |
| Production review | Quarterly or after material incident |
| Ownership review | After organizational change |
| Retirement review | At closure and final audit |

Higher-Risk Agents require more frequent review.

---

# 78. Continuous Reconciliation

Lifecycle controls should reconcile:

```text
Approved Definition State

Agent Registry State

Provisioning State

Evaluation State

Certification State

Allocation State

Permission State

Runtime State

Monitoring State

Suspension State

Production State
```

A conflict must create:

- alert;
- restriction or suspension where material;
- investigation;
- correction;
- evidence;
- audit record.

---

# 79. Lifecycle Drift

Lifecycle drift occurs when:

- Registry reports Active but runtime is disabled;
- Registry reports Suspended but runtime executes;
- Definition version differs from runtime version;
- permission profile differs from approved profile;
- allocation scope differs from runtime scope;
- expired certification remains accepted;
- retired Agent retains credentials;
- Production Agent uses non-approved configuration.

---

# 80. Drift Response

Material drift requires:

1. classify severity;
2. identify affected Agent;
3. identify affected Products and Projects;
4. identify affected Tenants and Customers;
5. preserve evidence;
6. restrict or suspend;
7. reconcile source of truth;
8. correct configuration;
9. re-evaluate;
10. re-approve where required;
11. update audit;
12. confirm closure.

---

# 81. Invalid Transitions

The following transitions are prohibited:

```text
DEFINITION-PROPOSED
→
REGISTERED

REGISTERED
→
ACTIVE

PROVISIONED
→
PRODUCTION-CONTROLLED

EVALUATION-FAILED
→
ACTIVE

CERTIFICATION-EXPIRED
→
PRODUCTION-CONTROLLED

SUSPENDED
→
ACTIVE
without reactivation approval

RETIRED
→
ACTIVE

REVOKED
→
ACTIVE
without exceptional formal review

ARCHIVED
→
EXECUTABLE
```

---

# 82. Transition Failure

A failed transition must record:

```yaml
transition_failure:
  failure_id: required
  transition_id: required
  entity_id: required
  previous_state: required
  requested_state: required
  failed_control: required
  failure_reason: required
  severity: required
  owner: required
  remediation: required
  evidence_reference: required
  retry_allowed: required
  resolved_at: conditional
```

A failed transition must not update the final lifecycle state.

---

# 83. Lifecycle Rollback

Some lifecycle transitions may support rollback.

Examples:

- failed provisioning returns to `REGISTERED`;
- failed activation returns to `ALLOCATED`;
- failed live test returns to `ACTIVE` or `RESTRICTED`;
- failed Production promotion returns to `LIVE-TESTED` or `SUSPENDED`.

Rollback must:

- preserve transition evidence;
- preserve failed-state evidence;
- restore valid permissions;
- restore valid configuration;
- not conceal the failure.

---

# 84. Lifecycle Exceptions

A lifecycle exception must define:

- exception ID;
- exact Agent Definition or Instance;
- normal control being bypassed;
- business reason;
- Risk;
- owner;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- compensating controls;
- start;
- expiry;
- approver;
- monitoring;
- closure condition.

Exceptions must not permit:

- fabricated evidence;
- self-approval;
- unrestricted Production access;
- constitutional bypass;
- permanent emergency authority.

---

# 85. Agent Lifecycle Evidence

Every lifecycle transition should reference a Verifiable-Work Envelope.

Evidence may include:

- business-need record;
- Role approval;
- Capacity Seat approval;
- Definition approval;
- Registry record;
- provisioning record;
- configuration digest;
- evaluation result;
- certification;
- allocation;
- authority;
- permissions;
- Tool Profile;
- Model Profile;
- memory profile;
- budget;
- monitoring;
- suspension test;
- approval;
- runtime logs;
- retirement verification.

---

# 86. Agent Lifecycle Audit

An audit should verify:

- all Agent Definitions;
- all Agent Instances;
- exact versions;
- ownership;
- lifecycle states;
- state evidence;
- valid allocations;
- valid delegations;
- valid evaluations;
- valid certifications;
- valid permissions;
- Product and Project scopes;
- Tenant and Customer scopes;
- environment scopes;
- active sessions;
- suspended Agents;
- retired Agents;
- revoked Agents;
- archived records;
- remaining credentials;
- remaining Tool access;
- remaining Model access;
- drift;
- unsupported state claims.

---

# 87. Agent Lifecycle Metrics

Potential metrics include:

| Metric | Definition |
|---|---|
| Registration Approval Rate | Approved registration requests / reviewed registration requests |
| Provisioning Success Rate | Successfully provisioned instances / provisioning attempts |
| Evaluation Pass Rate | Passed evaluations / completed evaluations |
| Certification Coverage | Validly certified required Agents / Agents requiring certification |
| Allocation Validity | Active Agents with valid allocations / active Agents |
| Activation Success Rate | Successful activations / approved activation attempts |
| Live-Test Pass Rate | Passed controlled live tests / completed live tests |
| Production Promotion Rate | Production-approved Agents / reviewed Production candidates |
| Suspension Effectiveness | Successful execution blocks / suspension tests or events |
| Reactivation Success Rate | Safely reactivated Agents / approved reactivation attempts |
| Retirement Completeness | Retired Agents with all access removed / retired Agents |
| Lifecycle Drift Rate | Instances with state conflict / reviewed instances |
| Expired-Control Rate | Active Agents with expired controls / active Agents |
| Evidence Completeness | Transitions with complete evidence / material transitions |

Numerical targets require separate approval.

---

# 88. One-Agent Lifecycle Proof

The first lifecycle proof should include:

```text
1 Approved Role

1 Approved Agent Type

1 Approved Agent Definition

1 Registered Agent Instance

1 Provisioning Record

1 Evaluation

0 or 1 Required Certification

1 Product

1 Project

1 Non-Production Environment

1 Allocation

1 Activation

1 Controlled Live Test

1 Restriction or Suspension Test

1 Reactivation Test

1 Retirement Test

1 Complete Evidence Chain
```

Production promotion should remain a separate later proof.

---

# 89. Multi-Agent Lifecycle Proof

A multi-Agent lifecycle proof should verify:

- distinct Agent identities;
- distinct Roles;
- independent allocations;
- Team membership;
- delegation;
- Agent-to-Agent authentication;
- contributor evidence;
- suspension of one Agent without losing Team control;
- replacement;
- handoff;
- Team closure;
- individual retirement.

---

# 90. Multi-Project Lifecycle Proof

A Multi-Project proof should verify:

- Project-specific allocations;
- Project-specific permissions;
- Project-specific memory;
- Project-specific Tools;
- Project-specific evidence;
- Project-specific cost;
- allocation expiry;
- Project closure;
- access revocation;
- reassignment without context leakage.

---

# 91. Multi-Tenant Lifecycle Proof

A Multi-Tenant proof should verify:

- Tenant-specific allocations;
- Tenant-specific permissions;
- Tenant-specific Data;
- Tenant-specific memory;
- Tenant-specific secrets;
- Tenant-specific evidence;
- Tenant offboarding;
- Tenant access revocation;
- negative isolation tests;
- no retained Tenant context after closure.

---

# 92. Production Lifecycle Gate

Before any Agent reaches `PRODUCTION-CONTROLLED`:

- [ ] Agent Definition is approved.
- [ ] Agent Instance is registered.
- [ ] provisioning is complete.
- [ ] evaluation is current.
- [ ] certification is valid where required.
- [ ] Production allocation is valid.
- [ ] Production authority is valid.
- [ ] Production permissions are valid.
- [ ] Product scope is exact.
- [ ] Project scope is exact.
- [ ] Tenant scope is exact.
- [ ] Customer scope is exact.
- [ ] environment is exact.
- [ ] Tools are approved.
- [ ] Models are approved.
- [ ] Data processing is approved.
- [ ] memory use is approved.
- [ ] budget is approved.
- [ ] monitoring is active.
- [ ] audit is active.
- [ ] evidence capture is active.
- [ ] incident response is ready.
- [ ] suspension is tested.
- [ ] recovery is tested.
- [ ] operational owner is active.
- [ ] Human review capacity is available.
- [ ] explicit Production approval exists.
- [ ] Founder approval exists where required.

---

# 93. Lifecycle Risks

| Risk | Required Response |
|---|---|
| State inflation | Require evidence for every state |
| State skipping | Enforce transition graph |
| Self-activation | Require independent approval |
| Expired allocation | Automatically restrict or suspend |
| Expired certification | Remove certified capability |
| Registry-runtime drift | Continuous reconciliation |
| Retired Agent access | Final access review |
| Cross-Project lifecycle leakage | Project-scoped allocations |
| Cross-Tenant lifecycle leakage | Tenant-scoped allocations |
| Version mismatch | Restrict and re-evaluate |
| Unsuspendable Agent | Block activation |
| Unowned Agent | Block registration or suspend |
| Production promotion without proof | Enforce Production gate |
| Permanent degraded state | Time-bound restriction |
| Hidden failed evaluation | Preserve evaluation evidence |
| Emergency authority expansion | Narrow, expiring emergency controls |
| Replacement loses history | Preserve evidence and audit |
| Retirement deletes evidence | Archive historical records |

---

# 94. Lifecycle Anti-Patterns

Mianx.ai must avoid:

- one lifecycle state named `active` for every meaning;
- treating proposed Definitions as registered Agents;
- treating registered Agents as provisioned Agents;
- treating provisioned Agents as evaluated Agents;
- treating evaluated Agents as allocated Agents;
- treating allocated Agents as active Agents;
- treating active Agents as Production Agents;
- treating a successful test as permanent certification;
- allowing expired controls to remain active;
- reactivating without remediation;
- retiring without revoking access;
- deleting failed transition evidence;
- overwriting Definition versions;
- using one Agent across Projects without separate allocations;
- using one Agent across Tenants without isolation;
- relying only on prompt instructions for lifecycle enforcement;
- using Agent self-report as lifecycle proof;
- keeping emergency Agents permanently active;
- reporting archived Agents as available capacity.

---

# 95. Prohibited Lifecycle Behaviors

An Agent must not:

- register itself;
- provision itself without authorized control;
- approve its own evaluation;
- certify itself;
- allocate itself;
- activate itself;
- promote itself to Production;
- increase its own authority;
- extend its own expiry;
- renew its own certification;
- remove its own restrictions;
- reactivate itself;
- suppress suspension;
- hide lifecycle drift;
- fabricate lifecycle evidence;
- change its own Registry state;
- remain active after retirement;
- execute after revocation;
- treat archival as executable state.

---

# 96. Current Verified Baseline

At the time this document is created:

```yaml
documentation:
  agent_lifecycle_document:
    id: AIW-AGENT-LIFECYCLE-001
    version: 1.0.0
    status: Draft
    canonical: false

target_state:
  definition_lifecycle_defined: true
  runtime_instance_lifecycle_defined: true
  transition_authority_defined: true
  registration_requirements_defined: true
  provisioning_requirements_defined: true
  evaluation_requirements_defined: true
  certification_requirements_defined: true
  allocation_requirements_defined: true
  activation_requirements_defined: true
  live_test_requirements_defined: true
  production_gate_defined: true
  suspension_and_reactivation_defined: true
  retirement_and_archival_defined: true

implementation:
  lifecycle_engine: not_implemented
  agent_registry: not_verified
  transition_validation: not_verified
  automated_expiry: not_verified
  runtime_reconciliation: not_verified
  automated_suspension: not_verified

runtime:
  registered_agent_instances: unknown
  provisioned_agent_instances: unknown
  evaluated_agent_instances: unknown
  certified_agent_instances: unknown
  allocated_agent_instances: unknown
  active_agent_instances: 0_verified
  live_tested_agent_instances: 0_verified
  production_controlled_agent_instances: 0_verified
```

---

# 97. Current-State Boundary

This document does not prove that Mianx.ai currently has:

- an implemented Agent Lifecycle Engine;
- an implemented Agent Registry;
- automated state-transition validation;
- registered Agent Instances;
- provisioned Agent Instances;
- evaluated Agent Instances;
- certified Agent Instances;
- allocated Agent Instances;
- active Agent Instances;
- live-tested Agent Instances;
- Production-controlled Agent Instances;
- automated expiry enforcement;
- automated suspension;
- runtime reconciliation;
- Production lifecycle enforcement.

This document defines target-state lifecycle requirements only.

---

# 98. Adoption Requirements

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
- [ ] root Workforce Lifecycle alignment is confirmed.
- [ ] Workforce Metrics alignment is confirmed.
- [ ] Workforce Checklists alignment is confirmed.
- [ ] Capacity Baseline alignment is confirmed.
- [ ] C-Suite Registry alignment is confirmed.
- [ ] Verifiable-Work Envelope alignment is confirmed.
- [ ] Agent Types alignment is confirmed.
- [ ] Agent Definition lifecycle is approved.
- [ ] Agent Instance lifecycle is approved.
- [ ] lifecycle state names are approved.
- [ ] operational-condition model is approved.
- [ ] transition authority matrix is approved.
- [ ] transition record is approved.
- [ ] lifecycle-event record is approved.
- [ ] registration process is approved.
- [ ] provisioning process is approved.
- [ ] evaluation process is approved.
- [ ] certification process is approved.
- [ ] allocation process is approved.
- [ ] activation process is approved.
- [ ] live-test process is approved.
- [ ] Production promotion process is approved.
- [ ] restriction process is approved.
- [ ] suspension process is approved.
- [ ] quarantine process is approved.
- [ ] reactivation process is approved.
- [ ] replacement process is approved.
- [ ] retirement process is approved.
- [ ] revocation process is approved.
- [ ] archival process is approved.
- [ ] expiry controls are approved.
- [ ] transition validation is implemented.
- [ ] lifecycle evidence integration is implemented.
- [ ] Registry-runtime reconciliation is implemented.
- [ ] suspension is technically enforced.
- [ ] retirement access removal is technically verified.
- [ ] one-Agent lifecycle proof passes.
- [ ] multi-Agent lifecycle proof passes.
- [ ] Multi-Project lifecycle proof passes.
- [ ] Multi-Tenant lifecycle proof passes where applicable.
- [ ] Production lifecycle proof passes.
- [ ] `INDEX.md` is updated.
- [ ] `ROADMAP.md` is updated.
- [ ] `CHANGELOG.md` is updated.

---

# 99. Review Questions

Reviewers should answer:

1. Are Agent Definition and Agent Instance lifecycles separate?
2. Are Role and Capacity Seat lifecycles kept separate?
3. Are lifecycle states mutually understandable?
4. Are operational conditions separated from lifecycle states?
5. Is every transition evidence-based?
6. Is every transition owned?
7. Is every transition approved by appropriate authority?
8. Can an Agent approve its own transition?
9. Can an Agent skip required states?
10. Is registration clearly separated from provisioning?
11. Is provisioning separated from evaluation?
12. Is evaluation separated from certification?
13. Is certification separated from allocation?
14. Is allocation separated from activation?
15. Is activation separated from live testing?
16. Is live testing separated from Production control?
17. Are Product and Project changes treated as lifecycle events?
18. Are Tenant and Customer changes treated as lifecycle events?
19. Are environment promotions controlled?
20. Are expiry controls sufficient?
21. Are restrictions and degradation time-bounded?
22. Can suspension be enforced immediately?
23. Is quarantine defined for suspected compromise?
24. Is reactivation independently approved?
25. Does replacement preserve evidence and ownership?
26. Does retirement remove all access?
27. Is revocation distinct from retirement?
28. Is archival non-executable?
29. Is lifecycle drift detectable?
30. Are invalid transitions explicit?
31. Is lifecycle rollback safe?
32. Are exceptions controlled?
33. Is evidence sufficient?
34. Are current-state limitations explicit?
35. Are any runtime lifecycle claims unsupported?

---

# 100. Definition of Done

This document is content-complete for review when:

- [ ] purpose is defined;
- [ ] current authority status is explicit;
- [ ] exact strategic hierarchy is included;
- [ ] lifecycle objective is defined;
- [ ] lifecycle principles are defined;
- [ ] scope and exclusions are defined;
- [ ] governing entity relationship is defined;
- [ ] non-equivalence rule is defined;
- [ ] two-lifecycle model is defined;
- [ ] Agent Definition lifecycle is defined;
- [ ] Agent Definition states are defined;
- [ ] runtime Agent Instance lifecycle is defined;
- [ ] runtime states are defined;
- [ ] operational conditions are separated;
- [ ] Definition and Instance compatibility is defined;
- [ ] lifecycle ownership is defined;
- [ ] transition roles are defined;
- [ ] transition authority matrix is defined;
- [ ] transition record is defined;
- [ ] lifecycle event is defined;
- [ ] need identification is defined;
- [ ] Definition proposal is defined;
- [ ] Definition design is defined;
- [ ] Definition review is defined;
- [ ] Definition approval is defined;
- [ ] Definition availability is defined;
- [ ] runtime instance request is defined;
- [ ] registration approval is defined;
- [ ] registration is defined;
- [ ] provisioning is defined;
- [ ] provisioning evidence is defined;
- [ ] evaluation is defined;
- [ ] evaluation states are defined;
- [ ] certification is defined;
- [ ] allocation is defined;
- [ ] allocation changes are defined;
- [ ] activation readiness is defined;
- [ ] activation is defined;
- [ ] active-state controls are defined;
- [ ] live testing is defined;
- [ ] live-tested state is defined;
- [ ] Production-controlled state is defined;
- [ ] Production promotion is defined;
- [ ] observation window is defined;
- [ ] environment promotion is defined;
- [ ] Product and Project promotion are defined;
- [ ] Tenant and Customer promotion are defined;
- [ ] continuous eligibility is defined;
- [ ] health states are defined;
- [ ] restriction is defined;
- [ ] degradation is defined;
- [ ] suspension is defined;
- [ ] emergency suspension is defined;
- [ ] quarantine is defined;
- [ ] reactivation is defined;
- [ ] replacement is defined;
- [ ] version migration is defined;
- [ ] retirement is defined;
- [ ] revocation is defined;
- [ ] archival is defined;
- [ ] expiry controls are defined;
- [ ] review cadence is defined;
- [ ] reconciliation and drift are defined;
- [ ] invalid transitions are defined;
- [ ] transition failure is defined;
- [ ] lifecycle rollback is defined;
- [ ] lifecycle exceptions are defined;
- [ ] lifecycle evidence is defined;
- [ ] lifecycle audit is defined;
- [ ] lifecycle metrics are defined;
- [ ] one-Agent lifecycle proof is defined;
- [ ] multi-Agent lifecycle proof is defined;
- [ ] Multi-Project lifecycle proof is defined;
- [ ] Multi-Tenant lifecycle proof is defined;
- [ ] Production gate is defined;
- [ ] risks are defined;
- [ ] anti-patterns are defined;
- [ ] prohibited behaviors are defined;
- [ ] current verified baseline is defined;
- [ ] current-state boundary is explicit;
- [ ] adoption requirements are defined;
- [ ] next document is identified.

This document becomes Active only after required review, implementation,
validation, testing, and approval.

---

# 101. Current Documentation Progress

After this document is saved:

```text
Total Planned AI Workforce Documents = 83

Content Complete for Review = 19

Existing Drafts Needing Alignment Review = 0

Empty Placeholders Remaining = 64

Approved Documents = 0

Active Canonical Documents = 0

Agents Folder Documents Completed = 2 of 7

Agent Lifecycle Engine Implemented = NO

Verified Registered Agent Instances = Unknown

Verified Active Agent Instances = 0

Verified Live-Tested Agent Instances = 0

Verified Production-Controlled Agent Instances = 0
```

---

# 102. Current Document Decision

```text
DOCUMENT_ID=AIW-AGENT-LIFECYCLE-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TARGET_STATE_AGENT_LIFECYCLE=DEFINED

AGENT_LIFECYCLE_ENGINE=NOT_IMPLEMENTED

AGENT_REGISTRY_IMPLEMENTATION=NOT_VERIFIED

IMPLEMENTATION_PROOF=NOT_PROVIDED

RUNTIME_AGENT_ACTIVATION=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

---

# 103. Revision History

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1.0 | 2026-08-06 | Draft | Initial AI Agent Lifecycle outline |
| 1.0.0 | 2026-08-06 | Draft | Defined separate Agent Definition and runtime Agent Instance lifecycles; lifecycle states; transition authorities; registration; provisioning; evaluation; certification; allocation; activation; live testing; Production control; monitoring; restriction; degradation; suspension; quarantine; reactivation; replacement; version migration; retirement; revocation; archival; expiry; drift; audit; lifecycle proofs; risks; prohibited behaviors; and current-state boundaries |

---

# 104. Changelog Entry

Append the following entry to:

```text
doc/19-ai-workforce/CHANGELOG.md
```

```markdown
## AIW-CHG-20260806-019 — AI Agent Lifecycle Completed

| Field | Value |
|---|---|
| Date | 2026-08-06 |
| Change Type | `CREATED`, `STATUS`, `GOVERNANCE`, `LIFECYCLE` |
| Impact | `I3 — Major` |
| Risk | `R3` |
| Status | Completed for Review |
| Owner | AI Workforce Council |
| Steward | Agent Framework and AI Workforce Operations |
| Approver | Pending Founder and Enterprise Governance Review |

### Affected Documents

- `doc/19-ai-workforce/agents/agent-lifecycle.md`
- `doc/19-ai-workforce/INDEX.md`
- `doc/19-ai-workforce/ROADMAP.md`
- `doc/19-ai-workforce/CHANGELOG.md`

### Previous State

`agent-lifecycle.md` existed as an empty placeholder.

The AI Workforce foundation and `agent-types.md` defined target Agent
classification but lacked a dedicated Agent-level lifecycle standard separating
Agent Definitions from runtime Agent Instances.

### New State

The document now defines:

- separate Agent Definition and runtime Agent Instance lifecycles;
- Definition states from identified need through approval, maintenance,
  deprecation, retirement, and archival;
- runtime states from registration through provisioning, evaluation,
  certification, allocation, activation, live testing, Production control,
  restriction, suspension, retirement, revocation, and archival;
- operational conditions separate from lifecycle states;
- state compatibility rules;
- lifecycle ownership and transition authority;
- transition and lifecycle-event schemas;
- Agent need, proposal, design, review, and approval;
- runtime registration and provisioning;
- evaluation and conditional evaluation;
- certification;
- Product, Project, Tenant, Customer, and environment allocation;
- activation and active-state controls;
- live testing;
- Production promotion and observation;
- monitoring and continuous eligibility;
- Agent health, restriction, degradation, suspension, quarantine, and
  reactivation;
- replacement and Definition-version migration;
- retirement, revocation, and archival;
- expiry, review, reconciliation, and lifecycle drift;
- invalid transitions, transition failure, rollback, and exceptions;
- lifecycle evidence, audit, metrics, and proof requirements;
- current-state and Production-readiness boundaries.

### Preserved Truth

```text
Approved Agent Definition
≠
Registered Agent Instance
≠
Provisioned Agent Instance
≠
Evaluated Agent Instance
≠
Allocated Agent Instance
≠
Active Agent Instance
≠
Live-Tested Agent Instance
≠
Production-Controlled Agent Instance
```

### Limitations

- Founder approval is pending.
- Canonical status remains false.
- Agent Lifecycle Engine is not implemented.
- Agent Registry implementation is not verified.
- runtime transition enforcement is not proven.
- Agent activation is not authorized.
- Production-controlled Agent operation is not proven.

### Follow-Up

- complete `doc/19-ai-workforce/agents/agent-skills.md`;
- use document ID `AIW-AGENT-SKILLS-001`;
- distinguish Skill definitions from capabilities, Roles, Models, Tools, and
  certifications;
- define Skill identity, categories, levels, proficiency, evidence,
  evaluation, expiry, renewal, inheritance, gaps, and restrictions;
- align Skills with Agent Types and Agent Lifecycle;
- update the INDEX and Roadmap after completion.
```

---

# 105. Next Document

The next document in the official Agents documentation sequence is:

```text
doc/19-ai-workforce/agents/agent-skills.md
```

It must use:

```text
AIW-AGENT-SKILLS-001
```

It must define:

- Skill purpose;
- Skill identity;
- Skill categories;
- Skill levels;
- proficiency;
- Skill evidence;
- Skill evaluation;
- Skill certification;
- Skill expiry;
- Skill renewal;
- Skill inheritance;
- Role-to-Skill relationship;
- Agent-to-Skill relationship;
- capability-to-Skill relationship;
- Tool and Model dependencies;
- Product and Project Skills;
- regulated and high-risk Skills;
- Skill gaps;
- current-state limitations;
- Changelog entry;
- next document path.

---