 ---
id: AIW-CAPACITY-001
title: Mianx.ai AI Workforce Capacity Baseline
version: 1.1.0
status: Draft

type: Enterprise AI Workforce Capacity Planning and Reporting Standard
class: Governed

owner: AI Workforce Council
steward: AI Workforce Operations
authority: Founder and AI CEO

maintainers:
  - AI Workforce Operations
  - Enterprise Governance
  - Enterprise Architecture
  - Enterprise Analytics
  - AI Operating System Team
  - Capability Governance
  - Product Operations
  - Project and Portfolio Operations
  - Security Governance
  - Data and Privacy Governance
  - Enterprise Quality
  - Finance Governance
  - Human Resources Governance
  - Platform Operations
  - Documentation Governance

reviewers:
  - Founder
  - AI CEO
  - Chief Technology Officer
  - Chief Operating Officer
  - Chief Financial Officer
  - Chief Human Resources Officer
  - Chief Product Officer
  - Chief Information Security Officer
  - Chief Data Officer
  - Chief Legal Officer
  - Enterprise Governance
  - Enterprise Architecture
  - Enterprise Analytics
  - AI Operating System Owner
  - AI Workforce Operations
  - Product Operations
  - Project and Portfolio Operations
  - Capability Governance
  - Security Governance
  - Data and Privacy Governance
  - Enterprise Quality
  - Finance Governance
  - Platform Operations
  - Documentation Governance

created: 2026-07-18
updated: 2026-08-06

classification: Internal

audience:
  - Founder
  - Executive Leadership
  - AI Workforce Council
  - Department Directors
  - Product Owners
  - Project Owners
  - Program Managers
  - Team Leads
  - Enterprise Architects
  - AI Platform Engineers
  - Finance Teams
  - Human Resources Teams
  - Security Teams
  - Data and Analytics Teams
  - Quality Teams
  - Operations Teams
  - Documentation Maintainers
  - Auditors
  - AI Agents

depends_on:
  - ./README.md
  - ./INDEX.md
  - ./ROADMAP.md
  - ./CHANGELOG.md
  - ./workforce-vision.md
  - ./workforce-strategy.md
  - ./workforce-operating-model.md
  - ./workforce-architecture.md
  - ./workforce-governance.md
  - ./workforce-security.md
  - ./workforce-capabilities.md
  - ./workforce-lifecycle.md
  - ./workforce-metrics.md
  - ./workforce-checklists.md
  - ../01-governance/AI-CONSTITUTION.md
  - ../01-governance/ENTERPRISE-PRINCIPLES.md
  - ../02-company/VISION-AND-MISSION.md
  - ../20-ai-operating-system/MASTER-BLUEPRINT.md
  - ../20-ai-operating-system/MULTI-PROJECT-OPERATING-MODEL.md
  - ../31-enterprise-architecture/CORE-ARCHITECTURE.md
  - ../CURRENT-STATE.md
  - ../DOCUMENT-STATUS-REGISTRY.md
  - ../CANONICAL-DOCUMENT-MAP.md

related_documents:
  - ./C-SUITE-AGENT-REGISTRY.md
  - ./VERIFIABLE-WORK-ENVELOPE.md
  - ./organization/organization-structure.md
  - ./organization/department-structure.md
  - ./organization/org-chart.md
  - ./organization/reporting-hierarchy.md
  - ./organization/responsibility-matrix.md
  - ./organization/escalation-matrix.md
  - ./leadership/leadership-model.md
  - ./leadership/executive-team.md
  - ./roles/role-catalog.md
  - ./roles/job-descriptions.md
  - ./roles/skill-matrix.md
  - ./agents/agent-types.md
  - ./agents/agent-lifecycle.md
  - ./agents/agent-performance.md
  - ./capabilities/capability-registry.md
  - ./capabilities/skill-registry.md
  - ./capabilities/tool-registry.md
  - ./capabilities/model-registry.md
  - ./teams/team-structure.md
  - ./teams/team-governance.md
  - ./orchestration/orchestration-model.md
  - ./workflows/workflow-engine.md
  - ./workflows/task-assignment.md
  - ./workflows/task-routing.md
  - ./workflows/approval-flow.md
  - ./shared-memory/shared-memory.md
  - ./training/evaluation.md
  - ./training/certification.md
  - ./kpis/agent-kpis.md
  - ./kpis/team-kpis.md
  - ./kpis/department-kpis.md
  - ./kpis/enterprise-kpis.md
  - ./playbooks/onboarding.md
  - ./playbooks/task-execution.md
  - ./playbooks/incident-response.md
  - ./playbooks/offboarding.md
  - ../20-ai-operating-system/README.md
  - ../21-memory-engine/README.md
  - ../22-agent-framework/README.md
  - ../23-multi-agent-system/README.md
  - ../27-model-management/README.md
  - ../29-observability-platform/README.md
  - ../41-security-platform/README.md
  - ../42-data-platform/README.md
  - ../44-enterprise-ai/AI-GOVERNANCE.md
  - ../../execution/EXECUTION-BOARD.md

review_cycle:
  - Monthly During Documentation and Implementation
  - Quarterly During Controlled Operation
  - Annually After Stable Production Operation
  - After AI Constitution Change
  - After Material Workforce Strategy Change
  - After Material Organization Change
  - After Material Agent Lifecycle Change
  - After Material Capacity Model Change
  - Before New Project Onboarding
  - Before New Tenant Onboarding
  - Before Department Activation
  - Before Major Agent Capacity Expansion
  - Before Production AI Workforce Activation
  - After Critical AI, Security, Privacy, Quality, Cost, or Operational Incident
  - Before Canonical Promotion

alignment:
  source_version: 1.0.0
  source_date: 2026-07-18
  alignment_version: 1.1.0
  alignment_date: 2026-08-06
  alignment_status: Content Complete for Review
  duplicate_created: false
  original_document_id_preserved: true

capacity_horizon:
  current: Documentation Baseline and Unverified Runtime Capacity
  near_term: Governed One-Agent Capacity Proof
  medium_term: Team, Department, and Multi-Project Capacity
  long_term: Production-Controlled Multi-Product Enterprise Capacity

canonical: false
---

# Mianx.ai AI Workforce Capacity Baseline

> **This document establishes the controlled counting model, verified planning
> baseline, capacity dimensions, departmental allocation, demand and
> concurrency rules, Product and Project allocation controls, runtime reporting
> requirements, cost boundaries, evidence requirements, and approval process
> for the Mianx.ai AI Workforce.**

---

# 1. Document Purpose

This document defines the governed capacity baseline for the Mianx.ai AI
Workforce.

It resolves and controls different Workforce numbers found across historical
planning material, repository documentation, organizational designs, and
runtime-oriented specifications.

It defines:

- what every Workforce count means;
- which counts are repository-verified;
- which counts are arithmetic planning totals;
- which counts remain historical claims;
- which counts require runtime evidence;
- how Role Documents differ from Capacity Seats;
- how Capacity Seats differ from Agent identities;
- how registered Agents differ from provisioned Agents;
- how provisioned Agents differ from allocated Agents;
- how allocated Agents differ from active Agents;
- how active Agents differ from live-tested Agents;
- how live-tested Agents differ from Production-controlled Agents;
- how Agent identity differs from a runtime worker;
- how runtime concurrency differs from organizational capacity;
- how queued work affects required capacity;
- how Tool, Model, Human-review, operational, and budget capacity constrain
  execution;
- how shared Workforce capacity is allocated across Products and Projects;
- how capacity is forecast, increased, reduced, reserved, suspended, and
  retired;
- which evidence is required before publishing any Workforce count;
- which approvals are required before capacity claims become canonical.

This document is a planning, counting, and reporting authority.

It does not independently:

- create Role Documents;
- approve Capacity Seats;
- register Agents;
- provision Agents;
- allocate Agents;
- activate Agents;
- create runtime workers;
- authorize provider spending;
- authorize Production access;
- prove concurrency;
- prove runtime health;
- prove Production Workforce capacity.

---

# 2. Alignment Purpose

This version aligns the existing substantive `AGENT-CAPACITY-BASELINE.md`
document with the completed AI Workforce foundation.

The alignment preserves:

- document ID `AIW-CAPACITY-001`;
- original creation date;
- original ownership;
- original count-reconciliation purpose;
- verified Role Document count;
- historical `258+` statement classification;
- arithmetic `445` department-seat total;
- twenty-department planning model;
- separation of organizational and runtime capacity;
- project-pod and elastic-specialist concepts;
- priority classes;
- concurrency formula;
- capacity risks;
- approval requirements.

The alignment corrects or strengthens:

- repository paths from `docs/` to `doc/`;
- Role Slot terminology through the governed term `Capacity Seat`;
- Agent lifecycle terminology;
- Product, Project, Tenant, Customer, and environment scope;
- runtime evidence requirements;
- Human-review capacity;
- Tool and Model-provider capacity;
- operational-support capacity;
- budget capacity;
- Security and privacy boundaries;
- current-state reporting;
- unsupported target and activation claims;
- ownership boundaries with the C-Suite Agent Registry;
- consistency with Workforce Governance, Security, Capabilities, Lifecycle,
  Metrics, and Checklists.

This version does not create a second capacity authority.

---

# 3. Current Authority Status

This document currently has the following state:

```text
DOCUMENT_ID=AIW-CAPACITY-001

DOCUMENT_VERSION=1.1.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

ALIGNMENT_STATUS=ALIGNED_DRAFT

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

AI_CEO_APPROVAL=PENDING

CAPACITY_MODEL_APPROVAL=PENDING

RUNTIME_REGISTRY_IMPLEMENTATION=NOT_VERIFIED

RUNTIME_CAPACITY=UNKNOWN

ACTIVE_AGENT_COUNT=UNKNOWN

PRODUCTION_CAPACITY=NOT_PROVEN
```

Therefore:

- no planning count in this document is automatically approved;
- no Agent is activated by this document;
- no Capacity Seat is funded by this document;
- no provider spending is authorized by this document;
- no runtime concurrency is proven by this document;
- no Production capacity is proven by this document;
- runtime Agent counts must come from verified runtime records;
- documentation counts must not be reported as active-Agent counts;
- arithmetic planning totals must not be reported as runtime totals;
- Founder and required executive approval remain pending.

Current implementation and operational truth remains governed by:

- [`CURRENT-STATE.md`](../CURRENT-STATE.md)
- [`DOCUMENT-STATUS-REGISTRY.md`](../DOCUMENT-STATUS-REGISTRY.md)
- [`EXECUTION-BOARD.md`](../../execution/EXECUTION-BOARD.md)

---

# 4. Capacity Objective

The primary capacity objective is to ensure that Mianx.ai has enough governed
capability to perform approved work without:

- inflating Workforce counts;
- confusing planning with operation;
- exceeding budgets;
- weakening Security;
- violating Product or Project boundaries;
- mixing Tenant or Customer context;
- exhausting Human-review capacity;
- overloading providers or Tools;
- creating uncontrolled concurrency;
- hiding queue saturation;
- activating unverified Agents;
- reporting unsupported enterprise scale.

The controlled capacity flow is:

```text
Verified Business Demand
        ↓
Approved Product and Project Scope
        ↓
Required Role and Capability Analysis
        ↓
Capacity Seat Planning
        ↓
Registered and Evaluated Agent Availability
        ↓
Tool, Model, Human Review, Operations, and Budget Checks
        ↓
Approved Allocation
        ↓
Controlled Runtime Execution
        ↓
Monitoring, Evidence, Cost, and Outcome Measurement
        ↓
Scale, Restrict, Suspend, Reallocate, or Retire
```

