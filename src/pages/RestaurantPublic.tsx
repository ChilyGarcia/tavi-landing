import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone, ShoppingBag } from "lucide-react";
import { TaviLogo } from "@/components/Logo";
import {
  categoriaDe,
  formatoPrecio,
  urlMenuPedidos,
  type DirectorioItem,
  type FichaRestaurante,
  type HorarioDia,
} from "@/lib/directorio";
import { trackEvent } from "@/lib/analytics";

const NOMBRES_DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function Horarios({ dias }: { dias: HorarioDia[] }) {
  // Lunes primero, como se lee un horario en Colombia.
  const ordenados = [...dias].sort((a, b) => ((a.dia + 6) % 7) - ((b.dia + 6) % 7));
  return (
    <ul className="grid grid-cols-1 gap-1 text-sm sm:grid-cols-2">
      {ordenados.map((d) => (
        <li key={d.dia} className="flex justify-between gap-4 text-slate-600">
          <span className="font-medium text-slate-800">{NOMBRES_DIAS[d.dia]}</span>
          <span>
            {d.abierto ? `${d.apertura.slice(0, 5)} – ${d.cierre.slice(0, 5)}` : "Cerrado"}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function RestaurantPublic({
  ficha,
  relacionados,
}: {
  ficha: FichaRestaurante;
  relacionados: DirectorioItem[];
}) {
  const sede = ficha.sedes[0];
  const categoria = categoriaDe(ficha.categoria_negocio);
  const menuUrl = urlMenuPedidos(ficha);
  const horarios =
    sede?.horarios_atencion?.activo && sede.horarios_atencion.dias?.length
      ? sede.horarios_atencion.dias
      : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6] text-slate-900">
      <header className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link
            to="/directorio"
            className="text-sm font-semibold text-slate-600 hover:text-primary"
          >
            ← Directorio
          </Link>
          <Link to="/" aria-label="TAVI Orders, software para restaurantes">
            <TaviLogo />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {ficha.banner && (
          <img
            src={ficha.banner}
            alt={`${ficha.nombre} en ${ficha.ciudad}`}
            width={1200}
            height={400}
            fetchPriority="high"
            className="h-44 w-full object-cover md:h-64"
          />
        )}

        <div className="mx-auto max-w-4xl px-4 py-8">
          <nav aria-label="Migas de pan" className="mb-4 text-xs text-slate-500">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link to="/directorio" className="hover:text-primary">
                  Directorio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  to="/directorio/$ciudad"
                  params={{ ciudad: ficha.ciudad_slug }}
                  className="hover:text-primary"
                >
                  {ficha.ciudad}
                </Link>
              </li>
              {categoria && (
                <>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      to="/directorio/$ciudad/$categoria"
                      params={{ ciudad: ficha.ciudad_slug, categoria: categoria.slug }}
                      className="hover:text-primary"
                    >
                      {categoria.plural}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </nav>

          <div className="flex items-start gap-4">
            {ficha.logo && (
              <img
                src={ficha.logo}
                alt={`Logo de ${ficha.nombre}`}
                width={72}
                height={72}
                className="h-18 w-18 shrink-0 rounded-2xl border border-slate-200 bg-white object-cover"
              />
            )}
            <div className="min-w-0">
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">{ficha.nombre}</h1>
              <p className="mt-1 text-slate-600">
                {categoria
                  ? `${categoria.plural} en ${ficha.ciudad}`
                  : `Restaurante en ${ficha.ciudad}`}
              </p>
            </div>
          </div>

          {ficha.descripcion && <p className="mt-4 text-slate-700">{ficha.descripcion}</p>}

          <a
            href={menuUrl}
            onClick={() => trackEvent("click_pedir_restaurante", { restaurante: ficha.slug })}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-4 text-base font-bold text-white shadow-sm transition-colors hover:bg-primary sm:w-auto"
          >
            <ShoppingBag className="h-5 w-5" /> Pedir ahora
          </a>

          <section className="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 md:grid-cols-2">
            <h2 className="sr-only">Información del restaurante</h2>
            {sede && (
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">Dirección</p>
                  <address className="not-italic text-slate-600">
                    {sede.direccion}, {sede.ciudad}
                  </address>
                  {ficha.sedes.length > 1 && (
                    <p className="mt-1 text-xs text-slate-500">
                      Otras sedes:{" "}
                      {ficha.sedes
                        .slice(1)
                        .map((s) => s.direccion)
                        .join(" · ")}
                    </p>
                  )}
                </div>
              </div>
            )}
            {ficha.telefono && (
              <div className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">Teléfono</p>
                  <a href={`tel:${ficha.telefono}`} className="text-slate-600 hover:text-primary">
                    {ficha.telefono}
                  </a>
                </div>
              </div>
            )}
            {horarios && (
              <div className="flex gap-3 md:col-span-2">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="w-full">
                  <p className="mb-1 font-semibold">Horario</p>
                  <Horarios dias={horarios} />
                </div>
              </div>
            )}
          </section>

          <div className="mt-10 space-y-10">
            {ficha.secciones.map((seccion, i) => (
              <section key={`${i}-${seccion.nombre}`}>
                <h2 className="text-2xl font-bold tracking-tight">{seccion.nombre}</h2>
                {seccion.descripcion && (
                  <p className="mt-1 text-sm text-slate-600">{seccion.descripcion}</p>
                )}
                <ul className="mt-4 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
                  {seccion.productos.map((p, j) => (
                    <li key={`${j}-${p.nombre}`} className="flex gap-4 p-4">
                      {p.imagen && (
                        <img
                          src={p.imagen}
                          alt={p.nombre}
                          width={80}
                          height={80}
                          loading="lazy"
                          decoding="async"
                          className="h-20 w-20 shrink-0 rounded-xl object-cover"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="font-semibold">{p.nombre}</h3>
                          <p className="shrink-0 font-bold text-slate-900">
                            {formatoPrecio(p.precio)}
                          </p>
                        </div>
                        {p.descripcion && (
                          <p className="mt-1 text-sm text-slate-600">{p.descripcion}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="mt-6 text-xs text-slate-500">
            Precios en pesos colombianos publicados por el restaurante. Pueden cambiar sin previo
            aviso; confírmalos al hacer tu pedido.
          </p>

          <a
            href={menuUrl}
            onClick={() => trackEvent("click_pedir_restaurante", { restaurante: ficha.slug })}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-4 text-base font-bold text-white hover:bg-primary"
          >
            <ShoppingBag className="h-5 w-5" /> Ver menú y pedir a {ficha.nombre}
          </a>

          {relacionados.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-bold">Más restaurantes en {ficha.ciudad}</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {relacionados.map((r) => (
                  <li key={r.slug}>
                    <a
                      href={r.ruta_publica}
                      className="block rounded-2xl border border-slate-200 bg-white p-4 hover:border-primary/40"
                    >
                      <span className="font-semibold">{r.nombre}</span>
                      <span className="block text-sm text-slate-500">
                        {categoriaDe(r.categoria_negocio)?.plural ?? "Restaurante"} · menú y precios
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Bloque B2B: discreto, debajo del contenido del restaurante. */}
          <aside className="mt-14 rounded-3xl border border-dashed border-slate-300 p-5 text-sm text-slate-600">
            <p>
              <strong className="text-slate-800">¿Tienes un restaurante?</strong> Crea tu menú
              digital con pedidos por QR como el de {ficha.nombre}.{" "}
              <a
                href="/menu-digital-qr?utm_source=directorio&utm_medium=restaurante&utm_campaign=crea_tu_menu"
                onClick={() =>
                  trackEvent("click_crea_tu_menu", {
                    origen: "restaurante",
                    restaurante: ficha.slug,
                  })
                }
                className="font-semibold text-primary hover:underline"
              >
                Conoce TAVI Orders
              </a>
            </p>
          </aside>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        Menú digital por{" "}
        <a href="/" className="font-semibold text-slate-700 hover:text-primary">
          TAVI Orders
        </a>{" "}
        · software para restaurantes
      </footer>
    </div>
  );
}
