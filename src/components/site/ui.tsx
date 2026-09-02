import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { L } from "./L";

/**
 * Mobile horizontal-scroll strip — shared by every swipeable section so the
 * edge margins line up. `-mx-5` bleeds the strip to the viewport edge (cancelling
 * `container-site`'s 1.25rem gutter), `px-5` re-insets the first/last card, and
 * `-my-4 py-4` gives the card hover lift + shadow room so it isn't clipped by
 * the scroll container. Reverts to a normal grid at `md`.
 */
export const H_SCROLL_STRIP =
  "no-scrollbar -mx-5 -my-4 flex snap-x snap-proximity gap-4 overflow-x-auto px-5 py-4 md:m-0 md:grid md:gap-6 md:overflow-visible md:p-0";

/** A card inside `H_SCROLL_STRIP`: near-full width on phones with a small peek of the next. */
export const H_SCROLL_ITEM = "w-full shrink-0 snap-start sm:w-[62%] md:w-auto md:shrink";

type BtnVariant = "primary" | "outline" | "ghost" | "light";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 rounded-xs";

const variants: Record<BtnVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-110 hover:-translate-y-0.5 shadow-[0_8px_24px_-14px_var(--primary)]",
  outline:
    "border border-border text-foreground hover:border-primary hover:text-primary bg-transparent",
  light: "border border-ink/20 text-ink hover:border-primary hover:text-primary bg-transparent",
  ghost: "text-primary hover:opacity-80 px-0",
};

export function Btn({
  to,
  hash,
  href,
  variant = "primary",
  children,
  className,
  arrow = false,
  ...rest
}: {
  to?: string;
  hash?: string;
  href?: string;
  variant?: BtnVariant;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
        />
      )}
    </>
  );
  const cls = cn(base, variants[variant], className);

  if (to) {
    return (
      <L to={to} hash={hash} className={cls}>
        {content}
      </L>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }

  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", shown && "reveal-in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function GhostNumber({ value, light = false }: { value: string; light?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-6 end-6 select-none font-display text-[4.5rem] font-extrabold leading-none md:text-[7rem]",
        light ? "text-ink/5" : "text-foreground/5",
      )}
    >
      {value}
    </span>
  );
}

export function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={cn("eyebrow mb-4", light && "text-ink-muted")}>
      <span aria-hidden="true" className="me-3 inline-block h-px w-8 bg-primary align-middle" />
      {children}
    </p>
  );
}
