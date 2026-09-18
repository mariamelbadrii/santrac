import { whatsappLink } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";

export function WhatsAppCta({ message }: { message?: string }) {
  const { t } = useI18n();
  const href = whatsappLink(message);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent("WhatsAppClick")}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-ink-300 px-5 text-sm font-medium text-ink-900 hover:bg-ink-50"
    >
      {t.equipmentDetail.whatsapp}
    </a>
  );
}
