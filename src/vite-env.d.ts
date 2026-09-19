/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_CONTACT_PHONE: string;
  readonly VITE_CONTACT_SECONDARY_PHONE: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_ADDRESS_EN: string;
  readonly VITE_ADDRESS_AR: string;
  readonly VITE_HOURS_EN: string;
  readonly VITE_HOURS_AR: string;
  readonly VITE_FACEBOOK_URL: string;
  readonly VITE_INSTAGRAM_URL: string;
  readonly VITE_LINKEDIN_URL: string;
  readonly VITE_TIKTOK_URL: string;
  readonly VITE_YOUTUBE_URL: string;
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_META_PIXEL_ID: string;
  readonly VITE_GOOGLE_ADS_CONVERSION_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
