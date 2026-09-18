// Supabase Edge Function: sends an admin email when a new lead is inserted.
//
// Trigger: a Supabase Database Webhook on `leads` INSERT (configure in the
// Supabase dashboard — Database → Webhooks — pointing at this function's
// URL; no SQL needed). Deploy with:
//   supabase functions deploy notify-new-lead
//
// Secrets (set with `supabase secrets set`, never hardcoded or shipped to
// the client):
//   RESEND_API_KEY     — from resend.com (or swap sendEmail() for another provider)
//   ADMIN_NOTIFY_EMAIL — where the notification should be sent
//
// If RESEND_API_KEY isn't set, the function no-ops (returns 200) so an
// unconfigured deployment never errors the webhook — it just skips
// sending until the secret is added.

interface LeadWebhookPayload {
  type: "INSERT";
  table: "leads";
  record: {
    id: string;
    full_name: string;
    phone: string;
    email: string | null;
    company: string | null;
    equipment_need: string;
    location: string;
    additional_requirements: string | null;
    source: string | null;
  };
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  const notifyEmail = Deno.env.get("ADMIN_NOTIFY_EMAIL");

  if (!apiKey || !notifyEmail) {
    // Not configured yet — accept the webhook without erroring.
    return new Response(JSON.stringify({ skipped: true }), { status: 200 });
  }

  const payload = (await req.json()) as LeadWebhookPayload;
  const lead = payload.record;

  const subject = `New lead: ${lead.full_name} — ${lead.equipment_need}`;
  const body = [
    `Name: ${lead.full_name}`,
    `Phone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    lead.company ? `Company: ${lead.company}` : null,
    `Equipment: ${lead.equipment_need}`,
    `Location: ${lead.location}`,
    lead.additional_requirements ? `Message: ${lead.additional_requirements}` : null,
    lead.source ? `Source: ${lead.source}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "SANTRAC Leads <leads@notifications.santrac.example>",
      to: [notifyEmail],
      subject,
      text: body,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return new Response(JSON.stringify({ error: errText }), { status: 502 });
  }

  return new Response(JSON.stringify({ sent: true }), { status: 200 });
});
