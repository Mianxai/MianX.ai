---
title: Typography
description: Defines the Enterprise Typography System for the MIANX-AI Platform, including font families, type scales, heading hierarchy, body text, responsive typography, multilingual support, accessibility requirements, and implementation standards.
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
  - typography
  - ui
  - design-system
  - accessibility
---

# Typography

---

# Purpose

Typography is one of the most important foundations of the MIANX-AI Design System.

It establishes a unified visual language that improves readability, accessibility, consistency, scalability, and overall user experience across every application, dashboard, AI interface, and digital product.

---

# Objectives

The Typography System aims to:

- Improve readability.
- Maintain consistency.
- Support accessibility.
- Reduce visual complexity.
- Create clear information hierarchy.
- Improve user comprehension.
- Support responsive layouts.
- Enable multilingual interfaces.
- Standardize implementation.
- Support enterprise scalability.

---

# Scope

The Typography System applies to:

- Web Applications
- Mobile Applications
- Desktop Applications
- AI Interfaces
- Dashboards
- Documentation
- Admin Panels
- Marketing Websites

---

# Typography Principles

Typography should always be:

- Readable
- Consistent
- Scalable
- Accessible
- Responsive
- Predictable
- Minimal
- Balanced
- Professional
- International

---

# Font Families

## Primary Font

Used for:

- Interface
- Navigation
- Buttons
- Forms
- Tables
- Dashboards
- Cards

Recommended:

```text
Inter
```

Fallbacks:

```text
Inter,
Segoe UI,
Roboto,
Helvetica,
Arial,
sans-serif
```

---

## Secondary Font

Used for:

- Marketing
- Landing Pages
- Hero Sections
- Large Headlines

Recommended:

```text
Poppins
```

---

## Monospace Font

Used for:

- Code
- APIs
- JSON
- Terminal
- Logs
- Technical Documentation

Recommended:

```text
JetBrains Mono
```

Fallbacks:

```text
JetBrains Mono,
Consolas,
Monaco,
Courier New,
monospace
```

---

# Font Scale

The platform follows a modular typography scale.

| Token | Size |
|---------|-------|
| xs | 12px |
| sm | 14px |
| md | 16px |
| lg | 18px |
| xl | 20px |
| 2xl | 24px |
| 3xl | 30px |
| 4xl | 36px |
| 5xl | 48px |
| 6xl | 60px |
| 7xl | 72px |

---

# Heading Hierarchy

| Heading | Size | Weight |
|-----------|------|---------|
| H1 | 60px | Bold |
| H2 | 48px | Bold |
| H3 | 36px | SemiBold |
| H4 | 30px | SemiBold |
| H5 | 24px | Medium |
| H6 | 20px | Medium |

---

# Body Text

| Type | Size |
|--------|------|
| Large | 18px |
| Default | 16px |
| Small | 14px |
| Extra Small | 12px |

---

# Labels

Used for:

- Forms
- Inputs
- Checkboxes
- Radio Buttons
- Toggles

Standard:

```text
14px
Medium
```

---

# Button Typography

| Button | Size |
|----------|------|
| Small | 14px |
| Medium | 16px |
| Large | 18px |

Buttons should use Medium weight.

---

# Caption Typography

Captions use:

```text
12px

Regular
```

Examples:

- Metadata
- Image Captions
- Help Text
- Secondary Information

---

# Code Typography

Technical content uses:

```text
JetBrains Mono

14px
```

Examples:

- Source Code
- API Examples
- JSON
- YAML
- CLI Commands

---

# Font Weight Scale

| Token | Weight |
|---------|---------|
| Thin | 100 |
| Extra Light | 200 |
| Light | 300 |
| Regular | 400 |
| Medium | 500 |
| SemiBold | 600 |
| Bold | 700 |
| ExtraBold | 800 |

---

# Line Heights

| Text Type | Line Height |
|------------|-------------|
| Headings | 120% |
| Body | 150% |
| Captions | 140% |
| Code | 150% |

---

# Letter Spacing

| Type | Value |
|--------|---------|
| Heading | -0.02em |
| Body | 0 |
| Button | 0.02em |
| Caption | 0.01em |

---

# Text Alignment

Default alignment:

- Left (LTR Languages)
- Right (RTL Languages)
- Center (Hero Sections)
- Justified only for documentation when appropriate

---

# Text Hierarchy

Visual hierarchy should follow:

```text
H1

↓

H2

↓

H3

↓

H4

↓

Body

↓

Caption
```

No level should visually compete with a higher level.

---

# Responsive Typography

Typography scales across devices.

| Device | Adjustment |
|----------|------------|
| Mobile | Smaller headings |
| Tablet | Medium scale |
| Desktop | Full scale |

Body text should remain readable on all devices.

---

# Accessibility

Typography must:

- Maintain sufficient contrast.
- Avoid tiny font sizes.
- Support browser zoom.
- Preserve readability at 200% zoom.
- Avoid using color alone for meaning.
- Support screen readers.

Typography should comply with WCAG guidelines.

---

# Multilingual Support

Typography must support:

- English
- Urdu
- Arabic
- Unicode
- RTL Languages
- Future international languages

Fonts must include full Unicode character support where applicable.

---

# Text Truncation

When space is limited:

- Use ellipsis (`...`)
- Preserve full text through tooltips or expansion
- Avoid cutting critical information

---

# Typography in AI Interfaces

AI-generated responses should:

- Use readable body text.
- Highlight important information.
- Differentiate code from prose.
- Use headings for long responses.
- Format lists consistently.
- Preserve whitespace where meaningful.

---

# Implementation Standards

Typography values must come from Design Tokens.

Do **not**:

- Hardcode font sizes.
- Hardcode weights.
- Mix font families.
- Override typography without approval.

---

# Best Practices

- Maintain a clear hierarchy.
- Keep paragraphs concise.
- Use consistent spacing.
- Limit font families.
- Ensure adequate contrast.
- Use semantic HTML (`h1`–`h6`, `p`, `strong`, etc.).
- Optimize for readability.
- Test on multiple devices.
- Support localization.
- Review typography regularly.

---

# Anti-Patterns

Avoid:

- Too many font families.
- Inconsistent heading sizes.
- Excessive bold text.
- Tiny font sizes.
- Low contrast text.
- Overuse of uppercase.
- Decorative fonts in applications.
- Hardcoded typography values.
- Misaligned text.
- Poor line spacing.

---

# Governance

The Typography System is governed by:

- Chief Product Officer (CPO)
- Head of Design
- Design System Team
- Frontend Engineering

All typography changes shall be reviewed, documented, versioned, and synchronized with the Design Tokens System before implementation.

---

# Related Documents

- README.md
- ui-ux-strategy.md
- design-principles.md
- design-system.md
- design-tokens.md
- color-system.md
- iconography.md
- layout-system.md
- responsive-design.md
- accessibility.md
- frontend-guidelines.md

---

# Revision History

| Version | Date | Author | Summary |
|---------|------------|-------------------|-------------------------------------------|
| 1.0.0 | 2026-07-10 | MIANX-AI Engineering | Initial Enterprise Typography System. |