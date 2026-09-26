import { canonicalUrl } from "@/lib/seo";

export type SitemapUrl = { path: string; lastmod?: string };

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const fecha = (iso?: string) => (iso ? iso.slice(0, 10) : undefined);

export function urlset(urls: SitemapUrl[]) {
  const body = urls
    .map(({ path, lastmod }) => {
      const mod = fecha(lastmod);
      return `  <url><loc>${escapeXml(canonicalUrl(path))}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ""}</url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function sitemapIndex(sitemaps: SitemapUrl[]) {
  const body = sitemaps
    .map(({ path, lastmod }) => {
      const mod = fecha(lastmod);
      return `  <sitemap><loc>${escapeXml(canonicalUrl(path))}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ""}</sitemap>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

export function xmlResponse(xml: string) {
  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=900, stale-while-revalidate=3600",
    },
  });
}

export const maxFecha = (fechas: Array<string | undefined>) => fechas.filter(Boolean).sort().at(-1);
