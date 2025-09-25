# GeCo (Generador de Equipos Cooperativos)

GeCo es una aplicación web pensada para docentes de ESO y Bachillerato que necesitan crear equipos cooperativos de forma rápida y controlada. Permite introducir o pegar la lista de alumnado clasificada por tipologías (A, B, C) y generar distintos tipos de agrupaciones respetando las incompatibilidades configuradas.

## Características
- **Tres modos de agrupación**: heterogéneos (equipos base), homogéneos (similares) y esporádicos (aleatorios).
- **Control de incompatibilidades**: se pueden definir conjuntos de alumnos que nunca deben coincidir en un mismo equipo.
- **Gestión de sobrantes**: opción entre crear un equipo nuevo o repartir el exceso entre los equipos existentes.
- **Informe pedagógico** tras cada generación que avisa de desviaciones respecto al diseño previsto.
- **Internacionalización**: interfaz disponible en español, catalán, gallego, euskera e inglés.

## Uso rápido
1. Abre `index.html` en un navegador moderno.
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

### Descargas listas (v2.4.0)
Las versiones empaquetadas están en la sección de [Releases](https://github.com/jjdeharo/geco/releases). En cada enlace se indica qué obtendrás al descargarlo:

- **Windows (instalador con asistente)** → [GeCo-Setup-2.4.0.exe](https://github.com/jjdeharo/geco/releases/download/v2.4.0/GeCo-Setup-2.4.0.exe): instala la aplicación en `C:\Archivos de programa\GeCo`, crea accesos directos y gestiona actualizaciones.
- **Windows (portable)** → [GeCo-2.4.0.exe](https://github.com/jjdeharo/geco/releases/download/v2.4.0/GeCo-2.4.0.exe): ejecutable auto-contenido para llevar en un USB sin instalación.
- **macOS (Intel y Apple Silicon)** → [GeCo-2.4.0.dmg](https://github.com/jjdeharo/geco/releases/download/v2.4.0/GeCo-2.4.0.dmg): imagen universal, arrástrala a `Aplicaciones`.
- **macOS (Apple Silicon optimizado)** → [GeCo-2.4.0-arm64.dmg](https://github.com/jjdeharo/geco/releases/download/v2.4.0/GeCo-2.4.0-arm64.dmg): mismo contenido, compilado específicamente para chips M1/M2.
- **Linux (AppImage)** → [GeCo-2.4.0.AppImage](https://github.com/jjdeharo/geco/releases/download/v2.4.0/GeCo-2.4.0.AppImage): binario portable, marca el archivo como ejecutable y lánzalo sin instalar.
- **Linux (paquete DEB)** → [geco_2.4.0_amd64.deb](https://github.com/jjdeharo/geco/releases/download/v2.4.0/geco_2.4.0_amd64.deb): instalador para Debian, Ubuntu y derivadas de 64 bits.



## Licencias
- **Código**: [AGPL v3](https://www.gnu.org/licenses/agpl-3.0.html)
- **Contenidos educativos** (textos, imágenes, etc.): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)

## Créditos
© 2025 · [Juan José de Haro](https://bilateria.org) · https://github.com/jjdeharo/geco
