// Hand-written mirror of the schema in supabase/migrations. Regenerate with
// `supabase gen types typescript` once a live project is connected.

export type EquipmentCondition = "new" | "used" | "refurbished";
export type EquipmentAvailability = "in_stock" | "incoming" | "sold";
export type EquipmentPriceMode = "fixed" | "on_request";
export type EquipmentStatus = "draft" | "published" | "sold" | "archived";
export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "quoted"
  | "negotiating"
  | "won"
  | "lost";
export type AppRole = "admin";

export interface EquipmentTypeRow {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  enabled: boolean;
  created_at: string;
}

export interface EquipmentRow {
  id: string;
  slug: string;
  category: string;
  brand: string;
  model: string;
  year: number | null;
  condition: EquipmentCondition;
  location: string | null;
  availability: EquipmentAvailability;
  price_mode: EquipmentPriceMode;
  price: number | null;
  main_image: string | null;
  additional_images: string[];
  description_en: string | null;
  description_ar: string | null;
  best_suited_for_en: string | null;
  best_suited_for_ar: string | null;
  specifications: Record<string, string | number | boolean>;
  featured: boolean;
  published: boolean;
  status: EquipmentStatus;
  created_at: string;
  updated_at: string;
}

export interface LeadRow {
  id: string;
  full_name: string;
  phone: string;
  equipment_need: string;
  location: string;
  company: string | null;
  email: string | null;
  brand_model_preference: string | null;
  additional_requirements: string | null;
  equipment_id: string | null;
  status: LeadStatus;
  source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  created_at: string;
}

export interface UserRoleRow {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

// Singleton row (id always 1) holding admin-editable contact/social links.
export interface SiteSettingsRow {
  id: number;
  whatsapp_number: string | null;
  phone: string | null;
  secondary_phone: string | null;
  email: string | null;
  address_en: string | null;
  address_ar: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
  hours_en: string | null;
  hours_ar: string | null;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      equipment_types: {
        Row: EquipmentTypeRow;
        Insert: Omit<EquipmentTypeRow, "id" | "created_at"> & { id?: string };
        Update: Partial<EquipmentTypeRow>;
        Relationships: [];
      };
      equipment: {
        Row: EquipmentRow;
        Insert: Omit<EquipmentRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
        };
        Update: Partial<EquipmentRow>;
        Relationships: [];
      };
      leads: {
        Row: LeadRow;
        Insert: Omit<LeadRow, "id" | "created_at" | "status"> & {
          id?: string;
          status?: LeadStatus;
        };
        Update: Partial<LeadRow>;
        Relationships: [];
      };
      user_roles: {
        Row: UserRoleRow;
        Insert: Omit<UserRoleRow, "id" | "created_at"> & { id?: string };
        Update: Partial<UserRoleRow>;
        Relationships: [];
      };
      site_settings: {
        Row: SiteSettingsRow;
        Insert: Omit<SiteSettingsRow, "updated_at"> & { updated_at?: string };
        Update: Partial<SiteSettingsRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      has_role: {
        Args: { _user_id: string; _role: AppRole };
        Returns: boolean;
      };
    };
  };
}
