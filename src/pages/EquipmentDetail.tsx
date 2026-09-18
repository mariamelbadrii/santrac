import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { useEquipmentBySlug } from "@/hooks/useEquipmentList";
import { displayOrDash, equipmentTitle, formatPrice } from "@/lib/display";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { trackEvent } from "@/lib/analytics";

export default function EquipmentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, locale } = useI18n();
  const { equipment, loading } = useEquipmentBySlug(slug);

  useEffect(() => {
    if (equipment) trackEvent("ViewContent", { equipment_id: equipment.id });
  }, [equipment]);

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-ink-500">…</div>;

  if (!equipment) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-ink-500">{t.equipment.noResults}</p>
        <Link to="/equipment" className="mt-4 inline-block text-sm text-brand-600">
          {t.equipmentDetail.backToEquipment}
        </Link>
      </div>
    );
  }

  const whatsappMessage = `${t.equipmentDetail.whatsapp}: ${equipmentTitle(equipment)}`;
  const specEntries = Object.entries(equipment.specifications ?? {});

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/equipment" className="text-sm text-brand-600">
        ← {t.equipmentDetail.backToEquipment}
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-ink-100">
          {equipment.main_image ? (
            <img
              src={equipment.main_image}
              alt={equipmentTitle(equipment)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-ink-400">
              {equipmentTitle(equipment)}
            </div>
          )}
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {equipment.category}
          </span>
          <h1 className="mt-2 text-3xl font-bold text-ink-900">{equipmentTitle(equipment)}</h1>
          <p className="mt-2 text-xl font-semibold text-ink-900">
            {formatPrice(equipment, locale)}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-ink-500">{t.equipmentDetail.year}</dt>
              <dd className="text-ink-900">{displayOrDash(equipment.year)}</dd>
            </div>
            <div>
              <dt className="text-ink-500">{t.equipmentDetail.condition}</dt>
              <dd className="capitalize text-ink-900">{equipment.condition}</dd>
            </div>
            <div>
              <dt className="text-ink-500">{t.equipmentDetail.location}</dt>
              <dd className="text-ink-900">{displayOrDash(equipment.location)}</dd>
            </div>
            <div>
              <dt className="text-ink-500">{t.equipmentDetail.availability}</dt>
              <dd className="capitalize text-ink-900">{equipment.availability.replace("_", " ")}</dd>
            </div>
          </dl>

          {specEntries.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-ink-900">
                {t.equipmentDetail.specifications}
              </h2>
              <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
                {specEntries.map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-ink-500">{key}</dt>
                    <dd className="text-ink-900">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {(equipment.description_en || equipment.description_ar) && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-ink-900">{t.equipmentDetail.description}</h2>
              <p className="mt-2 text-sm text-ink-600">
                {locale === "ar" ? equipment.description_ar : equipment.description_en}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/request-quote"
              state={{ equipmentId: equipment.id, equipmentNeed: equipmentTitle(equipment) }}
              className="inline-flex h-11 items-center justify-center rounded-md bg-brand-600 px-6 text-sm font-medium text-white hover:bg-brand-700"
            >
              {t.equipmentDetail.requestQuote}
            </Link>
            <WhatsAppCta message={whatsappMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
