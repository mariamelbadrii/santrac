import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/config";
import { useSiteSettings } from "@/lib/settings/SiteSettingsContext";
import { trackEvent } from "@/lib/analytics";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TikTokIcon } from "@/components/icons/TikTokIcon";

export default function Contact() {
  const { t, locale } = useI18n();
  const settings = useSiteSettings();
  const waHref = whatsappLink(undefined, settings.whatsappNumber);
  const address = locale === "ar" ? settings.addressAr : settings.addressEn;
  const hours = locale === "ar" ? settings.hoursAr : settings.hoursEn;

  const channels = [
    settings.phone
      ? {
          key: "phone",
          icon: Phone,
          label: t.contact.phone,
          value: settings.phone,
          href: `tel:${settings.phone}`,
          external: false,
          onClick: () => trackEvent("CallClick"),
        }
      : null,
    settings.secondaryPhone
      ? {
          key: "secondary_phone",
          icon: Phone,
          label: t.contact.phone,
          value: settings.secondaryPhone,
          href: `tel:${settings.secondaryPhone}`,
          external: false,
          onClick: () => trackEvent("CallClick"),
        }
      : null,
    settings.email
      ? {
          key: "email",
          icon: Mail,
          label: t.contact.email,
          value: settings.email,
          href: `mailto:${settings.email}`,
          external: false,
          onClick: undefined,
        }
      : null,
    waHref
      ? {
          key: "whatsapp",
          icon: MessageCircle,
          label: t.contact.whatsapp,
          value: settings.whatsappNumber || t.contact.whatsapp,
          href: waHref,
          external: true,
          onClick: () => trackEvent("WhatsAppClick"),
        }
      : null,
    address
      ? {
          key: "address",
          icon: MapPin,
          label: t.contact.address,
          value: hours ? `${address}\n${hours}` : address,
          href: null,
          external: false,
          onClick: undefined,
        }
      : null,
  ].filter((channel): channel is NonNullable<typeof channel> => channel !== null);

  const socialLinks = [
    settings.facebookUrl && { icon: Facebook, href: settings.facebookUrl, label: "Facebook" },
    settings.instagramUrl && { icon: Instagram, href: settings.instagramUrl, label: "Instagram" },
    settings.linkedinUrl && { icon: Linkedin, href: settings.linkedinUrl, label: "LinkedIn" },
    settings.tiktokUrl && { icon: TikTokIcon, href: settings.tiktokUrl, label: "TikTok" },
    settings.youtubeUrl && { icon: Youtube, href: settings.youtubeUrl, label: "YouTube" },
  ].filter((link): link is { icon: typeof Facebook; href: string; label: string } => Boolean(link));

  return (
    <div className="border-t border-ink-100">
      <Container className="grid gap-14 py-14 sm:py-20 lg:grid-cols-[1fr_360px] lg:gap-16">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{t.nav.getInTouch}</Eyebrow>
            <h1 className="mt-2 text-display-sm font-bold text-ink-900">{t.contact.title}</h1>
            <p className="mt-2 text-[0.9375rem] text-ink-500">{t.contact.subtitle}</p>
          </Reveal>

          <Stagger as="div" className="mt-9 divide-y divide-ink-100 border-y border-ink-100">
            {channels.map((channel) => {
              const Icon = channel.icon;
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-500 transition-colors group-hover:bg-brand-50 group-hover:text-brand-500">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-widest2 text-ink-400">
                      {channel.label}
                    </span>
                    <span
                      className="block whitespace-pre-line text-[0.9375rem] font-medium text-ink-900"
                      dir={channel.key === "address" ? undefined : "ltr"}
                    >
                      {channel.value}
                    </span>
                  </span>
                </>
              );
              return (
                <StaggerItem key={channel.key}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noreferrer" : undefined}
                      onClick={channel.onClick}
                      className="group flex items-center gap-4 py-5 transition-colors hover:bg-ink-25"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 py-5">{content}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal delay={0.1}>
            <Link
              to="/request-quote"
              className="mt-9 inline-flex h-12 items-center justify-center rounded bg-brand-500 px-7 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600"
            >
              {t.contact.ctaText}
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:pt-16">
          <div className="rounded-lg bg-ink-900 p-7">
            <p className="font-display text-lg font-bold text-white">
              <span className="text-white">SAN</span>
              <span className="text-brand-400">TRAC</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-400">{t.home.assistanceBody}</p>
            {socialLinks.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-300 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <social.icon aria-hidden="true" className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
