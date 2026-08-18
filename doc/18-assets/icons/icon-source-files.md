# Icon Source Files

> Enterprise standards for managing, organizing, protecting, versioning, maintaining, and governing all master icon source files across the Mianx.ai ecosystem.

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | Icon Source Files |
| Folder | docs/18-assets/icons |
| File Name | icon-source-files.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Design System Team, Brand Team & Asset Governance |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

This document defines how master icon source files are created, stored, organized, maintained, versioned, reviewed, archived, and protected across the entire Mianx.ai ecosystem.

Source files are the **single source of truth** for every icon.

Exported files must always be generated from these approved master files.

---

# Objectives

The source file management system exists to:

- Maintain one official source of truth
- Prevent duplicate artwork
- Protect master assets
- Standardize folder organization
- Enable team collaboration
- Simplify maintenance
- Improve recovery
- Support long-term scalability
- Enable automated exports
- Preserve complete version history

---

# Scope

These standards apply to every icon source including:

- UI Icons
- Navigation Icons
- Action Icons
- Status Icons
- Department Icons
- AI Workforce Icons
- File Icons
- Product Icons
- Brand Icons
- Marketing Icons
- Future Icon Families

---

# Core Principle

Only master source files may be edited.

Generated exports must **never** become new master files.

Correct workflow:

```text
Master Source

↓

Edit

↓

Approval

↓

Export

↓

Distribution
```

Incorrect workflow:

```text
PNG Export

↓

Edit

↓

New Master
```

---

# Source of Truth

Every icon must have one official master source.

Approved master formats:

- Figma
- SVG Master
- Adobe Illustrator (.ai) (if approved)

No other format may become the authoritative source.

---

# Source File Hierarchy

```text
Master Source

↓

Working Copy

↓

Review Version

↓

Approved Version

↓

Export Package
```

Only the approved version may generate production assets.

---

# Recommended Folder Structure

```text
icons/

├── source-files/
│
├── figma/
│
├── svg/
│
├── illustrator/
│
├── review/
│
├── approved/
│
├── archived/
│
├── deprecated/
│
├── metadata/
│
└── backups/
```

---

# Source Categories

Source files should be grouped by icon family.

```text
source-files/

├── ui/
├── navigation/
├── actions/
├── status/
├── departments/
├── ai-workforce/
├── files/
├── folders/
├── branding/
├── products/
└── shared/
```

---

# Figma Files

Figma should be the preferred collaborative design source.

Recommended usage:

- Component Library
- Design Tokens
- Variants
- Auto Layout
- Shared Styles
- Design Reviews

---

# Illustrator Files

Illustrator may be used for:

- Complex vectors
- Marketing graphics
- Brand assets

Illustrator masters must eventually synchronize with the Design System.

---

# SVG Masters

SVG masters should remain:

- Clean
- Editable
- Versioned
- Optimized
- Accessible

SVG masters are preferred for engineering integration.

---

# File Naming Standard

Pattern:

```text
{icon-name}-master-v{version}.{extension}
```

Examples:

```text
folder-master-v1.fig

status-success-master-v1.svg

department-engineering-master-v1.ai
```

Avoid:

```text
new-icon.ai

copy.svg

final-final.fig

latest.svg
```

---

# Component Library

Every approved icon should exist inside the official Design System library.

Each component should include:

- Default Variant
- Outline Variant
- Filled Variant
- Accessibility Notes
- Metadata
- Version

---

# Variant Management

Variants include:

- Outline
- Filled
- Monochrome
- High Contrast

Variants must remain inside one shared component.

---

# Design Tokens

Source files should consume shared tokens.

Examples:

- Stroke Width
- Corner Radius
- Grid
- Padding
- Colors
- Typography References

Never hardcode values already defined in the Design System.

---

# Grid Standard

Every icon must use:

```text
24 × 24 Grid
```

unless formally approved otherwise.

---

# Stroke Standard

All master files should follow the official stroke system.

Never manually adjust strokes without design review.

---

# Color Standard

Icons should primarily support:

```text
currentColor
```

Brand colors belong only where officially approved.

---

# Editing Workflow

```text
Request

↓

Create Working Copy

↓

Edit

↓

Internal Review

↓

Accessibility Review

↓

Design Approval

↓

Merge Into Master

↓

Generate Exports
```

---

# Review Process

Every modification requires:

- Design Review
- Accessibility Review
- Technical Review
- Governance Approval (where required)

---

# Change Requests

Every icon modification should include:

- Reason
- Owner
- Requested Date
- Affected Icons
- Risk Assessment
- Approval Status

---

# Version Control

Source files should use Semantic Versioning.

Examples:

```text
1.0.0

1.1.0

1.2.0

2.0.0
```

---

