import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* keeps content clear of the fixed mobile bar */}
      <div aria-hidden="true" className="h-14 lg:hidden" />
      <MobileBottomNav />
    </div>
  );
}
