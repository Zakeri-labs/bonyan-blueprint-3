import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT, useT } from "@/i18n";
import { SiteLayout } from "../SiteLayout";
import {
  ARCHITECTURAL_IMAGES,
  BUILDING_CONSTRUCTION_IMAGES,
  IMAGES,
  SERVICE_IMAGES,
  SUPERVISION_CARD_GALLERY,
  SUPERVISION_CARD_GALLERY_2,
} from "../assets";
import { Btn, GhostNumber, Reveal, SectionLabel } from "../ui";
import { SERVICE_ICONS } from "../sections/ServicesSection";

/**
 * A single stat figure that animates the first time it scrolls into view.
 * Plain counts tick up from zero; a year-like value (4 digits, not in the
 * future) ticks *down* from the current year, so "since 2021" reads as a
 * countdown. Reduced-motion, SSR, and no-JS all get the final value directly.
 */
function StatValue({
  value,
  className,
  delay = 0,
}: {
  value: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return;

    const target = Number(match[1]);
    const suffix = match[2] ?? "";
    const currentYear = new Date().getFullYear();
    const isYear = match[1].length === 4 && target >= 1900 && target <= currentYear;
    const start = isYear ? currentYear : 0;
    if (start === target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const DURATION = 1400;
    let raf = 0;
    let timer = 0;

    const animate = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - t0) / DURATION);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(`${Math.round(start + (target - start) * eased)}${suffix}`);
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        setDisplay(`${start}${suffix}`);
        timer = window.setTimeout(animate, delay);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [value, delay]);

  return (
    <p ref={ref} className={className}>
      {display}
    </p>
  );
}

