import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { EquipmentRow } from "@/lib/database.types";

interface UseEquipmentListResult {
  equipment: EquipmentRow[];
  loading: boolean;
  error: string | null;
}

export function useEquipmentList(): UseEquipmentListResult {
  const [equipment, setEquipment] = useState<EquipmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    supabase
      .from("equipment")
      .select("*")
      .eq("published", true)
      .neq("status", "archived")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .then(({ data, error: fetchError }) => {
        if (cancelled) return;
        if (fetchError) setError(fetchError.message);
        setEquipment(data ?? []);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { equipment, loading, error };
}

export function useEquipmentBySlug(slug: string | undefined) {
  const [equipment, setEquipment] = useState<EquipmentRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || !isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    supabase
      .from("equipment")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .neq("status", "archived")
      .maybeSingle()
      .then(({ data, error: fetchError }) => {
        if (cancelled) return;
        if (fetchError) setError(fetchError.message);
        setEquipment(data ?? null);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { equipment, loading, error };
}
