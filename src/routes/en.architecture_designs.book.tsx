import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/en/architecture_designs/book")({
  component: function EnArchitectureDesignsBookPage() {
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      if (!params.has("lang")) params.set("lang", "en");
      window.location.replace(`https://app.bonyanec.com/designs/book?${params.toString()}`);
    }, []);

    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent mb-4" />
        <p className="text-sm text-muted-foreground">Redirecting to appointment booking...</p>
        <a
          href="https://app.bonyanec.com/designs/book?lang=en"
          className="mt-4 text-xs text-primary underline"
        >
          Click here if you are not redirected automatically
        </a>
      </div>
    );
  },
});
