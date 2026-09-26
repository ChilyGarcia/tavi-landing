/**
 * Eventos de conversión. Independiente del proveedor: empuja a `dataLayer`
 * (GTM) y llama a `gtag` si GA4 está cargado (ver `GA_MEASUREMENT_ID`).
 * Sin ID configurado no carga nada y los eventos quedan en `dataLayer`.
 */
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? "";

export type EventoConversion =
  | "click_whatsapp"
  | "click_demo"
  | "submit_demo"
  | "click_login"
  | "click_crea_tu_menu"
  | "click_pedir_restaurante";

type WindowConAnalytics = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

export function trackEvent(evento: EventoConversion, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const w = window as WindowConAnalytics;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event: evento, ...params });
  w.gtag?.("event", evento, params);
}

/** Snippet de GA4 para `head().scripts` del root (solo si hay ID). */
export function ga4Scripts() {
  if (!GA_MEASUREMENT_ID) return [];
  return [
    { src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, async: true },
    {
      children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`,
    },
  ];
}
