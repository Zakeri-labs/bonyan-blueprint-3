import { useState, useMemo, useEffect } from "react";
import { Search, Pencil } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useT } from "@/i18n";
import { SiteLayout } from "../SiteLayout";
import { getBookingUrl, type Design, type DesignCategory } from "@/data/designs";
import { fetchPublicGallery } from "@/lib/supabase";

export function DesignsPage() {
  const { t, locale, dir } = useT();
  const dg = t.designGallery;
  const isAr = locale === "ar";

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [designsList, setDesignsList] = useState<Design[]>([]);
  const [categoriesList, setCategoriesList] = useState<DesignCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchPublicGallery()
      .then((res) => {
        if (!active || !res) return;
        if (res.categories && res.categories.length > 0) {
          setCategoriesList(res.categories);
        }
        if (res.designs) {
          setDesignsList(res.designs);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    return [
      { key: "all", label: dg.all },
      ...categoriesList.map((c) => ({
        key: c.key,
        label: isAr ? c.nameAr : c.nameEn,
      })),
    ];
  }, [categoriesList, dg.all, isAr]);

  const filteredDesigns = useMemo(() => {
    const q = query.trim().toLowerCase();
    return designsList.filter((d) => {
      const matchesCategory =
        selectedCategory === "all" || d.categoryKey === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      const title = (isAr ? d.titleAr : d.titleEn).toLowerCase();
      const code = d.code.toLowerCase();
      const summary = (isAr ? d.summaryAr : d.summaryEn).toLowerCase();
      const desc = (isAr ? d.descriptionAr : d.descriptionEn).toLowerCase();

      return (
        title.includes(q) ||
        code.includes(q) ||
        summary.includes(q) ||
        desc.includes(q)
      );
    });
  }, [designsList, query, selectedCategory, isAr]);

  const getWhatsAppLink = (design: Design, intent: "same" | "similar" | "question") => {
    const title = isAr ? design.titleAr : design.titleEn;
    const intentText =
      intent === "same"
        ? isAr
          ? `مرحباً، أود الاستفسار عن حجز موعد لتنفيذ تصميم مشابه لـ "${title}" (${design.code}).`
          : `Hello, I'd like to book a consultation for design "${title}" (${design.code}).`
        : intent === "similar"
          ? isAr
            ? `مرحباً، أود الاستفسار عن مشروع مماثل لـ "${title}" (${design.code}).`
            : `Hello, I'd like to inquire about a project similar to "${title}" (${design.code}).`
          : isAr
            ? `مرحباً، لدي استفسار بخصوص التصميم "${title}" (${design.code}).`
            : `Hello, I have a question regarding design "${title}" (${design.code}).`;

    return `https://wa.me/96894114511?text=${encodeURIComponent(intentText)}`;
  };

  const getCategoryLabel = (catKey: string) => {
    const found = categoriesList.find((c) => c.key === catKey);
    return found ? (isAr ? found.nameAr : found.nameEn) : "";
  };

  return (
    <SiteLayout>
      <div className="container-site py-12 lg:py-16" dir={dir}>
        {/* Header section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-primary/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {dg.eyebrow}
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {dg.title}
            </h1>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              {dg.subtitle}
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full lg:max-w-sm">
            <Search
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={dg.searchPlaceholder}
              className="h-11 w-full rounded-xs border border-border bg-card/60 ps-9 pe-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <nav
          aria-label={dg.categoriesLabel}
          className="mt-8 -mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
        >
          <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {categories.map((c) => {
              const active = selectedCategory === c.key;
              return (
                <li key={c.key}>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(c.key)}
                    className={`inline-flex min-h-9 items-center rounded-xs border px-4 text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? "border-primary bg-primary text-primary-foreground shadow-[0_4px_16px_-8px_var(--primary)]"
                        : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground bg-card/40"
                    }`}
                  >
                    {c.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Content Grid / Skeletons */}
        {loading ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex h-full min-h-[380px] flex-col overflow-hidden rounded-xs border border-border bg-panel/40 animate-pulse"
              >
                <div className="aspect-[4/3] w-full bg-card/80" />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="h-4 w-20 rounded-xs bg-muted/40" />
                  <div className="h-5 w-3/4 rounded-xs bg-muted/50" />
                  <div className="h-3 w-1/2 rounded-xs bg-muted/30" />
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
                    <div className="h-10 rounded-xs bg-muted/30" />
                    <div className="h-10 rounded-xs bg-primary/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredDesigns.length === 0 ? (
          /* No results message */
          <div className="mt-12 rounded-xs border border-border bg-card/40 p-12 text-center">
            <p className="text-base text-muted-foreground">{dg.noResults}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 inline-block text-sm font-semibold text-primary underline cursor-pointer"
            >
              {dg.showAll}
            </button>
          </div>
        ) : (
          /* Grid of Designs */
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDesigns.map((d) => {
              const title = isAr ? d.titleAr : d.titleEn;
              const categoryLabel = getCategoryLabel(d.categoryKey);

              return (
                <article
                  key={d.slug}
                  className="group flex h-full flex-col overflow-hidden rounded-xs border border-border bg-panel/70 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* 3D Image preview */}
                  <Link
                    to={isAr ? "/architecture_designs/$slug" : "/en/architecture_designs/$slug"}
                    params={{ slug: d.slug }}
                    className="relative block aspect-[4/3] overflow-hidden bg-background"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img
                      src={d.imageUrl}
                      alt={title}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className="absolute start-3 bottom-3 rounded-xs bg-background/80 px-2 py-0.5 text-xs font-bold tracking-wider text-primary border border-primary/30"
                      dir="ltr"
                    >
                      {dg.badge3d}
                    </span>
                  </Link>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    {categoryLabel ? (
                      <span className="w-fit rounded-xs bg-primary/15 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-primary">
                        {categoryLabel}
                      </span>
                    ) : null}

                    <h2 className="font-display text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                      <Link
                        to={isAr ? "/architecture_designs/$slug" : "/en/architecture_designs/$slug"}
                        params={{ slug: d.slug }}
                      >
                        {title}
                      </Link>
                    </h2>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {[
                        isAr ? d.floorsAr : d.floorsEn,
                        d.builtAreaSqm ? `≈ ${d.builtAreaSqm} m²` : null,
                        d.bedrooms ? `${d.bedrooms} ${isAr ? "غرف" : "Rooms"}` : null,
                      ]
                        .filter(Boolean)
                        .join(" · ") || (isAr ? d.summaryAr : d.summaryEn)}
                    </p>

                    <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
                      <Link
                        to={isAr ? "/architecture_designs/$slug" : "/en/architecture_designs/$slug"}
                        params={{ slug: d.slug }}
                        className="inline-flex min-h-10 items-center justify-center rounded-xs border border-border text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary cursor-pointer text-center"
                      >
                        {dg.view}
                      </Link>

                      {d.isBookable ? (
                        <a
                          href={getBookingUrl({ slug: d.slug, path: "same", locale })}
                          className="inline-flex min-h-10 items-center justify-center rounded-xs bg-primary px-3 text-xs font-semibold text-primary-foreground transition-all hover:brightness-110 shadow-[0_4px_12px_-6px_var(--primary)] text-center cursor-pointer"
                        >
                          {dg.book}
                        </a>
                      ) : (
                        <a
                          href={getWhatsAppLink(d, "similar")}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-10 items-center justify-center rounded-xs border border-primary/60 text-xs font-semibold text-primary transition-colors hover:bg-primary/10 text-center cursor-pointer"
                        >
                          {dg.similar}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Idea Card */}
            <article className="flex h-full min-h-[340px] flex-col items-center justify-center gap-3 rounded-xs border-2 border-dashed border-primary/50 bg-panel/30 p-6 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Pencil className="size-5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-lg font-bold text-foreground">
                {dg.ideaTitle}
              </h2>
              <p className="max-w-xs text-xs text-muted-foreground leading-relaxed">
                {dg.ideaBody}
              </p>
              <a
                href={getBookingUrl({ path: "idea", locale })}
                className="mt-2 inline-flex min-h-10 items-center justify-center rounded-xs bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-[0_4px_16px_-8px_var(--primary)] transition-all hover:brightness-110 text-center cursor-pointer"
              >
                {dg.ideaCta}
              </a>
            </article>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
