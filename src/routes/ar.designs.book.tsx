import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ar/designs/book")({
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/ar/architecture_designs/book",
      search: search as Record<string, unknown>,
    });
  },
});
