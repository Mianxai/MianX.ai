# Icon System

> Enterprise visual construction, behavior, accessibility, delivery, and governance standards for icons across the Mianx.ai ecosystem.

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | Icon System |
| Folder | docs/18-assets/icons |
| File Name | icon-system.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Design System, Product Design & Frontend Platform Department |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

This document defines the core design foundation for every icon used across the Mianx.ai ecosystem.

It establishes shared rules for:

- Grid Construction
- Icon Sizing
- Stroke Width
- Line Caps
- Line Joins
- Corner Radius
- Internal Padding
- Optical Alignment
- Outline and Filled Variants
- Color Behavior
- Responsive Scaling
- Accessibility
- Component Delivery
- Versioning
- Quality Validation
- Governance

The goal is to create one consistent, scalable, and enterprise-grade icon language across all products and platforms.

---

# Objectives

- Establish one official icon design language.
- Maintain consistent visual weight.
- Standardize icon construction.
- Support scalable web and mobile interfaces.
- Improve accessibility and recognition.
- Prevent mixed icon families.
- Enable reusable components.
- Support automated icon validation.
- Preserve semantic stability.
- Improve designer and developer collaboration.
- Maintain reliable version and audit history.

---

# Scope

This standard applies to:

- UI Icons
- Navigation Icons
- Action Icons
- Status Icons
- Notification Icons
- File Icons
- Content Icons
- Department Icons
- AI Workforce Icons
- Product Icons
- Platform Icons
- Workflow Icons
- Data Icons
- Security Icons
- Integration Icons
- Accessibility Icons
- Custom Enterprise Icons

---

# Core Principles

Every icon must follow these principles:

- Clarity
- Simplicity
- Consistency
- Recognizability
- Accessibility
- Scalability
- Reusability
- Semantic Accuracy
- Technical Reliability
- Visual Balance

---

# Design Philosophy

Mianx.ai icons should feel:

- Intelligent
- Structured
- Modern
- Minimal
- Professional
- Trustworthy
- Technical
- Enterprise-ready

Icons should communicate meaning quickly without unnecessary decoration.

---

# Icon Family Strategy

The Mianx.ai ecosystem should maintain:

## Primary Icon Family

Used for:

- Product Interfaces
- Navigation
- Actions
- Tables
- Forms
- Dashboards
- Mobile Applications
- Developer Tools

---

## Secondary Icon Family

Used only for approved specialized contexts such as:

- Marketing
- Presentations
- Technical Diagrams
- Large Feature Cards
- Educational Material

The secondary family must not be mixed randomly with the primary interface family.

---

# Icon Construction Model

Every custom icon should be built using:

```text
Approved Grid

+

Consistent Stroke

+

Controlled Padding

+

Optical Alignment

+

Semantic Shape

+

Approved Variants
```

---

# Standard Grids

Approved icon grids may include:

```text
16 × 16

20 × 20

24 × 24

32 × 32
```

The primary system should use one main construction grid.

Recommended default:

```text
24 × 24
```

Smaller and larger sizes should be derived carefully rather than scaled blindly.

---

# Primary Grid

The standard 24 × 24 grid should define:

- Outer Boundary
- Safe Area
- Key Lines
- Center Lines
- Baseline
- Optical Center
- Stroke Alignment
- Corner Guides
- Circular Guides

---

# Safe Area

Icons should maintain an internal safe area.

Recommended model:

```text
Canvas: 24 × 24

Primary Drawing Area: 20 × 20

Outer Padding: 2 units
```

Optical exceptions may be allowed where required for balance.

---

# Grid Units

Use consistent grid units.

Example:

```text
1 unit = smallest controlled construction increment
```

Prefer:

- Whole units
- Half units where required
- Consistent coordinate placement

Avoid excessive decimal precision.

---

# Keyline Shapes

Reusable keyline guides may include:

- Square
- Circle
- Horizontal Rectangle
- Vertical Rectangle
- Diagonal Axis
- Rounded Square

These guides help maintain consistent scale across icons with different shapes.

---

# Icon Canvas

The icon canvas should remain consistent.

