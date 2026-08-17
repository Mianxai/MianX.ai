# Logo Exports

> Enterprise standards for exporting, validating, optimizing, publishing, and maintaining logo files across the Mianx.ai ecosystem.

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | Logo Exports |
| Folder | docs/18-assets/logos |
| File Name | logo-exports.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Brand, Design & Asset Management Department |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

This document defines the official export standards for all logo assets used across the Mianx.ai ecosystem.

It ensures that company, product, department, AI workforce, partner, and event logos are exported consistently for digital, print, mobile, web, presentation, documentation, and marketing use.

---

# Objectives

- Standardize logo export formats.
- Maintain visual quality.
- Prevent inconsistent output files.
- Support responsive applications.
- Enable reliable asset automation.
- Protect master source files.
- Reduce unnecessary duplication.
- Improve performance and accessibility.
- Maintain complete export traceability.
- Support enterprise release governance.

---

# Scope

These standards apply to exports for:

- Company Logos
- Product Logos
- Department Logos
- AI Workforce Avatars
- AI Team Identities
- Partner Logos
- Event Logos
- Wordmarks
- Brand Symbols
- Favicons
- App Icons
- Social Media Avatars
- Presentation Logos
- Print Logos
- Merchandise Logos
- Co-branding Lockups
- Certification Badges

---

# Core Principle

All production exports must be generated from an approved master source.

The approved flow is:

```text
Approved Master Source

↓

Export Configuration

↓

Automated or Controlled Export

↓

Technical Validation

↓

Brand Validation

↓

Metadata Registration

↓

Official Release
```

Never treat an edited PNG, screenshot, or downloaded copy as the master source.

---

# Export Categories

Official exports are divided into:

- Vector Exports
- Raster Exports
- Print Exports
- Web Exports
- Mobile Exports
- Favicon Exports
- Social Media Exports
- Presentation Exports
- Video Exports
- Co-branding Exports
- Archive Exports

---

# Vector Exports

Preferred vector formats:

- SVG
- PDF
- EPS

Vector exports should be used where scalability is required.

Recommended uses:

- Websites
- Applications
- Documentation
- Presentations
- Print Production
- Large-format Signage
- Merchandise
- Architecture Diagrams

---

# SVG Standard

SVG is the preferred digital logo format.

Every SVG should:

- Use a valid `viewBox`.
- Scale proportionally.
- Avoid unnecessary embedded metadata.
- Avoid hidden layers.
- Avoid unsupported filters.
- Avoid linked external resources.
- Avoid raster images unless explicitly required.
- Use optimized vector paths.
- Preserve approved colors.
- Render correctly on supported browsers.
- Maintain transparent backgrounds where required.

---

# SVG Security Requirements

Before publishing an SVG:

- Remove embedded scripts.
- Remove unsafe external links.
- Remove event handlers.
- Remove unnecessary comments.
- Remove editor-specific metadata where appropriate.
- Validate XML structure.
- Confirm no hidden malicious content exists.
- Confirm all assets are embedded or approved.

SVG files from third parties must receive additional security review.

---

# SVG Typography

Preferred approach:

- Convert custom logo lettering to approved vector outlines where licensing permits.
- Preserve a separate editable source containing live text.
- Avoid relying on user-installed fonts in production exports.

Do not convert ordinary document text into outlines unless required.

---

# SVG View Box

Every SVG must include a correctly defined view box.

Example:

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 512 128"
  role="img"
>
</svg>
```

The view box should tightly contain the approved artwork without clipping or excessive whitespace.

---

# SVG Accessibility

Where an SVG is embedded directly in an interface:

- Provide an accessible name.
- Use `role="img"` where appropriate.
- Include a title or external label.
- Avoid duplicate announcements.
- Mark decorative logos appropriately.

Example:

```html
<svg role="img" aria-labelledby="mianx-logo-title">
  <title id="mianx-logo-title">Mianx.ai logo</title>
