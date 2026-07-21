# File and Content Icons

> Enterprise standards for designing, assigning, implementing, validating, and governing file, folder, document, content, media, archive, code, and digital asset icons across the Mianx.ai ecosystem.

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | File and Content Icons |
| Folder | docs/18-assets/icons |
| File Name | file-and-content-icons.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Design System, Product Design, Documentation Team & Asset Governance |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

This document defines the official icon system for representing files, folders, digital assets, documents, source code, databases, media, archives, and enterprise content throughout the Mianx.ai ecosystem.

A consistent file icon system helps users quickly recognize content types while maintaining a professional and scalable design language across all products.

These standards apply to every interface where digital content is displayed.

Examples include:

- File Explorer
- Knowledge Base
- Documentation Portal
- AI Workspace
- Asset Manager
- Project Files
- Source Code Browser
- Repository Viewer
- Upload Manager
- Download Manager
- Reports
- Dashboards
- Search Results
- Attachments
- Chat File Picker
- Cloud Storage
- Mobile Applications

---

# Objectives

The file and content icon system is designed to:

- Standardize every supported file type.
- Improve visual recognition.
- Reduce user confusion.
- Support enterprise scalability.
- Maintain accessibility.
- Support AI-assisted document discovery.
- Support multilingual environments.
- Improve navigation.
- Improve document management.
- Enable reusable design-system components.
- Support dark mode and high-contrast mode.
- Preserve governance and auditability.

---

# Scope

These standards apply to:

- Documents
- Office Files
- PDF Files
- Text Files
- Markdown Files
- Spreadsheets
- Presentations
- Database Files
- Images
- Videos
- Audio
- Archives
- Source Code
- Configuration Files
- Design Files
- AI Assets
- Machine Learning Files
- Data Files
- Cloud Assets
- Folders
- Attachments
- Temporary Files
- Generated Files
- Export Files

---

# Core Principle

A file icon represents the **type of content**, not the content itself.

For example:

```text
PDF Icon
≠
Contract

PDF Icon
=
Portable Document Format
```

Likewise:

```text
Image Icon
≠
Company Logo

Image Icon
=
Image File
```

Icons communicate format, not meaning.

---

# Design Philosophy

Every file icon should be:

- Simple
- Recognizable
- Professional
- Consistent
- Scalable
- Neutral
- Accessible
- Easy to scan
- Theme compatible
- Enterprise ready

The design language must match the official Mianx.ai Design System.

---

# Design Principles

The icon system should prioritize:

- Recognition over decoration
- Simplicity over complexity
- Consistency over creativity
- Function over aesthetics
- Accessibility first
- Platform independence
- Long-term maintainability

---

# Visual Foundation

Every icon must follow the shared icon system:

- 24×24 Grid
- Shared Stroke Width
- Shared Corner Radius
- Shared Padding
- Optical Alignment
- Theme Compatibility
- Monochrome Support
- Small-size Recognition

Default:

```text
Grid:
24 × 24

Default Size:
20–24 px

Color:
currentColor
```

---

# Architecture

The complete file icon system is organized into logical categories.

```text
File & Content Icons

├── Documents
│
├── Office Files
│
├── PDF
│
├── Text
│
├── Markdown
│
├── Spreadsheet
│
├── Presentation
│
├── Database
│
├── Images
│
├── Video
│
├── Audio
│
├── Archives
│
├── Source Code
│
├── Config Files
│
├── Design Files
│
├── AI Assets
│
├── Data Files
│
├── Cloud Assets
│
└── Folders
```

Each category has its own governed icon family.

---

# Icon Hierarchy

The hierarchy follows:

```text
Content Type

↓

Category Icon

↓

Specific File Type

↓

Optional Status Badge
```

Example:

```text
PDF Icon

+

Locked Badge

+

Downloaded Badge
```

Status must never be embedded inside the icon itself.

---

# File Categories

The enterprise registry divides all files into standardized groups.

| Category | Description |
|------------|------------------------------|
| Documents | General documentation |
| Office Files | Word, Excel, PowerPoint |
| PDF | Portable documents |
| Text | Plain text |
| Markdown | Documentation source |
| Spreadsheet | Tables & calculations |
| Presentation | Slides |
| Database | SQL and database files |
| Images | Photos & graphics |
| Videos | Motion media |
| Audio | Sound files |
| Archives | Compressed files |
| Source Code | Programming languages |
| Config | Configuration |
| AI Assets | Models & prompts |
| Data | CSV, JSON, XML etc. |
| Cloud | Cloud-specific resources |
| Folders | Directories |

---

# Generic File Icon

Every unknown file should fall back to the generic file icon.

Recommended appearance:

```text
Document Page
```

The generic icon must:

- Remain neutral
- Work in monochrome
- Scale correctly
- Support badges
- Never imply a specific format

---

