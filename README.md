# Desarrollo-Colaborativo-Empresarial-DSE-01-2026
# Sprint 2 – Semana 6

## Qué se hizo
- Se implementó la funcionalidad **UPDATE** para modificar productos existentes.
- Se añadió un botón **Editar** en cada fila de la tabla.
- Al hacer clic en Editar, los datos del producto se cargan en el formulario.
- Al guardar, el producto se actualiza en el array y la lista se re-renderiza.

## Quién hizo qué
- Wendy Marisol y Ronald Alexander: se encargaron de la estructura HTML y CSS para tabla y botones ademas se separo el CSS en un archivo aparte ya que lo teniamos integrado en el html este cambio se realizo para mayor comodidad y orden en el codigo.
- Carlos Ernesto: lógica JavaScript para cargar datos al formulario y actualizar productos.
- Jeremy Eduardo: coordinación como Scrum Master y revisión de Pull Requests.
- Nestor Eduardo: apoyo en documentación, organización y pruebas.

## Problemas encontrados
- El formulario inicialmente no diferenciaba entre crear y editar; se solucionó usando una variable `editIndex` para identificar el producto en edición.
- Se presentaron errores al re-renderizar la lista después de editar; se corrigió limpiando el `innerHTML` antes de renderizar nuevamente.
- Hubo confusión en el flujo de ramas (feature/edit → develop); se aclaró y estandarizó el proceso de Pull Request hacia la rama correcta.
- Hubieron problemas con las computadoras de los demas integrates otra vez al momento de clonar el repositorio por lo cual como equipo para este segundo Sprint se realizo una meet en la cual colaboramos todos y lo realizamos en la computadora de Jeremy Segura al cual se le compartieron los codigos hechos por los demas integrantes y el se encargo de subirlo al repositorio.