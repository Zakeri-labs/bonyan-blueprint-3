import { useRouterState } from "@tanstack/react-router";
import bonyanLogo from "@/assets/bonyan-logo.png";
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

export function Brand({ compact: _compact = false }: { compact?: boolean }) {
  const { t, lp } = useT();
  return (
    <L to={lp("/")} className="group block" aria-label={t.meta.brandFull}>
      <span className="relative block h-14 w-[164px] shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
        <img
          src={bonyanLogo}
          alt={t.meta.brandFull}
          className="absolute left-[-9px] top-[-26px] h-auto w-[170px] max-w-none transition-opacity duration-300 group-hover:opacity-95"
        />
      </span>
    </L>
  );
}
