import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT, useT } from "@/i18n";
import { Brand, LanguageSwitcher } from "./Brand";
import { Btn } from "./ui";
import { L } from "./L";

export function useNavItems() {
  const { t, lp } = useT();
  return [
    { label: t.nav.home, to: lp("/") },
    { label: t.nav.about, to: lp("/about") },
    { label: t.nav.services, to: lp("/services") },
    { label: t.nav.portfolio, to: lp("/"), hash: "portfolio" },
    { label: t.nav.testimonials, to: lp("/"), hash: "testimonials" },
    { label: t.nav.contact, to: lp("/contact") },
  ];
}

export function Header() {
  const { t, lp, locale } = useT();
  const items = useNavItems();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-site flex h-20 items-center justify-between gap-4">
        <Brand />

        <nav aria-label={t.nav.menu} className="hidden items-center gap-7 lg:flex">
          {items.map((item) => (
            <L
              key={item.label}
              to={item.to}
              hash={item.hash}
              className="text-[0.8125rem] font-medium text-muted-foreground transition-colors hover:text-primary"
              activeOptions={{ exact: true, includeHash: false }}
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </L>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:flex" />
          <Btn to={lp("/contact")} className="hidden lg:inline-flex">
            {t.nav.cta}
          </Btn>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.nav.menu}
            aria-expanded={open}
            className="flex size-11 items-center justify-center rounded-xs border border-border text-foreground lg:hidden"
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer — slides in from the inline-end side (right in EN, left in AR) */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-background/80 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          role="dialog"
          aria-modal={open}
          aria-label={t.nav.menu}
          className={cn(
            "absolute inset-y-0 end-0 flex w-[86%] max-w-sm flex-col border-s border-border bg-card px-6 py-6 transition-transform duration-300",
            open
              ? "translate-x-0"
              : locale === "ar"
                ? "-translate-x-full rtl:translate-x-full"
                : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Brand compact />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.nav.close}
              className="flex size-11 items-center justify-center rounded-xs border border-border"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col" aria-label={t.nav.menu}>
            {items.map((item) => (
              <L
                key={item.label}
                to={item.to}
                hash={item.hash}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-display text-lg font-semibold text-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </L>
            ))}
          </nav>

          <div className="mt-auto space-y-4 pt-8">
            <LanguageSwitcher className="w-fit" />
            <Btn to={lp("/contact")} className="w-full" arrow>
              {t.nav.cta}
            </Btn>
            <a
              href={CONTACT.whatsappHref}
              className="block text-center text-sm text-muted-foreground hover:text-primary"
            >
              {t.nav.whatsapp} — {CONTACT.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
