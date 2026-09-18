import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { LeadRow, LeadStatus } from "@/lib/database.types";
import { Select } from "@/components/ui/Select";

const statuses: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "quoted",
  "negotiating",
  "won",
  "lost",
];

export default function AdminLeads() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);

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

      <div className="mt-6 overflow-hidden rounded-lg border border-ink-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-left text-ink-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Needs</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-ink-500" colSpan={5}>
                  Loading…
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-ink-500" colSpan={5}>
                  No leads yet.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="border-t border-ink-100">
                  <td className="px-4 py-3 text-ink-900">{lead.full_name}</td>
                  <td className="px-4 py-3 text-ink-600">{lead.phone}</td>
                  <td className="px-4 py-3 text-ink-600">{lead.equipment_need}</td>
                  <td className="px-4 py-3 text-ink-600">{lead.location}</td>
                  <td className="px-4 py-3">
                    <Select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                      className="h-9"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
