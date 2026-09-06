import { Link } from "react-router-dom";
import { useState } from "react";
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
} from "lucide-react";
import heroDish from "@/assets/tavi-hero-dish.jpg";
import foodBurger from "@/assets/tavi-food-burger.jpg";
import foodBowl from "@/assets/tavi-food-bowl.jpg";
import foodDessert from "@/assets/tavi-food-dessert.jpg";
import { DemoModal } from "@/components/DemoModal";
import { TaviLogo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { LOGIN_URL } from "@/lib/site-links";
import { ANNUAL_DISCOUNT_PCT, formatCOP, PRICING_PLANS } from "@/lib/pricing-plans";

export function Landing() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoPlan, setDemoPlan] = useState<string | undefined>(undefined);

  function openDemo(plan?: string) {
    setDemoPlan(plan);
    setDemoOpen(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnnouncementBar onDemo={() => openDemo()} />
      <Nav onDemo={() => openDemo()} />
      <main>
        <Hero onDemo={() => openDemo()} />
        <Marquee />
        <Showcase />
        <Features />
        <HowItWorks />
        <Stats />
        <Testimonial />
        <Pricing onDemo={openDemo} />
        <FinalCta onDemo={() => openDemo()} />
      </main>
      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} initialPlan={demoPlan} />
    </div>
  );
}

