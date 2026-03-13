let productos = JSON.parse(localStorage.getItem("productos")) || [];

function guardarLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// --- FUNCIONES DE FORMATEO ---
function formatPrice(value) {
  let cleaned = value.toString().replace(/[^0-9.]/g, ''); 
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }
  let [integerPart, decimalPart] = cleaned.split('.');
  if (integerPart.length > 7) integerPart = integerPart.substring(0, 7);
  if (integerPart) integerPart = parseInt(integerPart, 10).toLocaleString('en-US');
  if (decimalPart !== undefined) return `${integerPart}.${decimalPart.substring(0, 2)}`;
  return integerPart;
}

function formatStock(value) {
  let cleaned = value.toString().replace(/[^0-9]/g, '');
  if (cleaned) return parseInt(cleaned, 10).toLocaleString('en-US');
  return cleaned;
}
// -----------------------------

// --- MODALES DE DESCRIPCIÓN ---
// Ver descripción
function verDescripcionModal(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;
  
  Swal.fire({
    title: `<h4 style="color: #2d3748;">${producto.nombre}</h4>`,
    text: producto.descripcion,
    icon: 'info',
    confirmButtonColor: '#3182ce',
    confirmButtonText: 'Cerrar'
  });
}

// Editar descripción
function editarDescripcionModal(id) {
  const hiddenInput = document.getElementById(`edit-descripcion-${id}`);
  
  Swal.fire({
    title: 'Modificar Descripción',
    input: 'textarea',
    inputValue: hiddenInput.value,
    inputPlaceholder: 'Escribe los detalles aquí...',
    inputAttributes: {
      'aria-label': 'Descripción del producto'
    },
    showCancelButton: true,
    confirmButtonText: 'Guardar cambios',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3182ce',
  }).then((result) => {
    if (result.isConfirmed) {
      // Guardamos el texto en el input oculto de la fila
      hiddenInput.value = result.value;
      Swal.fire({
        title: '¡Texto actualizado!',
        text: 'Asegúrate de guardar la fila para aplicar los cambios.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  });
}
// -----------------------------

function renderProductos() {
  const lista = document.getElementById("productList");
  lista.innerHTML = "";

  const search = document.getElementById("searchInput").value.toLowerCase();
  const filtro = document.getElementById("filterCategoria").value;

  let contadorVisual = 1;

  productos
    .filter(p => p.nombre.toLowerCase().includes(search))
    .filter(p => !filtro || p.categoria === filtro)
    .forEach((p) => {
      const fila = document.createElement("tr");
      fila.id = `fila-${p.id}`; 
      
      const estado = p.stock > 0 ? "Activo" : "Inactivo";
      const estadoClass = p.stock > 0 ? "text-success" : "text-danger";

      fila.innerHTML = `
        <td>${contadorVisual++}</td>
        <td class="fw-bold text-dark">${p.nombre}</td>
        <td>$${parseFloat(p.precio).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
        <td>${parseInt(p.stock).toLocaleString('en-US')}</td>
        <td><span class="${estadoClass}">${estado}</span></td>
        <td>${p.categoria}</td>
        <td>
          <button class="btn btn-desc rounded-pill" onclick="verDescripcionModal(${p.id})">📄 Ver Info</button>
        </td>
        <td class="acciones">
          <button class="btn btn-primary btn-sm" onclick="editarFila(${p.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${p.id})">Eliminar</button>
        </td>
      `;
      lista.appendChild(fila);
    });
}

function editarFila(id) {
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) return;
  const producto = productos[index];
  const fila = document.getElementById(`fila-${id}`);

  const precioFormat = formatPrice(producto.precio);
  const stockFormat = formatStock(producto.stock);
  // Escapamos las comillas dobles para que no rompan el input HTML
  const safeDesc = producto.descripcion.replace(/"/g, '&quot;'); 

  fila.innerHTML = `
    <td>-</td>
    <td><input type="text" class="form-control" id="edit-nombre-${id}" value="${producto.nombre}"></td>
    <td><input type="text" class="form-control" id="edit-precio-${id}" inputmode="decimal" value="${precioFormat}"></td>
    <td><input type="text" class="form-control" id="edit-stock-${id}" inputmode="numeric" value="${stockFormat}"></td>
    <td>${producto.stock > 0 ? "Activo" : "Inactivo"}</td>
    <td>
      <select class="form-select" id="edit-categoria-${id}">
        <option value="Electrónica" ${producto.categoria === "Electrónica" ? "selected" : ""}>Electrónica</option>
        <option value="Ropa" ${producto.categoria === "Ropa" ? "selected" : ""}>Ropa</option>
        <option value="Hogar" ${producto.categoria === "Hogar" ? "selected" : ""}>Hogar</option>
      </select>
    </td>
    <td>
      <input type="hidden" id="edit-descripcion-${id}" value="${safeDesc}">
      <button class="btn btn-desc rounded-pill border-primary text-primary" onclick="editarDescripcionModal(${id})">✏️ Editar Info</button>
    </td>
    <td class="acciones">
      <button class="btn btn-success btn-sm" onclick="guardarEdicion(${id})">Guardar</button>
      <button class="btn btn-secondary btn-sm" onclick="renderProductos()">Cancelar</button>
    </td>
  `;

  document.getElementById(`edit-precio-${id}`).addEventListener("input", function() {
    this.value = formatPrice(this.value);
  });
  document.getElementById(`edit-stock-${id}`).addEventListener("input", function() {
    this.value = formatStock(this.value);
  });
}

function guardarEdicion(id) {
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) return;

  const nombre = document.getElementById(`edit-nombre-${id}`).value.trim();
  let precio = document.getElementById(`edit-precio-${id}`).value.trim().replace(/,/g, '');
  let stockStr = document.getElementById(`edit-stock-${id}`).value.trim().replace(/,/g, '');
  const stock = parseInt(stockStr);
  const categoria = document.getElementById(`edit-categoria-${id}`).value;
  // Tomamos el valor del input oculto que actualizó SweetAlert
  const descripcion = document.getElementById(`edit-descripcion-${id}`).value.trim();

  const regexPrecio = /^\d{1,7}(\.\d{1,2})?$/;
  if (!regexPrecio.test(precio)) {
    Swal.fire("Error", "El precio debe tener máximo 7 cifras y hasta 2 decimales", "error");
    return;
  }
  if (isNaN(stock) || stock < 0) {
    Swal.fire("Error", "El stock debe ser un número entero positivo", "error");
    return;
  }
  if (!nombre || !precio || !categoria || !descripcion) {
    Swal.fire("Error", "Todos los campos son obligatorios (incluyendo descripción)", "error");
    return;
  }

  productos[index] = { ...productos[index], nombre, precio, stock, categoria, descripcion };
  guardarLocalStorage();
  renderProductos();
  Swal.fire("Actualizado", "El producto ha sido actualizado", "success");
}

function eliminarProducto(id) {
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) return;

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
  
  let precio = document.getElementById("price").value.trim().replace(/,/g, '');
  let stockStr = document.getElementById("stock").value.trim().replace(/,/g, '');
  const stock = parseInt(stockStr);
  
  const categoria = document.getElementById("categoria").value;
  const descripcion = document.getElementById("descripcion").value.trim();

  const regexPrecio = /^\d{1,7}(\.\d{1,2})?$/;
  if (!regexPrecio.test(precio)) {
    Swal.fire("Error", "El precio debe tener máximo 7 cifras y hasta 2 decimales", "error");
    return;
  }
  if (isNaN(stock) || stock < 0) {
    Swal.fire("Error", "El stock debe ser un número entero positivo", "error");
    return;
  }
  if (!nombre || !precio || !categoria || !descripcion) {
    Swal.fire("Error", "Todos los campos son obligatorios", "error");
    return;
  }

  const nuevoProducto = { id: Date.now(), nombre, precio, stock, categoria, descripcion };
  productos.push(nuevoProducto);
  guardarLocalStorage();
  renderProductos();
  Swal.fire("Agregado", "El producto ha sido agregado exitosamente", "success");
  e.target.reset();
});

// Eventos de formateo en tiempo real (Creación)
document.getElementById("price").addEventListener("input", function() {
  this.value = formatPrice(this.value);
});
document.getElementById("stock").addEventListener("input", function() {
  this.value = formatStock(this.value);
});

// Eventos de búsqueda y filtro
document.getElementById("searchInput").addEventListener("input", renderProductos);
document.getElementById("filterCategoria").addEventListener("change", renderProductos);

// Render inicial
renderProductos();