---

# 5. Capacity Principles

## 5.1 Count Only What the Evidence Proves

Every published count must identify:

- definition;
- source;
- scope;
- period;
- environment;
- lifecycle states included;
- evidence quality;
- owner;
- limitations.

---

## 5.2 Role Documents Are Not Agents

A document describing a Role does not prove an Agent identity or runtime
capability.

---

## 5.3 Capacity Seats Are Not Agents

An approved Capacity Seat represents planned organizational demand.

It does not prove:

- registration;
- provisioning;
- allocation;
- activation;
- execution;
- Production readiness.

---

## 5.4 Agent Identity Is Not Runtime Concurrency

One Agent may process:

- no work;
- one Task;
- multiple permitted sessions;
- multiple bounded workers where policy permits.

Worker count must remain separate from Agent count.

---

## 5.5 Active Does Not Mean Production-Controlled

An Agent may be active in:

- Development;
- Test;
- Staging;
- bounded internal operation.

Production-controlled status requires additional evidence and approval.

---

## 5.6 Shared Capacity Must Preserve Isolation

Shared Workforce capacity must preserve:

- Product isolation;
- Project isolation;
- Tenant isolation;
- Customer confidentiality;
- environment separation;
- memory separation;
- secret separation;
- evidence attribution;
- cost attribution.

---

## 5.7 Capacity Must Include Human Constraints

AI execution capacity is not usable when required Human review, approval,
incident response, or operational support is unavailable.

---

## 5.8 Security Before Utilization

Capacity targets must not pressure Agents or operators to bypass:

- identity;
- permissions;
- review;
- testing;
- evidence;
- isolation;
- suspension;
- recovery.

---

## 5.9 Cost Must Be Attributable

Capacity without cost attribution is not governed capacity.

---

## 5.10 Capacity Must Be Suspendable

Agents, workers, capabilities, Tools, Models, providers, Teams, Projects, and
Tenants must support appropriate capacity restriction or suspension.

---

## 5.11 Reserved Capacity Must Have a Purpose

Reserved capacity must identify:

- Risk or business need;
- owner;
- scope;
- period;
- cost;
- release condition.

---

## 5.12 Scaling Requires Evidence

Scaling must follow measured demand and verified bottlenecks.

It must not follow aspirational Agent counts alone.

---

# 6. Scope

This document governs capacity for:

- Role Documents;
- Capacity Seats;
- Agent specifications;
- registered Agents;
- provisioned Agents;
- evaluated Agents;
- certified Agents;
- allocated Agents;
- active Agents;
- live-tested Agents;
- Production-controlled Agents;
- healthy Agents;
- available Agents;
- busy Agents;
- restricted Agents;
- suspended Agents;
- retired Agents;
- runtime sessions;
- runtime workers;
- concurrent workers;
- task queues;
- Teams;
- Departments;
- capabilities;
- Tools;
- Models;
- providers;
- Human reviewers;
- operational support;
- incident response;
- budget;
- Products;
- Projects;
- Tenants;
- Customers;
- environments.

---

# 7. Exclusions

This document does not own the detailed implementation of:

- Agent Registry services;
- task queues;
- runtime schedulers;
- workflow engines;
- provider adapters;
- Tool adapters;
- observability systems;
- financial ledgers;
- Product-specific staffing plans;
- Customer contracts;
- infrastructure autoscaling;
- Human employment planning.

It defines the Workforce capacity rules those systems must support.

---

# 8. Workforce Count Problem

Historical and repository material contains multiple Workforce numbers.

| Source or Claim | Number | Controlled Interpretation | Current Reliability |
|---|---:|---|---|
| Earlier repository review | `119` | Earlier or incomplete Role or Agent-role claim | Outdated or unverified |
| Populated `doc/05-workforce/roles/` documents | `247` | Human and organizational Role Documents | Repository-verified source count |
| Master Blueprint statement | `258+` | Historical minimum AI Workforce planning statement | Planning claim |
| Twenty-department allocation | `445` | Arithmetic total of supplied Capacity Seats | Verified arithmetic planning total |
| Registered Agent Registry | Unknown | Agents with formal Registry identities | Runtime Registry not verified |
| Provisioned Agent Registry | Unknown | Agents with runtime-ready configurations | Runtime provisioning not verified |
| Allocated Agents | Unknown | Agents assigned to approved scopes | Allocation system not verified |
| Active Agents | Unknown | Enabled Agents available for approved work | Runtime evidence not verified |
| Live-tested Agents | Unknown | Agents with controlled live-test evidence | Test evidence not verified |
| Production-controlled Agents | Unknown | Agents approved for controlled Production work | Production evidence not verified |
| Concurrent workers | Unknown | Runtime execution units processing Tasks | Runtime telemetry not verified |

These numbers are not interchangeable.

---

# 9. Governing Non-Equivalence Rule

The following distinction is mandatory:

```text
Role Document
≠
Capacity Seat
≠
Agent Specification
≠
Registered Agent
≠
Provisioned Agent
≠
Allocated Agent
≠
Active Agent
≠
Live-Tested Agent
≠
Production-Controlled Agent
≠
Agent Session
≠
Concurrent Worker
≠
Task
≠
Model Invocation
```

Every report must state exactly which category it measures.

---

# 10. Verified Repository Evidence

The source documentation includes substantive structures under:

```text
doc/05-workforce/
doc/19-ai-workforce/
doc/20-ai-operating-system/
doc/22-agent-framework/
doc/23-multi-agent-system/
```

These paths establish intended organizational and system design.

They do not independently prove:

- deployed services;
- Agent identities;
- active configurations;
- valid credentials;
- active permissions;
- runtime health;
- Product allocations;
- Project allocations;
- Tenant access;
- concurrent execution;
- Production operation.

---

# 11. Verified Role Document Baseline

The source baseline identified the following populated Role Document counts
under:

```text
doc/05-workforce/roles/
```

| Role Category | Populated Role Documents |
|---|---:|
| Design | 14 |
| Engineering | 77 |
| Executive | 10 |
| Finance | 22 |
| Human Resources | 20 |
| Information Technology | 33 |
| Legal | 24 |
| Marketing | 18 |
| Product | 10 |
| Sales | 19 |
| **Total** | **247** |

The controlled interpretation is:

```yaml
metric_name: Populated Role Documents
value: 247
source_scope: doc/05-workforce/roles/
runtime_agent_count: false
production_capacity: false
```

The value `247` does not prove:

- 247 Agent identities;
- 247 approved Capacity Seats;
- 247 provisioned Agents;
- 247 active Agents;
- 247 healthy Agents;
- 247 concurrent workers;
- 247 Production-controlled Agents.

---

# 12. Historical `119` Count

The earlier `119` count is classified as:

```yaml
metric_name: Earlier Role or Agent-Role Claim
value: 119
classification: Historical and Unverified
approved_current_baseline: false
runtime_verified: false
```

It must not be used in current Workforce reporting unless:

- the original source is recovered;
- the exact definition is identified;
- the scope is identified;
- the count is reproduced;
- the relevant owner approves its use.

---

# 13. Historical `258+` Statement

The Master Blueprint includes the historical statement:

```text
258+ AI Agents
```

Until formally resolved, it is classified as:

```yaml
metric_name: Historical Minimum AI Workforce Statement
value: 258+
classification: Planning Claim
runtime_verified: false
canonical_capacity_value: false
```

The `258+` statement may have represented:

- an earlier Workforce phase;
- a minimum target;
- a partial department model;
- a subset of a broader target;
- a historical estimate;
- planned Role capacity rather than Agent identity.

It must not be reported as:

- current registered Agents;
- current provisioned Agents;
- current active Agents;
- current healthy Agents;
- current Production Agents;
- current concurrent workers.

Founder approval is required to:

- retain it as a strategic target;
- redefine it;
- supersede it;
- retire it.

---

# 14. Twenty-Department Capacity Baseline

The supplied department allocation contains twenty departments.

| # | Department | Supplied Capacity Seats | Department Lead | Reports To |
|---:|---|---:|---|---|
| 1 | Leadership | 11 | AI CEO | Founder |
| 2 | Engineering | 78 | VP Engineering | CTO |
| 3 | DevOps | 24 | DevOps Director | CTO |
| 4 | Security | 25 | CISO | AI CEO |
| 5 | Infrastructure | 34 | Infrastructure Director | CTO |
| 6 | Data and AI | 31 | Chief Data Officer | CTO |
| 7 | Product | 11 | CPO | AI CEO |
| 8 | Design | 15 | Design Director | CPO |
| 9 | Marketing | 19 | CMO | AI CEO |
| 10 | SEO | 14 | SEO Director | CMO |
| 11 | Sales | 20 | CSO | AI CEO |
| 12 | Finance | 23 | CFO | AI CEO |
| 13 | Human Resources | 21 | CHRO | AI CEO |
| 14 | Legal | 25 | CLO | AI CEO |
| 15 | Operations | 16 | COO | AI CEO |
| 16 | Support | 18 | Support Director | COO |
| 17 | Customer Success | 14 | Customer Success Director | COO |
| 18 | Research | 12 | Chief Scientist | CTO |
| 19 | Quality Assurance | 18 | QA Director | CTO |
| 20 | Analytics | 16 | Analytics Director | Chief Data Officer |
|  | **Arithmetic Total** | **445** |  |  |

The verified arithmetic result is:

```text
445 planned Capacity Seats
```

---

# 15. Controlled Interpretation of `445`

The `445` total represents:

- an organizational planning model;
- department-level capacity demand;
- a possible long-term Seat portfolio;
- a basis for Role and capability analysis.

It does not represent:

- approved active organizational capacity;
- approved budget;
- registered Agent count;
- provisioned Agent count;
- allocated Agent count;
- active Agent count;
- Production-controlled Agent count;
- concurrent-worker count.

The current controlled state is:

```yaml
planned_department_capacity_seats:
  value: 445
  arithmetic_verified: true
  organizational_model_approved: false
  budget_approved: false
  agent_registry_verified: false
  runtime_verified: false
  canonical: false
```

---

# 16. Capacity Seat Terminology

The earlier document used the term `Role Slot`.

The governed term is now:

```text
Capacity Seat
```

A Capacity Seat is an approved planning unit representing demand for one Role
or one unit of Role-based capacity.

A Capacity Seat may be:

- proposed;
- under review;
- approved;
- funded;
- reserved;
- unfilled;
- filled by one Agent;
- shared by an approved Agent;
- supported by multiple specialized Agents;
- temporarily suspended;
- closed;
- archived.

A Capacity Seat must not be counted as an Agent.

The legacy term `Role Slot` may appear in historical records but should be
mapped to `Capacity Seat` during controlled migration.

---

# 17. Normalized Capacity Terminology

## 17.1 Role Document

A governed document defining:

- purpose;
- responsibilities;
- authority;
- prohibited actions;
- skills;
- reporting line;
- expected outcomes;
- evaluation requirements.

A Role Document does not represent a running Agent.

---

## 17.2 Capacity Seat

A planned and governed unit of Role-based organizational demand.

A Capacity Seat does not prove Agent existence.

---

## 17.3 Agent Specification

A designed definition containing:

- proposed Agent ID;
- Role ID;
- Agent version;
- prompt profile;
- policy profile;
- Model profile;
- Tool profile;
- memory profile;
- authority profile;
- permission profile;
- budget profile;
- evaluation profile;
- evidence profile;
- owner;
- lifecycle state.

An Agent Specification does not prove registration or provisioning.

---

## 17.4 Registered Agent

An Agent with:

- unique Agent ID;
- approved Agent version;
- approved Role reference;
- accountable Human owner;
- Registry record;
- lifecycle state;
- approval reference.

Registration does not prove runtime readiness.

---

## 17.5 Provisioned Agent

A registered Agent with runtime-ready configuration such as:

- workload identity;
- approved prompt;
- approved Model route;
- approved Tool profile;
- approved permissions;
- approved memory profile;
- approved budget profile;
- monitoring configuration;
- suspension configuration.

Provisioning does not prove valid allocation or activation.

---

## 17.6 Evaluated Agent

A provisioned Agent whose exact version has completed the required evaluation.

Evaluation may result in:

- pass;
- pass with restrictions;
- conditional pass;
- fail;
- re-evaluation required.

---

## 17.7 Certified Agent

An evaluated Agent with current certification for a defined high-risk or
specialized scope.

Certification does not grant broader authority than its approved scope.

---

## 17.8 Allocated Agent

An eligible Agent assigned to an approved:

- Organization;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- Department;
- Team;
- responsibility;
- budget;
- time period.

Allocation does not automatically prove active runtime availability.

---

## 17.9 Active Agent

A provisioned and allocated Agent that is:

- approved;
- enabled;
- authorized;
- within its validity period;
- connected to the required runtime;
- available for approved work;
- not suspended;
- not retired.

Active status must identify the environment.

---

## 17.10 Live-Tested Agent

An active Agent that has completed controlled live work with:

- bounded scope;
- valid authorization;
- monitoring;
- evidence;
- cost record;
- Human review;
- recorded result.

One live test does not prove Production readiness or enterprise scale.

---

## 17.11 Production-Controlled Agent

An Agent approved for defined Production work with:

- Production allocation;
- Production permissions;
- approved Tools;
- approved Models;
- current evaluation;
- current certification where required;
- monitoring;
- audit;
- cost controls;
- incident response;
- tested suspension;
- tested recovery;
- operational ownership;
- explicit approval.

---

## 17.12 Healthy Agent

An active Agent currently satisfying required:

- identity checks;
- allocation checks;
- policy checks;
- permission checks;
- Tool checks;
- Model-provider checks;
- memory checks;
- evaluation checks;
- certification checks;
- runtime health checks;
- monitoring checks.

Health must be based on current runtime evidence.

---

## 17.13 Available Agent

A healthy Agent that:

- is eligible for new work;
- has available execution capacity;
- is inside approved operating hours or availability policy;
- is not blocked;
- is not at its concurrency limit.

---

## 17.14 Busy Agent

An active Agent currently associated with one or more permitted execution
sessions.

Busy state must not be used to infer quality or value.

---

## 17.15 Agent Session

A time-bounded execution context created for an approved:

- Agent;
- Task;
- workflow;
- Product;
- Project;
- Tenant;
- environment.

One Agent may have multiple sessions only when policy and capacity limits
permit.

---

## 17.16 Runtime Worker

A technical execution unit that processes runtime work.

A worker may:

- execute one Task;
- execute part of a workflow;
- operate temporarily;
- stop and restart;
- scale independently of organizational design.

---

## 17.17 Concurrent Worker

A runtime worker actively processing work during the measured interval.

Concurrent-worker count may change without changing:

- Role Documents;
- Capacity Seats;
- Agent specifications;
- Agent identities.

---

## 17.18 Queued Work

Approved or eligible work waiting for:

- Agent capacity;
- worker capacity;
- Tool capacity;
- Model-provider capacity;
- approval;
- Human review;
- dependency completion;
- budget.

---

## 17.19 Tool Capacity

The approved ability of a Tool integration to process work within:

- rate limits;
- action permissions;
- provider limits;
- credentials;
- cost limits;
- Product scope;
- Project scope;
- Tenant scope;
- environment scope.

---

## 17.20 Model-Provider Capacity

The approved ability to invoke Models within:

- provider quotas;
- Model limits;
- token limits;
- concurrency limits;
- regional restrictions;
- Data restrictions;
- cost limits;
- availability constraints.

---

## 17.21 Human-Review Capacity

The available qualified Human time required to:

- review;
- approve;
- reject;
- correct;
- investigate;
- accept Risk;
- handle incidents;
- authorize Production actions.

AI capacity must not be scaled beyond required Human-review capacity.

---

## 17.22 Operational-Support Capacity

The available operational ability to:

- monitor;
- respond to alerts;
- handle incidents;
- suspend Agents;
- recover systems;
- support Customers;
- maintain integrations;
- perform access reviews.

---

## 17.23 Budget Capacity

The approved financial ability to support:

- Model usage;
- Tool usage;
- infrastructure;
- storage;
- network;
- monitoring;
- evaluation;
- Human review;
- support;
- incidents;
- recovery.

---

# 18. Capacity Dimensions

Mianx.ai must report capacity across separate dimensions.

| Dimension | Measurement Subject |
|---|---|
| Organizational Capacity | Departments, Teams, Roles, and Capacity Seats |
| Agent Identity Capacity | Registered Agent identities |
| Provisioning Capacity | Runtime-ready Agent configurations |
| Allocation Capacity | Agents assignable to approved scopes |
| Execution Capacity | Available Agents, sessions, and workers |
| Capability Capacity | Approved and usable capabilities |
| Tool Capacity | Tool quotas, permissions, and availability |
| Model Capacity | Provider quotas, Models, tokens, latency, and concurrency |
| Data Capacity | Approved Data access and processing limits |
| Memory Capacity | Approved context, storage, retrieval, and write capacity |
| Human-Review Capacity | Qualified Human review and approval availability |
| Operational Capacity | Monitoring, support, incident, and recovery availability |
| Budget Capacity | Approved spend and financial thresholds |
| Evidence Capacity | Ability to capture, store, validate, and review evidence |

No single number adequately represents total Workforce capacity.

---

# 19. Organizational Capacity

Organizational capacity measures:

- approved Departments;
- approved Teams;
- approved Roles;
- approved Capacity Seats;
- Role ownership;
- service coverage;
- capability coverage;
- reporting structure;
- escalation coverage;
- planned redundancy.

Organizational capacity is a design and Governance measure.

---

# 20. Runtime Capacity

Runtime capacity measures:

- provisioned Agents;
- allocated Agents;
- active Agents;
- healthy Agents;
- available Agents;
- busy Agents;
- restricted Agents;
- suspended Agents;
- live-tested Agents;
- Production-controlled Agents;
- active sessions;
- concurrent workers;
- queue depth;
- throughput;
- Tool availability;
- Model-provider capacity.

Runtime capacity requires runtime evidence.

---

# 21. Leadership Capacity Boundary

The supplied organizational baseline contains:

```text
11 proposed Leadership Capacity Seats
```

The exact executive Agent identities, Role ownership, authority, approval
status, and lifecycle states belong to:

```text
doc/19-ai-workforce/C-SUITE-AGENT-REGISTRY.md
```

This capacity document owns the count category.

It does not independently own the executive identity Registry.

The Founder remains L0 Human constitutional authority and is not counted as an
AI Agent.

---

# 22. Engineering Capacity Planning Baseline

The supplied Engineering allocation contains:

```text
78 planned Capacity Seats
```

| Engineering Group | Planned Capacity Seats |
|---|---:|
| Backend Engineering | 25 |
| Frontend Engineering | 20 |
| Mobile Engineering | 15 |
| AI and Machine Learning | 10 |
| Engineering Quality Assurance | 8 |
| **Total** | **78** |

This is a planning allocation.

It does not prove approved Roles, filled Seats, or active Agents.

---

# 23. Backend Engineering Planning Detail

| Role Group | Planned Capacity Seats |
|---|---:|
| Senior Backend Engineers | 10 |
| Backend Engineers | 10 |
| Junior Backend Engineers | 5 |
| **Total** | **25** |

Before approval, this planning detail must be checked against:

- actual Product demand;
- Project Roadmaps;
- capability reuse;
- automation opportunities;
- Human-review requirements;
- Tool and Model availability;
- budget;
- operating model.

---

# 24. Frontend Engineering Planning Detail

| Role Group | Planned Capacity Seats |
|---|---:|
| Senior Frontend Engineers | 8 |
| Frontend Engineers | 8 |
| Junior Frontend Engineers | 4 |
| **Total** | **20** |

---

# 25. Mobile Engineering Planning Detail

| Role Group | Planned Capacity Seats |
|---|---:|
| iOS Engineers | 5 |
| Android Engineers | 5 |
| React Native Engineers | 5 |
| **Total** | **15** |

The Product strategy must determine whether separate native capacity is
required or whether shared cross-platform capability is sufficient.

---

# 26. AI and Machine Learning Planning Detail

| Role Group | Planned Capacity Seats |
|---|---:|
| Machine Learning Engineers | 5 |
| AI Engineers | 3 |
| Natural Language Processing Engineers | 2 |
| **Total** | **10** |

Model-provider access does not replace AI engineering ownership.

---

# 27. Engineering Quality Planning Detail

| Role Group | Planned Capacity Seats |
|---|---:|
| Senior Quality Engineers | 3 |
| Quality Engineers | 3 |
| Junior Quality Engineers | 2 |
| **Total** | **8** |

Independent quality review capacity must not be consumed entirely by
implementation work.

---

# 28. DevOps Capacity Planning Baseline

The supplied DevOps allocation contains:

```text
24 planned Capacity Seats
```

| DevOps Group | Planned Capacity Seats |
|---|---:|
| Site Reliability Engineering | 10 |
| Platform Engineering | 8 |
| Automation Engineering | 6 |
| **Total** | **24** |

---

# 29. DevOps Planning Detail

## Site Reliability Engineering

| Role Group | Planned Capacity Seats |
|---|---:|
| Senior Site Reliability Engineers | 5 |
| Site Reliability Engineers | 5 |
| **Total** | **10** |

## Platform Engineering

| Role Group | Planned Capacity Seats |
|---|---:|
| Platform Engineers | 5 |
| Kubernetes Engineers | 3 |
| **Total** | **8** |

## Automation Engineering

| Role Group | Planned Capacity Seats |
|---|---:|
| Automation Engineers | 4 |
| Continuous Integration and Delivery Engineers | 2 |
| **Total** | **6** |

These planning values require validation against the selected deployment
Architecture and actual operational demand.

---

# 30. Security Capacity Planning Baseline

The supplied Security allocation contains:

```text
25 planned Capacity Seats
```

| Security Group | Planned Capacity Seats |
|---|---:|
| Security Architecture | 8 |
| Penetration Testing and Red Team | 7 |
| Compliance and Audit | 10 |
| **Total** | **25** |

---

# 31. Security Planning Detail

## Security Architecture

| Role Group | Planned Capacity Seats |
|---|---:|
| Security Architects | 3 |
| Security Engineers | 5 |
| **Total** | **8** |

## Penetration Testing and Red Team

| Role Group | Planned Capacity Seats |
|---|---:|
| Penetration Testers | 4 |
| Red Team Engineers | 3 |
| **Total** | **7** |

## Compliance and Audit

| Role Group | Planned Capacity Seats |
|---|---:|
| Compliance Specialists | 5 |
| Audit Specialists | 5 |
| **Total** | **10** |

Security review independence must be preserved.

---

# 32. Department Baseline Limitations

The source baseline contains detailed suballocations for:

- Engineering;
- DevOps;
- Security.

Equivalent detailed suballocations for the remaining departments are not
established by this document.

They must not be invented.

Future department documents must define and validate:

- services;
- Roles;
- Capacity Seats;
- capabilities;
- demand;
- budget;
- Tool and Model requirements;
- Human-review requirements;
- operational ownership;
- activation conditions.

