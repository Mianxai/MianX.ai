# Navigation Icons

> Enterprise standards for selecting, designing, implementing, validating, and governing navigation icons across the Mianx.ai ecosystem.

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | Navigation Icons |
| Folder | docs/18-assets/icons |
| File Name | navigation-icons.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Design System, Product Design & Frontend Platform Department |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

This document defines the official standards for navigation icons used across Mianx.ai products, platforms, dashboards, mobile applications, developer tools, and enterprise interfaces.

It ensures that navigation icons remain:

- Consistent
- Predictable
- Accessible
- Directionally correct
- Responsive
- Theme-aware
- Localization-ready
- Reusable
- Semantically stable
- Easy to maintain

---

# Objectives

- Standardize navigation icon usage.
- Maintain predictable navigation behavior.
- Prevent directional inconsistency.
- Support desktop and mobile navigation.
- Improve accessibility.
- Support right-to-left layouts.
- Reduce duplicate navigation icons.
- Define active and collapsed states.
- Enable reusable navigation components.
- Maintain complete governance and auditability.

---

# Scope

These standards apply to navigation icons used in:

- Primary Navigation
- Secondary Navigation
- Sidebars
- Top Navigation Bars
- Mobile Navigation
- Bottom Navigation
- Breadcrumbs
- Tabs
- Pagination
- Step Navigation
- Workspace Switchers
- Project Switchers
- Menus
- Submenus
- Tree Views
- Back and Forward Controls
- Previous and Next Controls
- Expand and Collapse Controls
- Drawer Navigation
- Command Palettes
- Dashboard Navigation
- Settings Navigation
- Developer Portals
- Documentation Portals

---

# Core Principle

Navigation icons must help users understand:

- Where they are
- Where they can go
- How to return
- Whether a section is open or closed
- Which item is active
- Whether more levels exist
- Whether the navigation direction changes in RTL layouts

Navigation icons must not create ambiguity between:

- Navigation
- Actions
- Status
- Content
- Decoration

---

# Navigation Hierarchy

Navigation icons should support a clear hierarchy.

```text
Application

↓

Primary Navigation

↓

Section Navigation

↓

Page Navigation

↓

Local Navigation

↓

Content-level Navigation
```

Each level should remain visually and semantically distinct.

---

# Navigation Icon Categories

The navigation system includes:

- Home Icons
- Dashboard Icons
- Back Icons
- Forward Icons
- Previous Icons
- Next Icons
- Up-level Icons
- Down-level Icons
- Chevron Icons
- Arrow Icons
- Breadcrumb Icons
- Menu Icons
- Sidebar Icons
- Tab Icons
- Pagination Icons
- Tree Navigation Icons
- Workspace Switcher Icons
- Drawer Icons
- Mobile Navigation Icons
- External Navigation Icons

---

# Primary Navigation Icons

Primary navigation icons represent major application areas.

Examples:

- Home
- Dashboard
- Projects
- Tasks
- Agents
- Workflows
- Analytics
- Security
- Settings
- Support

Primary navigation icons should:

- Use one consistent visual family.
- Remain recognizable at 20–24 px.
- Have clear text labels.
- Support active and inactive states.
- Remain usable in collapsed navigation.
- Avoid unnecessary detail.

---

# Secondary Navigation Icons

Secondary navigation icons represent subsections within a major area.

Examples:

```text
Projects
├── Overview
├── Members
├── Tasks
├── Files
└── Settings
```

Secondary navigation icons should remain visually subordinate to primary navigation.

---

# Sidebar Navigation

Sidebar navigation may use:

- Section Icons
- Expand Indicators
- Collapse Indicators
- Active Markers
- Nested-level Indicators
- Pin and Unpin Controls
- Sidebar Toggle

---

# Sidebar Item Structure

Recommended expanded structure:

```text
[Icon] Section Label [Optional Badge]
```

Recommended collapsed structure:

```text
[Icon]
```

Collapsed items must include:

- Accessible label
- Tooltip
- Current-state indication
- Keyboard support

---

# Sidebar Active State

The active navigation item should use more than color alone.

Approved indicators may include:

- Active Background
- Filled Icon Variant
- Left or Right Indicator Bar
- Stronger Text Weight
- Visible Border
- Accessible Current-page State

Example:

```html
<a href="/projects" aria-current="page">
  <ProjectsIcon aria-hidden="true" />
  <span>Projects</span>
</a>
```

---

# Sidebar Collapse Icon

The sidebar collapse control should clearly reflect the resulting action.

Examples:

- Collapse Sidebar
- Expand Sidebar
- Hide Navigation
- Show Navigation

The icon should update when the sidebar state changes.

---

# Top Navigation

Top navigation may include icons for:

- Menu
- Home
- Search
- Workspace Switcher
- Notifications
- Help
- User Account
- Settings

Icons in top navigation should remain compact and consistent.

---

# Mobile Navigation

Mobile navigation may use:

- Menu Trigger
- Bottom Navigation
- Back Button
- Close Button
- Tab Bar
- More Menu
- Drawer Toggle

Mobile icons must support:

- Touch interaction
- Sufficient target size
- Visible selected state
- Safe-area placement
- Portrait and landscape layouts

---

# Bottom Navigation

Bottom navigation is appropriate for high-frequency destinations.

Recommended maximum:

```text
3–5 primary destinations
```

Each item should include:

- Icon
- Text Label
- Selected State
- Accessible Name

Do not use unlabeled icons for primary mobile destinations unless the platform pattern is formally approved and usability-tested.

---

# Bottom Navigation Selected State

The selected item may use:

- Filled Icon
- Active Color
- Background Container
- Indicator
- Stronger Text Label

Selection must remain understandable without color alone.

---

# Menu Icon

The standard menu trigger may use:

```text
Three Horizontal Lines
```

Use for:

- Opening Primary Navigation
- Opening Mobile Drawer
- Revealing Hidden Navigation

The menu icon must not be used for generic “more options.”

---

# More-options Icons

Use:

```text
Horizontal Ellipsis
```

or:

```text
Vertical Ellipsis
```

for additional actions.

Do not use the menu icon and more-options icon interchangeably.

---

# Back Navigation

The back icon should return the user to the previous logical location.

Recommended symbol:

```text
Left Arrow in LTR Interfaces
```

In RTL interfaces, the icon should normally mirror.

---

# Back vs Previous

These concepts are different.

| Concept | Meaning |
|---------|---------|
| Back | Return to the previous screen or navigation level |
| Previous | Move to the previous item in a sequence |
| Up | Move to the parent hierarchy |
| Undo | Reverse an action |

Do not use one icon for all four concepts.

---

# Forward Navigation

Forward navigation may represent:

- Browser-like forward history
- Moving to the next screen
- Continuing a setup
- Opening a child view

The label or context must clarify the behavior.

---

# Next and Previous

Use next and previous controls for:

- Pagination
- Onboarding
- Slides
- Media galleries
- Multi-step workflows
- Record navigation

The icon must reflect the current interface direction.

---

# Up-level Navigation

Up-level navigation moves to a parent hierarchy.

Examples:

```text
Folder Child

↓

Parent Folder
```

or:

```text
Project Settings

↓

Project
```

The up-level icon must not be confused with upload.

---

# Arrow Icons

Arrows usually communicate movement or direction.

Examples:

- Arrow Left
- Arrow Right
- Arrow Up
- Arrow Down
- Arrow Up-right
- Arrow Down-left

Arrows should be used when directional movement is important.

---

# Chevron Icons

Chevrons usually communicate:

- Expansion
- Collapse
- Navigation into a child view
- Previous or next compact movement
- Dropdown state

Chevrons are visually lighter than full arrows and should not be used where strong movement meaning is required.

---

# Caret Icons

Carets may be used for:

- Dropdown indicators
- Compact menus
- Tree controls
- Sort direction

One product should not mix chevrons and carets randomly for the same behavior.

---

# Expand and Collapse

Recommended meanings:

