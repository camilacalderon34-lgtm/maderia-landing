/* Maderia landing — diccionario ES/EN y toggle de idioma.
   Español primero. Cada sección añade sus claves aquí al entregarse. */
export const T = {
  es: {
    'meta.title': 'Maderia — Videos largos para tus canales de YouTube, en piloto automático',
    'meta.desc': 'Elige el canal, escribe el título. Maderia hace el guion, la voz, los clips, la revisión y el render. Tu primer video, gratis.',
  },
  en: {
    'meta.title': 'Maderia — Long-form videos for your YouTube channels, on autopilot',
    'meta.desc': 'Pick the channel, type the title. Maderia writes, narrates, finds the clips, reviews and renders. Your first video is free.',
  },
};

const CLAVE_LS = 'maderia.lang';

export function idiomaInicial() {
  try { const g = localStorage.getItem(CLAVE_LS); if (g === 'es' || g === 'en') return g; } catch {}
  return (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
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
