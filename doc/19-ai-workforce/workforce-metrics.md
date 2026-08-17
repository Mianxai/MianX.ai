---
id: AIW-METRICS-001
title: Mianx.ai AI Workforce Metrics
version: 1.0.0
status: Draft

type: Enterprise AI Workforce Measurement Framework
class: Governed

owner: Mianx.ai Founder
steward: AI Workforce Council and Enterprise Analytics
authority: Founder and Enterprise Governance

maintainers:
  - AI Workforce Operations
  - Enterprise Analytics
  - Enterprise Governance
  - Enterprise Architecture
  - AI Operating System Team
  - Product Operations
  - Security Governance
  - Data and Privacy Governance
  - Enterprise Quality
  - Finance Governance
  - Platform Operations
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
  - Enterprise Governance
  - Enterprise Architecture
  - Enterprise Analytics
  - AI Operating System Owner
  - Memory Engine Owner
  - Agent Framework Owner
  - Multi-Agent System Owner
  - AI Workforce Operations
  - Product Operations
  - Security Governance
  - Data and Privacy Governance
  - Enterprise Quality
  - Finance Governance
  - Platform Operations
  - Documentation Governance

created: 2026-08-06
updated: 2026-08-06

classification: Internal

audience:
  - Founder
  - Executive Leadership
  - AI Workforce Council
  - Enterprise Governance
  - Enterprise Analytics
  - Department Directors
  - Product Owners
  - Project Owners
  - Program Managers
  - Team Leads
  - Enterprise Architects
  - AI Platform Engineers
  - Security Teams
  - Data and Privacy Teams
  - Quality Teams
  - Finance Teams
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
  - ./workforce-checklists.md
  - ./AGENT-CAPACITY-BASELINE.md
  - ./C-SUITE-AGENT-REGISTRY.md
  - ./VERIFIABLE-WORK-ENVELOPE.md
  - ./organization/organization-structure.md
  - ./organization/department-structure.md
  - ./organization/responsibility-matrix.md
  - ./agents/agent-performance.md
  - ./agents/agent-lifecycle.md
  - ./agents/agent-collaboration.md
  - ./capabilities/capability-registry.md
  - ./capabilities/skill-registry.md
  - ./capabilities/tool-registry.md
  - ./capabilities/model-registry.md
  - ./training/evaluation.md
  - ./training/certification.md
  - ./kpis/agent-kpis.md
  - ./kpis/team-kpis.md
  - ./kpis/department-kpis.md
  - ./kpis/enterprise-kpis.md
  - ./workflows/workflow-engine.md
  - ./workflows/task-assignment.md
  - ./workflows/task-routing.md
  - ./shared-memory/shared-memory.md
  - ./shared-memory/enterprise-memory.md
  - ./policies/security-policy.md
  - ./policies/privacy-policy.md
  - ./policies/compliance-policy.md
  - ../20-ai-operating-system/README.md
  - ../21-memory-engine/README.md
  - ../22-agent-framework/README.md
  - ../23-multi-agent-system/README.md
  - ../41-security-platform/README.md
  - ../42-data-platform/README.md
  - ../44-enterprise-ai/AI-GOVERNANCE.md
  - ../../execution/EXECUTION-BOARD.md

review_cycle:
  - Monthly During Documentation and Implementation
  - Quarterly During Controlled Operation
  - Annually After Stable Production Operation
  - After AI Constitution Change
  - After Enterprise Principles Change
  - After Material Workforce Strategy Change
  - After Material Workforce Governance Change
  - After Material Workforce Architecture Change
  - After Material Workforce Lifecycle Change
  - Before New KPI or Metric Activation
  - Before Executive Dashboard Activation
  - Before Customer-Facing Metric Publication
  - Before Production AI Workforce Reporting
  - After Critical AI, Security, Privacy, Quality, Cost, or Operational Incident
  - Before Canonical Promotion

measurement_horizon:
  current: Documentation and Measurement Definition
  near_term: One-Agent and One-Capability Measurement Proof
  medium_term: Team, Department, Product, and Multi-Project Measurement
  long_term: Production-Controlled Enterprise Workforce Measurement

canonical: false
---

# Mianx.ai AI Workforce Metrics

> **The Mianx.ai AI Workforce Metrics Framework defines how Workforce
> documentation, Roles, Capacity Seats, Agents, Teams, Departments,
> capabilities, Tools, Models, workflows, Products, Projects, Tenants,
> Customers, quality, Security, cost, Reliability, Human review, incidents, and
> enterprise outcomes are measured through governed, attributable, evidence-based,
> decision-useful, privacy-aware, and anti-gaming metrics.**

---

# 1. Document Purpose

This document defines the enterprise measurement framework for the Mianx.ai AI
Workforce.

It establishes:

- measurement principles;
- metric Governance;
- metric ownership;
- metric identity standards;
- metric metadata;
- metric lifecycle;
- measurement dimensions;
- Data-source requirements;
- evidence requirements;
- baseline management;
- target management;
- threshold management;
- alerting;
- documentation-progress metrics;
- Role metrics;
- Capacity Seat metrics;
- Agent lifecycle metrics;
- Agent performance metrics;
- capability metrics;
- Skill metrics;
- Tool metrics;
- Model and provider metrics;
- Team metrics;
- Department metrics;
- Product metrics;
- Project metrics;
- Tenant metrics;
- Customer metrics;
- task and workflow metrics;
- quality metrics;
- evidence metrics;
- Governance metrics;
- Security metrics;
- privacy metrics;
- cost and budget metrics;
- capacity and utilization metrics;
- Reliability and operational metrics;
- incident and escalation metrics;
- evaluation and certification metrics;
- Human-review metrics;
- memory and Knowledge metrics;
- Customer and Product outcome metrics;
- enterprise-value metrics;
- dashboards;
- reports;
- metric quality controls;
- anti-gaming controls;
- audit requirements;
- current-state limitations;
- adoption and approval requirements.

This document defines target measurement requirements.

It does not independently:

- implement analytics;
- create dashboards;
- create Data pipelines;
- define current measured performance;
- approve KPI targets;
- prove runtime instrumentation;
- prove active Agent capacity;
- prove Customer outcomes;
- prove Product outcomes;
- prove Production AI Workforce operation.

---

# 2. Current Authority Status

This document currently has the following state:

```text
DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

METRICS_GOVERNANCE_APPROVAL=PENDING

METRIC_REGISTRY_IMPLEMENTATION=NOT_VERIFIED

DATA_PIPELINE_IMPLEMENTATION=NOT_VERIFIED

RUNTIME_INSTRUMENTATION=NOT_VERIFIED

APPROVED_TARGETS=NOT_DEFINED

PRODUCTION_REPORTING=NOT_AUTHORIZED
```

This document may be used for:

- measurement design;
- KPI design;
- analytics Architecture;
- Data-model preparation;
- dashboard planning;
- reporting design;
- implementation planning;
- control-gap analysis;
- evaluation planning;
- financial planning;
- operational-readiness planning;
- audit preparation.

Current implementation truth remains governed by:

- [`CURRENT-STATE.md`](../CURRENT-STATE.md)
- [`DOCUMENT-STATUS-REGISTRY.md`](../DOCUMENT-STATUS-REGISTRY.md)
- [`EXECUTION-BOARD.md`](../../execution/EXECUTION-BOARD.md)

---

# 3. Measurement Objective

The primary objective is to ensure that Mianx.ai measures verified Workforce
state, behavior, cost, quality, Risk, and outcomes rather than relying on
unsupported claims or activity volume.

```text
Approved Objective
      ↓
Defined Metric
      ↓
Approved Data Source
      ↓
Instrumented Event or Record
      ↓
Validated Data
      ↓
Reproducible Calculation
      ↓
Evidence-Based Report
      ↓
Human Interpretation
      ↓
Decision, Action, or Improvement
```

The framework must make it possible to answer:

- What exactly is being measured?
- Why is it being measured?
- Who owns the metric?
- Which Data source supports it?
- Which formula is used?
- Which period is covered?
- Which scope is included?
- Which scope is excluded?
- Which limitations exist?
- Is the metric current?
- Is the metric verified?
- Does the metric represent activity, output, outcome, or value?
- Which decision should the metric support?
- Can the result be independently reproduced?
- Could the metric be gamed?
- Does the metric expose sensitive information?
- What action follows a threshold breach?

---

# 4. Strategic Alignment

The measurement framework operates inside the official Mianx.ai hierarchy:

```text
Mianx.ai Company and Governance
            ↓
MianX Core Platform
            ↓
Mianx.ai AI Operating System
            ↓
Mianx.ai Shared AI Workforce
            ↓
Industry Operating Systems
            ↓
Customer-Specific Editions
            ↓
Governed Autonomous Enterprise Creation
```

Metrics must preserve this hierarchy.

Workforce metrics must not:

- replace Company strategy;
- replace Product outcomes;
- replace Customer outcomes;
- treat Agent activity as enterprise value;
- treat documentation as implementation;
- treat implementation as Production operation;
- treat high volume as high quality;
- treat low cost as success when quality or Security fails.

---

# 5. Measurement Principles

## 5.1 Evidence Before Numbers

A number without an approved source, formula, scope, and period is not a trusted
metric.

---

## 5.2 Current Truth Before Target State

Target metrics and proposed thresholds must not be reported as current
performance.

---

## 5.3 Outcomes Before Activity

Activity may be measured for operational visibility.

Success must be evaluated through accepted outcomes and enterprise value.

---

## 5.4 State Categories Must Remain Separate

The following must not be combined:

```text
Role Documents

Capacity Seats

Registered Agents

Provisioned Agents

Allocated Agents

Active Agents

Live-Tested Agents

Production-Controlled Agents
```

---

## 5.5 One Metric, One Defined Meaning

A metric name must have one approved formula and interpretation within its
scope.

---

## 5.6 Every Metric Must Have an Owner

Every metric must have:

- business owner;
- Data owner;
- calculation owner;
- reporting owner;
- review owner.

---

## 5.7 Metrics Must Support Decisions

A metric that does not support a decision, alert, review, or improvement should
be challenged.

---

## 5.8 Quality Before Completeness Claims

Missing Data, partial instrumentation, estimation, and uncertainty must be
disclosed.

---

## 5.9 No Metric by Prompt Alone

Agent-generated calculations must be validated against approved Data and
formulas.

---

## 5.10 Privacy and Confidentiality by Design

Metrics must not expose unnecessary:

- Customer Data;
- Tenant Data;
- personal Data;
- secrets;
- confidential Project information;
- protected Agent prompts.

---

## 5.11 Anti-Gaming by Design

Metrics must be designed so that increasing the number does not create harmful
behavior.

---

