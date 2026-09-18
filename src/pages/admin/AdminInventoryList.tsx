import { Link } from "react-router-dom";
import { useAdminEquipmentList } from "@/hooks/useAdminEquipment";
import { equipmentTitle } from "@/lib/display";
import { Badge } from "@/components/ui/Badge";
import type { EquipmentStatus } from "@/lib/database.types";

const statusTone: Record<EquipmentStatus, "success" | "neutral" | "warning" | "brand"> = {
  published: "success",
  draft: "neutral",
  sold: "warning",
  archived: "neutral",
};

export default function AdminInventoryList() {
  const { equipment, loading } = useAdminEquipmentList();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink-900">Inventory</h1>
        <Link
          to="/admin/inventory/new"
          className="inline-flex h-10 items-center justify-center rounded-md bg-brand-600 px-4 text-sm font-medium text-white hover:bg-brand-700"
        >
          Add equipment
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-ink-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-left text-ink-500">
            <tr>
              <th className="px-4 py-3 font-medium">Equipment</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Availability</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-ink-500" colSpan={5}>
                  Loading…
                </td>
              </tr>
            ) : equipment.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-ink-500" colSpan={5}>
                  No equipment yet.
                </td>
              </tr>
            ) : (
              equipment.map((item) => (
                <tr key={item.id} className="border-t border-ink-100">
                  <td className="px-4 py-3 font-medium text-ink-900">{equipmentTitle(item)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone[item.status]}>{item.status}</Badge>
                  </td>
                  <td className="px-4 py-3 capitalize text-ink-600">
                    {item.availability.replace("_", " ")}
                  </td>
                  <td className="px-4 py-3 text-ink-600">{item.featured ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-end">
                    <Link to={`/admin/inventory/${item.id}/edit`} className="text-brand-600">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
