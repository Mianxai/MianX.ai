# Mianx.ai

**The AI-Native Business Operating System, AI Workforce Platform, and Project Factory**
> Design the system before the product.

Mianx.ai is not a software house and not a single product — it is a
**Platform Company**. Mianx Core is built once and reused everywhere: an AI
Runtime routes work to a governed AI workforce, a Project Factory turns
approved ideas into running projects on top of that core, and a Founder
Workspace is where it is all directed and approved.

> **Locked build order:** Mianx Core → AI Runtime → Project Factory →
> Founder Workspace → 10–12 Core Runtime Agents → End-to-end Beta →
> Telepizza and Poultry later, as "Powered by Mianx.ai" products.
> This order is locked for the current phase and is not to be changed or
> expanded without Founder approval. See
> [`execution/EXECUTION-BOARD.md`](execution/EXECUTION-BOARD.md) for the
> live phase status.

---

## Table of Contents

- [Vision & Mission](#vision--mission)
- [What We're Not Building](#what-were-not-building)
- [Platform Architecture](#platform-architecture)
- [Product Line (Locked Order)](#product-line-locked-order)
- [Current Application (Phase A)](#current-application-phase-a)
- [Company Principles](#company-principles)
- [Reusability Rule](#reusability-rule)
- [Repository Structure](#repository-structure)
- [Roadmap](#roadmap)
- [Documentation Standards](#documentation-standards)
- [Engineering Rules](#engineering-rules)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

---

## Vision & Mission

**Mission**
> To build the world's most intelligent AI-powered Industry Operating Systems that help businesses operate, automate, analyze, and grow from a single platform.

**Vision**
> Every business, regardless of industry, should be able to run its entire operations through one intelligent platform powered by MianX.ai.

---

## What We're Not Building

| ❌ We don't sell (right now) | ✅ We are building |
|---|---|
| A website | An AI-native Business Operating System |
| A generic "AI agent agency" | An AI Workforce platform |
| An industry-specific ERP | A Project Factory that stands up new projects on Mianx Core |
| A standalone mobile app | A Founder Workspace that directs and approves AI work |

**Telepizza.pk** and **Al Hamdu Lillah Poultry Traders** are real,
Founder-relevant projects, but per the locked build order they are **later**
milestones — they will ship as "Powered by Mianx.ai" products only after
Mianx Core, the AI Runtime, the Project Factory, the Founder Workspace, the
Core Runtime Agents, and an end-to-end beta exist. They are not the current
product and must not be treated as such by contributors or AI agents working
in this repository.

---

## Platform Architecture

```text
                         Mianx.ai
        AI-Native Business Operating System · AI Workforce · Project Factory
                               │
────────────────────────────────────────────────
                  Mianx Core Platform
────────────────────────────────────────────────
Identity · Security · Communication · Automation
Intelligence (Analytics/AI Gateway) · Infrastructure
────────────────────────────────────────────────
                    AI Runtime
Task routing · Model routing · Policy enforcement · Evidence
────────────────────────────────────────────────
                 Project Factory
Turns an approved idea into a running project on Mianx Core
────────────────────────────────────────────────
                Founder Workspace
Direct the AI workforce · review work · approve what ships
────────────────────────────────────────────────
              Core Runtime Agents (10–12)
Sales · Support · Ops · Research · Marketing · Content · Data · QA
────────────────────────────────────────────────
   Website · Admin Dashboard · APIs · Future Delivery Surfaces
```

### MianX Core Modules

| Domain | Modules |
|---|---|
| Identity | Login, Registration, Users, Organizations, Companies, Branches, Teams |
| Security | Roles, Permissions, MFA (later), Audit Logs, Sessions |
| Communication | Email, SMS, WhatsApp, Push, Internal Notifications |
| Automation | Workflow Engine, Scheduled Jobs, Event Bus, Approval Engine |
| Intelligence | Dashboard Engine, Reporting Engine, Analytics Engine, AI Gateway |
| Infrastructure | Storage, Search, Cache, Queue, Monitoring, Backup |

---

## Product Line (Locked Order)

Rule: **one stage is completed, and Founder-approved, before the next one
starts.** This order is locked for the current phase; it is not to be
changed or expanded without explicit Founder approval, and no future vertical
should be treated as the current product ahead of its turn.

1. **Mianx Core** — identity, security, communication, automation, intelligence, infrastructure *(current priority — Phase A/B)*
2. **AI Runtime** — governed task/model routing, policy enforcement, evidence
3. **Project Factory** — turns an approved idea into a running project on Mianx Core
4. **Founder Workspace** — directs and approves AI workforce output
5. **10–12 Core Runtime Agents** — the first activated AI Workforce roles
6. **End-to-end Beta** — the full loop proven with a real workflow
7. **Telepizza** — "Powered by Mianx.ai" (RestaurantOS), *later*
8. **Poultry** (Al Hamdu Lillah Poultry Traders) — "Powered by Mianx.ai" (PoultryOS), *later*

Additional verticals (Hospital, School, Logistics, Construction, Retail,
Marketplace) remain long-term direction captured in `doc/` and the Master
Plan documents, but are out of scope until the steps above are delivered.

---

## Company Principles

1. **Business First** — understand the business before writing code.
2. **Domain First** — reverse-engineer every industry before building.
3. **Core First** — anything reusable belongs in MianX Core.
4. **Reuse Over Rewrite** — never rebuild what already exists.
5. **AI by Design** — AI is designed in from day one, not bolted on later.
6. **Simple UI** — Enterprise power, Apple-level simplicity.
7. **Measure Everything** — every action is tracked.
8. **Automation Before Manual** — automate before assigning to a human.
9. **API First** — every module communicates through an API.
10. **Scalable Forever** — designed to go from 1 client to 10,000.

---

## Reusability Rule

Before any component is built, ask:

> **"Can this be reused in HospitalOS, PoultryOS, SchoolOS, and future MianX.ai products?"**

- **YES** → goes into `core/` or a shared library.
- **NO** → stays in the domain-specific module folder.

---

## Repository Structure

```text
mianx/
├── core/
│   ├── identity/
│   ├── security/
│   ├── communication/
│   ├── automation/
│   ├── intelligence/
│   └── infrastructure/
├── products/
│   ├── restaurant-os/
│   ├── poultry-os/
│   ├── hospital-os/
│   └── school-os/
├── ai-workforce/
│   ├── ceo-agent/
│   ├── operations-agent/
│   └── ...
├── docs/
│   ├── 01_Vision/
│   ├── 02_Business_Research/
│   ├── 03_Domain_Analysis/
│   ├── 04_User_Personas/
│   ├── 05_Workflows/
│   ├── 06_Requirements/
│   ├── 07_Architecture/
│   ├── 08_Database/
│   ├── 09_APIs/
│   ├── 10_UI_UX/
│   ├── 11_AI_Agents/
│   ├── 12_Testing/
│   ├── 13_Deployment/
│   ├── 14_Case_Study/
│   └── 15_Lessons_Learned/
└── README.md
```

---

## Roadmap

Phase letters below track `execution/EXECUTION-BOARD.md`, which is the live,
authoritative status. Historical Master Plan phase numbers/durations in
`MianX_Master_Plan.docx` and `MianX_Master_Plan_v2.docx` remain useful
background context but are superseded by this locked order for execution
purposes.

| Phase | Focus |
|---|---|
| Phase A | Website and Development Foundation — this repo's runnable Next.js app, quality gates, execution control *(current)* |
| Phase B | Runtime Architecture ADR and Mianx Core foundation *(next, ready after Phase A)* |
| Phase C | AI Runtime — task/model routing, policy enforcement, evidence |
| Phase D | Project Factory |
| Phase E | Founder Workspace |
| Phase F | 10–12 Core Runtime Agents activated |
| Phase G | End-to-end Beta |
| Phase H+ | Telepizza and Poultry, "Powered by Mianx.ai" — later |

📄 Deeper background: `MianX_Master_Plan.docx`, `MianX_Master_Plan_v2.docx`, and `doc/20-ai-operating-system/MASTER-BLUEPRINT.md`.

---

## Documentation Standards

Every product ships with the following docs (this documentation *is* company IP):

`01_Vision` · `02_Business_Research` · `03_Domain_Analysis` · `04_User_Personas` · `05_Workflows` · `06_Requirements` · `07_Architecture` · `08_Database` · `09_APIs` · `10_UI_UX` · `11_AI_Agents` · `12_Testing` · `13_Deployment` · `14_Case_Study` · `15_Lessons_Learned`

After every project completes, extract:

- `PROJECT_REVIEW.md`
- `LESSONS_LEARNED.md`
- `REUSABLE_COMPONENTS.md`
- `DOMAIN_KNOWLEDGE.md`
- `NEXT_PROJECT_GUIDE.md`

---

## Engineering Rules

1. Code is the last step, not the first.
2. Document a module before building it.
3. Business rules before database design.
4. APIs before UI.
5. UI goes through UX before implementation.
6. Every feature ships with test cases.
7. Every release ends with a Lessons Learned note.

**Development lifecycle:**
`Discovery → Domain Research → Business Flow Mapping → UX → Architecture → Database → APIs → UI → Development → Testing → Pilot → Production → Feedback → Core Improvements → Public Release`

---

## Current Application (Phase A)

The repository root is a runnable **Next.js 14 (App Router)** application —
the Phase A website and lead-capture foundation:

- Public landing page (`app/page.jsx`) presenting the locked platform
  positioning and a live lead-capture form.
- `/api/leads` (public POST, protected GET) persists leads to Supabase.
- `/admin` — Supabase-authenticated dashboard to triage leads and optionally
  run a server-side AI analysis (`/api/analyze`, requires `ANTHROPIC_API_KEY`;
  gracefully disabled without it).
- `middleware.js` protects `/admin/*` and redirects unauthenticated users to
  `/admin/login`.

See [`AGENTS.md`](AGENTS.md) for local dev environment setup (including the
Cursor Cloud / local Supabase workflow) and
[`execution/EXECUTION-BOARD.md`](execution/EXECUTION-BOARD.md) for current
phase status, acceptance criteria, and evidence.

The Founder-approved final visual designs live in
[`design/approved/final-website/`](design/approved/final-website/)
(`mianx_website_public.html` for `/`, `mianx_admin_dashboard.html` for
`/admin`). They are the visual reference only — kept for reference, not
served or imported by the app — migrated into the React components under
`components/public/` and `components/admin/`. An earlier JSX prototype
(`mianx-ai-prototype.jsx`) was superseded by these and removed; do not
restore it.

---

## Getting Started

```bash
git clone <repo-url> mianx.ai
cd mianx.ai
npm install
cp .env.local.example .env.local   # fill in real values, or leave blank for a degraded/no-Supabase run
npm run dev                        # http://localhost:3000
```

See [`AGENTS.md`](AGENTS.md) for the full local Supabase / Cursor Cloud dev
workflow, and the sections below for the longer-term multi-project vision.

---

## Contributing

Before opening a PR, confirm:

- [ ] Does this belong in `core/` or a specific `products/*-os/` folder? (see [Reusability Rule](#reusability-rule))
- [ ] Is the relevant doc in `docs/` updated?
- [ ] Does it follow API First / Automation Before Manual?
- [ ] Are test cases included?

---

**One by one. No distraction. High quality. Reusable architecture.** 🚀
