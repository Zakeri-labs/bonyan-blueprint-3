import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { PortfolioPage } from "@/components/site/pages/PortfolioPage";

export const Route = createFileRoute("/ar/portfolio")({
  head: () =>
    seoMeta({
      title: dictionaries.ar.seo.portfolio.title,
      description: dictionaries.ar.seo.portfolio.desc,
      locale: "ar",
      path: "/portfolio",
    }),
  component: PortfolioPage,
});
