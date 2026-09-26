import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DemoModal } from "@/components/DemoModal";
import { SOLUCIONES, type Solucion } from "@/content/soluciones";
import { WHATSAPP_URL } from "@/lib/site-links";

export function SolucionPage({ solucion }: { solucion: Solucion }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const relacionadas = solucion.relacionadas
    .map((slug) => SOLUCIONES.find((s) => s.slug === slug))
    .filter((s): s is Solucion => Boolean(s));

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar onDemo={() => setDemoOpen(true)} />

      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 pb-12 pt-12 md:pt-20">
          <nav aria-label="Migas de pan" className="mb-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Inicio
            </Link>{" "}
            / <span className="text-foreground">{solucion.h1}</span>
          </nav>
          <h1 className="font-display text-4xl font-black tracking-tight md:text-5xl">
            {solucion.h1}
          </h1>
          {solucion.intro.map((p) => (
            <p key={p} className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setDemoOpen(true)}
              className="rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-md shadow-primary/20 hover:-translate-y-0.5"
            >
              {solucion.cta}
            </button>
            <Link
              to="/precios"
              className="rounded-full border border-border px-6 py-3 font-bold hover:border-primary/40"
            >
              Ver precios
            </Link>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-6 pb-16">
          {solucion.secciones.map((s) => (
            <section key={s.titulo}>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{s.titulo}</h2>
              {s.parrafos.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              {s.puntos && (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {s.puntos.map((punto) => (
                    <li key={punto} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>{punto}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {solucion.slug === "software-restaurantes-cucuta" && (
            <p>
              <Link
                to="/directorio/$ciudad"
                params={{ ciudad: "cucuta" }}
                className="font-semibold text-primary hover:underline"
              >
                Ver restaurantes en Cúcuta con menú digital →
              </Link>
            </p>
          )}

          <section>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Preguntas frecuentes</h2>
            <div className="mt-4 divide-y divide-border rounded-3xl border border-border">
              {solucion.faqs.map((f) => (
                <div key={f.q} className="p-5">
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="mt-2 text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {relacionadas.length > 0 && (
            <section>
              <h2 className="text-xl font-bold">También te puede interesar</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {relacionadas.map((r) => (
                  <li key={r.slug}>
                    <a
                      href={`/${r.slug}`}
                      className="block rounded-2xl border border-border p-4 font-semibold hover:border-primary/40 hover:text-primary"
                    >
                      {r.h1}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="rounded-[2rem] bg-primary/5 p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold md:text-3xl">{solucion.cta}</h2>
            <p className="mt-3 text-muted-foreground">
              Planes desde $55.000 al mes con IVA incluido. Sin comisiones por pedido.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
              >
                Solicitar demo
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 font-bold"
              >
                <MessageCircle className="h-5 w-5" /> Escríbenos por WhatsApp
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <DemoModal open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