| Icon | Meaning |
|------|---------|
| Chevron Right | Collapsed nested item in LTR |
| Chevron Down | Expanded nested item |
| Plus | Expand, only in approved tree patterns |
| Minus | Collapse, only in approved tree patterns |
| Expand Corners | Enter fullscreen or enlarge |
| Collapse Corners | Exit fullscreen or reduce |

---

# Expansion State

The expansion icon must reflect current state.

Example:

```text
Collapsed Item:
Chevron Right

Expanded Item:
Chevron Down
```

The control should include:

```text
aria-expanded="true"
```

or:

```text
aria-expanded="false"
```

---

# Breadcrumb Icons

Breadcrumbs may use:

- Chevron Right
- Slash
- Approved Separator
- Home Icon for Root

Directional separators must mirror in RTL layouts where appropriate.

---

# Breadcrumb Structure

Recommended pattern:

```text
Home > Projects > Project Alpha > Settings
```

An icon-only root item must include an accessible label.

Example:

```html
<a href="/" aria-label="Home">
  <HomeIcon aria-hidden="true" />
</a>
```

---

# Breadcrumb Rules

- Keep the current page non-interactive where appropriate.
- Use one consistent separator.
- Avoid excessive icon use.
- Collapse long paths carefully.
- Preserve access to meaningful parent levels.
- Support keyboard navigation.

---

# Tabs

Tabs may use icons where icons improve recognition.

Examples:

```text
[Overview Icon] Overview

[Members Icon] Members

[Files Icon] Files

[Settings Icon] Settings
```

Tab icons should not replace labels in complex enterprise interfaces.

---

# Tab Active State

Active tabs should use:

- Text
- Visible indicator
- Correct ARIA state
- Optional filled icon

The icon alone must not communicate the active tab.

---

# Pagination Icons

Pagination may include:

- First Page
- Previous Page
- Next Page
- Last Page

Recommended structure:

```text
[First] [Previous] Page 2 of 10 [Next] [Last]
```

---

# Pagination Accessibility

Every pagination icon button must include an accessible label.

Examples:

```text
Go to first page

Go to previous page

Go to next page

Go to last page
```

Disabled controls must not be actionable.

---

# Step Navigation

Step-based interfaces may use icons for:

- Completed Step
- Current Step
- Upcoming Step
- Error Step
- Optional Step

Navigation state must not rely on icon color only.

---

# Stepper Direction

Steppers may be:

- Horizontal
- Vertical
- Responsive

Directional connectors should follow reading order.

RTL layouts require appropriate order and connector handling.

---

# Tree Navigation

Tree interfaces may use:

- Chevron Right
- Chevron Down
- Folder
- Open Folder
- File
- Nested Item
- Loading Indicator

Each expandable tree item must communicate:

- Level
- Expanded State
- Selected State
- Focus State
- Child Availability

---

# Tree View Accessibility

Tree navigation should support:

- Arrow-key navigation
- Expand and collapse controls
- `aria-expanded`
- `aria-selected`
- Visible focus
- Logical hierarchy
- Screen-reader labels

---

# Workspace Switcher

Workspace switchers may include:

- Current Workspace Icon
- Dropdown Indicator
- Organization Icon
- Project Icon
- Recent Workspace Indicator

The dropdown indicator should remain visually secondary.

---

# Workspace Switcher Structure

Recommended:

```text
[Workspace Icon] Workspace Name [Chevron Down]
```

Collapsed variants may use:

```text
[Workspace Icon] [Chevron Down]
```

with accessible labels and tooltips.

---

# Project Switcher

Project switchers should use:

- Project Identity or Approved Symbol
- Project Name
- Dropdown Indicator
- Optional Status Badge

Do not use random icons to represent each project unless a governed project icon system exists.

---

# Account Navigation

Account navigation may use:

- User Avatar
- User Icon
- Organization Icon
- Settings
- Sign Out
- Profile
- Billing
- Security

The account menu trigger should be clearly distinguishable from general settings.

---

# Settings Navigation

Settings areas may use icons for:

- General
- Profile
- Security
- Notifications
- Billing
- Integrations
- API
- Team
- Audit
- Developer Settings

Labels are strongly recommended because many settings icons are conceptually similar.

---

# Documentation Navigation

Documentation interfaces may use:

