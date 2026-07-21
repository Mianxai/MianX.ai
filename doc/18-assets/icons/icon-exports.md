# Icon Exports

> Enterprise standards for exporting, packaging, optimizing, versioning, validating, and distributing icon assets across the Mianx.ai ecosystem.

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | Icon Exports |
| Folder | docs/18-assets/icons |
| File Name | icon-exports.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Design System, Brand Team & Asset Governance |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

This document defines the official export standards for every icon used across the Mianx.ai ecosystem.

It ensures every exported icon is:

- Consistent
- Optimized
- Accessible
- Versioned
- Platform Compatible
- Production Ready

The export pipeline guarantees identical assets across web, mobile, desktop, documentation, AI systems, and enterprise products.

---

# Objectives

The icon export system aims to:

- Standardize export formats
- Maintain design consistency
- Reduce duplicate assets
- Support every platform
- Automate distribution
- Enable version tracking
- Improve performance
- Preserve source integrity
- Support accessibility
- Enable AI-assisted asset discovery

---

# Scope

These standards apply to:

- UI Icons
- Navigation Icons
- Action Icons
- Status Icons
- Department Icons
- AI Workforce Icons
- File Icons
- Brand Icons
- Product Icons
- Custom Icons
- Future Icon Families

---

# Export Pipeline Overview

```text
Master Source

↓

Design Review

↓

Approval

↓

SVG Optimization

↓

Multi-format Export

↓

Validation

↓

Version Assignment

↓

Package Generation

↓

Asset Registry

↓

Distribution

↓

Release
```

---

# Source of Truth

Every exported asset must originate from a single approved master source.

Approved master formats:

- SVG
- Figma Component
- Illustrator Master (if approved)

Generated exports must never become the new master.

---

# Supported Export Formats

Official supported formats:

| Format | Purpose |
|---------|----------|
| SVG | Primary vector |
| PNG | Raster export |
| WebP | Optimized web |
| PDF | Documentation |
| ICO | Windows favicon |
| ICNS | macOS application |
| Android Vector | Android |
| iOS PDF | Apple Assets |
| Favicon | Websites |

---

# SVG Export

SVG is the primary format.

Requirements:

- Responsive
- Clean paths
- Optimized
- Accessible
- No scripts
- No embedded CSS
- currentColor support
- Stable ViewBox

---

# PNG Export

PNG exports should be generated for environments without SVG support.

Recommended sizes:

```text
16

20

24

32

48

64

96

128

256

512
```

PNG should preserve transparency.

---

# WebP Export

Used for:

- Documentation
- Web previews
- Galleries
- Asset browsers

Benefits:

- Smaller size
- Transparency
- Better compression

---

# PDF Export

PDF exports should be generated for:

- Brand Manuals
- Documentation
- Presentations
- Design Reviews
- Printing

---

# ICO Export

ICO packages should include:

```text
16

24

32

48

64
```

Used for:

- Browser Favicon
- Windows Applications

---

# ICNS Export

Used for:

- macOS Applications

Supported Apple sizes should follow platform recommendations.

---

# Android Export

Android exports include:

- Vector Drawable
- Adaptive Icon Assets
- Notification Icons

Naming should follow Android conventions.

---

# iOS Export

Supported:

- PDF Vector
- Asset Catalog
- App Icons

Export packages must remain compatible with Xcode.

---

# Favicon Export

Website favicons should include:

```text
16

32

48

180

192

512
```

Supported outputs:

- favicon.ico
- favicon.svg
- apple-touch-icon.png
- manifest icons

---

# Design System Package

Every release should generate a design-system package.

Example:

```text
icons/

├── svg/
├── png/
├── webp/
├── pdf/
├── favicon/
├── android/
├── ios/
├── metadata/
└── manifest.json
```

---

# Export Naming Convention

Pattern:

```text
{icon-name}-{variant}-{size}-v{version}.{extension}
```

Example:

```text
folder-outline-24-v1.svg

status-success-filled-20-v1.svg

department-engineering-outline-32-v1.png

file-pdf-outline-24-v1.webp
```

Avoid:

```text
final.svg

newicon.png

icon_latest.svg

copy-final2.svg
```

---

# Directory Structure

Recommended export structure:

