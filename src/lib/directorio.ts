/**
 * Tipos y reglas del directorio público (datos del backend:
 * GET /api/public/directorio/). La regla de indexación por restaurante la
 * decide el backend (`indexable`); aquí vive la de las páginas de ciudad y
 * categoría.
 */
export type DirectorioItem = {
  slug: string;
  codigo_publico: string;
  nombre: string;
  descripcion: string;
  categoria_negocio: string;
  ciudad: string;
  ciudad_slug: string;
  ruta_publica: string;
  logo: string | null;
  total_productos: number;
  indexable: boolean;
  actualizado_en: string;
};

export type HorarioDia = { dia: number; abierto: boolean; apertura: string; cierre: string };

export type SedePublica = {
  nombre: string;
  direccion: string;
  ciudad: string;
  latitud: number | null;
  longitud: number | null;
  horarios_atencion: { activo?: boolean; dias?: HorarioDia[] } | null;
};

export type ProductoPublico = {
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: string | null;
};

export type SeccionMenu = { nombre: string; descripcion: string; productos: ProductoPublico[] };

export type RedSocial = { icono?: string; usuario?: string; url: string };

export type FichaRestaurante = DirectorioItem & {
  telefono: string;
  banner: string | null;
  redes_sociales: RedSocial[];
  sedes: SedePublica[];
  secciones: SeccionMenu[];
};

/** Mínimo de restaurantes indexables para indexar una página de ciudad o categoría. */
export const MIN_RESTAURANTES_PAGINA_INDEXABLE = 3;

type Categoria = { slug: string; plural: string; singular: string };

/** Claves = `CategoriaNegocio` del backend. */
export const CATEGORIAS: Record<string, Categoria> = {
  RESTAURANTE: { slug: "restaurantes", plural: "Restaurantes", singular: "restaurante" },
  PIZZERIA: { slug: "pizzerias", plural: "Pizzerías", singular: "pizzería" },
  COMIDAS_RAPIDAS: {
    slug: "comidas-rapidas",
    plural: "Comidas rápidas",
    singular: "comidas rápidas",
  },
  CAFETERIA: { slug: "cafeterias", plural: "Cafeterías", singular: "cafetería" },
  PANADERIA: { slug: "panaderias", plural: "Panaderías", singular: "panadería" },
  BAR: { slug: "bares", plural: "Bares", singular: "bar" },
  ASADERO: { slug: "asaderos", plural: "Asaderos", singular: "asadero" },
  HELADERIA: { slug: "heladerias", plural: "Heladerías", singular: "heladería" },
  POSTRES: { slug: "postres", plural: "Postres", singular: "postres" },
  SUSHI: { slug: "sushi", plural: "Sushi", singular: "sushi" },
};

export function categoriaDe(clave: string): Categoria | null {
  return CATEGORIAS[clave] ?? null;
}

export function categoriaPorSlug(slug: string): (Categoria & { clave: string }) | null {
  const entry = Object.entries(CATEGORIAS).find(([, c]) => c.slug === slug);
  return entry ? { ...entry[1], clave: entry[0] } : null;
}

export type Ciudad = { slug: string; nombre: string; restaurantes: DirectorioItem[] };

/** Agrupa por ciudad conservando el nombre más frecuente con que la escriben las sedes. */
export function agruparPorCiudad(items: DirectorioItem[]): Ciudad[] {
  const map = new Map<string, DirectorioItem[]>();
  for (const item of items) {
    map.set(item.ciudad_slug, [...(map.get(item.ciudad_slug) ?? []), item]);
  }
  return [...map.entries()]
    .map(([slug, restaurantes]) => ({ slug, nombre: nombreCiudad(restaurantes), restaurantes }))
    .sort(
      (a, b) => b.restaurantes.length - a.restaurantes.length || a.nombre.localeCompare(b.nombre),
    );
}

function nombreCiudad(items: DirectorioItem[]): string {
  const conteo = new Map<string, number>();
  for (const i of items) conteo.set(i.ciudad, (conteo.get(i.ciudad) ?? 0) + 1);
  const [nombre] = [...conteo.entries()].sort((a, b) => b[1] - a[1])[0] ?? ["Colombia"];
  return nombre || "Colombia";
}

export function categoriasPresentes(items: DirectorioItem[]) {
  const claves = [...new Set(items.map((i) => i.categoria_negocio))].filter((c) => CATEGORIAS[c]);
  return claves.map((clave) => ({
    clave,
    ...CATEGORIAS[clave],
    restaurantes: items.filter((i) => i.categoria_negocio === clave),
  }));
}

export function paginaIndexable(items: DirectorioItem[]) {
  return items.filter((i) => i.indexable).length >= MIN_RESTAURANTES_PAGINA_INDEXABLE;
}

const COP = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatoPrecio(precio: string) {
  return COP.format(Number(precio));
}

/** Enlace al menú de pedidos (app de TAVI). Con subdominio propio usa ese link. */
export function urlMenuPedidos(item: Pick<DirectorioItem, "slug" | "codigo_publico">) {
  const tieneSubdominio = item.slug !== item.codigo_publico.toLowerCase();
  return tieneSubdominio
    ? `https://${item.slug}.taviorders.com/menu/${item.slug}`
    : `https://app.taviorders.com/menu/${item.codigo_publico}`;
}
