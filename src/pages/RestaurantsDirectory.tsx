import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, UtensilsCrossed } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DemoModal } from "@/components/DemoModal";
import { categoriaDe, type DirectorioItem } from "@/lib/directorio";
import { trackEvent } from "@/lib/analytics";

export type Miga = { nombre: string; href: string };
export type EnlaceFiltro = { nombre: string; href: string; total: number };

type Props = {
  titulo: string;
  intro: string;
  migas: Miga[];
  restaurantes: DirectorioItem[];
  filtros?: { titulo: string; enlaces: EnlaceFiltro[] };
};

function RestaurantCard({ r }: { r: DirectorioItem }) {
  const categoria = categoriaDe(r.categoria_negocio);
  return (
    <li className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
      <div className="mb-4 flex items-start justify-between gap-3">
        {r.logo ? (
          <img
            src={r.logo}
            alt={`Logo de ${r.nombre}`}
            width={56}
            height={56}
            loading="lazy"
            className="h-14 w-14 rounded-2xl border border-slate-100 object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <UtensilsCrossed className="h-7 w-7" />
          </div>
        )}
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          <MapPin className="h-3 w-3" /> {r.ciudad}
        </span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary">
        <a href={r.ruta_publica} className="after:absolute after:inset-0">
          {r.nombre}
        </a>
      </h3>
      <p className="mt-1 text-sm font-medium text-slate-500">
        {categoria?.plural ?? "Restaurante"} · {r.total_productos} platos con precio
      </p>
      {r.descripcion && <p className="mt-3 line-clamp-3 text-slate-600">{r.descripcion}</p>}
      <span className="mt-5 text-sm font-bold text-primary">Ver menú de {r.nombre} →</span>
    </li>
  );
}

export function RestaurantsDirectory({ titulo, intro, migas, restaurantes, filtros }: Props) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6] selection:bg-primary/20 selection:text-primary">
      <Navbar onDemo={() => setShowDemoModal(true)} />

      <main className="flex-1 pb-20 pt-10 md:pt-16">
        <div className="mx-auto max-w-6xl px-6">
          <nav aria-label="Migas de pan" className="mb-6 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1">
              {migas.map((m, i) => (
                <li key={m.href} className="flex items-center gap-1">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i < migas.length - 1 ? (
                    <a href={m.href} className="hover:text-primary">
                      {m.nombre}
                    </a>
                  ) : (
                    <span aria-current="page" className="text-slate-700">
                      {m.nombre}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="mb-10 max-w-3xl">
            <h1 className="mb-4 font-display text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              {titulo}
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">{intro}</p>
          </div>

          {filtros && filtros.enlaces.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
                {filtros.titulo}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {filtros.enlaces.map((e) => (
                  <li key={e.href}>
                    <a
                      href={e.href}
                      className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-primary/40 hover:text-primary"
                    >
                      {e.nombre} <span className="ml-1 text-slate-400">({e.total})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {restaurantes.length > 0 ? (
            <section>
              <h2 className="sr-only">Restaurantes</h2>
              <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {restaurantes.map((r) => (
                  <RestaurantCard key={r.slug} r={r} />
                ))}
              </ul>
            </section>
          ) : (
            <p className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600">
              Aún no hay restaurantes publicados aquí.{" "}
              <Link to="/directorio" className="font-semibold text-primary">
                Ver todo el directorio
              </Link>
            </p>
          )}

          <div className="relative mx-auto mt-24 max-w-4xl overflow-hidden rounded-[2.5rem] border border-primary/20 bg-primary/5 p-8 text-center md:p-16">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">¿Tienes un restaurante?</h2>
            <p className="mb-8 text-lg text-slate-600">
              Digitaliza tu menú con código QR, recibe pedidos en mesa y a domicilio sin comisiones
              por venta y aparece en este directorio.
            </p>
            <a
              href="/menu-digital-qr?utm_source=directorio&utm_medium=listado&utm_campaign=crea_tu_menu"
              onClick={() => trackEvent("click_crea_tu_menu", { origen: "directorio" })}
              className="inline-flex rounded-full bg-primary px-8 py-4 text-base font-black text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Crear mi menú digital
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <DemoModal open={showDemoModal} onOpenChange={setShowDemoModal} />
    </div>
  );
}
