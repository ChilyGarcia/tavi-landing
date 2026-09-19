// src/components/pricing/PricingSavingsCalculator.tsx
import { useState, useId } from "react";
import { Calculator, Sparkles, TrendingDown } from "lucide-react";
import { PLANS, formatCOP } from "@/config/pricing";

export function PricingSavingsCalculator() {
  const currentCostId = useId();

  const [currentCostMonthly, setCurrentCostMonthly] = useState<number>(180000);
  const [branches, setBranches] = useState<number>(1);
  const [needsTv, setNeedsTv] = useState<boolean>(false);

  // Recommended plan: Sedes > 2 o TV = VIP; 2 sedes = Pro; 1 sede = Esencial
  let recommendedPlanId: "esencial" | "pro" | "vip" = "esencial";
  if (branches >= 3 || needsTv) {
    recommendedPlanId = "vip";
  } else if (branches === 2) {
    recommendedPlanId = "pro";
  } else {
    recommendedPlanId = "esencial";
  }

  const recommendedPlan = PLANS.find((p) => p.id === recommendedPlanId)!;

  // Total current monthly cost
  const currentAnnualTotal = currentCostMonthly * 12;
  const taviAnnualTotal = recommendedPlan.annual;
  const annualSavings = currentAnnualTotal - taviAnnualTotal;

  return (
    <div id="calculadora" className="mt-12 sm:mt-20 rounded-[2.5rem] border border-slate-200 bg-white p-5 sm:p-12 shadow-sm max-w-5xl mx-auto">
      <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-10">
        <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          ¿Cuánto pagas hoy?
        </h3>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-600">
          Ingresa lo que pagas en tu proveedor actual y descubre cuánto podrías ahorrar al año
          eligiendo la tarifa plana de TAVI.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 items-center">
        {/* Controls Column */}
        <div className="space-y-6 sm:space-y-8 rounded-3xl border border-slate-100 bg-slate-50/50 p-5 sm:p-8">
          <div>
            <label
              htmlFor={currentCostId}
              className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500 mb-2 sm:mb-3"
            >
              Mi plataforma actual me cuesta (mensual):
            </label>
            <div className="relative flex items-center rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 sm:px-6 sm:py-4 shadow-sm focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
              <span className="text-xl sm:text-2xl font-bold text-slate-400 mr-2">$</span>
              <input
                id={currentCostId}
                type="number"
                min={0}
                step={5000}
                value={currentCostMonthly || ""}
                onChange={(e) => {
                  setCurrentCostMonthly(Math.max(0, Number(e.target.value)));
                }}
                className="w-full bg-transparent text-2xl sm:text-4xl font-black text-slate-900 outline-none p-0 border-none ring-0 focus:ring-0 placeholder:text-slate-300"
                placeholder="180000"
              />
            </div>
          </div>

          <div>
            <span className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500 mb-2 sm:mb-3">
              ¿Cuántas sedes tienes?
            </span>
            <div className="flex bg-slate-200/60 p-1.5 rounded-2xl">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setBranches(num)}
                  className={`flex-1 rounded-xl py-2 sm:py-3 text-[11px] sm:text-sm font-bold transition-all cursor-pointer ${
                    branches === num || (num === 3 && branches >= 3)
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {num === 3 ? "3 o más" : `${num} ${num === 1 ? 'sede' : 'sedes'}`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500 mb-2 sm:mb-3">
              ¿Necesitas Pantalla TV (Turnos)?
            </span>
            <div className="flex bg-slate-200/60 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => setNeedsTv(true)}
                className={`flex-1 rounded-xl py-2 sm:py-3 text-[11px] sm:text-sm font-bold transition-all cursor-pointer ${
                  needsTv
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Sí, la necesito
              </button>
              <button
                type="button"
                onClick={() => setNeedsTv(false)}
                className={`flex-1 rounded-xl py-2 sm:py-3 text-[11px] sm:text-sm font-bold transition-all cursor-pointer ${
                  !needsTv
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                No por ahora
              </button>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="relative flex flex-col items-center justify-center h-full rounded-3xl border-2 border-emerald-400 bg-emerald-50 p-6 sm:p-10 text-center shadow-sm overflow-hidden min-h-[300px]">
          <div className="relative z-10 w-full flex flex-col items-center">
            {annualSavings > 0 ? (
              <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <p className="text-xs sm:text-sm text-emerald-800 font-bold mb-2">
                  Al pasarte a TAVI (Anual), tú...
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <TrendingDown className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500 shrink-0" />
                  <span className="font-display text-3xl sm:text-5xl font-black text-emerald-600 tracking-tight">
                    Ahorrarías
                  </span>
                </div>
                <div className="mt-1 sm:mt-2 text-4xl sm:text-6xl font-black text-emerald-700 tabular-nums tracking-tighter">
                  {formatCOP(annualSavings)}
                </div>
                <span className="mt-3 sm:mt-4 block text-[10px] sm:text-sm font-bold text-emerald-800/80">
                  AL AÑO COMPARADO CON TU GASTO ACTUAL
                </span>
              </div>
            ) : (
              <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-white border border-amber-200 shadow-sm max-w-sm animate-in fade-in duration-500">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-amber-500 mx-auto mb-3" />
                <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                  Pagas casi lo mismo, pero con TAVI tienes <span className="text-amber-600">Pedidos Ilimitados</span>, KDS con voz y una suite completa de fidelización.
                </p>
              </div>
            )}

            <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-emerald-200 w-full flex flex-col sm:flex-row justify-center items-center gap-2">
              <span className="text-[11px] sm:text-sm font-bold text-emerald-800/60 uppercase tracking-wider">Costo TAVI Anual:</span>
              <span className="text-base sm:text-lg font-black text-emerald-800 bg-white px-3 py-1.5 rounded-lg border border-emerald-100">
                {formatCOP(taviAnnualTotal)} COP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