- Home
- Guide
- API
- Code
- Reference
- Tutorial
- External Link
- Previous Article
- Next Article
- Table of Contents

Icons should support content discovery without overwhelming the document structure.

---

# External Navigation

External links should use a consistent external-link icon.

Use when:

- Opening another domain
- Opening an external service
- Opening external documentation
- Leaving the current product

The icon should normally appear after the link label.

---

# New-tab Behavior

Do not use the external-link icon solely to indicate a new browser tab.

Where opening in a new tab is important, include accessible context.

Example:

```text
Open documentation in a new tab
```

---

# Route Navigation vs Action

Navigation changes location.

Actions change data or state.

Examples:

| Navigation | Action |
|------------|--------|
| Open Settings | Save Settings |
| Go to Project | Create Project |
| View User | Delete User |
| Open Report | Export Report |

Icons should reflect the correct category.

---

# Directional Consistency

Directional meanings must remain stable across the ecosystem.

Example standard:

| Icon | Standard Meaning |
|------|------------------|
| Arrow Left | Back or previous, based on context |
| Arrow Right | Forward or next |
| Arrow Up | Move up or parent, with context |
| Arrow Down | Move down |
| Chevron Down | Expand dropdown |
| Chevron Right | Enter child view or collapsed tree item |
| External Link | Open external destination |
| Home | Root destination |

---

# RTL Support

Navigation icons are highly sensitive to reading direction.

Icons that normally mirror:

- Back
- Forward
- Previous
- Next
- Breadcrumb Separator
- Nested Navigation Chevron
- Sidebar Collapse Direction
- Undo and Redo, where directionally represented
- Directional Page Transitions

---

# Icons That Normally Do Not Mirror

- Home
- Search
- Settings
- Calendar
- Clock
- Notification
- Brand Logos
- Status Icons
- Media Playback, unless platform convention requires it
- Download
- Upload
- External Link, subject to design-system decision

---

# RTL Metadata

Every directional navigation icon should include:

| Field | Description |
|------|-------------|
| Directional | Yes or No |
| RTL Behavior | Mirror or Fixed |
| LTR Meaning | Meaning in left-to-right layout |
| RTL Meaning | Meaning in right-to-left layout |
| Mirroring Method | CSS, component logic, or alternate asset |
| Exceptions | Documented exceptions |

---

# RTL Implementation Example

```tsx
<ChevronIcon
  className={direction === "rtl" ? "rtl-mirror" : undefined}
/>
```

Example CSS:

```css
.rtl-mirror {
  transform: scaleX(-1);
}
```

Mirroring must be controlled by the component system rather than manually repeated across pages.

---

# Localization

Navigation icons should support:

- Translated labels
- Longer text
- RTL layouts
- Different reading directions
- Localized breadcrumbs
- Localized pagination labels
- Localized tooltips

Icons must not depend on English letters unless the concept is language-specific and approved.

---

# Active Navigation State

Active state may use:

- Filled icon
- Active color token
- Background
- Indicator line
- Stronger label
- `aria-current`

Do not rely only on icon color.

---

# Hover State

Hover may use:

- Background change
- Icon color change
- Label color change
- Subtle container emphasis

The icon geometry should not move or resize unexpectedly.

---

# Focus State

Navigation controls must display a visible focus state.

Focus should apply to the full interactive item, not only the icon.

---

# Disabled Navigation

Disabled navigation should be used sparingly.

A disabled item must:

- Remain readable.
- Communicate unavailability.
- Avoid receiving activation.
- Provide explanation where useful.
- Maintain accessible disabled semantics.

---

# Collapsed Navigation

Collapsed navigation must preserve:

- Icon recognition
- Accessible names
- Tooltips
- Active state
- Keyboard access
- Badge meaning
- Focus order

Collapsed navigation should not hide critical information permanently.

---

# Navigation Badges

Navigation items may include badges for:

- Unread Count
- Pending Tasks
- Alerts
- New Items
- Failed Jobs

Badges should remain separate from the navigation icon.

---

# Badge Accessibility

Badge meaning should be announced through accessible text.

Example:

