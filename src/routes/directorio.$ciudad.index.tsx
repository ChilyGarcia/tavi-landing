import { createFileRoute, notFound } from "@tanstack/react-router";
import { RestaurantsDirectory } from "@/pages/RestaurantsDirectory";
import { agruparPorCiudad, categoriasPresentes, paginaIndexable } from "@/lib/directorio";
import { introDirectorio, itemListLd } from "@/lib/directorio-seo";
import { PUBLIC_PAGE_HEADERS, breadcrumbLd, jsonLd, seo } from "@/lib/seo";
import { obtenerDirectorio } from "@/server/directorio";

export const Route = createFileRoute("/directorio/$ciudad/")({
  loader: async ({ params }) => {
    const ciudad = agruparPorCiudad(await obtenerDirectorio()).find(
      (c) => c.slug === params.ciudad,
    );
    if (!ciudad) throw notFound();
    return ciudad;
  },
  headers: () => PUBLIC_PAGE_HEADERS,
  head: ({ loaderData: ciudad }) => {
    if (!ciudad) return {};
    const path = `/directorio/${ciudad.slug}`;
    return {
      ...seo({
        title: `Restaurantes en ${ciudad.nombre} con Menú Digital | TAVI`,
        description: `Restaurantes en ${ciudad.nombre} con menú digital: cartas con precios, dirección y horario de ${ciudad.restaurantes.length === 1 ? "1 negocio" : `${ciudad.restaurantes.length} negocios`}. Pide en línea sin descargar apps.`,
        path,
        // Pocas fichas = página pobre: visible para usuarios, fuera del índice.
        noindex: !paginaIndexable(ciudad.restaurantes),
      }),
      scripts: [
        jsonLd(
          breadcrumbLd([
            { name: "Directorio", path: "/directorio" },
            { name: ciudad.nombre, path },
          ]),
        ),
        jsonLd(itemListLd(`Restaurantes en ${ciudad.nombre}`, ciudad.restaurantes)),
      ],
    };
  },
  component: DirectorioCiudad,
});

function DirectorioCiudad() {
  const ciudad = Route.useLoaderData();
  return (
    <RestaurantsDirectory
      titulo={`Restaurantes en ${ciudad.nombre} con menú digital`}
      intro={introDirectorio(ciudad.nombre, ciudad.restaurantes)}
      migas={[
        { nombre: "Directorio", href: "/directorio" },
        { nombre: ciudad.nombre, href: `/directorio/${ciudad.slug}` },
      ]}
      restaurantes={ciudad.restaurantes}
      filtros={{
        titulo: `Tipos de negocio en ${ciudad.nombre}`,
        enlaces: categoriasPresentes(ciudad.restaurantes).map((c) => ({
          nombre: c.plural,
          href: `/directorio/${ciudad.slug}/${c.slug}`,
          total: c.restaurantes.length,
        })),
      }}
    />
  );
}
