# Source Files

> Enterprise standards for organizing, maintaining, protecting, versioning, and governing all master illustration source files across the complete Mianx.ai ecosystem.

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | Illustration Source Files |
| Folder | docs/18-assets/illustrations |
| File Name | source-files.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Design System Team |
| Maintained By | Brand Team & Asset Governance |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

This document defines how master illustration source files are created, organized, maintained, reviewed, versioned, archived, secured, and recovered.

Every illustration used by Mianx.ai products must originate from one approved master source.

No exported asset may become the new source file.

---

# Objectives

The Illustration Source Management System aims to:

- Maintain a single source of truth
- Protect original artwork
- Simplify collaboration
- Prevent duplicate assets
- Support long-term maintenance
- Enable automated exports
- Improve governance
- Preserve complete history
- Improve disaster recovery
- Scale across future products

---

# Scope

These standards apply to:

- Hero Illustrations
- Product Illustrations
- Marketing Illustrations
- Empty State Illustrations
- Onboarding Illustrations
- AI Workforce Illustrations
- Technical Illustrations
- Workflow Illustrations
- Documentation Graphics
- Presentation Graphics

---

# Source Management Philosophy

Master source files are permanent assets.

Every production illustration must originate from one approved source.

Official workflow:

```text
Master Source

↓

Working Copy

↓

Review

↓

Approval

↓

Export

↓

Distribution
```

Exports must never replace master files.

---

# Approved Source Formats

The following formats are approved:

| Format | Purpose |
|---------|----------|
| Figma | Primary Design Source |
| SVG | Master Vector |
| Adobe Illustrator (.ai) | Complex Vector Artwork |

No additional source formats should be introduced without governance approval.

---

# Single Source of Truth

Each illustration must have:

- One Master File
- One Owner
- One Version History
- One Metadata Record

Multiple master copies are prohibited.

---

# Recommended Folder Structure

```text
illustrations/

├── source-files/
│
├── figma/
├── svg/
├── illustrator/
├── working/
├── review/
├── approved/
├── archived/
├── deprecated/
├── metadata/
├── backups/
└── releases/
```

---

# Category Structure

```text
source-files/

├── hero/
├── onboarding/
├── empty-state/
├── marketing/
├── product/
├── ai-workforce/
├── technical/
├── workflow/
├── documentation/
└── shared/
```

---

# File Naming Standard

Pattern:

```text
category-name-master-v{version}.{extension}
```

Examples:

```text
hero-ai-workforce-master-v1.fig

product-dashboard-master-v2.fig

workflow-order-processing-master-v3.svg
```

Avoid:

```text
new.fig

copy.ai

final-final.svg

latest-version.ai
```

---

# Component Library

Illustrations should reuse shared components.

Examples:

- Characters
- Devices
- Dashboards
- Documents
- Icons
- Background Shapes
- Connectors
- Clouds
- Data Nodes

Reusable components reduce duplication and improve consistency.

---

# Shared Assets

Shared assets include:

- Brand Colors
- Design Tokens
- Icon Library
- Typography
- Background Elements
- Decorative Shapes
- Grid Templates

All illustrations should consume shared assets instead of creating duplicates.

---

# Grid System

Illustration source files should align to the official Design System grid.

Recommended:

```text
8px Base Grid

↓

16px Layout Grid

↓

24px Component Grid
```

---

# Layer Organization

Illustrations should use meaningful layer names.

Example:

```text
Background

Characters

Devices

Objects

Icons

Labels

Decorations

Guides
```

Avoid unnamed layers such as:

```text
Layer 1

Group 4

Rectangle 92
```

---

# Color Management

Colors must come from the official brand palette.

Hardcoded colors should be avoided.

Shared color variables should be referenced whenever possible.

---

# Typography

Text should remain editable.

Never convert text to outlines unless required for print delivery.

Fonts should reference the official typography system.

---

# Version Control

Illustration sources use Semantic Versioning.

Examples:

```text
1.0.0

1.1.0

1.2.0

2.0.0
```

---

# Working Copies

Development workflow:

```text
Master

↓

Working Copy

↓

Review

↓

Approved

↓

Archive Previous Version
```

Working copies should never be released.

---

# Branching Strategy

Recommended repository branches:

```text
main

development

feature/{illustration-name}

release

archive
```

---

# Review Workflow

Every illustration source must pass:

```text
Concept

↓

Illustration

↓

Internal Review

↓

Accessibility Review

↓

Brand Review

↓

Final Approval

↓

Master Update
```

---

# Ownership

Every illustration requires one responsible owner.

Possible owners:

- Product Design
- Marketing Design
- Brand Team
- AI Design
- Documentation Team

