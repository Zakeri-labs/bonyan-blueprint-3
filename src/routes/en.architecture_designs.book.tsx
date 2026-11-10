import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { BookingPage } from "@/components/site/pages/BookingPage";

type BookingSearch = {
  design?: string;
  path?: "same" | "modified" | "idea";
};

export const Route = createFileRoute("/en/architecture_designs/book")({
  validateSearch: (search: Record<string, unknown>): BookingSearch => ({
    design: typeof search.design === "string" ? search.design : undefined,
    path: search.path === "same" || search.path === "modified" || search.path === "idea" ? search.path : undefined,
  }),
  head: () =>
    seoMeta({
      title: dictionaries.en.designGallery.booking.metaTitle,
      description: dictionaries.en.seo.designs.desc,
      locale: "en",
      path: "/architecture_designs/book",
    }),
  component: function EnArchitectureDesignsBookRoute() {
    const search = Route.useSearch();
    return <BookingPage designSlug={search.design} initialPath={search.path} />;
  },
});
