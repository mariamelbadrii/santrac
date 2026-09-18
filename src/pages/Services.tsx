import { useI18n } from "@/lib/i18n";

const services = [
  {
    en: {
      title: "Equipment Sales",
      body: "Used heavy and industrial equipment, reviewed before it is listed.",
    },
    ar: {
      title: "بيع المعدات",
      body: "معدات ثقيلة وصناعية مستعملة، تتم مراجعتها قبل إدراجها.",
    },
  },
  {
    en: {
      title: "Sourcing & Guidance",
      body: "Our team helps you find and choose equipment suited to your operation.",
    },
    ar: {
      title: "التوريد والمساعدة في الاختيار",
      body: "يساعدك فريقنا في العثور على المعدة المناسبة لعملك واختيارها.",
    },
  },
  {
    en: {
      title: "Inspection Before Sale",
      body: "Equipment is inspected before it is offered for sale.",
    },
    ar: {
      title: "الفحص قبل البيع",
      body: "يتم فحص المعدات قبل عرضها للبيع.",
    },
  },
  {
    en: {
      title: "After-Sales Support",
      body: "Support continues after the sale is complete.",
    },
    ar: {
      title: "دعم ما بعد البيع",
      body: "يستمر الدعم بعد إتمام عملية البيع.",
    },
  },
];

export default function Services() {
  const { t, locale } = useI18n();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-ink-900">{t.services.title}</h1>
      <p className="mt-2 max-w-xl text-ink-600">{t.services.subtitle}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <div key={service.en.title} className="rounded-lg border border-ink-100 p-6">
            <h2 className="text-lg font-semibold text-ink-900">{service[locale].title}</h2>
            <p className="mt-2 text-sm text-ink-600">{service[locale].body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
