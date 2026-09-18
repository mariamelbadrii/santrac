import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useAdminSiteSettingsRaw } from "@/lib/settings/SiteSettingsContext";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminSettings() {
  const { row, loading } = useAdminSiteSettingsRaw();
  const [form, setForm] = useState({
    whatsapp_number: "",
    phone: "",
    email: "",
    facebook_url: "",
    instagram_url: "",
    linkedin_url: "",
  });
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    if (row) setForm(row);
  }, [row]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("saving");
    const { error } = await supabase.from("site_settings").update(form).eq("id", 1);
    setStatus(error ? "error" : "saved");
  };

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    setStatus("idle");
  };

  if (loading) return <p className="text-sm text-ink-500">Loading…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Settings</h1>
      <p className="mt-1 text-sm text-ink-500">
        Contact details and social links shown across the public site.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
        <Field label="WhatsApp number" htmlFor="whatsapp_number" hint="Digits only, with country code">
          <Input id="whatsapp_number" value={form.whatsapp_number} onChange={update("whatsapp_number")} />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <Input id="phone" value={form.phone} onChange={update("phone")} />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input id="email" type="email" value={form.email} onChange={update("email")} />
        </Field>
        <Field label="Facebook URL" htmlFor="facebook_url">
          <Input id="facebook_url" value={form.facebook_url} onChange={update("facebook_url")} />
        </Field>
        <Field label="Instagram URL" htmlFor="instagram_url">
          <Input id="instagram_url" value={form.instagram_url} onChange={update("instagram_url")} />
        </Field>
        <Field label="LinkedIn URL" htmlFor="linkedin_url">
          <Input id="linkedin_url" value={form.linkedin_url} onChange={update("linkedin_url")} />
        </Field>

        <div className="sm:col-span-2">
          <Button type="submit" disabled={status === "saving"}>
            {status === "saving" ? "Saving…" : "Save changes"}
          </Button>
          {status === "saved" && <span className="ms-3 text-sm text-emerald-600">Saved.</span>}
          {status === "error" && <span className="ms-3 text-sm text-brand-600">Something went wrong.</span>}
        </div>
      </form>
    </div>
  );
}
