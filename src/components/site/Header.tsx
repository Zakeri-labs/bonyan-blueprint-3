import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Mail, MapPin, Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT, useT } from "@/i18n";
import { Brand, LanguageSwitcher } from "./Brand";
import { Btn } from "./ui";
import { L } from "./L";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="hidden border-b border-border/70 bg-background/75 lg:block">
        <div className="container-site flex h-9 items-center justify-between gap-6 text-[0.6875rem] font-medium text-muted-foreground">
          <a
            href={`mailto:${CONTACT.email}`}
            className="group flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Mail
              aria-hidden="true"
              className="size-3.5 text-primary transition-transform duration-300 group-hover:scale-110"
            />
            <span dir="ltr">{CONTACT.email}</span>
          </a>

          <div className="flex items-center gap-7">
            <a
              href={CONTACT.phoneHref}
              className="group flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Phone
                aria-hidden="true"
                className="size-3.5 text-primary transition-transform duration-300 group-hover:scale-110"
              />
              <span dir="ltr">{CONTACT.phone}</span>
            </a>
            <a
              href={CONTACT.mapHref}
              className="group flex items-center gap-2 transition-colors hover:text-primary"
            >
              <MapPin
                aria-hidden="true"
                className="size-3.5 text-primary transition-transform duration-300 group-hover:scale-110"
              />
              <span>{t.portfolio.location}</span>
            </a>

            <div className="flex items-center gap-2 border-s border-border/70 ps-4 text-xs font-semibold text-primary">
              <span className="relative flex size-2 shrink-0">
                <span className="status-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <span className="text-[0.625rem] font-bold uppercase tracking-wider opacity-90">
                {locale === "ar" ? "استشارات نَشِطة" : "Active Consultancy"}
              </span>
            </div>
          </div>
        </div>
      </div>

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
<<<<<<< HEAD
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
          open ? "visible pointer-events-auto" : "invisible pointer-events-none",
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
            "absolute inset-y-0 end-0 flex w-[86%] max-w-sm flex-col overflow-y-auto border-s border-border bg-card px-6 py-6 transition-transform duration-300",
            open ? "translate-x-0" : locale === "ar" ? "-translate-x-full" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Brand compact />
=======
          <Sheet open={open} onOpenChange={setOpen}>
>>>>>>> d8531a3 (Fix: Unbalanced JSX tags in CalendarPage)
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.nav.menu}
              aria-expanded={open}
              className="flex size-11 items-center justify-center rounded-xs border border-border text-foreground lg:hidden"
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
            <SheetContent
              side={locale === "ar" ? "right" : "right"}
              className="flex w-[86%] max-w-sm flex-col overflow-y-auto border-s border-border bg-card px-6 py-6"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>{t.nav.menu}</SheetTitle>
              </SheetHeader>

              <div className="flex items-center justify-between pe-10">
                <Brand compact />
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

              <ul className="mt-6 space-y-1 border-t border-border pt-5">
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="group flex min-h-12 items-center gap-3 rounded-xs px-2 transition-colors hover:bg-background/40"
                  >
                    <Mail aria-hidden="true" className="size-4 shrink-0 text-primary" />
                    <span className="min-w-0">
                      <span className="block text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                        {t.contact.email}
                      </span>
                      <span
                        dir="ltr"
                        className="block text-start text-sm font-medium text-foreground"
                      >
                        {CONTACT.email}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.phoneHref}
                    className="group flex min-h-12 items-center gap-3 rounded-xs px-2 transition-colors hover:bg-background/40"
                  >
                    <Phone aria-hidden="true" className="size-4 shrink-0 text-primary" />
                    <span className="min-w-0">
                      <span className="block text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                        {t.contact.phone}
                      </span>
                      <span
                        dir="ltr"
                        className="block text-start text-sm font-medium text-foreground"
                      >
                        {CONTACT.phone}
                      </span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.mapHref}
                    className="group flex min-h-12 items-center gap-3 rounded-xs px-2 transition-colors hover:bg-background/40"
                  >
                    <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
                    <span className="min-w-0">
                      <span className="block text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                        {t.contact.location}
                      </span>
                      <span className="block text-sm font-medium text-foreground">
                        {t.portfolio.location}
                      </span>
                    </span>
                  </a>
                </li>
              </ul>

              <div className="mt-auto space-y-4 pt-8">
                <LanguageSwitcher className="w-fit" />
                <Btn to={lp("/contact")} className="w-full" arrow onClick={() => setOpen(false)}>
                  {t.nav.cta}
                </Btn>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