Example:

```text
24 × 24 view box
```

The icon artwork should remain inside the approved visual area unless an optical adjustment is documented.

---

# Optical Size

Icons with different shapes may require slightly different visual dimensions.

Examples:

- Circular icons may extend closer to the boundary.
- Narrow vertical icons may require more height.
- Diagonal icons may require optical expansion.
- Dense icons may require simplification.

Mathematical equality does not always produce visual equality.

---

# Stroke Width

Outline icons must use a consistent stroke width.

Recommended default for a 24 × 24 grid:

```text
2 units
```

Alternative stroke widths may be approved for:

- Compact 16 px icons
- Large illustrative icons
- Platform-specific requirements
- Specialized technical diagrams

---

# Stroke Scaling

Do not scale stroke width automatically without review.

Example strategy:

| Icon Size | Recommended Stroke |
|-----------|--------------------|
| 16 px | 1.5 units |
| 20 px | 1.75 units |
| 24 px | 2 units |
| 32 px | 2 units or approved optical adjustment |
| 48 px+ | Dedicated large-size treatment |

Exact values should be validated through the design system.

---

# Line Caps

Preferred line cap:

```text
Round
```

Alternative approved cap:

```text
Square
```

The selected cap must remain consistent across the primary icon family.

---

# Line Joins

Preferred line join:

```text
Round
```

Alternative joins may be used when:

- Geometry requires precision.
- The concept depends on sharp corners.
- The icon family explicitly defines another rule.

Do not mix join styles randomly.

---

# Corner Radius

Corner treatment should follow one consistent system.

Possible approved values:

```text
0 units

1 unit

2 units

Fully Rounded
```

The correct radius depends on:

- Icon scale
- Shape type
- Visual family
- Product design language

---

# Corner Consistency

Related icons should use the same corner treatment.

Example:

```text
Folder

Document

Archive

Clipboard
```

These icons should appear as members of one visual family.

---

# Internal Padding

Internal spacing should remain consistent.

Review:

- Space between parallel lines
- Space inside containers
- Distance between symbol and frame
- Badge spacing
- Negative-space readability
- Small-size visibility

---

# Negative Space

Negative space is essential for icon clarity.

Avoid:

- Narrow gaps that disappear at small sizes
- Dense overlapping paths
- Tiny internal shapes
- Decorative details
- Unnecessary visual noise

---

# Minimum Feature Size

Every icon should define the smallest allowed feature size.

Examples:

- Minimum gap
- Minimum line length
- Minimum dot size
- Minimum internal opening
- Minimum corner detail

Features that disappear at 16 or 20 px should be simplified.

---

# Optical Alignment

Icons should align visually with:

- Text
- Buttons
- Inputs
- Navigation Items
- Tables
- Cards
- Other Icons

Optical alignment may require small adjustments beyond geometric centering.

---

# Horizontal Alignment

Review:

- Left visual edge
- Right visual edge
- Center of visual mass
- Relationship with adjacent text
- Arrow and chevron balance

---

# Vertical Alignment

Review:

- Cap-height relationship
- Baseline relationship
- Button centering
- Navigation centering
- Badge positioning
- Text-line alignment

---

# Baseline Behavior

Icons used inline with text should align with the text baseline consistently.

Implementation may use:

```css
vertical-align: middle;
```

or controlled component alignment.

Do not rely on arbitrary per-page adjustments.

---

# Visual Weight

All icons in one family should feel equally strong.

Visual weight depends on:

- Stroke width
- Filled area
- Shape density
- Corner treatment
- Negative space
- Optical size

A visually heavy icon should be simplified or reduced.

---

# Outline Icons

Outline icons are the default for most interface use.

They should:

- Use consistent stroke width.
- Use approved caps and joins.
- Maintain sufficient negative space.
- Remain recognizable at small sizes.
- Support `currentColor`.
- Avoid unnecessary fills.

---

# Filled Icons

Filled icons may be used for:

- Selected Navigation
- Active States
- High-priority Status
- Compact Small-size Usage
- Emphasis
- Platform-specific Requirements

