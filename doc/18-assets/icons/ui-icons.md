# UI Icons

> Enterprise standards for selecting, designing, implementing, validating, and governing user-interface icons across the Mianx.ai ecosystem.

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | UI Icons |
| Folder | docs/18-assets/icons |
| File Name | ui-icons.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Design System, Product Design & Frontend Platform Department |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

This document defines the official standards for icons used inside Mianx.ai user interfaces.

It ensures that UI icons remain:

- Consistent
- Understandable
- Accessible
- Reusable
- Theme-aware
- Technically reliable
- Semantically stable
- Easy to discover
- Easy to maintain

These standards apply to every interface where icons support interaction, information, navigation, status, or content structure.

---

# Objectives

- Standardize UI icon usage.
- Prevent inconsistent icon meanings.
- Improve interface clarity.
- Support accessible interactions.
- Reduce duplicate icons.
- Maintain one reusable icon library.
- Define component behavior.
- Support web and mobile applications.
- Enable automated validation.
- Preserve semantic and visual consistency.

---

# Scope

These standards apply to icons used in:

- Buttons
- Icon Buttons
- Inputs
- Forms
- Select Menus
- Dropdowns
- Tables
- Lists
- Cards
- Modals
- Drawers
- Toolbars
- Tabs
- Accordions
- Filters
- Search Interfaces
- Dashboards
- Settings
- Notifications
- Toasts
- Empty States
- Date Pickers
- File Uploads
- Pagination
- Command Palettes
- Context Menus
- Data Visualizations
- Mobile Interfaces
- Administrative Interfaces

---

# Core Principle

A UI icon must communicate a clear interface concept.

Every icon should answer at least one question:

- What action will happen?
- What object is represented?
- What state is active?
- What information is available?
- Where will the user navigate?
- What requires attention?

Icons must not be used only to make interfaces appear more decorative.

---

# UI Icon Categories

The UI icon system includes:

- Utility Icons
- Input Icons
- Form Icons
- Button Icons
- Menu Icons
- Table Icons
- Filter Icons
- Search Icons
- Settings Icons
- Modal Icons
- Dashboard Icons
- Data Icons
- Communication Icons
- User Icons
- Date and Time Icons
- File Icons
- Layout Icons
- Visibility Icons
- Help Icons
- Feedback Icons

---

# Utility Icons

Utility icons support common interface behavior.

Examples:

- Search
- Settings
- Help
- Information
- More Options
- Refresh
- Copy
- Download
- Upload
- Print
- Share
- External Link
- Expand
- Collapse
- Fullscreen

---

# Input Icons

Input icons may communicate:

- Field type
- Input purpose
- Current state
- Validation
- Visibility control
- Clear action

Examples:

- Email
- Phone
- Password
- Calendar
- Search
- Location
- Currency
- Link
- User
- Lock

---

# Form Icons

Form icons may support:

- Validation
- Help
- Required Information
- Date Selection
- File Attachment
- Password Visibility
- Clear Input
- Reset
- Submission

Icons must not replace form labels.

---

# Button Icons

Icons may be used in:

- Text Buttons
- Icon-only Buttons
- Split Buttons
- Toolbar Buttons
- Floating Action Buttons
- Destructive Buttons
- Toggle Buttons

Every button icon must match the button action.

---

# Text and Icon Buttons

Recommended structure:

```text
[Icon] Button Label
```

Examples:

```text
[+] Add User

[Download] Export Report

[Save] Save Changes
```

The icon should support the text rather than duplicate unrelated meaning.

---

# Icon-only Buttons

Icon-only buttons may be used where:

- Space is limited.
- The icon is universally understood.
- The control is repeated frequently.
- An accessible label exists.
- A tooltip is available where useful.

Examples:

- Close
- Search
- More Options
- Previous
- Next
- Expand
- Collapse

---

# Icon-only Button Requirements

Every icon-only button must include:

- Accessible name
- Visible focus state
- Keyboard support
- Sufficient target size
- Hover state
- Pressed state
- Disabled state
- Tooltip where meaning may be unclear

Example:

```tsx
<button
  type="button"
  aria-label="Close dialog"
>
  <CloseIcon aria-hidden="true" />
</button>
```

