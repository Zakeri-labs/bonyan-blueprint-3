import { useRouterState } from "@tanstack/react-router";
import { en, type Dict } from "./en";
import { ar } from "./ar";
import ogImage from "@/assets/hero-villa.jpg";

export type Locale = "en" | "ar";

export const dictionaries: Record<Locale, Dict> = { en, ar };

export const CONTACT = {
  phone: "[PHONE]",
  whatsapp: "[WHATSAPP]",
  email: "[EMAIL]",
  whatsappHref: "https://wa.me/",
  mapHref: "https://maps.google.com/?q=Al+Mabelah,+Al+Seeb,+Muscat,+Oman",
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

const SITE_URL = "https://bonyan-oman.lovable.app";
const OG_IMAGE = `${SITE_URL}${ogImage}`;

export function seoMeta(opts: {
  title: string;
  description: string;
  image?: string;
  locale: Locale;
  path: string;
}) {
  const url = `${SITE_URL}${localizedPath(opts.locale, opts.path)}`;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: opts.locale === "ar" ? "ar_OM" : "en_OM" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: opts.title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "en", href: `${SITE_URL}${opts.path}` },
      { rel: "alternate", hrefLang: "ar", href: `${SITE_URL}${localizedPath("ar", opts.path)}` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}${opts.path}` },
    ],
  };
}
