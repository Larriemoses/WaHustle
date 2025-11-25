# WaHustle

WhatsApp-first AI assistant and dashboard for solo product sellers. WaHustle automates catalog creation, posting, smart replies, and sales tracking so sellers save time and look professional.

---

## Visual overview (tooling at a glance)
Below are lightweight inline SVG badges showing the core tools currently planned/used.

<table>
  <tr>
    <td align="center">
      <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="60" rx="10" fill="#393" />
        <text x="60" y="35" font-size="18" font-family="Arial" fill="#fff" text-anchor="middle">Node.js</text>
      </svg>
      <div>Backend runtime</div>
    </td>
    <td align="center">
      <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="60" rx="10" fill="#25D366" />
        <text x="60" y="35" font-size="18" font-family="Arial" fill="#fff" text-anchor="middle">WhatsApp</text>
      </svg>
      <div>Cloud API</div>
    </td>
    <td align="center">
      <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="60" rx="10" fill="#61DBFB" />
        <text x="60" y="35" font-size="18" font-family="Arial" fill="#0F2027" text-anchor="middle">React</text>
      </svg>
      <div>Dashboard UI</div>
    </td>
    <td align="center">
      <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="60" rx="10" fill="#1A1F2B" />
        <text x="60" y="28" font-size="16" font-family="Arial" fill="#3FCF8E" text-anchor="middle">Supabase</text>
        <text x="60" y="44" font-size="12" font-family="Arial" fill="#9AA5B1" text-anchor="middle">Auth & DB</text>
      </svg>
      <div>Auth + storage</div>
    </td>
    <td align="center">
      <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="60" rx="10" fill="#24292e" />
        <text x="60" y="28" font-size="14" font-family="Arial" fill="#fff" text-anchor="middle">GH Actions</text>
        <text x="60" y="44" font-size="12" font-family="Arial" fill="#9dc6ff" text-anchor="middle">CI/CD</text>
      </svg>
      <div>Automation</div>
    </td>
  </tr>
</table>

---

## Project snapshot
- **Problem:** Small sellers lose time replying to DMs, posting statuses, and tracking sales manually.
- **Solution:** A WhatsApp-first copilot that drafts replies, builds product catalogs from photos, schedules status posts, and logs sales via chat commands.
- **Target personas:** Campus vendors, fashion/wig sellers, gadget resellers.

---

## Architecture
**Three-layer model with Node.js backend focus.**

1. **WhatsApp Bot (Cloud API)**
   - Receives structured commands such as `Sold: Blue gown ₦10,000` and `Expense: Delivery ₦2,000`.
   - Sends AI-powered replies, FAQ answers, reminders, and summaries.
   - Webhook middleware in Node.js (Express/Nest) for verification, message dispatch, and logging.

2. **Web Dashboard (Mobile-first React + Vite + Tailwind)**
   - Upload product images, generate AI captions, manage status schedules.
   - Visualize sales/expenses and sync data to Google Sheets.
   - Auth + storage via Supabase or Firebase.

3. **AI Engine (provider-agnostic)**
   - Catalog AI (image→title/description/price/categories/hashtags).
   - Posting AI (status plan, image compression, captions).
   - Reply AI (DM understanding, suggested replies, CRM snippets).
   - Business Advisor AI (sales vs. expenses, top sellers, insights).

4. **Integrations**
   - Google Sheets/Docs for reporting backups.
   - Paystack/Flutterwave for payments.

---

## Roadmap (6-week MVP)
| Week | Focus | Deliverables |
|------|-------|--------------|
| 1 | Foundation | Branding, hosting, WhatsApp Cloud API, auth bootstrap |
| 2 | Catalog Builder | Upload pipeline, AI detection, captions |
| 3 | Status Scheduler | Posting plan, image compression, reminders |
| 4 | Reply Assistant | Bot replies, FAQ automation, CRM capture |
| 5 | Sales Tracker | Parse sales/expenses, dashboards, summaries |
| 6 | Polish & Launch | UI tweaks, payments, optimization, beta |

**Progress SVG:**

<svg width="600" height="70" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="25" width="90" height="20" fill="#25D366" rx="6"/>
  <rect x="110" y="25" width="90" height="20" fill="#ffcc00" rx="6"/>
  <rect x="210" y="25" width="90" height="20" fill="#e0e0e0" rx="6"/>
  <rect x="310" y="25" width="90" height="20" fill="#e0e0e0" rx="6"/>
  <rect x="410" y="25" width="90" height="20" fill="#e0e0e0" rx="6"/>
  <rect x="510" y="25" width="90" height="20" fill="#e0e0e0" rx="6"/>
  <text x="55" y="20" font-family="Arial" font-size="12" text-anchor="middle">Week 1</text>
  <text x="155" y="20" font-family="Arial" font-size="12" text-anchor="middle">Week 2</text>
  <text x="255" y="20" font-family="Arial" font-size="12" text-anchor="middle">Week 3</text>
  <text x="355" y="20" font-family="Arial" font-size="12" text-anchor="middle">Week 4</text>
  <text x="455" y="20" font-family="Arial" font-size="12" text-anchor="middle">Week 5</text>
  <text x="555" y="20" font-family="Arial" font-size="12" text-anchor="middle">Week 6</text>
  <text x="55" y="60" font-family="Arial" font-size="12" text-anchor="middle" fill="#fff">In progress</text>
  <text x="155" y="60" font-family="Arial" font-size="12" text-anchor="middle" fill="#000">Next</text>