# Generic Content Icon

Where content type is unknown:

```text
Generic Content
```

may be used.

It should remain different from:

- Generic File
- Folder
- Attachment
- Link

---

# Generic Attachment Icon

Attachments may use:

```text
Paperclip
```

This represents:

- Attached files
- Email attachments
- Chat attachments
- Ticket attachments

It does not indicate the file format.

---

# Generic Download Icon

Downloads use:

```text
Arrow Down
```

Download state is separate from file type.

Example:

```text
PDF

+

Download Badge
```

---

# Generic Upload Icon

Uploads use:

```text
Arrow Up
```

Upload state should never replace file type.

---

# Generic Sync Icon

Synchronization should use:

```text
Circular Sync
```

This indicates:

- Cloud Sync
- Offline Sync
- Background Sync

It does not identify the underlying file type.

---

# Generic Shared File Icon

Shared resources may include:

```text
File

+

Share Badge
```

This icon indicates sharing only.

---

# Document Icons

Document icons represent structured written information.

Examples:

- Policies
- Reports
- Contracts
- Specifications
- Guides
- Manuals
- Documentation
- Procedures
- Meeting Notes
- Articles

Document icons should remain visually neutral.

---

# Document Design

Recommended metaphor:

```text
Paper Document
```

Avoid:

- Decorative paper
- Folded corners with excessive detail
- Printed textures
- Physical notebook imagery

---

# Document Usage

Document icons may appear in:

- Knowledge Base
- Documentation
- Search Results
- Attachments
- Reports
- File Manager
- AI References
- Documentation Index

---

# Office Files

Office documents include:

- Microsoft Word
- Microsoft Excel
- Microsoft PowerPoint
- LibreOffice
- OpenDocument
- Google Workspace exports

The system should represent the document type rather than the software vendor.

---

# Office File Principle

Preferred:

```text
Document

+

Type Badge
```

Avoid relying entirely on:

- Microsoft logos
- Google logos
- Vendor branding

The icon should survive vendor changes.

---

# Office Document Categories

Office documents include:

```text
Word Processing

Spreadsheet

Presentation
```

These must each have separate icons.

---

# Word Processing Files

Examples:

```text
.doc

.docx

.odt

.rtf
```

Recommended metaphor:

```text
Document

+

Text Lines
```

The icon should communicate editable text.

---

# Supported Word Formats

Examples:

| Extension | Description |
|-----------|-------------|
| .doc | Microsoft Word |
| .docx | Microsoft Word |
| .odt | OpenDocument |
| .rtf | Rich Text |
| .pages | Apple Pages |

---

# PDF Files

Portable Document Format represents finalized documents.

Examples:

- Reports
- Contracts
- Invoices
- Manuals
- Certificates
- Books
- Policies

---

# PDF Design

Recommended metaphor:

```text
Document

+

PDF Identifier
```

Avoid:

- Adobe branding
- Third-party logos
- Decorative artwork

---

# PDF Usage

PDF icons appear in:

- Downloads
- Attachments
- Documentation
- Reports
- File Browsers
- Knowledge Base
- AI References

---

# PDF Characteristics

Typical PDF behavior:

- Read-only
- Printable
- Shareable
- Stable Layout
- Cross-platform

Icons should communicate permanence.

---

# Supported PDF Formats

| Extension | Description |
|-----------|-------------|
| .pdf | Portable Document Format |

---

# Text Files

Text files represent plain textual information.

Examples:

```text
.txt

.log

.cfg

.ini

.env
```

---

# Text Icon

Recommended metaphor:

```text
Document

+

Simple Text Lines
```

Avoid confusing text files with:

- Markdown
- Source Code
- Documentation

---

# Text Usage

Text icons appear in:

- Logs
- Notes
- Configurations
- Temporary Files
- Generated Output

---

# Plain Text Characteristics

Plain text:

- No formatting
- Lightweight
- Human readable
- Machine readable
- Universal

---

# Supported Text Formats

| Extension | Description |
|-----------|-------------|
| .txt | Plain Text |
| .text | Plain Text |
| .log | Log File |

---

# Markdown Files

Markdown files are documentation source files.

Common usage:

- README
- Documentation
- Wikis
- AI Prompts
- Knowledge Base
- Guides

---

# Markdown Design

Recommended metaphor:

```text
Document

+

Markdown Indicator
```

Markdown should remain distinct from:

- Plain Text
- Source Code
- Rich Documents

---

# Markdown Characteristics

Markdown files are:

- Lightweight
- Version Controlled
- Human Readable
- AI Friendly
- Documentation First

---

# Supported Markdown Formats

| Extension | Description |
|-----------|-------------|
| .md | Markdown |
| .markdown | Markdown |
| .mdx | Markdown + JSX |

---

# Spreadsheet Files

Spreadsheet files represent structured tabular information.

Examples:

- Financial Reports
- Budgets
- KPI Dashboards
- Inventory
- Data Tables
- Calculations

---

# Spreadsheet Design

Recommended metaphor:

```text
Grid

+

Cells
```

Avoid:

- Mathematical symbols only
- Vendor branding
- Decorative tables

---

# Spreadsheet Characteristics

Spreadsheet files support:

- Rows
- Columns
- Calculations
- Charts
- Formulas
- Pivot Tables

---

# Supported Spreadsheet Formats

| Extension | Description |
|-----------|-------------|
| .xls | Excel |
| .xlsx | Excel |
| .ods | OpenDocument Spreadsheet |
| .csv | Comma Separated Values |

CSV receives its own metadata but shares the spreadsheet family.

---

# Presentation Files

Presentation files represent slide-based content.

Examples:

- Company Decks
- Product Presentations
- Sales Decks
- Investor Pitch
- Training
- Workshops

---

# Presentation Design

Recommended metaphor:

```text
Presentation Screen

+

Slides
```

Avoid:

- Projector hardware
- Vendor branding
- Decorative graphics

---

# Presentation Characteristics

Presentation files:

- Multiple Slides
- Speaker Notes
- Layout Based
- Visual Content
- Interactive Elements

---

# Supported Presentation Formats

| Extension | Description |
|-----------|-------------|
| .ppt | PowerPoint |
| .pptx | PowerPoint |
| .odp | OpenDocument Presentation |
| .key | Apple Keynote |

---

# Database Files

Database icons represent structured persistent data.

Examples:

- SQL Dumps
- SQLite
- PostgreSQL Backups
- MySQL Dumps
- Database Snapshots
- Schema Files

---

# Database Design

Recommended metaphor:

```text
Database Cylinder
```

The cylinder remains the universal enterprise metaphor.

---

# Database Characteristics

Database files typically represent:

- Structured Data
- Persistent Storage
- Tables
- Indexes
- Relationships
- Backups
- Schemas

---

# Supported Database Formats

| Extension | Description |
|-----------|-------------|
| .sql | SQL |
| .db | Database |
| .sqlite | SQLite |
| .sqlite3 | SQLite |
| .bak | Backup |
| .dump | Database Dump |

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
- icon-exports.md
- icon-source-files.md
- ../assets-guidelines.md
- ../naming-conventions.md
- ../branding/color-palette.md

---

# End of Part 1

**Part 2 Includes**

- Images
- Video
- Audio
- Archives
- Executables
- Source Code
- Programming Languages
- Configuration Files
- Web Assets
- AI Assets
- Dataset Files
- Design Files

# Images

Image icons represent raster and vector graphics used across the Mianx.ai ecosystem.

Examples include:

- Product Images
- UI Screenshots
- Company Logos
- Diagrams
- Illustrations
- Icons
- Marketing Graphics
- Design Assets
- User Uploads
- Photos

---

# Image Design

Recommended metaphor:

```text
Landscape Image
```

or

```text
Picture Frame
```

The icon should immediately communicate visual media.

Avoid:

- Camera icons
- Decorative artwork
- Vendor branding

---

# Image Categories

Image assets include:

- Raster Images
- Vector Images
- Screenshots
- Photography
- UI Assets
- Product Graphics
- Brand Graphics
- Illustrations
- Diagrams

---

# Raster Images

Examples:

```text
.jpg
.jpeg
.png
.gif
.bmp
.webp
.tiff
.avif
```

---

# Vector Images

Examples:

```text
.svg
.ai
.eps
.pdf (vector artwork)
```

Vector assets should remain visually distinguishable from raster graphics.

---

# Image Characteristics

Image files typically support:

- Preview
- Zoom
- Metadata
- Color Profiles
- Compression
- Transparency
- Resolution

---

# Supported Image Formats

| Extension | Description |
|-----------|-------------|
| .png | Portable Network Graphics |
| .jpg | JPEG |
| .jpeg | JPEG |
| .gif | Animated Image |
| .bmp | Bitmap |
| .svg | Scalable Vector Graphics |
| .webp | WebP |
| .tif | TIFF |
| .tiff | TIFF |
| .avif | AVIF |

---

# Video

Video icons represent moving visual media.

Examples:

- Tutorials
- Training Videos
- Product Demos
- Marketing Videos
- Advertisements
- Recorded Meetings
- Screen Recordings
- Animations

---

# Video Design

Recommended metaphor:

```text
Play Button

inside

Video Frame
```

Avoid:

- Movie reels
- Decorative cinema graphics
- Vendor branding

---

# Video Characteristics

Video files support:

- Playback
- Streaming
- Captions
- Metadata
- Preview
- Duration
- Resolution

---

# Supported Video Formats

