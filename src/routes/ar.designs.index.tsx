import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ar/designs/")({
  beforeLoad: () => {
    throw redirect({ to: "/ar/architecture_designs" });
  },
});
