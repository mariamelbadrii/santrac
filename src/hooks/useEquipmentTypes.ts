import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { EquipmentTypeRow } from "@/lib/database.types";

// Public: enabled categories only, for the admin equipment form's
// category picker and (later) any public category navigation.
export function useEquipmentTypes() {
  const [types, setTypes] = useState<EquipmentTypeRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    supabase
      .from("equipment_types")
      .select("*")
      .eq("enabled", true)
      .order("name_en", { ascending: true })
      .then(({ data }) => {
        if (cancelled) return;
        setTypes(data ?? []);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { types, loading };
}

// Admin: every category, enabled or not, for the management page.
export function useAdminEquipmentTypes() {
  const [types, setTypes] = useState<EquipmentTypeRow[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    supabase
      .from("equipment_types")
      .select("*")
      .order("name_en", { ascending: true })
      .then(({ data }) => {
        setTypes(data ?? []);
        setLoading(false);
      });
  };

  useEffect(refresh, []);

  return { types, loading, refresh };
}
