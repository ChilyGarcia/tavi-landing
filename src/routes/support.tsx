import { createFileRoute } from "@tanstack/react-router";
import { Support } from "@/pages/Support";
import { PUBLIC_PAGE_HEADERS, breadcrumbLd, jsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/support")({
  headers: () => PUBLIC_PAGE_HEADERS,
  head: () => ({
    ...seo({
      title: "Centro de Ayuda y Soporte | TAVI Orders",
      description:
        "Soporte de TAVI Orders por WhatsApp 7 días a la semana. Resuelve dudas sobre tu menú QR, caja, cocina KDS, fidelización y configuración de tu restaurante.",
      path: "/support",
    }),
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Soporte", path: "/support" },
        ]),
      ),
    ],
  }),
  component: Support,
});
