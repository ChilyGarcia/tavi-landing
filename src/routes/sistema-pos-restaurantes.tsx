import { createFileRoute } from "@tanstack/react-router";
import { solucionPorSlug } from "@/content/soluciones";
import { solucionRouteOptions } from "@/lib/solucion-route";
import { SolucionPage } from "@/pages/SolucionPage";

const SLUG = "sistema-pos-restaurantes";

export const Route = createFileRoute("/sistema-pos-restaurantes")({
  ...solucionRouteOptions(SLUG),
  component: () => <SolucionPage solucion={solucionPorSlug(SLUG)} />,
});
