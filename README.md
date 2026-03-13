### Desarrollo-Colaborativo-Empresarial-DSE-01-2026

### Sprint 4 – Semana 8

### Qué se hizo
- Se implementó un sistema de búsqueda y filtrado dinámico en la lista de productos, cumpliendo con los objetivos principales del sprint.
- Se añadió un campo de búsqueda por nombre de producto en tiempo real.
- Se agregó un filtro adicional por Categoría mediante un menú desplegable (select).
- El renderizado de la tabla ahora es completamente dinámico: los productos se filtran visualmente al instante mientras el usuario escribe o selecciona opciones, sin necesidad de recargar la página.
- Se realizó una mejora visual masiva (Refactorización UI/UX), pasando a un diseño "Soft UI" minimalista, limpio y profesional.
- Se optimizó la tabla de productos: las descripciones largas ahora se visualizan y editan a través de ventanas modales interactivas (SweetAlert2) para no romper la estética de la interfaz.

### Quién hizo qué
Wendy Marisol y Ronald Alexander: Trabajaron en la reestructuración del HTML y en el nuevo archivo CSS, implementando el diseño de "tarjetas" (Soft UI), mejorando la responsividad y asegurando que los campos de edición se adaptaran correctamente dentro de la tabla sin deformarla.

Carlos Ernesto: Desarrolló la lógica en JavaScript para implementar el renderizado dinámico (renderProductos()) utilizando los métodos .filter() y .toLowerCase(). Además, refactorizó las funciones de editar y eliminar para solucionar un bug crítico de asignación.

Jeremy Eduardo: Coordinó como Scrum Master, integró la lógica de los modales de SweetAlert2 para visualizar/editar la descripción de los productos de forma cómoda, revisó los Pull Requests y centralizó la integración del proyecto.

Nestor Eduardo: Apoyó en la documentación del sprint, realizó pruebas de estrés (QA) combinando los filtros de búsqueda con las funciones de eliminar/editar para asegurar que no hubieran fallos de estado, y verificó el correcto formateo de los números (precios y stock).

#### Problemas encontrados

1. El "Bug" de los índices al filtrar: Inicialmente, al buscar un producto en la barra de búsqueda y darle clic en "Eliminar" o "Editar", el sistema modificaba un producto distinto al seleccionado. Esto ocurrió porque la posición visual en la tabla filtrada ya no coincidía con el índice real del arreglo. Se solucionó cambiando la lógica para buscar por un identificador único (producto.id) en lugar de usar el index.

2. Ruptura del diseño en la tabla: Durante la edición en línea, los campos de texto (inputs) heredaban el tamaño del formulario principal, lo que causaba que textos como el nombre o la categoría se cortaran o aplastaran la fila. Se resolvió aplicando reglas CSS específicas de min-width y reduciendo el padding exclusivo para los inputs dentro de la tabla.

3. Saturación visual por textos largos: Las descripciones detalladas de los productos hacían que las filas de la tabla fueran excesivamente grandes y antiestéticas. Se resolvió ocultando el texto directo e implementando botones tipo "píldora" que despliegan la información mediante ventanas modales (SweetAlert2).

4. Dinámica de trabajo (Problemas técnicos): Persistieron los inconvenientes técnicos con las computadoras y conexiones de algunos integrantes del equipo para asegurar la entrega y el aprendizaje mutuo mantuvimos la misma estrategia del Sprint 3 donde se realizaron sesiones de trabajo colaborativo mediante llamadas de Meet todos aportamos al código en conjunto desde la computadora de Jeremy Segura quien a quien se le compartieron los codigos hechos por los demas integrantes y el se encargo de subirlo al repositorio.