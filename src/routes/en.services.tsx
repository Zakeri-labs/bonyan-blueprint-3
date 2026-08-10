import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { ServicesPage } from "@/components/site/pages/ServicesPage";

export const Route = createFileRoute("/en/services")({
  head: () =>
    seoMeta({
      title: dictionaries.en.seo.services.title,
      description: dictionaries.en.seo.services.desc,
      locale: "en",
      path: "/services",
    }),
  component: ServicesPage,
});
