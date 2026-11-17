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

/* ===== 1. Hero: videos reales a los lados + línea de tiempo animada ===== */
function miniHTML(v, d) {
  const real = v.youtube.startsWith('http');
  return `<a class="mini" href="${real ? v.youtube : '#videos'}" ${real ? 'target="_blank" rel="noopener"' : ''} aria-label="${v.titulo} · ${d['vid.ver']}" title="${v.titulo}">
    <img src="${v.thumb}" alt="" loading="lazy" decoding="async">
    <video src="${v.preview}" muted playsinline loop preload="none" aria-hidden="true"></video>
    <span class="mini-dur">${v.duracion}</span>
  </a>`;
}
function activarPreviews(root) {
  root.querySelectorAll('.mini').forEach(card => {
    const vid = card.querySelector('video');
    const on = () => { card.classList.add('reproduciendo'); vid.play().catch(() => {}); };
    const off = () => { card.classList.remove('reproduciendo'); vid.pause(); };
    card.addEventListener('mouseenter', on); card.addEventListener('mouseleave', off);
    card.addEventListener('focus', on); card.addEventListener('blur', off);
  });
}
function pintarVideosHero() {
  const d = T[lang] || T.es;
  const izq = document.querySelector('[data-lado="izq"]');
  const der = document.querySelector('[data-lado="der"]');
  const tira = document.querySelector('[data-tira]');
  if (izq) izq.innerHTML = VIDEOS.filter((_, k) => k % 2 === 0).slice(0, 4).map(v => miniHTML(v, d)).join('');
  if (der) der.innerHTML = VIDEOS.filter((_, k) => k % 2 === 1).slice(0, 4).map(v => miniHTML(v, d)).join('');
  if (tira) tira.innerHTML = VIDEOS.slice(0, 8).map(v => miniHTML(v, d)).join('');
  [izq, der, tira].forEach(r => r && activarPreviews(r));
  const v0 = VIDEOS[0];
  const cat0 = (CATEGORIAS[v0.categoria] || {})[lang] || v0.categoria;
  document.querySelectorAll('[data-tl-canal]').forEach(e => e.textContent = cat0);
  document.querySelectorAll('[data-tl-dur]').forEach(e => e.textContent = v0.duracion);
}

/* Línea de tiempo: bloques estables + cursor que avanza y enciende el bloque activo. */
function montarLineaDeTiempo() {
  const tl = document.querySelector('.tl'); if (!tl) return;
  const seq = [5,4,6,3,5,4,7,3,4,5,6,3,4,5,4,6,3,5,4,5];
  const bloques = () => seq.map(w => `<i style="--w:${w}%"></i>`).join('');
  ['.tl-video', '.tl-voz', '.tl-subs'].forEach(sel => { const el = tl.querySelector(sel); if (el) el.innerHTML = bloques(); });
  const pistas = ['.tl-video', '.tl-voz', '.tl-subs'].map(sel => Array.from(tl.querySelectorAll(sel + ' i')));
  const total = seq.reduce((a, b) => a + b, 0);
  const limites = []; let acc = 0; seq.forEach(w => { acc += w; limites.push(acc / total); });
  const ahora = tl.querySelector('[data-tl-ahora]');
  const durTxt = () => (tl.querySelector('[data-tl-dur]') || {}).textContent || '18:44';
  const aSeg = t => { const [m, s] = t.split(':').map(Number); return m * 60 + (s || 0); };
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  function pintar(p) {
    tl.style.setProperty('--p', p.toFixed(4));
    const idx = Math.min(limites.findIndex(l => p < l), seq.length - 1);
    pistas.forEach(arr => arr.forEach((b, k) => {
      b.classList.toggle('activa', k === (idx < 0 ? seq.length - 1 : idx));
      b.classList.toggle('pasada', k < idx);
    }));
    if (ahora) ahora.textContent = fmt(aSeg(durTxt()) * p);
  }

  const reducir = matchMedia('(prefers-reduced-motion: reduce)');
  if (reducir.matches) { pintar(0.31); return; }

  const DURACION_MS = 16000;
  let visible = true, t0 = performance.now(), raf = 0;
  const paso = t => { const p = ((t - t0) % DURACION_MS) / DURACION_MS; pintar(p); if (visible && !document.hidden) raf = requestAnimationFrame(paso); };
  const arrancar = () => { cancelAnimationFrame(raf); t0 = performance.now() - (parseFloat(tl.style.getPropertyValue('--p')) || 0) * DURACION_MS; raf = requestAnimationFrame(paso); };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) arrancar(); }, { threshold: .2 }).observe(tl);
  } else arrancar();
  document.addEventListener('visibilitychange', () => { if (!document.hidden && visible) arrancar(); });
  pintar(0);
}
montarLineaDeTiempo();
pintarVideosHero();
document.addEventListener('maderia:idioma', pintarVideosHero);

/* Botón con ficha: el recorrido depende del ancho real del botón (cambia con el idioma). */
function medirBotones() {
  document.querySelectorAll('[data-boton-ficha]').forEach(b => b.style.setProperty('--ancho-boton', b.offsetWidth + 'px'));
}
medirBotones();
addEventListener('resize', medirBotones);
document.addEventListener('maderia:idioma', () => requestAnimationFrame(medirBotones));
if (document.fonts && document.fonts.ready) document.fonts.ready.then(medirBotones);
