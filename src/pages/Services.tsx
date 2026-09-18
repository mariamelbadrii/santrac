import { useI18n } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Link } from "react-router-dom";

const services = [
  {
    en: {
      title: "Equipment Sales",
      body: "Used heavy and industrial equipment, selected for quality and reviewed before it is listed.",
    },
    ar: {
      title: "بيع المعدات",
      body: "معدات ثقيلة وصناعية مستعملة، يتم اختيارها بعناية ومراجعتها قبل إدراجها.",
    },
  },
  {
    en: {
      title: "Sourcing & Guidance",
      body: "Our team helps you find and choose equipment suited to your operation and requirements.",
    },
    ar: {
      title: "التوريد والمساعدة في الاختيار",
      body: "يساعدك فريقنا في العثور على المعدة المناسبة لعملك واحتياجاتك واختيارها.",
    },
  },
  {
    en: {
      title: "Inspection Before Sale",
      body: "Equipment is inspected before it is offered for sale, so you know what you're getting.",
    },
    ar: {
      title: "الفحص قبل البيع",
      body: "يتم فحص المعدات قبل عرضها للبيع، لتعرف بالضبط ما الذي تحصل عليه.",
    },
  },
  {
    en: {
      title: "After-Sales Support",
      body: "Our support continues after the sale is complete — we stay reachable for your questions.",
    },
    ar: {
      title: "دعم ما بعد البيع",
      body: "يستمر دعمنا بعد إتمام عملية البيع — نبقى متاحين للإجابة على استفساراتك.",
    },
  },
] as const;

export default function Services() {
  const { t, locale } = useI18n();

  return (
    <div>
      <div className="border-b border-ink-100 bg-ink-25">
        <Container className="py-14 sm:py-16">
          <Reveal>
            <Eyebrow>{t.services.eyebrow}</Eyebrow>
            <h1 className="mt-2 max-w-xl text-display-md font-bold text-ink-900">{t.services.title}</h1>
            <p className="mt-3 max-w-lg text-[0.9375rem] text-ink-500">{t.services.subtitle}</p>
          </Reveal>
        </Container>
      </div>

      <Container className="py-14 sm:py-16">
        <Stagger className="divide-y divide-ink-100 border-t border-ink-100">
          {services.map((service, index) => (
            <StaggerItem
              key={service.en.title}
              className="grid gap-4 py-10 sm:grid-cols-[auto_1fr] sm:gap-10"
            >
              <span className="font-display text-sm font-bold text-brand-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="max-w-2xl">
                <h2 className="text-xl font-semibold text-ink-900">{service[locale].title}</h2>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">
                  {service[locale].body}
                </p>
              </div>
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
                to="/request-quote"
                className="inline-flex h-12 items-center justify-center rounded bg-brand-500 px-7 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600"
              >
                {t.nav.requestQuote}
              </Link>
              <WhatsAppCta />
            </div>
          </Reveal>
        </Container>
      </div>
    </div>
  );
}
