# Department Icons

> Enterprise standards for designing, naming, assigning, implementing, validating, and governing department icons across the Mianx.ai ecosystem.

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | Department Icons |
| Folder | docs/18-assets/icons |
| File Name | department-icons.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Design System, Brand, Organization Design & Asset Governance Department |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

This document defines the official icon standards for organizational departments across the Mianx.ai ecosystem.

Department icons provide compact visual identification inside:

- Enterprise Dashboards
- Organization Charts
- Workforce Directories
- Department Workspaces
- Navigation Systems
- Reports
- Task Assignments
- Approval Workflows
- Analytics
- Documentation
- Presentations
- Administrative Interfaces

Department icons must remain consistent with the enterprise icon system and must not become independent logos without formal approval.

---

# Objectives

- Establish one official department icon system.
- Maintain consistent department identification.
- Prevent conflicting visual identities.
- Separate department icons from department logos.
- Support scalable organization growth.
- Improve navigation and workforce discovery.
- Enable reusable design-system components.
- Standardize department codes and metadata.
- Support accessibility and localization.
- Enable automation and governance audits.
- Preserve version and organizational history.

---

# Scope

These standards apply to icons representing:

- Leadership
- Engineering
- DevOps
- Security
- Infrastructure
- Data & AI
- Product
- Design
- Marketing
- SEO
- Sales
- Finance
- Human Resources
- Legal
- Operations
- Support
- Customer Success
- Research
- Quality Assurance
- Analytics
- Future Departments
- Temporary Approved Organizational Units

---

# Core Principle

A department icon represents an organizational function.

It must not:

- Replace the official Mianx.ai logo.
- Replace an approved department logo.
- Represent an individual employee.
- Represent an AI agent identity.
- Represent runtime department status.
- Create an independent sub-brand.
- Imply authority outside the department’s approved scope.
- Use unapproved colors or visual styles.

---

# Department Icon vs Department Logo

| Department Icon | Department Logo |
|-----------------|-----------------|
| Functional interface symbol | Formal department identity |
| Used in UI and navigation | Used in official branded communication |
| Compact and simplified | May include name and lockup |
| Part of icon system | Part of logo and brand system |
| Usually monochrome | May use approved department accent |
| Supports `currentColor` | Uses controlled brand variants |
| Identifies function | Identifies formal organizational identity |

Department icons must follow `icon-system.md`.

Department logos must follow:

```text
docs/18-assets/logos/department-logos.md
```

---

# Department Icon vs AI Workforce Icon

Department icons represent organizational units.

AI workforce icons represent:

- AI Roles
- AI Capabilities
- AI Agent Types
- AI Teams
- AI Execution Functions

Example:

```text
Engineering Department Icon
=
Represents the Engineering organization

Backend Engineer Agent Icon
=
Represents an AI role or capability
```

These must remain separate.

---

# Department Icon Architecture

```text
Mianx.ai Organization

├── Department
│   ├── Department Icon
│   ├── Department Code
│   ├── Department Name
│   ├── Department Metadata
│   └── Optional Department Accent Token
│
├── Teams
│   ├── Shared Department Icon
│   └── Optional Governed Team Symbol
│
└── Roles
    ├── Human Role
    └── AI Workforce Role
```

---

# Department Icon Design Philosophy

Department icons should feel:

- Professional
- Functional
- Consistent
- Minimal
- Recognizable
- Enterprise-ready
- Neutral
- Scalable
- Accessible

Department icons should not be overly literal or decorative.

---

# Visual System

Every department icon must follow the shared icon foundation:

- Approved Grid
- Approved Stroke Width
- Approved Line Caps
- Approved Line Joins
- Controlled Padding
- Optical Alignment
- Consistent Visual Weight
- Theme Compatibility
- Small-size Recognition

Recommended default:

```text
Grid: 24 × 24

Default Size: 20 or 24 px

Stroke: Shared Primary Icon Stroke

Color: currentColor
```

---

# Department Icon Categories

Department icons may be grouped into:

- Executive and Leadership
- Technology and Engineering
- Security and Infrastructure
- Data and Intelligence
- Product and Design
- Growth and Revenue
- Corporate Services
- Operations and Customer Functions
- Research and Quality
- Analytics and Reporting

---

# Department Code Standard

Every department must receive a stable department code.

Recommended pattern:

```text
DEPT-{CODE}
```

Examples:

```text
DEPT-LEAD

DEPT-ENG

DEPT-DEVOPS

DEPT-SEC

DEPT-DATAAI

DEPT-PROD

DEPT-DESIGN

DEPT-MKT

DEPT-FIN
```

Department codes must remain stable even if visible labels are localized.

---

# Department Icon ID Standard

Recommended pattern:

```text
ICON-DEPT-{DEPARTMENT-CODE}-{NUMBER}
```

Examples:

