/* Maderia landing — punto de entrada. */
import { CONFIG, usd } from './config.js';
import { idiomaInicial, aplicarIdioma, montarToggle, T } from './i18n.js';
import { VIDEOS, CATEGORIAS } from './videos.js';

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

/* ===== 1. Hero: baraja de 3 videos reales + línea de tiempo ===== */
function pintarBaraja() {
  const cont = document.querySelector('[data-hero-baraja]');
  if (!cont) return;
  const d = T[lang] || T.es;
  cont.innerHTML = VIDEOS.slice(0, 3).map(v => {
    const cat = (CATEGORIAS[v.categoria] || {})[lang] || v.categoria;
    const href = v.youtube.startsWith('http') ? v.youtube : '#videos';
    return `<a class="vcard" href="${href}" ${v.youtube.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} aria-label="${v.titulo} · ${d['vid.ver']}">
      <div class="vcard-media">
        <img src="${v.thumb}" alt="" loading="eager" decoding="async">
        <video src="${v.preview}" muted playsinline loop preload="none" aria-hidden="true"></video>
        <span class="vcard-dur">${v.duracion}</span>
      </div>
      <div class="vcard-cuerpo">
        <h3>${v.titulo}</h3>
        <div class="vcard-meta"><span class="chip canal">${cat}</span><span class="chip">${v.idioma}</span><span class="chip">${v.escenas} ${d['vid.escenas']}</span></div>
      </div>
    </a>`;
  }).join('');
  // Preview en video solo al pasar el ratón o enfocar (acción del usuario).
  cont.querySelectorAll('.vcard').forEach(card => {
    const vid = card.querySelector('video');
    const on = () => { card.classList.add('reproduciendo'); vid.play().catch(() => {}); };
    const off = () => { card.classList.remove('reproduciendo'); vid.pause(); };
    card.addEventListener('mouseenter', on); card.addEventListener('mouseleave', off);
    card.addEventListener('focus', on); card.addEventListener('blur', off);
  });
  const v0 = VIDEOS[0];
  const cat0 = (CATEGORIAS[v0.categoria] || {})[lang] || v0.categoria;
  document.querySelectorAll('[data-tl-canal]').forEach(e => e.textContent = cat0);
  document.querySelectorAll('[data-tl-dur]').forEach(e => e.textContent = v0.duracion);
  document.querySelectorAll('[data-tl-escenas]').forEach(e => e.textContent = String(v0.escenas));
}

function pintarLineaDeTiempo() {
  // Bloques de ancho pseudoaleatorio pero estable (misma secuencia en cada carga).
  const seq = [5,4,6,3,5,4,7,3,4,5,6,3,4,5,4,6,3,5,4,5];
  const bloques = (n, k) => seq.slice(0, n).map((w, idx) => `<i style="--w:${(w * k).toFixed(1)}%" class="${idx === 6 ? 'activa' : ''}"></i>`).join('');
  const video = document.querySelector('.tl-video'); if (video) video.innerHTML = bloques(20, 1.0);
  const voz = document.querySelector('.tl-voz'); if (voz) voz.innerHTML = bloques(20, 1.0);
  const subs = document.querySelector('.tl-subs'); if (subs) subs.innerHTML = bloques(20, 1.0);
}
pintarLineaDeTiempo();
pintarBaraja();
document.addEventListener('maderia:idioma', pintarBaraja);
