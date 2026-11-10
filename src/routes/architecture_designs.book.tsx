import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/architecture_designs/book")({
  component: function ArchitectureDesignsBookPage() {
    useEffect(() => {
      const search = window.location.search;
      window.location.replace(`https://app.bonyanec.com/designs/book${search}`);
    }, []);

    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent mb-4" />
        <p className="text-sm text-muted-foreground">جاري تحويلك إلى نظام حجز المواعيد...</p>
        <a
          href="https://app.bonyanec.com/designs/book"
          className="mt-4 text-xs text-primary underline"
        >
          اضغط هنا إذا لم يتم تحويلك تلقائياً
        </a>
      </div>
    );
  },
});
