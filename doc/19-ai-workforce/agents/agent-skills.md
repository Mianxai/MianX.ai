---
id: AIW-AGENT-SKILLS-001
title: Mianx.ai AI Agent Skills
version: 1.0.0
status: Draft

type: Enterprise AI Agent Skill Standard
class: Governed

owner: AI Workforce Council
steward: Agent Framework and Capability Governance
authority: Founder and Enterprise Governance

maintainers:
  - AI Workforce Operations
  - Agent Framework Team
  - AI Operating System Team
  - Capability Governance
  - Enterprise Architecture
  - Enterprise Governance
  - Security Governance
  - Data and Privacy Governance
  - Enterprise Quality
  - Product Operations
  - Project Operations
  - Training and Evaluation Operations
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
  - Security Governance
  - Data and Privacy Governance
  - Product Operations
  - Project Operations
  - Training and Evaluation Operations
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
  - Capability Owners
  - Training Designers
  - Evaluators
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
  - ./agent-lifecycle.md

related_documents:
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
  - ../roles/career-framework.md
  - ../capabilities/capability-registry.md
  - ../capabilities/skill-registry.md
  - ../capabilities/tool-registry.md
  - ../capabilities/model-registry.md
  - ../teams/team-structure.md
  - ../teams/team-governance.md
  - ../teams/team-communication.md
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
  - ../standards/hiring-standard.md
  - ../training/training-framework.md
  - ../training/learning-path.md
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
  - After Agent Type Change
  - After Agent Lifecycle Change
  - After Skill Registry Change
  - After Capability Registry Change
  - After Material Tool or Model Change
  - After Evaluation or Certification Change
  - Before New High-Risk Skill Approval
  - Before Agent Activation
  - Before Production Skill Use
  - After Critical AI, Security, Privacy, Quality, Legal, Financial, or Operational Incident
  - Before Canonical Promotion

skill_horizon:
  current: Target-State Agent Skill Definition
  near_term: One-Agent Skill Evaluation Proof
  medium_term: Team, Department, Product, and Multi-Project Skill Governance
  long_term: Production-Controlled Multi-Tenant Skill Assurance

canonical: false
---

# Mianx.ai AI Agent Skills

> **This document defines the governed Skill model for every Mianx.ai AI Agent,
> including Skill identity, categories, proficiency levels, evidence,
> evaluation, certification, expiry, renewal, restrictions, dependencies,
> inheritance, Product and Project scope, high-risk controls, Skill gaps, and
> current-state reporting.**

---

# 1. Document Purpose

This document establishes the target-state standard for defining, assigning,
evaluating, certifying, monitoring, renewing, restricting, and retiring AI Agent
Skills.

It defines:

- what an Agent Skill is;
- what an Agent Skill is not;
- Skill identity;
- Skill categories;
- Skill families;
- Skill levels;
- proficiency;
- Skill evidence;
- Skill evaluation;
- Skill certification;
- Skill validity;
- Skill expiry;
- Skill renewal;
- Skill restriction;
- Skill revocation;
- Skill retirement;
- Role-to-Skill relationships;
- Agent-to-Skill relationships;
- capability-to-Skill relationships;
- Tool dependencies;
- Model dependencies;
- prompt dependencies;
- memory dependencies;
- Data dependencies;
- Product Skills;
- Project Skills;
- Tenant and Customer Skills;
- environment-specific Skills;
- high-risk and regulated Skills;
- Skill inheritance;
- composite Skills;
- prerequisite Skills;
- incompatible Skills;
- Skill gaps;
- training requirements;
- reassessment;
- Skill drift;
- Skill portability;
- Skill evidence;
- current-state boundaries.

This document ensures that an Agent is not considered skilled merely because:

- its name implies expertise;
- its Role requires a Skill;
- a prompt mentions the Skill;
- a Model may perform related work;
- a Tool is available;
- a previous version passed an evaluation;
- another Agent has the Skill;
- the Skill exists in documentation.

This document does not independently:

- approve a Role;
- approve a Capability;
- create an Agent;
- activate an Agent;
- grant Tool access;
- grant Model access;
- grant Data access;
- issue certification;
- prove runtime proficiency;
- authorize Production execution.

---

# 2. Current Authority Status

This document currently has the following state:

```text
DOCUMENT_ID=AIW-AGENT-SKILLS-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TARGET_STATE_SKILL_MODEL=DEFINED

SKILL_REGISTRY=NOT_IMPLEMENTED

SKILL_EVALUATION_ENGINE=NOT_IMPLEMENTED

CERTIFICATION_ENGINE=NOT_IMPLEMENTED

IMPLEMENTATION_PROOF=NOT_PROVIDED

VERIFIED_RUNTIME_SKILLS=0

RUNTIME_AGENT_ACTIVATION=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

Therefore:

- every Skill in this document is a target-state classification;
- no Skill is automatically approved;
- no Agent receives a Skill through this document;
- no Agent proficiency is proven;
- no Skill certification is issued;
- no Production Skill use is authorized;
- runtime Skill enforcement is not proven;
- formal review and approval remain pending.

---

# 3. Strategic Alignment

The Agent Skill system operates inside the exact Mianx.ai hierarchy:

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

Agent Skills must support this hierarchy without replacing:

- Founder authority;
- Human accountability;
- Company Governance;
- approved Roles;
- approved capabilities;
- Product ownership;
- Project ownership;
- Tenant isolation;
- Customer confidentiality;
- Security controls;
- independent evaluation;
- qualified Human professional authority.

---

# 4. Skill Objective

The Skill framework must make it possible to answer:

- What Skill does the Agent claim?
- Which Skill ID identifies it?
- Which version is valid?
- Which Skill category does it belong to?
- Which Role requires it?
- Which capability uses it?
- Which proficiency level is proven?
- Which evidence supports the level?
- Which evaluation was used?
- Which Agent version was evaluated?
- Which Tool or Model dependencies exist?
- Which Product or Project scope applies?
- Which environment applies?
- Which Risk ceiling applies?
- Does certification apply?
- When does the Skill expire?
- Which restrictions apply?
- Which Human owner is accountable?
- What happens when the Skill becomes invalid?

---

# 5. Core Skill Principles

## 5.1 Skills Must Be Explicit

Every Skill must have:

- Skill ID;
- name;
- definition;
- version;
- owner;
- category;
- expected outcomes;
- evidence requirements;
- evaluation requirements;
- Risk classification;
- review cycle.

---

## 5.2 Skill Claims Require Evidence

A Skill claim without valid evidence must be classified as:

```text
UNVERIFIED
```

---

## 5.3 Role Requirements Do Not Prove Skill

A Role may require a Skill.

That requirement does not prove that a specific Agent possesses it.

---

## 5.4 Model Capability Does Not Prove Agent Skill

A Model may generate output related to a Skill.

The Agent must still prove:

- correct use;
- consistent behavior;
- scope control;
- evidence;
- Risk handling;
- escalation;
- Tool control;
- Product and Project awareness.

---

## 5.5 Tool Access Does Not Prove Skill

Possession of a Tool does not prove the ability to use it safely or correctly.

---

## 5.6 Prompt Instructions Do Not Prove Skill

Prompt text may guide behavior.

Proficiency must be evaluated separately.

---

## 5.7 Skills Must Be Version-Specific

A Skill evaluation applies to:

- exact Skill version;
- exact Agent Definition version;
- exact Agent Instance version;
- relevant prompt version;
- relevant Model Profile;
- relevant Tool Profile;
- relevant environment.

---

## 5.8 Skills Must Be Scope-Aware

Skill validity may depend on:

- Product;
- Project;
- Tenant;
- Customer;
- environment;
- region;
- Data class;
- Tool;
- Model;
- workflow;
- Risk.

---

## 5.9 High-Risk Skills Require Stronger Assurance

Higher-Risk Skills require:

- stronger evidence;
- qualified Human review;
- certification;
- expiry;
- monitoring;
- revocation;
- incident controls.

---

## 5.10 Skills Must Be Revocable

A Skill may be:

- restricted;
- suspended;
- expired;
- revoked;
- retired.

---

# 6. Governing Non-Equivalence Rule

The following must remain separate:

```text
Role
≠
Responsibility
≠
Skill
≠
Capability
≠
Tool
≠
Model
≠
Prompt
≠
Permission
≠
Certification
≠
Performance Result
```

---

# 7. Skill Definition

A Skill is a governed, testable, and evidence-supported ability to perform a
defined type of work to an approved proficiency level within a bounded scope.

A Skill should define:

- expected behavior;
- expected outcome;
- required inputs;
- approved methods;
- prohibited behavior;
- evaluation;
- evidence;
- Risk;
- dependencies;
- validity period.

---

# 8. Skill Versus Role

## Role

A Role defines:

- why a position exists;
- responsibilities;
- authority;
- reporting;
- expected outcomes.

## Skill

A Skill defines:

- what ability is required;
- how that ability is evaluated;
- which proficiency level is proven;
- which restrictions apply.

One Role may require many Skills.

One Skill may support many Roles.

---

# 9. Skill Versus Capability

## Skill

A Skill is a bounded ability.

Examples:

- requirements analysis;
- TypeScript implementation;
- vulnerability assessment;
- financial forecasting;
- technical writing.

## Capability

A Capability is a governed outcome-producing combination of:

- Roles;
- Skills;
- Tools;
- Models;
- prompts;
- workflows;
- memory;
- authority;
- permissions;
- evidence;
- budget.

```text
Skill
=
Ability

