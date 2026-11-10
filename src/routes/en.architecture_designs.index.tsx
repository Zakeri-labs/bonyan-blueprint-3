import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { DesignsPage } from "@/components/site/pages/DesignsPage";

export const Route = createFileRoute("/en/architecture_designs/")({
  head: () =>
    seoMeta({
      title: dictionaries.en.seo.designs.title,
      description: dictionaries.en.seo.designs.desc,
      locale: "en",
      path: "/architecture_designs",
    }),
  component: DesignsPage,
});
