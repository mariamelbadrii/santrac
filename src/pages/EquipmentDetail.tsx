import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useEquipmentBySlug } from "@/hooks/useEquipmentList";
import { displayOrDash, equipmentTitle, formatPrice } from "@/lib/display";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export default function EquipmentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, locale, dir } = useI18n();
  const { equipment, loading } = useEquipmentBySlug(slug);
  const [activeImage, setActiveImage] = useState(0);
  const BackIcon = dir === "rtl" ? ArrowRight : ArrowLeft;

  useEffect(() => {
    if (equipment) trackEvent("ViewContent", { equipment_id: equipment.id });
  }, [equipment]);

  if (loading) {
    return (
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-[4/3] animate-pulse rounded-lg bg-ink-50" />
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-ink-50" />
            <div className="h-9 w-2/3 animate-pulse rounded bg-ink-50" />
            <div className="h-24 w-full animate-pulse rounded bg-ink-50" />
          </div>
        </div>
      </Container>
    );
  }

  if (!equipment) {
    return (
      <Container className="py-20 text-center">
        <p className="text-sm text-ink-500">{t.equipment.notFound}</p>
        <Link to="/equipment" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          <BackIcon aria-hidden="true" className="h-4 w-4" />
          {t.equipmentDetail.backToEquipment}
        </Link>
      </Container>
    );
  }

  const whatsappMessage = `${t.equipmentDetail.whatsapp}: ${equipmentTitle(equipment)}`;
  const specEntries = Object.entries(equipment.specifications ?? {});
  const gallery = [equipment.main_image, ...(equipment.additional_images ?? [])].filter(
    (src): src is string => Boolean(src),
  );
  const description = locale === "ar" ? equipment.description_ar : equipment.description_en;
  const bestSuitedFor = locale === "ar" ? equipment.best_suited_for_ar : equipment.best_suited_for_en;

  return (
    <Container className="py-8 sm:py-12">
      <Link
        to="/equipment"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        <BackIcon aria-hidden="true" className="h-4 w-4" />
        {t.equipmentDetail.backToEquipment}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-ink-50">
            {gallery.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={gallery[activeImage]}
                  src={gallery[activeImage]}
                  alt={equipmentTitle(equipment)}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            ) : (
              <div className="flex h-full w-full items-center justify-center font-medium text-ink-300">
                {equipmentTitle(equipment)}
              </div>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`${equipmentTitle(equipment)} — image ${i + 1}`}
                  aria-current={activeImage === i}
                  className={cn(
                    "h-16 w-20 shrink-0 overflow-hidden rounded border-2 transition-colors",
                    activeImage === i ? "border-brand-500" : "border-transparent",
                  )}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-xs font-semibold uppercase tracking-widest2 text-brand-500">
            {equipment.category}
          </span>
          <h1 className="mt-2 text-display-sm font-bold text-ink-900">{equipmentTitle(equipment)}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <Badge tone="neutral">{equipment.condition}</Badge>
            {equipment.year && <Badge tone="neutral">{equipment.year}</Badge>}
            <Badge tone={equipment.availability === "sold" ? "warning" : "success"}>
              {equipment.availability.replace("_", " ")}
            </Badge>
          </div>

          <p className="mt-5 text-2xl font-bold text-ink-900">{formatPrice(equipment, locale)}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/request-quote"
              state={{ equipmentId: equipment.id, equipmentNeed: equipmentTitle(equipment) }}
              className="inline-flex h-12 items-center justify-center rounded bg-brand-500 px-7 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600"
            >
              {t.equipmentDetail.requestQuote}
            </Link>
            <WhatsAppCta message={whatsappMessage} />
          </div>

          <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink-100 pt-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-ink-400">{t.equipmentDetail.year}</dt>
              <dd className="mt-0.5 font-medium text-ink-900">{displayOrDash(equipment.year)}</dd>
            </div>
            <div>
              <dt className="text-ink-400">{t.equipmentDetail.location}</dt>
              <dd className="mt-0.5 font-medium text-ink-900">{displayOrDash(equipment.location)}</dd>
            </div>
          </dl>

          {specEntries.length > 0 && (
            <div className="mt-8 border-t border-ink-100 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest2 text-ink-500">
                {t.equipmentDetail.specifications}
              </h2>
              <dl className="mt-4 divide-y divide-ink-100">
                {specEntries.map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-2.5 text-sm">
                    <dt className="text-ink-500">{key}</dt>
                    <dd className="font-medium text-ink-900">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {description && (
            <div className="mt-8 border-t border-ink-100 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest2 text-ink-500">
                {t.equipmentDetail.description}
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{description}</p>
            </div>
          )}

          {bestSuitedFor && (
            <div className="mt-8 border-t border-ink-100 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest2 text-ink-500">
                {t.equipmentDetail.bestSuitedFor}
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-600">{bestSuitedFor}</p>
            </div>
          )}
        </Reveal>
      </div>
    </Container>
  );
}
