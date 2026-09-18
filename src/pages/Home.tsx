import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Forklift, Gauge, PackageCheck, ShieldCheck, UserCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useEquipmentList } from "@/hooks/useEquipmentList";
import { EquipmentCard } from "@/components/EquipmentCard";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { trackEvent } from "@/lib/analytics";

const whySantracPoints = [
  { icon: ShieldCheck, en: "We select equipment for quality, not just availability.", ar: "نختار المعدات بناءً على الجودة وليس فقط التوفر." },
  { icon: PackageCheck, en: "Every machine is reviewed and inspected before it is listed.", ar: "تتم مراجعة كل معدة وفحصها قبل إدراجها." },
  { icon: UserCheck, en: "Our team helps you choose the right equipment for your operation.", ar: "يساعدك فريقنا في اختيار المعدة المناسبة لعملك." },
  { icon: Gauge, en: "Support continues after the sale.", ar: "الدعم مستمر بعد البيع." },
] as const;

const serviceThemes = [
  { en: "Equipment Sales", ar: "بيع المعدات" },
  { en: "Sourcing & Guidance", ar: "التوريد والمساعدة" },
  { en: "Inspection Before Sale", ar: "الفحص قبل البيع" },
  { en: "After-Sales Support", ar: "دعم ما بعد البيع" },
] as const;

export default function Home() {
  const { t, locale, dir } = useI18n();
  const { equipment, loading } = useEquipmentList();
  const featured = equipment.filter((item) => item.featured).slice(0, 6);
  const categories = Array.from(new Set(equipment.map((item) => item.category))).slice(0, 6);
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  useEffect(() => {
    trackEvent("PageView", { page: "home" });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-ink-25">
        <Container className="grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <Eyebrow>{t.home.eyebrow}</Eyebrow>
            <h1 className="mt-4 max-w-xl text-display-lg font-bold text-ink-900">{t.home.title}</h1>
            <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-ink-500">{t.home.subtitle}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/equipment"
                className="inline-flex h-12 items-center justify-center rounded bg-brand-500 px-7 text-[0.9375rem] font-semibold text-white transition-colors duration-150 hover:bg-brand-600"
              >
                {t.home.ctaPrimary}
              </Link>
              <Link
                to="/request-quote"
                className="inline-flex h-12 items-center justify-center rounded border border-ink-300 px-7 text-[0.9375rem] font-semibold text-ink-900 transition-colors duration-150 hover:border-ink-900"
              >
                {t.home.ctaSecondary}
              </Link>
            </div>
          </div>

          <div
            className="relative hidden aspect-[4/3] overflow-hidden rounded-lg bg-ink-900 lg:block"
            aria-hidden="true"
          >
            <svg className="absolute inset-0 h-full w-full opacity-[0.07]" preserveAspectRatio="none">
              <defs>
                <pattern id="blueprint-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
            </svg>
            <div className="absolute inset-x-0 top-0 h-1 bg-brand-500" />
            <Forklift className="absolute -bottom-10 -end-8 h-[70%] w-[70%] text-white/[0.08]" strokeWidth={1} />
            <Forklift className="absolute bottom-12 start-12 h-32 w-32 text-brand-400" strokeWidth={1.25} />
          </div>
        </Container>
      </section>

      {/* Featured equipment */}
      {!loading && featured.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <SectionHeader
              title={t.home.featured}
              action={
                <Link
                  to="/equipment"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-500"
                >
                  {t.home.viewAll}
                  <ArrowIcon aria-hidden="true" className="h-4 w-4" />
                </Link>
              }
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item) => (
                <EquipmentCard key={item.id} equipment={item} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Categories */}
      {!loading && categories.length > 0 && (
        <section className="border-t border-ink-100 py-16 sm:py-20">
          <Container>
            <SectionHeader title={t.home.categories} />
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/equipment?category=${encodeURIComponent(category)}`}
                  className="flex items-center justify-center rounded border border-ink-100 bg-white px-4 py-6 text-center text-sm font-semibold text-ink-800 transition-colors duration-150 hover:border-ink-900"
                >
                  {category}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Why SANTRAC */}
      <section className="border-t border-ink-100 bg-ink-25 py-16 sm:py-20">
        <Container>
          <SectionHeader title={t.home.whySantrac} align="center" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whySantracPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <div key={i} className="flex flex-col items-start gap-4 text-start">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white ring-1 ring-ink-100">
                    <Icon aria-hidden="true" className="h-5 w-5 text-brand-500" strokeWidth={1.75} />
                  </span>
                  <p className="text-sm leading-relaxed text-ink-600">{point[locale]}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Services preview */}
      <section className="border-t border-ink-100 py-16 sm:py-20">
        <Container>
          <SectionHeader
            title={t.home.services}
            action={
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-500"
              >
                {t.home.servicesCta}
                <ArrowIcon aria-hidden="true" className="h-4 w-4" />
              </Link>
            }
          />
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-ink-100 bg-ink-100 sm:grid-cols-2 lg:grid-cols-4">
            {serviceThemes.map((service) => (
              <div key={service.en} className="bg-white p-6">
                <p className="text-[0.9375rem] font-semibold text-ink-900">{service[locale]}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* About preview */}
      <section className="border-t border-ink-100 bg-ink-25 py-16 sm:py-20">
        <Container className="max-w-3xl text-center">
          <Eyebrow className="text-center">{t.home.aboutPreview}</Eyebrow>
          <p className="mt-4 text-display-sm font-semibold leading-snug text-ink-900">
            {locale === "ar"
              ? "شركة مصرية متخصصة في المعدات الثقيلة والصناعية المستعملة، تركز على الجودة والثقة."
              : "An Egyptian company specializing in used heavy and industrial equipment — built on quality and trust."}
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-500"
          >
            {t.home.aboutCta}
            <ArrowIcon aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Container>
      </section>

      {/* WhatsApp assistance band */}
      <section className="border-t border-ink-100 bg-ink-900 py-14">
        <Container className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-start">
          <div>
            <p className="text-lg font-semibold text-white">{t.home.assistanceTitle}</p>
            <p className="mt-1 text-sm text-ink-400">{t.home.assistanceBody}</p>
          </div>
          <WhatsAppCta className="shrink-0 border-white/20 text-white hover:border-white" />
        </Container>
      </section>
    </div>
  );
}
