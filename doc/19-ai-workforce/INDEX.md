---
id: AIW-INDEX-001
title: Mianx.ai AI Workforce Documentation Index
version: 1.0.0
status: Draft

type: Controlled Documentation Index
class: Governed

owner: Mianx.ai Founder
steward: AI Workforce Council
authority: Founder and Enterprise Governance

reviewers:
  - Founder
  - AI CEO
  - Chief Technology Officer
  - Chief Operating Officer
  - Chief Product Officer
  - Chief Financial Officer
  - Chief Human Resources Officer
  - Chief Information Security Officer
  - Chief Legal Officer
  - Enterprise Architecture
  - AI Operating System Owner
  - AI Workforce Operations
  - Enterprise Quality
  - Documentation Governance

created: 2026-08-06
updated: 2026-08-06

classification: Internal

audience:
  - Founder
  - Executive Leadership
  - AI Workforce Council
  - Department Directors
  - Product Owners
  - Project Owners
  - Enterprise Architects
  - AI Platform Engineers
  - Security Teams
  - Quality Teams
  - Operations Teams
  - Documentation Maintainers
  - AI Agents

depends_on:
  - ./README.md
  - ../01-governance/AI-CONSTITUTION.md
  - ../01-governance/ENTERPRISE-PRINCIPLES.md
  - ../02-company/VISION-AND-MISSION.md
  - ../20-ai-operating-system/MASTER-BLUEPRINT.md
  - ../20-ai-operating-system/MULTI-PROJECT-OPERATING-MODEL.md
  - ../CURRENT-STATE.md
  - ../DOCUMENT-STATUS-REGISTRY.md
  - ../CANONICAL-DOCUMENT-MAP.md

related_documents:
  - ./ROADMAP.md
  - ./CHANGELOG.md
  - ./AGENT-CAPACITY-BASELINE.md
  - ./C-SUITE-AGENT-REGISTRY.md
  - ./VERIFIABLE-WORK-ENVELOPE.md
  - ../20-ai-operating-system/README.md
  - ../21-memory-engine/README.md
  - ../22-agent-framework/README.md
  - ../23-multi-agent-system/README.md
  - ../44-enterprise-ai/AI-GOVERNANCE.md
  - ../../execution/EXECUTION-BOARD.md

review_cycle:
  - After Every AI Workforce Document Change
  - Monthly During Documentation Completion
  - Quarterly During Implementation
  - Annually After Stable Operation
  - Workforce Structure Change
  - Canonical Authority Change
  - Critical AI or Security Incident

inventory_snapshot:
  date: 2026-08-06
  total_documents: 83
  root_documents: 17
  subfolder_documents: 66
  existing_substantive_documents_before_section_completion: 3
  planned_placeholders_before_section_completion: 80

expected_status_after_this_file_is_saved:
  content_complete_for_review: 2
  content_present_needs_alignment_review: 3
  placeholders_remaining: 78

canonical: false
---

# Mianx.ai AI Workforce Documentation Index

> This INDEX is the controlled inventory, navigation map, status register,
> dependency guide, and official completion sequence for every document under
> `doc/19-ai-workforce/`.

---

# 1. Document Purpose

This document provides one authoritative index for the complete Mianx.ai AI
Workforce documentation section.

It defines:

- every planned AI Workforce document;
- every document's stable ID;
- every document's exact repository path;
- each document's purpose;
- each document's current lifecycle status;
- each document's content status;
- each document's canonical status;
- the owner responsible for maintaining it;
- the official order in which documents must be completed;
- the relationship between root documents and subfolder documents;
- the difference between existing content and empty placeholders;
- the conditions required before a document may be marked complete;
- the next approved document in the sequence.

This INDEX prevents:

- missing documents;
- duplicate documents;
- conflicting document IDs;
- random documentation order;
- unsupported completion claims;
- empty placeholders being reported as complete;
- multiple active sources of truth;
- inconsistent file naming;
- unowned documentation;
- incomplete cross-linking;
- accidental deletion of planned documents.

---

# 2. Section Scope

This INDEX applies to:

```text
doc/19-ai-workforce/
```

It covers documentation for:

- AI Workforce Vision;
- AI Workforce Strategy;
- Workforce operating model;
- Workforce Architecture;
- Workforce Governance;
- Workforce Security;
- Workforce lifecycle;
- Workforce capabilities;
- Workforce capacity;
- AI Agent identities;
- AI Agent roles;
- teams;
- departments;
- leadership;
- orchestration;
- workflows;
- skills;
- tools;
- models;
- memory boundaries;
- policies;
- standards;
- training;
- evaluation;
- performance;
- KPIs;
- playbooks;
- templates;
- evidence requirements.

It does not replace technical runtime documentation maintained under:

```text
doc/20-ai-operating-system/
doc/21-memory-engine/
doc/22-agent-framework/
doc/23-multi-agent-system/
doc/44-enterprise-ai/
```

---

# 3. Current Authority Status

This INDEX currently has the following status:

```text
DOCUMENT_STATUS=DRAFT

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

INVENTORY_STATUS=STRUCTURE_VERIFIED

CONTENT_STATUS=COMPLETE_FOR_REVIEW

IMPLEMENTATION_STATUS=NOT_APPLICABLE

RUNTIME_ENFORCEMENT=NOT_VERIFIED
```

This INDEX:

- organizes documentation;
- assigns proposed stable document IDs;
- records content status;
- defines the completion sequence;
- identifies canonical candidates;
- identifies existing substantive documents;
- identifies empty placeholders.

It does not:

- activate AI Agents;
- grant AI authority;
- prove AI Workforce implementation;
- prove runtime capacity;
- prove Production operation;
- authorize provider spending;
- establish active Agent counts;
- override Founder-approved Governance;
- replace runtime evidence.

---

# 4. Documentation Inventory Summary

The AI Workforce section contains:

