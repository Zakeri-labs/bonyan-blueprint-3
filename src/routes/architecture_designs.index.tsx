import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { DesignsPage } from "@/components/site/pages/DesignsPage";

export const Route = createFileRoute("/architecture_designs/")({
  head: () =>
    seoMeta({
      title: dictionaries.ar.seo.designs.title,
      description: dictionaries.ar.seo.designs.desc,
      locale: "ar",
      path: "/architecture_designs",
    }),
  component: DesignsPage,
});
