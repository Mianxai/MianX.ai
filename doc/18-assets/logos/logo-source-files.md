# Logo Source Files

> Enterprise standards for creating, storing, editing, versioning, approving, backing up, recovering, and archiving official logo source files across the Mianx.ai ecosystem.

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | Logo Source Files |
| Folder | docs/18-assets/logos |
| File Name | logo-source-files.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Brand, Design & Asset Governance Department |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

This document defines the official source-file management standards for all logo assets used throughout the Mianx.ai ecosystem.

It establishes how master logo files must be:

- Created
- Stored
- Named
- Edited
- Reviewed
- Approved
- Versioned
- Backed up
- Recovered
- Archived
- Linked to production exports

The goal is to ensure that every official logo has one trusted, recoverable, and auditable master source.

---

# Objectives

- Establish one source of truth for each logo.
- Prevent accidental master-file loss.
- Eliminate duplicate and conflicting source files.
- Restrict unauthorized changes.
- Preserve complete version history.
- Support safe collaborative editing.
- Enable repeatable export generation.
- Maintain auditability.
- Protect third-party and partner assets.
- Support disaster recovery.
- Enable controlled AI and automation usage.

---

# Scope

These standards apply to source files for:

- Company Logos
- Product Logos
- Department Logos
- AI Workforce Identities
- AI Team Logos
- Partner Logos
- Event Logos
- Wordmarks
- Symbols
- App Icons
- Favicons
- Co-branding Lockups
- Certification Badges
- Monochrome Variants
- Animated Logo Masters
- Merchandise Logo Masters
- Print Production Masters

---

# Core Principle

Every official logo family must have one approved master source.

The official relationship is:

```text
Approved Master Source

↓

Approved Source Version

↓

Export Configuration

↓

Generated Production Exports

↓

Published Usage
```

Production exports must never become the new master source.

---

# Source of Truth

For each logo family, one source file must be designated as the official source of truth.

The source of truth must:

- Have a unique asset ID.
- Have a version number.
- Have a defined owner.
- Have restricted write access.
- Be stored in an approved repository.
- Be linked to its metadata.
- Be backed up.
- Be recoverable.
- Be approved before exports are generated.

---

# Approved Source Formats

Approved master formats may include:

- Figma
- Adobe Illustrator
- Master SVG
- Vector PDF
- Approved Motion Source Project
- Approved Design-System Component

The primary source format should be selected based on the asset type and workflow.

---

# Preferred Source Priority

Recommended priority:

1. Figma Master
2. Adobe Illustrator Master
3. Master SVG
4. Vector PDF
5. Controlled Legacy Source

The organization should avoid maintaining multiple competing masters.

---

# Figma Source Files

Figma may be used for:

- Logo Systems
- Responsive Variants
- Department Lockups
- AI Agent Avatar Components
- Product Logo Families
- Event Identity Systems
- Design Tokens
- Export Configurations

Figma files should use:

- Organized pages
- Named frames
- Approved components
- Locked master layers
- Documented variables
- Version history
- Clear ownership

---

# Recommended Figma Structure

```text
Logo Master File

├── 00-Cover
├── 01-Guidelines
├── 02-Construction
├── 03-Primary
├── 04-Secondary
├── 05-Symbol
├── 06-Wordmark
├── 07-Light
├── 08-Dark
├── 09-Monochrome
├── 10-Responsive
├── 11-Application-Icons
├── 12-Export-Frames
├── 13-Deprecated
└── 14-Archive
```

---

# Figma Component Rules

Master logo components should:

- Use approved naming.
- Be published only after approval.
- Keep proportions locked.
- Separate permanent and dynamic elements.
- Avoid detached uncontrolled copies.
- Use approved color variables.
- Use approved typography.
- Include light and dark variants.
- Include clear-space references.

---

# Adobe Illustrator Source Files

Adobe Illustrator may be used for:

- Precision Vector Construction
- Print Production
- Complex Path Editing
- Merchandise Preparation
- Embroidery Preparation
- Signage
- Packaging
- Legacy Vendor Workflows

Illustrator files should:

- Use organized layers.
- Use approved swatches.
- Avoid hidden unused artwork.
- Preserve editable paths.
- Include construction guides.
- Use descriptive artboard names.
- Avoid linked local assets where possible.
- Include document color-mode information.

---

# Recommended Illustrator Layers

```text
01-Guides
02-Construction
03-Symbol
04-Wordmark
05-Endorsement
06-Color
07-Light
08-Dark
09-Monochrome
10-Export
11-Notes
12-Deprecated
```

---

# Master SVG Files

A master SVG may be used where:

- The logo is simple.
- Browser compatibility matters.
- The SVG is maintained through code.
- A design-system workflow exists.
- The asset requires programmatic validation.

Master SVG files must remain:

- Human-readable where practical
- Secure
- Valid
- Version-controlled
- Free from embedded scripts
- Linked to metadata
- Separate from optimized production exports

---

# Master SVG vs Production SVG

The master SVG may contain:

- Descriptive IDs
- Editable groups
- Construction structure
- Design metadata
- Logical layers

The production SVG may be:

- Optimized
- Minified
- Stripped of editor metadata
- Prepared for web delivery

The optimized production SVG must not replace the editable master SVG.

---

# Vector PDF Source

Vector PDF may be used as a controlled source when:

- Supplied by a partner
- Supplied by a vendor
- Required by print production
- No editable original is legally available
- A legacy logo cannot be recovered in another format

The limitation must be documented in metadata.

---

# Motion Source Files

Animated logos may require:

- After Effects Project
- Figma Motion Prototype
- Lottie Source
- Approved Animation Timeline
- Audio-free Brand Motion Master

Motion source files must link back to the approved static logo source.

Animation must not redefine the logo geometry without approval.

---

# Partner Source Files

Partner logo source files must remain unchanged.

Store separately:

```text
Original Partner File

↓

Approved Internal Working Copy

↓

Approved Technical Export
```

Never overwrite the original partner-supplied asset.

---

# Original File Preservation

Original files must preserve:

- Original filename
- Original format
- Original delivery date
- Original owner
- Original source
- Original checksum
- Original permissions
- Original usage restrictions

---

# Source File Categories

Official source files may be classified as:

| Category | Description |
|----------|-------------|
| Master | Current approved editable source |
| Working | In-progress editable file |
| Review | Candidate submitted for approval |
| Released | Approved source version |
| Deprecated | Replaced source version |
| Archived | Read-only historical version |
| External Original | Unmodified third-party source |

---

# Source File Lifecycle

```text
Requested

↓

Working Draft

↓

Internal Review

↓

Brand Review

↓

Governance Review

↓

Approved Master

↓

Released

↓

Revised

↓

Deprecated

↓

Archived
```

---

# Working Files

Working files may contain:

- Draft concepts
- Explorations
- Rejected directions
- Construction tests
- Temporary variants
- Review notes

Working files must be clearly separated from approved master files.

---

# Approved Master Files

An approved master must:

- Contain the final geometry.
- Use approved colors.
- Use approved typography.
- Include required variants.
- Include construction references.
- Include correct metadata.
- Have approval evidence.
- Have a unique version.
- Be read-only for unauthorized users.

---

# Draft and Production Separation

Recommended structure:

```text
source-files/

├── working/
├── review/
├── approved/
├── deprecated/
├── archived/
└── external-originals/
```

Draft files must never be stored inside the production export folder.

---

# Source File Naming Convention

Use lowercase kebab-case.

General pattern:

```text
{entity-name}-{asset-type}-{status}-{version}.{extension}
```

Examples:

```text
mianx-logo-master-approved-v1.fig

mianx-logo-master-approved-v1.ai

ai-workforce-avatar-system-master-v1.fig

engineering-department-logo-master-v1.ai

ai-summit-event-logo-master-v1.fig
```

---

# Draft File Naming

Examples:

```text
mianx-logo-concept-draft-v0.1.fig

product-logo-review-candidate-v0.8.ai

event-logo-working-v0.4.fig
```

Do not use:

```text
final.fig

new-logo.ai

latest-master.fig

logo-final-final-2.ai
```

---

# Source Versioning

Source files must use semantic versioning.