| Category | Count |
|---|---:|
| Total planned documents | 83 |
| Root-level documents | 17 |
| Subfolder documents | 66 |
| Subfolders | 15 |
| Existing substantive documents before README completion | 3 |
| Empty placeholders before README completion | 80 |
| Documents completed for review after README and INDEX | 2 |
| Existing documents requiring alignment review | 3 |
| Remaining placeholders after README and INDEX | 78 |

The three existing substantive documents are:

1. `AGENT-CAPACITY-BASELINE.md`
2. `C-SUITE-AGENT-REGISTRY.md`
3. `VERIFIABLE-WORK-ENVELOPE.md`

These documents must be reviewed and aligned.

They must not be recreated as duplicate files.

---

# 5. Documentation Status Model

Every document must use one lifecycle status.

| Status | Meaning |
|---|---|
| `Placeholder` | File exists but has no substantive content |
| `Draft` | Content has been written but is not approved |
| `Review` | Content is under formal review |
| `Approved` | Required authority has approved the document |
| `Active` | Document is the current governing authority within its scope |
| `Maintained` | Active document is being reviewed and updated |
| `Deprecated` | Document is no longer active but remains for traceability |
| `Archived` | Historical document retained outside active authority |

---

# 6. Content Status Model

Lifecycle status and content status must remain separate.

| Content Status | Meaning |
|---|---|
| `Empty` | Zero-byte or whitespace-only placeholder |
| `Outline` | Headings or partial structure only |
| `In Progress` | Substantive content is being written |
| `Content Complete for Review` | Required content exists and is ready for review |
| `Needs Alignment Review` | Existing content must be checked against current Governance and Architecture |
| `Revision Required` | Review found material changes are required |
| `Verified Complete` | Content, links, metadata, and required review checks are complete |

A populated document is not automatically Approved.

An Approved document is not automatically implemented.

---

# 7. Canonical Status Model

| Canonical Status | Meaning |
|---|---|
| `No` | Not an approved source of truth |
| `Candidate` | Intended to become canonical after review and approval |
| `Yes` | Approved canonical authority within the defined scope |
| `Superseded` | Replaced by another canonical authority |

Every material topic should normally have:

```text
One Canonical Document
        +
One Named Owner
        +
One Defined Scope
        +
Many References
```

---

# 8. Priority Model

| Priority | Meaning |
|---|---|
| `P0 — Critical` | Governance, identity, authority, Security, evidence, or foundational control |
| `P1 — High` | Required for Workforce design, operation, or implementation |
| `P2 — Medium` | Required for scale, maturity, consistency, or optimization |
| `P3 — Supporting` | Template, reference, or supporting operational material |

Priority does not override dependency order.

---

# 9. Completion Rules

A document may be marked `Content Complete for Review` only when it includes:

- valid YAML metadata;
- stable document ID;
- title;
- version;
- lifecycle status;
- owner;
- steward;
- authority;
- reviewers;
- classification;
- audience;
- dependencies;
- purpose;
- scope;
- exclusions;
- responsibilities;
- authority boundaries;
- current-state boundary;
- target-state boundary;
- controls;
- evidence requirements where applicable;
- related documents;
- review cycle;
- revision history;
- next document where applicable.

A document may be marked `Approved` only when:

- required reviewers have completed review;
- material conflicts have been resolved;
- required Founder approval is recorded;
- canonical scope is clear;
- links are verified;
- duplicate authorities are reconciled;
- the Status Registry is updated;
- the exact approved version is recorded.

---

# 10. Official Documentation Sequence

The official completion sequence is:

```text
README
  ↓
INDEX
  ↓
ROADMAP
  ↓
CHANGELOG
  ↓
Workforce Vision
  ↓
Workforce Strategy
  ↓
Workforce Operating Model
  ↓
Workforce Architecture
  ↓
Workforce Governance
  ↓
Workforce Security
  ↓
Workforce Capabilities
  ↓
Workforce Lifecycle
  ↓
Workforce Metrics
  ↓
Workforce Checklists
  ↓
Existing Capacity, Executive Registry, and Evidence Documents Review
  ↓
Organization
  ↓
Leadership
  ↓
Roles
  ↓
Agents
  ↓
Capability Registries
  ↓
Teams
  ↓
Orchestration
  ↓
Workflows
  ↓
Shared Memory
  ↓
Policies
  ↓
Standards
  ↓
Training and Evaluation
  ↓
KPIs
  ↓
Playbooks
  ↓
Templates
  ↓
Final Cross-Link and Approval Audit
```

No document should be skipped without a recorded decision.

---

