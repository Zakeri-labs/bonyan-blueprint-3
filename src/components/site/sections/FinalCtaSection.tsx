import { CONTACT, useT } from "@/i18n";
import { IMAGES } from "../assets";
import { Btn, GhostNumber, Reveal } from "../ui";
import { ContactCards } from "../ContactCards";
import { InquiryForm } from "../InquiryForm";

export function FinalCtaSection() {
  const { t, lp } = useT();

  return (
    <section id="contact" aria-labelledby="final-cta-heading" className="relative overflow-hidden">
      <img
        src={IMAGES.facade}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1200}
        height={800}
        className="absolute inset-0 size-full object-cover opacity-25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background"
      />

      <div className="container-site relative py-20 md:py-28">
        <GhostNumber value="08" />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
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
