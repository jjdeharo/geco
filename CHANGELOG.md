# Changelog

## 2.6.0 — 2026-09-17

- Los nombres repetidos ya no se duplican en los equipos: se avisa bajo los cuadros y se usa la última aparición, igual que en la tabla de tipologías.
- Los equipos heterogéneos con incompatibilidades reparten mejor el alumnado A y C: los intercambios de equilibrado ahora incluyen a las personas incompatibles cuando el cambio no crea conflicto.
- Al importar o cargar el estado, las incompatibilidades se limpian: sin nombres desconocidos y sin que una persona esté en dos grupos.
- En equipos homogéneos con «Agregar a otros equipos», el equipo que acoge a personas sueltas ya no crece sin límite: si supera el tamaño más uno, se parte en dos manteniendo junta a la tipología predominante.
- El aviso «Equipos: 0» con menos personas que el tamaño pedido ahora indica que se formará un único equipo.
- Tests nuevos para los tres casos del motor.

## 2.5.0 — 2026-03-13

- Refactorizado el motor de generación de equipos en un módulo independiente reutilizable.
- Separado el análisis del informe en un módulo propio, con pruebas automáticas.
- Unificada la guía de uso con la misma fuente de traducciones que la aplicación.
- Eliminado código legado no usado y simplificada la inicialización principal.
- Acotado el empaquetado de Electron a los archivos estrictamente necesarios.
- Añadida una batería inicial de pruebas para generación de equipos e informe.

## 2.4.0 — 2025-09-25

- Retirada la opción de "Exportar todo" de la ficha Datos del alumnado para evitar confusiones con la exportación de informes.
- Texto de ayuda actualizado en todos los idiomas para reflejar las acciones disponibles (importar o pegar alumnado).

## 2.3.1 — 2025-09-24

- Resultados de equipos y ejemplos iniciales muestran cada alumno en una línea para facilitar la lectura.
- Tarjetas informativas y títulos de opciones con estilo de panel, evitando confusión con botones.

## 2.3.0 — 2025-09-24

- Soporte oficial para aplicación de escritorio con Electron (procesos principal y preload).
- Configuración de empaquetado multiplataforma mediante electron-builder.
- Documentación y comandos npm para desarrollo y distribución de la versión de escritorio.
- Menú nativo multilingüe con acceso directo a la guía pedagógica.

## 2.2 — 2025-09-19

- Importar/Exportar TODO en JSON con fecha y hora.
- Importar: permite elegir qué datos traer (nombres, tipologías, incompatibilidades, equipos).
- Exportar equipos a hoja de cálculo (CSV) robusto: entrecomillado y sin partir nombres con comas.
- Persistencia completa y sincronizada (alumnado, incompatibilidades, equipos y opciones de interfaz).
- Botón “Reiniciar aplicación” para limpiar estado y restaurar ejemplos.
- Nueva ficha “Datos del alumnado”: importar JSON o pegar nombres.
- Zona de incompatibles compactada en 2 columnas.
- Contador de alumnos por tipología junto a cada cuadro.
- Armonía de colores, cabeceras unificadas, botón “Generar equipos” resaltado.
- Mejoras de accesibilidad, centrado de cabeceras en la tabla de tipologías y área de clic de tipologías uniforme.

## 2.1 — omitida

- Cambios intermedios que se consolidan en 2.2.
