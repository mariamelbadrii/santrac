import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import {
  toRawSiteSettings,
  useAdminSiteSettingsRaw,
  type RawSiteSettings,
} from "@/lib/settings/SiteSettingsContext";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

const emptyForm: RawSiteSettings = {
  whatsapp_number: "",
  phone: "",
  secondary_phone: "",
  email: "",
  address_en: "",
  address_ar: "",
  hours_en: "",
  hours_ar: "",
  facebook_url: "",
  instagram_url: "",
  linkedin_url: "",
  tiktok_url: "",
  youtube_url: "",
};

export default function AdminSettings() {
  const { row, loading } = useAdminSiteSettingsRaw();
  const [form, setForm] = useState<RawSiteSettings>(emptyForm);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (row) setForm(row);
  }, [row]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("saving");
    setErrorMessage(null);

    // Upsert (not a plain update) so the singleton row is written correctly
    // even if it were ever missing, and .select().single() hands back what
    // was actually persisted so the form re-syncs to the real saved state
    // instead of trusting the values we optimistically typed in.
    const { data, error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, ...form }, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      console.error("Failed to save site settings:", error);
      setErrorMessage(error.message);
      setStatus("error");
      return;
    }

    setForm(toRawSiteSettings(data));
    setStatus("saved");
  };

  const update =
    (key: keyof RawSiteSettings) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      setStatus("idle");
      setErrorMessage(null);
    };

  if (loading) return <p className="text-sm text-ink-500">Loading…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Settings</h1>
      <p className="mt-1 text-sm text-ink-500">
        Contact details, address, hours, and social links shown across the public site. Changing
        these here updates the header, footer, contact page, and quote CTAs everywhere at once.
      </p>

      <form onSubmit={onSubmit} className="mt-6 flex max-w-2xl flex-col gap-8">
        <section className="grid gap-4 sm:grid-cols-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-500 sm:col-span-2">
            Contact
          </h2>
          <Field label="WhatsApp number" htmlFor="whatsapp_number" hint="Digits only, with country code">
            <Input id="whatsapp_number" value={form.whatsapp_number} onChange={update("whatsapp_number")} />
          </Field>
          <Field label="Primary phone" htmlFor="phone">
            <Input id="phone" value={form.phone} onChange={update("phone")} />
          </Field>
          <Field label="Secondary phone" htmlFor="secondary_phone">
            <Input id="secondary_phone" value={form.secondary_phone} onChange={update("secondary_phone")} />
          </Field>
          <Field label="Email" htmlFor="email">
            <Input id="email" type="email" value={form.email} onChange={update("email")} />
          </Field>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-500 sm:col-span-2">
            Address &amp; hours
          </h2>
          <Field label="Address (English)" htmlFor="address_en">
            <Textarea id="address_en" rows={2} value={form.address_en} onChange={update("address_en")} />
          </Field>
          <Field label="Address (Arabic)" htmlFor="address_ar">
            <Textarea id="address_ar" rows={2} dir="rtl" value={form.address_ar} onChange={update("address_ar")} />
          </Field>
          <Field label="Working hours (English)" htmlFor="hours_en">
            <Input id="hours_en" placeholder="Sun–Thu, 9am–5pm" value={form.hours_en} onChange={update("hours_en")} />
          </Field>
          <Field label="Working hours (Arabic)" htmlFor="hours_ar">
            <Input id="hours_ar" dir="rtl" value={form.hours_ar} onChange={update("hours_ar")} />
          </Field>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-ink-500 sm:col-span-2">
            Social links
          </h2>
          <Field label="Facebook URL" htmlFor="facebook_url">
            <Input id="facebook_url" value={form.facebook_url} onChange={update("facebook_url")} />
          </Field>
          <Field label="Instagram URL" htmlFor="instagram_url">
            <Input id="instagram_url" value={form.instagram_url} onChange={update("instagram_url")} />
          </Field>
          <Field label="LinkedIn URL" htmlFor="linkedin_url">
            <Input id="linkedin_url" value={form.linkedin_url} onChange={update("linkedin_url")} />
          </Field>
          <Field label="TikTok URL" htmlFor="tiktok_url">
            <Input id="tiktok_url" value={form.tiktok_url} onChange={update("tiktok_url")} />
          </Field>
          <Field label="YouTube URL" htmlFor="youtube_url">
            <Input id="youtube_url" value={form.youtube_url} onChange={update("youtube_url")} />
          </Field>
        </section>

        <div>
          <Button type="submit" disabled={status === "saving"}>
            {status === "saving" ? "Saving…" : "Save changes"}
          </Button>
          {status === "saved" && <span className="ms-3 text-sm text-emerald-600">Settings saved.</span>}
          {status === "error" && (
            <span className="ms-3 text-sm text-brand-600">
              {errorMessage ? `Couldn't save: ${errorMessage}` : "Something went wrong."}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
