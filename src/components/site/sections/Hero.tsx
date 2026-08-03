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


      <div className="container-site relative flex min-h-[92vh] flex-col justify-end pb-16 pt-32 md:justify-center md:pb-28 md:pt-40">
        <div className="max-w-3xl">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">{t.hero.title1}</span>
            <span className="mt-2 block text-primary">{t.hero.title2}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Btn to={lp("/contact")} arrow>
              {t.hero.primary}
            </Btn>
            <Btn to={lp("/")} hash="portfolio" variant="outline">
              {t.hero.secondary}
            </Btn>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            {t.hero.capabilities.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 bg-primary" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
