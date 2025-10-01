import productos from "./data.js"; // tu array de productos
import { agregarAlCarrito, renderCarrito } from "./carrito.js"; // reusamos carrito

// Leer parámetro ID de la URL
const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

// Buscar el producto en el array
const producto = productos.find((p) => p.id.toString() === idProducto);

// Renderizar en el DOM
const contenedor = document.getElementById("detalleProducto");

if (producto) {
  contenedor.innerHTML = `
    <h2>${producto.nombre}</h2>
    <img src="${producto.img}" alt="${producto.nombre}">
    <p><strong>Precio:</strong> $${producto.precio}</p>
    <p>${producto.descripcionLarga}</p>
    <p><em>Categoría:</em> ${producto.categoria}</p>
    <p><em>Stock:</em> ${producto.stock}</p>
    <button id="btnAgregar">Agregar al carrito</button>
  `;

  // Evento para agregar al carrito
  document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarAlCarrito({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio
    });
  });
} else {
  contenedor.innerHTML = "<p>Producto no encontrado.</p>";
}

// Render inicial del carrito
renderCarrito();
