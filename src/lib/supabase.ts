import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { config } from "@/lib/config";
import type { Database } from "@/lib/database.types";

// Supabase is not yet connected in this environment (no project/env vars set).
// The client is still created with empty-string fallbacks so the app builds
// and runs; calls will simply fail until VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
// are configured (see .env.example).
export const supabase: SupabaseClient<Database> = createClient<Database>(
  config.supabase.url || "https://placeholder.supabase.co",
  config.supabase.anonKey || "placeholder-anon-key",
);

export const isSupabaseConfigured =
  config.supabase.url.length > 0 && config.supabase.anonKey.length > 0;