## 5.12 Comparable Only When Definitions Match

Two values should not be compared when:

- formulas differ;
- scopes differ;
- periods differ;
- Data quality differs;
- lifecycle states differ;
- Risk classes differ.

---

## 5.13 Targets Require Approval

Targets, warning thresholds, critical thresholds, and hard stops require
appropriate ownership and approval.

---

## 5.14 Negative Results Must Remain Visible

Failed evaluations, rejected tasks, incidents, cost overruns, and incomplete
evidence must not be hidden to improve reporting.

---

# 6. Measurement Scope

This framework applies to metrics for:

- documentation;
- Governance;
- Roles;
- Capacity Seats;
- Agent Registries;
- Agent lifecycle;
- Agent performance;
- Teams;
- Departments;
- capabilities;
- skills;
- Tools;
- Models;
- providers;
- prompts;
- workflows;
- tasks;
- allocations;
- delegations;
- permissions;
- approvals;
- evaluations;
- certifications;
- memory;
- Knowledge;
- evidence;
- Product support;
- Project support;
- Tenant operation;
- Customer outcomes;
- cost;
- capacity;
- quality;
- Security;
- privacy;
- incidents;
- operations;
- enterprise value.

---

# 7. Measurement Exclusions

This document does not replace detailed metrics owned by:

- Company Finance;
- Product Analytics;
- Customer Success;
- Security Operations;
- Data Platform;
- Infrastructure Monitoring;
- Human Resources;
- Legal and Compliance;
- Product-specific Industry Operating Systems.

It defines Workforce measurement requirements and integration expectations.

---

# 8. Measurement Architecture

The measurement Architecture contains eight layers:

```text
Layer 1 — Objectives and Decisions

Layer 2 — Metric Definitions

Layer 3 — Instrumentation and Source Records

Layer 4 — Data Validation and Lineage

Layer 5 — Calculation and Aggregation

Layer 6 — Dashboards, Reports, and Alerts

Layer 7 — Human Review and Decision

Layer 8 — Improvement, Audit, and Change Control
```

---

# 9. Metric Governance

Metric Governance controls:

- metric creation;
- metric ownership;
- metric definitions;
- formulas;
- Data sources;
- dimensions;
- aggregation;
- baselines;
- targets;
- thresholds;
- reporting;
- access;
- retention;
- changes;
- deprecation;
- audit.

No material enterprise metric should be introduced without a named owner.

---

# 10. Metric Roles

| Role | Responsibility |
|---|---|
| Metric Business Owner | Owns the business decision supported by the metric |
| Data Owner | Owns the source Data and access rules |
| Metric Steward | Maintains definition, formula, metadata, and lifecycle |
| Calculation Owner | Maintains transformation and calculation logic |
| Quality Owner | Validates metric quality and limitations |
| Security and Privacy Owner | Reviews access, sensitivity, and disclosure |
| Reporting Owner | Maintains reports and dashboards |
| Decision Owner | Acts on the metric |
| Audit Owner | Verifies definition, lineage, and evidence |

One person or function may hold multiple roles where Governance permits.

---

# 11. Metric Identity Standard

Every governed metric should have a stable ID.

Proposed format:

```text
AIW-MET-<DOMAIN>-NNN
```

Examples:

```text
AIW-MET-DOC-001

AIW-MET-AGENT-001

AIW-MET-CAP-001

AIW-MET-SEC-001

AIW-MET-COST-001

AIW-MET-OUTCOME-001
```

Metric IDs must:

- remain unique;
- not be reused;
- remain stable after approval;
- be recorded in a Metric Registry;
- use versioning for material definition changes.

---

# 12. Metric Record

A proposed metric record should contain:

```yaml
metric_id:
metric_version:
name:
description:
metric_domain:
metric_type:

business_question:
decision_supported:
business_owner:
data_owner:
metric_steward:
calculation_owner:
quality_owner:
reporting_owner:

numerator:
denominator:
formula:
unit:
aggregation_method:

source_systems:
source_entities:
source_fields:
lineage_reference:
evidence_reference:

organization_scope:
department_scope:
team_scope:
role_scope:
agent_scope:
capability_scope:
product_scope:
project_scope:
tenant_scope:
customer_scope:
environment_scope:
provider_scope:
tool_scope:
model_scope:
risk_scope:

reporting_period:
refresh_frequency:
measurement_window:
time_zone:

baseline:
target:
warning_threshold:
critical_threshold:
hard_stop_threshold:

data_quality_status:
instrumentation_status:
validation_status:
approval_status:
reporting_status:
lifecycle_status:

privacy_class:
security_class:
retention:
access_policy:

known_limitations:
anti_gaming_controls:
required_actions:
created_at:
updated_at:
review_at:
```

---

# 13. Metric Types

Metrics may be classified as:

```text
Count

Ratio

Percentage

Rate

Duration

Latency

Throughput

Cost

Quality Score

Risk Indicator

Control Indicator

Outcome Indicator

Value Indicator

Compliance Indicator

Maturity Indicator

Composite Index
```

Composite indexes require transparent component definitions.

---

# 14. Metric Domains

Primary metric domains include:

```text
Documentation

Governance

Organization

Roles

Capacity

Agents

Teams

Departments

Capabilities

Skills

Tools

Models and Providers

Tasks and Workflows

Quality

Evidence

Security

Privacy

Cost and Budget

Reliability and Operations

Incidents and Escalations

Evaluation and Certification

Human Review

Memory and Knowledge

Products

Projects

Tenants

Customers

Enterprise Outcomes
```

---

# 15. Metric Lifecycle

The metric lifecycle is:

```text
Metric Need Identified
    ↓
Metric Proposed
    ↓
Definition Designed
    ↓
Data Source Verified
    ↓
Formula Reviewed
    ↓
Security and Privacy Reviewed
    ↓
Approved
    ↓
Instrumented
    ↓
Validated
    ↓
Baseline Established
    ↓
Target Approved
    ↓
Reported
    ↓
Monitored
    ↓
Reviewed
    ↓
Updated, Deprecated, or Retired
    ↓
Archived
```

---

# 16. Metric States

| State | Meaning |
|---|---|
| `Proposed` | Metric idea exists |
| `Defined` | Formula, scope, and purpose are documented |
| `Source Pending` | Required Data source is not available |
| `Approved` | Definition and ownership are approved |
| `Instrumented` | Required events or records are being captured |
| `Validated` | Calculation and Data have been verified |
| `Baseline Established` | Current measured starting point exists |
| `Target Approved` | Target and thresholds are approved |
| `Reporting` | Metric is included in active reporting |
| `Monitored` | Metric is reviewed against thresholds |
| `Restricted` | Reporting is limited because of quality or sensitivity |
| `Deprecated` | Metric should no longer be used for new decisions |
| `Retired` | Metric is no longer active |
| `Archived` | Historical definition and results are preserved |

---

# 17. Metric Change Control

A material metric change must define:

- previous version;
- new version;
- formula change;
- source change;
- scope change;
- dimension change;
- target change;
- threshold change;
- historical comparability impact;
- dashboard impact;
- decision impact;
- migration;
- approval;
- effective date.

Historical results must not be silently recalculated without disclosure.

---

# 18. Measurement Dimensions

Metrics may be segmented by:

- Organization;
- Department;
- Team;
- Role;
- Agent;
- Capability;
- Skill;
- Tool;
- Model;
- provider;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- Risk class;
- task type;
- workflow;
- lifecycle state;
- time period.

Dimensions must be included only when permitted by Data and privacy controls.

---

# 19. Time Dimensions

Time-based reporting should define:

- event time;
- processing time;
- reporting period;
- time zone;
- daily boundary;
- weekly boundary;
- monthly boundary;
- late-arriving Data handling;
- backfill behavior.

Comparisons must use compatible periods.

---

# 20. Reporting Periods

Approved reporting periods may include:

```text
Real Time

Hourly

Daily

Weekly

Monthly

Quarterly

Annual

Rolling 7 Days

Rolling 30 Days

Rolling 90 Days

Project Lifetime

Agent Lifetime

Capability Version Lifetime
```

The reporting period must be visible with the metric.

---

# 21. Source-of-Truth Hierarchy

Metric values should use the strongest available source.

Proposed hierarchy:

```text
Verified Runtime Records

Approved Transactional Records

Protected Audit Records

Validated Monitoring Data

Approved Evaluation Records

Approved Financial Records

Approved Product Analytics

Reviewed Manual Records

Documented Estimates

Unverified Agent-Generated Claims
```

Unverified claims must not be presented as verified metrics.

---

# 22. Data Source Requirements

Every metric must identify:

- source system;
- source owner;
- source entity;
- source field;
- capture method;
- capture frequency;
- retention;
- access;
- quality;
- lineage;
- known gaps.

---

# 23. Metric Evidence

Metric evidence may include:

- source queries;
- source record IDs;
- transformation logic;
- calculation code;
- validation results;
- reconciliation reports;
- approval records;
- dashboard version;
- report version;
- Data-quality assessment;
- audit evidence.

---

# 24. Data Lineage

Data lineage should show:

```text
Source Event or Record
      ↓
Ingestion
      ↓
Validation
      ↓
Transformation
      ↓
Aggregation
      ↓
Metric Calculation
      ↓
Dashboard or Report
      ↓
Decision
```

A metric without understandable lineage should remain restricted.

---

# 25. Data Quality Dimensions

Metric Data quality should be assessed through:

- completeness;
- accuracy;
- consistency;
- timeliness;
- validity;
- uniqueness;
- traceability;
- reproducibility;
- confidentiality;
- availability.

---

# 26. Data Quality Status

A proposed quality status model is:

```text
Q0 — Unknown

Q1 — Partial and Unverified

Q2 — Reviewed With Known Gaps

Q3 — Validated for Internal Decisions

Q4 — Audited for High-Risk Decisions

Q5 — Approved for External or Contractual Reporting
```

A higher quality status requires stronger evidence.

---

# 27. Estimated Metrics

Estimated values must be labelled clearly.

An estimated metric should identify:

- estimation method;
- assumptions;
- confidence level;
- excluded Data;
- reason direct measurement is unavailable;
- expiry or review date.

Estimated values must not be mixed silently with measured values.

---

# 28. Baseline

A baseline is the verified starting value used for comparison.

A baseline must define:

- period;
- scope;
- formula;
- Data source;
- quality status;
- approval;
- known limitations.

No baseline should be invented for presentation.

---

# 29. Target

A target is an approved desired future value.

A target must define:

- baseline;
- target value;
- target period;
- accountable owner;
- business reason;
- Risk;
- investment assumption;
- quality assumption;
- approval;
- review date.

A target is not current performance.

---

# 30. Thresholds

