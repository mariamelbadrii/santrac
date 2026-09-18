import { NavLink } from "react-router-dom";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { config, whatsappLink } from "@/lib/config";
import { Container } from "@/components/ui/Container";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const waHref = whatsappLink();

  return (
    <footer className="bg-ink-900 text-ink-200">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-8">
        <div className="max-w-sm">
          <p className="text-2xl font-bold leading-none tracking-tight">
            <span className="text-white">SAN</span>
            <span className="text-brand-400">TRAC</span>
          </p>
          <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-widest2 text-ink-500">
            On the trac
          </p>
          <p className="mt-5 text-sm leading-relaxed text-ink-400">{t.home.eyebrow}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest2 text-ink-500">
            {t.nav.explore}
          </p>
          <nav className="mt-4 flex flex-col gap-3 text-sm">
            <NavLink to="/equipment" className="text-ink-300 transition-colors hover:text-white">
              {t.nav.equipment}
            </NavLink>
            <NavLink to="/services" className="text-ink-300 transition-colors hover:text-white">
              {t.nav.services}
            </NavLink>
            <NavLink to="/about" className="text-ink-300 transition-colors hover:text-white">
              {t.nav.about}
            </NavLink>
            <NavLink to="/contact" className="text-ink-300 transition-colors hover:text-white">
              {t.nav.contact}
            </NavLink>
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest2 text-ink-500">
            {t.nav.getInTouch}
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            {config.contact.phone && (
              <a
                href={`tel:${config.contact.phone}`}
                onClick={() => trackEvent("CallClick")}
                className="flex items-center gap-2.5 text-ink-300 transition-colors hover:text-white"
              >
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-ink-500" />
                {config.contact.phone}
              </a>
            )}
            {config.contact.email && (
              <a
                href={`mailto:${config.contact.email}`}
                className="flex items-center gap-2.5 text-ink-300 transition-colors hover:text-white"
              >
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-ink-500" />
                {config.contact.email}
              </a>
            )}
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("WhatsAppClick")}
                className="flex items-center gap-2.5 text-ink-300 transition-colors hover:text-white"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0 text-ink-500" />
                {t.contact.whatsapp}
              </a>
            )}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center gap-2 py-6 text-center text-xs text-ink-500 sm:flex-row sm:justify-between sm:text-start">
          <span>
            © {year} SANTRAC. {t.footer.rights}
          </span>
        </Container>
      </div>
    </footer>
  );
}
