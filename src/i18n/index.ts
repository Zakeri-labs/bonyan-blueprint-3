import { useRouterState } from "@tanstack/react-router";
import { en, type Dict } from "./en";
import { ar } from "./ar";

export type Locale = "en" | "ar";

export const dictionaries: Record<Locale, Dict> = { en, ar };

export const CONTACT = {
  phone: "+968 9511 4511",
  phoneHref: "tel:+96895114511",
  whatsapp: "+968 9511 4511",
  email: "info@bonyamec.com",
  whatsappHref: "https://wa.me/96895114511",
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=Al%20Seeb%20Al%20Mobela%20Sultanate%20of%20Oman",
  mapEmbedHref:
    "https://www.google.com/maps?q=Al%20Seeb%20Al%20Mobela%20Sultanate%20of%20Oman&output=embed",
  social: [
    { label: "Facebook", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
  ],
} as const;

export function localeFromPath(pathname: string): Locale {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}

/** Build a locale-aware path. `path` is the English path, e.g. "/about" or "/". */
export function localizedPath(locale: Locale, path: string): string {
  if (locale === "en") return path;
  return path === "/" ? "/ar" : `/ar${path}`;
}

/** Strip the /ar prefix from a pathname to get the base English path. */
export function basePath(pathname: string): string {
  if (pathname === "/ar") return "/";
  if (pathname.startsWith("/ar/")) return pathname.slice(3);
  return pathname;
}

export function useLocale(): Locale {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return localeFromPath(pathname);
}

export function useT(): { t: Dict; locale: Locale; dir: "ltr" | "rtl"; lp: (p: string) => string } {
  const locale = useLocale();
  return {
    locale,
    t: dictionaries[locale],
    dir: locale === "ar" ? "rtl" : "ltr",
    lp: (p: string) => localizedPath(locale, p),
  };
}

export function seoMeta(opts: {
  title: string;
  description: string;
  image?: string;
  locale: Locale;
  path: string;
}) {
  return {
    meta: [{ title: opts.title }, { name: "description", content: opts.description }],
  };
}
