import { Linkedin, Mail, Phone, UserRound } from "lucide-react";
import { useT } from "@/i18n";
import { SiteLayout } from "../SiteLayout";
import { IMAGES } from "../assets";
import { Reveal, SectionLabel } from "../ui";

export function TeamPage() {
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
          <SectionLabel>{t.pages.team.eyebrow}</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-6xl">
            {t.pages.team.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t.pages.team.lead}
          </p>
        </div>
      </section>

      <section aria-labelledby="team-leadership" className="bg-background">
        <div className="container-site py-16 md:py-24">
          <h2
            id="team-leadership"
            className="font-display text-2xl font-extrabold leading-tight md:text-3xl"
          >
            {t.team.leadershipTitle}
          </h2>

          <p className="mt-4 max-w-2xl border-s-2 border-primary/50 bg-card/50 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            {t.team.note}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.team.members.map((m, i) => {
              // Only the CEO has an approved photo today; the rest use a uniform
              // placeholder until Bonyan supplies matching-style images.
              const photo = i === 0 ? IMAGES.managingDirector : null;
              const hasContact = Boolean(m.email || m.phone || m.linkedin);

              return (
                <Reveal key={m.name} delay={(i % 3) * 70}>
                  <article className="flex h-full flex-col overflow-hidden border border-border bg-card">
                    <div className="relative aspect-4/5 w-full overflow-hidden border-b border-border bg-panel">
                      {photo ? (
                        <img
                          src={photo}
                          alt={m.name}
                          loading="lazy"
                          width={900}
                          height={1124}
                          className="size-full object-cover object-top"
                        />
                      ) : (
                        <span className="flex size-full flex-col items-center justify-center gap-3 text-muted-foreground">
                          <UserRound aria-hidden="true" className="size-12 text-primary/40" />
                          <span className="text-[0.625rem] uppercase tracking-widest">
                            {t.team.photoPending}
                          </span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-base font-bold leading-snug">{m.name}</h3>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary">
                        {m.role}
                      </p>

                      <ul className="mt-4 space-y-2 text-sm">
                        <li className="flex items-center gap-2.5">
                          <Mail aria-hidden="true" className="size-4 shrink-0 text-primary" />
                          {m.email ? (
                            <a
                              href={`mailto:${m.email}`}
                              dir="ltr"
                              className="truncate text-start text-foreground"
                            >
                              {m.email}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">{t.team.emailLabel} —</span>
                          )}
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Phone aria-hidden="true" className="size-4 shrink-0 text-primary" />
                          {m.phone ? (
                            <a
                              href={`tel:${m.phone.replace(/\s+/g, "")}`}
                              dir="ltr"
                              className="text-start text-foreground"
                            >
                              {m.phone}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">{t.team.phoneLabel} —</span>
                          )}
                        </li>
                        <li className="flex items-center gap-2.5">
                          <Linkedin aria-hidden="true" className="size-4 shrink-0 text-primary" />
                          {m.linkedin ? (
                            <a
                              href={m.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="text-foreground"
                            >
                              {t.team.linkedinCta}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">{t.team.linkedinLabel} —</span>
                          )}
                        </li>
                      </ul>

                      {!hasContact && (
                        <p className="mt-3 text-[0.6875rem] italic text-muted-foreground">
                          {t.team.contactPending}
                        </p>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="team-composition" className="bg-panel">
        <div className="container-site py-16 md:py-24">
          <SectionLabel>{t.pages.team.eyebrow}</SectionLabel>
          <h2
            id="team-composition"
            className="font-display text-2xl font-extrabold leading-tight md:text-3xl"
          >
            {t.team.compositionTitle}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {t.team.compositionIntro}
          </p>

          <ul className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {t.team.departments.map((d) => (
              <li key={d.label} className="bg-background p-6">
                <p className="font-display text-3xl font-extrabold text-primary">{d.count}</p>
                <p className="mt-2 text-sm leading-snug text-muted-foreground">{d.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
