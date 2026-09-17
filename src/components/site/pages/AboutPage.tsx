import { useState } from "react";
import { Check } from "lucide-react";
import { CONTACT, useT } from "@/i18n";
import { SiteLayout } from "../SiteLayout";
import { HOME_PROJECT_IMAGES, IMAGES } from "../assets";
import { Btn, Reveal, SectionLabel } from "../ui";

export function AboutPage() {
  const { t, lp } = useT();
  const [showMarketLocation, setShowMarketLocation] = useState(false);
  const [isMarketImageHovered, setIsMarketImageHovered] = useState(false);
  const [hasMarketImageFocus, setHasMarketImageFocus] = useState(false);
  const marketLocationVisible = showMarketLocation || isMarketImageHovered || hasMarketImageFocus;

  return (
    <SiteLayout>
      {/* Intro banner */}
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <img
          src={IMAGES.facade}
          alt=""
          aria-hidden="true"
          width={1200}
          height={800}
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-background/80 via-background/90 to-background"
        />
        <div className="container-site relative pb-16 md:pb-24">
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-6xl">
            {t.pages.about.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t.pages.about.lead}
          </p>
        </div>
      </section>

      {/* Overview + founding */}
      <section aria-labelledby="overview-heading" className="bg-background">
        <div className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 md:py-24">
          <Reveal>
            <SectionLabel>{t.about.sectionLabel}</SectionLabel>
            <h2
              id="overview-heading"
              className="font-display text-3xl font-extrabold leading-tight md:text-4xl"
            >
              {t.about.heading1} <span className="text-primary">{t.about.heading2}</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.about.body}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.about.body2}
            </p>
            <p className="mt-6 border-s-2 border-primary/60 ps-4 font-display text-sm font-semibold text-foreground md:text-base">
              {t.about.mission}
            </p>
            <ul className="mt-8 grid gap-3">
              {t.about.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <img
              src={IMAGES.aboutBonyanConstruction}
              alt={t.about.imageAlt}
              loading="lazy"
              width={1448}
              height={1086}
              className="aspect-4/3 w-full border border-border object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Local market positioning */}
      <section aria-labelledby="market-heading" className="bg-panel">
        <div className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 md:py-24">
          <Reveal>
            <div
              className="relative mx-auto w-full max-w-xl overflow-hidden border border-border"
              onMouseEnter={() => setIsMarketImageHovered(true)}
              onMouseLeave={() => setIsMarketImageHovered(false)}
              onFocus={() => setHasMarketImageFocus(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setHasMarketImageFocus(false);
                  setShowMarketLocation(false);
                }
              }}
            >
              <button
                type="button"
                aria-label={`${t.about.homeImageAlt} — ${t.contact.viewMap}`}
                aria-expanded={marketLocationVisible}
                aria-controls="about-market-location"
                onClick={() => setShowMarketLocation((visible) => !visible)}
                className="relative block w-full cursor-pointer focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-primary"
              >
                <img
                  src={HOME_PROJECT_IMAGES.about}
                  alt={t.about.homeImageAlt}
                  loading="lazy"
                  width={1198}
                  height={1313}
                  className={`h-auto w-full transition-transform duration-700 ease-out motion-reduce:transition-none ${marketLocationVisible ? "scale-105" : "scale-100"}`}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.3)_100%)]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"
                />
              </button>
              <div
                id="about-market-location"
                aria-hidden={!marketLocationVisible}
                className={`pointer-events-none absolute inset-x-4 flex -translate-y-1/2 items-center justify-center transition-[top,opacity] duration-700 ease-out motion-reduce:transition-none md:inset-x-6 ${marketLocationVisible ? "top-[72.5%] opacity-100" : "top-[110%] opacity-0"}`}
              >
                <a
                  href={CONTACT.mapHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={marketLocationVisible ? 0 : -1}
                  className={`flex min-h-12 items-center justify-center gap-2 rounded-md bg-background py-3 text-center text-base font-semibold text-primary shadow-lg transition-[padding,colors] hover:bg-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isMarketImageHovered ? "px-[31px]" : "px-[26px]"} ${marketLocationVisible ? "pointer-events-auto" : "pointer-events-none"}`}
                >
                  <span>{t.contact.viewMap}</span>
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2
              id="market-heading"
              className="font-display text-2xl font-extrabold leading-tight md:text-3xl"
            >
              {t.about.marketTitle}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.about.marketBody}
            </p>
            <h3 className="mt-10 font-display text-lg font-bold">{t.about.expertiseTitle}</h3>
            <ul className="mt-5 grid gap-3">
              {t.about.expertise.map((e) => (
                <li key={e} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-primary" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-10 font-display text-lg font-bold">{t.about.registrationsTitle}</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {t.about.registrations.map((r) => (
                <li
                  key={r}
                  className="border border-border px-3 py-1.5 text-xs text-muted-foreground"
                >
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="bg-background">
        <div className="container-site py-20 md:py-24">
          <SectionLabel>{t.about.label}</SectionLabel>
          <h2
            id="values-heading"
            className="font-display text-2xl font-extrabold leading-tight md:text-3xl"
          >
            {t.about.valuesTitle}
          </h2>
          <ul className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {t.about.values.map((v) => (
              <li key={v.title} className="bg-background p-6">
                <h3 className="font-display text-base font-bold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </li>
            ))}
          </ul>
          <Btn to={lp("/contact")} className="mt-12" arrow>
            {t.nav.cta}
          </Btn>
        </div>
      </section>
    </SiteLayout>
  );
}
