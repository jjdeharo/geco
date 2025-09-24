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

## Modo escritorio (Electron)
1. Instala [Node.js](https://nodejs.org) 18 o superior.
2. Ejecuta `npm install` para descargar Electron y las dependencias de empaquetado.
3. Usa `npm run dev` durante el desarrollo (recarga manual).
4. Lanza `npm run pack` para generar una app sin instalador o `npm run dist` para empaquetar instaladores multiplataforma (salida en `dist/`).

### Personalizar la distribución
- Coloca los iconos en `build/icons/` (el `icon.png` principal se usa como base para Windows, macOS y Linux).
- Ajusta las plataformas/arquitecturas objetivo editando la sección `build` de `package.json`.
- Añade recursos adicionales (documentación, plantillas, etc.) actualizando los patrones de `files` en `package.json`.



## Licencias
- **Código**: [AGPL v3](https://www.gnu.org/licenses/agpl-3.0.html)
- **Contenidos educativos** (textos, imágenes, etc.): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

## Créditos
© 2025 · [Juan José de Haro](https://bilateria.org) · https://github.com/jjdeharo/geco
