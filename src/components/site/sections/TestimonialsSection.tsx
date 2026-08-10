import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";
import { GhostNumber, SectionLabel } from "../ui";

const SLOTS = [0, 1, 2, 3, 4, 5];
const PER_VIEW = 3;

export function TestimonialsSection() {
  const { t } = useT();
  const [page, setPage] = useState(0);
  const pages = Math.ceil(SLOTS.length / PER_VIEW);
  const visible = SLOTS.slice(page * PER_VIEW, page * PER_VIEW + PER_VIEW);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative bg-ivory text-ink"
    >
      <div className="container-site relative py-20 md:py-28">
        <GhostNumber value="07" light />
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <SectionLabel light>{t.testimonials.label}</SectionLabel>
            <h2
              id="testimonials-heading"
              className="font-display text-3xl font-extrabold leading-tight text-ink md:text-4xl"
            >
              {t.testimonials.heading1}
              <br />
              <span className="text-primary">{t.testimonials.heading2}</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">{t.testimonials.body}</p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPage((p) => (p - 1 + pages) % pages)}
                aria-label={t.testimonials.prev}
                className="flex size-11 items-center justify-center rounded-xs border border-ivory-border text-ink transition-colors hover:border-primary hover:text-primary"
              >
                <ChevronLeft aria-hidden="true" className="size-5 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => (p + 1) % pages)}
                aria-label={t.testimonials.next}
                className="flex size-11 items-center justify-center rounded-xs border border-ivory-border text-ink transition-colors hover:border-primary hover:text-primary"
              >
                <ChevronRight aria-hidden="true" className="size-5 rtl:rotate-180" />
              </button>
            </div>
          </div>

          <div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((slot) => (
                <li
                  key={slot}
                  className="group flex h-full flex-col border border-ivory-border bg-background/3 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:bg-background/8 hover:shadow-xl"
                >
                  <Quote aria-hidden="true" className="animate-float-gentle size-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted transition-colors duration-300 group-hover:text-ink">
                    {t.testimonials.quote}
                  </p>
                  <div
                    className="mt-5 flex items-center gap-1"
                    role="img"
                    aria-label={t.testimonials.ratingNote}
                  >
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star aria-hidden="true" key={s} className="size-4 fill-primary/80 text-primary transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: `${s * 40}ms` }} />
                    ))}
                  </div>
                  <p className="mt-1 text-[0.625rem] uppercase tracking-widest text-ink-muted">
                    {t.testimonials.ratingNote}
                  </p>
                  <div className="mt-5 border-t border-ivory-border pt-4">
                    <p className="font-display text-sm font-bold text-ink transition-colors duration-300 group-hover:text-primary">
                      {t.testimonials.name}
                    </p>
                    <p className="text-xs text-ink-muted">{t.testimonials.type}</p>
                    <p className="mt-2 text-[0.625rem] uppercase tracking-widest text-primary font-semibold">
                      {t.testimonials.replace}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  aria-label={`${t.testimonials.goTo} ${i + 1}`}
                  aria-current={page === i ? "true" : undefined}
                  className={cn(
                    "h-1.5 w-8 rounded-xs transition-colors",
                    page === i ? "bg-primary" : "bg-ivory-border",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
