# MianX.ai

**AI-Powered Industry Operating Systems**
> Transforming Industries with AI.

MianX.ai is not a software house and not a single product — it is a **Platform Company** building reusable, AI-native "Industry Operating Systems" (Industry OS) on top of one shared core. Every vertical (restaurant, poultry, hospital, school, logistics, construction, retail) ships as its own OS, but all of them stand on the same foundation: **MianX Core**.

> **Core idea:** Design the *system* before the *product*. Every new Industry OS reuses 40–90% of what came before it, because the foundation already exists.

---

## Table of Contents

- [Vision & Mission](#vision--mission)
- [What We're Not Building](#what-were-not-building)
- [Platform Architecture](#platform-architecture)
- [Product Line (Locked Order)](#product-line-locked-order)
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

| ❌ We don't sell | ✅ We sell |
|---|---|
| A website | A Business Operating System |
| A standalone ERP | An Industry Intelligence Platform |
| A standalone CRM | An AI-Powered Ecosystem |
| A standalone mobile app | Reusable Core + Industry Modules |

Client projects (e.g. **Telepizza.pk**, **Al Hamdu Lillah Poultry Traders**) are **Founding Design Partners**, not just customers — they shape the product (RestaurantOS, PoultryOS) and become its first live deployment.

---

## Platform Architecture

```text
                         MianX.ai
                  Industry Intelligence Platform
                               │
────────────────────────────────────────────────
                  MianX Core Platform
────────────────────────────────────────────────
Identity · Security · Communication · Automation
Intelligence (Analytics/AI Gateway) · Infrastructure
────────────────────────────────────────────────
              Industry Business Modules
RestaurantOS · PoultryOS · HospitalOS · SchoolOS
LogisticsOS · RetailOS · ConstructionOS · ClinicOS
────────────────────────────────────────────────
                 AI Workforce Layer
CEO · Operations · Marketing · Sales · Finance
HR · Customer Success · Inventory · Analytics
────────────────────────────────────────────────
   Website · Mobile Apps · Admin · POS · Dashboards
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

Rule: **one product is completed before the next one starts.** After each Industry OS, the Core is upgraded before the next vertical begins.

1. **RestaurantOS** — Launch Partner: Telepizza.pk *(current priority)*
2. MianX Core v1.0 upgrade
3. **PoultryOS** — Launch Partner: Al Hamdu Lillah Poultry Traders
4. MianX Core v2.0 upgrade
5. **HospitalOS** (~80% reuse)
6. **SchoolOS** (~85% reuse)
7. **LogisticsOS** (~90% reuse)
8. **ConstructionOS**
9. **MianX Marketplace** — third-party plugins, extensions, AI agents

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

| Phase | Focus | Duration |
|---|---|---|
| Phase 0 | Foundation — standards, Product Bible v1 | 30 days |
| Phase 1 | MianX Core Platform | 45–60 days |
| Phase 2 | RestaurantOS Discovery (no code) | 15 days |
| Phase 3 | RestaurantOS v1 — Telepizza launch | 90 days |
| Phase 4 | RestaurantOS Enterprise (Inventory, HR, Accounting) | 60 days |
| Phase 5 | AI Workforce (Support, Marketing, Sales agents) | 60 days |
| Phase 6 | RestaurantOS Marketplace (integrations) | — |
| Phase 7 | RestaurantOS Global (i18n, white label) | — |
| Phase 8 | PoultryOS | — |
| Phase 9 | HospitalOS | — |
| Phase 10 | SchoolOS | — |
| Phase 11 | LogisticsOS | — |
| Phase 12 | MianX Marketplace | — |

📄 Full details: see **MianX Master Plan** document (`/docs/MianX_Master_Plan.docx`).

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

## Getting Started

> ⚠️ Setup instructions below are a placeholder — update once the Core repo, stack, and environment are finalized in Sprint 0/1.

```bash
# clone the repo
git clone <repo-url> mianx
cd mianx

# install dependencies (per module)
# ...

# run core services
# ...
```

---

## Contributing

Before opening a PR, confirm:

- [ ] Does this belong in `core/` or a specific `products/*-os/` folder? (see [Reusability Rule](#reusability-rule))
- [ ] Is the relevant doc in `docs/` updated?
- [ ] Does it follow API First / Automation Before Manual?
- [ ] Are test cases included?

---

**One by one. No distraction. High quality. Reusable architecture.** 🚀
