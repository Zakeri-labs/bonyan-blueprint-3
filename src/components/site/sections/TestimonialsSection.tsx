import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, MapPin, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";
import { CLIENT_AVATARS } from "../assets";
import { GhostNumber, SectionLabel } from "../ui";

const PER_VIEW = 3;

export function TestimonialsSection() {
  const { t } = useT();
  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const items = t.testimonials.items ?? [];
  const pages = Math.ceil(items.length / PER_VIEW) || 1;
  const visibleItems = items.slice(page * PER_VIEW, page * PER_VIEW + PER_VIEW);

  // Auto-play / continuous slide interval
  useEffect(() => {
    if (isPaused || pages <= 1) return;
    const timer = setInterval(() => {
      setPage((prev) => (prev + 1) % pages);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, pages]);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative bg-ivory text-ink"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
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
                className="flex size-11 items-center justify-center rounded-xs border border-ivory-border text-ink transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                <ChevronLeft aria-hidden="true" className="size-5 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => (p + 1) % pages)}
                aria-label={t.testimonials.next}
                className="flex size-11 items-center justify-center rounded-xs border border-ivory-border text-ink transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                <ChevronRight aria-hidden="true" className="size-5 rtl:rotate-180" />
              </button>
            </div>
          </div>

          <div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleItems.map((item, idx) => {
                const avatar =
                  CLIENT_AVATARS[item.avatarIndex % CLIENT_AVATARS.length] ?? CLIENT_AVATARS[0];
                return (
                  <li
                    key={item.name + idx}
                    className="group relative flex h-full flex-col overflow-hidden border border-ivory-border bg-background/5 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/60 hover:bg-background/20 hover:shadow-2xl"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Quote
                        aria-hidden="true"
                        className="animate-float-gentle size-7 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110"
                      />
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-primary">
                        <CheckCircle2 aria-hidden="true" className="size-3 text-primary" />
                        {t.testimonials.verifiedBadge ?? "Verified"}
                      </span>
                    </div>

                    <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/90 transition-colors duration-300 group-hover:text-ink">
                      "{item.quote}"
                    </p>

                    <div className="mt-5 flex items-center gap-1" role="img" aria-label="5 stars">
                      {Array.from({ length: item.rating || 5 }).map((_, s) => (
                        <Star
                          key={s}
                          aria-hidden="true"
                          className="size-4 fill-primary text-primary transition-transform duration-300 group-hover:scale-110"
                          style={{ transitionDelay: `${s * 40}ms` }}
                        />
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-3.5 border-t border-ivory-border pt-4">
                      <img
                        src={avatar}
                        alt={item.name}
                        loading="lazy"
                        width={48}
                        height={48}
                        className="size-11 shrink-0 rounded-full border-2 border-primary/40 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:border-primary"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-sm font-bold text-ink transition-colors duration-300 group-hover:text-primary">
                          {item.name}
                        </p>
                        <p className="truncate text-xs font-medium text-ink-muted">{item.role}</p>
                        <p className="mt-1 flex items-center gap-1 text-[0.625rem] text-primary">
                          <MapPin aria-hidden="true" className="size-3 shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
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
                    "h-1.5 rounded-xs transition-all duration-500",
                    page === i ? "w-10 bg-primary" : "w-6 bg-ivory-border hover:bg-primary/50",
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