Threshold types may include:

```text
Informational

Warning

Critical

Approval Required

Hard Stop

Emergency Escalation
```

Every threshold should define the required action.

---

# 31. Threshold Record

A threshold should define:

```yaml
metric_id:
threshold_type:
threshold_value:
comparison_operator:
measurement_window:
minimum_sample_size:
required_action:
owner:
escalation_path:
cooldown_period:
approved_by:
effective_at:
review_at:
```

---

# 32. Alerting

Alerts should be:

- actionable;
- attributable;
- deduplicated;
- severity-classified;
- scope-aware;
- routed to an owner;
- linked to evidence;
- reviewable.

Alerts without an owner or action should be challenged.

---

# 33. Alert Severity

| Severity | Meaning |
|---|---|
| `A0` | Informational |
| `A1` | Early warning |
| `A2` | Material deviation requiring review |
| `A3` | Critical operational, quality, cost, Security, or Customer issue |
| `A4` | Emergency requiring immediate containment or Founder escalation |

---

# 34. Documentation Progress Metrics

Documentation metrics may include:

- total planned documents;
- content-bearing documents;
- empty placeholders;
- documents in review;
- approved documents;
- canonical documents;
- deprecated documents;
- archived documents;
- documents with valid metadata;
- documents with valid owners;
- documents with valid links;
- documents overdue for review;
- duplicate-authority findings;
- broken-link count;
- unresolved status conflicts.

Documentation count must not be reported as runtime capability.

---

# 35. Documentation Completion Rate

Proposed formula:

```text
Documentation Completion Rate
=
Content-Bearing Planned Documents
/
Total Planned Documents
× 100
```

This metric must disclose:

- what qualifies as content-bearing;
- whether content has been reviewed;
- whether content has been approved;
- whether content is canonical.

---

# 36. Documentation Approval Rate

```text
Documentation Approval Rate
=
Approved Documents
/
Content-Bearing Documents
× 100
```

Draft documents must not be counted as approved.

---

# 37. Canonical Coverage

```text
Canonical Coverage
=
Active Canonical Documents
/
Documents Requiring Canonical Authority
× 100
```

Canonical coverage requires a defined canonical-document scope.

---

# 38. Documentation Quality Metrics

Potential documentation-quality metrics include:

- metadata completeness;
- owner completeness;
- dependency completeness;
- link validity;
- duplicate-topic findings;
- current-state truth alignment;
- unsupported-claim findings;
- review completion;
- revision-history completeness;
- Changelog completeness.

---

# 39. Role Metrics

Role metrics may include:

- proposed Roles;
- approved Roles;
- active Role definitions;
- Roles in review;
- duplicate Role findings;
- Roles without owners;
- Roles without measurable outcomes;
- Roles without Skill requirements;
- Roles without authority definitions;
- Roles without prohibited actions;
- Roles overdue for review;
- deprecated Roles;
- retired Roles.

---

# 40. Role Coverage

```text
Role Coverage
=
Approved Roles With Complete Required Metadata
/
Approved Roles
× 100
```

Required metadata must be defined before calculation.

---

# 41. Role Overlap Rate

```text
Role Overlap Rate
=
Roles With Unresolved Responsibility Overlap
/
Reviewed Roles
× 100
```

Overlap requires substantive responsibility analysis.

Similar titles alone do not prove overlap.

---

# 42. Capacity Seat Metrics

Capacity Seat metrics may include:

- proposed Capacity Seats;
- approved Capacity Seats;
- reserved Capacity Seats;
- filled Capacity Seats;
- unfilled Capacity Seats;
- suspended Capacity Seats;
- closed Capacity Seats;
- seats without verified demand;
- seats without budget;
- seats overdue for review.

---

# 43. Capacity Seat Fill Rate

```text
Capacity Seat Fill Rate
=
Filled Approved Capacity Seats
/
Approved Capacity Seats
× 100
```

A filled Seat must reference a valid registered Agent.

---

# 44. Agent Inventory Metrics

Agent inventory must report separately:

```text
Proposed Agents

Approved Agents

Registered Agents

Provisioned Agents

Evaluated Agents

Certified Agents

Allocated Agents

Active Agents

Live-Tested Agents

Production-Controlled Agents

Restricted Agents

Suspended Agents

Retired Agents

Archived Agents
```

No combined total should hide lifecycle distinctions.

---

# 45. Agent Ownership Coverage

```text
Agent Ownership Coverage
=
Agents With Active Accountable Human Owners
/
Registered Agents
× 100
```

An AI Agent cannot be the sole accountable Human owner.

---

# 46. Agent Allocation Validity

```text
Agent Allocation Validity Rate
=
Active Agents With Valid Non-Expired Allocations
/
Active Agents
× 100
```

An Active Agent without valid allocation is a control failure.

---

# 47. Agent Permission Validity

```text
Agent Permission Validity Rate
=
Active Agents With Valid Approved Permission Profiles
/
Active Agents
× 100
```

---

# 48. Agent Evaluation Coverage

```text
Agent Evaluation Coverage
=
Active Agents With Current Required Evaluations
/
Active Agents
× 100
```

Expired or mismatched evaluations must not be counted.

---

# 49. Agent Certification Coverage

```text
Agent Certification Coverage
=
Agents Requiring Certification With Valid Certification
/
Agents Requiring Certification
× 100
```

---

# 50. Agent Monitoring Coverage

```text
Agent Monitoring Coverage
=
Active Agents With Required Monitoring Active
/
Active Agents
× 100
```

---

# 51. Agent Suspension Readiness

```text
Agent Suspension Readiness
=
Active Agents With Tested Suspension Mechanisms
/
Active Agents
× 100
```

A documented kill switch does not count as tested.

---

# 52. Agent Lifecycle Transition Metrics

Potential transition metrics include:

- transition requests;
- approved transitions;
- rejected transitions;
- failed transitions;
- unauthorized transition attempts;
- emergency transitions;
- transitions missing evidence;
- average transition-review time;
- average activation time;
- average suspension time;
- average retirement-completion time;
- state inconsistencies.

---

# 53. Agent Task Success Rate

```text
Agent Task Success Rate
=
Accepted Completed Tasks
/
Eligible Completed Tasks
× 100
```

The denominator must define whether cancelled, deferred, and invalid tasks are
excluded.

---

# 54. First-Pass Acceptance Rate

```text
First-Pass Acceptance Rate
=
Tasks Accepted Without Rework
/
Tasks Submitted for First Review
× 100
```

This metric should be paired with Risk and complexity dimensions.

---

# 55. Agent Rework Rate

```text
Agent Rework Rate
=
Tasks Requiring One or More Rework Cycles
/
Tasks Submitted for Review
× 100
```

Low rework is not automatically good if review quality is weak.

---

# 56. Agent Rejection Rate

```text
Agent Rejection Rate
=
Rejected Tasks
/
Tasks Submitted for Review
× 100
```

Rejected work must remain visible.

---

# 57. Agent Escalation Rate

```text
Agent Escalation Rate
=
Tasks With Valid Escalation
/
Executed Tasks
× 100
```

A lower escalation rate is not always better.

Correct escalation may indicate safe behavior.

---

# 58. Agent Policy Compliance Rate

```text
Agent Policy Compliance Rate
=
Evaluated Actions Without Confirmed Policy Violation
/
Evaluated Actions
× 100
```

The metric requires defined monitoring coverage.

---

# 59. Agent Evidence Completeness

```text
Agent Evidence Completeness Rate
=
Tasks Meeting All Required Evidence Fields
/
Tasks Requiring Verifiable Evidence
× 100
```

---

# 60. Agent Cost per Accepted Task

```text
Agent Cost per Accepted Task
=
Total Attributed Agent Execution Cost
/
Accepted Tasks
```

The cost definition should include:

- Model cost;
- Tool cost;
- infrastructure cost;
- Human-review cost where available;
- retry and failed-execution cost.

---

# 61. Capability Portfolio Metrics

Capability metrics may include:

- proposed capabilities;
- designed capabilities;
- approved capabilities;
- implemented capabilities;
- evaluated capabilities;
- certified capabilities;
- available capabilities;
- active capabilities;
- Production-controlled capabilities;
- suspended capabilities;
- deprecated capabilities;
- retired capabilities.

---

# 62. Capability Evaluation Coverage

```text
Capability Evaluation Coverage
=
Active Capabilities With Current Evaluation
/
Active Capabilities
× 100
```

---

# 63. Capability Reuse Rate

```text
Capability Reuse Rate
=
Capability Invocations Using Approved Shared Capabilities
/
Eligible Capability Invocations
× 100
```

Reuse must not be increased by violating Product, Project, or Tenant isolation.

---

# 64. Capability Outcome Acceptance Rate

```text
Capability Outcome Acceptance Rate
=
Accepted Outputs Produced Through the Capability
/
Reviewed Outputs Produced Through the Capability
× 100
```

---

# 65. Capability Cost Efficiency

```text
Capability Cost Efficiency
=
Accepted Outcomes
/
Total Attributed Capability Cost
```

This may also be reported as cost per accepted outcome.

---

# 66. Capability Incident Rate

```text
Capability Incident Rate
=
Confirmed Capability-Related Incidents
/
Capability Executions
× Normalization Factor
```

The normalization factor must be defined.

---

# 67. Skill Metrics

Skill metrics may include:

- defined Skills;
- approved Skills;
- Skills with evaluation methods;
- Skills requiring certification;
- certified Agents per Skill;
- Skill evaluation pass rate;
- Skill expiry rate;
- Skills overdue for review;
- Skill gaps by Role;
- Skill gaps by capability.

---

# 68. Skill Coverage

```text
Skill Coverage
=
Required Role Skills With Approved Skill Definitions
/
Required Role Skills
× 100
```

---

# 69. Tool Portfolio Metrics

Tool metrics may include:

- proposed Tools;
- approved Tools;
- integrated Tools;
- active Tools;
- suspended Tools;
- deprecated Tools;
- retired Tools;
- Tools without owners;
- Tools without action inventories;
- Tools without Security review;
- Tools without suspension methods;
- Tools overdue for review.

---

# 70. Tool Authorization Denial Rate

```text
Tool Authorization Denial Rate
=
Denied Tool Actions
/
Attempted Tool Actions
× 100
```

A high rate may indicate attack, misconfiguration, or poor routing.

---

# 71. Tool Success Rate

```text
Tool Success Rate
=
Successful Authorized Tool Calls
/
Authorized Tool Calls
× 100
```

---

# 72. Tool Error Rate

```text
Tool Error Rate
=
Failed Authorized Tool Calls
/
Authorized Tool Calls
× 100
```

Errors should be segmented by:

- Agent;
- Tool;
- action;
- Product;
- Project;
- Tenant;
- environment;
- failure class.

---

# 73. Tool Cost Metrics

Potential Tool cost metrics include:

- cost per call;
- cost per successful call;
- cost per accepted outcome;
- cost by Product;
- cost by Project;
- cost by Tenant;
- cost by Agent;
- cost by capability;
- unused Tool subscription cost.

---

# 74. Model Portfolio Metrics

Model metrics may include:

- approved Models;
- active Models;
- fallback Models;
- suspended Models;
- deprecated Models;
- retired Models;
- Models overdue for evaluation;
- Models without Data review;
- Models without cost profiles;
- Models without fallback plans.

---

# 75. Model Invocation Success Rate

```text
Model Invocation Success Rate
=
Successful Approved Model Invocations
/
Approved Model Invocation Attempts
× 100
```

---

# 76. Model Output Acceptance Rate

```text
Model Output Acceptance Rate
=
Model Outputs Accepted After Required Review
/
Model Outputs Reviewed
× 100
```

---

# 77. Model Cost per Accepted Outcome

```text
Model Cost per Accepted Outcome
=
Total Model Cost
/
Accepted Outcomes Using the Model
```

---

# 78. Model Fallback Rate

```text
Model Fallback Rate
=
Executions Using a Fallback Model
/
Executions With a Primary Model Configured
× 100
```

Fallback must remain policy-compliant.

---

# 79. Provider Concentration

```text
Provider Concentration Rate
=
Cost or Invocation Volume of Largest Provider
/
Total Provider Cost or Invocation Volume
× 100
```

The selected basis must be stated.

---

# 80. Provider Availability

```text
Provider Availability
=
Successful Provider Availability Intervals
/
Measured Provider Intervals
× 100
```

Availability must be measured from Mianx.ai’s operating perspective.

---

# 81. Team Metrics

Team metrics may include:

- active Teams;
- temporary Teams;
- Teams with valid owners;
- Teams with valid scopes;
- Team task success;
- Team rework;
- Team handoff quality;
- Team cost;
- Team incidents;
- Team evidence completeness;
- Team closure quality;
- Team membership changes.

---

# 82. Team Delivery Reliability

```text
Team Delivery Reliability
=
Accepted Team Deliverables Completed Within Approved Commitments
/
Accepted Team Commitments
× 100
```

Commitment quality must be reviewed to prevent under-committing.

---

# 83. Team Handoff Completeness

```text
Team Handoff Completeness
=
Handoffs Meeting Required Handoff Fields
/
Material Handoffs
× 100
```

---

# 84. Team Collaboration Quality

Team collaboration quality may use a composite of:

- handoff completeness;
- dependency visibility;
- rework caused by communication gaps;
- conflict-resolution time;
- evidence aggregation;
- reviewer feedback.

Composite scoring requires transparent weights.

---

# 85. Department Metrics

Department metrics may include:

- approved Departments;
- active Departments;
- documented Departments;
- Departments with service catalogues;
- Departments with valid owners;
- Departments with approved Roles;
- Departments with budget owners;
- Departments with Security owners;
- Department capacity;
- Department utilization;
- Department cost;
- Department outcome performance;
- Department incident rate.

---

# 86. Department Service Fulfilment

```text
Department Service Fulfilment Rate
=
Accepted Service Requests Completed
/
Eligible Service Requests
× 100
```

---

# 87. Department Cost per Accepted Outcome

```text
Department Cost per Accepted Outcome
=
Total Attributed Department Cost
/
Accepted Department Outcomes
```

Outcome definitions must be department-specific.

---

# 88. Product Metrics

Product-level Workforce metrics may include:

- allocated Agents;
- active capabilities;
- Workforce cost;
- accepted Product tasks;
- Product rework;
- defects introduced;
- defects detected;
- delivery-cycle time;
- capability reuse;
- Product incidents;
- Product outcome improvement;
- Product Margin impact where available.

---

# 89. Product Workforce Contribution

A Product Workforce contribution report should distinguish:

- work requested;
- work completed;
- work accepted;
- Product outcome;
- cost;
- Human effort;
- rework;
- incidents;
- reusable Knowledge created.

---

# 90. Project Metrics

Project metrics may include:

- allocated Agents;
- active Team members;
- active capabilities;
- open tasks;
- blocked tasks;
- accepted tasks;
- Project cost;
- Project evidence completeness;
- Project incidents;
- milestone reliability;
- cross-Project access denials;
- Project closure completeness.

---

# 91. Project Isolation Metrics

Potential Project-isolation metrics include:

- cross-Project access attempts;
- denied cross-Project requests;
- confirmed Project leakage incidents;
- isolation-test pass rate;
- Project memory-isolation pass rate;
- Project secret-isolation pass rate.

---

# 92. Tenant Metrics

Tenant metrics may include:

- active Tenant-scoped Agents;
- Tenant-scoped capability invocations;
- Tenant cost;
- Tenant task success;
- Tenant incidents;
- Tenant isolation-test status;
- Tenant access denials;
- Tenant memory-isolation status;
- Tenant evidence coverage.

---

# 93. Tenant Isolation Test Pass Rate

```text
Tenant Isolation Test Pass Rate
=
Passed Tenant Isolation Tests
/
Executed Tenant Isolation Tests
× 100
```

The test suite and coverage must be identified.

---

# 94. Customer Metrics

Customer-level Workforce metrics may include:

- Customer requests;
- Customer tasks;
- accepted Customer outcomes;
- response time;
- resolution time;
- rework;
- incidents;
- Customer Data access;
- Customer communication review;
- cost;
- satisfaction where validly measured;
- contract-specific service metrics.

Customer metrics must preserve confidentiality.

---

# 95. Customer Outcome Rate

```text
Customer Outcome Rate
=
Verified Customer Outcomes Achieved
/
Approved Customer Outcomes Measured
× 100
```

The outcome must be defined by the relevant Product and Customer agreement.

---

# 96. Task Metrics

Task metrics may include:

- tasks created;
- tasks assigned;
- tasks accepted;
- tasks running;
- tasks blocked;
- tasks awaiting approval;
- tasks in review;
- tasks completed;
- tasks accepted;
- tasks rejected;
- tasks cancelled;
- tasks failed;
- tasks suspended;
- tasks overdue.

---

# 97. Task Cycle Time

```text
Task Cycle Time
=
Task Closure Time
-
Task Ready Time
```

Cycle time should be segmented by:

- task type;
- Risk;
- Product;
- Project;
- Agent;
- capability;
- environment.

---

# 98. Task Execution Time

```text
Task Execution Time
=
Execution End Time
-
Execution Start Time
```

Execution time is different from total cycle time.

---

# 99. Task Queue Time

```text
Task Queue Time
=
Execution Start Time
-
Task Ready Time
```

---

# 100. Task Review Time

```text
Task Review Time
=
Review Decision Time
-
Review Submission Time
```

---

# 101. Task Blocked Time

```text
Task Blocked Time
=
Sum of Time Spent in Blocked State
```

Blocked time should be attributed to blocking reason where possible.

---

# 102. Workflow Metrics

Workflow metrics may include:

- workflow executions;
- successful executions;
- failed executions;
- suspended executions;
- average duration;
- step failure;
- approval wait time;
- retry count;
- timeout count;
- rollback count;
- workflow incident rate;
- evidence completeness;
- cost per execution.

---

# 103. Workflow Success Rate

```text
Workflow Success Rate
=
Successfully Accepted Workflow Executions
/
Eligible Completed Workflow Executions
× 100
```

---

# 104. Workflow Retry Rate

```text
Workflow Retry Rate
=
Workflow Executions With One or More Retries
/
Workflow Executions
× 100
```

---

# 105. Workflow Approval Delay

```text
Workflow Approval Delay
=
Approval Decision Time
-
Approval Request Time
```

---

# 106. Quality Metrics

Quality metrics may include:

- acceptance rate;
- first-pass acceptance;
- rework;
- rejection;
- defect rate;
- factual-error rate;
- regression rate;
- test-pass rate;
- Security defect rate;
- evidence completeness;
- maintainability findings;
- Customer-reported quality issues;
- reviewer correction rate.

---

# 107. Defect Rate

```text
Defect Rate
=
Confirmed Defects Attributed to Workforce Output
/
Accepted Workforce Deliverables
× Normalization Factor
```

The normalization factor and defect severity must be defined.

---

# 108. Factual Error Rate

```text
Factual Error Rate
=
Confirmed Material Factual Errors
/
Reviewed Factual Claims
× 100
```

The review sample and verification method must be disclosed.

---

# 109. Test Pass Rate

```text
Test Pass Rate
=
Passed Required Tests
/
Executed Required Tests
× 100
```

Missing tests must not be counted as passed.

---

# 110. Evidence Metrics

Evidence metrics may include:

- Verifiable-Work Envelopes created;
- evidence envelopes complete;
- envelopes missing authority evidence;
- envelopes missing Tool records;
- envelopes missing Model records;
- envelopes missing tests;
- envelopes missing cost;
- envelopes missing review;
- envelopes rejected;
- evidence-integrity failures;
- evidence-retention failures.

---

# 111. Evidence Completeness Rate

```text
Evidence Completeness Rate
=
Evidence Envelopes Meeting All Required Fields
/
Evidence Envelopes Required
× 100
```

---

# 112. Evidence Validity Rate

```text
Evidence Validity Rate
=
Evidence Envelopes Accepted After Validation
/
Evidence Envelopes Validated
× 100
```

---

# 113. Governance Metrics

Governance metrics may include:

- Agents with valid owners;
- Agents with valid authority;
- Agents with valid allocation;
- high-risk actions with Human approval;
- expired approvals;
- expired delegations;
- open exceptions;
- expired exceptions;
- unresolved Governance conflicts;
- Governance-review completion;
- unauthorized transition attempts;
- policy violations;
- Founder decisions pending.

---

# 114. Human Approval Coverage

```text
Human Approval Coverage
=
High-Risk Actions With Required Human Approval
/
High-Risk Actions Requiring Human Approval
× 100
```

---

# 115. Exception Expiry Compliance

```text
Exception Expiry Compliance
=
Expired Exceptions Closed or Renewed Through Valid Review
/
Expired Exceptions
× 100
```

---

# 116. Security Metrics

Security metrics may include:

- authentication failures;
- authorization denials;
- permission violations;
- cross-Tenant attempts;
- cross-Project attempts;
- Tool-policy violations;
- Model-policy violations;
- secret-access anomalies;
- secret exposures;
- prompt-injection detections;
- memory-security alerts;
- suspended Agents;
- kill-switch events;
- Security incidents;
- vulnerability backlog;
- access-review completion.

---

