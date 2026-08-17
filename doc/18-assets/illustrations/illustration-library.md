# Illustration Library

> Enterprise registry and centralized inventory for every approved illustration used across the Mianx.ai ecosystem.

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | Illustration Library |
| Folder | docs/18-assets/illustrations |
| File Name | illustration-library.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Design System Team |
| Maintained By | Brand Team & Asset Governance |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

The Illustration Library serves as the **single source of truth** for every illustration created within the Mianx.ai ecosystem.

It provides a centralized inventory where every approved illustration is uniquely identified, documented, searchable, versioned, governed, and traceable throughout its lifecycle.

No production illustration should exist outside this library.

---

# Objectives

The Illustration Library exists to:

- Maintain one centralized registry
- Prevent duplicate artwork
- Improve discoverability
- Simplify maintenance
- Enable illustration reuse
- Improve governance
- Support automation
- Track ownership
- Track approvals
- Maintain complete lifecycle history

---

# Scope

The library includes every official illustration used across:

- Products
- Websites
- Mobile Apps
- Documentation
- Marketing
- Presentations
- AI Workforce
- Dashboards
- Landing Pages
- Knowledge Base
- Internal Systems

---

# Library Principles

Every illustration must be:

- Unique
- Reusable
- Searchable
- Versioned
- Approved
- Accessible
- Traceable
- Documented

---

# Illustration Lifecycle

```text
Request

↓

Planning

↓

Design

↓

Review

↓

Approval

↓

Library Registration

↓

Export

↓

Production

↓

Maintenance

↓

Archive
```

---

# Illustration Categories

The library organizes illustrations into standardized categories.

```text
Illustration Library

├── Hero
├── Product
├── Marketing
├── Onboarding
├── Empty States
├── AI Workforce
├── Technical
├── Workflow
├── Documentation
├── Social Media
├── Presentation
├── Educational
└── Experimental
```

---

# Illustration Registry

Every illustration receives one unique identifier.

Pattern:

```text
ILL-{CATEGORY}-{NUMBER}
```

Examples:

```text
ILL-HERO-001

ILL-PRODUCT-015

ILL-EMPTY-008

ILL-AI-021

ILL-WORKFLOW-010
```

Identifiers must never be reused.

---

# Library Metadata

Every illustration must include the following metadata.

| Field | Required |
|---------|-----------|
| Illustration ID | ✅ |
| Title | ✅ |
| Category | ✅ |
| Description | ✅ |
| Owner | ✅ |
| Department | ✅ |
| Status | ✅ |
| Version | ✅ |
| Tags | ✅ |
| Source File | ✅ |
| Export Package | ✅ |
| Created Date | ✅ |
| Last Updated | ✅ |
| Reviewer | ✅ |
| License | ✅ |

---

# Registry Example

| Field | Value |
|------|-------|
| ID | ILL-HERO-001 |
| Title | AI Workforce Hero |
| Category | Hero |
| Owner | Design Team |
| Version | 1.0.0 |
| Status | Approved |
| Tags | AI, Hero, Landing Page |
| Source | Figma |
| Export | SVG, PNG, WebP |

---

# Illustration Status

Supported statuses:

| Status | Description |
|---------|-------------|
| Draft | Under creation |
| Review | Pending approval |
| Approved | Ready for production |
| Published | Live |
| Deprecated | Scheduled for replacement |
| Archived | Historical |

---

# Ownership

Every illustration must have one responsible owner.

Possible owners:

- Design Team
- Brand Team
- Marketing
- Product Design
- Documentation Team
- AI Design Team

Ownership is mandatory.

---

# Department Mapping

Illustrations may belong to:

- Engineering
- Product
- Marketing
- HR
- Sales
- Finance
- Customer Success
- AI Workforce
- Platform
- Operations

---

# Tags

Tags improve searchability.

Examples:

```text
Dashboard

Automation

Cloud

AI

Security

Analytics

Orders

Restaurant

Finance

Workflow
```

---

# Search Rules

Illustrations should be searchable by:

- ID
- Title
- Category
- Tags
- Product
- Department
- Owner
- Status
- Version
- Keywords

