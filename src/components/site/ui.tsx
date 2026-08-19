import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { L } from "./L";

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
