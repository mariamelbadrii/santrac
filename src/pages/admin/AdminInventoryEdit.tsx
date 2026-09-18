import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EquipmentForm } from "@/components/admin/EquipmentForm";
import { supabase } from "@/lib/supabase";
import type { EquipmentInput } from "@/lib/catalog-schemas";
import type { EquipmentRow } from "@/lib/database.types";

export default function AdminInventoryEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState<EquipmentRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("equipment")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }) => {
        setEquipment(data ?? null);
        setLoading(false);
      });
  }, [id]);

  const onSubmit = async (values: EquipmentInput) => {
    if (!id) return;
    await supabase.from("equipment").update(values).eq("id", id);
    navigate("/admin/inventory");
  };

  if (loading) return <p className="text-sm text-ink-500">Loading…</p>;
  if (!equipment) return <p className="text-sm text-ink-500">Equipment not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Edit Equipment</h1>
      <div className="mt-6">
        <EquipmentForm initialValues={equipment} onSubmit={onSubmit} submitLabel="Save changes" />
      </div>
    </div>
  );
}
