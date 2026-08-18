---
title: Design Tokens
description: Defines the Enterprise Design Tokens System for the MIANX-AI Platform, including color tokens, typography tokens, spacing tokens, sizing tokens, radius tokens, shadow tokens, elevation, motion, breakpoints, semantic tokens, themes, and synchronization between design and frontend development.
category: UI / UX
parent: docs/15-ui-ux
status: Approved
owners:
  - Chief Product Officer (CPO)
  - Head of Design
reviewers:
  - UX Team
  - Frontend Engineering
  - Design System Team
version: 1.0.0
last_updated: 2026-07-10
tags:
  - design-tokens
  - ui
  - design-system
  - frontend
---

# Design Tokens

---

# Purpose

The Design Tokens system provides a centralized and platform-independent source of truth for every visual property used throughout the MIANX-AI ecosystem.

Design Tokens eliminate hardcoded values by defining reusable variables that synchronize the Design System with frontend implementation.

---

# Objectives

The Design Tokens framework aims to:

- Maintain visual consistency.
- Reduce duplicated styling.
- Support multiple themes.
- Improve maintainability.
- Simplify frontend development.
- Enable design-to-code synchronization.
- Standardize branding.
- Improve scalability.
- Support accessibility.
- Reduce implementation errors.

---

# Scope

Design Tokens cover:

- Colors
- Typography
- Font Sizes
- Font Weights
- Line Heights
- Letter Spacing
- Spacing
- Border Radius
- Borders
- Shadows
- Elevation
- Opacity
- Motion
- Breakpoints
- Z-Index
- Semantic Colors
- Themes

---

# Token Hierarchy

```text
Design Tokens

│

├── Global Tokens
│
├── Alias Tokens
│
├── Semantic Tokens
│
└── Component Tokens
```

---

# Token Naming Convention

Every token follows:

```text
category.type.variant.state
```

Examples

```text
color.primary.500
color.success.600
spacing.md
radius.large
font.heading.h1
shadow.medium
motion.fast
```

---

# Global Tokens

Global Tokens define raw design values.

Examples:

- Primary Blue
- White
- Black
- 16px
- 8px
- 12px Radius

Global Tokens never reference business meaning.

---

# Alias Tokens

Alias Tokens map global values into reusable names.

Example

```text
Primary → Blue 600

Danger → Red 600

Background → Gray 50
```

---

# Semantic Tokens

Semantic Tokens represent interface meaning.

Examples

```text
Background

Surface

Primary

Secondary

Success

Warning

Danger

Information

Border

Focus

Disabled
```

Semantic Tokens make theme switching possible.

---

# Color Tokens

Color tokens include:

## Brand Colors

- Primary
- Secondary
- Accent

---

## Neutral Colors

- White
- Gray Scale
- Black

---

## Status Colors

- Success
- Warning
- Error
- Info

---

## Background Colors

- Page Background
- Card Background
- Modal Background
- Sidebar Background

---

## Text Colors

- Primary Text
- Secondary Text
- Muted Text
- Disabled Text

---

## Border Colors

- Default Border
- Active Border
- Focus Border
- Error Border

---

# Typography Tokens

Typography includes:

- Font Family
- Font Size
- Font Weight
- Line Height
- Letter Spacing
- Paragraph Spacing

---

# Font Scale

| Token | Size |
|---------|------|
| xs | 12px |
| sm | 14px |
| md | 16px |
| lg | 18px |
| xl | 20px |
| 2xl | 24px |
| 3xl | 30px |
| 4xl | 36px |
| 5xl | 48px |

---

# Font Weight Tokens

| Token | Weight |
|---------|---------|
| Thin | 100 |
| Light | 300 |
| Regular | 400 |
| Medium | 500 |
| SemiBold | 600 |
| Bold | 700 |
| ExtraBold | 800 |

---

# Spacing Tokens

Use an 8-point spacing system.

