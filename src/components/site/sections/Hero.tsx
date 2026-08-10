import { useT } from "@/i18n";
import { IMAGES } from "../assets";
import { Btn } from "../ui";

export function Hero() {
  const { t, lp } = useT();

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden">
      <img
        src={IMAGES.hero}
        alt={t.hero.imageAlt}
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-background/75 via-background/35 to-background"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-background/90 via-background/25 to-transparent rtl:bg-linear-to-l"
      />

      {/* Ambient background light orbs */}
      <div
        aria-hidden="true"
        className="animate-ambient-pulse pointer-events-none absolute -top-32 end-10 size-96 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-ambient-pulse pointer-events-none absolute bottom-10 start-10 size-80 rounded-full bg-primary/10 blur-3xl"
        style={{ animationDelay: "3.5s" }}
      />

      <div className="container-site relative flex min-h-[92vh] flex-col justify-end pb-16 pt-32 md:justify-center md:pb-28 md:pt-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="max-w-3xl lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/50 px-3.5 py-1 backdrop-blur-xs">
              <span className="relative flex size-2 shrink-0">
                <span className="status-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <p className="eyebrow">{t.hero.eyebrow}</p>
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">{t.hero.title1}</span>
              <span className="mt-2 block text-primary">{t.hero.title2}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.hero.subtitle}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Btn to={lp("/contact")} arrow className="shimmer-button border-0 shadow-lg shadow-primary/20">
                {t.hero.primary}
              </Btn>
              <Btn to={lp("/")} hash="portfolio" variant="outline" className="transition-all duration-300 hover:border-primary/80 hover:bg-primary/5">
                {t.hero.secondary}
              </Btn>
            </div>

            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              {t.hero.capabilities.map((c) => (
                <li key={c} className="group flex items-center gap-2 transition-colors hover:text-foreground">
                  <span aria-hidden="true" className="size-1.5 bg-primary transition-transform duration-300 group-hover:scale-150 group-hover:shadow-[0_0_8px_var(--primary)]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Floating architectural badge accent for desktop */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="animate-float-slow relative ms-auto max-w-xs overflow-hidden rounded-xl border border-primary/40 bg-card/60 p-6 shadow-2xl backdrop-blur-md">
              <div aria-hidden="true" className="absolute -end-10 -top-10 size-32 rounded-full bg-primary/20 blur-2xl" />
              <div className="flex items-start gap-4">
                <div className="flex h-12 min-w-[3.75rem] shrink-0 items-center justify-center rounded-lg border border-primary/50 bg-primary/10 px-2.5 text-primary">
                  <span className="font-display text-lg font-extrabold tracking-tight">100%</span>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-foreground">
                    {t.trust.heading2}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {t.trust.signals[5]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
