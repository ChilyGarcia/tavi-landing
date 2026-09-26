import { createFileRoute } from "@tanstack/react-router";
import { PAGINAS_ESTATICAS } from "@/lib/paginas";
import { maxFecha, sitemapIndex, xmlResponse } from "@/lib/sitemap";
import { fetchDirectorio } from "@/server/directorio";

// Índice de sitemaps (el que declara robots.txt y se envía en Search Console).
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const restaurantes = (await fetchDirectorio()).filter((r) => r.indexable);
        const ultimoRestaurante = maxFecha(restaurantes.map((r) => r.actualizado_en));
        return xmlResponse(
          sitemapIndex([
            {
              path: "/sitemaps/paginas.xml",
              lastmod: maxFecha(PAGINAS_ESTATICAS.map((p) => p.actualizado)),
            },
            { path: "/sitemaps/directorio.xml", lastmod: ultimoRestaurante },
            { path: "/sitemaps/restaurantes.xml", lastmod: ultimoRestaurante },
          ]),
        );
      },
    },
  },
});
