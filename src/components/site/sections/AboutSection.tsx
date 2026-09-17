import { useState } from "react";
import { Check } from "lucide-react";
import { CONTACT, useT } from "@/i18n";
import { HOME_PROJECT_IMAGES } from "../assets";
import { Btn, Reveal, SectionLabel } from "../ui";

export function AboutSection() {
  const { t, lp } = useT();
  const [showLocation, setShowLocation] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const locationVisible = showLocation || isHovered || hasFocus;

  return (
    <section id="about" aria-labelledby="about-heading" className="relative bg-background">
      <div className="container-site relative py-20 md:py-28">
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
              <div
                className="relative overflow-hidden border border-border"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setHasFocus(true)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setHasFocus(false);
                    setShowLocation(false);
                  }
                }}
              >
                <button
                  type="button"
                  aria-label={`${t.about.homeImageAlt} — ${t.contact.viewMap}`}
                  aria-expanded={locationVisible}
                  aria-controls="about-office-location"
                  onClick={() => setShowLocation((visible) => !visible)}
                  className="relative block w-full cursor-pointer focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-primary"
                >
                  <img
                    src={HOME_PROJECT_IMAGES.about}
                    alt={t.about.homeImageAlt}
                    loading="lazy"
                    width={1198}
                    height={1313}
                    className={`h-auto w-full transition-transform duration-700 ease-out motion-reduce:transition-none ${locationVisible ? "scale-105" : "scale-100"}`}
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.3)_100%)]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"
                  />
                </button>
                <div
                  id="about-office-location"
                  aria-hidden={!locationVisible}
                  className={`pointer-events-none absolute inset-x-4 flex -translate-y-1/2 items-center justify-center transition-[top,opacity] duration-700 ease-out motion-reduce:transition-none md:inset-x-6 ${locationVisible ? "top-[72.5%] opacity-100" : "top-[110%] opacity-0"}`}
                >
                  <a
                    href={CONTACT.mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={locationVisible ? 0 : -1}
                    className={`flex min-h-12 items-center justify-center gap-2 rounded-md bg-background px-[26px] py-3 text-center text-base font-semibold text-primary shadow-lg transition-colors hover:bg-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${locationVisible ? "pointer-events-auto" : "pointer-events-none"}`}
                  >
                    <span>{t.contact.viewMap}</span>
                  </a>
                </div>
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