Capability
=
Governed Outcome-Producing System
```

---

# 10. Skill Versus Tool

A Tool provides an execution mechanism.

A Skill governs the ability to use relevant mechanisms correctly.

Example:

```text
Tool:
GitHub

Skill:
Repository Change Management
```

Access to GitHub does not prove Repository Change Management proficiency.

---

# 11. Skill Versus Model

A Model provides reasoning or generation functionality.

A Skill governs how an Agent uses that functionality for a bounded outcome.

Example:

```text
Model:
Approved Language Model

Skill:
Enterprise Requirements Analysis
```

The Model does not own the Skill.

---

# 12. Skill Versus Certification

A Skill describes an ability.

Certification is a time-bounded assurance record stating that:

- an exact Agent;
- using an exact configuration;
- passed an approved evaluation;
- for an exact Skill;
- at an exact proficiency;
- within an exact scope.

---

# 13. Skill Versus Performance

Skill proficiency indicates demonstrated ability.

Performance indicates actual results over time.

An Agent may:

- possess a Skill but perform poorly because of environment or workload;
- perform one Task successfully without proving stable Skill proficiency;
- pass an evaluation but later experience Skill drift.

---

# 14. Skill Entity Model

```text
Role
  ↓
Required Skills
  ↓
Skill Definition
  ↓
Skill Profile
  ↓
Agent Skill Assignment
  ↓
Evaluation
  ↓
Proficiency Decision
  ↓
Certification Where Required
  ↓
Approved Skill Use
  ↓
Performance Monitoring
  ↓
Renewal, Restriction, Revocation, or Retirement
```

---

# 15. Skill Identity Standard

Proposed Skill ID format:

```text
AIW-SKILL-{DOMAIN}-{NUMBER}
```

Examples:

```text
AIW-SKILL-ENG-001
AIW-SKILL-SEC-001
AIW-SKILL-PROD-001
AIW-SKILL-DOC-001
```

A Skill ID must:

- remain unique;
- remain stable;
- not be reused;
- identify one distinct Skill;
- remain separate from Role ID;
- remain separate from Capability ID;
- remain separate from certification ID;
- remain version-controlled.

---

# 16. Skill Definition Record

```yaml
skill:
  skill_id: required
  skill_version: required
  skill_name: required
  short_name: conditional

  category: required
  domain: required
  skill_family: required

  purpose: required
  definition: required
  expected_outcomes: required
  permitted_methods: required
  prohibited_behaviors: required

  prerequisite_skills: conditional
  related_skills: conditional
  incompatible_skills: conditional

  applicable_roles: required
  applicable_agent_types: required
  applicable_capabilities: required

  minimum_proficiency: required
  maximum_risk_class: required
  certification_required: required

  product_scope: conditional
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment_scope: required
  region_scope: conditional
  data_scope: required

  tool_dependencies: conditional
  model_dependencies: conditional
  prompt_dependencies: conditional
  memory_dependencies: conditional

  evaluation_profile_id: required
  evidence_profile_id: required
  certification_profile_id: conditional

  skill_owner: required
  skill_steward: required
  evaluation_owner: required
  security_owner: required
  quality_owner: required

  lifecycle_state: required
  approval_state: required
  created_at: required
  updated_at: required
  review_at: required
```

---

# 17. Skill Categories

The target Skill categories are:

| Code | Category | Purpose |
|---|---|---|
| `SK-CGN` | Cognitive | Reasoning, analysis, synthesis, planning, and judgment support |
| `SK-DOM` | Domain | Industry, business, legal, financial, Product, or functional expertise |
| `SK-TEC` | Technical | Engineering, infrastructure, Data, AI, Security, and platform work |
| `SK-OPS` | Operational | Monitoring, support, continuity, incident, and service operation |
| `SK-COM` | Communication | Writing, reporting, presentation, negotiation support, and handoff |
| `SK-COO` | Coordination | Delegation, orchestration, prioritization, and Team coordination |
| `SK-QA` | Quality and Assurance | Review, verification, testing, compliance, and audit |
| `SK-DAT` | Data and Knowledge | Data analysis, lineage, Knowledge retrieval, and memory handling |
| `SK-SEC` | Security and Privacy | Access, threat, vulnerability, privacy, and containment |
| `SK-RES` | Research and Innovation | Hypothesis, experiment, evaluation, and technology assessment |
| `SK-CUS` | Customer and Market | Customer support, sales support, marketing, SEO, and research |
| `SK-GOV` | Governance | Authority, policy, Risk, approval, and evidence controls |

---

# 18. Cognitive Skills

Cognitive Skills may include:

- structured reasoning;
- problem decomposition;
- root-cause analysis;
- option comparison;
- hypothesis development;
- prioritization;
- uncertainty reporting;
- assumption identification;
- Risk analysis;
- decision-support preparation.

Cognitive Skill evaluation must not require disclosure of private internal model
reasoning.

Evaluation should focus on:

- outputs;
- evidence;
- correctness;
- consistency;
- Risk handling;
- reproducibility.

---

# 19. Domain Skills

Domain Skills may include:

- Product Management;
- finance;
- legal research;
- Human Resources;
- marketing;
- sales;
- poultry operations;
- restaurant operations;
- healthcare;
- education;
- Customer support;
- compliance;
- procurement.

Domain Skills must identify:

- jurisdiction;
- industry;
- Product;
- Customer;
- regulation;
- Data sensitivity;
- expiry.

---

# 20. Technical Skills

Technical Skills may include:

- backend engineering;
- frontend engineering;
- mobile engineering;
- database engineering;
- API design;
- cloud infrastructure;
- DevOps;
- observability;
- AI engineering;
- prompt engineering;
- Agent engineering;
- Security engineering;
- automated testing;
- architecture analysis.

---

# 21. Operational Skills

Operational Skills may include:

- service monitoring;
- alert triage;
- incident classification;
- runbook execution;
- backup verification;
- recovery verification;
- capacity analysis;
- support triage;
- operational handoff;
- service reporting.

---

# 22. Communication Skills

Communication Skills may include:

- technical writing;
- executive reporting;
- Customer-response drafting;
- requirements clarification;
- structured handoff;
- incident communication preparation;
- presentation preparation;
- multilingual drafting;
- documentation maintenance.

External communication requires separate authority.

---

# 23. Coordination Skills

Coordination Skills may include:

- Task decomposition;
- Task routing;
- prioritization;
- dependency management;
- Team coordination;
- escalation;
- workload balancing;
- handoff management;
- cross-department coordination;
- workflow monitoring.

---

# 24. Quality and Assurance Skills

Quality and Assurance Skills may include:

- requirement verification;
- test design;
- evidence validation;
- code review;
- documentation review;
- Security review;
- privacy review support;
- compliance assessment;
- audit preparation;
- acceptance-criteria evaluation.

---

# 25. Data and Knowledge Skills

Data and Knowledge Skills may include:

- Data validation;
- Data transformation;
- Data analysis;
- lineage analysis;
- Knowledge retrieval;
- Knowledge classification;
- memory-scope validation;
- provenance review;
- stale-Knowledge detection;
- Knowledge-promotion preparation.

---

# 26. Security and Privacy Skills

Security and Privacy Skills may include:

- identity review;
- permission review;
- threat analysis;
- vulnerability analysis;
- secrets detection;
- prompt-injection testing;
- Project-isolation testing;
- Tenant-isolation testing;
- privacy-impact support;
- incident containment support.

High-risk Security action requires enhanced authority and certification.

---

# 27. Research and Innovation Skills

Research Skills may include:

- literature review;
- hypothesis design;
- experiment design;
- evaluation design;
- result analysis;
- reproducibility review;
- failed-hypothesis reporting;
- emerging-technology analysis;
- technology-transfer assessment.

---

# 28. Customer and Market Skills

Customer and Market Skills may include:

- Customer issue classification;
- support-response drafting;
- lead qualification;
- proposal drafting;
- market research;
- campaign analysis;
- SEO analysis;
- Customer-success analysis;
- Product-feedback analysis.

Customer-facing action requires separate communication authority.

---

# 29. Governance Skills

Governance Skills may include:

- authority validation;
- delegation review;
- approval validation;
- Risk classification;
- policy evaluation;
- exception review;
- lifecycle verification;
- evidence completeness;
- current-state validation;
- audit preparation.

---

# 30. Skill Families

A Skill family groups related Skills.

Example:

```text
Engineering Skill Family
├── Requirements Analysis
├── Architecture Analysis
├── Backend Implementation
├── Frontend Implementation
├── Automated Testing
├── Repository Management
└── Deployment Preparation
```

A Skill family does not grant every child Skill.

---

# 31. Atomic Skills

An atomic Skill represents one bounded ability.

Examples:

- validate a JSON schema;
- prepare a rollback plan;
- classify an incident;
- review a permission profile;
- write a unit test;
- validate documentation metadata.

Atomic Skills improve:

- evaluation accuracy;
- reuse;
- restriction;
- assignment;
- evidence;
- audit.

---

# 32. Composite Skills

A composite Skill combines multiple approved Skills.

Example:

```text
Production Deployment Readiness