| Change Type | Example | Meaning |
|-------------|---------|---------|
| Major | 2.0.0 | Significant redesign or rebrand |
| Minor | 1.1.0 | New approved variant or structural addition |
| Patch | 1.0.1 | Small technical correction |

Drafts may use pre-release versions.

Examples:

```text
0.1.0

0.5.0

1.0.0-rc.1
```

---

# Version Immutability

Once a source version is released:

- It must not be silently overwritten.
- It must not be renamed as a new version.
- It must remain recoverable.
- It must retain its checksum.
- It must retain approval records.
- Any correction must create a new version.

---

# Source File Identifier

Recommended pattern:

```text
SOURCE-{ASSET-ID}-{FORMAT}-{NUMBER}
```

Example:

```text
SOURCE-LOGO-COMPANY-MIANX-001-FIG-001
```

---

# Required Source Metadata

Each source file must include:

| Field | Description |
|------|-------------|
| Source ID | Unique source-file identifier |
| Asset ID | Linked logo asset identifier |
| Entity Name | Company, product, department, agent, partner, or event |
| Source Type | Figma, AI, SVG, PDF, or motion |
| Version | Source-file version |
| Status | Working, Review, Approved, Deprecated, Archived |
| Owner | Responsible asset owner |
| Designer | Original or current designer |
| Reviewer | Brand reviewer |
| Approved By | Final approver |
| Created Date | Original creation date |
| Modified Date | Last controlled modification |
| Approved Date | Release approval date |
| Repository Path | Official storage path |
| Checksum | Integrity checksum |
| License | Licensing status |
| Export Package | Linked export release |
| Replacement Source | New source where applicable |
| Classification | Access classification |
| Backup Status | Backup verification status |

---

# Metadata Example

```json
{
  "source_id": "SOURCE-LOGO-COMPANY-MIANX-001-FIG-001",
  "asset_id": "LOGO-COMPANY-MIANX-001",
  "entity_name": "Mianx.ai",
  "source_type": "Figma",
  "version": "1.0.0",
  "status": "Approved",
  "owner": "Brand Department",
  "repository_path": "logos/company/source-files/approved/",
  "classification": "Internal"
}
```

---

# Source Manifest

Every logo family should maintain a source manifest.

Example:

```yaml
asset_id: LOGO-COMPANY-MIANX-001
active_source:
  source_id: SOURCE-LOGO-COMPANY-MIANX-001-FIG-001
  type: figma
  version: 1.0.0
  status: approved

secondary_sources:
  - source_id: SOURCE-LOGO-COMPANY-MIANX-001-AI-001
    type: illustrator
    version: 1.0.0
    status: approved-print-source
```

---

# Primary and Secondary Sources

A logo may have:

- One primary master source
- One approved secondary production source

Example:

```text
Primary:
Figma Master

Secondary:
Illustrator Print Master
```

The relationship between both sources must be documented.

---

# Source Synchronization

When multiple approved source formats exist:

- Define which one is authoritative.
- Define synchronization responsibility.
- Compare geometry.
- Compare colors.
- Compare typography.
- Compare spacing.
- Record update date.
- Prevent independent redesign.

---

# Editing Permissions

Recommended access model:

| Action | Access |
|--------|--------|
| View Approved Sources | Authorized Design and Governance Users |
| Comment | Reviewers and Stakeholders |
| Create Working Copy | Authorized Designers |
| Edit Master | Design Owners |
| Approve Master | Brand Leadership |
| Change Metadata | Asset Managers |
| Archive Source | Asset Governance Team |
| Restore Source | Authorized Administrators |
| Export Production Assets | Approved Pipeline or Asset Managers |

---

# Least Privilege

Source-file access must follow least-privilege principles.

Users should receive only the permissions required for their role.

Master source editing must be restricted.

---

# Ownership

Each source file must have:

- Business Owner
- Brand Owner
- Design Owner
- Technical Custodian
- Backup Owner
- Approval Authority

One individual may perform multiple roles, but responsibilities must remain documented.

---

# Responsibility Matrix

