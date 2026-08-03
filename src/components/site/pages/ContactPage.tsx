import { Clock, MapPin } from "lucide-react";
import { CONTACT, useT } from "@/i18n";
import { SiteLayout } from "../SiteLayout";
import { IMAGES } from "../assets";
import { Btn, Reveal, SectionLabel } from "../ui";
import { ContactCards } from "../ContactCards";
import { InquiryForm } from "../InquiryForm";

export function ContactPage() {
  const { t } = useT();

  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <img
          src={IMAGES.commercial}
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
          <SectionLabel>{t.pages.contact.eyebrow}</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-6xl">
            {t.pages.contact.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t.pages.contact.lead}
          </p>
        </div>
      </section>

      <section aria-labelledby="contact-details" className="bg-background">
        <div className="container-site grid gap-12 py-16 lg:grid-cols-2 lg:gap-16 md:py-20">
          <Reveal>
            <h2
              id="contact-details"
              className="font-display text-2xl font-extrabold leading-tight md:text-3xl"
            >
              {t.contact.heading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.contact.body}
            </p>

            <div className="mt-8">
              <ContactCards />
            </div>

            <div className="mt-6 flex items-start gap-4 border border-border p-5">
              <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-[0.625rem] uppercase tracking-widest text-primary">
                  {t.contact.hours}
                </p>
                <p className="mt-1 text-sm font-medium">{t.contact.hoursValue}</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-6 flex aspect-16/9 flex-col items-center justify-center gap-3 border border-dashed border-border bg-card text-center">
              <MapPin aria-hidden="true" className="size-7 text-primary" />
              <p className="px-6 text-sm text-muted-foreground">{t.contact.mapNote}</p>
              <a
                href={CONTACT.mapHref}
                className="text-xs font-bold uppercase tracking-widest text-primary"
              >
                {t.contact.viewMap}
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <InquiryForm />
            <Btn href={CONTACT.whatsappHref} variant="outline" className="mt-6 w-full">
              {t.cta.secondary}
            </Btn>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
