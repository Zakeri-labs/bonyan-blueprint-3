import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { ContactPage } from "@/components/site/pages/ContactPage";

export const Route = createFileRoute("/en/contact")({
  head: () =>
    seoMeta({
      title: dictionaries.en.seo.contact.title,
      description: dictionaries.en.seo.contact.desc,
      locale: "en",
      path: "/contact",
    }),
  component: ContactPage,
});
