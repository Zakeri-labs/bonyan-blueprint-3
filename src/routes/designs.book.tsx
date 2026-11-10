import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/designs/book")({
  beforeLoad: () => {
    throw redirect({ to: "/architecture_designs/book" });
  },
});
