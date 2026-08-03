import { Check } from "lucide-react";
import { useT } from "@/i18n";
import { IMAGES } from "../assets";
import { Btn, GhostNumber, Reveal, SectionLabel } from "../ui";

export function AboutSection() {
  const { t, lp } = useT();

  return (
    <section id="about" aria-labelledby="about-heading" className="relative bg-background">
      <div className="container-site relative py-20 md:py-28">
        <GhostNumber value="04" />
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionLabel>{t.about.label}</SectionLabel>
            <h2
              id="about-heading"
              className="font-display text-3xl font-extrabold leading-tight md:text-4xl"
            >
              {t.about.heading1}
              <br />
              <span className="text-primary">{t.about.heading2}</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.about.body}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.about.body2}
            </p>

            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {t.about.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {t.about.values.slice(0, 4).map((v) => (
                <div key={v.title} className="border-s-2 border-primary/50 ps-4">
                  <dt className="font-display text-sm font-bold">{v.title}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">{v.desc}</dd>
                </div>
              ))}
            </dl>

            <Btn to={lp("/about")} className="mt-10" arrow>
              {t.about.cta}
            </Btn>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative">
              <div className="overflow-hidden border border-border">
                <img
                  src={IMAGES.about}
                  alt={t.about.imageAlt}
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="aspect-4/3 w-full object-cover"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -end-4 -z-10 hidden size-40 border border-primary/40 md:block"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