| Extension | Description |
|-----------|-------------|
| .mp4 | MPEG-4 |
| .mov | Apple QuickTime |
| .avi | AVI |
| .mkv | Matroska |
| .wmv | Windows Media |
| .webm | WebM |
| .mpeg | MPEG |
| .m4v | Apple Video |

---

# Audio

Audio icons represent recorded sound.

Examples:

- Podcasts
- Voice Notes
- Meeting Audio
- Music
- Notifications
- Sound Effects
- AI Speech

---

# Audio Design

Recommended metaphor:

```text
Audio Wave
```

or

```text
Speaker
```

Avoid:

- Music notes only
- Decorative headphones
- Vendor branding

---

# Audio Characteristics

Audio files may support:

- Playback
- Streaming
- Metadata
- Album Information
- Transcript
- Waveform Preview

---

# Supported Audio Formats

| Extension | Description |
|-----------|-------------|
| .mp3 | MP3 |
| .wav | WAV |
| .aac | AAC |
| .ogg | OGG |
| .flac | FLAC |
| .m4a | Apple Audio |

---

# Archives

Archive files represent compressed packages.

Examples:

- ZIP Packages
- Project Exports
- Releases
- Backups
- Downloads

---

# Archive Design

Recommended metaphor:

```text
Archive Box
```

or

```text
Compressed Package
```

---

# Archive Characteristics

Archives typically support:

- Compression
- Multiple Files
- Encryption
- Password Protection
- Extraction

---

# Supported Archive Formats

| Extension | Description |
|-----------|-------------|
| .zip | ZIP |
| .rar | RAR |
| .7z | 7-Zip |
| .tar | TAR |
| .gz | GZip |
| .bz2 | BZip2 |
| .xz | XZ |

---

# Executable Files

Executable icons represent runnable software.

Examples:

- Applications
- Installers
- Executables
- Packages

---

# Executable Design

Recommended metaphor:

```text
Application Window
```

or

```text
Executable Package
```

Avoid using warning symbols as part of the icon.

---

# Supported Executable Formats

| Extension | Description |
|-----------|-------------|
| .exe | Windows Executable |
| .msi | Windows Installer |
| .app | macOS Application |
| .apk | Android Package |
| .ipa | iOS Package |
| .deb | Debian Package |
| .rpm | RPM Package |

---

# Source Code

Source code icons represent programming files.

Examples:

- Backend
- Frontend
- Scripts
- Automation
- Infrastructure
- Libraries

---

# Source Code Design

Recommended metaphor:

```text
Document

+

Code Brackets
```

The icon must communicate editable source code.

---

# Programming Language Icons

Programming languages may receive specialized icons while remaining inside one shared visual family.

Examples include:

- JavaScript
- TypeScript
- Python
- Java
- C#
- C++
- Go
- Rust
- PHP
- Ruby
- Swift
- Kotlin
- Dart
- SQL

---

# Supported Source Code Formats

| Extension | Description |
|-----------|-------------|
| .js | JavaScript |
| .ts | TypeScript |
| .tsx | TypeScript React |
| .jsx | React |
| .py | Python |
| .java | Java |
| .go | Go |
| .rs | Rust |
| .php | PHP |
| .rb | Ruby |
| .cs | C# |
| .cpp | C++ |
| .swift | Swift |
| .kt | Kotlin |
| .dart | Dart |
| .sql | SQL |

---

# Configuration Files

Configuration files control application behavior.

Examples:

- Environment Variables
- JSON Config
- YAML
- XML
- TOML
- INI

---

# Configuration Design

Recommended metaphor:

```text
Document

+

Settings Gear
```

Avoid confusing configuration with application settings.

---

# Supported Configuration Formats

| Extension | Description |
|-----------|-------------|
| .json | JSON |
| .yaml | YAML |
| .yml | YAML |
| .xml | XML |
| .toml | TOML |
| .ini | INI |
| .env | Environment Variables |
| .conf | Configuration |

---

# Web Assets

Web assets include:

- HTML
- CSS
- SCSS
- LESS
- SVG
- Fonts

---

# Web Asset Design

Recommended metaphor:

```text
Web Document

+

Code
```

---

# Supported Web Formats

| Extension | Description |
|-----------|-------------|
| .html | HTML |
| .css | CSS |
| .scss | SCSS |
| .less | LESS |
| .svg | SVG |
| .woff | Web Font |
| .woff2 | Web Font |
| .ttf | TrueType |
| .otf | OpenType |

---

# AI Assets

AI assets represent artificial intelligence resources.

Examples:

- Prompt Templates
- Embeddings
- Vector Indexes
- AI Models
- Fine-tuned Models
- Agent Configurations
- Evaluation Files

---

# AI Asset Design

Recommended metaphor:

```text
AI Node

+

Document
```

Avoid robot heads as the default AI asset symbol.

---

# AI Asset Categories

AI assets include:

- Prompt Files
- Agent Files
- Workflow Definitions
- Model Files
- Embeddings
- Evaluation Data
- Vector Indexes
- Knowledge Packages

---

# Supported AI Formats

| Extension | Description |
|-----------|-------------|
| .prompt | Prompt File |
| .agent | Agent Definition |
| .workflow | Workflow Definition |
| .onnx | ONNX Model |
| .gguf | GGUF Model |
| .safetensors | SafeTensors |
| .pt | PyTorch |
| .ckpt | Checkpoint |

---

# Dataset Files

Dataset icons represent structured machine-readable information.

Examples:

- Training Data
- CSV
- JSON
- XML
- Parquet
- Avro
- ORC

---

# Dataset Design

Recommended metaphor:

```text
Data Grid
```

or

```text
Dataset Table
```

Datasets should remain visually different from spreadsheets.

---

# Dataset Characteristics

Datasets may support:

- Large Scale Storage
- Machine Learning
- Analytics
- Data Pipelines
- Import & Export
- Validation

---

# Supported Dataset Formats

| Extension | Description |
|-----------|-------------|
| .csv | CSV |
| .json | JSON |
| .jsonl | JSON Lines |
| .xml | XML |
| .parquet | Apache Parquet |
| .avro | Apache Avro |
| .orc | ORC |
| .feather | Feather |

---

# Design Files

Design files represent creative project assets.

Examples:

- UI Designs
- Wireframes
- Mockups
- Prototypes
- Illustrations

---

# Design File Design

Recommended metaphor:

```text
Design Canvas
```

or

```text
Layout Frame
```

Avoid vendor-specific branding where possible.

---

# Supported Design Formats

| Extension | Description |
|-----------|-------------|
| .fig | Figma |
| .sketch | Sketch |
| .xd | Adobe XD |
| .psd | Photoshop |
| .ai | Illustrator |
| .indd | InDesign |

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

---

# End of Part 2

**Part 3 Includes**

- Folder Icons
- Cloud Files
- Preview Rules
- MIME Mapping
- Extension Mapping
- Component API
- Metadata
- Registry
- Naming Standards

# Folder Icons

Folder icons represent logical containers that organize files, assets, projects, and enterprise resources.

Folders never represent the file type stored inside them.

Example:

```text
Project Folder

↓

Contains

- Documents
- Images
- Source Code
- Database
- Assets
```

---

# Folder Design

Recommended metaphor:

```text
Folder
```

The folder shape must remain recognizable at all supported sizes.

Avoid:

- Decorative folder tabs
- Excessive shadows
- Vendor-specific folder styles
- Skeuomorphic designs

---

# Folder Categories

Enterprise folders include:

- Standard Folder
- Empty Folder
- Shared Folder
- Locked Folder
- Favorite Folder
- Archive Folder
- Cloud Folder
- Project Folder
- Department Folder
- AI Workspace Folder
- Hidden Folder
- Temporary Folder

---

# Standard Folder

Represents a normal directory.

Recommended metaphor:

```text
Folder
```

Used throughout:

- File Explorer
- Documentation
- Knowledge Base
- Asset Manager
- Project Browser

---

# Empty Folder

Represents an existing folder with no content.

Example:

```text
Folder

+

Empty State
```

Do not remove the folder icon completely.

---

# Shared Folder

Represents a folder accessible by multiple users.

Example:

```text
Folder

+

Share Badge
```

Sharing state must be represented through a badge, not by redesigning the folder.

---

# Locked Folder

Represents restricted content.

Example:

```text
Folder

+

Lock Badge
```

The lock represents access restriction only.

---

# Archive Folder

Represents archived resources.

Recommended badge:

```text
Archive Box
```

Archived folders should remain readable but visually secondary.

---

# Cloud Folder

Represents synchronized cloud storage.

Example:

```text
Folder

+

Cloud Badge
```

Cloud identity must remain separate from synchronization status.

---

# Project Folder

Represents an enterprise project.

Example:

```text
Folder

+

Project Badge
```

Project folders should not become custom logos.

---

# Department Folder

Represents organizational departments.

Examples:

- Engineering
- Finance
- Legal
- Marketing

Department identity should remain separate from folder identity.

---

# AI Workspace Folder

Represents AI-generated workspaces.

Examples:

- Agent Workspace
- Workflow Files
- AI Output
- Memory Storage

Use:

```text
Folder

+

AI Badge
```

---

# Temporary Folder

Represents transient data.

Examples:

- Cache
- Generated Output
- Temporary Export
- Build Files

Temporary status should be represented by metadata, not icon color.

---

# Folder States

Folders may display badges for:

- Shared
- Locked
- Synced
- Archived
- Favorite
- Warning
- Error

Badges must never replace the base folder icon.

---

# Cloud Files

Cloud files represent resources stored remotely.

Examples:

- Google Drive
- OneDrive
- Dropbox
- S3
- Azure Blob
- Cloudflare R2

The icon should represent cloud storage—not the cloud provider.

---

# Cloud File Design

Recommended metaphor:

```text
Document

+

Cloud
```

Avoid:

- Vendor logos
- Provider branding
- Product trademarks

---

# Cloud Asset Categories

Cloud assets include:

- Synced Documents
- Shared Files
- Cloud Backups
- Cloud Archives
- Cloud Media
- Cloud Databases
- Cloud AI Assets

---

# Cloud States

Cloud resources may have:

- Synced
- Uploading
- Downloading
- Offline
- Conflict
- Shared

These states use badges.

---

# Preview Rules

The system should generate previews whenever possible.

Preview priority:

```text
Image

↓

PDF

↓

Video

↓

Office Files

↓

Markdown

↓

Code

↓

Generic File
```

---

# Thumbnail Support

Thumbnails should be generated for:

- Images
- Videos
- PDFs
- Presentations
- Design Files

Generic icons remain the fallback.

---

# Preview Fallback

When previews cannot be generated:

```text
Use Official File Icon
```

Never display a broken preview placeholder.

---

# Preview Size Guidelines

| Context | Recommended Size |
|---------|------------------|
| List View | 20 px |
| Table | 20 px |
| Grid | 48 px |
| Gallery | 64–128 px |
| Preview Card | 96–256 px |

---

# MIME Type Mapping

Icons should primarily map to MIME types.

Example:

```text
application/pdf

↓

PDF Icon
```

---

# Common MIME Types

| MIME Type | Icon |
|------------|------|
| application/pdf | PDF |
| text/plain | Text |
| text/markdown | Markdown |
| application/json | JSON |
| application/xml | XML |
| image/png | Image |
| image/jpeg | Image |
| image/svg+xml | SVG |
| video/mp4 | Video |
| audio/mpeg | Audio |
| application/zip | Archive |

---

# MIME Resolution Priority

Resolution order:

```text
Exact MIME

↓

Extension

↓

Magic Number

↓

Generic File
```

Never rely solely on filename extensions.

---

# Extension Mapping

Extensions should map to one canonical icon.

Example:

```text
.doc

↓

Word Document
```

---

# Extension Registry

Examples:

| Extension | Canonical Icon |
|------------|----------------|
| .docx | Word |
| .xlsx | Spreadsheet |
| .pptx | Presentation |
| .pdf | PDF |
| .md | Markdown |
| .json | JSON |
| .sql | Database |
| .png | Image |
| .mp4 | Video |
| .zip | Archive |

---

# Unknown Extension

If an extension is unknown:

```text
Generic File
```

Log the unknown type for telemetry where appropriate.

---

# Component Naming

Recommended component names:

```text
PdfFileIcon

WordFileIcon

SpreadsheetFileIcon

PresentationFileIcon

MarkdownFileIcon

ImageFileIcon

VideoFileIcon

FolderIcon

CloudFolderIcon
```

---

# Component API

Recommended React component:

```tsx
type FileIconProps = {
    mimeType?: string;
    extension?: string;
    folder?: boolean;
    size?: 16 | 20 | 24 | 32 | 48;
    variant?: "outline" | "filled";
    title?: string;
    className?: string;
}
```

---

# Example Usage

```tsx
<FileIcon

mimeType="application/pdf"

size={24}

/>
```

---

# Folder Component Example

```tsx
<FolderIcon

shared={true}

size={24}

/>
```

---

# Metadata Standard

Every file icon should contain metadata.

Required fields:

| Field | Description |
|------|-------------|
| Icon ID | Unique identifier |
| System Name | Internal name |
| Display Name | Human readable |
| Category | File category |
| MIME Types | Supported MIME |
| Extensions | Supported extensions |
| Default Variant | Outline/Filled |
| Default Size | Default size |
| Accessibility Label | Screen reader label |
| Version | Icon version |
| Status | Active / Deprecated |
| Owner | Responsible team |

---

# Metadata Example

```json
{
  "icon_id": "ICON-FILE-PDF-001",
  "system_name": "file-pdf",
  "display_name": "PDF Document",
  "category": "Documents",
  "mime_types": [
    "application/pdf"
  ],
  "extensions": [
    ".pdf"
  ],
  "default_size": 24,
  "variant": "outline",
  "version": "1.0.0",
  "status": "Approved"
}
```

---

# File Icon Registry

A centralized registry should be maintained.

| Icon ID | System Name | Category | Status |
|----------|-------------|----------|--------|
| ICON-FILE-PDF-001 | file-pdf | Documents | Approved |
| ICON-FILE-DOC-001 | file-word | Documents | Approved |
| ICON-FILE-XLS-001 | file-spreadsheet | Office | Approved |
| ICON-FILE-PPT-001 | file-presentation | Office | Approved |
| ICON-FILE-IMG-001 | file-image | Media | Approved |
| ICON-FILE-VID-001 | file-video | Media | Approved |
| ICON-FILE-AUD-001 | file-audio | Media | Approved |
| ICON-FOLDER-001 | folder | Folder | Approved |