```text
Notifications, 5 unread
```

Do not rely only on a colored dot.

---

# Navigation Icon Sizes

Recommended sizes:

| Context | Size |
|---------|------|
| Compact Breadcrumb | 12–16 px |
| Dense Sidebar | 16–20 px |
| Standard Sidebar | 20 px |
| Top Navigation | 20–24 px |
| Mobile Bottom Navigation | 24 px |
| Large Launcher | 24–32 px |
| Empty Navigation State | 32–48 px |

---

# Interactive Target Sizes

Recommended relationship:

| Icon Size | Minimum Target |
|-----------|----------------|
| 16 px | 32 px |
| 20 px | 40 px |
| 24 px | 44–48 px |

Mobile and touch interfaces should favor larger targets.

---

# Spacing

Use approved spacing tokens.

Common navigation relationships:

```text
Icon to Label: 8 px

Nested Indentation: Controlled Token

Icon to Badge: 8–12 px

Breadcrumb Separator Spacing: 4–8 px
```

Exact values must come from the design system.

---

# Alignment

Navigation icons should align with:

- Text Labels
- Active Indicators
- Badges
- Nested Levels
- Focus Rings
- Containers

Avoid page-specific manual offsets.

---

# Theme Support

Navigation icons must support:

- Light Theme
- Dark Theme
- High-contrast Theme
- Inverse Headers
- Disabled States
- Selected States

Core navigation icons should normally use:

```text
currentColor
```

---

# Navigation Color Tokens

Recommended token categories:

```text
navigation-icon-default

navigation-icon-hover

navigation-icon-active

navigation-icon-muted

navigation-icon-disabled

navigation-icon-inverse

navigation-icon-alert
```

---

# Accessibility

Every navigation control must be understandable through:

- Accessible Name
- Visible Label where appropriate
- Current-page State
- Expanded State
- Keyboard Navigation
- Visible Focus
- Logical Reading Order

---

# Icon-only Navigation

Icon-only navigation should be limited to:

- Very familiar patterns
- Collapsed sidebars
- Mobile tab bars with labels
- Compact toolbars
- Repeated contexts

Every icon-only destination must include:

- Accessible label
- Tooltip where needed
- Active state
- Sufficient target size

---

# Current Page

Use:

```html
aria-current="page"
```

for the current navigation destination.

For steps, use the appropriate current-state value where supported.

---

# Expandable Navigation

Expandable items must use:

```html
aria-expanded="true"
```

or:

```html
aria-expanded="false"
```

The expansion icon must match the state.

---

# Keyboard Navigation

Navigation components should support:

- Tab
- Shift + Tab
- Enter
- Space where appropriate
- Arrow Keys in menus and trees
- Home and End where appropriate
- Escape for closing menus or drawers

---

# Mobile Drawer Accessibility

A mobile navigation drawer should:

- Move focus inside when opened.
- Provide a close control.
- Trap focus where appropriate.
- Restore focus to the trigger after closing.
- Support Escape.
- Announce its state.
- Prevent background interaction where required.

---

# Navigation Icon Naming

Use semantic lowercase kebab-case.

Recommended patterns:

```text
navigation-{concept}-{variant}
```

Examples:

```text
navigation-home-outline

navigation-back-outline

navigation-forward-outline

navigation-chevron-down-outline

navigation-menu-outline

navigation-external-link-outline
```

---

# Directional Naming

Use explicit direction in names.

Examples:

```text
navigation-arrow-left

navigation-arrow-right

navigation-chevron-up

navigation-chevron-down
```

Avoid vague names such as:

```text
navigation-arrow-1

navigation-next-shape

navigation-direction-icon
```

---

# Navigation Icon Identifier

Recommended pattern:

```text
ICON-NAV-{CONCEPT-CODE}-{NUMBER}
```

Examples:

```text
ICON-NAV-HOME-001

ICON-NAV-BACK-001

ICON-NAV-NEXT-001

ICON-NAV-MENU-001
```

---

# Required Metadata

Every navigation icon should include:

| Field | Description |
|------|-------------|
| Icon ID | Unique icon identifier |
| System Name | Stable machine-readable name |
| Display Name | Human-readable name |
| Primary Meaning | Navigation purpose |
| Navigation Level | Primary, secondary, local, or content |
| Directional | Yes or No |
| RTL Behavior | Mirror or Fixed |
| Allowed Contexts | Approved navigation contexts |
| Restricted Contexts | Contexts where icon must not be used |
| Default Size | Recommended size |
| Variant | Outline, filled, or other |
| Accessible Label | Suggested label |
| Source Path | Master source location |
| Component Name | Code component |
| Version | Icon version |
| Status | Approved, deprecated, or archived |
| Replacement | Replacement icon |
| Owner | Responsible team |
| License | Licensing status |

---

# Metadata Example

```json
{
  "icon_id": "ICON-NAV-BACK-001",
  "system_name": "navigation-back",
  "display_name": "Back",
  "primary_meaning": "Return to the previous logical screen",
  "navigation_level": "Local",
  "directional": true,
  "rtl_behavior": "Mirror",
  "allowed_contexts": [
    "Page Header",
    "Mobile Header",
    "Detail View"
  ],
  "default_size": 20,
  "variant": "outline",
  "version": "1.0.0",
  "status": "Approved"
}
```

---

# Component Naming

Recommended components:

```text
HomeIcon

BackIcon

ForwardIcon

ChevronDownIcon

ChevronRightIcon

MenuIcon

ExternalLinkIcon

FirstPageIcon

LastPageIcon
```

---

# Navigation Component API

Recommended API:

```tsx
type NavigationIconProps = {
  size?: 16 | 20 | 24 | 32;
  direction?: "ltr" | "rtl";
  active?: boolean;
  title?: string;
  className?: string;
};
```

---

# Component Example

```tsx
import { BackIcon } from "@mianx/icons";

export function BackButton() {
  return (
    <button
      type="button"
      aria-label="Go back"
    >
      <BackIcon
        size={20}
        aria-hidden="true"
      />
    </button>
  );
}
```

---

# Source Structure

Recommended structure:

```text
icons/

└── navigation/
    ├── primary/
    ├── secondary/
    ├── directional/
    ├── breadcrumbs/
    ├── pagination/
    ├── tabs/
    ├── sidebar/
    ├── mobile/
    ├── tree/
    ├── workspace/
    ├── metadata/
    ├── exports/
    └── source-files/
```

Create folders only when corresponding assets exist.

---

# File Naming

Pattern:

```text
navigation-{concept}-{variant}-{size}-v{version}.{extension}
```

Examples:

```text
navigation-home-outline-24-v1.svg

navigation-back-outline-20-v1.svg

navigation-chevron-down-outline-16-v1.svg

navigation-menu-outline-24-v1.svg

navigation-external-link-outline-20-v1.svg
```

---

# Navigation Icon Registry

| Icon ID | System Name | Meaning | RTL Behavior | Default Size | Status |
|---------|-------------|---------|--------------|--------------|--------|
| TBD | navigation-home | Open root destination | Fixed | 20 px | Planned |
| TBD | navigation-back | Return to previous logical screen | Mirror | 20 px | Planned |
| TBD | navigation-forward | Move forward | Mirror | 20 px | Planned |
| TBD | navigation-menu | Open primary navigation | Fixed | 24 px | Planned |
| TBD | navigation-chevron-down | Expand or open dropdown | Fixed | 16 px | Planned |
| TBD | navigation-chevron-right | Enter child or show collapsed level | Mirror | 16 px | Planned |
| TBD | navigation-external-link | Open external destination | Fixed | 16 px | Planned |

---

# Navigation Usage Matrix

| Icon | Approved Usage |
|------|----------------|
| Home | Root navigation, breadcrumb root |
| Back | Page-level return |
| Forward | Forward history or explicit next navigation |
| Chevron Down | Dropdown, expanded navigation |
| Chevron Right | Child navigation, collapsed tree item |
| Menu | Mobile or collapsed primary navigation |
| External Link | External destinations |
| First Page | Pagination |
| Last Page | Pagination |
| Expand | Fullscreen or enlarge |
| Collapse | Exit fullscreen or reduce |

