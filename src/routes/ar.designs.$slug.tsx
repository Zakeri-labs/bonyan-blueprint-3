import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { DesignDetailPage } from "@/components/site/pages/DesignDetailPage";
import { DESIGNS } from "@/data/designs";

export const Route = createFileRoute("/ar/designs/$slug")({
  head: ({ params }) => {
    const d = DESIGNS.find((item) => item.slug === params.slug);
    const title = d
      ? `${d.titleAr} | ${dictionaries.ar.meta.brand}`
      : dictionaries.ar.seo.designs.title;
    const desc = d?.summaryAr ?? dictionaries.ar.seo.designs.desc;
    return seoMeta({
      title,
      description: desc,
      locale: "ar",
      path: `/designs/${params.slug}`,
    });
  },
  component: function DesignDetailWrapper() {
    const { slug } = Route.useParams();
    return <DesignDetailPage slug={slug} />;
  },
});
