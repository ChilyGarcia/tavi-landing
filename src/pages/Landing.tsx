import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  QrCode,
  Store,
  BarChart3,
  ReceiptText,
  ArrowRight,
  Check,
  Star,
  ChefHat,
  Smartphone,
  ShieldCheck,
  Sparkles,
  Clock,
  TrendingUp,
  Quote,
  Award,
  Layers,
  Users,
  Workflow,
  Printer,
  MonitorPlay,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import taviDesktop from "@/assets/tavi-desktop.webp";
import taviTablet from "@/assets/tavi-tablet.webp";
import taviMobile from "@/assets/tavi-mobile.webp";
import foodBurger from "@/assets/tavi-food-burger.webp";
import foodBowl from "@/assets/tavi-food-bowl.webp";
import foodDessert from "@/assets/tavi-food-dessert.webp";
import { DemoModal } from "@/components/DemoModal";
import { LANDING_FAQS } from "@/content/landing-faqs";
import { TaviLogo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { LOGIN_URL } from "@/lib/site-links";
import { Navbar } from "@/components/layout/Navbar";

export function Landing() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoPlan, setDemoPlan] = useState<string | undefined>(undefined);

  function openDemo(plan?: string) {
    setDemoPlan(plan);
    setDemoOpen(true);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20">
      <Navbar onDemo={() => openDemo()} />

      <main className="flex-1">
        <Hero onDemo={() => openDemo()} />
        <Marquee />
        <Features />
        <Showcase />
        <ValueProposition />
        <HowItWorks />
        <MenuDemo />
        <WhyChooseUs />
        <Stats />
        <Testimonial />
        <LandingFAQ />
        <FinalCta />
      </main>
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} initialPlan={demoPlan} />
    </div>
  );
}

