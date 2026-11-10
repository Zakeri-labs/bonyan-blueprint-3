import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/en/designs/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/en/architecture_designs/$slug",
      params: { slug: params.slug },
    });
  },
});
