import { ArrowRight } from "lucide-react";

export function PricingCTA({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="bg-[#14110F] px-6 py-16 sm:py-24 text-center text-white">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6 text-white">
          Es momento de modernizar tu restaurante
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium">
          Únete a decenas de negocios que ya optimizaron su operación y fidelizaron a sus clientes
          con TAVI.
        </p>
        <button
          onClick={onDemo}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-amber-900/20 transition-all hover:bg-amber-500 hover:scale-105"
        >
          Agenda tu demostración gratis <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
