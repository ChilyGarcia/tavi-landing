import { solucionPorSlug } from "@/content/soluciones";
import { PUBLIC_PAGE_HEADERS, breadcrumbLd, jsonLd, seo } from "@/lib/seo";
import { faqPageLd } from "@/lib/structured-data";

/** Opciones compartidas (`headers` + `head`) de las rutas de páginas pilar. */
export function solucionRouteOptions(slug: string) {
  const s = solucionPorSlug(slug);
  const path = `/${s.slug}`;
  return {
    headers: () => PUBLIC_PAGE_HEADERS,
    head: () => ({
      ...seo({ title: s.title, description: s.description, path }),
      scripts: [
        jsonLd(faqPageLd(s.faqs)),
        jsonLd(
          breadcrumbLd([
            { name: "Inicio", path: "/" },
            { name: s.h1, path },
          ]),
        ),
      ],
    }),
  };
}
