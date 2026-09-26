import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/pages/Landing";
import { LANDING_FAQS } from "@/content/landing-faqs";
import { PUBLIC_PAGE_HEADERS, jsonLd, seo } from "@/lib/seo";
import { faqPageLd, softwareApplicationLd } from "@/lib/structured-data";

export const Route = createFileRoute("/")({
  headers: () => PUBLIC_PAGE_HEADERS,
  head: () => ({
    ...seo({
      title: "Software para Restaurantes en Colombia: POS y Menú QR | TAVI",
      description:
        "Software para restaurantes y bares en Colombia: sistema POS, menú digital con pedidos por QR, cocina KDS, inventario, fidelización y facturación DIAN.",
      path: "/",
    }),
    scripts: [jsonLd(softwareApplicationLd), jsonLd(faqPageLd(LANDING_FAQS))],
  }),
  component: Landing,
});
