import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", key: "home" as const },
  { to: "/equipment", key: "equipment" as const },
  { to: "/services", key: "services" as const },
  { to: "/about", key: "about" as const },
  { to: "/contact", key: "contact" as const },
];

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <NavLink to="/" className="flex items-center">
          <img src="/logo.png" alt="SANTRAC" className="h-9 w-auto" />
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium text-ink-600 hover:text-ink-900",
                  isActive && "text-ink-900",
                )
              }
            >
              {t.nav[item.key]}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => setLocale(locale === "en" ? "ar" : "en")}
            className="text-sm font-medium text-ink-600 hover:text-ink-900"
            aria-label="Switch language"
          >
            {locale === "en" ? "العربية" : "English"}
          </button>
          <NavLink
            to="/request-quote"
            className="inline-flex h-9 items-center justify-center rounded-md bg-brand-600 px-4 text-sm font-medium text-white hover:bg-brand-700"
          >
            {t.nav.requestQuote}
          </NavLink>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink-900 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-ink-700"
              >
                {t.nav[item.key]}
              </NavLink>
            ))}
            <NavLink
              to="/request-quote"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-brand-600 text-sm font-medium text-white"
            >
              {t.nav.requestQuote}
            </NavLink>
            <button
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="text-start text-sm font-medium text-ink-600"
            >
              {locale === "en" ? "العربية" : "English"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
