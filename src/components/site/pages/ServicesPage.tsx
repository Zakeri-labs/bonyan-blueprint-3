import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";
import { SiteLayout } from "../SiteLayout";
import { IMAGES, SERVICE_IMAGES } from "../assets";
import { Btn, Reveal, SectionLabel } from "../ui";
import {
  SERVICE_ICONS,
  ServiceCarousel,
  serviceOrderNumber,
  sortByServiceOrder,
  splitServiceIndices,
} from "../sections/ServicesSection";

export function ServicesPage() {
  const { t, lp } = useT();

  const { core, rest } = splitServiceIndices(t.services.items);
  const coreOrdered = sortByServiceOrder(t.services.items, core);
  const restOrdered = sortByServiceOrder(t.services.items, rest);
  const allOrdered = [...coreOrdered, ...restOrdered];

  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <img
          src={IMAGES.drawings}
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
          <SectionLabel>{t.pages.services.eyebrow}</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-6xl">
            {t.pages.services.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t.pages.services.lead}
          </p>
        </div>
      </section>

      <section aria-labelledby="all-services" className="bg-panel">
        <div className="container-site py-20 md:py-24">
          <h2 id="all-services" className="sr-only">
            {t.services.label}
          </h2>

          <div className="md:rounded-xl md:border md:border-primary/25 md:bg-background/40 md:p-8">
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-primary" />
              <span className="animate-text-glow">{t.services.coreLabel}</span>
            </p>
            <div className="mt-6">
              <ServiceCarousel indices={coreOrdered} gridClass="md:grid-cols-3" compact numbered />
            </div>
          </div>

          <div className="mt-14 flex items-center gap-4">
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
            <span className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {t.services.moreLabel}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
          </div>

          <div className="mt-8">
            <ServiceCarousel indices={restOrdered} gridClass="md:grid-cols-2" compact numbered />
          </div>
        </div>
      </section>

      <section aria-labelledby="service-details" className="bg-background">
        <div className="container-site py-20 md:py-24">
          <h2 id="service-details" className="sr-only">
            {t.pages.services.title}
          </h2>
          <div className="grid gap-14">
            {allOrdered.map((i, order) => {
              const s = t.services.items[i]!;
              const Icon = SERVICE_ICONS[i]!;
              return (
                <Reveal key={s.id}>
                  <article
                    id={s.id}
                    className="grid scroll-mt-24 items-center gap-8 border-t border-border pt-10 lg:grid-cols-2 lg:gap-14"
                  >
                    <div className={cn("relative", order % 2 === 1 && "lg:order-2")}>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-4 end-0 select-none font-display text-[3.5rem] font-extrabold leading-none text-foreground/[0.07] md:-top-6 md:text-[5rem]"
                      >
                        {String(serviceOrderNumber(s.id)).padStart(2, "0")}
                      </span>
                      <Icon aria-hidden="true" className="size-8 text-primary" />
                      <h3 className="mt-5 font-display text-2xl font-extrabold leading-tight">
                        {s.title}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {s.detail}
                      </p>
                      <p className="mt-6 text-[0.6875rem] font-bold uppercase tracking-widest text-foreground">
                        {t.pages.services.relevant}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {s.types.map((ty) => (
                          <li
                            key={ty}
                            className="border border-border px-3 py-1.5 text-xs text-muted-foreground"
                          >
                            {ty}
                          </li>
                        ))}
                      </ul>
                      <Btn
                        to={lp("/portfolio")}
                        hash={s.id}
                        variant="outline"
                        className="mt-8 border-primary hover:border-primary"
                      >
                        {t.pages.services.viewProjects}
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                        />
                      </Btn>
                    </div>
                    <img
                      src={SERVICE_IMAGES[i]}
                      alt={s.title}
                      loading="lazy"
                      width={1200}
                      height={800}
                      className="aspect-16/10 w-full border border-border object-cover"
                    />
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Btn to={lp("/contact")} className="mt-14" arrow>
            {t.pages.services.cta}
          </Btn>
        </div>
      </section>
    </SiteLayout>
  );
}
