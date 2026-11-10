import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en/designs/book")({
  beforeLoad: () => {
    throw redirect({ to: "/en/architecture_designs/book" });
  },
});
