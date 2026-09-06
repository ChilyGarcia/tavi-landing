/**
 * Base URL de la aplicación TAVI (login y panel), que ahora vive en un
 * proyecto separado. Vacío por defecto -> enlaces relativos, útil cuando
 * landing y app comparten dominio detrás de un proxy inverso.
 */
export const APP_URL = import.meta.env.VITE_APP_URL ?? "";

export const LOGIN_URL = `${APP_URL}/login`;

/** WhatsApp comercial oficial (Colombia). */
export const WHATSAPP_PHONE_DISPLAY = "+57 317 368 7885";
export const WHATSAPP_PHONE_E164 = "573173687885";

export const WHATSAPP_PREFILL_MESSAGE =
  "Hola, estoy interesado en adquirir Tavi para mi negocio. ¿Me pueden contar cómo empezar?";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(WHATSAPP_PREFILL_MESSAGE)}`;
