---
id: REPO-FRM-VAL-02
title: FRM Validation Record — 02-company
version: 1.0.0
status: Draft

type: Folder Responsibility Validation
class: Governed

owner: Enterprise Architecture
steward: Documentation Architecture Team
authority: Repository Stabilization Program

created: 2026-07-15
updated: 2026-07-15

classification: Internal

audience:
  - Founder
  - Chief Executive Officer
  - Executive Leadership
  - Enterprise Architects
  - Company Documentation Owners
  - Workforce Owners
  - Governance Reviewers
  - Documentation Engineers
  - Repository Auditors
  - AI Documentation Agents
  - AI Review Agents

parent: REPO-FRM-VAL-001

validates:
  folder: 02-company
  frm_module: REPO-FRM-002
  proposed_family: Enterprise Foundation
  proposed_family_id: FAM-01

evidence_paths:
  - docs/02-company/README.md
  - docs/02-company/company-structure.md
  - complete-project-tree.txt

depends_on:
  - REPO-BASELINE-001
  - REPO-CLASS-001
  - REPO-FRM-001
  - REPO-FRM-002
  - REPO-FRM-VAL-001

review_cycle:
  - During Repository Stabilization
  - After Company Structure Change
  - After Department Structure Change
  - After Ownership Change
  - Before Canonical Promotion

validation_status: In Progress
canonical: false
---

# FRM Validation Record — 02-company

## 1. Document Purpose

This document records the controlled validation of the proposed family, purpose, responsibilities, boundaries, ownership, stewardship, authority, dependencies, consumers, and repository position of:

```text
docs/02-company/
```

The folder currently contains:

```text
docs/02-company/
├── README.md
└── company-structure.md
```

This validation record does not replace either existing document.

It does not authorize:

- Folder deletion
- Folder renaming
- Folder movement
- Document movement
- Document merging
- Document splitting
- Document deletion
- Content replacement
- Metadata replacement
- Ownership reassignment
- Authority reassignment
- Canonical promotion
- Repository freeze

This record describes the current validation state based only on evidence available during this review.

---

## 2. Current Validation Status

```text
Folder:
02-company

FRM Specification:
Authored

Physical Folder:
Confirmed

File Inventory:
Partially Confirmed

README Content:
Not Reviewed

Company Structure Content:
Not Reviewed

Content Validation:
In Progress

Family Validation:
Provisional

Boundary Validation:
In Progress

Owner Verification:
Not Started

Steward Verification:
Not Started

Authority Verification:
Not Started

Overlap Analysis:
In Progress

Canonical-Source Decision:
Decision Required

Governance Approval:
Not Started

Overall Result:
IN PROGRESS
```

Primary status code:

```text
IP
```

The folder SHALL NOT be marked fully validated, approved, canonical, or frozen at this stage.

---

# 3. Evidence Scope

## 3.1 Evidence Reviewed

The following evidence was available during this review:

| Evidence ID | Evidence | Path or Source | Review Result |
|---|---|---|---|
| `EVD-COMP-001` | Repository baseline governance | `docs/REPOSITORY-BASELINE.md` | Governance rules reviewed |
| `EVD-COMP-002` | Available complete project tree | `complete-project-tree.txt` | Folder and filenames confirmed |
| `EVD-COMP-003` | FRM master | `docs/FOLDER-RESPONSIBILITY-MATRIX.md` | Responsibility framework reviewed |
| `EVD-COMP-004` | FRM folders 01–10 | `FRM-01-10.md` | Proposed company responsibility reviewed |
| `EVD-COMP-005` | Family classification | `docs/FOLDER-FAMILY-CLASSIFICATION.md` | Proposed family reviewed |
| `EVD-COMP-006` | FRM validation register | `FRM-VALIDATION-REGISTER.md` | Validation workflow reviewed |
| `EVD-COMP-007` | Previous validation record | `FRM-VALIDATION-01-GOVERNANCE.md` | Upstream relationship reviewed |

---

## 3.2 Evidence Confirmed by Repository Structure

The available repository structure confirms the existence of:

```text
docs/02-company/
docs/02-company/README.md
docs/02-company/company-structure.md
```

The repository structure also confirms the existence of related organizational documentation in other folders, including:

```text
docs/05-workforce/organization/
docs/05-workforce/roles/
docs/19-ai-workforce/
docs/30-enterprise-governance/
docs/31-enterprise-architecture/
```

The existence of related folders does not prove duplication.

It establishes the need for boundary validation.

---

## 3.3 Evidence Not Yet Reviewed

The actual content of the following files has not been reviewed during this validation:

```text
docs/02-company/README.md
docs/02-company/company-structure.md
```

Therefore, the following cannot yet be confirmed:

- Existing document IDs
- Existing titles
- Existing versions
- Existing statuses
- Existing owners
- Existing reviewers
- Existing approval authorities
- Existing purpose statements
- Existing company description
- Existing department list
- Existing leadership structure
- Existing reporting hierarchy
- Existing links
- Existing completion status
- Existing canonical claims

---

## 3.4 Evidence Limitation

This record validates:

