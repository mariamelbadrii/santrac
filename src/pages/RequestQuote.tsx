import { useLocation } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { RequestQuoteForm } from "@/components/RequestQuoteForm";

interface LocationState {
  equipmentId?: string;
  equipmentNeed?: string;
}

export default function RequestQuote() {
  const { t } = useI18n();
  const location = useLocation();
  const state = (location.state ?? {}) as LocationState;

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-3xl font-bold text-ink-900">{t.requestQuote.title}</h1>
      <p className="mt-2 text-ink-600">{t.requestQuote.subtitle}</p>

      <div className="mt-8">
        <RequestQuoteForm
          equipmentId={state.equipmentId}
          prefillEquipmentNeed={state.equipmentNeed}
        />
      </div>
    </div>
  );
}
