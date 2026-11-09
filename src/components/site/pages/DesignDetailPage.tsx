import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { useT } from "@/i18n";
import { SiteLayout } from "../SiteLayout";
import { L } from "../L";
import { DESIGNS, DESIGN_CATEGORIES } from "@/data/designs";

export function DesignDetailPage({ slug }: { slug: string }) {
  const { t, lp, locale, dir } = useT();
  const dg = t.designGallery;
  const isAr = locale === "ar";
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  const design = DESIGNS.find((d) => d.slug === slug) ?? DESIGNS[0];
  const title = isAr ? design.titleAr : design.titleEn;
  const description = isAr ? design.descriptionAr : design.descriptionEn;

  const category = DESIGN_CATEGORIES.find((c) => c.key === design.categoryKey);
  const categoryLabel = category ? (isAr ? category.nameAr : category.nameEn) : "";

  const specs = [
    { label: dg.floors, value: isAr ? design.floorsAr : design.floorsEn },
    {
      label: dg.area,
      value: design.builtAreaSqm ? `≈ ${design.builtAreaSqm} m²` : null,
    },
    {
      label: dg.bedrooms,
      value: design.bedrooms ? `${design.bedrooms} ${isAr ? "غرف" : "Bedrooms"}` : null,
    },
    { label: dg.service, value: isAr ? design.serviceAr : design.serviceEn },
  ].filter((s) => Boolean(s.value));

  const getWhatsAppLink = (intent: "same" | "modified" | "question") => {
    const intentText =
      intent === "same"
        ? isAr
          ? `مرحباً، أود تصميماً بهذا الطابع: "${title}" (${design.code}).`
          : `Hello, I want a design in this style: "${title}" (${design.code}).`
        : intent === "modified"
          ? isAr
            ? `مرحباً، أود التصميم "${title}" (${design.code}) مع بعض التعديلات.`
            : `Hello, I want the design "${title}" (${design.code}) with some modifications.`
          : isAr
            ? `مرحباً، لدي استفسار عن التصميم "${title}" (${design.code}).`
            : `Hello, I have a question about design "${title}" (${design.code}).`;

    return `https://wa.me/96894114511?text=${encodeURIComponent(intentText)}`;
  };

  return (
    <SiteLayout>
      <div className="container-site py-10 lg:py-16" dir={dir}>
        {/* Back button */}
        <L
          to={lp("/designs")}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          <BackIcon className="size-4" aria-hidden="true" />
          <span>{dg.back}</span>
        </L>

        {/* Content grid */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Details & Actions */}
          <div className="order-last flex flex-col gap-6 lg:order-first lg:col-span-5">
            <span className="w-fit rounded-xs bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
              <span dir="ltr">{dg.badge3d}</span>
              {categoryLabel ? <> · {categoryLabel}</> : null}
            </span>

            <h1 className="font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              {title}
            </h1>

            {description ? (
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:text-base">
                {description}
              </p>
            ) : null}

            {specs.length ? (
              <div>
                <dl className="grid grid-cols-2 gap-3">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-xs border border-border bg-panel/60 p-3.5"
                    >
                      <dt className="text-xs text-muted-foreground">{spec.label}</dt>
                      <dd className="mt-1 font-display text-sm font-semibold text-foreground">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2 text-xs text-muted-foreground/75">
                  {dg.illustrative}
                </p>
              </div>
            ) : null}

            {!design.isBookable ? (
              <p className="text-xs text-muted-foreground">
                {dg.referenceNote}
              </p>
            ) : null}

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              {design.isBookable ? (
                <>
                  <a
                    href={getWhatsAppLink("same")}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-14px_var(--primary)] transition-all hover:brightness-110"
                  >
                    {dg.wantSame}
                  </a>
                  <a
                    href={getWhatsAppLink("modified")}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-xs border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {dg.wantModified}
                  </a>
                </>
              ) : (
                <a
                  href={getWhatsAppLink("similar")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-14px_var(--primary)] transition-all hover:brightness-110"
                >
                  {dg.similar}
                </a>
              )}

              <a
                href={getWhatsAppLink("question")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xs border border-emerald-500/70 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                <span>{dg.askWhatsapp}</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Visualization */}
          <div className="order-first lg:order-last lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs border border-border bg-card shadow-2xl">
              <img
                src={design.imageUrl}
                alt={title}
                className="size-full object-cover"
              />
              <span
                className="absolute end-4 bottom-4 rounded-xs bg-background/85 px-3 py-1 text-xs font-bold tracking-wider text-primary border border-primary/40 backdrop-blur-sm"
                dir="ltr"
              >
                {dg.badge3d} VIEW
              </span>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
