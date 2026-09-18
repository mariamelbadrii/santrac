import { useI18n } from "@/lib/i18n";

export default function About() {
  const { t, locale } = useI18n();

  const body =
    locale === "ar"
      ? "سانتراك شركة مصرية متخصصة في المعدات الثقيلة والصناعية المستعملة. نركز على جودة المعدات، والفحص قبل البيع، ومساعدة العملاء على اختيار المعدة المناسبة، مع الاستمرار في تقديم الدعم بعد البيع."
      : "SANTRAC is an Egyptian company specializing in used heavy and industrial equipment. We focus on equipment quality, inspection before sale, and helping customers choose the right machine — with support that continues after the sale.";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-ink-900">{t.about.title}</h1>
      <p className="mt-4 text-base leading-relaxed text-ink-700">{body}</p>
    </div>
  );
}
