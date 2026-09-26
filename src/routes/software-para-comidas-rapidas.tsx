import { createFileRoute } from "@tanstack/react-router";
import { solucionPorSlug } from "@/content/soluciones";
import { solucionRouteOptions } from "@/lib/solucion-route";
import { SolucionPage } from "@/pages/SolucionPage";

const SLUG = "software-para-comidas-rapidas";

export const Route = createFileRoute("/software-para-comidas-rapidas")({
  ...solucionRouteOptions(SLUG),
  component: () => <SolucionPage solucion={solucionPorSlug(SLUG)} />,
});
