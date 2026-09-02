import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { CareerPage } from "@/components/site/pages/CareerPage";

export const Route = createFileRoute("/en/career")({
  head: () =>
    seoMeta({
      title: dictionaries.en.seo.career.title,
      description: dictionaries.en.seo.career.desc,
      locale: "en",
      path: "/career",
    }),
  component: CareerPage,
});
