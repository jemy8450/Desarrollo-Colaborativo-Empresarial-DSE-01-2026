let productos = [];
let editIndex = null; // Para saber qué producto se está editando

function renderProductos() {
  const lista = document.getElementById("productList");
  lista.innerHTML = "";

  productos.forEach((p, index) => {
    const fila = document.createElement("tr");

    const colIndex = document.createElement("td");
    colIndex.textContent = index + 1;

    const colNombre = document.createElement("td");
    colNombre.textContent = p.nombre;

    const colPrecio = document.createElement("td");
    colPrecio.textContent = `$${p.precio}`;

    const colAcciones = document.createElement("td");
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "edit-btn";
    btnEditar.onclick = () => cargarProducto(index);

    colAcciones.appendChild(btnEditar);

    fila.appendChild(colIndex);
    fila.appendChild(colNombre);
    fila.appendChild(colPrecio);
    fila.appendChild(colAcciones);

    lista.appendChild(fila);
  });
}

function cargarProducto(index) {
  const producto = productos[index];
  document.getElementById("name").value = producto.nombre;
  document.getElementById("price").value = producto.precio;
  editIndex = index; // Guardamos el índice para actualizar luego
}

document.getElementById("productForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("name").value.trim();
  const precio = document.getElementById("price").value.trim();

  if (nombre === "" || precio === "") {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (editIndex !== null) {
    // Actualizar producto existente
    productos[editIndex] = { nombre, precio };
    editIndex = null;
  } else {
    // Crear producto nuevo
    productos.push({ nombre, precio });
  }

  renderProductos();
  e.target.reset();
});
