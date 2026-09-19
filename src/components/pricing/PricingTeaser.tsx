import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function PricingTeaser() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="overflow-hidden rounded-3xl border border-amber-200 bg-amber-50 relative p-8 sm:p-12 md:p-16 text-center shadow-sm">
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-200/50 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-orange-200/50 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center">

          <h2 className="font-display text-3xl font-bold tracking-tight text-amber-950 sm:text-4xl md:text-5xl max-w-3xl">
            Planes diseñados para hacer crecer tu restaurante.
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-amber-900/80 font-medium leading-relaxed">
            No somos un menú en PDF. Somos el sistema operativo completo que tu restaurante necesita
            para escalar de verdad. Sin letra pequeña.
          </p>

          <Link
            to="/precios"
            onClick={() => window.scrollTo(0, 0)}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-amber-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-amber-700"
          >
            Ver planes y precios <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
