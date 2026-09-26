// src/components/layout/Footer.tsx
import { Link } from "@tanstack/react-router";
import { TaviLogo } from "@/components/Logo";
import { LOGIN_URL } from "@/lib/site-links";

export function Footer() {
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
                  <Link to="/" hash="features" className="transition-colors hover:text-primary">
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link to="/" hash="how" className="transition-colors hover:text-primary">
                    Cómo funciona
                  </Link>
                </li>
                <li>
                  <Link to="/precios" className="transition-colors hover:text-primary">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link to="/" hash="showcase" className="transition-colors hover:text-primary">
                    Casos de éxito
                  </Link>
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
