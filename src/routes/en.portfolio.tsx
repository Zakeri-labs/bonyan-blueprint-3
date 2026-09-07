import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { PortfolioPage } from "@/components/site/pages/PortfolioPage";

export const Route = createFileRoute("/en/portfolio")({
  head: () =>
    seoMeta({
      title: dictionaries.en.seo.portfolio.title,
      description: dictionaries.en.seo.portfolio.desc,
      locale: "en",
      path: "/portfolio",
    }),
  component: PortfolioPage,
});