---

# Duplicate Prevention

Before creating a new navigation icon:

- Search the icon registry.
- Review directional icons.
- Review UI icons.
- Review action icons.
- Confirm the meaning is navigation-related.
- Confirm an existing icon cannot be reused.
- Check RTL behavior.
- Document the new requirement.

---

# Common Semantic Conflicts

Review carefully:

```text
Back vs Previous

Forward vs Next

Up vs Upload

Down vs Download

Menu vs More Options

Expand Section vs Fullscreen

External Link vs Open in New Tab

Close vs Collapse
```

These concepts must remain distinct.

---

# Approval Workflow

```text
Navigation Requirement Identified

↓

Existing Icon Library Searched

↓

Navigation Meaning Confirmed

↓

Directionality Reviewed

↓

RTL Behavior Defined

↓

Icon Selected or Designed

↓

Component Context Tested

↓

Accessibility Review

↓

Technical Validation

↓

Design-system Approval

↓

Metadata Registered

↓

Component Package Released
```

---

# Approval Roles

| Role | Responsibility |
|------|----------------|
| Product Designer | Defines navigation requirement |
| Icon Designer | Creates or selects icon |
| UX Architect | Confirms navigation meaning |
| Design-system Lead | Ensures visual consistency |
| Accessibility Reviewer | Reviews keyboard and assistive behavior |
| Localization Reviewer | Reviews RTL and localization |
| Frontend Engineer | Validates implementation |
| Asset Manager | Registers and publishes asset |
| Governance Team | Reviews exceptions and audits |

---

# Testing Requirements

Every navigation icon should be tested in:

- Expanded Navigation
- Collapsed Navigation
- Light Theme
- Dark Theme
- High-contrast Mode
- Active State
- Hover State
- Focus State
- Disabled State
- Desktop
- Tablet
- Mobile
- Keyboard Navigation
- Touch Interface
- LTR Layout
- RTL Layout
- Screen-reader Context

---

# Navigation Component Testing

Tests should verify:

- Correct destination
- Correct accessible label
- Correct current-page state
- Correct expanded state
- Correct keyboard behavior
- Correct focus restoration
- Correct RTL mirroring
- Correct selected state
- Correct disabled behavior
- Correct tooltip behavior

---

# Visual Regression Testing

Automated tests should detect:

- Incorrect mirroring
- Direction changes
- Alignment shifts
- Stroke changes
- View-box changes
- Padding changes
- Active-state failures
- Collapsed-state failures
- Clipping
- Theme contrast issues

---

# Performance

Navigation icons should support:

- Tree-shaken imports
- Small bundles
- Fast rendering
- Reusable components
- Minimal path complexity
- Efficient mobile delivery
- Theme inheritance
- Controlled RTL transformation

---

# Deprecation

When a navigation icon is deprecated:

- Mark it in the registry.
- Identify the replacement.
- Define migration deadline.
- Add package warnings.
- Update navigation components.
- Track active usage.
- Preserve historical assets.
- Document RTL migration impact.

---

# Breaking Changes

Breaking changes may include:

- Meaning change
- Direction change
- System-name change
- RTL behavior change
- Component removal
- Default-size change
- Active-state behavior change
- Expanded-state behavior change

Breaking changes require migration notes and interface testing.

---

# AI Workforce Usage

AI agents may:

- Select approved navigation icons.
- Detect directional conflicts.
- Suggest RTL behavior.
- Validate icon naming.
- Detect duplicate meanings.
- Generate metadata drafts.
- Detect deprecated usage.
- Generate navigation usage reports.
- Validate component mappings.

AI agents must not:

- Reverse icon meaning without approval.
- Ignore RTL requirements.
- Publish unapproved icons.
- replace navigation patterns silently.
- use action icons as navigation without review.
- remove accessible labels.
- approve their own changes.

---

# Automation Requirements

The icon platform should eventually support:

- RTL metadata validation
- Automatic mirroring tests
- Directional-name validation
- Navigation usage mapping
- Duplicate detection
- SVG security scanning
- Component generation
- Accessibility-label suggestions
- Current-page state testing
- Expanded-state testing
- Deprecated-usage detection
- Visual regression testing
- Package release manifests

