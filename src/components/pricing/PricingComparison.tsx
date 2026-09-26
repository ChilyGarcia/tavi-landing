import { Check, X } from "lucide-react";
import { PLANS, formatCOP } from "@/config/pricing";

export function PricingComparison() {
  const proPlan = PLANS.find((p) => p.id === "pro");
  const proPrice = proPlan ? proPlan.monthly : 99900;

  return (
    <div className="mt-20">
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Mientras otros te cobran extra por todo, <br className="hidden sm:inline" />
          TAVI incluye más de 12 módulos en tu tarifa plana.
        </h3>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto items-center">
        {/* Competitor Card */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 transition-all text-slate-500">
          <h4 className="text-xl font-bold text-slate-400 mb-6 flex items-center gap-2">
            Otros proveedores
          </h4>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center justify-between font-medium">
              <span className="flex items-center gap-2">
                <X className="w-4 h-4 text-rose-400" /> Software POS Base
              </span>
              <span>$90.000</span>
            </li>
            <li className="flex items-center justify-between font-medium">
              <span className="flex items-center gap-2">
                <X className="w-4 h-4 text-rose-400" /> Módulo Menú QR
              </span>
              <span>+$50.000</span>
            </li>
            <li className="flex items-center justify-between font-medium">
              <span className="flex items-center gap-2">
                <X className="w-4 h-4 text-rose-400" /> Módulo KDS (Cocina)
              </span>
              <span>+$40.000</span>
            </li>
            <li className="flex items-center justify-between font-medium">
              <span className="flex items-center gap-2">
                <X className="w-4 h-4 text-rose-400" /> Fidelización y CRM
              </span>
              <span>+$60.000</span>
            </li>
            <li className="flex justify-between text-slate-500 font-bold border-t border-slate-200 pt-4 text-lg">
              <span>Total estimado al mes</span>
              <span className="line-through decoration-rose-400 decoration-2 text-slate-400">
                $240.000
              </span>
            </li>
          </ul>
        </div>

        {/* TAVI Card */}
        <div className="rounded-3xl border-2 border-primary bg-white p-8 sm:p-10 shadow-2xl shadow-primary/20 relative md:scale-105 z-10">
          <div className="absolute -top-3.5 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-4 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-sm">
            LA FORMA INTELIGENTE
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            TAVI (Plan Pro)
          </h4>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center justify-between text-slate-700 font-medium">
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" /> Software POS Avanzado
              </span>
            </li>
            <li className="flex items-center justify-between text-slate-700 font-medium">
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" /> Menú QR interactivo
              </span>
            </li>
            <li className="flex items-center justify-between text-slate-700 font-medium">
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" /> KDS con voz
              </span>
            </li>
            <li className="flex items-center justify-between text-slate-700 font-medium">
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" /> Fidelización y Wallet
              </span>
            </li>
            <li className="flex justify-between text-slate-900 font-bold border-t border-slate-100 pt-4 text-lg">
              <span>Todo incluido por</span>{" "}
              <span className="text-primary">{formatCOP(proPrice)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
