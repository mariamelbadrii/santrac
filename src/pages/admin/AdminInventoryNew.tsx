import { useNavigate } from "react-router-dom";
import { EquipmentForm } from "@/components/admin/EquipmentForm";
import { supabase } from "@/lib/supabase";
import type { EquipmentInput } from "@/lib/catalog-schemas";

export default function AdminInventoryNew() {
  const navigate = useNavigate();

  const onSubmit = async (values: EquipmentInput) => {
    await supabase.from("equipment").insert(values);
    navigate("/admin/inventory");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Add Equipment</h1>
      <div className="mt-6">
        <EquipmentForm onSubmit={onSubmit} submitLabel="Create" />
      </div>
    </div>
  );
}
