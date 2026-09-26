import { createFileRoute, redirect } from "@tanstack/react-router";

// /restaurantes/{ciudad} no es una página propia: el listado de la ciudad vive en el directorio.
export const Route = createFileRoute("/restaurantes/$ciudad/")({
  beforeLoad: ({ params }) => {
    throw redirect({ href: `/directorio/${params.ciudad}`, statusCode: 301 });
  },
});