---

# 33. Capacity Ownership

| Authority or Function | Capacity Responsibility |
|---|---|
| Founder | Approves strategic Workforce model and major expansion |
| AI CEO | Coordinates enterprise Workforce priorities within delegated authority |
| CTO | Reviews technical execution and platform capacity |
| COO | Reviews operational coverage and service capacity |
| CFO | Approves budgets, cost limits, and financial capacity |
| CHRO | Reviews organizational design, Role structure, and lifecycle |
| CPO | Reviews Product demand and Product allocation |
| CISO | Reviews Security capacity and privileged access |
| Chief Data Officer | Reviews Data and analytics capacity |
| Chief Legal Officer | Reviews legal and compliance capacity |
| Department Director | Forecasts department demand and capability gaps |
| Product Owner | Forecasts Product demand and expected outcomes |
| Project Owner | Forecasts Project demand and delivery commitments |
| Enterprise Analytics | Owns definitions, calculations, and reporting quality |
| Platform Operations | Implements and operates runtime scaling controls |
| Enterprise Quality | Reviews evidence, quality, and acceptance capacity |

No Agent may independently approve:

- its own demand;
- its own Capacity Seat;
- its own budget;
- its own permissions;
- its own activation;
- its own Production capacity;
- its own capacity increase.

---

# 34. Capacity Planning Hierarchy

Capacity planning should follow:

```text
Enterprise Strategy
        ↓
Product Portfolio
        ↓
Product Roadmaps
        ↓
Project Demand
        ↓
Department Services
        ↓
Required Roles
        ↓
Required Capabilities
        ↓
Capacity Seats
        ↓
Eligible Agents
        ↓
Tool, Model, Human, Operations, and Budget Capacity
        ↓
Approved Runtime Allocation
```

Capacity must not be planned only from Agent names.

---

# 35. Shared Enterprise Workforce

Shared enterprise capacity may support multiple authorized Products and
Projects.

Examples include:

- executive analysis;
- Enterprise Architecture;
- Security Governance;
- AI Operating System engineering;
- platform engineering;
- Model Governance;
- Tool Governance;
- observability;
- legal Governance;
- finance Governance;
- documentation Governance;
- quality assurance;
- incident response.

Shared capacity must remain scope-aware.

---

# 36. Product Workforce Capacity

Each Product should define:

- Product owner;
- Product objectives;
- approved capabilities;
- recurring workload;
- expected Task classes;
- required Roles;
- shared capacity demand;
- dedicated capacity demand;
- Human-review demand;
- provider demand;
- Tool demand;
- operational-support demand;
- budget;
- scaling conditions;
- reduction conditions.

---

# 37. Project Workforce Pods

A Project may receive a bounded Workforce pod.

A Project pod may include:

- Product Management;
- Project Management;
- Backend Engineering;
- Frontend Engineering;
- Mobile Engineering;
- DevOps;
- Quality Assurance;
- Security review;
- Data Engineering;
- Business Analysis;
- Customer Success;
- Support.

Project pods must use Project-scoped:

- identities;
- allocations;
- permissions;
- memory;
- Knowledge;
- secrets;
- Tools;
- Models;
- budgets;
- workflows;
- environments;
- evidence;
- audit.

---

# 38. Elastic Specialist Pool

Specialist Agents may be assigned temporarily based on verified demand.

Examples include:

- penetration testing;
- database engineering;
- legal review;
- SEO;
- performance engineering;
- incident response;
- Research;
- compliance audit;
- Data analysis.

Every temporary assignment must define:

- Agent identity;
- Role;
- capability;
- Product;
- Project;
- Tenant;
- environment;
- responsibility;
- authority;
- permissions;
- start;
- expiry;
- Tool access;
- Model access;
- Data access;
- memory access;
- budget;
- accountable Human owner;
- evidence;
- closure.

---

# 39. Initial Product and Project Portfolio Model

The current planning context includes:

| Product or Project | Planning Classification | Initial Capacity Approach |
|---|---|---|
| MianX Core Platform | Core Product | Shared platform and dedicated core engineering capacity |
| Mianx.ai AI Operating System | Core System | Dedicated platform, AI, Security, Data, and operations capacity |
| Telepizza Platform | Existing Product or Customer Project | Dedicated Product pod plus shared platform services |
| AHLT Poultry | Existing Industry Product or Customer Project | Dedicated Poultry domain pod plus shared platform services |
| Hospital Operating System | Future regulated Product | Dedicated regulated-domain capacity after approval |
| School Operating System | Future education Product | Dedicated education-domain capacity after approval |
| Additional Project or Industry OS | Pending definition | Capacity only after Product and Project approval |

The earlier source baseline used the name:

```text
AHLT Platform
```

The current portfolio direction uses:

```text
AHLT Poultry
```

The exact canonical Product and Project naming must be resolved through the
relevant Product and Project registries before approval.

---

# 40. Project Onboarding Capacity Gate

A Project must not receive active or Production capacity until it has:

- [ ] approved Project charter;
- [ ] Product owner;
- [ ] Project owner;
- [ ] technical owner;
- [ ] Security owner;
- [ ] Data and privacy owner where required;
- [ ] quality owner;
- [ ] operational owner;
- [ ] cost owner;
- [ ] budget;
- [ ] Product identity;
- [ ] Project identity;
- [ ] Tenant identity where applicable;
- [ ] Customer identity where applicable;
- [ ] Data classification;
- [ ] environment;
- [ ] scoped permissions;
- [ ] memory namespace;
- [ ] secret boundaries;
- [ ] Model policy;
- [ ] Tool policy;
- [ ] workflow;
- [ ] evidence requirements;
- [ ] monitoring;
- [ ] incident response;
- [ ] suspension process;
- [ ] closure process.

---

# 41. Project Capacity Isolation

| Capacity Boundary | Required Control |
|---|---|
| Task queue | Project partition or enforceable Project scope |
| Agent allocation | Project-specific allocation |
| Capability invocation | Project eligibility validation |
| Tool usage | Project-approved Tool actions |
| Model usage | Project-approved Model profile |
| Token usage | Project quota and attribution |
| Financial cost | Project budget and alerts |
| Memory | Project namespace and permissions |
| Knowledge | Project-aware access controls |
| Secrets | Project-specific secret access |
| API usage | Project-specific limits |
| Deployment | Controlled environment and pipeline |
| Evidence | Project-attributed work evidence |
| Audit | Project-attributed audit records |
| Incidents | Project containment and ownership |

One Project must not consume unrestricted shared capacity.

---

# 42. Tenant Capacity Isolation

Tenant capacity must be controlled separately for:

- Agent allocation;
- Task queues;
- Data access;
- memory;
- secrets;
- Tool actions;
- Model context;
- evidence;
- audit;
- costs;
- incident response;
- retention;
- deletion.

The governing rule is:

```text
Shared Workforce Capability
does not equal
Shared Tenant Context
```

---

# 43. Customer Capacity Boundary

Customer-specific capacity must define:

- contractually permitted work;
- Tenant;
- Product;
- Project;
- communication authority;
- Data scope;
- Service expectations;
- Human-review requirements;
- cost attribution;
- support coverage;
- incident escalation;
- capacity expiry or renewal.

Customer demand must not silently expand enterprise Agent authority.

---

# 44. Environment Capacity

Capacity must be reported separately by environment.

```text
Documentation

Local

Development

Test

Staging

Production Read-Only

Production Write
```

Development capacity must not be reported as Production capacity.

---

# 45. Workload Priority Classes

| Priority | Name | Example | Scheduling Rule |
|---|---|---|---|
| `P0` | Emergency | Critical Security incident or enterprise outage | Immediate reserved capacity |
| `P1` | Critical | Production failure or blocked Customer operation | Highest approved operational priority |
| `P2` | High | Release blocker or material approved deadline | Prioritized queue |
| `P3` | Normal | Planned Product and operational work | Standard fair scheduling |
| `P4` | Low | Research, optimization, and background analysis | Spare-capacity scheduling |

Priority must not be increased merely to bypass capacity controls.

P0 and P1 work must identify:

- reason;
- owner;
- Product;
- Project;
- Tenant where applicable;
- scope;
- timestamp;
- incident or change reference;
- evidence;
- post-completion review.

---

# 46. Capacity Demand Inputs

Capacity forecasts should consider:

- Task arrival rate;
- Task type;
- Task complexity;
- Risk class;
- Product;
- Project;
- Tenant;
- environment;
- expected handling time;
- approval time;
- Human-review time;
- Tool rate limits;
- Model-provider limits;
- retries;
- failure rate;
- evidence processing;
- incident reserve;
- maintenance;
- regional constraints;
- cost limits.

---

# 47. Baseline Concurrency Formula

A baseline concurrency estimate may use:

```text
Required Concurrency
=
Ceiling(
  Task Arrival Rate
  ×
  Average Task Handling Time
  ÷
  Target Utilization
)
```

Illustrative example:

```text
Task Arrival Rate:       10 Tasks per minute

Average Handling Time:   2 minutes

Planning Utilization:    0.70

Required Concurrency:
Ceiling(10 × 2 ÷ 0.70)
=
29 concurrent workers
```

This is an illustrative calculation.

It is not a current Mianx.ai runtime measurement or approved target.

---

# 48. Concurrency Formula Adjustments

The baseline formula must be adjusted for:

- peak demand;
- P0 and P1 reserve;
- Task variability;
- workflow dependencies;
- approval delays;
- Human-review bottlenecks;
- Model latency;
- Model quotas;
- Tool rate limits;
- Tool failures;
- retry rate;
- failure rate;
- queue partitioning;
- Product reservations;
- Project reservations;
- Tenant isolation;
- recovery capacity;
- maintenance;
- regional operation;
- budget.

---

# 49. Planning Utilization Assumptions

The original baseline proposed the following planning ranges.

| Resource Type | Proposed Planning Range |
|---|---:|
| Critical incident reserve | Up to 50% normal planned use before review |
| Shared Agent pool | 60–75% |
| Project Agent pool | 65–80% |
| Model-provider quota | Maximum 70% during normal operation |
| Database or shared platform capacity | Maximum 70% during normal operation |
| Queue processing | Within approved queue-time objective |
| Human-review capacity | Below fatigue and quality-risk threshold |
| Operational-support capacity | Sufficient incident and recovery reserve |

These are proposed planning assumptions.

They are not approved runtime targets.

Actual targets require:

- baseline measurement;
- owner;
- evidence;
- Risk review;
- cost review;
- approval;
- periodic validation.

---

# 50. Capacity Reserve

Capacity reserves may be maintained for:

- critical incidents;
- provider failure;
- Tool failure;
- recovery;
- Product launch;
- Customer priority;
- regulatory deadline;
- temporary demand spikes;
- maintenance;
- Human-review surge.

Every reserve must define:

```yaml
reserve_id:
capacity_type:
purpose:
owner:
product_scope:
project_scope:
tenant_scope:
environment_scope:
reserved_amount:
unit:
start_at:
review_at:
expires_at:
budget:
release_condition:
status:
```

---

# 51. Bottleneck Principle

Effective Workforce capacity is limited by the most constrained required
dependency.

```text
Effective Capacity
=
Minimum of:
- Eligible Agent Capacity
- Worker Capacity
- Tool Capacity
- Model-Provider Capacity
- Data Access Capacity
- Memory Capacity
- Human-Review Capacity
- Operational-Support Capacity
- Budget Capacity
```

Increasing Agents alone may not increase useful capacity.

---

# 52. Tool Capacity

Tool capacity planning must consider:

- approved actions;
- rate limits;
- provider limits;
- credential limits;
- environment restrictions;
- Product restrictions;
- Project restrictions;
- Tenant restrictions;
- failure rate;
- latency;
- cost;
- monitoring;
- suspension.

An unavailable or suspended Tool reduces the effective capacity of dependent
capabilities.

---

# 53. Model-Provider Capacity

Model-provider capacity planning must consider:

- approved Models;
- approved use cases;
- request limits;
- token limits;
- concurrency limits;
- context limits;
- region;
- Data restrictions;
- latency;
- availability;
- fallback;
- cost;
- provider concentration;
- incident status.

Fallback capacity must use approved providers and Models.

---

# 54. Human-Review Capacity

Human-review capacity must be planned for:

- high-risk Tasks;
- Production changes;
- Customer communications;
- legal work;
- financial work;
- Security work;
- Data and privacy decisions;
- evaluation;
- certification;
- incident response;
- exception approval;
- Knowledge promotion.

A larger AI Workforce without sufficient Human review can increase Risk rather
than useful capacity.

---

# 55. Operational-Support Capacity

Operational-support capacity must include:

- monitoring coverage;
- alert response;
- incident command;
- Agent suspension;
- Tool suspension;
- Model or provider suspension;
- recovery;
- access reviews;
- configuration maintenance;
- Customer support;
- evidence retention.

Production capacity must not exceed support capacity.

---

# 56. Budget Capacity

Budget capacity should be approved at relevant levels.

Potential levels include:

- enterprise;
- Department;
- Product;
- Project;
- Tenant;
- Customer;
- Team;
- Agent;
- capability;
- workflow;
- Task;
- provider;
- Tool;
- Model.

Budget availability does not replace Governance approval.

---

# 57. Cost Components

Workforce cost may include:

- Model input usage;
- Model output usage;
- embeddings;
- vector storage;
- compute;
- storage;
- network;
- third-party APIs;
- Tool execution;
- observability;
- backup;
- evaluation;
- Human review;
- support;
- incidents;
- rework;
- failed execution;
- recovery.

Material components must not be omitted from cost reporting.

---

# 58. Cost Attribution Path

A cost record should support attribution through:

```text
Organization
    ↓
Tenant or Customer
    ↓
Product
    ↓
Project
    ↓
Department
    ↓
Team
    ↓
Agent
    ↓
Capability
    ↓
Workflow
    ↓
Task
    ↓
Tool, Model, or Provider
```

---

# 59. Project Budget Controls

Every active Project should define:

- approved budget;
- currency;
- monthly limit;
- daily limit;
- per-Task limits;
- Model limits;
- Tool limits;
- warning threshold;
- approval threshold;
- hard-stop threshold;
- emergency override process;
- cost owner;
- review cadence.

---

# 60. Scaling-Up Triggers

Capacity may be increased when verified evidence shows:

- sustained queue growth;
- queue-time objective breach;
- high utilization;
- demand growth;
- Task failure caused by saturation;
- provider latency;
- Tool saturation;
- new approved Product or Project;
- new approved Tenant;
- new Department activation;
- loss of a critical provider;
- approved temporary deadline;
- availability objective Risk.

Scaling must remain within approved:

- budget;
- Security;
- provider limits;
- Tool limits;
- Product scope;
- Project scope;
- Tenant scope;
- environment;
- Human-review capacity;
- operational-support capacity.

---

# 61. Scaling-Down Triggers

Capacity may be reduced when:

- demand remains below approved thresholds;
- Capacity Seats remain unused;
- allocated Agents remain underused;
- Product or Project work closes;
- cost exceeds verified value;
- a capability is retired;
- a Tool is retired;
- a Model is retired;
- a provider is replaced;
- a Project is suspended;
- a Tenant closes;
- a Role is deprecated;
- Human review cannot support safe operation.

---

# 62. Capacity Expansion Gate

Before material capacity expansion:

- [ ] demand is measured;
- [ ] business owner exists;
- [ ] Product scope is approved;
- [ ] Project scope is approved;
- [ ] Tenant scope is approved where applicable;
- [ ] required Roles are approved;
- [ ] required capabilities are approved;
- [ ] Capacity Seats are approved;
- [ ] eligible Agents are available;
- [ ] Tool capacity is available;
- [ ] Model-provider capacity is available;
- [ ] Human-review capacity is available;
- [ ] operational-support capacity is available;
- [ ] budget is approved;
- [ ] Security review is complete;
- [ ] Data and privacy review is complete;
- [ ] monitoring exists;
- [ ] suspension exists;
- [ ] reduction or retirement condition is defined;
- [ ] required Founder approval is recorded.

---

# 63. Agent Counting Gate

An Agent must not be counted as registered unless:

- stable Agent ID exists;
- Registry record exists;
- Agent version exists;
- Role ID exists;
- accountable Human owner exists;
- approval reference exists;
- lifecycle state is recorded.

An Agent must not be counted as provisioned unless:

- runtime identity exists;
- approved configuration exists;
- prompt profile exists;
- Model profile exists;
- Tool profile exists;
- permission profile exists;
- memory profile exists;
- monitoring configuration exists;
- suspension configuration exists.

An Agent must not be counted as active unless:

- provisioning is complete;
- evaluation is valid;
- certification is valid where required;
- allocation is active;
- authority is valid;
- permissions are valid;
- runtime state is enabled;
- Agent is not suspended;
- current runtime evidence exists.

---

# 64. Live-Tested Agent Counting Gate

An Agent must not be counted as live-tested unless:

- controlled live Task exists;
- Agent identity is verified;
- exact Agent version is recorded;
- Product scope is recorded;
- Project scope is recorded;
- Tenant scope is recorded where applicable;
- environment is recorded;
- monitoring was active;
- evidence was captured;
- Human review occurred;
- result was recorded;
- limitations were recorded;
- test date is current enough for the claim.

---

# 65. Production-Controlled Agent Counting Gate

An Agent must not be counted as Production-controlled unless:

- Production purpose is approved;
- Production allocation is valid;
- Production authority is valid;
- Production permissions are valid;
- Production Tools are approved;
- Production Models are approved;
- Data use is approved;
- memory scope is approved;
- evaluation is current;
- certification is valid where required;
- monitoring is active;
- audit is active;
- cost controls are active;
- incident response is ready;
- suspension is tested;
- recovery is tested;
- operational owner is active;
- explicit Production approval exists;
- current Production evidence exists.

---

# 66. Agent Status Model

The Workforce Lifecycle document owns the full lifecycle authority.

For capacity reporting, Agents may be grouped into:

| Capacity Reporting State | Meaning |
|---|---|
| `Proposed` | Agent need or design proposed |
| `Approved` | Agent design approved |
| `Registered` | Registry identity created |
| `Provisioned` | Runtime-ready configuration created |
| `Evaluated` | Required evaluation completed |
| `Certified` | Required certification valid |
| `Allocated` | Assigned to approved scope |
| `Active` | Available for approved work |
| `Live-Tested` | Controlled live test completed |
| `Production-Controlled` | Approved controlled Production operation |
| `Restricted` | Operating with reduced scope |
| `Suspended` | New execution blocked |
| `Retired` | Operational authority removed |
| `Archived` | Historical record retained |

Operational conditions such as `Busy` and `Degraded` should be reported as
runtime conditions, not replacements for lifecycle state.

---

# 67. Agent Registry Capacity Requirements

A future Agent Registry should expose capacity-relevant fields.

```yaml
agent:
  agent_id: required
  agent_version: required
  display_name: required
  role_id: required
  department_id: required
  team_ids: conditional
  accountable_human_owner: required

scope:
  organization_ids: required
  product_ids: required
  project_ids: required
  tenant_ids: conditional
  customer_ids: conditional
  environments: required
  regions: conditional
  data_classes: required

configuration:
  prompt_profile_id: required
  model_profile_id: required
  tool_profile_id: required
  memory_profile_id: required
  authority_profile_id: required
  permission_profile_id: required
  evidence_profile_id: required
  evaluation_profile_id: required
  budget_profile_id: required
  capacity_profile_id: required

limits:
  financial_limit: required
  token_limit: required
  rate_limit: required
  session_limit: required
  concurrency_limit: required
  task_duration_limit: required

assurance:
  evaluation_state: required
  certification_state: required
  security_review_state: required
  monitoring_state: required
  suspension_test_state: required

lifecycle:
  registry_state: required
  provisioning_state: required
  allocation_state: required
  runtime_state: required
  suspension_state: required
  registered_at: required
  provisioned_at: conditional
  allocated_at: conditional
  activated_at: conditional
  expires_at: conditional
  suspended_at: conditional
  retired_at: conditional
  last_seen_at: conditional
```

---

# 68. Capacity Seat Record

A future Capacity Seat record should include:

```yaml
capacity_seat_id:
capacity_seat_version:
role_id:
department_id:
team_id:
business_need:
business_owner:

organization_scope:
product_scope:
project_scope:
tenant_scope:
customer_scope:
environment_scope:
region_scope:

expected_work_types:
expected_task_arrival_rate:
expected_handling_time:
expected_concurrency:
expected_review_demand:
expected_tool_demand:
expected_model_demand:
expected_operational_demand:

estimated_cost:
approved_budget:
cost_owner:

seat_state:
funding_state:
assignment_state:
assigned_agent_ids:

start_at:
review_at:
expires_at:
closure_condition:

approved_by:
created_at:
updated_at:
```

---

# 69. Capacity Profile

A Capacity Profile may define:

```yaml
capacity_profile_id:
capacity_profile_version:

maximum_concurrent_tasks:
maximum_sessions:
maximum_workers:
maximum_queue_depth:
maximum_task_duration:

maximum_tool_calls_per_task:
maximum_model_calls_per_task:
maximum_tokens_per_task:
maximum_cost_per_task:

daily_task_limit:
daily_cost_limit:
monthly_cost_limit:

required_human_review_capacity:
required_operational_support:
required_incident_reserve:

warning_thresholds:
critical_thresholds:
hard_stop_thresholds:

scaling_policy:
suspension_policy:
review_at:
status:
```

---

# 70. Capacity Reporting Standard

Every Workforce capacity report must identify:

- report ID;
- report version;
- generated time;
- measurement window;
- source systems;
- source versions;
- environment;
- Organization;
- Product;
- Project;
- Tenant;
- Customer;
- lifecycle states included;
- lifecycle states excluded;
- count definitions;
- calculation version;
- evidence quality;
- report owner;
- limitations.

---

# 71. Standard Count Report

A valid report should distinguish:

```yaml
report:
  report_id: required
  generated_at: required
  measurement_window: required
  environment: required
  source_registry: required
  source_version: required
  report_owner: required

organizational_counts:
  role_documents: required
  approved_roles: required
  proposed_capacity_seats: required
  approved_capacity_seats: required
  funded_capacity_seats: required
  filled_capacity_seats: required

agent_counts:
  agent_specifications: required
  registered_agents: required
  provisioned_agents: required
  evaluated_agents: required
  certified_agents: required
  allocated_agents: required
  active_agents: required
  live_tested_agents: required
  production_controlled_agents: required
  restricted_agents: required
  suspended_agents: required
  retired_agents: required

runtime_counts:
  healthy_agents: required
  available_agents: required
  busy_agents: required
  active_sessions: required
  concurrent_workers: required
  queued_tasks: required

dependency_capacity:
  tool_capacity: required
  model_provider_capacity: required
  human_review_capacity: required
  operational_support_capacity: required
  budget_capacity: required

quality:
  evidence_quality: required
  limitations: required
```