# 11. Root Documentation Index

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 001 | `AIW-README-001` | [`README.md`](./README.md) | AI Workforce section overview, scope, boundaries, hierarchy, and navigation | P0 | Draft | Content Complete for Review | Candidate |
| 002 | `AIW-INDEX-001` | `INDEX.md` | Controlled document inventory, status register, and completion sequence | P0 | Draft | Content Complete for Review | Candidate |
| 003 | `AIW-ROADMAP-001` | [`ROADMAP.md`](./ROADMAP.md) | Documentation and implementation Roadmap with phases and gates | P0 | Placeholder | Empty | Candidate |
| 004 | `AIW-CHANGELOG-001` | [`CHANGELOG.md`](./CHANGELOG.md) | Immutable history of material documentation changes | P1 | Placeholder | Empty | Candidate |
| 005 | `AIW-VISION-001` | [`workforce-vision.md`](./workforce-vision.md) | Long-term destination and intended impact of the AI Workforce | P0 | Placeholder | Empty | Candidate |
| 006 | `AIW-STRATEGY-001` | [`workforce-strategy.md`](./workforce-strategy.md) | Strategy for designing, building, validating, and scaling the Workforce | P0 | Placeholder | Empty | Candidate |
| 007 | `AIW-OPERATING-MODEL-001` | [`workforce-operating-model.md`](./workforce-operating-model.md) | Day-to-day allocation, execution, review, and improvement model | P0 | Placeholder | Empty | Candidate |
| 008 | `AIW-ARCH-001` | [`workforce-architecture.md`](./workforce-architecture.md) | Organizational and system-level AI Workforce Architecture | P0 | Placeholder | Empty | Candidate |
| 009 | `AIW-GOV-001` | [`workforce-governance.md`](./workforce-governance.md) | Authority, delegation, approvals, oversight, exceptions, and control | P0 | Placeholder | Empty | Candidate |
| 010 | `AIW-SEC-001` | [`workforce-security.md`](./workforce-security.md) | Identity, permissions, isolation, Tool, Model, memory, and incident controls | P0 | Placeholder | Empty | Candidate |
| 011 | `AIW-CAPABILITIES-001` | [`workforce-capabilities.md`](./workforce-capabilities.md) | Workforce capability structure combining skills, tools, models, and workflows | P1 | Placeholder | Empty | Candidate |
| 012 | `AIW-LIFECYCLE-001` | [`workforce-lifecycle.md`](./workforce-lifecycle.md) | Lifecycle for roles, Agents, teams, departments, and capability allocations | P0 | Placeholder | Empty | Candidate |
| 013 | `AIW-METRICS-001` | [`workforce-metrics.md`](./workforce-metrics.md) | Workforce performance, quality, cost, Risk, and outcome measures | P1 | Placeholder | Empty | Candidate |
| 014 | `AIW-CHECKLISTS-001` | [`workforce-checklists.md`](./workforce-checklists.md) | Activation, review, suspension, retirement, and audit checklists | P1 | Placeholder | Empty | Candidate |
| 015 | `AIW-CAPACITY-001` | [`AGENT-CAPACITY-BASELINE.md`](./AGENT-CAPACITY-BASELINE.md) | Controlled counting, department allocation, runtime reporting, and capacity planning | P0 | Draft | Needs Alignment Review | Candidate |
| 016 | `AIW-REG-CSUITE-001` | [`C-SUITE-AGENT-REGISTRY.md`](./C-SUITE-AGENT-REGISTRY.md) | Proposed executive Agent identities, authority, responsibilities, and lifecycle | P0 | Draft | Needs Alignment Review | Candidate |
| 017 | `AIW-VWE-001` | [`VERIFIABLE-WORK-ENVELOPE.md`](./VERIFIABLE-WORK-ENVELOPE.md) | Mandatory evidence contract for material AI work | P0 | Draft | Needs Alignment Review | Candidate |

---

# 12. Organization Documentation Index

Folder:

```text
organization/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 018 | `AIW-ORG-STRUCTURE-001` | [`organization/organization-structure.md`](./organization/organization-structure.md) | Defines the complete organizational structure of the AI Workforce | P0 | Placeholder | Empty | Candidate |
| 019 | `AIW-ORG-DEPARTMENTS-001` | [`organization/department-structure.md`](./organization/department-structure.md) | Defines departments, domains, ownership, and departmental boundaries | P0 | Placeholder | Empty | Candidate |
| 020 | `AIW-ORG-CHART-001` | [`organization/org-chart.md`](./organization/org-chart.md) | Provides the visual and textual Workforce hierarchy | P1 | Placeholder | Empty | Candidate |
| 021 | `AIW-ORG-REPORTING-001` | [`organization/reporting-hierarchy.md`](./organization/reporting-hierarchy.md) | Defines formal reporting and escalation relationships | P0 | Placeholder | Empty | Candidate |
| 022 | `AIW-ORG-RACI-001` | [`organization/responsibility-matrix.md`](./organization/responsibility-matrix.md) | Defines accountable, responsible, consulted, and informed roles | P0 | Placeholder | Empty | Candidate |
| 023 | `AIW-ORG-ESCALATION-001` | [`organization/escalation-matrix.md`](./organization/escalation-matrix.md) | Defines standard and specialist escalation paths | P0 | Placeholder | Empty | Candidate |

---

# 13. Leadership Documentation Index

Folder:

```text
leadership/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 024 | `AIW-LEAD-MODEL-001` | [`leadership/leadership-model.md`](./leadership/leadership-model.md) | Defines AI leadership philosophy, authority, accountability, and boundaries | P0 | Placeholder | Empty | Candidate |
| 025 | `AIW-LEAD-EXECUTIVE-001` | [`leadership/executive-team.md`](./leadership/executive-team.md) | Defines the proposed AI executive team structure and collaboration model | P0 | Placeholder | Empty | Candidate |
| 026 | `AIW-LEAD-DECISION-001` | [`leadership/decision-framework.md`](./leadership/decision-framework.md) | Defines decision classes, authority levels, review, and escalation | P0 | Placeholder | Empty | Candidate |
| 027 | `AIW-LEAD-STRATEGY-001` | [`leadership/strategic-planning.md`](./leadership/strategic-planning.md) | Defines how approved strategy becomes objectives, programs, and reviews | P1 | Placeholder | Empty | Candidate |

---

# 14. Role Documentation Index

Folder:

```text
roles/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 028 | `AIW-ROLE-CATALOG-001` | [`roles/role-catalog.md`](./roles/role-catalog.md) | Master catalog of approved AI Workforce roles | P0 | Placeholder | Empty | Candidate |
| 029 | `AIW-ROLE-DESCRIPTIONS-001` | [`roles/job-descriptions.md`](./roles/job-descriptions.md) | Standard role-purpose, responsibility, authority, and output definitions | P1 | Placeholder | Empty | Candidate |
| 030 | `AIW-ROLE-SKILL-MATRIX-001` | [`roles/skill-matrix.md`](./roles/skill-matrix.md) | Maps roles to required skills, proficiency, tools, and evaluation | P1 | Placeholder | Empty | Candidate |
| 031 | `AIW-ROLE-CAREER-001` | [`roles/career-framework.md`](./roles/career-framework.md) | Defines capability progression, levels, readiness, and advancement | P2 | Placeholder | Empty | Candidate |

---

# 15. Agent Documentation Index

Folder:

```text
agents/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 032 | `AIW-AGENT-TYPES-001` | [`agents/agent-types.md`](./agents/agent-types.md) | Defines supported Agent categories and responsibility boundaries | P0 | Placeholder | Empty | Candidate |
| 033 | `AIW-AGENT-LIFECYCLE-001` | [`agents/agent-lifecycle.md`](./agents/agent-lifecycle.md) | Defines individual Agent proposal, approval, provisioning, activation, and retirement | P0 | Placeholder | Empty | Candidate |
| 034 | `AIW-AGENT-SKILLS-001` | [`agents/agent-skills.md`](./agents/agent-skills.md) | Defines how Agent skills are assigned, evaluated, versioned, and revoked | P1 | Placeholder | Empty | Candidate |
| 035 | `AIW-AGENT-TOOLS-001` | [`agents/agent-tools.md`](./agents/agent-tools.md) | Defines Agent Tool access, permissions, restrictions, and monitoring | P0 | Placeholder | Empty | Candidate |
| 036 | `AIW-AGENT-MEMORY-001` | [`agents/agent-memory.md`](./agents/agent-memory.md) | Defines Agent-specific context, memory, retention, isolation, and deletion | P0 | Placeholder | Empty | Candidate |
| 037 | `AIW-AGENT-COLLAB-001` | [`agents/agent-collaboration.md`](./agents/agent-collaboration.md) | Defines controlled Agent-to-Agent collaboration and delegation | P1 | Placeholder | Empty | Candidate |
| 038 | `AIW-AGENT-PERFORMANCE-001` | [`agents/agent-performance.md`](./agents/agent-performance.md) | Defines Agent performance, evaluation, quality, cost, and Risk measures | P1 | Placeholder | Empty | Candidate |

---

# 16. Capability Registry Documentation Index

Folder:

```text
capabilities/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 039 | `AIW-REG-CAPABILITY-001` | [`capabilities/capability-registry.md`](./capabilities/capability-registry.md) | Master registry of approved reusable Workforce capabilities | P0 | Placeholder | Empty | Candidate |
| 040 | `AIW-REG-SKILL-001` | [`capabilities/skill-registry.md`](./capabilities/skill-registry.md) | Registry of approved skills, proficiency levels, and eligible roles | P0 | Placeholder | Empty | Candidate |
| 041 | `AIW-REG-TOOL-001` | [`capabilities/tool-registry.md`](./capabilities/tool-registry.md) | Registry of approved tools, permissions, Risks, and allowed scopes | P0 | Placeholder | Empty | Candidate |
| 042 | `AIW-REG-MODEL-001` | [`capabilities/model-registry.md`](./capabilities/model-registry.md) | Registry of approved models, providers, uses, restrictions, and cost controls | P0 | Placeholder | Empty | Candidate |

---

# 17. Team Documentation Index

Folder:

```text
teams/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 043 | `AIW-TEAM-STRUCTURE-001` | [`teams/team-structure.md`](./teams/team-structure.md) | Defines permanent, temporary, Product, Project, and incident team structures | P1 | Placeholder | Empty | Candidate |
| 044 | `AIW-TEAM-GOV-001` | [`teams/team-governance.md`](./teams/team-governance.md) | Defines team ownership, authority, approvals, and termination | P1 | Placeholder | Empty | Candidate |
| 045 | `AIW-TEAM-COMM-001` | [`teams/team-communication.md`](./teams/team-communication.md) | Defines team communication channels, records, and information boundaries | P2 | Placeholder | Empty | Candidate |
| 046 | `AIW-TEAM-COORD-001` | [`teams/team-coordination.md`](./teams/team-coordination.md) | Defines assignment, dependency, handoff, review, and coordination practices | P1 | Placeholder | Empty | Candidate |

---

# 18. Orchestration Documentation Index

Folder:

```text
orchestration/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 047 | `AIW-ORCH-MODEL-001` | [`orchestration/orchestration-model.md`](./orchestration/orchestration-model.md) | Defines Workforce-level orchestration responsibilities and boundaries | P0 | Placeholder | Empty | Candidate |
| 048 | `AIW-ORCH-DELEGATION-001` | [`orchestration/delegation-engine.md`](./orchestration/delegation-engine.md) | Defines governed delegation, expiry, revocation, and evidence requirements | P0 | Placeholder | Empty | Candidate |
| 049 | `AIW-ORCH-COLLAB-001` | [`orchestration/collaboration-engine.md`](./orchestration/collaboration-engine.md) | Defines cross-Agent and cross-team collaboration controls | P1 | Placeholder | Empty | Candidate |
| 050 | `AIW-ORCH-CONFLICT-001` | [`orchestration/conflict-resolution.md`](./orchestration/conflict-resolution.md) | Defines conflict identification, authority analysis, escalation, and resolution | P0 | Placeholder | Empty | Candidate |

---

# 19. Workflow Documentation Index

Folder:

```text
workflows/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 051 | `AIW-WF-ENGINE-001` | [`workflows/workflow-engine.md`](./workflows/workflow-engine.md) | Defines Workforce workflow concepts and relationship with the AI OS engine | P0 | Placeholder | Empty | Candidate |
| 052 | `AIW-WF-ASSIGNMENT-001` | [`workflows/task-assignment.md`](./workflows/task-assignment.md) | Defines controlled task assignment, acceptance, reassignment, and closure | P0 | Placeholder | Empty | Candidate |
| 053 | `AIW-WF-ROUTING-001` | [`workflows/task-routing.md`](./workflows/task-routing.md) | Defines role, capacity, Risk, Project, and Tenant-aware task routing | P0 | Placeholder | Empty | Candidate |
| 054 | `AIW-WF-APPROVAL-001` | [`workflows/approval-flow.md`](./workflows/approval-flow.md) | Defines Human and AI approval stages, evidence, expiry, and rejection | P0 | Placeholder | Empty | Candidate |
| 055 | `AIW-WF-CROSS-DEPT-001` | [`workflows/cross-department-workflow.md`](./workflows/cross-department-workflow.md) | Defines controlled work across departments and accountable handoffs | P1 | Placeholder | Empty | Candidate |

