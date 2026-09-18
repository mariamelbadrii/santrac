import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useAdminEquipmentTypes } from "@/hooks/useEquipmentTypes";
import { equipmentTypeSchema } from "@/lib/catalog-schemas";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminCategories() {
  const { types, loading, refresh } = useAdminEquipmentTypes();
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const parsed = equipmentTypeSchema.safeParse({
      slug: slugify(nameEn),
      name_en: nameEn,
      name_ar: nameAr,
      enabled: true,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid category");
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from("equipment_types").insert(parsed.data);
    setSubmitting(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setNameEn("");
    setNameAr("");
    refresh();
  };

  const toggleEnabled = async (id: string, enabled: boolean) => {
    await supabase.from("equipment_types").update({ enabled: !enabled }).eq("id", id);
    refresh();
  };

  const remove = async (id: string, name: string) => {
    if (!window.confirm(`Delete category "${name}"? Existing equipment keeps its category text.`)) return;
    await supabase.from("equipment_types").delete().eq("id", id);
    refresh();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Categories</h1>
      <p className="mt-1 text-sm text-ink-500">
        Manage the categories offered when adding equipment. Disabling a category hides it from
        the picker without affecting equipment already using it.
      </p>

      <form onSubmit={onSubmit} className="mt-6 flex max-w-xl flex-wrap items-end gap-3">
        <Field label="Name (English)" htmlFor="name_en" required>
          <Input id="name_en" value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
        </Field>
        <Field label="Name (Arabic)" htmlFor="name_ar" required>
          <Input id="name_ar" dir="rtl" value={nameAr} onChange={(e) => setNameAr(e.target.value)} />
        </Field>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Adding…" : "Add category"}
        </Button>
      </form>
      {error && <p className="mt-2 text-sm text-brand-600">{error}</p>}

      <div className="mt-6 max-w-xl overflow-hidden rounded-lg border border-ink-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-left text-ink-500">
            <tr>
              <th className="px-4 py-3 font-medium">English</th>
              <th className="px-4 py-3 font-medium">Arabic</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-ink-500" colSpan={4}>
                  Loading…
                </td>
              </tr>
            ) : types.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-ink-500" colSpan={4}>
                  No categories yet.
                </td>
              </tr>
            ) : (
              types.map((type) => (
                <tr key={type.id} className="border-t border-ink-100">
                  <td className="px-4 py-3 text-ink-900">{type.name_en}</td>
                  <td className="px-4 py-3 text-ink-600" dir="rtl">
                    {type.name_ar}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={type.enabled ? "success" : "neutral"}>
                      {type.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <button
                      onClick={() => toggleEnabled(type.id, type.enabled)}
                      className="me-3 text-brand-600 hover:text-brand-700"
                    >
                      {type.enabled ? "Disable" : "Enable"}
                    </button>
                    <button
                      onClick={() => remove(type.id, type.name_en)}
                      className="text-ink-400 hover:text-brand-600"
                    >
                      Delete
                    </button>
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
