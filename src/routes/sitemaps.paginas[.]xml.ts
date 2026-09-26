import { createFileRoute } from "@tanstack/react-router";
import { PAGINAS_ESTATICAS } from "@/lib/paginas";
import { urlset, xmlResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemaps/paginas.xml")({
  server: {
    handlers: {
      GET: () =>
        xmlResponse(
          urlset(PAGINAS_ESTATICAS.map((p) => ({ path: p.path, lastmod: p.actualizado }))),
        ),
    },
  },
});
