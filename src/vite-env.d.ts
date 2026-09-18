/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_CONTACT_PHONE: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_GA4_MEASUREMENT_ID: string;
  readonly VITE_META_PIXEL_ID: string;
  readonly VITE_GOOGLE_ADS_CONVERSION_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
