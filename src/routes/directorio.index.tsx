import { createFileRoute } from "@tanstack/react-router";
import { RestaurantsDirectory } from "@/pages/RestaurantsDirectory";
import { agruparPorCiudad } from "@/lib/directorio";
import { introDirectorio, itemListLd } from "@/lib/directorio-seo";
import { DATA_PAGE_HEADERS, breadcrumbLd, jsonLd, seo } from "@/lib/seo";
import { obtenerDirectorio } from "@/server/directorio";

export const Route = createFileRoute("/directorio/")({
  loader: () => obtenerDirectorio(),
  headers: () => DATA_PAGE_HEADERS,
  head: ({ loaderData }) => ({
    ...seo({
      title: "Restaurantes con Menú Digital en Colombia | Directorio TAVI",
      description:
        "Directorio de restaurantes con menú digital en Colombia. Mira sus cartas con precios, dirección y horario, y haz tu pedido en línea sin descargar apps.",
      path: "/directorio",
    }),
    scripts: [
      jsonLd(breadcrumbLd([{ name: "Directorio", path: "/directorio" }])),
      jsonLd(itemListLd("Restaurantes con menú digital en Colombia", loaderData ?? [])),
    ],
  }),
  component: DirectorioIndex,
});

function DirectorioIndex() {
  const restaurantes = Route.useLoaderData();
  const ciudades = agruparPorCiudad(restaurantes);
  return (
    <RestaurantsDirectory
      titulo="Restaurantes con menú digital en Colombia"
      intro={introDirectorio("Colombia", restaurantes)}
      migas={[{ nombre: "Directorio", href: "/directorio" }]}
      restaurantes={restaurantes}
      filtros={{
        titulo: "Ciudades",
        enlaces: ciudades.map((c) => ({
          nombre: c.nombre,
          href: `/directorio/${c.slug}`,
          total: c.restaurantes.length,
        })),
      }}
    />
  );
}
