# GeCo (Generador de Equipos Cooperativos)

GeCo es una aplicación web pensada para docentes de ESO y Bachillerato que necesitan crear equipos cooperativos de forma rápida y controlada. Permite introducir o pegar la lista de alumnado clasificada por tipologías (A, B, C) y generar distintos tipos de agrupaciones respetando las incompatibilidades configuradas.

## Características
- **Tres modos de agrupación**: heterogéneos (equipos base), homogéneos (similares) y esporádicos (aleatorios).
- **Control de incompatibilidades**: se pueden definir conjuntos de alumnos que nunca deben coincidir en un mismo equipo.
- **Gestión de sobrantes**: opción entre crear un equipo nuevo o repartir el exceso entre los equipos existentes.
- **Informe pedagógico** tras cada generación que avisa de desviaciones respecto al diseño previsto.
- **Internacionalización**: interfaz disponible en español, catalán, gallego, euskera e inglés.

## Uso rápido
1. Clona el repositorio y abre `index.html` en un navegador moderno.
2. Introduce los nombres del alumnado por tipologías. Un nombre por línea (las comas no separan).
3. Define el tamaño del equipo, el tipo de agrupación y el tratamiento de sobrantes.
4. Define incompatibilidades si las hubiera y pulsa «Generar equipos».
5. Revisa el informe para comprobar si los grupos satisfacen tus requisitos.

### Importar / Exportar
- En la ficha «Datos del alumnado» puedes:
  - Importar archivo (exportado en JSON): recupera nombres+tipologías, incompatibilidades y equipos (puedes elegir qué traer).
  - Exportar todo (formato JSON): guarda el estado completo con fecha y hora.
  - Pegar nombres: un nombre por línea.
- Tras generar equipos: «Exportar equipos a hoja de cálculo» (CSV entrecomillado, respetando comas en nombres) o «Copiar equipos».

Para más detalles didácticos consulta `instr.html`.

## Licencias
- **Código**: [AGPL v3](https://www.gnu.org/licenses/agpl-3.0.html)
- **Contenidos educativos** (textos, imágenes, etc.): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

## Créditos
© 2025 · [Juan José de Haro](https://bilateria.org) · https://github.com/jjdeharo/geco