---

# Destructive UI Icons

Destructive actions may include:

- Delete
- Remove
- Revoke
- Disconnect
- Terminate
- Reset
- Clear All

These actions must use:

- Clear icon meaning
- Destructive color token
- Text label where practical
- Confirmation for high-impact actions
- Accessible warning language

Do not use the delete icon for archive actions.

---

# Add and Create

Recommended meanings:

| Icon | Meaning |
|------|---------|
| Plus | Add or create |
| User Plus | Add user |
| Folder Plus | Create folder |
| File Plus | Create document |
| Link Plus | Add connection |

Use the generic plus icon only where context is already clear.

---

# Edit and Configure

Recommended meanings:

| Icon | Meaning |
|------|---------|
| Pencil | Edit content |
| Sliders | Adjust settings or filters |
| Gear | System or configuration settings |
| Wrench | Technical maintenance |
| More Options | Additional actions |

Do not use the gear icon for every type of editing action.

---

# Save Icons

The save icon may be used where users explicitly save changes.

However, in autosave interfaces:

- Show autosave status.
- Avoid unnecessary save buttons.
- Use text status such as `Saved`.
- Do not display a misleading save icon.

---

# Close, Cancel, and Remove

These concepts must remain distinct.

| Concept | Recommended Treatment |
|---------|-----------------------|
| Close | X icon |
| Cancel | Text label or X where context is clear |
| Remove Item | Minus or X with clear label |
| Delete | Trash icon |
| Clear Input | Small X inside field |

The same X icon must not communicate destructive deletion without context.

---

# Search Interface Icons

Search interfaces may include:

- Search
- Clear Search
- Voice Search
- Search History
- Advanced Search
- Saved Search
- Search Filters

The search icon should consistently represent search throughout the platform.

---

# Search Input Pattern

Recommended structure:

```text
[Search Icon] Search field [Clear Icon]
```

Requirements:

- Search icon may be decorative.
- Clear icon must be interactive and labelled.
- Placeholder must not replace the field label where a visible label is required.
- Keyboard interaction must be supported.

---

# Filter Icons

Filter-related icons may represent:

- Open Filters
- Active Filters
- Clear Filters
- Advanced Filters
- Sort
- Group
- View Options

An active-filter state should include more than a color change.

Examples:

- Badge count
- Filled variant
- Text label
- Active background

---

# Sort Icons

Sorting icons should clearly represent:

- Sort Ascending
- Sort Descending
- Unsorted
- Custom Sort
- Sort by Field

The icon must reflect the current state, not only the available action.

---

# Table Icons

Table interfaces may use icons for:

- Sort
- Filter
- Edit Row
- Delete Row
- Expand Row
- View Details
- Copy Value
- Download
- Column Settings
- Pin Column
- Row Selection

Table actions should remain visually compact but accessible.

---

# Table Action Rules

- Repeated row actions should use one consistent pattern.
- High-frequency actions may remain visible.
- Low-frequency actions should move into a menu.
- Destructive actions should not be placed too close to common actions.
- Tooltips should explain unfamiliar icons.
- Keyboard navigation must remain available.

---

# Pagination Icons

Recommended pagination icons:

- Previous
- Next
- First Page
- Last Page

Directional icons must support RTL interfaces where appropriate.

Disabled pagination controls must remain understandable.

---

# Menu Icons

Menus may use icons for:

- Menu Trigger
- More Options
- Submenu
- Selected Item
- Checkmark
- Radio Selection
- External Link
- Keyboard Shortcut Indicator

Icons inside menus should align consistently.

---

# Overflow Menu

The overflow icon may use:

```text
Horizontal Ellipsis
```

or:

```text
Vertical Ellipsis
```

The selected pattern must remain consistent within each platform.

---

# Dropdown Icons

Dropdown and select controls should use consistent indicators.

Recommended meanings:

| Icon | Meaning |
|------|---------|
| Chevron Down | Open dropdown |
| Chevron Up | Close expanded dropdown |
| Check | Selected option |
| X | Clear selection |
| Search | Search options |

---

# Modal Icons

Modal interfaces may include:

