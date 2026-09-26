import { type BillingCycle } from "@/config/pricing";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingHeroProps {
  billingCycle: BillingCycle;
  setBillingCycle: (cycle: BillingCycle) => void;
}

export function PricingHero({ billingCycle, setBillingCycle }: PricingHeroProps) {
  return (
    <section className="bg-[#FAF9F6] pt-12 pb-12 md:pt-24 md:pb-16 px-6 text-center relative">
      <div className="mx-auto max-w-3xl">
        {/* Mobile Back Button */}
        <div className="mb-8 flex justify-center md:hidden">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors bg-slate-100/80 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>
        </div>

        <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
          Un plan para cada etapa de <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
            tu negocio
          </span>
        </h1>

        <p className="mt-6 mx-auto max-w-2xl text-lg text-slate-600 md:text-xl font-medium">
          Pedidos ilimitados en todos los planes. Sin comisiones por pedido. El precio que ves es el
          que pagas.
        </p>

        {/* Toggle Mensual / Anual */}
        <div
          className="mt-10 flex items-center justify-center gap-4"
          role="radiogroup"
          aria-label="Ciclo de facturación"
        >
          <button
            role="radio"
            aria-checked={billingCycle === "monthly"}
            onClick={() => setBillingCycle("monthly")}
            className={`font-medium transition-colors ${
              billingCycle === "monthly" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Mensual
          </button>

          <button
            role="switch"
            aria-checked={billingCycle === "annual"}
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
            className={`relative flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
              billingCycle === "annual" ? "bg-amber-600" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                billingCycle === "annual" ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>

          <button
            role="radio"
            aria-checked={billingCycle === "annual"}
            onClick={() => setBillingCycle("annual")}
            className={`flex items-center gap-2 font-medium transition-colors ${
              billingCycle === "annual" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Anual
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
              2 MESES GRATIS
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
