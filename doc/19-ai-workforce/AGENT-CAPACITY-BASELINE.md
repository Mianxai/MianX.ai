---
id: AIW-CAPACITY-001
title: Mianx.ai AI Workforce Capacity Baseline
version: 1.0.0
status: Draft

type: AI Workforce Planning
class: Governed

owner: AI Workforce Council
steward: AI Workforce Operations
authority: Founder and AI CEO

reviewers:
  - Founder
  - AI CEO
  - Chief Technology Officer
  - Chief Operating Officer
  - Chief Financial Officer
  - Chief Human Resources Officer
  - Chief Information Security Officer
  - Enterprise Architecture
  - Analytics Director

created: 2026-07-18
updated: 2026-07-18

classification: Internal

audience:
  - Founder
  - Executive Leadership
  - AI Workforce Council
  - Department Directors
  - Enterprise Architects
  - Platform Engineers
  - Finance Teams
  - Operations Teams
  - Analytics Teams
  - AI Agents

depends_on:
  - GOV-AI-CONSTITUTION-001
  - AIOS-BLUEPRINT-001

review_cycle:
  - Monthly During Implementation
  - Quarterly After Production Launch
  - Workforce Structure Change
  - New Project Onboarding
  - Material Capacity Change

canonical: false
---

# Mianx.ai AI Workforce Capacity Baseline

> This document establishes the controlled counting model, department allocation, capacity-planning rules, runtime reporting requirements, and approval process for the Mianx.ai AI Workforce.

---

## 1. Document Purpose

This document resolves conflicting AI workforce numbers found across the supplied project information and repository documentation.

It defines:

- What each workforce number means
- Which numbers are verified
- Which numbers remain historical planning claims
- How departmental role slots are counted
- How active AI agents must be counted
- How runtime concurrency differs from organizational headcount
- How agents are allocated across projects
- How capacity is increased or reduced
- How workforce costs are controlled
- Which evidence is required before reporting an agent as active

This baseline prevents role files, prompts, runtime workers, and active AI agents from being incorrectly counted as the same thing.

---

## 2. Current Authority Status

This document currently has the following state:

```yaml
status: Draft
canonical: false
```

Therefore:

- No workforce number in this document is automatically approved.
- The document does not activate any AI agent.
- The document does not authorize workforce spending.
- The document does not prove runtime capacity.
- Founder and executive approval are required before canonical promotion.
- Active-agent counts must come from a runtime registry.
- Documentation file counts must not be reported as active-agent counts.

---

## 3. Workforce Count Problem

The available Mianx.ai information contains several different workforce numbers.

| Source or Claim | Number | What It Represents | Current Reliability |
|---|---:|---|---|
| Earlier repository review | 119 | Claimed agent-role templates | Outdated or not verified against the supplied ZIP |
| Existing `05-workforce/roles/` | 247 | Populated human and organizational role documents | Verified file count |
| Master Blueprint statement | 258+ | Historical minimum AI workforce planning statement | Planning claim |
| Department allocation table | 445 | Arithmetic total of supplied department role slots | Verified calculation |
| Runtime active-agent registry | Unknown | Provisioned and currently active AI agents | Not found in the supplied documentation ZIP |
| Concurrent execution workers | Unknown | Runtime worker processes handling tasks | Requires implementation evidence |

These numbers are not interchangeable.

---

## 4. Verified Repository Evidence

The supplied documentation ZIP contains:

```text
docs/05-workforce/
docs/19-ai-workforce/
docs/20-ai-operating-system/
docs/22-agent-framework/
docs/23-multi-agent-system/
```

### 4.1 Human and Organizational Role Documents

The following populated role-document counts were verified under:

```text
docs/05-workforce/roles/
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

These are role documents.

They are not proof of:

- AI agent identities
- Agent prompts
- Agent runtime configurations
- Provisioned agents
- Active agents
- Healthy agents
- Concurrent workers
- Production operation

### 4.2 AI Workforce Documentation

The source ZIP contained AI-workforce structure under:

```text
docs/19-ai-workforce/
```

The folder included planned documentation for:

- Agents
- Capabilities
- Departments
- KPIs
- Leadership
- Orchestration
- Organization
- Playbooks
- Policies
- Roles
- Shared memory
- Standards
- Teams
- Templates
- Training
- Workflows

The presence of these paths defines an intended documentation structure.

It does not prove that the described AI workforce is implemented or active.

### 4.3 Runtime Registry Evidence

No verified runtime registry was available in the source documentation that could prove:

- Total provisioned agents
- Total active agents
- Total healthy agents
- Agent lifecycle states
- Agent last-seen times
- Current agent assignments
- Active model routes
- Active tool permissions
- Current project access
- Runtime concurrency
- Agent utilization

Therefore, the active-agent count remains:

```yaml
active_agent_count:
  value: unknown
  reason: No verified runtime registry evidence
```

---

## 5. Normalized Workforce Terminology

Every workforce report SHALL use the following terms consistently.

### 5.1 Role Document

A Markdown document that describes:

- Responsibilities
- Authority
- Skills
- Expectations
- Reporting line
- Performance measures

A role document does not represent a running agent.

### 5.2 Role Slot

An approved organizational position within a department.

A role slot may be:

- Unfilled
- Assigned to one agent
- Shared by an agent
- Filled by multiple specialized agents
- Temporarily suspended
- Reserved for future capacity

### 5.3 Agent Specification

A complete governed definition containing:

- Agent ID
- Role ID
- Prompt version
- Policy version
- Model route
- Tool permissions
- Memory permissions
- Project permissions
- Budget limits
- Evaluation requirements
- Owner
- Lifecycle state

An agent specification does not prove runtime provisioning.

### 5.4 Provisioned Agent

An agent with:

- Registered identity
- Stored configuration
- Approved prompt
- Approved model route
- Approved permissions
- Assigned owner
- Runtime credentials

A provisioned agent may not currently be active.

### 5.5 Active Agent

A provisioned agent that is:

- Approved
- Enabled
- Authorized
- Within its validity period
- Connected to the runtime
- Available for work
- Not suspended
- Not retired

### 5.6 Healthy Agent

An active agent that currently passes:

- Identity checks
- Policy checks
- Model availability checks
- Tool availability checks
- Memory-access checks
- Evaluation requirements
- Runtime health checks

### 5.7 Assigned Agent

An eligible agent assigned to:

- A department
- A team
- A project
- A workflow
- A task
- A temporary incident role

### 5.8 Concurrent Worker

A runtime execution unit currently processing a task.

Concurrent worker count may increase or decrease without changing organizational role count.

### 5.9 Agent Session

A time-bounded execution context created for one agent, project, workflow, or task.

One agent may have multiple sessions where policy permits.

### 5.10 Agent Instance

A provisioned runtime identity and configuration.

Agent instances must not be confused with:

- Role documents
- Role slots
- Worker processes
- Sessions
- Tasks
- Model calls

---

## 6. Department Capacity Baseline

The supplied Mianx.ai department allocation contains twenty departments.

| # | Department | Supplied Role Slots | Department Lead | Reports To |
|---:|---|---:|---|---|
| 1 | Leadership | 11 | AI CEO | Founder |
| 2 | Engineering | 78 | VP Engineering | CTO |
| 3 | DevOps | 24 | DevOps Director | CTO |
| 4 | Security | 25 | CISO | CEO |
| 5 | Infrastructure | 34 | Infrastructure Director | CTO |
| 6 | Data & AI | 31 | Chief Data Officer | CTO |
| 7 | Product | 11 | CPO | CEO |
| 8 | Design | 15 | Design Director | CPO |
| 9 | Marketing | 19 | CMO | CEO |
| 10 | SEO | 14 | SEO Director | CMO |
| 11 | Sales | 20 | CSO | CEO |
| 12 | Finance | 23 | CFO | CEO |
| 13 | Human Resources | 21 | CHRO | CEO |
| 14 | Legal | 25 | CLO | CEO |
| 15 | Operations | 16 | COO | CEO |
| 16 | Support | 18 | Support Director | COO |
| 17 | Customer Success | 14 | Customer Success Director | COO |
| 18 | Research | 12 | Chief Scientist | CTO |
| 19 | Quality Assurance | 18 | QA Director | CTO |
| 20 | Analytics | 16 | Analytics Director | Chief Data Officer |
|  | **Arithmetic Total** | **445** |  |  |

The verified arithmetic total is:

```text
445 role slots
```

This is an organizational planning total.

It is not a verified active-agent count.

---

## 7. Historical 258+ Statement

The Master Blueprint information includes the statement:

```text
258+ AI Agents
```

Until the Founder approves a final interpretation, this number SHALL be classified as:

```yaml
metric: Historical Minimum Workforce Statement
value: 258+
classification: Planning Claim
runtime_verified: false
canonical: false
```

The `258+` statement MAY represent:

- An earlier workforce phase
- A minimum target
- A partial department count
- An earlier organizational model
- A subset of the final workforce
- A historical estimate

It SHALL NOT be reported as the current active-agent count.

---

## 8. Proposed Count Reconciliation

The proposed reconciliation is:

| Workforce Measure | Proposed Interpretation |
|---|---|
| 119 | Outdated or incomplete earlier agent-role count |
| 247 | Verified human and organizational role-document count |
| 258+ | Historical minimum AI workforce aspiration |
| 445 | Complete supplied department role-slot allocation |
| Active agents | Must come from runtime registry |
| Healthy agents | Must come from runtime health evidence |
| Concurrent workers | Must come from runtime execution telemetry |

The recommended canonical organizational planning value is:

```yaml
planned_department_role_slots: 445
```

The recommended runtime count remains dynamic:

```yaml
active_agents: runtime_registry_value
healthy_agents: runtime_health_value
concurrent_workers: runtime_execution_value
```

Founder approval is required before this recommendation becomes canonical.

---

## 9. Leadership Capacity Baseline

The proposed leadership team contains eleven AI executive roles.

| # | Agent ID | Executive Role | Level |
|---:|---|---|---|
| 1 | `mianx.ceo.v1` | AI Chief Executive Officer | L1 |
| 2 | `mianx.cto.v1` | AI Chief Technology Officer | L2 |
| 3 | `mianx.coo.v1` | AI Chief Operating Officer | L2 |
| 4 | `mianx.cmo.v1` | AI Chief Marketing Officer | L2 |
| 5 | `mianx.cfo.v1` | AI Chief Financial Officer | L2 |
| 6 | `mianx.chro.v1` | AI Chief Human Resources Officer | L2 |
| 7 | `mianx.cpo.v1` | AI Chief Product Officer | L2 |
| 8 | `mianx.cso.v1` | AI Chief Sales Officer | L2 |
| 9 | `mianx.ciso.v1` | AI Chief Information Security Officer | L2 |
| 10 | `mianx.clo.v1` | AI Chief Legal Officer | L2 |
| 11 | `mianx.chief-scientist.v1` | AI Chief Scientist | L2 |

The Founder remains L0 constitutional authority and is not counted as an AI agent.

---

## 10. Engineering Capacity Baseline

The supplied Engineering allocation contains 78 role slots.

| Engineering Group | Role Slots |
|---|---:|
| Backend Engineering | 25 |
| Frontend Engineering | 20 |
| Mobile Engineering | 15 |
| AI and Machine Learning | 10 |
| Engineering QA | 8 |
| **Total** | **78** |

### 10.1 Backend Engineering

| Role | Slots |
|---|---:|
| Senior Backend Engineers | 10 |
| Backend Engineers | 10 |
| Junior Backend Engineers | 5 |
| **Total** | **25** |

### 10.2 Frontend Engineering

| Role | Slots |
|---|---:|
| Senior Frontend Engineers | 8 |
| Frontend Engineers | 8 |
| Junior Frontend Engineers | 4 |
| **Total** | **20** |

### 10.3 Mobile Engineering

| Role | Slots |
|---|---:|
| iOS Engineers | 5 |
| Android Engineers | 5 |
| React Native Engineers | 5 |
| **Total** | **15** |

### 10.4 AI and Machine Learning

| Role | Slots |
|---|---:|
| Machine Learning Engineers | 5 |
| AI Engineers | 3 |
| NLP Engineers | 2 |
| **Total** | **10** |

### 10.5 Engineering QA

| Role | Slots |
|---|---:|
| Senior QA Engineers | 3 |
| QA Engineers | 3 |
| Junior QA Engineers | 2 |
| **Total** | **8** |

---

## 11. DevOps Capacity Baseline

The supplied DevOps allocation contains 24 role slots.

| DevOps Group | Role Slots |
|---|---:|
| Site Reliability Engineering | 10 |
| Platform Engineering | 8 |
| Automation Engineering | 6 |
| **Total** | **24** |

### 11.1 Site Reliability Engineering

| Role | Slots |
|---|---:|
| Senior SREs | 5 |
| SRE Engineers | 5 |
| **Total** | **10** |

### 11.2 Platform Engineering

| Role | Slots |
|---|---:|
| Platform Engineers | 5 |
| Kubernetes Engineers | 3 |
| **Total** | **8** |

### 11.3 Automation Engineering

| Role | Slots |
|---|---:|
| Automation Engineers | 4 |
| CI/CD Engineers | 2 |
| **Total** | **6** |

---

## 12. Security Capacity Baseline

The supplied Security allocation contains 25 role slots.

| Security Group | Role Slots |
|---|---:|
| Security Architecture | 8 |
| Penetration Testing and Red Team | 7 |
| Compliance and Audit | 10 |
| **Total** | **25** |

### 12.1 Security Architecture

| Role | Slots |
|---|---:|
| Security Architects | 3 |
| Security Engineers | 5 |
| **Total** | **8** |

### 12.2 Penetration Testing

| Role | Slots |
|---|---:|
| Penetration Testers | 4 |
| Red Team Engineers | 3 |
| **Total** | **7** |

### 12.3 Compliance and Audit

| Role | Slots |
|---|---:|
| Compliance Specialists | 5 |
| Audit Specialists | 5 |
| **Total** | **10** |

---

## 13. Organizational Capacity vs Runtime Capacity

Mianx.ai SHALL track organizational and runtime capacity separately.

### 13.1 Organizational Capacity

Organizational capacity measures:

- Approved departments
- Approved teams
- Approved role slots
- Role ownership
- Capability coverage
- Reporting structure

### 13.2 Runtime Capacity

Runtime capacity measures:

- Provisioned agents
- Active agents
- Healthy agents
- Available agents
- Busy agents
- Suspended agents
- Concurrent workers
- Queue depth
- Task throughput
- Model capacity
- Tool capacity

### 13.3 Rule

An organizational role-slot count SHALL NOT be used as a runtime-capacity metric.

A runtime-worker count SHALL NOT be used as an organizational headcount.

---

## 14. AI Workforce Deployment Model

Mianx.ai should use three workforce-allocation layers.

### 14.1 Shared Enterprise Workforce

The shared workforce supports all authorized projects.

Examples:

- Executive leadership
- Enterprise architecture
- Security governance
- Platform engineering
- Model management
- Central observability
- Legal governance
- Finance governance
- Documentation governance

### 14.2 Project Workforce Pods

Each project receives a project-specific workforce pod.

A project pod MAY contain:

- Product Manager
- Project Manager
- Backend Engineer
- Frontend Engineer
- Mobile Engineer
- DevOps Engineer
- QA Engineer
- Security Reviewer
- Data Engineer
- Business Analyst
- Customer Success Agent
- Support Agent

Project pods use project-scoped:

- Identity
- Permissions
- Memory
- Knowledge
- Tools
- Budgets
- Workflows
- Environments

### 14.3 Elastic Specialist Pool

Specialist agents may be temporarily assigned based on demand.

Examples:

- Penetration tester
- Database specialist
- Legal specialist
- SEO specialist
- Performance engineer
- Incident responder
- Research specialist
- Compliance auditor

Temporary assignments SHALL have:

- Start time
- Expiry time
- Project permission
- Tool permission
- Data permission
- Budget
- Accountable owner

---

## 15. Five-Project Capacity Model

The initial project portfolio includes:

| Project | Capacity Type | Initial Workforce Strategy |
|---|---|---|
| Telepizza Platform | Client project | Dedicated product pod plus shared platform services |
| AHLT Platform | Client project | Dedicated ERP pod plus shared platform services |
| Hospital ERP | Future regulated project | Dedicated regulated-industry pod |
| School ERP | Future education project | Dedicated education-product pod |
| Project 05 | Domain pending | Capacity assigned after project definition |

No project SHALL receive production capacity until it has:

- Approved charter
- Product owner
- Technical owner
- Security owner
- Budget
- Data classification
- Project identity
- Project permissions
- Project memory namespace
- Model policy
- Deployment environment
- Support plan

---

## 16. Project Capacity Isolation

Every project SHALL receive separate capacity controls.

| Capacity Boundary | Required Control |
|---|---|
| Task queue | Project-specific queue or enforced partition |
| Agent assignment | Project eligibility and scoped delegation |
| Model usage | Project-approved model route |
| Token usage | Project quota |
| Financial cost | Project budget and alerts |
| Memory | Project namespace |
| Tools | Project-approved tool permissions |
| API usage | Project-specific limits |
| Deployment | Independent pipeline |
| Incidents | Independent containment scope |

One project SHALL NOT consume all shared capacity without approved emergency priority.

---

## 17. Workload Priority Classes

| Priority | Name | Example | Scheduling Rule |
|---|---|---|---|
| P0 | Emergency | Security incident or critical outage | Immediate reserved capacity |
| P1 | Critical | Production failure or blocked customer operation | Highest operational priority |
| P2 | High | Release blocker or material business deadline | Prioritized queue |
| P3 | Normal | Planned product and operational work | Standard fair scheduling |
| P4 | Low | Research, optimization, and background analysis | Spare-capacity scheduling |

Priority SHALL NOT be increased merely to bypass capacity planning.

P0 and P1 work require:

- Reason
- Owner
- Scope
- Timestamp
- Incident or change reference
- Review after completion

---

## 18. Capacity Planning Formula

Runtime capacity SHOULD be calculated using measured workload.

A baseline concurrency calculation is:

```text
Required Concurrency
=
Ceiling(
  Task Arrival Rate
  × Average Task Handling Time
  ÷ Target Utilization
)
```

Example:

```text
Task arrival rate:          10 tasks per minute
Average handling time:      2 minutes
Target utilization:         0.70

