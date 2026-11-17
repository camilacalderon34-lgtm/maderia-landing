/* Maderia landing — punto de entrada. */
import { CONFIG, usd } from './config.js';
import { idiomaInicial, aplicarIdioma, montarToggle } from './i18n.js';

let lang = idiomaInicial();
montarToggle();
aplicarIdioma(lang);
document.addEventListener('maderia:idioma', e => { lang = e.detail.lang; pintarPrecios(); });

/* Rellena cualquier [data-precio] con el precio por minuto y [data-precio-ejemplo] con el costo de un video típico. */
function pintarPrecios() {
  document.querySelectorAll('[data-precio]').forEach(el => { el.textContent = usd(CONFIG.PRECIO_MIN_USD, lang); });
  document.querySelectorAll('[data-precio-ejemplo]').forEach(el => {
    el.textContent = usd(CONFIG.PRECIO_MIN_USD * CONFIG.MINUTOS_EJEMPLO, lang);
  });
  document.querySelectorAll('[data-minutos-gratis]').forEach(el => { el.textContent = String(CONFIG.MINUTOS_GRATIS); });
  document.querySelectorAll('[data-url-registro]').forEach(a => { a.href = CONFIG.URL_REGISTRO; });
  document.querySelectorAll('[data-url-login]').forEach(a => { a.href = CONFIG.URL_LOGIN; });
}
pintarPrecios();