export function PortfolioPage() {
  const { t, lp } = useT();
  const p = t.portfolioPage;

  return (
    <SiteLayout>
      {/* Hero — matches the Services / Team / Career page pattern */}
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <img
          src={IMAGES.facade}
          alt=""
          aria-hidden="true"
          width={1200}
          height={800}
          className="absolute inset-0 size-full object-cover opacity-20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-background/80 via-background/90 to-background"
        />
        <div className="container-site relative pb-16 md:pb-24">
          <SectionLabel>{p.eyebrow}</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-6xl">
            {p.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">{p.lead}</p>
        </div>
      </section>

      {/* Stats band */}
      <section aria-label={p.eyebrow} className="bg-panel">
        <div className="container-site py-12 md:py-16">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-4">
            {p.stats.map((s, i) => (
              <li key={s.label} className="bg-background/95 p-6 md:p-7">
                <StatValue
                  value={s.value}
                  delay={i * 140}
                  className="font-display text-3xl font-extrabold text-primary md:text-4xl"
                />
                <p className="mt-2 text-xs leading-snug text-muted-foreground md:text-sm">
                  {s.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Intro to the by-service sections */}
      <section aria-labelledby="portfolio-by-service" className="bg-background">
        <div className="container-site pt-20 md:pt-28">
          <Reveal>
            <SectionLabel>{p.sectionsLabel}</SectionLabel>
            <h2
              id="portfolio-by-service"
              className="max-w-2xl font-display text-3xl font-extrabold leading-tight md:text-4xl"
            >
              {p.sectionsHeading}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {p.sectionsBody}
            </p>
          </Reveal>
        </div>
      </section>

      {/* One dedicated section per service line */}
      {p.services.map((entry, order) => {
        const si = t.services.items.findIndex((s) => s.id === entry.id);
        const svc = t.services.items[si]!;
        const Icon = SERVICE_ICONS[si] ?? MapPin;
        const num = String(order + 1).padStart(2, "0");
        const imgRight = order % 2 === 1;

        return (
          <section
            key={entry.id}
            id={entry.id}
            aria-labelledby={`${entry.id}-heading`}
            className={cn("relative scroll-mt-24", order % 2 === 0 ? "bg-background" : "bg-panel")}
          >
            <div className="container-site relative py-16 md:py-24">
              <GhostNumber value={num} />

              <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-center">
                <Reveal className={imgRight ? "lg:order-2" : undefined}>
                  <div className="relative overflow-hidden border border-border">
                    <img
                      src={SERVICE_IMAGES[si]}
                      alt={svc.title}
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="aspect-4/3 w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-background/70 via-background/10 to-transparent"
                    />
                    <span className="absolute start-4 top-4 flex size-12 items-center justify-center rounded-lg border border-primary/30 bg-background/80 backdrop-blur-xs">
                      <Icon aria-hidden="true" className="size-6 text-primary" />
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={80}>
                  <p className="eyebrow">
                    {p.sectionsLabel} · {num} / {String(p.services.length).padStart(2, "0")}
                  </p>
                  <h3
                    id={`${entry.id}-heading`}
                    className="mt-3 font-display text-2xl font-extrabold leading-tight md:text-3xl"
                  >
                    {svc.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {entry.summary}
                  </p>
                  <p className="mt-6 text-[0.6875rem] font-bold uppercase tracking-widest text-primary">
                    {p.relevantLabel}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {svc.types.map((ty) => (
                      <li
                        key={ty}
                        className="border border-border px-3 py-1.5 text-xs text-muted-foreground"
                      >
                        {ty}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <div className="mt-12">
                <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-primary">
                  {p.projectsLabel}
                </p>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {entry.projects.map((proj, pi) => {
                    if (entry.id === "construction") {
                      return (
                        <li key={proj.name}>
                          <Reveal delay={(pi % 3) * 60}>
                            <article className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/70 hover:shadow-lg hover:shadow-primary/15">
                              <img
                                src={BUILDING_CONSTRUCTION_IMAGES[pi]}
                                alt={proj.name}
                                loading="lazy"
                                width={800}
                                height={600}
                                className="aspect-4/3 w-full border-b border-border object-cover"
                              />
                              <div className="flex flex-1 flex-col p-5">
                                <span className="eyebrow">{p.clientLabel}</span>
                                <p className="mt-1 text-sm font-semibold leading-snug text-foreground">
                                  {proj.type}
                                </p>
                                <h4 className="mt-3 font-display text-base font-bold leading-snug transition-colors duration-300 group-hover:text-primary">
                                  {proj.name}
                                </h4>
                                <p className="mt-4 text-[0.6875rem] font-bold uppercase tracking-widest text-primary">
                                  {p.scopeLabel}
                                </p>
                                <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">
                                  {proj.scope}
                                </p>
                              </div>
                            </article>
                          </Reveal>
                        </li>
                      );
                    }
                    if (entry.id === "design") {
                      return (
                        <li key={proj.name}>
                          <Reveal delay={(pi % 3) * 60}>
                            <article className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/70 hover:shadow-lg hover:shadow-primary/15">
                              <img
                                src={ARCHITECTURAL_IMAGES[pi]}
                                alt={proj.name}
                                loading="lazy"
                                width={800}
                                height={600}
                                className="aspect-4/3 w-full border-b border-border object-cover"
                              />
                              <div className="flex flex-1 flex-col p-5">
                                <span className="eyebrow">{proj.type}</span>
                                <h4 className="mt-2 font-display text-base font-bold leading-snug transition-colors duration-300 group-hover:text-primary">
                                  {proj.name}
                                </h4>
                                <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground">
                                  {proj.scope}
                                </p>
                                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-3 text-[0.6875rem] text-muted-foreground">
                                  <span className="inline-flex items-center gap-1">
                                    <MapPin aria-hidden="true" className="size-3 text-primary" />
                                    {proj.location}
                                  </span>
                                  <span aria-hidden="true" className="text-border">
                                    |
                                  </span>
                                  <span className="text-primary">{proj.year}</span>
                                </div>
                              </div>
                            </article>
                          </Reveal>
                        </li>
                      );
                    }
                    const cardGallery =
                      entry.id === "supervision"
                        ? pi === 0
                          ? SUPERVISION_CARD_GALLERY
                          : pi === 1
                            ? SUPERVISION_CARD_GALLERY_2
                            : null
                        : null;
                    return (
                      <li key={proj.name}>
                        <Reveal delay={(pi % 3) * 60}>
                          <article className="group flex h-full flex-col border border-border bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/70 hover:shadow-lg hover:shadow-primary/15">
                            {cardGallery && (
                              <div className="mb-4 grid gap-3">
                                <img
                                  src={cardGallery.top}
                                  alt={proj.name}
                                  loading="lazy"
                                  width={600}
                                  height={360}
                                  className="aspect-16/10 w-full border border-border object-cover"
                                />
                                <div className="grid grid-cols-2 gap-3">
                                  {cardGallery.bottom.map((src) => (
                                    <img
                                      key={src}
                                      src={src}
                                      alt=""
                                      aria-hidden="true"
                                      loading="lazy"
                                      width={300}
                                      height={225}
                                      className="aspect-4/3 w-full border border-border object-cover"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                            <span className="eyebrow">{proj.type}</span>
                            <h4 className="mt-2 font-display text-base font-bold leading-snug transition-colors duration-300 group-hover:text-primary">
                              {proj.name}
                            </h4>
                            <p className="mt-3 flex-1 text-xs leading-relaxed text-muted-foreground">
                              {proj.scope}
                            </p>
                            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-3 text-[0.6875rem] text-muted-foreground">
                              <span className="inline-flex items-center gap-1">
                                <MapPin aria-hidden="true" className="size-3 text-primary" />
                                {proj.location}
                              </span>
                              <span aria-hidden="true" className="text-border">
                                |
                              </span>
                              <span className="text-primary">{proj.year}</span>
                            </div>
                          </article>
                        </Reveal>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <Btn to={lp("/contact")} variant="outline" className="mt-10" arrow>
                {p.serviceCta}
              </Btn>
            </div>
          </section>
        );
      })}

      {/* Closing CTA */}
      <section aria-labelledby="portfolio-cta" className="relative overflow-hidden bg-background">
        <img
          src={IMAGES.drawings}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1200}
          height={800}
          className="absolute inset-0 size-full object-cover opacity-20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background"
        />
        <div
          aria-hidden="true"
          className="animate-ambient-pulse pointer-events-none absolute -bottom-20 -start-20 size-96 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="container-site relative py-20 md:py-28">
          <GhostNumber value="08" />
          <Reveal>
            <SectionLabel>{t.contact.label}</SectionLabel>
            <h2
              id="portfolio-cta"
              className="max-w-2xl font-display text-3xl font-extrabold leading-tight md:text-5xl"
            >
              {p.cta.heading}
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
              {p.cta.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn to={lp("/contact")} arrow>
                {p.cta.primary}
              </Btn>
              <Btn href={CONTACT.whatsappHref} variant="outline">
                {p.cta.secondary}
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
