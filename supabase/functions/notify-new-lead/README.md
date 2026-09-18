# notify-new-lead

Sends an email to the admin when a new lead is inserted. Not deployed or
active until you do the steps below — inserts work fine without it either
way, this is purely the notification layer.

## Setup (once a Supabase project is connected)

1. **Pick an email provider.** This function is written for
   [Resend](https://resend.com) (generous free tier, simple API). Swap the
   `fetch` call in `index.ts` for a different provider if you prefer one.
2. **Verify a sending domain** with that provider and update the `from`
   address in `index.ts` — the placeholder `notifications.santrac.example`
   will not send.
3. **Deploy the function:**
   ```
   supabase functions deploy notify-new-lead
   ```
4. **Set secrets** (server-side only — never exposed to the browser):
   ```
   supabase secrets set RESEND_API_KEY=your_key_here
   supabase secrets set ADMIN_NOTIFY_EMAIL=owner@santrac.example
   ```
5. **Wire the trigger** — in the Supabase dashboard: Database → Webhooks →
   Create a new webhook → table `leads`, event `INSERT`, target this
   function's URL (shown after deploy). No SQL migration needed for this
   part; webhooks are dashboard-managed.

Until steps 3–5 are done, new leads still save correctly — they just won't
trigger an email. The function itself no-ops safely if the secrets aren't
set, so a partially-configured deployment won't error out.

## Future: WhatsApp notifications

Architected the same way this is meant to extend — a second Database
Webhook (or a branch inside this function) calling a WhatsApp Business API
send-message endpoint, gated behind its own secret (e.g.
`WHATSAPP_API_TOKEN`), added the same way as the email secrets above.