| Role | Responsibility |
|------|----------------|
| Brand Owner | Protects visual identity |
| Design Owner | Maintains master source |
| Asset Manager | Controls metadata and release |
| Legal Reviewer | Reviews licensing and third-party rights |
| Security Reviewer | Reviews repository and file safety |
| Backup Administrator | Ensures recoverability |
| Governance Team | Reviews exceptions and audits |
| Department or Product Owner | Confirms business requirements |

---

# Source File Checkout

Before editing an approved master:

- Confirm editing authority.
- Create a controlled working branch or copy.
- Record change request.
- Lock or mark the active master where required.
- Avoid concurrent uncontrolled edits.
- Preserve the current released version.

---

# Branching Model

Recommended source workflow:

```text
Approved Main Source

↓

Controlled Working Branch

↓

Review Candidate

↓

Approved Merge

↓

New Released Version
```

---

# Figma Branching

Where Figma branching is available:

- Create a branch for major changes.
- Name the branch clearly.
- Link the change request.
- Use review comments.
- Resolve conflicts.
- Merge only after approval.
- Preserve release checkpoints.

---

# File-based Branching

For file-based tools:

```text
approved/
└── v1.0.0/

working/
└── change-request-001/

review/
└── v1.1.0-rc.1/

approved/
└── v1.1.0/
```

---

# Change Request Requirement

Every source change should have a documented request.

The request should include:

- Change ID
- Reason
- Requested By
- Affected Logo
- Risk Level
- Required Variants
- Deadline
- Reviewers
- Approval Status
- Rollback Plan

---

# Change Classification

| Change Level | Description |
|--------------|-------------|
| Low | Technical cleanup with no visible change |
| Medium | New variant or small visible adjustment |
| High | Major redesign or brand-impacting change |
| Critical | Emergency correction due to legal, security, or reputational issue |

---

# Editing Rules

Always:

- Work from the current approved source.
- Preserve geometry.
- Use approved tokens.
- Keep guides and construction references.
- Record change notes.
- Create a new version.
- Validate all variants.
- Generate new exports after approval.

Never:

- Edit a production PNG as the master.
- Work from an emailed screenshot.
- Overwrite a released version.
- Detach the asset from metadata.
- Publish directly from a draft file.
- Use unlicensed fonts.
- modify partner originals.
- remove approval history.

---

# Layer Naming

Use descriptive layer names.

Examples:

```text
symbol-primary

wordmark

endorsement

clear-space-guide

dark-variant

light-variant

monochrome-variant

export-frame
```

Avoid:

```text
Layer 1

Group 23

Copy 4

Final Shape
```

---

# Artboard and Frame Naming

Recommended pattern:

```text
{variant}/{background}/{orientation}/{usage}
```

Examples:

```text
primary/light/horizontal/web

primary/dark/stacked/presentation

symbol/transparent/square/app-icon
```

---

# Color Management

Source files must use approved colors.

Maintain:

- Brand color tokens
- Print swatches
- Digital values
- Light and dark variants
- Monochrome values
- Partner-provided colors

Do not use unnamed local colors where reusable variables or swatches exist.

---

# Typography Management

Logo typography must:

- Use approved fonts.
- Maintain licensing records.
- Preserve editable text in source files.
- Include outlined production variants where required.
- Avoid accidental font substitution.
- Document custom lettering.

---

# Font Packaging

Font files must not be embedded or distributed without licensing permission.

Where editable source access requires a font:

- Record the font name.
- Record the license.
- Record the approved installation source.
- Provide fallback handling instructions.
- Preserve outlined production exports.

---

# Linked Asset Management

Avoid fragile external links.

Where linked files are required:

- Store them in an approved repository.
- Use stable paths.
- Record dependencies.
- Include them in backup scope.
- Validate links before release.
- Avoid personal-device paths.

Incorrect example:

```text
/Users/designer/Desktop/logo-reference.png
```

---

# Embedded Assets

Embed only approved assets.

Before embedding:

- Verify licensing.
- Verify source.
- Verify resolution.
- Verify color profile.
- Verify security.
- Record ownership.

---

# Source File Validation

Before approval, validate:

- Correct asset ID
- Correct version
- Correct geometry
- Correct proportions
- Correct colors
- Correct typography
- Correct variants
- Correct clear space
- Correct metadata
- Correct layer structure
- No hidden unauthorized assets
- No missing links
- No font substitution
- No duplicate masters
- No unexplained raster elements

