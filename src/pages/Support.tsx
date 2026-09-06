import { Link } from "react-router-dom";
import { useState } from "react";
import {
  HelpCircle,
  Mail,
  MessageSquare,
  ShieldCheck,
  Award,
  QrCode,
  CreditCard,
  Search,
  ChevronDown,
  ArrowLeft,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import { TaviLogo } from "@/components/Logo";
import { LOGIN_URL, WHATSAPP_PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/site-links";

export function Support() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories = [
    {
      icon: Award,
      title: "Fidelidad & Google Wallet",
      desc: "Cómo emitir tarjetas VIP, guardarlas en Google Wallet y aplicar descuentos en caja.",
    },
    {
      icon: QrCode,
      title: "Pedidos por QR & Mesas",
      desc: "Configuración de códigos QR por mesa, comandero digital y cartas en vivo.",
    },
    {
      icon: CreditCard,
      title: "Caja & Pagos",
      desc: "Apertura y cierre de turnos, arqueos de caja y desglose de pagos mixtos.",
    },
    {
      icon: ShieldCheck,
      title: "Cuenta & Seguridad",
      desc: "Gestión de roles de personal, perfiles de restaurante y protección de datos.",
    },
  ];

  const faqs = [
    {
      q: "¿Cómo funciona la integración de tarjetas VIP con Google Wallet?",
      a: "Tavi permite a los restaurantes generar pases digitales con código QR único para sus clientes VIP. El cliente escanea el QR o hace clic en el enlace recibido por WhatsApp para guardar instantáneamente la tarjeta en la app oficial de Google Wallet en su teléfono Android. Al comprar en el restaurante, el cajero digita o escanea la tarjeta y aplica el descuento configurado.",
    },
    {
      q: "¿Qué hago si mi cliente no tiene Google Wallet instalado?",
      a: "No te preocupes. La tarjeta de fidelidad también funciona como una tarjeta digital web: se abre desde cualquier navegador (Chrome, Safari) sin necesidad de instalar nada, ideal para clientes con iPhone.",
    },
    {
      q: "¿Cuáles son los canales oficiales de atención al cliente de Tavi?",
      a: `Ofrecemos atención prioritaria por WhatsApp directo (${WHATSAPP_PHONE_DISPLAY}) y correo electrónico oficial (soporte@tavi.app) de Lunes a Sábado de 8:00 AM a 8:00 PM (Hora de Colombia).`,
    },
    {
      q: "¿Cómo actualizo mi plan de tarjetas de fidelidad?",
      a: "Puedes solicitar la ampliación de tu plan desde la sección de Fidelidad en tu panel de control de Tavi o comunicándote con nuestro equipo de soporte para pasar del Plan Base ($55k) al Plan Pro ($80k) o VIP Ilimitado ($100k).",
    },
    {
      q: "¿Tavi cumple con las políticas de protección de datos personales?",
      a: "Sí. Toda la información de clientes, ventas y credenciales de negocios está cifrada y protegida siguiendo la ley de protección de datos (Habeas Data) y los estándares de seguridad exigidos por Google Cloud Services.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <TaviLogo />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              <ArrowLeft className="h-4 w-4" /> Volver al Inicio
            </Link>
            <a
              href={LOGIN_URL}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 transition"
            >
              Ingresar a Tavi
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-16 md:py-20 text-center text-primary-foreground"
        style={{ background: "var(--gradient-dark)" }}
      >
        <div className="tavi-grain pointer-events-none absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-3xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur">
            <HelpCircle className="h-3.5 w-3.5" /> Centro de Ayuda & Soporte Oficial
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            ¿En qué podemos ayudarte hoy?
          </h1>
          <p className="mt-3 text-base text-primary-foreground/80">
            Resuelve tus dudas sobre la operación de tu restaurante, comandero digital y programa de
            fidelidad con Google Wallet.
          </p>

          {/* Search bar */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar ayuda sobre Google Wallet, mesas, caja, menú..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border-0 bg-background py-3.5 pl-12 pr-4 text-sm text-foreground shadow-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-16 flex-1 w-full space-y-16">
        {/* Categorías de Ayuda */}
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-center md:text-left">
            Explora por Temas
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-3xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition duration-200"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-base">{title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Canales de Contacto Directo */}
        <div className="rounded-3xl border border-indigo-200 dark:border-indigo-900 bg-gradient-to-br from-indigo-50/60 to-purple-50/30 dark:from-indigo-950/30 dark:to-purple-950/10 p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" /> Soporte Directo
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
                ¿Necesitas atención personalizada?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Nuestro equipo de soporte técnico está disponible para asistirte con la
                configuración de tu restaurante y pase de Google Wallet.
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="h-4 w-4 text-indigo-600 shrink-0" />
                  <span>
                    <strong>Horario:</strong> Lunes a Sábado, 8:00 AM - 8:00 PM (COT)
                  </span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-indigo-600 shrink-0" />
                  <span>
                    <strong>Sede Central:</strong> Cúcuta, Norte de Santander, Colombia
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:soporte@tavi.app"
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm hover:border-indigo-400 transition"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground">Correo de Soporte</div>
                  <div className="text-sm font-semibold">soporte@tavi.app</div>
                </div>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm hover:border-emerald-400 transition"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-muted-foreground">WhatsApp Oficial</div>
                  <div className="text-sm font-semibold">{WHATSAPP_PHONE_DISPLAY}</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-center md:text-left">
            Preguntas Frecuentes (FAQ)
          </h2>
          <div className="mt-6 divide-y divide-border rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="p-6">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between text-left font-semibold text-base"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed animate-in fade-in duration-200">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer Legal */}
      <footer className="border-t border-border bg-muted/40 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <TaviLogo markClassName="h-4 w-4" wordmarkClassName="text-sm" />
            <span>— Tavi POS System & Loyalty Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> API de Google Wallet
              Verificada
            </span>
            <span>·</span>
            <span>Términos & Privacidad</span>
          </div>
          <p>© {new Date().getFullYear()} Tavi. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