Filled icons must remain semantically equivalent to their outline variants.

---

# Outline and Filled Pairing

Each paired icon should maintain:

- Same concept
- Same proportions
- Same visual center
- Same external dimensions
- Similar visual weight
- Same system name with variant metadata

Example:

```text
navigation-home-outline

navigation-home-filled
```

---

# Duotone Icons

Duotone icons may be used only when formally approved.

They should define:

- Primary Layer
- Secondary Layer
- Opacity Rules
- Theme Behavior
- Accessibility Requirements

Duotone icons should not be used for critical status communication without text.

---

# Active and Selected States

The selected state may use:

- Filled Variant
- Background Container
- Color Token
- Border
- Text Weight
- Indicator

Do not rely only on a different icon color.

---

# Disabled State

Disabled icons should:

- Use approved disabled tokens.
- Maintain visibility.
- Remain distinguishable from active icons.
- Be paired with correct disabled interaction behavior.

Opacity alone should not make the icon unreadable.

---

# Hover State

Hover behavior may change:

- Color
- Background
- Container
- Stroke emphasis

The icon geometry should not shift or resize on hover unless intentionally animated.

---

# Focus State

Interactive icons require a visible focus state.

The focus indicator should belong to the interactive control, not only the SVG path.

Example:

```text
Button Focus Ring

+

Icon
```

---

# Pressed State

Pressed states may use:

- Background change
- Position shift within approved limits
- Color-token change
- Elevation change

Avoid distorting the icon.

---

# Loading State

A loading icon should:

- Be clearly distinguishable.
- Use approved motion.
- Avoid excessive rotation speed.
- Include accessible status text.
- Respect reduced-motion preferences.

---

# Directional Icons

Directional icons include:

- Arrows
- Chevrons
- Carets
- Expand/Collapse Controls

They should maintain consistent:

- Angle
- Stroke
- Size
- Padding
- Directional meaning

---

# Directionality

Directional meaning must remain stable.

Examples:

```text
Arrow Right = Move Forward or Navigate Right

Chevron Down = Expand or Open Menu

Arrow Up = Move Up or Upload only where context clarifies
```

Do not use the same icon for unrelated meanings without context.

---

# RTL Support

Directional icons must support right-to-left interfaces.

Icons that may need mirroring include:

- Back
- Forward
- Next
- Previous
- Undo
- Redo
- Directional Navigation
- Breadcrumb Indicators

Icons that should not normally mirror include:

- Media Play
- Clock
- Search
- Brand Logos
- Universal Status Symbols

---

# Mirroring Metadata

Every directional icon should include metadata such as:

| Field | Example |
|------|---------|
| RTL Behavior | Mirror |
| Directional | Yes |
| Semantic Direction | Previous |
| Mirroring Exception | None |

---

# Icon Sizes

Approved component sizes may include:

```text
12 px

16 px

20 px

24 px

32 px

48 px

64 px
```

Each size must have a documented use case.

---

# Size Tokens

Recommended token pattern:

```text
icon-size-xs

icon-size-sm

icon-size-md

icon-size-lg

icon-size-xl
```

Example mapping:

| Token | Size |
|-------|------|
| icon-size-xs | 12 px |
| icon-size-sm | 16 px |
| icon-size-md | 20 px |
| icon-size-lg | 24 px |
| icon-size-xl | 32 px |

---

# Default Size

Recommended default interface icon size:

```text
20 px or 24 px
```

The final default must align with the Mianx.ai component system.

---

# Compact Icons

Compact icons are used in:

- Dense Tables
- Metadata Rows
- Small Buttons
- Inline Text
- Compact Navigation

Compact icons may require dedicated simplification.

Do not shrink a detailed 24 px icon to 12 px without review.

---

# Large Icons

Large icons are used in:

- Empty States
- Feature Cards
- Onboarding
- Dashboards
- Marketing Sections
- Presentations

Large icons may include slightly more detail but must remain part of the same visual family.

---

# Icon Containers

Icons may appear inside:

- Circle
- Rounded Square
- Button
- Badge
- Avatar
- Status Chip
- Card

