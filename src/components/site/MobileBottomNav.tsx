import { Home, LayoutGrid, Images, Mail, MessageCircle } from "lucide-react";
import { CONTACT, useT } from "@/i18n";
import { L } from "./L";

export function MobileBottomNav() {
  const { t, lp } = useT();

  const items = [
    { label: t.nav.home, to: lp("/"), icon: Home },
    { label: t.nav.services, to: lp("/services"), icon: LayoutGrid },
    { label: t.nav.portfolio, to: lp("/portfolio"), icon: Images },
    { label: t.nav.contact, to: lp("/contact"), icon: Mail },
  ];

  return (
    <nav
      aria-label={t.nav.menu}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="grid grid-cols-5 ps-[env(safe-area-inset-left)] pe-[env(safe-area-inset-right)]">
        {items.map((item) => (
          <li key={item.label}>
            <L
              to={item.to}
              hash={item.hash}
              className="flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 text-[0.625rem] font-medium leading-tight text-muted-foreground transition-colors hover:text-primary"
              activeOptions={{ exact: true, includeHash: false }}
              activeProps={{ className: "text-primary" }}
            >
              <item.icon aria-hidden="true" className="size-5" />
              <span className="truncate">{item.label}</span>
            </L>
          </li>
        ))}
        <li>
          <a
            href={CONTACT.whatsappHref}
            className="flex min-h-14 flex-col items-center justify-center gap-1 bg-primary px-1 py-2 text-[0.625rem] font-semibold leading-tight text-primary-foreground"
          >
            <MessageCircle aria-hidden="true" className="size-5" />
            <span className="truncate">{t.nav.whatsapp}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
