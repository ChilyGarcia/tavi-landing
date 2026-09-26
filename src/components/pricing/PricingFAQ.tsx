import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PRICING_FLAGS } from "@/config/pricing";

export const PRICING_FAQS = [
  ...(PRICING_FLAGS.dianAvailable
    ? [
        {
          q: "¿Cómo funciona la Facturación Electrónica DIAN?",
          a: "Los planes Pro y VIP incluyen 30 facturas mensuales. Para el plan Esencial o si necesitas más facturas, puedes adquirir bolsas adicionales que no vencen durante 6 meses.",
        },
      ]
    : []),
  {
    q: "¿Cuáles son los métodos de pago aceptados para suscribirse?",
    a: "Aceptamos pagos por transferencia bancaria (Bancolombia), Nequi, Daviplata y tarjetas de crédito/débito a través de link de pago seguro.",
  },
  {
    q: "¿Cuánto tiempo tarda la configuración y migración?",
    a: "La migración es gratuita al adquirir un plan anual y nuestro equipo se encarga de dejar tu sistema configurado y listo para operar en 24 a 48 horas hábiles.",
  },
  {
    q: "¿Cómo funciona el soporte y capacitación?",
    a: "Brindamos soporte 7 días a la semana vía WhatsApp. Además, todos nuestros planes incluyen sesiones de capacitación remota para asegurar que todo tu equipo aprenda a usar el sistema rápidamente.",
  },
];

export function PricingFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-white py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 text-center mb-12">
          Preguntas Frecuentes
        </h2>
        <div className="space-y-4">
          {PRICING_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex w-full items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${openIdx === idx ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIdx === idx ? "max-h-48" : "max-h-0"}`}
              >
                <div className="p-5 sm:p-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
