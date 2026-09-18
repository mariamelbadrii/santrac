import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { EquipmentRow } from "@/lib/database.types";

export function useAdminEquipmentList() {
  const [equipment, setEquipment] = useState<EquipmentRow[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    supabase
      .from("equipment")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setEquipment(data ?? []);
        setLoading(false);
      });
  };

  useEffect(refresh, []);

  return { equipment, loading, refresh };
}