```text
ICON-DEPT-ENG-001

ICON-DEPT-SEC-001

ICON-DEPT-MKT-001

ICON-DEPT-FIN-001
```

---

# Official Department Registry

The following registry defines recommended initial department mappings.

| Department | Code | Primary Icon Direction |
|------------|------|------------------------|
| Leadership | LEAD | Compass, executive structure, or strategic direction |
| Engineering | ENG | Code brackets, terminal, or engineering structure |
| DevOps | DEVOPS | Pipeline, automation loop, or deployment flow |
| Security | SEC | Shield |
| Infrastructure | INFRA | Server, network, or infrastructure layers |
| Data & AI | DATAAI | Data nodes, neural network, or intelligence graph |
| Product | PROD | Product cube, roadmap, or structured package |
| Design | DESIGN | Pen tool, layout, or design frame |
| Marketing | MKT | Megaphone or campaign signal |
| SEO | SEO | Search with growth or ranking indicator |
| Sales | SALES | Handshake, opportunity, or revenue target |
| Finance | FIN | Ledger, chart, or controlled currency symbol |
| Human Resources | HR | People or organizational group |
| Legal | LEGAL | Scales, document shield, or legal balance |
| Operations | OPS | Process gear, workflow, or operational controls |
| Support | SUPPORT | Headset or support conversation |
| Customer Success | CS | Customer relationship with success indicator |
| Research | RND | Microscope, flask, or discovery symbol |
| Quality Assurance | QA | Checklist, test shield, or verified quality |
| Analytics | ANALYTICS | Chart, metrics, or analytical trend |

Final artwork must be reviewed before production registration.

---

# Leadership Icon

The Leadership department icon may represent:

- Strategy
- Direction
- Executive Coordination
- Governance
- Decision-making

Recommended visual directions:

- Compass
- Strategic Nodes
- Executive Structure
- Directional Star, if sufficiently distinct from favorite actions

Avoid:

- Crown
- Throne
- Personal Portrait
- Symbols implying unrestricted authority
- Decorative luxury imagery

---

# Engineering Icon

The Engineering icon represents software and systems engineering.

Recommended visual directions:

- Code Brackets
- Terminal
- Structured Nodes
- Technical Construction
- Modular System

Avoid:

- Generic wrench where it could mean maintenance.
- Product-specific framework logos.
- Programming language brand marks.
- Overly detailed circuit illustrations.

---

# DevOps Icon

The DevOps icon represents:

- Continuous Integration
- Continuous Delivery
- Automation
- Deployment
- Reliability Collaboration
- Release Operations

Recommended visual directions:

- Pipeline
- Infinity-style automation loop
- Connected deployment nodes
- Container and flow concept

Avoid:

- Third-party cloud-provider logos.
- Generic refresh icon without pipeline context.
- Symbols that imply only infrastructure.

---

# Security Icon

The Security icon should normally use a governed shield-based symbol.

It may represent:

- Protection
- Risk Management
- Security Controls
- Access Governance
- Threat Defense

Avoid:

- Padlock alone where it could represent a UI action.
- Aggressive weapons.
- Unapproved cybersecurity vendor marks.
- Symbols suggesting guaranteed security.

---

# Infrastructure Icon

The Infrastructure icon may represent:

- Servers
- Networks
- Compute
- Storage
- Platforms
- Cloud Foundation

Recommended visual directions:

- Server Stack
- Network Nodes
- Infrastructure Layers
- Compute Grid

Avoid:

- Specific cloud-provider logos.
- Product icons belonging to the platform department.
- Excessive data-center detail.

---

# Data & AI Icon

The Data & AI icon may represent:

- Data Systems
- Machine Learning
- Artificial Intelligence
- Data Pipelines
- Models
- Intelligence

Recommended visual directions:

- Connected Data Nodes
- Neural Network
- Data Graph
- Structured Intelligence Symbol

Avoid:

- Human brain imagery as the only representation.
- Robot faces.
- Generic sparkle icons.
- Unapproved third-party AI logos.

---

# Product Icon

The Product department icon may represent:

- Product Strategy
- Roadmaps
- Feature Systems
- User Value
- Product Lifecycle

Recommended visual directions:

- Structured Product Cube
- Roadmap
- Feature Layers
- Product Package

Avoid:

- Shopping bag unless the department is commerce-specific.
- Company product logos.
- Project-management icons used without distinction.

---

# Design Icon

The Design department icon may represent:

- Product Design
- Visual Design
- UX
- Design Systems
- Creative Direction

Recommended visual directions:

- Pen Tool
- Design Frame
- Layout Grid
- Ruler and Shape
- Controlled Creative Tool

Avoid:

- Paint palette as the only symbol where product design is broader.
- Decorative art imagery.
- Third-party design-software logos.

---

# Marketing Icon

The Marketing icon may represent:

- Campaigns
- Communication
- Audience Reach
- Brand Promotion
- Demand Generation

Recommended icon:

```text
Megaphone
```

Alternative directions:

- Campaign Signal
- Audience Reach
- Communication Wave

Avoid confusing marketing with announcements inside general UI.

---

# SEO Icon

The SEO department icon may represent:

- Search Visibility
- Ranking
- Organic Growth
- Search Optimization
- Content Discovery

Recommended directions:

- Search with trend
- Search with ranking bars
- Search graph

Avoid using the generic search icon alone.

---

# Sales Icon

The Sales icon may represent:

- Opportunities
- Client Acquisition
- Revenue
- Deals
- Commercial Relationships

Recommended directions:

- Handshake
- Opportunity Target
- Revenue Pipeline
- Deal Document

Avoid:

- Cash-only symbols.
- Aggressive growth arrows without relationship context.
- Icons that duplicate Finance.

---

# Finance Icon

The Finance icon may represent:

- Budgeting
- Accounting
- Financial Planning
- Cost Control
- Reporting

Recommended directions:

- Ledger
- Controlled chart
- Calculator
- Financial document

Currency symbols should be avoided as the sole global identifier unless the usage context is localized.

---

# Human Resources Icon

The Human Resources icon may represent:

- People Operations
- Talent
- Recruitment
- Employee Development
- Workforce Management

Recommended directions:

- People Group
- Organization Structure
- Person with Development Indicator

Avoid reducing HR to hiring only.

---

# Legal Icon

The Legal icon may represent:

- Legal Review
- Contracts
- Policy
- Rights
- Regulatory Matters

Recommended directions:

- Scales
- Legal Document
- Document Shield
- Balanced Columns

Avoid:

- Court-specific imagery where the department scope is broader.
- Country-specific legal symbols.
- Gavel as the only global legal metaphor.

---

# Operations Icon

The Operations icon may represent:

- Business Processes
- Coordination
- Execution
- Service Delivery
- Operational Control

Recommended directions:

- Process Gear
- Workflow
- Connected Operations
- Control Sliders with Process Context

Avoid using a generic gear if it conflicts with settings.

---

# Support Icon

The Support icon may represent:

- Customer Support
- Technical Support
- Assistance
- Issue Resolution
- Service Desk

Recommended direction:

```text
Headset
```

Alternative:

- Support Conversation
- Help Desk

Do not use the same support icon as a general help action without context.

---

# Customer Success Icon

The Customer Success icon may represent:

- Customer Outcomes
- Adoption
- Retention
- Relationship Growth
- Satisfaction

Recommended directions:

- Customer with Check
- Relationship Circle
- Success Path
- Handshake with Success Indicator

It must remain distinct from Sales and Support.

---

# Research Icon

The Research icon may represent:

- Investigation
- Discovery
- Experimentation
- Innovation Research
- Evidence Development

Recommended directions:

- Microscope
- Research Flask
- Discovery Lens
- Structured Experiment

Avoid unsafe or culturally narrow imagery.

---

# Quality Assurance Icon

The Quality Assurance icon may represent:

- Testing
- Verification
- Quality Controls
- Validation
- Defect Prevention

Recommended directions:

- Checklist with Check
- Test Shield
- Verified Quality Symbol
- Inspection Lens

QA must remain distinct from Security and general Approval.

---

# Analytics Icon

The Analytics icon may represent:

- Metrics
- Reporting
- Insights
- Trends
- Performance Analysis

Recommended directions:

- Bar Chart
- Line Chart
- Analytical Grid
- Metric Nodes

Avoid using the exact same icon as dashboard navigation where department identity is required.

---

# Future Department Icons

When a new department is created:

- Assign a department code.
- Confirm organizational approval.
- Search the icon registry.
- Review overlap with existing departments.
- Define department purpose.
- Select a visual metaphor.
- Test small-size recognition.
- Register metadata.
- Obtain design-system approval.
- Publish only after governance review.

---

# Temporary Organizational Units

Temporary units may include:

- Task Forces
- Programs
- Committees
- Transformation Offices
- Incident Teams

A dedicated icon should be created only when:

- The unit has formal approval.
- It has a defined lifecycle.
- Reuse is expected.
- Existing department icons are insufficient.
- Ownership is clear.

Temporary unit icons must include an expiry or review date.

---

# Department Icon Hierarchy

Department icons should follow:

```text
Company Identity

↓

Department Name

↓

Department Icon

↓

Optional Team or Capability Label
```

The icon must not visually overpower the company identity.

---

# Team Icons

Teams inside a department should normally reuse the parent department icon.

Example:

```text
Engineering Department
├── Backend Team
├── Frontend Team
├── Mobile Team
└── QA Team
```

Team differentiation may use:

- Text Labels
- Approved Badges
- Capability Icons
- Metadata

Do not create a separate team icon for every small group without justification.

---

# Subdepartment Icons

A subdepartment may receive a dedicated icon when:

- It has a stable long-term mandate.
- It appears independently in products.
- It requires frequent visual distinction.
- It has formal organizational approval.
- It will be maintained through governance.

---

# Department Accent Colors

Department icons should normally inherit interface color through:

```text
currentColor
```

Optional department accent colors may be used only in approved contexts such as:

- Organization Maps
- Department Directory
- Executive Reports
- Presentation Sections
- Department Dashboards

---

# Accent Color Restrictions

Department accent colors must not:

- Replace semantic status colors.
- Reduce accessibility.
- Create unapproved sub-brands.
- Conflict with product colors.
- Suggest status or severity.
- Alter third-party brand assets.

---

# Department Color Registry

If department accents are approved, maintain a registry.

| Department Code | Accent Token | Usage Scope | Status |
|-----------------|--------------|-------------|--------|
| TBD | TBD | TBD | Planned |

Exact values must be defined in the approved color-palette documentation.

---

# Monochrome Usage

Department icons must remain recognizable in:

- Monochrome Interfaces
- Printed Reports
- High-contrast Mode
- Grayscale Documents
- Embossed or Engraved Materials

Department meaning must not depend only on accent color.

---

# Outline Variants

Outline variants are recommended for:

- Navigation
- Tables
- Forms
- Directory Lists
- Standard Dashboards
- Compact UI

---

# Filled Variants

Filled variants may be used for:

- Selected Department
- Active Department Workspace
- Organization Overview Cards
- Compact High-emphasis Views
- Presentation Sections

Filled variants must preserve the same meaning and geometry family.

---

# Department Badge

A department badge may combine:

```text
[Department Icon] Department Name
```

Example:

```text
[Shield Icon] Security
```

Optional elements:

- Department Code
- Status
- Team Count
- Owner
- Workspace Link

Status must remain visually separate from identity.

---

# Organization Chart Usage

In organization charts, department icons should:

- Use consistent size.
- Use consistent placement.
- Include department names.
- Preserve hierarchy.
- Avoid status-color confusion.
- Support accessible reading order.
- Remain understandable when printed.

---

# Directory Usage

Department directory entries may include:

- Department Icon
- Department Name
- Department Code
- Department Leader
- Purpose
- Member Count
- Workspace Link

The icon should support discovery but not replace the department name.

---

# Navigation Usage

Department icons may appear in:

- Department Navigation
- Workspace Switchers
- Admin Panels
- Organization Settings
- Reporting Filters
- Task Assignment Interfaces

Navigation usage must follow `navigation-icons.md`.

---

# Dashboard Usage

Department dashboards may use icons for:

- Department Header
- KPI Cards
- Workspace Identity
- Report Sections
- Activity Feeds
- Filters

Do not use the department icon repeatedly as decoration on every card.

---

# Task and Workflow Usage

Department icons may identify:

- Task Owner
- Assigned Department
- Approval Department
- Escalation Destination
- Workflow Participant
- Reporting Owner

The exact department name must remain available.

---

# Department Filter Usage

Filters may show:

```text
[Department Icon] Department Name
```

Selected state should use:

- Checkbox
- Selected Container
- Text State
- Optional Filled Icon

Do not communicate selection through department color alone.

---

# Presentation Usage

Department icons may be used in:

- Organization Presentations
- Department Reports
- Strategy Reviews
- Operational Updates
- Workforce Planning
- Portfolio Reviews

Presentation usage should follow approved branding and presentation standards.

---

# Documentation Usage

Department icons may be used in:

- Department README Files
- Department Indexes
- Process Ownership Tables
- Responsibility Matrices
- Governance Documents

Documentation must include text labels and accessible alternatives.

---

# Mobile Usage

On mobile interfaces:

- Use 20–24 px icons.
- Provide sufficiently large targets.
- Preserve labels where possible.
- Avoid overcrowded organization lists.
- Use compact badges carefully.
- Test in light and dark themes.

---

# Department Icon Sizes

Recommended sizes:

| Context | Icon Size |
|---------|-----------|
| Dense Table | 16 px |
| Directory List | 20 px |
| Navigation | 20–24 px |
| Department Badge | 16–20 px |
| Workspace Header | 24–32 px |
| Organization Chart | 24–32 px |
| Presentation | 32–64 px |

---

# Alignment

Department icons must align with:

- Department Names
- Codes
- Navigation Labels
- Badges
- Organization Nodes
- Workspace Headers
- Filter Controls

Avoid manual page-specific offsets.

---

# Accessibility

Department icons should be treated according to context.

## Decorative Use

Where the visible department name already provides complete meaning:

```html
<DepartmentIcon aria-hidden="true" />
<span>Engineering</span>
```

## Icon-only Use

Icon-only department controls require:

- Accessible Department Name
- Tooltip
- Visible Focus
- Sufficient Target Size
- Current Selection State

---

# Accessible Label Examples

```text
Engineering Department

Security Department

Data and AI Department

Customer Success Department
```

