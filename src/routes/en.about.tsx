import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { AboutPage } from "@/components/site/pages/AboutPage";

export const Route = createFileRoute("/en/about")({
  head: () =>
    seoMeta({
      title: dictionaries.en.seo.about.title,
      description: dictionaries.en.seo.about.desc,
      locale: "en",
      path: "/about",
    }),
  component: AboutPage,
});
