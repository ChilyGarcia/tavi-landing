import { createFileRoute } from "@tanstack/react-router";
import Pricing from "@/pages/Pricing";
import { PRICING_FAQS } from "@/components/pricing/PricingFAQ";
import { PUBLIC_PAGE_HEADERS, breadcrumbLd, jsonLd, seo } from "@/lib/seo";
import { faqPageLd, softwareApplicationLd } from "@/lib/structured-data";

type PreciosSearch = { ciclo?: "mensual" | "anual" };

export const Route = createFileRoute("/precios")({
  validateSearch: (search: Record<string, unknown>): PreciosSearch => ({
    ciclo: search.ciclo === "mensual" || search.ciclo === "anual" ? search.ciclo : undefined,
  }),
  headers: () => PUBLIC_PAGE_HEADERS,
  head: () => ({
    ...seo({
      title: "Precios del Software para Restaurantes | TAVI Orders",
      description:
        "Planes desde $55.000/mes con IVA incluido: Esencial, Pro Fidelidad y VIP Ilimitado. Pedidos ilimitados, sin comisiones por pedido. Pago mensual o anual.",
      path: "/precios",
    }),
    scripts: [
      jsonLd(softwareApplicationLd),
      jsonLd(faqPageLd(PRICING_FAQS)),
      jsonLd(
        breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Precios", path: "/precios" },
        ]),
      ),
    ],
  }),
  component: Pricing,
});
