# Maderia — landing (usemaderia.com)

Sitio estático servido por Cloudflare Workers (static assets). Sin build. Lo que hay en `public/` es lo que se publica.

## Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| Precio por minuto, minutos gratis, URLs de la app | `public/js/config.js` |
| Los 8 videos reales de la sección 4 | `public/js/videos.js` |
| Precios de competidores y su fuente/fecha | `public/js/competencia.js` |
| Textos ES/EN | `public/js/i18n.js` |
| Tokens de color y tipografía | `public/css/landing.css` (bloque `:root`) |

## Despliegue

1. Cloudflare → Workers & Pages → Create → Import a repository → este repo.
2. Build command: ninguno. Deploy command: `npx wrangler deploy`. Carpeta: `public`.
3. Cada push a `main` publica. Las ramas generan URL de preview.
4. Dominio: Settings → Domains & Routes → Add → `usemaderia.com`.

## Probar en local

```bash
npx wrangler dev
```
o cualquier servidor estático apuntando a `public/` (por ejemplo `python3 -m http.server -d public 8080`).
