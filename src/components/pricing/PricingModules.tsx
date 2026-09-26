import {
  QrCode,
  Calculator,
  Package,
  Volume2,
  Tv,
  Gift,
  Users,
  Receipt,
  BarChart3,
  Headset,
} from "lucide-react";

const MODULES = [
  {
    id: "pos",
    title: "Punto de Venta Completo",
    icon: Calculator,
    description:
      "Toma pedidos, divide cuentas, gestiona propinas y acepta pagos mixtos sin enredos. Cierre de caja al centavo y en tiempo real.",
    span: "md:col-span-2 lg:col-span-2",
    gradient: "from-amber-500/10 to-orange-500/5",
    iconColor: "text-amber-600",
  },
  {
    id: "menu-qr",
    title: "Menú Digital QR",
    icon: QrCode,
    description: "Múltiples catálogos y menús sin comisiones. Actualizaciones al instante.",
    span: "md:col-span-1 lg:col-span-1",
    gradient: "from-blue-500/10 to-cyan-500/5",
    iconColor: "text-blue-600",
  },
  {
    id: "facturacion",
    title: "Facturación DIAN",
    icon: Receipt,
    description:
      "Cumple la normativa sin salir del POS. Integración nativa sin portales engorrosos.",
    span: "md:col-span-1 lg:col-span-1",
    gradient: "from-emerald-500/10 to-teal-500/5",
    iconColor: "text-emerald-600",
  },
  {
    id: "inventario",
    title: "Control de Inventario",
    icon: Package,
    description:
      "Maneja recetas, mermas y traslados. Alertas de stock bajo para que nunca te quedes sin ingredientes clave en hora pico.",
    span: "md:col-span-2 lg:col-span-2",
    gradient: "from-purple-500/10 to-fuchsia-500/5",
    iconColor: "text-purple-600",
  },
  {
    id: "kds-voz",
    title: "KDS Asistido",
    icon: Volume2,
    description: "Pantalla de despacho inteligente que canta pedidos en voz alta.",
    span: "md:col-span-1 lg:col-span-1",
    gradient: "from-rose-500/10 to-pink-500/5",
    iconColor: "text-rose-600",
  },
  {
    id: "fidelizacion",
    title: "Fidelización",
    icon: Gift,
    description: "Tarjetas VIP digitales con puntos y reglas de canje automatizadas.",
    span: "md:col-span-1 lg:col-span-1",
    gradient: "from-indigo-500/10 to-violet-500/5",
    iconColor: "text-indigo-600",
  },
  {
    id: "reportes",
    title: "Reportes en Vivo",
    icon: BarChart3,
    description: "Ventas y rentabilidad en tiempo real desde cualquier lugar.",
    span: "md:col-span-1 lg:col-span-1",
    gradient: "from-sky-500/10 to-cyan-500/5",
    iconColor: "text-sky-600",
  },
  {
    id: "crm",
    title: "Base de Datos CRM",
    icon: Users,
    description: "Conoce a tus mejores clientes, cuándo visitan y qué consumen.",
    span: "md:col-span-1 lg:col-span-1",
    gradient: "from-yellow-500/10 to-amber-500/5",
    iconColor: "text-yellow-600",
  },
  {
    id: "pantalla-tv",
    title: "Llamador (TV)",
    icon: Tv,
    description: "Pantalla con turnos listos y carrusel de promociones en sala.",
    span: "md:col-span-1 lg:col-span-1",
    gradient: "from-teal-500/10 to-green-500/5",
    iconColor: "text-teal-600",
  },
  {
    id: "soporte",
    title: "Soporte y Migración",
    icon: Headset,
    description: "Migración inicial gratuita de tu menú y acompañamiento continuo.",
    span: "md:col-span-2 md:hidden lg:block lg:col-span-1", // Ajuste para que cuadre perfecto en MD y LG
    gradient: "from-slate-500/10 to-gray-500/5",
    iconColor: "text-slate-600",
  },
];

export function PricingModules() {
  return (
    <section id="modulos" className="bg-white py-24 px-6 relative overflow-hidden">
      <div className="mx-auto max-w-6xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Todo lo que necesitas, <br className="hidden sm:inline" /> incluido en todos los planes
          </h2>
          <p className="mt-6 text-lg text-slate-600 font-medium">
            A diferencia de otros sistemas que te cobran por cada módulo extra, TAVI viene equipado
            con todas las herramientas desde el primer día.
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {MODULES.map(({ id, icon: Icon, title, description, span, gradient, iconColor }) => (
            <div
              key={id}
              className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300 ${span}`}
            >
              {/* Subtle hover gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              {/* Large background icon for visual flair */}
              <Icon
                className={`absolute -right-6 -bottom-6 h-40 w-40 text-slate-900/5 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12`}
              />

              <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 mb-6 transition-transform duration-500 group-hover:scale-110 shadow-sm">
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>

                <div className="mt-auto pt-4">
                  <h3 className="font-bold text-xl text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
