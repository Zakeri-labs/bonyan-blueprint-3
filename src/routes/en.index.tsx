import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { HomePage } from "@/components/site/pages/HomePage";

export const Route = createFileRoute("/en/")({
  head: () =>
    seoMeta({
      title: dictionaries.en.seo.home.title,
      description: dictionaries.en.seo.home.desc,
      locale: "en",
      path: "/",
    }),
  component: HomePage,
});
