import { Clock } from "lucide-react";
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
        <div className="container-site py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
            {/* Left — contact details */}
            <Reveal>
              <SectionLabel>{t.contact.whereLabel}</SectionLabel>
              <h2
                id="contact-details"
                className="font-display text-2xl font-extrabold leading-tight text-primary md:text-3xl"
              >
                {t.contact.heading}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {t.contact.body}
              </p>

              <div className="mt-8">
                <ContactCards />
              </div>

              <div className="mt-6 border border-border p-5">
                <p className="text-[0.625rem] uppercase tracking-widest text-primary">
                  {t.contact.emailsTitle}
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                    <span className="w-36 shrink-0 text-muted-foreground">
                      {t.contact.generalLabel}
                    </span>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      dir="ltr"
                      className="text-start font-medium text-link underline transition-colors hover:text-link/80"
                    >
                      {CONTACT.email}
                    </a>
                  </li>
                  <li className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                    <span className="w-36 shrink-0 text-muted-foreground">
                      {t.contact.careersLabel}
                    </span>
                    <a
                      href={`mailto:${CONTACT.applyEmail}`}
                      dir="ltr"
                      className="text-start font-medium text-link underline transition-colors hover:text-link/80"
                    >
                      {CONTACT.applyEmail}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex items-start gap-4 border border-border p-5">
                <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-[0.625rem] uppercase tracking-widest text-primary">
                    {t.contact.hours}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-relaxed">{t.contact.hoursValue}</p>
                </div>
              </div>
            </Reveal>

            {/* Right — inquiry form */}
            <Reveal delay={100} className="lg:flex lg:flex-col">
              <InquiryForm />
              <div className="mt-4 lg:mt-auto lg:pt-6">
                <Btn href={CONTACT.whatsappHref} variant="outline" className="w-full">
                  {t.cta.secondary}
                </Btn>
              </div>
            </Reveal>
          </div>

          {/* Full-width map */}
          <Reveal className="mt-12 md:mt-16">
            <div className="overflow-hidden border border-border bg-card">
              <iframe
                title={t.contact.location}
                src={CONTACT.mapEmbedHref}
                className="h-[340px] w-full border-0 md:h-[420px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="border-t border-border p-4 text-center">
                <a
                  href={CONTACT.mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold uppercase tracking-widest text-primary transition-opacity hover:opacity-80"
                >
                  {t.contact.address} — {t.contact.viewMap}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
