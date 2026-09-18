import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/95 backdrop-blur">
        <Container className="flex h-[72px] items-center justify-between">
          <NavLink to="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
            <img src="/logo.png" alt="SANTRAC" className="h-9 w-auto sm:h-10" />
          </NavLink>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "text-[0.8125rem] font-semibold uppercase tracking-wide text-ink-500 transition-colors duration-150 hover:text-ink-900",
                    isActive && "text-ink-900",
                  )
                }
              >
                {t.nav[item.key]}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="rounded-full border border-ink-200 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-600 transition-colors duration-150 hover:border-ink-900 hover:text-ink-900"
            >
              {locale === "en" ? "العربية" : "English"}
            </button>
            <NavLink
              to="/request-quote"
              className="inline-flex h-10 items-center justify-center rounded bg-brand-500 px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-600"
            >
              {t.nav.requestQuote}
            </NavLink>
          </div>

          <button
            className="flex h-11 w-11 items-center justify-center text-ink-900 md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu aria-hidden="true" className="h-6 w-6" />
          </button>
        </Container>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          <Container className="flex h-[72px] items-center justify-between border-b border-ink-100">
            <img src="/logo.png" alt="SANTRAC" className="h-9 w-auto" />
            <button
              className="flex h-11 w-11 items-center justify-center text-ink-900"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </Container>

          <nav className="flex flex-1 flex-col justify-center gap-1 px-5" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "border-b border-ink-100 py-4 text-2xl font-semibold text-ink-800",
                    isActive && "text-brand-500",
                  )
                }
              >
                {t.nav[item.key]}
              </NavLink>
            ))}
          </nav>

          <Container className="flex flex-col gap-3 border-t border-ink-100 py-5">
            <NavLink
              to="/request-quote"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center rounded bg-brand-500 text-sm font-semibold text-white"
            >
              {t.nav.requestQuote}
            </NavLink>
            <button
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="inline-flex h-12 items-center justify-center rounded border border-ink-200 text-sm font-semibold text-ink-700"
            >
              {locale === "en" ? "العربية" : "English"}
            </button>
          </Container>
        </div>
      )}
    </>
  );
}
