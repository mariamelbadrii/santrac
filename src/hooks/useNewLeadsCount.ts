import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// Polls the count of leads still in "new" status, for the admin sidebar
// badge and dashboard. Simple interval poll rather than a realtime
// subscription — sufficient for admin usage patterns without the added
// complexity of managing a realtime channel.
export function useNewLeadsCount(intervalMs = 20000) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let cancelled = false;
    const fetchCount = () => {
      supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("status", "new")
        .then(({ count: newCount }) => {
          if (!cancelled) setCount(newCount ?? 0);
        });
    };

    fetchCount();
    const interval = setInterval(fetchCount, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [intervalMs]);

  return count;
}