Required concurrency:
Ceiling(10 × 2 ÷ 0.70)
=
29 concurrent workers
```

This formula must be adjusted for:

- Peak workload
- Priority classes
- Model rate limits
- Tool rate limits
- Retry rate
- Failure rate
- Project reservations
- Recovery capacity
- Maintenance
- Regional deployment
- Cost limits

---

## 19. Target Utilization

Recommended planning ranges are:

| Resource Type | Target Utilization |
|---|---:|
| Critical incident capacity | Maximum 50% reserved baseline |
| Shared agent pool | 60–75% |
| Project agent pool | 65–80% |
| Model provider quota | Maximum 70% normal operation |
| Database capacity | Maximum 70% normal operation |
| Queue processing | Maintain approved queue-time objective |

Sustained utilization above the approved limit SHALL trigger capacity review.

---

## 20. Scaling Triggers

Capacity MAY scale up when:

- Queue depth exceeds threshold
- Queue time exceeds objective
- Agent utilization remains high
- Task failure increases because of saturation
- Model latency increases
- New projects are onboarded
- New departments become active
- Critical deadlines require approved temporary capacity
- Availability objectives are at risk

Capacity MAY scale down when:

- Demand remains below threshold
- Agents remain unused
- Project work is completed
- Cost exceeds value
- A model or tool is retired
- A project is suspended
- A role is no longer required

Scaling SHALL remain within:

- Budget
- Security policy
- Provider quota
- Project isolation
- Model approval
- Tool approval
- Regional constraints

---

## 21. Agent Activation Requirements

An agent SHALL NOT be counted as active until it has:

- Stable agent ID
- Approved role ID
- Approved role version
- Department assignment
- Hierarchy level
- Accountable owner
- Prompt version
- Policy version
- Approved model route
- Tool permissions
- Data permissions
- Memory namespace
- Project permissions
- Financial limit
- Token limit
- Concurrency limit
- Evaluation results
- Security review
- Monitoring
- Expiry or review date
- Suspension procedure
- Runtime health evidence

---

## 22. Agent Status Model

Every provisioned agent SHALL have one lifecycle state.

| State | Meaning |
|---|---|
| Requested | Workforce need identified |
| Designed | Agent specification created |
| Review | Governance and technical review underway |
| Evaluated | Required evaluation completed |
| Approved | Activation approved |
| Provisioned | Runtime identity and configuration created |
| Active | Available for authorized work |
| Busy | Currently executing work |
| Degraded | Active but failing one or more health requirements |
| Suspended | Temporarily prohibited from execution |
| Retiring | Removal or replacement in progress |
| Retired | Permanently inactive |
| Revoked | Access removed because of violation or security event |

An agent SHALL have only one primary lifecycle state at a given time.

---

## 23. Runtime Agent Registry Requirements

The runtime registry SHALL record:

```yaml
agent:
  agent_id: required
  display_name: required
  role_id: required
  role_version: required
  department_id: required
  team_id: conditional
  hierarchy_level: required