- Physical folder existence
- Current visible file inventory
- Proposed FRM responsibility
- Proposed family
- Required boundary relationships
- Required future validation work

This record does not validate the actual company content.

Current evidence result:

```text
Physical Validation:
Confirmed

Content Validation:
Incomplete

Final Approval:
Not Permitted
```

---

# 4. Physical Folder Validation

## 4.1 Folder Identity

| Field | Validated Value | Status |
|---|---|---|
| Folder Number | `02` | Confirmed |
| Folder Name | `02-company` | Confirmed |
| Full Path | `docs/02-company/` | Confirmed |
| Numbered Top-Level Folder | Yes | Confirmed |
| Existing README | Yes | Confirmed by tree |
| Existing Company Structure File | Yes | Confirmed by tree |
| Additional Visible Files | None in available tree | Requires current verification |
| Structural Change Authorized | No | Confirmed |

---

## 4.2 Current Visible Structure

```text
docs/02-company/
├── README.md
└── company-structure.md
```

This structure provides:

- One local navigation and overview document
- One dedicated company-structure document

This is structurally reasonable for an early company-definition folder.

Document completeness cannot be inferred from filename count.

---

## 4.3 Baseline Protection

The folder and its existing files remain protected.

Without approved repository governance, the following actions remain prohibited:

- Delete `02-company`
- Rename `02-company`
- Move `02-company`
- Merge it into `01-governance`
- Merge it into `05-workforce`
- Merge it into `12-business`
- Replace its README
- Replace `company-structure.md`
- Archive either file
- Split the folder
- Mark the folder canonical

---

## 4.4 Physical Folder Decision

```text
Decision Type:
KEEP

Path:
docs/02-company/

Reason:
The folder has a distinct proposed responsibility
for defining Mianx.ai as an organization.

Decision Status:
PROPOSED — NOT APPROVED

Migration Required:
No current evidence supports migration.
```

---

# 5. File Inventory Validation

## 5.1 README.md

### Expected Local Responsibility

The local README is expected to provide:

- Company folder overview
- Folder purpose
- Local navigation
- Document register
- Reading order
- Company-document relationships
- Current documentation status
- Local ownership metadata
- Links to related folders

### Current Validation

```text
Existence:
Confirmed

Content:
Not Reviewed

Metadata:
Not Reviewed

Links:
Not Tested

Status Accuracy:
Not Verified

Validation Result:
NS — Content Review Not Started
```

No claim SHALL be made that the README currently contains all expected sections.

---

## 5.2 company-structure.md

### Expected Local Responsibility

The company-structure document is expected to define the high-level organizational structure of Mianx.ai.

Possible valid subjects include:

- Founder position
- Executive leadership
- Company hierarchy
- Department map
- Reporting relationships
- High-level organizational units
- Organizational layers
- Company-level responsibility distribution
- Human and AI organizational relationship
- Company scaling model

These are expected subjects, not confirmed current contents.

### Current Validation

```text
Existence:
Confirmed

Content:
Not Reviewed

Metadata:
Not Reviewed

Department List:
Not Verified

Leadership Structure:
Not Verified

Reporting Structure:
Not Verified

Validation Result:
NS — Content Review Not Started
```

---

## 5.3 File Inventory Result

```text
Expected Core Files:
2

Files Confirmed by Available Tree:
2

Files Content-Reviewed:
0

Files Metadata-Reviewed:
0

Files Link-Validated:
0

File Inventory Result:
PARTIAL
```

A fresh local tree check SHALL be performed before final validation.

---

# 6. Proposed Family Validation

## 6.1 Proposed Family

```text
Enterprise Foundation
```

Family ID:

```text
FAM-01
```

---

## 6.2 Classification Basis

The proposed purpose of `02-company` concerns:

- Company identity
- Organizational definition
- Company structure
- Leadership structure
- Department structure
- Reporting relationships
- Organizational form

These subjects belong to the foundational enterprise layer.

They define the organization within which:

- Business operates
- Human workforce operates
- AI workforce operates
- Products are governed
- Platforms are developed
- Projects are delivered

---

## 6.3 Family Validation Result

```text
Proposed Family:
Enterprise Foundation

Status:
IP — In Progress

Current Support:
Folder name and FRM assignment support the classification.

Evidence Gap:
Actual README and company-structure content remain unreviewed.
```

No alternative family currently has stronger structural evidence.

The classification remains provisional.

---

# 7. Proposed Primary Responsibility

## 7.1 Working Purpose

The proposed working purpose of `02-company` is:

> Define Mianx.ai as an organization, including its company identity, organizational structure, leadership structure, department model, reporting relationships, and high-level organizational form.

---

## 7.2 Proposed Responsibility Statement

```text
02-company owns the organization-level definition of Mianx.ai.

It defines what the company is,
how it is structurally organized,
which major organizational units exist,
how leadership and departments relate,
and how the company structure is represented.
```

Status:

```text
PROVISIONAL
```

This statement SHALL be compared with the actual README and `company-structure.md`.

---

## 7.3 Responsibility Layer

The intended responsibility layer is:

```text
Foundational Governance
        │
        ▼
Company Definition
        │
        ▼
Human and AI Workforce Structures
        │
        ▼
Business, Product and Operational Execution
```

In this relationship:

```text
01-governance
Defines governing purpose and principles.

02-company
Defines the organization.

05-workforce
Defines the human workforce.

19-ai-workforce
Defines the AI workforce.
```

---

# 8. Proposed Owns Boundary

Based on the current FRM model, `02-company` is proposed to own:

- Official company name
- High-level company identity
- Company overview
- Company profile
- Organizational definition
- Company-level organizational model
- Founder position in company structure
- Executive leadership structure
- High-level department map
- High-level reporting relationships
- Organizational layers
- Company hierarchy
- Company operating identity
- Company-level responsibility map
- Organizational growth model
- Company history, where applicable
- Organizational chart at company level
- Company-structure revision history
- Company-document navigation
- Company-structure terminology

Validation status:

```text
IP — Requires Content Comparison
```

---

# 9. Proposed Does-Not-Own Boundary

`02-company` is proposed not to own:

- Foundational constitutional principles
- Enterprise vision ownership
- Enterprise mission ownership
- Enterprise values ownership
- Detailed human job descriptions
- Recruitment procedures
- Human onboarding procedures
- Human performance-management procedures
- AI agent technical specifications
- AI agent prompts
- AI agent tools
- AI agent runtime behavior
- Detailed business strategy
- Product requirements
- Product organization-management feature behavior
- Enterprise governance operating procedures
- Architecture-review processes
- Department-level SOPs
- Project-specific team structures
- Client company structures
- Software tenant structures
- Database organization schemas
- API organization resources
- Legal corporate records requiring restricted storage
- Employee private records

Validation status:

```text
PROVISIONAL
```

---

# 10. Allowed Content Validation

The following artifact categories are proposed as valid within `02-company`:

- Company overview
- Company profile
- Company identity description
- Company history
- Company structure
- Organizational hierarchy
- Executive leadership map
- Department map
- Reporting relationship overview
- Organizational layers
- High-level organization chart
- Company-level responsibility map
- Company operating identity
- Organizational growth model
- Company documentation index
- Company terminology
- Company revision history
- Approved company diagrams

Status:

```text
Proposed — Actual Content Not Yet Reviewed
```

---

# 11. Forbidden Content Validation

The following artifact categories are proposed as outside the primary responsibility of `02-company`:

- Product feature requirements
- API contracts
- Database schemas
- Source-code standards
- Deployment scripts
- Infrastructure configuration
- Runtime architecture
- Security implementation
- Operational incident runbooks
- Detailed employee records
- Recruitment applications
- Salary records
- Agent runtime prompts
- AI model files
- Project secrets
- Customer private information
- Production credentials
- Completed client organization records

Status:

```text
Proposed — Requires Governance Confirmation
```

---

# 12. Company Structure Content Contract

The following contract SHALL be used when reviewing `company-structure.md`.

## 12.1 Required Identity Sections

The document SHOULD clearly identify:

- Company name
- Document purpose
- Document scope
- Version
- Status
- Owner
- Reviewer
- Approval authority
- Last review date

---

## 12.2 Required Structure Sections

The document SHOULD define:

- Founder level
- Executive leadership level
- Department leadership level
- Department map
- Reporting model
- Organizational relationships
- Human workforce relationship
- AI workforce relationship
- Shared services relationship
- Project relationship
- Scaling model

---

## 12.3 Required Boundary Sections

The document SHOULD distinguish:

```text
Company Structure
vs
Human Workforce Structure
```

```text
Company Structure
vs
AI Workforce Structure
```

```text
Company Structure
vs
Business Operating Model
```

```text
Company Structure
vs
Software Organization Management
```

```text
Company Structure
vs
Enterprise Governance
```

---

## 12.4 Required Traceability

Every defined organizational unit SHOULD trace to:

- Responsible executive
- Related department documentation
- Related workforce documentation
- Related AI workforce documentation
- Related governance documentation
- Related business documentation

---

# 13. Ownership Validation

## 13.1 Proposed Owner

The FRM currently proposes:

```text
Founder and Chief Executive Officer
```

This assignment is not yet validated against the actual company documents.

Validation result:

```text
Proposed Owner:
Founder and Chief Executive Officer

Documentary Evidence Reviewed:
No

Formal Acceptance:
Not Recorded

Status:
NS — Not Started
```

---

## 13.2 Owner Validation Questions

The following questions remain open:

- Is the Founder also formally acting as Chief Executive Officer?
- Does the company documentation use one title or both?
- Is ownership assigned to an individual or the Executive Office?
- Who approves organizational changes?
- Who approves creation or removal of departments?
- Who approves leadership reporting changes?
- Who approves the official company profile?
- Who approves company-level organizational diagrams?

---

## 13.3 Proposed Steward

The FRM currently proposes:

```text
Executive Office
```

Validation result:

```text
Proposed Steward:
Executive Office

Formal Organizational Evidence:
Not Reviewed

Maintenance Acceptance:
Not Recorded

Status:
NS — Not Started
```

