---
title: Color System
description: Defines the Enterprise Color System for the MIANX-AI Platform, including brand colors, semantic colors, neutral palette, theme architecture, accessibility standards, color tokens, gradients, and implementation guidelines.
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
  - ui
  - colors
  - design-system
  - branding
---

# Color System

---

# Purpose

The Color System establishes the official color language for every MIANX-AI product, application, dashboard, website, AI interface, and digital experience.

It ensures visual consistency, accessibility, brand recognition, and maintainability across the entire ecosystem.

---

# Objectives

The Color System aims to:

- Build a recognizable visual identity.
- Maintain consistency.
- Improve readability.
- Support accessibility.
- Enable multiple themes.
- Reduce design inconsistencies.
- Simplify implementation.
- Improve scalability.
- Standardize semantic colors.
- Integrate with Design Tokens.

---

# Scope

The Color System applies to:

- Web Applications
- Mobile Applications
- Desktop Applications
- AI Interfaces
- Dashboards
- Landing Pages
- Documentation
- Marketing Materials
- Admin Panels

---

# Color Philosophy

Every color should communicate meaning.

Colors are not decorative—they guide users, provide feedback, establish hierarchy, and strengthen the MIANX-AI brand.

---

# Color Architecture

```text
Color System

│

├── Brand Colors
├── Neutral Colors
├── Semantic Colors
├── Surface Colors
├── Text Colors
├── Border Colors
├── Status Colors
├── Chart Colors
├── Gradient Colors
├── Theme Colors
└── Accessibility Rules
```

---

# Brand Colors

Primary Brand Colors represent the MIANX-AI identity.

| Token | Purpose |
|---------|----------|
| Primary | Main Brand |
| Secondary | Supporting Brand |
| Accent | Highlights |
| Interactive | User Actions |

All official products must use the approved brand palette.

---

# Neutral Palette

Neutral colors provide structure.

Levels include:

```text
White

Gray 50

Gray 100

Gray 200

Gray 300

Gray 400

Gray 500

Gray 600

Gray 700

Gray 800

Gray 900

Black
```

Neutral colors should be used for:

- Backgrounds
- Cards
- Borders
- Typography
- Layouts

---

# Semantic Colors

Semantic colors communicate meaning.

## Success

Used for:

- Successful actions
- Completed tasks
- Positive status

---

## Warning

Used for:

- Caution
- Pending states
- Attention-required items

---

## Error

Used for:

- Validation errors
- Failed operations
- Critical alerts

---

## Information

Used for:

- Notifications
- Help
- Informational messages

---

## Disabled

Used for:

- Inactive controls
- Disabled actions
- Read-only elements

---

# Surface Colors

Surface colors define UI layers.

Examples:

- Page Background
- Card Surface
- Modal Background
- Sidebar
- Navigation
- Popover
- Dialog

Each layer should remain visually distinct while maintaining consistency.

---

# Text Colors

Typography uses semantic text colors.

Levels include:

| Token | Usage |
|---------|---------|
| Primary Text | Main Content |
| Secondary Text | Supporting Content |
| Muted Text | Less Important |
| Inverse Text | Dark Backgrounds |
| Disabled Text | Disabled Controls |

---

# Border Colors

Standard border tokens:

- Default Border
- Hover Border
- Active Border
- Focus Border
- Error Border
- Divider Border

Borders should support visual hierarchy without excessive contrast.

---

# Interactive Colors

Interactive elements include:

- Buttons
- Links
- Inputs
- Toggles
- Checkboxes
- Navigation
- Cards

Each interaction must define:

- Default
- Hover
- Active
- Focus
- Disabled
- Loading

---

# Status Colors

Status colors indicate application state.

| Status | Purpose |
|---------|----------|
| Success | Completed |
| Warning | Needs Attention |
| Error | Failed |
| Info | Informational |
| Processing | Running |
| Offline | Disconnected |

---

# Chart Colors

Data visualizations shall use a standardized palette.

Charts must:

- Maintain sufficient contrast.
- Be distinguishable for color-blind users.
- Avoid relying solely on color.
- Include legends where appropriate.

---

# Gradient Standards

Gradients are reserved for:

- Hero Sections
- Marketing Pages
- Brand Illustrations
- AI Highlights

Gradients should **not** reduce readability or replace semantic colors.

---

# Theme Architecture

Supported themes:

## Light Theme

Optimized for daytime use.

---

## Dark Theme

Optimized for low-light environments.

---

## High Contrast Theme

Designed for accessibility.

---

## Future Themes

- Enterprise Branding
- Customer Branding
- White Label Themes

Themes should modify semantic tokens rather than individual components.

---

# Color Accessibility

All colors must comply with WCAG accessibility guidelines.

Requirements include:

- Sufficient foreground/background contrast.
- Visible focus indicators.
- Readable text.
- Color-independent communication.
- Support for color vision deficiencies.

No critical information should rely solely on color.

---

# AI Interface Colors

AI-related interfaces should use distinct visual cues for:

- AI Responses
- User Messages
- Suggestions
- Warnings
- Generated Content
- AI Actions
- AI Confidence Indicators

These cues should integrate seamlessly with the overall design language.

---

# Design Token Integration

All colors must originate from Design Tokens.

Example token hierarchy:

```text
color.brand.primary

color.surface.background

color.text.primary

color.status.success

color.border.default
```

Hardcoded color values are prohibited in production code.

---

# Implementation Guidelines

Frontend applications shall:

- Use semantic color tokens.
- Support theme switching.
- Avoid inline colors.
- Maintain consistency across components.
- Synchronize with the Design System.

---

# Best Practices

- Use semantic colors.
- Maintain adequate contrast.
- Limit decorative colors.
- Preserve brand consistency.
- Test all themes.
- Validate accessibility.
- Reuse existing tokens.
- Keep color usage predictable.
- Document new colors.
- Review regularly.

---

# Anti-Patterns

Avoid:

- Hardcoded color values.
- Excessive color variation.
- Low-contrast text.
- Decorative gradients in business workflows.
- Multiple shades representing the same meaning.
- Using color as the only indicator.
- Unapproved brand colors.
- Inconsistent theme implementation.
- Random opacity values.
- Overuse of accent colors.

---

# Governance

The Color System is governed by:

- Chief Product Officer (CPO)
- Head of Design
- Brand Team
- Design System Team
- Frontend Engineering

Any changes to the official color palette require review, approval, documentation, versioning, and synchronization with the Design Tokens System.

---

# Related Documents

- README.md
- ui-ux-strategy.md
- design-principles.md
- design-system.md
- design-tokens.md
- typography.md
- iconography.md
- layout-system.md
- responsive-design.md
- accessibility.md
- frontend-guidelines.md

---

# Revision History

| Version | Date | Author | Summary |
|---------|------------|-------------------|-------------------------------------------|
| 1.0.0 | 2026-07-10 | MIANX-AI Engineering | Initial Enterprise Color System. |