function AnnouncementBar({ onDemo }: { onDemo: () => void }) {
  return (
    <div
      className="animate-in fade-in slide-in-from-top-4 text-primary-foreground duration-500"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-6 py-2 text-center text-xs font-medium sm:text-sm">
        <Sparkles className="h-3.5 w-3.5 shrink-0" />
        <span>Software para restaurantes con pedidos por QR — </span>
        <button
          onClick={onDemo}
          className="hidden items-center gap-1 font-semibold underline underline-offset-2 hover:opacity-90 sm:inline-flex"
        >
          Solicitar demo <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function Nav({ onDemo }: { onDemo: () => void }) {
  return (
    <header className="animate-in fade-in slide-in-from-top-2 sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md duration-500">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="#top">
          <TaviLogo />
        </a>
        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/60 px-2 py-1 text-sm text-muted-foreground md:flex">
          <a
            href="#showcase"
            className="rounded-full px-4 py-1.5 transition hover:bg-muted hover:text-foreground"
          >
            Cocinas
          </a>
          <a
            href="#features"
            className="rounded-full px-4 py-1.5 transition hover:bg-muted hover:text-foreground"
          >
            Funcionalidades
          </a>
          <a
            href="#how"
            className="rounded-full px-4 py-1.5 transition hover:bg-muted hover:text-foreground"
          >
            Cómo funciona
          </a>
          <a
            href="#pricing"
            className="rounded-full px-4 py-1.5 transition hover:bg-muted hover:text-foreground"
          >
            Precios
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={LOGIN_URL}
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Ingresar
          </a>
          <button
            onClick={onDemo}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-warm)] transition hover:opacity-95"
          >
            Solicitar demo <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onDemo }: { onDemo: () => void }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ background: "var(--gradient-warm)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 15%, oklch(0.78 0.14 75 / 0.35), transparent 42%), radial-gradient(circle at 85% 55%, oklch(0.55 0.17 35 / 0.22), transparent 46%)",
        }}
      />
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div className="relative">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-[var(--shadow-soft)]">
              <span className="flex h-1.5 w-1.5">
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-primary opacity-75" />
                <span className="-ml-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              El sistema operativo de tu restaurante
            </span>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-[4rem]">
              De la mesa <br />
              <span className="tavi-text-gradient">a la cocina</span>, sin fricción.
            </h1>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              TAVI une tus sedes, cartas, mesas con QR, pagos y métricas en una sola plataforma. Tus
              clientes escanean y piden; tú te enfocas en cocinar.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onDemo}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-[var(--shadow-warm)] transition hover:-translate-y-0.5 hover:opacity-95"
              >
                Solicitar demo <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={LOGIN_URL}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition hover:bg-muted"
              >
                Ya soy cliente
              </a>
            </div>
          </Reveal>
          <Reveal delay={330}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-1 text-secondary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="ml-1.5 text-sm font-medium text-foreground">
                  4.9/5 de restaurantes
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Desde <span className="font-semibold text-secondary">$55.000</span> COP / mes
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal from="scale" delay={200} className="relative">
          <div className="absolute -inset-8 rounded-[2.5rem] bg-primary/10 blur-3xl" />
          <div className="tavi-spin-slow pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full border-2 border-dashed border-accent/50" />
          <img
            src={heroDish}
            alt="Plato gourmet servido en un restaurante"
            width={1200}
            height={900}
            fetchPriority="high"
            className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-[var(--shadow-lift)]"
          />

          {/* Floating ingredient chips */}
          <img
            src={foodBurger}
            alt=""
            aria-hidden
            width={80}
            height={80}
            className="tavi-float absolute -left-6 top-6 h-20 w-20 rounded-2xl border-4 border-background object-cover shadow-[var(--shadow-soft)]"
            style={{ ["--tavi-rot" as string]: "-8deg" }}
          />
          <img
            src={foodBowl}
            alt=""
            aria-hidden
            width={64}
            height={64}
            className="tavi-float-slow absolute -right-5 bottom-24 h-16 w-16 rounded-2xl border-4 border-background object-cover shadow-[var(--shadow-soft)]"
            style={{ ["--tavi-rot" as string]: "6deg" }}
          />

          {/* QR card */}
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] md:block">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                <QrCode className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Mesa 12 · escaneó QR</div>
                <div className="text-sm font-semibold">Nuevo pedido recibido</div>
              </div>
            </div>
          </div>

          {/* Sales card */}
          <div className="absolute -right-6 -top-4 hidden rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] md:block">
            <div className="text-xs text-muted-foreground">Ventas hoy</div>
            <div className="mt-1 font-display text-2xl font-bold text-primary">$1.240.000</div>
            <div className="flex items-center gap-1 text-xs font-medium text-secondary">
              <TrendingUp className="h-3.5 w-3.5" /> 18% vs ayer
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Pizzerías",
    "Cafeterías",
    "Hamburgueserías",
    "Comida rápida",
    "Restaurantes de autor",
    "Bares",
    "Food trucks",
    "Sushi",
    "Panaderías",
    "Cocinas ocultas",
  ];
  const loop = [...items, ...items];
  return (
    <section className="border-y border-border/60 bg-muted/40 py-6">
      <Reveal>
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Diseñado para todo tipo de cocina
        </p>
      </Reveal>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="tavi-marquee-track gap-3">
          {loop.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground"
            >
              <ChefHat className="h-4 w-4 text-primary" /> {item}
            </span>
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
      label: "Hamburguesas",
      alt: "Hamburguesa gourmet en carta digital de restaurante gestionada con Tavi",
      desc: "Órdenes rápidas, ticket promedio arriba.",
    },
    {
      img: foodBowl,
      label: "Bowls & saludable",
      alt: "Bowl saludable listo para pedir por QR con el menú digital de Tavi",
      desc: "Personalización sin errores de cocina.",
    },
    {
      img: foodDessert,
      label: "Postres & café",
      alt: "Postre y café de cafetería publicados en la carta digital de Tavi",
      desc: "Suma a cada mesa con un tap.",
    },
  ];
  return (
    <section id="showcase" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          Tu carta, tu identidad
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Cada plato, listo para vender.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Publica tu carta con fotos, precios y disponibilidad en tiempo real. Lo que se agota,
          desaparece de la mesa al instante.
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
              width={1024}
              height={1024}
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

function Features() {
  const items = [
    {
      icon: Store,
      title: "Multi-sede & Cartas",
      desc: "Administra todas tus sedes, cartas y precios en tiempo real desde un único panel.",
    },
    {
      icon: QrCode,
      title: "Pedidos por QR",
      desc: "Cada mesa tiene su QR único: el mesero y cocina saben exactamente dónde entregar.",
    },
    {
      icon: Award,
      title: "Fidelidad & Google Wallet",
      desc: "Tarjetas VIP virtuales guardables en billeteras digitales con descuentos automáticos en caja.",
      highlight: true,
    },
    {
      icon: ChefHat,
      title: "Pantalla de Cocina (KDS)",
      desc: "Alertas de voz en tiempo real para la cocina con temporizadores y semáforos por tiempos.",
    },
    {
      icon: BarChart3,
      title: "Métricas en Vivo",
      desc: "Reportes de ventas por producto, hora, sede y cliente recurrente.",
    },
    {
      icon: ReceiptText,
      title: "Caja & Domicilios",
      desc: "Control de arqueos diarios de caja, verificación de transferencias y repartidores.",
    },
  ];
  return (
    <section id="features" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Todo lo que tu restaurante necesita.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Diseñado para dueños que quieren operaciones ágiles, clientes leales e ingresos
            recurrentes.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc, highlight }, i) => (
            <Reveal
              key={title}
              delay={i * 90}
              className={`group rounded-3xl border p-7 transition hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] ${
                highlight
                  ? "border-indigo-300 bg-gradient-to-br from-indigo-50/70 to-purple-50/40 dark:from-indigo-950/40 dark:to-purple-950/20 dark:border-indigo-800"
                  : "border-border bg-card"
              }`}
            >
              <div
                className={`grid h-12 w-12 place-items-center rounded-2xl transition group-hover:scale-110 ${
                  highlight
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none"
                    : "bg-accent text-accent-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{title}</h3>
                {highlight && (
                  <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                    Nuevo
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
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
      icon: Smartphone,
      title: "El cliente escanea",
      desc: "Abre la carta en su celular desde el QR de la mesa. Sin apps ni descargas.",
    },
    {
      icon: ReceiptText,
      title: "Envía su pedido",
      desc: "Elige, personaliza y paga. El pedido llega a cocina con el número de mesa.",
    },
    {
      icon: ChefHat,
      title: "Tú cocinas y sirves",
      desc: "El equipo ve todo en orden, sin gritos ni papelitos perdidos entre mesas.",
    },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
          Cómo funciona
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Tres pasos. Cero fricción.
        </h2>
      </Reveal>
      <div className="relative mt-16 grid gap-8 md:grid-cols-3">
        <div className="pointer-events-none absolute left-0 right-0 top-8 hidden border-t-2 border-dashed border-border md:block" />
        {steps.map(({ icon: Icon, title, desc }, i) => (
          <Reveal key={title} delay={i * 140} className="relative text-center">
            <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-border bg-card text-primary shadow-[var(--shadow-soft)]">
              <Icon className="h-7 w-7" />
              <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground ring-4 ring-background">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-6 text-xl font-semibold">{title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{desc}</p>
          </Reveal>
        ))}
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
          “Con TAVI dejamos de perder pedidos entre mesas. Ahora la cocina fluye y vemos exactamente
          qué se vende cada día.”
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-lg font-bold text-secondary-foreground">
            C
          </div>
          <div className="text-left">
            <div className="font-semibold">Camila R.</div>
            <div className="text-sm text-muted-foreground">Dueña · Café del Parque</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

type BillingCycle = "mensual" | "anual";

const PLAN_COMPARISON_ROWS: { label: string; values: [string, string, string] }[] = [
  {
    label: "POS de Caja, Turnos y Arqueo",
    values: ["✓", "✓", "✓"],
  },
  { label: "Menú digital con Mesas QR", values: ["✓", "✓", "✓"] },
  { label: "Sala, Comandero y mapa de mesas", values: ["✓", "✓", "✓"] },
  { label: "Pantalla de Cocina (KDS)", values: ["✓", "✓", "✓"] },
  { label: "Domicilios y cobertura por zonas", values: ["✓", "✓", "✓"] },
  { label: "Multi-sede y personal (roles)", values: ["✓", "✓", "✓"] },
  { label: "Marca propia (logo y colores)", values: ["✓", "✓", "✓"] },
  { label: "Tarjetas de Fidelidad VIP", values: ["—", "Hasta 100", "Ilimitadas"] },
  { label: "Pase Google Wallet & Referidos", values: ["—", "✓", "✓"] },
  { label: "Marca blanca en el pase Wallet", values: ["—", "—", "✓"] },
  { label: "Soporte", values: ["Estándar", "Prioritario", "Asesor dedicado"] },
];

function Pricing({ onDemo }: { onDemo: (plan?: string) => void }) {
  const [billing, setBilling] = useState<BillingCycle>("mensual");

  return (
    <section id="pricing" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
            Planes y Tarifas
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Elige el plan ideal para tu negocio.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Todos los planes incluyen el sistema operativo completo de tu restaurante. La diferencia
            está en la fidelización de tus clientes.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setBilling("mensual")}
              aria-pressed={billing === "mensual"}
              className={`rounded-full px-5 py-2 transition ${
                billing === "mensual"
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={() => setBilling("anual")}
              aria-pressed={billing === "anual"}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 transition ${
                billing === "anual"
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Anual
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  billing === "anual"
                    ? "bg-white/20 text-primary-foreground"
                    : "bg-secondary/15 text-secondary"
                }`}
              >
                Ahorra {ANNUAL_DISCOUNT_PCT}%
              </span>
            </button>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3 items-stretch">
          {PRICING_PLANS.map((plan, i) => {
            const annualTotal = plan.monthly * 10;
            const regularAnnual = plan.monthly * 12;
            const monthlyEquivalent = Math.round(annualTotal / 12);
            const Icon = plan.icon;
            return (
              <Reveal
                key={plan.id}
                from={i === 0 ? "left" : i === 2 ? "right" : "scale"}
                delay={i * 90}
                className="h-full"
              >
                <article
                  className={`tavi-plan-card group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-7 ${
                    plan.highlight
                      ? "tavi-plan-card--highlight text-primary-foreground shadow-[var(--shadow-warm)]"
                      : "border border-border bg-card hover:border-primary/35"
                  }`}
                  style={plan.highlight ? { background: "var(--gradient-hero)" } : undefined}
                >
                {plan.highlight && (
                  <>
                    <div className="tavi-grain pointer-events-none absolute inset-0 opacity-20" />
                    <span className="absolute right-5 top-5 rounded-full bg-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground shadow-sm">
                      Más Popular
                    </span>
                  </>
                )}
                <div>
                  <div
                    className={`relative text-sm font-semibold uppercase tracking-wide flex items-center gap-1.5 ${
                      plan.highlight ? "opacity-90" : "text-muted-foreground"
                    }`}
                  >
                    {Icon && (
                      <Icon
                        className={`h-4 w-4 transition duration-500 group-hover:scale-125 group-hover:-rotate-6 ${plan.highlight ? "text-amber-300" : "text-amber-500"}`}
                      />
                    )}
                    {plan.name}
                  </div>
                  {billing === "anual" ? (
                    <>
                      <div className="relative mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="font-display text-4xl font-bold tracking-tight">
                          ${formatCOP(annualTotal)}
                        </span>
                        <span
                          className={`text-sm ${plan.highlight ? "opacity-80" : "text-muted-foreground"}`}
                        >
                          COP / año
                        </span>
                        <span
                          className={`text-sm line-through ${plan.highlight ? "opacity-60" : "text-muted-foreground/60"}`}
                        >
                          ${formatCOP(regularAnnual)}
                        </span>
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary-foreground">
                          -{ANNUAL_DISCOUNT_PCT}%
                        </span>
                      </div>
                      <p
                        className={`relative mt-1 text-xs ${plan.highlight ? "opacity-80" : "text-muted-foreground"}`}
                      >
                        Equivale a ${formatCOP(monthlyEquivalent)} COP / mes · 2 meses gratis
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="relative mt-3 flex items-baseline gap-1">
                        <span className="font-display text-4xl font-bold tracking-tight">
                          ${formatCOP(plan.monthly)}
                        </span>
                        <span
                          className={`text-sm ${plan.highlight ? "opacity-80" : "text-muted-foreground"}`}
                        >
                          COP / mes
                        </span>
                      </div>
                      <p
                        className={`relative mt-1 text-xs ${plan.highlight ? "opacity-80" : "text-muted-foreground"}`}
                      >
                        Facturado mensualmente
                      </p>
                    </>
                  )}
                  <p
                    className={`relative mt-2 text-xs ${plan.highlight ? "opacity-90" : "text-muted-foreground"}`}
                  >
                    {plan.tagline}
                  </p>
                  <ul className="relative mt-6 space-y-2.5 text-xs">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span
                          className={`grid h-4 w-4 place-items-center rounded-full transition duration-300 group-hover:scale-110 ${
                            plan.highlight
                              ? "bg-white/20"
                              : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                        >
                          <Check className="h-2.5 w-2.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => onDemo(plan.name)}
                  className={`relative mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition duration-300 group-hover:gap-2.5 ${
                    plan.highlight
                      ? "bg-white font-bold text-foreground shadow-md hover:bg-white/90"
                      : "border border-border bg-background hover:bg-muted"
                  }`}
                >
                  Solicitar demo {plan.highlight && <ArrowRight className="h-4 w-4" />}
                </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120} className="mt-14">
          <h3 className="text-center font-display text-xl font-bold tracking-tight">
            ¿Cuál es la diferencia real entre planes?
          </h3>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="p-4 font-semibold">Funcionalidad</th>
                  {PRICING_PLANS.map((plan) => (
                    <th key={plan.id} className="p-4 text-center font-semibold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PLAN_COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 1 ? "bg-muted/40" : undefined}>
                    <td className="p-4 text-muted-foreground">{row.label}</td>
                    {row.values.map((value, j) => (
                      <td key={j} className="p-4 text-center font-medium">
                        {value === "—" ? (
                          <span className="text-muted-foreground/50">—</span>
                        ) : value === "✓" ? (
                          <Check className="mx-auto h-4 w-4 text-secondary" />
                        ) : (
                          value
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Los 3 planes comparten el mismo sistema operativo (caja, cocina, sala, domicilios y
            multi-sede). La fidelización de clientes es lo que escala según el plan.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal
        from="scale"
        className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center text-primary-foreground shadow-[var(--shadow-lift)] md:px-16"
        style={{ background: "var(--gradient-dark)" }}
      >
        <div className="tavi-grain pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-52 w-52 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <ChefHat className="mx-auto h-10 w-10 text-accent" />
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Tu cocina merece una operación a su altura.
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Activa TAVI en menos de 24 horas y lleva el control de tu cocina.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={onDemo}
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-7 py-3.5 text-base font-semibold text-primary transition hover:-translate-y-0.5 hover:opacity-95"
            >
              Solicitar demo <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={LOGIN_URL}
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-7 py-3.5 text-base font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              Ingresar
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <TaviLogo badgeClassName="h-9 w-9" markClassName="h-5 w-5" wordmarkClassName="text-xl" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            El sistema operativo para restaurantes que crecen. De la mesa a la cocina, sin fricción.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold">Producto</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#features" className="hover:text-foreground">
                Funcionalidades
              </a>
            </li>
            <li>
              <a href="#how" className="hover:text-foreground">
                Cómo funciona
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-foreground">
                Precios
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">Soporte & Ayuda</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/support" className="hover:text-foreground">
                Centro de Ayuda
              </Link>
            </li>
            <li>
              <a href={LOGIN_URL} className="hover:text-foreground">
                Ingresar
              </a>
            </li>
            <li>
              <a href="#showcase" className="hover:text-foreground">
                Ver cocinas
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-border px-6 pt-6 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} TAVI. Hecho con sazón.</p>
        <p>Cúcuta, Colombia</p>
      </div>
    </footer>
  );
}
