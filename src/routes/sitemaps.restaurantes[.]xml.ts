import { createFileRoute } from "@tanstack/react-router";
import { urlset, xmlResponse } from "@/lib/sitemap";
import { fetchDirectorio } from "@/server/directorio";

// Solo restaurantes indexables, con lastmod = último cambio real de su carta/datos.
export const Route = createFileRoute("/sitemaps/restaurantes.xml")({
  server: {
    handlers: {
      GET: async () => {
        const restaurantes = (await fetchDirectorio()).filter((r) => r.indexable);
        return xmlResponse(
          urlset(restaurantes.map((r) => ({ path: r.ruta_publica, lastmod: r.actualizado_en }))),
        );
      },
    },
  },
});
