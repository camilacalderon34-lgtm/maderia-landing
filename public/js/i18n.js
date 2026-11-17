/* Maderia landing — diccionario ES/EN y toggle de idioma.
   Español primero. Cada sección añade sus claves aquí al entregarse. */
export const T = {
  es: {
    'meta.title': 'Maderia — Videos largos para tus canales de YouTube, en piloto automático',
    'nav.precios': 'Precios', 'nav.preguntas': 'Preguntas', 'nav.entrar': 'Entrar',
    'hero.p1': 'Para quien corre varios canales', 'hero.p2': 'el minuto de video',
    'hero.sobre': 'Videos largos de YouTube sin mostrar la cara',
    'hero.t1': 'Escribe el título.', 'hero.t2': 'Maderia hace el video.',
    'hero.p': 'Eliges el canal, escribes el título y Maderia escribe el guion, pone la voz, busca un clip para cada frase, lo revisa y lo renderiza. <strong>Un video de 15 a 20 minutos listo para subir.</strong>',
    'hero.cta': 'Haz tu primer video gratis',
    'hero.n1': 'Sin tarjeta', 'hero.n2': 'primer video gratis hasta', 'hero.n3': 'min', 'hero.n4': 'videos de 15 a 20 min',
    'tl.titulo': 'Línea de tiempo', 'tl.video': 'Video', 'tl.voz': 'Voz', 'tl.subs': 'Subtítulos', 'tl.musica': 'Música', 'tl.pie': 'escenas · un clip por frase',
    'vid.escenas': 'escenas', 'vid.ver': 'Ver en YouTube',
    'demo.sobre': '¿Cómo funciona?', 'demo.t': 'Menos producir, más publicar.',
    'demo.sub': 'Del título al video terminado, tal como se ve por dentro.',
    'demo.ver': 'Ver la demo', 'demo.play': 'Reproducir el video',
    'res.sobre': 'Resultados', 'res.t': 'Videos hechos con Maderia, publicados en YouTube.',
    'res.sub': 'Canales reales de distintos nichos. Dale play a cualquiera.',
    'res.vistas': 'vistas', 'res.ver': 'Ver', 'res.hecho': 'Hecho con', 'res.visor': 'Reproductor de video',
    'res.cerrar': 'Cerrar', 'res.ant': 'Anterior', 'res.sig': 'Siguiente',
    'res.nota': 'Duración y vistas según YouTube al 17 de noviembre de 2026.',
    'meta.desc': 'Elige el canal, escribe el título. Maderia hace el guion, la voz, los clips, la revisión y el render. Tu primer video, gratis.',
  },
  en: {
    'meta.title': 'Maderia — Long-form videos for your YouTube channels, on autopilot',
    'nav.precios': 'Pricing', 'nav.preguntas': 'FAQ', 'nav.entrar': 'Log in',
    'hero.p1': 'For people who run several channels', 'hero.p2': 'per minute of video',
    'hero.sobre': 'Long-form faceless YouTube videos',
    'hero.t1': 'Type the title.', 'hero.t2': 'Maderia makes the video.',
    'hero.p': 'Pick the channel, type the title, and Maderia writes the script, records the voice, finds a clip for every sentence, reviews it and renders it. <strong>A 15 to 20 minute video, ready to upload.</strong>',
    'hero.cta': 'Make your first video free',
    'hero.n1': 'No card', 'hero.n2': 'first video free up to', 'hero.n3': 'min', 'hero.n4': '15 to 20 minute videos',
    'tl.titulo': 'Timeline', 'tl.video': 'Video', 'tl.voz': 'Voice', 'tl.subs': 'Captions', 'tl.musica': 'Music', 'tl.pie': 'scenes · one clip per sentence',
    'vid.escenas': 'scenes', 'vid.ver': 'Watch on YouTube',
    'demo.sobre': 'How does it work?', 'demo.t': 'Less producing, more publishing.',
    'demo.sub': 'From the title to the finished video, exactly as it looks inside.',
    'demo.ver': 'Watch the demo', 'demo.play': 'Play the video',
    'res.sobre': 'Results', 'res.t': 'Videos made with Maderia, published on YouTube.',
    'res.sub': 'Real channels across different niches. Press play on any of them.',
    'res.vistas': 'views', 'res.ver': 'Watch', 'res.hecho': 'Made with', 'res.visor': 'Video player',
    'res.cerrar': 'Close', 'res.ant': 'Previous', 'res.sig': 'Next',
    'res.nota': 'Duration and views per YouTube as of November 17, 2026.',
    'meta.desc': 'Pick the channel, type the title. Maderia writes, narrates, finds the clips, reviews and renders. Your first video is free.',
  },
};

const CLAVE_LS = 'maderia.lang';

export function idiomaInicial() {
  try { const g = localStorage.getItem(CLAVE_LS); if (g === 'es' || g === 'en') return g; } catch {}
  return 'es'; // español primero; el visitante cambia a EN con el toggle y se recuerda
}

export function aplicarIdioma(lang) {
  const d = T[lang] || T.es;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (d[k] != null) el.innerHTML = d[k];
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    // formato: data-i18n-attr="aria-label:clave,placeholder:otra"
    el.getAttribute('data-i18n-attr').split(',').forEach(par => {
      const [attr, k] = par.split(':').map(s => s.trim());
      if (d[k] != null) el.setAttribute(attr, d[k]);
    });
  });
  document.title = d['meta.title'];
  const m = document.querySelector('meta[name="description"]');
  if (m) m.setAttribute('content', d['meta.desc']);
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  try { localStorage.setItem(CLAVE_LS, lang); } catch {}
  document.dispatchEvent(new CustomEvent('maderia:idioma', { detail: { lang } }));
}

export function montarToggle() {
  document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => aplicarIdioma(b.dataset.lang)));
}