Requires:
- Repository Change Management
- Build Verification
- Test Evidence Review
- Security Evidence Review
- Release Planning
- Rollback Planning
- Operational Handoff
```

A composite Skill must define:

- prerequisite Skills;
- minimum levels;
- evaluation;
- evidence;
- Risk;
- failure handling.

---

# 33. Skill Proficiency Levels

The proposed proficiency scale is:

| Code | Level | Meaning |
|---|---|---|
| `SP-0` | Not Evaluated | No valid proficiency evidence exists |
| `SP-1` | Awareness | Understands terminology and basic boundaries |
| `SP-2` | Assisted | Performs bounded work with detailed guidance |
| `SP-3` | Independent | Performs routine approved work independently |
| `SP-4` | Advanced | Handles complex work and supports review |
| `SP-5` | Expert | Handles exceptional complexity and designs standards |
| `SP-6` | Assessor | Qualified to evaluate the Skill of others within approved scope |

---

# 34. Proficiency Rules

- `SP-0` must not be treated as possession of the Skill.
- `SP-1` does not authorize execution.
- `SP-2` requires active supervision.
- `SP-3` may support routine execution within approved scope.
- `SP-4` may support complex execution and review.
- `SP-5` may support standard design and advanced decisions.
- `SP-6` requires explicit assessor authorization.

Higher proficiency does not grant:

- broader Product scope;
- broader Project scope;
- broader Tenant scope;
- broader permissions;
- higher financial limits;
- higher Risk authority;
- Production access.

---

# 35. Proficiency Dimensions

Proficiency should be evaluated across separate dimensions.

| Dimension | Evaluation Focus |
|---|---|
| Knowledge | Understanding of concepts, rules, and constraints |
| Execution | Ability to complete approved work |
| Quality | Correctness, completeness, and consistency |
| Safety | Ability to respect Security, privacy, and Risk boundaries |
| Evidence | Ability to produce traceable proof |
| Escalation | Ability to identify and escalate uncertainty |
| Efficiency | Ability to achieve results within cost and capacity limits |
| Adaptation | Ability to handle approved variation |
| Collaboration | Ability to work with Humans and Agents |
| Reliability | Ability to perform consistently over time |

---

# 36. Proficiency Decision

A proficiency decision should record:

```yaml
proficiency:
  skill_id: required
  skill_version: required
  agent_definition_id: required
  agent_instance_id: conditional
  agent_runtime_version: conditional

  evaluated_level: required
  approved_level: required

  product_scope: conditional
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment_scope: required
  risk_scope: required

  evaluation_profile_id: required
  evaluation_result: required
  evaluator: required
  reviewed_by: required
  approved_by: required

  issued_at: required
  review_at: required
  expires_at: conditional
  restrictions: conditional
  evidence_references: required
```

---

# 37. Skill Lifecycle

The target Skill Definition lifecycle is:

```text
Skill Need Identified
    ↓
Skill Proposed
    ↓
Skill Defined
    ↓
Skill in Review
    ↓
Skill Approved
    ↓
Skill Available
    ↓
Skill Maintained
    ↓
Skill Revised
    ↓
Skill Deprecated
    ↓
Skill Retired
    ↓
Skill Archived
```

---

# 38. Agent Skill Assignment Lifecycle

The target Agent Skill assignment lifecycle is:

```text
Skill Required
    ↓
Skill Assigned for Learning or Evaluation
    ↓
Evaluation Pending
    ↓
Evaluated
    ↓
Approved Proficiency
    ↓
Certified Where Required
    ↓
Active Skill Use
    ↓
Monitored
    ↓
Restricted, Expired, Revoked, or Renewed
    ↓
Retired
    ↓
Archived
```

---

# 39. Skill Assignment States

| State | Meaning |
|---|---|
| `REQUIRED` | Role or Capability requires the Skill |
| `ASSIGNED` | Skill has been assigned for development or evaluation |
| `EVALUATION-PENDING` | Proficiency has not been validated |
| `EVALUATED` | Evaluation result exists |
| `APPROVED` | Approved proficiency level exists |
| `CERTIFIED` | Required certification is valid |
| `ACTIVE` | Skill may be used within approved scope |
| `RESTRICTED` | Skill use is limited |
| `EXPIRED` | Validity period ended |
| `SUSPENDED` | Skill use is temporarily blocked |
| `REVOKED` | Skill authority was withdrawn |
| `RETIRED` | Skill assignment is no longer needed |
| `ARCHIVED` | Historical record remains |

---

# 40. Agent Skill Assignment Record

```yaml
agent_skill_assignment:
  assignment_id: required
  skill_id: required
  skill_version: required

  agent_definition_id: required
  agent_definition_version: required
  agent_instance_id: conditional
  runtime_version: conditional

  role_id: required
  capability_ids: conditional

  required_level: required
  approved_level: conditional

  product_scope: conditional
  project_scope: conditional
  tenant_scope: conditional
  customer_scope: conditional
  environment_scope: required
  region_scope: conditional
  data_scope: required
  risk_scope: required

  assignment_state: required
  evaluation_reference: conditional
  certification_reference: conditional

  accountable_human_owner: required
  assigned_by: required
  reviewed_by: required
  approved_by: conditional

  assigned_at: required
  approved_at: conditional
  review_at: required
  expires_at: conditional

  restrictions: conditional
  evidence_references: required
```

---

# 41. Role-to-Skill Relationship

A Role should define:

- mandatory Skills;
- optional Skills;
- prohibited Skills or actions;
- minimum proficiency;
- required certification;
- review cadence;
- Skill dependencies.

Example:

```yaml
role_skill_requirement:
  role_id: AIW-ROLE-EXAMPLE
  skill_id: AIW-SKILL-ENG-001
  requirement_type: mandatory
  minimum_proficiency: SP-3
  certification_required: false
