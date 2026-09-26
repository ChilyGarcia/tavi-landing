/**
 * Páginas estáticas indexables (fuente del sitemap de páginas).
 * `actualizado` = fecha del último cambio real de contenido: actualízala al
 * editar el copy de la página (es el `lastmod` que ve Google).
 */
export type PaginaEstatica = { path: string; actualizado: string };

export const PAGINAS_ESTATICAS: PaginaEstatica[] = [
  { path: "/", actualizado: "2026-09-25" },
  { path: "/precios", actualizado: "2026-09-25" },
  { path: "/support", actualizado: "2026-09-25" },
];
