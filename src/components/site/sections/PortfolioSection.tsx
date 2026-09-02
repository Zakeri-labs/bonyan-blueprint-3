import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT, useT } from "@/i18n";
import { PORTFOLIO_IMAGES } from "../assets";
import { Btn, GhostNumber, H_SCROLL_ITEM, H_SCROLL_STRIP, Reveal, SectionLabel } from "../ui";

/** Asymmetric editorial grid: 3 across the top row, 2 wider items below. */
const SPANS = ["lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-5", "lg:col-span-7"];

export function PortfolioSection() {
  const { t, lp } = useT();

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="relative bg-panel">
      <div className="container-site relative py-20 md:py-28">
        <GhostNumber value="05" />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <SectionLabel>{t.portfolio.label}</SectionLabel>
            <h2
              id="portfolio-heading"
              className="font-display text-3xl font-extrabold leading-tight md:text-4xl"
            >
              {t.portfolio.heading}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.portfolio.body}
            </p>
          </Reveal>
        </div>

        {/* Mobile: horizontal swipe. Desktop: asymmetric grid. */}
        <div className="mt-12">
          <ul className={cn(H_SCROLL_STRIP, "md:grid-cols-2 lg:grid-cols-12")}>
            {t.portfolio.items.map((p, i) => (
              <li key={p.title} className={cn(H_SCROLL_ITEM, SPANS[i] ?? "lg:col-span-4")}>
                <Reveal delay={(i % 3) * 70}>
                  <article className="group relative h-full overflow-hidden border border-border transition-all duration-500 hover:-translate-y-1 hover:border-primary/80 hover:shadow-lg hover:shadow-primary/15">
                    <img
                      src={PORTFOLIO_IMAGES[i]}
                      alt={`${p.title} — ${p.scope}, ${t.portfolio.location}`}
                      loading="lazy"
                      width={1200}
                      height={800}
                      className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent transition-opacity duration-500 group-hover:opacity-90"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-300 group-hover:-translate-y-1">
                      <span className="eyebrow">{p.tag}</span>
                      <h3 className="mt-2 font-display text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-primary">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs text-primary">{p.scope}</p>
                      <a
                        href={CONTACT.mapHref}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 flex w-fit items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                      >
                        <MapPin
                          aria-hidden="true"
                          className="size-3.5 text-primary transition-transform duration-300 group-hover:scale-125"
                        />
                        {t.portfolio.location}
                      </a>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <Btn to={lp("/services")} arrow>
            {t.portfolio.cta}
          </Btn>
        </div>
      </div>
    </section>
  );
}
