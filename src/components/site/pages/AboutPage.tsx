import { Check } from "lucide-react";
import { useT } from "@/i18n";
import { SiteLayout } from "../SiteLayout";
import { IMAGES } from "../assets";
import { Btn, Reveal, SectionLabel } from "../ui";

export function AboutPage() {
  const { t, lp } = useT();

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
          <SectionLabel>{t.pages.about.eyebrow}</SectionLabel>
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
              src={IMAGES.about}
              alt={t.about.imageAlt}
              loading="lazy"
              width={1200}
              height={912}
              className="aspect-4/3 w-full border border-border object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Local market positioning */}
      <section aria-labelledby="market-heading" className="bg-panel">
        <div className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 md:py-24">
          <Reveal>
            <img
              src={IMAGES.mosque}
              alt={t.about.marketTitle}
              loading="lazy"
              width={1200}
              height={800}
              className="aspect-4/3 w-full border border-border object-cover"
            />
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
