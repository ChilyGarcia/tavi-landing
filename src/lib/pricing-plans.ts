import type { ComponentType } from "react";
import { Award, Sparkles } from "lucide-react";

export type PricingPlan = {
  id: string;
  name: string;
  icon?: ComponentType<{ className?: string }>;
  monthly: number;
  tagline: string;
  features: string[];
  highlight: boolean;
};

// 10 meses cobrados, 2 gratis: (12 - 10) / 12 ≈ 16.67%, redondeado a 17%.
export const ANNUAL_DISCOUNT_PCT = Math.round(((12 - 10) / 12) * 100);

export const formatCOP = (value: number) => value.toLocaleString("es-CO");

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "esencial",
    name: "Plan Esencial",
    monthly: 55000,
    tagline: "Ideal para restaurantes que buscan ordenar la operación de caja y cocina.",
    features: [
      "POS de Caja y Turnos",
      "Menú digital con Mesas QR",
      "Sala, Comandero y mapa de mesas",
      "Pantalla de Cocina (KDS) con voz",
      "Módulo de Domicilios",
      "Multi-sede y personal (roles)",
      "Sin tarjetas de fidelidad",
    ],
    highlight: false,
  },
  {
    id: "pro",
    name: "Plan Pro Fidelidad",
    icon: Award,
    monthly: 80000,
    tagline: "Todo lo del Plan Esencial, más fidelización para hacer que tus clientes vuelvan.",
    features: [
      "Todo lo del Plan Esencial",
      "Hasta 100 Tarjetas Fidelidad",
      "Pases Google Wallet VIP",
      "Programa de Referidos",
      "Soporte prioritario",
    ],
    highlight: true,
  },
  {
    id: "vip",
    name: "Plan VIP Ilimitado",
    icon: Sparkles,
    monthly: 100000,
    tagline: "Para cadenas y restaurantes de alto flujo con fidelización sin límites.",
    features: [
      "Todo lo del Plan Pro Fidelidad",
      "Tarjetas Fidelidad ILIMITADAS",
      "Marca blanca en el pase Wallet",
      "Asesor de cuenta dedicado",
    ],
    highlight: false,
  },
];
