import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ar/design")({
  beforeLoad: () => {
    throw redirect({ to: "/ar/architecture_designs" });
  },
});