The Executive Office SHALL NOT be considered formally established solely because it appears in a Draft FRM.

---

## 13.4 Steward Responsibilities

The eventual approved Steward is expected to maintain:

- Company documentation quality
- Company structure accuracy
- Department list accuracy
- Leadership structure accuracy
- Reporting relationship accuracy
- Organizational diagrams
- Cross-folder references
- Change history
- Review scheduling
- Owner approval evidence

---

## 13.5 Proposed Authority

The FRM currently proposes:

```text
Founder
```

Validation result:

```text
Proposed Authority:
Founder

Authority Evidence:
Not Reviewed

Delegation Evidence:
Not Reviewed

Status:
NS — Not Started
```

---

## 13.6 Authority Questions

The following SHALL be resolved:

- Who approves the official company structure?
- Who approves department creation?
- Who approves executive roles?
- Who approves reporting relationships?
- Can the Chief Executive Officer approve routine company-structure changes?
- Which changes require Founder approval?
- Which changes require governance review?
- Is any authority delegated?
- How is delegation documented?
- How are emergency organizational changes approved?

---

# 14. Dependency Validation

## 14.1 Proposed Upstream Dependency

The primary proposed upstream dependency is:

```text
01-governance
```

Reason:

The company structure should align with:

- Enterprise purpose
- Vision
- Mission
- Values
- Foundational principles
- Founder intent

Status:

```text
Provisional
```

---

## 14.2 Potential External Dependencies

Company documentation may depend on external evidence such as:

- Corporate registration
- Legal company name
- Ownership records
- Shareholding structure
- Regulatory obligations
- Tax registration
- Jurisdiction
- Approved executive appointments
- Board decisions
- Founder decisions

Restricted legal or financial records SHOULD NOT automatically be stored in the general documentation folder.

---

## 14.3 Downstream Dependencies

The following folders are proposed consumers of company definitions:

```text
05-workforce
12-business
19-ai-workforce
30-enterprise-governance
31-enterprise-architecture
40-enterprise-operations
43-business-platform
48-enterprise-roadmap
```

Actual references remain unverified.

---

## 14.4 Dependency Result

```text
Upstream Dependency:
01-governance — Provisional

Downstream Consumers:
Identified but not link-validated

Circular Ownership:
Not Yet Determined

Status:
IP — In Progress
```

---

# 15. Consumer Validation

The following are proposed consumers of `02-company`:

- Founder
- Chief Executive Officer
- Executive leadership
- Human workforce
- AI workforce
- Enterprise governance
- Business strategy
- Product leadership
- Enterprise architecture
- Operations
- Human resources
- Department leadership
- Project-management functions
- AI routing and assignment systems
- Client onboarding processes
- Repository navigation
- AI documentation agents

Validation status:

```text
Provisional
```

Actual links and references SHALL be inspected before validation.

---

# 16. Critical Boundary Validation

## 16.1 Boundary — `02-company` vs `01-governance`

### Validation Question

```text
What defines the company,
and what defines its foundational governing direction?
```

### Proposed Boundary

```text
01-governance
Owns vision, mission, values, principles,
constitutional direction and foundational intent.

02-company
Owns company identity, organizational form,
leadership structure, departments
and reporting relationships.
```

### Status

```text
IP — In Progress
```

The actual company documents remain unreviewed.

---

## 16.2 Boundary BND-029 — `02-company` vs `12-business`

### Validation Question

```text
What defines the organization,
and what defines how it creates value?
```

### Proposed Boundary

```text
02-company
Defines what Mianx.ai is as an organization.

12-business
Defines how Mianx.ai creates,
delivers and captures business value.
```

### Examples

```text
Company department map
02-company
```

```text
Revenue model
12-business
```

```text
Executive leadership structure
02-company
```

```text
Market strategy
12-business
```

### Status

```text
NS — Related Content Not Reviewed
```

---

## 16.3 Boundary — `02-company` vs `05-workforce`

### Validation Question

```text
What defines the company structure,
and what defines the human workforce?
```

### Proposed Boundary

```text
02-company
Defines high-level company hierarchy,
departments and reporting structure.

05-workforce
Defines human roles, hiring, onboarding,
performance, career paths and workforce operations.
```

### Potential Overlap

The existing workforce tree may include:

- Departments
- Organization charts
- Reporting structures
- Governance
- Decision making
- Collaboration
- Scaling

These subjects require direct comparison with `company-structure.md`.

### Status

```text
DR — Decision Required After Content Review
```

---

## 16.4 Boundary — `02-company` vs `19-ai-workforce`

### Validation Question

```text
What defines the company,
and what defines the AI employees operating within it?
```

### Proposed Boundary

```text
02-company
Defines company-level organizational context.

19-ai-workforce
Defines AI departments, AI teams,
AI roles, AI reporting and AI workforce lifecycle.
```

### Key Rule

```text
02-company may show where the AI workforce fits.

19-ai-workforce owns detailed AI workforce structure.
```

### Status

```text
NS — Related Content Not Reviewed
```

---

## 16.5 Boundary — `02-company` vs `30-enterprise-governance`

### Validation Question