---

# Visual Comparison

Compare the new source against the previous release.

Review:

- Symbol geometry
- Wordmark geometry
- Spacing
- Alignment
- Color
- Clear space
- Minimum size
- Background behavior
- Co-branding compatibility
- Export output

---

# Approval Workflow

```text
Change Request Approved

↓

Working Source Created

↓

Design Changes Completed

↓

Internal Design Review

↓

Brand Review

↓

Accessibility Review

↓

Legal Review Where Required

↓

Technical Validation

↓

Governance Approval

↓

New Master Version Approved

↓

Source Locked

↓

Exports Generated

↓

Release Published
```

---

# Approval Evidence

Approval records should include:

- Source ID
- Version
- Reviewer
- Decision
- Date
- Comments
- Conditions
- Approval Reference
- Linked Change Request

---

# Source Locking

After approval:

- Set the source to read-only where practical.
- Restrict editing permissions.
- Record the approved checksum.
- Create a release checkpoint.
- Generate exports from the locked version.
- Store approval metadata.

---

# Backup Strategy

Every approved source file must be backed up.

Recommended backup layers:

```text
Primary Repository

+

Secondary Backup

+

Offline or Immutable Backup
```

---

# Backup Requirements

Backups should include:

- Approved source files
- Working critical branches
- Source metadata
- Approval records
- Export configurations
- Source manifests
- Partner original files
- Licensing records
- Checksums

---

# Backup Frequency

Recommended schedule:

| Asset Type | Frequency |
|------------|-----------|
| Active Master Sources | Daily |
| Working Files | Daily |
| Released Versions | On Every Release |
| Partner Originals | On Ingestion |
| Metadata Registry | Daily |
| Full Asset Archive | Weekly |
| Immutable Snapshot | Monthly |

---

# Backup Retention

Suggested retention policy:

| Backup Type | Retention |
|-------------|-----------|
| Daily | 30 Days |
| Weekly | 12 Weeks |
| Monthly | 12 Months |
| Released Master | Indefinite |
| Archived Brand Version | Indefinite |
| Partner Original | Based on Agreement and Legal Policy |

Actual retention must follow organization policy.

---

# Immutable Backup

Released logo sources should have an immutable backup.

An immutable backup should prevent:

- Silent overwrite
- Unauthorized deletion
- Ransomware modification
- Accidental editing
- History manipulation

---

# Backup Verification

Backups must be tested.

Verify:

- File availability
- Checksum integrity
- Metadata completeness
- Permission records
- Restore success
- Source compatibility
- Linked dependency availability

---

# Recovery Objectives

The asset-governance team should define:

- Recovery Time Objective
- Recovery Point Objective
- Criticality level
- Responsible owner
- Recovery procedure

Brand-critical master sources should receive the highest recovery priority.

---

# Recovery Workflow

```text
Loss or Corruption Detected

↓

Incident Recorded

↓

Affected Source Identified

↓

Latest Valid Backup Located

↓

Checksum Verified

↓

Source Restored to Controlled Area

↓

Design and Brand Review

↓

Repository Restored

↓

Exports Revalidated

↓

Incident Closed
```

---

# Recovery Testing

Recovery tests should be performed:

- Quarterly for critical company logos
- Semi-annually for product and department logos
- Annually for archived event assets
- After repository migrations
- After backup-system changes

---

# Corrupted Source Files

When corruption is detected:

- Stop editing.
- Preserve the corrupted file for investigation.
- Compare checksums.
- Identify the last valid version.
- Restore from backup.
- Verify visual integrity.
- Regenerate exports where necessary.
- Record the incident.

---

# Accidental Deletion

Deleted source files should be restored from:

1. Repository history
2. Trash or recovery area
3. Secondary backup
4. Immutable backup
5. Approved archive

Do not rebuild a logo from a production PNG unless no other recovery option exists.

---

# Disaster Recovery

Disaster scenarios may include:

- Repository failure
- Account compromise
- Ransomware
- Accidental mass deletion
- Vendor shutdown
- Tool lockout
- File corruption
- Permission loss

The disaster-recovery plan must ensure tool-independent access to critical assets.

