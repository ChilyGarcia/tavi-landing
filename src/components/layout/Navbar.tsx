// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TaviLogo } from "@/components/Logo";
import { LOGIN_URL } from "@/lib/site-links";

interface NavbarProps {
  onDemo?: () => void;
}

export function Navbar({ onDemo }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isPricing = location.pathname === "/precios";

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Scrolled down past 80px -> Hide
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      }
      // Scrolled up -> Show
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // Determine if the target section is on the current page
    const homeSections = ["features", "how"];
    const pricingSections = ["planes", "modulos", "tabla-completa", "calculadora"];

    const isTargetOnHome = homeSections.includes(id);
    const isTargetOnPricing = pricingSections.includes(id);

    // If navigating to another page, let the router handle it
    if ((isTargetOnHome && !isHome) || (isTargetOnPricing && !isPricing)) {
      return;
    }

    e.preventDefault();
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link
          to="/"
          onClick={(e) => {
            if (!isHome) {
              return; // Let the router handle navigation to "/"
            }
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <TaviLogo />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/60 px-2 py-1 text-sm text-muted-foreground md:flex shadow-sm">
          {isHome ? (
            <>
              <Link
                to="#features"
                onClick={(e) => scrollToSection(e, "features")}
                className="rounded-full px-4 py-1.5 transition-colors hover:bg-primary hover:text-primary-foreground font-medium"
              >
                Funcionalidades
              </Link>
              <Link
                to="#how"
                onClick={(e) => scrollToSection(e, "how")}
                className="rounded-full px-4 py-1.5 transition-colors hover:bg-primary hover:text-primary-foreground font-medium"
              >
                Cómo funciona
              </Link>
              <Link
                to="/precios"
                className="rounded-full px-4 py-1.5 transition-colors hover:bg-primary hover:text-primary-foreground font-medium"
              >
                Precios
              </Link>
            </>
          ) : isPricing ? (
            <>
              <Link
                to="#planes"
                onClick={(e) => scrollToSection(e, "planes")}
                className="rounded-full px-4 py-1.5 transition-colors hover:bg-primary hover:text-primary-foreground font-medium"
              >
                Planes
              </Link>
              <Link
                to="#modulos"
                onClick={(e) => scrollToSection(e, "modulos")}
                className="rounded-full px-4 py-1.5 transition-colors hover:bg-primary hover:text-primary-foreground font-medium"
              >
                Módulos
              </Link>
              <Link
                to="#tabla-completa"
                onClick={(e) => scrollToSection(e, "tabla-completa")}
                className="rounded-full px-4 py-1.5 transition-colors hover:bg-primary hover:text-primary-foreground font-medium"
              >
                Comparativa
              </Link>
              <Link
                to="#calculadora"
                onClick={(e) => scrollToSection(e, "calculadora")}
                className="rounded-full px-4 py-1.5 transition-colors hover:bg-primary hover:text-primary-foreground font-medium"
              >
                Calculadora
              </Link>
            </>
          ) : (
            <Link
              to="/precios"
              className="rounded-full px-4 py-1.5 transition-colors hover:bg-primary hover:text-primary-foreground font-medium"
            >
              Precios
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onDemo}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 sm:px-5 sm:py-2.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:scale-95 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Prueba el sistema en vivo</span>
            <span className="sm:hidden">Demo</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