Container rules must remain separate from icon geometry.

---

# Container Padding

Recommended container relationship:

```text
Container Size

>

Icon Size

+

Approved Padding
```

Example:

```text
40 px Button

20 px Icon

10 px Padding Per Side
```

---

# Icon and Text Spacing

Use design-system spacing tokens.

Typical relationships may include:

```text
4 px

6 px

8 px

12 px
```

Do not use arbitrary spacing in individual products.

---

# Color Behavior

Default icons should use:

```text
currentColor
```

This allows the parent component to control:

- Default color
- Hover color
- Focus color
- Disabled color
- Theme color
- Semantic state

---

# Color Tokens

Recommended token categories:

```text
icon-color-default

icon-color-muted

icon-color-disabled

icon-color-interactive

icon-color-success

icon-color-warning

icon-color-error

icon-color-info

icon-color-inverse
```

---

# Semantic Icons

Semantic icon meaning should be paired with semantic tokens.

Examples:

| Meaning | Icon Direction | Token |
|---------|----------------|-------|
| Success | Check or verified state | icon-color-success |
| Warning | Warning symbol | icon-color-warning |
| Error | Error or failure symbol | icon-color-error |
| Information | Information symbol | icon-color-info |

Color must remain supplementary.

---

# Multicolor Icons

Multicolor icons should be limited to:

- Brand Icons
- Product Identity Icons
- Approved Illustrative Icons
- Marketing Contexts

Core interface icons should generally remain monochrome and token-controlled.

---

# Theme Support

Icons must support:

- Light Theme
- Dark Theme
- High-contrast Theme
- Print
- Monochrome
- Reduced-transparency Environments

---

# Dark Theme

Dark-theme icons should:

- Use approved inverse or neutral tokens.
- Maintain sufficient contrast.
- Avoid glowing effects.
- Avoid hardcoded black paths.
- Support transparent backgrounds.

---

# High-contrast Mode

Icons should remain understandable when:

- Colors are overridden.
- Outlines are emphasized.
- Backgrounds change.
- Transparency is removed.

Meaning must not depend only on subtle visual differences.

---

# Accessibility Principles

Icons must support:

- Perceivability
- Operability
- Understandability
- Robustness

---

# Decorative Icons

Decorative icons should be hidden from assistive technology.

Example:

```html
<svg aria-hidden="true" focusable="false">
</svg>
```

---

# Informative Icons

Informative icons require a text equivalent.

Example:

```html
<span>
  <StatusIcon aria-hidden="true" />
  Payment failed
</span>
```

---

# Icon-only Controls

Icon-only controls must include:

- Accessible name
- Tooltip where useful
- Visible focus state
- Keyboard support
- Adequate target size
- Clear disabled behavior

Example:

```tsx
<button aria-label="Delete task">
  <DeleteIcon aria-hidden="true" />
</button>
```

---

# Tooltips

Tooltips should be used when:

- The icon meaning is unfamiliar.
- The action is destructive.
- The context is dense.
- The user may need clarification.

Tooltips must not replace accessible labels.

---

# Alternative Text

Icons embedded as images should use appropriate alternative text.

Decorative example:

```html
<img src="divider-icon.svg" alt="" />
```

Meaningful example:

```html
<img src="warning-icon.svg" alt="Warning" />
```

---

# Interactive Target Size

The visual icon may be small, but the interactive target should remain large enough for reliable use.

Example:

```text
Icon Size: 20 px

Interactive Target: 40–44 px
```

The component system should define the final target sizes.

---

# Motion

Icons may be animated for:

- Loading
- Progress
- Success Confirmation
- Expansion
- Collapse
- Synchronization
- Notification

Animation must communicate function rather than decoration.

---

# Reduced Motion

Animated icons must respect reduced-motion preferences.

Example:

```css
@media (prefers-reduced-motion: reduce) {
  .animated-icon {
    animation: none;
  }
}
```

---

# Motion Duration

Motion duration should be defined through design tokens.

Example categories:

```text
motion-fast

motion-standard

motion-slow
```

Avoid inconsistent animation timing.

---

# Icon Semantics

