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
  email: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  loading: boolean;
}

const defaults: SiteSettingsValue = {
  whatsappNumber: config.contact.whatsappNumber,
  phone: config.contact.phone,
  email: config.contact.email,
  facebookUrl: config.social.facebookUrl,
  instagramUrl: config.social.instagramUrl,
  linkedinUrl: config.social.linkedinUrl,
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
          email: data?.email || config.contact.email,
          facebookUrl: data?.facebook_url || config.social.facebookUrl,
          instagramUrl: data?.instagram_url || config.social.instagramUrl,
          linkedinUrl: data?.linkedin_url || config.social.linkedinUrl,
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

// For the admin settings form, which needs to see the *raw* saved row
// (including blanks) rather than the env-merged public display values.
export function useAdminSiteSettingsRaw() {
  const [row, setRow] = useState<{
    whatsapp_number: string;
    phone: string;
    email: string;
    facebook_url: string;
    instagram_url: string;
    linkedin_url: string;
  } | null>(null);
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
          email: data?.email ?? "",
          facebook_url: data?.facebook_url ?? "",
          instagram_url: data?.instagram_url ?? "",
          linkedin_url: data?.linkedin_url ?? "",
        });
        setLoading(false);
      });
  }, []);

  return useMemo(() => ({ row, loading }), [row, loading]);
}