```

---

# 42. Agent-to-Skill Relationship

An Agent may possess only Skills that are:

- defined;
- approved;
- assigned;
- evaluated;
- within Role scope;
- within Capability scope;
- within Risk scope;
- within environment scope;
- within Product and Project scope;
- unexpired;
- not revoked.

---

# 43. Capability-to-Skill Relationship

A Capability must define:

- mandatory Skills;
- optional Skills;
- minimum proficiency;
- required certification;
- Tool dependencies;
- Model dependencies;
- evidence requirements;
- Risk controls.

A Capability must fail eligibility when mandatory Skill requirements are not
met.

---

# 44. Agent-Type-to-Skill Relationship

Agent Types may define expected Skill families.

Examples:

| Agent Type | Typical Skill Families |
|---|---|
| Advisory Agent | Cognitive, Domain, Communication, Governance |
| Planning Agent | Cognitive, Coordination, Domain |
| Execution Agent | Technical or Operational, Evidence, Safety |
| Review Agent | Quality, Domain, Governance |
| Verification Agent | Quality, Evidence, Technical |
| Security Agent | Security, Governance, Incident |
| Research Agent | Research, Data, Evidence |
| Documentation Agent | Communication, Governance, Quality |
| Customer Assistance Agent | Customer, Communication, Privacy |

Agent type does not prove Skill possession.

---

# 45. Prerequisite Skills

A Skill may require prerequisite Skills.

Example:

```text
Production Database Migration

Prerequisites:
- Database Fundamentals
- Schema Migration Design
- Backup and Restore
- Data Validation
- Rollback Planning
- Production Change Governance
```

Missing prerequisites must block assignment or evaluation at the required
level.

---

# 46. Skill Dependencies

Skill dependencies may include:

- another Skill;
- approved Role;
- approved Capability;
- Tool;
- Model;
- prompt;
- Data source;
- memory scope;
- environment;
- Human reviewer;
- certification;
- policy.

Dependencies must be explicit.

---

# 47. Tool-Dependent Skills

A Tool-dependent Skill must define:

- approved Tool ID;
- approved Tool version;
- permitted actions;
- prohibited actions;
- environment;
- Product scope;
- Project scope;
- Tenant scope;
- cost limits;
- monitoring;
- evaluation.

Skill proficiency must be reassessed after a material Tool change.

---

# 48. Model-Dependent Skills

A Model-dependent Skill must define:

- approved Model Profile;
- provider;
- Model;
- approved use;
- Data classes;
- context limits;
- Tool-use behavior;
- fallback;
- evaluation;
- cost;
- monitoring.

A Skill evaluated using one Model route must not automatically be considered
valid with another materially different Model route.

---

# 49. Prompt-Dependent Skills

Where prompt behavior materially affects Skill performance, the Skill record
must identify:

- prompt profile;
- prompt version;
- hierarchy layer;
- Role layer;
- Product or Project layer;
- content digest;
- evaluation reference.

A material prompt change may require:

- regression evaluation;
- restriction;
- renewal;
- recertification.

---

# 50. Memory-Dependent Skills

Memory-dependent Skills must define:

- permitted memory scopes;
- read permissions;
- write permissions;
- Product namespace;
- Project namespace;
- Tenant namespace;
- Customer restrictions;
- retention;
- provenance;
- evaluation.

A Skill must not be considered valid when required memory is unavailable or
untrusted.

---

# 51. Data-Dependent Skills

Data-dependent Skills must define:

- approved Data classes;
- approved purpose;
- Product scope;
- Project scope;
- Tenant scope;
- Customer scope;
- region;
- quality requirement;
- provenance;
- retention;
- privacy controls.

---

# 52. Product Skills

A Product Skill is valid only for an approved Product scope.

Examples may include:

- MianX Core Architecture;
- AI Operating System Workflow Design;
- RestaurantOS Operations;
- PoultryOS Domain Analysis.

A Product Skill does not automatically transfer to another Product.

---

# 53. Project Skills

A Project Skill may include:

- Project-specific architecture;
- Customer-specific workflows;
- Project-specific Data models;
- Project-specific deployment procedures;
- Project-specific acceptance criteria.

Project Skills must:

- remain Project-scoped;
- expire or be reviewed after Project closure;
- preserve confidentiality;
- not be promoted to enterprise Skill without review.

---

# 54. Tenant and Customer Skills

Tenant or Customer Skills may include:

- Customer-specific terminology;
- approved operational procedures;
- approved communication patterns;
- Tenant-specific configuration;
- contractually required controls.

They must not leak into unrelated Tenant or Customer contexts.

---

# 55. Environment-Specific Skills

Some Skills may be environment-specific.

Examples:

```text
Development Debugging

Staging Release Verification

Production Read-Only Investigation

Production Write Deployment
```

Production proficiency requires separate evaluation.

---

# 56. Regional and Jurisdictional Skills

Skills affected by law, regulation, language, or region must identify:

- jurisdiction;
- region;
- applicable law or policy;
- review date;
- source date;
- qualified reviewer;
- expiry.

Legal or regulatory Skill claims may become stale quickly.

---

# 57. High-Risk Skills

High-risk Skills include work involving:

- Production write access;
- destructive Tools;
- Security containment;
- identity and permission changes;
- personal Data;
- regulated Data;
- financial commitments;
- legal decisions;
- Customer commitments;
- irreversible migration;
- public communication;
- executive authority;
- critical infrastructure.

---

# 58. High-Risk Skill Requirements

High-risk Skills require:

- approved Skill Definition;
- approved Agent Definition;
- strong evaluation;
- qualified Human reviewer;
- certification;
- explicit scope;
- short review cycle;
- expiry;
- enhanced monitoring;
- immediate restriction;
- revocation path;
- incident handling;
- Verifiable-Work evidence.

---

# 59. Regulated Skills

Regulated Skills must identify:

- regulated domain;
- jurisdiction;
- applicable requirement;
- qualified Human authority;
- Agent boundaries;
- required disclaimers;
- evidence;
- retention;
- certification;
- escalation.

An AI Agent must not be represented as a licensed Human professional unless
such representation is legally valid and explicitly approved.

---

# 60. Skill Evaluation

Skill evaluation must test the exact Agent and configuration.

Evaluation may include:

- knowledge questions;
- scenario tests;
- practical Tasks;
- Tool-use tests;
- Model-use tests;
- prompt-injection tests;
- failure tests;
- escalation tests;
- evidence-generation tests;
- Product-isolation tests;
- Project-isolation tests;
- Tenant-isolation tests;
- cost-control tests;
- recovery tests.

---

# 61. Evaluation Profile

```yaml
skill_evaluation_profile:
  evaluation_profile_id: required
  skill_id: required
  skill_version: required

  target_proficiency_level: required
  applicable_roles: required
  applicable_agent_types: required

  scenario_set: required
  practical_tasks: required
  prohibited_behavior_tests: required
  failure_tests: required
  escalation_tests: required

  product_scope: conditional
  project_scope: conditional
  tenant_scope: conditional
  environment_scope: required
  risk_scope: required

  scoring_method: required
  pass_threshold: required
  critical_failure_rules: required

  evaluator_requirements: required
  independent_review_required: required
  evidence_requirements: required

  validity_period: required
  re_evaluation_triggers: required
```

---

# 62. Evaluation Result States

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

# 63. Critical Skill Evaluation Failures

The following should normally cause failure:

- fabricated evidence;
- unauthorized Tool use;
- unauthorized Data access;
- cross-Project leakage;
- cross-Tenant leakage;
- ignored suspension;
- concealed failure;
- invalid approval claim;
- unsafe Production action;
- prohibited legal or financial action;
- inability to escalate critical uncertainty;
- inability to produce required evidence.

---

# 64. Evaluation Evidence

Evaluation evidence should include:

- Skill ID and version;
- Agent Definition ID and version;
- Agent Instance ID where applicable;
- runtime version;
- prompt version;
- Tool versions;
- Model routes;
- Data scope;
- environment;
- scenarios;
- results;
- failures;
- retries;
- scores;
- reviewer;
- restrictions;
- decision;
- evidence references.

---

# 65. Skill Evidence Levels

```text
SE-0 — No Evidence

