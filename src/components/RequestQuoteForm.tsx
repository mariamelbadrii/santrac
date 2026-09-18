import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { leadSchema, type LeadInput } from "@/lib/catalog-schemas";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { captureUTM, trackEvent } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface RequestQuoteFormProps {
  equipmentId?: string;
  prefillEquipmentNeed?: string;
}

export function RequestQuoteForm({ equipmentId, prefillEquipmentNeed }: RequestQuoteFormProps) {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      equipment_need: prefillEquipmentNeed ?? "",
      equipment_id: equipmentId,
    },
  });

  const onSubmit = async (values: LeadInput) => {
    if (values.website) return; // honeypot triggered, silently drop

    setStatus("submitting");
    const utm = captureUTM();

    if (!isSupabaseConfigured) {
      // No backend connected yet in this environment; keep the form usable
      // without crashing, and surface a clear error instead of a fake success.
      setStatus("error");
      return;
    }

    const { error } = await supabase.from("leads").insert({
      full_name: values.full_name,
      phone: values.phone,
      equipment_need: values.equipment_need,
      location: values.location,
      company: values.company || null,
      email: values.email || null,
      brand_model_preference: values.brand_model_preference || null,
      additional_requirements: values.additional_requirements || null,
      equipment_id: values.equipment_id ?? null,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_term: utm.utm_term,
      utm_content: utm.utm_content,
    });

    if (error) {
      setStatus("error");
      return;
    }

    trackEvent("Lead");
    setStatus("success");
    reset();
  };

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        <p className="text-sm text-emerald-800">{t.requestQuote.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.requestQuote.fullName} htmlFor="full_name" required error={errors.full_name?.message}>
          <Input id="full_name" autoComplete="name" {...register("full_name")} />
        </Field>

        <Field label={t.requestQuote.phone} htmlFor="phone" required error={errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" inputMode="tel" {...register("phone")} />
        </Field>
      </div>

      <Field
        label={t.requestQuote.equipmentNeed}
        htmlFor="equipment_need"
        required
        error={errors.equipment_need?.message}
      >
        <Input id="equipment_need" {...register("equipment_need")} />
      </Field>

      <Field label={t.requestQuote.location} htmlFor="location" required error={errors.location?.message}>
        <Input id="location" {...register("location")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.requestQuote.company} htmlFor="company">
          <Input id="company" autoComplete="organization" {...register("company")} />
        </Field>

        <Field label={t.requestQuote.email} htmlFor="email" error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
        </Field>
      </div>

      <Field label={t.requestQuote.brandModelPreference} htmlFor="brand_model_preference">
        <Input id="brand_model_preference" {...register("brand_model_preference")} />
      </Field>

      <Field label={t.requestQuote.additionalRequirements} htmlFor="additional_requirements">
        <Textarea id="additional_requirements" rows={3} {...register("additional_requirements")} />
      </Field>

      {/* Honeypot: hidden from real users, bots tend to fill every field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-brand-600" role="alert">
          {t.requestQuote.error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? t.requestQuote.submitting : t.requestQuote.submit}
      </Button>
    </form>
  );
}