Do not use department code alone as the accessible label unless the code is widely understood and visible.

---

# Color Accessibility

Where department accent colors are used:

- Maintain sufficient contrast.
- Preserve readable labels.
- Avoid color-only differentiation.
- Test high-contrast mode.
- Test grayscale output.
- Provide icon shape and text.

---

# Localization

Department icons must support localized department names.

Requirements:

- Keep department code stable.
- Keep icon system name stable.
- Localize visible department name.
- Localize tooltips.
- Avoid embedded text inside SVG.
- Support RTL layout.
- Test long department names.

---

# RTL Behavior

Most department icons should remain fixed in RTL layouts.

Normally fixed:

- Engineering
- Security
- Finance
- Legal
- HR
- Support
- Research
- Analytics

Any directional design element must receive specific RTL review.

---

# Department Naming Standard

Use the official approved department name.

Examples:

```text
Engineering

Data & AI

Human Resources

Customer Success

Quality Assurance
```

Avoid unofficial abbreviations in public-facing labels.

---

# System Naming Convention

Use lowercase kebab-case.

Pattern:

```text
department-{department-name}
```

Examples:

```text
department-engineering

department-security

department-data-ai

department-customer-success

department-quality-assurance
```

---

# Variant Naming

Examples:

```text
department-engineering-outline

department-engineering-filled

department-security-outline

department-finance-filled
```

---

# File Naming

Pattern:

```text
department-{name}-{variant}-{size}-v{version}.{extension}
```

Examples:

```text
department-engineering-outline-24-v1.svg

department-security-filled-24-v1.svg

department-data-ai-outline-20-v1.svg

department-customer-success-outline-24-v1.svg
```

Avoid:

```text
eng-icon-final.svg

security-new.svg

finance-logo-icon.svg

department-latest-2.svg
```

---

# Required Metadata

Every department icon must include:

| Field | Description |
|------|-------------|
| Icon ID | Unique icon identifier |
| Department ID | Linked organization identifier |
| Department Code | Stable department code |
| System Name | Machine-readable icon name |
| Display Name | Official department name |
| Description | Department function represented |
| Primary Metaphor | Approved visual metaphor |
| Allowed Contexts | Approved usage contexts |
| Restricted Contexts | Prohibited usage contexts |
| Variant | Outline, filled, or other |
| Default Size | Recommended size |
| Accent Token | Optional approved token |
| RTL Behavior | Mirror or Fixed |
| Accessibility Label | Recommended label |
| Source Path | Master source location |
| Component Name | Code component |
| Version | Current version |
| Status | Approved, deprecated, or archived |
| Replacement | Replacement icon |
| Owner | Department or design owner |
| Reviewer | Design-system reviewer |
| License | Licensing status |

---

# Metadata Example

```json
{
  "icon_id": "ICON-DEPT-ENG-001",
  "department_id": "DEPT-ENG",
  "department_code": "ENG",
  "system_name": "department-engineering",
  "display_name": "Engineering",
  "description": "Represents the Engineering Department",
  "primary_metaphor": "Code Brackets",
  "allowed_contexts": [
    "Organization Directory",
    "Workspace Navigation",
    "Department Reports"
  ],
  "variant": "outline",
  "default_size": 24,
  "rtl_behavior": "fixed",
  "version": "1.0.0",
  "status": "Approved"
}
```

---

# Department Icon Registry

Maintain a central registry.

| Icon ID | Department Code | System Name | Version | Status |
|---------|-----------------|-------------|---------|--------|
| TBD | LEAD | department-leadership | TBD | Planned |
| TBD | ENG | department-engineering | TBD | Planned |
| TBD | DEVOPS | department-devops | TBD | Planned |
| TBD | SEC | department-security | TBD | Planned |
| TBD | INFRA | department-infrastructure | TBD | Planned |
| TBD | DATAAI | department-data-ai | TBD | Planned |
| TBD | PROD | department-product | TBD | Planned |
| TBD | DESIGN | department-design | TBD | Planned |
| TBD | MKT | department-marketing | TBD | Planned |
| TBD | SEO | department-seo | TBD | Planned |
| TBD | SALES | department-sales | TBD | Planned |
| TBD | FIN | department-finance | TBD | Planned |
| TBD | HR | department-human-resources | TBD | Planned |
| TBD | LEGAL | department-legal | TBD | Planned |
| TBD | OPS | department-operations | TBD | Planned |
| TBD | SUPPORT | department-support | TBD | Planned |
| TBD | CS | department-customer-success | TBD | Planned |
| TBD | RND | department-research | TBD | Planned |
| TBD | QA | department-quality-assurance | TBD | Planned |
| TBD | ANALYTICS | department-analytics | TBD | Planned |

---

# Department Component Naming

Recommended component names:

```text
LeadershipDepartmentIcon

EngineeringDepartmentIcon

DevOpsDepartmentIcon

SecurityDepartmentIcon

InfrastructureDepartmentIcon

DataAI​DepartmentIcon

ProductDepartmentIcon

DesignDepartmentIcon

MarketingDepartmentIcon

FinanceDepartmentIcon
```

Component names must remain stable even if visual geometry changes.

---

# Component API

Recommended department-icon component API:

```tsx
type DepartmentIconProps = {
  department:
    | "leadership"
    | "engineering"
    | "devops"
    | "security"
    | "infrastructure"
    | "data-ai"
    | "product"
    | "design"
    | "marketing"
    | "seo"
    | "sales"
    | "finance"
    | "human-resources"
    | "legal"
    | "operations"
    | "support"
    | "customer-success"
    | "research"
    | "quality-assurance"
    | "analytics";
  size?: 16 | 20 | 24 | 32;
  variant?: "outline" | "filled";
  title?: string;
  className?: string;
};
```

---

# Component Example

```tsx
import { DepartmentIcon } from "@mianx/icons";

export function DepartmentBadge() {
  return (
    <span>
      <DepartmentIcon
        department="engineering"
        size={20}
        aria-hidden="true"
      />
      Engineering
    </span>
  );
}
```

---

# Source Structure

Recommended structure:

```text
icons/

└── departments/
    ├── leadership/
    ├── engineering/
    ├── devops/
    ├── security/
    ├── infrastructure/
    ├── data-ai/
    ├── product/
    ├── design/
    ├── marketing/
    ├── seo/
    ├── sales/
    ├── finance/
    ├── human-resources/
    ├── legal/
    ├── operations/
    ├── support/
    ├── customer-success/
    ├── research/
    ├── quality-assurance/
    ├── analytics/
    ├── metadata/
    ├── exports/
    └── source-files/
```

Create only folders corresponding to approved assets.

---

# Source File Standard

Every department icon should have:

- Editable Master
- Approved SVG Source
- Metadata Record
- Light-theme Preview
- Dark-theme Preview
- Small-size Preview
- Filled Variant where required
- Export Manifest

---

# Department Icon Creation Workflow

```text
Department Formally Approved

↓

Department ID and Code Assigned

↓

Department Function Documented

↓

Existing Icon Registry Searched

↓

Visual Metaphor Proposed

↓

Concept Review

↓

Icon Constructed on Shared Grid

↓

Small-size Testing

↓

Accessibility Review

↓

Organization Review

↓

Design-system Approval

↓

Metadata Registered

↓

Component Generated

↓

Package Released
```

---

# Approval Roles

| Role | Responsibility |
|------|----------------|
| Department Owner | Confirms department function |
| Organization Design Owner | Confirms organizational identity |
| Icon Designer | Creates department icon |
| Brand Reviewer | Prevents sub-brand conflicts |
| Design-system Lead | Maintains icon consistency |
| Accessibility Reviewer | Reviews readable usage |
| Frontend Engineer | Validates component implementation |
| Asset Manager | Registers and publishes asset |
| Governance Team | Reviews exceptions and structural changes |

---

# Department Change Workflow

A department icon may require revision when:

- Department Name Changes
- Department Mandate Changes
- Departments Merge
- Department Splits
- Department Closes
- Organization Structure Changes
- Icon Meaning Conflicts
- Accessibility Problems Appear
- Icon System Receives a Major Update

---

# Department Rename

When a department is renamed:

- Confirm whether the function changed.
- Preserve the existing Department ID where appropriate.
- Update display name.
- Review department code.
- Review icon meaning.
- Update metadata.
- Update accessible labels.
- Update organization directories.
- Record the change in the changelog.

A rename does not automatically require a new icon.

---

# Department Merger

When departments merge:

- Define the surviving department.
- Assign or preserve the Department ID.
- Review both previous icons.
- Select or create one approved icon.
- Deprecate replaced icons.
- Update navigation and reports.
- Preserve historical mappings.
- Publish migration guidance.

---

# Department Split

When one department splits:

- Create separate Department IDs.
- Define distinct functions.
- Review visual overlap.
- Create icons only where necessary.
- Preserve the original department history.
- Update all dependent systems.
- Record migration details.

---

# Department Closure

When a department closes:

- Mark the department inactive or retired.
- Deprecate the icon.
- Remove it from active selection.
- Preserve historical reports.
- Link the successor department where applicable.
- Archive source files and metadata.

---

# Department Status Separation

Department status must not be embedded into the icon.

Incorrect:

```text
Engineering Icon permanently colored green to mean active
```

Correct:

```text
[Engineering Icon] Engineering [Active Status Badge]
```

Identity and runtime status must remain separate.

---

# Duplicate Prevention

Before creating a department icon:

- Search the icon registry.
- Review department logos.
- Review product icons.
- Review platform icons.
- Review AI workforce icons.
- Compare visual metaphors.
- Confirm the department function is distinct.
- Confirm a text label cannot solve the need.
- Document the decision.

