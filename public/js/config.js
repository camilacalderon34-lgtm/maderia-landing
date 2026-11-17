/* Maderia landing — constantes de negocio.
   ÚNICO lugar donde se cambian precio, tope gratis y URLs de la app. */
export const CONFIG = Object.freeze({
  // TODO validar contra el costo real de render antes de publicar. Placeholder.
  PRECIO_MIN_USD: 0.79,
  // Duración máxima del primer video gratis, en minutos.
  MINUTOS_GRATIS: 5,
  // Duración típica de un video, para ejemplos de costo en la página.
  MINUTOS_EJEMPLO: 18,
  // URLs de la app.
  URL_APP: 'https://app.usemaderia.com/',
  // TODO confirmar la ruta real de registro cuando se abra el acceso público
  // (hoy app.usemaderia.com está detrás de Cloudflare Access).
  URL_REGISTRO: 'https://app.usemaderia.com/',
  URL_LOGIN: 'https://app.usemaderia.com/',
  // Moneda y formato.
  MONEDA: 'USD',
});

/** Formatea dólares según el idioma activo: 0.79 -> "$0,79" (es) / "$0.79" (en). */
export function usd(n, lang = 'es', decimales = 2) {
  return '$' + new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US', {
    minimumFractionDigits: decimales, maximumFractionDigits: decimales,
  }).format(n);
}
