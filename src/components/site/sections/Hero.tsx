import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useT } from "@/i18n";
import { HOME_HERO_SLIDES } from "../assets";
import { Btn } from "../ui";

export function Hero() {
  const { t, lp, dir } = useT();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 28,
    direction: dir,
  });
  const [activeSlide, setActiveSlide] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const activeProject = t.hero.slides[activeSlide] ?? t.hero.slides[0];

  const updateActiveSlide = useCallback(() => {
    setActiveSlide(emblaApi?.selectedScrollSnap() ?? 0);
  }, [emblaApi]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateActiveSlide();
    emblaApi.on("select", updateActiveSlide);
    emblaApi.on("reInit", updateActiveSlide);

    return () => {
      emblaApi.off("select", updateActiveSlide);
      emblaApi.off("reInit", updateActiveSlide);
    };
  }, [emblaApi, updateActiveSlide]);

  useEffect(() => {
    if (!emblaApi || reducedMotion || isPaused) return;

    const timer = window.setInterval(() => emblaApi.scrollNext(), 4000);
    return () => window.clearInterval(timer);
  }, [activeSlide, emblaApi, isPaused, reducedMotion]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      emblaApi?.scrollPrev();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      emblaApi?.scrollNext();
    }
  };

  return (
    <section
      className="relative min-h-[92vh] w-full overflow-hidden"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      onFocusCapture={() => setIsPaused(true)}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={emblaRef}
        aria-hidden="true"
        className="absolute inset-0 touch-pan-y overflow-hidden"
      >
        <div className="flex h-full">
          {HOME_HERO_SLIDES.map((slide, index) => (
            <div key={slide} className="h-full min-w-0 shrink-0 grow-0 basis-full">
              <img
                src={slide}
                alt=""
                width={1672}
                height={941}
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="size-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/65 via-background/25 to-background/90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-background/80 via-background/15 to-transparent rtl:bg-linear-to-l"
      />

      {/* Ambient background light orbs */}
      <div
        aria-hidden="true"
        className="animate-ambient-pulse pointer-events-none absolute -top-32 end-10 size-96 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-ambient-pulse pointer-events-none absolute bottom-10 start-10 size-80 rounded-full bg-primary/10 blur-3xl"
        style={{ animationDelay: "3.5s" }}
      />

      <div className="pointer-events-none container-site relative flex min-h-[92vh] flex-col justify-end pb-48 pt-32 md:justify-center md:pb-28 md:pt-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="max-w-3xl lg:col-span-8">
            <div className="inline-flex max-w-[18rem] items-center gap-2 rounded-full border border-primary/30 bg-background/50 px-3.5 py-1 backdrop-blur-xs sm:max-w-none">
              <span className="relative flex size-2 shrink-0">
                <span className="status-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <p className="eyebrow">{t.hero.eyebrow}</p>
            </div>
            <h1 className="mt-5 max-w-[18rem] font-display text-[2rem] font-extrabold leading-[1.08] sm:mt-6 sm:max-w-none sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">{t.hero.title1}</span>
              <span className="mt-2.5 block max-w-[18rem] text-[1.0625rem] font-bold leading-snug text-primary sm:mt-3 sm:max-w-xl sm:text-2xl md:max-w-2xl md:text-[1.75rem] lg:text-3xl">
                {t.hero.title2}
              </span>
            </h1>
            <p className="mt-5 max-w-[18rem] text-sm leading-relaxed text-muted-foreground sm:max-w-2xl sm:text-base md:mt-6 md:text-lg">
              <span className="hidden sm:block">{t.hero.subtitle}</span>
              <span className="hidden sm:mt-1 sm:block">{t.hero.subtitle2}</span>
            </p>

            <div className="pointer-events-auto mt-5 flex flex-wrap gap-3 sm:mt-9">
              <Btn
                to={lp("/contact")}
                arrow
                className="shimmer-button border-0 shadow-lg shadow-primary/20"
              >
                {t.hero.primary}
              </Btn>
              <Btn
                to={lp("/")}
                hash="portfolio"
                variant="outline"
                className="transition-all duration-300 hover:border-primary/80 hover:bg-primary/5"
              >
                {t.hero.secondary}
              </Btn>
            </div>

            <ul className="mt-5 flex max-w-[18rem] flex-wrap items-center gap-x-4 gap-y-2 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:mt-10 sm:max-w-none sm:gap-x-6 sm:text-xs sm:tracking-[0.15em]">
              {t.hero.capabilities.map((c) => (
                <li
                  key={c}
                  className="group flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 bg-primary transition-transform duration-300 group-hover:scale-150 group-hover:shadow-[0_0_8px_var(--primary)]"
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:col-span-4 lg:block">
            <div className="animate-float-slow relative ms-auto mt-24 min-h-28 max-w-sm translate-y-[154px] overflow-hidden rounded-xl border border-primary/40 bg-card/60 p-6 shadow-2xl backdrop-blur-md">
              <div
                aria-hidden="true"
                className="absolute -end-10 -top-10 size-32 rounded-full bg-primary/20 blur-2xl"
              />
              {(activeProject.label ||
                activeProject.title ||
                activeProject.description ||
                activeProject.meta) && (
                <div key={activeSlide} className="relative">
                  {activeProject.label && (
                    <p className="eyebrow text-primary">{activeProject.label}</p>
                  )}
                  {activeProject.title && (
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-foreground">
                      {activeProject.title}
                    </h3>
                  )}
                  {activeProject.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {activeProject.description}
                    </p>
                  )}
                  {activeProject.meta && (
                    <p className="mt-3 border-t border-primary/20 pt-3 text-xs font-medium text-primary">
                      {activeProject.meta}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 start-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary/25 bg-background/45 p-2 shadow-lg backdrop-blur-md rtl:translate-x-1/2 md:bottom-8">
        <button
          type="button"
          aria-label={t.hero.previousSlide}
          className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
        </button>
        <div className="flex items-center gap-1.5" role="group" aria-label={t.hero.slideControls}>
          {HOME_HERO_SLIDES.map((slide, index) => (
            <button
              key={slide}
              type="button"
              aria-label={`${t.hero.goToSlide} ${index + 1}`}
              aria-pressed={activeSlide === index}
              className="flex size-5 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={() => emblaApi?.scrollTo(index)}
            >
              <span
                aria-hidden="true"
                className={`block rounded-full transition-all duration-300 ${
                  activeSlide === index
                    ? "h-2 w-5 bg-primary"
                    : "size-2 bg-foreground/60 hover:bg-foreground"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label={t.hero.nextSlide}
          className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRight aria-hidden="true" className="size-4 rtl:rotate-180" />
        </button>
      </div>
    </section>
  );
}
