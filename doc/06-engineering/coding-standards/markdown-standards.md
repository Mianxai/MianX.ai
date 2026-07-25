---
title: Markdown Standards
description: Defines the enterprise Markdown documentation standards, writing guidelines, formatting conventions, templates, review process, and governance for all documentation across the MIANX-AI platform.
category: Engineering
parent: 06-engineering/coding-standards
status: Draft
owners:
  - Chief Technology Officer (CTO)
  - Engineering Department
reviewers:
  - Architecture Review Board (ARB)
  - Documentation Team
  - Engineering Managers
version: 1.0.0
last_updated: 2026-07-08
tags:
  - markdown
  - documentation
  - standards
  - engineering
---

# Markdown Standards

---

# Purpose

This document defines the official Markdown documentation standards for the MIANX-AI platform.

Documentation is one of the organization's most valuable assets. High-quality documentation ensures knowledge preservation, efficient onboarding, maintainability, AI-assisted development, and long-term scalability.

These standards establish a consistent approach for writing, organizing, reviewing, and maintaining documentation across all MIANX-AI repositories.

---

# Objectives

The Markdown Standards aim to:

- Standardize documentation
- Improve readability
- Preserve organizational knowledge
- Improve developer onboarding
- Support AI-assisted development
- Maintain documentation quality
- Simplify maintenance
- Improve searchability
- Support long-term scalability
- Ensure documentation consistency

---

# Scope

These standards apply to:

- Technical Documentation
- Product Documentation
- Architecture Documentation
- API Documentation
- Engineering Standards
- Governance Documents
- Workforce Documentation
- SOPs
- Runbooks
- User Guides
- Knowledge Base Articles
- README Files

---

# Documentation Principles

Every document shall be:

- Accurate
- Complete
- Clear
- Consistent
- Structured
- Maintainable
- Searchable
- Version Controlled
- Easy to Navigate
- Future Proof

---

# File Naming

Use:

```text
kebab-case.md
```

Examples:

```text
project-structure.md

coding-principles.md

architecture-roadmap.md

deployment-guide.md

api-standards.md
```

Avoid:

```text
ProjectStructure.md

Project Structure.md

projectStructure.md
```

---

# Directory Organization

Documents shall follow the official documentation hierarchy.

Example:

```text
docs/

01-governance/

02-company/

03-product/

04-design/

05-workforce/

06-engineering/

07-security/

08-operations/
```

Each directory should contain a README.md.

---

# Front Matter

Every documentation file shall begin with YAML Front Matter.

Example:

```yaml
---
title:
description:
category:
parent:
status:
owners:
reviewers:
version:
last_updated:
tags:
---
```

This metadata supports documentation management, automation, and search.

---

# Document Structure

Every document should follow this general structure:

```text
Title

Purpose

Objectives

Scope

Main Content

Best Practices

Anti-Patterns

Compliance Checklist

Governance

Related Documents

Revision History
```

---

# Headings

Use proper heading hierarchy.

```markdown
# Level 1

## Level 2

### Level 3

#### Level 4
```

Never skip heading levels.

Incorrect:

```markdown
#

###

######
```

---

# Horizontal Rules

Separate major sections with:

```markdown
---
```

Use consistently throughout the document.

---

# Paragraphs

Paragraphs should:

- Be concise
- Focus on one idea
- Be easy to read

Avoid large blocks of text.

---

# Lists

Use unordered lists for collections.

Example:

```markdown
- Item
- Item
- Item
```

Use numbered lists for sequential processes.

Example:

```markdown
1. Step One
2. Step Two
3. Step Three
```

---

# Tables

Use tables for structured information.

Example:

| Field | Description |
|---------|------------|
| Name | User Name |
| Email | User Email |

Tables should remain readable.

---

# Code Blocks

Always specify the language.

Example:

````markdown
```typescript
const app = {};
```