---

# 20. Shared Memory Documentation Index

Folder:

```text
shared-memory/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 056 | `AIW-MEM-SHARED-001` | [`shared-memory/shared-memory.md`](./shared-memory/shared-memory.md) | Defines the shared-memory concept, boundaries, authority, and restrictions | P0 | Placeholder | Empty | Candidate |
| 057 | `AIW-MEM-ENTERPRISE-001` | [`shared-memory/enterprise-memory.md`](./shared-memory/enterprise-memory.md) | Defines reusable Mianx.ai organizational memory and Knowledge controls | P0 | Placeholder | Empty | Candidate |
| 058 | `AIW-MEM-PROJECT-001` | [`shared-memory/project-memory.md`](./shared-memory/project-memory.md) | Defines isolated Project memory, ownership, retention, and access | P0 | Placeholder | Empty | Candidate |
| 059 | `AIW-MEM-CLIENT-001` | [`shared-memory/client-memory.md`](./shared-memory/client-memory.md) | Defines Customer memory boundaries, privacy, contracts, and reuse restrictions | P0 | Placeholder | Empty | Candidate |

---

# 21. Policy Documentation Index

Folder:

```text
policies/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 060 | `AIW-POL-SEC-001` | [`policies/security-policy.md`](./policies/security-policy.md) | Defines mandatory AI Workforce security policy | P0 | Placeholder | Empty | Candidate |
| 061 | `AIW-POL-PRIVACY-001` | [`policies/privacy-policy.md`](./policies/privacy-policy.md) | Defines privacy, personal-data, memory, and Customer information controls | P0 | Placeholder | Empty | Candidate |
| 062 | `AIW-POL-ETHICS-001` | [`policies/ethics-policy.md`](./policies/ethics-policy.md) | Defines ethical boundaries, Human impact, fairness, transparency, and escalation | P0 | Placeholder | Empty | Candidate |
| 063 | `AIW-POL-COMPLIANCE-001` | [`policies/compliance-policy.md`](./policies/compliance-policy.md) | Defines legal, contractual, regulatory, audit, and policy-compliance controls | P0 | Placeholder | Empty | Candidate |

---

# 22. Standard Documentation Index

Folder:

```text
standards/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 064 | `AIW-STD-DOC-001` | [`standards/documentation-standard.md`](./standards/documentation-standard.md) | Defines AI Workforce documentation quality, metadata, status, and maintenance | P0 | Placeholder | Empty | Candidate |
| 065 | `AIW-STD-COMM-001` | [`standards/communication-standard.md`](./standards/communication-standard.md) | Defines Agent communication, claims, records, confidentiality, and escalation | P1 | Placeholder | Empty | Candidate |
| 066 | `AIW-STD-PERFORMANCE-001` | [`standards/performance-standard.md`](./standards/performance-standard.md) | Defines required performance, evaluation, quality, cost, and improvement practices | P1 | Placeholder | Empty | Candidate |
| 067 | `AIW-STD-HIRING-001` | [`standards/hiring-standard.md`](./standards/hiring-standard.md) | Defines the controlled creation, qualification, approval, and onboarding of Agent roles | P1 | Placeholder | Empty | Candidate |

---

# 23. Training Documentation Index

Folder:

```text
training/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 068 | `AIW-TRAIN-FRAMEWORK-001` | [`training/training-framework.md`](./training/training-framework.md) | Defines training Governance, sources, environments, evaluation, and records | P1 | Placeholder | Empty | Candidate |
| 069 | `AIW-TRAIN-PATH-001` | [`training/learning-path.md`](./training/learning-path.md) | Defines role-based learning progression and readiness requirements | P2 | Placeholder | Empty | Candidate |
| 070 | `AIW-TRAIN-EVAL-001` | [`training/evaluation.md`](./training/evaluation.md) | Defines pre-activation and continuous Agent evaluation | P0 | Placeholder | Empty | Candidate |
| 071 | `AIW-TRAIN-CERT-001` | [`training/certification.md`](./training/certification.md) | Defines capability certification, expiry, renewal, suspension, and revocation | P1 | Placeholder | Empty | Candidate |

---

# 24. KPI Documentation Index

Folder:

```text
kpis/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 072 | `AIW-KPI-AGENT-001` | [`kpis/agent-kpis.md`](./kpis/agent-kpis.md) | Defines individual Agent outcome, quality, Risk, cost, and reliability measures | P1 | Placeholder | Empty | Candidate |
| 073 | `AIW-KPI-TEAM-001` | [`kpis/team-kpis.md`](./kpis/team-kpis.md) | Defines team delivery, coordination, quality, and outcome measures | P1 | Placeholder | Empty | Candidate |
| 074 | `AIW-KPI-DEPT-001` | [`kpis/department-kpis.md`](./kpis/department-kpis.md) | Defines department capacity, service, Risk, cost, and outcome measures | P1 | Placeholder | Empty | Candidate |
| 075 | `AIW-KPI-ENTERPRISE-001` | [`kpis/enterprise-kpis.md`](./kpis/enterprise-kpis.md) | Defines enterprise-wide AI Workforce value, control, maturity, and Risk measures | P1 | Placeholder | Empty | Candidate |

---

# 25. Playbook Documentation Index

Folder:

```text
playbooks/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 076 | `AIW-PB-ONBOARDING-001` | [`playbooks/onboarding.md`](./playbooks/onboarding.md) | Operational procedure for Agent registration, approval, provisioning, and allocation | P1 | Placeholder | Empty | Candidate |
| 077 | `AIW-PB-TASK-EXEC-001` | [`playbooks/task-execution.md`](./playbooks/task-execution.md) | Operational procedure for accepting, executing, verifying, and closing tasks | P1 | Placeholder | Empty | Candidate |
| 078 | `AIW-PB-INCIDENT-001` | [`playbooks/incident-response.md`](./playbooks/incident-response.md) | Operational procedure for AI Workforce incidents, containment, evidence, and recovery | P0 | Placeholder | Empty | Candidate |
| 079 | `AIW-PB-OFFBOARDING-001` | [`playbooks/offboarding.md`](./playbooks/offboarding.md) | Operational procedure for suspension, access revocation, memory disposition, and retirement | P1 | Placeholder | Empty | Candidate |

