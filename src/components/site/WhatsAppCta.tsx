import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function WhatsAppCta({ message, className }: { message?: string; className?: string }) {
  const { t } = useI18n();
  const href = whatsappLink(message);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent("WhatsAppClick")}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded border border-ink-300 px-6 text-sm font-semibold text-ink-900 transition-colors duration-150 hover:border-ink-900",
        className,
      )}
    >
      <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" />
      {t.equipmentDetail.whatsapp}
    </a>
  );
}
