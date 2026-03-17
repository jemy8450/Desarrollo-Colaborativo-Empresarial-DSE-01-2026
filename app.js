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

function editarDescripcionModal(id) {
  const hiddenInput = document.getElementById(`edit-descripcion-${id}`);
  
  Swal.fire({
    title: 'Modificar Descripción',
    input: 'textarea',
    inputValue: hiddenInput.value,
    inputPlaceholder: 'Escribe los detalles aquí...',
    showCancelButton: true,
    confirmButtonText: 'Guardar cambios',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3182ce',
  }).then((result) => {
    if (result.isConfirmed) {
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
      const estadoClass = p.stock > 0 ? "text-success bg-success-subtle" : "text-danger bg-danger-subtle";

      fila.innerHTML = `
        <td class="text-muted fw-semibold">${contadorVisual++}</td>
        <td class="fw-bold text-dark">${p.nombre}</td>
        <td class="fw-semibold">$${parseFloat(p.precio).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
        <td>${parseInt(p.stock).toLocaleString('en-US')}</td>
        <td><span class="badge rounded-pill ${estadoClass} px-3 py-2">${estado}</span></td>
        <td>${p.categoria}</td>
        <td>
          <button class="btn btn-desc rounded-pill" onclick="verDescripcionModal(${p.id})">
            <i class="bi bi-file-earmark-text me-1"></i> Ver Info
          </button>
        </td>
        <td class="acciones">
          <button class="btn btn-primary btn-icon rounded-circle" onclick="editarFila(${p.id})" title="Editar">
            <i class="bi bi-pencil-fill"></i>
          </button>
          <button class="btn btn-danger btn-icon rounded-circle" onclick="eliminarProducto(${p.id})" title="Eliminar">
            <i class="bi bi-trash-fill"></i>
          </button>
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
  const safeDesc = producto.descripcion.replace(/"/g, '&quot;'); 

  fila.innerHTML = `
    <td>-</td>
    <td><input type="text" class="form-control form-control-sm" id="edit-nombre-${id}" value="${producto.nombre}"></td>
    <td><input type="text" class="form-control form-control-sm" id="edit-precio-${id}" inputmode="decimal" value="${precioFormat}"></td>
    <td><input type="text" class="form-control form-control-sm" id="edit-stock-${id}" inputmode="numeric" value="${stockFormat}"></td>
    <td><span class="badge rounded-pill bg-secondary px-3 py-2">Edición</span></td>
    <td>
      <select class="form-select form-select-sm" id="edit-categoria-${id}">
        <option value="Electrónica" ${producto.categoria === "Electrónica" ? "selected" : ""}>Electrónica</option>
        <option value="Ropa" ${producto.categoria === "Ropa" ? "selected" : ""}>Ropa</option>
        <option value="Hogar" ${producto.categoria === "Hogar" ? "selected" : ""}>Hogar</option>
      </select>
    </td>
    <td>
      <input type="hidden" id="edit-descripcion-${id}" value="${safeDesc}">
      <button class="btn btn-desc rounded-pill border-primary text-primary" onclick="editarDescripcionModal(${id})">
        <i class="bi bi-pencil me-1"></i> Editar
      </button>
    </td>
    <td class="acciones">
      <button class="btn btn-success btn-icon rounded-circle" onclick="guardarEdicion(${id})" title="Guardar">
        <i class="bi bi-check-lg"></i>
      </button>
      <button class="btn btn-secondary btn-icon rounded-circle" onclick="renderProductos()" title="Cancelar">
        <i class="bi bi-x-lg"></i>
      </button>
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
    Swal.fire("Error", "Todos los campos son obligatorios", "error");
    return;
  }

  productos[index] = { ...productos[index], nombre, precio, stock, categoria, descripcion };
  guardarLocalStorage();
  renderProductos();
  
  Swal.fire({
    title: "¡Actualizado!",
    text: "El producto ha sido modificado.",
    icon: "success",
    timer: 1500,
    showConfirmButton: false
  });
}

function eliminarProducto(id) {
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) return;

  Swal.fire({
    title: "¿Eliminar producto?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: '#e53e3e',
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      productos.splice(index, 1);
      guardarLocalStorage();
      renderProductos();
      Swal.fire({
        title: "Eliminado",
        text: "El producto ya no está en el inventario.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
}

// Crear producto y REDIRIGIR
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
  
  e.target.reset();

  // Alerta de éxito
  Swal.fire({
    title: "¡Agregado!",
    text: "El producto ha sido guardado exitosamente.",
    icon: "success",
    timer: 1500,
    showConfirmButton: false
  }).then(() => {
    // Redirigir a la pestaña de la lista usando Bootstrap Tab API
    const triggerEl = document.querySelector('#lista-tab');
    const tab = new bootstrap.Tab(triggerEl);
    tab.show();
  });
});

// Eventos de formateo en tiempo real
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