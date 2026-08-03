import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { ContactPage } from "@/components/site/pages/ContactPage";

export const Route = createFileRoute("/ar/contact")({
  head: () =>
    seoMeta({
      title: dictionaries.ar.seo.contact.title,
      description: dictionaries.ar.seo.contact.desc,
      locale: "ar",
      path: "/contact",
    }),
  component: ContactPage,
});
