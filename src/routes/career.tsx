import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { CareerPage } from "@/components/site/pages/CareerPage";

export const Route = createFileRoute("/career")({
  head: () =>
    seoMeta({
      title: dictionaries.ar.seo.career.title,
      description: dictionaries.ar.seo.career.desc,
      locale: "ar",
      path: "/career",
    }),
  component: CareerPage,
});