</svg>

---

## WhatsApp Cloud API setup (Node.js)
Use this checklist to provision a Meta-hosted WhatsApp number and wire it to your Node backend.

1. **Create/verify a Meta Business account.** Visit [developers.facebook.com/apps](https://developers.facebook.com/apps), create a Business account (or reuse yours), and complete business verification so production sends are allowed.
2. **Create a WhatsApp app.** In the Meta Developer Console click **Create App → Other → Business**, name it (e.g., `WaHustle Bot`), and add the **WhatsApp** product.
3. **Claim or use the test phone number.** In **WhatsApp → API Setup** you get a temporary test number and **Phone Number ID**. For launch, register your own business line and record both the **Phone Number ID** and **WhatsApp Business Account ID**.
4. **Generate an access token.** In **API Setup** click **Generate token** (or create a long-lived system user token in **Business Settings → Users → System Users**). Ensure `whatsapp_business_messaging` and `whatsapp_business_management` permissions and store the token securely.
5. **Set the webhook URL.** Under **Configuration** supply your Node server URL (e.g., `https://api.yourdomain.com/webhooks/whatsapp`) plus a verify token string. Implement a GET handler that echoes `hub.challenge` and a POST handler to process messages/events.
6. **Subscribe to fields.** Enable `messages`, `message_template_status_update`, and any other required events, then **Verify and Save**.
7. **Test messaging.** From **Send and receive messages** (or `POST /v18.0/{PHONE_NUMBER_ID}/messages`) send a text/template to a verified recipient; confirm your webhook logs the inbound delivery/read updates.
8. **Env vars for Node.js.** Add to `.env`: `WAH_WHATSAPP_TOKEN`, `WAH_PHONE_NUMBER_ID`, `WAH_WABA_ID`, `WAH_VERIFY_TOKEN`. Load them in Express/Nest services for API calls and verification.
9. **Production readiness.** Complete the WhatsApp Business profile, request template approvals, rotate temporary tokens to long-lived ones, and document key IDs in your runbook.

---

## Local development
1. **Clone & install**
   ```bash
   git clone <repo>
   cd WaHustle
   npm install
   ```
2. **Environment variables**
   - `WAH_WHATSAPP_TOKEN`, `WAH_PHONE_NUMBER_ID`, `WAH_WABA_ID`, `WAH_VERIFY_TOKEN`
   - `SUPABASE_URL`, `SUPABASE_ANON_KEY` (or Firebase equivalents)
   - `AI_PROVIDER` and corresponding keys (Hugging Face / Cohere / OpenAI)
3. **Run (example Express server)**
   ```bash
   npm run dev
   ```
4. **Webhook tunneling for local testing**
   ```bash
   npx localtunnel --port 3000 --subdomain wahustle-dev
   ```
   Register `https://wahustle-dev.loca.lt/webhooks/whatsapp` in Meta console.

---

## AI provider options (cost-aware)
- **Starter (free/low-cost):** Hugging Face Inference API (e.g., `mistral-7b`), Cohere Command R, or Together AI.
- **Upgrade path:** Swap to OpenAI GPT/Vision by updating provider env vars; keep middleware provider-agnostic.
- **Design tip:** Centralize prompt + provider adapters so future swaps avoid refactoring features.

---

## Monetization (Nigeria-first)
- **Freemium:** Catalog builder + 5 statuses/day + 50 AI replies/week.
- **Paid tiers:** Starter ₦1,000/week, Growth ₦3,500/week, Student ₦500/week.
- **Add-ons:** Marketing templates (₦500/week), CRM extensions (₦1,000/week).
- **Referrals:** 1 free week per successful referral.

---

## Contributing
- Use feature branches, conventional commits, and open PRs with screenshots for UI changes.
- Add linting/formatting (ESLint/Prettier) and GitHub Actions checks when scaffolding code.
- Keep secrets in `.env` (never commit).

---

**Next up:** Finalize backend scaffolding (Node.js + Express/Nest), wire the WhatsApp webhook, and stand up Supabase auth so Week 1 foundation ships quickly.
