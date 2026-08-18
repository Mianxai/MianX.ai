# Export Guidelines

> Enterprise standards for exporting, optimizing, packaging, distributing, and governing illustration assets across the complete Mianx.ai ecosystem.

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | Illustration Export Guidelines |
| Folder | docs/18-assets/illustrations |
| File Name | export-guidelines.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Design System Team |
| Maintained By | Brand Team & Asset Governance |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

This document defines the official standards for exporting illustration assets from their master source into production-ready formats.

The export pipeline guarantees consistency across:

- Web Applications
- Mobile Applications
- Documentation
- Marketing
- Presentations
- Social Media
- Print
- Enterprise Products
- AI Systems

Every illustration must pass through the official export workflow before publication.

---

# Objectives

The Illustration Export System aims to:

- Standardize exports
- Preserve visual quality
- Improve performance
- Maintain accessibility
- Enable automation
- Support multiple platforms
- Simplify distribution
- Maintain version history
- Prevent inconsistent exports
- Preserve master assets

---

# Scope

These standards apply to:

- Hero Illustrations
- Product Illustrations
- Marketing Illustrations
- Empty States
- AI Workforce
- Technical Illustrations
- Workflow Illustrations
- Documentation Graphics
- Social Media Assets
- Presentation Graphics

---

# Export Philosophy

Master files are never distributed.

Only officially generated exports are released.

Workflow:

```text
Master Source

↓

Design Review

↓

Approval

↓

Export

↓

Optimization

↓

Validation

↓

Package

↓

Release

↓

Distribution
```

---

# Source of Truth

Approved master sources:

- Figma
- SVG Master
- Adobe Illustrator

Exports must never become the new master.

---

# Supported Export Formats

Official formats:

| Format | Purpose |
|----------|----------|
| SVG | Primary Web Vector |
| PNG | Raster |
| WebP | Optimized Web |
| PDF | Documentation & Print |
| JPG | Marketing (when appropriate) |

---

# Editable Source Formats

Master files may exist as:

- Figma
- SVG
- Adobe Illustrator

Editing exported assets is prohibited.

---

# SVG Export

SVG is the preferred production format.

Requirements:

- Responsive
- Optimized
- Accessible
- Clean Paths
- No Embedded Scripts
- No External References
- currentColor compatible (where applicable)

---

# PNG Export

PNG exports support:

- Documentation
- Presentations
- Legacy Systems
- Applications without SVG support

Recommended sizes:

```text
256 px

512 px

1024 px

2048 px
```

Transparency should always be preserved.

---

# WebP Export

Used for:

- Website
- Documentation
- Marketing
- CMS
- Knowledge Base

Advantages:

- Smaller file size
- Better compression
- Transparency support

---

# PDF Export

PDF exports support:

- Print
- Whitepapers
- Brand Manuals
- Presentations
- Enterprise Documentation

PDFs should preserve vector quality whenever possible.

---

# Print Assets

Print-ready exports should use:

- CMYK Color Profile
- 300 DPI minimum
- Embedded Fonts (when required)
- Bleed where applicable

---

# Presentation Assets

Presentation exports should support:

- PowerPoint
- Google Slides
- Keynote
- PDF

Preferred format:

```text
SVG

↓

PNG Fallback
```

---

# Social Media Exports

Illustrations should support common platform ratios.

Examples:

| Platform | Recommended Ratio |
|----------|-------------------|
| LinkedIn | 1.91:1 |
| Instagram Feed | 1:1 |
| Instagram Story | 9:16 |
| Facebook | 1.91:1 |
| X | 16:9 |
| YouTube Thumbnail | 16:9 |

---

# Responsive Exports

Every illustration should support:

- Desktop
- Laptop
- Tablet
- Mobile

Responsive exports should preserve:

- Composition
- Readability
- Whitespace
- Primary Message

---

# Export Naming Standard

Pattern:

```text
{category}-{name}-{size}-v{version}.{extension}
```

Examples:

```text
hero-ai-workforce-1024-v1.svg

product-dashboard-512-v1.png

workflow-order-processing-v2.webp
```

Avoid:

```text
new-final.png

copy.svg

illustration_latest.ai
```

---

# Folder Structure

Recommended export structure:

```text
illustrations/

├── exports/
│
├── svg/
├── png/
├── webp/
├── pdf/
├── print/
├── presentations/
├── social-media/
├── metadata/
├── manifests/
└── release/
```

---

# SVG Optimization

SVG files should:

- Remove unused groups
- Remove metadata
- Remove comments
- Merge duplicate paths
- Preserve ViewBox
- Preserve accessibility

---

# Raster Optimization

PNG/WebP should:

- Preserve sharp edges
- Avoid compression artifacts
- Maintain transparency
- Use lossless export where required

---

# Metadata Package

Every exported illustration should include metadata.

Required fields:

- Illustration ID
- Name
- Category
- Version
- Owner
- Status
- Source
- Export Date
- Tags
- License

---

# Manifest File

Every release should generate:

```json
{
  "package": "mianx-illustrations",
  "version": "1.0.0",
  "releaseDate": "2026-07-10",
  "formats": [
    "svg",
    "png",
    "webp",
    "pdf"
  ]
}
```

---

# Versioning

Illustration exports use Semantic Versioning.

| Type | Example |
|------|----------|
| Major | 2.0.0 |
| Minor | 1.1.0 |
| Patch | 1.0.1 |

---

# Package Structure

Release packages should include:

```text
release/

├── illustrations/
├── metadata/
├── manifest.json
├── checksums.txt
├── release-notes.md
└── license.txt
```

---

# Distribution Channels

Approved channels include:

- Design System Repository
- Product Repository
- Documentation Portal
- Brand Asset Portal
- Internal CDN
- Enterprise Asset Registry

Only approved packages may be distributed.

---

# CDN Delivery

Illustrations intended for production should:

- Use CDN caching
- Enable compression
- Support cache versioning
- Use immutable asset names

Example:

```text
hero-ai-workforce-v1.svg

↓

hero-ai-workforce-v2.svg
```

Avoid overwriting production assets.

---

# Accessibility Validation

Every export should be checked for:

- Contrast
- Scalability
- Responsive rendering
- Alternative text availability
- Print readability

---

# Performance Targets

Recommended limits:

| Asset Type | Target Size |
|------------|------------:|
| SVG | < 250 KB |
| PNG | < 1 MB |
| WebP | < 500 KB |
| PDF | < 5 MB |

Exceptions require approval.

---

# Security

Exported assets must:

- Remove scripts
- Remove hidden metadata
- Remove external references
- Remove embedded tracking
- Use trusted export tools

---

# Automation Pipeline

Future automation may include:

- SVG optimization
- Raster generation
- Metadata generation
- Manifest creation
- Checksum generation
- CDN publishing
- Registry synchronization
- Release packaging

---

# Export Workflow

```text
Master Source

↓

Review

↓

Approval

↓

Export

↓

Optimization

↓

Validation

↓

Metadata

↓

Packaging

↓

Distribution

↓

Archive
```

---

# Validation Checklist

Before release:

- [ ] Source approved
- [ ] SVG optimized
- [ ] PNG generated
- [ ] WebP generated
- [ ] PDF exported
- [ ] Metadata complete
- [ ] Manifest generated
- [ ] Naming verified
- [ ] Version assigned
- [ ] Accessibility validated
- [ ] Performance verified
- [ ] Package approved

---

# Quality Checklist

Every export must pass:

- [ ] Visual Review
- [ ] Brand Review
- [ ] Accessibility Review
- [ ] Export Validation
- [ ] File Integrity Check
- [ ] Metadata Validation
- [ ] Version Review
- [ ] Packaging Review

---

# Common Mistakes

Avoid:

- Editing exported assets
- Missing metadata
- Large file sizes
- Inconsistent naming
- Missing versions
- Broken transparency
- Embedded fonts without approval
- Releasing unapproved exports

---

# Best Practices

- Maintain one master source.
- Automate exports.
- Optimize every asset.
- Preserve accessibility.
- Use semantic versioning.
- Archive previous releases.
- Publish through approved channels.
- Keep metadata synchronized.
- Validate before release.
- Document every export.

---

# Related Documents

- README.md
- illustration-guidelines.md
- illustration-style.md
- illustration-library.md
- hero-illustrations.md
- onboarding-illustrations.md
- empty-state-illustrations.md
- marketing-illustrations.md
- product-illustrations.md
- ai-workforce-illustrations.md
- technical-illustrations.md
- workflow-illustrations.md
- source-files.md
- changelog.md
- ../branding/branding-guide.md
- ../assets-guidelines.md

---

# Version History

| Version | Date | Description |
|----------|------------|------------------------------|
| 1.0.0 | 2026-07-10 | Initial enterprise illustration export standard |

---

# Next Document

```text
docs/
└── 18-assets/
    └── illustrations/
        └── source-files.md
```

---

**End of Document**