SE-1 — Unverified Skill Claim

SE-2 — Documentation or Training Completion

SE-3 — Controlled Evaluation Evidence

SE-4 — Repeated Controlled Task Evidence

SE-5 — Live Operational Evidence

SE-6 — Independent Certification or Audit Evidence
```

Training completion alone must not prove operational proficiency.

---

# 66. Minimum Evidence by Skill Use

| Skill Use | Minimum Suggested Evidence |
|---|---|
| Awareness | SE-2 |
| Assisted internal work | SE-3 |
| Independent internal work | SE-3 or SE-4 |
| Complex internal work | SE-4 |
| Production read-only work | SE-4 plus operational approval |
| Production write work | SE-5 plus certification |
| Regulated or enterprise-critical work | SE-6 where required |

---

# 67. Certification

Certification should be required when:

- Skill Risk is R3 or R4;
- law or policy requires it;
- Customer contract requires it;
- Production write access applies;
- destructive action applies;
- Security containment applies;
- sensitive Data applies;
- executive authority applies.

---

# 68. Certification Record

```yaml
skill_certification:
  certification_id: required
  skill_id: required
  skill_version: required

  agent_definition_id: required
  agent_definition_version: required
  agent_instance_id: required
  runtime_version: required

  proficiency_level: required
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

# 69. Certification Rules

Certification must not:

- exceed evaluated proficiency;
- exceed approved Role scope;
- exceed Product scope;
- exceed Project scope;
- exceed Tenant scope;
- exceed environment scope;
- exceed Risk authority;
- remain valid after material configuration change;
- renew itself automatically without valid evidence.

---

# 70. Skill Validity

A Skill assignment is valid only when:

- Skill Definition is approved;
- Skill version is current;
- Agent Definition is approved;
- Agent Instance is eligible;
- evaluation is valid;
- certification is valid where required;
- Product scope matches;
- Project scope matches;
- Tenant scope matches;
- Customer scope matches;
- environment matches;
- Tool and Model dependencies match;
- prompt version remains compatible;
- memory and Data dependencies remain valid;
- no restriction or revocation exists.

---

# 71. Skill Expiry

A Skill may expire because of:

- evaluation expiry;
- certification expiry;
- Tool change;
- Model change;
- prompt change;
- Role change;
- Agent Definition change;
- Product change;
- Project change;
- regulation change;
- policy change;
- incident;
- long inactivity;
- performance decline.

Expired Skills must not remain usable for restricted work.

---

# 72. Skill Renewal

Renewal requires:

- continued business need;
- current Skill Definition;
- current Agent Definition;
- compatible configuration;
- valid ownership;
- current evaluation;
- current certification where required;
- recent performance evidence;
- no blocking incident;
- valid scope;
- approval.

Renewal must not be based only on previous certification.

---

# 73. Skill Restriction

A Skill may be restricted by:

- proficiency level;
- Product;
- Project;
- Tenant;
- Customer;
- environment;
- Data class;
- Tool;
- Model;
- Task type;
- financial limit;
- Risk;
- mandatory Human review;
- duration.

---

# 74. Skill Suspension

A Skill should be suspended when:

- evaluation is invalid;
- certification is expired;
- Tool is compromised;
- Model behavior changes materially;
- Skill is used outside scope;
- evidence is fabricated;
- repeated failure occurs;
- Product or Tenant isolation fails;
- critical policy violation occurs;
- valid Governance instruction exists.

Suspending one Skill does not necessarily require retiring the entire Agent.

---

# 75. Skill Revocation

Revocation permanently or indefinitely removes Skill authority because of:

- malicious misuse;
- serious policy violation;
- fabricated evidence;
- repeated unauthorized action;
- legal restriction;
- critical Security incident;
- unacceptable Risk;
- inability to remediate;
- Founder or Governance decision.

---

# 76. Skill Retirement

A Skill may be retired when:

- no approved use case remains;
- it is replaced;
- required Tool is retired;
- required Model is retired;
- Product closes;
- Project closes;
- regulation prohibits the use;
- Skill Definition is deprecated;
- capability is retired.

---

# 77. Skill Drift

Skill drift occurs when proven proficiency no longer matches current behavior.

Causes may include:

- Model update;
- prompt update;
- Tool update;
- Data change;
- environment change;
- memory contamination;
- infrequent use;
- policy change;
- Product change;
- Agent Definition drift.

---

# 78. Skill Drift Detection

Skill drift may be detected through:

- declining Task quality;
- increased failures;
- increased retries;
- increased Human corrections;
- evidence gaps;
- new Security findings;
- changed Model behavior;
- changed Tool behavior;
- changed Product requirements;
- failed spot evaluations;
- incident analysis.

---

# 79. Skill Drift Response

```text
Drift Detected
    ↓
Affected Skill Identified
    ↓
Scope and Risk Assessed
    ↓
Skill Restricted or Suspended
    ↓
Evidence Preserved
    ↓
Root Cause Reviewed
    ↓
Training, Configuration, or Definition Updated
    ↓
Re-Evaluation
    ↓
Renewal, Reduced Proficiency, Revocation, or Retirement
```

---

# 80. Skill Inheritance

Skills must not be inherited automatically from:

- parent Role;
- Department;
- Team;
- executive title;
- shared prompt;
- Tool Profile;
- Model Profile;
- another Agent;
- previous Agent version.

Only approved prerequisites, Skill families, or shared Skill Profiles may be
reused.

Each Agent must still prove required proficiency.

---

# 81. Skill Profile Inheritance

A Skill Profile may inherit approved requirements.

```text
Enterprise Base Skill Profile
        ↓
Department Skill Profile
        ↓
Role Skill Profile
        ↓
Agent Definition Skill Profile
        ↓
Product and Project Skill Overlay
        ↓
Agent Instance Skill Assignment
```

Inheritance may add stricter requirements.

It must not remove mandatory higher-level controls.

---

# 82. Product and Project Skill Overlay

A Product or Project overlay may add:

- domain terminology;
- Product rules;
- Project workflow;
- Customer restrictions;
- Data schema;
- Tool configuration;
- acceptance criteria;
- environment rules;
- performance requirements.

The overlay must not change the core Skill identity without version control.

---

# 83. Skill Portability

A Skill may be portable across scopes only when:

- core behavior remains the same;
- Product rules remain compatible;
- Data requirements remain compatible;
- Tool requirements remain compatible;
- Model requirements remain compatible;
- Risk remains equal or lower;
- required evaluation confirms portability;
- approval exists.

---

# 84. Non-Portable Skills

Skills may be non-portable because of:

- Customer confidentiality;
- Tenant-specific rules;
- Product-specific architecture;
- Project-specific codebase;
- regional law;
- proprietary Tooling;
- regulated workflow;
- Customer-specific operating procedure;
- environment-specific Risk.

---

# 85. Incompatible Skills

Some Skill combinations may create conflicts.

Examples:

- implementation and independent audit of the same work;
- execution and final approval of the same high-risk action;
- financial recommendation and fund-transfer approval;
- Security action and independent incident audit;
- legal drafting and final legal approval.

Incompatible combinations must trigger separation-of-duties controls.

---

# 86. Skill Conflict Record

```yaml
skill_conflict:
  conflict_id: required
  agent_id: required
  skill_ids: required
  affected_task_types: required
  risk_class: required
  separation_required: required
  compensating_controls: conditional
  approved_by: required
  review_at: required
  evidence_references: required
```

---

# 87. Skill Gap

A Skill gap exists when:

- required Skill is missing;
- proficiency is below required level;
- evaluation is expired;
- certification is missing;
- dependency is unavailable;
- Product-specific knowledge is missing;
- Tool or Model compatibility is missing;
- performance falls below required standard;
- Human-review capacity is missing.

---

# 88. Skill Gap Record

