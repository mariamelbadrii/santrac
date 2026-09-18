import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { config } from "@/lib/config";

export interface SiteSettingsValue {
  whatsappNumber: string;
  phone: string;
  secondaryPhone: string;
  email: string;
  addressEn: string;
  addressAr: string;
  hoursEn: string;
  hoursAr: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  loading: boolean;
}

const defaults: SiteSettingsValue = {
  whatsappNumber: config.contact.whatsappNumber,
  phone: config.contact.phone,
  secondaryPhone: config.contact.secondaryPhone,
  email: config.contact.email,
  addressEn: config.contact.addressEn,
  addressAr: config.contact.addressAr,
  hoursEn: config.contact.hoursEn,
  hoursAr: config.contact.hoursAr,
  facebookUrl: config.social.facebookUrl,
  instagramUrl: config.social.instagramUrl,
  linkedinUrl: config.social.linkedinUrl,
  tiktokUrl: config.social.tiktokUrl,
  youtubeUrl: config.social.youtubeUrl,
  loading: false,
};

const SiteSettingsContext = createContext<SiteSettingsValue>(defaults);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<SiteSettingsValue>({ ...defaults, loading: isSupabaseConfigured });

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let cancelled = false;
    supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        setValue({
          whatsappNumber: data?.whatsapp_number || config.contact.whatsappNumber,
          phone: data?.phone || config.contact.phone,
          secondaryPhone: data?.secondary_phone || config.contact.secondaryPhone,
          email: data?.email || config.contact.email,
          addressEn: data?.address_en || config.contact.addressEn,
          addressAr: data?.address_ar || config.contact.addressAr,
          hoursEn: data?.hours_en || config.contact.hoursEn,
          hoursAr: data?.hours_ar || config.contact.hoursAr,
          facebookUrl: data?.facebook_url || config.social.facebookUrl,
          instagramUrl: data?.instagram_url || config.social.instagramUrl,
          linkedinUrl: data?.linkedin_url || config.social.linkedinUrl,
          tiktokUrl: data?.tiktok_url || config.social.tiktokUrl,
          youtubeUrl: data?.youtube_url || config.social.youtubeUrl,
          loading: false,
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings(): SiteSettingsValue {
  return useContext(SiteSettingsContext);
}

export interface RawSiteSettings {
  whatsapp_number: string;
  phone: string;
  secondary_phone: string;
  email: string;
  address_en: string;
  address_ar: string;
  hours_en: string;
  hours_ar: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  tiktok_url: string;
  youtube_url: string;
}

// For the admin settings form, which needs to see the *raw* saved row
// (including blanks) rather than the env-merged public display values.
export function useAdminSiteSettingsRaw() {
  const [row, setRow] = useState<RawSiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => {
        setRow({
          whatsapp_number: data?.whatsapp_number ?? "",
          phone: data?.phone ?? "",
          secondary_phone: data?.secondary_phone ?? "",
          email: data?.email ?? "",
          address_en: data?.address_en ?? "",
          address_ar: data?.address_ar ?? "",
          hours_en: data?.hours_en ?? "",
          hours_ar: data?.hours_ar ?? "",
          facebook_url: data?.facebook_url ?? "",
          instagram_url: data?.instagram_url ?? "",
          linkedin_url: data?.linkedin_url ?? "",
          tiktok_url: data?.tiktok_url ?? "",
          youtube_url: data?.youtube_url ?? "",
        });
        setLoading(false);
      });
  }, []);

  return useMemo(() => ({ row, loading }), [row, loading]);
}
