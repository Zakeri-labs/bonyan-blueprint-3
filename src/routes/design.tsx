import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/design")({
  beforeLoad: () => {
    throw redirect({ to: "/designs" });
  },
});
