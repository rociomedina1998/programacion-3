import { agregarAlCarrito, renderCarrito } from "./carrito.js";
import GetCatalogo from "./utils/reqCatalogo.js";

const productos = JSON.parse(localStorage.getItem("catalogo")) || [];

// Leer parámetro ID de la URL
const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

// Buscar el producto
const producto = productos.find((p) => p.id.toString() === idProducto);

// Renderizar en el DOM
const contenedor = document.getElementById("detalleProducto");

if (producto) {
  contenedor.innerHTML = `
    <div class='containerPageProd'>
      <div class='containerTitle'>
        <h2 class='titlePageProd'>${producto.nombre}</h2>
      </div>
      <div class='containerImg'>
        <img src="${producto.img}" alt="${producto.nombre}">
      </div>
      <div class='containerPrice'>
        <p><strong>Precio:</strong> $${producto.precio}</p>
      </div>
      <div class='containerData'>
        <p><em>Categoría:</em> ${producto.categoria}</p>
        <p><em>Stock disponible:</em> <span id="stockDisp">${producto.stock}</span></p>
        <p><em>Autor:</em> ${producto.author}</p>
      </div>
      <div class='containerDescription'>
        <p>${producto.descripcion}</p>
      </div>
      <div class='containerBtn'>
        <button id="btnAgregar">Agregar al carrito</button>
      </div>
    </div>
  `;

  // Evento para agregar al carrito
  document.getElementById("btnAgregar").addEventListener("click", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const itemEnCarrito = carrito.find((item) => item.id === producto.id);
    const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;

    // Validar stock disponible
    if (cantidadActual >= producto.stock) {
      alert("No hay más stock disponible para este producto.");
      return;
    }

    // Si hay stock, agregar al carrito
    agregarAlCarrito({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    });

    // Actualizar visualmente el stock
    const stockRestante = producto.stock - (cantidadActual + 1);
    document.getElementById("stockDisp").textContent = stockRestante;

    renderCarrito();
  });
} else {
  contenedor.innerHTML = "<p>Producto no encontrado.</p>";
}

renderCarrito();
