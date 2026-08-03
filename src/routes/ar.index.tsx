import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { HomePage } from "@/components/site/pages/HomePage";

export const Route = createFileRoute("/ar/")({
  head: () =>
    seoMeta({
      title: dictionaries.ar.seo.home.title,
      description: dictionaries.ar.seo.home.desc,
      locale: "ar",
      path: "/",
    }),
  component: HomePage,
});