---

# Tool Independence

Critical logo sources should not exist only inside one proprietary platform.

Maintain approved portable copies such as:

- Master SVG
- Vector PDF
- AI
- Export Manifest
- Metadata JSON

This supports recovery if a design platform becomes unavailable.

---

# Repository Migration

When moving source files to another platform:

- Inventory all files.
- Preserve folder structure.
- Preserve metadata.
- Preserve version history where possible.
- Preserve comments and approvals.
- Verify permissions.
- Generate checksums before and after migration.
- Test exports.
- Maintain rollback capability.

---

# Archive Policy

Archived source files must be:

- Read-only
- Versioned
- Indexed
- Searchable
- Linked to metadata
- Linked to replacement assets
- Backed up
- Retained according to policy

---

# Archive Structure

Recommended structure:

```text
archived/

└── {asset-id}/
    ├── v1.0.0/
    │   ├── source/
    │   ├── metadata/
    │   ├── approvals/
    │   └── exports/
    └── v2.0.0/
```

---

# Deprecation

When a source is deprecated:

- Mark the status.
- Record the reason.
- Record the replacement.
- Set migration deadline.
- Update export registry.
- Notify dependent teams.
- Move the source out of active editing areas.
- Preserve all records.

---

# Source Retirement

A source may be retired when:

- The logo is replaced.
- The product is closed.
- The department is merged.
- The event is completed.
- The partnership expires.
- The agent role is retired.
- The brand is restructured.

Retirement does not mean deletion.

---

# Active Source Registry

Maintain an official registry.

| Source ID | Asset ID | Entity | Format | Version | Status | Owner |
|-----------|----------|--------|--------|---------|--------|-------|
| TBD | TBD | TBD | TBD | TBD | Planned | TBD |

Only one source per defined source role should be marked active.

---

# Duplicate Source Detection

The asset platform should identify:

- Same file under different names
- Multiple sources marked as primary
- Old source copied into active folders
- Unapproved personal copies
- Export files stored as masters
- Partner originals modified internally
- Conflicting version numbers

---

# Checksum Management

Every approved source must have a checksum.

Recommended algorithm:

```text
SHA-256
```

Checksums should be recorded:

- At approval
- At backup
- At restore
- At migration
- Before export generation
- During audits

---

# Security Requirements

Source files must be protected from:

- Unauthorized editing
- Unauthorized download
- Public exposure
- Malware
- Embedded unsafe content
- Credential leakage
- Confidential partner disclosure
- Accidental sharing

---

# Repository Security

Recommended controls:

- Multi-factor authentication
- Role-based access control
- Audit logging
- Version history
- Encryption at rest
- Encryption in transit
- Backup encryption
- Access reviews
- Download restrictions
- Sharing restrictions

---

# External Sharing

Before sharing source files externally:

- Confirm the recipient.
- Confirm the purpose.
- Confirm licensing.
- Confirm confidentiality.
- Confirm least-required format.
- Confirm expiration.
- Apply watermarking where appropriate.
- Record the transfer.
- Prefer exports over masters.

---

# Vendor Sharing

Vendors should receive only the files required for production.

Example:

```text
Approved Production PDF

instead of

Complete Editable Figma Master
```

---

# Confidential Logos

Some logos may represent:

- Unreleased products
- Confidential clients
- Internal projects
- Private partnerships
- Experimental programs
- Security-sensitive systems

Such sources require restricted access and classification.

---

# Audit Logging

Record:

- File creation
- File edit
- Permission change
- Approval
- Download
- External share
- Archive
- Restore
- Deletion attempt
- Metadata change
- Ownership transfer

---

# Access Review

Access should be reviewed:

```text
Quarterly
```

Review:

- Current editors
- Former employees
- Contractors
- Vendors
- Shared links
- Public access
- Dormant accounts
- Administrative privileges

---

# AI Workforce Usage

AI agents may:

- Read approved source metadata.
- Validate source versions.
- Detect missing files.
- Compare checksums.
- generate exports from approved sources.
- Detect duplicate sources.
- Report broken dependencies.
- assist with backup verification.
- generate audit reports.

AI agents must not:

- Edit approved master geometry autonomously.
- Create new official logos without approval.
- overwrite released sources.
- change ownership.
- grant permissions.
- publish draft assets.
- modify partner originals.
- bypass change-control workflows.
- expose confidential source files.

---

# Automation Requirements

The asset platform should eventually support:

- Source registry synchronization
- Version validation
- Checksum generation
- Duplicate detection
- Backup verification
- Missing-source detection
- Dependency validation
- Permission audits
- Branch and release tracking
- Automatic source manifests
- Approval-state enforcement
- Archive packaging
- Recovery testing reports

---

# Source File Release Package

Every source release should include:

```text
source-release/

├── master/
├── metadata/
├── approvals/
├── manifest/
├── export-config/
├── checksums/
├── guidelines/
└── release-notes/
```

---

# Release Notes

Each approved source release should document:

- Version
- Date
- Asset ID
- Change Summary
- Reason
- Impact
- Required Export Updates
- Migration Notes
- Approval References
- Rollback Source

---

# Quality Checklist

Before approving a logo source:

- [ ] Correct asset ID assigned
- [ ] Correct source ID assigned
- [ ] Current approved file used
- [ ] Geometry verified
- [ ] Proportions verified
- [ ] Colors verified
- [ ] Typography verified
- [ ] Licensing verified
- [ ] Required variants included
- [ ] Layer names standardized
- [ ] Frames or artboards standardized
- [ ] External links resolved
- [ ] Hidden assets reviewed
- [ ] Raster elements reviewed
- [ ] Metadata completed
- [ ] Version assigned
- [ ] Checksum generated
- [ ] Backup completed
- [ ] Recovery path verified
- [ ] Brand approval recorded
- [ ] Governance approval recorded
- [ ] Source locked after release

---

# Backup Checklist

- [ ] Primary repository confirmed
- [ ] Secondary backup confirmed
- [ ] Immutable backup confirmed
- [ ] Metadata included
- [ ] Approval records included
- [ ] Checksums verified
- [ ] Partner originals preserved
- [ ] Restore test completed
- [ ] Backup owner assigned
- [ ] Retention policy applied

---

# Archive Checklist

- [ ] Source marked deprecated or archived
- [ ] Replacement linked
- [ ] Final checksum recorded
- [ ] Exports archived
- [ ] Metadata archived
- [ ] Approval records archived
- [ ] Access changed to read-only
- [ ] Backup verified
- [ ] Usage inventory updated
- [ ] Archive completion recorded

---

# Common Mistakes

Avoid:

- Maintaining multiple competing master files.
- Editing production exports.
- Saving source files on personal devices only.
- Using vague filenames.
- Overwriting released versions.
- Leaving master files publicly accessible.
- Losing font and licensing information.
- Using personal cloud links as official storage.
- Failing to back up Figma-only assets.
- Modifying partner originals.
- Keeping unapproved drafts in active folders.
- Ignoring checksum changes.
- Sharing full editable sources with vendors unnecessarily.
- Deleting deprecated source files.
- Failing to test recovery procedures.

---

# Related Documents

- README.md
- company-logos.md
- product-logos.md
- department-logos.md
- ai-workforce-logos.md
- partner-logos.md
- event-logos.md
- logo-exports.md
- ../branding/logo-system.md
- ../assets-guidelines.md
- ../naming-conventions.md
- ../license.md
- ../exports/README.md
- ../design-system/README.md
- ../../09-security/README.md
- ../../30-enterprise-governance/README.md

---

# Best Practices

- Maintain one authoritative master per logo family.
- Separate working, approved, deprecated, and archived files.
- Use controlled branches for major changes.
- Never overwrite released source versions.
- Preserve portable master formats.
- Back up critical brand assets outside the primary design platform.
- Record checksums for every release.
- Restrict master editing permissions.
- Share production exports instead of editable sources.
- Test restores regularly.
- Keep source, metadata, approval, export, and archive records synchronized.
- Preserve every historic brand version for audit and recovery.

---

# Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-07-10 | Initial enterprise logo source-file management standard established |

---

# Next Document

```text
docs/
└── 18-assets/
    └── logos/
        └── changelog.md
```

---

**End of Document**