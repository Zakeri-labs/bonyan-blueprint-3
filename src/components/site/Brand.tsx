import { useRouterState } from "@tanstack/react-router";
import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { basePath, localizedPath, useT } from "@/i18n";
import { L } from "./L";

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { locale, t } = useT();
  const base = basePath(pathname);

  const item = (code: "en" | "ar", label: string) => (
    <L
      to={localizedPath(code, base)}
      hrefLang={code}
      aria-current={locale === code ? "true" : undefined}
      className={cn(
        "min-h-9 px-2.5 py-1.5 text-xs font-bold tracking-widest transition-colors",
        locale === code ? "text-primary" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </L>
  );

  return (
    <div
      className={cn("flex items-center rounded-xs border border-border", className)}
      role="group"
      aria-label={t.nav.langLabel}
    >
      {item("en", "EN")}
      <span aria-hidden="true" className="h-4 w-px bg-border" />
      {item("ar", "AR")}
    </div>
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  const { t, lp } = useT();
  return (
    <L to={lp("/")} className="flex items-center gap-3" aria-label={t.meta.brandFull}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xs border border-primary/60 bg-primary/10">
        <Compass aria-hidden="true" className="size-5 text-primary" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-extrabold tracking-wide">{t.meta.brand}</span>
        {!compact && (
          <span className="mt-1 text-[0.5625rem] uppercase tracking-[0.2em] text-muted-foreground">
            {t.meta.descriptor}
          </span>
        )}
      </span>
    </L>
  );
}
