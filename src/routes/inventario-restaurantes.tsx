import { createFileRoute } from "@tanstack/react-router";
import { solucionPorSlug } from "@/content/soluciones";
import { solucionRouteOptions } from "@/lib/solucion-route";
import { SolucionPage } from "@/pages/SolucionPage";

const SLUG = "inventario-restaurantes";

export const Route = createFileRoute("/inventario-restaurantes")({
  ...solucionRouteOptions(SLUG),
  component: () => <SolucionPage solucion={solucionPorSlug(SLUG)} />,
});
