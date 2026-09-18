import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, MapPin } from "lucide-react";
import type { EquipmentRow } from "@/lib/database.types";
import { displayOrDash, equipmentTitle, formatPrice } from "@/lib/display";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/ui/Badge";

const conditionTone: Record<EquipmentRow["condition"], "brand" | "neutral" | "success"> = {
  new: "success",
  used: "neutral",
  refurbished: "brand",
};

export function EquipmentCard({ equipment }: { equipment: EquipmentRow }) {
  const { t, locale, dir } = useI18n();
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <Link
      to={`/equipment/${equipment.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink-100 bg-white transition-shadow duration-200 hover:shadow-card-hover"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-50">
        {equipment.main_image ? (
          <img
            src={equipment.main_image}
            alt={equipmentTitle(equipment)}
            className="h-full w-full object-cover transition-transform duration-300 ease-swift group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-medium text-ink-300">
            {equipmentTitle(equipment)}
          </div>
        )}
        {equipment.featured && (
          <span className="absolute start-3 top-3 rounded bg-brand-500 px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-white">
            {t.equipment.featuredBadge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <span className="text-[0.6875rem] font-semibold uppercase tracking-widest2 text-brand-500">
          {equipment.category}
        </span>
        <h3 className="text-lg font-semibold leading-snug text-ink-900">
          {equipmentTitle(equipment)}
        </h3>

        <div className="flex flex-wrap items-center gap-1.5">
          <Badge tone={conditionTone[equipment.condition]}>{equipment.condition}</Badge>
          {equipment.year && <Badge>{equipment.year}</Badge>}
        </div>

        {equipment.location && (
          <p className="flex items-center gap-1.5 text-sm text-ink-500">
            <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            {displayOrDash(equipment.location)}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-4">
          <span className="text-[0.9375rem] font-semibold text-ink-900">
            {formatPrice(equipment, locale)}
          </span>
          <span className="flex items-center gap-1 text-sm font-semibold text-ink-700 transition-colors group-hover:text-brand-500">
            {t.equipment.viewDetails}
            <ArrowIcon aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