A report must not publish one undefined number as `Total Agents`.

---

# 72. Count Evidence Quality

Capacity counts may use these evidence levels:

```text
C0 — Unsupported Claim

C1 — Historical Planning Statement

C2 — Repository or Document Count

C3 — Approved Registry Record

C4 — Verified Configuration or Allocation Record

C5 — Controlled Runtime Evidence

C6 — Independent or Audited Runtime Evidence
```

Examples:

| Count | Minimum Evidence |
|---|---|
| Role Documents | C2 |
| Approved Capacity Seats | C3 |
| Registered Agents | C3 |
| Provisioned Agents | C4 |
| Allocated Agents | C4 |
| Active Agents | C5 |
| Live-Tested Agents | C5 plus test evidence |
| Production-Controlled Agents | C5 plus approval and assurance evidence |
| Concurrent Workers | C5 |
| Externally reported capacity | C6 where material |

---

# 73. Workforce Capacity KPIs

Potential KPIs include:

| KPI | Definition |
|---|---|
| Capacity Seat Fill Rate | Filled approved Capacity Seats / approved Capacity Seats |
| Agent Ownership Coverage | Registered Agents with active Human owners / registered Agents |
| Agent Allocation Validity | Active Agents with valid allocations / active Agents |
| Agent Availability | Healthy available Agents / approved active Agents |
| Agent Utilization | Busy execution time / available approved execution time |
| Queue Wait Time | Task execution start minus Task ready time |
| Task Throughput | Accepted eligible Tasks per measurement window |
| Acceptance Rate | Accepted outputs / reviewed outputs |
| Failure Rate | Failed executions / started executions |
| Retry Rate | Executions with retries / executions |
| Evidence Completion | Complete evidence envelopes / material completed Tasks |
| Cost per Accepted Task | Attributed cost / accepted Tasks |
| Project Capacity Share | Project usage / approved shared capacity |
| Human Review Utilization | Consumed review time / available review time |
| Tool Capacity Utilization | Used approved Tool capacity / available Tool capacity |
| Model Capacity Utilization | Used approved provider capacity / approved provider capacity |
| Capacity Forecast Accuracy | Forecast demand compared with actual demand |
| Suspension Effectiveness | Successful capacity blocks / suspension tests or events |

Detailed metric definitions belong to:

```text
doc/19-ai-workforce/workforce-metrics.md
```

---

# 74. Historical Planning Targets

The original baseline proposed:

| Metric | Historical Planning Value |
|---|---:|
| Eligible-Task completion | At least 95% |
| Accepted output quality | At least 90% |
| Material-Task evidence | 100% |
| Cross-Project Data leakage | 0 tolerated |
| Misleading completion reports | 0 tolerated |
| Agent health visibility | 100% of active Agents |
| Project cost attribution | 100% |
| Critical-Role coverage | At least two eligible execution paths |
| Review-cycle compliance | At least 95% |
| Suspended-Agent execution | 0 tolerated |

These values are classified as:

```yaml
classification: Historical Proposed Planning Targets
approved: false
baseline_measured: false
runtime_instrumentation_verified: false
```

They must not be reported as:

- current performance;
- approved targets;
- service-level commitments;
- Customer commitments;
- Production results.

---

# 75. Target Approval Requirements

Before a capacity target becomes active:

- baseline must be measured;
- metric definition must be approved;
- Data source must be verified;
- calculation must be reproducible;
- owner must be assigned;
- Risk must be assessed;
- cost impact must be understood;
- Security impact must be reviewed;
- Human-review impact must be reviewed;
- warning threshold must be defined;
- critical threshold must be defined;
- response action must be defined;
- approval must be recorded.

---

# 76. Capacity Forecasting

A capacity forecast should define:

```yaml
forecast_id:
forecast_version:
forecast_period:
forecast_owner:

organization:
product:
project:
tenant:
environment:

demand_source:
historical_window:
task_types:
risk_classes:
arrival_rate:
handling_time:
peak_factor:
retry_assumption:
failure_assumption:
approval_delay:
human_review_demand:

agent_capacity:
worker_capacity:
tool_capacity:
model_capacity:
budget_capacity:
operational_capacity:

recommended_capacity:
reserved_capacity:
confidence_level:
assumptions:
limitations:
review_at:
```

---

# 77. Forecast Confidence

Forecast confidence may be classified as:

```text
F0 — Unknown

F1 — Qualitative Estimate

F2 — Limited Historical Evidence

F3 — Validated Internal Forecast

F4 — Multi-Period Forecast With Reconciliation

F5 — Audited Forecast Used for Material Commitments
```

A low-confidence forecast must not be presented as certain capacity.

---

# 78. Forecast Reconciliation

Forecasts should be compared with actual:

- demand;
- queue depth;
- queue time;
- execution time;
- concurrency;
- Human-review use;
- Tool use;
- Model use;
- cost;
- incidents;
- accepted outcomes.

Forecast errors should update future assumptions.

---

# 79. Queue Capacity

Queue reporting should distinguish:

- total queued Tasks;
- eligible queued Tasks;
- blocked Tasks;
- approval-waiting Tasks;
- review-waiting Tasks;
- Tool-blocked Tasks;
- Model-blocked Tasks;
- budget-blocked Tasks;
- Product;
- Project;
- Tenant;
- priority;
- queue age.

Queue depth alone does not prove insufficient Agent capacity.

---

# 80. Overcommitment Controls

Overcommitment occurs when approved demand exceeds safe available capacity.

Controls may include:

- Task admission control;
- priority enforcement;
- queue limits;
- allocation limits;
- session limits;
- worker limits;
- provider quotas;
- Human-review quotas;
- budget limits;
- delivery renegotiation;
- temporary specialist assignment;
- Product or Project escalation.

Overcommitment must not be hidden through unrealistic status reporting.

---

# 81. Noisy-Neighbour Controls

One Product, Project, Tenant, Agent, workflow, Tool, or provider must not
consume shared capacity without approved limits.

Controls may include:

- quotas;
- weighted scheduling;
- reserved capacity;
- fair queues;
- hard limits;
- cost limits;
- rate limits;
- concurrency limits;
- emergency override;
- post-override review.

---

# 82. Critical Capability Redundancy

Critical capacity should avoid false redundancy.

Two Agents are not independent fallbacks when they share the same:

- provider;
- Model;
- Tool;
- credential;
- memory dependency;
- deployment region;
- queue;
- infrastructure failure mode;
- Human approver bottleneck.

Critical capability resilience may require:

- alternate eligible Agent;
- alternate Model;
- alternate provider;
- alternate Tool;
- alternate region;
- manual procedure;
- reserved Human operator;
- tested recovery.

---

# 83. One-Agent Capacity Proof

The first controlled capacity proof should include:

```text
1 Approved Role

1 Approved Capacity Seat

1 Registered Agent

1 Provisioned Agent

1 Evaluated Agent

1 Valid Allocation

1 Bounded Capability

1 Product

1 Project

1 Approved Environment

1 Low-Risk Task Class

1 Approved Model

0 or 1 Low-Risk Tool

1 Human Reviewer

1 Evidence Profile

1 Budget Profile

1 Monitoring Profile

1 Tested Suspension Path
```

The proof must not be represented as enterprise Workforce capacity.

---

# 84. Team Capacity Proof

A controlled Team capacity proof should add:

- multiple distinct Agent identities;
- Team owner;
- Team purpose;
- Role separation;
- Team allocation;
- communication limits;
- handoff controls;
- Team budget;
- shared-memory rules;
- evidence aggregation;
- conflict handling;
- Team suspension;
- Human-review capacity.

---

# 85. Multi-Project Capacity Proof

A Multi-Project proof should verify:

- separate Project identities;
- separate Agent allocations;
- separate permissions;
- separate memory;
- separate secrets;
- separate evidence;
- separate cost;
- separate queues or enforced partitions;
- denied cross-Project access;
- fair shared-capacity scheduling;
- Project-specific monitoring;
- Project closure and access revocation.

---

# 86. Multi-Tenant Capacity Proof

A Multi-Tenant proof should verify:

- Tenant identities;
- Tenant-scoped Agent access;
- Tenant-scoped Data;
- Tenant-scoped memory;
- Tenant-scoped secrets;
- Tenant-scoped Tool actions;
- Tenant-scoped Model context;
- Tenant-scoped evidence;
- Tenant-scoped costs;
- negative isolation tests;
- Tenant offboarding;
- Tenant capacity limits.

---

# 87. Production Capacity Gate

Production capacity must not be declared until:

- [ ] Production business purpose is approved;
- [ ] Product and Project owners are active;
- [ ] Tenant and Customer boundaries are approved;
- [ ] active Agent count is runtime-verified;
- [ ] Production-controlled Agent count is runtime-verified;
- [ ] Tool capacity is verified;
- [ ] Model-provider capacity is verified;
- [ ] Human-review capacity is verified;
- [ ] operational-support capacity is verified;
- [ ] budget capacity is verified;
- [ ] monitoring is active;
- [ ] audit is active;
- [ ] evidence capture is active;
- [ ] incident response is ready;
- [ ] suspension is tested;
- [ ] recovery is tested;
- [ ] queue and concurrency controls are tested;
- [ ] isolation tests pass;
- [ ] required executive approval is recorded;
- [ ] Founder approval exists where required.

---

# 88. Capacity Review Cadence

| Frequency | Required Review |
|---|---|
| Continuous | Agent health, queues, providers, Tools, critical alerts, and hard limits |
| Daily | Utilization, failures, retries, budget thresholds, and priority work |
| Weekly | Project demand, workflow performance, review capacity, and support load |
| Monthly | Workforce counts, lifecycle states, costs, quality, and allocations |
| Quarterly | Department design, Product allocation, capacity strategy, and provider concentration |
| Annually | Full organizational model, department baseline, and long-term capacity strategy |
| Event-Driven | New Product, Project, Tenant, incident, provider change, or structural change |

---

# 89. Capacity Review Evidence

A capacity review should include:

- current count report;
- source Registry references;
- lifecycle-state breakdown;
- Product and Project breakdown;
- Tenant breakdown where applicable;
- queue report;
- concurrency report;
- Tool-capacity report;
- Model-provider report;
- Human-review report;
- operational-support report;
- budget report;
- quality report;
- incident report;
- forecast reconciliation;
- open exceptions;
- required decisions.

---

# 90. Capacity Audit

A capacity audit should verify:

- count definitions;
- source systems;
- Role Document counts;
- Capacity Seat records;
- Agent Registry records;
- provisioning evidence;
- allocation evidence;
- active runtime evidence;
- live-test evidence;
- Production approval;
- concurrent-worker telemetry;
- Tool capacity;
- Model-provider capacity;
- Human-review capacity;
- operational-support capacity;
- budget attribution;
- Product and Project isolation;
- Tenant isolation;
- expired allocations;
- suspended Agents;
- retired Agents with remaining access;
- reporting accuracy.

---

# 91. Capacity Risks

