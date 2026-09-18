// Central runtime configuration. Values come from environment variables only —
// never hardcode contact details, tracking IDs, or credentials here.
//
// These are the *fallback* defaults. Once a Supabase project is connected,
// admins can override the contact/social fields at /admin/settings — see
// src/lib/settings/SiteSettingsContext.tsx, which merges the live
// `site_settings` row over these env defaults.

export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL ?? "",
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ?? "",
  },
  contact: {
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER ?? "",
    phone: import.meta.env.VITE_CONTACT_PHONE ?? "",
    secondaryPhone: import.meta.env.VITE_CONTACT_SECONDARY_PHONE ?? "",
    email: import.meta.env.VITE_CONTACT_EMAIL ?? "",
    addressEn: import.meta.env.VITE_ADDRESS_EN ?? "",
    addressAr: import.meta.env.VITE_ADDRESS_AR ?? "",
    hoursEn: import.meta.env.VITE_HOURS_EN ?? "",
    hoursAr: import.meta.env.VITE_HOURS_AR ?? "",
  },
  social: {
    facebookUrl: import.meta.env.VITE_FACEBOOK_URL ?? "",
    instagramUrl: import.meta.env.VITE_INSTAGRAM_URL ?? "",
    linkedinUrl: import.meta.env.VITE_LINKEDIN_URL ?? "",
    tiktokUrl: import.meta.env.VITE_TIKTOK_URL ?? "",
    youtubeUrl: import.meta.env.VITE_YOUTUBE_URL ?? "",
  },
  analytics: {
    ga4MeasurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID ?? "",
    metaPixelId: import.meta.env.VITE_META_PIXEL_ID ?? "",
    googleAdsConversionId: import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID ?? "",
  },
} as const;

export function whatsappLink(message?: string, numberOverride?: string): string | null {
  const number = numberOverride || config.contact.whatsappNumber;
  if (!number) return null;
  const base = `https://wa.me/${number.replace(/[^\d]/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