// --------------------------------------------------------------------------------------
// HELPER COMPONENTS
// --------------------------------------------------------------------------------------
function Hero({ onDemo }: { onDemo: () => void }) {
  const words = [
    "restaurante",
    "bar",
    "cafetería",
    "pizzería",
    "dark kitchen",
    "negocio gastronómico",
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setFade(true); // Start fade in
      }, 400); // Wait for fade out to complete before changing word
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
        {/* Left Side: Text & CTAs */}
        <div className="relative">
          <Reveal delay={90}>
            <div className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-[4rem]">
              {/* El H1 lleva un texto estable (lo que indexa Google); la palabra rotativa es solo visual. */}
              <h1 className="inline">
                El software todo-en-uno para gestionar tu
                <span className="sr-only"> restaurante</span>
              </h1>
              <br />
              {/* Contenedor relativo: el texto invisible reserva el espacio máximo, el texto absoluto hace la transición por encima */}
              <span className="relative block" aria-hidden="true">
                <span className="invisible pointer-events-none" aria-hidden="true">
                  negocio gastronómico
                </span>
                <span
                  className={`absolute left-0 top-0 text-primary transition-opacity duration-500 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}
                >
                  {words[wordIndex]}
                </span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-6 max-w-lg text-lg text-foreground font-medium leading-relaxed">
              Tavi Orders centraliza tu sistema POS de punto de venta, menús con código QR en mesas,
              pantallas de cocina (KDS), facturación electrónica DIAN y fidelización digital. La
              plataforma FoodTech que escala tu negocio gastronómico.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onDemo}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary/95"
              >
                Prueba el sistema en vivo <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border/50 pt-6">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Check className="h-5 w-5 text-primary" /> Sin instalaciones complejas
              </div>
              <div className="h-4 w-px bg-border/50 hidden sm:block"></div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Check className="h-5 w-5 text-primary" /> Cancela cuando quieras
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Software Visuals (Ecosystem) */}
        <Reveal
          from="right"
          delay={200}
          className="relative mt-12 md:mt-0 lg:ml-4 w-full h-[350px] sm:h-[450px] md:h-[500px]"
        >
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl opacity-60" />

          {/* Main Desktop (Back/Center) */}
          <div className="absolute left-0 right-[15%] top-0 md:right-[10%] rounded-xl sm:rounded-2xl border-4 sm:border-8 border-slate-800 bg-slate-800 shadow-2xl backdrop-blur-md overflow-hidden z-10 animate-in fade-in zoom-in duration-1000">
            <div className="flex h-4 sm:h-5 w-full items-center gap-1 sm:gap-1.5 bg-slate-900 px-2 sm:px-3">
              <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-red-400"></div>
              <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-amber-400"></div>
              <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-emerald-400"></div>
            </div>
            <img
              src={taviDesktop}
              alt="Panel de administración de Tavi en computador"
              width={1024}
              height={516}
              fetchPriority="high"
              className="w-full h-auto object-cover border-t border-border/30"
            />
          </div>

          {/* Tablet (Middle/Right) */}
          <div className="tavi-float absolute right-0 top-[25%] sm:top-[20%] w-[45%] sm:w-[40%] md:w-[45%] rounded-[1rem] sm:rounded-[1.5rem] border-[6px] sm:border-[8px] border-slate-800 bg-slate-800 shadow-2xl overflow-hidden z-20 transition-transform hover:-translate-y-2">
            <div className="absolute right-1 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-slate-700"></div>
            <img
              src={taviTablet}
              alt="Módulo de caja de Tavi en tablet"
              width={1024}
              height={516}
              className="w-full h-auto object-cover rounded-[0.5rem] sm:rounded-[0.75rem]"
            />
          </div>

          {/* Mobile (Front/Left) */}
          <div className="tavi-float-slow absolute bottom-0 left-[5%] sm:left-[10%] w-[28%] sm:w-[25%] md:w-[28%] rounded-[1.25rem] sm:rounded-[2rem] border-[4px] sm:border-[6px] border-slate-800 bg-slate-800 shadow-2xl overflow-hidden z-30 transition-transform hover:-translate-y-2">
            <div className="absolute left-1/2 top-1 h-3 w-16 -translate-x-1/2 rounded-full bg-black z-10"></div>
            <img
              src={taviMobile}
              alt="Menú QR interactivo en celular"
              width={508}
              height={958}
              className="w-full h-auto object-cover rounded-[0.75rem] sm:rounded-[1.25rem]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const reasons = [
    {
      title: "Digitalización de Menú QR",
      desc: "Cartas interactivas con fotos y pedidos directos en mesa sin comisiones.",
      icon: <QrCode className="h-7 w-7 text-primary" />,
    },
    {
      title: "Control de Comandas (KDS)",
      desc: "Pantallas de cocina con voz y semáforos de tiempos de preparación.",
      icon: <MonitorPlay className="h-7 w-7 text-primary" />,
    },
    {
      title: "Facturación Electrónica DIAN",
      desc: "Documento equivalente electrónico POS integrado y cumplimiento normativo.",
      icon: <ReceiptText className="h-7 w-7 text-primary" />,
    },
    {
      title: "POS e Inventario Gastronómico",
      desc: "Arqueo de caja al centavo y recetas con descuento automático de insumos.",
      icon: <Layers className="h-7 w-7 text-primary" />,
    },
  ];

  return (
    <section className="bg-background py-16 md:py-24 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary mb-3">
              Ventajas Tavi Orders
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Por qué los restaurantes prefieren Tavi Orders?
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Tecnología gastronómica diseñada para eliminar el caos operativo y maximizar la
              rentabilidad de tu negocio.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <Reveal key={i} delay={i * 100} from="up">
              <div className="flex h-full flex-col items-center text-center gap-4 rounded-[2rem] bg-muted/30 p-8 border border-border/50 hover:border-primary/20 hover:bg-muted/50 transition-colors">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg leading-tight mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    {
      name: "Restaurantes",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=256&h=256&fit=crop",
    },
    {
      name: "Bares & Gastrobares",
      image:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=256&h=256&fit=crop",
    },
    {
      name: "Cafeterías & Panaderías",
      image:
        "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=256&h=256&fit=crop",
    },
    {
      name: "Pizzerías",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=256&h=256&fit=crop",
    },
    {
      name: "Hamburgueserías",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=256&h=256&fit=crop",
    },
    {
      name: "Dark Kitchens",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=256&h=256&fit=crop",
    },
    {
      name: "Comidas Rápidas",
      image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=256&h=256&fit=crop",
    },
    {
      name: "Heladerías & Postres",
      image:
        "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=256&h=256&fit=crop",
    },
  ];
  const loop = [...items, ...items, ...items];

  return (
    <section className="border-y border-border/60 bg-muted/40 py-12">
      <Reveal>
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Software gastronómico adaptado a todo tipo de restaurante
        </p>
      </Reveal>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="tavi-marquee-track gap-4">
          {loop.map((item, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl flex-shrink-0 w-36 h-36 md:w-44 md:h-44 group border border-border/50 shadow-sm"
            >
              <img
                src={item.image}
                alt={`Software para ${item.name} Tavi Orders`}
                width={176}
                height={176}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 transition-colors group-hover:bg-black/40" />
              <div className="absolute inset-0 flex items-end justify-center p-4">
                <span className="text-white font-bold text-center text-sm md:text-base drop-shadow-md">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const dishes = [
    {
      img: foodBurger,
      label: "Hamburguesas & Combos",
      alt: "Hamburguesa gourmet en menú digital con código QR de Tavi Orders",
      desc: "Órdenes rápidas, opciones de salsas y ticket promedio arriba.",
    },
    {
      img: foodBowl,
      label: "Bowls & Saludable",
      alt: "Bowl listo para pedir por QR con la carta digital interactiva de Tavi Orders",
      desc: "Personalización de ingredientes sin errores en cocina.",
    },
    {
      img: foodDessert,
      label: "Postres & Cafetería",
      alt: "Postres y café en el menú digital de Tavi Orders",
      desc: "Adicionales sugeridos que suman a cada comanda.",
    },
  ];
  return (
    <section id="showcase" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          Digitalización de Cartas y Menús
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Menús digitales que multiplican tus ventas.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Publica tu carta digital interactiva con fotos en alta definición, precios y
          disponibilidad en tiempo real. Lo que se agota se oculta de la mesa al instante.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {dishes.map(({ img, label, alt, desc }, i) => (
          <Reveal
            key={label}
            delay={i * 120}
            from="scale"
            className="group relative overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]"
          >
            <img
              src={img}
              alt={alt}
              width={800}
              height={800}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h3 className="font-display text-2xl font-bold">{label}</h3>
              <p className="mt-1 text-sm text-white/85">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ValueProposition() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <Reveal className="text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          Lo "Gratis" sale muy caro.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Descubre por qué los negocios serios prefieren invertir en TAVI en lugar de usar métodos
          manuales gratuitos.
        </p>
      </Reveal>
      <Reveal delay={100} className="mt-12">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:grid-cols-2">
          {/* Columna Gratis */}
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border bg-muted/20">
            <h3 className="text-xl font-bold text-muted-foreground mb-6 flex items-center gap-2">
              <span className="text-destructive">×</span> Menú QR Gratuito
            </h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="shrink-0 text-destructive mt-0.5">×</span>
                <span>Los pedidos llegan por WhatsApp y se pierden entre mensajes personales.</span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 text-destructive mt-0.5">×</span>
                <span>
                  El mesero o cajero tiene que transcribir todo el pedido a mano al sistema.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 text-destructive mt-0.5">×</span>
                <span>No hay fidelización. El cliente come y se va sin dejar datos.</span>
              </li>
            </ul>
          </div>
          {/* Columna Tavi */}
          <div className="p-8 md:p-10" style={{ background: "var(--gradient-soft)" }}>
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <Check className="h-5 w-5 text-slate-400" /> Sistema Tavi Orders
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex gap-3">
                <Check className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                <span>
                  Las ventas viajan directo hasta la pantalla de empaque, despacho o cocina (KDS).
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                <span>
                  Facturación electrónica y documento equivalente POS DIAN integrado en segundos.
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                <span>
                  El cierre de caja cuadra al centavo, sin importar si pagan en efectivo o tarjeta.
                </span>
              </li>
              <li className="flex gap-3">
                <Check className="h-4 w-4 shrink-0 text-slate-400 mt-0.5" />
                <span>
                  Tarjetas VIP en Google Wallet que aseguran que el cliente vuelva a comprar.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Features() {
  const modules = [
    {
      title: "Sistema POS y Punto de Venta",
      icon: Store,
      img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
      benefits: [
        "Control de mesas, barra y domicilios",
        "Facturación rápida y división de cuentas",
        "Arqueo y cierre de caja al centavo",
        "Compatible con impresoras térmicas y gavetas",
      ],
    },
    {
      title: "Menú Digital QR y Pedidos en Mesas",
      icon: QrCode,
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      benefits: [
        "Carta interactiva con fotos en alta calidad",
        "Pedidos directos desde el celular sin descargar apps",
        "0% comisiones por ventas o pedidos",
        "Actualizaciones de disponibilidad en tiempo real",
      ],
    },
    {
      title: "Pantallas de Cocina (KDS) y Comandas",
      icon: MonitorPlay,
      img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
      benefits: [
        "Comandas digitales automáticas sin papel ni confusiones",
        "Tiempos de preparación y alertas de pedidos demorados",
        "Organización por áreas (cocina, barra, postres)",
        "Despacho rápido y mayor rotación de mesas",
      ],
    },
    {
      title: "Facturación DIAN, Inventario y Sedes",
      icon: ReceiptText,
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
      benefits: [
        "Facturación electrónica y documento equivalente POS DIAN",
        "Descuento automático de stock e insumos por receta",
        "Alertas de inventario bajo y control de mermas",
        "Control centralizado de múltiples sucursales",
      ],
    },
  ];

  return (
    <section id="features" className="bg-muted/30 py-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <Reveal className="max-w-2xl text-center mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary mb-4">
            Gestión Gastronómica Todo en Uno
          </span>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Software diseñado para impulsar tu restaurante.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Diseñado para restaurantes, bares y cafeterías que quieren operaciones ágiles, comandas
            sin errores e ingresos recurrentes.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {modules.map((mod, i) => (
            <Reveal
              key={mod.title}
              delay={i * 100}
              className="group bg-card border border-border/60 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
            >
              <div className="h-60 w-full relative overflow-hidden">
                <img
                  src={mod.img}
                  alt={mod.title}
                  width={800}
                  height={240}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="p-2.5 bg-white rounded-xl shadow-lg">
                    <mod.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white drop-shadow-md">{mod.title}</h3>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {mod.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: QrCode,
      title: "El cliente escanea",
      desc: "Accede al catálogo digital desde el QR en la mesa o mostrador. Sin descargar absolutamente nada.",
    },
    {
      icon: Smartphone,
      title: "Selecciona y pide",
      desc: "Personaliza su pedido y lo envía en segundos. La orden llega directo y sin errores al sistema.",
    },
    {
      icon: Store,
      title: "Preparas y entregas",
      desc: "Tu equipo ve todo organizado en la pantalla de despacho. Operan más rápido, sin enredos ni papeles.",
    },
  ];

  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
          Tres pasos. <span className="text-muted-foreground">Cero fricción.</span>
        </h2>
        <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground">
          Diseñado para que tu equipo se concentre en lo importante: brindar un excelente servicio y
          entregar los mejores productos. Del resto nos encargamos nosotros.
        </p>
      </Reveal>

      <div className="relative mt-16 md:mt-24">
        {/* Dashed connecting line for desktop */}
        <div className="hidden md:block absolute top-[5rem] left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-border/80 z-0" />

        <div className="grid gap-8 md:gap-6 md:grid-cols-3 relative">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 150} className="relative z-10 group">
              <div className="bg-background border border-border/60 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col items-center text-center relative overflow-hidden">
                {/* Large Background Number */}
                <div className="absolute -top-4 -right-2 text-9xl font-black text-muted/20 select-none transition-colors duration-500 group-hover:text-primary/5 pointer-events-none">
                  {i + 1}
                </div>

                <div className="h-20 w-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-sm relative z-10">
                  <Icon className="h-10 w-10 text-primary" />
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold mb-4 relative z-10 text-foreground">
                  {title}
                </h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuDemo() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Experiencia Interactiva
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Ponte en los zapatos de tus clientes.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Así es exactamente como tus clientes verán tu menú al escanear el QR desde su mesa. Sin
            apps, sin descargas, rápido y directamente desde su navegador.
          </p>
          <p className="mt-6 font-medium text-foreground flex items-center gap-2">
            Navega por este menú de prueba 👉
          </p>
        </Reveal>

        <Reveal from="right" className="flex justify-center md:justify-end">
          <div className="relative mx-auto w-full max-w-[320px] rounded-[3rem] border-[12px] border-zinc-900 bg-zinc-900 shadow-2xl">
            <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2rem] bg-background">
              <iframe
                src="https://app.taviorders.com/menu/fqoruy0ypki"
                className="h-full w-full border-0"
                title="Menú Digital de Demostración"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "+35%", label: "más pedidos por mesa", icon: TrendingUp },
    { value: "−4 min", label: "de espera por orden", icon: Clock },
    { value: "100%", label: "de pagos verificados", icon: ShieldCheck },
    { value: "24h", label: "para activar tu cuenta", icon: Sparkles },
  ];
  return (
    <section
      className="relative overflow-hidden py-20 text-primary-foreground"
      style={{ background: "var(--gradient-dark)" }}
    >
      <div className="tavi-grain pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map(({ value, label, icon: Icon }, i) => (
          <Reveal key={label} delay={i * 100} from="scale" className="text-center">
            <Icon className="mx-auto h-6 w-6 text-accent" />
            <div className="mt-3 font-display text-4xl font-bold md:text-5xl">{value}</div>
            <div className="mt-1 text-sm text-primary-foreground/70">{label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <Reveal from="scale">
        <Quote className="mx-auto h-10 w-10 text-primary/40" />
        <blockquote className="mt-6 font-display text-3xl font-semibold leading-snug tracking-tight md:text-4xl">
          “Desde que usamos TAVI la operación cambió por completo. Ya no hay errores anotando en
          papel, las comandas llegan directo a cocina al instante y podemos atender muchas más mesas
          en hora pico.”
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-lg font-bold text-secondary-foreground">
            M
          </div>
          <div className="text-left">
            <div className="font-semibold">Gerencia</div>
            <div className="text-sm text-muted-foreground">Mijaos · Comidas de Película</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function LandingFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
      <Reveal className="text-center mb-14">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary mb-3">
          Preguntas Frecuentes FoodTech
        </span>
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl text-foreground">
          Preguntas frecuentes sobre Tavi Orders
        </h2>
        <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
          Todo lo que necesitas saber sobre nuestro software para restaurantes, menús QR y sistema
          POS en Colombia.
        </p>
      </Reveal>

      <div className="space-y-4">
        {LANDING_FAQS.map((faq, idx) => (
          <Reveal key={idx} delay={idx * 60}>
            <div className="rounded-2xl border border-border/70 bg-card overflow-hidden transition-all duration-200 hover:border-primary/30">
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-muted/40"
              >
                <span className="font-display text-lg font-semibold text-foreground pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIdx === idx ? "max-h-60" : "max-h-0"
                }`}
              >
                <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-border/40 text-sm md:text-base">
                  {faq.a}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-24">
      <Reveal
        from="scale"
        className="relative overflow-hidden rounded-[2.5rem] px-6 py-12 text-center text-primary-foreground shadow-2xl md:px-16 md:py-20"
        style={{ background: "var(--gradient-dark)" }}
      >
        <div className="tavi-grain pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-52 w-52 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-2xl flex flex-col items-center">
          <Sparkles className="h-10 w-10 text-accent mb-4" />
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl leading-tight">
            Encuentra el plan perfecto para tu negocio.
          </h2>
          <p className="mt-4 text-base md:text-lg text-primary-foreground/80 max-w-lg">
            Escoge la opción que mejor se adapte a tus necesidades y empieza a escalar tu operación
            sin letra pequeña.
          </p>
          <div className="mt-8 flex justify-center w-full sm:w-auto">
            <Link
              to="/precios"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-primary-foreground px-8 py-4 text-base font-bold text-primary transition-all hover:-translate-y-1 hover:opacity-95 shadow-lg shadow-black/20 active:scale-95"
            >
              Ver planes y precios <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border bg-card py-16 overflow-hidden">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-12">
        <div className="md:col-span-5 lg:col-span-4">
          <TaviLogo
            badgeClassName="h-9 w-9 shadow-sm"
            markClassName="h-5 w-5"
            wordmarkClassName="text-xl"
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            El sistema operativo para restaurantes que crecen. Une tus mesas, cocina y caja en una
            sola plataforma rápida y sin fricción.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://www.instagram.com/taviorders"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-border/50 bg-muted/30 text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61592854388655"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-border/50 bg-muted/30 text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              <span className="sr-only">Facebook</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@taviorders"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-border/50 bg-muted/30 text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
            >
              <span className="sr-only">TikTok</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-8 lg:ml-auto">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12">
            <div>
              <h3 className="text-sm font-bold tracking-wider text-foreground">Producto</h3>
              <ul className="mt-5 space-y-3.5 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="transition-colors hover:text-primary">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="#how" className="transition-colors hover:text-primary">
                    Cómo funciona
                  </a>
                </li>
                <li>
                  <Link to="/precios" className="transition-colors hover:text-primary">
                    Precios
                  </Link>
                </li>
                <li>
                  <a href="#showcase" className="transition-colors hover:text-primary">
                    Casos de éxito
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wider text-foreground">Soporte</h3>
              <ul className="mt-5 space-y-3.5 text-sm text-muted-foreground">
                <li>
                  <Link to="/support" className="transition-colors hover:text-primary">
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Guías y tutoriales
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-sm font-bold tracking-wider text-foreground">Legal</h3>
              <ul className="mt-5 space-y-3.5 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Términos de servicio
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl px-6">
        <div className="flex flex-col-reverse items-center justify-between gap-5 border-t border-border/60 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground/80">
            © {new Date().getFullYear()} TAVI.{" "}
            <span className="hidden sm:inline">Todos los derechos reservados.</span>
          </p>
          <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <span className="text-muted-foreground">Hecho con sazón en</span> 🇨🇴{" "}
            <span className="ml-1 tracking-tight">Cúcuta, Colombia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
