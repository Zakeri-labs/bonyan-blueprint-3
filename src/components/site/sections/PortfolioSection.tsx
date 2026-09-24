import { cn } from "@/lib/utils";
import { useT } from "@/i18n";
import { HOME_PORTFOLIO_PROJECTS } from "../assets";
import { Btn, H_SCROLL_ITEM, H_SCROLL_STRIP, Reveal, SectionLabel } from "../ui";

/** Asymmetric editorial grid: 3 across the top, 2 wide cards, then a stacked follow-on card. */
const SPANS = ["lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-5", "lg:col-span-7"];

export function PortfolioSection() {
  const { t, lp } = useT();
  const projects = HOME_PORTFOLIO_PROJECTS.flatMap(({ serviceId, projectIndex, ...display }) => {
    const service = t.portfolioPage.services.find((item) => item.id === serviceId);
    const project = service?.projects[projectIndex];

    return project ? [{ ...project, ...display }] : [];
  });
  const admiralProject = projects[5];

  const renderProjectCard = (
    project: (typeof projects)[number],
    index: number,
    compact = false,
    stackedPrimary = false,
  ) => {
    const hideClient = "hideClient" in project && project.hideClient;

    return (
      <Reveal
        className={cn(
          "h-full",
          compact ? "lg:block lg:min-h-0 lg:flex-1" : stackedPrimary && "lg:h-auto lg:shrink-0",
        )}
        delay={(index % 3) * 70}
      >
        <article className="group relative h-full overflow-hidden border border-border transition-all duration-500 hover:-translate-y-1 hover:border-primary/80 hover:shadow-lg hover:shadow-primary/8">
          <img
            src={project.image}
            alt={`${project.name} — ${project.scope}`}
            loading="lazy"
            width={1200}
            height={800}
            className={cn(
              "aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-108",
              compact && "lg:size-full lg:aspect-auto lg:object-top",
            )}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-background/95 from-0% via-background/70 via-30% to-transparent to-60% transition-opacity duration-500 group-hover:opacity-100"
          />
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 p-5 transition-transform duration-300 group-hover:-translate-y-1",
              compact && "lg:p-4",
            )}
          >
            {!hideClient && <span className="eyebrow">{project.type}</span>}
            <h3
              className={cn(
                "mt-2 font-display text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-primary",
                compact && "lg:mt-1.5 lg:line-clamp-2 lg:text-sm lg:leading-tight",
              )}
            >
              {project.name}
            </h3>
            {compact ? (
              <p className="mt-1 hidden text-[0.65rem] leading-snug text-primary lg:line-clamp-2 lg:block">
                {project.scope}
              </p>
            ) : (
              <>
                <p className="mt-1 text-xs text-primary">{project.scope}</p>
              </>
            )}
          </div>
        </article>
      </Reveal>
    );
  };

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="relative bg-panel">
      <div className="container-site relative py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <SectionLabel>{t.portfolio.label}</SectionLabel>
            <h2
              id="portfolio-heading"
              className="font-display text-3xl font-extrabold leading-tight md:text-4xl"
            >
              {t.portfolio.heading}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.portfolio.body}
            </p>
          </Reveal>
        </div>

        {/* Mobile: horizontal swipe. Desktop: asymmetric grid. */}
        <div className="mt-12">
          <ul className={cn(H_SCROLL_STRIP, "md:grid-cols-2 lg:grid-cols-12")}>
            {projects.map((project, index) => {
              if (index === 5) {
                return (
                  <li key={project.name} className={cn(H_SCROLL_ITEM, "lg:hidden")}>
                    {renderProjectCard(project, index)}
                  </li>
                );
              }

              const stacksAdmiral = index === 3 && admiralProject;

              return (
                <li
                  key={project.name}
                  className={cn(
                    H_SCROLL_ITEM,
                    SPANS[index] ?? "lg:col-span-4",
                    stacksAdmiral && "lg:flex lg:flex-col",
                  )}
                >
                  {renderProjectCard(project, index, false, Boolean(stacksAdmiral))}
                  {stacksAdmiral && renderProjectCard(admiralProject, 5, true)}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10">
          <Btn to={lp("/portfolio")} arrow>
            {t.portfolio.cta}
          </Btn>
        </div>
      </div>
    </section>
  );
}
