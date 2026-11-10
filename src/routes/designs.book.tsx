import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/designs/book")({
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/architecture_designs/book",
      search: search as Record<string, unknown>,
    });
  },
});