---

# Naming Convention

Illustration names should follow:

```text
category-purpose-subject-version
```

Example:

```text
hero-ai-workforce-v1

empty-no-orders-v1

workflow-order-processing-v2

product-dashboard-v1
```

Avoid:

```text
new.png

final.ai

hero-new-final.svg

copy2.fig
```

---

# Folder Organization

```text
illustrations/

├── hero/
├── product/
├── marketing/
├── onboarding/
├── empty-state/
├── workflow/
├── ai-workforce/
├── technical/
├── documentation/
├── presentation/
├── social-media/
└── archived/
```

---

# Source Files

Approved master sources:

- Figma
- SVG
- Adobe Illustrator

Exports must never replace master files.

---

# Supported Export Formats

Official exports:

- SVG
- PNG
- WebP
- PDF

Additional exports may be generated for platform-specific requirements.

---

# Versioning

Illustrations use Semantic Versioning.

Examples:

```text
1.0.0

1.1.0

1.2.0

2.0.0
```

---

# Dependencies

Illustrations may depend on:

- Brand Colors
- Design Tokens
- Icon System
- Typography
- Grid System
- Illustration Style

Dependencies should be documented.

---

# Accessibility

Every library item should include:

- Alternative Text
- Accessibility Notes
- Contrast Review
- Decorative/Informative Classification

---

# Approval Workflow

```text
Draft

↓

Design Review

↓

Accessibility Review

↓

Brand Review

↓

Final Approval

↓

Library Registration

↓

Production Release
```

---

# Reuse Policy

Before creating a new illustration:

- Search the library.
- Check for existing assets.
- Extend existing artwork when possible.
- Avoid unnecessary duplication.

---

# Deprecation

Deprecated illustrations must:

- Remain searchable
- Reference replacements
- Preserve history
- Remain archived

They must not disappear from the registry.

---

# Archive Policy

Archived illustrations should include:

- Archive Date
- Reason
- Replacement
- Previous Versions
- Approval Record

---

# Security

Library assets must:

- Remain inside approved repositories
- Preserve edit history
- Restrict unauthorized editing
- Maintain backups
- Preserve metadata

---

# AI-Assisted Management

AI may assist with:

- Duplicate detection
- Tag generation
- Metadata creation
- Similarity search
- Accessibility suggestions
- Version comparison

AI must not approve production assets.

---

# Audit Requirements

Review schedule:

| Activity | Frequency |
|-----------|-----------|
| Library Review | Monthly |
| Duplicate Audit | Quarterly |
| Metadata Audit | Quarterly |
| Accessibility Audit | Quarterly |
| Complete Library Review | Annual |

---

# Quality Checklist

Before registration:

- [ ] Unique ID assigned
- [ ] Metadata complete
- [ ] Category verified
- [ ] Owner assigned
- [ ] Tags added
- [ ] Version assigned
- [ ] Source archived
- [ ] Exports generated
- [ ] Accessibility reviewed
- [ ] Approved by Design Team

---

# Best Practices

- Maintain one illustration library.
- Register every approved asset.
- Preserve complete history.
- Avoid duplicate artwork.
- Use consistent naming.
- Archive old versions.
- Keep metadata updated.
- Follow semantic versioning.
- Automate registry updates.
- Review regularly.

---

# Related Documents

- README.md
- illustration-guidelines.md
- illustration-style.md
- hero-illustrations.md
- onboarding-illustrations.md
- empty-state-illustrations.md
- marketing-illustrations.md
- product-illustrations.md
- ai-workforce-illustrations.md
- technical-illustrations.md
- workflow-illustrations.md
- export-guidelines.md
- source-files.md
- changelog.md
- ../branding/color-palette.md
- ../icons/icon-system.md

---

# Version History

| Version | Date | Description |
|----------|------------|------------------------------|
| 1.0.0 | 2026-07-10 | Initial enterprise illustration library specification |

---

# Next Document

```text
docs/
└── 18-assets/
    └── illustrations/
        └── hero-illustrations.md
```

---

**End of Document**