---

# Naming Convention

System names must use lowercase kebab-case.

Examples:

```text
file-pdf

file-word

file-markdown

file-image

file-video

folder

folder-shared

folder-cloud
```

---

# File Naming

Source files:

```text
{system-name}-{variant}-{size}-v{version}.svg
```

Examples:

```text
file-pdf-outline-24-v1.svg

file-image-filled-24-v1.svg

folder-outline-24-v1.svg

folder-cloud-outline-24-v1.svg
```

Avoid:

```text
pdf-final.svg

new-folder.svg

latest-image-icon.svg

test-file.svg
```

---

# Source Structure

Recommended structure:

```text
icons/

├── files/
├── folders/
├── office/
├── media/
├── cloud/
├── ai/
├── database/
├── metadata/
├── exports/
└── source-files/
```

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
- icon-exports.md
- icon-source-files.md

---

# End of Part 3

# Accessibility

File and content icons must be understandable by all users, including users relying on assistive technologies.

Accessibility requirements include:

- Screen reader compatibility
- Keyboard navigation
- High contrast support
- Color-independent recognition
- Clear focus indicators
- Consistent naming
- Logical reading order
- Touch accessibility

Icons must enhance usability rather than replace meaningful text.

---

# Accessible Labels

Icons used without visible text must provide descriptive labels.

Examples:

```text
PDF Document

Word Document

Presentation File

Project Folder

Shared Folder

Image File

Video File

Archive File

Database File
```

Avoid labels such as:

```text
Icon

File

Document

Unknown
```

---

# Decorative Usage

When a visible file name already provides meaning:

```tsx
<FilePdfIcon aria-hidden="true" />

<span>Architecture.pdf</span>
```

The icon should be ignored by screen readers.

---

# Interactive Usage

If the icon itself is clickable:

Requirements:

- Accessible Name
- Focus State
- Keyboard Navigation
- Hover Feedback
- Touch Support

Example:

```tsx
<button

aria-label="Open PDF document"

>

<FilePdfIcon />

</button>
```

---

# Color Accessibility

File icons must never rely solely on color.

Correct:

```text
PDF Shape

+

Text Label

+

Optional Badge
```

Incorrect:

```text
Blue = PDF

Green = Spreadsheet

Red = Presentation
```

Color should only reinforce meaning.

---

# Contrast Requirements

Icons must remain visible under:

- Light Theme
- Dark Theme
- High Contrast Mode
- Monochrome Printing
- Grayscale Screens

Minimum contrast must follow enterprise accessibility guidelines.

---

# Icon Size Accessibility

Recommended minimum sizes:

| Context | Minimum |
|----------|----------|
| Dense Tables | 16 px |
| Standard Lists | 20 px |
| Touch UI | 24 px |
| Mobile | 24–32 px |
| Preview Cards | 48 px |

Interactive icons should never have touch targets smaller than 44×44 px.

---

# RTL Support

Most file icons remain identical in RTL layouts.

Examples:

- PDF
- Word
- Spreadsheet
- Folder
- Database
- Archive
- Image

These should **not** mirror.

---

# Directional Icons

Some supporting badges require RTL review.

Examples:

- Upload
- Download
- Sync
- Export
- Import
- Move
- Forward

Direction-sensitive badges should follow the platform RTL policy.

---

# Localization

Localized systems should:

- Translate visible labels.
- Keep system names stable.
- Preserve metadata.
- Avoid embedded text inside SVG.
- Support long translated labels.

File extensions should never be translated.

---

# Theme Support

Icons must support:

- Light Theme
- Dark Theme
- High Contrast
- Print
- Grayscale

Default rendering should use:

```text
currentColor
```

Hardcoded colors should be avoided except in approved illustrations.

---

# Filled and Outline Variants

Supported variants:

- Outline
- Filled

Outline:

- Navigation
- Tables
- Lists
- Trees

Filled:

- Selected State
- Active Context
- Feature Highlights

Variants must preserve semantic meaning.

---

# Badge Compatibility

File icons may support badges such as:

- Locked
- Shared
- Favorite
- Downloaded
- Uploaded
- Synced
- Warning
- Error
- AI Generated

Badges must remain separate overlays.

---

# Preview Compatibility

Icons must work with:

- Thumbnail View
- List View
- Grid View
- Compact View
- Large Preview
- Gallery View

Icons remain the fallback when thumbnails cannot be generated.

---

# Testing Requirements

Every icon should be tested for:

- 16 px
- 20 px
- 24 px
- 32 px
- 48 px
- 64 px

As well as:

- Light Theme
- Dark Theme
- High Contrast
- RTL
- Monochrome
- Mobile
- Desktop

---

# Recognition Testing

Testing should verify:

- Users identify file type correctly.
- Similar icons are distinguishable.
- Small sizes remain readable.
- Folder badges remain recognizable.
- Preview fallbacks remain understandable.

---

# Visual Regression Testing

Automated tests should detect:

- Path Changes
- Stroke Changes
- Fill Changes
- ViewBox Changes
- Alignment Changes
- Badge Position Changes
- Missing Icons
- Theme Breakages

---

# SVG Validation

Every SVG should be validated for:

- Correct ViewBox
- Correct Stroke
- currentColor Compatibility
- No Embedded Scripts
- No External Resources
- No Hidden Objects
- Clean Paths
- Optimized Size

---

# Performance

Icons should:

- Minimize SVG complexity.
- Avoid unnecessary path duplication.
- Optimize rendering.
- Load efficiently.
- Support lazy loading where appropriate.

---

# Security

SVG assets must:

- Remove JavaScript
- Remove Embedded CSS
- Remove External References
- Remove Tracking Metadata
- Remove Hidden Objects

Only trusted SVG sources may enter the design system.

---

# Versioning

Icons follow Semantic Versioning.

| Change | Version |
|----------|----------|
| Major redesign | 2.0.0 |
| New supported variant | 1.1.0 |
| Small fix | 1.0.1 |

---

# Breaking Changes

Breaking changes include:

- Renaming system names
- Removing icons
- Reassigning file mappings
- Changing component APIs
- Changing default variants

Breaking changes require migration documentation.

---

# Deprecation

Deprecated icons should:

- Remain documented.
- Be marked deprecated.
- Provide replacement icons.
- Preserve historical references.
- Remain available until migration completes.

---

# Migration

Migration steps:

```text
Old Icon

↓

Replacement

↓

Registry Update

↓

Component Update

↓

Application Update

↓

Validation

↓

Archive Old Version
```

---

# Registry Maintenance

The registry should be reviewed:

- Monthly
- Quarterly
- After major releases
- After design-system updates

---

# AI Usage

AI systems may:

- Suggest icons
- Validate mappings
- Detect duplicates
- Generate metadata
- Build inventories
- Recommend accessibility labels

AI systems must not:

- Publish official icons
- Replace approved mappings
- Ignore governance review

---

# Governance

Every icon requires:

- Design Review
- Accessibility Review
- Technical Validation
- Governance Approval
- Registry Registration

No icon should bypass approval.

---

# Quality Checklist

Before approval:

- [ ] Category verified
- [ ] Icon ID assigned
- [ ] System name approved
- [ ] Metadata completed
- [ ] MIME mapping verified
- [ ] Extension mapping verified
- [ ] Accessibility reviewed
- [ ] RTL reviewed
- [ ] Theme tested
- [ ] SVG validated
- [ ] Registry updated
- [ ] Component generated
- [ ] Source preserved
- [ ] Documentation updated

---

# Usage Checklist

Before using an icon:

- [ ] Correct file type selected
- [ ] Correct icon version
- [ ] Accessible label available
- [ ] Theme compatible
- [ ] Badge correct
- [ ] Preview fallback verified
- [ ] Deprecated icon not used

---

# Audit Requirements

Regular audits should verify:

- Missing icons
- Duplicate mappings
- Incorrect MIME mappings
- Deprecated usage
- Broken components
- Accessibility issues
- Missing metadata
- Invalid SVGs

Recommended schedule:

```text
Monthly Validation

Quarterly Asset Audit

Annual Design Review
```

---

# Common Mistakes

Avoid:

- Using vendor logos instead of file icons.
- Embedding status into icons.
- Depending only on color.
- Using thumbnails as permanent icons.
- Mixing folder and file icons.
- Hardcoding colors.
- Ignoring accessibility.
- Ignoring unknown file fallbacks.
- Deleting deprecated icons immediately.

---

# Best Practices

- Maintain one canonical icon per file type.
- Keep naming predictable.
- Support MIME-based mapping.
- Preserve backward compatibility.
- Use badges for temporary states.
- Keep icons lightweight.
- Test every release.
- Document every change.
- Archive instead of deleting.
- Maintain a single enterprise registry.

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
- icon-exports.md
- icon-source-files.md
- ../assets-guidelines.md
- ../branding/color-palette.md
- ../naming-conventions.md

---

# Version History

| Version | Date | Description |
|----------|------------|------------------------------|
| 1.0.0 | 2026-07-10 | Initial enterprise file and content icon standard |

---

# Document Completion

```text
Document Status

████████████████████████████████

100% COMPLETE
```

---

# Next Document

```text
docs/
└── 18-assets/
    └── icons/
        └── icon-exports.md
```

---

**End of Document**