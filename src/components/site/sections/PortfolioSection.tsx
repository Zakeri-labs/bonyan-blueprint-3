import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";
import { PORTFOLIO_IMAGES } from "../assets";
import { Btn, GhostNumber, Reveal, SectionLabel } from "../ui";

/** Asymmetric editorial grid: 3 across the top row, 2 wider items below. */
const SPANS = [
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-5",
  "lg:col-span-7",
];

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
        <ul className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 no-scrollbar md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-12">
          {t.portfolio.items.map((p, i) => (
            <li
              key={p.title}
              className={cn(
                "w-[85%] shrink-0 snap-start md:w-auto md:shrink",
                SPANS[i] ?? "lg:col-span-4",
              )}
            >
              <Reveal delay={(i % 3) * 70}>
                <article className="group relative h-full overflow-hidden border border-border">
                  <img
                    src={PORTFOLIO_IMAGES[i]}
                    alt={`${p.title} — ${p.scope}, ${t.portfolio.location}`}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="eyebrow">{p.tag}</span>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug">{p.title}</h3>
                    <p className="mt-1 text-xs text-primary">{p.scope}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin aria-hidden="true" className="size-3.5" />
                      {t.portfolio.location}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Btn to={lp("/services")} arrow>
            {t.portfolio.cta}
          </Btn>
        </div>
      </div>
    </section>
  );
}
