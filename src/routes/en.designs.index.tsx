import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en/designs/")({
  beforeLoad: () => {
    throw redirect({ to: "/en/architecture_designs" });
  },
});
