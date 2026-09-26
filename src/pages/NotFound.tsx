import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <title>Página no encontrada | TAVI Orders</title>
      <meta name="robots" content="noindex, follow" />
      <div className="max-w-md text-center">
        <p className="text-7xl font-bold text-foreground">404</p>
        <h1 className="mt-4 text-xl font-semibold text-foreground">No encontramos esta página</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Puede que el enlace esté mal escrito o que la página se haya movido.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ir al inicio
          </Link>
          <Link
            to="/precios"
            className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Ver precios
          </Link>
          <Link
            to="/directorio"
            className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Directorio de restaurantes
          </Link>
        </div>
      </div>
    </div>
  );
}
