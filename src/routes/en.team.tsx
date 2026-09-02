import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { TeamPage } from "@/components/site/pages/TeamPage";

export const Route = createFileRoute("/en/team")({
  head: () =>
    seoMeta({
      title: dictionaries.en.seo.team.title,
      description: dictionaries.en.seo.team.desc,
      locale: "en",
      path: "/team",
    }),
  component: TeamPage,
});