</svg>
```

When an external image file is used, accessibility should normally be handled through the surrounding HTML.

---

# SVG Optimization

SVG optimization may remove:

- Editor metadata
- Hidden layers
- Redundant groups
- Empty paths
- Duplicate definitions
- Excessive decimal precision
- Unused IDs

Optimization must never alter:

- Shape
- Color
- Spacing
- Proportions
- Trademark symbols
- Approved visual details

---

# Raster Exports

Approved raster formats:

- PNG
- WebP
- JPG, only when transparency is unnecessary

PNG is preferred for logos requiring transparency.

WebP may be used for optimized web delivery where supported.

JPG should not be used for primary transparent logo assets.

---

# PNG Standard

PNG exports should:

- Preserve transparency.
- Use clean edges.
- Avoid visible compression artifacts.
- Use the correct color profile.
- Match approved dimensions.
- Use sufficient resolution.
- Avoid unnecessary canvas space.
- Maintain proportional scaling.

---

# PNG Density Variants

Digital products may require density-based exports.

Recommended pattern:

```text
logo.png

logo@2x.png

logo@3x.png

logo@4x.png
```

Example:

```text
mianx-logo-primary.png

mianx-logo-primary@2x.png

mianx-logo-primary@3x.png
```

The logical display size must be documented separately from pixel dimensions.

---

# WebP Standard

WebP may be used for:

- Website performance
- Marketing pages
- Documentation portals
- Preview images
- Social media previews

Use lossless or high-quality settings for logos.

Do not use aggressive lossy compression that damages sharp edges.

---

# JPG Usage

JPG may be used only for:

- Logo mockups with backgrounds
- Photographic compositions
- Social media visuals
- Presentation preview images

JPG must not replace transparent master exports.

---

# Color Modes

Use:

```text
RGB or sRGB
```

for:

- Web
- Mobile
- Digital Applications
- Presentations
- Video
- Social Media

Use:

```text
CMYK
```

for:

- Professional Printing
- Packaging
- Merchandise
- Large-format Production

Color conversions must be reviewed before release.

---

# Color Profile

Digital exports should use a consistent approved color profile.

Recommended default:

```text
sRGB
```

Print exports should follow the print provider's approved profile.

Never assume that digital RGB colors will reproduce identically in CMYK.

---

# Transparent Backgrounds

Transparent exports should be created for:

- Web Headers
- Mobile Interfaces
- Presentation Overlays
- Video Overlays
- Partner Lockups
- Event Graphics
- Merchandise Production

Transparency must be checked against:

- Light backgrounds
- Dark backgrounds
- Colored backgrounds
- Patterned backgrounds

---

# Background Variants

Where required, export:

- Light-background Variant
- Dark-background Variant
- Transparent Variant
- White Variant
- Black Variant
- Monochrome Variant

Do not generate a new background variant by applying automatic filters unless it has been approved.

---

# Standard Digital Sizes

Suggested raster export sizes may include:

```text
64 px
128 px
256 px
512 px
1024 px
2048 px
```

Actual export sizes must match the target platform.

Do not create every possible size without a real usage requirement.

---

# Primary Logo Export Sizes

Recommended digital export matrix:

| Usage | Suggested Width |
|-------|-----------------|
| Compact UI | 120 px |
| Standard Header | 240 px |
| High-density Header | 480 px |
| Presentation | 800 px |
| Marketing | 1200 px |
| Large Digital Display | 2400 px |

The exact approved minimum size remains governed by the logo-specific standard.

---

# Icon Export Sizes

Common icon sizes may include:

```text
16 × 16
24 × 24
32 × 32
40 × 40
48 × 48
64 × 64
96 × 96
128 × 128
192 × 192
256 × 256
512 × 512
1024 × 1024
```

Only required sizes should be generated.

---

# Favicon Exports

A favicon package may include:

```text
favicon.svg
favicon.ico
favicon-16x16.png
favicon-32x32.png
favicon-48x48.png
apple-touch-icon.png
site.webmanifest
```

The favicon should normally use the approved simplified brand symbol.

Do not use a full wordmark at sizes where it becomes unreadable.

---

# ICO Standard

Where an ICO file is required, it should contain approved sizes such as:

```text
16 × 16
32 × 32
48 × 48
```

The file must be tested in supported browser and desktop environments.

---

# Apple Touch Icon

Recommended requirements:

- Square canvas
- Approved brand symbol
- No critical content outside platform-safe areas
- No unnecessary transparency where the platform adds a background
- High-resolution export

Example filename:

```text
apple-touch-icon.png
```

---

# Web App Manifest Icons

A web application may require:

```text
icon-192.png
icon-512.png
icon-maskable-192.png
icon-maskable-512.png
```

Maskable icons must be designed with appropriate safe zones.

Do not create a maskable icon by simply enlarging the standard icon without review.

---

# Mobile App Icons

Mobile app icon exports should:

- Follow platform-specific safe areas.
- Avoid small text.
- Use the approved product or company symbol.
- Remain recognizable at small sizes.
- Support required adaptive or masked formats.
- Be tested on real devices or accurate previews.

Platform-generated corner rounding should not be permanently added unless required.

---

# Android App Icons

Android exports may require:

- Adaptive foreground
- Adaptive background
- Legacy icon
- Monochrome icon where supported
- Notification icon
- Store icon

Example structure:

```text
android/
├── adaptive-foreground.svg
├── adaptive-background.svg
├── notification-icon.svg
├── icon-192.png
└── icon-512.png
```

---

# iOS App Icons

iOS exports may require multiple sizes generated from one approved master.

The master icon should:

- Use a square canvas.
- Avoid transparent backgrounds where unsupported.
- Keep important details inside safe areas.
- Avoid pre-rendered corner rounding.
- Remain legible at small sizes.

---

# Notification Icons

Notification icons should be simplified.

They should:

- Use one approved symbol.
- Remain readable at very small sizes.
- Avoid complex color dependence.
- Follow platform rules.
- Remain distinct from unrelated application icons.

---

# Social Media Exports

Social media logo exports may include:

- Profile Avatar
- Cover Image
- Organization Logo
- Campaign Avatar
- Event Avatar
- Thumbnail Logo

Profile avatars should normally use the approved symbol rather than a detailed wordmark.

---

# Social Media Safe Area

Every social media export should account for:

- Circular cropping
- Rounded cropping
- Mobile display
- Desktop display
- Platform overlays
- UI buttons
- Responsive resizing

Keep the primary mark inside the defined safe area.

---

# Presentation Exports

Recommended formats:

- SVG
- PNG
- PDF

Presentation exports should:

- Remain sharp on large screens.
- Support light and dark templates.
- Avoid unnecessary animation.
- Maintain transparent backgrounds where required.
- Include a high-resolution raster fallback.

---

# Document Exports

For documents and reports, use:

- SVG where supported
- High-resolution PNG
- Vector PDF for print-ready documents

Avoid low-resolution screenshots of logos.

---

# Email Signature Exports

Email signatures should use:

- Optimized PNG
- Small file size
- Appropriate display dimensions
- High-density source where needed
- Accessible alternative text
- Secure hosted asset paths where applicable

Do not embed very large logo files into every email.

---

# Video Exports

Video and broadcast usage may require:

- Transparent PNG
- SVG
- Approved animation file
- High-resolution raster
- Light and dark variants
- Safe-area reference

Logo animations must preserve:

- Shape
- Proportions
- Colors
- Brand identity
- Clear recognition

---

# Animated Logo Exports

Animated logos require separate approval.

Possible formats:

- Lottie JSON
- MP4
- WebM
- GIF, limited use
- Motion source project

Animations must not:

- Distort the logo.
- Introduce unofficial colors.
- Reduce recognizability.
- Create excessive flashing.
- violate accessibility requirements.

---

# Print Exports

Preferred print formats:

- PDF
- EPS
- AI
- High-resolution PNG where required

Print-ready exports should include:

- Correct color mode
- Correct color profile
- Vector artwork where possible
- Approved bleed where part of a larger composition
- Clean transparent or defined background
- Production notes where required

---

# Print Resolution

Raster print assets should normally be prepared at sufficient production resolution.

Recommended baseline:

```text
300 DPI at final print size
```

Large-format production may use different requirements based on viewing distance and vendor specifications.

---

# EPS Exports

EPS may be used for:

- Legacy print workflows
- Embroidery vendors
- Signage vendors
- Merchandise suppliers
- Specialized production systems

EPS exports should be checked for:

- Font handling
- Color accuracy
- Transparency limitations
- Path integrity
- Compatibility with the production vendor

---

# PDF Exports

Vector PDF is preferred for many print and distribution workflows.

PDF exports should:

- Preserve vectors.
- Use approved color mode.
- Avoid unnecessary page margins.
- Avoid hidden layers.
- Maintain correct dimensions.
- Include only approved artwork.
- Be tested in common PDF viewers.

---

# Merchandise Exports

Merchandise production may require:

- Vector PDF
- EPS
- AI
- SVG
- High-resolution PNG
- Embroidery-specific formats from approved vendors

Every production file must include:

- Product name
- Logo version
- Intended dimensions
- Color specification
- Placement reference
- Production method
- Approval reference

---

# Embroidery Exports

Embroidery requires specialized preparation.

The process may include:

- Simplified shapes
- Minimum stitch-safe detail
- Approved thread colors
- Digitization
- Production sample
- Quality review

The embroidered version must remain recognizable and approved.

---

# Engraving Exports

Engraving files should normally use:

- Monochrome vector paths
- Simplified approved details
- Correct dimensions
- No unnecessary fills
- Clean line geometry

---

# Large-format Exports

Large-format uses include:

- Stage Screens
- Banners
- Building Signage
- Exhibition Booths
- Vehicle Graphics
- Event Backdrops

Use vector files where possible.

Test:

- Viewing distance
- Lighting
- Contrast
- Cropping
- Production scale
- Sponsor readability

---

# Co-branding Exports

Co-branding exports must preserve:

- Separate logo ownership
- Approved hierarchy
- Approved clear space
- Correct relationship wording
- Individual logo proportions
- Partner permissions
- Usage expiry

The combined export must receive separate approval.

---

# Partner Logo Exports

Partner logo processing must remain limited to permitted technical changes.

Allowed where approved:

- File-format conversion
- Size-specific export
- Transparent-background export
- Safe optimization

Not allowed without permission:

- Recoloring
- Redrawing
- Simplification
- Typography changes
- Symbol changes
- Trademark removal

---

# AI Workforce Avatar Exports

AI workforce exports may include:

```text
avatar-32.png
avatar-48.png
avatar-64.png
avatar-128.png
avatar-256.png
avatar-512.png
avatar.svg
profile-lockup.svg
badge.svg
```

Dynamic runtime status must not be permanently included in the master avatar export.

---

# Responsive Logo Export System

The export system should support:

- Full Logo
- Compact Logo
- Wordmark
- Symbol
- Favicon
- App Icon

Recommended selection:

| Available Space | Export |
|-----------------|--------|
| Large | Full Logo |
| Medium | Horizontal or Compact Logo |
| Small | Symbol |
| Very Small | Favicon or Simplified Icon |

---

# Export Naming Convention

Use lowercase kebab-case.

General pattern:

```text
{brand-or-entity}-{asset-type}-{variant}-{size}-{version}.{extension}
```

Examples:

```text
mianx-logo-primary-light-v1.svg