---

# Common Semantic Conflicts

Review carefully:

```text
Engineering vs DevOps

Infrastructure vs Platform

Data & AI vs Analytics

Product vs Project Management

Design vs Marketing

Sales vs Customer Success

Support vs Customer Success

Security vs Quality Assurance

Operations vs DevOps

Research vs Data & AI
```

Icons must remain visually distinct while following one shared family.

---

# Testing Requirements

Every department icon must be tested in:

- 16 px
- 20 px
- 24 px
- 32 px
- Light Theme
- Dark Theme
- High-contrast Mode
- Monochrome
- Navigation
- Organization Chart
- Directory List
- Department Badge
- Dashboard Header
- Mobile Interface
- Screen-reader Context
- RTL Layout

---

# Recognition Testing

Recognition testing should confirm that:

- The icon is distinguishable from other departments.
- The icon remains clear at small sizes.
- The metaphor matches department function.
- Users do not confuse it with an action.
- Users do not confuse it with a status.
- Users do not confuse it with a product logo.

---

# Visual Regression Testing

Automated testing should detect:

- Path Changes
- Stroke Changes
- View-box Changes
- Padding Changes
- Alignment Shifts
- Accent-token Changes
- Filled/outline Mismatch
- Theme Failures
- Missing Components
- Incorrect Department Mapping

---

# SVG Validation

Every department SVG must be checked for:

- Correct view box
- Correct stroke or fill
- `currentColor` compatibility where required
- No unsafe scripts
- No event handlers
- No external resources
- No hidden content
- No hardcoded unapproved colors
- Correct file naming
- Correct metadata
- Minimal path complexity

---

# Department Data Contract

Department data should use stable identifiers.

Example:

```json
{
  "department_id": "DEPT-ENG",
  "department_code": "ENG",
  "department_name": "Engineering",
  "icon_name": "department-engineering",
  "icon_version": "1.0.0",
  "status": "active"
}
```

---

# Department Mapping

Frontend systems should map department codes through one approved registry.

Example:

```ts
const departmentIconMap = {
  ENG: "department-engineering",
  SEC: "department-security",
  DATAAI: "department-data-ai",
  FIN: "department-finance",
} as const;
```

Do not create page-specific icon mappings.

---

# Unknown Department Handling

When an unknown department code is received:

- Use the approved generic organization icon.
- Display the department name if available.
- Preserve the raw code.
- Log the mapping issue.
- Do not guess the department icon.
- Notify the owning system where required.

---

# Generic Department Icon

A generic department icon may be used for:

- Unknown Departments
- Newly Created Unregistered Departments
- Temporary Import States
- Legacy Organization Records

It must not remain permanently in use after the department is formally registered.

---

# Versioning

Department icons follow semantic versioning.

| Change Type | Example | Meaning |
|-------------|---------|---------|
| Major | 2.0.0 | Significant metaphor or icon-system redesign |
| Minor | 1.1.0 | New variant or supported size |
| Patch | 1.0.1 | Small optical or technical correction |

---

# Breaking Changes

Breaking changes may include:

- Department code change
- System-name change
- Visual metaphor replacement
- Component removal
- Meaning reassignment
- Default variant change
- Department merger mapping
- Department split mapping

Breaking changes require migration documentation.

---

# Deprecation

When a department icon is deprecated:

- Mark it in the registry.
- Identify the replacement.
- Define migration deadline.
- Update component mappings.
- Update organization directories.
- Track active usage.
- Preserve source files.
- Preserve historic organization reports.
- Record the change in `changelog.md`.

---

# Usage Inventory

Maintain an inventory for critical department-icon usage.

| Icon ID | System | Component | Owner | Status |
|---------|--------|-----------|-------|--------|
| TBD | TBD | TBD | TBD | Planned |

This supports organization restructuring and migrations.

---

# Security and Confidentiality

Some departments or organizational units may be confidential.

Examples:

- Unannounced Business Units
- Internal Security Teams
- Acquisition Teams
- Temporary Investigation Units
- Confidential Research Programs

Restricted department icons must not be published in public asset packages.

---

# AI Workforce Usage

AI agents may:

- Map department codes to approved icons.
- Search department icons.
- Validate department metadata.
- Detect unknown department mappings.
- Detect duplicate metaphors.
- Generate component mappings.
- Produce organization inventory reports.
- Detect deprecated department icons.
- Suggest accessible labels.

AI agents must not:

- Create official departments.
- Publish new department icons without approval.
- Assign department authority.
- invent department codes.
- expose confidential departments.
- merge or split departments.
- replace mappings silently.
- approve their own changes.

---

# Automation Requirements

The department icon platform should eventually support:

- Department-registry synchronization
- Department-code validation
- Icon-mapping validation
- Unknown-department detection
- Duplicate-metaphor detection
- SVG security scanning
- Component generation
- Accessibility-label generation
- Deprecated-usage detection
- Organization-change alerts
- Visual regression testing
- Usage inventory synchronization
- Release manifest generation

---

# Quality Checklist

Before approving a department icon:

- [ ] Department formally approved
- [ ] Department ID assigned
- [ ] Department code assigned
- [ ] Official department name confirmed
- [ ] Department function documented
- [ ] Existing registry searched
- [ ] Duplicate check completed
- [ ] Visual metaphor approved
- [ ] Icon ID assigned
- [ ] System name approved
- [ ] Shared grid used
- [ ] Stroke verified
- [ ] Optical balance reviewed
- [ ] Distinction from other departments verified
- [ ] Distinction from logos verified
- [ ] Distinction from AI workforce icons verified
- [ ] Small-size testing completed
- [ ] Light-theme test completed
- [ ] Dark-theme test completed
- [ ] High-contrast test completed
- [ ] Monochrome test completed
- [ ] Accessibility label documented
- [ ] RTL behavior reviewed
- [ ] SVG security validation passed
- [ ] Component generated
- [ ] Metadata completed
- [ ] Source file preserved
- [ ] Organization approval recorded
- [ ] Design-system approval recorded

---

# Department Usage Checklist

Before using a department icon:

- [ ] Correct department code selected
- [ ] Correct icon version used
- [ ] Department name displayed where required
- [ ] Icon not used as a logo
- [ ] Icon not used as an individual identity
- [ ] Department status shown separately
- [ ] Accent color used only where approved
- [ ] Accessible label included where needed
- [ ] Target size verified
- [ ] Theme behavior verified
- [ ] Deprecated icon not used
- [ ] Confidentiality classification respected

---

# Restructuring Checklist

When organization structure changes:

- [ ] Change formally approved
- [ ] Affected departments identified
- [ ] Icon mappings reviewed
- [ ] Department IDs reviewed
- [ ] Department codes reviewed
- [ ] Replacement icons identified
- [ ] Migration plan created
- [ ] Navigation updated
- [ ] Organization charts updated
- [ ] Reports updated
- [ ] AI workforce mappings updated
- [ ] Deprecated icons marked
- [ ] Historical records preserved
- [ ] Changelog updated

---

# Audit Requirements

Department icon audits should verify:

- Correct department mappings
- Duplicate visual metaphors
- Missing department codes
- Inactive departments still active in UI
- Deprecated icons still in use
- Incorrect accent colors
- Icon and logo confusion
- Department and AI-agent identity confusion
- Missing accessible labels
- Missing metadata
- Unsafe SVG files
- Confidential departments exposed publicly
- Unregistered temporary units
- Broken organization links

Recommended frequency:

```text
Monthly Registry Validation

Quarterly Organization Audit

After Every Formal Restructuring

Annual Department Identity Review
```

---

# Common Mistakes

Avoid:

- Treating department icons as independent logos.
- Creating separate icons for every small team.
- Embedding department status into icon artwork.
- Assigning random accent colors.
- Using the same metaphor for multiple departments.
- Using third-party product logos.
- Confusing Engineering with DevOps.
- Confusing Data & AI with Analytics.
- Confusing Support with Customer Success.
- Using department codes without accessible names.
- Creating icons before organizational approval.
- Keeping retired department icons active.
- Exposing confidential organizational units.
- Maintaining page-specific department mappings.
- Using agent avatars as department icons.

---

# Related Documents

- `README.md`
- `icon-system.md`
- `ui-icons.md`
- `navigation-icons.md`
- `action-icons.md`
- `status-icons.md`
- `ai-workforce-icons.md`
- `file-and-content-icons.md`
- `icon-exports.md`
- `icon-source-files.md`
- `../logos/department-logos.md`
- `../logos/ai-workforce-logos.md`
- `../branding/color-palette.md`
- `../assets-guidelines.md`
- `../naming-conventions.md`
- `../design-system/README.md`
- `../../02-company/company-structure.md`
- `../../05-workforce/README.md`
- `../../19-ai-workforce/README.md`
- `../../30-enterprise-governance/README.md`

---

# Best Practices

- Maintain one stable icon per approved department.
- Use department codes as permanent technical identifiers.
- Keep department names visible in important contexts.
- Use shared icon-system geometry.
- Keep identity and operational status separate.
- Reuse parent department icons for small teams.
- Create new icons only for stable organizational units.
- Test department icons in navigation, directories, and charts.
- Preserve historical mappings during restructuring.
- Use approved generic fallback for unknown departments.
- Synchronize organization registry, icons, components, metadata, and documentation.
- Archive deprecated department icons instead of deleting them.

---

# Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-07-10 | Initial enterprise department icon standard established |

---

# Next Document

```text
docs/
└── 18-assets/
    └── icons/
        └── ai-workforce-icons.md
```

---

**End of Document**