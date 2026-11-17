/* Maderia landing — sección 4, videos reales.
   Un objeto por tarjeta. Para reemplazar un placeholder basta editar este array.
   Campos:
     id        identificador interno (coincide con assets/videos/v_{id}.jpg y p_{id}.mp4)
     titulo    título tal como está en YouTube
     categoria clave de categoría; el texto visible sale de i18n (tema.*)
     idioma    'ES' | 'EN'
     escenas   número de escenas del video
     duracion  'mm:ss'
     youtube   URL del video en YouTube  <-- TODO: el único dato que falta en los 8
     thumb     ruta local de la miniatura
     preview   ruta local del clip corto que se reproduce al pasar el ratón
   Los 7 campos de datos ya vienen de la landing actual (verificados 16-nov-2026). */
export const VIDEOS = [
  { id: 527, titulo: 'How Oklahoma City Is Quietly Building America’s Tallest Skyscraper',
    categoria: 'constr', idioma: 'EN', escenas: 288, duracion: '18:44',
    youtube: 'TODO_URL_YOUTUBE_527', thumb: '/assets/videos/v_527.jpg', preview: '/assets/videos/p_527.mp4' },
  { id: 532, titulo: 'Never Reheat These 9 Foods — A Restaurant Manager Explains What Happens Inside',
    categoria: 'rest', idioma: 'EN', escenas: 237, duracion: '15:21',
    youtube: 'TODO_URL_YOUTUBE_532', thumb: '/assets/videos/v_532.jpg', preview: '/assets/videos/p_532.mp4' },
  { id: 530, titulo: 'Dueños de Ford: haz esto y tu Ford durará 500 mil km sin ir al taller',
    categoria: 'coches', idioma: 'ES', escenas: 269, duracion: '17:25',
    youtube: 'TODO_URL_YOUTUBE_530', thumb: '/assets/videos/v_530.jpg', preview: '/assets/videos/p_530.mp4' },
  { id: 508, titulo: 'Don’t Buy These Smoked Salmon Packs — Only One Is Actually Scottish',
    categoria: 'comida', idioma: 'EN', escenas: 188, duracion: '12:20',
    youtube: 'TODO_URL_YOUTUBE_508', thumb: '/assets/videos/v_508.jpg', preview: '/assets/videos/p_508.mp4' },
  { id: 511, titulo: 'How British Women Washed in the 1970s, Without a Single Shower',
    categoria: 'historia', idioma: 'EN', escenas: 257, duracion: '16:34',
    youtube: 'TODO_URL_YOUTUBE_511', thumb: '/assets/videos/v_511.jpg', preview: '/assets/videos/p_511.mp4' },
  { id: 509, titulo: '25 Chain Restaurant Dishes Seniors Should Never Order',
    categoria: 'rest', idioma: 'EN', escenas: 375, duracion: '24:23',
    youtube: 'TODO_URL_YOUTUBE_509', thumb: '/assets/videos/v_509.jpg', preview: '/assets/videos/p_509.mp4' },
  { id: 512, titulo: 'How North Carolina Is Quietly Building America’s Next Mega-City',
    categoria: 'constr', idioma: 'EN', escenas: 297, duracion: '19:18',
    youtube: 'TODO_URL_YOUTUBE_512', thumb: '/assets/videos/v_512.jpg', preview: '/assets/videos/p_512.mp4' },
  { id: 533, titulo: 'Canada Is Building a Road to Towns You Can Only Reach by Plane',
    categoria: 'constr', idioma: 'EN', escenas: 209, duracion: '13:37',
    youtube: 'TODO_URL_YOUTUBE_533', thumb: '/assets/videos/v_533.jpg', preview: '/assets/videos/p_533.mp4' },
];

/* Textos visibles de cada categoría, por idioma. */
export const CATEGORIAS = {
  constr:   { es: 'Construcción', en: 'Construction' },
  rest:     { es: 'Restaurantes', en: 'Restaurants' },
  coches:   { es: 'Coches',       en: 'Cars' },
  comida:   { es: 'Comida',       en: 'Food' },
  historia: { es: 'Historia',     en: 'History' },
};
