import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en/design")({
  beforeLoad: () => {
    throw redirect({ to: "/en/architecture_designs" });
  },
});
