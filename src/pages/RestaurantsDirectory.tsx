import { useState, useEffect } from "react";
import { ExternalLink, UtensilsCrossed, Pizza, Flame } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DemoModal } from "@/components/DemoModal";

const RESTAURANTS = [
  {
    name: "Mijaos",
    description: "La mejor comida rápida. Especialistas en hamburguesas artesanales y perros calientes con salsas exclusivas.",
    url: "https://mijaos.taviorders.com",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    city: "Cúcuta",
  },
  {
    name: "Sr. Pizza Pan",
    description: "Pizzas horneadas a la perfección con ingredientes frescos. El auténtico sabor tradicional que a todos encanta.",
    url: "https://sr-pizza-pan.taviorders.com",
    icon: Pizza,
    color: "text-red-500",
    bg: "bg-red-500/10",
    city: "Cúcuta",
  },
  {
    name: "El Parche",
    description: "El lugar ideal para compartir con amigos. Gran variedad de asados, picadas y bebidas para pasar el rato.",
    url: "https://el-parche.taviorders.com",
    icon: UtensilsCrossed,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    city: "Risaralda",
  }
];

export function RestaurantsDirectory() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    // Configuración SEO dinámica para Googlebot
    const originalTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute("content") : "";

    document.title = "Los Mejores Restaurantes en Cúcuta, Risaralda y Colombia | Directorio TAVI";
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Descubre el directorio de los mejores restaurantes en Cúcuta, Risaralda y Colombia recomendados por TAVI. Menús digitales, domicilios y más."
      );
    }

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute("content", originalDesc);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] selection:bg-primary/20 selection:text-primary">
      <Navbar onDemo={() => setShowDemoModal(true)} />

      <main className="flex-1 pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          
          {/* Header SEO de la página */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-primary mb-6">
              Directorio TAVI
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-slate-900 mb-6">
              Descubre los mejores <span className="text-primary">restaurantes</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Explora nuestra selección de sitios recomendados en diferentes ciudades. Conoce sus menús digitales interactivos, pide a domicilio o reserva tu mesa al instante sin descargar aplicaciones.
            </p>
          </div>

          {/* Grid de Restaurantes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RESTAURANTS.map((restaurant, idx) => (
              <div 
                key={idx}
                className="group relative flex flex-col bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${restaurant.bg} ${restaurant.color}`}>
                    <restaurant.icon className="w-8 h-8" />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    📍 {restaurant.city}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  {restaurant.name}
                </h3>
                
                <p className="text-slate-600 mb-8 flex-1 leading-relaxed">
                  {restaurant.description}
                </p>

                <a
                  href={restaurant.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-slate-900 text-white font-bold py-4 hover:bg-primary transition-colors shadow-sm"
                >
                  Ver Menú y Pedir <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          {/* CTA para dueños de restaurantes */}
          <div className="mt-24 bg-primary/5 rounded-[2.5rem] border border-primary/20 p-8 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                ¿Tienes un restaurante?
              </h2>
              <p className="text-slate-600 mb-8 text-lg">
                Únete a TAVI, digitaliza tu menú en minutos y empieza a recibir pedidos directamente por WhatsApp sin pagar comisiones por venta.
              </p>
              <a 
                href="/precios" 
                className="inline-flex rounded-full bg-primary px-8 py-4 text-base font-black text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                Crear Menú Digital Ahora
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      <DemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </div>
  );
}
