import { CONTACT, useT } from "@/i18n";
import { HOME_PROJECT_IMAGES } from "../assets";
import { Btn, Reveal, SectionLabel } from "../ui";
import { ContactCards } from "../ContactCards";
import { InquiryForm } from "../InquiryForm";

export function FinalCtaSection() {
  const { t, lp } = useT();

  return (
    <section id="contact" aria-labelledby="final-cta-heading" className="relative overflow-hidden">
      <img
        src={HOME_PROJECT_IMAGES.cta}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1200}
        height={800}
        className="absolute inset-0 size-full object-cover opacity-40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-background/85 via-background/75 to-background/85"
      />
      <div
        aria-hidden="true"
        className="animate-ambient-pulse pointer-events-none absolute -bottom-20 -start-20 size-96 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container-site relative py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionLabel>{t.contact.label}</SectionLabel>
            <h2
              id="final-cta-heading"
              className="font-display text-3xl font-extrabold leading-tight md:text-5xl"
            >
              {t.cta.heading1}
              <br />
              <span className="text-primary">{t.cta.heading2}</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.cta.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn to={lp("/contact")} arrow>
                {t.cta.primary}
              </Btn>
              <Btn href={CONTACT.whatsappHref} variant="outline">
                {t.cta.secondary}
              </Btn>
            </div>
            <div className="mt-10">
              <ContactCards />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <InquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
