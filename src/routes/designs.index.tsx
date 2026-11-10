import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/designs/")({
  beforeLoad: () => {
    throw redirect({ to: "/architecture_designs" });
  },
});
