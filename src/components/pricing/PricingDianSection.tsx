import { Rocket, Bell, FileText, Sparkles } from "lucide-react";
import { PRICING_FLAGS, DIAN_BUNDLES, formatCOP } from "@/config/pricing";

export function PricingDianSection() {
  if (!PRICING_FLAGS.dianAvailable) {
    return (
      <div className="mx-auto max-w-4xl mt-12 px-6">
        <div className="rounded-[2.5rem] border-2 border-amber-200 bg-white p-8 sm:p-12 text-center relative overflow-hidden shadow-sm hover:shadow-md transition-all group">
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">
              Facturación Electrónica DIAN Integrada
            </h3>

            <p className="text-slate-600 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
              Estamos integrando la conexión directa con la DIAN para que puedas emitir facturas
              electrónicas desde el mismo sistema donde tomas los pedidos. Todo en un solo lugar,
              sin pagar otro proveedor.
            </p>

            {/* CTA Button */}
            <a
              href="https://wa.me/573000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-black text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-1 hover:bg-amber-600"
            >
              <Bell className="w-5 h-5 fill-white/20" />
              <span>Avísame cuando esté listo</span>
            </a>
          </div>

          {/* Large faint background icon */}
          <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700">
            <Rocket className="w-96 h-96" />
          </div>
        </div>
      </div>
    );
  }

  // Active state (When DIAN is available)
  return (
    <div className="mx-auto max-w-5xl mt-12 sm:mt-24 px-4 sm:px-6">
      <div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 sm:p-12 shadow-sm relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center mb-8 sm:mb-12">
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Bolsas de Facturas Electrónicas{" "}
            <span className="text-primary block sm:inline mt-1 sm:mt-0">DIAN</span>
          </h3>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            El plan Esencial no trae facturas incluidas. <br className="hidden sm:block" />
            Compras bolsas que no vencen en 6 meses.
          </p>
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 relative z-10">
          {DIAN_BUNDLES.map((bundle) => (
            <div
              key={bundle.id}
              className="flex flex-row sm:flex-col items-center justify-between sm:justify-start rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 text-left sm:text-center shadow-sm transition hover:border-primary/20 hover:shadow-md"
            >
              <div className="flex items-center gap-4 sm:gap-0 sm:flex-col">
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-amber-50 sm:mb-4">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-black text-slate-900 leading-none">
                    {bundle.invoices}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1 sm:mt-0 sm:mb-4">
                    facturas
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/573000000000?text=Hola,%20quisiera%20cotizar%20las%20bolsas%20de%20facturaci%C3%B3n%20electr%C3%B3nica%20DIAN."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-bold text-primary bg-primary/10 hover:bg-primary/20 transition-colors px-4 py-2 rounded-full sm:mt-auto shrink-0"
              >
                Cotizar
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
