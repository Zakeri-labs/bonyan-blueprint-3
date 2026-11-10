import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/designs/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/architecture_designs/$slug",
      params: { slug: params.slug },
    });
  },
});