- Close
- Information
- Warning
- Error
- Success
- Expand
- Minimize
- Help

The close icon should appear in a consistent position across the application.

---

# Dialog Severity Icons

Dialogs may use semantic icons for:

- Information
- Confirmation
- Warning
- Error
- Destructive Confirmation

The icon, heading, and message must communicate the same severity.

---

# Drawer Icons

Drawers may include:

- Close
- Back
- Expand
- Collapse
- Pin
- Unpin

The close behavior must remain consistent with modal behavior.

---

# Tabs

Tabs may include icons when they improve recognition.

Examples:

```text
[Overview Icon] Overview

[Users Icon] Members

[Settings Icon] Settings
```

Do not use icons in some tabs and omit them randomly from others.

---

# Accordion Icons

Recommended accordion indicators:

- Chevron Down
- Chevron Up
- Plus and Minus, where formally approved

The icon should accurately represent expanded or collapsed state.

---

# Toggle Icons

Toggle buttons may represent:

- Favorite
- Bookmark
- Visibility
- Mute
- Pin
- Lock
- Grid View
- List View

The current state must remain visible.

---

# Toggle State Rules

A toggle icon should indicate:

- Current state
- Available action
- Selection status
- Accessible pressed state

Example:

```html
<button
  aria-pressed="true"
  aria-label="Remove from favorites"
>
</button>
```

---

# Visibility Icons

Recommended meanings:

| Icon | Meaning |
|------|---------|
| Eye | Visible |
| Eye Off | Hidden |
| Lock | Restricted |
| Unlock | Unrestricted |
| Shield | Protected |

Visibility icons must not be used interchangeably with access-control icons.

---

# Password Visibility

Password fields may use:

- Eye to show password
- Eye Off to hide password

The control must include an accessible label matching the action.

Examples:

```text
Show password

Hide password
```

---

# User and Account Icons

User-related icons may represent:

- User
- User Group
- Add User
- Remove User
- User Settings
- User Verification
- Organization
- Team
- Profile
- Account

Do not use the same icon for user, employee, customer, and AI agent where distinction is important.

---

# Settings Icons

Settings interfaces may distinguish:

- General Settings
- Account Settings
- Security Settings
- Notification Settings
- Integration Settings
- Billing Settings
- Developer Settings

Use supporting labels because the gear icon alone is often too broad.

---

# Dashboard Icons

Dashboard icons may represent:

- Overview
- Analytics
- Performance
- Revenue
- Tasks
- Projects
- Agents
- Alerts
- Activity
- Reports

Dashboard icons should support fast recognition without becoming decorative illustrations.

---

# KPI Icons

KPI cards may use icons for:

- Revenue
- Users
- Growth
- Completion
- Errors
- Performance
- Cost
- Availability

The icon must not replace the KPI title or value.

---

# Date and Time Icons

Date and time icons may include:

- Calendar
- Clock
- Schedule
- Recurring
- Deadline
- Reminder
- Time Zone
- History

A clock icon should not be used for every date-related concept.

---

# Calendar Controls

Calendar interfaces may use:

- Previous Month
- Next Month
- Today
- Date Picker
- Month View
- Week View
- Day View
- Schedule View

Directional behavior must be accessible and support localization.

---

# File Upload Icons

File-upload interfaces may use:

- Upload
- File Add
- Cloud Upload
- Attachment
- Image Upload
- Import

The icon should match the actual action.

For example:

```text
Upload = send a local file to the system

Import = bring structured data into a workflow
```

---

# Download and Export

Download and export are different concepts.

| Concept | Meaning |
|---------|---------|
| Download | Save a file locally |
| Export | Generate or transform data into another format |
| Share | Provide access or send a link |
| Copy | Copy content to clipboard |

Use distinct labels and icons where workflows differ.

---

# Communication Icons

Communication UI may use:

- Message
- Chat
- Email
- Mention
- Comment
- Reply
- Forward
- Announcement
- Call
- Video Call

Each concept should remain consistent throughout the application.

---

# Notification Icons

Notification interfaces may use:

- Bell
- Bell Off
- Reminder
- Alert
- Announcement
- Mention
- Message
- Escalation

Notification type should be clarified through text.

---