```text
What defines organizational structure,
and what governs enterprise decision rights?
```

### Proposed Boundary

```text
02-company
Defines organizational units and reporting relationships.

30-enterprise-governance
Defines governance roles, decision rights,
approval processes, oversight and controls.
```

### Status

```text
NS — Related Content Not Reviewed
```

---

## 16.6 Boundary — `02-company` vs `31-enterprise-architecture`

### Validation Question

```text
What defines the organization,
and what defines enterprise business architecture?
```

### Proposed Boundary

```text
02-company
Owns official company-level structure.

31-enterprise-architecture
May model the organization as part of
business architecture and capability mapping.
```

Enterprise Architecture SHALL reference the official company structure rather than silently redefine it.

### Status

```text
NS — Related Content Not Reviewed
```

---

## 16.7 Boundary — `02-company` vs `03-product/features/01-organization-management`

### Validation Question

```text
What defines Mianx.ai as a company,
and what defines software-managed organizations?
```

### Proposed Boundary

```text
02-company
Defines the real Mianx.ai organization.

03-product/features/01-organization-management
Defines a product feature for managing
organizations, tenants or customer entities.
```

### Key Rule

A software organization record SHALL NOT automatically be treated as the official Mianx.ai company structure.

### Status

```text
IP — Important Boundary Identified
```

---

## 16.8 Boundary — `02-company` vs `43-business-platform`

### Validation Question

```text
What defines company structure,
and what implements organization-related business capabilities?
```

### Proposed Boundary

```text
02-company
Defines the official organization.

43-business-platform
Provides ERP and business application capabilities
used to manage organizational operations.
```

### Status

```text
NS — Related Content Not Reviewed
```

---

# 17. Structural Finding Register

| Finding ID | Category | Finding | Evidence | Status | Required Action |
|---|---|---|---|---|---|
| `COMP-FND-001` | Physical Structure | `02-company` exists as a numbered top-level folder | Repository tree | EC | Preserve folder |
| `COMP-FND-002` | File Inventory | `README.md` exists | Repository tree | EC | Review content |
| `COMP-FND-003` | File Inventory | `company-structure.md` exists | Repository tree | EC | Review content |
| `COMP-FND-004` | Content Evidence | Actual README content is not reviewed | Evidence limitation | BL | Inspect complete file |
| `COMP-FND-005` | Content Evidence | Actual company-structure content is not reviewed | Evidence limitation | BL | Inspect complete file |
| `COMP-FND-006` | Workforce Overlap | Workforce organization documents may overlap company structure | Related repository structure | DR | Compare content |
| `COMP-FND-007` | AI Workforce Overlap | AI departments may be represented in company structure | FRM relationship | DR | Define summary vs detail boundary |
| `COMP-FND-008` | Product Overlap | Product organization-management feature may be confused with company structure | Repository structure | IP | Establish explicit boundary |
| `COMP-FND-009` | Ownership | Proposed Owner is not verified | FRM Draft | NS | Obtain evidence |
| `COMP-FND-010` | Stewardship | Proposed Executive Office is not verified | FRM Draft | NS | Verify or revise |
| `COMP-FND-011` | Authority | Founder approval authority is not formally evidenced | FRM Draft | NS | Record approval model |
| `COMP-FND-012` | Metadata | File metadata is unknown | Content unavailable | NS | Inspect both files |
| `COMP-FND-013` | Link Integrity | README links are unknown | Content unavailable | NS | Run link validation |
| `COMP-FND-014` | Scope Completeness | Two visible files may or may not fully cover company documentation | Repository tree | DR | Assess required artifacts |
| `COMP-FND-015` | Legal Boundary | Legal company records may require restricted storage | Governance requirement | DR | Define storage rule |

---

# 18. Conflict Register

## 18.1 Confirmed Conflicts

No content-level conflict is confirmed.

The actual contents of the relevant files have not been compared.

---

## 18.2 Potential Conflicts

| Conflict ID | Subject | Candidate Sources | Current Status |
|---|---|---|---|
| `COMP-CNF-001` | Department definitions | `02-company`, `05-workforce`, `19-ai-workforce` | Potential |
| `COMP-CNF-002` | Organization chart | `02-company`, `05-workforce/organization` | Potential |
| `COMP-CNF-003` | Reporting structure | `02-company`, `05-workforce/organization` | Potential |
| `COMP-CNF-004` | Organizational governance | `02-company`, `30-enterprise-governance` | Potential |
| `COMP-CNF-005` | Business operating model | `02-company`, `12-business` | Potential |
| `COMP-CNF-006` | Organization-management feature | `02-company`, `03-product/features/01-organization-management` | Potential |
| `COMP-CNF-007` | Business-architecture organization model | `02-company`, `31-enterprise-architecture` | Potential |
| `COMP-CNF-008` | ERP organization records | `02-company`, `43-business-platform` | Potential |

Potential conflict does not prove duplication.

---

# 19. Proposed Canonical-Source Decisions

No canonical-source decision is approved.

The following proposals are recorded for later review.

