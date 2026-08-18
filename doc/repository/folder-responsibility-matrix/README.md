---
id: REPO-FRM-IDX-001
title: Folder Responsibility Matrix Module Index
version: 1.0.0
status: Draft

type: Repository Index
class: Governed

owner: Enterprise Architecture
steward: Documentation Architecture Team
authority: Repository Stabilization Program

created: 2026-07-12
updated: 2026-07-12

classification: Internal

audience:
  - Enterprise Architects
  - Documentation Engineers
  - AI Documentation Agents
  - AI Review Agents

parent: REPO-FRM-001

depends_on:
  - REPO-BASELINE-001
  - REPO-CLASS-001
  - REPO-FRM-001

children:
  - FRM-01-10.md
  - FRM-11-20.md
  - FRM-21-30.md
  - FRM-31-40.md
  - FRM-41-50.md

review_cycle: Repository Structural Change

canonical: false
---

# Folder Responsibility Matrix Module Index

## 1. Purpose

This document is the navigation index for the modular Folder Responsibility Matrix documents of the Mianx.ai documentation repository.

It identifies each Folder Responsibility Matrix module, its scope, current status, and execution order.

This document SHALL NOT contain detailed folder responsibility specifications.

---

## 2. Repository Scope

The Folder Responsibility Matrix covers all fifty numbered top-level documentation folders:

```text
01-governance
through
50-enterprise-templates
```

The authoritative list of these folders is maintained by:

```text
docs/REPOSITORY-BASELINE.md
```

---

## 3. Responsibility Model

The Folder Responsibility Matrix uses three document levels.

```text
Master Governance Document
        │
        ▼
Modular FRM Documents
        │
        ▼
Existing Folder READMEs
```

### Master Governance Document

```text
docs/FOLDER-RESPONSIBILITY-MATRIX.md
```

Owns:

- FRM purpose
- Definitions
- Standards
- Governance rules
- Validation framework
- Acceptance framework
- Overall repository status

---

### Modular FRM Documents

```text
docs/repository/folder-responsibility-matrix/
```

Own:

- Detailed folder responsibility assignments
- Folder boundaries
- Ownership
- Stewardship
- Authority
- Allowed content
- Forbidden content
- Dependencies
- Consumers

---

### Existing Folder READMEs

Examples:

```text
docs/01-governance/README.md
docs/11-operations/README.md
```

Own:

- Domain overview
- Local navigation
- Existing documentation structure
- Domain-specific guidance

Existing folder READMEs SHALL NOT be replaced by FRM documents.

---

## 4. Single Source of Truth Rules

### Rule 001

The master FRM document SHALL define governance rules but SHALL NOT duplicate detailed folder specifications.

### Rule 002

Each top-level folder SHALL appear in exactly one modular FRM document.

### Rule 003

Existing folder READMEs SHALL reference the approved FRM responsibility but SHALL NOT duplicate the complete FRM specification.

### Rule 004

Draft FRM modules SHALL NOT be treated as canonical until all fifty folders and their boundaries have been reviewed and approved.

### Rule 005

No FRM module SHALL be marked canonical while its status is Draft.

---

## 5. FRM Module Register

| Document | Folder Range | Document ID | Status | Canonical |
|---|---:|---|---|---|
| `FRM-01-10.md` | 01–10 | REPO-FRM-002 | Pending Creation | No |
| `FRM-11-20.md` | 11–20 | REPO-FRM-003 | Draft — Requires Validation | No |
| `FRM-21-30.md` | 21–30 | REPO-FRM-004 | Pending | No |
| `FRM-31-40.md` | 31–40 | REPO-FRM-005 | Pending | No |
| `FRM-41-50.md` | 41–50 | REPO-FRM-006 | Pending | No |

---

## 6. Current Repository Status

```text
Repository Baseline                     Complete

Folder Family Classification            Draft

Master Folder Responsibility Matrix     Draft

FRM-01-10                               Pending Creation

FRM-11-20                               Draft

FRM-21-30                               Pending

FRM-31-40                               Pending

FRM-41-50                               Pending

Boundary Validation                     Pending

Overlap Analysis                        Pending

Canonical Approval                      Not Authorized
```

---

## 7. Current Restrictions

Until repository stabilization is complete:

- No existing numbered folder SHALL be deleted.
- No existing numbered folder SHALL be renamed.
- No existing document SHALL be moved without an approved migration decision.
- No FRM document SHALL be promoted to Canonical.
- No local folder README SHALL be replaced.
- No responsibility assignment SHALL be considered final before boundary validation.

---

## 8. Completion Criteria

The modular Folder Responsibility Matrix is complete only when:

- [ ] `FRM-01-10.md` completed
- [ ] `FRM-11-20.md` validated
- [ ] `FRM-21-30.md` completed
- [ ] `FRM-31-40.md` completed
- [ ] `FRM-41-50.md` completed
- [ ] All fifty folders classified
- [ ] Ownership assignments verified
- [ ] Authority assignments verified
- [ ] Folder boundaries verified
- [ ] Cross-folder overlaps analyzed
- [ ] Duplicate responsibilities resolved
- [ ] Governance review completed
- [ ] Canonical promotion approved

---

## 9. Execution Order

The approved execution sequence is:

```text
FRM Index
      ↓
FRM-01-10
      ↓
FRM-11-20 Validation
      ↓
FRM-21-30
      ↓
FRM-31-40
      ↓
FRM-41-50
      ↓
Boundary Analysis
      ↓
Overlap Analysis
      ↓
Repository Audit
      ↓
Canonical Approval
```

This sequence SHALL NOT be changed without an approved repository governance decision.

---

## 10. Document Status

```text
Document:
REPO-FRM-IDX-001

Status:
Draft

Canonical:
No

Repository Change Authorized:
No
```

---

## 11. Next Document

```text
Document:
FRM-01-10.md

Document ID:
REPO-FRM-002

Title:
Folder Responsibility Matrix — Folders 01–10

Path:
docs/repository/folder-responsibility-matrix/FRM-01-10.md
```