# 117. Unauthorized Action Rate

```text
Unauthorized Action Rate
=
Confirmed Unauthorized Actions
/
Observed Material Actions
× 100
```

Confirmed attempts and confirmed successful unauthorized actions should be
reported separately.

---

# 118. Cross-Tenant Access Attempt Rate

```text
Cross-Tenant Access Attempt Rate
=
Detected Unauthorized Cross-Tenant Attempts
/
Tenant-Scoped Access Requests
× 100
```

A zero value is meaningful only when detection coverage is sufficient.

---

# 119. Secret Exposure Rate

```text
Secret Exposure Rate
=
Confirmed Secret Exposure Incidents
/
Measured Period
```

Secret exposure should generally be reported as an absolute incident count and
severity, not normalized only.

---

# 120. Security Control Coverage

```text
Security Control Coverage
=
Required Security Controls With Verified Implementation
/
Required Security Controls
× 100
```

Documented controls must not be counted as implemented controls.

---

# 121. Privacy Metrics

Privacy metrics may include:

- personal-Data processing events;
- sensitive-Data processing events;
- approved purposes;
- purpose violations;
- retention violations;
- deletion-request completion;
- Data-minimization review completion;
- provider privacy-review completion;
- cross-border processing exceptions;
- Customer Data incidents.

---

# 122. Privacy Review Coverage

```text
Privacy Review Coverage
=
High-Risk Data Uses With Completed Privacy Review
/
High-Risk Data Uses Requiring Privacy Review
× 100
```

---

# 123. Data Minimization Compliance

```text
Data Minimization Compliance
=
Reviewed AI Executions Using Only Approved Necessary Data
/
Reviewed AI Executions
× 100
```

---

# 124. Cost Metrics

Cost metrics should include:

- Model cost;
- provider cost;
- Tool cost;
- infrastructure cost;
- storage cost;
- network cost;
- Human-review cost;
- support cost;
- incident cost;
- failed-execution cost;
- rework cost;
- total Workforce cost.

---

# 125. Cost Attribution Coverage

```text
Cost Attribution Coverage
=
Workforce Cost Assigned to Approved Dimensions
/
Total Recorded Workforce Cost
× 100
```

Approved dimensions may include:

- Agent;
- Team;
- Department;
- capability;
- Product;
- Project;
- Tenant;
- Customer;
- Tool;
- Model;
- provider.

---

# 126. Cost per Accepted Outcome

```text
Cost per Accepted Outcome
=
Total Attributed Workforce Cost
/
Accepted Outcomes
```

The outcome definition must be explicit.

---

# 127. Budget Utilization

```text
Budget Utilization
=
Actual Attributed Cost
/
Approved Budget
× 100
```

Budget utilization should not reward spending for its own sake.

---

# 128. Budget Variance

```text
Budget Variance
=
Actual Attributed Cost
-
Approved Planned Cost
```

It may also be reported as a percentage.

---

# 129. Failed-Execution Cost Rate

```text
Failed-Execution Cost Rate
=
Cost of Failed or Rejected Executions
/
Total Workforce Execution Cost
× 100
```

---

# 130. Provider Cost Concentration

```text
Provider Cost Concentration
=
Cost of Largest Provider
/
Total Provider Cost
× 100
```

---

# 131. Capacity Metrics

Capacity metrics must distinguish:

```text
Planned Role Capacity

Approved Capacity Seats

Registered Agent Capacity

Provisioned Agent Capacity

Allocated Agent Capacity

Active Agent Capacity

Concurrent Execution Capacity

Tool Capacity

Model Provider Capacity

Human Review Capacity

Operational Support Capacity

Budget Capacity
```

---

# 132. Active Capacity

Active capacity should be calculated only from Agents that are:

- registered;
- provisioned;
- allocated;
- authorized;
- evaluated;
- not suspended;
- available within the measured period.

---

# 133. Capacity Utilization

A proposed utilization formula is:

```text
Capacity Utilization
=
Consumed Approved Execution Capacity
/
Available Approved Execution Capacity
× 100
```

The unit may be:

- concurrent slots;
- task hours;
- approved execution units;
- provider units;
- Human-review hours.

The unit must be stated.

---

# 134. Queue Saturation

```text
Queue Saturation
=
Queued Eligible Work
/
Available Processing Capacity
```

Interpretation depends on the measurement window.

---

# 135. Human Review Capacity Utilization

```text
Human Review Capacity Utilization
=
Consumed Human Review Time
/
Available Approved Human Review Time
× 100
```

High utilization may create review fatigue and quality Risk.

---

# 136. Capacity Forecast Accuracy

```text
Capacity Forecast Accuracy
=
1
-
Absolute Difference Between Forecast and Actual Demand
/
Actual Demand
```

Alternative formulas may be used if approved and documented.

---

# 137. Reliability Metrics

Reliability metrics may include:

- execution success;
- workflow success;
- Agent availability;
- Tool availability;
- Model-provider availability;
- timeout rate;
- retry rate;
- recovery success;
- queue persistence;
- duplicate execution;
- state consistency;
- monitoring coverage;
- audit coverage.

---

# 138. Agent Availability

```text
Agent Availability
=
Time Agent Was Eligible and Available for Approved Work
/
Scheduled Eligible Time
× 100
```

Suspended and intentionally offline periods should be handled explicitly.

---

# 139. Execution Failure Rate

```text
Execution Failure Rate
=
Failed Executions
/
Started Executions
× 100
```

Failures should be segmented by cause.

---

# 140. Recovery Success Rate

```text
Recovery Success Rate
=
Incidents or Failures Restored to Verified Safe Operation
/
Recovery Attempts
× 100
```

---

# 141. Suspension Effectiveness

```text
Suspension Effectiveness
=
Suspension Tests or Events Successfully Blocking New Execution
/
Suspension Tests or Events
× 100
```

---

# 142. Monitoring Coverage

```text
Monitoring Coverage
=
Active Runtime Entities With Required Monitoring
/
Active Runtime Entities Requiring Monitoring
× 100
```

---

# 143. Audit Coverage

```text
Audit Coverage
=
Material Actions With Required Audit Records
/
Material Actions Requiring Audit
× 100
```

---

# 144. Operational Metrics

Operational metrics may include:

- queue depth;
- queue age;
- task latency;
- workflow duration;
- approval backlog;
- incident backlog;
- suspended-entity backlog;
- expired-allocation backlog;
- unresolved-alert backlog;
- recovery time;
- support response time;
- change-failure rate.

---

# 145. Mean Time to Detect

```text
MTTD
=
Average of
Incident Detection Time
-
Incident Start Time
```

When incident start time is estimated, this limitation must be disclosed.

---

# 146. Mean Time to Contain

```text
MTTC
=
Average of
Containment Time
-
Detection Time
```

---

# 147. Mean Time to Recover

```text
MTTR
=
Average of
Verified Recovery Time
-
Incident Start or Detection Time
```

The chosen start point must remain consistent.

---

# 148. Incident Metrics

Incident metrics may include:

- incidents by severity;
- incidents by Agent;
- incidents by capability;
- incidents by Product;
- incidents by Project;
- incidents by Tenant;
- incidents by Tool;
- incidents by Model;
- repeated incidents;
- open incidents;
- overdue incidents;
- containment time;
- recovery time;
- closure quality;
- follow-up completion.

---

# 149. Incident Recurrence Rate

```text
Incident Recurrence Rate
=
Repeated Incidents With the Same Root Cause
/
Closed Incidents
× 100
```

---

# 150. Incident Follow-Up Completion

```text
Incident Follow-Up Completion Rate
=
Completed Required Follow-Up Actions
/
Required Follow-Up Actions
× 100
```

---

# 151. Escalation Metrics

Escalation metrics may include:

- total escalations;
- valid escalations;
- unnecessary escalations;
- late escalations;
- missed escalations;
- escalation response time;
- escalation resolution time;
- escalations by Risk;
- escalations by Agent;
- escalations reaching Founder authority.

---

# 152. Escalation Response Time

```text
Escalation Response Time
=
First Authorized Response Time
-
Escalation Creation Time
```

---

# 153. Evaluation Metrics

Evaluation metrics may include:

- evaluation coverage;
- evaluation pass rate;
- conditional pass rate;
- failure rate;
- re-evaluation rate;
- expired evaluations;
- evaluation backlog;
- evaluation completion time;
- evaluation defect detection;
- evaluation false-positive and false-negative findings where measurable.

---

# 154. Evaluation Pass Rate

```text
Evaluation Pass Rate
=
Passed Evaluations
/
Completed Valid Evaluations
× 100
```

Conditional passes should be reported separately.

---

# 155. Certification Metrics

Certification metrics may include:

- certifications issued;
- valid certifications;
- certifications near expiry;
- expired certifications;
- suspended certifications;
- revoked certifications;
- renewal completion;
- certification coverage;
- certified high-risk Agents.

---

# 156. Certification Validity Rate

```text
Certification Validity Rate
=
Agents Requiring Certification With Current Valid Certification
/
Agents Requiring Certification
× 100
```

---

# 157. Human Review Metrics

Human-review metrics may include:

- review volume;
- review backlog;
- review cycle time;
- first-pass acceptance;
- reviewer disagreement;
- correction rate;
- review fatigue indicators;
- review quality audits;
- high-risk review coverage;
- independent-review coverage.

---

# 158. Human Correction Rate

```text
Human Correction Rate
=
Reviewed Outputs Requiring Material Human Correction
/
Reviewed Outputs
× 100
```

This metric should be interpreted with Risk and task complexity.

---

# 159. Independent Review Coverage

```text
Independent Review Coverage
=
High-Risk Outputs Reviewed by an Independent Qualified Reviewer
/
High-Risk Outputs Requiring Independent Review
× 100
```

---

# 160. Reviewer Agreement

```text
Reviewer Agreement Rate
=
Multi-Reviewer Decisions Reaching the Same Outcome
/
Multi-Reviewer Decisions
× 100
```

Low agreement may indicate ambiguous standards.

---

# 161. Memory Metrics

Memory metrics may include:

- memory reads;
- memory writes;
- denied memory access;
- memory writes with valid provenance;
- memory writes reviewed;
- stale memory;
- corrected memory;
- quarantined memory;
- deleted memory;
- cross-scope access attempts;
- retention-policy compliance.

---

# 162. Memory Provenance Coverage

```text
Memory Provenance Coverage
=
Memory Records With Required Source and Ownership Metadata
/
Memory Records Requiring Provenance
× 100
```

---

# 163. Memory Isolation Test Pass Rate

```text
Memory Isolation Test Pass Rate
=
Passed Memory-Isolation Tests
/
Executed Memory-Isolation Tests
× 100
```

