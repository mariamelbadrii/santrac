import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useEquipmentList } from "@/hooks/useEquipmentList";
import { useEquipmentTypes } from "@/hooks/useEquipmentTypes";
import { localizeCategory } from "@/lib/display";
import { EquipmentCard } from "@/components/EquipmentCard";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TiltCard } from "@/components/motion/TiltCard";

type SortKey = "newest" | "featured";

export default function Equipment() {
  const { t, locale, dir } = useI18n();
  const { equipment, loading } = useEquipmentList();
  const { types: categoryTypes } = useEquipmentTypes();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    trackEvent("PageView", { page: "equipment" });
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const categories = useMemo(
    () => Array.from(new Set(equipment.map((e) => e.category))).sort(),
    [equipment],
  );
  const brands = useMemo(
    () => Array.from(new Set(equipment.map((e) => e.brand))).sort(),
    [equipment],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = equipment.filter((item) => {
      const matchesSearch =
        !q || item.brand.toLowerCase().includes(q) || item.model.toLowerCase().includes(q);
      const matchesCategory = !category || item.category === category;
      const matchesBrand = !brand || item.brand === brand;
      const matchesCondition = !condition || item.condition === condition;
      return matchesSearch && matchesCategory && matchesBrand && matchesCondition;
    });

    return [...list].sort((a, b) => {
      if (sort === "featured") {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [equipment, search, category, brand, condition, sort]);

  const hasActiveFilters = Boolean(search || category || brand || condition);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setBrand("");
    setCondition("");
  };

  const filterFields = (
    <div className="flex flex-col gap-5">
      <div>
        <label htmlFor="equipment-search" className="mb-1.5 block text-sm font-medium text-ink-800">
          {t.equipment.searchPlaceholder}
        </label>
        <Input
          id="equipment-search"
          placeholder={t.equipment.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="equipment-category" className="mb-1.5 block text-sm font-medium text-ink-800">
          {t.equipment.category}
        </label>
        <Select id="equipment-category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">{t.equipment.all}</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {localizeCategory(c, categoryTypes, locale)}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <label htmlFor="equipment-brand" className="mb-1.5 block text-sm font-medium text-ink-800">
          {t.equipment.brand}
        </label>
        <Select id="equipment-brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">{t.equipment.all}</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <label htmlFor="equipment-condition" className="mb-1.5 block text-sm font-medium text-ink-800">
          {t.equipment.condition}
        </label>
        <Select id="equipment-condition" value={condition} onChange={(e) => setCondition(e.target.value)}>
          <option value="">{t.equipment.all}</option>
          <option value="new">{t.enums.condition.new}</option>
          <option value="used">{t.enums.condition.used}</option>
          <option value="refurbished">{t.enums.condition.refurbished}</option>
        </Select>
      </div>
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="self-start text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          {t.equipment.clearFilters}
        </button>
      )}
    </div>
  );

  return (
    <div>
      <div className="border-b border-ink-100 bg-ink-25">
        <Container className="py-10 sm:py-12">
          <Reveal>
            <Eyebrow>{t.equipment.eyebrow}</Eyebrow>
            <h1 className="mt-2 text-display-sm font-bold text-ink-900">{t.equipment.title}</h1>
            <p className="mt-2 max-w-xl text-[0.9375rem] text-ink-500">{t.equipment.subtitle}</p>
          </Reveal>
        </Container>
      </div>

      <Container className="grid gap-10 py-10 lg:grid-cols-[260px_1fr] lg:py-12">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <h2
              className={cn(
                "mb-5 text-xs font-semibold text-ink-500",
                dir === "ltr" ? "uppercase tracking-widest2" : "tracking-normal",
              )}
            >
              {t.equipment.filters}
            </h2>
            {filterFields}
          </div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between gap-3">
            <p className="text-sm text-ink-500">
              {loading ? "…" : `${filtered.length} ${t.equipment.resultsCount}`}
            </p>
            <div className="flex items-center gap-3">
              <Select
                aria-label={t.equipment.sortBy}
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="w-auto min-w-[9.5rem]"
              >
                <option value="newest">{t.equipment.sortNewest}</option>
                <option value="featured">{t.equipment.sortFeatured}</option>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setDrawerOpen(true)}
              >
                <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
                {t.equipment.filters}
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-ink-50" />
              ))}
            </div>
          ) : equipment.length === 0 ? (
            <p className="py-16 text-center text-sm text-ink-500">{t.equipment.noInventory}</p>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-ink-500">{t.equipment.noResults}</p>
              <button
                onClick={clearFilters}
                className="mt-3 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                {t.equipment.clearFilters}
              </button>
            </div>
          ) : (
            <Stagger className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((item) => (
                <StaggerItem key={item.id}>
                  <TiltCard className="h-full">
                    <EquipmentCard equipment={item} />
                  </TiltCard>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </Container>

      {/* Mobile filter drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          drawerOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!drawerOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink-900/40 transition-opacity duration-200",
            drawerOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setDrawerOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.equipment.filters}
          className={cn(
            "absolute inset-y-0 end-0 flex w-full max-w-sm flex-col bg-white shadow-panel transition-transform duration-200 ease-swift",
            drawerOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
            <h2
              className={cn(
                "text-sm font-semibold text-ink-500",
                dir === "ltr" ? "uppercase tracking-widest2" : "tracking-normal",
              )}
            >
              {t.equipment.filters}
            </h2>
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label={t.equipment.closeFilters}
              className="flex h-10 w-10 items-center justify-center text-ink-900"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5">{filterFields}</div>
          <div className="border-t border-ink-100 px-5 py-4">
            <Button className="w-full" onClick={() => setDrawerOpen(false)}>
              {t.equipment.showResults} ({filtered.length})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
