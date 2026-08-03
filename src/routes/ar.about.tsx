import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { AboutPage } from "@/components/site/pages/AboutPage";

export const Route = createFileRoute("/ar/about")({
  head: () =>
    seoMeta({
      title: dictionaries.ar.seo.about.title,
      description: dictionaries.ar.seo.about.desc,
      locale: "ar",
      path: "/about",
    }),
  component: AboutPage,
});