---

# Quality Checklist

Before approving a navigation icon:

- [ ] Navigation requirement documented
- [ ] Existing library searched
- [ ] Duplicate check completed
- [ ] Navigation meaning confirmed
- [ ] Navigation level documented
- [ ] Directionality documented
- [ ] RTL behavior documented
- [ ] Allowed contexts documented
- [ ] Restricted contexts documented
- [ ] Icon ID assigned
- [ ] System name approved
- [ ] Visual family verified
- [ ] Grid verified
- [ ] Stroke verified
- [ ] Optical alignment reviewed
- [ ] Small-size test completed
- [ ] Active state tested
- [ ] Collapsed state tested
- [ ] Light-theme test completed
- [ ] Dark-theme test completed
- [ ] High-contrast test completed
- [ ] Keyboard behavior tested
- [ ] Touch behavior tested
- [ ] Accessible label documented
- [ ] SVG security validation passed
- [ ] Component generated
- [ ] Metadata completed
- [ ] Design-system approval recorded

---

# Navigation Review Checklist

Before releasing a navigation component:

- [ ] Correct icon selected
- [ ] Destination is accurate
- [ ] Icon meaning matches navigation behavior
- [ ] Text label included where required
- [ ] Accessible name included
- [ ] Current-page state implemented
- [ ] Expanded state implemented
- [ ] Focus state visible
- [ ] Keyboard navigation verified
- [ ] Touch target verified
- [ ] Collapsed mode verified
- [ ] Mobile mode verified
- [ ] RTL mode verified
- [ ] Tooltip added where required
- [ ] Deprecated icon not used

---

# Audit Requirements

Navigation icon audits should verify:

- Directional consistency
- RTL correctness
- Active-state clarity
- Current-page semantics
- Collapsed-navigation accessibility
- Missing labels
- Small touch targets
- Mixed icon families
- Duplicate meanings
- Incorrect chevron usage
- Menu and overflow confusion
- Deprecated icons
- Missing metadata
- Unsafe SVG files

Recommended frequency:

```text
Monthly Automated Validation

Quarterly Navigation Audit

Annual Directional-system Review
```

---

# Common Mistakes

Avoid:

- Using the same icon for back and previous without context.
- Using upload icons for up-level navigation.
- Using menu and more-options icons interchangeably.
- Failing to mirror directional icons in RTL layouts.
- Mirroring icons that should remain fixed.
- Using icon color alone for active state.
- Removing labels from primary mobile navigation.
- Using chevrons and carets inconsistently.
- Making collapsed navigation inaccessible.
- Using tiny touch targets.
- Hiding current-page state from assistive technology.
- Using close icons for collapse behavior.
- Publishing navigation icons without metadata.
- Changing directional meaning between products.

---

# Related Documents

- `README.md`
- `icon-system.md`
- `ui-icons.md`
- `action-icons.md`
- `status-icons.md`
- `department-icons.md`
- `ai-workforce-icons.md`
- `file-and-content-icons.md`
- `icon-exports.md`
- `icon-source-files.md`
- `../assets-guidelines.md`
- `../naming-conventions.md`
- `../branding/typography.md`
- `../design-system/README.md`
- `../../15-ui-ux/README.md`
- `../../46-enterprise-quality/README.md`

---

# Best Practices

- Use navigation icons only for movement and location.
- Keep directional meanings stable.
- Distinguish back, previous, up, and undo.
- Pair primary navigation icons with labels.
- Use one consistent menu pattern.
- Make active navigation clear without relying only on color.
- Define RTL behavior for every directional icon.
- Maintain accessible current-page and expanded states.
- Use larger targets for touch interfaces.
- Test collapsed and mobile navigation carefully.
- Generate navigation components from approved sources.
- Keep design, metadata, accessibility, localization, and code synchronized.

---

# Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-07-10 | Initial enterprise navigation icon standard established |

---

# Next Document

```text
docs/
└── 18-assets/
    └── icons/
        └── action-icons.md
```

---

**End of Document**