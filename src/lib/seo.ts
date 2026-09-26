/**
 * Helpers de SEO para el `head()` de cada ruta (TanStack Start los renderiza
 * en el HTML del servidor, que es lo que leen Google y los scrapers de
 * WhatsApp/Facebook, que no ejecutan JS).
 */
export const SITE_URL = "https://taviorders.com";
export const SITE_NAME = "TAVI Orders";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

type SeoInput = {
  title: string;
  description: string;
  /** Ruta absoluta desde la raíz ("/precios"). Se usa para canonical y og:url. */
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "restaurant.restaurant";
  noindex?: boolean;
};

export function canonicalUrl(path: string) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path.replace(/\/$/, "")}`;
}

export function seo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  noindex = false,
}: SeoInput) {
  const url = canonicalUrl(path);
  const meta = [
    { title },
    { name: "description", content: description },
    {
      name: "robots",
      content: noindex
        ? "noindex, follow"
        : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    ...(imageAlt ? [{ property: "og:image:alt", content: imageAlt }] : []),
    ...(image === DEFAULT_OG_IMAGE
      ? [
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
        ]
      : []),
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
  const links = noindex ? [] : [{ rel: "canonical", href: url }];
  return { meta, links };
}

/** `<script type="application/ld+json">` para `head().scripts`. */
export function jsonLd(data: unknown) {
  return {
    type: "application/ld+json",
    // Evita que un "</script>" dentro de los datos (nombres de platos, etc.) cierre la etiqueta.
    children: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

/**
 * Caché en el CDN de Vercel para páginas SSR públicas: el navegador siempre
 * revalida, el edge sirve la copia hasta 10 min y la refresca en segundo plano.
 */
export const PUBLIC_PAGE_HEADERS = {
  "cache-control": "public, max-age=0, s-maxage=600, stale-while-revalidate=86400",
};