# Help Icons

Help interfaces may use:

- Question Mark
- Information
- Documentation
- Support
- Tutorial
- Feedback

The information icon should not replace the help icon when the user is expected to take an action.

---

# Feedback Icons

Feedback icons may represent:

- Like
- Dislike
- Rating
- Report
- Suggestion
- Bug
- Success Feedback
- Error Feedback

Feedback controls should include clear text where intent may be ambiguous.

---

# Empty-state Icons

Empty-state icons should:

- Support the message.
- Remain simple.
- Use larger approved sizes.
- Avoid looking like error states unless an error occurred.
- Use appropriate text and action.

Examples:

- No Search Results
- No Tasks
- No Projects
- No Notifications
- No Files

---

# Loading Icons

Loading UI may use:

- Spinner
- Progress Circle
- Sync
- Refresh
- Processing Indicator

Loading icons must include accessible status text.

Example:

```html
<div role="status">
  <SpinnerIcon aria-hidden="true" />
  <span>Loading projects</span>
</div>
```

---

# Success Icons

Success icons should indicate:

- Completed Action
- Valid Input
- Successful Submission
- Approved Record
- Verified State

A success icon must not be used for ordinary selection.

---

# Warning Icons

Warnings indicate potential risk requiring attention.

Examples:

- Unsaved Changes
- Expiring Access
- Partial Failure
- Configuration Risk
- Limited Availability

Warnings should not be styled identically to errors.

---

# Error Icons

Error icons indicate:

- Failed Operation
- Invalid Input
- Unavailable Service
- Permission Failure
- Broken Integration

Error messages must include actionable text.

---

# Information Icons

Information icons may support:

- Context
- Explanation
- Additional Detail
- Non-critical Notice
- Metadata

An information icon should not communicate warning or failure.

---

# Icon Placement

UI icon placement should follow component standards.

Common placements:

- Leading Icon
- Trailing Icon
- Standalone Icon
- Status Icon
- Badge Icon
- Container Icon

---

# Leading Icons

Leading icons may support:

- Input meaning
- Button action
- Navigation identity
- List category
- Menu item recognition

Maintain consistent spacing between the icon and label.

---

# Trailing Icons

Trailing icons may represent:

- Dropdown
- External Link
- Clear Input
- Navigation Direction
- Status
- Shortcut
- Secondary Action

Trailing icons should not compete with the main action.

---

# Icon Alignment

Icons should align consistently with:

- Text baselines
- Control centers
- Input heights
- Button containers
- Table rows
- Menu rows
- Cards

Avoid manual one-off positioning.

---

# Icon and Label Spacing

Use approved spacing tokens.

Recommended patterns may include:

```text
4 px — compact inline use

6 px — dense control

8 px — standard button or menu item

12 px — large card or feature item
```

The final values must come from the design system.

---

# Standard Sizes

Recommended UI icon sizes:

| Context | Icon Size |
|---------|-----------|
| Dense Metadata | 12–16 px |
| Compact Table Action | 16 px |
| Small Button | 16 px |
| Standard Input | 20 px |
| Standard Button | 20 px |
| Navigation Item | 20–24 px |
| Large Button | 24 px |
| Empty State | 32–64 px |

---

# Icon Container Sizes

Recommended control relationships:

| Control | Icon | Minimum Target |
|---------|------|----------------|
| Compact Icon Button | 16 px | 32 px |
| Standard Icon Button | 20 px | 40 px |
| Large Icon Button | 24 px | 44–48 px |

Product accessibility standards may require larger targets.

---

# Responsive Behavior

UI icons should remain usable across:

- Desktop
- Tablet
- Mobile
- Large Display
- Touch Interface
- Keyboard Interface

Mobile layouts may:

- Increase target size.
- Simplify labels.
- Collapse low-priority actions.
- Move actions into overflow menus.

The icon meaning must remain unchanged.

---

# Theme Behavior

UI icons must support:

- Light Theme
- Dark Theme
- High-contrast Theme
- Disabled State
- Selected State
- Inverse Context

Reusable UI icons should normally use:

```text
currentColor
```

---

# Semantic Color Tokens

Recommended categories:

```text
icon-color-default

icon-color-muted

icon-color-interactive

icon-color-disabled

icon-color-success

icon-color-warning

icon-color-error

icon-color-info

icon-color-inverse
```

Hardcoded UI icon colors should be avoided.

---

# State Matrix

Each interactive UI icon should be tested in:

| State | Requirement |
|-------|-------------|
| Default | Clear and readable |
| Hover | Interaction is visible |
| Focus | Keyboard focus is visible |
| Active | Current action state is clear |
| Selected | Selection is distinguishable |
| Disabled | Unavailable but readable |
| Loading | Progress is understandable |
| Error | Failure is clearly communicated |

---

# Accessibility

Every UI icon must be classified as:

- Decorative
- Informative
- Interactive
- Status-related

The implementation depends on this classification.

---

# Decorative Icons

Decorative icons:

- Add no independent meaning.
- Should be hidden from assistive technology.
- Should not receive keyboard focus.

Example:

```tsx
<EmailIcon aria-hidden="true" />
```

---

# Informative Icons

Informative icons must have:

- Visible supporting text, or
- Accessible text equivalent.

Example:

```tsx
<span>
  <WarningIcon aria-hidden="true" />
  Payment method expires soon
</span>
```

---

# Interactive Icons

Interactive icons must be inside an accessible control.

Incorrect:

```tsx
<DeleteIcon onClick={handleDelete} />
```

Correct:

```tsx
<button
  type="button"
  aria-label="Delete project"
  onClick={handleDelete}
>
  <DeleteIcon aria-hidden="true" />
</button>
```

---

# Status Icons

Status icons must include readable status text in critical workflows.

Example:

```text
[Warning Icon] Degraded
```

Do not present a colored icon without a textual status where decisions depend on it.

---

# Tooltips

Tooltips should:

- Explain unfamiliar actions.
- Appear on keyboard focus.
- Appear on pointer hover.
- Use concise labels.
- Avoid containing essential instructions only.
- Not replace accessible names.

---

# Focus Management

Icon controls must:

- Receive focus in logical order.
- Display visible focus.
- Support Enter or Space where applicable.
- Support Escape for dismiss actions.
- Avoid keyboard traps.

---

# Touch Interaction

Touch controls should:

- Provide sufficient target size.
- Maintain spacing between destructive and common actions.
- Avoid requiring hover.
- Provide visible pressed feedback.
- Prevent accidental activation.

---

# RTL Behavior

UI icons requiring mirroring may include:

- Back
- Forward
- Previous
- Next
- Undo
- Redo
- Expand Side Panel
- Collapse Side Panel
- Directional Breadcrumbs

Icons normally not mirrored:

- Search
- Calendar
- Clock
- Settings
- Status Symbols
- Brand Icons
- Media Playback Icons unless product requirements specify otherwise

---

# Localization

Icons must not depend on language-specific assumptions where the meaning could change.

Examples:

- Avoid letter-based icons for global interfaces.
- Avoid culturally ambiguous symbols.
- Use labels for unfamiliar concepts.
- Test directional icons in RTL layouts.
- Localize tooltip and accessible-label text.

---

# UI Icon Naming

Use semantic lowercase kebab-case.

Recommended pattern:

```text
ui-{concept}-{variant}
```

Examples:

```text
ui-search-outline

ui-settings-outline

ui-close-outline

ui-help-circle-outline

ui-more-horizontal-outline
```

Where an icon already belongs to a more specific category, use that category.

Examples:

```text
action-delete-outline

navigation-home-outline

status-warning-filled
```

---

# UI Icon Identifier

Recommended pattern:

```text
ICON-UI-{CONCEPT-CODE}-{NUMBER}
```

Examples:

```text
ICON-UI-SEARCH-001

ICON-UI-SETTINGS-001

ICON-UI-CLOSE-001
```

---

# Required Metadata

Every UI icon should include:

| Field | Description |
|------|-------------|
| Icon ID | Unique icon identifier |
| System Name | Stable machine-readable name |
| Display Name | Human-readable name |
| Category | UI, Action, Navigation, Status, or other |
| Primary Meaning | Main semantic purpose |
| Allowed Contexts | Approved usage contexts |
| Restricted Contexts | Contexts where the icon must not be used |
| Keywords | Search synonyms |
| Variant | Outline, filled, or other |
| Default Size | Recommended size |
| RTL Behavior | Mirror or fixed |
| Accessibility Label | Suggested label where applicable |
| Source Path | Approved source location |
| Component Name | Code component name |
| Version | Current version |
| Status | Approved, deprecated, or archived |
| Replacement | Replacement icon if applicable |
| Owner | Responsible team |
| License | Licensing status |

---

# Metadata Example

```json
{
  "icon_id": "ICON-UI-SEARCH-001",
  "system_name": "ui-search",
  "display_name": "Search",
  "category": "UI",
  "primary_meaning": "Search available content",
  "allowed_contexts": [
    "Search Input",
    "Toolbar",
    "Navigation"
  ],
  "keywords": [
    "search",
    "find",
    "lookup"
  ],
  "variant": "outline",
  "default_size": 20,
  "rtl_behavior": "fixed",
  "version": "1.0.0",
  "status": "Approved"
}
```

---

# Component Naming

Recommended component names:

```text
SearchIcon

SettingsIcon

CloseIcon

HelpCircleIcon

MoreHorizontalIcon
```

Component names should remain stable even when internal SVG geometry changes.

---

# Component API

Recommended UI icon component API:

```tsx
type UIIconProps = {
  size?: 16 | 20 | 24 | 32;
  title?: string;
  className?: string;
  variant?: "outline" | "filled";
};
```

---

# Component Example

```tsx
import { SearchIcon } from "@mianx/icons";

export function SearchButton() {
  return (
    <button
      type="button"
      aria-label="Search"
    >
      <SearchIcon
        size={20}
        aria-hidden="true"
      />
    </button>
  );
}
```

---

# Source Structure

Recommended UI icon source structure:

```text
icons/

└── ui/
    ├── inputs/
    ├── forms/
    ├── buttons/
    ├── menus/
    ├── tables/
    ├── filters/
    ├── search/
    ├── modals/
    ├── dashboards/
    ├── settings/
    ├── communication/
    ├── date-time/
    ├── metadata/
    ├── exports/
    └── source-files/
```

Create folders only when corresponding assets exist.

---

# File Naming

General pattern:

```text
ui-{concept}-{variant}-{size}-v{version}.{extension}
```

Examples:

```text
ui-search-outline-24-v1.svg

ui-settings-outline-20-v1.svg

ui-close-outline-16-v1.svg

ui-help-circle-filled-20-v1.svg
```

Avoid:

```text
search-new.svg

settings-final.svg

close-icon-fixed-2.svg

ui-icon-latest.svg
```

---

# UI Icon Registry

Maintain an official UI icon registry.

| Icon ID | System Name | Meaning | Default Size | Version | Status |
|---------|-------------|---------|--------------|---------|--------|
| TBD | ui-search | Search content | 20 px | TBD | Planned |
| TBD | ui-settings | Open settings | 20 px | TBD | Planned |
| TBD | ui-close | Close interface | 20 px | TBD | Planned |
| TBD | ui-help | Open help | 20 px | TBD | Planned |
| TBD | ui-more-horizontal | Open additional actions | 20 px | TBD | Planned |

---

# UI Icon Usage Matrix

Maintain a component usage map.

| Icon | Approved Components |
|------|---------------------|
| Search | Search Input, Toolbar, Command Palette |
| Close | Modal, Drawer, Tag, Alert |
| Settings | Navigation, Account Menu, Toolbar |
| More Options | Table Row, Card, Toolbar |
| Help | Form Help, Support Menu, Documentation Link |
| Filter | Search Results, Data Table, Dashboard |
| Calendar | Date Input, Schedule, Deadline |
| Eye | Password Visibility, Content Visibility |
| Copy | Code Block, Record ID, Share Interface |
| Download | File Row, Report Action, Export Result |

---

# Icon Reuse Policy

Before creating a new UI icon:

- Search the icon registry.
- Search synonyms.
- Review existing action icons.
- Review navigation icons.
- Review status icons.
- Check the approved external library.
- Confirm the new meaning is distinct.
- Document why an existing icon cannot be reused.