mianx-logo-primary-480-v1.png

ai-workforce-symbol-dark-v1.svg

engineering-department-logo-monochrome-v1.pdf

ai-summit-2026-logo-primary-v1.svg
```

---

# Density Naming

Use:

```text
@2x
@3x
@4x
```

only where platform workflows expect density notation.

Example:

```text
mianx-logo-header@2x.png
```

Do not combine density notation and misleading logical sizes.

---

# Size Naming

Where dimensions are important, include them explicitly.

Example:

```text
mianx-symbol-128x128-v1.png
```

Use:

```text
widthxheight
```

rather than ambiguous labels such as:

```text
small
medium
large
```

unless those labels are formally defined in the design system.

---

# Version Naming

The released asset version should be included where required.

Example:

```text
mianx-logo-primary-v1.svg
```

Avoid filenames such as:

```text
final.svg

latest.png

new-logo.svg

logo-final-final-2.png
```

---

# Export Folder Structure

Recommended structure:

```text
exports/

├── digital/
│   ├── svg/
│   ├── png/
│   └── webp/
├── web/
├── mobile/
│   ├── ios/
│   └── android/
├── favicon/
├── social-media/
├── presentations/
├── video/
├── print/
│   ├── pdf/
│   └── eps/
├── merchandise/
├── co-branding/
├── metadata/
└── archived/
```

Create only the folders required by actual export workflows.

---

# Per-logo Export Structure

Recommended structure:

```text
exports/

