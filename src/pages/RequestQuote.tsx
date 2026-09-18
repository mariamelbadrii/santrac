import { useLocation } from "react-router-dom";
import { ShieldCheck, Clock, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { RequestQuoteForm } from "@/components/RequestQuoteForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WhatsAppCta } from "@/components/site/WhatsAppCta";
import { Reveal } from "@/components/motion/Reveal";

interface LocationState {
  equipmentId?: string;
  equipmentNeed?: string;
}

const reassurancePoints = [
  { icon: Clock, en: "Our team typically responds quickly.", ar: "يستجيب فريقنا عادةً بسرعة." },
  { icon: ShieldCheck, en: "No account or payment required to enquire.", ar: "لا حاجة لحساب أو دفع للاستفسار." },
] as const;

export default function RequestQuote() {
  const { t, locale } = useI18n();
  const location = useLocation();
  const state = (location.state ?? {}) as LocationState;

  return (
    <div className="border-t border-ink-100">
      <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_360px] lg:gap-16">
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>{t.nav.getInTouch}</Eyebrow>
            <h1 className="mt-2 text-display-sm font-bold text-ink-900">{t.requestQuote.title}</h1>
            <p className="mt-2 text-[0.9375rem] text-ink-500">{t.requestQuote.subtitle}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-8">
            <RequestQuoteForm
              equipmentId={state.equipmentId}
              prefillEquipmentNeed={state.equipmentNeed}
            />
          </Reveal>
        </div>

        <Reveal delay={0.15} as="aside" className="flex flex-col gap-6">
          <div className="rounded-lg border border-ink-100 bg-ink-25 p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink-900">
              <MessageCircle aria-hidden="true" className="h-4 w-4 text-brand-500" />
              {t.requestQuote.whatsappPrompt}
            </p>
            <div className="mt-4">
              <WhatsAppCta className="w-full" />
            </div>
          </div>

          <ul className="flex flex-col gap-4">
            {reassurancePoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <li key={i} className="flex items-start gap-3 text-sm text-ink-600">
                  <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                  {point[locale]}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </div>
  );
}
