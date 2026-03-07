# Product Requirements Document (PRD)
## GoodMatter — Private Investment Community Platform

**Version:** 1.0  
**Date:** March 7, 2026  
**Status:** Draft

---

## 1. Executive Summary

GoodMatter is a private, invite-curated platform that connects exceptional early-stage founders with a trusted network of investors — angels, VCs, and operators. Unlike open marketplaces, GoodMatter operates as a **gated community** where every deal is reviewed, vetted, and distributed privately, ensuring high signal-to-noise for investors and meaningful partnerships for founders.

The platform also offers **Impact Studio** — a suite of bespoke services (financial modeling, pitch deck creation, virtual CFO, legal docs) to help founders become investor-ready.

---

## 2. Problem Statement

| Stakeholder | Pain Point |
|---|---|
| **Investors** | Overwhelmed by low-quality deal flow; no trusted curation layer; transactional introductions |
| **Founders** | Difficulty reaching the right investors; generic pitch distribution; lack of fundraising support infrastructure |
| **Ecosystem** | Misaligned incentives between founders and investors; volume-over-quality culture in early-stage fundraising |

---

## 3. Product Vision

> *Good deals. Good people. Good Matter.*

Build the most trusted private community for early-stage investment by prioritizing **quality over quantity**, **alignment over hype**, and **community over transactions**.

---

## 4. Target Users

### 4.1 Investors (Primary)
- Angel investors actively deploying capital
- Micro-VCs and early-stage venture funds
- Operators and executives investing personally
- Family offices exploring direct startup investments

### 4.2 Founders (Primary)
- Pre-seed to Series A stage startups
- Tech-first companies with demonstrated traction or unique insight
- Founders seeking strategic capital, not just cheques

### 4.3 Partners (Secondary)
- Service providers (legal, financial, branding)
- Ecosystem partners (accelerators, communities)
- BLKBOOK (events & matchmaking partner)

---

## 5. Core Features

### 5.1 Public Website
| Feature | Description | Priority |
|---|---|---|
| Home Page | Hero, social proof, value props, featured deals, team, CTA | P0 |
| About Page | Mission, methodology, philosophy | P0 |
| Contact Page | Form (name, email, phone, inquiry type, message) + partnerships info | P0 |
| Impact Studio Page | Services for founders — process, pricing, BLKBOOK partnership | P0 |

### 5.2 Investor Private Access
| Feature | Description | Priority |
|---|---|---|
| Investor Login | Email/password authentication via Supabase | P0 |
| Curated Dealflow Dashboard | Grid of vetted startup deal cards | P0 |
| Deal Detail View | Full breakdown — overview, founders, product, traction, fundraising, attachments | P0 |
| Request Introduction | Button to express interest in meeting a founder | P1 |
| Deal Notifications | Email digest of new deals shared with the community | P2 |

### 5.3 Founder Application
| Feature | Description | Priority |
|---|---|---|
| Startup Submission Form | Name, sector, stage, raise amount, description, pitch deck upload | P0 |
| Application Status Tracking | Founders can check if their startup is under review / accepted / distributed | P2 |

### 5.4 Impact Studio Services
| Feature | Description | Priority |
|---|---|---|
| Services Catalog | Pitch deck, financial modeling, valuation, combo packages | P0 |
| Virtual CFO Plans | 4 tiers (Starter → Fundraising CFO) + one-time registrations + add-ons | P0 |
| BLKBOOK x GoodMatter | Events, memberships, private sessions, matchmaking | P1 |

---

## 6. Non-Functional Requirements

| Requirement | Target |
|---|---|
| **Performance** | First Contentful Paint < 1.5s; Time to Interactive < 3s |
| **Accessibility** | WCAG 2.1 AA compliance |
| **Responsiveness** | Full support for mobile (375px+), tablet (768px+), desktop (1024px+) |
| **Security** | Supabase RLS on all tables; HTTP-only cookies; server-side session validation |
| **SEO** | Server-rendered pages; proper meta tags; semantic HTML; sitemap |
| **Availability** | 99.9% uptime target via serverless deployment (OpenNext) |

---

## 7. Success Metrics

| Metric | Target (6 months) |
|---|---|
| Registered investors | 200+ |
| Startups reviewed | 100+ |
| Deals distributed to investors | 30+ |
| Investor introduction requests per deal | 5+ avg |
| Contact form submissions | 50+ |
| Impact Studio service inquiries | 20+ |

---

## 8. Out of Scope (v1)

- Payment processing for Impact Studio services
- In-app messaging between investors and founders
- Investor portfolio tracking
- Mobile native apps (iOS/Android)
- Admin dashboard for GoodMatter team (manage via Supabase dashboard for v1)
- Automated deal scoring / AI-based screening

---

## 9. Assumptions & Dependencies

| Item | Detail |
|---|---|
| Supabase | Handles auth, database, storage (pitch decks, financials) |
| OpenNext | Deployment to serverless platform (AWS/Cloudflare) |
| Manual Curation | The GoodMatter team manually reviews and approves startups before distributing |
| Content | Team headshots, partner logos, and deal data provided by the GoodMatter team |

---

## 10. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Low investor sign-up rate | Low deal engagement | Pre-launch outreach; leverage existing network |
| Data security breach | Trust erosion | Supabase RLS; server-side auth validation; no sensitive data in client bundles |
| Founder submission spam | Noise in pipeline | Rate limiting on forms; CAPTCHA; manual review gate |
| Scope creep on Impact Studio | Delayed launch | Ship services as static content first; add dynamic booking in v2 |
