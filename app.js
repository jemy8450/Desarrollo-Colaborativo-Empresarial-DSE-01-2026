// Array dinámico de productos
let productos = [];

// Función para renderizar productos en la tabla
function renderProductos() {
  const lista = document.getElementById("productList");
  lista.innerHTML = ""; // Limpia la tabla antes de renderizar

  productos.forEach((p, index) => {
    const fila = document.createElement("tr");

    // Columna índice
    const colIndex = document.createElement("td");
    colIndex.textContent = index + 1;

    // Columna nombre
    const colNombre = document.createElement("td");
    colNombre.textContent = p.nombre;

    // Columna precio
    const colPrecio = document.createElement("td");
    colPrecio.textContent = `$${p.precio}`;

    // Agregar columnas a la fila
    fila.appendChild(colIndex);
    fila.appendChild(colNombre);
    fila.appendChild(colPrecio);

    // Agregar fila a la tabla
    lista.appendChild(fila);
  });
}

// Función para agregar producto
document.getElementById("productForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const nombre = document.getElementById("name").value.trim();
  const precio = document.getElementById("price").value.trim();

  // Validación básica de campos
  if (nombre === "" || precio === "") {
    alert("Todos los campos son obligatorios");
    return;
  }

  // Agregar producto al array
  productos.push({ nombre, precio });

  // Renderizar productos en pantalla
  renderProductos();

  // Limpiar formulario
  e.target.reset();
});