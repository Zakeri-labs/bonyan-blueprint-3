import {
  Award,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  Layers,
  MapPin,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { useT } from "@/i18n";
import { IMAGES } from "../assets";
import { Btn, Reveal } from "../ui";

const signalIcons = [CalendarCheck, MapPin, Layers, ClipboardCheck, Building2, ShieldCheck, Award];

export function TrustSection() {
  const { t, lp } = useT();

  return (
    <section
      aria-labelledby="trust-heading"
      className="relative overflow-hidden border-y border-primary/10 bg-background"
    >
      <div aria-hidden="true" className="trust-dots absolute inset-y-0 end-0 w-2/5" />

      <div className="container-site relative py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <Reveal className="lg:col-span-5">
            <h2
              id="trust-heading"
              className="max-w-2xl font-display text-4xl font-extrabold leading-[1.12] md:text-5xl xl:text-[3.4rem]"
            >
              {t.trust.heading1}
              <br />
              <span className="text-primary">{t.trust.heading2}</span>
            </h2>
            <span aria-hidden="true" className="mt-8 block h-1 w-20 rounded-full bg-primary" />
          </Reveal>

          <Reveal delay={80} className="lg:col-span-4">
            <p className="text-base leading-relaxed text-muted-foreground">{t.trust.body}</p>

            <div className="mt-8 flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                <UsersRound aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold">{t.trust.teamTitle}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {t.trust.teamBody}
                </p>
              </div>
            </div>

            <Btn to={lp("/team")} className="mt-8 min-w-48" arrow>
              {t.trust.cta}
            </Btn>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-3">
            <article className="animate-frame-glow mx-auto w-full max-w-[17rem] overflow-hidden rounded-xl border border-primary/70 bg-panel shadow-xl shadow-background/30 transition-transform duration-500 hover:scale-[1.02] lg:ms-auto lg:me-0">
              <img
                src={IMAGES.managingDirector}
                alt={t.trust.directorImageAlt}
                loading="lazy"
                width={900}
                height={1124}
                className="aspect-4/5 w-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              <div className="border-t border-primary/30 bg-card/60 px-5 py-4 text-center backdrop-blur-xs">
                <h3 className="font-display text-sm font-bold md:text-base">
                  {t.trust.directorName}
                </h3>
                <p className="mt-1 text-xs font-medium text-primary md:text-sm">
                  {t.trust.directorRole}
                </p>
              </div>
            </article>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3 lg:grid-cols-6">
          {t.trust.signals.map((s, i) => {
            const Icon = signalIcons[i] ?? ShieldCheck;
            return (
              <li
                key={s}
                className="group min-h-36 bg-background/95 p-5 transition-colors duration-300 hover:bg-card md:p-6"
              >
                <Icon
                  aria-hidden="true"
                  className="size-6 text-primary transition-transform duration-300 group-hover:scale-115 group-hover:rotate-3"
                />
                <p className="mt-4 text-sm font-medium leading-snug transition-colors duration-300 group-hover:text-foreground">
                  {s}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
