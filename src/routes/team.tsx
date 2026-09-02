import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { TeamPage } from "@/components/site/pages/TeamPage";

export const Route = createFileRoute("/team")({
  head: () =>
    seoMeta({
      title: dictionaries.ar.seo.team.title,
      description: dictionaries.ar.seo.team.desc,
      locale: "ar",
      path: "/team",
    }),
  component: TeamPage,
});
