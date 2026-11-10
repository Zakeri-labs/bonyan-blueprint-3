import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en/designs/book")({
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/en/architecture_designs/book",
      search: search as Record<string, unknown>,
    });
  },
});