| Token | Value |
|---------|---------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 40px |
| 3xl | 48px |
| 4xl | 64px |

---

# Size Tokens

Component sizing:

```text
XS

SM

MD

LG

XL
```

Applied to:

- Buttons
- Inputs
- Icons
- Cards
- Modals

---

# Border Radius Tokens

| Token | Value |
|---------|---------|
| none | 0px |
| sm | 4px |
| md | 8px |
| lg | 12px |
| xl | 16px |
| full | 9999px |

---

# Border Tokens

Standard border widths:

```text
1px

2px

4px
```

---

# Shadow Tokens

| Token | Usage |
|---------|----------------|
| xs | Small elevation |
| sm | Cards |
| md | Popovers |
| lg | Dialogs |
| xl | Large overlays |

---

# Elevation Tokens

Define component hierarchy.

Levels:

```text
0

1

2

3

4

5
```

Higher levels appear above lower ones.

---

# Opacity Tokens

| Token | Value |
|---------|---------|
| transparent | 0 |
| disabled | 0.38 |
| overlay | 0.60 |
| modal | 0.75 |
| opaque | 1.0 |

---

# Motion Tokens

Motion values include:

- Duration
- Delay
- Easing
- Animation Curves

Examples

```text
Fast

Normal

Slow
```

Motion should remain consistent across the platform.

---

# Breakpoint Tokens

| Device | Width |
|----------|---------|
| Mobile | 0–767px |
| Tablet | 768–1023px |
| Laptop | 1024–1439px |
| Desktop | 1440px+ |

---

# Z-Index Tokens

Layer hierarchy:

```text
Base

Dropdown

Sticky

Overlay

Modal

Tooltip

Notification
```

---

# Theme Tokens

Supported themes:

- Light Theme
- Dark Theme
- High Contrast Theme

Future themes:

- Enterprise Theme
- Brand Themes
- Customer Themes

Theme switching should only modify semantic tokens.

---

# Component Tokens

Each UI component may define:

- Padding
- Margin
- Height
- Width
- Radius
- Border
- Shadow
- Color
- Typography

Component tokens inherit from semantic tokens.

---

# Token Storage

The Design Tokens repository shall be the single source of truth.

Recommended structure:

```text
design-tokens/

├── colors.json
├── typography.json
├── spacing.json
├── sizing.json
├── radius.json
├── shadows.json
├── elevation.json
├── motion.json
├── breakpoints.json
├── semantic.json
└── themes/
```

---

# Design-to-Code Synchronization

All token updates shall follow:

```text
Design Update

↓

Token Update

↓

Review

↓

Approval

↓

Frontend Sync

↓

Testing

↓

Release
```

No visual values may be hardcoded in production.

---

# Best Practices

- Use semantic tokens.
- Never hardcode colors.
- Keep naming consistent.
- Reuse existing tokens.
- Document every token.
- Version token changes.
- Synchronize with Figma.
- Test all themes.
- Validate accessibility.
- Review tokens regularly.

---

# Anti-Patterns

Avoid:

- Hardcoded hex colors.
- Component-specific color values.
- Duplicate spacing values.
- Inconsistent typography.
- Random border radius.
- Manual theme overrides.
- Token duplication.
- Unapproved token names.
- Mixing semantic and raw values.

---

# Governance

The Design Tokens System is governed by:

- Chief Product Officer (CPO)
- Head of Design
- Design System Team
- Frontend Engineering

All token changes require review, documentation, versioning, and synchronization between design tools and production code.

---

# Related Documents

- README.md
- ui-ux-strategy.md
- design-principles.md
- design-system.md
- typography.md
- color-system.md
- iconography.md
- layout-system.md
- component-library.md
- frontend-guidelines.md

---

# Revision History

| Version | Date | Author | Summary |
|---------|------------|-------------------|------------------------------------------|
| 1.0.0 | 2026-07-10 | MIANX-AI Engineering | Initial Enterprise Design Tokens Framework. |