import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import type { DirectorioItem, FichaRestaurante } from "@/lib/directorio";

/**
 * Solo se ejecuta en el servidor (SSR y RPC de server functions): el
 * navegador nunca llama a la API directamente, así que no depende de CORS.
 */
function apiUrl(path: string) {
  const base = (process.env.TAVI_API_URL ?? "https://tavi.cerebiia.co").replace(/\/$/, "");
  return `${base}${path}`;
}

async function getJson<T>(path: string): Promise<T | null> {
  const res = await fetch(apiUrl(path), {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${path} respondió ${res.status}`);
  return (await res.json()) as T;
}

/** Uso directo desde server routes (sitemaps); en componentes usa `obtenerDirectorio`. */
export async function fetchDirectorio(): Promise<DirectorioItem[]> {
  const data = await getJson<{ restaurantes: DirectorioItem[] }>("/api/public/directorio/");
  return data?.restaurantes ?? [];
}

export const obtenerDirectorio = createServerFn({ method: "GET" }).handler(fetchDirectorio);

export const obtenerFicha = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => {
    if (!/^[a-z0-9-]{1,64}$/i.test(slug)) throw notFound();
    return slug.toLowerCase();
  })
  .handler(async ({ data: slug }) => {
    const ficha = await getJson<FichaRestaurante>(
      `/api/public/directorio/${encodeURIComponent(slug)}/`,
    );
    if (!ficha) throw notFound();
    return ficha;
  });
