/**
 * Base URL de la aplicación TAVI (login y panel), que ahora vive en un
 * proyecto separado. Vacío por defecto -> enlaces relativos, útil cuando
 * landing y app comparten dominio detrás de un proxy inverso.
 */
export const APP_URL = import.meta.env.VITE_APP_URL ?? "";

export const LOGIN_URL = `${APP_URL}/login`;
