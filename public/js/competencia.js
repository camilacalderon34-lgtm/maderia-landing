/* Maderia landing — sección 10, comparativa de precio por minuto.
   REGLA: cada número se verifica en la página del competidor antes de publicarlo
   y se guarda la URL y la fecha de verificación. No copiar de tablas de terceros.
   Estado: PENDIENTE DE VERIFICAR. Los valores de abajo son el punto de partida del brief. */
export const COMPETENCIA = [
  { nombre: 'Elftuber', plan: '$24/mes · 24 min',
    precioMin: 1.00, fuente: 'https://elftuber.com', verificado: null /* TODO */ },
  { nombre: 'ihateediting.ai', plan: 'sin plan',
    precioMin: 1.30, fuente: 'https://ihateediting.ai', verificado: null /* TODO */ },
  { nombre: 'VidRush', plan: 'Starter · $99/mes',
    precioMin: 2.18, fuente: 'https://vidrush.ai (FAQ: "Starting from $2.18 per finished minute")', verificado: null /* TODO */ },
];