└── mianx-logo/
    ├── current/
    │   ├── svg/
    │   ├── png/
    │   ├── webp/
    │   ├── print/
    │   ├── favicon/
    │   └── metadata/
    └── archived/
        └── v1.0.0/
```

---

# Export Manifest

Every release should include an export manifest.

Example:

```json
{
  "asset_id": "LOGO-COMPANY-MIANX-001",
  "source_version": "1.0.0",
  "export_release": "1.0.0",
  "generated_at": "YYYY-MM-DDTHH:MM:SSZ",
  "generated_by": "asset-export-pipeline",
  "files": [
    {
      "path": "svg/mianx-logo-primary-v1.svg",
      "format": "svg",
      "variant": "primary"
    },
    {
      "path": "png/mianx-logo-primary-512-v1.png",
      "format": "png",
      "width": 512
    }
  ]
}
```

---

# Required Export Metadata

Each export should track:

| Field | Description |
|------|-------------|
| Export ID | Unique export identifier |
| Asset ID | Linked master logo identifier |
| Source Version | Master source version |
| Export Version | Export package version |
| Format | SVG, PNG, PDF, or other |
| Variant | Primary, dark, light, or other |
| Width | Pixel or physical width |
| Height | Pixel or physical height |
| Density | 1x, 2x, or other |
| Color Mode | RGB, CMYK, or monochrome |
| Color Profile | Applied profile |
| Background | Transparent, light, dark, or defined |
| Generated Date | Export timestamp |
| Generated By | Person or automation |
| Validation Status | Pass, fail, or warning |
| Approval Status | Draft, approved, or archived |
| Checksum | File integrity checksum |
| Source Path | Linked master source |
| Destination | Intended usage or platform |

---

# Export ID Standard

Recommended pattern:

```text
EXPORT-{ASSET-ID}-{FORMAT}-{NUMBER}
```

Example:

```text
EXPORT-LOGO-COMPANY-MIANX-001-SVG-001
```

---

# Export Versioning

Export packages should follow semantic versioning.

| Change Type | Example | Meaning |
|-------------|---------|---------|
| Major | 2.0.0 | New source-logo version |
| Minor | 1.1.0 | New export format or variant |
| Patch | 1.0.1 | Corrected export without visual redesign |

A changed source logo must trigger review of all dependent exports.

---

# Source and Export Relationship

Every export must link back to one approved source.

```text
Master Asset ID