# Branching Strategy

Recommended branches:

```text
main

development

feature/icon-name

release

archive
```

---

# Working Copies

Working copies should exist only during active development.

Pattern:

```text
working/

↓

review/

↓

approved/
```

Working copies must never be distributed.

---

# Locking Policy

Critical source files may be locked.

Examples:

- Brand Icons
- Company Logo
- Department Icons
- Product Logos

Only authorized designers may modify locked assets.

---

# Backup Policy

Source files should be backed up:

- Daily
- Weekly
- Monthly

Critical releases should receive permanent backups.

---

# Backup Locations

Recommended:

- Primary Repository
- Cloud Backup
- Offline Backup
- Release Archive

At least three independent backup locations are recommended.

---

# Recovery Procedure

Recovery workflow:

```text
Backup

↓

Verification

↓

Restore

↓

Validation

↓

Registry Update

↓

Release
```

Recovery should preserve version history.

---

# Archive Policy

Older versions should move to:

```text
archived/
```

Archives must remain read-only.

---

# Deprecation Policy

Deprecated icons should move to:

```text
deprecated/
```

Metadata must identify replacements.

---

# Metadata Requirements

Every source file should include:

| Field | Description |
|------|-------------|
| Icon ID | Unique identifier |
| System Name | Internal name |
| Category | Icon family |
| Version | Semantic version |
| Owner | Responsible team |
| Status | Active/Deprecated |
| Source Format | Figma/SVG/AI |
| Last Updated | Date |
| Reviewer | Reviewer |
| Notes | Additional comments |

---

# Metadata Example

```json
{
  "icon_id": "ICON-STATUS-SUCCESS-001",
  "system_name": "status-success",
  "category": "Status",
  "version": "1.0.0",
  "owner": "Design System",
  "status": "Approved",
  "source": "Figma",
  "lastUpdated": "2026-07-10"
}
```

---

# Registry Synchronization

Whenever a source file changes:

- Metadata updates
- Registry updates
- Export regeneration
- Component synchronization
- Documentation updates

must occur together.

---

# Access Control

Roles may include:

| Role | Permission |
|------|------------|
| Viewer | Read |
| Designer | Edit Working Copy |
| Reviewer | Review |
| Maintainer | Merge |
| Administrator | Full Access |

---

# Security

Master files must:

- Remain inside approved repositories
- Use access control
- Maintain backups
- Preserve history
- Prevent unauthorized edits

---

# AI Usage

AI may assist with:

- Metadata generation
- Naming validation
- Duplicate detection
- SVG optimization suggestions
- Accessibility suggestions
- Export automation

AI must not:

- Replace approved masters
- Publish assets
- Delete source history
- Approve design changes

---

# Automation

Future automation may include:

- Export generation
- Metadata generation
- Registry synchronization
- Version increment
- SVG optimization
- Backup creation
- Validation
- Documentation updates

---

# Quality Checklist

Before approving a source file:

- [ ] Master file exists
- [ ] Naming verified
- [ ] Grid verified
- [ ] Stroke verified
- [ ] Metadata completed
- [ ] Version assigned
- [ ] Accessibility reviewed
- [ ] Source optimized
- [ ] Registry updated
- [ ] Backup created

---

# Maintenance Checklist

Regular maintenance should verify:

- Duplicate files
- Broken references
- Missing metadata
- Outdated versions
- Backup integrity
- Registry synchronization
- Component consistency

---

# Audit Requirements

Recommended audits:

```text
Monthly Source Review

Quarterly Registry Audit

Semiannual Backup Audit

Annual Design System Audit
```

---

# Common Mistakes

Avoid:

- Editing exported SVGs
- Multiple master sources
- Duplicate file names
- Missing metadata
- Untracked changes
- Skipping reviews
- Ignoring backups
- Manual export edits
- Hardcoded colors
- Local-only storage

---

# Best Practices

- Maintain one master source.
- Use semantic versioning.
- Keep working copies separate.
- Automate exports.
- Archive instead of deleting.
- Maintain three backups.
- Review before merge.
- Synchronize metadata.
- Protect critical assets.
- Document every change.

---

# Related Documents

- README.md
- icon-system.md
- icon-exports.md
- file-and-content-icons.md
- ai-workforce-icons.md
- department-icons.md
- status-icons.md
- navigation-icons.md
- action-icons.md
- ../assets-guidelines.md
- ../branding/color-palette.md
- ../naming-conventions.md

---

# Version History

| Version | Date | Description |
|----------|------------|------------------------------|
| 1.0.0 | 2026-07-10 | Initial enterprise icon source file management standard |

---

# Next Document

```text
docs/
└── 18-assets/
    └── icons/
        └── changelog.md
```

---

**End of Document**