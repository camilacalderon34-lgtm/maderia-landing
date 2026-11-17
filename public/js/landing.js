/* Maderia landing — punto de entrada. */
import { CONFIG, usd } from './config.js';
import { idiomaInicial, aplicarIdioma, montarToggle, T } from './i18n.js';
import { VIDEOS, RESULTADOS, CATEGORIAS } from './videos.js';

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
  const idx = RESULTADOS.indexOf(v);
  return `<a class="mini" href="#videos" ${idx >= 0 ? `data-abrir-video="${idx}"` : ''} aria-label="${v.titulo} · ${d['res.ver']}" title="${v.titulo}">
    <img src="${v.thumb}" alt="" loading="lazy" decoding="async">
    ${v.preview ? `<video src="${v.preview}" muted playsinline loop preload="none" aria-hidden="true"></video>` : ''}
    <span class="mini-dur">${v.duracion}</span>
  </a>`;
}
function activarPreviews(root) {
  root.querySelectorAll('.mini').forEach(card => {
    const vid = card.querySelector('video');
    if (!vid) return;
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
  document.querySelectorAll('[data-boton-ficha]').forEach(b => { b.style.setProperty('--ancho-boton', b.offsetWidth + 'px'); b.style.setProperty('--alto-boton', b.offsetHeight + 'px'); });
}
medirBotones();
addEventListener('resize', medirBotones);
document.addEventListener('maderia:idioma', () => requestAnimationFrame(medirBotones));
if (document.fonts && document.fonts.ready) document.fonts.ready.then(medirBotones);

/* ===== 2. Demo: video desde CONFIG.VIDEO_DEMO, play al pulsar ===== */
(function montarDemo() {
  const video = document.querySelector('[data-demo-video]'); if (!video) return;
  const ventana = video.closest('.ventana');
  const btn = document.querySelector('[data-demo-play]');
  const dur = document.querySelector('[data-demo-dur]');
  // Fuente y portada desde la configuración (un solo lugar para cambiarlas).
  if (CONFIG.VIDEO_DEMO) {
    if (CONFIG.VIDEO_DEMO.poster) video.poster = CONFIG.VIDEO_DEMO.poster;
    const src = video.querySelector('source');
    if (CONFIG.VIDEO_DEMO.src && src && src.getAttribute('src') !== CONFIG.VIDEO_DEMO.src) { src.src = CONFIG.VIDEO_DEMO.src; video.load(); }
  }
  const pintarDur = () => {
    if (!dur || !isFinite(video.duration) || !video.duration) return;
    const s = Math.round(video.duration);
    dur.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    dur.hidden = false;
  };
  video.addEventListener('loadedmetadata', pintarDur);
  if (video.readyState >= 1) pintarDur(); // por si los metadatos llegaron antes que este script
  btn.addEventListener('click', () => {
    ventana.classList.add('reproduciendo');
    video.controls = true;
    video.play().catch(() => {});
  });
  video.addEventListener('ended', () => { ventana.classList.remove('reproduciendo'); video.controls = false; });
})();

/* ===== 3. Resultados: rejilla + visor propio ===== */
const vistasFmt = n => new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n);

function pintarResultados() {
  const cont = document.querySelector('[data-resultados]'); if (!cont) return;
  const d = T[lang] || T.es;
  cont.innerHTML = RESULTADOS.map((v, k) => `
    <button type="button" class="tarjeta-video" data-abrir-video="${k}" aria-label="${d['res.ver']}: ${v.titulo} · ${v.canal}" title="${v.titulo}">
      <div class="tarjeta-media">
        <img src="${v.thumb}" alt="" loading="lazy" decoding="async">
        <span class="tarjeta-play" aria-hidden="true"><span><svg viewBox="0 0 24 24" width="24" height="24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span></span>
        <span class="tarjeta-dur">${v.duracion}</span>
      </div>
    </button>`).join('');
}

const visor = (() => {
  const dlg = document.querySelector('[data-visor]'); if (!dlg) return null;
  const iframe = dlg.querySelector('[data-visor-iframe]');
  const titulo = dlg.querySelector('[data-visor-titulo]');
  const nEl = dlg.querySelector('[data-visor-n]');
  const totalEl = dlg.querySelector('[data-visor-total]');
  const tira = dlg.querySelector('[data-visor-tira]');
  const ant = dlg.querySelector('[data-visor-ant]');
  const sig = dlg.querySelector('[data-visor-sig]');
  let actual = 0;

  const srcDe = v => `https://www.youtube-nocookie.com/embed/${v.youtube}?autoplay=1&rel=0&modestbranding=1&playsinline=1&color=white`;

  function mostrar(k) {
    actual = (k + RESULTADOS.length) % RESULTADOS.length;
    const v = RESULTADOS[actual];
    iframe.title = v.titulo;
    iframe.src = srcDe(v);
    titulo.innerHTML = `<b>${v.titulo}</b><span>${v.canal} · ${vistasFmt(v.vistas)} ${(T[lang] || T.es)['res.vistas']}</span>`;
    nEl.textContent = String(actual + 1);
    totalEl.textContent = String(RESULTADOS.length);
    tira.querySelectorAll('.visor-mini').forEach((b, i) => {
      b.setAttribute('aria-selected', String(i === actual));
      if (i === actual) b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    });
  }
  function pintarTira() {
    tira.innerHTML = RESULTADOS.map((v, i) => `<button type="button" class="visor-mini" role="tab" aria-selected="false" aria-label="${v.titulo}" data-ir="${i}"><img src="${v.thumb}" alt="" loading="lazy"></button>`).join('');
    tira.querySelectorAll('[data-ir]').forEach(b => b.addEventListener('click', () => mostrar(Number(b.dataset.ir))));
  }
  const cerrarBtn = dlg.querySelector('[data-visor-cerrar]');
  function abrir(k) {
    if (!dlg.open) { dlg.showModal(); document.documentElement.style.overflow = 'hidden'; }
    mostrar(k);
    cerrarBtn.focus();
  }
  // YouTube roba el foco al cargar. Durante los 3 s siguientes a la carga lo devolvemos al visor;
  // después, si la persona pulsa el reproductor, el foco es suyo (espacio para pausar, etc.).
  let robo = 0;
  iframe.addEventListener('load', () => { if (!dlg.open) return; robo = Date.now(); setTimeout(() => cerrarBtn.focus(), 50); });
  window.addEventListener('blur', () => { if (dlg.open && Date.now() - robo < 3000) setTimeout(() => { if (document.activeElement === iframe) cerrarBtn.focus(); }, 0); });
  // Si el foco se va al iframe, al mover el ratón fuera del reproductor lo recuperamos.
  dlg.addEventListener('mousemove', e => { if (document.activeElement === iframe && !e.target.closest('.visor-pantalla')) cerrarBtn.focus(); });
  function cerrar() { if (dlg.open) dlg.close(); }
  dlg.addEventListener('close', () => { iframe.src = 'about:blank'; document.documentElement.style.overflow = ''; });
  cerrarBtn.addEventListener('click', cerrar);
  dlg.addEventListener('click', e => { if (e.target === dlg) cerrar(); }); // clic fuera del marco
  ant.addEventListener('click', () => mostrar(actual - 1));
  sig.addEventListener('click', () => mostrar(actual + 1));
  dlg.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') mostrar(actual - 1); if (e.key === 'ArrowRight') mostrar(actual + 1); });
  pintarTira();
  return { abrir, cerrar };
})();

document.addEventListener('click', e => {
  const t = e.target.closest('[data-abrir-video]'); if (!t || !visor) return;
  e.preventDefault();
  visor.abrir(Number(t.dataset.abrirVideo));
});
pintarResultados();
document.addEventListener('maderia:idioma', pintarResultados);