| Proposal ID | Subject | Proposed Canonical Owner | Status |
|---|---|---|---|
| `COMP-CSD-P01` | Official Mianx.ai company identity | `02-company` | Proposed |
| `COMP-CSD-P02` | Official company overview | `02-company` | Proposed |
| `COMP-CSD-P03` | High-level company hierarchy | `02-company` | Proposed |
| `COMP-CSD-P04` | High-level department map | `02-company` | Proposed |
| `COMP-CSD-P05` | High-level leadership structure | `02-company` | Proposed |
| `COMP-CSD-P06` | Human workforce detail | `05-workforce` | Proposed |
| `COMP-CSD-P07` | AI workforce detail | `19-ai-workforce` | Proposed |
| `COMP-CSD-P08` | Business strategy and value model | `12-business` | Proposed |
| `COMP-CSD-P09` | Governance decision rights | `30-enterprise-governance` | Proposed |
| `COMP-CSD-P10` | Software organization-management feature | `03-product/features/01-organization-management` | Proposed |
| `COMP-CSD-P11` | Organization-related ERP capabilities | `43-business-platform` | Proposed |

All proposals require actual content review and approval.

---

# 20. Proposed Repository Decisions

## 20.1 Folder Decision

```text
Decision Type:
KEEP

Path:
docs/02-company/

Reason:
The folder has a distinct proposed responsibility
for defining Mianx.ai as an organization.

Status:
PROPOSED — NOT APPROVED
```

---

## 20.2 README Decision

```text
Decision Type:
KEEP + REVIEW

Path:
docs/02-company/README.md

Reason:
The README is expected to serve as the local
company-documentation overview and navigation source.

Required Review:
- Metadata
- Purpose
- Scope
- File register
- Reading order
- Links
- Owner
- Reviewer
- Authority
- Status accuracy

Status:
PROPOSED — NOT APPROVED
```

---

## 20.3 Company Structure Decision

```text
Decision Type:
KEEP + REVIEW

Path:
docs/02-company/company-structure.md

Reason:
A dedicated company-structure document is appropriate
for the proposed folder responsibility.

Required Review:
- Leadership model
- Department model
- Reporting model
- Workforce boundaries
- AI workforce boundaries
- Business boundaries
- Governance boundaries
- Organizational scaling
- Metadata
- References

Status:
PROPOSED — NOT APPROVED
```

---

## 20.4 Structural Migration

```text
Move:
No

Rename:
No

Merge:
No

Split:
No

Archive:
No

Delete:
No
```

No structural migration is currently supported by available evidence.

---

# 21. Metadata Validation

## 21.1 README Metadata

The following fields remain unknown:

| Metadata Field | Validation Result |
|---|---|
| ID | Not Reviewed |
| Title | Not Reviewed |
| Version | Not Reviewed |
| Status | Not Reviewed |
| Owner | Not Reviewed |
| Steward | Not Reviewed |
| Reviewer | Not Reviewed |
| Authority | Not Reviewed |
| Created | Not Reviewed |
| Updated | Not Reviewed |
| Classification | Not Reviewed |
| Canonical | Not Reviewed |
| Parent | Not Reviewed |
| Dependencies | Not Reviewed |

---

## 21.2 Company Structure Metadata

| Metadata Field | Validation Result |
|---|---|
| ID | Not Reviewed |
| Title | Not Reviewed |
| Version | Not Reviewed |
| Status | Not Reviewed |
| Owner | Not Reviewed |
| Steward | Not Reviewed |
| Reviewer | Not Reviewed |
| Authority | Not Reviewed |
| Created | Not Reviewed |
| Updated | Not Reviewed |
| Classification | Not Reviewed |
| Canonical | Not Reviewed |
| Parent | Not Reviewed |
| Dependencies | Not Reviewed |

---

## 21.3 Metadata Decision

No metadata field SHALL be added, removed, or changed until:

- Both files are inspected.
- Current values are recorded.
- Repository metadata standards are confirmed.
- Required migration is approved.
- Backups exist.
- Validation procedure exists.

Current result:

```text
Metadata Validation:
NS — Not Started
```

---

# 22. Link and Navigation Validation

The README and company-structure document may contain links to:

```text
../01-governance/
../05-workforce/
../12-business/
../19-ai-workforce/
../30-enterprise-governance/
../31-enterprise-architecture/
../INDEX.md
../DOCUMENT-STANDARDS.md
```

These are possible relationships, not confirmed current links.

Validation status:

```text
File Existence Review:
Partial

Internal Link Review:
Not Started

Relative Path Review:
Not Started

Broken Links:
Not Yet Determined

Orphan Documents:
Not Yet Determined
```

---

# 23. Validation Checklist

## 23.1 Evidence Review

- [x] Repository folder existence confirmed
- [x] README existence confirmed
- [x] `company-structure.md` existence confirmed
- [x] FRM proposal reviewed
- [x] Family assignment reviewed
- [x] Critical related folders identified
- [ ] Current folder tree generated locally
- [ ] README content reviewed
- [ ] `company-structure.md` content reviewed
- [ ] File metadata reviewed
- [ ] Links tested
- [ ] Referenced documents reviewed

---

## 23.2 Responsibility Review

