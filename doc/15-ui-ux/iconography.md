---
title: Iconography
description: Defines the Enterprise Iconography System for the MIANX-AI Platform, including icon philosophy, libraries, visual standards, semantic usage, accessibility requirements, AI-specific icons, product icons, navigation icons, and implementation guidelines.
category: UI / UX
parent: docs/15-ui-ux
status: Approved
owners:
  - Chief Product Officer (CPO)
  - Head of Design
reviewers:
  - UX Team
  - Frontend Engineering
  - Brand Team
version: 1.0.0
last_updated: 2026-07-10
tags:
  - iconography
  - ui
  - design-system
  - branding
---

# Iconography

---

# Purpose

The Iconography System establishes a unified visual language for icons throughout the MIANX-AI ecosystem.

Icons improve recognition, reduce cognitive load, accelerate navigation, and create a consistent interface across all products.

---

# Objectives

The Iconography System aims to:

- Standardize icon usage.
- Improve usability.
- Increase recognition speed.
- Support accessibility.
- Maintain visual consistency.
- Reduce interface clutter.
- Strengthen brand identity.
- Enable reusable components.
- Simplify development.
- Scale across all products.

---

# Scope

The Iconography System applies to:

- Web Applications
- Mobile Applications
- Desktop Applications
- AI Interfaces
- Dashboards
- Admin Panels
- Documentation
- Marketing Websites

---

# Icon Philosophy

Icons should always be:

- Simple
- Recognizable
- Consistent
- Minimal
- Functional
- Accessible
- Scalable
- Platform Independent

Icons must communicate meaning instantly.

---

# Design Principles

Every icon should be:

- Easily recognizable
- Pixel-perfect
- Balanced
- Geometrically aligned
- Minimal
- Consistent in style
- Easy to scan
- Meaningful

---

# Official Icon Style

The MIANX-AI platform adopts:

- Outline Icons (Primary)
- Filled Icons (Selected States)
- Rounded Corners
- Simple Geometry
- Minimal Detail

No mixed icon styles are allowed.

---

# Recommended Icon Library

Primary library:

```text
Lucide Icons
```

Secondary libraries (if required):

- Heroicons
- Material Symbols
- Tabler Icons

Custom icons should follow the same visual language.

---

# Icon Grid

All icons are designed on a consistent grid.

Standard grids:

```text
16 × 16

20 × 20

24 × 24

32 × 32

48 × 48

64 × 64
```

---

# Stroke Standards

Default stroke width:

```text
2px
```

Small icons:

```text
1.5px
```

Large illustrations:

```text
2.5px
```

Stroke width must remain consistent across the platform.

---

# Corner Radius

Rounded corners should remain consistent.

Avoid:

- Sharp corners
- Inconsistent curves
- Decorative shapes

---

# Icon Sizes

| Token | Size |
|---------|------|
| XS | 12px |
| SM | 16px |
| MD | 20px |
| LG | 24px |
| XL | 32px |
| XXL | 48px |
| Display | 64px |

---

# Icon Categories

---

## Navigation Icons

Examples:

- Dashboard
- Home
- Workspace
- Projects
- Tasks
- Calendar
- Settings
- Profile
- Notifications

---

## Action Icons

Examples:

- Add
- Edit
- Delete
- Save
- Copy
- Download
- Upload
- Refresh
- Search
- Filter
- Share

---

## Status Icons

Examples:

- Success
- Warning
- Error
- Information
- Pending
- Offline
- Online
- Loading

---

## File Icons

Examples:

- Folder
- Document
- PDF
- Image
- Video
- Spreadsheet
- Archive
- Database

---

## Communication Icons

Examples:

- Email
- Chat
- Message
- Phone
- Call
- Notification
- Comments

---

## Security Icons

Examples:

- Shield
- Lock
- Unlock
- Key
- MFA
- Permission
- Encryption
- Firewall

---

## Business Icons

Examples:

- Company
- Finance
- Analytics
- Revenue
- Sales
- Marketing
- Customer
- Vendor

---

## AI Icons

Dedicated icons for:

- AI Agent
- Assistant
- Automation
- Prompt
- Model
- Workflow
- Intelligence
- Machine Learning
- Neural Network
- Knowledge Base

These icons visually distinguish AI features from traditional software functions.

---

# Product Icons

Each major product should have a unique icon while remaining visually consistent.

Examples:

- AI Workforce
- CRM
- ERP
- Project Management
- Knowledge Base
- Analytics
- Automation Studio

---

# Icon States

Interactive icons support:

- Default
- Hover
- Focus
- Active
- Selected
- Disabled
- Loading

---

# Color Usage

Icons inherit colors from the Color System.

Allowed semantic colors:

- Primary
- Secondary
- Success
- Warning
- Error
- Information
- Disabled

Do not apply arbitrary colors.

---

# Accessibility

Icons must never be the only method of communication.

Requirements:

- Provide text labels where necessary.
- Support screen readers.
- Include accessible names.
- Maintain sufficient contrast.
- Ensure keyboard accessibility.

Decorative icons should be hidden from assistive technologies.

---

# Icon Placement

Maintain consistent spacing.

Recommended spacing:

```text
Icon

8px

Text
```

Avoid overcrowding.

---

# Responsive Behavior

Icons should scale proportionally.

Never stretch or distort icons.

Different devices should use appropriate icon sizes while preserving visual consistency.

---

# Animation Guidelines

Icon animations should:

- Provide feedback
- Indicate progress
- Improve usability
- Be subtle
- Be performant

Examples:

- Loading spinner
- Success check animation
- Notification pulse
- Expand/collapse indicator

Avoid unnecessary decorative animations.

---

# Custom Icon Creation

Custom icons must follow:

- Standard grid
- Standard stroke
- Standard radius
- Consistent proportions
- Semantic meaning
- Accessibility requirements

All custom icons require Design Team approval.

---

# Implementation Standards

Icons should be implemented as:

- SVG (Preferred)
- Component-based
- Theme-aware
- Token-driven
- Responsive

Avoid:

- PNG icons
- JPG icons
- Hardcoded dimensions
- Inline styling

---

# Best Practices

- Reuse existing icons.
- Use semantic icons.
- Maintain consistent sizing.
- Keep visual balance.
- Use SVG format.
- Follow accessibility standards.
- Test in light and dark themes.
- Document custom icons.
- Optimize SVG paths.
- Review icon usage regularly.

---

# Anti-Patterns

Avoid:

- Mixing icon libraries.
- Decorative icons without purpose.
- Different stroke widths.
- Random sizing.
- Inconsistent spacing.
- Using icons without labels where required.
- Low-contrast icons.
- Raster images as UI icons.
- Overly detailed icons.
- Duplicate icons representing the same action.

---

# Governance

The Iconography System is governed by:

- Chief Product Officer (CPO)
- Head of Design
- Brand Team
- Design System Team
- Frontend Engineering

All new icons must undergo design review, accessibility validation, documentation, and version control before being added to the Design System.

---

# Related Documents

- README.md
- ui-ux-strategy.md
- design-principles.md
- design-system.md
- design-tokens.md
- typography.md
- color-system.md
- layout-system.md
- responsive-design.md
- accessibility.md
- component-library.md
- frontend-guidelines.md

---

# Revision History

| Version | Date | Author | Summary |
|---------|------------|-------------------|------------------------------------------|
| 1.0.0 | 2026-07-10 | MIANX-AI Engineering | Initial Enterprise Iconography System. |