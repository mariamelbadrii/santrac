import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { LeadRow, LeadStatus } from "@/lib/database.types";
import { whatsappLink } from "@/lib/config";
import { useSiteSettings } from "@/lib/settings/SiteSettingsContext";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";

const statuses: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "quoted",
  "negotiating",
  "won",
  "lost",
];

const statusTone: Record<LeadStatus, "brand" | "neutral" | "success" | "warning"> = {
  new: "brand",
  contacted: "neutral",
  qualified: "neutral",
  quoted: "warning",
  negotiating: "warning",
  won: "success",
  lost: "neutral",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const settings = useSiteSettings();

  useEffect(() => {
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setLeads(data ?? []);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: string, status: LeadStatus) => {
    setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
    await supabase.from("leads").update({ status }).eq("id", id);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Leads</h1>
      <p className="mt-1 text-sm text-ink-500">
        Every Request Quote and Contact submission appears here automatically.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {loading ? (
          <p className="text-sm text-ink-500">Loading…</p>
        ) : leads.length === 0 ? (
          <p className="text-sm text-ink-500">No leads yet.</p>
        ) : (
          leads.map((lead) => {
            const waHref = whatsappLink(
              `Hi ${lead.full_name}, thanks for your enquiry about ${lead.equipment_need}.`,
              lead.phone || settings.whatsappNumber,
            );
            const utm = [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean);

            return (
              <div key={lead.id} className="rounded-lg border border-ink-200 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-ink-900">{lead.full_name}</p>
                      <Badge tone={statusTone[lead.status]}>{lead.status}</Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-ink-400">{formatDate(lead.created_at)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {waHref && (
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center gap-1.5 rounded border border-ink-200 px-3 text-xs font-semibold text-ink-700 hover:border-emerald-500 hover:text-emerald-600"
                      >
                        <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
                        WhatsApp
                      </a>
                    )}
                    <Select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                      className="h-9 w-auto"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-4">
                  <div>
                    <dt className="text-xs text-ink-400">Phone</dt>
                    <dd className="text-ink-800" dir="ltr">
                      {lead.phone}
                    </dd>
                  </div>
                  {lead.email && (
                    <div>
                      <dt className="text-xs text-ink-400">Email</dt>
                      <dd className="text-ink-800">{lead.email}</dd>
                    </div>
                  )}
                  {lead.company && (
                    <div>
                      <dt className="text-xs text-ink-400">Company</dt>
                      <dd className="text-ink-800">{lead.company}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs text-ink-400">Location</dt>
                    <dd className="text-ink-800">{lead.location}</dd>
                  </div>
                  <div className="col-span-2 sm:col-span-4">
                    <dt className="text-xs text-ink-400">Equipment requested</dt>
                    <dd className="text-ink-800">{lead.equipment_need}</dd>
                  </div>
                  {lead.additional_requirements && (
                    <div className="col-span-2 sm:col-span-4">
                      <dt className="text-xs text-ink-400">Message</dt>
                      <dd className="text-ink-800">{lead.additional_requirements}</dd>
                    </div>
                  )}
                </dl>

                {(lead.source || utm.length > 0) && (
                  <p className="mt-3 text-xs text-ink-400">
                    {[lead.source, ...utm].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
