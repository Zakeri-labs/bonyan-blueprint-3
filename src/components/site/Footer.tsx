import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, useT } from "@/i18n";
import { Brand, LanguageSwitcher } from "./Brand";
import { Btn } from "./ui";
import { L } from "./L";

const socialIcons = { Facebook, LinkedIn: Linkedin, Instagram } as const;

export function Footer() {
  const { t, lp } = useT();

  const quick = [
    { label: t.nav.home, to: lp("/") },
    { label: t.nav.about, to: lp("/about") },
    { label: t.nav.services, to: lp("/services") },
    { label: t.nav.portfolio, to: lp("/"), hash: "portfolio" },
    { label: t.nav.contact, to: lp("/contact") },
  ];

  return (
    <footer className="border-t border-primary/30 bg-panel">
      <div className="container-site grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Brand />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t.meta.slogan}
          </p>
          <div className="mt-6 flex gap-3">
            {CONTACT.social.map((s) => {
              const Icon = socialIcons[s.label as keyof typeof socialIcons];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex size-11 items-center justify-center rounded-xs border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              );
            })}
          </div>
          <LanguageSwitcher className="mt-6 w-fit" />
        </div>

        <nav aria-label={t.footer.quickLinks}>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest">
            {t.footer.quickLinks}
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {quick.map((q) => (
              <li key={q.label}>
                <L to={q.to} hash={q.hash} className="transition-colors hover:text-primary">
                  {q.label}
                </L>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.ourServices}>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest">
            {t.footer.ourServices}
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {t.services.items.map((s) => (
              <li key={s.id}>
                <L
                  to={lp("/services")}
                  hash={s.id}
                  className="transition-colors hover:text-primary"
                >
                  {s.title}
                </L>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest">
            {t.footer.contactUs}
          </h2>
          <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={CONTACT.phoneHref} dir="ltr">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`mailto:${CONTACT.email}`} dir="ltr">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={CONTACT.mapHref}>{t.contact.address}</a>
            </li>
          </ul>
          <Btn to={lp("/contact")} className="mt-6 w-full" arrow>
            {t.nav.cta}
          </Btn>
          <a
            href={CONTACT.whatsappHref}
            className="mt-3 block text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {t.nav.whatsapp}: <span dir="ltr">{CONTACT.whatsapp}</span>
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t.meta.brandFull}. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <span>{t.footer.privacy}</span>
            <span>{t.footer.terms}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
