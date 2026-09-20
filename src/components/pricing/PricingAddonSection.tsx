import { Package, ChefHat, TrendingUp, Check } from "lucide-react";

interface PricingAddonSectionProps {
  onDemo: () => void;
}

export function PricingAddonSection({ onDemo }: PricingAddonSectionProps) {
  return (
    <section id="inventario-addon" className="bg-[#FAF9F6] py-16 px-6 border-y border-slate-200/60">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Column (Text & Features) */}
          <div className="w-full lg:w-[60%] flex flex-col">
            <div className="mb-6">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4">
                Add-on
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Inventario y Recetas — <span className="text-slate-500 font-medium">Sabe cuánto te cuesta cada plato.</span>
              </h2>
              <p className="text-lg text-slate-600 italic">
                Cada pedido descuenta ingredientes automáticamente. Sin planillas, sin sorpresas al cierre.
              </p>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Inventario en tiempo real.</h4>
                  <p className="text-slate-600 text-sm">Cada ingrediente con stock actual, unidad y alerta de mínimo.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ChefHat className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Recetas vinculadas al menú.</h4>
                  <p className="text-slate-600 text-sm">Defines la receta una vez; cada venta descuenta sola.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Costo real por plato.</h4>
                  <p className="text-slate-600 text-sm">Compara lo que te cuesta producir vs lo que cobras.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl font-black text-slate-900">$29.900<span className="text-sm font-medium text-slate-500">/mes + IVA</span></span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">En planes Esencial y Pro.</p>
                  
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-bold text-[#065F46]">
                    <Check className="h-3.5 w-3.5" /> Incluido en VIP
                  </span>
                </div>
                
                <button
                  onClick={onDemo}
                  className="rounded-full border-2 border-primary py-2.5 px-6 text-sm font-bold text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
                >
                  Agregar a mi plan
                </button>
              </div>
            </div>

            {/* Upsell Visual (Desktop Only) */}
            <div className="hidden lg:flex flex-col">
              <p className="text-sm text-slate-500 italic mb-4">
                ¿Ya estás en Pro? Por $70.000 más pásate a VIP y llévate inventario + todo ilimitado.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* Pro + Addon */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col">
                  <h5 className="font-bold text-slate-700">Pro + Inventario</h5>
                  <div className="text-sm text-slate-500 mb-2">$99.900 + $29.900</div>
                  <div className="h-px bg-slate-100 my-2 w-12"></div>
                  <div className="font-black text-lg text-slate-900 mb-3">$129.800/mes</div>
                  
                  <div className="text-xs text-slate-500 mb-4 flex-1">
                    10 usuarios · 2 sedes
                  </div>
                  
                  <button onClick={onDemo} className="w-full py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    Elegir Pro + add-on
                  </button>
                </div>

                {/* VIP */}
                <div className="rounded-xl border-2 border-primary bg-primary/5 p-4 flex flex-col relative overflow-hidden">
                  <h5 className="font-bold text-primary">VIP Ilimitado</h5>
                  <div className="text-sm text-primary/70 mb-2 invisible">Spacer</div>
                  <div className="h-px bg-primary/20 my-2 w-12 invisible"></div>
                  <div className="font-black text-lg text-slate-900 mb-3">$199.900<span className="text-sm font-medium text-slate-500">/mes</span></div>
                  
                  <ul className="text-xs text-slate-700 space-y-1 mb-4 flex-1">
                    <li className="font-bold flex items-center gap-1"><Check className="h-3 w-3 text-primary" /> Todo ilimitado</li>
                    <li className="font-bold flex items-center gap-1"><Check className="h-3 w-3 text-primary" /> + Inventario incluido</li>
                    <li className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-500" /> + Pantalla TV</li>
                    <li className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-500" /> + Asesor dedicado</li>
                  </ul>
                  
                  <button onClick={onDemo} className="w-full py-2 text-xs font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                    Pasarme a VIP
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Image Slot) */}
          <div className="w-full lg:w-[40%] flex justify-center">
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[3/4] bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-50"></div>
              {/* Placeholder for the screenshot */}
              <div className="relative z-10 text-center space-y-4">
                <Package className="h-12 w-12 text-slate-300 mx-auto" />
                <p className="text-sm font-medium text-slate-400">
                  Panel de Inventario y Recetas<br/>(Próximamente Captura Real)
                </p>
              </div>
              
              {/* Optional: Actual image tag for later 
              <img 
                src="/images/features/inventory-panel.png" 
                alt="Panel de inventario TAVI mostrando stock de ingredientes y costo por plato"
                className="absolute inset-0 w-full h-full object-cover"
              />
              */}
            </div>
          </div>

        </div>
        
        {/* Upsell Visual (Mobile Only) */}
        <div className="flex lg:hidden flex-col mt-8">
          <p className="text-sm text-slate-500 italic mb-4 text-center">
            ¿Ya estás en Pro? Por $70.000 más pásate a VIP y llévate inventario + todo ilimitado.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {/* Pro + Addon */}
             <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-bold text-slate-700">Pro + Inventario</h5>
                <div className="font-black text-slate-900">$129.800</div>
              </div>
              <div className="text-xs text-slate-500 mb-4">
                10 usuarios · 2 sedes
              </div>
              <button onClick={onDemo} className="w-full py-2 text-xs font-bold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors mt-auto">
                Elegir Pro + add-on
              </button>
            </div>

            {/* VIP */}
            <div className="rounded-xl border-2 border-primary bg-primary/5 p-4 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-bold text-primary">VIP Ilimitado</h5>
                <div className="font-black text-slate-900">$199.900</div>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 mb-4">
                <li className="font-bold flex items-center gap-1"><Check className="h-3 w-3 text-primary" /> Todo ilimitado</li>
                <li className="font-bold flex items-center gap-1"><Check className="h-3 w-3 text-primary" /> + Inventario incluido</li>
              </ul>
              <button onClick={onDemo} className="w-full py-2 text-xs font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors mt-auto shadow-sm">
                Pasarme a VIP
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
