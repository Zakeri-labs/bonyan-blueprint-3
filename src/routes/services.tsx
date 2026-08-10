import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { ServicesPage } from "@/components/site/pages/ServicesPage";

export const Route = createFileRoute("/services")({
  head: () =>
    seoMeta({
      title: dictionaries.ar.seo.services.title,
      description: dictionaries.ar.seo.services.desc,
      locale: "ar",
      path: "/services",
    }),
  component: ServicesPage,
});
