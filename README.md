# WaHustle

WhatsApp-first AI assistant and dashboard that helps solo product sellers automate
marketing, stay on top of sales, and look professional without extra staff.

## 🚀 Core Concept
WaHustle keeps small sellers productive by handling repetitive WhatsApp work:

- Auto-generate catalog entries from product photos.
- Draft and schedule WhatsApp status posts with reminders.
- Suggest or send intelligent replies to customer DMs.
- Track sales, expenses, and inventory with simple chat commands.
- Deliver actionable insights and marketing tips.

The mission: **save time, increase sales, reduce manual work, and make small sellers
feel professional.**

## 🧱 System Architecture
WaHustle is composed of three collaborative layers:

### 1. WhatsApp Bot (Cloud API)
- Receives structured commands such as `Sold: Blue gown ₦10,000` and
  `Expense: Delivery ₦2,000`.
- Sends AI-powered replies, FAQ answers, reminders, and summaries.
- Generates "tap to post" status packs and alerts users when action is needed.
- Stores minimal interaction logs for analytics and auditing.
- **Stack:** Node.js or Python backend (FastAPI), Meta WhatsApp Cloud API, webhook
  middleware for AI services.

### 2. Web Dashboard (Mobile-first)
- Upload product images, organize catalogs, preview AI captions, and approve
  schedules.
- Visualize sales trends, expenses, and marketing performance.
- Sync and back up data to Google Sheets or Docs.
- **Stack:** React + Vite + TailwindCSS frontend, Node.js/Python backend with
  Supabase/Firebase for auth and storage, GPT/Vision APIs for AI tooling.

### 3. AI Engine
- **Catalog AI:** Detects products from images, suggests titles/descriptions,
  prices, categories, hashtags.
- **Posting AI:** Plans daily status content, compresses images, drafts captions
  and marketing copy.
- **Reply AI:** Understands buyer queries, proposes responses, and stores CRM
  snippets.
- **Business Advisor AI:** Tracks sales vs. expenses, surfaces top sellers, and
  issues daily/weekly insights.

### 4. Integrations
- Google Sheets & Docs for syncing reports.
- Cloud storage for media backups.
- Paystack/Flutterwave for subscription billing.

## 🌱 User Journey
1. **Sign Up:** WhatsApp + email verification.
2. **Upload Products:** Dashboard ingestion → AI captions, prices, and status
   packs.
3. **Posting Status:** AI builds schedule and reminds users to post.
4. **Customer Interaction:** Bot replies and saves CRM data.
5. **Track Sales & Expenses:** Users type simple commands; AI updates analytics.
6. **Insights & Tips:** Weekly marketing tips (best posting times, top items,
   strategies).

## 🎯 MVP Feature Prioritization (v1.0)
| Priority | Feature            | Value                                      |
|----------|--------------------|---------------------------------------------|
| 1        | Catalog Builder    | Saves hours by automating product entries.  |
| 2        | Status Scheduler   | Keeps marketing consistent.                 |
| 3        | Reply Assistant    | Makes seller communication professional.    |
| 4        | Sales Tracker      | Provides daily/monthly performance data.    |
| 5        | Basic Dashboard    | Centralizes control and backups.            |
| 6        | AI Marketing Tips  | Drives growth with tailored suggestions.    |
| 7        | Google Sheets Sync | Guarantees data backups and reporting.      |

## 💰 Monetization Strategy
- **Freemium:** Catalog builder + 5 statuses/day + 50 AI replies/week.
- **Paid tiers (Nigeria-focused):**
  - Starter ₦1,000/week
  - Growth ₦3,500/week
  - Student ₦500/week
- **Add-ons:** Marketing templates (₦500/week) and CRM extensions (₦1,000/week).
- **Referral program:** Students/vendors earn 1 free week per referral.

## 🗺️ Development Roadmap (6-week MVP)
| Week | Focus                | Highlights |
|------|---------------------|------------|
| 1    | Foundation          | Branding, hosting, WhatsApp Cloud API, auth. |
| 2    | Catalog Builder     | Upload pipeline, AI detection, captions.     |
| 3    | Status Scheduler    | Posting plan, image compression, reminders.  |
| 4    | Reply Assistant     | Bot replies, FAQ automation, CRM capture.    |
| 5    | Sales Tracker       | Parse sales/expenses, dashboards, summaries. |
| 6    | Polish & Launch     | UI tweaks, payments, optimization, beta.     |

## 🧭 Early Growth & Adoption
- **Target personas:** Campus vendors, fashion/wig sellers, gadget resellers.
- **Hooks:** "Post once, sell all week." / "Your WhatsApp shop, fully automated."
- **Programs:** Campus ambassador onboarding and viral social tutorials.

## 🔭 Post-MVP (v2.0+)
- Full WhatsApp automation for catalog + status.
- Expand to service-based sellers and other platforms (Instagram, TikTok, Jumia,
  Konga).
- AI-driven pricing optimization and premium analytics.
- Gamified leaderboards to keep sellers engaged.

## 🛠️ Tech Stack Snapshot
- **Frontend:** React, Vite, TailwindCSS.
- **Backend:** FastAPI or Node.js (Express/Nest), Supabase or Firebase for auth &
  storage.
- **AI:** OpenAI GPT, Vision API, custom prompt chains.
- **Data & Storage:** PostgreSQL via Supabase, Google Sheets/Docs integrations,
  cloud storage buckets.
- **Payments:** Paystack / Flutterwave.

## 🏁 Getting Started (WIP)
Project scaffolding is still underway. Planned steps:
1. Provision WhatsApp Cloud API keys and webhook endpoints.
2. Scaffold backend (FastAPI) and dashboard frontend (React + Vite).
3. Configure Supabase project and storage buckets.
4. Implement CI/CD, linting, formatting, and prompt templates.

---
**Next up:** finalize architecture decisions, bootstrap the codebase, and start
shipping the Week 1 foundation tasks.
