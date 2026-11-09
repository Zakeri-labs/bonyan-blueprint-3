import { createFileRoute } from "@tanstack/react-router";
import { dictionaries, seoMeta } from "@/i18n";
import { DesignDetailPage } from "@/components/site/pages/DesignDetailPage";
import { DESIGNS } from "@/data/designs";

export const Route = createFileRoute("/en/designs/$slug")({
  head: ({ params }) => {
    const d = DESIGNS.find((item) => item.slug === params.slug);
    const title = d
      ? `${d.titleEn} | ${dictionaries.en.meta.brand}`
      : dictionaries.en.seo.designs.title;
    const desc = d?.summaryEn ?? dictionaries.en.seo.designs.desc;
    return seoMeta({
      title,
      description: desc,
      locale: "en",
      path: `/designs/${params.slug}`,
    });
  },
  component: function DesignDetailWrapper() {
    const { slug } = Route.useParams();
    return <DesignDetailPage slug={slug} />;
  },
});
