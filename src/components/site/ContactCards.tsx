import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { CONTACT, useT } from "@/i18n";
import { cn } from "@/lib/utils";

export function ContactCards({ light = false }: { light?: boolean }) {
  const { t } = useT();

  const cards = [
    { icon: Phone, label: t.contact.phone, value: CONTACT.phone, href: `tel:${CONTACT.phone}`, ltr: true },
    {
      icon: MessageCircle,
      label: t.contact.whatsapp,
      value: CONTACT.whatsapp,
      href: CONTACT.whatsappHref,
      ltr: true,
    },
    { icon: Mail, label: t.contact.email, value: CONTACT.email, href: `mailto:${CONTACT.email}`, ltr: true },
    {
      icon: MapPin,
      label: t.contact.location,
      value: t.contact.address,
      href: CONTACT.mapHref,
      ltr: false,
    },
  ];

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {cards.map((c) => (
        <li key={c.label}>
          <a
            href={c.href}
            className={cn(
              "flex h-full min-h-11 items-start gap-4 border p-5 transition-colors",
              light
                ? "border-ivory-border bg-background/3 hover:border-primary"
                : "border-border bg-card hover:border-primary",
            )}
          >
            <c.icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
            <span className="min-w-0">
              <span className="block text-[0.625rem] uppercase tracking-widest text-primary">
                {c.label}
              </span>
              <span
                {...(c.ltr ? { dir: "ltr" as const } : {})}
                className={cn(
                  "mt-1 block break-words text-sm font-medium",
                  light ? "text-ink" : "text-foreground",
                  c.ltr && "text-start",
                )}
              >
                {c.value}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