Every icon must have one primary meaning.

Metadata should document:

- Primary Meaning
- Allowed Contexts
- Restricted Contexts
- Common Synonyms
- Accessibility Label
- Replacement Icon

---

# Semantic Stability

The system name and meaning should remain stable.

Example:

```text
action-archive
```

must not later represent deletion.

If the meaning changes, create a new icon.

---

# Ambiguous Icons

Avoid ambiguous symbols.

Examples that often require labels:

- Star
- Flag
- Bell
- Heart
- Bookmark
- Sparkle
- Magic Wand
- Lightning

The meaning must be clarified by context or text.

---

# Destructive Actions

Destructive icons must be:

- Clear
- Consistent
- Paired with confirmation where required
- Paired with accessible labels
- Distinct from archive or remove actions

Examples:

```text
Delete

Remove

Archive

Deactivate
```

These actions must not share one icon without clear context.

---

# Icon Naming Standard

Use semantic lowercase kebab-case.

Pattern:

```text
{category}-{concept}-{variant}
```

Examples:

```text
action-add-outline

action-add-filled

navigation-home-outline

status-warning-filled

file-pdf-outline
```

---

# Naming Rules

Names should:

- Describe meaning.
- Remain stable.
- Avoid implementation details.
- Avoid shape-only labels.
- Avoid product-specific prefixes unless required.
- Avoid version numbers in system names.
- Use approved category names.

---

# Icon ID Standard

Recommended pattern:

```text
ICON-{CATEGORY}-{CONCEPT}-{NUMBER}
```

Examples:

```text
ICON-ACTION-ADD-001

ICON-NAV-HOME-001

ICON-STATUS-WARN-001
```

---

# Variant Metadata

Variants should be stored as metadata.

Example:

```json
{
  "system_name": "action-add",
  "variant": "outline",
  "size": 24,
  "theme": "inherited"
}
```

---

# SVG Standards

Production SVG files should:

- Use valid XML.
- Use an approved `viewBox`.
- Avoid fixed width and height where component control is required.
- Use `currentColor` where appropriate.
- Avoid inline scripts.
- Avoid external resources.
- Avoid editor metadata.
- Avoid hidden elements.
- Use optimized paths.
- Preserve visual quality.
- Pass security scanning.

---

# SVG Example

```svg
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <path d="..." />
</svg>
```

---

# SVG View Box

Preferred view box:

```text
0 0 24 24
```

Alternative view boxes require documented justification.

---

# SVG Fill Behavior

Outline icons should normally use:

```text
fill="none"
```

Filled icons should normally use:

```text
fill="currentColor"
```

Avoid hardcoded colors in reusable UI icons.

---

# SVG Stroke Behavior

Reusable outline icons should normally use:

```text
stroke="currentColor"
```

Stroke width should remain consistent with the family standard.

---

# Path Quality

SVG paths should be:

- Clean
- Minimal
- Closed where required
- Free from duplicate points
- Free from accidental clipping
- Free from unnecessary decimals
- Compatible with target browsers

---

# Icon Components

Icons should be available through an approved component package.

Example:

```tsx
import { AddIcon } from "@mianx/icons";

<AddIcon
  size={20}
  aria-hidden="true"
/>
```

---

# Component API

The standard component API may support:

| Property | Purpose |
|----------|---------|
| size | Controls icon dimensions |
| className | Applies approved styling |
| title | Provides optional accessible title |
| aria-hidden | Marks decorative icons |
| strokeWidth | Limited controlled override |
| variant | Outline or filled |
| color | Inherited or approved token |

---

# Component Restrictions

Components should not allow arbitrary changes that damage consistency.

Avoid unrestricted:

- Stroke width
- Path editing
- Aspect ratio
- Rotation
- Fill combinations
- Internal padding

Controlled overrides should be documented.

---

# Default Component Behavior

Recommended defaults:

```text
Size: 24

Color: currentColor

Variant: outline

Accessible Behavior: decorative unless a title is provided
```

The final implementation must align with the component library.

---

# Framework Delivery

Icons may be delivered for:

- React
- React Native
- Vue
- Web Components
- Static HTML
- Native Mobile Platforms
- Documentation Systems

All framework implementations should use the same approved source paths.

---

# React Example

```tsx
type IconProps = {
  size?: number;
  title?: string;
  className?: string;
};

export function SearchIcon({
  size = 24,
  title,
  className,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path d="..." />
    </svg>
  );
}
```

---

# Package Architecture

Recommended icon package structure:

```text
icons-package/

├── src/
│   ├── icons/
│   ├── components/
│   ├── metadata/
│   ├── types/
│   └── index.ts
├── scripts/
│   ├── build-icons.ts
│   ├── validate-svg.ts
│   └── generate-metadata.ts
├── tests/
├── package.json
└── README.md
```

---

# Tree Shaking

The icon package should support tree shaking.

Preferred import:

```tsx
import { SearchIcon } from "@mianx/icons";
```

Avoid bundling the entire icon library when only a few icons are used.

---

# Type Safety

Icon names and variants should be type-safe where supported.

Example:

```ts
type IconName =
  | "action-add"
  | "action-delete"
  | "navigation-home"
  | "status-warning";
```

---

# Design Tokens

The icon system should use tokens for:

- Sizes
- Colors
- Stroke
- Motion
- Spacing
- Containers
- Semantic States

Example:

```css
:root {
  --icon-size-sm: 1rem;
  --icon-size-md: 1.25rem;
  --icon-size-lg: 1.5rem;
  --icon-stroke-default: 2;
}
```

---

# Token Naming

Recommended pattern:

```text
icon.{property}.{variant}
```

Examples:

```text
icon.size.sm

icon.size.md

icon.color.default

icon.color.muted

icon.stroke.default

icon.motion.spin
```

---

# Source File Architecture

Recommended source structure:

```text
source-files/

├── foundation/
│   ├── grid/
│   ├── keylines/
│   ├── stroke/
│   └── templates/
├── working/
├── review/
├── approved/
├── deprecated/
└── archived/
```

---

# Figma Architecture

Recommended pages:

```text
00-Cover

01-Foundation

02-Grid

03-Keylines

04-UI

05-Navigation

06-Actions

07-Status

08-Files

09-Departments

10-AI-Workforce

11-Products

12-Review

13-Deprecated

14-Archive
```

---

# Figma Component Naming

Recommended pattern:

```text
Icon/{Category}/{Name}/{Variant}/{Size}
```

Examples:

```text
Icon/Action/Add/Outline/24

Icon/Navigation/Home/Filled/24

Icon/Status/Warning/Outline/20
```

---

# Custom Icon Workflow

```text
Requirement Identified

↓

Existing Library Searched

↓

Semantic Meaning Confirmed

↓

Grid and Family Selected

↓

Icon Draft Created

↓

Optical Review

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

Component Generated

↓

Package Released
```

---

# Icon Review Criteria

Reviewers should evaluate:

- Meaning
- Recognizability
- Visual Family
- Grid Alignment
- Stroke Consistency
- Optical Balance
- Negative Space
- Small-size Clarity
- Theme Behavior
- Accessibility
- Technical Quality
- Licensing

---

# Approval Roles

| Role | Responsibility |
|------|----------------|
| Product Designer | Defines usage requirement |
| Icon Designer | Creates icon geometry |
| Design-system Lead | Maintains visual consistency |
| Accessibility Reviewer | Validates understandable usage |
| Frontend Engineer | Validates technical implementation |
| Legal Reviewer | Reviews external icon licensing |
| Asset Manager | Registers and publishes assets |
| Governance Team | Reviews exceptions and audits |

---

# Testing Requirements

Every icon should be tested for:

- 16 px rendering
- 20 px rendering
- 24 px rendering
- Light theme
- Dark theme
- High contrast
- Inline text alignment
- Button alignment
- Navigation alignment
- SVG validity
- Component rendering
- Accessible labeling
- RTL behavior where applicable

---

# Visual Regression Testing

Automated visual comparison should detect:

- Path changes
- Stroke changes
- Alignment shifts
- Color changes
- View-box changes
- Padding changes
- Clipping
- Missing elements