↓

Source Version

↓

Export Package Version

↓

Individual Export ID
```

An export without a valid source reference must not be treated as official.

---

# Export Pipeline

Recommended pipeline:

```text
Approved Source Selected

↓

Source Version Verified

↓

Export Configuration Loaded

↓

Formats Generated

↓

Dimensions Validated

↓

Colors Validated

↓

SVG Security Scan

↓

Raster Quality Check

↓

Naming Validation

↓

Metadata Generated

↓

Checksum Generated

↓

Brand Review

↓

Release Approved

↓

Exports Published
```

---

# Automated Export Configuration

A controlled export configuration may define:

```yaml
asset_id: LOGO-COMPANY-MIANX-001
source_version: 1.0.0

exports:
  - format: svg
    variant: primary

  - format: png
    variant: primary
    sizes:
      - 128
      - 256
      - 512
      - 1024

  - format: webp
    variant: primary
    sizes:
      - 512
```

The exact configuration format should be standardized by the asset platform.

---

# Export Validation

Every export package should be validated for:

- Correct source version
- Correct visual variant
- Correct dimensions
- Correct aspect ratio
- Correct colors
- Correct transparency
- Correct file format
- Correct naming
- Correct metadata
- No clipping
- No distortion
- No excessive whitespace
- No broken paths
- No unauthorized fonts
- No hidden unsafe content
- Correct checksum

---

# Aspect Ratio Validation

Every export must preserve the approved aspect ratio.

Automated validation should fail when:

- Width or height is altered incorrectly.
- The logo is stretched.
- The logo is compressed.
- The symbol is cropped.
- Padding is changed beyond approved limits.

---

# Visual Regression Validation

Where possible, compare generated exports with approved reference images.

Visual regression checks may detect:

- Color changes
- Missing elements
- Path changes
- Alignment changes
- Unexpected whitespace
- Cropping
- Transparency issues

---

# Color Validation

Color validation should confirm:

- Approved color tokens
- Correct color mode
- Correct background variant
- No unexpected substitutions
- No accidental grayscale conversion
- No unauthorized gradients
- Partner colors remain unchanged

---

# Transparency Validation

Transparency checks should confirm:

- Background is genuinely transparent where required.
- No white rectangle is embedded.
- No semi-transparent halo exists.
- Edges remain clean.
- Dark and light background previews remain correct.

---

# File Integrity

Every released export should have a checksum.

Possible checksum record:

```text
SHA-256
```

Checksums support:

- Integrity verification
- Duplicate detection
- Tamper detection
- Release validation
- Archive comparison

---

# Duplicate Detection

The asset system should detect:

- Identical files with different names
- Duplicate exports across folders
- Old exports copied into active folders
- Unofficial edited variants
- Multiple files claiming to be current

---

# File Size Optimization

Exports should be optimized without reducing visual quality.

Optimization may include:

- SVG cleanup
- Lossless PNG compression
- WebP conversion
- Metadata cleanup
- Duplicate color-profile removal
- Unused layer removal

Do not optimize production master files destructively.

---

# Performance Targets

Digital logo exports should be as small as reasonably possible while preserving quality.

Performance review should consider:

- Page-load impact
- Email size
- Mobile data usage
- Caching
- Rendering cost
- Bundle size
- CDN delivery

No universal file-size target should override visual or legal requirements.

---

# Browser Testing

Web exports should be tested on supported environments.

Testing should verify:

- Rendering
- Transparency
- Scaling
- Dark mode
- High-density display
- Responsive layout
- Accessibility labeling
- Caching behavior

---

# Device Testing

Mobile and application icons should be tested on:

- Small-screen devices
- High-density displays
- Light themes
- Dark themes
- Home screens
- Notification areas
- App switchers
- Store previews

---

# Print Proofing

Before large production runs:

- Create a proof.
- Verify dimensions.
- Verify colors.
- Verify line detail.
- Verify clear space.
- Verify material behavior.
- Verify production placement.
- Obtain approval.

---

# Release States

Approved export states:

| State | Meaning |
|-------|---------|
| Generated | Export created but not validated |
| Validating | Technical checks are in progress |
| Review Required | Human review is needed |
| Approved | Ready for official use |
| Published | Available to authorized users |
| Superseded | Replaced by a newer release |
| Deprecated | Must not be used for new work |
| Archived | Retained for history |

---

# Export Approval Workflow

```text
Export Request