---

# 26. Template Documentation Index

Folder:

```text
templates/
```

| Seq. | Document ID | File | Purpose | Priority | Lifecycle | Content | Canonical |
|---:|---|---|---|---|---|---|---|
| 080 | `AIW-TPL-AGENT-001` | [`templates/agent-template.md`](./templates/agent-template.md) | Standard template for Agent identity, role, authority, configuration, and lifecycle | P2 | Placeholder | Empty | No |
| 081 | `AIW-TPL-TEAM-001` | [`templates/team-template.md`](./templates/team-template.md) | Standard template for AI team purpose, members, authority, and lifecycle | P2 | Placeholder | Empty | No |
| 082 | `AIW-TPL-DEPT-001` | [`templates/department-template.md`](./templates/department-template.md) | Standard template for department scope, ownership, services, and measures | P2 | Placeholder | Empty | No |
| 083 | `AIW-TPL-WORKFLOW-001` | [`templates/workflow-template.md`](./templates/workflow-template.md) | Standard template for governed AI Workforce workflows | P2 | Placeholder | Empty | No |

---

# 27. Ownership Matrix

| Documentation Domain | Primary Owner | Required Reviewers |
|---|---|---|
| Section overview and Index | AI Workforce Council | Founder, Governance, Documentation |
| Vision and Strategy | Founder and AI Workforce Council | Executive Leadership, Product, Architecture |
| Operating Model | AI Workforce Operations | Governance, Operations, Product |
| Architecture | Enterprise Architecture | AI OS, Security, Data, Operations |
| Governance | Founder and Governance Owner | Legal, Security, Operations |
| Security | Chief Information Security Officer | Governance, Architecture, Privacy |
| Capabilities and Registries | AI Workforce Operations | AI OS, Security, Finance |
| Organization and Leadership | Founder and AI Workforce Council | HR, Operations, Governance |
| Roles and Agents | AI Workforce Operations | HR, Security, Department Owner |
| Teams and Orchestration | AI Workforce Operations | Architecture, Operations, Quality |
| Workflows | AI Workforce Operations | AI OS, Product, Quality |
| Shared Memory | Memory and Knowledge Owners | Security, Privacy, Data |
| Policies | Governance Owner | Legal, Security, Privacy |
| Standards | Documentation and Quality Owners | Governance, Operations |
| Training and Evaluation | AI Workforce Training Owner | Quality, Security, Department Owner |
| KPIs and Metrics | Analytics Owner | Finance, Quality, Operations |
| Playbooks | AI Workforce Operations | Security, Quality, Relevant Owner |
| Templates | Documentation Governance | Relevant Domain Owners |

---

# 28. Dependency Groups

## 28.1 Governance Foundation

```text
AI Constitution
      ↓
Enterprise Principles
      ↓
Company Vision and Mission
      ↓
Enterprise AI Governance
      ↓
AI Workforce Governance
```

## 28.2 Workforce Foundation

```text
README
  ↓
INDEX
  ↓
ROADMAP
  ↓
Vision
  ↓
Strategy
  ↓
Operating Model
  ↓
Architecture
```

## 28.3 Organizational Foundation

```text
Workforce Architecture
      ↓
Organization Structure
      ↓
Department Structure
      ↓
Leadership Model
      ↓
Role Catalog
      ↓
Agent Types
```

## 28.4 Runtime Control Foundation

```text
Workforce Governance
      +
Workforce Security
      +
Agent Lifecycle
      +
Capability Registries
      +
Approval Workflow
      +
Verifiable-Work Envelope
```

## 28.5 Performance Foundation

```text
Workforce Metrics
      ↓
Agent KPIs
      ↓
Team KPIs
      ↓
Department KPIs
      ↓
Enterprise KPIs
```

---

# 29. Cross-Domain Boundaries

## 29.1 `05-workforce`

Owns:

- Human and conventional Company roles;
- hiring;
- organizational positions;
- general job descriptions;
- Human workforce references.

It does not own the active AI Agent registry.

## 29.2 `19-ai-workforce`

Owns:

- AI Workforce organization;
- AI role structure;
- Agent Governance;
- Agent capacity;
- teams;
- departments;
- Workforce policies;
- Workforce operating model;
- Agent lifecycle;
- Workforce evidence and measures.

## 29.3 `20-ai-operating-system`

Owns:

- AI execution environment;
- routing;
- scheduling;
- orchestration runtime;
- prompts;
- models;
- tools;
- context;
- task execution;
- monitoring;
- state management.

## 29.4 `21-memory-engine`

Owns:

- memory Architecture;
- memory storage;
- retrieval;
- retention;
- deletion;
- indexing;
- security;
- memory lifecycle.

## 29.5 `22-agent-framework`

Owns:

- technical Agent construction;
- Agent configuration;
- Agent interfaces;
- Agent runtime components;
- Agent evaluation framework;
- Agent provisioning mechanisms.

## 29.6 `23-multi-agent-system`

Owns:

- multi-Agent coordination;
- consensus;
- negotiation;
- communication;
- task distribution;
- load balancing;
- collective resilience.

## 29.7 `44-enterprise-ai`

Owns:

- enterprise AI Governance;
- AI Risk;
- safety;
- compliance;
- responsible AI;
- model Governance;
- enterprise AI adoption controls.

