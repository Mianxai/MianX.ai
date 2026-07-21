---
title: Documentation Standards
description: Defines the Enterprise Documentation Standards for MIANX-AI, including writing guidelines, document structure, formatting, metadata, versioning, review processes, naming conventions, quality requirements, AI-readability, and governance.
category: Knowledge
parent: docs/16-knowledge
status: Approved
owners:
  - Chief Knowledge Officer (CKO)
  - Chief Technology Officer (CTO)
reviewers:
  - Documentation Team
  - Architecture Board
  - Engineering Leadership
version: 1.0.0
last_updated: 2026-07-10
tags:
  - documentation
  - standards
  - governance
  - knowledge
  - enterprise
---

# Documentation Standards

---

# Purpose

This document establishes the official documentation standards for the entire MIANX-AI ecosystem.

Every document across all domains must follow these standards to ensure consistency, maintainability, discoverability, AI-readiness, and long-term scalability.

This document serves as the master reference for all documentation practices.

---

# Objectives

The Documentation Standards aim to:

- Establish a single documentation standard.
- Ensure consistency across all documentation.
- Improve readability.
- Improve maintainability.
- Enable AI-powered knowledge retrieval.
- Standardize document structures.
- Improve collaboration.
- Simplify onboarding.
- Support enterprise governance.
- Build long-term organizational knowledge.

---

# Scope

These standards apply to every document within:

```text
docs/

01-governance
02-company
03-product
04-system
05-workforce
06-engineering
07-platform
08-data
09-security
10-devops
11-operations
12-business
13-api
14-quality
15-ui-ux
16-knowledge
17-templates
18-assets
```

No documentation is exempt.

---

# Documentation Principles

Every document should be:

- Accurate
- Complete
- Consistent
- Structured
- Searchable
- Reusable
- Version Controlled
- Maintainable
- AI Readable
- Easy to Understand

---

# Standard Document Structure

Every document should follow this structure:

```text
YAML Metadata

↓

Title

↓

Purpose

↓

Objectives

↓

Scope

↓

Main Content

↓

Standards

↓

Best Practices

↓

Governance

↓

Related Documents

↓

Revision History
```

---

# YAML Metadata Standard

Every document must begin with metadata.

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

Mandatory metadata fields:

- title
- description
- category
- parent
- status
- owners
- reviewers
- version
- last_updated
- tags

---

# Document Naming Standards

File names must:

- Use lowercase.
- Use kebab-case.
- Be descriptive.
- Avoid abbreviations unless officially approved.

Correct examples:

```text
knowledge-management.md
documentation-standards.md
api-security.md
```

Incorrect examples:

```text
Doc.md
KM.md
SecurityDoc.md
MyFile.md
```

---

# Folder Naming Standards

Folders should:

- Use lowercase.
- Use kebab-case.
- Represent logical domains.

Example:

```text
16-knowledge
15-ui-ux
13-api
09-security
```

---

# Heading Standards

Use hierarchical headings only.

```text
#

##

###

####
```

Do not skip heading levels.

---

# Writing Standards

Documentation should:

- Use clear language.
- Avoid unnecessary complexity.
- Be concise.
- Use consistent terminology.
- Define technical terms.
- Use active voice where appropriate.
- Focus on implementation and clarity.

---

# Formatting Standards

Use:

- Markdown
- Tables
- Lists
- Code Blocks
- Diagrams
- Examples

Avoid excessive formatting.

---

# Code Block Standards

Specify language whenever possible.

Example:

````text
```yaml
```

```json
```

```typescript
```

```bash
```