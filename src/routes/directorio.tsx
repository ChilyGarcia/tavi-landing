import { createFileRoute } from "@tanstack/react-router";
import { RestaurantsDirectory } from "@/pages/RestaurantsDirectory";
import { PUBLIC_PAGE_HEADERS, breadcrumbLd, jsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/directorio")({
  headers: () => PUBLIC_PAGE_HEADERS,
  head: () => ({
    ...seo({
      title: "Restaurantes con Menú Digital en Colombia | Directorio TAVI",
      description:
        "Directorio de restaurantes con menú digital en Cúcuta y Colombia. Mira sus cartas con precios y haz tu pedido en línea sin descargar apps.",
      path: "/directorio",
    }),
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Directorio", path: "/directorio" },
        ]),
      ),
    ],
  }),
  component: RestaurantsDirectory,
});
