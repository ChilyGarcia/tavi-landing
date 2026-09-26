import { createFileRoute } from "@tanstack/react-router";
import { agruparPorCiudad, categoriasPresentes, paginaIndexable } from "@/lib/directorio";
import { maxFecha, urlset, xmlResponse, type SitemapUrl } from "@/lib/sitemap";
import { fetchDirectorio } from "@/server/directorio";

// Solo páginas de directorio indexables (las de pocos restaurantes van con noindex).
export const Route = createFileRoute("/sitemaps/directorio.xml")({
  server: {
    handlers: {
      GET: async () => {
        const restaurantes = await fetchDirectorio();
        const lastmod = (items: typeof restaurantes) =>
          maxFecha(items.map((r) => r.actualizado_en));
        const urls: SitemapUrl[] = [{ path: "/directorio", lastmod: lastmod(restaurantes) }];
        for (const ciudad of agruparPorCiudad(restaurantes)) {
          if (paginaIndexable(ciudad.restaurantes)) {
            urls.push({
              path: `/directorio/${ciudad.slug}`,
              lastmod: lastmod(ciudad.restaurantes),
            });
          }
          for (const cat of categoriasPresentes(ciudad.restaurantes)) {
            if (paginaIndexable(cat.restaurantes)) {
              urls.push({
                path: `/directorio/${ciudad.slug}/${cat.slug}`,
                lastmod: lastmod(cat.restaurantes),
              });
            }
          }
        }
        return xmlResponse(urlset(urls));
      },
    },
  },
});