↓

Source Validation

↓

Export Generation

↓

Automated Technical Validation

↓

Design Review

↓

Brand Review

↓

Platform Review Where Required

↓

Approval

↓

Publication

↓

Usage Monitoring

↓

Archive
```

---

# Approval Roles

| Role | Responsibility |
|------|----------------|
| Brand Designer | Confirms visual accuracy |
| Asset Manager | Controls export generation and storage |
| Design Lead | Reviews quality and variants |
| Platform Engineer | Reviews web and application formats |
| Mobile Engineer | Reviews mobile icons |
| Print Production Owner | Reviews print files |
| Security Reviewer | Reviews SVG and third-party assets |
| Brand Owner | Approves official release |
| Governance Team | Reviews exceptions and audit records |

---

# Access Control

Recommended permissions:

| Action | Access |
|--------|--------|
| View Approved Exports | Authorized Organization Users |
| Download Approved Exports | Approved Teams |
| Generate Draft Exports | Designers and Asset Automation |
| Modify Export Configuration | Asset Managers |
| Approve Exports | Brand and Design Leadership |
| Publish Exports | Asset Governance Team |
| Archive Releases | Asset Managers |
| Edit Source Files | Authorized Brand Designers |

---

# Distribution

Approved exports may be distributed through:

- Central Asset Repository
- Design System Package
- Internal CDN
- Developer Package
- Documentation Portal
- Marketing Asset Library
- Approved Shared Drive
- Controlled Partner Package

Do not distribute source files when only exports are required.

---

# CDN Delivery

Where logos are served through a CDN:

- Use versioned URLs.
- Set appropriate cache headers.
- Preserve immutable releases.
- Avoid replacing files behind existing versioned URLs.
- Maintain rollback capability.
- Track public exposure.
- Restrict confidential assets.

Example:

```text
/assets/logos/mianx/v1.0.0/mianx-logo-primary.svg
```

---

# Package Distribution

Developer packages may include:

```text
@organization/brand-assets
```

A package may expose:

- SVG Components
- Static Files
- Type Definitions
- Asset Manifest
- Version Information
- Usage Documentation

The package version must remain synchronized with the asset release.

---

# Usage Inventory

Maintain an inventory of where important exports are used.

| Export ID | Product or Channel | Location | Owner | Status |
|-----------|--------------------|----------|-------|--------|
| TBD | TBD | TBD | TBD | Planned |

This supports replacement and deprecation workflows.

---

# Export Replacement

When an export is replaced:

- Publish the new version.
- Mark the old version as superseded.
- Update usage inventory.
- Notify dependent teams.
- Define migration deadline.
- Preserve the old export.
- Verify replacements.
- Record completion.

---

# Deprecation Policy

Deprecated exports must:

- Be removed from active directories.
- Remain in the archive.
- Include a replacement reference.
- Include a deprecation date.
- Include a migration deadline.
- Trigger warnings in automated systems.

Do not delete released export history.

---

# Rollback

A rollback may be required when:

- Visual defects are found.
- Incorrect colors were exported.
- Files are corrupted.
- Security problems are discovered.
- Partner permissions change.
- Platform compatibility fails.

Rollback process:

```text
Issue Detected

