import { Mail } from "lucide-react";
import { CONTACT, useT } from "@/i18n";
import { SiteLayout } from "../SiteLayout";
import { IMAGES } from "../assets";
import { Btn, Reveal, SectionLabel } from "../ui";

/** Destination for discipline-card job applications (per client spec). */
const APPLICATION_EMAIL = "info@bonyamec.com";

/** Builds a prefilled mailto link for applying to a specific discipline. */
function disciplineMailto(position: string): string {
  const subject = `Application for ${position}`;
  const body = `Hello Bonyan Team,\n\nI am interested in applying for the ${position} position. Please find my CV attached.\n\nThank you.`;
  return `mailto:${APPLICATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function CareerPage() {
  const { t } = useT();

  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <img
          src={IMAGES.about}
          alt=""
          aria-hidden="true"
          width={1200}
          height={800}
          className="absolute inset-0 size-full object-cover opacity-20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-background/80 via-background/90 to-background"
        />
        <div className="container-site relative pb-16 md:pb-24">
          <SectionLabel>{t.pages.career.eyebrow}</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-6xl">
            {t.pages.career.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t.pages.career.lead}
          </p>
        </div>
      </section>

      <section aria-labelledby="career-openings" className="bg-background">
        <div className="container-site grid gap-12 py-16 lg:grid-cols-2 lg:gap-16 md:py-20">
          <Reveal>
            <h2
              id="career-openings"
              className="font-display text-2xl font-extrabold leading-tight md:text-3xl"
            >
              {t.career.openingsTitle}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.career.intro}
            </p>
            <div className="mt-8 border border-dashed border-border bg-card p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">{t.career.noOpenings}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">
              {t.career.disciplinesTitle}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.career.disciplines.map((d) => (
                <li key={d}>
                  <a
                    href={disciplineMailto(d)}
                    className="flex h-full cursor-pointer items-start gap-3 border border-border bg-card p-4 text-sm transition-colors hover:border-primary hover:bg-primary/5"
                  >
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-primary" />
                    <span>{d}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="career-apply" className="bg-panel">
        <div className="container-site py-16 md:py-20">
          <h2
            id="career-apply"
            className="max-w-2xl font-display text-2xl font-extrabold leading-tight md:text-3xl"
          >
            {t.career.applyTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {t.career.applyBody}
          </p>

          <div className="mt-8 flex flex-col items-start gap-5 border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-start gap-4">
              <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              <span className="min-w-0">
                <span className="block text-[0.625rem] uppercase tracking-widest text-primary">
                  {t.career.applyEmailLabel}
                </span>
                <a
                  href={`mailto:${CONTACT.applyEmail}`}
                  dir="ltr"
                  className="mt-1 block break-words text-start text-sm font-medium text-link underline transition-colors hover:text-link/80"
                >
                  {CONTACT.applyEmail}
                </a>
              </span>
            </span>
            <Btn href={`mailto:${CONTACT.applyEmail}`} arrow className="shrink-0">
              {t.career.applyCta}
            </Btn>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
