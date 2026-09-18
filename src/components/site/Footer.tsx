import { NavLink } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/config";
import { normalizeExternalUrl } from "@/lib/url";
import { useSiteSettings } from "@/lib/settings/SiteSettingsContext";
import { Container } from "@/components/ui/Container";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  const { t, locale } = useI18n();
  const settings = useSiteSettings();
  const year = new Date().getFullYear();
  const waHref = whatsappLink(undefined, settings.whatsappNumber);
  const address = locale === "ar" ? settings.addressAr : settings.addressEn;
  const hours = locale === "ar" ? settings.hoursAr : settings.hoursEn;

  const socialLinks = [
    { icon: Facebook, href: normalizeExternalUrl(settings.facebookUrl), label: "Facebook" },
    { icon: Instagram, href: normalizeExternalUrl(settings.instagramUrl), label: "Instagram" },
    { icon: Linkedin, href: normalizeExternalUrl(settings.linkedinUrl), label: "LinkedIn" },
    { icon: TikTokIcon, href: normalizeExternalUrl(settings.tiktokUrl), label: "TikTok" },
    { icon: Youtube, href: normalizeExternalUrl(settings.youtubeUrl), label: "YouTube" },
  ].filter((link): link is { icon: typeof Facebook; href: string; label: string } => Boolean(link.href));

  return (
    <footer className="bg-ink-900 text-ink-200">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-8">
        <div className="max-w-sm">
          <p className="font-display text-2xl font-bold leading-none tracking-tight">
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
            {settings.phone && (
              <a
                href={`tel:${settings.phone}`}
                onClick={() => trackEvent("CallClick")}
                className="flex items-center gap-2.5 text-ink-300 transition-colors hover:text-white"
              >
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-ink-500" />
                {settings.phone}
              </a>
            )}
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2.5 text-ink-300 transition-colors hover:text-white"
              >
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-ink-500" />
                {settings.email}
              </a>
            )}
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("WhatsAppClick")}
                className="flex items-center gap-2.5 text-ink-300 transition-colors hover:text-white"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0 text-ink-500" />
                {t.contact.whatsapp}
              </a>
            )}
            {address && (
              <p className="flex items-start gap-2.5 text-ink-300">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-ink-500" />
                {address}
              </p>
            )}
            {hours && <p className="ps-6 text-xs text-ink-400">{hours}</p>}
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-300 transition-colors hover:border-white/30 hover:text-white"
                >
                  <social.icon aria-hidden="true" className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
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