---

# Duplicate Prevention

Potential duplicates include:

```text
settings

configuration

preferences

options
```

These may represent the same concept and should be reviewed before creating separate icons.

---

# Custom UI Icon Request

A request must include:

- Request ID
- Requested Meaning
- Intended Component
- Intended User Action
- Required Sizes
- Required Variants
- Existing Icons Reviewed
- Accessibility Requirement
- Product Owner
- Target Release
- Business Justification

---

# Approval Workflow

```text
UI Requirement Identified

↓

Existing Icon Library Searched

↓

Semantic Meaning Confirmed

↓

Icon Selected or Designed

↓

Component Context Reviewed

↓

Small-size Testing

↓

Accessibility Review

↓

Technical Validation

↓

Design-system Approval

↓

Metadata Registered

↓

Component Package Updated

↓

Production Release
```

---

# Approval Roles

| Role | Responsibility |
|------|----------------|
| Product Designer | Defines interface requirement |
| Icon Designer | Creates or adapts icon |
| Design-system Lead | Maintains visual and semantic consistency |
| Accessibility Reviewer | Reviews accessible interaction |
| Frontend Engineer | Validates component implementation |
| Product Owner | Confirms business meaning |
| Asset Manager | Registers and releases asset |
| Governance Team | Reviews exceptions and audits |

---

# Testing Requirements

Every UI icon must be tested in:

- Default State
- Hover State
- Focus State
- Active State
- Selected State
- Disabled State
- Light Theme
- Dark Theme
- High-contrast Mode
- 16 px
- 20 px
- 24 px
- Keyboard Navigation
- Touch Interface
- RTL Layout where applicable
- Screen-reader Context

---

# Component Testing

Tests should verify:

- Correct accessible name
- Decorative icon handling
- Keyboard activation
- Focus visibility
- Disabled behavior
- Tooltip behavior
- Size behavior
- Variant rendering
- Theme inheritance
- RTL transformation where required

---

# Visual Regression Testing

Automated tests should detect:

- Path changes
- Alignment shifts
- Stroke changes
- View-box changes
- Color changes
- Padding changes
- Clipping
- Missing icon elements
- Incorrect active variants

---

# SVG Validation

Every production SVG must be checked for:

- Correct view box
- Correct stroke or fill
- No hardcoded unapproved colors
- No scripts
- No event handlers
- No external resources
- No hidden content
- No unnecessary metadata
- Correct path structure
- Correct file name

---

# Performance

UI icons should support:

- Tree-shaken imports
- Small bundles
- Reusable components
- Minimal path complexity
- Fast rendering
- Efficient caching
- No unnecessary raster assets

---

# Usage Monitoring

The organization should track:

- Most-used icons
- Unused custom icons
- Duplicate icon meanings
- Deprecated icon usage
- Incorrect semantic usage
- Accessibility issues
- Bundle impact
- Missing icons

---

# Deprecation

When a UI icon is deprecated:

- Mark it in the registry.
- Identify a replacement.
- Add package warnings.
- Define a migration deadline.
- Update component documentation.
- Track active usage.
- Preserve the historic source.
- Remove only through controlled release.

---

# Breaking Changes

Breaking UI icon changes may include:

- System-name change
- Meaning change
- Component removal
- Default-size change
- Default-variant change
- Accessibility behavior change
- Visual geometry change affecting alignment

Breaking changes require migration notes.

---

# AI Workforce Usage

AI agents may:

- Search UI icons by meaning.
- Suggest approved icons for components.
- Detect duplicate concepts.
- Validate file naming.
- Generate metadata drafts.
- Generate component mappings.
- Detect deprecated usage.
- Produce icon usage reports.
- Recommend accessible labels.

AI agents must not:

- Publish unapproved icons.
- Change icon meaning.
- Replace production icons silently.
- Use decorative icons as actionable controls.
- bypass accessibility review.
- create duplicate concepts.
- modify third-party brand icons.
- approve their own changes.

---

# Automation Requirements

The icon platform should eventually support:

- Semantic icon search
- Component usage mapping
- Duplicate detection
- SVG security scanning
- View-box validation
- Stroke validation
- Color-token validation
- Component generation
- Accessibility-label suggestions
- Deprecated-usage detection
- Visual regression testing
- Package release manifests
- Bundle-size reporting
- RTL validation

---

# Quality Checklist

Before approving a UI icon:

- [ ] UI requirement documented
- [ ] Existing library searched
- [ ] Duplicate check completed
- [ ] Primary meaning confirmed
- [ ] Allowed contexts documented
- [ ] Restricted contexts documented
- [ ] Icon ID assigned
- [ ] System name approved
- [ ] Visual family verified
- [ ] Grid verified
- [ ] Stroke verified
- [ ] Optical balance reviewed
- [ ] Small-size testing completed
- [ ] Light-theme test completed
- [ ] Dark-theme test completed
- [ ] High-contrast test completed
- [ ] Interactive behavior documented
- [ ] Accessible label documented
- [ ] Tooltip requirement reviewed
- [ ] RTL behavior documented
- [ ] SVG security scan passed
- [ ] Component generated
- [ ] Metadata completed
- [ ] Source file preserved
- [ ] Design-system approval recorded
- [ ] Production package updated

---

# UI Review Checklist

Before releasing a UI component using icons:

- [ ] Correct icon selected
- [ ] Icon meaning matches action
- [ ] Text label included where required
- [ ] Accessible name included
- [ ] Decorative icon hidden correctly
- [ ] Target size verified
- [ ] Keyboard support verified
- [ ] Focus state verified
- [ ] Hover state verified
- [ ] Disabled state verified
- [ ] Destructive action reviewed
- [ ] Mobile interaction tested
- [ ] RTL behavior tested where required
- [ ] Theme behavior verified
- [ ] Deprecated icon not used

---

# Audit Requirements

UI icon audits should verify:

- Duplicate meanings
- Inconsistent icon families
- Incorrect icon usage
- Missing labels
- Missing tooltips
- Inaccessible icon buttons
- Small interaction targets
- Hardcoded colors
- Theme failures
- RTL failures
- Deprecated icons
- Missing metadata
- Unsafe SVG files
- Unapproved custom icons
- Incorrect destructive actions

Recommended frequency:

```text
Monthly Automated Validation

Quarterly Product Interface Audit

Annual UI Icon-system Review
```

---

# Common Mistakes

Avoid:

- Using icons without clear meaning.
- Replacing form labels with icons.
- Using icon-only buttons without accessible names.
- Using delete icons for archive actions.
- Mixing multiple visual families.
- Using hardcoded colors.
- Making touch targets too small.
- Using the same icon for different actions.
- Showing status only through color.
- Scaling detailed icons below their supported size.
- Using decorative icons in every interface element.
- Creating duplicate icons without searching.
- Ignoring dark-theme behavior.
- Ignoring RTL behavior.
- Publishing unvalidated SVG files.

---

# Related Documents

- `README.md`
- `icon-system.md`
- `navigation-icons.md`
- `action-icons.md`
- `status-icons.md`
- `department-icons.md`
- `ai-workforce-icons.md`
- `file-and-content-icons.md`
- `icon-exports.md`
- `icon-source-files.md`
- `../assets-guidelines.md`
- `../naming-conventions.md`
- `../branding/color-palette.md`
- `../branding/typography.md`
- `../design-system/README.md`
- `../../15-ui-ux/README.md`
- `../../46-enterprise-quality/README.md`

---

# Best Practices

- Choose icons according to meaning, not decoration.
- Pair unfamiliar icons with text.
- Keep icon-only controls accessible.
- Use one consistent visual family.
- Maintain stable icon meanings.
- Distinguish delete, remove, archive, and close.
- Use design tokens for color, size, and spacing.
- Test every icon in light, dark, and high-contrast modes.
- Use larger interaction targets than visual icon sizes.
- Search the registry before requesting a custom icon.
- Generate UI components from approved SVG sources.
- Keep design, metadata, code, accessibility, and usage records synchronized.

---

# Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-07-10 | Initial enterprise UI icon standard established |

---

# Next Document

```text
docs/
└── 18-assets/
    └── icons/
        └── navigation-icons.md
```

---

**End of Document**