Ownership must always be documented.

---

# Metadata

Each source file requires:

| Field | Required |
|---------|----------|
| Illustration ID | ✅ |
| Name | ✅ |
| Category | ✅ |
| Owner | ✅ |
| Department | ✅ |
| Version | ✅ |
| Status | ✅ |
| Created Date | ✅ |
| Updated Date | ✅ |
| Reviewer | ✅ |
| Source Format | ✅ |
| License | ✅ |

---

# Metadata Example

```json
{
  "illustration_id": "ILL-HERO-001",
  "name": "AI Workforce Hero",
  "category": "Hero",
  "owner": "Design System",
  "version": "1.0.0",
  "status": "Approved",
  "source": "Figma"
}
```

---

# Asset Registry

Every approved illustration should exist in the Illustration Library.

Whenever a source changes:

- Metadata
- Registry
- Export Package
- Documentation

must also be updated.

---

# Backup Policy

Master sources should be backed up:

- Daily
- Weekly
- Monthly

Major releases should receive permanent archived backups.

---

# Backup Locations

Recommended storage:

- Primary Repository
- Cloud Storage
- Offline Backup
- Release Archive

Maintain at least three independent backup locations.

---

# Disaster Recovery

Recovery workflow:

```text
Backup

↓

Integrity Verification

↓

Restore

↓

Validation

↓

Registry Synchronization

↓

Release
```

Recovery must preserve complete version history.

---

# Archive Policy

Older approved versions move to:

```text
archived/
```

Archived files become read-only.

---

# Deprecation Policy

Deprecated assets move to:

```text
deprecated/
```

Metadata should identify:

- Replacement
- Deprecation Date
- Removal Schedule

---

# Security

Source files must:

- Use role-based access control
- Preserve edit history
- Prevent unauthorized edits
- Maintain encrypted backups
- Store audit history

---

# Access Levels

| Role | Permission |
|------|------------|
| Viewer | Read |
| Designer | Edit Working Copies |
| Reviewer | Review |
| Maintainer | Merge Approved Changes |
| Administrator | Full Access |

---

# AI-Assisted Management

AI may assist with:

- Metadata generation
- Duplicate detection
- Layer validation
- Naming validation
- Accessibility suggestions
- Export preparation

AI must not:

- Approve illustrations
- Replace master sources
- Delete historical versions
- Publish production assets

---

# Automation

Future automation may include:

- Metadata generation
- Export generation
- Registry synchronization
- Backup creation
- Version increment
- SVG optimization
- Quality validation
- Documentation synchronization

---

# Quality Checklist

Before approval:

- [ ] Master source exists
- [ ] Naming verified
- [ ] Layer structure verified
- [ ] Shared components used
- [ ] Metadata completed
- [ ] Version assigned
- [ ] Accessibility reviewed
- [ ] Brand review completed
- [ ] Backup created
- [ ] Registry synchronized

---

# Maintenance Checklist

Regular reviews should verify:

- Duplicate files
- Missing metadata
- Broken references
- Outdated illustrations
- Backup integrity
- Registry synchronization
- Component consistency

---

# Audit Schedule

| Activity | Frequency |
|-----------|-----------|
| Source Review | Monthly |
| Metadata Audit | Quarterly |
| Backup Audit | Quarterly |
| Registry Audit | Quarterly |
| Complete Asset Audit | Annual |

---

# Common Mistakes

Avoid:

- Editing exported files
- Multiple master sources
- Unnamed layers
- Missing metadata
- Local-only storage
- Skipping reviews
- Ignoring backups
- Duplicate illustrations
- Hardcoded colors
- Manual production edits

---

# Best Practices

- Maintain one master source.
- Reuse shared assets.
- Keep source files organized.
- Preserve complete version history.
- Automate repetitive tasks.
- Archive instead of deleting.
- Maintain multiple backups.
- Synchronize documentation.
- Review before release.
- Protect production assets.

---

# Related Documents

- README.md
- illustration-guidelines.md
- illustration-style.md
- illustration-library.md
- hero-illustrations.md
- onboarding-illustrations.md
- empty-state-illustrations.md
- marketing-illustrations.md
- product-illustrations.md
- ai-workforce-illustrations.md
- technical-illustrations.md
- workflow-illustrations.md
- export-guidelines.md
- changelog.md
- ../branding/branding-guide.md
- ../assets-guidelines.md

---

# Version History

| Version | Date | Description |
|----------|------------|------------------------------|
| 1.0.0 | 2026-07-10 | Initial enterprise illustration source file management standard |

---

# Next Document

```text
docs/
└── 18-assets/
    └── illustrations/
        └── changelog.md
```

---

**End of Document**