ownership:
  accountable_owner: required
  technical_owner: required
  security_owner: required

configuration:
  prompt_version: required
  policy_version: required
  model_route: required
  fallback_route: required
  tool_policy: required
  memory_policy: required

scope:
  organizations_allowed: required
  projects_allowed: required
  environments_allowed: required
  data_classes_allowed: required

limits:
  financial_limit: required
  token_limit: required
  rate_limit: required
  concurrency_limit: required

assurance:
  evaluation_status: required
  security_review_status: required
  certification_status: required
  last_evaluated_at: required

lifecycle:
  state: required
  activated_at: conditional
  expires_at: required
  suspended_at: conditional
  retired_at: conditional
  last_seen_at: conditional
```

---

## 24. Workforce Reporting Standard

Every workforce report SHALL identify:

- Report time
- Measurement window
- Environment
- Organization
- Project scope
- Lifecycle states included
- Data source
- Query version
- Report owner

A valid report should include:

```yaml
report:
  generated_at: required
  measurement_window: required
  environment: required
  source_registry: required

counts:
  role_documents: required
  approved_role_slots: required
  agent_specifications: required
  provisioned_agents: required
  active_agents: required
  healthy_agents: required
  busy_agents: required
  suspended_agents: required
  concurrent_workers: required
```

A report SHALL NOT publish one number as “total agents” without defining which count it represents.

---

## 25. Capacity Performance Indicators

| KPI | Definition |
|---|---|
| Agent Availability | Healthy available agents / approved active agents |
| Agent Utilization | Busy execution time / available execution time |
| Queue Wait Time | Time between task readiness and task start |
| Task Throughput | Completed eligible tasks per measurement window |
| Acceptance Rate | Accepted outputs / reviewed outputs |
| Failure Rate | Failed executions / total executions |
| Retry Rate | Retried executions / total executions |
| Escalation Rate | Escalated tasks / eligible tasks |
| Cost per Accepted Task | Total task cost / accepted tasks |
| Project Capacity Share | Project usage / total shared capacity |
| Evidence Completion | Valid work envelopes / material completed tasks |
| Capacity Forecast Accuracy | Forecast demand compared with actual demand |

---

## 26. Initial Workforce Targets

The following are planning targets and require approval.

| Metric | Initial Planning Target |
|---|---:|
| Eligible-task completion | At least 95% |
| Accepted output quality | At least 90% |
| Material-task evidence | 100% |
| Cross-project data leakage | 0 tolerated |
| Misleading completion reports | 0 tolerated |
| Agent health visibility | 100% of active agents |
| Project cost attribution | 100% |
| Critical-role coverage | At least two eligible execution paths |
| Review-cycle compliance | At least 95% |
| Suspended-agent execution | 0 tolerated |

---

## 27. Cost and Budget Controls

Every agent or worker must have an attributable cost path.

Costs MAY include:

- Model input tokens
- Model output tokens
- Embeddings
- Vector-database usage
- Compute
- Storage
- Network
- Third-party APIs
- Tool execution
- Observability
- Backup
- Support
- Evaluation

Cost must be attributable to:

```text
Organization
    ↓
