import { categoriaDe, type DirectorioItem } from "@/lib/directorio";
import { canonicalUrl } from "@/lib/seo";

export function itemListLd(nombre: string, items: DirectorioItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: nombre,
    numberOfItems: items.length,
    itemListElement: items.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: canonicalUrl(r.ruta_publica),
      name: r.nombre,
    })),
  };
}

function lista(nombres: string[]) {
  if (nombres.length <= 1) return nombres.join("");
  return `${nombres.slice(0, -1).join(", ")} y ${nombres[nombres.length - 1]}`;
}

const FECHA = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric" });

function ultimaActualizacion(items: DirectorioItem[]) {
  const max = Math.max(...items.map((i) => Date.parse(i.actualizado_en)));
  return Number.isFinite(max) ? FECHA.format(new Date(max)) : null;
}

/**
 * Introducción única por página, construida con los datos reales del
 * listado (conteos, categorías, nombres y fecha): nunca un párrafo de
 * plantilla idéntico entre ciudades.
 */
export function introDirectorio(
  lugar: string,
  items: DirectorioItem[],
  categoria?: { plural: string; singular: string },
) {
  if (items.length === 0) return `Todavía no hay restaurantes publicados en ${lugar}.`;
  const destacados = lista(items.slice(0, 3).map((i) => i.nombre));
  const platos = items.reduce((acc, i) => acc + i.total_productos, 0);
  const porCategoria = new Map<string, number>();
  for (const i of items) {
    const c = categoriaDe(i.categoria_negocio)?.plural.toLowerCase() ?? "otros";
    porCategoria.set(c, (porCategoria.get(c) ?? 0) + 1);
  }
  const mezcla = categoria
    ? ""
    : ` Hay ${lista([...porCategoria.entries()].map(([c, n]) => `${n} de ${c}`))}.`;
  const fecha = ultimaActualizacion(items);
  const sujeto =
    items.length === 1
      ? `Un negocio de ${categoria?.singular ?? "comida"} en ${lugar}`
      : `${items.length} ${categoria?.plural.toLowerCase() ?? "restaurantes"} en ${lugar}`;
  return (
    `${sujeto} con menú digital en TAVI Orders: ${destacados}.` +
    mezcla +
    ` Consulta ${platos} platos con precios publicados por cada negocio y haz tu pedido en línea sin descargar apps.` +
    (fecha ? ` Última actualización: ${fecha}.` : "")
  );
}