Related folders must reference one another without creating duplicate authority.

---

# 30. Naming Standard

All files must use:

```text
lowercase-kebab-case.md
```

Approved exceptions include established repository control files:

```text
README.md
INDEX.md
ROADMAP.md
CHANGELOG.md
AGENT-CAPACITY-BASELINE.md
C-SUITE-AGENT-REGISTRY.md
VERIFIABLE-WORK-ENVELOPE.md
```

Document IDs must:

- begin with `AIW`;
- identify the document domain;
- remain unique;
- use uppercase letters and hyphens;
- end with a three-digit sequence;
- not change after approval unless formally superseded.

---

# 31. Link Standard

All AI Workforce documents must use stable relative links.

Examples:

```markdown
[AI Workforce README](./README.md)

[Workforce Governance](./workforce-governance.md)

[Agent Lifecycle](./agents/agent-lifecycle.md)

[AI Constitution](../01-governance/AI-CONSTITUTION.md)

[AI Operating System](../20-ai-operating-system/README.md)
```

Documents must not use:

- local absolute filesystem paths;
- temporary Desktop paths;
- private machine-specific paths;
- broken renamed paths;
- links to deleted placeholders;
- inaccessible private evidence without explanation.

---

# 32. Existing Document Review Requirements

The following files already contain substantive draft content:

```text
AGENT-CAPACITY-BASELINE.md
C-SUITE-AGENT-REGISTRY.md
VERIFIABLE-WORK-ENVELOPE.md
```

Before approval, each must be checked for:

- alignment with the final AI Workforce README;
- alignment with Enterprise Principles;
- alignment with the AI Constitution;
- alignment with Workforce Governance;
- alignment with Workforce Security;
- correct authority terminology;
- correct Agent-state terminology;
- current-state accuracy;
- correct dependencies;
- correct links;
- duplicate content;
- consistent Human authority;
- runtime evidence boundaries;
- updated revision history;
- Status Registry entry.

They must not be overwritten without review.

---

# 33. Placeholder Rules

An empty placeholder:

- reserves an approved topic and path;
- is not complete;
- is not approved;
- is not canonical;
- is not implementation evidence;
- must not be counted as substantive documentation;
- must not be deleted only because it is empty;
- must be reviewed before rename, merge, or deletion.

A placeholder may be removed only when:

```text
The responsibility is unnecessary
        +
No unique scope remains
        +
A canonical replacement exists
        +
All references are updated
        +
Impact review is complete
        +
Required approval is recorded
```

---

# 34. Duplicate-Control Rules

Before creating a new AI Workforce document:

1. search this INDEX;
2. search the complete repository;
3. inspect similarly named documents;
4. compare scope and authority;
5. reuse the approved path where possible;
6. record any new document in this INDEX;
7. assign a unique ID;
8. update the Roadmap;
9. update the Changelog.

The deletion rule is:

```text
Exact Same Content
        +
Exact Same Responsibility
        +
Canonical Copy Confirmed
        +
No Required Dependency on Duplicate Path
        =
Controlled Removal Candidate
```

Same filename does not automatically mean duplicate responsibility.

---

# 35. Progress Reporting Standard

AI Workforce documentation progress must report:

```text
Total Planned Documents
Content-Bearing Documents
Empty Placeholders
Documents in Draft
Documents in Review
Approved Documents
Active Canonical Documents
Deprecated Documents
Archived Documents
Broken Links
Duplicate Candidates
```

Progress must not be reported only as:

- file count;
- folder count;
- generated-line count;
- Agent count;
- percentage without definitions.

---

# 36. Current Progress Snapshot

After the completed README and this INDEX are saved:

```text
Total AI Workforce Documents = 83

Content Complete for Review = 2

Existing Content Needing Alignment Review = 3

Empty Placeholders Remaining = 78

Approved Documents = 0

Active Canonical Documents = 0

Runtime Agents Proven by Documentation = 0

Production AI Workforce Proven by Documentation = NO
```

This snapshot must be updated when a document changes status.

---

# 37. Documentation Completion Gates

## Gate 1 — Foundation

Required:

- [x] `README.md` content prepared.
- [x] `INDEX.md` content prepared.
- [ ] `ROADMAP.md` complete.
- [ ] `CHANGELOG.md` complete.
- [ ] root links verified.
- [ ] Founder review completed.

## Gate 2 — Strategic Workforce Definition

Required:

- [ ] Workforce Vision.
- [ ] Workforce Strategy.
- [ ] Workforce Operating Model.
- [ ] Workforce Architecture.
- [ ] Workforce Governance.
- [ ] Workforce Security.

## Gate 3 — Operational Workforce Definition

Required:

- [ ] Workforce Capabilities.
- [ ] Workforce Lifecycle.
- [ ] Workforce Metrics.
- [ ] Workforce Checklists.
- [ ] Capacity Baseline reviewed.
- [ ] C-Suite Registry reviewed.
- [ ] Verifiable-Work Envelope reviewed.

## Gate 4 — Organization and Agent Definition

Required:

- [ ] Organization documents.
- [ ] Leadership documents.
- [ ] Role documents.
- [ ] Agent documents.
- [ ] Team documents.

## Gate 5 — Execution and Control

Required:

- [ ] Capability registries.
- [ ] Orchestration documents.
- [ ] Workflow documents.
- [ ] Memory documents.
- [ ] Policy documents.

## Gate 6 — Maturity and Operations

Required:

- [ ] Standards.
- [ ] Training and evaluation.
- [ ] KPIs.
- [ ] Playbooks.
- [ ] Templates.

## Gate 7 — Final Documentation Closure

Required:

- [ ] all 83 documents have reviewed content;
- [ ] all document IDs are unique;
- [ ] all links pass validation;
- [ ] duplicate authorities are resolved;
- [ ] all lifecycle statuses are accurate;
- [ ] root README is updated;
- [ ] Status Registry is updated;
- [ ] Canonical Document Map is updated;
- [ ] Changelog is updated;
- [ ] required Founder approvals are recorded.

