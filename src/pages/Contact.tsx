import { useI18n } from "@/lib/i18n";
import { config, whatsappLink } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

export default function Contact() {
  const { t } = useI18n();
  const waHref = whatsappLink();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-ink-900">{t.contact.title}</h1>

      <dl className="mt-8 flex flex-col gap-4 text-sm">
        {config.contact.phone && (
          <div>
            <dt className="text-ink-500">{t.contact.phone}</dt>
            <dd>
              <a
                href={`tel:${config.contact.phone}`}
                onClick={() => trackEvent("CallClick")}
                className="text-brand-600"
              >
                {config.contact.phone}
              </a>
            </dd>
          </div>
        )}
        {config.contact.email && (
          <div>
            <dt className="text-ink-500">{t.contact.email}</dt>
            <dd>
              <a href={`mailto:${config.contact.email}`} className="text-brand-600">
                {config.contact.email}
              </a>
            </dd>
          </div>
        )}
        {waHref && (
          <div>
            <dt className="text-ink-500">{t.contact.whatsapp}</dt>
            <dd>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("WhatsAppClick")}
                className="text-brand-600"
              >
                WhatsApp
              </a>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
