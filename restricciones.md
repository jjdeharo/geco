# Restricciones de GeCo

## Generales
- El tamaño mínimo de equipo es de 2 personas; si se solicita menos, se muestra un aviso.
- Se necesita al menos una persona para poder generar equipos.
- Cada nombre debe aparecer una sola vez, sin distinguir mayúsculas. Si se repite, se avisa y se usa la última aparición; para dos personas con el mismo nombre conviene añadir una inicial.
- Las personas marcadas como incompatibles se distribuyen siempre en equipos distintos.
- Las incompatibilidades se limpian automáticamente si la persona deja de figurar en una tipología.
- Se procura conservar el tamaño objetivo en todos los equipos y minimizar las diferencias inevitables.

## Equipos heterogéneos
- **Descripción:** busca equipos mixtos con al menos una persona autónoma (A) o con alta necesidad (C) y se completan con alumnado B. Es la opción recomendada para equilibrio de roles.
- **Cómo se construyen:**
  - Se calcula de antemano cuántos equipos habrá y el tamaño de cada uno, incluido el equipo de sobrantes (ver «Sobrantes»).
  - Se reparten primero A y C (al azar) entre todos los equipos, también el de sobrantes, para garantizar diversidad y, después, se completan con B.
  - Si algún equipo queda sin A ni C y otro tiene al menos dos, se intercambian miembros para equilibrar.
  - Las incompatibilidades se asignan antes de estos repartos. Los intercambios pueden mover a personas incompatibles, pero solo cuando el cambio no las junta con nadie de su grupo incompatible.
- **Cuándo se viola la descripción:**
  - Si hay menos A o C que equipos, algunos grupos pueden quedar solo con alumnado B después de los intercambios; es la única forma de cubrir todas las plazas.
  - Si el número de alumnos no es múltiplo del tamaño objetivo, habrá equipos con un miembro extra o con uno menos según la política de sobrantes.
- **Sobrantes:**
  - `Crear un equipo nuevo`: los sobrantes forman un equipo más pequeño. Si sobra una sola persona, otro equipo le cede un miembro (por ejemplo, 25 personas en equipos de 4 dan 4, 4, 4, 4, 4, 3 y 2). Con equipos de 2 no es posible ceder a nadie, así que la persona sobrante se une a un equipo, que queda de 3.
  - `Agregar a otros equipos`: se reparten de uno en uno entre los equipos existentes, de modo que ningún equipo recibe dos sobrantes mientras otro no haya recibido ninguno.

## Equipos homogéneos
- **Descripción:** forma equipos de alumnado con la misma tipología (todos A, todos B o todos C). Resulta útil para tareas diferenciadas.
- **Cómo se construyen:**
  - Cada tipología se reparte por separado en equipos del tamaño solicitado, de forma aleatoria dentro de cada tipo.
  - Los sobrantes de cada tipología siguen la opción elegida, dentro de su propia tipología: con `Crear un equipo nuevo` forman un equipo más pequeño del mismo tipo (si sobra una sola persona, otro equipo de su tipo le cede un miembro); con `Agregar a otros equipos` se reparten entre los equipos de su tipo. Si sobran más personas que equipos hay de ese tipo, forman su propio equipo para no crear equipos demasiado grandes.
  - Las personas incompatibles se colocan antes que el resto, cada una en un equipo de su tipología donde no haya nadie incompatible con ella.
  - Las personas que no pueden quedarse en un equipo de su tipología (una tipología con una sola persona o incompatibles sin sitio) se colocan aparte: con `Crear un equipo nuevo` forman juntas un equipo si son al menos dos; en otro caso se unen al equipo compatible más adecuado, con estas preferencias: A → equipos con mayoría B, C → mayoría B, B → mayoría A o C, y a igual preferencia el más pequeño.
  - Nunca se coloca a nadie en un equipo con una persona incompatible. Si al final queda un equipo de una persona, se une a otro equipo compatible y, si no hay ninguno, otro equipo le cede un miembro compatible.
  - Si al acoger a personas sueltas un equipo supera el tamaño pedido más uno, se parte en dos: la tipología predominante se queda junta en un equipo del tamaño pedido y el resto forma otro equipo de al menos dos personas.
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
  - Las mismas que en heterogéneos: `Crear un equipo nuevo` forma un equipo más pequeño, que nunca es de una persona, y `Agregar a otros equipos` reparte los sobrantes de uno en uno entre los equipos existentes.