---

# 38. Section Definition of Done

The AI Workforce documentation section is complete only when:

```text
All Planned Documents Reviewed
        +
All Empty Placeholders Resolved
        +
All Metadata Valid
        +
All IDs Unique
        +
All Links Valid
        +
All Owners Assigned
        +
All Authority Boundaries Defined
        +
All Duplicate Authorities Resolved
        +
All Current-State Claims Evidence-Based
        +
All Required Approvals Recorded
        +
Status Registry Updated
        +
Canonical Map Updated
```

Documentation completion does not prove runtime implementation.

---

# 39. Implementation Boundary

This INDEX governs documentation only.

It does not prove:

- Agent Registry implementation;
- Agent provisioning;
- Agent allocation;
- live Agent activation;
- Tool enforcement;
- Model enforcement;
- memory enforcement;
- task routing;
- multi-Agent orchestration;
- provider execution;
- cost controls;
- Production monitoring;
- Production incident response;
- Production AI Workforce operation.

Each implementation claim requires separate technical and operational evidence.

---

# 40. Maintenance Procedure

Whenever an AI Workforce document is created or updated:

1. update the document itself;
2. update its lifecycle status in this INDEX;
3. update its content status in this INDEX;
4. update canonical status where applicable;
5. update `ROADMAP.md`;
6. append a record to `CHANGELOG.md`;
7. verify related links;
8. update `DOCUMENT-STATUS-REGISTRY.md` where required;
9. update `CANONICAL-DOCUMENT-MAP.md` where required;
10. record required approval;
11. identify the next document.

Previous Changelog entries must not be rewritten.

---

# 41. Index Validation Checklist

Before this INDEX is approved:

- [ ] All 83 planned documents are listed.
- [ ] Every path matches the repository.
- [ ] Every document has a unique proposed ID.
- [ ] Existing substantive documents preserve their current IDs.
- [ ] Empty placeholders are marked `Empty`.
- [ ] Existing drafts are marked `Needs Alignment Review`.
- [ ] README and INDEX are marked `Content Complete for Review`.
- [ ] No placeholder is marked complete.
- [ ] No document is marked Approved without approval evidence.
- [ ] No document is marked canonical without approval.
- [ ] Ownership is assigned.
- [ ] Priorities are assigned.
- [ ] Completion sequence is explicit.
- [ ] Cross-domain boundaries are documented.
- [ ] All relative links are verified.
- [ ] Status Registry is updated.
- [ ] Founder decision is recorded.

---

# 42. Current Document Decision

```text
DOCUMENT_ID=AIW-INDEX-001

DOCUMENT_STATUS=DRAFT

CONTENT_STATUS=CONTENT_COMPLETE_FOR_REVIEW

CANONICAL=FALSE

FOUNDER_APPROVAL=PENDING

TOTAL_INDEXED_DOCUMENTS=83

IMPLEMENTATION_STATUS=NOT_APPLICABLE

RUNTIME_ENFORCEMENT=NOT_VERIFIED

PRODUCTION_OPERATIONAL=NOT_APPLICABLE
```

This document may become canonical only after:

- inventory validation;
- path validation;
- ID validation;
- Governance review;
- Documentation Governance review;
- Founder approval;
- Status Registry update;
- Canonical Document Map update.

---

# 43. Related Documents

- [`README.md`](./README.md)
- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`AGENT-CAPACITY-BASELINE.md`](./AGENT-CAPACITY-BASELINE.md)
- [`C-SUITE-AGENT-REGISTRY.md`](./C-SUITE-AGENT-REGISTRY.md)
- [`VERIFIABLE-WORK-ENVELOPE.md`](./VERIFIABLE-WORK-ENVELOPE.md)
- [`AI-CONSTITUTION.md`](../01-governance/AI-CONSTITUTION.md)
- [`ENTERPRISE-PRINCIPLES.md`](../01-governance/ENTERPRISE-PRINCIPLES.md)
- [`VISION-AND-MISSION.md`](../02-company/VISION-AND-MISSION.md)
- [`MASTER-BLUEPRINT.md`](../20-ai-operating-system/MASTER-BLUEPRINT.md)
- [`MULTI-PROJECT-OPERATING-MODEL.md`](../20-ai-operating-system/MULTI-PROJECT-OPERATING-MODEL.md)
- [`CURRENT-STATE.md`](../CURRENT-STATE.md)
- [`DOCUMENT-STATUS-REGISTRY.md`](../DOCUMENT-STATUS-REGISTRY.md)
- [`CANONICAL-DOCUMENT-MAP.md`](../CANONICAL-DOCUMENT-MAP.md)
- [`EXECUTION-BOARD.md`](../../execution/EXECUTION-BOARD.md)

---

# 44. Revision History

| Version | Date | Status | Change |
|---|---|---|---|
| 0.1.0 | 2026-08-06 | Draft | Initial AI Workforce inventory structure |
| 1.0.0 | 2026-08-06 | Draft | Indexed all 83 planned documents, preserved existing IDs, assigned proposed IDs to placeholders, defined lifecycle and content statuses, established ownership, priorities, dependencies, completion gates, and official documentation sequence |

---

# 45. Next Document

The next document in the official AI Workforce documentation sequence is:

```text
doc/19-ai-workforce/ROADMAP.md
```

The Roadmap must define:

- AI Workforce documentation phases;
- exact document-completion order;
- dependencies;
- review gates;
- approval gates;
- implementation boundaries;
- runtime activation boundaries;
- milestone definitions;
- progress measurement;
- Risk controls;
- section-completion criteria.

The Roadmap must not:

- treat placeholder creation as completion;
- claim active AI Agents;
- authorize provider execution;
- claim Production operation;
- bypass Founder approval;
- change the Mianx.ai strategic hierarchy.

---