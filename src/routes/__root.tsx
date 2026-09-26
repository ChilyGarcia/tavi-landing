import { useEffect, type ReactNode } from "react";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { NotFound } from "@/pages/NotFound";
import { SITE_NAME, jsonLd } from "@/lib/seo";
import { organizationLd, websiteLd } from "@/lib/structured-data";
import { ga4Scripts, trackEvent } from "@/lib/analytics";
import appCss from "@/styles.css?url";

const FONTS_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@400..900&display=swap";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#FF6B35" },
      { name: "author", content: SITE_NAME },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "es_CO" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONTS_URL },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-v2-48x48.png" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-v2-96x96.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-v2-192x192.png" },
      { rel: "icon", type: "image/x-icon", href: "/favicon-v2.ico" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon-v2.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [jsonLd(organizationLd), jsonLd(websiteLd), ...ga4Scripts()],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es-CO" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/** Conversiones por clic en enlaces (WhatsApp, login), sin instrumentar cada botón. */
function useConversionLinks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const pagina = window.location.pathname;
      if (link.hostname === "wa.me" || link.hostname === "api.whatsapp.com") {
        trackEvent("click_whatsapp", { pagina });
      } else if (link.pathname === "/login") {
        trackEvent("click_login", { pagina });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
}

function RootComponent() {
  useConversionLinks();
  return (
    <>
      <Outlet />
      <WhatsAppFloat />
      <Toaster richColors position="top-right" />
    </>
  );
}