- [x] Proposed primary purpose recorded
- [x] Proposed Owns boundary recorded
- [x] Proposed Does-Not-Own boundary recorded
- [x] Proposed allowed content recorded
- [x] Proposed forbidden content recorded
- [ ] Existing README purpose confirmed
- [ ] Existing company-structure purpose confirmed
- [ ] Existing department definitions confirmed
- [ ] Existing leadership structure confirmed
- [ ] Existing reporting model confirmed
- [ ] Existing organizational model confirmed
- [ ] Actual responsibility mapping completed

---

## 23.3 Family Review

- [x] Proposed family identified
- [x] Proposed family ID identified
- [x] Classification basis recorded
- [ ] Actual file contents support family
- [ ] Alternative classifications rejected with evidence
- [ ] Enterprise Architecture review completed
- [ ] Family assignment approved

---

## 23.4 Ownership Review

- [x] Proposed Owner recorded
- [x] Proposed Steward recorded
- [x] Proposed Authority recorded
- [ ] Existing document Owner reviewed
- [ ] Existing document Reviewer reviewed
- [ ] Owner formally verified
- [ ] Steward formally verified
- [ ] Authority formally verified
- [ ] Delegation rules recorded
- [ ] Change-approval rights recorded

---

## 23.5 Boundary Review

- [x] Boundary with `01-governance` identified
- [x] Boundary with `05-workforce` identified
- [x] Boundary with `12-business` identified
- [x] Boundary with `19-ai-workforce` identified
- [x] Boundary with `30-enterprise-governance` identified
- [x] Boundary with `31-enterprise-architecture` identified
- [x] Boundary with product organization management identified
- [x] Boundary with `43-business-platform` identified
- [ ] Related file contents compared
- [ ] Scope distinctions validated
- [ ] Canonical-source decisions approved
- [ ] Local-specialization rules approved

---

## 23.6 Governance Review

- [ ] Technical review completed
- [ ] Enterprise Architecture review completed
- [ ] Company Owner review completed
- [ ] Founder review completed
- [ ] Governance review completed
- [ ] Repository audit completed
- [ ] Canonical promotion approved

---

# 24. Validation Outcome

## 24.1 Dimension Results

```text
Specification:
AU — Authored

Physical Folder:
EC — Evidence Collected

File Inventory:
EC — Evidence Collected

Content:
IP — In Progress

Family:
IP — In Progress

Boundary:
IP — In Progress

Ownership:
NS — Not Started

Stewardship:
NS — Not Started

Authority:
NS — Not Started

Overlap:
IP — In Progress

Canonical-Source Decision:
DR — Decision Required

Migration:
NA — No Current Migration Required

Approval:
NS — Not Started
```

---

## 24.2 Overall Result

```text
OVERALL VALIDATION RESULT:

IN PROGRESS
```

Reason:

- The folder exists.
- The two visible files exist.
- The proposed company responsibility is structurally reasonable.
- The proposed Enterprise Foundation family is structurally reasonable.
- Actual file contents have not been reviewed.
- Ownership and authority are not evidenced.
- Critical boundaries remain unresolved.
- No approval evidence exists.

---

# 25. Validation Register Update

The `02-company` row in the master validation register SHOULD now read:

| Folder | Specification | Content | Boundary | Ownership | Authority | Overlap | Decision | Approval |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `02-company` | AU | IP | IP | NS | NS | IP | DR | NS |

This update records current validation progress only.

It does not grant approval.

---

# 26. Open Actions

| Action ID | Required Action | Priority | Status |
|---|---|---:|---|
| `COMP-ACT-001` | Generate current local tree for `docs/02-company` | High | Pending |
| `COMP-ACT-002` | Review complete `README.md` content | High | Pending |
| `COMP-ACT-003` | Review complete `company-structure.md` content | High | Pending |
| `COMP-ACT-004` | Record both documents’ current metadata | High | Pending |
| `COMP-ACT-005` | Validate company purpose against actual content | High | Pending |
| `COMP-ACT-006` | Compare company structure with `05-workforce/organization` | High | Pending |
| `COMP-ACT-007` | Compare company structure with `19-ai-workforce` | High | Pending |
| `COMP-ACT-008` | Validate boundary with `12-business` | High | Pending |
| `COMP-ACT-009` | Validate boundary with `30-enterprise-governance` | Medium | Pending |
| `COMP-ACT-010` | Validate boundary with `31-enterprise-architecture` | Medium | Pending |
| `COMP-ACT-011` | Validate boundary with product organization management | High | Pending |
| `COMP-ACT-012` | Verify official company Owner | High | Pending |
| `COMP-ACT-013` | Verify company-document Steward | Medium | Pending |
| `COMP-ACT-014` | Verify company-structure approval Authority | High | Pending |
| `COMP-ACT-015` | Test internal and parent links | Medium | Pending |
| `COMP-ACT-016` | Identify missing company documentation, if any | Medium | Pending |
| `COMP-ACT-017` | Record canonical-source decisions | High | Pending |
| `COMP-ACT-018` | Complete Company Owner review | High | Pending |
| `COMP-ACT-019` | Complete Governance review | High | Pending |

