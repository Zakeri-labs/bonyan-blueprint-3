import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Calculator,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  DraftingCompass,
  HardHat,
  Map,
  Network,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";
import { SERVICE_IMAGES } from "../assets";
import { Btn, GhostNumber, H_SCROLL_ITEM, H_SCROLL_STRIP, Reveal, SectionLabel } from "../ui";
import { L } from "../L";

/** Same order as `services.items` in `en.ts`. */
export const SERVICE_ICONS = [
  DraftingCompass, // design
  Wrench, // mep
  ClipboardCheck, // supervision
  HardHat, // construction
  Network, // management
  Calculator, // quantity
  Map, // planning
];
/** Visually prioritized services (task 5 pillars): design, supervision, construction. */
export const CORE_SERVICE_IDS = new Set(["design", "supervision", "construction"]);

/** Split the service list into core vs. the rest, preserving original indices. */
export function splitServiceIndices(items: ReadonlyArray<{ id: string }>) {
  const core: number[] = [];
  const rest: number[] = [];
  items.forEach((s, i) => (CORE_SERVICE_IDS.has(s.id) ? core : rest).push(i));
  return { core, rest };
}

export function ServiceCard({ index, compact = false }: { index: number; compact?: boolean }) {
  const { t, lp } = useT();
  const s = t.services.items[index]!;
  const Icon = SERVICE_ICONS[index] ?? HardHat;
  const priority = CORE_SERVICE_IDS.has(s.id);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20",
        priority
          ? "border-primary/40 hover:border-primary"
          : "border-border hover:border-primary/70",
      )}
    >
      {/* Ambient background hover glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-full bg-linear-to-tr from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      {!compact && (
        <div className="relative aspect-16/9 overflow-hidden">
          <img
            src={SERVICE_IMAGES[index]}
            alt={s.title}
            loading="lazy"
            width={1200}
            height={675}
            className="size-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent"
          />
        </div>
      )}
      <div className="relative flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="flex size-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-primary group-hover:bg-primary/20">
            <Icon
              aria-hidden="true"
              className="size-6 text-primary transition-transform duration-500 group-hover:scale-110"
            />
          </span>
          {priority && (
            <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-primary">
              {t.services.priorityBadge}
            </span>
          )}
        </div>
        <h3 className="mt-5 font-display text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-primary">
          {s.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
        <L
          to={lp("/services")}
          hash={s.id}
          className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary"
        >
          {t.services.more}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1.5 rtl:rotate-180 rtl:group-hover:-translate-x-1.5"
          />
        </L>
      </div>
    </article>
  );
}

/**
 * Renders a set of service cards.
 * - `< md`: a snap, auto-scrolling horizontal strip with prev/next controls at the top-right.
 * - `>= md`: a static grid (`gridClass` controls the column count).
 */
export function ServiceCarousel({
  indices,
  gridClass,
  compact = false,
}: {
  indices: number[];
  gridClass: string;
  compact?: boolean;
}) {
  const { t, dir } = useT();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const animRef = useRef<number>(0);

  // Self-driven easing — reliable regardless of `scroll-behavior` support.
  const animateScroll = (el: HTMLElement, target: number, ms = 380) => {
    cancelAnimationFrame(animRef.current);
    const start = el.scrollLeft;
    const dist = target - start;
    if (Math.abs(dist) < 1) return;
    const noAnim =
      document.visibilityState === "hidden" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noAnim) {
      el.scrollLeft = target;
      return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      el.scrollLeft = start + dist * (1 - Math.pow(1 - p, 3));
      if (p < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  };

  const step = (backward: boolean) => {
    const el = scrollerRef.current;
    if (!el) return;
    const rtl = dir === "rtl";
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? el.clientWidth * 0.85) + 16; // card + gap-4
    const maxAbs = el.scrollWidth - el.clientWidth;
    const cur = el.scrollLeft;
    const nearEnd = Math.abs(cur) >= maxAbs - 8;
    const nearStart = Math.abs(cur) <= 8;

    let target: number;
    if (!backward && nearEnd) target = 0;
    else if (backward && nearStart) target = rtl ? -maxAbs : maxAbs;
    else target = cur + (backward ? -1 : 1) * amount * (rtl ? -1 : 1);

    const lo = rtl ? -maxAbs : 0;
    const hi = rtl ? 0 : maxAbs;
    animateScroll(el, Math.max(lo, Math.min(hi, target)));
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = undefined;
    };
    const start = () => {
      stop();
      if (!isMobile.matches || reduce.matches) return;
      timer = window.setInterval(() => {
        if (!pausedRef.current) step(false);
      }, 4000);
    };

    start();
    isMobile.addEventListener("change", start);
    return () => {
      stop();
      cancelAnimationFrame(animRef.current);
      isMobile.removeEventListener("change", start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dir]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2 md:hidden">
        <button
          type="button"
          onClick={() => {
            pause();
            step(true);
          }}
          aria-label={t.services.prev}
          className="flex size-10 items-center justify-center rounded-xs border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronLeft aria-hidden="true" className="size-5 rtl:rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => {
            pause();
            step(false);
          }}
          aria-label={t.services.next}
          className="flex size-10 items-center justify-center rounded-xs border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronRight aria-hidden="true" className="size-5 rtl:rotate-180" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        onPointerDown={pause}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        className={cn(H_SCROLL_STRIP, gridClass)}
      >
        {indices.map((i) => (
          <div key={t.services.items[i]!.id} data-card className={H_SCROLL_ITEM}>
            <ServiceCard index={i} compact={compact} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServicesSection() {
  const { t, lp } = useT();

  return (
    <section id="services" aria-labelledby="services-heading" className="relative bg-panel">
      <div className="container-site relative py-20 md:py-28">
        <GhostNumber value="03" />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <SectionLabel>{t.services.label}</SectionLabel>
            <h2
              id="services-heading"
              className="font-display text-3xl font-extrabold leading-tight md:text-4xl"
            >
              {t.services.heading}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.services.body}
            </p>
          </Reveal>
        </div>

        {(() => {
          const { core, rest } = splitServiceIndices(t.services.items);
          return (
            <>
              {/* Core services — framed and set apart (frame is desktop-only) */}
              <div className="mt-12 md:rounded-xl md:border md:border-primary/25 md:bg-background/40 md:p-8">
                <p className="eyebrow flex items-center gap-3">
                  <span aria-hidden="true" className="inline-block h-px w-8 bg-primary" />
                  <span className="animate-text-glow">{t.services.coreLabel}</span>
                </p>
                <div className="mt-6">
                  <ServiceCarousel indices={core} gridClass="md:grid-cols-3" />
                </div>
              </div>

              {/* Divider between core and the rest */}
              <div className="mt-14 flex items-center gap-4">
                <span aria-hidden="true" className="h-px flex-1 bg-border" />
                <span className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {t.services.moreLabel}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-border" />
              </div>

              {/* The remaining services — 2 x 2 grid on desktop */}
              <div className="mt-8">
                <ServiceCarousel indices={rest} gridClass="md:grid-cols-2" />
              </div>
            </>
          );
        })()}

        <div className="mt-12">
          <Btn to={lp("/contact")} arrow>
            {t.services.cta}
          </Btn>
        </div>
      </div>
    </section>
  );
}
