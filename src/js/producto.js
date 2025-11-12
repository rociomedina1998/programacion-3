import { agregarAlCarrito, renderCarrito } from "./carrito.js";

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