---

# 164. Knowledge Metrics

Knowledge metrics may include:

- learning candidates;
- reviewed learning candidates;
- approved Knowledge assets;
- rejected Knowledge candidates;
- Knowledge assets with provenance;
- Knowledge assets overdue for review;
- corrected Knowledge;
- superseded Knowledge;
- deprecated Knowledge;
- Customer-restricted Knowledge;
- Knowledge reuse.

---

# 165. Knowledge Promotion Acceptance Rate

```text
Knowledge Promotion Acceptance Rate
=
Approved Knowledge Assets
/
Reviewed Learning Candidates
× 100
```

A higher rate is not automatically better.

---

# 166. Knowledge Provenance Coverage

```text
Knowledge Provenance Coverage
=
Knowledge Assets With Required Source and Evidence References
/
Governed Knowledge Assets
× 100
```

---

# 167. Knowledge Freshness

Knowledge freshness may measure:

- age since last review;
- age since source verification;
- age since Product change;
- age since policy change.

Freshness requirements must be domain-specific.

---

# 168. Product Outcome Metrics

Product outcome metrics should be defined by Product owners.

Potential examples include:

- feature delivery time;
- requirement clarity;
- defect reduction;
- deployment reliability;
- Product adoption;
- user success;
- conversion;
- retention;
- operational efficiency;
- Product Margin.

Workforce contribution must be separated from total Product outcome where
causality is uncertain.

---

# 169. Customer Outcome Metrics

Customer outcome metrics may include:

- response-time improvement;
- resolution-time improvement;
- error reduction;
- process-cycle reduction;
- operational visibility;
- Customer satisfaction;
- support quality;
- measurable cost reduction;
- revenue improvement where attributable.

Customer outcome metrics require Customer and Product context.

---

# 170. Enterprise Value Metrics

Enterprise-value metrics may include:

- verified Human time saved;
- delivery-time improvement;
- defect-cost reduction;
- capability reuse;
- avoided duplicate implementation;
- operational-risk reduction;
- Customer outcome improvement;
- Product Margin improvement;
- Knowledge reuse;
- incident reduction;
- reduced provider cost;
- reduced rework;
- improved strategic decision time.

---

# 171. Verified Human Time Saved

A proposed approach is:

```text
Verified Human Time Saved
=
Measured Baseline Human Effort
-
Measured Human Effort After Workforce Assistance
-
Additional Review and Rework Effort
```

Estimated time savings must be labelled as estimates.

---

# 172. Avoided Rework Value

```text
Avoided Rework Value
=
Baseline Rework Cost
-
Current Verified Rework Cost
```

The baseline and attribution method must be approved.

---

# 173. Capability Reuse Value

Capability reuse value may consider:

- avoided development;
- avoided maintenance;
- avoided evaluation duplication;
- faster Product delivery;
- consistent Security controls;
- consistent evidence.

Reuse value must not ignore adaptation and support cost.

---

# 174. Risk-Reduction Value

Risk-reduction value may use:

- avoided incident probability;
- avoided incident impact;
- reduced exposure;
- reduced recovery time;
- improved control coverage.

Risk estimates must disclose assumptions and uncertainty.

---

# 175. Workforce Return on Investment

A proposed Workforce ROI formula is:

```text
Workforce ROI
=
Verified Workforce Financial Value
-
Total Workforce Cost
/
Total Workforce Cost
× 100
```

The formula should be displayed with clear parentheses:

```text
Workforce ROI
=
(
Verified Workforce Financial Value
-
Total Workforce Cost
)
/
Total Workforce Cost
× 100
```

Non-financial value should be reported separately.

---

# 176. Measurement by Risk Class

Metrics should be segmented by Risk where useful:

```text
R0 — Informational

R1 — Reversible Drafting or Analysis

R2 — Controlled Internal Execution

R3 — Customer, Production, Security, Privacy, or Financial Impact

R4 — Critical, Irreversible, Legal, Constitutional, or Enterprise-Wide Impact
```

High-risk work generally requires stronger evidence and smaller acceptable
failure thresholds.

---

# 177. Measurement by Environment

Metrics should distinguish:

```text
Documentation

Local

Development

Test

Staging

Production Read-Only

Production Write
```

Development performance must not be reported as Production performance.

---

# 178. Measurement by Agent State

Agent metrics should be segmented by:

```text
Registered

Provisioned

Allocated

Active

Live-Tested

Production-Controlled

Restricted

Suspended

Retired
```

---

# 179. Measurement by Product and Project

Every material runtime metric should include Product and Project context where
applicable.

Cross-Product and cross-Project aggregation should preserve:

- scope;
- access;
- confidentiality;
- interpretation;
- cost attribution.

---

# 180. Measurement by Tenant and Customer

Tenant and Customer metrics must be:

- access-controlled;
- privacy-aware;
- contract-aware;
- aggregation-safe;
- non-identifying when broad reporting does not require identity.

---

# 181. Minimum Sample Size

Metrics based on small samples must disclose:

- sample size;
- period;
- confidence limitation;
- exclusion criteria.

Targets or major decisions should not rely on statistically weak samples
without explicit acceptance.

---

# 182. Outliers

Outlier handling must define:

- detection method;
- inclusion or exclusion rule;
- business reason;
- impact on result;
- auditability.

Outliers must not be removed only to improve reported performance.

---

# 183. Missing Data

Missing Data must be handled through:

- explicit null status;
- partial-result label;
- exclusion disclosure;
- estimation disclosure;
- Data-quality alert;
- remediation owner.

Missing Data must not automatically become zero.

---

# 184. Duplicate Data

Duplicate records may distort:

- task counts;
- Agent counts;
- Tool calls;
- costs;
- incidents;
- evidence.

Deduplication rules must be versioned and testable.

---

# 185. Late-Arriving Data

Late Data handling should define:

- allowed lateness;
- report revision;
- backfill;
- historical correction;
- notification;
- versioning.

---

# 186. Metric Reconciliation

High-value metrics should be reconciled against independent sources where
possible.

Examples:

- provider invoice versus runtime usage;
- Agent Registry versus active runtime identities;
- task system versus evidence envelopes;
- Product records versus Workforce reports;
- audit events versus operational dashboards.

---

# 187. Metric Validation

Metric validation should verify:

- formula correctness;
- source correctness;
- filter correctness;
- dimension correctness;
- aggregation correctness;
- time-window correctness;
- missing-Data handling;
- duplicate handling;
- security and privacy;
- reproducibility.

---

# 188. Metric Testing

Metric implementation should include:

- unit tests;
- source-contract tests;
- transformation tests;
- aggregation tests;
- boundary tests;
- permission tests;
- privacy tests;
- reconciliation tests;
- historical comparison tests;
- alert tests.

---

# 189. Metric Quality Review

A metric should be reviewed when:

- Data source changes;
- formula changes;
- scope changes;
- Product changes;
- Project changes;
- Agent state model changes;
- target changes;
- threshold changes;
- Data quality declines;
- the metric creates harmful behavior;
- a major incident reveals weakness.

---

# 190. Anti-Gaming Controls

Metrics should be reviewed for gaming risks.

Examples include:

- creating smaller tasks to increase completion count;
- reducing escalation to appear independent;
- avoiding difficult work to improve acceptance rate;
- hiding rejected outputs;
- under-reporting incidents;
- delaying closure to change reporting period;
- lowering acceptance criteria;
- using cheaper Models despite quality loss;
- excluding expensive Human review;
- counting drafts as completed outcomes;
- counting registered Agents as active capacity.

---

# 191. Balanced Metric Sets

No major decision should rely on one metric alone.

Example balanced set:

```text
Task Success
+
Quality
+
Security
+
Cost
+
Evidence
+
Customer or Product Outcome
+
Human Review Burden
```

Improvement in one dimension must not conceal serious decline in another.

---

# 192. Leading and Lagging Indicators

## Leading Indicators

Examples:

- pending approvals;
- queue growth;
- cost warnings;
- evaluation expiry;
- access-review gaps;
- Tool error increase;
- Model latency increase;
- review backlog.

## Lagging Indicators

Examples:

- accepted outcomes;
- confirmed incidents;
- Customer impact;
- Product defects;
- total cost;
- recovery time;
- realized business value.

Both are required.

---

# 193. Vanity Metrics

Examples of potentially misleading metrics include:

- total prompts;
- total tokens;
- total messages;
- total generated files;
- total Agent names;
- total Role Documents;
- total Tool calls;
- total tasks created;
- total words generated.

These may support operations but must not be presented as enterprise success.

---

# 194. Composite Scores

Composite scores must define:

- component metrics;
- weights;
- normalization;
- missing-Data handling;
- minimum sample;
- direction;
- threshold;
- owner;
- interpretation;
- limitations.

A composite score must not hide serious component failure.

---

# 195. Workforce Health Index

A future Workforce Health Index may combine:

- Governance health;
- Security health;
- quality;
- Reliability;
- cost control;
- capacity;
- incident status;
- evaluation freshness;
- evidence completeness.

This index must not be activated until its components and weights are approved.

---

# 196. Dashboard Principles

Dashboards should:

- identify Data period;
- identify last refresh;
- identify scope;
- identify quality status;
- identify limitations;
- show lifecycle distinctions;
- show threshold meaning;
- show responsible owner;
- support drill-down;
- preserve access controls;
- avoid misleading aggregation.

---

# 197. Founder Dashboard

A future Founder dashboard may show:

- Workforce maturity;
- active Agents by state;
- Production-controlled Agents;
- Workforce cost;
- Product contribution;
- Customer outcomes;
- critical incidents;
- high-risk exceptions;
- major capacity decisions;
- strategic blockers;
- required Founder approvals.

---

# 198. Governance Dashboard

A future Governance dashboard may show:

- valid owners;
- valid allocations;
- expired approvals;
- expired delegations;
- active exceptions;
- high-risk actions;
- unauthorized transition attempts;
- unresolved Governance conflicts;
- review completion.

---

# 199. Operations Dashboard

A future Operations dashboard may show:

- active tasks;
- queue depth;
- blocked work;
- workflow failures;
- provider health;
- Tool health;
- Model health;
- cost alerts;
- suspended Agents;
- open incidents;
- recovery status.

---

# 200. Security Dashboard

A future Security dashboard may show:

- authentication failures;
- authorization denials;
- cross-Tenant attempts;
- cross-Project attempts;
- secret anomalies;
- Tool-policy violations;
- Model-policy violations;
- prompt-injection alerts;
- memory alerts;
- open vulnerabilities;
- kill-switch events.

---

# 201. Finance Dashboard

A future Finance dashboard may show:

