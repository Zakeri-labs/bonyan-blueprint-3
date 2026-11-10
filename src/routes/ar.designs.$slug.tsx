import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ar/designs/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/ar/architecture_designs/$slug",
      params: { slug: params.slug },
    });
  },
});
