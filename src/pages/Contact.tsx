import { Link } from "react-router-dom";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { config, whatsappLink } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function Contact() {
  const { t } = useI18n();
  const waHref = whatsappLink();

  const channels = [
    config.contact.phone
      ? {
          icon: Phone,
          label: t.contact.phone,
          value: config.contact.phone,
          href: `tel:${config.contact.phone}`,
          external: false,
          onClick: () => trackEvent("CallClick"),
        }
      : null,
    config.contact.email
      ? {
          icon: Mail,
          label: t.contact.email,
          value: config.contact.email,
          href: `mailto:${config.contact.email}`,
          external: false,
          onClick: undefined,
        }
      : null,
    waHref
      ? {
          icon: MessageCircle,
          label: t.contact.whatsapp,
          value: config.contact.whatsappNumber || t.contact.whatsapp,
          href: waHref,
          external: true,
          onClick: () => trackEvent("WhatsAppClick"),
        }
      : null,
  ].filter((channel): channel is NonNullable<typeof channel> => channel !== null);

  return (
    <div className="border-t border-ink-100">
      <Container className="max-w-2xl py-14 sm:py-20">
        <Eyebrow>{t.nav.getInTouch}</Eyebrow>
        <h1 className="mt-2 text-display-sm font-bold text-ink-900">{t.contact.title}</h1>
        <p className="mt-2 text-[0.9375rem] text-ink-500">{t.contact.subtitle}</p>

        <div className="mt-9 divide-y divide-ink-100 border-y border-ink-100">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer" : undefined}
                onClick={channel.onClick}
                className="group flex items-center gap-4 py-5 transition-colors hover:bg-ink-25"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-500 group-hover:bg-brand-50 group-hover:text-brand-500">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-widest2 text-ink-400">
                    {channel.label}
                  </span>
                  <span className="block text-[0.9375rem] font-medium text-ink-900" dir="ltr">
                    {channel.value}
                  </span>
                </span>
              </a>
            );
          })}
        </div>

        <Link
          to="/request-quote"
          className="mt-9 inline-flex h-12 items-center justify-center rounded bg-brand-500 px-7 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600"
        >
          {t.contact.ctaText}
        </Link>
      </Container>
    </div>
  );
}