---

# Snapshot Testing

Component snapshots may verify:

- SVG structure
- Component props
- Accessible attributes
- Default size
- Default variant
- Theme inheritance

---

# SVG Security Validation

Every SVG must be checked for:

- Scripts
- Event handlers
- External links
- Embedded HTML
- Unsafe data
- Hidden content
- Unexpected metadata
- Invalid XML

---

# Performance

Icons should be optimized for:

- Small bundle size
- Fast rendering
- Reuse
- Tree shaking
- Caching
- Minimal path complexity
- Efficient mobile delivery

---

# Path Complexity

Avoid unnecessary path complexity.

Review:

- Number of points
- Number of paths
- Boolean operations
- Duplicate shapes
- Hidden objects
- Tiny details
- Unnecessary masks

---

# Icon Fonts

Icon fonts should generally be avoided for new systems unless a justified legacy requirement exists.

Limitations include:

- Accessibility issues
- Loading failures
- Difficult multicolor support
- Poor semantic behavior
- Font-rendering inconsistencies
- Maintenance complexity

SVG components are preferred.

---

# Raster Icons

Raster icons should be limited to:

- Platform-specific legacy needs
- Marketing graphics
- App-store assets
- Approved external systems

Primary product UI icons should remain vector-based.

---

# Third-party Libraries

Before adopting an external icon library, evaluate:

- License
- Visual compatibility
- Coverage
- Accessibility
- Update frequency
- Bundle size
- Component support
- Security
- Long-term maintenance
- Customization restrictions

---

# Library Adoption Decision

Document:

- Library Name
- License
- Version
- Owner
- Approved Usage
- Restricted Usage
- Modification Policy
- Upgrade Strategy
- Exit Plan

---

# Mixed Library Policy

Do not mix multiple icon libraries in the same product unless:

- A documented gap exists.
- Visual normalization is possible.
- Design-system approval is complete.
- Licensing is verified.
- Migration strategy is defined.

---

# Brand Icons

Third-party brand icons must:

- Use official source files.
- Preserve approved shape.
- Preserve approved colors where required.
- Follow partner guidelines.
- Include licensing metadata.
- Remain separate from general UI icons.

---

# Department and AI Icons

Department and AI workforce icons should:

- Use the shared icon grid.
- Use the same stroke family.
- Remain distinct from logos and avatars.
- Support compact interface usage.
- Link to department or agent metadata.
- Avoid independent brand creation.

---

# Status Icons

Status icons must maintain consistent meanings.

Examples:

```text
Check Circle = Success

Warning Triangle = Warning

X Circle = Error

Info Circle = Information

Clock = Pending
```

These meanings should not change across products.

---

# Icon Registry

Maintain an official icon registry.

| Icon ID | System Name | Category | Variant | Version | Status |
|---------|-------------|----------|---------|---------|--------|
| TBD | TBD | TBD | TBD | TBD | Planned |

---

# Metadata Requirements

Each icon should include:

- Icon ID
- System Name
- Display Name
- Category
- Meaning
- Keywords
- Variant
- Grid
- Stroke
- RTL Behavior
- Accessibility Guidance
- Source Path
- Package Export
- Version
- Status
- License
- Owner
- Reviewer
- Replacement

---

# Versioning Policy

Use semantic versioning.

| Change Type | Example | Meaning |
|-------------|---------|---------|
| Major | 2.0.0 | Icon meaning or system construction changes |
| Minor | 1.1.0 | New variant or supported size |
| Patch | 1.0.1 | Small technical or optical correction |

---

# Breaking Changes

Breaking icon changes may include:

- Meaning change
- System-name change
- Removed icon
- Major geometry change
- Package API change
- Default variant change
- Accessibility behavior change

Breaking changes require migration documentation.

---

# Deprecation

When deprecating an icon:

- Mark it as deprecated.
- Identify its replacement.
- Add package warnings.
- Define migration deadline.
- Update documentation.
- Track remaining usage.
- Preserve historical versions.
- Remove only through a major release where appropriate.