- total Workforce cost;
- cost by Product;
- cost by Project;
- cost by Tenant;
- cost by Agent;
- cost by capability;
- provider concentration;
- budget utilization;
- failed-execution cost;
- cost per accepted outcome.

---

# 202. Product Dashboard

A future Product dashboard may show:

- Workforce tasks;
- accepted Product outcomes;
- delivery time;
- quality;
- defects;
- rework;
- cost;
- capability reuse;
- Customer outcome;
- Product incidents.

---

# 203. Department Dashboard

A future Department dashboard may show:

- demand;
- active capacity;
- task success;
- quality;
- cost;
- incidents;
- Skill gaps;
- review backlog;
- capability coverage;
- outcome contribution.

---

# 204. Customer and Tenant Reporting

Customer or Tenant reporting must:

- include only authorized Data;
- follow contracts;
- preserve confidentiality;
- use approved definitions;
- disclose limitations;
- separate internal operational metrics from Customer commitments.

---

# 205. Reporting Cadence

## Daily

Potential reports:

- critical incidents;
- Security alerts;
- queue issues;
- failed workflows;
- cost threshold breaches;
- suspended Agents.

## Weekly

Potential reports:

- Product and Project delivery;
- capacity;
- review backlog;
- quality;
- cost;
- incidents;
- escalations.

## Monthly

Potential reports:

- Agent lifecycle;
- capability portfolio;
- Department performance;
- provider cost;
- Security controls;
- evaluation status;
- Customer outcomes.

## Quarterly

Potential reports:

- Workforce strategy;
- Governance;
- maturity;
- Product contribution;
- enterprise value;
- capacity planning;
- Risk;
- provider strategy.

## Annual

Potential reports:

- enterprise Workforce performance;
- strategic value;
- long-term cost;
- organization design;
- Product portfolio support;
- Security maturity;
- Governance maturity.

---

# 206. Metric Access Control

Metric access should consider:

- classification;
- Customer confidentiality;
- Tenant confidentiality;
- personal Data;
- financial sensitivity;
- Security sensitivity;
- legal sensitivity;
- executive confidentiality.

Not every dashboard should be visible to every Agent or Human.

---

# 207. Metric Privacy

Metrics should avoid unnecessary identification of:

- individual Humans;
- individual Customers;
- individual Tenants;
- sensitive incidents;
- confidential Projects.

Aggregation and redaction should be used where appropriate.

---

# 208. Metric Retention

Retention should be defined for:

- raw events;
- source records;
- aggregates;
- dashboard snapshots;
- reports;
- alerts;
- threshold breaches;
- audit records;
- historical targets;
- deprecated metrics.

Retention must follow law, contracts, Governance, and privacy.

---

# 209. Metric Audit

Metric audit should verify:

- approved definition;
- approved owner;
- formula;
- source;
- lineage;
- access;
- Data quality;
- calculation;
- target approval;
- threshold approval;
- dashboard accuracy;
- reporting period;
- limitation disclosure;
- historical changes;
- anti-gaming controls.

---

# 210. Metric Audit Cadence

## Event-Driven

- formula change;
- source change;
- target change;
- dashboard change;
- critical incident;
- reported inconsistency.

## Monthly

- critical operational metrics;
- cost metrics;
- Agent state metrics;
- Security metrics.

## Quarterly

- KPI portfolio;
- target relevance;
- threshold relevance;
- Data quality;
- dashboard access;
- anti-gaming review.

## Annual

- full measurement framework;
- metric retirement;
- enterprise-value model;
- external reporting suitability;
- long-term comparability.

---

# 211. Metric Deprecation

A metric should be deprecated when:

- its business question no longer exists;
- definition is misleading;
- source is unavailable;
- a replacement exists;
- the metric causes harmful behavior;
- quality is insufficient;
- scope is obsolete.

Deprecated metrics should identify a replacement where applicable.

---

# 212. Metric Retirement

Metric retirement requires:

- owner decision;
- reason;
- effective date;
- affected reports;
- affected dashboards;
- replacement;
- historical retention;
- access update;
- Registry update;
- Changelog update.

---

# 213. Historical Comparability

When a metric changes materially, reports must identify whether historical
values remain comparable.

Comparability states may include:

```text
Fully Comparable

Comparable With Adjustment

Partially Comparable

Not Comparable

Historical Data Unavailable
```

---

# 214. Measurement Maturity Model

## Level 0 — Documented Measurement Intent

- metric framework documented;
- no runtime instrumentation proven.

## Level 1 — Manual Reporting

- selected values are collected manually;
- Data quality is limited.

## Level 2 — Instrumented Core Metrics

- core Agent, task, cost, and evidence metrics are captured.

## Level 3 — Validated Operational Metrics

- formulas, Data quality, and lineage are validated.

## Level 4 — Multi-Project and Multi-Tenant Measurement

- Product, Project, Tenant, and Customer segmentation is controlled.

## Level 5 — Production-Controlled Measurement

- monitoring, thresholds, alerts, incidents, and dashboards operate in
  Production.

## Level 6 — Outcome and Value Measurement

- Product, Customer, and enterprise outcomes are measured.

## Level 7 — Enterprise-Scale Decision Intelligence

- measurement supports multiple Products, Departments, Customers, providers,
  and regions with strong Governance.

---

# 215. Measurement Anti-Patterns

Mianx.ai must avoid:

- reporting Role Documents as active Agents;
- reporting Capacity Seats as active capacity;
- combining all Agent lifecycle states;
- inventing baselines;
- inventing targets;
- hiding missing Data;
- treating null as zero;
- changing formulas silently;
- comparing incompatible periods;
- comparing different Risk classes without context;
- excluding failed work;
- excluding Human-review cost;
- counting drafts as accepted outcomes;
- using task count as enterprise value;
- optimizing token count;
- optimizing Agent utilization at the expense of quality;
- publishing Customer metrics without authorization;
- allowing Agents to self-report unsupported success;
- using dashboards without Data-quality indicators;
- hiding incidents to protect performance scores.

---

# 216. Prohibited Measurement Behaviors

The AI Workforce must not:

- fabricate metric values;
- fabricate source records;
- modify evidence to improve metrics;
- suppress failed tasks;
- suppress incidents;
- change lifecycle state for reporting advantage;
- count unapproved Agents as active;
- count untested Agents as Production-controlled;
- count estimated outcomes as verified outcomes;
- expose confidential Tenant metrics;
- expose personal Data unnecessarily;
- change metric definitions without versioning;
- reuse approvals outside scope;
- report targets as actuals;
- report documentation as runtime proof;
- make financial claims without approved evidence.

---

# 217. Current-State Boundary

This Metrics Framework does not prove that Mianx.ai currently has:

- an implemented Metric Registry;
- an implemented analytics Data model;
- automated Workforce instrumentation;
- validated Agent lifecycle dashboards;
- validated capability dashboards;
- Production cost attribution;
- verified active Agent counts;
- verified Agent performance baselines;
- verified KPI targets;
- verified Product contribution;
- verified Customer outcomes;
- verified enterprise ROI;
- validated Tenant metrics;
- validated Project-isolation metrics;
- Production Security dashboards;
- Production incident dashboards;
- Production Workforce reporting.

Current implementation truth must be read from:

- [`CURRENT-STATE.md`](../CURRENT-STATE.md)
- [`DOCUMENT-STATUS-REGISTRY.md`](../DOCUMENT-STATUS-REGISTRY.md)
- [`EXECUTION-BOARD.md`](../../execution/EXECUTION-BOARD.md)

Metric documentation is not measured runtime evidence.

---

# 218. Metrics Adoption Requirements

This document may become Active only when:

- [ ] Founder approval is recorded.
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
- [ ] metric ownership model is approved.
- [ ] metric ID standard is approved.
- [ ] metric metadata is approved.
- [ ] metric lifecycle is approved.
- [ ] measurement dimensions are approved.
- [ ] source-of-truth hierarchy is approved.
- [ ] Data-source requirements are approved.
- [ ] Data-quality model is approved.
- [ ] baseline rules are approved.
- [ ] target rules are approved.
- [ ] threshold and alert rules are approved.
- [ ] documentation metrics are approved.
- [ ] Role and Capacity Seat metrics are approved.
- [ ] Agent lifecycle and performance metrics are approved.
- [ ] capability and Skill metrics are approved.
- [ ] Tool, Model, and provider metrics are approved.
- [ ] Team and Department metrics are approved.
- [ ] Product, Project, Tenant, and Customer metrics are approved.
- [ ] task and workflow metrics are approved.
- [ ] quality and evidence metrics are approved.
- [ ] Governance metrics are approved.
- [ ] Security and privacy metrics are approved.
- [ ] cost and budget metrics are approved.
- [ ] capacity and utilization metrics are approved.
- [ ] Reliability and operational metrics are approved.
- [ ] incident and escalation metrics are approved.
- [ ] evaluation and certification metrics are approved.
- [ ] Human-review metrics are approved.
- [ ] memory and Knowledge metrics are approved.
- [ ] Product, Customer, and enterprise-value metrics are approved.
- [ ] dashboard principles are approved.
- [ ] reporting cadences are approved.
- [ ] access and privacy controls are approved.
- [ ] anti-gaming controls are approved.
- [ ] audit and change-control rules are approved.
- [ ] Enterprise Analytics review is complete.
- [ ] Enterprise Architecture review is complete.
- [ ] Security and Privacy review is complete.
- [ ] Product review is complete.
- [ ] Finance review is complete.
- [ ] Quality review is complete.
- [ ] Platform Operations review is complete.
- [ ] `INDEX.md` is updated.
- [ ] `ROADMAP.md` is updated.
- [ ] `CHANGELOG.md` is updated.
- [ ] `DOCUMENT-STATUS-REGISTRY.md` is updated.
- [ ] `CANONICAL-DOCUMENT-MAP.md` is updated.

---

# 219. Metrics Review Questions

Reviewers should answer:

1. Does every metric support a decision?
2. Does every metric have an owner?
3. Is every formula explicit?
4. Is every Data source identified?
5. Is Data lineage sufficient?
6. Are estimates labelled clearly?
7. Are baselines verified?
8. Are targets separated from actuals?
9. Are thresholds connected to actions?
10. Are Agent lifecycle states reported separately?
11. Are Role Documents separated from active Agents?
12. Are Capacity Seats separated from runtime capacity?
13. Are task activity and business outcomes separated?
14. Are Product and Customer outcomes defined by their owners?
15. Is Human-review cost included where appropriate?
16. Are failed and rejected outputs visible?
17. Are evidence metrics sufficient?
18. Are Governance metrics sufficient?
19. Are Security metrics meaningful with detection coverage?
20. Are privacy controls sufficient?
21. Are cost metrics attributable?
22. Is capacity measured in defined units?
23. Are Reliability metrics reproducible?
24. Are incident metrics severity-aware?
25. Are evaluation and certification metrics current?
26. Are memory and Knowledge metrics governed?
27. Are small samples disclosed?
28. Are missing Data and duplicates handled?
29. Are anti-gaming controls sufficient?
30. Are dashboards access-controlled?
31. Are historical comparisons valid?
32. Are current-state limitations explicit?
33. Are any unsupported performance claims present?
34. Can an independent reviewer reproduce the metric?
35. Does the metric encourage safe and valuable behavior?

