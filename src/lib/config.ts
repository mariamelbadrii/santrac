// Central runtime configuration. Values come from environment variables only —
// never hardcode contact details, tracking IDs, or credentials here.

export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL ?? "",
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
  },
  contact: {
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER ?? "",
    phone: import.meta.env.VITE_CONTACT_PHONE ?? "",
    email: import.meta.env.VITE_CONTACT_EMAIL ?? "",
  },
  analytics: {
    ga4MeasurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID ?? "",
    metaPixelId: import.meta.env.VITE_META_PIXEL_ID ?? "",
    googleAdsConversionId: import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID ?? "",
  },
} as const;

export function whatsappLink(message?: string): string | null {
  if (!config.contact.whatsappNumber) return null;
  const base = `https://wa.me/${config.contact.whatsappNumber.replace(/[^\d]/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
