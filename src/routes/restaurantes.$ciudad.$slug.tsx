import { createFileRoute, redirect } from "@tanstack/react-router";
import { RestaurantPublic } from "@/pages/RestaurantPublic";
import { categoriaDe, formatoPrecio } from "@/lib/directorio";
import { PUBLIC_PAGE_HEADERS, breadcrumbLd, jsonLd, seo } from "@/lib/seo";
import { restaurantLd } from "@/lib/restaurant-ld";
import { obtenerDirectorio, obtenerFicha } from "@/server/directorio";

export const Route = createFileRoute("/restaurantes/$ciudad/$slug")({
  loader: async ({ params }) => {
    const [ficha, directorio] = await Promise.all([
      obtenerFicha({ data: params.slug }),
      obtenerDirectorio(),
    ]);
    // Una sola URL por restaurante: si la ciudad o el slug no son los
    // canónicos (p. ej. llegó por el código opaco), 301 a la ruta canónica.
    if (ficha.ruta_publica !== `/restaurantes/${params.ciudad}/${params.slug}`) {
      throw redirect({ href: ficha.ruta_publica, statusCode: 301 });
    }
    const relacionados = directorio
      .filter((r) => r.ciudad_slug === ficha.ciudad_slug && r.slug !== ficha.slug)
      .sort(
        (a, b) =>
          Number(b.categoria_negocio === ficha.categoria_negocio) -
          Number(a.categoria_negocio === ficha.categoria_negocio),
      )
      .slice(0, 6);
    return { ficha, relacionados };
  },
  headers: () => PUBLIC_PAGE_HEADERS,
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { ficha } = loaderData;
    const categoria = categoriaDe(ficha.categoria_negocio);
    const platos = ficha.secciones.flatMap((s) => s.productos);
    const precios = platos.map((p) => Number(p.precio)).filter((n) => n > 0);
    const desde = precios.length
      ? ` Platos desde ${formatoPrecio(String(Math.min(...precios)))}.`
      : "";
    const ejemplos = platos
      .slice(0, 3)
      .map((p) => p.nombre)
      .join(", ");
    const descripcion = `Menú de ${ficha.nombre} en ${ficha.ciudad} con precios: ${ejemplos}.${desde} Pide en línea sin descargar apps.`;
    return {
      ...seo({
        title: `${ficha.nombre} en ${ficha.ciudad} – Menú y precios | TAVI Orders`,
        description: descripcion.length > 155 ? `${descripcion.slice(0, 152)}…` : descripcion,
        path: ficha.ruta_publica,
        image: ficha.banner ?? ficha.logo ?? undefined,
        imageAlt: `${ficha.nombre}, ${categoria?.singular ?? "restaurante"} en ${ficha.ciudad}`,
        noindex: !ficha.indexable,
      }),
      scripts: [
        jsonLd(restaurantLd(ficha)),
        jsonLd(
          breadcrumbLd([
            { name: "Directorio", path: "/directorio" },
            { name: ficha.ciudad, path: `/directorio/${ficha.ciudad_slug}` },
            ...(categoria
              ? [
                  {
                    name: categoria.plural,
                    path: `/directorio/${ficha.ciudad_slug}/${categoria.slug}`,
                  },
                ]
              : []),
            { name: ficha.nombre, path: ficha.ruta_publica },
          ]),
        ),
      ],
    };
  },
  component: RestaurantePage,
});

function RestaurantePage() {
  const { ficha, relacionados } = Route.useLoaderData();
  return <RestaurantPublic ficha={ficha} relacionados={relacionados} />;
}
