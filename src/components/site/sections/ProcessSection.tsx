import { useT } from "@/i18n";
import { Btn, Reveal, SectionLabel } from "../ui";

export function ProcessSection() {
  const { t, lp } = useT();

  return (
    <section id="process" aria-labelledby="process-heading" className="relative bg-background">
      <div className="container-site relative py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <SectionLabel>{t.process.label}</SectionLabel>
            <h2
              id="process-heading"
              className="font-display text-3xl font-extrabold leading-tight md:text-4xl"
            >
              {t.process.heading}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.process.body}
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 80}>
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-4xl font-extrabold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden h-px flex-1 bg-linear-to-r from-primary/50 to-transparent rtl:bg-linear-to-l lg:block"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-base font-bold leading-snug">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <Btn to={lp("/contact")} arrow>
            {t.process.cta}
          </Btn>
        </div>
      </div>
    </section>
  );
}