---

# 27. Acceptance Criteria

This validation record is structurally authored when:

- [x] Folder identity recorded
- [x] Visible file inventory recorded
- [x] Evidence scope recorded
- [x] Evidence limitations recorded
- [x] Proposed family reviewed
- [x] Proposed primary purpose recorded
- [x] Proposed Owns boundary recorded
- [x] Proposed Does-Not-Own boundary recorded
- [x] Proposed allowed content recorded
- [x] Proposed forbidden content recorded
- [x] Proposed ownership recorded
- [x] Ownership evidence gaps recorded
- [x] Critical boundaries recorded
- [x] Structural findings recorded
- [x] Potential conflicts recorded
- [x] Proposed canonical sources recorded
- [x] Proposed repository decisions recorded
- [x] Validation outcome recorded
- [x] Register update defined
- [x] Open actions recorded
- [x] Canonical value set to false

This folder is content-validated only when:

- [ ] Current folder tree is reviewed
- [ ] README content is reviewed
- [ ] `company-structure.md` content is reviewed
- [ ] Metadata is reviewed
- [ ] Company purpose is confirmed
- [ ] Leadership structure is confirmed
- [ ] Department structure is confirmed
- [ ] Reporting model is confirmed
- [ ] Organizational relationships are confirmed
- [ ] Links are validated
- [ ] Actual content maps to the FRM responsibility

This folder is boundary-validated only when:

- [ ] Boundary with `01-governance` is resolved
- [ ] Boundary with `05-workforce` is resolved
- [ ] Boundary with `12-business` is resolved
- [ ] Boundary with `19-ai-workforce` is resolved
- [ ] Boundary with `30-enterprise-governance` is resolved
- [ ] Boundary with `31-enterprise-architecture` is resolved
- [ ] Boundary with product organization management is resolved
- [ ] Boundary with `43-business-platform` is resolved

This folder is ownership-validated only when:

- [ ] Owner is verified
- [ ] Steward is verified
- [ ] Approval Authority is verified
- [ ] Delegation rules are documented
- [ ] Organizational-change rights are documented

This validation record becomes canonical only when:

- [ ] Status changes to `Approved`
- [ ] Validation status changes to `Validated`
- [ ] Canonical changes to `true`
- [ ] Approval evidence is linked
- [ ] No critical unresolved company boundary remains
- [ ] Repository audit passes

---

# 28. Relationship Register

## Folder Being Validated

```text
docs/02-company/
```

## Existing Folder README

```text
docs/02-company/README.md
```

## Existing Company Structure Document

```text
docs/02-company/company-structure.md
```

## Upstream Governance Folder

```text
docs/01-governance/
```

## Related Human Workforce Folder

```text
docs/05-workforce/
```

## Related Business Folder

```text
docs/12-business/
```

## Related AI Workforce Folder

```text
docs/19-ai-workforce/
```

## Related Enterprise Governance Folder

```text
docs/30-enterprise-governance/
```

## Related Enterprise Architecture Folder

```text
docs/31-enterprise-architecture/
```

## Related Business Platform Folder

```text
docs/43-business-platform/
```

## FRM Master

```text
docs/FOLDER-RESPONSIBILITY-MATRIX.md
```

## FRM Module

```text
docs/repository/folder-responsibility-matrix/FRM-01-10.md
```

## Validation Register

```text
docs/repository/folder-responsibility-matrix/FRM-VALIDATION-REGISTER.md
```

## Previous Validation Record

```text
docs/repository/folder-responsibility-matrix/FRM-VALIDATION-01-GOVERNANCE.md
```

## Family Classification

```text
docs/FOLDER-FAMILY-CLASSIFICATION.md
```

## Repository Baseline

```text
docs/REPOSITORY-BASELINE.md
```

---

# 29. Version History

| Version | Date | Status | Summary |
|---|---|---|---|
| 1.0.0 | 2026-07-15 | Draft | Initial structure-based validation record for `02-company`; file-content review remains pending |

---

# 30. Document Status

```text
Document ID:
REPO-FRM-VAL-02

Version:
1.0.0

Folder:
02-company

Status:
Draft

Validation Status:
In Progress

Canonical:
No

Physical Folder:
Confirmed

Visible Files:
2

Files Content-Reviewed:
0

Complete Content Audit:
No

Family Validation:
In Progress

Boundary Validation:
In Progress

Owner Verification:
Not Started

Steward Verification:
Not Started

Authority Verification:
Not Started

Structural Change Authorized:
No

Migration Authorized:
No

Canonical Promotion Authorized:
No

Repository Freeze Authorized:
No
```

---

# 31. Next Controlled Document

According to the approved validation priority sequence, the next folder is:

```text
Document:
FRM-VALIDATION-30-ENTERPRISE-GOVERNANCE.md

Purpose:
Validate the actual content, responsibility,
family assignment, boundaries, ownership,
stewardship and authority of
30-enterprise-governance.

Path:
docs/repository/folder-responsibility-matrix/FRM-VALIDATION-30-ENTERPRISE-GOVERNANCE.md
```