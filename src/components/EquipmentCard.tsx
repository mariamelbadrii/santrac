import { Link } from "react-router-dom";
import type { EquipmentRow } from "@/lib/database.types";
import { Card } from "@/components/ui/Card";
import { displayOrDash, equipmentTitle, formatPrice } from "@/lib/display";
import { useI18n } from "@/lib/i18n";

export function EquipmentCard({ equipment }: { equipment: EquipmentRow }) {
  const { t, locale } = useI18n();

  return (
    <Card className="flex h-full flex-col">
      <div className="aspect-[4/3] w-full bg-ink-100">
        {equipment.main_image ? (
          <img
            src={equipment.main_image}
            alt={equipmentTitle(equipment)}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-ink-400">
            {equipmentTitle(equipment)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-brand-600">
          {equipment.category}
        </span>
        <h3 className="text-base font-semibold text-ink-900">{equipmentTitle(equipment)}</h3>

        <dl className="mt-1 grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-ink-500">
          <div>
            <dt className="inline">{t.equipmentDetail.year}: </dt>
            <dd className="inline">{displayOrDash(equipment.year)}</dd>
          </div>
          <div>
            <dt className="inline">{t.equipmentDetail.condition}: </dt>
            <dd className="inline capitalize">{equipment.condition}</dd>
          </div>
          <div className="col-span-2">
            <dt className="inline">{t.equipmentDetail.location}: </dt>
            <dd className="inline">{displayOrDash(equipment.location)}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-sm font-semibold text-ink-900">
            {formatPrice(equipment, locale)}
          </span>
          <Link
            to={`/equipment/${equipment.slug}`}
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            {t.equipment.viewDetails}
          </Link>
        </div>
      </div>
    </Card>
  );
}
