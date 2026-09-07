import { useRouterState } from "@tanstack/react-router";
import { en, type Dict } from "./en";
import { ar } from "./ar";

export type Locale = "en" | "ar";

export const dictionaries: Record<Locale, Dict> = { en, ar };

export const CONTACT = {
  phone: "+96894114511",
  phoneHref: "tel:+96894114511",
  whatsapp: "+96894114511",
  email: "info@bonyamec.com",
  applyEmail: "info@bonyamec.com",
  whatsappHref: "https://wa.me/96894114511",
  /** Exact office location provided by the client (Google Maps short link). */
  mapHref: "https://maps.app.goo.gl/QH2wMhHbD71WDPY58",
  mapEmbedHref:
    "https://maps.google.com/maps?q=Bonyan%20Engineering%20consultancy,%20Mabela,%20Sanaya%20Muscat%20OM,%20811&z=16&output=embed",
  social: [
    { label: "Facebook", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
  ],
} as const;

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ar";
}

/** Build a locale-aware path. `path` is the base path, e.g. "/about" or "/". */
export function localizedPath(locale: Locale, path: string): string {
  if (locale === "ar") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** Strip the /en or /ar prefix from a pathname to get the base path. */
export function basePath(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
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
