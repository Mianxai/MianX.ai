# Naming Conventions

> Enterprise Naming Standards for Files, Folders, Assets, Documents, Media, Design Resources, and Digital Content Across the Mianx.ai Ecosystem

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | Naming Conventions |
| Folder | docs/18-assets |
| File Name | naming-conventions.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Enterprise Architecture Office |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

This document defines the official naming standards for every asset created, stored, and maintained within the Mianx.ai ecosystem.

Consistent naming improves:

- Searchability
- Automation
- AI discovery
- Version tracking
- Collaboration
- Maintainability
- Enterprise governance

---

# Objectives

- Standardize naming across all departments.
- Eliminate duplicate naming.
- Improve discoverability.
- Enable AI-powered indexing.
- Support long-term maintenance.

---

# General Rules

Every asset name should:

- Use lowercase letters.
- Use hyphens (`-`) instead of spaces.
- Avoid underscores unless technically required.
- Avoid special characters.
- Be descriptive.
- Be concise.
- Follow a predictable structure.

---

# Character Rules

## Allowed

```text
a-z
0-9
-
.
```

## Not Allowed

```text
Spaces
_
&
%
#
@
!
?
(
)
[
]
{
}
+
=
```

---

# Folder Naming

Use:

```text
authentication

user-management

design-system

database

architecture

wireframes
```

Avoid:

```text
Authentication Folder

My Files

New Folder

Test123

Folder_Final_Final
```

---

# File Naming

Format

```text
<descriptive-name>.<extension>
```

Examples

```text
authentication-workflow.md

api-reference.yaml

database-schema.drawio

landing-page.fig

company-logo.svg
```

---

# Version Naming

Major

```text
v1.0

v2.0

v3.0
```

Minor

```text
v1.1

v1.2
```

Patch

```text
v1.0.1

v1.0.2
```

Example

```text
dashboard-ui-v2.1.fig

api-reference-v1.4.yaml
```

---

# Logo Naming

Examples

```text
mianx-logo-primary.svg

mianx-logo-dark.svg

mianx-logo-light.svg

mianx-logo-icon.svg

mianx-logo-monochrome.svg
```

---

# Icon Naming

Format

```text
icon-<name>.svg
```

Examples

```text
icon-user.svg

icon-dashboard.svg

icon-settings.svg

icon-security.svg
```

---

# Illustration Naming

Examples

```text
illustration-ai-workforce.svg

illustration-dashboard.png

illustration-onboarding.webp
```

---

# Wireframe Naming

Examples

```text
login-wireframe.fig

dashboard-wireframe.fig

settings-wireframe.fig
```

---

# UI Mockup Naming

Examples

```text
login-ui.fig

dashboard-ui.fig

profile-ui.fig
```

---

# Screenshot Naming

Format

```text
<feature>-<date>.png
```

Examples

```text
dashboard-2026-07-10.png

login-screen-2026-07-10.png
```

---

# Diagram Naming

Examples

```text
authentication-flow.drawio

system-architecture.drawio

database-erd.drawio

deployment-diagram.drawio
```

---

# Workflow Naming

Examples

```text
user-onboarding-workflow.drawio

incident-response-workflow.drawio

deployment-workflow.drawio
```

---

# Presentation Naming

Examples

```text
company-overview.pptx

product-demo-v2.pptx

sales-presentation.pptx
```

---

# Video Naming

Examples

```text
dashboard-demo.mp4

installation-guide.mp4

agent-training.mp4
```

---

# Document Naming

Examples

```text
prd.md

architecture.md

workflow.md

database.md

testing.md
```

---

# Template Naming

Examples

```text
api-template.md

workflow-template.md

testing-template.md
```

---

# Export Naming

Examples

```text
project-report.pdf

architecture-export.pdf

database-export.png
```

---

# AI Generated Assets

AI-generated assets should follow:

```text
ai-<category>-<description>-v1.ext
```

Examples

```text
ai-logo-concept-v1.png

ai-dashboard-ui-v2.fig

ai-agent-diagram-v1.drawio
```

---

# Archive Naming

Format

```text
archive-<year>-<asset-name>
```

Examples

```text
archive-2026-brand-assets.zip

archive-2026-ui-designs.zip
```

---

# Temporary Files

Temporary files should begin with:

```text
temp-
```

Examples

```text
temp-dashboard.fig

temp-logo.png
```

Temporary files should never be committed to the main repository.

---

# Deprecated Assets

Format

```text
deprecated-<asset-name>
```

Examples

```text
deprecated-logo.svg

deprecated-dashboard.fig
```

---

# Language

All filenames must use English.

Avoid:

```text
mera-logo.svg

naya-dashboard.fig
```

Use:

```text
company-logo.svg

dashboard-ui.fig
```

---

# Date Format

Use ISO 8601.

```text
YYYY-MM-DD
```

Example

```text
2026-07-10
```

---

# Asset ID Format

```text
AST-000001

AST-000002

AST-000003
```

---

# Validation Checklist

Before publishing:

- [ ] Correct filename
- [ ] Lowercase
- [ ] Hyphens used
- [ ] No spaces
- [ ] Correct version
- [ ] Correct folder
- [ ] English language
- [ ] Naming standard followed

---

# Common Mistakes

Avoid

```text
FinalLogo.png

Logo New.svg

Dashboard Latest.fig

My Document.pdf

test.png
```

Preferred

```text
company-logo-v2.svg

dashboard-ui.fig

user-guide.pdf

authentication-workflow.drawio
```

---

# Best Practices

- Keep names short but meaningful.
- Use consistent terminology.
- Include versions where required.
- Never use random filenames.
- Never overwrite production assets.
- Archive instead of deleting.
- Review naming during code and design reviews.

---

# Related Documents

- README.md
- asset-inventory.md
- assets-guidelines.md
- branding-guide.md
- license.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0.0 | YYYY-MM-DD | Initial Release |

---

# Folder Completion Status

```text
18-assets/

✅ README.md
✅ asset-inventory.md
✅ assets-guidelines.md
✅ branding-guide.md
✅ license.md
✅ naming-conventions.md
```

---

# Next Folder

```text
docs/
└── 19-ai-workforce/
    └── README.md
```

---

**End of Document**