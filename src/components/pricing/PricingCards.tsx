import { Check } from "lucide-react";
import {
  PLANS,
  type BillingCycle,
  formatCOP,
  annualMonthlyEquiv,
  annualSavings,
  perDay,
  PRICING_FLAGS,
} from "@/config/pricing";

interface PricingCardsProps {
  billingCycle: BillingCycle;
  onDemo: () => void;
}

export function PricingCards({ billingCycle, onDemo }: PricingCardsProps) {
  // We render PLANS directly in the order defined in pricing.ts

  return (
    <section id="planes" className="bg-[#FAF9F6] pb-16 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Desktop: Grid (Esencial, Pro, VIP) | Mobile: Carousel (Pro, Esencial, VIP) */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch md:items-start overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory">
          {/* We map PLANS for desktop, but for mobile we might need a different order? 
              Actually flex order is easiest. */}
          {PLANS.map((plan) => {
            const isPro = plan.id === "pro";
            const monthlyPrice =
              billingCycle === "monthly" ? plan.monthly : annualMonthlyEquiv(plan);

            return (
              <div
                key={plan.id}
                className={`snap-center shrink-0 w-[85vw] md:w-auto relative flex h-full flex-col rounded-3xl p-6 sm:p-8 transition-all duration-300 bg-white text-slate-900 ${
                  isPro
                    ? "border-2 border-primary shadow-xl shadow-primary/20 md:scale-105 z-10"
                    : "border border-slate-200 shadow-sm hover:shadow-md"
                }`}
              >
                {isPro && (
                  <div className="absolute -top-3.5 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-4 py-1 text-[11px] font-black uppercase tracking-wider text-primary-foreground shadow-sm">
                    {"badge" in plan ? plan.badge : "MÁS POPULAR"}
                  </div>
                )}

                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-sm min-h-[40px] leading-relaxed text-slate-500">
                  {plan.forWho}
                </p>

                <div className="mt-6 flex flex-col">
                  {billingCycle === "annual" && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm line-through text-slate-400">
                        {formatCOP(plan.monthly)}
                      </span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                        Ahorras {formatCOP(annualSavings(plan))} al año
                      </span>
                    </div>
                  )}

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tight">
                      {formatCOP(monthlyPrice)}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      /mes {PRICING_FLAGS.pricesIncludeVAT ? "IVA incl." : "+ IVA"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {billingCycle === "annual" ? (
                      <p className="text-xs font-medium text-slate-500">
                        Facturado anualmente {formatCOP(plan.annual)}
                      </p>
                    ) : (
                      <p className="text-xs opacity-0">Espaciador</p>
                    )}
                    <span className={`text-xs font-bold ${isPro ? "text-primary" : "text-amber-600"}`}>
                      ≈ {formatCOP(perDay(plan, billingCycle))} al día
                    </span>
                  </div>
                </div>

                {/* Limits Chips */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${isPro ? "bg-primary/10 text-primary/80" : "bg-slate-100 text-slate-700"}`}>
                    {plan.limits.users === -1 ? "Usuarios ilimitados" : `${plan.limits.users} usuarios`}
                  </span>
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${isPro ? "bg-primary/10 text-primary/80" : "bg-slate-100 text-slate-700"}`}>
                    {plan.limits.branches === -1 ? "Sedes ilimitadas" : `${plan.limits.branches} sede${plan.limits.branches > 1 ? "s" : ""}`}
                  </span>
                  {plan.limits.loyaltyCards !== 0 && (
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${isPro ? "bg-primary/10 text-primary/80" : "bg-slate-100 text-slate-700"}`}>
                      {plan.limits.loyaltyCards === -1 ? "Tarjetas ilimitadas" : `${plan.limits.loyaltyCards} tarjetas VIP`}
                    </span>
                  )}
                </div>

                <div className="my-8 h-px w-full bg-slate-100" />

                <ul className="flex-1 space-y-4 mb-8">
                  {plan.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${isPro ? "text-primary" : "text-amber-600"}`} />
                      <span className="text-sm text-slate-700">
                        {highlight.text}
                     
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-3">
                  <button
                    onClick={onDemo}
                    className={`w-full rounded-full py-3 px-4 text-sm font-bold transition-all ${
                      isPro
                        ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20"
                        : "bg-white text-slate-900 border-2 border-primary hover:bg-primary/5 shadow-sm"
                    }`}
                  >
                    Prueba el sistema en vivo
                  </button>

                  <a
                    href="#tabla-completa"
                    className="text-center text-xs font-medium text-slate-500 underline-offset-4 hover:underline hover:text-slate-900"
                  >
                    Ver todo lo que incluye ↓
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
