import { obtenerCarrito } from "./carrito.js";
import showToast from "./helpers/toast.js";

function renderListaCarrito() {
  const contenedor = document.querySelector("#listaCarrito");
  const totalEl = document.querySelector("#totalCompra");

  if (!contenedor || !totalEl) {
    console.error("No se encontraron los elementos #listaCarrito o #totalCompra");
    return;
  }

  const carrito = obtenerCarrito();

  contenedor.innerHTML = "";

  if (!Array.isArray(carrito) || carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalEl.textContent = "";
    return;
  }

  let total = 0;

  carrito.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
      <span>${item.nombre}</span>
      <span>x${item.cantidad}</span>
      <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
    `;
    contenedor.appendChild(div);
    total += item.precio * item.cantidad;
  });

  totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

function mostrarCartelExito() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay-exito");

  overlay.innerHTML = `
    <div class="cartel-exito">
      <h2>¡Compra realizada con éxito!</h2>
      <p>Gracias por tu compra en <strong>Punto y Coma</strong>.</p>
      <p>Serás redirigido al inicio en unos segundos...</p>
    </div>
  `;

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.classList.add("mostrar");
  }, 100);

  setTimeout(() => {
    window.location.href = "../../index.html";
  }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderListaCarrito();

  const form = document.querySelector("#formCompra");

  if (!form) {
    console.error("No se encontró el formulario #formCompra");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const direccion = form.direccion.value.trim();

    if (!nombre || !email || !direccion) {
      showToast("Por favor, completá todos los campos.", "warning");
      return;
    }

    // Confirmar que hay productos para comprar
    const carrito = obtenerCarrito();
    if (!Array.isArray(carrito) || carrito.length === 0) {
      showToast("El carrito está vacío, no podés finalizar la compra.", "error");
      return;
    }

    localStorage.removeItem("carrito");

    mostrarCartelExito();
  });
});