↓

Affected Export Disabled

↓

Previous Approved Release Restored

↓

Dependent Teams Notified

↓

Corrected Release Prepared

↓

Incident Recorded
```

---

# AI Workforce Usage

AI agents may:

- Locate approved exports.
- Select the correct variant.
- Select the correct size.
- Check version status.
- Generate exports from approved configurations.
- Validate naming.
- Detect missing formats.
- Detect deprecated files.
- Generate manifests.
- Update usage inventories.

AI agents must not:

- Edit master artwork.
- Invent new logo variants.
- Recolor approved assets.
- Publish unvalidated files.
- Use deprecated exports.
- bypass brand approval.
- convert partner logos beyond permitted processing.
- replace versioned public files without governance.

---

# Automation Requirements

The asset platform should eventually support:

- Automated multi-format export
- SVG security scanning
- Aspect-ratio validation
- Color validation
- File-size optimization
- Metadata generation
- Checksum generation
- Duplicate detection
- Visual regression testing
- Naming validation
- Platform-specific icon generation
- Missing-export detection
- Deprecation warnings
- Usage inventory synchronization
- Release manifest generation

---

# Export Registry

Maintain a central export registry.

| Export ID | Asset ID | Format | Variant | Dimensions | Version | Status |
|-----------|----------|--------|---------|------------|---------|--------|
| TBD | TBD | TBD | TBD | TBD | TBD | Planned |

Only approved exports should be marked as published.

---

# Quality Checklist

Before approving a logo export package:

- [ ] Approved master source used
- [ ] Source version verified
- [ ] Required variants generated
- [ ] Required formats generated
- [ ] Required sizes generated
- [ ] Aspect ratio verified
- [ ] Colors verified
- [ ] Transparency verified
- [ ] SVG security scan passed
- [ ] Vector paths reviewed
- [ ] Raster edges reviewed
- [ ] File sizes optimized
- [ ] Naming convention followed
- [ ] Metadata generated
- [ ] Checksums generated
- [ ] Accessibility requirements reviewed
- [ ] Platform testing completed where required
- [ ] Print proof completed where required
- [ ] Brand approval recorded
- [ ] Export manifest completed
- [ ] Release status updated

---

# Web Export Checklist

- [ ] SVG contains valid view box
- [ ] Unsafe SVG content removed
- [ ] Responsive scaling tested
- [ ] Light and dark backgrounds tested
- [ ] High-density display tested
- [ ] File size optimized
- [ ] Accessible labeling documented
- [ ] Browser compatibility verified
- [ ] CDN path versioned

---

# Mobile Export Checklist

- [ ] Master app icon approved
- [ ] Safe areas verified
- [ ] Required sizes generated
- [ ] Android adaptive assets generated where required
- [ ] iOS exports generated where required
- [ ] Notification icon tested
- [ ] Small-size recognition verified
- [ ] Store preview tested
- [ ] Dark and light environment reviewed

---

# Print Export Checklist

- [ ] Vector file available
- [ ] Color mode verified
- [ ] Color profile verified
- [ ] Final dimensions confirmed
- [ ] Production method documented
- [ ] Clear space verified
- [ ] Fine details tested
- [ ] Vendor requirements checked
- [ ] Physical proof approved

---

# Common Mistakes

Avoid:

- Exporting from an outdated master file.
- Using screenshots as official logos.
- Stretching raster files.
- Publishing SVG files with scripts.
- Using JPG for transparent logos.
- Generating excessive unused sizes.
- Applying automatic color inversion.
- Overwriting versioned exports.
- Removing partner trademark symbols.
- Using vague filenames.
- Forgetting dark-background variants.
- Storing source and export files together without distinction.
- Publishing files without metadata.
- Ignoring mobile safe areas.
- Failing to archive superseded exports.

---

# Related Documents

- README.md
- company-logos.md
- product-logos.md
- department-logos.md
- ai-workforce-logos.md
- partner-logos.md
- event-logos.md
- ../branding/logo-system.md
- ../branding/color-palette.md
- ../branding/typography.md
- ../assets-guidelines.md
- ../naming-conventions.md
- ../license.md
- ../exports/README.md
- ../design-system/README.md

---

# Best Practices

- Export only from approved master sources.
- Prefer SVG for scalable digital use.
- Use PNG when transparent raster output is required.
- Maintain separate light and dark variants.
- Generate only sizes required by real platforms.
- Keep export configurations version-controlled.
- Use automated validation wherever possible.
- Preserve checksums and release manifests.
- Keep public asset URLs versioned.
- Never overwrite released files silently.
- Test app icons on actual target environments.
- Proof print files before mass production.
- Keep source, export, release, and usage records synchronized.

---

# Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-07-10 | Initial enterprise logo export standard established |

---

# Next Document

```text
docs/
└── 18-assets/
    └── logos/
        └── logo-source-files.md
```

---

**End of Document**