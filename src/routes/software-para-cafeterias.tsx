import { createFileRoute } from "@tanstack/react-router";
import { solucionPorSlug } from "@/content/soluciones";
import { solucionRouteOptions } from "@/lib/solucion-route";
import { SolucionPage } from "@/pages/SolucionPage";

const SLUG = "software-para-cafeterias";

export const Route = createFileRoute("/software-para-cafeterias")({
  ...solucionRouteOptions(SLUG),
  component: () => <SolucionPage solucion={solucionPorSlug(SLUG)} />,
});
