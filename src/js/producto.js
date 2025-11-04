import { agregarAlCarrito, renderCarrito } from "./carrito.js"; // reusamos carrito}
import GetCatalogo from "./utils/reqCatalogo.js";

const productos = JSON.parse(localStorage.getItem("catalogo")) || [];

// Leer parámetro ID de la URL
const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

// Buscar el producto en el array
const producto = productos.find((p) => p.id.toString() === idProducto);

// Renderizar en el DOM
const contenedor = document.getElementById("detalleProducto");

if (producto) {
  contenedor.innerHTML = `
  <div class='containerPageProd'>
    <div class='containerTitle'>
      <h2 class='titlePageProd'>${producto.nombre}</h2>
    </div>
    <div class='containerData'>
      <div class='containerImg'>
        <img src="${producto.img}" alt="${producto.nombre}">
      </div>
      <div class='containerInfo'>
        <div class='containerPrice'>
          <p><strong>Precio:</strong> <span>$${producto.precio}</span></p>
        </div>
        <div class='containerData'>
          <p><em>Categoría:</em> ${producto.categoria}</p>
          <p><em>Stock:</em> ${producto.stock}</p>
          <p>Autor: ${producto.author}}</p>
        </div>
        <div class='containerDescription'>
          <p>${producto.descripcion ? producto.descripcion : "Descripción no disponible."}</p>
        </div>
        <div class='containerBtn'>
      <button id="btnAgregar" class="addToCartButton">Agregar al carrito</button>
    </div>
      </div>
    </div>
  </div>
  `;

  // Evento para agregar al carrito
  document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarAlCarrito({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
    });
  });
} else {
  contenedor.innerHTML = "<p>Producto no encontrado.</p>";
}

// Render inicial del carrito
renderCarrito();
