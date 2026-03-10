let productos = JSON.parse(localStorage.getItem("productos")) || [];

function guardarLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function renderProductos() {
  const lista = document.getElementById("productList");
  lista.innerHTML = "";

  const search = document.getElementById("searchInput").value.toLowerCase();
  const filtro = document.getElementById("filterCategoria").value;

  productos
    .filter(p => p.nombre.toLowerCase().includes(search))
    .filter(p => !filtro || p.categoria === filtro)
    .forEach((p, index) => {
      const fila = document.createElement("tr");
      const estado = p.stock > 0 ? "Activo" : "Inactivo";
      const estadoClass = p.stock > 0 ? "text-success" : "text-danger";

      fila.innerHTML = `
        <td>${index + 1}</td>
        <td>${p.nombre}</td>
        <td>$${parseFloat(p.precio).toFixed(2)}</td>
        <td>${p.stock}</td>
        <td class="${estadoClass}">${estado}</td>
        <td>${p.categoria}</td>
        <td>${p.descripcion}</td>
        <td class="acciones">
          <button class="btn btn-primary btn-sm" onclick="editarFila(${index})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
        </td>
      `;
      lista.appendChild(fila);
    });
}

function editarFila(index) {
  const lista = document.getElementById("productList");
  const fila = lista.rows[index];
  const producto = productos[index];

  fila.innerHTML = `
    <td>${index + 1}</td>
    <td><input type="text" class="form-control" id="edit-nombre-${index}" value="${producto.nombre}"></td>
    <td><input type="number" class="form-control" id="edit-precio-${index}" step="0.01" min="0" value="${producto.precio}"></td>
    <td><input type="number" class="form-control" id="edit-stock-${index}" min="0" value="${producto.stock}"></td>
    <td>${producto.stock > 0 ? "Activo" : "Inactivo"}</td>
    <td>
      <select class="form-select" id="edit-categoria-${index}">
        <option value="Electrónica" ${producto.categoria === "Electrónica" ? "selected" : ""}>Electrónica</option>
        <option value="Ropa" ${producto.categoria === "Ropa" ? "selected" : ""}>Ropa</option>
        <option value="Hogar" ${producto.categoria === "Hogar" ? "selected" : ""}>Hogar</option>
      </select>
    </td>
    <td><textarea class="form-control" id="edit-descripcion-${index}">${producto.descripcion}</textarea></td>
    <td class="acciones">
      <button class="btn btn-success btn-sm" onclick="guardarEdicion(${index})">Guardar</button>
      <button class="btn btn-secondary btn-sm" onclick="renderProductos()">Cancelar</button>
    </td>
  `;

  // Bloquear caracteres inválidos en precio al editar
  const precioEditInput = document.getElementById(`edit-precio-${index}`);
  precioEditInput.addEventListener("keydown", function(e) {
    if (["e","E","+","-"].includes(e.key)) e.preventDefault();
  });
}

function guardarEdicion(index) {
  const nombre = document.getElementById(`edit-nombre-${index}`).value.trim();
  const precio = document.getElementById(`edit-precio-${index}`).value.trim();
  const stock = parseInt(document.getElementById(`edit-stock-${index}`).value.trim());
  const categoria = document.getElementById(`edit-categoria-${index}`).value;
  const descripcion = document.getElementById(`edit-descripcion-${index}`).value.trim();

  // Validación precio: máximo 7 cifras + decimales
  const regexPrecio = /^\d{1,7}(\.\d{1,2})?$/;
  if (!regexPrecio.test(precio)) {
    Swal.fire("Error", "El precio debe tener máximo 7 cifras y hasta 2 decimales", "error");
    return;
  }

  // Validación stock: solo enteros positivos
  if (isNaN(stock) || stock < 0) {
    Swal.fire("Error", "El stock debe ser un número entero positivo", "error");
    return;
  }

  if (!nombre || !precio || !categoria || !descripcion) {
    Swal.fire("Error", "Todos los campos son obligatorios", "error");
    return;
  }

  productos[index] = { 
    id: productos[index].id, 
    nombre, 
    precio, 
    stock, 
    categoria, 
    descripcion 
  };

  guardarLocalStorage();
  renderProductos();
  Swal.fire("Actualizado", "El producto ha sido actualizado", "success");
}

function eliminarProducto(index) {
  Swal.fire({
    title: "¿Eliminar producto?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      productos.splice(index, 1);
      guardarLocalStorage();
      renderProductos();
      Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
    }
  });
}

// Crear producto
document.getElementById("productForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("name").value.trim();
  const precio = document.getElementById("price").value.trim();
  const stock = parseInt(document.getElementById("stock").value.trim());
  const categoria = document.getElementById("categoria").value;
  const descripcion = document.getElementById("descripcion").value.trim();

  // Validación precio: máximo 7 cifras + decimales
  const regexPrecio = /^\d{1,7}(\.\d{1,2})?$/;
  if (!regexPrecio.test(precio)) {
    Swal.fire("Error", "El precio debe tener máximo 7 cifras y hasta 2 decimales", "error");
    return;
  }

  // Validación stock: solo enteros positivos
  if (isNaN(stock) || stock < 0) {
    Swal.fire("Error", "El stock debe ser un número entero positivo", "error");
    return;
  }

  if (!nombre || !precio || !categoria || !descripcion) {
    Swal.fire("Error", "Todos los campos son obligatorios", "error");
    return;
  }

  const nuevoProducto = {
    id: Date.now(),
    nombre, 
    precio, 
    stock, 
    categoria, 
    descripcion
  };

  productos.push(nuevoProducto);
  guardarLocalStorage();
  renderProductos();
  Swal.fire("Agregado", "El producto ha sido agregado", "success");
  e.target.reset();
});

// Bloquear caracteres inválidos en precio al crear
const precioInput = document.getElementById("price");
precioInput.addEventListener("keydown", function(e) {
  if (["e","E","+","-"].includes(e.key)) e.preventDefault();
});

// Eventos de búsqueda y filtro
document.getElementById("searchInput").addEventListener("input", renderProductos);
document.getElementById("filterCategoria").addEventListener("change", renderProductos);

// Render inicial
renderProductos();