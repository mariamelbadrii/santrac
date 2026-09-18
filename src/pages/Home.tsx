import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { useEquipmentList } from "@/hooks/useEquipmentList";
import { EquipmentCard } from "@/components/EquipmentCard";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const whySantracPoints = [
  "equipmentQuality",
  "carefulSelection",
  "inspection",
  "assistance",
  "afterSales",
] as const;

const whySantracCopy: Record<(typeof whySantracPoints)[number], { en: string; ar: string }> = {
  equipmentQuality: {
    en: "We select equipment for quality, not just availability.",
    ar: "نختار المعدات بناءً على الجودة وليس فقط التوفر.",
  },
  carefulSelection: {
    en: "Every machine is reviewed before it is listed.",
    ar: "تتم مراجعة كل معدة قبل إدراجها.",
  },
  inspection: {
    en: "Equipment is inspected before sale.",
    ar: "يتم فحص المعدات قبل البيع.",
  },
  assistance: {
    en: "Our team helps you choose the right equipment for your operation.",
    ar: "يساعدك فريقنا في اختيار المعدة المناسبة لعملك.",
  },
  afterSales: {
    en: "Support continues after the sale.",
    ar: "الدعم مستمر بعد البيع.",
  },
};

export default function Home() {
  const { t, locale } = useI18n();
  const { equipment, loading } = useEquipmentList();
  const featured = equipment.filter((item) => item.featured).slice(0, 6);

  useEffect(() => {
    trackEvent("PageView", { page: "home" });
  }, []);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          {t.home.eyebrow}
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-ink-900 md:text-5xl">
          {t.home.title}
        </h1>
        <p className="mt-4 max-w-xl text-base text-ink-600 md:text-lg">{t.home.subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/equipment"
            className="inline-flex h-12 items-center justify-center rounded-md bg-brand-600 px-6 text-sm font-medium text-white hover:bg-brand-700"
          >
            {t.home.ctaPrimary}
          </Link>
          <Link
            to="/request-quote"
            className="inline-flex h-12 items-center justify-center rounded-md border border-ink-300 px-6 text-sm font-medium text-ink-900 hover:bg-ink-50"
          >
            {t.home.ctaSecondary}
          </Link>
        </div>
      </section>

      {!loading && featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold text-ink-900">{t.home.featured}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <EquipmentCard key={item.id} equipment={item} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-ink-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold text-ink-900">{t.home.whySantrac}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whySantracPoints.map((point) => (
              <div key={point} className="rounded-lg bg-white p-5 shadow-sm">
                <p className="text-sm text-ink-700">{whySantracCopy[point][locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