```yaml
skill_gap:
  gap_id: required
  role_id: required
  agent_definition_id: required
  agent_instance_id: conditional
  skill_id: required

  required_level: required
  current_level: required
  gap_description: required
  affected_capabilities: required
  affected_products: conditional
  affected_projects: conditional

  risk_class: required
  remediation_type: required
  remediation_owner: required
  due_at: required

  temporary_restrictions: required
  reassignment_required: required
  evaluation_required: required
  status: required
  evidence_references: required
```

---

# 89. Skill Gap Responses

A Skill gap may be addressed through:

- training;
- prompt improvement;
- Tool improvement;
- Model change;
- additional context;
- workflow restriction;
- lower Task complexity;
- increased Human supervision;
- assignment to another Agent;
- Team composition;
- Capability redesign;
- retirement of the Skill requirement.

---

# 90. Training Relationship

Training may prepare an Agent for Skill evaluation.

Training must not automatically grant:

- proficiency;
- certification;
- activation;
- Production authority.

Training records should identify:

- curriculum;
- Skill version;
- Agent version;
- completion;
- exercises;
- limitations;
- evaluation readiness.

---

# 91. Skill Learning Path

A proposed learning path may follow:

```text
Awareness
    ↓
Guided Practice
    ↓
Controlled Simulation
    ↓
Supervised Task
    ↓
Independent Evaluation
    ↓
Restricted Operational Use
    ↓
Repeated Evidence
    ↓
Advanced Evaluation
    ↓
Certification Where Required
```

---

# 92. Skill Reassessment Triggers

Reassessment should occur after:

- material prompt change;
- Model change;
- Tool change;
- Agent Definition change;
- Product change;
- Project change;
- environment promotion;
- new Data class;
- Risk increase;
- significant incident;
- repeated quality decline;
- long inactivity;
- certification expiry;
- policy change.

---

# 93. Skill Monitoring

Skill monitoring may include:

- Task success;
- acceptance;
- review findings;
- error rate;
- retry rate;
- correction rate;
- evidence completeness;
- cost;
- latency;
- Security findings;
- escalation quality;
- scope violations;
- Customer impact;
- incidents;
- proficiency expiry.

---

# 94. Skill Performance Boundary

Skill monitoring must not:

- replace full performance evaluation;
- infer business value from activity alone;
- hide failed Tasks;
- ignore rejected outputs;
- ignore Human correction;
- use raw volume as proof of expertise;
- compare incompatible Product or Project contexts.

---

# 95. Skill Registry

A future Skill Registry should provide:

- Skill IDs;
- versions;
- definitions;
- categories;
- owners;
- proficiency model;
- prerequisites;
- dependencies;
- Role mappings;
- Capability mappings;
- evaluation profiles;
- certifications;
- lifecycle state;
- Product and Project scope;
- Risk;
- evidence requirements.

---

# 96. Skill Registry Source of Truth

The Skill Registry should be authoritative for:

- Skill definition;
- Skill version;
- Skill owner;
- Skill lifecycle state;
- proficiency scale;
- prerequisites;
- evaluation requirements;
- certification requirements.

It should not replace:

- Role Registry;
- Agent Registry;
- Capability Registry;
- Tool Registry;
- Model Registry;
- permission system;
- evidence store.

---

# 97. Skill Assignment Source of Truth

Agent-specific Skill state should be authoritative through a governed
Agent-Skill assignment record.

It must identify:

- Agent;
- Skill;
- proficiency;
- scope;
- evaluation;
- certification;
- restrictions;
- expiry;
- evidence.

---

# 98. Skill Reporting

A Skill report should distinguish:

```text
Defined Skills

Approved Skills

Deprecated Skills

Required Role Skills

Assigned Agent Skills

Evaluated Agent Skills

Certified Agent Skills

Active Agent Skills

Restricted Agent Skills

Expired Agent Skills

Revoked Agent Skills
```

One undefined `Total Skills` number is insufficient.

---

# 99. Skill Metrics

Potential metrics include:

| Metric | Definition |
|---|---|
| Skill Coverage | Required Skills with eligible Agents / required Skills |
| Proficiency Compliance | Approved Skill assignments meeting required level / required assignments |
| Evaluation Currency | Unexpired evaluations / evaluated assignments |
| Certification Coverage | Valid certifications / required certifications |
| Skill Gap Rate | Open required Skill gaps / required Skills |
| Skill Renewal Rate | Renewed expiring Skills / Skills requiring renewal |
| Skill Drift Rate | Skill assignments with confirmed drift / monitored assignments |
| Skill Restriction Rate | Restricted active Skills / active Skills |
| Evidence Completeness | Assignments with complete evidence / evaluated assignments |
| Skill Portability Success | Successfully validated portability decisions / portability reviews |
| High-Risk Skill Compliance | Valid high-risk Skill assignments / high-risk Skill assignments |

Numerical targets require separate approval.

---

# 100. One-Agent Skill Proof

The first Skill proof should include:

```text
1 Approved Agent Definition

1 Runtime Agent Instance

1 Approved Role

1 Primary Agent Type

1 Low-Risk Skill

1 Skill Assignment

1 Evaluation Profile

1 Controlled Evaluation

1 Approved Proficiency Decision

1 Product

1 Project

1 Non-Production Environment

1 Human Evaluator

1 Evidence Chain

1 Expiry or Review Date

1 Restriction or Suspension Test
```

---

# 101. Multi-Skill Agent Proof

A multi-Skill proof should verify:

- primary Skill;
- supporting Skills;
- prerequisites;
- incompatible-Skill controls;
- Tool dependencies;
- Model dependencies;
- evidence attribution;
- Task routing;
- failure of one Skill without overstating all Skills;
- Skill-specific restriction.

---

# 102. Team Skill Proof

A Team Skill proof should verify:

- required Team capabilities;
- Agent Skill distribution;
- Skill coverage;
- independent review;
- no single-point Skill dependency;
- handoff;
- substitution;
- Team-level gaps;
- Team suspension or reassignment.

---

# 103. Multi-Project Skill Proof

A Multi-Project Skill proof should verify:

- Project-specific Skill assignments;
- Project-specific evaluations where required;
- Project memory separation;
- Tool configuration separation;
- evidence attribution;
- Skill portability review;
- Project closure;
- access and Skill-scope removal.

---

# 104. Multi-Tenant Skill Proof

A Multi-Tenant Skill proof should verify:

- Tenant-scoped Skill use;
- Tenant-specific Data rules;
- Tenant-specific memory;
- Tenant-specific Tool actions;
- Customer restrictions;
- negative isolation tests;
- Tenant offboarding;
- no retained Tenant-specific Skill context.

---

# 105. Production Skill Gate

Before an Agent uses a Skill in Production:

- [ ] Skill Definition is approved.
- [ ] Skill version is current.
- [ ] Role requires or permits the Skill.
- [ ] Agent Definition includes the Skill.
- [ ] Agent Instance is active.
- [ ] required proficiency is approved.
- [ ] evaluation is current.
- [ ] certification is valid where required.
- [ ] Product scope matches.
- [ ] Project scope matches.
- [ ] Tenant scope matches.
- [ ] Customer scope matches.
- [ ] environment matches.
- [ ] Tool dependencies are approved.
- [ ] Model dependencies are approved.
- [ ] prompt version is compatible.
- [ ] Data and memory scopes are approved.
- [ ] Risk ceiling is valid.
- [ ] Human review is available.
- [ ] monitoring is active.
- [ ] evidence collection is active.
- [ ] suspension is available.
- [ ] explicit Production approval exists.

---

# 106. Skill Risks

| Risk | Required Response |
|---|---|
| Role requirement treated as Skill proof | Require Agent-specific evaluation |
| Tool access treated as proficiency | Require Skill evaluation |
| Model output treated as Agent Skill | Evaluate full Agent configuration |
| Training treated as certification | Separate learning from assurance |
| Skill inherited automatically | Require explicit assignment |
| Stale Skill evidence | Enforce expiry and reassessment |
| Cross-Project Skill leakage | Use Project-scoped overlays |
| Cross-Tenant context leakage | Enforce Tenant isolation |
| High proficiency used as authority | Keep authority separate |
| Skill inflation | Use bounded atomic definitions |
| One successful Task treated as mastery | Require repeated evidence |
| Assessor conflict | Require independent evaluation |
| Tool or Model drift | Restrict and re-evaluate |
| Regulated Skill overclaim | Require qualified Human authority |
| Skill gap hidden | Record and remediate gaps |
| Certification self-renewal | Require independent renewal |
| Production use without proof | Enforce Production Skill gate |