---

# 220. Metrics Definition of Done

This document is complete for review when:

- [ ] purpose is defined;
- [ ] authority status is defined;
- [ ] measurement objective is defined;
- [ ] strategic alignment is defined;
- [ ] principles are defined;
- [ ] scope and exclusions are defined;
- [ ] measurement Architecture is defined;
- [ ] metric Governance is defined;
- [ ] ownership roles are defined;
- [ ] metric ID standard is defined;
- [ ] metric record is defined;
- [ ] metric types and domains are defined;
- [ ] metric lifecycle and states are defined;
- [ ] change control is defined;
- [ ] measurement dimensions are defined;
- [ ] time dimensions and periods are defined;
- [ ] source-of-truth hierarchy is defined;
- [ ] Data-source and evidence requirements are defined;
- [ ] lineage is defined;
- [ ] Data quality is defined;
- [ ] estimates are defined;
- [ ] baselines, targets, thresholds, and alerts are defined;
- [ ] documentation metrics are defined;
- [ ] Role metrics are defined;
- [ ] Capacity Seat metrics are defined;
- [ ] Agent inventory, lifecycle, performance, cost, and evidence metrics are
      defined;
- [ ] capability and Skill metrics are defined;
- [ ] Tool metrics are defined;
- [ ] Model and provider metrics are defined;
- [ ] Team metrics are defined;
- [ ] Department metrics are defined;
- [ ] Product metrics are defined;
- [ ] Project metrics are defined;
- [ ] Tenant metrics are defined;
- [ ] Customer metrics are defined;
- [ ] task and workflow metrics are defined;
- [ ] quality metrics are defined;
- [ ] evidence metrics are defined;
- [ ] Governance metrics are defined;
- [ ] Security metrics are defined;
- [ ] privacy metrics are defined;
- [ ] cost and budget metrics are defined;
- [ ] capacity and utilization metrics are defined;
- [ ] Reliability and operational metrics are defined;
- [ ] incident and escalation metrics are defined;
- [ ] evaluation and certification metrics are defined;
- [ ] Human-review metrics are defined;
- [ ] memory and Knowledge metrics are defined;
- [ ] Product, Customer, and enterprise-value metrics are defined;
- [ ] measurement segmentation is defined;
- [ ] sample, outlier, missing-Data, duplicate, and late-Data rules are defined;
- [ ] reconciliation and validation are defined;
- [ ] anti-gaming and balanced metrics are defined;
- [ ] leading, lagging, vanity, and composite metrics are defined;
- [ ] dashboard principles and dashboard audiences are defined;
- [ ] reporting cadence is defined;
- [ ] access, privacy, and retention are defined;
- [ ] audit, deprecation, retirement, and comparability are defined;
- [ ] maturity is defined;
- [ ] anti-patterns and prohibited behaviors are defined;
- [ ] current-state boundary is defined;
- [ ] adoption requirements are defined;
- [ ] next document is identified.

This document becomes Active only after required review and approval.

---

# 221. Current Documentation Progress

After this document is saved:

```text
Total Planned AI Workforce Documents = 83

Content Complete for Review = 13

Existing Drafts Needing Alignment Review = 3

Empty Placeholders Remaining = 67

Approved Documents = 0

Active Canonical Documents = 0

Implemented Metric Registry Proven by Documentation = NO

Validated Runtime Metrics Proven by Documentation = 0

Approved Workforce Targets = 0

Production AI Workforce Reporting Proven by Documentation = NO
```

---

# 222. Current Document Decision

```text
DOCUMENT_ID=AIW-METRICS-001

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

METRICS_FRAMEWORK_STATUS=PROPOSED

METRIC_REGISTRY_IMPLEMENTATION=NOT_VERIFIED

DATA_PIPELINE_IMPLEMENTATION=NOT_VERIFIED

RUNTIME_INSTRUMENTATION=NOT_VERIFIED

APPROVED_TARGETS=NOT_DEFINED

PRODUCTION_REPORTING=NOT_AUTHORIZED
```

---

# 223. Related Documents

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
- [`workforce-checklists.md`](./workforce-checklists.md)
- [`AGENT-CAPACITY-BASELINE.md`](./AGENT-CAPACITY-BASELINE.md)
- [`C-SUITE-AGENT-REGISTRY.md`](./C-SUITE-AGENT-REGISTRY.md)
- [`VERIFIABLE-WORK-ENVELOPE.md`](./VERIFIABLE-WORK-ENVELOPE.md)
- [`agent-performance.md`](./agents/agent-performance.md)
- [`capability-registry.md`](./capabilities/capability-registry.md)
- [`skill-registry.md`](./capabilities/skill-registry.md)
- [`tool-registry.md`](./capabilities/tool-registry.md)
- [`model-registry.md`](./capabilities/model-registry.md)
- [`evaluation.md`](./training/evaluation.md)
- [`certification.md`](./training/certification.md)
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

# 224. Revision History

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1.0 | 2026-08-06 | Draft | Initial AI Workforce Metrics outline |
| 1.0.0 | 2026-08-06 | Draft | Defined measurement principles, Architecture, Governance, ownership, metric identity, metadata, lifecycle, dimensions, source hierarchy, Data quality, evidence, baselines, targets, thresholds, alerts, documentation, Role, Capacity Seat, Agent, capability, Skill, Tool, Model, provider, Team, Department, Product, Project, Tenant, Customer, task, workflow, quality, evidence, Governance, Security, privacy, cost, budget, capacity, Reliability, operations, incidents, escalations, evaluation, certification, Human review, memory, Knowledge, Product outcome, Customer outcome, enterprise value, dashboard, reporting, access, privacy, audit, anti-gaming, maturity, adoption, and current-state requirements |

---

# 225. Changelog Entry

Append the following entry to:

```text
doc/19-ai-workforce/CHANGELOG.md
```

```markdown
## AIW-CHG-20260806-013 — AI Workforce Metrics Completed

| Field | Value |
|---|---|
| Date | 2026-08-06 |
| Change Type | `CREATED`, `STATUS`, `GOVERNANCE` |
| Impact | `I3 — Major` |
| Risk | `R3` |
| Status | Completed |
| Owner | AI Workforce Council and Enterprise Analytics |
| Approver | Pending Founder and Metrics Governance Review |

### Affected Documents

- `doc/19-ai-workforce/workforce-metrics.md`
- `doc/19-ai-workforce/INDEX.md`
- `doc/19-ai-workforce/ROADMAP.md`
- `doc/19-ai-workforce/CHANGELOG.md`

### Previous State

`workforce-metrics.md` existed as an empty placeholder.

The AI Workforce section had documented Vision, Strategy, Operating Model,
Architecture, Governance, Security, Capabilities, and Lifecycle but lacked one
complete enterprise measurement framework defining metric ownership, metric
identity, formulas, Data sources, baselines, targets, thresholds, dashboards,
quality controls, and Workforce outcome measurement.

### New State

The document now defines:

- measurement purpose, principles, Architecture, scope, and Governance;
- metric ownership roles;
- metric identity, metadata, types, domains, lifecycle, and change control;
- dimensions, periods, source-of-truth hierarchy, evidence, lineage, and Data
  quality;
- estimates, baselines, targets, thresholds, alerts, and alert severity;
- documentation, Role, Capacity Seat, Agent, capability, Skill, Tool, Model,
  provider, Team, and Department metrics;
- Product, Project, Tenant, Customer, task, and workflow metrics;
- quality, evidence, Governance, Security, privacy, cost, budget, capacity,
  Reliability, operational, incident, and escalation metrics;
- evaluation, certification, Human-review, memory, and Knowledge metrics;
- Product, Customer, and enterprise-value measurement;
- Risk, environment, Agent-state, Product, Project, Tenant, and Customer
  segmentation;
- sample-size, outlier, missing-Data, duplicate, late-Data, reconciliation,
  validation, and testing requirements;
- anti-gaming controls, balanced metric sets, leading and lagging indicators,
  vanity metrics, and composite scores;
- Founder, Governance, Operations, Security, Finance, Product, Department, and
  Customer dashboard requirements;
- reporting cadence, access control, privacy, retention, audit, deprecation,
  retirement, historical comparability, maturity, adoption requirements, and
  current-state boundaries.

### Limitations

- Founder approval is pending.
- Metrics Governance review is pending.
- Canonical status remains false.
- Metric Registry implementation is not proven.
- Data pipelines are not proven.
- Runtime instrumentation is not proven.
- approved KPI targets are not defined.
- Production reporting is not authorized.

### Follow-Up

- complete `workforce-checklists.md`;
- perform Founder, Enterprise Analytics, Governance, Architecture, Product,
  Security, Privacy, Quality, Finance, and Platform Operations review;
- validate all metrics-related links;
- update the INDEX content status;
- update Roadmap Stage 2 progress;
- align future Agent, Team, Department, and Enterprise KPI documents with this
  framework;
- do not publish targets or performance claims until verified Data and approval
  exist.
```

---

# 226. Next Document

The next document in the official AI Workforce documentation sequence is:

```text
doc/19-ai-workforce/workforce-checklists.md
```

The Workforce Checklists document must define:

- checklist purpose and Governance;
- checklist usage rules;
- checklist ownership;
- checklist evidence requirements;
- documentation checklist;
- Vision and Strategy checklist;
- Operating Model checklist;
- Architecture checklist;
- Governance checklist;
- Security checklist;
- capability checklist;
- lifecycle checklist;
- metrics checklist;
- Role checklist;
- Capacity Seat checklist;
- Agent proposal checklist;
- Agent registration checklist;
- Agent provisioning checklist;
- Agent evaluation checklist;
- Agent allocation checklist;
- Agent activation checklist;
- live-test checklist;
- Production Agent checklist;
- Team checklist;
- Department checklist;
- Tool checklist;
- Model and provider checklist;
- prompt checklist;
- workflow checklist;
- memory and Knowledge checklist;
- Product, Project, Tenant, Customer, and environment checklists;
- incident and suspension checklists;
- reactivation checklist;
- retirement and offboarding checklist;
- audit checklist;
- current-state verification checklist;
- section-completion checklist;
- Founder approval gates.

---