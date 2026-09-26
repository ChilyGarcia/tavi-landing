import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/restaurantes/")({
  beforeLoad: () => {
    throw redirect({ to: "/directorio", statusCode: 301 });
  },
});
