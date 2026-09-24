// src/components/pricing/PricingSavingsCalculator.tsx
import { useState, useId } from "react";
import { 
  Building2, 
  Calculator, 
  Package, 
  Tv, 
  Sparkles,
  ArrowRight,
  TrendingDown,
  Check
} from "lucide-react";
import { PLANS, formatCOP } from "@/config/pricing";

const INVENTORY_ADDON_ANNUAL = 299000;
const INVENTORY_ADDON_MONTHLY = 29900;

export function PricingSavingsCalculator() {
  const currentCostId = useId();

  const [currentCostMonthly, setCurrentCostMonthly] = useState<number>(180000);
  const [branches, setBranches] = useState<number>(1);
  const [needsInventory, setNeedsInventory] = useState<boolean>(true);
  const [needsTv, setNeedsTv] = useState<boolean>(false);

  // Plan recommendation logic:
  // 3+ sedes o TV = VIP (trae inventario incluido)
  // 2 sedes = Pro
  // 1 sede = Esencial (si pide inventario se le suma como add-on)
  let recommendedPlanId: "esencial" | "pro" | "vip" = "esencial";
  if (branches >= 3 || needsTv) {
    recommendedPlanId = "vip";
  } else if (branches === 2) {
    recommendedPlanId = "pro";
  } else {
    recommendedPlanId = "esencial";
  }

  const recommendedPlan = PLANS.find((p) => p.id === recommendedPlanId)!;
  const isInventoryIncludedInPlan = recommendedPlanId === "vip";
  const extraInventoryCostAnnual = needsInventory && !isInventoryIncludedInPlan ? INVENTORY_ADDON_ANNUAL : 0;
  const extraInventoryCostMonthly = needsInventory && !isInventoryIncludedInPlan ? INVENTORY_ADDON_MONTHLY : 0;

  const currentAnnualTotal = currentCostMonthly * 12;
  const taviAnnualTotal = recommendedPlan.annual + extraInventoryCostAnnual;
  const taviMonthlyEquivalent = Math.round(taviAnnualTotal / 12);
  const annualSavings = currentAnnualTotal - taviAnnualTotal;
  const savingsPercent = currentAnnualTotal > 0 
    ? Math.round(Math.max(0, (annualSavings / currentAnnualTotal) * 100))
    : 0;

  return (
    <div id="calculadora" className="mt-16 sm:mt-24 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/40 max-w-5xl mx-auto">
      <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary mb-3">
          <Calculator className="h-3.5 w-3.5" />
          Simulador de Inversión Operativa
        </div>
        <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Calcula y compara tu costo real de operación
        </h3>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
          Compara lo que inviertes en software base, comisiones y módulos por separado frente a la tarifa plana sin letra pequeña de TAVI.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-stretch">
        {/* Left Column: Interactive Settings */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-6 sm:p-7">
          <div>
            <label
              htmlFor={currentCostId}
              className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2"
            >
              Gasto mensual estimado en software actual
            </label>
            <div className="relative flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <span className="text-lg font-semibold text-slate-400 mr-2">$</span>
              <input
                id={currentCostId}
                type="number"
                min={0}
                step={10000}
                value={currentCostMonthly || ""}
                onChange={(e) => {
                  setCurrentCostMonthly(Math.max(0, Number(e.target.value)));
                }}
                className="w-full bg-transparent text-xl sm:text-2xl font-bold text-slate-900 outline-none p-0 border-none ring-0 focus:ring-0 placeholder:text-slate-300"
                placeholder="180000"
              />
              <span className="text-xs font-medium text-slate-400 uppercase">COP / mes</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Incluye software POS, menús QR externos, licencias extra o comisiones por pedido.
            </p>
          </div>

          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-slate-500" />
              Sedes o puntos de venta
            </span>
            <div className="grid grid-cols-3 gap-2 bg-slate-200/50 p-1 rounded-xl">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setBranches(num)}
                  className={`rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    branches === num || (num === 3 && branches >= 3)
                      ? "bg-white text-slate-900 shadow-sm font-bold border border-slate-200/60"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {num === 3 ? "3+ sedes" : `${num} ${num === 1 ? 'sede' : 'sedes'}`}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-1 border-t border-slate-200/60">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Módulos y complementos
            </span>
            
            {/* Add-on de Inventario */}
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5">
                <Package className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800">
                    Control de Inventario y Recetas
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Descuento automático de stock e insumos por plato
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={needsInventory}
                onChange={(e) => setNeedsInventory(e.target.checked)}
                className="h-4 w-4 rounded text-primary focus:ring-primary/20 accent-primary cursor-pointer shrink-0 ml-2"
              />
            </label>

            {/* Pantalla TV */}
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5">
                <Tv className="h-4 w-4 text-slate-600 shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800">
                    Pantalla TV (Llamador de Turnos)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Llamado visual de comandas y pedidos listos
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={needsTv}
                onChange={(e) => setNeedsTv(e.target.checked)}
                className="h-4 w-4 rounded text-primary focus:ring-primary/20 accent-primary cursor-pointer shrink-0 ml-2"
              />
            </label>
          </div>
        </div>

        {/* Right Column: Professional Analysis Card */}
        <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl border border-slate-900 bg-slate-950 p-6 sm:p-8 text-white shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Plan sugerido para tu negocio
                </span>
                <h4 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                  TAVI {recommendedPlan.name}
                </h4>
              </div>
              <span className="rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-bold text-primary">
                Tarifa Plana
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span className="text-slate-400">Inversión anual en TAVI:</span>
                <span className="font-semibold text-white">{formatCOP(taviAnnualTotal)} COP</span>
              </div>
              
              {needsInventory && (
                <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Package className="h-3.5 w-3.5 text-primary" /> Módulo Inventario:
                  </span>
                  <span className={`font-semibold ${isInventoryIncludedInPlan ? "text-emerald-400" : "text-slate-200"}`}>
                    {isInventoryIncludedInPlan ? "✓ Incluido en VIP" : `Add-on +${formatCOP(extraInventoryCostMonthly)}/mes`}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-slate-300">
                <span className="text-slate-400">Gasto anual actual estimado:</span>
                <span className="font-medium text-slate-400 line-through">{formatCOP(currentAnnualTotal)} COP</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span className="text-slate-400">Comisiones por pedido:</span>
                <span className="font-semibold text-emerald-400">0% (Ilimitados)</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-slate-900/90 border border-slate-800 p-4">
              {annualSavings > 0 ? (
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">Optimización estimada de costos:</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/40">
                      <TrendingDown className="h-3 w-3" /> {savingsPercent}% menos
                    </span>
                  </div>
                  <div className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-emerald-400">
                    {formatCOP(annualSavings)} <span className="text-xs font-normal text-slate-400">COP / año</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Margen que conservas en tu negocio sin pagar de más por licencias fragmentadas.
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Obtienes una infraestructura todo-en-uno más potente con soporte prioritario 7 días, KDS y fidelización sin costos ocultos.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <span className="block text-[11px] text-slate-400 uppercase tracking-wider">Costo equivalente mensual:</span>
              <span className="text-lg font-bold text-white">
                {formatCOP(taviMonthlyEquivalent)} <span className="text-xs text-slate-400 font-normal">/ mes</span>
              </span>
            </div>
            <a
              href="#planes"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all hover:bg-primary/90"
            >
              Comenzar con {recommendedPlan.name} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
