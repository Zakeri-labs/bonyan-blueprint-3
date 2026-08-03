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
        "group flex h-full flex-col overflow-hidden border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/70",
        priority ? "border-primary/40" : "border-border",
      )}
    >
      {!compact && (
        <div className="relative aspect-16/9 overflow-hidden">
          <img
            src={SERVICE_IMAGES[index]}
            alt={s.title}
            loading="lazy"
            width={1200}
            height={675}
            className="size-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-card to-card/10" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <Icon aria-hidden="true" className="size-7 text-primary" />
        <h3 className="mt-5 font-display text-lg font-bold leading-snug">{s.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
        <L
          to={lp("/services")}
          hash={s.id}
          className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary"
        >
          {t.services.more}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
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
