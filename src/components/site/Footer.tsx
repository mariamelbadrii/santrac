import { NavLink } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { config } from "@/lib/config";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-100 bg-ink-900 text-ink-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">SANTRAC</p>
          <p className="mt-2 text-sm text-ink-300">{t.home.eyebrow}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <NavLink to="/equipment" className="text-ink-300 hover:text-white">
            {t.nav.equipment}
          </NavLink>
          <NavLink to="/services" className="text-ink-300 hover:text-white">
            {t.nav.services}
          </NavLink>
          <NavLink to="/about" className="text-ink-300 hover:text-white">
            {t.nav.about}
          </NavLink>
          <NavLink to="/contact" className="text-ink-300 hover:text-white">
            {t.nav.contact}
          </NavLink>
        </div>

        <div className="flex flex-col gap-2 text-sm text-ink-300">
          {config.contact.phone && <span>{config.contact.phone}</span>}
          {config.contact.email && <span>{config.contact.email}</span>}
        </div>
      </div>

      <div className="border-t border-ink-800 px-4 py-4 text-center text-xs text-ink-400">
        © {year} SANTRAC. {t.footer.rights}
      </div>
    </footer>
  );
}
