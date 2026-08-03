import {
  Award,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  Coins,
  Compass,
  Layers,
  MapPin,
  Ruler,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { useT } from "@/i18n";
import { Btn, Reveal } from "../ui";

const stripIcons = [Compass, Ruler, Coins, Timer];
const signalIcons = [CalendarCheck, MapPin, Layers, ClipboardCheck, Building2, ShieldCheck, Award];

export function TrustSection() {
  const { t, lp } = useT();

  return (
    <section aria-labelledby="trust-heading" className="relative bg-background">
      {/* slim proof strip */}
      <div className="border-y border-primary/20 bg-panel">
        <ul className="container-site grid grid-cols-2 gap-x-6 gap-y-4 py-5 md:grid-cols-4">
          {t.strip.map((s, i) => {
            const Icon = stripIcons[i] ?? Compass;
            return (
              <li key={s} className="flex items-center gap-3">
                <Icon aria-hidden="true" className="size-5 shrink-0 text-primary" />
                <span className="text-xs font-semibold tracking-wide md:text-sm">{s}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="container-site py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal>
            <h2
              id="trust-heading"
              className="font-display text-3xl font-extrabold leading-tight md:text-5xl"
            >
              {t.trust.heading1}
              <br />
              <span className="text-primary">{t.trust.heading2}</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-base leading-relaxed text-muted-foreground">{t.trust.body}</p>
            <Btn to={lp("/about")} className="mt-6" arrow>
              {t.trust.cta}
            </Btn>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border md:grid-cols-3 lg:grid-cols-6">
          {t.trust.signals.map((s, i) => {
            const Icon = signalIcons[i] ?? ShieldCheck;
            return (
              <li key={s} className="bg-background p-6">
                <Icon aria-hidden="true" className="size-6 text-primary" />
                <p className="mt-4 text-sm font-medium leading-snug">{s}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