---

# AI Workforce Usage

AI agents may:

- Search icons by meaning.
- Suggest approved icons.
- Detect duplicates.
- Validate grid and naming.
- Generate metadata drafts.
- Generate framework components.
- Detect deprecated usage.
- Produce audit reports.
- Assist with visual regression analysis.

AI agents must not:

- Publish new icons without review.
- Change icon meanings.
- Modify partner or brand icons.
- Ignore accessibility requirements.
- Bypass licensing review.
- Replace production icons silently.
- Create inconsistent visual families.
- Approve their own icon changes.

---

# Automation Requirements

The icon system should eventually support:

- Grid validation
- View-box validation
- Stroke validation
- Color validation
- SVG security scanning
- Metadata generation
- Duplicate detection
- Visual regression tests
- Component generation
- Package publishing
- RTL metadata checks
- Accessibility documentation
- Deprecated-usage detection
- Bundle-size reporting
- Release manifest generation

---

# Quality Checklist

Before approving an icon-system addition:

- [ ] Existing library searched
- [ ] Semantic meaning confirmed
- [ ] Icon ID assigned
- [ ] System name approved
- [ ] Correct category selected
- [ ] Primary grid used
- [ ] Safe area verified
- [ ] Stroke width verified
- [ ] Line caps verified
- [ ] Line joins verified
- [ ] Corner treatment verified
- [ ] Optical alignment reviewed
- [ ] Negative space reviewed
- [ ] Small-size test completed
- [ ] Outline variant reviewed
- [ ] Filled variant reviewed where required
- [ ] Light-theme test completed
- [ ] Dark-theme test completed
- [ ] High-contrast test completed
- [ ] RTL behavior documented
- [ ] Accessibility guidance added
- [ ] SVG security validation passed
- [ ] Component generated
- [ ] Metadata completed
- [ ] License verified
- [ ] Design-system approval recorded

---

# System Audit

The icon system audit should review:

- Mixed icon families
- Inconsistent grids
- Inconsistent strokes
- Incorrect view boxes
- Ambiguous meanings
- Duplicate icons
- Missing metadata
- Missing accessibility guidance
- Unsafe SVG content
- Unlicensed assets
- Deprecated usage
- RTL failures
- Theme failures
- Package inconsistencies
- Missing source files

Recommended frequency:

```text
Monthly Automated Validation

Quarterly Design-system Audit

Annual Icon-language Review
```

---

# Common Mistakes

Avoid:

- Scaling one detailed icon to every size.
- Mixing filled and outline styles randomly.
- Using inconsistent stroke widths.
- Naming icons by appearance only.
- Creating multiple icons for the same meaning.
- Using hardcoded colors.
- Embedding inaccessible icon-only actions.
- Ignoring RTL behavior.
- Using emoji as production icons.
- Using unlicensed icon libraries.
- Publishing unsafe SVG files.
- Allowing arbitrary stroke overrides.
- Changing semantic meaning during redesign.
- Using icon fonts for new systems without justification.
- Maintaining separate icon sets in every product.

---

# Related Documents

- `README.md`
- `ui-icons.md`
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
- `../license.md`
- `../branding/color-palette.md`
- `../branding/typography.md`
- `../logos/department-logos.md`
- `../logos/ai-workforce-logos.md`
- `../design-system/README.md`
- `../../15-ui-ux/README.md`

---

# Best Practices

- Use one primary icon family.
- Build icons on a shared grid.
- Maintain consistent stroke and corner treatment.
- Optimize for the smallest intended size.
- Name icons by meaning.
- Keep semantic meaning stable.
- Use `currentColor` for reusable interface icons.
- Provide accessible labels for interactive controls.
- Define RTL behavior explicitly.
- Generate components from approved SVG sources.
- Validate icons automatically.
- Archive deprecated icons instead of deleting them.
- Keep design sources, metadata, code packages, and documentation synchronized.

---

# Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-07-10 | Initial enterprise icon-system foundation established |

---

# Next Document

```text
docs/
└── 18-assets/
    └── icons/
        └── ui-icons.md
```

---

**End of Document**