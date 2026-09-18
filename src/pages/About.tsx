import { useI18n } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "react-router-dom";

const pillars = [
  {
    title: { en: "Quality", ar: "الجودة" },
    body: {
      en: "We select equipment carefully and inspect it before it's offered, so you know exactly what you're getting.",
      ar: "نختار المعدات بعناية ونفحصها قبل عرضها، حتى تعرف تمامًا ما الذي تحصل عليه.",
    },
  },
  {
    title: { en: "Sourcing", ar: "التوريد" },
    body: {
      en: "Equipment is sourced carefully, including imported machines, from sources we trust.",
      ar: "يتم توريد المعدات بعناية، بما في ذلك المعدات المستوردة، من مصادر نثق بها.",
    },
  },
  {
    title: { en: "Trust", ar: "الثقة" },
    body: {
      en: "We build long-term relationships with our customers, and help them choose equipment suited to their needs.",
      ar: "نبني علاقات طويلة الأمد مع عملائنا، ونساعدهم في اختيار المعدة المناسبة لاحتياجاتهم.",
    },
  },
] as const;

export default function About() {
  const { t, locale } = useI18n();

  const intro =
    locale === "ar"
      ? "سانتراك شركة مصرية متخصصة في المعدات الثقيلة والصناعية المستعملة."
      : "SANTRAC is an Egyptian company specializing in used heavy and industrial equipment.";

  const body =
    locale === "ar"
      ? "نركز على جودة المعدات، والفحص قبل البيع، ومساعدة العملاء على اختيار المعدة المناسبة لعملياتهم. نبني علاقات طويلة الأمد مع عملائنا من خلال الاستمرار في تقديم الدعم بعد البيع، وليس فقط عند نقطة الشراء."
      : "We focus on equipment quality, inspection before sale, and helping customers choose the right machine for their operation. We build long-term relationships with our customers by continuing to support them after the sale — not just at the point of purchase.";

  return (
    <div>
      <div className="border-b border-ink-100 bg-ink-25">
        <Container className="py-14 sm:py-16">
          <Reveal>
            <Eyebrow>{t.about.eyebrow}</Eyebrow>
            <h1 className="mt-2 max-w-2xl text-display-md font-bold text-ink-900">{t.about.title}</h1>
          </Reveal>
        </Container>
      </div>

      <Container className="max-w-3xl py-14 sm:py-16">
        <Reveal>
          <p className="text-display-sm font-semibold leading-snug text-ink-900">{intro}</p>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-600">{body}</p>
        </Reveal>

        <Stagger className="mt-12 grid gap-8 border-t border-ink-100 pt-10 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title.en}>
              <h2 className="text-sm font-semibold uppercase tracking-widest2 text-ink-500">
                {pillar.title[locale]}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{pillar.body[locale]}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <div className="border-t border-ink-100 bg-ink-25">
        <Container className="flex flex-col items-center gap-5 py-14 text-center">
          <Reveal className="flex flex-col items-center gap-5">
            <p className="text-lg font-semibold text-ink-900">{t.home.assistanceTitle}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/equipment"
                className="inline-flex h-12 items-center justify-center rounded bg-brand-500 px-7 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600"
              >
                {t.home.ctaPrimary}
              </Link>
              <WhatsAppCta />
            </div>
          </Reveal>
        </Container>
      </div>
    </div>
  );
}