| Risk | Description | Required Response |
|---|---|---|
| Count inflation | Role Documents or Seats reported as active Agents | Enforce normalized count definitions |
| Capacity shortage | Eligible work exceeds safe available capacity | Forecast, reserve, queue, and scale |
| Noisy neighbour | One scope consumes shared capacity | Quotas and fair scheduling |
| Cost explosion | Usage exceeds approved value | Budgets, limits, alerts, and hard stops |
| False redundancy | Backups share the same failure dependency | Independent fallback analysis |
| Skill gap | Agent identity exists without required capability | Evaluation, training, or reassignment |
| Review bottleneck | AI output exceeds Human-review capacity | Admission limits and review planning |
| Operational bottleneck | Monitoring or support cannot cover active capacity | Reduce or delay activation |
| Uncontrolled scaling | Workers increase without Governance | Approved scaling policy and limits |
| Cross-Project leakage | Shared context crosses Project boundaries | Enforced Project isolation |
| Cross-Tenant leakage | Shared capacity mixes Tenant context | Enforced Tenant isolation |
| Registry drift | Runtime state differs from approved state | Continuous reconciliation |
| Stale Agent access | Expired Agent remains active | Expiry enforcement and suspension |
| Provider dependency | Provider failure blocks work | Approved independent fallback |
| Tool saturation | Required Tool cannot support demand | Tool quotas and alternative path |
| Misleading reporting | Undefined totals are published | Standard report schema |
| Target gaming | Teams manipulate counts or utilization | Balanced metrics and audit |
| Over-allocation | One Agent receives conflicting commitments | Allocation and concurrency controls |

---

# 92. Capacity Anti-Patterns

Mianx.ai must avoid:

- treating every Role Document as an Agent;
- treating every Capacity Seat as filled;
- treating registration as provisioning;
- treating provisioning as activation;
- treating activation as live testing;
- treating live testing as Production readiness;
- using one undefined `Total Agents` number;
- reporting concurrent workers as organizational headcount;
- reporting Agent sessions as Agent identities;
- scaling Agents without Tool or Model capacity;
- scaling AI without Human-review capacity;
- scaling Production without operational support;
- ignoring failed or rejected work;
- ignoring retry and incident costs;
- using documentation count as runtime capacity;
- using planned targets as current results;
- creating permanent elastic assignments;
- allowing one Project to consume all shared capacity;
- allowing one Tenant to consume unrestricted capacity;
- preserving retired Agent access;
- approving capacity without a reduction or closure condition.

---

# 93. Prohibited Capacity Behaviors

The AI Workforce must not:

- fabricate Agent counts;
- fabricate concurrency values;
- fabricate queue measurements;
- fabricate utilization;
- count inactive Agents as active;
- count suspended Agents as available;
- count retired Agents as capacity;
- count failed tests as live-test evidence;
- count staging operation as Production operation;
- count unsupported targets as actual performance;
- expand its own Capacity Seat;
- increase its own concurrency limit;
- increase its own budget;
- extend its own allocation;
- bypass Product scope;
- bypass Project scope;
- bypass Tenant scope;
- bypass Human review;
- bypass operational limits;
- hide capacity incidents;
- hide cost overruns;
- continue after suspension.

---

# 94. Current Verified Baseline

At the time of this alignment, the controlled capacity baseline is:

```yaml
documentation_and_planning:
  populated_role_documents:
    value: 247
    classification: Repository-Verified Role Document Count
    runtime_agent_count: false

  historical_minimum_workforce_statement:
    value: 258+
    classification: Historical Planning Claim
    approved: false
    runtime_verified: false

  planned_department_capacity_seats:
    value: 445
    classification: Arithmetic Planning Total
    organizational_model_approved: false
    budget_approved: false
    runtime_verified: false

runtime:
  registered_agents: unknown
  provisioned_agents: unknown
  evaluated_agents: unknown
  certified_agents: unknown
  allocated_agents: unknown
  active_agents: unknown
  live_tested_agents: unknown
  production_controlled_agents: unknown
  healthy_agents: unknown
  available_agents: unknown
  busy_agents: unknown
  active_sessions: unknown
  concurrent_workers: unknown
  queued_tasks: unknown

dependency_capacity:
  tool_capacity: unknown
  model_provider_capacity: unknown
  human_review_capacity: unknown
  operational_support_capacity: unknown
  budget_capacity: unknown

production:
  production_capacity_proven: false
```

---

# 95. Current-State Boundary

This document does not prove that Mianx.ai currently has:

- 445 approved Capacity Seats;
- 445 registered Agents;
- 445 provisioned Agents;
- 445 active Agents;
- 258 active Agents;
- a complete Agent Registry;
- a complete allocation system;
- active executive AI Agents;
- active AI Departments;
- runtime concurrency;
- verified queue capacity;
- verified Tool capacity;
- verified Model-provider capacity;
- verified Human-review capacity;
- verified operational-support capacity;
- verified Product capacity;
- verified Project capacity;
- verified Tenant capacity;
- Production-controlled Workforce capacity.

Current truth must be read from:

- [`CURRENT-STATE.md`](../CURRENT-STATE.md)
- [`DOCUMENT-STATUS-REGISTRY.md`](../DOCUMENT-STATUS-REGISTRY.md)
- [`EXECUTION-BOARD.md`](../../execution/EXECUTION-BOARD.md)

Capacity documentation is not runtime evidence.

---

# 96. Pending Capacity Decisions

| Decision | Accountable Authority | Current Status |
|---|---|---|
| Retain, redefine, or retire the `258+` statement | Founder | Pending |
| Approve, revise, phase, or reject the `445` Seat model | Founder and AI CEO | Pending |
| Approve department ownership | Founder and AI CEO | Pending |
| Approve Department capacity phases | Founder, AI CEO, and relevant executives | Pending |
| Approve Agent counting definitions | AI Workforce Council and Enterprise Analytics | Pending |
| Approve runtime capacity model | CTO and COO | Pending |
| Approve Human-review capacity model | Founder, COO, and Governance | Pending |
| Approve budget capacity model | CFO | Pending |
| Approve lifecycle integration | CHRO and AI Workforce Council | Pending |
| Approve Security and identity controls | CISO | Pending |
| Approve Product and Project allocation | CPO, COO, and Portfolio Governance | Pending |
| Approve Tenant-capacity controls | CISO, Data Governance, and Platform Operations | Pending |
| Approve reporting definitions | Enterprise Analytics | Pending |
| Approve Production capacity criteria | Founder and required executive authorities | Pending |
| Normalize `AHLT Platform` and `AHLT Poultry` naming | Product Governance | Pending |

---

# 97. Capacity Adoption Requirements

This document may become Active only when:

- [ ] Founder approval is recorded.
- [ ] AI CEO approval is recorded.
- [ ] exact approved version is recorded.
- [ ] AI Constitution alignment is confirmed.
- [ ] Enterprise Principles alignment is confirmed.
- [ ] Company Vision alignment is confirmed.
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
- [ ] normalized terminology is approved.
- [ ] legacy `Role Slot` migration is approved.
- [ ] Role Document count is revalidated.
- [ ] `119` claim disposition is recorded.
- [ ] `258+` claim disposition is recorded.
- [ ] `445` Capacity Seat model disposition is recorded.
- [ ] Department ownership is approved.
- [ ] Leadership capacity boundary is approved.
- [ ] C-Suite Registry boundary is approved.
- [ ] Product portfolio naming is normalized.
- [ ] Product and Project allocation model is approved.
- [ ] Tenant-capacity isolation model is approved.
- [ ] capacity dimensions are approved.
- [ ] Agent counting gates are approved.
- [ ] Agent Registry capacity fields are approved.
- [ ] Capacity Seat record is approved.
- [ ] Capacity Profile is approved.
- [ ] report schema is approved.
- [ ] evidence-quality model is approved.
- [ ] demand and concurrency formulas are approved.
- [ ] utilization assumptions are measured and approved.
- [ ] reserve rules are approved.
- [ ] Tool-capacity model is approved.
- [ ] Model-provider capacity model is approved.
- [ ] Human-review capacity model is approved.
- [ ] operational-support capacity model is approved.
- [ ] budget-capacity model is approved.
- [ ] scaling and reduction gates are approved.
- [ ] one-Agent proof is approved.
- [ ] Team proof is approved.
- [ ] Multi-Project proof is approved.
- [ ] Multi-Tenant proof is approved.
- [ ] Production capacity gate is approved.
- [ ] capacity audit process is approved.
- [ ] Enterprise Architecture review is complete.
- [ ] Enterprise Analytics review is complete.
- [ ] Product and Portfolio review is complete.
- [ ] Security and Privacy review is complete.
- [ ] Finance review is complete.
- [ ] Human Resources review is complete.
- [ ] Enterprise Quality review is complete.
- [ ] Platform Operations review is complete.
- [ ] `INDEX.md` is updated.
- [ ] `ROADMAP.md` is updated.
- [ ] `CHANGELOG.md` is updated.
- [ ] `DOCUMENT-STATUS-REGISTRY.md` is updated.
- [ ] `CANONICAL-DOCUMENT-MAP.md` is updated.

---

# 98. Capacity Review Questions

Reviewers should answer:

1. Are Role Documents separated from Capacity Seats?
2. Are Capacity Seats separated from Agent identities?
3. Are registered Agents separated from provisioned Agents?
4. Are provisioned Agents separated from allocated Agents?
5. Are allocated Agents separated from active Agents?
6. Are active Agents separated from live-tested Agents?
7. Are live-tested Agents separated from Production-controlled Agents?
8. Are Agents separated from sessions and workers?
9. Is `247` correctly classified as a Role Document count?
10. Is `119` correctly classified as historical and unverified?
11. Is `258+` correctly classified as a planning claim?
12. Is `445` correctly classified as an arithmetic Seat total?
13. Is the twenty-department model still strategically valid?
14. Are detailed department allocations evidence-based?
15. Is the C-Suite identity boundary preserved?
16. Is the Founder excluded from AI Agent counts?
17. Are Product and Project boundaries explicit?
18. Are Tenant and Customer boundaries explicit?
19. Are environment distinctions explicit?
20. Is shared capacity properly isolated?
21. Are Human-review constraints included?
22. Are Tool and Model constraints included?
23. Is operational-support capacity included?
24. Is budget capacity included?
25. Is the concurrency formula used only as a planning method?
26. Are planning assumptions separated from approved targets?
27. Are scaling triggers evidence-based?
28. Can Agents expand their own capacity?
29. Are count evidence levels sufficient?
30. Is the reporting schema complete?
31. Are current-state limitations explicit?
32. Are Product names normalized?
33. Are Production gates sufficient?
34. Are any unsupported capacity claims present?
35. Can an independent reviewer reproduce every published count?

---

# 99. Capacity Definition of Done

This document is content-complete for review when:

