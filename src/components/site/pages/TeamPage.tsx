import { type CSSProperties, useState } from "react";
import { Mail, UserRound } from "lucide-react";
import { useT } from "@/i18n";
import { SiteLayout } from "../SiteLayout";
import { IMAGES, ORG_PHOTOS, TEAM_PHOTOS } from "../assets";
import { Reveal, SectionLabel } from "../ui";

/** Org-chart email addresses, keyed by person id. Fill in as they are confirmed. */
const ORG_EMAILS: Record<string, string> = {
  yasir: "yaufi@bonyanec.com",
  athesh: "atheesh.n@bonyanec.com",
  agha: "agha.sh@bonyanec.com",
  jefrin: "jefrin.m@bonyanec.com",
  ahsan: "ahsan.a@bonyanec.com",
  puvanesh: "puvanesh.r@bonyanec.com",
  rajesh: "rajesh.a@bonyanec.com",
  ibrahim: "mohammed.m@bonyanec.com",
  salman: "salman.kh@bonyanec.com",
  siva: "siva.m@bonyanec.com",
};

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
      className="size-full object-cover object-center"
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
      width={400}
      height={400}
      onError={() => setFailed(true)}
      className="size-full object-cover object-center"
    />
  );
}

/**
 * One person in the org chart. The card shows only the portrait; name, role and
 * the person's email are revealed on hover / focus. The email is a mailto: link
 * once it is present in `ORG_EMAILS`.
 */
function OrgNode({
  id,
  name,
  role,
  size = "sm",
}: {
  id: string;
  name: string;
  role: string;
  size?: "lg" | "sm";
}) {
  const email = ORG_EMAILS[id] ?? "";
  const lg = size === "lg";

  return (
    <figure
      tabIndex={0}
      className="group relative aspect-square w-full overflow-hidden border border-border bg-panel outline-none transition-colors hover:border-primary focus-visible:border-primary"
    >
      <OrgPortrait src={ORG_PHOTOS[id] ?? ""} name={name} />
      <figcaption
        className={`absolute inset-0 flex flex-col justify-end bg-linear-to-t from-background/80 via-background/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100 ${
          lg ? "gap-1 p-3" : "gap-0.5 p-2"
        }`}
      >
        <span
          className={`font-display font-bold leading-tight text-foreground ${
            lg ? "text-xs" : "text-[0.5rem]"
          }`}
        >
          {name}
        </span>
        <span
          className={`font-medium uppercase leading-tight tracking-wide text-primary ${
            lg ? "text-[0.5625rem] tracking-wider" : "text-[0.4375rem]"
          }`}
        >
          {role}
        </span>
        {email && (
          <a
            href={`mailto:${email}`}
            dir="ltr"
            className={`mt-1 self-start break-all font-medium text-link underline transition-colors hover:text-link/80 ${
              lg ? "text-[0.5625rem]" : "text-[0.4375rem]"
            }`}
          >
            {email}
          </a>
        )}
      </figcaption>
    </figure>
  );
}

type OrgTreeNode = {
  id: string;
  name: string;
  role: string;
  children?: OrgTreeNode[];
};

/** One row of the mobile indented tree: a small portrait plus name, role, email. */
function MobileOrgNode({ node, root = false }: { node: OrgTreeNode; root?: boolean }) {
  const email = ORG_EMAILS[node.id] ?? "";
  const kids = node.children ?? [];

  return (
    <li className={root ? undefined : "org-mrow"}>
      <div className="flex items-center gap-3 py-1.5">
        <span className="flex size-11 shrink-0 overflow-hidden rounded-md border border-border bg-panel">
          <OrgPortrait src={ORG_PHOTOS[node.id] ?? ""} name={node.name} />
        </span>
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
      </div>

      {kids.length > 0 && (
        <ul className="org-mgroup">
          {kids.map((c) => (
            <MobileOrgNode key={c.id} node={c} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function TeamPage() {
  const { t } = useT();
  const org = t.team.org;
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

          <p className="mt-4 max-w-2xl border-s-2 border-primary/50 bg-card/50 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            {t.team.note}
          </p>

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

        <Reveal>
          <div className="container-site pb-16 pt-10 lg:hidden">
            <ul className="org-mtree">
              <MobileOrgNode node={mobileTree} root />
            </ul>
          </div>

          <div className="mx-auto hidden w-full max-w-[120rem] overflow-x-auto px-5 pb-16 pt-12 md:pb-24 lg:block lg:px-8">
            <div className="org-tree">
              <div className="org-card--ceo">
                <OrgNode {...org.ceo} size="lg" />
              </div>

              <div className="org-children">
                <div className="org-item">
                  <div className="org-card--lead">
                    <OrgNode {...org.construction} size="lg" />
                  </div>
                </div>

                <div className="org-item">
                  <div className="org-card--lead">
                    <OrgNode {...org.gm} size="lg" />
                  </div>
                </div>
              </div>

              <div
                className="org-children org-children--wide"
                style={{ "--org-cols": org.managers.length } as CSSProperties}
              >
                {org.managers.map((m) => (
                  <div className="org-item" key={m.id}>
                    <div className="org-card">
                      <OrgNode id={m.id} name={m.name} role={m.role} />
                    </div>

                    {m.reports.length > 0 && (
                      <div className="org-children">
                        {m.reports.map((r) => (
                          <div className="org-item" key={r.id}>
                            <div className="org-card">
                              <OrgNode {...r} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
