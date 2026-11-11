import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useT } from "@/i18n";
import { SiteLayout } from "../SiteLayout";
import { DESIGN_CATEGORIES, getBookingUrl, type Design } from "@/data/designs";
import { fetchPublicDesign } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export function DesignDetailPage({ slug }: { slug: string }) {
  const { t, locale, dir } = useT();
  const dg = t.designGallery;
  const isAr = locale === "ar";
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  const [design, setDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageUrl, setActiveImageUrl] = useState<string>("");

  useEffect(() => {
    let active = true;
    fetchPublicDesign(slug)
      .then((d) => {
        if (!active) return;
        setDesign(d);
        if (d?.images && d.images.length > 0) {
          setActiveImageUrl(d.images[0]?.url || d.imageUrl);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="container-site pt-28 pb-16 md:pt-36 lg:pt-40 md:pb-20" dir={dir}>
          <div className="mb-8 h-5 w-32 rounded-xs bg-muted/40 animate-pulse" />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start animate-pulse">
            <div className="order-last flex flex-col gap-6 lg:order-first lg:col-span-5">
              <div className="h-6 w-24 rounded-xs bg-primary/20" />
              <div className="h-10 w-3/4 rounded-xs bg-muted/50" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded-xs bg-muted/30" />
                <div className="h-4 w-5/6 rounded-xs bg-muted/30" />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="h-16 rounded-xs bg-card/60" />
                <div className="h-16 rounded-xs bg-card/60" />
                <div className="h-16 rounded-xs bg-card/60" />
                <div className="h-16 rounded-xs bg-card/60" />
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <div className="h-11 rounded-xs bg-primary/20" />
                <div className="h-11 rounded-xs bg-card/60" />
              </div>
            </div>
            <div className="order-first flex flex-col gap-3 lg:order-last lg:col-span-7">
              <div className="aspect-[4/3] w-full rounded-xs bg-card/80" />
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (!design) {
    return (
      <SiteLayout>
        <div className="container-site pt-28 pb-16 md:pt-36 lg:pt-40 md:pb-20 text-center" dir={dir}>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {isAr ? "التصميم غير موجود" : "Design not found"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isAr
              ? "لم يتم العثور على هذا التصميم أو قد يكون غير متاح."
              : "This design could not be found or may be unavailable."}
          </p>
          <Link
            to={isAr ? "/architecture_designs" : "/en/architecture_designs"}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xs bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            {dg.back}
          </Link>
        </div>
      </SiteLayout>
    );
  }

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

  const getWhatsAppLink = (intent: "same" | "modified" | "question" | "similar") => {
    const intentText =
      intent === "same"
        ? isAr
          ? `مرحباً، أود تصميماً بهذا الطابع: "${title}" (${design.code}).`
          : `Hello, I want a design in this style: "${title}" (${design.code}).`
        : intent === "modified"
          ? isAr
            ? `مرحباً، أود التصميم "${title}" (${design.code}) مع بعض التعديلات.`
            : `Hello, I want the design "${title}" (${design.code}) with some modifications.`
          : intent === "similar"
            ? isAr
              ? `مرحباً، أود الاستفسار عن مشروع مماثل لـ "${title}" (${design.code}).`
              : `Hello, I'd like to inquire about a project similar to "${title}" (${design.code}).`
            : isAr
              ? `مرحباً، لدي استفسار عن التصميم "${title}" (${design.code}).`
              : `Hello, I have a question about design "${title}" (${design.code}).`;

    return `https://wa.me/96894114511?text=${encodeURIComponent(intentText)}`;
  };

  const currentDisplayImage = activeImageUrl || design.imageUrl;
  const allImages = design.images && design.images.length > 0 ? design.images : [{ id: "main", url: design.imageUrl }];

  return (
    <SiteLayout>
      <div className="container-site pt-28 pb-16 md:pt-36 lg:pt-40 md:pb-20" dir={dir}>
        {/* Back button */}
        <Link
          to={isAr ? "/architecture_designs" : "/en/architecture_designs"}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary cursor-pointer"
        >
          <BackIcon className="size-4" aria-hidden="true" />
          <span>{dg.back}</span>
        </Link>

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
                    href={getBookingUrl({ slug: design.slug, path: "same", locale })}
                    className="inline-flex min-h-11 items-center justify-center rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-14px_var(--primary)] transition-all hover:brightness-110 cursor-pointer text-center"
                  >
                    {dg.wantSame}
                  </a>
                  <a
                    href={getBookingUrl({ slug: design.slug, path: "modified", locale })}
                    className="inline-flex min-h-11 items-center justify-center rounded-xs border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary cursor-pointer text-center"
                  >
                    {dg.wantModified}
                  </a>
                </>
              ) : (
                <a
                  href={getWhatsAppLink("similar")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-xs bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-14px_var(--primary)] transition-all hover:brightness-110 cursor-pointer text-center"
                >
                  {dg.similar}
                </a>
              )}

              <a
                href={getWhatsAppLink("question")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xs border border-emerald-500/70 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20 cursor-pointer text-center"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                <span>{dg.askWhatsapp}</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Visualization & Gallery */}
          <div className="order-first flex flex-col gap-3 lg:order-last lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs border border-border bg-card shadow-2xl">
              <img
                src={currentDisplayImage}
                alt={title}
                className="size-full object-cover transition-all duration-300"
              />
              <span
                className="absolute end-4 bottom-4 rounded-xs bg-background/85 px-3 py-1 text-xs font-bold tracking-wider text-primary border border-primary/40 backdrop-blur-sm"
                dir="ltr"
              >
                {dg.badge3d} VIEW
              </span>
            </div>

            {/* Thumbnail carousel if multiple images exist */}
            {allImages.length > 1 ? (
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
                {allImages.map((img, idx) => {
                  const isSelected = (activeImageUrl || design.imageUrl) === img.url;
                  return (
                    <button
                      key={img.id || idx}
                      type="button"
                      onClick={() => setActiveImageUrl(img.url)}
                      className={cn(
                        "relative size-20 shrink-0 overflow-hidden rounded-xs border transition-all cursor-pointer",
                        isSelected
                          ? "border-primary ring-2 ring-primary/40"
                          : "border-border opacity-70 hover:opacity-100 hover:border-primary/50",
                      )}
                    >
                      <img
                        src={img.url}
                        alt=""
                        className="size-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