```text
exports/

├── svg/
├── png/
├── webp/
├── pdf/
├── favicon/
├── android/
├── ios/
├── release/
├── metadata/
└── manifests/
```

---

# Export Variants

Supported variants:

- Outline
- Filled
- Monochrome
- High Contrast

Each variant must preserve semantic meaning.

---

# Supported Sizes

Enterprise icon sizes:

| Size | Usage |
|------|--------|
|16|Dense Tables|
|20|Standard UI|
|24|Default|
|32|Navigation|
|48|Cards|
|64|Documentation|
|96|Large Preview|
|128|Presentations|
|256|Marketing|
|512|Master Raster|

---

# SVG Optimization

SVG exports should:

- Remove metadata
- Remove comments
- Remove unused groups
- Merge paths where appropriate
- Preserve accessibility
- Preserve ViewBox
- Preserve IDs where required

---

# Raster Optimization

PNG and WebP should:

- Preserve transparency
- Avoid unnecessary compression artifacts
- Use lossless export where required

---

# Accessibility Requirements

Exports should support:

- currentColor
- Screen readers
- High contrast
- Theme switching
- Keyboard interfaces

---

# Manifest File

Every release should generate:

```json
{
  "package":"mianx-icons",
  "version":"1.0.0",
  "releaseDate":"2026-07-10",
  "formats":[
    "svg",
    "png",
    "webp"
  ]
}
```

---

# Metadata Package

Each release includes:

- Registry
- Version
- Categories
- Variants
- Sizes
- MIME Types
- Checksums

---

# Checksums

Generate checksums for exported assets.

Supported:

- SHA256

Used for:

- Integrity
- Verification
- Distribution

---

# Package Versioning

Semantic Versioning:

| Type | Example |
|------|----------|
|Major|2.0.0|
|Minor|1.1.0|
|Patch|1.0.1|

---

# Distribution Channels

Official packages may be distributed to:

- Design System
- Frontend Repository
- Mobile Repository
- Documentation Portal
- Asset Library
- Internal Registry
- AI Asset Store

---

# Release Workflow

```text
Design Approval

↓

Export

↓

Optimization

↓

Validation

↓

Package

↓

Registry Update

↓

Release

↓

Documentation Update
```

---

# Validation Checklist

Before release:

- [ ] SVG validated
- [ ] PNG exported
- [ ] WebP exported
- [ ] PDF generated
- [ ] Sizes verified
- [ ] Naming verified
- [ ] Metadata generated
- [ ] Manifest generated
- [ ] Checksums generated
- [ ] Accessibility verified
- [ ] Theme compatibility verified
- [ ] Registry updated

---

# Quality Checklist

Every exported asset must pass:

- [ ] Visual Review
- [ ] Size Review
- [ ] Naming Review
- [ ] Performance Review
- [ ] Accessibility Review
- [ ] Security Review
- [ ] SVG Validation
- [ ] Packaging Review

---

# Security

Exported assets must:

- Remove scripts
- Remove embedded CSS
- Remove tracking metadata
- Remove external references
- Use trusted sources only

---

# Automation

The export pipeline should eventually automate:

- SVG optimization
- PNG generation
- WebP generation
- Android assets
- iOS assets
- Manifest creation
- Metadata generation
- Registry update
- Version increment
- Package publishing

---

# Related Documents

- README.md
- icon-system.md
- ui-icons.md
- navigation-icons.md
- action-icons.md
- status-icons.md
- department-icons.md
- ai-workforce-icons.md
- file-and-content-icons.md
- icon-source-files.md
- changelog.md
- ../assets-guidelines.md
- ../branding/color-palette.md
- ../naming-conventions.md

---

# Best Practices

- Maintain one master source.
- Never edit exported assets directly.
- Use semantic versioning.
- Preserve accessibility.
- Optimize every export.
- Validate before publishing.
- Archive previous releases.
- Maintain one registry.
- Automate repetitive tasks.
- Document every release.

---

# Version History

| Version | Date | Description |
|----------|------------|------------------------------|
|1.0.0|2026-07-10|Initial enterprise icon export standard|

---

# Next Document

```text
docs/
└── 18-assets/
    └── icons/
        └── icon-source-files.md
```

---

**End of Document**