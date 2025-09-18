# Restricciones de GeCo

## Generales
- El tamaño mínimo de equipo es de 2 personas; si se solicita menos, se muestra un aviso.
- Se necesita al menos una persona para poder generar equipos.
- Las personas marcadas como incompatibles se distribuyen siempre en equipos distintos.
- Las incompatibilidades se limpian automáticamente si la persona deja de figurar en una tipología.
- Se procura conservar el tamaño objetivo en todos los equipos y minimizar las diferencias inevitables.

## Equipos heterogéneos
- **Descripción:** busca equipos mixtos con al menos una persona autónoma (A) o con alta necesidad (C) y se completan con alumnado B. Es la opción recomendada para equilibrio de roles.
- **Cómo se construyen:**
  - Se calcula el número máximo de equipos completos según el tamaño solicitado.
  - Se reparten primero A y C (al azar) para garantizar diversidad y, después, se completan con B.
  - Si algún equipo queda sin A ni C y otros tienen más de uno, se intercambian miembros para equilibrar.
  - Las incompatibilidades se asignan antes de estos repartos.
- **Cuándo se viola la descripción:**
  - Si hay menos A o C que equipos, algunos grupos pueden quedar solo con alumnado B después de los intercambios; es la única forma de cubrir todas las plazas.
  - Si el número de alumnos no es múltiplo del tamaño objetivo, habrá equipos con un miembro extra o con uno menos según la política de sobrantes.
- **Sobrantes:**
  - `Crear un equipo nuevo`: se agrupan entre sí intentando respetar el tamaño objetivo; si no alcanza, se fusionan para evitar equipos unitarios.
  - `Agregar a otros equipos`: se reparten buscando mantener tamaños similares; si todos los equipos están llenos, se inserta en el equipo con menor tamaño.

## Equipos homogéneos
- **Descripción:** forma equipos de alumnado con la misma tipología (todos A, todos B o todos C). Resulta útil para tareas diferenciadas.
- **Cómo se construyen:**
  - Se calculan los equipos completos por tipología y se asignan de forma aleatoria dentro de cada tipo.
  - Las personas incompatibles se colocan antes que el resto y se reparte el alumnado de su tipología alrededor de ellas.
  - Los sobrantes de cada tipología se agrupan en bloques procurando que ninguno quede solo. Si aún sobra una persona, se une al grupo más compatible.
  - Si la opción es `Agregar a otros equipos`, los sobrantes se insertan con preferencias: A → equipos con mayoría B, C → mayoría B, B → mayoría A o C. Tras el reparto se verifican equipos unitarios y, si existen, se fusionan.
- **Cuándo se viola la descripción:**
  - Cuando no hay suficientes alumnos de un tipo para completar equipos, se pueden mezclar con otro tipo para evitar equipos de una persona. El algoritmo prioriza mantenerlos homogéneos, pero permite mezclar en los mínimos casos necesarios.

## Equipos esporádicos
- **Descripción:** forma equipos completamente aleatorios ignorando tipologías. Útil para dinámicas rápidas.
- **Cómo se construyen:**
  - Se mezcla todo el alumnado al azar y se reparten los miembros según el tamaño objetivo.
  - Las incompatibilidades se asignan en equipos distintos antes de completar el resto.
- **Cuándo se viola la descripción:**
  - Solo cuando el número total no permite equipos exactos del tamaño solicitado; se aplican las mismas reglas de sobrantes que en heterogéneos.
- **Sobrantes:**
  - `Crear un equipo nuevo`: se agrupan entre sí; si no alcanza, se combinan para evitar equipos de una persona.
  - `Agregar a otros equipos`: se suman a los grupos existentes, escogiendo el equipo con menos integrantes en cada paso.
