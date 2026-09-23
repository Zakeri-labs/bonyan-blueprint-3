import { type CSSProperties, type RefObject, useEffect, useRef, useState } from "react";
import { Mail, UserRound } from "lucide-react";
import { useT } from "@/i18n";
import { SiteLayout } from "../SiteLayout";
import { IMAGES, ORG_PHOTOS, TEAM_PHOTOS } from "../assets";
import { Reveal, SectionLabel } from "../ui";

/** Fires once when the referenced element first scrolls into view. */
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      // Fire only once the chart is well inside the viewport (its top past the
      // lower third) so the slow reveal actually plays where the reader is looking.
      { threshold: 0, rootMargin: "0px 0px -35% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

/** Org-chart email addresses, keyed by person id. Fill in as they are confirmed. */
const ORG_EMAILS: Record<string, string> = {
  yasir: "yaufi@bonyanec.com",
  ajil: "ajil@live.com",
  athesh: "atheesh.n@bonyanec.com",
  agha: "agha.sh@bonyanec.com",
  jefrin: "jerin.mo@bonyanec.com",
  ahsan: "ahsan.a@bonyanec.com",
  puvanesh: "puvanesh.r@bonyanec.com",
  rajesh: "rajesh.a@bonyanec.com",
  ibrahim: "mohammed.m@bonyanec.com",
  salman: "salman.kh@bonyanec.com",
  siva: "siva.m@bonyanec.com",
};

const DEFERRED_MANAGER_IDS = new Set(["ummer", "pramodh"]);

/** Portrait with a graceful fallback to the placeholder if the file is missing. */
function TeamPhoto({ src, name, pending }: { src: string; name: string; pending: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span className="flex size-full flex-col items-center justify-center gap-3 text-muted-foreground">
        <UserRound aria-hidden="true" className="size-12 text-primary/40" />
        <span className="text-[0.625rem] uppercase tracking-widest">{pending}</span>
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      width={900}
      height={1124}
      onError={() => setFailed(true)}
      className="size-full object-contain object-bottom"
    />
  );
}

/** Slim portrait for the org chart: the photo, or a quiet icon until one is added. */
function OrgPortrait({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span className="flex size-full items-center justify-center bg-panel">
        <UserRound aria-hidden="true" className="size-9 text-primary/30" />
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      width={1122}
      height={1402}
      onError={() => setFailed(true)}
      className="size-full object-contain object-bottom"
    />
  );
}

/**
 * One person in the org chart. Each card is a portrait with a name plate under
 * it (name + role, always visible) that sits slightly proud of the card with a
 * soft drop shadow. On hover / focus a navy cover at 50% opacity fills the card
 * and reveals a mail icon beside the person's email — a mailto: link once the
 * address is present in `ORG_EMAILS`.
 */
function OrgNode({
  id,
  name,
  role,
  size = "sm",
  captionRow,
}: {
  id: string;
  name: string;
  role: string;
  size?: "lg" | "sm";
  captionRow: "ceo" | "leadership" | "managers" | "reports";
}) {
  const email = ORG_EMAILS[id] ?? "";
  const lg = size === "lg";
  const isPending = !name && !role;
  return (
    <figure
      tabIndex={0}
      className="group relative flex w-full flex-col rounded-lg border border-border bg-panel outline-none transition-colors hover:border-primary focus-visible:border-primary"
    >
      <div className="relative aspect-[1122/1402] w-full overflow-hidden rounded-t-lg">
        <div className="size-full">
          {isPending ? (
            <span aria-hidden="true" className="block size-full bg-panel" />
          ) : (
            <OrgPortrait src={ORG_PHOTOS[id] ?? ""} name={name} />
          )}
        </div>

        {email && (
          <div className="absolute inset-0 bg-background/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100">
            <a
              href={`mailto:${email}`}
              dir="ltr"
              className={`absolute inset-x-0 bottom-0 flex h-1/4 translate-y-2 items-center justify-center px-2 text-center font-medium text-foreground underline decoration-primary/60 underline-offset-2 opacity-0 transition delay-100 duration-500 hover:text-primary group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
                lg ? "text-xs" : "text-[0.5625rem]"
              }`}
            >
              <span className={`flex items-start break-all ${lg ? "gap-1.5" : "gap-1"}`}>
                <Mail
                  aria-hidden="true"
                  className={`mt-px shrink-0 text-primary ${lg ? "size-3.5" : "size-3"}`}
                />
                <span>{email}</span>
              </span>
            </a>
          </div>
        )}
      </div>

      <figcaption
        data-org-caption-row={captionRow}
        className={`org-caption relative z-1 flex flex-col rounded-b-lg border-t border-border bg-panel ${
          lg ? "gap-1 p-3" : "gap-0.5 p-2"
        }`}
      >
        <span
          className={`font-display font-bold leading-tight text-foreground ${
            lg ? "text-sm" : "text-[0.625rem]"
          }`}
        >
          {name}
        </span>
        <span
          className={`font-medium uppercase leading-tight tracking-wide text-primary ${
            lg ? "text-[0.6875rem] tracking-wider" : "text-[0.5625rem]"
          }`}
        >
          {role}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Makes captions equally tall only within their visual chart row. This keeps
 * cards aligned while avoiding a chart-wide fixed height that leaves excess
 * space beneath shorter names or roles.
 */
function useEqualOrgCaptionRows(ref: RefObject<HTMLElement | null>, org: unknown) {
  useEffect(() => {
    const chart = ref.current;
    if (!chart) return;

    const equalize = () => {
      const captions = Array.from(chart.querySelectorAll<HTMLElement>("[data-org-caption-row]"));
      const rows = new Map<string, HTMLElement[]>();

      captions.forEach((caption) => {
        caption.style.minHeight = "0";
        const row = caption.dataset.orgCaptionRow;
        if (!row) return;
        rows.set(row, [...(rows.get(row) ?? []), caption]);
      });

      rows.forEach((rowCaptions) => {
        const tallestCaption = Math.ceil(
          Math.max(...rowCaptions.map((caption) => caption.getBoundingClientRect().height)),
        );
        rowCaptions.forEach((caption) => {
          caption.style.minHeight = `${tallestCaption}px`;
        });
      });
    };

    equalize();
    const observer = new ResizeObserver(equalize);
    observer.observe(chart);
    window.addEventListener("resize", equalize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", equalize);
    };
  }, [org, ref]);
}

type OrgTreeNode = {
  id: string;
  name: string;
  role: string;
  children?: OrgTreeNode[];
};

/** One row of the mobile indented tree: a small portrait plus name, role, email. */
function MobileOrgNode({
  node,
  root = false,
  orderMap,
}: {
  node: OrgTreeNode;
  root?: boolean;
  orderMap: Map<string, number>;
}) {
  const email = ORG_EMAILS[node.id] ?? "";
  const kids = node.children ?? [];
  const order = orderMap.get(node.id) ?? 0;
  const isPending = !node.name && !node.role;

  return (
    <li className={root ? undefined : "org-mrow"} style={{ "--i": order } as CSSProperties}>
      <div className="flex items-center gap-3 py-1.5">
        <span className="flex size-11 shrink-0 overflow-hidden rounded-md border border-border bg-panel">
          {isPending ? (
            <span aria-hidden="true" className="block size-full" />
          ) : (
            <OrgPortrait src={ORG_PHOTOS[node.id] ?? ""} name={node.name} />
          )}
        </span>
        {!isPending && (
          <span className="min-w-0">
            <span className="block font-display text-sm font-bold leading-tight text-foreground">
              {node.name}
            </span>
            <span className="block text-[0.6875rem] font-medium uppercase leading-tight tracking-wide text-primary">
              {node.role}
            </span>
            {email && (
              <a
                href={`mailto:${email}`}
                dir="ltr"
                className="mt-0.5 block truncate text-[0.6875rem] text-link underline"
              >
                {email}
              </a>
            )}
          </span>
        )}
      </div>

      {kids.length > 0 && (
        <ul className="org-mgroup">
          {kids.map((c) => (
            <MobileOrgNode key={c.id} node={c} orderMap={orderMap} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function TeamPage() {
  const { t } = useT();
  const org = t.team.org;
  const chart = useInView<HTMLDivElement>();
  const mobileChart = useInView<HTMLUListElement>();
  const desktopChart = useRef<HTMLDivElement>(null);
  useEqualOrgCaptionRows(desktopChart, org);
  const mobileTree: OrgTreeNode = {
    id: org.ceo.id,
    name: org.ceo.name,
    role: org.ceo.role,
    children: [
      { id: org.construction.id, name: org.construction.name, role: org.construction.role },
      {
        id: org.gm.id,
        name: org.gm.name,
        role: org.gm.role,
        children: org.managers.map((m) => ({
          id: m.id,
          name: m.name,
          role: m.role,
          children: m.reports.map((r) => ({ id: r.id, name: r.name, role: r.role })),
        })),
      },
    ],
  };

  // Pre-order index for every node, so the mobile tree can cascade in top-to-bottom.
  const mobileOrder = new Map<string, number>();
  (function walk(n: OrgTreeNode) {
    mobileOrder.set(n.id, mobileOrder.size);
    n.children?.forEach(walk);
  })(mobileTree);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <img
          src={IMAGES.about}
          alt=""
          aria-hidden="true"
          width={1200}
          height={800}
          className="absolute inset-0 size-full object-cover opacity-20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-background/80 via-background/90 to-background"
        />
        <div className="container-site relative pb-16 md:pb-24">
          <SectionLabel>{t.pages.team.eyebrow}</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-6xl">
            {t.pages.team.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t.pages.team.lead}
          </p>
        </div>
      </section>

      <section aria-labelledby="team-leadership" className="bg-background">
        <div className="container-site py-16 md:py-24">
          <h2
            id="team-leadership"
            className="font-display text-2xl font-extrabold leading-tight md:text-3xl"
          >
            {t.team.leadershipTitle}
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.team.members.map((m, i) => {
              const hasContact = Boolean(m.email);

              return (
                <Reveal key={m.name} delay={(i % 4) * 70}>
                  <article className="flex h-full flex-col overflow-hidden border border-border bg-card">
                    <div className="relative aspect-4/5 w-full overflow-hidden border-b border-border bg-panel">
                      <TeamPhoto
                        src={TEAM_PHOTOS[i] ?? ""}
                        name={m.name}
                        pending={t.team.photoPending}
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-base font-bold leading-snug">{m.name}</h3>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary">
                        {m.role}
                      </p>

                      <ul className="mt-4 space-y-2 text-sm">
                        <li className="flex items-center gap-2.5">
                          <Mail aria-hidden="true" className="size-4 shrink-0 text-primary" />
                          {m.email ? (
                            <a
                              href={`mailto:${m.email}`}
                              dir="ltr"
                              className="truncate text-start text-link underline transition-colors hover:text-link/80"
                            >
                              {m.email}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">{t.team.emailLabel} —</span>
                          )}
                        </li>
                      </ul>

                      {!hasContact && (
                        <p className="mt-3 text-[0.6875rem] italic text-muted-foreground">
                          {t.team.contactPending}
                        </p>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="team-composition" className="bg-panel">
        <div className="container-site pt-16 md:pt-24">
          <SectionLabel>{t.pages.team.eyebrow}</SectionLabel>
          <h2
            id="team-composition"
            className="font-display text-2xl font-extrabold leading-tight md:text-3xl"
          >
            {org.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {org.intro}
          </p>
        </div>

        <div className="container-site pb-16 pt-10 lg:hidden">
          <ul ref={mobileChart.ref} className={`org-mtree${mobileChart.inView ? " is-in" : ""}`}>
            <MobileOrgNode node={mobileTree} root orderMap={mobileOrder} />
          </ul>
        </div>

        <div
          ref={desktopChart}
          className="mx-auto hidden w-full max-w-[120rem] overflow-x-auto px-5 pb-16 pt-12 md:pb-24 lg:block lg:px-8"
        >
          <div ref={chart.ref} className={`org-tree${chart.inView ? " is-in" : ""}`}>
            <div className="org-card--ceo">
              <OrgNode {...org.ceo} size="lg" captionRow="ceo" />
            </div>

            <div className="org-mid">
              <div className="org-mid__aside">
                <div className="org-card--lead">
                  <OrgNode {...org.construction} size="lg" captionRow="leadership" />
                </div>
              </div>

              <div className="org-mid__gm">
                <div className="org-card--lead">
                  <OrgNode {...org.gm} size="lg" captionRow="leadership" />
                </div>
              </div>
            </div>

            <div
              className="org-children org-children--wide"
              style={{ "--org-cols": org.managers.length } as CSSProperties}
            >
              {org.managers.map((m, i) => (
                <div
                  className={`org-item${DEFERRED_MANAGER_IDS.has(m.id) ? " org-item--deferred" : ""}${m.id === "pramodh" ? " org-item--deferred-last" : ""}`}
                  key={m.id}
                  style={{ "--i": i } as CSSProperties}
                >
                  {DEFERRED_MANAGER_IDS.has(m.id) ? (
                    <>
                      <div className="org-deferred-spacer" aria-hidden="true">
                        <div className="org-card org-card--spacer">
                          <OrgNode id="" name="" role="" captionRow="managers" />
                        </div>
                      </div>
                      <div className="org-children">
                        <div className="org-item">
                          <div className="org-card">
                            <OrgNode id={m.id} name={m.name} role={m.role} captionRow="reports" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="org-card">
                        <OrgNode id={m.id} name={m.name} role={m.role} captionRow="managers" />
                      </div>

                      {m.reports.length > 0 && (
                        <div className="org-children">
                          {m.reports.map((r) => (
                            <div className="org-item" key={r.id}>
                              <div className="org-card">
                                <OrgNode {...r} captionRow="reports" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
