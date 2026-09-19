import { ArrowRight, Sparkles } from "lucide-react";
import { PRICING_FLAGS } from "@/config/pricing";

export function PricingMigrationBanner() {
  if (!PRICING_FLAGS.freeMigration) return null;

  const whatsappMessage = encodeURIComponent("Hola, uso otra plataforma y quiero cambiarme a Tavi");
  const whatsappUrl = `https://wa.me/573000000000?text=${whatsappMessage}`;

  return (
    <div className="mx-auto max-w-4xl mt-12 sm:mt-16 px-4 sm:px-6">
      <div className="rounded-3xl bg-slate-900 p-6 sm:p-10 shadow-2xl shadow-slate-900/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 group text-center md:text-left">
        
        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-3xl rounded-full pointer-events-none transition-all duration-700 group-hover:bg-primary/30" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center justify-center md:justify-start gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white mb-4 backdrop-blur-sm border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Promoción Especial
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            Migramos tu menú actual <span className="text-primary">gratis</span> con plan anual
          </h3>
          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-lg leading-relaxed mx-auto md:mx-0">
            Nuestro equipo se encarga de subir tu menú, configurar tus mesas e invitar a tu equipo
            sin costo adicional. Tú relájate y estrena sistema.
          </p>
        </div>
        
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 relative z-10 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 sm:px-8 sm:py-4 text-sm font-black text-white shadow-lg shadow-primary/30 transition-all hover:bg-amber-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/40 active:scale-95"
        >
          <span>Empezar migración</span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
