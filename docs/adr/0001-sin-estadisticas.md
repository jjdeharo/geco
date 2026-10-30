# 1. GeCo no recoge estadísticas de uso

Fecha: 2026-10-30 · Estado: aceptado

## Contexto

Desde el 13 de marzo de 2026 la versión web de GeCo enviaba cada visita a un contador propio en bilateria.org (`track.php`), cargado por JSONP desde `analytics.js` y configurado con etiquetas `meta` en `index.html`. Con la visita iban la dirección de la página, la página de procedencia y los parámetros UTM. No usaba cookies ni guardaba la IP; solo dejaba en `localStorage` la hora de la última visita para no contarla dos veces en media hora. La aplicación de escritorio no lo enviaba, porque abre los archivos desde el disco. La web no tenía ningún aviso que lo explicara: el pie con el resumen de visitas se retiró el mismo día en que se añadió el contador.

La evaluación con la rúbrica VCER de la guía «Vibe coding responsable» puntúa con 0 el punto de datos personales si el recurso lleva analítica, sea propia o ajena. Además, la página de procedencia puede delatar el aula virtual desde la que el profesorado abre la aplicación, y los datos de uso del profesorado y su alumnado no tienen por qué salir de su equipo.

## Decisión

En la versión 2.6.1 se retira toda la analítica: el archivo `analytics.js`, su carga en `index.html`, las etiquetas `meta` del contador y su entrada en la lista de archivos que empaqueta Electron (`package.json`). GeCo ya no se comunica con ningún servidor: los nombres, las tipologías, las incompatibilidades y los equipos se guardan solo en el navegador o en la aplicación de escritorio. El README lo describe así.

## Alternativas descartadas

- **Mantener el contador propio y añadir un aviso de privacidad.** Aunque no usaba cookies ni guardaba la IP, seguía enviando la dirección de la página y la de procedencia, y la rúbrica VCER puntúa con 0 cualquier analítica.

## Consecuencias

- Ya no hay cifras de uso de GeCo.
- Los datos del contador siguen en el alojamiento de IONOS (`/app/estadistica/geco/`) y en el panel central de estadísticas. Se archivan y se borran del servidor en una tarea aparte.
- Quien ya visitó la web conserva en su navegador la clave `analytics:last-visit:geco`, que ya no se lee ni se envía.
