import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useEquipmentList } from "@/hooks/useEquipmentList";
import { EquipmentCard } from "@/components/EquipmentCard";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { trackEvent } from "@/lib/analytics";

export default function Equipment() {
  const { t } = useI18n();
  const { equipment, loading } = useEquipmentList();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");

  useEffect(() => {
    trackEvent("PageView", { page: "equipment" });
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(equipment.map((e) => e.category))).sort(),
    [equipment],
  );
  const brands = useMemo(
    () => Array.from(new Set(equipment.map((e) => e.brand))).sort(),
    [equipment],
  );

  const filtered = equipment.filter((item) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q || item.brand.toLowerCase().includes(q) || item.model.toLowerCase().includes(q);
    const matchesCategory = !category || item.category === category;
    const matchesBrand = !brand || item.brand === brand;
    const matchesCondition = !condition || item.condition === condition;
    return matchesSearch && matchesCategory && matchesBrand && matchesCondition;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-ink-900">{t.equipment.title}</h1>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder={t.equipment.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label={t.equipment.searchPlaceholder}
        />
        <Select value={category} onChange={(e) => setCategory(e.target.value)} aria-label={t.equipment.category}>
          <option value="">{t.equipment.category}</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <Select value={brand} onChange={(e) => setBrand(e.target.value)} aria-label={t.equipment.brand}>
          <option value="">{t.equipment.brand}</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </Select>
        <Select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          aria-label={t.equipment.condition}
        >
          <option value="">{t.equipment.condition}</option>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="refurbished">Refurbished</option>
        </Select>
      </div>

      <div className="mt-8">
        {loading ? (
          <p className="text-sm text-ink-500">…</p>
        ) : equipment.length === 0 ? (
          <p className="text-sm text-ink-500">{t.equipment.noInventory}</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-ink-500">{t.equipment.noResults}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <EquipmentCard key={item.id} equipment={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