---

# 107. Skill Anti-Patterns

Mianx.ai must avoid:

- one vague Skill named `general intelligence`;
- assigning every Skill to every Agent;
- using Role titles as Skill evidence;
- using Model marketing claims as Skill evidence;
- using prompt text as certification;
- treating Tool access as proficiency;
- treating training completion as Production readiness;
- granting expert level after one successful Task;
- retaining expired certifications;
- hiding Skill gaps;
- allowing one Agent to assess and certify itself;
- combining implementation and independent audit Skills without controls;
- sharing Project-specific Skills without review;
- sharing Tenant-specific context;
- ignoring Skill drift;
- allowing high-risk Skill use without monitoring;
- reporting planned Skills as runtime Skills.

---

# 108. Prohibited Skill Behaviors

An Agent must not:

- assign itself a Skill;
- increase its own proficiency;
- certify itself;
- renew its own certification;
- extend its own Skill expiry;
- remove its own restrictions;
- change its own Skill scope;
- use a Skill outside Product scope;
- use a Skill outside Project scope;
- use a Skill outside Tenant scope;
- use a Skill in an unapproved environment;
- substitute an unapproved Tool;
- substitute an unapproved Model;
- hide failed evaluation;
- fabricate Skill evidence;
- claim expertise without evidence;
- continue high-risk Skill use after expiry;
- use a revoked Skill;
- treat archived Skill assignments as active.

---

# 109. Current Verified Baseline

At the time this document is created:

```yaml
documentation:
  agent_skills_document:
    id: AIW-AGENT-SKILLS-001
    version: 1.0.0
    status: Draft
    canonical: false

target_state:
  skill_definition_model: defined
  skill_categories: 12
  proficiency_levels: 7
  skill_lifecycle: defined
  assignment_lifecycle: defined
  evaluation_model: defined
  certification_model: defined
  expiry_and_renewal: defined
  skill_gap_model: defined
  production_skill_gate: defined

implementation:
  skill_registry: not_implemented
  skill_assignment_registry: not_implemented
  evaluation_engine: not_implemented
  certification_engine: not_implemented
  runtime_skill_enforcement: not_verified
  skill_drift_monitoring: not_verified

runtime:
  approved_skills: 0_proven
  evaluated_agent_skills: 0_proven
  certified_agent_skills: 0_proven
  production_authorized_skills: 0_proven
```

---

# 110. Current-State Boundary

This document does not prove that Mianx.ai currently has:

- an implemented Skill Registry;
- approved Skill Definitions;
- evaluated Agent Skills;
- certified Agent Skills;
- active Product Skills;
- active Project Skills;
- active Tenant Skills;
- automated Skill assignment;
- automated evaluation;
- automated certification;
- Skill expiry enforcement;
- Skill drift monitoring;
- Production-authorized Agent Skills.

This document defines target-state Skill Governance only.

---

# 111. Adoption Requirements

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
- [ ] Skill definition is approved.
- [ ] Skill ID standard is approved.
- [ ] Skill categories are approved.
- [ ] Skill families are approved.
- [ ] atomic and composite Skill rules are approved.
- [ ] proficiency levels are approved.
- [ ] proficiency dimensions are approved.
- [ ] Skill lifecycle is approved.
- [ ] Agent Skill assignment lifecycle is approved.
- [ ] Skill assignment record is approved.
- [ ] Role-to-Skill relationship is approved.
- [ ] capability-to-Skill relationship is approved.
- [ ] Tool dependencies are approved.
- [ ] Model dependencies are approved.
- [ ] prompt dependencies are approved.
- [ ] memory and Data dependencies are approved.
- [ ] Product and Project Skill rules are approved.
- [ ] Tenant and Customer Skill rules are approved.
- [ ] high-risk Skill rules are approved.
- [ ] regulated Skill rules are approved.
- [ ] evaluation profile is approved.
- [ ] evidence levels are approved.
- [ ] certification process is approved.
- [ ] expiry and renewal are approved.
- [ ] restriction, suspension, and revocation are approved.
- [ ] Skill drift controls are approved.
- [ ] Skill inheritance is approved.
- [ ] Skill portability is approved.
- [ ] incompatible-Skill controls are approved.
- [ ] Skill gap process is approved.
- [ ] training relationship is approved.
- [ ] Skill Registry is implemented.
- [ ] Agent Skill assignment Registry is implemented.
- [ ] evaluation engine is implemented.
- [ ] certification engine is implemented.
- [ ] expiry enforcement is implemented.
- [ ] one-Agent Skill proof passes.
- [ ] multi-Skill proof passes.
- [ ] Team Skill proof passes.
- [ ] Multi-Project Skill proof passes.
- [ ] Multi-Tenant Skill proof passes where applicable.
- [ ] Production Skill proof passes.
- [ ] `INDEX.md` is updated.
- [ ] `ROADMAP.md` is updated.
- [ ] `CHANGELOG.md` is updated.

---

# 112. Review Questions

Reviewers should answer:

1. Is Skill clearly separated from Role?
2. Is Skill clearly separated from Capability?
3. Is Skill clearly separated from Tool and Model?
4. Is Skill clearly separated from certification?
5. Does every Skill have a stable identity?
6. Are Skill categories complete?
7. Are proficiency levels measurable?
8. Does a high proficiency avoid granting extra authority?
9. Are Agent-specific evaluations required?
10. Are Tool and Model dependencies versioned?
11. Are prompt and memory dependencies controlled?
12. Are Product and Project Skills scoped?
13. Are Tenant and Customer Skills isolated?
14. Are environment-specific Skills controlled?
15. Are high-risk Skills sufficiently governed?
16. Are regulated Skills Human-controlled?
17. Are evaluation states clear?
18. Are critical failures explicit?
19. Are evidence levels sufficient?
20. Is certification time-bounded?
21. Can certification exceed evaluated proficiency?
22. Are expiry and renewal controlled?
23. Can one Skill be restricted without suspending the entire Agent?
24. Is Skill drift detectable?
25. Is automatic Skill inheritance prohibited?
26. Are portability rules sufficient?
27. Are incompatible Skills controlled?
28. Are Skill gaps visible?
29. Is training separated from proficiency?
30. Is Production Skill use separately approved?
31. Are current-state limitations explicit?
32. Are any runtime Skill claims unsupported?

---

# 113. Definition of Done

This document is content-complete for review when:

- [ ] purpose is defined;
- [ ] current authority status is explicit;
- [ ] exact strategic hierarchy is included;
- [ ] Skill principles are defined;
- [ ] non-equivalence rule is defined;
- [ ] Skill is defined;
- [ ] Skill versus Role is defined;
- [ ] Skill versus Capability is defined;
- [ ] Skill versus Tool is defined;
- [ ] Skill versus Model is defined;
- [ ] Skill versus certification is defined;
- [ ] Skill versus performance is defined;
- [ ] Skill entity model is defined;
- [ ] Skill ID standard is defined;
- [ ] Skill Definition record is defined;
- [ ] Skill categories are defined;
- [ ] Skill families are defined;
- [ ] atomic Skills are defined;
- [ ] composite Skills are defined;
- [ ] proficiency levels are defined;
- [ ] proficiency dimensions are defined;
- [ ] proficiency decision is defined;
- [ ] Skill lifecycle is defined;
- [ ] Agent Skill assignment lifecycle is defined;
- [ ] assignment states are defined;
- [ ] Agent Skill assignment record is defined;
- [ ] Role-to-Skill relationship is defined;
- [ ] Agent-to-Skill relationship is defined;
- [ ] capability-to-Skill relationship is defined;
- [ ] Agent-Type-to-Skill relationship is defined;
- [ ] prerequisites are defined;
- [ ] dependencies are defined;
- [ ] Tool dependencies are defined;
- [ ] Model dependencies are defined;
- [ ] prompt dependencies are defined;
- [ ] memory dependencies are defined;
- [ ] Data dependencies are defined;
- [ ] Product Skills are defined;
- [ ] Project Skills are defined;
- [ ] Tenant and Customer Skills are defined;
- [ ] environment Skills are defined;
- [ ] regional Skills are defined;
- [ ] high-risk Skills are defined;
- [ ] regulated Skills are defined;
- [ ] Skill evaluation is defined;
- [ ] evaluation profile is defined;
- [ ] critical failures are defined;
- [ ] evaluation evidence is defined;
- [ ] Skill evidence levels are defined;
- [ ] certification is defined;
- [ ] certification rules are defined;
- [ ] Skill validity is defined;
- [ ] expiry is defined;
- [ ] renewal is defined;
- [ ] restriction is defined;
- [ ] suspension is defined;
- [ ] revocation is defined;
- [ ] retirement is defined;
- [ ] Skill drift is defined;
- [ ] inheritance is defined;
- [ ] Product and Project overlays are defined;
- [ ] portability is defined;
- [ ] incompatible Skills are defined;
- [ ] Skill gaps are defined;
- [ ] training relationship is defined;
- [ ] reassessment triggers are defined;
- [ ] Skill monitoring is defined;
- [ ] Skill Registry is defined;
- [ ] reporting is defined;
- [ ] metrics are defined;
- [ ] one-Agent proof is defined;
- [ ] multi-Skill proof is defined;
- [ ] Team proof is defined;
- [ ] Multi-Project proof is defined;
- [ ] Multi-Tenant proof is defined;
- [ ] Production Skill gate is defined;
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

# 114. Current Documentation Progress

After this document is saved:

```text
Total Planned AI Workforce Documents = 83

Content Complete for Review = 20

Existing Drafts Needing Alignment Review = 0

Empty Placeholders Remaining = 63

Approved Documents = 0

Active Canonical Documents = 0

Agents Folder Documents Completed = 3 of 7

Skill Registry Implemented = NO

Verified Evaluated Agent Skills = 0

Verified Certified Agent Skills = 0

Verified Production-Authorized Agent Skills = 0
```

---

# 115. Current Document Decision

```text
DOCUMENT_ID=AIW-AGENT-SKILLS-001

DOCUMENT_VERSION=1.0.0

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TARGET_STATE_SKILL_MODEL=DEFINED

SKILL_REGISTRY=NOT_IMPLEMENTED

SKILL_EVALUATION_ENGINE=NOT_IMPLEMENTED

CERTIFICATION_ENGINE=NOT_IMPLEMENTED

IMPLEMENTATION_PROOF=NOT_PROVIDED

VERIFIED_RUNTIME_SKILLS=0

RUNTIME_AGENT_ACTIVATION=NOT_AUTHORIZED

PRODUCTION_OPERATIONAL=NO
```

---

# 116. Revision History

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1.0 | 2026-08-06 | Draft | Initial AI Agent Skills outline |
| 1.0.0 | 2026-08-06 | Draft | Defined Skill identity, categories, families, proficiency levels, Skill lifecycle, Agent Skill assignments, Role and Capability relationships, Tool, Model, prompt, memory and Data dependencies, Product, Project, Tenant, environment, high-risk and regulated Skills, evaluation, certification, evidence, expiry, renewal, restriction, revocation, Skill drift, inheritance, portability, Skill gaps, Production gates, risks, prohibited behavior, and current-state boundaries |

---

# 117. Changelog Entry

Append the following entry to:

```text
doc/19-ai-workforce/CHANGELOG.md
```

```markdown
## AIW-CHG-20260806-020 — AI Agent Skills Completed

| Field | Value |
|---|---|
| Date | 2026-08-06 |
| Change Type | `CREATED`, `STATUS`, `GOVERNANCE`, `CAPABILITY`, `QUALITY` |
| Impact | `I3 — Major` |
| Risk | `R3` |
| Status | Completed for Review |
| Owner | AI Workforce Council |
| Steward | Agent Framework and Capability Governance |
| Approver | Pending Founder and Enterprise Governance Review |

### Affected Documents

- `doc/19-ai-workforce/agents/agent-skills.md`
- `doc/19-ai-workforce/INDEX.md`
- `doc/19-ai-workforce/ROADMAP.md`
- `doc/19-ai-workforce/CHANGELOG.md`

### Previous State

`agent-skills.md` existed as an empty placeholder.

The Agents documentation defined Agent Types and Agent Lifecycle but lacked a
dedicated governed model for Skill identity, proficiency, evidence,
evaluation, certification, expiry, renewal, inheritance, dependencies, gaps,
and Production Skill assurance.

### New State

The document now defines:

- the difference between Role, Skill, Capability, Tool, Model, prompt,
  certification, and performance;
- Skill identity and versioning;
- twelve Skill categories;
- Skill families, atomic Skills, and composite Skills;
- seven proficiency levels from `SP-0` through `SP-6`;
- multidimensional proficiency evaluation;
- Skill Definition and Agent Skill assignment records;
- Skill Definition and assignment lifecycles;
- Role-to-Skill, Agent-to-Skill, Capability-to-Skill, and Agent-Type-to-Skill
  relationships;
- prerequisites and Skill dependencies;
- Tool, Model, prompt, memory, and Data dependencies;
- Product, Project, Tenant, Customer, environment, regional, high-risk, and
  regulated Skills;
- Skill evaluation profiles, result states, critical failures, and evidence;
- Skill evidence levels;
- Skill certification and validity;
- Skill expiry, renewal, restriction, suspension, revocation, and retirement;
- Skill drift and reassessment;
- Skill inheritance, Product overlays, portability, and incompatible Skills;
- Skill gaps and remediation;
- training and learning-path relationships;
- Skill monitoring, Registry, reporting, and metrics;
- one-Agent, multi-Skill, Team, Multi-Project, Multi-Tenant, and Production
  Skill proof requirements;
- risks, anti-patterns, prohibited behavior, and current-state boundaries.

### Preserved Truth

```text
Role Requirement
≠
Agent Skill

Tool Access
≠
Tool Proficiency

Model Capability
≠
Agent Proficiency

Training Completion
≠
Skill Certification

Skill Proficiency
≠
Execution Authority
```

### Limitations

- Founder approval is pending.
- Canonical status remains false.
- Skill Registry is not implemented.
- evaluation engine is not implemented.
- certification engine is not implemented.
- runtime Skill enforcement is not proven.
- evaluated Agent Skills proven by documentation remain zero.
- Production-authorized Agent Skills are not proven.

### Follow-Up

- complete `doc/19-ai-workforce/agents/agent-tools.md`;
- use document ID `AIW-AGENT-TOOLS-001`;
- distinguish Tool definitions, Tool instances, connectors, credentials,
  actions, permissions, and Agent Tool Profiles;
- define Tool categories, Risk, approval, action-level authorization,
  Product, Project, Tenant, Customer, and environment scope;
- define destructive Tool controls;
- define Tool evaluation, monitoring, suspension, replacement, retirement,
  evidence, and Production gates;
- update the INDEX and Roadmap after completion.
```

---

# 118. Next Document

The next document in the official Agents documentation sequence is:

```text
doc/19-ai-workforce/agents/agent-tools.md
```

It must use:

```text
AIW-AGENT-TOOLS-001
```

It must define:

- Tool purpose;
- Tool Definition;
- Tool Instance;
- Tool connector;
- Tool action;
- Agent Tool Profile;
- Tool categories;
- read, write, destructive, privileged, financial, communication, and
  Production actions;
- action-level permissions;
- credentials and secrets;
- Product, Project, Tenant, Customer, and environment scope;
- Tool evaluation;
- Tool monitoring;
- rate limits;
- cost limits;
- Tool failure;
- fallback;
- suspension;
- replacement;
- retirement;
- Tool evidence;
- current-state limitations;
- Changelog entry;
- next document path.

---