Project
    ↓
Department
    ↓
Agent
    ↓
Workflow
    ↓
Task
```

Every project SHALL have:

- Monthly budget
- Daily limit
- Task-class limits
- Model limits
- Alert thresholds
- Emergency override process
- Cost review owner

---

## 28. Resilience and Backup Capacity

Critical workforce capabilities SHALL avoid a single point of failure.

Resilience MAY include:

- Backup agents
- Alternative model routes
- Alternative tool paths
- Queue failover
- Regional failover
- Recovery workers
- Reserved incident capacity
- Manual emergency procedures

Critical roles SHOULD have:

- Primary eligible agent
- Secondary eligible agent
- Approved fallback model
- Suspension procedure
- Recovery procedure
- Escalation owner

---

## 29. Workforce Certification Capacity

Agent certification requires sufficient evaluation capacity.

Evaluation must cover:

- Constitutional knowledge
- Department knowledge
- Role competence
- Tool safety
- Project isolation
- Security
- Privacy
- Quality
- Failure handling
- Escalation
- Verifiable work
- Recovery

Certification SHALL NOT be granted solely because an agent completed training content.

---

## 30. Capacity Governance

The following roles govern workforce capacity.

| Role | Capacity Responsibility |
|---|---|
| Founder | Approves strategic workforce model |
| AI CEO | Approves enterprise workforce priorities |
| CTO | Approves technical runtime capacity |
| COO | Approves operational coverage |
| CFO | Approves budgets and cost limits |
| CHRO | Owns workforce structure and lifecycle |
| CISO | Approves security and access model |
| Department Director | Forecasts departmental demand |
| Project Owner | Forecasts project demand |
| Analytics Director | Owns count and capacity reporting |
| Platform Engineering | Implements runtime scaling |

No single agent may independently approve organizational demand, budget, access, and its own activation.

---

## 31. Capacity Review Cadence

| Frequency | Review |
|---|---|
| Continuous | Agent health, queue depth, model capacity, and critical alerts |
| Daily | Utilization, failures, retries, and project budgets |
| Weekly | Department demand and workflow performance |
| Monthly | Workforce count, cost, quality, and project allocation |
| Quarterly | Organization design and capacity strategy |
| Annually | Full workforce model and department allocation |
| Event-driven | New project, major incident, provider change, or structural change |

---

## 32. Capacity Risks

| Risk | Description | Required Response |
|---|---|---|
| Count inflation | Role files are reported as active agents | Use normalized counting terms |
| Capacity shortage | Tasks exceed available healthy workers | Forecast, reserve, and scale |
| Noisy neighbour | One project consumes shared capacity | Project quotas and fair scheduling |
| Cost explosion | Agent or model usage exceeds value | Budgets, limits, and cost routing |
| False redundancy | Backup agents use the same failing dependency | Independent fallback paths |
| Skill gap | Active agents lack required capability | Evaluation and training |
| Uncontrolled scaling | Workers increase without governance | Approved scaling policies |
| Cross-project leakage | Shared agents retain another project’s context | Strict context isolation |
| Registry drift | Runtime state differs from approved specification | Continuous reconciliation |
| Stale agents | Expired agents remain active | Automatic expiry and suspension |
| Provider dependency | Model provider failure blocks work | Approved fallback routes |
| Misleading reporting | Undefined totals are published | Standard reporting schema |

---

## 33. Decisions Required

The following decisions remain pending.

| Decision | Accountable Owner | Status |
|---|---|---|
| Approve or retire the `258+` statement | Founder | Pending |
| Approve `445` as planned role-slot allocation | Founder and AI CEO | Pending |
| Approve department ownership | AI CEO | Pending |
| Approve runtime capacity model | CTO and COO | Pending |
| Approve budget model | CFO | Pending |
| Approve workforce lifecycle | CHRO | Pending |
| Approve security and identity controls | CISO | Pending |
| Approve reporting definitions | Analytics Director | Pending |
| Approve five-project allocation | Enterprise Portfolio Office | Pending |
| Approve production activation criteria | Founder and C-Suite | Pending |

---

## 34. Promotion Checklist

Before this document becomes canonical:

- [ ] `258+` historical statement resolved
- [ ] `445` role-slot model reviewed
- [ ] Founder approval recorded
- [ ] AI CEO approval recorded
- [ ] CTO runtime-capacity review completed
- [ ] COO operations review completed
- [ ] CFO cost review completed
- [ ] CHRO workforce review completed
- [ ] CISO security review completed
- [ ] Department ownership approved
- [ ] Runtime registry schema approved
- [ ] Agent lifecycle states approved
- [ ] Project-allocation model approved
- [ ] Scaling and reduction rules approved
- [ ] Cost-attribution model approved
- [ ] Reporting definitions approved
- [ ] Runtime evidence linked
- [ ] Related indexes updated
- [ ] Changelog updated
- [ ] `canonical` explicitly changed to `true`

---

## 35. Related Documents

- `docs/01-governance/AI-CONSTITUTION.md`
- `docs/05-workforce/README.md`
- `docs/05-workforce/roles/README.md`
- `docs/19-ai-workforce/README.md`
- `docs/19-ai-workforce/workforce-architecture.md`
- `docs/19-ai-workforce/workforce-operating-model.md`
- `docs/19-ai-workforce/organization/department-structure.md`
- `docs/19-ai-workforce/organization/org-chart.md`
- `docs/19-ai-workforce/roles/role-catalog.md`
- `docs/19-ai-workforce/kpis/agent-kpis.md`
- `docs/19-ai-workforce/kpis/department-kpis.md`
- `docs/20-ai-operating-system/MASTER-BLUEPRINT.md`
- `docs/22-agent-framework/registry/agent-registry.md`
- `docs/22-agent-framework/lifecycle/agent-activation.md`
- `docs/23-multi-agent-system/resource-management/capacity-planning.md`
- `docs/27-model-management/cost-management/budget-management.md`
- `docs/29-observability-platform/agent-monitoring/agent-utilization.md`
- `docs/48-enterprise-roadmap/capacity-planning/capacity.md`

---

## 36. Revision History

| Version | Date | Author | Description |
|---|---|---|---|
| 1.0.0 | 2026-07-18 | AI Workforce Council | Initial workforce capacity baseline and count reconciliation |