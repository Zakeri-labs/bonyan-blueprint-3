import { ArrowRight, Box, Calculator, ClipboardCheck, HardHat, Map, PencilRuler } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";
import { SERVICE_IMAGES } from "../assets";
import { Btn, GhostNumber, Reveal, SectionLabel } from "../ui";
import { L } from "../L";

export const SERVICE_ICONS = [HardHat, PencilRuler, ClipboardCheck, Calculator, Map, Box];
/** Visually prioritized services: supervision, drawings, quantity surveying. */
const PRIORITY = new Set(["supervision", "drawings", "quantity"]);

export function ServiceCard({ index, compact = false }: { index: number; compact?: boolean }) {
  const { t, lp } = useT();
  const s = t.services.items[index]!;
  const Icon = SERVICE_ICONS[index] ?? HardHat;
  const priority = PRIORITY.has(s.id);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10",
        priority ? "border-primary/40 hover:border-primary" : "border-border hover:border-primary/70",
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
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />
        </div>
      )}
      <div className="relative flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="flex size-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:border-primary group-hover:bg-primary/20">
            <Icon aria-hidden="true" className="size-6 text-primary transition-transform duration-500 group-hover:scale-110" />
          </span>
          {priority && (
            <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wider text-primary">
              {t.hero.capabilities[0]}
            </span>
          )}
        </div>
        <h3 className="mt-5 font-display text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-primary">{s.title}</h3>
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 80}>
              <ServiceCard index={i} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <Btn to={lp("/contact")} arrow>
            {t.services.cta}
          </Btn>
        </div>
      </div>
    </section>
  );
}
