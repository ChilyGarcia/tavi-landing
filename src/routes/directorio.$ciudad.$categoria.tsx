import { createFileRoute, notFound } from "@tanstack/react-router";
import { RestaurantsDirectory } from "@/pages/RestaurantsDirectory";
import { agruparPorCiudad, categoriaPorSlug, paginaIndexable } from "@/lib/directorio";
import { introDirectorio, itemListLd } from "@/lib/directorio-seo";
import { PUBLIC_PAGE_HEADERS, breadcrumbLd, jsonLd, seo } from "@/lib/seo";
import { obtenerDirectorio } from "@/server/directorio";

export const Route = createFileRoute("/directorio/$ciudad/$categoria")({
  loader: async ({ params }) => {
    const categoria = categoriaPorSlug(params.categoria);
    const ciudad = agruparPorCiudad(await obtenerDirectorio()).find(
      (c) => c.slug === params.ciudad,
    );
    if (!categoria || !ciudad) throw notFound();
    const restaurantes = ciudad.restaurantes.filter((r) => r.categoria_negocio === categoria.clave);
    if (restaurantes.length === 0) throw notFound();
    return { ciudad, categoria, restaurantes };
  },
  headers: () => PUBLIC_PAGE_HEADERS,
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { ciudad, categoria, restaurantes } = loaderData;
    const path = `/directorio/${ciudad.slug}/${categoria.slug}`;
    return {
      ...seo({
        title: `${categoria.plural} en ${ciudad.nombre}: Menús y Precios | TAVI`,
        description: `${categoria.plural} en ${ciudad.nombre} con menú digital: revisa cartas con precios, dirección y horario, y pide en línea sin descargar apps.`,
        path,
        noindex: !paginaIndexable(restaurantes),
      }),
      scripts: [
        jsonLd(
          breadcrumbLd([
            { name: "Directorio", path: "/directorio" },
            { name: ciudad.nombre, path: `/directorio/${ciudad.slug}` },
            { name: categoria.plural, path },
          ]),
        ),
        jsonLd(itemListLd(`${categoria.plural} en ${ciudad.nombre}`, restaurantes)),
      ],
    };
  },
  component: DirectorioCategoria,
});

function DirectorioCategoria() {
  const { ciudad, categoria, restaurantes } = Route.useLoaderData();
  return (
    <RestaurantsDirectory
      titulo={`${categoria.plural} en ${ciudad.nombre}`}
      intro={introDirectorio(ciudad.nombre, restaurantes, categoria)}
      migas={[
        { nombre: "Directorio", href: "/directorio" },
        { nombre: ciudad.nombre, href: `/directorio/${ciudad.slug}` },
        { nombre: categoria.plural, href: `/directorio/${ciudad.slug}/${categoria.slug}` },
      ]}
      restaurantes={restaurantes}
    />
  );
}