- [ ] original document ID is preserved;
- [ ] original ownership is preserved or formally changed;
- [ ] alignment purpose is defined;
- [ ] authority status is defined;
- [ ] capacity objective is defined;
- [ ] capacity principles are defined;
- [ ] scope and exclusions are defined;
- [ ] count problem is documented;
- [ ] non-equivalence rule is defined;
- [ ] repository evidence is documented;
- [ ] `247` count is classified;
- [ ] `119` claim is classified;
- [ ] `258+` claim is classified;
- [ ] `445` total is classified;
- [ ] twenty-department table is preserved;
- [ ] Capacity Seat terminology is defined;
- [ ] normalized capacity terms are defined;
- [ ] capacity dimensions are defined;
- [ ] organizational and runtime capacity are separated;
- [ ] Leadership capacity boundary is defined;
- [ ] detailed preserved planning allocations are labelled;
- [ ] Department baseline limitations are explicit;
- [ ] capacity ownership is defined;
- [ ] capacity planning hierarchy is defined;
- [ ] shared Workforce is defined;
- [ ] Product capacity is defined;
- [ ] Project pods are defined;
- [ ] elastic specialist pool is defined;
- [ ] portfolio planning model is defined;
- [ ] naming conflict is disclosed;
- [ ] Project onboarding gate is defined;
- [ ] Project and Tenant isolation are defined;
- [ ] Customer and environment boundaries are defined;
- [ ] priority classes are defined;
- [ ] demand inputs are defined;
- [ ] concurrency formula is defined;
- [ ] formula adjustments are defined;
- [ ] planning-utilization assumptions are qualified;
- [ ] capacity reserve is defined;
- [ ] bottleneck principle is defined;
- [ ] Tool capacity is defined;
- [ ] Model-provider capacity is defined;
- [ ] Human-review capacity is defined;
- [ ] operational-support capacity is defined;
- [ ] budget capacity is defined;
- [ ] cost components and attribution are defined;
- [ ] scaling-up and scaling-down rules are defined;
- [ ] expansion gate is defined;
- [ ] Agent count gates are defined;
- [ ] live-test and Production count gates are defined;
- [ ] Agent status model is aligned;
- [ ] Agent Registry capacity requirements are defined;
- [ ] Capacity Seat and Capacity Profile records are defined;
- [ ] reporting standard is defined;
- [ ] count evidence quality is defined;
- [ ] capacity KPIs are defined;
- [ ] historical targets are qualified;
- [ ] forecasting is defined;
- [ ] queue and overcommitment controls are defined;
- [ ] noisy-neighbour controls are defined;
- [ ] redundancy is defined;
- [ ] one-Agent, Team, Multi-Project, and Multi-Tenant proofs are defined;
- [ ] Production capacity gate is defined;
- [ ] review cadence and evidence are defined;
- [ ] capacity audit is defined;
- [ ] risks are defined;
- [ ] anti-patterns are defined;
- [ ] prohibited behaviors are defined;
- [ ] current verified baseline is defined;
- [ ] current-state boundary is explicit;
- [ ] pending decisions are recorded;
- [ ] adoption requirements are defined;
- [ ] next document is identified.

This document becomes Active only after required review and approval.

---

# 100. Current Documentation Progress

After this aligned revision is saved:

```text
Total Planned AI Workforce Documents = 83

Content Complete for Review = 15

Existing Drafts Needing Alignment Review = 2

Empty Placeholders Remaining = 66

Approved Documents = 0

Active Canonical Documents = 0

Approved Capacity Seats = 0 Proven by This Document

Registered Agents = Unknown

Provisioned Agents = Unknown

Active Agents = Unknown

Live-Tested Agents = Unknown

Production-Controlled Agents = Unknown

Concurrent Workers = Unknown

Production AI Workforce Capacity Proven = NO
```

---

# 101. Current Document Decision

```text
DOCUMENT_ID=AIW-CAPACITY-001

DOCUMENT_VERSION=1.1.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

ALIGNMENT_STATUS=ALIGNED_DRAFT

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

AI_CEO_APPROVAL=PENDING

CAPACITY_MODEL_STATUS=PROPOSED_AND_UNAPPROVED

RUNTIME_REGISTRY_IMPLEMENTATION=NOT_VERIFIED

RUNTIME_CAPACITY=UNKNOWN

PRODUCTION_CAPACITY=NOT_PROVEN
```

---

# 102. Related Documents

- [`README.md`](./README.md)
- [`INDEX.md`](./INDEX.md)
- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`workforce-vision.md`](./workforce-vision.md)
- [`workforce-strategy.md`](./workforce-strategy.md)
- [`workforce-operating-model.md`](./workforce-operating-model.md)
- [`workforce-architecture.md`](./workforce-architecture.md)
- [`workforce-governance.md`](./workforce-governance.md)
- [`workforce-security.md`](./workforce-security.md)
- [`workforce-capabilities.md`](./workforce-capabilities.md)
- [`workforce-lifecycle.md`](./workforce-lifecycle.md)
- [`workforce-metrics.md`](./workforce-metrics.md)
- [`workforce-checklists.md`](./workforce-checklists.md)
- [`C-SUITE-AGENT-REGISTRY.md`](./C-SUITE-AGENT-REGISTRY.md)
- [`VERIFIABLE-WORK-ENVELOPE.md`](./VERIFIABLE-WORK-ENVELOPE.md)
- [`organization-structure.md`](./organization/organization-structure.md)
- [`department-structure.md`](./organization/department-structure.md)
- [`role-catalog.md`](./roles/role-catalog.md)
- [`agent-lifecycle.md`](./agents/agent-lifecycle.md)
- [`agent-performance.md`](./agents/agent-performance.md)
- [`capability-registry.md`](./capabilities/capability-registry.md)
- [`team-structure.md`](./teams/team-structure.md)
- [`orchestration-model.md`](./orchestration/orchestration-model.md)
- [`task-assignment.md`](./workflows/task-assignment.md)
- [`task-routing.md`](./workflows/task-routing.md)
- [`agent-kpis.md`](./kpis/agent-kpis.md)
- [`team-kpis.md`](./kpis/team-kpis.md)
- [`department-kpis.md`](./kpis/department-kpis.md)
- [`enterprise-kpis.md`](./kpis/enterprise-kpis.md)
- [`AI-CONSTITUTION.md`](../01-governance/AI-CONSTITUTION.md)
- [`ENTERPRISE-PRINCIPLES.md`](../01-governance/ENTERPRISE-PRINCIPLES.md)
- [`VISION-AND-MISSION.md`](../02-company/VISION-AND-MISSION.md)
- [`MASTER-BLUEPRINT.md`](../20-ai-operating-system/MASTER-BLUEPRINT.md)
- [`MULTI-PROJECT-OPERATING-MODEL.md`](../20-ai-operating-system/MULTI-PROJECT-OPERATING-MODEL.md)
- [`CORE-ARCHITECTURE.md`](../31-enterprise-architecture/CORE-ARCHITECTURE.md)
- [`CURRENT-STATE.md`](../CURRENT-STATE.md)
- [`DOCUMENT-STATUS-REGISTRY.md`](../DOCUMENT-STATUS-REGISTRY.md)
- [`CANONICAL-DOCUMENT-MAP.md`](../CANONICAL-DOCUMENT-MAP.md)
- [`EXECUTION-BOARD.md`](../../execution/EXECUTION-BOARD.md)

---

# 103. Revision History

| Version | Date | Status | Change |
|---|---|---|---|
| 1.0.0 | 2026-07-18 | Draft | Initial Workforce capacity baseline and count reconciliation |
| 1.1.0 | 2026-08-06 | Draft | Aligned the existing baseline with the completed AI Workforce foundation; preserved the original ID, ownership, historical counts, twenty-department model, and useful capacity rules; replaced ambiguous Role Slot terminology with Capacity Seat; corrected repository paths; separated registered, provisioned, evaluated, certified, allocated, active, live-tested, and Production-controlled Agents; added Tool, Model-provider, Human-review, operational-support, budget, Product, Project, Tenant, Customer, environment, evidence, forecasting, audit, scaling, and current-state controls; qualified historical targets and unsupported runtime claims |

---

# 104. Changelog Entry

Append the following entry to:

```text
doc/19-ai-workforce/CHANGELOG.md
```

```markdown
## AIW-CHG-20260806-015 — Agent Capacity Baseline Aligned

| Field | Value |
|---|---|
| Date | 2026-08-06 |
| Change Type | `ALIGNED`, `REVISED`, `STATUS`, `GOVERNANCE` |
| Impact | `I4 — Critical` |
| Risk | `R4` |
| Status | Completed for Review |
| Owner | AI Workforce Council |
| Steward | AI Workforce Operations |
| Approver | Pending Founder and AI CEO Review |

### Affected Documents

- `doc/19-ai-workforce/AGENT-CAPACITY-BASELINE.md`
- `doc/19-ai-workforce/INDEX.md`
- `doc/19-ai-workforce/ROADMAP.md`
- `doc/19-ai-workforce/CHANGELOG.md`

### Previous State

`AGENT-CAPACITY-BASELINE.md` was one of three existing substantive AI Workforce
documents.

It already provided useful count reconciliation, including:

- `119` as an earlier unverified count;
- `247` populated Role Documents;
- `258+` as a historical Workforce planning statement;
- `445` as the arithmetic total of twenty department allocations;
- separation between organizational capacity and runtime capacity;
- initial project-pod and specialist-pool models;
- capacity formulas, risks, cost controls, and review requirements.

The document still used legacy `docs/` paths, mixed some older lifecycle
terminology, used `Role Slot` instead of the governed `Capacity Seat` term, and
required alignment with the completed Workforce Architecture, Governance,
Security, Capabilities, Lifecycle, Metrics, and Checklists.

### New State

Version `1.1.0` now:

- preserves document ID `AIW-CAPACITY-001`;
- preserves original creation date and ownership;
- remains Draft and non-canonical;
- preserves and qualifies the `119`, `247`, `258+`, and `445` values;
- preserves the twenty-department planning baseline;
- defines Capacity Seats as planning units rather than Agent identities;
- separates Agent Specification, Registered, Provisioned, Evaluated, Certified,
  Allocated, Active, Live-Tested, and Production-Controlled states;
- separates Agent identities, sessions, workers, queues, Tools, Models,
  providers, Human review, operations, and budget capacity;
- corrects repository references from `docs/` to `doc/`;
- assigns executive Agent identity authority to the C-Suite Agent Registry;
- adds Product, Project, Tenant, Customer, and environment capacity controls;
- adds capacity evidence levels and reporting schemas;
- adds demand, forecasting, reserve, bottleneck, scaling, isolation, audit, and
  Production gates;
- qualifies historical utilization ranges and KPI targets as unapproved
  planning assumptions;
- records runtime Agent and worker counts as unknown until verified evidence
  exists;
- discloses the `AHLT Platform` and `AHLT Poultry` naming decision;
- updates documentation progress from three to two existing documents needing
  alignment review.

### Preserved Truth

The following distinction remains mandatory:

```text
Role Document
≠
Capacity Seat
≠
Registered Agent
≠
Provisioned Agent
≠
Allocated Agent
≠
Active Agent
≠
Production-Controlled Agent
≠
Concurrent Worker
```

### Limitations

- Founder approval is pending.
- AI CEO approval is pending.
- Canonical status remains false.
- `258+` has not been approved or retired.
- `445` has not been approved as the operating organization.
- Runtime Registry implementation is not proven.
- Active Agent count remains unknown.
- Production Workforce capacity is not proven.

### Follow-Up

- review and align `C-SUITE-AGENT-REGISTRY.md`;
- preserve its existing document ID `AIW-REG-CSUITE-001`;
- validate its eleven proposed executive identities;
- separate proposed executive Roles from registered or active Agents;
- align executive authority with Founder-reserved decisions;
- remove unsupported activation or Production claims;
- align executive lifecycle, permissions, Tools, Models, memory, cost,
  evaluation, evidence, suspension, and current-state reporting;
- update the INDEX and Roadmap after alignment.
```

---

# 105. Next Document

The next document in the official AI Workforce documentation sequence is the
alignment review of:

```text
doc/19-ai-workforce/C-SUITE-AGENT-REGISTRY.md
```

The next alignment must:

- preserve the existing document ID:

```text
AIW-REG-CSUITE-001
```

- review and align the existing document instead of creating a duplicate;
- preserve useful executive Role and identity definitions;
- separate proposed executive identities from registered Agents;
- separate registered Agents from provisioned, allocated, active,
  live-tested, and Production-controlled Agents;
- preserve Founder L0 Human constitutional authority;
- prevent executive Agents from approving their own authority;
- define executive ownership, authority, prohibited actions, scopes,
  permissions, Tools, Models, prompts, memory, budgets, evaluations,
  certifications, evidence, monitoring, suspension, retirement, and audit;
- align with the Capacity Baseline;
- retain `canonical: false`;
- record the alignment revision in `CHANGELOG.md`.

---