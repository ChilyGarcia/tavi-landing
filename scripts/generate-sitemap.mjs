#!/usr/bin/env node
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

const SITE_URL = (process.env.SITE_URL ?? "https://taviorders.com").replace(/\/$/, "");

// Solo páginas reales (documentos con URL propia). Las anclas del landing
// (#features, #pricing, #how, #showcase) viven dentro de "/" y los
// crawlers ignoran el fragmento, así que no se listan como URLs aparte.
const routes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/support", changefreq: "monthly", priority: "0.5" },
];

const today = new Date().toISOString().slice(0, 10);

const urls = routes
  .map(
    ({ path: routePath, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${routePath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(path.join(publicDir, "sitemap.xml"), xml);

console.log(
  `sitemap.xml generado con ${routes.length} rutas -> ${path.join(publicDir, "sitemap.xml")}`,
);
