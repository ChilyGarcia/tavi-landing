import type { FichaRestaurante, HorarioDia } from "@/lib/directorio";
import { canonicalUrl } from "@/lib/seo";

// horarios_atencion.dias[].dia: 0 = domingo ... 6 = sábado (como Date#getDay).
const DIAS_SCHEMA = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const SERVES_CUISINE: Record<string, string> = {
  PIZZERIA: "Pizza",
  COMIDAS_RAPIDAS: "Comida rápida",
  CAFETERIA: "Café",
  PANADERIA: "Panadería",
  ASADERO: "Asados",
  HELADERIA: "Helados",
  POSTRES: "Postres",
  SUSHI: "Sushi",
};

function openingHours(dias: HorarioDia[] | undefined) {
  return (dias ?? [])
    .filter((d) => d.abierto && d.apertura && d.cierre && DIAS_SCHEMA[d.dia])
    .map((d) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${DIAS_SCHEMA[d.dia]}`,
      opens: d.apertura.slice(0, 5),
      closes: d.cierre.slice(0, 5),
    }));
}

/**
 * JSON-LD `Restaurant` + `Menu` con datos reales de la ficha. Los campos sin
 * dato se omiten (nunca se inventan).
 */
export function restaurantLd(ficha: FichaRestaurante) {
  const url = canonicalUrl(ficha.ruta_publica);
  const sede = ficha.sedes[0];
  const horarios = sede?.horarios_atencion?.activo ? openingHours(sede.horarios_atencion.dias) : [];
  const imagen = ficha.banner ?? ficha.logo;
  const cocina = SERVES_CUISINE[ficha.categoria_negocio];
  const tipo =
    ficha.categoria_negocio === "BAR"
      ? "BarOrPub"
      : ficha.categoria_negocio === "CAFETERIA"
        ? "CafeOrCoffeeShop"
        : "Restaurant";

  return {
    "@context": "https://schema.org",
    "@type": tipo,
    "@id": `${url}#restaurante`,
    name: ficha.nombre,
    url,
    ...(ficha.descripcion ? { description: ficha.descripcion } : {}),
    ...(imagen ? { image: imagen } : {}),
    ...(ficha.logo ? { logo: ficha.logo } : {}),
    ...(ficha.telefono ? { telephone: ficha.telefono } : {}),
    ...(cocina ? { servesCuisine: cocina } : {}),
    ...(sede
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: sede.direccion,
            addressLocality: sede.ciudad,
            addressCountry: "CO",
          },
        }
      : {}),
    ...(sede?.latitud != null && sede?.longitud != null
      ? { geo: { "@type": "GeoCoordinates", latitude: sede.latitud, longitude: sede.longitud } }
      : {}),
    ...(horarios.length ? { openingHoursSpecification: horarios } : {}),
    ...(ficha.redes_sociales.length ? { sameAs: ficha.redes_sociales.map((r) => r.url) } : {}),
    hasMenu: {
      "@type": "Menu",
      name: `Menú de ${ficha.nombre}`,
      url,
      inLanguage: "es-CO",
      hasMenuSection: ficha.secciones.map((seccion) => ({
        "@type": "MenuSection",
        name: seccion.nombre,
        ...(seccion.descripcion ? { description: seccion.descripcion } : {}),
        hasMenuItem: seccion.productos.map((p) => ({
          "@type": "MenuItem",
          name: p.nombre,
          ...(p.descripcion ? { description: p.descripcion } : {}),
          ...(p.imagen ? { image: p.imagen } : {}),
          offers: { "@type": "Offer", price: Number(p.precio).toFixed(0), priceCurrency: "COP" },
        })),
      })),
    },
  };
}
