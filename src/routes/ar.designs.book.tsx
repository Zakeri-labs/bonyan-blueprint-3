import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ar/designs/book")({
  beforeLoad: () => {
    throw redirect({ to: "/ar/architecture_designs/book" });
  },
});
