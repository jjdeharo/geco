# Restricciones de GeCo

## Generales
- El tamaño mínimo de equipo es de 2 personas; si se solicita menos, se muestra un aviso.
- Se necesita al menos una persona para poder generar equipos.
- Los alumnos marcados como incompatibles se distribuyen en equipos distintos en todos los modos.
- Las incompatibilidades se limpian automáticamente cuando la persona ya no figura en ninguna tipología.
- Los equipos mantienen siempre el mayor equilibrio posible dentro de los límites de cada modo.

## Equipos heterogéneos
- Se parte del número máximo de equipos completos según los miembros solicitados.
- Se reparten primero los alumnos de tipología A y C, y después los B.
- Se intenta garantizar que cada equipo tenga al menos un A o un C; si no es posible, se intercambian miembros.
- Los sobrantes:
  - `Crear un equipo nuevo`: se agrupan entre sí respetando el tamaño objetivo siempre que sea viable.
  - `Agregar a otros equipos`: se reparten buscando mantener tamaños similares; si todos los equipos están llenos, se insertan en el equipo con menor tamaño.

## Equipos homogéneos
- Se crean equipos separados por tipología, completando con alumnado del mismo tipo siempre que sea posible.
- Las personas incompatibles se asignan antes de distribuir al resto.
- Los sobrantes por tipología se agrupan evitando equipos de una sola persona; si queda un único alumno, se combina con otro grupo del mismo bloque.
- Cuando sobran personas y se selecciona `Agregar a otros equipos`, se incorporan a equipos con tipologías compatibles:
  - A → equipo mayoritariamente B (o en su defecto A/C).
  - C → equipo mayoritariamente B (o en su defecto C/A).
  - B → equipo mayoritariamente A o C.
- En ningún caso se mantienen equipos unitarios; si aparecen, se fusionan con el equipo más cercano.

## Equipos esporádicos
- Se mezcla todo el alumnado aleatoriamente y se forman equipos del tamaño indicado.
- Las personas incompatibles se reparten en equipos distintos antes de completar el resto.
- Los sobrantes siguen la misma política que en los heterogéneos (`Crear un equipo nuevo` o `Agregar a otros equipos`).
