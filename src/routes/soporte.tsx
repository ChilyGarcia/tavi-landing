import { createFileRoute, redirect } from "@tanstack/react-router";

// Alias en español: redirección permanente real (301) desde el servidor.
export const Route = createFileRoute("/soporte")({
  beforeLoad: () => {
    throw redirect({ to: "/support", statusCode: 301 });
  },
});
