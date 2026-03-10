### Desarrollo-Colaborativo-Empresarial-DSE-01-2026
### Sprint 3 – Semana 7

### Qué se hizo
Se agrego lo solicitado en comentarios de la entrega de moodle del sprint 1 del cual no nos habiamos percatado pero ahora ya esta implementado tanto para el apartado de crear productos y lista de productos.

Se implementó la funcionalidad DELETE para eliminar productos de la lista.

Se añadió un botón Eliminar en cada fila de la tabla.

Al hacer clic en Eliminar, se muestra una confirmación con SweetAlert2 para evitar borrados accidentales.

Si el usuario confirma, el producto se elimina del array, se actualiza el localStorage y la lista se re-renderiza.

Se mantuvo la coherencia visual en la tabla y botones, con estilos consistentes en el archivo CSS separado.

### Quién hizo qué
Wendy Marisol y Ronald Alexander: trabajaron en la estructura HTML y CSS, asegurando que el botón Eliminar se integrara correctamente en la tabla y mantuviera la estética responsiva.

Carlos Ernesto: desarrolló la lógica en JavaScript para la función eliminarProducto(), incluyendo la confirmación con SweetAlert2 y la actualización del localStorage.

Jeremy Eduardo: coordinó como Scrum Master, revisó Pull Requests y centralizó la integración en el repositorio.

Nestor Eduardo: apoyó en documentación, pruebas de la funcionalidad DELETE y organización del flujo de trabajo.

### Problemas encontrados
Inicialmente, al eliminar un producto, la lista no se actualizaba correctamente. Se solucionó re-renderizando la tabla después de modificar el array.

Hubo confusión en el manejo de índices al eliminar productos, lo que provocaba errores en la posición de los elementos. Se corrigió asegurando que el splice() se aplicara al índice correcto.

Se presentaron dudas sobre la confirmación de eliminación, ya que algunos usuarios podían cancelar la acción. Se resolvió implementando un flujo claro con SweetAlert2 que distingue entre confirmación y cancelación.

Se verificó que el estado de los productos (Activo/Inactivo) se mantuviera coherente después de eliminar elementos.

Hubieron problemas con las computadoras de los demas integrates de nuevo como problemas tecnicos, etc por lo cual como equipo para este tercer Sprint se realizaron varias llaadas de meet en las cuales colaboramos todos y lo realizamos en la computadora de Jeremy Segura a quien se le compartieron los codigos hechos por los demas integrantes y el se encargo de subirlo al repositorio.