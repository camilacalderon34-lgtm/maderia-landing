/* Maderia landing — videos reales.
   UNA sola lista para toda la página:
     · Sección "Resultados": los que tienen `youtube` (id del video). Se abren en el visor propio.
     · Hero: los 8 primeros de la lista (miniaturas a los lados).
   Para añadir un video de YouTube: copia una entrada con `youtube`, pon el id (lo que va después de v=),
   descarga su miniatura a /assets/videos/yt_<id>.jpg (https://i.ytimg.com/vi/<id>/maxresdefault.jpg)
   y rellena título, canal, duración y vistas.
   Datos de YouTube verificados el 17-nov-2026 (vistas redondeadas por la página al mostrarse). */
export const VIDEOS = [
  { youtube: 'PTYJ4z8v6xs', titulo: "I Haven't Bought Shampoo in 40 Years — The Old British Mix My Mum Swore By",
    canal: 'Nan Margaret', categoria: 'hogar', idioma: 'EN', duracion: '15:19', vistas: 976203,
    thumb: '/assets/videos/yt_PTYJ4z8v6xs.jpg' },
  { youtube: 'br2rZkR8wuc', titulo: "15 Dishes I'd Never Order After 31 Years Running Restaurants",
    canal: 'Dining with Gus', categoria: 'rest', idioma: 'EN', duracion: '11:33', vistas: 331675,
    thumb: '/assets/videos/yt_br2rZkR8wuc.jpg' },
  { youtube: 'oDwlcJ2vlro', titulo: "DON'T Buy These Christmas Chocolate Tubs — Only One Is Still Worth It",
    canal: 'Food Reality UK', categoria: 'comida', idioma: 'EN', duracion: '15:52', vistas: 304401,
    thumb: '/assets/videos/yt_oDwlcJ2vlro.jpg' },
  { youtube: 'SgqK0fhldeU', titulo: 'The "Secret" 2-Ingredient Mix That Clears Cloudy Pool Water',
    canal: 'The Pool Guy Mike', categoria: 'hogar', idioma: 'EN', duracion: '10:57', vistas: 77448,
    thumb: '/assets/videos/yt_SgqK0fhldeU.jpg' },
  { youtube: 'FIZQgAPkyH0', titulo: "How the Great Lakes Are Quietly Building America's Next Megaregion",
    canal: 'Boundless Building', categoria: 'constr', idioma: 'EN', duracion: '13:24', vistas: 27652,
    thumb: '/assets/videos/yt_FIZQgAPkyH0.jpg' },

  /* Sin enlace de YouTube todavía: solo se usan en el hero (miniatura + preview local). */
  { youtube: null, titulo: 'How Oklahoma City Is Quietly Building America’s Tallest Skyscraper',
    categoria: 'constr', idioma: 'EN', escenas: 288, duracion: '18:44',
    thumb: '/assets/videos/v_527.jpg', preview: '/assets/videos/p_527.mp4' },
  { youtube: null, titulo: 'Dueños de Ford: haz esto y tu Ford durará 500 mil km sin ir al taller',
    categoria: 'coches', idioma: 'ES', escenas: 269, duracion: '17:25',
    thumb: '/assets/videos/v_530.jpg', preview: '/assets/videos/p_530.mp4' },
  { youtube: null, titulo: 'How British Women Washed in the 1970s, Without a Single Shower',
    categoria: 'historia', idioma: 'EN', escenas: 257, duracion: '16:34',
    thumb: '/assets/videos/v_511.jpg', preview: '/assets/videos/p_511.mp4' },
  { youtube: null, titulo: 'Never Reheat These 9 Foods — A Restaurant Manager Explains What Happens Inside',
    categoria: 'rest', idioma: 'EN', escenas: 237, duracion: '15:21',
    thumb: '/assets/videos/v_532.jpg', preview: '/assets/videos/p_532.mp4' },
  { youtube: null, titulo: 'Don’t Buy These Smoked Salmon Packs — Only One Is Actually Scottish',
    categoria: 'comida', idioma: 'EN', escenas: 188, duracion: '12:20',
    thumb: '/assets/videos/v_508.jpg', preview: '/assets/videos/p_508.mp4' },
  { youtube: null, titulo: '25 Chain Restaurant Dishes Seniors Should Never Order',
    categoria: 'rest', idioma: 'EN', escenas: 375, duracion: '24:23',
    thumb: '/assets/videos/v_509.jpg', preview: '/assets/videos/p_509.mp4' },
  { youtube: null, titulo: 'How North Carolina Is Quietly Building America’s Next Mega-City',
    categoria: 'constr', idioma: 'EN', escenas: 297, duracion: '19:18',
    thumb: '/assets/videos/v_512.jpg', preview: '/assets/videos/p_512.mp4' },
  { youtube: null, titulo: 'Canada Is Building a Road to Towns You Can Only Reach by Plane',
    categoria: 'constr', idioma: 'EN', escenas: 209, duracion: '13:37',
    thumb: '/assets/videos/v_533.jpg', preview: '/assets/videos/p_533.mp4' },
];

/** Los que tienen video en YouTube, para la sección Resultados y el visor. */
export const RESULTADOS = VIDEOS.filter(v => v.youtube);

/* Textos visibles de cada categoría, por idioma. */
export const CATEGORIAS = {
  constr:   { es: 'Construcción', en: 'Construction' },
  rest:     { es: 'Restaurantes', en: 'Restaurants' },
  coches:   { es: 'Coches',       en: 'Cars' },
  comida:   { es: 'Comida',       en: 'Food' },
  historia: { es: 'Historia',     en: 'History' },
  hogar:    { es: 'Hogar',        en: 'Home' },
};
